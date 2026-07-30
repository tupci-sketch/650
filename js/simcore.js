/* =============================================================================
   650 — SIMCORE  (shared, seeded simulation core, model v2)
   -----------------------------------------------------------------------------
   One place for the richer election physics used by BOTH the headline result
   (election.js simulateCampaign) and the Monte-Carlo forecast (forecast.js /
   the odds loop). Everything here is either a PURE deterministic function of the
   cabinet/state, or draws only from a supplied seeded RNG — so the result stays
   byte-reproducible. New in v2 vs the old inline model:

     • cabinetRegionTilt — a DETERMINISTIC, mean-centred per-region logit map from
       who you drafted: a strong minister shifts WHERE you win toward the regions
       whose voter blocs care about that minister's brief (Home Sec → immigration/
       crime-salient regions, etc.). No RNG, so reproducibility is untouched.
     • fatSwing — the national campaign swing now has fat tails (a Gaussian
       mixture), so genuine upsets/landslides live in the tails. Mean-zero, so the
       central projection and balance curve are unchanged; only the variance/tails
       grow (which is what a real forecast should show).
     • forecast() — a rich Monte-Carlo aggregator (full distribution, percentiles,
       tier probabilities) that runs on its OWN seeded RNG, decoupled from the
       headline draw so trial count never affects the actual result.

   MODEL_VERSION is folded into the run seed (engine.js) so runs are only
   compared within a model generation.
   ============================================================================= */
window.G = window.G || {};
(function () {
  var G = window.G;
  var SC = G.SimCore = G.SimCore || {};

  SC.MODEL_VERSION = "mc2";

  /* ---- fat-tailed national swing -----------------------------------------
     A 2-component Gaussian mixture: most campaigns are "normal", ~15% are a
     "volatile" campaign with ~2.3× the spread. Mean-zero, so E[seats] and the
     balance curve are unchanged; the tails (upsets and blowouts) get heavier.
     Costs exactly two seeded draws (one uniform selector + one gaussian).      */
  SC.NAT_BASE = 0.30;       // matches the old nat = gaussR*0.30
  SC.VOL_PROB = 0.15;
  SC.VOL_SCALE = 2.3;
  SC.fatSwing = function (rnd, noiseMul) {
    var scale = (rnd() < SC.VOL_PROB) ? SC.VOL_SCALE : 1.0;
    return G.gaussR(rnd) * SC.NAT_BASE * (noiseMul || 1) * scale;
  };

  /* ---- cabinet → issue → geography coupling (deterministic) ---------------
     Which policy axes each portfolio "owns". A minister's quality on that brief
     shifts your standing in regions whose blocs are sensitive to those axes.   */
  var PORT_AXIS = {
    chancellor: ["tax"], business: ["tax"], work: ["tax"],
    health: ["nhs"], education: ["nhs"],
    home: ["imm", "crime"], justice: ["crime"],
    foreign: ["world"], defence: ["world"],
    environment: ["climate"], transport: ["climate"]
  };
  SC.GEO_K = 0.075;                 // overall strength of the geographic coupling

  function ministerMean(p) {
    if (!p || !p.stats) return 60;
    var s = p.stats;
    return (s.appeal + s.experience + s.oratory + s.statecraft + s.partyMgmt) / 5;
  }
  /* a minister's effectiveness on their brief, ~[-0.3 .. +1.0] */
  function issueStrength(p) {
    return Math.max(-0.3, Math.min(1.0, (ministerMean(p) - 62) / 38));
  }

  /* Returns { regionId: logitDelta }, mean-centred across contestable regions so
     it only REDISTRIBUTES your vote geographically (who you drafted decides
     WHERE you're strong) without inflating the seat total — keeps the balance
     curve intact. Pure function of the cabinet + active blocs; no RNG.          */
  SC.cabinetRegionTilt = function (cabinet, ctx) {
    ctx = ctx || {};
    if (!cabinet) return {};
    var blocs = (G.activeBlocs ? G.activeBlocs() : G.ELECTORATE_BLOCS) || [];
    var regions = (G.activeRegions ? G.activeRegions() : null) || G.REGIONS || [];
    if (!blocs.length || !regions.length) return {};

    /* per-axis total "ministerial firepower" from the cabinet */
    var axisPower = {};   // axis -> summed issueStrength across ministers owning it
    Object.keys(cabinet).forEach(function (portKey) {
      var axes = PORT_AXIS[portKey]; if (!axes) return;
      var str = issueStrength(cabinet[portKey]);
      axes.forEach(function (ax) { axisPower[ax] = (axisPower[ax] || 0) + str; });
    });
    if (!Object.keys(axisPower).length) return {};

    var tilt = {}, sum = 0, n = 0;
    regions.forEach(function (r) {
      var d = 0;
      blocs.forEach(function (b) {
        var mul = (b.regions && b.regions[r.id] != null) ? b.regions[r.id] : 1.0;
        var conc = mul - 1;                 // >0 where this bloc is concentrated
        if (conc <= 0) return;
        Object.keys(axisPower).forEach(function (ax) {
          var sens = Math.abs((b.issues && b.issues[ax]) || 0);   // salience of the axis to this bloc
          if (sens < 0.05) return;
          d += (b.size || 0.12) * conc * sens * axisPower[ax];
        });
      });
      d *= SC.GEO_K;
      tilt[r.id] = d; sum += d; n++;
    });
    /* mean-centre so the tilt redistributes, not inflates */
    if (n) { var mean = sum / n; regions.forEach(function (r) { tilt[r.id] -= mean; }); }
    return tilt;
  };

  /* merge two {regionId: delta} maps (either may be null) */
  SC.mergeTilt = function (a, b) {
    if (!a) return b || null;
    if (!b) return a;
    var out = {}, k;
    for (k in a) if (a.hasOwnProperty(k)) out[k] = a[k];
    for (k in b) if (b.hasOwnProperty(k)) out[k] = (out[k] || 0) + b[k];
    return out;
  };

  /* ---- one Monte-Carlo trial (region-level, correlated) ------------------
     Mirrors the old estimateSeats: one shared national swing per trial + one
     regional swing per region; within a region a Gaussian approximation to a
     Binomial(seats, p). Returns { total, byRegion:{id:wins} }.
     Correlation (national + regional swing shared across seats) is what gives
     the forecast its realistic fat-but-correlated FPTP uncertainty.            */
  SC.trial = function (params, rnd) {
    var C = G.CONFIG;
    var pressure = params.opposition ? (params.opposition._pressure || 0) : 0;
    var baseLogit = C.seatsK * (params.vote - (C.seatsMid + params.midShift)) - pressure;
    var rswing = C.regionSwing * params.noiseMul;
    var nat = SC.fatSwing(rnd, params.noiseMul);
    var total = 0, byRegion = {};
    G.REGIONS.forEach(function (r) {
      var lean = G.regionLeanFor(params.mode, params.lineage, r.id);
      if (lean === null) { byRegion[r.id] = 0; return; }
      if (params.mode !== "dynasty") lean = G.gaussR(rnd) * C.unityLeanSpread;
      lean += G.alignRegionTilt(params.mode, params.align || 0, r.id);
      lean += (params.regionTilt && params.regionTilt[r.id]) || 0;
      var p = G.sigmoid(baseLogit + lean + nat + G.gaussR(rnd) * rswing);
      var mean = r.seats * p, sd = Math.sqrt(Math.max(0.0001, r.seats * p * (1 - p)));
      var wins = Math.round(mean + G.gaussR(rnd) * sd);
      wins = Math.max(0, Math.min(r.seats, wins));
      byRegion[r.id] = wins; total += wins;
    });
    return { total: total, byRegion: byRegion };
  };

  /* ---- rich Monte-Carlo forecast -----------------------------------------
     Runs `trials` simulations on the supplied seeded RNG (decoupled from the
     headline draw). Works for any electoral system: if an international system
     is active it uses that system's estimateFn for the seat total (per-region
     detail is UK-path only). Returns a deep summary.
       thresholds: { majority, landslide, supermajority, total }               */
  SC.forecast = function (params, trials, rnd, thresholds) {
    trials = trials || (G.CONFIG.trials || 800);
    var th = thresholds || {};
    var sys = G.activeElectoralSystem && G.activeElectoralSystem();
    var intl = !!(sys && sys.estimateFn);
    var samples = new Array(trials);
    var counts = { hung: 0, majority: 0, landslide: 0, supermajority: 0, sweep: 0 };
    var regionWins = null, regionN = 0;
    var maj = th.majority || (sys && sys.majority) || G.CONFIG.majority;
    var land = th.landslide || Math.round((th.total || G.CONFIG.totalSeats) * (G.CONFIG.tierLandslide / (G.CONFIG.totalSeats || 650)));
    var sup = th.supermajority || Math.round((th.total || G.CONFIG.totalSeats) * (G.CONFIG.tierSuper / (G.CONFIG.totalSeats || 650)));
    var totSeats = th.total || (sys && sys.totalSeats) || G.CONFIG.totalSeats;

    var sum = 0, sumsq = 0;
    for (var i = 0; i < trials; i++) {
      var s;
      if (intl) {
        s = sys.estimateFn(params, rnd);
      } else {
        var t = SC.trial(params, rnd);
        s = t.total;
        if (!regionWins) { regionWins = {}; }
        for (var rid in t.byRegion) if (t.byRegion.hasOwnProperty(rid)) {
          regionWins[rid] = (regionWins[rid] || 0) + t.byRegion[rid];
        }
        regionN++;
      }
      samples[i] = s;
      sum += s; sumsq += s * s;
      if (s < maj)        counts.hung++;
      if (s >= maj)       counts.majority++;
      if (s >= land)      counts.landslide++;
      if (s >= sup)       counts.supermajority++;
      if (s >= totSeats)  counts.sweep++;
    }
    samples.sort(function (a, b) { return a - b; });
    function pct(p) { return samples[Math.min(samples.length - 1, Math.floor(p * samples.length))]; }
    var mean = sum / trials;
    var variance = Math.max(0, sumsq / trials - mean * mean);

    /* compact histogram (about 40 bins across the sampled range) */
    var lo = samples[0], hi = samples[samples.length - 1];
    var bins = 40, span = Math.max(1, hi - lo), hist = [];
    for (var bI = 0; bI < bins; bI++) hist.push({ x0: lo + span * bI / bins, x1: lo + span * (bI + 1) / bins, n: 0 });
    for (var sI = 0; sI < samples.length; sI++) {
      var bi = Math.min(bins - 1, Math.floor((samples[sI] - lo) / span * bins));
      hist[bi].n++;
    }

    var regionProb = null;
    if (regionWins && regionN) {
      regionProb = {};
      for (var rk in regionWins) if (regionWins.hasOwnProperty(rk)) regionProb[rk] = regionWins[rk] / regionN;
    }

    return {
      trials: trials,
      mean: mean, sd: Math.sqrt(variance),
      min: samples[0], max: samples[samples.length - 1],
      pct: { p5: pct(0.05), p10: pct(0.10), p25: pct(0.25), p50: pct(0.50),
             p75: pct(0.75), p90: pct(0.90), p95: pct(0.95) },
      probs: {
        hung:          counts.hung / trials,
        majority:      counts.majority / trials,
        landslide:     counts.landslide / trials,
        supermajority: counts.supermajority / trials,
        sweep:         counts.sweep / trials
      },
      histogram: hist,
      regionProb: regionProb,
      thresholds: { majority: maj, landslide: land, supermajority: sup, total: totSeats }
    };
  };
})();

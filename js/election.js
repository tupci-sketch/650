/* =============================================================================
   650 — ELECTION ENGINE  (v2)
   -----------------------------------------------------------------------------
   Now a constituency-level, first-past-the-post model:

     1. Each filled seat contributes a weighted stat score x a fit multiplier.
     2. The cabinet total maps to a notional national VOTE SHARE (nudged by the
        chosen difficulty).
     3. That share sets a national per-seat win probability via a cube-law-style
        logistic curve. Every one of the 650 constituencies is then its own
        contest: regional lean + a shared regional swing + per-seat luck decide
        the winner. FPTP means small vote shifts swing many seats.
     4. Running many campaigns gives the odds (P(majority), P(landslide), …).

   Single-party (Dynasty) tickets only win where their party's geography lets
   them — so the SNP can sweep Scotland but never form a UK majority. Unity and
   Wildcard tickets contest all 650 with mild local variation.
   ========================================================================== */

window.G = window.G || {};

/* ---- weighted stat score for one politician in one portfolio ------------- */
G.scoreFor = function (politician, portfolioKey) {
  var port = G.PORTFOLIO_BY_KEY[portfolioKey];
  if (!port) return 0;
  var s = politician.stats, w = port.w, total = 0;
  total += (s.appeal     || 0) * (w.appeal     || 0);
  total += (s.experience || 0) * (w.experience || 0);
  total += (s.oratory    || 0) * (w.oratory    || 0);
  total += (s.statecraft || 0) * (w.statecraft || 0);
  total += (s.partyMgmt  || 0) * (w.partyMgmt  || 0);
  return total;
};
G.fitMultiplier = function (politician, portfolioKey) {
  return politician.fits.indexOf(portfolioKey) !== -1 ? G.CONFIG.fitBonus : G.CONFIG.misfitPenalty;
};
G.seatContribution = function (politician, portfolioKey) {
  if (!politician) return { value: 0, fit: false, base: 0 };
  var base = G.scoreFor(politician, portfolioKey);
  return { value: base * G.fitMultiplier(politician, portfolioKey), base: base,
           fit: politician.fits.indexOf(portfolioKey) !== -1 };
};
G.rateCabinet = function (cabinet) {
  var raw = 0, eras = {}, fits = 0, filled = 0;
  G.PORTFOLIOS.forEach(function (port) {
    var pol = cabinet[port.key]; if (!pol) return;
    filled++;
    var c = G.seatContribution(pol, port.key);
    raw += c.value; if (c.fit) fits++; eras[pol.era] = true;
  });
  return { raw: raw, filled: filled, fits: fits,
           distinctEras: Object.keys(eras).length, perSeat: filled ? raw / filled : 0 };
};

/* ---- helpers ------------------------------------------------------------- */
G.sigmoid = function (x) { return 1 / (1 + Math.exp(-x)); };
G.gauss = function () {
  var u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

/* ---- geography: real constituencies from the bundled hex cartogram ------- */
G.REGION_NAME_TO_ID = {
  "Scotland":"SCO","Wales":"WAL","Northern Ireland":"NI","North East":"NE",
  "North West":"NW","Yorkshire and the Humber":"YH","East Midlands":"EM",
  "West Midlands":"WM","East of England":"EE","London":"LDN",
  "South East":"SE","South West":"SW"
};
G.GEO = null;
G.buildGeo = function () {
  if (G.GEO) return G.GEO;
  var cons = [], byRegion = {}, seatMP = {};
  G.REGIONS.forEach(function (r) { byRegion[r.id] = []; });
  if (G.HEXMAP && G.HEXMAP.hexes) {
    Object.keys(G.HEXMAP.hexes).forEach(function (k) {
      var h = G.HEXMAP.hexes[k];
      var rid = G.REGION_NAME_TO_ID[h.a] || "LDN";
      var c = { id: k, gss: h.gss, name: h.n, regionId: rid, q: h.q, r: h.r };
      cons.push(c); (byRegion[rid] = byRegion[rid] || []).push(c);
    });
  }
  if (G.CURRENT_MPS) G.CURRENT_MPS.forEach(function (m) {
    var p = G.PARTIES[m.party];
    seatMP[m.gss] = { name: m.name, party: m.party, colour: p ? p.colour : "#6b6b6b" };
  });
  G.GEO = { constituencies: cons, byRegion: byRegion, seatMP: seatMP };
  return G.GEO;
};

/* ---- vote share from a cabinet rating (+ difficulty nudge) --------------- */
G.voteShare = function (rating, diff) {
  var C = G.CONFIG;
  var span = C.strengthCeil - C.strengthFloor;
  var t = span > 0 ? (rating.raw - C.strengthFloor) / span : 0.5;
  var base = C.voteMin + (C.voteMax - C.voteMin) * t;
  base += Math.max(0, rating.distinctEras - C.diversityErasFree) * C.diversityBonusPerEra;
  base += (diff ? diff.voteShift : 0);
  return Math.max(0.05, Math.min(0.62, base));
};

/* ---- which regions a ticket can win, and the seat ceiling ---------------- */
G.regionLeanFor = function (mode, lineage, regionId) {
  /* returns a number (logit lean) or null if the ticket can't win there */
  if (mode === "dynasty") {
    var table = G.LEANS[lineage];
    if (!table) return 0;                       // unknown lineage: flat everywhere
    return (regionId in table) ? table[regionId] : null;
  }
  return 0; // unity / wildcard: everywhere, flat (local noise added per campaign)
};
G.contestableSeats = function (mode, lineage) {
  var total = 0;
  G.REGIONS.forEach(function (r) {
    if (G.regionLeanFor(mode, lineage, r.id) !== null) total += r.seats;
  });
  return total;
};

/* ---- one full campaign across all 650 real constituencies ---------------- */
/* returns { seats, byRegion:[{id,name,total,won,winnable}],
            results:[{id,gss,name,region,won}] } (results in region order) */
G.simulateCampaign = function (params) {
  var C = G.CONFIG, geo = G.buildGeo();
  var baseLogit = C.seatsK * (params.vote - (C.seatsMid + params.midShift));
  var noise = C.seatNoise * params.noiseMul;
  var rswing = C.regionSwing * params.noiseMul;
  var nat = G.gauss() * 0.30 * params.noiseMul;     // national swing for this campaign

  var seats = 0, byRegion = [], results = [];
  G.REGIONS.forEach(function (r) {
    var list = geo.byRegion[r.id] || [];
    var lean = G.regionLeanFor(params.mode, params.lineage, r.id);
    var rec = { id: r.id, name: r.name, total: list.length, won: 0, winnable: lean !== null };
    if (lean === null) {
      list.forEach(function (c) { results.push({ id: c.id, gss: c.gss, name: c.name, region: r.id, won: false }); });
      byRegion.push(rec); return;
    }
    if (params.mode !== "dynasty") lean = G.gauss() * C.unityLeanSpread; // mild local colour
    var regSwing = G.gauss() * rswing;
    list.forEach(function (c) {
      var logit = baseLogit + lean + nat + regSwing + G.gauss() * noise;
      var won = Math.random() < G.sigmoid(logit);
      if (won) { rec.won++; seats++; }
      results.push({ id: c.id, gss: c.gss, name: c.name, region: r.id, won: won });
    });
    byRegion.push(rec);
  });
  return { seats: seats, byRegion: byRegion, results: results };
};

/* ---- fast seat-total estimate for one campaign (for the odds loop) ------- */
G.estimateSeats = function (params) {
  var C = G.CONFIG;
  var baseLogit = C.seatsK * (params.vote - (C.seatsMid + params.midShift));
  var rswing = C.regionSwing * params.noiseMul;
  var nat = G.gauss() * 0.30 * params.noiseMul;
  var total = 0;
  G.REGIONS.forEach(function (r) {
    var lean = G.regionLeanFor(params.mode, params.lineage, r.id);
    if (lean === null) return;
    if (params.mode !== "dynasty") lean = G.gauss() * C.unityLeanSpread;
    var p = G.sigmoid(baseLogit + lean + nat + G.gauss() * rswing);
    var mean = r.seats * p, sd = Math.sqrt(Math.max(0.0001, r.seats * p * (1 - p)));
    var wins = Math.round(mean + G.gauss() * sd);
    total += Math.max(0, Math.min(r.seats, wins));
  });
  return total;
};

/* ---- central (deterministic) projection ---------------------------------- */
G.expectedSeats = function (params) {
  var C = G.CONFIG;
  var baseLogit = C.seatsK * (params.vote - (C.seatsMid + params.midShift));
  var total = 0;
  G.REGIONS.forEach(function (r) {
    var lean = G.regionLeanFor(params.mode, params.lineage, r.id);
    if (lean === null) return;
    if (params.mode !== "dynasty") lean = 0;
    total += r.seats * G.sigmoid(baseLogit + lean);
  });
  return Math.round(total);
};

/* ---- result tier --------------------------------------------------------- */
G.tierFor = function (seats, contestable) {
  var C = G.CONFIG;
  if (seats >= C.totalSeats)      return { key: "sweep",     label: "Clean Sweep — 650-0",        govt: true };
  if (seats >= C.tierDominance)   return { key: "dominance", label: "Total Dominance",            govt: true };
  if (seats >= C.tierSuper)       return { key: "super",     label: "Supermajority",              govt: true };
  if (seats >= C.tierLandslide)   return { key: "landslide", label: "Landslide",                  govt: true };
  if (seats >= C.majority)        return { key: "majority",  label: "Working Majority",           govt: true };
  if (seats >= C.majority - 56)   return { key: "hung",      label: "Hung Parliament — largest party", govt: true };
  if (contestable < C.majority)   return { key: "kingmaker", label: "Kingmakers — short of a majority by design", govt: false };
  return { key: "opposition", label: "Opposition", govt: false };
};

/* ---- a light "governing" verdict (only shown in Govern mode) ------------- */
G.governVerdict = function (rating, seats) {
  var C = G.CONFIG;
  if (seats < C.majority) return { stability: 0, line: "No majority — you take your seat on the opposition benches." };
  var stability = Math.max(8, Math.min(96, Math.round(38 + (rating.perSeat - 55) * 2.2 + (seats - C.majority) * 0.05)));
  var line;
  if (stability >= 80) line = "A commanding, disciplined government that sees out a full and consequential term.";
  else if (stability >= 60) line = "A solid term in office, with the usual scrapes survived.";
  else if (stability >= 40) line = "A wobbly government — reshuffles, rebellions, but it limps to the line.";
  else line = "A chaotic ministry, plagued by infighting and U-turns.";
  return { stability: stability, line: line };
};

/* ---- the full election --------------------------------------------------- */
/* opts: { mode, lineage, difficulty, govern } */
G.runElection = function (cabinet, opts) {
  opts = opts || {};
  var C = G.CONFIG;
  var diff = C.difficulties[opts.difficulty] || C.difficulties.normal;
  var mode = opts.mode || "unity";
  var lineage = mode === "dynasty" ? opts.lineage : null;

  var rating = G.rateCabinet(cabinet);
  var vote = G.voteShare(rating, diff);
  var contestable = G.contestableSeats(mode, lineage);
  var params = { vote: vote, mode: mode, lineage: lineage, midShift: diff.midShift, noiseMul: diff.noiseMul };

  var expected = G.expectedSeats(params);

  /* odds distribution */
  var counts = { majority: 0, landslide: 0, supermajority: 0, sweep: 0 };
  var samples = [];
  for (var i = 0; i < C.trials; i++) {
    var s = G.estimateSeats(params);
    samples.push(s);
    if (s >= C.majority)      counts.majority++;
    if (s >= C.tierLandslide) counts.landslide++;
    if (s >= C.tierSuper)     counts.supermajority++;
    if (s >= C.totalSeats)    counts.sweep++;
  }
  samples.sort(function (a, b) { return a - b; });
  var pct = function (p) { return samples[Math.min(samples.length - 1, Math.floor(p * samples.length))]; };

  /* the headline campaign that actually gets watched / shown */
  var campaign = G.simulateCampaign(params);
  var tier = G.tierFor(campaign.seats, contestable);

  return {
    rating: rating,
    voteShare: vote,
    expectedSeats: expected,
    seats: campaign.seats,
    tier: tier,
    contestable: contestable,
    majorityOf: campaign.seats - C.majority,
    campaign: campaign,
    difficulty: opts.difficulty || "normal",
    govern: !!opts.govern,
    governVerdict: G.governVerdict(rating, campaign.seats),
    odds: {
      majority:      counts.majority / C.trials,
      landslide:     counts.landslide / C.trials,
      supermajority: counts.supermajority / C.trials,
      sweep:         counts.sweep / C.trials
    },
    range: { low: pct(0.05), median: pct(0.5), high: pct(0.95) }
  };
};

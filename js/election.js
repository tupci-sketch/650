/* =============================================================================
   650 — ELECTION ENGINE
   -----------------------------------------------------------------------------
   The pipeline (all knobs live in G.CONFIG):

     1. Each filled seat contributes a weighted stat score, x a fit multiplier.
     2. The cabinet total maps to a notional national VOTE SHARE.
     3. Vote share runs through a cube-rule-inspired responsiveness curve to
        give SEATS out of 650.  (The historic "cube law" of UK elections held
        that the ratio of seats won tracked roughly the cube of the vote ratio;
        it has weakened over time, so this is a stylised, tunable version.)
     4. A Monte Carlo loop adds a random national swing each run, producing the
        odds you were really facing (P(majority), P(landslide), P(clean sweep)).

   Nothing here mutates game state — feed it a roster, get a result object back.
   ========================================================================== */

window.G = window.G || {};

/* ---- weighted stat score for one politician in one portfolio (0–99ish) ---- */
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
  return politician.fits.indexOf(portfolioKey) !== -1
    ? G.CONFIG.fitBonus
    : G.CONFIG.misfitPenalty;
};

/* ---- contribution of one seat (base score x fit), plus a fit flag -------- */
G.seatContribution = function (politician, portfolioKey) {
  if (!politician) return { value: 0, fit: false, base: 0 };
  var base = G.scoreFor(politician, portfolioKey);
  var mult = G.fitMultiplier(politician, portfolioKey);
  return {
    value: base * mult,
    base: base,
    fit: politician.fits.indexOf(portfolioKey) !== -1
  };
};

/* ---- whole-cabinet rating from a {portfolioKey: politician} map ---------- */
G.rateCabinet = function (cabinet) {
  var C = G.CONFIG, raw = 0, eras = {}, fits = 0, filled = 0;
  G.PORTFOLIOS.forEach(function (port) {
    var pol = cabinet[port.key];
    if (!pol) return;
    filled++;
    var c = G.seatContribution(pol, port.key);
    raw += c.value;
    if (c.fit) fits++;
    eras[pol.era] = true;
  });
  var distinctEras = Object.keys(eras).length;
  return {
    raw: raw,
    filled: filled,
    fits: fits,
    distinctEras: distinctEras,
    perSeat: filled ? raw / filled : 0
  };
};

/* ---- vote share from a cabinet rating ------------------------------------ */
G.voteShare = function (rating) {
  var C = G.CONFIG;
  var span = C.strengthCeil - C.strengthFloor;
  var t = span > 0 ? (rating.raw - C.strengthFloor) / span : 0.5;
  var base = C.voteMin + (C.voteMax - C.voteMin) * t;
  // reward spreading the cabinet across history (the "every era" rule)
  var bonusEras = Math.max(0, rating.distinctEras - C.diversityErasFree);
  base += bonusEras * C.diversityBonusPerEra;
  return Math.max(C.voteMin, Math.min(C.voteMax, base));
};

/* ---- logistic vote-share -> seats, clamped to a contestable ceiling ------ */
G.seatsFromVote = function (vote, contestable) {
  var C = G.CONFIG;
  var arg = C.seatsK * (vote - C.seatsMid);
  var frac = 1 / (1 + Math.exp(-arg));
  var seats = Math.round(C.seatsLmax * frac);
  var ceil = Math.min(contestable, C.totalSeats);
  return Math.max(0, Math.min(ceil, seats));
};

/* ---- Box–Muller gaussian ------------------------------------------------- */
G.gauss = function () {
  var u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

/* ---- result tier from a seat count --------------------------------------- */
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

/* ---- the full simulation ------------------------------------------------- */
/* opts: { contestable } — seats this ticket can stand in (650 for unity). */
G.runElection = function (cabinet, opts) {
  opts = opts || {};
  var C = G.CONFIG;
  var contestable = opts.contestable || C.totalSeats;

  var rating = G.rateCabinet(cabinet);
  var centreVote = G.voteShare(rating);
  var expectedSeats = G.seatsFromVote(centreVote, contestable); // central projection

  // Monte Carlo: wobble the vote share to see the odds we faced
  var counts = { majority: 0, landslide: 0, supermajority: 0, sweep: 0 };
  var samples = [];
  function drawVote() {
    return Math.max(0.05, Math.min(0.75, centreVote + G.gauss() * C.voteSd));
  }
  for (var i = 0; i < C.trials; i++) {
    var s = G.seatsFromVote(drawVote(), contestable);
    samples.push(s);
    if (s >= C.majority)        counts.majority++;
    if (s >= C.tierLandslide)   counts.landslide++;
    if (s >= C.tierSuper)       counts.supermajority++;
    if (s >= C.totalSeats)      counts.sweep++;
  }
  samples.sort(function (a, b) { return a - b; });
  var pct = function (p) { return samples[Math.min(samples.length - 1, Math.floor(p * samples.length))]; };

  // the headline is ONE campaign actually played out — so "Run it again" varies,
  // exactly like simulating a fresh season in the games this borrows from.
  var campaignVote = drawVote();
  var campaignSeats = G.seatsFromVote(campaignVote, contestable);
  var campaignTier = G.tierFor(campaignSeats, contestable);

  return {
    rating: rating,
    voteShare: campaignVote,         // this campaign's share (matches the seats)
    expectedVote: centreVote,        // the stable central projection
    seats: campaignSeats,
    expectedSeats: expectedSeats,
    tier: campaignTier,
    contestable: contestable,
    majorityOf: campaignSeats - C.majority,   // + = majority size, - = short by
    odds: {
      majority:      counts.majority / C.trials,
      landslide:     counts.landslide / C.trials,
      supermajority: counts.supermajority / C.trials,
      sweep:         counts.sweep / C.trials
    },
    range: { low: pct(0.05), median: pct(0.5), high: pct(0.95) }
  };
};

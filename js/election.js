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
/* "okay" adjacencies — real Whitehall pipelines. Holding any of these makes a
   politician a capable (no-penalty) pick for the seat, though not a perfect fit.
   pm lists the offices that make a credible "could-have-been PM".            */
G.FIT_ADJACENCY = {
  pm:         ["leader", "deputy", "chancellor", "foreign", "home"],
  deputy:     ["leader", "whip", "pm"],
  chancellor: ["business"],
  business:   ["chancellor"],
  foreign:    ["defence"],
  defence:    ["foreign"],
  home:       ["justice"],
  justice:    ["home"],
  leader:     ["whip", "deputy"],
  work:        ["business", "health", "chancellor"],
  transport:   ["business", "defence"],
  environment: ["business", "health"],
  culture:     ["education", "leader"]
};
G.fitClass = function (politician, portfolioKey) {
  if (!politician) return "bad";
  if (politician.fits.indexOf(portfolioKey) !== -1) return "good";
  var adj = G.FIT_ADJACENCY[portfolioKey];
  if (adj) for (var i = 0; i < adj.length; i++) if (politician.fits.indexOf(adj[i]) !== -1) return "okay";
  return "bad";
};
G.fitMultiplier = function (politician, portfolioKey) {
  var cls = G.fitClass(politician, portfolioKey);
  return cls === "good" ? G.CONFIG.fitBonus
       : cls === "okay" ? (G.CONFIG.fitNeutral || 1.0)
       : G.CONFIG.misfitPenalty;
};
G.seatContribution = function (politician, portfolioKey) {
  if (!politician) return { value: 0, fit: false, okay: false, base: 0 };
  var base = G.scoreFor(politician, portfolioKey);
  var cls = G.fitClass(politician, portfolioKey);
  return { value: base * G.fitMultiplier(politician, portfolioKey), base: base,
           fit: cls === "good", okay: cls === "okay" };
};
G.rateCabinet = function (cabinet) {
  var raw = 0, eras = {}, fits = 0, filled = 0, despots = 0;
  G.PORTFOLIOS.forEach(function (port) {
    var pol = cabinet[port.key]; if (!pol) return;
    filled++;
    var c = G.seatContribution(pol, port.key);
    raw += c.value; if (c.fit) fits++; eras[pol.era] = true;
    if (G.isDespot && G.isDespot(pol)) despots++;
  });
  /* a despot in the cabinet is a national scandal: it drags down the whole
     ticket's standing, compounding for each one (see CONFIG.despotPenalty). */
  var penalty = despots > 0 ? Math.pow((G.CONFIG.despotPenalty || 0.75), despots) : 1;
  var adjusted = raw * penalty;
  return { raw: adjusted, rawBase: raw, despots: despots, penalty: penalty,
           filled: filled, fits: fits,
           distinctEras: Object.keys(eras).length, perSeat: filled ? adjusted / filled : 0 };
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

/* ---- optional policy layer: a manifesto (pre) and a programme (post) ------
   Gated behind a setup toggle. Pre-election stances nudge the vote; the same
   axes, chosen again in office, set your starting meters — and matching your
   manifesto keeps faith with voters while diverging invites a betrayal hit.  */
G.POLICY_AXES = [
  { key: "tax", title: "Tax & spending", options: [
      { key: "cut",     label: "Cut taxes",            blurb: "Back growth; let people keep more.",   voteMod: 0.015, gov: { e: 6, a: -2 } },
      { key: "invest",  label: "Invest in services",   blurb: "Spend to rebuild the public realm.",   voteMod: 0.010, gov: { a: 5, e: -4 } },
      { key: "balance", label: "Balance the books",    blurb: "Discipline first; nothing unfunded.",  voteMod: -0.010, gov: { e: 4, a: -3, u: 1 } } ] },
  { key: "nhs", title: "The NHS", options: [
      { key: "fund",   label: "A funding surge",       blurb: "Pour money into the front line.",      voteMod: 0.020, gov: { a: 6, e: -5 } },
      { key: "reform", label: "Reform & efficiency",   blurb: "More care for the same money.",        voteMod: 0.000, gov: { e: 3 } },
      { key: "hold",   label: "Hold the line",         blurb: "No blank cheques.",                    voteMod: -0.015, gov: { e: 4, a: -4 } } ] },
  { key: "imm", title: "Immigration", options: [
      { key: "tighten", label: "Tighten the borders",  blurb: "Hard limits and enforcement.",         voteMod: 0.020, gov: { a: 3, u: -3 } },
      { key: "manage",  label: "Manage pragmatically", blurb: "Control with a steady hand.",          voteMod: 0.000, gov: { u: 1 } },
      { key: "open",    label: "Open & humane",        blurb: "Compassion and legal routes.",         voteMod: -0.020, gov: { a: -3, u: 4 } } ] },
  { key: "world", title: "Europe & defence", options: [
      { key: "europe",    label: "Closer to Europe",   blurb: "Rebuild ties with the continent.",     voteMod: 0.005, gov: { e: 3, u: -2 } },
      { key: "sovereign", label: "Sovereign course",   blurb: "Chart our own way in the world.",      voteMod: 0.010, gov: { a: 2, u: 2 } },
      { key: "defence",   label: "Rearm and lead",     blurb: "Spend on defence and alliances.",      voteMod: 0.000, gov: { a: 2, e: -3 } } ] }
];
G.policyOption = function (axisKey, optKey) {
  var ax = G.POLICY_AXES.filter(function (a) { return a.key === axisKey; })[0];
  if (!ax) return null;
  return ax.options.filter(function (o) { return o.key === optKey; })[0] || null;
};
G.policyVoteMod = function (policy) {
  if (!policy) return 0;
  var tot = 0;
  G.POLICY_AXES.forEach(function (ax) {
    var opt = G.policyOption(ax.key, policy[ax.key]);
    if (opt) tot += opt.voteMod;
  });
  return tot;
};

/* ---- which regions a ticket can win, and the seat ceiling ---------------- */
G.regionLeanFor = function (mode, lineage, regionId) {
  /* a number (logit lean); your ticket can contest every region — leans only bias it */
  if (mode === "dynasty") {
    var table = G.LEANS[lineage];
    if (!table) return 0;                       // unknown lineage: flat everywhere
    return (regionId in table) ? table[regionId] : 0;   // unlisted region: neutral, still winnable
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

/* ---- the rest of the field: who wins the seats you DON'T -----------------
   Relative strengths of the OTHER parties by region, reflecting the current
   (2026) landscape rather than the 2024 result — Reform resurgent, the Greens
   up, the SNP recovering. Used only to populate the seats your ticket loses,
   so the full House can be shown.                                            */
G.LANDSCAPE = {
  SCO: [["SNP",34],["Labour",24],["Reform UK",16],["Conservative",12],["Liberal Democrat",12],["Green",2]],
  WAL: [["Labour",30],["Reform UK",26],["Plaid Cymru",22],["Conservative",10],["Liberal Democrat",6],["Green",6]],
  NI:  [["Sinn Féin",30],["DUP",28],["Alliance",18],["UUP",12],["SDLP",12]],
  NE:  [["Reform UK",34],["Labour",30],["Conservative",16],["Liberal Democrat",8],["Green",8],["Independent",4]],
  NW:  [["Reform UK",34],["Labour",30],["Conservative",16],["Liberal Democrat",8],["Green",8],["Independent",4]],
  YH:  [["Reform UK",34],["Labour",30],["Conservative",16],["Liberal Democrat",8],["Green",8],["Independent",4]],
  EM:  [["Reform UK",34],["Labour",28],["Conservative",20],["Liberal Democrat",8],["Green",6],["Independent",4]],
  WM:  [["Reform UK",34],["Labour",28],["Conservative",20],["Liberal Democrat",8],["Green",6],["Independent",4]],
  EE:  [["Reform UK",30],["Conservative",24],["Liberal Democrat",20],["Labour",16],["Green",7],["Independent",3]],
  SE:  [["Reform UK",28],["Conservative",24],["Liberal Democrat",22],["Labour",16],["Green",7],["Independent",3]],
  SW:  [["Reform UK",28],["Conservative",22],["Liberal Democrat",24],["Labour",16],["Green",7],["Independent",3]],
  LDN: [["Labour",34],["Conservative",18],["Liberal Democrat",16],["Green",16],["Reform UK",12],["Independent",4]]
};
G.LINEAGE_PARTY = {           /* the party label that represents each lineage  */
  Labour: "Labour", Conservative: "Conservative", Liberal: "Liberal Democrat",
  SNP: "SNP", Plaid: "Plaid Cymru", Reform: "Reform UK", Green: "Green", Independent: "Independent"
};
G.playerBloc = function (mode, lineage) {
  if (mode === "dynasty") {
    var lbl = G.LINEAGE_PARTY[lineage] || lineage;
    var pty = G.PARTIES[lbl];
    return { label: lbl, colour: pty ? pty.colour : "#2f5d3a", excl: lbl };
  }
  if (mode === "wildcard") return { label: "Your cabinet", colour: "#b3862f", excl: null };
  return { label: "Your unity ticket", colour: "#2f5d3a", excl: null };
};
G._wpick = function (entries, exclude) {
  var pool = entries.filter(function (e) { return e[0] !== exclude; });
  if (!pool.length) pool = entries;
  var tot = 0, i; for (i = 0; i < pool.length; i++) tot += pool[i][1];
  var r = Math.random() * tot;
  for (i = 0; i < pool.length; i++) { r -= pool[i][1]; if (r <= 0) return pool[i][0]; }
  return pool[pool.length - 1][0];
};
G.partyColour = function (label, blocLabel, blocColour) {
  if (label === blocLabel) return blocColour;
  var p = G.PARTIES[label];
  return p ? p.colour : "#6b6b6b";
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

  var bloc = G.playerBloc(params.mode, params.lineage);
  var totals = {};
  function award(label) { totals[label] = (totals[label] || 0) + 1; }

  var seats = 0, byRegion = [], results = [];
  G.REGIONS.forEach(function (r) {
    var list = geo.byRegion[r.id] || [];
    var landscape = G.LANDSCAPE[r.id] || G.LANDSCAPE.EE;
    var lean = G.regionLeanFor(params.mode, params.lineage, r.id);
    var rec = { id: r.id, name: r.name, total: list.length, won: 0, winnable: lean !== null };
    if (lean === null) {
      list.forEach(function (c) {
        var w = G._wpick(landscape, bloc.excl);
        award(w);
        results.push({ id: c.id, gss: c.gss, name: c.name, region: r.id, won: false, winner: w });
      });
      byRegion.push(rec); return;
    }
    if (params.mode !== "dynasty") lean = G.gauss() * C.unityLeanSpread; // mild local colour
    var regSwing = G.gauss() * rswing;
    list.forEach(function (c) {
      var logit = baseLogit + lean + nat + regSwing + G.gauss() * noise;
      var won = Math.random() < G.sigmoid(logit);
      var winner;
      if (won) { rec.won++; seats++; winner = bloc.label; }
      else { winner = G._wpick(landscape, bloc.excl); }
      award(winner);
      results.push({ id: c.id, gss: c.gss, name: c.name, region: r.id, won: won, winner: winner });
    });
    byRegion.push(rec);
  });

  var breakdown = Object.keys(totals).map(function (label) {
    return { party: label, seats: totals[label], colour: G.partyColour(label, bloc.label, bloc.colour),
             isYou: label === bloc.label };
  }).sort(function (a, b) { return b.seats - a.seats; });

  return { seats: seats, byRegion: byRegion, results: results,
           breakdown: breakdown, blocLabel: bloc.label, blocColour: bloc.colour };
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

/* ---- coalition maths: who could get you to a majority -------------------- */
G._BLOC = {
  Labour: "L", "Liberal Democrat": "L", Green: "L", SNP: "L", "Plaid Cymru": "L",
  SDLP: "L", Alliance: "C", "Your unity ticket": "C", "Your cabinet": "C",
  Conservative: "R", "Reform UK": "R", DUP: "R", UUP: "R", "Sinn Féin": "X", Independent: "C"
};
G._natural = function (a, b) {
  var x = G._BLOC[a], y = G._BLOC[b];
  if (!x || !y) return false;
  if (x === "C" || y === "C") return true;          // centre works with either
  return x === y;
};
/* seats = your seats; campaign = the run's campaign (has breakdown, blocLabel) */
G.coalitionOptions = function (seats, campaign) {
  var C = G.CONFIG, bd = campaign.breakdown, blocLabel = campaign.blocLabel;
  var largest = bd.length > 0 && bd[0].party === blocLabel;
  var opp = bd.filter(function (p) { return !p.isYou && p.party !== "Sinn Féin"; });

  var deals = [];
  /* single-party deals */
  opp.forEach(function (p) {
    if (seats + p.seats >= C.majority) {
      deals.push({ parties: [p], combined: seats + p.seats, natural: G._natural(blocLabel, p.party) });
    }
  });
  /* two-party deals (only if single options are thin) — search the top opponents */
  if (deals.length < 3) {
    var top = opp.slice(0, 6);
    for (var i = 0; i < top.length; i++) {
      for (var j = i + 1; j < top.length; j++) {
        var a = top[i], b = top[j];
        if (seats + a.seats >= C.majority || seats + b.seats >= C.majority) continue; // already a single
        if (seats + a.seats + b.seats >= C.majority) {
          deals.push({ parties: [a, b], combined: seats + a.seats + b.seats,
                       natural: G._natural(blocLabel, a.party) && G._natural(blocLabel, b.party) && G._natural(a.party, b.party) });
        }
      }
    }
  }
  deals.sort(function (x, y) { return (y.natural - x.natural) || (x.combined - y.combined); });
  deals = deals.slice(0, 5);

  return {
    soloMajority: seats >= C.majority,
    largest: largest,
    need: Math.max(0, C.majority - seats),
    deals: deals,
    canMinority: largest && seats < C.majority
  };
};
/* opts: { mode, lineage, difficulty, govern } */
G.runElection = function (cabinet, opts) {
  opts = opts || {};
  var C = G.CONFIG;
  var diff = C.difficulties[opts.difficulty] || C.difficulties.normal;
  var mode = opts.mode || "unity";
  var lineage = mode === "dynasty" ? opts.lineage : null;

  var rating = G.rateCabinet(cabinet);
  var vote = G.voteShare(rating, diff);
  vote = Math.max(0.05, Math.min(0.62, vote + G.policyVoteMod(opts.policy)));   // manifesto nudge (if any)
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
  var coalition = G.coalitionOptions(campaign.seats, campaign);

  return {
    rating: rating,
    voteShare: vote,
    expectedSeats: expected,
    seats: campaign.seats,
    tier: tier,
    contestable: contestable,
    majorityOf: campaign.seats - C.majority,
    campaign: campaign,
    breakdown: campaign.breakdown,
    coalition: coalition,
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

/* =============================================================================
   650 — ELECTION ENGINE  (v3)
   -----------------------------------------------------------------------------
   A constituency-level, first-past-the-post model, now fully SEEDED:

     1. Each filled seat contributes a weighted stat score x a fit multiplier.
     2. The cabinet's PER-SEAT strength maps to a notional national VOTE SHARE
        (nudged by the chosen difficulty and any manifesto).
     3. That share sets a national per-seat win probability via a cube-law-style
        logistic curve. Every one of the 650 constituencies is then its own
        contest: a PERSISTENT seat lean (the same seats stay safe or marginal
        from game to game), a regional lean, a shared regional swing, a national
        swing and per-seat luck decide the winner. FPTP means small vote shifts
        swing many seats.
     4. Every rival party fields its own RANDOM front bench each game, drawn
        from its party-locked figures the player did NOT draft. A strong rival
        bench takes a bigger share of the seats you lose and puts a little
        extra pressure on you; a weak one folds. Every game is unique.
     5. The whole campaign runs off one RNG seeded per run, so a given run is
        exactly reproducible — and leaderboard-fair.
     6. Running many campaigns gives the odds (P(majority), P(landslide), …).

   Single-party (Dynasty) tickets carry their tradition's real geography. Unity,
   Wildcard and 2024 tickets contest all 650 — with the player's chosen
   ALIGNMENT giving a modest regional tilt (never touching the draft itself).
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
  var raw = 0, eras = {}, fits = 0, filled = 0, despots = 0, flagged = 0;
  G.PORTFOLIOS.forEach(function (port) {
    var pol = cabinet[port.key]; if (!pol) return;
    filled++;
    var c = G.seatContribution(pol, port.key);
    raw += c.value; if (c.fit) fits++; eras[pol.era] = true;
    if (G.isDespot && G.isDespot(pol)) despots++;
    else if (G.isFlagged && G.isFlagged(pol)) flagged++;
  });
  /* a despot in the cabinet is a national scandal (compounding); a flagged
     figure (a conspiracist, say) is a milder, persistent credibility drag. */
  var penalty = despots > 0 ? Math.pow((G.CONFIG.despotPenalty || 0.75), despots) : 1;
  if (flagged > 0) penalty *= Math.pow((G.CONFIG.flaggedPenalty || 0.92), flagged);
  var adjusted = raw * penalty;
  return { raw: adjusted, rawBase: raw, despots: despots, flagged: flagged, penalty: penalty,
           filled: filled, fits: fits,
           distinctEras: Object.keys(eras).length, perSeat: filled ? adjusted / filled : 0 };
};

/* ---- seeded randomness ----------------------------------------------------
   mulberry32: small, fast, good enough for a game — and fully reproducible.
   Every random draw in a campaign comes from one of these, seeded per run.  */
G.hash32 = function (str) {
  var h = 2166136261 >>> 0;
  str = String(str == null ? "" : str);
  for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
};
G.makeRng = function (seed) {
  var a = (typeof seed === "number" ? seed : G.hash32(seed)) >>> 0;
  if (a === 0) a = 0x9e3779b9;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    var t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
G.sigmoid = function (x) { return 1 / (1 + Math.exp(-x)); };
/* gaussian from a given uniform rng (Box–Muller) */
G.gaussR = function (rnd) {
  var u = 0, v = 0;
  while (u === 0) u = rnd();
  while (v === 0) v = rnd();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};
/* legacy unseeded gaussian (kept for any caller outside the election) */
G.gauss = function () { return G.gaussR(Math.random); };

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
  var mpByName = {};
  function nrm(s) { return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }
  if (G.CURRENT_MPS) G.CURRENT_MPS.forEach(function (m) {
    var p = G.PARTIES[m.party];
    var rec = { name: m.name, party: m.party, colour: p ? p.colour : "#6b6b6b" };
    seatMP[m.gss] = rec;
    if (m.cons) mpByName[nrm(m.cons)] = rec;
  });
  /* self-healing fallback: any hex whose gss has no MP (a GSS-code drift between
     the cartogram and the MP dataset) is filled by matching the constituency
     NAME instead — so the 2024 map never shows a blank seat. */
  cons.forEach(function (c) {
    if (!seatMP[c.gss]) { var m = mpByName[nrm(c.name)]; if (m) seatMP[c.gss] = m; }
  });
  G.GEO = { constituencies: cons, byRegion: byRegion, seatMP: seatMP };
  return G.GEO;
};
/* PERSISTENT per-seat lean, derived from the seat's id — so Bootle stays safe
   and the same handful of marginals stay marginal, game after game. */
G.seatBaseLean = function (c) {
  var spread = G.CONFIG.seatBaseLeanSpread || 0;
  if (!spread) return 0;
  return ((G.hash32(c.gss || c.id) % 10000) / 10000 - 0.5) * 2 * spread;
};

/* ---- vote share from a cabinet rating (+ difficulty nudge) --------------- */
/* Uses PER-SEAT strength so a standard twelve and an expanded sixteen are
   judged on the same scale (48 = weak bench, 92 = the dream team). */
G.voteShare = function (rating, diff) {
  var C = G.CONFIG;
  var t = (rating.perSeat - 48) / (92 - 48);
  t = Math.max(0, Math.min(1.05, t));
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

/* ---- alignment ------------------------------------------------------------ */
/* the player's numeric alignment for a run: a custom pick in the customisable
   modes, the lineage's politics in Dynasty, centre otherwise. */
G.playerAlignValue = function (mode, lineage, custom) {
  if (mode === "dynasty") {
    return (lineage in (G.LINEAGE_ALIGN || {})) ? G.LINEAGE_ALIGN[lineage] : 0;
  }
  if (custom && custom.align != null) return G.alignValue(custom.align);
  return 0;
};

/* ---- which regions a ticket can win, and the seat ceiling ---------------- */
G.regionLeanFor = function (mode, lineage, regionId) {
  /* a number (logit lean); your ticket can contest every region — leans only bias it */
  if (mode === "dynasty") {
    var table = G.LEANS[lineage];
    if (!table) return 0;                       // unknown lineage: flat everywhere
    return (regionId in table) ? table[regionId] : 0;   // unlisted region: neutral, still winnable
  }
  return 0; // unity / wildcard / 2024: everywhere (alignment adds its own mild tilt)
};
/* the modest alignment tilt (custom modes only — Dynasty's LEANS already
   encode its geography). Left tickets run a touch stronger in left-leaning
   regions and vice versa. Never large; never touches the draft. */
G.alignRegionTilt = function (mode, alignValue, regionId) {
  if (mode === "dynasty" || !alignValue) return 0;
  var tilt = (G.REGION_TILT || {})[regionId] || 0;
  /* a left (negative) player in a left (negative) region gains: product > 0 */
  return alignValue * tilt * (G.CONFIG.alignTiltScale || 0);
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
   so the full Commons can be shown. Each party's share is then scaled by the
   quality of the random front bench it drafted for THIS game.               */
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
  SNP: "SNP", Plaid: "Plaid Cymru", Reform: "Reform UK", Green: "Green", Independent: "Independent",
  DUP: "DUP", UUP: "UUP", SDLP: "SDLP", SinnFein: "Sinn Féin", Alliance: "Alliance", TUV: "TUV",
  Fringe: "Monster Raving Loony", YourParty: "Your Party", Restore: "Restore Britain"
};
G.playerBloc = function (mode, lineage, custom) {
  if (mode === "dynasty") {
    var lbl = G.LINEAGE_PARTY[lineage] || lineage;
    var pty = G.PARTIES[lbl];
    return { label: lbl, colour: pty ? pty.colour : "#2f5d3a", excl: lbl };
  }
  var def = G.defaultCustom ? G.defaultCustom(mode) : { name: "Your cabinet", colour: "#2f5d3a" };
  var name = (custom && custom.name) ? String(custom.name) : def.name;
  var colour = (custom && custom.colour) ? String(custom.colour) : def.colour;
  return { label: name, colour: colour, excl: null };
};
G._wpick = function (entries, exclude, strengths, rnd) {
  rnd = rnd || Math.random;
  var pool = entries.filter(function (e) { return e[0] !== exclude; });
  if (!pool.length) pool = entries;
  function w(e) {
    var s = strengths && strengths[e[0]] ? strengths[e[0]].strength : 1;
    return e[1] * s * s;        /* squared: a strong rival bench really shows */
  }
  var tot = 0, i; for (i = 0; i < pool.length; i++) tot += w(pool[i]);
  var r = rnd() * tot;
  for (i = 0; i < pool.length; i++) { r -= w(pool[i]); if (r <= 0) return pool[i][0]; }
  return pool[pool.length - 1][0];
};
G.partyColour = function (label, blocLabel, blocColour) {
  if (label === blocLabel) return blocColour;
  var p = G.PARTIES[label];
  return p ? p.colour : "#6b6b6b";
};

/* Expand a region-level international result into a deterministic per-seat
   declaration list (one record per seat, in region order). The player takes
   the region's `won` seats; the remaining seats are dealt to the leading
   opposition parties from that region's landscape by largest-remainder, so the
   live tally reconciles exactly with the headline seat totals. Deterministic —
   uses no rng — so a replay produces the identical declaration order.          */
G.expandSeatResults = function (campaign, sys) {
  var blocLabel = campaign.blocLabel;
  var despot = sys && (sys.despotMode || sys.coalitionStyle === "guided");
  var results = [];
  (campaign.byRegion || []).forEach(function (r) {
    var won = Math.max(0, Math.min(r.total, r.won || 0));
    var lost = r.total - won;

    /* opposition split for this region, largest-remainder over `lost` seats */
    var oppSeats = {};
    if (lost > 0) {
      var land = (G.activeLandscape ? G.activeLandscape(r.id) : null) || [];
      var opp = [];
      land.forEach(function (e) { if (e[0] !== blocLabel && e[1] > 0) opp.push({ p: e[0], w: e[1] }); });
      if (!opp.length) opp = [{ p: "Opposition", w: 1 }];
      var sum = opp.reduce(function (a, b) { return a + b.w; }, 0);
      var rem = [], assigned = 0;
      opp.forEach(function (o) {
        var exact = lost * o.w / sum, base = Math.floor(exact);
        oppSeats[o.p] = base; assigned += base;
        rem.push({ p: o.p, frac: exact - base });
      });
      rem.sort(function (a, b) { return b.frac - a.frac; });
      for (var k = 0; assigned < lost; k++, assigned++) oppSeats[rem[k % rem.length].p]++;
    }

    /* Deal the region's seats with every party's seats spread EVENLY through the
       declaration order (deterministic — each seat gets a fractional position
       within its party's block, then the region is sorted by that). This keeps
       any partial count representative — vital for the live nowcast — and makes
       the reveal realistic (wins and losses interleave, not all-wins-then-all-
       losses). Pure reorder of the same seats, so the result is unchanged.     */
    var groups = [];
    if (won > 0) groups.push({ won: true, winner: blocLabel, n: won });
    Object.keys(oppSeats).forEach(function (party) { if (oppSeats[party] > 0) groups.push({ won: false, winner: party, n: oppSeats[party] }); });
    var recs = [];
    groups.forEach(function (g) { for (var i = 0; i < g.n; i++) recs.push({ won: g.won, winner: g.winner, key: (i + 0.5) / g.n }); });
    recs.sort(function (a, b) { return a.key - b.key; });
    var idx = 0;
    recs.forEach(function (rec) {
      results.push({ id: r.id + "#" + (idx++), name: r.name, region: r.id, won: rec.won, winner: rec.winner });
    });
  });
  return results;
};

/* ---- the random opposition: every rival drafts its own bench ------------- */
/* For each party in the landscape, sample a cabinet-sized bench UNIFORMLY at
   random from that party's OWN figures (same lineage), excluding anyone the
   player drafted and anything out of scope for the mode. Its mean prominence
   maps to a strength multiplier in [oppStrengthMin, oppStrengthMax]. Parties
   with no roster (the NI parties) draw a pure random strength in the same
   band. Everything comes off the run's seeded RNG, so it is reproducible.   */
G.oppositionPartyLabels = function () {
  var seen = {}, out = [];
  /* for international games use the country-specific landscape */
  var sysKey = G.state && G.state._electoralSystemKey;
  var sys = sysKey && G.ELECTORAL_SYSTEMS && G.ELECTORAL_SYSTEMS[sysKey];
  var countryLand = (sys && sys.regionKey && sys.regionKey !== "uk" && G.COUNTRY_LANDSCAPES)
                    ? G.COUNTRY_LANDSCAPES[sys.regionKey] : null;
  var source = countryLand || G.LANDSCAPE;
  Object.keys(source).forEach(function (rid) {
    (source[rid] || []).forEach(function (e) { if (!seen[e[0]]) { seen[e[0]] = 1; out.push(e[0]); } });
  });
  return out;
};
G._oppPool = function (label, mode, draftedNames) {
  var lineage = G.lineageOf(label);
  /* international games need wild-scope politicians in opposition benches */
  var sysKey = G.state && G.state._electoralSystemKey;
  var isIntl = sysKey && sysKey !== "fptp_uk";
  return (G.POLITICIANS || []).filter(function (p) {
    if (draftedNames && draftedNames[p.name]) return false;        // the player got there first
    if (G.lineageOf(p.party) !== lineage) return false;            // party-locked
    if (G.isDespot && G.isDespot(p)) return false;                 // no despot benches
    if (G.castOf && G.castOf(p) !== "statesman") return false;     // nor SpAds, nor space warriors
    if (mode === "parl2024") return !!p.mp2024;                    // 2024: sitting MPs only
    if (isIntl) return p.scope !== "p24";                          // international: allow wild
    return p.scope !== "p24" && p.scope !== "wild";                // UK: historical UK records
  });
};
G.buildOppositionField = function (opts, rnd) {
  rnd = rnd || Math.random;
  var C = G.CONFIG;
  var lo = C.oppStrengthMin || 0.85, hi = C.oppStrengthMax || 1.15;
  var diff = (C.difficulties[opts.difficulty] || {});
  var boost = diff.oppBoost || 1;
  var need = (G.PORTFOLIOS || []).length || 12;
  var excl = opts.excl || null;                 // the player's own party (Dynasty)
  var field = {};
  G.oppositionPartyLabels().forEach(function (label) {
    if (label === excl) return;
    var pool = G._oppPool(label, opts.mode, opts.draftedNames);
    var bench = [], rating = 0;
    if (pool.length) {
      var a = pool.slice();
      while (a.length && bench.length < need) bench.push(a.splice(Math.floor(rnd() * a.length), 1)[0]);
      var sum = 0;
      bench.forEach(function (p) { sum += G.PROMINENCE ? G.PROMINENCE(p) : 50; });
      rating = sum / bench.length;
      /* 48 = weak bench, 70 = formidable; map into the strength band */
      var t = Math.max(0, Math.min(1, (rating - 48) / 22));
      var strength = lo + (hi - lo) * t;
      strength += G.gaussR(rnd) * 0.03;                       // a touch of campaign form
      field[label] = {
        strength: Math.max(lo, Math.min(hi, strength * boost)),
        rating: Math.round(rating),
        /* full pol refs (stats/fits/era) so coalition partners can actually
           staff cabinet posts from this simulated bench */
        bench: bench.slice(0, need).map(function (p) {
          return { name: p.name, party: p.party, stats: p.stats, fits: p.fits, era: p.era, scope: p.scope, note: p.note };
        })
      };
    } else {
      field[label] = { strength: lo + rnd() * (hi - lo), rating: null, bench: [] };
    }
  });
  /* the average pressure the field puts on the player's own contests */
  var keys = Object.keys(field), tot = 0;
  keys.forEach(function (k) { tot += field[k].strength; });
  field._pressure = keys.length ? (tot / keys.length - 1) * (C.oppPressure || 0) : 0;
  return field;
};

/* ---- one full campaign across all 650 real constituencies ---------------- */
/* params: { vote, mode, lineage, midShift, noiseMul, custom, align,
             opposition, rnd }
   returns { seats, byRegion:[{id,name,total,won,winnable}],
             results:[{id,gss,name,region,won,winner}], breakdown, … }      */
G.simulateCampaign = function (params) {
  /* Route to active international electoral system if one is set */
  var _sys = G.activeElectoralSystem && G.activeElectoralSystem();
  if (_sys && _sys.simulate) {
    var _r = _sys.simulate(params, params.rnd || Math.random);
    /* International simulators return region-level results; expand them into a
       deterministic per-seat declaration list so the live count can run.
       Pure function of byRegion + landscape — no rng, so replays are identical. */
    if (_r && _r.byRegion && !_r.results && G.expandSeatResults)
      _r.results = G.expandSeatResults(_r, _sys);
    /* name every seat's MP (the international per-seat list already flows by
       region, so no re-ordering) */
    if (_r && _r.results && G.assignSeatMPs) G.assignSeatMPs(_r.results, {
      blocLabel: _r.blocLabel, draftedNames: params.draftedNames,
      cabinet: G.state && G.state.cabinet, oppositionField: params.opposition
    });
    /* per-region prior for the live-night nowcast: each region's player win rate.
       Deterministic (a read of this campaign's own regional outcome), so it lets
       the projection track THIS result as seats declare — parity with the UK
       constituency path's regionExpected. */
    if (_r && _r.byRegion && !_r.regionExpected) {
      _r.regionExpected = {};
      _r.byRegion.forEach(function (r) { _r.regionExpected[r.id] = r.total > 0 ? Math.max(0, Math.min(1, (r.won || 0) / r.total)) : 0; });
    }
    return _r;
  }

  var C = G.CONFIG, geo = G.buildGeo();
  var rnd = params.rnd || Math.random;
  var opposition = params.opposition || null;
  var pressure = opposition ? (opposition._pressure || 0) : 0;
  var baseLogit = C.seatsK * (params.vote - (C.seatsMid + params.midShift)) - pressure;
  var noise = C.seatNoise * params.noiseMul;
  var rswing = C.regionSwing * params.noiseMul;
  /* national swing for this campaign — fat-tailed (SimCore v2) so upsets and
     blowouts live in the tails; mean-zero, so the central projection is intact */
  var nat = G.SimCore ? G.SimCore.fatSwing(rnd, params.noiseMul) : G.gaussR(rnd) * 0.30 * params.noiseMul;

  var bloc = G.playerBloc(params.mode, params.lineage, params.custom);
  var totals = {};
  function award(label) { totals[label] = (totals[label] || 0) + 1; }

  var seats = 0, byRegion = [], results = [];
  var regionExpected = {};      // deterministic per-region win prob (nowcast prior)
  G.REGIONS.forEach(function (r) {
    var list = geo.byRegion[r.id] || [];
    var landscape = (G.activeLandscape ? G.activeLandscape(r.id) : null) || G.LANDSCAPE[r.id] || G.LANDSCAPE.EE;
    var lean = G.regionLeanFor(params.mode, params.lineage, r.id);
    var rec = { id: r.id, name: r.name, total: list.length, won: 0, winnable: lean !== null };
    if (lean === null) {
      list.forEach(function (c) {
        var w = G._wpick(landscape, bloc.excl, opposition, rnd);
        award(w);
        results.push({ id: c.id, gss: c.gss, name: c.name, region: r.id, won: false, winner: w });
      });
      regionExpected[r.id] = 0;
      byRegion.push(rec); return;
    }
    var lean0 = (params.mode === "dynasty") ? lean : 0;                       // deterministic base (unityLean is random)
    if (params.mode !== "dynasty") lean = G.gaussR(rnd) * C.unityLeanSpread;  // mild local colour
    var tilt = G.alignRegionTilt(params.mode, params.align || 0, r.id)        // the modest politics tilt
             + ((params.regionTilt && params.regionTilt[r.id]) || 0);         // electorate/campaign regional tilt
    lean += tilt;
    /* this campaign's own deterministic per-region expectation (no swing / noise) */
    regionExpected[r.id] = G.sigmoid(baseLogit + lean0 + tilt);
    var regSwing = G.gaussR(rnd) * rswing;
    list.forEach(function (c) {
      var incumbBonus = (params.heldSeats && params.heldSeats[c.gss]) ? (C.incumbencyLean || 0) : 0;
      /* per-seat voter-bloc texture: the seats where a swinging bloc lives are
         the ones that actually move (mean-zero within the region). */
      var elecTex = (params.blocSupport && G.seatElectorateTexture) ? G.seatElectorateTexture(c, params.blocSupport, r.id) : 0;
      var logit = baseLogit + lean + nat + regSwing + G.seatBaseLean(c) + incumbBonus + elecTex + G.gaussR(rnd) * noise;
      var won = rnd() < G.sigmoid(logit);
      var winner;
      if (won) { rec.won++; seats++; winner = bloc.label; }
      else { winner = G._wpick(landscape, bloc.excl, opposition, rnd); }
      award(winner);
      results.push({ id: c.id, gss: c.gss, name: c.name, region: r.id, won: won, winner: winner });
    });
    byRegion.push(rec);
  });

  var breakdown = Object.keys(totals).map(function (label) {
    return { party: label, seats: totals[label], colour: G.partyColour(label, bloc.label, bloc.colour),
             isYou: label === bloc.label };
  }).sort(function (a, b) { return b.seats - a.seats; });

  /* name every seat's MP (deterministic), then declare in realistic UK order */
  if (G.assignSeatMPs) G.assignSeatMPs(results, {
    blocLabel: bloc.label, draftedNames: params.draftedNames, cabinet: G.state && G.state.cabinet,
    oppositionField: opposition
  });
  if (G.orderDeclarations) results = G.orderDeclarations(results, false);

  return { seats: seats, byRegion: byRegion, results: results,
           breakdown: breakdown, blocLabel: bloc.label, blocColour: bloc.colour,
           opposition: opposition, regionExpected: regionExpected };
};

/* ---- fast seat-total estimate for one campaign (for the odds loop) ------- */
G.estimateSeats = function (params) {
  /* Route to active international electoral system if one is set */
  var _sys2 = G.activeElectoralSystem && G.activeElectoralSystem();
  if (_sys2 && _sys2.estimateFn) return _sys2.estimateFn(params, params.rnd || Math.random);
  /* UK/default path is the shared SimCore trial (fat-tailed, correlated) */
  return G.SimCore.trial(params, params.rnd || Math.random).total;
};

/* ---- central (deterministic) projection ---------------------------------- */
G.expectedSeats = function (params) {
  var C = G.CONFIG;
  var pressure = params.opposition ? (params.opposition._pressure || 0) : 0;
  var baseLogit = C.seatsK * (params.vote - (C.seatsMid + params.midShift)) - pressure;
  var total = 0;
  G.REGIONS.forEach(function (r) {
    var lean = G.regionLeanFor(params.mode, params.lineage, r.id);
    if (lean === null) return;
    if (params.mode !== "dynasty") lean = 0;
    lean += G.alignRegionTilt(params.mode, params.align || 0, r.id);
    lean += (params.regionTilt && params.regionTilt[r.id]) || 0;
    total += r.seats * G.sigmoid(baseLogit + lean);
  });
  return Math.round(total);
};

/* ---- result tier --------------------------------------------------------- */
G.ordinal = function (n) {
  n = n | 0; var s = ["th","st","nd","rd"], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
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

/* ---- coalition maths: who could get you to a majority --------------------
   The blanket "natural" flag is gone. Chemistry is read off the alignment
   spectrum: the further apart the partners' politics, the shakier the deal.
     natural   — same neighbourhood of the spectrum
     workable  — a stretch, but a familiar one
     strained  — real ideological distance; expect trouble
     unlikely  — opposite ends; a marriage of pure arithmetic               */
G.COALITION_TAGS = ["natural", "workable", "strained", "unlikely"];
G.coalitionTagFor = function (distance) {
  if (distance <= 0.75) return "natural";
  if (distance <= 1.5)  return "workable";
  if (distance <= 2.5)  return "strained";
  return "unlikely";
};
G._tagRank = function (tag) { return G.COALITION_TAGS.indexOf(tag); };
/* seats = your seats; campaign = the run's campaign; playerAlign = number */
G.coalitionOptions = function (seats, campaign, playerAlign) {
  var C = G.CONFIG, bd = campaign.breakdown, blocLabel = campaign.blocLabel;
  /* use the active system's majority threshold, not the hardcoded UK value */
  var majority = (G.activeMajority ? G.activeMajority() : C.majority);
  if (playerAlign == null) playerAlign = 0;
  /* "largest" from the seat order itself (isYou), not a party-name match — a
     custom party name that differs from its breakdown label must never demote
     the top-of-the-poll player to the opposition fallback. */
  var largest = bd.length > 0 && (bd[0].isYou || bd[0].party === blocLabel);
  var opp = bd.filter(function (p) { return !p.isYou && p.party !== "Sinn Féin"; });

  function pairTag(parties) {
    /* worst chemistry across player↔each partner and partner↔partner */
    var dmax = 0;
    parties.forEach(function (p) {
      dmax = Math.max(dmax, Math.abs(playerAlign - G.partyAlignValue(p.party)));
    });
    for (var i = 0; i < parties.length; i++) for (var j = i + 1; j < parties.length; j++) {
      dmax = Math.max(dmax, Math.abs(G.partyAlignValue(parties[i].party) - G.partyAlignValue(parties[j].party)));
    }
    return G.coalitionTagFor(dmax);
  }

  var deals = [];
  /* single-party deals */
  opp.forEach(function (p) {
    if (seats + p.seats >= majority) {
      var tag = pairTag([p]);
      deals.push({ parties: [p], combined: seats + p.seats, tag: tag, natural: tag === "natural" });
    }
  });
  /* two-party deals (only if single options are thin) — search the top opponents */
  if (deals.length < 3) {
    var top = opp.slice(0, 8);
    for (var i = 0; i < top.length; i++) {
      for (var j = i + 1; j < top.length; j++) {
        var a = top[i], b = top[j];
        if (seats + a.seats >= majority || seats + b.seats >= majority) continue; // already a single
        if (seats + a.seats + b.seats >= majority) {
          var tag2 = pairTag([a, b]);
          deals.push({ parties: [a, b], combined: seats + a.seats + b.seats, tag: tag2, natural: tag2 === "natural" });
        }
      }
    }
  }
  deals.sort(function (x, y) { return (G._tagRank(x.tag) - G._tagRank(y.tag)) || (x.combined - y.combined); });
  deals = deals.slice(0, 5);

  return {
    soloMajority: seats >= majority,
    largest: largest,
    need: Math.max(0, majority - seats),
    deals: deals,
    canMinority: largest && seats < majority
  };
};

/* opts: { mode, lineage, difficulty, govern, policy, custom, draftedNames,
           seed, runId } */
G.runElection = function (cabinet, opts) {
  opts = opts || {};
  var C = G.CONFIG;
  var diff = C.difficulties[opts.difficulty] || C.difficulties.normal;
  var mode = opts.mode || "unity";
  var lineage = mode === "dynasty" ? opts.lineage : null;
  var custom = mode === "dynasty" ? null : (opts.custom || null);

  /* the run's seed: provided (reproducible) or minted fresh */
  var seed = (opts.seed != null) ? (opts.seed >>> 0)
           : G.hash32((opts.runId || "") + "|" + Date.now() + "|" + Math.random());
  var rnd = G.makeRng(seed);

  var rating = G.rateCabinet(cabinet);
  var vote = G.voteShare(rating, diff);
  vote = Math.max(0.05, Math.min(0.62, vote + G.policyVoteMod(opts.policy)));   // manifesto nudge (if any)
  /* career vote modifier: accumulated from prior term performance (one-shot) */
  if (G.careerApplyVoteMod) vote = G.careerApplyVoteMod(vote);
  /* electorate vote nudge: bloc support → ≈ ±0.06 national vote shift */
  if (G.electorateVoteMod && opts.blocSupport)
    vote = Math.max(0.05, Math.min(0.62, vote + G.electorateVoteMod(opts.blocSupport)));
  /* campaign vote delta (debate win/loss + theme) */
  if (opts.campaignVoteDelta)
    vote = Math.max(0.05, Math.min(0.62, vote + opts.campaignVoteDelta));
  var contestable = G.contestableSeats(mode, lineage);
  var align = G.playerAlignValue(mode, opts.lineage, custom);
  var bloc = G.playerBloc(mode, opts.lineage, custom);

  /* every rival party drafts its own random bench for THIS game */
  var opposition = G.buildOppositionField({
    mode: mode, difficulty: opts.difficulty, draftedNames: opts.draftedNames || null, excl: bloc.excl
  }, rnd);

  /* incumbency: seats held in the prior parliament get a logit bonus */
  var heldSeats = null;
  if (G.career && G.career.active && G.career.heldSeats && G.career.heldSeats.length) {
    heldSeats = {};
    G.career.heldSeats.forEach(function (gss) { heldSeats[gss] = true; });
  }

  /* compute regional tilt from electorate + campaign (deterministic, pre-RNG) */
  var regionTilt = opts.regionTilt || null;
  if (!regionTilt && G.electorateRegionTilt && opts.blocSupport)
    regionTilt = G.electorateRegionTilt(opts.blocSupport);
  var _electorateTilt = regionTilt;          // tilt BEFORE cabinet coupling (for leverage)
  /* cabinet → geography coupling: who you drafted shifts WHERE you win
     (deterministic, mean-centred — no RNG, no total-seat inflation) */
  if (G.SimCore && G.SimCore.cabinetRegionTilt) {
    var _cabTilt = G.SimCore.cabinetRegionTilt(cabinet, { mode: mode, lineage: lineage, align: align });
    regionTilt = G.SimCore.mergeTilt(regionTilt, _cabTilt);
  }

  var params = { vote: vote, mode: mode, lineage: lineage, midShift: diff.midShift,
                 noiseMul: diff.noiseMul, custom: custom, align: align,
                 opposition: opposition, heldSeats: heldSeats, rnd: rnd,
                 regionTilt: regionTilt };

  var expected = G.expectedSeats(params);

  /* use system-specific thresholds for odds */
  var _activeSys = G.activeElectoralSystem && G.activeElectoralSystem();
  var _majority = (_activeSys && _activeSys.majority) || C.majority;
  var _totalSeats = (_activeSys && _activeSys.totalSeats) || C.totalSeats;
  var _landslide = Math.round(_totalSeats * (C.tierLandslide / (C.totalSeats || 650)));
  var _super = Math.round(_totalSeats * (C.tierSuper / (C.totalSeats || 650)));

  /* Monte-Carlo forecast — runs on its OWN seeded RNG, decoupled from the
     headline draw so the trial count can never change the actual result. */
  var forecastRnd = G.makeRng((seed ^ 0x9e3779b9) >>> 0);
  var forecastParams = {};
  for (var _k in params) if (params.hasOwnProperty(_k)) forecastParams[_k] = params[_k];
  forecastParams.rnd = forecastRnd;
  var fc = G.SimCore.forecast(forecastParams, C.trials, forecastRnd,
             { majority: _majority, landslide: _landslide, supermajority: _super, total: _totalSeats });

  /* cabinet leverage — deterministic sensitivity of each slot + best bench swap */
  var leverage = null;
  if (G.SimCore.leverage)
    leverage = G.SimCore.leverage(cabinet, opts.pool, params,
                 { diff: diff, baseTilt: _electorateTilt, seed: seed });

  /* the headline campaign that actually gets watched / shown (uses the main rnd,
     immediately after the opposition draft — independent of the forecast) */
  var campaign = G.simulateCampaign(params);
  /* use active system's tier function if available, else existing G.tierFor */
  var tier;
  if (_activeSys && _activeSys.tierLabel) {
    var _tierLabel = _activeSys.tierLabel(campaign.seats, _totalSeats);
    tier = { key: "govt", label: _tierLabel, govt: campaign.seats >= _majority,
             role: campaign.seats >= _majority ? "majority" : "coalition" };
  } else {
    tier = G.tierFor(campaign.seats, contestable);
  }
  var coalition = G.coalitionOptions(campaign.seats, campaign, align);

  /* where the player actually finished among the parties (v4). With a tiny
     seat count you are NOT the Official Opposition — you're a minor party. */
  var bd = campaign.breakdown;
  var youRank = 0, leadOpp = null;
  for (var bi = 0; bi < bd.length; bi++) {
    if (bd[bi].party === campaign.blocLabel) youRank = bi + 1;
    else if (!leadOpp) leadOpp = bd[bi];
  }
  if (!tier.govt && tier.key === "opposition") {
    if (youRank === 1) {
      tier = { key: "largest", label: "Largest party — hung parliament", govt: false, role: "largest" };
    } else if (youRank === 2) {
      tier = { key: "opposition", label: "Official Opposition", govt: false, role: "opposition" };
    } else if (campaign.seats <= 0) {
      tier = { key: "wipeout", label: "Wiped Out — not a single seat", govt: false, role: "minor" };
    } else {
      tier = { key: "minor", label: "Minor party — " + G.ordinal(youRank || bd.length) + " largest",
               govt: false, role: "minor" };
    }
  } else if (!tier.role) {
    tier.role = tier.govt ? "govt" : (tier.key === "kingmaker" ? "kingmaker" : "opposition");
  }

  return {
    rating: rating,
    voteShare: vote,
    expectedSeats: expected,
    seats: campaign.seats,
    tier: tier,
    youRank: youRank,
    partiesAbove: Math.max(0, (youRank || 1) - 1),
    leadOpp: leadOpp,
    contestable: contestable,
    majorityOf: campaign.seats - C.majority,
    campaign: campaign,
    breakdown: campaign.breakdown,
    coalition: coalition,
    opposition: opposition,
    align: align,
    custom: custom,
    seed: seed,
    runId: opts.runId || null,
    difficulty: opts.difficulty || "normal",
    govern: !!opts.govern,
    governVerdict: G.governVerdict(rating, campaign.seats),
    odds: {
      majority:      fc.probs.majority,
      landslide:     fc.probs.landslide,
      supermajority: fc.probs.supermajority,
      sweep:         fc.probs.sweep
    },
    range: { low: fc.pct.p5, median: fc.pct.p50, high: fc.pct.p95 },
    /* the full Monte-Carlo forecast (distribution, percentiles, tier + region
       probabilities) for the richer forecast/odds UI */
    forecast: fc,
    /* per-slot expected-seats leverage + best available bench swap */
    leverage: leverage
  };
};

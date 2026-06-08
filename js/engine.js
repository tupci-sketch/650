/* =============================================================================
   650 — GAME ENGINE  (v2)
   Owns the run state and the draft loop. Honours the pre-game setup: mode
   (unity / dynasty / wildcard), allowed eras, difficulty, draft visibility,
   govern-vs-simulate, and live-vs-instant results.
   ========================================================================== */

window.G = window.G || {};
G.state = null;

/* eras a given mode is allowed to use */
G.erasForMode = function (mode) {
  return G.ERAS.filter(function (e) {
    return mode === "wildcard" ? true : !e.wildOnly;
  }).map(function (e) { return e.id; });
};

/* does a politician belong in this mode's pool? */
G.inScope = function (p, mode) {
  return mode === "wildcard" ? true : p.scope !== "wild";
};

/* build the draftable pool for a config */
G.poolFor = function (opts) {
  var mode = opts.mode || "unity";
  var eras = opts.eras || G.erasForMode(mode);
  var lineage = opts.lineage || null;
  return G.POLITICIANS.filter(function (p) {
    if (!G.inScope(p, mode)) return false;
    if (eras.indexOf(p.era) === -1) return false;
    if (mode === "dynasty" && G.lineageOf(p.party) !== lineage) return false;
    return true;
  });
};

/* lineages that can field a full 12 within the allowed eras (Dynasty mode) */
G.eligibleDynastyLineages = function (eras) {
  eras = eras || G.erasForMode("dynasty");
  var counts = {};
  G.POLITICIANS.forEach(function (p) {
    if (p.scope === "wild") return;
    if (eras.indexOf(p.era) === -1) return;
    var lin = G.lineageOf(p.party);
    counts[lin] = (counts[lin] || 0) + 1;
  });
  return Object.keys(counts).filter(function (lin) { return counts[lin] >= G.PORTFOLIOS.length; });
};

/* start a run.
   opts = { mode, lineage, hard, eras, difficulty, govern, watch } */
G.newGame = function (opts) {
  opts = opts || {};
  var mode = (opts.mode === "dynasty" || opts.mode === "wildcard") ? opts.mode : "unity";
  var eras = (opts.eras && opts.eras.length) ? opts.eras : G.erasForMode(mode);
  var lineage = opts.lineage || null;
  var pool = G.poolFor({ mode: mode, eras: eras, lineage: lineage });

  G.state = {
    mode: mode,
    lineage: lineage,
    hard: !!opts.hard,
    eras: eras,
    difficulty: opts.difficulty || "normal",
    govern: !!opts.govern,
    watch: opts.watch !== false,           // default: watch live
    contestable: G.contestableSeats(mode, lineage),
    poolIds: pool.map(function (p) { return p.name; }),
    draftedNames: {},
    cabinet: {},
    spin: null,
    pendingPick: null,
    skips: { era: 1, party: 1 },
    spinsTaken: 0
  };
  return G.state;
};

G.openSeats   = function () { return G.PORTFOLIOS.filter(function (p) { return !G.state.cabinet[p.key]; }); };
G.isComplete  = function () { return G.openSeats().length === 0; };
G.undrafted   = function () {
  var st = G.state;
  return G.POLITICIANS.filter(function (p) {
    return st.poolIds.indexOf(p.name) !== -1 && !st.draftedNames[p.name];
  });
};
G.availableCombos = function () {
  var seen = {}, out = [];
  G.undrafted().forEach(function (p) {
    var key = p.party + "|" + p.era;
    if (!seen[key]) { seen[key] = true; out.push({ party: p.party, era: p.era }); }
  });
  return out;
};
G.candidatesFor = function (party, era) {
  return G.undrafted().filter(function (p) { return p.party === party && p.era === era; });
};

function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

G.spin = function (avoid) {
  var combos = G.availableCombos();
  if (combos.length === 0) return null;
  var filtered = combos;
  if (avoid && avoid.party) filtered = combos.filter(function (c) { return c.party !== avoid.party; });
  if (avoid && avoid.era)   filtered = combos.filter(function (c) { return c.era !== avoid.era; });
  if (filtered.length === 0) filtered = combos;
  var combo = pickRandom(filtered);
  G.state.spin = { party: combo.party, era: combo.era, candidates: G.candidatesFor(combo.party, combo.era) };
  G.state.pendingPick = null;
  G.state.spinsTaken++;
  return G.state.spin;
};
G.skipEra = function () {
  if (G.state.skips.era <= 0 || !G.state.spin) return false;
  G.state.skips.era--; G.spin({ era: G.state.spin.era }); return true;
};
G.skipParty = function () {
  if (G.state.skips.party <= 0 || !G.state.spin) return false;
  G.state.skips.party--; G.spin({ party: G.state.spin.party }); return true;
};
G.choosePick = function (name) {
  if (!G.state.spin) return false;
  var found = G.state.spin.candidates.filter(function (p) { return p.name === name; })[0];
  if (!found) return false;
  G.state.pendingPick = found; return true;
};
G.assignTo = function (portfolioKey) {
  var st = G.state;
  if (!st.pendingPick || st.cabinet[portfolioKey]) return false;
  st.cabinet[portfolioKey] = st.pendingPick;
  st.draftedNames[st.pendingPick.name] = portfolioKey;
  st.pendingPick = null; st.spin = null; return true;
};
G.preview = function () { return G.rateCabinet(G.state.cabinet); };
G.hold = function () {
  return G.runElection(G.state.cabinet, {
    mode: G.state.mode, lineage: G.state.lineage,
    difficulty: G.state.difficulty, govern: G.state.govern
  });
};

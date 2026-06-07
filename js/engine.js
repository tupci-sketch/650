/* =============================================================================
   650 — GAME ENGINE
   -----------------------------------------------------------------------------
   Owns the run state and the draft loop. UI never touches data directly — it
   asks the engine to spin / pick / skip and re-renders from G.state.
   ========================================================================== */

window.G = window.G || {};

G.state = null;

/* lineages with enough members to fill all 12 seats on their own */
G.eligibleDynastyLineages = function () {
  var counts = {};
  G.POLITICIANS.forEach(function (p) {
    var lin = G.lineageOf(p.party);
    counts[lin] = (counts[lin] || 0) + 1;
  });
  return Object.keys(counts).filter(function (lin) {
    return counts[lin] >= G.PORTFOLIOS.length;
  });
};

/* start a new run.
   opts = { mode: "unity" | "dynasty", lineage: "Labour"|..., hard: bool } */
G.newGame = function (opts) {
  opts = opts || {};
  var mode = opts.mode === "dynasty" ? "dynasty" : "unity";
  var lineage = opts.lineage || null;

  var pool = G.POLITICIANS.filter(function (p) {
    return mode === "unity" ? true : G.lineageOf(p.party) === lineage;
  });

  var contestable = G.CONFIG.totalSeats; // unity ticket: stands everywhere
  if (mode === "dynasty") {
    // use the cap of the party that owns this lineage
    var cap = G.CONFIG.totalSeats;
    for (var label in G.PARTIES) {
      if (G.PARTIES[label].lineage === lineage) { cap = Math.min(cap, G.PARTIES[label].cap); break; }
    }
    contestable = cap;
  }

  G.state = {
    mode: mode,
    lineage: lineage,
    hard: !!opts.hard,
    contestable: contestable,
    poolIds: pool.map(function (p) { return p.name; }), // names are unique here
    draftedNames: {},          // name -> portfolioKey
    cabinet: {},               // portfolioKey -> politician
    spin: null,                // { party, era, candidates: [politician] }
    pendingPick: null,         // politician chosen, awaiting a seat
    skips: { era: 1, party: 1 },
    spinsTaken: 0
  };
  return G.state;
};

G.openSeats = function () {
  return G.PORTFOLIOS.filter(function (p) { return !G.state.cabinet[p.key]; });
};
G.isComplete = function () {
  return G.openSeats().length === 0;
};

G.undrafted = function () {
  var st = G.state;
  return G.POLITICIANS.filter(function (p) {
    return st.poolIds.indexOf(p.name) !== -1 && !st.draftedNames[p.name];
  });
};

/* every (party,era) combo still draftable */
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

/* land the reels on a fresh (party,era) with at least one candidate.
   `avoid` lets skips force a different party or era. */
G.spin = function (avoid) {
  var combos = G.availableCombos();
  if (combos.length === 0) return null;
  var filtered = combos;
  if (avoid && avoid.party) filtered = combos.filter(function (c) { return c.party !== avoid.party; });
  if (avoid && avoid.era)   filtered = combos.filter(function (c) { return c.era !== avoid.era; });
  if (filtered.length === 0) filtered = combos; // nothing else available — reroll anyway

  var combo = pickRandom(filtered);
  G.state.spin = {
    party: combo.party,
    era: combo.era,
    candidates: G.candidatesFor(combo.party, combo.era)
  };
  G.state.pendingPick = null;
  G.state.spinsTaken++;
  return G.state.spin;
};

G.skipEra = function () {
  if (G.state.skips.era <= 0 || !G.state.spin) return false;
  G.state.skips.era--;
  G.spin({ era: G.state.spin.era });
  return true;
};
G.skipParty = function () {
  if (G.state.skips.party <= 0 || !G.state.spin) return false;
  G.state.skips.party--;
  G.spin({ party: G.state.spin.party });
  return true;
};

/* choose a candidate (awaiting a seat) */
G.choosePick = function (name) {
  if (!G.state.spin) return false;
  var found = G.state.spin.candidates.filter(function (p) { return p.name === name; })[0];
  if (!found) return false;
  G.state.pendingPick = found;
  return true;
};

/* drop the pending pick into an open seat */
G.assignTo = function (portfolioKey) {
  var st = G.state;
  if (!st.pendingPick) return false;
  if (st.cabinet[portfolioKey]) return false; // seat taken
  st.cabinet[portfolioKey] = st.pendingPick;
  st.draftedNames[st.pendingPick.name] = portfolioKey;
  st.pendingPick = null;
  st.spin = null; // force a new spin for the next seat
  return true;
};

/* live preview of the current cabinet */
G.preview = function () {
  return G.rateCabinet(G.state.cabinet);
};

/* run the election on the finished cabinet */
G.hold = function () {
  return G.runElection(G.state.cabinet, { contestable: G.state.contestable });
};

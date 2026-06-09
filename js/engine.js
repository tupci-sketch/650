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

/* lineages that can field a full cabinet within the allowed eras (Dynasty mode) */
G.eligibleDynastyLineages = function (eras, need) {
  eras = eras || G.erasForMode("dynasty");
  need = need || G.PORTFOLIOS_BASE.length;
  var counts = {};
  G.POLITICIANS.forEach(function (p) {
    if (p.scope === "wild") return;
    if (eras.indexOf(p.era) === -1) return;
    var lin = G.lineageOf(p.party);
    counts[lin] = (counts[lin] || 0) + 1;
  });
  return Object.keys(counts).filter(function (lin) { return counts[lin] >= need; });
};

/* start a run.
   opts = { mode, lineage, hard, eras, difficulty, govern, watch } */
G.newGame = function (opts) {
  opts = opts || {};
  var mode = (opts.mode === "dynasty" || opts.mode === "wildcard") ? opts.mode : "unity";
  var eras = (opts.eras && opts.eras.length) ? opts.eras : G.erasForMode(mode);
  var lineage = opts.lineage || null;
  G.setCabinetSize(opts.cabinetSize === "expanded" ? "expanded" : "standard");
  var pool = G.poolFor({ mode: mode, eras: eras, lineage: lineage });
  var redos = (typeof opts.redos === "number") ? opts.redos : 1;

  G.state = {
    mode: mode,
    lineage: lineage,
    hard: !!opts.hard,
    eras: eras,
    difficulty: opts.difficulty || "normal",
    govern: !!opts.govern,
    watch: opts.watch !== false,           // default: watch live
    cabinetSize: opts.cabinetSize === "expanded" ? "expanded" : "standard",
    policyOn: !!opts.policyOn,              // optional manifesto/programme layer
    policy: null,                           // chosen manifesto stances (set at the manifesto step)
    contestable: G.contestableSeats(mode, lineage),
    poolIds: pool.map(function (p) { return p.name; }),
    draftedNames: {},
    cabinet: {},
    spin: null,
    pendingPick: null,
    skips: { era: redos, party: redos },
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
function sampleN(arr, n) {
  var a = arr.slice(), out = [];
  while (a.length && out.length < n) out.push(a.splice(Math.floor(Math.random() * a.length), 1)[0]);
  return out;
}

/* prominence (0–100ish) ranks a politician within a party+era for tiering */
G.PROMINENCE = function (p) {
  var s = p.stats;
  return (s.appeal + s.experience + s.oratory + s.statecraft + s.partyMgmt) / 5;
};
G.TIERS = [
  { key: "a", label: "Front rank",            min: 72 },
  { key: "b", label: "Cabinet calibre",       min: 60 },
  { key: "c", label: "Frontbench",            min: 52 },
  { key: "d", label: "Backbench & new intake", min: 0 }
];
G.tierOf = function (p) {
  var pr = G.PROMINENCE(p);
  for (var i = 0; i < G.TIERS.length; i++) if (pr >= G.TIERS[i].min) return G.TIERS[i];
  return G.TIERS[G.TIERS.length - 1];
};

/* spin a party + era. If the field is large, drop into a TIER stage; otherwise
   present the candidates directly (sampled down to pickShowMax if needed).     */
G.spin = function (avoid) {
  var combos = G.availableCombos();
  if (combos.length === 0) return null;
  var filtered = combos;
  if (avoid && avoid.party) filtered = combos.filter(function (c) { return c.party !== avoid.party; });
  if (avoid && avoid.era)   filtered = combos.filter(function (c) { return c.era !== avoid.era; });
  if (filtered.length === 0) filtered = combos;
  var combo = pickRandom(filtered);
  var full = G.candidatesFor(combo.party, combo.era);

  var sp = { party: combo.party, era: combo.era, full: full,
             stage: "pick", tier: null, tiers: null, _byTier: null, candidates: null };

  if (full.length > G.CONFIG.tierThreshold) {
    var byTier = {};
    full.forEach(function (p) {
      var t = G.tierOf(p);
      (byTier[t.key] = byTier[t.key] || { key: t.key, label: t.label, list: [] }).list.push(p);
    });
    var tiers = G.TIERS.filter(function (t) { return byTier[t.key]; })
                       .map(function (t) { return { key: t.key, label: t.label, count: byTier[t.key].list.length }; });
    if (tiers.length >= 2) { sp.stage = "tier"; sp.tiers = tiers; sp._byTier = byTier; }
    else { sp.candidates = sampleN(full, G.CONFIG.pickShowMax); }   // one big tier: just sample
  } else {
    sp.candidates = full.slice();                                   // small field: show all
  }
  G.state.spin = sp;
  G.state.pendingPick = null;
  G.state.spinsTaken++;
  return sp;
};

/* choose a tier from the tier stage -> a randomised shortlist to pick from */
G.spinTier = function (tierKey) {
  var sp = G.state.spin; if (!sp || sp.stage !== "tier") return false;
  var bucket = sp._byTier[tierKey];
  if (!bucket) { var first = sp.tiers[0]; bucket = sp._byTier[first.key]; }
  sp.tier = { key: bucket.key, label: bucket.label };
  sp.candidates = sampleN(bucket.list, G.CONFIG.pickShowMax);
  sp.stage = "pick";
  G.state.pendingPick = null;
  return true;
};

/* re-sample the current shortlist (same tier / field) — free, for variety */
G.reshufflePool = function () {
  var sp = G.state.spin; if (!sp || sp.stage !== "pick") return false;
  var pool = sp.tier && sp._byTier ? sp._byTier[sp.tier.key].list : sp.full;
  if (!pool || pool.length <= G.CONFIG.pickShowMax) return false;
  sp.candidates = sampleN(pool, G.CONFIG.pickShowMax);
  G.state.pendingPick = null;
  return true;
};
G.poolRemainder = function () {   // how many more names exist beyond the shortlist
  var sp = G.state.spin; if (!sp || sp.stage !== "pick" || !sp.candidates) return 0;
  var pool = sp.tier && sp._byTier ? sp._byTier[sp.tier.key].list : sp.full;
  return Math.max(0, (pool ? pool.length : 0) - sp.candidates.length);
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
  if (!G.state.spin || !G.state.spin.candidates) return false;
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
    difficulty: G.state.difficulty, govern: G.state.govern,
    policy: G.state.policy
  });
};

/* =============================================================================
   HANDS-OFF SPIN (v3) — the draw is entirely out of the player's hands.
   One tap deals ONE politician who fits a still-open seat (whenever a fit
   exists) and slots them automatically. No tier/quality choice, no choosing
   the person, no party/era rerolls. Odds by mode:
     • wildcard — even chance across every eligible figure (despots included)
     • unity    — small chance a despot intrudes and wrecks the cabinet
     • dynasty  — a chance of a despot on YOUR side of the spectrum
   The four expanded seats (Work/Transport/Environment/Culture) are in nobody's
   "fits" list, so when only those remain a dealt figure is slotted as a misfit
   — which costs rating, by design.
   ========================================================================== */
function fitsAnyOpen(p, openKeys) {
  for (var i = 0; i < p.fits.length; i++) if (openKeys.indexOf(p.fits[i]) !== -1) return true;
  return false;
}
G.openSeatKeys = function () { return G.openSeats().map(function (s) { return s.key; }); };

/* choose the seat a dealt figure goes into: a seat they genuinely fit, scarcest
   first (so we don't strand a hard-to-fill seat); a forced misfit only if they
   fit none of the open seats. */
G.placeSeatFor = function (p, open, remaining) {
  var fitSeats = open.filter(function (s) { return p.fits.indexOf(s.key) !== -1; });
  var target = (fitSeats.length ? fitSeats : open).slice();
  function supply(key) {
    var n = 0;
    for (var i = 0; i < remaining.length; i++) {
      var q = remaining[i];
      if (q.name !== p.name && q.fits.indexOf(key) !== -1) n++;
    }
    return n;
  }
  target.sort(function (a, b) {
    var sa = supply(a.key), sb = supply(b.key);
    if (sa !== sb) return sa - sb;                       // drain the scarcest fit-seat first
    return G.scoreFor(p, b.key) - G.scoreFor(p, a.key);  // otherwise where they're strongest
  });
  return target[0].key;
};

/* The single call the UI makes per draw.
   Returns { politician, seatKey, seatName, despot, fit } or null when full. */
G.deal = function () {
  var st = G.state; if (!st) return null;
  var open = G.openSeats(); if (!open.length) return null;
  var openKeys = open.map(function (s) { return s.key; });

  var pool = null, forced = false;

  if (st.mode === "unity" && Math.random() < (G.CONFIG.despotUnityChance || 0)) {
    var du = G.despotPool(null).filter(function (p) { return !st.draftedNames[p.name] && fitsAnyOpen(p, openKeys); });
    if (du.length) { pool = du; forced = true; }
  } else if (st.mode === "dynasty" && Math.random() < (G.CONFIG.despotDynastyChance || 0)) {
    var dd = G.despotPool(G.spectrumOfLineage(st.lineage))
               .filter(function (p) { return !st.draftedNames[p.name] && fitsAnyOpen(p, openKeys); });
    if (dd.length) { pool = dd; forced = true; }
  }

  if (!pool) {
    var und = G.undrafted();                                 // respects the mode's pool
    var fit = und.filter(function (p) { return fitsAnyOpen(p, openKeys); });
    pool = fit.length ? fit : und;                           // misfit fallback for orphan seats
  }
  if (!pool.length) return null;

  var chosen = pool[Math.floor(Math.random() * pool.length)];   // even chance among the eligible
  var remaining = G.undrafted().filter(function (p) { return p.name !== chosen.name; });
  var seatKey = G.placeSeatFor(chosen, open, remaining);

  st.cabinet[seatKey] = chosen;
  st.draftedNames[chosen.name] = seatKey;
  st.spin = null; st.pendingPick = null; st.spinsTaken++;

  var port = G.PORTFOLIO_BY_KEY[seatKey] || { name: seatKey };
  st.lastDeal = {
    politician: chosen, seatKey: seatKey, seatName: port.name,
    despot: (G.isDespot && G.isDespot(chosen)) || forced,
    fit: chosen.fits.indexOf(seatKey) !== -1
  };
  return st.lastDeal;
};

G.dealComplete = function () { return G.isComplete(); };

/* A snapshot of the finished cabinet for the leaderboard (seat, who, party). */
G.cabinetManifest = function () {
  var st = G.state; if (!st) return [];
  return G.PORTFOLIOS.map(function (port) {
    var p = st.cabinet[port.key];
    return p ? { seat: port.name, name: p.name, party: p.party, era: p.era } : null;
  }).filter(Boolean);
};

/* a single headline rating (0–100) = the mean of the five stats. */
G.overall = function (p) { return (p && p.stats) ? Math.round(G.PROMINENCE(p)) : 0; };

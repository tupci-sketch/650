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
  return G.ERAS.map(function (e) { return e.id; });   // every era everywhere; the
};                                                     // setup defaults e0 off outside Wildcard

/* merge extra politicians from the editable sheet roster into the live pool.
   Each row: { name, party, era, scope, stats, fits, note, despot, mode }.
   mode "parl2024" -> scope "p24" (2024 field); otherwise plays as a UK figure. */
G.mergeRoster = function (list) {
  if (!list || !list.length) return 0;
  var changed = 0;
  list.forEach(function (r) {
    if (!r || !r.name) return;
    var name = String(r.name);
    var is2024 = (r.mode === "parl2024") || (r.scope === "p24");
    var scope = r.scope || (is2024 ? "p24" : "uk");
    var s = r.stats || {};
    var hasStats = s && (s.appeal != null || s.experience != null || s.oratory != null ||
                         s.statecraft != null || s.partyMgmt != null);

    /* OVERRIDE — a sheet row supersedes the baked-in figure(s) of the same name.
       If the row names a scope, only that scope is overridden; otherwise every
       entry for that name is updated (so editing e.g. "Keir Starmer" can touch
       both his historical and his 2024 records). Fields left blank are kept. */
    var matches = G.POLITICIANS.filter(function (x) {
      return x.name === name && (!r.scope || x.scope === scope);
    });
    if (matches.length) {
      matches.forEach(function (fig) {
        if (r.party) fig.party = String(r.party);
        if (r.era)   fig.era   = String(r.era);
        if (r.fits && r.fits.length) fig.fits = r.fits;
        if (r.note != null && r.note !== "") fig.note = String(r.note);
        if (r.despot != null) fig.despot = !!r.despot;
        if (r.cast != null) { if (r.cast) fig.cast = String(r.cast); else delete fig.cast; }
        if (r.flag != null) { if (r.flag) fig.flag = String(r.flag); else delete fig.flag; }
        if (r.wiki || r.img) G.PHOTO[name] = { wiki: r.wiki || undefined, img: r.img || undefined };
        if (hasStats) {
          fig.stats = {
            appeal:     +s.appeal     || fig.stats.appeal     || 50,
            experience: +s.experience || fig.stats.experience || 50,
            oratory:    +s.oratory    || fig.stats.oratory    || 50,
            statecraft: +s.statecraft || fig.stats.statecraft || 50,
            partyMgmt:  +s.partyMgmt  || fig.stats.partyMgmt  || 50
          };
        }
        if (is2024) fig.mp2024 = true;   // edited as a 2024 figure -> ensure it plays in 2024 mode
      });
      changed += matches.length;
      return;
    }

    /* ADD — a brand-new figure that isn't in the baked-in files. */
    var era = r.era || (scope === "p24" ? "e24" : "e7");
    var fig = {
      name: name, party: String(r.party || "Independent"), era: era,
      fits: (r.fits && r.fits.length) ? r.fits : ["leader"],
      stats: { appeal: +s.appeal || 50, experience: +s.experience || 50, oratory: +s.oratory || 50,
               statecraft: +s.statecraft || 50, partyMgmt: +s.partyMgmt || 50 },
      note: String(r.note || ""), scope: scope, despot: !!r.despot
    };
    if (r.cast) fig.cast = String(r.cast);
    if (r.flag) fig.flag = String(r.flag);
    if (r.wiki || r.img) G.PHOTO[name] = { wiki: r.wiki || undefined, img: r.img || undefined };
    if (is2024) fig.mp2024 = true;
    G.POLITICIANS.push(fig);
    changed++;
  });
  return changed;
};

/* does a politician belong in this mode's pool? */
G.inScope = function (p, mode) {
  if (mode === "parl2024") return !!p.mp2024;          // 2024 mode: the whole sitting Parliament
  if (mode === "wildcard")  return p.scope !== "p24";   // wildcard: UK + wild, not the 2024-only seeds
  return p.scope === "uk";                              // unity / dynasty: UK only
};

/* build the draftable pool for a config.
   opts.casts = { insider: bool, novelty: bool } — who may walk into the draft
   (statesmen always can). Dynasty ignores the toggles: a dynasty IS its bench. */
G.poolFor = function (opts) {
  var mode = opts.mode || "unity";
  var casts = opts.casts || { insider: true, novelty: false };
  if (mode === "parl2024") return G.POLITICIANS.filter(function (p) {
    if (!p.mp2024) return false;
    var c = G.castOf(p);
    if (c === "insider" && !casts.insider) return false;
    if (c === "novelty" && !casts.novelty) return false;
    return true;
  });
  var eras = opts.eras || G.erasForMode(mode);
  var lineage = opts.lineage || null;
  return G.POLITICIANS.filter(function (p) {
    if (!G.inScope(p, mode)) return false;
    if (eras.indexOf(p.era) === -1) return false;
    if (mode === "dynasty") return G.lineageOf(p.party) === lineage;   // the whole bench
    var c = G.castOf(p);
    if (c === "insider" && !casts.insider) return false;
    if (c === "novelty" && !casts.novelty) return false;
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
   opts = { mode, lineage, hard, eras, difficulty, govern, watch, custom } */
G.newGame = function (opts) {
  opts = opts || {};
  var mode = (opts.mode === "dynasty" || opts.mode === "wildcard" || opts.mode === "parl2024") ? opts.mode : "unity";
  var eras = (opts.eras && opts.eras.length) ? opts.eras : G.erasForMode(mode);
  var lineage = opts.lineage || null;
  G.setCabinetSize(opts.cabinetSize === "expanded" ? "expanded" : "standard");
  var casts = { insider: !(opts.casts && opts.casts.insider === false),
                novelty: !!(opts.casts && opts.casts.novelty) };
  var pool = G.poolFor({ mode: mode, eras: eras, lineage: lineage, casts: casts });
  var redos = (typeof opts.redos === "number") ? opts.redos : 1;
  var pityUses = (G.CONFIG.pityUses || {})[opts.difficulty || "normal"];
  if (typeof pityUses !== "number") pityUses = 1;

  /* the player's own party identity — name, alignment, colour. Not in
     Dynasty (a dynasty IS its party). Defaults fill anything skipped. */
  var custom = null;
  if (mode !== "dynasty") {
    var def = G.defaultCustom(mode);
    var c = opts.custom || {};
    custom = {
      name:   String(c.name || def.name).slice(0, 28),
      align:  (G.ALIGN_BY_KEY && G.ALIGN_BY_KEY[c.align]) ? c.align : def.align,
      colour: /^#[0-9a-fA-F]{6}$/.test(String(c.colour || "")) ? c.colour : def.colour
    };
  }

  G.state = {
    mode: mode,
    lineage: lineage,
    hard: !!opts.hard,
    eras: eras,
    difficulty: opts.difficulty || "normal",
    govern: !!opts.govern,
    watch: opts.watch !== false,           // default: watch live
    cabinetSize: opts.cabinetSize === "expanded" ? "expanded" : "standard",
    custom: custom,                         // { name, align, colour } | null
    casts: casts,                           // who may walk into the draft
    pity: { uses: pityUses, used: 0 },      // the grandees' remaining interventions
    dealInfo: null,                         // { tiers:[..], boost } for the last deal
    policyOn: !!opts.policyOn,              // optional manifesto/programme layer
    policy: null,                           // chosen manifesto stances (set at the manifesto step)
    contestable: G.contestableSeats(mode, lineage),
    pool: pool,              // the exact draftable figures for this run (by reference)
    draftedNames: {},
    cabinet: {},
    spin: null,
    pendingPick: null,
    choices: null,           // the 3 candidates currently on offer
    lastDeal: null,
    skips: { era: redos, party: redos },
    redos: redos,            // re-draws of the dealt minister (v4)
    spinsTaken: 0
  };
  return G.state;
};

G.openSeats   = function () { return G.PORTFOLIOS.filter(function (p) { return !G.state.cabinet[p.key]; }); };
G.isComplete  = function () { return G.openSeats().length === 0; };
G.undrafted   = function () {
  var st = G.state, drafted = st.draftedNames;
  return (st.pool || []).filter(function (p) { return !drafted[p.name]; });
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
  st.pendingPick = null; st.spin = null; st.choices = null; st.lastDeal = null;
  return true;
};
G.preview = function () { return G.rateCabinet(G.state.cabinet); };
/* every election is its own unique TURN: hold() mints a fresh runId (the
   identity of this run on every board) and a seed derived from it, so the
   campaign is reproducible — and snapshots the cabinet manifest so the
   leaderboard always carries the bench that fought it (even if a new game
   is started before posting). */
G.newRunId = function () {
  return Date.now().toString(36) + "-" + Math.floor(Math.random() * 0xffffffff).toString(36);
};
G.hold = function () {
  var st = G.state;
  var runId = G.newRunId();
  var manifest = G.cabinetManifest();
  var seed = G.hash32(runId + "|" + manifest.map(function (s) { return s.name; }).join(",") +
                      "|" + st.mode + "|" + st.difficulty + "|" + st.cabinetSize);
  var res = G.runElection(st.cabinet, {
    mode: st.mode, lineage: st.lineage,
    difficulty: st.difficulty, govern: st.govern,
    policy: st.policy, custom: st.custom,
    draftedNames: st.draftedNames,
    runId: runId, seed: seed
  });
  res.manifest = manifest;
  res.mode = st.mode;
  res.cabinetSize = st.cabinetSize;
  return res;
};

/* ---- weighted draw: the chance of getting someone sits on a scale -------- */
/* Front-rank figures are rarer than journeymen, so drawing a star feels lucky.
   Tunable via CONFIG.drawTierWeights; higher weight = more likely. */
G.drawWeight = function (p) {
  var w = (G.CONFIG.drawTierWeights || {})[G.tierOf(p).key];
  return (typeof w === "number" && w > 0) ? w : 2;
};
G.weightedPick = function (pool) {
  if (!pool || !pool.length) return null;
  var total = 0, i, w = new Array(pool.length);
  for (i = 0; i < pool.length; i++) { w[i] = G.drawWeight(pool[i]); total += w[i]; }
  if (!(total > 0)) return pool[Math.floor(Math.random() * pool.length)];
  var r = Math.random() * total;
  for (i = 0; i < pool.length; i++) { r -= w[i]; if (r <= 0) return pool[i]; }
  return pool[pool.length - 1];
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

/* The single call the UI makes to start a round — the WEIGHTED SPIN (v6).
   Each of the three cards independently rolls a TIER first (front rank → the
   intake; odds blend the difficulty's appetite with the pool's own make-up,
   count^poolAlpha — so a sea of baseline backbenchers can't drown the stars),
   then takes a UNIFORM pick within that tier. Still random at its core: an
   awful round is always possible, a jammy one too.
   THE PITY VALVE: if your bench is genuinely struggling part-way through,
   the party grandees MAY step in — the whole deal is drawn from the best
   tiers going. Limited uses by difficulty; sometimes the game saves you,
   sometimes you never needed saving. That's luck.
   The player then picks one of the three (G.chooseFromDeal) and a seat
   (G.assignTo). Returns the candidate array, or null when the draft is done. */
G._tierBuckets = function (pool) {
  var by = {};
  pool.forEach(function (p) { var t = G.tierOf(p); (by[t.key] = by[t.key] || []).push(p); });
  return by;
};
G._needsPity = function () {
  var st = G.state, C = G.CONFIG;
  if (!st.pity || st.pity.uses <= 0) return false;
  var filled = G.PORTFOLIOS.length - G.openSeats().length;
  if (filled < (C.pityAfter || 4)) return false;
  var r = G.rateCabinet(st.cabinet);
  return r.perSeat > 0 && r.perSeat < (C.pityFloor || 56);
};
G.deal = function () {
  var st = G.state; if (!st) return null;
  if (!G.openSeats().length) return null;
  var und = G.undrafted();
  if (st.mode !== "wildcard") und = und.filter(function (p) { return !(G.isDespot && G.isDespot(p)); });
  if (!und.length) return null;

  var C = G.CONFIG;
  var boost = G._needsPity();
  if (boost) { st.pity.uses--; st.pity.used++; }

  var by = G._tierBuckets(und);
  var odds = (C.tierOdds || {})[st.difficulty] || (C.tierOdds || {}).normal || { a: 2, b: 2, c: 2, d: 2 };
  var alpha = (typeof C.poolAlpha === "number") ? C.poolAlpha : 0.55;
  var keys = G.TIERS.map(function (t) { return t.key; }).filter(function (k) { return by[k] && by[k].length; });

  function rollTier() {
    if (boost) return keys[0];                       // the grandees reach for the top shelf
    var tot = 0, w = keys.map(function (k) {
      var v = Math.pow(by[k].length, alpha) * (odds[k] || 1); tot += v; return v;
    });
    var r = Math.random() * tot;
    for (var i = 0; i < keys.length; i++) { r -= w[i]; if (r <= 0) return keys[i]; }
    return keys[keys.length - 1];
  }

  var picks = [], tiers = [], guard = 0;
  while (picks.length < Math.min(3, und.length) && guard++ < 60) {
    var tk = rollTier();
    var bucket = by[tk].filter(function (p) { return picks.indexOf(p) === -1; });
    if (!bucket.length) {                            // tier drained of fresh faces — fall down the list
      for (var j = 0; j < keys.length && !bucket.length; j++) {
        bucket = by[keys[j]].filter(function (p) { return picks.indexOf(p) === -1; });
        tk = keys[j];
      }
      if (!bucket.length) break;
    }
    picks.push(bucket[Math.floor(Math.random() * bucket.length)]);
    tiers.push(tk);
  }

  st.choices = picks;
  st.dealInfo = { tiers: tiers, boost: boost };
  st.pendingPick = null;
  st.spin = null;
  st.lastDeal = null;
  st.spinsTaken++;
  return st.choices;
};

/* the player chooses one of the three dealt candidates. */
G.chooseFromDeal = function (name) {
  var st = G.state; if (!st || !st.choices) return false;
  var found = st.choices.filter(function (p) { return p.name === name; })[0];
  if (!found) return false;
  st.pendingPick = found;
  var open = G.openSeats();
  var fitSeats = open.filter(function (s) { return found.fits.indexOf(s.key) !== -1; })
                     .map(function (s) { return (G.PORTFOLIO_BY_KEY[s.key] || { name: s.key }).name; });
  st.lastDeal = {
    politician: found,
    despot: (G.isDespot && G.isDespot(found)),
    fitSeatNames: fitSeats,
    placed: false
  };
  return true;
};

/* re-draw the three on offer (costs one re-draw). Only before one is appointed. */
G.redraw = function () {
  var st = G.state; if (!st || !st.choices) return false;
  if ((st.redos | 0) <= 0) return false;
  st.redos--;
  return !!G.deal();                            // a fresh set of three
};
G.redosLeft = function () { return G.state ? (G.state.redos | 0) : 0; };

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

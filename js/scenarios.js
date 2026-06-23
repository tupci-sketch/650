/* =============================================================================
   SCENARIOS & GOALS  (Phase 6 of the Grand Expansion)
   Historical start-states, objectives, and achievement persistence.
   G.applyScenario() is called from G.newGame() after careerInit.
   G.activeLandscape(regionId) replaces direct G.LANDSCAPE[r.id] reads so
   scenarios can set a per-run landscape without mutating the global.
   ========================================================================== */
window.G = window.G || {};

G.SCENARIOS = [
  {
    key: "freshstart",
    name: "Fresh Start (2026)",
    year: 2026,
    desc: "The default modern election — all wizard options remain open.",
    mode: null, difficulty: null,
    blocSupport: null, landscape: null,
    objective: { type: "seats", target: 326, label: "Win a working majority" }
  },
  {
    key: "redwallcollapse",
    name: "The Red Wall Crumbles",
    year: 2027,
    desc: "Labour's heartlands have collapsed to Reform UK. Win them back.",
    mode: "unity", difficulty: "hard",
    blocSupport: { redwall: 28, reform: 68, pensioners: 42 },
    landscape: {
      NE: [["Reform UK",42],["Labour",26],["Conservative",14],["Liberal Democrat",10],["Green",8]],
      NW: [["Reform UK",38],["Labour",28],["Conservative",14],["Liberal Democrat",12],["Green",8]],
      YH: [["Reform UK",40],["Labour",26],["Conservative",14],["Liberal Democrat",12],["Green",8]],
      EM: [["Reform UK",42],["Labour",24],["Conservative",18],["Liberal Democrat",8],["Green",8]],
      WM: [["Reform UK",40],["Labour",24],["Conservative",18],["Liberal Democrat",10],["Green",8]]
    },
    objective: { type: "blocRecover", bloc: "redwall", target: 50,
                 label: "Win back the Red Wall (support ≥ 50)" }
  },
  {
    key: "hung2010",
    name: "Hung Parliament (2010)",
    year: 2010,
    desc: "No party wins a majority. Form a coalition government and hold it together.",
    mode: "unity", difficulty: "normal",
    blocSupport: { shires: 58, business: 60, redwall: 44, urbanprog: 48 },
    landscape: {
      SCO: [["Labour",28],["SNP",26],["Liberal Democrat",22],["Conservative",16],["Green",8]],
      WAL: [["Labour",36],["Plaid Cymru",20],["Conservative",20],["Liberal Democrat",14],["Green",10]],
      NI:  [["Sinn Féin",30],["DUP",28],["Alliance",18],["UUP",12],["SDLP",12]],
      NE:  [["Labour",40],["Conservative",22],["Liberal Democrat",24],["Green",8],["Independent",6]],
      NW:  [["Labour",38],["Conservative",22],["Liberal Democrat",26],["Green",8],["Independent",6]],
      YH:  [["Labour",36],["Conservative",24],["Liberal Democrat",24],["Green",10],["Independent",6]],
      EM:  [["Conservative",30],["Labour",30],["Liberal Democrat",28],["Green",8],["Independent",4]],
      WM:  [["Conservative",30],["Labour",32],["Liberal Democrat",22],["Green",10],["Independent",6]],
      EE:  [["Conservative",34],["Liberal Democrat",26],["Labour",22],["Green",10],["Independent",8]],
      SE:  [["Conservative",36],["Liberal Democrat",28],["Labour",18],["Green",10],["Independent",8]],
      SW:  [["Liberal Democrat",34],["Conservative",30],["Labour",20],["Green",10],["Independent",6]],
      LDN: [["Labour",32],["Conservative",22],["Liberal Democrat",26],["Green",14],["Independent",6]]
    },
    objective: { type: "coalition", label: "Form a coalition government" }
  },
  {
    key: "brexit2019",
    name: "Get It Done (2019)",
    year: 2019,
    desc: "Brexit Britain: Reform-curious voters are energised. Win an 80-seat majority.",
    mode: "unity", difficulty: "normal",
    blocSupport: { reform: 70, redwall: 62, urbanprog: 34, students: 36 },
    landscape: {
      NE:  [["Conservative",36],["Labour",28],["Brexit Party",20],["Liberal Democrat",10],["Green",6]],
      NW:  [["Conservative",34],["Labour",28],["Brexit Party",22],["Liberal Democrat",10],["Green",6]],
      YH:  [["Conservative",34],["Labour",28],["Brexit Party",22],["Liberal Democrat",10],["Green",6]],
      EM:  [["Conservative",38],["Labour",26],["Brexit Party",18],["Liberal Democrat",10],["Green",8]],
      WM:  [["Conservative",36],["Labour",28],["Brexit Party",18],["Liberal Democrat",10],["Green",8]],
      EE:  [["Conservative",38],["Liberal Democrat",20],["Brexit Party",18],["Labour",16],["Green",8]],
      SE:  [["Conservative",38],["Liberal Democrat",24],["Brexit Party",16],["Labour",14],["Green",8]],
      SW:  [["Conservative",36],["Liberal Democrat",26],["Brexit Party",16],["Labour",14],["Green",8]],
      LDN: [["Labour",36],["Conservative",22],["Liberal Democrat",22],["Green",12],["Brexit Party",8]],
      SCO: [["SNP",38],["Conservative",22],["Labour",20],["Liberal Democrat",14],["Green",6]],
      WAL: [["Conservative",28],["Labour",28],["Brexit Party",20],["Plaid Cymru",16],["Liberal Democrat",8]],
      NI:  [["Sinn Féin",30],["DUP",28],["Alliance",18],["UUP",12],["SDLP",12]]
    },
    objective: { type: "majority", target: 80, label: "Win an 80-seat majority" }
  }
];

/* ---- global achievement predicates --------------------------------------- */
G.OBJECTIVES = [
  { key:"sweep650",   label:"The Perfect Result",    desc:"Win all 650 seats.",
    check: function (c) { return c.seats >= 650; } },
  { key:"legacy90",   label:"Statesmanlike",         desc:"Achieve a legacy score of 90+.",
    check: function (c) { return (c.legacy || 0) >= 90; } },
  { key:"allblocs60", label:"Coalition of Everyone", desc:"End a term with every voter bloc above 60.",
    check: function (c) {
      if (!c.blocSupport) return false;
      return G.ELECTORATE_BLOCS.every(function (b) { return (c.blocSupport[b.key] || 0) >= 60; });
    } },
  { key:"nosoutheast",label:"Without the South East",desc:"Win a majority without a single SE seat.",
    check: function (c) {
      var se = c.byRegion && c.byRegion.filter(function (r) { return r.id === "SE"; })[0];
      return c.seats >= ((G.CONFIG && G.CONFIG.majority) || 326) && se && se.won === 0;
    } },
  { key:"allpledges", label:"Promise Keeper",        desc:"Deliver all four manifesto pledges.",
    check: function (c) {
      if (!c.pledges || !c.pledges.length) return false;
      return c.pledges.every(function (p) { return p.status === "delivered"; });
    } },
  { key:"survivor",   label:"Survivor",              desc:"Win with approval below 30%.",
    check: function (c) {
      return (c.termGovt) && (c.approvalEnd || 100) < 30;
    } },
  { key:"majority326",label:"Over the Line",         desc:"Win a working majority.",
    check: function (c) { return c.seats >= ((G.CONFIG && G.CONFIG.majority) || 326); } },
  { key:"landslide",  label:"Landslide",             desc:"Win a landslide majority (400+ seats).",
    check: function (c) { return c.seats >= ((G.CONFIG && G.CONFIG.tierLandslide) || 400); } },
  { key:"redwallheld",label:"Red Wall Holds",        desc:"Win the Red Wall bloc above 60.",
    check: function (c) { return c.blocSupport && (c.blocSupport.redwall || 0) >= 60; } }
];

/* ---- check objectives and scenario goal ---------------------------------- */
G.checkObjectives = function (ctx) {
  var unlocked = [];
  G.OBJECTIVES.forEach(function (obj) {
    try { if (obj.check(ctx)) unlocked.push(obj.key); } catch (e) {}
  });
  /* scenario-specific objective */
  if (ctx.scenario) {
    var sc = (G.SCENARIOS || []).filter(function (s) { return s.key === ctx.scenario; })[0];
    if (sc && sc.objective) {
      var o = sc.objective, done = false;
      if (o.type === "seats"       && ctx.seats >= o.target) done = true;
      if (o.type === "majority"    && ctx.seats >= o.target) done = true;
      if (o.type === "coalition"   && ctx.coalition)         done = true;
      if (o.type === "blocRecover" && ctx.blocSupport && (ctx.blocSupport[o.bloc] || 0) >= o.target) done = true;
      if (done) unlocked.push("scenario_" + ctx.scenario);
    }
  }
  return unlocked;
};

/* ---- achievement persistence --------------------------------------------- */
G.getAchievements = function () {
  try { return JSON.parse(localStorage.getItem("g650achievements") || "[]"); } catch (e) { return []; }
};
G.unlockAchievements = function (keys) {
  if (!keys || !keys.length) return [];
  var current = G.getAchievements();
  var fresh = [];
  keys.forEach(function (k) {
    if (current.indexOf(k) < 0) { current.push(k); fresh.push(k); }
  });
  if (fresh.length) {
    try { localStorage.setItem("g650achievements", JSON.stringify(current)); } catch (e) {}
  }
  return fresh;
};

/* ---- apply a scenario ----------------------------------------------------- */
/* Sets gameYear, clones the landscape, seeds blocSupport on G.state.
   Called from G.newGame() after careerInit — G.state already exists.        */
G.applyScenario = function (key) {
  if (!key || key === "freshstart" || !G.state) {
    G.state._scenarioLandscape = null;
    G.state._scenarioBlocSupport = null;
    return;
  }
  var sc = (G.SCENARIOS || []).filter(function (s) { return s.key === key; })[0];
  if (!sc) { G.state._scenarioLandscape = null; G.state._scenarioBlocSupport = null; return; }

  if (sc.year) G.state.gameYear = sc.year;

  /* per-run landscape clone: scenario patches override, other regions stay global */
  if (sc.landscape) {
    var full = {};
    (G.REGIONS || []).forEach(function (r) {
      var src = sc.landscape[r.id] || G.LANDSCAPE[r.id] || G.LANDSCAPE.EE;
      full[r.id] = src.map(function (e) { return [e[0], e[1]]; });
    });
    G.state._scenarioLandscape = full;
  } else {
    G.state._scenarioLandscape = null;
  }

  /* bloc support override */
  if (sc.blocSupport && G.electorateInit) {
    var base = G.electorateInit(0, null);
    Object.keys(sc.blocSupport).forEach(function (k) {
      base[k] = Math.max(0, Math.min(100, sc.blocSupport[k]));
    });
    G.state._scenarioBlocSupport = base;
  } else {
    G.state._scenarioBlocSupport = null;
  }

  /* lock mode/difficulty if the scenario specifies them */
  if (sc.mode)       G.state.mode       = sc.mode;
  if (sc.difficulty) G.state.difficulty = sc.difficulty;
  G.state.scenarioKey = key;
};

/* ---- landscape resolver -------------------------------------------------- */
/* Call this in simulateCampaign instead of G.LANDSCAPE[r.id] directly so
   scenario overrides and future campaign-trail patches all flow through one
   point.                                                                      */
G.activeLandscape = function (regionId) {
  if (G.state && G.state._scenarioLandscape && G.state._scenarioLandscape[regionId]) {
    return G.state._scenarioLandscape[regionId];
  }
  return G.LANDSCAPE[regionId] || G.LANDSCAPE.EE;
};

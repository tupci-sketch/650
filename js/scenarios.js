/* =============================================================================
   SCENARIOS & GOALS  (Phase 6 of the Grand Expansion)
   Historical start-states, objectives, and achievement persistence.
   G.applyScenario() is called from G.newGame() after careerInit.
   G.activeLandscape(regionId) replaces direct G.LANDSCAPE[r.id] reads so
   scenarios can set a per-run landscape without mutating the global.
   ========================================================================== */
window.G = window.G || {};

G.SCENARIOS = [

  /* ===== UK SCENARIOS ===================================================== */
  {
    key: "freshstart",
    name: "Fresh Start (2026)",
    year: 2026,
    country: "uk",
    desc: "The default modern election — all wizard options remain open.",
    mode: null, difficulty: null,
    blocSupport: null, landscape: null,
    objective: { type: "seats", target: 326, label: "Win a working majority" }
  },
  {
    key: "redwallcollapse",
    name: "The Red Wall Crumbles",
    year: 2027,
    country: "uk",
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
    country: "uk",
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
    country: "uk",
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
  },
  {
    key: "thatcher1983",
    name: "The Falklands Factor (1983)",
    year: 1983,
    country: "uk",
    desc: "Thatcher rides the Falklands wave. Labour is in civil war. Deliver a crushing majority.",
    mode: "unity", difficulty: "normal",
    blocSupport: { shires: 72, business: 70, pensioners: 64, redwall: 38, urbanprog: 30 },
    landscape: {
      NE:  [["Labour",46],["Conservative",36],["Liberal",14],["Independent",4]],
      NW:  [["Labour",44],["Conservative",38],["Liberal",14],["Independent",4]],
      YH:  [["Labour",46],["Conservative",36],["Liberal",14],["Independent",4]],
      EM:  [["Conservative",44],["Labour",34],["Liberal",18],["Independent",4]],
      WM:  [["Conservative",40],["Labour",38],["Liberal",18],["Independent",4]],
      EE:  [["Conservative",50],["Labour",26],["Liberal",20],["Independent",4]],
      SE:  [["Conservative",54],["Labour",20],["Liberal",22],["Independent",4]],
      SW:  [["Conservative",50],["Labour",18],["Liberal",28],["Independent",4]],
      LDN: [["Conservative",44],["Labour",36],["Liberal",16],["Independent",4]],
      SCO: [["Labour",38],["Conservative",28],["Liberal",22],["SNP",12]],
      WAL: [["Labour",44],["Conservative",28],["Liberal",18],["Plaid Cymru",10]],
      NI:  [["DUP",30],["UUP",28],["Sinn Féin",14],["SDLP",18],["Alliance",10]]
    },
    objective: { type: "seats", target: 396, label: "Match Thatcher's 396 seats" }
  },
  {
    key: "blair1997",
    name: "Things Can Only Get Better (1997)",
    year: 1997,
    country: "uk",
    desc: "18 years of Conservative rule are ending. Deliver the Labour landslide.",
    mode: "unity", difficulty: "easy",
    blocSupport: { redwall: 72, urbanprog: 68, students: 70, shires: 38, business: 44 },
    landscape: {
      NE:  [["Labour",62],["Conservative",22],["Liberal Democrat",12],["Independent",4]],
      NW:  [["Labour",58],["Conservative",26],["Liberal Democrat",12],["Independent",4]],
      YH:  [["Labour",56],["Conservative",26],["Liberal Democrat",14],["Independent",4]],
      EM:  [["Labour",48],["Conservative",34],["Liberal Democrat",14],["Independent",4]],
      WM:  [["Labour",50],["Conservative",32],["Liberal Democrat",14],["Independent",4]],
      EE:  [["Conservative",42],["Labour",38],["Liberal Democrat",16],["Independent",4]],
      SE:  [["Conservative",44],["Labour",30],["Liberal Democrat",22],["Independent",4]],
      SW:  [["Liberal Democrat",34],["Labour",28],["Conservative",34],["Independent",4]],
      LDN: [["Labour",52],["Conservative",28],["Liberal Democrat",16],["Independent",4]],
      SCO: [["Labour",46],["SNP",22],["Liberal Democrat",16],["Conservative",12],["Independent",4]],
      WAL: [["Labour",54],["Conservative",20],["Plaid Cymru",14],["Liberal Democrat",10],["Independent",2]],
      NI:  [["Sinn Féin",28],["DUP",24],["SDLP",22],["UUP",18],["Alliance",8]]
    },
    objective: { type: "seats", target: 418, label: "Match Blair's 418 seats" }
  },

  /* ===== USA SCENARIOS ==================================================== */
  {
    key: "usa_house_2024",
    name: "🇺🇸 US House — 2024",
    year: 2024,
    country: "us",
    electoralSystem: "fptp_usa_house",
    desc: "The 2024 Congressional midterms. Republicans hold a razor-thin majority — can you break it?",
    mode: "unity", difficulty: "normal",
    landscape: "usa_house_2024",
    objective: { type: "seats", target: 218, label: "Win a House majority (218 seats)" }
  },
  {
    key: "usa_ec_2024",
    name: "🇺🇸 US Presidential — 2024",
    year: 2024,
    country: "us",
    electoralSystem: "ec_usa_president",
    desc: "The 2024 Presidential Election. Seven swing states will decide it. Reach 270 Electoral Votes.",
    mode: "unity", difficulty: "hard",
    landscape: "usa_ec_2024",
    objective: { type: "seats", target: 270, label: "Win the Electoral College (270 EV)" }
  },
  {
    key: "usa_ec_2020",
    name: "🇺🇸 US Presidential — 2020",
    year: 2020,
    country: "us",
    electoralSystem: "ec_usa_president",
    desc: "Biden vs. Trump — the pandemic election. 81 million votes cast. Can you hold the Blue Wall?",
    mode: "unity", difficulty: "normal",
    landscape: "usa_ec_2020",
    objective: { type: "seats", target: 270, label: "Win the Electoral College (270 EV)" }
  },
  {
    key: "usa_ec_1980",
    name: "🇺🇸 Morning in America (1980)",
    year: 1980,
    country: "us",
    electoralSystem: "ec_usa_president",
    desc: "Reagan's revolution — Iran hostage crisis, stagflation, malaise. The right needs a champion.",
    mode: "unity", difficulty: "normal",
    landscape: "usa_ec_1980",
    objective: { type: "seats", target: 400, label: "Reagan's 489 EV sweep (aim for 400+)" }
  },
  {
    key: "usa_ec_1932",
    name: "🇺🇸 New Deal (1932)",
    year: 1932,
    country: "us",
    electoralSystem: "ec_usa_president",
    desc: "The Great Depression has shattered Hoover. Roosevelt's New Deal coalition awaits — deliver the landslide.",
    mode: "unity", difficulty: "easy",
    landscape: "usa_ec_1932",
    objective: { type: "seats", target: 472, label: "Match FDR's 472 Electoral Votes" }
  },
  {
    key: "usa_ec_1860",
    name: "🇺🇸 Lincoln & the Union (1860)",
    year: 1860,
    country: "us",
    electoralSystem: "ec_usa_president",
    desc: "The Union hangs by a thread. Four parties, a divided electorate and the spectre of secession.",
    mode: "unity", difficulty: "hard",
    landscape: "usa_ec_1860",
    objective: { type: "seats", target: 180, label: "Win the Presidency (win the North)" }
  },

  /* ===== GERMANY SCENARIOS ================================================ */
  {
    key: "weimar_1932_jul",
    name: "🇩🇪 Weimar in Crisis (July 1932)",
    year: 1932,
    country: "de",
    electoralSystem: "pr_dhondt_weimar",
    desc: "Germany's democracy is collapsing. The NSDAP is the largest party. Can any force hold the republic?",
    mode: "unity", difficulty: "hard",
    landscape: "weimar_1932_jul",
    objective: { type: "seats", target: 324, label: "Win a Reichstag majority (324 seats)" }
  },
  {
    key: "weimar_1932_nov",
    name: "🇩🇪 The NSDAP Stumbles (November 1932)",
    year: 1932,
    country: "de",
    electoralSystem: "pr_dhondt_weimar",
    desc: "Hitler's support has fallen. The moment to stop Nazism may be slipping away — or opening up.",
    mode: "unity", difficulty: "hard",
    landscape: "weimar_1932_nov",
    objective: { type: "seats", target: 324, label: "Win a Reichstag majority (324 seats)" }
  },
  {
    key: "weimar_1933",
    name: "🇩🇪 The Last Free Election (March 1933)",
    year: 1933,
    country: "de",
    electoralSystem: "pr_dhondt_weimar",
    desc: "Terror in the streets. The Reichstag has burned. Hitler is Chancellor. One last vote remains.",
    mode: "unity", difficulty: "hard",
    landscape: "weimar_1933",
    objective: { type: "seats", target: 324, label: "Win a Reichstag majority before democracy ends" }
  },
  {
    key: "bundestag_2021",
    name: "🇩🇪 Bundestag 2021",
    year: 2021,
    country: "de",
    electoralSystem: "pr_dhondt_bundestag",
    desc: "After Merkel, Germany searches for direction. SPD, Greens, FDP or AfD — who builds the coalition?",
    mode: "unity", difficulty: "normal",
    landscape: "bundestag_2021",
    objective: { type: "seats", target: 369, label: "Lead the coalition government (369 seats)" }
  },

  /* ===== FRANCE SCENARIOS ================================================= */
  {
    key: "france_2022",
    name: "🇫🇷 Assemblée Nationale 2022",
    year: 2022,
    country: "fr",
    electoralSystem: "trs_france",
    desc: "Macron lost his majority. RN is surging. NUPES unites the left. Win absolute control of the Assembly.",
    mode: "unity", difficulty: "hard",
    landscape: "france_2022",
    objective: { type: "seats", target: 289, label: "Win an absolute majority (289 seats)" }
  },
  {
    key: "france_1968",
    name: "🇫🇷 De Gaulle's Triumph (1968)",
    year: 1968,
    country: "fr",
    electoralSystem: "trs_france",
    desc: "After May '68, de Gaulle called a snap election and won an historic supermajority.",
    mode: "unity", difficulty: "easy",
    landscape: "france_1968",
    objective: { type: "seats", target: 460, label: "Match de Gaulle's 461-seat majority" }
  },

  /* ===== AUSTRALIA SCENARIO =============================================== */
  {
    key: "australia_2022",
    name: "🇦🇺 Australian Federal Election 2022",
    year: 2022,
    country: "au",
    electoralSystem: "av_australia",
    desc: "Morrison's Liberals face the Teal wave. Labor's Albanese offers 'Change'. Preferential votes flow.",
    mode: "unity", difficulty: "normal",
    landscape: "australia_2022",
    objective: { type: "seats", target: 76, label: "Win a majority (76 seats)" }
  },

  /* ===== CANADA SCENARIO ================================================== */
  {
    key: "canada_2021",
    name: "🇨🇦 Canadian Federal Election 2021",
    year: 2021,
    country: "ca",
    electoralSystem: "fptp_canada",
    desc: "Trudeau called an early election seeking a majority. Erin O'Toole's Tories are surging in Ontario.",
    mode: "unity", difficulty: "normal",
    landscape: "canada_2021",
    objective: { type: "seats", target: 170, label: "Win a majority (170 seats)" }
  },

  /* ===== JAPAN SCENARIO =================================================== */
  {
    key: "japan_2021",
    name: "🇯🇵 Japanese General Election 2021",
    year: 2021,
    country: "jp",
    electoralSystem: "fptp_japan",
    desc: "Post-Abe Japan — Kishida's LDP faces a unified opposition. Hold the stable majority.",
    mode: "unity", difficulty: "normal",
    landscape: "japan_2021",
    objective: { type: "seats", target: 261, label: "Hold a stable majority (261 of 465 seats)" }
  },

  /* ===== INDIA SCENARIO =================================================== */
  {
    key: "india_2024",
    name: "🇮🇳 Lok Sabha 2024",
    year: 2024,
    country: "in",
    electoralSystem: "fptp_india",
    desc: "Modi's BJP seeks a supermajority. INDIA alliance fights back. 543 seats, 272 needed.",
    mode: "unity", difficulty: "normal",
    landscape: "india_2024",
    objective: { type: "seats", target: 272, label: "Win a Lok Sabha majority (272 seats)" }
  },

  /* ===== AUTHORITARIAN / DESPOT SCENARIOS ================================= */
  {
    key: "north_korea",
    name: "🇰🇵 The Supreme People's Assembly",
    year: 2024,
    country: "kp",
    electoralSystem: "guided_north_korea",
    desc: "The Korean people joyfully exercise their democratic right. Under Supreme Leader guidance, all candidates are pre-approved. Deliver an appropriately unanimous result.",
    mode: "unity", difficulty: "easy",
    landscape: "north_korea",
    despotMode: true,
    objective: { type: "pct", target: 99.8, label: "Achieve 99.8%+ of seats (unanimous mandate)" }
  },
  {
    key: "soviet_1937",
    name: "🇷🇺 Stalin's Supreme Soviet (1937)",
    year: 1937,
    country: "su",
    electoralSystem: "guided_soviet",
    desc: "The Great Purge is underway. The Soviet people vote with 99.4% enthusiasm for the Communist Party. Your job: make the numbers work. Wrong numbers can be dangerous.",
    mode: "unity", difficulty: "easy",
    landscape: "soviet_1937",
    despotMode: true,
    objective: { type: "pct", target: 99, label: "Achieve 99%+ unanimous result" }
  },
  {
    key: "cuba",
    name: "🇨🇺 Cuba — Asamblea Nacional",
    year: 2023,
    country: "cu",
    electoralSystem: "guided_cuba",
    desc: "Cuba's National Assembly elections proceed under Partido Comunista guidance. Candidates are vetted. The revolution must be ratified with appropriate enthusiasm.",
    mode: "unity", difficulty: "easy",
    landscape: "cuba",
    despotMode: true,
    objective: { type: "pct", target: 98, label: "Secure 98%+ mandate for the Revolution" }
  },
  {
    key: "china",
    name: "🇨🇳 China — National People's Congress",
    year: 2023,
    country: "cn",
    electoralSystem: "guided_china",
    desc: "The 2980-seat National People's Congress convenes. The Chinese Communist Party's leading role is constitutionally guaranteed. Harmonise the result.",
    mode: "unity", difficulty: "easy",
    landscape: "china",
    despotMode: true,
    objective: { type: "pct", target: 99.9, label: "Achieve total NPC harmony (99.9%)" }
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
      var totalSys = (G.activeTotalSeats ? G.activeTotalSeats() : 650);
      if (o.type === "pct" && totalSys > 0 && (ctx.seats / totalSys * 100) >= o.target) done = true;
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
    G.state._electoralSystemKey = null;
    G.state._countryRegionKey = null;
    return;
  }
  var sc = (G.SCENARIOS || []).filter(function (s) { return s.key === key; })[0];
  if (!sc) {
    G.state._scenarioLandscape = null;
    G.state._scenarioBlocSupport = null;
    G.state._electoralSystemKey = null;
    G.state._countryRegionKey = null;
    return;
  }

  if (sc.year) G.state.gameYear = sc.year;

  /* set active electoral system and country region set */
  G.state._electoralSystemKey = sc.electoralSystem || null;
  if (sc.electoralSystem && G.ELECTORAL_SYSTEMS && G.ELECTORAL_SYSTEMS[sc.electoralSystem]) {
    G.state._countryRegionKey = G.ELECTORAL_SYSTEMS[sc.electoralSystem].regionKey || null;
  } else {
    G.state._countryRegionKey = null;
  }

  /* resolve landscape: string key → G.INT_LANDSCAPES, object → inline */
  var landscapeSrc = null;
  if (typeof sc.landscape === "string") {
    landscapeSrc = (G.INT_LANDSCAPES && G.INT_LANDSCAPES[sc.landscape]) || null;
  } else if (sc.landscape && typeof sc.landscape === "object") {
    landscapeSrc = sc.landscape;
  }

  /* per-run landscape clone */
  if (landscapeSrc) {
    var full = {};
    var regions = (G.activeRegions ? G.activeRegions() : null) || G.REGIONS || [];
    regions.forEach(function (r) {
      var src = landscapeSrc[r.id];
      if (src) {
        full[r.id] = src.map(function (e) { return [e[0], e[1]]; });
      } else {
        /* fall back to global landscape for UK scenarios */
        var glob = G.LANDSCAPE && (G.LANDSCAPE[r.id] || G.LANDSCAPE.EE);
        if (glob) full[r.id] = glob.map(function (e) { return [e[0], e[1]]; });
      }
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

  /* despot mode flag */
  G.state._despotMode = sc.despotMode || false;

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

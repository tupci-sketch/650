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
  },

  /* ===== EXTRA VARIED SCENARIOS ========================================== */

  /* --- UK --- */
  {
    key: "uk_hung_2017",
    name: "Coalition of Chaos (2017)",
    year: 2017, country: "uk",
    desc: "The snap election backfires — no majority. Emerge as the largest party and cling on.",
    mode: "unity", difficulty: "hard",
    blocSupport: { pensioners: 58, shires: 56, redwall: 48, urbanprog: 54, students: 60 },
    objective: { type: "minority", label: "Finish largest in a hung parliament" }
  },
  {
    key: "uk_bluewall",
    name: "The Blue Wall Falls",
    year: 2029, country: "uk",
    desc: "The Liberal Democrats storm the affluent South. Win a majority without a single South-East seat.",
    mode: "unity", difficulty: "hard",
    blocSupport: { shires: 34, business: 40, pensioners: 46, urbanprog: 60, students: 58 },
    objective: { type: "region_deny", region: "SE", label: "Win a majority with zero South-East seats" }
  },
  {
    key: "uk_everyone",
    name: "A Coalition of Everyone",
    year: 2031, country: "uk",
    desc: "A rare consensus is possible. End the campaign with every voter bloc behind you.",
    mode: "unity", difficulty: "hard",
    blocSupport: { redwall: 55, pensioners: 55, urbanprog: 55, shires: 55, students: 55, business: 55, nationalist: 52, reform: 50 },
    objective: { type: "allblocs", target: 60, label: "Take every voter bloc above 60" }
  },

  /* --- United States --- */
  {
    key: "usa_swingstates",
    name: "🇺🇸 Battle for the Blue Wall (2024)",
    year: 2024, country: "us", electoralSystem: "ec_usa_president", landscape: "usa_ec_2024",
    desc: "The presidency runs through the swing states. Carry the battlegrounds — Pennsylvania, Michigan, Wisconsin, Arizona, Georgia, Nevada and North Carolina.",
    mode: "unity", difficulty: "hard",
    blocSupport: { suburban: 46, union: 44, minority: 52, maga: 58 },
    objective: { type: "regionset_win", share: 0.6,
      regions: ["EC_PA","EC_MI","EC_WI","EC_AZ","EC_GA","EC_NC","EC_NV"],
      label: "Carry the seven swing states" }
  },
  {
    key: "usa_realignment",
    name: "🇺🇸 A New Coalition (2008)",
    year: 2008, country: "us", electoralSystem: "ec_usa_president", landscape: "usa_ec_2020",
    desc: "Hope and change: a generational realignment is on the table. Win a commanding Electoral College landslide.",
    mode: "unity", difficulty: "normal",
    blocSupport: { urbanprog: 64, union: 58, minority: 66, suburban: 54, maga: 40 },
    objective: { type: "supermajority", pct: 0.66, label: "Win a 356+ EV landslide (⅔ of the College)" }
  },
  {
    key: "usa_house_hold",
    name: "🇺🇸 Hold the House (2024)",
    year: 2024, country: "us", electoralSystem: "fptp_usa_house", landscape: "usa_house_2024",
    desc: "A knife-edge chamber. Sweep the Sun Belt to keep the Speaker's gavel.",
    mode: "unity", difficulty: "hard",
    blocSupport: { suburban: 47, maga: 56, minority: 50 },
    objective: { type: "region_win", region: "US_SE", share: 0.55, label: "Win 55% of the Southeast" }
  },

  /* --- Germany --- */
  {
    key: "de_ampel",
    name: "🇩🇪 The Traffic-Light Coalition (2021)",
    year: 2021, country: "de", electoralSystem: "pr_dhondt_bundestag", landscape: "bundestag_2021",
    desc: "No party dominates the Bundestag. Finish first and stitch together a governing coalition.",
    mode: "unity", difficulty: "normal",
    blocSupport: { spd_labour: 56, green_urban: 54, fdp_liberal: 52, cdu_mitte: 46, afd_ost: 40 },
    objective: { type: "coalition", label: "Lead a Bundestag coalition government" }
  },
  {
    key: "de_ostwahl",
    name: "🇩🇪 The East Rises (2029)",
    year: 2029, country: "de", electoralSystem: "pr_dhondt_bundestag", landscape: "bundestag_2021",
    desc: "The AfD surges across Saxony, Thuringia and Brandenburg. Hold the western Länder to keep them from power.",
    mode: "unity", difficulty: "hard",
    blocSupport: { afd_ost: 66, cdu_mitte: 48, spd_labour: 46, green_urban: 44 },
    objective: { type: "regionset_win", share: 0.5,
      regions: ["DM_NW","DM_BW","DM_BY","DM_NI","DM_HE","DM_RP"],
      label: "Win half of the western Länder" }
  },

  /* --- France --- */
  {
    key: "fr_cohabitation",
    name: "🇫🇷 Cohabitation (2027)",
    year: 2027, country: "fr", electoralSystem: "trs_france", landscape: "france_2022",
    desc: "The Assemblée fractures three ways. Finish first without an absolute majority and force a cohabitation.",
    mode: "unity", difficulty: "hard",
    blocSupport: { macronist: 44, rn_periph: 58, insoumis: 54, lr_bourgeois: 48 },
    objective: { type: "minority", label: "Finish largest without an absolute majority" }
  },
  {
    key: "fr_barrage",
    name: "🇫🇷 The Republican Front (2027)",
    year: 2027, country: "fr", electoralSystem: "trs_france", landscape: "france_2022",
    desc: "The Rassemblement National is at the gates. Rally the barrage républicain and deny them the Assemblée with an absolute majority of your own.",
    mode: "unity", difficulty: "hard",
    blocSupport: { rn_periph: 64, macronist: 46, socialists: 50, ecolo: 48 },
    objective: { type: "majority", target: 289, label: "Win an absolute majority (289) to block the RN" }
  },

  /* --- Australia --- */
  {
    key: "au_hung_2010",
    name: "🇦🇺 The Hung Parliament (2010)",
    year: 2010, country: "au", electoralSystem: "av_australia", landscape: "australia_2022",
    desc: "Neither major party reaches 76. Finish first and win over the crossbench to govern.",
    mode: "unity", difficulty: "hard",
    blocSupport: { battlers: 50, inner_metro: 54, grey_vote: 48, teal: 56 },
    objective: { type: "minority", label: "Form minority government from a hung parliament" }
  },
  {
    key: "au_teal_wave",
    name: "🇦🇺 The Teal Wave (2022)",
    year: 2022, country: "au", electoralSystem: "av_australia", landscape: "australia_2022",
    desc: "Independent 'teals' sweep the affluent inner cities on climate. Keep the Teal bloc onside all the way to the line.",
    mode: "unity", difficulty: "normal",
    blocSupport: { teal: 40, inner_metro: 58, mining: 46, battlers: 50 },
    objective: { type: "blocHold", bloc: "teal", target: 58, label: "Carry the Teal bloc (support ≥ 58)" }
  },

  /* --- Canada --- */
  {
    key: "ca_minority",
    name: "🇨🇦 A Minority Mandate (2019)",
    year: 2019, country: "ca", electoralSystem: "fptp_canada", landscape: "canada_2021",
    desc: "The country splits east-west. Finish first without a majority and govern with the confidence of the House.",
    mode: "unity", difficulty: "normal",
    blocSupport: { laurentian: 52, prairie: 58, quebec_nat: 50, urban_prog: 54 },
    objective: { type: "minority", label: "Win the most seats without a majority" }
  },
  {
    key: "ca_quebec",
    name: "🇨🇦 The Battle for Québec (2021)",
    year: 2021, country: "ca", electoralSystem: "fptp_canada", landscape: "canada_2021",
    desc: "La belle province holds the balance. Sweep Québec to build your path to power.",
    mode: "unity", difficulty: "hard",
    blocSupport: { quebec_nat: 60, laurentian: 50, urban_prog: 48 },
    objective: { type: "region_win", region: "CA_QC", share: 0.55, label: "Win 55% of Québec's seats" }
  },

  /* --- Japan --- */
  {
    key: "jp_supermajority",
    name: "🇯🇵 A Two-Thirds Diet (2021)",
    year: 2021, country: "jp", electoralSystem: "fptp_japan", landscape: "japan_2021",
    desc: "Constitutional revision beckons. Win the two-thirds Diet supermajority that has eluded every LDP leader.",
    mode: "unity", difficulty: "hard",
    blocSupport: { ldp_rural: 60, seniors_jp: 58, urban_salary: 52, progressive: 40 },
    objective: { type: "supermajority", pct: 0.66, label: "Win a two-thirds Diet supermajority" }
  },

  /* --- India --- */
  {
    key: "in_coalition_era",
    name: "🇮🇳 The Coalition Era (2004)",
    year: 2004, country: "in", electoralSystem: "fptp_india", landscape: "india_2024",
    desc: "No party nears 272 alone. Finish first and assemble a national coalition to govern.",
    mode: "unity", difficulty: "hard",
    blocSupport: { hindutva: 46, secular: 52, obc_mandal: 54, south_reg: 56 },
    objective: { type: "minority", label: "Finish largest and lead a coalition" }
  },
  {
    key: "in_south_bastion",
    name: "🇮🇳 The Southern Bastion (2024)",
    year: 2024, country: "in", electoralSystem: "fptp_india", landscape: "india_2024",
    desc: "The Vindhyas mark the divide. Sweep the Dravidian south to anchor your majority.",
    mode: "unity", difficulty: "normal",
    blocSupport: { south_reg: 62, secular: 54, hindutva: 42 },
    objective: { type: "region_win", region: "IN_SOU", share: 0.6, label: "Win 60% of the South" }
  }

];

/* ---- global achievement predicates --------------------------------------- */
G.OBJECTIVES = [
  /* universal — apply regardless of country */
  { key:"legacy90",   label:"Statesmanlike",         desc:"Achieve a legacy score of 90+.", countries:null,
    check: function (c) { return (c.legacy || 0) >= 90; } },
  { key:"allpledges", label:"Promise Keeper",        desc:"Deliver all four manifesto pledges.", countries:null,
    check: function (c) {
      if (!c.pledges || !c.pledges.length) return false;
      return c.pledges.every(function (p) { return p.status === "delivered"; });
    } },
  { key:"survivor",   label:"Survivor",              desc:"Win with approval below 30%.", countries:null,
    check: function (c) {
      return (c.termGovt) && (c.approvalEnd || 100) < 30;
    } },
  { key:"majority",   label:"Over the Line",         desc:"Win a working majority.", countries:null,
    check: function (c) { return c.seats >= ((G.activeMajority ? G.activeMajority() : (G.CONFIG && G.CONFIG.majority)) || 326); } },
  { key:"landslide",  label:"Landslide",             desc:"Win a landslide (60%+ of seats).", countries:null,
    check: function (c) {
      var tot = G.activeTotalSeats ? G.activeTotalSeats() : 650;
      return c.seats >= Math.round(tot * 0.60);
    } },
  /* UK-specific */
  { key:"sweep650",   label:"The Perfect Result",    desc:"Win all 650 seats.", countries:["uk"],
    check: function (c) { return c.seats >= 650; } },
  { key:"allblocs60", label:"Coalition of Everyone", desc:"End a term with every voter bloc above 60.", countries:["uk"],
    check: function (c) {
      if (!c.blocSupport) return false;
      return G.ELECTORATE_BLOCS.every(function (b) { return (c.blocSupport[b.key] || 0) >= 60; });
    } },
  { key:"nosoutheast",label:"Without the South East",desc:"Win a UK majority without a single SE seat.", countries:["uk"],
    check: function (c) {
      var se = c.byRegion && c.byRegion.filter(function (r) { return r.id === "SE"; })[0];
      return c.seats >= ((G.CONFIG && G.CONFIG.majority) || 326) && se && se.won === 0;
    } },
  { key:"redwallheld",label:"Red Wall Holds",        desc:"Win the Red Wall voter bloc above 60.", countries:["uk"],
    check: function (c) { return c.blocSupport && (c.blocSupport.redwall || 0) >= 60; } },
  /* USA-specific */
  { key:"ec_sweep",   label:"Electoral Landslide",   desc:"Win 400+ Electoral College votes.", countries:["us"],
    check: function (c) { return c.electoralSystem === "ec_usa_president" && c.seats >= 400; } },
  /* Germany-specific */
  { key:"de_coalition",label:"Koalitionsvertrag",    desc:"Form a governing coalition in the Bundestag or Reichstag.", countries:["de"],
    check: function (c) { return (c.electoralSystem || "").indexOf("dhondt") !== -1 && c.coalition; } },
  /* France-specific */
  { key:"fr_absolue",  label:"Majorité Absolue",      desc:"Win an absolute majority of the Assemblée (289+).", countries:["fr"],
    check: function (c) { return c.seats >= 289; } },
  /* Australia-specific */
  { key:"au_teal",     label:"Hold the Teals",        desc:"End a term with the Teal bloc above 60.", countries:["au"],
    check: function (c) { return c.blocSupport && (c.blocSupport.teal || 0) >= 60; } },
  /* Canada-specific */
  { key:"ca_quebec",   label:"Maître chez nous",      desc:"Win 60%+ of Québec's seats.", countries:["ca"],
    check: function (c) { var q = c.byRegion && c.byRegion.filter(function (r) { return r.id === "CA_QC"; })[0]; return !!(q && q.total > 0 && q.won >= Math.ceil(q.total * 0.6)); } },
  /* Japan-specific */
  { key:"jp_twothirds",label:"Constitutional Majority",desc:"Win a two-thirds Diet supermajority.", countries:["jp"],
    check: function (c) { var t = G.activeTotalSeats ? G.activeTotalSeats() : 465; return c.seats >= Math.round(t * 0.66); } },
  /* India-specific */
  { key:"in_south",    label:"Southern Sweep",         desc:"Win 60%+ of the Southern seats.", countries:["in"],
    check: function (c) { var s = c.byRegion && c.byRegion.filter(function (r) { return r.id === "IN_SOU"; })[0]; return !!(s && s.total > 0 && s.won >= Math.ceil(s.total * 0.6)); } }
];

/* ---- check objectives and scenario goal ---------------------------------- */
G.checkObjectives = function (ctx) {
  var unlocked = [];
  /* determine which country we're playing as for filtering objectives */
  var country = ctx.country || (G.state && G.state._country) || "uk";
  G.OBJECTIVES.forEach(function (obj) {
    /* skip objectives restricted to countries the player isn't playing */
    if (obj.countries && obj.countries.indexOf(country) === -1) return;
    try { if (obj.check(ctx)) unlocked.push(obj.key); } catch (e) {}
  });
  /* scenario-specific objective */
  if (ctx.scenario) {
    var sc = (G.SCENARIOS || []).filter(function (s) { return s.key === ctx.scenario; })[0];
    if (sc && sc.objective) {
      if (G.objectiveMet(sc.objective, ctx)) unlocked.push("scenario_" + ctx.scenario);
    }
  }
  return unlocked;
};

/* ---- evaluate one objective spec against a result/term ctx ---------------- */
/* Supported types:
   seats / majority   {target}          — reach a raw seat total
   pct                {target 0-100}    — reach a share of the chamber
   supermajority      {pct 0-1}         — reach a fraction of the chamber
   coalition          {}                — form a government from a hung result
   minority           {}                — govern as the largest party without a majority
   blocRecover/blocHold {bloc,target}   — end with a voter bloc at/above target
   allblocs           {target}          — every active bloc at/above target
   region_win         {region,share=.6} — win ≥ share of a named region's seats
   region_sweep       {region}          — win every seat in a named region
   region_deny        {region,target?}  — win (target or a majority) with ZERO seats there
   regionset_win      {regions[],share} — win ≥ share across a set of regions       */
G.objectiveMet = function (o, ctx) {
  if (!o) return false;
  var total = ctx.totalSeats || (G.activeTotalSeats ? G.activeTotalSeats() : 650);
  var maj   = ctx.majority   || (G.activeMajority ? G.activeMajority() : ((G.CONFIG && G.CONFIG.majority) || 326));
  function region(id) { return (ctx.byRegion || []).filter(function (r) { return r.id === id; })[0]; }
  switch (o.type) {
    case "seats":
    case "par":            return ctx.seats >= o.target;
    /* a target below the majority line is a majority OF that size (80-seat
       majority); otherwise an absolute seat total */
    case "majority":       return o.target < maj ? ctx.seats - maj >= o.target : ctx.seats >= o.target;
    case "pct":            return total > 0 && (ctx.seats / total * 100) >= o.target;
    case "supermajority":  return ctx.seats >= Math.round(total * (o.pct || 0.6));
    case "coalition":      return !!(ctx.largest && ctx.coalition && !ctx.coalition.soloMajority);
    case "minority":       return !!(ctx.largest && ctx.seats < maj);
    case "blocRecover":
    case "blocHold":       return !!(ctx.blocSupport) && (ctx.blocSupport[o.bloc] || 0) >= o.target;
    case "allblocs": {
      if (!ctx.blocSupport) return false;
      var blocs = G.activeBlocs ? G.activeBlocs() : (G.ELECTORATE_BLOCS || []);
      return blocs.every(function (b) { return (ctx.blocSupport[b.key] || 0) >= o.target; });
    }
    case "region_win": {
      var r = region(o.region);
      return !!(r && r.total > 0 && r.won >= Math.ceil(r.total * (o.share || 0.6)));
    }
    case "region_sweep": {
      var rs = region(o.region);
      return !!(rs && rs.total > 0 && rs.won >= rs.total);
    }
    case "region_deny": {
      var rd = region(o.region);
      var need = o.target || maj;
      return ctx.seats >= need && rd && rd.won === 0;
    }
    case "regionset_win": {
      var tot = 0, won = 0;
      (o.regions || []).forEach(function (id) { var rr = region(id); if (rr) { tot += rr.total; won += rr.won; } });
      return tot > 0 && won >= Math.ceil(tot * (o.share || 0.5));
    }
    default:               return false;
  }
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

/* ---- HISTORIC WHAT-IFS: replay a real campaign as the side that lost (or
   struggled) — with the real result as PAR. Beat history and it counts. ----- */
(function () {
  function land(key) { var s = G.SCENARIOS.filter(function (x) { return x.key === key; })[0]; return s ? s.landscape : null; }
  function cloneLand(l, tweak) {
    if (!l || typeof l === "string") return l;
    var out = {}; Object.keys(l).forEach(function (r) { out[r] = l[r].map(function (e) { return [e[0], e[1]]; }); });
    if (tweak) tweak(out);
    return out;
  }
  var UK1979 = {
    NE: [["Labour",50],["Conservative",34],["Liberal",14],["Independent",2]], NW: [["Labour",44],["Conservative",42],["Liberal",12],["Independent",2]],
    YH: [["Labour",46],["Conservative",38],["Liberal",14],["Independent",2]], EM: [["Conservative",48],["Labour",38],["Liberal",12],["Independent",2]],
    WM: [["Conservative",46],["Labour",40],["Liberal",12],["Independent",2]], EE: [["Conservative",52],["Labour",32],["Liberal",14],["Independent",2]],
    SE: [["Conservative",56],["Labour",24],["Liberal",18],["Independent",2]], SW: [["Conservative",52],["Labour",24],["Liberal",22],["Independent",2]],
    LDN: [["Conservative",46],["Labour",40],["Liberal",12],["Independent",2]], SCO: [["Labour",42],["Conservative",32],["SNP",16],["Liberal",10]],
    WAL: [["Labour",48],["Conservative",32],["Plaid Cymru",10],["Liberal",10]], NI: [["UUP",36],["DUP",14],["SDLP",20],["Alliance",12],["Independent",18]]
  };
  var UK1992 = {
    NE: [["Labour",54],["Conservative",32],["Liberal Democrat",14]], NW: [["Labour",44],["Conservative",38],["Liberal Democrat",18]],
    YH: [["Labour",44],["Conservative",38],["Liberal Democrat",18]], EM: [["Conservative",46],["Labour",38],["Liberal Democrat",16]],
    WM: [["Conservative",44],["Labour",40],["Liberal Democrat",16]], EE: [["Conservative",52],["Labour",28],["Liberal Democrat",20]],
    SE: [["Conservative",56],["Liberal Democrat",24],["Labour",20]], SW: [["Conservative",48],["Liberal Democrat",32],["Labour",20]],
    LDN: [["Conservative",46],["Labour",38],["Liberal Democrat",16]], SCO: [["Labour",40],["Conservative",26],["SNP",22],["Liberal Democrat",12]],
    WAL: [["Labour",50],["Conservative",28],["Plaid Cymru",10],["Liberal Democrat",12]], NI: [["UUP",34],["SDLP",24],["DUP",14],["Sinn Féin",10],["Alliance",8],["Independent",10]]
  };
  var UK2015 = {
    NE: [["Labour",46],["Conservative",26],["UKIP",18],["Green",4],["Independent",6]], NW: [["Labour",44],["Conservative",32],["UKIP",14],["Green",4],["Independent",6]],
    YH: [["Labour",40],["Conservative",34],["UKIP",16],["Green",4],["Independent",6]], EM: [["Conservative",44],["Labour",32],["UKIP",16],["Green",4],["Independent",4]],
    WM: [["Conservative",42],["Labour",34],["UKIP",16],["Green",4],["Independent",4]], EE: [["Conservative",50],["Labour",22],["UKIP",18],["Green",4],["Independent",6]],
    SE: [["Conservative",52],["Labour",18],["UKIP",16],["Green",6],["Independent",8]], SW: [["Conservative",48],["Labour",18],["UKIP",14],["Green",6],["Independent",14]],
    LDN: [["Labour",44],["Conservative",36],["UKIP",8],["Green",6],["Independent",6]], SCO: [["SNP",50],["Labour",24],["Conservative",16],["Independent",10]],
    WAL: [["Labour",38],["Conservative",28],["UKIP",14],["Plaid Cymru",12],["Independent",8]], NI: [["DUP",26],["Sinn Féin",24],["UUP",16],["SDLP",14],["Alliance",8],["Independent",12]]
  };
  var UK2024 = {
    NE: [["Labour",48],["Reform UK",22],["Conservative",16],["Liberal Democrat",6],["Green",8]], NW: [["Labour",46],["Reform UK",18],["Liberal Democrat",8],["Green",8],["Independent",20]],
    YH: [["Labour",44],["Reform UK",20],["Liberal Democrat",8],["Green",8],["Independent",20]], EM: [["Labour",40],["Reform UK",20],["Liberal Democrat",10],["Green",8],["Independent",22]],
    WM: [["Labour",40],["Reform UK",20],["Liberal Democrat",10],["Green",8],["Independent",22]], EE: [["Labour",32],["Liberal Democrat",18],["Reform UK",18],["Green",8],["Independent",24]],
    SE: [["Liberal Democrat",30],["Labour",28],["Reform UK",16],["Green",10],["Independent",16]], SW: [["Liberal Democrat",36],["Labour",26],["Reform UK",16],["Green",10],["Independent",12]],
    LDN: [["Labour",48],["Liberal Democrat",14],["Green",14],["Reform UK",8],["Independent",16]], SCO: [["Labour",36],["SNP",30],["Liberal Democrat",12],["Reform UK",8],["Independent",14]],
    WAL: [["Labour",40],["Reform UK",18],["Plaid Cymru",16],["Liberal Democrat",8],["Independent",18]], NI: [["Sinn Féin",30],["DUP",24],["Alliance",16],["SDLP",12],["UUP",12],["Independent",6]]
  };
  var EC2016 = cloneLand(G.INT_LANDSCAPES && G.INT_LANDSCAPES.usa_ec_2020, function (o) {
    ["EC_MI","EC_WI","EC_PA","EC_AZ","EC_GA","EC_NC"].forEach(function (k) { if (o[k]) o[k] = [["Republican (USA)",51],["Democrat (USA)",47],["Independent",2]]; });
  });
  var W = [
    { key: "wi_major1997", voteShift: -0.005, name: "What If: Major in 1997", year: 1997, country: "uk", lineage: "Conservative",
      desc: "Eighteen years in power, a party at war over Europe and New Labour at 50 points. Build the Conservative cabinet history never gave John Major.",
      difficulty: "hard", blocSupport: { shires: 46, business: 44, pensioners: 52, redwall: 28, urbanprog: 24, students: 22 },
      landscape: land("blair1997"), par: { seats: 165, who: "John Major", note: "the Conservatives' worst result since 1906" } },
    { key: "wi_corbyn2019", voteShift: 0.05, name: "Hold the Red Wall (2019)", year: 2019, country: "uk", lineage: "Labour",
      desc: "Get Brexit Done is sweeping through Leave-voting Labour heartlands. Hold the Red Wall with the best Labour cabinet of all time.",
      difficulty: "hard", blocSupport: { redwall: 36, reform: 70, urbanprog: 60, students: 62, pensioners: 34 },
      landscape: land("brexit2019"), par: { seats: 202, who: "Jeremy Corbyn", note: "Labour's fewest seats since 1935" } },
    { key: "wi_callaghan1979", voteShift: 0.072, name: "Winter of Discontent (1979)", year: 1979, country: "uk", lineage: "Labour",
      desc: "Rubbish in the streets, the IMF memory, and a new kind of Tory leader. Can Labour cling on?",
      difficulty: "hard", blocSupport: { redwall: 54, business: 34, shires: 34, pensioners: 44 },
      landscape: UK1979, par: { seats: 269, who: "James Callaghan" } },
    { key: "wi_kinnock1992", voteShift: -0.035, name: "Kinnock at Sheffield (1992)", year: 1992, country: "uk", lineage: "Labour",
      desc: "Every poll says Labour. The Sun says otherwise. Turn the shy Tory surge.",
      difficulty: "normal", blocSupport: { redwall: 60, urbanprog: 56, shires: 40, business: 38 },
      landscape: UK1992, par: { seats: 271, who: "Neil Kinnock" } },
    { key: "wi_brown2010", voteShift: 0.075, name: "Brown's Last Stand (2010)", year: 2010, country: "uk", lineage: "Labour",
      desc: "The crash, the expenses scandal and Cleggmania. Thirteen years in, can Labour stay in Downing Street?",
      difficulty: "hard", blocSupport: { redwall: 50, urbanprog: 44, business: 36, shires: 36 },
      landscape: land("hung2010"), par: { seats: 258, who: "Gordon Brown" } },
    { key: "wi_clegg2015", voteShift: -0.165, name: "After the Coalition (2015)", year: 2015, country: "uk", lineage: "Liberal",
      desc: "Tuition fees, five years of austerity and the SNP tide. Save the Liberal Democrats from oblivion.",
      difficulty: "hard", blocSupport: { students: 26, urbanprog: 34, shires: 46 },
      landscape: UK2015, par: { seats: 8, who: "Nick Clegg", note: "from 57 to 8" } },
    { key: "wi_sunak2024", voteShift: -0.045, name: "Rishi in the Rain (2024)", year: 2024, country: "uk", lineage: "Conservative",
      desc: "Fourteen years, five Prime Ministers and a soaked lectern. Reform splitting the right. Stop the wipeout.",
      difficulty: "hard", blocSupport: { shires: 40, pensioners: 46, business: 36, reform: 72, redwall: 30 },
      landscape: UK2024, par: { seats: 121, who: "Rishi Sunak", note: "the Conservatives' worst result ever" } },
    { key: "wi_clinton2016", voteShift: -0.045, name: "What If: Clinton in 2016", year: 2016, country: "us", lineage: "USDem", electoralSystem: "ec_usa_president",
      desc: "The Blue Wall is cracking in Michigan, Wisconsin and Pennsylvania. Win the Electoral College that Hillary Clinton lost.",
      difficulty: "hard", landscape: EC2016, par: { seats: 227, who: "Hillary Clinton", note: "won the popular vote, lost the College" } },
    { key: "wi_otoole2021", voteShift: -0.04, name: "What If: O'Toole in 2021", year: 2021, country: "ca", lineage: "ConCA", electoralSystem: "fptp_canada",
      desc: "Trudeau's snap election. The Tories win the popular vote again — and lose. Turn votes into seats.",
      difficulty: "normal", landscape: "canada_2021", par: { seats: 119, who: "Erin O'Toole" } },
    { key: "wi_morrison2022", voteShift: -0.075, name: "What If: Morrison in 2022", year: 2022, country: "au", lineage: "LibAU", electoralSystem: "av_australia",
      desc: "The teal wave washes over Liberal heartlands. Hold the Coalition's seats against the independents.",
      difficulty: "normal", landscape: "australia_2022", par: { seats: 58, who: "Scott Morrison", note: "the Coalition's total" } },
    { key: "wi_laschet2021", voteShift: -0.125, name: "What If: Laschet in 2021", year: 2021, country: "de", lineage: "CDU", electoralSystem: "pr_dhondt_bundestag",
      desc: "After Merkel, a laugh in a flood zone. Keep the Union in the Chancellery.",
      difficulty: "normal", landscape: "bundestag_2021", par: { seats: 197, who: "Armin Laschet" } },
    { key: "wi_spd1932", voteShift: -0.09, name: "Stop Them in 1932", year: 1932, country: "de", lineage: "SPD_DE", electoralSystem: "pr_dhondt_weimar",
      desc: "July 1932: the Republic's last free contest of consequence. Build the SPD cabinet that could have held the line.",
      difficulty: "hard", landscape: "weimar_1932_jul", par: { seats: 133, who: "Otto Wels's SPD" } },
    { key: "wi_rahul2024", voteShift: -0.05, name: "What If: Rahul in 2024", year: 2024, country: "in", lineage: "INC", electoralSystem: "fptp_india",
      desc: "Modi seeks a third term. Congress has rebuilt with the INDIA alliance. Go further than 99.",
      difficulty: "hard", landscape: "india_2024", par: { seats: 99, who: "Rahul Gandhi" } }
  ];
  W.forEach(function (w) {
    w.mode = "dynasty"; w.whatIf = true;
    w.objective = { type: "par", target: w.par.seats + 1,
      label: "Beat history: " + w.par.who + " won " + w.par.seats + (w.par.note ? " (" + w.par.note + ")" : "") };
    G.SCENARIOS.push(w);
  });
})();

/* ---- apply a scenario ----------------------------------------------------- */
/* Sets gameYear, clones the landscape, seeds blocSupport on G.state.
   Called from G.newGame() after careerInit — G.state already exists.        */
G.applyScenario = function (key) {
  if (!key || key === "freshstart" || !G.state) {
    G.state._scenarioLandscape = null;
    G.state._scenarioBlocSupport = null;
    G.state._electoralSystemKey = null;
    G.state._countryRegionKey = null;
    G.state._country = "uk";
    return;
  }
  var sc = (G.SCENARIOS || []).filter(function (s) { return s.key === key; })[0];
  if (!sc) {
    G.state._scenarioLandscape = null;
    G.state._scenarioBlocSupport = null;
    G.state._electoralSystemKey = null;
    G.state._countryRegionKey = null;
    G.state._country = "uk";
    return;
  }

  if (sc.year) G.state.gameYear = sc.year;
  if (sc.country) G.state._country = sc.country;

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
  if (sc.lineage)    G.state.lineage    = sc.lineage;
  /* a what-if's handicap: the national mood you inherited */
  G.state._scenarioVoteShift = sc.voteShift || 0;
  if (sc.difficulty) G.state.difficulty = sc.difficulty;
  G.state.scenarioKey = key;
  /* re-title the cabinet for this country (President, Reich Chancellor, …) */
  if (G.setCabinetSize) G.setCabinetSize(G.state.cabinetSize);
};

/* ---- landscape resolver -------------------------------------------------- */
/* Call this in simulateCampaign instead of G.LANDSCAPE[r.id] directly so
   scenario overrides and future campaign-trail patches all flow through one
   point.                                                                      */
G.activeLandscape = function (regionId) {
  if (G.state && G.state._scenarioLandscape && G.state._scenarioLandscape[regionId]) {
    return G.state._scenarioLandscape[regionId];
  }
  /* for international games, use country-specific landscape data */
  var sysKey = G.state && G.state._electoralSystemKey;
  var sys = sysKey && G.ELECTORAL_SYSTEMS && G.ELECTORAL_SYSTEMS[sysKey];
  if (sys && sys.regionKey && sys.regionKey !== "uk" && G.COUNTRY_LANDSCAPES) {
    var cl = G.COUNTRY_LANDSCAPES[sys.regionKey];
    if (cl && cl[regionId]) return cl[regionId];
  }
  return G.LANDSCAPE[regionId] || G.LANDSCAPE.EE;
};

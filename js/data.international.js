/* =============================================================================
   650 — INTERNATIONAL DATA  (v1)
   International party definitions, country landscape data, and
   historical figures for 14 countries / electoral systems.
   Loaded after data.expansion2.js, before scenarios.js.
   ============================================================================= */
window.G = window.G || {};

(function () {
  var G = window.G;

  /* ==========================================================================
     1 · INTERNATIONAL PARTIES  (add only if not already present)
     ========================================================================== */
  function reg(label, lineage, colour, align, cap) {
    if (!G.PARTIES[label]) G.PARTIES[label] = { label: label, lineage: lineage, colour: colour, cap: cap || 2980 };
    if (G.PARTY_ALIGN && !(label in G.PARTY_ALIGN)) G.PARTY_ALIGN[label] = align || 0;
    if (G.LINEAGE_ALIGN && !(lineage in G.LINEAGE_ALIGN)) G.LINEAGE_ALIGN[lineage] = align || 0;
  }

  /* Germany — Weimar / Nazi era */
  reg("NSDAP",          "NSDAP",     "#8b1a1a", 2.2,  647);
  reg("SPD",            "SPD_DE",    "#e3000f", -1.2, 647);
  reg("KPD",            "KPD",       "#cc0000", -2.0, 647);
  reg("Zentrum",        "Zentrum",   "#2e7d32",  0.3, 647);
  reg("DNVP",           "DNVP",      "#1a237e",  1.8, 647);
  reg("BVP",            "BVP",       "#ff8f00",  0.5, 647);
  reg("DVP",            "DVP",       "#fbc02d",  0.8, 647);
  reg("DDP",            "DDP",       "#0288d1", -0.5, 647);
  /* Germany — Modern */
  reg("CDU/CSU",        "CDU",       "#000000",  1.0, 736);
  reg("Greens (DE)",    "GreenDE",   "#46962b", -1.0, 736);
  reg("FDP",            "FDP",       "#ffcc00",  0.5, 736);
  reg("AfD",            "AfD",       "#009ee0",  1.9, 736);
  reg("Die Linke",      "Linke",     "#be3075", -1.8, 736);
  reg("BSW",            "BSW",       "#7b1fa2", -0.5, 736);
  /* France */
  reg("Ensemble",               "Macron",   "#ffeb3b",  0.2, 577);
  reg("Rassemblement National", "RN",        "#003189",  2.0, 577);
  reg("La France Insoumise",    "LFI",       "#cc1f27", -1.8, 577);
  reg("NUPES",                  "NUPES",     "#e63946", -1.2, 577);
  reg("Les Républicains",       "LR",        "#0d47a1",  1.2, 577);
  reg("Parti Socialiste",       "PS_FR",     "#ff1744", -1.0, 577);
  reg("Parti Communiste",       "PCF",       "#cc0000", -1.8, 577);
  /* Australia */
  reg("Australian Labor Party", "ALP",       "#e53935", -1.0, 151);
  reg("Liberal Party",          "LibAU",     "#1565c0",  1.2, 151);
  reg("National Party",         "NatAU",     "#2e7d32",  1.0, 151);
  reg("Greens (AU)",            "GreenAU",   "#4caf50", -1.4, 151);
  reg("Teal Independent",       "TealAU",    "#008080", -0.2, 151);
  /* Canada */
  reg("Liberal (CA)",           "LibCA",     "#c0392b", -0.3, 338);
  reg("Conservative (CA)",      "ConCA",     "#1a237e",  1.2, 338);
  reg("NDP",                    "NDP",       "#f37021", -1.2, 338);
  reg("Bloc Québécois",         "BQ",        "#00bcd4", -0.8,  78);
  reg("Green (CA)",             "GreenCA",   "#4caf50", -1.1, 338);
  /* Japan */
  reg("LDP",                    "LDP",       "#1565c0",  1.0, 465);
  reg("CDP (JP)",               "CDP_JP",    "#c62828", -0.8, 465);
  reg("Komeito",                "Komeito",   "#ff7043",  0.3, 465);
  reg("Nippon Ishin",           "Ishin",     "#ff8c00",  0.5, 465);
  /* India */
  reg("BJP",                    "BJP",       "#ff6f00",  1.0, 543);
  reg("INC",                    "INC",       "#1565c0", -0.3, 543);
  reg("Samajwadi Party",        "SP_IN",     "#cc0000", -0.5, 543);
  reg("AITC",                   "AITC",      "#2196f3", -0.5, 543);
  /* Authoritarian single-party */
  reg("Korean Workers' Party",  "KWP",       "#cc0000",  0.0, 687);
  reg("Communist Party (SU)",   "CPSU",      "#b71c1c",  0.0, 569);
  reg("Communist Party (CU)",   "PCC",       "#b71c1c",  0.0, 470);
  reg("Chinese Communist Party","CPC",       "#b71c1c",  0.0, 2980);
  /* USA historical */
  reg("Democrat (USA)",         "USDem",     "#1f6feb", -0.8, 538);
  reg("Republican (USA)",       "USRep",     "#cf2a27",  1.2, 538);
  reg("Bull Moose",             "BullMoose", "#4caf50",  0.2, 538);
  reg("Federalist",             "Federalist","#795548",  1.0, 538);
  reg("Whig (USA)",             "WhigUSA",   "#607d8b",  0.5, 538);
  reg("Democrat 1860 (South)",  "DemSouth",  "#8d6e63",  1.5, 538);
  reg("Constitutional Union",   "ConstUnion","#9e9e9e",  0.5, 538);
  /* Misc international */
  reg("Fianna Fáil",            "FiannaFail","#33aa33", -0.2, 160);
  reg("Fine Gael",              "FineGael",  "#6699ff",  0.5, 160);
  reg("Sinn Féin (IE)",         "SF_IE",     "#326760", -1.2, 160);

  /* ==========================================================================
     2 · INTERNATIONAL LANDSCAPE DATA
         Referenced by scenario objects via landscape:"key" string.
         applyScenario (scenarios.js) resolves string keys via G.INT_LANDSCAPES.
         Format: { regionId: [[party, share%], …] }
     ========================================================================== */
  G.INT_LANDSCAPES = {};

  /* -- USA House 2024 -------------------------------------------------------- */
  G.INT_LANDSCAPES["usa_house_2024"] = {
    US_NE:  [["Democrat (USA)",64],["Republican (USA)",33],["Independent",3]],
    US_MA:  [["Democrat (USA)",54],["Republican (USA)",43],["Independent",3]],
    US_GL:  [["Democrat (USA)",48],["Republican (USA)",49],["Independent",3]],
    US_PL:  [["Republican (USA)",70],["Democrat (USA)",27],["Independent",3]],
    US_SE:  [["Republican (USA)",59],["Democrat (USA)",38],["Independent",3]],
    US_TX:  [["Republican (USA)",54],["Democrat (USA)",43],["Independent",3]],
    US_SW:  [["Republican (USA)",50],["Democrat (USA)",47],["Independent",3]],
    US_PNW: [["Democrat (USA)",58],["Republican (USA)",38],["Independent",4]],
    US_CA:  [["Democrat (USA)",63],["Republican (USA)",33],["Independent",4]],
    US_WV:  [["Republican (USA)",73],["Democrat (USA)",25],["Independent",2]]
  };

  /* -- USA Presidential 2024 EC ---------------------------------------------- */
  G.INT_LANDSCAPES["usa_ec_2024"] = {
    EC_SAFE_DEM:  [["Democrat (USA)",68],["Republican (USA)",29],["Independent",3]],
    EC_LEAN_DEM:  [["Democrat (USA)",55],["Republican (USA)",42],["Independent",3]],
    EC_NV:        [["Republican (USA)",50],["Democrat (USA)",47],["Independent",3]],
    EC_MI:        [["Republican (USA)",50],["Democrat (USA)",48],["Independent",2]],
    EC_WI:        [["Republican (USA)",50],["Democrat (USA)",49],["Independent",1]],
    EC_PA:        [["Republican (USA)",50],["Democrat (USA)",48],["Independent",2]],
    EC_AZ:        [["Republican (USA)",52],["Democrat (USA)",46],["Independent",2]],
    EC_GA:        [["Republican (USA)",51],["Democrat (USA)",48],["Independent",1]],
    EC_NC:        [["Republican (USA)",51],["Democrat (USA)",47],["Independent",2]],
    EC_LEAN_REP:  [["Republican (USA)",57],["Democrat (USA)",40],["Independent",3]],
    EC_SAFE_REP:  [["Republican (USA)",70],["Democrat (USA)",27],["Independent",3]]
  };

  /* -- USA Presidential 2020 EC (Biden win) ---------------------------------- */
  G.INT_LANDSCAPES["usa_ec_2020"] = {
    EC_SAFE_DEM:  [["Democrat (USA)",70],["Republican (USA)",27],["Independent",3]],
    EC_LEAN_DEM:  [["Democrat (USA)",56],["Republican (USA)",41],["Independent",3]],
    EC_NV:        [["Democrat (USA)",51],["Republican (USA)",46],["Independent",3]],
    EC_MI:        [["Democrat (USA)",51],["Republican (USA)",47],["Independent",2]],
    EC_WI:        [["Democrat (USA)",50],["Republican (USA)",49],["Independent",1]],
    EC_PA:        [["Democrat (USA)",50],["Republican (USA)",49],["Independent",1]],
    EC_AZ:        [["Democrat (USA)",49],["Republican (USA)",49],["Independent",2]],
    EC_GA:        [["Democrat (USA)",50],["Republican (USA)",49],["Independent",1]],
    EC_NC:        [["Republican (USA)",50],["Democrat (USA)",49],["Independent",1]],
    EC_LEAN_REP:  [["Republican (USA)",58],["Democrat (USA)",39],["Independent",3]],
    EC_SAFE_REP:  [["Republican (USA)",70],["Democrat (USA)",27],["Independent",3]]
  };

  /* -- USA Presidential 1980 EC (Reagan revolution) -------------------------- */
  G.INT_LANDSCAPES["usa_ec_1980"] = {
    EC_SAFE_DEM:  [["Democrat (USA)",60],["Republican (USA)",36],["Independent",4]],
    EC_LEAN_DEM:  [["Democrat (USA)",50],["Republican (USA)",46],["Independent",4]],
    EC_NV:        [["Republican (USA)",56],["Democrat (USA)",40],["Independent",4]],
    EC_MI:        [["Republican (USA)",50],["Democrat (USA)",46],["Independent",4]],
    EC_WI:        [["Republican (USA)",48],["Democrat (USA)",44],["Independent",8]],
    EC_PA:        [["Republican (USA)",50],["Democrat (USA)",46],["Independent",4]],
    EC_AZ:        [["Republican (USA)",61],["Democrat (USA)",35],["Independent",4]],
    EC_GA:        [["Democrat (USA)",56],["Republican (USA)",41],["Independent",3]],
    EC_NC:        [["Republican (USA)",50],["Democrat (USA)",47],["Independent",3]],
    EC_LEAN_REP:  [["Republican (USA)",58],["Democrat (USA)",38],["Independent",4]],
    EC_SAFE_REP:  [["Republican (USA)",66],["Democrat (USA)",30],["Independent",4]]
  };

  /* -- USA Presidential 1932 EC (FDR New Deal) ------------------------------- */
  G.INT_LANDSCAPES["usa_ec_1932"] = {
    EC_SAFE_DEM:  [["Democrat (USA)",62],["Republican (USA)",35],["Independent",3]],
    EC_LEAN_DEM:  [["Democrat (USA)",55],["Republican (USA)",42],["Independent",3]],
    EC_NV:        [["Democrat (USA)",55],["Republican (USA)",42],["Independent",3]],
    EC_MI:        [["Democrat (USA)",53],["Republican (USA)",44],["Independent",3]],
    EC_WI:        [["Democrat (USA)",54],["Republican (USA)",43],["Independent",3]],
    EC_PA:        [["Democrat (USA)",52],["Republican (USA)",45],["Independent",3]],
    EC_AZ:        [["Democrat (USA)",55],["Republican (USA)",42],["Independent",3]],
    EC_GA:        [["Democrat (USA)",92],["Republican (USA)",8],["Independent",0]],
    EC_NC:        [["Democrat (USA)",70],["Republican (USA)",28],["Independent",2]],
    EC_LEAN_REP:  [["Democrat (USA)",49],["Republican (USA)",48],["Independent",3]],
    EC_SAFE_REP:  [["Republican (USA)",55],["Democrat (USA)",42],["Independent",3]]
  };

  /* -- USA Presidential 1860 EC (Lincoln) ------------------------------------ */
  G.INT_LANDSCAPES["usa_ec_1860"] = {
    EC_SAFE_DEM:  [["Republican (USA)",52],["Democrat (USA)",34],["Whig (USA)",10],["Democrat 1860 (South)",4]],
    EC_LEAN_DEM:  [["Republican (USA)",46],["Democrat (USA)",28],["Whig (USA)",16],["Democrat 1860 (South)",10]],
    EC_NV:        [["Republican (USA)",48],["Democrat (USA)",30],["Whig (USA)",14],["Democrat 1860 (South)",8]],
    EC_MI:        [["Republican (USA)",52],["Democrat (USA)",30],["Whig (USA)",12],["Democrat 1860 (South)",6]],
    EC_WI:        [["Republican (USA)",52],["Democrat (USA)",32],["Whig (USA)",12],["Democrat 1860 (South)",4]],
    EC_PA:        [["Republican (USA)",48],["Democrat (USA)",34],["Whig (USA)",14],["Democrat 1860 (South)",4]],
    EC_AZ:        [["Republican (USA)",44],["Democrat (USA)",30],["Whig (USA)",18],["Democrat 1860 (South)",8]],
    EC_GA:        [["Democrat 1860 (South)",60],["Constitutional Union",26],["Democrat (USA)",14],["Republican (USA)",0]],
    EC_NC:        [["Constitutional Union",48],["Democrat 1860 (South)",38],["Democrat (USA)",10],["Republican (USA)",4]],
    EC_LEAN_REP:  [["Democrat 1860 (South)",52],["Constitutional Union",24],["Democrat (USA)",14],["Republican (USA)",10]],
    EC_SAFE_REP:  [["Republican (USA)",56],["Democrat (USA)",24],["Whig (USA)",14],["Democrat 1860 (South)",6]]
  };

  /* -- Weimar Germany — July 1932 ------------------------------------------- */
  G.INT_LANDSCAPES["weimar_1932_jul"] = {
    DE_PR: [["NSDAP",36],["SPD",26],["KPD",17],["Zentrum",13],["DNVP",5],["DVP",2],["DDP",1]],
    DE_BY: [["NSDAP",32],["BVP",22],["SPD",18],["KPD",10],["Zentrum",5],["DNVP",5],["DVP",4],["DDP",4]],
    DE_SA: [["NSDAP",41],["SPD",22],["KPD",20],["DNVP",7],["Zentrum",5],["DVP",3],["DDP",2]],
    DE_WU: [["NSDAP",34],["SPD",20],["Zentrum",14],["KPD",10],["BVP",8],["DNVP",8],["DVP",4],["DDP",2]],
    DE_BA: [["NSDAP",37],["Zentrum",22],["SPD",18],["KPD",10],["DNVP",5],["BVP",4],["DVP",2],["DDP",2]],
    DE_TH: [["NSDAP",42],["SPD",20],["KPD",16],["DNVP",10],["DVP",5],["Zentrum",4],["DDP",3]],
    DE_HE: [["NSDAP",43],["SPD",22],["KPD",12],["DNVP",8],["DVP",6],["Zentrum",5],["DDP",4]],
    DE_HH: [["NSDAP",33],["SPD",28],["KPD",18],["DNVP",8],["DDP",5],["DVP",4],["Zentrum",4]],
    DE_BR: [["NSDAP",30],["SPD",30],["KPD",20],["DNVP",8],["DVP",5],["DDP",4],["Zentrum",3]],
    DE_OT: [["NSDAP",37],["SPD",20],["KPD",14],["Zentrum",12],["DNVP",6],["BVP",4],["DVP",4],["DDP",3]]
  };

  /* -- Weimar Germany — November 1932 --------------------------------------- */
  G.INT_LANDSCAPES["weimar_1932_nov"] = {
    DE_PR: [["NSDAP",32],["SPD",24],["KPD",19],["Zentrum",13],["DNVP",9],["DVP",2],["DDP",1]],
    DE_BY: [["NSDAP",28],["BVP",20],["SPD",17],["KPD",12],["Zentrum",6],["DNVP",9],["DVP",5],["DDP",3]],
    DE_SA: [["NSDAP",36],["SPD",22],["KPD",22],["DNVP",10],["Zentrum",5],["DVP",3],["DDP",2]],
    DE_WU: [["NSDAP",30],["SPD",20],["Zentrum",15],["KPD",12],["BVP",8],["DNVP",9],["DVP",4],["DDP",2]],
    DE_BA: [["NSDAP",33],["Zentrum",22],["SPD",18],["KPD",12],["DNVP",7],["BVP",4],["DVP",2],["DDP",2]],
    DE_TH: [["NSDAP",37],["SPD",20],["KPD",18],["DNVP",12],["DVP",6],["Zentrum",4],["DDP",3]],
    DE_HE: [["NSDAP",38],["SPD",22],["KPD",14],["DNVP",10],["DVP",7],["Zentrum",5],["DDP",4]],
    DE_HH: [["NSDAP",29],["SPD",27],["KPD",20],["DNVP",10],["DDP",6],["DVP",4],["Zentrum",4]],
    DE_BR: [["NSDAP",26],["SPD",28],["KPD",22],["DNVP",10],["DVP",6],["DDP",4],["Zentrum",4]],
    DE_OT: [["NSDAP",33],["SPD",20],["KPD",17],["Zentrum",12],["DNVP",9],["BVP",4],["DVP",3],["DDP",2]]
  };

  /* -- Germany — March 1933 "Enabling Act" election -------------------------- */
  G.INT_LANDSCAPES["weimar_1933"] = {
    DE_PR: [["NSDAP",44],["SPD",20],["KPD",12],["Zentrum",11],["DNVP",8],["DVP",3],["DDP",2]],
    DE_BY: [["NSDAP",38],["BVP",18],["SPD",15],["KPD",8],["Zentrum",8],["DNVP",8],["DVP",4],["DDP",1]],
    DE_SA: [["NSDAP",46],["SPD",19],["KPD",14],["DNVP",9],["Zentrum",6],["DVP",4],["DDP",2]],
    DE_WU: [["NSDAP",40],["SPD",18],["Zentrum",13],["KPD",9],["BVP",7],["DNVP",8],["DVP",3],["DDP",2]],
    DE_BA: [["NSDAP",44],["Zentrum",20],["SPD",16],["KPD",8],["DNVP",6],["BVP",3],["DVP",2],["DDP",1]],
    DE_TH: [["NSDAP",48],["SPD",17],["KPD",12],["DNVP",12],["DVP",5],["Zentrum",3],["DDP",3]],
    DE_HE: [["NSDAP",50],["SPD",18],["KPD",10],["DNVP",10],["DVP",5],["Zentrum",4],["DDP",3]],
    DE_HH: [["NSDAP",38],["SPD",25],["KPD",16],["DNVP",10],["DDP",5],["DVP",3],["Zentrum",3]],
    DE_BR: [["NSDAP",35],["SPD",26],["KPD",18],["DNVP",10],["DVP",5],["DDP",3],["Zentrum",3]],
    DE_OT: [["NSDAP",44],["SPD",18],["KPD",12],["Zentrum",11],["DNVP",8],["BVP",3],["DVP",2],["DDP",2]]
  };

  /* -- Germany — Bundestag 2021 ---------------------------------------------- */
  G.INT_LANDSCAPES["bundestag_2021"] = {
    DM_BW: [["CDU/CSU",28],["SPD",23],["Greens (DE)",18],["FDP",12],["AfD",12],["Die Linke",4],["BSW",3]],
    DM_BY: [["CDU/CSU",32],["SPD",19],["Greens (DE)",14],["FDP",12],["AfD",12],["Die Linke",4],["BSW",7]],
    DM_BE: [["SPD",28],["Greens (DE)",22],["CDU/CSU",18],["AfD",10],["FDP",10],["Die Linke",12]],
    DM_BB: [["SPD",30],["AfD",20],["CDU/CSU",18],["Die Linke",13],["Greens (DE)",10],["FDP",7],["BSW",2]],
    DM_HB: [["SPD",30],["Greens (DE)",18],["CDU/CSU",16],["Die Linke",11],["FDP",10],["AfD",9],["BSW",6]],
    DM_HH: [["SPD",30],["Greens (DE)",22],["CDU/CSU",16],["FDP",12],["AfD",8],["Die Linke",10],["BSW",2]],
    DM_HE: [["SPD",25],["CDU/CSU",24],["Greens (DE)",16],["FDP",12],["AfD",11],["Die Linke",6],["BSW",6]],
    DM_MV: [["SPD",28],["AfD",18],["CDU/CSU",18],["Die Linke",14],["Greens (DE)",10],["FDP",7],["BSW",5]],
    DM_NI: [["SPD",28],["CDU/CSU",24],["Greens (DE)",14],["FDP",12],["AfD",10],["Die Linke",5],["BSW",7]],
    DM_NW: [["SPD",28],["CDU/CSU",24],["Greens (DE)",15],["FDP",12],["AfD",9],["Die Linke",5],["BSW",7]],
    DM_RP: [["CDU/CSU",28],["SPD",25],["Greens (DE)",13],["FDP",12],["AfD",10],["Die Linke",5],["BSW",7]],
    DM_SL: [["SPD",32],["CDU/CSU",24],["AfD",10],["FDP",8],["Greens (DE)",9],["Die Linke",9],["BSW",8]],
    DM_SN: [["AfD",24],["CDU/CSU",20],["SPD",19],["FDP",10],["Greens (DE)",11],["Die Linke",9],["BSW",7]],
    DM_ST: [["AfD",22],["SPD",22],["CDU/CSU",18],["Die Linke",12],["FDP",8],["Greens (DE)",8],["BSW",10]],
    DM_SH: [["SPD",26],["CDU/CSU",25],["Greens (DE)",18],["FDP",12],["AfD",9],["Die Linke",4],["BSW",6]],
    DM_TH: [["AfD",24],["Die Linke",16],["SPD",20],["CDU/CSU",16],["FDP",8],["Greens (DE)",8],["BSW",8]]
  };

  /* -- France — Assemblée Nationale 2022 ------------------------------------ */
  G.INT_LANDSCAPES["france_2022"] = {
    FR_IDF: [["Ensemble",32],["NUPES",30],["Rassemblement National",12],["Les Républicains",10],["Parti Socialiste",8],["Parti Communiste",8]],
    FR_NO:  [["NUPES",28],["Rassemblement National",25],["Ensemble",22],["Les Républicains",12],["Parti Socialiste",8],["Parti Communiste",5]],
    FR_NE:  [["Rassemblement National",28],["Ensemble",24],["NUPES",20],["Les Républicains",14],["Parti Socialiste",8],["Parti Communiste",6]],
    FR_OUE: [["Ensemble",28],["NUPES",24],["Les Républicains",18],["Rassemblement National",16],["Parti Socialiste",8],["Parti Communiste",6]],
    FR_CEN: [["Ensemble",26],["NUPES",24],["Rassemblement National",22],["Les Républicains",12],["Parti Socialiste",8],["Parti Communiste",8]],
    FR_SUD: [["Rassemblement National",28],["Ensemble",24],["NUPES",22],["Les Républicains",12],["Parti Socialiste",8],["Parti Communiste",6]],
    FR_OUT: [["NUPES",32],["Ensemble",26],["Parti Communiste",14],["Rassemblement National",10],["Les Républicains",8],["Parti Socialiste",10]]
  };

  /* -- France — Presidential / Legislative 1968 (De Gaulle) ----------------- */
  G.INT_LANDSCAPES["france_1968"] = {
    FR_IDF: [["Ensemble",48],["Parti Communiste",22],["Parti Socialiste",16],["Les Républicains",10],["NUPES",4]],
    FR_NO:  [["Ensemble",44],["Parti Communiste",24],["Parti Socialiste",18],["Les Républicains",10],["NUPES",4]],
    FR_NE:  [["Ensemble",50],["Parti Socialiste",16],["Parti Communiste",16],["Les Républicains",14],["NUPES",4]],
    FR_OUE: [["Ensemble",48],["Les Républicains",20],["Parti Socialiste",16],["Parti Communiste",12],["NUPES",4]],
    FR_CEN: [["Ensemble",46],["Parti Communiste",20],["Parti Socialiste",18],["Les Républicains",12],["NUPES",4]],
    FR_SUD: [["Ensemble",46],["Parti Communiste",22],["Parti Socialiste",16],["Les Républicains",12],["NUPES",4]],
    FR_OUT: [["Ensemble",50],["Parti Socialiste",22],["Parti Communiste",16],["Les Républicains",8],["NUPES",4]]
  };

  /* -- Australia — House of Representatives 2022 ----------------------------- */
  G.INT_LANDSCAPES["australia_2022"] = {
    AU_NSW: [["Australian Labor Party",32],["Liberal Party",27],["Greens (AU)",12],["National Party",5],["Teal Independent",10],["Independent",14]],
    AU_VIC: [["Australian Labor Party",36],["Liberal Party",24],["Greens (AU)",16],["Teal Independent",8],["Independent",16]],
    AU_QLD: [["Australian Labor Party",32],["Liberal Party",27],["National Party",6],["Greens (AU)",12],["Independent",23]],
    AU_WA:  [["Australian Labor Party",34],["Liberal Party",24],["Greens (AU)",14],["National Party",4],["Independent",24]],
    AU_SA:  [["Australian Labor Party",34],["Liberal Party",26],["Greens (AU)",14],["Teal Independent",8],["Independent",18]],
    AU_TAS: [["Australian Labor Party",34],["Liberal Party",24],["Greens (AU)",18],["Independent",24]],
    AU_ACT: [["Australian Labor Party",38],["Greens (AU)",22],["Liberal Party",20],["Independent",20]]
  };

  /* -- Canada — Federal Election 2021 ---------------------------------------- */
  G.INT_LANDSCAPES["canada_2021"] = {
    CA_BC:  [["Liberal (CA)",34],["NDP",26],["Conservative (CA)",26],["Green (CA)",8],["Independent",6]],
    CA_PR:  [["Conservative (CA)",57],["NDP",18],["Liberal (CA)",18],["Independent",7]],
    CA_ON:  [["Liberal (CA)",37],["Conservative (CA)",35],["NDP",20],["Green (CA)",3],["Independent",5]],
    CA_QC:  [["Bloc Québécois",33],["Liberal (CA)",33],["NDP",17],["Conservative (CA)",14],["Independent",3]],
    CA_ATL: [["Liberal (CA)",42],["Conservative (CA)",30],["NDP",22],["Green (CA)",4],["Independent",2]],
    CA_NT:  [["Liberal (CA)",40],["NDP",30],["Conservative (CA)",22],["Independent",8]]
  };

  /* -- Japan — House of Representatives 2021 --------------------------------- */
  G.INT_LANDSCAPES["japan_2021"] = {
    JP_TO: [["LDP",34],["CDP (JP)",25],["Komeito",14],["Nippon Ishin",8],["Independent",19]],
    JP_OS: [["Nippon Ishin",28],["LDP",26],["CDP (JP)",20],["Komeito",14],["Independent",12]],
    JP_KA: [["LDP",36],["CDP (JP)",22],["Komeito",12],["Nippon Ishin",8],["Independent",22]],
    JP_CH: [["LDP",38],["CDP (JP)",20],["Komeito",10],["Nippon Ishin",6],["Independent",26]],
    JP_TH: [["LDP",40],["CDP (JP)",22],["Komeito",8],["Independent",30]],
    JP_CG: [["LDP",42],["CDP (JP)",18],["Komeito",8],["Independent",32]],
    JP_KY: [["LDP",38],["CDP (JP)",18],["Komeito",12],["Nippon Ishin",8],["Independent",24]],
    JP_HK: [["LDP",36],["CDP (JP)",26],["Komeito",10],["Independent",28]],
    JP_PR: [["LDP",30],["CDP (JP)",20],["Komeito",14],["Nippon Ishin",12],["Independent",24]]
  };

  /* -- India — Lok Sabha 2024 ------------------------------------------------ */
  G.INT_LANDSCAPES["india_2024"] = {
    IN_NOR: [["BJP",45],["INC",18],["Samajwadi Party",14],["Independent",23]],
    IN_NWE: [["BJP",44],["INC",22],["Independent",34]],
    IN_MAH: [["BJP",28],["INC",16],["Independent",56]],
    IN_GUJ: [["BJP",58],["INC",20],["Independent",22]],
    IN_SOU: [["INC",22],["BJP",12],["Independent",66]],
    IN_EAS: [["AITC",22],["INC",16],["BJP",20],["Independent",42]],
    IN_OTH: [["BJP",32],["INC",20],["Independent",48]]
  };

  /* -- North Korea — SPA election ------------------------------------------- */
  G.INT_LANDSCAPES["north_korea"] = {
    KP_PY: [["Korean Workers' Party",99],["Independent",1]],
    KP_NN: [["Korean Workers' Party",99],["Independent",1]],
    KP_SN: [["Korean Workers' Party",99],["Independent",1]],
    KP_KG: [["Korean Workers' Party",99],["Independent",1]],
    KP_HW: [["Korean Workers' Party",99],["Independent",1]],
    KP_HN: [["Korean Workers' Party",99],["Independent",1]],
    KP_HS: [["Korean Workers' Party",99],["Independent",1]],
    KP_RY: [["Korean Workers' Party",99],["Independent",1]],
    KP_OT: [["Korean Workers' Party",99],["Independent",1]]
  };

  /* -- Soviet Union — Supreme Soviet 1937 ------------------------------------ */
  G.INT_LANDSCAPES["soviet_1937"] = {
    SU_RS: [["Communist Party (SU)",99],["Independent",1]],
    SU_UK: [["Communist Party (SU)",99],["Independent",1]],
    SU_BE: [["Communist Party (SU)",99],["Independent",1]],
    SU_TR: [["Communist Party (SU)",99],["Independent",1]],
    SU_KZ: [["Communist Party (SU)",99],["Independent",1]],
    SU_OT: [["Communist Party (SU)",99],["Independent",1]]
  };

  /* -- Cuba — National Assembly ---------------------------------------------- */
  G.INT_LANDSCAPES["cuba"] = {
    CU_HAB: [["Communist Party (CU)",99],["Independent",1]],
    CU_OR:  [["Communist Party (CU)",99],["Independent",1]],
    CU_CAM: [["Communist Party (CU)",99],["Independent",1]],
    CU_VIL: [["Communist Party (CU)",99],["Independent",1]],
    CU_MAT: [["Communist Party (CU)",99],["Independent",1]],
    CU_PNR: [["Communist Party (CU)",99],["Independent",1]],
    CU_GRA: [["Communist Party (CU)",99],["Independent",1]]
  };

  /* -- China — National People's Congress ------------------------------------ */
  G.INT_LANDSCAPES["china"] = {
    CN_BJ:  [["Chinese Communist Party",100]],
    CN_SH:  [["Chinese Communist Party",100]],
    CN_NOR: [["Chinese Communist Party",100]],
    CN_HUB: [["Chinese Communist Party",100]],
    CN_GUA: [["Chinese Communist Party",100]],
    CN_NWE: [["Chinese Communist Party",100]],
    CN_CEN: [["Chinese Communist Party",100]],
    CN_SOU: [["Chinese Communist Party",100]],
    CN_OTH: [["Chinese Communist Party",100]]
  };

  /* ==========================================================================
     3 · INTERNATIONAL POLITICIANS
         All tagged scope:"wild" so they appear in Wildcard mode.
         Stats: [appeal, experience, oratory, statecraft, partyMgmt]
         Fits use existing UK portfolio keys (pm, chancellor, foreign, home,
         defence, health, education, trade, justice, leader, culture, environment)
     ========================================================================== */
  var existing = {};
  G.POLITICIANS.forEach(function (p) { existing[p.name + "|" + (p.scope || "uk")] = 1; });

  function I(name, party, era, fits, s, note, extra) {
    extra = extra || {};
    var scope = "wild";
    if (existing[name + "|" + scope]) return;
    existing[name + "|" + scope] = 1;
    var fig = {
      name: name, party: party, era: era, fits: fits,
      stats: { appeal: s[0], experience: s[1], oratory: s[2], statecraft: s[3], partyMgmt: s[4] },
      note: note || "", scope: scope
    };
    if (extra.despot) fig.despot = true;
    if (extra.flag)   fig.flag   = extra.flag;
    if (extra.wiki)   G.PHOTO[name] = { wiki: extra.wiki };
    if (extra.img)    G.PHOTO[name] = Object.assign(G.PHOTO[name] || {}, { img: extra.img });
    G.POLITICIANS.push(fig);
  }

  /* ---- USA — Presidents & Major Figures ------------------------------------ */
  I("George Washington",    "Federalist",       "e0", ["pm","leader","foreign","defence"], [92,88,80,96,90],
    "First President; established the two-term precedent and Cabinet government.",
    { wiki: "George Washington" });
  I("Thomas Jefferson",     "Democrat (USA)",   "e0", ["pm","foreign","culture","education"],[88,84,82,88,72],
    "Third President; author of the Declaration of Independence and Louisiana Purchase architect.",
    { wiki: "Thomas Jefferson" });
  I("Alexander Hamilton",   "Federalist",       "e0", ["chancellor","trade","justice","leader"],[76,78,74,88,68],
    "First Treasury Secretary; founded the national banking system and the Federalist Papers.",
    { wiki: "Alexander Hamilton" });
  I("Abraham Lincoln",      "Republican (USA)", "e1", ["pm","leader","justice","home"],    [90,78,92,94,86],
    "16th President; led the Union in the Civil War and issued the Emancipation Proclamation.",
    { wiki: "Abraham Lincoln" });
  I("Ulysses Grant",        "Republican (USA)", "e1", ["pm","defence","home"],             [68,82,52,70,58],
    "18th President; Commanding General of the Union Army and Reconstruction-era president.",
    { wiki: "Ulysses S. Grant" });
  I("Theodore Roosevelt",   "Bull Moose",       "e2", ["pm","leader","foreign","environment"],[90,80,88,86,74],
    "26th President; trust-buster, conservationist and wielder of the 'Big Stick'.",
    { wiki: "Theodore Roosevelt" });
  I("Woodrow Wilson",       "Democrat (USA)",   "e2", ["pm","foreign","education","leader"],[78,82,84,78,70],
    "28th President; led the USA in WWI and proposed the League of Nations.",
    { wiki: "Woodrow Wilson" });
  I("Franklin D. Roosevelt","Democrat (USA)",   "e3", ["pm","chancellor","leader","home"],  [92,90,90,96,88],
    "32nd President; New Deal architect, led America through Depression and WWII.",
    { wiki: "Franklin D. Roosevelt" });
  I("Harry S. Truman",      "Democrat (USA)",   "e4", ["pm","defence","foreign","leader"],  [80,72,74,82,78],
    "33rd President; ordered the atomic bomb, established NATO and the Marshall Plan.",
    { wiki: "Harry S. Truman" });
  I("Dwight Eisenhower",    "Republican (USA)", "e4", ["pm","defence","foreign","leader"],  [84,92,70,84,80],
    "34th President; Supreme Allied Commander WWII, built the Interstate Highway System.",
    { wiki: "Dwight D. Eisenhower" });
  I("John F. Kennedy",      "Democrat (USA)",   "e4", ["pm","foreign","defence","leader"],  [92,62,94,78,76],
    "35th President; navigated the Cuban Missile Crisis and launched the Space Race.",
    { wiki: "John F. Kennedy" });
  I("Lyndon B. Johnson",    "Democrat (USA)",   "e4", ["pm","home","health","leader"],      [76,88,80,82,92],
    "36th President; Great Society architect, Civil Rights Act, but Vietnam damaged legacy.",
    { wiki: "Lyndon B. Johnson" });
  I("Richard Nixon",        "Republican (USA)", "e5", ["pm","foreign","trade","leader"],    [72,86,66,76,68],
    "37th President; opened China, detente with USSR, then resigned over Watergate.",
    { wiki: "Richard Nixon" });
  I("Jimmy Carter",         "Democrat (USA)",   "e5", ["pm","foreign","environment","leader"],[74,80,70,70,62],
    "39th President; Camp David Accords but dogged by Iran hostage crisis and stagflation.",
    { wiki: "Jimmy Carter" });
  I("Ronald Reagan",        "Republican (USA)", "e5", ["pm","trade","foreign","leader"],    [90,86,92,80,86],
    "40th President; 'Morning in America', tax cuts, arms race victory over USSR.",
    { wiki: "Ronald Reagan" });
  I("George H.W. Bush",     "Republican (USA)", "e5", ["pm","foreign","defence","leader"],  [74,92,66,80,72],
    "41st President; Gulf War coalition builder, presided over Cold War's end.",
    { wiki: "George H. W. Bush" });
  I("Bill Clinton",         "Democrat (USA)",   "e6", ["pm","chancellor","trade","leader"], [88,84,90,80,82],
    "42nd President; presided over economic boom, NAFTA, and welfare reform.",
    { wiki: "Bill Clinton" });
  I("George W. Bush",       "Republican (USA)", "e6", ["pm","home","defence","leader"],     [70,80,66,66,76],
    "43rd President; led post-9/11 wars in Afghanistan and Iraq.",
    { wiki: "George W. Bush" });
  I("Barack Obama",         "Democrat (USA)",   "e7", ["pm","foreign","leader","health"],   [92,74,96,84,80],
    "44th President; first African-American president, Affordable Care Act, Paris Agreement.",
    { wiki: "Barack Obama" });
  I("Donald Trump",         "Republican (USA)", "e7", ["pm","trade","leader"],              [84,72,82,58,74],
    "45th & 47th President; 'America First' outsider who reshaped the Republican Party.",
    { wiki: "Donald Trump" });
  I("Joe Biden",            "Democrat (USA)",   "e7", ["pm","foreign","leader"],            [72,90,64,72,76],
    "46th President; largest infrastructure bill since Eisenhower, withdrew from 2024 race.",
    { wiki: "Joe Biden" });
  I("Hillary Clinton",      "Democrat (USA)",   "e7", ["foreign","pm","leader","justice"],  [78,88,76,82,78],
    "Secretary of State and first woman nominated for president by a major US party.",
    { wiki: "Hillary Clinton" });
  I("Bernie Sanders",       "Democrat (USA)",   "e7", ["pm","health","trade","leader"],     [82,86,84,74,68],
    "Senator from Vermont; democratic socialist who twice nearly won the Democratic nomination.",
    { wiki: "Bernie Sanders" });

  /* ---- Germany — Historical & Modern --------------------------------------- */
  I("Otto von Bismarck",    "DNVP",             "e1", ["pm","foreign","leader","chancellor"],[80,92,74,96,90],
    "Iron Chancellor; unified Germany, master of realpolitik and the Kulturkampf.",
    { wiki: "Otto von Bismarck" });
  I("Paul von Hindenburg",  "DNVP",             "e3", ["pm","defence","leader"],            [72,94,58,62,64],
    "WWI Field Marshal and President who reluctantly appointed Hitler as Chancellor.",
    { wiki: "Paul von Hindenburg" });
  I("Adolf Hitler",         "NSDAP",            "e3", ["pm","leader","culture","home"],     [76,72,90,56,88],
    "Nazi dictator responsible for WWII and the Holocaust; history's ultimate warning.",
    { wiki: "Adolf Hitler", despot: true });
  I("Ernst Thälmann",       "KPD",              "e3", ["pm","leader","home"],               [72,68,80,66,82],
    "KPD leader; murdered at Buchenwald concentration camp in 1944 after 11 years' imprisonment.",
    { wiki: "Ernst Thälmann" });
  I("Rosa Luxemburg",       "SPD",              "e3", ["pm","leader","culture","education"],[80,66,88,78,68],
    "SPD co-founder and Marxist theorist; murdered during the 1919 Spartacist uprising.",
    { wiki: "Rosa Luxemburg" });
  I("Gustav Stresemann",    "DVP",              "e3", ["pm","foreign","chancellor","trade"],[76,82,76,84,72],
    "Weimar Foreign Minister; Nobel Peace Prize winner who stabilised the republic in 1924–29.",
    { wiki: "Gustav Stresemann" });
  I("Heinrich Brüning",     "Zentrum",          "e3", ["pm","chancellor","leader"],         [62,82,68,62,70],
    "Weimar Chancellor 1930–32; his austerity policies deepened the Depression.",
    { wiki: "Heinrich Brüning" });
  I("Konrad Adenauer",      "CDU/CSU",          "e4", ["pm","foreign","leader","chancellor"],[82,90,72,90,84],
    "First Chancellor of West Germany; 'Der Alte' built the Wirtschaftswunder and NATO membership.",
    { wiki: "Konrad Adenauer" });
  I("Willy Brandt",         "SPD",              "e4", ["pm","foreign","leader"],            [86,84,82,84,80],
    "Chancellor and Ostpolitik architect; fell to his knees at the Warsaw Ghetto memorial.",
    { wiki: "Willy Brandt" });
  I("Helmut Schmidt",       "SPD",              "e5", ["pm","chancellor","defence","leader"],[78,90,76,86,78],
    "Chancellor 1974–82; steered West Germany through stagflation and the German Autumn.",
    { wiki: "Helmut Schmidt" });
  I("Helmut Kohl",          "CDU/CSU",          "e5", ["pm","foreign","leader"],            [74,94,66,84,82],
    "'Chancellor of German Unity'; oversaw reunification after the Wall fell in 1989.",
    { wiki: "Helmut Kohl" });
  I("Gerhard Schröder",     "SPD",              "e6", ["pm","trade","leader","chancellor"], [78,82,80,76,80],
    "Chancellor 1998–2005; Agenda 2010 reforms and refused to join the Iraq War.",
    { wiki: "Gerhard Schröder" });
  I("Angela Merkel",        "CDU/CSU",          "e7", ["pm","foreign","leader","trade"],    [84,92,68,90,88],
    "Germany's longest-serving post-war Chancellor; 'Die Kanzlerin' of consensus and stability.",
    { wiki: "Angela Merkel" });
  I("Olaf Scholz",          "SPD",              "e7", ["pm","chancellor","leader"],         [66,80,62,72,74],
    "Chancellor from 2021; SPD leader of a traffic-light coalition in uncertain times.",
    { wiki: "Olaf Scholz" });
  I("Friedrich Merz",       "CDU/CSU",          "e7", ["pm","chancellor","trade","leader"], [68,78,70,70,72],
    "CDU leader from 2022; business-aligned conservative who brought the party back from defeat.",
    { wiki: "Friedrich Merz" });

  /* ---- France --------------------------------------------------------------- */
  I("Napoleon Bonaparte",   "World Leaders",    "e0", ["pm","defence","foreign","leader"],  [86,80,84,90,88],
    "First Consul then Emperor of the French; conquered Europe and reformed its legal codes.",
    { wiki: "Napoleon", despot: true });
  I("Charles de Gaulle",    "Ensemble",         "e4", ["pm","defence","foreign","leader"],  [88,90,84,92,82],
    "Founder of the Fifth Republic; led the Free French in WWII and shaped modern France.",
    { wiki: "Charles de Gaulle" });
  I("Georges Pompidou",     "Ensemble",         "e4", ["pm","culture","trade","chancellor"],[74,82,70,78,72],
    "Gaullist successor who modernised France and backed the Pompidou Centre.",
    { wiki: "Georges Pompidou" });
  I("Valéry Giscard d'Estaing","Les Républicains","e5",["pm","chancellor","foreign","leader"],[76,84,74,78,70],
    "Centrist president who abolished capital punishment and oversaw détente.",
    { wiki: "Valéry Giscard d'Estaing" });
  I("François Mitterrand",  "Parti Socialiste", "e5", ["pm","justice","culture","leader"],  [80,90,80,82,80],
    "Longest-serving Fifth Republic president; Maastricht architect and arts patron.",
    { wiki: "François Mitterrand" });
  I("Jacques Chirac",       "Les Républicains", "e6", ["pm","foreign","trade","leader"],    [76,92,74,76,78],
    "President who blocked the Iraq War; 'Chirac the bulldozer' dominated French politics.",
    { wiki: "Jacques Chirac" });
  I("Nicolas Sarkozy",      "Les Républicains", "e6", ["pm","home","foreign","leader"],     [74,82,78,74,76],
    "Hyperactive president nicknamed 'Sarko'; G20 response to the 2008 financial crisis.",
    { wiki: "Nicolas Sarkozy" });
  I("François Hollande",    "Parti Socialiste", "e7", ["pm","chancellor","trade","leader"], [60,82,66,62,64],
    "Socialist president whose unpopularity led him to decline to seek a second term.",
    { wiki: "François Hollande" });
  I("Emmanuel Macron",      "Ensemble",         "e7", ["pm","chancellor","foreign","leader"],[80,72,80,80,74],
    "Centrist president and former banker; En Marche outsider who rewrote French politics.",
    { wiki: "Emmanuel Macron" });
  I("Marine Le Pen",        "Rassemblement National","e7",["pm","home","leader"],          [76,80,76,64,80],
    "RN leader who normalised the French far-right and twice reached the presidential run-off.",
    { wiki: "Marine Le Pen" });
  I("Jean-Luc Mélenchon",   "La France Insoumise","e7",["pm","trade","health","leader"],   [74,84,80,68,74],
    "LFI founder and three-time presidential candidate; galvanised the French left.",
    { wiki: "Jean-Luc Mélenchon" });

  /* ---- Australia ------------------------------------------------------------ */
  I("John Curtin",          "Australian Labor Party","e3",["pm","defence","trade","leader"],[82,78,78,86,82],
    "Wartime PM; turned to the USA after Singapore fell and saved Australia.",
    { wiki: "John Curtin" });
  I("Ben Chifley",          "Australian Labor Party","e4",["pm","chancellor","trade","leader"],[76,80,72,80,78],
    "Labor PM; 'Light on the Hill' speech, founded Qantas as national carrier.",
    { wiki: "Ben Chifley" });
  I("Robert Menzies",       "Liberal Party",      "e4", ["pm","trade","foreign","leader"],  [78,92,78,80,82],
    "Australia's longest-serving PM; founded the Liberal Party and shaped Cold War Australia.",
    { wiki: "Robert Menzies" });
  I("Gough Whitlam",        "Australian Labor Party","e4",["pm","foreign","health","leader"],[80,78,84,78,72],
    "Reformist PM; Medicare, free universities, withdrawn from Vietnam — dismissed in 1975.",
    { wiki: "Gough Whitlam" });
  I("Malcolm Fraser",       "Liberal Party",      "e5", ["pm","foreign","home","leader"],   [72,82,68,74,74],
    "Liberal PM who dismissed Whitlam and served three terms of cautious conservatism.",
    { wiki: "Malcolm Fraser" });
  I("Bob Hawke",            "Australian Labor Party","e5",["pm","trade","chancellor","leader"],[88,84,88,84,86],
    "Three-term Labor PM; floated the dollar, opened Australia to the world economy.",
    { wiki: "Bob Hawke" });
  I("Paul Keating",         "Australian Labor Party","e5",["pm","chancellor","culture","leader"],[82,84,86,84,78],
    "Treasurer turned PM; 'the recession we had to have' and the Mabo native title ruling.",
    { wiki: "Paul Keating" });
  I("John Howard",          "Liberal Party",      "e6", ["pm","trade","home","leader"],     [76,88,72,80,84],
    "Second longest-serving PM; GST, children overboard and the Tampa affair.",
    { wiki: "John Howard" });
  I("Kevin Rudd",           "Australian Labor Party","e7",["pm","foreign","leader"],        [74,74,74,74,70],
    "PM twice; said sorry to the Stolen Generation and steered Australia through the GFC.",
    { wiki: "Kevin Rudd" });
  I("Julia Gillard",        "Australian Labor Party","e7",["pm","education","leader"],      [74,76,78,76,70],
    "Australia's first female PM; carbon tax, NDIS and the Misogyny Speech.",
    { wiki: "Julia Gillard" });
  I("Tony Abbott",          "Liberal Party",      "e7", ["pm","defence","home","leader"],   [68,74,66,62,72],
    "PM 2013–15; repealed the carbon tax, 'Budget Emergency' and Operation Sovereign Borders.",
    { wiki: "Tony Abbott" });
  I("Scott Morrison",       "Liberal Party",      "e7", ["pm","trade","home","leader"],     [64,72,66,60,70],
    "PM 2018–22; Hawaii trip during the bushfires and slow vaccine rollout.",
    { wiki: "Scott Morrison" });
  I("Anthony Albanese",     "Australian Labor Party","e7",["pm","infrastructure","leader"],  [72,78,74,72,72],
    "Labor PM from 2022; Voice to Parliament referendum and AUKUS partner.",
    { wiki: "Anthony Albanese" });

  /* ---- Canada --------------------------------------------------------------- */
  I("Pierre Trudeau",       "Liberal (CA)",       "e5", ["pm","justice","foreign","leader"], [86,84,84,84,80],
    "PM 1968–79 & 1980–84; Charter of Rights, just society and 'Trudeaumania'.",
    { wiki: "Pierre Trudeau" });
  I("Brian Mulroney",       "Conservative (CA)",  "e5", ["pm","trade","foreign","leader"],   [72,82,74,76,78],
    "PM 1984–93; NAFTA, Meech Lake and acid rain accord with the USA.",
    { wiki: "Brian Mulroney" });
  I("Jean Chrétien",        "Liberal (CA)",       "e6", ["pm","trade","justice","leader"],   [78,90,76,80,84],
    "PM 1993–2003; balanced budgets, rejected Iraq War and Clarity Act on Quebec.",
    { wiki: "Jean Chrétien" });
  I("Paul Martin",          "Liberal (CA)",       "e6", ["pm","chancellor","leader"],        [68,82,66,72,66],
    "Finance Minister turned PM; budget surpluses but minority government ended in scandal.",
    { wiki: "Paul Martin" });
  I("Stephen Harper",       "Conservative (CA)", "e7", ["pm","chancellor","trade","leader"], [68,84,62,74,82],
    "PM 2006–15; tough on crime, oil sands champion and Senate scandal.",
    { wiki: "Stephen Harper" });
  I("Justin Trudeau",       "Liberal (CA)",       "e7", ["pm","culture","foreign","leader"], [80,72,80,68,72],
    "PM 2015–25; legalised cannabis, SNC-Lavalin affair and CERB pandemic response.",
    { wiki: "Justin Trudeau" });
  I("Jack Layton",          "NDP",                "e7", ["pm","health","trade","leader"],    [82,72,82,74,76],
    "NDP leader who took the party to official opposition in 2011 before dying of cancer.",
    { wiki: "Jack Layton" });
  I("Jagmeet Singh",        "NDP",                "e7", ["pm","justice","health","leader"],  [78,64,78,70,72],
    "First non-white NDP leader; supply-and-confidence agreement kept Trudeau government afloat.",
    { wiki: "Jagmeet Singh" });

  /* ---- Japan ---------------------------------------------------------------- */
  I("Yoshida Shigeru",      "LDP",                "e4", ["pm","foreign","trade","leader"],   [74,88,68,82,76],
    "Architect of postwar Japan; led two terms through the Occupation and economic recovery.",
    { wiki: "Yoshida Shigeru" });
  I("Nakasone Yasuhiro",    "LDP",                "e5", ["pm","defence","foreign","leader"], [74,86,74,80,78],
    "PM 1982–87; privatised JNR, NTT and built a 'Ron-Yasu' relationship with Reagan.",
    { wiki: "Nakasone Yasuhiro" });
  I("Koizumi Jun'ichirō",   "LDP",                "e6", ["pm","trade","health","leader"],    [84,78,82,78,80],
    "PM 2001–06; postal privatisation crusader and rock-music fan who loved Elvis.",
    { wiki: "Junichiro Koizumi" });
  I("Shinzo Abe",           "LDP",                "e7", ["pm","defence","foreign","leader"], [76,88,76,78,84],
    "Japan's longest-serving PM; Abenomics, expanded SDF role and assassinated in 2022.",
    { wiki: "Shinzo Abe" });
  I("Fumio Kishida",        "LDP",                "e7", ["pm","foreign","leader"],           [62,76,62,68,66],
    "LDP PM 2021–24; hosted G7 in Hiroshima, doubled defence spending.",
    { wiki: "Fumio Kishida" });
  I("Ishiba Shigeru",       "LDP",                "e7", ["pm","defence","leader"],           [64,78,64,68,64],
    "LDP PM from 2024; defence hawk and advocate for a 'Asian NATO'.",
    { wiki: "Shigeru Ishiba" });

  /* ---- India ---------------------------------------------------------------- */
  I("Jawaharlal Nehru",     "INC",                "e4", ["pm","foreign","education","leader"],[86,84,86,84,80],
    "First PM of India; non-alignment, five-year plans and architect of modern Indian democracy.",
    { wiki: "Jawaharlal Nehru" });
  I("Indira Gandhi",        "INC",                "e5", ["pm","home","foreign","leader"],    [80,82,78,80,82],
    "India's only female PM; nationalised banks, won the 1971 war but imposed Emergency rule.",
    { wiki: "Indira Gandhi" });
  I("Rajiv Gandhi",         "INC",                "e5", ["pm","trade","technology","leader"],[76,72,76,72,72],
    "PM 1984–89; liberalised economy, computer revolution and Sri Lanka intervention.",
    { wiki: "Rajiv Gandhi" });
  I("P.V. Narasimha Rao",   "INC",                "e5", ["pm","chancellor","foreign","leader"],[68,88,66,82,74],
    "PM 1991–96; opened India's economy with Manmohan Singh; Narsimha Rao's quiet revolution.",
    { wiki: "P. V. Narasimha Rao" });
  I("Atal Bihari Vajpayee", "BJP",                "e6", ["pm","foreign","leader","culture"], [82,88,84,80,80],
    "BJP's first full-term PM; nuclear tests, Kargil War and poet of national unity.",
    { wiki: "Atal Bihari Vajpayee" });
  I("Manmohan Singh",       "INC",                "e7", ["pm","chancellor","trade","leader"],[74,92,62,86,70],
    "Architect of 1991 reforms, then PM 2004–14; a technocrat undone by coalition dynamics.",
    { wiki: "Manmohan Singh" });
  I("Narendra Modi",        "BJP",                "e7", ["pm","trade","home","leader"],      [84,78,82,80,90],
    "PM from 2014; BJP nationalist, demonetisation and India's global rise.",
    { wiki: "Narendra Modi" });
  I("Rahul Gandhi",         "INC",                "e7", ["pm","leader","education"],         [68,68,70,62,64],
    "INC president and son of Rajiv; finally won back credibility as opposition leader in 2024.",
    { wiki: "Rahul Gandhi" });

  /* ---- Soviet Union / Russia ------------------------------------------------ */
  I("Vladimir Lenin",       "Communist Party (SU)","e3",["pm","leader","chancellor","foreign"],[84,72,88,82,86],
    "Bolshevik leader, October Revolution architect and founder of the Soviet state.",
    { wiki: "Vladimir Lenin" });
  I("Leon Trotsky",         "Communist Party (SU)","e3",["defence","foreign","leader"],      [82,72,84,78,66],
    "Red Army founder; lost to Stalin and was assassinated in Mexico in 1940.",
    { wiki: "Leon Trotsky" });
  I("Joseph Stalin",        "Communist Party (SU)","e3",["pm","home","leader","defence"],    [72,86,66,80,96],
    "Soviet General Secretary; modernised and industrialised the USSR through terror and famine.",
    { wiki: "Joseph Stalin", despot: true });
  I("Nikita Khrushchev",    "Communist Party (SU)","e4",["pm","leader","foreign","defence"], [74,80,78,74,80],
    "Soviet leader; de-Stalinisation, Sputnik, Cuban Missile Crisis and 'We will bury you'.",
    { wiki: "Nikita Khrushchev" });
  I("Leonid Brezhnev",      "Communist Party (SU)","e4",["pm","defence","leader"],           [66,88,58,68,84],
    "Soviet leader 1964–82; détente, Prague Spring and the stagnation era.",
    { wiki: "Leonid Brezhnev" });
  I("Mikhail Gorbachev",    "Communist Party (SU)","e5",["pm","foreign","leader"],           [78,82,82,80,66],
    "Last Soviet leader; glasnost, perestroika and accidentally ended the Cold War.",
    { wiki: "Mikhail Gorbachev" });
  I("Vladimir Putin",       "World Leaders",       "e7",["pm","foreign","home","leader"],    [74,92,70,76,92],
    "Russian President from 2000; rebuilt state power and invaded Ukraine in 2022.",
    { wiki: "Vladimir Putin", despot: true });

  /* ---- North Korea ---------------------------------------------------------- */
  I("Kim Il-sung",          "Korean Workers' Party","e4",["pm","leader","defence","home"],   [72,88,70,66,96],
    "Founding Supreme Leader of North Korea; built the Juche ideology and the cult of personality.",
    { wiki: "Kim Il-sung", despot: true });
  I("Kim Jong-il",          "Korean Workers' Party","e6",["pm","leader","culture","defence"],[62,82,58,62,90],
    "Second Supreme Leader; expanded nuclear programme and was a noted cinephile.",
    { wiki: "Kim Jong-il", despot: true });
  I("Kim Jong-un",          "Korean Workers' Party","e7",["pm","leader","defence","foreign"],[64,72,60,60,88],
    "Third Supreme Leader from 2011; tested ICBMs, met Trump and purged rivals.",
    { wiki: "Kim Jong-un", despot: true });

  /* ---- Cuba ----------------------------------------------------------------- */
  I("Fidel Castro",         "Communist Party (CU)","e4",["pm","foreign","defence","leader"], [80,82,88,74,88],
    "Cuban revolutionary leader; 50-year ruler, Bay of Pigs defier and Cold War lightning rod.",
    { wiki: "Fidel Castro", despot: true });
  I("Raúl Castro",          "Communist Party (CU)","e7",["pm","defence","trade","leader"],   [62,84,54,66,80],
    "Fidel's brother and successor; opened economic reforms and restored US diplomatic ties.",
    { wiki: "Raúl Castro" });
  I("Che Guevara",          "Revolutionaries",     "e4",["defence","foreign","leader","health"],[82,62,80,68,70],
    "Argentine revolutionary and guerrilla icon; motorcycle diaries author, died in Bolivia 1967.",
    { wiki: "Che Guevara" });

  /* ---- China ---------------------------------------------------------------- */
  I("Mao Zedong",           "Chinese Communist Party","e4",["pm","leader","defence","culture"],[78,80,80,70,90],
    "Founder of the PRC; Long March survivor, Great Leap Forward and Cultural Revolution.",
    { wiki: "Mao Zedong", despot: true });
  I("Deng Xiaoping",        "Chinese Communist Party","e5",["pm","trade","chancellor","leader"],[76,88,66,88,84],
    "Paramount Leader; 'Socialism with Chinese characteristics' and the economic opening.",
    { wiki: "Deng Xiaoping" });
  I("Jiang Zemin",          "Chinese Communist Party","e6",["pm","foreign","trade","leader"], [66,84,60,76,82],
    "CPC General Secretary; presided over China's WTO entry and Hong Kong handover.",
    { wiki: "Jiang Zemin" });
  I("Hu Jintao",            "Chinese Communist Party","e7",["pm","foreign","leader","trade"], [60,82,56,70,80],
    "CPC General Secretary 2002–12; 'Harmonious Society' and China's Olympic decade.",
    { wiki: "Hu Jintao" });
  I("Xi Jinping",           "Chinese Communist Party","e7",["pm","leader","foreign","defence"],[74,82,68,76,94],
    "CPC General Secretary from 2012; removed term limits, Belt & Road and Zero Covid.",
    { wiki: "Xi Jinping", despot: true });

  /* ---- Other Despots & Historical Leaders ---------------------------------- */
  I("Benito Mussolini",     "Dictators",          "e3", ["pm","leader","home","culture"],    [72,72,82,56,84],
    "Italian Fascist Duce; invented modern fascism, partnered with Hitler and was lynched in 1945.",
    { wiki: "Benito Mussolini", despot: true });
  I("Francisco Franco",     "Dictators",          "e3", ["pm","defence","home","leader"],    [62,82,56,66,82],
    "Spanish Caudillo; won the Civil War with Axis help and ruled Spain until 1975.",
    { wiki: "Francisco Franco", despot: true });
  I("António de Oliveira Salazar","Dictators",    "e3", ["pm","chancellor","home","leader"], [58,84,58,70,82],
    "Portuguese dictator 1932–68; Estado Novo regime, longest-surviving European fascism.",
    { wiki: "António de Oliveira Salazar", despot: true });
  I("Muammar Gaddafi",      "Dictators",          "e5", ["pm","leader","foreign","defence"], [70,74,72,52,78],
    "Libyan Colonel; the Green Book, oil wealth nationalism and State-sponsored terrorism.",
    { wiki: "Muammar Gaddafi", despot: true });
  I("Hugo Chávez",          "Revolutionaries",    "e7", ["pm","foreign","health","leader"],  [80,74,86,68,80],
    "Venezuelan socialist president; Bolivarian Revolution, petrodollar social programmes.",
    { wiki: "Hugo Chávez" });
  I("Nelson Mandela",       "World Leaders",      "e6", ["pm","justice","foreign","leader"], [96,80,88,90,84],
    "First post-apartheid President of South Africa; 27 years imprisoned, then reconciliation.",
    { wiki: "Nelson Mandela" });
  I("Lula da Silva",        "Revolutionaries",    "e7", ["pm","trade","health","leader"],    [82,80,82,78,80],
    "Brazilian president twice over; PT founder, Bolsa Família and 2022 comeback.",
    { wiki: "Luiz Inácio Lula da Silva" });
  I("Lee Kuan Yew",         "World Leaders",      "e5", ["pm","trade","foreign","education"],[80,90,76,92,90],
    "Singapore's founding PM; built one of the world's wealthiest states from a city with no resources.",
    { wiki: "Lee Kuan Yew" });
  I("Volodymyr Zelensky",   "World Leaders",      "e7", ["pm","defence","foreign","leader"], [86,62,88,80,78],
    "Ukraine's president; TV comedian turned wartime leader who rallied the world against Russia.",
    { wiki: "Volodymyr Zelensky" });

})();

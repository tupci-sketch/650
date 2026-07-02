/* =============================================================================
   650 — PARTY FIX
   1. Reassigns international politicians from generic catch-all labels
      ("World Leaders", "Dictators", "US Republican", "US Democrat") to their
      proper country-specific parties.
   2. Normalises variant party names to canonical parties so politicians
      from the same tradition share a dynasty lineage (e.g. RPR / UMP / Gaulliste
      all merge into "Gaullist" lineage).
   Loaded last among data files (after data.politicians5.js, before scenarios.js).
   ============================================================================= */
window.G = window.G || {};

(function () {
  var G = window.G;

  /* ── 1. Register any extra parties needed by the patches ─────────────────── */
  function reg(label, lineage, colour, align, cap) {
    if (!G.PARTIES[label]) G.PARTIES[label] = { label: label, lineage: lineage, colour: colour, cap: cap || 2980 };
    if (G.PARTY_ALIGN  && !(label   in G.PARTY_ALIGN))  G.PARTY_ALIGN[label]   = align || 0;
    if (G.LINEAGE_ALIGN && !(lineage in G.LINEAGE_ALIGN)) G.LINEAGE_ALIGN[lineage] = align || 0;
  }

  /* Canonical cross-era parties for lineage grouping */
  reg("Gaullist",          "Gaullist",    "#003189",  0.7, 577);
  reg("Gaulliste (FR)",    "Gaullist",    "#003189",  0.7, 577);
  reg("Radical (FR)",      "RadicalFR",   "#c0392b", -0.2, 577);
  reg("United Russia",     "UnitedRU",    "#0b3d91",  1.5, 450);
  reg("Russia (RU)",       "RusPost",     "#4a90d9", -0.2, 450);

  /* India — (IN)-suffix party labels used in data.politicians*.js */
  reg("Janata Dal (IN)",   "janatal_in",  "#ff6f00",  0.1, 543);
  reg("Janata Party (IN)", "janata_in",   "#ff8f00",  0.5, 543);
  reg("JDU (IN)",          "janatal_in",  "#ff6f00",  0.3, 543);
  reg("Lok Dal (IN)",      "janatal_in",  "#ff9800",  0.2, 543);
  reg("SP (IN)",           "SP_IN",       "#cc0000", -0.5, 543);
  reg("TMC (IN)",          "AITC",        "#2196f3", -0.5, 543);
  reg("BSP (IN)",          "BSP_IN",      "#0d47a1", -0.8, 543);
  reg("NCP (IN)",          "NCP_IN",      "#4caf50",  0.0, 543);
  reg("RJD (IN)",          "rjd_in",      "#c62828", -0.5, 543);
  reg("CPI(M) (IN)",       "cpim_in",     "#b71c1c", -1.2, 543);
  reg("AAP (IN)",          "AAP_IN",      "#0057a8", -0.5, 543);
  reg("AIADMK (IN)",       "AIADMK_IN",   "#ff9800",  0.8, 543);
  reg("DMK (IN)",          "DMK_IN",      "#cc0000", -0.5, 543);
  reg("TDP (IN)",          "TDP_IN",      "#ffeb3b",  0.5, 543);
  reg("YSRCP (IN)",        "YSRCP_IN",    "#1565c0",  0.5, 543);
  reg("BJD (IN)",          "BJD_IN",      "#009688",  0.3, 543);
  reg("BRS (IN)",          "BRS_IN",      "#ff6d00",  0.5, 543);
  reg("Shiv Sena (IN)",    "ShivSena_IN", "#ff6f00",  1.0, 543);
  reg("NC (IN)",           "NC_IN",       "#1a237e", -0.3, 543);
  reg("JMM (IN)",          "JMM_IN",      "#4caf50", -0.3, 543);
  reg("SCOF (IN)",         "SCOF_IN",     "#1a237e", -0.8, 543);
  reg("Kuomintang",        "KMT",         "#000095",  0.8, 225);
  reg("PNF",               "PNF",         "#8b1a1a",  2.0, 535);

  /* Make RPR, UMP, LREM, Ensemble share the same "Gaullist" lineage so
     Gaullists across eras all fall in one dynasty pool */
  var GAULLIST_MERGE = ["RPR", "UMP", "LREM", "Ensemble", "Gaulliste (FR)"];
  GAULLIST_MERGE.forEach(function (lbl) {
    if (G.PARTIES[lbl]) G.PARTIES[lbl].lineage = "Gaullist";
  });

  /* Merge all SPD variant labels into a single "SPD_DE" lineage */
  var SPD_MERGE = ["SPD (DE)", "SPD_MOD"];
  SPD_MERGE.forEach(function (lbl) {
    if (G.PARTIES[lbl]) G.PARTIES[lbl].lineage = "SPD_DE";
  });

  /* Merge CPSU / United Russia under a single "CPSU" lineage (Soviet era only;
     United Russia used post-1991 only — the eras separation handles the split) */
  if (G.PARTIES["CPSU"]) G.PARTIES["CPSU"].lineage = "CPSU";

  /* Merge the "CCP" party label into the "CPC" lineage so all Chinese Communist
     figures form one dynasty (some data files label it "CCP", others
     "Chinese Communist Party" — same party, 中国共产党) */
  if (G.PARTIES["CCP"]) G.PARTIES["CCP"].lineage = "CPC";

  /* Normalise French historical lineage keys left by earlier files */
  if (G.PARTIES["SFIO (FR)"]) G.PARTIES["SFIO (FR)"].lineage = "SFIO";
  if (G.PARTIES["MRP (FR)"])  G.PARTIES["MRP (FR)"].lineage  = "MRP";

  /* Consolidate Australian Liberal variants into one lineage */
  if (G.PARTIES["Liberal (AU)"]) G.PARTIES["Liberal (AU)"].lineage = "LibAU";
  if (G.PARTIES["National (AU)"]) G.PARTIES["National (AU)"].lineage = "NatAU";

  /* Ensure US Democrat / Republican have canonical registrations */
  if (!G.PARTIES["Democrat (USA)"])
    G.PARTIES["Democrat (USA)"] = { label: "Democrat (USA)", lineage: "USDem", colour: "#1a4380", cap: 435 };
  if (!G.PARTIES["Republican (USA)"])
    G.PARTIES["Republican (USA)"] = { label: "Republican (USA)", lineage: "USRep", colour: "#cf2a27", cap: 435 };

  /* ── 2. PARTY_COUNTRY: add entries for new / variant labels ─────────────── */
  if (G.PARTY_COUNTRY) {
    G.PARTY_COUNTRY["Gaullist"]          = "FR";
    G.PARTY_COUNTRY["Gaulliste (FR)"]    = "FR";
    G.PARTY_COUNTRY["Radical (FR)"]      = "FR";
    G.PARTY_COUNTRY["RPR"]               = "FR";
    G.PARTY_COUNTRY["UMP"]               = "FR";
    G.PARTY_COUNTRY["LREM"]              = "FR";
    G.PARTY_COUNTRY["PS (FR)"]           = "FR";
    G.PARTY_COUNTRY["CDU"]               = "DE";
    G.PARTY_COUNTRY["SPD (DE)"]          = "DE";
    G.PARTY_COUNTRY["SPD_MOD"]           = "DE";
    G.PARTY_COUNTRY["United Russia"]     = "SU";
    G.PARTY_COUNTRY["CPSU"]              = "SU";
    G.PARTY_COUNTRY["Kuomintang"]        = "CN";
    G.PARTY_COUNTRY["PNF"]               = "IT";
    /* Old wildcard group names also map to their home country */
    G.PARTY_COUNTRY["US Republican"]     = "US";
    G.PARTY_COUNTRY["US Democrat"]       = "US";
    /* Australian label variants */
    G.PARTY_COUNTRY["Australian Labor"]       = "AU";
    G.PARTY_COUNTRY["Liberal (AU)"]           = "AU";
    G.PARTY_COUNTRY["National (AU)"]          = "AU";
    G.PARTY_COUNTRY["ALP (AU)"]               = "AU";
    G.PARTY_COUNTRY["Liberal Party"]          = "AU";
    G.PARTY_COUNTRY["National Party"]         = "AU";
    G.PARTY_COUNTRY["Labor (AU)"]             = "AU";
    G.PARTY_COUNTRY["Australian Labor Party"] = "AU";
    /* French label variants */
    G.PARTY_COUNTRY["SFIO (FR)"]         = "FR";
    G.PARTY_COUNTRY["MRP (FR)"]          = "FR";
    G.PARTY_COUNTRY["Gaulliste (FR)"]    = "FR";
    /* Germany — canonical labels without (DE) suffix lack heuristic detection */
    G.PARTY_COUNTRY["CDU/CSU"]           = "DE";
    G.PARTY_COUNTRY["SPD"]               = "DE";
    G.PARTY_COUNTRY["AfD"]               = "DE";
    G.PARTY_COUNTRY["FDP"]               = "DE";
    G.PARTY_COUNTRY["Die Linke"]         = "DE";
    G.PARTY_COUNTRY["BSW"]               = "DE";
    G.PARTY_COUNTRY["NSDAP"]             = "DE";
    G.PARTY_COUNTRY["KPD"]               = "DE";
    G.PARTY_COUNTRY["Zentrum"]           = "DE";
    G.PARTY_COUNTRY["DNVP"]              = "DE";
    G.PARTY_COUNTRY["BVP"]               = "DE";
    G.PARTY_COUNTRY["DVP"]               = "DE";
    G.PARTY_COUNTRY["DDP"]               = "DE";
    G.PARTY_COUNTRY["DVP"]               = "DE";
    G.PARTY_COUNTRY["DDP (DE)"]          = "DE";
    G.PARTY_COUNTRY["DVP (DE)"]          = "DE";
    G.PARTY_COUNTRY["CSU (DE)"]          = "DE";
    G.PARTY_COUNTRY["Greens (DE)"]       = "DE";
    /* Japan */
    G.PARTY_COUNTRY["LDP"]               = "JP";
    G.PARTY_COUNTRY["Komeito"]           = "JP";
    G.PARTY_COUNTRY["Nippon Ishin"]      = "JP";
    G.PARTY_COUNTRY["CDP (JP)"]          = "JP";
    /* India — bare labels (no suffix) that win the dedup race from earlier data files */
    G.PARTY_COUNTRY["INC"]               = "IN";
    G.PARTY_COUNTRY["BJP"]               = "IN";
    G.PARTY_COUNTRY["BSP"]               = "IN";
    G.PARTY_COUNTRY["AAP"]               = "IN";
    G.PARTY_COUNTRY["RJD"]               = "IN";
    G.PARTY_COUNTRY["NCP"]               = "IN";
    G.PARTY_COUNTRY["AITC"]              = "IN";
    G.PARTY_COUNTRY["Samajwadi Party"]   = "IN";
    G.PARTY_COUNTRY["Samajwadi"]         = "IN";
    /* China */
    G.PARTY_COUNTRY["Chinese Communist Party"] = "CN";
    /* Soviet / Russia */
    G.PARTY_COUNTRY["United Russia"]     = "SU";
    G.PARTY_COUNTRY["Russia (RU)"]       = "SU";
    /* Canada */
    G.PARTY_COUNTRY["Liberal (CA)"]      = "CA";
    G.PARTY_COUNTRY["Conservative (CA)"] = "CA";
    G.PARTY_COUNTRY["NDP"]               = "CA";
    G.PARTY_COUNTRY["Bloc Québécois"]    = "CA";
    G.PARTY_COUNTRY["Green (CA)"]        = "CA";
  }

  /* ── 3. Patch politicians with generic catch-all parties ─────────────────── */
  var GENERIC = {
    "World Leaders": 1, "Dictators": 1, "Revolutionaries": 1,
    "US Republican": 1, "US Democrat": 1
  };

  /* Name → canonical country-specific party */
  var REASSIGN = {
    /* USA */
    "Abraham Lincoln":        "Republican (USA)",
    "Theodore Roosevelt":     "Republican (USA)",
    "Dwight Eisenhower":      "Republican (USA)",
    "Richard Nixon":          "Republican (USA)",
    "Ronald Reagan":          "Republican (USA)",
    "George H. W. Bush":      "Republican (USA)",
    "George W. Bush":         "Republican (USA)",
    "Donald Trump":           "Republican (USA)",
    "Arnold Schwarzenegger":  "Republican (USA)",
    "Martin Luther King Jr.": "Democrat (USA)",
    "Franklin D. Roosevelt":  "Democrat (USA)",
    "John F. Kennedy":        "Democrat (USA)",
    "Lyndon B. Johnson":      "Democrat (USA)",
    "Bill Clinton":           "Democrat (USA)",
    "Barack Obama":           "Democrat (USA)",
    "Joe Biden":              "Democrat (USA)",

    /* Germany — CDU/CSU */
    "Konrad Adenauer":        "CDU/CSU",
    "Helmut Kohl":            "CDU/CSU",
    "Angela Merkel":          "CDU/CSU",
    /* Germany — SPD */
    "Helmut Schmidt":         "SPD",
    "Gerhard Schröder":       "SPD",
    "Olaf Scholz":            "SPD",
    /* Germany — NSDAP */
    "Adolf Hitler":           "NSDAP",
    "Joseph Goebbels":        "NSDAP",
    "Heinrich Himmler":       "NSDAP",
    "Hermann Göring":         "NSDAP",
    "Reinhard Heydrich":      "NSDAP",

    /* France */
    "Charles de Gaulle":      "Gaullist",
    "Georges Pompidou":       "Gaullist",
    "Jacques Chirac":         "Gaullist",
    "Nicolas Sarkozy":        "Gaullist",
    "Emmanuel Macron":        "Ensemble",
    "Georges Clemenceau":     "Radical (FR)",
    "Léon Blum":              "Parti Socialiste",

    /* India */
    "Narendra Modi":          "BJP",
    "Mahatma Gandhi":         "INC",
    "Manmohan Singh":         "INC",

    /* Soviet Union / Russia */
    "Joseph Stalin":          "Communist Party (SU)",
    "Nikita Khrushchev":      "Communist Party (SU)",
    "Leonid Brezhnev":        "Communist Party (SU)",
    "Vladimir Putin":         "United Russia",
    "Boris Yeltsin":          "United Russia",
    "Catherine the Great":    "Communist Party (SU)",
    "Peter the Great":        "Communist Party (SU)",

    /* China */
    "Mao Zedong":             "Chinese Communist Party",
    "Deng Xiaoping":          "Chinese Communist Party",
    "Zhou Enlai":             "Chinese Communist Party",
    "Sun Yat-sen":            "Kuomintang",
    "Chiang Kai-shek":        "Kuomintang",

    /* Cuba */
    "Fidel Castro":           "Communist Party (CU)",
    "Che Guevara":            "Communist Party (CU)",

    /* North Korea */
    "Kim Jong-un":            "Korean Workers' Party",
    "Kim Il-sung":            "Korean Workers' Party",

    /* Japan */
    "Hirohito":               "LDP"
  };

  /* ── 4. Normalise non-generic variant party labels ───────────────────────── */
  /* Merge variant parties into the canonical version that shares a lineage.
     Applied to wild-scope politicians regardless of their current party. */
  var NORMALIZE = {
    /* Germany — unregistered (DE)-suffix variants → canonical labels */
    "SPD (DE)":               "SPD",
    "CDU":                    "CDU/CSU",
    "CDU (DE)":               "CDU/CSU",
    "AfD (DE)":               "AfD",
    "FDP (DE)":               "FDP",
    "BSW (DE)":               "BSW",
    "Die Linke (DE)":         "Die Linke",
    "Green (DE)":             "Greens (DE)",
    /* France */
    "RPR":                    "Gaullist",
    "RPR (FR)":               "Gaullist",
    "UMP":                    "Gaullist",
    "UMP (FR)":               "Gaullist",
    "LR (FR)":                "Les Républicains",
    "RN (FR)":                "Rassemblement National",
    "Gaulliste (FR)":         "Gaullist",
    "PS (FR)":                "Parti Socialiste",
    "LREM":                   "Ensemble",
    /* Japan */
    "LDP (JP)":               "LDP",
    "DPJ":                    "DPJ (JP)",
    /* India */
    "INC (IN)":               "INC",
    "Congress (IN)":          "INC",
    "BJP (IN)":               "BJP",
    "AITC (IN)":              "AITC",
    /* Soviet / Russia */
    "CPSU":                   "Communist Party (SU)",
    "CPSU (RU)":              "Communist Party (SU)",
    /* China */
    "CPC (CN)":               "Chinese Communist Party",
    "Kuomintang (CN)":        "Kuomintang",
    "Chinese Nationalist Party (CN)": "Kuomintang",
    /* Cuba */
    "PCC (CU)":               "Communist Party (CU)",
    /* Canada */
    "PC (CA)":                "Conservative (CA)",
    "CPC (CA)":               "Conservative (CA)",
    /* USA — fold remaining variants into canonical labels */
    "Democratic (US)":        "Democrat (USA)",
    "Democrat":               "Democrat (USA)",
    "Republican (US)":        "Republican (USA)",
    "Republican":             "Republican (USA)",
    "Whig(USA)":              "Whig (USA)",
    /* Australia — fold label variants */
    "ALP (AU)":               "Australian Labor Party",
    "Australian Labor":       "Australian Labor Party",
    "Labor (AU)":             "Australian Labor Party",
    "National (AU)":          "National Party",
    "Liberal Party":          "Liberal Party",
    /* Germany — (DE)-suffix variants used in historical data files */
    "DDP (DE)":               "DDP",
    "DVP (DE)":               "DVP",
    "CSU (DE)":               "CDU/CSU"
  };

  var patched = 0;
  var normalized = 0;

  G.POLITICIANS.forEach(function (p) {
    if (p.scope !== "wild") return;

    /* 3: patch generic-party politicians */
    if (GENERIC[p.party]) {
      var np = REASSIGN[p.name];
      if (np && G.PARTIES[np]) { p.party = np; patched++; return; }
    }

    /* 4: normalise variant party labels */
    var cn = NORMALIZE[p.party];
    if (cn && G.PARTIES[cn]) { p.party = cn; normalized++; }
  });

  /* Also patch non-wild politicians who slipped into the wrong party */
  G.POLITICIANS.forEach(function (p) {
    if (p.scope === "wild") return;  /* already handled */
  });

  if (typeof console !== "undefined" && console.log) {
    console.log("[party_fix] patched=" + patched + " normalised=" + normalized);
  }

  /* ── 5. LINEAGE_PARTY display names for dynasty chips ───────────────────── */
  if (G.LINEAGE_PARTY) {
    /* France */
    G.LINEAGE_PARTY["Gaullist"]   = "Gaullists";
    G.LINEAGE_PARTY["RadicalFR"]  = "Radical Party";
    G.LINEAGE_PARTY["PS_FR"]      = "Parti Socialiste";
    G.LINEAGE_PARTY["LR"]         = "Les Républicains";
    G.LINEAGE_PARTY["RN"]         = "Rassemblement National";
    G.LINEAGE_PARTY["LFI"]        = "La France Insoumise";
    G.LINEAGE_PARTY["SFIO"]       = "SFIO";
    G.LINEAGE_PARTY["MRP"]        = "MRP";
    G.LINEAGE_PARTY["PCF"]        = "Parti Communiste";
    G.LINEAGE_PARTY["NUPES"]      = "NUPES";
    G.LINEAGE_PARTY["Macron"]     = "En Marche / Ensemble";
    /* Germany */
    G.LINEAGE_PARTY["CDU"]        = "CDU/CSU";
    G.LINEAGE_PARTY["SPD_DE"]     = "SPD";
    G.LINEAGE_PARTY["GreenDE"]    = "Greens";
    G.LINEAGE_PARTY["FDP"]        = "FDP";
    G.LINEAGE_PARTY["AfD"]        = "AfD";
    G.LINEAGE_PARTY["Linke"]      = "Die Linke";
    G.LINEAGE_PARTY["BSW"]        = "BSW";
    G.LINEAGE_PARTY["NSDAP"]      = "NSDAP";
    G.LINEAGE_PARTY["KPD"]        = "KPD";
    G.LINEAGE_PARTY["Zentrum"]    = "Centre Party";
    G.LINEAGE_PARTY["DNVP"]       = "DNVP";
    G.LINEAGE_PARTY["BVP"]        = "BVP";
    G.LINEAGE_PARTY["DVP"]        = "DVP";
    G.LINEAGE_PARTY["DDP"]        = "DDP";
    G.LINEAGE_PARTY["SED_DE"]     = "SED";
    /* Australia */
    G.LINEAGE_PARTY["ALP"]        = "Australian Labor";
    G.LINEAGE_PARTY["LibAU"]      = "Liberal Party";
    G.LINEAGE_PARTY["Lib_AU"]     = "Liberal Party";
    G.LINEAGE_PARTY["NatAU"]      = "Nationals";
    G.LINEAGE_PARTY["Nat_AU"]     = "Nationals";
    G.LINEAGE_PARTY["NatAU2"]     = "Nationals";
    G.LINEAGE_PARTY["GreenAU"]    = "Australian Greens";
    G.LINEAGE_PARTY["TealAU"]     = "Teal Independents";
    G.LINEAGE_PARTY["country_au"] = "Country Party";
    /* Canada */
    G.LINEAGE_PARTY["LibCA"]      = "Liberals";
    G.LINEAGE_PARTY["ConCA"]      = "Conservatives";
    G.LINEAGE_PARTY["NDP"]        = "NDP";
    G.LINEAGE_PARTY["BQ"]         = "Bloc Québécois";
    /* USA */
    G.LINEAGE_PARTY["USDem"]      = "Democrats";
    G.LINEAGE_PARTY["USRep"]      = "Republicans";
    G.LINEAGE_PARTY["Federalist"] = "Federalists";
    G.LINEAGE_PARTY["WhigUSA"]    = "Whigs";
    G.LINEAGE_PARTY["Whig_US"]    = "Whigs";
    G.LINEAGE_PARTY["BullMoose"]  = "Bull Moose";
    G.LINEAGE_PARTY["DemSouth"]   = "Southern Democrats";
    G.LINEAGE_PARTY["ConstUnion"] = "Constitutional Union";
    G.LINEAGE_PARTY["DemRep"]     = "Democratic-Republicans";
    G.LINEAGE_PARTY["Prog_US"]    = "Progressives";
    G.LINEAGE_PARTY["ProgressUS"] = "Progressives";
    G.LINEAGE_PARTY["Pop_USA"]    = "Populists";
    G.LINEAGE_PARTY["Soc_USA"]    = "Socialists";
    G.LINEAGE_PARTY["Ref_USA"]    = "Reform Party";
    G.LINEAGE_PARTY["Lib_USA"]    = "Libertarians";
    G.LINEAGE_PARTY["DSA_USA"]    = "Democratic Socialists";
    G.LINEAGE_PARTY["AI_USA"]     = "American Independent";
    G.LINEAGE_PARTY["Grn_USA"]    = "Green Party";
    G.LINEAGE_PARTY["KnowNothing"]= "Know-Nothings";
    /* Japan */
    G.LINEAGE_PARTY["LDP"]        = "Liberal Democratic Party";
    G.LINEAGE_PARTY["CDP_JP"]     = "Constitutional Democratic Party";
    G.LINEAGE_PARTY["Komeito"]    = "Komeito";
    G.LINEAGE_PARTY["Ishin"]      = "Nippon Ishin";
    G.LINEAGE_PARTY["DPJ"]        = "DPJ";
    G.LINEAGE_PARTY["DPJ_JP"]     = "DPJ";
    G.LINEAGE_PARTY["JSP_JP"]     = "Japan Socialist Party";
    G.LINEAGE_PARTY["jsp_jp"]     = "Japan Socialist Party";
    G.LINEAGE_PARTY["taisei_jp"]  = "Imperial Rule Assistance";
    G.LINEAGE_PARTY["seiyukai_jp"]= "Seiyukai";
    G.LINEAGE_PARTY["minseito_jp"]= "Minseito";
    /* India */
    G.LINEAGE_PARTY["BJP"]        = "BJP";
    G.LINEAGE_PARTY["INC"]        = "Congress";
    G.LINEAGE_PARTY["SP_IN"]      = "Samajwadi Party";
    G.LINEAGE_PARTY["AITC"]       = "All India Trinamool";
    G.LINEAGE_PARTY["TMC_IN"]     = "Trinamool Congress";
    G.LINEAGE_PARTY["BSP_IN"]     = "BSP";
    G.LINEAGE_PARTY["NCP_IN"]     = "NCP";
    G.LINEAGE_PARTY["janata_in"]   = "Janata Party";
    G.LINEAGE_PARTY["janatal_in"]  = "Janata Dal";
    G.LINEAGE_PARTY["cpim_in"]     = "CPI(M)";
    G.LINEAGE_PARTY["rjd_in"]      = "RJD";
    G.LINEAGE_PARTY["AAP_IN"]      = "Aam Aadmi Party";
    G.LINEAGE_PARTY["AIADMK_IN"]   = "AIADMK";
    G.LINEAGE_PARTY["DMK_IN"]      = "DMK";
    G.LINEAGE_PARTY["TDP_IN"]      = "Telugu Desam";
    G.LINEAGE_PARTY["YSRCP_IN"]    = "YSR Congress";
    G.LINEAGE_PARTY["BJD_IN"]      = "BJD";
    G.LINEAGE_PARTY["BRS_IN"]      = "BRS";
    G.LINEAGE_PARTY["ShivSena_IN"] = "Shiv Sena";
    G.LINEAGE_PARTY["NC_IN"]       = "National Conference";
    G.LINEAGE_PARTY["JMM_IN"]      = "JMM";
    G.LINEAGE_PARTY["SCOF_IN"]     = "Sched. Castes Federation";
    /* Soviet / Russia */
    G.LINEAGE_PARTY["CPSU"]       = "Communist Party";
    G.LINEAGE_PARTY["UnitedRU"]   = "United Russia";
    G.LINEAGE_PARTY["rsdlp_su"]   = "RSDLP";
    G.LINEAGE_PARTY["bolshevik_su"] = "Bolsheviks";
    G.LINEAGE_PARTY["RusPost"]    = "Post-Soviet Russia";
    /* China */
    G.LINEAGE_PARTY["CPC"]        = "Chinese Communist Party";
    G.LINEAGE_PARTY["KMT"]        = "Kuomintang";
    /* North Korea */
    G.LINEAGE_PARTY["KWP"]        = "Korean Workers' Party";
    /* Cuba */
    G.LINEAGE_PARTY["PCC"]        = "Communist Party";
    /* China — fallback if not fully normalized */
    G.LINEAGE_PARTY["kmt_cn"]     = "Kuomintang";
    G.LINEAGE_PARTY["kmt2_cn"]    = "Kuomintang";
    /* Canada historical parties */
    G.LINEAGE_PARTY["socialcredit_ca"] = "Social Credit";
    G.LINEAGE_PARTY["ccf_ca"]          = "CCF";
    G.LINEAGE_PARTY["reform_ca"]       = "Reform Party";
    G.LINEAGE_PARTY["NDP_CA"]          = "NDP";
    /* UK historical Whig party */
    G.LINEAGE_PARTY["Whig"]       = "Whig Party";
    G.LINEAGE_PARTY["Whigs"]      = "Whig Party";
    /* Germany SED (East Germany) */
    G.LINEAGE_PARTY["sed_de"]     = "SED";
    /* Ireland */
    G.LINEAGE_PARTY["FiannaFail"] = "Fianna Fáil";
    G.LINEAGE_PARTY["FineGael"]   = "Fine Gael";
    G.LINEAGE_PARTY["SF_IE"]      = "Sinn Féin";
    G.LINEAGE_PARTY["FF"]         = "Fianna Fáil";
    G.LINEAGE_PARTY["FG"]         = "Fine Gael";
    G.LINEAGE_PARTY["SF"]         = "Sinn Féin";
    /* Italy */
    G.LINEAGE_PARTY["PNF"]        = "Fascist Party";
    /* South Africa */
    G.LINEAGE_PARTY["ANC"]        = "ANC";
  }
})();

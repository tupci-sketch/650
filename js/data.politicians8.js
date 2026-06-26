/* ============================================================
   650 — POLITICIANS EXPANSION VIII
   Latin America + Middle East / Arab World + Africa
   + South Asia (India/Pakistan/Bangladesh) + East Asia extras
   scope:"wild"
   ============================================================= */
window.G = window.G || {};
(function () {
  var G = window.G;
  var existing = {};
  G.POLITICIANS.forEach(function (p) { existing[p.name + "|" + (p.scope || "uk")] = 1; });

  function I(name, party, era, fits, s, note) {
    if (existing[name + "|wild"]) return;
    existing[name + "|wild"] = 1;
    var fig = {
      name: name, party: party, era: era, fits: fits,
      stats: { appeal: s[0], experience: s[1], oratory: s[2], statecraft: s[3], partyMgmt: s[4] },
      note: note || "", scope: "wild"
    };
    (G.POLITICIANS = G.POLITICIANS || []).push(fig);
  }

  function reg(label, lineage, colour, align, cap) {
    if (!G.PARTIES[label]) G.PARTIES[label] = { label: label, lineage: lineage, colour: colour, cap: cap || 500 };
    if (G.PARTY_ALIGN && !(label in G.PARTY_ALIGN)) G.PARTY_ALIGN[label] = align || 0;
    if (G.LINEAGE_ALIGN && !(lineage in G.LINEAGE_ALIGN)) G.LINEAGE_ALIGN[lineage] = align || 0;
  }

  /* ── Party registrations ──────────────────────────────────────── */
  /* Brazil */
  reg("PT (BR)",             "PT_BR",   "#e53935", -1.2, 513);
  reg("PMDB (BR)",           "PMDB_BR", "#0070c0",  0.1, 513);
  reg("PSDB (BR)",           "PSDB_BR", "#00897b", -0.2, 513);
  reg("PL (BR)",             "PL_BR",   "#003189",  0.8, 513);
  reg("PSL (BR)",            "PSL_BR",  "#1c3f6e",  1.5, 513);
  reg("MDB (BR)",            "MDB_BR",  "#0070c0",  0.1, 513);
  reg("PDT (BR)",            "PDT_BR",  "#e53935", -0.8, 513);
  reg("PP (BR)",             "PP_BR",   "#003189",  0.5, 513);
  reg("ARENA (BR)",          "ARENA_BR","#1c3f6e",  1.5, 513);
  /* Argentina */
  reg("UCR (AR)",            "UCR_AR",  "#e53935", -0.3, 257);
  reg("PRO (AR)",            "PRO_AR",  "#f9a825",  0.8, 257);
  reg("Frente de Todos",     "FdT_AR",  "#0070c0", -0.7, 257);
  reg("Peronism (AR)",       "PJ_AR",   "#0070c0", -0.3, 257);
  reg("La Libertad Avanza",  "LLA_AR",  "#7b1fa2",  2.0, 257);
  /* Mexico */
  reg("PRI (MX)",            "PRI_MX",  "#009246",  0.2, 500);
  reg("PAN (MX)",            "PAN_MX",  "#003189",  0.7, 500);
  reg("PRD (MX)",            "PRD_MX",  "#f9a825", -0.8, 500);
  reg("Morena (MX)",         "Morena",  "#8b0000", -0.7, 500);
  /* Colombia */
  reg("Liberal (CO)",        "Lib_CO",  "#e53935", -0.3, 166);
  reg("Conservative (CO)",   "Con_CO",  "#003189",  0.7, 166);
  reg("Colombia Humana",     "ColH_CO", "#e53935", -1.0, 166);
  reg("Cambio Radical",      "CR_CO",   "#f9a825",  0.3, 166);
  reg("Centro Democrático",  "CD_CO",   "#f9a825",  1.2, 166);
  /* Venezuela */
  reg("PSUV (VE)",           "PSUV",    "#e53935", -1.0, 277);
  reg("AD (VE)",             "AD_VE",   "#e53935", -0.5, 277);
  reg("MUD (VE)",            "MUD_VE",  "#0070c0",  0.3, 277);
  /* Chile */
  reg("PDC (CL)",            "PDC_CL",  "#0070c0",  0.1, 155);
  reg("PPD (CL)",            "PPD_CL",  "#e53935", -0.5, 155);
  reg("PS (CL)",             "PS_CL",   "#e53935", -0.8, 155);
  reg("RN (CL)",             "RN_CL",   "#003189",  0.7, 155);
  reg("UDI (CL)",            "UDI_CL",  "#1c3f6e",  1.2, 155);
  reg("FA (CL)",             "FA_CL",   "#cc0000", -1.3, 155);
  /* Peru */
  reg("Fuerza Popular",      "FP_PE",   "#f9a825",  1.0, 130);
  reg("APRA (PE)",           "APRA",    "#8b0000", -0.3, 130);
  reg("Peru Libre",          "PL_PE",   "#e53935", -1.2, 130);
  /* Israel */
  reg("Likud",               "Likud",   "#003189",  1.0, 120);
  reg("Mapai",               "Mapai",   "#e53935", -0.5, 120);
  reg("Labor (IL)",          "Lab_IL",  "#e53935", -0.5, 120);
  reg("Kadima",              "Kadima",  "#ef5350",  0.2, 120);
  reg("Yesh Atid",           "YA_IL",   "#0070c0",  0.1, 120);
  reg("Blue and White",      "BW_IL",   "#0070c0",  0.2, 120);
  reg("Mapam",               "Mapam",   "#cc0000", -1.0, 120);
  reg("National Unity (IL)", "NU_IL",   "#0070c0",  0.3, 120);
  reg("Shas (IL)",           "Shas",    "#1c3f6e",  0.7, 120);
  reg("Yamina (IL)",         "Yamina",  "#1c3f6e",  1.5, 120);
  reg("Otzma Yehudit",       "OY_IL",   "#1c3f6e",  2.5, 120);
  reg("Meretz (IL)",         "Meretz",  "#009246", -1.2, 120);
  /* Turkey */
  reg("Justice and Development Party","AKP_TR","#f9a825", 0.8, 600);
  reg("CHP (TR)",            "CHP_TR",  "#e53935", -0.3, 600);
  reg("HDP (TR)",            "HDP_TR",  "#009246", -1.0, 600);
  reg("MHP (TR)",            "MHP_TR",  "#1c3f6e",  1.5, 600);
  reg("DYP (TR)",            "DYP_TR",  "#003189",  0.6, 600);
  reg("ANAP (TR)",           "ANAP_TR", "#f9a825",  0.3, 600);
  reg("İYİ Party",           "IYI_TR",  "#0070c0",  0.5, 600);
  /* Egypt */
  reg("NDP (EG)",            "NDP_EG",  "#009246",  0.5, 596);
  reg("FJP (EG)",            "FJP_EG",  "#009246",  0.5, 596);
  reg("Wafd (EG)",           "Wafd_EG", "#0070c0",  0.0, 596);
  /* South Africa */
  reg("ANC",                 "ANC_ZA",  "#009246", -0.5, 400);
  reg("DA (ZA)",             "DA_ZA",   "#003189",  0.5, 400);
  reg("EFF (ZA)",            "EFF_ZA",  "#cc0000", -1.5, 400);
  reg("Inkatha (ZA)",        "IFP_ZA",  "#f9a825",  0.3, 400);
  reg("PAC (ZA)",            "PAC_ZA",  "#cc0000", -1.0, 400);
  /* Nigeria */
  reg("PDP (NG)",            "PDP_NG",  "#e53935", -0.2, 360);
  reg("APC (NG)",            "APC_NG",  "#009246",  0.3, 360);
  reg("NCNC (NG)",           "NCNC_NG", "#e53935", -0.2, 360);
  reg("AG (NG)",             "AG_NG",   "#009246",  0.0, 360);
  /* Kenya */
  reg("KANU (KE)",           "KANU_KE", "#e53935", -0.2, 350);
  reg("ODM (KE)",            "ODM_KE",  "#f9a825", -0.3, 350);
  reg("Jubilee (KE)",        "Jub_KE",  "#009246",  0.3, 350);
  reg("UDA (KE)",            "UDA_KE",  "#f9a825",  0.3, 350);
  /* India — more parties */
  reg("BJP",                 "BJP_IN",  "#f9a825",  1.0, 543);
  reg("INC",                 "INC_IN",  "#e53935", -0.3, 543);
  reg("CPI(M)",              "CPIM_IN", "#cc0000", -1.5, 543);
  reg("SP (IN)",             "SP_IN",   "#e53935", -0.3, 543);
  reg("BSP (IN)",            "BSP_IN",  "#003189", -0.2, 543);
  reg("TMC (IN)",            "TMC_IN",  "#0070c0", -0.2, 543);
  reg("NCP (IN)",            "NCP_IN",  "#0070c0", -0.2, 543);
  /* Pakistan */
  reg("PPP (PK)",            "PPP_PK",  "#e53935", -0.5, 342);
  reg("PML-N",               "PMLN_PK", "#009246",  0.3, 342);
  reg("PTI",                 "PTI_PK",  "#009246",  0.2, 342);
  reg("Muslim League (PK)",  "ML_PK",   "#009246",  0.3, 342);
  reg("ANP (PK)",            "ANP_PK",  "#cc0000", -0.5, 342);
  /* Bangladesh */
  reg("Awami League",        "AL_BD",   "#009246", -0.3, 350);
  reg("BNP (BD)",            "BNP_BD",  "#003189",  0.4, 350);
  /* Australia */
  reg("Australian Labor",    "ALP",     "#e53935", -0.6, 151);
  reg("Liberal (AU)",        "Lib_AU",  "#003189",  0.7, 151);
  reg("National (AU)",       "Nat_AU",  "#009246",  0.5, 151);
  reg("Greens (AU)",         "Grn_AU",  "#009246", -1.0, 151);
  /* Canada */
  reg("Liberal (CA)",        "Lib_CA",  "#e53935", -0.3, 338);
  reg("Conservative (CA)",   "Con_CA",  "#003189",  0.7, 338);
  reg("NDP (CA)",            "NDP_CA",  "#f9a825", -0.8, 338);
  reg("Bloc Québécois",      "BQ_CA",   "#0070c0", -0.2, 338);
  reg("CCF (CA)",            "CCF_CA",  "#e53935", -0.9, 338);

  if (G.PARTY_COUNTRY) {
    /* Brazil */
    G.PARTY_COUNTRY["PT (BR)"]              = "BR";
    G.PARTY_COUNTRY["PMDB (BR)"]            = "BR";
    G.PARTY_COUNTRY["PSDB (BR)"]            = "BR";
    G.PARTY_COUNTRY["PL (BR)"]              = "BR";
    G.PARTY_COUNTRY["PSL (BR)"]             = "BR";
    G.PARTY_COUNTRY["MDB (BR)"]             = "BR";
    G.PARTY_COUNTRY["PDT (BR)"]             = "BR";
    G.PARTY_COUNTRY["PP (BR)"]              = "BR";
    G.PARTY_COUNTRY["ARENA (BR)"]           = "BR";
    /* Argentina */
    G.PARTY_COUNTRY["UCR (AR)"]             = "AR";
    G.PARTY_COUNTRY["PRO (AR)"]             = "AR";
    G.PARTY_COUNTRY["Frente de Todos"]      = "AR";
    G.PARTY_COUNTRY["Peronism (AR)"]        = "AR";
    G.PARTY_COUNTRY["La Libertad Avanza"]   = "AR";
    /* Mexico */
    G.PARTY_COUNTRY["PRI (MX)"]             = "MX";
    G.PARTY_COUNTRY["PAN (MX)"]             = "MX";
    G.PARTY_COUNTRY["PRD (MX)"]             = "MX";
    G.PARTY_COUNTRY["Morena (MX)"]          = "MX";
    /* Colombia */
    G.PARTY_COUNTRY["Liberal (CO)"]         = "CO";
    G.PARTY_COUNTRY["Conservative (CO)"]    = "CO";
    G.PARTY_COUNTRY["Colombia Humana"]      = "CO";
    G.PARTY_COUNTRY["Cambio Radical"]       = "CO";
    G.PARTY_COUNTRY["Centro Democrático"]   = "CO";
    /* Venezuela */
    G.PARTY_COUNTRY["PSUV (VE)"]            = "VE";
    G.PARTY_COUNTRY["AD (VE)"]              = "VE";
    G.PARTY_COUNTRY["MUD (VE)"]             = "VE";
    /* Chile */
    G.PARTY_COUNTRY["PDC (CL)"]             = "CL";
    G.PARTY_COUNTRY["PPD (CL)"]             = "CL";
    G.PARTY_COUNTRY["PS (CL)"]              = "CL";
    G.PARTY_COUNTRY["RN (CL)"]              = "CL";
    G.PARTY_COUNTRY["UDI (CL)"]             = "CL";
    G.PARTY_COUNTRY["FA (CL)"]              = "CL";
    /* Peru */
    G.PARTY_COUNTRY["Fuerza Popular"]       = "PE";
    G.PARTY_COUNTRY["APRA (PE)"]            = "PE";
    G.PARTY_COUNTRY["Peru Libre"]           = "PE";
    /* Israel */
    G.PARTY_COUNTRY["Likud"]                = "IL";
    G.PARTY_COUNTRY["Mapai"]                = "IL";
    G.PARTY_COUNTRY["Labor (IL)"]           = "IL";
    G.PARTY_COUNTRY["Kadima"]               = "IL";
    G.PARTY_COUNTRY["Yesh Atid"]            = "IL";
    G.PARTY_COUNTRY["Blue and White"]       = "IL";
    G.PARTY_COUNTRY["Mapam"]                = "IL";
    G.PARTY_COUNTRY["National Unity (IL)"]  = "IL";
    G.PARTY_COUNTRY["Shas (IL)"]            = "IL";
    G.PARTY_COUNTRY["Yamina (IL)"]          = "IL";
    G.PARTY_COUNTRY["Otzma Yehudit"]        = "IL";
    G.PARTY_COUNTRY["Meretz (IL)"]          = "IL";
    /* Turkey */
    G.PARTY_COUNTRY["Justice and Development Party"] = "TR";
    G.PARTY_COUNTRY["CHP (TR)"]             = "TR";
    G.PARTY_COUNTRY["HDP (TR)"]             = "TR";
    G.PARTY_COUNTRY["MHP (TR)"]             = "TR";
    G.PARTY_COUNTRY["DYP (TR)"]             = "TR";
    G.PARTY_COUNTRY["ANAP (TR)"]            = "TR";
    G.PARTY_COUNTRY["İYİ Party"]            = "TR";
    /* Egypt */
    G.PARTY_COUNTRY["NDP (EG)"]             = "EG";
    G.PARTY_COUNTRY["FJP (EG)"]             = "EG";
    G.PARTY_COUNTRY["Wafd (EG)"]            = "EG";
    /* South Africa */
    G.PARTY_COUNTRY["ANC"]                  = "ZA";
    G.PARTY_COUNTRY["DA (ZA)"]              = "ZA";
    G.PARTY_COUNTRY["EFF (ZA)"]             = "ZA";
    G.PARTY_COUNTRY["Inkatha (ZA)"]         = "ZA";
    G.PARTY_COUNTRY["PAC (ZA)"]             = "ZA";
    /* Nigeria */
    G.PARTY_COUNTRY["PDP (NG)"]             = "NG";
    G.PARTY_COUNTRY["APC (NG)"]             = "NG";
    G.PARTY_COUNTRY["NCNC (NG)"]            = "NG";
    G.PARTY_COUNTRY["AG (NG)"]              = "NG";
    /* Kenya */
    G.PARTY_COUNTRY["KANU (KE)"]            = "KE";
    G.PARTY_COUNTRY["ODM (KE)"]             = "KE";
    G.PARTY_COUNTRY["Jubilee (KE)"]         = "KE";
    G.PARTY_COUNTRY["UDA (KE)"]             = "KE";
    /* India */
    G.PARTY_COUNTRY["BJP"]                  = "IN";
    G.PARTY_COUNTRY["INC"]                  = "IN";
    G.PARTY_COUNTRY["CPI(M)"]               = "IN";
    G.PARTY_COUNTRY["SP (IN)"]              = "IN";
    G.PARTY_COUNTRY["BSP (IN)"]             = "IN";
    G.PARTY_COUNTRY["TMC (IN)"]             = "IN";
    G.PARTY_COUNTRY["NCP (IN)"]             = "IN";
    /* Pakistan */
    G.PARTY_COUNTRY["PPP (PK)"]             = "PK";
    G.PARTY_COUNTRY["PML-N"]                = "PK";
    G.PARTY_COUNTRY["PTI"]                  = "PK";
    G.PARTY_COUNTRY["Muslim League (PK)"]   = "PK";
    G.PARTY_COUNTRY["ANP (PK)"]             = "PK";
    /* Bangladesh */
    G.PARTY_COUNTRY["Awami League"]         = "BD";
    G.PARTY_COUNTRY["BNP (BD)"]             = "BD";
    /* Australia */
    G.PARTY_COUNTRY["Australian Labor"]     = "AU";
    G.PARTY_COUNTRY["Liberal (AU)"]         = "AU";
    G.PARTY_COUNTRY["National (AU)"]        = "AU";
    G.PARTY_COUNTRY["Greens (AU)"]          = "AU";
    /* Canada */
    G.PARTY_COUNTRY["Liberal (CA)"]         = "CA";
    G.PARTY_COUNTRY["Conservative (CA)"]    = "CA";
    G.PARTY_COUNTRY["NDP (CA)"]             = "CA";
    G.PARTY_COUNTRY["Bloc Québécois"]       = "CA";
    G.PARTY_COUNTRY["CCF (CA)"]             = "CA";
  }

  /* ═══════════════════════════════════════════════════════════════
     BRAZIL
     ═══════════════════════════════════════════════════════════════ */
  I("Luiz Inácio Lula da Silva","PT (BR)","e6",["pm","work","leader"],                       [75,80,75,70,72], "PT three-time President; labour icon");
  I("Dilma Rousseff",        "PT (BR)","e7",["pm","chancellor","leader"],                     [58,72,52,62,58], "PT President 2011–16; impeached");
  I("Fernando Haddad",       "PT (BR)","e7",["pm","education","chancellor","leader"],         [60,68,60,62,60], "PT São Paulo mayor and 2022 runner-up");
  I("Tarso Genro",           "PT (BR)","e7",["justice","pm","leader"],                        [56,65,55,58,55], "PT Rio Grande do Sul governor, justice minister");
  I("José Dirceu",           "PT (BR)","e6",["deputy","leader","pm"],                         [58,68,55,58,58], "PT chief of staff; mensalão scandal");
  I("Gleisi Hoffmann",       "PT (BR)","e7",["work","leader"],                                [55,60,55,54,56], "PT party president");
  I("Aloizio Mercadante",    "PT (BR)","e7",["education","chancellor","leader"],              [55,65,52,56,55], "PT senator and education minister");
  I("Marco Aurélio Garcia",  "PT (BR)","e6",["foreign","leader"],                             [56,68,55,58,55], "PT foreign policy adviser");
  I("Rui Costa",             "PT (BR)","e7",["pm","chancellor"],                              [54,62,52,55,54], "PT Bahia governor, Casa Civil chief");
  I("Henrique Meirelles",    "PMDB (BR)","e7",["chancellor","business"],                      [56,68,50,60,52], "PMDB/MDB Central Bank president and finance minister");
  I("Michel Temer",          "PMDB (BR)","e7",["pm","deputy","justice"],                      [48,72,45,55,52], "PMDB VP who became PM after Dilma impeachment");
  I("Fernando Henrique Cardoso","PSDB (BR)","e6",["pm","chancellor","foreign","leader"],      [68,80,65,72,65], "PSDB PM; Real plan ended hyperinflation");
  I("Geraldo Alckmin",       "PSDB (BR)","e7",["pm","deputy","leader"],                       [56,72,50,58,55], "PSDB São Paulo governor; Lula VP 2023");
  I("José Serra",            "PSDB (BR)","e7",["health","chancellor","pm"],                  [58,70,55,60,55], "PSDB health minister and presidential candidate");
  I("Aécio Neves",           "PSDB (BR)","e7",["pm","chancellor","leader"],                  [55,65,52,56,55], "PSDB 2014 runner-up");
  I("Jair Bolsonaro",        "PL (BR)","e7",["pm","defence","leader"],                        [58,62,58,50,60], "PL President 2019–22; far-right populist");
  I("Eduardo Bolsonaro",     "PL (BR)","e7",["foreign","leader"],                             [48,52,50,44,50], "PL congressman, Bolsonaro son");
  I("Ciro Gomes",            "PDT (BR)","e6",["pm","chancellor","leader","foreign"],          [60,70,62,62,58], "PDT multiple presidential candidate");
  I("Brizola",               "PDT (BR)","e5",["pm","work","leader"],                          [62,72,65,60,62], "PDT founder; Rio governor");
  I("João Goulart",          "PDT (BR)","e4",["pm","work","leader"],                          [60,70,62,58,58], "Labour PM deposed by 1964 coup");
  I("Getúlio Vargas",        "ARENA (BR)","e3",["pm","work","chancellor","leader"],           [65,75,62,68,65], "Brazilian dictator-president who created labour rights");
  I("Ernesto Geisel",        "ARENA (BR)","e5",["pm","defence","leader"],                    [48,72,40,55,50], "Military president who began democratisation");
  I("João Baptista Figueiredo","ARENA (BR)","e5",["pm","defence","leader"],                  [45,68,40,50,48], "Last military president; amnesty law");
  I("Eurico Gaspar Dutra",   "ARENA (BR)","e3",["pm","defence","leader"],                    [48,68,42,52,48], "Military postwar president");
  I("Humberto Castelo Branco","ARENA (BR)","e4",["pm","defence","leader"],                   [42,68,38,48,45], "First military regime president");
  I("Emílio Médici",         "ARENA (BR)","e5",["pm","defence","leader"],                    [40,65,38,45,42], "Military president during 'economic miracle' and repression");
  I("Artur da Costa e Silva","ARENA (BR)","e4",["pm","defence","leader"],                    [40,65,38,45,42], "Military president, AI-5 hardliner");

  /* ═══════════════════════════════════════════════════════════════
     ARGENTINA
     ═══════════════════════════════════════════════════════════════ */
  I("Juan Perón",            "Peronism (AR)","e3",["pm","work","leader"],                     [68,72,68,62,68], "Twice-exiled founder of Peronism");
  I("Eva Perón",             "Peronism (AR)","e3",["work","health","leader"],                 [75,58,78,62,70], "Evita; labour and women's rights icon");
  I("Carlos Menem",          "Peronism (AR)","e6",["pm","chancellor","trade"],                [60,72,58,60,60], "Peronist who liberalised economy; convertibility");
  I("Néstor Kirchner",       "Frente de Todos","e7",["pm","chancellor","leader"],             [62,72,60,62,62], "Left-Peronist PM; debt restructuring");
  I("Cristina Fernández de Kirchner","Frente de Todos","e7",["pm","leader","foreign"],        [62,75,65,62,65], "Twice President; divisive left-Peronist");
  I("Alberto Fernández",     "Frente de Todos","e7",["pm","leader"],                          [52,65,52,52,50], "Kirchner coalition PM 2019–23");
  I("Sergio Massa",          "Frente de Todos","e7",["chancellor","pm","leader"],             [56,65,55,55,55], "Economy superminister 2022–23");
  I("Eduardo Duhalde",       "Peronism (AR)","e7",["pm","leader"],                            [52,68,48,52,52], "Peronist caretaker PM 2002–03");
  I("Raúl Alfonsín",         "UCR (AR)","e5",["pm","justice","leader","foreign"],             [65,75,65,65,62], "UCR PM; restored democracy 1983");
  I("Fernando de la Rúa",    "UCR (AR)","e7",["pm","leader"],                                 [48,65,45,48,48], "UCR PM; resigned amid 2001 crisis");
  I("Hipólito Yrigoyen",     "UCR (AR)","e1",["pm","leader"],                                 [60,68,58,60,58], "UCR founder and twice president");
  I("Marcelo T. de Alvear",  "UCR (AR)","e2",["pm","foreign","leader"],                       [60,70,58,62,58], "UCR President 1922–28");
  I("Mauricio Macri",        "PRO (AR)","e7",["pm","chancellor","business","leader"],         [56,65,52,55,55], "PRO PM 2015–19; liberal reforms");
  I("Horacio Rodríguez Larreta","PRO (AR)","e7",["pm","leader","business"],                  [58,65,55,58,55], "Buenos Aires mayor, PRO presidential candidate");
  I("Patricia Bullrich",     "PRO (AR)","e7",["home","defence","leader"],                     [56,62,55,55,55], "PRO security minister and presidential candidate");
  I("Javier Milei",          "La Libertad Avanza","e7",["pm","chancellor","leader"],          [60,52,65,50,58], "LLA anarcho-capitalist PM from 2023");
  I("Victoria Villarruel",   "La Libertad Avanza","e7",["pm","defence"],                      [52,52,55,48,50], "LLA VP; military apologist");

  /* ═══════════════════════════════════════════════════════════════
     MEXICO
     ═══════════════════════════════════════════════════════════════ */
  I("Porfirio Díaz",         "PRI (MX)","e1",["pm","defence","leader"],                       [50,72,45,58,55], "Díaz dictatorship 1876–1911; moderniser");
  I("Venustiano Carranza",   "PRI (MX)","e2",["pm","foreign","leader"],                       [55,68,52,58,52], "Constitutional president 1917");
  I("Plutarco Elías Calles", "PRI (MX)","e2",["pm","leader"],                                 [52,70,48,55,55], "Maximum Chief, PRI founder");
  I("Lázaro Cárdenas",       "PRI (MX)","e3",["pm","leader","work"],                          [62,72,60,62,62], "Oil nationalisation; land reform; secular education");
  I("Manuel Ávila Camacho",  "PRI (MX)","e3",["pm","defence","leader"],                       [52,68,48,55,50], "WWII alliance PM");
  I("Miguel Alemán Valdés",  "PRI (MX)","e3",["pm","business","trade"],                       [55,68,52,58,55], "First civilian PRI PM; corruption era");
  I("Adolfo López Mateos",   "PRI (MX)","e4",["pm","foreign","work"],                         [60,70,58,62,60], "PRI PM; balanced economic growth");
  I("Luis Echeverría",       "PRI (MX)","e5",["pm","foreign","leader"],                       [48,70,45,52,50], "PRI PM; populist statist, Tlatelolco perpetrator");
  I("José López Portillo",   "PRI (MX)","e5",["pm","chancellor","leader"],                   [50,68,48,52,50], "PRI PM; oil boom and bust");
  I("Miguel de la Madrid",   "PRI (MX)","e5",["pm","chancellor","leader"],                   [52,70,48,55,52], "PRI PM; earthquake and austerity");
  I("Carlos Salinas de Gortari","PRI (MX)","e6",["pm","trade","chancellor","leader"],         [56,72,52,60,58], "PRI PM; NAFTA, Zapatista uprising");
  I("Ernesto Zedillo",       "PRI (MX)","e6",["pm","chancellor","leader"],                   [58,72,55,62,58], "PRI PM; peso crisis and democratic transition");
  I("Vicente Fox",           "PAN (MX)","e7",["pm","business","leader"],                      [60,65,60,58,58], "PAN PM; ended 71 years of PRI rule");
  I("Felipe Calderón",       "PAN (MX)","e7",["pm","defence","leader"],                       [55,68,52,58,55], "PAN PM; drug war president");
  I("Andrés Manuel López Obrador","Morena (MX)","e7",["pm","leader","work"],                 [65,70,65,60,65], "Morena PM 2018–24; AMLO");
  I("Claudia Sheinbaum",     "Morena (MX)","e7",["pm","environment","leader"],               [62,65,60,60,62], "Morena PM from 2024; first female Mexican PM");
  I("Cuauhtémoc Cárdenas",   "PRD (MX)","e6",["pm","leader"],                                 [60,68,58,58,58], "PRD founder; nearly won 1988 election");
  I("Jorge Castañeda",       "PRD (MX)","e7",["foreign","leader"],                            [58,65,60,58,52], "PRD-linked foreign minister");

  /* ═══════════════════════════════════════════════════════════════
     COLOMBIA / VENEZUELA / CHILE
     ═══════════════════════════════════════════════════════════════ */
  I("Alberto Lleras Camargo","Liberal (CO)","e4",["pm","foreign","leader"],                   [60,72,60,62,60], "National Front co-architect, twice PM");
  I("Carlos Lleras Restrepo","Liberal (CO)","e4",["pm","chancellor","leader"],                [60,72,55,62,58], "Liberal PM 1966–70");
  I("Alfonso López Michelsen","Liberal (CO)","e5",["pm","leader","chancellor"],              [60,70,58,60,58], "Liberal PM 1974–78; legalisation of marijuana");
  I("Julio César Turbay Ayala","Liberal (CO)","e5",["pm","defence","leader"],                [52,65,48,55,50], "Liberal PM 1978–82");
  I("César Gaviria",         "Liberal (CO)","e6",["pm","chancellor","leader","foreign"],      [60,72,58,62,58], "Liberal PM; OAS chief");
  I("Ernesto Samper",        "Liberal (CO)","e6",["pm","leader"],                             [50,65,48,50,48], "Liberal PM; narco-funding scandal");
  I("Horacio Serpa",         "Liberal (CO)","e7",["pm","home","leader"],                      [52,65,50,52,52], "Liberal three-time presidential candidate");
  I("Gustavo Petro",         "Colombia Humana","e7",["pm","leader","work"],                   [62,65,65,58,60], "Former M-19 guerrilla; first leftist Colombian PM");
  I("Francia Márquez",       "Colombia Humana","e7",["environment","work","deputy"],          [62,55,62,52,54], "Afro-Colombian activist VP");
  I("Álvaro Uribe",          "Centro Democrático","e7",["pm","defence","leader"],             [60,72,62,60,60], "Centre Dem founder; security hardliner, two terms");
  I("Iván Duque",            "Centro Democrático","e7",["pm","business","leader"],            [55,62,52,55,55], "CD PM 2018–22");
  I("Hugo Chávez",           "PSUV (VE)","e6",["pm","leader","defence","foreign"],            [70,72,72,62,68], "PSUV founder; Venezuela's socialist strongman");
  I("Nicolás Maduro",        "PSUV (VE)","e7",["pm","leader","foreign"],                      [48,60,45,48,52], "PSUV successor to Chávez");
  I("Henrique Capriles",     "MUD (VE)","e7",["pm","leader"],                                 [58,60,58,55,55], "Opposition presidential candidate");
  I("Juan Guaidó",           "MUD (VE)","e7",["pm","leader"],                                 [55,52,55,48,50], "Self-declared interim president");
  I("Rómulo Betancourt",     "AD (VE)","e4",["pm","leader","foreign"],                        [62,72,62,62,60], "AD founding PM; democratic resistance to Perón/Franco");
  I("Eduardo Frei Montalva", "PDC (CL)","e4",["pm","leader","social"],                        [62,72,60,62,60], "Chile's Christian Democrat PM 1964–70");
  I("Eduardo Frei Ruiz-Tagle","PDC (CL)","e6",["pm","leader","chancellor"],                  [60,72,55,62,58], "PDC PM 1994–2000");
  I("Salvador Allende",      "PS (CL)","e4",["pm","health","leader"],                         [65,70,68,62,60], "First elected Marxist PM; overthrown and killed 1973");
  I("Michelle Bachelet",     "PPD (CL)","e7",["pm","defence","health","leader"],              [65,72,62,65,62], "Twice PM; UN Women chief");
  I("Ricardo Lagos",         "PPD (CL)","e7",["pm","chancellor","education","leader"],        [65,75,62,68,62], "PDC-aligned PM; Chile's third way");
  I("Gabriel Boric",         "FA (CL)","e7",["pm","leader","work"],                           [62,55,65,56,58], "Frente Amplio PM from 2022; youngest ever");
  I("Augusto Pinochet",      "UDI (CL)","e4",["pm","defence","leader"],                       [38,68,35,45,42], "Military dictator 1973–89; neoliberal shock therapy");
  I("Sebastián Piñera",      "RN (CL)","e7",["pm","business","chancellor","leader"],          [58,70,52,60,55], "RN PM twice; billionaire centrist");
  I("José Piñera",           "UDI (CL)","e5",["work","chancellor","business"],               [55,65,50,58,50], "Pinochet labour minister; pension privatisation architect");

  /* ═══════════════════════════════════════════════════════════════
     ISRAEL
     ═══════════════════════════════════════════════════════════════ */
  I("David Ben-Gurion",      "Mapai","e3",["pm","defence","leader"],                          [72,80,68,75,72], "Israel's founding PM and statesman");
  I("Moshe Sharett",         "Mapai","e4",["pm","foreign","leader"],                          [60,75,58,65,60], "Israel's second PM");
  I("Levi Eshkol",           "Mapai","e4",["pm","chancellor","leader"],                       [62,75,55,65,62], "Six-Day War PM");
  I("Golda Meir",            "Mapai","e5",["pm","foreign","leader"],                          [65,78,62,68,65], "First female Israeli PM; Yom Kippur War");
  I("Yitzhak Rabin",         "Labor (IL)","e5",["pm","defence","leader"],                     [65,78,60,68,65], "PM assassinated 1995; Oslo Accords");
  I("Shimon Peres",          "Labor (IL)","e5",["pm","foreign","defence","leader"],           [65,80,65,72,65], "Labour veteran; Oslo architect; Nobel laureate");
  I("Ehud Barak",            "Labor (IL)","e6",["pm","defence","leader"],                     [60,75,58,65,60], "Labour PM; Camp David 2000");
  I("Ehud Olmert",           "Kadima","e7",["pm","foreign","chancellor","leader"],            [56,72,55,60,55], "Kadima PM; Annapolis process; corruption conviction");
  I("Tzipi Livni",           "Kadima","e7",["pm","foreign","justice","leader"],               [60,70,58,62,58], "Kadima leader and foreign minister");
  I("Ariel Sharon",          "Likud","e5",["pm","defence","leader"],                          [58,78,52,62,60], "Likud hawk who left Likud; disengagement from Gaza");
  I("Menachem Begin",        "Likud","e5",["pm","foreign","leader"],                          [62,78,65,65,60], "Likud founder; Camp David Nobel laureate");
  I("Yitzhak Shamir",        "Likud","e5",["pm","foreign","leader"],                          [48,75,42,55,50], "Likud hardliner PM twice");
  I("Benjamin Netanyahu",    "Likud","e6",["pm","foreign","leader"],                          [62,80,62,65,65], "Likud PM six terms; Netanyahu");
  I("Naftali Bennett",       "Yamina (IL)","e7",["pm","defence","leader"],                    [58,62,55,58,55], "Yamina PM 2021–22");
  I("Yair Lapid",            "Yesh Atid","e7",["pm","chancellor","leader"],                   [60,62,62,58,60], "YA PM 2022; journalist turned politician");
  I("Benny Gantz",           "Blue and White","e7",["pm","defence","leader"],                 [56,68,52,58,55], "B&W general turned politician");
  I("Avigdor Lieberman",     "Likud","e7",["foreign","defence","home","chancellor"],          [52,68,50,55,52], "Russian-Israeli nationalist; multiple portfolios");
  I("Gideon Sa'ar",          "National Unity (IL)","e7",["home","justice","pm","leader"],     [55,62,52,55,54], "NU right-wing breakaway leader");
  I("Yoav Gallant",          "Likud","e7",["defence"],                                        [52,62,45,52,48], "Likud defence minister during Gaza war");
  I("Moshe Dayan",           "Mapai","e4",["defence","foreign","leader"],                     [62,72,58,65,58], "War hero and foreign minister");
  I("Abba Eban",             "Mapai","e4",["foreign","leader"],                               [68,70,72,68,58], "Israel's greatest diplomat and orator");
  I("Menachem Ussishkin",    "Mapai","e2",["leader","culture"],                               [56,60,55,52,55], "Zionist executive leader");
  I("Haim Weizmann",         "Mapam","e2",["pm","foreign","leader"],                          [65,68,62,65,58], "First Israeli President; Zionist diplomat");
  I("Ze'ev Jabotinsky",      "Likud","e2",["leader","culture"],                               [65,62,68,58,55], "Revisionist Zionist; Likud ideological father");
  I("Aryeh Deri",            "Shas (IL)","e7",["home","chancellor","leader"],                 [55,68,52,55,55], "Shas founder; convicted twice of corruption");
  I("Itamar Ben-Gvir",       "Otzma Yehudit","e7",["home","leader"],                          [45,52,48,40,48], "Kahanist minister; West Bank settler idol");
  I("Bezalel Smotrich",      "Otzma Yehudit","e7",["chancellor","leader"],                    [48,55,48,42,50], "Finance minister and settlement expansion hardliner");
  I("Yossi Sarid",           "Meretz (IL)","e6",["pm","education","environment","leader"],    [60,70,60,60,58], "Meretz leader and education minister");
  I("Shulamit Aloni",        "Meretz (IL)","e5",["pm","education","culture","leader"],        [62,68,65,60,58], "Meretz founder; civil liberties champion");
  I("Tamar Zandberg",        "Meretz (IL)","e7",["environment","leader"],                     [55,55,55,52,52], "Meretz leader");

  /* ═══════════════════════════════════════════════════════════════
     TURKEY
     ═══════════════════════════════════════════════════════════════ */
  I("Mustafa Kemal Atatürk", "CHP (TR)","e2",["pm","defence","leader","foreign"],             [80,80,80,80,78], "Turkish Republic founder");
  I("İsmet İnönü",           "CHP (TR)","e3",["pm","foreign","leader"],                       [65,80,60,70,68], "CHP PM and President after Atatürk");
  I("Bülent Ecevit",         "CHP (TR)","e5",["pm","work","leader"],                          [62,75,60,62,60], "CHP PM; invaded Cyprus 1974");
  I("Deniz Baykal",          "CHP (TR)","e6",["pm","leader"],                                  [55,72,55,55,58], "CHP leader 1992–2010");
  I("Kemal Kılıçdaroğlu",    "CHP (TR)","e7",["pm","leader","chancellor"],                   [58,68,55,58,58], "CHP leader 2010–23");
  I("Özgür Özel",            "CHP (TR)","e7",["pm","leader"],                                  [54,60,52,52,54], "CHP leader from 2023");
  I("Recep Tayyip Erdoğan",  "Justice and Development Party","e7",["pm","foreign","leader"],  [65,78,65,65,70], "AKP PM and President; Turkey's dominant leader");
  I("Abdullah Gül",          "Justice and Development Party","e7",["pm","foreign","leader"],  [60,72,55,62,60], "AKP PM; President 2007–14");
  I("Ahmet Davutoğlu",       "Justice and Development Party","e7",["pm","foreign","leader"],  [58,68,58,60,56], "AKP PM 2014–16; 'strategic depth' architect");
  I("Binali Yıldırım",       "Justice and Development Party","e7",["pm","transport","leader"],[55,65,48,55,55], "AKP PM 2016–18");
  I("Ali Babacan",           "Justice and Development Party","e7",["chancellor","trade","leader"],[58,65,52,62,54], "AKP finance minister who broke away");
  I("Bülent Arınç",          "Justice and Development Party","e7",["deputy","leader"],         [52,65,55,52,52], "AKP parliamentary speaker");
  I("Devlet Bahçeli",        "MHP (TR)","e6",["pm","leader","defence"],                        [52,68,48,52,52], "MHP leader from 1997; Erdoğan ally");
  I("Alparslan Türkeş",      "MHP (TR)","e4",["pm","leader","defence"],                        [52,68,52,50,52], "Grey Wolves founder, MHP patriarch");
  I("Meral Akşener",         "İYİ Party","e7",["pm","home","leader"],                          [58,62,60,55,58], "İYİ founder, MHP dissident");
  I("Turgut Özal",           "ANAP (TR)","e5",["pm","chancellor","trade","leader"],            [65,72,62,68,62], "ANAP PM and President; economic liberalisation");
  I("Tansu Çiller",          "DYP (TR)","e6",["pm","chancellor","foreign","leader"],           [58,68,58,58,56], "Turkey's first female PM");
  I("Süleyman Demirel",      "DYP (TR)","e5",["pm","trade","leader"],                          [60,75,55,62,62], "Seven-time PM and President");
  I("Necmettin Erbakan",     "MHP (TR)","e6",["pm","leader"],                                  [55,72,55,55,56], "Islamist PM 1996–97; AKP's ideological grandfather");
  I("Selahattin Demirtaş",   "HDP (TR)","e7",["pm","leader"],                                  [62,60,65,55,60], "HDP co-leader; imprisoned since 2016");
  I("Pervin Buldan",         "HDP (TR)","e7",["pm","leader"],                                  [54,58,54,50,52], "HDP co-chair");
  I("Fethi Selamoğlu",       "HDP (TR)","e7",["work","environment"],                           [48,52,48,46,48], "HDP labour representative");

  /* ═══════════════════════════════════════════════════════════════
     EGYPT & ARAB WORLD
     ═══════════════════════════════════════════════════════════════ */
  I("Gamal Abdel Nasser",    "NDP (EG)","e4",["pm","foreign","defence","leader"],             [72,72,72,65,68], "Pan-Arab nationalist; Suez Crisis");
  I("Anwar Sadat",           "NDP (EG)","e5",["pm","foreign","defence","leader"],             [65,72,62,65,58], "Camp David Nobel laureate; assassinated 1981");
  I("Hosni Mubarak",         "NDP (EG)","e5",["pm","foreign","defence","leader"],             [48,78,40,55,52], "Egypt's 30-year authoritarian ruler");
  I("Mohamed Morsi",         "FJP (EG)","e7",["pm","leader"],                                  [45,55,48,42,48], "Egypt's only elected Islamist PM; deposed 2013");
  I("Abdel Fattah el-Sisi",  "NDP (EG)","e7",["pm","defence","leader"],                       [50,65,45,52,52], "Military coup leader turned PM");
  I("Mostafa El-Nahas",      "Wafd (EG)","e3",["pm","foreign","leader"],                       [60,70,60,62,60], "Wafd PM who signed Anglo-Egyptian Treaty");
  I("Saddam Hussein",        "NDP (EG)","e5",["pm","defence","leader"],                        [42,68,48,45,48], "Iraqi Ba'ath dictator");
  I("Muammar Gaddafi",       "NDP (EG)","e5",["pm","leader","foreign"],                        [45,68,50,42,48], "Libyan dictator; Green Book ideology");
  I("Hafez al-Assad",        "NDP (EG)","e5",["pm","defence","leader"],                        [40,72,38,48,45], "Syrian Ba'ath dictator 1970–2000");
  I("Bashar al-Assad",       "NDP (EG)","e7",["pm","defence","leader"],                        [35,60,35,40,42], "Syrian dictator who survived civil war");
  I("King Hussein of Jordan","Wafd (EG)","e4",["pm","foreign","leader"],                       [62,75,60,65,62], "Jordanian king; peace with Israel 1994");
  I("Yasser Arafat",         "NDP (EG)","e5",["pm","foreign","leader"],                        [58,72,60,52,58], "PLO chairman; Oslo Nobel laureate");
  I("Mahmoud Abbas",         "NDP (EG)","e7",["pm","foreign","leader"],                        [52,68,48,52,50], "Palestinian Authority chairman");
  I("Ismail Haniyeh",        "NDP (EG)","e7",["pm","leader"],                                  [45,58,48,42,48], "Hamas political chief; assassinated 2024");
  I("Yahya Sinwar",          "NDP (EG)","e7",["leader","defence"],                             [35,55,35,38,42], "Hamas military chief; killed 2024");

  /* ═══════════════════════════════════════════════════════════════
     SOUTH AFRICA
     ═══════════════════════════════════════════════════════════════ */
  I("Nelson Mandela",        "ANC","e6",["pm","leader","justice","foreign"],                   [85,80,80,80,80], "ANC; first post-apartheid PM");
  I("Oliver Tambo",          "ANC","e4",["leader","foreign"],                                  [70,72,65,65,65], "ANC president in exile");
  I("Walter Sisulu",         "ANC","e3",["leader","work","deputy"],                            [65,68,60,60,62], "ANC co-founder; Robben Island prisoner");
  I("Steve Biko",            "PAC (ZA)","e5",["leader","culture","education"],                 [68,55,72,58,55], "Black consciousness martyr; murdered 1977");
  I("Chris Hani",            "ANC","e6",["leader","defence","work"],                           [65,62,68,58,58], "SACP/ANC chief; assassinated 1993");
  I("Thabo Mbeki",           "ANC","e6",["pm","foreign","leader","chancellor"],               [62,80,58,68,65], "ANC PM 1999–2008; AIDS denialism controversy");
  I("Jacob Zuma",            "ANC","e7",["pm","leader","deputy"],                              [50,72,55,48,55], "ANC PM 2009–18; corruption and Nkandla scandal");
  I("Cyril Ramaphosa",       "ANC","e7",["pm","business","leader","chancellor"],              [62,75,58,65,60], "ANC PM from 2018; trade union to mining billionaire");
  I("Kgalema Motlanthe",     "ANC","e7",["pm","deputy","leader"],                              [58,70,52,58,55], "ANC caretaker PM 2008–09");
  I("Naledi Pandor",         "ANC","e7",["foreign","education","science"],                     [58,68,55,60,55], "ANC foreign minister; South-South foreign policy");
  I("Lindiwe Sisulu",        "ANC","e7",["foreign","home","defence","leader"],                 [55,65,55,55,52], "ANC minister multiple portfolios");
  I("Nkosazana Dlamini-Zuma","ANC","e7",["health","foreign","home","leader"],                 [55,70,52,58,55], "ANC chairperson; AU commission chief");
  I("Winnie Mandela",        "ANC","e6",["leader","work"],                                     [62,62,65,50,55], "ANC activist; Mother of the Nation");
  I("Desmond Tutu",          "ANC","e5",["leader","justice","culture"],                        [75,65,78,68,60], "TRC chair; Nobel Peace laureate");
  I("Helen Zille",           "DA (ZA)","e7",["pm","education","leader"],                       [60,68,60,62,58], "DA leader; Cape Town mayor");
  I("Mmusi Maimane",         "DA (ZA)","e7",["pm","leader"],                                   [58,58,60,55,56], "DA leader 2015–19");
  I("John Steenhuisen",      "DA (ZA)","e7",["pm","leader"],                                   [55,58,56,52,55], "DA leader from 2020");
  I("Julius Malema",         "EFF (ZA)","e7",["pm","leader","work"],                           [62,58,65,50,60], "EFF founder; expelled from ANC youth league");
  I("Floyd Shivambu",        "EFF (ZA)","e7",["chancellor","leader"],                          [55,55,60,48,55], "EFF deputy president");
  I("Mangosuthu Buthelezi",  "Inkatha (ZA)","e5",["pm","home","leader"],                       [58,72,55,58,58], "IFP founder; longest-serving SA minister");
  I("P.W. Botha",            "ANC","e5",["pm","defence","leader"],                             [38,72,38,48,45], "Last apartheid hard-liner before De Klerk");
  I("F.W. de Klerk",         "ANC","e6",["pm","leader"],                                       [55,72,50,58,52], "Apartheid's last PM; released Mandela; Nobel laureate");

  /* ═══════════════════════════════════════════════════════════════
     NIGERIA
     ═══════════════════════════════════════════════════════════════ */
  I("Nnamdi Azikiwe",        "NCNC (NG)","e4",["pm","leader","foreign"],                      [65,72,65,62,62], "Nigeria's first President; pan-African nationalist");
  I("Obafemi Awolowo",       "AG (NG)","e4",["pm","chancellor","leader"],                      [62,72,60,62,60], "Yoruba nationalist; lost 1979 election");
  I("Ahmadu Bello",          "AG (NG)","e4",["pm","leader"],                                   [60,70,58,60,60], "Northern People's Congress; Premier of the North");
  I("Tafawa Balewa",         "NCNC (NG)","e4",["pm","foreign","leader"],                       [58,68,55,60,58], "Nigeria's first PM; assassinated 1966");
  I("Yakubu Gowon",          "PDP (NG)","e4",["pm","defence","leader"],                        [50,65,45,52,48], "Military PM during Biafran civil war");
  I("Olusegun Obasanjo",     "PDP (NG)","e5",["pm","foreign","defence","leader"],             [55,78,52,58,55], "Military ruler and democratic PM twice");
  I("Moshood Abiola",        "PDP (NG)","e6",["pm","business","leader"],                       [58,60,55,55,52], "MKO; won 1993 election annulled; died in custody");
  I("Ernest Shonekan",       "PDP (NG)","e6",["pm","business"],                                [48,58,42,48,42], "ING PM 1993 interim caretaker");
  I("Sani Abacha",           "PDP (NG)","e6",["pm","defence","leader"],                        [28,60,25,35,32], "Military dictator; billions looted");
  I("Umaru Yar'Adua",        "PDP (NG)","e7",["pm","chancellor","environment","leader"],       [55,65,48,55,52], "PDP PM 2007–10; died in office");
  I("Goodluck Jonathan",     "PDP (NG)","e7",["pm","deputy","leader","chancellor"],            [52,65,48,52,50], "PDP PM; Boko Haram crisis; conceded defeat");
  I("Muhammadu Buhari",      "APC (NG)","e7",["pm","defence","leader"],                        [48,65,42,48,50], "APC PM; former military ruler; anti-corruption rhetoric");
  I("Bola Tinubu",           "APC (NG)","e7",["pm","chancellor","leader"],                     [52,68,50,52,55], "APC PM from 2023; Lagos kingmaker");
  I("Peter Obi",             "APC (NG)","e7",["pm","chancellor","leader","business"],          [58,60,58,56,55], "LP PM candidate 2023; Anambra governor");
  I("Atiku Abubakar",        "PDP (NG)","e7",["pm","deputy","business","leader"],             [52,68,48,52,52], "PDP PM candidate multiple times; Obasanjo VP");

  /* ═══════════════════════════════════════════════════════════════
     KENYA
     ═══════════════════════════════════════════════════════════════ */
  I("Jomo Kenyatta",         "KANU (KE)","e4",["pm","leader","foreign"],                      [68,72,65,65,65], "Kenya's founding PM and first President");
  I("Daniel arap Moi",       "KANU (KE)","e5",["pm","leader"],                                [48,72,42,50,50], "Kenya's authoritarian PM 1978–2002");
  I("Mwai Kibaki",           "Jubilee (KE)","e6",["pm","chancellor","leader"],                [60,72,55,62,58], "PM 2002–13; constitutional reform");
  I("Raila Odinga",          "ODM (KE)","e7",["pm","deputy","leader"],                         [62,70,62,60,60], "ODM four-time PM candidate; 2024 AU Commission chief");
  I("Uhuru Kenyatta",        "Jubilee (KE)","e7",["pm","leader"],                              [55,68,50,55,55], "Jomo's son; ICC indictee turned PM");
  I("William Ruto",          "UDA (KE)","e7",["pm","agriculture","deputy","leader"],           [56,65,55,55,56], "UDA PM from 2022; 'hustler'");
  I("George Magoha",         "Jubilee (KE)","e7",["education"],                                [52,60,48,52,48], "Education minister");
  I("Kalonzo Musyoka",       "ODM (KE)","e7",["pm","foreign","deputy","leader"],              [55,65,52,55,52], "Wiper leader; VP twice");
  I("Martha Karua",          "ODM (KE)","e7",["justice","pm"],                                  [56,62,55,56,52], "Opposition VP candidate; justice minister");
  I("Ida Odinga",            "ODM (KE)","e7",["health","work"],                                [48,52,48,46,48], "ODM figure; Raila's wife");

  /* ═══════════════════════════════════════════════════════════════
     INDIA — EXPANDED
     ═══════════════════════════════════════════════════════════════ */
  I("Jawaharlal Nehru",      "INC","e3",["pm","foreign","chancellor","leader"],               [75,80,75,78,72], "India's first PM; non-alignment architect");
  I("Indira Gandhi",         "INC","e4",["pm","foreign","home","leader"],                     [68,78,65,70,68], "PM twice; Emergency rule; assassinated 1984");
  I("Rajiv Gandhi",          "INC","e5",["pm","leader","chancellor"],                         [60,68,58,60,58], "PM after Indira; Bofors scandal; assassinated 1991");
  I("P.V. Narasimha Rao",    "INC","e6",["pm","foreign","leader","chancellor"],               [60,80,55,70,62], "INC PM; 1991 liberalisation architect");
  I("Sonia Gandhi",          "INC","e6",["leader","pm"],                                       [55,68,50,60,62], "INC president; declined PM post");
  I("Rahul Gandhi",          "INC","e7",["pm","leader"],                                       [52,62,52,52,52], "INC dynastic leader");
  I("Sharad Pawar",          "NCP (IN)","e5",["pm","agriculture","defence","leader"],         [60,78,58,62,60], "NCP founder; Maharashtra strongman");
  I("Atal Bihari Vajpayee",  "BJP","e5",["pm","foreign","leader"],                            [70,80,72,72,70], "BJP moderate PM; nuclear tests; bus to Lahore");
  I("L.K. Advani",           "BJP","e5",["pm","home","leader"],                               [60,78,60,65,65], "BJP patriarch; Ratha Yatra");
  I("Amit Shah",             "BJP","e7",["home","leader","deputy"],                           [55,70,55,60,68], "BJP president and home minister");
  I("Rajnath Singh",         "BJP","e7",["defence","home","leader"],                          [58,72,55,60,62], "BJP defence minister");
  I("Sushma Swaraj",         "BJP","e7",["foreign","pm","leader"],                            [62,70,65,62,62], "BJP foreign minister; popular orator");
  I("Arun Jaitley",          "BJP","e7",["chancellor","trade","law","leader"],                [62,72,60,65,60], "BJP finance minister");
  I("Jaswant Singh",         "BJP","e6",["foreign","chancellor","defence"],                   [60,72,58,62,55], "BJP finance and foreign minister");
  I("Yogi Adityanath",       "BJP","e7",["pm","home"],                                         [48,58,52,45,52], "BJP UP chief minister; hardline Hindu nationalist");
  I("Arvind Kejriwal",       "BJP","e7",["pm","health","education","leader"],                 [60,58,62,56,58], "AAP Delhi CM; anti-corruption crusader");
  I("Mamata Banerjee",       "TMC (IN)","e7",["pm","railway","leader"],                       [62,68,62,58,60], "TMC Bengal CM; fiery opposition");
  I("Mulayam Singh Yadav",   "SP (IN)","e5",["pm","defence","leader"],                        [55,68,55,55,58], "SP founder; UP strongman");
  I("Akhilesh Yadav",        "SP (IN)","e7",["pm","leader"],                                   [54,58,55,52,54], "SP leader; Mulayam's son");
  I("Mayawati",              "BSP (IN)","e6",["pm","leader"],                                   [55,65,52,52,55], "BSP leader; UP CM four times; Dalit icon");
  I("E.K. Nayanar",          "CPI(M)","e5",["pm","work","leader"],                            [55,68,52,55,55], "CPI(M) Kerala CM three times");
  I("V.S. Achuthanandan",    "CPI(M)","e6",["pm","work","leader"],                            [55,68,52,55,55], "CPI(M) Kerala CM; anti-corruption crusader");
  I("Sitaram Yechury",       "CPI(M)","e7",["pm","leader","foreign"],                         [56,68,58,55,58], "CPI(M) general secretary");
  I("Prakash Karat",         "CPI(M)","e7",["leader"],                                         [52,65,52,50,54], "CPI(M) general secretary 2005–15");
  I("D. Raja",               "CPI(M)","e7",["leader","work"],                                  [50,60,50,48,50], "CPI national secretary");
  I("K. Chandrashekhar Rao", "TMC (IN)","e7",["pm","work","chancellor"],                     [56,62,55,55,55], "BRS Telangana CM");
  I("Farooq Abdullah",       "INC","e6",["pm","leader"],                                       [56,68,55,55,55], "NC J&K CM and union minister");
  I("Omar Abdullah",         "INC","e7",["pm","leader","foreign"],                            [54,60,55,52,52], "NC J&K CM; Farooq's son");

  /* ═══════════════════════════════════════════════════════════════
     PAKISTAN
     ═══════════════════════════════════════════════════════════════ */
  I("Muhammad Ali Jinnah",   "Muslim League (PK)","e3",["pm","foreign","leader"],             [72,72,72,72,68], "Pakistan's founding father; Quaid-e-Azam");
  I("Liaquat Ali Khan",      "Muslim League (PK)","e3",["pm","chancellor","foreign","leader"],[62,72,60,65,62], "Pakistan's first PM; assassinated 1951");
  I("Zulfikar Ali Bhutto",   "PPP (PK)","e5",["pm","chancellor","foreign","leader"],          [65,72,68,62,65], "PPP founder PM; executed 1979");
  I("Benazir Bhutto",        "PPP (PK)","e6",["pm","foreign","leader"],                       [65,72,65,62,65], "First female PM of Muslim nation; assassinated 2007");
  I("Asif Ali Zardari",      "PPP (PK)","e7",["pm","leader","chancellor"],                    [48,65,42,50,50], "PPP PM; Benazir's widower; corruption");
  I("Bilawal Bhutto Zardari","PPP (PK)","e7",["pm","foreign","leader"],                       [54,55,55,50,52], "PPP heir; foreign minister");
  I("Nawaz Sharif",          "PML-N","e6",["pm","chancellor","business","leader"],            [55,72,50,58,55], "PML-N PM three times; exiled and convicted");
  I("Shahbaz Sharif",        "PML-N","e7",["pm","leader","chancellor"],                       [55,68,50,55,55], "PML-N PM 2022–24; Nawaz's brother");
  I("Imran Khan",            "PTI","e7",["pm","foreign","leader"],                             [65,60,65,58,60], "PTI cricket icon turned PM; imprisoned");
  I("Pervez Musharraf",      "Muslim League (PK)","e6",["pm","defence","leader"],             [48,68,45,52,50], "Military PM 1999–2008; self-coup");
  I("Ayub Khan",             "Muslim League (PK)","e4",["pm","defence","leader"],             [45,68,40,50,45], "First military dictator; modernisation");
  I("Yahya Khan",            "Muslim League (PK)","e4",["pm","defence","leader"],             [35,62,30,38,38], "Military PM; East Pakistan catastrophe");
  I("Zia ul-Haq",            "Muslim League (PK)","e5",["pm","defence","leader"],             [38,65,35,42,42], "Military PM; Islamisation; hanged Bhutto");
  I("Ghulam Ishaq Khan",     "Muslim League (PK)","e5",["pm","chancellor","leader"],          [45,68,40,50,45], "President who dismissed two PMs");
  I("Fazlur Rehman",         "ANP (PK)","e6",["pm","foreign","leader"],                       [48,65,48,48,50], "JUI religious party leader; coalition king");
  I("Asfandyar Wali Khan",   "ANP (PK)","e7",["pm","leader"],                                  [50,60,50,50,50], "ANP Pashtun nationalist leader");

  /* ═══════════════════════════════════════════════════════════════
     BANGLADESH
     ═══════════════════════════════════════════════════════════════ */
  I("Sheikh Mujibur Rahman", "Awami League","e4",["pm","leader","foreign"],                   [68,68,72,62,65], "Bangladesh's founding father; assassinated 1975");
  I("Sheikh Hasina",         "Awami League","e6",["pm","leader","chancellor"],                [58,72,55,60,60], "Awami League PM 1996–2001, 2009–24; fled coup");
  I("Ziaur Rahman",          "BNP (BD)","e5",["pm","defence","leader"],                       [50,65,45,52,50], "BNP founder; military PM; assassinated 1981");
  I("Khaleda Zia",           "BNP (BD)","e6",["pm","leader"],                                  [50,65,48,52,50], "BNP PM twice; Ziaur's widow; imprisoned");
  I("Muhammad Yunus",        "BNP (BD)","e7",["chancellor","work","business"],                [62,62,58,60,48], "Grameen Bank Nobel laureate; interim PM 2024");
  I("Tarique Rahman",        "BNP (BD)","e7",["leader","pm"],                                  [42,50,42,42,48], "BNP heir; convicted in absentia; in exile");
  I("Moudud Ahmed",          "BNP (BD)","e6",["justice","pm","leader"],                       [50,62,48,50,50], "BNP law minister");

  /* ═══════════════════════════════════════════════════════════════
     AUSTRALIA
     ═══════════════════════════════════════════════════════════════ */
  I("John Curtin",           "Australian Labor","e3",["pm","defence","leader"],               [65,72,62,68,65], "ALP wartime PM; pivoted from Britain to USA");
  I("Ben Chifley",           "Australian Labor","e3",["pm","chancellor","work","leader"],     [60,72,58,62,62], "ALP PM; welfare state and bank nationalisation");
  I("Gough Whitlam",         "Australian Labor","e5",["pm","foreign","health","education","leader"],[70,72,72,65,65], "ALP PM; dismissed 1975; reformist wave");
  I("Bob Hawke",             "Australian Labor","e5",["pm","work","chancellor","leader"],     [72,78,72,70,72], "ALP PM; Accord; floating the dollar");
  I("Paul Keating",          "Australian Labor","e6",["pm","chancellor","foreign","leader"],  [65,78,70,70,68], "ALP PM; recession 'we had to have'; reconciliation");
  I("Kevin Rudd",            "Australian Labor","e7",["pm","foreign","chancellor","leader"],  [60,68,60,62,58], "ALP PM 2007–10, 2013; Apology to Stolen Generations");
  I("Julia Gillard",         "Australian Labor","e7",["pm","education","work","leader"],      [60,68,58,62,58], "First female Australian PM 2010–13");
  I("Anthony Albanese",      "Australian Labor","e7",["pm","transport","leader"],             [60,70,58,62,60], "ALP PM from 2022");
  I("Robert Menzies",        "Liberal (AU)","e3",["pm","leader","foreign"],                   [65,80,62,70,68], "Liberal PM 1939–41, 1949–66; Liberal Party founder");
  I("Harold Holt",           "Liberal (AU)","e4",["pm","chancellor","leader"],                [60,72,58,62,58], "Liberal PM; 'All the way with LBJ'; disappeared 1967");
  I("John Gorton",           "Liberal (AU)","e4",["pm","leader"],                             [58,70,58,58,55], "Liberal PM 1968–71; Australian nationalist");
  I("Malcolm Fraser",        "Liberal (AU)","e5",["pm","foreign","leader"],                   [58,75,55,62,58], "Liberal PM; dismissed Whitlam; later human rights advocate");
  I("John Howard",           "Liberal (AU)","e6",["pm","chancellor","trade","leader"],        [60,78,55,68,65], "Liberal PM 1996–2007; WorkChoices; Tampa affair");
  I("Tony Abbott",           "Liberal (AU)","e7",["pm","health","immigration","leader"],      [52,68,52,55,55], "Liberal PM 2013–15; budget cuts and TPVs");
  I("Malcolm Turnbull",      "Liberal (AU)","e7",["pm","chancellor","leader"],                [60,68,58,62,55], "Liberal PM 2015–18; moderate ousted by right");
  I("Scott Morrison",        "Liberal (AU)","e7",["pm","immigration","chancellor","leader"],  [50,62,50,52,52], "Liberal PM 2018–22; Covid and fires criticism");
  I("Peter Dutton",          "Liberal (AU)","e7",["pm","home","defence","leader"],            [48,65,45,50,50], "Liberal leader from 2022; hawkish hardliner");
  I("Bob Brown",             "Greens (AU)","e6",["leader","environment","pm"],               [62,65,60,58,58], "Greens founder; Tasmanian wilderness champion");
  I("Christine Milne",       "Greens (AU)","e7",["leader","environment","pm"],               [58,62,58,55,56], "Greens leader 2012–15");
  I("Richard Marles",        "Australian Labor","e7",["defence","deputy","pm"],              [54,60,52,54,54], "ALP deputy PM and defence minister");

  /* ═══════════════════════════════════════════════════════════════
     CANADA
     ═══════════════════════════════════════════════════════════════ */
  I("Wilfrid Laurier",       "Liberal (CA)","e1",["pm","foreign","leader"],                   [68,78,68,68,65], "First French-Canadian PM; Canadian unity architect");
  I("W.L. Mackenzie King",   "Liberal (CA)","e2",["pm","work","foreign","leader"],           [60,82,55,72,68], "Longest-serving Canadian PM; WWII alliance");
  I("Louis St. Laurent",     "Liberal (CA)","e3",["pm","foreign","justice","leader"],         [60,75,55,65,60], "Liberal PM; NATO founder; Canadian flag advocate");
  I("Lester Pearson",        "Liberal (CA)","e4",["pm","foreign","leader"],                   [65,78,60,68,62], "Nobel Peace Prize; peacekeeping; Canadian flag");
  I("Pierre Trudeau",        "Liberal (CA)","e4",["pm","foreign","justice","leader"],         [70,78,70,72,68], "Liberal PM; Charter of Rights; Just Society");
  I("John Turner",           "Liberal (CA)","e5",["pm","chancellor","leader"],                [58,70,58,58,55], "Liberal PM 1984; brief tenure");
  I("Jean Chrétien",         "Liberal (CA)","e6",["pm","chancellor","leader"],               [62,78,60,68,65], "Liberal PM 1993–2003; debt elimination; opposed Iraq War");
  I("Paul Martin",           "Liberal (CA)","e7",["pm","chancellor","leader"],               [58,75,52,62,58], "Liberal PM 2003–06; Sponsorship scandal");
  I("Justin Trudeau",        "Liberal (CA)","e7",["pm","leader","chancellor"],               [62,65,65,58,60], "Liberal PM 2015–25; son of Pierre");
  I("Mark Carney",           "Liberal (CA)","e7",["pm","chancellor","business","leader"],    [60,68,58,65,56], "Liberal PM from 2025; former Bank of England governor");
  I("John Diefenbaker",      "Conservative (CA)","e4",["pm","justice","foreign","leader"],   [60,72,60,60,58], "PC PM 1957–63; Bill of Rights");
  I("Joe Clark",             "Conservative (CA)","e5",["pm","foreign","leader"],             [55,65,52,55,52], "PC PM 1979–80; youngest Canadian PM at time");
  I("Brian Mulroney",        "Conservative (CA)","e5",["pm","trade","foreign","leader"],     [60,75,60,65,62], "PC PM; NAFTA; Meech Lake; GST");
  I("Kim Campbell",          "Conservative (CA)","e6",["pm","justice","defence","leader"],   [55,62,55,55,52], "Canada's first and only female PM");
  I("Stephen Harper",        "Conservative (CA)","e7",["pm","chancellor","leader"],          [55,72,50,62,58], "CPC PM 2006–15; economic conservatism");
  I("Andrew Scheer",         "Conservative (CA)","e7",["pm","leader"],                        [48,58,48,48,50], "CPC leader 2017–20");
  I("Erin O'Toole",          "Conservative (CA)","e7",["pm","defence","leader"],             [50,58,50,50,50], "CPC leader 2020–22");
  I("Pierre Poilievre",      "Conservative (CA)","e7",["pm","chancellor","leader"],          [58,62,60,55,60], "CPC leader from 2022; populist right");
  I("Tommy Douglas",         "CCF (CA)","e4",["pm","health","work","leader"],               [70,72,72,65,68], "CCF/NDP founder; father of Canadian Medicare");
  I("Ed Broadbent",          "NDP (CA)","e5",["pm","work","leader","foreign"],              [62,70,62,60,60], "NDP leader 1975–89");
  I("Jack Layton",           "NDP (CA)","e7",["pm","work","leader","health"],              [68,70,68,62,65], "NDP leader 2003–11; died in office at peak power");
  I("Thomas Mulcair",        "NDP (CA)","e7",["pm","justice","environment","leader"],      [60,68,60,58,58], "NDP leader 2012–17");
  I("Jagmeet Singh",         "NDP (CA)","e7",["pm","work","justice","leader"],             [60,62,62,55,58], "NDP leader from 2017; supply-and-confidence");
  I("Lucien Bouchard",       "Bloc Québécois","e6",["pm","foreign","leader"],              [65,72,68,62,62], "BQ founder; nearly won 1995 Quebec referendum");
  I("Gilles Duceppe",        "Bloc Québécois","e7",["pm","leader"],                         [60,70,60,60,58], "BQ leader 1997–2011, 2015");
  I("Yves-François Blanchet","Bloc Québécois","e7",["pm","culture","environment","leader"],[55,60,55,52,54], "BQ leader from 2019");

})();

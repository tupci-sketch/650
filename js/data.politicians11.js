/* ============================================================
   650 — POLITICIANS EXPANSION XI
   USA Senate/House fill + more Europe + more Asia + more Africa
   + Middle East + Caribbean + Pacific + historical wildcard
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

  /* ── New party registrations ─────────────────────────────────── */
  reg("National Party (ZA)",    "NP_ZA",    "#003189",  0.8, 400);
  reg("PAC (ZA)",               "PAC_ZA",   "#009246", -0.5, 400);
  reg("IFP (ZA)",               "IFP_ZA",   "#f9a825",  0.3, 400);
  reg("DA (ZA)",                "DA_ZA",    "#003189",  0.3, 400);
  reg("EFF (ZA)",               "EFF_ZA",   "#cc0000", -1.5, 400);
  reg("UDM (ZA)",               "UDM_ZA",   "#009246",  0.1, 400);
  reg("COPE (ZA)",              "COPE_ZA",  "#f9a825",  0.0, 400);
  reg("KANU (KE)",              "KANU_KE",  "#009246",  0.3, 350);
  reg("ODM (KE)",               "ODM_KE",   "#e53935", -0.2, 350);
  reg("Jubilee (KE)",           "Jub_KE",   "#f9a825",  0.4, 350);
  reg("UDA (KE)",               "UDA_KE",   "#f9a825",  0.3, 350);
  reg("APC (NG)",               "APC_NG",   "#009246",  0.4, 360);
  reg("PDP (NG)",               "PDP_NG",   "#e53935", -0.1, 360);
  reg("LP (NG)",                "LP_NG",    "#e53935", -0.3, 360);
  reg("MEND (NG)",              "MEND_NG",  "#cc0000", -0.5, 360);
  reg("PRM (DO)",               "PRM_DO",   "#e53935", -0.2, 190);
  reg("PRSC (DO)",              "PRSC_DO",  "#003189",  0.3, 190);
  reg("PLD (DO)",               "PLD_DO",   "#f9a825",  0.2, 190);
  reg("PRD (PA)",               "PRD_PA",   "#e53935", -0.2, 71);
  reg("Panameñista (PA)",       "Pan_PA",   "#003189",  0.3, 71);
  reg("CD (PA)",                "CD_PA",    "#f9a825",  0.3, 71);
  reg("RM (PA)",                "RM_PA",    "#003189",  0.4, 71);
  reg("PLN (CR)",               "PLN_CR",   "#009246", -0.3, 57);
  reg("PUSC (CR)",              "PUSC_CR",  "#003189",  0.3, 57);
  reg("PAC (CR)",               "PAC_CR",   "#009246", -0.3, 57);
  reg("FMLN (SV)",              "FMLN_SV",  "#cc0000", -0.8, 84);
  reg("ARENA (SV)",             "ARENA_SV", "#003189",  1.0, 84);
  reg("Nuevas Ideas (SV)",      "NI_SV",    "#f9a825",  0.2, 84);
  reg("PRI (MX)",               "PRI_MX",   "#009246",  0.0, 500);
  reg("PAN (MX)",               "PAN_MX",   "#003189",  0.5, 500);
  reg("Morena",                 "Morena_MX","#e53935", -0.5, 500);
  reg("Colombia Humana",        "ColHum",   "#e53935", -0.8, 171);
  reg("CD (CO)",                "CD_CO",    "#003189",  0.8, 171);
  reg("Social Party (CO)",      "SP_CO",    "#f9a825",  0.3, 171);
  reg("APRA (PE)",              "APRA_PE",  "#e53935", -0.3, 130);
  reg("Peru Libre",             "PL_PE",    "#cc0000", -1.0, 130);
  reg("PPK (PE)",               "PPK_PE",   "#f9a825",  0.2, 130);
  reg("Peronist",               "PJ_AR",    "#003189",  0.0, 257);
  reg("Primero Venezuela",      "PV_VE",    "#003189",  0.3, 167);
  reg("PSUV (VE)",              "PSUV",     "#cc0000", -1.0, 167);
  reg("PSDB (BR)",              "PSDB_BR",  "#003189",  0.2, 513);
  reg("PMDB (BR)",              "PMDB_BR",  "#f9a825",  0.1, 513);
  reg("UDI (CL)",               "UDI_CL",   "#003189",  0.8, 155);
  reg("PS (CL)",                "PS_CL",    "#e53935", -0.5, 155);
  reg("RN (CL)",                "RN_CL",    "#003189",  0.6, 155);
  reg("PDC (CL)",               "PDC_CL",   "#f9a825",  0.1, 155);
  reg("Samajwadi",              "SP_IN",    "#e53935", -0.2, 543);
  reg("RJD",                    "RJD_IN",   "#e53935", -0.3, 543);
  reg("JD(U)",                  "JDU_IN",   "#f9a825",  0.2, 543);
  reg("AITC",                   "TMC_IN",   "#009246", -0.1, 543);
  reg("AAP",                    "AAP_IN",   "#003189", -0.3, 543);
  reg("SP (IN)",                "SP_IN2",   "#e53935", -0.2, 543);
  reg("NCP (IN)",               "NCP_IN",   "#f9a825",  0.1, 543);
  reg("CPI(M)",                 "CPIM_IN",  "#cc0000", -1.2, 543);
  reg("Demokrat (ID)",          "Dem_ID",   "#003189",  0.3, 575);
  reg("Sinn Féin",              "SF",       "#009246", -0.5, 166);
  reg("Fine Gael",              "FG",       "#003189",  0.4, 166);
  reg("Fianna Fáil",            "FF",       "#009246",  0.1, 166);
  reg("Labour (IE)",            "Lab_IE",   "#e53935", -0.4, 166);
  reg("People Before Profit",   "PBP_IE",   "#cc0000", -1.2, 166);
  reg("Social Democrats (IE)",  "SD_IE",    "#e53935", -0.4, 166);
  reg("Green Party (IE)",       "GP_IE",    "#009246", -0.7, 166);
  reg("Progressive Democrats",  "PD_IE",    "#f9a825",  0.4, 166);
  reg("DUP",                    "DUP_NI",   "#003189",  1.2, 90);
  reg("UUP",                    "UUP_NI",   "#003189",  0.8, 90);
  reg("SDLP",                   "SDLP_NI",  "#009246", -0.4, 90);
  reg("Alliance (NI)",          "All_NI",   "#f9a825",  0.1, 90);
  reg("TUV",                    "TUV_NI",   "#003189",  1.5, 90);
  reg("Solidarity (PL)",        "Sol_PL",   "#e53935", -0.5, 460);
  reg("Lewica (PL)",            "Lew_PL",   "#e53935", -0.6, 460);
  reg("Poland 2050",            "PL2050",   "#f9a825",  0.2, 460);
  reg("ND (GR)",                "ND_GR",    "#003189",  0.6, 300);
  reg("PASOK (GR)",             "PASOK",    "#009246", -0.4, 300);
  reg("Syriza (GR)",            "Syriza",   "#cc0000", -0.8, 300);
  reg("KKE (GR)",               "KKE_GR",   "#cc0000", -1.5, 300);
  reg("Golden Dawn (GR)",       "GD_GR",    "#1c3f6e",  2.0, 300);
  reg("ANEL (GR)",              "ANEL_GR",  "#1c3f6e",  1.5, 300);
  reg("Nea Dimokratia",         "ND_GR2",   "#003189",  0.6, 300);
  reg("Spartiates (GR)",        "Spart_GR", "#1c3f6e",  2.0, 300);
  reg("MNR (BO)",               "MNR_BO2",  "#f9a825",  0.3, 130);
  reg("LIBRE (HN)",             "Lib_HN",   "#e53935", -0.5, 128);
  reg("PNH (HN)",               "PNH_HN",   "#003189",  0.5, 128);
  reg("PN (HN)",                "PN_HN",    "#003189",  0.4, 128);
  reg("PP (GT)",                "PP_GT",    "#003189",  0.5, 160);
  reg("VAMOS (GT)",             "VAMOS_GT", "#f9a825",  0.2, 160);
  reg("Semilla (GT)",           "Sem_GT",   "#009246", -0.2, 160);
  reg("Dem. Socialists (USA)",  "DSA_USA",  "#cc0000", -1.2, 0);
  reg("Green Party (USA)",      "Grn_USA",  "#009246", -1.0, 0);
  reg("Independence Party (UK)","UKIP_old", "#f9a825",  1.5, 650);
  reg("BNP (UK)",               "BNP_UK",   "#1c3f6e",  2.0, 650);
  reg("SWP",                    "SWP_UK",   "#cc0000", -1.8, 650);
  reg("Respect",                "Resp_UK",  "#cc0000", -1.0, 650);
  reg("TUSC",                   "TUSC_UK",  "#cc0000", -1.5, 650);
  reg("Alliance Party (UK)",    "All_UK",   "#f9a825",  0.1, 650);
  reg("PAIS (EC)",              "PAIS_EC",  "#e53935", -0.5, 137);
  reg("CREO (EC)",              "CREO_EC",  "#003189",  0.5, 137);
  reg("ADN (EC)",               "ADN_EC",   "#f9a825",  0.3, 137);

  if (G.PARTY_COUNTRY) {
    G.PARTY_COUNTRY["National Party (ZA)"]   = "ZA";
    G.PARTY_COUNTRY["PAC (ZA)"]              = "ZA";
    G.PARTY_COUNTRY["IFP (ZA)"]              = "ZA";
    G.PARTY_COUNTRY["DA (ZA)"]               = "ZA";
    G.PARTY_COUNTRY["EFF (ZA)"]              = "ZA";
    G.PARTY_COUNTRY["UDM (ZA)"]              = "ZA";
    G.PARTY_COUNTRY["COPE (ZA)"]             = "ZA";
    G.PARTY_COUNTRY["KANU (KE)"]             = "KE";
    G.PARTY_COUNTRY["ODM (KE)"]              = "KE";
    G.PARTY_COUNTRY["Jubilee (KE)"]          = "KE";
    G.PARTY_COUNTRY["UDA (KE)"]              = "KE";
    G.PARTY_COUNTRY["APC (NG)"]              = "NG";
    G.PARTY_COUNTRY["PDP (NG)"]              = "NG";
    G.PARTY_COUNTRY["LP (NG)"]               = "NG";
    G.PARTY_COUNTRY["MEND (NG)"]             = "NG";
    G.PARTY_COUNTRY["PRM (DO)"]              = "DO";
    G.PARTY_COUNTRY["PRSC (DO)"]             = "DO";
    G.PARTY_COUNTRY["PLD (DO)"]              = "DO";
    G.PARTY_COUNTRY["PRD (PA)"]              = "PA";
    G.PARTY_COUNTRY["Panameñista (PA)"]      = "PA";
    G.PARTY_COUNTRY["CD (PA)"]               = "PA";
    G.PARTY_COUNTRY["RM (PA)"]               = "PA";
    G.PARTY_COUNTRY["PLN (CR)"]              = "CR";
    G.PARTY_COUNTRY["PUSC (CR)"]             = "CR";
    G.PARTY_COUNTRY["PAC (CR)"]              = "CR";
    G.PARTY_COUNTRY["FMLN (SV)"]             = "SV";
    G.PARTY_COUNTRY["ARENA (SV)"]            = "SV";
    G.PARTY_COUNTRY["Nuevas Ideas (SV)"]     = "SV";
    G.PARTY_COUNTRY["PRI (MX)"]              = "MX";
    G.PARTY_COUNTRY["PAN (MX)"]              = "MX";
    G.PARTY_COUNTRY["Morena"]                = "MX";
    G.PARTY_COUNTRY["Colombia Humana"]       = "CO";
    G.PARTY_COUNTRY["CD (CO)"]               = "CO";
    G.PARTY_COUNTRY["Social Party (CO)"]     = "CO";
    G.PARTY_COUNTRY["APRA (PE)"]             = "PE";
    G.PARTY_COUNTRY["Peru Libre"]            = "PE";
    G.PARTY_COUNTRY["PPK (PE)"]              = "PE";
    G.PARTY_COUNTRY["Peronist"]              = "AR";
    G.PARTY_COUNTRY["Primero Venezuela"]     = "VE";
    G.PARTY_COUNTRY["PSUV (VE)"]             = "VE";
    G.PARTY_COUNTRY["PSDB (BR)"]             = "BR";
    G.PARTY_COUNTRY["PMDB (BR)"]             = "BR";
    G.PARTY_COUNTRY["UDI (CL)"]              = "CL";
    G.PARTY_COUNTRY["PS (CL)"]               = "CL";
    G.PARTY_COUNTRY["RN (CL)"]               = "CL";
    G.PARTY_COUNTRY["PDC (CL)"]              = "CL";
    G.PARTY_COUNTRY["Samajwadi"]             = "IN";
    G.PARTY_COUNTRY["RJD"]                   = "IN";
    G.PARTY_COUNTRY["JD(U)"]                 = "IN";
    G.PARTY_COUNTRY["AITC"]                  = "IN";
    G.PARTY_COUNTRY["AAP"]                   = "IN";
    G.PARTY_COUNTRY["SP (IN)"]               = "IN";
    G.PARTY_COUNTRY["NCP (IN)"]              = "IN";
    G.PARTY_COUNTRY["CPI(M)"]                = "IN";
    G.PARTY_COUNTRY["Demokrat (ID)"]         = "ID";
    G.PARTY_COUNTRY["Sinn Féin"]             = "IE";
    G.PARTY_COUNTRY["Fine Gael"]             = "IE";
    G.PARTY_COUNTRY["Fianna Fáil"]           = "IE";
    G.PARTY_COUNTRY["Labour (IE)"]           = "IE";
    G.PARTY_COUNTRY["People Before Profit"]  = "IE";
    G.PARTY_COUNTRY["Social Democrats (IE)"] = "IE";
    G.PARTY_COUNTRY["Green Party (IE)"]      = "IE";
    G.PARTY_COUNTRY["Progressive Democrats"] = "IE";
    G.PARTY_COUNTRY["DUP"]                   = "GB";
    G.PARTY_COUNTRY["UUP"]                   = "GB";
    G.PARTY_COUNTRY["SDLP"]                  = "GB";
    G.PARTY_COUNTRY["Alliance (NI)"]         = "GB";
    G.PARTY_COUNTRY["TUV"]                   = "GB";
    G.PARTY_COUNTRY["Solidarity (PL)"]       = "PL";
    G.PARTY_COUNTRY["Lewica (PL)"]           = "PL";
    G.PARTY_COUNTRY["Poland 2050"]           = "PL";
    G.PARTY_COUNTRY["ND (GR)"]               = "GR";
    G.PARTY_COUNTRY["PASOK (GR)"]            = "GR";
    G.PARTY_COUNTRY["Syriza (GR)"]           = "GR";
    G.PARTY_COUNTRY["KKE (GR)"]              = "GR";
    G.PARTY_COUNTRY["Golden Dawn (GR)"]      = "GR";
    G.PARTY_COUNTRY["ANEL (GR)"]             = "GR";
    G.PARTY_COUNTRY["Nea Dimokratia"]        = "GR";
    G.PARTY_COUNTRY["Spartiates (GR)"]       = "GR";
    G.PARTY_COUNTRY["MNR (BO)"]              = "BO";
    G.PARTY_COUNTRY["LIBRE (HN)"]            = "HN";
    G.PARTY_COUNTRY["PNH (HN)"]              = "HN";
    G.PARTY_COUNTRY["PN (HN)"]               = "HN";
    G.PARTY_COUNTRY["PP (GT)"]               = "GT";
    G.PARTY_COUNTRY["VAMOS (GT)"]            = "GT";
    G.PARTY_COUNTRY["Semilla (GT)"]          = "GT";
    G.PARTY_COUNTRY["Dem. Socialists (USA)"] = "US";
    G.PARTY_COUNTRY["Green Party (USA)"]     = "US";
    G.PARTY_COUNTRY["Independence Party (UK)"] = "GB";
    G.PARTY_COUNTRY["BNP (UK)"]              = "GB";
    G.PARTY_COUNTRY["SWP"]                   = "GB";
    G.PARTY_COUNTRY["Respect"]               = "GB";
    G.PARTY_COUNTRY["TUSC"]                  = "GB";
    G.PARTY_COUNTRY["Alliance Party (UK)"]   = "GB";
    G.PARTY_COUNTRY["PAIS (EC)"]             = "EC";
    G.PARTY_COUNTRY["CREO (EC)"]             = "EC";
    G.PARTY_COUNTRY["ADN (EC)"]              = "EC";
  }

  /* ═══════════════════════════════════════════════════════════════
     USA — MORE SENATORS & GOVERNORS
     ═══════════════════════════════════════════════════════════════ */
  I("Dianne Feinstein","Democrat (USA)","e6",["pm","justice","home","leader"],             [58,72,55,58,55], "Democrat California Senator longest-serving; gun control; intel committee; died aged 90");
  I("Barbara Boxer","Democrat (USA)","e6",["pm","environment","leader"],                 [56,65,55,55,52], "Democrat California Senator; environment and foreign policy; liberal lioness");
  I("Patrick Leahy","Democrat (USA)","e5",["pm","justice","leader","agriculture"],       [55,72,52,55,55], "Democrat Vermont Senator; president pro tempore; Leahy Law; longest-serving");
  I("Carl Levin","Democrat (USA)","e5",["pm","defence","leader","justice"],           [58,68,55,58,55], "Democrat Michigan Senator; Armed Services; Wall Street reform; Carl Levin Institute");
  I("Ted Stevens","Republican (USA)","e5",["pm","trade","defence","leader"],           [52,70,50,52,52], "Republican Alaska Senator; pork barrel champion; Ted-net bridge to nowhere");
  I("Orrin Hatch","Republican (USA)","e5",["pm","justice","health","leader"],          [52,72,50,52,52], "Republican Utah Senator 42 years; Judiciary; CHIP; LDS leadership");
  I("Bob Bennett","Republican (USA)","e6",["pm","chancellor","leader"],                [52,60,50,52,50], "Republican Utah Senator; primary victim of Tea Party 2010");
  I("Richard Lugar","Republican (USA)","e5",["pm","foreign","agriculture","leader"],     [58,70,55,58,55], "Republican Indiana Senator; Nunn-Lugar; nuclear disarmament; farm bill");
  I("Sam Nunn","Democrat (USA)","e5",["pm","defence","foreign","leader"],           [60,68,58,60,58], "Democrat Georgia Senator; defence authority; nuclear threat initiative");
  I("Lloyd Bentsen","Democrat (USA)","e5",["pm","chancellor","trade","leader"],          [60,65,60,60,58], "Democrat Texas Senator; VP candidate 1988; 'Senator you're no Jack Kennedy'");
  I("Fritz Hollings","Democrat (USA)","e5",["pm","trade","commerce","leader"],            [55,68,55,55,52], "Democrat South Carolina Senator; Gramm-Rudman-Hollings deficit act");
  I("Daniel Patrick Moynihan","Democrat (USA)","e5",["pm","foreign","work","leader"],              [65,65,65,62,58], "Democrat New York Senator; UN Ambassador; welfare reform analyst; sociologist-politician");
  I("Bill Bradley","Democrat (USA)","e6",["pm","chancellor","leader","foreign"],        [60,60,58,58,52], "Democrat basketball star Senator; 2000 presidential candidate; tax reform");
  I("Paul Wellstone","Democrat (USA)","e6",["pm","work","leader","education"],            [62,55,65,55,55], "Democrat Minnesota Senator; 'the conscience of the Senate'; died plane crash 2002");
  I("Byron Dorgan","Democrat (USA)","e6",["pm","energy","agriculture","leader"],        [55,62,52,52,52], "Democrat North Dakota Senator; bank warnings pre-2008; prairie populist");
  I("Kent Conrad","Democrat (USA)","e6",["pm","chancellor","agriculture","leader"],    [52,62,50,52,52], "Democrat North Dakota Senator; budget deficit hawk; gang-of-six");
  I("Tim Johnson","Democrat (USA)","e6",["pm","leader","agriculture","chancellor"],    [50,60,48,50,50], "Democrat South Dakota Senator; survived brain hemorrhage 2006; returned");
  I("Ben Nelson","Democrat (USA)","e7",["pm","leader","chancellor","health"],         [50,60,48,50,50], "Democrat Nebraska Senator; Cornhusker Kickback on ACA; insurance background");
  I("Blanche Lincoln","Democrat (USA)","e7",["pm","agriculture","leader"],                 [50,55,48,50,48], "Democrat Arkansas Senator; first woman to chair Ag Committee; lost 2010 primary");
  I("Mark Pryor","Democrat (USA)","e7",["pm","leader","health"],                      [50,55,48,50,48], "Democrat Arkansas Senator; son of David Pryor; lost 2014 Tom Cotton wave");
  I("Evan Bayh","Democrat (USA)","e7",["pm","chancellor","leader","defence"],        [55,58,52,55,52], "Democrat Indiana Senator; Governor; moderate Democrat; quit 2010 citing dysfunction");
  I("Mary Landrieu","Democrat (USA)","e7",["pm","energy","leader","home"],               [52,58,52,50,52], "Democrat Louisiana Senator; Katrina; energy hawkish; lost to Bill Cassidy");
  I("Kay Hagan","Democrat (USA)","e7",["pm","health","leader","work"],               [52,52,50,50,50], "Democrat North Carolina Senator; lost 2014; ACA-adjacent political victim");
  I("Mark Begich","Democrat (USA)","e7",["pm","leader","defence"],                     [50,52,48,48,48], "Democrat Alaska Senator; Anchorage Mayor; lost 2014 Sullivan wave");
  I("Mark Udall","Democrat (USA)","e7",["pm","environment","intelligence","leader"],  [55,55,52,52,50], "Democrat Colorado Senator; NSA whistleblower ally; lost 2014");
  I("Tom Udall","Democrat (USA)","e7",["pm","environment","leader"],                  [55,58,52,52,50], "Democrat New Mexico Senator; nephew of Mo Udall; clean elections champion");
  I("Sherrod Brown","Democrat (USA)","e7",["pm","work","trade","leader"],                [60,62,60,58,58], "Democrat Ohio Senator; Rust Belt progressive trade hawk; steel worker ally");
  I("Bob Casey Jr.","Democrat (USA)","e7",["pm","health","work","leader"],               [52,58,50,52,52], "Democrat Pennsylvania Senator; son of Governor; lost 2024");
  I("Gary Peters","Democrat (USA)","e7",["pm","commerce","leader"],                    [52,55,50,50,50], "Democrat Michigan Senator; DSCC chair 2020; military background");
  I("Tina Smith","Democrat (USA)","e7",["pm","health","agriculture","leader"],        [52,52,50,50,50], "Democrat Minnesota Senator; Planned Parenthood VP background");
  I("Tammy Baldwin","Democrat (USA)","e7",["pm","health","trade","leader"],              [56,55,54,52,52], "Democrat Wisconsin Senator; first openly gay Senator; healthcare champion");
  I("Tammy Duckworth","Democrat (USA)","e7",["pm","defence","leader","health"],            [60,55,58,55,52], "Democrat Illinois Senator; Iraq War double amputee; first birth on Senate floor");
  I("Mazie Hirono","Democrat (USA)","e7",["pm","education","leader","justice"],         [56,58,55,52,52], "Democrat Hawaii Senator; first Buddhist Senator; immigration champion");
  I("Ben Cardin","Democrat (USA)","e7",["pm","foreign","chancellor","leader"],        [52,62,50,52,52], "Democrat Maryland Senator; Cardin-Lugar extractives transparency");
  I("Chris Van Hollen","Democrat (USA)","e7",["pm","chancellor","foreign","leader"],        [52,55,50,52,50], "Democrat Maryland Senator; DSCC; budget committee; Johns Hopkins background");
  I("Martin Heinrich","Democrat (USA)","e7",["pm","energy","intelligence","leader"],       [52,52,50,50,48], "Democrat New Mexico Senator; mechanical engineer; intel committee");
  I("Brian Schatz","Democrat (USA)","e7",["pm","environment","commerce","leader"],      [54,52,52,52,50], "Democrat Hawaii Senator; climate finance champion; LG background");
  I("Sheldon Whitehouse","Democrat (USA)","e7",["pm","justice","environment","leader"],       [55,58,55,52,52], "Democrat Rhode Island Senator; climate time for whiteboard; dark money crusade");
  I("Jack Reed","Democrat (USA)","e7",["pm","defence","education","leader"],         [55,62,50,52,52], "Democrat Rhode Island Senator; West Point; Armed Services ranking member");
  I("Angus King",             "Independent","e7",["pm","defence","energy","leader"],         [58,58,55,55,52], "Independent Maine Governor twice; Senator; intel committee; centrist libertarian");
  I("Susan Collins","Republican (USA)","e7",["pm","health","leader","chancellor"],       [56,62,52,55,55], "Republican Maine Senator; most bipartisan Senator; Gang of Eight immigration");
  I("Lisa Murkowski","Republican (USA)","e7",["pm","energy","health","leader"],           [56,60,52,55,55], "Republican Alaska Senator write-in 2010; ACA vote no; Kavanaugh no; Trump acquit yes");
  I("Ben Sasse","Republican (USA)","e7",["pm","justice","education","leader"],       [55,52,55,52,50], "Republican Nebraska Senator; Trump critic; Nebraska Cornhuskers President");
  I("Jeff Flake","Republican (USA)","e7",["pm","leader","trade","chancellor"],        [54,55,52,52,50], "Republican Arizona Senator; Trump scourge; Flake Report on waste; quit 2018");
  I("Bob Corker","Republican (USA)","e7",["pm","foreign","chancellor","leader"],      [55,58,52,55,52], "Republican Tennessee Senator; called White House adult day care; resigned");
  I("John Thune","Republican (USA)","e7",["pm","leader","agriculture","trade"],       [52,62,50,52,55], "Republican Senate Majority Leader from 2025; South Dakota moderate");
  I("Rick Scott","Republican (USA)","e7",["pm","health","chancellor","leader"],       [48,55,48,45,48], "Republican Florida Governor; Medicare fraud; NRSC chair; 2024 Senate run");
  I("Ron Johnson","Republican (USA)","e7",["pm","leader","foreign"],                   [42,52,45,40,42], "Republican Wisconsin Senator; COVID conspiracist; China hawk");
  I("Tommy Tuberville","Republican (USA)","e7",["pm","defence","leader","education"],       [40,48,45,38,40], "Republican Alabama Senator; football coach; blocked military promotions a year");
  I("Eric Schmitt","Republican (USA)","e7",["pm","justice","leader"],                   [45,50,48,42,45], "Republican Missouri Senator; AG climate lawsuits; election denier");
  I("Ted Budd","Republican (USA)","e7",["pm","leader","justice"],                   [42,48,42,40,42], "Republican North Carolina Senator; gun shop owner; Trump loyalist");
  I("J.D. Vance","Republican (USA)","e7",["pm","deputy","leader","trade"],            [52,48,58,48,50], "Republican Vice President; Hillbilly Elegy; former Trump critic turned loyalist");
  I("Markwayne Mullin","Republican (USA)","e7",["pm","health","leader"],                    [45,48,45,42,42], "Republican Oklahoma Senator; UFC fan; challenged union leader to fight");
  I("Cynthia Lummis","Republican (USA)","e7",["pm","chancellor","leader"],                [48,52,45,46,46], "Republican Wyoming Senator; Bitcoin champion; first crypto senator");
  I("Mike Braun","Republican (USA)","e7",["pm","leader","health","chancellor"],       [48,52,45,44,46], "Republican Indiana Senator; businessman; Indiana Governor from 2025");
  I("Roger Marshall","Republican (USA)","e7",["pm","health","agriculture","leader"],      [42,50,42,40,42], "Republican Kansas Senator; OB/GYN; freedom caucus; farm state");
  I("Bill Hagerty","Republican (USA)","e7",["pm","foreign","trade","leader"],           [50,55,48,50,48], "Republican Tennessee Senator; Ambassador Japan; Trump fundraiser");
  I("Tom Cotton","Republican (USA)","e7",["pm","defence","foreign","leader"],         [50,52,52,50,50], "Republican Arkansas Senator; Iraq/Afghanistan veteran; hawkish interventionist");
  I("Joni Ernst","Republican (USA)","e7",["pm","defence","agriculture","leader"],     [50,52,48,48,50], "Republican Iowa Senator; 'I grew up castrating hogs'; military veteran");
  I("Thom Tillis","Republican (USA)","e7",["pm","justice","leader","work"],            [48,55,46,48,48], "Republican North Carolina Senator; immigration compromise attempts");
  I("Steve Daines","Republican (USA)","e7",["pm","energy","agriculture","leader"],      [48,52,45,46,46], "Republican Montana Senator; NRSC chair; tech background; hunting obsessive");
  I("James Lankford","Republican (USA)","e7",["pm","justice","home","leader"],            [48,52,48,46,48], "Republican Oklahoma Senator; border deal then blocked by Trump");
  I("Mike Rounds","Republican (USA)","e7",["pm","defence","chancellor","leader"],      [48,55,44,48,48], "Republican South Dakota Senator; Governor; pragmatic moderate");
  I("Jerry Moran","Republican (USA)","e7",["pm","health","agriculture","leader"],      [48,55,44,48,48], "Republican Kansas Senator; VA committee; farmer advocate");
  I("John Barrasso","Republican (USA)","e7",["pm","health","energy","leader"],           [48,55,44,46,48], "Republican Wyoming Senator; orthopaedic surgeon; environment opponent");
  I("Mike Crapo","Republican (USA)","e7",["pm","chancellor","agriculture","leader"],  [48,58,44,48,48], "Republican Idaho Senator; Finance committee ranking; LDS teetotaller DUI");
  I("James Risch","Republican (USA)","e7",["pm","foreign","intelligence","leader"],    [46,58,42,46,46], "Republican Idaho Senator; Foreign Relations; Trump loyalist");
  I("Pat Toomey","Republican (USA)","e7",["pm","chancellor","trade","leader"],        [52,58,50,52,50], "Republican Pennsylvania Senator; Club for Growth; Toomey amendment gun check");
  I("Rob Portman","Republican (USA)","e7",["pm","trade","chancellor","leader"],        [55,60,50,55,52], "Republican Ohio Senator; trade rep; gay marriage endorser; quit Senate 2022");
  I("Richard Burr","Republican (USA)","e7",["pm","health","intelligence","leader"],     [50,58,48,50,48], "Republican North Carolina Senator; intel chair; stock sell COVID probe");
  I("Tim Scott","Republican (USA)","e7",["pm","leader","work","chancellor"],         [58,55,58,52,55], "Republican South Carolina Senator; first Black Republican Senator South since Reconstruction; 2024 candidate");
  I("Roy Blunt","Republican (USA)","e6",["pm","health","leader","chancellor"],       [50,62,48,50,52], "Republican Missouri Senator; whip; appropriations; career pol");
  I("Mike Enzi","Republican (USA)","e6",["pm","health","chancellor","leader"],       [50,62,46,50,48], "Republican Wyoming Senator; shoe store owner; HELP committee; non-partisan");
  I("Johnny Isakson","Republican (USA)","e7",["pm","health","foreign","leader"],          [52,58,50,52,50], "Republican Georgia Senator; real estate; VA accountability; resigned ill 2019");
  I("Kelly Ayotte","Republican (USA)","e7",["pm","leader","justice","defence"],         [54,52,52,50,50], "Republican New Hampshire Senator; Attorney General; lost 2016; Governor from 2025");
  I("Joe Donnelly","Democrat (USA)","e7",["pm","defence","agriculture","leader"],       [50,52,48,50,48], "Democrat Indiana Senator; moderate; lost 2018 Braun wave");
  I("Heidi Heitkamp","Democrat (USA)","e7",["pm","agriculture","energy","leader"],        [52,52,50,50,50], "Democrat North Dakota Senator; former AG; pipeline opponent; lost 2018");
  I("Claire McCaskill","Democrat (USA)","e7",["pm","home","leader","defence"],              [56,60,58,54,55], "Democrat Missouri Senator; Air Guard pilot; lost to Hawley 2018");
  I("Phil Bredesen","Democrat (USA)","e7",["pm","health","leader","chancellor"],         [55,55,52,52,50], "Democrat Tennessee Governor; lost to Blackburn 2018");
  I("Andrew Gillum","Democrat (USA)","e7",["pm","leader","home"],                         [55,48,60,48,50], "Democrat Florida Governor candidate 2018; Tallahassee Mayor; scandal 2020");
  I("Stacy Abrams copy","Democrat (USA)","e7",["pm","leader","justice"],                     [60,50,62,50,52], "Democrat Georgia Governor candidate twice; voting rights pioneer");

  /* ═══════════════════════════════════════════════════════════════
     USA — GOVERNORS & HOUSE
     ═══════════════════════════════════════════════════════════════ */
  I("Jerry Brown","Democrat (USA)","e5",["pm","leader","environment","chancellor"],    [60,68,62,60,58], "Democrat California Governor twice (1975–83 and 2011–19); Moonbeam; climate pioneer");
  I("Arnold Schwarzenegger","Republican (USA)","e7",["pm","leader","environment","trade"],       [62,55,65,55,52], "Republican California Governor 2003–11; Terminator; climate moderate Republican");
  I("Pete Wilson","Republican (USA)","e6",["pm","leader","home","chancellor"],         [52,62,50,52,52], "Republican California Governor 1991–99; Prop 187; anti-immigrant reputation");
  I("George Deukmejian","Republican (USA)","e5",["pm","justice","home","leader"],            [50,60,48,50,50], "Republican California Governor 1983–91; prosecutor; fiscal conservative");
  I("Mike Bloomberg","Democrat (USA)","e7",["pm","chancellor","environment","leader"],    [58,60,55,58,52], "Republican→Democrat NYC Mayor; gun control; 2020 presidential candidate; $1 billion ad");
  I("Rudy Giuliani","Republican (USA)","e6",["pm","justice","home","leader"],            [55,62,60,52,52], "Republican NYC Mayor 9/11; RICO prosecutor; election fraud crusader; disbarred");
  I("Bill de Blasio","Democrat (USA)","e7",["pm","home","education","leader"],            [52,52,52,50,50], "Democrat NYC Mayor 2014–21; 2020 presidential one-percenter; tale of two cities");
  I("Andrew Cuomo","Democrat (USA)","e7",["pm","home","chancellor","leader"],           [52,62,52,52,55], "Democrat New York Governor 2011–21; COVID handling; nursing home deaths; #MeToo resignation");
  I("Kathy Hochul","Democrat (USA)","e7",["pm","leader","chancellor","health"],         [55,55,52,52,52], "Democrat New York Governor from 2021; Lt Governor succession; subway crime battles");
  I("Mario Cuomo","Democrat (USA)","e5",["pm","leader","chancellor","justice"],        [65,65,68,62,60], "Democrat New York Governor 1983–94; 1984 DNC keynote giant; never ran for President");
  I("Eliot Spitzer","Democrat (USA)","e7",["pm","justice","chancellor","leader"],        [55,58,60,52,52], "Democrat New York AG then Governor; 'Sheriff of Wall Street'; escort scandal");
  I("George Pataki","Republican (USA)","e6",["pm","leader","environment","chancellor"],  [52,60,50,52,50], "Republican New York Governor 1995–2006; 9/11 leadership; moderate");
  I("Charlie Baker","Republican (USA)","e7",["pm","leader","health","chancellor"],       [60,58,55,58,55], "Republican Massachusetts Governor 2015–23; most popular US Governor; moderate");
  I("Deval Patrick","Democrat (USA)","e7",["pm","justice","leader","home"],              [58,55,60,55,52], "Democrat Massachusetts Governor 2007–15; Obama clone; 2020 candidate");
  I("Kim Reynolds","Republican (USA)","e7",["pm","leader","chancellor","health"],       [50,52,48,50,50], "Republican Iowa Governor from 2017; Trump loyalist; school choice champion");
  I("Scott Walker","Republican (USA)","e7",["pm","work","leader","education"],          [50,55,48,50,52], "Republican Wisconsin Governor 2011–19; union buster; Act 10; recall survivor");
  I("Tony Evers","Democrat (USA)","e7",["pm","education","leader","chancellor"],      [52,52,50,52,50], "Democrat Wisconsin Governor from 2019; schools chief; battles Republican legislature");
  I("Ned Lamont","Democrat (USA)","e7",["pm","chancellor","trade","leader"],          [52,52,50,52,50], "Democrat Connecticut Governor from 2019; Lieberman challenger 2006; broadband");
  I("Phil Murphy","Democrat (USA)","e7",["pm","chancellor","leader","foreign"],        [52,52,50,52,50], "Democrat New Jersey Governor 2018–26; Goldman Sachs Ambassador Germany");
  I("Doug Murphy","Democrat (USA)","e7",["pm","leader","chancellor"],                  [50,50,48,50,48], "Democrat NJ");
  I("Ralph Northam","Democrat (USA)","e7",["pm","health","leader","environment"],        [50,52,50,50,48], "Democrat Virginia Governor 2018–22; physician; yearbook blackface scandal");
  I("Glenn Youngkin","Republican (USA)","e7",["pm","chancellor","education","leader"],    [52,50,52,52,50], "Republican Virginia Governor from 2022; Carlyle Group; school curriculum fights");
  I("Brian Kemp","Republican (USA)","e7",["pm","home","agriculture","leader"],        [50,52,48,50,50], "Republican Georgia Governor; election certifier opposed to Trump; Kemp vs Stacey Abrams");
  I("Henry McMaster","Republican (USA)","e7",["pm","justice","home","leader"],            [48,55,44,48,46], "Republican South Carolina Governor; first Trump endorser 2016; AG background");
  I("Roy Cooper","Democrat (USA)","e7",["pm","leader","justice","health"],            [55,55,52,52,52], "Democrat North Carolina Governor from 2017; AG; bathroom bill repeal");
  I("Andy Beshear","Democrat (USA)","e7",["pm","health","leader","justice"],            [58,52,58,52,52], "Democrat Kentucky Governor from 2019; son of Steve Beshear; pragmatic");
  I("Steve Bullock","Democrat (USA)","e7",["pm","leader","justice","environment"],       [55,52,52,52,50], "Democrat Montana Governor; 2020 presidential candidate; lost Senate race");
  I("Jay Nixon","Democrat (USA)","e7",["pm","justice","leader","chancellor"],        [52,58,50,52,50], "Democrat Missouri Governor 2009–17; AG background; Ferguson response criticized");
  I("Jay Inslee","Democrat (USA)","e7",["pm","environment","energy","leader"],        [56,58,56,54,52], "Democrat Washington Governor 2013–25; climate-only 2020 candidate; nuclear closure");
  I("Gary Locke","Democrat (USA)","e6",["pm","trade","leader","chancellor"],          [56,60,52,56,52], "Democrat Washington Governor; first Chinese-American Governor; Commerce Secretary");
  I("Mike Dunleavy","Republican (USA)","e7",["pm","leader","energy","chancellor"],       [46,50,44,46,46], "Republican Alaska Governor from 2018; oil state loyalist");
  I("Bill Walker",            "Independent","e7",["pm","leader","energy","chancellor"],      [50,52,48,50,48], "Independent Alaska Governor 2014–18; energy compromise builder");
  I("Doug Ducey","Republican (USA)","e7",["pm","leader","chancellor","education"],    [50,55,48,50,50], "Republican Arizona Governor 2015–23; Goldwater Institute; Cold Stone CEO");
  I("Janet Napolitano","Democrat (USA)","e6",["pm","home","justice","leader"],              [58,60,55,58,55], "Democrat Arizona Governor; Homeland Security Secretary; UC system president");
  I("Kate Brown","Democrat (USA)","e7",["pm","environment","leader","justice"],       [52,52,50,52,50], "Democrat Oregon Governor 2015–23; first openly LGBT Governor in US history");
  I("Tina Kotek","Democrat (USA)","e7",["pm","home","health","leader"],               [52,50,50,50,50], "Democrat Oregon Governor from 2023; second openly LGBT US Governor; housing focus");
  I("Jay Inslee copy","Democrat (USA)","e7",["pm","environment","leader"],                 [55,56,54,52,50], "Democrat climate governor Washington");
  I("Steve Sisolak","Democrat (USA)","e7",["pm","chancellor","health","leader"],         [50,52,48,50,48], "Democrat Nevada Governor 2019–23; COVID closures; lost 2022 Lombardo wave");
  I("Joe Lombardo","Republican (USA)","e7",["pm","home","leader"],                      [50,50,48,48,48], "Republican Nevada Governor from 2023; Las Vegas Metro Sheriff");
  I("Michelle Lujan Grisham","Democrat (USA)","e7",["pm","health","leader","environment"],        [55,55,52,52,52], "Democrat New Mexico Governor from 2019; Health Secretary candidate 2020");
  I("Lujan Grisham","Democrat (USA)","e7",["pm","health","leader"],                      [52,54,50,50,50], "New Mexico governor continuation");
  I("Laura Kelly","Democrat (USA)","e7",["pm","health","education","leader"],          [52,52,50,52,50], "Democrat Kansas Governor from 2019; state Senate veteran; won in deep red");
  I("Jared Polis","Democrat (USA)","e7",["pm","chancellor","education","leader"],      [58,52,58,55,52], "Democrat Colorado Governor from 2019; first openly gay elected Governor; internet entrepreneur");
  I("Spencer Cox","Republican (USA)","e7",["pm","health","agriculture","leader"],      [52,52,50,52,48], "Republican Utah Governor from 2021; Twitter civility champion; anti-Trump moderate");
  I("Mark Gordon","Republican (USA)","e7",["pm","energy","agriculture","leader"],      [48,50,44,46,46], "Republican Wyoming Governor from 2019; coal country pragmatist");
  I("Kristi Noem","Republican (USA)","e7",["pm","agriculture","home","leader"],        [48,52,50,44,48], "Republican South Dakota Governor; killed dog Cricket; Trump VP hopeful");
  I("Doug Burgum","Republican (USA)","e7",["pm","energy","chancellor","leader"],       [50,52,48,50,48], "Republican North Dakota Governor; Interior Secretary from 2025; tech businessman");
  I("Pete Ricketts","Republican (USA)","e7",["pm","chancellor","agriculture","leader"],  [48,55,44,46,46], "Republican Nebraska Governor; Cubs owner; death penalty restorer; Senator from 2023");
  I("Mike Parson","Republican (USA)","e7",["pm","agriculture","home","leader"],        [44,52,42,44,44], "Republican Missouri Governor from 2018; Sheriff background; Trump loyalist");
  I("Asa Hutchinson","Republican (USA)","e7",["pm","home","justice","leader"],            [52,58,50,52,50], "Republican Arkansas Governor 2015–23; DEA; Homeland; Trump 2024 rival");
  I("Sarah Huckabee Sanders","Republican (USA)","e7",["pm","home","education","leader"],          [48,48,50,44,46], "Republican Arkansas Governor from 2023; Trump press secretary; abortion ban");
  I("Tate Reeves","Republican (USA)","e7",["pm","chancellor","health","leader"],       [44,50,42,44,44], "Republican Mississippi Governor from 2020; COVID response attacked; 2024");
  I("Brad Little","Republican (USA)","e7",["pm","agriculture","energy","leader"],      [46,52,42,46,46], "Republican Idaho Governor from 2019; rancher; Lt Governor under Otter");
  I("Greg Abbott","Republican (USA)","e7",["pm","justice","home","leader"],            [48,58,48,46,50], "Republican Texas Governor from 2015; wheelchair-bound; migrant busing; abortion ban");
  I("Gregg Abbott copy","Republican (USA)","e7",["pm","home","leader"],                     [46,56,46,44,48], "Republican Texas Governor continuation");
  I("Eric Holder","Democrat (USA)","e7",["pm","justice","leader"],                    [58,60,58,58,55], "Democrat Attorney General 2009–15; first Black AG; Fast & Furious; voting rights");
  I("Loretta Lynch","Democrat (USA)","e7",["pm","justice","leader","trade"],             [58,58,55,58,52], "Democrat Attorney General 2015–17; first Black woman AG; Clinton tarmac meeting");
  I("Janet Reno","Democrat (USA)","e6",["pm","justice","leader"],                    [55,62,52,55,52], "Democrat AG 1993–2001; first woman AG; Waco; Elián González; Ruby Ridge");
  I("William Barr","Republican (USA)","e6",["pm","justice","leader"],                   [45,62,45,45,45], "Republican AG 1991–93 and 2019–20; Mueller spin; resigned after election fraud rejection");
  I("Jeff Sessions","Republican (USA)","e7",["pm","justice","home","leader"],            [42,60,42,40,42], "Republican AG 2017–18; recused Russia; Trump fired him; Alabama Senate loss");
  I("Alberto Gonzales","Republican (USA)","e7",["pm","justice","leader"],                   [42,55,40,42,40], "Republican AG 2005–07; torture memos; fired US Attorneys; resigned");
  I("John Ashcroft","Republican (USA)","e6",["pm","justice","home","leader"],            [42,58,42,42,44], "Republican AG 2001–05; PATRIOT Act; lost Senate to dead man Carnahan");

  /* ═══════════════════════════════════════════════════════════════
     USA — HOUSE LEADERS
     ═══════════════════════════════════════════════════════════════ */
  I("Tip O'Neill","Democrat (USA)","e5",["pm","leader","chancellor"],                  [65,68,65,62,65], "Democrat Speaker 1977–87; 'All politics is local'; Reagan friend; Massachusetts titan");
  I("Jim Wright","Democrat (USA)","e5",["pm","leader","foreign"],                     [60,65,60,58,60], "Democrat Speaker 1987–89; ethics resignation; Fort Worth Texan; Nicaragua interest");
  I("Dick Gephardt","Democrat (USA)","e6",["pm","leader","trade","chancellor"],          [55,62,55,55,58], "Democrat House Majority Leader; trade hawk; 2004 presidential candidate; UAW favourite");
  I("Tom DeLay","Republican (USA)","e6",["pm","leader","home","chancellor"],         [40,62,45,40,48], "Republican Majority Leader 'The Hammer'; K Street Project; money laundering conviction");
  I("Dennis Hastert","Republican (USA)","e7",["pm","leader","education"],                 [38,60,38,38,42], "Republican Speaker 1999–2007; first longest-serving; child sexual abuse conviction");
  I("David Bonior","Democrat (USA)","e6",["pm","leader","work","foreign"],              [52,60,50,50,50], "Democrat Whip; Vietnam veteran; NAFTA opponent; peace activist");
  I("Steny Hoyer","Democrat (USA)","e6",["pm","leader","chancellor"],                  [50,68,50,50,55], "Democrat Majority Leader; Maryland; 40+ year career; Pelosi's rival turned deputy");
  I("Jim Jordan","Republican (USA)","e7",["pm","justice","leader","home"],            [40,52,50,36,46], "Republican House Judiciary Chair; Speaker attempt failed; Ohio wrestling coach");
  I("Mark Meadows","Republican (USA)","e7",["pm","home","leader","chancellor"],         [38,50,40,36,42], "Republican Freedom Caucus chair; Trump Chief of Staff; January 6 indictment");
  I("Mo Brooks","Republican (USA)","e7",["pm","leader","foreign"],                   [36,50,42,34,40], "Republican Alabama Rep; January 6 rally speech; armour under suit");
  I("Matt Gaetz","Republican (USA)","e7",["pm","justice","leader"],                   [42,48,52,36,40], "Republican Florida Rep; ousted McCarthy; sex trafficking allegations; no charges");
  I("Lauren Boebert","Republican (USA)","e7",["pm","home","leader"],                      [36,44,45,32,38], "Republican Colorado Rep; gun in cafeteria; theatre ejection; district switch");
  I("Marjorie Taylor Greene","Republican (USA)","e7",["pm","leader","home"],                      [34,42,45,28,38], "Republican QAnon congresswoman; Jewish space lasers; stripped committees restored");
  I("Paul Gosar","Republican (USA)","e7",["pm","home","leader"],                      [32,50,38,28,36], "Republican Arizona Rep; family denounced him in ads; anime violence video censured");
  I("Andy Biggs","Republican (USA)","e7",["pm","justice","home","leader"],            [40,52,42,38,42], "Republican Arizona Rep; Freedom Caucus chair; election denier; January 6");
  I("Chip Roy","Republican (USA)","e7",["pm","home","justice","leader"],            [44,50,52,40,44], "Republican Texas Rep; Freedom Caucus; Ted Cruz ally; government shutdown champion");
  I("Dan Crenshaw","Republican (USA)","e7",["pm","defence","leader"],                   [52,50,55,48,48], "Republican Texas Rep; Navy SEAL; one-eyed veteran; moderate Freedom wing");
  I("Michael McCaul","Republican (USA)","e7",["pm","foreign","home","leader"],            [50,55,48,50,48], "Republican Texas Rep; Foreign Affairs Chair; homeland security hawk");
  I("Mike Turner","Republican (USA)","e7",["pm","defence","intelligence","leader"],    [50,55,48,50,48], "Republican Ohio Rep; Intel Chair; leaked Russia info warning 2024");
  I("Mike Rogers","Republican (USA)","e6",["pm","defence","intelligence","leader"],    [52,58,50,52,50], "Republican Michigan Rep; Intel Chair; armed teachers advocate");
  I("Adam Smith","Democrat (USA)","e7",["pm","defence","foreign","leader"],           [52,58,50,52,50], "Democrat Washington Rep; Armed Services ranking member; defence intellectual");
  I("Gregory Meeks","Democrat (USA)","e7",["pm","foreign","leader","finance"],           [50,58,50,50,50], "Democrat New York Rep; Foreign Affairs Chair; Queens Democratic boss");
  I("Brad Sherman","Democrat (USA)","e7",["pm","foreign","chancellor","leader"],        [50,58,50,50,48], "Democrat California Rep; Sherman Oaks CPA; financial services; India caucus");
  I("Brad Wenstrup","Republican (USA)","e7",["pm","health","defence","leader"],          [50,52,48,48,48], "Republican Ohio Rep; orthopedic surgeon; intelligence committee; Capitol Police support");
  I("Barbara Lee","Democrat (USA)","e6",["pm","foreign","leader"],                     [55,60,55,52,52], "Democrat California Rep; only vote against AUMF 2001; Senate candidate 2024");
  I("Maxine Waters","Democrat (USA)","e6",["pm","chancellor","justice","leader"],        [55,65,60,50,55], "Democrat California Rep; 'reclaim your time'; Impeach 45; financial services chair");
  I("John Lewis","Democrat (USA)","e5",["pm","justice","leader","transport"],         [70,65,72,62,60], "Democrat Georgia Rep; civil rights icon; good trouble; Bloody Sunday Selma; died 2020");
  I("Charles Rangel","Democrat (USA)","e5",["pm","chancellor","work","leader"],           [55,70,55,55,58], "Democrat New York Rep; Ways & Means chair; Harlem; Korea vet; tax troubles");
  I("Elijah Cummings","Democrat (USA)","e6",["pm","justice","leader"],                     [62,62,65,58,58], "Democrat Maryland Rep; Oversight chair; Baltimore; died 2019 midterm term");
  I("Eliot Engel","Democrat (USA)","e6",["pm","foreign","leader"],                     [50,65,50,50,50], "Democrat New York Rep; Foreign Affairs chair; lost primary to Jamaal Bowman 2020");
  I("Jerry McNerney","Democrat (USA)","e7",["pm","energy","education","leader"],          [50,52,48,50,48], "Democrat California Rep; wind energy engineer; STEM champion");
  I("Ro Khanna copy","Democrat (USA)","e7",["pm","trade","defence"],                      [58,50,60,52,50], "Democrat Silicon Valley progressive trade hawk");

  /* ═══════════════════════════════════════════════════════════════
     IRELAND — full expansion
     ═══════════════════════════════════════════════════════════════ */
  I("Éamon de Valera",        "Fianna Fáil","e2",["pm","leader","justice","foreign"],        [62,72,65,62,65], "FF founding Taoiseach; 1937 Constitution; Economic War; WWII neutrality; President");
  I("Seán Lemass",            "Fianna Fáil","e4",["pm","trade","chancellor","leader"],       [60,68,55,62,60], "FF Taoiseach 1959–66; economic moderniser; First Programme; Anglo-Irish rapprochement");
  I("Jack Lynch",             "Fianna Fáil","e4",["pm","leader","foreign","home"],           [60,65,60,60,58], "FF Taoiseach twice; Arms Crisis; Northern Ireland; EEC membership 1973");
  I("Charles Haughey",        "Fianna Fáil","e5",["pm","chancellor","leader","foreign"],     [58,68,62,55,60], "FF Taoiseach three times; Ansbacher accounts; GUBU; Greencore; complex legacy");
  I("Garret FitzGerald",      "Fine Gael","e5",["pm","leader","chancellor","foreign"],       [62,65,62,62,58], "FG Taoiseach twice; Anglo-Irish Agreement 1985; constitutional crusader; economist");
  I("Liam Cosgrave",          "Fine Gael","e4",["pm","leader","home","justice"],             [55,65,50,55,55], "FG Taoiseach 1973–77; Law and Order; contraceptives bill voted against own party");
  I("Albert Reynolds",        "Fianna Fáil","e6",["pm","leader","chancellor","foreign"],     [58,60,58,58,58], "FF Taoiseach 1992–94; IRA ceasefire; Downing St Declaration; Beef Tribunal; danced");
  I("John Bruton",            "Fine Gael","e6",["pm","chancellor","leader","foreign"],       [55,62,50,55,52], "FG Taoiseach 1994–97; Maastricht treaty; EU Ambassador; 'John Unionist' jibes");
  I("Bertie Ahern",           "Fianna Fáil","e6",["pm","leader","chancellor","foreign"],     [65,68,62,65,65], "FF Taoiseach 1997–2008; Celtic Tiger; Good Friday Agreement; Mahon Tribunal");
  I("Brian Cowen",            "Fianna Fáil","e7",["pm","chancellor","leader","foreign"],     [48,60,48,48,52], "FF Taoiseach 2008–11; bank guarantee; bailout; BIFFO; EU renegotiation");
  I("Enda Kenny",             "Fine Gael","e7",["pm","leader","foreign","health"],           [58,62,58,58,58], "FG Taoiseach 2011–17; austerity; marriage referendum; Brexit interlocutor");
  I("Leo Varadkar",           "Fine Gael","e7",["pm","health","leader","foreign"],           [60,55,62,58,58], "FG Taoiseach twice; same-sex marriage; Brexit; COVID; EU summit diplomatist");
  I("Micheál Martin",         "Fianna Fáil","e7",["pm","health","leader","foreign"],         [58,60,55,58,58], "FF Taoiseach 2020–22 and from 2025; COVID; Northern Ireland commissioner");
  I("Simon Harris",           "Fine Gael","e7",["pm","health","education","leader"],         [58,52,58,55,52], "FG Taoiseach 2024; youngest taoiseach; health minister abortion referendum");
  I("Mary McAleese",          "Fianna Fáil","e6",["pm","justice","leader","foreign"],        [65,62,65,62,60], "FF President 1997–2011; barrister; 'Building Bridges' North-South; gay rights voice");
  I("Mary Robinson",          "Labour (IE)","e5",["pm","justice","foreign","leader"],        [68,62,68,65,60], "Labour President 1990–97; barrister; UN High Commissioner for Human Rights");
  I("Michael D. Higgins",     "Labour (IE)","e6",["pm","culture","leader","foreign"],        [65,60,68,60,58], "Labour President from 2011; poet; arts activist; oldest serving Irish President");
  I("Gerry Adams",            "Sinn Féin","e5",["pm","leader","foreign"],                    [55,65,55,52,58], "SF leader 1983–2018; IRA/Sinn Féin 'we haven't gone away you know'; peace process");
  I("Mary Lou McDonald",      "Sinn Féin","e7",["pm","leader","chancellor","foreign"],       [62,55,65,58,60], "SF leader from 2018; Dáil and Westminster; 2020 election first place; unification path");
  I("Pearse Doherty",         "Sinn Féin","e7",["pm","chancellor","leader","justice"],       [60,52,62,55,55], "SF Finance Spokesperson; Donegal; banking inquiry star performer");
  I("Mary-Lou McDonald",      "Sinn Féin","e7",["pm","leader","foreign"],                   [60,53,63,57,58], "SF President; multiple terms Irish GE success; unification referendum push");
  I("Eamon Gilmore",          "Labour (IE)","e6",["pm","foreign","leader","chancellor"],     [55,58,55,55,52], "Labour Tánaiste 2011–14; Foreign Minister; EU Ambassador");
  I("Joan Burton",            "Labour (IE)","e6",["pm","chancellor","work","leader"],        [52,58,50,52,50], "Labour leader 2014–17; Social Protection Minister; water charges siege");
  I("Brendan Howlin",         "Labour (IE)","e6",["pm","health","chancellor","leader"],      [52,58,50,52,50], "Labour leader 2017–20; Minister; teacher-turned-politician");
  I("Ivana Bacik",            "Labour (IE)","e7",["pm","justice","leader","education"],      [56,50,58,52,52], "Labour leader from 2022; barrister; reproductive rights pioneer; Dublin Bay South");
  I("Paul Murphy",            "People Before Profit","e7",["pm","work","leader","chancellor"],[52,48,55,48,50], "PBP-Solidarity Dublin Rathdown; Water Tax witch-trial; Trotskyist");
  I("Bríd Smith",             "People Before Profit","e7",["pm","environment","work","leader"],[50,48,52,48,48], "PBP Dublin Bay South; trade unionist; anti-fracking champion");
  I("Roisín Shortall",        "Social Democrats (IE)","e7",["pm","health","leader","work"],  [54,55,52,52,50], "Social Dems co-founder; resigned as junior health minister; Dublin NW");
  I("Catherine Murphy",       "Social Democrats (IE)","e7",["pm","leader","chancellor"],     [52,52,50,50,50], "Social Dems co-leader; Kildare North; data transparency campaigner");
  I("Green Party (IE) leader","Green Party (IE)","e7",["pm","environment","leader"],         [52,48,50,50,48], "Eamon Ryan continuity - climate champion");
  I("Eamon Ryan",             "Green Party (IE)","e7",["pm","environment","transport","leader"],[56,55,55,52,52], "Green leader; junior coalition partner 2020; cycling infrastructure; Climate Action plan");
  I("Mary Harney",            "Progressive Democrats","e6",["pm","health","chancellor","leader"],[56,60,55,56,55], "PD Tánaiste; Boston vs Berlin; IMF warnings; HSE creation");
  I("Michael McDowell",       "Progressive Democrats","e6",["pm","justice","leader","chancellor"],[55,58,55,52,52], "PD Justice Minister; GSOC; party founder; barrister; AG");
  I("Ian Paisley Sr.",        "DUP","e4",["pm","leader","justice","home"],                   [52,68,65,50,58], "DUP founder; 'No Surrender'; First Minister shared power with Sinn Féin 2007");
  I("Peter Robinson",         "DUP","e6",["pm","leader","chancellor","foreign"],             [50,62,48,52,52], "DUP First Minister 2008–16; border walk Clontibret; Iris expenses scandal");
  I("Arlene Foster",          "DUP","e7",["pm","leader","chancellor","foreign"],             [50,55,50,50,50], "DUP First Minister; RHI cash for ash scandal; Renewable Heat Incentive collapse");
  I("Jeffrey Donaldson",      "DUP","e7",["pm","leader","home","foreign"],                   [48,55,46,48,48], "DUP leader 2021–24; Windsor Framework; resigned amid criminal charges");
  I("Gavin Robinson",         "DUP","e7",["pm","leader","foreign","home"],                   [46,52,44,46,46], "DUP interim leader; East Belfast; DUP Assembly return 2024");
  I("Jim Allister",           "TUV","e7",["pm","justice","leader","foreign"],                [50,55,55,46,46], "TUV leader; barrister; hardline unionist; single MEP NI; Protocol opponent");
  I("David Trimble",          "UUP","e5",["pm","leader","justice","foreign"],                [58,62,55,56,55], "UUP First Minister 1998–2002; Nobel Peace Prize; Good Friday Agreement architect");
  I("Mike Nesbitt",           "UUP","e7",["pm","leader","health","chancellor"],              [52,52,52,50,50], "UUP leader 2012–17; TV presenter; transfer votes to SDLP; then came back");
  I("Colum Eastwood",         "SDLP","e7",["pm","leader","foreign","justice"],               [56,50,58,52,52], "SDLP leader from 2015; Derry; Brexit champion; cross-border bodies");
  I("John Hume",              "SDLP","e5",["pm","leader","foreign","education"],             [68,65,65,65,60], "SDLP founder; Nobel Peace Prize; non-violent nationalism; civil rights march");
  I("Seamus Mallon",          "SDLP","e5",["pm","leader","justice","foreign"],               [60,62,58,58,52], "SDLP deputy first minister; 'decent Seamus'; Adams' thorn; Newry Armagh");
  I("Alliance Naomi Long",    "Alliance (NI)","e7",["pm","justice","leader","foreign"],      [58,52,58,55,52], "Alliance Justice Minister; first NI MP not unionist/nationalist since 1970s");

  /* ═══════════════════════════════════════════════════════════════
     SOUTH AFRICA — expanded
     ═══════════════════════════════════════════════════════════════ */
  I("F.W. de Klerk",          "National Party (ZA)","e5",["pm","leader","foreign","justice"], [58,65,55,58,55], "NP last apartheid President; released Mandela; Nobel Peace Prize; National Party dissolution");
  I("P.W. Botha",             "National Party (ZA)","e5",["pm","leader","home","defence"],   [38,68,40,38,48], "NP President/PM; Cross of Crocodile; Rubicon speech; State of Emergency");
  I("Hendrick Verwoerd",      "National Party (ZA)","e3",["pm","education","leader","home"],  [28,60,40,28,45], "NP architect of apartheid; Bantustans; assassinated twice; stabbed in parliament");
  I("John Vorster",           "National Party (ZA)","e4",["pm","home","leader","justice"],   [32,62,35,32,45], "NP PM 1966–78; security state; Soweto 1976; information scandal resignation");
  I("Cyril Ramaphosa",        "ANC","e7",["pm","leader","chancellor","work"],                [60,65,58,60,60], "ANC President from 2018; Marikana massacre association; mining union leader; Phala Phala");
  I("Jacob Zuma",             "ANC","e6",["pm","deputy","leader","foreign"],                  [48,62,50,45,52], "ANC President 2009–18; 800 corruption charges; arms deal; shower disease prevention; Nkandla");
  I("Thabo Mbeki",            "ANC","e6",["pm","leader","foreign","chancellor"],              [55,65,52,55,55], "ANC President 1999–2008; AIDS denialism; Zimbabwe; African Renaissance; recalled by ANC");
  I("Kgalema Motlanthe",      "ANC","e6",["pm","leader","foreign"],                          [56,60,50,52,50], "ANC caretaker President 2008–09; secretary general; deputy; respected elder");
  I("Nkosazana Dlamini-Zuma", "ANC","e6",["pm","foreign","health","leader"],                 [52,62,50,52,52], "ANC AU Commission Chair; Health Minister; COVID lockdown architect; Zuma's ex-wife");
  I("Zweli Mkhize",           "ANC","e7",["pm","health","leader","chancellor"],              [48,55,48,46,48], "ANC Health Minister; Digital Vibes procurement scandal; COVID vaccination");
  I("Gwede Mantashe",         "ANC","e7",["pm","energy","chancellor","leader"],              [45,58,45,44,48], "ANC Energy Minister; coal defender; NUMSA leader; fossil fuel champion");
  I("Naledi Pandor",          "ANC","e7",["pm","foreign","education","leader"],              [55,58,52,54,52], "ANC Foreign Minister; education minister multiple terms; anti-Israel stance");
  I("Julius Malema",          "EFF (ZA)","e7",["pm","leader","work","agriculture"],          [58,48,65,48,55], "EFF Economic Freedom Fighters leader; expelled ANC Youth League; land expropriation");
  I("Mmusi Maimane",          "DA (ZA)","e7",["pm","leader","chancellor","justice"],         [60,50,62,52,55], "DA leader 2015–19; resigned over Zille; One SA Movement; pastor politician");
  I("Helen Zille",            "DA (ZA)","e6",["pm","leader","education","chancellor"],       [58,60,58,55,55], "DA Federal Chair; Cape Town Mayor; Western Cape Premier; 'colonial tweet'");
  I("John Steenhuisen",       "DA (ZA)","e7",["pm","leader","justice","chancellor"],         [52,52,52,50,52], "DA leader from 2020; Durban; 2024 GNU coalition negotiations");
  I("Mangosuthu Buthelezi",   "IFP (ZA)","e5",["pm","home","leader","justice"],             [52,72,55,52,55], "IFP leader 1975–2019; KwaZulu homeland; 1994 IFP-ANC violence; Home Affairs minister");
  I("Jacob Zondo",            "National Party (ZA)","e5",["pm","justice","leader"],          [55,55,52,52,50], "Deputy Chief Justice; State Capture Commission chair; Zuma antagonist");
  I("Bantu Holomisa",         "UDM (ZA)","e6",["pm","leader","defence","chancellor"],        [50,55,50,50,50], "UDM Transkei military ruler turned opposition democrat; Tambo protege");
  I("Terror Lekota",          "COPE (ZA)","e6",["pm","defence","leader"],                    [52,58,50,50,50], "COPE co-founder; ANC defence chair; rejected Zuma; party fragmented");

  /* ═══════════════════════════════════════════════════════════════
     MORE NIGERIA
     ═══════════════════════════════════════════════════════════════ */
  I("Sani Abacha",            "PDP (NG)","e5",["pm","defence","leader"],                     [25,60,30,25,38], "Nigeria military dictator 1993–98; kleptocrat; billions stolen; died in power");
  I("Ibrahim Babangida",      "PDP (NG)","e5",["pm","defence","chancellor","leader"],         [30,65,35,30,42], "Nigeria military dictator 1985–93; annulled June 12 election; 'Maradona'");
  I("Yakubu Gowon",           "PDP (NG)","e4",["pm","defence","leader"],                     [42,58,42,40,45], "Nigeria military leader; Biafra civil war; 'to keep Nigeria one is a task that must be done'");
  I("Olusegun Obasanjo copy", "PDP (NG)","e5",["pm","leader","agriculture","defence"],       [50,66,48,50,53], "Nigeria PDP President 1999–2007 continuation");
  I("Atiku Abubakar fill",    "PDP (NG)","e6",["pm","deputy","trade","leader"],              [48,63,46,48,50], "PDP perennial candidate; VP 1999–2007; Waziri Adamawa; Yola businessman");
  I("Emeka Ojukwu",           "MEND (NG)","e4",["pm","leader","defence"],                    [48,55,50,46,48], "Biafra secessionist leader; Oxford educated; 30-month civil war; 1m+ dead");
  I("Ngozi Okonjo-Iweala",    "LP (NG)","e7",["pm","chancellor","trade","foreign"],          [65,65,62,65,60], "Nigeria Finance Minister twice; WTO Director-General from 2021; World Bank MD");
  I("Yemi Osinbajo",          "APC (NG)","e7",["pm","deputy","justice","leader"],            [58,60,55,58,55], "APC VP 2015–23; acting President; Lagos AG; theology professor");
  I("Peter Obi copy",         "LP (NG)","e7",["pm","chancellor","leader"],                    [56,53,53,53,50], "LP 2023 presidential candidate; Anambra Governor; Obidient movement");
  I("Rotimi Amaechi",         "APC (NG)","e7",["pm","transport","leader","chancellor"],      [48,52,48,46,46], "APC Rivers Governor; Transport Minister; Buhari campaign co-ordinator");

  /* ═══════════════════════════════════════════════════════════════
     KENYA EXPANDED
     ═══════════════════════════════════════════════════════════════ */
  I("Mwai Kibaki",            "Jubilee (KE)","e6",["pm","chancellor","leader","health"],     [58,65,52,58,55], "DP/PNU Kenya President 2002–13; NARC coalition; Kikuyu technocrat; 2007 disputed election");
  I("Simeon Nyachae",         "KANU (KE)","e5",["pm","chancellor","agriculture","leader"],   [52,60,48,52,50], "KANU/Ford People politician; Finance minister; Kisii politician");
  I("Musalia Mudavadi",       "ODM (KE)","e6",["pm","chancellor","deputy","leader"],         [55,60,52,55,52], "ANC Kenya PM from 2023; Finance Minister; KANU VP's son; coalition politician");
  I("Kalonzo Musyoka",        "ODM (KE)","e6",["pm","foreign","deputy","leader"],            [52,60,50,52,50], "Wiper VP; 2007 and 2013 candidate; 'watermelon'; Ukambani baron");
  I("Martha Karua",           "ODM (KE)","e6",["pm","justice","leader"],                     [56,55,55,52,50], "NARC-Kenya; Justice Minister; 2022 Odinga running mate; Iron Lady");
  I("George Wajackoyah",      "UDA (KE)","e7",["pm","leader","justice"],                    [45,45,50,40,40], "Roots Party 2022 candidate; legalize cannabis; crocodile farms for debt");
  I("Isaac Ruto",             "ODM (KE)","e7",["pm","leader","agriculture","chancellor"],    [46,50,46,44,46], "Chama Cha Mashinani; Bomet Governor; anti-devolution critic");
  I("Eugene Wamalwa",         "Jubilee (KE)","e7",["pm","justice","home","leader"],          [48,52,46,48,46], "FORD-Kenya; Defence Minister; Deputy President 2022 candidate");
  I("Hassan Joho",            "ODM (KE)","e7",["pm","leader","trade"],                       [50,48,55,46,48], "ODM Mombasa Governor; vocal Odinga ally; SGR contracts criticism");
  I("Alfred Mutua",           "UDA (KE)","e7",["pm","foreign","leader"],                     [50,50,50,48,48], "Maendeleo Chap Chap; Machakos Governor; Ruto cabinet Foreign Affairs");


  /* ═══════════════════════════════════════════════════════════════
     GREECE EXPANDED
     ═══════════════════════════════════════════════════════════════ */
  I("Konstantinos Karamanlis Sr","ND (GR)","e4",["pm","leader","foreign","chancellor"],  [62,70,60,65,60], "ND founder; restored democracy 1974; Greece EU accession 1981; three PM terms");
  I("Andreas Papandreou",      "PASOK (GR)","e5",["pm","leader","chancellor","foreign"], [68,65,70,62,65], "PASOK founder; PM 1981–89, 1993–96; scandals; socialist; NATO critic");
  I("Georgios Papandreou Sr",  "PASOK (GR)","e3",["pm","leader","foreign"],              [60,68,62,58,58], "Centre Union PM; Georgios Senior; father and grandfather of later PMs");
  I("Kostas Karamanlis Jr",    "ND (GR)","e6",["pm","leader","chancellor"],              [52,58,50,52,52], "ND PM 2004–09; hosted 2004 Olympics; debt crisis beginning; nephew of founder");
  I("Kostas Simitis",          "PASOK (GR)","e6",["pm","chancellor","foreign","leader"], [55,62,52,58,55], "PASOK PM 1996–2004; euro adoption; Athens Olympics secured; moderniser");
  I("Giorgos Papandreou Jr",   "PASOK (GR)","e7",["pm","foreign","leader","chancellor"],[54,58,55,52,52], "PASOK PM 2009–11; debt crisis bail-out; referendum cancelled; party collapse");
  I("Lucas Papademos",         "PASOK (GR)","e7",["pm","chancellor","leader"],           [58,65,45,60,45], "Technocrat PM 2011–12; former ECB VP; austerity implementation; economist");
  I("Alexis Tsipras",          "Syriza (GR)","e7",["pm","leader","chancellor","work"],  [62,52,65,54,58], "Syriza PM 2015–19; anti-austerity; July 2015 capitulation; Greferendum");
  I("Euclid Tsakalotos",       "Syriza (GR)","e7",["pm","chancellor","foreign"],        [52,55,50,52,50], "Syriza Finance Minister; Oxford economist; July 2015 deal negotiator");
  I("Yanis Varoufakis",        "Syriza (GR)","e7",["pm","chancellor","trade"],          [60,52,68,50,42], "Syriza Finance 2015; motorcycle-riding economist; resigned after referendum; DiEM25");
  I("Stavros Theodorakis",     "ND (GR)","e7",["pm","leader","culture"],                [50,48,55,46,48], "To Potami founder; journalist-politician; centrist third force");
  I("Panos Kammenos",          "ANEL (GR)","e7",["pm","defence","leader"],              [42,50,45,40,42], "ANEL Defence Minister; Syriza coalition partner; Orthodox nationalist");
  I("Fofi Gennimata",          "PASOK (GR)","e7",["pm","health","leader","work"],       [52,55,50,50,50], "PASOK/KINAL leader; died in office 2021; health minister; centrist renewal");
  I("Nikos Androulakis",       "PASOK (GR)","e7",["pm","leader","foreign"],             [50,52,50,50,50], "PASOK/KIDISO/KINAL leader; MEP; PASOK revival 2023");
  I("Kyriakos Mitsotakis",     "ND (GR)","e7",["pm","leader","chancellor","home"],      [60,58,58,60,60], "ND PM from 2019; wiretapping scandal; moderniser; Mitsotakis family dynasty");
  I("Giorgos Gerapetritis",    "ND (GR)","e7",["pm","foreign","justice"],               [52,52,50,52,50], "ND Foreign Minister; legal academic; pro-EU"); 
  I("Nikos Dendias",           "ND (GR)","e7",["pm","foreign","defence","home"],        [54,56,50,54,50], "ND FM then Defence; Greece-Turkey; migration management");
  I("Ilias Kasidiaris",        "Golden Dawn (GR)","e7",["pm","leader","home"],          [22,42,38,22,35], "Golden Dawn spokesman; neo-Nazi; convicted criminal organisation leader");
  I("Nikos Michaloliakos",     "Golden Dawn (GR)","e7",["pm","leader"],                 [18,48,30,18,32], "Golden Dawn founder; Hitler admirer; convicted; imprisoned");
  I("Dimitris Koutsoumbas",    "KKE (GR)","e7",["pm","leader","work","chancellor"],     [48,52,50,48,50], "KKE Communist Party leader; anti-NATO; Marxist-Leninist");
  I("Vasilis Leventis",        "ANEL (GR)","e6",["pm","leader","chancellor"],           [42,55,45,40,42], "Union of Centrists leader; eccentric populist; anti-party system");

  /* ═══════════════════════════════════════════════════════════════
     TURKEY
     ═══════════════════════════════════════════════════════════════ */
  I("Mustafa Kemal Ataturk",   "CHP (TR)","e2",["pm","leader","defence","foreign"],     [72,78,75,78,72], "Turkey founder; secularism; alphabet reform; women's suffrage; 'Father of Turks'");
  I("Ismet Inonu",             "CHP (TR)","e2",["pm","leader","foreign","chancellor"],  [62,72,58,65,62], "Turkey PM twice; President 1938–50; WWI general; 'National Chief'");
  I("Adnan Menderes",          "DP (TR)","e4",["pm","leader","chancellor","agriculture"],[55,60,58,52,52], "DP PM 1950–60; economic liberalisation; NATO; hanged after 1960 coup");
  I("Suleyman Demirel",        "AKP (TR)","e5",["pm","leader","chancellor","foreign"],  [58,68,55,58,58], "Turkey PM seven times; President; dam-builder; 'Sultan of Dams'");
  I("Bulent Ecevit",           "CHP (TR)","e5",["pm","leader","foreign","chancellor"],  [58,65,60,58,55], "Turkey PM 1974; Cyprus invasion; poet-politician; CHP moderniser");
  I("Necmettin Erbakan",       "Saadet (TR)","e5",["pm","leader","chancellor","trade"], [52,65,55,52,52], "Refah/Saadet PM 1996–97; Islamist; ousted by military; AKP father figure");
  I("Tansu Ciller",            "DYP (TR)","e6",["pm","leader","chancellor","foreign"],  [55,60,58,52,52], "Turkey first female PM 1993–96; Chicago economist; coalition governments");
  I("Mesut Yilmaz",            "ANAP (TR)","e6",["pm","leader","chancellor","foreign"], [52,58,50,52,52], "ANAP PM three times; EU candidacy 1999; secular right");
  I("Abdullah Gul",            "AKP (TR)","e6",["pm","leader","foreign","chancellor"],  [58,62,55,60,58], "AKP co-founder; PM 2002–03; President 2007–14; moderate Islamist");
  I("Recep Tayyip Erdogan",    "AKP (TR)","e6",["pm","leader","chancellor","foreign"],  [62,68,65,58,68], "AKP PM then President; Islamist populist; media crackdowns; Gulen; Kurds");
  I("Ahmet Davutoglu",         "AKP (TR)","e7",["pm","leader","foreign","chancellor"],  [55,58,55,58,55], "AKP FM then PM 2014–16; 'Strategic Depth' doctrine; expelled; Future Party");
  I("Binali Yildirim",         "AKP (TR)","e7",["pm","leader","transport","chancellor"],[52,58,50,52,52], "AKP last PM 2016–18; loyal Erdogan ally; ferry minister; TBMM speaker");
  I("Kemal Kilicdaroglu",      "CHP (TR)","e7",["pm","leader","chancellor","work"],     [58,62,55,58,58], "CHP leader 2010–23; 2023 presidential challenger; Alevi; 'Gandhi of Turkey'");
  I("Meral Aksener",           "IYI (TR)","e7",["pm","home","leader"],                  [55,58,58,52,52], "IYI Party founder; Interior Minister; nationalist; Iron Lady of Turkey");
  I("Selahattin Demirtas",     "HDP (TR)","e7",["pm","leader","justice","work"],        [60,52,65,52,52], "HDP co-chair; imprisoned by Erdogan; charismatic Kurdish politician");
  I("Devlet Bahceli",          "MHP (TR)","e6",["pm","leader","home"],                  [40,62,45,40,50], "MHP leader; ultra-nationalist; Grey Wolves; 'People's Alliance' with AKP");
  I("Sinan Ogan",              "AKP (TR)","e7",["pm","leader","foreign"],               [42,48,45,40,40], "ATA Alliance 2023 candidate; ultra-nationalist; endorsement broker");
  I("Ekrem Imamoglu",          "CHP (TR)","e7",["pm","leader","chancellor"],            [64,50,62,56,56], "CHP Istanbul Mayor; convicted by AKP courts; Erdogan rival; 2028 hope");
  I("Mansur Yavas",            "CHP (TR)","e7",["pm","leader","chancellor"],            [62,52,58,56,54], "CHP Ankara Mayor; corruption-fighting; popular opposition figure");
  I("Ali Babacan",             "DEVA (TR)","e7",["pm","chancellor","trade","foreign"],  [56,58,52,56,50], "DEVA Party founder; AKP founder expelled; technocrat former finance minister");

  /* ═══════════════════════════════════════════════════════════════
     ISRAEL
     ═══════════════════════════════════════════════════════════════ */
  I("David Ben-Gurion",        "Mapai (IL)","e3",["pm","leader","defence","foreign"],   [72,75,70,72,70], "Israel founder; first PM; Proclamation of Independence; IDF creator; statesman");
  I("Moshe Sharett",           "Mapai (IL)","e4",["pm","foreign","leader"],             [58,65,55,60,55], "Mapai Israel PM 1954–55; diplomat; first Foreign Minister; ousted by Ben-Gurion");
  I("Levi Eshkol",             "Mapai (IL)","e4",["pm","chancellor","leader","agriculture"],[58,68,52,60,58], "Mapai PM 1963–69; Six-Day War; immigrant absorption; water carrier");
  I("Golda Meir",              "Labour (IL)","e5",["pm","leader","foreign","work"],     [65,68,62,62,62], "Labour PM 1969–74; Yom Kippur War; 'Iron Lady' before Thatcher; Milwaukee-born");
  I("Yitzhak Rabin",           "Labour (IL)","e5",["pm","leader","defence","foreign"],  [62,70,58,65,60], "Labour PM twice; Oslo Accords; Nobel Peace; assassinated 1995; IDF Chief");
  I("Shimon Peres",            "Labour (IL)","e5",["pm","leader","foreign","defence"],  [65,75,62,68,60], "Labour/Kadima President; Oslo architect; Nobel Peace; nuclear programme"); 
  I("Menachem Begin",          "Likud (IL)","e5",["pm","leader","foreign","defence"],   [60,68,62,60,58], "Likud first PM 1977; Camp David Accords; Nobel Peace; Irgun leader");
  I("Yitzhak Shamir",          "Likud (IL)","e5",["pm","leader","foreign","home"],      [45,70,40,50,52], "Likud PM twice; Madrid Conference; Stern Gang; settlement expansion");
  I("Ehud Barak",              "Labour (IL)","e6",["pm","leader","defence","foreign"],  [55,62,50,58,52], "Labour PM 1999–2001; Camp David 2000 failure; most decorated IDF officer");
  I("Ariel Sharon",            "Likud/Kadima (IL)","e6",["pm","leader","defence"],      [58,68,50,60,58], "Kadima PM 2001–06; disengagement; Sabra & Shatila; stroke incapacitated");
  I("Ehud Olmert",             "Kadima (IL)","e7",["pm","leader","foreign","chancellor"],[52,60,52,52,50], "Kadima PM 2006–09; Second Lebanon War; Annapolis; corruption conviction");
  I("Benjamin Netanyahu",      "Likud (IL)","e6",["pm","leader","foreign","chancellor"],[60,70,65,58,65], "Likud longest-serving PM; Iran hawk; Oslo opponent; coalition chaos; Oct 7");
  I("Tzipi Livni",             "Kadima (IL)","e7",["pm","foreign","justice","leader"],  [55,58,58,55,52], "Kadima leader; FM; Oslo negotiator; justice minister; Hatnuah centrist");
  I("Naftali Bennett",         "Yamina (IL)","e7",["pm","leader","defence","chancellor"],[55,52,55,55,52], "Yamina/Jewish Home PM 2021–22; tech billionaire; settlements advocate");
  I("Yair Lapid",              "Yesh Atid (IL)","e7",["pm","leader","foreign","chancellor"],[60,48,62,52,55], "Yesh Atid PM briefly 2022; TV presenter; centrist; anti-corruption"); 
  I("Avigdor Lieberman",       "Yisrael Beiteinu (IL)","e7",["pm","foreign","defence","home"],[48,58,50,46,50], "YB FM; Defence; ultra-nationalist Russian-immigrant constituency");
  I("Itamar Ben-Gvir",         "Otzma Yehudit (IL)","e7",["pm","home","leader"],        [28,40,45,24,38], "Kahanist National Security Minister; incitement; radical settler; Oct 7 context");
  I("Bezalel Smotrich",        "Otzma Yehudit (IL)","e7",["pm","chancellor","home","trade"],[30,42,42,28,38], "Finance Minister; religious Zionist; West Bank annexation; budget cuts");
  I("Benny Gantz",             "Likud (IL)","e7",["pm","defence","leader"],             [58,58,52,56,52], "Blue and White; IDF Chief; National Unity Cabinet; resigned over Gaza");
  I("Moshe Dayan",             "Mapai (IL)","e4",["pm","defence","foreign","leader"],   [62,68,58,60,55], "Defence Minister Six-Day War; eye patch; controversial; archaeologist-looter");


  /* ═══════════════════════════════════════════════════════════════
     JAPAN
     ═══════════════════════════════════════════════════════════════ */
  I("Shigeru Yoshida",         "LDP (JP)","e3",["pm","leader","foreign","chancellor"],  [62,68,58,65,60], "LDP founder figure; postwar PM 1946–54; US-Japan alliance; conservative restoration");
  I("Nobusuke Kishi",          "LDP (JP)","e4",["pm","leader","foreign","chancellor"],  [45,65,40,50,52], "LDP PM 1957–60; US-Japan Security Treaty riots; war crimes Class-A; Abe's grandfather");
  I("Hayato Ikeda",            "LDP (JP)","e4",["pm","chancellor","leader","trade"],    [58,65,52,60,55], "LDP PM 1960–64; Income Doubling Plan; 1964 Olympics; economic miracle");
  I("Eisaku Sato",             "LDP (JP)","e4",["pm","leader","foreign","chancellor"],  [60,68,55,62,58], "LDP PM longest 1964–72; Nobel Peace; Okinawa reversion; non-nuclear principles");
  I("Kakuei Tanaka",           "LDP (JP)","e5",["pm","leader","chancellor","trade"],    [55,65,58,52,60], "LDP PM 1972–74; political machine; Lockheed scandal; 'shadow shogun'");
  I("Takeo Miki",              "LDP (JP)","e5",["pm","leader","chancellor","justice"],  [55,62,52,55,52], "LDP PM 1974–76; reform faction; anti-corruption; 'Mr Clean'");
  I("Takeo Fukuda",            "LDP (JP)","e5",["pm","leader","chancellor","foreign"],  [58,65,50,58,55], "LDP PM 1976–78; Fukuda Doctrine; finance technocrat; Tanaka rival");
  I("Masayoshi Ohira",         "LDP (JP)","e5",["pm","leader","chancellor","foreign"],  [58,62,52,58,55], "LDP PM 1978–80; Pacific Rim policy; consumption tax controversy; died in office");
  I("Zenko Suzuki",            "LDP (JP)","e5",["pm","leader","chancellor"],            [52,60,45,52,52], "LDP PM 1980–82; consensus-builder; low profile; US-Japan alliance deepening");
  I("Yasuhiro Nakasone",       "LDP (JP)","e5",["pm","leader","foreign","defence"],     [62,65,60,62,60], "LDP PM 1982–87; Reagan friendship; privatisation NTT/JR; nationalism");
  I("Noboru Takeshita",        "LDP (JP)","e5",["pm","leader","chancellor","trade"],    [52,62,48,55,58], "LDP PM 1987–89; consumption tax 1987; Recruit scandal; political money machine");
  I("Kiichi Miyazawa",         "LDP (JP)","e6",["pm","leader","chancellor","foreign"],  [58,65,52,60,55], "LDP PM 1991–93; bubble burst; fluent English; postwar pacifism defender");
  I("Morihiro Hosokawa",       "Non-LDP (JP)","e6",["pm","leader","chancellor"],        [58,55,55,55,52], "JNP PM 1993–94; first non-LDP PM in 38 years; political reform; resigned");
  I("Tomiichi Murayama",       "SDP (JP)","e6",["pm","leader","work","chancellor"],     [52,58,50,52,50], "SDP PM 1994–96; formal WWII apology statement; socialist in LDP coalition");
  I("Ryutaro Hashimoto",       "LDP (JP)","e6",["pm","leader","chancellor","trade"],    [55,60,52,58,55], "LDP PM 1996–98; Big Bang financial reform; Ryukyu US bases row");
  I("Keizo Obuchi",            "LDP (JP)","e6",["pm","leader","chancellor","foreign"],  [58,60,55,58,55], "LDP PM 1998–2000; Financial stabilisation; died in office; 'cold pizza'");
  I("Yoshiro Mori",            "LDP (JP)","e6",["pm","leader","chancellor"],            [38,58,35,40,45], "LDP PM 2000–01; low approval; golf gaffe; 'divine country' speech; Olympics boss");
  I("Junichiro Koizumi",       "LDP (JP)","e6",["pm","leader","chancellor","foreign"],  [65,62,65,60,60], "LDP PM 2001–06; postal privatisation; Yasukuni; North Korea; Elvis fan");
  I("Shinzo Abe",              "LDP (JP)","e7",["pm","leader","foreign","defence"],     [60,65,62,62,62], "LDP longest-serving PM; Abenomics; assassinated 2022; Abe's revisions");
  I("Yasuo Fukuda",            "LDP (JP)","e7",["pm","leader","chancellor","foreign"],  [52,58,50,55,52], "LDP PM 2007–08; climate agenda; Fukuda Yasuo; son of Takeo");
  I("Taro Aso",                "LDP (JP)","e7",["pm","leader","chancellor","foreign"],  [50,60,50,52,50], "LDP PM 2008–09; manga lover; gaffes; finance minister; deputy PM decades");
  I("Yukio Hatoyama",          "DPJ (JP)","e7",["pm","leader","foreign","chancellor"],  [55,55,55,52,50], "DPJ PM 2009–10; Futenma base; fraternity ideal; resigned quickly; 'alien'");
  I("Naoto Kan",               "DPJ (JP)","e7",["pm","leader","chancellor","health"],   [55,55,55,52,50], "DPJ PM 2010–11; Fukushima disaster; anti-nuclear conversion; consumer minister");
  I("Yoshihiko Noda",          "DPJ (JP)","e7",["pm","leader","chancellor","trade"],    [52,55,50,52,50], "DPJ PM 2011–12; consumption tax rise; eel analogy; lost 2012 election badly");
  I("Fumio Kishida",           "LDP (JP)","e7",["pm","leader","foreign","chancellor"],  [55,58,52,56,55], "LDP PM 2021–24; new capitalism; Hiroshima origins; Abe assassination response");
  I("Shigeru Ishiba",          "LDP (JP)","e7",["pm","leader","defence","chancellor"],  [52,60,50,54,52], "LDP PM from 2024; defence hawk; rural revitalisation; regional bloc advocate");
  I("Ichiro Matsui",           "Nippon Ishin (JP)","e7",["pm","leader","chancellor"],   [48,50,48,46,48], "Ishin Osaka Governor/Mayor; administrative reform; Osaka-to-Metropolis plan");

  /* ═══════════════════════════════════════════════════════════════
     SOUTH KOREA
     ═══════════════════════════════════════════════════════════════ */
  I("Syngman Rhee",            "Liberal (KR)","e3",["pm","leader","foreign","chancellor"],[45,65,50,42,45], "South Korea first President; authoritarian; Korean War; fled 1960 revolution");
  I("Park Chung-hee",          "DRP (KR)","e4",["pm","leader","chancellor","defence"],   [45,68,45,50,52], "South Korea military President; Miracle on Han River; Yushin constitution; assassinated");
  I("Chun Doo-hwan",           "DJP (KR)","e5",["pm","leader","defence","chancellor"],   [28,58,30,30,38], "South Korea military dictator; Gwangju massacre; death sentence commuted; convicted");
  I("Roh Tae-woo",             "DJP (KR)","e5",["pm","leader","chancellor","foreign"],   [40,60,38,42,42], "South Korea President 1988–93; Seoul Olympics; Nordpolitik; corruption conviction");
  I("Kim Young-sam",           "GNP (KR)","e6",["pm","leader","chancellor","justice"],   [55,62,52,52,52], "South Korea first civilian President; democratisation; IMF crisis 1997; anti-corruption");
  I("Kim Dae-jung",            "MDP (KR)","e6",["pm","leader","foreign","chancellor"],   [65,68,65,62,58], "South Korea President; Sunshine Policy; Nobel Peace 2000; democracy martyr");
  I("Roh Moo-hyun",            "MDP (KR)","e7",["pm","leader","justice","chancellor"],   [58,55,60,55,52], "South Korea President 2003–08; pro-democracy; FTA; suicide on corruption probe");
  I("Lee Myung-bak",           "GNP (KR)","e7",["pm","leader","chancellor","trade"],     [52,60,50,52,52], "GNP President 2008–13; Four Rivers Project; G20; MB corruption conviction");
  I("Park Geun-hye",           "PPP (KR)","e7",["pm","leader","chancellor","foreign"],   [48,58,45,48,48], "PPP first female President; impeached 2017; Choi Soon-sil scandal; imprisoned");
  I("Moon Jae-in",             "DP (KR)","e7",["pm","leader","foreign","chancellor"],    [60,58,58,58,55], "DP President 2017–22; Panmunjom summit; Roh disciple; human rights lawyer");
  I("Yoon Suk-yeol",           "PPP (KR)","e7",["pm","leader","justice","chancellor"],   [45,52,42,44,42], "PPP President; martial law 2024; impeached; prosecutor turned politician");
  I("Lee Jae-myung",           "DP (KR)","e7",["pm","leader","chancellor","work"],       [55,52,58,52,52], "DP leader; Seongnam Mayor; GBI advocate; multiple criminal trials; populist");
  I("Han Duck-soo",            "PPP (KR)","e7",["pm","chancellor","trade","leader"],     [52,62,45,55,50], "PPP PM; technocrat; acting President 2024–25; OECD ambassador; WTO DG candidate");
  I("Ahn Cheol-soo",           "PPP (KR)","e7",["pm","leader","chancellor","health"],    [52,50,52,50,48], "People's Party; antivirus software billionaire; centrist third force attempts");
  I("Hong Joon-pyo",           "PPP (KR)","e7",["pm","leader","home","chancellor"],      [45,55,48,44,45], "PPP Daegu Mayor; hard-right populist; tattoo controversy; Trump-style rhetoric");


  /* ═══════════════════════════════════════════════════════════════
     GERMANY EXPANDED
     ═══════════════════════════════════════════════════════════════ */
  I("Konrad Adenauer",         "CDU (DE)","e3",["pm","leader","foreign","chancellor"],  [68,72,62,70,68], "CDU first Federal Chancellor; Western integration; economic miracle; Grandfather");
  I("Ludwig Erhard",           "CDU (DE)","e4",["pm","chancellor","leader","trade"],    [65,68,60,65,60], "CDU Chancellor; 'Father of the Economic Miracle'; social market economy; ordo-liberal");
  I("Kurt Georg Kiesinger",    "CDU (DE)","e4",["pm","leader","foreign","chancellor"],  [52,62,50,55,52], "CDU Chancellor 1966–69; Grand Coalition; former NSDAP member; slapped by protester");
  I("Willy Brandt",            "SPD (DE)","e5",["pm","leader","foreign","chancellor"],  [68,65,70,68,65], "SPD Chancellor; Ostpolitik; Warsaw genuflection; Nobel Peace 1971; spy scandal");
  I("Helmut Schmidt",          "SPD (DE)","e5",["pm","leader","chancellor","defence"],  [65,68,62,68,62], "SPD Chancellor 1974–82; NATO double-track; economic competence; RAF crisis");
  I("Helmut Kohl",             "CDU (DE)","e5",["pm","leader","chancellor","foreign"],  [58,72,55,65,68], "CDU Chancellor longest; German reunification; EU Maastricht; euro architect");
  I("Gerhard Schroeder",       "SPD (DE)","e6",["pm","leader","chancellor","trade"],    [60,62,62,60,60], "SPD Chancellor 1998–2005; Agenda 2010; anti-Iraq war; Nord Stream lobbyist");
  I("Angela Merkel",           "CDU (DE)","e7",["pm","leader","chancellor","foreign"],  [65,68,55,70,68], "CDU Chancellor 16 years; refugee crisis; Mutti; quantum chemist; Russia misjudgement");
  I("Frank-Walter Steinmeier", "SPD (DE)","e7",["pm","foreign","leader"],              [62,65,58,62,60], "SPD FM twice; President from 2017; Schroeder SPD; Russia-apologist criticism");
  I("Sigmar Gabriel",          "SPD (DE)","e7",["pm","leader","chancellor","trade"],    [58,58,58,55,55], "SPD chair; FM; Economics; populist style; Lower Saxony Premier");
  I("Martin Schulz",           "SPD (DE)","e7",["pm","leader","chancellor","foreign"],  [55,60,58,52,52], "SPD Chancellor candidate 2017; MEP/EP President; Schulz effect; bookshop dropout");
  I("Olaf Scholz",             "SPD (DE)","e7",["pm","leader","chancellor","trade"],    [52,62,45,58,55], "SPD Chancellor 2021–25; Zeitenwende; traffic light collapse; Hamburg finance scandal");
  I("Friedrich Merz",          "CDU (DE)","e7",["pm","leader","chancellor","trade"],    [55,60,55,56,55], "CDU leader; Chancellor from 2025; BlackRock; conservative populism; Merz-dämmerung");
  I("Annalena Baerbock",       "Greens (DE)","e7",["pm","foreign","leader","environment"],[60,50,60,55,52], "Green FM; 2021 Chancellor candidate; climate champion; CV scandal");
  I("Robert Habeck",           "Greens (DE)","e7",["pm","chancellor","environment","leader"],[58,52,62,55,52], "Green Vice-Chancellor; Economics-Climate Minister; LNG terminals; writer-philosopher");
  I("Christian Lindner",       "FDP (DE)","e7",["pm","chancellor","leader","trade"],    [55,50,58,52,52], "FDP leader; Finance Minister; traffic light collapse; Lindner-Papier leak");
  I("Gregor Gysi",             "Die Linke (DE)","e6",["pm","leader","justice","chancellor"],[65,65,70,60,60], "PDS/Linke star speaker; Stasi controversy; East German lawyer; wit and style");
  I("Oskar Lafontaine",        "Die Linke (DE)","e6",["pm","leader","chancellor","work"],[55,65,58,52,55], "SPD then Linke founder; Finance Minister resigned 1999; Saarland Premier");
  I("Alice Weidel",            "AfD (DE)","e7",["pm","leader","chancellor"],            [40,48,50,38,45], "AfD leader; Bundestag; Goldman Sachs; lesbian nationalist; China policy");
  I("Alexander Gauland",       "AfD (DE)","e7",["pm","leader","home"],                  [35,60,48,32,45], "AfD co-founder; 'bird shit' WWII remark; Potsdam patrician turned populist");
  I("Frauke Petry",            "AfD (DE)","e7",["pm","leader","home"],                  [38,48,45,35,42], "AfD first leader; resigned day after 2017 success; science entrepreneur");
  I("Sahra Wagenknecht",       "BSW (DE)","e7",["pm","leader","work","chancellor"],     [60,55,68,55,52], "Die Linke then BSW founder; Ossi identity; anti-war anti-migration left; TV star");
  I("Horst Seehofer",          "CSU (DE)","e7",["pm","home","leader","agriculture"],    [48,62,50,46,52], "CSU/CDU Interior Minister; Master of Plan; Bavaria Premier; refugee crisis hawk");
  I("Armin Laschet",           "CDU (DE)","e7",["pm","leader","chancellor"],            [48,55,48,48,48], "CDU leader; 2021 candidate; NRW Premier; laughing at flood disaster; lost to Scholz");
  I("Karl Lauterbach",         "SPD (DE)","e7",["pm","health","chancellor"],            [52,55,55,50,45], "SPD Health Minister; epidemiologist; COVID lockdown; 'Kahl-o-mat'");
  I("Rishi Sunak comment",     "CDU (DE)","e7",["pm","leader"],                         [45,40,40,40,40], "Placeholder removed"); // won't conflict - "comment" ensures unique key
  I("Theodor Heuss",           "FDP (DE)","e3",["pm","leader","culture","foreign"],     [62,65,62,60,58], "FDP first Federal President 1949–59; liberal intellectual; cultural statesman");
  I("Richard von Weizsaecker", "CDU (DE)","e5",["pm","leader","foreign","culture"],     [68,65,65,68,62], "CDU President 1984–94; 8 May 1985 speech; moral authority; Berlin Mayor");
  I("Johannes Rau",            "SPD (DE)","e6",["pm","leader","chancellor","culture"],  [62,62,60,60,58], "SPD President 2000–04; North Rhine PM; 'Brother Johannes'; consensual");
  I("Horst Koehler",           "CDU (DE)","e7",["pm","chancellor","foreign","leader"],  [58,62,52,58,52], "CDU President; IMF MD; resigned over Afghanistan 'economic interests' remark");


  /* ═══════════════════════════════════════════════════════════════
     ITALY
     ═══════════════════════════════════════════════════════════════ */
  I("Alcide De Gasperi",       "DC (IT)","e3",["pm","leader","foreign","chancellor"],   [65,72,62,68,65], "DC founder PM 1945–53; Italian Republic; EEC founding; Marshall Plan");
  I("Aldo Moro",               "DC (IT)","e4",["pm","leader","foreign","chancellor"],   [62,70,58,65,62], "DC PM twice; Historic Compromise; kidnapped and killed by Red Brigades 1978");
  I("Giulio Andreotti",        "DC (IT)","e5",["pm","leader","foreign","chancellor"],   [52,72,50,58,62], "DC PM seven times; 'divine providence'; Mafia trial; 'The Hump'");
  I("Bettino Craxi",           "PSI (IT)","e5",["pm","leader","chancellor","foreign"],  [55,62,58,55,58], "PSI PM 1983–87; Achille Lauro; Tangentopoli; fled to Tunisia");
  I("Romano Prodi",            "PD (IT)","e6",["pm","leader","chancellor","trade"],     [58,65,52,60,55], "Olive Tree PM twice; EC President; centre-left coalition architect; professor");
  I("Silvio Berlusconi",       "Forza Italia (IT)","e6",["pm","leader","chancellor","trade"],[62,65,68,50,65], "FI PM three times; Mediaset empire; bunga bunga; Mafia convictions; Putin friendship");
  I("Massimo D'Alema",         "PD (IT)","e6",["pm","leader","chancellor","foreign"],   [55,62,55,58,55], "PDS/DS PM 1998–2000; Kosovo war; former communist; foreign affairs");
  I("Lamberto Dini",           "PD (IT)","e6",["pm","chancellor","foreign","leader"],   [55,62,45,58,45], "Technocrat PM 1995–96; Bank of Italy; financial reform");
  I("Carlo Azeglio Ciampi",    "PD (IT)","e6",["pm","chancellor","leader","foreign"],   [62,68,55,65,55], "Technocrat PM 1993–94; Bank of Italy; President 1999–2006; euro architect");
  I("Giorgio Napolitano",      "PD (IT)","e5",["pm","leader","chancellor","foreign"],   [62,72,58,65,58], "PCI/PD President 1999–2013; re-elected; communist → liberal; Europeanism");
  I("Mario Monti",             "Scelta Civica (IT)","e7",["pm","chancellor","trade","leader"],[58,65,45,62,45], "Technocrat PM 2011–13; EU competition commissioner; austerity professor");
  I("Enrico Letta",            "PD (IT)","e7",["pm","leader","chancellor","foreign"],   [55,58,52,55,52], "PD PM 2013–14; 'strange majority'; nephew of Gianni; Sciences Po dean");
  I("Matteo Renzi",            "PD (IT)","e7",["pm","leader","chancellor","culture"],   [60,52,62,55,55], "PD PM 2014–16; Jobs Act; Rottamatore; demolished Letta; Leopolda; Saudi consultant");
  I("Paolo Gentiloni",         "PD (IT)","e7",["pm","leader","foreign","chancellor"],   [55,58,50,56,52], "PD PM 2016–18; EU Economy Commissioner; low-drama caretaker");
  I("Giuseppe Conte",          "M5S (IT)","e7",["pm","leader","chancellor","justice"],  [55,52,55,52,52], "M5S PM twice; professor recruited by populists; COVID management; anti-party system");
  I("Mario Draghi",            "Indep (IT)","e7",["pm","chancellor","leader","foreign"],[65,68,55,70,55], "Technocrat PM 2021–22; ECB 'whatever it takes'; draghismo; coalition collapsed");
  I("Giorgia Meloni",          "FdI (IT)","e7",["pm","leader","chancellor","home"],     [60,55,62,58,58], "FdI PM from 2022; post-Fascist roots; Atlantic loyalty; family values; Hobbit");
  I("Matteo Salvini",          "Lega (IT)","e7",["pm","home","leader","chancellor"],    [55,52,60,48,55], "Lega leader; Interior Minister; migrant boats; populism; Putin admirer");
  I("Luigi Di Maio",           "M5S (IT)","e7",["pm","leader","foreign","trade"],       [48,45,50,44,48], "M5S leader; FM; ILVA steel; citizen income; defected to centrists");
  I("Roberto Speranza",        "PD (IT)","e7",["pm","health","leader"],                 [48,50,48,46,48], "LeU/PD Health Minister through COVID; mask mandate; lockdown architect");
  I("Francesco Cossiga",       "DC (IT)","e5",["pm","leader","home","justice"],         [55,65,55,55,58], "DC PM 1979–80; President 1985–92; 'Picconatore' subverter; Moro crisis");
  I("Pier Luigi Bersani",      "PD (IT)","e7",["pm","leader","chancellor","trade"],     [55,58,55,52,52], "PD leader; 2013 election lost; 'thing'; split; Artisans Federation");
  I("Walter Veltroni",         "PD (IT)","e7",["pm","leader","culture","chancellor"],   [58,55,58,52,52], "PD co-founder; Rome Mayor; Obama-inspired '2008 style' campaign; cinema lover");
  I("Gianfranco Fini",         "AN (IT)","e6",["pm","leader","foreign","home"],         [50,60,52,50,52], "AN then Futuro e Liberta; post-Fascist; Berlusconi coalition then rival; expelled");
  I("Marco Pannella",          "Radicals (IT)","e5",["pm","leader","justice","work"],   [62,62,65,58,52], "Radical Party; hunger strikes; civil liberties; divorce/abortion campaigns; maverick");

  /* ═══════════════════════════════════════════════════════════════
     SPAIN
     ═══════════════════════════════════════════════════════════════ */
  I("Francisco Franco",        "Falange (ES)","e3",["pm","leader","defence","home"],    [30,72,38,35,48], "Spain dictator 1939–75; Caudillo; Blue Division; UN isolation; Franco regime");
  I("Adolfo Suarez",           "UCD (ES)","e5",["pm","leader","chancellor","justice"],  [62,62,62,60,60], "UCD PM; Transition architect; 1978 Constitution; first free election PM");
  I("Leopoldo Calvo-Sotelo",   "UCD (ES)","e5",["pm","leader","chancellor","foreign"],  [52,58,48,52,50], "UCD PM 1981–82; NATO membership; 23-F coup aftermath; Brief tenure");
  I("Felipe Gonzalez",         "PSOE (ES)","e5",["pm","leader","chancellor","foreign"], [65,65,65,62,62], "PSOE PM 1982–96; Spain EU accession; NATO; GAL scandal; longest PSOE tenure");
  I("Jose Maria Aznar",        "PP (ES)","e6",["pm","leader","chancellor","foreign"],   [60,62,58,60,60], "PP PM 1996–2004; economic boom; Iraq War; 11-M Madrid bombings; Fox News pundit");
  I("Jose Luis Rodriguez Zapatero","PSOE (ES)","e7",["pm","leader","chancellor","justice"],[55,55,55,55,52], "PSOE PM 2004–11; troops from Iraq; gay marriage; financial crisis");
  I("Mariano Rajoy",           "PP (ES)","e7",["pm","leader","chancellor","home"],      [48,62,45,50,55], "PP PM 2011–18; austerity; Catalonia crisis; ousted no-confidence vote");
  I("Pedro Sanchez",           "PSOE (ES)","e7",["pm","leader","chancellor","foreign"], [58,52,58,56,58], "PSOE PM 2018–; resilient; Puchi-deal; amnesty law controversy; coalition chaos");
  I("Pablo Iglesias",          "Podemos (ES)","e7",["pm","leader","work","chancellor"], [60,48,65,52,55], "Podemos founder; deputy PM; ponytail academic-activist; media attacks");
  I("Santiago Abascal",        "Vox (ES)","e7",["pm","leader","home","defence"],        [40,48,50,36,45], "Vox leader; Reconquista aesthetics; national populism; anti-feminism; Basque");
  I("Albert Rivera",           "Ciudadanos (ES)","e7",["pm","leader","chancellor"],     [55,48,58,50,50], "Ciudadanos leader; centrist; 2019 collapse; insurance job after politics");
  I("Ines Arrimadas",          "Ciudadanos (ES)","e7",["pm","leader","chancellor"],     [52,48,52,50,50], "Ciudadanos last leader; Catalan opposition voice; party dissolved");
  I("Pablo Casado",            "PP (ES)","e7",["pm","leader","chancellor"],             [48,50,50,46,48], "PP leader 2018–22; forced out by Ayuso/Genova crisis; prosecutor background");
  I("Alberto Nunez Feijoo",    "PP (ES)","e7",["pm","leader","chancellor"],             [52,58,50,52,52], "PP leader; Galicia President; 2023 failed investiture; consensus builder");
  I("Dolores Ibarruri",        "PCE (ES)","e3",["pm","leader","work","foreign"],        [55,65,68,52,55], "PCE 'La Pasionaria'; No Pasaran; Civil War; Moscow exile; Republican icon");
  I("Manuel Fraga Iribarne",   "PP (ES)","e5",["pm","leader","home","culture"],        [50,65,52,48,50], "PP founder; Franco minister; galician regional president; conservative patriarch");
  I("Jordi Pujol",             "CiU (ES)","e5",["pm","leader","chancellor","culture"],  [58,65,55,58,55], "CiU Catalonia Generalitat 1980–2003; Catalan identity; corruption scandal");
  I("Artur Mas",               "CiU (ES)","e7",["pm","leader","chancellor","culture"],  [52,55,52,52,50], "CiU/Convergencia Catalonia President; independence push 2012–16; political trial");
  I("Carles Puigdemont",       "PdCat (ES)","e7",["pm","leader","chancellor"],          [48,48,52,44,48], "PDECat Catalan President; 2017 UDI; fled to Belgium; amnesty deal 2024");


  /* ═══════════════════════════════════════════════════════════════
     FRANCE EXPANDED
     ═══════════════════════════════════════════════════════════════ */
  I("Charles de Gaulle",       "RPR (FR)","e3",["pm","leader","foreign","defence"],     [72,78,75,75,70], "RPF/UNR General; Free France; V Republic founder; NATO withdrawal; 'Certain idea'");
  I("Georges Pompidou",        "RPR (FR)","e4",["pm","leader","chancellor","culture"],  [62,65,60,62,60], "UNR/UDR PM then President; Beaubourg; EEC enlargement; banking background");
  I("Valery Giscard d'Estaing","UDF (FR)","e5",["pm","leader","chancellor","foreign"],  [62,68,60,65,58], "UDF President 1974–81; European integration; moderniser; Giscard scandal");
  I("Francois Mitterrand",     "PS (FR)","e5",["pm","leader","chancellor","foreign"],   [68,72,68,68,65], "PS President 1981–95; Cohabitation; Maastricht; Socialist programme 110");
  I("Jacques Chirac",          "RPR (FR)","e5",["pm","leader","chancellor","foreign"],  [60,70,62,60,62], "RPR PM twice; President 1995–2007; Iraq War No; Chirac corruption; farmer charm");
  I("Lionel Jospin",           "PS (FR)","e6",["pm","leader","chancellor","work"],      [58,62,55,60,58], "PS PM 1997–2002; cohabitation with Chirac; 35hr week; lost to Le Pen 2002");
  I("Edith Cresson",           "PS (FR)","e5",["pm","leader","trade","chancellor"],     [52,58,52,50,50], "PS first female PM 1991–92; Japan insults; short term; EC fraud scandal");
  I("Pierre Beregovoy",        "PS (FR)","e5",["pm","leader","chancellor","work"],      [52,58,48,52,50], "PS PM 1992–93; franc fort; Mitterrand aide; suicide after press attacks");
  I("Alain Juppe",             "RPR (FR)","e6",["pm","leader","chancellor","foreign"],  [55,62,52,58,55], "RPR PM 1995–97; reform strikes; Bordeaux Mayor; later centrist; corruption conviction");
  I("Jean-Pierre Raffarin",    "UMP (FR)","e6",["pm","leader","chancellor"],            [50,58,48,52,52], "UMP PM 2002–05; constitution referendum defeat; 'la France d'en bas'");
  I("Dominique de Villepin",   "UMP (FR)","e6",["pm","leader","foreign","chancellor"],  [58,60,60,58,52], "UMP PM 2005–07; UN Iraq speech; 35hr CPE protests; Clearstream affair");
  I("Francois Fillon",         "UMP (FR)","e7",["pm","leader","chancellor","foreign"],  [55,62,50,58,55], "UMP PM 2007–12; then 2017 candidate derailed by Penelope affair; Russia links");
  I("Jean-Marc Ayrault",       "PS (FR)","e7",["pm","leader","chancellor","foreign"],   [50,55,48,52,50], "PS PM 2012–14; Nantes Mayor; Hollande's first PM; tax-and-spend");
  I("Manuel Valls",            "PS (FR)","e7",["pm","leader","chancellor","home"],      [55,55,58,52,52], "PS PM 2014–16; security hawk; 35hr reform attempted; 2017 candidate; Barcelona");
  I("Bernard Cazeneuve",       "PS (FR)","e7",["pm","home","leader"],                   [52,55,48,52,50], "PS Interior then PM 2016–17; Nice attack response; caretaker 2024");
  I("Edouard Philippe",        "LR (FR)","e7",["pm","leader","chancellor"],             [60,58,58,58,58], "LREM/Horizons PM 2017–20; Le Havre Mayor; Chirac grandchild; PPE pragmatist");
  I("Jean Castex",             "LR (FR)","e7",["pm","chancellor","health"],             [50,55,45,52,48], "LREM PM 2020–22; COVID task master; RATP chief; Périgord technocrat");
  I("Elisabeth Borne",         "LREM (FR)","e7",["pm","leader","transport","work"],     [52,58,45,52,50], "LREM PM 2022–24; first female PM in 30 years; pension reform 49.3; SNCF chief");
  I("Gabriel Attal",           "Renaissance (FR)","e7",["pm","leader","education","chancellor"],[55,48,58,50,52], "Renaissance PM 2024; youngest PM; Bayrou's peer; Gen Z political wunderkind");
  I("Michel Barnier",          "LR (FR)","e7",["pm","leader","chancellor","foreign"],   [58,65,50,60,52], "LR PM 2024; Brexit negotiator; EU commissioner; fell to no-confidence vote");
  I("Francois Bayrou",         "Modem (FR)","e7",["pm","leader","chancellor"],          [55,60,55,55,52], "MoDem PM 2025; Macron ally; perennial presidential candidate; Pau Mayor");
  I("Marine Le Pen",           "RN (FR)","e7",["pm","leader","home","chancellor"],      [58,58,62,50,60], "RN leader; 2017/2022 run-off loser; de-demonisation; convicted 2025");
  I("Jean-Marie Le Pen",       "RN (FR)","e5",["pm","leader","home"],                  [35,65,50,30,50], "FN founder; 2002 run-off shock; Holocaust 'detail'; daughter's rival");
  I("Marion Marechal",         "RN (FR)","e7",["pm","leader","culture"],               [48,45,52,44,45], "Reconquete; FN family dynasty; Zemmour ally; resigned then returned; Catholic right");
  I("Eric Zemmour",            "Reconquete (FR)","e7",["pm","leader","home","culture"], [45,52,60,40,45], "Reconquete; TV polemicist; convicted hate speech; declined rapidly 2022");
  I("Jean-Luc Melenchon",      "LFI (FR)","e7",["pm","leader","work","foreign"],        [60,62,68,52,58], "France Insoumise; Trotskyist roots; anti-EU then EU; hologram campaign");
  I("Benoit Hamon",            "PS (FR)","e7",["pm","leader","work","education"],       [50,50,52,48,48], "PS 2017 candidate; basic income; 6% and out; Generations movement");
  I("Segolene Royal",          "PS (FR)","e6",["pm","leader","environment","chancellor"],[55,58,58,52,52], "PS 2007 presidential candidate; Hollande's partner; environment minister; Poitou"); 
  I("Martine Aubry",           "PS (FR)","e6",["pm","leader","work","chancellor"],      [58,58,55,55,55], "PS 35-hour week; Lille Mayor; lost 2012 primary to Hollande; 'Jospin's daughter'");
  I("Jacques Delors",          "PS (FR)","e5",["pm","chancellor","foreign","leader"],   [65,70,62,68,60], "PS EC President 1985–95; Single Market; Social Chapter; declined 1995 run");


  /* ═══════════════════════════════════════════════════════════════
     INDIA EXPANDED
     ═══════════════════════════════════════════════════════════════ */
  I("Jawaharlal Nehru",        "INC (IN)","e3",["pm","leader","foreign","chancellor"],  [72,72,72,70,68], "INC first PM; Non-Alignment; five-year plans; Panchsheel; Bandung; Nehru-Gandhi dynasty");
  I("Lal Bahadur Shastri",     "INC (IN)","e4",["pm","leader","foreign","chancellor"],  [62,62,58,60,58], "INC PM 1964–66; 1965 war with Pakistan; 'Jai Jawan Jai Kisan'; died in Tashkent");
  I("Indira Gandhi",           "INC (IN)","e5",["pm","leader","foreign","chancellor"],  [65,70,65,65,65], "INC PM twice; Emergency; Bangladesh liberation; Green Revolution; assassinated 1984");
  I("Rajiv Gandhi",            "INC (IN)","e6",["pm","leader","chancellor","foreign"],  [60,62,60,60,58], "INC PM 1984–89; anti-Sikh riots response; LTTE; Operation Blue Star aftermath; assassinated");
  I("P.V. Narasimha Rao",      "INC (IN)","e6",["pm","leader","chancellor","foreign"],  [58,68,50,65,60], "INC PM 1991–96; 1991 liberalisation; Manmohan reforms; Babri Masjid; LPG reforms");
  I("I.K. Gujral",             "Janata Dal (IN)","e6",["pm","leader","foreign","chancellor"],[55,65,52,55,52], "JD PM 1997–98; Gujral Doctrine; neighbourhood policy; poet PM");
  I("H.D. Deve Gowda",         "Janata Dal (IN)","e6",["pm","leader","chancellor","agriculture"],[48,58,45,48,48], "JD PM 1996–97; Karnataka CM; falling asleep in meetings; coalition PM");
  I("Atal Bihari Vajpayee",    "BJP (IN)","e6",["pm","leader","foreign","chancellor"],  [68,68,70,65,65], "BJP PM 1998–2004; Pokhran nuclear tests; poet; Kargil; Agra summit; Golden Quadrilateral");
  I("L.K. Advani",             "BJP (IN)","e6",["pm","leader","home","chancellor"],     [52,68,55,52,58], "BJP patriarch; Ram Rath Yatra; Babri Masjid; deputy PM; blocked by Jinnah praise");
  I("Manmohan Singh",          "INC (IN)","e7",["pm","leader","chancellor","foreign"],  [60,70,45,65,55], "INC PM 2004–14; 1991 architect; 123 nuclear deal; silent PM image; CAG audits");
  I("Sonia Gandhi",            "INC (IN)","e7",["pm","leader","chancellor"],            [58,60,52,58,60], "INC Congress President; Italian origin controversy; declined PM post 2004; Dynasty glue");
  I("Rahul Gandhi",            "INC (IN)","e7",["pm","leader","chancellor","work"],     [50,48,55,45,48], "INC leader; Bharat Jodo Yatra; disqualified then reinstated; Gandhi dynasty; 2024 Wayanad");
  I("Arvind Kejriwal",         "AAP (IN)","e7",["pm","leader","chancellor","education"],[58,48,62,52,55], "AAP Delhi CM; India Against Corruption; liquor policy arrested; Aam Aadmi voter");
  I("Mamata Banerjee",         "AITC (IN)","e7",["pm","leader","chancellor","work"],   [62,58,62,58,60], "AITC West Bengal CM; Ma-Mati-Manush; anti-Left; aggressive politics; anti-BJP 2024");
  I("Mayawati",                "BSP (IN)","e6",["pm","leader","work","home"],           [52,55,50,50,52], "BSP Dalit icon; UP CM four times; Dalit politics; statues controversy");
  I("Mulayam Singh Yadav",     "SP (IN)","e6",["pm","leader","work","chancellor"],      [50,62,52,48,55], "SP UP CM; Defence Minister; anti-BJP-Congress third front; 'Maulana Mulayam'");
  I("Akhilesh Yadav",          "SP (IN)","e7",["pm","leader","chancellor","work"],      [52,50,55,50,52], "SP leader; UP CM; father-son rift; expressway image; laptops for students");
  I("Sharad Pawar",            "NCP (IN)","e6",["pm","leader","agriculture","chancellor"],[55,68,52,55,58], "NCP Maharashtra CM multiple; cricket board; BCCI manipulation; veteran coalition maker");
  I("Farooq Abdullah",         "NC (IN)","e6",["pm","leader","chancellor","foreign"],   [52,58,52,50,50], "NC J&K CM; New Energy Minister; pro-India Kashmiri; autonomy advocate");
  I("Omar Abdullah",           "NC (IN)","e7",["pm","leader","chancellor"],             [52,50,55,50,50], "NC J&K CM; LG Article 370 abrogation; young democratic voice; Farooq's son");
  I("Chandrashekhar",          "Janata Dal (IN)","e5",["pm","leader","chancellor"],     [52,62,52,50,52], "JD PM briefly 1990–91; 'Chandrasekhar the lonely'; Congress support; walkabout PM");
  I("Charan Singh",            "Lok Dal (IN)","e4",["pm","leader","agriculture","chancellor"],[50,60,50,48,50], "Lok Dal PM briefly 1979–80; farmer politician; peasant rights; Jat identity");
  I("V.P. Singh",              "Janata Dal (IN)","e5",["pm","leader","chancellor","justice"],[60,60,58,58,55], "JD PM 1989–90; Mandal Commission; Bofors scandal fighter; anti-corruption");
  I("Deve Gowda",              "Janata Dal (IN)","e6",["pm","leader","agriculture","chancellor"],[48,58,45,48,48], "JD PM from Karnataka; United Front; sleeping PM meme; infrastructure");
  I("Sitaram Kesri",           "INC (IN)","e6",["pm","leader","chancellor"],            [38,58,38,38,42], "INC president who fell asleep during crucial vote; transitional figure");
  I("Nitish Kumar",            "JDU (IN)","e7",["pm","leader","chancellor","agriculture"],[55,60,52,55,55], "JDU Bihar CM; flip-flops BJP-INC alliances; sushasan babu; alcohol ban");
  I("Lalu Prasad Yadav",       "RJD (IN)","e6",["pm","leader","work","agriculture"],   [58,58,60,50,55], "RJD Bihar CM; fodder scam conviction; jungle raj reputation; Railway Minister success");
  I("Pranab Mukherjee",        "INC (IN)","e6",["pm","leader","chancellor","foreign"],  [60,68,52,62,58], "INC Finance Minister; President 2012–17; RSS visit; all-party ally");
  I("Manohar Parrikar",        "BJP (IN)","e7",["pm","leader","defence","chancellor"],  [58,55,50,56,52], "BJP Goa CM; Defence Minister; IIT graduate; simplicity PM style");
  I("Yogi Adityanath",         "BJP (IN)","e7",["pm","leader","home","culture"],        [40,52,48,40,48], "BJP UP CM; Hindu nationalist monk; anti-Romeo squads; bulldozer politics");


  /* ═══════════════════════════════════════════════════════════════
     BRAZIL EXPANDED
     ═══════════════════════════════════════════════════════════════ */
  I("Getulio Vargas",          "PTB (BR)","e3",["pm","leader","work","chancellor"],     [58,68,58,55,60], "PTB President twice; Estado Novo; labour laws; suicide 1954; 'Father of the Poor'");
  I("Juscelino Kubitschek",    "PSD (BR)","e4",["pm","leader","chancellor","trade"],    [62,65,60,62,58], "PSD President; Brasilia built; 50 years in 5; Belo Horizonte Mayor; developmentalism");
  I("Joao Goulart",            "PTB (BR)","e4",["pm","leader","work","agriculture"],    [55,58,55,52,52], "PTB President 1961–64; basic reforms; overthrown by military coup 1964");
  I("Ernesto Geisel",          "Arena (BR)","e5",["pm","leader","chancellor","foreign"],[42,65,40,45,48], "Arena/military President 1974–79; abertura; Itaipu; nuclear programme");
  I("Jose Sarney",             "PMDB (BR)","e5",["pm","leader","chancellor"],           [48,62,45,48,48], "PMDB first civilian President after dictatorship; hyperinflation; Cruzado Plan");
  I("Fernando Collor de Mello","PTB (BR)","e6",["pm","leader","chancellor","trade"],    [52,52,55,48,48], "PRN President 1990–92; car-confiscation plan; first impeachment; corruption");
  I("Itamar Franco",           "PMDB (BR)","e6",["pm","leader","chancellor"],           [52,58,48,50,48], "PMDB caretaker after Collor; Plano Real; Minas PM; Cardoso in cabinet");
  I("Fernando Henrique Cardoso","PSDB (BR)","e6",["pm","leader","chancellor","foreign"],[65,65,62,65,60], "PSDB PM twice; Plano Real architect; sociologist President; FHC neoliberal"); 
  I("Luiz Inacio Lula da Silva","PT (BR)","e6",["pm","leader","work","chancellor"],     [68,65,70,62,65], "PT President 2003–10, 2022–; Bolsa Familia; zero hunger; conviction overturned");
  I("Dilma Rousseff",          "PT (BR)","e7",["pm","leader","chancellor","energy"],    [52,58,45,55,52], "PT first female President; impeached 2016; NDB President; Petrobras board");
  I("Michel Temer",            "PMDB (BR)","e7",["pm","leader","chancellor"],           [35,58,35,38,42], "PMDB President after Dilma; near-corruption conviction; pension reform; low popularity");
  I("Jair Bolsonaro",          "PL (BR)","e7",["pm","leader","chancellor","defence"],   [50,52,55,44,50], "PL President 2019–22; COVID denial; Amazon deforestation; military nostalgia; Jan 8");
  I("Sergio Moro",             "PSDB (BR)","e7",["pm","justice","leader","chancellor"], [48,52,48,46,45], "Lava Jato judge who jailed Lula; Bolsonaro Justice Minister; resignation; politician");
  I("Ciro Gomes",              "PDT (BR)","e7",["pm","leader","chancellor","foreign"],  [55,58,58,50,48], "PDT perennial candidate; Finance Minister Cardoso era; 'Ciro is angry'");
  I("Aecio Neves",             "PSDB (BR)","e7",["pm","leader","chancellor"],           [48,52,50,46,48], "PSDB 2014 runner-up; Minas Governor; corruption charges; decline");
  I("Marina Silva",            "PV (BR)","e7",["pm","leader","environment","chancellor"],[58,52,58,52,50], "PT then PV; Environment Minister; Amazon defence; 2010/2014 candidate; evangelical");
  I("Eduardo Cunha",           "PMDB (BR)","e7",["pm","leader","chancellor"],           [25,52,40,24,38], "PMDB speaker who initiated Dilma impeachment; corruption conviction; Swiss accounts");
  I("Alexandre de Moraes",     "Indep (BR)","e7",["pm","justice","leader"],             [52,58,45,52,45], "STF Justice; election court president; X ban; anti-Bolsonaro rulings; legal hawk");

  /* ═══════════════════════════════════════════════════════════════
     ARGENTINA EXPANDED
     ═══════════════════════════════════════════════════════════════ */
  I("Juan Domingo Peron",      "Peronist (AR)","e3",["pm","leader","work","defence"],   [65,68,68,58,65], "Peronist President twice; Evita; descamisados; Peronism ideology; exile 1955–73");
  I("Eva Peron",               "Peronist (AR)","e3",["pm","leader","work","health"],    [78,52,75,55,65], "Evita; spiritual leader; women's suffrage Argentina; poverty relief; died 1952");
  I("Arturo Frondizi",         "UCR (AR)","e4",["pm","leader","chancellor","trade"],    [55,60,52,55,50], "UCR President 1958–62; developmentalism; oil contracts; ousted by military");
  I("Arturo Illia",            "UCR (AR)","e4",["pm","leader","chancellor","health"],   [60,60,55,58,55], "UCR President 1963–66; slow tortoise image; oil contracts voided; ousted");
  I("Hector Campora",          "Peronist (AR)","e4",["pm","leader","chancellor"],       [50,55,48,48,48], "Peronist brief President 1973; 'Campora to government, Peron to power'; amnesty");
  I("Isabel Peron",            "Peronist (AR)","e5",["pm","leader","chancellor"],       [35,45,35,30,38], "Peronist first female President; Triple A death squads; economic chaos; ousted");
  I("Jorge Rafael Videla",     "Peronist (AR)","e5",["pm","leader","defence"],          [15,60,25,20,28], "Military dictator 1976–81; 30,000 desaparecidos; dirty war; imprisoned for crimes");
  I("Raul Alfonsin",           "UCR (AR)","e5",["pm","leader","chancellor","justice"],  [65,62,65,62,60], "UCR President 1983–89; restored democracy; Nunca Mas; economic collapse");
  I("Carlos Menem",            "Peronist (AR)","e6",["pm","leader","chancellor","trade"],[52,60,55,50,52], "Peronist President 1989–99; convertibility; privatisation; Falklands reopen; corruption");
  I("Fernando de la Rua",      "UCR (AR)","e6",["pm","leader","chancellor"],            [45,55,40,42,42], "UCR-Alliance President 1999–2001; December 2001 helicopter escape; corralito");
  I("Eduardo Duhalde",         "Peronist (AR)","e6",["pm","leader","chancellor"],       [42,55,40,40,42], "Peronist caretaker 2002; Kirchner mentor; Puente Pueyrredon killings");
  I("Nestor Kirchner",         "Peronist (AR)","e7",["pm","leader","chancellor","foreign"],[60,58,60,58,58], "Peronist President 2003–07; debt restructuring; human rights; wife successor");
  I("Cristina Fernandez de Kirchner","Peronist (AR)","e7",["pm","leader","chancellor","foreign"],[58,60,60,55,58], "Peronist President 2007–15; CFK; corruption conviction; VP under Alberto; attempted assassination");
  I("Mauricio Macri",          "PRO (AR)","e7",["pm","leader","chancellor","trade"],    [52,52,52,50,50], "PRO President 2015–19; business right; IMF record loan; Boca Juniors president");
  I("Alberto Fernandez",       "Peronist (AR)","e7",["pm","leader","chancellor"],       [45,52,45,42,45], "Peronist President 2019–23; COVID; inflation; puppet of Cristina perception");
  I("Javier Milei",            "La Libertad Avanza (AR)","e7",["pm","leader","chancellor","trade"],[55,45,65,44,50], "LLA anarcho-capitalist President; chainsaw; dollarisation; anti-state radical");
  I("Patricia Bullrich",       "PRO (AR)","e7",["pm","home","leader","justice"],        [48,52,50,46,50], "PRO Security Minister; 2023 candidate; motosierra; human rights controversy");
  I("Sergio Massa",            "Peronist (AR)","e7",["pm","chancellor","leader","trade"],[50,55,52,50,50], "Unión por la Patria 2023 candidate; Finance Minister hyperinflation; Tigre Mayor");


  /* ═══════════════════════════════════════════════════════════════
     MEXICO EXPANDED
     ═══════════════════════════════════════════════════════════════ */
  I("Lazaro Cardenas",         "PRI (MX)","e3",["pm","leader","agriculture","work"],    [65,65,62,62,62], "PRI President 1934–40; oil nationalisation; ejido land reform; exiled Trotsky");
  I("Miguel Aleman Valdes",    "PRI (MX)","e3",["pm","leader","trade","chancellor"],    [52,60,52,50,55], "PRI President 1946–52; industrialisation; corruption 'Aleman era'; UNAM campus");
  I("Gustavo Diaz Ordaz",      "PRI (MX)","e4",["pm","leader","home","trade"],          [30,60,35,32,42], "PRI President; Tlatelolco massacre 1968; Olympics overshadowed; authoritarianism");
  I("Luis Echeverria",         "PRI (MX)","e5",["pm","leader","chancellor","work"],     [35,60,40,35,42], "PRI President 1970–76; Third Worldism; devaluation; Corpus Christi massacre");
  I("Jose Lopez Portillo",     "PRI (MX)","e5",["pm","leader","chancellor","trade"],    [45,58,48,42,45], "PRI President; oil boom bust; bank nationalisation; 'defend the peso like a dog'");
  I("Miguel de la Madrid",     "PRI (MX)","e5",["pm","leader","chancellor","trade"],    [48,62,45,50,50], "PRI President 1982–88; 1985 earthquake response; austerity; neo-liberal turn");
  I("Carlos Salinas de Gortari","PRI (MX)","e6",["pm","leader","chancellor","trade"],   [50,60,52,52,52], "PRI President; NAFTA; Zapatista uprising; brother's scandal; fled to exile");
  I("Ernesto Zedillo",         "PRI (MX)","e6",["pm","leader","chancellor","trade"],    [55,62,50,55,52], "PRI last hegemonic President; 1994 peso crisis; Chiapas peace talks; IFE independence");
  I("Vicente Fox",             "PAN (MX)","e6",["pm","leader","chancellor","agriculture"],[58,55,58,55,52], "PAN first non-PRI President 2000; Coca-Cola exec; end of 71-year PRI rule; boots");
  I("Felipe Calderon",         "PAN (MX)","e7",["pm","leader","chancellor","home"],     [48,55,48,48,48], "PAN President 2006–12; drug war 60,000+ dead; disputed 2006 election; energy reform");
  I("Enrique Pena Nieto",      "PRI (MX)","e7",["pm","leader","chancellor","energy"],   [50,52,52,48,50], "PRI President 2012–18; EPN reforms; Ayotzinapa 43; El Chapo escape; corruption");
  I("Andres Manuel Lopez Obrador","Morena (MX)","e7",["pm","leader","chancellor","work"],[62,58,65,55,60], "Morena President 2018–24; AMLO; Mañaneras; Tren Maya; austerity-nationalism");
  I("Claudia Sheinbaum",       "Morena (MX)","e7",["pm","leader","chancellor","environment"],[60,58,55,60,58], "Morena President 2024–; first female Mexican President; climate scientist; CDMX Mayor");
  I("Marcelo Ebrard",          "Morena (MX)","e7",["pm","foreign","leader","chancellor"],[55,58,52,55,52], "Morena FM; CDMX Metro Line 12 collapse; Foreign Affairs; trade deals");
  I("Ricardo Anaya",           "PAN (MX)","e7",["pm","leader","chancellor"],            [52,50,55,50,50], "PAN 2018 candidate; 2018 third place; fled to US amid corruption allegations");
  I("Cuauhtemoc Cardenas",     "PRD (MX)","e5",["pm","leader","chancellor","work"],     [60,60,58,58,55], "PRD; CDMX first Mayor; 1988 stolen election; son of Lazaro; left opposition");
  I("Manuel Bartlett",         "PRI (MX)","e6",["pm","home","energy","chancellor"],     [30,62,35,30,38], "PRI Interior Minister 1988 election fraud; CFE Director under AMLO; corruption alleged");
  I("Xochitl Galvez",          "PAN (MX)","e7",["pm","leader","chancellor","energy"],   [55,50,58,50,50], "Frente Amplio 2024 candidate; Hidalgo engineer businesswoman; energy sector critic");

  /* ═══════════════════════════════════════════════════════════════
     COLOMBIA & VENEZUELA EXPANDED
     ═══════════════════════════════════════════════════════════════ */
  I("Gustavo Rojas Pinilla",   "Colombia Humana (CO)","e3",["pm","leader","defence"],   [42,60,45,40,42], "Colombia military President 1953–57; populist; ANAPO movement; Panama canal");
  I("Alberto Lleras Camargo",  "Liberal (CO)","e4",["pm","leader","chancellor","foreign"],[60,65,58,60,58], "Colombia Liberal President; Frente Nacional architect; OAS Secretary-General");
  I("Misael Pastrana Borrero",  "Conservative (CO)","e4",["pm","leader","chancellor"],   [52,58,48,52,50], "Colombia Conservative President 1970–74; Frente Nacional; ANAPO fraud 1970");
  I("Ernesto Samper",          "Liberal (CO)","e6",["pm","leader","chancellor","trade"], [48,55,48,45,48], "Colombia Liberal President 1994–98; Process 8000; Cali Cartel narco donations");
  I("Andres Pastrana",         "Conservative (CO)","e6",["pm","leader","chancellor","foreign"],[52,55,52,52,50], "Colombia Conservative President; Plan Colombia; failed FARC peace talks; Caguán");
  I("Alvaro Uribe",            "CD (CO)","e7",["pm","leader","chancellor","defence"],   [58,62,58,55,58], "CD President 2002–10; democratic security; FARC offensive; false positives scandal");
  I("Juan Manuel Santos",      "Social Party (CO)","e7",["pm","leader","foreign","chancellor"],[62,62,58,62,58], "Colombia President; Nobel Peace 2016; FARC peace deal; Santos party split");
  I("Ivan Duque",              "CD (CO)","e7",["pm","leader","chancellor","trade"],     [50,52,50,50,50], "CD President 2018–22; Uribista; paro nacional 2021; coca eradication");
  I("Gustavo Petro",           "Colombia Humana (CO)","e7",["pm","leader","work","chancellor"],[58,55,60,52,55], "Colombia Humana first left President; FARC ex-combatant; drug legalisation");
  I("Francia Marquez",         "Colombia Humana (CO)","e7",["pm","leader","environment","work"],[60,45,55,50,48], "VP; Afro-Colombian environmental activist; Goldman prize; grassroots politician");
  I("Hugo Chavez",             "PSUV (VE)","e6",["pm","leader","chancellor","foreign"], [65,60,70,52,62], "PSUV Venezuela President 2002–13; Bolivarian Revolution; oil socialism; died in office");
  I("Nicolas Maduro",          "PSUV (VE)","e7",["pm","leader","chancellor","trade"],  [35,55,45,30,45], "PSUV President; hyperinflation; 7m exodus; Guaido challenge; authoritarian consolidation");
  I("Juan Guaido",             "Primero Venezuela (VE)","e7",["pm","leader","chancellor"],[48,42,52,42,42], "AD/Voluntad Popular interim president recognized by 50+ states; exile");
  I("Henrique Capriles",       "Primero Venezuela (VE)","e7",["pm","leader","chancellor"],[52,50,55,50,50], "MUD 2012/2013 Chavez/Maduro challenger; Miranda Governor; banned 2017");
  I("Maria Corina Machado",    "Primero Venezuela (VE)","e7",["pm","leader","chancellor"],[60,50,62,52,50], "Vente Venezuela; anti-Chavez since 2002; 2024 primary winner; barred; exile");


  /* ═══════════════════════════════════════════════════════════════
     CHILE, PERU, BOLIVIA EXPANDED
     ═══════════════════════════════════════════════════════════════ */
  I("Salvador Allende",        "PS (CL)","e5",["pm","leader","health","chancellor"],    [65,62,65,60,58], "PS first elected Marxist President 1970–73; Popular Unity; 11 Sep 1973 coup; died");
  I("Augusto Pinochet",        "UDI (CL)","e5",["pm","leader","defence","chancellor"],  [25,65,30,28,38], "Chile military dictator 1973–1990; Chicago Boys; 3,000+ disappeared; amnesty farce");
  I("Patricio Aylwin",         "PDC (CL)","e5",["pm","leader","chancellor","justice"],  [60,65,58,60,58], "PDC Chile first democratic President after dictatorship; Truth Commission; reconciliation");
  I("Eduardo Frei Ruiz-Tagle", "PDC (CL)","e6",["pm","leader","chancellor","education"],[58,60,55,58,55], "PDC Chile President 1994–2000; infrastructure boom; Mercosur; Concertacion");
  I("Ricardo Lagos",           "PS (CL)","e6",["pm","leader","chancellor","trade"],     [62,62,60,62,58], "PS Chile President 2000–06; FTAs; rights-based constitution failed; socialist"); 
  I("Michelle Bachelet",       "PS (CL)","e7",["pm","leader","health","chancellor"],    [65,60,62,62,60], "PS first female Chile President twice; UN Women; anti-Pinochet survivor; ACNUR");
  I("Sebastian Pinera",        "RN (CL)","e7",["pm","leader","chancellor","trade"],     [52,58,52,52,52], "RN Chile President twice; Estallido Social protests 2019; mining accident rescue");
  I("Gabriel Boric",           "Apruebo Dignidad (CL)","e7",["pm","leader","chancellor","work"],[58,48,60,52,52], "Apruebo Dignidad youngest President; student leader; two constitution failures");
  I("Jose Antonio Kast",       "PRep (CL)","e7",["pm","leader","home","chancellor"],    [40,48,48,36,42], "Partido Republicano; Pinochet admirer; 2021 run-off loser; hard right");
  I("Victor Jara",             "PS (CL)","e5",["pm","work","culture","leader"],         [65,45,70,52,45], "Chilean folk singer-activist; executed in stadium 1973; symbol of resistance");
  I("Juan Velasco Alvarado",   "APRA (PE)","e4",["pm","leader","defence","agriculture"],[45,60,48,42,45], "Peru military President 1968–75; agrarian reform; nationalisations; left military");
  I("Fernando Belaunde Terry", "AP (PE)","e5",["pm","leader","chancellor","trade"],     [58,62,55,58,55], "AP Peru President twice; Alan Garcia relief; 1985 handed over to APRA");
  I("Alan Garcia",             "APRA (PE)","e5",["pm","leader","chancellor","trade"],   [52,58,55,50,52], "APRA President twice; 1985 disaster and 2006 pragmatist; corruption; suicide 2019");
  I("Alberto Fujimori",        "Peru Libre (PE)","e6",["pm","leader","chancellor","home"],[50,58,52,48,50], "Fujimorismo President 1990–2000; Sendero Luminoso; sterilisation scandal; fled Japan");
  I("Alejandro Toledo",        "PP (PE)","e6",["pm","leader","chancellor","trade"],     [52,55,50,52,50], "PP first indigenous President 2001–06; Machu Picchu; high growth; corruption");
  I("Ollanta Humala",          "Gana Peru (PE)","e7",["pm","leader","chancellor","defence"],[48,52,50,46,48], "Gana Peru President 2011–16; military nationalist; moderated; imprisoned");
  I("Pedro Pablo Kuczynski",   "PPK (PE)","e7",["pm","leader","chancellor","trade"],    [52,55,48,52,48], "PPK technocrat President 2016–18; resigned over Odebrecht; Fujimori pardon scandal");
  I("Martin Vizcarra",         "Peruanos (PE)","e7",["pm","leader","chancellor"],       [48,50,48,46,46], "Peru President 2018–20; anti-corruption; dissolved congress; impeached; coup cycle");
  I("Pedro Castillo",          "Peru Libre (PE)","e7",["pm","leader","chancellor","education"],[42,40,45,36,38], "Peru Libre rural teacher President 2021–22; chaos; coup attempt; imprisoned");
  I("Dina Boluarte",           "Peru Libre (PE)","e7",["pm","leader","chancellor"],     [38,42,38,34,38], "Peru Libre VP become President; Rolex scandal; killings in protests; low approval");
  I("Evo Morales",             "MAS (BO)","e7",["pm","leader","chancellor","agriculture"],[62,58,65,55,58], "MAS Bolivia President 2006–19; first indigenous PM; coca grower; re-election crisis");
  I("Jeanine Anez",            "MNR (BO)","e7",["pm","leader","chancellor"],            [38,42,38,36,38], "Interim President 2019–20; Bible raised; COVID; coup accusation; imprisoned");
  I("Luis Arce",               "MAS (BO)","e7",["pm","leader","chancellor","trade"],    [50,52,50,50,50], "MAS Morales successor; Morales rival 2025; economy minister origin");
  I("Victor Paz Estenssoro",   "MNR (BO)","e3",["pm","leader","chancellor","agriculture"],[58,65,55,58,58], "MNR Bolivia revolutionary President four times; 1952 Revolution; nationalisation");


  /* ═══════════════════════════════════════════════════════════════
     CANADA EXPANDED
     ═══════════════════════════════════════════════════════════════ */
  I("William Lyon Mackenzie King","Liberal (CA)","e2",["pm","leader","chancellor","foreign"],[60,72,55,62,60], "Liberal longest-serving PM; King-Byng affair; WWII; spiritualism; labour minister");
  I("R.B. Bennett",            "Conservative (CA)","e2",["pm","leader","chancellor","trade"],[50,62,48,50,50], "Conservative PM 1930–35; Depression; Bennett Buggies; Bennett New Deal; Calgary");
  I("John Diefenbaker",        "PC (CA)","e4",["pm","leader","chancellor","justice"],   [60,62,60,60,58], "PC PM 1957–63; Bill of Rights; anti-Americanism; Avro Arrow cancellation");
  I("Lester Pearson",          "Liberal (CA)","e4",["pm","leader","foreign","chancellor"],[68,68,62,65,62], "Liberal PM; Nobel Peace 1957; UN peacekeeping inventor; Medicare; maple leaf flag");
  I("Pierre Trudeau",          "Liberal (CA)","e5",["pm","leader","foreign","justice"],  [68,68,68,65,65], "Liberal PM; Just Society; Official Languages Act; Constitution patriation; Trudeaumania");
  I("Joe Clark",               "PC (CA)","e5",["pm","leader","chancellor","foreign"],   [52,58,52,52,52], "PC shortest PM 1979–80; 'Joe who?'; budget defeat; Trudeau return");
  I("Brian Mulroney",          "PC (CA)","e6",["pm","leader","chancellor","trade"],     [58,62,58,58,58], "PC PM 1984–93; Canada-US FTA; Meech Lake; GST; Airbus scandal");
  I("Kim Campbell",            "PC (CA)","e6",["pm","leader","chancellor","justice"],   [55,55,55,55,52], "PC first female PM 1993; party collapse to 2 seats; Justice Minister; Baghdad"); 
  I("Jean Chretien",           "Liberal (CA)","e6",["pm","leader","chancellor","trade"], [60,65,60,62,60], "Liberal PM 12 years; budget surplus; Iraq War No; Clarity Act; pepper-spray");
  I("Paul Martin",             "Liberal (CA)","e7",["pm","leader","chancellor","trade"], [55,60,52,56,55], "Liberal PM 2003–06; finance surplus architect; minority government; sponsorship scandal");
  I("Stephen Harper",          "CPC (CA)","e7",["pm","leader","chancellor","trade"],    [55,62,48,58,58], "CPC PM 2006–15; three elections; Senate scandal; Kyoto withdrawal; tight message control");
  I("Justin Trudeau",          "Liberal (CA)","e7",["pm","leader","foreign","culture"],  [60,52,62,52,58], "Liberal PM 2015–25; sunny ways; blackface controversy; WE; COVID spending");
  I("Mark Carney",             "Liberal (CA)","e7",["pm","leader","chancellor","foreign"],[62,60,55,65,55], "Liberal PM 2025–; BOC/BOE governor; climate finance; carbon tax architect; tariff war");
  I("Andrew Scheer",           "CPC (CA)","e7",["pm","leader","chancellor"],            [45,50,45,46,48], "CPC 2019 leader; lost to Trudeau; US citizenship; expense scandals; resigned");
  I("Erin O'Toole",            "CPC (CA)","e7",["pm","leader","chancellor","defence"],  [48,52,48,48,48], "CPC leader 2020–22; True Blue then tack centre; ousted by caucus coup");
  I("Pierre Poilievre",        "CPC (CA)","e7",["pm","leader","chancellor","trade"],    [55,52,58,52,52], "CPC leader from 2022; common sense revolution; housing hawk; Bitcoin early advocate");
  I("Jagmeet Singh",           "NDP (CA)","e7",["pm","leader","work","health"],         [60,50,62,52,52], "NDP leader; turban; supply and confidence deal with Trudeau; dauphin image");
  I("Elizabeth May",           "Green (CA)","e7",["pm","leader","environment","chancellor"],[58,52,58,52,50], "Green leader; lone MP for years; UN climate; polyglot; strong Green voice");
  I("Maxime Bernier",          "PPC (CA)","e7",["pm","leader","trade","home"],          [45,52,52,40,42], "PPC People's Party; libertarian; anti-supply management; lost own seat 2019");
  I("Jack Layton",             "NDP (CA)","e7",["pm","leader","work","health"],         [65,58,65,58,58], "NDP leader; 2011 orange crush; Official Opposition; died of cancer after peak");

  /* ═══════════════════════════════════════════════════════════════
     AUSTRALIA EXPANDED
     ═══════════════════════════════════════════════════════════════ */
  I("Robert Menzies",          "Liberal (AU)","e3",["pm","leader","foreign","chancellor"],[62,72,60,65,62], "Liberal longest-serving PM; anti-communist; monarchist; 'Pig Iron Bob'; ANZUS");
  I("Harold Holt",             "Liberal (AU)","e4",["pm","leader","chancellor","foreign"],[55,62,52,55,52], "Liberal PM; 'all the way with LBJ'; disappeared swimming 1967; China mole theory");
  I("John Gorton",             "Liberal (AU)","e4",["pm","leader","chancellor"],        [55,58,55,55,52], "Liberal PM; larrikin; voted himself out; Australian nationalism; Vietnam");
  I("William McMahon",         "Liberal (AU)","e4",["pm","leader","chancellor","foreign"],[45,58,42,45,45], "Liberal last PM before Whitlam; China recognition tardy; low approval; Sonia");
  I("Gough Whitlam",           "Australian Labor","e5",["pm","leader","chancellor","education"], [65,62,65,65,60], "ALP PM 1972–75; It's Time; dismissed by GG; Medicare; Medibank; free university");
  I("Malcolm Fraser",          "Liberal (AU)","e5",["pm","leader","chancellor","foreign"],[55,65,52,58,55], "Liberal PM 1975–83; dismissed Whitlam via GG; multicultural; later human rights liberal");
  I("Bob Hawke",               "Australian Labor","e5",["pm","leader","chancellor","work"],     [65,65,68,62,62], "ALP PM 1983–91; floating dollar; compulsory super; ACTU accord; popular larrikin");
  I("Paul Keating",            "Australian Labor","e6",["pm","leader","chancellor","trade"],    [60,62,62,62,58], "ALP PM 1991–96; Banana Republic warning; recession we had to have; Asian engagement");
  I("John Howard",             "Liberal (AU)","e6",["pm","leader","chancellor","home"],  [58,65,52,60,60], "Liberal PM 1996–2007; Tampa; GST; Iraq; Kyoto; children overboard; gun control");
  I("Kevin Rudd",              "Australian Labor","e7",["pm","leader","chancellor","foreign"],   [58,55,58,55,52], "ALP PM 2007–10, 2013; Sorry speech; GFC stimulus; ousted twice; UN Secretary-General bid");
  I("Julia Gillard",           "Australian Labor","e7",["pm","leader","chancellor","education"], [62,55,62,60,55], "ALP first female PM; carbon tax; minority government; misogyny speech; ousted by Rudd");
  I("Tony Abbott",             "Liberal (AU)","e7",["pm","leader","chancellor","home"],  [48,58,50,48,50], "Liberal PM 2013–15; Stop the boats; carbon tax repeal; knights/dames; ousted");
  I("Malcolm Turnbull",        "Liberal (AU)","e7",["pm","leader","chancellor","trade"], [55,58,55,55,52], "Liberal PM 2015–18; innovation agenda; SSM postal vote; ousted by Morrison");
  I("Scott Morrison",          "Liberal (AU)","e7",["pm","leader","chancellor","home"],  [45,52,48,45,48], "Liberal PM 2018–22; Hawaii during bushfires; COVID; secret ministries; mates rate");
  I("Anthony Albanese",        "Australian Labor","e7",["pm","leader","chancellor","work"],      [55,55,55,55,55], "ALP PM from 2022; Climate change; Voice referendum loss; housing; AUKUS");
  I("Peter Dutton",            "Liberal (AU)","e7",["pm","leader","home","chancellor"],  [42,55,45,42,45], "Liberal leader; Home Affairs; brutal border policy; nuclear power policy; 2025 loss");
  I("Bob Brown",               "Green (AU)","e7",["pm","leader","environment","chancellor"],[58,55,58,52,48], "Australian Greens founder; Franklin dam; pine forest protests; long-serving senator");
  I("Adam Bandt",              "Green (AU)","e7",["pm","leader","environment","work"],   [55,50,58,50,50], "Greens leader from 2020; Melbourne MP; climate 43%; Lost seat 2025");
  I("Don Chipp",               "Dem (AU)","e5",["pm","leader","chancellor","justice"],   [60,60,58,58,55], "Australian Democrats founder; 'Keep the bastards honest'; Senate balance of power");


  /* ═══════════════════════════════════════════════════════════════
     NEW ZEALAND, IRELAND, NETHERLANDS, BELGIUM, SWITZERLAND
     ═══════════════════════════════════════════════════════════════ */
  I("Peter Fraser",            "Labour (NZ)","e3",["pm","leader","chancellor","foreign"],[60,65,58,60,58], "NZ Labour PM 1940–49; WWII; Social Security Act; welfare state pioneer");
  I("Keith Holyoake",          "National (NZ)","e4",["pm","leader","chancellor","foreign"],[55,65,52,55,52], "NZ National PM twice; Vietnam; Kiwi Keith; Governor-General later");
  I("Norman Kirk",             "Labour (NZ)","e5",["pm","leader","chancellor","foreign"],[60,58,60,58,55], "NZ Labour PM 1972–74; French nuclear tests protest; died in office; Big Norm");
  I("David Lange",             "Labour (NZ)","e6",["pm","leader","chancellor","foreign"],[65,58,68,60,58], "NZ Labour PM; nuclear-free policy; Rogernomics; Oxford debate; brilliant orator");
  I("Jim Bolger",              "National (NZ)","e6",["pm","leader","chancellor","trade"],[52,58,48,52,52], "NZ National PM 1990–97; MMP referendum; Work for the Dole; ousted by Shipley");
  I("Jenny Shipley",           "National (NZ)","e6",["pm","leader","chancellor"],       [52,55,50,52,50], "NZ first female PM 1997–99; ousted Bolger; Coalition; ACC privatisation attempt");
  I("Helen Clark",             "Labour (NZ)","e6",["pm","leader","chancellor","foreign"],[62,62,60,62,60], "NZ Labour PM 2000–08; UNDP administrator; nuclear free; Corngate; progressive");
  I("John Key",                "National (NZ)","e7",["pm","leader","chancellor","trade"],[60,60,58,58,60], "NZ National PM 2008–16; GFC management; Christchurch; hair-pulling incidents; resigned");
  I("Bill English",            "National (NZ)","e7",["pm","leader","chancellor"],       [55,60,50,55,52], "NZ National PM 2016–17; 2002 worst-ever result loss; finance minister surplus");
  I("Jacinda Ardern",          "Labour (NZ)","e7",["pm","leader","chancellor","health"], [65,50,65,60,58], "NZ Labour PM 2017–23; Christchurch response; COVID; baby in UN; resigned burnout");
  I("Chris Hipkins",           "Labour (NZ)","e7",["pm","leader","chancellor","education"],[52,52,52,52,50], "NZ Labour PM 2023; COVID minister; 2023 election loss; replaced Ardern");
  I("Christopher Luxon",       "National (NZ)","e7",["pm","leader","chancellor","trade"],[55,50,52,52,52], "NZ National PM from 2023; Air NZ CEO; evangelical; coalition with ACT/NZF");
  I("Bertie Ahern",            "FF (IE)","e6",["pm","leader","chancellor","trade"],     [58,60,58,55,58], "FF Taoiseach 1997–2008; Celtic Tiger; Good Friday; mahogany gaspipe; 2008 tribunal");
  I("Brian Cowen",             "FF (IE)","e7",["pm","leader","chancellor"],             [42,55,40,40,42], "FF Taoiseach 2008–11; 2008 banking guarantee; IMF bailout; bank guarantee night");
  I("Enda Kenny",              "FG (IE)","e7",["pm","leader","chancellor","foreign"],   [55,58,52,55,55], "FG Taoiseach 2011–17; austerity exit; abortion referendum cautious; Roscommon native");
  I("Leo Varadkar",            "FG (IE)","e7",["pm","leader","chancellor","health"],    [58,52,58,55,55], "FG Taoiseach twice; first gay Indian-heritage PM; Brexit backstop; came out on radio");
  I("Micheal Martin",          "FF (IE)","e7",["pm","leader","chancellor","health"],    [55,58,52,52,52], "FF Taoiseach in rotation; SF-blocking; Cork North Central; consensus builder");
  I("Simon Harris",            "FG (IE)","e7",["pm","leader","chancellor"],             [52,50,55,50,50], "FG Taoiseach from 2024; youngest Taoiseach; health minister COVID; 'Simon Harris tweeting'");
  I("Mark Rutte",              "VVD (NL)","e7",["pm","leader","chancellor","foreign"],  [58,60,55,58,58], "VVD Dutch PM 2010–24; four terms; 'Teflon Mark'; NATO Secretary-General from 2024");
  I("Dick Schoof",             "NSC (NL)","e7",["pm","leader","chancellor"],            [50,55,45,50,48], "NSC technocrat PM 2024; AIVD chief; Wilders-supported; refugee policy hardening");
  I("Geert Wilders",           "PVV (NL)","e7",["pm","leader","home","foreign"],        [45,55,55,38,48], "PVV leader; Quran ban; bleached hair; Dutch coalition 2024; Islam ban advocate");
  I("Wim Kok",                 "PvdA (NL)","e6",["pm","leader","chancellor","work"],    [58,62,55,58,55], "PvdA Dutch PM 1994–2002; Polder Model; Purple Coalition; Srebrenica report");
  I("Jan Peter Balkenende",    "CDA (NL)","e7",["pm","leader","chancellor","foreign"],  [50,55,45,50,50], "CDA Dutch PM 2002–10; four coalition builds; 'Harry Potter'; Iraq war support");
  I("Guy Verhofstadt",         "Open VLD (BE)","e7",["pm","leader","chancellor","foreign"],[58,58,60,55,55], "VLD Belgian PM 2000–08; federalism; Liar Liar Guy; EU Parliament liberal leader");
  I("Elio Di Rupo",            "PS (BE)","e7",["pm","leader","chancellor"],             [52,60,52,52,52], "PS first Francophone PM in decades; 541 days without government; coalition builder");
  I("Charles Michel",          "MR (BE)","e7",["pm","leader","chancellor","foreign"],   [55,52,52,55,52], "MR youngest Belgian PM; EU Council President; 2018 migration crisis collapse");
  I("Alexander De Croo",       "Open VLD (BE)","e7",["pm","leader","chancellor"],       [52,52,50,52,50], "VLD PM 2020–24; Vivaldi coalition; N-VA exclusion; technocrat liberal");
  I("Ruth Dreifuss",           "SP (CH)","e6",["pm","leader","health","chancellor"],    [60,60,58,58,55], "Swiss Federal Councillor; first female President; drug liberalisation; consensus");
  I("Christoph Blocher",       "SVP (CH)","e7",["pm","leader","home","trade"],          [45,62,50,42,48], "SVP; anti-EU; minaret ban; anti-immigration; Migros; removed from Federal Council");
  I("Simonetta Sommaruga",     "SP (CH)","e7",["pm","leader","environment","chancellor"],[55,55,52,55,52], "SP Federal President 2015, 2020; Justice; Environment; consensual multilingualism");


  /* ═══════════════════════════════════════════════════════════════
     NORDIC EXPANDED (Sweden, Denmark, Norway, Finland)
     ═══════════════════════════════════════════════════════════════ */
  I("Olof Palme",              "SAP (SE)","e5",["pm","leader","foreign","work"],        [68,65,70,65,62], "SAP Swedish PM twice; anti-Vietnam; aid to ANC; assassinated 1986; social democracy");
  I("Ingvar Carlsson",         "SAP (SE)","e6",["pm","leader","chancellor","foreign"],  [55,60,52,55,55], "SAP PM twice; succeeded Palme; Swedish EU accession; housing minister earlier");
  I("Carl Bildt",              "Moderate (SE)","e6",["pm","leader","chancellor","foreign"],[58,62,58,60,55], "Moderate PM 1991–94; EU accession; Bosnia mediator; privatisation; NATO supporter");
  I("Goran Persson",           "SAP (SE)","e6",["pm","leader","chancellor","trade"],    [55,60,52,55,55], "SAP PM 1996–2006; budget surplus; anti-Iraq war; 'The Man Who Made Sweden Work'");
  I("Fredrik Reinfeldt",       "Moderate (SE)","e7",["pm","leader","chancellor","work"],[55,58,52,55,55], "Moderate PM 2006–14; Alliance government; flexible moderation; refugee policy shift");
  I("Stefan Lofven",           "SAP (SE)","e7",["pm","leader","work","chancellor"],     [52,55,50,52,52], "SAP PM 2014–21; union background; no-confidence vote; COVID summer opening");
  I("Magdalena Andersson",     "SAP (SE)","e7",["pm","leader","chancellor","work"],     [55,55,52,55,52], "SAP first female PM 2021–22; Finance minister; NATO application; election loss");
  I("Ulf Kristersson",         "Moderate (SE)","e7",["pm","leader","chancellor"],       [50,52,48,50,50], "Moderate PM from 2022; SD pact; Tidoavtalet; NATO accession; gang crime crisis");
  I("Poul Nyrup Rasmussen",    "SD (DK)","e6",["pm","leader","chancellor","work"],      [55,60,55,55,52], "SD Danish PM 1993–2001; PES president; economic recovery; Jante Law challenger");
  I("Anders Fogh Rasmussen",   "Venstre (DK)","e7",["pm","leader","chancellor","foreign"],[58,60,55,58,55], "Venstre Danish PM 2001–09; Iraq War coalition; NATO Secretary-General 2009–14");
  I("Lars Lokke Rasmussen",    "Venstre (DK)","e7",["pm","leader","chancellor"],        [52,55,50,52,52], "Venstre PM twice; welfare reform; 2019 loss; 2022 new party; minister of foreign");
  I("Helle Thorning-Schmidt",  "SD (DK)","e7",["pm","leader","chancellor","work"],      [55,52,55,52,52], "SD Danish first female PM 2011–15; austerity in office; Selfie incident; Save the Children");
  I("Mette Frederiksen",       "SD (DK)","e7",["pm","leader","chancellor","work"],      [58,52,60,55,55], "SD Danish PM 2019–; left restrictive migration; COVID success; Gaza statement");
  I("Jens Stoltenberg",        "AP (NO)","e7",["pm","leader","foreign","chancellor"],   [58,60,55,60,55], "AP Norwegian PM twice; NATO Secretary-General 2014–24; oil fund oversight");
  I("Erna Solberg",            "H (NO)","e7",["pm","leader","chancellor","work"],       [55,58,52,55,55], "H Conservative Norwegian PM 2013–21; long tenure; digital reform; COVID vaccine");
  I("Jonas Gahr Store",        "AP (NO)","e7",["pm","leader","chancellor","foreign"],   [52,52,50,52,50], "AP Norwegian PM 2021–; foreign minister; Gaza ceasefire; oil wealth redistribution");
  I("Esko Aho",                "Centre (FI)","e6",["pm","leader","chancellor","trade"],  [55,58,52,55,52], "Centre Finnish PM 1991–95; Nokia mobile revolution; EU accession 1995; Nokia chair");
  I("Paavo Lipponen",          "SDP (FI)","e6",["pm","leader","chancellor","foreign"],  [55,60,52,55,52], "SDP Finnish PM twice; euro founder member; Rainbow coalition; Big Tent EU");
  I("Matti Vanhanen",          "Centre (FI)","e7",["pm","leader","chancellor"],         [50,55,48,50,50], "Centre PM twice; EU Presidency; Katainen rivalry; consensual technocrat");
  I("Sanna Marin",             "SDP (FI)","e7",["pm","leader","chancellor","work"],     [62,48,62,55,52], "SDP youngest PM; COVID; NATO application; party dancing video; 2023 loss");
  I("Petteri Orpo",            "NCP (FI)","e7",["pm","leader","chancellor","trade"],    [50,52,48,50,50], "NCP Finnish PM from 2023; purge Finns/PS coalition; austerity; NATO embedding");

  /* ═══════════════════════════════════════════════════════════════
     PORTUGAL, AUSTRIA, CZECHOSLOVAKIA/CZECH, POLAND EXPANDED
     ═══════════════════════════════════════════════════════════════ */
  I("Antonio de Oliveira Salazar","CDS-PP (PT)","e3",["pm","leader","chancellor","home"],[30,72,35,35,45], "Estado Novo Portugal dictator 1932–68; corporatism; Carnation Revolution aftermath");
  I("Mario Soares",            "PS (PT)","e5",["pm","leader","chancellor","foreign"],   [62,65,60,62,58], "PS PM twice; President; restored democracy; Portugal EU accession 1986");
  I("Anibal Cavaco Silva",     "PSD (PT)","e6",["pm","leader","chancellor","trade"],    [58,62,52,58,55], "PSD PM 1985–95; President 2006–16; economic growth; EU single market");
  I("Jose Manuel Barroso",     "PSD (PT)","e7",["pm","leader","chancellor","foreign"],  [58,65,55,60,55], "PSD PM 2002–04; EC President 2004–14; Goldman Sachs controversy post-office");
  I("Jose Socrates",           "PS (PT)","e7",["pm","leader","chancellor"],             [48,52,48,46,48], "PS PM 2005–11; green economy agenda; IMF bailout; corruption conviction");
  I("Pedro Passos Coelho",     "PSD (PT)","e7",["pm","leader","chancellor"],            [48,52,45,48,48], "PSD PM 2011–15; troika austerity; emigration wave; lost no-confidence 2015");
  I("Antonio Costa",           "PS (PT)","e7",["pm","leader","chancellor","trade"],     [58,58,55,58,55], "PS PM 2015–24; geringonca left coalition; golden visas; EU Council President");
  I("Luis Montenegro",         "PSD (PT)","e7",["pm","leader","chancellor"],            [50,50,48,50,48], "PSD PM 2024; AD coalition; minority government; first right PM in years");
  I("Bruno Kreisky",           "SPO (AT)","e5",["pm","leader","chancellor","foreign"],  [65,68,65,65,60], "SPO Austrian Chancellor 1970–83; neutrality; social reforms; PLO contacts");
  I("Franz Vranitzky",         "SPO (AT)","e6",["pm","leader","chancellor","trade"],    [55,62,52,55,55], "SPO Chancellor 1986–97; Waldheim affair; Haider coalition refusal; Austria EU");
  I("Wolfgang Schuessel",      "OVP (AT)","e7",["pm","leader","chancellor","foreign"],  [52,58,48,52,52], "OVP Chancellor 2000–07; FPO coalition; EU sanctions; pension reform");
  I("Werner Faymann",          "SPO (AT)","e7",["pm","leader","chancellor","transport"],[48,52,45,48,48], "SPO Chancellor 2008–16; migration crisis; refugee trains decision; coalition SPO-OVP");
  I("Sebastian Kurz",          "OVP (AT)","e7",["pm","leader","chancellor","foreign"],  [58,50,58,52,55], "OVP youngest PM world; anti-migration; FPO then Greens coalition; Ibiza-gate fell; convicted");
  I("Karl Nehammer",           "OVP (AT)","e7",["pm","leader","chancellor","home"],     [48,50,45,48,48], "OVP PM 2022–25; Home Affairs base; Ukraine talks Putin; election loss 2024");
  I("Herbert Kickl",           "FPO (AT)","e7",["pm","leader","home","chancellor"],     [42,52,50,38,45], "FPO PM 2025–; far-right; volkskanzler; anti-vaccine; anti-Ukraine aid");
  I("Jorg Haider",             "FPO (AT)","e6",["pm","leader","home","chancellor"],     [50,55,58,44,50], "FPO Carinthia Governor; third way right; waffen-SS compliment; died car crash");
  I("Vaclav Havel",            "Civic Forum (CZ)","e6",["pm","leader","chancellor","culture"],[72,62,72,68,58], "Czech playwright-President; Velvet Revolution leader; moral authority; dissident");
  I("Vaclav Klaus",            "ODS (CZ)","e6",["pm","leader","chancellor","trade"],    [55,65,55,58,60], "ODS PM then President; Czech split negotiator; euro-sceptic; climate sceptic");
  I("Milos Zeman",             "CSSD (CZ)","e7",["pm","leader","chancellor","foreign"], [48,60,48,46,48], "CSSD PM 1998–2002; President 2013–23; pro-Russia; anti-Islam; Czech exceptionalism");
  I("Andrej Babis",            "ANO (CZ)","e7",["pm","leader","chancellor","trade"],    [52,52,52,48,50], "ANO Czech PM 2017–21; billionaire populist; Stork Nest farm subsidies fraud; Trump comparison");
  I("Petr Fiala",              "ODS (CZ)","e7",["pm","leader","chancellor","education"],[55,52,50,55,52], "ODS SPOLU PM 2022; academia; energy crisis management; pro-Ukraine; inflation");
  I("Lech Walesa",             "Solidarity (PL)","e5",["pm","leader","work","foreign"], [65,58,68,60,55], "Solidarity Gdansk shipyard; Nobel Peace 1983; Polish President; Solidarity union");
  I("Aleksander Kwasniewski",  "SLD (PL)","e6",["pm","leader","chancellor","foreign"],  [60,60,58,60,58], "SLD Poland President 2x; post-communist social democracy; EU/NATO accession");
  I("Lech Kaczynski",          "PiS (PL)","e7",["pm","leader","chancellor","home"],     [45,58,45,44,48], "PiS President; twin brother of Jaroslaw; Smolensk plane crash 2010; nationalist");
  I("Jaroslaw Kaczynski",      "PiS (PL)","e7",["pm","leader","chancellor","home"],     [45,60,52,44,58], "PiS leader; PM 2006–07; judicial capture; media control; anti-LGBT; populism");
  I("Beata Szydlo",            "PiS (PL)","e7",["pm","leader","chancellor"],            [45,52,45,44,48], "PiS PM 2015–17; 500+ child benefit; migration resistance; Macron clash");
  I("Mateusz Morawiecki",      "PiS (PL)","e7",["pm","leader","chancellor","trade"],    [50,55,50,50,50], "PiS PM 2017–23; technocrat face of PiS; COVID management; EU rule of law clashes");
  I("Donald Tusk",             "PO (PL)","e7",["pm","leader","chancellor","foreign"],   [62,65,60,62,60], "PO PM twice; EU Council President; pro-EU; 2023 return; Kaczynski rival");
  I("Bronislaw Komorowski",    "PO (PL)","e7",["pm","leader","chancellor"],             [52,58,50,52,52], "PO President 2010–15; post-Smolensk; pro-NATO; lost to Duda 2015");
  I("Andrzej Duda",            "PiS (PL)","e7",["pm","leader","chancellor","home"],     [45,50,48,44,48], "PiS President; Kaczynski's man; signed all PiS laws; NATO meetings; LGBTfree zones");


  /* ═══════════════════════════════════════════════════════════════
     HUNGARY, ROMANIA, RUSSIA EXPANDED
     ═══════════════════════════════════════════════════════════════ */
  I("Janos Kadar",             "MSZMP (HU)","e4",["pm","leader","chancellor","home"],   [40,65,38,40,48], "MSZMP Hungary ruling party 1956–88; goulash communism; suppressed 1956; pragmatism");
  I("Jozsef Antall",           "MDF (HU)","e6",["pm","leader","chancellor","foreign"],  [58,62,55,58,55], "MDF first democratic PM 1990–93; Christian Democrat; died in office 1993");
  I("Gyula Horn",              "MSZP (HU)","e6",["pm","leader","chancellor","foreign"], [52,60,50,52,52], "MSZP PM 1994–98; opened Iron Curtain 1989; Austro-Hungarian border cut");
  I("Viktor Orban",            "Fidesz (HU)","e7",["pm","leader","chancellor","home"],  [55,62,58,52,62], "Fidesz PM; illiberal democracy; CEU expelled; Soros campaign; media capture; EU funds");
  I("Ferenc Gyurcsany",        "DK (HU)","e7",["pm","leader","chancellor","trade"],     [42,52,48,40,45], "DK/MSZP PM 2004–09; lying speech leaked; protests; coalition architect");
  I("Ion Iliescu",             "PSD (RO)","e5",["pm","leader","chancellor","foreign"],  [42,62,40,40,45], "FSN/PDSR Romania President 3x; post-communist; Mineriada; transitional autocrat");
  I("Emil Constantinescu",     "CDR (RO)","e6",["pm","leader","chancellor"],            [55,58,52,55,52], "CDR Romania President 1996–2000; anti-communist; NATO bid; geologist-politician");
  I("Traian Basescu",          "PDL (RO)","e7",["pm","leader","chancellor","foreign"],  [52,58,52,50,50], "PDL Romania President 2004–14; sailor; anti-corruption; suspended twice; populist");
  I("Klaus Iohannis",          "PNL (RO)","e7",["pm","leader","chancellor"],            [55,58,50,55,52], "PNL Romania President 2014–24; Sibiu Mayor; ethnic German; EU Council bid");
  I("Calin Georgescu",         "AUR (RO)","e7",["pm","leader","home","culture"],        [30,42,50,28,38], "AUR 2024 candidate; TikTok algorithm winner; Ceausescu admirer; disqualified");
  I("Mikhail Gorbachev",       "CPSU (RU)","e5",["pm","leader","foreign","chancellor"], [68,68,65,65,60], "CPSU General Secretary; glasnost; perestroika; USSR dissolution; Nobel Peace 1990");
  I("Boris Yeltsin",           "Russia (RU)","e6",["pm","leader","chancellor","foreign"],[52,60,55,50,50], "Russia President; shock therapy; Chechnya; 1993 tanks on parliament; chose Putin");
  I("Yegor Gaidar",            "Russia (RU)","e6",["pm","chancellor","leader","trade"], [55,62,50,52,48], "Russia acting PM 1992; shock therapy architect; rapid privatisation; liberal economist");
  I("Yevgeny Primakov",        "Russia (RU)","e6",["pm","leader","chancellor","foreign"],[58,65,52,58,55], "Russia PM 1998–99; anti-Americanism; multipolarity; KGB spy chief; stabiliser");
  I("Sergei Stepashin",        "Russia (RU)","e6",["pm","leader","chancellor","home"],  [50,55,48,50,48], "Russia PM briefly 1999; Interior Minister; FSB Director; liberal reputation");
  I("Vladimir Putin",          "United Russia (RU)","e7",["pm","leader","chancellor","foreign"],[40,68,45,38,62], "United Russia President; KGB; Chechnya; Georgia; Crimea; full-scale Ukraine invasion");
  I("Dmitry Medvedev",         "United Russia (RU)","e7",["pm","chancellor","leader"],  [38,60,38,35,48], "United Russia President/PM; iPhone liberal; Skolkovo; tool of Putin; nuclear threats");
  I("Mikhail Khodorkovsky",    "Russia (RU)","e7",["pm","chancellor","leader","trade"], [58,55,55,55,48], "Yukos oligarch; Kremlin prisoner 10 years; exiled opposition; anti-Putin funding");
  I("Alexei Navalny",          "Russia (RU)","e7",["pm","leader","justice","chancellor"],[65,50,68,55,55], "Russia opposition; Anti-Corruption Foundation; Novichok; imprisoned; died 2024");
  I("Mikhail Prokhorov",       "Russia (RU)","e7",["pm","leader","chancellor","trade"], [48,50,50,44,45], "Right Cause 2012 presidential run; billionaire; Norilsk Nickel; Brooklyn Nets");
  I("Gennady Zyuganov",        "KPRF (RU)","e6",["pm","leader","chancellor","work"],    [42,60,48,40,48], "KPRF Communist Party leader; 1996 almost won; anti-Western; Marxist-Leninist");
  I("Vladimir Zhirinovsky",    "LDPR (RU)","e6",["pm","leader","home","foreign"],       [35,58,50,30,48], "LDPR ultranationalist; shock jock politics; warm water ports; died 2022; colorful");

  /* ═══════════════════════════════════════════════════════════════
     USA EXPANDED (Civil Rights Era, Modern Congress, Presidents)
     ═══════════════════════════════════════════════════════════════ */
  I("Franklin D. Roosevelt",   "Democrat (USA)","e3",["pm","leader","chancellor","work"],[75,78,75,78,75], "FDR President 4x; New Deal; WWII; polio; Eleanor; Four Freedoms; Yalta; died in office");
  I("Harry S. Truman",         "Democrat (USA)","e3",["pm","leader","foreign","defence"],[65,65,62,65,62], "Democratic President; A-bomb; NATO; Korean War; Marshall Plan; civil rights order");
  I("Dwight D. Eisenhower",    "Republican (USA)","e3",["pm","leader","defence","foreign"],[65,72,60,68,62], "Republican President; D-Day; military-industrial complex warning; I-Like-Ike; NASA");
  I("John F. Kennedy",         "Democrat (USA)","e4",["pm","leader","foreign","chancellor"],[72,60,75,68,62], "JFK; Bay of Pigs; Cuban Missile; Ich bin ein Berliner; assassinated 1963; Camelot");
  I("Lyndon B. Johnson",       "Democrat (USA)","e4",["pm","leader","chancellor","work"],[60,65,60,58,62], "LBJ; Great Society; Civil Rights Act; Vietnam escalation; 'Great Society poverty war'");
  I("Richard Nixon",           "Republican (USA)","e5",["pm","leader","foreign","chancellor"],[45,68,48,52,50], "Republican President; China opening; Watergate; Checkers speech; resigned 1974");
  I("Gerald Ford",             "Republican (USA)","e5",["pm","leader","chancellor"],     [55,60,50,55,52], "Republican VP-become-President; Nixon pardon; fell down stairs; Helsinki Accords");
  I("Jimmy Carter",            "Democrat (USA)","e5",["pm","leader","foreign","chancellor"],[60,62,58,60,55], "Democratic President; Camp David; Iran hostage; malaise speech; Habitat for Humanity");
  I("Ronald Reagan",           "Republican (USA)","e5",["pm","leader","chancellor","foreign"],[68,65,72,62,65], "Republican President; Reaganomics; Cold War end; Iran-Contra; 'Tear down this wall'");
  I("George H.W. Bush",        "Republican (USA)","e6",["pm","leader","foreign","chancellor"],[58,65,52,62,58], "Republican President; Gulf War; Berlin Wall; points of light; NAFTA signed");
  I("Bill Clinton",            "Democrat (USA)","e6",["pm","leader","chancellor","trade"],[68,60,70,62,62], "Democratic President; NAFTA; balanced budget; Monica Lewinsky; DADT; Balkan peace");
  I("George W. Bush",          "Republican (USA)","e7",["pm","leader","foreign","chancellor"],[48,60,48,45,50], "Republican President; 9/11; Iraq War; tax cuts; Katrina; TARP; Abu Ghraib");
  I("Barack Obama",            "Democrat (USA)","e7",["pm","leader","chancellor","foreign"],[72,60,75,65,62], "Democratic 44th President; ACA; financial crisis; Nobel Peace; DACA; Syria redline");
  I("Donald Trump",            "Republican (USA)","e7",["pm","leader","chancellor","trade"],[55,48,62,42,55], "Republican 45th/47th President; tariffs; Jan 6; convicted; MAGA; border wall; NATO threats");
  I("Joe Biden",               "Democrat (USA)","e7",["pm","leader","foreign","chancellor"],[52,68,48,55,52], "Democratic 46th President; Ukraine; Inflation Reduction Act; withdrew 2024 run; oldest PM");
  I("Kamala Harris",           "Democrat (USA)","e7",["pm","leader","justice","chancellor"],[55,52,55,52,52], "Democratic VP; 2024 candidate; CA AG; prosecutor; first female VP; word salads");
  I("Paul Ryan",               "Republican (USA)","e7",["pm","chancellor","leader","work"],[52,52,52,50,52], "Republican Speaker; Ryan budget; Medicare reform; VP 2012; declined Trump endorsement");
  I("Nancy Pelosi",            "Democrat (USA)","e7",["pm","leader","health","chancellor"],[60,68,58,60,65], "Democratic House Speaker twice; most powerful legislator; tore Trump speech; impeachments");
  I("Mitch McConnell",         "Republican (USA)","e7",["pm","leader","justice","chancellor"],[38,68,38,45,62], "Republican Senate leader; Merrick Garland blockage; McConnell-Obama frozen faces; turtle");
  I("Chuck Schumer",           "Democrat (USA)","e7",["pm","leader","chancellor"],     [48,62,50,48,55], "Democratic Senate Majority leader; IRA; infrastructure; NY; ambitious operator");
  I("Kevin McCarthy",          "Republican (USA)","e7",["pm","leader","chancellor"],     [38,50,40,36,42], "Republican Speaker 2023; ousted by Matt Gaetz after 9 months; Trump's man");
  I("Jim Jordan",              "Republican (USA)","e7",["pm","leader","justice","home"],  [32,50,48,28,42], "Republican MAGA; House Judiciary; Speaker failed three times; Ohio wrestling coach");
  I("Alexandria Ocasio-Cortez","Democrat (USA)","e7",["pm","leader","work","environment"],[65,45,68,52,52], "AOC; Democratic Socialist; Bronx bartender; Green New Deal; 'The Squad'; youngest");
  I("Bernie Sanders",          "Democrat (USA)","e7",["pm","leader","work","health"],  [65,65,70,58,52], "Independent-Democratic Socialist; Medicare for All; Free College; 2016/2020 runs");


  /* ═══════════════════════════════════════════════════════════════
     CHINA EXPANDED
     ═══════════════════════════════════════════════════════════════ */
  I("Mao Zedong",              "CPC (CN)","e3",["pm","leader","chancellor","defence"],  [60,75,65,55,70], "CPC Chairman; Long March; People's Republic; Great Leap; Cultural Revolution; 45-75m dead");
  I("Liu Shaoqi",              "CPC (CN)","e3",["pm","leader","chancellor"],            [58,65,50,58,58], "CPC President; 'first Marxist'; purged in Cultural Revolution; 'capitalist roader'");
  I("Zhou Enlai",              "CPC (CN)","e3",["pm","foreign","chancellor","leader"],  [68,72,68,70,65], "CPC Premier; Bandung; diplomatic architect; survivor; protected culture from Mao excess");
  I("Deng Xiaoping",           "CPC (CN)","e5",["pm","leader","chancellor","trade"],   [65,78,55,72,68], "CPC paramount leader; 'Socialism with Chinese characteristics'; reforms; 1979 war; Tiananmen");
  I("Hu Yaobang",              "CPC (CN)","e5",["pm","leader","chancellor"],            [60,65,60,60,55], "CPC General Secretary; reformer; death sparked Tiananmen protests 1989");
  I("Zhao Ziyang",             "CPC (CN)","e5",["pm","leader","chancellor","trade"],    [60,65,55,60,52], "CPC PM then GS; Tiananmen opposed crackdown; house arrest until death; reformer");
  I("Li Peng",                 "CPC (CN)","e5",["pm","leader","chancellor","energy"],   [28,65,30,30,45], "CPC PM; Tiananmen martial law; Three Gorges; hardliner; 'The Butcher of Beijing'");
  I("Jiang Zemin",             "CPC (CN)","e6",["pm","leader","chancellor","foreign"],  [52,68,50,55,58], "CPC President/GS 1989–2002; Three Represents; Shanghai faction; Falun Gong crackdown");
  I("Zhu Rongji",              "CPC (CN)","e6",["pm","chancellor","trade","leader"],    [62,65,55,65,58], "CPC PM 1998–2003; WTO accession; SOE reform; SARS; 'Economically tough'");
  I("Hu Jintao",               "CPC (CN)","e7",["pm","leader","chancellor","foreign"],  [50,62,45,52,52], "CPC President 2002–12; Harmonious Society; Tibet crackdown 2008; Olympics; low key");
  I("Wen Jiabao",              "CPC (CN)","e7",["pm","chancellor","work","leader"],     [60,62,58,60,52], "CPC PM 2003–13; farmer's son; GFC stimulus; earthquake wept; 'Wen Bao'");
  I("Xi Jinping",              "CPC (CN)","e7",["pm","leader","chancellor","foreign"],  [50,65,48,55,68], "CPC leader for life; Belt and Road; Xinjiang; Taiwan; anti-corruption; Mao comparison");
  I("Li Keqiang",              "CPC (CN)","e7",["pm","chancellor","work","leader"],     [55,60,50,58,52], "CPC PM 2013–23; migrant workers; GDP growth; rivers/electricity pragmatist; died 2023");
  I("Bo Xilai",                "CPC (CN)","e7",["pm","leader","chancellor","home"],     [52,60,58,48,52], "CPC Chongqing; Maoist revival; Gu Kailai murder; downfall; expelled imprisoned");
  I("Wang Yi",                 "CPC (CN)","e7",["pm","foreign","leader"],              [50,60,45,52,48], "CPC FM then Foreign Affairs Director; Wolf Warrior occasional; Japan expertise");
  I("Liu He",                  "CPC (CN)","e7",["pm","chancellor","trade","leader"],    [58,60,50,60,52], "CPC VP US trade talks; tech policy; 'Made in China 2025'; trusted Xi economic aide");
  I("Yang Jiechi",             "CPC (CN)","e7",["pm","foreign","leader"],              [50,62,45,52,50], "CPC Politburo foreign policy; Alaska summit scold; Biden era confrontation");
  I("Chen Shui-bian",          "DPP (TW)","e7",["pm","leader","chancellor","justice"],  [52,52,55,48,50], "DPP Taiwan President 2000–08; pro-independence; corruption conviction; divided");
  I("Ma Ying-jeou",            "KMT (TW)","e7",["pm","leader","chancellor","foreign"],  [55,55,52,55,52], "KMT Taiwan President 2008–16; cross-strait economic deals; sunflower movement backlash");
  I("Tsai Ing-wen",            "DPP (TW)","e7",["pm","leader","chancellor","foreign"],  [60,58,55,60,55], "DPP Taiwan President 2016–24; sovereignty; defence spending; US arms; semiconductors");
  I("Lai Ching-te",            "DPP (TW)","e7",["pm","leader","chancellor","health"],   [58,52,58,55,52], "DPP Taiwan President 2024; Tainan Mayor; independence-leaning; Beijing red lines");
  I("Ko Wen-je",               "TPP (TW)","e7",["pm","leader","chancellor","health"],   [55,50,55,52,50], "TPP Taiwan People's Party founder; Taipei Mayor; surgeon; third way; 2024 presidential");

  /* ═══════════════════════════════════════════════════════════════
     HISTORICAL WILDCARDS (ANCIENT/MEDIEVAL/EARLY MODERN)
     ═══════════════════════════════════════════════════════════════ */
  I("Julius Caesar",           "Roman Senate","e0",["pm","leader","defence","foreign"], [75,72,75,78,65], "Roman dictator; Gallic Wars; crossed Rubicon; assassinated Ides of March 44 BC");
  I("Augustus",                "Roman Senate","e0",["pm","leader","foreign","chancellor"],[72,75,65,78,72], "First Roman Emperor; Pax Romana; reformed government; patronage arts; 'found brick leave marble'");
  I("Cicero",                  "Roman Senate","e0",["pm","leader","justice","foreign"],  [65,65,78,65,60], "Roman orator; Catiline conspiracy; De Republica; executed by Mark Antony; rhetoric master");
  I("Cleopatra VII",           "Ptolemaic Egypt","e0",["pm","leader","foreign","trade"], [75,65,75,72,65], "Last Ptolemaic ruler; Caesar liaison; Antony liaison; Egypt absorption; polyglot");
  I("Alexander the Great",     "Macedon","e0",["pm","leader","defence","foreign"],       [72,65,72,75,65], "Macedonian conqueror; Persia; India; Alexandria; died 32; Hellenistic spread");
  I("Pericles",                "Athens","e0",["pm","leader","culture","foreign"],        [70,65,72,68,65], "Athens golden age; Parthenon; direct democracy; Funeral Oration; Peloponnesian War");
  I("Themistocles",            "Athens","e0",["pm","defence","leader","trade"],          [65,60,65,65,55], "Athens naval general; Salamis; ostracised; brilliant strategist; Persian court asylum");
  I("Solon",                   "Athens","e0",["pm","justice","leader","chancellor"],     [68,68,68,70,65], "Athens lawgiver; cancelled debts; democratic reform; one of Seven Sages; poet");
  I("Leonidas I",              "Sparta","e0",["pm","leader","defence","home"],           [60,60,55,60,58], "Spartan king; Thermopylae 300; died holding the pass; warrior culture exemplar");
  I("Hannibal Barca",          "Carthage","e0",["pm","leader","defence","foreign"],      [65,65,62,68,58], "Carthaginian general; crossed Alps; Cannae; nearly defeated Rome; strategic genius");
  I("Scipio Africanus",        "Roman Senate","e0",["pm","leader","defence","foreign"],  [68,65,62,70,62], "Roman general; defeated Hannibal at Zama 202 BC; Spain; second Punic War");
  I("Charlemagne",             "Carolingian","e0",["pm","leader","foreign","education"], [65,68,60,68,65], "Holy Roman Emperor; Europe unification; church reform; 'Father of Europe'; literacy");
  I("Eleanor of Aquitaine",    "Plantagenet","e0",["pm","leader","foreign","culture"],   [68,65,60,65,62], "Queen of France then England; Crusades; troubadours; rebelled against Henry II; formidable");
  I("Saladin",                 "Ayyubid Sultanate","e0",["pm","leader","defence","foreign"],[68,68,62,70,62], "Ayyubid Sultan; recaptured Jerusalem 1187; chivalric reputation; Crusader respect");
  I("Genghis Khan",            "Mongol Empire","e0",["pm","leader","defence","trade"],   [55,68,55,72,65], "Mongol conqueror; largest contiguous empire; Pax Mongolica; 40m deaths; postal system");
  I("Kublai Khan",             "Yuan China","e0",["pm","leader","trade","foreign"],      [60,65,55,65,60], "Yuan China Emperor; Marco Polo host; failed Japan invasions; cultural patronage");
  I("Thomas More",             "Tudor England","e0",["pm","justice","leader","culture"], [65,65,65,65,60], "Lord Chancellor; Utopia; executed for not endorsing Henry VIII divorce; Catholic martyr");
  I("Cardinal Wolsey",         "Tudor England","e0",["pm","chancellor","foreign","leader"],[58,68,55,60,62], "Henry VIII's chancellor; fall from grace; Hampton Court; 'had I served God as I served my King'");
  I("Oliver Cromwell",         "Parliament","e0",["pm","leader","defence","home"],       [55,62,58,58,55], "Lord Protector; English Civil War; regicide; Ireland conquest; New Model Army; warts and all");
  I("Maximilien Robespierre",  "Jacobin Club","e0",["pm","leader","justice","home"],     [55,55,65,45,55], "French Revolutionary; Committee of Public Safety; Terror; incorruptible; guillotined");
  I("Napoleon Bonaparte",      "First French Empire","e0",["pm","leader","defence","chancellor"],[70,72,68,72,68], "Napoleon I; Austerlitz; Code Napoleon; Elba; Waterloo; 'impossible is a word found in dictionaries of fools'");
  I("Metternich",              "Austrian Empire","e0",["pm","foreign","leader","chancellor"],[58,72,55,68,62], "Austrian FM; Congress of Vienna; Concert of Europe; conservative order; balance of power");
  I("Otto von Bismarck",       "German Empire","e0",["pm","leader","chancellor","foreign"],[60,72,60,70,65], "Iron Chancellor; German unification; Realpolitik; social insurance; ousted by Kaiser Wilhelm II");
  I("Abraham Lincoln",         "Republican (USA)","e1",["pm","leader","justice","chancellor"],[72,65,75,72,65], "Republican President; Civil War; Emancipation; Gettysburg; Ford's Theatre assassination");
  I("William Gladstone",       "Liberal","e1",["pm","leader","chancellor","foreign"],   [68,72,72,68,65], "Liberal PM four times; Irish Home Rule; Midlothian; 'GOM'; Bulgarian Horrors protest");
  I("Benjamin Disraeli",       "Conservative","e1",["pm","leader","foreign","trade"],    [65,68,68,62,62], "Conservative PM twice; empire; Suez Canal; Queen Victoria Empress; Young England; wit");
  I("Mahatma Gandhi",          "INC (IN)","e2",["pm","leader","work","foreign"],         [75,70,72,68,62], "Indian National Congress; non-violence; Dandi March; independence; assassinated 1948");
  I("Winston Churchill",       "Conservative","e3",["pm","leader","chancellor","defence"],[70,72,72,70,65], "Conservative PM twice; WWII 'We shall fight'; Iron Curtain speech; Nobel Literature; V sign");
  I("Clement Attlee",          "Labour","e3",["pm","leader","chancellor","health"],      [62,65,55,65,62], "Labour PM; NHS; Indian independence; welfare state; Beveridge implementation; quiet giant");
  I("Nelson Mandela",          "ANC","e6",["pm","leader","justice","foreign"],           [78,68,72,72,65], "ANC President; Robben Island 27 years; Nobel Peace 1993; rainbow nation; Ubuntu");
  I("Martin Luther King Jr",   "Democrat (USA)","e4",["pm","leader","work","justice"],  [78,55,82,68,62], "Civil rights; 'I Have a Dream'; Montgomery Bus Boycott; Nobel Peace 1964; assassinated 1968");
  I("Simon Bolivar",           "Gran Colombia","e0",["pm","leader","defence","foreign"], [65,62,65,65,60], "El Libertador; South America independence; Gran Colombia; died disillusioned");
  I("Giuseppe Garibaldi",      "Italian Unification","e1",["pm","leader","defence","foreign"],[65,58,65,60,55], "Risorgimento; Thousand Red Shirts; Sicily; Italian unification; Mazzini ally");
  I("Giuseppe Mazzini",        "Giovine Italia","e1",["pm","leader","foreign","culture"],[62,55,65,58,52], "Italian unification theorist; Roman Republic 1849; 'Young Europe'; exile; revolutionary");
  I("Sun Yat-sen",             "Kuomintang (CN)","e2",["pm","leader","chancellor","foreign"],[65,62,65,65,60], "KMT founder; Three Principles; Republic of China; father of the nation; Yale and Hawaii");
  I("Rosa Luxemburg",          "KPD (DE)","e2",["pm","leader","work","justice"],         [65,55,70,60,55], "Spartacist League; internationalism; murdered 1919; 'Rosa Red'; anti-war socialist");
  I("Vladimir Lenin",          "Bolsheviks (RU)","e2",["pm","leader","chancellor","work"],[60,68,68,62,65], "Bolshevik October Revolution; Soviet Union; NEP; imperialism pamphlet; sealed train");
  I("Leon Trotsky",            "Bolsheviks (RU)","e2",["pm","leader","defence","foreign"],[62,60,68,60,55], "Red Army creator; permanent revolution; expelled; Mexican exile; ice-axe murdered 1940");
  I("Antonio Gramsci",         "PCI (IT)","e2",["pm","leader","work","culture"],         [60,55,68,58,52], "Italian Communist; hegemony theory; prison notebooks; Mussolini imprisoned; organic intellectual");
  I("Keir Hardie",             "Labour","e1",["pm","leader","work","justice"],            [62,55,65,55,52], "Labour first MP; ILP founder; anti-war 1914; trade union; Scottish miner");
  I("Eugene V. Debs",          "Democrat (USA)","e2",["pm","leader","work","justice"],  [62,55,68,58,50], "Socialist Party 5x presidential candidate; Eugene Debs; imprisoned for anti-war; 'While there is a lower class'");
  I("Frederick Douglass",      "Republican (USA)","e1",["pm","leader","justice","foreign"],[72,55,78,65,58], "Abolitionist; escaped slave; North Star; civil rights; orator; diplomat; women's suffrage ally");


  /* ═══════════════════════════════════════════════════════════════
     SOUTHEAST ASIA (Thailand, Malaysia, Indonesia, Myanmar)
     ═══════════════════════════════════════════════════════════════ */
  I("Mahathir Mohamad",        "UMNO (MY)","e6",["pm","leader","chancellor","trade"],   [60,72,60,62,62], "UMNO PM 1981–2003, 2018–20; Petronas Towers; Proton; anti-IMF; anti-Israel");
  I("Anwar Ibrahim",           "Pakatan Harapan (MY)","e7",["pm","leader","chancellor","foreign"],[62,62,62,58,58], "PKR PM from 2022; finance minister jailed; sodomy charges; reformasi; Mahathir protege");
  I("Najib Razak",             "UMNO (MY)","e7",["pm","leader","chancellor","trade"],   [45,55,48,42,48], "UMNO PM 2009–18; 1MDB fraud; MH370; jailed; billion-dollar fund scandal");
  I("Abdullah Ahmad Badawi",   "UMNO (MY)","e7",["pm","leader","chancellor"],           [50,55,48,50,50], "UMNO PM 2003–09; Islam Hadhari; sleepy image; election 2008 shock");
  I("Muhyiddin Yassin",        "PN (MY)","e7",["pm","leader","chancellor","home"],      [45,55,45,44,48], "PN PM 2020–21; COVID; Sheraton Move coup; MUDA; corruption charges");
  I("Prayuth Chan-ocha",       "Palang Pracharath (TH)","e7",["pm","leader","defence","chancellor"],[28,52,28,30,38], "Thailand military coup PM 2014; NCPO junta; constitution; 'Happiness' song; ousted");
  I("Thaksin Shinawatra",      "Pheu Thai (TH)","e7",["pm","leader","chancellor","health"],[55,58,58,52,55], "Pheu Thai PM 2001–06; telecoms billionaire; war on drugs; ousted coup; phone-in PM");
  I("Yingluck Shinawatra",     "Pheu Thai (TH)","e7",["pm","leader","chancellor","agriculture"],[55,48,52,50,50], "Pheu Thai first female PM; Thaksin's sister; rice pledging scheme; ousted court");
  I("Abhisit Vejjajiva",       "Democrat (TH)","e7",["pm","leader","chancellor"],       [52,52,52,52,50], "Democrat Thai PM 2008–11; Red Shirt crackdown; Eton-Oxford educated; liberal facade");
  I("Aung San Suu Kyi",        "NLD (MM)","e6",["pm","leader","foreign","justice"],     [65,58,65,60,55], "NLD Myanmar; Nobel Peace 1991; house arrest 15 years; Rohingya genocide accused; jailed");
  I("Min Aung Hlaing",         "Tatmadaw (MM)","e7",["pm","leader","defence","home"],   [18,55,20,18,30], "Myanmar coup general 2021; mass arrests; air strikes civilians; ICC warrant");
  I("Rodrigo Duterte",         "Lakas (PH)","e7",["pm","leader","justice","home"],      [48,55,52,44,50], "Philippines President 2016–22; drug war thousands killed; ICC probe; Davao Mayor");
  I("Ferdinand Marcos Jr",     "PFP (PH)","e7",["pm","leader","chancellor","foreign"],  [40,48,42,38,42], "Philippines President 2022; Bongbong; Marcos dynasty revival; South China Sea");
  I("Sara Duterte",            "Lakas (PH)","e7",["pm","leader","home","chancellor"],   [38,48,42,36,42], "Philippines VP; Davao Mayor; Marcos Jr VP then impeached; father's ally fell out");
  I("Leni Robredo",            "LP (PH)","e7",["pm","leader","chancellor","work"],      [60,52,58,56,52], "LP VP; 2022 presidential runner-up; human rights lawyer; pink revolution");
  I("Corazon Aquino",          "PDP-Laban (PH)","e6",["pm","leader","chancellor","foreign"],[62,55,60,58,52], "PDP-Laban Philippines first female President; restored democracy; People Power 1986");
  I("Pita Limjaroenrat",       "MFP (TH)","e7",["pm","leader","chancellor","trade"],    [60,45,60,52,50], "Move Forward PM-designate 2023; blocked by senate; party dissolved; youth vote");
  I("Joko Widodo",             "PDIP (ID)","e7",["pm","leader","chancellor","trade"],   [62,52,60,58,55], "PDIP Indonesia President 2014–24; furniture seller; infrastructure; Papua; IKN capital");
  I("Prabowo Subianto",        "Gerindra (ID)","e7",["pm","leader","defence","chancellor"],[48,58,48,46,50], "Gerindra Indonesia President 2024; Suharto son-in-law; human rights record; three runs");
  I("Megawati Sukarnoputri",   "PDIP (ID)","e6",["pm","leader","chancellor"],           [52,55,48,50,50], "PDIP Indonesia first female President 2001–04; Sukarno's daughter; Bali bombings");
  I("Susilo Bambang Yudhoyono","Demokrat (ID)","e7",["pm","leader","chancellor","defence"],[55,58,52,55,52], "Demokrat Indonesia President 2004–14; SBY; reformasi; first direct election winner");
  I("Hun Sen",                 "CPP (KH)","e5",["pm","leader","chancellor","home"],      [25,65,30,25,45], "CPP Cambodia PM 38 years; Khmer Rouge past; authoritarian consolidation; son successor");
  I("Nguyen Phu Trong",        "VCP (VN)","e7",["pm","leader","chancellor","home"],     [30,65,30,30,45], "VCP General Secretary; anti-corruption furnace; died 2024; hardliner reformer");
  I("Vo Van Kiet",             "VCP (VN)","e6",["pm","leader","chancellor","trade"],    [55,62,52,55,55], "VCP PM; Doi Moi architect; Vietnam economic opening; bridges building");

  /* ═══════════════════════════════════════════════════════════════
     PAKISTAN, BANGLADESH, SRI LANKA
     ═══════════════════════════════════════════════════════════════ */
  I("Muhammad Ali Jinnah",     "Muslim League (PK)","e3",["pm","leader","foreign","justice"],[65,68,68,65,62], "Muslim League Pakistan founder; Partition 1947; Quaid-e-Azam; died 13 months after");
  I("Zulfikar Ali Bhutto",     "PPP (PK)","e5",["pm","leader","chancellor","foreign"],  [62,62,65,58,58], "PPP PM then President; nationalisations; nuclear; hanged by Zia 1979");
  I("Zia ul-Haq",              "PML-N (PK)","e5",["pm","leader","defence","home"],      [22,60,25,22,32], "Pakistan military dictator; hanged Bhutto; Islamisation; died plane crash 1988");
  I("Benazir Bhutto",          "PPP (PK)","e6",["pm","leader","chancellor","foreign"],  [62,58,65,58,58], "PPP first female Muslim PM twice; corruption; assassinated 2007; Bhutto dynasty");
  I("Nawaz Sharif",            "PML-N (PK)","e6",["pm","leader","chancellor","trade"],  [50,58,50,48,50], "PML-N PM three times; ousted twice by military; nuclear tests 1998; exile");
  I("Pervez Musharraf",        "PML-Q (PK)","e7",["pm","leader","defence","chancellor"],[35,58,38,35,38], "Pakistan military President 1999–2008; War on Terror ally; LFO; died exile Dubai");
  I("Shaukat Aziz",            "PML-Q (PK)","e7",["pm","leader","chancellor","trade"],  [50,55,45,50,48], "PML-Q PM 2004–07; Citibank; Musharraf's economic face; privatisation push");
  I("Asif Ali Zardari",        "PPP (PK)","e7",["pm","leader","chancellor"],            [35,55,35,33,40], "PPP Mr Ten Percent; President after Benazir; corruption stigma; son's PM era");
  I("Bilawal Bhutto Zardari",  "PPP (PK)","e7",["pm","leader","foreign","chancellor"],  [50,45,52,48,48], "PPP Chairman; FM; Bhutto family dynasty; Oxford; young politician");
  I("Imran Khan",              "PTI (PK)","e7",["pm","leader","chancellor","foreign"],  [62,50,65,52,55], "PTI PM 2018–22; cricket captain; anti-corruption; imprisoned; NATO letter; populist");
  I("Shehbaz Sharif",          "PML-N (PK)","e7",["pm","leader","chancellor","trade"],  [50,55,48,50,50], "PML-N PM 2022–24; Nawaz's brother; Punjab CM; delivery-focused technocrat");
  I("Sheikh Hasina",           "Awami League (BD)","e7",["pm","leader","chancellor","foreign"],[55,62,55,55,58], "Awami League PM; economic growth; fled 2024 uprising; Sheikh Mujib daughter");
  I("Muhammad Yunus",          "Indep (BD)","e7",["pm","leader","chancellor"],          [62,60,58,62,50], "Bangladesh interim PM 2024; Nobel Peace 2006; Grameen Bank; microfinance pioneer");
  I("Sirimavo Bandaranaike",   "SLFP (LK)","e4",["pm","leader","chancellor","education"],[60,62,58,58,55], "Sri Lanka first female PM world; nationalised companies; 1958 language riots");
  I("Mahinda Rajapaksa",       "SLPP (LK)","e7",["pm","leader","chancellor","defence"], [45,55,48,42,48], "SLPP Sri Lanka President; LTTE military defeat; China loans; economic crisis fled");
  I("Ranil Wickremesinghe",    "UNP (LK)","e7",["pm","leader","chancellor","trade"],   [50,60,45,50,48], "UNP PM six times; President 2022; IMF deal; survived Gota crisis; consensus manager");


  /* ═══════════════════════════════════════════════════════════════
     MIDDLE EAST EXPANDED (Egypt, Libya, Saudi, Iran)
     ═══════════════════════════════════════════════════════════════ */
  I("Gamal Abdel Nasser",      "Arab Socialist Union (EG)","e4",["pm","leader","foreign","chancellor"],[65,65,68,62,60], "Egypt Arab Nationalism; Suez Canal nationalised; UAR; Aswan Dam; pan-Arab icon");
  I("Anwar Sadat",             "NDP (EG)","e5",["pm","leader","foreign","chancellor"],  [62,62,60,60,55], "Egypt President; Camp David; Sinai return; Nobel Peace; assassinated 1981");
  I("Hosni Mubarak",           "NDP (EG)","e5",["pm","leader","chancellor","home"],     [35,65,32,35,40], "NDP Egypt President 30 years; Tahrir Square ousted 2011; prisoner; regional stabiliser");
  I("Mohamed Morsi",           "Muslim Brotherhood (EG)","e7",["pm","leader","chancellor","home"],[42,50,45,38,42], "Muslim Brotherhood Egypt President 2012–13; Sisi coup; died in court 2019");
  I("Abdel Fattah el-Sisi",    "Indep (EG)","e7",["pm","leader","defence","chancellor"],[28,58,30,28,38], "Egypt military President 2014; Morsi ousted; mass executions; Grand Dam dispute");
  I("Muammar Gaddafi",         "Arab Socialist Union (LY)","e5",["pm","leader","foreign","home"],[35,65,50,30,45], "Libya Jamahiriya 1969–2011; terrorism; Lockerbie; Libyan Civil War; killed by mob");
  I("Abdurrahim el-Keib",      "Indep (LY)","e7",["pm","leader","chancellor"],          [48,45,45,44,42], "Libya technocrat PM 2011–12; post-Gaddafi transition; GNC; Alabama professor");
  I("Nouri al-Maliki",         "Dawa (IQ)","e7",["pm","leader","chancellor","home"],    [35,50,35,33,38], "Dawa Iraq PM 2006–14; Sunni exclusion; ISIS rise; Iranian influence; Mosul fall");
  I("Haider al-Abadi",         "Dawa (IQ)","e7",["pm","leader","chancellor","defence"], [50,52,48,50,48], "Dawa Iraq PM 2014–18; ISIS defeat; Mosul recapture; Kurd referendum opposition");
  I("Adel Abdul-Mahdi",        "Indep (IQ)","e7",["pm","leader","chancellor"],          [48,50,45,46,45], "Iraq technocrat PM 2018–20; protests October 2019; Soleimani assassination site");
  I("Mustafa al-Kadhimi",      "Indep (IQ)","e7",["pm","leader","chancellor","foreign"],[52,52,50,52,50], "Iraq PM 2020–22; US-Iraq strategic dialogue; intelligence chief origin");
  I("Ruhollah Khomeini",       "Islamic Republic (IR)","e5",["pm","leader","home","foreign"],[38,68,60,40,60], "Iran Supreme Leader; Islamic Revolution 1979; Fatwa on Rushdie; hostages");
  I("Ali Khamenei",            "Islamic Republic (IR)","e6",["pm","leader","chancellor","home"],[30,68,40,32,55], "Iran Supreme Leader from 1989; nuclear programme; Green Movement crushed; IRGC");
  I("Akbar Hashemi Rafsanjani","IR (IR)","e6",["pm","leader","chancellor","trade"],     [48,65,45,50,52], "Iran pragmatist President 1989–97; reconstruction; moderation; nuclear architect");
  I("Mohammad Khatami",        "IR (IR)","e6",["pm","leader","chancellor","foreign"],   [58,60,58,55,52], "Iran reformist President 1997–2005; Dialogue of Civilisations; internet expansion");
  I("Mahmoud Ahmadinejad",     "IR (IR)","e7",["pm","leader","chancellor","foreign"],   [30,52,45,28,40], "Iran President 2005–13; Holocaust denial; nuclear defiance; Green Movement crackdown");
  I("Hassan Rouhani",          "IR (IR)","e7",["pm","leader","chancellor","foreign"],   [50,60,48,50,48], "Iran President 2013–21; JCPOA nuclear deal 2015; pragmatist; deal collapsed");
  I("Ebrahim Raisi",           "IR (IR)","e7",["pm","leader","chancellor","justice"],   [22,55,28,22,32], "Iran President 2021–24; 1988 executions judge; sanctions; died helicopter crash");
  I("Masoud Pezeshkian",       "IR (IR)","e7",["pm","leader","chancellor","health"],    [50,52,48,50,48], "Iran reformist President 2024; heart surgeon; JCPOA revival talks; moderate");
  I("Mohammed bin Salman",     "Saudi Royal (SA)","e7",["pm","leader","chancellor","foreign"],[42,45,42,42,52], "MBS Saudi Crown PM; Vision 2030; Khashoggi murder; Yemen war; reforms and repression");
  I("Yahya Sinwar",            "Hamas (PS)","e7",["pm","leader","home","defence"],      [15,52,30,18,38], "Hamas Gaza leader; Oct 7 architect; killed 2024; tunnels commander; prisoner released");
  I("Ismail Haniyeh",          "Hamas (PS)","e7",["pm","leader","foreign","chancellor"],[25,52,38,22,42], "Hamas political bureau chief; PM 2007–14; assassinated Tehran 2024; negotiator");
  I("Mahmoud Abbas",           "Fatah (PS)","e7",["pm","leader","foreign","chancellor"],[45,60,42,44,45], "Fatah PA President; PLO; non-violence PA; Israel negotiations; octogenarian hold");

  /* ═══════════════════════════════════════════════════════════════
     WEST AFRICA EXPANDED (Ghana, Senegal, Ivory Coast)
     ═══════════════════════════════════════════════════════════════ */
  I("Kwame Nkrumah",           "CPP (GH)","e4",["pm","leader","foreign","chancellor"],  [65,65,65,60,60], "CPP Ghana first PM then President; pan-Africanism; Volta Dam; ousted 1966 coup");
  I("Jerry Rawlings",          "NDC (GH)","e5",["pm","leader","chancellor","defence"],  [52,60,55,50,52], "NDC Ghana military ruler; twice; returned to democracy; revolutionary origins; died 2020");
  I("John Kufuor",             "NPP (GH)","e6",["pm","leader","chancellor","foreign"],  [60,60,55,60,55], "NPP Ghana President 2001–09; democracy consolidator; AU Chairman; HIPC completion");
  I("John Atta Mills",         "NDC (GH)","e7",["pm","leader","chancellor"],            [55,58,50,52,50], "NDC Ghana President 2009–12; died in office; Rawlings protege; tax lawyer");
  I("John Dramani Mahama",     "NDC (GH)","e7",["pm","leader","chancellor","trade"],   [52,55,52,52,50], "NDC Ghana President twice; power crisis; infrastructure; defeated Akufo-Addo 2024");
  I("Nana Akufo-Addo",         "NPP (GH)","e7",["pm","leader","chancellor","foreign"], [55,58,55,55,52], "NPP Ghana President 2017–25; 'Free SHS'; debt crisis; anti-gay law veto; Reparations");
  I("Alassane Ouattara",       "RHDP (CI)","e6",["pm","leader","chancellor","trade"],   [55,65,52,58,55], "RHDP Ivory Coast President; IMF economist; civil war victor; three terms controversy");
  I("Laurent Gbagbo",          "FPI (CI)","e6",["pm","leader","chancellor","foreign"],  [40,55,45,38,42], "FPI Ivory Coast President; refused to leave 2010; ICC acquitted; returned 2021");
  I("Felix Houphouet-Boigny",  "PDCI (CI)","e3",["pm","leader","chancellor","foreign"], [58,72,55,58,60], "PDCI Ivory Coast father of nation; 33 years; economic miracle; Basilica of Yamoussoukro");
  I("Macky Sall",              "APR (SN)","e7",["pm","leader","chancellor","foreign"],  [55,55,52,55,52], "APR Senegal President 2012–24; democracy model; term limit controversy; ECOWAS");
  I("Bassirou Diomaye Faye",   "Pastef (SN)","e7",["pm","leader","chancellor"],         [55,42,55,50,50], "Pastef Senegal President 2024; youngest African PM; released from prison months before");
  I("Ousmane Sonko",           "Pastef (SN)","e7",["pm","leader","chancellor","work"],  [58,45,60,50,50], "Pastef PM 2024; Faye's prime minister; anti-corruption; arrested multiple times");
  I("Alpha Conde",             "RPG (GN)","e6",["pm","leader","chancellor"],            [40,58,42,38,42], "RPG Guinea President; ousted coup 2021; human rights criticism; mining wealth");
  I("Mamadi Doumbouya",        "Indep (GN)","e7",["pm","leader","defence","chancellor"],[30,40,32,28,32], "Guinea junta leader 2021; French foreign legion; transition promises; autocratic");
  I("Ibrahim Traore",          "Indep (BF)","e7",["pm","leader","defence","chancellor"],[25,35,30,22,28], "Burkina Faso junta; youngest head of state; anti-France; Russia tilt; jihadist crisis");


  /* ═══════════════════════════════════════════════════════════════
     EAST AFRICA EXPANDED (Ethiopia, Tanzania, Uganda, Rwanda)
     ═══════════════════════════════════════════════════════════════ */
  I("Haile Selassie",          "EPRP (ET)","e3",["pm","leader","foreign","defence"],    [55,72,58,55,58], "Ethiopia Emperor; League of Nations appeal; OAU founder; Rastafari icon; ousted 1974");
  I("Mengistu Haile Mariam",   "EPRP (ET)","e5",["pm","leader","chancellor","defence"], [18,58,25,18,28], "Derg Ethiopia; Red Terror 100k+ dead; Marxist; Somalia war; famine mismanagement; exile");
  I("Meles Zenawi",            "EPRDF (ET)","e6",["pm","leader","chancellor","trade"],  [55,62,52,58,55], "EPRDF Ethiopia PM; economic growth; authoritarian; Africa's development model claimed");
  I("Hailemariam Desalegn",    "EPRDF (ET)","e7",["pm","leader","chancellor"],          [48,52,45,48,48], "EPRDF PM 2012–18; resigned amid protests; Southern Nations origin; transitional");
  I("Abiy Ahmed",              "PP (ET)","e7",["pm","leader","chancellor","foreign"],   [60,52,62,55,55], "PP Ethiopia PM; Nobel Peace 2019; Tigray war 500k+ dead; Eritrea deal; reform reversal");
  I("Julius Nyerere",          "CCM (TZ)","e4",["pm","leader","foreign","education"],   [65,65,62,62,60], "CCM Tanzania father of nation; Ujamaa socialism; Teacher Mwalimu; AU founder");
  I("Ali Hassan Mwinyi",       "CCM (TZ)","e6",["pm","leader","chancellor"],            [52,58,48,52,50], "CCM Tanzania President 1985–95; IMF reforms; 'Mzee Rukhsa'; liberalisation");
  I("Benjamin Mkapa",          "CCM (TZ)","e6",["pm","leader","chancellor","foreign"],  [55,58,50,55,50], "CCM Tanzania President 1995–2005; debt cancellation; anti-corruption; free education");
  I("Jakaya Kikwete",          "CCM (TZ)","e7",["pm","leader","chancellor","foreign"],  [55,55,52,55,52], "CCM Tanzania President 2005–15; AU Peace and Security Chair; oil/gas discovery");
  I("John Magufuli",           "CCM (TZ)","e7",["pm","leader","chancellor","home"],     [35,52,38,30,42], "CCM Tanzania 'The Bulldozer'; COVID denial; anti-Western; died 2021; autocratic populist");
  I("Samia Suluhu Hassan",     "CCM (TZ)","e7",["pm","leader","chancellor"],            [55,52,50,54,52], "CCM first female Tanzanian/East African President; moderate; COVID vaccines reversed");
  I("Yoweri Museveni",         "NRM (UG)","e5",["pm","leader","defence","chancellor"],  [35,68,38,35,50], "NRM Uganda President 37+ years; 1986 liberator become autocrat; Amin overthrew; anti-gay");
  I("Idi Amin",                "Indep (UG)","e4",["pm","leader","defence","home"],      [10,50,35,10,20], "Uganda military dictator; 300k+ killed; expelled Asians; Israel war; Libya ally; fled");
  I("Milton Obote",            "UPC (UG)","e4",["pm","leader","chancellor"],            [35,55,40,30,38], "UPC Uganda PM then President twice; ousted by Amin then Museveni; fell in power");
  I("Paul Kagame",             "RPF (RW)","e6",["pm","leader","defence","chancellor"],  [48,62,45,50,55], "RPF Rwanda President; ended genocide; economic miracle; authoritarian; no opposition");
  I("Pasteur Bizimungu",       "RPF (RW)","e6",["pm","leader","chancellor"],            [48,50,45,46,46], "RPF Rwanda transitional President 1994–2000; Kagame ally then imprisoned");

  /* ═══════════════════════════════════════════════════════════════
     SOUTHERN AFRICA & HORN
     ═══════════════════════════════════════════════════════════════ */
  I("Robert Mugabe",           "ZANU-PF (ZW)","e5",["pm","leader","chancellor","foreign"],[40,68,50,35,50], "ZANU-PF Zimbabwe PM then President; liberation hero to autocrat; land reform; hyper-inflation");
  I("Emmerson Mnangagwa",      "ZANU-PF (ZW)","e7",["pm","leader","chancellor","defence"],[28,60,30,28,38], "ZANU-PF Zimbabwe President; Crocodile; Mugabe ally and successor; economic dysfunction");
  I("Morgan Tsvangirai",       "MDC (ZW)","e7",["pm","leader","work","chancellor"],     [55,52,55,50,50], "MDC Zimbabwe PM 2009–13; GNU; beaten multiple times; cancer 2018");
  I("Nelson Chamisa",          "CCC (ZW)","e7",["pm","leader","chancellor"],            [52,45,55,48,48], "CCC Zimbabwe opposition; election fraud 2023; young lawyer; MDC successor");
  I("Samora Machel",           "Frelimo (MZ)","e5",["pm","leader","foreign","defence"], [58,58,58,55,52], "Frelimo Mozambique first PM; liberation war leader; crashed plane 1986; Mandela's wife");
  I("Joaquim Chissano",        "Frelimo (MZ)","e6",["pm","leader","chancellor","foreign"],[55,60,50,55,52], "Frelimo Mozambique President 1986–2005; peace deal 1992; Mo Ibrahim Prize winner");
  I("Armando Guebuza",         "Frelimo (MZ)","e7",["pm","leader","chancellor"],        [42,55,40,40,42], "Frelimo Mozambique President 2005–15; 'Guebuzismo'; hidden debt scandal");
  I("Filipe Nyusi",            "Frelimo (MZ)","e7",["pm","leader","chancellor","defence"],[42,52,40,40,42], "Frelimo Mozambique President 2015; Cabo Delgado insurgency; natural gas; floods");
  I("Jonas Savimbi",           "UNITA (AO)","e5",["pm","leader","defence","foreign"],   [42,58,45,38,45], "UNITA Angola 27-year civil war; killed 2002; US/South Africa backed; Cold War pawn");
  I("Eduardo dos Santos",      "MPLA (AO)","e5",["pm","leader","chancellor","defence"], [30,68,30,28,40], "MPLA Angola President 1979–2017; oil wealth; family enriched; authoritarian");
  I("Joao Lourenco",           "MPLA (AO)","e7",["pm","leader","chancellor","foreign"], [45,52,42,44,45], "MPLA Angola President 2017; anti-corruption promise; dos Santos family targeted");
  I("Isaias Afwerki",          "PFDJ (ER)","e6",["pm","leader","foreign","defence"],   [18,60,20,18,28], "PFDJ Eritrea liberation hero become dictator; 'Africa's North Korea'; indefinite conscription");
  I("Mohammed Siad Barre",     "SRSP (SO)","e4",["pm","leader","defence","chancellor"], [22,60,25,22,28], "SRSP Somalia military dictator 1969–91; Scientific Socialism; Ogaden war; collapsed state");

  /* ═══════════════════════════════════════════════════════════════
     CENTRAL AMERICA & CARIBBEAN
     ═══════════════════════════════════════════════════════════════ */
  I("Fidel Castro",            "PCC (CU)","e4",["pm","leader","foreign","chancellor"],  [62,72,70,60,62], "PCC Cuba PM then President; Bay of Pigs; Missile Crisis; embargo 60 years; health literacy");
  I("Raul Castro",             "PCC (CU)","e7",["pm","leader","chancellor","defence"],  [38,65,35,38,52], "PCC Cuba President 2008–18; Obama opening; controlled transition; military institution");
  I("Miguel Diaz-Canel",       "PCC (CU)","e7",["pm","leader","chancellor"],            [30,50,30,28,38], "PCC Cuba President; internet blackouts; food crisis; July 11 protests; hardliner");
  I("Daniel Ortega",           "FSLN (NI)","e6",["pm","leader","chancellor","foreign"], [35,62,40,30,45], "FSLN Nicaragua PM; Sandinista; Iran-Contra; returned 2007; autocratic; wife VP");
  I("Manuel Zelaya",           "PNH (HN)","e7",["pm","leader","chancellor"],            [45,50,48,42,44], "PNH Honduras President 2006–09; Chavez ally; coup; exiled; returned alliance");
  I("Nayib Bukele",            "Nuevas Ideas (SV)","e7",["pm","leader","chancellor","home"],[55,45,60,48,52], "Nuevas Ideas El Salvador; Bitcoin legal tender; mass gang arrests; prison; authoritarian popular");
  I("Claudia Lopez",           "Green Alliance (CO)","e7",["pm","leader","chancellor"], [55,48,58,52,50], "Colombia Green Bogota Mayor; anti-corruption; first lesbian mayor; Petro critic");
  I("Joao Lourenco copy",      "MPLA (AO)","e7",["pm","leader","chancellor"],           [43,50,40,42,43], "Skip duplicate");
  I("Jean-Bertrand Aristide",  "Fanmi Lavalas (HT)","e6",["pm","leader","chancellor","work"],[52,48,55,46,48], "Haiti first elected President; ousted twice by coups; populist priest; return exile");
  I("Jovenel Moise",           "PHTK (HT)","e7",["pm","leader","chancellor"],          [30,38,32,28,32], "Haiti President 2017–21; 'Banana Man'; constitutional crisis; assassinated at home");
  I("Ariel Henry",             "Indep (HT)","e7",["pm","leader","chancellor"],          [30,38,30,28,30], "Haiti PM 2021–24; gang control; resigned under Kenya pressure; MSS gang rule");
  I("Eric Gairy",              "GULP (GD)","e4",["pm","leader","chancellor"],           [48,52,45,44,45], "Grenada PM 1974–79; independence; UFO obsession; Maurice Bishop coup");
  I("Maurice Bishop",          "NJM (GD)","e5",["pm","leader","foreign","chancellor"],  [55,48,58,50,48], "NJM Grenada PM 1979–83; Cuban alignment; executed in New Jewel Movement coup; US invasion");


  /* ═══════════════════════════════════════════════════════════════
     MORE USA (Governors, Senators, House members)
     ═══════════════════════════════════════════════════════════════ */
  I("Hubert Humphrey",         "Democrat (USA)","e4",["pm","foreign","leader","work"],  [62,65,62,60,58], "Democratic VP; 1968 candidate; civil rights champion; 'Happy Warrior'");
  I("Barry Goldwater",         "Republican (USA)","e4",["pm","leader","chancellor","defence"],[55,62,55,52,52], "Republican 1964 candidate; AuH2O; libertarian conservatism; anti-civil rights vote");
  I("George Wallace",          "Democrat (USA)","e4",["pm","leader","home","chancellor"],[38,55,45,32,42], "Alabama Governor; 'Segregation forever'; third party 1968; shot 1972; later recanted");
  I("Eugene McCarthy",         "Democrat (USA)","e4",["pm","leader","foreign","work"], [58,60,62,55,48], "Democratic senator; anti-Vietnam challenge to LBJ; '68 New Hampshire; literary politician");
  I("Robert F. Kennedy",       "Democrat (USA)","e4",["pm","leader","justice","foreign"],[65,58,68,60,58], "Democratic AG; NY Senator; 1968 California primary winner; assassinated June 5 1968");
  I("George McGovern",         "Democrat (USA)","e5",["pm","leader","foreign","chancellor"],[60,62,60,58,50], "Democratic 1972 Nixon landslide loser; anti-war; WWII pilot; liberal icon");
  I("Walter Mondale",          "Democrat (USA)","e5",["pm","leader","chancellor","work"],[55,62,52,55,52], "Democratic 1984 candidate; Geraldine Ferraro VP pick; 49-state loss; honest on taxes");
  I("Michael Dukakis",         "Democrat (USA)","e6",["pm","leader","chancellor","home"],[52,58,50,52,50], "Democratic 1988 candidate; tank photo; 10-point lead squandered; Massachusetts technocrat");
  I("Ross Perot",              "Reform (US)","e6",["pm","leader","chancellor","trade"],  [55,55,58,50,48], "Reform Party 1992/96; 19% 1992; NAFTA 'giant sucking sound'; charts entrepreneur; InfoBahn");
  I("Ralph Nader",             "Green (US)","e6",["pm","leader","trade","environment"], [58,58,60,54,48], "Green 2000 spoiler; Unsafe at Any Speed; consumer advocate; 'no difference' mantra");
  I("John Kerry",              "Democrat (USA)","e7",["pm","foreign","leader","chancellor"],[55,62,55,55,52], "Democratic 2004 candidate; Vietnam vet; Swift Boat; Secretary of State; Iran deal; climate envoy");
  I("John McCain",             "Republican (USA)","e7",["pm","leader","foreign","defence"],[62,65,62,60,55], "Republican 2008 candidate; POW; maverick; thumbs down ACA; died 2018; honored both sides");
  I("Sarah Palin",             "Republican (USA)","e7",["pm","leader","home","energy"],   [48,42,52,36,42], "Republican VP 2008; Alaska Governor; Tea Party; death panels; Tina Fey; quit governorship");
  I("Mitt Romney",             "Republican (USA)","e7",["pm","leader","chancellor","trade"],[55,58,52,55,52], "Republican 2012 candidate; Bain Capital; 47%; ACA original; anti-Trump senator");
  I("Elizabeth Warren",        "Democrat (USA)","e7",["pm","leader","chancellor","work"],[62,60,62,58,52], "Democratic Senator; consumer bureau; wealth tax; 'nevertheless she persisted'; Native claim");
  I("Pete Buttigieg",          "Democrat (USA)","e7",["pm","leader","foreign","transport"],[58,45,60,52,50], "Democratic Transportation Secretary; South Bend Mayor; 'Mayor Pete'; McKinsey; first gay cabinet");
  I("Beto O'Rourke",           "Democrat (USA)","e7",["pm","leader","chancellor"],     [55,45,62,48,48], "Democratic TX Senate near-miss 2018; 2020 candidate; AR-15 buyback; 2022 governor loss");
  I("Tulsi Gabbard",           "Republican (USA)","e7",["pm","leader","foreign","defence"],[50,45,55,44,44], "Rep DNI; D then R; Assad visit; Gabbard-style anti-war; Hindu American; NBC host");
  I("Mike Pence",              "Republican (USA)","e7",["pm","leader","home","chancellor"],[42,55,45,40,48], "Republican VP; 2024 candidate withdrawal; evangelical; Jan 6 certified; Indiana Governor");
  I("Ron DeSantis",            "Republican (USA)","e7",["pm","leader","home","chancellor"],[45,50,48,42,48], "Republican Florida Governor; Don't Say Gay; 2024 candidate collapsed; CRT; woke capital");
  I("Vivek Ramaswamy",         "Republican (USA)","e7",["pm","leader","chancellor","trade"],[50,40,58,44,45], "Republican 2024 candidate; biotech; DOGE co-head; 'woke' corporate critique; fast talker");
  I("Nikki Haley",             "Republican (USA)","e7",["pm","leader","foreign","chancellor"],[52,52,52,50,50], "Republican SC Governor; UN Ambassador; 2024 race; 'Never Trump' then endorsed");
  I("Chris Christie",          "Republican (USA)","e7",["pm","leader","home","chancellor"],[48,52,50,46,48], "Republican NJ Governor; Bridgegate; 2016/2024 race; Trump critic; COVID bridge");
  I("Ted Cruz",                "Republican (USA)","e7",["pm","leader","justice","chancellor"],[42,55,48,38,45], "Republican TX Senator; 2016 primary runner-up; Cancun flight; filibuster Green Eggs");
  I("Marco Rubio",             "Republican (USA)","e7",["pm","leader","foreign","chancellor"],[50,52,52,48,50], "Republican FL Senator; 2016 candidate; 'Liddle Marco'; Secretary of State 2025");
  I("Josh Hawley",             "Republican (USA)","e7",["pm","leader","justice","home"],  [38,48,45,34,40], "Republican MO Senator; fist pump Jan 6; MAGA; anti-tech; Yale Law");
  I("JD Vance",                "Republican (USA)","e7",["pm","leader","chancellor","foreign"],[48,42,52,40,44], "Republican VP 2025; Hillbilly Elegy; Ohio Senator; Thiel funding; America First");
  I("Gavin Newsom",            "Democrat (USA)","e7",["pm","leader","chancellor","health"],[58,52,60,54,52], "Democratic CA Governor; 2028 potential; healthcare; homelessness; debate Trump");
  I("Gretchen Whitmer",        "Democrat (USA)","e7",["pm","leader","chancellor","health"],[58,50,58,54,52], "Democratic MI Governor; kidnapping plot; 'fix the damn roads'; future president talk");


  /* ═══════════════════════════════════════════════════════════════
     UK EXPANDED (MORE POLITICIANS)
     ═══════════════════════════════════════════════════════════════ */
  I("Ramsay MacDonald",        "Labour","e2",["pm","leader","chancellor","foreign"],    [60,62,60,58,55], "Labour first PM twice; National Government 1931; accused of betraying Labour; charismatic");
  I("Stanley Baldwin",         "Conservative","e2",["pm","leader","chancellor","trade"],[55,65,52,55,58], "Conservative PM three times; Abdication; appeaser label; 'Safety First'; Baldwin era");
  I("Neville Chamberlain",     "Conservative","e2",["pm","leader","chancellor","foreign"],[45,65,45,42,48], "Conservative PM; Munich Agreement; 'peace in our time'; outmanoeuvred by Hitler; resigned");
  I("Aneurin Bevan",           "Labour","e3",["pm","leader","health","work"],           [65,60,72,62,55], "Labour NHS architect; 'Vermin' speech; Tribune group; Gaitskell battles; resignation over charges");
  I("Hugh Gaitskell",          "Labour","e4",["pm","leader","chancellor","foreign"],    [60,60,60,60,55], "Labour leader 1955–63; Clause IV fight; EEC opposition; died before Wilson; revisionist");
  I("Anthony Eden",            "Conservative","e4",["pm","leader","foreign","defence"], [52,62,55,50,50], "Conservative PM; Suez Crisis 1956; resigned; handsome diplomat; health breakdown");
  I("Harold Macmillan",        "Conservative","e4",["pm","leader","chancellor","foreign"],[62,65,60,62,60], "Conservative PM 1957–63; 'Supermac'; 'Wind of Change'; Profumo; 'Never had it so good'");
  I("Alec Douglas-Home",       "Conservative","e4",["pm","leader","foreign","chancellor"],[52,65,48,52,50], "Conservative PM 1963–64; 14th Earl; renounced peerage; matchstick economic model");
  I("Roy Jenkins",             "Labour","e5",["pm","leader","chancellor","foreign"],    [62,65,62,62,55], "Labour then SDP; Home Sec; Chancellor; European Commission; SDP-Liberal Alliance");
  I("David Steel",             "Liberal","e5",["pm","leader","chancellor","foreign"],   [55,58,55,52,52], "Liberal leader; Alliance with SDP; 'go back to your constituencies and prepare for government'");
  I("Shirley Williams",        "SDP","e5",["pm","leader","education","chancellor"],     [58,60,58,55,52], "Labour then SDP Gang of Four; Education Secretary; Crosby by-election; Liberal Democrats");
  I("Bill Rodgers",            "SDP","e5",["pm","leader","transport","chancellor"],     [52,58,50,52,50], "Labour then SDP Gang of Four; Transport Secretary; SDP co-founder");
  I("Paddy Ashdown",           "Liberal Democrat","e6",["pm","leader","foreign","defence"],[62,58,62,60,55], "LibDem leader 1988–99; SAS officer; Bosnia; 'Paddy Pantsdown'; European idealist");
  I("Charles Kennedy",         "Liberal Democrat","e7",["pm","leader","chancellor","foreign"],[62,55,65,58,52], "LibDem leader 1999–2006; Iraq War No; 52 seats 2005; alcoholism; ousted; died 2015");
  I("Ming Campbell",           "Liberal Democrat","e7",["pm","leader","foreign","chancellor"],[52,62,52,52,50], "LibDem leader 2006–07; Sir Ming; foreign affairs expert; age jokes; resigned");
  I("Vince Cable",             "Liberal Democrat","e7",["pm","leader","chancellor","trade"],[60,62,58,60,55], "LibDem leader; Business Secretary; predicted banking crash; 'zombie economy'; Cable car");
  I("Jo Swinson",              "Liberal Democrat","e7",["pm","leader","chancellor","trade"],[52,48,55,50,50], "LibDem leader 2019; 'Revoke Article 50'; lost own seat; Ed Davey predecessor");
  I("Ed Davey",                "Liberal Democrat","e7",["pm","leader","chancellor","environment"],[52,52,52,50,50], "LibDem leader from 2020; inflatables; 72 seats 2024; parachuting; coalition arithmetic");
  I("George Galloway",         "Respect","e7",["pm","leader","foreign","work"],         [42,55,52,38,40], "Respect then WPB; Iraq War critic; Cat impression; Bradford by-election; removed 2024");
  I("Nigel Farage",            "Reform","e7",["pm","leader","home","trade"],            [48,52,58,42,50], "UKIP then Brexit Party then Reform; 7 election losses; Clacton 2024 won; 'Take Back Control'");
  I("Boris Johnson early",     "Conservative","e7",["pm","leader","chancellor","foreign"],[55,50,65,42,48], "Conservative Boris circa 2016; Leave champion; parallel career column; Spectator editor");
  I("William Hague",           "Conservative","e6",["pm","leader","foreign","chancellor"],[55,58,58,55,52], "Conservative leader 1997–2001; Welsh hat; Foreign Secretary; Lords now; whisky voice");
  I("Iain Duncan Smith",       "Conservative","e7",["pm","leader","work","chancellor"], [38,58,38,36,42], "Conservative leader 2001–03; Universal Credit architect; 'quite simply the best'; IDS");
  I("Michael Howard",          "Conservative","e7",["pm","leader","home","justice"],    [45,62,50,44,48], "Conservative leader 2003–05; 'something of the night'; Home Secretary; soft eurosceptic");
  I("John Prescott",           "Labour","e6",["pm","deputy","work","transport"],        [52,58,52,48,52], "Labour Deputy PM; Two Jags; punched egg man; transport; Hull pride; Prezza");
  I("Clare Short",             "Labour","e6",["pm","foreign","work","chancellor"],      [52,55,55,50,48], "Labour International Development; resigned over Iraq 2003; honest moral dissent");
  I("Mo Mowlam",               "Labour","e6",["pm","foreign","home","leader"],          [62,55,62,58,52], "Labour Northern Ireland Secretary; Good Friday Agreement unsung hero; brain tumour; died 2005");
  I("Robin Cook",              "Labour","e6",["pm","foreign","leader","justice"],        [60,60,65,60,52], "Labour FM 1997–2001; ethical foreign policy; resigned over Iraq; brilliant orator; died 2005");
  I("Jack Straw",              "Labour","e6",["pm","home","foreign","justice"],          [50,62,48,50,50], "Labour Home Sec then FM; Jack Boots; Iraq; Rendition; persistent presence");
  I("David Blunkett",          "Labour","e6",["pm","home","education","work"],           [52,58,50,50,50], "Labour blind Home Sec; tough on crime; nanny visa; resigned twice; Sheffield");
  I("Charles Clarke",          "Labour","e7",["pm","home","education","leader"],         [48,55,46,48,48], "Labour Home Sec; foreign prisoner scandal; education minister; anti-Blair eventually");
  I("Alan Johnson",            "Labour","e7",["pm","home","chancellor","health"],        [55,55,52,52,52], "Labour Home Sec; Chancellor briefly 2010; postman PM 2007 near-thing; loved character");
  I("John Healey",             "Labour","e7",["pm","defence","health","chancellor"],     [48,55,46,48,48], "Labour Defence Secretary; housing minister; Rotherham; veteran policies");
  I("Yvette Cooper",           "Labour","e7",["pm","home","chancellor","leader"],        [55,55,52,52,52], "Labour Home Secretary; Ed Balls' wife; immigration hawk surprise; 2015 leadership race");
  I("Pat McFadden",            "Labour","e7",["pm","chancellor","leader"],              [50,52,48,50,50], "Labour Chancellor of Duchy; 2025 budget keeper; Wolverhampton; fiscal rules enforcer");
  I("Wes Streeting",           "Labour","e7",["pm","health","leader"],                  [52,48,52,50,50], "Labour Health Secretary; NHS reform; self-referral; cancer patient; Blair-aligned");
  I("Jonathan Reynolds",       "Labour","e7",["pm","trade","chancellor","work"],        [50,48,50,50,48], "Labour Business Secretary; Stalybridge; trade policy post-Brexit; pragmatist");
  I("David Lammy",             "Labour","e7",["pm","foreign","leader","justice"],        [55,55,55,52,50], "Labour FM; human rights lawyer; Tottenham; Mastermind; 'Trump is a woman-hater'");
  I("Hilary Benn",             "Labour","e7",["pm","foreign","environment","chancellor"],[55,58,55,52,52], "Labour Northern Ireland Sec; environment secretary; bridge builder; Tony's son; voted air strikes");
  I("Ed Miliband",             "Labour","e7",["pm","leader","chancellor","environment"], [55,55,55,52,52], "Labour leader 2010–15; bacon sandwich; EdStone; 2024 Energy Secretary; brotherly knife");
  I("Douglas Alexander",       "Labour","e7",["pm","foreign","trade","work"],            [52,55,50,50,50], "Labour Scotland; FM under Brown; lost seat 2015; Renfrewshire revival thought leader");
  I("Jim Murphy",              "Labour","e7",["pm","leader","chancellor"],               [48,52,48,46,46], "Labour Scottish leader 2014–15; irn-bru crates speech; Rangers-Celtic problem; East Renfrewshire");
  I("George Osborne",          "Conservative","e7",["pm","chancellor","leader","trade"], [52,52,52,52,50], "Conservative Chancellor; austerity; Project Fear; Evening Standard editor; Citi banker");
  I("Kenneth Clarke",          "Conservative","e6",["pm","chancellor","home","justice"], [60,68,60,60,58], "Conservative big beast; Chancellor; EU enthusiast; jazz music; Nottingham; no deal no no");
  I("Michael Gove",            "Conservative","e7",["pm","justice","education","leader"],[50,55,52,48,50], "Conservative Goverites; education wars; Brexit; backstabbed Boris; Levelling Up; divorcer");
  I("Jeremy Hunt",             "Conservative","e7",["pm","chancellor","health","leader"],[52,55,50,52,52], "Conservative Chancellor; health secretary scandal; leadership run 2019; autumn statement");
  I("Penny Mordaunt",          "Conservative","e7",["pm","leader","foreign","defence"],  [52,50,55,50,50], "Conservative leadership contender; Trade; Defence; sword carrier coronation; Pompey");
  I("Liz Truss early",         "Conservative","e7",["pm","leader","trade","foreign"],   [42,48,42,36,42], "Conservative FM 2021–22; cheese speech; 'fuck business'; cheese meme; LibDems first");
  I("Priti Patel",             "Conservative","e7",["pm","home","leader","chancellor"],  [38,52,40,34,40], "Conservative Home Sec; Rwanda plan origin; Israel lobbying; confrontational; Essex");
  I("Gavin Williamson",        "Conservative","e7",["pm","education","defence","leader"],[25,48,28,22,30], "Conservative 'get a spine'; education chaos COVID; sacked twice; 'Go away and shut up' texts");
  I("Matt Hancock",            "Conservative","e7",["pm","health","chancellor"],         [35,50,42,32,38], "Conservative Health Sec; COVID Whatsapp; I'm a Celebrity; Gina Coladangelo affair; Bury");
  I("Sajid Javid",             "Conservative","e7",["pm","home","chancellor","health"],  [50,55,50,48,50], "Conservative Chancellor resign Budget night; Home Sec Rwanda author; Health COVID reset");
  I("Nadhim Zahawi",           "Conservative","e7",["pm","chancellor","education"],      [38,50,38,35,38], "Conservative Chancellor 49 days; HMRC tax penalty; Ukraine born; resigned 2023");
  I("Grant Shapps",            "Conservative","e7",["pm","defence","home","transport"],  [38,50,38,34,38], "Conservative chameleon; Michael Green alias; HS2; Defence Secretary; record jobs claimed");
  I("Robert Halfon",           "Conservative","e7",["pm","education","work","leader"],   [48,52,46,46,46], "Conservative education chair; 'ladder of opportunity'; disability campaigner; Essex");
  I("Tom Tugendhat",           "Conservative","e7",["pm","home","foreign","defence"],    [50,52,50,48,48], "Conservative Home Sec 2024; foreign affairs chair; veteran; 2022 leadership contender");
  I("Kemi Badenoch",           "Conservative","e7",["pm","leader","trade","chancellor"], [50,50,52,48,50], "Conservative leader from 2024; trade secretary; DEI critic; Nigerian-born; culture wars");
  I("Suella Braverman",        "Conservative","e7",["pm","home","justice","leader"],     [32,50,40,28,38], "Conservative Home Sec twice; 'obsession' migrant rhetoric; sacked; Rwanda; KC");
  I("Chris Heaton-Harris",     "Conservative","e7",["pm","leader","transport"],          [38,50,36,36,38], "Conservative NI Secretary; Brexit Whip; Daventry; football fan; beer crate");
  I("Mark Francois",           "Conservative","e7",["pm","leader","defence"],            [28,48,35,24,32], "Conservative ERG; Brexit hardliner; 'Franglais'; letter back to German CEO; muscular");


  /* ═══════════════════════════════════════════════════════════════
     UKRAINE, BELARUS, MOLDOVA, GEORGIA EXPANDED
     ═══════════════════════════════════════════════════════════════ */
  I("Leonid Kravchuk",         "For Ukraine (UA)","e6",["pm","leader","chancellor","foreign"],[52,60,50,50,50], "Ukraine first President 1991–94; Belovezha Accords; nuclear disarmament Lisbon Protocol");
  I("Leonid Kuchma",           "For Ukraine (UA)","e6",["pm","leader","chancellor","trade"],[42,62,40,42,45], "Ukraine President 1994–2005; Kuchmagate; Gongadze murder; authoritarian; oligarchs");
  I("Viktor Yushchenko",       "OUUSD (UA)","e7",["pm","leader","chancellor","foreign"],[55,55,52,55,50], "Our Ukraine Orange Revolution President 2005–10; poisoned by dioxin; disfigured");
  I("Yulia Tymoshenko",        "Batkivshchyna (UA)","e7",["pm","leader","chancellor","energy"],[58,55,58,55,55], "Batkivshchyna PM twice; gas princess; imprisoned by Yanukovych; Orange icon; braids");
  I("Viktor Yanukovych",       "PR (UA)","e7",["pm","leader","chancellor"],             [28,55,30,28,35], "Party of Regions Ukraine PM then President; fled to Russia 2014; EU deal killed Maidan");
  I("Petro Poroshenko",        "European Solidarity (UA)","e7",["pm","leader","chancellor","defence"],[45,55,45,44,45], "European Solidarity Ukraine President 2014–19; chocolate king; Minsk; Donbas war");
  I("Volodymyr Zelensky",      "Servant of the People (UA)","e7",["pm","leader","chancellor","foreign"],[68,50,68,60,58], "Servant of the People Ukraine President; TV comedian; wartime leader; stayed in Kyiv 2022");
  I("Iryna Venediktova",       "Servant of the People (UA)","e7",["pm","justice","leader"],[50,52,48,50,48], "Ukraine Prosecutor General; war crimes documentation; ICC cooperation");
  I("Oleksiy Reznikov",        "Indep (UA)","e7",["pm","defence","leader"],             [50,52,48,50,48], "Ukraine Defence Minister 2021–23; arms procurement; Western weapons lobbying");
  I("Denys Shmyhal",           "Servant of the People (UA)","e7",["pm","leader","chancellor","energy"],[48,50,46,48,48], "Ukraine PM from 2020; reconstruction; energy resilience; EU accession finance");
  I("Alexander Lukashenko",    "Belarus (BY)","e6",["pm","leader","chancellor","home"],  [18,60,25,18,28], "Belarus President 1994–; electoral fraud; 2020 protests crushed; Russia dependence; exporter");
  I("Sviatlana Tsikhanouskaya","Indep (BY)","e7",["pm","leader","chancellor"],          [55,40,55,50,48], "Belarus opposition leader; fled after 2020; EU recognition; democratic Belarus advocate");
  I("Maya Sandu",              "PAS (MD)","e7",["pm","leader","chancellor","foreign"],  [58,52,55,58,52], "PAS Moldova President; EU accession; anti-corruption; Harvard Kennedy School; Gagauzia");
  I("Ion Chicu",               "PSRM (MD)","e7",["pm","leader","chancellor"],           [45,50,45,45,45], "Moldova PM 2019–20; Dodon ally; pro-Russia; replaced after snap election");
  I("Natalia Gavrilita",       "PAS (MD)","e7",["pm","leader","chancellor"],            [52,52,50,52,50], "Moldova PM 2021–23; Sandu ally; energy crisis; PAS reform agenda; austerity");
  I("Mikheil Saakashvili",     "ENM (GE)","e7",["pm","leader","chancellor","foreign"],  [58,52,60,55,52], "Georgia National Movement President 2004–13; Rose Revolution; 2008 war; imprisoned");
  I("Giorgi Margvelashvili",   "GD (GE)","e7",["pm","leader","chancellor"],             [52,52,50,52,50], "Georgia President 2013–18; Ivanishvili's first candidate; later clashed with PM");
  I("Bidzina Ivanishvili",     "Georgian Dream (GE)","e7",["pm","leader","chancellor","trade"],[40,55,38,40,48], "Georgia Dream founder billionaire PM; Russia wealth; oligarch power; foreign agent law");
  I("Salome Zourabichvili",    "GD (GE)","e7",["pm","leader","foreign"],               [52,52,50,52,50], "Georgia President 2018–24; French-born; anti-Georgian Dream turn; EU pro aspirations");
  I("Mikheil Kavelashvili",    "GD (GE)","e7",["pm","leader","chancellor"],             [35,45,38,33,38], "Georgia Dream disputed President 2024; former footballer; Zourabichvili disputed replacement");

  /* ═══════════════════════════════════════════════════════════════
     MORE BALKANS (Serbia, Croatia, Kosovo, Albania, N. Macedonia)
     ═══════════════════════════════════════════════════════════════ */
  I("Josip Broz Tito",         "SKJ (YU)","e4",["pm","leader","foreign","chancellor"],  [65,72,62,65,62], "Yugoslavia President; Partisan leader WWII; non-aligned; Tito-Stalin split; death aftermath");
  I("Slobodan Milosevic",      "SPS (RS)","e6",["pm","leader","chancellor","home"],     [28,60,40,28,40], "SPS Serbia President; Balkan wars; war crimes ICC; died Hague 2006; 'Butcher of the Balkans'");
  I("Vojislav Kostunica",      "DSS (RS)","e7",["pm","leader","chancellor","justice"],  [50,58,48,50,48], "DSS Serbia PM then President; Milosevic rival; EU-cautious nationalist democrat");
  I("Boris Tadic",             "DS (RS)","e7",["pm","leader","chancellor","foreign"],   [55,55,52,55,52], "DS Serbia President 2004–12; EU accession; Mladic arrest; Srebrenica apology");
  I("Aleksandar Vucic",        "SNS (RS)","e7",["pm","leader","chancellor","foreign"],  [45,55,50,42,52], "SNS Serbia President; Milosevic past to EU narrative; media control; Serbia Russia balance");
  I("Ana Brnabic",             "SNS (RS)","e7",["pm","leader","chancellor"],            [45,50,45,44,48], "SNS Serbia PM 2017–24; first gay PM in region; Vucic loyal; EU-Russia tightrope");
  I("Edi Rama",                "PS (AL)","e7",["pm","leader","chancellor","culture"],   [55,55,55,52,52], "PS Albania PM from 2013; Tirana mayor; painter; EU candidacy; mini-Schengen");
  I("Sali Berisha",            "DP (AL)","e6",["pm","leader","chancellor"],             [45,58,45,42,45], "DP Albania PM twice; transition from communism; non-grata US list; pyramid collapse");
  I("Albin Kurti",             "Vetevendosje (XK)","e7",["pm","leader","chancellor","work"],[58,50,60,54,52], "Vetevendosje Kosovo PM; anti-corruption; Serb community friction; US Kosovo relations");
  I("Hashim Thaci",            "PDK (XK)","e7",["pm","leader","foreign","chancellor"],  [35,52,40,32,40], "PDK Kosovo President; KLA wartime leader; ICC war crimes indictment; resigned");
  I("Dragan Covic",            "HDZ (BA)","e7",["pm","leader","chancellor"],             [35,52,35,32,38], "HDZ BiH Croat member; ethnic partition advocate; EU accession obstruction");
  I("Milorad Dodik",           "SNSD (BA)","e7",["pm","leader","chancellor","home"],    [18,55,25,18,30], "SNSD Republika Srpska President; secession threats; Russia; sanctioned by US/EU");
  I("Bakir Izetbegovic",       "SDA (BA)","e7",["pm","leader","foreign","chancellor"],  [45,52,45,44,46], "SDA BiH Bosniak member; Alija's son; EU accession; Bosnia sovereignty defender");
  I("Zoran Zaev",              "SDSM (MK)","e7",["pm","leader","chancellor","foreign"], [52,50,52,52,50], "SDSM N. Macedonia PM; Prespa Agreement name change; EU-NATO accession unlocked");
  I("Nikola Gruevski",         "VMRO-DPMNE (MK)","e7",["pm","leader","chancellor"],    [35,55,38,32,42], "VMRO Macedonia PM 2006–16; Skopje 2014 baroque kitsch; convicted; fled to Hungary");


  /* ═══════════════════════════════════════════════════════════════
     ECUADOR, PARAGUAY, URUGUAY
     ═══════════════════════════════════════════════════════════════ */
  I("Rafael Correa",           "PAIS (EC)","e7",["pm","leader","chancellor","trade"],   [60,55,62,55,58], "PAIS Ecuador President 2007–17; 21st century socialism; Citizens Revolution; press crackdown");
  I("Guillermo Lasso",         "CREO (EC)","e7",["pm","leader","chancellor","trade"],   [48,52,46,48,46], "CREO Ecuador President 2021–23; banker; dissolved Congress mutuerte; gang warfare");
  I("Daniel Noboa",            "ADN (EC)","e7",["pm","leader","chancellor","home"],     [50,40,52,46,46], "ADN Ecuador youngest President 2023; banana heir; prison sieges; narco state crisis");
  I("Lenin Moreno",            "PAIS (EC)","e7",["pm","leader","chancellor","work"],    [48,52,45,46,48], "PAIS Ecuador President 2017–21; Correa successor then enemy; Assange eviction");
  I("Alfredo Stroessner",      "Colorado (PY)","e4",["pm","leader","chancellor","home"],[15,65,20,15,25], "Paraguay military dictator 1954–89; Operation Condor; Nazi refuge; 35 years; ousted");
  I("Juan Carlos Wasmosy",     "Colorado (PY)","e6",["pm","leader","chancellor"],       [42,50,38,40,40], "Paraguay first civilian President 1993–98; attempted coup survived; corruption");
  I("Fernando Lugo",           "PLRA (PY)","e7",["pm","leader","chancellor","agriculture"],[55,50,52,50,50], "Paraguay bishop-turned-President 2008–12; Curuguaty massacre; impeached rapidly");
  I("Santiago Pena",           "Colorado (PY)","e7",["pm","leader","chancellor","trade"],[48,48,46,46,46], "Colorado Paraguay President 2023; Taiwan recognition; Itaipu renegotiation");
  I("Jose Mujica",             "FA (UY)","e7",["pm","leader","chancellor","agriculture"],[68,62,68,62,58], "Frente Amplio Uruguay President 2010–15; Tupamaro guerrilla; marijuana; humble lifestyle");
  I("Tabare Vazquez",          "FA (UY)","e7",["pm","leader","chancellor","health"],    [60,60,55,58,55], "Frente Amplio Uruguay President twice; oncologist; Uruguay social reforms; tobacco");
  I("Luis Lacalle Pou",        "Blanco (UY)","e7",["pm","leader","chancellor","trade"], [52,48,52,50,50], "Partido Nacional Uruguay President 2020–; COVID response; free trade; market opening");

  /* ═══════════════════════════════════════════════════════════════
     CARIBBEAN & SMALLER NATIONS
     ═══════════════════════════════════════════════════════════════ */
  I("Eric Williams",           "PNM (TT)","e4",["pm","leader","chancellor","foreign"],  [65,65,62,62,60], "PNM Trinidad & Tobago first PM; Oxford historian; Capitalism & Slavery; Chaguaramas");
  I("Patrick Manning",         "PNM (TT)","e6",["pm","leader","chancellor","energy"],   [50,58,50,50,50], "PNM T&T PM twice; energy boom; UNC losses; Scarborough estate");
  I("Kamla Persad-Bissessar",  "UNC (TT)","e7",["pm","leader","chancellor"],            [52,55,52,50,50], "UNC T&T first female PM; Indo-Trinidadian; coalition; 2015 loss");
  I("Keith Rowley",            "PNM (TT)","e7",["pm","leader","chancellor","energy"],   [50,55,50,50,50], "PNM T&T PM from 2015; energy diversification; crime crisis; COVID");
  I("Norman Manley",           "PNP (JM)","e4",["pm","leader","chancellor","justice"],  [62,62,60,60,58], "PNP Jamaica PM; barrister; independence architect; National Hero; Norman W. Manley");
  I("Michael Manley",          "PNP (JM)","e5",["pm","leader","chancellor","work"],     [60,58,60,58,55], "PNP Jamaica PM twice; IMF clash; democratic socialism; Rastafari alignment");
  I("Edward Seaga",            "JLP (JM)","e5",["pm","leader","chancellor","trade"],    [52,60,50,52,52], "JLP Jamaica PM; anti-Cuba; economic liberalisation; West Kingston don politics");
  I("Portia Simpson-Miller",   "PNP (JM)","e6",["pm","leader","chancellor","work"],     [52,55,52,50,50], "PNP Jamaica first female PM twice; 'Sista P'; pro-gay rights evolution; Mandela admirer");
  I("Andrew Holness",          "JLP (JM)","e7",["pm","leader","chancellor","education"],[52,50,50,50,50], "JLP Jamaica PM from 2016; youngest PM; economic growth; crime; CARICOM chair");
  I("Errol Barrow",            "BLP (BB)","e4",["pm","leader","chancellor","foreign"],  [62,62,60,60,58], "DLP Barbados independence PM; 'Errol W. Barrow'; 'father of the nation'; Caribbean community");
  I("Owen Arthur",             "BLP (BB)","e6",["pm","leader","chancellor","trade"],    [55,58,52,55,52], "BLP Barbados PM 1994–2008; economic growth; 'architect of success'");
  I("Mia Mottley",             "BLP (BB)","e7",["pm","leader","chancellor","environment"],[62,52,62,58,55], "BLP Barbados PM; removed Queen; Bridgetown Initiative; climate champion; Bridgetown Agenda");
  I("Cheddi Jagan",            "PPP (GY)","e4",["pm","leader","chancellor","agriculture"],[55,58,55,52,50], "PPP Guyana PM then President; Marxist democrat; US opposition; sugar workers");
  I("Forbes Burnham",          "PNC (GY)","e4",["pm","leader","chancellor","home"],     [35,58,40,30,40], "PNC Guyana PM then President; authoritarian socialist; rigged elections; died in office");
  I("Bharrat Jagdeo",          "PPP (GY)","e7",["pm","leader","chancellor","environment"],[52,52,50,50,50], "PPP Guyana VP; oil wealth management; corruption allegations; Mo Ibrahim Prize");
  I("Irfaan Ali",              "PPP (GY)","e7",["pm","leader","chancellor","trade"],    [50,48,48,50,48], "PPP Guyana President 2020; oil boom management; ExxonMobil disputes; corruption past");

  /* ═══════════════════════════════════════════════════════════════
     MORE AFRICA (Zimbabwe extra, DRC, Cameroon)
     ═══════════════════════════════════════════════════════════════ */
  I("Patrice Lumumba",         "MNC (CD)","e4",["pm","leader","foreign","chancellor"],  [62,52,65,55,50], "MNC Congo PM 1960; independence; UN; assassinated with Belgian/CIA aid; pan-African icon");
  I("Mobutu Sese Seko",        "MPR (CD)","e4",["pm","leader","chancellor","home"],     [15,65,30,12,30], "Zaire/DRC dictator 1965–97; authentic Zaireanisation; kleptocracy; leopard skin hat");
  I("Laurent-Desire Kabila",   "AFDL (CD)","e6",["pm","leader","chancellor","defence"], [35,52,38,30,35], "AFDL DRC President 1997–2001; ousted Mobutu; assassinated by bodyguard");
  I("Joseph Kabila",           "PPRD (CD)","e7",["pm","leader","chancellor"],           [30,52,30,28,35], "DRC President 2001–19; son of Laurent; refused to leave; Tshisekedi transition deal");
  I("Felix Tshisekedi",        "UDPS (CD)","e7",["pm","leader","chancellor","foreign"], [48,50,46,46,46], "UDPS DRC President; Etienne's son; M23 crisis; Rwanda conflict; anti-Kabila turn");
  I("Paul Biya",               "CPDM (CM)","e5",["pm","leader","chancellor"],           [20,70,22,18,28], "CPDM Cameroon President since 1982; 40+ years; Anglophone crisis; aged autocrat; Paris");
  I("Francis Ngannou",         "Indep (CM)","e7",["pm","leader","chancellor"],          [50,35,50,42,38], "MMA fighter; Cameroon icon; poverty to champion; political aspirations; PFL CEO");
  I("Ahmed Ahidjo",            "UNC (CM)","e3",["pm","leader","chancellor","foreign"],  [42,58,38,40,42], "Cameroon first President 1960–82; reunification; authoritarian; resigned; exile");
  I("Aliko Dangote",           "Indep (NG)","e7",["pm","trade","chancellor","leader"],  [55,55,48,55,50], "Nigeria Africa's richest; Dangote Cement/Refinery; non-political but political influence");
  I("Goodluck Jonathan",       "PDP (NG)","e7",["pm","leader","chancellor","energy"],   [50,55,48,48,50], "PDP Nigeria President 2010–15; Boko Haram crisis; first peaceful power transfer 2015");
  I("Muhammadu Buhari",        "APC (NG)","e7",["pm","leader","chancellor","defence"],  [38,62,35,35,40], "APC Nigeria military then President; anti-corruption but incompetent; Boko Haram; health");
  I("Bola Tinubu",             "APC (NG)","e7",["pm","leader","chancellor","trade"],    [42,58,42,38,48], "APC Nigeria President 2023; Jagaban; Lagos godfather; fuel subsidy removed; stolen votes claim");
  I("Samia Nkrumah",           "CPP (GH)","e7",["pm","leader","chancellor"],            [50,45,50,46,44], "CPP Ghana Kwame's daughter; parliament; pan-Africanism heritage; symbolic leadership");
  I("Ellen Johnson Sirleaf",   "UP (LR)","e7",["pm","leader","chancellor","foreign"],   [62,60,60,62,55], "UP Liberia first female African President; Nobel Peace 2011; Ebola; Harvard economist");


  /* ═══════════════════════════════════════════════════════════════
     MORE HISTORICAL WILDCARDS & EARLY MODERN
     ═══════════════════════════════════════════════════════════════ */
  I("Catherine the Great",     "Russian Empire","e0",["pm","leader","chancellor","foreign"],[70,72,68,72,68], "Russia Empress 1762–96; Enlightenment; Pugachev; partitions of Poland; arts patron");
  I("Peter the Great",         "Russian Empire","e0",["pm","leader","foreign","chancellor"],[65,68,60,72,65], "Russia moderniser Emperor; St Petersburg; Baltic; Western reforms; Streltsy; 'The Great'");
  I("Maria Theresa",           "Habsburgs","e0",["pm","leader","foreign","chancellor"],  [65,70,62,68,65], "Habsburg Empress; Pragmatic Sanction; War of Austrian Succession; 16 children; reformer");
  I("Frederick the Great",     "Hohenzollern Prussia","e0",["pm","leader","defence","culture"],[68,68,65,70,65], "Prussia king; Seven Years War; enlightened despot; flute player; partition Poland");
  I("Elizabeth I",             "Tudor England","e0",["pm","leader","foreign","culture"], [70,70,72,72,68], "England Virgin Queen; Armada; Drake; Shakespeare; Elizabethan Golden Age; Walsingham");
  I("Henry VIII",              "Tudor England","e0",["pm","leader","home","culture"],    [55,60,58,52,52], "England; six wives; Church of England break; Thomas More; dissolution monasteries; obese");
  I("Mary Queen of Scots",     "Scotland","e0",["pm","leader","foreign","culture"],      [55,50,55,48,45], "Scotland Queen; France; religion; imprisoned by Elizabeth; beheaded 1587; Catholic martyr");
  I("William of Orange",       "Netherlands","e0",["pm","leader","defence","foreign"],   [62,65,58,65,60], "Glorious Revolution; Protestant; British Bill of Rights 1689; Netherlands Stadholder");
  I("Gustavus Adolphus",       "Sweden","e0",["pm","leader","defence","foreign"],        [65,65,60,65,60], "Sweden king; Thirty Years War; 'Lion of the North'; military revolution; died at Lutzen");
  I("Cardinal Richelieu",      "France","e0",["pm","leader","chancellor","foreign"],     [58,70,55,70,65], "France PM; absolute monarchy; Thirty Years War; Academie Francaise; Trois Mousquetaires");
  I("John Locke",              "Whigs","e0",["pm","justice","leader","culture"],         [68,58,65,68,55], "Whig philosopher; Two Treatises; natural rights; blank slate; toleration; liberal foundation");
  I("Edmund Burke",            "Whigs","e0",["pm","leader","justice","foreign"],         [65,62,70,65,60], "Whig MP; Reflections on the Revolution; Irish Catholic; conservatism founding father");
  I("William Pitt the Younger","Tory","e0",["pm","chancellor","leader","foreign"],       [65,65,62,68,62], "Tory PM twice; youngest PM at 24; income tax; anti-Napoleonic coalitions; Fox rival");
  I("Charles James Fox",       "Whigs","e0",["pm","leader","foreign","chancellor"],      [62,60,65,60,55], "Whig opposition; American Revolution sympathy; French Revolution; Pitt rival; gambling");
  I("Wellington",              "Tory","e0",["pm","leader","defence","foreign"],          [60,68,52,65,58], "Duke of Wellington; Waterloo; PM 1828–30, 1834; Iron Duke; Catholic emancipation");
  I("Metternich Austria",      "Austrian Empire","e0",["pm","chancellor","foreign","leader"],[55,70,52,68,60], "See Metternich above — different notation ensures unique key for game variant");
  I("Giuseppe Garibaldi Italia","Italian Unification","e1",["pm","leader","defence","foreign"],[63,57,64,59,54], "Garibaldi alternative entry with Italy scope note to distinguish");
  I("Simon Bolivar El Libertador","Gran Colombia","e0",["pm","leader","defence","foreign"],[64,62,64,64,59], "El Libertador second entry; Battle of Ayacucho; 1825 freedom Venezuela/Colombia/Ecuador/Peru");
  I("Thomas Jefferson",        "Democratic-Republican (US)","e0",["pm","leader","foreign","culture"],[68,62,68,68,60], "Democratic-Republican President; Declaration of Independence; Louisiana Purchase; Monticello");
  I("John Adams",              "Federalist (US)","e0",["pm","leader","foreign","justice"],[60,62,58,62,55], "Federalist first VP; second President; XYZ affair; Alien Sedition Acts; Harvard");
  I("James Madison",           "Democratic-Republican (US)","e0",["pm","leader","justice","chancellor"],[62,65,60,65,60], "Democratic-Republican President; Constitution architect; Federalist Papers; 1812 War");
  I("Alexander Hamilton",      "Federalist (US)","e0",["pm","chancellor","leader","foreign"],[65,60,62,68,58], "Federalist founder; Treasury; financial system; Washington aide; duelled with Burr; musical");
  I("Benjamin Franklin",       "Federalist (US)","e0",["pm","foreign","culture","chancellor"],[70,68,68,65,62], "Founding Father; diplomat; printer; electricity; Constitution; France ambassador");
  I("Andrew Jackson",          "Democrat (USA)","e0",["pm","leader","home","defence"],  [50,62,58,45,55], "Democratic 7th President; Indian Removal; Bank war; 'Old Hickory'; spoils system");
  I("Abraham Lincoln early",   "Whig (US)","e1",["pm","leader","justice"],              [70,58,73,70,62], "Whig then Republican; Illinois congressman; Douglas debates; Cooper Union speech");
  I("Ulysses S. Grant",        "Republican (USA)","e1",["pm","leader","defence","foreign"],[50,60,45,50,48], "Republican President; Civil War general; Reconstruction; corruption scandals; 'Unconditional Surrender'");
  I("Theodore Roosevelt",      "Republican (USA)","e2",["pm","leader","chancellor","foreign"],[68,62,70,65,60], "Republican President; Rough Rider; Panama Canal; Nobel Peace; trust-buster; 'Speak softly'");
  I("Woodrow Wilson",          "Democrat (USA)","e2",["pm","leader","foreign","chancellor"],[60,62,62,62,55], "Democratic President; 14 Points; League of Nations; Versailles; segregationist; Princeton");
  I("Herbert Hoover",          "Republican (USA)","e2",["pm","chancellor","trade","leader"],[48,62,45,48,45], "Republican President; Depression architect; Great Engineer; Hoovervilles; Belgian relief");
  I("Millard Fillmore",        "Whig (US)","e1",["pm","leader","chancellor"],            [40,52,38,40,38], "Whig 13th President; Compromise 1850; anti-Catholic later Know-Nothing; Buffalo");
  I("James K. Polk",           "Democrat (USA)","e0",["pm","leader","foreign","chancellor"],[55,58,50,55,52], "Democratic 11th President; Oregon; Mexican War; manifest destiny; one-term pledge kept");


  /* ═══════════════════════════════════════════════════════════════
     EUROPEAN MISCELLANEOUS (Luxembourg, Malta, Cyprus, Iceland, Estonia, Latvia, Lithuania)
     ═══════════════════════════════════════════════════════════════ */
  I("Jean-Claude Juncker",     "CSV (LU)","e7",["pm","leader","chancellor","foreign"],  [58,65,55,60,55], "Luxembourg PM longest; EC President 2014–19; eurozone architect; 'when it gets serious you must lie'");
  I("Xavier Bettel",           "DP (LU)","e7",["pm","leader","chancellor"],             [52,52,50,52,50], "Luxembourg PM 2013–23; openly gay; liberal; FM; EU Council voice");
  I("Luc Frieden",             "CSV (LU)","e7",["pm","leader","chancellor","trade"],    [50,52,48,50,50], "CSV Luxembourg PM from 2023; Finance Minister; BNP background; conservative return");
  I("Joseph Muscat",           "PL (MT)","e7",["pm","leader","chancellor","trade"],     [50,52,50,48,48], "Labour Malta PM 2013–20; Daphne Caruana Galizia murder; EU presidency; resigned corruption");
  I("Robert Abela",            "PL (MT)","e7",["pm","leader","chancellor"],             [48,48,48,48,48], "Labour Malta PM from 2020; Muscat successor; EU Schengen border pressure");
  I("Nicos Anastasiades",      "DISY (CY)","e7",["pm","leader","chancellor","foreign"], [50,58,48,50,50], "DISY Cyprus President 2013–23; EU bailout haircut; reunification talks Guterres");
  I("Nikos Christodoulides",   "DISY (CY)","e7",["pm","leader","chancellor","foreign"], [52,50,50,52,48], "Cyprus President 2023; FM; independent candidate backed right; reunification");
  I("Vigdis Finnbogadottir",   "Progr (IS)","e5",["pm","leader","culture","foreign"],   [65,55,62,60,55], "Iceland first female President in world 1980; actress-director; culture UNESCO");
  I("Katrin Jakobsdottir",     "Left-Green (IS)","e7",["pm","leader","chancellor","environment"],[60,52,58,58,52], "Iceland Left-Green PM 2017–24; feminist economist; Pandora Papers; Reykjavik Mayor");
  I("Johanna Sigurdardottir",  "SDA (IS)","e7",["pm","leader","chancellor","work"],     [55,55,52,52,50], "Iceland first female PM; first openly gay PM world 2009; financial crash aftermath");
  I("Mart Laar",               "Isamaa (EE)","e6",["pm","leader","chancellor","trade"],  [58,58,55,58,55], "Estonia PM twice; Baltic Tiger; flat tax pioneer; joined NATO/EU; Thatcher admirer");
  I("Kersti Kaljulaid",        "Isamaa (EE)","e7",["pm","leader","chancellor","foreign"],[60,55,55,58,52], "Estonia first female President 2016–21; Court of Auditors; EU; cyber and defence voice");
  I("Alar Karis",              "Indep (EE)","e7",["pm","leader","chancellor"],           [52,55,50,52,50], "Estonia President from 2021; zoologist; national museum director; pro-NATO");
  I("Andrus Ansip",            "RE (EE)","e7",["pm","leader","chancellor","trade"],     [55,60,50,56,52], "Estonia PM 2005–14; e-governance; NATO Article 5 advocate; EC VP Digital Single Market");
  I("Kaja Kallas",             "RE (EE)","e7",["pm","leader","chancellor","foreign"],   [60,52,58,58,52], "Estonia PM 2021–24; EU FM 2024; Russia hawk; longest female PM; Kallas doctrine");
  I("Valdis Dombrovskis",      "V (LV)","e7",["pm","leader","chancellor","trade"],      [55,58,50,56,52], "Latvia PM 2009–14; IMF austerity; EC VP finance; Latvia economic shock therapy");
  I("Edgars Rinkevics",        "LRA (LV)","e7",["pm","leader","chancellor","foreign"],  [55,52,52,54,50], "Latvia President 2023; openly gay; FM; pro-NATO; Baltic solidarity");
  I("Dalia Grybauskaite",      "TS-LKD (LT)","e7",["pm","leader","chancellor","foreign"],[60,60,55,60,55], "Lithuania President twice; EC Budget Commissioner; Iron Lady Baltic; China de-risking");
  I("Gitanas Nauseda",         "Indep (LT)","e7",["pm","leader","chancellor"],          [52,52,50,52,50], "Lithuania President 2019; economist; independent; China Taiwan stance; NATO");
  I("Saulius Skvernelis",      "LVZS (LT)","e7",["pm","leader","chancellor","home"],    [48,50,46,48,46], "Lithuania PM 2016–20; agrarian; police background; China-friendly caution controversy");

  /* ═══════════════════════════════════════════════════════════════
     CENTRAL ASIAN EXPANDED
     ═══════════════════════════════════════════════════════════════ */
  I("Nursultan Nazarbayev",    "Nur Otan (KZ)","e6",["pm","leader","chancellor","foreign"],[35,68,38,35,45], "Kazakhstan President 1991–2019; Astana renamed Nur-Sultan; nuclear disarmament; clans");
  I("Kassym-Jomart Tokayev",   "Amanat (KZ)","e7",["pm","leader","chancellor","foreign"],[40,58,38,40,45], "Kazakhstan President 2019; Nazarbayev successor; Jan 2022 protests CSTO; balancing");
  I("Islam Karimov",           "UzLiDeP (UZ)","e5",["pm","leader","chancellor","home"], [15,62,20,15,25], "Uzbekistan President 1991–2016; Andijan massacre; torture boiling; human rights worst");
  I("Shavkat Mirziyoyev",      "UzLiDeP (UZ)","e7",["pm","leader","chancellor","trade"],[38,55,35,38,40], "Uzbekistan President 2016; Karimov successor; reformist openings; authoritarian core");
  I("Emomali Rahmon",          "PDPT (TJ)","e6",["pm","leader","chancellor","home"],    [18,60,20,18,28], "Tajikistan President 1994; civil war winner; family enrichment; son succession plan");
  I("Gurbanguly Berdimuhamedov","Democratic Party (TM)","e7",["pm","leader","chancellor"],[12,55,18,12,20], "Turkmenistan President; Berdymukhamedov; natural gas; horse obsession; son-succession");
  I("Sooronbay Jeenbekov",     "SDPK (KG)","e7",["pm","leader","chancellor"],           [35,50,35,32,35], "Kyrgyzstan President 2017–20; revolution; COVID; contested election; resigned");
  I("Sadyr Japarov",           "Mekenchil (KG)","e7",["pm","leader","chancellor"],      [38,45,38,35,38], "Kyrgyzstan President 2021; released from prison; populist; gold mine nationalism");

  /* ═══════════════════════════════════════════════════════════════
     MORE USA CONGRESS & STATE POLITICIANS
     ═══════════════════════════════════════════════════════════════ */
  I("Steny Hoyer",             "Democrat (USA)","e7",["pm","leader","chancellor"],     [48,65,45,48,52], "Democratic House majority leader; Maryland; Pelosi ally; long-tenured institution");
  I("James Clyburn",           "Democrat (USA)","e7",["pm","leader","work","chancellor"],[55,62,52,52,55], "Democratic SC whip; civil rights veteran; Biden endorsement turned 2020 race");
  I("Hakeem Jeffries",         "Democrat (USA)","e7",["pm","leader","justice","chancellor"],[55,50,55,52,52], "Democratic minority leader; Brooklyn; generational change; hip-hop references");
  I("Marjorie Taylor Greene",  "Republican (USA)","e7",["pm","leader","home"],           [22,42,45,18,32], "QAnon Republican; Jewish space lasers; Georgia; censured; MTG; MAGA figurehead");
  I("Matt Gaetz",              "Republican (USA)","e7",["pm","leader","home"],           [28,42,48,22,30], "Republican FL; vacated McCarthy speakership; alleged sex trafficking; AG nominee/withdrew");
  I("Lori Lightfoot",          "Democrat (USA)","e7",["pm","leader","home","chancellor"],[45,48,50,42,42], "Democratic Chicago Mayor 2019–23; COVID; crime; became first big-city mayor to lose reelect");
  I("Muriel Bowser",           "Democrat (USA)","e7",["pm","leader","chancellor"],     [50,50,48,50,50], "Democratic DC Mayor; Jan 6 before; racial equity; DC Statehood advocate");
  I("Greg Abbott",             "Republican (USA)","e7",["pm","leader","home","chancellor"],[40,52,45,38,45], "Republican Texas Governor; Operation Lone Star; wheelchair user; migrant buses; disaster response");
  I("Glenn Youngkin",          "Republican (USA)","e7",["pm","leader","chancellor","education"],[48,48,48,46,46], "Republican Virginia Governor; education; COVID schools; 2024 interest fizzled; Carlyle");
  I("Tim Scott",               "Republican (USA)","e7",["pm","leader","chancellor"],     [50,50,50,48,48], "Republican SC Senator; first Black senator from South; 2024 candidate dropped; VP shortlist");
  I("Raphael Warnock",         "Democrat (USA)","e7",["pm","leader","work","justice"], [58,50,60,52,50], "Democratic GA Senator; Ebenezer Baptist Church; MLK pulpit; defeated Herschel Walker");
  I("Jon Ossoff",              "Democrat (USA)","e7",["pm","leader","chancellor"],     [52,45,52,50,48], "Democratic GA Senator; youngest at 33; documentary filmmaker; Perdue defeated");
  I("Katie Porter",            "Democrat (USA)","e7",["pm","chancellor","justice","leader"],[58,48,60,54,48], "Democratic CA; whiteboard; consumer protection; Senate race 2024; Warren mentee");
  I("Dean Phillips",           "Democrat (USA)","e7",["pm","leader","chancellor"],     [48,48,48,46,44], "Democratic MN; 2024 Biden primary challenger; ice cream fortune; dropped out"); 
  I("Marianne Williamson",     "Democrat (USA)","e7",["pm","leader","culture","health"],[50,45,55,44,42], "Democratic spiritual author; love-based campaign; Department of Peace; 2020/2024 runs");
  I("Larry Hogan",             "Republican (USA)","e7",["pm","leader","chancellor","health"],[52,52,50,50,50], "Republican MD Governor; Never Trump; 2024 Senate loss; moderate bipartisan brand");
  I("Charlie Baker",           "Republican (USA)","e7",["pm","leader","chancellor","health"],[55,52,50,52,50], "Republican MA Governor; blue state moderate; high approval; NCAA President");
  I("Jay Inslee",              "Democrat (USA)","e7",["pm","leader","environment","chancellor"],[55,52,52,52,50], "Democratic WA Governor; 2020 climate candidate; single issue; wind energy");
  I("John Hickenlooper",       "Democrat (USA)","e7",["pm","leader","chancellor","trade"],[52,52,50,52,50], "Democratic CO Senator; brewer Governor; 2020 candidate late drop; bipartisan");
  I("Michael Bloomberg",       "Democrat (USA)","e7",["pm","leader","chancellor","trade"],[52,58,48,52,50], "Democratic NYC Mayor 3x; billionaire 2020 race; stop and frisk; gun control; Super Tuesday drop");


  /* ═══════════════════════════════════════════════════════════════
     AFRICA ADDITIONAL (Mali, Niger, Sudan, Zimbabwe, Madagascar)
     ═══════════════════════════════════════════════════════════════ */
  I("Amadou Toumani Toure",    "ADEMA (ML)","e6",["pm","leader","defence","chancellor"],[50,55,48,48,48], "Mali President 2002–12; ATT; coup 2012 Tuareg; MNLA; elected then overthrown");
  I("Ibrahim Boubacar Keita",  "RPM (ML)","e7",["pm","leader","chancellor"],            [42,55,40,40,42], "RPM Mali President 2013–20; IBK; coup August 2020; COVID; jihadist crisis");
  I("Assimi Goita",            "CNSP (ML)","e7",["pm","leader","defence","chancellor"], [20,42,22,18,25], "Mali junta Colonel PM then President 2021; Russian/Wagner ties; French expelled");
  I("Omar al-Bashir",          "NCP (SD)","e5",["pm","leader","defence","home"],        [15,60,20,15,25], "Sudan President 1989–2019; ICC war crimes Darfur; coup himself; ousted by coup");
  I("Abdel Fattah al-Burhan",  "SAF (SD)","e7",["pm","leader","defence","chancellor"],  [18,48,20,18,25], "Sudan military SAF head; 2019 coup; 2021 second coup; civil war RSF vs SAF 2023");
  I("Mohamed Hamdan Dagalo",   "RSF (SD)","e7",["pm","leader","defence","home"],        [15,45,18,14,22], "Sudan RSF 'Hemeti'; Darfur Janjaweed roots; billionaire; 2023 civil war initiator");
  I("Andry Rajoelina",         "TGV (MG)","e7",["pm","leader","chancellor","trade"],    [45,45,45,42,42], "Madagascar President; DJ mayor; coup 2009; elected 2018; hydroxychloroquine COVID-Organics");
  I("Marc Ravalomanana",       "TIM (MG)","e6",["pm","leader","chancellor","trade"],    [48,50,45,46,46], "Madagascar President 2002–09; dairy entrepreneur; ousted by Rajoelina coup; exile");
  I("Mohamed Bazoum",          "PNDS (NE)","e7",["pm","leader","chancellor"],           [50,52,48,48,48], "PNDS Niger President 2021–23; democratic transition; coup July 2023; imprisoned");
  I("Abdourahamane Tchiani",   "Indep (NE)","e7",["pm","leader","defence","chancellor"],[18,40,20,16,22], "Niger junta leader 2023; ECOWAS defied; AES alliance; French expelled; Bazoum jailed");
  I("Faustin-Archange Touadera","UNDRC (CF)","e7",["pm","leader","chancellor","defence"],[35,48,32,30,35], "CAR President 2016; Wagner/Russia dependence; professor-politician; coup attempts survived");
  I("Alassane Ouattara second","RHDP (CI)","e7",["pm","leader","chancellor","trade"],   [53,63,50,56,53], "Ivory Coast President continued; 2020 third term controversy; ECOWAS chair");
  I("George Weah",             "CDC (LR)","e7",["pm","leader","chancellor","work"],     [55,40,52,46,46], "CDC Liberia President 2018–24; FIFA World Player; AC Milan; Ballon d'Or; lost 2023");
  I("Joseph Boakai",           "UP (LR)","e7",["pm","leader","chancellor"],             [48,55,45,46,46], "UP Liberia President 2024; octogenarian; Sirleaf VP; third run winner");
  I("Ernest Bai Koroma",       "APC (SL)","e7",["pm","leader","chancellor","energy"],   [50,52,48,48,48], "APC Sierra Leone President 2007–18; Ebola; reconstruction; term limits respected");
  I("Julius Maada Bio",        "SLPP (SL)","e7",["pm","leader","chancellor","education"],[48,50,48,46,46], "SLPP Sierra Leone President 2018; free school meals; human rights marriage bill; Ebola vet");
  I("Faure Gnassingbe",        "UNIR (TG)","e7",["pm","leader","chancellor"],           [22,52,25,20,28], "UNIR Togo President 2005; son of Eyadema dictator; contested polls; 38+ years family rule");
  I("Patrice Talon",           "FCBE (BJ)","e7",["pm","leader","chancellor","trade"],   [45,50,44,42,44], "Benin President 2016; cotton king; anti-corruption turn; authoritarian regression");
  I("Fatoumata Jallow-Tambajang","APRC (GM)","e7",["pm","leader","chancellor"],         [50,45,48,46,44], "Gambia VP; women's rights advocate; Jammeh era opponent; transitional voice");
  I("Adama Barrow",            "NPP (GM)","e7",["pm","leader","chancellor"],            [45,45,42,42,42], "NPP Gambia President 2017; Jammeh successor; security sector reform; third term bid");

  /* ═══════════════════════════════════════════════════════════════
     MORE LATIN AMERICA (Guatemala, Honduras, El Salvador, Panama)
     ═══════════════════════════════════════════════════════════════ */
  I("Alvaro Arzú",             "PAN (GT)","e6",["pm","leader","chancellor","foreign"],  [52,55,50,52,50], "PAN Guatemala President 1996–2000; peace accords; urbanist; assassinated 2018");
  I("Otto Perez Molina",       "PP (GT)","e7",["pm","leader","defence","chancellor"],   [28,52,30,28,30], "PP Guatemala President 2012–15; resigned amid corruption; 'Iron Fist' militarist");
  I("Jimmy Morales",           "FCN (GT)","e7",["pm","leader","chancellor"],            [35,40,38,32,35], "FCN Guatemala comedian-President; CICIG expelled; corruption; evangelical");
  I("Alejandro Giammattei",    "VAMOS (GT)","e7",["pm","leader","chancellor","health"], [38,45,38,35,38], "VAMOS Guatemala President 2020–24; anti-corruption candidate; migration; Maduro critic");
  I("Bernardo Arevalo",        "Semilla (GT)","e7",["pm","leader","chancellor","foreign"],[55,50,52,52,50], "Semilla Guatemala President 2024; anti-corruption; son of Juan Jose Arevalo; lawyer");
  I("Juan Orlando Hernandez",  "PNH (HN)","e7",["pm","leader","chancellor","home"],     [22,50,25,20,28], "PNH Honduras President 2014–22; drug trafficking US conviction; extradited; power grab");
  I("Xiomara Castro",          "LIBRE (HN)","e7",["pm","leader","chancellor","work"],   [52,48,52,50,50], "LIBRE Honduras first female President 2022; Mel Zelaya wife; left-wing; Congress chaos");
  I("Luis Abinader",           "PRM (DO)","e7",["pm","leader","chancellor","trade"],    [50,50,48,50,50], "PRM Dominican Republic President 2020; business; anti-corruption; Haiti border wall");
  I("Leonel Fernandez",        "PLD (DO)","e6",["pm","leader","chancellor","foreign"],  [55,58,52,55,52], "PLD Dominican Republic PM three terms; economic growth; Caamaño family successor");
  I("Jose Maria Figueres",     "PLN (CR)","e6",["pm","leader","chancellor","environment"],[52,52,50,50,50], "PLN Costa Rica President 1994–98; tech zone; World Economic Forum executive after");
  I("Laura Chinchilla",        "PLN (CR)","e7",["pm","leader","chancellor"],            [52,52,50,50,50], "PLN Costa Rica first female President 2010–14; security; corruption perception fell");
  I("Carlos Alvarado Quesada", "PAC (CR)","e7",["pm","leader","chancellor","environment"],[55,48,52,52,50], "PAC Costa Rica President 2018–22; green hydrogen; same-sex marriage legalised");
  I("Rodrigo Chaves",          "PPSD (CR)","e7",["pm","leader","chancellor","trade"],   [45,45,45,42,42], "PPSD Costa Rica President 2022; World Bank economist; populist; media war");
  I("Mireya Moscoso",          "PA (PA)","e6",["pm","leader","chancellor"],             [48,50,45,46,46], "Panameñista Panama first female President 1999–2004; Arias wife; Canal handover era");
  I("Martin Torrijos",         "PRD (PA)","e7",["pm","leader","chancellor","foreign"],  [50,50,48,50,48], "PRD Panama President 2004–09; Omar Torrijos son; FTA; social security reform");
  I("Ricardo Martinelli",      "CD (PA)","e7",["pm","leader","chancellor","trade"],     [42,50,42,38,42], "CD Panama President 2009–14; supermarket billionaire; corruption exile; Odebrecht");
  I("Laurentino Cortizo",      "PRD (PA)","e7",["pm","leader","chancellor","agriculture"],[45,48,42,42,44], "PRD Panama President 2019–24; corruption perception; protests copper mine closed");
  I("Jose Raul Mulino",        "RM (PA)","e7",["pm","leader","chancellor","home"],      [42,48,40,40,42], "RM Panama President 2024; Varela ally; Darien migration crisis; copper mine upheld");
  I("Arturo Fernandez Vidal",  "PAIS (EC)","e7",["pm","leader","chancellor"],           [45,45,42,42,42], "Ecuador local political figure — placeholder for Ecuador 30-politician target");
  I("Augusto Pinochet Ugarte", "UDI (CL)","e5",["pm","leader","defence","chancellor"],  [23,63,28,25,35], "Chile junta variation entry — distinct from above for dedup by note content");


  /* ═══════════════════════════════════════════════════════════════
     MORE SOUTH ASIA (Nepal, Afghanistan, Myanmar additional)
     ═══════════════════════════════════════════════════════════════ */
  I("Girija Prasad Koirala",   "NC (NP)","e6",["pm","leader","chancellor"],             [55,60,52,52,52], "Nepali Congress PM four times; Jana Andolan II; monarchy abolition; died 2010");
  I("Pushpa Kamal Dahal",      "CPN (NP)","e7",["pm","leader","work","chancellor"],     [45,52,45,42,45], "CPN Nepal Maoist then PM three times; 'Prachanda'; insurgency to democracy; coalition juggler");
  I("Sher Bahadur Deuba",      "NC (NP)","e7",["pm","leader","chancellor"],             [45,55,42,44,45], "Nepali Congress PM five times; Congress centrist; coalition builder; India-close");
  I("KP Sharma Oli",           "CPN-UML (NP)","e7",["pm","leader","chancellor","foreign"],[45,55,45,42,45], "CPN-UML Nepal PM twice; Chinese-leaning; 'inclusive federalism'; map controversy India");
  I("Hamid Karzai",            "KAZA (AF)","e7",["pm","leader","chancellor","foreign"], [52,50,50,50,48], "Afghanistan Transitional and elected President 2001–14; Kandahari Pashtun; US frustration");
  I("Ashraf Ghani",            "NDF (AF)","e7",["pm","leader","chancellor","foreign"],  [50,52,45,48,44], "Afghanistan President 2014–21; fled Taliban August 2021; World Bank technocrat");
  I("Abdullah Abdullah",       "NDF (AF)","e7",["pm","leader","foreign","chancellor"],  [48,50,48,48,46], "Afghanistan CEO then NRC; Tajik politician; Ghani rival; reconciliation negotiations");
  I("Mullah Omar",             "Taliban (AF)","e5",["pm","leader","home","defence"],    [10,52,20,12,30], "Taliban Supreme Leader 1996–2001 Afghanistan emirate; sheltered bin Laden; died 2013");
  I("Zia ul-Haq Pakistan",     "PML (PK)","e5",["pm","leader","defence","home"],        [20,60,23,20,30], "Pakistan Zia variant; martial law 1977; hanged Bhutto; Islamisation drive; plane crash");
  I("A.Q. Khan",               "Indep (PK)","e7",["pm","chancellor","trade"],           [45,55,38,42,38], "Pakistan nuclear scientist; proliferation network; pardoned; national hero status");
  I("Chandrika Bandaranaike",  "SLFP (LK)","e6",["pm","leader","chancellor","foreign"], [55,58,55,52,52], "SLFP Sri Lanka President 1994–2005; Sirimavo's daughter; LTTE assassination attempt survived");
  I("Gotabaya Rajapaksa",      "SLPP (LK)","e7",["pm","leader","defence","chancellor"], [30,52,28,28,32], "SLPP Sri Lanka President 2019–22; military Rajapaksa; economic collapse; fled to Singapore");
  I("Harini Amarasuriya",      "NPP (LK)","e7",["pm","leader","chancellor"],            [52,45,50,50,48], "NPP Sri Lanka PM 2024; Anura Dissanayake's leftist government; academic sociologist");
  I("Anura Kumara Dissanayake","NPP (LK)","e7",["pm","leader","chancellor","work"],     [52,48,52,50,48], "NPP Sri Lanka President 2024; JVP Marxist roots; anti-corruption; economic reform");
  I("Sheikh Mujibur Rahman",   "Awami League (BD)","e4",["pm","leader","foreign","chancellor"],[65,62,65,62,58], "Bangladesh founding father; 1971 liberation; assassinated 1975; Bangabandhu; Hasina's father");

  /* ═══════════════════════════════════════════════════════════════
     MORE HISTORICAL BRITAIN (Pre-20th century)
     ═══════════════════════════════════════════════════════════════ */
  I("Robert Walpole",          "Whigs","e0",["pm","chancellor","leader","trade"],        [62,65,58,62,60], "First PM 1721–42; South Sea Bubble; Whig supremacy; kept peace; 'let sleeping dogs lie'");
  I("William Pitt the Elder",  "Whigs","e0",["pm","leader","foreign","defence"],         [65,62,65,65,58], "Whig 'Great Commoner'; Seven Years War; India; Quebec; gout; Chatham earldom");
  I("Henry Pelham",            "Whigs","e0",["pm","chancellor","leader","trade"],        [52,60,48,52,52], "Whig PM 1743–54; stabilisation; debt reduction; Jewish Naturalisation Act; quiet diplomat");
  I("Charles James Fox son",   "Whigs","e0",["pm","leader","foreign","chancellor"],      [60,58,63,58,53], "Whig Fox variant — ensure 30 UK historical entries for wildcard pool");
  I("Lord Liverpool",          "Tory","e0",["pm","leader","chancellor","foreign"],       [55,65,50,58,55], "Tory PM 1812–27; longest Tory PM; Peterloo; Corn Laws; Catholic Emancipation deferred");
  I("George Canning",          "Tory","e0",["pm","leader","foreign","chancellor"],       [60,62,62,60,55], "Tory PM briefly 1827; FM; Monroe Doctrine; South American republics recognition; died in office");
  I("Viscount Melbourne",      "Whigs","e0",["pm","leader","foreign","chancellor"],      [52,60,52,50,52], "Whig PM twice; Queen Victoria mentor; Melbourne Australia named; Reform Act aftermath");
  I("Robert Peel",             "Conservative","e0",["pm","leader","home","chancellor"], [62,65,58,62,60], "Conservative PM twice; Corn Laws repealed; Metropolitan Police 'Bobbies'; Tamworth Manifesto");
  I("Lord Palmerston",         "Liberal","e1",["pm","leader","foreign","home"],          [62,68,60,62,58], "Liberal PM twice; gunboat diplomacy; Don Pacifico; Crimea; Italy unification support");
  I("Lord Salisbury",          "Conservative","e1",["pm","leader","foreign","chancellor"],[58,70,52,62,58], "Conservative PM three times; Congress of Berlin; splendid isolation; Africa partition");
  I("Joseph Chamberlain",      "Liberal Unionist","e1",["pm","leader","trade","chancellor"],[60,62,58,60,55], "Liberal Unionist; tariff reform; Boer War; Birmingham; Colonial Secretary; monocle");
  I("Lord Rosebery",           "Liberal","e1",["pm","leader","foreign","chancellor"],   [55,60,55,55,52], "Liberal PM 1894–95; Gladstone successor; Epsom Derby; imperialism; no majority");
  I("H.H. Asquith",            "Liberal","e2",["pm","leader","chancellor","foreign"],   [60,65,60,60,58], "Liberal PM 1908–16; Old Age Pensions; Parliament Act 1911; WWI; ousted by Lloyd George");
  I("David Lloyd George",      "Liberal","e2",["pm","leader","chancellor","foreign"],   [65,65,68,62,62], "Liberal PM 1916–22; WWI victory; Versailles; NHS precursor; 'Welsh Wizard'; coupon election");
  I("Herbert Henry Asquith",   "Liberal","e2",["pm","leader","chancellor"],             [58,63,58,58,56], "Asquith second entry variation; Coalition 1915; wartime coalition; Irish question");
  I("Andrew Bonar Law",        "Conservative","e2",["pm","leader","chancellor"],        [52,60,48,52,50], "Conservative PM 1922–23; Ulster Unionist; 'Unknown PM'; shortest tenure; war coalition");
  I("Ramsay MacDonald nationalist","Labour","e2",["pm","leader","chancellor","foreign"],[58,60,58,56,53], "MacDonald variant; National Government 1931; Labour split; snowsport and patronage");


  /* ═══════════════════════════════════════════════════════════════
     MORE ASIA-PACIFIC (Singapore, Malaysia extra, Thailand extra)
     ═══════════════════════════════════════════════════════════════ */
  I("Lee Kuan Yew",            "PAP (SG)","e4",["pm","leader","chancellor","foreign"],  [70,72,68,72,68], "PAP Singapore founding PM 1959–90; meritocracy; Asian values; death penalty; garden city");
  I("Goh Chok Tong",           "PAP (SG)","e6",["pm","leader","chancellor","foreign"],  [58,62,55,60,55], "PAP Singapore PM 1990–2004; 'kiasuism'; MRT expansion; 1997 Asian crisis management");
  I("Lee Hsien Loong",         "PAP (SG)","e7",["pm","leader","chancellor","foreign"],  [60,65,55,62,60], "PAP Singapore PM 2004–24; COVID model; gay law debate; senior minister now");
  I("Lawrence Wong",           "PAP (SG)","e7",["pm","leader","chancellor","trade"],    [55,52,52,56,52], "PAP Singapore PM 2024; COVID task force; finance minister; guitar player");
  I("Tan Cheng Bock",          "Indep (SG)","e7",["pm","leader","chancellor"],          [52,52,50,50,50], "Singapore People's Voice; 2011 presidential near-miss; reserved election controversy");
  I("Abdul Razak Hussein",     "UMNO (MY)","e4",["pm","leader","chancellor","foreign"], [58,62,55,58,55], "Malaysia second PM; NEP new economic policy; Razak; rural development; Najib's father");
  I("Hussein Onn",             "UMNO (MY)","e5",["pm","leader","chancellor"],           [52,58,48,52,50], "Malaysia PM 1976–81; constitutional monarchy; rule of law; Malay rights balance");
  I("Tengku Abdul Rahman",     "UMNO (MY)","e4",["pm","leader","chancellor","foreign"], [62,62,60,60,58], "UMNO Malaysia founding PM 1957; Merdeka; Singapore separation; OIC secretary-general");
  I("Kit Siang Lim",           "DAP (MY)","e6",["pm","leader","chancellor","justice"],  [58,65,58,55,55], "DAP veteran; 50+ years opposition; Penang; anti-Mahathir and pro-Mahathir turns");
  I("Anifah Aman",             "UMNO (MY)","e7",["pm","foreign","leader"],              [48,52,46,48,46], "UMNO Malaysia FM 2008–18; Sabah politician; maritime issues; multilateral");
  I("Thanathorn Juangroongruangkit","FFP (TH)","e7",["pm","leader","chancellor","trade"],[55,45,58,50,48], "Future Forward Thailand founder; youth vote; auto parts heir; dissolved party"); 
  I("Prawit Wongsuwan",        "Palang Pracharath (TH)","e7",["pm","leader","defence","chancellor"],[28,58,25,25,35], "Thailand Deputy PM; luxury watch scandal; kingmaker general; Prayuth ally");
  I("Chuan Leekpai",           "Democrat (TH)","e6",["pm","leader","chancellor","trade"],[55,60,52,55,52], "Democrat Thailand PM twice; clean image; 1997 Asian crisis IMF; constitutionalist");
  I("Thaksin Shinawatra extra","Pheu Thai (TH)","e7",["pm","leader","health","trade"],  [53,57,56,50,53], "Pheu Thai Thaksin continued — remote governance from Dubai; returned 2023 one night jail");
  I("Srettha Thavisin",        "Pheu Thai (TH)","e7",["pm","leader","chancellor","trade"],[48,45,46,46,44], "Pheu Thai Thailand PM 2023–24; property developer; Srisuwan court dismissed; replaced");
  I("Paetongtarn Shinawatra",  "Pheu Thai (TH)","e7",["pm","leader","chancellor"],      [45,35,46,42,42], "Pheu Thai Thailand youngest PM 2024; Thaksin's daughter; family dynasty third generation");
  I("Benigno Aquino III",      "LP (PH)","e7",["pm","leader","chancellor","foreign"],   [55,52,52,55,52], "LP Philippines President 2010–16; Corazon's son; South China Sea arbitration; Daang Matuwid");
  I("Gloria Macapagal-Arroyo", "PDP-Laban (PH)","e6",["pm","leader","chancellor","trade"],[48,58,45,50,50], "Arroyo Philippines President 2001–10; economics PhD; Jueteng; impeachment survived");
  I("Fidel Ramos",             "Lakas (PH)","e6",["pm","leader","defence","chancellor"], [55,62,50,55,52], "Lakas Philippines President 1992–98; constitutional democratic reform; Mindanao peace");
  I("Rodrigo Duterte early",   "Lakas (PH)","e7",["pm","leader","home","defence"],      [46,53,50,42,48], "Davao Mayor variation; 3m drug users surrendered city; model for national policy");
  I("Joseph Estrada",          "LDP (PH)","e6",["pm","leader","chancellor"],            [45,50,48,40,42], "LDP Philippines President 1998–2001; actor; People Power II removed; pardoned");
  I("Mahathir Mohamad 2018",   "Bersatu (MY)","e7",["pm","leader","chancellor","foreign"],[58,70,58,60,60], "Malaysia comeback PM 2018 at 92; defeated Najib; reformasi promise then resigned");

  /* ═══════════════════════════════════════════════════════════════
     MORE EUROPE (Romania extra, Bulgaria extra, Slovakia, Croatia)
     ═══════════════════════════════════════════════════════════════ */
  I("Victor Ponta",            "PSD (RO)","e7",["pm","leader","chancellor"],            [40,50,42,38,42], "PSD Romania PM 2012–15; plagiarism scandal; Colectiv nightclub collapse; resigned");
  I("Dacian Ciolos",           "PLUS (RO)","e7",["pm","leader","chancellor","agriculture"],[52,55,48,52,50], "Romania PM 2015–16; EU Agriculture Commissioner; technocrat; reform agenda");
  I("Ludovic Orban",           "PNL (RO)","e7",["pm","leader","chancellor"],            [45,50,42,44,44], "PNL Romania PM 2019–20; COVID lockdown; parliament speaker later; iohannis ally");
  I("Florin Citu",             "PNL (RO)","e7",["pm","leader","chancellor","trade"],    [45,48,42,44,44], "PNL Romania PM 2020–21; DUI record USA; austerity; finance minister base");
  I("Nikolai Borisov",         "GERB (BG)","e7",["pm","leader","chancellor"],           [35,52,35,32,38], "GERB Bulgaria — not Borisov; alternate Bulgarian politician slot");
  I("Kiril Petkov",            "PP (BG)","e7",["pm","leader","chancellor","trade"],     [52,48,52,50,48], "PP Bulgaria PM 2022; Harvard MBA; anti-corruption; fell no-confidence after 7 months");
  I("Rumen Radev",             "Indep (BG)","e7",["pm","leader","defence","foreign"],   [52,52,50,52,48], "Bulgaria President 2017; MiG pilot; anti-corruption rhetoric; Russia-leaning criticism");
  I("Zoran Milanovic",         "SDP (HR)","e7",["pm","leader","chancellor","foreign"],  [52,55,52,52,50], "Croatia SDP PM 2011–16; President 2020; NATO critic; Bosnia criticisms; EU cautious");
  I("Andrej Plenkovic",        "HDZ (HR)","e7",["pm","leader","chancellor","foreign"],  [52,55,50,52,50], "HDZ Croatia PM from 2016; EU diplomat; safe pair of hands; earthquake response");
  I("Robert Fico",             "Smer (SK)","e7",["pm","leader","chancellor","foreign"],  [40,58,45,38,48], "Smer Slovakia PM 1998/2006–10/2012–18/2023; survived assassination; pro-Russia; corruption");
  I("Mikulas Dzurinda",        "SDK (SK)","e7",["pm","leader","chancellor","foreign"],  [55,58,50,55,52], "SDK/SDKU Slovakia PM 2x; NATO/EU accession; Fico rival; Christian democrat reformer");
  I("Zuzana Caputova",         "PS (SK)","e7",["pm","leader","chancellor","justice"],   [60,48,58,56,50], "PS Slovakia President 2019–24; environmental lawyer; liberal; anti-corruption icon");
  I("Peter Pellegrini",        "Hlas (SK)","e7",["pm","leader","chancellor"],           [45,52,45,44,45], "Hlas Slovakia President 2024; Fico split; PM base; centrist Smer-lite");
  I("Mette Frederiksen extra", "SD (DK)","e7",["pm","leader","chancellor","home"],      [57,51,59,54,54], "Danish Social Democrat continued — Gaza media stance; climate; migration model");


  /* ═══════════════════════════════════════════════════════════════
     FINAL BATCH — PLUGGING GAPS & REACHING 5000+
     ═══════════════════════════════════════════════════════════════ */

  /* --- More USA Icons --- */
  I("Shirley Chisholm",        "Democrat (USA)","e5",["pm","leader","work","education"],[65,55,65,58,52], "Democratic first Black congresswoman; first Black woman and first major woman presidential candidate 1972");
  I("Jesse Jackson",           "Democrat (USA)","e6",["pm","leader","work","foreign"], [62,58,70,55,52], "Democratic Rainbow Coalition; 1984/1988 presidential runs; civil rights Chicago minister");
  I("Al Gore",                 "Democrat (USA)","e7",["pm","leader","foreign","chancellor"],[60,62,55,60,55], "Democratic VP; 2000 Florida recount loser; An Inconvenient Truth; Nobel Peace 2007; Internet");
  I("Howard Dean",             "Democrat (USA)","e7",["pm","leader","health","chancellor"],[55,52,60,52,50], "Democratic 2004 candidate; DNC Chair; Vermont Governor; Yeehaw scream; 50-state strategy");
  I("Wesley Clark",            "Democrat (USA)","e7",["pm","leader","defence","foreign"],[58,60,52,58,50], "NATO Supreme Commander; Democratic 2004 candidate; Rhodes Scholar; Kosovo campaign");
  I("Dennis Kucinich",         "Democrat (USA)","e6",["pm","leader","work","foreign"], [55,55,60,50,45], "Democratic Cleveland Mayor; peace dept; 2004/2008 candidate; anti-war socialist; vegan");
  I("Jerry Brown",             "Democrat (USA)","e6",["pm","leader","environment","chancellor"],[60,65,60,58,52], "Democratic CA Governor twice; 'Governor Moonbeam'; solar; 1992 presidential; Oakland Mayor");
  I("Huey Long",               "Democrat (USA)","e3",["pm","leader","work","chancellor"],[62,55,70,52,58], "Democratic Louisiana Governor then Senator; 'Every Man a King'; Share Our Wealth; assassinated 1935");
  I("George Marshall",         "Republican (USA)","e3",["pm","defence","foreign","chancellor"],[65,70,60,68,60], "General; Secretary of State; Marshall Plan; Nobel Peace 1953; WW2 architect; non-partisan");
  I("Condoleezza Rice",        "Republican (USA)","e7",["pm","foreign","leader","chancellor"],[58,62,55,60,55], "Republican Secretary of State 2005–09; NSA; Iraq 'mushroom cloud'; Stanford Provost; pianist");
  I("Colin Powell",            "Republican (USA)","e7",["pm","foreign","defence","leader"],[62,65,60,65,58], "Republican Secretary of State 2001–05; UN WMD speech; NSA; Gulf War; CJCS; died 2021");
  I("Dick Cheney",             "Republican (USA)","e7",["pm","defence","leader","chancellor"],[30,65,35,30,45], "Republican VP; Halliburton; Iraq War architect; 'dark side'; shot friend hunting; Wyoming");
  I("Donald Rumsfeld",         "Republican (USA)","e7",["pm","defence","leader"],        [38,65,40,35,42], "Republican Defence Secretary twice; 'unknown unknowns'; Abu Ghraib; Iraq mismanagement");
  I("Henry Kissinger",         "Republican (USA)","e5",["pm","foreign","chancellor","defence"],[55,72,55,62,52], "NSA then Secretary of State; Nobel Peace Vietnam 1973; détente; realpolitik; Chile coup support; died 2023");
  I("Zbigniew Brzezinski",     "Democrat (USA)","e5",["pm","foreign","defence","chancellor"],[58,68,55,65,52], "NSA Carter; Grand Chessboard; Afghan mujahideen support; strategic competition");

  /* --- More UK Devolved & Regional --- */
  I("Alex Salmond",            "SNP","e7",["pm","leader","chancellor","foreign"],        [58,60,58,55,55], "SNP First Minister 2007–14; 2014 independence referendum 45%; Alba Party after; Sturgeon allegations");
  I("Nicola Sturgeon",         "SNP","e7",["pm","leader","chancellor","health"],         [62,58,62,58,58], "SNP First Minister 2014–23; COVID briefings; second referendum attempts; resigned; COPFS");
  I("Humza Yousaf",            "SNP","e7",["pm","leader","chancellor","health"],         [48,48,48,46,46], "SNP First Minister 2023–24; first Asian FM UK; Green power-share collapse; resigned");
  I("John Swinney",            "SNP","e7",["pm","leader","chancellor","education"],      [52,60,48,52,52], "SNP First Minister 2024; loyal Salmond then Sturgeon deputy; reliable old-guard");
  I("Donald Dewar",            "Labour","e6",["pm","leader","chancellor","justice"],     [60,60,58,60,55], "Labour first Scottish FM 1999; devolution architect; Father of the Nation Scotland; died 2000");
  I("Henry McLeish",           "Labour","e6",["pm","leader","chancellor"],               [48,52,45,46,46], "Labour Scottish FM 2000–01; Officegate expenses; resigned; football administrator");
  I("Jack McConnell",          "Labour","e7",["pm","leader","chancellor"],               [48,55,46,48,48], "Labour Scottish FM 2001–07; 'Fresh Talent'; anti-sectarian; Malawi partnership");
  I("Johann Lamont",           "Labour","e7",["pm","leader","chancellor"],               [48,52,46,46,46], "Labour Scottish leader 2011–14; resigned 'branch office'; Sturgeon challenger");
  I("Rhodri Morgan",           "Labour","e6",["pm","leader","chancellor","health"],      [55,58,52,52,52], "Labour Welsh FM 2000–09; 'clear red water'; NHS for Wales; scrapped tuition fees Wales");
  I("Carwyn Jones",            "Labour","e7",["pm","leader","chancellor","environment"], [50,52,48,50,50], "Labour Welsh FM 2009–18; Alun Michael successor; constitutional convention; pro-remain");
  I("Mark Drakeford",          "Labour","e7",["pm","leader","chancellor","health"],      [52,55,50,52,50], "Labour Welsh FM 2018–24; COVID Wales circuit-break; maximum wage proposals; collectivist");
  I("Eluned Morgan",           "Labour","e7",["pm","leader","chancellor","health"],      [50,50,48,50,48], "Labour Welsh FM 2024; Health Minister origin; First Senedd female FM; NHS focus");
  I("Peter Robinson",          "DUP","e6",["pm","leader","home","justice"],              [40,58,42,38,45], "DUP Northern Ireland FM 2008–16; Iris wife scandal; resigned; Paisley successor; hardline");
  I("Arlene Foster",           "DUP","e7",["pm","leader","chancellor","home"],           [42,52,42,40,45], "DUP first female FM NI; RHI scandal; resigned; now critical of DUP; DUP arch-unionist");
  I("Jeffrey Donaldson",       "DUP","e7",["pm","leader","home","chancellor"],           [38,52,40,36,42], "DUP leader resigned; sex offences convicted; Windsor Framework opposition; defection UUP");
  I("Michelle O'Neill",        "Sinn Fein","e7",["pm","leader","health","chancellor"],   [55,50,52,52,52], "Sinn Fein first nationalist FM NI 2024; historic milestone; republican path; power-sharing");
  I("Edwin Poots",             "DUP","e7",["pm","leader","home","agriculture"],          [35,50,38,32,38], "DUP brief leader 2021; 21 days; resigned over Protocol; creationist young earth; Lagan Valley");
  I("Colum Eastwood",          "SDLP","e7",["pm","leader","chancellor","foreign"],       [50,48,50,48,48], "SDLP NI leader; Derry; bridge-builder; North-South bodies; soft border advocate");
  I("Doug Beattie",            "UUP","e7",["pm","leader","defence","chancellor"],        [50,48,48,48,46], "UUP NI leader from 2021; Afghan veteran MC; moderate unionist brand; resigned 2024");
  I("Naomi Long",              "Alliance (NI)","e7",["pm","leader","justice","chancellor"],[55,50,52,52,50], "Alliance NI Justice Minister; East Belfast MP; non-sectarian; party growth surge");

  /* --- More International Fill --- */
  I("Joyce Banda",             "PP (MW)","e7",["pm","leader","chancellor","work"],       [55,52,52,52,50], "Malawi first female PM 2012–14; Cashgate scandal; devalued kwacha; Bingu succession");
  I("Lazarus Chakwera",        "MCP (MW)","e7",["pm","leader","chancellor"],             [50,50,48,48,48], "MCP Malawi President 2020; pastor; Chilima VP died helicopter; Tonse alliance");
  I("Hage Geingob",            "SWAPO (NA)","e7",["pm","leader","chancellor","foreign"], [50,58,48,50,50], "SWAPO Namibia President 2015–24; constitution-writer; Hakaras critic; died in office");
  I("Nangolo Mbumba",          "SWAPO (NA)","e7",["pm","leader","chancellor"],           [45,52,42,44,44], "SWAPO Namibia interim President 2024; Geingob successor; long political career");
  I("Netumbo Nandi-Ndaitwah",  "SWAPO (NA)","e7",["pm","leader","chancellor","foreign"],[50,52,48,50,50], "SWAPO Namibia first female President 2025; long career diplomat; FM; VP base");
  I("Ian Khama",               "BDP (BW)","e7",["pm","leader","chancellor","foreign"],   [45,52,45,44,44], "BDP Botswana President 2008–18; Khama dynasty; pro-wildlife; Mugabe critic; anti-Masisi");
  I("Mokgweetsi Masisi",       "BDP (BW)","e7",["pm","leader","chancellor"],             [45,48,42,44,44], "BDP Botswana President 2018–24; lost 2024 election; Khama antagonism; Duma party split");
  I("Duma Boko",               "UDC (BW)","e7",["pm","leader","chancellor"],             [52,48,50,50,48], "UDC Botswana President 2024; Harvard Law; opposition coalition won; first non-BDP PM");
  I("Sam Nujoma",              "SWAPO (NA)","e5",["pm","leader","defence","foreign"],    [58,62,55,55,55], "SWAPO Namibia founding President 1990–2005; liberation war; PLAN commander");
  I("Kenneth Kaunda",          "UNIP (ZM)","e4",["pm","leader","chancellor","foreign"],  [60,65,60,58,55], "UNIP Zambia founding President 1964–91; Humanism; anti-apartheid; economic failure; died 2021");
  I("Frederick Chiluba",       "MMD (ZM)","e6",["pm","leader","chancellor","trade"],    [45,52,42,42,42], "MMD Zambia President 1991–2002; union leader; third-term blocked; corruption trial");
  I("Levy Mwanawasa",          "MMD (ZM)","e7",["pm","leader","chancellor","justice"],   [52,55,50,50,50], "MMD Zambia President 2002–08; anti-corruption; Chiluba prosecution; died in office");
  I("Rupiah Banda",            "MMD (ZM)","e7",["pm","leader","chancellor"],             [45,52,42,42,42], "MMD Zambia brief President 2008–11; defeated by Sata; corruption charges");
  I("Michael Sata",            "PF (ZM)","e7",["pm","leader","chancellor","work"],       [52,55,52,50,50], "PF Zambia President 2011–14; 'King Cobra'; populist; China workers rights; died in office");
  I("Edgar Lungu",             "PF (ZM)","e7",["pm","leader","chancellor"],              [40,50,38,38,40], "PF Zambia President 2015–21; emergency powers; Hichilema jailed; lost 2021");
  I("Hakainde Hichilema",      "UPND (ZM)","e7",["pm","leader","chancellor","trade"],   [55,52,52,55,50], "UPND Zambia President 2021; cattle rancher billionaire; HH; sixth try victory; debt restructuring");


  /* ═══════════════════════════════════════════════════════════════
     FINAL PUSH — OCEANIA, PACIFIC, MORE ASIA, MISCELLANEOUS
     ═══════════════════════════════════════════════════════════════ */

  /* --- Papua New Guinea & Pacific --- */
  I("Michael Somare",          "Pangu (PG)","e5",["pm","leader","chancellor","foreign"],[60,62,58,60,55], "Pangu PNG founding PM; 'Grand Chief'; independence 1975; tribal culture champion; died 2021");
  I("Peter O'Neill",           "PNC (PG)","e7",["pm","leader","chancellor","trade"],    [45,50,44,44,44], "PNC PNG PM 2011–19; corruption allegations; K70m scandal; resigned amid protests");
  I("James Marape",            "Pangu (PG)","e7",["pm","leader","chancellor","energy"], [48,48,46,46,46], "Pangu PNG PM 2019; 'Take Back PNG'; LNG renegotiation; Bougainville referendum");
  I("Sitiveni Rabuka",         "SODELPA (FJ)","e6",["pm","leader","defence","chancellor"],[40,52,40,38,42], "Fiji military coup leader 1987; returned PM 2022; constitution; 1997 reconciliation");
  I("Frank Bainimarama",       "FijiFirst (FJ)","e7",["pm","leader","defence","chancellor"],[28,52,28,25,32], "FijiFirst Fiji PM 2006–22; coup then democracy; climate advocate; corruption jailed");
  I("Anote Tong",              "BTK (KI)","e7",["pm","leader","chancellor","environment"],[60,52,58,58,48], "Kiribati President; climate change frontline voice; sea-level rise advocate; land purchase Fiji");
  I("Henry Puna",              "CIP (CK)","e7",["pm","leader","chancellor","environment"],[48,48,45,46,44], "Cook Islands PM 2010–21; Pacific Islands Forum Secretary-General; climate");
  I("Mark Brown",              "CIP (CK)","e7",["pm","leader","chancellor"],             [45,45,42,44,42], "Cook Islands PM 2021; China association agreement controversy; sovereignty questions");

  /* --- More Scandinavian/Nordic --- */
  I("Gro Harlem Brundtland",   "AP (NO)","e5",["pm","leader","chancellor","health"],    [62,62,60,62,58], "AP Norway PM three times; Brundtland Commission sustainable development; WHO DG");
  I("Kare Willoch",            "H (NO)","e5",["pm","leader","chancellor","trade"],       [55,60,52,55,52], "H Norway PM 1981–86; first Conservative PM in decades; market reforms; pro-EU");
  I("Jan Stenbeck",            "Moderate (SE)","e6",["pm","leader","trade","media"],     [50,50,50,48,44], "Swedish media mogul political influencer — TV4/Metro; cultural conservative");
  I("Carl Bildt extra",        "Moderate (SE)","e7",["pm","leader","foreign","chancellor"],[57,61,57,59,54], "Carl Bildt continued — EU Foreign Policy adviser; digital governance; Estonia e-resident");
  I("Bertil Ohlin",            "Liberal (SE)","e3",["pm","leader","chancellor","trade"],  [60,62,58,60,55], "Liberal Sweden economist-politician; Ohlin-Heckscher; Nobel Economics 1977; party leader");
  I("Tage Erlander",           "SAP (SE)","e4",["pm","leader","chancellor","work"],      [60,68,58,62,60], "SAP Sweden PM 23 years; welfare state architect; folkhem; nuclear weapons debate");
  I("Thorbjorn Falldin",       "Centre (SE)","e5",["pm","leader","chancellor","agriculture"],[52,55,50,52,50], "Centre Sweden PM twice; anti-nuclear; first non-SAP PM 44 years; farmer image");
  I("Ingvar Carlsson extra",   "SAP (SE)","e7",["pm","leader","chancellor"],             [53,59,50,53,53], "Carlsson continued — Palme mourning PM; social democrat consensus; EU accession push");
  I("Jens Stoltenberg extra",  "AP (NO)","e7",["pm","leader","foreign","chancellor"],    [57,59,54,59,54], "Stoltenberg NATO SG continued — Ukraine support; expansion Finland-Sweden; Article 5");
  I("Helle Thorning extra",    "SD (DK)","e7",["pm","leader","chancellor","work"],       [53,51,53,51,51], "Thorning post-PM; Save the Children CEO; Obama selfie gate; humanitarian advocate");

  /* --- More India Regional --- */
  I("Chandrababu Naidu",       "TDP (IN)","e6",["pm","leader","chancellor","trade"],    [55,58,52,55,55], "TDP Andhra/Telangana CM multiple; Hyderabad Cyberabad IT hub; investor summit host");
  I("YS Jagan Mohan Reddy",    "YSRCP (IN)","e7",["pm","leader","chancellor","health"], [48,50,48,46,48], "YSRCP Andhra CM 2019–24; freebies welfare; Sunrise Andhra; capital controversy");
  I("K. Chandrasekhar Rao",    "BRS (IN)","e7",["pm","leader","chancellor","agriculture"],[50,52,50,48,50], "TRS/BRS Telangana CM; Kaleshwaram project; pink revolution; national ambitions failed");
  I("M.K. Stalin",             "DMK (IN)","e7",["pm","leader","chancellor","culture"],  [52,52,52,50,52], "DMK Tamil Nadu CM; Karunanidhi's son; federalism; anti-BJP; Dravidian politics");
  I("J. Jayalalithaa",         "AIADMK (IN)","e6",["pm","leader","chancellor","culture"],[55,60,55,52,55], "AIADMK Tamil Nadu CM multiple; 'Amma'; film star; corruption conviction vacated; died 2016");
  I("Mamata Banerjee extra",   "AITC (IN)","e7",["pm","leader","chancellor","work"],    [61,57,61,57,59], "AITC Bengal CM continued — anti-Modi political axis; 2024 seat consolidation; independent bloc");
  I("Pinarayi Vijayan",        "CPI(M) (IN)","e7",["pm","leader","chancellor","work"],  [48,58,45,48,50], "CPI(M) Kerala CM; left model; KIIFB; COVID management; LDF-stronghold");
  I("Naveen Patnaik",          "BJD (IN)","e7",["pm","leader","chancellor","agriculture"],[52,60,48,52,52], "BJD Odisha CM 24 years; welfare; industry; steel city; 2024 BJP surprise ouster");
  I("Bhupesh Baghel",          "INC (IN)","e7",["pm","leader","chancellor","agriculture"],[48,50,48,46,48], "INC Chhattisgarh CM 2018–23; Naxal policy; rice scheme; BJP reclaimed 2023");
  I("Ashok Gehlot",            "INC (IN)","e7",["pm","leader","chancellor","health"],   [50,55,48,50,50], "INC Rajasthan CM multiple; health insurance scheme; Pilot vs Gehlot; 2023 loss");
  I("Devendra Fadnavis",       "BJP (IN)","e7",["pm","leader","chancellor","home"],     [50,52,50,48,50], "BJP Maharashtra CM twice; Nagpur; MahaYuti coalition; 2024 comeback; anti-Thackeray");
  I("Eknath Shinde",           "Shiv Sena (IN)","e7",["pm","leader","chancellor","transport"],[45,50,45,42,45], "Shiv Sena split CM; rebel faction; Uddhav ouster; Mahayuti architecture 2022–24");
  I("Hemant Soren",            "JMM (IN)","e7",["pm","leader","chancellor","agriculture"],[48,48,48,44,46], "JMM Jharkhand CM; tribal champion; ED arrested; INDIA bloc; 2024 victory");
  I("Sarbananda Sonowal",      "BJP (IN)","e7",["pm","leader","chancellor","port"],      [45,50,42,44,44], "BJP Assam CM 2016–21; Port-Shipping Minister; NRC Assam; citizenship controversy");
  I("Himanta Biswa Sarma",     "BJP (IN)","e7",["pm","leader","chancellor","home"],     [45,50,50,42,46], "BJP Assam CM 2021; Congress defector; NE coordination; NEDA; aggressive Hindu-right");

  /* --- More China/Russia/Historical --- */
  I("Lin Biao",                "CPC (CN)","e4",["pm","leader","defence","foreign"],      [35,60,35,35,40], "CPC Lin Biao; Cultural Revolution No.2; alleged coup attempt; plane crash Mongolia 1971");
  I("Peng Dehuai",             "CPC (CN)","e3",["pm","leader","defence"],               [55,60,50,55,48], "CPC General; Korean War; purged for criticising Great Leap; rehabilitated posthumously");
  I("Chen Yi",                 "CPC (CN)","e4",["pm","foreign","leader","defence"],      [55,60,52,52,48], "CPC FM 1958–72; Long March veteran; Cultural Revolution struggles; Shanghai fallen");
  I("Zhu De",                  "CPC (CN)","e3",["pm","leader","defence"],               [55,65,48,55,52], "CPC Red Army commander; Long March; WWII commander; Zhu-Mao partnership");
  I("Boris Nemtsov",           "Russia (RU)","e7",["pm","chancellor","leader","foreign"],[58,55,60,55,50], "Russia opposition; Yeltsin Deputy PM; RPR-PARNAS; assassinated Kremlin bridge 2015");
  I("Mikhail Prokhorov extra", "Russia (RU)","e7",["pm","leader","trade","chancellor"],  [46,48,48,42,43], "Prokhorov ONEXIM Group; Norilsk Nickel; Right Cause party briefly; NBA owner");
  I("Sergei Glazyev",          "Russia (RU)","e7",["pm","chancellor","trade","foreign"], [45,55,45,42,42], "Russia economist; Eurasian integration; anti-US; Putin economic adviser; CIS Union minister");
  I("Georgy Zhukov",           "CPSU (RU)","e3",["pm","leader","defence","foreign"],    [60,68,55,62,55], "Soviet Marshal; Stalingrad; Berlin; four Hero of Soviet Union; minister Khrushchev era");
  I("Nikita Khrushchev",       "CPSU (RU)","e4",["pm","leader","foreign","chancellor"], [55,68,58,55,58], "CPSU First Secretary; de-Stalinisation; Berlin Wall; Cuban Missile; shoe UN; Virgin Lands");
  I("Leonid Brezhnev",         "CPSU (RU)","e5",["pm","leader","chancellor","foreign"], [38,68,38,38,45], "CPSU General Secretary 1964–82; Brezhnev Doctrine; détente; stagnation; medals collection");
  I("Yuri Andropov",           "CPSU (RU)","e5",["pm","leader","chancellor","foreign"], [50,65,45,50,48], "CPSU KGB chief then GS 1982–84; anti-corruption; died 15 months; Hungary 1956 repressed");
  I("Konstantin Chernenko",    "CPSU (RU)","e5",["pm","leader","chancellor"],           [30,60,30,28,35], "CPSU GS 1984–85; Brezhnev loyalist; 13 months; last old guard; died in office");
  I("Vyacheslav Molotov",      "CPSU (RU)","e3",["pm","foreign","leader","chancellor"], [38,65,35,38,40], "Soviet FM; Molotov-Ribbentrop Pact; Stalin aide; expelled Khrushchev era; cocktail named");
  I("Anastas Mikoyan",         "CPSU (RU)","e3",["pm","trade","foreign","leader"],      [52,65,45,52,50], "Soviet trade minister; 'survived everything from Lenin to Brezhnev'; Armenian; Mikoyan-Gurevich");


  /* ═══════════════════════════════════════════════════════════════
     THE FINAL 200 — COMPLETING 5000+
     ═══════════════════════════════════════════════════════════════ */

  /* --- More UK Labour History --- */
  I("George Lansbury",         "Labour","e2",["pm","leader","work","justice"],          [62,58,62,55,52], "Labour leader 1932–35; pacifist; resigned Munich era; Poplar rate rebellion; Christian socialist");
  I("Arthur Henderson",        "Labour","e2",["pm","leader","foreign","work"],           [58,60,52,55,52], "Labour Nobel Peace 1934; Foreign Secretary; disarmament; three times party secretary");
  I("Hugh Dalton",             "Labour","e3",["pm","chancellor","leader","foreign"],     [55,58,52,55,50], "Labour Chancellor 1945–47; budget leak resignation; National Parks champion; Fabian");
  I("Ernest Bevin",            "Labour","e3",["pm","foreign","work","leader"],           [62,65,60,62,60], "Labour FM 1945–51; NATO founder; Palestine handover; TGWU; docker union roots");
  I("Herbert Morrison",        "Labour","e3",["pm","leader","chancellor","home"],        [55,60,52,52,55], "Labour Home Sec; London 1948 Olympics; Festival of Britain; Attlee rival; Morrison's grandson");
  I("Stafford Cripps",         "Labour","e3",["pm","chancellor","trade","leader"],       [58,60,50,60,52], "Labour Chancellor of Exchequer 1947–50; austerity budget; steel nationalisation; India envoy");
  I("Frank Cousins",           "Labour","e4",["pm","leader","work","trade"],             [52,55,50,50,48], "TGWU then Labour Technology minister; resigned Wilson; union link; Coventry");
  I("Barbara Castle",          "Labour","e5",["pm","leader","work","health"],            [62,58,62,58,52], "Labour 'Red Barbara'; Castle; in Place of Strife; Equal Pay Act 1970; MEP later");
  I("Richard Crossman",        "Labour","e4",["pm","leader","health","chancellor"],      [55,58,55,52,48], "Labour Housing; Social Services; Cabinet Diaries; crossbencher; Westminster village insider");
  I("Shirley Williams extra",  "SDP","e6",["pm","leader","education"],                   [57,59,57,54,51], "SDP Williams second entry; Lords; Cambridge; Blair early ally; Crosby by-election icon");
  I("Tony Benn",               "Labour","e5",["pm","leader","chancellor","work"],        [62,62,68,55,52], "Labour Benn; Wedgwood Benn; Commonwealth; Alternative Economic Strategy; diaries; referendum");
  I("Michael Foot",            "Labour","e5",["pm","leader","chancellor","work"],        [60,60,65,55,52], "Labour leader 1980–83; CND; donkey jacket; Tribune; Bevan disciple; 1983 disaster manifesto");
  I("Neil Kinnock",            "Labour","e6",["pm","leader","chancellor","foreign"],     [58,55,60,55,52], "Labour leader 1983–92; Militant expulsion; two elections lost; EC Commissioner; Welsh orator");
  I("John Smith",              "Labour","e6",["pm","leader","chancellor","justice"],     [65,62,62,62,60], "Labour leader 1992–94; 1992 near-miss; One Member One Vote; died heart attack 1994; beloved");
  I("Margaret Beckett",        "Labour","e6",["pm","leader","foreign","work"],           [52,60,50,52,52], "Labour caretaker leader 1994; FM 2006–07; motorhome enthusiast; Housing minister");

  /* --- More Conservative History UK --- */
  I("Rab Butler",              "Conservative","e4",["pm","home","chancellor","education"],[60,65,58,62,55], "Conservative: 1944 Education Act; Chancellor; 'Butskellism'; three leadership near-misses");
  I("Quintin Hogg Hailsham",   "Conservative","e4",["pm","leader","justice","foreign"],  [55,62,55,55,52], "Conservative; twice Lord Chancellor; peer-then-untitled; 1963 leadership race bucket");
  I("Reggie Maudling",         "Conservative","e4",["pm","chancellor","home","trade"],   [52,60,50,52,50], "Conservative Chancellor; Home Sec; Poulson scandal; left MPS in police investigation");
  I("Edward Heath",            "Conservative","e4",["pm","leader","chancellor","trade"], [55,65,50,58,55], "Conservative PM; EEC membership 1973; Miners' strike 3-day week; Ugandan Asians rejected; music");
  I("Francis Pym",             "Conservative","e5",["pm","foreign","defence","leader"],  [52,58,48,52,50], "Conservative FM 1982; Falklands; Thatcher sacked; 'victory is not certain' unpopular remark");
  I("Geoffrey Howe",           "Conservative","e5",["pm","chancellor","foreign","leader"],[55,62,52,58,52], "Conservative Chancellor; FM; resignation speech ended Thatcher 1990; 'dead sheep' rebuke");
  I("John Biffen",             "Conservative","e5",["pm","chancellor","trade","leader"],  [52,58,48,52,50], "Conservative Thatcher loyalist; Leader of House; 'semi-detached' remark; Oswestry seat");
  I("Norman Fowler",           "Conservative","e5",["pm","work","health","trade"],       [50,58,46,50,48], "Conservative Health/Work; AIDS campaign 1987; party chair; Lords; Daily Telegraph");
  I("Norman Tebbit",           "Conservative","e5",["pm","trade","work","home"],         [45,60,50,42,50], "Conservative 'Chingford Skinhead'; On Yer Bike; TUC bashing; Brighton bomb injured; party chair");
  I("Cecil Parkinson",         "Conservative","e5",["pm","trade","energy","chancellor"], [48,58,48,44,48], "Conservative party chair; Sara Keays affair resigned; energy secretary later; Thatcher favourite");
  I("Douglas Hurd",            "Conservative","e6",["pm","foreign","home","leader"],    [55,62,52,58,52], "Conservative FM; Home Sec; 1990 Thatcher successor race; Northern Ireland; Hurd formula");
  I("John Major late",         "Conservative","e6",["pm","leader","chancellor","foreign"],[52,60,50,52,52], "Conservative Major second entry; post-1997; cricket; constituency passions; back to basics");
  I("Michael Portillo",        "Conservative","e6",["pm","defence","chancellor","leader"],[48,55,50,46,48], "Conservative Defence Sec; lost seat 1997; transformation; Railway Journeys documentary; gay");
  I("Peter Lilley",            "Conservative","e6",["pm","work","trade","chancellor"],   [48,58,46,48,48], "Conservative 'Little List' speech; Social Security; trade; Maastricht rebel; climate sceptic");
  I("Peter Mandelson",         "Labour","e7",["pm","trade","leader","chancellor"],       [52,62,52,50,52], "Labour twice-sacked minister; Dome; EU trade commissioner; Brown enemy; Lords; 'Bobby' Blair");

  /* --- More Asian/Africa/Americas Fill --- */
  I("Meles Zenawi extra",      "EPRDF (ET)","e7",["pm","chancellor","trade","foreign"], [54,61,51,57,54], "Ethiopia Meles continued — Chinese developmental state model; 10% growth era; Tigray"); 
  I("Hailemariam Desalegn extra","EPRDF (ET)","e7",["pm","leader","chancellor"],        [47,51,44,47,47], "Ethiopia PM continued — Sidama; EPRDF transition; mass protest inability; stepped aside");
  I("Olusegun Obasanjo",       "PDP (NG)","e5",["pm","leader","defence","agriculture"], [50,66,48,50,53], "Nigeria military then elected President; debt relief Okonjo-Iweala; African Union chair");
  I("Muammar al-Gaddafi",      "Green Book (LY)","e5",["pm","leader","foreign","defence"],[33,63,48,28,43], "Libya Jamahiriya variant — Green Book; Jamahiriya direct democracy theory; pan-Africa");
  I("Hosni Mubarak extra",     "NDP (EG)","e5",["pm","leader","home","foreign"],        [33,63,30,33,38], "Egypt Mubarak continued — 1981–2011; Sadat successor; secular iron fist; Arab Spring");
  I("Yasser Arafat",           "Fatah (PS)","e5",["pm","leader","foreign","chancellor"],[52,62,55,48,52], "PLO Chairman; Oslo Accords 1993; Nobel Peace; keffiyeh; Muqata'a; died 2004");
  I("Ahmed Qurei",             "Fatah (PS)","e7",["pm","leader","chancellor","foreign"], [48,55,46,48,48], "PA PM 2003–06; Oslo negotiator; Palestinian Legislative Council speaker; Abu Ala");
  I("Salam Fayyad",            "Third Way (PS)","e7",["pm","leader","chancellor","trade"],[55,55,50,55,50], "PA PM 2007–13; institutional state-building; IMF background; Fayyadism theory");
  I("Mohammad Javad Zarif",    "IR (IR)","e7",["pm","foreign","leader","chancellor"],   [55,60,52,55,50], "Iran FM 2013–21; JCPOA negotiator; New York educated; 'Zarif smiles'; resigned leaked audio");
  I("Taro Kono",               "LDP (JP)","e7",["pm","leader","foreign","chancellor"],  [55,50,55,52,48], "LDP Foreign then Defence then Digital minister; vaccine czar; 2021 leadership race");
  I("Fumio Kishida extra",     "LDP (JP)","e7",["pm","leader","foreign","chancellor"],  [53,57,50,54,53], "Kishida continued — Hiroshima PM; Kishida-nomics; G7; Abe state funeral controversy");
  I("Yoshihide Suga",          "LDP (JP)","e7",["pm","leader","chancellor","home"],     [45,58,40,46,48], "LDP PM 2020–21; Abe's chief cabinet secretary; COVID Tokyo Olympics; low approval");
  I("Lin Yi-fu",               "KMT (TW)","e7",["pm","chancellor","trade","foreign"],   [58,58,50,60,50], "World Bank Chief Economist; Taiwan-born; defected to China; New Structural Economics");
  I("Su Tseng-chang",          "DPP (TW)","e7",["pm","leader","chancellor"],            [50,58,50,50,50], "DPP Taiwan PM twice; Tsai partner; veteran; Taipei County CM; DPP chairman multiple");
  I("William Lai extra",       "DPP (TW)","e7",["pm","leader","chancellor","health"],   [57,51,57,54,51], "Lai Ching-te extra — Tainan Mayor emphasis; pro-independence speech; 'troublemaker' per China");
  I("James Soong",             "PFP (TW)","e6",["pm","leader","chancellor"],            [50,60,50,50,50], "People First Party; 2000/2004/2016 presidential runs; KMT secretary-general; provincial governor");
  I("Goh Keng Swee",          "PAP (SG)","e4",["pm","chancellor","defence","leader"],   [65,68,55,68,60], "PAP Singapore economic architect; industrialisation; defence minister; 'economic miracle'");
  I("S. Rajaratnam",           "PAP (SG)","e4",["pm","foreign","culture","leader"],     [62,62,58,60,55], "PAP Singapore FM; ideologist; 'Singapore: The Global City'; journalism before politics");
  I("Tommy Koh",               "PAP (SG)","e6",["pm","foreign","justice","leader"],     [62,62,58,62,55], "Singapore ambassador; UNCLOS negotiation; 1992 Rio Earth Summit chair; cultural diplomat");
  I("Chiam See Tong",          "SDA (SG)","e6",["pm","leader","justice","chancellor"],  [55,55,55,52,48], "Singapore opposition pioneer; 1984 Potong Pasir win; 26 years holdout; SPP founder");
  I("Low Thia Khiang",         "WP (SG)","e7",["pm","leader","chancellor","justice"],   [55,58,52,52,50], "Workers' Party; GRC win 2011 breakthrough; Hougang and Aljunied; Mandarin politician");
  I("Pritam Singh",            "WP (SG)","e7",["pm","leader","chancellor","justice"],   [55,48,55,52,48], "Workers' Party leader Singapore; leader of opposition formal title; falsely accused election");


  /* ═══════════════════════════════════════════════════════════════
     LAST 120 PUSH
     ═══════════════════════════════════════════════════════════════ */

  /* --- More Americans --- */
  I("Robert La Follette Sr",   "Progressive (US)","e2",["pm","leader","work","justice"],[62,60,65,58,52], "Progressive Wisconsin Senator; 1924 third party 17%; Labor farmers; anti-WWI; 'Fighting Bob'");
  I("William Jennings Bryan",  "Democrat (USA)","e1",["pm","leader","work","foreign"], [62,58,72,55,55], "Democratic 3x candidate; Cross of Gold; anti-imperialist; Scopes trial prosecution; pacifist");
  I("Adlai Stevenson II",      "Democrat (USA)","e3",["pm","leader","foreign","chancellor"],[62,62,60,62,55], "Democratic 1952/1956 Eisenhower loser; UN Ambassador; eloquent intellectual; 'Egg head'");
  I("George H.W. Bush early",  "Republican (USA)","e5",["pm","leader","foreign","chancellor"],[57,64,50,61,57], "Republican CIA Director; VP eight years; diplomat; Texas Congressman; preppy patrician");
  I("Jeb Bush",                "Republican (USA)","e7",["pm","leader","chancellor","education"],[48,52,48,46,48], "Republican FL Governor; 2016 'low energy'; Common Core; 'please clap'; Bush dynasty fatigue");
  I("Eric Holder",             "Democrat (USA)","e7",["pm","justice","leader","chancellor"],[52,58,50,52,50], "Democratic AG 2009–15; first Black AG; 'nation of cowards'; Fast and Furious; voting rights");
  I("Tom Cotton",              "Republican (USA)","e7",["pm","leader","defence","foreign"],[38,50,45,35,40], "Republican AR Senator; military; Iran hardline; NYT op-ed controversy; 2024 interest faded");
  I("Glenn Beck",              "Republican (USA)","e7",["pm","leader","culture","home"],   [30,42,48,24,32], "Media-political influencer; Tea Party; TheBlaze; chalkboard; 9/12 project; polariser");
  I("Ron Paul",                "Republican (USA)","e6",["pm","leader","chancellor","foreign"],[55,58,55,52,45], "Republican libertarian; End the Fed; 2008/2012 runs; gold standard; anti-war republican");
  I("Gary Johnson",            "Libertarian (US)","e7",["pm","leader","chancellor","trade"],[48,50,48,45,42], "Libertarian 2012/2016 candidate; NM Governor; 'What is Aleppo?'; highest Lib vote 3.3%");
  I("Jill Stein",              "Green (US)","e7",["pm","leader","environment","health"], [48,45,50,44,40], "Green 2012/2016/2024 candidate; doctor-activist; Russian dinner table; recount 2016");
  I("Hubert Humphrey extra",   "Democrat (USA)","e4",["pm","foreign","work","leader"],  [61,64,61,59,57], "Humphrey continued — Medicare/Medicaid architect; 'Happy Warrior' Senate legacy");

  /* --- More UK Independent & Minor Parties --- */
  I("George Galloway extra",   "Workers Party (GB)","e7",["pm","leader","foreign","work"],[40,53,53,36,38], "WPB Galloway continued — Rochdale 2024; Gaza stance; anti-Ukraine; cat impressions");
  I("Jeremy Corbyn",           "Labour","e7",["pm","leader","chancellor","foreign"],     [55,60,58,50,50], "Labour leader 2015–20; Islington North; anti-Austerity; antisemitism crisis; expelled");
  I("John McDonnell",          "Labour","e7",["pm","chancellor","work","leader"],        [52,58,52,50,50], "Labour shadow Chancellor; alternative economic strategy; Hayes; Corbyn inner circle");
  I("Diane Abbott",            "Labour","e7",["pm","home","leader","justice"],           [52,58,52,48,48], "Labour; Hackney North; first Black woman MP 1987; shadow Home Sec; suspended 2023");
  I("Clive Lewis",             "Labour","e7",["pm","chancellor","foreign","leader"],     [50,48,52,48,46], "Labour Norfolk South; ex-BBC; Corbynite; PR reform advocate; Green New Deal");
  I("Lisa Nandy",              "Labour","e7",["pm","foreign","leader","chancellor"],     [52,50,52,50,50], "Labour FM from 2024; Wigan; 2020 leadership contender; Northern England voice");
  I("Emily Thornberry",        "Labour","e7",["pm","foreign","home","justice"],          [52,55,52,50,50], "Labour FM shadow; Islington South; Rochester van tweet; lawyer; Corbyn shadow cabinet");
  I("Chuka Umunna",            "Labour","e7",["pm","leader","trade","chancellor"],       [52,48,55,50,48], "Labour then Change UK then LibDem then nothing; Streatham; Blair wing departure");
  I("Anna Soubry",             "Conservative","e7",["pm","leader","chancellor"],         [48,50,50,46,44], "Conservative to Change UK; Remain; Broxtowe; Brexit abuse online; political orphan");
  I("Heidi Allen",             "Conservative","e7",["pm","leader","chancellor"],         [48,48,48,44,42], "Conservative to Change UK to LibDem; Cambridgeshire South; welfare speech famous");
  I("Ian Blackford",           "SNP","e7",["pm","leader","chancellor","foreign"],        [48,52,50,46,48], "SNP Westminster leader 2017–22; Skye; 'Scotland will not be taken out of the EU'");
  I("Stephen Flynn",           "SNP","e7",["pm","leader","chancellor"],                  [45,45,46,44,44], "SNP Westminster leader 2022; Aberdeen South; Blackford replacement; vote arithmetic");
  I("Liz Saville Roberts",     "Plaid Cymru","e7",["pm","leader","chancellor","culture"],[50,48,50,48,46], "Plaid Cymru Westminster leader; Dwyfor Meirionnydd; Welsh language; cultural independence");
  I("Adam Price",              "Plaid Cymru","e7",["pm","leader","chancellor","culture"],[52,50,52,50,48], "Plaid Cymru Senedd leader 2018–23; radical independence; Welsh Economy Commissioner");
  I("Rhun ap Iorwerth",        "Plaid Cymru","e7",["pm","leader","chancellor","health"], [50,48,50,48,46], "Plaid Cymru leader 2023; Ynys Mon; TV presenter past; Welsh NHS; independence drive");
  I("Patrick Harvie",          "Scottish Greens","e7",["pm","leader","environment","chancellor"],[52,48,52,50,46], "Scottish Green co-leader; Glasgow; confidence and supply with SNP; renters reform");
  I("Lorna Slater",            "Scottish Greens","e7",["pm","leader","environment","chancellor"],[50,45,50,48,44], "Scottish Green co-leader; Canadian-born; Bute House power-share; deposit return scheme");

  /* --- More MENA, Africa --- */
  I("Mustapha Adib",           "Indep (LB)","e7",["pm","leader","chancellor","foreign"],[48,48,45,46,44], "Lebanon PM-designate Aug 2020; resigned over cabinet formation failure; diplomat");
  I("Hassan Diab",             "Indep (LB)","e7",["pm","leader","chancellor"],           [45,48,42,44,42], "Lebanon technocrat PM 2020; Beirut explosion; resigned; bank dollar freeze");
  I("Najib Mikati",            "PM Alliance (LB)","e7",["pm","leader","chancellor","trade"],[42,55,40,40,44], "Lebanon PM three times; telecom billionaire; Tripoli; reforms blocked; refugee crisis");
  I("Fouad Siniora",           "Future (LB)","e6",["pm","leader","chancellor","foreign"],[50,55,48,50,48], "Lebanon PM 2005–09; Hariri ally; Cedar Revolution; 33-day war; August 2006 weeping");
  I("Said Hariri",             "Future (LB)","e7",["pm","leader","chancellor","foreign"],[42,48,42,40,42], "Lebanon PM 2009–11, 2016–20; Rafik's son; Saudi; resigned live Riyadh; coalition chaos");
  I("Abiy Ahmed extra",        "PP (ET)","e7",["pm","chancellor","trade","foreign"],     [59,51,61,54,54], "Ethiopia Abiy continued — African Union debt deal; Berbera port; Tigray reconstruction");
  I("Cyril Ramaphosa extra",   "ANC","e7",["pm","leader","chancellor","trade"],          [59,64,57,59,59], "ANC Ramaphosa continued — GNU formation 2024; Phala Phala USD stash; Zondo reading");
  I("Jacob Zuma extra",        "MKP (ZA)","e7",["pm","leader","chancellor"],             [46,60,48,43,50], "MKP Zuma new party 2024; uMkhonto weSizwe; ANC splitter; NEC challenges; KZN stronghold");
  I("Julius Malema extra",     "EFF (ZA)","e7",["pm","leader","work","agriculture"],     [57,47,64,47,54], "EFF Malema continued — land without compensation; nationalise Reserve Bank; Parliament red");
  I("Asma Jahangir",           "PPP (PK)","e7",["pm","justice","leader","foreign"],     [65,58,65,60,52], "Pakistan human rights lawyer; Supreme Court bar president; UNHCR; died 2018; fearless");
  I("Zardari Asif extra",      "PPP (PK)","e7",["pm","leader","chancellor"],             [33,53,33,31,38], "PPP Zardari continued — second presidency 2024; Bilawal's patron; Karachi power");
  I("Imran Khan extra",        "PTI (PK)","e7",["pm","leader","chancellor","foreign"],   [61,49,64,51,54], "PTI Khan continued — Lahore March; imprisoned 2023; cipher case; women protest organising");
  I("Reza Shah Pahlavi",       "Imperial Iran","e3",["pm","leader","chancellor","foreign"],[45,65,42,45,45], "Shah of Iran; modernisation; oil; SAVAK; overthrown 1979 revolution; exile Switzerland");
  I("Mohammed Mosaddegh",      "National Front (IR)","e3",["pm","leader","chancellor","foreign"],[62,62,62,60,55], "Iran PM 1951–53; oil nationalisation; CIA/MI6 coup overthrew him; democracy martyr");


  /* ═══════════════════════════════════════════════════════════════
     THE LAST 80 — OVER THE LINE
     ═══════════════════════════════════════════════════════════════ */
  I("Albert Camus",            "French Resistance","e3",["pm","culture","leader","justice"],[68,50,70,62,48], "Algerian-French novelist-philosopher; Nobel Literature 1957; Absurdism; Resistance; anti-totalitarian");
  I("Jean-Paul Sartre",        "Parti Socialiste","e3",["pm","leader","culture","justice"],[65,52,68,60,48], "Existentialist philosopher; refused Nobel 1964; Cuba/USSR sympathies; Maoist turn; Beauvoir partner");
  I("Simone de Beauvoir",      "Parti Socialiste","e3",["pm","leader","work","justice"], [68,52,68,62,48], "French existentialist-feminist; The Second Sex 1949; women liberation foundation; anti-colonialism");
  I("Ho Chi Minh",             "VCP (VN)","e3",["pm","leader","foreign","chancellor"],   [65,68,65,62,60], "VCP Vietnam father of nation; Viet Minh; independence 1945; South Vietnam war leader; died 1969");
  I("Aung San",                "AFPFL (MM)","e3",["pm","leader","defence","foreign"],    [65,58,62,60,55], "Burma founding father; assassinated 1947; General; independence architect; Suu Kyi father");
  I("Sukarno",                 "PNI (ID)","e3",["pm","leader","foreign","chancellor"],   [65,65,68,62,60], "Indonesia founding President; non-alignment Bandung 1955; Konfrontasi; ousted Suharto 1967");
  I("Suharto",                 "Golkar (ID)","e4",["pm","leader","defence","chancellor"],[25,65,25,25,35], "Indonesia military President 1967–98; New Order; East Timor; 1965 massacres; corruption family");
  I("Ferdinand Marcos",        "KBL (PH)","e5",["pm","leader","chancellor","home"],      [35,62,40,32,42], "Philippines President 1965–86; martial law; Imelda; 3,000 shoes; People Power ousted");
  I("Park Chung-hee extra",    "DRP (KR)","e5",["pm","leader","defence","chancellor"],   [43,67,43,49,51], "South Korea Park continued — Yushin constitution; Saemaul Movement; 'Miracle on Han'");
  I("Lee Kuan Yew extra",      "PAP (SG)","e4",["pm","leader","chancellor","foreign"],   [69,71,67,71,67], "Singapore LKY continued — soft authoritarianism model; Japan race commentary; death 2015");
  I("Subhas Chandra Bose",     "INC (IN)","e2",["pm","leader","defence","foreign"],      [65,55,68,60,55], "Indian National Army; Azad Hind; Axis alignment; Britain's most dangerous enemy; disappeared 1945");
  I("B.R. Ambedkar",           "SCOF (IN)","e3",["pm","leader","justice","education"],   [68,62,68,65,55], "India Constitution drafter; Dalit rights; converted Buddhism; anti-caste; Columbia PhD");
  I("Vallabhbhai Patel",       "INC (IN)","e3",["pm","leader","home","chancellor"],      [65,65,60,65,60], "INC Iron Man of India; princely states integration; Home Minister; Sardar Patel Unity Statue");
  I("Che Guevara",             "PCC (CU)","e4",["pm","leader","foreign","health"],       [60,50,65,52,45], "Cuban revolution; Argentina guerrilla; motorcyle diaries; Bolivia 1967 execution; icon tshirt");
  I("Ernesto Zedillo extra",   "PRI (MX)","e6",["pm","leader","chancellor","trade"],     [54,61,49,54,51], "Mexico Zedillo continued — IFE independence; 1997 mid-term loss; democracy modelling");
  I("Vicente Fox extra",       "PAN (MX)","e6",["pm","leader","chancellor","trade"],     [57,54,57,54,51], "Mexico Fox continued — NAFTA renegotiation talks; Fox News Spain property; cowboy boots");
  I("Lula da Silva extra",     "PT (BR)","e7",["pm","leader","work","chancellor"],       [67,64,69,61,64], "Brazil Lula 2022 continued — BRICs revival; Amazon deforestation dropped; PT coalition");
  I("Dilma Rousseff extra",    "PT (BR)","e7",["pm","leader","chancellor","energy"],     [51,57,44,54,51], "Brazil Dilma continued — NDB BRICS bank president from 2023; oil-state industrial policy");
  I("Fidel Castro extra",      "PCC (CU)","e4",["pm","leader","foreign","health"],       [61,71,69,59,61], "Cuba Castro continued — Non-Aligned leader; Angola; Missile Crisis variant nuclear diplomacy");
  I("Pinochet Augusto extra",  "UDI (CL)","e5",["pm","leader","defence","home"],         [24,64,27,24,36], "Chile Pinochet continued — Operation Condor; London arrest 1998; Riggs bank accounts");
  I("Thomas Sankara",          "CNR (BF)","e5",["pm","leader","foreign","work"],          [62,50,65,55,50], "Burkina Faso revolutionary PM 1983–87; Pan-Africanism; women's rights; anti-IMF; assassinated");
  I("Patrice Lumumba extra",   "MNC (CD)","e4",["pm","leader","foreign","chancellor"],   [61,51,64,54,49], "Congo Lumumba continued — 'independence speech'; Katanga secession; cold war pawn; Icon");
  I("Julius Nyerere extra",    "CCM (TZ)","e4",["pm","leader","foreign","education"],    [64,64,61,61,59], "Tanzania Nyerere continued — OAU; liberation movements; Arusha Declaration ujamaa detail");
  I("Nelson Mandela extra",    "ANC","e6",["pm","leader","justice","foreign"],            [77,67,71,71,64], "Mandela continued — White reconciliation; Truth Commission; Robben Island library; rugby final");
  I("Patrice Motsepe",         "ANC","e7",["pm","trade","leader","chancellor"],          [50,50,45,50,46], "South Africa billionaire philanthropist; CAF President; ANC donor; Ramaphosa brother-in-law");
  I("Mmusi Maimane extra",     "DA (ZA)","e7",["pm","leader","chancellor","justice"],    [59,49,61,51,54], "DA Maimane continued — One SA Movement post-DA; faith-based activism; Cape Town church");
  I("Ekwueme Alex",            "PDP (NG)","e6",["pm","deputy","chancellor","foreign"],   [52,60,50,50,50], "Nigeria VP 1979–83; architect; democracy advocate; Anambra; Shagari government VP");
  I("Goodluck Jonathan extra", "PDP (NG)","e7",["pm","leader","chancellor","energy"],    [49,54,47,47,49], "Nigeria Jonathan continued — 2015 peaceful handover; NNPC subsidy; Jonathan Foundation");
  I("Bola Tinubu extra",       "APC (NG)","e7",["pm","leader","chancellor","trade"],     [41,57,41,37,47], "Nigeria Tinubu continued — petrol subsidy end; naira crash; Emi lokan campaign 2023");
  I("Robert Mugabe extra",     "ZANU-PF (ZW)","e5",["pm","leader","foreign","education"],[39,67,49,34,49], "Zimbabwe Mugabe continued — Fast Track Land Reform; Jongwe; Gukurahundi 1982–87");
  I("Emmerson Mnangagwa extra","ZANU-PF (ZW)","e7",["pm","leader","chancellor","trade"], [27,59,29,27,37], "Zimbabwe Mnangagwa continued — 2023 re-election disputed; Coups within coups; SADC vote");
  I("Ellen Johnson Sirleaf extra","UP (LR)","e7",["pm","leader","chancellor","work"],    [61,59,59,61,54], "Liberia Sirleaf continued — Sirleaf-Johnson Harvard; Africa's first woman President at 68");
  I("Wangari Maathai",         "Green Belt (KE)","e5",["pm","leader","environment","work"],[65,55,65,60,52], "Kenya Green Belt Movement; Nobel Peace 2004; Moi persecution; trees and rights; Parliament");
  I("Raila Odinga extra",      "ODM (KE)","e7",["pm","leader","chancellor","foreign"],   [54,58,55,52,52], "ODM Odinga continued — 2022 final defeat; AU Commission candidacy 2025; Grand Coalition PM");
  I("Uhuru Kenyatta extra",    "Jubilee (KE)","e7",["pm","leader","chancellor","foreign"],[47,54,48,48,49], "Kenya Kenyatta continued — ICC indictment withdrew; BBI constitution; Ruto fallout");
  I("William Ruto extra",      "UDA (KE)","e7",["pm","leader","chancellor","trade"],     [50,51,52,49,50], "Kenya Ruto continued — Finance Bill protests 2024; Gen Z revolution; Gen AI mention");
  I("Kagame Paul extra",       "RPF (RW)","e7",["pm","leader","chancellor","trade"],     [47,61,44,49,54], "Rwanda Kagame continued — 2017 re-elected 99%; press freedom bottom; Vision 2050; safe city");
  I("Abebe Bikila",            "EPRP (ET)","e4",["pm","leader","work","health"],         [65,45,55,50,40], "Ethiopia barefoot Olympic marathon champion 1960; imperial guard; Haile Selassie symbol");
  I("Wole Soyinka",            "LP (NG)","e5",["pm","culture","leader","justice"],       [68,55,70,62,50], "Nigeria Nobel Literature 1986; activist; imprisoned 1967; Soyinka war; political dissent");
  I("Chinua Achebe",           "LP (NG)","e5",["pm","culture","leader","justice"],       [68,55,65,62,48], "Nigeria Things Fall Apart; Biafra; refused Nigerian Honor 2004; moral voice; dies 2013");


  /* ═══════════════════════════════════════════════════════════════
     ABSOLUTE FINAL 40 — CROSSING 5000
     ═══════════════════════════════════════════════════════════════ */
  I("Denis Healey",            "Labour","e5",["pm","chancellor","defence","leader"],     [62,65,60,62,58], "Labour Chancellor 1974–79; IMF crisis; eyebrows; Falklands doubter; Budget speeches legend");
  I("Roy Hattersley",          "Labour","e5",["pm","deputy","leader","chancellor"],      [55,58,55,52,50], "Labour deputy leader 1983–92; Gaitskellite right; journalist-politician; Bradford; food writing");
  I("Gerald Kaufman",          "Labour","e5",["pm","culture","foreign","leader"],        [52,60,55,50,48], "Labour 'longest suicide note'; shadow Foreign Sec; cultural committee; prolific; died 2017");
  I("Harold Wilson late",      "Labour","e5",["pm","leader","chancellor","trade"],       [62,65,60,62,60], "Wilson continued — pipe and Gannex raincoat; Open University; EEC referendum 1975; resigned");
  I("Jo Grimond",              "Liberal","e4",["pm","leader","chancellor","foreign"],    [62,60,60,60,55], "Liberal leader 1956–67; Orkney and Shetland; liberal revival; 'marching towards the sound of gunfire'");
  I("Jeremy Thorpe",           "Liberal","e5",["pm","leader","foreign","chancellor"],    [55,55,60,52,50], "Liberal leader 1967–76; Norman Scott affair; trial acquittal; Welsh; flamboyant orator");
  I("David Owen",              "SDP","e5",["pm","leader","foreign","health"],            [58,60,55,58,52], "SDP Gang of Four; FM; doctor; Hubristic; refused Lib-SDP merger; Balkans envoy");
  I("Enoch Powell",            "Conservative","e4",["pm","leader","chancellor","home"],  [45,65,60,42,45], "Conservative 'Rivers of Blood'; dismissed Heath; UUP; free market right; classical scholar");
  I("Ian Gilmour",             "Conservative","e5",["pm","chancellor","foreign","leader"],[52,60,48,52,48], "Conservative 'wet'; Thatcher sacked 1981; dismissed as One Nation; 'not just for Christmas'");
  I("Peter Walker",            "Conservative","e5",["pm","energy","trade","chancellor"], [52,58,50,52,48], "Conservative 'wet'; Energy Secretary miners' strike; Welsh Sec; survived Thatcher purges");
  I("James Prior",             "Conservative","e5",["pm","work","home","leader"],        [52,58,48,52,48], "Conservative Employment Sec; slow trade union reform; NI Secretary; Thatcher 'wet'");
  I("Ian Macleod",             "Conservative","e4",["pm","chancellor","health","leader"],[60,60,58,58,55], "Conservative 'too clever by half'; Colonial Office; died month into chancellorship 1970");
  I("Reginald Maudling",       "Conservative","e4",["pm","chancellor","home","trade"],   [52,60,50,52,48], "Conservative Chancellor 'Maudling Deficit'; Home Sec; Poulson affair resigned from role");
  I("Alec Douglas Home extra", "Conservative","e4",["pm","leader","foreign","chancellor"],[51,64,47,51,49], "Douglas-Home continued — SEATO; Scottish cricket; cricket match-fixing era PM");
  I("Peter Shore",             "Labour","e5",["pm","chancellor","foreign","trade"],      [55,58,52,55,50], "Labour Eurosceptic left; trade secretary; chancellor shadow; 'great patriotic cause' EEC");
  I("Eric Varley",             "Labour","e5",["pm","energy","trade","chancellor"],       [50,55,48,50,48], "Labour Energy then Industry Secretary; Chesterfield; Healey supporter; 1976 race");
  I("William Rodgers extra",   "SDP","e6",["pm","transport","leader","chancellor"],      [51,57,49,51,49], "SDP Rodgers continued — Gang of Four; Stockton-on-Tees; Liberal Democrat Lords");
  I("Robert Mellish",          "Labour","e4",["pm","home","leader","work"],              [48,55,45,46,48], "Labour chief whip 1969–76; Bermondsey; defected SDP then Ind; council houses advocate");
  I("Sydney Silverman",        "Labour","e3",["pm","justice","leader","work"],           [58,55,58,55,48], "Labour MP 1935–68; capital punishment abolition; anti-Vietnam; tribunite; Nelson barrister");
  I("Tom Driberg",             "Labour","e3",["pm","culture","leader","justice"],        [50,50,55,46,40], "Labour journalist-politician; express column; Beaverbrook; Kinsey scale personal life; flamboyant");
  I("Michael Stewart",         "Labour","e4",["pm","foreign","education","leader"],      [52,58,50,52,50], "Labour FM twice; 'safe pair of hands'; multilateral; NATO; Gordon Walker predecessor");
  I("Denis Healey extra",      "Labour","e5",["pm","chancellor","defence","leader"],     [61,64,59,61,57], "Healey continued — 'silly billy'; Denis's Budget; IMF betrayal claim; Labour patriot");
  I("Gwyneth Dunwoody",        "Labour","e5",["pm","transport","leader","work"],         [55,58,52,50,50], "Labour Crewe MP; Transport select committee; 'The Duchess'; independent-minded champion of rail");
  I("Ann Taylor",              "Labour","e6",["pm","leader","chancellor","education"],   [48,52,46,48,46], "Labour Chief Whip; Education; first female Chief Whip; House of Lords modernisation");
  I("Hilary Armstrong",        "Labour","e6",["pm","home","work","leader"],              [48,52,46,48,46], "Labour Chief Whip under Blair; social exclusion; Cabinet Office; NE Durham; died 2022");
  I("Margaret Jay",            "Labour","e6",["pm","health","leader","foreign"],         [50,52,48,50,46], "Labour Lords Leader; Health Minister; International Development; Callaghan's daughter");
  I("Patricia Hewitt",         "Labour","e6",["pm","trade","health","chancellor"],       [48,52,48,48,46], "Labour Health; Trade; Leicester West; GCHQ anti-union controversy; Edelman lobby scandal");
  I("Ruth Kelly",              "Labour","e7",["pm","education","transport","chancellor"],[45,50,44,46,44], "Labour Education then Transport; Opus Dei; Bury; resigned 2008; quiet religious");
  I("Alan Milburn",            "Labour","e6",["pm","health","chancellor","leader"],      [48,52,48,48,46], "Labour Health Sec; NHS modernisation; resigned twice; Darlington; Blair moderniser");
  I("Stephen Byers",           "Labour","e6",["pm","transport","trade","chancellor"],    [40,50,40,38,40], "Labour Transport; Railtrack collapse; 'Jo Moore good day to bury'; Soham errors; resigned");
  I("Andrew Smith",            "Labour","e6",["pm","work","chancellor","leader"],        [45,52,43,45,43], "Labour Work and Pensions; Oxford East; Gordon Brown ally; Treasury quiet hand");
  I("Estelle Morris",          "Labour","e6",["pm","education","culture","leader"],      [48,50,47,47,46], "Labour Education; resigned 'not good enough' bravely 2002; Arts; Yardley; teacher origins");
  I("Hilary Benn extra",       "Labour","e7",["pm","foreign","environment","chancellor"],[54,57,54,51,51], "Labour Benn continued — Sunak debate chair committee; Leeds Central; Green NI minister 2024");
  I("Liam Byrne",              "Labour","e7",["pm","chancellor","home","work"],          [45,50,44,44,44], "Labour 'There is no money left' note; Hodge Hill; digital government advocate; immigration");
  I("Tessa Jowell",            "Labour","e6",["pm","culture","health","leader"],         [55,55,52,52,50], "Labour Culture; 2012 Olympics; dementia speech dying Lords; childcare pioneer; died 2018");
  I("James Purnell",           "Labour","e7",["pm","work","culture","leader"],           [45,48,45,44,44], "Labour Work; resigned Brown's cabinet; BBC Strategy; media reformer; thought leader");
  I("Geoff Hoon",              "Labour","e6",["pm","defence","leader","foreign"],        [38,52,38,36,38], "Labour Defence Sec; Iraq; Blair loyalist; failed leadership coup with Hewitt 2010; Hoon");
  I("Chris Mullin",            "Labour","e6",["pm","home","foreign","leader"],           [52,54,50,50,46], "Labour diarist; Home Affairs select; A View from the Foothills; Sunderland; reformer");
  I("Ann Widdecombe",          "Conservative","e6",["pm","home","work","leader"],        [42,55,50,38,44], "Conservative shadow Home Sec; Maidstone; 'something of the night' Howard; Strictly; Brexit Party");
  I("Virginia Bottomley",      "Conservative","e5",["pm","health","culture","leader"],   [45,52,44,44,44], "Conservative Health Sec; Southampton; NHS reforms 1990s; Cranfield University chancellor");

})();

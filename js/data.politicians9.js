/* ============================================================
   650 — POLITICIANS EXPANSION IX
   Japan + South Korea + Central/Eastern Europe
   + New Zealand + Ghana/Tanzania/Ethiopia/Zimbabwe + more
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
  /* Japan */
  reg("LDP",                  "LDP_JP",  "#009246",  0.7, 465);
  reg("DPJ (JP)",             "DPJ_JP",  "#e53935", -0.4, 465);
  reg("Komeito (JP)",         "Komeito", "#003189",  0.2, 465);
  reg("JSP (JP)",             "JSP_JP",  "#e53935", -0.8, 465);
  reg("JCP (JP)",             "JCP_JP",  "#cc0000", -1.5, 465);
  reg("Nippon Ishin",         "Ishin",   "#f9a825",  0.5, 465);
  reg("CDP (JP)",             "CDP_JP",  "#e53935", -0.5, 465);
  /* South Korea */
  reg("Democratic Party (KR)","DP_KR",  "#003189", -0.3, 300);
  reg("PPP (KR)",             "PPP_KR",  "#e53935",  0.7, 300);
  reg("GNP (KR)",             "GNP_KR",  "#003189",  0.8, 300);
  reg("DLP (KR)",             "DLP_KR",  "#e53935", -0.5, 300);
  reg("New Frontier (KR)",    "NFP_KR",  "#003189",  0.6, 300);
  /* Poland */
  reg("PiS (PL)",             "PiS",     "#003189",  1.3, 460);
  reg("Civic Platform (PL)",  "PO_PL",   "#ef5350",  0.2, 460);
  reg("SLD (PL)",             "SLD_PL",  "#e53935", -0.7, 460);
  reg("PSL (PL)",             "PSL_PL",  "#009246",  0.2, 460);
  reg("Konfederacja (PL)",    "Konf_PL", "#1c3f6e",  2.0, 460);
  reg("PZPR (PL)",            "PZPR",    "#cc0000", -1.5, 460);
  /* Hungary */
  reg("Fidesz",               "Fidesz",  "#f9a825",  1.5, 199);
  reg("MSZP (HU)",            "MSZP",    "#e53935", -0.5, 199);
  reg("Jobbik (HU)",          "Jobbik",  "#1c3f6e",  2.0, 199);
  reg("MSZMP (HU)",           "MSZMP",   "#cc0000", -1.5, 199);
  reg("DK (HU)",              "DK_HU",   "#e53935", -0.3, 199);
  reg("Momentum (HU)",        "Mom_HU",  "#ef5350",  0.0, 199);
  /* Czech Republic */
  reg("ODS (CZ)",             "ODS",     "#003189",  0.8, 200);
  reg("ANO (CZ)",             "ANO",     "#003189",  0.3, 200);
  reg("ČSSD (CZ)",            "CSSD",    "#e53935", -0.5, 200);
  reg("KDU-ČSL (CZ)",         "KDU",     "#009246",  0.2, 200);
  reg("KSČM (CZ)",            "KSCM",    "#cc0000", -1.5, 200);
  reg("SPD (CZ)",             "SPD_CZ",  "#1c3f6e",  1.8, 200);
  reg("SPOLU (CZ)",           "SPOLU",   "#003189",  0.6, 200);
  /* New Zealand */
  reg("NZ Labour",            "Lab_NZ",  "#e53935", -0.6, 120);
  reg("NZ National",          "Nat_NZ",  "#003189",  0.7, 120);
  reg("ACT (NZ)",             "ACT_NZ",  "#f9a825",  1.2, 120);
  reg("NZ First",             "NZF",     "#1c3f6e",  0.8, 120);
  reg("Green Party (NZ)",     "GP_NZ",   "#009246", -1.0, 120);
  /* African parties */
  reg("NDC (GH)",             "NDC_GH",  "#009246", -0.3, 275);
  reg("NPP (GH)",             "NPP_GH",  "#003189",  0.5, 275);
  reg("CCM (TZ)",             "CCM_TZ",  "#009246",  0.1, 393);
  reg("TPLF (ET)",            "TPLF_ET", "#e53935",  0.0, 547);
  reg("EPRDF (ET)",           "EPRDF",   "#009246",  0.1, 547);
  reg("PP (ET)",              "PP_ET",   "#009246",  0.2, 547);
  reg("ZANUPF (ZW)",          "ZANU_PF", "#009246",  0.5, 270);
  reg("MDC (ZW)",             "MDC_ZW",  "#e53935", -0.3, 270);
  reg("MAS (BO)",             "MAS_BO",  "#e53935", -1.0, 130);
  reg("MNRV (BO)",            "MNR_BO",  "#f9a825",  0.3, 130);
  /* Other Asia */
  reg("Golkar (ID)",          "Golkar",  "#f9a825",  0.3, 575);
  reg("PDI-P (ID)",           "PDIP",    "#e53935", -0.3, 575);
  reg("Gerindra (ID)",        "Gerindra","#e53935",  0.7, 575);
  reg("PAP (SG)",             "PAP_SG",  "#e53935",  0.5, 93);
  reg("WP (SG)",              "WP_SG",   "#003189", -0.3, 93);
  reg("Pheu Thai",            "PheuThai","#e53935", -0.3, 500);
  reg("Democrat Party (TH)",  "Dem_TH",  "#003189",  0.4, 500);
  reg("Move Forward",         "MFP_TH",  "#f9a825", -0.5, 500);
  reg("UMNO (MY)",            "UMNO",    "#003189",  0.5, 222);
  reg("PKR (MY)",             "PKR_MY",  "#003189", -0.2, 222);
  reg("DAP (MY)",             "DAP_MY",  "#e53935", -0.5, 222);
  reg("PAS (MY)",             "PAS_MY",  "#009246",  0.7, 222);

  if (G.PARTY_COUNTRY) {
    /* Japan */
    G.PARTY_COUNTRY["LDP"]                   = "JP";
    G.PARTY_COUNTRY["DPJ (JP)"]              = "JP";
    G.PARTY_COUNTRY["Komeito (JP)"]          = "JP";
    G.PARTY_COUNTRY["JSP (JP)"]              = "JP";
    G.PARTY_COUNTRY["JCP (JP)"]              = "JP";
    G.PARTY_COUNTRY["Nippon Ishin"]          = "JP";
    G.PARTY_COUNTRY["CDP (JP)"]              = "JP";
    /* South Korea */
    G.PARTY_COUNTRY["Democratic Party (KR)"] = "KR";
    G.PARTY_COUNTRY["PPP (KR)"]              = "KR";
    G.PARTY_COUNTRY["GNP (KR)"]              = "KR";
    G.PARTY_COUNTRY["DLP (KR)"]              = "KR";
    G.PARTY_COUNTRY["New Frontier (KR)"]     = "KR";
    /* Poland */
    G.PARTY_COUNTRY["PiS (PL)"]              = "PL";
    G.PARTY_COUNTRY["Civic Platform (PL)"]   = "PL";
    G.PARTY_COUNTRY["SLD (PL)"]              = "PL";
    G.PARTY_COUNTRY["PSL (PL)"]              = "PL";
    G.PARTY_COUNTRY["Konfederacja (PL)"]     = "PL";
    G.PARTY_COUNTRY["PZPR (PL)"]             = "PL";
    /* Hungary */
    G.PARTY_COUNTRY["Fidesz"]                = "HU";
    G.PARTY_COUNTRY["MSZP (HU)"]             = "HU";
    G.PARTY_COUNTRY["Jobbik (HU)"]           = "HU";
    G.PARTY_COUNTRY["MSZMP (HU)"]            = "HU";
    G.PARTY_COUNTRY["DK (HU)"]               = "HU";
    G.PARTY_COUNTRY["Momentum (HU)"]         = "HU";
    /* Czech Republic */
    G.PARTY_COUNTRY["ODS (CZ)"]              = "CZ";
    G.PARTY_COUNTRY["ANO (CZ)"]              = "CZ";
    G.PARTY_COUNTRY["ČSSD (CZ)"]             = "CZ";
    G.PARTY_COUNTRY["KDU-ČSL (CZ)"]          = "CZ";
    G.PARTY_COUNTRY["KSČM (CZ)"]             = "CZ";
    G.PARTY_COUNTRY["SPD (CZ)"]              = "CZ";
    G.PARTY_COUNTRY["SPOLU (CZ)"]            = "CZ";
    /* New Zealand */
    G.PARTY_COUNTRY["NZ Labour"]             = "NZ";
    G.PARTY_COUNTRY["NZ National"]           = "NZ";
    G.PARTY_COUNTRY["ACT (NZ)"]              = "NZ";
    G.PARTY_COUNTRY["NZ First"]              = "NZ";
    G.PARTY_COUNTRY["Green Party (NZ)"]      = "NZ";
    /* Africa */
    G.PARTY_COUNTRY["NDC (GH)"]              = "GH";
    G.PARTY_COUNTRY["NPP (GH)"]              = "GH";
    G.PARTY_COUNTRY["CCM (TZ)"]              = "TZ";
    G.PARTY_COUNTRY["TPLF (ET)"]             = "ET";
    G.PARTY_COUNTRY["EPRDF (ET)"]            = "ET";
    G.PARTY_COUNTRY["PP (ET)"]               = "ET";
    G.PARTY_COUNTRY["ZANUPF (ZW)"]           = "ZW";
    G.PARTY_COUNTRY["MDC (ZW)"]              = "ZW";
    G.PARTY_COUNTRY["MAS (BO)"]              = "BO";
    G.PARTY_COUNTRY["MNRV (BO)"]             = "BO";
    /* SE Asia */
    G.PARTY_COUNTRY["Golkar (ID)"]           = "ID";
    G.PARTY_COUNTRY["PDI-P (ID)"]            = "ID";
    G.PARTY_COUNTRY["Gerindra (ID)"]         = "ID";
    G.PARTY_COUNTRY["PAP (SG)"]              = "SG";
    G.PARTY_COUNTRY["WP (SG)"]               = "SG";
    G.PARTY_COUNTRY["Pheu Thai"]             = "TH";
    G.PARTY_COUNTRY["Democrat Party (TH)"]   = "TH";
    G.PARTY_COUNTRY["Move Forward"]          = "TH";
    G.PARTY_COUNTRY["UMNO (MY)"]             = "MY";
    G.PARTY_COUNTRY["PKR (MY)"]              = "MY";
    G.PARTY_COUNTRY["DAP (MY)"]              = "MY";
    G.PARTY_COUNTRY["PAS (MY)"]              = "MY";
  }

  /* ═══════════════════════════════════════════════════════════════
     JAPAN — LDP
     ═══════════════════════════════════════════════════════════════ */
  I("Shigeru Yoshida",       "LDP","e3",["pm","foreign","leader"],                            [65,78,58,70,65], "LDP founding PM; San Francisco Peace Treaty");
  I("Nobusuke Kishi",        "LDP","e4",["pm","foreign","trade","leader"],                    [55,75,50,62,58], "PM; security treaty; grandfather of Abe");
  I("Hayato Ikeda",          "LDP","e4",["pm","chancellor","trade","leader"],                 [60,75,52,65,60], "Income-doubling plan; high growth architect");
  I("Eisaku Sato",           "LDP","e4",["pm","foreign","leader"],                            [60,78,55,65,60], "Nobel Peace Prize; Okinawa return; longest LDP PM");
  I("Kakuei Tanaka",         "LDP","e5",["pm","chancellor","work","leader"],                  [62,72,60,62,60], "LDP PM; Lockheed scandal; rural development");
  I("Takeo Miki",            "LDP","e5",["pm","environment","leader"],                        [58,72,55,58,58], "Reform PM after Tanaka scandal");
  I("Takeo Fukuda",          "LDP","e5",["pm","chancellor","foreign","leader"],              [58,75,52,62,58], "LDP PM; Fukuda Doctrine; fiscal hawk");
  I("Masayoshi Ohira",       "LDP","e5",["pm","chancellor","leader"],                         [58,72,52,62,58], "LDP PM; died in office during election campaign");
  I("Yasuhiro Nakasone",     "LDP","e5",["pm","defence","foreign","leader"],                  [60,78,58,65,60], "LDP PM; alliance with Reagan; 'unsinkable carrier'");
  I("Noboru Takeshita",      "LDP","e5",["pm","chancellor","leader"],                         [52,72,48,55,55], "LDP PM; introduced consumption tax; Recruit scandal");
  I("Kiichi Miyazawa",       "LDP","e6",["pm","chancellor","foreign","leader"],               [58,78,52,65,58], "LDP PM; burst bubble economy; UN peacekeeping");
  I("Morihiro Hosokawa",     "DPJ (JP)","e6",["pm","leader"],                                 [58,62,55,55,52], "Coalition PM who ended 38 years of LDP rule");
  I("Tomiichi Murayama",     "JSP (JP)","e6",["pm","work","leader"],                          [55,65,50,55,52], "Socialist PM who apologised for WWII");
  I("Ryutaro Hashimoto",     "LDP","e6",["pm","health","trade","leader"],                     [58,75,52,62,58], "LDP PM; big bang financial reforms");
  I("Keizo Obuchi",          "LDP","e7",["pm","chancellor","leader"],                          [56,68,50,58,55], "LDP PM; fiscal stimulus after banking crisis; died in office");
  I("Yoshiro Mori",          "LDP","e7",["pm","education","leader"],                           [45,65,40,48,50], "LDP PM; gaffe-prone; Olympics 2020 resignation too");
  I("Junichiro Koizumi",     "LDP","e7",["pm","leader","work"],                               [70,72,68,65,68], "LDP maverick; postal privatisation; Lion heart");
  I("Shinzo Abe",            "LDP","e7",["pm","foreign","defence","leader"],                  [62,72,60,65,65], "LDP longest-serving PM; Abenomics; assassinated 2022");
  I("Yasuo Fukuda",          "LDP","e7",["pm","chancellor","foreign","leader"],               [55,68,50,58,54], "LDP PM 2007–08; resigned abruptly");
  I("Taro Aso",              "LDP","e7",["pm","chancellor","foreign","leader"],               [52,72,50,55,52], "LDP PM 2008–09; gaffe-prone; long-serving finance minister");
  I("Yukio Hatoyama",        "DPJ (JP)","e7",["pm","foreign","leader"],                       [52,60,50,48,48], "DPJ PM; Futenma promise collapse");
  I("Naoto Kan",             "DPJ (JP)","e7",["pm","chancellor","leader"],                    [55,62,52,52,52], "DPJ PM; Fukushima disaster");
  I("Yoshihiko Noda",        "DPJ (JP)","e7",["pm","chancellor","leader"],                   [52,62,48,52,50], "DPJ PM; consumption tax increase; early elections");
  I("Fumio Kishida",         "LDP","e7",["pm","foreign","leader"],                            [56,68,52,58,56], "LDP PM 2021–24; nuclear-free zones advocate");
  I("Shigeru Ishiba",        "LDP","e7",["pm","defence","leader"],                            [55,65,52,55,55], "LDP PM from 2024; security hawk");
  I("Sanae Takaichi",        "LDP","e7",["pm","digital","leader"],                            [54,62,52,52,54], "LDP leadership contender; digital minister");
  I("Yuriko Koike",          "LDP","e7",["pm","environment","leader"],                        [60,65,58,58,58], "Tokyo governor; first female LDP cabinet minister");
  I("Ichiro Matsui",         "Nippon Ishin","e7",["pm","leader"],                             [52,60,50,52,52], "Ishin Osaka mayor and party co-leader");
  I("Toru Hashimoto",        "Nippon Ishin","e7",["pm","justice","leader"],                   [60,58,62,52,58], "Ishin co-founder; Osaka double elections");
  I("Nippon Ichiro Matsui",  "Nippon Ishin","e7",["leader"],                                  [50,58,50,50,52], "Ishin Osaka leader");
  I("Kazuo Ueda",            "LDP","e7",["chancellor","business"],                             [52,62,48,55,48], "Bank of Japan governor");
  I("Tetsuya Yamagiwa",      "LDP","e7",["business","trade"],                                 [48,55,45,50,48], "LDP economy minister");
  I("Toshihiro Nikai",       "LDP","e6",["leader","trade","foreign"],                         [48,72,42,50,55], "LDP faction boss");
  I("Ichiro Matsui",         "Nippon Ishin","e6",["pm","leader"],                             [52,60,50,52,52], "Ishin Osaka leader");
  I("Komeito Akihiro Ota",   "Komeito (JP)","e7",["trade","transport","work"],               [50,62,48,52,50], "Komeito minister");

  /* ── JSP / JCP ────────────────────────────────────────────────── */
  I("Tetsu Katayama",        "JSP (JP)","e3",["pm","work","leader"],                          [58,68,52,58,55], "Japan's first socialist PM 1947–48");
  I("Inejiro Asanuma",       "JSP (JP)","e4",["leader","work","foreign"],                     [60,65,62,55,60], "JSP leader; assassinated on live TV 1960");
  I("Saburo Eda",            "JSP (JP)","e4",["leader","work"],                               [55,65,52,52,55], "JSP structural reformist");
  I("Masashi Ishibashi",     "JSP (JP)","e5",["leader","foreign"],                            [52,60,50,50,52], "JSP anti-nuclear leader 1983–86");
  I("Takako Doi",            "JSP (JP)","e6",["pm","leader"],                                  [58,62,58,52,58], "First female major party leader in Japan");
  I("Kenji Miyamoto",        "JCP (JP)","e4",["leader","work"],                               [52,68,52,50,55], "JCP leader 1958–2000; 42-year tenure");
  I("Tetsuzo Fuwa",          "JCP (JP)","e5",["leader","work"],                               [50,65,50,48,52], "JCP chairman 1982–2006");
  I("Kazuo Shii",            "JCP (JP)","e7",["leader","pm","work"],                          [52,62,52,50,54], "JCP chairman from 2000");
  I("Tomoko Tamura",         "JCP (JP)","e7",["health","work","leader"],                      [50,55,52,48,52], "JCP health spokesperson");

  /* ═══════════════════════════════════════════════════════════════
     SOUTH KOREA
     ═══════════════════════════════════════════════════════════════ */
  I("Syngman Rhee",          "DLP (KR)","e3",["pm","foreign","leader"],                       [55,68,55,55,52], "Republic of Korea founding PM; authoritarian");
  I("Park Chung-hee",        "DLP (KR)","e4",["pm","defence","business","leader"],            [48,72,42,55,50], "Military PM; economic miracle; assassinated 1979");
  I("Chun Doo-hwan",         "DLP (KR)","e5",["pm","defence","leader"],                       [38,60,35,42,38], "Military PM 1980–88; Gwangju massacre");
  I("Roh Tae-woo",           "GNP (KR)","e5",["pm","leader","foreign"],                       [50,65,45,50,50], "Military-turned-democratic PM; Seoul Olympics");
  I("Kim Young-sam",         "GNP (KR)","e6",["pm","justice","leader"],                       [58,68,55,58,55], "GNP PM; first civilian PM after 30 years");
  I("Kim Dae-jung",          "Democratic Party (KR)","e6",["pm","foreign","leader"],           [65,75,65,65,62], "DP PM; Nobel Peace Prize; Sunshine Policy");
  I("Roh Moo-hyun",          "Democratic Party (KR)","e7",["pm","justice","leader"],           [60,62,62,55,58], "DP PM; died after impeachment probe");
  I("Lee Myung-bak",         "GNP (KR)","e7",["pm","business","trade","leader"],              [55,68,50,58,55], "GNP PM; 'Bulldozer'; Korea-US FTA");
  I("Park Geun-hye",         "GNP (KR)","e7",["pm","leader","foreign"],                       [48,65,42,48,48], "First female South Korean PM; impeached/imprisoned");
  I("Moon Jae-in",           "Democratic Party (KR)","e7",["pm","justice","foreign","leader"],  [60,68,58,62,58], "DP PM; Singapore Summit with Kim Jong-un");
  I("Yoon Suk-yeol",         "PPP (KR)","e7",["pm","justice","leader"],                       [48,55,45,45,45], "PPP PM; martial law disaster 2024");
  I("Lee Jae-myung",         "Democratic Party (KR)","e7",["pm","leader","work"],             [56,58,58,52,55], "DP leader; Seongnam mayor");
  I("Han Dong-hoon",         "PPP (KR)","e7",["pm","justice","leader"],                       [50,55,50,50,50], "PPP leader; former prosecutor general");
  I("Cho Kuk",               "Democratic Party (KR)","e7",["justice","education","leader"],   [52,55,52,48,50], "DP; justice minister; later his own party");
  I("Kim Jong-pil",          "Democratic Party (KR)","e4",["pm","foreign","deputy","leader"], [55,72,50,55,55], "KCIA founder; PM twice");
  I("Chung Se-kyun",         "Democratic Party (KR)","e7",["pm","leader"],                    [50,58,48,50,50], "DP PM 2020–21");
  I("Lee Nak-yon",           "Democratic Party (KR)","e7",["pm","leader","foreign"],          [54,60,52,52,52], "DP PM 2017–20; party leader");
  I("Han Myeong-sook",       "Democratic Party (KR)","e7",["pm","environment","leader"],      [52,60,52,52,50], "DP first female South Korean PM");
  I("Kim Hwang-sik",         "GNP (KR)","e7",["pm","chancellor"],                             [50,58,45,50,48], "GNP PM under Park Geun-hye");
  I("Hwang Kyo-ahn",         "GNP (KR)","e7",["pm","justice","leader"],                       [48,55,45,48,48], "GNP caretaker PM; acting president during Park impeachment");

  /* ═══════════════════════════════════════════════════════════════
     POLAND
     ═══════════════════════════════════════════════════════════════ */
  I("Józef Piłsudski",       "PZPR (PL)","e2",["pm","defence","leader"],                      [68,72,65,65,62], "Poland's independence hero; coup 1926; sanacja regime");
  I("Ignacy Jan Paderewski", "PSL (PL)","e2",["pm","culture","foreign"],                      [65,60,70,60,55], "Pianist PM; signed Versailles for Poland");
  I("Władysław Gomułka",     "PZPR (PL)","e4",["pm","leader"],                                [48,68,42,50,50], "PZPR leader; led Poland to 'Polish October'");
  I("Edward Gierek",         "PZPR (PL)","e5",["pm","chancellor","leader"],                   [50,68,48,52,52], "PZPR leader; borrowed to modernise; debt crisis");
  I("Wojciech Jaruzelski",   "PZPR (PL)","e5",["pm","defence","leader"],                      [42,68,35,48,45], "Military PM; martial law 1981; last communist president");
  I("Lech Wałęsa",           "SLD (PL)","e6",["pm","work","leader"],                           [65,65,65,55,55], "Solidarity founder; Nobel Prize; President 1990–95");
  I("Tadeusz Mazowiecki",    "Civic Platform (PL)","e6",["pm","foreign","leader"],             [62,72,60,65,60], "First post-communist PM; shock therapy");
  I("Aleksander Kwaśniewski","SLD (PL)","e6",["pm","foreign","leader"],                       [60,72,60,62,60], "SLD President twice; EU accession");
  I("Józef Oleksy",          "SLD (PL)","e6",["pm","leader"],                                  [52,62,50,52,52], "SLD PM; spy scandal");
  I("Włodzimierz Cimoszewicz","SLD (PL)","e6",["pm","justice","foreign","leader"],            [56,65,52,55,54], "SLD PM and foreign minister");
  I("Leszek Miller",         "SLD (PL)","e6",["pm","home","leader"],                           [52,65,48,52,50], "SLD PM; Iraq commitment");
  I("Donald Tusk",           "Civic Platform (PL)","e7",["pm","chancellor","foreign","leader"],  [65,72,65,65,65], "PO PM; European Council president; returned 2023");
  I("Jarosław Kaczyński",    "PiS (PL)","e7",["pm","leader"],                                  [55,70,55,55,62], "PiS supreme leader; twin of Lech");
  I("Lech Kaczyński",        "PiS (PL)","e7",["pm","justice","leader"],                        [55,68,52,55,55], "PiS President; died Smolensk 2010");
  I("Beata Szydło",          "PiS (PL)","e7",["pm","work","leader"],                           [55,62,52,52,55], "PiS PM 2015–17");
  I("Mateusz Morawiecki",    "PiS (PL)","e7",["pm","chancellor","leader"],                    [56,65,52,56,55], "PiS PM 2017–23");
  I("Waldemar Pawlak",       "PSL (PL)","e6",["pm","agriculture","leader"],                   [52,62,48,52,52], "PSL PM twice");
  I("Zbigniew Ziobro",       "PiS (PL)","e7",["justice","leader"],                             [50,62,52,48,52], "PiS justice minister; rule of law controversy");
  I("Andrzej Duda",          "PiS (PL)","e7",["pm","leader"],                                  [52,60,52,48,52], "PiS President 2015–25");
  I("Radosław Sikorski",     "Civic Platform (PL)","e7",["foreign","defence","leader"],       [60,68,60,60,58], "PO foreign and defence minister");
  I("Bronisław Komorowski",  "Civic Platform (PL)","e6",["pm","defence","leader"],            [56,65,52,55,55], "PO President 2010–15");
  I("Władysław Kosiniak-Kamysz","PSL (PL)","e7",["pm","work","defence","leader"],            [55,60,52,54,54], "PSL leader and defence minister from 2023");
  I("Szymon Hołownia",       "PSL (PL)","e7",["pm","leader"],                                  [58,52,60,50,52], "Poland 2050 leader; Parliament speaker from 2023");
  I("Grzegorz Braun",        "Konfederacja (PL)","e7",["leader"],                             [42,50,45,38,42], "Konfederacja antisemitic politician");
  I("Janusz Korwin-Mikke",   "Konfederacja (PL)","e6",["chancellor","leader"],                [45,55,50,40,45], "Libertarian-nationalist MEP; provocateur");
  I("Krzysztof Bosak",       "Konfederacja (PL)","e7",["leader","pm","foreign"],              [50,52,52,46,50], "Konfederacja presidential candidate");

  /* ═══════════════════════════════════════════════════════════════
     HUNGARY
     ═══════════════════════════════════════════════════════════════ */
  I("János Kádár",           "MSZMP (HU)","e4",["pm","leader"],                               [48,72,42,52,50], "Hungary's 'goulash communism' leader 1956–88");
  I("Imre Nagy",             "MSZMP (HU)","e4",["pm","agriculture","leader"],                  [55,65,52,52,50], "PM who led 1956 uprising; executed 1958");
  I("Mátyás Rákosi",         "MSZMP (HU)","e3",["pm","leader"],                               [32,60,30,35,38], "Stalinist dictator 1948–56");
  I("József Antall",         "Fidesz","e6",["pm","health","foreign","leader"],                 [60,68,55,60,58], "First post-communist PM; died in office 1993");
  I("Péter Boross",          "Fidesz","e6",["pm","home","leader"],                              [52,60,48,52,50], "Caretaker PM after Antall");
  I("Gyula Horn",            "MSZP (HU)","e6",["pm","foreign","chancellor","leader"],          [58,72,55,62,58], "MSZP PM; opened Austria border 1989; HU PM 1994–98");
  I("Viktor Orbán",          "Fidesz","e7",["pm","leader","chancellor"],                       [60,72,60,62,62], "Fidesz; liberal to nationalist transformation; four terms");
  I("Péter Medgyessy",       "MSZP (HU)","e7",["pm","chancellor","leader"],                   [52,62,48,52,50], "MSZP PM 2002–04; communist past exposed");
  I("Ferenc Gyurcsány",      "MSZP (HU)","e7",["pm","chancellor","leader"],                   [48,62,48,48,48], "MSZP PM; 'lies speech' riots; founded DK");
  I("Gordon Bajnai",         "MSZP (HU)","e7",["pm","chancellor","leader"],                   [52,60,48,52,48], "MSZP technocrat PM 2009–10");
  I("Péter Márki-Zay",       "DK (HU)","e7",["pm","leader","chancellor"],                     [52,52,52,48,48], "United opposition candidate 2022");
  I("Péter Magyar",          "Momentum (HU)","e7",["pm","leader"],                             [58,50,60,48,52], "TISZA party leader; Orbán defector; 2024 MEP surprise");
  I("Gábor Vona",            "Jobbik (HU)","e7",["pm","leader"],                               [52,55,55,48,52], "Jobbik leader; tried to moderate the party");
  I("Péter Jakab",           "Jobbik (HU)","e7",["pm","leader"],                               [48,52,50,44,48], "Jobbik leader after Vona");

  /* ═══════════════════════════════════════════════════════════════
     CZECH REPUBLIC
     ═══════════════════════════════════════════════════════════════ */
  I("Václav Havel",          "ODS (CZ)","e6",["pm","culture","leader","foreign"],             [70,68,72,65,60], "Playwright president; Charter 77; Velvet Revolution");
  I("Václav Klaus",          "ODS (CZ)","e6",["pm","chancellor","leader","foreign"],          [60,72,58,62,60], "ODS PM twice; President twice; Thatcherite");
  I("Petr Pithart",          "ODS (CZ)","e6",["pm","leader"],                                  [56,65,55,56,52], "Civic Forum PM of Czech lands 1990–92");
  I("Miloš Zeman",           "ČSSD (CZ)","e6",["pm","chancellor","leader"],                   [55,68,58,55,55], "ČSSD PM 1998–2002; populist President");
  I("Vladimír Špidla",       "ČSSD (CZ)","e7",["pm","work","leader"],                         [52,60,50,52,50], "ČSSD PM 2002–04");
  I("Jiří Paroubek",         "ČSSD (CZ)","e7",["pm","work","leader"],                          [50,60,50,48,50], "ČSSD PM 2005–06; party leader");
  I("Stanislav Gross",       "ČSSD (CZ)","e7",["pm","home","leader"],                          [48,55,45,48,46], "ČSSD PM; apartment scandal");
  I("Mirek Topolánek",       "ODS (CZ)","e7",["pm","trade","leader"],                          [52,60,50,50,50], "ODS PM 2006–09; EU presidency then fall");
  I("Petr Nečas",            "ODS (CZ)","e7",["pm","work","leader"],                           [50,60,48,50,50], "ODS PM 2010–13; spy/affair scandal");
  I("Jiří Rusnok",           "ANO (CZ)","e7",["pm","chancellor","leader"],                    [50,58,45,52,48], "ANO technocrat caretaker PM");
  I("Bohuslav Sobotka",      "ČSSD (CZ)","e7",["pm","chancellor","leader"],                   [52,60,48,52,50], "ČSSD PM 2014–17");
  I("Andrej Babiš",          "ANO (CZ)","e7",["pm","business","chancellor","leader"],         [52,60,50,50,52], "ANO billionaire media and agribusiness PM");
  I("Petr Fiala",            "ODS (CZ)","e7",["pm","education","leader"],                     [56,62,52,55,55], "SPOLU coalition PM from 2021");
  I("Markéta Pekarová Adamová","SPOLU (CZ)","e7",["pm","leader","trade"],                    [54,58,52,52,52], "TOP 09/SPOLU leader; Parliament speaker");
  I("Tomio Okamura",         "SPD (CZ)","e7",["leader","home"],                               [48,52,50,44,48], "SPD Czech populist, anti-Islam");
  I("Kateřina Konečná",      "KSČM (CZ)","e7",["work","leader","foreign"],                   [50,58,52,48,52], "KSČM MEP and leader");

  /* ═══════════════════════════════════════════════════════════════
     NEW ZEALAND
     ═══════════════════════════════════════════════════════════════ */
  I("Michael Joseph Savage", "NZ Labour","e3",["pm","work","health","leader"],                [65,68,65,62,62], "NZ Labour PM; welfare state founder");
  I("Walter Nash",           "NZ Labour","e3",["pm","chancellor","leader"],                   [58,68,52,58,55], "NZ Labour PM 1957–60");
  I("Norman Kirk",           "NZ Labour","e5",["pm","foreign","work","leader"],               [60,65,60,58,58], "Labour PM; anti-nuclear; died in office");
  I("Bill Rowling",          "NZ Labour","e5",["pm","chancellor","leader"],                    [54,62,50,52,52], "Labour PM 1974–75; lost to Muldoon");
  I("David Lange",           "NZ Labour","e5",["pm","foreign","leader","education"],           [65,65,68,60,60], "Labour PM; anti-nuclear; Rogernomics");
  I("Mike Moore",            "NZ Labour","e6",["pm","trade","leader"],                         [55,62,55,55,52], "Labour PM briefly 1990; WTO director-general");
  I("Helen Clark",           "NZ Labour","e6",["pm","chancellor","foreign","leader"],          [65,78,60,68,65], "Labour PM 1999–2008; UNDP head");
  I("Phil Goff",             "NZ Labour","e7",["pm","leader","foreign"],                       [56,68,52,56,54], "Labour leader 2008–11; Auckland mayor");
  I("David Shearer",         "NZ Labour","e7",["foreign","leader","pm"],                       [52,58,50,52,50], "Labour leader 2011–13");
  I("David Cunliffe",        "NZ Labour","e7",["pm","chancellor","leader"],                    [54,58,52,52,52], "Labour leader 2013–14");
  I("Andrew Little",         "NZ Labour","e7",["pm","justice","work","leader"],               [54,60,52,52,52], "Labour leader 2014–17");
  I("Jacinda Ardern",        "NZ Labour","e7",["pm","health","leader","foreign"],             [70,65,70,62,65], "Labour PM 2017–23; Christchurch response");
  I("Chris Hipkins",         "NZ Labour","e7",["pm","education","health","leader"],           [58,60,55,56,56], "Labour PM 2023; post-Ardern");
  I("Chris Luxon",           "NZ National","e7",["pm","business","leader"],                   [55,58,52,52,55], "National PM from 2023; Air NZ CEO");
  I("Simon Bridges",         "NZ National","e7",["pm","justice","leader"],                    [52,58,52,50,52], "National leader 2018–20");
  I("Judith Collins",        "NZ National","e7",["pm","justice","police","leader"],           [54,65,52,52,54], "National leader 2020–21; 'Crusher Collins'");
  I("Bill English",          "NZ National","e6",["pm","chancellor","leader"],                 [58,68,52,58,58], "National PM 2016–17; surplus chancellor");
  I("Jim Bolger",            "NZ National","e5",["pm","leader","work"],                        [56,68,50,56,55], "National PM 1990–97; MMP referendum");
  I("Jenny Shipley",         "NZ National","e6",["pm","transport","leader"],                  [54,62,50,52,52], "NZ first female PM 1997–99");
  I("Don Brash",             "NZ National","e7",["pm","chancellor","leader"],                  [54,65,52,55,50], "National leader 2003–06; RBNZ governor");
  I("Winston Peters",        "NZ First","e6",["pm","deputy","foreign","leader"],              [62,70,62,58,58], "NZ First founder; kingmaker 1996, 2017");
  I("David Seymour",         "ACT (NZ)","e7",["pm","chancellor","leader","trade"],            [56,58,58,52,56], "ACT leader; Treaty Principles Bill");
  I("Russel Norman",         "Green Party (NZ)","e7",["chancellor","environment","leader"],   [56,60,55,54,54], "Greens co-leader 2006–15");
  I("Metiria Turei",         "Green Party (NZ)","e7",["work","leader"],                        [56,55,60,50,52], "Greens co-leader; resigned after benefit fraud admission");
  I("James Shaw",            "Green Party (NZ)","e7",["environment","chancellor","leader"],   [58,60,55,55,56], "Greens co-leader and climate change minister");
  I("Chlöe Swarbrick",       "Green Party (NZ)","e7",["leader","housing","culture"],         [58,52,60,48,52], "Greens leader from 2024");

  /* ═══════════════════════════════════════════════════════════════
     GHANA
     ═══════════════════════════════════════════════════════════════ */
  I("Kwame Nkrumah",         "NDC (GH)","e4",["pm","foreign","leader"],                       [70,68,72,62,65], "Ghana's independence leader; pan-Africanism");
  I("Kofi Abrefa Busia",     "NPP (GH)","e5",["pm","foreign","leader"],                       [60,65,60,58,55], "Progress Party PM; civilian interlude 1969–72");
  I("Jerry Rawlings",        "NDC (GH)","e5",["pm","defence","leader"],                       [55,65,50,52,52], "NDC military then democratic PM; flight lieutenant turned statesman");
  I("John Atta Mills",       "NDC (GH)","e7",["pm","law","leader"],                           [58,62,55,55,52], "NDC PM 2009–12; died in office");
  I("John Mahama",           "NDC (GH)","e7",["pm","chancellor","work","leader"],             [55,62,52,52,52], "NDC PM 2012–17; returned 2024");
  I("Nana Akufo-Addo",       "NPP (GH)","e7",["pm","justice","foreign","leader"],             [58,65,58,58,56], "NPP PM 2017–25; free SHS education");
  I("J.A. Kufuor",           "NPP (GH)","e6",["pm","chancellor","foreign","leader"],          [60,68,55,60,58], "NPP PM 2001–09; AU chairperson");
  I("Bawumia Mahamudu",      "NPP (GH)","e7",["chancellor","pm","leader"],                    [54,60,52,54,54], "NPP VP and 2024 presidential candidate");
  I("Mahama Ayariga",        "NDC (GH)","e7",["health","foreign"],                            [50,55,50,50,48], "NDC MP and minister");
  I("Alan Kyeremanten",      "NPP (GH)","e7",["trade","business","pm"],                       [52,58,50,52,50], "NPP trade minister and presidential candidate");

  /* ═══════════════════════════════════════════════════════════════
     TANZANIA / ETHIOPIA / ZIMBABWE
     ═══════════════════════════════════════════════════════════════ */
  I("Julius Nyerere",        "CCM (TZ)","e4",["pm","foreign","leader","work"],                [70,72,68,65,68], "CCM Mwalimu; Ujamaa socialism; one-party state founder");
  I("Ali Hassan Mwinyi",     "CCM (TZ)","e5",["pm","chancellor","leader"],                    [55,68,48,55,52], "CCM PM; economic liberalisation");
  I("Benjamin Mkapa",        "CCM (TZ)","e6",["pm","foreign","leader","chancellor"],          [58,68,52,58,54], "CCM PM; privatisation and Poverty Reduction");
  I("Jakaya Kikwete",        "CCM (TZ)","e7",["pm","foreign","leader"],                       [58,65,55,55,52], "CCM PM; AU chairperson");
  I("John Magufuli",         "CCM (TZ)","e7",["pm","work","leader"],                          [48,55,50,45,48], "CCM PM; 'Bulldozer'; COVID denialism; died 2021");
  I("Samia Suluhu Hassan",   "CCM (TZ)","e7",["pm","leader","foreign"],                       [56,58,54,54,52], "CCM first female Tanzanian PM");
  I("Mengistu Haile Mariam", "TPLF (ET)","e5",["pm","defence","leader"],                      [32,60,32,35,38], "Derg dictator; Red Terror");
  I("Meles Zenawi",          "TPLF (ET)","e6",["pm","foreign","chancellor","leader"],         [52,72,52,56,55], "TPLF/EPRDF PM; led Ethiopia's growth; died 2012");
  I("Hailemariam Desalegn",  "EPRDF (ET)","e7",["pm","foreign","leader"],                     [50,58,48,50,50], "EPRDF PM 2012–18; resigned amid protests");
  I("Abiy Ahmed",            "PP (ET)","e7",["pm","foreign","peace","leader"],                 [62,58,60,56,58], "PP PM; Nobel Peace Prize; Tigray war");
  I("Robert Mugabe",         "ZANUPF (ZW)","e5",["pm","education","leader","foreign"],        [52,72,55,50,55], "ZANU-PF liberation hero turned authoritarian; 37 years");
  I("Morgan Tsvangirai",     "MDC (ZW)","e6",["pm","work","leader"],                          [60,60,60,55,56], "MDC founder; PM under unity government");
  I("Emmerson Mnangagwa",    "ZANUPF (ZW)","e7",["pm","defence","chancellor","leader"],       [45,68,40,48,50], "ZANU-PF PM from 2017; crocodile");
  I("Nelson Chamisa",        "MDC (ZW)","e7",["pm","leader"],                                  [56,52,58,48,52], "MDC/CCC leader; disputed elections");

  /* ═══════════════════════════════════════════════════════════════
     BOLIVIA, INDONESIA, SINGAPORE, THAILAND, MALAYSIA
     ═══════════════════════════════════════════════════════════════ */
  I("Evo Morales",           "MAS (BO)","e7",["pm","work","leader","agriculture"],            [62,62,62,56,60], "MAS; first indigenous Bolivian PM; coca grower");
  I("Luis Arce",             "MAS (BO)","e7",["pm","chancellor","leader"],                    [52,55,48,52,50], "MAS PM from 2020; former economy minister");
  I("Jeanine Áñez",          "MNRV (BO)","e7",["pm","leader"],                               [42,45,42,38,38], "Right-wing caretaker PM 2019–20; convicted");
  I("Víctor Paz Estenssoro",  "MNRV (BO)","e4",["pm","chancellor","leader"],                  [60,70,58,60,58], "MNR PM four times; revolution 1952 and shock therapy 1985");
  I("Suharto",               "Golkar (ID)","e4",["pm","defence","leader"],                    [40,72,35,48,45], "New Order dictator 1965–98; economic growth and corruption");
  I("Sukarno",               "PDI-P (ID)","e3",["pm","foreign","leader"],                     [65,65,70,58,60], "Founding father; non-alignment; guided democracy");
  I("Megawati Sukarnoputri", "PDI-P (ID)","e7",["pm","leader"],                               [58,60,52,52,55], "PDI-P PM 2001–04; Sukarno's daughter");
  I("Joko Widodo",           "PDI-P (ID)","e7",["pm","trade","work","leader"],               [62,62,58,58,58], "PDI-P PM 2014–24; furniture salesman to president");
  I("Prabowo Subianto",      "Gerindra (ID)","e7",["pm","defence","leader"],                  [52,62,48,52,52], "Gerindra PM from 2024; Suharto's ex-son-in-law");
  I("Lee Kuan Yew",          "PAP (SG)","e4",["pm","foreign","leader"],                       [70,82,68,78,75], "PAP founding PM; Singapore's transformation");
  I("Goh Chok Tong",         "PAP (SG)","e5",["pm","chancellor","health","leader"],           [60,72,55,62,58], "PAP PM 1990–2004");
  I("Lee Hsien Loong",       "PAP (SG)","e7",["pm","chancellor","foreign","leader"],          [62,75,58,65,62], "PAP PM 2004–24; Lee Kuan Yew's son");
  I("Lawrence Wong",         "PAP (SG)","e7",["pm","chancellor","leader"],                    [58,62,55,58,55], "PAP PM from 2024");
  I("Pritam Singh",          "WP (SG)","e7",["pm","leader"],                                   [56,52,56,50,52], "WP leader; first official Leader of Opposition");
  I("Thaksin Shinawatra",    "Pheu Thai","e7",["pm","business","chancellor","leader"],        [58,65,58,55,58], "Pheu Thai billionaire PM; ousted by coup 2006");
  I("Yingluck Shinawatra",   "Pheu Thai","e7",["pm","leader"],                                 [55,55,52,50,50], "Pheu Thai PM 2011–14; Thaksin's sister; ousted");
  I("Prayuth Chan-ocha",     "Democrat Party (TH)","e7",["pm","defence","leader"],            [40,58,35,42,40], "Military coup leader turned PM 2014–23");
  I("Pita Limjaroenrat",     "Move Forward","e7",["pm","leader","business"],                  [60,50,62,50,56], "Move Forward PM candidate; party dissolved");
  I("Anwar Ibrahim",         "PKR (MY)","e6",["pm","chancellor","deputy","leader"],           [60,72,62,60,58], "PKR PM from 2022; imprisoned twice, vindicated");
  I("Mahathir Mohamad",      "UMNO (MY)","e5",["pm","chancellor","trade","leader"],          [58,78,58,65,60], "UMNO then Bersatu PM; twice PM; 1981–2003, 2018–20");
  I("Najib Razak",           "UMNO (MY)","e7",["pm","chancellor","leader"],                   [48,65,48,48,48], "UMNO PM; 1MDB corruption scandal; imprisoned");
  I("Muhyiddin Yassin",      "UMNO (MY)","e7",["pm","home","leader"],                         [50,62,45,50,48], "Bersatu caretaker PM 2020–21");
  I("Lim Guan Eng",          "DAP (MY)","e7",["chancellor","pm","leader"],                    [56,62,55,56,54], "DAP secretary-general and finance minister");
  I("Tony Pua",              "DAP (MY)","e7",["chancellor","business"],                        [52,55,52,50,50], "DAP finance shadow minister; 1MDB investigator");
  I("Abdul Hadi Awang",      "PAS (MY)","e6",["pm","leader"],                                  [48,60,50,46,50], "PAS president; Islamist PM candidate");

  /* ═══════════════════════════════════════════════════════════════
     EXTRA FILL — misc countries + broader historical
     ═══════════════════════════════════════════════════════════════ */
  /* Vietnam */
  I("Ho Chi Minh",           "Chinese Communist Party","e3",["pm","leader","foreign"],        [70,68,72,62,68], "Vietnamese independence and communist leader");
  I("Vo Nguyen Giap",        "Chinese Communist Party","e3",["defence","leader"],             [62,65,55,60,55], "Vietnamese military genius; Dien Bien Phu");
  I("Nguyen Van Linh",       "Chinese Communist Party","e5",["pm","leader"],                  [50,65,45,52,50], "Vietnam's Doi Moi reformist leader");
  I("Do Muoi",               "Chinese Communist Party","e6",["pm","leader"],                  [48,62,42,50,48], "Vietnam PM 1988–91; party SG 1991–97");
  I("Nguyen Tan Dung",       "Chinese Communist Party","e7",["pm","chancellor","leader"],     [52,65,48,52,52], "Vietnam PM 2006–16");
  I("Nguyen Xuan Phuc",      "Chinese Communist Party","e7",["pm","chancellor","leader"],     [52,60,48,52,50], "Vietnam PM 2016–21; President 2021–23");
  I("Pham Minh Chinh",       "Chinese Communist Party","e7",["pm","leader"],                  [50,58,46,50,50], "Vietnam PM from 2021");
  I("To Lam",                "Chinese Communist Party","e7",["pm","home","leader"],           [48,55,44,48,48], "Vietnam party SG from 2024; ex-security minister");
  /* Philippines */
  I("Ferdinand Marcos",      "NDP (EG)","e4",["pm","defence","leader"],                       [52,68,55,52,52], "Philippines strongman 1965–86; kleptocrat");
  I("Corazon Aquino",        "NDC (GH)","e5",["pm","leader","justice"],                        [62,55,60,56,52], "Philippines People Power PM 1986–92");
  I("Fidel Ramos",           "NDC (GH)","e6",["pm","defence","leader"],                        [58,65,52,58,55], "Philippines PM 1992–98; moderniser");
  I("Joseph Estrada",        "NDC (GH)","e7",["pm","leader"],                                  [50,55,52,42,48], "Philippines actor-PM; ousted 2001 People Power II");
  I("Gloria Macapagal Arroyo","NDC (GH)","e7",["pm","chancellor","leader"],                   [55,68,52,58,52], "Philippines PM 2001–10; economics PhD");
  I("Benigno Aquino III",    "NDC (GH)","e7",["pm","leader","justice"],                       [58,58,55,55,52], "Philippines PM 2010–16; Corazon's son");
  I("Rodrigo Duterte",       "NDP (EG)","e7",["pm","home","leader"],                          [45,55,50,42,48], "Philippines death squad PM 2016–22");
  I("Ferdinand Marcos Jr.",  "NDP (EG)","e7",["pm","agriculture","leader"],                   [45,52,45,42,48], "Philippines PM from 2022; Marcos dictator's son");
  /* Romania */
  I("Nicolae Ceaușescu",     "PZPR (PL)","e4",["pm","leader"],                                [32,65,35,38,40], "Romanian communist dictator; executed 1989");
  I("Ion Iliescu",           "SLD (PL)","e6",["pm","leader"],                                  [50,65,48,50,50], "Post-communist PM; FSN/PDSR/PSD");
  I("Traian Băsescu",        "ODS (CZ)","e7",["pm","foreign","leader"],                       [55,65,55,55,52], "PDL President twice; controversial");
  I("Klaus Iohannis",        "ODS (CZ)","e7",["pm","education","leader"],                     [58,65,52,58,54], "PNL/PNL President; minority PM candidate");
  I("Victor Ponta",          "ČSSD (CZ)","e7",["pm","justice","leader"],                      [52,60,50,50,50], "PSD PM 2012–15; resigned amid corruption probe");
  /* Slovakia */
  I("Vladimír Mečiar",       "Fidesz","e6",["pm","leader","home"],                            [50,60,52,48,50], "Slovakia strongman; three-time PM 1990–98");
  I("Mikuláš Dzurinda",      "ODS (CZ)","e7",["pm","foreign","chancellor","leader"],          [56,65,50,58,54], "SDKÚ PM; EU/NATO accession");
  I("Ivan Gašparovič",       "Fidesz","e6",["pm","leader"],                                    [48,58,44,48,46], "HZS/ĽS-HZDS President");
  I("Robert Fico",           "ČSSD (CZ)","e7",["pm","chancellor","foreign","leader"],         [55,65,55,52,55], "Smer PM; nationalist-populist; survived 2024 assassination");
  I("Peter Pellegrini",      "ČSSD (CZ)","e7",["pm","health","leader"],                       [52,58,50,50,50], "Hlas President from 2024");

})();

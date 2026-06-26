/* ============================================================
   650 — POLITICIANS EXPANSION VII
   Italy deep dive + Spain deep dive + Scandinavia/Nordic
   + Netherlands/Belgium/Austria/Switzerland/Portugal/Greece
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
    if (!G.PARTIES[label]) G.PARTIES[label] = { label: label, lineage: lineage, colour: colour, cap: cap || 650 };
    if (G.PARTY_ALIGN && !(label in G.PARTY_ALIGN)) G.PARTY_ALIGN[label] = align || 0;
    if (G.LINEAGE_ALIGN && !(lineage in G.LINEAGE_ALIGN)) G.LINEAGE_ALIGN[lineage] = align || 0;
  }

  /* ── Party registrations ──────────────────────────────────────── */
  /* Italy */
  reg("Christian Democracy (IT)",   "DC_IT",   "#0070c0",  0.3, 630);
  reg("Italian Communist Party",    "PCI_IT",  "#cc0000", -1.8, 630);
  reg("Italian Socialist Party",    "PSI_IT",  "#e53935", -0.8, 630);
  reg("Forza Italia",               "FI_IT",   "#003189",  0.8, 630);
  reg("Lega Nord",                  "Lega_IT", "#009246",  1.5, 630);
  reg("Five Star Movement",         "M5S_IT",  "#ffd700",  0.0, 630);
  reg("Brothers of Italy",          "FdI_IT",  "#1c3f6e",  1.8, 630);
  reg("Partito Democratico (IT)",   "PD_IT",   "#e53935", -0.5, 630);
  reg("National Alliance (IT)",     "AN_IT",   "#1c3f6e",  1.5, 630);
  reg("Action Party (IT)",          "Az_IT",   "#ef5350", -0.2, 630);
  reg("Italian Liberal Party",      "PLI_IT",  "#0070c0",  0.5, 630);
  reg("Italian Republican Party",   "PRI_IT",  "#009246",  0.2, 630);
  reg("Italian Democratic Socialist","PSDI_IT","#f1c40f", -0.3, 630);
  reg("New Democracy (IT)",         "ND_IT",   "#003189",  1.0, 630);
  reg("Movimento Sociale Italiano",  "MSI_IT",  "#1c3f6e",  2.0, 630);
  /* Spain */
  reg("PSOE",                       "PSOE_ES", "#e53935", -0.8, 350);
  reg("People's Party (ES)",        "PP_ES",   "#003189",  0.8, 350);
  reg("Podemos",                    "Pod_ES",  "#6a0dad", -1.5, 350);
  reg("Vox",                        "Vox_ES",  "#5c0a00",  2.0, 350);
  reg("Ciudadanos",                 "Cs_ES",   "#e87722",  0.3, 350);
  reg("Falange",                    "Falange", "#000000",  2.5, 350);
  reg("Communist Party (ES)",       "PCE_ES",  "#cc0000", -2.0, 350);
  reg("Sumar (ES)",                 "Sumar_ES","#8e24aa", -1.3, 350);
  reg("ERC",                        "ERC_ES",  "#ffd700", -1.0, 350);
  reg("Junts",                      "Junts_ES","#007ac1", -0.2, 350);
  reg("CiU",                        "CiU_ES",  "#007ac1",  0.3, 350);
  reg("PNV",                        "PNV_ES",  "#007900",  0.0, 350);
  reg("Convergència Democràtica",   "CDC_ES",  "#007ac1",  0.3, 350);
  /* Scandinavia */
  reg("Swedish Social Democrats",   "SAP_SE",  "#e53935", -0.8, 349);
  reg("Moderate Party (SE)",        "Mod_SE",  "#003189",  0.8, 349);
  reg("Sweden Democrats",           "SD_SE",   "#1c3f6e",  1.8, 349);
  reg("Centre Party (SE)",          "C_SE",    "#009246",  0.0, 349);
  reg("Left Party (SE)",            "V_SE",    "#cc0000", -1.5, 349);
  reg("Christian Democrats (SE)",   "KD_SE",   "#1c3f6e",  0.5, 349);
  reg("Liberal Party (SE)",         "L_SE",    "#0070c0",  0.2, 349);
  reg("Norwegian Labour",           "AP_NO",   "#e53935", -0.8, 169);
  reg("Conservative (NO)",          "H_NO",    "#003189",  0.8, 169);
  reg("Progress Party (NO)",        "FrP_NO",  "#1c3f6e",  1.5, 169);
  reg("Liberal (NO)",               "V_NO",    "#009246",  0.0, 169);
  reg("Christian Democrats (NO)",   "KrF_NO",  "#1c3f6e",  0.3, 169);
  reg("Centre Party (NO)",          "Sp_NO",   "#009246", -0.1, 169);
  reg("Danish Social Democrats",    "A_DK",    "#e53935", -0.8, 179);
  reg("Venstre (DK)",               "V_DK",    "#003189",  0.5, 179);
  reg("Danish People's Party",      "DF_DK",   "#5c0a00",  1.5, 179);
  reg("Social Liberal Party (DK)",  "RV_DK",   "#ff69b4", -0.3, 179);
  reg("Social Democratic Party (FI)","SDP_FI", "#e53935", -0.8, 200);
  reg("National Coalition (FI)",    "KOK_FI",  "#003189",  0.8, 200);
  reg("Centre Party (FI)",          "KESK_FI", "#009246",  0.1, 200);
  reg("Finns Party",                "PS_FI",   "#1c3f6e",  1.5, 200);
  reg("Left Alliance (FI)",         "VAS_FI",  "#cc0000", -1.5, 200);
  /* Greece */
  reg("PASOK",                      "PASOK_GR","#008000", -0.7, 300);
  reg("New Democracy (GR)",         "ND_GR",   "#003189",  0.8, 300);
  reg("Syriza",                     "Syriza_GR","#cc0000",-1.5, 300);
  reg("KKE (GR)",                   "KKE_GR",  "#b71c1c", -2.0, 300);
  reg("Golden Dawn",                "GD_GR",   "#1c3f6e",  2.5, 300);
  reg("Center Union (GR)",          "EK_GR",   "#009246", -0.2, 300);
  /* Netherlands */
  reg("PVV (NL)",                   "PVV_NL",  "#1c3f6e",  1.8, 150);
  reg("CDA (NL)",                   "CDA_NL",  "#00897b",  0.3, 150);
  reg("D66 (NL)",                   "D66_NL",  "#15a085", -0.2, 150);
  reg("VVD (NL)",                   "VVD_NL",  "#0070c0",  0.5, 150);
  reg("PvdA (NL)",                  "PvdA_NL", "#e53935", -0.7, 150);
  reg("SP (NL)",                    "SP_NL",   "#cc0000", -1.5, 150);
  reg("GL (NL)",                    "GL_NL",   "#009246", -1.0, 150);
  reg("ARP (NL)",                   "ARP_NL",  "#003189",  0.5, 150);
  /* Austria */
  reg("SPÖ (AT)",                   "SPO_AT",  "#e53935", -0.8, 183);
  reg("ÖVP",                        "OVP_AT",  "#003189",  0.5, 183);
  reg("FPÖ",                        "FPO_AT",  "#1c3f6e",  1.8, 183);
  reg("Greens (AT)",                "Grune_AT","#009246", -1.0, 183);
  reg("NEOS (AT)",                  "NEOS_AT", "#ef5350",  0.1, 183);
  /* Belgium */
  reg("N-VA",                       "NVA_BE",  "#f9a825",  0.5, 150);
  reg("PS (BE)",                    "PS_BE",   "#e53935", -0.7, 150);
  reg("Open VLD",                   "VLD_BE",  "#0070c0",  0.3, 150);
  reg("Vlaams Belang",              "VB_BE",   "#1c3f6e",  1.8, 150);
  reg("MR (BE)",                    "MR_BE",   "#003189",  0.4, 150);
  reg("cd&v",                       "CDV_BE",  "#00897b",  0.3, 150);
  reg("PTB-PVDA",                   "PTB_BE",  "#cc0000", -2.0, 150);
  /* Switzerland */
  reg("SVP (CH)",                   "SVP_CH",  "#1c3f6e",  1.5, 200);
  reg("SP (CH)",                    "SP_CH",   "#e53935", -0.8, 200);
  reg("FDP (CH)",                   "FDP_CH",  "#0070c0",  0.4, 200);
  reg("CVP (CH)",                   "CVP_CH",  "#00897b",  0.2, 200);
  reg("Green Party (CH)",           "GPS_CH",  "#009246", -1.0, 200);
  /* Portugal */
  reg("PS (PT)",                    "PS_PT",   "#e53935", -0.7, 230);
  reg("PSD (PT)",                   "PSD_PT",  "#ff6f00",  0.5, 230);
  reg("CDS-PP",                     "CDS_PT",  "#003189",  0.8, 230);
  reg("Chega",                      "Chega_PT","#1c3f6e",  2.0, 230);
  reg("Bloco de Esquerda",          "BE_PT",   "#cc0000", -1.5, 230);
  reg("CDU (PT)",                   "CDU_PT",  "#b71c1c", -1.8, 230);
  /* Ireland */
  reg("Fianna Fáil",                "FF_IE",   "#006400",  0.2, 166);
  reg("Fine Gael",                  "FG_IE",   "#003189",  0.5, 166);
  reg("Sinn Féin",                  "SF_IE",   "#009246", -0.5, 166);
  reg("Labour (IE)",                "Lab_IE",  "#e53935", -0.8, 166);
  reg("Green Party (IE)",           "GP_IE",   "#009246", -0.9, 166);
  reg("Social Democrats (IE)",      "SD_IE",   "#8e24aa", -0.7, 166);
  reg("Clann na Poblachta",         "CnP_IE",  "#009246", -0.3, 166);
  reg("Cumann na nGaedheal",        "CnaG_IE", "#003189",  0.6, 166);

  if (G.PARTY_COUNTRY) {
    /* Italy */
    G.PARTY_COUNTRY["Christian Democracy (IT)"]    = "IT";
    G.PARTY_COUNTRY["Italian Communist Party"]     = "IT";
    G.PARTY_COUNTRY["Italian Socialist Party"]     = "IT";
    G.PARTY_COUNTRY["Forza Italia"]                = "IT";
    G.PARTY_COUNTRY["Lega Nord"]                   = "IT";
    G.PARTY_COUNTRY["Five Star Movement"]          = "IT";
    G.PARTY_COUNTRY["Brothers of Italy"]           = "IT";
    G.PARTY_COUNTRY["Partito Democratico (IT)"]    = "IT";
    G.PARTY_COUNTRY["National Alliance (IT)"]      = "IT";
    G.PARTY_COUNTRY["Action Party (IT)"]           = "IT";
    G.PARTY_COUNTRY["Italian Liberal Party"]       = "IT";
    G.PARTY_COUNTRY["Italian Republican Party"]    = "IT";
    G.PARTY_COUNTRY["Italian Democratic Socialist"]= "IT";
    G.PARTY_COUNTRY["New Democracy (IT)"]          = "IT";
    G.PARTY_COUNTRY["Movimento Sociale Italiano"]  = "IT";
    G.PARTY_COUNTRY["PNF"]                         = "IT";
    /* Spain */
    G.PARTY_COUNTRY["PSOE"]                        = "ES";
    G.PARTY_COUNTRY["People's Party (ES)"]         = "ES";
    G.PARTY_COUNTRY["Podemos"]                     = "ES";
    G.PARTY_COUNTRY["Vox"]                         = "ES";
    G.PARTY_COUNTRY["Ciudadanos"]                  = "ES";
    G.PARTY_COUNTRY["Falange"]                     = "ES";
    G.PARTY_COUNTRY["Communist Party (ES)"]        = "ES";
    G.PARTY_COUNTRY["Sumar (ES)"]                  = "ES";
    G.PARTY_COUNTRY["ERC"]                         = "ES";
    G.PARTY_COUNTRY["Junts"]                       = "ES";
    G.PARTY_COUNTRY["CiU"]                         = "ES";
    G.PARTY_COUNTRY["PNV"]                         = "ES";
    G.PARTY_COUNTRY["Convergència Democràtica"]    = "ES";
    /* Scandinavia */
    G.PARTY_COUNTRY["Swedish Social Democrats"]    = "SE";
    G.PARTY_COUNTRY["Moderate Party (SE)"]         = "SE";
    G.PARTY_COUNTRY["Sweden Democrats"]            = "SE";
    G.PARTY_COUNTRY["Centre Party (SE)"]           = "SE";
    G.PARTY_COUNTRY["Left Party (SE)"]             = "SE";
    G.PARTY_COUNTRY["Christian Democrats (SE)"]    = "SE";
    G.PARTY_COUNTRY["Liberal Party (SE)"]          = "SE";
    G.PARTY_COUNTRY["Norwegian Labour"]            = "NO";
    G.PARTY_COUNTRY["Conservative (NO)"]           = "NO";
    G.PARTY_COUNTRY["Progress Party (NO)"]         = "NO";
    G.PARTY_COUNTRY["Liberal (NO)"]                = "NO";
    G.PARTY_COUNTRY["Christian Democrats (NO)"]    = "NO";
    G.PARTY_COUNTRY["Centre Party (NO)"]           = "NO";
    G.PARTY_COUNTRY["Danish Social Democrats"]     = "DK";
    G.PARTY_COUNTRY["Venstre (DK)"]               = "DK";
    G.PARTY_COUNTRY["Danish People's Party"]       = "DK";
    G.PARTY_COUNTRY["Social Liberal Party (DK)"]   = "DK";
    G.PARTY_COUNTRY["Social Democratic Party (FI)"]= "FI";
    G.PARTY_COUNTRY["National Coalition (FI)"]     = "FI";
    G.PARTY_COUNTRY["Centre Party (FI)"]           = "FI";
    G.PARTY_COUNTRY["Finns Party"]                 = "FI";
    G.PARTY_COUNTRY["Left Alliance (FI)"]          = "FI";
    /* Greece */
    G.PARTY_COUNTRY["PASOK"]                       = "GR";
    G.PARTY_COUNTRY["New Democracy (GR)"]          = "GR";
    G.PARTY_COUNTRY["Syriza"]                      = "GR";
    G.PARTY_COUNTRY["KKE (GR)"]                    = "GR";
    G.PARTY_COUNTRY["Golden Dawn"]                 = "GR";
    G.PARTY_COUNTRY["Center Union (GR)"]           = "GR";
    /* Netherlands */
    G.PARTY_COUNTRY["PVV (NL)"]                    = "NL";
    G.PARTY_COUNTRY["CDA (NL)"]                    = "NL";
    G.PARTY_COUNTRY["D66 (NL)"]                    = "NL";
    G.PARTY_COUNTRY["VVD (NL)"]                    = "NL";
    G.PARTY_COUNTRY["PvdA (NL)"]                   = "NL";
    G.PARTY_COUNTRY["SP (NL)"]                     = "NL";
    G.PARTY_COUNTRY["GL (NL)"]                     = "NL";
    G.PARTY_COUNTRY["ARP (NL)"]                    = "NL";
    /* Austria */
    G.PARTY_COUNTRY["SPÖ (AT)"]                    = "AT";
    G.PARTY_COUNTRY["ÖVP"]                         = "AT";
    G.PARTY_COUNTRY["FPÖ"]                         = "AT";
    G.PARTY_COUNTRY["Greens (AT)"]                 = "AT";
    G.PARTY_COUNTRY["NEOS (AT)"]                   = "AT";
    /* Belgium */
    G.PARTY_COUNTRY["N-VA"]                        = "BE";
    G.PARTY_COUNTRY["PS (BE)"]                     = "BE";
    G.PARTY_COUNTRY["Open VLD"]                    = "BE";
    G.PARTY_COUNTRY["Vlaams Belang"]               = "BE";
    G.PARTY_COUNTRY["MR (BE)"]                     = "BE";
    G.PARTY_COUNTRY["cd&v"]                        = "BE";
    G.PARTY_COUNTRY["PTB-PVDA"]                    = "BE";
    /* Switzerland */
    G.PARTY_COUNTRY["SVP (CH)"]                    = "CH";
    G.PARTY_COUNTRY["SP (CH)"]                     = "CH";
    G.PARTY_COUNTRY["FDP (CH)"]                    = "CH";
    G.PARTY_COUNTRY["CVP (CH)"]                    = "CH";
    G.PARTY_COUNTRY["Green Party (CH)"]            = "CH";
    /* Portugal */
    G.PARTY_COUNTRY["PS (PT)"]                     = "PT";
    G.PARTY_COUNTRY["PSD (PT)"]                    = "PT";
    G.PARTY_COUNTRY["CDS-PP"]                      = "PT";
    G.PARTY_COUNTRY["Chega"]                       = "PT";
    G.PARTY_COUNTRY["Bloco de Esquerda"]           = "PT";
    G.PARTY_COUNTRY["CDU (PT)"]                    = "PT";
    /* Ireland */
    G.PARTY_COUNTRY["Fianna Fáil"]                 = "IE";
    G.PARTY_COUNTRY["Fine Gael"]                   = "IE";
    G.PARTY_COUNTRY["Sinn Féin"]                   = "IE";
    G.PARTY_COUNTRY["Labour (IE)"]                 = "IE";
    G.PARTY_COUNTRY["Green Party (IE)"]            = "IE";
    G.PARTY_COUNTRY["Social Democrats (IE)"]       = "IE";
    G.PARTY_COUNTRY["Clann na Poblachta"]          = "IE";
    G.PARTY_COUNTRY["Cumann na nGaedheal"]         = "IE";
  }

  /* ═══════════════════════════════════════════════════════════════
     ITALY — CHRISTIAN DEMOCRACY (DC)
     ═══════════════════════════════════════════════════════════════ */
  I("Alcide De Gasperi",     "Christian Democracy (IT)","e3",["pm","foreign","leader"],       [72,82,68,78,75], "DC founder, Italy's first post-war PM");
  I("Aldo Moro",             "Christian Democracy (IT)","e4",["pm","foreign","leader"],       [68,80,65,75,72], "Murdered by Red Brigades; centre-left opening architect");
  I("Amintore Fanfani",      "Christian Democracy (IT)","e4",["pm","chancellor","leader"],    [65,80,62,72,70], "DC leader four times PM");
  I("Antonio Segni",         "Christian Democracy (IT)","e4",["pm","agriculture"],            [60,75,55,68,62], "DC President of Italy 1962–64");
  I("Giovanni Leone",        "Christian Democracy (IT)","e4",["pm","justice"],               [58,75,55,65,60], "DC President 1971–78, resigned in scandal");
  I("Giulio Andreotti",      "Christian Democracy (IT)","e5",["pm","foreign","leader"],       [58,88,52,80,72], "DC seven-time PM; acquitted of Mafia links");
  I("Francesco Cossiga",     "Christian Democracy (IT)","e5",["pm","home","leader"],          [60,80,58,70,65], "DC home minister, then President 1985–92");
  I("Oscar Luigi Scalfaro",  "Christian Democracy (IT)","e6",["pm","home","justice"],         [58,80,55,68,60], "DC President 1992–99");
  I("Mario Scelba",          "Christian Democracy (IT)","e3",["home","pm"],                   [55,75,50,65,60], "DC interior minister, anti-Communist strongman");
  I("Mariano Rumor",         "Christian Democracy (IT)","e4",["pm","agriculture"],            [58,72,52,62,60], "DC PM five times in 1968–74");
  I("Arnaldo Forlani",       "Christian Democracy (IT)","e5",["pm","foreign","leader"],       [55,78,50,65,62], "DC leader P2 scandal implication");
  I("Carlo Donat-Cattin",    "Christian Democracy (IT)","e5",["work","leader"],               [58,72,58,60,60], "DC left wing labour champion");
  I("Antonio Gava",          "Christian Democracy (IT)","e6",["home","leader"],               [50,72,45,58,55], "DC Neapolitan boss");
  I("Ciriaco De Mita",       "Christian Democracy (IT)","e5",["pm","leader"],                 [58,75,55,65,62], "DC secretary and PM 1988–89");
  I("Flaminio Piccoli",      "Christian Democracy (IT)","e5",["leader"],                      [52,68,48,58,55], "DC secretary 1980–82");
  I("Emilio Colombo",        "Christian Democracy (IT)","e5",["chancellor","foreign"],        [60,80,55,70,62], "DC PM, chancellor, European Parliament president");
  I("Roberto Formigoni",     "Christian Democracy (IT)","e6",["pm","health"],                 [58,72,58,62,60], "DC/FI Lombardy president");
  I("Giuseppe Pella",        "Christian Democracy (IT)","e3",["pm","chancellor"],             [58,70,50,62,58], "DC PM 1953–54");
  I("Adone Zoli",            "Christian Democracy (IT)","e4",["pm","justice"],                [52,68,48,58,52], "DC PM 1957–58");
  I("Fernando Tambroni",     "Christian Democracy (IT)","e4",["pm","home"],                   [50,65,45,55,50], "DC PM 1960; triggered protests by relying on MSI");
  I("Leone Marchesini",      "Christian Democracy (IT)","e4",["work"],                        [48,62,45,50,50], "DC social policy MP");
  I("Attilio Piccioni",      "Christian Democracy (IT)","e3",["foreign","justice"],           [55,68,50,58,55], "DC foreign minister, De Gasperi ally");
  I("Pietro Nenni",          "Italian Socialist Party","e3",["pm","foreign","leader"],        [65,78,68,65,65], "PSI leader; broke with Communists");
  I("Bettino Craxi",         "Italian Socialist Party","e5",["pm","leader"],                  [65,78,65,68,70], "PSI leader and PM; fled Italy amid corruption");
  I("Filippo Turati",        "Italian Socialist Party","e1",["leader","work"],                [65,68,68,60,62], "PSI founder and reformist socialist");
  I("Giacomo Matteotti",     "Italian Socialist Party","e2",["leader","work","chancellor"],   [68,65,72,62,62], "PSI leader murdered by Fascists 1924");
  I("Antonio Giolitti",      "Italian Socialist Party","e4",["chancellor","trade"],           [60,72,55,62,58], "PSI economist, nephew of Liberal Giovanni");
  I("Sandro Pertini",        "Italian Socialist Party","e5",["pm","leader"],                  [72,80,75,70,65], "Beloved PSI President 1978–85");
  I("Giuseppe Saragat",      "Italian Democratic Socialist","e4",["pm","foreign","leader"],   [62,78,60,68,62], "PSDI President 1964–71; split from PSI");
  I("Ugo La Malfa",          "Italian Republican Party","e4",["chancellor","foreign","leader"],[62,78,60,68,60], "PRI leader; rigorous liberal economist");
  I("Giovanni Spadolini",    "Italian Republican Party","e5",["pm","leader","culture"],       [62,78,62,68,60], "PRI PM 1981–82; first non-DC PM postwar");
  I("Giorgio La Pira",       "Christian Democracy (IT)","e4",["pm","work"],                   [65,65,68,62,55], "Florence mayor; Christian social mystic");
  I("Ettore Colombo",        "Christian Democracy (IT)","e4",["chancellor"],                  [52,65,48,55,50], "DC economics politician");

  /* ── Italian Communist Party (PCI) ──────────────────────────── */
  I("Palmiro Togliatti",     "Italian Communist Party","e3",["leader","pm","work"],           [62,80,65,68,70], "PCI leader for 25 years; Eurocommunist pioneer");
  I("Luigi Longo",           "Italian Communist Party","e4",["leader","defence"],             [58,75,55,62,65], "PCI leader 1964–72");
  I("Enrico Berlinguer",     "Italian Communist Party","e5",["leader","pm","foreign"],        [68,78,68,68,72], "PCI; invented Eurocommunism; historic compromise");
  I("Giorgio Napolitano",    "Italian Communist Party","e5",["pm","leader","foreign"],        [65,82,60,72,68], "PCI moderate; twice Italian President");
  I("Alessandro Natta",      "Italian Communist Party","e5",["leader"],                       [55,72,52,60,62], "PCI leader 1984–88");
  I("Achille Occhetto",      "Italian Communist Party","e6",["leader","pm"],                  [58,72,58,62,62], "PCI final leader who dissolved and created PDS");
  I("Pietro Ingrao",         "Italian Communist Party","e4",["leader","justice"],             [62,75,65,62,65], "PCI left wing; Parliament speaker");
  I("Giorgio Amendola",      "Italian Communist Party","e4",["leader","foreign"],             [60,75,60,62,62], "PCI moderate; European integration");
  I("Antonio Gramsci",       "Italian Communist Party","e2",["leader","culture"],             [68,65,72,62,60], "PCI founder; prison notebooks; hegemony theory");
  I("Umberto Terracini",     "Italian Communist Party","e3",["leader","justice"],             [60,68,58,60,58], "PCI co-founder and Constituent Assembly president");
  I("Luigi Battista Baraldo","Italian Communist Party","e4",["work","leader"],                [52,62,50,50,52], "PCI trade union voice");
  I("Luigi Pintor",          "Italian Communist Party","e5",["culture","leader"],             [58,65,62,55,55], "PCI dissident, Il Manifesto founder");
  I("Rossana Rossanda",      "Italian Communist Party","e5",["culture","leader"],             [60,65,62,55,55], "PCI feminist and dissident");
  I("Giancarlo Pajetta",     "Italian Communist Party","e4",["foreign","leader"],             [58,72,58,58,60], "PCI Resistance hero and foreign affairs");
  I("Giovanni Berlinguer",   "Italian Communist Party","e5",["health","leader"],              [55,65,55,55,56], "PCI health expert, Enrico's brother");
  I("Luigi Macaluso",        "Italian Communist Party","e5",["work","leader"],                [52,62,50,50,52], "PCI trade union official");
  I("Romano Ledda",          "Italian Communist Party","e5",["foreign"],                      [52,60,50,50,50], "PCI international secretary");
  I("Emanuele Macaluso",     "Italian Communist Party","e5",["leader","pm"],                  [56,68,55,56,58], "PCI Sicily leader");
  I("Antonello Trombadori",  "Italian Communist Party","e4",["culture","leader"],             [52,60,55,50,50], "PCI art and culture");
  I("Massimo D'Alema",       "Partito Democratico (IT)","e6",["pm","foreign","leader"],       [65,78,62,68,68], "PDS/DS PM 1998–2000, then foreign minister");

  /* ── Five Star Movement ──────────────────────────────────────── */
  I("Beppe Grillo",          "Five Star Movement","e7",["leader","pm"],                       [65,55,70,48,55], "M5S co-founder, comedian turned political disruptor");
  I("Luigi Di Maio",         "Five Star Movement","e7",["pm","foreign","leader"],             [55,60,55,55,58], "M5S leader who later left; foreign minister");
  I("Virginia Raggi",        "Five Star Movement","e7",["pm","leader"],                       [52,58,52,52,52], "M5S Rome mayor");
  I("Alessandro Di Battista", "Five Star Movement","e7",["leader","foreign"],                 [56,55,60,50,52], "M5S firebrand speaker");
  I("Roberto Fico",          "Five Star Movement","e7",["pm","justice","leader"],             [55,60,55,55,55], "M5S Parliament speaker 2018–22");
  I("Davide Casaleggio",     "Five Star Movement","e7",["leader","digital"],                  [52,55,50,50,52], "M5S digital guru, Rousseau platform chief");
  I("Giuseppe Conte",        "Five Star Movement","e7",["pm","leader"],                       [65,68,62,65,62], "M5S PM 2018–21, then M5S leader");
  I("Stefano Patuanello",    "Five Star Movement","e7",["energy","trade"],                    [50,55,50,50,52], "M5S energy policy spokesman");
  I("Chiara Appendino",      "Five Star Movement","e7",["pm"],                                [55,58,52,54,55], "M5S Turin mayor");
  I("Manlio Di Stefano",     "Five Star Movement","e7",["foreign"],                           [50,55,50,50,52], "M5S foreign affairs");
  I("Alberto Airola",        "Five Star Movement","e7",["digital","culture"],                 [48,52,50,48,50], "M5S digital rights senator");
  I("Paola Taverna",         "Five Star Movement","e7",["work","leader"],                     [52,55,55,50,52], "M5S grassroots leader");
  I("Barbara Lezzi",         "Five Star Movement","e7",["business"],                          [50,52,52,48,50], "M5S southern Italy minister");
  I("Alfonso Bonafede",      "Five Star Movement","e7",["justice"],                           [52,58,50,52,52], "M5S justice minister");
  I("Riccardo Fraccaro",     "Five Star Movement","e7",["chancellor"],                        [50,55,50,50,50], "M5S parliamentary relations");
  I("Giulia Grillo",         "Five Star Movement","e7",["health"],                            [52,55,52,50,52], "M5S health minister");

  /* ── Brothers of Italy (FdI) ─────────────────────────────────── */
  I("Giorgia Meloni",        "Brothers of Italy","e7",["pm","leader"],                        [68,68,70,65,70], "FdI founder and PM from 2022");
  I("Ignazio La Russa",      "Brothers of Italy","e7",["pm","defence","leader"],              [55,72,55,60,60], "FdI co-founder, Senate speaker");
  I("Francesco Lollobrigida","Brothers of Italy","e7",["agriculture","home"],                 [52,60,52,52,55], "FdI Meloni brother-in-law, agriculture minister");
  I("Guido Crosetto",        "Brothers of Italy","e7",["defence","business"],                 [58,65,58,60,58], "FdI co-founder, defence minister");
  I("Daniela Santanchè",     "Brothers of Italy","e7",["culture","business"],                 [55,58,58,52,55], "FdI tourism and culture minister");
  I("Giovanni Donzelli",     "Brothers of Italy","e7",["leader","home"],                      [50,58,55,50,55], "FdI organisation secretary");
  I("Andrea Delmastro",      "Brothers of Italy","e7",["justice"],                            [50,55,52,50,52], "FdI justice undersecretary");
  I("Galeazzo Bignami",      "Brothers of Italy","e7",["transport"],                          [48,55,50,48,50], "FdI transport politician");
  I("Marco Bucci",           "Brothers of Italy","e7",["pm"],                                 [52,58,52,52,52], "Genoa mayor linked to FdI");
  I("Federico Freni",        "Brothers of Italy","e7",["chancellor"],                         [50,55,50,48,50], "FdI Treasury undersecretary");
  I("Alberto Balboni",       "Brothers of Italy","e7",["home","justice"],                     [50,55,52,48,52], "FdI senator");
  I("Walter Rizzetto",       "Brothers of Italy","e7",["work"],                               [48,55,50,48,50], "FdI labour spokesman");

  /* ── Forza Italia (FI) ───────────────────────────────────────── */
  I("Silvio Berlusconi",     "Forza Italia","e6",["pm","leader","business"],                  [70,72,72,65,72], "FI founder, three-time PM, media magnate");
  I("Gianfranco Fini",       "National Alliance (IT)","e6",["pm","foreign","leader"],         [60,75,60,65,65], "MSI→AN→FLI; post-fascist evolution");
  I("Pier Ferdinando Casini","Christian Democracy (IT)","e6",["pm","leader","deputy"],        [60,75,58,65,62], "DC→CCD→UDC centrist coalition builder");
  I("Antonio Tajani",        "Forza Italia","e7",["foreign","business","leader"],             [60,72,58,65,62], "FI leader after Berlusconi, former EP president");
  I("Mariastella Gelmini",   "Forza Italia","e7",["education","leader"],                     [55,65,52,58,55], "FI education minister; later left");
  I("Mara Carfagna",         "Forza Italia","e7",["equality","pm"],                           [56,62,55,55,55], "FI equal opportunity minister; later left");
  I("Roberto Calderoli",     "Lega Nord","e6",["home","justice","leader"],                    [52,72,50,55,55], "Lega hardliner, constitutional reform minister");
  I("Matteo Salvini",        "Lega Nord","e7",["home","leader","pm"],                         [68,68,65,58,68], "Lega leader; powerful interior minister 2018–19");
  I("Marco Zaia",            "Lega Nord","e7",["pm","agriculture"],                           [60,68,58,62,60], "Lega Veneto president");
  I("Giancarlo Giorgetti",   "Lega Nord","e7",["chancellor","business"],                      [58,68,55,62,60], "Lega economy minister; pragmatic wing");
  I("Umberto Bossi",         "Lega Nord","e5",["pm","leader"],                                [62,72,65,55,65], "Lega Nord founder, federalist firebrand");
  I("Roberto Maroni",        "Lega Nord","e6",["home","work","leader"],                       [58,72,55,60,60], "Lega home minister, Lombardy president");
  I("Lorenzo Fontana",       "Lega Nord","e7",["pm","deputy"],                                [52,60,52,52,55], "Lega speaker of the Chamber");
  I("Flavio Tosi",           "Lega Nord","e7",["pm"],                                         [54,62,52,54,55], "Verona Lega mayor");
  I("Oscar Giannino",        "Action Party (IT)","e7",["business","chancellor"],              [55,58,58,52,52], "Italian liberal economist and politician");
  I("Carlo Calenda",         "Action Party (IT)","e7",["business","trade","leader"],          [58,65,58,58,55], "Azione leader, former industry minister");
  I("Emma Bonino",           "Action Party (IT)","e6",["foreign","trade","health"],           [65,78,62,68,58], "Radical/+Europa leader, EU commissioner");

  /* ── Movimento Sociale Italiano (MSI) ───────────────────────── */
  I("Giorgio Almirante",     "Movimento Sociale Italiano","e4",["leader","pm"],              [55,72,60,55,62], "MSI founder and long-serving secretary");
  I("Michelini Arturo",      "Movimento Sociale Italiano","e4",["leader"],                   [48,62,45,48,50], "MSI moderate secretary 1954–69");
  I("Augusto De Marsanich",  "Movimento Sociale Italiano","e3",["leader"],                   [48,62,45,48,50], "MSI early leader");
  I("Beppe Niccolai",        "Movimento Sociale Italiano","e4",["culture","leader"],         [50,60,50,48,50], "MSI left-fascist voice");
  I("Pino Rauti",            "Movimento Sociale Italiano","e5",["leader","culture"],         [52,65,52,50,52], "MSI neo-fascist ideologue");
  I("Massimo Anderson",      "Movimento Sociale Italiano","e5",["leader"],                   [48,58,48,46,48], "MSI youth organiser");

  /* ═══════════════════════════════════════════════════════════════
     SPAIN
     ═══════════════════════════════════════════════════════════════ */
  /* ── PSOE ─────────────────────────────────────────────────────── */
  I("Pablo Iglesias Posse",  "PSOE",    "e0", ["leader","work"],                              [62,60,65,55,60], "PSOE founder 1879; printer and organiser");
  I("Largo Caballero",       "PSOE",    "e2", ["work","pm","leader"],                         [60,72,62,58,62], "PSOE PM and trade union leader during Republic");
  I("Indalecio Prieto",      "PSOE",    "e2", ["chancellor","foreign","leader"],              [62,72,62,62,60], "PSOE moderate, finance and war minister");
  I("Juan Negrín",           "PSOE",    "e3", ["pm","chancellor","defence"],                  [60,72,58,62,58], "Republican PM 1937–39");
  I("Rodolfo Llopis",        "PSOE",    "e3", ["leader","education"],                         [55,68,52,55,55], "PSOE exile leader");
  I("Nicolás Redondo",       "PSOE",    "e5", ["work","leader"],                              [58,68,55,55,60], "UGT union boss, PSOE grassroots");
  I("Felipe González",       "PSOE",    "e5", ["pm","leader","foreign"],                      [72,80,72,75,72], "PSOE PM 1982–96; Spain into EU");
  I("Alfonso Guerra",        "PSOE",    "e5", ["deputy","leader","pm"],                       [62,75,65,62,68], "González's powerful deputy");
  I("José Luis Rodríguez Zapatero","PSOE","e7",["pm","leader","foreign"],                    [65,72,62,68,65], "PSOE PM 2004–11");
  I("Alfredo Pérez Rubalcaba","PSOE",   "e7", ["home","deputy","leader"],                     [62,78,60,65,65], "PSOE heir apparent; interior minister");
  I("Pedro Sánchez",         "PSOE",    "e7", ["pm","leader"],                                [62,68,62,62,62], "PSOE PM from 2018");
  I("Carmen Calvo",          "PSOE",    "e7", ["deputy","culture","equality"],                [58,68,58,58,58], "PSOE feminist deputy PM");
  I("María Jesús Montero",   "PSOE",    "e7", ["chancellor","health"],                        [58,68,55,60,58], "PSOE finance minister");
  I("Luis Planas",           "PSOE",    "e7", ["agriculture","trade"],                        [52,65,50,55,52], "PSOE agriculture minister");
  I("Margarita Robles",      "PSOE",    "e7", ["defence","justice"],                          [58,70,55,60,55], "PSOE defence minister");
  I("José Bono",             "PSOE",    "e6", ["pm","defence"],                               [60,72,60,62,60], "PSOE Castile-La Mancha president, defence minister");
  I("Joaquín Almunia",       "PSOE",    "e6", ["chancellor","leader","foreign"],              [60,75,55,65,60], "PSOE leader 1997–2000, EU Commissioner");
  I("Cristina Narbona",      "PSOE",    "e7", ["environment","leader"],                       [56,65,55,58,55], "PSOE environment minister, Senate president");
  I("Jordi Sevilla",         "PSOE",    "e7", ["chancellor","work"],                          [55,65,52,58,52], "PSOE public administration minister");
  I("Elena Valenciano",      "PSOE",    "e7", ["foreign"],                                    [56,62,55,58,52], "PSOE MEP, international secretary");
  I("Manuel Chaves",         "PSOE",    "e6", ["pm","deputy"],                                [58,72,55,62,58], "PSOE Andalusia president, deputy PM");
  I("Miquel Iceta",          "PSOE",    "e7", ["culture","leader"],                           [56,65,58,55,55], "PSC/PSOE Catalan leader");
  I("José Antonio Griñán",   "PSOE",    "e6", ["pm","work","chancellor"],                     [58,72,52,60,58], "PSOE Andalusia PM convicted of corruption");
  I("Rodríguez de la Borbolla","PSOE",  "e5", ["pm"],                                         [52,65,50,55,52], "PSOE Andalusia first president");
  I("Guillermo Fernández Vara","PSOE",  "e7", ["pm","health"],                                [56,65,52,58,55], "PSOE Extremadura president");

  /* ── People's Party (PP) ─────────────────────────────────────── */
  I("Manuel Fraga Iribarne", "People's Party (ES)","e4",["pm","home","leader"],               [60,78,62,65,62], "Francoist minister who founded AP/PP precursor");
  I("José María Aznar",      "People's Party (ES)","e6",["pm","leader","foreign"],            [62,78,60,68,65], "PP PM 1996–2004");
  I("Mariano Rajoy",         "People's Party (ES)","e7",["pm","leader","home"],               [55,78,50,65,62], "PP PM 2011–18");
  I("Alberto Núñez Feijóo",  "People's Party (ES)","e7",["pm","leader"],                      [60,72,58,62,62], "PP leader from 2022");
  I("Esperanza Aguirre",     "People's Party (ES)","e6",["pm","culture","education"],         [62,72,62,60,60], "PP Madrid president; Senate speaker");
  I("Isabel Díaz Ayuso",     "People's Party (ES)","e7",["pm","health","business"],           [62,60,65,58,60], "PP Madrid president from 2021");
  I("Cristóbal Montoro",     "People's Party (ES)","e6",["chancellor"],                       [55,72,50,62,55], "PP austerity finance minister");
  I("Ana Pastor",            "People's Party (ES)","e7",["health","transport","pm"],          [56,68,52,58,55], "PP parliament speaker");
  I("Javier Arenas",         "People's Party (ES)","e6",["work","leader"],                    [55,70,52,58,55], "PP Andalusia leader");
  I("Rodrigo Rato",          "People's Party (ES)","e6",["chancellor","business"],            [58,72,52,62,55], "PP Finance minister, IMF chief — later imprisoned");
  I("Jorge Fernández Díaz",  "People's Party (ES)","e7",["home"],                             [52,65,48,55,52], "PP interior minister");
  I("Alfonso Alonso",        "People's Party (ES)","e7",["health","leader"],                  [52,62,50,52,52], "PP health minister");
  I("María Dolores de Cospedal","People's Party (ES)","e7",["leader","defence"],              [55,68,52,58,55], "PP secretary-general and defence minister");
  I("Soraya Sáenz de Santamaría","People's Party (ES)","e7",["deputy","home"],                [60,70,58,62,60], "PP deputy PM and interior minister");
  I("Rafael Hernando",       "People's Party (ES)","e7",["leader"],                           [50,62,50,50,52], "PP parliamentary spokesman");
  I("Alicia Sánchez-Camacho","People's Party (ES)","e7",["leader","pm"],                     [52,62,52,52,52], "PP Catalonia leader");
  I("Juan Ignacio Zoido",    "People's Party (ES)","e7",["home","pm"],                        [52,62,50,52,52], "PP Seville mayor and interior minister");
  I("Íñigo Méndez de Vigo",  "People's Party (ES)","e7",["education","culture"],              [52,62,50,52,50], "PP education minister");
  I("Pablo Casado",          "People's Party (ES)","e7",["leader","pm"],                      [56,62,58,55,58], "PP leader 2018–22");
  I("Fátima Báñez",          "People's Party (ES)","e7",["work"],                             [55,65,50,55,55], "PP labour minister, pension reformer");
  I("Luis de Guindos",       "People's Party (ES)","e7",["chancellor","business"],            [58,68,52,62,55], "PP economy minister, ECB VP");
  I("Pedro Morenés",         "People's Party (ES)","e7",["defence"],                          [52,65,48,55,50], "PP defence minister");
  I("Antonio Silván",        "People's Party (ES)","e7",["transport"],                        [48,58,45,50,48], "PP León mayor and senator");

  /* ── Podemos / Sumar ─────────────────────────────────────────── */
  I("Pablo Iglesias Turrión","Podemos",  "e7", ["pm","leader","work"],                        [68,62,72,60,65], "Podemos founder and deputy PM 2020–21");
  I("Íñigo Errejón",         "Podemos",  "e7", ["leader","foreign"],                          [62,58,68,56,58], "Podemos co-founder; later Más País/Sumar");
  I("Teresa Rodríguez",      "Podemos",  "e7", ["leader","education"],                        [58,56,62,52,56], "Podemos Andalusia, later Anticapitalistas");
  I("Ada Colau",             "Podemos",  "e7", ["pm","work","housing"],                       [65,60,65,58,60], "Barcelona mayor, housing activist");
  I("Yolanda Díaz",          "Sumar (ES)","e7",["work","deputy","leader","pm"],               [65,68,65,65,62], "Labour minister, Sumar founder and deputy PM");
  I("Mónica García",         "Sumar (ES)","e7",["health","leader"],                           [60,60,62,58,58], "Madrid Más Madrid leader, health voice");
  I("Ione Belarra",          "Podemos",  "e7", ["leader","work","social"],                    [56,58,58,52,56], "Podemos leader from 2021");
  I("Irene Montero",         "Podemos",  "e7", ["equality","justice"],                        [58,58,60,52,55], "Podemos equality minister");
  I("Alberto Garzón",        "Podemos",  "e7", ["trade","culture","leader"],                  [58,60,58,55,55], "IU/Podemos consumption minister");
  I("Rafa Mayoral",          "Podemos",  "e7", ["leader","foreign"],                          [52,56,54,50,52], "Podemos organisation leader");
  I("Antón Gómez-Reino",     "Podemos",  "e7", ["leader"],                                    [50,55,52,48,50], "Galicia Podemos leader");
  I("Noelia Vera",           "Podemos",  "e7", ["equality"],                                  [50,54,52,48,50], "Podemos spokeswoman");
  I("Sofía Castañón",        "Podemos",  "e7", ["education","culture"],                       [50,54,52,48,50], "Podemos culture and education");

  /* ── Vox ─────────────────────────────────────────────────────── */
  I("Santiago Abascal",      "Vox",     "e7", ["leader","pm"],                                [60,62,62,52,62], "Vox founder and president");
  I("Iván Espinosa de los Monteros","Vox","e7",["business","chancellor","leader"],            [56,58,58,52,56], "Vox economic spokesman");
  I("Rocío Monasterio",      "Vox",     "e7", ["pm","leader","home"],                         [55,58,58,50,55], "Vox Madrid leader");
  I("Macarena Olona",        "Vox",     "e7", ["home","leader"],                              [55,58,60,50,55], "Vox parliamentary spokeswoman; later left");
  I("Jorge Buxadé",          "Vox",     "e7", ["foreign","home"],                             [52,58,54,50,52], "Vox MEP and justice spokesman");
  I("Francisco Serrano",     "Vox",     "e7", ["justice","leader"],                           [50,55,52,48,50], "Vox Andalusia leader");
  I("Juan García-Gallardo",  "Vox",     "e7", ["pm","leader"],                                [52,56,54,48,52], "Vox Castile and León deputy PM");
  I("Javier Ortega Smith",   "Vox",     "e7", ["home","leader"],                              [52,55,52,48,52], "Vox secretary-general");
  I("Espinosa de los Monteros padre","Vox","e7",["business"],                                 [48,55,48,46,48], "Vox business figure");
  I("Carla Toscano",         "Vox",     "e7", ["culture","education"],                        [50,52,52,46,50], "Vox cultural politics spokeswoman");
  I("Inés Cañizares",        "Vox",     "e7", ["health","equality"],                          [48,52,50,46,48], "Vox health critic");
  I("Manuel Mestre",         "Vox",     "e7", ["chancellor"],                                 [48,52,48,46,48], "Vox finance critic");

  /* ═══════════════════════════════════════════════════════════════
     SCANDINAVIA — SWEDEN
     ═══════════════════════════════════════════════════════════════ */
  I("Olof Palme",            "Swedish Social Democrats","e5",["pm","foreign","leader"],       [75,80,78,72,72], "SAP PM; assassinated 1986");
  I("Tage Erlander",         "Swedish Social Democrats","e4",["pm","leader"],                 [65,82,62,72,72], "Sweden's longest-serving PM 1946–69");
  I("Ingvar Carlsson",       "Swedish Social Democrats","e5",["pm","leader","environment"],   [62,78,60,68,68], "SAP PM 1986–91 and 1994–96");
  I("Göran Persson",         "Swedish Social Democrats","e6",["pm","chancellor","leader"],    [60,78,58,68,65], "SAP PM 1996–2006");
  I("Stefan Löfven",         "Swedish Social Democrats","e7",["pm","work","leader"],          [58,72,55,62,65], "SAP PM 2014–21, union background");
  I("Magdalena Andersson",   "Swedish Social Democrats","e7",["pm","chancellor","leader"],    [60,68,58,65,62], "First female SAP PM");
  I("Per Albin Hansson",     "Swedish Social Democrats","e3",["pm","leader"],                 [62,78,58,68,68], "SAP PM who built Swedish welfare state");
  I("Anna Lindh",            "Swedish Social Democrats","e7",["foreign","leader"],            [65,68,65,62,60], "SAP foreign minister, assassinated 2003");
  I("Mona Sahlin",           "Swedish Social Democrats","e7",["pm","leader","equality"],      [58,70,58,58,60], "SAP leader 2007–11");
  I("Ernst Wigforss",        "Swedish Social Democrats","e3",["chancellor","work"],           [60,75,58,65,60], "SAP father of Swedish welfare economics");
  I("Fredrik Reinfeldt",     "Moderate Party (SE)","e7",["pm","leader","work"],              [65,72,62,68,65], "M PM 2006–14; modernised Swedish right");
  I("Carl Bildt",            "Moderate Party (SE)","e6",["pm","foreign","leader"],           [62,78,62,70,62], "M PM 1991–94; Balkan peace mediator");
  I("Ulf Kristersson",       "Moderate Party (SE)","e7",["pm","leader"],                     [58,68,55,60,62], "M PM from 2022");
  I("Gunnar Hедlund",        "Centre Party (SE)","e4",["pm","agriculture"],                  [56,72,52,60,58], "Centre leader, 'agrarian' roots");
  I("Thorbjörn Fälldin",     "Centre Party (SE)","e5",["pm","leader","environment"],         [60,72,58,62,60], "Centre PM 1976–82, anti-nuclear");
  I("Annie Lööf",            "Centre Party (SE)","e7",["pm","leader","business"],            [62,65,62,58,62], "Centre leader 2011–23");
  I("Jimmie Åkesson",        "Sweden Democrats","e7",["leader","pm"],                         [60,62,62,55,62], "SD leader from 2005");
  I("Mattias Karlsson",      "Sweden Democrats","e7",["foreign","culture"],                   [52,58,52,50,52], "SD parliamentary group leader");
  I("Richard Jomshof",       "Sweden Democrats","e7",["home","justice"],                      [50,56,52,48,50], "SD justice and home affairs");
  I("Björn Söder",           "Sweden Democrats","e7",["foreign","culture"],                   [50,56,50,48,50], "SD foreign affairs spokesman");
  I("Lars Adaktusson",       "Christian Democrats (SE)","e7",["foreign","culture"],          [52,58,52,50,52], "KD MEP, pro-life");
  I("Göran Hägglund",        "Christian Democrats (SE)","e7",["pm","health","leader"],       [56,65,55,58,58], "KD leader 2004–15");
  I("Ebba Busch",            "Christian Democrats (SE)","e7",["pm","leader","energy"],       [60,60,62,56,60], "KD leader from 2015");
  I("Jan Björklund",         "Liberal Party (SE)","e7",["education","pm","leader"],          [58,68,58,60,58], "L leader 2007–19; education reformer");
  I("Johan Pehrson",         "Liberal Party (SE)","e7",["justice","leader"],                 [54,60,52,54,55], "L leader from 2022");

  /* ── Norway ───────────────────────────────────────────────────── */
  I("Einar Gerhardsen",      "Norwegian Labour","e3",["pm","leader"],                         [65,80,62,70,72], "Labour PM for much of 1945–65; 'father of Norway'");
  I("Trygve Bratteli",       "Norwegian Labour","e4",["pm","foreign","chancellor"],           [60,78,58,65,65], "Labour PM 1971–72, 1973–76");
  I("Odvar Nordli",          "Norwegian Labour","e5",["pm","leader"],                         [55,72,52,60,58], "Labour PM 1976–81");
  I("Gro Harlem Brundtland", "Norwegian Labour","e5",["pm","health","environment","leader"],  [70,80,68,72,68], "Labour PM three times; authored Brundtland Report");
  I("Thorbjørn Jagland",     "Norwegian Labour","e6",["pm","foreign","leader"],              [60,78,60,65,65], "Labour PM 1996–97; Nobel Committee chair");
  I("Jens Stoltenberg",      "Norwegian Labour","e7",["pm","chancellor","foreign"],           [65,78,62,68,65], "Labour PM; NATO Secretary-General");
  I("Jonas Gahr Støre",      "Norwegian Labour","e7",["pm","foreign","health","leader"],      [62,75,60,65,62], "Labour PM from 2021");
  I("Haakon Lie",            "Norwegian Labour","e3",["leader","work"],                       [60,72,55,60,62], "Labour Cold Warrior party secretary");
  I("Gunnar Knudsen",        "Norwegian Labour","e1",["pm","chancellor"],                     [55,72,50,60,55], "Liberal PM who built Norway's infrastructure");
  I("Kåre Willoch",          "Conservative (NO)","e5",["pm","chancellor","leader"],          [62,78,58,68,62], "H PM 1981–86, first Tory PM since 1928");
  I("Jan Petter Syse",       "Conservative (NO)","e6",["pm","leader"],                       [55,68,52,58,55], "H PM 1989–90");
  I("Erna Solberg",          "Conservative (NO)","e7",["pm","leader"],                        [62,75,58,65,65], "H PM 2013–21; 'Iron Erna'");
  I("Carl Joachim Hambro",   "Conservative (NO)","e3",["pm","foreign"],                      [60,72,60,62,58], "H president of Parliament, saved government 1940");
  I("Carl Ivar Hagen",       "Progress Party (NO)","e5",["leader","chancellor"],             [60,72,62,58,62], "FrP founder and dominant populist");
  I("Siv Jensen",            "Progress Party (NO)","e7",["chancellor","leader"],             [60,70,60,60,62], "FrP leader 2006–21, finance minister");
  I("Sylvi Listhaug",        "Progress Party (NO)","e7",["home","immigration","leader"],     [58,62,60,55,58], "FrP home minister, controversial");
  I("Per Borten",            "Centre Party (NO)","e4",["pm","agriculture"],                   [55,72,50,60,55], "Centre PM 1965–71");
  I("Åslaug Haga",           "Centre Party (NO)","e7",["energy","deputy"],                   [52,60,50,52,52], "Centre energy minister, oil fund architect");

  /* ── Denmark ─────────────────────────────────────────────────── */
  I("Thorvald Stauning",     "Danish Social Democrats","e2",["pm","leader","work"],           [65,78,62,68,68], "SD PM for most of 1929–42");
  I("Hans Hedtoft",          "Danish Social Democrats","e3",["pm","foreign","leader"],        [60,72,58,62,62], "SD PM 1947–50, 1953–55");
  I("Anker Jørgensen",       "Danish Social Democrats","e5",["pm","leader","work"],           [58,75,55,62,62], "SD PM 1972–73, 1975–82");
  I("Poul Nyrup Rasmussen",  "Danish Social Democrats","e6",["pm","chancellor","leader"],     [62,78,60,65,62], "SD PM 1993–2001");
  I("Helle Thorning-Schmidt","Danish Social Democrats","e7",["pm","leader"],                  [62,68,62,60,60], "First female Danish PM 2011–15");
  I("Mette Frederiksen",     "Danish Social Democrats","e7",["pm","leader","work"],           [65,70,62,65,65], "SD PM from 2019; welfare with tough immigration");
  I("Anders Fogh Rasmussen", "Venstre (DK)","e7",["pm","foreign","leader"],                  [62,75,60,65,62], "V PM 2001–09; NATO Secretary-General");
  I("Lars Løkke Rasmussen",  "Venstre (DK)","e7",["pm","chancellor","leader"],               [60,72,58,62,60], "V PM 2009–11, 2015–19");
  I("Hilmar Baunsgaard",     "Social Liberal Party (DK)","e4",["pm","chancellor"],           [58,70,55,62,55], "RV PM 1968–71");
  I("Pia Kjærsgaard",        "Danish People's Party","e6",["leader","home"],                 [60,68,60,55,62], "DF founder and long-time leader");
  I("Kristian Thulesen Dahl","Danish People's Party","e7",["leader","chancellor"],           [55,65,55,55,58], "DF leader 2012–22");
  I("Morten Messerschmidt",  "Danish People's Party","e7",["leader","foreign"],              [55,60,58,52,56], "DF leader from 2021");

  /* ── Finland ─────────────────────────────────────────────────── */
  I("Urho Kekkonen",         "Centre Party (FI)","e4",["pm","leader","foreign"],             [70,82,68,75,72], "Finland's dominant President 1956–82");
  I("Mauno Koivisto",        "Social Democratic Party (FI)","e5",["pm","chancellor","leader"],[62,78,58,68,65], "SDP PM and President 1982–94");
  I("Martti Ahtisaari",      "Social Democratic Party (FI)","e6",["pm","foreign"],           [65,78,60,70,60], "SDP President, Nobel Peace laureate");
  I("Tarja Halonen",         "Social Democratic Party (FI)","e7",["pm","foreign","leader"],  [65,75,62,68,62], "First female Finnish President 2000–12");
  I("Antti Rinne",           "Social Democratic Party (FI)","e7",["pm","leader","work"],     [55,65,52,58,55], "SDP PM 2019");
  I("Sanna Marin",           "Social Democratic Party (FI)","e7",["pm","leader"],            [65,62,65,60,62], "World's youngest PM 2019–23");
  I("Jyrki Katainen",        "National Coalition (FI)","e7",["pm","chancellor","leader"],    [60,70,55,62,60], "KOK PM 2011–14; EU Commissioner");
  I("Alexander Stubb",       "National Coalition (FI)","e7",["pm","foreign","chancellor"],   [62,68,62,62,60], "KOK PM 2014–15, President from 2024");
  I("Petteri Orpo",          "National Coalition (FI)","e7",["pm","chancellor","leader"],    [58,65,55,60,58], "KOK PM from 2023");
  I("Jussi Halla-aho",       "Finns Party","e7",["home","leader","immigration"],             [55,62,55,52,58], "PS leader 2017–23; EU Parliament president");
  I("Timo Soini",            "Finns Party","e7",["foreign","leader"],                        [58,65,58,55,58], "PS founder and foreign minister");
  I("Riikka Purra",          "Finns Party","e7",["chancellor","leader"],                     [55,62,55,52,56], "PS leader from 2022");
  I("Paavo Lipponen",        "Social Democratic Party (FI)","e6",["pm","chancellor","leader"],[62,78,58,65,62], "SDP PM 1995–2003");
  I("Esko Aho",              "Centre Party (FI)","e6",["pm","leader","chancellor"],          [60,72,55,62,60], "KESK PM 1991–95");

  /* ═══════════════════════════════════════════════════════════════
     GREECE
     ═══════════════════════════════════════════════════════════════ */
  I("Georgios Papandreou Sr.","Center Union (GR)","e4",["pm","foreign","leader"],             [68,78,70,68,68], "Greek PM and center-left patriarch");
  I("Andreas Papandreou",    "PASOK","e5",["pm","foreign","leader"],                          [70,78,72,68,70], "PASOK founder and PM 1981–89, 1993–96");
  I("Costas Simitis",        "PASOK","e6",["pm","chancellor","leader"],                       [60,78,55,68,62], "PASOK PM who took Greece into Eurozone");
  I("George Papandreou Jr.", "PASOK","e7",["pm","foreign","leader"],                          [58,72,55,62,58], "PASOK PM 2009–11, austerity trigger");
  I("Fofi Gennimata",        "PASOK","e7",["leader","pm"],                                    [55,65,55,55,58], "PASOK leader 2015–21");
  I("Nikos Androulakis",     "PASOK","e7",["foreign","leader","pm"],                          [56,62,52,55,56], "PASOK leader from 2021");
  I("Evangelos Venizelos",   "PASOK","e7",["deputy","chancellor","justice"],                  [58,72,58,60,58], "PASOK deputy PM and finance minister");
  I("Kostas Skandalidis",    "PASOK","e6",["agriculture","work"],                             [50,60,48,52,50], "PASOK agriculture minister");
  I("Giorgos Papakonstantinou","PASOK","e7",["chancellor"],                                   [54,62,50,55,52], "PASOK finance minister who revealed deficit hole");
  I("Konstantinos Karamanlis Sr.","New Democracy (GR)","e4",["pm","foreign","leader"],       [68,80,65,72,68], "ND founder; restored democracy 1974");
  I("Kostas Mitsotakis Sr.", "New Democracy (GR)","e5",["pm","leader","home"],               [60,75,58,62,60], "ND PM 1990–93");
  I("Kostas Karamanlis Jr.", "New Democracy (GR)","e7",["pm","leader"],                       [58,70,52,60,58], "ND PM 2004–09");
  I("Kyriakos Mitsotakis",   "New Democracy (GR)","e7",["pm","leader","business"],           [62,68,60,62,62], "ND PM from 2019");
  I("Adonis Georgiadis",     "New Democracy (GR)","e7",["health","trade","leader"],           [55,62,58,55,55], "ND health minister");
  I("Makis Voridis",         "New Democracy (GR)","e7",["home","justice"],                   [52,60,52,50,52], "ND interior minister");
  I("Vangelis Meimarakis",   "New Democracy (GR)","e7",["defence","leader","pm"],            [55,65,52,55,55], "ND leader 2015");
  I("Alexis Tsipras",        "Syriza","e7",["pm","leader"],                                   [65,65,68,60,62], "Syriza PM 2015–19; austerity and bailout");
  I("Yannis Varoufakis",     "Syriza","e7",["chancellor","foreign"],                          [60,58,65,52,48], "Game-theorist finance minister, then Diem25");
  I("Panos Kammenos",        "Syriza","e7",["defence","leader"],                              [50,58,52,48,50], "ANEL partner in Tsipras coalition");
  I("Nikos Pappas",          "Syriza","e7",["digital","pm"],                                  [52,58,52,50,52], "Tsipras chief of staff");
  I("Panagiotis Lafazanis",  "Syriza","e7",["leader","energy"],                              [50,58,52,48,50], "Syriza left platform leader");
  I("Zoe Konstantopoulou",   "Syriza","e7",["justice","pm"],                                  [55,58,58,52,52], "Syriza parliament speaker, then dissident");
  I("Nikos Koutsoumaras",    "Syriza","e7",["leader"],                                        [48,52,48,46,48], "Syriza party official");
  I("Nikos Mottas",          "KKE (GR)","e7",["leader","work"],                               [50,55,52,48,50], "KKE Politburo member");
  I("Aleka Papariga",        "KKE (GR)","e6",["leader","pm","work"],                          [55,68,55,52,58], "KKE leader 1991–2013");
  I("Dimitris Koutsoumpas",  "KKE (GR)","e7",["leader","pm"],                                 [52,62,50,50,54], "KKE leader from 2013");
  I("Nikos Zachariadis",     "KKE (GR)","e3",["leader"],                                      [45,65,45,45,50], "KKE leader during Civil War");
  I("Georgios Kondylis",     "Center Union (GR)","e3",["pm","defence"],                       [52,65,48,52,48], "Greek royalist general and PM");
  I("Eleftherios Venizelos", "Center Union (GR)","e2",["pm","foreign","leader"],              [72,78,70,72,70], "Greece's greatest liberal statesman");
  I("Nikos Dendias",         "New Democracy (GR)","e7",["foreign","home","defence"],          [56,65,52,58,55], "ND foreign and defence minister");
  I("Takis Theodorikakos",   "New Democracy (GR)","e7",["home"],                              [50,58,48,50,50], "ND interior minister");

  /* ═══════════════════════════════════════════════════════════════
     NETHERLANDS
     ═══════════════════════════════════════════════════════════════ */
  I("Geert Wilders",         "PVV (NL)","e7",["leader","pm","home"],                         [65,68,68,55,62], "PVV founder, PM from 2024");
  I("Martin Bosma",          "PVV (NL)","e7",["culture","leader","pm"],                      [56,60,58,52,55], "PVV parliament speaker 2023");
  I("Fleur Agema",           "PVV (NL)","e7",["health","deputy"],                             [55,60,58,52,55], "PVV health and deputy PM");
  I("Barry Madlener",        "PVV (NL)","e7",["transport","infrastructure"],                  [52,56,52,50,52], "PVV infrastructure minister");
  I("Ruud Lubbers",          "CDA (NL)","e5",["pm","chancellor","foreign"],                  [65,80,62,72,68], "CDA PM 1982–94; longest-serving Netherlands PM");
  I("Dries van Agt",         "CDA (NL)","e5",["pm","justice","leader"],                      [60,75,60,65,60], "CDA PM 1977–82");
  I("Jan Peter Balkenende",  "CDA (NL)","e7",["pm","chancellor","leader"],                   [58,72,52,62,60], "CDA PM 2002–10");
  I("Wim Kok",               "PvdA (NL)","e6",["pm","chancellor","leader"],                  [62,78,58,68,65], "PvdA PM 1994–2002; Purple coalition");
  I("Joop den Uyl",          "PvdA (NL)","e5",["pm","chancellor","leader"],                  [68,78,68,68,68], "PvdA PM 1973–77; most left Dutch PM");
  I("Frans Timmermans",      "PvdA (NL)","e7",["pm","foreign","environment"],                [65,75,65,68,60], "PvdA/GL EU Green Deal chief");
  I("Mark Rutte",            "VVD (NL)","e7",["pm","leader","chancellor"],                   [65,75,62,68,65], "VVD PM 2010–22; then NATO SG");
  I("Dilan Yeşilgöz",        "VVD (NL)","e7",["home","leader","pm"],                         [60,62,60,58,60], "VVD leader from 2023");
  I("Frits Bolkestein",      "VVD (NL)","e6",["leader","defence","trade"],                   [62,75,62,65,60], "VVD liberal icon; EU services directive");
  I("Hans Wiegel",           "VVD (NL)","e5",["pm","home","leader"],                         [62,72,65,60,65], "VVD opposition leader 1970s");
  I("Rob Jetten",            "D66 (NL)","e7",["energy","leader","pm"],                        [56,60,58,54,56], "D66 energy minister");
  I("Alexander Pechtold",    "D66 (NL)","e7",["justice","leader"],                            [60,68,60,58,60], "D66 leader 2006–18");
  I("Sigrid Kaag",           "D66 (NL)","e7",["chancellor","foreign","leader","pm"],          [62,68,62,62,60], "D66 leader and finance minister");
  I("Jan Pronk",             "PvdA (NL)","e5",["development","environment","foreign"],        [60,72,58,62,55], "PvdA development aid minister");
  I("Jan Wijffels",          "CDA (NL)","e6",["agriculture","chancellor"],                    [52,65,48,55,52], "CDA finance and agriculture");
  I("Emile Roemer",          "SP (NL)","e7",["leader","pm","work"],                           [58,62,58,55,58], "SP leader 2008–17");
  I("Agnes Kant",            "SP (NL)","e7",["health","leader"],                              [55,60,55,52,55], "SP leader 2008–10");
  I("Peter Marijnissen",     "SP (NL)","e7",["leader","work","pm"],                           [58,62,58,55,58], "SP leader 2017–22");
  I("Jan Marijnissen",       "SP (NL)","e6",["leader","work"],                                [60,68,60,55,62], "SP founder and patriarch");
  I("Jesse Klaver",          "GL (NL)","e7",["leader","pm","environment"],                    [62,60,65,58,60], "GroenLinks leader from 2015");
  I("Femke Halsema",         "GL (NL)","e6",["leader","justice"],                             [62,65,62,58,58], "GL leader 2002–11; Amsterdam mayor");
  I("Abraham Kuyper",        "ARP (NL)","e1",["pm","leader","education"],                     [65,72,70,65,65], "ARP founder and PM; Calvinist statesman");
  I("Hendrikus Colijn",      "ARP (NL)","e2",["pm","chancellor","defence"],                   [58,72,52,62,58], "ARP PM in 1930s depression");

  /* ═══════════════════════════════════════════════════════════════
     IRELAND
     ═══════════════════════════════════════════════════════════════ */
  I("Éamon de Valera",       "Fianna Fáil","e2",["pm","leader","foreign"],                    [68,80,65,72,72], "FF founder; Taoiseach six times; President");
  I("Seán Lemass",           "Fianna Fáil","e4",["pm","trade","business"],                    [65,80,60,70,68], "FF Taoiseach who modernised Ireland");
  I("Jack Lynch",            "Fianna Fáil","e4",["pm","leader","foreign"],                    [62,75,62,65,65], "FF Taoiseach 1966–73, 1977–79");
  I("Charles Haughey",       "Fianna Fáil","e5",["pm","chancellor","leader"],                 [62,75,65,62,65], "FF Taoiseach three times; controversial nationalist");
  I("Albert Reynolds",       "Fianna Fáil","e6",["pm","chancellor","foreign"],               [60,72,58,62,60], "FF Taoiseach; Good Friday negotiations");
  I("Bertie Ahern",          "Fianna Fáil","e6",["pm","leader","chancellor"],                 [65,78,62,68,68], "FF Taoiseach 1997–2008; Celtic Tiger PM");
  I("Brian Cowen",           "Fianna Fáil","e7",["pm","chancellor","leader"],                 [55,72,52,60,58], "FF Taoiseach during crash 2008–11");
  I("Micheál Martin",        "Fianna Fáil","e7",["pm","health","foreign","leader"],           [60,75,60,62,62], "FF Taoiseach 2020–22");
  I("Frank Aiken",           "Fianna Fáil","e4",["foreign","defence"],                        [58,72,55,60,58], "FF foreign minister; nuclear non-proliferation");
  I("Gerry Collins",         "Fianna Fáil","e5",["foreign","justice"],                        [52,68,50,55,52], "FF foreign and justice minister");
  I("Brian Lenihan Sr.",     "Fianna Fáil","e5",["justice","foreign"],                        [55,68,55,55,55], "FF justice minister");
  I("Brian Lenihan Jr.",     "Fianna Fáil","e7",["chancellor"],                               [58,62,55,58,52], "FF finance minister during 2008 crash");
  I("Mary Hanafin",          "Fianna Fáil","e7",["education","work","leader"],                [56,65,55,55,56], "FF education and social affairs minister");
  I("Éamon Ó Cuív",          "Fianna Fáil","e7",["community","leader"],                       [52,62,50,52,52], "FF community and Gaeltacht minister");
  I("Mary O'Rourke",         "Fianna Fáil","e6",["education","health"],                       [55,68,55,55,54], "FF education and health minister");
  I("Donal Carey",           "Fine Gael","e5",["pm","local"],                                 [48,58,46,50,48], "FG local government politician");
  I("W.T. Cosgrave",         "Cumann na nGaedheal","e2",["pm","leader"],                      [62,72,58,65,62], "First President of Executive Council");
  I("Kevin O'Higgins",       "Cumann na nGaedheal","e2",["justice","deputy"],                 [60,65,62,60,55], "CnaG justice minister, assassinated 1927");
  I("Richard Mulcahy",       "Cumann na nGaedheal","e2",["defence","leader","pm"],            [55,68,52,58,55], "CnaG army commander, FG leader");
  I("WT Cosgrave's cabinet", "Cumann na nGaedheal","e2",["pm"],                               [48,60,46,50,48], "CnaG government member");
  I("John A. Costello",      "Fine Gael","e3",["pm","justice"],                               [58,70,55,60,55], "FG Taoiseach who declared Republic 1948");
  I("Liam Cosgrave",         "Fine Gael","e5",["pm","foreign","leader"],                      [58,72,52,62,58], "FG Taoiseach 1973–77");
  I("Garret FitzGerald",     "Fine Gael","e5",["pm","foreign","chancellor","leader"],          [65,78,65,68,62], "FG Taoiseach twice; Anglo-Irish Agreement");
  I("Alan Dukes",            "Fine Gael","e6",["pm","chancellor","leader"],                   [58,70,55,60,58], "FG leader 1987–90; Tallaght Strategy");
  I("John Bruton",           "Fine Gael","e6",["pm","chancellor","foreign","leader"],          [60,72,55,62,60], "FG Taoiseach 1994–97");
  I("Enda Kenny",            "Fine Gael","e7",["pm","leader"],                                [60,75,58,65,65], "FG Taoiseach 2011–17; led recovery");
  I("Leo Varadkar",          "Fine Gael","e7",["pm","deputy","health","leader"],              [62,68,62,62,62], "FG Taoiseach 2017–20, 2022–24");
  I("Simon Harris",          "Fine Gael","e7",["pm","health","education","leader"],           [60,62,60,58,58], "FG Taoiseach from 2024");
  I("Michael Noonan",        "Fine Gael","e7",["chancellor","leader"],                        [58,72,52,62,58], "FG finance minister through austerity");
  I("Frances Fitzgerald",    "Fine Gael","e7",["justice","deputy","leader"],                  [56,65,55,58,56], "FG justice and deputy PM");
  I("Gerry Adams",           "Sinn Féin","e6",["leader","foreign","pm"],                      [60,75,62,62,62], "SF leader 1983–2018; peace process");
  I("Martin McGuinness",     "Sinn Féin","e6",["deputy","education","leader"],                [60,72,60,62,60], "IRA commander; Deputy First Minister NI");
  I("Mary Lou McDonald",     "Sinn Féin","e7",["leader","pm","chancellor"],                   [65,68,65,62,65], "SF leader from 2018");
  I("Pearse Doherty",        "Sinn Féin","e7",["chancellor","leader"],                        [62,65,60,60,60], "SF finance spokesperson");
  I("Eoin Ó Broin",          "Sinn Féin","e7",["housing","work"],                             [58,60,60,55,56], "SF housing spokesperson");
  I("Louise O'Reilly",       "Sinn Féin","e7",["work","health"],                              [55,58,56,52,54], "SF labour spokesperson");
  I("Matt Carthy",           "Sinn Féin","e7",["agriculture","foreign"],                      [55,58,55,52,54], "SF agriculture spokesperson");
  I("Caoimhe Archibald",     "Sinn Féin","e7",["chancellor","pm"],                            [52,55,52,50,52], "SF Northern Ireland finance minister");
  I("Dick Spring",           "Labour (IE)","e5",["deputy","foreign","leader","pm"],           [62,72,60,62,60], "Labour Tánaiste and foreign minister");
  I("Ruairí Quinn",          "Labour (IE)","e6",["chancellor","education","leader"],           [60,72,58,62,58], "Labour leader 1997–2002; finance minister");
  I("Pat Rabbitte",          "Labour (IE)","e7",["leader","pm"],                              [60,68,60,58,58], "Labour leader 2002–07");
  I("Eamon Gilmore",         "Labour (IE)","e7",["deputy","foreign","leader"],                [60,70,58,60,60], "Labour leader 2007–14; Tánaiste");
  I("Joan Burton",           "Labour (IE)","e7",["chancellor","deputy","leader"],             [56,68,52,58,55], "Labour Tánaiste 2014–16");
  I("James Connolly",        "Labour (IE)","e1",["leader","work"],                            [68,60,70,62,62], "Irish labour movement and 1916 Rising leader");
  I("John Horgan",           "Labour (IE)","e5",["education","leader"],                       [55,65,55,55,52], "Labour education spokesperson");
  I("Brendan Howlin",        "Labour (IE)","e7",["chancellor","work","leader"],               [58,70,55,58,58], "Labour leader 2016–20; public expenditure");
  I("Aodhán Ó Ríordáin",     "Labour (IE)","e7",["immigration","equality"],                   [52,55,55,50,52], "Labour senator and EU parliamentarian");
  I("Seán MacBride",         "Clann na Poblachta","e3",["foreign","justice","leader"],        [65,70,62,65,58], "Nobel Peace Prize; IRA to Irish statesman");
  I("Noël Browne",           "Clann na Poblachta","e3",["health","leader"],                   [62,62,62,58,52], "Mother and Child Scheme health minister");
  I("Catherine Martin",      "Green Party (IE)","e7",["culture","pm","leader"],              [55,60,55,55,55], "Green deputy PM");
  I("Eamon Ryan",            "Green Party (IE)","e7",["energy","transport","leader","pm"],   [58,65,55,58,55], "Green leader and PM's coalition partner");
  I("Trevor Sargent",        "Green Party (IE)","e7",["agriculture","leader"],               [55,60,52,52,55], "Green leader 2001–07");
  I("Ciaran Cuffe",          "Green Party (IE)","e7",["environment","transport"],             [52,58,52,50,52], "Green MEP, urban planning");
  I("Holly Cairns",          "Social Democrats (IE)","e7",["leader","work","health"],        [55,55,58,52,55], "Social Democrats co-leader from 2022");
  I("Jennifer Carroll MacNeill","Fine Gael","e7",["justice","equality"],                      [54,58,55,52,52], "FG justice politician");

  /* ═══════════════════════════════════════════════════════════════
     AUSTRIA, BELGIUM, SWITZERLAND
     ═══════════════════════════════════════════════════════════════ */
  I("Bruno Kreisky",         "SPÖ (AT)","e5",["pm","chancellor","foreign","leader"],          [72,82,72,75,72], "SPÖ Chancellor 1970–83; Austria's greatest postwar PM");
  I("Franz Vranitzky",       "SPÖ (AT)","e6",["pm","chancellor","leader"],                   [62,78,58,68,62], "SPÖ Chancellor 1986–97");
  I("Viktor Klima",          "SPÖ (AT)","e7",["pm","chancellor","leader"],                   [55,68,52,60,58], "SPÖ Chancellor 1997–2000");
  I("Alfred Gusenbauer",     "SPÖ (AT)","e7",["pm","leader"],                                [55,65,52,58,55], "SPÖ Chancellor 2007–08");
  I("Werner Faymann",        "SPÖ (AT)","e7",["pm","leader","transport"],                    [52,65,48,56,55], "SPÖ Chancellor 2008–16");
  I("Christian Kern",        "SPÖ (AT)","e7",["pm","business","chancellor"],                 [56,62,55,58,52], "SPÖ Chancellor 2016–17");
  I("Pamela Rendi-Wagner",   "SPÖ (AT)","e7",["health","leader"],                            [55,62,55,55,54], "SPÖ leader 2018–23");
  I("Karl Renner",           "SPÖ (AT)","e2",["pm","chancellor","leader"],                   [62,78,58,65,60], "SPÖ first Austrian president; republic founder");
  I("Julius Raab",           "ÖVP","e4",["pm","chancellor","leader","trade"],                [62,78,58,68,60], "ÖVP Chancellor; State Treaty negotiator");
  I("Alfons Gorbach",        "ÖVP","e4",["pm","chancellor","leader"],                        [55,70,50,60,55], "ÖVP Chancellor 1961–64");
  I("Josef Klaus",           "ÖVP","e4",["pm","chancellor","leader"],                        [58,72,52,62,58], "ÖVP Chancellor 1964–70");
  I("Alois Mock",            "ÖVP","e5",["foreign","leader","pm"],                           [60,75,58,65,60], "ÖVP foreign minister; EU accession architect");
  I("Wolfgang Schüssel",     "ÖVP","e7",["pm","chancellor","trade","leader"],                [60,75,58,65,60], "ÖVP Chancellor 2000–07; coalition with FPÖ");
  I("Wilhelm Molterer",      "ÖVP","e7",["chancellor","leader"],                             [52,65,48,55,52], "ÖVP leader 2007–08");
  I("Michael Spindelegger",  "ÖVP","e7",["deputy","foreign","chancellor","leader"],          [52,65,48,55,52], "ÖVP leader 2011–14");
  I("Reinhold Mitterlehner", "ÖVP","e7",["business","chancellor","leader"],                 [52,62,48,55,50], "ÖVP leader 2014–17");
  I("Sebastian Kurz",        "ÖVP","e7",["pm","foreign","chancellor","leader"],              [65,62,68,60,65], "ÖVP Chancellor 2017–21; youngest head of government");
  I("Alexander Schallenberg", "ÖVP","e7",["pm","foreign","chancellor"],                     [56,62,52,58,52], "ÖVP Chancellor 2021");
  I("Karl Nehammer",         "ÖVP","e7",["pm","home","chancellor"],                          [56,62,52,58,52], "ÖVP Chancellor from 2021");
  I("Herbert Kickl",         "FPÖ","e7",["home","leader","pm"],                              [58,62,60,52,60], "FPÖ leader from 2021; Chancellor nominee 2024");
  I("Jörg Haider",           "FPÖ","e6",["pm","leader"],                                     [65,65,70,55,62], "FPÖ populist; 1999 election sensation; died 2008");
  I("Norbert Hofer",         "FPÖ","e7",["pm","transport","leader"],                         [58,60,58,52,55], "FPÖ 2016 presidential near-miss");
  I("Heinz-Christian Strache","FPÖ","e7",["pm","home","leader"],                             [55,60,58,50,55], "FPÖ leader; 'Ibiza affair' scandal");
  I("Werner Kogler",         "Greens (AT)","e7",["deputy","chancellor","leader","pm"],       [58,65,58,55,56], "Greens AT deputy Chancellor and leader");
  I("Beate Meinl-Reisinger", "NEOS (AT)","e7",["leader","chancellor","pm"],                 [58,58,60,54,56], "NEOS leader from 2018");

  /* Belgium */
  I("Bart De Wever",         "N-VA","e7",["pm","chancellor","leader"],                        [65,72,68,65,68], "N-VA leader, Antwerp mayor, Belgian PM 2024");
  I("Alexander De Croo",     "Open VLD","e7",["pm","chancellor","foreign"],                   [60,65,58,62,60], "VLD PM 2020–24");
  I("Elio Di Rupo",          "PS (BE)","e7",["pm","chancellor","leader"],                     [62,75,62,65,62], "PS PM 2011–14; first gay PM in Western Europe");
  I("Philippe Moureaux",     "PS (BE)","e5",["pm","home","leader"],                           [58,72,55,62,58], "PS interior minister");
  I("Laurette Onkelinx",     "PS (BE)","e6",["health","deputy","leader"],                     [58,68,55,58,56], "PS deputy PM and health minister");
  I("Paul-Henri Spaak",      "PS (BE)","e3",["pm","foreign","leader"],                        [70,78,70,72,68], "Belgian PM; NATO SG; EU founding father");
  I("Jean-Luc Dehaene",      "cd&v","e6",["pm","chancellor","leader"],                        [62,78,55,68,62], "CVP PM 1992–99; 'steam roller'");
  I("Yves Leterme",          "cd&v","e7",["pm","chancellor","foreign","leader"],              [55,68,52,60,55], "CD&V PM; Belgian state reform crisis");
  I("Herman Van Rompuy",     "cd&v","e7",["pm","chancellor","leader"],                        [58,75,52,65,58], "CVP/CD&V PM; first European Council president");
  I("Guy Verhofstadt",       "Open VLD","e6",["pm","chancellor","foreign","leader"],           [62,75,62,65,60], "VLD PM 1999–2008; EU liberal leader");
  I("Tom Van Grieken",       "Vlaams Belang","e7",["leader","pm"],                             [56,58,60,50,58], "VB president from 2012");
  I("Frank Vanhecke",        "Vlaams Belang","e6",["leader","pm"],                             [52,60,55,50,52], "VB leader 2004–08");
  I("Philippe Goffin",       "MR (BE)","e7",["foreign","defence"],                            [52,60,50,52,50], "MR foreign and defence minister");
  I("Louis Michel",          "MR (BE)","e6",["foreign","pm","deputy"],                        [60,72,60,62,58], "MR foreign minister and EU commissioner");
  I("Raoul Hedebouw",        "PTB-PVDA","e7",["leader","work"],                               [58,58,62,52,56], "PTB-PVDA leader and MP");
  I("Peter Mertens",         "PTB-PVDA","e7",["leader","work","health"],                      [56,58,60,50,56], "PTB-PVDA chairman");

  /* Switzerland */
  I("Christoph Blocher",     "SVP (CH)","e6",["leader","justice","business"],                [62,72,62,58,62], "SVP oligarch and populist; justice minister ousted");
  I("Ueli Maurer",           "SVP (CH)","e7",["chancellor","defence","leader"],              [55,72,50,60,55], "SVP finance minister and Federal President");
  I("Guy Parmelin",          "SVP (CH)","e7",["agriculture","defence","pm"],                 [52,62,48,52,50], "SVP Federal President 2021");
  I("Viola Amherd",          "CVP (CH)","e7",["defence","pm"],                               [56,62,55,58,52], "Centre defence minister and Federal President");
  I("Doris Leuthard",        "CVP (CH)","e7",["energy","pm","leader"],                       [60,68,58,62,58], "CVP environment minister and twice president");
  I("Ruth Metzler",          "CVP (CH)","e7",["home","justice"],                              [52,60,50,52,52], "CVP justice minister ousted 2003");
  I("Karin Keller-Sutter",   "FDP (CH)","e7",["justice","home","chancellor"],                [58,65,55,60,56], "FDP justice and finance minister");
  I("Johann Schneider-Ammann","FDP (CH)","e7",["trade","education","pm"],                    [52,60,48,52,50], "FDP trade and education minister");
  I("Micheline Calmy-Rey",   "SP (CH)","e7",["foreign","pm"],                                [60,68,58,62,55], "SP foreign minister, twice Federal President");
  I("Hans-Jürg Fehr",        "SP (CH)","e7",["work","social","leader"],                      [52,60,50,50,52], "SP party president 2004–10");
  I("Alain Berset",          "SP (CH)","e7",["health","culture","pm"],                        [62,65,60,62,58], "SP interior minister and twice Federal President");
  I("Ignazio Cassis",        "FDP (CH)","e7",["foreign","health","pm"],                       [58,60,55,58,52], "FDP foreign minister and Federal President");
  I("Regula Rytz",           "Green Party (CH)","e7",["environment","leader"],               [56,60,56,54,54], "GPS president 2012–21");
  I("Balthasar Glättli",     "Green Party (CH)","e7",["environment","digital","leader"],     [55,58,56,52,54], "GPS president from 2021");
  I("Albert Rösti",          "SVP (CH)","e7",["energy","transport","pm"],                    [52,60,50,52,52], "SVP energy minister and Federal President 2023");

  /* ── Portugal ─────────────────────────────────────────────────── */
  I("Mário Soares",          "PS (PT)","e5",["pm","foreign","leader"],                        [68,80,65,70,68], "PS PM twice, President twice; democracy restorer");
  I("António Guterres",      "PS (PT)","e6",["pm","foreign","chancellor","leader"],           [68,78,65,72,65], "PS PM 1995–2002; UN Secretary-General");
  I("José Sócrates",         "PS (PT)","e7",["pm","environment","leader"],                   [58,68,55,60,55], "PS PM 2005–11; austerity trigger");
  I("António Costa",         "PS (PT)","e7",["pm","home","chancellor","leader"],             [62,72,58,65,62], "PS PM 2015–23; left-leaning austerity reversal");
  I("Pedro Nuno Santos",     "PS (PT)","e7",["pm","transport","leader"],                     [58,62,60,55,58], "PS leader from 2023");
  I("Edmundo Martins",       "PS (PT)","e5",["pm","work"],                                    [52,65,48,55,50], "PS local and national politician");
  I("Francisco Assis",       "PS (PT)","e7",["foreign","justice","leader"],                  [54,62,52,54,52], "PS MEP and liberal voice");
  I("Vital Moreira",         "PS (PT)","e7",["justice","foreign"],                            [54,62,52,54,50], "PS constitutionalist and MEP");
  I("Carlos César",          "PS (PT)","e7",["pm","leader"],                                  [52,62,50,52,52], "PS Azores president and party president");
  I("Marcelo Rebelo de Sousa","PSD (PT)","e7",["pm","culture","leader"],                     [65,72,65,65,60], "PSD leader, then non-partisan President from 2016");
  I("Cavaco Silva",          "PSD (PT)","e6",["pm","chancellor","leader"],                   [60,78,55,65,60], "PSD PM 1985–95; President 2006–16");
  I("Pedro Passos Coelho",   "PSD (PT)","e7",["pm","chancellor","leader"],                   [58,68,52,60,55], "PSD PM 2011–15; austerity");
  I("Durão Barroso",         "PSD (PT)","e7",["pm","foreign","leader"],                      [60,72,58,62,58], "PSD PM 2002–04; European Commission president");
  I("Luís Montenegro",       "PSD (PT)","e7",["pm","leader"],                                 [56,62,52,55,55], "PSD leader and PM from 2024");
  I("Nuno Melo",             "CDS-PP","e7",["foreign","leader","pm"],                         [52,60,52,52,52], "CDS-PP leader from 2022");
  I("Paulo Portas",          "CDS-PP","e6",["foreign","deputy","leader"],                     [60,70,58,60,58], "CDS-PP leader and deputy PM");
  I("Diogo Freitas do Amaral","CDS-PP","e5",["pm","leader","foreign"],                        [58,72,58,62,58], "CDS-PP founder and leader");
  I("André Ventura",         "Chega","e7",["leader","pm","home"],                             [58,55,62,48,58], "Chega founder and president; Portugal's first far-right surge");
  I("Catarina Martins",      "Bloco de Esquerda","e7",["work","leader","pm"],                [56,60,58,52,56], "BE leader 2012–22");
  I("Francisco Louçã",       "Bloco de Esquerda","e6",["chancellor","leader"],               [58,65,60,55,56], "BE co-founder and economist");

})();

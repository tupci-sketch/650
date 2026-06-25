/* ============================================================
   650 — POLITICIANS EXPANSION III
   ~800+ more international figures covering Europe, Latin America,
   Africa, Middle East, South & Southeast Asia, and deeper US/UK benches.
   All scope:"wild" — appear in Wildcard and country-specific modes.
   ============================================================= */
window.G = window.G || {};
(function () {
  var G = window.G;
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
    G.POLITICIANS.push(fig);
  }

  function reg(label, lineage, colour, align, cap) {
    if (!G.PARTIES[label]) G.PARTIES[label] = { label: label, lineage: lineage, colour: colour, cap: cap || 650 };
    if (G.PARTY_ALIGN && !(label in G.PARTY_ALIGN)) G.PARTY_ALIGN[label] = align || 0;
    if (G.LINEAGE_ALIGN && !(lineage in G.LINEAGE_ALIGN)) G.LINEAGE_ALIGN[lineage] = align || 0;
  }

  // ── Party registrations ──────────────────────────────────────────────────────
  // Italy
  reg("Christian Democracy (IT)", "DC_IT", "#1565c0", 0.3, 630);
  reg("Italian Communist Party", "PCI_IT", "#cc0000", -1.8, 630);
  reg("Italian Socialist Party", "PSI_IT", "#ff1744", -0.8, 630);
  reg("Forza Italia", "FI_IT", "#003399", 1.0, 630);
  reg("Lega Nord", "LN_IT", "#00883a", 1.5, 630);
  reg("Five Star Movement", "M5S_IT", "#f5c400", 0.0, 630);
  reg("Brothers of Italy", "FDI_IT", "#1d3461", 1.8, 630);
  reg("Partito Democratico (IT)", "PD_IT", "#e53935", -0.8, 630);
  reg("National Alliance (IT)", "AN_IT", "#003399", 1.4, 630);
  reg("Action Party (IT)", "AP_IT", "#1565c0", 0.0, 630);
  // Spain
  reg("PSOE", "PSOE", "#e53935", -0.8, 350);
  reg("People's Party (ES)", "PP_ES", "#0d47a1", 1.2, 350);
  reg("Podemos", "Podemos", "#6a0dad", -1.4, 350);
  reg("Vox", "Vox", "#3cb371", 2.0, 350);
  reg("Ciudadanos", "CS_ES", "#ff6600", 0.2, 350);
  reg("Falange", "Falange", "#000080", 2.5, 350);
  reg("Communist Party (ES)", "PCE", "#cc0000", -1.8, 350);
  // Poland
  reg("Polish United Workers' Party", "PZPR", "#cc0000", -1.5, 460);
  reg("Law and Justice", "PiS", "#003366", 1.6, 460);
  reg("Civic Platform", "PO_PL", "#ff8c00", 0.2, 460);
  reg("Polish People's Party", "PSL", "#009900", 0.4, 460);
  // Czech
  reg("ODS (CZ)", "ODS", "#1565c0", 1.2, 200);
  reg("ANO (CZ)", "ANO", "#9e1b32", 0.5, 200);
  reg("ČSSD (CZ)", "CSSD_CZ", "#e53935", -0.8, 200);
  reg("Communist Party (CZ)", "KSCM", "#cc0000", -1.8, 200);
  reg("Czech National Social Party", "CNSP", "#999999", 0.0, 200);
  // Hungary
  reg("Hungarian Socialist Workers' Party", "MSZMP", "#cc0000", -1.5, 200);
  reg("Fidesz", "Fidesz", "#ff7700", 1.6, 200);
  reg("MSZP", "MSZP", "#e53935", -0.8, 200);
  reg("MDF", "MDF_HU", "#008000", 0.5, 200);
  // Nordic
  reg("Norwegian Labour", "Ap", "#e53935", -0.8, 169);
  reg("Conservative (NO)", "Hoyre", "#003399", 1.0, 169);
  reg("Progress Party (NO)", "FrP", "#4169e1", 1.5, 169);
  reg("Christian Democratic Party (NO)", "KrF", "#f4a460", 0.5, 169);
  reg("Danish Social Democrats", "DK_SD", "#e53935", -0.8, 179);
  reg("Venstre (DK)", "Venstre", "#4169e1", 0.8, 179);
  reg("Danish People's Party", "DF", "#f5c400", 1.6, 179);
  reg("Centre Party (FI)", "Kesk", "#00883a", 0.2, 200);
  reg("Social Democratic Party (FI)", "SDP_FI", "#e53935", -0.8, 200);
  reg("National Coalition (FI)", "Kok", "#0d47a1", 1.0, 200);
  reg("Sweden Democrats", "SD_SE", "#003399", 1.7, 349);
  reg("Centre Party (SE)", "C_SE", "#00883a", 0.0, 349);
  // Benelux/Swiss
  reg("PVV (NL)", "PVV", "#1e3a6e", 1.8, 150);
  reg("CDA (NL)", "CDA", "#00883a", 0.6, 150);
  reg("D66 (NL)", "D66", "#00857d", -0.2, 150);
  reg("N-VA", "NVA", "#f5a623", 1.0, 150);
  reg("PS (BE)", "PS_BE", "#e53935", -0.8, 150);
  reg("Open VLD", "OpenVLD", "#003399", 0.3, 150);
  reg("SVP (CH)", "SVP", "#00883a", 1.5, 200);
  reg("SP (CH)", "SP_CH", "#e53935", -0.8, 200);
  reg("FDP (CH)", "FDP_CH", "#4169e1", 0.5, 200);
  // Austria
  reg("SPÖ (AT)", "SPOE", "#e53935", -0.8, 183);
  reg("ÖVP", "OEVP", "#00883a", 0.8, 183);
  reg("FPÖ", "FPOE", "#1e3a6e", 1.8, 183);
  // Portugal
  reg("PS (PT)", "PS_PT", "#e53935", -0.8, 230);
  reg("PSD (PT)", "PSD_PT", "#ff7700", 0.8, 230);
  reg("CDS-PP", "CDS_PP", "#003399", 1.2, 230);
  reg("Chega", "Chega", "#1d3461", 1.8, 230);
  // Greece
  reg("PASOK", "PASOK", "#00883a", -0.5, 300);
  reg("New Democracy (GR)", "ND_GR", "#003399", 1.2, 300);
  reg("Syriza", "Syriza", "#cc0000", -1.4, 300);
  reg("KKE (GR)", "KKE", "#cc0000", -2.0, 300);
  // Turkey
  reg("Justice and Development Party", "AKP_TR", "#ff7700", 1.2, 600);
  reg("Motherland Party (TR)", "ANAP", "#ff8c00", 0.5, 600);
  reg("HDP (TR)", "HDP", "#6a0dad", -1.2, 600);
  reg("MHP (TR)", "MHP_TR", "#cc0000", 1.5, 600);
  // Israel
  reg("Labor (IL)", "Avoda", "#e53935", -0.5, 120);
  reg("Kadima", "Kadima", "#ff8c00", 0.2, 120);
  reg("Yesh Atid", "YeshAtid", "#4169e1", 0.0, 120);
  reg("Blue and White", "BlueWhite", "#4169e1", 0.2, 120);
  reg("Mapam", "Mapam", "#e53935", -1.0, 120);
  reg("National Unity (IL)", "NatUnity", "#4169e1", 0.3, 120);
  // Arab
  reg("Arab Socialist Union (EG)", "ASU", "#cc0000", -0.5, 454);
  reg("National Democratic Party (EG)", "NDP_EG", "#003399", 0.8, 454);
  reg("Muslim Brotherhood", "MB", "#009900", 0.5, 454);
  reg("Ba'ath Party", "Baath", "#cc0000", -0.5, 250);
  reg("Al Saud", "AlSaud", "#009900", 1.0, 100);
  reg("FLN (DZ)", "FLN", "#00883a", 0.0, 462);
  reg("RCD (TN)", "RCD_TN", "#003399", 0.5, 217);
  reg("Ennahda", "Ennahda", "#009900", 0.5, 217);
  reg("Istiqlal", "Istiqlal", "#cc0000", 0.2, 395);
  reg("PJD (MA)", "PJD", "#009900", 0.8, 395);
  // Iran
  reg("Islamic Republican Party", "IRP", "#009900", 0.5, 290);
  reg("National Front (IR)", "NF_IR", "#003399", -0.2, 290);
  // South Korea
  reg("Democratic Party (KR)", "DP_KR", "#1565c0", -0.5, 300);
  reg("PPP (KR)", "PPP_KR", "#e53935", 0.8, 300);
  reg("Liberal Democratic Party (KR)", "LDP_KR", "#003399", 0.5, 300);
  // Indonesia
  reg("PDI-P (ID)", "PDIP", "#e53935", -0.5, 575);
  reg("Golkar (ID)", "Golkar", "#f5c400", 0.5, 575);
  reg("Gerindra (ID)", "Gerindra", "#cc0000", 0.8, 575);
  reg("PKI (ID)", "PKI", "#cc0000", -1.8, 575);
  // Philippines
  reg("Liberal (PH)", "LP_PH", "#f5c400", -0.3, 297);
  reg("Nationalista (PH)", "NP_PH", "#003399", 0.5, 297);
  reg("PDP-Laban", "PDPLABAN", "#e53935", -0.3, 297);
  reg("Lakas (PH)", "Lakas", "#009900", 0.2, 297);
  // Vietnam
  reg("Communist Party (VN)", "CPV", "#cc0000", -1.5, 500);
  // Thailand
  reg("Thai Rak Thai", "TRT", "#003399", -0.3, 500);
  reg("Pheu Thai", "PheuThai", "#e53935", -0.5, 500);
  reg("PPRP (TH)", "PPRP", "#003399", 0.8, 500);
  reg("Democrat Party (TH)", "DP_TH", "#003399", 0.5, 500);
  // Malaysia
  reg("UMNO", "UMNO", "#e53935", 0.5, 222);
  reg("PKR (MY)", "PKR", "#0d47a1", -0.3, 222);
  reg("DAP (MY)", "DAP", "#e53935", -0.8, 222);
  reg("Bersatu", "Bersatu", "#ff7700", 0.2, 222);
  // Singapore
  reg("People's Action Party", "PAP_SG", "#1565c0", 0.3, 93);
  // Pakistan
  reg("PPP (PK)", "PPP_PK", "#cc0000", -0.8, 342);
  reg("PML-N", "PMLN", "#009900", 0.3, 342);
  reg("PTI", "PTI_PK", "#cc0000", 0.2, 342);
  reg("Muslim League (PK)", "ML_PK", "#009900", 0.3, 342);
  // Bangladesh
  reg("Awami League", "AL_BD", "#009900", -0.5, 350);
  reg("BNP (BD)", "BNP_BD", "#003399", 0.5, 350);
  // Nigeria
  reg("NCNC", "NCNC", "#003399", -0.2, 360);
  reg("NPC (NG)", "NPC_NG", "#009900", 0.5, 360);
  reg("PDP (NG)", "PDP_NG", "#cc0000", -0.2, 360);
  reg("APC (NG)", "APC_NG", "#009900", 0.5, 360);
  reg("Action Group (NG)", "AG_NG", "#f5c400", 0.0, 360);
  // Ghana
  reg("CPP (GH)", "CPP_GH", "#cc0000", -0.8, 275);
  reg("NPP (GH)", "NPP_GH", "#003399", 0.8, 275);
  reg("NDC (GH)", "NDC_GH", "#009900", -0.3, 275);
  // Kenya
  reg("KANU (KE)", "KANU", "#e53935", 0.0, 350);
  reg("ODM (KE)", "ODM", "#ff7700", -0.3, 350);
  reg("Jubilee (KE)", "Jubilee", "#e53935", 0.3, 350);
  reg("UDA (KE)", "UDA_KE", "#ff7700", 0.5, 350);
  // Tanzania
  reg("CCM (TZ)", "CCM", "#00883a", 0.0, 393);
  reg("TANU", "TANU", "#00883a", -0.5, 393);
  // Ethiopia
  reg("EPRDF", "EPRDF", "#00883a", -0.3, 547);
  reg("Prosperity Party (ET)", "PP_ET", "#00883a", -0.2, 547);
  reg("Derg", "Derg", "#cc0000", -1.5, 547);
  // Zimbabwe
  reg("ZANU-PF", "ZANUPF", "#cc0000", 0.0, 270);
  reg("ZAPU", "ZAPU", "#cc0000", -0.5, 270);
  reg("MDC (ZW)", "MDC", "#f5c400", -0.3, 270);
  // South Africa extra
  reg("IFP", "IFP_ZA", "#cc9900", 0.2, 400);
  reg("EFF", "EFF_ZA", "#cc0000", -1.5, 400);
  reg("DA (ZA)", "DA_ZA", "#003399", 0.5, 400);
  // Tunisia
  reg("Nidaa Tounes", "NT_TN", "#003399", 0.2, 217);
  // Brazil
  reg("PT (BR)", "PT_BR", "#e53935", -1.2, 513);
  reg("PMDB", "PMDB", "#009900", 0.0, 513);
  reg("PSDB", "PSDB_BR", "#003399", 0.2, 513);
  reg("PSL (BR)", "PSL_BR", "#f5c400", 0.8, 513);
  reg("PL (BR)", "PL_BR", "#003399", 0.8, 513);
  reg("UDN (BR)", "UDN_BR", "#003399", 0.5, 513);
  // Argentina
  reg("UCR (AR)", "UCR", "#e53935", -0.2, 257);
  reg("PRO (AR)", "PRO_AR", "#f5c400", 1.0, 257);
  reg("Frente de Todos", "FdT", "#003399", -0.8, 257);
  // Mexico
  reg("PRD (MX)", "PRD", "#f5c400", -0.5, 500);
  // Colombia
  reg("Liberal (CO)", "PLO_CO", "#cc0000", -0.3, 188);
  reg("Conservative (CO)", "PC_CO", "#003399", 0.8, 188);
  reg("Centro Democrático", "CD_CO", "#f5c400", 1.2, 188);
  reg("Pacto Histórico", "PH_CO", "#6a0dad", -1.0, 188);
  // Chile
  reg("PDC (CL)", "PDC_CL", "#f5c400", 0.2, 155);
  reg("PS (CL)", "PS_CL", "#e53935", -1.0, 155);
  reg("RN (CL)", "RN_CL", "#003399", 1.0, 155);
  reg("UDI (CL)", "UDI_CL", "#1d3461", 1.5, 155);
  reg("Frente Amplio (CL)", "FA_CL", "#cc0000", -1.4, 155);
  // Venezuela
  reg("AD (VE)", "AD_VE", "#f5c400", 0.2, 277);
  reg("COPEI", "COPEI", "#009900", 0.5, 277);
  reg("PSUV", "PSUV", "#cc0000", -1.5, 277);
  // Peru
  reg("APRA", "APRA", "#e53935", -0.5, 130);
  reg("Fuerza Popular (PE)", "FP_PE", "#ff7700", 0.8, 130);
  // Bolivia
  reg("MAS (BO)", "MAS_BO", "#003399", -1.0, 130);
  reg("MNR (BO)", "MNR_BO", "#e53935", 0.0, 130);
  // Uruguay
  reg("Frente Amplio (UY)", "FA_UY", "#cc0000", -0.8, 99);
  reg("Partido Colorado (UY)", "PC_UY", "#e53935", 0.2, 99);
  reg("Partido Nacional (UY)", "PN_UY", "#003399", 0.5, 99);
  // Misc
  reg("Dictators", "Dictators", "#4a0000", 2.0, 650);
  reg("World Leaders", "WorldLeaders", "#444444", 0.0, 650);

  // ── ITALY ───────────────────────────────────────────────────────────────────
  I("Alcide De Gasperi", "Christian Democracy (IT)", "e4", ["pm","foreign","leader"], [82,88,80,88,84],
    "Founding father of the Italian Republic and post-war democracy, dominant PM 1945–53.", { wiki: "Alcide De Gasperi" });
  I("Luigi Einaudi", "Christian Democracy (IT)", "e4", ["chancellor","leader"], [72,86,70,84,66],
    "First elected President of Italy and pioneering liberal economist who stabilised the lira.", { wiki: "Luigi Einaudi" });
  I("Amintore Fanfani", "Christian Democracy (IT)", "e4", ["pm","foreign","leader","trade"], [72,88,74,78,80],
    "Five-time Italian PM who drove post-war economic boom and pursued an independent foreign policy.", { wiki: "Amintore Fanfani" });
  I("Aldo Moro", "Christian Democracy (IT)", "e4", ["pm","foreign","justice","leader"], [80,88,82,84,82],
    "Architect of the 'historic compromise' with Communists; kidnapped and murdered by Red Brigades 1978.", { wiki: "Aldo Moro" });
  I("Bettino Craxi", "Italian Socialist Party", "e5", ["pm","foreign","leader"], [74,82,76,76,80],
    "First Socialist PM of Italy 1983–87; powerful but ultimately toppled by Tangentopoli corruption scandal.", { wiki: "Bettino Craxi" });
  I("Giovanni Leone", "Christian Democracy (IT)", "e4", ["pm","leader","justice"], [60,82,62,66,64],
    "President of Italy 1971–78; forced to resign amid financial scandal before completing his term.", { wiki: "Giovanni Leone" });
  I("Francesco Cossiga", "Christian Democracy (IT)", "e5", ["pm","home","leader"], [68,84,72,74,70],
    "PM and later President of Italy; controversial 'picconatore' who attacked institutions in his late term.", { wiki: "Francesco Cossiga" });
  I("Oscar Luigi Scalfaro", "Christian Democracy (IT)", "e6", ["pm","home","leader","justice"], [66,88,64,70,66],
    "President of Italy through Tangentopoli era, guided transition from First to Second Republic.", { wiki: "Oscar Luigi Scalfaro" });
  I("Carlo Azeglio Ciampi", "World Leaders", "e6", ["pm","chancellor","leader"], [78,90,74,82,68],
    "Governor of Banca d'Italia, PM 1993–94, and respected President who oversaw euro adoption.", { wiki: "Carlo Azeglio Ciampi" });
  I("Giulio Andreotti", "Christian Democracy (IT)", "e4", ["pm","foreign","defence","leader"], [70,94,68,78,84],
    "Seven-time PM and consummate DC insider; tried for Mafia links but acquitted, the ultimate Italian 'doroteo'.", { wiki: "Giulio Andreotti" });
  I("Romano Prodi", "Partito Democratico (IT)", "e6", ["pm","trade","foreign","leader"], [74,86,72,80,72],
    "Centre-left PM twice and European Commission President who oversaw Italy's entry into the eurozone.", { wiki: "Romano Prodi" });
  I("Silvio Berlusconi", "Forza Italia", "e6", ["pm","trade","leader","culture"], [78,80,80,66,82],
    "Media magnate turned three-time PM; dominated Italian politics despite legal battles and 'Bunga Bunga' scandals.", { wiki: "Silvio Berlusconi" });
  I("Mario Monti", "World Leaders", "e7", ["pm","chancellor","trade","leader"], [60,88,62,74,52],
    "Technocrat PM 2011–13 who imposed harsh austerity to save Italy from sovereign debt crisis.", { wiki: "Mario Monti" });
  I("Enrico Letta", "Partito Democratico (IT)", "e7", ["pm","foreign","leader"], [68,80,70,72,66],
    "Centre-left PM 2013–14, replaced by Renzi's internal coup; later led Partito Democratico.", { wiki: "Enrico Letta" });
  I("Matteo Renzi", "Partito Democratico (IT)", "e7", ["pm","leader","culture","trade"], [76,72,80,70,74],
    "Youngest Italian PM at 39; reform-driven 'demolition man' who fell after losing 2016 constitutional referendum.", { wiki: "Matteo Renzi" });
  I("Paolo Gentiloni", "Partito Democratico (IT)", "e7", ["pm","foreign","leader"], [68,82,66,74,66],
    "Steady caretaker PM 2016–18 and later European Commissioner for Economy.", { wiki: "Paolo Gentiloni" });
  I("Giuseppe Conte", "Five Star Movement", "e7", ["pm","justice","leader"], [70,68,72,68,66],
    "Law professor who led two contrasting coalition governments as PM 2018–21, later Five Star leader.", { wiki: "Giuseppe Conte" });
  I("Mario Draghi", "World Leaders", "e7", ["pm","chancellor","trade","leader"], [72,94,70,88,60],
    "Former ECB president and 'whatever it takes' architect; PM 2021–22 commanding cross-party national unity.", { wiki: "Mario Draghi" });
  I("Giorgia Meloni", "Brothers of Italy", "e7", ["pm","foreign","leader","home"], [80,74,82,74,84],
    "First female Italian PM; far-right post-fascist who won 2022 election and leads Brothers of Italy.", { wiki: "Giorgia Meloni" });
  I("Matteo Salvini", "Lega Nord", "e7", ["home","leader","deputy"], [78,72,76,60,80],
    "Populist Lega leader and interior minister known for anti-immigration stance and closing Italian ports.", { wiki: "Matteo Salvini" });
  I("Luigi Di Maio", "Five Star Movement", "e7", ["foreign","trade","leader","deputy"], [66,66,68,64,66],
    "Former Five Star leader and foreign minister who later defected to form centrist Insieme per il Futuro.", { wiki: "Luigi Di Maio" });
  I("Beppe Grillo", "Five Star Movement", "e7", ["leader","culture"], [80,50,86,48,74],
    "Comedian turned political disruptor who founded the Five Star Movement and transformed Italian politics.", { wiki: "Beppe Grillo" });
  I("Giorgio Almirante", "National Alliance (IT)", "e4", ["leader"], [68,82,74,58,78],
    "Post-war leader of the neo-fascist MSI for decades; polarising but gave Italian far-right parliamentary legitimacy.", { wiki: "Giorgio Almirante" });
  I("Gianfranco Fini", "National Alliance (IT)", "e6", ["pm","foreign","leader","deputy"], [72,82,74,70,74],
    "Transformed post-fascist MSI into mainstream National Alliance; deputy PM and later Speaker.", { wiki: "Gianfranco Fini" });
  I("Umberto Bossi", "Lega Nord", "e5", ["leader","trade"], [74,76,72,60,78],
    "Founded Lega Nord on northern separatism and federalism; dominated Italian coalition politics in the 1990s.", { wiki: "Umberto Bossi" });
  I("Pier Luigi Bersani", "Partito Democratico (IT)", "e7", ["leader","trade","business"], [68,82,70,70,70],
    "PD leader who narrowly lost 2013 election to Berlusconi; centre-left stalwart and trade union ally.", { wiki: "Pier Luigi Bersani" });
  I("Walter Veltroni", "Partito Democratico (IT)", "e6", ["leader","culture","pm"], [72,78,76,66,70],
    "First PD secretary and Rome mayor; Obama-inspired campaign style failed to unseat Berlusconi in 2008.", { wiki: "Walter Veltroni" });
  I("Sergio Mattarella", "Christian Democracy (IT)", "e7", ["leader","justice","home"], [82,90,74,84,70],
    "Constitutional court judge and twice-elected President of Italy, guardian of democratic norms.", { wiki: "Sergio Mattarella" });
  I("Giorgio Napolitano", "Italian Communist Party", "e4", ["leader","home","foreign"], [76,92,74,80,74],
    "Last founding-generation President; twice elected, steered Italy through financial crisis and two technocrat PMs.", { wiki: "Giorgio Napolitano" });
  I("Antonio Segni", "Christian Democracy (IT)", "e4", ["pm","leader","agriculture"], [62,82,60,66,66],
    "Italian PM twice and President; resigned due to ill health, associated with early attempts at authoritarian government.", { wiki: "Antonio Segni" });
  I("Giuseppe Saragat", "Italian Socialist Party", "e4", ["leader","foreign"], [66,82,68,70,66],
    "Social-democratic President of Italy 1964–71 who split from left Socialists to keep Italy firmly Western.", { wiki: "Giuseppe Saragat" });
  I("Giovanni Gronchi", "Christian Democracy (IT)", "e4", ["leader","trade"], [64,80,66,66,62],
    "President of Italy 1955–62; left-wing DC figure who pursued opening to Socialists and non-aligned foreign policy.", { wiki: "Giovanni Gronchi" });
  I("Enrico De Nicola", "World Leaders", "e4", ["leader","justice"], [70,88,66,72,58],
    "First provisional head of state of the Italian Republic after 1946 referendum ended the monarchy.", { wiki: "Enrico De Nicola" });
  I("Ferruccio Parri", "Action Party (IT)", "e4", ["pm","leader"], [68,76,72,66,58],
    "Partisan resistance leader and first post-war PM; resigned after six months, replaced by De Gasperi.", { wiki: "Ferruccio Parri" });
  I("Pietro Nenni", "Italian Socialist Party", "e4", ["leader","foreign","deputy"], [74,84,78,70,76],
    "Socialist leader who steered Italian left away from Communists toward government participation.", { wiki: "Pietro Nenni" });
  I("Palmiro Togliatti", "Italian Communist Party", "e4", ["leader","foreign"], [78,88,82,74,84],
    "Long-serving PCI leader who built the largest Communist party in Western Europe through 'Italian road to socialism'.", { wiki: "Palmiro Togliatti" });
  I("Luigi Longo", "Italian Communist Party", "e4", ["leader"], [64,80,66,62,74],
    "Togliatti's successor as PCI leader; oversaw the party's condemnation of the Soviet invasion of Czechoslovakia.", { wiki: "Luigi Longo" });
  I("Enrico Berlinguer", "Italian Communist Party", "e5", ["leader","foreign"], [82,82,84,76,82],
    "PCI leader who proposed 'historic compromise' with DC and championed Eurocommunism distinct from Moscow.", { wiki: "Enrico Berlinguer" });

  // ── SPAIN ───────────────────────────────────────────────────────────────────
  I("Francisco Franco", "Falange", "e3", ["pm","leader","defence"], [72,80,68,72,82],
    "Fascist dictator of Spain 1939–75; survived WWII isolation to modernise Spain while crushing dissent.", { wiki: "Francisco Franco", despot: true });
  I("Adolfo Suárez", "People's Party (ES)", "e5", ["pm","leader","home"], [80,78,82,80,78],
    "Architect of Spain's transition to democracy; first elected PM after Franco's death.", { wiki: "Adolfo Suárez" });
  I("Leopoldo Calvo-Sotelo", "People's Party (ES)", "e5", ["pm","trade","foreign","leader"], [62,80,62,68,64],
    "Succeeded Suárez as PM; oversaw Spain's NATO entry and survived 1981 coup attempt.", { wiki: "Leopoldo Calvo-Sotelo" });
  I("Felipe González", "PSOE", "e5", ["pm","foreign","trade","leader"], [84,86,84,82,84],
    "Spain's longest-serving democratic PM 1982–96; modernised and led Spain into the EU.", { wiki: "Felipe González" });
  I("José María Aznar", "People's Party (ES)", "e6", ["pm","foreign","trade","leader"], [74,82,74,76,80],
    "Conservative PM 1996–2004; joined Iraq War, boosted economy, then fell after Madrid bombings blamed on ETA.", { wiki: "José María Aznar" });
  I("José Luis Rodríguez Zapatero", "PSOE", "e7", ["pm","home","justice","leader"], [72,78,72,70,74],
    "Socialist PM 2004–11; legalised same-sex marriage, withdrew Iraq troops, struggled with financial crisis.", { wiki: "José Luis Rodríguez Zapatero" });
  I("Mariano Rajoy", "People's Party (ES)", "e7", ["pm","home","trade","leader"], [64,84,60,68,76],
    "Conservative PM who imposed austerity and triggered Article 155 to suspend Catalan autonomy in 2017.", { wiki: "Mariano Rajoy" });
  I("Pedro Sánchez", "PSOE", "e7", ["pm","foreign","leader","home"], [72,74,74,68,72],
    "PSOE leader who ousted Rajoy in 2018 no-confidence vote; governs in coalition with Sumar.", { wiki: "Pedro Sánchez" });
  I("Pablo Iglesias", "Podemos", "e7", ["leader","deputy","culture"], [78,66,80,62,74],
    "Ponytailed Podemos founder who stormed Spanish politics in 2014; served as deputy PM before retiring.", { wiki: "Pablo Iglesias (politician)" });
  I("Yolanda Díaz", "Podemos", "e7", ["leader","deputy","business","trade"], [74,72,74,70,70],
    "Labour lawyer and Galician Communist who became Spain's first female deputy PM and led Sumar coalition.", { wiki: "Yolanda Díaz" });
  I("Íñigo Errejón", "Podemos", "e7", ["leader","culture"], [68,64,72,60,64],
    "Podemos co-founder who broke away to form Más País; academic strategist behind the party's early rise.", { wiki: "Íñigo Errejón" });
  I("Albert Rivera", "Ciudadanos", "e7", ["leader","justice","trade"], [74,68,74,66,70],
    "Ciudadanos centrist leader who rose rapidly then collapsed; refused coalition with Sánchez enabling chaos.", { wiki: "Albert Rivera" });
  I("Carlos Puigdemont", "World Leaders", "e7", ["leader","home"], [72,72,74,58,72],
    "Catalan President who declared independence in 2017 then fled to Belgium to avoid Spanish prosecution.", { wiki: "Carles Puigdemont" });
  I("Oriol Junqueras", "World Leaders", "e7", ["leader","chancellor","deputy"], [68,74,70,62,68],
    "Catalan vice-president imprisoned for nine years for role in 2017 independence referendum.", { wiki: "Oriol Junqueras" });
  I("Santiago Abascal", "Vox", "e7", ["leader","home"], [72,66,74,58,72],
    "Far-right Vox leader who brought anti-immigration, Francoist-nostalgic politics back to Spanish parliament.", { wiki: "Santiago Abascal" });
  I("Santiago Carrillo", "Communist Party (ES)", "e4", ["leader","foreign"], [72,82,74,66,76],
    "PCE leader who embraced Eurocommunism and negotiated the transition to democracy in Franco's last years.", { wiki: "Santiago Carrillo" });
  I("Dolores Ibárruri", "Communist Party (ES)", "e3", ["leader","culture"], [82,78,90,64,76],
    "'La Pasionaria' — iconic Republican orator of Spanish Civil War whose cry 'No pasarán!' defined the era.", { wiki: "Dolores Ibárruri" });
  I("Manuel Fraga", "People's Party (ES)", "e5", ["leader","home","culture"], [68,86,70,66,72],
    "Franco-era minister and founder of Alianza Popular; galician patriarch who shaped Spanish conservatism.", { wiki: "Manuel Fraga" });
  I("Alfonso Guerra", "PSOE", "e5", ["deputy","leader","culture"], [70,80,74,68,76],
    "González's powerful deputy PM and PSOE enforcer; master political organiser of Spain's socialist era.", { wiki: "Alfonso Guerra" });
  I("Javier Solana", "PSOE", "e6", ["foreign","defence","leader"], [78,88,76,84,68],
    "González's foreign minister then NATO Secretary-General and EU foreign policy chief for a decade.", { wiki: "Javier Solana" });
  I("Josep Tarradellas", "World Leaders", "e4", ["leader","home"], [68,76,66,66,64],
    "President of Generalitat de Catalunya in exile for 38 years; returned to lead Catalan restoration of autonomy.", { wiki: "Josep Tarradellas" });
  I("Cayetana Álvarez de Toledo", "People's Party (ES)", "e7", ["leader","culture","home"], [66,66,74,58,62],
    "Acerbic PP MP and former party spokeswoman known for combative debating style and anti-nationalism.", { wiki: "Cayetana Álvarez de Toledo" });

  // ── POLAND ──────────────────────────────────────────────────────────────────
  I("Władysław Gomułka", "Polish United Workers' Party", "e4", ["pm","leader"], [68,80,70,68,76],
    "First Secretary 1956–70; pragmatic communist who resisted Sovietisation but was ousted after worker riots.", { wiki: "Władysław Gomułka" });
  I("Edward Gierek", "Polish United Workers' Party", "e5", ["pm","leader","trade"], [70,78,72,64,74],
    "First Secretary 1970–80; moderniser who borrowed massively from the West, sparking Solidarity crisis.", { wiki: "Edward Gierek" });
  I("Wojciech Jaruzelski", "Polish United Workers' Party", "e5", ["pm","defence","leader"], [62,84,58,68,76],
    "General who declared martial law in 1981 to crush Solidarity; later presided over Poland's transition.", { wiki: "Wojciech Jaruzelski", despot: true });
  I("Lech Wałęsa", "Solidarity (PL)", "e5", ["pm","leader","trade"], [86,70,82,70,72],
    "Gdańsk shipyard electrician who led Solidarity, won Nobel Peace Prize and became President 1990–95.", { wiki: "Lech Wałęsa" });
  I("Tadeusz Mazowiecki", "Solidarity (PL)", "e6", ["pm","foreign","leader"], [76,82,74,78,70],
    "First non-communist PM in the Eastern Bloc (1989); led Poland's peaceful transition from communism.", { wiki: "Tadeusz Mazowiecki" });
  I("Lech Kaczyński", "Law and Justice", "e7", ["pm","leader","home","justice"], [70,80,72,72,76],
    "Twin brother of Jarosław; President killed in Smolensk plane crash 2010 along with Polish state elite.", { wiki: "Lech Kaczyński" });
  I("Jarosław Kaczyński", "Law and Justice", "e7", ["pm","leader","home"], [72,82,72,70,80],
    "Dominant PiS leader who governed Poland through deputies; 'backsliding democracy' battle with Brussels.", { wiki: "Jarosław Kaczyński" });
  I("Aleksander Kwaśniewski", "MSZP", "e6", ["pm","foreign","leader"], [80,82,80,78,78],
    "Post-communist President 1995–2005 who steered Poland into NATO and EU; two popular terms.", { wiki: "Aleksander Kwaśniewski" });
  I("Donald Tusk", "Civic Platform", "e7", ["pm","foreign","leader","trade"], [80,84,78,80,82],
    "PM 2007–14, then European Council President, then returned to lead Poland back from PiS rule in 2023.", { wiki: "Donald Tusk" });
  I("Bronisław Komorowski", "Civic Platform", "e7", ["pm","leader","defence"], [68,82,68,70,68],
    "President of Poland 2010–15; defence minister background, defeated by Andrzej Duda in 2015.", { wiki: "Bronisław Komorowski" });
  I("Mateusz Morawiecki", "Law and Justice", "e7", ["pm","chancellor","trade","leader"], [68,76,68,70,72],
    "Banker-turned-PiS PM who implemented Family 500+ welfare programme and clashed repeatedly with Brussels.", { wiki: "Mateusz Morawiecki" });
  I("Andrzej Duda", "Law and Justice", "e7", ["leader","justice","home"], [70,72,72,66,70],
    "PiS-backed President who signed controversial judicial reforms and clashed with PM Tusk from 2023.", { wiki: "Andrzej Duda" });
  I("Waldemar Pawlak", "Polish People's Party", "e6", ["pm","trade","agriculture","leader"], [58,76,58,62,64],
    "PSL leader who served as PM twice in 1990s coalitions; farmer-friendly centrist.", { wiki: "Waldemar Pawlak" });
  I("Włodzimierz Cimoszewicz", "MSZP", "e6", ["pm","foreign","justice","leader"], [66,82,66,70,68],
    "Post-communist PM 1996–97 and foreign minister who actively championed Poland's EU accession.", { wiki: "Włodzimierz Cimoszewicz" });
  I("Robert Biedroń", "Civic Platform", "e7", ["leader","culture","justice","home"], [74,68,76,62,66],
    "First openly gay Polish MP; founded Wiosna party and MEP who championed liberal social agenda.", { wiki: "Robert Biedroń" });

  // ── CZECH REPUBLIC / SLOVAKIA ───────────────────────────────────────────────
  I("Václav Havel", "ODS (CZ)", "e6", ["pm","foreign","culture","leader"], [90,82,90,82,72],
    "Dissident playwright who led Velvet Revolution and became Czechoslovakia's and Czech Republic's President.", { wiki: "Václav Havel" });
  I("Václav Klaus", "ODS (CZ)", "e6", ["pm","chancellor","leader","trade"], [72,84,72,76,78],
    "Economist PM then President; architect of Czech economic transformation and Eurosceptic critic.", { wiki: "Václav Klaus" });
  I("Miloš Zeman", "ČSSD (CZ)", "e6", ["pm","foreign","leader"], [70,80,72,66,72],
    "Social-Democrat PM then populist President who shifted toward Russia and China in his later years.", { wiki: "Miloš Zeman" });
  I("Andrej Babiš", "ANO (CZ)", "e7", ["pm","chancellor","trade","leader"], [70,72,68,64,74],
    "Billionaire PM who dominated Czech politics 2017–21 amid EU subsidy fraud investigations.", { wiki: "Andrej Babiš" });
  I("Petr Fiala", "ODS (CZ)", "e7", ["pm","trade","foreign","leader"], [66,78,66,68,68],
    "Conservative academic who led SPOLU coalition to defeat Babiš and navigated Ukraine crisis support.", { wiki: "Petr Fiala" });
  I("Alexander Dubček", "Czech National Social Party", "e4", ["pm","leader"], [82,78,80,70,74],
    "Slovak reformist who led Prague Spring 1968 before Soviet invasion ended his 'socialism with a human face'.", { wiki: "Alexander Dubček" });
  I("Vladimir Mečiar", "World Leaders", "e6", ["pm","leader","home"], [74,76,76,64,78],
    "Dominated post-independence Slovakia until 1998; authoritarian tendencies blocked EU/NATO membership.", { wiki: "Vladimír Mečiar" });
  I("Mikuláš Dzurinda", "World Leaders", "e6", ["pm","trade","foreign","leader"], [70,80,68,74,70],
    "Two-term Slovak PM who steered Slovakia into NATO and EU and introduced euro.", { wiki: "Mikuláš Dzurinda" });
  I("Robert Fico", "World Leaders", "e7", ["pm","leader","home"], [72,80,74,68,76],
    "Slovak PM three times; pro-Russian populist who survived assassination attempt and clashed with EU mainstream.", { wiki: "Robert Fico" });

  // ── HUNGARY ─────────────────────────────────────────────────────────────────
  I("Imre Nagy", "MSZMP", "e4", ["pm","leader","foreign"], [80,78,80,72,68],
    "Reform communist PM who declared Hungarian neutrality in 1956; Soviet invasion ended his revolution, he was executed.", { wiki: "Imre Nagy" });
  I("János Kádár", "Hungarian Socialist Workers' Party", "e4", ["pm","leader"], [64,84,60,70,80],
    "Long-ruling party chief 1956–89 who built 'goulash communism' — relative prosperity under Soviet tutelage.", { wiki: "János Kádár", despot: true });
  I("József Antall", "MDF", "e6", ["pm","foreign","health","leader"], [72,80,72,74,70],
    "First democratically elected PM of post-communist Hungary; Christian-democrat conservative.", { wiki: "József Antall" });
  I("Gyula Horn", "MSZP", "e6", ["pm","foreign","trade","leader"], [70,84,68,72,68],
    "Socialist PM who cut the Iron Curtain fence in 1989 and led Hungary into OECD and EU entry.", { wiki: "Gyula Horn" });
  I("Viktor Orbán", "Fidesz", "e6", ["pm","leader","home","foreign"], [78,84,78,74,86],
    "Transformed from liberal democrat to Eurosceptic nationalist PM; dominant since 2010, 'illiberal democracy'.", { wiki: "Viktor Orbán" });
  I("Ferenc Gyurcsány", "MSZP", "e7", ["pm","chancellor","leader"], [72,78,74,66,70],
    "Socialist PM whose leaked 'lying' speech about Hungary's economy sparked 2006 riots.", { wiki: "Ferenc Gyurcsány" });
  I("Péter Magyar", "World Leaders", "e7", ["leader","justice"], [76,60,78,58,64],
    "Anti-corruption campaigner and ex-Orbán insider who led TISZA to major European Parliament success in 2024.", { wiki: "Péter Magyar (politician)" });

  // ── NORDIC — SWEDEN ─────────────────────────────────────────────────────────
  I("Olof Palme", "Swedish Social Democrats", "e5", ["pm","foreign","leader","home"], [88,84,90,82,84],
    "Iconic social-democratic PM; anti-Vietnam War, non-alignment, assassinated 1986 — case never fully solved.", { wiki: "Olof Palme" });
  I("Tage Erlander", "Swedish Social Democrats", "e4", ["pm","leader","trade","home"], [78,88,76,84,84],
    "Longest-serving Swedish PM (1946–69); built the Swedish welfare state with steady socialist pragmatism.", { wiki: "Tage Erlander" });
  I("Per Albin Hansson", "Swedish Social Democrats", "e3", ["pm","leader","home"], [76,84,74,78,82],
    "Architect of the 'Folkhem' welfare state vision; PM through WWII neutrality, died in office 1946.", { wiki: "Per Albin Hansson" });
  I("Ingvar Carlsson", "Swedish Social Democrats", "e6", ["pm","leader","environment"], [72,82,70,76,74],
    "Palme's successor as PM; devalued the krona 1992 and led Sweden into the EU in 1995.", { wiki: "Ingvar Carlsson" });
  I("Carl Bildt", "Moderates (SE)", "e6", ["pm","foreign","leader","trade"], [76,86,74,82,72],
    "Conservative PM 1991–94; privatised state companies and became leading EU/NATO foreign policy voice.", { wiki: "Carl Bildt" });
  I("Göran Persson", "Swedish Social Democrats", "e6", ["pm","chancellor","leader","environment"], [70,84,70,76,76],
    "Budget hawk PM who erased Swedish deficit in 1990s and won three elections.", { wiki: "Göran Persson" });
  I("Fredrik Reinfeldt", "Moderates (SE)", "e7", ["pm","trade","leader","home"], [74,80,72,74,76],
    "Centre-right 'New Moderate' PM 2006–14; welcomed record immigration before refugee crisis ended his era.", { wiki: "Fredrik Reinfeldt" });
  I("Stefan Löfven", "Swedish Social Democrats", "e7", ["pm","trade","home","leader"], [68,78,66,70,72],
    "Welder and union leader turned PM 2014–21; navigated Sweden through pandemic without lockdown.", { wiki: "Stefan Löfven" });
  I("Magdalena Andersson", "Swedish Social Democrats", "e7", ["pm","chancellor","leader","trade"], [72,82,70,76,74],
    "Sweden's first female PM; led NATO application after Russian invasion of Ukraine.", { wiki: "Magdalena Andersson" });
  I("Ulf Kristersson", "Moderates (SE)", "e7", ["pm","leader","home","justice"], [66,76,66,66,68],
    "Conservative PM from 2022; relies on Sweden Democrat support to govern tough immigration agenda.", { wiki: "Ulf Kristersson" });
  I("Jimmie Åkesson", "Sweden Democrats", "e7", ["leader","home","culture"], [76,70,74,62,80],
    "Transformed Sweden Democrats from neo-Nazi fringe to Sweden's largest right-wing party.", { wiki: "Jimmie Åkesson" });

  // ── NORDIC — NORWAY ─────────────────────────────────────────────────────────
  I("Gro Harlem Brundtland", "Norwegian Labour", "e5", ["pm","environment","health","leader"], [84,86,82,84,78],
    "Three-time PM and UN Secretary-General; Brundtland Report defined sustainable development.", { wiki: "Gro Harlem Brundtland" });
  I("Einar Gerhardsen", "Norwegian Labour", "e4", ["pm","leader","home"], [76,84,72,78,80],
    "'Father of Norway'; longest-serving PM who built Norway's welfare state in post-war decades.", { wiki: "Einar Gerhardsen" });
  I("Kåre Willoch", "Conservative (NO)", "e5", ["pm","trade","chancellor","leader"], [72,82,70,74,72],
    "First modern Conservative PM of Norway since WWII; deregulated credit markets in the 1980s.", { wiki: "Kåre Willoch" });
  I("Kjell Magne Bondevik", "Christian Democratic Party (NO)", "e6", ["pm","foreign","leader"], [70,80,70,72,66],
    "Pastor-politician and two-term PM; resigned on moral grounds in 2000 only to return for a full term.", { wiki: "Kjell Magne Bondevik" });
  I("Jens Stoltenberg", "Norwegian Labour", "e7", ["pm","foreign","defence","leader"], [76,84,74,80,74],
    "PM twice and NATO Secretary-General from 2014; led Alliance response to Russia's 2022 invasion of Ukraine.", { wiki: "Jens Stoltenberg" });
  I("Erna Solberg", "Conservative (NO)", "e7", ["pm","trade","home","leader"], [72,82,70,72,74],
    "Conservative PM 2013–21; nicknamed 'Iron Erna' for fiscal conservatism and steady leadership style.", { wiki: "Erna Solberg" });
  I("Jonas Gahr Støre", "Norwegian Labour", "e7", ["pm","foreign","health","leader"], [70,82,70,72,70],
    "Current Labour PM; former health minister and foreign minister who took over from Solberg in 2021.", { wiki: "Jonas Gahr Støre" });
  I("Siv Jensen", "Progress Party (NO)", "e7", ["chancellor","leader","trade"], [70,76,70,64,74],
    "FrP leader and finance minister; right-populist who shaped Norwegian migration and budget politics.", { wiki: "Siv Jensen" });

  // ── NORDIC — DENMARK ────────────────────────────────────────────────────────
  I("Jens Otto Krag", "Danish Social Democrats", "e4", ["pm","foreign","trade","leader"], [74,82,72,76,72],
    "Social-Democrat PM who successfully negotiated Denmark's entry into the EEC in 1972.", { wiki: "Jens Otto Krag" });
  I("Anker Jørgensen", "Danish Social Democrats", "e5", ["pm","leader","trade"], [68,80,68,68,70],
    "Working-class PM who led minority governments through oil crises of the 1970s and early 1980s.", { wiki: "Anker Jørgensen" });
  I("Poul Schlüter", "Venstre (DK)", "e5", ["pm","trade","leader","foreign"], [74,82,72,72,76],
    "First Conservative PM since 1901; led Denmark through 1980s with fiscal consolidation.", { wiki: "Poul Schlüter" });
  I("Poul Nyrup Rasmussen", "Danish Social Democrats", "e6", ["pm","trade","foreign","leader"], [74,80,74,74,72],
    "PM 1993–2001; presided over Danish referendum rejections of Maastricht and later euro adoption.", { wiki: "Poul Nyrup Rasmussen" });
  I("Anders Fogh Rasmussen", "Venstre (DK)", "e7", ["pm","foreign","defence","leader"], [76,84,74,78,76],
    "Liberal PM who backed Iraq War and later became NATO Secretary-General.", { wiki: "Anders Fogh Rasmussen" });
  I("Lars Løkke Rasmussen", "Venstre (DK)", "e7", ["pm","health","trade","leader"], [70,80,70,70,72],
    "Twice PM; steered centre-right budgetary policy and surprised as post-2022 centrist foreign minister.", { wiki: "Lars Løkke Rasmussen" });
  I("Helle Thorning-Schmidt", "Danish Social Democrats", "e7", ["pm","leader","foreign","trade"], [76,78,76,72,72],
    "Denmark's first female PM 2011–15; 'Gucci Helle' led centre-left coalition with mixed economic record.", { wiki: "Helle Thorning-Schmidt" });
  I("Mette Frederiksen", "Danish Social Democrats", "e7", ["pm","home","leader","health"], [80,78,80,76,78],
    "PM since 2019; closed Denmark's borders early in Covid, tightened immigration well beyond left norms.", { wiki: "Mette Frederiksen" });
  I("Pia Kjærsgaard", "Danish People's Party", "e6", ["leader","home"], [76,72,74,58,78],
    "Founded Danish People's Party 1995; mainstreamed strict immigration politics that all parties now echo.", { wiki: "Pia Kjærsgaard" });

  // ── NORDIC — FINLAND ────────────────────────────────────────────────────────
  I("Urho Kekkonen", "Centre Party (FI)", "e4", ["pm","foreign","leader","trade"], [78,88,76,82,82],
    "Dominant President 1956–82; mastered 'Finlandisation' — Western democracy balanced against Soviet pressure.", { wiki: "Urho Kekkonen" });
  I("Juho Kusti Paasikivi", "National Coalition (FI)", "e3", ["pm","foreign","leader"], [70,88,66,80,66],
    "President 1946–56 after WWII; negotiated Finnish survival through 'Paasikivi Line' realism with Moscow.", { wiki: "Juho Kusti Paasikivi" });
  I("Mauno Koivisto", "Social Democratic Party (FI)", "e5", ["pm","foreign","chancellor","leader"], [74,86,72,78,72],
    "Social-Democrat President 1982–94; oversaw Soviet collapse, EU application and economic depression.", { wiki: "Mauno Koivisto" });
  I("Martti Ahtisaari", "Social Democratic Party (FI)", "e6", ["pm","foreign","leader"], [80,88,78,86,68],
    "President 1994–2000 and Nobel Peace Prize winner; resolved crises from Namibia to Kosovo.", { wiki: "Martti Ahtisaari" });
  I("Tarja Halonen", "Social Democratic Party (FI)", "e7", ["pm","foreign","justice","leader"], [78,84,76,78,72],
    "Finland's first female President 2000–12; championed human rights and social democracy on world stage.", { wiki: "Tarja Halonen" });
  I("Sauli Niinistö", "National Coalition (FI)", "e7", ["pm","foreign","defence","leader"], [78,84,76,80,72],
    "Conservative President 2012–24; led Finland's historic NATO application after Russian 2022 invasion.", { wiki: "Sauli Niinistö" });
  I("Sanna Marin", "Social Democratic Party (FI)", "e7", ["pm","foreign","home","leader"], [84,72,82,72,74],
    "World's youngest PM at 34; applied for NATO membership and became global icon of young left leadership.", { wiki: "Sanna Marin" });
  I("Petteri Orpo", "National Coalition (FI)", "e7", ["pm","chancellor","trade","leader"], [64,76,62,66,68],
    "Conservative PM from 2023; formed right-wing coalition with Finns Party imposing austerity.", { wiki: "Petteri Orpo" });

  // ── NETHERLANDS / BELGIUM ───────────────────────────────────────────────────
  I("Ruud Lubbers", "CDA (NL)", "e5", ["pm","trade","environment","leader"], [76,84,74,78,74],
    "Netherlands' longest-serving PM 1982–94; 'no-nonsense' Christian-democrat, later UNHCR chief.", { wiki: "Ruud Lubbers" });
  I("Wim Kok", "Dutch Labour", "e6", ["pm","chancellor","trade","leader"], [74,82,72,74,72],
    "Trade union leader turned Labour PM 1994–2002; 'purple coalition' excluded Christian-democrats.", { wiki: "Wim Kok" });
  I("Jan Peter Balkenende", "CDA (NL)", "e7", ["pm","foreign","trade","leader"], [64,80,62,68,68],
    "Four-term PM 2002–10; modelled on Tolkien's Frodo by opponents, cautious consensus politician.", { wiki: "Jan Peter Balkenende" });
  I("Mark Rutte", "VVD", "e7", ["pm","trade","leader","foreign"], [74,84,72,74,78],
    "Netherlands' longest-serving PM 2010–23 (four terms); became NATO Secretary-General from 2024.", { wiki: "Mark Rutte" });
  I("Geert Wilders", "PVV (NL)", "e7", ["leader","home","culture"], [80,72,78,56,72],
    "Peroxide-haired populist who leads PVV; 'Islam is not a religion' platform won 2023 elections.", { wiki: "Geert Wilders" });
  I("Dick Schoof", "World Leaders", "e7", ["pm","home","justice","leader"], [56,76,52,62,56],
    "Intelligence chief turned PM; leads first right-wing Dutch government including Wilders' PVV.", { wiki: "Dick Schoof" });
  I("Willy Brandt", "SPD (DE)", "e4", ["pm","foreign","leader"], [86,84,88,84,80],
    "West German Chancellor 1969–74; Ostpolitik architect who knelt in Warsaw and won Nobel Peace Prize.", { wiki: "Willy Brandt" });
  I("Wilfried Martens", "N-VA", "e5", ["pm","foreign","trade","leader"], [68,84,66,70,72],
    "Belgian PM nine times over 13 years; navigated complex linguistic coalitions with patience.", { wiki: "Wilfried Martens" });
  I("Guy Verhofstadt", "Open VLD", "e6", ["pm","trade","foreign","leader"], [74,80,76,72,70],
    "Belgian PM 1999–2008 known as 'Mr Prime Minister'; later passionate federalist leader in European Parliament.", { wiki: "Guy Verhofstadt" });
  I("Charles Michel", "Open VLD", "e7", ["pm","foreign","leader"], [68,76,70,70,68],
    "Belgian PM then European Council President; led EU summit diplomacy during Brexit and Covid.", { wiki: "Charles Michel" });
  I("Alexander De Croo", "Open VLD", "e7", ["pm","trade","foreign","leader"], [70,74,68,70,68],
    "Belgian PM 2020–24; handled Covid recovery and Gaza crisis, resigned after 2024 election drubbing.", { wiki: "Alexander De Croo" });

  // ── AUSTRIA ──────────────────────────────────────────────────────────────────
  I("Bruno Kreisky", "SPÖ (AT)", "e5", ["pm","foreign","leader","trade"], [84,86,82,84,82],
    "Austrian Chancellor 1970–83; social-democratic model, active neutrality, mediator in Middle East.", { wiki: "Bruno Kreisky" });
  I("Jörg Haider", "FPÖ", "e5", ["leader","home"], [80,72,82,58,78],
    "Charismatic populist who built FPÖ into a major force; praised Nazi employment policies, died in crash 2008.", { wiki: "Jörg Haider" });
  I("Wolfgang Schüssel", "ÖVP", "e6", ["pm","trade","foreign","leader"], [66,84,64,72,72],
    "ÖVP chancellor who controversially brought FPÖ into coalition in 2000, drawing EU sanctions.", { wiki: "Wolfgang Schüssel" });
  I("Sebastian Kurz", "ÖVP", "e7", ["pm","foreign","home","leader"], [82,72,80,72,80],
    "World's youngest foreign minister and chancellor; built coalition with far-right twice, resigned amid corruption probe.", { wiki: "Sebastian Kurz" });
  I("Alexander Van der Bellen", "World Leaders", "e7", ["pm","environment","leader"], [76,84,74,76,68],
    "Green economist and twice-elected Austrian President; defeated FPÖ's Hofer in tense 2016 rerun.", { wiki: "Alexander Van der Bellen" });

  // ── SWITZERLAND ──────────────────────────────────────────────────────────────
  I("Christoph Blocher", "SVP (CH)", "e7", ["leader","trade","home"], [74,80,70,64,78],
    "Industrialist who radicalised SVP into Switzerland's largest party on migration and anti-EU platform.", { wiki: "Christoph Blocher" });
  I("Ruth Dreifuss", "SP (CH)", "e6", ["pm","health","home","leader"], [72,80,70,72,66],
    "First female Swiss President and architect of pioneering drug policy decriminalisation.", { wiki: "Ruth Dreifuss" });
  I("Doris Leuthard", "World Leaders", "e7", ["pm","environment","trade","leader"], [74,80,72,74,68],
    "Popular Federal Councillor twice President; phased out nuclear energy after Fukushima.", { wiki: "Doris Leuthard" });

  // ── PORTUGAL ─────────────────────────────────────────────────────────────────
  I("António de Oliveira Salazar", "World Leaders", "e3", ["pm","chancellor","leader"], [64,88,64,72,78],
    "Dictator of Portugal 1932–68; Estado Novo fascism, economic stability but political repression.", { wiki: "António de Oliveira Salazar", despot: true });
  I("Marcello Caetano", "World Leaders", "e4", ["pm","leader","home"], [62,82,60,62,68],
    "Salazar's successor ousted in 1974 Carnation Revolution, ending 48 years of authoritarian rule.", { wiki: "Marcello Caetano" });
  I("Mário Soares", "PS (PT)", "e5", ["pm","foreign","leader"], [80,82,78,76,74],
    "Led Portuguese Socialist Party to power after revolution; twice PM and twice President, 'Father of Democracy'.", { wiki: "Mário Soares" });
  I("Aníbal Cavaco Silva", "PSD (PT)", "e5", ["pm","trade","chancellor","leader"], [72,84,68,74,72],
    "Conservative PM 1985–95; presided over Portugal's EU funds boom and later a decade as President.", { wiki: "Aníbal Cavaco Silva" });
  I("António Guterres", "PS (PT)", "e6", ["pm","foreign","leader","home"], [84,86,82,84,76],
    "Socialist PM 1995–2002 then UNHCR chief and from 2017 United Nations Secretary-General.", { wiki: "António Guterres" });
  I("José Sócrates", "PS (PT)", "e7", ["pm","environment","trade","leader"], [70,76,72,64,70],
    "Socialist PM who triggered financial crisis bailout in 2011; later charged with corruption.", { wiki: "José Sócrates" });
  I("Pedro Passos Coelho", "PSD (PT)", "e7", ["pm","trade","chancellor","leader"], [64,78,62,66,66],
    "Conservative PM who implemented troika austerity measures during Portugal's 2011–14 bailout programme.", { wiki: "Pedro Passos Coelho" });
  I("António Costa", "PS (PT)", "e7", ["pm","trade","foreign","leader"], [76,80,74,74,74],
    "Socialist PM 2015–24 who achieved three consecutive majorities and record Portuguese economic growth.", { wiki: "António Costa" });
  I("Luís Montenegro", "PSD (PT)", "e7", ["pm","trade","leader"], [64,72,62,64,64],
    "Conservative PM from 2024 leading minority government after Costa's resignation.", { wiki: "Luís Montenegro" });

  // ── GREECE ───────────────────────────────────────────────────────────────────
  I("Konstantinos Karamanlis", "New Democracy (GR)", "e4", ["pm","foreign","leader"], [80,86,78,80,78],
    "Restored democracy after military junta fell 1974; took Greece into the EEC — 'founder of modern Greece'.", { wiki: "Konstantinos Karamanlis" });
  I("Andreas Papandreou", "PASOK", "e5", ["pm","foreign","leader","home"], [84,82,86,74,82],
    "PASOK founder and dominant PM; anti-American populism, EU membership acceptance and welfare expansion.", { wiki: "Andreas Papandreou" });
  I("Costas Simitis", "PASOK", "e6", ["pm","trade","foreign","leader"], [68,82,66,72,70],
    "Social-democrat PM who steered Greece into the eurozone — later exposed for cooking the budget figures.", { wiki: "Costas Simitis" });
  I("Costas Karamanlis", "New Democracy (GR)", "e7", ["pm","foreign","trade","leader"], [64,78,62,66,68],
    "Nephew of the founder; Conservative PM 2004–09 oversaw Athens Olympics but left debt-ridden government.", { wiki: "Costas Karamanlis (born 1956)" });
  I("Giorgos Papandreou", "PASOK", "e7", ["pm","foreign","leader"], [68,78,70,62,64],
    "PASOK PM who triggered the Greek debt crisis by revealing true scale of deficit; ousted 2011.", { wiki: "George Papandreou" });
  I("Lucas Papademos", "World Leaders", "e7", ["pm","chancellor","trade","leader"], [58,88,54,68,48],
    "ECB vice-president turned technocrat PM 2011–12; administered painful troika austerity cuts.", { wiki: "Lucas Papademos" });
  I("Antonis Samaras", "New Democracy (GR)", "e7", ["pm","trade","foreign","leader"], [64,80,64,66,66],
    "Conservative PM 2012–15 who completed bailout programme but lost power to Syriza's Tsipras.", { wiki: "Antonis Samaras" });
  I("Alexis Tsipras", "Syriza", "e7", ["pm","leader","foreign","trade"], [80,70,80,64,74],
    "Left-wing PM who won 2015 OXI referendum then accepted EU terms anyway; paradox of Greek radicalism.", { wiki: "Alexis Tsipras" });
  I("Kyriakos Mitsotakis", "New Democracy (GR)", "e7", ["pm","trade","home","leader"], [72,78,70,72,72],
    "Harvard-educated PM from 2019; implemented significant reforms but faced surveillance scandal.", { wiki: "Kyriakos Mitsotakis" });
  I("Yanis Varoufakis", "Syriza", "e7", ["chancellor","trade","leader"], [80,72,86,62,52],
    "Game-theorist finance minister who played chicken with EU creditors in 2015; bestselling author.", { wiki: "Yanis Varoufakis" });

  // ── TURKEY ───────────────────────────────────────────────────────────────────
  I("Mustafa Kemal Atatürk", "World Leaders", "e3", ["pm","defence","leader","foreign"], [92,86,88,92,90],
    "Founded modern Turkey from Ottoman ruins; abolished Caliphate, Westernised alphabet and law.", { wiki: "Mustafa Kemal Atatürk", despot: true });
  I("İsmet İnönü", "World Leaders", "e3", ["pm","defence","foreign","leader"], [76,86,68,80,78],
    "Atatürk's deputy and successor; kept Turkey neutral in WWII through careful diplomatic balance.", { wiki: "İsmet İnönü" });
  I("Adnan Menderes", "Motherland Party (TR)", "e4", ["pm","trade","leader"], [76,76,74,66,72],
    "First democratically elected PM; executed by military coup 1961 for 'undermining secularism'.", { wiki: "Adnan Menderes" });
  I("Süleyman Demirel", "World Leaders", "e5", ["pm","trade","leader"], [72,82,70,70,74],
    "Seven-time PM and President; central-right figure who survived four military interventions.", { wiki: "Süleyman Demirel" });
  I("Bülent Ecevit", "CHP (TR)", "e5", ["pm","foreign","leader","culture"], [74,80,74,70,70],
    "Social-democrat PM who ordered 1974 Cyprus invasion; last left-wing PM before Erdoğan's domination.", { wiki: "Bülent Ecevit" });
  I("Necmettin Erbakan", "Justice and Development Party", "e5", ["pm","leader","foreign"], [72,80,74,66,72],
    "Islamist pioneer who founded Milli Görüş movement; ousted by 'soft coup' in 1997.", { wiki: "Necmettin Erbakan" });
  I("Turgut Özal", "Motherland Party (TR)", "e5", ["pm","chancellor","trade","leader"], [76,82,72,74,74],
    "Economic liberaliser PM then President; modernised Turkey's economy through IMF-backed reforms.", { wiki: "Turgut Özal" });
  I("Recep Tayyip Erdoğan", "Justice and Development Party", "e7", ["pm","leader","home","foreign"], [80,84,80,72,86],
    "Dominant PM then President since 2003; transformed Turkey through Islamist-tinted populist nationalism.", { wiki: "Recep Tayyip Erdoğan", despot: true });
  I("Abdullah Gül", "Justice and Development Party", "e7", ["pm","foreign","leader"], [72,80,70,72,68],
    "Co-founder of AKP with Erdoğan; moderate President 2007–14 and respected foreign minister.", { wiki: "Abdullah Gül" });
  I("Ahmet Davutoğlu", "Justice and Development Party", "e7", ["pm","foreign","leader"], [70,80,70,72,66],
    "Former PM and foreign minister who designed 'zero problems with neighbours' doctrine before break with Erdoğan.", { wiki: "Ahmet Davutoğlu" });
  I("Ali Babacan", "World Leaders", "e7", ["chancellor","trade","leader","foreign"], [70,80,68,72,66],
    "AKP's economic architect then opposition leader DEVA; widely respected by markets.", { wiki: "Ali Babacan" });
  I("Kemal Kılıçdaroğlu", "CHP (TR)", "e7", ["leader","home","trade"], [68,80,68,64,70],
    "Bureaucrat-turned-CHP leader who unified opposition against Erdoğan in 2023 but lost the presidential run-off.", { wiki: "Kemal Kılıçdaroğlu" });
  I("Ekrem İmamoğlu", "CHP (TR)", "e7", ["leader","home"], [80,68,78,66,72],
    "Istanbul mayor who defeated AKP twice; imprisoned on trumped-up charges in Erdoğan crackdown.", { wiki: "Ekrem İmamoğlu" });
  I("Mansur Yavas", "CHP (TR)", "e7", ["leader","home"], [76,72,72,68,70],
    "Ankara mayor and reliable CHP opposition figure; regarded as most popular non-Erdoğan politician in Turkey.", { wiki: "Mansur Yavas" });
  I("Sinan Oğan", "World Leaders", "e7", ["leader","home"], [62,66,62,54,60],
    "Far-right nationalist kingmaker in 2023 election; his second-round endorsement of Erdoğan proved decisive.", { wiki: "Sinan Oğan" });

  // ── ISRAEL ───────────────────────────────────────────────────────────────────
  I("David Ben-Gurion", "Mapai", "e4", ["pm","defence","leader","foreign"], [88,88,84,88,84],
    "Founder and first PM of Israel; declared independence 1948 and won War of Independence.", { wiki: "David Ben-Gurion" });
  I("Moshe Sharett", "Mapai", "e4", ["pm","foreign","leader"], [72,84,70,76,68],
    "Second PM and diplomat; first Israeli foreign minister, cautious dove against Ben-Gurion's militarism.", { wiki: "Moshe Sharett" });
  I("Levi Eshkol", "Mapai", "e4", ["pm","defence","trade","leader"], [70,84,68,74,74],
    "PM who led Israel through 1967 Six-Day War while refusing preemptive requests from generals.", { wiki: "Levi Eshkol" });
  I("Golda Meir", "Mapai", "e4", ["pm","foreign","defence","leader"], [82,84,80,80,78],
    "First female PM (1969–74); led Israel through 1973 Yom Kippur War surprise attack before resignation.", { wiki: "Golda Meir" });
  I("Yitzhak Rabin", "Labor (IL)", "e5", ["pm","defence","foreign","leader"], [82,88,78,84,76],
    "IDF Chief in 1967 war, PM twice; signed Oslo Accords and was assassinated by far-right extremist in 1995.", { wiki: "Yitzhak Rabin" });
  I("Shimon Peres", "Mapai", "e4", ["pm","foreign","defence","leader"], [80,90,82,84,74],
    "Long-time Defence and Foreign Minister, twice PM and finally President; architect of Oslo and Israeli nukes.", { wiki: "Shimon Peres" });
  I("Menachem Begin", "Likud", "e5", ["pm","defence","foreign","leader"], [80,82,80,78,76],
    "Irgun leader turned Likud PM; made peace with Egypt at Camp David, ordered Lebanon invasion 1982.", { wiki: "Menachem Begin" });
  I("Ariel Sharon", "Likud", "e6", ["pm","defence","leader"], [74,88,66,76,74],
    "General who ordered Sabra and Shatila, made PM; shocked right by disengaging from Gaza before coma 2006.", { wiki: "Ariel Sharon" });
  I("Ehud Barak", "Labor (IL)", "e6", ["pm","defence","foreign","leader"], [72,88,68,76,66],
    "Most decorated IDF officer and PM; came closest to Palestinian peace deal at Camp David 2000.", { wiki: "Ehud Barak" });
  I("Benjamin Netanyahu", "Likud", "e7", ["pm","foreign","trade","leader"], [78,86,80,74,80],
    "Israel's longest-serving PM; US-educated hawk who won six elections and led Gaza war from 2023.", { wiki: "Benjamin Netanyahu" });
  I("Ehud Olmert", "Kadima", "e7", ["pm","foreign","leader","home"], [68,80,68,66,68],
    "PM who replaced Sharon; led Second Lebanon War 2006, later jailed for corruption.", { wiki: "Ehud Olmert" });
  I("Naftali Bennett", "World Leaders", "e7", ["pm","leader","defence","home"], [70,74,70,66,68],
    "Tech millionaire PM who formed historic coalition ending Netanyahu's 12-year run in 2021.", { wiki: "Naftali Bennett" });
  I("Yair Lapid", "Yesh Atid", "e7", ["pm","chancellor","leader","trade"], [74,74,76,70,70],
    "TV presenter turned FM then PM; built broad anti-Netanyahu coalition with Bennett.", { wiki: "Yair Lapid" });
  I("Benny Gantz", "Blue and White", "e7", ["pm","defence","leader"], [68,82,66,68,64],
    "Former IDF Chief and Blue and White leader; joined Netanyahu war cabinet in 2023 then resigned.", { wiki: "Benny Gantz" });
  I("Moshe Dayan", "Mapai", "e4", ["defence","foreign","leader"], [78,86,74,76,70],
    "Eyepatch general who commanded 1967 victory; defence minister in 1973 who nearly lost it all.", { wiki: "Moshe Dayan" });
  I("Yigal Allon", "Labor (IL)", "e4", ["pm","defence","foreign","leader"], [76,82,74,76,68],
    "Palmach commander and Labour dove; Allon Plan for West Bank partitioning still discussed today.", { wiki: "Yigal Allon" });
  I("Yasser Arafat", "Fatah", "e5", ["pm","leader","foreign"], [80,80,82,64,78],
    "PLO chairman who turned from terrorism to diplomacy; Nobel laureate who never finalised a peace deal.", { wiki: "Yasser Arafat" });

  // ── EGYPT / ARAB WORLD ───────────────────────────────────────────────────────
  I("Gamal Abdel Nasser", "Arab Socialist Union (EG)", "e4", ["pm","foreign","defence","leader"], [88,80,90,78,82],
    "Egypt's charismatic leader; nationalised Suez Canal, unified Arab nationalism, lost 1967 Six-Day War.", { wiki: "Gamal Abdel Nasser", despot: true });
  I("Anwar Sadat", "National Democratic Party (EG)", "e5", ["pm","foreign","defence","leader"], [80,82,78,80,74],
    "Crossed Suez in 1973, then made peace with Israel at Camp David; assassinated by Islamic Jihad 1981.", { wiki: "Anwar Sadat" });
  I("Hosni Mubarak", "National Democratic Party (EG)", "e5", ["pm","leader","foreign","defence"], [66,84,60,68,76],
    "Egyptian President for 30 years until Arab Spring overthrow; maintained peace with Israel.", { wiki: "Hosni Mubarak", despot: true });
  I("Mohamed Morsi", "Muslim Brotherhood", "e7", ["pm","leader"], [62,72,64,54,64],
    "First elected President of Egypt 2012–13; ousted by military coup led by el-Sisi after one year.", { wiki: "Mohamed Morsi" });
  I("Abdel Fattah el-Sisi", "National Democratic Party (EG)", "e7", ["pm","defence","leader"], [62,78,56,62,72],
    "General who overthrew Morsi 2013; has ruled Egypt with iron fist, crushing Muslim Brotherhood.", { wiki: "Abdel Fattah el-Sisi", despot: true });
  I("Muammar Gaddafi", "World Leaders", "e5", ["pm","leader","foreign","defence"], [70,72,76,60,74],
    "Libyan dictator for 42 years; Green Book ideology, terrorism sponsor, oil wealth redistributor, killed 2011.", { wiki: "Muammar Gaddafi", despot: true });
  I("Hafez al-Assad", "Ba'ath Party", "e5", ["pm","defence","leader"], [66,82,60,70,80],
    "Syrian dictator 1970–2000; crushed Hama revolt killing 20,000, forged axis of resistance.", { wiki: "Hafez al-Assad", despot: true });
  I("Bashar al-Assad", "Ba'ath Party", "e7", ["pm","leader","home"], [52,72,50,56,68],
    "Syrian President who responded to 2011 uprising with barrel bombs and chemical weapons; fled to Russia 2024.", { wiki: "Bashar al-Assad", despot: true });
  I("Saddam Hussein", "Ba'ath Party", "e5", ["pm","defence","leader"], [70,76,72,60,78],
    "Iraqi dictator 1979–2003; gassed Kurds, invaded Kuwait, hanged after US invasion found no WMDs.", { wiki: "Saddam Hussein", despot: true });
  I("King Hussein of Jordan", "Al Saud", "e4", ["pm","foreign","leader"], [82,84,78,82,74],
    "Jordan's longest-serving King 1952–99; pragmatic diplomat who made peace with Israel and survived crises.", { wiki: "Hussein of Jordan" });
  I("King Abdullah II", "Al Saud", "e7", ["pm","foreign","leader"], [72,78,70,74,68],
    "Jordan's King since 1999; US-educated military officer balancing Western alliances with Palestinian cause.", { wiki: "Abdullah II of Jordan" });
  I("Mahmoud Abbas", "Fatah", "e7", ["pm","leader","foreign"], [60,80,60,62,62],
    "Palestinian Authority President since 2005; negotiator who struggled to maintain relevance after Gaza 2023.", { wiki: "Mahmoud Abbas" });
  I("Hassan Nasrallah", "World Leaders", "e5", ["pm","leader","defence","foreign"], [74,76,76,64,74],
    "Hezbollah secretary-general since 1992; built Lebanon's state-within-a-state, killed by Israeli airstrike 2024.", { wiki: "Hassan Nasrallah" });

  // ── IRAN ─────────────────────────────────────────────────────────────────────
  I("Mohammad Mosaddegh", "National Front (IR)", "e4", ["pm","chancellor","trade","leader"], [80,82,80,72,74],
    "Democratically elected PM who nationalised Anglo-Persian Oil Company; overthrown in CIA/MI6 coup 1953.", { wiki: "Mohammad Mosaddegh" });
  I("Ruhollah Khomeini", "Islamic Republican Party", "e5", ["pm","leader","foreign"], [82,78,86,74,84],
    "Supreme Leader of Iran's Islamic Revolution 1979; established velayat-e faqih theocratic system.", { wiki: "Ruhollah Khomeini", despot: true });
  I("Akbar Hashemi Rafsanjani", "Islamic Republican Party", "e6", ["pm","trade","foreign","leader"], [72,84,68,74,76],
    "Speaker, President 1989–97, and perennial power-broker; pragmatist who pursued economic reconstruction.", { wiki: "Akbar Hashemi Rafsanjani" });
  I("Mohammad Khatami", "Islamic Republican Party", "e6", ["pm","culture","foreign","leader"], [80,80,80,70,70],
    "Reformist President who won 70% in 1997 on Dialogue of Civilisations platform; thwarted by conservatives.", { wiki: "Mohammad Khatami" });
  I("Mahmoud Ahmadinejad", "Islamic Republican Party", "e7", ["pm","leader","foreign"], [70,72,72,58,70],
    "Holocaust-denying populist President 2005–13; nuclear standoff, Green Revolution suppression.", { wiki: "Mahmoud Ahmadinejad" });
  I("Hassan Rouhani", "Islamic Republican Party", "e7", ["pm","foreign","trade","leader"], [70,82,68,72,68],
    "Moderate President 2013–21 who signed JCPOA nuclear deal with Obama, later unravelled by Trump.", { wiki: "Hassan Rouhani" });
  I("Ebrahim Raisi", "Islamic Republican Party", "e7", ["pm","justice","leader"], [54,74,52,58,64],
    "Hardline cleric and 'Butcher of 1988' purge who became President 2021; killed in helicopter crash 2024.", { wiki: "Ebrahim Raisi", despot: true });
  I("Ali Khamenei", "Islamic Republican Party", "e5", ["pm","leader","foreign","defence"], [66,86,68,72,80],
    "Supreme Leader of Iran since 1989; ultimate authority over nuclear programme and foreign policy.", { wiki: "Ali Khamenei", despot: true });
  I("Masoud Pezeshkian", "World Leaders", "e7", ["pm","health","leader"], [68,72,66,64,62],
    "Heart surgeon and reformist MP who won 2024 election after Raisi's death; pro-JCPOA revival.", { wiki: "Masoud Pezeshkian" });
  I("Mohammad Reza Shah", "World Leaders", "e4", ["pm","defence","trade","leader"], [70,80,66,70,70],
    "Iran's last Shah; US-backed White Revolution moderniser overthrown in 1979 Islamic Revolution.", { wiki: "Mohammad Reza Pahlavi", despot: true });

  // ── SOUTH KOREA ──────────────────────────────────────────────────────────────
  I("Syngman Rhee", "Liberal Democratic Party (KR)", "e4", ["pm","foreign","leader"], [70,76,68,62,70],
    "First President of South Korea; US-backed, fought Korean War, ousted by April Revolution 1960.", { wiki: "Syngman Rhee" });
  I("Park Chung-hee", "PPP (KR)", "e4", ["pm","trade","defence","leader"], [72,80,64,72,78],
    "Military dictator 1961–79 whose Saemaul Undong 'miracle on Han River' transformed South Korean economy.", { wiki: "Park Chung-hee", despot: true });
  I("Chun Doo-hwan", "PPP (KR)", "e5", ["pm","defence","leader"], [54,72,48,56,66],
    "Military dictator who seized power 1980; Gwangju massacre; sentenced to death, later pardoned.", { wiki: "Chun Doo-hwan", despot: true });
  I("Roh Tae-woo", "PPP (KR)", "e5", ["pm","foreign","leader"], [60,76,60,62,66],
    "First democratically elected South Korean President; Seoul Olympics 1988, Nordpolitik with North.", { wiki: "Roh Tae-woo" });
  I("Kim Young-sam", "Democratic Party (KR)", "e6", ["pm","home","justice","leader"], [72,80,70,68,70],
    "First civilian President; financial reforms but Asian financial crisis struck in his final year.", { wiki: "Kim Young-sam" });
  I("Kim Dae-jung", "Democratic Party (KR)", "e6", ["pm","foreign","leader"], [82,82,80,78,74],
    "Nobel Peace laureate; Sunshine Policy engagement with North Korea and survived multiple assassination attempts.", { wiki: "Kim Dae-jung" });
  I("Roh Moo-hyun", "Democratic Party (KR)", "e7", ["pm","justice","leader","home"], [76,74,78,68,70],
    "Populist progressive PM; impeached then acquitted, committed suicide 2009 amid corruption probe.", { wiki: "Roh Moo-hyun" });
  I("Lee Myung-bak", "PPP (KR)", "e7", ["pm","trade","chancellor","leader"], [66,78,64,68,68],
    "Hyundai executive turned conservative PM; Green Growth, tighter North Korea stance.", { wiki: "Lee Myung-bak" });
  I("Park Geun-hye", "PPP (KR)", "e7", ["pm","leader","foreign"], [62,76,58,60,66],
    "First female President; impeached and imprisoned for corruption via Choi Soon-sil cult scandal.", { wiki: "Park Geun-hye" });
  I("Moon Jae-in", "Democratic Party (KR)", "e7", ["pm","foreign","leader","justice"], [76,80,74,72,70],
    "Former human rights lawyer and progressive PM; pursued dialogue with Kim Jong-un and Trump.", { wiki: "Moon Jae-in" });
  I("Yoon Suk-yeol", "PPP (KR)", "e7", ["pm","justice","leader"], [58,70,58,54,56],
    "Conservative prosecutor-turned-President who declared brief martial law December 2024 before impeachment.", { wiki: "Yoon Suk-yeol" });
  I("Lee Jae-myung", "Democratic Party (KR)", "e7", ["leader","home","trade"], [72,70,72,64,70],
    "Progressive DP leader and Gyeonggi governor who narrowly lost 2022 election and leads opposition.", { wiki: "Lee Jae-myung" });

  // ── SOUTHEAST ASIA — SINGAPORE ───────────────────────────────────────────────
  I("Lee Kuan Yew", "People's Action Party", "e4", ["pm","trade","foreign","leader"], [88,90,80,90,88],
    "Singapore's first PM 1959–90; built city-state from colonial backwater to world-leading economy.", { wiki: "Lee Kuan Yew", despot: true });
  I("Goh Chok Tong", "People's Action Party", "e6", ["pm","trade","health","leader"], [70,84,68,74,72],
    "Second PM 1990–2004; presided over economic boom, Asian crisis recovery and modest liberalisation.", { wiki: "Goh Chok Tong" });
  I("Lee Hsien Loong", "People's Action Party", "e7", ["pm","trade","defence","leader"], [74,86,70,78,76],
    "Lee Kuan Yew's son; PM 2004–24, navigated 2008 crisis, Covid and US-China tensions.", { wiki: "Lee Hsien Loong" });
  I("Lawrence Wong", "People's Action Party", "e7", ["pm","chancellor","trade","leader"], [68,76,66,70,66],
    "Finance minister who managed Covid taskforce and succeeded Lee Hsien Loong as PM in 2024.", { wiki: "Lawrence Wong" });

  // ── SOUTHEAST ASIA — MALAYSIA ─────────────────────────────────────────────────
  I("Tunku Abdul Rahman", "UMNO", "e4", ["pm","foreign","trade","leader"], [80,80,78,76,74],
    "Father of Malaysian independence 1957; led multiracial Alliance coalition and was first PM.", { wiki: "Tunku Abdul Rahman" });
  I("Abdul Razak Hussein", "UMNO", "e4", ["pm","trade","leader"], [68,82,66,70,72],
    "Second PM who launched New Economic Policy after 1969 racial riots to uplift Malay economic status.", { wiki: "Abdul Razak Hussein" });
  I("Mahathir Mohamad", "UMNO", "e5", ["pm","trade","foreign","leader"], [82,88,80,84,82],
    "Dominant PM 1981–2003 and again 2018–20; 'Asian values' moderniser and critic of Western liberalism.", { wiki: "Mahathir Mohamad" });
  I("Anwar Ibrahim", "PKR (MY)", "e6", ["pm","trade","justice","leader"], [80,82,80,74,74],
    "Finance minister imprisoned twice on sodomy charges; became PM 2022 after decades of persecution.", { wiki: "Anwar Ibrahim" });
  I("Najib Razak", "UMNO", "e7", ["pm","trade","leader"], [64,78,62,60,70],
    "PM who oversaw economic growth but lost 2018 election; sentenced to 12 years for 1MDB corruption.", { wiki: "Najib Razak" });

  // ── SOUTHEAST ASIA — INDONESIA ────────────────────────────────────────────────
  I("Sukarno", "PDI-P (ID)", "e4", ["pm","foreign","leader","culture"], [88,78,90,74,80],
    "Indonesia's founding father and first President; 'Guided Democracy' mixed nationalism, communism, Islam.", { wiki: "Sukarno" });
  I("Suharto", "Golkar (ID)", "e4", ["pm","trade","defence","leader"], [64,82,54,70,80],
    "Military dictator 1967–98; New Order anti-communist development transformed economy, 500,000 killed.", { wiki: "Suharto", despot: true });
  I("B.J. Habibie", "Golkar (ID)", "e6", ["pm","trade","chancellor","leader"], [72,84,70,72,64],
    "Aircraft engineer-turned-President who succeeded Suharto; allowed East Timor independence referendum.", { wiki: "B.J. Habibie" });
  I("Abdurrahman Wahid", "World Leaders", "e6", ["pm","leader","foreign","home"], [76,78,74,66,62],
    "Blind Muslim cleric and pluralist President 1999–2001; progressive but impeached amid political chaos.", { wiki: "Abdurrahman Wahid" });
  I("Megawati Sukarnoputri", "PDI-P (ID)", "e7", ["pm","leader","trade"], [70,76,68,64,68],
    "Sukarno's daughter; first female President 2001–04, steered Indonesia through post-Suharto stabilisation.", { wiki: "Megawati Sukarnoputri" });
  I("Susilo Bambang Yudhoyono", "World Leaders", "e7", ["pm","defence","trade","leader"], [72,82,70,72,70],
    "General turned PM for two terms; post-Bali bombing stabilisation and steady economic growth.", { wiki: "Susilo Bambang Yudhoyono" });
  I("Joko Widodo", "PDI-P (ID)", "e7", ["pm","trade","home","leader"], [82,74,78,74,76],
    "Furniture seller turned Jakarta governor turned President; infrastructure-focused 'man of the people'.", { wiki: "Joko Widodo" });
  I("Prabowo Subianto", "Gerindra (ID)", "e7", ["pm","defence","leader"], [68,78,66,64,72],
    "Former Special Forces general who lost two elections before winning 2024 with Jokowi's endorsement.", { wiki: "Prabowo Subianto" });

  // ── SOUTHEAST ASIA — PHILIPPINES ─────────────────────────────────────────────
  I("Ferdinand Marcos", "Nationalista (PH)", "e4", ["pm","leader","trade","defence"], [74,78,76,62,78],
    "President 1965–86 who declared martial law 1972; plundered $10 billion, ousted by People Power.", { wiki: "Ferdinand Marcos", despot: true });
  I("Corazon Aquino", "Liberal (PH)", "e5", ["pm","leader","home"], [82,72,76,70,68],
    "Housewife who became face of People Power revolution restoring democracy; first female Philippine President.", { wiki: "Corazon Aquino" });
  I("Fidel Ramos", "Lakas (PH)", "e6", ["pm","defence","trade","leader"], [70,84,66,72,68],
    "General who stayed loyal in 1986, then served as President 1992–98 with strong economic growth.", { wiki: "Fidel Ramos" });
  I("Joseph Estrada", "PDP-Laban", "e6", ["pm","leader","home"], [76,68,74,56,64],
    "Movie star turned President; ousted by People Power II in 2001 amid plunder charges.", { wiki: "Joseph Estrada" });
  I("Gloria Macapagal Arroyo", "Lakas (PH)", "e7", ["pm","trade","chancellor","leader"], [64,82,62,68,68],
    "Economist President 2001–10; survived two coup attempts and Hello Garci scandal.", { wiki: "Gloria Macapagal Arroyo" });
  I("Benigno Aquino III", "Liberal (PH)", "e7", ["pm","justice","home","leader"], [74,76,72,68,68],
    "Cory's son; anti-corruption reformer who won South China Sea arbitration but died 2021.", { wiki: "Benigno Aquino III" });
  I("Rodrigo Duterte", "PDP-Laban", "e7", ["pm","home","justice","leader"], [76,72,78,54,74],
    "Davao Mayor turned President; drug war killed 6,000+, courted China, ICC investigation pending.", { wiki: "Rodrigo Duterte" });
  I("Ferdinand Marcos Jr.", "Nationalista (PH)", "e7", ["pm","leader","foreign"], [68,66,66,60,66],
    "'Bongbong' Marcos who won 2022 landslide reelection 36 years after his father's ouster.", { wiki: "Ferdinand Marcos Jr." });

  // ── SOUTHEAST ASIA — VIETNAM / THAILAND ──────────────────────────────────────
  I("Ho Chi Minh", "Communist Party (VN)", "e4", ["pm","leader","foreign","defence"], [88,78,86,76,82],
    "Founding father of modern Vietnam; nationalist-communist who expelled France and died before reunification.", { wiki: "Ho Chi Minh", despot: true });
  I("Vo Nguyen Giap", "Communist Party (VN)", "e4", ["defence","leader","foreign"], [78,82,74,78,74],
    "Military genius who defeated France at Dien Bien Phu and wore down US forces through guerrilla war.", { wiki: "Võ Nguyên Giáp" });
  I("Nguyen Van Thieu", "World Leaders", "e4", ["pm","defence","leader"], [60,76,56,56,62],
    "South Vietnam President 1967–75; clung to power until fall of Saigon, fled to US.", { wiki: "Nguyễn Văn Thiệu" });
  I("Nguyễn Phú Trọng", "Communist Party (VN)", "e7", ["pm","leader","foreign"], [58,82,56,62,72],
    "Communist Party General Secretary who ran 'burning furnace' anti-corruption drive until death in 2024.", { wiki: "Nguyễn Phú Trọng", despot: true });
  I("Thaksin Shinawatra", "Thai Rak Thai", "e7", ["pm","trade","health","leader"], [80,76,78,66,74],
    "Telecom billionaire turned PM; populist rural policies, won big, ousted by coup 2006, exiled.", { wiki: "Thaksin Shinawatra" });
  I("Yingluck Shinawatra", "Pheu Thai", "e7", ["pm","trade","leader","agriculture"], [76,70,72,62,70],
    "Thaksin's sister and first female Thai PM; ousted by courts, fled coup, joined brother in exile.", { wiki: "Yingluck Shinawatra" });
  I("Prayuth Chan-ocha", "PPRP (TH)", "e7", ["pm","defence","leader"], [54,76,50,56,64],
    "Army chief who launched 2014 coup; ruled Thailand for nine years through junta-backed constitution.", { wiki: "Prayuth Chan-ocha", despot: true });
  I("Pita Limjaroenrat", "World Leaders", "e7", ["leader","trade","culture","justice"], [78,64,80,62,70],
    "Progressive Move Forward leader who won 2023 election but blocked from PM by courts; dissolved party.", { wiki: "Pita Limjaroenrat" });
  I("Aung San Suu Kyi", "World Leaders", "e6", ["pm","foreign","justice","leader"], [88,78,84,72,66],
    "Nobel laureate who led NLD to power; tarnished by Rohingya genocide silence, jailed by 2021 coup.", { wiki: "Aung San Suu Kyi" });

  // ── PAKISTAN / BANGLADESH ─────────────────────────────────────────────────────
  I("Muhammad Ali Jinnah", "Muslim League (PK)", "e3", ["pm","foreign","leader","justice"], [86,84,82,82,78],
    "Founder of Pakistan; Quaid-e-Azam who achieved partition despite failing health in 1947.", { wiki: "Muhammad Ali Jinnah" });
  I("Zulfikar Ali Bhutto", "PPP (PK)", "e5", ["pm","foreign","leader","trade"], [84,82,84,70,80],
    "Charismatic socialist PM who gave Pakistan first constitution; hanged by Zia ul-Haq in 1979.", { wiki: "Zulfikar Ali Bhutto" });
  I("Muhammad Zia ul-Haq", "World Leaders", "e5", ["pm","defence","leader"], [54,76,52,56,66],
    "Military dictator who hanged Bhutto; Islamised Pakistan, backed Afghan mujahideen, died in 1988 plane crash.", { wiki: "Muhammad Zia-ul-Haq", despot: true });
  I("Benazir Bhutto", "PPP (PK)", "e6", ["pm","foreign","leader","home"], [86,80,84,72,76],
    "First female leader of a Muslim-majority country; twice PM, returned from exile and assassinated 2007.", { wiki: "Benazir Bhutto" });
  I("Nawaz Sharif", "PML-N", "e6", ["pm","trade","chancellor","leader"], [70,80,68,66,72],
    "Three-time PM jailed twice for corruption; led economic growth but repeatedly ousted by military.", { wiki: "Nawaz Sharif" });
  I("Pervez Musharraf", "World Leaders", "e7", ["pm","defence","trade","leader"], [64,80,62,62,66],
    "Army chief who seized power 1999; 9/11 changed Pakistan's role as frontline anti-terror ally.", { wiki: "Pervez Musharraf" });
  I("Imran Khan", "PTI", "e7", ["pm","leader","home","foreign"], [84,72,84,60,72],
    "Cricket legend turned PM 2018–22; anti-corruption populist ousted by military, jailed since 2023.", { wiki: "Imran Khan" });
  I("Shehbaz Sharif", "PML-N", "e7", ["pm","trade","leader"], [62,76,62,62,66],
    "Nawaz's brother and PM 2022–present; managed IMF negotiations and coalition arithmetic.", { wiki: "Shehbaz Sharif" });
  I("Sheikh Mujibur Rahman", "Awami League", "e4", ["pm","leader","foreign"], [86,78,86,68,78],
    "Bangabandhu — Father of Bangladesh; led independence from Pakistan 1971, assassinated 1975.", { wiki: "Sheikh Mujibur Rahman" });
  I("Ziaur Rahman", "BNP (BD)", "e5", ["pm","defence","leader"], [64,76,62,64,66],
    "Bangladeshi President who declared independence on radio; assassinated 1981 in coup.", { wiki: "Ziaur Rahman" });
  I("Sheikh Hasina", "Awami League", "e7", ["pm","trade","leader","home"], [72,80,70,68,72],
    "Daughter of Mujib; longest-serving PM who drove Bangladesh's export growth before 2024 uprising ousted her.", { wiki: "Sheikh Hasina" });
  I("Khaleda Zia", "BNP (BD)", "e6", ["pm","leader","home"], [66,76,64,62,68],
    "First female PM and widow of Ziaur Rahman; alternated power with Hasina for two decades.", { wiki: "Khaleda Zia" });

  // ── NIGERIA / WEST AFRICA ─────────────────────────────────────────────────────
  I("Nnamdi Azikiwe", "NCNC", "e4", ["pm","foreign","leader"], [82,80,82,74,72],
    "Pan-Africanist, first President of independent Nigeria; 'Zik of Africa', journalist and statesman.", { wiki: "Nnamdi Azikiwe" });
  I("Abubakar Tafawa Balewa", "NPC (NG)", "e4", ["pm","foreign","leader"], [72,78,72,70,66],
    "Nigeria's first and only PM; federal unifier assassinated in 1966 coup that began ethnic conflicts.", { wiki: "Abubakar Tafawa Balewa" });
  I("Yakubu Gowon", "World Leaders", "e4", ["pm","defence","leader"], [64,76,62,62,66],
    "Military leader through Biafra civil war 1967–70; 'No victor, no vanquished' reconciliation speech.", { wiki: "Yakubu Gowon" });
  I("Olusegun Obasanjo", "PDP (NG)", "e5", ["pm","defence","trade","leader"], [72,84,68,70,70],
    "General who handed power to civilians 1979, jailed by Abacha, then elected democratic President 1999–2007.", { wiki: "Olusegun Obasanjo" });
  I("Sani Abacha", "World Leaders", "e6", ["pm","defence","leader"], [42,72,38,44,62],
    "Military dictator 1993–98; $3–5 billion looted, protesters hanged including Ken Saro-Wiwa.", { wiki: "Sani Abacha", despot: true });
  I("Umaru Musa Yar'Adua", "PDP (NG)", "e7", ["pm","trade","leader"], [64,76,60,62,62],
    "Elected President 2007; died in office 2010 after long illness, succeeded by Goodluck Jonathan.", { wiki: "Umaru Musa Yar'Adua" });
  I("Goodluck Jonathan", "PDP (NG)", "e7", ["pm","trade","leader","environment"], [66,74,64,60,60],
    "First southern Nigerian to lose election peacefully; presided over Chibok kidnapping, ceded to Buhari.", { wiki: "Goodluck Jonathan" });
  I("Muhammadu Buhari", "APC (NG)", "e7", ["pm","defence","home","leader"], [60,76,56,58,62],
    "Military dictator turned elected President; anti-corruption fighter who struggled with Boko Haram.", { wiki: "Muhammadu Buhari" });
  I("Bola Tinubu", "APC (NG)", "e7", ["pm","chancellor","trade","leader"], [66,76,66,62,72],
    "Lagos godfather who won 2023 disputed election; ended fuel subsidy on inauguration day.", { wiki: "Bola Tinubu" });
  I("Kwame Nkrumah", "CPP (GH)", "e4", ["pm","foreign","leader","trade"], [88,78,86,76,78],
    "Ghana's first leader; Pan-African visionary who built Akosombo Dam but overthrown by CIA-backed coup 1966.", { wiki: "Kwame Nkrumah" });
  I("Jerry Rawlings", "NDC (GH)", "e5", ["pm","defence","trade","leader"], [76,76,76,68,72],
    "Twice overthrew Ghana's government by coup then handed power to democracy; built NDC democratic party.", { wiki: "Jerry Rawlings" });
  I("John Kufuor", "NPP (GH)", "e7", ["pm","trade","health","leader"], [74,80,70,72,70],
    "Ghanaian President 2001–09; achieved HIPC debt relief, opened Ghana's oil era, African Union chair.", { wiki: "John Kufuor" });
  I("John Atta Mills", "NDC (GH)", "e7", ["pm","leader","trade"], [64,76,62,62,60],
    "NDC President 2009–12; died in office of throat cancer, widely mourned across party lines.", { wiki: "John Atta Mills" });
  I("Jomo Kenyatta", "KANU (KE)", "e4", ["pm","foreign","leader","trade"], [80,78,78,74,74],
    "Kenya's founding father and first PM/President; Mau Mau imprisoned then released to lead independence.", { wiki: "Jomo Kenyatta" });
  I("Daniel arap Moi", "KANU (KE)", "e5", ["pm","leader","home"], [60,82,58,60,72],
    "Kenyan President for 24 years; Nyayo era of repression before forced to multi-party democracy in 1991.", { wiki: "Daniel arap Moi", despot: true });
  I("Raila Odinga", "ODM (KE)", "e7", ["pm","leader","foreign"], [76,78,74,68,74],
    "Kenya's perennial opposition leader; lost four elections to presidents but twice forced into unity deals.", { wiki: "Raila Odinga" });
  I("Uhuru Kenyatta", "Jubilee (KE)", "e7", ["pm","trade","foreign","leader"], [68,76,66,64,66],
    "Jomo's son and ICC-charged President; defeated Odinga twice, handed power to Ruto in 2022.", { wiki: "Uhuru Kenyatta" });
  I("William Ruto", "UDA (KE)", "e7", ["pm","trade","home","leader"], [70,74,70,64,70],
    "Hustler-framing President from 2022; austerity cuts sparked Gen Z protests that stormed parliament 2024.", { wiki: "William Ruto" });
  I("Julius Nyerere", "CCM (TZ)", "e4", ["pm","foreign","trade","leader"], [84,80,82,74,78],
    "Mwalimu — teacher-statesman who built Tanzanian socialism, kept peace and voluntarily retired 1985.", { wiki: "Julius Nyerere" });
  I("Abiy Ahmed", "Prosperity Party (ET)", "e7", ["pm","foreign","leader","home"], [78,66,80,64,66],
    "Nobel Peace laureate who made Ethiopia-Eritrea peace then launched Tigray war killing 300,000.", { wiki: "Abiy Ahmed" });
  I("Mengistu Haile Mariam", "Derg", "e5", ["pm","leader","defence"], [44,72,42,46,66],
    "Marxist Derg dictator responsible for Red Terror that killed 500,000; fled to Zimbabwe in 1991.", { wiki: "Mengistu Haile Mariam", despot: true });
  I("Robert Mugabe", "ZANU-PF", "e5", ["pm","foreign","leader","trade"], [70,82,72,62,76],
    "Liberation hero turned tyrant; destroyed Zimbabwe's economy with land seizures, died in office 2019.", { wiki: "Robert Mugabe", despot: true });
  I("Morgan Tsvangirai", "MDC (ZW)", "e6", ["pm","leader","trade"], [76,72,74,62,68],
    "Trade unionist who built MDC and challenged Mugabe; served as PM in unity government 2009–13.", { wiki: "Morgan Tsvangirai" });
  I("Emmerson Mnangagwa", "ZANU-PF", "e7", ["pm","defence","trade","leader"], [56,78,52,56,66],
    "The 'Crocodile' who staged 2017 coup against Mugabe; changed little of Zimbabwe's authoritarian order.", { wiki: "Emmerson Mnangagwa", despot: true });
  I("Patrice Lumumba", "NCNC", "e4", ["pm","foreign","leader"], [82,70,82,64,68],
    "Congo's first PM; pan-Africanist nationalist assassinated with Belgian/CIA involvement within months of independence.", { wiki: "Patrice Lumumba" });
  I("Mobutu Sese Seko", "World Leaders", "e4", ["pm","defence","leader"], [60,72,60,50,68],
    "Kleptocrat who renamed Zaire; ruled for 32 years looting $5 billion while country collapsed.", { wiki: "Mobutu Sese Seko", despot: true });
  I("Paul Kagame", "World Leaders", "e6", ["pm","defence","trade","leader"], [66,80,60,68,72],
    "RPF general who ended genocide; built Rwanda into clean, controlled model — but represses all dissent.", { wiki: "Paul Kagame", despot: true });

  // ── LATIN AMERICA — BRAZIL ───────────────────────────────────────────────────
  I("Getúlio Vargas", "UDN (BR)", "e3", ["pm","trade","leader","home"], [78,80,76,70,78],
    "Brazil's Vargas era 1930–54; populist 'Father of the Poor' who industrialised Brazil, suicide note lamented imperialism.", { wiki: "Getúlio Vargas" });
  I("Juscelino Kubitschek", "PMDB", "e4", ["pm","trade","chancellor","leader"], [76,80,74,72,72],
    "Built Brasília in four years; 50 years of progress in 5, economic boom and optimism.", { wiki: "Juscelino Kubitschek" });
  I("João Goulart", "PT (BR)", "e4", ["pm","trade","leader","home"], [72,76,72,62,68],
    "Left-wing PM ousted by US-backed 1964 coup; land reform and labour rights terrified Brazilian elites.", { wiki: "João Goulart" });
  I("Humberto Castello Branco", "World Leaders", "e4", ["pm","defence","leader"], [54,76,50,56,62],
    "First military dictator post-1964 coup; instituted Institutional Acts gutting Brazilian democracy.", { wiki: "Humberto Castelo Branco", despot: true });
  I("Ernesto Geisel", "World Leaders", "e5", ["pm","defence","trade","leader"], [58,80,54,62,66],
    "Military President who began abertura — gradual managed transition back to democracy.", { wiki: "Ernesto Geisel" });
  I("Tancredo Neves", "PMDB", "e5", ["pm","leader","trade"], [74,78,72,68,70],
    "First civilian President elected since 1964; died before inauguration, succeeded by Sarney.", { wiki: "Tancredo Neves" });
  I("Fernando Collor de Mello", "PSDB", "e6", ["pm","trade","chancellor","leader"], [70,70,72,54,64],
    "First directly-elected President; impeached for corruption in 1992, economic reform failed.", { wiki: "Fernando Collor de Mello" });
  I("Itamar Franco", "PMDB", "e6", ["pm","chancellor","trade","leader"], [64,78,62,66,60],
    "PM who oversaw Plano Real — inflation stabilisation that transformed Brazil's economy.", { wiki: "Itamar Franco" });
  I("Fernando Henrique Cardoso", "PSDB", "e6", ["pm","trade","chancellor","leader"], [78,84,74,80,72],
    "Sociologist-PM who designed Plano Real, won two terms and anchored Brazil's democratic stability.", { wiki: "Fernando Henrique Cardoso" });
  I("Luiz Inácio Lula da Silva", "PT (BR)", "e7", ["pm","trade","foreign","leader"], [86,80,86,76,80],
    "Metal worker union leader turned three-time President; lifted 30 million from poverty, jailed then exonerated.", { wiki: "Luiz Inácio Lula da Silva" });
  I("Dilma Rousseff", "PT (BR)", "e7", ["pm","trade","chancellor","leader"], [60,80,56,62,62],
    "Engineer and former guerrilla who became President and was impeached in 2016 in disputed coup.", { wiki: "Dilma Rousseff" });
  I("Michel Temer", "PMDB", "e7", ["pm","trade","leader","justice"], [50,76,50,54,58],
    "Constitutional PM who succeeded Dilma; passed pension reform while himself indicted for corruption.", { wiki: "Michel Temer" });
  I("Jair Bolsonaro", "PSL (BR)", "e7", ["pm","defence","leader","home"], [72,70,72,52,72],
    "Far-right ex-military PM 2019–22; 'tropical Trump', anti-environment, anti-vax, lost to Lula 2022.", { wiki: "Jair Bolsonaro" });
  I("Eduardo Cunha", "PMDB", "e7", ["leader","home","justice"], [52,74,56,50,64],
    "House Speaker who drove Dilma's impeachment; himself jailed for Swiss bank corruption.", { wiki: "Eduardo Cunha" });

  // ── LATIN AMERICA — ARGENTINA ────────────────────────────────────────────────
  I("Juan Domingo Perón", "Peronist", "e3", ["pm","defence","trade","leader"], [84,78,86,66,82],
    "Twice President; iconic populist whose Peronism still shapes Argentine politics 70 years later.", { wiki: "Juan Perón" });
  I("Eva Perón", "Peronist", "e3", ["leader","home","culture","trade"], [92,66,92,62,72],
    "'Evita' — union leader and welfare champion who died at 33; most iconic figure in Argentine history.", { wiki: "Eva Perón" });
  I("Raúl Alfonsín", "UCR (AR)", "e5", ["pm","justice","foreign","leader"], [82,80,82,76,74],
    "Restored democracy after military junta; trialled junta generals, then fell to hyperinflation.", { wiki: "Raúl Alfonsín" });
  I("Carlos Menem", "Peronist", "e6", ["pm","trade","chancellor","leader"], [76,78,76,62,74],
    "Peronist PM who privatised everything and pegged peso to dollar; boom then bust in 2001.", { wiki: "Carlos Menem" });
  I("Néstor Kirchner", "Peronist", "e7", ["pm","trade","leader","foreign"], [76,78,76,68,72],
    "Patagonian provincial governor turned President; restructured debt and faced down IMF.", { wiki: "Néstor Kirchner" });
  I("Cristina Fernández de Kirchner", "Peronist", "e7", ["pm","trade","foreign","leader"], [74,80,76,62,74],
    "Twice President and Néstor's wife; populist nationalism, corruption convictions, assassination attempt.", { wiki: "Cristina Fernández de Kirchner" });
  I("Mauricio Macri", "PRO (AR)", "e7", ["pm","chancellor","trade","leader"], [66,74,64,62,66],
    "CEO-President from Buenos Aires elite; market reforms failed, IMF dependency, returned inflation.", { wiki: "Mauricio Macri" });
  I("Alberto Fernández", "Frente de Todos", "e7", ["pm","justice","leader","trade"], [58,72,58,54,58],
    "Kirchnerista moderate PM during Covid; inflation soared, lost half his coalition support.", { wiki: "Alberto Fernández" });
  I("Javier Milei", "World Leaders", "e7", ["pm","chancellor","trade","leader"], [80,66,84,56,66],
    "Libertarian anarcho-capitalist who won 2023 election with chainsaw; dollarisation and shock austerity.", { wiki: "Javier Milei" });

  // ── LATIN AMERICA — MEXICO ───────────────────────────────────────────────────
  I("Lázaro Cárdenas", "PRI", "e3", ["pm","trade","home","leader"], [78,78,74,72,72],
    "President who nationalised oil in 1938 and distributed land to 800,000 peasants.", { wiki: "Lázaro Cárdenas" });
  I("Luis Echeverría", "PRI", "e5", ["pm","foreign","leader"], [60,80,58,56,66],
    "PRI President who ordered Tlatelolco massacre; leftist turn created debt crisis.", { wiki: "Luis Echeverría" });
  I("Carlos Salinas de Gortari", "PRI", "e6", ["pm","trade","chancellor","foreign","leader"], [66,82,62,68,70],
    "Neoliberal PM who signed NAFTA; disputed 1988 election fraud, political career collapsed.", { wiki: "Carlos Salinas de Gortari" });
  I("Ernesto Zedillo", "PRI", "e6", ["pm","trade","chancellor","leader"], [68,82,64,70,68],
    "Last PRI President; managed 1994 peso crisis, defeated Zapatistas, lost to Fox in 2000.", { wiki: "Ernesto Zedillo" });
  I("Vicente Fox", "PAN (MX)", "e7", ["pm","trade","foreign","leader"], [74,74,72,66,68],
    "Coca-Cola executive who ended 71 years of PRI rule; charismatic but weak on security.", { wiki: "Vicente Fox" });
  I("Felipe Calderón", "PAN (MX)", "e7", ["pm","home","defence","leader"], [60,76,58,58,62],
    "Declared war on drug cartels 2006; 60,000+ deaths and accusations his party worked with Sinaloa.", { wiki: "Felipe Calderón" });
  I("Enrique Peña Nieto", "PRI", "e7", ["pm","trade","leader"], [64,74,64,56,64],
    "PRI's photogenic return; NAFTA renegotiation, disappeared 43 Ayotzinapa students, corruption scandals.", { wiki: "Enrique Peña Nieto" });
  I("Andrés Manuel López Obrador", "Morena", "e7", ["pm","trade","home","leader"], [78,76,80,60,72],
    "'AMLO' — left-populist PM 2018–24 who targeted elites but undermined courts and autonomous bodies.", { wiki: "Andrés Manuel López Obrador" });
  I("Claudia Sheinbaum", "Morena", "e7", ["pm","environment","chancellor","leader"], [76,76,74,72,72],
    "Climate scientist and Mexico City mayor who won 2024 election by landslide — Mexico's first female President.", { wiki: "Claudia Sheinbaum" });

  // ── LATIN AMERICA — COLOMBIA / VENEZUELA / CHILE / PERU / BOLIVIA ──────────
  I("Simón Bolívar", "World Leaders", "e0", ["pm","defence","foreign","leader"], [86,78,84,78,72],
    "The Liberator; freed Colombia, Venezuela, Ecuador, Peru, Bolivia from Spanish rule — South America's Washington.", { wiki: "Simón Bolívar" });
  I("Gabriel García Moreno", "World Leaders", "e1", ["pm","home","leader"], [60,74,62,60,64],
    "Theocratic Ecuadorian President who governed in the name of God; assassinated on steps of government palace.", { wiki: "Gabriel García Moreno" });
  I("Álvaro Uribe", "Centro Democrático", "e7", ["pm","home","defence","leader"], [72,80,72,66,72],
    "Colombian security hardliner who defeated FARC militarily; popular PM but paramilitaries scandal.", { wiki: "Álvaro Uribe Vélez" });
  I("Juan Manuel Santos", "World Leaders", "e7", ["pm","foreign","defence","leader"], [74,82,70,76,66],
    "Colombian PM who signed 2016 FARC peace deal and won Nobel Peace Prize, breaking 52-year war.", { wiki: "Juan Manuel Santos" });
  I("Gustavo Petro", "Pacto Histórico", "e7", ["pm","home","leader","environment"], [76,72,78,64,70],
    "Former M-19 guerrilla and Bogotá mayor; Colombia's first left-wing President from 2022.", { wiki: "Gustavo Petro" });
  I("Hugo Chávez", "PSUV", "e6", ["pm","leader","foreign","trade"], [86,76,86,62,80],
    "Socialist President who survived coup 2002; oil nationalisation, Bolivarian revolution, died 2013.", { wiki: "Hugo Chávez" });
  I("Nicolás Maduro", "PSUV", "e7", ["pm","leader","home"], [52,70,52,44,68],
    "Chávez's bus driver successor; presided over Venezuela's collapse into hyperinflation and dictatorship.", { wiki: "Nicolás Maduro", despot: true });
  I("Leopoldo López", "World Leaders", "e7", ["leader","home","justice"], [76,68,76,62,66],
    "Opposition leader jailed in Venezuela; mobilised massive street protests before exile in Spanish embassy.", { wiki: "Leopoldo López" });
  I("Salvador Allende", "PS (CL)", "e5", ["pm","health","trade","leader"], [82,78,82,68,74],
    "World's first democratically elected Marxist President; died in Pinochet's 1973 CIA-backed coup.", { wiki: "Salvador Allende" });
  I("Augusto Pinochet", "World Leaders", "e5", ["pm","defence","trade","leader"], [56,78,50,56,72],
    "Military dictator 1973–90; Chicago Boys economic shock therapy, 3,000 killed, handed power peacefully.", { wiki: "Augusto Pinochet", despot: true });
  I("Ricardo Lagos", "PS (CL)", "e6", ["pm","trade","education","leader"], [78,82,76,78,72],
    "Socialist PM 2000–06; negotiated US and EU free trade deals while shaking Pinochet's finger on TV.", { wiki: "Ricardo Lagos" });
  I("Michelle Bachelet", "PS (CL)", "e7", ["pm","home","health","leader"], [80,82,78,78,74],
    "Paediatric doctor tortured under Pinochet who became twice PM and UN human rights commissioner.", { wiki: "Michelle Bachelet" });
  I("Sebastián Piñera", "RN (CL)", "e7", ["pm","trade","chancellor","leader"], [68,80,66,68,68],
    "Billionaire conservative PM twice; faced 2019 uprising and died in helicopter crash 2024.", { wiki: "Sebastián Piñera" });
  I("Gabriel Boric", "Frente Amplio (CL)", "e7", ["pm","home","leader","environment"], [76,66,76,64,66],
    "Student movement leader and Chile's youngest President at 36; 2022 new constitution rejected.", { wiki: "Gabriel Boric" });
  I("Alberto Fujimori", "Fuerza Popular (PE)", "e6", ["pm","trade","leader"], [66,72,64,58,68],
    "Peruvian PM who defeated Shining Path but self-staged coup and jailed for human rights crimes.", { wiki: "Alberto Fujimori" });
  I("Alan García", "APRA", "e6", ["pm","trade","leader"], [74,76,76,54,66],
    "APRA PM twice; hyperinflation first term, mining boom second; shot himself as police arrived to arrest him.", { wiki: "Alan García" });
  I("Pedro Castillo", "World Leaders", "e7", ["pm","leader","home"], [58,58,58,40,46],
    "Rural schoolteacher elected President of Peru 2021; impeached then imprisoned after dissolving Congress.", { wiki: "Pedro Castillo" });
  I("Evo Morales", "MAS (BO)", "e7", ["pm","trade","leader","home"], [78,72,76,66,72],
    "Bolivia's first indigenous President; nationalised gas, reduced poverty, ousted in disputed 2019 election.", { wiki: "Evo Morales" });
  I("José 'Pepe' Mujica", "Frente Amplio (UY)", "e7", ["pm","trade","leader","home"], [86,74,80,70,66],
    "Former Tupamaro guerrilla who became Uruguay's beloved austere President; legalised marijuana and gay marriage.", { wiki: "José Mujica" });
  I("Luis Lacalle Pou", "Partido Nacional (UY)", "e7", ["pm","trade","chancellor","leader"], [72,72,70,70,68],
    "Centre-right Uruguayan PM from 2020; welfare state reforms and Latin America's rare pandemic success.", { wiki: "Luis Lacalle Pou" });

  // ── WESTERN BALKANS / EASTERN EUROPE ─────────────────────────────────────────
  I("Josip Broz Tito", "World Leaders", "e3", ["pm","defence","foreign","leader"], [82,84,80,80,82],
    "Yugoslav partisan leader who defied Stalin; non-aligned movement founder, died peacefully 1980.", { wiki: "Josip Broz Tito", despot: true });
  I("Slobodan Milošević", "World Leaders", "e5", ["pm","leader","home","foreign"], [68,76,70,56,76],
    "Serbian nationalist who triggered Yugoslavia's dissolution; war crimes indicted, died before conviction.", { wiki: "Slobodan Milošević" });
  I("Franjo Tuđman", "World Leaders", "e5", ["pm","defence","leader","foreign"], [66,76,64,60,72],
    "Croatian nationalist who won independence; Bosnian war crimes tarnished liberation legacy.", { wiki: "Franjo Tuđman" });
  I("Alija Izetbegović", "World Leaders", "e5", ["pm","leader","foreign","defence"], [74,74,72,64,66],
    "Bosniak President who held country together through Srebrenica genocide and Siege of Sarajevo.", { wiki: "Alija Izetbegović" });
  I("Aleksandar Vučić", "World Leaders", "e7", ["pm","foreign","leader","home"], [68,76,68,62,72],
    "Former Milošević information minister turned 'European path' PM; centralises power while courting EU.", { wiki: "Aleksandar Vučić" });
  I("Zoran Đinđić", "World Leaders", "e6", ["pm","foreign","justice","leader"], [80,76,78,72,68],
    "Reform PM who extradited Milošević to The Hague; assassinated by organised crime network 2003.", { wiki: "Zoran Đinđić" });
  I("Nicolae Ceaușescu", "World Leaders", "e4", ["pm","leader","trade"], [54,72,56,54,70],
    "Romanian dictator 1965–89; independent from Moscow but megalomaniac austerity; executed Christmas Day 1989.", { wiki: "Nicolae Ceaușescu", despot: true });
  I("Ion Iliescu", "World Leaders", "e6", ["pm","leader","foreign"], [62,78,62,62,66],
    "Post-communist President twice; miner violence against protests in 1990 marked troubled transition.", { wiki: "Ion Iliescu" });
  I("Traian Băsescu", "World Leaders", "e7", ["pm","foreign","trade","leader"], [68,78,68,66,68],
    "Populist Romanian President 2004–14; twice survived impeachment attempts, steered EU/NATO integration.", { wiki: "Traian Băsescu" });
  I("Klaus Iohannis", "World Leaders", "e7", ["pm","foreign","home","leader"], [70,78,66,68,66],
    "German-Romanian ethnic President; pushed anti-corruption agenda, now EU foreign policy candidate.", { wiki: "Klaus Iohannis" });
  I("Todor Zhivkov", "World Leaders", "e4", ["pm","leader","foreign"], [54,76,52,54,66],
    "Bulgaria's longest-ruling communist dictator 1954–89; forced ethnic Turks to change names.", { wiki: "Todor Zhivkov", despot: true });
  I("Boyko Borisov", "World Leaders", "e7", ["pm","trade","leader","home"], [64,74,64,58,66],
    "Ex-bodyguard turned Bulgarian PM three times; EU-aligned but oligarchic and corruption-laden governance.", { wiki: "Boyko Borisov" });
  I("Nikola Gruevski", "World Leaders", "e7", ["pm","leader","trade","home"], [62,72,62,54,64],
    "Macedonian PM who built fake antiquity statues and fled on corruption charges — 'Skopje 2014' scandal.", { wiki: "Nikola Gruevski" });

  // ── MORE RUSSIA / POST-SOVIET ─────────────────────────────────────────────────
  I("Alexander Kerensky", "World Leaders", "e2", ["pm","leader","foreign","justice"], [72,68,76,58,62],
    "Led Provisional Government after February 1917 Revolution; overthrown by Bolsheviks in October.", { wiki: "Alexander Kerensky" });
  I("Nikita Khrushchev", "Communist Party (SU)", "e4", ["pm","leader","foreign","defence"], [78,82,76,72,76],
    "De-Staliniser whose 'Secret Speech' shocked the world; Cuban Missile Crisis, Sputnik, ousted by Politburo.", { wiki: "Nikita Khrushchev" });
  I("Leonid Brezhnev", "Communist Party (SU)", "e4", ["pm","leader","defence","foreign"], [60,82,58,62,72],
    "General Secretary 1964–82; détente, Prague Spring crushing, Afghanistan invasion, 'stability of cadres'.", { wiki: "Leonid Brezhnev" });
  I("Yuri Andropov", "Communist Party (SU)", "e5", ["pm","leader","home","foreign"], [62,84,58,66,68],
    "Former KGB chief who became brief General Secretary 1982–84; anti-corruption reformer limited by illness.", { wiki: "Yuri Andropov" });
  I("Dmitry Medvedev", "United Russia", "e7", ["pm","trade","justice","leader"], [60,78,58,60,66],
    "Briefly PM while Putin was PM; 'tandem' arrangement, reset with Obama; now shrill war hawk.", { wiki: "Dmitry Medvedev" });
  I("Alexei Navalny", "World Leaders", "e7", ["leader","justice","home"], [82,66,84,64,62],
    "Anti-corruption blogger and Putin's main opponent; survived poisoning with Novichok, died in Arctic prison 2024.", { wiki: "Alexei Navalny" });
  I("Nursultan Nazarbayev", "World Leaders", "e5", ["pm","trade","leader","foreign"], [64,82,60,64,72],
    "Kazakhstan's founding President for 30 years; oil wealth with authoritarian control and personality cult.", { wiki: "Nursultan Nazarbayev", despot: true });
  I("Alexander Lukashenko", "World Leaders", "e6", ["pm","leader","home"], [60,74,58,54,68],
    "'Europe's last dictator' who rigged 2020 election then crushed protests with Russian backing.", { wiki: "Alexander Lukashenko", despot: true });
  I("Volodymyr Zelenskyy", "World Leaders", "e7", ["pm","leader","foreign","home"], [90,66,92,72,74],
    "TV comedian turned President who galvanised global support against Russia's 2022 invasion.", { wiki: "Volodymyr Zelenskyy" });
  I("Petro Poroshenko", "World Leaders", "e7", ["pm","trade","foreign","leader"], [64,74,62,60,62],
    "Chocolate billionaire President who guided Ukraine through Maidan and Donbas war 2014–19.", { wiki: "Petro Poroshenko" });

  // ── ADDITIONAL UK / COMMONWEALTH ──────────────────────────────────────────────
  I("John Curtin", "Australian Labor Party", "e3", ["pm","defence","leader","trade"], [80,80,76,78,74],
    "Australia's greatest wartime PM; turned to America after Pearl Harbor, died in office 1945.", { wiki: "John Curtin" });
  I("Ben Chifley", "Australian Labor Party", "e4", ["pm","chancellor","trade","leader"], [74,78,70,74,70],
    "Railway driver turned PM; Snowy Mountains hydro scheme, post-war immigration, universal healthcare.", { wiki: "Ben Chifley" });
  I("Robert Menzies", "Liberal (AU)", "e3", ["pm","foreign","trade","leader"], [76,84,74,78,80],
    "Australia's longest-serving PM (18 years); founder of Liberal Party and steadfast Cold War Anglophile.", { wiki: "Robert Menzies" });
  I("Gough Whitlam", "Australian Labor Party", "e5", ["pm","foreign","education","leader"], [84,80,84,76,76],
    "Transformative PM 1972–75; opened China, Medicare, land rights; dismissed in constitutional crisis.", { wiki: "Gough Whitlam" });
  I("Malcolm Fraser", "Liberal (AU)", "e5", ["pm","foreign","home","leader"], [68,82,64,70,68],
    "Conservative PM who dismissed Whitlam; later became progressive voice on refugees and reconciliation.", { wiki: "Malcolm Fraser" });
  I("Bob Hawke", "Australian Labor Party", "e5", ["pm","trade","foreign","leader"], [86,82,84,80,80],
    "Beer-drinking record holder and union chief; most popular PM, floated dollar and deregulated economy.", { wiki: "Bob Hawke" });
  I("Paul Keating", "Australian Labor Party", "e6", ["pm","chancellor","trade","leader"], [80,82,80,80,76],
    "Treasurer who ended the recession 'we had to have', then PM pushing republic and Asian engagement.", { wiki: "Paul Keating" });
  I("John Howard", "Liberal (AU)", "e6", ["pm","trade","home","leader"], [72,86,68,74,78],
    "Second longest PM; gun control after Port Arthur, GST, Iraq War, WorkChoices undone by Rudd.", { wiki: "John Howard" });
  I("Kevin Rudd", "Australian Labor Party", "e7", ["pm","foreign","trade","leader"], [76,80,76,74,66],
    "Mandarin-speaking PM who apologised to Stolen Generations and saved Australia from GFC recession.", { wiki: "Kevin Rudd" });
  I("Julia Gillard", "Australian Labor Party", "e7", ["pm","education","leader","home"], [74,78,72,72,68],
    "Australia's first female PM 2010–13; carbon tax, NDIS, mysogyny speech went viral globally.", { wiki: "Julia Gillard" });
  I("Tony Abbott", "Liberal (AU)", "e7", ["pm","home","trade","leader"], [62,76,62,58,66],
    "Conservative PM who repealed carbon tax and stopped boats; 'suppository of wisdom' and cycling devotee.", { wiki: "Tony Abbott" });
  I("Malcolm Turnbull", "Liberal (AU)", "e7", ["pm","trade","technology","leader"], [72,80,70,68,62],
    "Investment banker PM undone by climate deniers in his own party; NBN's troubled legacy.", { wiki: "Malcolm Turnbull" });
  I("Scott Morrison", "Liberal (AU)", "e7", ["pm","home","trade","leader"], [60,74,58,58,62],
    "Marketing executive PM during Covid and bushfire crisis; secretly held five ministries.", { wiki: "Scott Morrison" });
  I("Anthony Albanese", "Australian Labor Party", "e7", ["pm","trade","home","leader"], [70,76,68,68,68],
    "Left-wing PM from Marrickville Housing Commission; AUKUS, Voice referendum failed, focus on housing.", { wiki: "Anthony Albanese" });
  I("Pierre Trudeau", "Liberal (CA)", "e5", ["pm","foreign","justice","leader"], [88,82,88,80,78],
    "Philosopher-PM who patriated Canada's constitution, official bilingualism, Charter of Rights.", { wiki: "Pierre Trudeau" });
  I("Brian Mulroney", "Conservative (CA)", "e5", ["pm","trade","foreign","leader"], [72,82,72,72,72],
    "Conservative PM who signed free trade with US and Meech Lake Accord; GST implementation hated.", { wiki: "Brian Mulroney" });
  I("Jean Chrétien", "Liberal (CA)", "e6", ["pm","trade","foreign","leader"], [76,84,70,74,76],
    "Scrappy 'little guy from Shawinigan'; three majority governments, balanced budget, refused Iraq War.", { wiki: "Jean Chrétien" });
  I("Paul Martin", "Liberal (CA)", "e7", ["pm","chancellor","trade","leader"], [66,82,62,68,62],
    "Finance minister who slew the deficit then minority PM; fell to Sponsorship Scandal.", { wiki: "Paul Martin" });
  I("Stephen Harper", "Conservative (CA)", "e7", ["pm","trade","home","leader"], [64,82,60,68,72],
    "Conservative PM for nine years; tight fiscal control, alienated scientists, Saudi arms deal.", { wiki: "Stephen Harper" });
  I("Justin Trudeau", "Liberal (CA)", "e7", ["pm","foreign","home","leader"], [78,72,80,68,70],
    "Drama teacher and Pierre's son; won massive 2015 majority on 'sunny ways', diminished to minority.", { wiki: "Justin Trudeau" });
  I("Mark Carney", "Liberal (CA)", "e7", ["pm","chancellor","trade","foreign"], [72,84,68,78,62],
    "Central banker who served Bank of Canada and Bank of England; succeeded Trudeau as Liberal PM in 2025.", { wiki: "Mark Carney" });

  // ── ADDITIONAL EU / MISCELLANEOUS ─────────────────────────────────────────────
  I("Jacques Delors", "PS (FR)", "e5", ["pm","trade","foreign","leader"], [78,88,74,84,72],
    "European Commission President who built the Single Market and Maastricht Treaty; iconic European federalist.", { wiki: "Jacques Delors" });
  I("Helmut Schmidt", "SPD (DE)", "e5", ["pm","chancellor","defence","foreign"], [78,88,76,82,76],
    "German Chancellor 1974–82; Euromissile crisis, Baader-Meinhof, NATO dual-track decision.", { wiki: "Helmut Schmidt" });
  I("Oskar Lafontaine", "SPD (DE)", "e6", ["pm","chancellor","leader","trade"], [74,80,76,66,72],
    "Saarland PM and Finance Minister who resigned from Schröder cabinet; later co-founded Die Linke.", { wiki: "Oskar Lafontaine" });
  I("Friedrich Merz", "CDU/CSU", "e7", ["pm","chancellor","trade","leader"], [70,80,68,70,70],
    "Blackrock lawyer and CDU leader; won 2025 German election on migration and economic renewal.", { wiki: "Friedrich Merz" });
  I("Christian Lindner", "FDP", "e7", ["chancellor","trade","leader"], [68,72,70,64,66],
    "FDP leader and finance minister ousted from Scholz coalition over debt brake; 'better not governing'.", { wiki: "Christian Lindner" });
  I("Alice Weidel", "AfD", "e7", ["leader","chancellor","home"], [72,68,72,58,72],
    "Goldman Sachs economist and lesbian AfD leader; pushed party to poll record 20%+ in 2025 election.", { wiki: "Alice Weidel" });
  I("Robert Habeck", "Greens (DE)", "e7", ["pm","environment","trade","leader"], [74,72,76,66,68],
    "Philosopher-politician and Green co-leader who served as Economy Minister and 2025 Green chancellor candidate.", { wiki: "Robert Habeck" });
  I("Annalena Baerbock", "Greens (DE)", "e7", ["pm","foreign","environment","leader"], [74,70,74,66,66],
    "Green Foreign Minister; outspoken on Ukraine and climate; CVgate knocked her 2021 chancellor bid.", { wiki: "Annalena Baerbock" });
  I("Marine Le Pen", "Rassemblement National", "e7", ["pm","leader","home","foreign"], [76,74,72,60,76],
    "FN/RN leader who detoxified her father's party; three presidential runs, closest to power in 2022.", { wiki: "Marine Le Pen" });
  I("Jean-Luc Mélenchon", "La France Insoumise", "e7", ["pm","leader","foreign","trade"], [78,78,82,64,72],
    "Trotskyist-turned-left populist who nearly made the 2022 run-off; NUPES and NFP architect.", { wiki: "Jean-Luc Mélenchon" });
  I("Michel Barnier", "Les Républicains", "e7", ["pm","foreign","trade","leader"], [66,88,62,72,64],
    "EU chief Brexit negotiator who became France's PM in 2024 — only to fall in 89 days to no-confidence.", { wiki: "Michel Barnier" });
  I("Elisabeth Borne", "Ensemble", "e7", ["pm","environment","trade","leader"], [62,82,60,66,60],
    "Engineer PM who replaced Castex; wielded Article 49.3 40 times, replaced by Attal.", { wiki: "Élisabeth Borne" });
  I("Gabriel Attal", "Ensemble", "e7", ["pm","education","leader","home"], [76,66,76,64,68],
    "France's youngest and first openly gay PM; energetic Macron loyalist who served only months.", { wiki: "Gabriel Attal" });
  I("François Bayrou", "Ensemble", "e7", ["pm","education","leader"], [62,78,64,64,60],
    "Centrist veteran and Macron ally who finally became PM in late 2024 after decades seeking the role.", { wiki: "François Bayrou" });
  I("Ursula von der Leyen", "CDU/CSU", "e7", ["pm","defence","health","leader"], [72,84,68,74,68],
    "Former German Defence Minister who became EC President; led EU Covid response and Ukraine support.", { wiki: "Ursula von der Leyen" });
  I("Josep Borrell", "PS (FR)", "e7", ["pm","foreign","leader"], [70,84,68,72,66],
    "Spanish Socialist who became EU's High Representative; outspoken on Ukraine, Gaza and China.", { wiki: "Josep Borrell" });

})();

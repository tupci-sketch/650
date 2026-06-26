/* ============================================================
   650 — POLITICIANS EXPANSION X
   USA historical deep-dive + Eastern Europe + Middle East
   + Africa + Latin America fill + miscellaneous world
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
  /* Ukraine */
  reg("Servant of the People (UA)", "SotP_UA",  "#009246",  0.0, 450);
  reg("Party of Regions (UA)",      "PoR_UA",   "#003189",  0.5, 450);
  reg("Our Ukraine (UA)",           "OU_UA",    "#f9a825",  0.3, 450);
  reg("Batkivshchyna (UA)",         "Batk_UA",  "#003189", -0.3, 450);
  reg("UDAR (UA)",                  "UDAR_UA",  "#f9a825",  0.2, 450);
  reg("Opposition Platform (UA)",   "OpPl_UA",  "#003189",  0.8, 450);
  reg("Svoboda (UA)",               "Svob_UA",  "#1c3f6e",  1.8, 450);
  reg("Communist Party (UA)",       "CPU",      "#cc0000", -1.5, 450);
  /* Serbia / Western Balkans */
  reg("SNS (RS)",                   "SNS_RS",   "#003189",  0.8, 250);
  reg("SPS (RS)",                   "SPS_RS",   "#e53935",  0.5, 250);
  reg("DS (RS)",                    "DS_RS",    "#003189",  0.2, 250);
  reg("DSS (RS)",                   "DSS_RS",   "#003189",  0.5, 250);
  reg("SRS (RS)",                   "SRS_RS",   "#1c3f6e",  1.8, 250);
  reg("HDZ (HR)",                   "HDZ_HR",   "#003189",  0.7, 151);
  reg("SDP (HR)",                   "SDP_HR",   "#e53935", -0.4, 151);
  reg("MOST (HR)",                  "Most_HR",  "#f9a825",  0.3, 151);
  reg("SDSS (HR)",                  "SDSS_HR",  "#003189", -0.2, 151);
  reg("SKH-SDP (HR)",               "SKH_HR",   "#cc0000", -1.0, 151);
  reg("VMRO (MK)",                  "VMRO_MK",  "#003189",  0.8, 120);
  reg("SDSM (MK)",                  "SDSM_MK",  "#e53935", -0.2, 120);
  reg("DUI (MK)",                   "DUI_MK",   "#f9a825",  0.2, 120);
  reg("GERB (BG)",                  "GERB_BG",  "#003189",  0.6, 240);
  reg("BSP (BG)",                   "BSP_BG",   "#e53935", -0.5, 240);
  reg("DPS (BG)",                   "DPS_BG",   "#f9a825",  0.2, 240);
  reg("NDSV (BG)",                  "NDSV_BG",  "#f9a825",  0.3, 240);
  reg("BCP (BG)",                   "BCP_BG",   "#cc0000", -1.5, 240);
  reg("PP (BG)",                    "PP_BG",    "#003189",  0.1, 240);
  reg("PSD (RO)",                   "PSD_RO",   "#e53935",  0.0, 330);
  reg("PNL (RO)",                   "PNL_RO",   "#f9a825",  0.5, 330);
  reg("USR (RO)",                   "USR_RO",   "#003189", -0.2, 330);
  reg("AUR (RO)",                   "AUR_RO",   "#f9a825",  1.5, 330);
  reg("PCR (RO)",                   "PCR",      "#cc0000", -1.5, 330);
  reg("PDL (RO)",                   "PDL_RO",   "#f9a825",  0.5, 330);
  /* Baltic states */
  reg("Reform Party (EE)",          "Ref_EE",   "#f9a825",  0.6, 101);
  reg("Centre Party (EE)",          "Cent_EE",  "#009246", -0.3, 101);
  reg("EKRE (EE)",                  "EKRE_EE",  "#1c3f6e",  1.8, 101);
  reg("Isamaa (EE)",                "Isa_EE",   "#003189",  0.5, 101);
  reg("Social Democrats (EE)",      "SDE_EE",   "#e53935", -0.5, 101);
  reg("Tsiviilne (EE)",             "Tsi_EE",   "#003189",  0.2, 101);
  reg("Homeland Union (LT)",        "TS_LT",    "#003189",  0.7, 141);
  reg("Social Democrats (LT)",      "SocD_LT",  "#e53935", -0.5, 141);
  reg("LSDP (LT)",                  "LSDP_LT",  "#e53935", -0.5, 141);
  reg("LDDP (LT)",                  "LDDP_LT",  "#009246",  0.0, 141);
  reg("DP (LT)",                    "DP_LT",    "#f9a825",  0.2, 141);
  reg("Liberal Movement (LT)",      "LiMov_LT", "#f9a825",  0.5, 141);
  reg("New Unity (LV)",             "JV_LV",    "#003189",  0.5, 100);
  reg("Harmony (LV)",               "Harm_LV",  "#e53935", -0.3, 100);
  reg("Zatlers (LV)",               "Zat_LV",   "#f9a825",  0.3, 100);
  reg("NA (LV)",                    "NA_LV",    "#1c3f6e",  1.5, 100);
  reg("LPP (LV)",                   "LPP_LV",   "#cc0000", -1.5, 100);
  /* Caucasus */
  reg("Georgian Dream (GE)",        "GD_GE",    "#e53935", -0.2, 150);
  reg("UNM (GE)",                   "UNM_GE",   "#003189",  0.4, 150);
  reg("Labour (GE)",                "Lab_GE",   "#e53935", -0.6, 150);
  reg("CUG (GE)",                   "CUG_GE",   "#009246",  0.3, 150);
  reg("HHK (AM)",                   "HHK_AM",   "#003189",  0.5, 105);
  reg("Civil Contract (AM)",        "CC_AM",    "#f9a825", -0.2, 105);
  reg("ARF (AM)",                   "ARF_AM",   "#e53935",  0.2, 105);
  reg("HAK (AM)",                   "HAK_AM",   "#003189",  0.3, 105);
  reg("New Azerbaijan (AZ)",        "YAP_AZ",   "#003189",  0.5, 125);
  reg("APF (AZ)",                   "APF_AZ",   "#f9a825",  0.3, 125);
  /* Central Asia */
  reg("Nur Otan (KZ)",              "Otan_KZ",  "#009246",  0.5, 107);
  reg("Amanat (KZ)",                "Aman_KZ",  "#009246",  0.4, 107);
  reg("People's Democratic (KG)",   "SDPK_KG",  "#e53935",  0.0, 120);
  reg("Ata Meken (KG)",             "AtaM_KG",  "#e53935", -0.3, 120);
  reg("LDPU (UZ)",                  "LDPU_UZ",  "#f9a825",  0.3, 150);
  reg("UzLiDeP (UZ)",               "UzL_UZ",   "#f9a825",  0.3, 150);
  /* Middle East */
  reg("Future Movement (LB)",       "FM_LB",    "#003189",  0.3, 128);
  reg("Hezbollah (LB)",             "Hezb_LB",  "#009246", -0.5, 128);
  reg("Amal (LB)",                  "Amal_LB",  "#009246", -0.3, 128);
  reg("LF (LB)",                    "LF_LB",    "#e53935",  0.5, 128);
  reg("Kataeb (LB)",                "Kat_LB",   "#e53935",  0.5, 128);
  reg("FPM (LB)",                   "FPM_LB",   "#f9a825",  0.3, 128);
  reg("Ba'ath (SY)",                "Baath_SY", "#009246",  0.0, 250);
  reg("Ba'ath (IQ)",                "Baath_IQ", "#009246",  0.0, 328);
  reg("Dawa (IQ)",                  "Dawa_IQ",  "#009246", -0.2, 328);
  reg("KDP (IQ)",                   "KDP_IQ",   "#f9a825",  0.3, 328);
  reg("PUK (IQ)",                   "PUK_IQ",   "#009246", -0.2, 328);
  reg("Sadr (IQ)",                  "Sadr_IQ",  "#009246", -0.2, 328);
  reg("Islamic Republic (IR)",      "IRI",      "#009246",  0.0, 290);
  reg("Reformists (IR)",            "Ref_IR",   "#009246", -0.3, 290);
  reg("Rafsanjani (IR)",            "Raf_IR",   "#f9a825",  0.2, 290);
  reg("Hashemite (JO)",             "Hash_JO",  "#009246",  0.3, 130);
  reg("Al Saud (SA)",               "AlSaud",   "#009246",  0.5, 0);
  reg("UAE Federal (AE)",           "UAE_Fed",  "#009246",  0.4, 0);
  reg("Hamas (PS)",                 "Hamas_PS", "#009246",  0.5, 132);
  reg("Fatah (PS)",                 "Fatah_PS", "#f9a825",  0.2, 132);
  reg("NDP (EG2)",                  "NDP_EG",   "#009246",  0.3, 596);
  reg("Freedom & Justice (EG)",     "FJP_EG",   "#009246",  0.3, 596);
  reg("Al-Nour (EG)",               "AlNour",   "#009246",  0.5, 596);
  /* North Africa */
  reg("Istiqlal (MA)",              "Istiq_MA", "#009246",  0.2, 395);
  reg("PJD (MA)",                   "PJD_MA",   "#009246",  0.3, 395);
  reg("PAM (MA)",                   "PAM_MA",   "#f9a825",  0.3, 395);
  reg("USFP (MA)",                  "USFP_MA",  "#e53935", -0.3, 395);
  reg("Istiqlal bloc (MA)",         "IstB_MA",  "#003189",  0.3, 395);
  reg("FLN (DZ)",                   "FLN_DZ",   "#009246",  0.3, 462);
  reg("RND (DZ)",                   "RND_DZ",   "#009246",  0.3, 462);
  reg("FFS (DZ)",                   "FFS_DZ",   "#003189", -0.2, 462);
  reg("MSP (DZ)",                   "MSP_DZ",   "#009246",  0.5, 462);
  reg("Ennahda (TN)",               "Enna_TN",  "#009246",  0.5, 217);
  reg("Nidaa Tounes (TN)",          "NT_TN",    "#003189",  0.2, 217);
  reg("RCD (TN)",                   "RCD_TN",   "#009246",  0.3, 217);
  reg("Aish Tounsi (TN)",           "AT_TN",    "#f9a825",  0.2, 217);
  /* Sub-Saharan Africa */
  reg("PS (SN)",                    "PS_SN",    "#e53935", -0.2, 165);
  reg("PDS (SN)",                   "PDS_SN",   "#003189",  0.3, 165);
  reg("APR (SN)",                   "APR_SN",   "#f9a825",  0.2, 165);
  reg("Pastef (SN)",                "Past_SN",  "#f9a825", -0.2, 165);
  reg("PDCI (CI)",                  "PDCI_CI",  "#009246",  0.3, 255);
  reg("RDR (CI)",                   "RDR_CI",   "#f9a825",  0.3, 255);
  reg("FPI (CI)",                   "FPI_CI",   "#e53935", -0.3, 255);
  reg("RHDP (CI)",                  "RHDP_CI",  "#f9a825",  0.3, 255);
  reg("UDPS (CD)",                  "UDPS_CD",  "#e53935", -0.2, 500);
  reg("PPRD (CD)",                  "PPRD_CD",  "#009246",  0.3, 500);
  reg("MLC (CD)",                   "MLC_CD",   "#003189",  0.2, 500);
  reg("CPDM (CM)",                  "CPDM_CM",  "#009246",  0.3, 180);
  reg("SDF (CM)",                   "SDF_CM",   "#e53935", -0.2, 180);
  reg("RPF (RW)",                   "RPF_RW",   "#003189",  0.3, 80);
  reg("NRM (UG)",                   "NRM_UG",   "#f9a825",  0.4, 529);
  reg("UPC (UG)",                   "UPC_UG",   "#e53935", -0.2, 529);
  reg("FDC (UG)",                   "FDC_UG",   "#003189", -0.2, 529);
  reg("DP (UG)",                    "DP_UG",    "#009246",  0.1, 529);
  reg("NCP (SD)",                   "NCP_SD",   "#009246",  0.4, 450);
  reg("SPLM (SD)",                  "SPLM_SD",  "#e53935", -0.1, 450);
  reg("NUP (SD)",                   "NUP_SD",   "#003189",  0.2, 450);
  reg("ZANU (ZW)",                  "ZANU_ZW",  "#009246",  0.5, 270);
  reg("ZAPU (ZW)",                  "ZAPU_ZW",  "#e53935", -0.2, 270);
  reg("Frelimo (MZ)",               "Frel_MZ",  "#009246", -0.2, 250);
  reg("Renamo (MZ)",                "Ren_MZ",   "#003189",  0.3, 250);
  reg("MPLA (AO)",                  "MPLA_AO",  "#e53935", -0.3, 220);
  reg("UNITA (AO)",                 "UNITA_AO", "#003189",  0.3, 220);
  /* Philippines / Vietnam */
  reg("Liberal Party (PH)",         "LP_PH",    "#f9a825",  0.0, 304);
  reg("Lakas (PH)",                 "Lakas_PH", "#003189",  0.3, 304);
  reg("PDP-Laban (PH)",             "PDP_PH",   "#e53935", -0.2, 304);
  reg("Nacionalista (PH)",          "Nac_PH",   "#003189",  0.3, 304);
  reg("CPV (VN)",                   "CPV_VN",   "#cc0000", -1.0, 498);
  /* Additional Asian parties */
  reg("Awami League (BD)",          "AL_BD",    "#009246", -0.3, 350);
  reg("BNP (BD)",                   "BNP_BD",   "#003189",  0.4, 350);
  reg("Jamaat-e-Islami (BD)",       "JI_BD",    "#009246",  0.8, 350);
  reg("Jatiya (BD)",                "Jat_BD",   "#f9a825",  0.2, 350);
  reg("PPP (PK)",                   "PPP_PK",   "#e53935", -0.3, 342);
  reg("PML-N (PK)",                 "PMLN_PK",  "#009246",  0.3, 342);
  reg("PTI (PK)",                   "PTI_PK",   "#009246",  0.2, 342);
  reg("PML-Q (PK)",                 "PMLQ_PK",  "#009246",  0.3, 342);
  reg("MQM (PK)",                   "MQM_PK",   "#f9a825",  0.0, 342);
  /* USA historical & minor */
  reg("Know-Nothing",               "KnowNoth", "#1c3f6e",  1.5, 0);
  reg("Populist (USA)",             "Pop_USA",  "#009246", -0.8, 0);
  reg("Socialist Party (USA)",      "Soc_USA",  "#cc0000", -1.5, 0);
  reg("American Independent",       "AI_USA",   "#1c3f6e",  2.0, 0);
  reg("Reform Party (USA)",         "Ref_USA",  "#f9a825",  0.5, 0);
  reg("Libertarian (USA)",          "Lib_USA",  "#f9a825",  1.0, 0);

  /* ── PARTY_COUNTRY patches ─────────────────────────────────────── */
  if (G.PARTY_COUNTRY) {
    /* Ukraine */
    G.PARTY_COUNTRY["Servant of the People (UA)"] = "UA";
    G.PARTY_COUNTRY["Party of Regions (UA)"]      = "UA";
    G.PARTY_COUNTRY["Our Ukraine (UA)"]            = "UA";
    G.PARTY_COUNTRY["Batkivshchyna (UA)"]          = "UA";
    G.PARTY_COUNTRY["UDAR (UA)"]                   = "UA";
    G.PARTY_COUNTRY["Opposition Platform (UA)"]    = "UA";
    G.PARTY_COUNTRY["Svoboda (UA)"]                = "UA";
    G.PARTY_COUNTRY["Communist Party (UA)"]        = "UA";
    /* Serbia */
    G.PARTY_COUNTRY["SNS (RS)"]                    = "RS";
    G.PARTY_COUNTRY["SPS (RS)"]                    = "RS";
    G.PARTY_COUNTRY["DS (RS)"]                     = "RS";
    G.PARTY_COUNTRY["DSS (RS)"]                    = "RS";
    G.PARTY_COUNTRY["SRS (RS)"]                    = "RS";
    /* Croatia */
    G.PARTY_COUNTRY["HDZ (HR)"]                    = "HR";
    G.PARTY_COUNTRY["SDP (HR)"]                    = "HR";
    G.PARTY_COUNTRY["MOST (HR)"]                   = "HR";
    G.PARTY_COUNTRY["SDSS (HR)"]                   = "HR";
    G.PARTY_COUNTRY["SKH-SDP (HR)"]                = "HR";
    /* North Macedonia */
    G.PARTY_COUNTRY["VMRO (MK)"]                   = "MK";
    G.PARTY_COUNTRY["SDSM (MK)"]                   = "MK";
    G.PARTY_COUNTRY["DUI (MK)"]                    = "MK";
    /* Bulgaria */
    G.PARTY_COUNTRY["GERB (BG)"]                   = "BG";
    G.PARTY_COUNTRY["BSP (BG)"]                    = "BG";
    G.PARTY_COUNTRY["DPS (BG)"]                    = "BG";
    G.PARTY_COUNTRY["NDSV (BG)"]                   = "BG";
    G.PARTY_COUNTRY["BCP (BG)"]                    = "BG";
    G.PARTY_COUNTRY["PP (BG)"]                     = "BG";
    /* Romania */
    G.PARTY_COUNTRY["PSD (RO)"]                    = "RO";
    G.PARTY_COUNTRY["PNL (RO)"]                    = "RO";
    G.PARTY_COUNTRY["USR (RO)"]                    = "RO";
    G.PARTY_COUNTRY["AUR (RO)"]                    = "RO";
    G.PARTY_COUNTRY["PCR (RO)"]                    = "RO";
    G.PARTY_COUNTRY["PDL (RO)"]                    = "RO";
    /* Baltic states */
    G.PARTY_COUNTRY["Reform Party (EE)"]           = "EE";
    G.PARTY_COUNTRY["Centre Party (EE)"]           = "EE";
    G.PARTY_COUNTRY["EKRE (EE)"]                   = "EE";
    G.PARTY_COUNTRY["Isamaa (EE)"]                 = "EE";
    G.PARTY_COUNTRY["Social Democrats (EE)"]       = "EE";
    G.PARTY_COUNTRY["Tsiviilne (EE)"]              = "EE";
    G.PARTY_COUNTRY["Homeland Union (LT)"]         = "LT";
    G.PARTY_COUNTRY["Social Democrats (LT)"]       = "LT";
    G.PARTY_COUNTRY["LSDP (LT)"]                   = "LT";
    G.PARTY_COUNTRY["LDDP (LT)"]                   = "LT";
    G.PARTY_COUNTRY["DP (LT)"]                     = "LT";
    G.PARTY_COUNTRY["Liberal Movement (LT)"]       = "LT";
    G.PARTY_COUNTRY["New Unity (LV)"]              = "LV";
    G.PARTY_COUNTRY["Harmony (LV)"]                = "LV";
    G.PARTY_COUNTRY["Zatlers (LV)"]                = "LV";
    G.PARTY_COUNTRY["NA (LV)"]                     = "LV";
    G.PARTY_COUNTRY["LPP (LV)"]                    = "LV";
    /* Caucasus */
    G.PARTY_COUNTRY["Georgian Dream (GE)"]         = "GE";
    G.PARTY_COUNTRY["UNM (GE)"]                    = "GE";
    G.PARTY_COUNTRY["Labour (GE)"]                 = "GE";
    G.PARTY_COUNTRY["CUG (GE)"]                    = "GE";
    G.PARTY_COUNTRY["HHK (AM)"]                    = "AM";
    G.PARTY_COUNTRY["Civil Contract (AM)"]         = "AM";
    G.PARTY_COUNTRY["ARF (AM)"]                    = "AM";
    G.PARTY_COUNTRY["HAK (AM)"]                    = "AM";
    G.PARTY_COUNTRY["New Azerbaijan (AZ)"]         = "AZ";
    G.PARTY_COUNTRY["APF (AZ)"]                    = "AZ";
    /* Central Asia */
    G.PARTY_COUNTRY["Nur Otan (KZ)"]               = "KZ";
    G.PARTY_COUNTRY["Amanat (KZ)"]                 = "KZ";
    G.PARTY_COUNTRY["People's Democratic (KG)"]    = "KG";
    G.PARTY_COUNTRY["Ata Meken (KG)"]              = "KG";
    G.PARTY_COUNTRY["LDPU (UZ)"]                   = "UZ";
    G.PARTY_COUNTRY["UzLiDeP (UZ)"]                = "UZ";
    /* Middle East */
    G.PARTY_COUNTRY["Future Movement (LB)"]        = "LB";
    G.PARTY_COUNTRY["Hezbollah (LB)"]              = "LB";
    G.PARTY_COUNTRY["Amal (LB)"]                   = "LB";
    G.PARTY_COUNTRY["LF (LB)"]                     = "LB";
    G.PARTY_COUNTRY["Kataeb (LB)"]                 = "LB";
    G.PARTY_COUNTRY["FPM (LB)"]                    = "LB";
    G.PARTY_COUNTRY["Ba'ath (SY)"]                 = "SY";
    G.PARTY_COUNTRY["Ba'ath (IQ)"]                 = "IQ";
    G.PARTY_COUNTRY["Dawa (IQ)"]                   = "IQ";
    G.PARTY_COUNTRY["KDP (IQ)"]                    = "IQ";
    G.PARTY_COUNTRY["PUK (IQ)"]                    = "IQ";
    G.PARTY_COUNTRY["Sadr (IQ)"]                   = "IQ";
    G.PARTY_COUNTRY["Islamic Republic (IR)"]       = "IR";
    G.PARTY_COUNTRY["Reformists (IR)"]             = "IR";
    G.PARTY_COUNTRY["Rafsanjani (IR)"]             = "IR";
    G.PARTY_COUNTRY["Hashemite (JO)"]              = "JO";
    G.PARTY_COUNTRY["Al Saud (SA)"]                = "SA";
    G.PARTY_COUNTRY["UAE Federal (AE)"]            = "AE";
    G.PARTY_COUNTRY["Hamas (PS)"]                  = "PS";
    G.PARTY_COUNTRY["Fatah (PS)"]                  = "PS";
    G.PARTY_COUNTRY["NDP (EG2)"]                   = "EG";
    G.PARTY_COUNTRY["Freedom & Justice (EG)"]      = "EG";
    G.PARTY_COUNTRY["Al-Nour (EG)"]                = "EG";
    /* North Africa */
    G.PARTY_COUNTRY["Istiqlal (MA)"]               = "MA";
    G.PARTY_COUNTRY["PJD (MA)"]                    = "MA";
    G.PARTY_COUNTRY["PAM (MA)"]                    = "MA";
    G.PARTY_COUNTRY["USFP (MA)"]                   = "MA";
    G.PARTY_COUNTRY["Istiqlal bloc (MA)"]          = "MA";
    G.PARTY_COUNTRY["FLN (DZ)"]                    = "DZ";
    G.PARTY_COUNTRY["RND (DZ)"]                    = "DZ";
    G.PARTY_COUNTRY["FFS (DZ)"]                    = "DZ";
    G.PARTY_COUNTRY["MSP (DZ)"]                    = "DZ";
    G.PARTY_COUNTRY["Ennahda (TN)"]                = "TN";
    G.PARTY_COUNTRY["Nidaa Tounes (TN)"]           = "TN";
    G.PARTY_COUNTRY["RCD (TN)"]                    = "TN";
    G.PARTY_COUNTRY["Aish Tounsi (TN)"]            = "TN";
    /* Sub-Saharan Africa */
    G.PARTY_COUNTRY["PS (SN)"]                     = "SN";
    G.PARTY_COUNTRY["PDS (SN)"]                    = "SN";
    G.PARTY_COUNTRY["APR (SN)"]                    = "SN";
    G.PARTY_COUNTRY["Pastef (SN)"]                 = "SN";
    G.PARTY_COUNTRY["PDCI (CI)"]                   = "CI";
    G.PARTY_COUNTRY["RDR (CI)"]                    = "CI";
    G.PARTY_COUNTRY["FPI (CI)"]                    = "CI";
    G.PARTY_COUNTRY["RHDP (CI)"]                   = "CI";
    G.PARTY_COUNTRY["UDPS (CD)"]                   = "CD";
    G.PARTY_COUNTRY["PPRD (CD)"]                   = "CD";
    G.PARTY_COUNTRY["MLC (CD)"]                    = "CD";
    G.PARTY_COUNTRY["CPDM (CM)"]                   = "CM";
    G.PARTY_COUNTRY["SDF (CM)"]                    = "CM";
    G.PARTY_COUNTRY["RPF (RW)"]                    = "RW";
    G.PARTY_COUNTRY["NRM (UG)"]                    = "UG";
    G.PARTY_COUNTRY["UPC (UG)"]                    = "UG";
    G.PARTY_COUNTRY["FDC (UG)"]                    = "UG";
    G.PARTY_COUNTRY["DP (UG)"]                     = "UG";
    G.PARTY_COUNTRY["NCP (SD)"]                    = "SD";
    G.PARTY_COUNTRY["SPLM (SD)"]                   = "SD";
    G.PARTY_COUNTRY["NUP (SD)"]                    = "SD";
    G.PARTY_COUNTRY["ZANU (ZW)"]                   = "ZW";
    G.PARTY_COUNTRY["ZAPU (ZW)"]                   = "ZW";
    G.PARTY_COUNTRY["Frelimo (MZ)"]                = "MZ";
    G.PARTY_COUNTRY["Renamo (MZ)"]                 = "MZ";
    G.PARTY_COUNTRY["MPLA (AO)"]                   = "AO";
    G.PARTY_COUNTRY["UNITA (AO)"]                  = "AO";
    /* Philippines / Vietnam */
    G.PARTY_COUNTRY["Liberal Party (PH)"]          = "PH";
    G.PARTY_COUNTRY["Lakas (PH)"]                  = "PH";
    G.PARTY_COUNTRY["PDP-Laban (PH)"]              = "PH";
    G.PARTY_COUNTRY["Nacionalista (PH)"]           = "PH";
    G.PARTY_COUNTRY["CPV (VN)"]                    = "VN";
    /* Bangladesh */
    G.PARTY_COUNTRY["Awami League (BD)"]           = "BD";
    G.PARTY_COUNTRY["BNP (BD)"]                    = "BD";
    G.PARTY_COUNTRY["Jamaat-e-Islami (BD)"]        = "BD";
    G.PARTY_COUNTRY["Jatiya (BD)"]                 = "BD";
    /* Pakistan */
    G.PARTY_COUNTRY["PPP (PK)"]                    = "PK";
    G.PARTY_COUNTRY["PML-N (PK)"]                  = "PK";
    G.PARTY_COUNTRY["PTI (PK)"]                    = "PK";
    G.PARTY_COUNTRY["PML-Q (PK)"]                  = "PK";
    G.PARTY_COUNTRY["MQM (PK)"]                    = "PK";
    /* USA historical */
    G.PARTY_COUNTRY["Know-Nothing"]                = "US";
    G.PARTY_COUNTRY["Populist (USA)"]              = "US";
    G.PARTY_COUNTRY["Socialist Party (USA)"]       = "US";
    G.PARTY_COUNTRY["American Independent"]        = "US";
    G.PARTY_COUNTRY["Reform Party (USA)"]          = "US";
    G.PARTY_COUNTRY["Libertarian (USA)"]           = "US";
  }


  /* ═══════════════════════════════════════════════════════════════
     USA — Republican Party deep dive
     ═══════════════════════════════════════════════════════════════ */
  I("Abraham Lincoln",        "Republican","e1",["pm","leader","justice","chancellor"],    [78,68,80,75,72], "Republican President 1861–65; preserved Union; abolished slavery");
  I("Ulysses S. Grant",       "Republican","e1",["pm","defence","leader"],                [60,65,55,55,52], "Republican President 1869–77; Civil War general");
  I("Rutherford B. Hayes",    "Republican","e1",["pm","justice","leader"],                [55,60,52,55,50], "Republican President 1877–81; ended Reconstruction");
  I("James A. Garfield",      "Republican","e1",["pm","leader","education"],              [60,58,60,55,54], "Republican President 1881; assassinated after 4 months");
  I("Chester A. Arthur",      "Republican","e1",["pm","leader","justice"],                [55,62,52,56,52], "Republican President 1881–85; civil service reformer");
  I("Benjamin Harrison",      "Republican","e1",["pm","leader","foreign"],                [52,60,50,52,50], "Republican President 1889–93; tariff protectionist");
  I("William McKinley",       "Republican","e2",["pm","chancellor","trade","leader"],     [62,62,58,60,58], "Republican President 1897–1901; Spanish-American War; assassinated");
  I("William Howard Taft",    "Republican","e2",["pm","justice","leader"],                [55,65,50,58,52], "Republican President 1909–13; later Chief Justice");
  I("Warren G. Harding",      "Republican","e2",["pm","leader"],                          [50,55,55,42,50], "Republican President 1921–23; Teapot Dome scandal");
  I("Calvin Coolidge",        "Republican","e2",["pm","chancellor","leader"],             [52,60,48,58,54], "Republican President 1923–29; Roaring Twenties prosperity");
  I("Herbert Hoover",         "Republican","e3",["pm","chancellor","trade","leader"],     [55,65,48,52,50], "Republican President 1929–33; Great Depression");
  I("Dwight D. Eisenhower",   "Republican","e4",["pm","defence","foreign","leader"],      [72,75,65,72,68], "Republican President 1953–61; NATO commander; Interstate Highways");
  I("Barry Goldwater",        "Republican","e4",["pm","leader","defence"],                [58,62,62,55,52], "Republican Senate candidate 1964; conservative revolution's godfather");
  I("Gerald Ford",            "Republican","e5",["pm","leader","justice"],                [58,62,52,55,55], "Republican President 1974–77; Nixon pardon; Helsinki Accords");
  I("George H. W. Bush",      "Republican","e6",["pm","foreign","defence","leader"],      [62,75,58,68,62], "Republican President 1989–93; Gulf War; German reunification");
  I("Jack Kemp",              "Republican","e6",["pm","chancellor","leader"],             [62,62,65,55,58], "Republican supply-side economics champion; VP candidate 1996");
  I("Pat Buchanan",           "Republican","e6",["pm","leader","foreign"],                [55,60,65,50,52], "Republican populist-nationalist; culture war pioneer");
  I("Bob Dole",               "Republican","e6",["pm","leader","chancellor"],             [58,72,55,60,62], "Republican Senate Majority Leader; 1996 presidential candidate");
  I("Newt Gingrich",          "Republican","e6",["pm","leader","education"],              [58,65,62,55,62], "Republican Speaker; Contract with America; Clinton impeachment");
  I("John McCain",            "Republican","e7",["pm","defence","foreign","leader"],      [65,72,62,62,58], "Republican Senator; 2008 presidential candidate; Vietnam POW");
  I("Mitt Romney",            "Republican","e7",["pm","chancellor","leader","business"],  [60,65,58,60,58], "Republican 2012 presidential candidate; Mormon governor");
  I("Paul Ryan",              "Republican","e7",["chancellor","pm","leader"],             [56,58,55,56,55], "Republican Speaker; budget hawk; 2012 VP candidate");
  I("Marco Rubio",            "Republican","e7",["pm","leader","foreign"],                [60,55,62,55,58], "Republican Senator; 2016 presidential candidate");
  I("Ted Cruz",               "Republican","e7",["pm","leader","justice"],                [50,58,62,50,52], "Republican Senator; Tea Party conservative; 2016 candidate");
  I("Rand Paul",              "Republican","e7",["pm","leader","health","justice"],       [55,55,58,52,50], "Republican libertarian Senator; Ron Paul's son");
  I("Ron DeSantis",           "Republican","e7",["pm","leader","education"],              [52,55,52,52,52], "Republican Florida Governor; 2024 presidential hopeful");
  I("Nikki Haley",            "Republican","e7",["pm","foreign","leader"],                [60,58,58,58,55], "Republican UN Ambassador; 2024 presidential candidate");
  I("Chris Christie",         "Republican","e7",["pm","home","leader"],                   [52,58,60,52,52], "Republican New Jersey Governor; Trump opponent 2024");
  I("Mike Pence",             "Republican","e7",["pm","deputy","home","leader"],          [52,60,50,52,55], "Republican Vice President; evangelical conservative");
  I("Tom Cotton",             "Republican","e7",["pm","defence","foreign"],               [50,52,52,50,50], "Republican hawkish Senator; 2028 presidential hopeful");
  I("Josh Hawley",            "Republican","e7",["pm","justice","leader"],                [52,50,55,48,50], "Republican nationalist Senator; January 6th salute");
  I("Kevin McCarthy",         "Republican","e7",["pm","leader"],                          [48,55,48,48,52], "Republican Speaker ousted in historic no-confidence 2023");
  I("Mike Johnson",           "Republican","e7",["pm","leader","justice"],                [50,52,50,50,50], "Republican Speaker from 2023; election denier");
  I("Mitch McConnell",        "Republican","e7",["pm","leader","justice"],                [42,75,40,65,70], "Republican Senate Majority/Minority Leader; Supreme Court gambit");
  I("Rick Perry",             "Republican","e7",["pm","leader","energy"],                 [52,58,48,50,52], "Republican Texas Governor; three-term; 2012 candidate");
  I("Scott Walker",           "Republican","e7",["pm","leader","work"],                   [50,55,48,50,52], "Republican Wisconsin Governor; union buster; 2016 candidate");
  I("John Kasich",            "Republican","e7",["pm","chancellor","health","leader"],    [58,62,55,58,55], "Republican Ohio Governor; moderate 2016 candidate");
  I("Jeb Bush",               "Republican","e7",["pm","leader","education"],              [52,62,48,52,55], "Republican Florida Governor; brother of W.; 2016 candidate");
  I("Chris Sununu",           "Republican","e7",["pm","leader"],                          [56,52,54,52,52], "Republican New Hampshire Governor; moderate");
  I("Larry Hogan",            "Republican","e7",["pm","leader"],                          [58,56,54,55,52], "Republican Maryland Governor; Trump critic");
  I("Liz Cheney",             "Republican","e7",["pm","defence","leader","justice"],      [55,58,58,55,50], "Republican Wyoming Rep; January 6th committee chair; anti-Trump martyr");
  I("Adam Kinzinger",         "Republican","e7",["pm","defence","leader"],                [52,52,54,50,48], "Republican Air Force veteran; January 6th committee");
  I("Condoleezza Rice",       "Republican","e7",["foreign","pm","education","leader"],    [62,68,62,65,60], "Republican National Security Adviser; Secretary of State");
  I("Dick Cheney",            "Republican","e6",["pm","defence","foreign","deputy"],      [45,72,45,62,58], "Republican Vice President; Iraq War architect; Halliburton");
  I("Donald Rumsfeld",        "Republican","e6",["pm","defence","leader"],                [48,70,52,55,55], "Republican Defence Secretary; Iraq War; 'known unknowns'");
  I("Colin Powell",           "Republican","e7",["pm","defence","foreign","leader"],      [68,72,65,68,62], "Republican Secretary of State; Gulf War commander; UN Iraq speech");
  I("John Boehner",           "Republican","e7",["pm","leader","chancellor"],             [52,65,50,52,58], "Republican Speaker; Tea Party struggles; wept often");
  I("Eric Cantor",            "Republican","e7",["pm","leader"],                          [50,55,48,50,52], "Republican Majority Leader; lost primary to David Brat");
  I("Paul Wolfowitz",         "Republican","e7",["pm","defence","foreign"],               [45,65,48,55,50], "Republican neocon; Iraq War architect; World Bank");
  I("James Baker",            "Republican","e5",["pm","foreign","chancellor","leader"],   [65,72,60,68,62], "Republican Secretary of State; German reunification; Baker Plan");

  /* ═══════════════════════════════════════════════════════════════
     USA — Democratic Party deep dive
     ═══════════════════════════════════════════════════════════════ */
  I("Andrew Jackson",         "Democrat","e0",["pm","defence","leader"],                  [65,62,65,58,62], "Democrat President 1829–37; Indian Removal; populist titan");
  I("Martin Van Buren",       "Democrat","e0",["pm","leader","foreign"],                  [55,65,55,58,60], "Democrat President 1837–41; depression president");
  I("James K. Polk",          "Democrat","e1",["pm","leader","foreign","trade"],          [60,62,55,62,60], "Democrat President 1845–49; manifest destiny; Mexican War");
  I("Franklin Pierce",        "Democrat","e1",["pm","leader"],                            [50,55,52,48,50], "Democrat President 1853–57; Kansas-Nebraska Act");
  I("James Buchanan",         "Democrat","e1",["pm","foreign","leader"],                  [45,65,48,45,48], "Democrat President 1857–61; dithered before Civil War");
  I("Grover Cleveland",       "Democrat","e1",["pm","justice","leader","chancellor"],     [60,65,55,60,58], "Democrat President 1885–89 and 1893–97; only non-consecutive terms");
  I("William Jennings Bryan", "Democrat","e2",["pm","leader","agriculture"],              [65,58,75,55,60], "Democrat three-time presidential candidate; free silver orator");
  I("Woodrow Wilson",         "Democrat","e2",["pm","foreign","leader","education"],      [65,68,68,65,62], "Democrat President 1913–21; WWI; League of Nations; stroked out");
  I("Al Smith",               "Democrat","e2",["pm","leader","chancellor"],               [60,60,62,55,58], "Democrat 1928 presidential candidate; first Catholic nominee");
  I("Harry Truman",           "Democrat","e3",["pm","defence","foreign","leader"],        [65,65,62,68,62], "Democrat President 1945–53; Hiroshima; Marshall Plan; Korean War");
  I("Adlai Stevenson",        "Democrat","e4",["pm","leader","foreign"],                  [62,62,68,60,55], "Democrat 1952 and 1956 presidential candidate; wit and gravitas");
  I("Lyndon B. Johnson",      "Democrat","e4",["pm","leader","health","education"],       [65,72,62,68,72], "Democrat President 1963–69; Great Society; Vietnam quagmire");
  I("Hubert Humphrey",        "Democrat","e4",["pm","deputy","leader","health"],          [65,65,68,60,62], "Democrat Vice President; 1968 presidential candidate; Happy Warrior");
  I("George McGovern",        "Democrat","e5",["pm","leader","defence","agriculture"],    [60,62,65,55,55], "Democrat 1972 presidential candidate; 49-state landslide defeat");
  I("Walter Mondale",         "Democrat","e5",["pm","deputy","leader","justice"],         [58,65,58,60,58], "Democrat Vice President; 1984 presidential candidate");
  I("Jesse Jackson",          "Democrat","e5",["pm","leader","foreign"],                  [65,55,80,50,55], "Democrat 1984 and 1988 primary candidate; civil rights leader");
  I("Michael Dukakis",        "Democrat","e6",["pm","leader","health"],                   [52,60,50,52,52], "Democrat 1988 presidential candidate; Willie Horton ad victim");
  I("Dick Gephardt",          "Democrat","e6",["pm","leader","trade","chancellor"],       [55,62,55,55,58], "Democrat House Majority Leader; trade hawk; 2004 candidate");
  I("Tom Daschle",            "Democrat","e7",["pm","leader","health","chancellor"],      [55,62,52,55,58], "Democrat Senate Majority Leader; healthcare champion");
  I("John Kerry",             "Democrat","e7",["pm","foreign","defence","leader"],        [58,68,58,60,55], "Democrat 2004 presidential candidate; Secretary of State; Swift Boated");
  I("John Edwards",           "Democrat","e7",["pm","leader","work","justice"],           [60,55,65,50,52], "Democrat 2004 VP; 2008 candidate; two Americas rhetoric; scandal");
  I("Howard Dean",            "Democrat","e7",["pm","leader","health"],                   [58,55,62,52,55], "Democrat 2004 primary frontrunner; scream candidate; DNC Chair");
  I("Al Gore",                "Democrat","e7",["pm","deputy","environment","leader"],     [62,68,60,60,58], "Democrat Vice President; 2000 presidential candidate; climate champion");
  I("Joseph Biden",           "Democrat","e7",["pm","foreign","leader"],                  [62,78,58,58,60], "Democrat President 2021–25; Senator since 1973; Obama VP");
  I("Elizabeth Warren",       "Democrat","e7",["pm","chancellor","leader","justice"],     [62,60,68,58,58], "Democrat progressive Senator; 2020 presidential candidate");
  I("Bernie Sanders",         "Democrat","e7",["pm","work","health","leader"],            [65,68,72,55,55], "Independent/Democrat Vermont Senator; two-time primary challenger");
  I("Pete Buttigieg",         "Democrat","e7",["pm","leader","transport"],                [62,52,65,55,55], "Democrat Transportation Secretary; 2020 presidential candidate");
  I("Amy Klobuchar",          "Democrat","e7",["pm","justice","leader","agriculture"],   [58,60,58,56,55], "Democrat Senator; 2020 presidential candidate; Minnesota moderate");
  I("Tulsi Gabbard",          "Democrat","e7",["pm","defence","leader","foreign"],        [56,52,58,50,48], "Democrat House Rep turned MAGA-aligned; contrarian veteran");
  I("Andrew Yang",            "Democrat","e7",["pm","business","leader"],                 [58,48,62,50,52], "Democrat UBI candidate; Forward party founder");
  I("Beto O'Rourke",          "Democrat","e7",["pm","leader","environment"],              [60,50,65,50,52], "Democrat Texas Senate and Governor candidate; charismatic loser");
  I("Cory Booker",            "Democrat","e7",["pm","justice","leader","home"],           [60,55,65,52,55], "Democrat New Jersey Senator; 2020 presidential candidate");
  I("Stacey Abrams",          "Democrat","e7",["pm","leader","justice"],                  [62,52,65,52,55], "Democrat Georgia Governor candidate; voting rights organiser");
  I("Gavin Newsom",           "Democrat","e7",["pm","leader","health","environment"],     [62,58,62,58,58], "Democrat California Governor; 2028 presidential frontrunner");
  I("Gretchen Whitmer",       "Democrat","e7",["pm","leader","health"],                   [60,56,58,55,55], "Democrat Michigan Governor; kidnapping plot target");
  I("Wes Moore",              "Democrat","e7",["pm","leader","work"],                     [60,48,62,52,52], "Democrat Maryland Governor; military veteran; youngest Black governor");
  I("J.B. Pritzker",          "Democrat","e7",["pm","leader","chancellor"],               [56,55,55,55,55], "Democrat Illinois Governor; Hyatt billionaire; progressive");
  I("Jay Inslee",             "Democrat","e7",["pm","environment","leader"],              [56,58,56,54,52], "Democrat Washington Governor; climate single-issue 2020 candidate");
  I("Tom Vilsack",            "Democrat","e7",["pm","agriculture","leader"],              [52,62,50,52,52], "Democrat Agriculture Secretary twice; Iowa Governor");
  I("Jennifer Granholm",      "Democrat","e7",["pm","energy","leader","business"],        [58,58,58,55,52], "Democrat Energy Secretary; Michigan Governor; Canadian-born");
  I("Eric Adams",             "Democrat","e7",["pm","home","health","leader"],            [52,52,52,48,48], "Democrat New York City Mayor; vegan cop; corruption indictment");
  I("Raphael Warnock",        "Democrat","e7",["pm","leader","justice"],                  [62,52,68,52,55], "Democrat Georgia Senator; Baptist pastor; runoff specialist");
  I("Jon Ossoff",             "Democrat","e7",["pm","leader","justice"],                  [58,48,60,50,52], "Democrat Georgia Senator; youngest Democratic Senator since Biden");
  I("Markwayne Mullin",       "Republican","e7",["pm","leader","health"],                 [48,50,48,46,48], "Republican Oklahoma Senator; challenged to arm-wrestle in hearing");
  I("Doug Jones",             "Democrat","e7",["pm","justice","leader"],                  [56,58,55,55,52], "Democrat Alabama Senator; prosecuted KKK bombers; lost to Tommy Tuberville");
  I("Claire McCaskill",       "Democrat","e7",["pm","home","leader"],                     [56,60,58,54,55], "Democrat Missouri Senator; red-state survivor");
  I("Jon Tester",             "Democrat","e7",["pm","agriculture","health","leader"],     [56,60,52,52,52], "Democrat Montana farmer-Senator; lost 2024");
  I("Joe Manchin",            "Democrat","e7",["pm","energy","leader","chancellor"],      [52,62,52,50,50], "Democrat West Virginia Senator; climate bill killer");
  I("Kyrsten Sinema",         "Democrat","e7",["pm","leader"],                            [52,55,52,50,50], "Democrat then Independent Arizona Senator; bipartisan gadfly");
  I("Mark Warner",            "Democrat","e7",["pm","business","chancellor","leader"],    [56,62,55,55,55], "Democrat Virginia Senator; tech entrepreneur");
  I("Chris Murphy",           "Democrat","e7",["pm","foreign","leader","justice"],        [58,55,60,55,52], "Democrat Connecticut Senator; gun control champion");
  I("Bob Menendez",           "Democrat","e7",["pm","foreign","leader"],                  [45,62,48,45,45], "Democrat Senator; gold bars bribery scandal; convicted");
  I("Chuck Schumer",          "Democrat","e7",["pm","leader","chancellor"],               [52,72,52,55,65], "Democrat Senate Majority Leader; New York dealmaker");
  I("Nancy Pelosi",           "Democrat","e7",["pm","leader","chancellor"],               [62,75,60,65,72], "Democrat Speaker twice; ACA passed; impeachments managed");
  I("Hakeem Jeffries",        "Democrat","e7",["pm","leader","justice"],                  [60,55,62,55,60], "Democrat House Minority Leader; Pelosi's successor");
  I("Jim Clyburn",            "Democrat","e7",["pm","leader","work"],                     [58,70,58,55,60], "Democrat House Whip; made Biden's 2020 campaign with South Carolina endorsement");
  I("Adam Schiff",            "Democrat","e7",["pm","justice","leader","foreign"],        [58,58,60,55,55], "Democrat California Senator; led Trump impeachments; intelligence");
  I("Jerry Nadler",           "Democrat","e7",["pm","justice","leader"],                  [50,65,50,50,52], "Democrat House Judiciary Chair; both impeachments");
  I("Alexandria Ocasio-Cortez","Democrat","e7",["pm","leader","environment","work"],      [68,48,72,50,55], "Democrat progressive Rep; AOC; Green New Deal; bartender to Congress");
  I("Ilhan Omar",             "Democrat","e7",["pm","foreign","leader"],                  [58,50,62,48,50], "Democrat Somali-American Rep; Squad member; controversial");
  I("Rashida Tlaib",          "Democrat","e7",["pm","justice","leader"],                  [56,48,58,48,50], "Democrat Palestinian-American Rep; impeach the MF-er");
  I("Ayanna Pressley",        "Democrat","e7",["pm","justice","leader","health"],         [58,50,60,50,52], "Democrat Massachusetts Rep; Squad member; alopecia disclosure");
  I("Ro Khanna",              "Democrat","e7",["pm","trade","defence","leader"],          [60,52,62,54,52], "Democrat Silicon Valley Rep; progressive trade hawk");
  I("Katie Porter",           "Democrat","e7",["pm","chancellor","justice","leader"],     [60,52,65,52,52], "Democrat California Rep; whiteboard queen; consumer champion");
  I("Pramila Jayapal",        "Democrat","e7",["pm","health","leader","foreign"],         [58,55,62,52,52], "Democrat Progressive Caucus Chair; Medicare for All leader");
  I("Tim Ryan",               "Democrat","e7",["pm","work","leader"],                     [58,55,58,52,52], "Democrat Ohio Senate candidate; Rust Belt Democrat");
  I("Conor Lamb",             "Democrat","e7",["pm","leader","health"],                   [55,50,54,50,50], "Democrat Pennsylvania moderate; military veteran");
  I("Max Baucus",             "Democrat","e6",["pm","health","chancellor","leader"],      [52,68,48,55,55], "Democrat Senate Finance Chair; ACA architect; Ambassador to China");
  I("Ted Kennedy",            "Democrat","e5",["pm","health","leader","education"],       [65,72,68,60,62], "Democrat Senator Lion of Senate; healthcare champion; Chappaquiddick");
  I("George Mitchell",        "Democrat","e6",["pm","foreign","leader","justice"],        [60,68,60,62,60], "Democrat Senate Majority Leader; Northern Ireland peace process");
  I("Bob Kerrey",             "Democrat","e6",["pm","leader","defence","health"],         [58,60,60,55,52], "Democrat Nebraska Senator; Vietnam Medal of Honor; presidential candidate");
  I("Gary Hart",              "Democrat","e5",["pm","leader","defence"],                  [60,58,62,55,52], "Democrat 1988 frontrunner; Donna Rice Monkey Business scandal");
  I("Paul Simon",             "Democrat","e5",["pm","education","leader","chancellor"],   [56,60,58,55,52], "Democrat Illinois Senator; bowtie and bow-tie politics");
  I("Morris Udall",           "Democrat","e5",["pm","environment","leader"],              [58,60,62,55,52], "Democrat 1976 presidential candidate; environmentalist");
  I("Sargent Shriver",        "Democrat","e4",["pm","deputy","leader","work"],            [60,60,60,58,55], "Democrat 1972 VP candidate; OEO director; Peace Corps founder");
  I("Eugene McCarthy",        "Democrat","e4",["pm","leader","foreign"],                  [60,60,65,55,52], "Democrat 1968 anti-war primary challenger; quixotic poet-senator");
  I("Robert F. Kennedy",      "Democrat","e4",["pm","leader","justice","foreign"],        [72,60,72,60,60], "Democrat Senator; 1968 presidential candidate; assassinated");
  I("Edmund Muskie",          "Democrat","e4",["pm","foreign","leader","environment"],    [58,65,55,60,55], "Democrat 1972 frontrunner; cried in snowstorm; Secretary of State");
  I("Frank Church",           "Democrat","e5",["pm","foreign","leader","justice"],        [58,62,62,55,52], "Democrat Idaho Senator; Church Committee; CIA oversight");
  I("Birch Bayh",             "Democrat","e5",["pm","justice","leader"],                  [56,60,58,54,52], "Democrat 1976 presidential candidate; constitutional amendments");

  /* ═══════════════════════════════════════════════════════════════
     USA — historical (pre-Civil War & third parties)
     ═══════════════════════════════════════════════════════════════ */
  I("John Adams",             "Federalist","e0",["pm","foreign","justice","leader"],      [58,65,55,62,55], "Federalist President 1797–1801; XYZ Affair; Alien & Sedition Acts");
  I("Alexander Hamilton",     "Federalist","e0",["pm","chancellor","leader","defence"],   [65,60,68,65,60], "Federalist; first Treasury Secretary; national bank; shot by Burr");
  I("John Jay",               "Federalist","e0",["pm","justice","foreign","leader"],      [58,62,55,60,55], "Federalist; Chief Justice; Jay Treaty; co-authored Federalist Papers");
  I("Timothy Pickering",      "Federalist","e0",["pm","foreign","leader"],                [48,55,45,50,48], "Federalist Secretary of State; Essex Junto leader");
  I("Fisher Ames",            "Federalist","e0",["pm","leader"],                          [52,52,58,48,50], "Federalist Massachusetts Rep; orator; Jay Treaty defender");
  I("Henry Clay",             "Whig(USA)","e0",["pm","foreign","chancellor","leader"],    [68,68,72,65,65], "Whig Great Compromiser; Missouri Compromise; American System");
  I("Daniel Webster",         "Whig(USA)","e0",["pm","justice","foreign","leader"],       [65,65,75,62,60], "Whig Massachusetts Senator; orator; Union defender");
  I("John C. Calhoun",        "Democrat","e0",["pm","leader","justice"],                  [55,65,65,55,58], "States' rights theorist; nullification; South Carolina"); 
  I("Millard Fillmore",       "Whig(USA)","e1",["pm","leader","trade"],                   [50,58,48,52,50], "Whig President 1850–53; Compromise of 1850; Commodore Perry");
  I("Zachary Taylor",         "Whig(USA)","e1",["pm","defence","leader"],                 [55,60,48,52,50], "Whig President 1849–50; Mexican War hero; died in office");
  I("John Tyler",             "Whig(USA)","e0",["pm","leader","foreign"],                 [48,60,48,50,48], "Whig then independent President 1841–45; Texas annexation");
  I("William Henry Harrison", "Whig(USA)","e0",["pm","defence","leader"],                 [55,60,50,50,50], "Whig President died 31 days; Tippecanoe; Battle of Fallen Timbers");
  I("Stephen Douglas",        "Democrat","e1",["pm","leader","chancellor"],               [62,60,65,58,60], "Democrat Senate giant; popular sovereignty; Lincoln's nemesis");
  I("William Seward",         "Republican","e1",["pm","foreign","leader"],                [62,65,62,62,60], "Republican Secretary of State; Alaska purchase; Seward's Folly");
  I("Thaddeus Stevens",       "Republican","e1",["pm","justice","leader","education"],    [60,62,65,58,55], "Republican Radical Rep; Reconstruction champion; land redistribution");
  I("Charles Sumner",         "Republican","e1",["pm","justice","foreign","leader"],      [62,62,68,58,55], "Republican Massachusetts Senator; caned on Senate floor; abolitionist");
  I("James G. Blaine",        "Republican","e1",["pm","foreign","leader"],                [58,62,58,55,58], "Republican Plumed Knight; 1884 presidential candidate; Rum Romanism Rebellion");
  I("Roscoe Conkling",        "Republican","e1",["pm","leader"],                          [52,60,55,50,55], "Republican Stalwart boss; patronage king; resigned Senate");
  I("Thomas Reed",            "Republican","e1",["pm","leader"],                          [55,65,58,55,58], "Republican Speaker 'Czar Reed'; reformed House rules");
  I("Nelson Aldrich",         "Republican","e2",["pm","chancellor","leader"],             [50,65,48,55,58], "Republican Senate Finance boss; Federal Reserve architect");
  I("William Borah",          "Republican","e2",["pm","foreign","justice","leader"],      [60,65,65,55,55], "Republican isolationist Lion of Idaho; League of Nations killer");
  I("Robert La Follette Sr.", "Republican","e2",["pm","leader","work","chancellor"],      [65,62,70,58,58], "Republican Progressive Wisconsin Senator; 1924 presidential candidate");
  I("Robert La Follette Jr.", "Republican","e3",["pm","leader","chancellor"],             [58,60,62,55,52], "Progressive Wisconsin Senator; McCarthy victim");
  I("Hiram Johnson",          "Republican","e2",["pm","foreign","leader"],                [60,60,65,55,55], "Republican California Governor; anti-League isolationist VP candidate");
  I("George Norris",          "Republican","e2",["pm","environment","leader","energy"],   [60,65,62,58,55], "Republican Nebraska Senator; TVA advocate; conscientious objector");
  I("Hugo Black",             "Democrat","e3",["pm","justice","leader"],                  [60,65,62,60,55], "Democrat Alabama Senator; Supreme Court Justice; ACLU defender");
  I("Huey Long",              "Democrat","e3",["pm","leader","chancellor"],               [68,58,72,52,62], "Democrat Louisiana Kingfish; Share the Wealth; assassinated");
  I("William Randolph Hearst","Democrat","e2",["pm","leader","trade"],                    [55,55,58,48,52], "Democrat newspaper magnate; yellow journalism; Citizen Kane inspiration");
  I("Fiorello La Guardia",    "Republican","e3",["pm","leader","home","justice"],         [68,62,70,62,60], "Republican New York City Mayor; Little Flower; anticorruption champion");
  I("Harold Ickes",           "Democrat","e3",["pm","environment","leader","home"],       [55,65,52,60,55], "Democrat Interior Secretary; PWA; New Deal enforcer");
  I("Henry Wallace",          "Democrat","e4",["pm","deputy","agriculture","leader"],     [58,60,58,55,52], "Democrat Vice President; Progressive Party 1948; New Deal leftist");
  I("Strom Thurmond",         "Democrat","e4",["pm","leader","home","justice"],           [50,72,52,48,52], "Dixiecrat then Republican; segregationist; 1948 presidential candidate; longest serving Senator");
  I("George Wallace",         "Democrat","e4",["pm","leader","home"],                     [55,58,62,48,52], "Democrat Alabama Governor; segregation now segregation forever; shot 1972");
  I("Eugene Debs",            "Socialist Party (USA)","e2",["pm","work","leader"],        [65,55,75,52,55], "Socialist Labor organiser; five-time presidential candidate from prison");
  I("Norman Thomas",          "Socialist Party (USA)","e3",["pm","leader","work"],        [60,58,68,52,55], "Socialist Party six-time presidential candidate; pacifist preacher");
  I("Henry Ford",             "American Independent","e2",["pm","trade","business"],      [50,55,48,45,48], "Industrial titan; antisemite; Michigan Senate ambition");
  I("George Corley Wallace",  "American Independent","e5",["pm","leader","home"],         [52,55,58,45,50], "American Independent Party 1968; 46 Electoral votes; segregationist");
  I("Ross Perot",             "Reform Party (USA)","e6",["pm","chancellor","business","leader"],[62,55,65,55,52], "Reform Party billionaire; 19% 1992; giant sucking sound; NAFTA opponent");
  I("Ralph Nader",            "Populist (USA)","e6",["pm","leader","environment","justice"],[60,60,65,55,52], "Green/Populist consumer advocate; spoiler 2000; Unsafe at Any Speed");
  I("Millard Fillmore 2nd",   "Know-Nothing","e1",["pm","leader"],                        [48,55,45,48,48], "American Party 1856 presidential candidate; anti-immigrant nativist");

  /* ═══════════════════════════════════════════════════════════════
     UKRAINE
     ═══════════════════════════════════════════════════════════════ */
  I("Volodymyr Zelensky",     "Servant of the People (UA)","e7",["pm","leader","foreign","defence"],[72,50,75,60,62], "Servant president; comedian to wartime leader; Russia's invasion 2022");
  I("Volodymyr Groysman",     "Servant of the People (UA)","e7",["pm","chancellor","leader"],       [52,58,50,52,52], "PM 2016–19; Zelensky predecessor; construction mayor");
  I("Denys Shmyhal",          "Servant of the People (UA)","e7",["pm","energy","chancellor"],       [50,52,45,50,50], "PM from 2020; wartime PM; energy sector background");
  I("Viktor Yanukovych",      "Party of Regions (UA)","e7",["pm","leader","foreign"],              [45,60,45,45,48], "PR PM twice; President fled to Russia 2014 after Maidan revolution");
  I("Mykola Azarov",          "Party of Regions (UA)","e7",["pm","chancellor","leader"],           [45,60,40,45,45], "PR PM 2010–14; pro-Russian austerity; fled to Russia");
  I("Viktor Yushchenko",      "Our Ukraine (UA)","e7",["pm","chancellor","foreign","leader"],       [58,62,55,58,52], "Our Ukraine President 2005–10; Orange Revolution; dioxin poisoning");
  I("Arseniy Yatsenyuk",      "Batkivshchyna (UA)","e7",["pm","chancellor","leader","foreign"],    [55,58,52,55,52], "Batkivshchyna PM 2014–16; post-Maidan reformer; 'Yats' per Nuland");
  I("Yulia Tymoshenko",       "Batkivshchyna (UA)","e7",["pm","energy","chancellor","leader"],     [65,60,68,55,60], "Batkivshchyna PM twice; gas princess; imprisoned by Yanukovych");
  I("Petro Poroshenko",       "Our Ukraine (UA)","e7",["pm","chancellor","foreign","leader"],      [58,62,55,58,58], "President 2014–19; chocolate oligarch; Minsk Accords; army builder");
  I("Vitali Klitschko",       "UDAR (UA)","e7",["pm","leader","health"],                           [60,50,58,50,52], "UDAR boxing champion; Kyiv Mayor; 2014 Maidan leader");
  I("Oleksandr Turchynov",    "Batkivshchyna (UA)","e7",["pm","defence","leader"],                 [50,60,48,52,50], "Acting President 2014; Baptist pastor; anti-terror operation");
  I("Andriy Parubiy",         "Our Ukraine (UA)","e7",["pm","defence","leader"],                   [50,58,48,50,50], "Rada Speaker; Maidan self-defence commander; nationalist roots");
  I("Serhiy Taruta",          "Opposition Platform (UA)","e7",["pm","trade","business"],           [48,55,45,48,48], "Steel oligarch; Donetsk Governor 2014; opposition politician");
  I("Vadym Rabinovych",       "Opposition Platform (UA)","e7",["pm","leader","foreign"],           [45,52,48,45,45], "Opposition Platform deputy; pro-Russian media oligarch");
  I("Oleh Tyahnybok",         "Svoboda (UA)","e7",["pm","leader","home"],                          [45,52,50,42,48], "Svoboda nationalist leader; Maidan tribune; controversial rhetoric");
  I("Oleksiy Honcharuk",      "Servant of the People (UA)","e7",["pm","chancellor","leader"],      [50,48,48,50,48], "PM Oct 2019–Mar 2020; youngest PM in post-Soviet space; reformer");
  I("Olena Zelenska",         "Servant of the People (UA)","e7",["pm","culture","leader"],         [62,45,60,52,50], "Ukraine's First Lady; wartime diplomatic icon; scriptwriter");
  I("Mykhailo Podoliak",      "Servant of the People (UA)","e7",["pm","foreign","leader"],         [55,50,58,52,50], "Presidential adviser; chief negotiator with Russia 2022");
  I("Ruslan Stefanchuk",      "Servant of the People (UA)","e7",["pm","leader","justice"],         [52,55,50,52,50], "Rada Speaker from 2021; constitutional lawyer");
  I("Dmytro Kuleba",          "Servant of the People (UA)","e7",["pm","foreign","leader"],         [55,55,58,55,52], "Foreign Minister 2020–24; wartime diplomat");
  I("Oleksiy Reznikov",       "Servant of the People (UA)","e7",["pm","defence","leader"],         [52,55,50,52,50], "Defence Minister 2021–23; western weapons procurement");
  I("Valerii Zaluzhnyi",      "Servant of the People (UA)","e7",["pm","defence","leader"],         [55,58,52,55,52], "Commander-in-Chief 2021–24; Iron General; later Ambassador to UK");
  I("Leonid Kravchuk",        "Communist Party (UA)","e6",["pm","leader","foreign"],               [55,65,55,55,55], "Ukraine's first President 1991–94; independence declaration");
  I("Leonid Kuchma",          "Our Ukraine (UA)","e6",["pm","chancellor","leader","defence"],      [52,68,48,55,55], "President 1994–2005; Kuchmágate scandal; oligarch dealmaker");

  /* ═══════════════════════════════════════════════════════════════
     SERBIA / WESTERN BALKANS
     ═══════════════════════════════════════════════════════════════ */
  I("Aleksandar Vučić",       "SNS (RS)","e7",["pm","leader","foreign","defence"],               [58,60,58,55,60], "SNS President from 2017; ex-Radical; Serbia's strongman");
  I("Ivica Dačić",            "SPS (RS)","e7",["pm","leader","foreign","home"],                  [52,60,50,50,52], "SPS PM 2012–14; Milošević successor; Interior Minister");
  I("Zoran Đinđić",           "DS (RS)","e6",["pm","leader","foreign","justice"],                [62,58,60,58,58], "DS PM 2001–03; Milošević extradition; assassinated");
  I("Vojislav Koštunica",     "DSS (RS)","e6",["pm","leader","justice","foreign"],               [58,62,55,55,52], "DSS President 2000–03; PM 2004–08; legalist democrat");
  I("Slobodan Milošević",     "SPS (RS)","e5",["pm","leader","foreign","home"],                  [45,65,58,45,58], "SPS Yugoslav President; ethnic cleansing wars; Hague trial; died in cell");
  I("Vojislav Šešelj",        "SRS (RS)","e6",["pm","leader","home"],                            [35,55,55,32,50], "Radical nationalist; Hague acquittal after years in prison");
  I("Dragan Đilas",           "DS (RS)","e7",["pm","business","chancellor","leader"],            [52,55,50,52,50], "DS leader; former Belgrade Mayor; media businessman opposition");
  I("Ana Brnabić",            "SNS (RS)","e7",["pm","chancellor","leader","education"],          [52,55,50,52,52], "SNS PM 2017–24; first openly gay PM; China relations");
  I("Biljana Plavšić",        "SNS (RS)","e4",["pm","leader","home"],                            [30,50,40,28,40], "Republika Srpska President; Hague plea; war crimes");
  I("Radovan Karadžić",       "SNS (RS)","e4",["pm","leader","home"],                            [28,48,38,25,40], "Republika Srpska leader; Srebrenica; life sentence at Hague");
  I("Franjo Tuđman",          "HDZ (HR)","e5",["pm","defence","leader","foreign"],               [55,62,58,52,58], "HDZ Croatia's founding President; wartime leader; authoritarian");
  I("Stjepan Mesić",          "HDZ (HR)","e6",["pm","leader","foreign"],                         [58,65,58,58,55], "HDZ then HNS President 2000–10; Tuđman's rupture; last SFRY PM");
  I("Ivo Sanader",            "HDZ (HR)","e7",["pm","foreign","leader","chancellor"],            [55,58,52,55,52], "HDZ PM 2003–09; EU/NATO accession; resigned; convicted of corruption");
  I("Zoran Milanović",        "SDP (HR)","e7",["pm","leader","foreign","defence"],               [58,60,60,55,55], "SDP then independent President; anti-NATO controversialist; former PM");
  I("Andrej Plenković",       "HDZ (HR)","e7",["pm","foreign","leader","chancellor"],            [55,60,52,55,55], "HDZ PM from 2016; EU insider; moderate conservative");
  I("Alija Izetbegović",      "Party of Regions (UA)","e5",["pm","leader","foreign","justice"],  [60,60,60,55,55], "Bosniak founding President; Srebrenica; Dayton Accords");
  I("Nikola Gruevski",        "VMRO (MK)","e7",["pm","leader","chancellor"],                     [52,58,52,50,55], "VMRO Macedonia PM 2006–16; Skopje 2014 kitsch; fled corruption to Hungary");
  I("Zoran Zaev",             "SDSM (MK)","e7",["pm","leader","foreign","chancellor"],           [55,55,52,52,52], "SDSM PM; Prespa Agreement; NATO/EU path; Gruevski's Wiretapping exposure");
  I("Ali Ahmeti",             "DUI (MK)","e7",["pm","leader","defence","foreign"],               [52,55,50,50,50], "DUI ethnic Albanian party leader; former UCK commander");

  /* ═══════════════════════════════════════════════════════════════
     BULGARIA
     ═══════════════════════════════════════════════════════════════ */
  I("Boyko Borisov",          "GERB (BG)","e7",["pm","leader","home","foreign"],                 [55,58,52,52,55], "GERB PM three terms; bodybuilder; Mafia allegations; tapped phones");
  I("Sergei Stanishev",       "BSP (BG)","e7",["pm","chancellor","leader","foreign"],            [52,58,50,52,52], "BSP PM 2005–09; later PES President");
  I("Georgi Parvanov",        "BSP (BG)","e6",["pm","leader","foreign","defence"],               [56,62,55,55,52], "BSP President 2002–12; post-communist stalwart");
  I("Rosen Plevneliev",       "GERB (BG)","e7",["pm","leader","foreign","chancellor"],           [55,58,52,55,50], "GERB President 2012–17; businessmen; NATO supporter");
  I("Simeon Saxe-Coburg-Gotha","NDSV (BG)","e6",["pm","chancellor","leader"],                   [58,60,55,56,55], "NDSV tsar-turned-PM 2001–05; monarch returned as reformer");
  I("Ahmed Dogan",            "DPS (BG)","e6",["pm","leader","foreign"],                         [52,60,50,50,52], "DPS ethnic Turkish party founder; survived assassination attempt 2013");
  I("Mustafa Karadayi",       "DPS (BG)","e7",["pm","leader","foreign"],                         [50,55,48,50,50], "DPS leader succeeding Dogan; Turkish minority champion");
  I("Kiril Petkov",           "PP (BG)","e7",["pm","chancellor","leader","foreign"],             [58,50,58,55,52], "PP Harvard-educated PM 2021–22; anti-corruption; Harvard Business School");
  I("Assen Vassilev",         "PP (BG)","e7",["pm","chancellor","leader"],                       [56,52,55,55,50], "PP Finance Minister; Petkov's co-founder; economist");
  I("Todor Zhivkov",          "BCP (BG)","e4",["pm","leader","foreign"],                         [40,72,42,45,52], "BCP communist dictator 1954–89; longest-serving Eastern bloc leader");
  I("Zhelyu Zhelev",          "NDSV (BG)","e6",["pm","leader","foreign","justice"],              [58,60,58,55,52], "First elected democratic President 1990–97; philosopher dissident");

  /* ═══════════════════════════════════════════════════════════════
     ROMANIA
     ═══════════════════════════════════════════════════════════════ */
  I("Victor Ponta",           "PSD (RO)","e7",["pm","justice","leader"],                         [52,58,50,50,50], "PSD PM 2012–15; corruption probe resignation; political survival");
  I("Călin Popescu-Tăriceanu","PNL (RO)","e7",["pm","leader","chancellor","foreign"],            [55,62,52,55,52], "PNL PM 2004–08; Băsescu's rival; EU accession");
  I("Emil Boc",               "PDL (RO)","e7",["pm","chancellor","leader"],                      [50,55,48,50,50], "PDL PM 2008–12; austerity; salary cuts 25%");
  I("Dacian Cioloș",          "USR (RO)","e7",["pm","agriculture","chancellor","leader"],        [55,58,55,55,52], "Technocrat PM 2015–17; EU Commissioner for Agriculture; REPER founder");
  I("Mihai Tudose",           "PSD (RO)","e7",["pm","trade","leader","chancellor"],              [50,55,48,50,50], "PSD PM 2017–18; populist; Dragnea ally turned opponent");
  I("Viorica Dăncilă",        "PSD (RO)","e7",["pm","agriculture","leader"],                    [42,52,40,40,45], "PSD PM 2018–19; first female PM Romania; gaffe-prone");
  I("Ludovic Orban",          "PNL (RO)","e7",["pm","transport","leader"],                       [50,55,48,50,50], "PNL PM 2019–20; Speaker; Iohannis ally");
  I("Florin Cîțu",            "PNL (RO)","e7",["pm","chancellor","leader"],                     [50,55,48,50,48], "PNL PM 2020–21; budget hawk; COVID spending");
  I("Nicolae Ciucă",          "PNL (RO)","e7",["pm","defence","leader"],                         [52,58,45,52,50], "PNL PM 2021–23; Army General; technocratic style");
  I("Marcel Ciolacu",         "PSD (RO)","e7",["pm","chancellor","leader"],                      [52,55,50,50,52], "PSD PM from 2023; party president; coalition leader");
  I("Călin Georgescu",        "AUR (RO)","e7",["pm","leader","environment"],                     [45,45,52,40,45], "Far-right 2024 presidential frontrunner; pro-Putin; TikTok phenomenon");
  I("George Simion",          "AUR (RO)","e7",["pm","leader","foreign"],                         [48,48,52,42,48], "AUR nationalist leader; 2024 presidential run-off");
  I("Ion Iliescu",            "PSD (RO)","e6",["pm","leader","foreign"],                         [52,68,50,52,52], "FSN/PSD President 1990–2004 (mostly); post-communist transition");
  I("Emil Constantinescu",    "PDL (RO)","e6",["pm","leader","foreign","education"],             [55,60,52,52,50], "CDR President 1996–2000; reformer; NATO aspirant");
  I("Traian Băsescu",         "PDL (RO)","e7",["pm","leader","foreign","transport"],             [58,65,58,58,55], "PDL President twice 2004–14; Black Sea sailor; populist-liberal");
  I("Klaus Iohannis",         "PNL (RO)","e7",["pm","education","leader","foreign"],             [60,65,52,58,52], "PNL President 2014–24; Sibiu Lutheran Mayor; silent but reform-minded");

  /* ═══════════════════════════════════════════════════════════════
     BALTIC STATES — Estonia, Latvia, Lithuania
     ═══════════════════════════════════════════════════════════════ */
  I("Kaja Kallas",            "Reform Party (EE)","e7",["pm","leader","foreign","justice"],      [65,55,62,60,58], "Estonian PM 2021–24; EU foreign policy chief; Russia hawk");
  I("Jüri Ratas",             "Centre Party (EE)","e7",["pm","chancellor","leader"],             [52,55,50,50,52], "Centre PM twice 2016–21; populist deals with nationalists");
  I("Toomas Hendrik Ilves",   "Social Democrats (EE)","e6",["pm","foreign","leader","education"],[62,65,60,60,55], "President 2006–16; denim-clad cyber pioneer; anti-Putin voice");
  I("Lennart Meri",           "Isamaa (EE)","e6",["pm","leader","foreign","culture"],            [65,65,65,60,55], "Estonia's founding President 1992–2001; film director turned statesman");
  I("Mart Laar",              "Isamaa (EE)","e6",["pm","leader","chancellor","foreign"],         [62,60,58,60,58], "PM twice; flat tax pioneer; Tiger Leap internet; history professor");
  I("Alar Karis",             "Reform Party (EE)","e7",["pm","leader","education","justice"],    [58,60,52,55,50], "President from 2021; geneticist; National Museum director");
  I("Kristen Michal",         "Reform Party (EE)","e7",["pm","chancellor","environment","leader"],[55,52,52,52,52], "Reform PM from 2024; digital minister background");
  I("Martin Helme",           "EKRE (EE)","e7",["pm","home","leader","chancellor"],             [45,50,48,42,48], "EKRE nationalist Finance Minister; anti-immigration firebrand; Mart's son");
  I("Mart Helme",             "EKRE (EE)","e7",["pm","home","leader"],                          [45,52,50,42,48], "EKRE co-founder; Interior Minister; Russia apologist");
  I("Urmas Reinsalu",         "Isamaa (EE)","e7",["pm","justice","foreign","leader"],           [52,55,50,52,50], "Isamaa foreign minister; Russia sanctions advocate");
  I("Gitanas Nausėda",        "Social Democrats (LT)","e7",["pm","chancellor","leader","foreign"],[58,58,55,56,52], "Lithuanian President from 2019; economist; centrist");
  I("Ingrida Simonyte",        "Homeland Union (LT)","e7",["pm","chancellor","leader"],          [60,58,58,60,55], "Homeland Union PM from 2020; Finance Minister; anti-Soviet memory");
  I("Saulius Skvernelis",     "LDDP (LT)","e7",["pm","home","leader"],                          [52,55,50,50,52], "LDDP-LVŽS PM 2016–20; police chief background");
  I("Algirdas Butkevičius",   "Social Democrats (LT)","e7",["pm","chancellor","leader"],        [50,58,48,50,50], "LSDP PM 2012–16; infrastructure minister");
  I("Valdas Adamkus",         "DP (LT)","e6",["pm","leader","foreign","environment"],           [62,65,58,60,55], "President twice 1998–2009; Lithuanian-American; EPA chief");
  I("Rolandas Paksas",        "Liberal Movement (LT)","e6",["pm","leader","foreign"],           [50,55,52,48,50], "President 2003–04; impeached for links to Russian organised crime");
  I("Vytautas Landsbergis",   "Homeland Union (LT)","e6",["pm","leader","culture","foreign"],   [65,60,65,62,58], "Sąjūdis independence leader; Music professor; EP MEP patriarch");
  I("Raimonds Vējonis",       "Zatlers (LV)","e7",["pm","environment","leader","defence"],      [55,58,50,52,50], "Latvian President 2015–19; Green Party; soft-spoken centrist");
  I("Edgars Rinkēvičs",       "New Unity (LV)","e7",["pm","foreign","leader"],                  [60,58,58,58,52], "Latvian President from 2023; long-serving Foreign Minister; openly gay");
  I("Krišjānis Kariņš",       "New Unity (LV)","e7",["pm","chancellor","trade","leader"],       [56,55,52,55,52], "New Unity PM 2019–23; Latvian-American; EU economic reformer");
  I("Evika Siliņa",           "New Unity (LV)","e7",["pm","justice","leader","home"],           [54,52,50,52,50], "New Unity PM from 2023; first female Latvia PM; tech background");
  I("Vaira Vīķe-Freiberga",   "New Unity (LV)","e6",["pm","leader","foreign","education"],      [65,62,68,60,55], "Latvian President 2000–07; psycholinguist; Latvian-Canadian");
  I("Nils Ušakovs",           "Harmony (LV)","e7",["pm","leader","foreign"],                    [52,52,52,50,52], "Harmony Riga Mayor 2009–19; Russophone; MEP");
  I("Māris Kučinskis",        "New Unity (LV)","e7",["pm","chancellor","agriculture","leader"],  [50,56,48,50,50], "New Unity PM 2016–19; environmental engineer");


  /* ═══════════════════════════════════════════════════════════════
     CAUCASUS — Georgia, Armenia, Azerbaijan
     ═══════════════════════════════════════════════════════════════ */
  I("Mikheil Saakashvili",    "UNM (GE)","e7",["pm","leader","foreign","justice"],               [62,55,65,55,58], "UNM President 2004–13; Rose Revolution; reckless reformer; 2008 war");
  I("Bidzina Ivanishvili",    "Georgian Dream (GE)","e7",["pm","leader","chancellor","business"],[52,55,48,50,55], "GD billionaire founder; offshore wealth; Russia-leaning oligarch");
  I("Giorgi Margvelashvili",  "Georgian Dream (GE)","e7",["pm","education","leader","foreign"],  [55,55,52,52,50], "GD President 2013–18; philosopher; turned against Ivanishvili");
  I("Salome Zourabichvili",   "UNM (GE)","e7",["pm","foreign","leader"],                         [58,58,58,55,50], "French-born President 2018–24; independent; pro-EU; Ivanishvili critic");
  I("Mamuka Bakhtadze",       "Georgian Dream (GE)","e7",["pm","chancellor","leader"],           [50,50,48,50,48], "GD PM 2018–19; economist; tech sector");
  I("Giorgi Gakharia",        "Georgian Dream (GE)","e7",["pm","home","leader"],                 [52,52,50,50,50], "GD PM 2019–21; Interior Minister background; resigned over Melia arrest");
  I("Irakli Kobakhidze",      "Georgian Dream (GE)","e7",["pm","leader","justice","foreign"],    [48,50,48,48,50], "GD PM from 2024; controversial foreign agents law; pro-Russia drift");
  I("Nino Burjanadze",        "CUG (GE)","e6",["pm","leader","justice","foreign"],               [58,58,58,55,52], "Rose Revolution Speakers; Speaker twice; later Russia-leaning");
  I("Zurab Zhvania",          "CUG (GE)","e6",["pm","leader","environment","foreign"],           [60,58,60,58,55], "PM 2004–05; Rose Revolution trinity; died mysteriously of gas poisoning");
  I("Nikola Pashinyan",       "Civil Contract (AM)","e7",["pm","leader","foreign"],              [60,52,62,55,55], "CC journalist-PM; Velvet Revolution 2018; Nagorno-Karabakh loss");
  I("Robert Kocharyan",       "HHK (AM)","e6",["pm","leader","foreign","defence"],               [50,62,50,50,52], "HHK President 1998–2008; Nagorno-Karabakh architect; authoritarian");
  I("Serzh Sargsyan",         "HHK (AM)","e6",["pm","leader","foreign","defence"],               [48,62,48,48,52], "HHK President 2008–18; PM briefly; resigned amid velvet revolution");
  I("Vahagn Khachaturyan",    "Civil Contract (AM)","e7",["pm","leader","education","chancellor"],[52,52,50,52,48], "CC President from 2022; physicist and economist");
  I("Armen Sarkissian",       "HAK (AM)","e7",["pm","foreign","chancellor","leader"],            [56,58,55,55,50], "President 2018–22; physicist; resigned citing limited presidential powers");
  I("Ilham Aliyev",           "New Azerbaijan (AZ)","e7",["pm","leader","foreign","chancellor"], [52,65,50,52,55], "YAP President from 2003; inherited power; oil autocrat; Karabakh win 2023");
  I("Heydar Aliyev",          "New Azerbaijan (AZ)","e5",["pm","leader","foreign","defence"],    [55,72,52,55,58], "YAP President 1993–2003; KGB General; Azerbaijan's founding strongman");
  I("Arif Rahimzadeh",        "APF (AZ)","e6",["pm","leader","foreign"],                         [48,52,48,48,48], "APF Popular Front co-founder; Abulfaz Elchibey PM");
  I("Abulfaz Elchibey",       "APF (AZ)","e6",["pm","leader","foreign"],                         [52,52,52,48,48], "APF President 1992–93; first non-communist president; Turanist");

  /* ═══════════════════════════════════════════════════════════════
     CENTRAL ASIA — Kazakhstan, Kyrgyzstan, Uzbekistan
     ═══════════════════════════════════════════════════════════════ */
  I("Nursultan Nazarbayev",   "Nur Otan (KZ)","e5",["pm","leader","foreign","chancellor"],      [55,75,52,55,60], "Kazakhstan founding President 1991–2019; Astana renamed for him; authoritarian");
  I("Kassym-Jomart Tokayev",  "Amanat (KZ)","e6",["pm","leader","foreign"],                     [52,65,50,52,52], "President from 2019; January 2022 Bloody January crackdown; UN career");
  I("Akezhan Kazhegeldin",    "Nur Otan (KZ)","e6",["pm","chancellor","leader","trade"],         [52,60,48,52,50], "Kazakhstan PM 1994–97; economic reformer; opposition in exile");
  I("Karim Masimov",          "Nur Otan (KZ)","e7",["pm","leader","chancellor"],                 [48,58,45,48,48], "PM twice; KNB chief; arrested for treason after 2022 unrest");
  I("Askar Akayev",           "People's Democratic (KG)","e6",["pm","leader","foreign"],         [50,60,48,50,48], "Kyrgyz President 1991–2005; Tulip Revolution ousted him");
  I("Kurmanbek Bakiyev",      "People's Democratic (KG)","e6",["pm","leader"],                   [45,55,45,42,45], "Kyrgyz President 2005–10; overthrown in 2010 revolution; fled to Belarus");
  I("Rosa Otunbayeva",        "Ata Meken (KG)","e6",["pm","leader","foreign","education"],       [58,58,58,55,52], "Kyrgyz transitional President 2010–11; first female Central Asian president");
  I("Almazbek Atambayev",     "People's Democratic (KG)","e7",["pm","leader","chancellor"],      [48,55,48,48,48], "SDPK PM 2010; President 2011–17; arrested by successor Jeenbekov");
  I("Sadyr Japarov",          "People's Democratic (KG)","e7",["pm","leader","chancellor"],      [48,50,50,46,48], "President from 2021; populist nationalist; freed from prison to power");
  I("Islam Karimov",          "LDPU (UZ)","e5",["pm","leader","foreign","chancellor"],           [38,72,38,45,50], "Uzbek dictator 1991–2016; Andijan massacre; boiled dissidents allegedly");
  I("Shavkat Mirziyoyev",     "UzLiDeP (UZ)","e7",["pm","leader","chancellor","trade"],         [52,60,50,52,52], "President from 2016; opening up Uzbekistan; Karimov's PM");

  /* ═══════════════════════════════════════════════════════════════
     MIDDLE EAST — Lebanon
     ═══════════════════════════════════════════════════════════════ */
  I("Rafik Hariri",           "Future Movement (LB)","e6",["pm","chancellor","leader","trade"],  [65,65,62,62,58], "Future PM 1992–1998 and 2000–04; reconstruction billionaire; assassinated 2005");
  I("Saad Hariri",            "Future Movement (LB)","e7",["pm","chancellor","leader","foreign"],[55,55,52,52,52], "Future PM 2009–11 and 2016–20; Rafik's son; resigned live on Saudi TV");
  I("Fouad Siniora",          "Future Movement (LB)","e7",["pm","chancellor","leader"],          [55,62,52,55,52], "Future PM 2005–09; wept over Hariri death; Doha Agreement");
  I("Najib Mikati",           "Future Movement (LB)","e7",["pm","chancellor","leader","trade"],  [52,58,50,52,52], "billionaire telecoms PM twice; caretaker PM during crisis");
  I("Hassan Nasrallah",       "Hezbollah (LB)","e6",["pm","leader","defence","foreign"],         [52,62,60,50,58], "Hezbollah Secretary General 1992–2024; killed by Israeli airstrike");
  I("Nabih Berri",            "Amal (LB)","e5",["pm","leader","justice"],                        [50,72,48,50,55], "Amal Speaker of Parliament since 1992; Syrian ally");
  I("Samir Geagea",           "LF (LB)","e5",["pm","leader","defence"],                          [48,60,50,45,50], "LF leader; war crimes conviction; only warlord jailed in Lebanon");
  I("Pierre Gemayel",         "Kataeb (LB)","e4",["pm","leader","trade"],                        [52,55,52,48,50], "Kataeb founding leader; phalangist founder; fascist-inspired");
  I("Amine Gemayel",          "Kataeb (LB)","e5",["pm","leader","foreign"],                      [52,58,52,50,50], "Kataeb President 1982–88; Bashir's brother; civil war presidency");
  I("Bashir Gemayel",         "Kataeb (LB)","e5",["pm","leader","defence"],                      [55,50,55,48,50], "Kataeb President-elect 1982; assassinated before taking office");
  I("Michel Aoun",            "FPM (LB)","e5",["pm","leader","defence","foreign"],               [45,65,50,42,48], "FPM general-president 2016–22; Hezbollah deal; Beirut explosion catastrophe");
  I("Michel Sleiman",         "FPM (LB)","e6",["pm","defence","leader"],                         [52,60,50,50,50], "Military president 2008–14; Doha Agreement president; army commander");
  I("Élias Sarkis",           "Kataeb (LB)","e5",["pm","leader","chancellor"],                   [50,58,48,50,50], "Kataeb-aligned President 1976–82; Syrian influence; civil war era");
  I("Camille Chamoun",        "Kataeb (LB)","e3",["pm","leader","foreign"],                      [55,60,55,52,52], "Liberal President 1952–58; US Marines intervention; Maronite leader");

  /* ═══════════════════════════════════════════════════════════════
     MIDDLE EAST — Syria, Iraq, Iran
     ═══════════════════════════════════════════════════════════════ */
  I("Hafez al-Assad",         "Ba'ath (SY)","e4",["pm","defence","leader","foreign"],            [45,72,45,52,58], "Ba'ath President 1971–2000; Hama massacre; iron-fist Syria");
  I("Bashar al-Assad",        "Ba'ath (SY)","e7",["pm","leader","foreign","defence"],            [38,60,40,38,48], "Ba'ath President 2000–24; ophthalmologist turned butcher; chemical weapons; fled to Russia");
  I("Rifaat al-Assad",        "Ba'ath (SY)","e5",["pm","defence","leader"],                      [30,55,35,32,45], "Hafez's brother; Hama massacre executor; exiled after coup attempt");
  I("Ahmed al-Sharaa",        "Ba'ath (SY)","e7",["pm","leader","defence","foreign"],            [52,45,50,48,50], "HTS/Ba'ath successor; rebel leader became interim PM 2024; Abu Mohammed al-Julani");
  I("Saddam Hussein",         "Ba'ath (IQ)","e4",["pm","leader","defence","foreign"],            [40,68,48,40,52], "Ba'ath Iraqi dictator; gassed Kurds; Kuwait invasion; hanged 2006");
  I("Tariq Aziz",             "Ba'ath (IQ)","e4",["pm","foreign","leader"],                      [50,65,50,50,52], "Ba'ath Foreign Minister; Saddam's Christian mouthpiece; died in prison");
  I("Nouri al-Maliki",        "Dawa (IQ)","e7",["pm","leader","defence","home"],                 [45,58,42,45,48], "Dawa PM 2006–14; sectarian Shia; ISIS rise blamed on him");
  I("Ibrahim al-Jaafari",     "Dawa (IQ)","e7",["pm","leader","health"],                         [48,55,45,46,48], "Dawa transitional PM 2005–06; Shia Islamist; UK exile background");
  I("Haider al-Abadi",        "Dawa (IQ)","e7",["pm","chancellor","leader","defence"],           [55,58,52,55,52], "Dawa PM 2014–18; ISIS military victory; more inclusive than Maliki");
  I("Adil Abdul-Mahdi",       "Dawa (IQ)","e7",["pm","chancellor","leader","foreign"],           [50,62,48,50,50], "PM 2018–20; independent technocrat; resigned amid protests; Iranian favourite");
  I("Mustafa al-Kadhimi",     "Dawa (IQ)","e7",["pm","leader","foreign","justice"],              [55,55,52,52,50], "PM 2020–22; journalist turned intelligence chief; US ally; survived drone assassination");
  I("Mohammed Shia' Al-Sudani","Dawa (IQ)","e7",["pm","leader","chancellor"],                    [52,52,50,50,50], "PM from 2022; Coordination Framework candidate; Iran-adjacent");
  I("Massoud Barzani",        "KDP (IQ)","e6",["pm","leader","defence","foreign"],               [58,65,55,55,58], "KDP Kurdish Regional Government President; independence referendum 2017");
  I("Jalal Talabani",         "PUK (IQ)","e6",["pm","leader","foreign","defence"],               [60,68,58,58,60], "PUK Iraqi President 2005–14; Kurd's Kurd; Ba'ath resistance");
  I("Muqtada al-Sadr",        "Sadr (IQ)","e7",["pm","leader","health"],                         [50,48,55,45,52], "Sadrist movement leader; Mahdi Army; mercurial politician; withdrew from politics 2022");
  I("Ruhollah Khomeini",      "Islamic Republic (IR)","e4",["pm","leader","justice","foreign"],  [52,68,62,50,65], "Supreme Leader 1979–89; Islamic Revolution; Iran-Iraq War; Rushdie fatwa");
  I("Ali Khamenei",           "Islamic Republic (IR)","e5",["pm","leader","foreign","defence"],  [42,75,45,48,62], "Supreme Leader from 1989; nuclear programme; Green Movement crackdown");
  I("Akbar Hashemi Rafsanjani","Rafsanjani (IR)","e5",["pm","chancellor","leader","foreign"],    [55,70,52,55,58], "Pragmatist President 1989–97; reconstruction; moderate faction founder");
  I("Mohammad Khatami",       "Reformists (IR)","e6",["pm","leader","culture","foreign"],        [62,60,62,56,55], "Reformist President 1997–2005; Dialogue of Civilisations; thwarted by hardliners");
  I("Mahmoud Ahmadinejad",    "Islamic Republic (IR)","e7",["pm","chancellor","leader","foreign"],[45,58,52,42,48], "Hardline President 2005–13; Holocaust denial; nuclear defiance");
  I("Hassan Rouhani",         "Reformists (IR)","e6",["pm","chancellor","foreign","leader"],     [55,65,52,55,52], "Moderate President 2013–21; JCPOA nuclear deal; sanctions relief");
  I("Ebrahim Raisi",          "Islamic Republic (IR)","e7",["pm","justice","leader"],            [35,60,35,38,48], "Hardline President 2021–24; mass executions 1988; died in helicopter crash");
  I("Masoud Pezeshkian",      "Reformists (IR)","e7",["pm","health","leader"],                   [55,58,52,52,50], "Reformist President from 2024; heart surgeon; moderate outreach");
  I("Mir Hossein Mousavi",    "Reformists (IR)","e5",["pm","leader","culture","chancellor"],     [58,60,58,55,52], "PM 1981–89; 2009 Green Movement candidate; under house arrest since 2011");

  /* ═══════════════════════════════════════════════════════════════
     MIDDLE EAST — Jordan, Saudi Arabia, Gulf States, Palestine
     ═══════════════════════════════════════════════════════════════ */
  I("King Hussein of Jordan", "Hashemite (JO)","e4",["pm","foreign","defence","leader"],        [68,72,65,65,65], "Hashemite King 1952–99; Six-Day War; Black September; Middle East pillar");
  I("King Abdullah II",       "Hashemite (JO)","e7",["pm","foreign","defence","leader"],        [62,65,60,60,60], "Hashemite King from 1999; moderate; Palestinian peace champion; Special Forces background");
  I("Awn al-Khasawneh",       "Hashemite (JO)","e7",["pm","justice","leader","foreign"],        [52,60,50,52,50], "Jordan PM 2011–12; ICJ judge background; reformist PM");
  I("Abdullah Ensour",        "Hashemite (JO)","e7",["pm","chancellor","leader"],               [50,58,48,50,50], "Jordan PM 2012–16; economic reformer; austerity measures");
  I("King Salman",            "Al Saud (SA)","e5",["pm","leader","foreign","chancellor"],       [48,65,45,50,55], "Saudi King from 2015; allowed women to drive; NEOM megaproject");
  I("Mohammed bin Salman",    "Al Saud (SA)","e7",["pm","chancellor","defence","leader"],       [55,52,52,52,55], "Saudi Crown Prince; Vision 2030; Khashoggi murder; Yemen war");
  I("Turki al-Faisal",        "Al Saud (SA)","e6",["pm","foreign","leader","intelligence"],     [55,65,55,55,52], "Saudi intelligence chief; Riyadh Ambassador London and DC; bin Laden pursuer");
  I("Adel al-Jubeir",         "Al Saud (SA)","e7",["pm","foreign","leader"],                    [52,60,50,52,50], "Saudi Foreign Minister; Ambassador Washington; Khashoggi defector");
  I("Sheikh Mohammed Al Maktoum","UAE Federal (AE)","e6",["pm","chancellor","leader","trade"],  [58,65,55,58,60], "Dubai ruler from 2006; UAE PM; horse racing mogul; Vision Dubai");
  I("Sheikh Khalifa",         "UAE Federal (AE)","e5",["pm","leader","chancellor"],              [52,65,48,55,55], "UAE President 2004–22; Abu Dhabi ruler; Khalifa tower namesake");
  I("Sheikh Mohamed bin Zayed","UAE Federal (AE)","e7",["pm","defence","leader","foreign"],     [55,60,52,55,58], "UAE President from 2022; MBZ; Yemen war; Abraham Accords architect");
  I("Yasser Arafat",          "Fatah (PS)","e4",["pm","leader","foreign","defence"],            [60,68,65,52,60], "Fatah PLO Chairman 1969–2004; Oslo Accords; Nobel Peace Prize; died in Paris");
  I("Mahmoud Abbas",          "Fatah (PS)","e7",["pm","leader","foreign"],                      [48,68,45,48,52], "Fatah PA President from 2005; Abbas refusing elections; Oslo's survivor");
  I("Ismail Haniyeh",         "Hamas (PS)","e7",["pm","leader","foreign"],                      [50,58,52,48,52], "Hamas PM 2006–07; political bureau chief; assassinated in Tehran 2024");
  I("Yahya Sinwar",           "Hamas (PS)","e7",["pm","leader","defence"],                      [35,55,40,38,48], "Hamas Gaza leader; October 7 architect; killed by Israeli forces 2024");
  I("Saeb Erekat",            "Fatah (PS)","e6",["pm","foreign","justice","leader"],            [55,60,58,52,52], "PLO chief negotiator for 25 years; died COVID 2020");

  /* ═══════════════════════════════════════════════════════════════
     NORTH AFRICA — Morocco, Algeria, Tunisia, Libya
     ═══════════════════════════════════════════════════════════════ */
  I("King Hassan II",         "Istiqlal (MA)","e4",["pm","leader","foreign","defence"],         [58,70,55,58,62], "Morocco King 1961–99; Années de Plomb repression; Green March");
  I("King Mohammed VI",       "Istiqlal (MA)","e7",["pm","leader","foreign","chancellor"],      [60,62,55,60,60], "Morocco King from 1999; modernisation; African economic engagement");
  I("Abdelilah Benkirane",    "PJD (MA)","e7",["pm","leader","chancellor","home"],              [58,58,58,55,55], "PJD PM 2011–17; Islamist moderate; Arab Spring reform");
  I("Saad Dine El Otmani",    "PJD (MA)","e7",["pm","foreign","health","leader"],               [52,58,50,52,50], "PJD PM 2017–21; Abraham Accords backlash; normalisation with Israel");
  I("Aziz Akhannouch",        "PAM (MA)","e7",["pm","agriculture","chancellor","leader"],       [52,58,50,52,52], "PAM billionaire PM from 2021; agriculture and fisheries businessman");
  I("Driss Jettou",           "USFP (MA)","e6",["pm","chancellor","trade","leader"],            [52,60,48,52,50], "PM 2002–07; technocrat; Mohammed VI's right hand");
  I("Abderrahmane Youssoufi", "USFP (MA)","e5",["pm","leader","justice","foreign"],             [58,62,58,55,55], "USFP PM 1998–2002; alternance democracy pioneer; jailed by Hassan II");
  I("Ahmed Osman",            "Istiqlal bloc (MA)","e5",["pm","leader","foreign","chancellor"], [52,60,50,52,50], "Hassan II's brother-in-law PM 1972–79; USFP coalition");
  I("Houari Boumédiène",      "FLN (DZ)","e4",["pm","leader","defence","chancellor"],           [48,65,48,52,55], "Algeria President 1965–78; coup against Ben Bella; socialism and oil");
  I("Chadli Bendjedid",       "FLN (DZ)","e5",["pm","leader","chancellor","foreign"],           [45,62,42,48,50], "FLN President 1979–92; liberalised; then military coup to prevent FIS win");
  I("Liamine Zéroual",        "FLN (DZ)","e6",["pm","defence","leader"],                        [45,58,42,45,48], "Algeria interim President 1994–99; ended civil war; resigned unexpectedly");
  I("Abdelaziz Bouteflika",   "FLN (DZ)","e6",["pm","foreign","leader"],                        [45,70,42,45,50], "FLN President 1999–2019; 20 years; fourth term wheelchair spectre; Hirak ousted him");
  I("Abdelmadjid Tebboune",   "FLN (DZ)","e7",["pm","chancellor","leader"],                     [45,58,40,45,48], "FLN President from 2019; post-Hirak general's man; COVID isolation");
  I("Ali Benflis",            "FLN (DZ)","e6",["pm","justice","leader"],                         [50,58,48,50,48], "FLN PM 2000–03; Bouteflika's rival; repeated presidential candidate");
  I("Ahmed Ben Bella",        "FLN (DZ)","e3",["pm","leader","defence","foreign"],              [55,60,58,52,55], "FLN Algeria's first PM then President; 1962 independence; imprisoned by Boumédienne");
  I("Zine El Abidine Ben Ali","RCD (TN)","e5",["pm","leader","home","defence"],                 [35,65,35,38,50], "RCD Tunisia's autocrat 1987–2011; ousted by Arab Spring; fled to Saudi Arabia");
  I("Hamadi Jebali",          "Ennahda (TN)","e7",["pm","leader","justice"],                    [52,55,52,50,50], "Ennahda PM 2011–13; Islamist moderate; resigned during political crisis");
  I("Ali Larayedh",           "Ennahda (TN)","e7",["pm","home","leader"],                       [50,55,48,50,48], "Ennahda PM 2013–14; Interior Minister; imprisoned by Ben Ali for 14 years");
  I("Mehdi Jomaa",            "Nidaa Tounes (TN)","e7",["pm","trade","chancellor","leader"],    [52,55,50,52,48], "Technocrat PM 2014–15; Tunisian transition guardian");
  I("Beji Caid Essebsi",      "Nidaa Tounes (TN)","e5",["pm","leader","justice","foreign"],     [55,72,52,55,55], "NT President 2014–19; 88-year-old transition; died in office");
  I("Youssef Chahed",         "Nidaa Tounes (TN)","e7",["pm","chancellor","leader"],            [50,52,50,50,50], "NT PM 2016–19; anti-corruption crusader; economic reform");
  I("Kais Saied",             "Aish Tounsi (TN)","e7",["pm","justice","leader","foreign"],      [55,55,55,50,50], "Populist-constitutionalist President from 2019; froze parliament 2021; one-man rule");
  I("Muammar Gaddafi",        "Ba'ath (SY)","e4",["pm","leader","defence","foreign"],           [38,65,52,38,50], "Libya's Green Book dictator 1969–2011; pan-African; killed by rebels");
  I("Ali Zeidan",             "FFS (DZ)","e7",["pm","foreign","leader"],                         [48,52,45,46,46], "Libya PM 2012–14; kidnapped by militias; chaos government");
  I("Fayez al-Sarraj",        "FLN (DZ)","e7",["pm","leader","chancellor"],                     [48,50,45,46,46], "Libya unity government PM 2016–21; Tripoli-based; UN-recognised");
  I("Khalifa Haftar",         "Ba'ath (SY)","e5",["pm","defence","leader"],                     [35,62,35,35,42], "LNA commander; CIA asset; warlord threatening Tripoli; eastern Libya");

  /* ═══════════════════════════════════════════════════════════════
     SUB-SAHARAN AFRICA — Senegal, Ivory Coast, DRC
     ═══════════════════════════════════════════════════════════════ */
  I("Léopold Sédar Senghor",  "PS (SN)","e3",["pm","leader","culture","education"],             [68,65,72,62,60], "PS Senegal's founding President 1960–80; poet; négritude philosopher");
  I("Abdou Diouf",            "PS (SN)","e5",["pm","leader","foreign","chancellor"],             [58,68,55,58,58], "PS President 1981–2000; OIF Secretary General; democracy transition");
  I("Abdoulaye Wade",         "PDS (SN)","e5",["pm","leader","chancellor","foreign"],            [60,65,62,58,60], "PDS President 2000–12; third-term attempt; African Union Monument");
  I("Macky Sall",             "APR (SN)","e7",["pm","leader","chancellor","energy"],             [58,60,55,58,55], "APR President 2012–24; oil discovery; delayed election; peaceful transfer");
  I("Bassirou Diomaye Faye",  "Pastef (SN)","e7",["pm","leader","justice","chancellor"],        [60,45,60,52,52], "Pastef President from 2024; tax inspector; released from prison to presidency");
  I("Ousmane Sonko",          "Pastef (SN)","e7",["pm","chancellor","leader"],                   [60,48,65,50,55], "Pastef opposition leader; PM from 2024; convicted and acquitted multiple times");
  I("Félix Houphouët-Boigny", "PDCI (CI)","e3",["pm","leader","chancellor","agriculture"],      [62,72,58,62,60], "Ivory Coast founding President 1960–93; Françafrique pillar; Yamoussoukro basilica");
  I("Henri Konan Bédié",      "PDCI (CI)","e5",["pm","leader","chancellor"],                    [48,62,48,50,50], "PDCI President 1993–99; ivoirité concept; coup by Guëi");
  I("Laurent Gbagbo",         "FPI (CI)","e6",["pm","leader","education","justice"],             [52,60,55,50,52], "FPI President 2000–11; refused to concede; ICC acquitted; returned triumphant");
  I("Alassane Ouattara",      "RDR (CI)","e6",["pm","chancellor","leader","foreign"],            [58,65,52,60,58], "RDR President from 2011; IMF chief economist; third term controversy");
  I("Guillaume Soro",         "RHDP (CI)","e7",["pm","leader","chancellor","deputy"],           [48,52,50,45,48], "Rebel leader turned Speaker; opposition exile; condemned in absentia");
  I("Mobutu Sese Seko",       "PPRD (CD)","e4",["pm","leader","defence","chancellor"],          [35,68,42,35,50], "Zaire dictator 1965–97; kleptocracy; leopard-skin hat; fled to Morocco");
  I("Laurent-Désiré Kabila",  "PPRD (CD)","e5",["pm","leader","defence","foreign"],             [42,58,42,40,48], "DRC President 1997–2001; toppled Mobutu; assassinated by bodyguard");
  I("Joseph Kabila",          "PPRD (CD)","e7",["pm","leader","defence","foreign"],              [42,60,38,42,48], "DRC President 2001–19; at 29 world's youngest leader; overstayed terms");
  I("Félix Tshisekedi",       "UDPS (CD)","e7",["pm","leader","foreign","justice"],              [52,52,52,50,50], "UDPS President from 2019; Étienne's son; Congo's reform hope");
  I("Étienne Tshisekedi",     "UDPS (CD)","e5",["pm","leader","justice","foreign"],              [60,65,60,55,58], "UDPS opposition giant; died 2017 without reaching presidency he won");
  I("Jean-Pierre Bemba",      "MLC (CD)","e6",["pm","leader","defence","chancellor"],           [48,52,48,45,48], "MLC rebel leader; ICC conviction for troops' rapes; presidential candidate");
  I("Vital Kamerhe",          "UDPS (CD)","e7",["pm","leader","chancellor"],                     [50,52,50,48,50], "UDPS ally; convicted of embezzlement; Tshisekedi's PM chief of staff");

  /* ═══════════════════════════════════════════════════════════════
     SUB-SAHARAN AFRICA — Cameroon, Rwanda, Uganda, Sudan, Mozambique, Angola
     ═══════════════════════════════════════════════════════════════ */
  I("Paul Biya",              "CPDM (CM)","e5",["pm","leader","chancellor","foreign"],          [35,78,35,38,52], "Cameroon President from 1982; world's oldest; 40+ years; long absences");
  I("John Fru Ndi",           "SDF (CM)","e6",["pm","leader","justice","foreign"],              [55,60,55,52,52], "SDF opposition leader; 1992 election likely stolen from him");
  I("Joseph Dion Ngute",      "CPDM (CM)","e7",["pm","justice","leader","foreign"],             [50,58,48,50,50], "PM from 2019; Anglophone crisis negotiator; Biya loyalist");
  I("Paul Kagame",            "RPF (RW)","e6",["pm","leader","defence","foreign"],              [55,62,52,55,58], "RPF President from 2000; stopped genocide; economic miracle; authoritarian");
  I("Pasteur Bizimungu",      "RPF (RW)","e5",["pm","leader","foreign"],                         [50,55,48,50,48], "RPF transitional President 1994–2000; Hutu face; imprisoned by Kagame");
  I("Yoweri Museveni",        "NRM (UG)","e5",["pm","leader","defence","foreign"],              [50,72,50,50,55], "NRM President from 1986; anti-Amin guerrilla; liberator turned autocrat");
  I("Milton Obote",           "UPC (UG)","e4",["pm","leader","chancellor","foreign"],           [48,60,48,48,50], "UPC PM then President; Uganda's first leader; twice; overthrown twice by Amin and Museveni");
  I("Idi Amin",               "NRM (UG)","e4",["pm","leader","defence"],                         [30,50,42,25,40], "Uganda's brutal dictator 1971–79; self-styled 'Conqueror of the British Empire'; expelled Asians");
  I("Kizza Besigye",          "FDC (UG)","e7",["pm","leader","health","justice"],               [58,58,58,55,52], "FDC opposition leader; four-time presidential candidate; arrested repeatedly");
  I("Bobi Wine",              "DP (UG)","e7",["pm","leader","culture"],                          [62,45,65,48,50], "NUP/People Power pop star politician; 2021 presidential candidate; teargas survivor");
  I("Omar al-Bashir",         "NCP (SD)","e5",["pm","leader","defence","foreign"],              [32,65,35,35,48], "Sudan Islamist-military President 1989–2019; Darfur ICC warrant; ousted by coup");
  I("Abdalla Hamdok",         "NUP (SD)","e7",["pm","chancellor","leader","foreign"],           [55,58,52,55,50], "Sudan civilian PM 2019–22; twice; UN economist; coup and re-coup");
  I("Mohamed Hamdan Dagalo",  "NCP (SD)","e7",["pm","defence","leader"],                         [30,52,35,30,40], "RSF Hemeti; Janjaweed general; 2023 civil war against SAF");
  I("Salva Kiir Mayardit",    "SPLM (SD)","e6",["pm","leader","defence","foreign"],             [38,55,35,35,42], "SPLM South Sudan President from 2011; independence icon turned civil war instigator");
  I("Riek Machar",            "SPLM (SD)","e6",["pm","leader","deputy","defence"],               [35,52,35,32,40], "SPLM-IO South Sudan VP twice; civil war against Kiir; millions displaced");
  I("Samia Suluhu Hassan",    "CCM (TZ)","e7",["pm","leader","chancellor","foreign"],           [58,60,55,55,55], "CCM Tanzania's first woman President from 2021; diplomat");
  I("John Magufuli",          "CCM (TZ)","e7",["pm","chancellor","leader","environment"],       [48,58,50,45,50], "CCM President 2015–21; COVID denier; steamroller anti-corruption; died COVID");
  I("Jakaya Kikwete",         "CCM (TZ)","e6",["pm","foreign","leader","chancellor"],           [56,62,55,55,52], "CCM President 2005–15; foreign minister; moderate reform");
  I("Samora Machel",          "Frelimo (MZ)","e4",["pm","leader","defence","foreign"],          [55,58,55,52,55], "Frelimo Mozambique founding President 1975–86; died in plane crash; Dhlakama's nemesis");
  I("Joaquim Chissano",       "Frelimo (MZ)","e5",["pm","foreign","leader","chancellor"],       [58,65,55,58,55], "Frelimo President 1986–2005; ended civil war; Mo Ibrahim Prize winner");
  I("Afonso Dhlakama",        "Renamo (MZ)","e5",["pm","leader","defence"],                     [42,55,42,40,45], "Renamo rebel leader 1979–2018; civil war; repeated candidate; died in bush");
  I("Agostinho Neto",         "MPLA (AO)","e4",["pm","leader","foreign","culture"],             [58,60,60,52,55], "MPLA Angola's founding President 1975–79; poet; Cold War leftist");
  I("José Eduardo dos Santos", "MPLA (AO)","e5",["pm","leader","chancellor","foreign"],         [38,72,35,40,52], "MPLA President 1979–2017; 38 years; oil money; family kleptocracy");
  I("João Lourenço",          "MPLA (AO)","e7",["pm","defence","leader","justice"],             [52,58,50,52,52], "MPLA President from 2017; anti-corruption drive; dos Santos family prosecution");
  I("Jonas Savimbi",          "UNITA (AO)","e4",["pm","leader","defence"],                      [45,60,50,42,50], "UNITA rebel leader; Cold War US-backed; killed in battle 2002");
  I("Isaías Afwerki",         "TPLF (ET)","e5",["pm","leader","foreign","defence"],             [32,62,35,32,45], "Eritrea founding President from 1993; sealed borders; global pariah; no constitution");
  I("Abiy Ahmed",             "PP (ET)","e7",["pm","leader","foreign","defence"],               [60,52,62,55,55], "PP Ethiopian PM from 2018; Nobel Peace Prize; Tigray war; Oromo politician");

  /* ═══════════════════════════════════════════════════════════════
     LATIN AMERICA — fill and expansion
     ═══════════════════════════════════════════════════════════════ */
  I("Jair Bolsonaro",         "PT (BR)","e7",["pm","leader","defence","home"],                   [45,55,52,40,50], "PSL/PL Captain; Brazil's Trump; COVID denier; January 8 coup attempt");
  I("Fernando Henrique Cardoso","PSDB (BR)","e6",["pm","chancellor","leader","education"],       [62,65,62,62,58], "PSDB sociologist-President; Real Plan; privatisations; 1994–2002");
  I("Dilma Rousseff",         "PT (BR)","e7",["pm","chancellor","energy","leader"],             [50,60,45,50,50], "PT President 2011–16; tortured under dictatorship; impeached for fiscal tricks");
  I("Michel Temer",           "PT (BR)","e7",["pm","deputy","leader","chancellor"],             [42,60,40,42,48], "PMDB VP turned President on Dilma's impeachment; corruption charges");
  I("Geraldo Alckmin",        "PSDB (BR)","e6",["pm","deputy","home","leader"],                 [52,62,48,52,52], "PSDB São Paulo Governor; Lula's VP from 2023; centrist bridge");
  I("Lula da Silva",          "PT (BR)","e5",["pm","leader","work","chancellor"],               [70,65,72,60,65], "PT steelworker-President twice; imprisoned; returned 2023; MBL bête noire");
  I("Aécio Neves",            "PSDB (BR)","e7",["pm","chancellor","leader"],                    [48,55,50,48,48], "PSDB Senator; 2014 runoff against Dilma; cocaine scandal");
  I("Ciro Gomes",             "PT (BR)","e6",["pm","chancellor","leader","foreign"],            [55,60,58,52,52], "PDT third-way candidate; Finance Minister; Lula rival");
  I("Eduardo Cunha",          "PMDB (BR)","e7",["pm","leader","chancellor"],                    [35,55,40,35,42], "PMDB House Speaker; drove Dilma impeachment; corruption conviction");
  I("Sérgio Moro",            "Republican","e7",["pm","justice","leader"],                       [52,55,52,50,50], "Car Wash judge; jailed Lula; Bolsonaro Justice Minister; later senator");
  I("Mauricio Macri",         "Republican","e7",["pm","chancellor","leader","business"],         [52,55,50,50,50], "PRO Argentina President 2015–19; CEO-politician; IMF bailout; economic failure");
  I("Cristina Kirchner",      "Peronist","e7",["pm","chancellor","foreign","leader"],           [60,62,62,52,58], "PJ President 2007–15; corruption conviction; Fernández VP; survived assassination attempt");
  I("Alberto Fernández",      "Peronist","e7",["pm","leader","chancellor","justice"],           [48,55,50,45,48], "PJ President 2019–23; Cristina's frontman; COVID; inflation spiral");
  I("Javier Milei",           "Republican","e7",["pm","chancellor","leader"],                    [55,48,62,48,50], "La Libertad Avanza anarcho-capitalist President from 2023; chainsaw; libertarian shock therapy");
  I("Felipe Calderón",        "PAN (MX)","e7",["pm","leader","home","chancellor"],              [52,58,50,52,50], "PAN President 2006–12; drug war 60,000 dead; disputed election win");
  I("Enrique Peña Nieto",     "PRI (MX)","e7",["pm","leader","chancellor","home"],              [48,55,45,45,48], "PRI President 2012–18; structural reforms; corruption; El Chapo escape");
  I("Andrés Manuel López Obrador","Morena","e6",["pm","leader","chancellor","energy"],          [62,60,65,52,58], "Morena AMLO President 2018–24; fourth transformation; dismantled institutions");
  I("Claudia Sheinbaum",      "Morena","e7",["pm","environment","chancellor","leader"],         [60,55,58,55,55], "Morena President from 2024; climate scientist; first female Mexican President");
  I("Xóchitl Gálvez",        "PAN (MX)","e7",["pm","leader","education","chancellor"],         [58,52,60,52,52], "PAN-PRI-PRD coalition 2024 candidate; indigenous engineer; opposition leader");
  I("Gustavo Petro",          "Colombia Humana","e7",["pm","leader","chancellor","foreign"],    [60,58,65,52,55], "Progressive Colombia President from 2022; ex-M-19 guerrilla; first left president");
  I("Iván Duque",             "CD (CO)","e7",["pm","leader","chancellor","foreign"],            [52,55,50,52,50], "CD President 2018–22; Uribe pupil; conservative; 2021 protests");
  I("Álvaro Uribe",           "CD (CO)","e6",["pm","leader","home","defence"],                  [52,62,52,50,55], "CD President twice 2002–10; hardline anti-FARC; para-military links"); 
  I("Juan Manuel Santos",     "Social Party (CO)","e6",["pm","leader","foreign","defence"],     [58,62,55,58,55], "U President 2010–18; Nobel Peace Prize; FARC peace accord 2016");
  I("Nicolás Maduro",         "PSUV (VE)","e7",["pm","leader","foreign","chancellor"],         [38,58,42,35,48], "PSUV bus-driver-President from 2013; economic collapse; dictatorship; 7 million fled");
  I("Henrique Capriles",      "Primero Venezuela","e7",["pm","leader","chancellor","justice"],  [58,52,60,50,52], "MUD opposition 2012 and 2013 presidential candidate; governorship victory");
  I("Juan Guaidó",            "Primero Venezuela","e7",["pm","leader","foreign"],               [55,48,58,48,50], "AD/VP National Assembly Speaker; proclaimed interim President 2019; US-backed");
  I("María Corina Machado",   "Primero Venezuela","e7",["pm","leader","foreign","justice"],     [62,50,65,50,52], "PV Vente Venezuela opposition leader; primary winner 2023; barred from running");
  I("Sebastián Piñera",       "UDI (CL)","e6",["pm","chancellor","leader","trade"],             [58,60,55,58,55], "RN billionaire Chile President twice 2010–14 and 2018–22; died in helicopter crash 2024");
  I("Gabriel Boric",          "PS (CL)","e7",["pm","leader","environment","work"],              [62,45,62,52,52], "Apruebo Dignidad youngest Chile President from 2022; student protest leader");
  I("José Antonio Kast",      "UDI (CL)","e7",["pm","home","leader","justice"],                 [48,50,52,44,48], "Republican Party Pinochet nostalgist; 2021 run-off candidate");
  I("Ricardo Lagos",          "PS (CL)","e6",["pm","chancellor","education","leader"],          [62,65,62,62,60], "PPD President 2000–06; wagged finger at Pinochet on live TV; built Chile's institutions");
  I("Martín Vizcarra",        "PPK (PE)","e7",["pm","leader","chancellor"],                     [52,52,50,50,48], "Peru President 2018–20; impeached then arrested amid perpetual crisis");
  I("Pedro Castillo",         "Peru Libre","e7",["pm","leader","education"],                    [42,45,42,38,40], "Peru Libre peasant teacher-President 2021–22; self-coup attempt; arrested");
  I("Dina Boluarte",          "Peru Libre","e7",["pm","deputy","leader","justice"],             [42,45,40,40,40], "Peru's first woman President from 2022 amid protest deaths");
  I("Alejandro Toledo",       "PPK (PE)","e6",["pm","leader","chancellor","trade"],             [52,58,52,52,50], "Perú Posible first indigenous President 2001–06; IMF-friendly; US extradition");
  I("Alan García",            "APRA (PE)","e5",["pm","leader","chancellor","foreign"],          [55,60,62,50,55], "APRA President twice 1985–90 and 2006–11; hyperinflation then neo-liberal; shot himself");
  I("Rafael Correa",          "PAIS (EC)","e7",["pm","chancellor","leader","education"],        [60,58,62,55,55], "PAIS Ecuador President 2007–17; Citizens' Revolution; expelled foreign base; economist");
  I("Guillermo Lasso",        "CREO (EC)","e7",["pm","chancellor","leader","business"],         [48,52,45,48,46], "CREO banker President 2021–23; muerte cruzada self-dissolution amid probe");
  I("Daniel Noboa",           "ADN (EC)","e7",["pm","leader","home","chancellor"],              [58,45,58,52,52], "ADN youngest President; banana billionaire heir; declared war on gangs 2024");
  I("Juan Evo Morales",       "MAS (BO)","e6",["pm","leader","agriculture","chancellor"],       [62,60,62,52,58], "MAS coca farmer President 2006–19; first indigenous president; coup or resignation; returned");
  I("Luis Arce",              "MAS (BO)","e7",["pm","chancellor","leader"],                     [52,55,50,52,50], "MAS President from 2020; Finance Minister; survived 2024 coup attempt");
  I("Carlos Mesa",            "MNRV (BO)","e6",["pm","leader","chancellor","foreign"],          [55,58,55,55,52], "MNR-CC VP/President 2003–05; journalist; 2019 opposition challenger");
  I("Nayib Bukele",           "FMLN (SV)","e7",["pm","leader","home","chancellor"],             [62,48,65,52,55], "Nuevas Ideas El Salvador President from 2019; gang crackdown; bitcoin; re-elected");
  I("Xiomara Castro",         "LIBRE (HN)","e7",["pm","leader","chancellor","foreign"],        [58,48,58,50,52], "LIBRE Honduras first woman President from 2022; Mel Zelaya's wife");
  I("Juan Orlando Hernández", "PNH (HN)","e7",["pm","home","leader","chancellor"],             [35,52,40,35,45], "PNH Honduras President 2014–22; drug cartel ties; extradited to USA");
  I("Otto Pérez Molina",      "PP (GT)","e7",["pm","defence","leader","home"],                  [32,52,35,30,40], "PP Guatemala President 2012–15; corruption; imprisoned; ex-general");
  I("Alejandro Giammattei",   "VAMOS (GT)","e7",["pm","leader","health"],                       [40,50,40,38,42], "VAMOS Guatemala President 2020–24; corruption allegations; detained in US");
  I("Bernardo Arévalo",       "Semilla (GT)","e7",["pm","leader","foreign","justice"],          [58,50,58,52,50], "Semilla Guatemala President from 2024; son of first democratic President; survived attempted coup");


  /* ═══════════════════════════════════════════════════════════════
     SOUTH ASIA — India + Pakistan + Bangladesh fill
     ═══════════════════════════════════════════════════════════════ */
  I("Sardar Patel",           "INC","e3",["pm","home","leader","deputy"],                        [62,65,58,62,62], "INC Iron Man; integrated 562 princely states; India's Bismarck");
  I("Jawaharlal Nehru",       "INC","e3",["pm","foreign","chancellor","leader"],                 [68,65,70,65,62], "INC founding PM 1947–64; Non-Aligned Movement; China war; secularism");
  I("Lal Bahadur Shastri",    "INC","e4",["pm","leader","agriculture","home"],                  [60,62,58,60,58], "INC PM 1964–66; Jai Jawan Jai Kisan; 1965 Pakistan war; died Tashkent");
  I("Indira Gandhi",          "INC","e4",["pm","leader","foreign","home"],                      [65,68,65,65,65], "INC PM twice; 1971 Bangladesh war; Emergency; Khalistan; assassinated 1984");
  I("Rajiv Gandhi",           "INC","e5",["pm","leader","technology","foreign"],                [62,58,62,60,58], "INC PM 1984–89; computer revolution; Bofors scandal; assassinated 1991");
  I("P.V. Narasimha Rao",     "INC","e6",["pm","foreign","chancellor","leader"],                [58,72,52,62,58], "INC PM 1991–96; liberalisation with Manmohan Singh; Babri Masjid crisis");
  I("H.D. Deve Gowda",        "INC","e6",["pm","agriculture","leader"],                         [50,60,48,50,50], "JD(S) PM 1996–97; coalition government; Gowda Farms; fell asleep at summits");
  I("I.K. Gujral",            "INC","e6",["pm","foreign","leader"],                             [55,65,52,55,52], "IND PM 1997–98; Gujral Doctrine; soft on Pakistan; veteran diplomat");
  I("Sonia Gandhi",           "INC","e6",["pm","leader","foreign"],                             [52,65,50,52,58], "INC Italian-born President; refused PM role 2004; Congress matriarch");
  I("Rahul Gandhi",           "INC","e7",["pm","leader","work","education"],                    [52,52,52,48,50], "INC leader; Bharat Jodo yatras; scion who struggled to fill Nehru-Gandhi legacy");
  I("Priyanka Gandhi Vadra",  "INC","e7",["pm","leader","education"],                            [55,48,58,48,50], "INC general secretary; Indira's lookalike; entered active politics 2019");
  I("Sharad Pawar",           "INC","e5",["pm","agriculture","leader","chancellor"],             [58,68,55,58,60], "NCP Maharashtra strongman; Agriculture Minister; cricket board boss");
  I("Mulayam Singh Yadav",    "Samajwadi","e5",["pm","leader","defence","home"],                 [52,65,52,50,55], "SP UP CM three times; wrestler politician; OBC champion; India's Netaji");
  I("Lalu Prasad Yadav",      "RJD","e5",["pm","leader","agriculture","railway"],               [55,62,58,50,55], "RJD Bihar CM; Railway Minister; Jungle Raj; fodder scam conviction; charismatic");
  I("Nitish Kumar",           "JD(U)","e6",["pm","leader","agriculture","chancellor"],          [55,62,50,55,55], "JD(U) Bihar CM seven terms; sushasan babu; Niti Aayog ally; India's perennial fence-sitter");
  I("Mamata Banerjee",        "AITC","e6",["pm","leader","railway","home"],                     [62,60,65,55,58], "TMC Bengal CM from 2011; Didi; anti-BJP federalism; anti-CPI(M) firebrand");
  I("Chandrashekhar",         "INC","e5",["pm","leader","chancellor"],                           [52,65,50,52,52], "SP India's walking PM 1990–91; padyatra from Rajasthan to Delhi");
  I("V.P. Singh",             "INC","e5",["pm","leader","chancellor","work"],                   [58,62,55,55,52], "Janata Dal PM 1989–90; Mandal Commission; upper caste backlash destroyed him");
  I("Chandra Shekhar Singh",  "BJP","e5",["pm","leader"],                                        [48,60,50,48,48], "Samajwadi PM 1990–91; Congress-supported minority government; anti-establishmentarian");
  I("Sushma Swaraj",          "BJP","e6",["pm","foreign","leader","health"],                    [62,62,65,60,58], "BJP Foreign Minister; Delhi CM; masterful parliamentary orator; Twitter diplomat");
  I("Arun Jaitley",           "BJP","e6",["pm","chancellor","justice","leader"],                [58,60,55,58,58], "BJP Finance and Defence Minister; party intellectual; GST architect; died 2019");
  I("Rajnath Singh",          "BJP","e6",["pm","home","defence","leader"],                      [55,65,52,55,58], "BJP Defence Minister; Home Minister; UP CM; senior RSS pracharak");
  I("Yogi Adityanath",        "BJP","e7",["pm","home","leader","culture"],                      [45,52,52,42,50], "BJP monk-CM of UP; Hindutva; anti-cow slaughter; bulldozer politics");
  I("Smriti Irani",           "BJP","e7",["pm","education","culture","leader"],                 [55,52,58,50,52], "BJP soap-opera actor turned minister; defeated Rahul Gandhi Amethi 2019");
  I("Nirmala Sitharaman",     "BJP","e7",["pm","chancellor","defence","trade"],                 [55,58,52,55,52], "BJP Finance Minister from 2019; first full-term woman FM; 6 budgets");
  I("Arvind Kejriwal",        "AAP","e7",["pm","chancellor","leader","health"],                 [60,52,62,52,55], "AAP anti-corruption activist-CM of Delhi; Gujarat elections; arrested 2024");
  I("Bhagwant Mann",          "AAP","e7",["pm","leader","chancellor","agriculture"],            [56,48,58,50,52], "AAP Punjab CM; comedian-politician; liquor policy co-accused");
  I("Asim Munir",             "PTI (PK)","e7",["pm","defence","leader"],                         [32,55,30,32,40], "Pakistan Army Chief from 2022; anti-Imran Khan; coup enabler"); 
  I("Pervaiz Elahi",          "PML-Q (PK)","e6",["pm","leader","chancellor"],                   [48,58,45,48,48], "PML-Q Punjab CM; allied with Imran Khan late career; arrested");
  I("Aitzaz Ahsan",           "PPP (PK)","e5",["pm","justice","leader"],                        [58,62,60,55,55], "PPP lawyers' movement leader; Benazir's defender; Senate president");
  I("Fazlur Rehman",          "PML-N (PK)","e5",["pm","leader","education","foreign"],          [45,65,48,45,48], "JUI-F Mullah Diesel; religious coalition kingmaker; anti-Imran march");
  I("Asif Ali Zardari",       "PPP (PK)","e6",["pm","leader","chancellor"],                     [42,62,40,40,45], "PPP President 2008–13; Benazir's husband; Mr Ten Percent; from jail to presidency");
  I("Bilawal Bhutto Zardari", "PPP (PK)","e7",["pm","foreign","leader","chancellor"],           [55,50,58,50,52], "PPP Oxford-educated Foreign Minister; Benazir's son; youngest PPP chairman");
  I("Shehbaz Sharif",         "PML-N (PK)","e6",["pm","chancellor","leader","work"],            [52,62,50,52,52], "PML-N PM 2022–24; Punjab CM three times; more pragmatic than Nawaz");
  I("Sheikh Hasina",          "Awami League (BD)","e5",["pm","leader","foreign","chancellor"],  [58,68,55,58,60], "AL PM 1996–2001 and 2009–24; Bangladesh's Iron Lady; fled India amid uprising 2024");
  I("Khaleda Zia",            "BNP (BD)","e5",["pm","leader","chancellor"],                     [52,62,50,52,52], "BNP PM twice; Zia's widow; imprisoned for corruption by Hasina");
  I("Matiur Rahman Nizami",   "Jamaat-e-Islami (BD)","e5",["pm","leader"],                      [30,52,35,28,40], "Jamaat leader; 1971 Bangladesh war crimes conviction; hanged 2016");
  I("Muhammad Yunus",         "Jatiya (BD)","e7",["pm","chancellor","leader","education"],      [62,58,62,58,52], "Nobel laureate; microcredit pioneer; Bangladesh interim PM from 2024 after Hasina fled");

  /* ═══════════════════════════════════════════════════════════════
     CHINA — additional CPC historical
     ═══════════════════════════════════════════════════════════════ */
  I("Zhou Enlai",             "Chinese Communist Party","e3",["pm","foreign","chancellor","leader"],[68,70,65,68,65], "CPC Premier 1949–76; revolutionary; Cultural Revolution survivor; Kissinger's interlocutor");
  I("Liu Shaoqi",             "Chinese Communist Party","e3",["pm","leader","chancellor"],       [55,65,52,58,60], "CPC State Chairman; Mao's heir apparent; purged in Cultural Revolution; persecuted to death");
  I("Lin Biao",               "Chinese Communist Party","e3",["pm","defence","leader"],          [45,62,40,42,48], "CPC Defence Minister; Little Red Book promoter; fled to Mongolia and died 1971");
  I("Peng Dehuai",            "Chinese Communist Party","e3",["pm","defence","leader"],          [55,65,52,55,55], "CPC General; Korean War commander; criticized Mao; purged at Lushan 1959");
  I("Hua Guofeng",            "Chinese Communist Party","e4",["pm","leader","chancellor"],       [45,60,42,45,48], "CPC Chairman 1976–78; 'Whatever Faction'; arrested Gang of Four; outmanoeuvred by Deng");
  I("Ye Jianying",            "Chinese Communist Party","e3",["pm","defence","leader"],          [55,65,50,52,55], "CPC Marshal; arrested Gang of Four 1976; key to Deng Xiaoping's return");
  I("Zhao Ziyang",            "Chinese Communist Party","e5",["pm","chancellor","leader","trade"],[58,65,55,60,55], "CPC PM 1980–87; GS 1987–89; Tiananmen square reformist; died under house arrest 2005");
  I("Hu Yaobang",             "Chinese Communist Party","e5",["pm","leader","education","foreign"],[62,60,60,58,55], "CPC General Secretary 1982–87; reformist; death triggered Tiananmen protests");
  I("Li Peng",                "Chinese Communist Party","e5",["pm","chancellor","energy","leader"],[35,65,35,42,48], "CPC PM 1987–98; Tiananmen massacre declared; 'Butcher of Beijing'");
  I("Zhu Rongji",             "Chinese Communist Party","e6",["pm","chancellor","trade","leader"],[62,68,58,62,60], "CPC PM 1998–2003; WTO accession; anti-corruption; dragon economy architect");
  I("Wen Jiabao",             "Chinese Communist Party","e7",["pm","chancellor","leader","education"],[60,65,58,60,58], "CPC PM 2003–13; 'Grandpa Wen'; Sichuan earthquake; stimulus plan");
  I("Hu Jintao",              "Chinese Communist Party","e7",["pm","leader","foreign","chancellor"],[52,68,48,55,58], "CPC President 2003–13; 'Scientific Development'; removed himself forcibly at Congress 2022");
  I("Li Keqiang",             "Chinese Communist Party","e7",["pm","chancellor","leader","health"],[55,65,50,55,55], "CPC PM 2013–23; 'Li Economics'; GDP tracker; died suddenly Oct 2023");
  I("Wang Qishan",            "Chinese Communist Party","e7",["pm","chancellor","justice","leader"],[55,65,52,55,58], "CPC anti-corruption tsar; VP; Xi's most trusted ally; Tianjin PM");
  I("Bo Xilai",               "Chinese Communist Party","e7",["pm","leader","justice","home"],   [52,60,55,50,52], "CPC Chongqing party boss; Maoist revival; wife poisoned Briton; life sentence");
  I("Sun Zhengcai",           "Chinese Communist Party","e7",["pm","agriculture","leader"],      [48,55,45,46,48], "CPC Chongqing successor to Bo; potential Xi rival; convicted corruption");
  I("Zhang Gaoli",            "Chinese Communist Party","e6",["pm","chancellor","leader","energy"],[45,62,40,45,48], "CPC Politburo Standing Committee; Peng Shuai's accuser; #MeToo");
  I("Chen Quanguo",           "Chinese Communist Party","e7",["pm","leader","home"],             [30,58,28,30,42], "CPC Xinjiang party chief; Uighur mass detention architect; sanctioned by West");
  I("Wang Yi",                "Chinese Communist Party","e7",["pm","foreign","leader"],           [52,65,50,52,52], "CPC Foreign Minister from 2013; wolf warrior's superior; State Councillor");
  I("Yang Jiechi",            "Chinese Communist Party","e6",["pm","foreign","leader"],           [50,65,48,50,50], "CPC State Councillor for foreign affairs; Alaska summit 'Wolf Warrior' speech 2021");
  I("Qin Gang",               "Chinese Communist Party","e7",["pm","foreign","leader"],           [48,55,45,45,45], "CPC Foreign Minister 2022–23; disappeared amid scandal; replaced by Wang Yi");
  I("Li Qiang",               "Chinese Communist Party","e7",["pm","chancellor","trade","leader"],[52,60,50,52,52], "CPC PM from 2023; Shanghai COVID lockdown architect; Xi ally");
  I("Cai Qi",                 "Chinese Communist Party","e7",["pm","leader","home"],              [45,58,40,44,48], "CPC Politburo Standing Committee; Xi's campaign manager; ideological enforcer");
  I("Ding Xuexiang",          "Chinese Communist Party","e7",["pm","chancellor","leader"],        [48,55,45,46,48], "CPC VP from 2023; Xi's chief of staff; shadow PM");
  I("Xi Jinping",             "Chinese Communist Party","e7",["pm","leader","foreign","defence"], [52,65,50,55,62], "CPC President from 2013; absolute power; Hong Kong; Taiwan threats; Belt and Road");

  /* ═══════════════════════════════════════════════════════════════
     RUSSIA / SOVIET UNION — fill
     ═══════════════════════════════════════════════════════════════ */
  I("Georgy Malenkov",        "CPSU","e3",["pm","leader","chancellor"],                          [48,62,45,48,50], "CPSU Stalin's brief successor 1953; 'New Course'; ousted by Khrushchev");
  I("Lavrentiy Beria",        "CPSU","e3",["pm","home","leader","intelligence"],                 [28,60,30,30,40], "CPSU NKVD chief; nuclear programme; arrested and shot 1953");
  I("Vyacheslav Molotov",     "CPSU","e3",["pm","foreign","chancellor","leader"],                [45,68,42,48,50], "CPSU PM 1930–41; Foreign Minister; Molotov-Ribbentrop Pact");
  I("Kliment Voroshilov",     "CPSU","e3",["pm","defence","leader"],                             [40,65,38,40,42], "CPSU Defence Commissar; bungled Finland war; Stalin loyalist");
  I("Lazar Kaganovich",       "CPSU","e3",["pm","work","leader","transport"],                    [35,62,35,35,42], "CPSU industrialisation architect; Holodomor participant; transport infrastructure");
  I("Nikolai Bulganin",       "CPSU","e3",["pm","leader","defence"],                             [42,60,40,42,45], "CPSU PM 1955–58; 'B&K'; ousted by Khrushchev");
  I("Anastas Mikoyan",        "CPSU","e3",["pm","trade","foreign","leader"],                     [52,65,50,52,52], "CPSU Trade Minister; survived every purge; from Ilyich to Ilyich without a crisis");
  I("Aleksei Kosygin",        "CPSU","e4",["pm","chancellor","leader","trade"],                  [52,65,48,52,50], "CPSU PM 1964–80; Kosygin reforms; competed with Brezhnev; tech modernisation");
  I("Nikolai Podgorny",       "CPSU","e4",["pm","leader","chancellor"],                          [45,60,42,45,45], "CPSU President 1965–77; nominal head of state under Brezhnev");
  I("Yuri Andropov",          "CPSU","e5",["pm","leader","intelligence","foreign"],              [52,68,48,55,55], "CPSU GS 1982–84; KGB chief; died after 15 months; Gorbachev patron");
  I("Konstantin Chernenko",   "CPSU","e5",["pm","leader","chancellor"],                          [38,65,35,38,42], "CPSU GS 1984–85; geriatric stopgap; died 13 months later");
  I("Vladimir Kryuchkov",     "CPSU","e5",["pm","intelligence","leader","defence"],              [35,60,32,35,40], "CPSU KGB chief; 1991 August coup leader; arrested; amnestied");
  I("Yegor Gaidar",           "United Russia","e6",["pm","chancellor","leader","trade"],         [55,58,52,55,50], "Russia acting PM 1992; shock therapy architect; privatisation; inflation");
  I("Viktor Chernomyrdin",    "United Russia","e6",["pm","chancellor","energy","leader"],        [52,65,48,52,55], "Russia PM 1992–98; Gazprom founder; 'We wanted it better but it came out as always'");
  I("Sergei Kiriyenko",       "United Russia","e6",["pm","chancellor","leader"],                 [50,55,48,50,48], "Russia PM 1998; 1998 default; youngest PM since Molotov; later APN chief");
  I("Yevgeny Primakov",       "United Russia","e6",["pm","foreign","intelligence","leader"],     [58,68,55,58,55], "Russia PM 1998–99; intelligence chief; foreign minister; U-turn over Atlantic");
  I("Sergei Stepashin",       "United Russia","e6",["pm","home","justice","leader"],             [50,60,48,50,50], "Russia PM May–Aug 1999; Chechen war; cleared way for Putin");
  I("Mikhail Mishustin",      "United Russia","e7",["pm","chancellor","leader","health"],        [52,58,50,52,52], "Russia PM from 2020; Federal Tax Service digitaliser; loyal technocrat");
  I("Sergei Lavrov",          "United Russia","e7",["pm","foreign","leader"],                    [42,68,45,42,48], "Russia Foreign Minister from 2004; UN Ambassador; sharp tongue");
  I("Sergei Shoigu",          "United Russia","e7",["pm","defence","leader","home"],             [38,62,35,38,42], "Russia Defence Minister 2012–24; Emergencies founder; removed after Wagner mutiny");
  I("Alexander Lukashenko",   "United Russia","e6",["pm","leader","agriculture","chancellor"],   [35,65,40,35,48], "Belarus President from 1994; last European dictator; Minsk protocols; ally of Russia");
  I("Sviatlana Tsikhanouskaya","Party of Regions (UA)","e7",["pm","leader","justice","foreign"], [58,45,60,50,50], "Belarus opposition leader in exile; 2020 election likely winner; symbol of resistance");
  I("Nikolai Patrushev",      "United Russia","e6",["pm","defence","intelligence","leader"],     [30,65,28,30,40], "Russia Security Council; KGB/FSB chief; Putin's ideologist; ultranationalist");
  I("Ramzan Kadyrov",         "United Russia","e7",["pm","leader","home","defence"],             [35,52,42,32,45], "Chechen Republic Head; strongman; TikTok general; Putin's enforcer");
  I("Evgeny Prigozhin",       "United Russia","e7",["pm","business","leader","defence"],         [40,50,48,38,45], "Wagner Group founder; Concord catering; mutiny June 2023; plane crash death");
  I("Alexei Navalny",         "United Russia","e7",["pm","leader","justice","chancellor"],       [65,52,68,55,55], "Opposition leader; FBK anti-corruption; poisoned; died in Arctic Circle colony 2024");
  I("Mikhail Prokhorov",      "United Russia","e7",["pm","business","leader","chancellor"],      [50,52,52,48,48], "Billionaire 2012 presidential candidate; NBA owner; opposition-friendly oligarch");
  I("Mikhail Khodorkovsky",   "United Russia","e6",["pm","business","chancellor","leader"],      [55,58,52,52,50], "Yukos oligarch; richest Russian; imprisoned by Putin 2003; exiled; opposition funder");
  I("Gary Kasparov",          "United Russia","e7",["pm","leader","chancellor","education"],     [62,52,65,52,52], "Chess grandmaster; Opposition Coalition leader; 'Dark Side' column writer");
  I("Grigory Yavlinsky",      "United Russia","e6",["pm","chancellor","leader","education"],     [55,58,55,52,50], "Yabloko liberal economist; consistent Putin critic; 500 Days programme");
  I("Vladimir Zhirinovsky",   "LDPR (RU)","e6",["pm","leader","foreign","defence"],              [45,60,55,40,50], "LDPR ultranationalist; bombastic showman; 'Liberal' Democrat paradox; died 2022");

  /* ═══════════════════════════════════════════════════════════════
     PHILIPPINES — proper parties
     ═══════════════════════════════════════════════════════════════ */
  I("Ferdinand Marcos",       "Nacionalista (PH)","e4",["pm","defence","leader"],                [52,68,55,52,52], "Philippines strongman 1965–86; kleptocracy; People Power overthrown");
  I("Corazon Aquino",         "Liberal Party (PH)","e5",["pm","leader","justice"],               [62,55,60,56,52], "Philippines People Power President 1986–92; housewife to head of state");
  I("Fidel Ramos",            "Lakas (PH)","e6",["pm","defence","leader"],                       [58,65,52,58,55], "Lakas President 1992–98; military general; ASEAN chair; moderniser");
  I("Joseph Estrada",         "PDP-Laban (PH)","e7",["pm","leader"],                             [50,55,52,42,48], "LAMP actor-President 1998–2001; People Power II ousted him; plunder conviction");
  I("Gloria Macapagal Arroyo","Lakas (PH)","e7",["pm","chancellor","leader"],                    [55,68,52,58,52], "GMA President 2001–10; economics PhD; wiretap scandal; economy grew steadily");
  I("Benigno Aquino III",     "Liberal Party (PH)","e7",["pm","leader","justice"],               [58,58,55,55,52], "LP President 2010–16; Cory's son; Spratlys ICJ win; Yolanda typhoon");
  I("Rodrigo Duterte",        "PDP-Laban (PH)","e7",["pm","home","leader"],                      [45,55,50,42,48], "PDP President 2016–22; drug war 6,000 dead; Davao death squad; ICC charges");
  I("Ferdinand Marcos Jr.",   "Partido Federal (PH)","e7",["pm","agriculture","leader"],          [45,52,45,42,48], "Partido Federal President from 2022; dictator's son; 31 million votes");
  I("Leni Robredo",           "Liberal Party (PH)","e7",["pm","justice","leader","deputy"],       [60,55,58,55,52], "LP VP 2016–22; 2022 presidential candidate; anti-corruption champion");
  I("Rodrigo Duterte Jr.",    "PDP-Laban (PH)","e7",["pm","home","leader"],                      [40,45,42,38,42], "Sara Duterte: VP from 2022; resigned from Marcos coalition 2024");
  I("Alan Peter Cayetano",    "Lakas (PH)","e7",["pm","foreign","leader"],                        [48,55,48,46,46], "Lakas Foreign Secretary; House Speaker; Duterte ally");
  I("Manny Pacquiao",         "PDP-Laban (PH)","e7",["pm","leader","work"],                      [55,48,52,46,46], "PDP Senator; boxing champion; 2022 presidential candidate; born-again Christian");

  /* ═══════════════════════════════════════════════════════════════
     VIETNAM — correct party label
     ═══════════════════════════════════════════════════════════════ */
  I("Le Duan",                "CPV (VN)","e3",["pm","leader","defence"],                         [45,65,42,45,50], "CPV General Secretary 1960–86; hardliner; collectivisation disaster");
  I("Le Duc Tho",             "CPV (VN)","e4",["pm","foreign","leader","defence"],               [50,65,48,50,52], "CPV Politburo; Paris Peace Accords; refused Nobel Prize; reeducation camps");
  I("Truong Chinh",           "CPV (VN)","e3",["pm","leader","education"],                       [42,62,40,42,45], "CPV Chairman briefly 1986; land reform disasters; Maoist; replaced by Linh");
  I("Vo Van Kiet",            "CPV (VN)","e6",["pm","chancellor","leader","trade"],               [58,62,52,55,52], "CPV PM 1991–97; doi moi acceleration; foreign investment champion");
  I("Nong Duc Manh",          "CPV (VN)","e6",["pm","leader","agriculture"],                     [42,60,40,42,45], "CPV General Secretary 2001–11; alleged son of Ho Chi Minh; cautious");
  I("Nguyen Phu Trong",       "CPV (VN)","e7",["pm","leader","chancellor","justice"],            [45,68,42,45,48], "CPV General Secretary 2011–24; anti-corruption 'blazing furnace'; died July 2024");

  /* ═══════════════════════════════════════════════════════════════
     ADDITIONAL WORLD — historical wildcard figures
     ═══════════════════════════════════════════════════════════════ */
  I("Simon Bolivar",          "Democrat","e0",["pm","defence","foreign","leader"],               [72,62,72,65,65], "El Libertador; freed six South American nations; Gran Colombia; died disillusioned");
  I("José de San Martín",     "Democrat","e0",["pm","defence","leader"],                          [65,60,60,62,60], "Liberator of Argentina, Chile, Peru; voluntarily stepped aside for Bolívar");
  I("Toussaint Louverture",   "Democrat","e0",["pm","defence","leader","justice"],               [68,60,65,62,60], "Haitian Revolution leader; freed slaves; captured by Napoleon; died in prison");
  I("Jean-Jacques Dessalines","Democrat","e0",["pm","defence","leader"],                          [55,55,55,50,52], "Haiti Emperor after Louverture; first Black state in Western hemisphere");
  I("Simón Bolivar Jr.",      "Democrat","e0",["pm","leader"],                                    [50,45,50,45,48], "Failed inheritor of the Bolivarian legacy");
  I("Emiliano Zapata",        "Democrat","e2",["pm","agriculture","leader","defence"],           [62,50,65,52,55], "Mexican revolutionary; Tierra y Libertad; Plan de Ayala; assassinated 1919");
  I("Pancho Villa",           "Democrat","e2",["pm","defence","leader"],                          [55,48,60,45,50], "Mexican revolutionary general; raided Columbus New Mexico; Pershing expedition");
  I("Benito Juárez",          "Democrat","e1",["pm","justice","leader","chancellor"],            [62,60,58,60,58], "Mexico's Lincoln; Reform War; repelled French intervention; Amerindian President");
  I("José Martí",             "Democrat","e1",["pm","leader","culture","foreign"],               [68,52,72,55,55], "Cuba's national hero; poet-revolutionary; died in first battle of independence 1895");
  I("Marcus Garvey",          "Democrat","e2",["pm","leader","culture","trade"],                 [65,50,70,50,55], "Jamaica/USA pan-African leader; Back to Africa movement; UNIA founder");
  I("Kwame Nkrumah",          "INC","e4",["pm","leader","foreign","chancellor"],                 [65,60,65,62,58], "Ghana's first PM/President; Pan-Africanism; 'Seek ye first the political kingdom'");
  I("Patrice Lumumba",        "UDPS (CD)","e4",["pm","leader","foreign","chancellor"],           [62,50,68,52,52], "Congo's first PM; overthrown; murdered by Belgian/CIA plot 1961; independence martyr");
  I("Frantz Fanon",           "FLN (DZ)","e4",["pm","justice","leader","health"],               [62,50,68,50,50], "Martiniquais psychiatrist-revolutionary; Wretched of the Earth; FLN member; died Bethesda");
  I("Amilcar Cabral",         "MPLA (AO)","e4",["pm","agriculture","leader","defence"],         [65,52,65,55,55], "Guinea-Bissau/Cape Verde liberation leader; agronomist-revolutionary; assassinated 1973");
  I("Samora Machel Sr.",      "Frelimo (MZ)","e4",["pm","leader","defence","education"],        [58,55,60,52,55], "Frelimo Mozambique's founding President; socialist; died air crash 1986");
  I("Julius Nyerere",         "CCM (TZ)","e4",["pm","leader","education","chancellor"],         [65,62,65,62,60], "Tanzania founding President; Ujamaa socialism; Mwalimu teacher; dignified exit 1985");
  I("Kenneth Kaunda",         "UNITA (AO)","e4",["pm","leader","foreign","education"],          [60,62,58,58,55], "Zambia founding President 1964–91; Humanism; anti-apartheid; peaceful handover");
  I("Robert Mugabe",          "ZANUPF (ZW)","e4",["pm","leader","chancellor","education"],      [45,68,55,45,55], "ZANU Zimbabwe liberation hero turned kleptocrat; land seizures; hyper-inflation; 2017 coup");
  I("Joshua Nkomo",           "ZAPU (ZW)","e4",["pm","leader","defence","foreign"],             [60,60,58,55,55], "ZAPU Zimbabwe's other liberation father; Gukurahundi massacres; Zimbabwe's Mandela denied");
  I("Nelson Mandela",         "ANC","e5",["pm","leader","justice","foreign"],                    [85,68,80,78,72], "ANC President; 27 years Robben Island; Truth & Reconciliation; Nobel 1993");
  I("Steve Biko",             "ANC","e5",["pm","leader","education","justice"],                  [68,48,72,60,55], "Black Consciousness pioneer; died in police custody 1977; Cry Freedom");
  I("Chris Hani",             "ANC","e5",["pm","defence","leader","work"],                       [65,52,68,58,58], "SACP/ANC MK commander; most popular ANC leader; assassinated 1993; almost derailed transition");
  I("Oliver Tambo",           "ANC","e4",["pm","leader","foreign","education"],                  [65,62,62,60,60], "ANC President in exile 1967–91; built international solidarity; Mandela's law partner");
  I("Walter Sisulu",          "ANC","e4",["pm","leader","work","justice"],                       [60,62,58,58,55], "ANC Secretary General; Rivonia Trial; 26 years Robben Island; Mandela's closest comrade");
  I("Desmond Tutu",           "ANC","e5",["pm","leader","justice","education"],                  [75,60,80,68,60], "ANC-aligned Archbishop; Truth & Reconciliation Chair; 'Rainbow Nation'; Nobel 1984");
  I("Mohandas Gandhi",        "INC","e2",["pm","leader","justice","trade"],                      [78,62,75,70,68], "INC Mahatma; non-violent resistance; Salt March; Partition; assassinated 1948");
  I("B.R. Ambedkar",         "INC","e3",["pm","justice","education","chancellor"],              [68,65,65,65,60], "Dalit champion; India's Constitution architect; converted to Buddhism; Law Minister");

  /* ═══════════════════════════════════════════════════════════════
     MISCELLANEOUS FILL — underrepresented regions
     ═══════════════════════════════════════════════════════════════ */
  I("Rodrigo Chaves",         "PUSC (CR)","e7",["pm","chancellor","leader"],                    [52,50,55,50,48], "PPSD Costa Rica President from 2022; World Bank economist; combative style");
  I("Carlos Alvarado Quesada","PUSC (CR)","e7",["pm","chancellor","environment","leader"],      [56,52,55,54,52], "PAC Costa Rica President 2018–22; decarbonisation leader; young progressive");
  I("Luis Abinader",          "PRM (DO)","e7",["pm","chancellor","leader","trade"],              [55,52,52,52,50], "Dominican Republic President from 2020; business family; anti-corruption");
  I("Danilo Medina",          "PRSC (DO)","e6",["pm","education","leader","chancellor"],        [52,58,50,52,50], "Dominican PLD President 2012–20; social programmes; failed third term attempt");
  I("Moise Jean-Charles",     "FANMI (HT)","e7",["pm","leader","chancellor"],                    [42,45,45,38,40], "Haiti opposition senator; anti-corruption; political violence context");
  I("Ariel Henry",            "RDNP (HT)","e7",["pm","leader","health"],                         [40,48,38,38,40], "Haiti PM 2021–24; neurosurgeon; gang war forced resignation; Kenya intervention");
  I("Luis Arce Catacora",     "MAS (BO)","e7",["pm","chancellor","leader","trade"],             [52,55,50,52,50], "MAS Bolivia President from 2020; Evo's finance minister; survived coup 2024");
  I("Edwin Yarborough",       "Republican","e7",["pm","leader","justice"],                        [48,50,48,46,46], "US Senator conservative; death penalty champion; judiciary committee");
  I("Bola Tinubu",            "APC (NG)","e7",["pm","leader","chancellor","trade"],             [48,60,50,45,52], "Nigeria APC President from 2023; Lagos godfather; 'Emi lokan' my turn; health questions");
  I("Peter Obi",              "LP (NG)","e7",["pm","chancellor","leader","trade"],               [58,55,55,55,52], "LP Labour Party 2023 presidential candidate; Anambra Governor; Obidients movement");
  I("Atiku Abubakar",         "PDP (NG)","e6",["pm","deputy","chancellor","leader","trade"],    [50,65,48,50,52], "PDP VP 1999–2007; eight-time presidential candidate; Waziri Adamawa");
  I("Muhammadu Buhari",       "APC (NG)","e5",["pm","defence","leader","agriculture"],          [40,65,38,38,42], "APC Nigeria President 2015–23; 1983 military ruler; sickly; anti-corruption rhetoric");
  I("Olusegun Obasanjo",      "PDP (NG)","e5",["pm","leader","agriculture","defence"],          [52,68,50,52,55], "PDP President 1999–2007; former military ruler; Africa Union chairman");
  I("Goodluck Jonathan",      "PDP (NG)","e7",["pm","leader","chancellor","environment"],       [52,58,50,52,50], "PDP President 2010–15; gracious concession; first peaceful transfer Nigeria");
  I("Emmerson Mnangagwa",     "ZANUPF (ZW)","e6",["pm","leader","chancellor","defence"],        [35,65,38,38,45], "ZANU-PF President from 2017; 'Crocodile'; Gukurahundi role; coup against Mugabe");
  I("Hakainde Hichilema",     "UNITA (AO)","e7",["pm","chancellor","leader","agriculture"],     [55,55,52,52,50], "UPND Zambia President from 2021; sixth time lucky; cattle farmer billionaire");
  I("William Ruto",           "NPP (GH)","e7",["pm","leader","agriculture","chancellor"],       [52,55,50,50,50], "UDA Kenya President from 2022; chicken seller to president; 'hustler' campaign");
  I("Raila Odinga",           "NDC (GH)","e6",["pm","leader","foreign","chancellor"],           [58,65,55,55,55], "ODM Kenya's perennial opposition leader; PM 2008–13; Luo leader; AU Commission bid");
  I("John Mahama",            "NDC (GH)","e7",["pm","chancellor","leader","infrastructure"],    [55,60,52,52,52], "Ghana NDC President 2012–17; re-elected 2024; infrastructure; power cuts");
  I("Nana Akufo-Addo",        "NPP (GH)","e6",["pm","chancellor","foreign","leader"],           [55,60,55,56,52], "NPP Ghana President 2017–25; human rights lawyer; 'Ghana beyond aid'; e-levy");
  I("Uhuru Kenyatta",         "Jubilee (KE)","e7",["pm","chancellor","leader"],                 [50,58,50,50,50], "Jubilee Kenya President 2013–22; ICC indictment; son of founding father");
  I("Daniel arap Moi",        "KANU (KE)","e5",["pm","leader","education","chancellor"],        [35,68,38,35,45], "KANU Kenya President 1978–2002; Nyayo; authoritarian; multi-party forced on him");
  I("Jomo Kenyatta",          "KANU (KE)","e4",["pm","leader","agriculture","foreign"],         [62,60,58,60,60], "KANU Kenya founding PM then President; Mau Mau accused; independence hero");
  I("Abdirahman Mohamed Farole","CCM (TZ)","e7",["pm","leader","justice"],                      [48,50,45,46,46], "Puntland President; Somali federalism champion");

  /* ═══════════════════════════════════════════════════════════════
     MORE ASIA — Indonesia fill
     ═══════════════════════════════════════════════════════════════ */
  I("Sukarno",                "Golkar (ID)","e3",["pm","leader","culture","foreign"],            [68,60,72,58,62], "Indonesia founding President 1945–67; Non-Aligned; Guided Democracy; Suharto coup");
  I("Suharto",                "Golkar (ID)","e4",["pm","leader","defence","chancellor"],         [38,68,40,40,52], "Golkar President 1967–98; New Order; 1965 massacres; Asia Tiger; 1998 crisis");
  I("B.J. Habibie",           "Golkar (ID)","e6",["pm","chancellor","education","leader"],       [60,65,58,60,55], "Golkar President 1998–99; engineer; East Timor referendum; democracy transition");
  I("Abdurrahman Wahid",      "PDI-P (ID)","e6",["pm","leader","justice","foreign"],             [60,60,60,58,52], "PKB Gus Dur President 1999–2001; Islamic scholar; pluralism; impeached");
  I("Susilo Bambang Yudhoyono","Demokrat (ID)","e6",["pm","defence","chancellor","leader"],      [60,65,58,62,58], "Democrat President 2004–14; SBY; general-turned-democrat; corruption fight");
  I("Prabowo Subianto",       "Gerindra (ID)","e7",["pm","defence","leader"],                    [52,62,48,52,52], "Gerindra President from 2024; lost 2019 and 2024 then won 2024; ex-Suharto son-in-law");
  I("Anies Baswedan",         "PKR (MY)","e7",["pm","education","leader"],                       [58,55,58,55,52], "PKS-PKB Jakarta Governor; 2024 presidential candidate; Islamic-progressive coalition");
  I("Ganjar Pranowo",         "PDI-P (ID)","e7",["pm","chancellor","agriculture","leader"],      [55,55,52,52,52], "PDI-P 2024 presidential candidate; Central Java Governor; PDI-P's Jokowi rival");

  /* ═══════════════════════════════════════════════════════════════
     ADDITIONAL EUROPEAN fill — missing parties
     ═══════════════════════════════════════════════════════════════ */
  I("Willy Brandt",           "SPD","e4",["pm","foreign","chancellor","leader"],                 [72,68,70,68,65], "SPD Chancellor 1969–74; Ostpolitik; knelt at Warsaw Ghetto; Nobel 1971");
  I("Helmut Schmidt",         "SPD","e5",["pm","chancellor","foreign","leader"],                 [65,70,62,68,62], "SPD Chancellor 1974–82; Mogadishu; Euromissiles; pushed out by FDP");
  I("Gerhard Schröder",       "SPD","e7",["pm","chancellor","work","leader"],                    [60,62,58,60,58], "SPD Chancellor 1998–2005; Hartz IV; Agenda 2010; Gazprom boards post-office");
  I("Oskar Lafontaine",       "SPD","e6",["pm","chancellor","leader","work"],                    [60,62,62,55,58], "SPD Finance Minister; quit after 5 months; founded Die Linke with Gysi");
  I("Franz Josef Strauss",    "CDU/CSU","e5",["pm","chancellor","defence","leader"],             [58,68,60,58,60], "CSU Bavarian Minister-President; Defence Minister; Spiegel Affair; nuclear hawk");
  I("Kurt Georg Kiesinger",   "CDU/CSU","e4",["pm","chancellor","leader","foreign"],             [52,65,52,55,55], "CDU Chancellor 1966–69; Grand Coalition; former Nazi NSDAP member");
  I("Walter Scheel",          "FDP","e4",["pm","foreign","chancellor","leader"],                 [60,62,58,58,55], "FDP President; Foreign Minister; Brandt coalition architect; sang Hoch auf dem gelben Wagen");
  I("Hans-Dietrich Genscher", "FDP","e5",["pm","foreign","leader"],                              [65,70,60,65,60], "FDP Foreign Minister 1974–92; Genscherism; German reunification architect");
  I("Otto Lambsdorff",        "FDP","e5",["pm","chancellor","leader","trade"],                   [55,62,52,55,52], "FDP Economics Minister; Lambsdorff Paper; ended SPD-FDP coalition");
  I("Christian Lindner",      "FDP","e7",["pm","chancellor","leader","education"],               [55,52,55,52,52], "FDP leader; Finance Minister 2021–24; traffic light coalition collapse");
  I("Joschka Fischer",        "Greens (DE)","e6",["pm","foreign","leader","environment"],        [65,60,65,60,58], "Greens Foreign Minister 1998–2005; helped legitimise Kosovo bombing; former street fighter");
  I("Robert Habeck",          "Greens (DE)","e7",["pm","environment","chancellor","leader"],     [58,52,60,55,52], "Greens Economy Minister; coalition partner; heat pump wars; philosopher");
  I("Annalena Baerbock",      "Greens (DE)","e7",["pm","foreign","environment","leader"],        [58,50,58,52,52], "Greens 2021 chancellor candidate; Foreign Minister; plagiarism scandal recovered");
  I("Rolf Mützenich",         "SPD","e7",["pm","leader","foreign","defence"],                    [50,58,50,50,52], "SPD parliamentary group chair; Ukraine-Russia 'freeze' proposal");
  I("Lars Klingbeil",         "SPD","e7",["pm","leader","chancellor"],                            [50,52,50,50,52], "SPD co-leader; party secretary-general; moderniser");
  I("Katarina Barley",        "SPD","e7",["pm","justice","leader","health"],                     [52,52,52,50,50], "SPD Justice Minister; EP VP; German-British feminist jurist");
  I("Alice Weidel",           "AfD (DE)","e7",["pm","chancellor","leader","home"],               [45,50,52,42,50], "AfD leader from 2022; Goldman Sachs economist; openly gay far-right");
  I("Alexander Gauland",      "AfD (DE)","e6",["pm","leader","home","culture"],                  [40,60,50,38,48], "AfD co-founder; 'Hitler just a bird turd in Germany's history'");
  I("Tino Chrupalla",         "AfD (DE)","e7",["pm","leader","home"],                            [40,48,45,38,45], "AfD co-leader; painter politician; eastern German base");
  I("Björn Höcke",            "AfD (DE)","e7",["pm","home","education","leader"],                [32,52,50,28,42], "AfD Thuringia leader; convicted of using Nazi slogan; most radical figure");
  I("Sahra Wagenknecht",      "BSW (DE)","e6",["pm","chancellor","leader","work"],               [60,58,65,52,55], "BSW founder; ex-Linke firebrand; 2024 state elections success; Ossi voice");
  I("Gregor Gysi",            "Die Linke","e6",["pm","justice","leader"],                         [65,62,70,58,60], "PDS then Linke; East Berlin lawyer; wit and principle; longest serving member");
  I("Dietmar Bartsch",        "Die Linke","e6",["pm","chancellor","leader"],                     [52,58,50,50,52], "Die Linke parliamentary leader; Mecklenburg politician; pragmatist wing");
  I("Bernd Riexinger",        "Die Linke","e7",["pm","work","leader","chancellor"],              [48,52,48,46,48], "Die Linke co-leader 2012–21; Stuttgart trade union organiser");
  I("Katja Kipping",          "Die Linke","e6",["pm","health","leader","work"],                  [52,52,52,50,50], "Die Linke co-leader; UBI campaigner; Dresden politician");
  I("Friedrich Merz",         "CDU/CSU","e7",["pm","chancellor","leader","business"],            [52,58,52,52,52], "CDU leader from 2022; BlackRock Germany chair; conservative comeback");
  I("Markus Söder",           "CDU/CSU","e7",["pm","leader","chancellor","education"],           [55,58,55,52,55], "CSU Bavarian Minister-President; 2021 chancelor candidacy failed; populist Conservative");
  I("Annegret Kramp-Karrenbauer","CDU/CSU","e7",["pm","defence","leader"],                      [50,58,48,50,52], "CDU leader 2018–21 AKK; Merkel's heir apparent; failed; became Defence Minister");
  I("Peter Altmaier",         "CDU/CSU","e7",["pm","energy","chancellor","leader"],              [52,62,50,52,52], "CDU Economics and Finance Minister; Merkel's right hand; climate moderator");
  I("Norbert Röttgen",        "CDU/CSU","e7",["pm","foreign","environment","leader"],            [52,58,52,52,50], "CDU foreign policy chair; Environment Minister; Ukraine hawk");
  I("Armin Laschet",          "CDU/CSU","e7",["pm","leader","chancellor","foreign"],             [50,58,48,50,50], "CDU 2021 chancellor candidate; NRW PM; giggles at flood disaster; lost to Scholaf");
  I("Olaf Scholz",            "SPD","e7",["pm","chancellor","leader","finance"],                 [52,65,48,55,55], "SPD Chancellor 2021–25; Finance Minister; Zeitenwende; traffic light collapse");
  I("Friedrich Merz leader",  "CDU/CSU","e7",["pm","chancellor","leader"],                       [52,55,50,50,50], "CDU Chancellor candidate 2025; migration hardliner");


  /* ═══════════════════════════════════════════════════════════════
     MORE SCANDINAVIA fill
     ═══════════════════════════════════════════════════════════════ */
  I("Göran Persson",          "SAP (SE)","e6",["pm","chancellor","leader","environment"],       [58,65,55,58,58], "SAP Swedish PM 1996–2006; erased deficit; EU presidency; green tax shift");
  I("Fredrik Reinfeldt",      "Moderate Party (SE)","e7",["pm","leader","work","chancellor"],   [60,60,58,60,58], "Moderate Swedish PM 2006–14; new workers' party; refugee winter 2015 broke him");
  I("Stefan Löfven",          "SAP (SE)","e7",["pm","leader","work","chancellor"],              [58,60,55,58,55], "SAP Swedish PM 2014–21; welder-PM; January Agreement; resigned twice in one year");
  I("Magdalena Andersson",    "SAP (SE)","e7",["pm","chancellor","leader","environment"],       [58,58,55,58,55], "SAP first female Swedish PM Oct–Nov 2021 then 2021–22; NATO flip-flop");
  I("Ulf Kristersson",        "Moderate Party (SE)","e7",["pm","leader","chancellor","home"],   [52,55,50,52,52], "Moderate Swedish PM from 2022; SD-supported; Tidö Agreement");
  I("Jimmy Åkesson",          "Sweden Democrats","e7",["pm","leader","home","culture"],         [50,52,52,46,50], "Sweden Democrats leader from 2005; rebranded from neo-nazi roots; kingmaker 2022");
  I("Annie Lööf",             "Centre Party (SE)","e7",["pm","leader","agriculture","chancellor"],[58,52,60,52,55], "Sweden Centre Party leader 2011–23; liberal federalist; anti-SD gatekeeper");
  I("Jonas Gahr Støre",       "Labour (NO)","e7",["pm","leader","foreign","health"],            [55,62,52,55,52], "Norway Labour PM from 2021; Health Minister; billionaire socialist irony");
  I("Erna Solberg",           "Conservative (NO)","e7",["pm","leader","chancellor","foreign"],  [58,65,55,58,55], "Norway Conservative PM 2013–21; 'Iron Erna'; immigration reform; COVID competent");
  I("Jens Stoltenberg",       "Labour (NO)","e6",["pm","chancellor","foreign","leader"],        [62,65,58,62,60], "Norway Labour PM 1998 and 2000–01 and 2005–13; NATO SG 2014–24");
  I("Kjell Magne Bondevik",   "Christian Democratic (NO)","e6",["pm","leader","foreign"],       [55,62,52,55,52], "Norway KrF PM twice 1997–2000 and 2001–05; priest-PM; conscience politics");
  I("Kaja Storstein",         "Labour (NO)","e7",["pm","leader","environment"],                 [52,48,50,50,48], "Norway Labour local politician; Fjordman debate context");
  I("Mette Frederiksen",      "Social Democrats (DK)","e7",["pm","leader","work","home"],       [62,58,60,60,58], "Denmark Social Democrat PM from 2019; strict immigration left; pandemic management");
  I("Lars Løkke Rasmussen",   "Venstre (DK)","e7",["pm","leader","chancellor","foreign"],       [58,62,55,58,58], "Venstre Denmark PM twice 2009–11 and 2015–19; Liberal Alliance; Moderate PM 2022");
  I("Helle Thorning-Schmidt", "Social Democrats (DK)","e6",["pm","leader","chancellor"],        [58,58,60,55,55], "Denmark first female PM 2011–15; taxgate scandal; UNICEF chief");
  I("Poul Nyrup Rasmussen",   "Social Democrats (DK)","e5",["pm","chancellor","leader","work"], [58,62,55,58,55], "Denmark PM 1993–2001; European integration; Social Pact; PES President");
  I("Pia Kjærsgaard",         "Danish People's Party","e6",["pm","home","leader"],              [45,58,52,42,50], "DF founder 1995; immigration restrictionist; Speaker 2015–19");
  I("Kristian Thulesen Dahl", "Danish People's Party","e7",["pm","home","leader","chancellor"], [48,52,48,44,48], "DF leader 2012–22; social conservative; lost to Frederiksen's immigration turn");
  I("Sanna Marin",            "SDP (FI)","e7",["pm","leader","work","foreign"],                 [68,48,65,55,55], "Finland SDP PM 2019–23; world's youngest woman PM; party girl controversy; NATO");
  I("Juha Sipilä",            "Centre Party (FI)","e7",["pm","leader","chancellor","agriculture"],[52,52,50,52,50], "Finland Centre PM 2015–19; engineer; austerity; SipiläGate");
  I("Alexander Stubb",        "Kokoomus (FI)","e7",["pm","foreign","chancellor","leader"],      [60,55,62,58,55], "Kokoomus Finland PM 2014–15; President from 2024; social media maven; triathlete");
  I("Petteri Orpo",           "Kokoomus (FI)","e7",["pm","chancellor","leader"],                [52,55,50,52,50], "Kokoomus Finland PM from 2023; finance background; right-wing coalition");
  I("Timo Soini",             "Perussuomalaiset (FI)","e6",["pm","leader","foreign"],           [50,55,55,46,50], "PS Finns Party founder; 2011 breakthrough; Foreign Minister; split into new PS 2017");
  I("Riikka Purra",           "Perussuomalaiset (FI)","e7",["pm","leader","home","chancellor"], [48,50,50,44,48], "PS Finns Party leader; deputy PM 2023; racist past social media posts scandal");

  /* ═══════════════════════════════════════════════════════════════
     MORE FRANCE fill
     ═══════════════════════════════════════════════════════════════ */
  I("Raymond Barre",          "Radical (FR)","e5",["pm","chancellor","trade","leader"],         [58,65,52,60,52], "UDF PM 1976–81; 'first economist of France'; austerity; survived assassination");
  I("Michel Debré",           "Gaullist","e4",["pm","justice","leader","foreign"],              [58,68,55,60,55], "RPF first PM 1959–62; drafted Fifth Republic Constitution; hardline on Algeria");
  I("Couve de Murville",      "Gaullist","e4",["pm","foreign","chancellor","leader"],           [52,65,48,55,52], "RPR PM 1968–69; former Foreign Minister; replaced Pompidou after May 1968");
  I("Chaban-Delmas",          "Gaullist","e4",["pm","leader","chancellor","justice"],           [58,65,58,58,55], "RPR PM 1969–72; New Society; Bordeaux mayor 48 years; Resistance hero");
  I("Messmer",                "Gaullist","e4",["pm","defence","leader"],                         [48,65,45,50,48], "RPR PM 1972–74; nuclear programme; last Gaullist true PM");
  I("Raymond Barre 2",        "Radical (FR)","e5",["pm","chancellor","leader","trade"],         [57,65,50,58,50], "UDF PM second period continued economic policies");
  I("Pierre Bérégovoy",       "SFIO (FR)","e5",["pm","chancellor","leader"],                    [52,62,50,52,50], "PS PM 1992–93; humble origins; austerity-left; shot himself after Mitterrand criticism");
  I("Edith Cresson",          "SFIO (FR)","e5",["pm","trade","leader","work"],                  [52,58,50,50,48], "PS France's only female PM 1991–92; gaffe-prone; EU Commissioner resigned");
  I("Michel Rocard",          "SFIO (FR)","e5",["pm","leader","agriculture","chancellor"],      [62,62,62,58,58], "PS PM 1988–91; New Caledonia Matignon Accords; RMI social income pioneer");
  I("Laurent Fabius",         "SFIO (FR)","e5",["pm","chancellor","leader","foreign"],          [58,65,55,58,55], "PS PM 1984–86; contaminated blood scandal; tainted but survived; PS president; Foreign Minister");
  I("Pierre Mauroy",          "SFIO (FR)","e5",["pm","chancellor","work","leader"],             [58,62,55,56,55], "PS PM 1981–84; first Mitterrand PM; nationalizations; 39-hour week; reversed");
  I("Ségolène Royal",         "SFIO (FR)","e6",["pm","leader","environment","education"],       [60,58,62,55,55], "PS 2007 presidential candidate; Hollande's former partner; Region President; pioneering");
  I("Manuel Valls",           "SFIO (FR)","e7",["pm","home","leader"],                          [52,55,52,50,50], "PS PM 2014–16; tough-left security; broke with left; lost Barcelona Mayor race");
  I("Jean-Marc Ayrault",      "SFIO (FR)","e7",["pm","leader","chancellor","foreign"],          [50,58,48,50,50], "PS PM 2012–14; Nantes Mayor; German speaker; replaced by Valls");
  I("Bernard Cazeneuve",      "SFIO (FR)","e7",["pm","home","leader","justice"],                [52,58,50,52,50], "PS PM 2022–24; Interior Minister; stabiliser amid Bayrou chaos");
  I("François Bayrou",        "MRP (FR)","e6",["pm","leader","education","chancellor"],         [55,60,58,52,55], "MoDem centrist perennial candidate; PM 2025; Macron's oldest ally");
  I("Valérie Pécresse",       "Les Républicains","e7",["pm","leader","chancellor","education"], [52,55,52,52,50], "LR 2022 presidential candidate; Île-de-France Region President; LR's last hope");
  I("Xavier Bertrand",        "Les Républicains","e7",["pm","health","leader","work"],          [52,58,50,52,50], "LR Hauts-de-France Region President; 2022 presidential contender");
  I("Bruno Le Maire",         "Les Républicains","e7",["pm","chancellor","trade","leader"],     [55,58,52,55,52], "LR Finance Minister 2017–24; crossed aisle to Macron; European hawk");
  I("Gérald Darmanin",        "Les Républicains","e7",["pm","home","leader","justice"],         [48,52,52,45,48], "LR→ Macron Interior Minister; tough immigration; Tapie-esque ambition");
  I("Marine Le Pen",          "Rassemblement National","e7",["pm","leader","home","chancellor"], [58,58,60,50,58], "RN president from 2011; detoxified from NSDAP; 2017 and 2022 runoff; Eurosceptic");
  I("Jordan Bardella",        "Rassemblement National","e7",["pm","leader","chancellor","home"], [52,45,58,48,52], "RN party president from 2022; PM candidate 2024; Le Pen's heir; TikTok star");
  I("Florian Philippot",      "Rassemblement National","e7",["pm","leader","foreign"],           [50,50,55,45,48], "FN VP; left to found Les Patriotes; anti-EU strategist");
  I("François-Xavier Bellamy","Les Républicains","e7",["pm","education","leader","culture"],    [52,48,55,50,48], "LR philosopher MEP; conservative Catholic intellectual; revival attempt");
  I("Gabriel Attal",          "MRP (FR)","e7",["pm","chancellor","education","leader"],         [60,50,62,52,55], "Renaissance youngest French PM 2024; tax-cutting centrist; charismatic right turn");
  I("Élisabeth Borne",        "SFIO (FR)","e7",["pm","work","environment","chancellor"],        [52,58,48,52,50], "PS→Renaissance PM 2022–24; engineer; 49.3 abuse; pension reform battle");
  I("Jean Castex",            "Les Républicains","e7",["pm","health","leader"],                  [50,56,48,50,50], "Republican PM 2020–22; COVID czar; local notable; RATP chief after PM");
  I("Édouard Philippe",       "Les Républicains","e7",["pm","chancellor","home","leader"],       [58,58,55,58,55], "LR→Renaissance PM 2017–20; Le Havre Mayor; PM before and again?; presidential ambition");
  I("Jean-Luc Mélenchon",     "La France Insoumise","e6",["pm","leader","foreign","work"],      [62,65,68,55,60], "LFI founder; three-time presidential candidate; leftist demagogue; Unbow-ed");
  I("Manuel Bompard",         "La France Insoumise","e7",["pm","leader","chancellor"],           [50,48,50,48,50], "LFI secretary; Mélenchon's chief of staff; European elections");
  I("Mathilde Panot",         "La France Insoumise","e7",["pm","leader","environment","justice"],[52,48,55,48,50], "LFI parliamentary group president; Mélenchon successor candidate");
  I("Sandrine Rousseau",      "Greens (DE)","e7",["pm","environment","leader","education"],     [55,48,58,50,50], "EELV politician; radical wing; feminist; anti-growth 'degrowth'");
  I("Yannick Jadot",          "Greens (DE)","e7",["pm","environment","trade","leader"],         [55,52,55,52,50], "EELV 2022 presidential candidate; MEP; pragmatic ecologist");
  I("Fabien Roussel",         "Parti Communiste","e7",["pm","work","leader","chancellor"],       [52,52,55,48,50], "PCF 2022 presidential candidate; baguette and red wine communism; popular outreach");
  I("Nicolas Dupont-Aignan",  "Gaullist","e6",["pm","leader","foreign","chancellor"],           [48,55,52,44,48], "Debout La France nationalist Gaullist; EU critic; Le Pen ally 2022; small party king");
  I("Éric Zemmour",           "Rassemblement National","e7",["pm","home","leader","culture"],    [48,52,58,42,48], "Reconquête TV polemicist; 2022 candidate; white replacement theorist; RN rival");
  I("Michel Barnier",         "Les Républicains","e7",["pm","foreign","leader","chancellor"],   [55,68,52,58,52], "LR EU Brexit negotiator; PM 2024–25 brief; censure by left and far-right");

  /* ═══════════════════════════════════════════════════════════════
     UK HISTORICAL — wildcard fill (scope wild, open to all)
     ═══════════════════════════════════════════════════════════════ */
  I("William Pitt the Elder",  "Whig","e0",["pm","foreign","defence","leader"],                  [70,65,78,70,65], "Whig PM 1766–68; 'Great Commoner'; Seven Years War; lost American colonies");
  I("Edmund Burke",            "Whig","e0",["pm","justice","leader","culture"],                  [65,60,75,65,60], "Whig statesman; Reflections on the Revolution; conservative philosopher");
  I("Charles James Fox",       "Whig","e0",["pm","foreign","justice","leader"],                  [65,58,72,62,58], "Whig Fox-North Coalition; slave trade opposition; Pitt's great rival");
  I("Lord Grenville",          "Whig","e0",["pm","foreign","leader","chancellor"],               [55,65,50,55,52], "Whig PM 1806–07; Ministry of All the Talents; slave trade abolition");
  I("Spencer Perceval",        "Tory","e0",["pm","chancellor","justice","leader"],               [58,60,55,58,55], "Tory PM 1809–12; only British PM assassinated; chancellor-PM combo");
  I("Viscount Castlereagh",    "Tory","e0",["pm","foreign","leader"],                            [58,65,52,62,55], "Tory Foreign Secretary; Congress of Vienna; balanced Europe; self-inflicted death");
  I("George Canning",          "Tory","e0",["pm","foreign","leader","trade"],                    [65,62,68,62,58], "Tory PM 1827; 100 days; died in office; liberal conservative; Greek independence");
  I("Viscount Goderich",       "Tory","e0",["pm","leader","chancellor"],                         [45,58,40,45,42], "Tory PM 1827–28; 'Goody Goderich'; cried to King before resigning; shortest PM");
  I("Lord Melbourne",          "Whig","e0",["pm","home","leader","justice"],                     [52,65,52,52,52], "Whig PM twice; young Queen Victoria's mentor; Regency rakish PM");
  I("Lord John Russell",       "Whig","e1",["pm","justice","leader","chancellor"],               [62,65,60,60,58], "Whig PM twice; Great Reform Act 1832; Irish Famine inaction");
  I("Earl of Derby",           "Conservative","e1",["pm","leader","agriculture","foreign"],      [58,65,55,58,55], "Conservative PM three times; Corn Laws opponent turned defender");
  I("Archibald Primrose",      "Liberal","e1",["pm","foreign","leader"],                          [55,62,55,55,52], "Liberal Lord Rosebery PM 1894–95; imperialist liberal; turf; melancholia");
  I("Arthur Balfour",          "Conservative","e2",["pm","foreign","education","leader"],        [60,68,58,62,58], "Conservative PM 1902–05; Balfour Declaration; CID; Education Act");
  I("H.H. Asquith",            "Liberal","e2",["pm","chancellor","justice","leader"],            [65,68,65,68,62], "Liberal PM 1908–16; People's Budget; WWI coalition; ousted by Lloyd George");
  I("Bonar Law",               "Conservative","e2",["pm","chancellor","leader"],                 [58,65,52,58,55], "Conservative PM 1922–23; 'Unknown Prime Minister'; Ulster Unionist die-hard");
  I("Austen Chamberlain",      "Conservative","e2",["pm","foreign","chancellor","leader"],       [58,65,55,60,55], "Conservative Foreign Secretary; Locarno Treaty; Nobel Prize; never PM despite promise");
  I("Viscount Halifax",        "Conservative","e3",["pm","foreign","leader"],                    [52,65,48,52,50], "Conservative Foreign Secretary; appeasement; considered PM over Churchill");
  I("Lord Curzon",             "Conservative","e2",["pm","foreign","leader"],                    [58,68,55,60,55], "Conservative Viceroy India; Foreign Secretary; lost PM to Baldwin");
  I("Samuel Hoare",            "Conservative","e3",["pm","foreign","home","leader"],             [48,65,45,48,48], "Conservative Home Secretary; Hoare-Laval scandal; surrendered India Bill");
  I("Leslie Hore-Belisha",     "Liberal","e3",["pm","defence","transport","leader"],             [55,58,55,52,50], "National Liberal War Minister; Belisha beacons traffic reform; sacked by Chamberlain");
  I("Duff Cooper",             "Conservative","e3",["pm","defence","foreign","leader"],          [58,60,58,55,52], "Conservative War Minister; resigned over Munich; Churchill's minister of information");
  I("Leo Amery",               "Conservative","e3",["pm","trade","leader","chancellor"],         [60,62,58,60,55], "Conservative Colonial Secretary; 'In the name of God go!' speech to Chamberlain");
  I("Stafford Cripps",         "Labour","e3",["pm","chancellor","trade","leader"],               [55,62,52,58,52], "Labour Chancellor 1947–50; austerity champion; India negotiations; teetotal austerity");
  I("Herbert Morrison",        "Labour","e3",["pm","home","deputy","leader"],                    [58,62,55,58,55], "Labour Deputy PM; Home Secretary; Festival of Britain; Bevan rival");
  I("Aneurin Bevan",           "Labour","e3",["pm","health","leader","work"],                    [68,60,75,62,60], "Labour Minister; NHS founder; Nye; 'Tories are lower than vermin'; clashed with Gaitskell");
  I("Hugh Gaitskell",          "Labour","e4",["pm","chancellor","leader"],                       [62,62,62,60,58], "Labour leader 1955–63; revisionist; Clause 4 fight; Common Market opposition; died suddenly");
  I("Iain Macleod",            "Conservative","e4",["pm","health","chancellor","leader"],        [62,60,65,60,58], "Conservative 'card sharp'; decolonisation architect; Chancellor briefly; died in office");
  I("Enoch Powell",            "Conservative","e4",["pm","health","leader","home"],              [52,65,65,52,50], "Conservative Health Minister then Ulster Unionist; Rivers of Blood; monetarist precursor");
  I("Roy Jenkins",             "Labour","e4",["pm","chancellor","home","leader"],                [65,65,65,65,62], "Labour Chancellor; Home Secretary; SDP founder; EC President; civilising force");
  I("Barbara Castle",          "Labour","e4",["pm","work","transport","leader"],                 [65,60,68,60,58], "Labour MP; 'Red Barbara'; In Place of Strife; Prices & Incomes; Zimmer at conference");
  I("Tony Benn",               "Labour","e5",["pm","energy","leader","culture"],                 [62,62,68,55,55], "Labour Energy Secretary; left shift; renounced peerage; 'speaking truth to power'");
  I("Michael Foot",            "Labour","e5",["pm","leader","work","culture"],                   [55,65,65,52,50], "Labour leader 1980–83; donkey jacket cenotaph; longest suicide note manifesto");
  I("Neil Kinnock",            "Labour","e5",["pm","leader","work","education"],                 [60,60,65,55,55], "Labour leader 1983–92; expelled Militant; Sheffield rally hubris; EC Commissioner");
  I("John Smith",              "Labour","e6",["pm","leader","justice","chancellor"],             [65,65,62,62,60], "Labour leader 1992–94; shadow Budget; died before he could be PM; lost generation grief");
  I("Robin Cook",              "Labour","e6",["pm","foreign","leader","justice"],                [65,60,68,62,58], "Labour Foreign Secretary; Ethical Foreign Policy; resigned over Iraq; brilliant debater");
  I("Clare Short",             "Labour","e7",["pm","international","leader","work"],             [60,58,62,55,52], "Labour DFID Secretary; resigned over Iraq; direct and difficult; international aid champion");
  I("Jack Straw",              "Labour","e7",["pm","foreign","justice","home","leader"],         [52,65,50,52,52], "Labour Home Secretary then Foreign Secretary; Iraq war; rendition controversies");
  I("Alan Milburn",            "Labour","e7",["pm","health","work","leader"],                    [55,55,52,55,52], "Labour Health Secretary; NHS market reforms; resigned; Blairite moderniser");
  I("David Blunkett",          "Labour","e6",["pm","home","work","education","leader"],          [55,60,55,55,52], "Labour blind Sheffield MP; Education; Home Secretary twice; resignation controversies");
  I("Peter Mandelson",         "Labour","e6",["pm","trade","leader","chancellor"],               [55,62,52,55,58], "Labour spinner; Trade & Industry; EU Commissioner; twice resigned; the 'Prince of Darkness'");
  I("Alastair Campbell",       "Labour","e7",["pm","leader","health"],                           [52,52,58,50,52], "Labour communications chief; Iraq dossier; spin doctor; mental health advocate");
  I("John Prescott",           "Labour","e6",["pm","deputy","transport","environment"],          [52,60,52,50,52], "Labour Deputy PM; two Jags; punched egg-thrower; Hull voice of old Labour");
  I("Margaret Beckett",        "Labour","e6",["pm","foreign","environment","leader"],            [52,62,50,52,52], "Labour first female Foreign Secretary; caravanning; failed 1994 leadership bid");
  I("Frank Field",             "Labour","e5",["pm","work","health","leader"],                    [58,60,55,55,52], "Labour welfare reform minister; 'think the unthinkable'; crossed floor later");
  I("Ken Clarke",              "Conservative","e5",["pm","chancellor","health","justice","leader"],[62,70,65,62,58], "Conservative Chancellor; Home Secretary; Health; Justice; Big Beast; pro-European");
  I("David Davis",             "Conservative","e6",["pm","home","leader","justice"],             [55,60,58,52,52], "Conservative Home Secretary; Haltemprice by-election; Brexit minister resigned");
  I("Liam Fox",                "Conservative","e7",["pm","defence","trade","leader"],            [48,55,48,48,48], "Conservative Defence Secretary; Adam Werritty scandal; Trade Secretary; hard Brexiteer");
  I("Dominic Grieve",         "Conservative","e7",["pm","justice","foreign","leader"],           [58,58,55,55,52], "Conservative AG; anti-Brexit rebel; prorogation legal challenge");
  I("Jacob Rees-Mogg",         "Conservative","e7",["pm","leader","business","culture"],         [45,52,52,40,45], "Conservative Moggmentum; Victorian dress; ERG chair; Brexit true believer; Leader of the House");
  I("Suella Braverman",        "Conservative","e7",["pm","justice","home","leader"],             [42,50,50,38,42], "Conservative AG; Home Secretary twice; Rwanda scheme; extremists speech");
  I("Kemi Badenoch",           "Conservative","e7",["pm","leader","trade","business"],           [52,52,52,48,50], "Conservative leader from 2024; first Black Conservative leader; culture war fighter");
  I("Robert Jenrick",          "Conservative","e7",["pm","leader","home","chancellor"],          [48,50,48,44,46], "Conservative leadership runner-up 2024; immigration hardliner; planning minister");
  I("Wes Streeting",           "Labour","e7",["pm","health","leader"],                            [58,50,60,52,52], "Labour Health Secretary from 2024; NHS reform hawk; Ilford North; IVF survivor");
  I("Bridget Phillipson",      "Labour","e7",["pm","education","chancellor","leader"],           [55,50,52,52,52], "Labour Education Secretary from 2024; care home upbringing; grammar school girl");
  I("Yvette Cooper",           "Labour","e6",["pm","home","work","leader"],                      [58,60,55,58,55], "Labour Home Secretary from 2024; Treasury secretary; Ed Balls' wife; migration policy");
  I("David Lammy",             "Labour","e7",["pm","foreign","justice","leader"],                [60,58,60,55,55], "Labour Foreign Secretary from 2024; race politics; academic; Trump critic");
  I("Pat McFadden",            "Labour","e7",["pm","chancellor","leader","work"],                [52,58,50,52,52], "Labour Chancellor of the Duchy; Cabinet Office minister; Blairite survivor");
  I("Jonathan Reynolds",       "Labour","e7",["pm","trade","business","chancellor"],             [52,52,50,52,50], "Labour Business & Trade Secretary from 2024; Stalybridge MP; financial services");
  I("Louise Haigh",            "Labour","e7",["pm","transport","home","leader"],                 [52,50,52,50,50], "Labour Transport Secretary 2024; Sheffield Heeley; past police record resignation");
  I("Liz Kendall",             "Labour","e7",["pm","work","health","leader"],                    [55,52,52,52,50], "Labour Work & Pensions; 2015 leadership candidate; welfare reform");

  I("Ed Miliband",             "Labour","e7",["pm","environment","chancellor","leader"],         [58,60,58,55,55], "Labour leader 2010–15; EdStone; SNP-Labour fear; Red Ed; climate law");
  I("Andy Burnham",            "Labour","e7",["pm","health","leader","work"],                    [60,58,62,55,55], "Labour Mayor Greater Manchester; Hillsborough; 2010/15/16 leadership campaigns");
  I("Chuka Umunna",            "Labour","e7",["pm","business","leader","foreign"],               [58,52,58,52,50], "Labour→Change UK→LD MP; City lawyer; 2015 candidate; Streatham");
  I("Owen Smith",              "Labour","e7",["pm","health","leader","work"],                    [52,52,52,50,50], "Labour 2016 Corbyn challenger; pharma lobbyist; Welsh moderate");
  I("Angela Eagle",            "Labour","e7",["pm","chancellor","home","leader"],                [52,58,50,50,52], "Labour 2016 Corbyn challenger; Shadow Business; outed 1997; longest-serving openly gay minister");
  I("Lisa Nandy",              "Labour","e7",["pm","foreign","leader","culture"],                [58,52,58,52,52], "Labour Foreign Secretary runner-up; Wigan MP; film producer");
  I("Clive Lewis",             "Labour","e7",["pm","defence","chancellor","leader"],             [55,48,55,50,48], "Labour left MP; Green New Deal; media background; Norwich South");
  I("Jess Phillips",           "Labour","e7",["pm","home","justice","leader"],                   [60,50,62,52,50], "Labour Birmingham MP; domestic abuse campaigner; serial truth-teller; 2020 candidate");
  I("Jon Ashworth",            "Labour","e7",["pm","health","work","leader"],                    [52,55,50,50,52], "Labour Shadow Health; DWP Secretary; Leicester South; lost seat 2024");
  I("Steve Reed",              "Labour","e7",["pm","environment","leader","home"],               [52,52,50,50,50], "Labour Environment Secretary from 2024; Croydon and Sutton MP");
  I("Hillary Benn",            "Labour","e6",["pm","environment","foreign","leader"],            [58,60,58,58,55], "Labour Commons Northern Ireland Committee; Environment Minister; Tony's son; anti-Brexit fighter");
  I("Harriet Harman",          "Labour","e5",["pm","justice","work","leader","home"],           [58,70,55,58,60], "Labour interim leader twice; Solicitor General; women's rights champion; 40+ year career");
  I("Dawn Butler",             "Labour","e7",["pm","work","leader","education"],                 [52,52,52,50,50], "Labour MP Brent East; Shadow Minister; first Black woman to address Commons from despatch box");
  I("Diane Abbott",            "Labour","e5",["pm","home","leader","education"],                 [52,60,52,48,48], "Labour Hackney; first Black woman MP 1987; Corbynite; suspended 2024 letter");
  I("Sadiq Khan",              "Labour","e7",["pm","home","leader","chancellor"],                [62,58,62,60,58], "Labour Mayor London from 2016; three terms; ULEZ; climate; Pakistan heritage");
  I("Zac Goldsmith",          "Conservative","e7",["pm","environment","leader","foreign"],      [52,52,50,50,48], "Conservative Mayor candidate 2016; dog-whistle controversy; environment peer");
  I("Alan Johnson",            "Labour","e6",["pm","home","health","education"],                 [60,62,60,58,58], "Labour Cabinet utility player; failed to run for leader; best PM never had");
  I("Alistair Darling",        "Labour","e6",["pm","chancellor","trade","leader"],              [62,65,55,62,58], "Labour Chancellor through 2008 crisis; 'no easy answers'; No vote Scotland 2014");
  I("Douglas Alexander",       "Labour","e7",["pm","foreign","trade","leader"],                 [55,55,55,52,52], "Labour lost seat to 20-year-old SNP in 2015; election co-ordinator; forein affairs");
  I("Jim Murphy",              "Labour","e7",["pm","leader","defence","trade"],                  [52,55,52,50,50], "Labour Scotland leader 2015; lost seat to SNP; irn bru crate campaigner");
  I("Michael Dugher",          "Labour","e7",["pm","culture","leader","work"],                   [50,52,50,48,50], "Labour Culture Shadow; stood by Corbyn briefly; music industry lobbyist");
  I("Vernon Coaker",           "Labour","e6",["pm","defence","home","leader"],                   [50,58,48,50,50], "Labour Shadow Defence; Gedling; police minister; Northern Ireland; teacher");
  I("Caroline Flint",          "Labour","e6",["pm","energy","work","leader"],                    [52,55,52,50,50], "Labour Energy Secretary; Remain after Leave constituency; lost 2019");
  I("Damian Green",            "Conservative","e6",["pm","work","home","leader"],               [52,58,50,50,50], "Conservative May's deputy; pornography on computer; resigned; Thanet MP");
  I("Amber Rudd",              "Conservative","e7",["pm","home","work","leader"],               [55,58,52,55,52], "Conservative Home Secretary; Windrush scandal resigned; came back; resigned again over Brexit");
  I("Grant Shapps",            "Conservative","e7",["pm","transport","defence","leader","home"],[48,52,48,48,48], "Conservative multiple ministerial roles; defence of Ukraine; multiple identities");
  I("Esther McVey",            "Conservative","e7",["pm","work","home","leader"],               [42,50,48,40,42], "Conservative Work & Pensions; bedroom tax; hard Brexiteer; GB News presenter");
  I("Priti Patel",             "Conservative","e7",["pm","home","trade","leader"],              [42,52,45,40,42], "Conservative Home Secretary; Rwanda plan; unauthorized Israel contacts resigned");

  /* Close file */
})();

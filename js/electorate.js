/* =============================================================================
   ELECTORATE — voter-bloc layer  (country-specific)
   Each playable country has its OWN set of ~6-8 voter blocs (names, regional
   concentration on that country's regions, and issue sensitivities). The active
   country's blocs drive: the "Your coalition" govern panel, a deterministic
   national vote nudge, and a per-region logit tilt — all resolved before
   G.runElection() builds its RNG, so the seeded sim stays byte-identical.
   Issue-axis convention: a POSITIVE sensitivity means the bloc rewards the
   right/hard/tight stance on that axis; negative rewards the left/open stance.
   ========================================================================== */
window.G = window.G || {};

G.ELECTORATE_BLOCS_BY_COUNTRY = {

  /* ── United Kingdom ─────────────────────────────────────────────────────── */
  uk: [
    { key:"redwall",    name:"Red Wall",              size:0.13, align: 0.3,
      regions:{NE:2.2,NW:1.6,YH:1.6,WM:1.1,EM:1.0},
      issues:{tax:0.6,nhs:0.9,imm:1.2,world:0.4,climate:-0.3,crime:0.7} },
    { key:"pensioners", name:"Pensioners",            size:0.18, align: 0.6,
      regions:{SW:1.4,EE:1.3,SE:1.2,WAL:1.1},
      issues:{tax:0.5,nhs:1.1,imm:0.7,world:0.2,climate:-0.2,crime:0.8} },
    { key:"urbanprog",  name:"Urban Progressives",    size:0.14, align:-1.3,
      regions:{LDN:2.4,NW:1.1},
      issues:{tax:-0.4,nhs:0.8,imm:-0.9,world:-0.6,climate:1.1,crime:-0.2} },
    { key:"shires",     name:"Home Counties & Shires",size:0.16, align: 1.2,
      regions:{SE:1.8,EE:1.5,SW:1.3},
      issues:{tax:1.1,nhs:0.2,imm:0.6,world:0.5,climate:-0.1,crime:0.6} },
    { key:"students",   name:"Students & Graduates",  size:0.12, align:-1.1,
      regions:{LDN:1.6,SCO:1.2,NW:1.2,YH:1.1},
      issues:{tax:-0.5,nhs:0.6,imm:-0.8,world:-0.7,climate:1.2,crime:-0.3} },
    { key:"business",   name:"Business & City",       size:0.11, align: 0.7,
      regions:{LDN:1.9,SE:1.3,EE:1.1},
      issues:{tax:1.0,nhs:-0.1,imm:-0.3,world:0.6,climate:0.2,crime:0.3} },
    { key:"nationalist",name:"Nationalist / NI",      size:0.07, align:-0.8,
      regions:{SCO:2.6,WAL:1.4,NI:3.0},
      issues:{tax:-0.2,nhs:0.5,imm:-0.3,world:-0.4,climate:0.4,crime:0} },
    { key:"reform",     name:"Reform-curious",        size:0.09, align: 1.8,
      regions:{EM:1.6,EE:1.5,NE:1.4,WM:1.3,YH:1.2},
      issues:{tax:0.7,nhs:0.3,imm:1.8,world:0.9,climate:-1.0,crime:1.0} }
  ],

  /* ── United States ──────────────────────────────────────────────────────── */
  /* regions keyed for BOTH the House map (US_*) and the Electoral College (EC_*) */
  us: [
    { key:"maga",       name:"MAGA / Rural Right",    size:0.16, align: 1.6,
      regions:{US_SE:1.6,US_TX:1.6,US_PL:1.5,US_WV:2.0,EC_SAFE_REP:1.8,EC_GA:1.2,EC_NC:1.2},
      issues:{tax:0.8,nhs:0.1,imm:1.6,world:0.6,climate:-1.2,crime:1.0} },
    { key:"evangelical",name:"Faith & Family",        size:0.12, align: 1.3,
      regions:{US_SE:1.6,US_TX:1.5,US_PL:1.2,EC_SAFE_REP:1.5},
      issues:{tax:0.5,nhs:0.1,imm:0.9,world:0.4,climate:-0.6,crime:0.9} },
    { key:"suburban",   name:"Suburban Moderates",    size:0.18, align: 0.1,
      regions:{US_MA:1.3,US_GL:1.2,US_PNW:1.1,EC_PA:1.4,EC_MI:1.4,EC_WI:1.4,EC_AZ:1.3,EC_GA:1.3,EC_NC:1.3},
      issues:{tax:0.4,nhs:0.3,imm:0.1,world:0.2,climate:0.2,crime:0.4} },
    { key:"urbanprog",  name:"Urban Progressives",    size:0.14, align:-1.4,
      regions:{US_CA:1.8,US_NE:1.6,US_PNW:1.3,EC_SAFE_DEM:1.7},
      issues:{tax:-0.5,nhs:0.9,imm:-1.0,world:-0.6,climate:1.3,crime:-0.4} },
    { key:"union",      name:"Union & Rust Belt",     size:0.12, align:-0.2,
      regions:{US_GL:1.6,US_MA:1.2,US_WV:1.4,EC_MI:1.5,EC_PA:1.5,EC_WI:1.5},
      issues:{tax:-0.2,nhs:0.7,imm:0.5,world:0.3,climate:-0.2,crime:0.5} },
    { key:"minority",   name:"Black & Latino Voters", size:0.16, align:-0.9,
      regions:{US_SE:1.3,US_TX:1.4,US_CA:1.3,US_SW:1.6,EC_GA:1.4,EC_NC:1.3,EC_AZ:1.4,EC_NV:1.5},
      issues:{tax:-0.3,nhs:0.8,imm:-0.7,world:-0.2,climate:0.4,crime:-0.1} },
    { key:"business",   name:"Business & Wall St",    size:0.12, align: 0.6,
      regions:{US_NE:1.4,US_CA:1.3,US_MA:1.3,EC_SAFE_DEM:1.1,EC_LEAN_REP:1.1},
      issues:{tax:1.1,nhs:-0.1,imm:-0.3,world:0.6,climate:0.1,crime:0.3} }
  ],

  /* ── Germany ────────────────────────────────────────────────────────────── */
  de: [
    { key:"cdu_mitte",  name:"Christdemokratische Mitte", size:0.18, align: 0.7,
      regions:{DM_BW:1.4,DM_BY:1.5,DM_RP:1.3,DM_SL:1.2,DM_NI:1.1},
      issues:{tax:0.6,nhs:0.3,imm:0.5,world:0.4,climate:-0.1,crime:0.6} },
    { key:"spd_labour", name:"Sozialdemokratische Arbeiter", size:0.18, align:-0.6,
      regions:{DM_NW:1.5,DM_NI:1.2,DM_HB:1.6,DM_HH:1.3},
      issues:{tax:-0.3,nhs:0.8,imm:0.2,world:0.1,climate:0.2,crime:0.3} },
    { key:"green_urban",name:"Grüne Städter",          size:0.14, align:-1.2,
      regions:{DM_BE:1.8,DM_HH:1.6,DM_BW:1.3,DM_HB:1.5},
      issues:{tax:-0.3,nhs:0.6,imm:-0.9,world:-0.6,climate:1.4,crime:-0.3} },
    { key:"afd_ost",    name:"AfD Ost",                size:0.14, align: 1.9,
      regions:{DM_SN:2.0,DM_ST:1.9,DM_TH:1.9,DM_BB:1.7,DM_MV:1.6},
      issues:{tax:0.5,nhs:0.3,imm:1.8,world:0.9,climate:-1.1,crime:1.0} },
    { key:"fdp_liberal",name:"Liberale Freiberufler",  size:0.10, align: 0.9,
      regions:{DM_BW:1.4,DM_HE:1.3,DM_BY:1.2},
      issues:{tax:1.2,nhs:-0.2,imm:0.0,world:0.4,climate:0.1,crime:0.3} },
    { key:"linke_ost",  name:"Linke Ost",              size:0.12, align:-1.5,
      regions:{DM_TH:1.7,DM_SN:1.4,DM_BE:1.5,DM_ST:1.4},
      issues:{tax:-0.6,nhs:0.9,imm:-0.3,world:-0.7,climate:0.5,crime:-0.2} },
    { key:"katholik",   name:"Katholische Traditionalisten", size:0.14, align: 0.8,
      regions:{DM_BY:1.6,DM_NW:1.2,DM_RP:1.3},
      issues:{tax:0.4,nhs:0.4,imm:0.6,world:0.3,climate:-0.2,crime:0.7} }
  ],

  /* ── France ─────────────────────────────────────────────────────────────── */
  fr: [
    { key:"rn_periph",  name:"RN Périphérique",        size:0.17, align: 1.8,
      regions:{FR_NE:1.7,FR_SUD:1.6,FR_NO:1.4},
      issues:{tax:0.4,nhs:0.4,imm:1.8,world:0.7,climate:-0.9,crime:1.0} },
    { key:"macronist",  name:"Centristes Macronistes", size:0.16, align: 0.2,
      regions:{FR_IDF:1.5,FR_OUE:1.3},
      issues:{tax:0.5,nhs:0.2,imm:0.1,world:0.4,climate:0.3,crime:0.3} },
    { key:"lr_bourgeois",name:"Bourgeoisie Gaulliste",  size:0.15, align: 1.1,
      regions:{FR_OUE:1.4,FR_IDF:1.3,FR_NE:1.2},
      issues:{tax:0.9,nhs:0.2,imm:0.6,world:0.5,climate:-0.1,crime:0.7} },
    { key:"socialists", name:"Sociaux-démocrates",     size:0.14, align:-0.9,
      regions:{FR_OUT:1.6,FR_NO:1.3,FR_SUD:1.2},
      issues:{tax:-0.3,nhs:0.8,imm:-0.2,world:-0.1,climate:0.4,crime:0.2} },
    { key:"insoumis",   name:"La France Insoumise",    size:0.14, align:-1.7,
      regions:{FR_IDF:1.6,FR_OUT:1.8,FR_SUD:1.2},
      issues:{tax:-0.6,nhs:0.7,imm:-1.0,world:-0.8,climate:1.1,crime:-0.4} },
    { key:"catho_prov", name:"Catholiques de Province",size:0.10, align: 0.9,
      regions:{FR_OUE:1.5,FR_CEN:1.3},
      issues:{tax:0.5,nhs:0.3,imm:0.5,world:0.3,climate:-0.2,crime:0.6} },
    { key:"ecolo",      name:"Écologistes",            size:0.14, align:-1.1,
      regions:{FR_IDF:1.5,FR_OUE:1.2},
      issues:{tax:-0.2,nhs:0.5,imm:-0.6,world:-0.5,climate:1.3,crime:-0.3} }
  ],

  /* ── Australia ──────────────────────────────────────────────────────────── */
  au: [
    { key:"battlers",   name:"Aspirational Battlers",  size:0.20, align: 0.5,
      regions:{AU_QLD:1.5,AU_WA:1.3,AU_NSW:1.2},
      issues:{tax:0.6,nhs:0.4,imm:0.8,world:0.3,climate:-0.5,crime:0.6} },
    { key:"inner_metro",name:"Inner-Metro Progressives",size:0.18, align:-1.2,
      regions:{AU_VIC:1.6,AU_NSW:1.4,AU_ACT:2.0},
      issues:{tax:-0.3,nhs:0.6,imm:-0.7,world:-0.4,climate:1.3,crime:-0.3} },
    { key:"grey_vote",  name:"Retirees & Grey Vote",   size:0.18, align: 0.7,
      regions:{AU_QLD:1.4,AU_SA:1.3,AU_TAS:1.4},
      issues:{tax:0.4,nhs:0.9,imm:0.6,world:0.2,climate:-0.3,crime:0.7} },
    { key:"mining",     name:"Resources & Regions",    size:0.14, align: 1.0,
      regions:{AU_WA:1.8,AU_QLD:1.5},
      issues:{tax:0.7,nhs:0.2,imm:0.6,world:0.5,climate:-1.0,crime:0.5} },
    { key:"multicult",  name:"Multicultural Suburbs",  size:0.16, align:-0.3,
      regions:{AU_NSW:1.5,AU_VIC:1.4},
      issues:{tax:-0.1,nhs:0.7,imm:-0.5,world:-0.1,climate:0.3,crime:0.2} },
    { key:"teal",       name:"Teal Moderates",         size:0.14, align:-0.2,
      regions:{AU_NSW:1.3,AU_VIC:1.3,AU_WA:1.2},
      issues:{tax:0.4,nhs:0.3,imm:0.0,world:0.1,climate:1.0,crime:0.2} }
  ],

  /* ── Canada ─────────────────────────────────────────────────────────────── */
  ca: [
    { key:"laurentian", name:"Laurentian Liberals",    size:0.20, align:-0.4,
      regions:{CA_ON:1.4,CA_QC:1.3,CA_ATL:1.4},
      issues:{tax:-0.1,nhs:0.7,imm:-0.3,world:-0.1,climate:0.5,crime:0.2} },
    { key:"prairie",    name:"Prairie Conservatives",  size:0.18, align: 1.3,
      regions:{CA_PR:2.0,CA_BC:1.2},
      issues:{tax:0.8,nhs:0.2,imm:0.6,world:0.5,climate:-1.1,crime:0.7} },
    { key:"quebec_nat", name:"Québec Nationalists",    size:0.14, align:-0.5,
      regions:{CA_QC:2.4},
      issues:{tax:-0.2,nhs:0.6,imm:0.2,world:-0.3,climate:0.4,crime:0.1} },
    { key:"urban_prog", name:"Urban Progressives",     size:0.16, align:-1.2,
      regions:{CA_BC:1.5,CA_ON:1.3},
      issues:{tax:-0.4,nhs:0.7,imm:-0.8,world:-0.5,climate:1.2,crime:-0.3} },
    { key:"suburban_ca",name:"905 Suburban Swing",     size:0.18, align: 0.2,
      regions:{CA_ON:1.5},
      issues:{tax:0.4,nhs:0.3,imm:0.2,world:0.2,climate:0.1,crime:0.4} },
    { key:"atlantic",   name:"Atlantic & Rural",       size:0.14, align: 0.0,
      regions:{CA_ATL:1.7,CA_PR:1.2,CA_NT:1.3},
      issues:{tax:0.2,nhs:0.6,imm:0.3,world:0.2,climate:-0.2,crime:0.4} }
  ],

  /* ── Japan ──────────────────────────────────────────────────────────────── */
  jp: [
    { key:"ldp_rural",  name:"LDP Rural Base",         size:0.22, align: 0.9,
      regions:{JP_TH:1.6,JP_CG:1.5,JP_HK:1.4,JP_KY:1.3},
      issues:{tax:0.5,nhs:0.4,imm:0.7,world:0.6,climate:-0.3,crime:0.6} },
    { key:"urban_salary",name:"Urban Salarymen",        size:0.18, align: 0.2,
      regions:{JP_TO:1.5,JP_OS:1.3,JP_KA:1.3},
      issues:{tax:0.4,nhs:0.3,imm:0.2,world:0.3,climate:0.2,crime:0.3} },
    { key:"komeito",    name:"Kōmeitō Faith Base",     size:0.12, align:-0.2,
      regions:{JP_OS:1.5,JP_TO:1.2},
      issues:{tax:-0.1,nhs:0.7,imm:-0.1,world:-0.3,climate:0.3,crime:0.2} },
    { key:"progressive",name:"Liberal-Left (CDP)",     size:0.16, align:-1.0,
      regions:{JP_TO:1.4,JP_KA:1.3,JP_HK:1.4},
      issues:{tax:-0.3,nhs:0.7,imm:-0.4,world:-0.6,climate:0.8,crime:-0.2} },
    { key:"ishin",      name:"Ōsaka Reformers",        size:0.14, align: 0.6,
      regions:{JP_OS:2.0,JP_KA:1.3},
      issues:{tax:0.7,nhs:-0.2,imm:0.3,world:0.4,climate:0.0,crime:0.4} },
    { key:"seniors_jp", name:"Ageing Voters",          size:0.18, align: 0.5,
      regions:{JP_TH:1.4,JP_CG:1.3,JP_HK:1.3},
      issues:{tax:0.3,nhs:1.0,imm:0.5,world:0.2,climate:-0.2,crime:0.6} }
  ],

  /* ── India ──────────────────────────────────────────────────────────────── */
  in: [
    { key:"hindutva",   name:"Hindutva Nationalists",  size:0.18, align: 1.4,
      regions:{IN_NOR:1.5,IN_GUJ:1.8,IN_MAH:1.3},
      issues:{tax:0.4,nhs:0.3,imm:0.9,world:0.6,climate:-0.4,crime:0.8} },
    { key:"secular",    name:"Secular Liberals",       size:0.14, align:-0.9,
      regions:{IN_SOU:1.4,IN_EAS:1.3,IN_NWE:1.2},
      issues:{tax:-0.2,nhs:0.7,imm:-0.6,world:-0.3,climate:0.4,crime:-0.1} },
    { key:"obc_mandal", name:"OBC & Mandal Bloc",      size:0.16, align:-0.3,
      regions:{IN_NOR:1.6,IN_MAH:1.2},
      issues:{tax:-0.2,nhs:0.7,imm:0.2,world:0.0,climate:-0.1,crime:0.3} },
    { key:"dalit",      name:"Dalit-Bahujan",          size:0.12, align:-0.6,
      regions:{IN_NOR:1.4,IN_NWE:1.3},
      issues:{tax:-0.3,nhs:0.8,imm:-0.1,world:-0.1,climate:0.1,crime:0.1} },
    { key:"farmers_in", name:"Agrarian & Rural",       size:0.16, align:-0.1,
      regions:{IN_NWE:1.6,IN_NOR:1.3,IN_GUJ:1.2},
      issues:{tax:-0.2,nhs:0.6,imm:0.3,world:0.1,climate:-0.2,crime:0.3} },
    { key:"urban_mid",  name:"Urban Middle Class",     size:0.12, align: 0.5,
      regions:{IN_MAH:1.5,IN_SOU:1.3,IN_GUJ:1.3},
      issues:{tax:0.7,nhs:0.1,imm:0.3,world:0.5,climate:0.2,crime:0.4} },
    { key:"south_reg",  name:"Southern Regionalists",  size:0.12, align:-0.4,
      regions:{IN_SOU:2.2},
      issues:{tax:-0.1,nhs:0.6,imm:-0.2,world:-0.2,climate:0.3,crime:0.1} }
  ],

  /* ── One-party regimes (KP · SU · CU · CN) ──────────────────────────────── */
  /* deliberately region-agnostic: the seat share is ~unanimous, so these move
     the flavour panel only. */
  _regime: [
    { key:"loyalists",  name:"Party Loyalists",        size:0.22, align: 0.0, regions:{},
      issues:{tax:0.0,nhs:0.3,imm:0.0,world:0.2,climate:0.0,crime:0.4} },
    { key:"military",   name:"Military & Security",    size:0.18, align: 0.5, regions:{},
      issues:{tax:0.2,nhs:0.0,imm:0.4,world:0.6,climate:-0.2,crime:0.8} },
    { key:"technocrats",name:"State Technocrats",      size:0.16, align: 0.2, regions:{},
      issues:{tax:0.4,nhs:0.2,imm:0.0,world:0.4,climate:0.3,crime:0.2} },
    { key:"workers",    name:"Workers & Peasants",     size:0.18, align:-0.5, regions:{},
      issues:{tax:-0.4,nhs:0.7,imm:0.0,world:-0.1,climate:0.0,crime:0.2} },
    { key:"youth",      name:"Youth League",           size:0.12, align:-0.2, regions:{},
      issues:{tax:-0.1,nhs:0.4,imm:-0.1,world:0.0,climate:0.5,crime:0.0} },
    { key:"reformers",  name:"Quiet Reformers",        size:0.14, align:-0.8, regions:{},
      issues:{tax:0.1,nhs:0.5,imm:-0.2,world:-0.3,climate:0.4,crime:-0.2} }
  ]
};

/* the UK set stays the canonical G.ELECTORATE_BLOCS for back-compat */
G.ELECTORATE_BLOCS = G.ELECTORATE_BLOCS_BY_COUNTRY.uk;

/* resolve the current country code (lowercase 2-letter) */
G.activeCountry = function () {
  var st = G.state;
  if (st && st._country) return String(st._country).toLowerCase();
  var sys = G.activeElectoralSystem && G.activeElectoralSystem();
  if (sys && sys.country) {
    var c = String(sys.country).toLowerCase();
    var map = { japan:"jp", china:"cn", germany:"de", france:"fr", australia:"au", canada:"ca", india:"in" };
    return map[c] || c;
  }
  return "uk";
};

/* the bloc set for a country (falls back to the shared regime set, then UK) */
G.blocsFor = function (country) {
  country = (country || "uk").toLowerCase();
  var m = G.ELECTORATE_BLOCS_BY_COUNTRY;
  if (m[country]) return m[country];
  if (country === "kp" || country === "su" || country === "cu" || country === "cn") return m._regime;
  return m.uk;
};

/* the blocs for the country currently in play */
G.activeBlocs = function () { return G.blocsFor(G.activeCountry()); };

/* ---- seed bloc support from player alignment + manifesto ------------------ */
/* Formula: 50 + clamp(−18..18, (2 − |playerAlign − bloc.align|) × 9)
   then nudged ±1.5 per manifesto stance weighted by issue sensitivity.       */
G.electorateInit = function (playerAlign, policy) {
  var support = {};
  G.activeBlocs().forEach(function (b) {
    var base = 50 + Math.max(-18, Math.min(18, (2 - Math.abs((playerAlign || 0) - b.align)) * 9));
    if (policy && G.POLICY_AXES) {
      G.POLICY_AXES.forEach(function (ax) {
        var opt = G.policyOption ? G.policyOption(ax.key, policy[ax.key]) : null;
        if (!opt) return;
        var sens = b.issues[ax.key] || 0;
        var optIdx = ax.options.indexOf(opt);
        /* index 0 = right/hard stance, index 2 = left/open stance */
        var dir = optIdx === 0 ? 1 : (optIdx === 2 ? -1 : 0);
        base += dir * sens * 1.5;
      });
    }
    support[b.key] = Math.max(0, Math.min(100, Math.round(base)));
  });
  return support;
};

/* ---- national vote nudge (≈ ±0.09) --------------------------------------- */
/* The voter blocs are a real force now: a well-tended electorate is worth
   close to a full difficulty tier of national vote. */
G.electorateVoteMod = function (blocSupport) {
  if (!blocSupport) return 0;
  var scale = 0.09;
  var sum = 0, total = 0;
  G.activeBlocs().forEach(function (b) {
    var s = blocSupport[b.key] != null ? blocSupport[b.key] : 50;
    sum += b.size * (s - 50);
    total += b.size;
  });
  if (!(total > 0)) return 0;
  return Math.max(-scale, Math.min(scale, (sum / total) * (scale / 18)));
};

/* ---- per-region logit tilt ----------------------------------------------- */
/* Now a meaningful swing, not a cosmetic one: a region whose blocs have swung
   hard behind you can move a real slice of its seats. Uses the active country's
   regions so the tilt lands on the right seats.                              */
G.ELECT_REGION_SCALE = 0.11;      // per (support-50) point, size×concentration weighted
G.electorateRegionTilt = function (blocSupport) {
  if (!blocSupport) return {};
  var scale = G.ELECT_REGION_SCALE;
  var tilt = {};
  var blocs = G.activeBlocs();
  var regions = (G.activeRegions ? G.activeRegions() : null) || G.REGIONS || [];
  regions.forEach(function (r) {
    var tot = 0, wt = 0;
    blocs.forEach(function (b) {
      var mul = (b.regions && b.regions[r.id] != null) ? b.regions[r.id] : 1.0;
      var s = blocSupport[b.key] != null ? blocSupport[b.key] : 50;
      tot += b.size * mul * (s - 50);
      wt  += b.size * mul;
    });
    tilt[r.id] = wt > 0
      ? Math.max(-scale * 4, Math.min(scale * 4, (tot / wt) * (scale / 18)))
      : 0;
  });
  return tilt;
};

/* ---- per-SEAT bloc texture (mean-zero within a region) -------------------
   The region tilt above moves the seat COUNT; this decides WHICH seats move.
   Each seat has a deterministic bloc profile (its region's concentrations,
   varied per seat by a stable hash), so when a bloc swings, the seats where
   that bloc actually lives are the ones that flip. Mean-zero within the region
   so it adds texture without changing the count (keeps the forecast honest).
   Pure function of blocSupport + seat id → fully reproducible.               */
G.seatElectorateTexture = function (c, blocSupport, regionId) {
  if (!blocSupport || !c) return 0;
  var blocs = G.activeBlocs();
  var seatId = c.gss || c.id || "";
  var K = G.CONFIG && G.CONFIG.seatElectorateK != null ? G.CONFIG.seatElectorateK : 0.020;
  var num = 0, den = 0, baseNum = 0, baseDen = 0;
  blocs.forEach(function (b) {
    var conc = (b.regions && b.regions[regionId] != null) ? b.regions[regionId] : 1.0;
    if (conc <= 0) return;
    var s = blocSupport[b.key] != null ? blocSupport[b.key] : 50;
    var jit = 0.35 + 1.30 * (((G.hash32 ? G.hash32(seatId + "|" + b.key) : 0) % 1000) / 1000);  // 0.35..1.65
    var w = b.size * conc * jit, wb = b.size * conc;
    num += w * (s - 50); den += w;
    baseNum += wb * (s - 50); baseDen += wb;
  });
  var seatVal = den > 0 ? num / den : 0;
  var regVal  = baseDen > 0 ? baseNum / baseDen : 0;
  return K * (seatVal - regVal);          // deviation from the region mean
};

/* ---- apply a delta map, clamp 0–100 -------------------------------------- */
G.electorateShift = function (blocSupport, deltas) {
  if (!blocSupport || !deltas) return blocSupport || {};
  Object.keys(deltas).forEach(function (k) {
    var cur = blocSupport[k] != null ? blocSupport[k] : 50;
    blocSupport[k] = Math.max(0, Math.min(100, cur + (deltas[k] || 0)));
  });
  return blocSupport;
};

/* ---- implicit nudge from an issue-axis policy direction ------------------- */
G.electorateIssueNudge = function (axisKey, dir, blocSupport, k) {
  if (!blocSupport || !axisKey || !dir) return blocSupport;
  k = k != null ? k : 0.025;
  var deltas = {};
  G.activeBlocs().forEach(function (b) {
    var sens = b.issues[axisKey] || 0;
    if (Math.abs(sens) < 0.1) return;
    deltas[b.key] = dir * sens * k * 100;
  });
  return G.electorateShift(blocSupport, deltas);
};

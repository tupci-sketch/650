/* =============================================================================
   650 — INTERNATIONAL ELECTORAL SYSTEMS (v1)
   -----------------------------------------------------------------------------
   Supports six electoral systems beyond UK FPTP:
     • PR D'Hondt       — proportional party-list (Germany, Netherlands, Spain)
     • Two-Round (TRS)  — run-off system (France, Brazil, Russia)
     • Alternative Vote — preferential voting (Australia)
     • Electoral College— US presidential winner-takes-state
     • Guided Democracy — "elections" in single-party/authoritarian states
     • MMP              — mixed-member proportional (Germany modern, NZ)

   Country region sets for 12 countries/systems.
   All simulate() and estimateFn() functions receive the same params structure
   as the existing FPTP engine but route through system-specific logic.
   ========================================================================== */
window.G = window.G || {};

/* =========================================================================
   1 · COUNTRY REGIONS  —  replaces G.REGIONS when a scenario is active
   ========================================================================= */
G.COUNTRY_REGIONS = {

  /* ---- United Kingdom (existing 12 regions for reference) ---------------- */
  uk: null,   // null = use existing G.REGIONS

  /* ---- USA House of Representatives (435 seats) ------------------------- */
  usa_house: [
    { id:"US_NE",  name:"New England",             seats:21, lean:-0.55 },
    { id:"US_MA",  name:"Mid-Atlantic (NY/NJ/PA/MD/DE)", seats:65, lean:-0.25 },
    { id:"US_GL",  name:"Great Lakes (OH/MI/IN/IL/WI/MN)", seats:70, lean:-0.05 },
    { id:"US_PL",  name:"Great Plains (IA/MO/ND/SD/NE/KS)", seats:21, lean:+0.55 },
    { id:"US_SE",  name:"Southeast (VA/NC/SC/GA/FL/AL/MS/TN/KY/AR/LA)", seats:114, lean:+0.40 },
    { id:"US_TX",  name:"Texas",                   seats:38, lean:+0.30 },
    { id:"US_SW",  name:"Southwest (AZ/NM/NV/CO/UT/ID/WY/MT)", seats:33, lean:+0.10 },
    { id:"US_PNW", name:"Pacific Northwest (WA/OR/AK/HI)", seats:19, lean:-0.40 },
    { id:"US_CA",  name:"California",              seats:52, lean:-0.60 },
    { id:"US_WV",  name:"Appalachia (WV)",         seats:2,  lean:+0.65 }
  ],

  /* ---- USA Electoral College (538 EV; 270 to win) ----------------------- */
  usa_ec: [
    { id:"EC_SAFE_DEM", name:"Safe Democrat (CA, NY, IL, WA, OR…)",  seats:182, lean:-0.90 },
    { id:"EC_LEAN_DEM", name:"Lean Democrat (CO, VA, MN, NM, NH…)",  seats:46,  lean:-0.30 },
    { id:"EC_NV",       name:"Nevada",                                seats:6,   lean:-0.10 },
    { id:"EC_MI",       name:"Michigan",                              seats:15,  lean:-0.05 },
    { id:"EC_WI",       name:"Wisconsin",                             seats:10,  lean:+0.00 },
    { id:"EC_PA",       name:"Pennsylvania",                          seats:19,  lean:+0.00 },
    { id:"EC_AZ",       name:"Arizona",                               seats:11,  lean:+0.05 },
    { id:"EC_GA",       name:"Georgia",                               seats:16,  lean:+0.05 },
    { id:"EC_NC",       name:"North Carolina",                        seats:16,  lean:+0.15 },
    { id:"EC_LEAN_REP", name:"Lean Republican (FL, OH, TX-2, IA…)",  seats:62,  lean:+0.35 },
    { id:"EC_SAFE_REP", name:"Safe Republican (TX, others…)",        seats:155, lean:+0.90 }
  ],

  /* ---- Germany — Weimar Reichstag 1932 (647 seats, PR) ----------------- */
  germany_weimar: [
    { id:"DE_PR",  name:"Prussia",          seats:290, lean: 0 },
    { id:"DE_BY",  name:"Bavaria",          seats: 88, lean:+0.12 },
    { id:"DE_SA",  name:"Saxony",           seats: 43, lean:-0.10 },
    { id:"DE_WU",  name:"Württemberg",      seats: 22, lean:+0.08 },
    { id:"DE_BA",  name:"Baden",            seats: 17, lean:+0.05 },
    { id:"DE_TH",  name:"Thuringia",        seats: 16, lean:+0.05 },
    { id:"DE_HE",  name:"Hesse",            seats: 14, lean:+0.02 },
    { id:"DE_HH",  name:"Hamburg",          seats: 12, lean:-0.15 },
    { id:"DE_BR",  name:"Bremen",           seats:  5, lean:-0.10 },
    { id:"DE_OT",  name:"Other states",     seats:140, lean: 0 }
  ],

  /* ---- Germany — Bundestag 2021 (736 seats, MMP) ----------------------- */
  germany_modern: [
    { id:"DM_BW",  name:"Baden-Württemberg",        seats: 86, lean:+0.08 },
    { id:"DM_BY",  name:"Bavaria",                  seats: 92, lean:+0.12 },
    { id:"DM_BE",  name:"Berlin",                   seats: 34, lean:-0.20 },
    { id:"DM_BB",  name:"Brandenburg",              seats: 29, lean:+0.05 },
    { id:"DM_HB",  name:"Bremen",                   seats:  9, lean:-0.18 },
    { id:"DM_HH",  name:"Hamburg",                  seats: 24, lean:-0.15 },
    { id:"DM_HE",  name:"Hesse",                    seats: 50, lean:+0.03 },
    { id:"DM_MV",  name:"Mecklenburg-Vorpommern",   seats: 22, lean:+0.10 },
    { id:"DM_NI",  name:"Lower Saxony",             seats: 72, lean:-0.05 },
    { id:"DM_NW",  name:"North Rhine-Westphalia",   seats:141, lean:-0.08 },
    { id:"DM_RP",  name:"Rhineland-Palatinate",     seats: 40, lean:+0.02 },
    { id:"DM_SL",  name:"Saarland",                 seats: 11, lean:-0.03 },
    { id:"DM_SN",  name:"Saxony",                   seats: 40, lean:+0.15 },
    { id:"DM_ST",  name:"Saxony-Anhalt",            seats: 27, lean:+0.18 },
    { id:"DM_SH",  name:"Schleswig-Holstein",       seats: 34, lean:+0.00 },
    { id:"DM_TH",  name:"Thuringia",                seats: 25, lean:+0.18 }
  ],

  /* ---- France — National Assembly 5th Republic (577 seats, TRS) --------- */
  france: [
    { id:"FR_IDF", name:"Île-de-France (Paris région)",          seats: 93, lean:-0.10 },
    { id:"FR_NO",  name:"Northern France (Nord, Picardie…)",     seats: 78, lean:+0.08 },
    { id:"FR_NE",  name:"Eastern France (Alsace, Lorraine…)",    seats: 60, lean:+0.05 },
    { id:"FR_OUE", name:"Western France (Bretagne, Normandie…)", seats: 85, lean:-0.05 },
    { id:"FR_CEN", name:"Centre & Aquitaine",                    seats: 81, lean:-0.02 },
    { id:"FR_SUD", name:"Midi & Rhône-Alpes (South + Lyon)",    seats:152, lean:+0.03 },
    { id:"FR_OUT", name:"Outre-mer (overseas territories)",       seats: 28, lean:-0.10 }
  ],

  /* ---- Australia — House of Representatives (151 seats, AV) ------------ */
  australia: [
    { id:"AU_NSW", name:"New South Wales",       seats: 46, lean:-0.02 },
    { id:"AU_VIC", name:"Victoria",              seats: 38, lean:-0.08 },
    { id:"AU_QLD", name:"Queensland",            seats: 30, lean:+0.05 },
    { id:"AU_WA",  name:"Western Australia",     seats: 16, lean:-0.03 },
    { id:"AU_SA",  name:"South Australia",       seats: 11, lean:-0.02 },
    { id:"AU_TAS", name:"Tasmania",              seats:  5, lean:-0.05 },
    { id:"AU_ACT", name:"ACT & Northern Territory", seats: 5, lean:-0.12 }
  ],

  /* ---- Canada — House of Commons (338 seats, FPTP) --------------------- */
  canada: [
    { id:"CA_BC",  name:"British Columbia",      seats: 43, lean:-0.05 },
    { id:"CA_PR",  name:"Prairies (AB, SK, MB)", seats: 62, lean:+0.45 },
    { id:"CA_ON",  name:"Ontario",               seats:121, lean:-0.02 },
    { id:"CA_QC",  name:"Quebec",                seats: 78, lean:-0.08 },
    { id:"CA_ATL", name:"Atlantic provinces",    seats: 32, lean:-0.10 },
    { id:"CA_NT",  name:"Northern territories",  seats:  2, lean:-0.05 }
  ],

  /* ---- Japan — House of Representatives (465 seats, Mixed FPTP+PR) ----- */
  japan: [
    { id:"JP_TO",  name:"Tokyo",                 seats: 42, lean:-0.05 },
    { id:"JP_OS",  name:"Osaka / Kinki",         seats: 68, lean:+0.05 },
    { id:"JP_KA",  name:"Kantō (excl. Tokyo)",   seats: 80, lean:+0.02 },
    { id:"JP_CH",  name:"Chūbu / Nagoya area",   seats: 55, lean:+0.03 },
    { id:"JP_TH",  name:"Tōhoku (NE Honshū)",   seats: 39, lean:+0.02 },
    { id:"JP_CG",  name:"Chūgoku / Shikoku",     seats: 40, lean:+0.08 },
    { id:"JP_KY",  name:"Kyushu / Okinawa",      seats: 65, lean:+0.05 },
    { id:"JP_HK",  name:"Hokkaido",              seats: 20, lean:-0.02 },
    { id:"JP_PR",  name:"Proportional (national list seats)", seats: 56, lean: 0 }
  ],

  /* ---- India — Lok Sabha (543 seats, FPTP) ----------------------------- */
  india: [
    { id:"IN_NOR", name:"Northern (UP, Bihar, Jharkhand, Uttarakhand)", seats:108, lean:+0.15 },
    { id:"IN_NWE", name:"Northwest (Punjab, Haryana, Delhi, Rajasthan)", seats: 88, lean:+0.10 },
    { id:"IN_MAH", name:"Maharashtra & Goa",                             seats: 49, lean:+0.02 },
    { id:"IN_GUJ", name:"Gujarat, Madhya Pradesh & Chhattisgarh",       seats: 71, lean:+0.20 },
    { id:"IN_SOU", name:"Southern states (TN, Kerala, Karnataka, AP, TS)", seats:129, lean:-0.10 },
    { id:"IN_EAS", name:"Eastern (West Bengal, Odisha, Assam, NE)",     seats: 91, lean:+0.05 },
    { id:"IN_OTH", name:"Others (J&K, HP, Goa, etc.)",                  seats:  7, lean: 0 }
  ],

  /* ---- North Korea — Supreme People's Assembly (687 seats) -------------- */
  north_korea: [
    { id:"KP_PY",  name:"Pyongyang",                           seats: 53, lean: 0 },
    { id:"KP_NN",  name:"North Pyongan & Chagang",             seats: 78, lean: 0 },
    { id:"KP_SN",  name:"South Pyongan & Nampho",              seats:112, lean: 0 },
    { id:"KP_KG",  name:"Kangwon",                             seats: 38, lean: 0 },
    { id:"KP_HW",  name:"Hwanghae provinces",                  seats:102, lean: 0 },
    { id:"KP_HN",  name:"North Hamgyong",                      seats: 58, lean: 0 },
    { id:"KP_HS",  name:"South Hamgyong & Hamhung",            seats:112, lean: 0 },
    { id:"KP_RY",  name:"Ryanggang",                           seats: 32, lean: 0 },
    { id:"KP_OT",  name:"Other regions",                       seats:102, lean: 0 }
  ],

  /* ---- Soviet Union — Supreme Soviet 1937 (569 seats) ------------------- */
  soviet_1937: [
    { id:"SU_RS",  name:"Russian SFSR",              seats:330, lean: 0 },
    { id:"SU_UK",  name:"Ukrainian SSR",             seats:103, lean: 0 },
    { id:"SU_BE",  name:"Byelorussian SSR",          seats: 44, lean: 0 },
    { id:"SU_TR",  name:"Transcaucasian republics",  seats: 42, lean: 0 },
    { id:"SU_KZ",  name:"Central Asian SSRs",        seats: 33, lean: 0 },
    { id:"SU_OT",  name:"Other union republics",     seats: 17, lean: 0 }
  ],

  /* ---- Cuba — National Assembly (470 seats) ----------------------------- */
  cuba: [
    { id:"CU_HAB", name:"La Habana",                            seats: 78, lean: 0 },
    { id:"CU_OR",  name:"Oriente (Santiago, Guantánamo, Holguín)", seats: 95, lean: 0 },
    { id:"CU_CAM", name:"Camagüey & Las Tunas",                 seats: 72, lean: 0 },
    { id:"CU_VIL", name:"Villa Clara & Cienfuegos",             seats: 71, lean: 0 },
    { id:"CU_MAT", name:"Matanzas & surrounding",               seats: 65, lean: 0 },
    { id:"CU_PNR", name:"Pinar del Río & Artemisa",             seats: 44, lean: 0 },
    { id:"CU_GRA", name:"Granma & other eastern",               seats: 45, lean: 0 }
  ],

  /* ---- China — National People's Congress (2980 seats, full Congress) --- */
  china: [
    { id:"CN_BJ",  name:"Beijing & Tianjin",         seats: 84, lean: 0 },
    { id:"CN_SH",  name:"Shanghai",                  seats: 57, lean: 0 },
    { id:"CN_NOR", name:"Northeast (Heilongjiang, Jilin, Liaoning)", seats:261, lean: 0 },
    { id:"CN_HUB", name:"Hubei, Hunan & Jiangxi",   seats:330, lean: 0 },
    { id:"CN_GUA", name:"Guangdong & Guangxi",       seats:300, lean: 0 },
    { id:"CN_NWE", name:"Northwest (Xinjiang, Tibet, Qinghai, Gansu, Ningxia)", seats:216, lean: 0 },
    { id:"CN_CEN", name:"Central provinces",         seats:450, lean: 0 },
    { id:"CN_SOU", name:"Southern coastal provinces",seats:450, lean: 0 },
    { id:"CN_OTH", name:"Military, diaspora & HK/MC seats", seats:832, lean: 0 }
  ]
};

/* =========================================================================
   2 · ACTIVE REGIONS AND SYSTEM RESOLVERS
   ========================================================================= */
G.activeRegions = function () {
  var key = G.state && G.state._countryRegionKey;
  if (key && G.COUNTRY_REGIONS[key]) return G.COUNTRY_REGIONS[key];
  return G.REGIONS;
};

G.activeTotalSeats = function () {
  var sys = G.activeElectoralSystem && G.activeElectoralSystem();
  if (sys && sys.totalSeats) return sys.totalSeats;
  return (G.CONFIG && G.CONFIG.totalSeats) || 650;
};

G.activeMajority = function () {
  var sys = G.activeElectoralSystem && G.activeElectoralSystem();
  if (sys && sys.majority) return sys.majority;
  return (G.CONFIG && G.CONFIG.majority) || 326;
};

/* =========================================================================
   3 · D'HONDT PROPORTIONAL REPRESENTATION
   ========================================================================= */
G._dhondtAllocate = function (votes, totalSeats) {
  var seats = {};
  Object.keys(votes).forEach(function (p) { seats[p] = 0; });
  for (var i = 0; i < totalSeats; i++) {
    var best = null, bestQ = -1;
    Object.keys(votes).forEach(function (p) {
      if (!votes[p]) return;
      var q = votes[p] / (seats[p] + 1);
      if (q > bestQ) { bestQ = q; best = p; }
    });
    if (best) seats[best]++;
  }
  return seats;
};

G.simulatePR = function (params, rnd) {
  rnd = rnd || Math.random;
  var sys = G.activeElectoralSystem();
  var regions = G.activeRegions();
  var totalSeats = sys ? sys.totalSeats : 650;
  var threshold = (sys && sys.threshold != null) ? sys.threshold : 0.05;
  var bloc = G.playerBloc(params.mode, params.lineage, params.custom);
  var vote = params.vote;

  /* Build weighted opposition vote shares from landscape */
  var partyVotes = {};
  partyVotes[bloc.label] = vote;
  var totalWeight = 0;
  regions.forEach(function (r) {
    var land = G.activeLandscape ? G.activeLandscape(r.id) : (G.COUNTRY_LANDSCAPES && G.COUNTRY_LANDSCAPES._active && G.COUNTRY_LANDSCAPES._active[r.id]);
    if (!land) land = [];
    var weight = r.seats / totalSeats;
    totalWeight += weight;
    land.forEach(function (e) {
      var party = e[0], share = e[1] / 100;
      if (party !== bloc.label && party !== bloc.excl) {
        partyVotes[party] = (partyVotes[party] || 0) + share * weight;
      }
    });
  });

  /* Scale opposition so everything sums to 1 */
  var oppTotal = 0;
  Object.keys(partyVotes).forEach(function (p) {
    if (p !== bloc.label) oppTotal += partyVotes[p];
  });
  if (oppTotal > 0) {
    var scale = (1 - vote) / oppTotal;
    Object.keys(partyVotes).forEach(function (p) {
      if (p !== bloc.label) partyVotes[p] *= scale;
    });
  }

  /* Apply noise to opposition (simulates campaign volatility) */
  Object.keys(partyVotes).forEach(function (p) {
    if (p !== bloc.label) {
      partyVotes[p] = Math.max(0, partyVotes[p] + G.gaussR(rnd) * 0.02 * (params.noiseMul || 1));
    }
  });

  /* Threshold filter */
  var aboveThreshold = {}, thresholdTotal = 0;
  Object.keys(partyVotes).forEach(function (p) {
    if (partyVotes[p] >= threshold) {
      aboveThreshold[p] = partyVotes[p];
      thresholdTotal += partyVotes[p];
    }
  });
  /* Normalise */
  if (thresholdTotal > 0) {
    Object.keys(aboveThreshold).forEach(function (p) {
      aboveThreshold[p] /= thresholdTotal;
    });
  }

  /* D'Hondt seat allocation */
  var seatAlloc = G._dhondtAllocate(aboveThreshold, totalSeats);
  var playerSeats = seatAlloc[bloc.label] || 0;

  /* Build byRegion. Each region's player strength gives a weight; the national
     D'Hondt total (playerSeats) is then distributed across regions by largest
     remainder so the regional wins sum *exactly* to the headline seat count
     (keeps the per-seat map consistent with the result). */
  var byRegion = regions.map(function (r) {
    var share = aboveThreshold[bloc.label] || 0;
    var tilt = (params.regionTilt && params.regionTilt[r.id]) || 0;
    var adjustedShare = Math.max(0, Math.min(1, share + tilt * 0.1));
    var land = G.activeLandscape ? G.activeLandscape(r.id) : [];
    if (land && land.length) {
      var landShare = 0;
      land.forEach(function (e) { if (e[0] === bloc.label) landShare = e[1] / 100; });
      adjustedShare = 0.5 * adjustedShare + 0.5 * landShare;
    }
    return { id: r.id, name: r.name, total: r.seats, won: 0, winnable: true,
             _w: Math.max(0, adjustedShare) * r.seats };
  });
  G._allocateRegional(byRegion, playerSeats);

  return G._prReturn(playerSeats, byRegion, seatAlloc, bloc, aboveThreshold);
};

/* distribute `target` seats across regions by largest remainder of `_w`,
   capped at each region's total. Deterministic; mutates each region's `won`. */
G._allocateRegional = function (byRegion, target) {
  var wsum = 0; byRegion.forEach(function (b) { wsum += b._w; });
  var quota = byRegion.map(function (b) { return wsum > 0 ? target * b._w / wsum : 0; });
  var assigned = 0;
  byRegion.forEach(function (b, i) { b.won = Math.min(b.total, Math.floor(quota[i])); assigned += b.won; });
  var order = byRegion.map(function (b, i) { return { i: i, f: quota[i] - Math.floor(quota[i]) }; })
                      .sort(function (a, b) { return b.f - a.f; });
  var k = 0, guard = byRegion.length * 64 + 16;
  while (assigned < target && guard-- > 0) {
    var b = byRegion[order[k % order.length].i];
    if (b.won < b.total) { b.won++; assigned++; }
    k++;
  }
  byRegion.forEach(function (b) { delete b._w; });
};

G._prReturn = function (playerSeats, byRegion, seatAlloc, bloc, votes) {
  var breakdown = Object.keys(seatAlloc).map(function (p) {
    return { party: p, seats: seatAlloc[p], isYou: p === bloc.label,
             colour: p === bloc.label ? bloc.colour : ((G.PARTIES && G.PARTIES[p]) ? G.PARTIES[p].colour : "#6b6b6b") };
  }).sort(function (a, b) { return b.seats - a.seats; });
  return { seats: playerSeats, byRegion: byRegion, breakdown: breakdown,
           blocLabel: bloc.label, blocColour: bloc.colour,
           system: "pr", partyVotes: votes, seatAlloc: seatAlloc };
};

G.estimateSeatsPR = function (params, rnd) {
  var sys = G.activeElectoralSystem();
  var totalSeats = sys ? sys.totalSeats : 650;
  var threshold = (sys && sys.threshold != null) ? sys.threshold : 0.05;
  if (params.vote < threshold) return 0;
  /* Fast estimate: D'Hondt seat share ≈ vote / (vote + sum_opp) × total */
  /* With noise */
  var vote = params.vote + G.gaussR(rnd) * 0.025 * (params.noiseMul || 1);
  vote = Math.max(0.01, Math.min(0.99, vote));
  return Math.round(totalSeats * vote);
};

/* =========================================================================
   4 · TWO-ROUND SYSTEM (France, Brazil, etc.)
   ========================================================================= */
G.simulateTRS = function (params, rnd) {
  rnd = rnd || Math.random;
  var sys = G.activeElectoralSystem();
  var regions = G.activeRegions();
  var totalSeats = sys ? sys.totalSeats : 577;
  var C = G.CONFIG;
  var bloc = G.playerBloc(params.mode, params.lineage, params.custom);

  /* Round 1: logit-based win per region */
  var baseLogit = (C.seatsK || 17) * (params.vote - ((C.seatsMid || 0.38) + (params.midShift || 0)));
  var noise = (C.seatNoise || 0.70) * (params.noiseMul || 1);
  var nat = G.gaussR(rnd) * 0.25 * (params.noiseMul || 1);

  /* In TRS, round 1 requires >50% outright — much harder. We model this
     by raising the effective threshold: about 30-40% of seats won outright
     at high vote shares, fewer at low. */
  var r1Boost = -0.45; /* logit offset making it harder to win outright */
  var r1Seats = 0, r2Seats = 0;
  var byRegion = regions.map(function (r) {
    var lean = r.lean || 0;
    lean += G.alignRegionTilt(params.mode, params.align || 0, r.id);
    lean += (params.regionTilt && params.regionTilt[r.id]) || 0;
    var regSwing = G.gaussR(rnd) * 0.15 * (params.noiseMul || 1);

    /* Round 1 outright wins (>50% threshold — harder logit) */
    var p1 = G.sigmoid(baseLogit + r1Boost + lean + nat + regSwing + G.gaussR(rnd) * noise);
    var mean1 = r.seats * p1, sd1 = Math.sqrt(Math.max(0.01, r.seats * p1 * (1 - p1)));
    var won1 = Math.max(0, Math.min(r.seats, Math.round(mean1 + G.gaussR(rnd) * sd1)));
    r1Seats += won1;

    /* Round 2: remaining seats — player's vote boosted by coalition endorsements
       Alignment matters: centrist players attract more cross-party support */
    var coalBoost = 0.15 - Math.abs(params.align || 0) * 0.05; /* centrists gain more */
    var r2Seats_r = r.seats - won1;
    var p2 = G.sigmoid(baseLogit + 0.10 + lean + nat + regSwing + coalBoost + G.gaussR(rnd) * noise);
    var mean2 = r2Seats_r * p2, sd2 = Math.sqrt(Math.max(0.01, r2Seats_r * p2 * (1 - p2)));
    var won2 = Math.max(0, Math.min(r2Seats_r, Math.round(mean2 + G.gaussR(rnd) * sd2)));
    r2Seats += won2;

    return { id: r.id, name: r.name, total: r.seats, won: won1 + won2, winnable: true };
  });

  var playerSeats = r1Seats + r2Seats;

  /* Build simplified breakdown */
  var landscape = G.activeLandscape ? G.activeLandscape(regions[0] && regions[0].id) : [];
  var breakdown = [{ party: bloc.label, seats: playerSeats, isYou: true, colour: bloc.colour }];
  var remaining = totalSeats - playerSeats;
  if (landscape && landscape.length > 1) {
    var oppTotal = 0;
    landscape.slice(1).forEach(function (e) { oppTotal += e[1]; });
    landscape.slice(1, 4).forEach(function (e) {
      var share = e[1] / (oppTotal || 1);
      var oppSeats = Math.round(remaining * share);
      breakdown.push({ party: e[0], seats: oppSeats, isYou: false,
                       colour: (G.PARTIES && G.PARTIES[e[0]]) ? G.PARTIES[e[0]].colour : "#6b6b6b" });
    });
  }

  return { seats: playerSeats, byRegion: byRegion, breakdown: breakdown,
           blocLabel: bloc.label, blocColour: bloc.colour, system: "trs",
           r1Seats: r1Seats, r2Seats: r2Seats };
};

G.estimateSeatsTRS = function (params, rnd) {
  var regions = G.activeRegions();
  var C = G.CONFIG;
  var baseLogit = (C.seatsK || 17) * (params.vote - ((C.seatsMid || 0.38) + (params.midShift || 0)));
  var nat = G.gaussR(rnd) * 0.25 * (params.noiseMul || 1);
  var total = 0;
  regions.forEach(function (r) {
    var lean = r.lean || 0;
    lean += G.alignRegionTilt(params.mode, params.align || 0, r.id);
    lean += (params.regionTilt && params.regionTilt[r.id]) || 0;
    var noise = (C.seatNoise || 0.70) * (params.noiseMul || 1);
    /* Combined round 1 + round 2 estimate */
    var p = G.sigmoid(baseLogit + 0.08 + lean + nat + G.gaussR(rnd) * noise);
    var mean = r.seats * p, sd = Math.sqrt(Math.max(0.01, r.seats * p * (1 - p)));
    total += Math.max(0, Math.min(r.seats, Math.round(mean + G.gaussR(rnd) * sd)));
  });
  return total;
};

/* =========================================================================
   5 · ALTERNATIVE VOTE / PREFERENTIAL VOTING (Australia)
   ========================================================================= */
G.simulateAV = function (params, rnd) {
  rnd = rnd || Math.random;
  /* AV is similar to FPTP but with preference flows.
     Centrist players benefit from 2nd preferences from minor parties.
     Strong ideological players gain less cross-preference support.
     We model this as a vote modifier + slightly smoother swing curve. */
  var alignment = params.align || 0;
  var prefFlow = 0.04 - Math.abs(alignment) * 0.015; /* centrist +4%, extreme +/-1% */
  var effectiveVote = Math.max(0.05, Math.min(0.62, params.vote + prefFlow));
  var adjustedParams = Object.assign({}, params, {
    vote: effectiveVote,
    avMode: true
  });

  /* Use FPTP-style simulation with the adjusted vote and active regions */
  return G._simulateFPTPRegional(adjustedParams, rnd, "av");
};

G.estimateSeatsAV = function (params, rnd) {
  var alignment = params.align || 0;
  var prefFlow = 0.04 - Math.abs(alignment) * 0.015;
  var effectiveVote = Math.max(0.05, Math.min(0.62, params.vote + prefFlow));
  return G._estimateFPTPRegional(Object.assign({}, params, { vote: effectiveVote }), rnd);
};

/* =========================================================================
   6 · ELECTORAL COLLEGE (USA Presidential)
   ========================================================================= */
G.simulateEC = function (params, rnd) {
  rnd = rnd || Math.random;
  var sys = G.activeElectoralSystem();
  var regions = G.activeRegions();       /* these are EC state groups */
  var totalEV = regions.reduce(function (s, r) { return s + r.seats; }, 0);
  var C = G.CONFIG;
  var bloc = G.playerBloc(params.mode, params.lineage, params.custom);

  /* Each state is a discrete win/lose: does player's vote + state lean > 0.5? */
  var baseLogit = (C.seatsK || 17) * (params.vote - 0.50);  /* 50% threshold for EC */
  var nat = G.gaussR(rnd) * 0.18 * (params.noiseMul || 1);
  var noise = 0.35 * (params.noiseMul || 1);  /* more volatility per state */

  var playerEV = 0;
  var byRegion = regions.map(function (r) {
    var lean = r.lean || 0;   /* negative = Dem lean, positive = Rep lean */
    /* EC uses OPPOSITE sign convention for lean (Dem ticket = player likely left-aligned) */
    /* We flip so positive alignment = Rep = positive lean works against left player */
    var stateLean = -lean * (params.align || 0) * 0.2;
    lean += stateLean;
    lean += (params.regionTilt && params.regionTilt[r.id]) || 0;
    var stateNoise = G.gaussR(rnd) * noise;
    var logit = baseLogit - lean * (C.seatsK || 17) + nat + stateNoise;
    var won = rnd() < G.sigmoid(logit);
    if (won) playerEV += r.seats;
    return { id: r.id, name: r.name, total: r.seats, won: won ? r.seats : 0, winnable: true,
             evWon: won ? r.seats : 0 };
  });

  var oppEV = totalEV - playerEV;
  var breakdown = [
    { party: bloc.label, seats: playerEV, isYou: true, colour: bloc.colour },
    { party: "Opposition", seats: oppEV, isYou: false, colour: "#9b9b9b" }
  ];

  return { seats: playerEV, totalEV: totalEV, byRegion: byRegion,
           breakdown: breakdown, blocLabel: bloc.label, blocColour: bloc.colour,
           system: "ec", isElectoralCollege: true };
};

G.estimateSeatsEC = function (params, rnd) {
  var regions = G.activeRegions();
  var C = G.CONFIG;
  var baseLogit = (C.seatsK || 17) * (params.vote - 0.50);
  var nat = G.gaussR(rnd) * 0.18 * (params.noiseMul || 1);
  var noise = 0.35 * (params.noiseMul || 1);
  var totalEV = 0;
  regions.forEach(function (r) {
    var lean = -(r.lean || 0);
    lean += (params.regionTilt && params.regionTilt[r.id]) || 0;
    var logit = baseLogit + lean * (C.seatsK || 17) * 0.05 + nat + G.gaussR(rnd) * noise;
    if (rnd() < G.sigmoid(logit)) totalEV += r.seats;
  });
  return totalEV;
};

/* =========================================================================
   7 · GUIDED DEMOCRACY / SINGLE-PARTY ELECTIONS
   ========================================================================= */
G.simulateGuided = function (params, rnd) {
  rnd = rnd || Math.random;
  var regions = G.activeRegions();
  var totalSeats = regions.reduce(function (s, r) { return s + r.seats; }, 0);
  var bloc = G.playerBloc(params.mode, params.lineage, params.custom);

  /* Always win nearly everything, with small random variation for flavour.
     Derive the headline from the regional wins so the map matches exactly. */
  var playerSeats = 0;
  var byRegion = regions.map(function (r) {
    var won = Math.min(r.seats, Math.round(r.seats * (0.962 + rnd() * 0.035)));  /* 96.2–99.7% */
    playerSeats += won;
    return { id: r.id, name: r.name, total: r.seats, won: won, winnable: true };
  });

  var oppSeats = totalSeats - playerSeats;
  var breakdown = [
    { party: bloc.label, seats: playerSeats, isYou: true, colour: bloc.colour }
  ];
  if (oppSeats > 0) {
    breakdown.push({ party: "Approved independent",  seats: oppSeats, isYou: false, colour: "#555" });
  }

  return { seats: playerSeats, byRegion: byRegion, breakdown: breakdown,
           blocLabel: bloc.label, blocColour: bloc.colour, system: "guided" };
};

G.estimateSeatsGuided = function (params, rnd) {
  var regions = G.activeRegions();
  var total = regions.reduce(function (s, r) { return s + r.seats; }, 0);
  return Math.round(total * (0.97 + rnd() * 0.025));
};

/* =========================================================================
   8 · FPTP REGIONAL (for international FPTP/AV scenarios)
   ========================================================================= */
G._simulateFPTPRegional = function (params, rnd, systemKey) {
  rnd = rnd || Math.random;
  var regions = G.activeRegions();
  var C = G.CONFIG;
  var bloc = G.playerBloc(params.mode, params.lineage, params.custom);
  var baseLogit = (C.seatsK || 17) * (params.vote - ((C.seatsMid || 0.38) + (params.midShift || 0)));
  var noise = (C.seatNoise || 0.70) * (params.noiseMul || 1);
  var nat = G.gaussR(rnd) * 0.30 * (params.noiseMul || 1);
  var totals = {};
  function award(label) { totals[label] = (totals[label] || 0) + 1; }

  var seats = 0;
  var byRegion = regions.map(function (r) {
    var lean = r.lean || 0;
    lean += G.alignRegionTilt(params.mode, params.align || 0, r.id);
    lean += (params.regionTilt && params.regionTilt[r.id]) || 0;
    var regSwing = G.gaussR(rnd) * (C.regionSwing || 0.15) * (params.noiseMul || 1);

    /* Generate synthetic constituency leans for this region */
    var p = G.sigmoid(baseLogit + lean + nat + regSwing);
    var n = r.seats;
    var mean = n * p, sd = Math.sqrt(Math.max(0.01, n * p * (1 - p)));
    var won = Math.max(0, Math.min(n, Math.round(mean + G.gaussR(rnd) * sd)));

    /* Per-seat allocation for landscape */
    var land = (G.activeLandscape ? G.activeLandscape(r.id) : null) || [];
    var lost = n - won;
    totals[bloc.label] = (totals[bloc.label] || 0) + won;
    if (land.length > 1 && lost > 0) {
      /* Distribute lost seats proportionally to opposition */
      var oppTotal = 0;
      land.forEach(function (e) { if (e[0] !== bloc.label) oppTotal += e[1]; });
      land.forEach(function (e) {
        if (e[0] !== bloc.label && oppTotal > 0) {
          var s = Math.round(lost * e[1] / oppTotal);
          totals[e[0]] = (totals[e[0]] || 0) + s;
        }
      });
    } else if (lost > 0) {
      totals["Opposition"] = (totals["Opposition"] || 0) + lost;
    }

    seats += won;
    return { id: r.id, name: r.name, total: r.seats, won: won, winnable: true };
  });

  var breakdown = Object.keys(totals).map(function (p) {
    return { party: p, seats: totals[p], isYou: p === bloc.label,
             colour: p === bloc.label ? bloc.colour : ((G.PARTIES && G.PARTIES[p]) ? G.PARTIES[p].colour : "#6b6b6b") };
  }).sort(function (a, b) { return b.seats - a.seats; });

  return { seats: seats, byRegion: byRegion, breakdown: breakdown,
           blocLabel: bloc.label, blocColour: bloc.colour, system: systemKey || "fptp" };
};

G._estimateFPTPRegional = function (params, rnd) {
  var regions = G.activeRegions();
  var C = G.CONFIG;
  var baseLogit = (C.seatsK || 17) * (params.vote - ((C.seatsMid || 0.38) + (params.midShift || 0)));
  var nat = G.gaussR(rnd) * 0.30 * (params.noiseMul || 1);
  var total = 0;
  regions.forEach(function (r) {
    var lean = r.lean || 0;
    lean += G.alignRegionTilt(params.mode, params.align || 0, r.id);
    lean += (params.regionTilt && params.regionTilt[r.id]) || 0;
    var noise = (C.seatNoise || 0.70) * (params.noiseMul || 1);
    var p = G.sigmoid(baseLogit + lean + nat + G.gaussR(rnd) * noise);
    var mean = r.seats * p, sd = Math.sqrt(Math.max(0.01, r.seats * p * (1 - p)));
    total += Math.max(0, Math.min(r.seats, Math.round(mean + G.gaussR(rnd) * sd)));
  });
  return total;
};

/* =========================================================================
   9 · ELECTORAL SYSTEM DEFINITIONS
   ========================================================================= */
G.ELECTORAL_SYSTEMS = {

  fptp_uk: {
    key: "fptp_uk", name: "First Past the Post",
    subtitle: "650 Westminster seats · winner takes all per constituency",
    country: "UK", flag: "🇬🇧", totalSeats: 650, majority: 326,
    regionKey: "uk",
    chamberName: "House of Commons", headOfGovt: "Prime Minister", termWord: "Parliament",
    govtBuilding: "Downing Street", govtBuildingAction: "Enter Downing Street",
    registeredElectorate: 47586602, typicalTurnout: [0.60, 0.72], hungWord: "Hung parliament",
    simulate:     null,        /* uses existing simulateCampaign */
    estimateFn:   null,        /* uses existing estimateSeats */
    tierFor:      null,        /* uses existing G.tierFor */
    coalitionStyle: "minority" /* hung parliament / minority govt options */
  },

  fptp_usa_house: {
    key: "fptp_usa_house", name: "Congressional Elections",
    subtitle: "435 House seats · first past the post",
    country: "US", flag: "🇺🇸", totalSeats: 435, majority: 218,
    regionKey: "usa_house",
    chamberName: "House of Representatives", headOfGovt: "Speaker", termWord: "Congress",
    govtBuilding: "the Capitol", govtBuildingAction: "Take the Speaker's Chair",
    registeredElectorate: 240000000, typicalTurnout: [0.40, 0.55], hungWord: "No majority",
    simulate:   function (p, rnd) { return G._simulateFPTPRegional(p, rnd, "fptp"); },
    estimateFn: function (p, rnd) { return G._estimateFPTPRegional(p, rnd); },
    tierLabel: function (seats, total) {
      if (seats >= total)   return "Clean Sweep — 435-0";
      if (seats >= 400)     return "Supermajority";
      if (seats >= 290)     return "Strong Majority";
      if (seats >= 218)     return "Working Majority";
      if (seats >= 200)     return "Narrow Minority";
      return "Opposition";
    },
    coalitionStyle: "minority"
  },

  ec_usa_president: {
    key: "ec_usa_president", name: "Presidential Election",
    subtitle: "Electoral College · 538 votes · 270 to win",
    country: "US", flag: "🇺🇸", totalSeats: 538, majority: 270,
    regionKey: "usa_ec",
    chamberName: "Electoral College", headOfGovt: "President", termWord: "Term",
    govtBuilding: "the White House", govtBuildingAction: "Enter the White House",
    registeredElectorate: 240000000, typicalTurnout: [0.50, 0.65], hungWord: "No winner — faithless electors",
    simulate:   function (p, rnd) { return G.simulateEC(p, rnd); },
    estimateFn: function (p, rnd) { return G.estimateSeatsEC(p, rnd); },
    tierLabel: function (seats) {
      if (seats >= 538) return "Clean Sweep — 538-0";
      if (seats >= 400) return "Electoral Landslide";
      if (seats >= 300) return "Comfortable Victory";
      if (seats >= 270) return "Electoral College Win";
      if (seats >= 230) return "Close Defeat";
      return "Electoral College Loss";
    },
    coalitionStyle: "presidential",
    resultLabel: "Electoral Votes"
  },

  pr_dhondt_weimar: {
    key: "pr_dhondt_weimar", name: "Reichstag Election",
    subtitle: "Proportional representation · D'Hondt · 647 seats",
    country: "DE", flag: "🇩🇪", totalSeats: 647, majority: 324,
    threshold: 0.01,   /* Weimar had very low threshold */
    regionKey: "germany_weimar",
    chamberName: "Reichstag", headOfGovt: "Reichskanzler", termWord: "Legislature",
    govtBuilding: "the Reichskanzlei", govtBuildingAction: "Enter the Reichskanzlei",
    registeredElectorate: 44000000, typicalTurnout: [0.70, 0.85], hungWord: "No Reichstag majority",
    simulate:   function (p, rnd) { return G.simulatePR(p, rnd); },
    estimateFn: function (p, rnd) { return G.estimateSeatsPR(p, rnd); },
    tierLabel: function (seats) {
      if (seats >= 647) return "All-Party State — 647-0";
      if (seats >= 500) return "Overwhelming Majority";
      if (seats >= 324) return "Reichstag Majority";
      if (seats >= 200) return "Largest Party — Coalition Needed";
      if (seats >= 100) return "Major Party";
      return "Parliamentary Group";
    },
    coalitionStyle: "pr",
    resultLabel: "Reichstag Seats"
  },

  pr_dhondt_bundestag: {
    key: "pr_dhondt_bundestag", name: "Bundestag Election",
    subtitle: "Mixed-member proportional · 5% threshold · 736 seats",
    country: "DE", flag: "🇩🇪", totalSeats: 736, majority: 369,
    threshold: 0.05,
    regionKey: "germany_modern",
    chamberName: "Bundestag", headOfGovt: "Bundeskanzler", termWord: "Legislature",
    govtBuilding: "the Bundeskanzleramt", govtBuildingAction: "Enter the Bundeskanzleramt",
    registeredElectorate: 61200000, typicalTurnout: [0.74, 0.80], hungWord: "Hung Bundestag",
    simulate:   function (p, rnd) { return G.simulatePR(p, rnd); },
    estimateFn: function (p, rnd) { return G.estimateSeatsPR(p, rnd); },
    tierLabel: function (seats) {
      if (seats >= 736) return "Complete Dominance";
      if (seats >= 500) return "Grand Coalition Partner — Landslide";
      if (seats >= 369) return "Coalition Majority";
      if (seats >= 200) return "Largest Party — Coalition Required";
      if (seats >= 100) return "Parliamentary Faction";
      return "Minor Group";
    },
    coalitionStyle: "pr",
    resultLabel: "Bundestag Seats"
  },

  trs_france: {
    key: "trs_france", name: "Assemblée Nationale Election",
    subtitle: "Two-round system · 577 seats · absolute majority 289",
    country: "FR", flag: "🇫🇷", totalSeats: 577, majority: 289,
    regionKey: "france",
    chamberName: "Assemblée Nationale", headOfGovt: "Président", termWord: "Legislature",
    govtBuilding: "the Élysée", govtBuildingAction: "Enter the Élysée Palace",
    registeredElectorate: 49000000, typicalTurnout: [0.44, 0.58], hungWord: "No absolute majority",
    simulate:   function (p, rnd) { return G.simulateTRS(p, rnd); },
    estimateFn: function (p, rnd) { return G.estimateSeatsTRS(p, rnd); },
    tierLabel: function (seats) {
      if (seats >= 577) return "Raz-de-marée — 577-0";
      if (seats >= 450) return "Huge Majority — historic";
      if (seats >= 289) return "Absolute Majority";
      if (seats >= 200) return "Largest Group — Relative Majority";
      if (seats >= 100) return "Parliamentary Group";
      return "Minor Faction";
    },
    coalitionStyle: "trs",
    resultLabel: "National Assembly Seats"
  },

  av_australia: {
    key: "av_australia", name: "House of Representatives Election",
    subtitle: "Preferential voting · 151 seats · 76 needed",
    country: "AU", flag: "🇦🇺", totalSeats: 151, majority: 76,
    regionKey: "australia",
    chamberName: "House of Representatives", headOfGovt: "Prime Minister", termWord: "Parliament",
    govtBuilding: "the Lodge", govtBuildingAction: "Enter the Lodge",
    registeredElectorate: 17000000, typicalTurnout: [0.88, 0.93], hungWord: "Hung parliament",
    simulate:   function (p, rnd) { return G.simulateAV(p, rnd); },
    estimateFn: function (p, rnd) { return G.estimateSeatsAV(p, rnd); },
    tierLabel: function (seats) {
      if (seats >= 151) return "All 151 Seats — Perfect";
      if (seats >= 110) return "Commanding Majority";
      if (seats >= 76)  return "Working Majority";
      if (seats >= 60)  return "Minority Government";
      if (seats >= 40)  return "Official Opposition";
      return "Minor Party";
    },
    coalitionStyle: "av",
    resultLabel: "House Seats"
  },

  fptp_canada: {
    key: "fptp_canada", name: "Canadian Federal Election",
    subtitle: "First Past the Post · 338 House of Commons seats",
    country: "CA", flag: "🇨🇦", totalSeats: 338, majority: 170,
    regionKey: "canada",
    chamberName: "House of Commons", headOfGovt: "Prime Minister", termWord: "Parliament",
    govtBuilding: "Rideau Cottage", govtBuildingAction: "Enter Rideau Cottage",
    registeredElectorate: 29000000, typicalTurnout: [0.60, 0.70], hungWord: "Minority parliament",
    simulate:   function (p, rnd) { return G._simulateFPTPRegional(p, rnd, "fptp"); },
    estimateFn: function (p, rnd) { return G._estimateFPTPRegional(p, rnd); },
    tierLabel: function (seats) {
      if (seats >= 338) return "All Ridings — 338-0";
      if (seats >= 250) return "Massive Majority";
      if (seats >= 170) return "Strong Majority";
      if (seats >= 140) return "Minority Government";
      return "Official Opposition";
    },
    coalitionStyle: "minority"
  },

  fptp_india: {
    key: "fptp_india", name: "Lok Sabha Election",
    subtitle: "First Past the Post · 543 Lok Sabha seats",
    country: "IN", flag: "🇮🇳", totalSeats: 543, majority: 272,
    regionKey: "india",
    chamberName: "Lok Sabha", headOfGovt: "Prime Minister", termWord: "Lok Sabha",
    govtBuilding: "7 Lok Kalyan Marg", govtBuildingAction: "Enter 7 Lok Kalyan Marg",
    registeredElectorate: 950000000, typicalTurnout: [0.60, 0.70], hungWord: "Hung Lok Sabha",
    simulate:   function (p, rnd) { return G._simulateFPTPRegional(p, rnd, "fptp"); },
    estimateFn: function (p, rnd) { return G._estimateFPTPRegional(p, rnd); },
    tierLabel: function (seats) {
      if (seats >= 543) return "Sarvoccha Vijay — 543-0";
      if (seats >= 400) return "Historic Supermajority";
      if (seats >= 272) return "Lok Sabha Majority";
      if (seats >= 180) return "Largest Alliance — Short of Majority";
      return "Opposition Benches";
    },
    coalitionStyle: "coalition",
    resultLabel: "Lok Sabha Seats"
  },

  fptp_japan: {
    key: "fptp_japan", name: "House of Representatives Election",
    subtitle: "Mixed-member majoritarian · 465 seats in the Shūgiin · 233 to win",
    country: "Japan", flag: "🇯🇵", totalSeats: 465, majority: 233,
    regionKey: "japan",
    chamberName: "House of Representatives (衆議院)", headOfGovt: "Prime Minister", termWord: "Parliament",
    govtBuilding: "the Kantei", govtBuildingAction: "Enter the Kantei",
    registeredElectorate: 105000000, typicalTurnout: [0.52, 0.62], hungWord: "No stable majority",
    simulate:   function (p, rnd) { return G._simulateFPTPRegional(p, rnd, "fptp"); },
    estimateFn: function (p, rnd) { return G._estimateFPTPRegional(p, rnd); },
    tierLabel: function (seats, total) {
      if (seats >= total) return "All 465 Seats — Total Control";
      if (seats >= 310)   return "Supermajority — Constitutional Revision";
      if (seats >= 261)   return "Stable Majority (絶対安定多数)";
      if (seats >= 233)   return "Working Majority";
      if (seats >= 180)   return "Largest Party — Short of a Majority";
      return "Opposition Benches";
    },
    coalitionStyle: "coalition",
    resultLabel: "Shūgiin Seats"
  },

  guided_north_korea: {
    key: "guided_north_korea", name: "Supreme People's Assembly Election",
    subtitle: "The democratic will of the Korean people · 687 seats",
    country: "KP", flag: "🇰🇵", totalSeats: 687, majority: 1,
    regionKey: "north_korea",
    chamberName: "Supreme People's Assembly", headOfGovt: "Supreme Leader", termWord: "Session",
    govtBuilding: "the Ryongsong Residence", govtBuildingAction: "Enter the Ryongsong Residence",
    registeredElectorate: 19000000, typicalTurnout: [0.99, 1.0], hungWord: "Unanimous",
    simulate:   function (p, rnd) { return G.simulateGuided(p, rnd); },
    estimateFn: function (p, rnd) { return G.estimateSeatsGuided(p, rnd); },
    tierLabel: function (seats, total) {
      if (seats >= total * 0.999) return "Unanimous Mandate of the People";
      if (seats >= total * 0.99)  return "Near-Total Approval";
      return "Victory — Continue the Revolution";
    },
    coalitionStyle: "guided",
    resultLabel: "Assembly Seats",
    despotMode: true
  },

  guided_soviet: {
    key: "guided_soviet", name: "Supreme Soviet Election",
    subtitle: "Socialist democracy · Soviet of the Union · 569 deputies",
    country: "SU", flag: "☭", totalSeats: 569, majority: 1,
    regionKey: "soviet_1937",
    chamberName: "Supreme Soviet", headOfGovt: "General Secretary", termWord: "Congress",
    govtBuilding: "the Kremlin", govtBuildingAction: "Enter the Kremlin",
    registeredElectorate: 180000000, typicalTurnout: [0.99, 1.0], hungWord: "Unanimous",
    simulate:   function (p, rnd) { return G.simulateGuided(p, rnd); },
    estimateFn: function (p, rnd) { return G.estimateSeatsGuided(p, rnd); },
    tierLabel: function (seats) { return "Victory of the Proletariat"; },
    coalitionStyle: "guided",
    resultLabel: "Deputies",
    despotMode: true
  },

  guided_cuba: {
    key: "guided_cuba", name: "National Assembly Election",
    subtitle: "Cuba's socialist democracy · 470 seats",
    country: "CU", flag: "🇨🇺", totalSeats: 470, majority: 1,
    regionKey: "cuba",
    chamberName: "National Assembly", headOfGovt: "President", termWord: "Legislature",
    govtBuilding: "the Palace of the Revolution", govtBuildingAction: "Enter the Palace of the Revolution",
    registeredElectorate: 8500000, typicalTurnout: [0.95, 0.99], hungWord: "Unanimous",
    simulate:   function (p, rnd) { return G.simulateGuided(p, rnd); },
    estimateFn: function (p, rnd) { return G.estimateSeatsGuided(p, rnd); },
    tierLabel: function (seats) { return "¡Victoria de la Revolución!"; },
    coalitionStyle: "guided",
    resultLabel: "Assembly Seats",
    despotMode: true
  },

  guided_china: {
    key: "guided_china", name: "National People's Congress Election",
    subtitle: "People's democratic dictatorship · 2980 deputies",
    country: "CN", flag: "🇨🇳", totalSeats: 2980, majority: 1,
    regionKey: "china",
    chamberName: "National People's Congress", headOfGovt: "General Secretary", termWord: "Congress",
    govtBuilding: "Zhongnanhai", govtBuildingAction: "Enter Zhongnanhai",
    registeredElectorate: 1000000000, typicalTurnout: [0.99, 1.0], hungWord: "Unanimous",
    simulate:   function (p, rnd) { return G.simulateGuided(p, rnd); },
    estimateFn: function (p, rnd) { return G.estimateSeatsGuided(p, rnd); },
    tierLabel: function (seats) { return "Harmonious Victory"; },
    coalitionStyle: "guided",
    resultLabel: "Deputies",
    despotMode: true
  }
};

/* =========================================================================
   10 · ACTIVE SYSTEM RESOLVER
   ========================================================================= */
G.activeElectoralSystem = function () {
  var key = G.state && G.state._electoralSystemKey;
  if (!key || key === "fptp_uk") return null;
  return G.ELECTORAL_SYSTEMS[key] || null;
};

/* =========================================================================
   11 · TIER FUNCTION FOR INTERNATIONAL SYSTEMS
   ========================================================================= */
G.tierForSystem = function (seats, sys) {
  if (!sys) return G.tierFor ? G.tierFor(seats, 650) : { key:"unknown", label:"Result", govt: seats > 0 };
  var total = sys.totalSeats, majority = sys.majority;
  var label = sys.tierLabel ? sys.tierLabel(seats, total) : (seats >= majority ? "Majority" : "No Majority");
  var govt = sys.coalitionStyle === "guided" || seats >= majority;
  return {
    key: seats >= majority ? (seats >= total * 0.67 ? "supermajority" : "majority") : "opposition",
    label: label,
    govt: govt,
    role: govt ? "govt" : "opposition"
  };
};

/* =========================================================================
   12 · PARTY → COUNTRY MAP
   Used by draft filtering to show country-relevant politicians in intl modes.
   ========================================================================= */
G.PARTY_COUNTRY = {
  /* USA */
  "Democrat (USA)": "US", "Republican (USA)": "US", "Federalist": "US",
  "Bull Moose": "US", "Whig (USA)": "US", "Democrat 1860 (South)": "US",
  "Constitutional Union": "US", "Progressive (USA)": "US",
  /* Germany */
  "CDU/CSU": "DE", "CDU": "DE", "SPD": "DE", "SPD (DE)": "DE", "KPD": "DE",
  "NSDAP": "DE", "Zentrum": "DE", "DNVP": "DE", "BVP": "DE", "DVP": "DE",
  "DDP": "DE", "Greens (DE)": "DE", "FDP": "DE", "AfD": "DE",
  "Die Linke": "DE", "BSW": "DE",
  /* France */
  "Ensemble": "FR", "Rassemblement National": "FR", "La France Insoumise": "FR",
  "NUPES": "FR", "Les Républicains": "FR", "Parti Socialiste": "FR",
  "Parti Communiste": "FR", "RPR": "FR", "PS (FR)": "FR", "UMP": "FR",
  "LREM": "FR", "Radical (FR)": "FR",
  /* Australia */
  "Australian Labor Party": "AU", "Liberal Party": "AU", "National Party": "AU",
  "Greens (AU)": "AU", "Teal Independent": "AU", "Liberal (AU)": "AU",
  "National (AU)": "AU",
  /* Canada */
  "Liberal (CA)": "CA", "Conservative (CA)": "CA", "NDP": "CA",
  "Bloc Québécois": "CA",
  /* Japan */
  "LDP": "JP", "LDP (JP)": "JP", "CDP (JP)": "JP", "Komeito": "JP",
  "Nippon Ishin": "JP", "DPJ": "JP",
  /* India */
  "BJP": "IN", "INC": "IN", "Samajwadi Party": "IN", "AITC": "IN",
  "BSP": "IN", "AAP": "IN",
  /* North Korea */
  "Korean Workers' Party": "KP",
  /* Soviet/Russia */
  "Communist Party (SU)": "SU", "CPSU": "SU", "United Russia": "SU",
  /* Cuba */
  "Communist Party (CU)": "CU",
  /* China */
  "Chinese Communist Party": "CN", "CCP": "CN", "CPC": "CN",
  /* Ireland */
  "Fianna Fáil": "IE", "Fine Gael": "IE", "Sinn Féin": "IE",
  "Sinn Féin (IE)": "IE", "Workers' Party (IE)": "IE",
  /* Turkey */
  "AKP": "TR", "CHP (TR)": "TR",
  /* Israel */
  "Mapai": "IL", "Likud": "IL", "Fatah": "IL",
  /* South Africa */
  "ANC": "ZA", "ZANU-PF": "ZW"
};

/* =========================================================================
   12 · COUNTRY LANDSCAPES
   Party vote share data per region for each international system.
   Format mirrors G.LANDSCAPE: { regionId: [ ["Party", share%], ... ] }
   Used by G.activeLandscape() and G.oppositionPartyLabels() for intl games.
   ========================================================================= */
G.COUNTRY_LANDSCAPES = {

  /* ---- Germany Weimar (1932 federal election shares) -------------------- */
  germany_weimar: {
    DE_PR: [["NSDAP",38],["SPD",20],["KPD",17],["Zentrum",11],["DNVP",8],["DVP",2],["DDP",1]],
    DE_BY: [["NSDAP",30],["BVP",22],["SPD",16],["KPD",10],["Zentrum",8],["DNVP",6],["DVP",3]],
    DE_SA: [["KPD",22],["NSDAP",37],["SPD",24],["DNVP",7],["DVP",4],["DDP",2]],
    DE_WU: [["NSDAP",33],["SPD",19],["KPD",11],["Zentrum",16],["DVP",5],["DNVP",5]],
    DE_BA: [["NSDAP",28],["Zentrum",25],["SPD",17],["KPD",12],["DVP",5],["DNVP",4]],
    DE_TH: [["NSDAP",42],["SPD",20],["KPD",15],["DNVP",10],["DVP",4],["DDP",2]],
    DE_HE: [["NSDAP",36],["SPD",22],["KPD",13],["Zentrum",12],["DNVP",8],["DVP",4]],
    DE_HH: [["SPD",28],["KPD",22],["NSDAP",27],["DNVP",8],["DVP",5],["DDP",3]],
    DE_BR: [["SPD",30],["KPD",24],["NSDAP",26],["DNVP",7],["DVP",5],["DDP",3]],
    DE_OT: [["NSDAP",37],["SPD",21],["KPD",16],["Zentrum",10],["DNVP",8],["DVP",3]]
  },

  /* ---- Germany Modern (2021 Bundestag result) --------------------------- */
  germany_modern: {
    DM_BW: [["CDU/CSU",27],["SPD",24],["Greens (DE)",17],["FDP",16],["AfD",9],["Die Linke",3]],
    DM_BY: [["CDU/CSU",35],["SPD",18],["Greens (DE)",14],["FDP",12],["AfD",10],["Die Linke",3]],
    DM_BE: [["SPD",26],["Greens (DE)",22],["CDU/CSU",17],["Die Linke",11],["FDP",9],["AfD",8]],
    DM_BB: [["SPD",29],["AfD",18],["CDU/CSU",15],["Die Linke",11],["Greens (DE)",9],["FDP",10]],
    DM_HB: [["SPD",30],["Greens (DE)",18],["CDU/CSU",16],["Die Linke",9],["FDP",9],["AfD",9]],
    DM_HH: [["SPD",28],["Greens (DE)",21],["CDU/CSU",17],["FDP",12],["AfD",8],["Die Linke",7]],
    DM_HE: [["SPD",27],["CDU/CSU",24],["Greens (DE)",13],["FDP",14],["AfD",10],["Die Linke",4]],
    DM_MV: [["SPD",33],["AfD",18],["CDU/CSU",16],["Die Linke",12],["FDP",9],["Greens (DE)",7]],
    DM_NI: [["SPD",34],["CDU/CSU",24],["Greens (DE)",13],["FDP",12],["AfD",8],["Die Linke",4]],
    DM_NW: [["SPD",32],["CDU/CSU",24],["Greens (DE)",13],["FDP",12],["AfD",8],["Die Linke",5]],
    DM_RP: [["SPD",30],["CDU/CSU",25],["Greens (DE)",11],["FDP",14],["AfD",8],["Die Linke",4]],
    DM_SL: [["SPD",36],["CDU/CSU",25],["Greens (DE)",9],["FDP",10],["AfD",9],["Die Linke",5]],
    DM_SN: [["AfD",24],["CDU/CSU",24],["SPD",19],["FDP",10],["Greens (DE)",9],["Die Linke",8]],
    DM_ST: [["AfD",24],["CDU/CSU",24],["SPD",22],["FDP",9],["Die Linke",9],["Greens (DE)",7]],
    DM_SH: [["SPD",30],["CDU/CSU",23],["Greens (DE)",16],["FDP",15],["AfD",7],["Die Linke",4]],
    DM_TH: [["AfD",24],["Die Linke",20],["CDU/CSU",20],["SPD",14],["FDP",8],["Greens (DE)",7]]
  },

  /* ---- France (2022 Assemblée Nationale) -------------------------------- */
  france: {
    FR_IDF: [["Ensemble",30],["NUPES",34],["Rassemblement National",14],["Les Républicains",9],["Divers",7]],
    FR_NO:  [["Rassemblement National",26],["Ensemble",28],["NUPES",23],["Les Républicains",12],["Divers",6]],
    FR_NE:  [["Ensemble",29],["Rassemblement National",24],["NUPES",20],["Les Républicains",14],["Divers",8]],
    FR_OUE: [["Ensemble",33],["NUPES",26],["Rassemblement National",18],["Les Républicains",12],["Divers",6]],
    FR_CEN: [["Ensemble",31],["Rassemblement National",22],["NUPES",24],["Les Républicains",12],["Divers",6]],
    FR_SUD: [["Rassemblement National",28],["Ensemble",28],["NUPES",20],["Les Républicains",11],["Divers",8]],
    FR_OUT: [["NUPES",30],["Ensemble",28],["Rassemblement National",12],["Les Républicains",8],["Divers",17]]
  },

  /* ---- Australia (2022 House of Reps) ----------------------------------- */
  australia: {
    AU_NSW: [["Australian Labor Party",37],["Liberal (AU)",32],["Greens (AU)",12],["National (AU)",8],["Teal Independent",6]],
    AU_VIC: [["Australian Labor Party",43],["Liberal (AU)",30],["Greens (AU)",15],["National (AU)",5],["Teal Independent",5]],
    AU_QLD: [["Australian Labor Party",34],["Liberal (AU)",26],["National (AU)",15],["Greens (AU)",10],["Teal Independent",3]],
    AU_WA:  [["Australian Labor Party",40],["Liberal (AU)",34],["Greens (AU)",11],["National (AU)",8],["Teal Independent",4]],
    AU_SA:  [["Australian Labor Party",37],["Liberal (AU)",32],["Greens (AU)",13],["National (AU)",7],["Teal Independent",4]],
    AU_TAS: [["Australian Labor Party",39],["Liberal (AU)",29],["Greens (AU)",16],["National (AU)",6],["Teal Independent",4]],
    AU_ACT: [["Australian Labor Party",45],["Greens (AU)",21],["Liberal (AU)",24],["National (AU)",4],["Teal Independent",4]]
  },

  /* ---- Canada (2021 Federal election) ----------------------------------- */
  canada: {
    CA_BC:  [["Conservative (CA)",34],["Liberal (CA)",26],["NDP",25],["Greens (AU)",9],["Bloc Québécois",1]],
    CA_PR:  [["Conservative (CA)",56],["NDP",21],["Liberal (CA)",15],["Greens (AU)",4],["Bloc Québécois",1]],
    CA_ON:  [["Liberal (CA)",37],["Conservative (CA)",35],["NDP",17],["Greens (AU)",5],["Bloc Québécois",1]],
    CA_QC:  [["Bloc Québécois",32],["Liberal (CA)",21],["Conservative (CA)",18],["NDP",17],["Greens (AU)",4]],
    CA_ATL: [["Liberal (CA)",40],["Conservative (CA)",31],["NDP",21],["Greens (AU)",6],["Bloc Québécois",1]],
    CA_NT:  [["Liberal (CA)",36],["NDP",28],["Conservative (CA)",22],["Greens (AU)",8],["Bloc Québécois",1]]
  },

  /* ---- Japan (2021 House of Reps) --------------------------------------- */
  japan: {
    JP_TO:  [["LDP (JP)",40],["CDP (JP)",22],["Nippon Ishin",12],["Komeito",10],["DPJ",6]],
    JP_OS:  [["Nippon Ishin",30],["LDP (JP)",30],["CDP (JP)",16],["Komeito",10],["DPJ",7]],
    JP_KA:  [["LDP (JP)",42],["CDP (JP)",20],["Nippon Ishin",12],["Komeito",10],["DPJ",7]],
    JP_CH:  [["LDP (JP)",43],["CDP (JP)",19],["Nippon Ishin",11],["Komeito",10],["DPJ",8]],
    JP_TH:  [["LDP (JP)",44],["CDP (JP)",21],["Nippon Ishin",9],["Komeito",10],["DPJ",8]],
    JP_CG:  [["LDP (JP)",46],["CDP (JP)",20],["Nippon Ishin",10],["Komeito",10],["DPJ",7]],
    JP_KY:  [["LDP (JP)",44],["CDP (JP)",19],["Nippon Ishin",11],["Komeito",10],["DPJ",7]],
    JP_HK:  [["LDP (JP)",42],["CDP (JP)",24],["Nippon Ishin",9],["Komeito",10],["DPJ",8]],
    JP_PR:  [["LDP (JP)",35],["CDP (JP)",20],["Nippon Ishin",14],["Komeito",13],["DPJ",7]]
  },

  /* ---- India (2024 Lok Sabha) ------------------------------------------- */
  india: {
    IN_NOR: [["BJP",47],["INC",18],["Samajwadi Party",16],["BSP",7],["AITC",2]],
    IN_NWE: [["BJP",50],["INC",19],["AAP",9],["BSP",6],["Samajwadi Party",5]],
    IN_MAH: [["BJP",40],["INC",22],["AITC",6],["Samajwadi Party",5],["AAP",4]],
    IN_GUJ: [["BJP",56],["INC",27],["AAP",6],["BSP",4],["Samajwadi Party",3]],
    IN_SOU: [["INC",30],["BJP",22],["AITC",15],["Samajwadi Party",8],["AAP",5]],
    IN_EAS: [["AITC",29],["BJP",34],["INC",15],["Samajwadi Party",7],["BSP",5]],
    IN_OTH: [["BJP",42],["INC",24],["AAP",10],["BSP",6],["Samajwadi Party",5]]
  },

  /* ---- USA House (2022 midterms) ---------------------------------------- */
  usa_house: {
    US_NE:  [["Democrat (USA)",63],["Republican (USA)",35],["Other",2]],
    US_MA:  [["Democrat (USA)",56],["Republican (USA)",42],["Other",2]],
    US_GL:  [["Democrat (USA)",48],["Republican (USA)",50],["Other",2]],
    US_PL:  [["Republican (USA)",61],["Democrat (USA)",37],["Other",2]],
    US_SE:  [["Republican (USA)",61],["Democrat (USA)",37],["Other",2]],
    US_TX:  [["Republican (USA)",57],["Democrat (USA)",41],["Other",2]],
    US_SW:  [["Republican (USA)",52],["Democrat (USA)",46],["Other",2]],
    US_PNW: [["Democrat (USA)",57],["Republican (USA)",41],["Other",2]],
    US_CA:  [["Democrat (USA)",64],["Republican (USA)",34],["Other",2]],
    US_WV:  [["Republican (USA)",67],["Democrat (USA)",31],["Other",2]]
  },

  /* ---- USA Electoral College (battleground model) ----------------------- */
  usa_ec: {
    EC_SAFE_DEM: [["Democrat (USA)",72],["Republican (USA)",26],["Other",2]],
    EC_LEAN_DEM: [["Democrat (USA)",56],["Republican (USA)",42],["Other",2]],
    EC_NV:       [["Democrat (USA)",51],["Republican (USA)",47],["Other",2]],
    EC_MI:       [["Democrat (USA)",51],["Republican (USA)",47],["Other",2]],
    EC_WI:       [["Democrat (USA)",50],["Republican (USA)",48],["Other",2]],
    EC_PA:       [["Democrat (USA)",50],["Republican (USA)",49],["Other",2]],
    EC_AZ:       [["Democrat (USA)",49],["Republican (USA)",49],["Other",2]],
    EC_GA:       [["Democrat (USA)",49],["Republican (USA)",50],["Other",2]],
    EC_NC:       [["Democrat (USA)",47],["Republican (USA)",51],["Other",2]],
    EC_LEAN_REP: [["Republican (USA)",55],["Democrat (USA)",43],["Other",2]],
    EC_SAFE_REP: [["Republican (USA)",68],["Democrat (USA)",30],["Other",2]]
  },

  /* ---- Guided systems: single-party landscapes -------------------------- */
  north_korea: {
    KP_PY: [["Korean Workers' Party",100]], KP_NN: [["Korean Workers' Party",100]],
    KP_SN: [["Korean Workers' Party",100]], KP_KG: [["Korean Workers' Party",100]],
    KP_HW: [["Korean Workers' Party",100]], KP_HN: [["Korean Workers' Party",100]],
    KP_HS: [["Korean Workers' Party",100]], KP_RY: [["Korean Workers' Party",100]],
    KP_OT: [["Korean Workers' Party",100]]
  },
  soviet_1937: {
    SU_RS: [["Communist Party (SU)",100]], SU_UK: [["Communist Party (SU)",100]],
    SU_BE: [["Communist Party (SU)",100]], SU_TR: [["Communist Party (SU)",100]],
    SU_KZ: [["Communist Party (SU)",100]], SU_OT: [["Communist Party (SU)",100]]
  },
  cuba: {
    CU_HAB: [["Communist Party (CU)",100]], CU_OR: [["Communist Party (CU)",100]],
    CU_CAM: [["Communist Party (CU)",100]], CU_VIL: [["Communist Party (CU)",100]],
    CU_MAT: [["Communist Party (CU)",100]], CU_PNR: [["Communist Party (CU)",100]],
    CU_GRA: [["Communist Party (CU)",100]]
  },
  china: {
    CN_BJ: [["Chinese Communist Party",100]], CN_SH: [["Chinese Communist Party",100]],
    CN_NOR: [["Chinese Communist Party",100]], CN_HUB: [["Chinese Communist Party",100]],
    CN_GUA: [["Chinese Communist Party",100]], CN_NWE: [["Chinese Communist Party",100]],
    CN_CEN: [["Chinese Communist Party",100]], CN_SOU: [["Chinese Communist Party",100]],
    CN_OTH: [["Chinese Communist Party",100]]
  }
};

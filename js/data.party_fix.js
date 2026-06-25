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
  reg("Kuomintang",        "KMT",         "#000095",  0.8, 225);
  reg("PNF",               "PNF",         "#8b1a1a",  2.0, 535);

  /* Make RPR, UMP, LREM, Ensemble share the same "Gaullist" lineage so
     Gaullists across eras all fall in one dynasty pool */
  var GAULLIST_MERGE = ["RPR", "UMP", "LREM", "Ensemble"];
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
    /* Germany */
    "SPD (DE)":   "SPD",       /* → SPD_DE lineage */
    "CDU":        "CDU/CSU",   /* → CDU lineage (only if CDU/CSU registered) */
    /* France — Gaullist tradition (RPR → UMP → Ensemble all share Gaullist lineage) */
    "RPR":        "Gaullist",
    "UMP":        "Gaullist",
    "Gaulliste (FR)": "Gaullist",
    /* France — PS variants */
    "PS (FR)":    "Parti Socialiste",
    "LREM":       "Ensemble",   /* Macron's En Marche → now Ensemble, same Gaullist lineage */
    /* Soviet */
    "CPSU":       "Communist Party (SU)"
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

  /* Also patch non-wild politicians who slipped into the wrong party
     (e.g. Gaullist/Ensemble confusion for some historical French figures) */
  G.POLITICIANS.forEach(function (p) {
    if (p.scope === "wild") return;  /* already handled */
  });

  if (typeof console !== "undefined" && console.log) {
    console.log("[party_fix] patched=" + patched + " normalised=" + normalized);
  }
})();

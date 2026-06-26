/* ============================================================
   650 — POLITICIANS EXPANSION VI
   Germany deep dive + France deep dive + US Historical parties
   scope:"wild" — appear in country-specific international modes.
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
  reg("La France Insoumise",     "LFI_FR",   "#cc0000",  -1.8, 577);
  reg("Parti Communiste",        "PCF_FR",   "#b71c1c",  -2.0, 577);
  reg("Les Républicains",        "LR_FR",    "#003189",   1.2, 577);
  reg("Rassemblement National",  "RN_FR",    "#1d3461",   1.8, 577);
  reg("SFIO (FR)",               "SFIO_FR",  "#e53935",  -1.0, 577);
  reg("MRP (FR)",                "MRP_FR",   "#4169e1",   0.2, 577);
  reg("SED (DE)",                "SED_DE",   "#cc0000",  -1.8, 400);
  reg("DDP (DE)",                "DDP_DE",   "#4169e1",  -0.2, 400);
  reg("DVP (DE)",                "DVP_DE",   "#003399",   0.8, 400);
  reg("BVP (DE)",                "BVP_DE",   "#008000",   0.5, 400);
  reg("Federalist",              "Federalist","#003399",   0.5, 435);
  reg("Whig (USA)",              "Whig_US",  "#d4a000",   0.2, 435);
  reg("Progressive (USA)",       "Prog_US",  "#1a7f3c",  -0.5, 435);
  reg("Democratic-Republican",   "DemRep",   "#8b0000",  -0.2, 435);

  /* Also ensure PARTY_COUNTRY is set for new parties */
  if (G.PARTY_COUNTRY) {
    G.PARTY_COUNTRY["La France Insoumise"]    = "FR";
    G.PARTY_COUNTRY["Parti Communiste"]       = "FR";
    G.PARTY_COUNTRY["Les Républicains"]       = "FR";
    G.PARTY_COUNTRY["Rassemblement National"] = "FR";
    G.PARTY_COUNTRY["SFIO (FR)"]              = "FR";
    G.PARTY_COUNTRY["MRP (FR)"]               = "FR";
    G.PARTY_COUNTRY["SED (DE)"]               = "DE";
    G.PARTY_COUNTRY["DDP (DE)"]               = "DE";
    G.PARTY_COUNTRY["DVP (DE)"]               = "DE";
    G.PARTY_COUNTRY["BVP (DE)"]               = "DE";
    G.PARTY_COUNTRY["Federalist"]             = "US";
    G.PARTY_COUNTRY["Whig (USA)"]             = "US";
    G.PARTY_COUNTRY["Progressive (USA)"]      = "US";
    G.PARTY_COUNTRY["Democratic-Republican"]  = "US";
  }

  /* ═══════════════════════════════════════════════════════════════
     GERMANY — CDU/CSU
     ═══════════════════════════════════════════════════════════════ */
  I("Ludwig Erhard",         "CDU/CSU", "e4", ["pm","chancellor","trade","business"],         [62,85,58,82,65], "West Germany's 'father of the economic miracle'");
  I("Kurt Georg Kiesinger",  "CDU/CSU", "e4", ["pm","foreign"],                               [58,78,65,72,70], "Grand Coalition Chancellor 1966–69");
  I("Karl Carstens",         "CDU/CSU", "e5", ["pm","justice","foreign"],                     [55,80,52,74,68], "CDU president and jurist");
  I("Norbert Blüm",          "CDU/CSU", "e5", ["work","health"],                              [66,82,72,68,74], "Longest-serving West German labour minister");
  I("Lothar de Maizière",    "CDU/CSU", "e6", ["pm","foreign"],                               [60,72,65,70,62], "Last East German PM before reunification");
  I("Armin Laschet",         "CDU/CSU", "e7", ["pm","leader"],                                [48,72,50,62,60], "CDU leader 2021; lost federal election");
  I("Friedrich Merz",        "CDU/CSU", "e7", ["pm","business","chancellor"],                 [58,75,64,68,72], "CDU leader from 2022");
  I("Wolfgang Schäuble",     "CDU/CSU", "e6", ["chancellor","home","justice"],                [60,90,62,80,76], "Longtime CDU finance and interior minister");
  I("Annegret Kramp-Karrenbauer","CDU/CSU","e7",["pm","defence","leader"],                    [52,68,54,60,64], "CDU leader 2018–21");
  I("Rainer Brüderle",       "CDU/CSU", "e6", ["trade","business","chancellor"],              [50,72,56,62,60], "FDP-turned-centrist economics politician");
  I("Ruprecht Polenz",       "CDU/CSU", "e6", ["foreign","defence"],                          [52,70,54,65,62], "CDU foreign affairs committee chair");
  I("Volker Bouffier",       "CDU/CSU", "e7", ["pm","home"],                                  [54,72,52,62,64], "Hesse minister-president");
  I("Peter Altmaier",        "CDU/CSU", "e7", ["business","trade","chancellor"],              [55,74,60,66,70], "Merkel's chief of staff and economics minister");
  I("Heinrich Lübke",        "CDU/CSU", "e4", ["pm","agriculture"],                           [50,78,45,65,60], "West German President 1959–69");
  I("Theodor Heuss",         "FDP",     "e3", ["pm","culture","education"],                   [65,78,72,70,62], "First West German President, liberal statesman");
  I("Hans-Dietrich Genscher","FDP",     "e5", ["foreign","deputy"],                           [68,90,65,85,72], "FDP veteran foreign minister");
  I("Otto Graf Lambsdorff",  "FDP",     "e5", ["business","trade","chancellor"],              [60,80,58,72,68], "Free-market FDP economics minister");
  I("Guido Westerwelle",     "FDP",     "e6", ["foreign","pm","leader"],                      [62,75,68,65,70], "FDP leader and foreign minister 2009–11");
  I("Christian Lindner",     "FDP",     "e7", ["chancellor","business","leader"],             [64,68,72,62,74], "FDP leader and finance minister");
  I("Walter Scheel",         "FDP",     "e4", ["pm","foreign"],                               [62,80,60,72,65], "FDP president and foreign minister");
  I("Klaus Kinkel",          "FDP",     "e6", ["foreign","justice"],                          [55,78,52,70,62], "FDP foreign minister in Kohl era");
  I("Jürgen Möllemann",      "FDP",     "e5", ["trade","education"],                          [58,72,64,60,58], "Controversial FDP populist");
  I("Philipp Rösler",        "FDP",     "e7", ["health","business","leader"],                 [54,65,58,60,62], "Youngest German government minister");
  I("Reinhold Maier",        "FDP",     "e3", ["pm","trade"],                                 [55,75,52,65,60], "Early FDP leader, Württemberg minister-president");

  /* ── SPD (DE) ─────────────────────────────────────────────────── */
  I("August Bebel",          "SPD",     "e1", ["leader","work"],                              [72,75,85,65,80], "SPD co-founder, Marxist orator");
  I("Friedrich Ebert",       "SPD",     "e2", ["pm","leader"],                                [65,78,62,72,78], "First President of Weimar Republic");
  I("Gustav Noske",          "SPD",     "e2", ["defence","home"],                             [52,72,48,62,58], "Weimar SPD defence strongman");
  I("Rudolf Breitscheid",    "SPD",     "e2", ["foreign","leader"],                           [58,72,65,60,62], "Weimar SPD foreign policy voice");
  I("Ernst Reuter",          "SPD",     "e3", ["pm","work"],                                  [65,75,72,68,70], "Heroic mayor of West Berlin during blockade");
  I("Fritz Erler",           "SPD",     "e4", ["defence","foreign"],                          [60,72,65,65,68], "SPD defence policy architect");
  I("Herbert Wehner",        "SPD",     "e4", ["leader","whip","pm"],                         [62,82,58,75,82], "SPD parliamentary mastermind");
  I("Carlo Schmid",          "SPD",     "e3", ["justice","foreign","education"],              [68,78,75,70,65], "SPD jurist, Basic Law author");
  I("Johannes Rau",          "SPD",     "e5", ["pm","leader"],                                [65,80,68,72,74], "SPD President of Germany 1999–2004");
  I("Hans-Jochen Vogel",     "SPD",     "e5", ["pm","justice","leader"],                      [60,82,62,72,70], "SPD chairman and Munich mayor");
  I("Björn Engholm",         "SPD",     "e6", ["pm","leader"],                                [58,72,60,62,65], "SPD leader 1991–93");
  I("Rudolf Scharping",      "SPD",     "e6", ["pm","defence","leader"],                      [55,72,52,62,60], "SPD leader 1993–95");
  I("Oskar Lafontaine",      "SPD",     "e5", ["pm","chancellor","leader"],                   [68,80,72,68,72], "SPD chairman, left-wing firebrand");
  I("Peter Struck",          "SPD",     "e6", ["defence","whip"],                             [58,78,55,65,72], "SPD defence minister 2002–05");
  I("Sigmar Gabriel",        "SPD",     "e7", ["business","foreign","leader"],                [60,75,65,65,68], "SPD leader 2009–17");
  I("Andrea Nahles",         "SPD",     "e7", ["work","leader"],                              [56,70,60,60,65], "First female SPD leader");
  I("Saskia Esken",          "SPD",     "e7", ["leader"],                                     [52,62,58,55,60], "SPD co-chair from 2019");
  I("Norbert Walter-Borjans", "SPD",    "e7", ["chancellor","leader"],                        [54,70,56,62,62], "SPD co-chair 2019–21");
  I("Martin Schulz",         "SPD",     "e7", ["pm","foreign","leader"],                      [60,75,65,65,65], "SPD leader 2017, former EU Parliament president");

  /* ── Greens (DE) ─────────────────────────────────────────────── */
  I("Petra Kelly",           "Greens (DE)","e5",["leader","environment","peace"],             [72,65,75,58,62], "Green Party co-founder and activist");
  I("Otto Schily",           "Greens (DE)","e5",["justice","home","leader"],                  [62,72,65,65,60], "Green founder who later joined SPD");
  I("Joschka Fischer",       "Greens (DE)","e6",["foreign","pm","leader"],                    [70,80,72,72,70], "Green foreign minister 1998–2005");
  I("Annalena Baerbock",     "Greens (DE)","e7",["foreign","pm","leader"],                    [66,62,68,62,65], "Green chancellor candidate 2021");
  I("Robert Habeck",         "Greens (DE)","e7",["business","energy","deputy"],               [68,65,72,65,68], "Green economy minister from 2021");
  I("Winfried Kretschmann",  "Greens (DE)","e7",["pm"],                                       [65,75,60,70,68], "Green minister-president of Baden-Württemberg");
  I("Claudia Roth",          "Greens (DE)","e6",["culture","leader"],                         [62,72,65,58,62], "Green Bundestag president");
  I("Cem Özdemir",           "Greens (DE)","e6",["agriculture","foreign","leader"],           [64,72,65,62,65], "First German MP of Turkish descent");
  I("Katrin Göring-Eckardt", "Greens (DE)","e7",["leader"],                                   [58,70,62,60,62], "Green parliamentary group leader");
  I("Renate Künast",         "Greens (DE)","e6",["agriculture","justice","leader"],           [60,72,62,62,62], "Green agriculture minister 2001–05");
  I("Jürgen Trittin",        "Greens (DE)","e6",["environment","leader"],                     [58,78,60,62,65], "Green environment minister 1998–2005");
  I("Kerstin Andreae",       "Greens (DE)","e7",["business","trade"],                         [55,65,55,58,58], "Green energy economics spokesperson");
  I("Hans-Christian Ströbele","Greens (DE)","e5",["justice","leader"],                        [62,72,68,58,58], "Berlin Green conscience of the party");
  I("Gerhard Schröder",      "SPD",     "e6", ["pm","chancellor","leader"],                   [72,82,70,75,78], "SPD Chancellor 1998–2005");
  I("Marieluise Beck",       "Greens (DE)","e6",["foreign","human-rights"],                   [56,68,60,60,58], "Green foreign policy expert on Eastern Europe");
  I("Baden-Baden Candidate", "Greens (DE)","e7",["environment"],                              [52,55,50,52,52], "Placeholder Green local candidate");

  /* ── AfD ─────────────────────────────────────────────────────── */
  I("Alice Weidel",          "AfD",     "e7", ["pm","business","leader"],                     [62,65,68,58,70], "AfD co-leader and chancellor candidate");
  I("Alexander Gauland",     "AfD",     "e7", ["leader","foreign"],                           [55,72,60,55,65], "AfD co-founder and patriarch");
  I("Frauke Petry",          "AfD",     "e7", ["leader","pm"],                                [58,60,62,55,60], "AfD leader 2013–17");
  I("Björn Höcke",           "AfD",     "e7", ["pm","leader"],                                [52,60,65,50,62], "AfD Thuringia leader, far-right firebrand");
  I("Bernd Lucke",           "AfD",     "e7", ["chancellor","business","leader"],             [55,65,60,58,58], "AfD founding economist, later left");
  I("Tino Chrupalla",        "AfD",     "e7", ["leader"],                                     [50,58,55,50,58], "AfD co-leader from 2019");
  I("Jörg Meuthen",          "AfD",     "e7", ["chancellor","leader"],                        [54,65,58,55,60], "AfD leader 2015–22");
  I("Beatrix von Storch",    "AfD",     "e7", ["home","justice","leader"],                    [52,58,60,50,60], "AfD deputy leader and MEP");
  I("Gottfried Curio",       "AfD",     "e7", ["home","immigration"],                         [56,62,62,54,58], "AfD interior policy spokesperson");
  I("Stephan Brandner",      "AfD",     "e7", ["justice"],                                    [48,58,55,48,55], "AfD justice committee chair");
  I("Georg Pazderski",       "AfD",     "e7", ["defence"],                                    [50,60,52,52,56], "AfD Berlin leader, former Bundeswehr officer");
  I("Petr Bystron",          "AfD",     "e7", ["foreign"],                                    [50,58,52,50,54], "AfD foreign affairs spokesperson");
  I("Maximilian Krah",       "AfD",     "e7", ["foreign"],                                    [48,55,52,48,52], "AfD MEP, expelled after controversies");
  I("Albrecht Glaser",       "AfD",     "e7", ["pm","home"],                                  [50,62,50,52,54], "AfD candidate for Bundestag president");
  I("Christian Lüth",        "AfD",     "e7", ["leader"],                                     [45,55,48,45,50], "AfD communications director");
  I("Kay Gottschalk",        "AfD",     "e7", ["chancellor","business"],                      [48,58,52,50,52], "AfD finance spokesperson");
  I("Leif-Erik Holm",        "AfD",     "e7", ["agriculture"],                                [48,55,50,48,52], "AfD agriculture spokesperson");
  I("Marcus Bühl",           "AfD",     "e7", ["home"],                                       [46,52,48,46,50], "AfD local politician");
  I("Joana Cotar",           "AfD",     "e7", ["trade","business"],                           [50,58,52,50,54], "AfD digital policy critic");
  I("Nicole Höchst",         "AfD",     "e7", ["education","family"],                         [48,55,50,48,52], "AfD family policy speaker");
  I("Martin Hebner",         "AfD",     "e7", ["chancellor"],                                 [48,58,50,50,52], "AfD Bavarian politician");
  I("Rüdiger Lucassen",      "AfD",     "e7", ["defence"],                                    [50,60,52,50,54], "AfD defence spokesperson");
  I("Roman Reusch",          "AfD",     "e7", ["justice"],                                    [50,60,55,50,54], "AfD justice politician, former judge");
  I("Mariana Harder-Kühnel", "AfD",     "e7", ["deputy","leader"],                            [50,58,52,50,54], "AfD vice-president of Bundestag");
  I("Waldemar Herdt",        "AfD",     "e7", ["agriculture"],                                [46,52,48,46,50], "AfD agriculture politician");
  I("Hans-Thomas Tillschneider","AfD",  "e7", ["culture","education"],                        [48,55,50,48,52], "AfD culture politician");
  I("Uwe Witt",              "AfD",     "e7", ["health"],                                     [48,55,50,48,52], "AfD health spokesperson");
  I("Steffen Kotré",         "AfD",     "e7", ["energy","environment"],                       [48,55,50,48,52], "AfD energy policy critic");

  /* ── Die Linke ───────────────────────────────────────────────── */
  I("Gregor Gysi",           "Die Linke","e6",["pm","justice","leader"],                      [72,82,78,68,75], "PDS/Die Linke patriarch and orator");
  I("Oskar Lafontaine",      "Die Linke","e7",["pm","chancellor","leader"],                   [68,80,72,68,72], "SPD defector, Die Linke co-founder");
  I("Lothar Bisky",          "Die Linke","e6",["leader"],                                     [58,72,60,58,65], "PDS and Die Linke chairman");
  I("Sarah Wagenknecht",     "Die Linke","e7",["pm","chancellor","leader"],                   [70,75,75,65,72], "Die Linke firebrand; later founded BSW");
  I("Bernd Riexinger",       "Die Linke","e7",["leader","work"],                              [55,65,58,55,62], "Die Linke co-chair 2012–21");
  I("Katja Kipping",         "Die Linke","e7",["leader","work","health"],                     [58,68,62,58,65], "Die Linke co-chair 2012–21");
  I("Dietmar Bartsch",       "Die Linke","e7",["leader","chancellor"],                        [60,72,62,62,68], "Die Linke parliamentary group leader");
  I("Amira Mohamed Ali",     "Die Linke","e7",["leader","justice"],                           [56,62,60,58,60], "Die Linke parliamentary group co-leader");
  I("Janine Wissler",        "Die Linke","e7",["leader","pm"],                                [56,62,60,55,60], "Die Linke co-chair from 2021");
  I("Stefan Liebich",        "Die Linke","e7",["foreign"],                                    [54,65,55,55,58], "Die Linke foreign policy expert");
  I("Bodo Ramelow",          "Die Linke","e7",["pm"],                                         [62,70,60,62,65], "Die Linke Thuringia minister-president");
  I("Klaus Ernst",           "Die Linke","e7",["work","business"],                            [54,65,55,55,58], "Die Linke trade union wing");
  I("Sahra Wagenknecht",     "Die Linke","e6",["chancellor","leader"],                        [70,75,78,65,70], "Left-populist icon before BSW split");
  I("Halina Wawzyniak",      "Die Linke","e7",["justice","digital"],                          [52,62,55,52,55], "Die Linke digital rights advocate");
  I("Harald Wolf",           "Die Linke","e6",["business","work"],                            [54,68,52,58,58], "Berlin Die Linke senator");
  I("Christine Buchholz",    "Die Linke","e7",["defence"],                                    [52,62,55,52,55], "Die Linke pacifist defence critic");
  I("Michael Leutert",       "Die Linke","e7",["foreign"],                                    [50,60,52,50,54], "Die Linke Latin America expert");
  I("Wolfgang Gehrcke",      "Die Linke","e6",["foreign"],                                    [54,68,55,54,58], "Die Linke foreign policy veteran");
  I("Eva Bulling-Schröter",  "Die Linke","e7",["environment","energy"],                       [52,62,52,52,55], "Die Linke environment spokesperson");
  I("Ulla Jelpke",           "Die Linke","e6",["home","immigration"],                         [54,70,55,52,58], "Die Linke interior policy veteran");
  I("Ilja Seifert",          "Die Linke","e7",["health","social"],                            [50,62,52,50,54], "Die Linke disability rights advocate");
  I("Cornelia Möhring",      "Die Linke","e7",["family","health"],                            [50,60,52,50,54], "Die Linke feminist politician");
  I("Peter Ritter",          "Die Linke","e7",["home"],                                       [48,58,50,48,52], "Die Linke Mecklenburg politician");
  I("Hans Modrow",           "SED (DE)", "e5",["pm","leader"],                                [58,78,55,62,62], "Last reformist SED leader of East Germany");
  I("Egon Krenz",            "SED (DE)", "e5",["pm","leader"],                                [48,72,45,52,55], "East German leader who opened Wall");
  I("Erich Honecker",        "SED (DE)", "e5",["pm","leader"],                                [42,80,40,48,58], "East German leader 1971–89");
  I("Walter Ulbricht",       "SED (DE)", "e4",["pm","leader"],                                [38,78,42,45,55], "East German founding leader");
  I("Wilhelm Pieck",         "SED (DE)", "e3",["pm","leader"],                                [40,72,45,48,55], "East Germany's first President");
  I("Otto Grotewohl",        "SED (DE)", "e4",["pm","leader"],                                [42,72,45,50,52], "East Germany's first Prime Minister");
  I("Erich Mielke",          "SED (DE)", "e4",["home"],                                       [28,78,30,40,45], "Stasi chief");
  I("Markus Wolf",           "SED (DE)", "e4",["foreign","defence"],                          [35,80,32,50,48], "HVA foreign intelligence chief");
  I("Willi Stoph",           "SED (DE)", "e5",["pm","defence"],                               [40,75,35,48,52], "East German PM and defence minister");
  I("Günter Schabowski",     "SED (DE)", "e5",["leader"],                                     [50,68,55,45,52], "SED official who accidentally announced Wall opening");
  I("Harry Tisch",           "SED (DE)", "e5",["work"],                                       [40,68,38,45,50], "East German trade union chief");
  I("Lothar de Maizière",    "CDU/CSU",  "e6",["pm","foreign"],                               [60,72,65,70,62], "Last DDR prime minister");
  I("Christa Wolf",          "SED (DE)", "e5",["culture"],                                    [65,68,70,60,42], "East German writer and critic");
  I("Manfred Stolpe",        "SPD",     "e6", ["pm"],                                         [58,72,55,62,65], "Brandenburg SPD minister-president");
  I("Joachim Gauck",         "CDU/CSU", "e6", ["pm","justice"],                               [68,72,70,70,55], "German President 2012–17, former pastor/Stasi foe");
  I("Gregor Gysi",           "Die Linke","e7",["justice","leader","pm"],                      [72,85,80,70,75], "Die Linke's most effective spokesperson");

  /* ── NSDAP ───────────────────────────────────────────────────── */
  I("Wilhelm Canaris",       "NSDAP",   "e3", ["defence","foreign"],                          [48,72,45,58,38], "Abwehr chief, secretly anti-Nazi");
  I("Rudolf Hess",           "NSDAP",   "e3", ["deputy","leader","foreign"],                  [45,68,50,45,48], "Hitler's deputy, flew to Scotland");
  I("Martin Bormann",        "NSDAP",   "e3", ["leader","pm"],                                [35,75,30,55,52], "Head of Nazi Party Chancellery");
  I("Ernst Röhm",            "NSDAP",   "e2", ["defence","leader"],                           [42,68,45,40,48], "SA chief murdered in Night of Long Knives");
  I("Alfred Rosenberg",      "NSDAP",   "e3", ["culture","foreign"],                          [38,65,42,40,38], "Nazi ideology minister");
  I("Fritz Sauckel",         "NSDAP",   "e3", ["work"],                                       [32,62,30,38,38], "Nazi forced labour overseer");
  I("Baldur von Schirach",   "NSDAP",   "e3", ["culture","education"],                        [45,62,52,40,48], "Hitler Youth leader and Vienna gauleiter");
  I("Hans Frank",            "NSDAP",   "e3", ["justice"],                                    [35,65,40,38,40], "Nazi Governor-General of occupied Poland");
  I("Julius Streicher",      "NSDAP",   "e2", ["culture"],                                    [38,60,42,32,38], "Nazi propagandist and Nuremberg publisher");
  I("Albert Speer",          "NSDAP",   "e3", ["business","trade","work"],                    [62,72,58,68,55], "Nazi architect and armaments minister");
  I("Joachim von Ribbentrop","NSDAP",   "e3", ["foreign"],                                    [38,62,40,42,38], "Nazi foreign minister, pact with Molotov");
  I("Wilhelm Frick",         "NSDAP",   "e3", ["home","justice"],                             [38,68,35,45,42], "First Nazi interior minister");
  I("Robert Ley",            "NSDAP",   "e3", ["work"],                                       [36,62,40,35,40], "Nazi Labour Front boss");
  I("Gregor Strasser",       "NSDAP",   "e2", ["leader"],                                     [52,62,55,45,55], "Left-wing Nazi executed 1934");
  I("Otto Strasser",         "NSDAP",   "e2", ["leader"],                                     [50,58,52,42,50], "NSDAP Black Front, fled Hitler");
  I("Karl Dönitz",           "NSDAP",   "e3", ["defence","pm"],                               [50,72,45,55,48], "Last Führer; admiral who surrendered");
  I("Franz von Papen",       "DNVP",    "e3", ["pm","deputy"],                                [52,75,45,58,48], "Chancellor who helped Hitler to power");
  I("Alfred Jodl",           "NSDAP",   "e3", ["defence"],                                    [45,72,40,55,42], "Wehrmacht chief of operations");
  I("Wilhelm Keitel",        "NSDAP",   "e3", ["defence"],                                    [38,72,35,48,40], "Wehrmacht Supreme Command chief");
  I("Ernst Kaltenbrunner",   "NSDAP",   "e3", ["home"],                                       [28,65,25,38,35], "SS and RHSA chief after Heydrich");
  I("Walter Funk",           "NSDAP",   "e3", ["chancellor","business"],                      [42,68,38,50,42], "Nazi economics minister");
  I("Hjalmar Schacht",       "DNVP",    "e3", ["chancellor"],                                 [60,78,55,68,52], "Weimar and Nazi economic wizard");
  I("Otto Ohlendorf",        "NSDAP",   "e3", ["home"],                                       [28,60,25,35,32], "Einsatzgruppen commander");
  I("Artur Axmann",          "NSDAP",   "e3", ["leader","education"],                         [35,60,38,35,40], "Last Hitler Youth leader");
  I("Konstantin Hierl",      "NSDAP",   "e3", ["work"],                                       [35,62,32,38,38], "Reich Labour Service chief");
  I("Fritz Todt",            "NSDAP",   "e3", ["business","work","trade"],                    [55,70,45,62,50], "Nazi construction and armaments chief");
  I("Hans Schemm",           "NSDAP",   "e2", ["education","culture"],                        [40,62,45,38,42], "Nazi teachers' union leader");
  I("Hanns Kerrl",           "NSDAP",   "e3", ["culture"],                                    [38,62,38,38,40], "Church affairs minister");
  I("Himmler aide",          "NSDAP",   "e3", ["home"],                                       [28,55,25,32,30], "SS administrative functionary");

  /* ── DNVP (Weimar conservatives) ────────────────────────────── */
  I("Alfred Hugenberg",      "DNVP",    "e2", ["business","leader","pm"],                     [55,72,52,60,58], "Media mogul who helped Hitler rise");
  I("Karl Helfferich",       "DNVP",    "e2", ["chancellor"],                                 [52,70,55,60,50], "Weimar nationalist firebrand");
  I("Otto Heßlein",          "DNVP",    "e2", ["trade"],                                      [48,65,45,55,48], "DNVP economics politician");
  I("Count Kuno von Westarp", "DNVP",   "e2", ["leader"],                                     [50,68,52,55,52], "DNVP chairman 1926–28");
  I("Oskar von Hindenburg",  "DNVP",    "e2", ["defence"],                                    [45,65,40,50,45], "General's son, palace intriguer");
  I("Martin Schiele",        "DNVP",    "e2", ["agriculture"],                                [50,65,48,55,50], "DNVP agriculture expert");
  I("Werner von Blomberg",   "DNVP",    "e3", ["defence"],                                    [52,72,45,58,48], "Weimar and early Nazi war minister");
  I("Erich Ludendorff",      "DNVP",    "e2", ["defence","pm"],                               [48,72,45,52,42], "WWI general, early Hitler ally");
  I("Wolfgang Kapp",         "DNVP",    "e2", ["pm","leader"],                                [42,62,40,42,38], "Led the Kapp Putsch of 1920");
  I("Reinhold Quaatz",       "DNVP",    "e2", ["trade","business"],                           [48,65,45,52,48], "DNVP Reichstag member");
  I("Ernst von Witzleben",   "DNVP",    "e3", ["defence"],                                    [50,68,45,55,45], "Wehrmacht general, July 20 conspirator");
  I("Hans von Seeckt",       "DNVP",    "e2", ["defence"],                                    [52,72,45,58,48], "Reichswehr commander, German rearmament");
  I("Wilhelm Marx",          "Zentrum", "e2", ["pm"],                                          [55,72,55,60,60], "Zentrum Chancellor four times");
  I("Heinrich Brüning",      "Zentrum", "e2", ["pm","chancellor"],                            [55,75,52,62,60], "Austerian Weimar chancellor");
  I("Josef Wirth",           "Zentrum", "e2", ["pm","chancellor"],                            [58,70,58,60,58], "Weimar Zentrum chancellor");
  I("Adam Stegerwald",       "Zentrum", "e2", ["work","leader"],                              [55,68,55,58,58], "Christian trade union leader");
  I("Ludwig Kaas",           "Zentrum", "e2", ["leader","foreign"],                           [55,70,58,60,60], "Zentrum chairman who voted for Enabling Act");
  I("Franz von Papen",       "Zentrum", "e3", ["pm","deputy"],                                [52,75,45,58,48], "Catholic chancellor who opened door to Hitler");
  I("Matthias Erzberger",    "Zentrum", "e2", ["chancellor","foreign"],                       [62,72,65,62,60], "Signed Armistice, assassinated 1921");
  I("Konrad Adenauer",       "Zentrum", "e2", ["pm"],                                         [68,75,60,72,70], "Cologne mayor before CDU era");
  I("Theodor von Guérard",   "Zentrum", "e2", ["justice","transport"],                        [52,65,50,55,52], "Zentrum justice minister");
  I("Karl Trimborn",         "Zentrum", "e1", ["leader"],                                     [55,68,55,58,58], "Early Zentrum chairman");
  I("Carl Bachem",           "Zentrum", "e1", ["leader","business"],                          [50,65,50,55,52], "Zentrum industrialist");
  I("Peter Spahn",           "Zentrum", "e1", ["justice"],                                    [52,65,52,55,54], "Zentrum Reichstag leader");
  I("Wilhelm Emanuel von Ketteler","Zentrum","e1",["work","culture"],                         [60,62,65,58,56], "Catholic social teaching bishop");
  I("Georg von Hertling",    "Zentrum", "e1", ["pm"],                                         [55,72,52,60,58], "Imperial German Chancellor 1917–18");

  /* ── KPD (German Communist Party) ───────────────────────────── */
  I("Ernst Thälmann",        "KPD",     "e2", ["leader","pm"],                                [58,72,65,52,62], "KPD leader murdered by Nazis");
  I("Rosa Luxemburg",        "KPD",     "e2", ["leader","work"],                              [72,70,80,65,68], "Revolutionary theorist, murdered 1919");
  I("Karl Liebknecht",       "KPD",     "e2", ["leader","work"],                              [68,68,75,60,65], "KPD co-founder, murdered 1919");
  I("Clara Zetkin",          "KPD",     "e2", ["leader","work","education"],                  [68,70,72,62,65], "International Women's Day founder");
  I("August Thalheimer",     "KPD",     "e2", ["leader"],                                     [58,65,60,55,58], "KPD theoretician");
  I("Paul Levi",             "KPD",     "e2", ["leader","justice"],                           [60,65,62,58,60], "KPD founding leader");
  I("Eugen Leviné",          "KPD",     "e2", ["leader"],                                     [55,60,58,48,52], "Bavarian Soviet leader, executed 1919");
  I("Wilhelm Pieck",         "KPD",     "e2", ["leader","work"],                              [55,68,58,55,58], "KPD co-founder, later SED president");
  I("Ruth Fischer",          "KPD",     "e2", ["leader"],                                     [58,62,60,50,55], "KPD ultra-left leader 1924–25");
  I("Ernst Meyer",           "KPD",     "e2", ["leader"],                                     [55,62,58,52,55], "KPD chairman 1921–22");
  I("Heinrich Brandler",     "KPD",     "e2", ["leader","work"],                              [58,65,58,55,58], "KPD leader during 1923 crisis");
  I("Willi Münzenberg",      "KPD",     "e2", ["culture","business"],                         [62,68,65,58,60], "Communist media mogul in Weimar");
  I("Hans Kippenberger",     "KPD",     "e2", ["defence"],                                    [48,60,45,48,48], "KPD military apparatus chief");
  I("John Schehr",           "KPD",     "e2", ["leader"],                                     [50,60,52,48,52], "KPD leader murdered by SS 1934");
  I("Ernst Schneller",       "KPD",     "e2", ["defence","work"],                             [50,60,52,48,52], "KPD Reichstag member");
  I("Hans Berger",           "KPD",     "e2", ["work"],                                       [48,58,50,45,50], "KPD trade union organiser");
  I("Arkadi Maslow",         "KPD",     "e2", ["leader"],                                     [55,60,58,48,52], "KPD left opposition leader");
  I("Heinz Neumann",         "KPD",     "e2", ["leader"],                                     [52,62,55,48,52], "KPD ultra-left Comintern agent");
  I("Ernst Reuter",          "KPD",     "e2", ["work","leader"],                              [60,65,62,55,58], "KPD defector who became SPD Berlin mayor");
  I("Max Hölz",              "KPD",     "e2", ["work"],                                       [48,55,50,42,45], "Red Army commander of the Vogtland uprising");
  I("Erich Mühsam",          "KPD",     "e2", ["culture","work"],                             [58,58,62,48,50], "Anarchist/Communist poet, murdered 1934");
  I("Walter Ulbricht",       "KPD",     "e2", ["leader","pm"],                                [42,68,38,48,52], "KPD cadre who led DDR");
  I("Fritz Heckert",         "KPD",     "e2", ["work"],                                       [50,60,52,48,52], "KPD trade unionist");
  I("Paul Böttcher",         "KPD",     "e2", ["work","leader"],                              [48,58,50,45,50], "KPD Reichstag member");
  I("Alfred Kurella",        "KPD",     "e3", ["culture"],                                    [50,60,52,48,50], "Cultural Stalinist in DDR");
  I("Wilhelm Florin",        "KPD",     "e2", ["leader"],                                     [48,60,48,45,50], "KPD Comintern functionary");
  I("Remig Becker",          "KPD",     "e2", ["work"],                                       [46,55,48,42,48], "KPD working-class militant");
  I("Friedrich Ebert Jr.",   "SPD",     "e4", ["pm"],                                         [52,65,50,55,55], "West Berlin mayor, son of first president");

  /* ── DDP (German Democrats, Weimar) ─────────────────────────── */
  I("Friedrich Naumann",     "DDP (DE)","e1", ["leader","culture","trade"],                   [65,68,72,62,60], "Liberal theologian and politician");
  I("Hugo Preuß",            "DDP (DE)","e2", ["justice","leader"],                           [62,68,65,62,60], "Drafted Weimar Constitution");
  I("Theodor Wolff",         "DDP (DE)","e2", ["culture","leader"],                           [60,65,65,58,55], "Berliner Tageblatt editor, DDP co-founder");
  I("Georg Gothein",         "DDP (DE)","e2", ["chancellor","trade"],                         [55,65,52,58,52], "DDP economist");
  I("Eugen Schiffer",        "DDP (DE)","e2", ["justice","chancellor"],                       [55,68,52,58,54], "DDP Justice Minister");
  I("Eduard Hamm",           "DDP (DE)","e2", ["trade","chancellor"],                         [52,65,50,55,52], "DDP Economics Minister");
  I("Anton Erkelenz",        "DDP (DE)","e2", ["work","leader"],                              [55,62,55,55,54], "DDP social-liberal wing");
  I("Otto Gessler",          "DDP (DE)","e2", ["defence"],                                    [52,68,48,55,50], "DDP Defence Minister throughout 1920s");
  I("Karl Jarres",           "DDP (DE)","e2", ["pm"],                                         [52,65,50,52,52], "DDP candidate for Weimar president 1925");
  I("Katharina von Kardorff","DDP (DE)","e2", ["education"],                                  [55,60,55,52,52], "DDP women's rights advocate");
  I("Georg Bernhard",        "DDP (DE)","e2", ["business","chancellor"],                      [55,62,52,55,52], "DDP economic journalist and politician");
  I("Martin Glaeser",        "DDP (DE)","e2", ["transport"],                                  [48,60,48,50,48], "DDP transport official");
  I("Reinhold Maier",        "DDP (DE)","e2", ["pm"],                                         [55,65,52,58,55], "DDP politician who became FDP founder");
  I("Ernst Lemmer",          "DDP (DE)","e2", ["foreign","leader"],                           [52,62,52,52,52], "DDP journalist and politician");
  I("Walter Schücking",      "DDP (DE)","e2", ["foreign","justice"],                          [58,65,55,58,52], "International law professor, DDP MP");
  I("Hermann Fischer",       "DDP (DE)","e2", ["chancellor"],                                 [50,60,48,52,50], "DDP finance minister");
  I("Maria Lüders",          "DDP (DE)","e2", ["education","work"],                           [55,60,55,52,52], "DDP women's movement leader");
  I("Carl Petersen",         "DDP (DE)","e2", ["pm"],                                         [52,62,50,52,52], "Hamburg DDP mayor");
  I("Wilhelm von Massow",    "DDP (DE)","e2", ["agriculture"],                                [48,60,45,50,48], "DDP agrarian wing");
  I("Alfred Barnick",        "DDP (DE)","e2", ["trade"],                                      [46,58,45,48,46], "DDP Reichstag member");

  /* ── DVP (German People's Party, Weimar) ────────────────────── */
  I("Gustav Stresemann",     "DVP (DE)","e2", ["pm","foreign","chancellor"],                  [72,78,70,75,68], "Nobel Peace laureate, Weimar's greatest statesman");
  I("Karl Jarres",           "DVP (DE)","e2", ["pm"],                                         [52,65,50,52,52], "DVP mayor of Duisburg");
  I("Rudolf Heinze",         "DVP (DE)","e2", ["justice"],                                    [52,65,48,55,50], "DVP Justice Minister");
  I("Otto Thiel",            "DVP (DE)","e2", ["chancellor","trade"],                         [50,62,48,52,50], "DVP economics politician");
  I("Ernst Scholz",          "DVP (DE)","e2", ["leader"],                                     [52,62,50,52,52], "DVP chairman after Stresemann");
  I("Eduard Dingeldey",      "DVP (DE)","e2", ["leader"],                                     [50,60,48,50,50], "Last DVP chairman");
  I("Wilhelm Kahl",          "DVP (DE)","e2", ["justice"],                                    [52,65,50,55,50], "DVP law professor and MP");
  I("Hugo Stinnes",          "DVP (DE)","e2", ["business","trade"],                           [60,65,52,62,55], "Industrial magnate and DVP MP");
  I("Albert Vögler",         "DVP (DE)","e2", ["business"],                                   [58,65,48,60,52], "Steel industrialist, DVP financier");
  I("Johannes Popitz",       "DVP (DE)","e2", ["chancellor"],                                 [55,68,50,60,52], "Prussian finance minister");
  I("Peter Reinhold",        "DVP (DE)","e2", ["chancellor","education"],                     [52,62,50,52,52], "DVP Finance and Education minister");
  I("Erich Koch-Weser",      "DDP (DE)","e2", ["justice","pm"],                               [55,65,52,56,54], "DDP Justice Minister, successor to Preuß");
  I("Ernst von Simson",      "DVP (DE)","e1", ["foreign","justice"],                          [55,68,52,58,52], "North German Confederation president");
  I("Arnold Wahnschaffe",    "DVP (DE)","e2", ["pm"],                                         [48,62,45,50,48], "DVP state secretary");
  I("Paul Moldenhauer",      "DVP (DE)","e2", ["chancellor","trade"],                         [50,62,48,52,50], "DVP Finance and Economics minister");
  I("Hans Luther",           "DVP (DE)","e2", ["chancellor","pm"],                            [55,70,50,60,55], "Non-party chancellor supported by DVP");
  I("Wilhelm Cuno",          "DVP (DE)","e2", ["pm","chancellor"],                            [52,68,48,55,50], "Shipping magnate, chancellor during hyperinflation");
  I("Carl Friedrich von Siemens","DVP (DE)","e2",["business"],                               [58,65,48,60,52], "Siemens heir and DVP supporter");
  I("Julius Curtius",        "DVP (DE)","e2", ["foreign","chancellor"],                       [55,68,52,58,52], "DVP Foreign Minister 1929–31");
  I("Heinrich Albert",       "DVP (DE)","e2", ["chancellor","trade"],                         [50,62,48,52,50], "DVP economics and transport minister");

  /* ── BSW (Bündnis Sahra Wagenknecht) ────────────────────────── */
  I("Sahra Wagenknecht",     "BSW",     "e7", ["pm","chancellor","leader"],                   [72,78,78,68,72], "BSW founder, left-nationalist populist");
  I("Amira Mohamed Ali",     "BSW",     "e7", ["leader","justice"],                           [56,65,60,58,60], "BSW co-chair from 2024");
  I("Fabio De Masi",         "BSW",     "e7", ["chancellor","business"],                      [58,65,62,60,60], "BSW financial crime expert");
  I("Klaus Ernst",           "BSW",     "e7", ["work","business"],                            [54,68,55,55,58], "BSW trade unionist, ex-Die Linke");
  I("Thomas Geisel",         "BSW",     "e7", ["pm","work"],                                  [54,62,55,55,56], "Düsseldorf mayor who joined BSW");
  I("Sevim Dağdelen",        "BSW",     "e7", ["foreign"],                                    [56,65,58,55,58], "BSW anti-war foreign policy voice");
  I("Christian Leye",        "BSW",     "e7", ["work","chancellor"],                          [50,60,52,52,54], "BSW Bundestag member");
  I("Jessica Tatti",         "BSW",     "e7", ["work","health"],                              [50,60,52,50,54], "BSW labour rights advocate");
  I("Ralph Suikat",          "BSW",     "e7", ["business"],                                   [50,58,50,50,52], "BSW digital entrepreneur");
  I("Ates Gürpinar",         "BSW",     "e7", ["work","home"],                                [50,60,52,50,54], "BSW Bundestag member");
  I("Friedrich Straetmanns", "BSW",     "e7", ["justice","work"],                             [50,60,52,50,52], "BSW labour lawyer");
  I("Alexander King",        "BSW",     "e7", ["education"],                                  [48,56,50,48,50], "BSW education politician");
  I("Klaus Müller",          "BSW",     "e7", ["energy","business"],                          [50,58,50,50,52], "BSW energy regulation critic");
  I("Konstanze Möller",      "BSW",     "e7", ["health"],                                     [48,55,50,48,50], "BSW health policy advocate");
  I("Andreas Büttner",       "BSW",     "e7", ["agriculture"],                                [48,55,48,48,50], "BSW rural constituency politician");

  /* ═══════════════════════════════════════════════════════════════
     FRANCE — ADDITIONAL POLITICIANS
     ═══════════════════════════════════════════════════════════════ */

  /* ── La France Insoumise ─────────────────────────────────────── */
  I("Jean-Luc Mélenchon",    "La France Insoumise","e7",["pm","leader","chancellor"],         [75,80,80,70,72], "LFI founder, socialist firebrand");
  I("Mathilde Panot",        "La France Insoumise","e7",["leader","pm"],                      [60,62,65,58,62], "LFI parliamentary group leader");
  I("Adrien Quatennens",     "La France Insoumise","e7",["leader"],                           [56,58,60,54,58], "LFI northern France organiser");
  I("Alexis Corbière",       "La France Insoumise","e7",["education","culture","leader"],     [60,65,65,58,60], "LFI education spokesman");
  I("Danièle Obono",         "La France Insoumise","e7",["justice","immigration"],            [58,62,62,55,58], "LFI anti-racism voice");
  I("François Ruffin",       "La France Insoumise","e7",["work","culture","leader"],          [65,62,68,60,60], "LFI documentary filmmaker turned MP");
  I("Clémentine Autain",     "La France Insoumise","e7",["culture","education"],              [60,62,62,58,58], "LFI feminist leader");
  I("Manuel Bompard",        "La France Insoumise","e7",["leader"],                           [55,60,58,55,58], "LFI national coordinator");
  I("Éric Coquerel",         "La France Insoumise","e7",["chancellor","justice"],             [58,65,60,55,60], "LFI finance committee chair");
  I("Antoine Léaument",      "La France Insoumise","e7",["digital","trade"],                  [52,55,55,50,54], "LFI digital affairs");
  I("Aurélie Trouvé",        "La France Insoumise","e7",["trade","agriculture"],              [54,58,56,52,54], "LFI trade and agriculture");
  I("Louis Boyard",          "La France Insoumise","e7",["culture","education"],              [55,52,60,50,54], "Young LFI MP");
  I("Rachel Keke",           "La France Insoumise","e7",["work","immigration"],               [58,55,60,50,54], "LFI hotel worker turned MP");
  I("Raquel Garrido",        "La France Insoumise","e7",["justice","immigration"],            [58,60,62,55,58], "LFI lawyer and spokesperson");
  I("Bastien Lachaud",       "La France Insoumise","e7",["defence"],                          [52,58,54,52,54], "LFI defence critic");
  I("Sabine Rubin",          "La France Insoumise","e7",["chancellor"],                       [52,58,54,52,54], "LFI budget specialist");
  I("Caroline Fiat",         "La France Insoumise","e7",["health"],                           [54,55,56,50,54], "LFI nurse-turned-MP");
  I("Bénédicte Taurine",     "La France Insoumise","e7",["agriculture"],                      [50,55,52,50,52], "LFI agriculture spokesperson");
  I("Michel Larive",         "La France Insoumise","e7",["education"],                        [50,56,52,50,52], "LFI education politician");
  I("Loïc Prud'homme",       "La France Insoumise","e7",["environment","agriculture"],        [52,56,54,50,52], "LFI environment voice");
  I("Ugo Bernalicis",        "La France Insoumise","e7",["justice","home"],                   [52,56,54,50,52], "LFI police reform advocate");
  I("Paul Vannier",          "La France Insoumise","e7",["education","culture"],              [50,54,52,48,52], "LFI culture and education");
  I("Sarah Legrain",         "La France Insoumise","e7",["culture"],                          [50,52,52,48,50], "LFI culture spokesperson");
  I("Andrée Taurinya",       "La France Insoumise","e7",["work","health"],                    [50,54,52,48,50], "LFI social policy");
  I("David Guiraud",         "La France Insoumise","e7",["work","immigration"],               [52,54,54,48,52], "LFI northern France working class voice");
  I("Arnaud Le Gall",        "La France Insoumise","e7",["foreign"],                          [52,56,54,50,52], "LFI foreign affairs");
  I("Thomas Portes",         "La France Insoumise","e7",["home","justice"],                   [50,52,52,48,50], "LFI home affairs");
  I("Charlotte Leduc",       "La France Insoumise","e7",["work","trade"],                     [50,52,52,48,50], "LFI labour union linked MP");
  I("Hadrien Clouet",        "La France Insoumise","e7",["work","chancellor"],                [52,54,54,50,52], "LFI labour economist");
  I("Alma Dufour",           "La France Insoumise","e7",["trade","environment"],              [52,52,54,48,50], "LFI trade and climate");

  /* ── Parti Communiste (PCF) ──────────────────────────────────── */
  I("Maurice Thorez",        "Parti Communiste","e3",["leader","pm","work"],                  [60,75,65,58,68], "PCF leader 1930–64, Stalinist");
  I("Jacques Duclos",        "Parti Communiste","e3",["leader","pm"],                         [62,78,68,60,65], "PCF veteran, 1969 presidential runner-up");
  I("Waldeck Rochet",        "Parti Communiste","e4",["leader"],                              [58,72,60,55,62], "PCF leader after Thorez");
  I("Georges Marchais",      "Parti Communiste","e5",["leader","pm"],                         [62,75,65,58,68], "PCF leader 1972–94");
  I("Robert Hue",            "Parti Communiste","e6",["leader","pm","health"],                [58,72,60,55,62], "PCF leader 1994–2003");
  I("Marie-George Buffet",   "Parti Communiste","e6",["leader","pm","work"],                  [58,70,60,55,62], "PCF leader 2001–10");
  I("Pierre Laurent",        "Parti Communiste","e7",["leader","pm"],                         [55,68,58,52,60], "PCF national secretary 2010–18");
  I("Fabien Roussel",        "Parti Communiste","e7",["leader","pm","chancellor"],            [60,65,65,58,62], "PCF secretary and presidential candidate");
  I("André Marty",           "Parti Communiste","e3",["leader","defence"],                    [50,65,52,48,52], "PCF militant, Spanish Civil War commissar");
  I("Benoît Frachon",        "Parti Communiste","e3",["work","leader"],                       [58,68,60,52,62], "CGT union chief and PCF leader");
  I("Laurent Casanova",      "Parti Communiste","e4",["culture","leader"],                    [55,65,58,52,58], "PCF intellectuals liaison");
  I("Florimond Bonte",       "Parti Communiste","e3",["foreign","leader"],                    [52,62,55,50,55], "PCF foreign affairs expert");
  I("Étienne Fajon",         "Parti Communiste","e3",["leader","foreign"],                    [52,65,55,50,55], "PCF editor and foreign policy speaker");
  I("Raymond Guyot",         "Parti Communiste","e4",["foreign"],                             [50,62,52,48,52], "PCF international relations");
  I("Fernand Grenier",       "Parti Communiste","e3",["leader"],                              [52,62,52,48,52], "PCF Resistance hero");
  I("Charles Fiterman",      "Parti Communiste","e5",["transport","pm"],                      [55,68,55,52,55], "PCF minister in Mauroy government");
  I("Anicet Le Pors",        "Parti Communiste","e5",["work","justice"],                      [55,68,55,52,55], "PCF minister, civil service reformer");
  I("Jack Ralite",           "Parti Communiste","e5",["health","culture"],                    [55,65,58,52,55], "PCF health and culture minister");
  I("André Lajoinie",        "Parti Communiste","e6",["leader","agriculture"],                [52,65,52,50,55], "PCF 1988 presidential candidate");
  I("Guy Hocquenghem",       "Parti Communiste","e5",["culture","education"],                 [55,58,58,50,50], "PCF-linked radical intellectual");
  I("Gaston Plissonnier",    "Parti Communiste","e5",["leader"],                              [50,65,48,50,52], "PCF organisation secretary");
  I("Roland Leroy",          "Parti Communiste","e5",["culture","leader"],                    [52,65,52,50,52], "PCF Humanité director");
  I("Claude Poperen",        "Parti Communiste","e5",["leader"],                              [50,62,50,48,52], "PCF organisational leader");
  I("Gustave Ansart",        "Parti Communiste","e5",["work","leader"],                       [50,62,50,48,52], "PCF trade union bridge");
  I("Jacqueline Fraysse",    "Parti Communiste","e7",["health"],                              [52,62,52,50,52], "PCF health specialist MP");
  I("André Chassaigne",      "Parti Communiste","e7",["agriculture","leader"],                [55,68,55,52,58], "PCF agriculture voice and MP");
  I("Nicolas Bonnet Oulaldj","Parti Communiste","e7",["work","health"],                       [50,55,52,48,52], "PCF Paris federation leader");
  I("Elsa Faucillon",        "Parti Communiste","e7",["education","culture"],                 [52,58,54,50,52], "PCF feminist and culture MP");
  I("Pierre Dharréville",    "Parti Communiste","e7",["health","work"],                       [50,56,52,48,50], "PCF Bouches-du-Rhône MP");
  I("Sébastien Jumel",       "Parti Communiste","e7",["work","chancellor"],                   [52,60,54,50,52], "PCF Normandy MP");

  /* ── Rassemblement National ──────────────────────────────────── */
  I("Jean-Marie Le Pen",     "Rassemblement National","e5",["leader","pm","home"],            [60,78,65,55,65], "FN/RN founder, 2002 presidential finalist");
  I("Marine Le Pen",         "Rassemblement National","e7",["leader","pm"],                   [68,72,68,62,70], "RN leader, three-time presidential candidate");
  I("Marion Maréchal",       "Rassemblement National","e7",["leader","pm","education"],       [64,60,65,58,62], "Le Pen niece, right-wing intellectual");
  I("Jordan Bardella",       "Rassemblement National","e7",["leader","pm","chancellor"],      [62,58,65,58,65], "RN president, MEP and PM candidate 2024");
  I("Bruno Gollnisch",       "Rassemblement National","e6",["leader","foreign"],              [55,72,58,52,58], "FN vice-president, MEP");
  I("Florian Philippot",     "Rassemblement National","e7",["leader","pm"],                   [58,60,62,55,58], "RN strategist who later left");
  I("Nicolas Bay",           "Rassemblement National","e7",["leader"],                        [52,58,55,50,55], "RN secretary-general");
  I("Sébastien Chenu",       "Rassemblement National","e7",["culture","home"],                [52,55,55,50,54], "RN culture spokesperson");
  I("Thierry Mariani",       "Rassemblement National","e7",["foreign","transport"],           [55,65,55,52,55], "RN MEP, former Sarkozy minister");
  I("Gilbert Collard",       "Rassemblement National","e6",["justice","home"],                [55,62,58,50,54], "RN lawyer-MP");
  I("Louis Aliot",           "Rassemblement National","e7",["home","immigration"],            [52,58,55,50,54], "RN Perpignan mayor");
  I("Steeve Briois",         "Rassemblement National","e7",["home","work"],                   [52,58,54,50,54], "RN Hénin-Beaumont mayor");
  I("Robert Ménard",         "Rassemblement National","e7",["culture","home"],                [54,58,58,50,52], "Béziers mayor, RN-adjacent");
  I("Jean-Lin Lacapelle",    "Rassemblement National","e7",["foreign"],                       [50,55,52,48,52], "RN international affairs");
  I("Edwige Diaz",           "Rassemblement National","e7",["education","culture"],           [50,52,52,48,50], "RN Bordeaux-area MP");
  I("Gilles Lebreton",       "Rassemblement National","e7",["justice","foreign"],             [50,58,50,48,50], "RN MEP, legal scholar");
  I("Yoann Gillet",          "Rassemblement National","e7",["home"],                          [48,52,50,46,50], "RN home affairs MP");
  I("Thomas Ménagé",         "Rassemblement National","e7",["home","justice"],                [50,52,52,48,50], "RN security spokesperson");
  I("Jean-Philippe Tanguy",  "Rassemblement National","e7",["chancellor","business"],         [54,58,56,52,54], "RN finance critical voice");
  I("Hélène Laporte",        "Rassemblement National","e7",["chancellor"],                    [50,54,52,48,50], "RN budget spokesperson");
  I("Franck Allisio",        "Rassemblement National","e7",["work","trade"],                  [48,52,50,46,50], "RN Marseille MP");
  I("Victor Catteau",        "Rassemblement National","e7",["agriculture"],                   [46,50,48,44,48], "RN northern France MP");
  I("Kévin Mauvieux",        "Rassemblement National","e7",["home"],                          [46,50,48,44,48], "RN junior MP");
  I("Emmanuel Taché de la Pagerie","Rassemblement National","e7",["immigration","culture"],   [48,52,50,46,50], "RN immigration hardliner");
  I("Annick Cousin",         "Rassemblement National","e7",["education"],                     [46,50,48,44,48], "RN education MP");
  I("Philippe Ballard",      "Rassemblement National","e7",["culture","media"],               [50,55,52,48,50], "RN media and culture spokesman");
  I("Laure Lavalette",       "Rassemblement National","e7",["environment"],                   [48,52,50,46,48], "RN environment MP");
  I("Christophe Bex",        "La France Insoumise","e7",["defence","foreign"],                [50,54,52,48,52], "LFI anti-NATO defence MP");

  /* ── Les Républicains ────────────────────────────────────────── */
  I("Valéry Giscard d'Estaing","Les Républicains","e5",["pm","chancellor","foreign"],         [70,82,68,78,68], "Centre-right President 1974–81");
  I("Philippe Séguin",       "Les Républicains","e5",["pm","leader","work"],                  [68,78,72,68,68], "RPR leader, anti-Maastricht voice");
  I("Édouard Balladur",      "Les Républicains","e6",["pm","chancellor"],                     [62,80,58,72,65], "Gaullist PM 1993–95");
  I("Alain Juppé",           "Les Républicains","e6",["pm","foreign","leader"],               [62,82,60,72,65], "RPR/UMP PM and presidential rival");
  I("François Fillon",       "Les Républicains","e7",["pm","leader"],                         [62,80,58,70,65], "UMP PM 2007–12, 2017 scandal candidate");
  I("Xavier Bertrand",       "Les Républicains","e7",["pm","work","health"],                  [58,72,55,62,62], "LR Hauts-de-France president, presidential hopeful");
  I("Valérie Pécresse",      "Les Républicains","e7",["pm","leader","chancellor"],            [58,72,55,62,60], "LR 2022 presidential candidate");
  I("Laurent Wauquiez",      "Les Républicains","e7",["leader","pm"],                         [58,68,58,58,62], "LR leader 2017–19");
  I("Bruno Le Maire",        "Les Républicains","e7",["chancellor","business","trade"],       [62,72,62,65,62], "UMP/LR→Macron, Finance minister");
  I("Jean-François Copé",    "Les Républicains","e6",["pm","leader","budget"],                [58,72,58,60,62], "UMP leader 2012–14");
  I("Patrick Devedjian",     "Les Républicains","e6",["home","business","leader"],            [58,72,55,62,60], "UMP party director");
  I("Michel Barnier",        "Les Républicains","e7",["pm","foreign","trade"],                [60,80,58,70,62], "EU Brexit negotiator, PM 2024");
  I("Rachida Dati",          "Les Républicains","e7",["justice","culture"],                   [60,65,62,58,58], "Sarkozy's Justice minister, Paris mayor candidate");
  I("Brice Hortefeux",       "Les Républicains","e6",["home","pm"],                           [52,72,50,60,55], "Sarkozy's interior minister");
  I("Nathalie Kosciusko-Morizet","Les Républicains","e7",["environment","digital"],           [58,68,58,60,55], "UMP/LR ecology voice");
  I("Gérard Larcher",        "Les Républicains","e7",["pm","leader"],                         [58,75,55,65,65], "LR Senate president");
  I("Éric Woerth",           "Les Républicains","e7",["chancellor","work"],                   [55,72,52,62,58], "UMP budget minister, pension reform");
  I("Philippe Juvin",        "Les Républicains","e7",["health","leader"],                     [54,65,55,58,55], "LR 2022 primary candidate, GP");
  I("Aurélien Pradié",       "Les Républicains","e7",["leader","pm"],                         [55,60,58,55,58], "LR deputy leader");
  I("Annie Genevard",        "Les Républicains","e7",["education","culture","leader"],        [52,65,52,55,55], "LR parliamentary group leader");
  I("Éric Ciotti",           "Les Républicains","e7",["leader","home"],                       [54,65,55,55,58], "LR leader 2022–24");
  I("Sébastien Lecornu",     "Les Républicains","e7",["defence","pm"],                        [58,65,58,60,58], "LR→Macron defence minister");
  I("Édouard Philippe",      "Les Républicains","e7",["pm","leader"],                         [65,72,62,68,65], "LR→Macron PM 2017–20, Le Havre mayor");
  I("Isabelle Balkany",      "Les Républicains","e6",["pm"],                                  [48,62,45,50,50], "Levallois LR mayor");
  I("Pierre-Yves Bournazel", "Les Républicains","e7",["culture","leader"],                    [50,58,52,50,52], "Paris LR councillor");
  I("Michel Mercier",        "Les Républicains","e6",["justice"],                             [52,68,48,56,52], "Centre-right Justice minister");
  I("Damien Abad",           "Les Républicains","e7",["work","agriculture"],                  [52,60,52,52,54], "LR MP, briefly Macron minister");

  /* ── Radical (FR) ────────────────────────────────────────────── */
  I("Léon Gambetta",         "Radical (FR)","e1",["pm","leader","foreign"],                   [72,72,80,68,70], "Republic's father; architect of secular France");
  I("Jules Ferry",           "Radical (FR)","e1",["pm","education","foreign"],                [68,75,65,72,68], "PM, secular schools and colonial expansion");
  I("Edouard Herriot",       "Radical (FR)","e2",["pm","leader","culture"],                   [65,78,68,65,65], "Radical PM three times, Lyon mayor for decades");
  I("Léon Bourgeois",        "Radical (FR)","e1",["pm","foreign","justice"],                  [65,75,65,68,62], "First radical PM, Nobel Peace laureate");
  I("Joseph Caillaux",       "Radical (FR)","e2",["chancellor","pm"],                         [65,78,62,70,60], "Radical finance minister, pacifist PM");
  I("Camille Pelletan",      "Radical (FR)","e1",["defence","leader"],                        [58,68,62,58,58], "Radical Navy minister");
  I("Émile Combes",          "Radical (FR)","e1",["pm","leader"],                             [62,72,60,65,62], "Radical anticlerical PM, enforced separation of church");
  I("Jean-Louis Barthou",    "Radical (FR)","e2",["pm","foreign","justice"],                  [65,75,62,68,62], "Radical PM and foreign minister, assassinated 1934");
  I("Paul Doumer",           "Radical (FR)","e2",["pm","chancellor"],                         [60,72,58,65,58], "Radical President, assassinated 1932");
  I("Albert Sarraut",        "Radical (FR)","e2",["pm","home"],                               [58,70,55,62,58], "Radical PM and interior minister");
  I("Édouard Daladier",      "Radical (FR)","e3",["pm","defence","leader"],                   [60,75,58,62,62], "Radical PM who signed Munich Agreement");
  I("Pierre Mendès France",  "Radical (FR)","e4",["pm","chancellor","foreign"],               [70,78,70,72,65], "Radical moderniser, ended Indochina War");
  I("Edgar Faure",           "Radical (FR)","e4",["pm","chancellor","foreign"],               [65,78,62,68,65], "Radical PM twice; adaptable centrist");
  I("Maurice Faure",         "Radical (FR)","e4",["foreign"],                                 [60,72,58,62,60], "Signed Treaty of Rome for France");
  I("Jean-Jacques Servan-Schreiber","Radical (FR)","e5",["leader","business"],               [65,65,68,62,58], "Radical moderniser, L'Express founder");
  I("Félix Gaillard",        "Radical (FR)","e4",["pm","chancellor"],                         [60,70,58,62,58], "Youngest Radical PM, 1957–58");
  I("Henri Queuille",        "Radical (FR)","e3",["pm","agriculture"],                        [58,75,52,62,60], "Radical PM three times; mastered inaction");
  I("René Mayer",            "Radical (FR)","e4",["pm","chancellor"],                         [58,70,55,62,58], "Radical PM 1953");
  I("Paul Reynaud",          "Radical (FR)","e3",["pm","chancellor","foreign"],               [65,75,65,68,60], "Radical PM who resisted armistice in 1940");
  I("Yvon Delbos",           "Radical (FR)","e3",["foreign","education"],                     [58,68,55,60,56], "Radical foreign minister before WWII");
  I("Camille Chautemps",     "Radical (FR)","e3",["pm","home"],                               [58,72,55,60,58], "Radical PM who favoured armistice");

  /* ── SFIO (French socialists, pre-PS) ───────────────────────── */
  I("Jean Jaurès",           "SFIO (FR)","e1",["leader","work","foreign"],                    [78,72,85,70,72], "SFIO founder, assassinated 1914");
  I("Marcel Cachin",         "SFIO (FR)","e2",["leader","work"],                              [65,72,68,60,65], "SFIO then PCF co-founder");
  I("Édouard Vaillant",      "SFIO (FR)","e1",["leader","work"],                              [65,68,68,60,62], "Marxist socialist, SFIO founder");
  I("Paul Faure",            "SFIO (FR)","e2",["leader"],                                     [55,68,55,52,60], "SFIO secretary-general, pacifist");
  I("Albert Thomas",         "SFIO (FR)","e2",["work","leader"],                              [65,72,65,62,62], "SFIO minister, ILO founder");
  I("Vincent Auriol",        "SFIO (FR)","e3",["pm","chancellor","leader"],                   [65,78,62,70,65], "SFIO, first President of Fourth Republic");
  I("Guy Mollet",            "SFIO (FR)","e4",["pm","leader","work"],                         [62,78,60,65,65], "SFIO PM 1956–57, led Suez");
  I("Daniel Mayer",          "SFIO (FR)","e3",["leader","work"],                              [58,68,58,58,60], "SFIO Resistance leader");
  I("Félix Gouin",           "SFIO (FR)","e3",["pm","leader"],                                [58,70,55,62,58], "SFIO PM 1946");
  I("Paul Ramadier",         "SFIO (FR)","e3",["pm","work","chancellor"],                     [60,72,55,62,60], "First PM of Fourth Republic, ousted Communists");
  I("Francis de Pressensé",  "SFIO (FR)","e1",["foreign","leader"],                          [58,62,62,55,55], "SFIO Dreyfusard and international leader");
  I("Marcel Sembat",         "SFIO (FR)","e2",["work","leader"],                              [58,65,60,55,58], "SFIO wartime minister");
  I("Marius Moutet",         "SFIO (FR)","e3",["foreign","justice"],                          [55,65,52,55,55], "SFIO minister and colonial critic");
  I("Max Lejeune",           "SFIO (FR)","e4",["defence"],                                    [52,65,48,55,52], "SFIO Algerian War hardliner");
  I("Jules Moch",            "SFIO (FR)","e4",["home","transport"],                           [58,70,55,60,58], "SFIO interior minister who crushed strikes");
  I("Pierre Grégoire",       "SFIO (FR)","e3",["work","education"],                           [52,60,50,52,52], "SFIO education minister");
  I("Léon Jouhaux",          "SFIO (FR)","e2",["work","leader"],                              [62,68,62,58,60], "CGT union boss linked to SFIO");
  I("Hélène Brion",          "SFIO (FR)","e2",["education","work"],                           [60,60,62,55,55], "SFIO suffragette and pacifist");
  I("Louise Saumoneau",      "SFIO (FR)","e2",["leader","work"],                              [58,60,60,52,55], "SFIO women's socialist union");
  I("Eugène Frot",           "SFIO (FR)","e2",["home"],                                       [50,60,48,52,50], "SFIO interior minister");
  I("Emmanuel Chaumette",    "SFIO (FR)","e3",["work"],                                       [48,58,48,50,50], "SFIO organiser");
  I("Robert Verdier",        "SFIO (FR)","e3",["leader"],                                     [50,62,50,50,52], "SFIO Resistance figure");
  I("Noël Cartan",           "SFIO (FR)","e3",["education"],                                  [48,58,48,50,48], "SFIO educator and theorist");
  I("Pierre Commin",         "SFIO (FR)","e4",["work","leader"],                              [50,62,50,50,52], "SFIO organisation secretary");
  I("André Philip",          "SFIO (FR)","e3",["chancellor","foreign"],                       [58,65,55,58,55], "SFIO European federalist");
  I("François Tanguy-Prigent","SFIO (FR)","e3",["agriculture"],                              [52,60,50,52,52], "SFIO agriculture minister postwar");
  I("Léon Blum",             "Parti Socialiste","e3",["pm","leader"],                         [70,78,72,68,68], "Popular Front PM, SFIO/PS continuity");
  I("Pierre Mauroy",         "Parti Socialiste","e6",["pm","work","leader"],                  [65,78,62,68,68], "PS PM 1981–84, Mitterrand's first PM");
  I("Michel Rocard",         "Parti Socialiste","e6",["pm","leader","work"],                  [68,80,65,72,65], "PS PM 1988–91, moral left voice");

  /* ── MRP (French Christian Democrats) ───────────────────────── */
  I("Georges Bidault",       "MRP (FR)","e3",["pm","foreign","leader"],                       [62,78,65,68,62], "MRP PM and Resistance hero");
  I("Robert Schuman",        "MRP (FR)","e4",["pm","foreign","chancellor"],                   [68,78,62,72,60], "European founding father, Franco-German reconciliation");
  I("Maurice Schumann",      "MRP (FR)","e4",["foreign","leader"],                            [62,72,65,62,60], "MRP voice of Free France on BBC");
  I("Germaine Poinso-Chapuis","MRP (FR)","e3",["health","education"],                         [60,65,58,60,58], "First woman minister of the Fourth Republic");
  I("Paul Coste-Floret",     "MRP (FR)","e3",["defence","justice"],                           [55,68,52,58,55], "MRP defence and justice minister");
  I("Alfred Coste-Floret",   "MRP (FR)","e3",["foreign"],                                     [52,65,50,55,52], "MRP foreign affairs deputy");
  I("Pierre-Henri Teitgen",  "MRP (FR)","e3",["justice","leader"],                            [60,68,58,62,58], "MRP co-founder, defended press freedom");
  I("François de Menthon",   "MRP (FR)","e3",["justice"],                                     [58,65,55,60,55], "MRP Nuremberg prosecutor");
  I("Francisque Gay",        "MRP (FR)","e3",["leader"],                                      [55,65,55,58,58], "MRP founding father, Catholic press");
  I("Marc Sangnier",         "MRP (FR)","e1",["leader","culture","education"],                [62,65,68,58,58], "Christian democrat founder, Le Sillon");
  I("Jean Letourneau",       "MRP (FR)","e4",["foreign"],                                     [52,65,50,55,52], "MRP Indochina minister");
  I("Jean-Marie Daillet",    "MRP (FR)","e4",["agriculture"],                                 [50,60,48,50,50], "MRP agriculture spokesman");
  I("Pierre Pflimlin",       "MRP (FR)","e4",["pm","chancellor"],                             [60,72,55,62,58], "MRP last IV Republic PM, Strasbourg mayor");
  I("René Courtin",          "MRP (FR)","e4",["chancellor"],                                  [55,65,52,58,52], "MRP economist and European advocate");
  I("Étienne Borne",         "MRP (FR)","e3",["education","culture"],                         [55,62,55,55,52], "MRP philosopher and politician");
  I("Louis Terrenoire",      "MRP (FR)","e4",["foreign"],                                     [52,62,50,52,52], "MRP then Gaullist politician");
  I("Henri Lacaze",          "MRP (FR)","e3",["defence"],                                     [50,62,48,52,50], "MRP defence politician");
  I("Robert Lecourt",        "MRP (FR)","e4",["justice","foreign"],                           [58,68,55,60,55], "MRP justice minister, European Court judge");
  I("Henri Teitgen",         "MRP (FR)","e4",["justice","culture"],                           [55,65,55,58,55], "MRP legal theorist and MP");
  I("Charles Flory",         "MRP (FR)","e3",["pm","work"],                                   [52,62,50,52,52], "MRP social policy politician");
  I("Micheline Morin",       "MRP (FR)","e3",["education"],                                   [52,60,52,50,50], "MRP women's education advocate");
  I("Jacques Fonlupt-Esperaber","MRP (FR)","e3",["foreign"],                                  [50,60,48,50,50], "MRP foreign affairs MP");
  I("Denis de Rougemont",    "MRP (FR)","e3",["culture","foreign"],                           [58,62,62,55,52], "European federalist thinker, MRP-aligned");
  I("André Colin",           "MRP (FR)","e3",["leader","education"],                          [55,65,52,55,55], "MRP secretary-general");
  I("Paul-Henri Chombart de Lauwe","MRP (FR)","e4",["work","education"],                     [52,60,50,52,50], "Christian social researcher");
  I("Joseph Fontanet",       "MRP (FR)","e5",["work","health","education"],                   [55,65,52,55,55], "MRP/Centre Démocrate politician, moderniser");
  I("Jean Lecanuet",         "MRP (FR)","e5",["pm","leader","foreign"],                       [62,72,62,62,60], "MRP/CD leader, 1965 presidential surprise");
  I("Jean-Pierre Chevènement","SFIO (FR)","e6",["pm","home","defence"],                       [62,78,65,65,60], "PS maverick who founded MDC, home minister");

  /* ═══════════════════════════════════════════════════════════════
     USA — HISTORICAL PARTIES
     ═══════════════════════════════════════════════════════════════ */

  /* ── Federalist Party ────────────────────────────────────────── */
  I("Alexander Hamilton",    "Federalist","e0",["chancellor","foreign","leader"],             [75,72,72,80,72], "Founding Father, first Treasury Secretary");
  I("John Adams",            "Federalist","e0",["pm","foreign","leader"],                     [68,78,62,72,60], "Second President, first Federalist president");
  I("John Jay",              "Federalist","e0",["foreign","justice","leader"],                [65,75,62,70,60], "First Chief Justice, Jay Treaty negotiator");
  I("Rufus King",            "Federalist","e0",["foreign","leader"],                          [60,72,58,65,58], "Federalist senator and minister to Britain");
  I("Timothy Pickering",     "Federalist","e0",["foreign","pm"],                             [55,68,52,60,52], "Federalist Secretary of State");
  I("Oliver Wolcott Jr.",    "Federalist","e0",["chancellor"],                                [58,68,52,62,55], "Federalist Treasury Secretary");
  I("Fisher Ames",           "Federalist","e0",["leader","trade"],                            [62,65,65,58,58], "Federalist congressman and orator");
  I("Harrison Gray Otis",    "Federalist","e0",["leader","pm"],                               [58,65,58,58,55], "Federalist senator, Hartford Convention leader");
  I("Robert Goodloe Harper", "Federalist","e0",["leader"],                                    [55,62,58,55,52], "Federalist congressman from South Carolina");
  I("Samuel Sewall",         "Federalist","e0",["justice","leader"],                          [55,62,52,55,52], "Federalist congressman");
  I("Chauncey Goodrich",     "Federalist","e0",["chancellor","leader"],                       [52,60,50,52,50], "Federalist senator from Connecticut");
  I("James Hillhouse",       "Federalist","e0",["leader","chancellor"],                       [52,62,50,52,50], "Federalist senator");
  I("Uriah Tracy",           "Federalist","e0",["leader","foreign"],                          [52,60,52,50,50], "Federalist senator and orator");
  I("William Plumer",        "Federalist","e0",["pm","leader"],                               [55,62,52,55,52], "New Hampshire Federalist senator");
  I("Thomas Pickering",      "Federalist","e0",["foreign"],                                   [52,60,50,52,50], "Federalist congressman from Essex County");
  I("Elbridge Gerry",        "Federalist","e0",["pm","foreign"],                              [58,65,55,58,52], "Founding Father, second VP — gerrymandering namesake");
  I("Gouverneur Morris",     "Federalist","e0",["foreign","chancellor","leader"],             [68,72,65,68,60], "Constitutional draftsman, minister to France");
  I("Henry Knox",            "Federalist","e0",["defence","leader"],                          [62,68,55,62,58], "Washington's Secretary of War");
  I("James McHenry",         "Federalist","e0",["defence"],                                   [52,62,48,55,50], "Federalist Secretary of War, Fort McHenry namesake");
  I("Charles Cotesworth Pinckney","Federalist","e0",["foreign","defence","pm"],              [62,68,58,62,58], "XYZ Affair diplomat, Federalist presidential candidate");
  I("Jonathan Dayton",       "Federalist","e0",["leader"],                                    [55,62,52,55,52], "Federalist congressman");
  I("Caleb Strong",          "Federalist","e0",["pm","leader"],                               [55,65,50,55,52], "Massachusetts Federalist governor");
  I("Samuel Dexter",         "Federalist","e0",["chancellor","justice"],                      [55,62,52,55,50], "Federalist Treasury and War secretary");
  I("John Marshall",         "Federalist","e0",["justice","pm"],                              [72,75,65,72,60], "Chief Justice who defined American constitutional law");
  I("Charles Lee",           "Federalist","e0",["justice"],                                   [52,60,48,52,50], "Federalist Attorney General");
  I("James Bayard",          "Federalist","e0",["leader","foreign"],                          [58,62,55,55,52], "Federalist congressman who swung election of 1800");
  I("Josiah Quincy III",     "Federalist","e0",["leader","education"],                        [62,65,62,60,55], "Anti-war Federalist, Harvard president");
  I("John Lowell Jr.",       "Federalist","e0",["leader"],                                    [55,60,52,52,50], "Boston Brahmin Federalist");

  /* ── Whig Party (USA) ────────────────────────────────────────── */
  I("Henry Clay",            "Whig (USA)","e0",["pm","leader","trade","foreign"],             [75,78,78,72,75], "Great Compromiser, Whig founder");
  I("Daniel Webster",        "Whig (USA)","e0",["pm","foreign","justice","leader"],           [72,78,80,72,68], "Whig senator and orator");
  I("William Henry Harrison","Whig (USA)","e0",["pm","defence"],                              [60,68,55,58,58], "Ninth President, died 31 days in office");
  I("John Tyler",            "Whig (USA)","e0",["pm"],                                        [52,65,48,52,42], "Whig VP who became president; expelled from party");
  I("Zachary Taylor",        "Whig (USA)","e0",["pm","defence"],                              [58,68,50,55,50], "Hero of Mexican War, died in office");
  I("Millard Fillmore",      "Whig (USA)","e0",["pm","chancellor"],                           [52,65,48,55,52], "Whig president who signed Compromise of 1850");
  I("Winfield Scott",        "Whig (USA)","e0",["defence","pm"],                              [58,68,52,55,52], "War hero, 1852 Whig presidential candidate");
  I("Thurlow Weed",          "Whig (USA)","e0",["leader"],                                    [60,65,58,60,65], "New York Whig political boss");
  I("John J. Crittenden",    "Whig (USA)","e0",["justice","leader"],                          [60,68,58,60,58], "Whig senator, attempted Crittenden Compromise");
  I("John Bell",             "Whig (USA)","e0",["pm","leader","home"],                        [58,65,55,58,55], "Constitutional Union candidate 1860");
  I("William Seward",        "Whig (USA)","e0",["pm","foreign","leader"],                     [68,72,65,65,65], "Whig→Republican; bought Alaska as Lincoln's SoS");
  I("Schuyler Colfax",       "Whig (USA)","e0",["leader","pm"],                               [55,62,52,52,55], "Whig→Republican; Grant's first VP");
  I("Horace Greeley",        "Whig (USA)","e0",["culture","leader","pm"],                     [65,65,68,58,58], "Tribune editor, Liberal Republican 1872 candidate");
  I("Thomas Corwin",         "Whig (USA)","e0",["chancellor","foreign"],                      [60,65,62,60,58], "Whig senator, Anti-Mexican War orator");
  I("John McLean",           "Whig (USA)","e0",["justice","pm"],                              [55,65,50,55,52], "Whig Supreme Court justice");
  I("John Quincy Adams",     "Whig (USA)","e0",["pm","foreign"],                              [68,78,65,72,58], "Sixth President, later anti-slavery Whig congressman");
  I("Robert Toombs",         "Whig (USA)","e0",["leader","foreign"],                          [58,62,60,55,55], "Georgia Whig→Confederate secretary of state");
  I("Alexander Stephens",    "Whig (USA)","e0",["leader","pm"],                               [60,65,62,58,55], "Whig→Confederate Vice President");
  I("Abraham Lincoln",       "Whig (USA)","e0",["pm","justice","leader"],                     [78,68,78,72,70], "Whig congressman before founding Republican Party");
  I("Truman Smith",          "Whig (USA)","e0",["leader"],                                    [52,60,50,52,52], "Connecticut Whig congressman");
  I("Edward Bates",          "Whig (USA)","e0",["justice","leader"],                          [58,65,55,58,55], "Missouri Whig, Lincoln's Attorney General");
  I("Salmon P. Chase",       "Whig (USA)","e0",["justice","chancellor","pm"],                 [65,70,60,65,60], "Whig→Republican, Treasury Sec, Chief Justice");
  I("David Wilmot",          "Whig (USA)","e0",["leader"],                                    [60,62,60,55,55], "Wilmot Proviso author, anti-slavery Whig");
  I("Tom Corwin",            "Whig (USA)","e0",["chancellor","leader"],                       [60,65,62,60,58], "Ohio Whig senator");
  I("Nathan Clifford",       "Whig (USA)","e0",["justice"],                                   [52,62,48,52,50], "Maine Whig, later Democratic justice");
  I("Fillmore's VP",         "Whig (USA)","e0",["pm"],                                        [48,55,45,48,48], "Placeholder Whig functionary");
  I("Wilson Shannon",        "Whig (USA)","e0",["home","pm"],                                 [50,60,48,50,50], "Kansas territorial governor");

  /* ── Progressive Party (USA) ────────────────────────────────── */
  I("Theodore Roosevelt",    "Progressive (USA)","e2",["pm","defence","environment"],         [80,80,80,78,72], "Bull Moose; youngest president, Trust-buster");
  I("Hiram Johnson",         "Progressive (USA)","e2",["pm","leader","foreign"],              [65,72,68,62,65], "TR's running mate 1912; California Progressive");
  I("Robert La Follette Sr.","Progressive (USA)","e2",["pm","leader","chancellor"],           [70,75,72,68,68], "Wisconsin Progressive, 1924 third-party candidate");
  I("Robert La Follette Jr.","Progressive (USA)","e3",["leader","work","chancellor"],         [62,68,65,60,62], "Son continued Wisconsin Progressive tradition");
  I("George W. Norris",      "Progressive (USA)","e2",["leader","chancellor","environment"],  [65,72,65,65,60], "Nebraska Republican-Progressive, TVA champion");
  I("Fiorello La Guardia",   "Progressive (USA)","e3",["pm","work","leader"],                 [70,72,72,65,68], "New York mayor, fusion progressive");
  I("Harold Ickes",          "Progressive (USA)","e3",["home","environment"],                 [62,72,60,65,60], "FDR's progressive Interior Secretary");
  I("Henry Wallace",         "Progressive (USA)","e3",["pm","agriculture","foreign"],         [62,70,65,62,60], "FDR's VP, 1948 Progressive Party candidate");
  I("Burton K. Wheeler",     "Progressive (USA)","e2",["justice","leader"],                   [60,68,62,60,58], "Montana Progressive senator");
  I("Gifford Pinchot",       "Progressive (USA)","e2",["environment","pm"],                   [62,68,60,62,58], "TR's conservation chief");
  I("Charles Evans Hughes",  "Progressive (USA)","e2",["justice","pm","foreign"],             [65,75,62,68,60], "Progressive governor→Chief Justice→near-miss 1916");
  I("Amos Pinchot",          "Progressive (USA)","e2",["leader","environment"],               [58,62,55,55,55], "Co-founder of Progressive Party");
  I("Jane Addams",           "Progressive (USA)","e2",["work","education","health"],          [70,65,68,62,60], "Hull House founder, Nobel Peace laureate");
  I("Upton Sinclair",        "Progressive (USA)","e2",["leader","work","health"],             [65,62,68,58,55], "Muckraker novelist; EPIC California governor campaign");
  I("Albert Beveridge",      "Progressive (USA)","e2",["foreign","leader"],                   [60,65,62,58,58], "Progressive senator, imperialist");
  I("Charles McNary",        "Progressive (USA)","e3",["agriculture","leader"],               [60,68,58,60,60], "Oregon Republican-Progressive, farm bloc leader");
  I("Gerald Nye",            "Progressive (USA)","e3",["foreign","leader"],                   [58,65,60,58,55], "North Dakota Progressive, isolationist");
  I("Bronson Cutting",       "Progressive (USA)","e3",["foreign","chancellor"],               [58,62,58,55,55], "New Mexico Progressive senator");
  I("George Peek",           "Progressive (USA)","e3",["agriculture","trade"],                [55,62,52,55,52], "Progressive farm policy expert");
  I("Thurman Arnold",        "Progressive (USA)","e3",["justice","business"],                 [60,65,60,62,55], "New Deal antitrust enforcer");
  I("Wendell Willkie",       "Progressive (USA)","e3",["pm","business","foreign"],            [65,68,65,62,58], "Liberal Republican, 1940 anti-FDR dark horse");
  I("Henry Morgenthau Jr.",  "Progressive (USA)","e3",["chancellor"],                         [60,70,55,65,58], "FDR's Treasury Secretary");
  I("William O. Douglas",    "Progressive (USA)","e3",["justice"],                            [65,72,62,65,58], "Most liberal Supreme Court justice");
  I("Paul Douglas",          "Progressive (USA)","e4",["chancellor","work"],                  [62,68,60,62,58], "Illinois Progressive senator");
  I("Hubert Humphrey",       "Progressive (USA)","e4",["pm","work","foreign"],                [68,72,70,65,65], "Minnesota Democrat-Farmer-Labor; civil rights champion");
  I("Norman Thomas",         "Progressive (USA)","e2",["pm","leader","work"],                 [65,68,68,62,62], "Socialist Party six-time presidential candidate");
  I("Morris Hillquit",       "Progressive (USA)","e2",["work","leader"],                      [60,62,62,58,58], "American Socialist Party leader");
  I("Eugene V. Debs",        "Progressive (USA)","e1",["work","leader","pm"],                 [72,68,75,65,68], "Socialist icon; ran for president from prison");

  /* ── Democratic-Republican ───────────────────────────────────── */
  I("Thomas Jefferson",      "Democratic-Republican","e0",["pm","foreign","leader"],          [80,82,75,82,72], "Declaration of Independence; third President");
  I("James Madison",         "Democratic-Republican","e0",["pm","foreign","leader"],          [72,80,65,78,70], "Constitution father; fourth President");
  I("James Monroe",          "Democratic-Republican","e0",["pm","foreign"],                   [65,78,58,70,65], "Monroe Doctrine; fifth President");
  I("John C. Calhoun",       "Democratic-Republican","e0",["pm","chancellor","foreign"],      [65,72,68,65,60], "Vice President; nullification theorist");
  I("William Crawford",      "Democratic-Republican","e0",["chancellor","pm"],                [58,68,52,60,55], "Treasury Secretary, 1824 presidential candidate");
  I("Nathaniel Macon",       "Democratic-Republican","e0",["leader"],                         [55,65,52,55,55], "Old Republican House speaker");
  I("Albert Gallatin",       "Democratic-Republican","e0",["chancellor","foreign"],           [65,72,58,68,60], "Swiss-born Treasury Secretary; peace negotiator");
  I("Henry Dearborn",        "Democratic-Republican","e0",["defence"],                        [52,62,45,52,50], "War of 1812 general, War Secretary");
  I("Robert Smith",          "Democratic-Republican","e0",["foreign","defence"],              [52,62,48,52,50], "Madison's first Secretary of State");
  I("DeWitt Clinton",        "Democratic-Republican","e0",["pm","trade"],                     [62,68,55,62,60], "New York mayor; built Erie Canal");

})();

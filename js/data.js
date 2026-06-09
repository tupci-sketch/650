/* =============================================================================
   650 — DATA  (v2)
   -----------------------------------------------------------------------------
     • ERAS        — era bands (e0 is wildcard-only: pre-1832 world figures)
     • PARTIES     — party labels, colours, lineages, single-party seat caps
     • REGIONS     — the 12 UK regions used by the constituency-level election
     • LEANS       — how strongly a single party performs region-by-region
     • PORTFOLIOS  — the 12 cabinet seats and which stats matter for each
     • POLITICIANS — the roster (scope:"uk" plays in all modes; "wild" only in
                     Wildcard mode). UK figures appear in every mode.
     • CONFIG      — tunable knobs, incl. easy/normal/hard difficulty presets

   RATINGS ARE AN EDITORIAL ABSTRACTION applied by the same logic to every
   party and anchored to the public record where possible. They are meant to be
   argued about — so argue, by editing this one file. A satirical game; not a
   judgement of any individual and not affiliated with anyone.

   Each politician: P(name, party, eraId, [seats they fit],
                      [appeal, experience, oratory, statecraft, partyMgmt],
                      "one-line note", scope)
   ========================================================================== */

window.G = window.G || {};

/* ------------------------------------------------------------------ ERAS -- */
G.ERAS = [
  { id: "e0", label: "Age of Revolutions",        years: "pre-1832",     wildOnly: true },
  { id: "e1", label: "The Reform Era",            years: "1832–1885" },
  { id: "e2", label: "Late Victorian / Edwardian", years: "1885–1914" },
  { id: "e3", label: "Wars & Interwar",           years: "1914–1945" },
  { id: "e4", label: "Postwar Consensus",         years: "1945–1979" },
  { id: "e5", label: "Thatcher to Major",         years: "1979–1997" },
  { id: "e6", label: "New Labour Years",          years: "1997–2010" },
  { id: "e7", label: "Coalition & After",         years: "2010–present" }
];
G.ERA_BY_ID = Object.fromEntries(G.ERAS.map(function (e) { return [e.id, e]; }));

/* --------------------------------------------------------------- PARTIES -- */
/* `cap` is a fallback; the constituency model derives the real ceiling from
   which regions a party can win (see LEANS). */
G.PARTIES = {
  /* --- UK --- */
  "Conservative":      { label: "Conservative",      lineage: "Conservative", colour: "#0a57a4", cap: 632 },
  "Labour":            { label: "Labour",            lineage: "Labour",       colour: "#d4202a", cap: 632 },
  "Whig":              { label: "Whig",              lineage: "Liberal",      colour: "#b08d2f", cap: 632 },
  "Liberal":           { label: "Liberal",           lineage: "Liberal",      colour: "#d4860b", cap: 632 },
  "Liberal Democrat":  { label: "Liberal Democrat",  lineage: "Liberal",      colour: "#faa61a", cap: 632 },
  "SNP":               { label: "SNP",               lineage: "SNP",          colour: "#d6a400", cap: 57  },
  "Plaid Cymru":       { label: "Plaid Cymru",       lineage: "Plaid",        colour: "#13854a", cap: 32  },
  "Reform UK":         { label: "Reform UK",         lineage: "Reform",       colour: "#12b6cf", cap: 632 },
  "Brexit Party":      { label: "Brexit Party",      lineage: "Reform",       colour: "#12a39a", cap: 632 },
  "UKIP":              { label: "UKIP",              lineage: "Reform",       colour: "#70147a", cap: 632 },
  "Green":             { label: "Green",             lineage: "Green",        colour: "#2a8c3c", cap: 632 },
  "Your Party":        { label: "Your Party",        lineage: "YourParty",    colour: "#c1272d", cap: 632 },
  "Restore Britain":   { label: "Restore Britain",   lineage: "Restore",      colour: "#1d3557", cap: 632 },
  "Independent":       { label: "Independent",       lineage: "Independent",  colour: "#6b6b6b", cap: 632 },
  /* --- Wildcard groups --- */
  "US Republican":     { label: "US Republican",     lineage: "USRep",        colour: "#cf2a27", cap: 650 },
  "US Democrat":       { label: "US Democrat",       lineage: "USDem",        colour: "#1f6feb", cap: 650 },
  "Dictators":         { label: "Dictators & Despots", lineage: "Dictators",  colour: "#3a3a3a", cap: 650 },
  "World Leaders":     { label: "World Statesmen",   lineage: "World",        colour: "#7b5cd6", cap: 650 },
  "Revolutionaries":   { label: "Revolutionaries",   lineage: "Revolution",   colour: "#b3541e", cap: 650 }
};
G.lineageOf = function (partyLabel) {
  var p = G.PARTIES[partyLabel];
  return p ? p.lineage : partyLabel;
};

/* --------------------------------------------------------------- REGIONS -- */
/* Seat counts approximate the 2024 boundaries and sum to 650. */
G.REGIONS = [
  { id: "SCO", name: "Scotland",                seats: 57 },
  { id: "WAL", name: "Wales",                   seats: 32 },
  { id: "NI",  name: "Northern Ireland",        seats: 18 },
  { id: "NE",  name: "North East England",      seats: 27 },
  { id: "NW",  name: "North West England",      seats: 73 },
  { id: "YH",  name: "Yorkshire & the Humber",  seats: 54 },
  { id: "EM",  name: "East Midlands",           seats: 47 },
  { id: "WM",  name: "West Midlands",           seats: 57 },
  { id: "EE",  name: "East of England",         seats: 61 },
  { id: "LDN", name: "London",                  seats: 75 },
  { id: "SE",  name: "South East England",      seats: 91 },
  { id: "SW",  name: "South West England",      seats: 58 }
];

/* Per-lineage regional strength (logit shift). A region left OUT means that
   single party cannot win there at all. Used only in single-party Dynasty
   mode; Unity and Wildcard tickets contest everywhere with mild local noise. */
G.LEANS = {
  Labour:      { SCO:  0.2, WAL:  1.2, NE:  1.6, NW:  1.0, YH:  0.8, EM:  0.0, WM:  0.4, EE: -0.8, LDN:  1.1, SE: -1.2, SW: -0.9 },
  Conservative:{ SCO: -0.8, WAL: -0.6, NE: -1.0, NW: -0.5, YH: -0.2, EM:  0.6, WM:  0.2, EE:  1.2, LDN: -0.4, SE:  1.4, SW:  0.8 },
  Liberal:     { SCO: -0.3, WAL: -0.4, NE: -0.8, NW: -0.5, YH: -0.5, EM: -0.4, WM: -0.5, EE: -0.2, LDN:  0.1, SE:  0.3, SW:  0.6 },
  Reform:      { SCO: -0.6, WAL:  0.2, NE:  0.8, NW:  0.3, YH:  0.5, EM:  0.7, WM:  0.6, EE:  0.7, LDN: -0.7, SE:  0.2, SW:  0.3 },
  Green:       { SCO: -0.2, WAL: -0.2, NE: -0.3, NW: -0.2, YH: -0.1, EM: -0.3, WM: -0.3, EE: -0.2, LDN:  0.3, SE:  0.2, SW:  0.5 },
  SNP:         { SCO:  2.6 },
  Plaid:       { WAL:  2.4 },
  YourParty:   { NW:  0.2, YH:  0.1, WM:  0.2, LDN:  0.6, SE: -0.2 },
  Restore:     { NE:  0.4, EM:  0.5, WM:  0.4, EE:  0.6, SE:  0.2, WAL: 0.1, YH: 0.4 }
};

/* ------------------------------------------------------------ PORTFOLIOS -- */
G.PORTFOLIOS_BASE = [
  { key: "pm",         name: "Prime Minister",               w: { appeal: .30, oratory: .25, statecraft: .30, experience: .15, partyMgmt: 0 } },
  { key: "chancellor", name: "Chancellor of the Exchequer",  w: { appeal: .15, oratory: .20, statecraft: .35, experience: .30, partyMgmt: 0 } },
  { key: "foreign",    name: "Foreign Secretary",            w: { appeal: .15, oratory: .20, statecraft: .40, experience: .25, partyMgmt: 0 } },
  { key: "home",       name: "Home Secretary",               w: { appeal: .15, oratory: 0,   statecraft: .35, experience: .30, partyMgmt: .20 } },
  { key: "deputy",     name: "Deputy Prime Minister",        w: { appeal: .25, oratory: .20, statecraft: 0,   experience: .20, partyMgmt: .35 } },
  { key: "defence",    name: "Defence Secretary",            w: { appeal: 0,   oratory: 0,   statecraft: .40, experience: .35, partyMgmt: .25 } },
  { key: "health",     name: "Health Secretary",             w: { appeal: .20, oratory: .15, statecraft: .35, experience: .30, partyMgmt: 0 } },
  { key: "education",  name: "Education Secretary",          w: { appeal: .15, oratory: .20, statecraft: .35, experience: .30, partyMgmt: 0 } },
  { key: "justice",    name: "Justice Secretary",            w: { appeal: 0,   oratory: .25, statecraft: .40, experience: .35, partyMgmt: 0 } },
  { key: "business",   name: "Business & Trade Secretary",   w: { appeal: .20, oratory: .15, statecraft: .35, experience: .30, partyMgmt: 0 } },
  { key: "whip",       name: "Chief Whip",                   w: { appeal: 0,   oratory: 0,   statecraft: .15, experience: .25, partyMgmt: .60 } },
  { key: "leader",     name: "Leader of the House",          w: { appeal: 0,   oratory: .40, statecraft: 0,   experience: .30, partyMgmt: .30 } }
];
/* optional extra seats for an Expanded cabinet */
G.PORTFOLIOS_EXTRA = [
  { key: "work",        name: "Work & Pensions Secretary",   w: { appeal: .15, oratory: .10, statecraft: .40, experience: .35, partyMgmt: 0 } },
  { key: "transport",   name: "Transport Secretary",         w: { appeal: .10, oratory: .10, statecraft: .40, experience: .40, partyMgmt: 0 } },
  { key: "environment", name: "Environment Secretary",       w: { appeal: .20, oratory: .15, statecraft: .35, experience: .30, partyMgmt: 0 } },
  { key: "culture",     name: "Culture Secretary",           w: { appeal: .30, oratory: .25, statecraft: .20, experience: .25, partyMgmt: 0 } }
];
G.PORTFOLIOS = G.PORTFOLIOS_BASE.slice();
G.PORTFOLIO_BY_KEY = Object.fromEntries(
  G.PORTFOLIOS_BASE.concat(G.PORTFOLIOS_EXTRA).map(function (p) { return [p.key, p]; })
);
G.setCabinetSize = function (size) {
  G.PORTFOLIOS = (size === "expanded")
    ? G.PORTFOLIOS_BASE.concat(G.PORTFOLIOS_EXTRA)
    : G.PORTFOLIOS_BASE.slice();
  return G.PORTFOLIOS;
};

/* ----------------------------------------------------------- POLITICIANS -- */
function P(name, party, era, fits, s, note, scope) {
  return {
    name: name, party: party, era: era, fits: fits,
    stats: { appeal: s[0], experience: s[1], oratory: s[2], statecraft: s[3], partyMgmt: s[4] },
    note: note || "", scope: scope || "uk"
  };
}

G.POLITICIANS = [
  /* ============================ e1 : The Reform Era (1832–1885) ========== */
  P("Robert Peel",        "Conservative", "e1", ["pm","home"],              [70,88,78,90,72], "Founded the modern police and the Conservative Party; repealed the Corn Laws."),
  P("William Gladstone",  "Liberal",      "e1", ["pm","chancellor"],        [82,95,90,88,78], "Four-time PM; began as a Tory before defining Liberalism."),
  P("Benjamin Disraeli",  "Conservative", "e1", ["pm","chancellor"],        [80,82,92,80,85], "Novelist and showman; built One-Nation Conservatism."),
  P("Lord Palmerston",    "Liberal",      "e1", ["pm","foreign"],           [78,90,80,82,76], "Gunboat-diplomacy Foreign Secretary and PM."),
  P("Lord John Russell",  "Whig",         "e1", ["pm","foreign"],           [60,80,70,70,60], "Architect of the 1832 Reform Act."),
  P("Earl of Derby",      "Conservative", "e1", ["pm","foreign"],           [58,78,74,70,72], "Three-time PM; longest-serving Conservative leader."),
  P("Lord Aberdeen",      "Conservative", "e1", ["pm","foreign"],           [50,72,55,62,55], "Led the coalition that stumbled into the Crimean War."),
  P("Richard Cobden",     "Liberal",      "e1", ["business","foreign"],     [64,55,80,65,50], "Anti-Corn Law League; apostle of free trade."),

  /* ===================== e2 : Late Victorian / Edwardian (1885–1914) ===== */
  P("Lord Salisbury",     "Conservative", "e2", ["pm","foreign"],           [66,90,76,86,80], "Three-time PM and dominant Foreign Secretary."),
  P("H.H. Asquith",       "Liberal",      "e2", ["pm","chancellor","home"], [64,86,82,80,70], "Reforming PM; took Britain into WWI."),
  P("Arthur Balfour",     "Conservative", "e2", ["pm","foreign"],           [55,82,78,74,60], "PM, then Foreign Secretary of the Balfour Declaration."),
  P("Henry Campbell-Bannerman","Liberal", "e2", ["pm"],                     [62,70,66,68,70], "Led the Liberals to the 1906 landslide."),
  P("Edward Grey",        "Liberal",      "e2", ["foreign"],                [50,74,64,72,58], "Longest continuous Foreign Secretary; 'the lamps are going out'."),
  P("Keir Hardie",        "Labour",       "e2", ["leader","deputy"],        [66,58,84,60,64], "Founder and first leader of the Labour Party."),
  P("Joseph Chamberlain", "Conservative", "e2", ["business","foreign"],     [74,78,86,76,58], "Radical turned Liberal Unionist; tariff-reform crusader."),

  /* =========================== e3 : Wars & Interwar (1914–1945) ========== */
  P("David Lloyd George", "Liberal",      "e3", ["pm","chancellor"],        [84,88,92,86,64], "People's Budget Chancellor and WWI Prime Minister."),
  P("Winston Churchill",  "Conservative", "e3", ["pm","chancellor","home","defence"], [88,95,97,88,70], "Crossed the floor twice; held every great office; wartime leader."),
  P("Stanley Baldwin",    "Conservative", "e3", ["pm","chancellor"],        [70,86,72,78,84], "Three-time PM and master party manager."),
  P("Neville Chamberlain","Conservative", "e3", ["pm","chancellor","health"], [58,84,66,72,76], "Major social reformer at Health; appeasement at the end."),
  P("Ramsay MacDonald",   "Labour",       "e3", ["pm","foreign"],           [60,78,78,66,50], "First Labour PM; split the party over the National Government."),
  P("Andrew Bonar Law",   "Conservative", "e3", ["pm","chancellor"],        [52,74,64,66,66], "The 'unknown Prime Minister'."),
  P("Nancy Astor",        "Conservative", "e3", ["whip"],                   [56,50,60,48,52], "First woman to take her seat in the Commons."),

  /* ========================= e4 : Postwar Consensus (1945–1979) ========== */
  P("Clement Attlee",     "Labour",       "e4", ["pm"],                     [70,90,58,92,88], "Built the NHS and the welfare state."),
  P("Aneurin Bevan",      "Labour",       "e4", ["health"],                 [74,70,92,78,56], "Founded the National Health Service."),
  P("Ernest Bevin",       "Labour",       "e4", ["foreign"],                [64,80,66,84,78], "Postwar Foreign Secretary; helped create NATO."),
  P("Harold Macmillan",   "Conservative", "e4", ["pm","chancellor","foreign"], [76,86,80,82,80], "'You've never had it so good.'"),
  P("Anthony Eden",       "Conservative", "e4", ["pm","foreign"],           [66,84,74,64,58], "Long-serving Foreign Secretary; undone by Suez."),
  P("Harold Wilson",      "Labour",       "e4", ["pm","business"],          [80,86,82,80,78], "Won four general elections."),
  P("Edward Heath",       "Conservative", "e4", ["pm"],                     [56,80,60,66,58], "Took Britain into the EEC."),
  P("Rab Butler",         "Conservative", "e4", ["chancellor","home","foreign","education"], [58,88,72,84,70], "1944 Education Act; 'the best PM we never had'."),
  P("Hugh Gaitskell",     "Labour",       "e4", ["chancellor","leader"],    [60,70,76,74,62], "Chancellor and Labour leader."),
  P("Roy Jenkins",        "Labour",       "e4", ["home","chancellor"],      [64,82,80,82,56], "Liberalising Home Secretary; later an SDP founder."),
  P("Denis Healey",       "Labour",       "e4", ["chancellor","defence"],   [70,84,82,80,66], "Chancellor through the IMF crisis; long-serving heavyweight."),
  P("Iain Macleod",       "Conservative", "e4", ["chancellor"],             [64,70,84,76,60], "Brilliant orator; Chancellor for barely a month."),
  P("Barbara Castle",     "Labour",       "e4", ["health","business","education"], [66,78,80,78,60], "One of the great reforming cabinet ministers."),
  P("Alec Douglas-Home",  "Conservative", "e4", ["pm","foreign"],           [50,78,56,66,62], "Renounced a peerage to become PM."),
  P("James Callaghan",    "Labour",       "e4", ["pm","chancellor","home","foreign"], [66,90,70,76,74], "The only person to hold all four great offices of state."),
  P("Jo Grimond",         "Liberal",      "e4", ["leader"],                 [64,64,78,64,66], "Revived the Liberal Party in the postwar years."),
  P("Michael Foot",       "Labour",       "e4", ["leader","foreign"],       [56,74,86,58,52], "Writer and orator; later Labour leader."),
  P("Tony Benn",          "Labour",       "e4", ["business","leader"],      [68,78,88,62,50], "Cabinet minister and the era's great radical voice."),
  P("Enoch Powell",       "Conservative", "e4", ["health","business"],      [58,72,84,66,40], "Health Minister; remembered for a notorious 1968 immigration speech."),
  P("Shirley Williams",   "Labour",       "e4", ["education"],              [66,72,76,72,58], "Education Secretary; a founder of the SDP."),
  P("David Owen",         "Labour",       "e4", ["foreign"],                [60,72,74,72,54], "One of the youngest Foreign Secretaries; SDP founder."),

  /* ========================= e5 : Thatcher to Major (1979–1997) ========= */
  P("Margaret Thatcher",  "Conservative", "e5", ["pm"],                     [84,90,82,90,80], "Won three elections; reshaped the postwar settlement."),
  P("John Major",         "Conservative", "e5", ["pm","chancellor","foreign"], [62,82,62,70,60], "Surprise 1992 winner; Maastricht and 'Black Wednesday'."),
  P("Nigel Lawson",       "Conservative", "e5", ["chancellor"],             [58,76,78,80,58], "Tax-cutting reformer at the Treasury."),
  P("Geoffrey Howe",      "Conservative", "e5", ["chancellor","foreign","deputy"], [50,84,60,80,62], "His resignation speech helped topple Thatcher."),
  P("Michael Heseltine",  "Conservative", "e5", ["deputy","defence","business"], [74,82,86,76,58], "'Tarzan'; Deputy PM and conference showman."),
  P("Kenneth Clarke",     "Conservative", "e5", ["chancellor","home","health","education","justice"], [72,92,84,82,64], "Held an extraordinary range of great offices."),
  P("Douglas Hurd",       "Conservative", "e5", ["foreign","home"],         [56,80,72,78,62], "Foreign and Home Secretary; diplomat's diplomat."),
  P("Norman Tebbit",      "Conservative", "e5", ["business","whip"],        [58,72,74,66,70], "Combative party chairman and minister."),
  P("Norman Lamont",      "Conservative", "e5", ["chancellor"],             [48,68,62,62,54], "Chancellor during Black Wednesday."),
  P("Michael Portillo",   "Conservative", "e5", ["defence","business"],     [60,70,74,68,58], "Defence Secretary; Thatcherite standard-bearer."),
  P("Neil Kinnock",       "Labour",       "e5", ["leader","deputy"],        [62,70,82,64,66], "Modernised Labour; lost twice from the front."),
  P("John Smith",         "Labour",       "e5", ["chancellor","leader"],    [64,72,74,76,70], "Labour leader who laid the ground for 1997."),
  P("Roy Hattersley",     "Labour",       "e5", ["deputy","chancellor"],    [56,72,76,68,64], "Long-serving deputy leader of Labour."),
  P("David Steel",        "Liberal",      "e5", ["leader"],                 [60,66,72,64,64], "Liberal leader; architect of the SDP–Liberal Alliance."),

  /* ========================= e6 : New Labour Years (1997–2010) ========== */
  P("Tony Blair",         "Labour",       "e6", ["pm"],                     [86,86,92,84,80], "Won three elections; Labour's most electorally successful leader."),
  P("Gordon Brown",       "Labour",       "e6", ["pm","chancellor"],        [60,88,72,82,60], "Long-serving Chancellor, then PM in the financial crisis."),
  P("Robin Cook",         "Labour",       "e6", ["foreign"],                [64,76,88,78,56], "Foreign Secretary and the Commons' finest debater."),
  P("Jack Straw",         "Labour",       "e6", ["home","foreign","justice"], [56,84,70,76,66], "Held Home, Foreign and Justice."),
  P("David Blunkett",     "Labour",       "e6", ["home","education"],       [60,76,72,68,58], "Reforming Education then Home Secretary."),
  P("John Prescott",      "Labour",       "e6", ["deputy"],                 [60,76,58,64,76], "Long-serving Deputy Prime Minister; party's working-class anchor."),
  P("Alistair Darling",   "Labour",       "e6", ["chancellor"],            [58,78,64,78,64], "Steady hand as Chancellor through the 2008 crash."),
  P("Mo Mowlam",          "Labour",       "e6", ["whip"],                   [72,64,74,70,60], "Drove the Good Friday Agreement."),
  P("Andy Burnham",       "Labour",       "e6", ["health","business"],      [64,72,72,68,62], "Health Secretary; later Mayor of Greater Manchester."),
  P("William Hague",      "Conservative", "e6", ["foreign","leader"],       [60,74,84,70,64], "Conservative leader, later a notable Foreign Secretary."),
  P("Michael Howard",     "Conservative", "e6", ["home","leader"],          [52,76,66,68,60], "Home Secretary and Conservative leader."),
  P("Iain Duncan Smith",  "Conservative", "e6", ["leader","business"],      [44,66,56,58,50], "Conservative leader; later welfare-reform minister."),
  P("Charles Kennedy",    "Liberal Democrat","e6", ["leader"],              [70,64,80,64,66], "Led the Lib Dems to their best modern result."),
  P("Paddy Ashdown",      "Liberal Democrat","e6", ["leader","defence"],    [68,70,76,72,70], "Founding Lib Dem leader; former Royal Marine."),
  P("Dafydd Wigley",      "Plaid Cymru",  "e6", ["leader"],                 [60,66,72,64,64], "Long-serving and popular Plaid Cymru leader."),

  /* ========================= e7 : Coalition & After (2010–present) ====== */
  /* Conservative */
  P("David Cameron",      "Conservative", "e7", ["pm","foreign"],           [70,80,80,72,66], "PM 2010–16; returned as Foreign Secretary in 2023."),
  P("George Osborne",     "Conservative", "e7", ["chancellor"],             [58,72,70,74,66], "Austerity-era Chancellor and Cameron's chief strategist; later a newspaper editor."),
  P("Theresa May",        "Conservative", "e7", ["pm","home"],              [54,80,56,64,52], "Long-serving Home Secretary; PM through the Brexit deadlock."),
  P("Boris Johnson",      "Conservative", "e7", ["pm","foreign"],           [78,70,84,56,48], "Won an 80-seat majority in 2019."),
  P("Philip Hammond",     "Conservative", "e7", ["chancellor","foreign","defence"], [48,76,56,72,58], "Treasury, Foreign and Defence; 'Spreadsheet Phil'."),
  P("Sajid Javid",        "Conservative", "e7", ["chancellor","home","health","business"], [56,72,64,66,56], "Held Home, Health, Business and the Treasury."),
  P("Jeremy Hunt",        "Conservative", "e7", ["health","foreign","chancellor"], [52,78,62,70,60], "Longest-serving Health Secretary, then Chancellor."),
  P("Rishi Sunak",        "Conservative", "e7", ["pm","chancellor"],        [56,64,62,64,54], "Chancellor in the pandemic, then Prime Minister."),
  P("Liz Truss",          "Conservative", "e7", ["pm","foreign","business"], [46,60,50,40,42], "The shortest tenure of any PM — a very short governing record."),
  P("Kemi Badenoch",      "Conservative", "e7", ["business","leader","education"], [56,62,66,60,54], "Business Secretary; Conservative leader from 2024."),
  P("Michael Gove",       "Conservative", "e7", ["education","justice","business"], [54,80,76,72,56], "Held Education, Justice and Levelling Up; a relentless reformer."),
  P("Suella Braverman",   "Conservative", "e7", ["home","justice"],         [48,58,58,48,44], "Twice Home Secretary; on the party's right."),
  P("James Cleverly",     "Conservative", "e7", ["foreign","home"],         [54,68,64,62,60], "Foreign then Home Secretary."),
  P("Priti Patel",        "Conservative", "e7", ["home"],                   [50,66,56,54,52], "Home Secretary; architect of the Rwanda plan."),
  P("Dominic Raab",       "Conservative", "e7", ["foreign","justice","deputy"], [46,66,56,58,50], "Foreign Secretary, Justice Secretary and Deputy PM."),
  P("Penny Mordaunt",     "Conservative", "e7", ["defence","leader"],       [58,66,72,60,58], "Defence Secretary and Leader of the House."),
  P("Jacob Rees-Mogg",    "Conservative", "e7", ["leader","business"],      [52,60,74,52,50], "Leader of the House; arch-Brexiteer."),
  P("Grant Shapps",       "Conservative", "e7", ["defence","business"],     [50,68,58,60,56], "Held five cabinet posts in a single year."),
  /* Labour (incl. current government) */
  P("Keir Starmer",       "Labour",       "e7", ["pm","justice"],           [56,62,58,66,62], "Former Director of Public Prosecutions; PM from 2024."),
  P("Rachel Reeves",      "Labour",       "e7", ["chancellor"],             [52,60,58,64,58], "The first woman to serve as Chancellor."),
  P("Yvette Cooper",      "Labour",       "e7", ["foreign","home"],         [56,78,64,70,62], "Home then Foreign Secretary; vastly experienced."),
  P("Shabana Mahmood",    "Labour",       "e7", ["home","justice"],         [54,64,62,66,60], "Justice Secretary, then Home Secretary."),
  P("David Lammy",        "Labour",       "e7", ["foreign","justice","deputy"], [62,68,76,62,58], "Foreign Secretary, then Deputy PM and Justice Secretary."),
  P("Angela Rayner",      "Labour",       "e7", ["deputy"],                 [66,58,72,56,64], "Deputy PM and deputy Labour leader until 2025."),
  P("Wes Streeting",      "Labour",       "e7", ["health","leader"],        [60,58,74,62,58], "Health Secretary driving NHS reform; a leading figure on Labour's right."),
  P("Bridget Phillipson", "Labour",       "e7", ["education"],              [54,56,62,60,56], "Education Secretary in Starmer's government; a schools-and-childcare reformer from the North East."),
  P("John Healey",        "Labour",       "e7", ["defence"],                [50,70,58,64,58], "Defence Secretary; long-serving frontbencher."),
  P("Pat McFadden",       "Labour",       "e7", ["business","whip"],        [48,72,58,68,66], "Cabinet Office fixer; ran a welfare 'super-ministry'."),
  P("Ed Miliband",        "Labour",       "e7", ["leader","business"],      [54,66,66,62,56], "Labour leader 2010–15; Energy Secretary."),
  P("Clive Lewis",        "Labour",       "e7", ["defence","business","leader"], [56,52,70,56,48], "Outspoken backbencher; former shadow defence and business spokesman."),
  P("Derek Twigg",        "Labour",       "e7", ["whip","defence"],         [40,62,48,52,60], "Long-serving MP and former junior defence minister."),
  /* Liberal Democrat */
  P("Ed Davey",           "Liberal Democrat","e7", ["leader","deputy","business"], [58,70,62,64,58], "Lib Dem leader; coalition Energy Secretary."),
  P("Vince Cable",        "Liberal Democrat","e7", ["business","chancellor","leader"], [56,68,66,68,56], "Coalition Business Secretary and later Lib Dem leader."),
  P("Nick Clegg",         "Liberal Democrat","e7", ["deputy"],              [60,64,74,64,56], "Deputy PM in the 2010 coalition."),
  /* SNP */
  P("Nicola Sturgeon",    "SNP",          "e7", ["pm","leader"],            [72,76,82,76,74], "Long-serving First Minister and SNP leader."),
  P("Alex Salmond",       "SNP",          "e7", ["pm","leader"],            [70,76,84,74,64], "First Minister; brought the SNP to power."),
  P("John Swinney",       "SNP",          "e7", ["pm","chancellor","leader"], [56,74,62,68,66], "First Minister; long-time SNP deputy and finance chief."),
  P("Humza Yousaf",       "SNP",          "e7", ["pm","health","leader"],   [54,62,64,56,52], "Briefly First Minister; held Health and Justice."),
  P("Stephen Flynn",      "SNP",          "e7", ["leader"],                 [58,52,72,56,58], "The SNP's pugnacious Westminster leader; an Aberdeen MP of the party's younger generation."),
  P("Kate Forbes",        "SNP",          "e7", ["chancellor","deputy"],    [56,58,64,66,56], "Deputy First Minister; former finance secretary."),
  /* Plaid Cymru */
  P("Adam Price",         "Plaid Cymru",  "e7", ["leader"],                 [58,58,76,60,56], "Former Plaid Cymru leader and noted orator."),
  P("Leanne Wood",        "Plaid Cymru",  "e7", ["leader"],                 [58,54,68,56,54], "Former Plaid Cymru leader; a left-wing Welsh republican who broke the party's mould."),
  P("Rhun ap Iorwerth",   "Plaid Cymru",  "e7", ["leader"],                 [54,56,64,58,58], "Leader of Plaid Cymru and a former BBC journalist; Member of the Senedd for Ynys Môn."),
  /* Reform UK */
  P("Nigel Farage",       "Reform UK",    "e7", ["leader","foreign","business"], [76,58,86,46,52], "Insurgent campaigner; UKIP, the Brexit Party and Reform UK."),
  P("Richard Tice",       "Reform UK",    "e7", ["business","deputy","leader"], [54,50,64,50,56], "Property entrepreneur and Reform UK deputy leader; a long-time Brexit campaigner turned MP."),
  P("Zia Yusuf",          "Reform UK",    "e7", ["business","home","whip"],  [52,46,60,58,54], "Businessman; Reform UK chairman and policy chief."),
  P("Lee Anderson",       "Reform UK",    "e7", ["whip","leader"],           [56,44,62,42,50], "Reform UK chief whip and chairman; MP for Ashfield."),
  P("Ben Habib",          "Reform UK",    "e7", ["business"],                [46,46,58,52,44], "Businessman; former Reform UK deputy leader."),
  P("Paul Nuttall",       "Reform UK",    "e7", ["leader","deputy"],         [44,48,58,46,48], "Former UKIP leader who tried to push the party into Labour's northern heartlands."),
  /* Green */
  P("Caroline Lucas",     "Green",        "e7", ["leader","education"],      [64,64,76,64,62], "The Green Party's first MP, who held Brighton Pavilion for fourteen years as its sole Commons voice."),
  P("Carla Denyer",       "Green",        "e7", ["leader","business"],       [56,50,68,56,56], "Green Party co-leader and MP for Bristol Central; an engineer who unseated a shadow cabinet minister."),
  P("Adrian Ramsay",      "Green",        "e7", ["leader"],                  [50,50,62,54,56], "Green Party co-leader and MP for Waveney Valley; a former deputy leader of the party."),
  P("Zack Polanski",      "Green",        "e7", ["leader"],                  [58,48,72,54,54], "Green Party leader from 2025; 'eco-populist'."),
  P("Natalie Bennett",    "Green",        "e7", ["leader"],                  [48,52,58,52,54], "Australian-born former Green Party leader, now a peer; fronted the party's 2015 surge."),
  /* Your Party */
  P("Jeremy Corbyn",      "Your Party",   "e7", ["leader","foreign"],        [62,76,68,54,40], "Former Labour leader; co-founded the left-wing Your Party in 2025."),
  P("Zarah Sultana",      "Your Party",   "e7", ["leader"],                  [58,46,70,48,42], "Co-founder of Your Party; MP for Coventry South."),
  /* Restore Britain */
  P("Rupert Lowe",        "Restore Britain","e7", ["business","home"],       [50,46,60,48,44], "Independent MP; launched Restore Britain in 2026."),

  /* ============================ WILDCARD ROSTER (scope: "wild") ========== */
  /* These appear ONLY in Wildcard mode. Ratings are an editorial abstraction;
     notes are factual. Inclusion is satire, not endorsement — figures
     responsible for atrocities are flagged plainly and their collapsed
     records keep their "statecraft" low. */
  /* --- US Republican --- */
  P("Abraham Lincoln",    "US Republican", "e1", ["pm","leader"],           [80,78,92,86,72], "16th US President; ended slavery; led the Union through civil war.", "wild"),
  P("Theodore Roosevelt", "US Republican", "e2", ["pm","foreign","defence"], [82,80,86,80,70], "Trust-busting, conservationist 26th US President.", "wild"),
  P("Dwight Eisenhower",  "US Republican", "e4", ["pm","defence","foreign"], [78,86,68,82,76], "Supreme Allied Commander; 34th US President.", "wild"),
  P("Richard Nixon",      "US Republican", "e4", ["pm","foreign"],          [60,80,70,66,48], "Opened China; resigned over Watergate.", "wild"),
  P("Ronald Reagan",      "US Republican", "e5", ["pm"],                    [84,76,88,72,72], "Two-term 40th US President; 'the Great Communicator'.", "wild"),
  P("George H. W. Bush",  "US Republican", "e5", ["pm","foreign","defence"], [62,84,58,76,68], "41st US President; Gulf War coalition-builder.", "wild"),
  P("George W. Bush",     "US Republican", "e6", ["pm","defence"],          [56,66,58,54,60], "43rd US President; the 'War on Terror'.", "wild"),
  P("Donald Trump",       "US Republican", "e7", ["pm","business"],         [78,58,80,46,54], "45th and 47th US President; a uniquely polarising figure.", "wild"),
  /* --- US Democrat --- */
  P("Franklin D. Roosevelt","US Democrat", "e3", ["pm"],                    [86,90,88,86,78], "Four-term US President; the New Deal and WWII.", "wild"),
  P("John F. Kennedy",    "US Democrat",   "e4", ["pm","foreign"],          [86,62,88,68,66], "35th US President; Cuban Missile Crisis.", "wild"),
  P("Lyndon B. Johnson",  "US Democrat",   "e4", ["pm","leader"],           [62,82,64,78,80], "Civil Rights and the Great Society; the Vietnam quagmire.", "wild"),
  P("Bill Clinton",       "US Democrat",   "e6", ["pm"],                    [82,76,86,76,66], "Two-term 42nd US President; oversaw a 1990s economic boom and survived impeachment.", "wild"),
  P("Barack Obama",       "US Democrat",   "e7", ["pm","foreign"],          [88,68,92,74,70], "44th US President; 'Yes we can'.", "wild"),
  P("Joe Biden",          "US Democrat",   "e7", ["pm","foreign"],          [54,88,56,64,62], "46th US President; half a century in US politics.", "wild"),
  /* --- Dictators & Despots (factual, condemnatory-neutral notes) --- */
  P("Adolf Hitler",       "Dictators",     "e3", ["leader"],               [70,40,78,30,78], "Dictator of Nazi Germany; responsible for the Holocaust and the Second World War.", "wild"),
  P("Joseph Stalin",      "Dictators",     "e4", ["leader","defence"],      [54,60,52,40,86], "Soviet dictator; the Great Purge and millions of deaths.", "wild"),
  P("Benito Mussolini",   "Dictators",     "e3", ["leader"],               [62,46,72,34,68], "Fascist dictator of Italy; allied with Nazi Germany.", "wild"),
  P("Mao Zedong",         "Dictators",     "e4", ["leader"],               [60,58,60,36,82], "Founded the PRC; the famine of the Great Leap Forward and the Cultural Revolution.", "wild"),
  P("Vladimir Putin",     "Dictators",     "e7", ["leader","defence"],      [56,78,56,52,80], "President of Russia; the invasion of Ukraine.", "wild"),
  P("Muammar Gaddafi",    "Dictators",     "e5", ["leader"],               [48,62,54,34,70], "Ruled Libya for four decades until his overthrow.", "wild"),
  P("Saddam Hussein",     "Dictators",     "e5", ["defence","leader"],      [46,58,52,32,72], "Dictator of Iraq; toppled in the 2003 invasion.", "wild"),
  P("Kim Jong-un",        "Dictators",     "e7", ["leader","defence"],      [40,46,44,38,82], "Supreme Leader of North Korea; a nuclear-armed hereditary dictator who rules through fear.", "wild"),
  P("Joseph Goebbels",    "Dictators",     "e3", ["leader"],               [38,44,70,30,60], "Nazi propaganda minister; a principal architect of Holocaust-era propaganda.", "wild"),
  P("Heinrich Himmler",   "Dictators",     "e3", ["home"],                 [28,46,32,34,64], "Head of the SS; chief organiser of the Holocaust.", "wild"),
  P("Hermann Göring",     "Dictators",     "e3", ["defence","deputy"],     [44,48,46,32,56], "Leading Nazi; founded the Gestapo and directed the Luftwaffe.", "wild"),
  P("Reinhard Heydrich",  "Dictators",     "e3", ["home"],                 [26,42,30,36,58], "SS leader; a chief planner of the Holocaust.", "wild"),
  P("Pol Pot",            "Dictators",     "e4", ["leader"],               [24,34,30,24,58], "Khmer Rouge leader responsible for the Cambodian genocide.", "wild"),
  P("Augusto Pinochet",   "Dictators",     "e4", ["defence","leader"],     [34,50,36,40,60], "Seized power in Chile in a 1973 coup; rule marked by killings and torture.", "wild"),
  P("Idi Amin",           "Dictators",     "e4", ["defence"],              [40,30,42,22,54], "Dictator of Uganda; mass atrocities in the 1970s.", "wild"),
  P("Robert Mugabe",      "Dictators",     "e5", ["leader"],               [42,58,52,34,66], "Ruled Zimbabwe for decades, ending in economic ruin and repression.", "wild"),
  P("Nicolae Ceaușescu",  "Dictators",     "e4", ["leader"],               [30,48,34,32,60], "Romanian communist dictator, overthrown and executed in 1989.", "wild"),
  P("Francisco Franco",   "Dictators",     "e3", ["leader","defence"],     [36,56,34,44,62], "Ruled Spain as a dictator after the Civil War.", "wild"),
  P("Slobodan Milošević", "Dictators",     "e6", ["leader"],               [38,50,46,38,56], "Serbian leader during the Yugoslav wars; died on trial for war crimes.", "wild"),
  P("Bashar al-Assad",    "Dictators",     "e7", ["leader","defence"],     [30,52,36,34,58], "President of Syria through a brutal and devastating civil war.", "wild"),
  P("Kim Il-sung",        "Dictators",     "e4", ["leader"],               [44,54,48,38,76], "Founder of North Korea's ruling dynasty.", "wild"),
  P("Hideki Tojo",        "Dictators",     "e3", ["defence"],              [34,52,38,40,54], "Wartime Prime Minister of Imperial Japan; executed for war crimes.", "wild"),
  P("Suharto",            "Dictators",     "e4", ["leader","defence"],     [38,56,40,42,60], "Ruled Indonesia for three decades after a violent purge.", "wild"),
  P("Mobutu Sese Seko",   "Dictators",     "e4", ["leader"],               [40,46,44,28,56], "Kleptocratic dictator of Zaire.", "wild"),

  P("Jawaharlal Nehru",   "World Leaders", "e4", ["pm","foreign"],         [72,76,74,70,72], "India's first Prime Minister.", "wild"),
  P("Indira Gandhi",      "World Leaders", "e4", ["pm","foreign"],         [66,72,68,66,72], "Long-serving and formidable Prime Minister of India.", "wild"),
  P("David Ben-Gurion",   "World Leaders", "e4", ["pm","defence"],         [70,74,70,72,72], "Israel's founding Prime Minister.", "wild"),
  P("Anwar Sadat",        "World Leaders", "e5", ["pm","foreign"],         [66,68,66,68,64], "Egyptian president who made a historic peace with Israel.", "wild"),
  P("Yitzhak Rabin",      "World Leaders", "e6", ["pm","defence"],         [62,72,60,68,66], "Israeli Prime Minister and Oslo peace signatory.", "wild"),
  P("Volodymyr Zelensky", "World Leaders", "e7", ["leader","pm"],          [78,52,82,58,70], "Actor-turned-wartime President of Ukraine; rallied his country against Russia's invasion.", "wild"),
  P("Deng Xiaoping",      "World Leaders", "e5", ["leader","chancellor"],  [60,80,58,82,76], "Architect of China's economic transformation.", "wild"),
  P("Kofi Annan",         "World Leaders", "e6", ["foreign"],              [70,74,68,74,64], "UN Secretary-General and Nobel Peace laureate.", "wild"),
  P("Shinzo Abe",         "World Leaders", "e7", ["pm","foreign"],         [60,72,62,70,70], "Japan's longest-serving Prime Minister.", "wild"),
  P("Helmut Kohl",        "World Leaders", "e6", ["pm","foreign"],         [58,74,60,72,74], "The Chancellor who reunified Germany.", "wild"),
  /* --- World Statesmen --- */
  P("Charles de Gaulle",  "World Leaders", "e4", ["pm","defence"],          [76,82,82,80,76], "Free French leader; founder of the Fifth Republic.", "wild"),
  P("Konrad Adenauer",    "World Leaders", "e4", ["pm","foreign"],          [62,84,62,82,78], "First Chancellor of West Germany.", "wild"),
  P("Angela Merkel",      "World Leaders", "e7", ["pm","foreign"],          [70,88,60,84,80], "Chancellor of Germany for sixteen years.", "wild"),
  P("Nelson Mandela",     "World Leaders", "e6", ["pm","leader"],           [92,72,86,78,74], "Anti-apartheid leader and first post-apartheid President of South Africa.", "wild"),
  P("Mahatma Gandhi",     "World Leaders", "e3", ["leader"],               [90,66,82,72,70], "Led India's non-violent independence movement.", "wild"),
  P("Mikhail Gorbachev",  "World Leaders", "e5", ["pm","foreign"],          [64,72,66,68,52], "Last Soviet leader; glasnost and perestroika.", "wild"),
  P("Emmanuel Macron",    "World Leaders", "e7", ["pm","foreign"],          [58,64,72,66,58], "President of France since 2017; a centrist former investment banker and economy minister.", "wild"),
  P("Golda Meir",         "World Leaders", "e4", ["pm","foreign"],          [66,72,68,70,72], "Prime Minister of Israel during the 1973 Yom Kippur War; among the first women to lead a nation.", "wild"),
  P("Lee Kuan Yew",       "World Leaders", "e4", ["pm","business"],         [68,86,72,88,82], "Founding Prime Minister of Singapore.", "wild"),
  P("Jacinda Ardern",     "World Leaders", "e7", ["pm"],                    [74,56,78,64,62], "Prime Minister of New Zealand 2017-2023; led through Christchurch and the pandemic, then resigned on her own terms.", "wild"),
  /* --- Revolutionaries & Founders --- */
  P("Napoleon Bonaparte", "Revolutionaries","e0", ["pm","defence"],         [82,80,80,78,76], "Emperor of the French; reshaped Europe.", "wild"),
  P("George Washington",  "Revolutionaries","e0", ["pm","defence"],         [80,76,64,84,80], "Commander of the Continental Army; first US President.", "wild"),
  P("Oliver Cromwell",    "Revolutionaries","e0", ["pm","defence"],         [60,72,66,70,68], "Led Parliament's armies; Lord Protector of England.", "wild"),
  P("Vladimir Lenin",     "Revolutionaries","e3", ["leader"],              [58,64,72,58,78], "Led the 1917 Russian Revolution; founded the Soviet state.", "wild"),
  P("Maximilien Robespierre","Revolutionaries","e0", ["justice"],          [50,52,74,46,60], "A leader of the French Revolution and its Reign of Terror.", "wild"),
  P("Simón Bolívar",      "Revolutionaries","e0", ["defence","foreign"],    [74,66,78,66,64], "'The Liberator' of much of South America.", "wild"),
  P("Fidel Castro",       "Revolutionaries","e4", ["pm","leader"],          [64,78,76,56,76], "Led the Cuban Revolution; ruled Cuba for decades.", "wild"),
  P("Che Guevara",        "Revolutionaries","e4", ["defence"],             [70,48,66,48,58], "Marxist revolutionary and guerrilla leader.", "wild"),

  /* --- extra Green bench (so a full Green dynasty can be fielded) --- */
  P("Jonathan Bartley",   "Green",        "e7", ["leader","deputy"],       [56,55,64,55,66], "Co-led the Green Party of England and Wales, 2016–2021."),
  P("Amelia Womack",      "Green",        "e7", ["deputy","leader"],       [60,52,66,52,64], "Long-serving former deputy leader of the Greens."),
  P("Molly Scott Cato",   "Green",        "e7", ["chancellor","business"], [54,66,60,72,52], "Green economist and former MEP for the South West."),
  P("Patrick Harvie",     "Green",        "e7", ["deputy","business","leader"], [58,70,64,64,66], "Scottish Greens co-leader; served as a government minister at Holyrood."),
  P("Lorna Slater",       "Green",        "e7", ["business","defence"],    [56,62,58,60,60], "Scottish Greens co-leader and former Holyrood minister."),
  P("Magid Magid",        "Green",        "e7", ["home","leader"],         [66,50,68,50,56], "Former MEP and Lord Mayor of Sheffield."),
  P("Jenny Jones",        "Green",        "e7", ["home","justice"],        [52,72,56,62,54], "Green peer and long-serving London Assembly member."),

  /* --- the wider Reform tradition: UKIP & Brexit Party heritage --- */
  P("Ann Widdecombe",     "Reform UK",    "e7", ["home","justice","leader"], [58,80,66,64,60], "Veteran former Conservative minister, now a senior Reform figure."),
  P("David Bull",         "Reform UK",    "e7", ["health","leader"],       [64,52,68,52,58], "Broadcaster, doctor and Reform chairman."),
  P("Catherine Blaiklock","Brexit Party", "e7", ["business"],              [46,48,50,54,44], "Founder of the Brexit Party."),
  P("Annunziata Rees-Mogg","Brexit Party","e7", ["business","education"],  [50,50,56,54,48], "Journalist and former Brexit Party MEP; sister of Jacob Rees-Mogg."),
  P("Gerard Batten",      "UKIP",         "e7", ["leader","home"],         [46,56,54,50,52], "Former UKIP leader and long-serving MEP."),
  P("Suzanne Evans",      "UKIP",         "e7", ["business","leader"],     [56,54,62,58,52], "Former UKIP policy chief and deputy chair."),
  P("Douglas Carswell",   "UKIP",         "e7", ["business","chancellor"], [58,66,64,66,50], "The first MP elected for UKIP, after defecting from the Conservatives."),
  P("Mark Reckless",      "UKIP",         "e7", ["home","business"],       [50,60,56,58,50], "Former Conservative who won re-election as a UKIP MP."),
  P("Roger Helmer",       "UKIP",         "e7", ["business","defence"],    [44,58,52,56,48], "Former Conservative MEP who later joined UKIP."),
  P("Diane James",        "UKIP",         "e7", ["foreign","leader"],      [50,52,54,54,46], "MEP who led UKIP for just eighteen days before walking away."),
  P("Neil Hamilton",      "UKIP",         "e7", ["leader","justice"],      [44,62,58,52,50], "Former Conservative MP and later UKIP's leader in Wales.")
];

/* -------------------------------------------------------------- DESPOTS -- */
/* Who counts as a despot (for the spin's intrusion and the cabinet penalty),
   and where each one sits on a crude left/right axis. A satirical abstraction,
   not a serious political taxonomy. The Dictators party is despotic by default;
   a few revolutionaries are folded in so each side has a plausible "own-side"
   wrecker for Dynasty mode. */
G.DESPOT_EXTRA = { "Vladimir Lenin": 1, "Fidel Castro": 1, "Che Guevara": 1, "Maximilien Robespierre": 1 };
G.isDespot = function (p) { return !!p && (p.party === "Dictators" || !!G.DESPOT_EXTRA[p.name]); };
G.DESPOT_SPECTRUM = {
  /* hard right / fascist / nationalist-authoritarian */
  "Adolf Hitler":"right","Benito Mussolini":"right","Francisco Franco":"right","Augusto Pinochet":"right",
  "Hideki Tojo":"right","Joseph Goebbels":"right","Heinrich Himmler":"right","Hermann Göring":"right",
  "Reinhard Heydrich":"right","Suharto":"right","Mobutu Sese Seko":"right","Vladimir Putin":"right",
  "Slobodan Milošević":"right","Saddam Hussein":"right","Muammar Gaddafi":"right","Bashar al-Assad":"right",
  "Robert Mugabe":"right","Idi Amin":"right",
  /* communist / hard left */
  "Joseph Stalin":"left","Mao Zedong":"left","Pol Pot":"left","Nicolae Ceaușescu":"left",
  "Kim Il-sung":"left","Kim Jong-un":"left","Vladimir Lenin":"left","Fidel Castro":"left",
  "Che Guevara":"left","Maximilien Robespierre":"left"
};
/* a player's lineage -> which side a Dynasty despot should come from */
G.LINEAGE_SPECTRUM = {
  Conservative:"right", Reform:"right", Restore:"right",
  Labour:"left", YourParty:"left", Green:"left", SNP:"left", Plaid:"left"
};
G.spectrumOfLineage = function (lin) { return G.LINEAGE_SPECTRUM[lin] || null; };
G.despotPool = function (spectrum) {
  return G.POLITICIANS.filter(function (p) {
    if (!G.isDespot(p)) return false;
    if (!spectrum) return true;
    return (G.DESPOT_SPECTRUM[p.name] || null) === spectrum;
  });
};

/* ---------------------------------------------------------------- CONFIG -- */
G.CONFIG = {
  fitBonus: 1.15,
  fitNeutral: 1.0,
  misfitPenalty: 0.90,
  pickShowMax: 8,        // most candidates ever shown at once
  tierThreshold: 14,     // above this, spin for a tier first
  voteMin: 0.20,
  voteMax: 0.52,
  strengthFloor: 12 * 48,
  strengthCeil:  12 * 92,
  diversityBonusPerEra: 0.004,
  diversityErasFree: 3,

  /* hands-off spin & despots */
  despotUnityChance:   0.08,   // Greatest Cabinet (Unity): small chance a despot intrudes
  despotDynastyChance: 0.12,   // Dynasty: chance of a despot on your own side
  despotPenalty:       0.75,   // each despot multiplies cabinet strength (compounding) — a national scandal

  /* national vote -> seat responsiveness (cube-law-inspired logistic) */
  seatsK: 20,
  seatsMid: 0.38,

  /* constituency model */
  seatNoise: 0.85,        // per-seat logit noise (the "anything can happen" factor)
  regionSwing: 0.45,      // per-region shared swing each campaign
  unityLeanSpread: 0.5,   // mild regional variation for unity / wildcard tickets

  totalSeats: 650,
  majority: 326,
  tierLandslide: 400,
  tierSuper: 434,
  tierDominance: 600,

  trials: 800,            // monte-carlo runs for the odds panel

  /* difficulty presets: voteShift nudges your support; midShift moves the
     seat curve; noiseMul scales campaign randomness */
  difficulties: {
    easy:   { label: "Easy",   voteShift:  0.045, midShift: -0.020, noiseMul: 0.80 },
    normal: { label: "Normal", voteShift:  0.000, midShift:  0.000, noiseMul: 1.00 },
    hard:   { label: "Hard",   voteShift: -0.035, midShift:  0.022, noiseMul: 1.25 }
  }
};

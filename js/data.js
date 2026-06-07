/* =============================================================================
   650 — DATA
   -----------------------------------------------------------------------------
   This file holds everything that defines the game world:
     • ERAS        — the era bands a politician can belong to
     • PARTIES     — party labels, colours and single-party "dynasty" seat caps
     • PORTFOLIOS  — the 12 cabinet seats you fill, and which stats matter for each
     • POLITICIANS — the roster you draft from
     • CONFIG      — tunable knobs for the election engine

   ---------------------------------------------------------------------------
   RATING METHODOLOGY (read me before you argue about the numbers)
   ---------------------------------------------------------------------------
   Every politician has five gameplay stats on a 1–99 scale. They are an
   EDITORIAL game abstraction, not a verdict on anyone as a person, and the
   SAME logic is applied to every party:

     appeal     — electoral / popular pull (elections won, majorities, polling)
     experience — length AND breadth of governing record (offices held, tenure)
     oratory    — reputation as a communicator / debater
     statecraft — governing & negotiating record, major reforms enacted
     partyMgmt  — party management, discipline and loyalty

   Facts (party, era, offices held) are historical record. The stats are the
   knob you are MEANT to disagree about — that is the whole point of the genre.
   Everything here is plain data: edit a number, add a person, done.
   ========================================================================== */

window.G = window.G || {};

/* ------------------------------------------------------------------ ERAS -- */
G.ERAS = [
  { id: "e1", label: "The Reform Era",        years: "1832–1885" },
  { id: "e2", label: "Late Victorian / Edwardian", years: "1885–1914" },
  { id: "e3", label: "Wars & Interwar",       years: "1914–1945" },
  { id: "e4", label: "Postwar Consensus",     years: "1945–1979" },
  { id: "e5", label: "Thatcher to Major",     years: "1979–1997" },
  { id: "e6", label: "New Labour Years",      years: "1997–2010" },
  { id: "e7", label: "Coalition & After",     years: "2010–present" }
];
G.ERA_BY_ID = Object.fromEntries(G.ERAS.map(function (e) { return [e.id, e]; }));

/* --------------------------------------------------------------- PARTIES -- */
/* `cap` = number of seats this lineage could realistically contest in a
   single-party run (used only in Dynasty mode). GB parties exclude the ~18
   Northern Ireland seats. SNP / Plaid only stand in Scotland / Wales — which
   is exactly why they can never win a UK majority. */
G.PARTIES = {
  "Conservative":      { label: "Conservative",      lineage: "Conservative", colour: "#0a3d62", cap: 632 },
  "Labour":            { label: "Labour",            lineage: "Labour",       colour: "#8b2332", cap: 632 },
  "Liberal":           { label: "Liberal",           lineage: "Liberal",      colour: "#c2820a", cap: 632 },
  "Whig":              { label: "Whig",              lineage: "Liberal",      colour: "#c2820a", cap: 632 },
  "Liberal Democrat":  { label: "Liberal Democrat",  lineage: "Liberal",      colour: "#d4860b", cap: 632 },
  "SNP":               { label: "SNP",               lineage: "SNP",          colour: "#d6a400", cap: 57  },
  "Plaid Cymru":       { label: "Plaid Cymru",       lineage: "Plaid",        colour: "#2e7d4f", cap: 32  },
  "Reform":            { label: "Reform",            lineage: "Reform",       colour: "#0e8a8a", cap: 632 }
};
G.lineageOf = function (partyLabel) {
  var p = G.PARTIES[partyLabel];
  return p ? p.lineage : partyLabel;
};

/* ------------------------------------------------------------ PORTFOLIOS -- */
/* `w` = how much each stat matters for this seat (weights sum to ~1). */
G.PORTFOLIOS = [
  { key: "pm",         name: "Prime Minister",                w: { appeal: .30, oratory: .25, statecraft: .30, experience: .15, partyMgmt: 0 } },
  { key: "chancellor", name: "Chancellor of the Exchequer",   w: { appeal: .15, oratory: .20, statecraft: .35, experience: .30, partyMgmt: 0 } },
  { key: "foreign",    name: "Foreign Secretary",             w: { appeal: .15, oratory: .20, statecraft: .40, experience: .25, partyMgmt: 0 } },
  { key: "home",       name: "Home Secretary",                w: { appeal: .15, oratory: 0,   statecraft: .35, experience: .30, partyMgmt: .20 } },
  { key: "deputy",     name: "Deputy Prime Minister",         w: { appeal: .25, oratory: .20, statecraft: 0,   experience: .20, partyMgmt: .35 } },
  { key: "defence",    name: "Defence Secretary",             w: { appeal: 0,   oratory: 0,   statecraft: .40, experience: .35, partyMgmt: .25 } },
  { key: "health",     name: "Health Secretary",              w: { appeal: .20, oratory: .15, statecraft: .35, experience: .30, partyMgmt: 0 } },
  { key: "education",  name: "Education Secretary",           w: { appeal: .15, oratory: .20, statecraft: .35, experience: .30, partyMgmt: 0 } },
  { key: "justice",    name: "Justice Secretary",             w: { appeal: 0,   oratory: .25, statecraft: .40, experience: .35, partyMgmt: 0 } },
  { key: "business",   name: "Business & Trade Secretary",    w: { appeal: .20, oratory: .15, statecraft: .35, experience: .30, partyMgmt: 0 } },
  { key: "whip",       name: "Chief Whip",                    w: { appeal: 0,   oratory: 0,   statecraft: .15, experience: .25, partyMgmt: .60 } },
  { key: "leader",     name: "Leader of the House",           w: { appeal: 0,   oratory: .40, statecraft: 0,   experience: .30, partyMgmt: .30 } }
];
G.PORTFOLIO_BY_KEY = Object.fromEntries(G.PORTFOLIOS.map(function (p) { return [p.key, p]; }));

/* ----------------------------------------------------------- POLITICIANS -- */
/* s: [appeal, experience, oratory, statecraft, partyMgmt]  (kept short on
   purpose so the roster stays readable). `fits` = portfolio keys they
   genuinely held or map to; placing them there earns a fit bonus. */
function P(name, party, era, fits, s, note) {
  return {
    name: name, party: party, era: era, fits: fits,
    stats: { appeal: s[0], experience: s[1], oratory: s[2], statecraft: s[3], partyMgmt: s[4] },
    note: note || ""
  };
}

G.POLITICIANS = [
  /* ---- e1 : The Reform Era (1832–1885) ---- */
  P("Robert Peel",        "Conservative", "e1", ["pm","home"],              [70,88,78,90,72], "Founded the modern police and the Conservative Party; repealed the Corn Laws."),
  P("William Gladstone",  "Liberal",      "e1", ["pm","chancellor"],        [82,95,90,88,78], "Four-time PM; began as a Tory before defining Liberalism."),
  P("Benjamin Disraeli",  "Conservative", "e1", ["pm","chancellor"],        [80,82,92,80,85], "Novelist and showman; built One-Nation Conservatism."),
  P("Lord Palmerston",    "Liberal",      "e1", ["pm","foreign"],           [78,90,80,82,76], "Gunboat-diplomacy Foreign Secretary and PM."),
  P("Lord John Russell",  "Whig",         "e1", ["pm","foreign"],           [60,80,70,70,60], "Architect of the 1832 Reform Act."),
  P("Earl of Derby",      "Conservative", "e1", ["pm","foreign"],           [58,78,74,70,72], "Three-time PM; longest-serving Conservative leader."),
  P("Lord Aberdeen",      "Conservative", "e1", ["pm","foreign"],           [50,72,55,62,55], "Led the coalition that stumbled into the Crimean War."),
  P("Richard Cobden",     "Liberal",      "e1", ["business","foreign"],     [64,55,80,65,50], "Anti-Corn Law League; apostle of free trade."),

  /* ---- e2 : Late Victorian / Edwardian (1885–1914) ---- */
  P("Lord Salisbury",     "Conservative", "e2", ["pm","foreign"],           [66,90,76,86,80], "Three-time PM and dominant Foreign Secretary."),
  P("H.H. Asquith",       "Liberal",      "e2", ["pm","chancellor","home"], [64,86,82,80,70], "Reforming PM; took Britain into WWI."),
  P("Arthur Balfour",     "Conservative", "e2", ["pm","foreign"],           [55,82,78,74,60], "PM, then Foreign Secretary of the Balfour Declaration."),
  P("Henry Campbell-Bannerman","Liberal", "e2", ["pm"],                     [62,70,66,68,70], "Led the Liberals to the 1906 landslide."),
  P("Edward Grey",        "Liberal",      "e2", ["foreign"],                [50,74,64,72,58], "Longest continuous Foreign Secretary; 'the lamps are going out'."),
  P("Keir Hardie",        "Labour",       "e2", ["leader","deputy"],        [66,58,84,60,64], "Founder and first leader of the Labour Party."),
  P("Joseph Chamberlain", "Conservative", "e2", ["business","foreign"],     [74,78,86,76,58], "Radical turned Liberal Unionist; tariff-reform crusader."),

  /* ---- e3 : Wars & Interwar (1914–1945) ---- */
  P("David Lloyd George", "Liberal",      "e3", ["pm","chancellor"],        [84,88,92,86,64], "People's Budget Chancellor and WWI Prime Minister."),
  P("Winston Churchill",  "Conservative", "e3", ["pm","chancellor","home","defence"], [88,95,97,88,70], "Crossed the floor twice; held every great office; wartime leader."),
  P("Stanley Baldwin",    "Conservative", "e3", ["pm","chancellor"],        [70,86,72,78,84], "Three-time PM and master party manager."),
  P("Neville Chamberlain","Conservative", "e3", ["pm","chancellor","health"], [58,84,66,72,76], "Major social reformer at Health; appeasement at the end."),
  P("Ramsay MacDonald",   "Labour",       "e3", ["pm","foreign"],           [60,78,78,66,50], "First Labour PM; split the party over the National Government."),
  P("Andrew Bonar Law",   "Conservative", "e3", ["pm","chancellor"],        [52,74,64,66,66], "The 'unknown Prime Minister'."),
  P("Nancy Astor",        "Conservative", "e3", ["whip"],                   [56,50,60,48,52], "First woman to take her seat in the Commons."),

  /* ---- e4 : Postwar Consensus (1945–1979) ---- */
  P("Clement Attlee",     "Labour",       "e4", ["pm"],                     [70,90,58,92,88], "Built the NHS and the welfare state."),
  P("Aneurin Bevan",      "Labour",       "e4", ["health"],                 [74,70,92,78,56], "Founded the National Health Service."),
  P("Ernest Bevin",       "Labour",       "e4", ["foreign"],                [64,80,66,84,78], "Postwar Foreign Secretary; helped create NATO."),
  P("Harold Macmillan",   "Conservative", "e4", ["pm","chancellor","foreign"], [76,86,80,82,80], "'You've never had it so good.'"),
  P("Anthony Eden",       "Conservative", "e4", ["pm","foreign"],           [66,84,74,64,58], "Long-serving Foreign Secretary; undone by Suez."),
  P("Harold Wilson",      "Labour",       "e4", ["pm","business"],          [80,86,82,80,78], "Won four general elections."),
  P("Edward Heath",       "Conservative", "e4", ["pm"],                     [56,80,60,66,58], "Took Britain into the EEC."),
  P("Rab Butler",         "Conservative", "e4", ["chancellor","home","foreign"], [58,88,72,84,70], "1944 Education Act; 'the best PM we never had'."),
  P("Hugh Gaitskell",     "Labour",       "e4", ["chancellor","leader"],    [60,70,76,74,62], "Chancellor and Labour leader."),
  P("Roy Jenkins",        "Labour",       "e4", ["home","chancellor"],      [64,82,80,82,56], "Liberalising Home Secretary; later an SDP founder."),
  P("Denis Healey",       "Labour",       "e4", ["chancellor","defence"],   [70,84,82,80,66], "Chancellor through the IMF crisis; long-serving heavyweight."),
  P("Iain Macleod",       "Conservative", "e4", ["chancellor"],             [64,70,84,76,60], "Brilliant orator; Chancellor for barely a month."),
  P("Barbara Castle",     "Labour",       "e4", ["health","business","education"], [66,78,80,78,60], "One of the great reforming cabinet ministers."),
  P("Alec Douglas-Home",  "Conservative", "e4", ["pm","foreign"],           [50,78,56,66,62], "Renounced a peerage to become PM."),
  P("James Callaghan",    "Labour",       "e4", ["pm","chancellor","home","foreign"], [66,90,70,76,74], "The only person to hold all four great offices of state."),
  P("Jo Grimond",         "Liberal",      "e4", ["leader"],                 [64,64,78,64,66], "Revived the Liberal Party in the postwar years."),

  /* ---- e5 : Thatcher to Major (1979–1997) ---- */
  P("Margaret Thatcher",  "Conservative", "e5", ["pm"],                     [84,90,82,90,80], "Won three elections; reshaped the postwar settlement."),
  P("John Major",         "Conservative", "e5", ["pm","chancellor","foreign"], [62,82,62,70,60], "Surprise 1992 winner; Maastricht and 'Black Wednesday'."),
  P("Nigel Lawson",       "Conservative", "e5", ["chancellor"],             [58,76,78,80,58], "Tax-cutting reformer at the Treasury."),
  P("Geoffrey Howe",      "Conservative", "e5", ["chancellor","foreign","deputy"], [50,84,60,80,62], "His resignation speech helped topple Thatcher."),
  P("Michael Heseltine",  "Conservative", "e5", ["deputy","defence","business"], [74,82,86,76,58], "'Tarzan'; Deputy PM and conference showman."),
  P("Kenneth Clarke",     "Conservative", "e5", ["chancellor","home","health","education","justice"], [72,92,84,82,64], "Held an extraordinary range of great offices."),
  P("Douglas Hurd",       "Conservative", "e5", ["foreign","home"],         [56,80,72,78,62], "Foreign and Home Secretary; diplomat's diplomat."),
  P("Norman Tebbit",      "Conservative", "e5", ["business","whip"],        [58,72,74,66,70], "Combative party chairman and minister."),
  P("Neil Kinnock",       "Labour",       "e5", ["leader","deputy"],        [62,70,82,64,66], "Modernised Labour; lost twice from the front."),
  P("John Smith",         "Labour",       "e5", ["chancellor","leader"],    [64,72,74,76,70], "Labour leader who laid the ground for 1997."),
  P("David Steel",        "Liberal",      "e5", ["leader"],                 [60,66,72,64,64], "Liberal leader; architect of the SDP–Liberal Alliance."),

  /* ---- e6 : New Labour Years (1997–2010) ---- */
  P("Tony Blair",         "Labour",       "e6", ["pm"],                     [86,86,92,84,80], "Won three elections; Labour's most electorally successful leader."),
  P("Gordon Brown",       "Labour",       "e6", ["pm","chancellor"],        [60,88,72,82,60], "Long-serving Chancellor, then PM in the financial crisis."),
  P("Robin Cook",         "Labour",       "e6", ["foreign"],                [64,76,88,78,56], "Foreign Secretary and the Commons' finest debater."),
  P("Jack Straw",         "Labour",       "e6", ["home","foreign","justice"], [56,84,70,76,66], "Held Home, Foreign and Justice."),
  P("David Blunkett",     "Labour",       "e6", ["home","education"],       [60,76,72,68,58], "Reforming Education then Home Secretary."),
  P("John Prescott",      "Labour",       "e6", ["deputy"],                 [60,76,58,64,76], "Long-serving Deputy Prime Minister; party's working-class anchor."),
  P("Alistair Darling",   "Labour",       "e6", ["chancellor"],            [58,78,64,78,64], "Steady hand as Chancellor through the 2008 crash."),
  P("Mo Mowlam",          "Labour",       "e6", ["whip"],                   [72,64,74,70,60], "Drove the Good Friday Agreement."),
  P("William Hague",      "Conservative", "e6", ["foreign","leader"],       [60,74,84,70,64], "Conservative leader, later a notable Foreign Secretary."),
  P("Michael Howard",     "Conservative", "e6", ["home","leader"],          [52,76,66,68,60], "Home Secretary and Conservative leader."),
  P("Charles Kennedy",    "Liberal Democrat","e6", ["leader"],              [70,64,80,64,66], "Led the Lib Dems to their best modern result."),
  P("Paddy Ashdown",      "Liberal Democrat","e6", ["leader","defence"],    [68,70,76,72,70], "Founding Lib Dem leader; former Royal Marine."),
  P("Dafydd Wigley",      "Plaid Cymru",  "e6", ["leader"],                 [60,66,72,64,64], "Long-serving and popular Plaid Cymru leader."),

  /* ---- e7 : Coalition & After (2010–present) ---- */
  P("David Cameron",      "Conservative", "e7", ["pm","foreign"],           [70,80,80,72,66], "PM 2010–16; returned as Foreign Secretary in 2023."),
  P("George Osborne",     "Conservative", "e7", ["chancellor"],             [58,72,70,74,66], "Austerity-era Chancellor."),
  P("Theresa May",        "Conservative", "e7", ["pm","home"],              [54,80,56,64,52], "Long-serving Home Secretary; PM through the Brexit deadlock."),
  P("Boris Johnson",      "Conservative", "e7", ["pm","foreign"],           [78,70,84,56,48], "Won an 80-seat majority in 2019."),
  P("Philip Hammond",     "Conservative", "e7", ["chancellor","foreign","defence"], [48,76,56,72,58], "Treasury, Foreign and Defence; 'Spreadsheet Phil'."),
  P("Sajid Javid",        "Conservative", "e7", ["chancellor","home","health","business"], [56,72,64,66,56], "Held Home, Health, Business and the Treasury."),
  P("Jeremy Hunt",        "Conservative", "e7", ["health","foreign","chancellor"], [52,78,62,70,60], "Longest-serving Health Secretary, then Chancellor."),
  P("Rishi Sunak",        "Conservative", "e7", ["pm","chancellor"],        [56,64,62,64,54], "Chancellor in the pandemic, then Prime Minister."),
  P("Liz Truss",          "Conservative", "e7", ["pm","foreign","business"], [46,60,50,40,42], "The shortest tenure of any PM — a very short governing record."),
  P("Keir Starmer",       "Labour",       "e7", ["pm","justice"],           [58,60,60,64,62], "Former Director of Public Prosecutions; PM from 2024."),
  P("Rachel Reeves",      "Labour",       "e7", ["chancellor"],             [52,58,58,62,58], "The first woman to serve as Chancellor."),
  P("Ed Miliband",        "Labour",       "e7", ["leader","business"],      [54,66,66,62,56], "Labour leader 2010–15."),
  P("Vince Cable",        "Liberal Democrat","e7", ["business","chancellor","leader"], [56,68,66,68,56], "Coalition Business Secretary and later Lib Dem leader."),
  P("Nick Clegg",         "Liberal Democrat","e7", ["deputy"],              [60,64,74,64,56], "Deputy PM in the 2010 coalition."),
  P("Nicola Sturgeon",    "SNP",          "e7", ["pm","leader"],            [72,76,82,76,74], "Long-serving First Minister and SNP leader."),
  P("Alex Salmond",       "SNP",          "e7", ["pm","leader"],            [70,76,84,74,64], "First Minister; brought the SNP to power."),
  P("Nigel Farage",       "Reform",       "e7", ["business","leader"],      [74,50,84,46,50], "Insurgent campaigner; no government office.")
];

/* ---------------------------------------------------------------- CONFIG -- */
G.CONFIG = {
  fitBonus: 1.15,         // multiplier when a politician sits in a seat they fit
  misfitPenalty: 0.90,    // multiplier when they sit somewhere they don't
  voteMin: 0.20,          // floor on projected national vote share
  voteMax: 0.52,          // ceiling — keeps a 650-0 clean sweep almost impossible
  // strength values that anchor the vote-share map (per-seat average * 12 seats)
  strengthFloor: 12 * 48,
  strengthCeil:  12 * 92,
  diversityBonusPerEra: 0.004,   // + vote share per distinct era beyond 3
  diversityErasFree: 3,
  // logistic vote-share -> seats curve
  seatsLmax: 680,
  seatsMid: 0.38,
  seatsK: 20,
  totalSeats: 650,
  unityContestable: 650,         // a cross-party unity ticket can stand everywhere
  majority: 326,
  // result tiers (lower bound, inclusive)
  tierLandslide: 400,
  tierSuper: 434,                // two-thirds of the House
  tierDominance: 600,
  // monte carlo
  trials: 2000,
  voteSd: 0.016                  // std-dev of the random national swing per trial
};

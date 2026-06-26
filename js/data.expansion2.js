/* =============================================================================
   650 — THE MEGA EXPANSION, PART II (v8)
   -----------------------------------------------------------------------------
   Three jobs:

     1 · COLOURS, NAILED DOWN.  Every party gets a FIXED, unique map colour
         (duplicates are nudged apart deterministically). The player's custom-
         cabinet palette is rebuilt from a reserved set that is guaranteed never
         to collide with a party colour. In a dynasty you already fly the
         party's own colour — that path is untouched and now always resolves.

     3 · EVERY DYNASTY IS DEEP.  A new floor, G.DYNASTY_MIN (= 30), means a
         lineage is only offered as a dynasty once it can field thirty figures.
         The big traditions run far deeper than that (seventy and up); the
         point of the floor is only to keep one-or-two-figure novelty labels
         off the dynasty menu while letting any party with a genuine bench —
         the smaller nationalist and unionist parties, the far right,
         independents — be picked. (Raise G.DYNASTY_MIN for a stricter menu.)

     3 · GO CRAZY.  To get the thinner traditions over the line, the rosters
         below mix real party figures with the aligned, the outspoken and the
         could-fit — anyone who plausibly belongs to the tradition gets a seat,
         exactly as asked. And the British far right is now a (heavily flagged)
         option in its own right.

   Notes stay factual; ratings are the same editorial abstraction applied to
   everyone; the flag mechanic marks the toxic and docks their credibility;
   inclusion is satire and record, never endorsement. Loaded last, after
   data.mps.js, so the colour pass and the floor see every party and figure.
   ========================================================================== */
window.G = window.G || {};
(function () {
  var G = window.G;
  var L = G.lineageOf;

  /* ---------------------------------------------------------------------------
     1 · New parties (fixed unique colours). A far-right lineage so the tradition
     pools into one dynasty the way the Fringe pools the celebrities, plus a home
     for the old "Tory" lineage so its dynasty flies a real colour.
     ------------------------------------------------------------------------- */
  function reg(label, colour, lineage, align) {
    if (!G.PARTIES[label]) G.PARTIES[label] = { label: label, lineage: lineage, colour: colour, cap: 632 };
    else if (colour) G.PARTIES[label].colour = G.PARTIES[label].colour || colour;
    if (!(label in G.PARTY_ALIGN)) G.PARTY_ALIGN[label] = (typeof align === "number") ? align : 0;
  }
  /* far-right tradition (grim, muted, deliberately distinct colours) */
  reg("British National Party", "#2a2f38", "FarRight", 2);
  reg("National Front",         "#3b2f2f", "FarRight", 2);
  reg("Union Movement",         "#4a2c2c", "FarRight", 2);   /* Mosley's post-war vehicle */
  reg("English Defence League", "#5a3530", "FarRight", 2);   /* a street movement, not a party, but a real strand */
  reg("Britain First",          "#34302a", "FarRight", 2);
  /* the historic Tories get a labelled home */
  reg("Tory",                   "#13476b", "Tory", 1);
  /* misc real party homes used below */
  reg("Referendum Party",       "#0f7d6b", "Reform", 1);     /* Goldsmith, 1997 */
  reg("Alba",                   "#0a4fa0", "SNP", 0);        /* Salmond's 2021 split — same lineage as SNP */

  if (!G.LEANS.FarRight) G.LEANS.FarRight = { SCO:0, WAL:0, NI:0, NE:0.05, NW:0.05, YH:0.05, EM:0.05, WM:0.05, EE:0, LDN:-0.1, SE:0, SW:0 };
  if (G.LINEAGE_ALIGN) { G.LINEAGE_ALIGN.FarRight = 2; if (G.LINEAGE_ALIGN.Tory == null) G.LINEAGE_ALIGN.Tory = 1; }
  if (G.LINEAGE_PARTY) { G.LINEAGE_PARTY.FarRight = "British National Party"; G.LINEAGE_PARTY.Tory = "Tory"; }

  /* ---------------------------------------------------------------------------
     2 · Fixed, unique party colours + a non-overlapping player palette.
     ------------------------------------------------------------------------- */
  function clamp(n) { return n < 0 ? 0 : n > 255 ? 255 : n; }
  function nudgeHex(hex, amt) {
    hex = hex.replace("#", "");
    if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    var r = clamp(parseInt(hex.slice(0,2),16) + amt),
        g = clamp(parseInt(hex.slice(2,4),16) - amt),
        b = clamp(parseInt(hex.slice(4,6),16) + Math.round(amt/2));
    function h(x){ x = x.toString(16); return x.length<2 ? "0"+x : x; }
    return "#" + h(r) + h(g) + h(b);
  }
  (function ensureUniquePartyColours() {
    var used = {};
    Object.keys(G.PARTIES).sort().forEach(function (name) {
      var p = G.PARTIES[name];
      var c = (p.colour || "#6b6b6b").toLowerCase();
      var amt = 8;
      while (used[c]) { c = nudgeHex((p.colour || "#6b6b6b"), amt).toLowerCase(); amt += 11; }
      p.colour = c; used[c] = name;
    });
    G._PARTY_COLOUR_SET = used;
  })();

  /* the player's custom-cabinet swatches — a reserved, deliberately non-partisan
     set; any that happen to equal a party colour are dropped so there is never
     an overlap with the map's party colours. */
  var RESERVED = [
    { key: "graphite", label: "Graphite", colour: "#37474f" },
    { key: "sand",     label: "Sand",     colour: "#c2a878" },
    { key: "plum",     label: "Plum",     colour: "#6a1b4d" },
    { key: "petrol",   label: "Petrol",   colour: "#00565b" },
    { key: "rust",     label: "Rust",     colour: "#9c4a2f" },
    { key: "indigo",   label: "Indigo",   colour: "#3d3a8c" },
    { key: "moss",     label: "Moss",     colour: "#5a6e2f" },
    { key: "claret",   label: "Claret",   colour: "#5e1a2b" }
  ];
  G.PARTY_PALETTE = RESERVED.filter(function (c) { return !G._PARTY_COLOUR_SET[c.colour.toLowerCase()]; });
  /* keep defaultCustom's fallbacks valid even though they're neutral house tones */

  /* ---------------------------------------------------------------------------
     3 · The dynasty floor. A lineage must field at least this many non-wild
     figures (in the chosen eras) to be offered as a dynasty. Set to 30 so any
     party with a real bench is playable while one/two-figure labels are not.
     ------------------------------------------------------------------------- */
  G.DYNASTY_MIN = 30;
  var _origEligible = G.eligibleDynastyLineages;
  G.eligibleDynastyLineages = function (eras, need, country) {
    var floor = Math.max(need || (G.PORTFOLIOS_BASE ? G.PORTFOLIOS_BASE.length : 12), G.DYNASTY_MIN || 0);
    return _origEligible.call(G, eras, floor, country);
  };

  /* ---------------------------------------------------------------------------
     M(): add a figure unless its name+scope already exists.
     extra = { scope, cast, flag, despot, wiki, img }
     ------------------------------------------------------------------------- */
  var existing = {};
  G.POLITICIANS.forEach(function (p) { existing[p.name + "|" + (p.scope || "uk")] = 1; });
  function M(name, party, era, fits, s, note, extra) {
    extra = extra || {};
    var scope = extra.scope || "uk";
    if (existing[name + "|" + scope]) return;
    existing[name + "|" + scope] = 1;
    var fig = {
      name: name, party: party, era: era, fits: fits,
      stats: { appeal: s[0], experience: s[1], oratory: s[2], statecraft: s[3], partyMgmt: s[4] },
      note: note || "", scope: scope
    };
    if (extra.cast) fig.cast = extra.cast;
    if (extra.flag) fig.flag = extra.flag;
    if (extra.despot) fig.despot = true;
    if (extra.wiki || extra.img) G.PHOTO[name] = { wiki: extra.wiki, img: extra.img };
    G.POLITICIANS.push(fig);
  }
  function W(wiki, flag) { var e = {}; if (wiki) e.wiki = wiki; if (flag) e.flag = flag; return e; }       /* real politician, draftable normally */
  function N(wiki) { return { wiki: wiki, cast: "novelty" }; }                                              /* aligned/could-fit: hidden by default, fills the dynasty */
  function F(wiki) { return { wiki: wiki, flag: "extremist", cast: "novelty" }; }                           /* flagged far-right: hidden by default, flooded into its own dynasty */

  G._EXP2_OPEN = true; /* sentinel; figure batches are appended below */

  /* =========================================================================
     SNP — Holyrood, Westminster, the long history, and the indy-minded famous
     ========================================================================= */
  M("Kate Forbes",        "SNP", "e7", ["chancellor","business"],  [58,46,60,56,44], "Deputy First Minister and former finance secretary.", W("Kate Forbes"));
  M("Keith Brown",        "SNP", "e7", ["defence","deputy"],       [48,50,52,50,52], "Depute leader and veteran Holyrood minister.", W("Keith Brown"));
  M("Shona Robison",      "SNP", "e7", ["chancellor","health"],    [48,52,50,52,46], "Finance secretary and former deputy first minister.", W("Shona Robison"));
  M("Angela Constance",   "SNP", "e7", ["justice","education"],    [48,48,52,48,42], "Justice secretary and long-serving minister.", W("Angela Constance"));
  M("Màiri McAllan",      "SNP", "e7", ["environment","business"], [54,38,56,48,40], "Rising cabinet secretary for the net-zero brief.", W("Màiri McAllan"));
  M("Jenny Gilruth",      "SNP", "e7", ["education","transport"],  [50,42,54,46,40], "Education secretary and former transport minister.", W("Jenny Gilruth"));
  M("Neil Gray",          "SNP", "e7", ["health","business"],      [48,42,52,48,42], "Health secretary and former economy secretary.", W("Neil Gray"));
  M("Shirley-Anne Somerville","SNP","e7",["work","education"],     [48,46,52,48,42], "Cabinet secretary across social security and education.", W("Shirley-Anne Somerville"));
  M("Jeane Freeman",      "SNP", "e6", ["health","work"],          [52,46,56,50,44], "Health secretary through the pandemic's first year.", W("Jeane Freeman"));
  M("Roseanna Cunningham","SNP", "e6", ["environment","justice"],  [52,50,56,50,44], "Long-serving minister and party veteran.", W("Roseanna Cunningham"));
  M("Richard Lochhead",   "SNP", "e6", ["environment","business"], [48,48,50,48,42], "Long-serving rural-affairs and innovation minister.", W("Richard Lochhead"));
  M("Fergus Ewing",       "SNP", "e6", ["business","environment"], [50,50,54,46,44], "Maverick minister of the Ewing political dynasty.", W("Fergus Ewing"));
  M("Annabelle Ewing",    "SNP", "e6", ["justice"],               [46,46,48,46,42], "Minister and member of the Ewing family.", W("Annabelle Ewing"));
  M("Ivan McKee",         "SNP", "e7", ["business","chancellor"],  [50,42,52,52,40], "Business-minded public-finance reform minister.", W("Ivan McKee"));
  M("Alex Neil",          "SNP", "e6", ["health","work"],          [48,48,54,48,42], "Outspoken former health and social-justice secretary.", W("Alex Neil (politician)"));
  M("Kenny MacAskill",    "SNP", "e6", ["justice","home"],         [48,48,54,46,42], "Justice secretary who released the Lockerbie convict; later Alba.", W("Kenny MacAskill"));
  M("Marco Biagi",        "SNP", "e6", ["culture"],               [46,38,50,42,38], "Former local-government minister.", W("Marco Biagi"));
  M("Christina McKelvie", "SNP", "e7", ["health","culture"],       [48,42,52,44,40], "Minister and long-serving MSP.", W("Christina McKelvie"));
  M("Maree Todd",         "SNP", "e7", ["health","education"],     [48,40,50,44,40], "Public-health and sport minister.", W("Maree Todd"));
  M("Tom Arthur",         "SNP", "e7", ["chancellor","business"],  [48,40,50,46,40], "Public-finance minister.", W("Tom Arthur"));
  M("Ben Macpherson",     "SNP", "e7", ["work","foreign"],         [48,40,50,46,40], "Minister for social security and migration.", W("Ben Macpherson"));
  M("George Adam",        "SNP", "e7", ["whip","culture"],         [46,40,48,42,46], "Paisley MSP and parliamentary-business minister.", W("George Adam"));
  M("Bob Doris",          "SNP", "e7", ["health"],               [44,40,46,42,40], "Glasgow MSP and committee veteran.", W("Bob Doris"));
  M("Clare Adamson",      "SNP", "e7", ["education"],             [44,40,46,42,40], "Motherwell MSP and committee convener.", W("Clare Adamson"));
  M("Stuart McMillan",    "SNP", "e7", ["culture","transport"],    [44,40,46,42,42], "Greenock MSP and party whip.", W("Stuart McMillan"));
  M("Bruce Crawford",     "SNP", "e6", ["whip","leader"],          [46,48,50,48,50], "Veteran business manager of the Holyrood group.", W("Bruce Crawford"));
  M("Linda Fabiani",      "SNP", "e6", ["culture","foreign"],      [46,46,48,46,42], "Former minister and deputy presiding officer.", W("Linda Fabiani"));
  M("Tricia Marwick",     "SNP", "e6", ["leader","whip"],          [48,48,50,48,48], "The first woman Presiding Officer of the Scottish Parliament.", W("Tricia Marwick"));
  M("Stewart Stevenson",  "SNP", "e6", ["transport","environment"],[44,46,48,44,40], "Former transport and climate minister.", W("Stewart Stevenson"));
  /* Westminster group */
  M("Tommy Sheppard",     "SNP", "e7", ["leader","culture"],       [52,42,58,46,42], "Edinburgh MP and former comedy-club owner.", W("Tommy Sheppard"));
  M("Alyn Smith",         "SNP", "e7", ["foreign"],               [50,46,54,48,42], "Former MEP and Westminster foreign-affairs spokesman.", W("Alyn Smith"));
  M("Stewart Hosie",      "SNP", "e6", ["chancellor","deputy"],    [50,48,54,48,46], "Former depute leader and Treasury spokesman.", W("Stewart Hosie"));
  M("Stewart McDonald",   "SNP", "e7", ["defence","foreign"],      [50,40,54,46,40], "Defence spokesman with a hawkish line on Russia.", W("Stewart McDonald (politician)"));
  M("Angus MacNeil",      "SNP", "e7", ["environment","foreign"],  [48,44,52,42,38], "Na h-Eileanan an Iar MP, later an independent.", W("Angus MacNeil"));
  M("Drew Hendry",        "SNP", "e7", ["business","work"],        [46,42,50,44,40], "Inverness MP and economy spokesman.", W("Drew Hendry"));
  M("Kirsty Blackman",    "SNP", "e7", ["chancellor"],            [48,40,50,46,40], "Aberdeen MP and former Treasury lead.", W("Kirsty Blackman"));
  M("Alison Thewliss",    "SNP", "e7", ["chancellor","work"],      [48,40,52,46,40], "Glasgow MP and welfare campaigner.", W("Alison Thewliss"));
  M("Carol Monaghan",     "SNP", "e7", ["education","defence"],    [46,40,50,44,40], "Glasgow MP and former physics teacher.", W("Carol Monaghan"));
  M("Anne McLaughlin",    "SNP", "e7", ["justice","foreign"],      [46,40,52,42,38], "Glasgow MP and equalities campaigner.", W("Anne McLaughlin"));
  M("Brendan O'Hara",     "SNP", "e7", ["foreign","defence"],      [46,42,50,44,40], "Argyll MP and foreign-affairs spokesman.", W("Brendan O'Hara"));
  /* the long history */
  M("Robert McIntyre",    "SNP", "e3", ["leader","health"],        [50,48,56,48,50], "Won the SNP's first parliamentary seat, at Motherwell in 1945.", W("Robert McIntyre (politician)"));
  M("William Wolfe",      "SNP", "e4", ["leader"],                [50,44,56,44,50], "'Billy' Wolfe, who rebuilt the SNP as its 1960s–70s leader.", W("Billy Wolfe"));
  M("Arthur Donaldson",   "SNP", "e4", ["leader"],                [48,44,52,42,48], "Wartime-era SNP leader.", W("Arthur Donaldson"));
  M("Gordon Wilson",      "SNP", "e5", ["leader","chancellor"],    [50,48,56,48,52], "Dundee MP and long-serving party leader.", W("Gordon Wilson (Scottish politician)"));
  M("Donald Stewart",     "SNP", "e5", ["leader","foreign"],       [50,48,54,46,50], "The party's Westminster leader through the 1970s and 80s.", W("Donald Stewart (politician)"));
  M("George Reid",        "SNP", "e6", ["leader","foreign"],       [52,48,56,50,48], "Broadcaster and Presiding Officer of the Scottish Parliament.", W("George Reid (Scottish politician)"));
  M("Margaret Ewing",     "SNP", "e5", ["leader","foreign"],       [52,46,56,46,48], "Senior MP and MSP of the Ewing dynasty.", W("Margaret Ewing"));
  M("Andrew Welsh",       "SNP", "e5", ["chancellor","leader"],    [48,46,50,46,48], "Angus MP and MSP and local-government expert.", W("Andrew Welsh"));
  /* the indy-minded famous (aligned; hidden from a serious draft, alive in the dynasty) */
  M("Alan Cumming",       "SNP", "e7", ["culture","foreign"],      [70,18,72,28,30], "Actor and an outspoken supporter of Scottish independence.", N("Alan Cumming"));
  M("Brian Cox",          "SNP", "e7", ["leader","defence"],       [74,22,78,32,32], "'Succession' star and a vocal independence supporter.", N("Brian Cox (actor)"));
  M("Martin Compston",    "SNP", "e7", ["home","culture"],         [68,16,62,24,28], "'Line of Duty' actor and independence supporter.", N("Martin Compston"));
  M("Elaine C. Smith",    "SNP", "e7", ["culture","health"],       [66,20,66,26,30], "Comedian, actor and long-standing independence campaigner.", N("Elaine C. Smith"));
  M("Limmy",              "SNP", "e7", ["culture"],               [64,14,62,18,24], "Brian Limond — surreal Scottish comedian and streamer.", N("Limmy"));
  M("Pat Kane",           "SNP", "e7", ["culture","education"],    [60,22,64,30,28], "Hue and Cry singer and independence essayist.", N("Pat Kane"));
  M("Eddi Reader",        "SNP", "e7", ["culture"],               [62,18,60,22,26], "Fairground Attraction singer and independence supporter.", N("Eddi Reader"));
  M("Irvine Welsh",       "SNP", "e7", ["culture"],               [62,20,64,26,24], "'Trainspotting' author and independence supporter.", N("Irvine Welsh"));
  M("Val McDermid",       "SNP", "e7", ["justice","culture"],      [60,24,62,32,28], "Crime novelist and independence supporter.", N("Val McDermid"));
  M("Dougie MacLean",     "SNP", "e7", ["culture","environment"],  [58,20,56,24,26], "Folk musician who wrote 'Caledonia'.", N("Dougie MacLean"));

  /* =========================================================================
     REFORM lineage — UKIP, the Brexit Party, Reform UK, the Referendum Party,
     and the wider Leave-minded world
     ========================================================================= */
  M("James Goldsmith",    "Referendum Party", "e6", ["business","chancellor","leader"], [60,42,64,52,44], "Billionaire financier who founded the Referendum Party in 1997.", W("James Goldsmith"));
  M("Roger Knapman",      "UKIP", "e6", ["leader","whip"],          [46,46,50,46,48], "Former Conservative MP who led UKIP to its 2004 breakthrough.", W("Roger Knapman"));
  M("Gerard Batten",      "UKIP", "e7", ["leader","home"],          [44,42,52,38,42], "A founder member who later led UKIP.", W("Gerard Batten"));
  M("Lord Pearson",       "UKIP", "e6", ["leader","foreign"],       [44,46,50,44,42], "Malcolm Pearson, businessman peer and former UKIP leader.", W("Malcolm Pearson, Baron Pearson of Rannoch"));
  M("Godfrey Bloom",      "UKIP", "e6", ["chancellor","business"],  [44,40,54,40,34], "Outspoken former UKIP MEP and City fund manager.", W("Godfrey Bloom"));
  M("Patrick O'Flynn",    "UKIP", "e6", ["chancellor","culture"],   [48,42,56,46,40], "Journalist who became UKIP's economics spokesman and an MEP.", W("Patrick O'Flynn"));
  M("Steven Woolfe",      "UKIP", "e6", ["justice","business"],     [48,40,54,44,38], "Barrister and MEP once tipped to lead UKIP.", W("Steven Woolfe"));
  M("Bill Etheridge",     "UKIP", "e6", ["culture"],               [44,38,52,38,36], "West Midlands MEP and leadership contender.", W("Bill Etheridge"));
  M("Bob Spink",          "UKIP", "e6", ["health"],               [44,42,48,44,40], "The first MP to sit for UKIP, in 2008.", W("Bob Spink"));
  M("Roger Helmer",       "UKIP", "e6", ["business","environment"], [44,42,50,44,38], "Conservative-turned-UKIP MEP and energy spokesman.", W("Roger Helmer"));
  M("David Campbell Bannerman","UKIP","e6",["foreign","leader"],    [46,44,52,46,40], "Former UKIP deputy leader who returned to the Conservatives.", W("David Campbell Bannerman"));
  M("Marta Andreasen",    "UKIP", "e6", ["chancellor"],            [46,46,48,50,38], "EU whistle-blowing chief accountant turned UKIP MEP.", W("Marta Andreasen"));
  M("William Dartmouth",  "UKIP", "e6", ["foreign","business"],     [44,42,48,46,38], "The Earl of Dartmouth, UKIP trade spokesman and MEP.", W("William Legge, 10th Earl of Dartmouth"));
  M("Tim Aker",           "UKIP", "e6", ["business"],              [44,36,48,40,38], "Essex MEP and party policy chief.", W("Tim Aker"));
  M("Jonathan Arnott",    "UKIP", "e6", ["education"],             [42,36,46,42,36], "North East MEP and former maths teacher.", W("Jonathan Arnott"));
  M("Jane Collins",       "UKIP", "e6", ["work"],                  [42,36,46,38,36], "Yorkshire MEP and welfare spokeswoman.", W("Jane Collins"));
  M("Stuart Agnew",       "UKIP", "e6", ["environment"],           [42,38,46,38,36], "Norfolk farmer and agriculture-spokesman MEP.", W("Stuart Agnew"));
  M("Mike Hookem",        "UKIP", "e6", ["defence"],               [42,38,46,38,36], "Yorkshire MEP and defence spokesman.", W("Mike Hookem"));
  M("Ray Finch",          "UKIP", "e6", ["transport"],             [40,36,44,38,34], "South East MEP.", W("Ray Finch"));
  M("Julia Reid",         "UKIP", "e6", ["education"],             [42,36,44,40,34], "South West MEP and scientist.", W("Julia Reid"));
  M("James Carver",       "UKIP", "e6", ["foreign"],               [42,38,46,40,36], "West Midlands MEP and foreign-affairs spokesman.", W("James Carver"));
  M("Nathan Gill",        "UKIP", "e6", ["foreign"],               [42,36,46,36,36], "Former leader of UKIP in Wales and an MEP.", W("Nathan Gill"));
  /* Brexit Party 2019 intake */
  M("Annunziata Rees-Mogg","Brexit Party", "e7", ["business","culture"], [52,34,54,44,38], "Broadcaster and 2019 Brexit Party MEP; Jacob's sister.", W("Annunziata Rees-Mogg"));
  M("Lance Forman",       "Brexit Party", "e7", ["business"],       [48,36,50,46,38], "Salmon-smokehouse owner and London MEP.", W("Lance Forman"));
  M("June Mummery",       "Brexit Party", "e7", ["environment"],    [46,32,50,40,38], "Lowestoft fishing-industry campaigner and MEP.", W("June Mummery"));
  M("John Longworth",     "Brexit Party", "e7", ["business","chancellor"], [48,42,52,48,40], "Former British Chambers of Commerce chief and MEP.", W("John Longworth"));
  M("Martin Daubney",     "Brexit Party", "e7", ["culture"],        [48,34,54,40,36], "Journalist, broadcaster and 2019 MEP.", W("Martin Daubney"));
  M("Brian Monteith",     "Brexit Party", "e7", ["chancellor"],     [46,42,50,46,40], "Former Scottish Tory MSP and Brexit Party MEP.", W("Brian Monteith"));
  M("Belinda de Lucy",    "Brexit Party", "e7", ["education"],      [46,30,50,38,36], "South East MEP.", W("Belinda de Lucy"));
  M("David Bull",         "Reform UK",    "e7", ["health","leader"], [54,34,58,42,40], "Doctor, broadcaster and a former Reform UK leader.", W("David Bull"));
  /* Reform UK */
  M("Zia Yusuf",          "Reform UK", "e7", ["business","chancellor"], [54,32,56,52,42], "Entrepreneur and former Reform UK chairman.", W("Zia Yusuf"));
  M("Ben Habib",          "Reform UK", "e7", ["business","chancellor"], [50,40,56,48,40], "Property entrepreneur and former Reform UK deputy leader.", W("Ben Habib"));
  M("James McMurdock",    "Reform UK", "e7", ["business"],          [44,28,48,40,36], "One of Reform UK's first MPs.", W("James McMurdock"));
  M("Sarah Pochin",       "Reform UK", "e7", ["justice","home"],    [46,30,48,42,38], "Reform UK by-election winner and former magistrate.", W("Sarah Pochin"));
  M("Howard Cox",         "Reform UK", "e7", ["transport"],         [44,34,48,40,36], "FairFuel campaigner and Reform UK London mayoral candidate.", W("Howard Cox"));
  /* aligned Leave-minded (hidden from a serious draft, alive in the dynasty) */
  M("Arron Banks",        "Reform UK", "e7", ["business","chancellor"], [44,34,50,42,36], "Insurance businessman and Leave.EU co-founder.", N("Arron Banks"));
  M("Tim Martin",         "Reform UK", "e7", ["business"],          [50,38,54,46,40], "Wetherspoons founder and prominent Brexit advocate.", N("Tim Martin (businessman)"));
  M("Julia Hartley-Brewer","Reform UK", "e7", ["leader","culture"], [54,30,64,38,32], "Talk-radio host and combative Brexit-era commentator.", N("Julia Hartley-Brewer"));
  M("Isabel Oakeshott",   "Reform UK", "e7", ["culture","home"],    [50,32,56,42,34], "Political journalist and Brexit advocate.", N("Isabel Oakeshott"));
  M("Rod Liddle",         "Reform UK", "e7", ["culture"],           [48,32,56,36,30], "Provocative newspaper columnist.", N("Rod Liddle"));
  M("Toby Young",         "Reform UK", "e7", ["education","culture"],[46,30,54,38,32], "Journalist and free-speech campaigner.", N("Toby Young"));
  M("Darren Grimes",      "Reform UK", "e7", ["culture"],           [46,26,52,34,30], "Young right-wing commentator and broadcaster.", N("Darren Grimes"));

  /* =========================================================================
     GREEN — England & Wales, the Scottish Greens, the MEPs, and the eco-famous
     ========================================================================= */
  M("Zack Polanski",      "Green", "e7", ["leader","culture"],      [60,34,66,42,44], "Eco-populist leader of the Green Party of England and Wales.", W("Zack Polanski"));
  M("Ellie Chowns",       "Green", "e7", ["foreign","environment"], [52,34,56,46,40], "Green MP elected in 2024 and former academic.", W("Ellie Chowns"));
  M("Jenny Jones",        "Green", "e6", ["transport","justice"],    [50,44,54,46,40], "Baroness Jones of Moulsecoomb; the Greens' voice in the Lords.", W("Jenny Jones, Baroness Jones of Moulsecoomb"));
  M("Amelia Womack",      "Green", "e7", ["work","health"],         [54,32,58,40,40], "Long-serving former deputy leader.", W("Amelia Womack"));
  M("Shahrar Ali",        "Green", "e7", ["justice","foreign"],     [48,32,54,40,36], "Former deputy leader and party spokesman.", W("Shahrar Ali"));
  M("Magid Magid",        "Green", "e7", ["culture","foreign"],     [58,28,58,36,36], "Former Lord Mayor of Sheffield and a Yorkshire MEP.", W("Magid Magid"));
  M("Jean Lambert",       "Green", "e6", ["work","foreign"],        [50,46,52,46,40], "Long-serving London Green MEP.", W("Jean Lambert"));
  M("Keith Taylor",       "Green", "e6", ["environment","transport"],[48,42,50,44,38], "South East England Green MEP.", W("Keith Taylor (politician)"));
  M("Scott Ainslie",      "Green", "e7", ["transport","environment"],[46,30,50,38,36], "London Green MEP in the 2019 intake.", W("Scott Ainslie"));
  M("Gina Dowding",       "Green", "e7", ["environment"],           [46,32,50,40,36], "North West England Green MEP.", W("Gina Dowding"));
  M("Catherine Rowett",   "Green", "e7", ["education"],             [46,34,50,42,36], "Philosopher and East of England Green MEP.", W("Catherine Rowett"));
  M("Rupert Read",        "Green", "e7", ["environment","education"],[48,36,56,42,34], "Philosopher, climate campaigner and former party spokesman.", W("Rupert Read"));
  M("Derek Wall",         "Green", "e6", ["work","environment"],    [46,38,54,40,34], "Eco-socialist academic and former principal speaker.", W("Derek Wall"));
  M("Sara Parkin",        "Green", "e5", ["leader","environment"],  [50,40,56,44,40], "A leading figure of the party's 1989 'Green surge'.", W("Sara Parkin"));
  /* Scottish Greens */
  M("Patrick Harvie",     "Green", "e6", ["leader","environment"],  [56,44,62,46,46], "Long-time co-leader of the Scottish Greens and a Holyrood minister.", W("Patrick Harvie"));
  M("Lorna Slater",       "Green", "e7", ["business","environment"],[52,36,54,44,42], "Scottish Greens co-leader and former circular-economy minister.", W("Lorna Slater"));
  M("Ross Greer",         "Green", "e7", ["education","culture"],    [56,32,62,42,40], "Scotland's youngest-ever parliamentarian and a Green MSP.", W("Ross Greer"));
  M("Maggie Chapman",     "Green", "e7", ["justice","work"],        [50,34,56,40,38], "Scottish Greens MSP and rights campaigner.", W("Maggie Chapman"));
  M("Mark Ruskell",       "Green", "e7", ["environment","transport"],[48,36,52,42,38], "Mid-Scotland Green MSP.", W("Mark Ruskell"));
  M("Gillian Mackay",     "Green", "e7", ["health"],               [48,32,52,40,38], "Green MSP who led on buffer-zone legislation.", W("Gillian Mackay"));
  M("Robin Harper",       "Green", "e6", ["education","environment"],[54,40,56,42,40], "The first Green parliamentarian in the UK, elected to Holyrood in 1999.", W("Robin Harper"));
  M("Andy Wightman",      "Green", "e6", ["business","environment"],[50,40,54,48,36], "Land-reform writer and former Green MSP.", W("Andy Wightman"));
  /* aligned eco / left-green famous (hidden from a serious draft, alive in the dynasty) */
  M("Chris Packham",      "Green", "e7", ["environment","education"],[68,28,66,40,34], "Naturalist, broadcaster and combative wildlife campaigner.", N("Chris Packham"));
  M("George Monbiot",     "Green", "e7", ["environment","work"],     [58,30,66,40,30], "Guardian columnist and radical environmental writer.", N("George Monbiot"));
  M("Hugh Fearnley-Whittingstall","Green","e7",["environment","health"],[60,26,58,38,34], "Chef and campaigner on food, fishing and waste.", N("Hugh Fearnley-Whittingstall"));
  M("Dale Vince",         "Green", "e7", ["business","environment"], [54,30,54,46,38], "Ecotricity founder and green-energy entrepreneur.", N("Dale Vince"));
  M("Vivienne Westwood",  "Green", "e7", ["culture","environment"],  [64,26,58,32,32], "Punk fashion designer and climate activist.", N("Vivienne Westwood"));
  M("Brian Eno",          "Green", "e7", ["culture","environment"],  [58,28,56,36,30], "Ambient-music pioneer, producer and political activist.", N("Brian Eno"));
  M("Satish Kumar",       "Green", "e6", ["environment","education"],[54,30,58,34,30], "Peace pilgrim and editor who shaped British green thought.", N("Satish Kumar"));
  M("Stanley Johnson",    "Green", "e7", ["environment","foreign"],  [52,34,54,40,34], "Environmentalist author and former MEP — and Boris's father.", N("Stanley Johnson"));

  /* =========================================================================
     PLAID CYMRU — the Senedd, Westminster, the history, and famous Welsh voices
     ========================================================================= */
  M("Rhun ap Iorwerth",  "Plaid Cymru", "e7", ["leader","health"],   [56,42,62,46,46], "Broadcaster-turned-leader of Plaid Cymru.", W("Rhun ap Iorwerth"));
  M("Liz Saville Roberts","Plaid Cymru", "e7", ["leader","justice"],  [52,42,58,46,42], "Plaid's leader at Westminster.", W("Liz Saville Roberts"));
  M("Ben Lake",          "Plaid Cymru", "e7", ["business","environment"],[50,36,54,44,38], "Ceredigion MP.", W("Ben Lake"));
  M("Elin Jones",        "Plaid Cymru", "e6", ["leader","environment"],[52,46,56,48,46], "Llywydd (Presiding Officer) of the Senedd and former minister.", W("Elin Jones"));
  M("Ieuan Wyn Jones",   "Plaid Cymru", "e6", ["leader","deputy"],    [50,46,54,48,48], "Former party leader and deputy first minister of Wales.", W("Ieuan Wyn Jones"));
  M("Helen Mary Jones",  "Plaid Cymru", "e6", ["work","education"],   [50,40,56,42,40], "Veteran Plaid Senedd member.", W("Helen Mary Jones"));
  M("Llyr Gruffydd",     "Plaid Cymru", "e7", ["environment","chancellor"],[48,38,52,44,40], "North Wales Senedd member and finance lead.", W("Llyr Gruffydd"));
  M("Siân Gwenllian",    "Plaid Cymru", "e7", ["education","culture"],[48,38,52,42,40], "Arfon Senedd member and education spokeswoman.", W("Siân Gwenllian"));
  M("Cefin Campbell",    "Plaid Cymru", "e7", ["education","environment"],[46,36,50,42,38], "Mid and West Wales Senedd member.", W("Cefin Campbell"));
  M("Heledd Fychan",     "Plaid Cymru", "e7", ["culture"],          [46,34,50,40,38], "South Wales Central Senedd member.", W("Heledd Fychan"));
  M("Delyth Jewell",     "Plaid Cymru", "e7", ["justice","foreign"], [48,34,54,40,38], "South Wales East Senedd member.", W("Delyth Jewell"));
  M("Mabon ap Gwynfor",  "Plaid Cymru", "e7", ["health"],           [46,34,50,40,38], "Dwyfor Meirionnydd Senedd member; Gwynfor Evans's grandson.", W("Mabon ap Gwynfor"));
  M("Peredur Owen Griffiths","Plaid Cymru","e7",["chancellor"],     [46,34,50,42,38], "South Wales East Senedd member and finance spokesman.", W("Peredur Owen Griffiths"));
  M("Luke Fletcher",     "Plaid Cymru", "e7", ["business","work"],   [46,32,50,40,38], "South Wales West Senedd member and economy spokesman.", W("Luke Fletcher"));
  M("Cynog Dafis",       "Plaid Cymru", "e6", ["environment","education"],[48,40,52,44,38], "Ceredigion MP on a joint Plaid–Green ticket in 1992.", W("Cynog Dafis"));
  M("Simon Thomas",      "Plaid Cymru", "e6", ["chancellor","environment"],[46,38,50,44,38], "Former MP and Senedd member.", W("Simon Thomas (Welsh politician)"));
  M("Jill Evans",        "Plaid Cymru", "e6", ["foreign","environment"],[48,42,52,44,40], "Long-serving Plaid MEP for Wales.", W("Jill Evans"));
  M("Eurfyl ap Gwilym",  "Plaid Cymru", "e6", ["chancellor","business"],[46,44,48,50,38], "Economist and the party's long-time finance brain.", W("Eurfyl ap Gwilym"));
  M("Phil Williams",     "Plaid Cymru", "e5", ["education","environment"],[48,42,52,46,38], "Physicist and influential Plaid strategist and AM.", W("Phil Williams (politician)"));
  M("Dafydd Iwan",       "Plaid Cymru", "e6", ["culture","leader"],  [58,32,62,38,42], "Folk singer of 'Yma o Hyd' and a former president of Plaid Cymru.", W("Dafydd Iwan"));
  /* aligned Welsh voices (hidden from a serious draft, alive in the dynasty) */
  M("Michael Sheen",     "Plaid Cymru", "e7", ["leader","culture","health"],[74,24,80,40,38], "Actor and activist, a passionate champion of Welsh identity and public services.", N("Michael Sheen"));
  M("Charlotte Church",  "Plaid Cymru", "e7", ["culture","health"],  [64,20,62,28,30], "Singer and left-wing activist.", N("Charlotte Church"));
  M("Cerys Matthews",    "Plaid Cymru", "e7", ["culture"],          [62,22,60,28,30], "Catatonia singer and broadcaster.", N("Cerys Matthews"));
  M("Rhys Ifans",        "Plaid Cymru", "e7", ["culture"],          [62,18,58,24,26], "Welsh actor and supporter of Welsh language and culture.", N("Rhys Ifans"));
  M("Nicky Wire",        "Plaid Cymru", "e7", ["culture"],          [58,20,56,26,28], "Manic Street Preachers lyricist and bassist.", N("Nicky Wire"));
  M("Gruff Rhys",        "Plaid Cymru", "e7", ["culture"],          [58,20,56,26,26], "Super Furry Animals frontman and Welsh-language artist.", N("Gruff Rhys"));
  M("Tom Jones",         "Plaid Cymru", "e5", ["culture"],          [74,22,62,22,28], "'It's Not Unusual' — the voice of the Valleys.", N("Tom Jones"));
  M("Shirley Bassey",    "Plaid Cymru", "e4", ["culture","foreign"], [72,24,66,26,30], "Cardiff-born diva of the Bond theme.", N("Shirley Bassey"));
  M("Bryn Terfel",       "Plaid Cymru", "e7", ["culture"],          [62,24,60,28,30], "World-renowned Welsh bass-baritone.", N("Bryn Terfel"));
  M("Katherine Jenkins", "Plaid Cymru", "e7", ["culture"],          [62,18,56,24,28], "Welsh mezzo-soprano and crossover star.", N("Katherine Jenkins"));

  /* =========================================================================
     SINN FÉIN — the Dáil and Stormont benches, the historic tradition, culture
     ========================================================================= */
  M("Pearse Doherty",    "Sinn Féin", "e7", ["chancellor","business"],[54,42,62,48,44], "The party's sharp finance spokesman in the Dáil.", W("Pearse Doherty"));
  M("Eoin Ó Broin",      "Sinn Féin", "e7", ["business","work"],     [52,40,58,46,40], "Housing spokesman and author.", W("Eoin Ó Broin"));
  M("Conor Murphy",      "Sinn Féin", "e7", ["business","chancellor"],[48,44,52,48,44], "Stormont economy minister and senior negotiator.", W("Conor Murphy"));
  M("John O'Dowd",       "Sinn Féin", "e7", ["transport","education"],[46,42,50,46,42], "Stormont minister and long-serving MLA.", W("John O'Dowd"));
  M("Caoimhe Archibald", "Sinn Féin", "e7", ["chancellor","business"],[48,36,52,46,40], "Stormont finance minister.", W("Caoimhe Archibald"));
  M("Deirdre Hargey",    "Sinn Féin", "e7", ["communities","health"],[46,36,50,44,40], "Stormont communities minister and former Belfast Lord Mayor.", W("Deirdre Hargey"));
  M("Alex Maskey",       "Sinn Féin", "e6", ["leader","whip"],       [48,44,52,46,46], "First Sinn Féin Lord Mayor of Belfast and a Stormont Speaker.", W("Alex Maskey"));
  M("Gerry Kelly",       "Sinn Féin", "e6", ["justice","home"],      [46,42,52,42,42], "Veteran Belfast MLA and policing spokesman.", W("Gerry Kelly (Irish republican)"));
  M("Martina Anderson",  "Sinn Féin", "e6", ["foreign","justice"],   [48,38,54,42,40], "Former MEP and MLA.", W("Martina Anderson"));
  M("Caoimhghín Ó Caoláin","Sinn Féin","e6",["health","leader"],    [48,44,52,46,44], "The party's first modern Dáil TD and group leader.", W("Caoimhghín Ó Caoláin"));
  M("Matt Carthy",       "Sinn Féin", "e7", ["environment","foreign"],[48,38,52,44,40], "TD and former MEP, agriculture spokesman.", W("Matt Carthy"));
  M("Louise O'Reilly",   "Sinn Féin", "e7", ["work","business"],     [48,36,54,44,40], "TD and enterprise and workers'-rights spokeswoman.", W("Louise O'Reilly"));
  M("David Cullinane",   "Sinn Féin", "e7", ["health"],            [48,38,54,44,40], "TD and health spokesman.", W("David Cullinane"));
  M("Aengus Ó Snodaigh", "Sinn Féin", "e7", ["culture","defence"],   [46,40,50,42,40], "Long-serving Dublin TD and Gaeilge advocate.", W("Aengus Ó Snodaigh"));
  M("Rose Conway-Walsh", "Sinn Féin", "e7", ["education","business"],[46,36,50,44,40], "Mayo TD and further-education spokeswoman.", W("Rose Conway-Walsh"));
  M("Padraig Mac Lochlainn","Sinn Féin","e7",["foreign","defence"],  [46,38,50,42,40], "Donegal TD and group whip.", W("Pádraig Mac Lochlainn"));
  M("Imelda Munster",    "Sinn Féin", "e7", ["transport"],          [46,36,50,42,40], "Louth TD and transport spokeswoman.", W("Imelda Munster"));
  M("Sean Crowe",        "Sinn Féin", "e7", ["foreign"],            [44,38,48,42,40], "Dublin South-West TD.", W("Seán Crowe"));
  M("Chris Hazzard",     "Sinn Féin", "e7", ["foreign","transport"], [46,36,50,42,40], "South Down MP.", W("Chris Hazzard"));
  M("John Finucane",     "Sinn Féin", "e7", ["justice","leader"],    [54,36,58,46,42], "North Belfast MP, solicitor and former Belfast Lord Mayor.", W("John Finucane"));
  M("Michelle Gildernew","Sinn Féin", "e6", ["environment","health"],[48,42,52,44,42], "Long-serving Fermanagh & South Tyrone MP and MLA.", W("Michelle Gildernew"));
  M("Pat Doherty",       "Sinn Féin", "e6", ["leader"],            [46,42,48,44,44], "Former West Tyrone MP and party vice-president.", W("Pat Doherty (Irish republican)"));
  /* the historic tradition (the electoral and commemorated record) */
  M("Constance Markievicz","Sinn Féin","e3",["leader","work"],      [62,38,66,40,42], "The first woman elected to the Commons (1918) and a Dáil minister.", W("Constance Markievicz"));
  M("Arthur Griffith",   "Sinn Féin", "e2", ["leader","foreign"],    [58,42,62,46,44], "Founder of Sinn Féin and a signatory of the 1921 Treaty.", W("Arthur Griffith"));
  M("Pádraig Pearse",    "Sinn Féin", "e2", ["leader","education"],  [60,32,72,36,38], "Teacher, writer and leader of the 1916 Rising.", W("Patrick Pearse"));
  M("James Connolly",    "Sinn Féin", "e2", ["work","defence"],      [58,34,66,38,42], "Socialist leader and trade-union organiser of 1916.", W("James Connolly"));
  M("Terence MacSwiney", "Sinn Féin", "e3", ["leader","justice"],    [54,30,62,34,38], "Lord Mayor of Cork who died on hunger strike in 1920.", W("Terence MacSwiney"));
  M("Bobby Sands",       "Sinn Féin", "e5", ["leader","justice"],    [56,22,58,28,36], "Hunger striker elected MP for Fermanagh & South Tyrone in 1981.", W("Bobby Sands"));
  /* aligned Irish cultural voices (hidden from a serious draft, alive in the dynasty) */
  M("Christy Moore",     "Sinn Féin", "e6", ["culture"],            [62,24,62,28,30], "Folk singer long associated with Irish ballad and protest song.", N("Christy Moore"));
  M("Shane MacGowan",    "Sinn Féin", "e6", ["culture"],            [60,18,58,18,24], "The Pogues frontman and chronicler of the Irish diaspora.", N("Shane MacGowan"));
  M("Sinéad O'Connor",   "Sinn Féin", "e6", ["culture","health"],   [64,20,64,24,26], "Singer and outspoken, often controversial, activist.", N("Sinéad O'Connor"));
  M("Liam Neeson",       "Sinn Féin", "e7", ["defence","foreign"],   [70,22,62,30,30], "Ballymena-born Hollywood star.", N("Liam Neeson"));

  /* =========================================================================
     DUP — leaders, ministers, MLAs and the founders
     ========================================================================= */
  M("Gavin Robinson",    "DUP", "e7", ["leader","defence"],       [50,42,56,46,48], "Belfast East MP and leader of the DUP.", W("Gavin Robinson"));
  M("Emma Little-Pengelly","DUP","e7",["deputy","justice"],       [50,38,56,46,44], "Deputy First Minister of Northern Ireland.", W("Emma Little-Pengelly"));
  M("Gregory Campbell",  "DUP", "e6", ["culture","foreign"],      [46,44,52,42,44], "East Londonderry MP and combative party veteran.", W("Gregory Campbell"));
  M("Edwin Poots",       "DUP", "e7", ["environment","health"],   [46,44,50,44,44], "Stormont Speaker and former party leader.", W("Edwin Poots"));
  M("Paul Givan",        "DUP", "e7", ["education"],              [46,40,50,44,42], "Stormont education minister and former First Minister.", W("Paul Givan"));
  M("Diane Dodds",       "DUP", "e7", ["business","foreign"],     [46,42,50,44,42], "Former economy minister and MEP.", W("Diane Dodds"));
  M("Gordon Lyons",      "DUP", "e7", ["communities","business"], [44,38,48,42,42], "Stormont communities minister.", W("Gordon Lyons"));
  M("Carla Lockhart",    "DUP", "e7", ["health","work"],          [46,36,50,42,42], "Upper Bann MP.", W("Carla Lockhart"));
  M("Jim Wells",         "DUP", "e6", ["health"],               [42,42,46,40,42], "Long-serving South Down MLA and former health minister.", W("Jim Wells"));
  M("Michelle McIlveen", "DUP", "e7", ["education","environment"],[44,38,48,42,42], "Stormont minister across several briefs.", W("Michelle McIlveen"));
  M("Peter Weir",        "DUP", "e6", ["education","justice"],     [44,42,48,44,42], "Former education minister and peer.", W("Peter Weir, Baron Weir"));
  M("Mervyn Storey",     "DUP", "e6", ["chancellor","education"],  [44,42,48,42,42], "North Antrim MLA and former finance minister.", W("Mervyn Storey"));
  M("William McCrea",    "DUP", "e5", ["culture","leader"],        [46,42,52,40,44], "Free Presbyterian minister, gospel singer and MP.", W("William McCrea"));
  M("Ian Paisley Jr",    "DUP", "e7", ["foreign","defence"],       [48,40,54,42,42], "North Antrim MP and son of the party's founder.", W("Ian Paisley Jr"));
  M("Jim Shannon",       "DUP", "e7", ["health","environment"],    [44,40,50,42,42], "Strangford MP and the Commons' most prolific contributor.", W("Jim Shannon"));
  M("Joanne Bunting",    "DUP", "e7", ["whip"],                   [44,36,48,42,44], "Belfast East MLA and chief whip.", W("Joanne Bunting"));
  M("Phillip Brett",     "DUP", "e7", ["business"],              [44,34,48,40,42], "North Belfast MLA.", W("Phillip Brett"));
  M("Brian Kingston",    "DUP", "e7", ["communities"],           [42,34,46,40,42], "Belfast MLA and former Lord Mayor.", W("Brian Kingston"));
  M("Maurice Morrow",    "DUP", "e6", ["justice"],               [42,42,46,42,42], "Party veteran and peer.", W("Maurice Morrow, Baron Morrow"));
  M("Nelson McCausland",  "DUP", "e6", ["culture"],              [42,40,48,40,42], "Former Stormont culture and social-development minister.", W("Nelson McCausland"));
  M("Desmond Boal",      "DUP", "e4", ["justice","leader"],        [48,42,56,42,44], "Barrister who co-founded the DUP with Ian Paisley in 1971.", W("Desmond Boal"));

  /* =========================================================================
     UUP — and the historic giants of Ulster unionism
     ========================================================================= */
  M("Mike Nesbitt",      "UUP", "e7", ["leader","health"],        [54,42,62,46,46], "Broadcaster-turned-leader of the Ulster Unionists and health minister.", W("Mike Nesbitt"));
  M("Doug Beattie",      "UUP", "e7", ["defence","leader"],        [52,42,56,46,44], "Decorated soldier and former UUP leader.", W("Doug Beattie"));
  M("Robin Swann",       "UUP", "e7", ["health"],               [52,42,54,48,44], "South Antrim MP and the pandemic-era Stormont health minister.", W("Robin Swann"));
  M("Steve Aiken",       "UUP", "e6", ["defence","business"],     [48,42,52,46,42], "Former Royal Navy submarine commander and party leader.", W("Steve Aiken"));
  M("Reg Empey",         "UUP", "e6", ["business","leader"],       [48,46,52,48,46], "Former party leader and Stormont enterprise minister.", W("Reg Empey"));
  M("Tom Elliott",       "UUP", "e6", ["environment","leader"],    [46,44,50,46,44], "Fermanagh farmer and former party leader.", W("Tom Elliott (politician)"));
  M("Ken Maginnis",      "UUP", "e5", ["defence","justice"],       [48,46,52,46,44], "Former soldier and the party's long-time security spokesman.", W("Ken Maginnis"));
  M("Danny Kennedy",     "UUP", "e6", ["transport","leader"],      [46,42,50,44,42], "Former Stormont regional-development minister.", W("Danny Kennedy"));
  M("Jim Nicholson",     "UUP", "e6", ["foreign","environment"],   [46,44,48,44,42], "Northern Ireland's long-serving Ulster Unionist MEP.", W("Jim Nicholson (Northern Ireland politician)"));
  M("Michael McGimpsey", "UUP", "e6", ["health","culture"],        [46,42,50,44,42], "Former Stormont health minister.", W("Michael McGimpsey"));
  M("Danny Kinahan",     "UUP", "e7", ["defence","foreign"],       [46,40,50,44,42], "Former MP and Northern Ireland Veterans' Commissioner.", W("Danny Kinahan"));
  M("David Burnside",    "UUP", "e6", ["business","foreign"],      [46,42,52,44,40], "Public-relations executive and former MP.", W("David Burnside"));
  M("James Molyneaux",   "UUP", "e5", ["leader","foreign"],        [48,48,50,48,48], "Cautious, long-serving leader of the Ulster Unionists.", W("James Molyneaux"));
  M("Harold McCusker",   "UUP", "e5", ["defence","justice"],       [48,44,54,44,42], "Passionate Upper Bann MP and Anglo-Irish Agreement opponent.", W("Harold McCusker"));
  M("Edward Carson",     "UUP", "e2", ["justice","leader","defence"],[60,52,72,50,52], "Barrister who led Ulster's resistance to Home Rule.", W("Edward Carson"));
  M("James Craig",       "UUP", "e3", ["pm","home"],              [54,50,58,52,54], "Lord Craigavon — the first prime minister of Northern Ireland.", W("James Craig, 1st Viscount Craigavon"));
  M("Basil Brooke",      "UUP", "e4", ["pm","defence"],           [50,48,54,48,50], "Lord Brookeborough — long-serving prime minister of Northern Ireland.", W("Basil Brooke, 1st Viscount Brookeborough"));

  /* =========================================================================
     SDLP — and the constitutional-nationalist tradition it descends from
     ========================================================================= */
  M("Claire Hanna",      "SDLP", "e7", ["leader","foreign"],       [56,40,62,46,44], "Belfast South MP and leader of the SDLP.", W("Claire Hanna"));
  M("Matthew O'Toole",   "SDLP", "e7", ["leader","chancellor"],    [52,36,58,46,42], "Leader of the Opposition at Stormont and former Treasury official.", W("Matthew O'Toole"));
  M("Mark H. Durkan",    "SDLP", "e7", ["environment","justice"],  [48,40,52,44,42], "Foyle MLA and former environment minister.", W("Mark H. Durkan"));
  M("Patsy McGlone",     "SDLP", "e6", ["culture","environment"],  [46,42,48,44,42], "Mid Ulster MLA and party veteran.", W("Patsy McGlone"));
  M("Sinéad McLaughlin", "SDLP", "e7", ["business","work"],        [46,36,50,42,40], "Foyle MLA and economy spokeswoman.", W("Sinéad McLaughlin"));
  M("Daniel McCrossan",  "SDLP", "e7", ["chancellor"],            [44,34,50,42,40], "West Tyrone MLA.", W("Daniel McCrossan"));
  M("Cara Hunter",       "SDLP", "e7", ["culture"],               [48,30,52,38,38], "East Londonderry MLA.", W("Cara Hunter"));
  M("Justin McNulty",    "SDLP", "e7", ["sport"],                 [46,34,48,40,40], "Newry & Armagh MLA and former Gaelic footballer.", W("Justin McNulty"));
  M("Margaret Ritchie",  "SDLP", "e6", ["leader","environment"],   [48,44,52,44,42], "Former party leader and South Down MP.", W("Margaret Ritchie"));
  M("Alasdair McDonnell","SDLP", "e6", ["leader","health"],        [46,44,50,44,42], "Doctor and former party leader and MP.", W("Alasdair McDonnell"));
  M("Eddie McGrady",     "SDLP", "e5", ["chancellor","business"],  [48,44,50,46,42], "South Down MP who unseated Enoch Powell.", W("Eddie McGrady"));
  M("Joe Hendron",       "SDLP", "e5", ["health"],               [46,42,48,42,40], "Doctor and former West Belfast MP.", W("Joe Hendron"));
  M("Brid Rodgers",      "SDLP", "e5", ["environment","leader"],   [48,44,52,44,42], "Former Stormont agriculture minister and senior party figure.", W("Bríd Rodgers"));
  M("Sean Farren",       "SDLP", "e6", ["chancellor","education"], [46,44,48,46,40], "Former Stormont finance and employment minister.", W("Seán Farren"));
  M("Dolores Kelly",     "SDLP", "e6", ["justice","work"],         [44,40,48,42,40], "Upper Bann MLA and party veteran.", W("Dolores Kelly"));
  M("Alban Maginness",   "SDLP", "e6", ["justice","leader"],       [46,42,50,44,40], "The first nationalist Lord Mayor of Belfast.", W("Alban Maginness"));
  M("Denis Haughey",     "SDLP", "e5", ["foreign"],               [44,42,46,44,40], "Founder member and former junior minister.", W("Denis Haughey"));
  M("Paddy Devlin",      "SDLP", "e4", ["work","leader"],          [50,44,56,42,42], "Trade-unionist co-founder of the SDLP.", W("Paddy Devlin"));
  /* constitutional-nationalist forebears */
  M("Charles Stewart Parnell","SDLP","e1",["leader","foreign"],    [62,48,70,50,50], "'The uncrowned king of Ireland' and Home Rule leader.", W("Charles Stewart Parnell"));
  M("John Redmond",      "SDLP", "e2", ["leader","foreign"],       [54,48,62,48,48], "Leader of the Irish Parliamentary Party at Westminster.", W("John Redmond"));
  M("Isaac Butt",        "SDLP", "e1", ["justice","leader"],       [52,46,58,46,44], "Barrister who founded the Home Rule movement.", W("Isaac Butt"));
  M("John Dillon",       "SDLP", "e2", ["leader","foreign"],       [50,46,56,46,44], "Last leader of the Irish Parliamentary Party.", W("John Dillon"));

  /* =========================================================================
     ALLIANCE — the cross-community centre, its founders and leaders
     ========================================================================= */
  M("Naomi Long",        "Alliance", "e7", ["leader","justice"],   [58,44,64,48,48], "Leader of Alliance and Northern Ireland's justice minister.", W("Naomi Long"));
  M("Andrew Muir",       "Alliance", "e7", ["environment","business"],[50,38,52,46,42], "Stormont agriculture and environment minister.", W("Andrew Muir"));
  M("Sorcha Eastwood",   "Alliance", "e7", ["culture","justice"],  [54,34,58,42,42], "Lagan Valley MP.", W("Sorcha Eastwood"));
  M("Stephen Farry",     "Alliance", "e6", ["business","education"],[50,42,54,48,42], "Former North Down MP and Stormont employment minister.", W("Stephen Farry"));
  M("Kellie Armstrong",  "Alliance", "e7", ["transport","work"],   [48,38,52,44,44], "Strangford MLA and chief whip.", W("Kellie Armstrong"));
  M("Eóin Tennyson",     "Alliance", "e7", ["chancellor"],         [50,30,52,42,42], "Upper Bann MLA and one of Stormont's youngest members.", W("Eóin Tennyson"));
  M("Paula Bradshaw",    "Alliance", "e7", ["health","communities"],[48,36,52,42,42], "South Belfast MLA.", W("Paula Bradshaw"));
  M("Nuala McAllister",  "Alliance", "e7", ["foreign"],            [50,34,54,42,42], "North Belfast MLA and former Lord Mayor.", W("Nuala McAllister"));
  M("John Blair",        "Alliance", "e7", ["environment"],        [46,36,50,42,42], "South Antrim MLA.", W("John Blair (politician)"));
  M("Connie Egan",       "Alliance", "e7", ["education"],          [46,30,50,38,40], "North Down MLA.", W("Connie Egan"));
  M("Chris Lyttle",      "Alliance", "e6", ["education"],          [46,38,50,42,42], "Former Belfast East MLA.", W("Chris Lyttle"));
  M("Stewart Dickson",   "Alliance", "e6", ["business"],           [44,40,48,42,42], "East Antrim MLA.", W("Stewart Dickson"));
  M("Anna Lo",           "Alliance", "e6", ["foreign","communities"],[50,38,52,42,40], "The first ethnic-minority MLA and a Belfast assembly member.", W("Anna Lo"));
  M("David Ford",        "Alliance", "e6", ["leader","justice"],    [50,44,54,48,46], "Former leader and Northern Ireland's first justice minister in a generation.", W("David Ford"));
  M("John Alderdice",    "Alliance", "e5", ["leader","health"],     [50,46,54,48,46], "Former leader and the first Speaker of the new Stormont Assembly.", W("John Alderdice"));
  M("Oliver Napier",     "Alliance", "e4", ["leader","justice"],    [52,44,56,46,46], "Co-founder and first leader of the Alliance Party.", W("Oliver Napier"));
  M("Eileen Bell",       "Alliance", "e5", ["leader","communities"],[46,42,48,44,42], "Former deputy leader and Assembly Speaker.", W("Eileen Bell"));
  M("Seamus Close",      "Alliance", "e5", ["chancellor","business"],[46,42,50,46,40], "Accountant and former deputy leader.", W("Seamus Close"));

  /* =========================================================================
     TORY — the pre-Conservative tradition (mostly Georgian; counts only when
     the e0 era is enabled, so this enriches era-on and Wildcard play)
     ========================================================================= */
  M("William Pitt the Younger","Tory","e0",["pm","chancellor"],    [60,52,68,58,52], "Became prime minister at twenty-four and dominated the age of revolution.", W("William Pitt the Younger"));
  M("William Pitt the Elder","Tory","e0",["pm","defence","foreign"],[58,52,72,54,50], "The Earl of Chatham, war minister of empire.", W("William Pitt, 1st Earl of Chatham"));
  M("Lord Liverpool",    "Tory", "e1", ["pm","home"],             [50,54,52,56,54], "Robert Jenkinson — prime minister for fifteen years after Waterloo.", W("Robert Jenkinson, 2nd Earl of Liverpool"));
  M("George Canning",    "Tory", "e1", ["pm","foreign"],          [56,50,68,52,46], "Wit, orator and briefly prime minister in 1827.", W("George Canning"));
  M("Lord North",        "Tory", "e0", ["pm","chancellor"],        [48,48,52,48,46], "Prime minister through the loss of the American colonies.", W("Frederick North, Lord North"));
  M("Spencer Perceval",  "Tory", "e1", ["pm","justice"],           [48,46,52,50,46], "The only British prime minister to be assassinated.", W("Spencer Perceval"));
  M("Lord Castlereagh",  "Tory", "e1", ["foreign","defence"],      [48,50,54,54,46], "Foreign secretary who helped redraw Europe at Vienna.", W("Viscount Castlereagh"));
  M("Henry Addington",   "Tory", "e1", ["pm","home"],             [44,46,46,48,46], "Viscount Sidmouth — prime minister during the brief Peace of Amiens.", W("Henry Addington, 1st Viscount Sidmouth"));
  M("Lord Eldon",        "Tory", "e1", ["justice"],               [46,50,50,54,46], "Arch-conservative Lord Chancellor for a quarter-century.", W("John Scott, 1st Earl of Eldon"));
  M("Bolingbroke",       "Tory", "e0", ["foreign","leader"],       [52,46,62,48,44], "Henry St John — Tory statesman and political philosopher.", W("Henry St John, 1st Viscount Bolingbroke"));
  M("Robert Harley",     "Tory", "e0", ["chancellor","leader"],    [48,48,52,52,46], "Earl of Oxford and lord treasurer under Queen Anne.", W("Robert Harley, 1st Earl of Oxford and Earl Mortimer"));

  /* =========================================================================
     THE BRITISH FAR RIGHT — included as record, not endorsement. Every figure
     is flagged (a credibility drag in any cabinet) and hidden from a default
     draft. Real figures only; the notes are deliberately plain.
     ========================================================================= */
  M("Oswald Mosley",     "Union Movement", "e3", ["leader","home"], [40,40,58,30,40], "Former MP who founded the British Union of Fascists in 1932.", F("Oswald Mosley"));
  M("William Joyce",     "Union Movement", "e3", ["foreign"],       [30,24,52,22,26], "BUF organiser who broadcast Nazi propaganda as 'Lord Haw-Haw'; executed for treason.", F("William Joyce"));
  M("Diana Mosley",      "Union Movement", "e3", ["culture"],       [34,24,40,24,28], "A Mitford sister and a leading figure in 1930s British fascism.", F("Diana Mitford"));
  M("Arnold Leese",      "Union Movement", "e3", ["home"],          [26,24,38,22,24], "Founder of the small, virulently antisemitic Imperial Fascist League.", F("Arnold Leese"));
  M("A. K. Chesterton",  "National Front", "e4", ["leader","foreign"],[34,32,48,28,34], "Journalist and a founder of the National Front.", F("A. K. Chesterton"));
  M("Colin Jordan",      "National Front", "e4", ["home"],          [26,24,40,20,26], "Post-war neo-Nazi organiser.", F("Colin Jordan"));
  M("John Bean",         "National Front", "e5", ["business"],      [28,28,38,26,28], "Long-time activist of the post-war far right.", F("John Bean (activist)"));
  M("Martin Webster",    "National Front", "e5", ["whip"],          [30,28,44,24,30], "National Front national activities organiser in the 1970s.", F("Martin Webster (activist)"));
  M("Andrew Fountaine",  "National Front", "e4", ["leader"],        [30,28,40,26,30], "Early National Front figure and financier.", F("Andrew Fountaine"));
  M("Ian Anderson",      "National Front", "e6", ["leader"],        [28,26,38,26,28], "Led a faction of the National Front in the 1990s.", F("Ian Anderson (British politician)"));
  M("John Tyndall",      "British National Party", "e6", ["leader","home"],[34,34,46,28,36], "Founder and long-time leader of the British National Party.", F("John Tyndall (politician)"));
  M("Nick Griffin",      "British National Party", "e7", ["leader","foreign"],[38,36,50,30,38], "Former leader of the British National Party and an MEP for North West England.", F("Nick Griffin"));
  M("Andrew Brons",      "British National Party", "e7", ["education"],[32,30,42,30,30], "Former academic elected as a BNP MEP for Yorkshire in 2009.", F("Andrew Brons"));
  M("Richard Edmonds",   "British National Party", "e6", ["whip"],   [28,28,38,26,30], "Long-serving BNP organiser.", F("Richard Edmonds"));
  M("Derek Beackon",     "British National Party", "e6", ["communities"],[28,24,36,24,28], "Won the BNP's first council seat, in Tower Hamlets in 1993.", F("Derek Beackon"));
  M("Adam Walker",       "British National Party", "e7", ["leader"], [28,26,36,26,30], "Succeeded Nick Griffin as BNP leader.", F("Adam Walker (politician)"));
  M("Eddy Butler",       "British National Party", "e6", ["business"],[28,28,38,28,30], "BNP elections organiser behind its 2000s council gains.", F("Eddy Butler"));
  M("Mark Collett",      "British National Party", "e7", ["culture"],[26,24,40,22,26], "Former BNP youth organiser.", F("Mark Collett"));
  M("Tommy Robinson",    "English Defence League", "e7", ["home","leader"],[40,28,52,24,32], "Stephen Yaxley-Lennon — founder of the English Defence League.", F("Tommy Robinson (activist)"));
  M("Paul Golding",      "Britain First", "e7", ["leader"],         [30,26,42,24,30], "Leader of Britain First.", F("Paul Golding"));
  M("Jayda Fransen",     "Britain First", "e7", ["whip"],           [28,24,40,22,26], "Former deputy leader of Britain First.", F("Jayda Fransen"));

  /* ---- GREEN top-up to clear the floor: more reps, naturalists, eco voices --- */
  M("Caroline Russell",  "Green", "e7", ["transport","environment"],[50,38,52,44,40], "Long-serving Green member of the London Assembly.", W("Caroline Russell"));
  M("Zoe Garbett",       "Green", "e7", ["health"],               [50,30,52,40,38], "Green London Assembly member and mayoral candidate.", W("Zoe Garbett"));
  M("Pippa Heylings",    "Green", "e7", ["environment","business"],[48,32,52,42,40], "Green MP elected in 2024.", W("Pippa Heylings"));
  M("Alexandra Phillips","Green", "e7", ["foreign","environment"], [46,30,50,40,36], "South West England Green MEP in the 2019 intake.", W("Alexandra Phillips (Green politician)"));
  M("Cleo Lake",         "Green", "e7", ["culture","communities"], [48,30,52,38,38], "Former Lord Mayor of Bristol and Green campaigner.", W("Cleo Lake"));
  M("Tony Juniper",      "Green", "e7", ["environment"],          [54,40,56,46,38], "Veteran environmentalist and chair of Natural England.", N("Tony Juniper"));
  M("Feargal Sharkey",   "Green", "e7", ["environment","culture"], [60,28,60,40,34], "Undertones singer turned relentless clean-rivers campaigner.", N("Feargal Sharkey"));
  M("Bill Oddie",        "Green", "e6", ["environment","culture"], [60,26,58,32,30], "Comedian and birdwatcher who fronted 'Springwatch'.", N("Bill Oddie"));
  M("Steve Backshall",   "Green", "e7", ["environment","defence"], [62,26,58,34,32], "Naturalist and 'Deadly 60' adventurer.", N("Steve Backshall"));
  M("Kate Humble",       "Green", "e7", ["environment"],          [60,26,56,34,32], "Wildlife and farming broadcaster.", N("Kate Humble"));
  M("Liz Bonnin",        "Green", "e7", ["environment","education"],[58,26,56,34,30], "Science and natural-history presenter.", N("Liz Bonnin"));
  M("Megan McCubbin",    "Green", "e7", ["environment"],          [56,22,52,30,30], "Zoologist and wildlife presenter.", N("Megan McCubbin"));
  M("Gillian Burke",     "Green", "e7", ["environment"],          [56,24,54,32,30], "Biologist and 'Springwatch' presenter.", N("Gillian Burke"));
  M("Ben Fogle",         "Green", "e7", ["environment","foreign"], [60,28,56,36,34], "Adventurer and broadcaster.", N("Ben Fogle"));
  M("Anita Roddick",     "Green", "e6", ["business","environment"],[60,38,60,44,40], "Body Shop founder and ethical-business pioneer.", N("Anita Roddick"));
  M("Mark Rylance",      "Green", "e7", ["culture"],              [62,24,62,32,30], "Olivier- and Oscar-winning actor and environmental activist.", N("Mark Rylance"));
  M("Thom Yorke",        "Green", "e7", ["culture","environment"], [58,22,54,30,28], "Radiohead frontman and climate campaigner.", N("Thom Yorke"));
  M("Jack Monroe",       "Green", "e7", ["work","health"],         [54,24,56,34,28], "Cook and anti-poverty campaigner.", N("Jack Monroe"));
  M("Lily Cole",         "Green", "e7", ["culture","environment"], [56,22,50,32,28], "Model turned environmental and social activist.", N("Lily Cole"));
  M("Roger Hallam",      "Green", "e7", ["environment"],          [44,24,54,28,26], "Co-founder of Extinction Rebellion.", N("Roger Hallam (activist)"));
  M("Gail Bradbrook",    "Green", "e7", ["environment","education"],[46,26,52,30,28], "Co-founder of Extinction Rebellion.", N("Gail Bradbrook"));
  M("Swampy",            "Green", "e6", ["environment"],          [50,18,44,24,24], "Daniel Hooper — the tunnelling eco-protester of the 1990s road wars.", N("Swampy (environmental activist)"));
  M("Jonathon Porritt",  "Green", "e6", ["environment","business"],[56,40,58,46,38], "Veteran green campaigner and former Friends of the Earth director.", N("Jonathon Porritt"));
  M("Doug Parr",         "Green", "e7", ["environment","education"],[48,34,50,42,34], "Greenpeace UK's chief scientist.", N("Doug Parr"));
  M("Tamsin Omond",      "Green", "e7", ["environment"],          [48,26,52,32,30], "Climate campaigner and activist.", N("Tamsin Omond"));
  M("Natalie Fee",       "Green", "e7", ["environment"],          [50,28,52,34,30], "Environmental campaigner and 'City to Sea' founder.", N("Natalie Fee"));
  M("Indra Donfrancesco","Green", "e7", ["environment"],          [44,24,46,30,28], "Bristol Green councillor and activist.", N("Indra Donfrancesco"));

  /* ---- PLAID top-up to clear the floor: more reps, founders, famous Welsh ---- */
  M("Saunders Lewis",    "Plaid Cymru", "e3", ["leader","culture"],  [54,38,62,40,42], "Poet and playwright who co-founded Plaid Cymru in 1925.", W("Saunders Lewis"));
  M("D. J. Williams",    "Plaid Cymru", "e3", ["education","culture"],[48,36,52,38,38], "Author and a founder of Plaid Cymru.", W("D. J. Williams (Welsh writer)"));
  M("Lewis Valentine",   "Plaid Cymru", "e3", ["culture"],          [46,34,52,36,38], "Minister and the party's first parliamentary candidate.", W("Lewis Valentine"));
  M("Steffan Lewis",     "Plaid Cymru", "e7", ["foreign","chancellor"],[52,32,56,44,40], "Widely admired young Senedd member who died in office.", W("Steffan Lewis"));
  M("Bethan Sayed",      "Plaid Cymru", "e6", ["culture","work"],    [48,34,52,40,38], "Former South Wales West Senedd member.", W("Bethan Sayed"));
  M("Neil McEvoy",       "Plaid Cymru", "e6", ["communities"],       [46,34,52,38,34], "Cardiff Senedd member, later independent.", W("Neil McEvoy"));
  M("Lindsay Whittle",   "Plaid Cymru", "e6", ["communities"],       [44,38,48,42,38], "Caerphilly council leader and Senedd member.", W("Lindsay Whittle"));
  M("Nerys Evans",       "Plaid Cymru", "e6", ["business"],          [46,32,48,42,38], "Former Senedd member and party strategist.", W("Nerys Evans"));
  M("Rhodri Glyn Thomas","Plaid Cymru", "e6", ["culture","leader"],  [46,40,50,44,40], "Former heritage minister and Senedd commissioner.", W("Rhodri Glyn Thomas"));
  M("Alun Ffred Jones",  "Plaid Cymru", "e6", ["culture","environment"],[46,40,48,44,40], "Former heritage minister.", W("Alun Ffred Jones"));
  M("Jocelyn Davies",    "Plaid Cymru", "e6", ["business","work"],    [46,40,48,44,40], "Former housing and regeneration deputy minister.", W("Jocelyn Davies"));
  M("Dai Lloyd",         "Plaid Cymru", "e6", ["health"],           [44,38,48,40,38], "Doctor and former Swansea Senedd member.", W("Dai Lloyd"));
  /* aligned famous Welsh (hidden from a serious draft, alive in the dynasty) */
  M("Gareth Edwards",    "Plaid Cymru", "e4", ["sport","defence"],   [70,28,58,34,38], "Often called the greatest rugby player of all time.", N("Gareth Edwards"));
  M("Barry John",        "Plaid Cymru", "e4", ["sport","culture"],   [66,24,54,30,34], "'The King' of Welsh rugby's golden age.", N("Barry John"));
  M("JPR Williams",      "Plaid Cymru", "e4", ["sport","health"],    [64,24,52,30,34], "Fearless full-back of the great 1970s Wales side.", N("JPR Williams"));
  M("Shane Williams",    "Plaid Cymru", "e6", ["sport"],            [64,22,52,28,32], "Wales's record try-scorer.", N("Shane Williams"));
  M("Sam Warburton",     "Plaid Cymru", "e7", ["sport","leader"],    [64,24,54,32,36], "Wales and Lions captain.", N("Sam Warburton"));
  M("Alun Wyn Jones",    "Plaid Cymru", "e7", ["sport","leader"],    [62,24,52,32,38], "The most-capped international rugby player in history.", N("Alun Wyn Jones"));
  M("Gareth Bale",       "Plaid Cymru", "e7", ["sport"],            [72,20,52,28,30], "'Wales. Golf. Madrid.' — Wales's footballing talisman.", N("Gareth Bale"));
  M("Aaron Ramsey",      "Plaid Cymru", "e7", ["sport"],            [62,18,48,26,30], "Wales midfielder and captain.", N("Aaron Ramsey"));
  M("Kelly Jones",       "Plaid Cymru", "e7", ["culture"],          [60,20,56,26,28], "Stereophonics frontman.", N("Kelly Jones"));
  M("James Dean Bradfield","Plaid Cymru","e7",["culture"],          [58,20,56,26,28], "Manic Street Preachers singer and guitarist.", N("James Dean Bradfield"));
  M("Marina Diamandis",  "Plaid Cymru", "e7", ["culture"],          [58,18,54,24,26], "Welsh singer-songwriter known as MARINA.", N("Marina (singer)"));
  M("Aled Jones",        "Plaid Cymru", "e7", ["culture"],          [58,22,52,28,30], "Chorister of 'Walking in the Air' turned broadcaster.", N("Aled Jones"));
  M("Rob Brydon",        "Plaid Cymru", "e7", ["culture"],          [62,20,60,28,28], "Welsh comedian, actor and host.", N("Rob Brydon"));
  M("Max Boyce",         "Plaid Cymru", "e5", ["culture","sport"],   [62,22,60,28,32], "Entertainer and bard of Welsh rugby.", N("Max Boyce"));
  M("Ioan Gruffudd",     "Plaid Cymru", "e7", ["culture","foreign"], [60,20,54,28,28], "Welsh actor.", N("Ioan Gruffudd"));
  M("Matthew Rhys",      "Plaid Cymru", "e7", ["culture"],          [60,20,54,28,28], "Emmy-winning Welsh actor.", N("Matthew Rhys"));
  M("Luke Evans",        "Plaid Cymru", "e7", ["culture"],          [62,18,52,26,28], "Welsh actor and singer.", N("Luke Evans"));
  M("Taron Egerton",     "Plaid Cymru", "e7", ["culture"],          [62,18,52,26,28], "Actor raised in Aberystwyth.", N("Taron Egerton"));
  M("Tanni Grey-Thompson","Plaid Cymru","e7",["sport","work"],      [62,34,56,40,36], "Eleven-time Paralympic champion and crossbench peer.", N("Tanni Grey-Thompson"));
  M("Colin Jackson",     "Plaid Cymru", "e6", ["sport"],            [60,22,52,30,30], "World-record-holding Welsh hurdler.", N("Colin Jackson"));
  M("Duffy",             "Plaid Cymru", "e6", ["culture"],          [56,16,48,22,24], "Welsh soul singer of 'Mercy'.", N("Duffy (singer)"));

  /* ---- SINN FÉIN top-up to clear the floor: more reps, plus culture/history -- */
  M("Lynn Boylan",       "Sinn Féin", "e7", ["environment","foreign"],[50,38,54,44,40], "Senator and former MEP, climate spokeswoman.", W("Lynn Boylan"));
  M("Liadh Ní Riada",    "Sinn Féin", "e6", ["culture","foreign"],   [48,36,52,42,40], "Former MEP and presidential candidate.", W("Liadh Ní Riada"));
  M("Chris MacManus",    "Sinn Féin", "e7", ["chancellor","foreign"],[46,34,48,42,40], "MEP for the Midlands–North-West.", W("Chris MacManus"));
  M("Martin Kenny",      "Sinn Féin", "e7", ["environment","justice"],[46,38,50,42,40], "Sligo–Leitrim TD and justice spokesman.", W("Martin Kenny"));
  M("Brian Stanley",     "Sinn Féin", "e6", ["business","environment"],[46,38,48,44,40], "Laois–Offaly TD.", W("Brian Stanley (politician)"));
  M("Maurice Quinlivan", "Sinn Féin", "e7", ["business","work"],     [46,36,48,42,40], "Limerick TD and former mayor.", W("Maurice Quinlivan"));
  M("Thomas Gould",      "Sinn Féin", "e7", ["health","communities"],[46,34,50,40,40], "Cork North-Central TD and addiction-services campaigner.", W("Thomas Gould"));
  M("Pa Daly",           "Sinn Féin", "e7", ["justice"],            [46,34,50,42,40], "Kerry TD and solicitor.", W("Pa Daly"));
  M("Ruairí Ó Murchú",   "Sinn Féin", "e7", ["defence","foreign"],   [46,34,50,40,40], "Louth TD.", W("Ruairí Ó Murchú"));
  M("Claire Kerrane",    "Sinn Féin", "e7", ["work"],               [46,32,50,40,40], "Roscommon–Galway TD and social-protection spokeswoman.", W("Claire Kerrane"));
  M("Kathleen Funchion", "Sinn Féin", "e7", ["education","work"],    [46,34,50,40,40], "Former TD and MEP for Ireland South.", W("Kathleen Funchion"));
  M("Darren O'Rourke",   "Sinn Féin", "e7", ["business","environment"],[46,32,48,40,40], "Meath East TD and energy spokesman.", W("Darren O'Rourke"));
  M("Mark Ward",         "Sinn Féin", "e7", ["health"],             [44,32,48,38,40], "Dublin Mid-West TD and mental-health spokesman.", W("Mark Ward (politician)"));
  M("Réada Cronin",      "Sinn Féin", "e7", ["health"],             [44,32,48,38,40], "Kildare North TD.", W("Réada Cronin"));
  M("Pauline Tully",     "Sinn Féin", "e7", ["work","education"],    [44,32,48,38,40], "Cavan–Monaghan TD and disability spokeswoman.", W("Pauline Tully"));
  M("Dessie Ellis",      "Sinn Féin", "e6", ["transport","communities"],[44,34,46,40,40], "Long-serving Dublin North-West TD.", W("Dessie Ellis"));
  M("Niall Ó Donnghaile","Sinn Féin", "e6", ["culture","foreign"],   [46,32,48,40,40], "Former Senator and Belfast Lord Mayor.", W("Niall Ó Donnghaile"));
  M("Fintan Warfield",   "Sinn Féin", "e7", ["culture"],            [46,30,50,38,38], "Senator and arts spokesman.", W("Fintan Warfield"));
  M("Paul Gavan",        "Sinn Féin", "e7", ["work"],               [44,32,48,40,40], "Senator and workers'-rights spokesman.", W("Paul Gavan"));
  M("Mitchel McLaughlin","Sinn Féin", "e6", ["leader","chancellor"], [48,42,52,44,44], "The first Sinn Féin Speaker of the Stormont Assembly.", W("Mitchel McLaughlin"));
  M("Bairbre de Brún",   "Sinn Féin", "e6", ["health","foreign"],    [48,40,52,44,42], "Former Stormont health minister and MEP.", W("Bairbre de Brún"));
  M("Linda Dillon",      "Sinn Féin", "e7", ["education"],          [44,32,46,40,40], "Mid Ulster MLA.", W("Linda Dillon"));
  M("Pat Sheehan",       "Sinn Féin", "e6", ["education"],          [44,34,46,40,40], "West Belfast MLA.", W("Pat Sheehan"));
  M("Colm Gildernew",    "Sinn Féin", "e7", ["health"],             [44,32,46,40,40], "Fermanagh & South Tyrone MLA and health spokesman.", W("Colm Gildernew"));
  M("Philip McGuigan",   "Sinn Féin", "e7", ["environment"],        [44,32,46,40,40], "North Antrim MLA.", W("Philip McGuigan"));
  M("Órlaithí Flynn",    "Sinn Féin", "e7", ["health"],             [44,30,46,38,40], "West Belfast MLA.", W("Órlaithí Flynn"));
  /* historic and cultural (broad nationalist tradition; factual notes) */
  M("Bernadette McAliskey","Sinn Féin","e4",["leader","work"],      [56,30,66,34,38], "Bernadette Devlin — civil-rights leader and, at 21, the youngest woman elected to the Commons.", N("Bernadette Devlin McAliskey"));
  M("Brendan Behan",     "Sinn Féin", "e4", ["culture"],            [58,22,60,24,28], "Playwright and author of a turbulent, republican-tinged life.", N("Brendan Behan"));
  M("Brian Warfield",    "Sinn Féin", "e6", ["culture"],            [54,18,52,22,26], "Founder of the Wolfe Tones, the rebel-ballad band.", N("The Wolfe Tones"));
  M("Damien Dempsey",    "Sinn Féin", "e7", ["culture","work"],     [54,18,54,24,26], "Dublin folk singer of social-justice ballads.", N("Damien Dempsey"));
  M("Frances Black",     "Sinn Féin", "e7", ["health","culture"],   [54,28,54,34,30], "Singer turned independent Senator and campaigner.", N("Frances Black"));

  /* ---- REFORM top-up to clear the floor: more UKIP leaders/MEPs + Leavers ---- */
  M("Diane James",       "UKIP", "e6", ["leader","justice"],       [48,40,52,42,38], "Barrister and briefly leader of UKIP in 2016.", W("Diane James"));
  M("Paul Nuttall",      "UKIP", "e6", ["leader","health"],        [46,40,52,40,40], "Former deputy leader and leader of UKIP.", W("Paul Nuttall"));
  M("Henry Bolton",      "UKIP", "e7", ["defence","leader"],       [44,40,48,42,38], "Former soldier and a short-lived leader of UKIP.", W("Henry Bolton"));
  M("Suzanne Evans",     "UKIP", "e6", ["business","leader"],      [48,40,52,44,38], "Former deputy leader and policy chief.", W("Suzanne Evans"));
  M("Neil Hamilton",     "UKIP", "e6", ["leader","whip"],          [44,42,50,42,38], "Former Conservative minister who led UKIP in the Senedd.", W("Neil Hamilton (British politician)"));
  M("Margot Parker",     "UKIP", "e6", ["work"],                  [42,36,46,38,36], "East Midlands MEP and equalities spokeswoman.", W("Margot Parker"));
  M("Louise Bours",      "UKIP", "e6", ["health"],                [42,36,46,38,36], "North West England MEP and health spokeswoman.", W("Louise Bours"));
  M("Jonathan Bullock",  "UKIP", "e7", ["business"],              [42,34,44,40,36], "East Midlands MEP.", W("Jonathan Bullock"));
  /* aligned Leavers (hidden from a serious draft, alive in the dynasty) */
  M("Daniel Hannan",     "Reform UK", "e7", ["foreign","business"],[52,42,62,48,38], "Former Conservative MEP and a leading intellectual of the Leave movement.", N("Daniel Hannan"));
  M("Kate Hoey",         "Reform UK", "e7", ["sport","foreign"],    [52,44,54,46,38], "Former Labour minister and a prominent Eurosceptic, now a crossbench peer.", N("Kate Hoey"));
  M("Gisela Stuart",     "Reform UK", "e7", ["foreign","education"],[50,44,54,48,40], "Former Labour MP who chaired Vote Leave, now a crossbench peer.", N("Gisela Stuart"));

  /* ---- GREEN final top-up to clear the floor ---- */
  M("Molly Scott Cato",  "Green", "e6", ["chancellor","business"], [50,40,54,46,38], "Economist and former South West England Green MEP.", W("Molly Scott Cato"));
  M("Dominic Dyer",      "Green", "e7", ["environment"],          [54,30,56,38,32], "Wildlife campaigner and animal-welfare advocate.", N("Dominic Dyer"));
  M("Mark Avery",        "Green", "e7", ["environment"],          [50,34,52,42,32], "Conservationist and former RSPB conservation director.", N("Mark Avery"));
  M("Iolo Williams",     "Green", "e7", ["environment"],          [56,26,54,34,32], "Welsh naturalist and wildlife broadcaster.", N("Iolo Williams"));
  M("Caroline Allen",    "Green", "e7", ["environment","health"],  [48,32,50,40,36], "Veterinary surgeon and Green Party animal-welfare lead.", N("Caroline Allen"));

  /* =========================================================================
     SDLP — leaders, founders and the civil-rights generation
     ========================================================================= */
  M("Colum Eastwood",    "SDLP", "e7", ["leader","foreign"],      [56,42,62,46,46], "Foyle MP and former leader of the SDLP.", W("Colum Eastwood"));
  M("Claire Hanna",      "SDLP", "e7", ["leader","environment"],   [56,40,62,46,44], "Belfast South MP and party leader.", W("Claire Hanna"));
  M("Matthew O'Toole",   "SDLP", "e7", ["chancellor","leader"],    [50,38,56,46,42], "Leader of the official opposition at Stormont.", W("Matthew O'Toole"));
  M("Mark Durkan",       "SDLP", "e6", ["leader","deputy"],        [52,46,58,48,46], "Former party leader and deputy first minister.", W("Mark Durkan"));
  M("Margaret Ritchie",  "SDLP", "e6", ["leader","communities"],   [48,44,52,44,42], "Former leader and South Down MP, now a peer.", W("Margaret Ritchie, Baroness Ritchie of Downpatrick"));
  M("Alasdair McDonnell","SDLP", "e6", ["leader","health"],        [46,44,50,44,42], "Belfast GP and former party leader.", W("Alasdair McDonnell"));
  M("Seamus Mallon",     "SDLP", "e5", ["deputy","justice"],       [56,50,62,50,48], "Deputy First Minister and towering SDLP figure.", W("Seamus Mallon"));
  M("Gerry Fitt",        "SDLP", "e4", ["leader","work"],          [54,46,58,44,44], "The SDLP's first leader, later a crossbench peer.", W("Gerry Fitt"));
  M("Eddie McGrady",     "SDLP", "e5", ["chancellor","business"],   [48,46,50,48,44], "South Down MP who unseated Enoch Powell.", W("Eddie McGrady"));
  M("Joe Hendron",       "SDLP", "e5", ["health"],               [46,44,48,44,42], "Belfast GP and former West Belfast MP.", W("Joe Hendron"));
  M("Brid Rodgers",      "SDLP", "e5", ["environment","health"],    [48,46,52,46,42], "Senior minister and party stalwart.", W("Bríd Rodgers"));
  M("Sean Farren",       "SDLP", "e6", ["chancellor","education"],  [46,46,48,48,42], "Former Stormont finance and employment minister.", W("Seán Farren"));
  M("Alban Maginness",   "SDLP", "e6", ["justice","culture"],       [46,44,50,44,42], "Barrister and the first nationalist Lord Mayor of Belfast.", W("Alban Maginness"));
  M("Patsy McGlone",     "SDLP", "e6", ["environment","culture"],   [44,42,48,44,42], "Mid Ulster MLA and Irish-language advocate.", W("Patsy McGlone"));
  M("Dolores Kelly",     "SDLP", "e6", ["health","justice"],        [44,42,48,42,42], "Upper Bann MLA and party veteran.", W("Dolores Kelly"));
  M("Nichola Mallon",    "SDLP", "e6", ["transport","communities"], [48,38,52,44,42], "Former infrastructure minister and deputy leader.", W("Nichola Mallon"));
  M("Daniel McCrossan",  "SDLP", "e7", ["education","chancellor"],  [44,34,50,40,40], "West Tyrone MLA.", W("Daniel McCrossan"));
  M("Cara Hunter",       "SDLP", "e7", ["culture","work"],          [46,30,50,38,40], "East Londonderry MLA.", W("Cara Hunter"));
  M("Sinéad McLaughlin", "SDLP", "e7", ["business","work"],         [44,34,48,42,40], "Foyle MLA and economy spokeswoman.", W("Sinéad McLaughlin"));
  M("Justin McNulty",    "SDLP", "e7", ["defence","culture"],       [46,34,50,40,40], "Newry & Armagh MLA and former Gaelic footballer.", W("Justin McNulty"));
  M("Pat Catney",        "SDLP", "e6", ["business"],              [42,34,46,40,40], "Former Lagan Valley MLA.", W("Pat Catney"));
  M("Denis Haughey",     "SDLP", "e5", ["foreign"],               [44,44,46,44,42], "Founder member and former junior minister.", W("Denis Haughey"));
  M("Ivan Cooper",       "SDLP", "e4", ["work","justice"],          [50,42,54,42,42], "Civil-rights leader and SDLP founder.", W("Ivan Cooper"));
  M("Paddy Devlin",      "SDLP", "e4", ["work","health"],           [50,42,54,42,42], "Trade unionist, civil-rights figure and SDLP founder.", W("Paddy Devlin"));
  M("Austin Currie",     "SDLP", "e4", ["communities","leader"],    [50,46,54,46,44], "Civil-rights campaigner and SDLP founder.", W("Austin Currie"));
  M("Paddy O'Hanlon",    "SDLP", "e4", ["justice"],               [46,40,50,40,40], "Founder member of the SDLP.", W("Paddy O'Hanlon"));

  /* =========================================================================
     ALLIANCE — the centre ground, its leaders and its founders
     ========================================================================= */
  M("Naomi Long",        "Alliance", "e7", ["leader","justice"],   [58,44,64,48,48], "Leader of Alliance and Northern Ireland's justice minister.", W("Naomi Long"));
  M("Stephen Farry",     "Alliance", "e7", ["business","education"],[50,42,54,48,44], "Former North Down MP and deputy leader.", W("Stephen Farry"));
  M("Andrew Muir",       "Alliance", "e7", ["environment"],        [48,38,52,46,42], "Stormont agriculture and environment minister.", W("Andrew Muir"));
  M("Sorcha Eastwood",   "Alliance", "e7", ["culture","justice"],   [54,34,58,44,42], "Lagan Valley MP.", W("Sorcha Eastwood"));
  M("Kellie Armstrong",  "Alliance", "e7", ["transport","education"],[46,38,50,44,42], "Strangford MLA and party whip.", W("Kellie Armstrong"));
  M("Paula Bradshaw",    "Alliance", "e7", ["health"],            [46,36,50,42,42], "Belfast South MLA.", W("Paula Bradshaw"));
  M("John Blair",        "Alliance", "e7", ["environment"],        [44,36,48,42,42], "South Antrim MLA.", W("John Blair (politician)"));
  M("Eóin Tennyson",     "Alliance", "e7", ["chancellor","work"],   [48,32,52,42,40], "Upper Bann MLA and finance spokesman.", W("Eóin Tennyson"));
  M("Nuala McAllister",  "Alliance", "e7", ["business","work"],     [48,34,52,42,42], "Belfast North MLA and former Lord Mayor.", W("Nuala McAllister"));
  M("Connie Egan",       "Alliance", "e7", ["culture"],           [44,30,48,38,40], "North Down MLA.", W("Connie Egan"));
  M("Chris Lyttle",      "Alliance", "e6", ["education"],          [44,38,48,42,42], "Former Belfast East MLA.", W("Chris Lyttle"));
  M("Stewart Dickson",   "Alliance", "e6", ["foreign","culture"],   [44,40,48,42,42], "East Antrim MLA.", W("Stewart Dickson"));
  M("Trevor Lunn",       "Alliance", "e6", ["education"],          [42,40,46,42,42], "Former Lagan Valley MLA.", W("Trevor Lunn"));
  M("Kieran McCarthy",   "Alliance", "e5", ["health"],            [42,40,46,40,40], "Long-serving former Strangford MLA.", W("Kieran McCarthy"));
  M("David Ford",        "Alliance", "e6", ["leader","justice"],    [50,46,52,48,46], "Former leader and Northern Ireland's first justice minister.", W("David Ford"));
  M("John Alderdice",    "Alliance", "e5", ["leader","health"],     [52,46,56,48,46], "Former leader, Stormont Speaker and peer.", W("John Alderdice, Baron Alderdice"));
  M("Seamus Close",      "Alliance", "e5", ["chancellor","business"],[46,44,48,46,42], "Accountant and long-serving deputy leader.", W("Seamus Close"));
  M("Oliver Napier",     "Alliance", "e4", ["leader","justice"],    [50,44,54,46,46], "The founding leader of the Alliance Party.", W("Oliver Napier"));
  M("Anna Lo",           "Alliance", "e6", ["communities","foreign"],[50,38,52,42,40], "Hong Kong-born former Belfast South MLA.", W("Anna Lo"));
  M("Addie Morrow",      "Alliance", "e5", ["environment"],        [42,40,44,42,42], "Founder-era figure and former deputy leader.", W("Addie Morrow"));
  M("Philip McGarry",    "Alliance", "e5", ["health"],            [42,40,44,42,40], "Psychiatrist and long-standing party figure.", N("Philip McGarry"));


  /* =========================================================================
     TOP-UPS — more real figures so every party with a genuine bench clears the
     dynasty floor (DUP, UUP, Alliance, Independents) and the far right too.
     ========================================================================= */
  /* DUP */
  M("Paula Bradley",     "DUP", "e7", ["health","communities"],   [44,38,48,42,42], "Former deputy leader of the DUP.", W("Paula Bradley"));
  M("David Simpson",     "DUP", "e6", ["business","environment"],  [44,40,48,42,42], "Former Upper Bann MP.", W("David Simpson"));
  M("William Humphrey",  "DUP", "e6", ["culture"],               [42,38,46,40,42], "Former Belfast North MLA.", W("William Humphrey"));
  M("Christopher Stalford","DUP","e6",["chancellor","justice"],    [44,38,48,42,42], "Belfast South MLA and a Stormont principal deputy speaker.", W("Christopher Stalford"));
  M("Pam Cameron",       "DUP", "e7", ["health"],               [44,36,48,40,42], "South Antrim MLA and party deputy leader.", W("Pam Cameron"));
  M("Gary Middleton",    "DUP", "e7", ["education"],            [42,36,46,40,42], "Foyle MLA.", W("Gary Middleton"));
  /* UUP */
  M("Robbie Butler",     "UUP", "e7", ["health","education"],     [46,36,50,42,42], "Lagan Valley MLA and deputy leader of the UUP.", W("Robbie Butler"));
  M("Andy Allen",        "UUP", "e7", ["defence","work"],         [46,36,48,42,42], "Belfast East MLA and injured Afghanistan veteran.", W("Andy Allen (politician)"));
  M("John Stewart",      "UUP", "e7", ["business"],             [44,34,46,40,42], "East Antrim MLA.", W("John Stewart (Northern Ireland politician)"));
  M("Roy Beggs",         "UUP", "e5", ["education"],            [44,42,46,42,42], "Long-serving former East Antrim MP.", W("Roy Beggs"));
  M("Jo-Anne Dobson",    "UUP", "e6", ["health","environment"],   [44,36,48,40,40], "Former Upper Bann MLA and health campaigner.", W("Jo-Anne Dobson"));
  M("Dennis Rogan",      "UUP", "e5", ["chancellor","leader"],     [44,42,46,44,44], "Lord Rogan, a former party chairman.", W("Dennis Rogan, Baron Rogan"));
  /* Alliance */
  M("Kate Nicholl",      "Alliance", "e7", ["communities","culture"],[50,32,54,42,42], "Belfast South MLA and former Lord Mayor.", W("Kate Nicholl"));
  M("Nick Mathison",     "Alliance", "e7", ["education","health"],  [46,32,50,42,40], "Strangford MLA and education spokesman.", W("Nick Mathison"));
  M("Danny Donnelly",    "Alliance", "e7", ["business"],          [44,32,48,40,40], "East Antrim MLA.", W("Danny Donnelly"));
  M("Patrick Brown",     "Alliance", "e7", ["environment","transport"],[44,30,48,40,40], "South Down MLA.", W("Patrick Brown (politician)"));
  M("Sian Mulholland",   "Alliance", "e7", ["health"],           [44,30,48,38,40], "North Antrim MLA.", W("Sian Mulholland"));
  M("Peter McReynolds",  "Alliance", "e7", ["communities"],       [44,30,48,38,40], "Belfast East MLA.", W("Peter McReynolds"));
  M("Eileen Bell",       "Alliance", "e5", ["leader","justice"],   [46,42,48,44,44], "Former deputy leader and a Stormont Speaker.", W("Eileen Bell"));
  M("Bob Cooper",        "Alliance", "e4", ["work","justice"],     [44,40,46,42,42], "Founder-era figure and later equality commissioner.", N("Bob Cooper (Northern Ireland)"));
  /* Independents — Speakers, crossbenchers and famous one-offs */
  M("John Bercow",       "Independent", "e7", ["leader","whip"],   [56,48,68,46,42], "The combative former Speaker of the House of Commons.", W("John Bercow"));
  M("Betty Boothroyd",   "Independent", "e6", ["leader","whip"],   [58,48,64,48,46], "The first woman to serve as Speaker of the Commons.", W("Betty Boothroyd"));
  M("Michael Martin",    "Independent", "e6", ["leader","whip"],   [46,46,50,44,42], "Former Speaker, later Lord Martin of Springburn.", W("Michael Martin, Baron Martin of Springburn"));
  M("Frank Field",       "Independent", "e6", ["work","chancellor"],[52,50,56,52,42], "Independent-minded welfare reformer, later a crossbench peer.", W("Frank Field, Baron Field of Birkenhead"));
  M("Martin Bell",       "Independent", "e6", ["culture","justice"],[56,42,58,44,38], "The 'man in the white suit' — war reporter turned anti-sleaze MP.", W("Martin Bell"));
  M("Richard Taylor",    "Independent", "e6", ["health"],         [50,38,50,42,38], "Doctor elected as an independent MP to save his local hospital.", W("Richard Taylor (politician)"));
  M("Peter Law",         "Independent", "e6", ["health","leader"],  [50,42,52,42,42], "Won Blaenau Gwent as an independent against an all-women shortlist.", W("Peter Law"));
  M("Ken Livingstone",   "Independent", "e6", ["transport","leader"],[54,52,60,46,40], "'Red Ken' — won London's mayoralty as an independent in 2000.", W("Ken Livingstone", "maverick"));
  M("Rory Stewart",      "Independent", "e7", ["foreign","defence"],[58,48,62,52,38], "Former minister and diplomat who ran for London mayor as an independent.", W("Rory Stewart"));
  /* the far right — a few more real organisational figures (flagged, hidden by default) */
  M("John Kingsley Read","National Front", "e5", ["leader"],       [30,30,42,26,30], "Chairman of the National Front in the mid-1970s.", F("John Kingsley Read"));
  M("Richard Barnbrook", "British National Party", "e6", ["culture"],[30,28,40,26,28], "A British National Party member of the London Assembly, 2008–12.", F("Richard Barnbrook"));
  M("Simon Darby",       "British National Party", "e6", ["foreign"],[28,28,38,26,28], "A former deputy leader of the British National Party.", F("Simon Darby"));
  M("John Beckett",      "Union Movement", "e3", ["work"],          [34,30,48,26,30], "Former Labour MP who joined the British Union of Fascists.", F("John Beckett (politician)"));
  M("Patrick Harrington","National Front", "e5", ["business"],     [28,28,40,26,28], "National Front activist who later ran the Third Way group.", F("Patrick Harrington"));
  M("Joe Pearce",        "National Front", "e5", ["culture"],      [30,26,42,24,26], "Young National Front organiser in the 1970s who later renounced the movement.", F("Joe Pearce"));
  M("Derek Holland",     "National Front", "e5", ["defence"],      [26,26,38,24,26], "Ideologue of the 1980s National Front 'Political Soldier' faction.", F("Derek Holland (activist)"));
  M("Jim Dowson",        "Britain First", "e7", ["business"],      [28,28,40,26,28], "Loyalist activist and a co-founder of Britain First.", F("Jim Dowson"));
  M("Anne Marie Waters", "Britain First", "e7", ["leader","home"],  [34,28,46,28,30], "Former UKIP figure who founded the anti-Islam For Britain Movement.", F("Anne Marie Waters"));
  M("Paul Weston",       "English Defence League", "e6", ["foreign"],[30,28,42,26,28], "Founder of the small anti-Islam party Liberty GB.", F("Paul Weston (politician)"));

  /* a few more independents to clear the floor */
  M("Bernadette McAliskey","Independent","e4",["work","justice"],  [56,34,64,36,34], "Civil-rights leader elected an independent MP at 21 in 1969.", W("Bernadette Devlin McAliskey", "maverick"));
  M("Dai Davies",        "Independent", "e6", ["work","health"],    [46,38,48,40,40], "Independent MP for Blaenau Gwent, 2006–2010.", W("Dai Davies (politician)"));
  M("Eddie Milne",       "Independent", "e4", ["justice"],         [46,40,50,42,38], "Anti-corruption independent MP for Blyth in the 1970s.", W("Eddie Milne"));

})();

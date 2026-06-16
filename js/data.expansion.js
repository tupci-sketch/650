/* =============================================================================
   650 — THE MEGA EXPANSION (v7)
   -----------------------------------------------------------------------------
   A very large, deliberately MAXIMALIST top-up to the roster:

     • THE FRINGE GOES GLOBAL.  Every celebrity, YouTuber, comedian, actor,
       musician, sportsperson, tycoon and influencer below is filed under the
       *Fringe* lineage with cast "novelty" and scope "uk".  That means:
         – they stay OUT of a serious Greatest-Cabinet draft unless you flip the
           "Mavericks & meme candidates" toggle on;
         – they DO show up in Wildcard with mavericks on;
         – and they ALL flood into a Monster Raving Loony (Fringe) DYNASTY,
           because a dynasty drafts its whole lineage and ignores the toggles.
       Running the Loonies is now a riot: presidents of the internet, pop
       royalty, sporting demigods and billionaires all on the same ticket.

     • THE LOONIES ARE NOW ELECTABLE.  G.LEANS.Fringe used to be negative in
       every region (loved nowhere).  It is rewritten below into a real, if
       eccentric, national force — so a well-drafted Loony cabinet can actually
       take seats, even a majority on Easy/Normal.  (Edit it back if you prefer
       them doomed.)

     • THE WILDCARD WORLD DEEPENS.  Many more world statesmen, despots, US
       politicians and revolutionaries — "politically aligned people" from
       across the globe and every era.

     • UK BENCHES DEEPEN TOO.  More real figures for the thinner parties and the
       historic lineages, across all seven eras.

   Same rules as data.js / data.more.js: ratings are an editorial abstraction
   applied by the same logic to everyone; notes are factual one-liners;
   inclusion is satire, never endorsement.  Loaded after data.mps.js; never
   duplicates a name already carried.
   ========================================================================== */
window.G = window.G || {};
(function () {
  var G = window.G;

  /* ---------------------------------------------------------------------------
     1 · New FRINGE-lineage "parties" — pure flavour labels on the cards. They
     all share lineage "Fringe", so in a Monster Raving Loony dynasty the whole
     lot is draftable and your bloc still flies the Loony flag. Colours picked
     to stay clear of the real parties. Registered defensively (won't clobber an
     existing label) and given a neutral coalition alignment.
     ------------------------------------------------------------------------- */
  function newParty(label, colour, align) {
    if (!G.PARTIES[label]) G.PARTIES[label] = { label: label, lineage: "Fringe", colour: colour, cap: 632 };
    if (!(label in G.PARTY_ALIGN)) G.PARTY_ALIGN[label] = (typeof align === "number") ? align : 0;
  }
  newParty("YouTube & Internet", "#ff0a54");
  newParty("Comedy Circuit",     "#ff7900");
  newParty("Music & Stage",      "#9b59b6");
  newParty("Stage & Screen",     "#c2185b");
  newParty("Sporting Greats",    "#00897b");
  newParty("Tech & Tycoons",     "#455a64");
  newParty("Icons & Influencers","#ec407a");
  newParty("Pulpit & Punditry",  "#6d4c41");

  /* ---------------------------------------------------------------------------
     2 · Make the Monster Raving Loony / Fringe lineage genuinely electable.
     Old table was -0.2…-0.4 everywhere. New table is broadly neutral-to-positive
     — strongest in the cities, with a London surge — so the Loonies are a real
     national party that can win seats and, on a good night, govern.
     ------------------------------------------------------------------------- */
  G.LEANS.Fringe = {
    SCO: 0.10, WAL: 0.20, NI: 0.00, NE: 0.35, NW: 0.40, YH: 0.35,
    EM: 0.20, WM: 0.25, EE: 0.15, LDN: 0.55, SE: 0.10, SW: 0.30
  };
  if (G.LINEAGE_ALIGN) G.LINEAGE_ALIGN.Fringe = 0;   // cheerfully centrist for coalitions

  /* ---------------------------------------------------------------------------
     3 · M(): add a figure unless its name+scope is already in the pool.
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
  /* shorthand: a novelty-cast fringe figure (optionally with a wiki title) */
  function NV(wiki, flag) { var e = { cast: "novelty" }; if (wiki) e.wiki = wiki; if (flag) e.flag = flag; return e; }

  /* =========================================================================
     FRINGE · the real UK eccentrics, Loonies & protest candidates
     (every one genuinely stood for election at some point)
     ========================================================================= */
  M("Lord Biro",            "Monster Raving Loony", "e7", ["culture","leader"],   [54,24,58,10,28], "Bill Brookes — Nottingham artist and Bus-Pass Elvis / Loony perennial candidate.", NV("Lord Biro"));
  M("Rainbow George Weiss", "Independent (Fringe)", "e6", ["culture","foreign"],  [52,22,56,8,18],  "Eccentric perennial candidate and friend of Peter Cook; ran on a money-abolition ticket.", NV("Rainbow George"));
  M("Vermin Supreme",       "Independent (Fringe)", "e7", ["pm","defence"],       [66,18,62,10,16], "American performance-art candidate: a boot for a hat and a pledge of free ponies.", NV("Vermin Supreme"));
  M("Captain Beany",        "Monster Raving Loony", "e6", ["culture","health"],   [44,22,42,8,20],  "Barry Kirk — Port Talbot's orange baked-bean superhero and serial candidate.", NV("Captain Beany"));
  M("Mr Mozzarella",        "Monster Raving Loony", "e7", ["culture"],            [38,16,34,6,16],  "A cheese-costumed Loony candidate in the party's grand tradition of edible politics.", NV("Official Monster Raving Loony Party"));
  M("Sir Oink-A-Lot",       "Monster Raving Loony", "e6", ["environment"],        [40,14,30,6,14],  "A pig-suited Loony stalwart; agriculture was, naturally, his brief.", NV("Official Monster Raving Loony Party"));
  M("Barmy Brunch",         "Monster Raving Loony", "e7", ["culture","health"],   [42,12,36,6,16],  "A breakfast-themed Loony candidate; manifesto reportedly heavy on toast.", NV("Official Monster Raving Loony Party"));
  M("Nick the Incredible Flying Brick", "Monster Raving Loony", "e7", ["transport"], [34,18,34,6,22], "Loony deputy leader and by-election ever-present; pledged a nuclear hovercraft.", NV("Official Monster Raving Loony Party"));
  M("Baron Badger",         "Monster Raving Loony", "e7", ["environment"],        [40,12,32,6,14],  "A badger-costumed Loony candidate; opposed, on principle, to most culls.", NV("Official Monster Raving Loony Party"));
  M("Chinners Chinnery",    "Monster Raving Loony", "e7", ["culture"],            [36,14,34,6,16],  "A long-serving Loony candidate of the modern era.", NV("Official Monster Raving Loony Party"));

  /* =========================================================================
     FRINGE · YOUTUBE & THE INTERNET — presidents of the algorithm
     ========================================================================= */
  M("MrBeast",            "YouTube & Internet", "e7", ["business","culture","pm"], [86,20,64,38,40], "Jimmy Donaldson — the planet's biggest YouTuber, famous for giant stunts and giveaways.", NV("MrBeast"));
  M("PewDiePie",          "YouTube & Internet", "e7", ["culture","leader"],      [74,18,62,12,30], "Felix Kjellberg — for years the most-subscribed individual on YouTube.", NV("PewDiePie"));
  M("KSI",                "YouTube & Internet", "e7", ["business","culture"],    [76,16,68,20,34], "Olajide Olatunji — Sidemen co-founder, boxer, musician and drinks entrepreneur.", NV("KSI"));
  M("Logan Paul",         "YouTube & Internet", "e7", ["business","culture"],    [70,14,62,18,28], "YouTuber-boxer and co-founder of the Prime drinks brand.", NV("Logan Paul"));
  M("Jake Paul",          "YouTube & Internet", "e7", ["defence","culture"],     [66,12,58,14,24], "YouTuber turned professional boxer and promoter.", NV("Jake Paul"));
  M("IShowSpeed",         "YouTube & Internet", "e7", ["culture"],               [72,8,56,6,18],   "Darren Watkins Jr — hyperactive livestreamer with a vast global following.", NV("IShowSpeed"));
  M("Markiplier",         "YouTube & Internet", "e7", ["culture","leader"],      [68,14,64,16,28], "Mark Fischbach — one of YouTube's biggest gaming personalities.", NV("Markiplier"));
  M("Miniminter",         "YouTube & Internet", "e7", ["culture","business"],    [62,12,52,16,28], "Simon Minter — Sidemen co-founder and football-content YouTuber.", NV("Miniminter"));
  M("Jacksepticeye",      "YouTube & Internet", "e7", ["culture"],               [64,12,60,14,26], "Seán McLoughlin — Ireland's most successful YouTuber.", NV("Jacksepticeye"));
  M("DanTDM",             "YouTube & Internet", "e7", ["education","culture"],    [62,12,54,14,24], "Dan Middleton — record-breaking British family-friendly gaming YouTuber.", NV("DanTDM"));
  M("Ali-A",              "YouTube & Internet", "e7", ["defence","culture"],     [58,10,50,12,22], "Alastair Aiken — pioneering British Call of Duty YouTuber.", NV("Ali-A"));
  M("W2S",                "YouTube & Internet", "e7", ["culture","business"],    [60,10,50,12,24], "Harry Lewis — Sidemen co-founder and FIFA-content YouTuber.", NV("W2S"));
  M("Emma Chamberlain",   "YouTube & Internet", "e7", ["culture"],               [66,10,52,12,20], "Influential American YouTuber and coffee entrepreneur.", NV("Emma Chamberlain"));
  M("Charli D'Amelio",    "YouTube & Internet", "e7", ["culture"],               [68,8,46,8,16],   "One of the most-followed creators on TikTok.", NV("Charli D'Amelio"));
  M("Khaby Lame",         "YouTube & Internet", "e7", ["culture","foreign"],     [70,8,40,10,18],  "The world's most-followed TikToker, famous for wordless comedy.", NV("Khaby Lame"));
  M("Zoella",             "YouTube & Internet", "e6", ["culture","business"],    [60,12,50,14,24], "Zoe Sugg — pioneering British lifestyle YouTuber and author.", NV("Zoella"));
  M("Caspar Lee",         "YouTube & Internet", "e6", ["culture","business"],    [56,10,48,14,22], "Early British YouTube star turned influencer-marketing entrepreneur.", NV("Caspar Lee"));
  M("Joe Sugg",           "YouTube & Internet", "e7", ["culture"],               [56,10,46,10,20], "British YouTuber, Strictly finalist and West End performer.", NV("Joe Sugg"));
  M("Yung Filly",         "YouTube & Internet", "e7", ["culture"],               [60,8,52,8,18],   "Andrés Carranza — British-Colombian YouTuber, presenter and entertainer.", NV("Yung Filly"));
  M("Casey Neistat",      "YouTube & Internet", "e7", ["business","culture"],    [62,16,56,24,28], "American film-maker and one of YouTube's most influential vloggers.", NV("Casey Neistat"));

  G._EXP_OPEN = true; // sentinel; IIFE continues in appended chunks

  /* =========================================================================
     FRINGE · THE COMEDY CIRCUIT — the funniest cabinet ever assembled
     ========================================================================= */
  M("Stephen Fry",        "Comedy Circuit", "e7", ["pm","leader","culture"],  [80,30,86,40,42], "Actor, QI host, author and broadcaster; a national wit.", NV("Stephen Fry"));
  M("John Cleese",        "Comedy Circuit", "e6", ["leader","foreign"],       [74,28,82,30,34], "Monty Python founder and one of Britain's great comic minds.", NV("John Cleese"));
  M("Michael Palin",      "Comedy Circuit", "e6", ["foreign","culture"],      [78,32,72,44,40], "Python turned beloved globe-trotting travel presenter.", NV("Michael Palin"));
  M("Eric Idle",          "Comedy Circuit", "e6", ["culture"],                [68,24,76,22,30], "Monty Python member; wrote 'Always Look on the Bright Side of Life'.", NV("Eric Idle"));
  M("Ricky Gervais",      "Comedy Circuit", "e7", ["culture","leader"],       [70,22,80,24,28], "Creator and star of 'The Office'; stand-up provocateur.", NV("Ricky Gervais"));
  M("Stephen Merchant",   "Comedy Circuit", "e7", ["culture"],                [60,20,68,26,30], "Co-creator of 'The Office' and 'Extras'.", NV("Stephen Merchant"));
  M("Peter Kay",          "Comedy Circuit", "e7", ["culture"],                [78,20,76,18,30], "Bolton's record-breaking arena comedian.", NV("Peter Kay"));
  M("Billy Connolly",     "Comedy Circuit", "e6", ["leader","culture"],       [82,26,88,24,32], "'The Big Yin' — Scotland's towering stand-up legend.", NV("Billy Connolly"));
  M("Lee Mack",           "Comedy Circuit", "e7", ["leader","whip"],          [66,20,78,22,38], "Quick-witted stand-up and 'Would I Lie to You?' captain.", NV("Lee Mack"));
  M("Jimmy Carr",         "Comedy Circuit", "e7", ["chancellor","culture"],   [64,22,76,30,30], "Deadpan stand-up and panel-show host with a head for numbers.", NV("Jimmy Carr"));
  M("Frankie Boyle",      "Comedy Circuit", "e7", ["defence","culture"],      [58,18,78,20,24], "Glasgow's fiercest and most political stand-up.", NV("Frankie Boyle"));
  M("David Mitchell",     "Comedy Circuit", "e7", ["leader","education"],     [66,22,82,34,32], "Peep Show star and exasperated panel-show rationalist.", NV("David Mitchell (comedian)"));
  M("Robert Webb",        "Comedy Circuit", "e7", ["culture"],                [60,18,70,24,26], "Peep Show co-star and writer.", NV("Robert Webb"));
  M("Bill Bailey",        "Comedy Circuit", "e7", ["culture","leader"],       [70,20,76,26,32], "Musical-comedy polymath and Strictly champion.", NV("Bill Bailey"));
  M("Dara Ó Briain",      "Comedy Circuit", "e7", ["leader","education"],     [70,22,80,30,36], "Irish stand-up, science presenter and quizmaster.", NV("Dara Ó Briain"));
  M("Romesh Ranganathan", "Comedy Circuit", "e7", ["culture","leader"],       [68,18,74,24,28], "Former maths teacher turned ubiquitous comedian and presenter.", NV("Romesh Ranganathan"));
  M("Jack Whitehall",     "Comedy Circuit", "e7", ["culture"],                [66,16,72,18,24], "Comedian, presenter and travelogue star.", NV("Jack Whitehall"));
  M("Sarah Millican",     "Comedy Circuit", "e7", ["culture","health"],       [68,18,74,22,30], "South Shields' warm and bestselling stand-up.", NV("Sarah Millican"));
  M("Katherine Ryan",     "Comedy Circuit", "e7", ["culture"],                [66,16,72,22,26], "Canadian-British stand-up and panel-show fixture.", NV("Katherine Ryan"));
  M("Joe Lycett",         "Comedy Circuit", "e7", ["business","justice"],     [70,18,74,28,30], "Consumer-champion comedian famous for elaborate political stunts.", NV("Joe Lycett"));
  M("Nish Kumar",         "Comedy Circuit", "e7", ["leader","foreign"],       [60,16,72,24,24], "Political stand-up and former 'Mash Report' host.", NV("Nish Kumar"));
  M("Stewart Lee",        "Comedy Circuit", "e7", ["culture"],                [56,20,76,26,24], "Cult 'comedian's comedian' and acerbic columnist.", NV("Stewart Lee"));
  M("Harry Hill",         "Comedy Circuit", "e7", ["health","culture"],       [64,18,70,16,26], "Surreal comedian, former doctor and 'TV Burp' host.", NV("Harry Hill"));
  M("Vic Reeves",         "Comedy Circuit", "e6", ["culture"],                [62,20,68,16,26], "Jim Moir — half of the surreal double act Reeves and Mortimer.", NV("Vic Reeves"));
  M("Bob Mortimer",       "Comedy Circuit", "e7", ["culture","leader"],       [70,20,72,20,30], "Beloved comedian, 'Would I Lie to You?' raconteur and angler.", NV("Bob Mortimer"));
  M("Dawn French",        "Comedy Circuit", "e6", ["culture","education"],    [70,22,72,26,34], "Comedian and 'Vicar of Dibley' star.", NV("Dawn French"));
  M("Jennifer Saunders",  "Comedy Circuit", "e6", ["culture"],               [68,22,72,26,32], "Comedian and 'Absolutely Fabulous' creator.", NV("Jennifer Saunders"));
  M("Victoria Wood",      "Comedy Circuit", "e6", ["culture","leader"],       [76,24,80,28,36], "Beloved comedian, writer and composer.", NV("Victoria Wood"));
  M("Spike Milligan",     "Comedy Circuit", "e4", ["culture","defence"],      [70,30,78,18,24], "Goon Show genius and the godfather of British surreal comedy.", NV("Spike Milligan"));
  M("Peter Cook",         "Comedy Circuit", "e5", ["leader","culture"],       [74,28,84,30,28], "Satire-boom pioneer, Establishment Club founder and Private Eye backer.", NV("Peter Cook"));
  M("Tommy Cooper",       "Comedy Circuit", "e5", ["culture"],                [72,22,70,14,24], "Fez-wearing magician-comedian; 'just like that'.", NV("Tommy Cooper"));
  M("Ronnie Barker",      "Comedy Circuit", "e5", ["culture","leader"],       [70,26,74,24,30], "Half of 'The Two Ronnies'; a peerless comic craftsman.", NV("Ronnie Barker"));
  M("Ronnie Corbett",     "Comedy Circuit", "e5", ["culture"],               [66,24,70,22,28], "The other Ronnie; master of the rambling armchair monologue.", NV("Ronnie Corbett"));
  M("Eric Morecambe",     "Comedy Circuit", "e5", ["culture","leader"],       [78,24,76,20,30], "Half of Morecambe and Wise, the nation's favourite double act.", NV("Eric Morecambe"));
  M("Kenneth Williams",   "Comedy Circuit", "e5", ["culture"],               [64,22,76,18,22], "'Carry On' star and supreme comic diarist.", NV("Kenneth Williams"));
  /* international */
  M("Robin Williams",     "Comedy Circuit", "e6", ["culture","health","leader"], [82,24,86,28,30], "Whirlwind American stand-up and Oscar-winning actor.", NV("Robin Williams"));
  M("Jon Stewart",        "Comedy Circuit", "e7", ["leader","foreign"],       [72,26,82,34,32], "Satirist who reshaped American politics from 'The Daily Show'.", NV("Jon Stewart"));
  M("John Oliver",        "Comedy Circuit", "e7", ["leader","justice"],       [70,22,82,32,28], "British-American host of 'Last Week Tonight'; long-form political comedy.", NV("John Oliver"));
  M("Trevor Noah",        "Comedy Circuit", "e7", ["foreign","leader"],       [70,20,78,30,28], "South African comedian and former 'Daily Show' host.", NV("Trevor Noah"));
  M("Sacha Baron Cohen",  "Comedy Circuit", "e7", ["foreign","culture"],      [66,20,76,26,24], "Creator of Ali G, Borat and a brand of guerrilla political satire.", NV("Sacha Baron Cohen"));
  M("Jerry Seinfeld",     "Comedy Circuit", "e6", ["culture"],               [70,22,76,24,28], "Co-creator of 'Seinfeld'; observational-comedy titan.", NV("Jerry Seinfeld"));
  M("Eddie Murphy",       "Comedy Circuit", "e6", ["culture"],               [72,20,76,20,26], "Stand-up and film superstar of 'SNL' and beyond.", NV("Eddie Murphy"));
  M("Dave Chappelle",     "Comedy Circuit", "e7", ["culture","leader"],       [70,18,80,22,24], "One of the most influential — and most debated — modern stand-ups.", NV("Dave Chappelle"));
  M("Chris Rock",         "Comedy Circuit", "e7", ["culture"],               [70,20,80,24,26], "Sharp American stand-up and actor.", NV("Chris Rock"));
  M("Kevin Hart",         "Comedy Circuit", "e7", ["culture","business"],     [72,16,74,22,28], "High-energy stand-up and one of comedy's biggest box-office draws.", NV("Kevin Hart"));
  M("Bill Burr",          "Comedy Circuit", "e7", ["defence","culture"],      [62,16,78,20,22], "Blue-collar American stand-up famed for his rants.", NV("Bill Burr"));
  M("Steve Martin",       "Comedy Circuit", "e6", ["culture"],               [70,24,76,26,30], "Wild-and-crazy stand-up, actor, banjoist and writer.", NV("Steve Martin"));
  M("George Carlin",      "Comedy Circuit", "e5", ["leader","justice"],       [66,24,84,28,22], "Counter-cultural American stand-up and language philosopher.", NV("George Carlin"));
  M("Richard Pryor",      "Comedy Circuit", "e5", ["culture"],               [70,22,82,18,22], "Trailblazing and fearless American stand-up.", NV("Richard Pryor"));
  M("Whoopi Goldberg",    "Comedy Circuit", "e7", ["culture","leader"],       [68,22,72,28,30], "EGOT-winning comedian, actor and 'The View' host.", NV("Whoopi Goldberg"));
  M("Tina Fey",           "Comedy Circuit", "e7", ["culture","education"],    [68,20,74,30,30], "'30 Rock' creator and political-impression specialist.", NV("Tina Fey"));

  /* =========================================================================
     FRINGE · MUSIC & STAGE — pop royalty on the front bench
     ========================================================================= */
  M("Paul McCartney",     "Music & Stage", "e5", ["pm","culture","leader"],   [86,34,82,40,44], "Beatle, knight and one of the most successful songwriters in history.", NV("Paul McCartney"));
  M("Ringo Starr",        "Music & Stage", "e5", ["culture"],                [70,28,60,20,30], "The Beatles' drummer; peace-and-love elder statesman of pop.", NV("Ringo Starr"));
  M("Mick Jagger",        "Music & Stage", "e5", ["leader","culture"],        [82,30,76,30,34], "Rolling Stones frontman and the original rock showman.", NV("Mick Jagger"));
  M("Keith Richards",     "Music & Stage", "e5", ["culture"],                [72,28,58,16,24], "The Rolling Stones' indestructible riff machine.", NV("Keith Richards"));
  M("David Bowie",        "Music & Stage", "e6", ["culture","leader"],        [84,28,80,30,32], "Shape-shifting art-rock visionary.", NV("David Bowie"));
  M("Freddie Mercury",    "Music & Stage", "e5", ["pm","culture","leader"],   [88,24,84,26,32], "Queen's incomparable frontman.", NV("Freddie Mercury"));
  M("Brian May",          "Music & Stage", "e7", ["environment","education"], [74,30,70,42,38], "Queen's guitarist — and an astrophysicist and animal-welfare campaigner.", NV("Brian May"));
  M("Elton John",         "Music & Stage", "e6", ["culture","health"],        [82,32,76,34,36], "Knighted piano superstar and AIDS-foundation philanthropist.", NV("Elton John"));
  M("George Michael",     "Music & Stage", "e6", ["culture"],               [78,24,74,24,28], "Wham! and solo pop colossus, and a quiet philanthropist.", NV("George Michael"));
  M("Rod Stewart",        "Music & Stage", "e5", ["culture"],               [72,28,66,20,30], "Raspy-voiced rock-and-pop survivor.", NV("Rod Stewart"));
  M("Sting",              "Music & Stage", "e6", ["foreign","environment"],   [70,28,68,32,30], "The Police frontman and rainforest campaigner.", NV("Sting"));
  M("Phil Collins",       "Music & Stage", "e6", ["culture"],               [70,26,66,24,30], "Genesis drummer-singer and 80s solo megastar.", NV("Phil Collins"));
  M("Bob Geldof",         "Music & Stage", "e5", ["foreign","leader"],        [72,30,80,40,30], "Boomtown Rat who organised Live Aid and Live 8 against famine.", NV("Bob Geldof"));
  M("Bono",               "Music & Stage", "e6", ["foreign","leader"],        [76,30,82,44,32], "U2 frontman and a relentless global campaigner on debt and aid.", NV("Bono"));
  M("Annie Lennox",       "Music & Stage", "e6", ["health","culture"],        [72,26,72,32,30], "Eurythmics singer and HIV/AIDS activist.", NV("Annie Lennox"));
  M("Kate Bush",          "Music & Stage", "e5", ["culture"],               [76,24,70,28,26], "Singularly inventive art-pop auteur.", NV("Kate Bush"));
  M("Ozzy Osbourne",      "Music & Stage", "e5", ["culture","defence"],       [72,26,58,12,22], "Black Sabbath's 'Prince of Darkness' and reality-TV patriarch.", NV("Ozzy Osbourne"));
  M("Robbie Williams",    "Music & Stage", "e7", ["culture","leader"],        [78,22,74,22,30], "Take That escapee turned record-breaking solo entertainer.", NV("Robbie Williams"));
  M("Liam Gallagher",     "Music & Stage", "e7", ["culture"],               [74,20,62,14,24], "Oasis frontman and Britpop swagger incarnate.", NV("Liam Gallagher"));
  M("Noel Gallagher",     "Music & Stage", "e7", ["culture","leader"],        [70,22,70,22,28], "Oasis songwriter and acid-tongued elder of Britpop.", NV("Noel Gallagher"));
  M("Damon Albarn",       "Music & Stage", "e7", ["culture","foreign"],       [68,24,68,28,28], "Blur and Gorillaz frontman; restless musical collaborator.", NV("Damon Albarn"));
  M("Ed Sheeran",         "Music & Stage", "e7", ["culture","business"],      [80,18,68,28,34], "Loop-pedal troubadour and one of the best-selling artists of his era.", NV("Ed Sheeran"));
  M("Adele",              "Music & Stage", "e7", ["culture"],               [84,18,76,26,30], "Tottenham's voice of a generation and a global record-breaker.", NV("Adele"));
  M("Harry Styles",       "Music & Stage", "e7", ["culture","foreign"],       [82,14,70,22,28], "One Direction alumnus turned boundary-blurring pop superstar.", NV("Harry Styles"));
  M("Dua Lipa",           "Music & Stage", "e7", ["culture","foreign"],       [80,14,68,26,28], "Pop powerhouse with a sideline in literary and political interviews.", NV("Dua Lipa"));
  M("Stormzy",            "Music & Stage", "e7", ["culture","education"],     [78,16,74,28,30], "Grime's standard-bearer and a funder of Black-British scholarships.", NV("Stormzy"));
  M("Dave",               "Music & Stage", "e7", ["justice","culture"],       [72,14,76,30,26], "Brixton rapper whose 'Black' and 'Question Time' are pure political verse.", NV("Dave (rapper)"));
  M("Lewis Capaldi",      "Music & Stage", "e7", ["culture","health"],        [76,12,66,14,26], "Scottish balladeer beloved for his between-song patter.", NV("Lewis Capaldi"));
  M("Amy Winehouse",      "Music & Stage", "e7", ["culture"],               [76,16,72,14,22], "Generational soul talent of the late 2000s.", NV("Amy Winehouse"));
  M("Charli XCX",         "Music & Stage", "e7", ["culture"],               [74,12,64,20,26], "Hyperpop innovator behind the 'brat' phenomenon.", NV("Charli XCX"));
  M("Raye",               "Music & Stage", "e7", ["culture","business"],      [72,12,66,22,26], "Brit-sweeping independent soul-pop star.", NV("Raye (singer)"));
  M("Sam Smith",          "Music & Stage", "e7", ["culture"],               [72,14,68,22,26], "Chart-topping balladeer and Bond-theme singer.", NV("Sam Smith"));
  M("Spice Girls",        "Music & Stage", "e6", ["culture","leader"],        [80,16,66,18,30], "The 90s pop phenomenon that bottled 'girl power'.", NV("Spice Girls"));
  M("Geri Halliwell",     "Music & Stage", "e6", ["culture","foreign"],       [70,16,62,20,26], "Ginger Spice; later a UN goodwill ambassador.", NV("Geri Halliwell"));
  M("Lily Allen",         "Music & Stage", "e7", ["culture"],               [66,16,68,20,22], "Sharp-tongued pop singer and outspoken commentator.", NV("Lily Allen"));
  M("Skepta",             "Music & Stage", "e7", ["culture"],               [70,14,66,18,24], "Mercury-winning grime pioneer.", NV("Skepta"));
  M("Elvis Presley",      "Music & Stage", "e4", ["culture","leader"],        [86,22,72,18,28], "The King of Rock and Roll.", NV("Elvis Presley"));
  M("John Lennon",        "Music & Stage", "e4", ["foreign","culture"],       [82,26,82,28,28], "Beatle and peace activist; 'Give Peace a Chance'.", NV("John Lennon"));
  M("Bob Dylan",          "Music & Stage", "e4", ["culture","leader"],        [76,30,80,30,26], "Nobel-laureate songwriter and voice of the protest era.", NV("Bob Dylan"));
  M("Bruce Springsteen",  "Music & Stage", "e5", ["culture","business"],      [78,28,76,28,30], "The Boss; blue-collar America's bard.", NV("Bruce Springsteen"));
  M("Dolly Parton",       "Music & Stage", "e5", ["culture","education"],     [82,28,74,34,36], "Country icon, businesswoman and literacy philanthropist.", NV("Dolly Parton"));
  M("Beyoncé",            "Music & Stage", "e7", ["pm","culture","leader"],   [88,18,76,32,34], "Global superstar and one of the most awarded musicians ever.", NV("Beyoncé"));
  M("Jay-Z",              "Music & Stage", "e7", ["business","chancellor"],    [78,20,72,40,32], "Rap mogul turned billionaire entrepreneur.", NV("Jay-Z"));
  M("Taylor Swift",       "Music & Stage", "e7", ["pm","business","culture"], [88,18,74,38,40], "Record-shattering songwriter and a cultural and economic phenomenon.", NV("Taylor Swift"));
  M("Rihanna",            "Music & Stage", "e7", ["business","culture"],      [82,16,68,34,32], "Pop superstar and billionaire beauty-and-fashion founder.", NV("Rihanna"));
  M("Madonna",            "Music & Stage", "e6", ["culture","leader"],        [78,26,72,28,30], "The Queen of Pop and serial reinventor.", NV("Madonna"));
  M("Lady Gaga",          "Music & Stage", "e7", ["culture","health"],        [80,18,74,28,30], "Avant-pop superstar, actor and mental-health advocate.", NV("Lady Gaga"));
  M("Snoop Dogg",         "Music & Stage", "e7", ["culture","foreign"],       [76,18,70,20,26], "West Coast rap institution and unlikely Olympic correspondent.", NV("Snoop Dogg"));
  M("Eminem",             "Music & Stage", "e7", ["culture"],               [74,18,76,18,22], "The best-selling rapper of all time.", NV("Eminem"));
  M("Billie Eilish",      "Music & Stage", "e7", ["culture","environment"],   [78,12,66,24,26], "Generation-Z pop auteur and climate campaigner.", NV("Billie Eilish"));

  /* =========================================================================
     FRINGE · STAGE & SCREEN — the actors take the dispatch box
     ========================================================================= */
  M("Michael Caine",      "Stage & Screen", "e5", ["leader","home"],          [78,32,72,30,32], "Two-time Oscar winner and cockney screen legend.", NV("Michael Caine"));
  M("Judi Dench",         "Stage & Screen", "e6", ["pm","culture"],           [80,40,76,44,40], "Dame of the British stage and screen; an M for the ages.", NV("Judi Dench"));
  M("Ian McKellen",       "Stage & Screen", "e6", ["leader","justice"],       [78,38,82,38,34], "Knighted Shakespearean, Gandalf, and a pioneering gay-rights campaigner.", NV("Ian McKellen"));
  M("Helen Mirren",       "Stage & Screen", "e6", ["pm","foreign"],           [78,36,76,40,36], "Oscar-winning dame who has played the Queen more than once.", NV("Helen Mirren"));
  M("Emma Thompson",      "Stage & Screen", "e7", ["foreign","environment"],  [74,30,80,36,32], "Twice-Oscared actor-screenwriter and tireless activist.", NV("Emma Thompson"));
  M("Hugh Grant",         "Stage & Screen", "e7", ["leader","justice"],       [74,28,76,34,30], "Romantic-comedy star turned dogged campaigner for press regulation.", NV("Hugh Grant"));
  M("Idris Elba",         "Stage & Screen", "e7", ["home","defence","leader"],[80,24,76,34,34], "Luther and Mandela star; a charismatic leading man.", NV("Idris Elba"));
  M("Benedict Cumberbatch","Stage & Screen", "e7", ["foreign","culture"],     [76,24,78,34,30], "Sherlock and Doctor Strange; a classically trained leading man.", NV("Benedict Cumberbatch"));
  M("Daniel Craig",       "Stage & Screen", "e7", ["defence","foreign"],      [78,24,66,32,30], "The grittiest James Bond.", NV("Daniel Craig"));
  M("Tom Hardy",          "Stage & Screen", "e7", ["defence","home"],         [74,20,62,26,26], "Intense, shape-shifting screen hard-man.", NV("Tom Hardy"));
  M("Olivia Colman",      "Stage & Screen", "e7", ["pm","culture"],           [78,22,74,32,32], "Oscar-winning everywoman who played the Queen in 'The Crown'.", NV("Olivia Colman"));
  M("Kate Winslet",       "Stage & Screen", "e7", ["culture","environment"],  [76,24,72,30,30], "Oscar-winning 'Titanic' star.", NV("Kate Winslet"));
  M("Keira Knightley",    "Stage & Screen", "e7", ["culture"],               [72,22,66,26,26], "Period-drama and 'Pirates' leading lady.", NV("Keira Knightley"));
  M("Florence Pugh",      "Stage & Screen", "e7", ["culture","leader"],       [74,16,68,26,26], "One of British cinema's most in-demand younger stars.", NV("Florence Pugh"));
  M("Tom Holland",        "Stage & Screen", "e7", ["culture","health"],       [78,14,64,22,26], "The MCU's Spider-Man and a mental-health advocate.", NV("Tom Holland"));
  M("Daniel Kaluuya",     "Stage & Screen", "e7", ["culture","justice"],      [70,16,68,26,24], "Oscar-winning star of 'Get Out' and 'Judas and the Black Messiah'.", NV("Daniel Kaluuya"));
  M("Dev Patel",          "Stage & Screen", "e7", ["foreign","culture"],      [70,16,66,26,24], "'Slumdog Millionaire' breakout and 'Lion' star.", NV("Dev Patel"));
  M("Riz Ahmed",          "Stage & Screen", "e7", ["culture","justice"],      [68,16,72,28,24], "Oscar-winning actor, rapper and representation campaigner.", NV("Riz Ahmed"));
  M("David Tennant",      "Stage & Screen", "e7", ["leader","culture"],       [76,20,76,28,30], "A beloved Doctor Who and stage actor.", NV("David Tennant"));
  M("Phoebe Waller-Bridge","Stage & Screen", "e7", ["culture","leader"],      [74,18,78,30,30], "Creator of 'Fleabag' and 'Killing Eve'.", NV("Phoebe Waller-Bridge"));
  M("Brian Blessed",      "Stage & Screen", "e6", ["defence","culture"],      [76,26,72,16,28], "Booming actor and adventurer; 'GORDON'S ALIVE!'", NV("Brian Blessed"));
  M("Joanna Lumley",      "Stage & Screen", "e6", ["foreign","culture"],      [78,28,74,36,32], "Ab Fab star who won the Gurkhas the right to settle in Britain.", NV("Joanna Lumley"));
  M("Ricky Tomlinson",    "Stage & Screen", "e6", ["leader","work"],          [66,24,68,22,28], "'Royle Family' star and a jailed Shrewsbury picket turned union cause célèbre.", NV("Ricky Tomlinson"));
  M("Hugh Laurie",        "Stage & Screen", "e7", ["health","culture"],       [74,24,72,30,30], "Blackadder and 'House' star; comedian-turned-leading-man.", NV("Hugh Laurie"));
  M("Sean Connery",       "Stage & Screen", "e5", ["leader","foreign"],       [82,30,74,32,32], "The original James Bond and a fervent Scottish nationalist.", NV("Sean Connery"));
  M("Anthony Hopkins",    "Stage & Screen", "e6", ["justice","culture"],      [78,34,76,36,30], "Oscar-winning master of the screen.", NV("Anthony Hopkins"));
  M("Maggie Smith",       "Stage & Screen", "e6", ["culture","education"],    [76,36,74,34,32], "Grande dame of stage and screen; the Dowager Countess.", NV("Maggie Smith"));
  /* international */
  M("Arnold Schwarzenegger","US Republican", "e6", ["defence","business","pm"], [78,62,70,62,58], "Bodybuilder and action star who served two terms as Governor of California.", { scope: "wild", wiki: "Arnold Schwarzenegger" });
  M("Clint Eastwood",     "Stage & Screen", "e5", ["defence","justice"],      [76,34,62,34,30], "Western and Dirty Harry icon; once mayor of Carmel-by-the-Sea.", NV("Clint Eastwood"));
  M("Tom Cruise",         "Stage & Screen", "e6", ["defence","business"],     [82,26,68,30,30], "Mission: Impossible megastar and last of the movie-star daredevils.", NV("Tom Cruise"));
  M("Leonardo DiCaprio",  "Stage & Screen", "e7", ["environment","foreign"],  [80,24,70,34,30], "Oscar-winning star and one of the screen's biggest climate campaigners.", NV("Leonardo DiCaprio"));
  M("Robert De Niro",     "Stage & Screen", "e6", ["home","justice"],         [78,32,66,32,28], "Method-acting colossus and outspoken political voice.", NV("Robert De Niro"));
  M("Denzel Washington",  "Stage & Screen", "e6", ["leader","defence"],       [80,30,78,34,32], "Two-time Oscar winner and commanding leading man.", NV("Denzel Washington"));
  M("Morgan Freeman",     "Stage & Screen", "e6", ["pm","leader"],            [82,34,80,38,34], "The voice of God; has played presidents and Mandela.", NV("Morgan Freeman"));
  M("Samuel L. Jackson",  "Stage & Screen", "e6", ["defence","culture"],      [78,28,76,26,28], "Ubiquitous and unmistakable screen presence.", NV("Samuel L. Jackson"));
  M("George Clooney",     "Stage & Screen", "e7", ["foreign","leader"],       [82,28,74,40,34], "Oscar-winning star and a serious humanitarian campaigner.", NV("George Clooney"));
  M("Meryl Streep",       "Stage & Screen", "e6", ["pm","culture"],           [80,34,78,38,34], "The most Oscar-nominated actor in history.", NV("Meryl Streep"));
  M("Keanu Reeves",       "Stage & Screen", "e7", ["defence","culture"],      [80,24,60,24,28], "John Wick and Neo; Hollywood's most beloved nice guy.", NV("Keanu Reeves"));
  M("Dwayne Johnson",     "Stage & Screen", "e7", ["business","defence","pm"],[84,18,72,30,34], "'The Rock' — wrestler-turned-box-office king who has mused about the presidency.", NV("Dwayne Johnson"));
  M("Ryan Reynolds",      "Stage & Screen", "e7", ["business","culture"],     [80,18,72,34,32], "Deadpool star and, with Wrexham AFC, a most unlikely football owner.", NV("Ryan Reynolds"));
  M("Angelina Jolie",     "Stage & Screen", "e7", ["foreign","health"],       [78,26,70,38,30], "Oscar-winning star and long-serving UN refugee envoy.", NV("Angelina Jolie"));
  M("Jackie Chan",        "Stage & Screen", "e6", ["defence","foreign"],      [78,26,62,28,28], "Death-defying martial-arts and comedy superstar.", NV("Jackie Chan"));

  /* =========================================================================
     FRINGE · SPORTING GREATS — demigods of the pitch, ring and track
     ========================================================================= */
  M("David Beckham",      "Sporting Greats", "e7", ["foreign","culture","leader"], [84,24,62,30,34], "England captain turned global brand and Olympic-bid ambassador.", NV("David Beckham"));
  M("Marcus Rashford",    "Sporting Greats", "e7", ["education","health"],    [76,16,66,30,28], "England forward whose campaign forced a U-turn on free school meals.", NV("Marcus Rashford"));
  M("Harry Kane",         "Sporting Greats", "e7", ["leader","defence"],      [72,16,58,24,30], "England's record goalscorer and captain.", NV("Harry Kane"));
  M("Jude Bellingham",    "Sporting Greats", "e7", ["leader"],               [72,10,58,20,28], "England and Real Madrid midfield prodigy.", NV("Jude Bellingham"));
  M("Bukayo Saka",        "Sporting Greats", "e7", ["culture"],              [70,10,54,18,24], "Arsenal and England forward who answered abuse with grace.", NV("Bukayo Saka"));
  M("Steven Gerrard",     "Sporting Greats", "e7", ["leader","defence"],      [72,18,60,24,30], "Liverpool and England midfield talisman.", NV("Steven Gerrard"));
  M("Gary Lineker",       "Sporting Greats", "e7", ["culture","leader"],      [74,22,70,28,30], "England striker turned 'Match of the Day' host and outspoken tweeter.", NV("Gary Lineker"));
  M("Gary Neville",       "Sporting Greats", "e7", ["business","leader"],     [66,20,68,30,30], "Manchester United stalwart turned pundit and political commentator.", NV("Gary Neville"));
  M("Ian Wright",         "Sporting Greats", "e7", ["culture","education"],   [72,18,64,20,26], "Arsenal and England goal machine and beloved broadcaster.", NV("Ian Wright"));
  M("Alan Shearer",       "Sporting Greats", "e6", ["leader"],               [68,20,58,20,28], "The Premier League's record goalscorer.", NV("Alan Shearer"));
  M("Roy Keane",          "Sporting Greats", "e6", ["whip","defence"],        [62,20,64,18,34], "Fearsome Manchester United captain and famously frank pundit.", NV("Roy Keane"));
  M("Vinnie Jones",       "Sporting Greats", "e6", ["defence","home"],        [64,18,56,14,24], "Wimbledon hard-man turned Hollywood tough guy.", NV("Vinnie Jones"));
  M("Bobby Moore",        "Sporting Greats", "e4", ["leader","defence"],      [76,22,58,28,32], "England's World Cup-winning captain of 1966.", NV("Bobby Moore"));
  M("George Best",        "Sporting Greats", "e4", ["culture"],              [78,18,58,14,22], "Manchester United's mercurial genius; the first pop-star footballer.", NV("George Best"));
  M("Bobby Charlton",     "Sporting Greats", "e5", ["leader","foreign"],      [76,26,60,30,32], "World Cup winner and Manchester United and England icon.", NV("Bobby Charlton"));
  M("Eric Cantona",       "Sporting Greats", "e6", ["culture","leader"],      [70,18,64,18,22], "United's enigmatic, philosophising French talisman.", NV("Eric Cantona"));
  M("Lewis Hamilton",     "Sporting Greats", "e7", ["foreign","culture"],     [80,22,66,32,30], "Seven-time F1 world champion and diversity campaigner.", NV("Lewis Hamilton"));
  M("Andy Murray",        "Sporting Greats", "e7", ["defence","leader"],      [74,22,56,28,30], "Scotland's two-time Wimbledon champion and Olympic gold medallist.", NV("Andy Murray"));
  M("Emma Raducanu",      "Sporting Greats", "e7", ["culture"],              [70,10,52,18,22], "Britain's fairy-tale US Open champion.", NV("Emma Raducanu"));
  M("Tyson Fury",         "Sporting Greats", "e7", ["defence","health"],      [70,16,62,14,24], "The 'Gypsy King'; heavyweight champion and mental-health voice.", NV("Tyson Fury"));
  M("Anthony Joshua",     "Sporting Greats", "e7", ["defence"],              [72,16,56,18,26], "British unified heavyweight champion and Olympic gold medallist.", NV("Anthony Joshua"));
  M("Lennox Lewis",       "Sporting Greats", "e6", ["defence"],              [70,20,56,20,26], "Undisputed heavyweight champion of the world.", NV("Lennox Lewis"));
  M("Frank Bruno",        "Sporting Greats", "e5", ["culture","health"],      [68,18,56,12,22], "Beloved heavyweight champion and mental-health campaigner.", NV("Frank Bruno"));
  M("Ricky Hatton",       "Sporting Greats", "e6", ["defence"],              [66,16,54,12,22], "Manchester's beloved 'Hitman' light-welterweight champion.", NV("Ricky Hatton"));
  M("Mo Farah",           "Sporting Greats", "e7", ["health","defence"],      [74,18,58,24,28], "Britain's four-time Olympic distance champion.", NV("Mo Farah"));
  M("Jessica Ennis-Hill", "Sporting Greats", "e7", ["health","education"],    [72,16,56,26,28], "The face of London 2012 and Olympic heptathlon champion.", NV("Jessica Ennis-Hill"));
  M("Kelly Holmes",       "Sporting Greats", "e6", ["defence","health"],      [72,22,58,28,30], "Double Olympic champion and former Army sergeant.", NV("Kelly Holmes"));
  M("Daley Thompson",     "Sporting Greats", "e5", ["health","defence"],      [70,20,56,20,26], "Two-time Olympic decathlon champion.", NV("Daley Thompson"));
  M("Chris Hoy",          "Sporting Greats", "e7", ["transport","defence"],   [72,20,58,28,28], "Six-time Olympic cycling champion.", NV("Chris Hoy"));
  M("Bradley Wiggins",    "Sporting Greats", "e7", ["transport","culture"],   [70,18,56,20,24], "Britain's first Tour de France winner and Olympic great.", NV("Bradley Wiggins"));
  M("Tom Daley",          "Sporting Greats", "e7", ["culture","health"],      [72,14,54,20,24], "Olympic diving champion, LGBT advocate and national knitter.", NV("Tom Daley"));
  M("Ben Stokes",         "Sporting Greats", "e7", ["defence","leader"],      [72,16,56,22,30], "England's talismanic, match-winning cricket captain.", NV("Ben Stokes"));
  M("Andrew Flintoff",    "Sporting Greats", "e6", ["culture","defence"],     [70,18,60,16,26], "'Freddie' — Ashes hero turned beloved presenter.", NV("Andrew Flintoff"));
  M("Ian Botham",         "Sporting Greats", "e5", ["defence","leader"],      [70,24,60,22,28], "Ashes legend, charity walker and now a life peer.", NV("Ian Botham"));
  M("W. G. Grace",        "Sporting Greats", "e1", ["leader","health"],       [72,30,58,24,30], "The bearded Victorian who made cricket a national game.", NV("W. G. Grace"));
  /* international */
  M("Muhammad Ali",       "Sporting Greats", "e4", ["foreign","leader","defence"], [88,26,80,30,30], "'The Greatest'; heavyweight champion and anti-war conscientious objector.", NV("Muhammad Ali"));
  M("Pelé",               "Sporting Greats", "e5", ["foreign","culture"],     [82,24,60,28,30], "Brazil's three-time World Cup winner; football's global ambassador.", NV("Pelé"));
  M("Diego Maradona",     "Sporting Greats", "e6", ["culture","leader"],      [78,18,64,14,22], "Argentina's flawed genius of the 1986 World Cup.", NV("Diego Maradona"));
  M("Lionel Messi",       "Sporting Greats", "e7", ["culture","leader"],      [82,16,52,24,30], "Argentina's World Cup-winning eight-time Ballon d'Or holder.", NV("Lionel Messi"));
  M("Cristiano Ronaldo",  "Sporting Greats", "e7", ["business","culture"],    [82,18,60,24,32], "Portugal's record-breaking superstar and one of sport's biggest brands.", NV("Cristiano Ronaldo"));
  M("Usain Bolt",         "Sporting Greats", "e7", ["culture","defence"],     [82,16,62,22,28], "Jamaica's eight-time Olympic sprint champion; the fastest man ever.", NV("Usain Bolt"));
  M("Serena Williams",    "Sporting Greats", "e7", ["leader","business"],     [80,22,66,30,32], "Twenty-three-time Grand Slam champion and a businesswoman.", NV("Serena Williams"));
  M("Conor McGregor",     "Sporting Greats", "e7", ["defence","business"],    [72,14,66,16,24], "Brash UFC champion who has flirted with an Irish presidential run.", NV("Conor McGregor"));
  M("Mike Tyson",         "Sporting Greats", "e6", ["defence"],              [72,16,58,10,20], "'Iron Mike'; the youngest heavyweight champion in history.", NV("Mike Tyson"));

  /* =========================================================================
     FRINGE · TECH & TYCOONS — the billionaires' budget
     ========================================================================= */
  M("Elon Musk",          "Tech & Tycoons", "e7", ["business","chancellor","defence"], [74,30,64,46,30], "Tesla, SpaceX and X owner; the world's richest and most chaotic entrepreneur.", NV("Elon Musk"));
  M("Jeff Bezos",         "Tech & Tycoons", "e7", ["business","chancellor"],  [60,34,56,56,38], "Amazon founder and one of the richest people alive.", NV("Jeff Bezos"));
  M("Bill Gates",         "Tech & Tycoons", "e7", ["health","business","chancellor"], [62,40,58,62,40], "Microsoft co-founder turned the world's biggest health philanthropist.", NV("Bill Gates"));
  M("Mark Zuckerberg",    "Tech & Tycoons", "e7", ["business","culture"],     [54,28,48,52,34], "Facebook founder and Meta chief.", NV("Mark Zuckerberg"));
  M("Steve Jobs",         "Tech & Tycoons", "e7", ["business","culture","pm"],[78,32,76,52,40], "Apple's visionary co-founder and the great showman of tech.", NV("Steve Jobs"));
  M("Tim Cook",           "Tech & Tycoons", "e7", ["business","chancellor"],  [58,40,54,60,46], "Apple's operations-genius chief executive.", NV("Tim Cook"));
  M("Sam Altman",         "Tech & Tycoons", "e7", ["business","education"],   [60,26,58,50,36], "OpenAI chief at the centre of the AI boom.", NV("Sam Altman"));
  M("Jensen Huang",       "Tech & Tycoons", "e7", ["business","defence"],     [62,32,58,56,40], "Nvidia founder whose chips power the AI revolution.", NV("Jensen Huang"));
  M("Warren Buffett",     "Tech & Tycoons", "e6", ["chancellor","business"],  [66,46,62,66,42], "The 'Oracle of Omaha'; history's most celebrated investor.", NV("Warren Buffett"));
  M("Richard Branson",    "Tech & Tycoons", "e6", ["business","transport","leader"], [76,34,66,44,40], "Virgin founder, balloonist and serial entrepreneur-adventurer.", NV("Richard Branson"));
  M("James Dyson",        "Tech & Tycoons", "e7", ["business","education"],   [60,34,52,52,38], "Inventor-engineer and vacuum-cleaner billionaire.", NV("James Dyson"));
  M("Alan Sugar",         "Tech & Tycoons", "e6", ["business","chancellor","whip"], [62,40,64,48,46], "Amstrad founder, life peer and 'The Apprentice' boss; 'You're fired'.", NV("Alan Sugar"));
  M("Deborah Meaden",     "Tech & Tycoons", "e7", ["business","environment"], [60,30,60,46,38], "'Dragons' Den' investor and sustainability advocate.", NV("Deborah Meaden"));
  M("Peter Jones",        "Tech & Tycoons", "e7", ["business"],              [58,30,58,44,36], "The towering 'Dragons' Den' entrepreneur.", NV("Peter Jones (businessman)"));
  M("Duncan Bannatyne",   "Tech & Tycoons", "e6", ["business","health"],      [56,30,54,42,34], "Self-made leisure entrepreneur and 'Dragon'.", NV("Duncan Bannatyne"));
  M("Jim Ratcliffe",      "Tech & Tycoons", "e7", ["business","defence"],     [54,34,48,52,36], "Ineos chemicals billionaire and Manchester United co-owner.", NV("Jim Ratcliffe"));
  M("Jack Ma",            "Tech & Tycoons", "e7", ["business","foreign"],     [62,32,62,52,38], "Alibaba founder; one of China's most famous entrepreneurs.", NV("Jack Ma"));
  M("Bernard Arnault",    "Tech & Tycoons", "e7", ["business","culture"],     [56,40,52,58,40], "LVMH chairman and a perennial contender for world's richest.", NV("Bernard Arnault"));

  /* =========================================================================
     FRINGE · ICONS & INFLUENCERS — national treasures, chefs & reality royalty
     ========================================================================= */
  M("David Attenborough", "Icons & Influencers", "e6", ["environment","education","foreign"], [90,42,80,46,40], "The voice of the natural world and the planet's foremost broadcaster.", NV("David Attenborough"));
  M("Jamie Oliver",       "Icons & Influencers", "e7", ["health","education"],[74,24,68,34,32], "Celebrity chef whose campaign reshaped England's school dinners.", NV("Jamie Oliver"));
  M("Gordon Ramsay",      "Icons & Influencers", "e7", ["business","culture"],[72,24,66,30,34], "Volcanic Michelin-starred chef and global TV brand.", NV("Gordon Ramsay"));
  M("Mary Berry",         "Icons & Influencers", "e6", ["culture","education"], [76,30,64,28,32], "The nation's favourite baker and 'Bake Off' doyenne.", NV("Mary Berry"));
  M("Nigella Lawson",     "Icons & Influencers", "e7", ["culture","chancellor"], [72,26,68,30,30], "Cookery writer and broadcaster — and Nigel Lawson's daughter.", NV("Nigella Lawson"));
  M("Greta Thunberg",     "Icons & Influencers", "e7", ["environment","foreign"], [66,16,70,28,24], "Swedish school-striker who became the face of climate activism.", NV("Greta Thunberg"));
  M("Bear Grylls",        "Icons & Influencers", "e7", ["defence","education"], [74,22,64,28,32], "Survival adventurer and Chief Scout.", NV("Bear Grylls"));
  M("Steve Irwin",        "Icons & Influencers", "e6", ["environment"],       [78,20,62,22,26], "The 'Crocodile Hunter'; irrepressible Australian conservationist.", NV("Steve Irwin"));
  M("Louis Theroux",      "Icons & Influencers", "e7", ["foreign","culture"], [68,22,68,34,28], "Documentary-maker of the awkward, revealing encounter.", NV("Louis Theroux"));
  M("Jeremy Clarkson",    "Icons & Influencers", "e7", ["transport","environment"], [72,24,70,26,28], "Top Gear motor-mouth turned 'Clarkson's Farm' countryside champion.", NV("Jeremy Clarkson"));
  M("Richard Hammond",    "Icons & Influencers", "e7", ["transport","culture"], [64,20,58,20,26], "'Hamster' of Top Gear and 'The Grand Tour'.", NV("Richard Hammond"));
  M("James May",          "Icons & Influencers", "e7", ["transport","education"], [64,22,58,28,28], "'Captain Slow'; the thoughtful third of the Top Gear trio.", NV("James May"));
  M("Holly Willoughby",   "Icons & Influencers", "e7", ["culture"],          [66,16,56,18,26], "Daytime-TV presenter and a fixture of the sofa.", NV("Holly Willoughby"));
  M("Ant McPartlin",      "Icons & Influencers", "e7", ["culture","leader"],  [70,18,60,18,28], "Half of Ant & Dec, Britain's most decorated TV-presenting duo.", NV("Ant McPartlin"));
  M("Declan Donnelly",    "Icons & Influencers", "e7", ["culture"],          [70,18,60,18,28], "The other half of Ant & Dec.", NV("Declan Donnelly"));
  M("Simon Cowell",       "Icons & Influencers", "e7", ["business","culture"], [66,24,62,32,30], "Acerbic music-and-talent-show mogul.", NV("Simon Cowell"));
  M("Graham Norton",      "Icons & Influencers", "e7", ["culture","foreign"], [74,22,72,26,30], "Ireland's king of the chat-show sofa.", NV("Graham Norton"));
  M("Jonathan Ross",      "Icons & Influencers", "e6", ["culture"],          [66,24,68,22,26], "Long-reigning chat-show host and film critic.", NV("Jonathan Ross"));
  M("Claudia Winkleman",  "Icons & Influencers", "e7", ["culture"],          [68,18,64,22,28], "Fringe-and-eyeliner host of Strictly and 'The Traitors'.", NV("Claudia Winkleman"));
  M("Bruce Forsyth",      "Icons & Influencers", "e5", ["culture","leader"],  [74,30,68,20,30], "'Nice to see you' — the grand old man of Saturday-night TV.", NV("Bruce Forsyth"));
  M("Cilla Black",        "Icons & Influencers", "e5", ["culture"],          [72,26,62,18,28], "Singer turned 'Blind Date' and 'Surprise Surprise' hostess.", NV("Cilla Black"));
  M("Joan Collins",       "Icons & Influencers", "e6", ["culture","foreign"], [70,28,64,24,28], "'Dynasty' diva and grande dame of glamour.", NV("Joan Collins"));
  M("Twiggy",             "Icons & Influencers", "e4", ["culture"],          [70,24,56,20,26], "The face of the Swinging Sixties and the first supermodel.", NV("Twiggy"));
  M("Naomi Campbell",     "Icons & Influencers", "e7", ["culture","foreign"], [68,24,58,24,26], "Original British supermodel and a fashion power-broker.", NV("Naomi Campbell"));
  M("Kate Moss",          "Icons & Influencers", "e6", ["culture"],          [68,22,52,22,24], "The defining supermodel of the 1990s.", NV("Kate Moss"));
  M("Stacey Solomon",     "Icons & Influencers", "e7", ["culture","health"],  [66,14,58,16,26], "Reality-to-national-treasure presenter and crafting queen.", NV("Stacey Solomon"));
  M("Gemma Collins",      "Icons & Influencers", "e7", ["culture"],          [62,10,56,10,22], "'The GC'; reality television's self-styled diva.", NV("Gemma Collins"));
  M("Katie Price",        "Icons & Influencers", "e7", ["culture","health"],  [60,16,54,12,22], "Model and media personality who stood for Parliament in 2001 as 'Jordan'.", NV("Katie Price"));
  M("Kim Kardashian",     "Icons & Influencers", "e7", ["justice","business"],[72,18,58,30,28], "Reality superstar, beauty mogul and prison-reform advocate.", NV("Kim Kardashian"));
  M("Paris Hilton",       "Icons & Influencers", "e7", ["business","culture"],[64,14,54,22,24], "Original reality-and-heiress celebrity and DJ-entrepreneur.", NV("Paris Hilton"));
  M("Martha Stewart",     "Icons & Influencers", "e6", ["business","culture"],[64,30,58,40,32], "American lifestyle mogul of homemaking and media.", NV("Martha Stewart"));

  /* =========================================================================
     FRINGE · PULPIT & PUNDITRY — the commentariat and the candidates who tried
     ========================================================================= */
  M("Piers Morgan",       "Pulpit & Punditry", "e7", ["leader","foreign"],    [62,28,74,26,26], "Combative broadcaster and interviewer of presidents.", NV("Piers Morgan"));
  M("Owen Jones",         "Pulpit & Punditry", "e7", ["leader","justice"],    [58,18,72,24,22], "Left-wing Guardian columnist, author and YouTuber.", NV("Owen Jones"));
  M("Jeremy Paxman",      "Pulpit & Punditry", "e6", ["leader","justice"],    [64,30,76,32,26], "Newsnight's famously withering inquisitor and quizmaster.", NV("Jeremy Paxman"));
  M("Andrew Neil",        "Pulpit & Punditry", "e6", ["leader","chancellor"], [60,34,72,36,28], "Forensic political interviewer and newspaper veteran.", NV("Andrew Neil"));
  M("Emily Maitlis",      "Pulpit & Punditry", "e7", ["foreign","leader"],    [62,24,70,32,26], "Broadcaster behind a celebrated, unflinching royal interview.", NV("Emily Maitlis"));
  M("Robert Peston",      "Pulpit & Punditry", "e7", ["chancellor","business"], [56,26,64,38,26], "ITV political editor and economics explainer.", NV("Robert Peston"));
  M("Laura Kuenssberg",   "Pulpit & Punditry", "e7", ["leader","foreign"],    [56,24,64,34,26], "Former BBC political editor and Sunday-show host.", NV("Laura Kuenssberg"));
  M("Jon Snow",           "Pulpit & Punditry", "e6", ["foreign","leader"],    [62,30,72,30,26], "Channel 4 News anchor of the bold tie for three decades.", NV("Jon Snow (journalist)"));
  M("Clare Balding",      "Pulpit & Punditry", "e7", ["culture","health"],    [66,24,66,30,30], "The nation's go-to sports and ceremonial broadcaster.", NV("Clare Balding"));
  M("J. K. Rowling",      "Pulpit & Punditry", "e7", ["culture","education"], [70,26,68,40,30], "Harry Potter author and a prominent, much-debated commentator on sex and gender.", NV("J. K. Rowling"));
  M("Salman Rushdie",     "Pulpit & Punditry", "e6", ["foreign","justice"],   [60,30,70,34,24], "Booker-winning novelist and free-speech symbol.", NV("Salman Rushdie"));
  M("Stephen King",       "Pulpit & Punditry", "e7", ["culture"],            [62,30,62,26,24], "Prolific American author and outspoken political voice.", NV("Stephen King"));
  M("Carl Benjamin",      "Pulpit & Punditry", "e7", ["leader"],             [42,16,58,18,18], "Online commentator 'Sargon of Akkad'; stood as a UKIP MEP candidate in 2019.", NV("Carl Benjamin"));
  M("Laurence Fox",       "Pulpit & Punditry", "e7", ["culture","leader"],    [46,16,58,18,20], "Actor who founded the Reclaim Party and ran for London Mayor.", NV("Laurence Fox"));
  M("Joe Rogan",          "Pulpit & Punditry", "e7", ["leader","health"],     [66,20,72,24,24], "The world's most-listened-to podcaster.", NV("Joe Rogan"));
  M("Oprah Winfrey",      "Pulpit & Punditry", "e6", ["pm","leader","culture"], [82,32,80,44,38], "America's most influential talk-show host and a media billionaire.", NV("Oprah Winfrey"));
  M("Jordan Peterson",    "Pulpit & Punditry", "e7", ["education","justice"], [54,24,68,28,22], "Canadian psychologist and divisive cultural commentator.", NV("Jordan Peterson"));
  M("Ben Shapiro",        "Pulpit & Punditry", "e7", ["leader","justice"],    [50,20,72,24,22], "Fast-talking American conservative commentator.", NV("Ben Shapiro"));
  M("Tucker Carlson",     "Pulpit & Punditry", "e7", ["leader","foreign"],    [52,22,68,24,24], "Influential American populist broadcaster.", NV("Tucker Carlson"));
  M("Rachel Maddow",      "Pulpit & Punditry", "e7", ["leader","justice"],    [56,24,70,30,24], "Leading American liberal news anchor.", NV("Rachel Maddow"));

  /* =========================================================================
     WILDCARD · the globe and all of history (scope "wild")
     "Politically aligned people" the world over. These appear in Wildcard only.
     ========================================================================= */
  var W = { scope: "wild" };
  function WD(wiki) { return { scope: "wild", wiki: wiki }; }
  function DESP(wiki) { return { scope: "wild", despot: true, wiki: wiki }; }

  /* ---- World Leaders & statesmen ---- */
  M("Martin Luther King Jr.",   "World Leaders", "e4", ["leader","justice","foreign"], [86,30,92,40,40], "Baptist minister who led the American civil-rights movement.", WD("Martin Luther King Jr."));
  M("Boris Yeltsin",            "World Leaders", "e6", ["pm","chancellor"],   [58,42,60,40,38], "Russia's first post-Soviet president.", WD("Boris Yeltsin"));
  M("Nikita Khrushchev",        "World Leaders", "e4", ["pm","foreign"],      [56,46,62,48,46], "Soviet leader of the Thaw and the Cuban Missile Crisis.", WD("Nikita Khrushchev"));
  M("Leonid Brezhnev",          "World Leaders", "e4", ["pm","defence"],      [48,46,50,46,50], "Long-serving Soviet leader of the stagnation era.", WD("Leonid Brezhnev"));
  M("Catherine the Great",      "World Leaders", "e0", ["pm","foreign"],      [70,48,68,56,50], "Empress who expanded and modernised imperial Russia.", WD("Catherine the Great"));
  M("Peter the Great",          "World Leaders", "e0", ["pm","defence"],      [66,46,62,56,52], "Tsar who dragged Russia toward Europe by force.", WD("Peter the Great"));
  M("Georges Clemenceau",       "World Leaders", "e3", ["pm","defence"],      [62,48,74,50,46], "France's bullish 'Tiger' who led it through the Great War.", WD("Georges Clemenceau"));
  M("Léon Blum",                "World Leaders", "e3", ["pm","work"],         [58,40,68,42,40], "France's first socialist and Jewish prime minister.", WD("Léon Blum"));
  M("Nicolas Sarkozy",          "World Leaders", "e7", ["pm","home"],         [60,40,64,42,40], "Energetic centre-right French president, 2007–12.", WD("Nicolas Sarkozy"));
  M("Helmut Schmidt",           "World Leaders", "e4", ["chancellor","defence"], [60,46,66,52,44], "Pragmatic West German chancellor of the 1970s.", WD("Helmut Schmidt"));
  M("Gerhard Schröder",         "World Leaders", "e6", ["pm","business"],     [56,42,62,42,42], "SPD chancellor who reformed Germany's labour market.", WD("Gerhard Schröder"));
  M("Olaf Scholz",              "World Leaders", "e7", ["chancellor"],        [48,42,48,44,40], "German chancellor who led the post-2022 'Zeitenwende'.", WD("Olaf Scholz"));
  M("Silvio Berlusconi",        "World Leaders", "e6", ["pm","business"],     [62,40,64,30,38], "Media billionaire and Italy's flamboyant, scandal-prone premier.", WD("Silvio Berlusconi"));
  M("Giorgia Meloni",           "World Leaders", "e7", ["pm","foreign"],      [58,32,66,40,44], "Italy's first woman prime minister, of the hard right.", WD("Giorgia Meloni"));
  M("Alcide De Gasperi",        "World Leaders", "e4", ["pm","foreign"],      [56,46,60,54,46], "Founding father of the Italian republic and of European unity.", WD("Alcide De Gasperi"));
  M("Felipe González",          "World Leaders", "e5", ["pm","foreign"],      [62,42,68,46,44], "Socialist who modernised post-Franco Spain.", WD("Felipe González"));
  M("Olof Palme",               "World Leaders", "e5", ["pm","foreign"],      [62,40,72,44,40], "Sweden's reforming social-democratic premier, assassinated in 1986.", WD("Olof Palme"));
  M("Gro Harlem Brundtland",    "World Leaders", "e5", ["pm","health","environment"], [62,42,66,50,42], "Norwegian premier and pioneer of 'sustainable development'.", WD("Gro Harlem Brundtland"));
  M("Mary Robinson",            "World Leaders", "e6", ["foreign","justice"], [64,38,70,44,38], "Ireland's first woman president and UN human-rights chief.", WD("Mary Robinson"));
  M("Bertie Ahern",             "World Leaders", "e6", ["pm","foreign"],      [58,42,62,46,44], "Taoiseach who helped seal the Good Friday Agreement.", WD("Bertie Ahern"));
  M("Lech Wałęsa",              "World Leaders", "e5", ["leader","work"],     [66,34,70,38,40], "Solidarity electrician who became Poland's president.", WD("Lech Wałęsa"));
  M("Václav Havel",             "World Leaders", "e5", ["leader","culture"],  [68,32,74,40,36], "Dissident playwright who became Czechoslovakia's president.", WD("Václav Havel"));
  M("Josip Broz Tito",          "World Leaders", "e4", ["pm","defence"],      [62,46,64,52,52], "Partisan leader who held non-aligned Yugoslavia together.", WD("Josip Broz Tito"));
  M("Shimon Peres",             "World Leaders", "e6", ["pm","foreign"],      [60,46,66,48,42], "Israeli statesman of war and of the Oslo peace process.", WD("Shimon Peres"));
  M("Menachem Begin",           "World Leaders", "e5", ["pm","defence"],      [56,44,64,46,42], "Israeli premier who made peace with Egypt at Camp David.", WD("Menachem Begin"));
  M("Yasser Arafat",            "World Leaders", "e6", ["leader","foreign"],  [58,40,66,36,40], "Long-time leader of the Palestinian national movement.", WD("Yasser Arafat"));
  M("King Hussein of Jordan",   "World Leaders", "e5", ["pm","foreign"],      [62,44,64,50,46], "Long-reigning Jordanian king and regional peacemaker.", WD("Hussein of Jordan"));
  M("Mohammad Mosaddegh",       "World Leaders", "e4", ["pm","business"],     [60,40,66,42,38], "Iran's nationalist premier, ousted in a 1953 coup.", WD("Mohammad Mosaddegh"));
  M("Narendra Modi",            "World Leaders", "e7", ["pm","foreign"],      [66,40,68,44,48], "India's Hindu-nationalist prime minister since 2014.", WD("Narendra Modi"));
  M("Manmohan Singh",           "World Leaders", "e6", ["chancellor","business"], [50,48,52,58,40], "Economist-reformer who served as India's prime minister.", WD("Manmohan Singh"));
  M("Muhammad Ali Jinnah",      "World Leaders", "e3", ["pm","leader"],       [64,44,72,50,46], "Founder and first leader of Pakistan.", WD("Muhammad Ali Jinnah"));
  M("Benazir Bhutto",           "World Leaders", "e5", ["pm","foreign"],      [66,38,72,42,40], "First woman to lead a modern Muslim state; assassinated in 2007.", WD("Benazir Bhutto"));
  M("Aung San Suu Kyi",         "World Leaders", "e6", ["leader","foreign"],  [60,34,68,36,36], "Nobel laureate and Myanmar leader, later widely criticised.", WD("Aung San Suu Kyi"));
  M("Corazon Aquino",           "World Leaders", "e5", ["pm","leader"],       [62,32,64,40,38], "Housewife-turned-president of the Philippine 'People Power'.", WD("Corazon Aquino"));
  M("Mahathir Mohamad",         "World Leaders", "e6", ["pm","business"],     [56,48,60,52,46], "Malaysia's long-dominant modernising premier.", WD("Mahathir Mohamad"));
  M("Sun Yat-sen",              "World Leaders", "e2", ["leader","foreign"],  [66,38,70,42,42], "Founding father of republican China.", WD("Sun Yat-sen"));
  M("Zhou Enlai",               "World Leaders", "e4", ["foreign","pm"],      [60,46,66,52,46], "China's urbane premier and diplomat under Mao.", WD("Zhou Enlai"));
  M("Chiang Kai-shek",          "World Leaders", "e3", ["defence","pm"],      [52,44,56,46,48], "Nationalist leader of China and then Taiwan.", WD("Chiang Kai-shek"));
  M("Hirohito",                 "World Leaders", "e3", ["foreign"],           [44,40,42,42,42], "Japan's emperor through the Second World War and reconstruction.", WD("Hirohito"));
  M("Junichiro Koizumi",        "World Leaders", "e6", ["pm","business"],     [60,42,64,46,44], "Reformist, telegenic Japanese prime minister.", WD("Junichiro Koizumi"));
  M("Justin Trudeau",           "World Leaders", "e7", ["pm","foreign"],      [62,34,64,38,40], "Canada's telegenic Liberal prime minister, 2015–25.", WD("Justin Trudeau"));
  M("Brian Mulroney",           "World Leaders", "e5", ["pm","business"],     [56,44,62,48,46], "Canada's free-trade-championing Progressive Conservative premier.", WD("Brian Mulroney"));
  M("Jean Chrétien",            "World Leaders", "e6", ["pm","chancellor"],   [56,46,58,50,48], "Canada's long-serving, budget-balancing Liberal premier.", WD("Jean Chrétien"));
  M("Julia Gillard",            "World Leaders", "e7", ["pm","education"],    [60,38,66,42,42], "Australia's first woman prime minister.", WD("Julia Gillard"));
  M("Kevin Rudd",               "World Leaders", "e7", ["pm","foreign"],      [56,40,60,44,40], "Mandarin-speaking Australian Labor prime minister.", WD("Kevin Rudd"));
  M("Robert Menzies",           "World Leaders", "e4", ["pm","foreign"],      [58,48,64,52,50], "Australia's longest-serving prime minister.", WD("Robert Menzies"));
  M("F. W. de Klerk",           "World Leaders", "e5", ["pm","justice"],      [50,42,58,46,42], "South African president who released Mandela and ended apartheid.", WD("F. W. de Klerk"));
  M("Desmond Tutu",             "World Leaders", "e5", ["leader","justice"],  [76,30,82,38,36], "Archbishop and conscience of post-apartheid South Africa.", WD("Desmond Tutu"));
  M("Kwame Nkrumah",            "World Leaders", "e4", ["leader","foreign"],  [66,36,72,40,42], "Pan-African pioneer and Ghana's founding leader.", WD("Kwame Nkrumah"));
  M("Jomo Kenyatta",            "World Leaders", "e4", ["pm","leader"],       [62,38,64,44,44], "Kenya's founding president.", WD("Jomo Kenyatta"));
  M("Haile Selassie",           "World Leaders", "e3", ["foreign"],           [56,42,58,44,46], "Ethiopia's last emperor and a pan-African symbol.", WD("Haile Selassie"));
  M("Dalai Lama (14th)",        "World Leaders", "e4", ["leader","foreign"],  [78,30,76,34,34], "Exiled spiritual leader of Tibetan Buddhism and Nobel laureate.", WD("14th Dalai Lama"));
  M("Pope John Paul II",        "World Leaders", "e5", ["foreign","leader"],  [74,38,78,42,44], "Polish pope whose moral authority helped end the Cold War.", WD("Pope John Paul II"));
  M("Pope Francis",             "World Leaders", "e7", ["foreign","health"],  [70,36,68,40,42], "Reforming Argentine pope, 2013–25.", WD("Pope Francis"));

  /* ---- US Republicans ---- */
  M("Ulysses S. Grant",         "US Republican", "e1", ["defence","pm"],      [54,44,52,42,42], "Union general who won the Civil War and became president.", WD("Ulysses S. Grant"));
  M("Calvin Coolidge",          "US Republican", "e3", ["chancellor"],        [44,40,46,44,40], "Laconic 'Silent Cal' of the Roaring Twenties.", WD("Calvin Coolidge"));
  M("Herbert Hoover",           "US Republican", "e3", ["business","chancellor"], [42,42,48,44,38], "Engineer-president overwhelmed by the Great Depression.", WD("Herbert Hoover"));
  M("Gerald Ford",              "US Republican", "e4", ["pm"],                [48,42,50,42,42], "The only unelected US president; healer after Watergate.", WD("Gerald Ford"));
  M("John McCain",              "US Republican", "e7", ["defence","foreign"], [62,46,64,46,42], "War-hero senator and 2008 presidential nominee.", WD("John McCain"));
  M("Mitt Romney",              "US Republican", "e7", ["business","chancellor"], [54,42,56,50,42], "Businessman, governor and 2012 nominee.", WD("Mitt Romney"));
  M("Mike Pence",               "US Republican", "e7", ["pm","justice"],      [46,40,52,42,42], "Vice-president, 2017–21.", WD("Mike Pence"));
  M("Dick Cheney",              "US Republican", "e7", ["defence","foreign"], [42,48,50,52,44], "Powerful vice-president to George W. Bush.", WD("Dick Cheney"));
  M("Colin Powell",             "US Republican", "e6", ["defence","foreign"], [64,48,66,52,44], "Soldier-statesman and the first Black US Secretary of State.", WD("Colin Powell"));
  M("Condoleezza Rice",         "US Republican", "e6", ["foreign","education"], [58,46,62,52,42], "National Security Adviser and Secretary of State.", WD("Condoleezza Rice"));
  M("Henry Kissinger",          "US Republican", "e4", ["foreign","defence"], [54,50,64,58,44], "Realist statesman and architect of détente and shuttle diplomacy.", WD("Henry Kissinger"));
  M("Barry Goldwater",          "US Republican", "e4", ["defence"],           [50,40,58,40,40], "Arizona senator and godfather of modern conservatism.", WD("Barry Goldwater"));
  M("Ron DeSantis",             "US Republican", "e7", ["home","education"],  [50,34,54,42,40], "Combative Florida governor.", WD("Ron DeSantis"));
  M("Nikki Haley",              "US Republican", "e7", ["foreign"],           [54,36,58,42,40], "Former South Carolina governor and UN ambassador.", WD("Nikki Haley"));
  M("J. D. Vance",              "US Republican", "e7", ["pm","work"],         [50,30,58,38,40], "Author-senator who became vice-president in 2025.", WD("JD Vance"));

  /* ---- US Democrats ---- */
  M("Harry S. Truman",          "US Democrat", "e4", ["pm","defence","foreign"], [58,44,60,50,46], "Plain-spoken president of the bomb, the Marshall Plan and NATO.", WD("Harry S. Truman"));
  M("Woodrow Wilson",           "US Democrat", "e3", ["foreign","education"], [54,46,68,46,42], "Professor-president of the Fourteen Points and the League.", WD("Woodrow Wilson"));
  M("Jimmy Carter",             "US Democrat", "e5", ["foreign","health"],    [56,40,58,42,38], "One-term president and the most celebrated of ex-presidents.", WD("Jimmy Carter"));
  M("Hillary Clinton",          "US Democrat", "e7", ["foreign","health"],    [56,48,60,50,42], "Senator, Secretary of State and 2016 nominee.", WD("Hillary Clinton"));
  M("Al Gore",                  "US Democrat", "e6", ["environment","foreign"], [54,44,58,46,40], "Vice-president turned Nobel-winning climate campaigner.", WD("Al Gore"));
  M("John Kerry",               "US Democrat", "e7", ["foreign","environment"], [52,46,58,48,40], "Senator, Secretary of State and climate envoy.", WD("John Kerry"));
  M("Kamala Harris",            "US Democrat", "e7", ["justice","pm"],        [56,40,60,44,42], "Vice-president, 2021–25, and 2024 nominee.", WD("Kamala Harris"));
  M("Bernie Sanders",           "US Democrat", "e7", ["work","health"],       [64,44,72,40,38], "Democratic-socialist senator and grass-roots phenomenon.", WD("Bernie Sanders"));
  M("Elizabeth Warren",         "US Democrat", "e7", ["chancellor","business"], [56,42,66,52,40], "Consumer-champion senator and policy machine.", WD("Elizabeth Warren"));
  M("Alexandria Ocasio-Cortez", "US Democrat", "e7", ["work","environment"],  [66,28,72,38,38], "Progressive standard-bearer of the social-media age.", WD("Alexandria Ocasio-Cortez"));
  M("Nancy Pelosi",             "US Democrat", "e7", ["whip","leader"],       [50,52,58,54,56], "Master legislative tactician and Speaker of the House.", WD("Nancy Pelosi"));
  M("Eleanor Roosevelt",        "US Democrat", "e3", ["foreign","justice"],   [70,40,72,44,40], "First Lady and architect of the Universal Declaration of Human Rights.", WD("Eleanor Roosevelt"));
  M("Robert F. Kennedy",        "US Democrat", "e4", ["justice","leader"],    [70,38,72,42,40], "Attorney-general and senator cut down while seeking the presidency.", WD("Robert F. Kennedy"));
  M("Pete Buttigieg",           "US Democrat", "e7", ["transport","foreign"], [58,34,66,44,40], "Mayor-turned-cabinet-secretary and rising communicator.", WD("Pete Buttigieg"));
  M("Gavin Newsom",             "US Democrat", "e7", ["pm","business"],       [56,36,60,44,40], "Telegenic governor of California.", WD("Gavin Newsom"));

  /* ---- Revolutionaries & radicals ---- */
  M("Leon Trotsky",             "Revolutionaries", "e3", ["defence","leader"], [62,40,76,42,42], "Architect of the Red Army, exiled and murdered by Stalin.", WD("Leon Trotsky"));
  M("Karl Marx",                "Revolutionaries", "e1", ["leader","education"], [60,40,72,40,30], "Philosopher whose 'Capital' reshaped world politics.", WD("Karl Marx"));
  M("Rosa Luxemburg",           "Revolutionaries", "e2", ["leader","work"],   [62,34,74,36,34], "Polish-German revolutionary theorist, murdered in 1919.", WD("Rosa Luxemburg"));
  M("Emiliano Zapata",          "Revolutionaries", "e2", ["defence","work"],  [66,30,68,32,40], "Land-reform hero of the Mexican Revolution.", WD("Emiliano Zapata"));
  M("Toussaint Louverture",     "Revolutionaries", "e0", ["defence","leader"], [68,36,68,40,42], "Leader of the Haitian Revolution, the first successful slave revolt.", WD("Toussaint Louverture"));
  M("Giuseppe Mazzini",         "Revolutionaries", "e1", ["leader","foreign"], [60,34,72,38,36], "Prophet of Italian unification and of republican nationalism.", WD("Giuseppe Mazzini"));
  M("Thomas Paine",             "Revolutionaries", "e0", ["leader","justice"], [64,32,76,34,28], "Pamphleteer of 'Common Sense' and 'Rights of Man'.", WD("Thomas Paine"));
  M("Malcolm X",                "Revolutionaries", "e4", ["leader","justice"], [72,28,80,34,36], "Fiery orator of Black self-determination.", WD("Malcolm X"));
  M("Patrice Lumumba",          "Revolutionaries", "e4", ["leader","foreign"], [66,28,72,34,36], "Congo's first prime minister, assassinated in 1961.", WD("Patrice Lumumba"));
  M("Thomas Sankara",           "Revolutionaries", "e5", ["leader","work"],   [66,28,70,36,40], "Burkina Faso's incorruptible 'African Che', killed in 1987.", WD("Thomas Sankara"));
  M("Steve Biko",               "Revolutionaries", "e4", ["leader","justice"], [66,26,72,30,34], "Black-consciousness leader killed in apartheid custody.", WD("Steve Biko"));
  M("Subhas Chandra Bose",      "Revolutionaries", "e3", ["defence","leader"], [66,34,70,38,42], "Radical Indian independence leader who raised an army against the Raj.", WD("Subhas Chandra Bose"));
  M("Ho Chi Minh",              "Revolutionaries", "e4", ["leader","defence"], [62,40,68,44,46], "Founding leader of communist Vietnam.", WD("Ho Chi Minh"));
  M("Frederick Douglass",       "Revolutionaries", "e1", ["leader","justice"], [72,34,82,38,34], "Escaped-slave orator and the conscience of abolitionist America.", WD("Frederick Douglass"));

  /* ---- Dictators & strongmen (despot-flagged) ---- */
  M("Hafez al-Assad",           "Dictators", "e5", ["defence","home"],        [40,44,48,50,52], "Syrian strongman; founder of the Assad dynasty.", DESP("Hafez al-Assad"));
  M("Kim Jong-il",              "Dictators", "e6", ["defence","culture"],     [34,40,42,44,52], "North Korea's reclusive 'Dear Leader'.", DESP("Kim Jong-il"));
  M("Alexander Lukashenko",     "Dictators", "e7", ["home","defence"],        [38,42,46,44,50], "Belarus's entrenched ruler, 'Europe's last dictator'.", DESP("Alexander Lukashenko"));
  M("Ferdinand Marcos",         "Dictators", "e5", ["business","home"],       [44,42,52,42,46], "Philippine ruler of martial law and vast plunder.", DESP("Ferdinand Marcos"));
  M("Manuel Noriega",           "Dictators", "e5", ["defence","home"],        [36,38,42,38,42], "Panama's drug-trafficking strongman, toppled by US invasion.", DESP("Manuel Noriega"));
  M("Rafael Trujillo",          "Dictators", "e4", ["home","defence"],        [36,40,46,42,48], "Brutal three-decade dictator of the Dominican Republic.", DESP("Rafael Trujillo"));
  M("Fulgencio Batista",        "Dictators", "e4", ["home","business"],       [40,38,48,38,42], "Cuba's corrupt strongman, overthrown by Castro.", DESP("Fulgencio Batista"));
  M("Jorge Rafael Videla",      "Dictators", "e5", ["defence","home"],        [32,40,40,40,46], "Argentine junta leader of the 'Dirty War' disappearances.", DESP("Jorge Rafael Videla"));
  M("Mengistu Haile Mariam",    "Dictators", "e5", ["defence"],               [30,38,44,38,44], "Ethiopian 'Red Terror' dictator.", DESP("Mengistu Haile Mariam"));
  M("Jean-Bédel Bokassa",       "Dictators", "e5", ["defence"],               [34,32,46,32,40], "Central African officer who crowned himself emperor.", DESP("Jean-Bédel Bokassa"));
  M("Saparmurat Niyazov",       "Dictators", "e6", ["culture"],               [38,36,44,36,42], "Turkmen autocrat of an extravagant personality cult.", DESP("Saparmurat Niyazov"));
  M("Charles Taylor",           "Dictators", "e6", ["defence"],               [34,36,48,36,42], "Liberian warlord-president convicted of war crimes.", DESP("Charles Taylor"));
  M("Omar al-Bashir",           "Dictators", "e6", ["defence","home"],        [34,40,46,40,46], "Sudanese ruler indicted over the Darfur atrocities.", DESP("Omar al-Bashir"));
  M("Ruhollah Khomeini",        "Dictators", "e5", ["leader","justice"],      [48,42,62,44,50], "Cleric who founded Iran's Islamic Republic.", DESP("Ruhollah Khomeini"));
  M("Xi Jinping",               "Dictators", "e7", ["pm","defence","home"],   [46,48,52,56,58], "China's most powerful leader since Mao.", DESP("Xi Jinping"));

  /* =========================================================================
     UK DEPTH · real figures not yet in the roster (scope "uk", all eras)
     The big benches were already deep; these fill historical gaps.
     ========================================================================= */
  /* Liberal */
  M("Herbert Asquith",    "Liberal", "e2", ["pm","chancellor","justice"],   [58,60,68,60,52], "Liberal prime minister, 1908–16; the People's Budget and the road to war.", { wiki: "H. H. Asquith" });
  /* Labour */
  M("George Brown",       "Labour", "e4", ["foreign","deputy"],            [52,48,62,40,38], "Mercurial Labour deputy leader and Foreign Secretary of the 1960s.", { wiki: "George Brown, Baron George-Brown" });
  M("Donald Dewar",       "Labour", "e6", ["pm","justice"],                [60,50,64,54,46], "Scotland's first First Minister; 'Father of the Nation'.", { wiki: "Donald Dewar" });
  M("Jennie Lee",         "Labour", "e4", ["education","culture"],          [58,44,64,48,40], "Minister who founded the Open University; Aneurin Bevan's wife.", { wiki: "Jennie Lee" });
  M("Jack Jones",         "Labour", "e4", ["work"],                        [50,46,56,38,52], "TGWU leader and one of the most powerful trade unionists of the 1970s.", { wiki: "Jack Jones (trade unionist)" });
  M("Frank Cousins",      "Labour", "e4", ["work","transport"],            [48,44,54,38,48], "TGWU general secretary and minister of technology.", { wiki: "Frank Cousins" });
  M("Richard Crossman",   "Labour", "e4", ["health","leader"],             [52,46,62,44,38], "Cabinet minister whose candid diaries lifted the lid on government.", { wiki: "Richard Crossman" });
  M("Gerald Kaufman",     "Labour", "e6", ["foreign","culture"],           [50,48,60,44,36], "Long-serving MP who called Labour's 1983 manifesto 'the longest suicide note'.", { wiki: "Gerald Kaufman" });
  M("Tam Dalyell",        "Labour", "e5", ["leader","defence"],            [50,46,58,42,34], "Dogged backbencher who posed the 'West Lothian Question'.", { wiki: "Tam Dalyell" });
  M("Manny Shinwell",     "Labour", "e4", ["defence","work"],              [50,48,58,42,40], "Red Clydesider and veteran Labour cabinet minister.", { wiki: "Emanuel Shinwell" });
  M("Ian Mikardo",        "Labour", "e4", ["work","business"],             [46,44,56,40,36], "Leading figure of the Labour left.", { wiki: "Ian Mikardo" });
  M("Eric Heffer",        "Labour", "e5", ["work"],                        [46,42,58,36,34], "Fiery Liverpool MP of the Bevanite left.", { wiki: "Eric Heffer" });
  M("Brian Wilson",       "Labour", "e6", ["business","environment"],      [48,42,54,46,36], "Scottish Labour minister and energy specialist.", { wiki: "Brian Wilson (Scottish politician)" });
  /* Conservative */
  M("Selwyn Lloyd",       "Conservative", "e4", ["chancellor","foreign"],  [48,52,56,52,44], "Chancellor and Foreign Secretary of the Suez and 'pay pause' era.", { wiki: "Selwyn Lloyd" });
  M("Cecil Parkinson",    "Conservative", "e5", ["business","whip"],       [56,46,58,48,50], "Thatcher favourite, party chairman and trade-and-energy secretary.", { wiki: "Cecil Parkinson" });
  M("Duncan Sandys",      "Conservative", "e4", ["defence","foreign"],     [48,50,54,50,42], "Defence and Commonwealth minister; Churchill's son-in-law.", { wiki: "Duncan Sandys" });
  M("Ernest Marples",     "Conservative", "e4", ["transport"],            [46,46,52,48,40], "Transport minister of the motorways and the Beeching cuts.", { wiki: "Ernest Marples" });
  M("John Nott",          "Conservative", "e5", ["defence","business"],    [48,48,54,46,40], "Defence Secretary during the Falklands War.", { wiki: "John Nott" });
  M("Francis Pym",        "Conservative", "e5", ["foreign","defence"],     [50,50,58,48,42], "Foreign Secretary and Thatcher-era 'wet'.", { wiki: "Francis Pym" });
  M("Peter Walker",       "Conservative", "e5", ["business","environment"],[52,50,60,48,44], "One-nation cabinet minister kept on by Thatcher.", { wiki: "Peter Walker, Baron Walker of Worcester" });
  M("John Biffen",        "Conservative", "e5", ["leader","chancellor"],   [50,48,62,46,40], "Witty Leader of the House and Treasury minister.", { wiki: "John Biffen" });
  M("Tom King",           "Conservative", "e5", ["defence","home"],        [48,48,54,48,42], "Northern Ireland and Defence Secretary.", { wiki: "Tom King, Baron King of Bridgwater" });
  M("Peter Lilley",       "Conservative", "e6", ["work","chancellor"],     [48,46,56,48,40], "Social Security Secretary and free-market Thatcherite.", { wiki: "Peter Lilley" });
  M("John Redwood",       "Conservative", "e6", ["business","chancellor"], [48,44,58,50,38], "Welsh Secretary, free-marketeer and 1995 leadership challenger.", { wiki: "John Redwood" });
  M("Gillian Shephard",   "Conservative", "e6", ["education","work"],      [50,46,54,46,42], "Education and Employment Secretary under John Major.", { wiki: "Gillian Shephard" });
  M("Virginia Bottomley", "Conservative", "e6", ["health"],               [48,44,52,44,40], "Health Secretary in the early 1990s.", { wiki: "Virginia Bottomley" });
  M("John Gummer",        "Conservative", "e5", ["environment","culture"], [50,48,54,48,42], "Agriculture and Environment Secretary; later a climate-policy peer.", { wiki: "John Gummer" });
  M("David Mellor",       "Conservative", "e6", ["culture"],              [50,42,58,42,36], "The first National Heritage Secretary, dubbed 'Minister for Fun'.", { wiki: "David Mellor" });
  M("Edwina Currie",      "Conservative", "e5", ["health"],               [52,38,56,38,34], "Outspoken junior health minister of the 1980s.", { wiki: "Edwina Currie" });
  /* Green / Brexit / NI */
  M("Sian Berry",         "Green", "e7", ["environment","transport"],      [54,30,60,38,38], "Green MP and former co-leader and London Assembly member.", { wiki: "Siân Berry" });
  M("Claire Fox",         "Brexit Party", "e7", ["leader","culture"],      [46,32,62,34,30], "Brexit Party MEP and free-speech campaigner, now a crossbench peer.", { wiki: "Claire Fox" });
  M("James Chichester-Clark", "UUP", "e4", ["pm","home"],                  [44,42,48,42,42], "Ulster Unionist who was prime minister of Northern Ireland, 1969–71.", { wiki: "James Chichester-Clark" });

  /* ---- done: close the lineage sentinel and the module ---- */
  G._EXP_OPEN = false;
})();

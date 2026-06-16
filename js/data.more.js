/* =============================================================================
   650 — THE EXPANDED ROSTER (v6)
   ~300 additional hand-rated figures so every party has real depth across the
   eras: full small-party dynasties (SNP, Plaid, the Liberal line, all six NI
   parties, the Reform lineage, the Greens), pre-1832 grandees, deeper Labour
   and Conservative benches, world statesmen and despots, SpAds & insiders,
   and the novelty fringe (every one of whom genuinely stood for election).
   Ratings use the same editorial rubric as data.js — argue by editing them.
   Loaded after data.js; skips any name data.js already carries.
   ========================================================================== */
window.G = window.G || {};
(function () {
  var G = window.G;
  var existing = {};
  G.POLITICIANS.forEach(function (p) { existing[p.name + "|" + (p.scope || "uk")] = 1; });
  function M(name, party, era, fits, s, note, extra) {
    extra = extra || {};
    var scope = extra.scope || "uk";
    if (existing[name + "|" + scope]) return;        // never duplicate a baked-in figure
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

  /* ================= e0 · Age of Walpole & Pitt (1721–1832) ================ */
  M("Robert Walpole",        "Whig", "e0", ["pm","chancellor"],        [66,92,70,88,86], "The first Prime Minister; two decades of supremacy.", { wiki: "Robert Walpole" });
  M("William Pitt the Elder","Whig", "e0", ["pm","foreign","defence"], [78,84,92,84,58], "The Great Commoner; won an empire in the Seven Years' War.", { wiki: "William Pitt, 1st Earl of Chatham" });
  M("William Pitt the Younger","Tory","e0",["pm","chancellor"],        [70,90,90,92,80], "PM at 24; steered Britain through the French wars.", { wiki: "William Pitt the Younger" });
  M("Charles James Fox",     "Whig", "e0", ["foreign","leader"],       [76,72,95,68,52], "The great Whig tribune; champion of liberty and lost causes.");
  M("Lord North",            "Tory", "e0", ["pm","chancellor"],        [48,76,62,52,70], "Lost America; amiable, immovable, unlucky.", { wiki: "Frederick North, Lord North" });
  M("Edmund Burke",          "Whig", "e0", ["leader","justice"],       [58,66,96,80,44], "Philosopher of conservatism from the Whig benches.");
  M("George Canning",        "Tory", "e0", ["pm","foreign"],           [72,78,90,82,56], "Brilliant, divisive Foreign Secretary; PM for 119 days.");
  M("Lord Castlereagh",      "Tory", "e0", ["foreign","defence"],      [44,84,58,90,66], "Architect of the post-Napoleonic peace at Vienna.", { wiki: "Robert Stewart, Viscount Castlereagh" });
  M("Lord Liverpool",        "Tory", "e0", ["pm","home"],              [50,88,60,78,84], "Fifteen unbroken years as PM through war and unrest.", { wiki: "Robert Jenkinson, 2nd Earl of Liverpool" });
  M("Spencer Perceval",      "Tory", "e0", ["pm","chancellor","justice"],[46,72,66,70,68], "The only PM ever assassinated.");
  M("William Wilberforce",   "Tory", "e0", ["leader"],                 [74,62,94,64,42], "Conscience of the Commons; drove abolition through.");
  M("Earl Grey",             "Whig", "e0", ["pm","foreign"],           [62,80,74,84,76], "Carried the Great Reform Act — and named the tea.", { wiki: "Charles Grey, 2nd Earl Grey" });
  M("Henry Brougham",        "Whig", "e0", ["justice","education"],    [64,70,92,68,40], "Tornado of reform: law, schools, slavery — and self-promotion.", { wiki: "Henry Brougham, 1st Baron Brougham and Vaux" });
  M("Duke of Wellington",    "Tory", "e0", ["pm","defence","foreign"], [78,90,58,76,60], "Waterloo's victor; a soldier's PM who hated politics.", { wiki: "Arthur Wellesley, 1st Duke of Wellington" });
  M("George Grenville",      "Whig", "e0", ["chancellor"],             [40,70,58,62,58], "Stamp Act author; taxed America and lit the fuse.");

  /* ================= The Liberal line, 1832 → today ======================== */
  /* e1 Whigs & early Liberals */
  M("Lord Melbourne",        "Whig",    "e1", ["pm","home"],           [58,78,66,68,72], "Victoria's mentor-PM; charm over exertion.", { wiki: "William Lamb, 2nd Viscount Melbourne" });
  M("John Bright",           "Liberal", "e1", ["leader","business"],   [70,60,94,62,52], "Radical orator of free trade and franchise reform.");
  M("Sir William Harcourt",  "Liberal", "e1", ["chancellor","home"],   [56,80,78,76,62], "'We are all socialists now'; death-duties Chancellor.", { wiki: "William Harcourt (politician)" });
  M("Lord Rosebery",         "Liberal", "e2", ["pm","foreign"],        [62,72,80,66,42], "Won the Derby twice as PM; lost everything else.", { wiki: "Archibald Primrose, 5th Earl of Rosebery" });
  M("John Morley",           "Liberal", "e2", ["education","justice"], [50,74,76,72,56], "Gladstone's biographer and Liberal conscience.", { wiki: "John Morley, 1st Viscount Morley of Blackburn" });
  M("Herbert Samuel",        "Liberal", "e3", ["home","leader"],       [52,78,68,74,64], "First Jewish cabinet minister; rebuilt the party twice.");
  M("Sir John Simon",        "Liberal", "e3", ["foreign","home","chancellor","justice"],[42,88,72,74,58], "Held all three great offices — trusted in none.", { wiki: "John Simon, 1st Viscount Simon" });
  M("Archibald Sinclair",    "Liberal", "e3", ["defence","leader"],    [54,72,70,66,62], "Churchill's wartime Air Secretary; led the Liberal rump.", { wiki: "Archibald Sinclair, 1st Viscount Thurso" });
  M("Violet Bonham Carter",  "Liberal", "e4", ["leader","culture"],    [62,64,88,62,58], "Asquith's daughter; the great Liberal voice of mid-century.");
  M("Jo Grimond",            "Liberal", "e4", ["leader","pm"],         [70,66,84,68,70], "Revived Liberalism with wit and a sense of direction.");
  M("Jeremy Thorpe",         "Liberal", "e4", ["leader"],              [72,58,82,50,40], "Electric campaigner; destroyed by scandal and trial.");
  M("David Owen",            "SDP",     "e5", ["foreign","health","leader"],[68,76,78,74,40], "Doctor, Foreign Secretary, Gang-of-Four breakaway.");
  M("Roy Jenkins",           "SDP",     "e5", ["chancellor","home","leader"],[64,90,84,86,58], "The great reforming Home Secretary; father of the SDP.");
  M("Shirley Williams",      "SDP",     "e5", ["education","leader"],  [74,76,82,70,60], "The SDP's warmest star; education's conscience.");
  M("Bill Rodgers",          "SDP",     "e5", ["transport","defence"], [46,70,60,62,64], "The Gang of Four's organiser.", { wiki: "Bill Rodgers, Baron Rodgers of Quarry Bank" });
  M("David Penhaligon",      "Liberal", "e5", ["business","transport"],[72,52,80,56,66], "Cornwall's beloved Liberal; lost far too soon.");
  M("Paddy Ashdown",         "Liberal Democrat","e5",["leader","pm","defence"],[74,72,80,72,76], "Marine turned leader; built the Lib Dems from nothing.");
  M("Charles Kennedy",       "Liberal Democrat","e6",["leader","pm"],  [80,62,84,60,62], "Chat-show charm; right about Iraq when it counted.");
  M("Menzies Campbell",      "Liberal Democrat","e6",["foreign","leader"],[54,78,70,74,60], "Olympic sprinter; gravitas in a hurry-up age.");
  M("Vince Cable",           "Liberal Democrat","e6",["business","chancellor","leader"],[64,80,72,78,56], "Predicted the crash; Business Secretary in coalition.");
  M("Simon Hughes",          "Liberal Democrat","e6",["justice","home"],[58,68,72,56,52], "Bermondsey's indefatigable campaigner.");
  M("David Laws",            "Liberal Democrat","e7",["chancellor","education"],[44,62,62,72,54], "Coalition architect; 17 days at the Treasury.");
  M("Norman Lamb",           "Liberal Democrat","e7",["health"],       [50,64,58,66,58], "Mental-health reformer from the coalition benches.");
  M("Jo Swinson",            "Liberal Democrat","e7",["leader","business"],[56,56,66,52,52], "Led the party into 2019 — and out of her own seat.");
  M("Tim Farron",            "Liberal Democrat","e7",["leader"],       [60,54,76,48,62], "Cumbrian revivalist preacher of Liberalism.");
  M("Ed Davey",              "Liberal Democrat","e7",["leader","environment","pm"],[62,72,60,64,66], "Stunt-happy leader of the biggest third party in a century.");
  M("Layla Moran",           "Liberal Democrat","e7",["education","foreign"],[58,48,66,52,50], "Oxford's physics teacher turned foreign-affairs voice.");
  M("Daisy Cooper",          "Liberal Democrat","e7",["deputy","health"],[54,46,62,50,58], "St Albans' deputy leader.");
  M("Lembit Öpik",           "Liberal Democrat","e6",["culture"],      [56,44,62,34,36], "Asteroids, Cheeky Girls, and a seat that gave up.", { wiki: "Lembit Öpik" });

  /* ================= SNP ==================================================== */
  M("John MacCormick",       "SNP", "e3", ["leader"],                  [52,56,72,56,60], "Father of the modern home-rule movement.", { wiki: "John MacCormick" });
  M("Robert McIntyre",       "SNP", "e3", ["leader","health"],         [44,52,60,52,56], "The SNP's first ever MP, Motherwell 1945.", { wiki: "Robert McIntyre" });
  M("Winnie Ewing",          "SNP", "e4", ["leader","foreign"],        [74,62,82,60,66], "Hamilton 1967 — 'stop the world, Scotland wants to get on'.");
  M("Donald Stewart",        "SNP", "e4", ["leader","whip"],           [48,62,58,56,68], "The Western Isles' steady hand; led the '74 eleven.", { wiki: "Donald Stewart (politician)" });
  M("Margo MacDonald",       "SNP", "e4", ["leader","health"],         [76,52,84,52,48], "The blonde bombshell of Govan; fearless to the end.");
  M("Gordon Wilson",         "SNP", "e5", ["leader","business"],       [44,62,58,58,64], "Held the party together through the lean eighties.", { wiki: "Gordon Wilson (Scottish politician)" });
  M("Jim Sillars",           "SNP", "e5", ["leader","business"],       [62,60,84,58,40], "Govan '88; the movement's great awkward orator.");
  M("Alex Salmond",          "SNP", "e6", ["pm","leader","chancellor"],[78,80,86,78,70], "Took the SNP from protest to power; 2014's near-miss.");
  M("John Swinney",          "SNP", "e6", ["chancellor","education","leader"],[52,82,60,74,76], "The party's perennial safe pair of hands.");
  M("Nicola Sturgeon",       "SNP", "e7", ["pm","leader","health"],    [80,82,86,76,78], "Dominant First Minister of the devolution age.");
  M("Angus Robertson",       "SNP", "e7", ["foreign","leader","defence"],[58,72,76,68,68], "Forensic Westminster leader; constitution minister.");
  M("Stewart Hosie",         "SNP", "e7", ["chancellor","whip"],       [44,66,58,60,62], "Treasury attack dog of the 56.");
  M("Ian Blackford",         "SNP", "e7", ["leader","chancellor"],     [50,62,62,54,60], "Crofter-banker who bellowed at Boris weekly.");
  M("Stephen Flynn",         "SNP", "e7", ["leader","business"],       [58,46,70,52,58], "Aberdeen's sharp-elbowed Westminster leader.");
  M("Kate Forbes",           "SNP", "e7", ["chancellor","business"],   [62,56,70,68,52], "Highland fiscal conservative; nearly First Minister.");
  M("Humza Yousaf",          "SNP", "e7", ["health","justice","leader"],[54,58,66,48,46], "First Muslim leader of a UK nation; a short tenure.");
  M("Joanna Cherry",         "SNP", "e7", ["justice","home"],          [50,62,74,66,38], "KC who beat the government in court on prorogation.");
  M("Mhairi Black",          "SNP", "e7", ["whip","education"],        [70,40,84,42,46], "Youngest MP since 1832; viral despatch-box fire.");

  /* ================= Plaid Cymru ============================================ */
  M("Saunders Lewis",        "Plaid Cymru", "e3", ["leader","culture"],[48,52,82,52,40], "Playwright-founder; the 1936 Penyberth fire.");
  M("Gwynfor Evans",         "Plaid Cymru", "e4", ["leader"],          [62,60,78,58,66], "Carmarthen 1966; fasted S4C into existence.");
  M("Dafydd Wigley",         "Plaid Cymru", "e5", ["leader","business","pm"],[66,72,76,66,70], "The movement's most commanding Westminster figure.");
  M("Dafydd Elis-Thomas",    "Plaid Cymru", "e5", ["leader","culture"],[54,68,70,60,50], "Presiding officer; the party's restless intellectual.", { wiki: "Dafydd Elis-Thomas" });
  M("Ieuan Wyn Jones",       "Plaid Cymru", "e6", ["leader","business","transport"],[46,66,56,62,64], "Deputy First Minister in the One Wales coalition.");
  M("Elfyn Llwyd",           "Plaid Cymru", "e6", ["justice","whip"],  [44,64,60,60,62], "Meirionnydd's courtroom voice at Westminster.");
  M("Leanne Wood",           "Plaid Cymru", "e7", ["leader"],          [62,52,72,50,54], "Valleys socialist who took Plaid into the TV debates.");
  M("Adam Price",            "Plaid Cymru", "e7", ["leader","business"],[60,58,80,62,48], "Cash-for-honours pursuer; big-vision leader.");
  M("Rhun ap Iorwerth",      "Plaid Cymru", "e7", ["leader","culture"],[58,52,70,54,58], "Broadcaster turned leader from Ynys Môn.");
  M("Liz Saville Roberts",   "Plaid Cymru", "e7", ["leader","justice","home"],[52,58,68,58,62], "Plaid's first female MP; Westminster leader.");
  M("Hywel Williams",        "Plaid Cymru", "e7", ["work","health"],   [40,60,52,54,56], "Arfon's long-serving social-policy specialist.");
  M("Jonathan Edwards",      "Plaid Cymru", "e7", ["chancellor"],      [40,54,52,54,48], "Carmarthen East's Treasury spokesman.", { wiki: "Jonathan Edwards (Welsh politician)" });

  /* ================= Northern Ireland ====================================== */
  /* UUP — the old governing tradition */
  M("Edward Carson",         "UUP", "e2", ["leader","justice"],        [72,76,94,72,66], "Unionism's iron advocate; the Covenant's architect.");
  M("James Craig",           "UUP", "e3", ["pm","home","leader"],      [56,78,58,70,80], "Craigavon: Northern Ireland's first Prime Minister.", { wiki: "James Craig, 1st Viscount Craigavon" });
  M("Basil Brooke",          "UUP", "e4", ["pm","leader"],             [44,76,52,56,72], "Twenty years of Brookeborough immobility.", { wiki: "Basil Brooke, 1st Viscount Brookeborough" });
  M("Terence O'Neill",       "UUP", "e4", ["pm","foreign"],            [52,66,60,62,42], "Tried to thaw the ice; broken by the backlash.");
  M("Brian Faulkner",        "UUP", "e4", ["pm","home","business"],    [54,74,66,66,58], "Last PM of Stormont; Sunningdale's doomed partner.");
  M("James Molyneaux",       "UUP", "e5", ["leader","whip"],           [38,72,46,56,74], "Two decades of patient, immovable integrationism.");
  M("David Trimble",         "UUP", "e6", ["pm","leader","foreign"],   [58,74,72,78,52], "Nobel laureate who risked everything on the Agreement.");
  M("Reg Empey",             "UUP", "e6", ["business","leader"],       [40,68,52,58,60], "Steadied the UUP after Trimble.", { wiki: "Reg Empey" });
  M("Sylvia Hermon",         "UUP", "e7", ["justice","home"],          [52,62,58,62,44], "North Down's independent-minded unionist.", { wiki: "Sylvia Hermon" });
  M("Doug Beattie",          "UUP", "e7", ["leader","defence"],        [50,58,62,52,48], "Decorated soldier; tried to modernise unionism.");
  M("Danny Kinahan",         "UUP", "e7", ["defence","culture"],       [38,54,46,50,48], "South Antrim soldier-MP; veterans' commissioner.");
  /* DUP */
  M("Ian Paisley",           "DUP", "e4", ["leader","pm"],             [70,70,96,52,84], "The Big Man: forty years of NO, then yes with McGuinness.");
  M("Peter Robinson",        "DUP", "e5", ["pm","leader","chancellor"],[48,80,66,74,80], "The strategist who built the DUP machine.");
  M("Nigel Dodds",           "DUP", "e7", ["leader","whip","home"],    [42,72,64,66,70], "Westminster leader through the Brexit leverage years.");
  M("Arlene Foster",         "DUP", "e7", ["pm","leader","business"],  [50,68,58,56,54], "First female First Minister; RHI's long shadow.");
  M("Jeffrey Donaldson",     "DUP", "e7", ["leader","defence"],        [46,74,62,60,62], "From Trimble's team to DUP leader; fell to scandal.");
  M("Sammy Wilson",          "DUP", "e7", ["chancellor","environment"],[48,66,70,48,56], "East Antrim's bellowing Treasury spokesman.");
  M("Edwin Poots",           "DUP", "e7", ["environment","health","leader"],[36,62,48,46,50], "Three weeks as leader; creationist agriculture minister.");
  M("Emma Little-Pengelly",  "DUP", "e7", ["justice","deputy"],        [46,52,60,56,54], "Barrister; deputy First Minister of the restored Stormont.");
  M("Gavin Robinson",        "DUP", "e7", ["leader","defence","justice"],[48,56,62,54,58], "East Belfast barrister steadying the ship.", { wiki: "Gavin Robinson" });
  M("Ian Paisley Jr",        "DUP", "e7", ["culture","business"],      [44,58,62,40,48], "North Antrim inheritance; censured and unbowed.", { wiki: "Ian Paisley Jr" });
  /* SDLP */
  M("Gerry Fitt",            "SDLP", "e4", ["leader","home"],          [60,64,76,56,52], "Founding leader; defied the gunmen on both sides.");
  M("John Hume",             "SDLP", "e5", ["pm","leader","foreign"],  [72,80,84,88,66], "The Agreement's true architect; Nobel laureate.");
  M("Seamus Mallon",         "SDLP", "e6", ["deputy","justice"],       [54,72,76,70,58], "'Sunningdale for slow learners'; deputy First Minister.");
  M("Eddie McGrady",         "SDLP", "e6", ["work","whip"],            [38,64,50,54,60], "South Down's quiet constituency titan.", { wiki: "Eddie McGrady" });
  M("Mark Durkan",           "SDLP", "e6", ["leader","chancellor"],    [44,66,68,64,56], "Hume's heir; Foyle's wordsmith.");
  M("Margaret Ritchie",      "SDLP", "e7", ["leader","work"],          [40,60,52,52,52], "First female leader; social development minister.");
  M("Alasdair McDonnell",    "SDLP", "e7", ["leader","health"],        [36,60,44,50,50], "GP-leader of South Belfast.", { wiki: "Alasdair McDonnell" });
  M("Colum Eastwood",        "SDLP", "e7", ["leader","foreign"],       [54,52,70,54,56], "Derry's young leader rebuilding the SDLP.");
  M("Claire Hanna",          "SDLP", "e7", ["business","chancellor"],  [56,48,72,56,52], "South Belfast's sharpest Commons performer.");
  /* Sinn Féin */
  M("Gerry Adams",           "Sinn Féin", "e5", ["leader"],            [62,78,72,74,86], "The long game personified; took the movement political.");
  M("Martin McGuinness",     "Sinn Féin", "e6", ["deputy","education","leader"],[64,76,70,72,80], "From Derry command to deputy First Minister.");
  M("Michelle O'Neill",      "Sinn Féin", "e7", ["pm","leader","health"],[58,62,60,56,70], "First nationalist First Minister of the North.");
  M("Mary Lou McDonald",     "Sinn Féin", "e7", ["leader","pm"],       [66,64,82,62,74], "Dublin's combative all-Ireland leader.");
  M("Conor Murphy",          "Sinn Féin", "e7", ["chancellor","business"],[40,66,54,58,66], "Stormont finance and economy minister.", { wiki: "Conor Murphy" });
  M("John Finucane",         "Sinn Féin", "e7", ["justice"],           [50,48,60,54,58], "Belfast solicitor; carries his father's name and cause.");
  M("Pat Doherty",           "Sinn Féin", "e6", ["whip"],              [32,60,44,48,62], "West Tyrone's long-serving abstentionist.", { wiki: "Pat Doherty" });
  M("Caoimhe Archibald",     "Sinn Féin", "e7", ["chancellor","education"],[40,48,52,54,58], "Economy minister; scientist by training.", { wiki: "Caoimhe Archibald" });
  /* Alliance */
  M("Oliver Napier",         "Alliance", "e4", ["leader","justice"],   [48,60,62,58,56], "Founding leader of the cross-community centre.");
  M("John Alderdice",        "Alliance", "e5", ["leader","health"],    [44,62,58,60,54], "Psychiatrist; first Speaker of the new Assembly.", { wiki: "John Alderdice, Baron Alderdice" });
  M("David Ford",            "Alliance", "e7", ["justice","leader"],   [40,66,52,60,58], "First devolved Justice Minister of the new era.", { wiki: "David Ford" });
  M("Naomi Long",            "Alliance", "e7", ["leader","justice"],   [62,64,74,62,64], "Beat Peter Robinson in East Belfast; Justice Minister.");
  M("Stephen Farry",         "Alliance", "e7", ["education","business"],[42,58,54,58,52], "North Down's economist MP.");
  M("Sorcha Eastwood",       "Alliance", "e7", ["home","culture"],     [50,42,60,46,50], "Lagan Valley's breakthrough Alliance MP.", { wiki: "Sorcha Eastwood" });
  /* TUV */
  M("Jim Allister",          "TUV", "e7", ["leader","justice"],        [44,68,80,58,46], "One-man awkward squad; unionism's hardest line.");
  M("Timothy Gaston",        "TUV", "e7", ["whip"],                    [28,40,44,38,44], "North Antrim's TUV lieutenant.", { wiki: "Timothy Gaston" });

  /* ================= Reform heritage (UKIP → Brexit → Reform) ============== */
  M("Alan Sked",             "UKIP", "e5", ["leader","education"],     [36,56,62,52,30], "LSE historian who founded UKIP — then disowned it.");
  M("James Goldsmith",       "UKIP", "e5", ["leader","business"],      [62,66,70,58,44], "Billionaire's Referendum Party; bought the question.", { wiki: "James Goldsmith" });
  M("Robert Kilroy-Silk",    "UKIP", "e6", ["leader","culture"],       [58,48,72,30,22], "Daytime TV tan meets Veritas vanity project.");
  M("Lord Pearson",          "UKIP", "e7", ["leader","defence"],       [30,58,44,46,40], "Brief, bemused stint leading UKIP.", { wiki: "Malcolm Pearson, Baron Pearson of Rannoch" });
  M("Paul Nuttall",          "UKIP", "e7", ["leader","education"],     [34,42,52,30,36], "Stoke's CV embellisher; led UKIP downhill.");
  M("Gerard Batten",         "UKIP", "e7", ["leader","home"],          [26,52,44,32,38], "Dragged UKIP to the harder fringe.");
  M("Henry Bolton",          "UKIP", "e7", ["home","defence"],         [22,48,36,38,28], "Seventy-nine days and a tabloid firestorm.", { wiki: "Henry Bolton (politician)" });
  M("Richard Tice",          "Reform UK", "e7", ["leader","business","chancellor"],[52,58,60,50,56], "Property millionaire; Reform's polished frontman.");
  M("Ben Habib",             "Reform UK", "e7", ["business","chancellor"],[40,52,58,44,36], "Brexit-purist businessman; fell out with the leadership.");
  M("Ann Widdecombe",        "Brexit Party", "e6", ["home","work","leader"],[58,74,78,56,50], "Tory battleaxe turned Brexit Party bruiser.");
  M("David Bull",            "Brexit Party", "e7", ["health","culture"],[44,44,56,38,40], "TV doctor; Reform's brief co-deputy.", { wiki: "David Bull (television presenter)" });
  M("Rupert Lowe",           "Reform UK", "e7", ["business"],          [38,54,50,44,30], "Southampton FC chairman; expelled awkward squad.", { wiki: "Rupert Lowe" });

  /* ================= Greens (incl. Scotland) =============================== */
  M("Jonathon Porritt",      "Green", "e5", ["environment","leader"],  [54,62,72,58,46], "Ecology Party pioneer; green movement's elder.", { wiki: "Jonathon Porritt" });
  M("Sara Parkin",           "Green", "e5", ["leader","health"],       [44,56,62,52,44], "Led the Greens through the 1989 surge.", { wiki: "Sara Parkin" });
  M("Derek Wall",            "Green", "e6", ["business"],              [30,48,52,46,40], "Eco-socialist principal speaker.", { wiki: "Derek Wall" });
  M("Jean Lambert",          "Green", "e6", ["work","foreign"],        [34,58,50,52,48], "Two decades as London's Green MEP.", { wiki: "Jean Lambert" });
  M("Jenny Jones",           "Green", "e7", ["home","transport"],      [40,58,56,48,44], "Baroness on a bicycle; policing watchdog.", { wiki: "Jenny Jones, Baroness Jones of Moulsecoomb" });
  M("Jonathan Bartley",      "Green", "e7", ["leader","work"],         [42,48,60,46,48], "Co-led the Greens through three elections.", { wiki: "Jonathan Bartley" });
  M("Siân Berry",            "Green", "e7", ["leader","transport"],    [50,52,62,50,50], "London's perennial, persuasive Green voice.");
  M("Amelia Womack",         "Green", "e7", ["deputy","environment"],  [40,42,54,42,46], "Four-term deputy leader.", { wiki: "Amelia Womack" });
  M("Patrick Harvie",        "Green", "e7", ["leader","environment","business"],[46,62,64,54,56], "Took the Scottish Greens into government.");
  M("Lorna Slater",          "Green", "e7", ["business","environment"],[38,46,52,42,46], "Engineer; co-leader in the Bute House deal.");
  M("Ellie Chowns",          "Green", "e7", ["environment","foreign"], [42,44,56,50,46], "North Herefordshire's breakthrough Green.", { wiki: "Ellie Chowns" });

  G._MORE_CHUNK1 = true;
})();

/* ======================= CHUNK 2: the big two, the world, the fringe ====== */
(function () {
  var G = window.G;
  var existing = {};
  G.POLITICIANS.forEach(function (p) { existing[p.name + "|" + (p.scope || "uk")] = 1; });
  function M(name, party, era, fits, s, note, extra) {
    extra = extra || {};
    var scope = extra.scope || "uk";
    if (existing[name + "|" + scope]) return;
    existing[name + "|" + scope] = 1;
    var fig = { name: name, party: party, era: era, fits: fits,
      stats: { appeal: s[0], experience: s[1], oratory: s[2], statecraft: s[3], partyMgmt: s[4] },
      note: note || "", scope: scope };
    if (extra.cast) fig.cast = extra.cast;
    if (extra.flag) fig.flag = extra.flag;
    if (extra.despot) fig.despot = true;
    if (extra.wiki || extra.img) G.PHOTO[name] = { wiki: extra.wiki, img: extra.img };
    G.POLITICIANS.push(fig);
  }

  /* ================= Labour, 1900 → ======================================== */
  M("Arthur Henderson",   "Labour", "e3", ["foreign","leader","whip"], [50,80,66,72,82], "Three times leader; Nobel Peace Prize for disarmament.");
  M("George Lansbury",    "Labour", "e3", ["leader","work"],           [58,66,78,52,60], "Sainted pacifist leader; broken by Bevin at conference.");
  M("Philip Snowden",     "Labour", "e3", ["chancellor"],              [42,76,72,66,48], "Iron Chancellor of the left; followed MacDonald out.");
  M("J.R. Clynes",        "Labour", "e3", ["home","leader"],           [40,70,62,60,68], "Mill boy to Home Secretary.", { wiki: "J. R. Clynes" });
  M("Margaret Bondfield", "Labour", "e3", ["work"],                    [48,62,64,56,58], "First woman in any British cabinet.");
  M("Ernest Bevin",       "Labour", "e4", ["foreign","work","defence"],[60,88,70,86,80], "Dockers' titan; built NATO from the Foreign Office.");
  M("Stafford Cripps",    "Labour", "e4", ["chancellor","business"],   [44,82,72,80,58], "Austerity incarnate; the iron Chancellor of recovery.");
  M("Hugh Dalton",        "Labour", "e4", ["chancellor"],              [42,78,64,68,56], "Cheap-money Chancellor; resigned over a Budget leak.");
  M("Herbert Morrison",   "Labour", "e4", ["home","deputy","leader"],  [56,84,68,72,84], "London's machine-builder; Festival of Britain.");
  M("Hugh Gaitskell",     "Labour", "e4", ["chancellor","leader"],     [58,76,76,74,62], "Fight and fight again; died before his premiership.");
  M("Anthony Crosland",   "Labour", "e4", ["education","foreign","environment"],[56,74,70,76,54], "The Future of Socialism; closed grammar schools.");
  M("Barbara Castle",     "Labour", "e4", ["transport","work","health"],[70,80,82,76,62], "Breathalyser, equal pay, In Place of Strife.");
  M("Roy Hattersley",     "Labour", "e5", ["deputy","home","chancellor"],[52,76,72,64,66], "Kinnock's deputy; the old right's wordsmith.");
  M("John Smith",         "Labour", "e5", ["leader","chancellor","pm"],[64,80,80,76,76], "One more heave; died on the brink of Downing Street.");
  M("Bryan Gould",        "Labour", "e5", ["business","environment"],  [48,64,66,62,48], "The left's lost moderniser; went home to NZ.", { wiki: "Bryan Gould" });
  M("Peter Shore",        "Labour", "e5", ["business","chancellor"],   [42,72,74,64,52], "Eurosceptic of the old Labour right.", { wiki: "Peter Shore" });
  M("Denis Skinner",      "Labour", "e5", ["whip"],                    [66,70,80,40,50], "The Beast of Bolsover; five decades of heckles.");
  M("Margaret Beckett",   "Labour", "e6", ["foreign","leader","environment"],[48,86,64,70,72], "First female Foreign Secretary; caravan diplomacy.");
  M("Robin Cook",         "Labour", "e6", ["foreign","leader"],        [54,80,90,78,56], "Ethical foreign policy; the great resignation speech.");
  M("Mo Mowlam",          "Labour", "e6", ["home","leader"],           [78,68,74,68,58], "Wig off, walls down: Good Friday's human face.");
  M("David Blunkett",     "Labour", "e6", ["home","education","work"], [56,78,70,64,62], "Sheffield's blind Home Secretary; tough and tougher.");
  M("John Reid",          "Labour", "e6", ["home","health","defence"], [50,80,72,66,68], "Nine cabinet jobs; 'not fit for purpose'.");
  M("Alan Johnson",       "Labour", "e6", ["home","health","education"],[70,76,72,62,66], "Postman to Home Secretary; the best PM Labour never had.");
  M("Patricia Hewitt",    "Labour", "e6", ["health","business"],       [40,72,58,62,54], "Health reformer of the Blair mid-period.");
  M("Tessa Jowell",       "Labour", "e6", ["culture","work"],          [60,72,62,64,66], "Brought the Olympics home.");
  M("Charles Clarke",     "Labour", "e6", ["home","education"],        [42,72,60,60,56], "Big-beast Home Secretary felled by foreign prisoners.");
  M("Alistair Darling",   "Labour", "e6", ["chancellor","transport","work"],[50,84,60,80,66], "Steady at the wheel through the crash of 2008.");
  M("Jack Straw",         "Labour", "e6", ["foreign","home","justice"],[48,88,66,72,70], "Held both great domestic offices and the FCO.");
  M("Harriet Harman",     "Labour", "e7", ["deputy","justice","leader"],[52,86,64,64,72], "Mother of the House; twice acting leader.");
  M("Ed Balls",           "Labour", "e7", ["chancellor","education"],  [56,74,68,72,58], "Brown's brain; Strictly's redemption arc.");
  M("Yvette Cooper",      "Labour", "e7", ["home","work","chancellor"],[52,82,66,72,64], "Forensic chair turned Home Secretary.");
  M("Andy Burnham",       "Labour", "e7", ["health","home","leader"],  [70,74,72,62,62], "King of the North; Manchester's voice.");
  M("Hilary Benn",        "Labour", "e7", ["foreign","environment"],   [50,80,84,70,62], "The Syria speech; Brexit committee's patient chair.");
  M("Jess Phillips",      "Labour", "e7", ["home","work"],             [66,52,78,46,48], "Birmingham Yardley's unfiltered campaigner.");
  M("Lisa Nandy",         "Labour", "e7", ["foreign","culture","work"],[52,62,62,56,54], "Towns champion of the soft left.");
  M("Zarah Sultana",      "Labour", "e7", ["work","education"],        [58,38,72,38,36], "Coventry's insurgent left voice.");

  /* ================= Conservatives, 1832 → ================================= */
  M("Stafford Northcote", "Conservative", "e1", ["chancellor","leader"],[38,72,56,62,60], "Gladstone's rival made gentle; the Fourth Party's victim.", { wiki: "Stafford Northcote, 1st Earl of Iddesleigh" });
  M("Lord Randolph Churchill","Conservative","e2",["chancellor","leader"],[68,58,86,58,44], "Tory democracy's meteor; resigned once too often.");
  M("Michael Hicks Beach","Conservative", "e2", ["chancellor","home"], [36,76,56,64,60], "Black Michael; twice Chancellor.", { wiki: "Michael Hicks Beach, 1st Earl St Aldwyn" });
  M("Lord Curzon",        "Conservative", "e3", ["foreign","leader"],  [50,86,76,78,42], "Viceroy and Foreign Secretary; passed over for Baldwin.", { wiki: "George Curzon, 1st Marquess Curzon of Kedleston" });
  M("Austen Chamberlain", "Conservative", "e3", ["foreign","chancellor","leader"],[46,84,68,74,62], "Locarno Nobel laureate; always played the game.");
  M("F.E. Smith",         "Conservative", "e3", ["justice","leader"],  [66,72,94,68,48], "Birkenhead: the wickedest wit at the despatch box.", { wiki: "F. E. Smith, 1st Earl of Birkenhead" });
  M("Samuel Hoare",       "Conservative", "e3", ["foreign","home","defence"],[36,80,58,64,56], "The Hoare–Laval pact's fall guy.", { wiki: "Samuel Hoare, 1st Viscount Templewood" });
  M("Leo Amery",          "Conservative", "e3", ["business","defence"],[44,76,80,70,52], "'In the name of God, go' — and Chamberlain went.");
  M("Duff Cooper",        "Conservative", "e3", ["defence","culture"], [56,68,76,62,48], "Resigned over Munich with style.");
  M("Lord Halifax",       "Conservative", "e3", ["foreign","leader"],  [40,84,58,72,60], "The Holy Fox; nearly PM in 1940.", { wiki: "Edward Wood, 1st Earl of Halifax" });
  M("Rab Butler",         "Conservative", "e4", ["chancellor","home","education","deputy"],[50,92,68,84,64], "Education Act, Butskellism; thrice nearly PM.");
  M("Iain Macleod",       "Conservative", "e4", ["chancellor","health","leader"],[62,76,90,76,60], "Decolonisation's conscience; died a month into No.11.");
  M("Reginald Maudling",  "Conservative", "e4", ["chancellor","home"], [50,78,66,68,54], "Dash for growth; undone by Poulson.");
  M("Enoch Powell",       "Conservative", "e4", ["health","defence"],  [54,76,92,72,28], "Brilliant, baleful; the Birmingham speech ended him.");
  M("Peter Thorneycroft", "Conservative", "e4", ["chancellor","defence"],[42,74,60,64,62], "Resigned the Treasury whole over spending.", { wiki: "Peter Thorneycroft" });
  M("Edward Boyle",       "Conservative", "e4", ["education","chancellor"],[40,66,62,64,50], "The Tory the teachers loved.", { wiki: "Edward Boyle, Baron Boyle of Handsworth" });
  M("Quintin Hogg",       "Conservative", "e4", ["justice","education","leader"],[54,82,80,66,56], "Hailsham: bell-ringer, Lord Chancellor twice.", { wiki: "Quintin Hogg, Baron Hailsham of St Marylebone" });
  M("Willie Whitelaw",    "Conservative", "e5", ["home","deputy","whip"],[52,88,60,72,86], "Every PM needs a Willie.");
  M("Lord Carrington",    "Conservative", "e5", ["foreign","defence"], [50,90,62,80,66], "Resigned over the Falklands with old-world honour.", { wiki: "Peter Carington, 6th Baron Carrington" });
  M("Keith Joseph",       "Conservative", "e5", ["education","business"],[36,80,66,76,44], "The Mad Monk; Thatcherism's intellectual father.");
  M("Nicholas Ridley",    "Conservative", "e5", ["environment","transport","business"],[32,74,56,66,46], "Dry as dust; sunk by a Spectator interview.");
  M("Leon Brittan",       "Conservative", "e5", ["home","business"],   [36,76,60,68,52], "Westland's casualty; Brussels heavyweight after.");
  M("Norman Fowler",      "Conservative", "e5", ["health","work","transport"],[42,80,56,66,68], "AIDS campaign's quiet hero; spent more time with his family.");
  M("Chris Patten",       "Conservative", "e5", ["environment","leader","foreign"],[56,78,76,74,62], "Last Governor of Hong Kong; lost Bath winning for Major.");
  M("Norman Lamont",      "Conservative", "e5", ["chancellor"],        [34,72,58,60,46], "Je ne regrette rien; sang in the bath after Black Wednesday.");
  M("Michael Portillo",   "Conservative", "e6", ["defence","chancellor","leader"],[58,72,74,64,52], "Were you up for Portillo? Trains came later.");
  M("Malcolm Rifkind",    "Conservative", "e6", ["foreign","defence","transport"],[44,84,72,72,58], "Held the great offices with Edinburgh polish.");
  M("Ann Widdecombe",     "Conservative", "e6", ["home","work"],       [58,74,78,56,50], "Something of the night about him, she said.");
  M("David Davis",        "Conservative", "e6", ["home","leader"],     [54,76,62,58,48], "Resigned to fight for liberty; Brexit Secretary later.");
  M("Liam Fox",           "Conservative", "e7", ["defence","business"],[40,72,56,56,50], "Atlanticist trade evangelist.");
  M("Eric Pickles",       "Conservative", "e7", ["environment","whip"],[46,74,62,56,66], "Big beast of localism.", { wiki: "Eric Pickles" });
  M("Justine Greening",   "Conservative", "e7", ["education","transport","work"],[44,66,52,58,48], "Rotherham comprehensive to the cabinet table.");
  M("Amber Rudd",         "Conservative", "e7", ["home","work"],       [50,68,64,60,50], "Windrush's resignation; quit twice on principle.");
  M("Rory Stewart",       "Conservative", "e7", ["foreign","justice","work"],[60,66,76,72,36], "Walked Afghanistan; walked out of the party.");
  M("Tom Tugendhat",      "Conservative", "e7", ["foreign","defence","home"],[50,64,66,64,48], "Soldier-chair of the Foreign Affairs Committee.");
  M("Victoria Atkins",    "Conservative", "e7", ["health","home","justice"],[44,58,58,56,52], "Barrister; Health Secretary at the end.");
  M("Robert Buckland",    "Conservative", "e7", ["justice"],           [38,66,54,60,54], "Welsh recorder; sacked for being reasonable.", { wiki: "Robert Buckland" });
  M("Graham Brady",       "Conservative", "e7", ["whip","leader"],     [42,76,52,56,80], "Keeper of the letters; ended three premierships.");
  M("Charlotte Owen",     "Conservative", "e7", ["culture"],           [30,24,36,30,34], "Youngest-ever life peer; Boris's mysterious legacy.", { wiki: "Charlotte Owen, Baroness Owen of Alderley Edge" });
  M("Andrea Leadsom",     "Conservative", "e7", ["business","environment","leader"],[40,64,52,52,50], "Being a mother nearly made her PM.");

  /* ================= World statesmen (wildcard) ============================ */
  M("Otto von Bismarck",  "World Leaders", "e1", ["pm","foreign","defence"],[60,94,78,96,80], "Blood and iron; unified Germany and balanced Europe.", { scope: "wild" });
  M("Abraham Lincoln",    "US Republican", "e1", ["pm","justice","leader"],[84,80,96,92,76], "Saved the Union; the second founding.", { scope: "wild" });
  M("Camillo Cavour",     "World Leaders", "e1", ["pm","chancellor","foreign"],[52,82,68,88,70], "Diplomatic architect of Italian unification.", { scope: "wild", wiki: "Camillo Benso, Count of Cavour" });
  M("Giuseppe Garibaldi", "Revolutionaries","e1",["defence","leader"], [88,62,80,58,50], "The hero of two worlds; a thousand red shirts.", { scope: "wild" });
  M("Mustafa Kemal Atatürk","World Leaders","e3",["pm","defence","education"],[80,86,82,90,84], "Built a republic from an empire's ruins.", { scope: "wild" });
  M("Éamon de Valera",    "World Leaders", "e3", ["pm","foreign"],     [62,88,72,78,82], "The long fellow; wrote Ireland's century.", { scope: "wild", wiki: "Éamon de Valera" });
  M("Michael Collins",    "Revolutionaries","e3",["defence","chancellor","leader"],[84,60,78,72,72], "The Big Fellow; signed his own death warrant.", { scope: "wild", wiki: "Michael Collins (Irish leader)" });
  M("Jan Smuts",          "World Leaders", "e3", ["pm","defence","foreign"],[56,90,72,84,62], "Boer general in two war cabinets; League architect.", { scope: "wild" });
  M("Jawaharlal Nehru",   "World Leaders", "e4", ["pm","foreign","education"],[78,84,84,82,74], "Tryst with destiny; built democratic India.", { scope: "wild" });
  M("David Ben-Gurion",   "World Leaders", "e4", ["pm","defence"],     [66,82,72,84,76], "Declared a state and held it.", { scope: "wild" });
  M("Konrad Adenauer",    "World Leaders", "e4", ["pm","foreign"],     [56,90,62,88,82], "Der Alte; anchored Germany in the West.", { scope: "wild" });
  M("Charles de Gaulle",  "World Leaders", "e4", ["pm","defence","foreign"],[78,90,86,88,66], "A certain idea of France — twice rescued.", { scope: "wild" });
  M("Golda Meir",         "World Leaders", "e4", ["pm","foreign"],     [66,84,78,74,72], "The grandmother who ran a war cabinet.", { scope: "wild" });
  M("Willy Brandt",       "World Leaders", "e4", ["pm","foreign"],     [74,80,80,82,66], "Knelt at Warsaw; Ostpolitik's Nobel.", { scope: "wild" });
  M("Lee Kuan Yew",       "World Leaders", "e4", ["pm","chancellor","justice"],[60,92,76,96,84], "Third world to first in one lifetime.", { scope: "wild" });
  M("Julius Nyerere",     "World Leaders", "e4", ["pm","education"],   [68,74,78,62,72], "Mwalimu — the teacher-president.", { scope: "wild" });
  M("Gamal Abdel Nasser", "World Leaders", "e4", ["pm","defence"],     [84,70,88,66,72], "Suez's victor; pan-Arabism's voice.", { scope: "wild" });
  M("Anwar Sadat",        "World Leaders", "e4", ["pm","foreign","defence"],[64,76,72,80,62], "Flew to Jerusalem; paid with his life.", { scope: "wild" });
  M("Gough Whitlam",      "World Leaders", "e4", ["pm","education","health"],[72,70,86,68,58], "It's Time — then the Dismissal.", { scope: "wild" });
  M("Pierre Trudeau",     "World Leaders", "e4", ["pm","justice"],     [82,76,80,76,64], "Just watch me; patriated a constitution.", { scope: "wild" });
  M("Bob Hawke",          "World Leaders", "e5", ["pm","work","business"],[86,76,78,74,80], "Beer-record larrikin; consensus reformer.", { scope: "wild" });
  M("Paul Keating",       "World Leaders", "e5", ["chancellor","pm"],  [62,80,90,82,64], "The recession we had to have; the wit they feared.", { scope: "wild" });
  M("Mikhail Gorbachev",  "World Leaders", "e5", ["pm","foreign"],     [70,80,74,76,46], "Glasnost, perestroika; let the wall fall.", { scope: "wild" });
  M("Helmut Kohl",        "World Leaders", "e5", ["pm","chancellor"],  [56,88,58,80,84], "Reunification's heavyweight.", { scope: "wild" });
  M("François Mitterrand","World Leaders", "e5", ["pm","culture"],     [62,88,78,84,72], "The sphinx; fourteen years at the Élysée.", { scope: "wild", wiki: "François Mitterrand" });
  M("Jacques Chirac",     "World Leaders", "e6", ["pm","foreign"],     [68,86,72,70,70], "Bulldozer charm; said non to Iraq.", { scope: "wild" });
  M("Jacinda Ardern",     "World Leaders", "e7", ["pm","health"],      [86,58,82,68,66], "Kindness as statecraft; a pandemic's calm voice.", { scope: "wild" });
  M("Angela Merkel",      "World Leaders", "e7", ["pm","chancellor","environment"],[68,94,58,90,84], "Wir schaffen das; Europe's quiet centre.", { scope: "wild" });
  /* despots (flag plainly; the despot penalty applies) */
  M("Leopold II of Belgium","Dictators",   "e2", ["business"],         [30,70,40,60,50], "The Congo's butcher-king.", { scope: "wild", despot: true, wiki: "Leopold II of Belgium" });
  M("Francisco Solano López","Dictators",  "e1", ["defence"],          [30,52,46,30,44], "Marched Paraguay into annihilation.", { scope: "wild", despot: true, wiki: "Francisco Solano López" });
  M("Enver Hoxha",        "Dictators",     "e4", ["home"],             [22,66,48,44,66], "Bunkered Albania against the world.", { scope: "wild", despot: true });

  /* ================= SpAds, strategists & mandarins (cast: insider) ======== */
  M("Alastair Campbell",  "Labour",       "e6", ["culture","leader"],  [56,76,76,62,70], "New Labour's enforcer-in-chief of the grid.", { cast: "insider" });
  M("Peter Hyman",        "Labour",       "e6", ["education","culture"],[36,56,58,52,48], "Blair's speechwriter who went to teach.", { cast: "insider", wiki: "Peter Hyman" });
  M("Damian McBride",     "Labour",       "e6", ["culture","whip"],    [22,54,44,46,52], "McPoison; the smears that ended him.", { cast: "insider" });
  M("Seumas Milne",       "Labour",       "e7", ["culture","foreign"], [26,58,52,50,54], "Corbyn's Wykehamist consigliere.", { cast: "insider" });
  M("Morgan McSweeney",   "Labour",       "e7", ["whip","leader"],     [28,60,36,62,78], "The strategist who rebuilt Labour's machine.", { cast: "insider" });
  M("Sue Gray",           "Independent",  "e7", ["whip","home"],       [34,84,32,72,66], "Whitehall's keeper of secrets; briefly chief of staff.", { cast: "insider" });
  M("Andy Coulson",       "Conservative", "e7", ["culture"],           [30,52,44,42,48], "From the newsroom to No.10 to the dock.", { cast: "insider" });
  M("Dominic Cummings",   "Conservative", "e7", ["education","business"],[34,62,48,72,30], "Vote Leave's brain; Barnard Castle's optometrist.", { cast: "insider" });
  M("Nick Timothy",       "Conservative", "e7", ["home","education"],  [26,56,46,56,44], "May's co-chief; author of the 2017 manifesto.", { cast: "insider", wiki: "Nick Timothy" });
  M("Fiona Hill",         "Conservative", "e7", ["culture","home"],    [24,54,38,48,46], "The other half of May's praetorian guard.", { cast: "insider", wiki: "Fiona McLeod Hill" });
  M("Lynton Crosby",      "Conservative", "e7", ["culture","whip"],    [28,72,38,58,72], "The Wizard of Oz; dead cats a speciality.", { cast: "insider" });
  M("Isaac Levido",       "Conservative", "e7", ["culture"],           [24,50,32,52,58], "Ran the 2019 landslide war room.", { cast: "insider", wiki: "Isaac Levido" });
  M("Jonathan Powell",    "Labour",       "e6", ["foreign","whip"],    [30,80,44,76,64], "Blair's chief of staff; Good Friday's quiet hand.", { cast: "insider", wiki: "Jonathan Powell (Labour adviser)" });
  M("Sally Morgan",       "Labour",       "e6", ["whip","education"],  [26,64,38,54,62], "Blair's gatekeeper.", { cast: "insider", wiki: "Sally Morgan, Baroness Morgan of Huyton" });
  M("Ed Llewellyn",       "Conservative", "e7", ["foreign","whip"],    [22,68,34,62,58], "Cameron's chief of staff, then Paris embassy.", { cast: "insider", wiki: "Ed Llewellyn" });
  M("Gus O'Donnell",      "Independent",  "e6", ["chancellor","whip"], [36,90,48,80,70], "GOD: Cabinet Secretary to three PMs.", { cast: "insider", wiki: "Gus O'Donnell" });
  M("Jeremy Heywood",     "Independent",  "e7", ["chancellor","home"], [32,92,42,86,72], "The indispensable man of four premierships.", { cast: "insider", wiki: "Jeremy Heywood" });
  M("Simon Case",         "Independent",  "e7", ["whip"],              [22,62,30,52,46], "Youngest Cabinet Secretary; partygate's witness.", { cast: "insider", wiki: "Simon Case" });
  M("Robin Butler",       "Independent",  "e5", ["whip","home"],       [28,86,40,74,66], "Five PMs served; the Butler Review after.", { cast: "insider", wiki: "Robin Butler, Baron Butler of Brockwell" });
  M("Bernard Ingham",     "Conservative", "e5", ["culture"],           [38,72,56,48,60], "Thatcher's Yorkshire foghorn.", { cast: "insider" });
  M("Charlie Whelan",     "Labour",       "e6", ["culture","whip"],    [26,56,44,40,56], "Brown's bruiser in the press gallery.", { cast: "insider", wiki: "Charlie Whelan" });

  /* ================= The novelty fringe (cast: novelty — all really stood) == */
  M("Screaming Lord Sutch","Monster Raving Loony","e5",["leader","culture"],[68,40,62,12,40], "Fought 40 elections; outpolled the SDP's rump in '90.", { cast: "novelty" });
  M("Howling Laud Hope",  "Monster Raving Loony", "e6", ["leader","deputy"],[48,36,46,10,38], "Loony leader since '99; his cat was co-leader.", { cast: "novelty" });
  M("Count Binface",      "Independent (Fringe)", "e7", ["pm","defence","culture"],[72,22,64,14,20], "Intergalactic space warrior; beat Britain First in 2019.", { cast: "novelty" });
  M("Lord Buckethead",    "Independent (Fringe)", "e5", ["defence","leader"],[58,20,40,10,16], "Stood against Thatcher, Major and May. The bucket abides.", { cast: "novelty" });
  M("Bill Boaks",         "Independent (Fringe)", "e4", ["transport"],  [36,30,30,8,10], "Road-safety crusader; record-lowest vote ever: five.", { cast: "novelty", wiki: "Bill Boaks" });
  M("Commander Knapp",    "Monster Raving Loony", "e6", ["defence"],    [30,22,32,8,22], "Top Cat to his friends; perennial Loony candidate.", { cast: "novelty", wiki: "Official Monster Raving Loony Party" });
  M("Mad Cap'n Tom",      "Independent (Fringe)", "e7", ["defence","culture"],[44,12,40,8,12], "Pirate candidate, Bermondsey 2010. Yarr.", { cast: "novelty", wiki: "Mad Cap'n Tom" });
  M("Al Murray",          "Independent (Fringe)", "e7", ["culture","leader"],[66,28,76,16,24], "The Pub Landlord stood against Farage in Thanet, 2015.", { cast: "novelty", wiki: "Al Murray" });
  M("Bez",                "Independent (Fringe)", "e7", ["health","culture"],[54,16,36,6,14], "Happy Mondays' shaman; Reality Party, Salford 2015.", { cast: "novelty", wiki: "Bez (dancer)" });
  M("Max Fosh",           "Independent (Fringe)", "e7", ["culture"],    [62,10,58,8,12], "YouTuber who stood for London Mayor to beat Laurence Fox. Did.", { cast: "novelty", wiki: "Max Fosh" });
  M("Niko Omilana",       "Independent (Fringe)", "e7", ["culture","education"],[74,10,60,8,16], "NDL founder; 49,628 votes for London Mayor in 2021.", { cast: "novelty", wiki: "Niko Omilana" });
  M("Ronnie Carroll",     "Independent (Fringe)", "e7", ["culture"],    [34,28,40,8,10], "Eurovision crooner; died mid-campaign, stayed on the ballot.", { cast: "novelty", wiki: "Ronnie Carroll" });
  M("David Icke",         "Independent (Fringe)", "e5", ["culture"],    [40,26,52,4,8],  "Green spokesman turned lizard-theory conspiracist; stood in 2008.", { cast: "novelty", flag: "conspiracist", wiki: "David Icke" });
  M("Piers Corbyn",       "Independent (Fringe)", "e7", ["environment"],[26,22,38,6,6],  "Weather-forecasting conspiracist; serial fringe candidate.", { cast: "novelty", flag: "conspiracist", wiki: "Piers Corbyn" });
  M("Bobby Smith",        "Independent (Fringe)", "e7", ["education"],  [38,12,28,6,10], "Fathers' rights campaigner who stands dressed as Elmo.", { cast: "novelty", wiki: "Bobby Smith (activist)" });
  M("Mr Fish Finger",     "Independent (Fringe)", "e7", ["environment"],[32,8,22,4,8],  "Crowdfunded breadcrumbed challenger to Tim Farron, 2017.", { cast: "novelty", wiki: "Mr Fish Finger" });
  M("Lord Toby Jug",        "Monster Raving Loony","e6",["culture"],    [34,20,40,6,18], "Loony stalwart who founded the breakaway Eccentric Party.", { cast: "novelty", wiki: "Lord Toby Jug" });
  M("Nick \"The Flying Brick\" Delves","Monster Raving Loony","e7",["transport"],[30,18,32,6,20], "Loony by-election ever-present; nuclear-powered hovercraft pledge.", { cast: "novelty", wiki: "Official Monster Raving Loony Party" });
  
  M("George Galloway",    "Workers Party", "e7", ["leader","foreign"],  [60,72,88,48,30], "Four parties, six seats, one cat impression.");
  M("Eddie Izzard",       "Labour",        "e7", ["culture","education"],[64,30,72,28,30], "Marathon-running would-be MP; kept trying, kept losing selections.", { cast: "novelty", wiki: "Suzy Izzard" });
  M("Captain Beany",        "Independent (Fringe)", "e6", ["health"],     [38,20,38,6,12], "Port Talbot's orange baked-bean superhero; serial candidate.", { cast: "novelty", wiki: "Captain Beany" });

  G._MORE_CHUNK2 = true;
})();

/* ============== CHUNK 3: NI top-up — over the dynasty threshold =========== */
(function () {
  var G = window.G;
  var existing = {};
  G.POLITICIANS.forEach(function (p) { existing[p.name + "|" + (p.scope || "uk")] = 1; });
  function M(name, party, era, fits, s, note, extra) {
    extra = extra || {};
    var scope = extra.scope || "uk";
    if (existing[name + "|" + scope]) return;
    existing[name + "|" + scope] = 1;
    var fig = { name: name, party: party, era: era, fits: fits,
      stats: { appeal: s[0], experience: s[1], oratory: s[2], statecraft: s[3], partyMgmt: s[4] },
      note: note || "", scope: scope };
    if (extra.cast) fig.cast = extra.cast;
    if (extra.flag) fig.flag = extra.flag;
    if (extra.wiki || extra.img) G.PHOTO[name] = { wiki: extra.wiki, img: extra.img };
    G.POLITICIANS.push(fig);
  }
  /* UUP */
  M("Harry West",        "UUP", "e4", ["environment","leader"],  [34,66,48,50,60], "Farming unionism's stolid leader.", { wiki: "Harry West" });
  M("John Taylor",       "UUP", "e5", ["home","foreign"],        [40,74,56,58,54], "Survived an assassination; decades at the top table.", { wiki: "John Taylor, Baron Kilclooney" });
  M("Ken Maginnis",      "UUP", "e6", ["defence","home"],        [42,70,58,54,56], "Soldier-MP; security spokesman through the worst.", { wiki: "Ken Maginnis" });
  /* DUP */
  M("William McCrea",    "DUP", "e5", ["culture","whip"],        [38,66,68,40,58], "Gospel-singing hardline reverend.", { wiki: "William McCrea, Baron McCrea of Magherafelt and Cookstown" });
  M("Gregory Campbell",  "DUP", "e7", ["culture","work"],        [32,68,52,44,58], "East Londonderry's immovable object.", { wiki: "Gregory Campbell (politician)" });
  M("Diane Dodds",       "DUP", "e7", ["business","environment"],[34,62,48,52,56], "Brussels then Stormont economy minister.", { wiki: "Diane Dodds" });
  /* SDLP */
  M("Austin Currie",     "SDLP", "e4", ["home","work"],          [50,62,66,54,52], "Caledon squat, 1968 — where it all began.", { wiki: "Austin Currie" });
  M("Bríd Rodgers",      "SDLP", "e6", ["environment","health"], [40,64,58,56,58], "Agriculture minister through foot-and-mouth.", { wiki: "Bríd Rodgers" });
  M("Alex Attwood",      "SDLP", "e7", ["environment","justice"],[30,58,48,52,52], "West Belfast's tenacious minister.", { wiki: "Alex Attwood" });
  M("Joe Hendron",       "SDLP", "e5", ["health"],               [36,58,46,50,50], "The GP who took West Belfast from Adams.", { wiki: "Joe Hendron" });
  /* Sinn Féin */
  M("Alex Maskey",       "Sinn Féin", "e6", ["whip","home"],     [36,66,50,52,64], "First SF mayor of Belfast; Assembly Speaker.", { wiki: "Alex Maskey" });
  M("Michelle Gildernew","Sinn Féin", "e7", ["environment","health"],[44,60,54,50,58], "Fermanagh's four-vote victor; agriculture minister.", { wiki: "Michelle Gildernew" });
  M("Francie Molloy",    "Sinn Féin", "e7", ["whip"],            [28,62,42,46,60], "Mid Ulster's abstentionist stalwart.", { wiki: "Francie Molloy" });
  M("Paul Maskey",       "Sinn Féin", "e7", ["work","business"], [30,56,44,46,58], "West Belfast since 2011.", { wiki: "Paul Maskey" });
  M("Chris Hazzard",     "Sinn Féin", "e7", ["transport","education"],[36,52,50,48,54], "South Down; infrastructure minister.", { wiki: "Chris Hazzard" });
  /* Alliance */
  M("Seán Neeson",       "Alliance", "e6", ["business","leader"],[28,56,42,48,48], "Steered Alliance through its leanest years.", { wiki: "Seán Neeson" });
  M("Eileen Bell",       "Alliance", "e6", ["education","whip"], [32,58,44,50,52], "Assembly Speaker; peace-process bridge-builder.", { wiki: "Eileen Bell" });
  M("Andrew Muir",       "Alliance", "e7", ["environment"],      [34,46,46,48,50], "First openly gay Stormont minister; agriculture.", { wiki: "Andrew Muir" });
  M("Paula Bradshaw",    "Alliance", "e7", ["health","work"],    [34,48,48,48,50], "South Belfast's health voice.", { wiki: "Paula Bradshaw" });
  M("Kellie Armstrong",  "Alliance", "e7", ["education","transport"],[32,48,46,48,50], "Strangford's integrated-education champion.", { wiki: "Kellie Armstrong" });
  M("Nuala McAllister",  "Alliance", "e7", ["foreign","culture"],[36,42,48,44,48], "North Belfast; former Lord Mayor.", { wiki: "Nuala McAllister" });
})();

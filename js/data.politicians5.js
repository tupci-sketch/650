/* ============================================================
   650 — POLITICIANS & CELEBRITIES EXPANSION V
   -----------------------------------------------------------
   Two top-ups in one file:

   1. WORLD POLITICIANS (scope:"wild") — more statesmen, leaders
      and revolutionaries for the playable nations and the wider
      world, routed to their country by the "(XX)" party suffix.

   2. CELEBRITIES & CULTURAL FIGURES (scope:"uk", cast:"novelty")
      — filed under the existing Fringe lineage parties registered
      in data.expansion.js, so they stay out of a serious draft
      unless mavericks are toggled on, flood a Monster Raving Loony
      dynasty, and appear in Wildcard. Inclusion is satire, never
      endorsement; ratings are an editorial abstraction.

   Loads after data.politicians4.js. Never duplicates a name that
   already exists at the same scope.
   ============================================================= */
window.G = window.G || {};
(function () {
  var G = window.G;
  var existing = {};
  (G.POLITICIANS || []).forEach(function (p) { existing[p.name + "|" + (p.scope || "uk")] = 1; });

  /* world politician — scope "wild" */
  function I(name, party, era, fits, s, note) {
    if (existing[name + "|wild"]) return;
    existing[name + "|wild"] = 1;
    (G.POLITICIANS = G.POLITICIANS || []).push({
      name: name, party: party, era: era, fits: fits,
      stats: { appeal: s[0], experience: s[1], oratory: s[2], statecraft: s[3], partyMgmt: s[4] },
      note: note, scope: "wild"
    });
  }

  /* celebrity / cultural figure — scope "uk", novelty cast, Fringe party */
  function C(name, party, era, fits, s, note, wiki) {
    if (existing[name + "|uk"]) return;
    existing[name + "|uk"] = 1;
    var fig = {
      name: name, party: party, era: era, fits: fits,
      stats: { appeal: s[0], experience: s[1], oratory: s[2], statecraft: s[3], partyMgmt: s[4] },
      note: note, scope: "uk", cast: "novelty"
    };
    (G.POLITICIANS = G.POLITICIANS || []).push(fig);
    if (wiki && G.PHOTO && !G.PHOTO[name]) G.PHOTO[name] = { wiki: wiki };
  }

  /* ════════════════════════════════════════════════════════
     PART 1 · MORE WORLD POLITICIANS
     ════════════════════════════════════════════════════════ */

  /* --- United States --- */
  I("Al Gore",            "Democrat (USA)",   "e6", ["deputy","environment","foreign"],[64,76,66,66,58], "Vice President under Clinton; won the popular vote in 2000; Nobel-winning climate campaigner.");
  I("John Kerry",         "Democrat (USA)",   "e7", ["foreign","defence","leader"],   [58,80,62,66,58], "Secretary of State; 2004 presidential nominee; Vietnam veteran turned climate envoy.");
  I("John McCain",        "Republican (USA)", "e7", ["defence","foreign","leader"],   [70,82,68,70,62], "Arizona senator and war hero; 2008 nominee; the Senate's self-styled maverick.");
  I("Hillary Clinton",    "Democrat (USA)",   "e7", ["foreign","pm","leader"],        [58,84,64,72,66], "First Lady, senator and Secretary of State; first woman to win a major party's nomination.");
  I("Kamala Harris",      "Democrat (USA)",   "e7", ["deputy","justice","leader"],    [60,62,64,56,56], "First woman Vice President; former California attorney general; 2024 presidential nominee.");
  I("Spiro Agnew",        "Republican (USA)", "e5", ["deputy","leader"],              [44,52,54,40,44], "Nixon's combative Vice President; resigned in 1973 over tax-evasion charges.");
  I("Tip O'Neill",        "Democrat (USA)",   "e5", ["leader","whip"],                [66,80,68,66,78], "Long-serving Speaker of the House; 'all politics is local'.");
  I("Henry Clay",         "Whig (USA)",       "e1", ["chancellor","foreign","leader"],[70,76,82,72,66], "'The Great Compromiser'; Speaker and senator who held the Union together for decades.");
  I("Daniel Webster",     "Whig (USA)",       "e1", ["foreign","justice","leader"],   [68,72,86,70,58], "Towering Senate orator and Secretary of State; defender of the Union.");
  I("John C. Calhoun",    "Democrat (USA)",   "e1", ["deputy","foreign","leader"],    [56,72,76,64,56], "Vice President and senator; fierce theorist of states' rights and nullification.");
  I("Charles Sumner",     "Republican (USA)", "e1", ["foreign","justice","leader"],   [58,66,78,60,50], "Abolitionist senator caned on the Senate floor; Radical Reconstruction leader.");
  I("Eugene Debs",        "Progressive (USA)","e2", ["work","leader","culture"],      [72,54,82,46,58], "Five-time Socialist presidential candidate; ran his last campaign from prison.");
  I("Huey Long",          "Democrat (USA)",   "e3", ["pm","chancellor","leader"],     [78,58,84,50,60], "Louisiana's 'Kingfish'; populist 'Share Our Wealth' demagogue; assassinated in 1935.");
  I("Strom Thurmond",     "Democrat (USA)",   "e4", ["leader","home"],                [44,82,54,52,56], "Record-setting filibusterer; segregationist turned long-serving Republican senator.");
  I("Barry Goldwater",    "Republican (USA)", "e4", ["defence","leader"],             [58,66,62,56,54], "Arizona senator; 1964 nominee; godfather of the modern conservative movement.");
  I("George Wallace",     "Democrat (USA)",   "e4", ["home","leader"],                [60,58,68,40,50], "Segregationist Alabama governor; populist third-party candidate; shot while campaigning.");
  I("Robert F. Kennedy",  "Democrat (USA)",   "e4", ["justice","foreign","leader"],   [80,64,78,64,62], "Attorney General and senator; civil-rights champion assassinated mid-campaign in 1968.");
  I("Alexandria Ocasio-Cortez","Democrat (USA)","e7",["leader","environment","work"], [74,40,78,46,56], "Bronx congresswoman; face of the progressive 'Squad' and the Green New Deal.");
  I("Bernie Sanders",     "Democrat (USA)",   "e7", ["chancellor","work","leader"],   [72,80,76,58,60], "Vermont senator; democratic-socialist who reshaped the party's economic debate.");
  I("Colin Powell",       "Republican (USA)", "e6", ["defence","foreign","leader"],   [74,80,68,72,66], "First Black Secretary of State and Joint Chiefs chairman; Gulf War architect.");

  /* --- Germany --- */
  I("Friedrich Merz",     "CDU (DE)",         "e7", ["pm","chancellor","business"],   [54,66,62,60,58], "CDU leader and Chancellor from 2025; corporate lawyer; long-time Merkel rival.");
  I("Robert Habeck",      "Green (DE)",       "e7", ["chancellor","environment","business"],[60,56,66,54,52], "Green vice-chancellor and economy minister; author and philosopher by training.");
  I("Annalena Baerbock",  "Green (DE)",       "e7", ["foreign","environment","leader"],[58,52,64,52,52], "Germany's first Green foreign minister; 2021 chancellor candidate.");
  I("Christian Lindner",  "FDP (DE)",         "e7", ["chancellor","business"],        [56,54,68,50,54], "Free Democrat leader and finance minister; pro-market liberal.");
  I("Frank-Walter Steinmeier","SPD (DE)",     "e7", ["foreign","pm","leader"],        [56,76,58,64,58], "Two-time foreign minister; Federal President from 2017.");
  I("Wolfgang Schäuble",  "CDU (DE)",         "e7", ["chancellor","home","leader"],   [54,84,62,72,66], "Finance minister of the euro crisis; Bundestag president; CDU elder statesman.");
  I("Gustav Stresemann",  "DVP (DE)",         "e2", ["chancellor","foreign","leader"],[64,72,76,74,58], "Weimar foreign minister; Nobel laureate for reconciliation with France.");
  I("Friedrich Ebert",    "SPD (DE)",         "e2", ["pm","leader","work"],           [58,66,58,60,62], "First President of the Weimar Republic; steered Germany through revolution.");
  I("Rosa Luxemburg",     "SED (DE)",         "e2", ["work","leader","culture"],      [66,52,80,48,50], "Revolutionary Marxist theorist; co-founded the Spartacus League; murdered in 1919.");
  I("Karl Liebknecht",    "SED (DE)",         "e2", ["work","leader"],                [60,48,74,42,46], "Anti-war socialist; co-founder of the German Communist Party; killed in 1919.");
  I("Walter Ulbricht",    "SED (DE)",         "e4", ["pm","leader","home"],           [38,70,42,52,64], "East German leader who built the Berlin Wall.");
  I("Erich Honecker",     "SED (DE)",         "e5", ["pm","leader","home"],           [34,72,40,48,62], "Hard-line GDR leader toppled by the 1989 revolution.");
  I("Hans-Dietrich Genscher","FDP (DE)",      "e5", ["foreign","leader"],             [62,82,64,72,62], "Long-serving foreign minister; architect of reunification diplomacy.");
  I("Theodor Heuss",      "FDP (DE)",         "e4", ["pm","education","leader"],       [62,68,66,62,56], "First President of West Germany; liberal scholar and journalist.");

  /* --- France --- */
  I("Georges Pompidou",   "Gaulliste (FR)",   "e4", ["pm","chancellor","leader"],     [60,74,62,68,62], "De Gaulle's prime minister and successor as president; steady moderniser.");
  I("Valéry Giscard d'Estaing","MRP (FR)",    "e5", ["pm","chancellor","foreign"],    [62,72,66,68,56], "Reforming centrist president 1974–81; a father of the European project.");
  I("Lionel Jospin",      "SFIO (FR)",        "e6", ["pm","education","leader"],      [54,70,58,62,58], "Socialist prime minister; shocked when knocked out of the 2002 run-off.");
  I("Ségolène Royal",     "SFIO (FR)",        "e7", ["environment","education","leader"],[58,62,62,54,50], "Socialist 2007 presidential candidate; environment minister.");
  I("Jean-Luc Mélenchon", "SFIO (FR)",        "e7", ["leader","work","culture"],      [62,66,78,52,54], "Firebrand of the radical left; founder of La France Insoumise.");
  I("Marine Le Pen",      "Gaulliste (FR)",   "e7", ["leader","home"],                [56,64,64,52,60], "National Rally leader; thrice a presidential finalist; detoxified the hard right.");
  I("Édouard Herriot",    "SFIO (FR)",        "e2", ["pm","culture","leader"],        [56,68,66,58,54], "Radical leader and three-time premier; mayor of Lyon for half a century.");
  I("Aristide Briand",    "SFIO (FR)",        "e2", ["foreign","pm","leader"],        [64,74,80,68,56], "Eleven-time premier; Nobel laureate for Franco-German reconciliation.");
  I("Raymond Poincaré",   "MRP (FR)",         "e2", ["pm","chancellor","foreign"],    [56,76,64,70,58], "Wartime president and austerity premier who saved the franc.");
  I("Pierre Mendès France","SFIO (FR)",       "e4", ["pm","chancellor","foreign"],    [66,70,70,68,54], "Reforming premier who ended the Indochina war; the left's lost conscience.");
  I("Michel Rocard",      "SFIO (FR)",        "e5", ["pm","chancellor","work"],       [58,70,62,64,52], "Socialist prime minister; standard-bearer of the reformist 'second left'.");

  /* --- Australia --- */
  I("Paul Keating",       "Labor (AU)",       "e6", ["pm","chancellor","leader"],     [66,76,82,70,62], "Treasurer then PM; floated the dollar and championed the republic with a famous tongue.");
  I("Malcolm Fraser",     "Liberal (AU)",     "e5", ["pm","foreign","leader"],        [56,72,58,64,60], "Liberal PM who took office in the 1975 dismissal crisis; later a human-rights voice.");
  I("Kevin Rudd",         "Labor (AU)",       "e7", ["pm","foreign","leader"],        [64,68,64,60,52], "Mandarin-speaking PM; apologised to the Stolen Generations; deposed and restored.");
  I("Julia Gillard",      "Labor (AU)",       "e7", ["pm","education","leader"],      [62,66,72,60,56], "Australia's first woman PM; her 'misogyny speech' went round the world.");
  I("Tony Abbott",        "Liberal (AU)",     "e7", ["pm","home","leader"],           [52,62,56,52,58], "Pugnacious conservative PM; Rhodes scholar and one-time trainee priest.");
  I("Malcolm Turnbull",   "Liberal (AU)",     "e7", ["pm","business","foreign"],      [60,64,62,62,52], "Republican-minded moderate PM and former tech entrepreneur.");
  I("Scott Morrison",     "Liberal (AU)",     "e7", ["pm","home","business"],         [52,58,56,52,54], "PM through bushfires and the pandemic; marketing man turned 'ScoMo'.");
  I("Anthony Albanese",   "Labor (AU)",       "e7", ["pm","transport","leader"],      [60,64,58,58,58], "Labor PM from 2022; raised in public housing; 'Albo'.");
  I("Ben Chifley",        "Labor (AU)",       "e3", ["pm","chancellor","work"],       [62,66,62,62,58], "Postwar Labor PM; train driver who built the welfare state and the Snowy Scheme.");
  I("Alfred Deakin",      "Liberal (AU)",     "e2", ["pm","foreign","leader"],        [66,70,76,66,60], "Federation father and thrice prime minister of the new Commonwealth.");
  I("John Curtin",        "Labor (AU)",       "e3", ["pm","defence","leader"],        [70,72,72,68,62], "Wartime PM who turned to America; revered for steering Australia through WWII.");

  /* --- Canada --- */
  I("Brian Mulroney",     "Conservative (CA)","e6", ["pm","foreign","business"],      [60,72,68,64,60], "Progressive Conservative PM; free trade with the US and the GST.");
  I("Jean Chrétien",      "Liberal (CA)",     "e6", ["pm","chancellor","leader"],     [62,78,60,68,66], "Three-term Liberal PM; balanced the budget and kept Canada out of Iraq.");
  I("Paul Martin",        "Liberal (CA)",     "e6", ["pm","chancellor","business"],   [56,72,56,66,54], "Finance minister who slew the deficit; later prime minister.");
  I("Stephen Harper",     "Conservative (CA)","e7", ["pm","chancellor","foreign"],    [52,70,54,66,62], "Conservative PM 2006–15; economist; steered Canada through the financial crisis.");
  I("Tommy Douglas",      "CCF (CA)",         "e4", ["health","leader","culture"],    [76,64,80,58,62], "Father of Canadian medicare; voted the 'Greatest Canadian'.");
  I("Lester B. Pearson",  "Liberal (CA)",     "e4", ["foreign","pm","leader"],        [70,78,66,72,60], "Nobel-winning diplomat; PM who gave Canada its flag and medicare.");
  I("John Diefenbaker",   "Conservative (CA)","e4", ["pm","justice","leader"],        [58,68,72,56,54], "Populist Tory PM; Bill of Rights champion; prairie orator.");
  I("Jack Layton",        "CCF (CA)",         "e7", ["leader","health","culture"],    [72,58,72,54,60], "Beloved NDP leader who led it to its historic best before his death in 2011.");
  I("Kim Campbell",       "Conservative (CA)","e6", ["pm","justice","defence"],       [54,58,58,54,46], "Canada's first woman PM; held office for months before a historic defeat.");
  I("Wilfrid Laurier",    "Liberal (CA)",     "e2", ["pm","foreign","leader"],        [70,76,78,70,64], "First francophone PM; 'the twentieth century belongs to Canada'.");
  I("Jagmeet Singh",      "CCF (CA)",         "e7", ["leader","justice","work"],      [62,52,64,48,54], "First non-white leader of a major federal party; NDP leader and kingmaker.");

  /* --- Japan --- */
  I("Yasuhiro Nakasone",  "LDP (JP)",         "e5", ["pm","foreign","defence"],       [60,74,64,66,62], "Assertive PM of the 1980s; close to Reagan; privatised the railways.");
  I("Junichiro Koizumi",  "LDP (JP)",         "e6", ["pm","business","leader"],       [70,68,72,62,58], "Charismatic reformer PM; privatised the post office; Elvis fan.");
  I("Yukio Hatoyama",     "JSP (JP)",         "e7", ["pm","foreign","leader"],        [50,56,50,46,44], "First Democratic Party PM; ended decades of LDP rule, then stumbled in months.");
  I("Yoshihiko Noda",     "JSP (JP)",         "e7", ["pm","chancellor","leader"],     [50,60,54,56,50], "Democratic Party PM; pushed the consumption-tax rise before losing power.");
  I("Yoshihide Suga",     "LDP (JP)",         "e7", ["pm","home","leader"],           [44,64,44,56,58], "Abe's right hand who succeeded him; farmer's son; one pandemic year as PM.");
  I("Fumio Kishida",      "LDP (JP)",         "e7", ["pm","foreign","leader"],        [48,66,50,58,58], "PM from 2021; dovish Hiroshima native who boosted defence spending.");
  I("Taro Aso",           "LDP (JP)",         "e7", ["pm","chancellor","foreign"],    [50,72,52,58,60], "Manga-loving PM and long-serving finance minister; political blue blood.");
  I("Kakuei Tanaka",      "LDP (JP)",         "e5", ["pm","business","leader"],       [62,72,66,58,66], "Self-made 'computerised bulldozer' PM; brought down by the Lockheed scandal.");
  I("Hayato Ikeda",       "LDP (JP)",         "e4", ["pm","chancellor","business"],   [58,70,56,68,58], "Architect of the income-doubling plan that drove Japan's economic miracle.");
  I("Takako Doi",         "JSP (JP)",         "e6", ["leader","culture","education"], [58,58,66,50,50], "First woman to lead a Japanese party and to chair the lower house.");

  /* --- India --- */
  I("Atal Bihari Vajpayee","BJP (IN)",        "e6", ["pm","foreign","leader"],        [72,76,82,70,66], "BJP's first full-term PM; poet-statesman who tested the bomb and sought peace.");
  I("Manmohan Singh",     "Congress (IN)",    "e7", ["pm","chancellor","education"],  [60,82,52,76,58], "Economist PM; as finance minister in 1991 he opened up the Indian economy.");
  I("Sonia Gandhi",       "Congress (IN)",    "e7", ["leader","culture"],             [56,72,54,60,66], "Congress president for two decades; declined the premiership in 2004.");
  I("Lal Bahadur Shastri","Congress (IN)",    "e4", ["pm","foreign","leader"],        [70,68,66,64,60], "Soft-spoken PM of the 1965 war; 'Jai Jawan Jai Kisan'; died at Tashkent.");
  I("Morarji Desai",      "Janata Party (IN)","e5", ["pm","chancellor","leader"],     [50,72,54,58,56], "First non-Congress PM; Gandhian ascetic; oldest person to hold the office.");
  I("Vallabhbhai Patel",  "Congress (IN)",    "e3", ["home","deputy","leader"],       [70,76,70,74,72], "The 'Iron Man'; integrated the princely states into the new India.");
  I("B. R. Ambedkar",     "Congress (IN)",    "e3", ["justice","education","leader"], [74,72,78,72,58], "Chief architect of the Constitution; Dalit leader and social reformer.");
  I("Narendra Modi",      "BJP (IN)",         "e7", ["pm","foreign","leader"],        [70,72,76,64,76], "PM from 2014; transformed Indian politics; Hindu-nationalist mass campaigner.");
  I("Mamata Banerjee",    "Congress (IN)",    "e7", ["leader","home","work"],         [64,66,68,54,62], "Firebrand Bengal chief minister; street fighter who broke the Left's grip.");
  I("Jayaprakash Narayan","Janata Party (IN)","e5", ["leader","culture"],             [70,60,76,50,52], "Socialist 'JP'; led the movement that toppled Indira Gandhi's Emergency.");

  /* --- Soviet Union / Russia --- */
  I("Leon Trotsky",       "Bolshevik (SU)",   "e2", ["defence","foreign","leader"],   [70,68,86,64,50], "Architect of the Red Army; lost the succession to Stalin; murdered in exile.");
  I("Grigory Zinoviev",   "Bolshevik (SU)",   "e2", ["leader","foreign","culture"],   [52,60,68,46,46], "Comintern chief and early Bolshevik leader; purged and shot under Stalin.");
  I("Lavrentiy Beria",    "Bolshevik (SU)",   "e3", ["home","defence","justice"],     [34,70,40,52,56], "Stalin's secret-police chief; ran the atomic project; shot in the 1953 power struggle.");
  I("Georgy Malenkov",    "Bolshevik (SU)",   "e4", ["pm","chancellor","leader"],     [44,66,46,52,52], "Briefly Stalin's successor as premier before Khrushchev outmanoeuvred him.");
  I("Alexei Kosygin",     "Bolshevik (SU)",   "e4", ["pm","chancellor","business"],   [50,72,48,62,54], "Reform-minded Soviet premier under Brezhnev; tried to modernise the planned economy.");
  I("Yuri Andropov",      "Bolshevik (SU)",   "e5", ["leader","home","foreign"],      [42,72,46,58,60], "KGB chief turned Soviet leader; began the crackdown on corruption before dying in office.");
  I("Anastas Mikoyan",    "Bolshevik (SU)",   "e4", ["foreign","business","leader"],  [52,76,54,62,54], "The great survivor; served from Lenin to Brezhnev; defused the Cuban crisis.");
  I("Boris Yeltsin",      "United Russia",    "e6", ["pm","leader","home"],           [56,62,60,48,50], "First president of post-Soviet Russia; faced down the 1991 coup atop a tank.");
  I("Dmitry Medvedev",    "United Russia",    "e7", ["pm","foreign","business"],      [46,62,48,52,54], "Putin's placeholder president 2008–12; later a hawkish security-council voice.");
  I("Alexei Navalny",     "United Russia",    "e7", ["leader","justice","culture"],   [72,52,76,50,48], "Anti-corruption opposition leader; poisoned, jailed and died in an Arctic prison.");
  I("Mikhail Tukhachevsky","Bolshevik (SU)",  "e3", ["defence","leader"],             [56,60,54,52,46], "Brilliant Red Army marshal; theorist of deep battle; shot in Stalin's purges.");

  /* --- China --- */
  I("Cai Yuanpei",        "Chinese Nationalist Party (CN)","e2",["education","culture","leader"],[64,60,68,58,52], "Reforming chancellor of Peking University; champion of academic freedom.");
  I("Wang Jingwei",       "Kuomintang (CN)",  "e3", ["pm","foreign","leader"],        [50,62,64,44,48], "KMT rival to Chiang who led a Japanese puppet government; byword for collaboration.");
  I("Soong Ching-ling",   "Chinese Nationalist Party (CN)","e3",["culture","foreign","leader"],[64,64,66,58,50], "Sun Yat-sen's widow; bridged Nationalists and Communists; honorary PRC head of state.");
  I("Lin Zexu",           "Chinese Nationalist Party (CN)","e1",["justice","home","leader"],[64,66,62,64,56], "Qing official whose opium crackdown sparked the First Opium War.");
  I("Li Hongzhang",       "Chinese Nationalist Party (CN)","e1",["foreign","chancellor","leader"],[54,72,58,64,56], "Late-Qing statesman and diplomat who modernised the army and navy.");
  I("Hu Shih",            "Chinese Nationalist Party (CN)","e3",["education","culture","foreign"],[62,58,66,56,48], "Philosopher of the vernacular movement; ambassador to the US; liberal icon.");
  I("Wang Huning",        "Chinese Communist Party","e7",["culture","education","leader"],[44,66,46,62,58], "The party's chief ideologue; theorist behind three successive leaders.");
  I("Cai Qi",             "Chinese Communist Party","e7",["home","leader","culture"], [42,60,40,52,58], "Beijing party boss turned Xi's powerful chief of staff on the Standing Committee.");
  I("Ding Xuexiang",      "Chinese Communist Party","e7",["deputy","chancellor","business"],[42,58,40,52,52], "Executive vice-premier; Xi's long-time aide on the Standing Committee.");

  /* --- World statesmen (routed by global fame; no country lock) --- */
  I("Nelson Mandela",     "Revolutionaries",  "e6", ["pm","foreign","leader"],        [96,78,90,82,78], "Prisoner turned president; led South Africa out of apartheid; global moral icon.");
  I("Mahatma Gandhi",     "Revolutionaries",  "e3", ["leader","foreign","culture"],   [94,70,88,76,70], "Father of Indian independence; apostle of non-violent resistance.");
  I("Lech Wałęsa",        "Revolutionaries",  "e5", ["leader","work","foreign"],      [74,58,72,56,58], "Solidarity electrician who broke Communism in Poland; Nobel laureate and president.");
  I("Václav Havel",       "Revolutionaries",  "e6", ["pm","culture","foreign"],       [80,58,80,64,56], "Dissident playwright who led the Velvet Revolution and became Czech president.");
  I("Aung San Suu Kyi",   "Revolutionaries",  "e6", ["leader","foreign","culture"],   [62,58,68,52,54], "Burmese democracy icon and Nobel laureate; later tarnished by the Rohingya crisis.");
  I("Kwame Nkrumah",      "Revolutionaries",  "e4", ["pm","foreign","leader"],        [72,64,80,58,58], "Led Ghana to independence; pan-African visionary; overthrown in a 1966 coup.");
  I("Jomo Kenyatta",      "Revolutionaries",  "e4", ["pm","foreign","leader"],        [70,66,72,62,60], "Founding father and first president of independent Kenya.");
  I("Julius Nyerere",     "Revolutionaries",  "e4", ["pm","education","leader"],      [74,64,76,56,56], "Tanzania's 'Mwalimu'; idealist of African socialism; rare leader to step down.");
  I("Eva Perón",          "Revolutionaries",  "e4", ["culture","work","leader"],      [82,46,82,48,56], "Argentina's 'Evita'; champion of the shirtless ones; died young and adored.");
  I("Salvador Allende",   "Revolutionaries",  "e5", ["pm","health","leader"],         [72,62,76,56,52], "Chile's elected Marxist president; died in the 1973 coup that brought Pinochet.");
  I("Olof Palme",         "Revolutionaries",  "e5", ["pm","foreign","leader"],        [76,68,80,66,60], "Sweden's reforming social-democratic PM; assassinated on a Stockholm street in 1986.");
  I("David Ben-Gurion",   "Revolutionaries",  "e4", ["pm","defence","foreign"],       [74,74,76,72,64], "Israel's founding prime minister; declared the state in 1948.");
  I("Golda Meir",         "Revolutionaries",  "e4", ["pm","foreign","leader"],        [70,74,70,66,64], "Israel's 'Iron Lady'; prime minister through the Yom Kippur War.");
  I("Gamal Abdel Nasser", "Revolutionaries",  "e4", ["pm","defence","foreign"],       [78,66,82,58,62], "Egypt's pan-Arab champion; nationalised the Suez Canal and defied the West.");
  I("Anwar Sadat",        "Revolutionaries",  "e5", ["pm","foreign","defence"],       [70,66,72,64,56], "Egyptian president; made peace with Israel at Camp David; assassinated in 1981.");

  /* ════════════════════════════════════════════════════════
     PART 2 · CELEBRITIES & CULTURAL FIGURES
     (Fringe lineage; scope "uk"; cast novelty)
     ════════════════════════════════════════════════════════ */

  /* --- Music & Stage --- */
  C("David Bowie",        "Music & Stage", "e5", ["culture","foreign"],       [88,30,76,38,34], "Shape-shifting rock chameleon; Ziggy Stardust and the Thin White Duke.", "David Bowie");
  C("Freddie Mercury",    "Music & Stage", "e5", ["culture","leader"],        [90,26,82,34,36], "Queen's flamboyant frontman; one of rock's greatest showmen.", "Freddie Mercury");
  C("Paul McCartney",     "Music & Stage", "e4", ["culture","business"],      [86,40,72,44,42], "Beatle, knight and the most successful songwriter in history.", "Paul McCartney");
  C("Mick Jagger",        "Music & Stage", "e4", ["culture","business"],      [84,38,74,40,38], "The Rolling Stones' strutting frontman and rock survivor.", "Mick Jagger");
  C("Elton John",         "Music & Stage", "e5", ["culture","health"],        [86,36,72,42,40], "Piano superstar, AIDS philanthropist and national treasure.", "Elton John");
  C("Adele",              "Music & Stage", "e7", ["culture"],                 [84,18,66,30,30], "Tottenham's record-breaking voice of heartbreak.", "Adele");
  C("Ed Sheeran",         "Music & Stage", "e7", ["culture","business"],      [80,16,58,32,30], "Ginger troubadour and one of the world's best-selling artists.", "Ed Sheeran");
  C("Stormzy",            "Music & Stage", "e7", ["culture","education"],     [78,16,68,28,32], "Grime star, Glastonbury headliner and education philanthropist.", "Stormzy");
  C("Dua Lipa",           "Music & Stage", "e7", ["culture","foreign"],       [80,14,58,30,28], "Pop hitmaker and disco revivalist with a global following.", "Dua Lipa");
  C("Beyoncé",            "Music & Stage", "e7", ["culture","business","leader"],[88,22,72,42,40], "Global pop monarch; from Destiny's Child to a cultural empire.", "Beyoncé");
  C("Taylor Swift",       "Music & Stage", "e7", ["culture","business","leader"],[88,20,68,44,42], "Record-shattering songwriter whose tours move whole economies.", "Taylor Swift");
  C("Bob Dylan",          "Music & Stage", "e4", ["culture","foreign"],       [78,40,76,42,30], "Voice of a generation; the songwriter who won a Nobel in Literature.", "Bob Dylan");
  C("Bruce Springsteen",  "Music & Stage", "e5", ["culture","work"],          [80,36,74,40,36], "'The Boss'; blue-collar bard of American rock.", "Bruce Springsteen");
  C("Dolly Parton",       "Music & Stage", "e5", ["culture","education","health"],[86,40,72,44,42], "Country legend, literacy philanthropist and beloved icon.", "Dolly Parton");
  C("Bono",               "Music & Stage", "e6", ["foreign","culture","leader"],[76,38,78,48,38], "U2 frontman turned globe-trotting debt-and-aid campaigner.", "Bono");
  C("Bob Geldof",         "Music & Stage", "e5", ["foreign","culture"],       [70,34,76,40,34], "Boomtown Rat who masterminded Live Aid; 'give us your money'.", "Bob Geldof");

  /* --- Stage & Screen --- */
  C("Judi Dench",         "Stage & Screen", "e6", ["culture","foreign"],      [82,44,72,46,40], "Grande dame of British acting; an Oscar-winning national treasure.", "Judi Dench");
  C("Ian McKellen",       "Stage & Screen", "e6", ["culture","leader"],       [80,44,78,48,38], "Gandalf and Magneto; Shakespearean knight and gay-rights pioneer.", "Ian McKellen");
  C("Stephen Fry",        "Stage & Screen", "e6", ["culture","education"],    [80,38,82,46,38], "Polymath wit, presenter and mental-health campaigner.", "Stephen Fry");
  C("Hugh Grant",         "Stage & Screen", "e6", ["culture","justice"],      [74,30,68,40,30], "Rom-com leading man turned scourge of the tabloid press.", "Hugh Grant");
  C("Emma Thompson",      "Stage & Screen", "e6", ["culture","environment"],  [78,38,72,44,36], "Double Oscar winner, screenwriter and outspoken activist.", "Emma Thompson");
  C("Idris Elba",         "Stage & Screen", "e7", ["culture","home","leader"],[80,24,70,38,36], "Hackney-born star of 'Luther' and 'The Wire'; DJ and producer.", "Idris Elba");
  C("Daniel Craig",       "Stage & Screen", "e7", ["defence","culture"],      [76,24,58,36,32], "The brooding modern James Bond.", "Daniel Craig");
  C("Helen Mirren",       "Stage & Screen", "e6", ["culture","leader"],       [80,42,70,46,38], "Played the Queen so well she was made a dame; screen royalty.", "Helen Mirren");
  C("Maggie Smith",       "Stage & Screen", "e6", ["culture","education"],    [80,46,70,46,38], "Acid-tongued Dowager Countess; one of Britain's most beloved actresses.", "Maggie Smith");
  C("Olivia Colman",      "Stage & Screen", "e7", ["culture","health"],       [80,22,66,34,34], "Oscar-winning everywoman; played Queen Anne and Queen Elizabeth II.", "Olivia Colman");
  C("Tom Hanks",          "Stage & Screen", "e6", ["culture","education","leader"],[84,34,74,46,40], "America's most trusted everyman actor.", "Tom Hanks");
  C("Meryl Streep",       "Stage & Screen", "e6", ["culture","foreign"],      [82,42,76,48,38], "The most-nominated actor in Oscar history.", "Meryl Streep");
  C("Denzel Washington",  "Stage & Screen", "e6", ["culture","leader"],       [82,36,76,44,38], "Two-time Oscar winner and one of cinema's most commanding leads.", "Denzel Washington");
  C("Angelina Jolie",     "Stage & Screen", "e7", ["foreign","culture","health"],[80,28,68,46,34], "A-list star turned UN refugee envoy and humanitarian.", "Angelina Jolie");
  C("Keanu Reeves",       "Stage & Screen", "e7", ["culture","defence"],      [80,26,56,34,34], "The internet's nicest action hero; Neo and John Wick.", "Keanu Reeves");

  /* --- Comedy Circuit --- */
  C("Ricky Gervais",      "Comedy Circuit", "e6", ["culture","environment"],  [70,28,74,32,28], "Creator of 'The Office'; provocateur and animal-welfare campaigner.", "Ricky Gervais");
  C("Lenny Henry",        "Comedy Circuit", "e6", ["culture","education"],    [74,34,72,40,36], "Comedian, Comic Relief co-founder and champion of diversity on screen.", "Lenny Henry");
  C("Dawn French",        "Comedy Circuit", "e6", ["culture","health"],       [74,32,68,38,34], "The Vicar of Dibley; warm-hearted comic and writer.", "Dawn French");
  C("Rowan Atkinson",     "Comedy Circuit", "e6", ["culture","transport"],    [78,30,62,40,30], "Mr Bean and Blackadder; physical comedy's silent master.", "Rowan Atkinson");
  C("Billy Connolly",     "Comedy Circuit", "e5", ["culture","leader"],       [80,34,80,38,32], "'The Big Yin'; Scotland's wild, beloved stand-up legend.", "Billy Connolly");
  C("John Cleese",        "Comedy Circuit", "e5", ["culture","education"],    [74,36,76,40,28], "Monty Python and Fawlty Towers; the maestro of the silly walk.", "John Cleese");
  C("Sacha Baron Cohen",  "Comedy Circuit", "e6", ["culture","foreign"],      [70,26,72,34,28], "Borat and Ali G; the provocateur who ambushed the powerful.", "Sacha Baron Cohen");
  C("Romesh Ranganathan", "Comedy Circuit", "e7", ["culture","education"],    [70,16,66,28,30], "Deadpan former maths teacher turned ubiquitous comic and host.", "Romesh Ranganathan");
  C("Jo Brand",           "Comedy Circuit", "e6", ["culture","health"],       [68,28,64,32,30], "Former psychiatric nurse and razor-dry stand-up.", "Jo Brand");
  C("Robin Williams",     "Comedy Circuit", "e6", ["culture","health"],       [84,34,82,40,32], "Manic genius of stand-up and screen; the late, beloved improviser.", "Robin Williams");

  /* --- Icons, Influencers & Treasures --- */
  C("Greta Thunberg",     "Icons & Influencers", "e7", ["environment","foreign","leader"],[72,16,72,38,40], "Swedish schoolgirl whose strike became a global climate movement.", "Greta Thunberg");
  C("Malala Yousafzai",   "Icons & Influencers", "e7", ["education","foreign","leader"],[80,22,72,46,40], "Survived a Taliban bullet to become the youngest Nobel laureate.", "Malala Yousafzai");
  C("Marcus Rashford",    "Icons & Influencers", "e7", ["health","education","work"],[78,16,60,32,34], "England striker who shamed the government into feeding hungry children.", "Marcus Rashford");
  C("Mary Berry",         "Icons & Influencers", "e6", ["culture","education"],[78,36,62,40,38], "The queen of baking; 'Bake Off' matriarch and national treasure.", "Mary Berry");
  C("Gordon Ramsay",      "Icons & Influencers", "e7", ["business","culture"],[68,28,66,40,40], "Michelin-starred chef and ferociously sweary TV host.", "Gordon Ramsay");
  C("Martin Lewis",       "Icons & Influencers", "e7", ["chancellor","business","education"],[76,30,68,52,42], "The Money Saving Expert; the nation's trusted financial conscience.", "Martin Lewis");
  C("Joanna Lumley",      "Icons & Influencers", "e6", ["foreign","culture","leader"],[80,38,72,48,40], "Absolutely Fabulous actress who won the Gurkhas the right to settle.", "Joanna Lumley");
  C("Michael Palin",      "Icons & Influencers", "e6", ["foreign","transport","culture"],[82,40,72,48,40], "Python turned the nation's favourite globe-trotting traveller.", "Michael Palin");
  C("Brian Cox",          "Icons & Influencers", "e7", ["education","environment"],[78,30,68,52,36], "Pop-star-turned-physicist; the smiling face of TV science.", "Brian Cox (physicist)");
  C("Mr Beast",           "YouTube & Internet", "e7", ["business","culture"], [76,12,54,34,32], "The world's biggest YouTuber; stunts, giveaways and philanthropy at scale.", "MrBeast");
  C("KSI",                "YouTube & Internet", "e7", ["culture","business"], [70,12,58,28,30], "YouTuber, boxer and Prime drinks entrepreneur.", "KSI");
  C("Joe Wicks",          "YouTube & Internet", "e7", ["health","education"], [74,14,58,30,32], "'The Body Coach' who kept the locked-down nation exercising.", "Joe Wicks");

  /* --- Tech & Tycoons (more) --- */
  C("Larry Page",         "Tech & Tycoons", "e7", ["business","education"],   [56,30,48,54,34], "Google co-founder whose search engine reorganised the world's information.", "Larry Page");
  C("Sergey Brin",        "Tech & Tycoons", "e7", ["business","education"],   [56,30,48,54,34], "Google co-founder and moonshot enthusiast.", "Sergey Brin");
  C("Sundar Pichai",      "Tech & Tycoons", "e7", ["business","chancellor"],  [58,38,54,58,44], "Soft-spoken Alphabet and Google chief executive.", "Sundar Pichai");
  C("Satya Nadella",      "Tech & Tycoons", "e7", ["business","chancellor"],  [62,40,58,62,46], "Microsoft CEO who turned the ship toward cloud and AI.", "Satya Nadella");
  C("Oprah Winfrey",      "Tech & Tycoons", "e6", ["culture","education","leader"],[86,42,82,52,44], "Talk-show titan and media mogul; once touted as a presidential hopeful.", "Oprah Winfrey");
  C("Rupert Murdoch",     "Tech & Tycoons", "e6", ["business","culture"],     [50,52,56,60,46], "Media baron whose empire reshaped politics on three continents.", "Rupert Murdoch");
  C("George Soros",       "Tech & Tycoons", "e6", ["chancellor","foreign","business"],[54,48,58,64,40], "Investor who 'broke the Bank of England'; liberal mega-philanthropist.", "George Soros");

  /* --- Pulpit & Punditry (more) --- */
  C("Greta Gerwig",       "Stage & Screen", "e7", ["culture","education"],    [74,22,68,40,34], "Writer-director of 'Lady Bird' and the billion-dollar 'Barbie'.", "Greta Gerwig");
  C("Piers Morgan",       "Pulpit & Punditry", "e7", ["culture","leader"],    [56,30,72,30,28], "Combative broadcaster and serial controversialist.", "Piers Morgan");
  C("Jeremy Clarkson",    "Pulpit & Punditry", "e6", ["transport","environment","culture"],[64,32,70,30,30], "Top Gear motormouth turned Cotswolds farmer and tabloid columnist.", "Jeremy Clarkson");
  C("Jordan Peterson",    "Pulpit & Punditry", "e7", ["education","culture"], [56,30,72,38,26], "Canadian psychologist and lightning-rod of the culture wars.", "Jordan Peterson");
  C("Louis Theroux",      "Pulpit & Punditry", "e7", ["culture","justice"],   [74,26,66,42,32], "Awkwardly brilliant documentary-maker of the strange and the dark.", "Louis Theroux");

  /* Register PHOTO wiki hints already handled inline; nothing else to wire. */
})();

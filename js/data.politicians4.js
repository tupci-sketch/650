/* ============================================================
   650 — POLITICIANS EXPANSION IV
   Brings each playable country to ~100 politicians.
   US, Germany, France, Australia, Canada, Japan, India,
   Soviet Union/Russia, China, North Korea, Cuba.
   All scope:"wild" — appear in wildcard and country-specific modes.
   ============================================================= */
window.G = window.G || {};
(function () {
  var G = window.G;
  var existing = {};
  (G.POLITICIANS || []).forEach(function (p) { existing[p.name + "|" + (p.scope || "uk")] = 1; });

  function I(name, party, era, fits, s, note) {
    if (existing[name + "|wild"]) return;
    existing[name + "|wild"] = 1;
    var fig = {
      name: name, party: party, era: era, fits: fits,
      stats: { appeal: s[0], experience: s[1], oratory: s[2], statecraft: s[3], partyMgmt: s[4] },
      note: note, scope: "wild"
    };
    (G.POLITICIANS = G.POLITICIANS || []).push(fig);
  }

  /* ════════════════════════════════════════════════════════
     UNITED STATES — bring total to ~100
     Parties: "Republican (USA)", "Democrat (USA)", "Federalist",
              "Whig (USA)", "Progressive (USA)", "Bull Moose"
     ════════════════════════════════════════════════════════ */

  /* Founding & Early Republic */
  I("George Washington",    "Federalist",       "e1", ["pm","defence","foreign"],   [88,82,72,84,80], "Commander-in-Chief and first US President; presided over the Constitutional Convention.");
  I("Thomas Jefferson",     "Democrat (USA)",   "e1", ["pm","foreign","leader"],    [80,76,82,80,68], "Drafter of the Declaration of Independence; 3rd President and founder of the Democratic-Republican Party.");
  I("Alexander Hamilton",   "Federalist",       "e1", ["chancellor","foreign","leader"],[76,70,80,82,72], "First Secretary of the Treasury; co-author of The Federalist Papers.");
  I("John Quincy Adams",    "Democrat (USA)",   "e2", ["pm","foreign","leader"],    [62,80,66,72,54], "6th President; son of John Adams; later an impassioned anti-slavery congressman.");
  I("Andrew Johnson",       "Democrat (USA)",   "e1", ["pm","leader"],              [46,64,52,48,44], "17th President; succeeded Lincoln; impeached by Congress over Reconstruction clashes.");
  I("Ulysses S. Grant",     "Republican (USA)", "e1", ["pm","defence"],             [64,72,54,62,52], "Commanding General of the Union Army; 18th President; championed Reconstruction.");
  I("Grover Cleveland",     "Democrat (USA)",   "e1", ["pm","leader"],              [56,72,54,64,60], "22nd and 24th President — the only president to serve non-consecutive terms.");
  I("Benjamin Harrison",    "Republican (USA)", "e1", ["pm","foreign"],             [50,64,54,58,52], "23rd President; expanded the navy; introduced the McKinley Tariff.");
  I("Woodrow Wilson",       "Democrat (USA)",   "e2", ["pm","foreign","leader"],    [72,78,80,72,66], "28th President; led the US in WWI; architect of the League of Nations.");
  I("Harry S. Truman",      "Democrat (USA)",   "e3", ["pm","defence","foreign"],   [70,80,68,78,72], "33rd President; ended WWII; launched the Marshall Plan and NATO; the Buck stops here.");
  I("Gerald Ford",          "Republican (USA)", "e5", ["pm","leader"],              [54,74,52,60,62], "38th President; the only president never elected to the White House or vice-presidency.");
  I("Jimmy Carter",         "Democrat (USA)",   "e5", ["pm","foreign","leader"],    [62,70,62,60,58], "39th President; Camp David Accords; later a Nobel Peace laureate and global humanitarian.");
  I("Dan Quayle",           "Republican (USA)", "e6", ["deputy","leader"],          [44,52,42,46,48], "Vice President under George H. W. Bush; became a byword for political gaffes.");
  I("Walter Mondale",       "Democrat (USA)",   "e5", ["deputy","foreign","leader"],[60,78,62,64,66], "Vice President under Carter; 1984 Democratic nominee; lost 49 states.");
  I("Hubert Humphrey",      "Democrat (USA)",   "e4", ["deputy","health","leader"], [74,76,80,68,72], "Lyndon Johnson's VP; champion of civil rights and the Great Society.");
  I("Bob Dole",             "Republican (USA)", "e6", ["leader","chancellor"],      [60,88,58,64,68], "Senate Majority Leader; 1996 Republican presidential nominee; WWII veteran.");
  I("Newt Gingrich",        "Republican (USA)", "e6", ["leader","business"],        [62,70,72,58,74], "Speaker of the House behind the 1994 Republican Revolution; Contract with America.");
  I("Nancy Pelosi",         "Democrat (USA)",   "e7", ["leader","whip"],            [62,90,62,72,82], "First female Speaker of the House; navigated Clinton's impeachment and Biden's agenda.");
  I("Mitch McConnell",      "Republican (USA)", "e7", ["leader","whip"],            [38,88,36,68,86], "Senate Majority/Minority Leader for decades; master of procedural obstruction.");
  I("Paul Ryan",            "Republican (USA)", "e7", ["leader","chancellor"],      [58,64,62,64,62], "Speaker of the House under Trump; architect of Republican tax reform.");
  I("Chuck Schumer",        "Democrat (USA)",   "e7", ["leader","whip"],            [54,82,60,64,76], "Senate Majority Leader; New York's long-serving senior senator.");
  I("Mitt Romney",          "Republican (USA)", "e6", ["pm","business","leader"],   [64,74,64,66,62], "Governor of Massachusetts; 2012 presidential nominee; later the conscience of Senate Republicans.");
  I("Sarah Palin",          "Republican (USA)", "e7", ["deputy","leader"],          [66,44,68,40,52], "Alaska Governor and John McCain's 2008 running mate; rallied the Tea Party base.");
  I("Ron DeSantis",         "Republican (USA)", "e7", ["pm","leader","home"],       [58,54,54,56,62], "Governor of Florida; 2024 presidential candidate; culture-war conservative.");
  I("Ted Cruz",             "Republican (USA)", "e7", ["leader","justice"],         [46,60,58,50,52], "Texas senator; twice ran for president; champion of constitutional conservatism.");
  I("Marco Rubio",          "Republican (USA)", "e7", ["foreign","leader"],         [60,58,66,60,56], "Florida senator; ran in 2016 primaries; later Secretary of State under Trump.");
  I("Nikki Haley",          "Republican (USA)", "e7", ["foreign","leader","deputy"],[68,58,66,62,58], "Governor of South Carolina; UN Ambassador; 2024 presidential candidate.");
  I("JD Vance",             "Republican (USA)", "e7", ["deputy","leader","business"],[60,42,60,50,58], "Author of Hillbilly Elegy; Ohio senator; Trump's 2024 running mate and VP.");
  I("Pete Buttigieg",       "Democrat (USA)",   "e7", ["deputy","business","leader"],[70,46,72,60,60], "Mayor of South Bend; first major LGBTQ+ presidential candidate; Transportation Secretary.");
  I("Alexandria Ocasio-Cortez","Democrat (USA)","e7", ["leader","environment","education"],[78,38,84,52,58], "Youngest congresswoman elected; co-sponsor of the Green New Deal; the 'AOC' phenomenon.");
  I("Bernie Sanders",       "Democrat (USA)",   "e7", ["leader","health","chancellor"],[74,82,80,64,54], "Vermont senator; twice ran for president on democratic-socialist platform.");
  I("Elizabeth Warren",     "Democrat (USA)",   "e7", ["leader","chancellor","business"],[68,74,72,70,62], "Harvard law professor turned senator; champion of consumer protection and anti-monopoly.");
  I("William Henry Harrison","Whig (USA)",      "e1", ["pm","defence"],             [52,62,54,50,52], "9th President — died 31 days into office; the shortest presidency in US history.");
  I("Zachary Taylor",       "Whig (USA)",       "e1", ["pm","defence"],             [54,64,46,54,48], "Mexican-American War hero; 12th President; died in office after 16 months.");
  I("Millard Fillmore",     "Whig (USA)",       "e1", ["pm","leader"],              [42,56,44,48,46], "13th President; assumed office on Taylor's death; signed the Compromise of 1850.");
  I("Franklin Pierce",      "Democrat (USA)",   "e1", ["pm","leader"],              [46,58,52,48,44], "14th President; the Kansas-Nebraska Act brought the nation closer to civil war.");
  I("James Buchanan",       "Democrat (USA)",   "e1", ["pm","foreign"],             [44,68,50,42,46], "15th President; his inaction in the secession crisis paved the way for civil war.");
  I("Chester Arthur",       "Republican (USA)", "e1", ["pm","home"],               [50,60,52,58,52], "21st President; surprised critics with civil service reform despite a machine-politics past.");
  I("William H. Taft",      "Republican (USA)", "e2", ["pm","justice"],             [48,78,44,64,52], "27th President and Chief Justice; the only man to hold both offices.");
  I("Calvin Coolidge",      "Republican (USA)", "e2", ["pm","business","chancellor"],[50,72,44,58,56], "30th President; 'Silent Cal'; the Roaring Twenties prosperity and hands-off government.");
  I("Adlai Stevenson II",   "Democrat (USA)",   "e4", ["leader","foreign"],         [70,74,80,66,58], "Two-time Democratic presidential nominee; eloquent intellectual; UN Ambassador.");

  /* ════════════════════════════════════════════════════════
     GERMANY — bring total to ~100
     Parties: CDU/CSU, SPD (DE), FDP, Greens (DE), AfD,
              Die Linke, NSDAP, KPD, Zentrum, SED (DE),
              DNVP, DVP, DDP, BSW
     ════════════════════════════════════════════════════════ */

  /* Weimar Republic */
  I("Friedrich Ebert",       "SPD (DE)",        "e2", ["pm","leader","chancellor"], [64,72,68,64,72], "First President of the Weimar Republic; trade union leader who steered Germany through defeat and revolution.");
  I("Paul von Hindenburg",   "DNVP",            "e3", ["pm","defence","leader"],    [58,80,50,56,52], "WWI field marshal; President 1925–34; fatefully appointed Hitler as Chancellor.");
  I("Kurt Georg Kiesinger",  "CDU/CSU",         "e4", ["pm","chancellor","foreign"],[58,78,62,64,60], "Grand coalition Chancellor 1966–69; once a member of the Nazi party, which haunted him.");
  I("Walter Ulbricht",       "SED (DE)",        "e4", ["pm","leader"],             [44,74,44,48,72], "Long-serving head of East Germany; built the Berlin Wall in 1961.");
  I("Erich Honecker",        "SED (DE)",        "e5", ["pm","leader","home"],      [42,76,38,42,70], "East German General Secretary 1971–89; fell with the Wall he ordered built.");
  I("Egon Krenz",            "SED (DE)",        "e5", ["pm","leader"],             [38,60,36,38,54], "Honecker's short-lived successor; opened the Berlin Wall and soon lost power.");
  I("Lothar de Maizière",    "CDU/CSU",         "e6", ["pm","leader"],             [52,54,56,60,52], "Last Prime Minister of East Germany; negotiated reunification.");
  I("Hans Modrow",           "SED (DE)",        "e6", ["pm","leader","chancellor"],[48,68,50,52,60], "Reform-minded East German PM who tried to steer an orderly transition.");
  I("Franz Josef Strauss",   "CDU/CSU",         "e5", ["chancellor","defence","leader"],[62,80,72,68,74], "Bavarian CSU titan; Defence Minister; long-serving Finance Minister; 1980 Chancellor candidate.");
  I("Edmund Stoiber",        "CDU/CSU",         "e6", ["pm","leader","chancellor"],[58,72,60,62,68], "Bavarian Minister-President; lost the 2002 Chancellor race to Schröder by the narrowest margin.");
  I("Horst Seehofer",        "CDU/CSU",         "e7", ["pm","home","leader"],      [52,74,52,54,62], "Bavarian PM and federal Interior Minister; polarising figure on migration.");
  I("Markus Söder",          "CDU/CSU",         "e7", ["pm","chancellor","leader"],[64,68,66,64,66], "Bavarian Minister-President; perpetual contender for the CDU/CSU Chancellor candidacy.");
  I("Hans-Dietrich Genscher","FDP",             "e5", ["foreign","deputy","leader"],[74,88,72,80,72], "West Germany's long-serving Foreign Minister; architect of Ostpolitik-era détente.");
  I("Walter Scheel",         "FDP",             "e5", ["foreign","pm","leader"],   [62,74,66,66,62], "FDP leader; Foreign Minister; President of West Germany 1974–79.");
  I("Guido Westerwelle",     "FDP",             "e6", ["foreign","deputy","leader"],[56,66,60,58,60], "FDP leader and Foreign Minister; Germany's first openly gay Foreign Minister.");
  I("Christian Lindner",     "FDP",             "e7", ["chancellor","business","leader"],[60,56,66,58,62], "FDP leader who collapsed the 2021–24 coalition; polarising market-liberal.");
  I("Petra Kelly",           "Greens (DE)",     "e5", ["leader","environment"],    [72,60,74,62,60], "Co-founder of the German Greens; anti-nuclear activist and pacifist icon.");
  I("Otto Schily",           "Greens (DE)",     "e6", ["home","justice","leader"],  [54,72,60,64,58], "Former Greens MP who switched to SPD; tough Interior Minister under Schröder.");
  I("Annalena Baerbock",     "Greens (DE)",     "e7", ["foreign","leader","environment"],[66,52,68,60,62], "Greens co-leader and 2021 Chancellor candidate; Foreign Minister from 2021.");
  I("Alice Weidel",          "AfD",             "e7", ["chancellor","business","leader"],[54,52,58,50,66], "AfD parliamentary leader and co-leader; economist; led the party into government negotiations.");
  I("Alexander Gauland",     "AfD",             "e7", ["leader","home"],           [52,68,56,48,70], "AfD co-founder; his 'bird shot' remark about German history caused an outcry.");
  I("Gregor Gysi",           "Die Linke",       "e6", ["leader","justice","chancellor"],[72,74,82,66,74], "East German turned Left Party leader; one of the Bundestag's most brilliant debaters.");
  I("Sahra Wagenknecht",     "BSW",             "e7", ["leader","chancellor","business"],[66,64,74,60,62], "Left-wing populist who split from Die Linke to found her own BSW party in 2024.");
  I("Otto von Bismarck",     "DNVP",            "e1", ["pm","foreign","leader","chancellor"],[72,94,68,90,86], "Iron Chancellor; unified Germany; architect of the welfare state and realpolitik.");
  I("Kaiser Wilhelm II",     "DNVP",            "e2", ["pm","defence","foreign"],  [44,62,50,34,40], "German Emperor who led the country into WWI; abdicated 1918.");
  I("Wilhelm Pieck",         "SED (DE)",        "e4", ["pm","leader"],             [50,76,54,52,66], "Co-founder of the SED; first and only President of East Germany.");
  I("Rosa Luxemburg",        "KPD",             "e2", ["leader","chancellor"],     [72,66,84,64,58], "Marxist theorist and KPD co-founder; murdered in the 1919 Spartacist uprising.");
  I("Ernst Thälmann",        "KPD",             "e3", ["leader"],                  [58,62,64,44,68], "KPD leader; refused to ally with Social Democrats against Hitler; murdered in Buchenwald.");
  I("Ludwig Erhard",         "CDU/CSU",         "e4", ["chancellor","business","pm"],[68,78,62,80,62], "Father of the German economic miracle; CDU's first Economics Minister; Chancellor 1963–66.");
  I("Willi Brandt",          "SPD (DE)",        "e4", ["pm","foreign","leader","chancellor"],[76,78,78,76,72], "Chancellor 1969–74; Ostpolitik; knelt in Warsaw — awarded Nobel Peace Prize.");
  I("Rudolf Scharping",      "SPD (DE)",        "e6", ["leader","defence","chancellor"],[52,66,54,54,58], "SPD chair defeated by Schröder; Defence Minister during Kosovo intervention.");
  I("Franz Müntefering",     "SPD (DE)",        "e6", ["deputy","leader","work"],  [60,72,62,60,68], "SPD Chair and 'Party engine'; coined 'locusts' for private equity funds.");
  I("Sigmar Gabriel",        "SPD (DE)",        "e7", ["deputy","foreign","chancellor"],[62,68,64,62,64], "SPD chair; served as Foreign Minister; erratic but charismatic.");
  I("Martin Schulz",         "SPD (DE)",        "e7", ["leader","chancellor","foreign"],[60,70,64,58,56], "Former President of the European Parliament; ran against Merkel in 2017.");
  I("Andrea Nahles",         "SPD (DE)",        "e7", ["leader","work","chancellor"],[58,62,60,58,60], "SPD leader who led the party to its worst post-war results before resignation.");
  I("Saskia Esken",          "SPD (DE)",        "e7", ["leader","education"],      [52,56,54,50,58], "SPD co-chair on the left of the party; pushed back against Scholz.");
  I("Kurt Schumacher",       "SPD (DE)",        "e4", ["leader","chancellor"],     [62,72,76,62,70], "Rebuilt the SPD after Nazi persecution; fierce advocate for democratic socialism.");
  I("Philipp Scheidemann",   "SPD (DE)",        "e2", ["pm","leader","chancellor"],[60,70,64,58,62], "Proclaimed the German Republic in 1918; first Chancellor of the Weimar Republic.");
  I("Matthias Erzberger",    "Zentrum",         "e2", ["chancellor","foreign"],    [54,66,56,58,52], "Signed the Armistice; assassinated by right-wing extremists in 1921.");
  I("Heinrich Müller",       "NSDAP",           "e3", ["home","justice"],          [24,56,26,22,60], "Head of the Gestapo; disappeared at the end of WWII — never found.");
  I("Albert Speer",          "NSDAP",           "e3", ["chancellor","business"],   [48,56,44,46,52], "Hitler's architect and Armaments Minister; convicted at Nuremberg but released.");
  I("Theodor Heuss",         "FDP",             "e4", ["pm","leader","education"], [68,76,72,68,62], "First President of West Germany; symbol of democratic renewal.");
  I("Helmut Kohl",           "CDU/CSU",         "e5", ["pm","foreign","leader","chancellor"],[68,86,62,78,80], "Chancellor of German unity 1982–98; oversaw reunification and deeper European integration.");
  I("Friedrich Merz",        "CDU/CSU",         "e7", ["leader","chancellor","business"],[60,66,64,62,62], "CDU leader from 2022; won 2025 election; tough-talking conservative on migration and economy.");
  I("Karl Lauterbach",       "SPD (DE)",        "e7", ["health","leader","education"],[52,62,54,54,50], "Health Minister under Scholz; epidemiologist; became a fixture of pandemic debates.");
  I("Wolfgang Schäuble",     "CDU/CSU",         "e6", ["chancellor","home","leader"],[60,88,58,72,70], "Germany's longest-serving Bundestag member; Finance Minister during Eurozone crisis; Bundestag President.");
  I("Peter Struck",          "SPD (DE)",        "e6", ["defence","leader","whip"], [58,68,60,64,68], "SPD parliamentary leader; Defence Minister who said Germany's security is defended in the Hindu Kush.");
  I("Joschka Fischer",       "Greens (DE)",     "e6", ["foreign","deputy","leader"],[70,72,74,70,66], "Greens leader and Foreign Minister; sent German troops to Kosovo; arch-pragmatist of the left.");
  I("Friedrich Naumann",     "FDP",             "e2", ["leader","education"],      [60,66,68,60,58], "Liberal politician and intellectual; the FDP's founding philosophical godfather.");

  /* ════════════════════════════════════════════════════════
     FRANCE — bring total to ~100
     Parties: "Parti Socialiste", "RPR", "LREM"/"Ensemble",
              "Les Républicains", "Rassemblement National",
              "La France Insoumise", "Parti Communiste",
              "Radical (FR)", "SFIO (FR)", "MRP (FR)",
              "Gaulliste (FR)", "UMP"
     ════════════════════════════════════════════════════════ */

  /* Third & Fourth Republics */
  I("Aristide Briand",       "Radical (FR)",    "e2", ["pm","foreign","leader"],   [72,82,76,72,68], "Eleven-time Premier; Nobel Peace laureate; co-architect of the Locarno Treaties.");
  I("Raymond Poincaré",      "Radical (FR)",    "e2", ["pm","chancellor","foreign"],[62,80,64,66,68], "President during WWI; austere Finance Minister who stabilised the franc.");
  I("Édouard Herriot",       "Radical (FR)",    "e2", ["pm","chancellor","leader"],[64,76,70,64,66], "Radical-Socialist leader; three-time PM; strong advocate of Franco-Soviet rapprochement.");
  I("Édouard Daladier",      "Radical (FR)",    "e3", ["pm","defence","leader"],   [56,74,58,54,60], "Premier who signed the Munich Agreement; later a prisoner of Vichy and the Nazis.");
  I("Paul Reynaud",          "Radical (FR)",    "e3", ["pm","chancellor","foreign"],[62,72,66,60,58], "Last Premier of the Third Republic; sought to continue the fight — overruled and arrested.");
  I("Pierre Laval",          "Radical (FR)",    "e3", ["pm","foreign","chancellor"],[48,72,54,44,52], "Twice Premier; Vichy's most powerful minister; tried and executed for treason 1945.");
  I("Philippe Pétain",       "Gaulliste (FR)",  "e3", ["pm","defence","leader"],   [52,82,54,42,54], "WWI hero who led the Vichy regime; convicted of treason; died in prison.");
  I("Léon Blum",             "SFIO (FR)",       "e3", ["pm","chancellor","leader"], [70,78,74,66,68], "First socialist and first Jewish PM of France; led the Popular Front 1936–37.");
  I("Pierre Mendès France",  "Radical (FR)",    "e4", ["pm","chancellor","foreign"],[72,76,76,72,62], "Reforming PM 1954–55; ended France in Indochina; a model of political honesty.");
  I("Guy Mollet",            "SFIO (FR)",       "e4", ["pm","leader","foreign"],   [54,70,58,54,62], "Socialist PM; deepened Algeria War involvement; signed the Treaty of Rome.");
  I("Vincent Auriol",        "SFIO (FR)",       "e4", ["pm","leader","justice"],   [60,72,64,60,64], "First President of the Fourth Republic; socialist elder statesman.");
  I("René Coty",             "MRP (FR)",        "e4", ["pm","leader"],             [54,70,56,58,56], "Last President of the Fourth Republic; invited de Gaulle to form the Fifth.");
  I("René Pleven",           "Radical (FR)",    "e4", ["pm","defence","foreign"],  [52,68,54,56,54], "Founded the European Defence Community; twice PM of the Fourth Republic.");
  I("Maurice Thorez",        "Parti Communiste","e4", ["leader","chancellor"],     [58,74,62,52,72], "PCF General Secretary for decades; led French Communists through Stalin era.");
  I("Georges Bidault",       "MRP (FR)",        "e4", ["pm","foreign","leader"],   [56,72,60,58,60], "Resistance hero; Foreign Minister; key figure in both the Fourth Republic and European construction.");

  /* Fifth Republic */
  I("Michel Debré",          "Gaulliste (FR)",  "e4", ["pm","justice","leader"],   [56,74,60,62,64], "De Gaulle's first PM; chief drafter of the Fifth Republic constitution.");
  I("Maurice Couve de Murville","Gaulliste (FR)","e4", ["pm","foreign","chancellor"],[52,78,50,64,58], "De Gaulle's Foreign Minister for a decade; PM during May 1968.");
  I("Jacques Chaban-Delmas", "Gaulliste (FR)",  "e5", ["pm","leader"],             [64,74,66,62,60], "PM 1969–72; 'New Society' programme; thrice ran for president.");
  I("Pierre Messmer",        "Gaulliste (FR)",  "e5", ["pm","defence","leader"],   [50,72,52,56,54], "De Gaulle's Defence Minister; last Gaullist PM before Giscard era.");
  I("Raymond Barre",         "UMP",             "e5", ["pm","chancellor","business"],[58,78,54,66,54], "PM under Giscard; austere economist; 'the best economist in French politics'.");
  I("Pierre Mauroy",         "Parti Socialiste","e5", ["pm","leader","chancellor"],[58,72,62,60,66], "First PM under Mitterrand; abolished the death penalty; tried and reversed nationalisations.");
  I("Laurent Fabius",        "Parti Socialiste","e5", ["pm","chancellor","foreign"],[58,80,62,64,60], "France's youngest PM at 37; later Foreign Minister and President of COP21.");
  I("Michel Rocard",         "Parti Socialiste","e5", ["pm","chancellor","leader"],[66,76,68,68,62], "PM 1988–91; pragmatic social democrat; introduced the RMI minimum income.");
  I("Édith Cresson",         "Parti Socialiste","e6", ["pm","business","leader"],  [60,66,62,56,52], "France's first and only female Prime Minister; her year in office was turbulent.");
  I("Pierre Bérégovoy",      "Parti Socialiste","e6", ["pm","chancellor","leader"],[52,72,54,60,58], "Finance Minister who tamed inflation; PM 1992–93; tragically took his own life.");
  I("Édouard Balladur",      "RPR",             "e6", ["pm","chancellor","leader"],[58,78,56,66,60], "PM 1993–95 in cohabitation; Chirac's ally turned rival in the 1995 election.");
  I("Alain Juppé",           "RPR",             "e6", ["pm","foreign","chancellor"],[58,80,58,64,58], "PM 1995–97; his pension reforms triggered the big strikes; later Foreign Minister.");
  I("Lionel Jospin",         "Parti Socialiste","e6", ["pm","leader","chancellor"],[66,76,68,68,64], "PM 1997–2002 in cohabitation; conducted privatisations and the 35-hour week.");
  I("Jean-Pierre Raffarin",  "UMP",             "e6", ["pm","chancellor","leader"],[50,64,48,54,56], "PM 2002–05; tried and failed to pass the EU constitution referendum.");
  I("Dominique de Villepin", "UMP",             "e6", ["pm","foreign","leader"],   [64,72,68,66,58], "PM 2005–07; his UN speech against the Iraq War made him a global figure.");
  I("François Fillon",       "Les Républicains","e7", ["pm","chancellor","leader"],[54,78,54,64,58], "PM under Sarkozy; 2017 presidential frontrunner until his 'Penelope Gate' expenses scandal.");
  I("Manuel Valls",          "Parti Socialiste","e7", ["pm","home","leader"],      [58,62,62,58,56], "PM 2014–16; tough-talking Interior then PM; stood against Mélenchon's hard-left turn.");
  I("Ségolène Royal",        "Parti Socialiste","e7", ["leader","pm","environment"],[68,66,72,60,58], "2007 Socialist presidential candidate; first woman to reach a French presidential runoff.");
  I("Martine Aubry",         "Parti Socialiste","e7", ["leader","work","pm"],      [60,68,62,60,64], "PS First Secretary; introduced the 35-hour week as Labour Minister; ran against Hollande for nomination.");
  I("Anne Hidalgo",          "Parti Socialiste","e7", ["pm","leader","environment"],[58,62,62,56,54], "Paris Mayor; 2022 Socialist presidential candidate; European Cities Network advocate.");
  I("Jean-Marie Le Pen",     "Rassemblement National","e5",["leader"],            [62,76,66,44,66], "Far-right National Front founder; reached the 2002 presidential runoff — a political earthquake.");
  I("Jordan Bardella",       "Rassemblement National","e7",["pm","leader","chancellor"],[62,40,66,50,62], "Marine Le Pen's protégé; RN president; PM designate after 2024 legislative surprise.");
  I("Éric Zemmour",          "Gaulliste (FR)",  "e7", ["leader","home","justice"],  [56,52,64,46,50], "Far-right polemicist and TV pundit; ran for president 2022 on 'Reconquête'.");
  I("Christiane Taubira",    "Parti Socialiste","e7", ["justice","leader","foreign"],[66,64,70,60,54], "Justice Minister who introduced equal marriage; briefly ran for president 2022.");
  I("Valérie Pécresse",      "Les Républicains","e7", ["pm","chancellor","leader"],[52,62,52,56,54], "Île-de-France President; Les Républicains' 2022 presidential candidate.");
  I("Élisabeth Borne",       "Ensemble",        "e7", ["pm","work","environment"], [52,64,48,58,54], "PM under Macron 2022–24; first woman PM since Cresson; narrowly survived confidence votes.");
  I("Gabriel Attal",         "Ensemble",        "e7", ["pm","education","chancellor"],[68,46,72,58,60], "Youngest ever French PM (2024); star of Macron's 'renaissance' generation.");
  I("Michel Barnier",        "Les Républicains","e7", ["pm","foreign","chancellor"],[58,86,56,66,58], "Former EU chief Brexit negotiator; PM 2024; fell after three months via no-confidence vote.");
  I("François Bayrou",       "Ensemble",        "e7", ["pm","leader","education"], [58,74,62,60,58], "Centrist MoDem leader; PM from 2025 after Barnier fell; Macron's close ally.");

  /* ════════════════════════════════════════════════════════
     AUSTRALIA — bring total to ~100
     Parties: "Australian Labor Party", "Liberal (AU)", "National (AU)",
              "Greens (AU)", "Country Party (AU)"
     ════════════════════════════════════════════════════════ */

  I("Edmund Barton",         "Liberal (AU)",    "e2", ["pm","justice","leader"],   [62,68,66,64,60], "Australia's first Prime Minister 1901–03; led the federation movement.");
  I("Andrew Fisher",         "Australian Labor Party","e2",["pm","chancellor","leader"],[60,70,62,62,64], "Three-time ALP PM; pushed through key social reforms and supported WWI 'to the last man'.");
  I("Billy Hughes",          "Australian Labor Party","e2",["pm","foreign","leader"],[66,74,68,62,58], "PM during WWI; controversially left Labor over conscription; formed coalition; negotiated at Versailles.");
  I("Stanley Bruce",         "Liberal (AU)",    "e2", ["pm","foreign","leader"],   [52,70,52,60,56], "PM 1923–29; first PM to lose his own seat at a general election.");
  I("James Scullin",         "Australian Labor Party","e3",["pm","chancellor","leader"],[56,70,60,54,60], "First Catholic ALP PM; struggled through the Great Depression with a hostile Senate.");
  I("Joseph Lyons",          "Liberal (AU)",    "e3", ["pm","chancellor","leader"], [58,72,60,62,60], "Former ALP treasurer who crossed the floor; PM 1932–39; died in office.");
  I("John Curtin",           "Australian Labor Party","e3",["pm","defence","leader"],[66,72,68,68,68], "PM who pivoted Australia toward the US and away from Britain in WWII; died in office 1945.");
  I("Scott Morrison",        "Liberal (AU)",    "e7", ["pm","business","chancellor"],[56,56,54,50,58], "PM 2018–22; Covid management and sports rorts; lost 2022 to Albanese.");
  I("Anthony Albanese",      "Australian Labor Party","e7",["pm","leader","deputy"],[64,68,64,62,62], "ALP leader from 2019; PM from 2022; ended nine years of Conservative government.");
  I("Peter Dutton",          "Liberal (AU)",    "e7", ["pm","home","leader"],       [50,64,48,52,58], "Former Police officer; Home Affairs Minister; Liberal leader from 2022.");
  I("Barnaby Joyce",         "National (AU)",   "e7", ["deputy","pm","business"],  [52,58,54,50,54], "Nationals leader and twice Deputy PM; controversy and resignation became a political story.");
  I("Julie Bishop",          "Liberal (AU)",    "e7", ["foreign","deputy","leader"],[68,68,68,66,60], "Australia's first female Foreign Affairs Minister; ran for Liberal leadership in 2018.");
  I("Christopher Pyne",      "Liberal (AU)",    "e7", ["education","defence","leader"],[58,62,56,56,60], "Long-serving Liberal minister; Education then Defence Secretary; called a 'fixer'.");
  I("Wayne Swan",            "Australian Labor Party","e7",["chancellor","business","deputy"],[58,68,56,62,60], "Treasurer who steered Australia through the GFC without recession; World's Best Finance Minister award.");
  I("Bill Shorten",          "Australian Labor Party","e7",["pm","leader","work"],  [56,64,58,56,60], "ALP leader 2013–19; twice almost PM; lost 2016 and 2019 as favourite.");
  I("Mark Latham",           "Australian Labor Party","e6",["pm","leader","education"],[56,56,60,50,46], "ALP leader 2003–05; lost 2004 election; later drifted to far-right populism.");
  I("Kim Beazley",           "Australian Labor Party","e6",["pm","leader","defence"],[58,74,58,60,62], "ALP leader twice; lost two elections; later Ambassador to the US.");
  I("Simon Crean",           "Australian Labor Party","e6",["leader","trade","business"],[52,68,52,56,58], "ALP leader 2001–03; backed Hawke-era reforms; trade union movement figure.");
  I("Andrew Peacock",        "Liberal (AU)",    "e5", ["pm","foreign","leader"],   [64,72,66,60,60], "Twice Liberal leader; lost the 1984 and 1990 elections; notable bon vivant.");
  I("John Hewson",           "Liberal (AU)",    "e6", ["pm","leader","chancellor"],[56,60,56,56,52], "Liberal leader who lost the 'unlosable election' in 1993; Fightback! GST package undid him.");
  I("Alexander Downer",      "Liberal (AU)",    "e6", ["foreign","leader","deputy"],[56,72,56,62,58], "Longest-serving Foreign Minister; Liberal leader briefly before Howard.");
  I("Tim Fischer",           "National (AU)",   "e6", ["deputy","pm","foreign"],   [56,66,52,58,58], "National Party leader and Deputy PM under Howard; pushed through gun control after Port Arthur.");
  I("Mark Vaile",            "National (AU)",   "e6", ["deputy","business","trade"],[48,60,46,52,52], "National leader and Deputy PM; negotiated the US-Australia Free Trade Agreement.");
  I("Warren Truss",          "National (AU)",   "e7", ["deputy","business","environment"],[46,62,44,52,52], "Nationals leader and Deputy PM 2013–16 under Abbott and Turnbull.");
  I("Penny Wong",            "Australian Labor Party","e7",["foreign","chancellor","leader"],[72,68,70,70,64], "Finance then Foreign Minister; first woman to lead the government in the Senate; openly gay.");
  I("Richard Marles",        "Australian Labor Party","e7",["deputy","defence","foreign"],[56,56,56,58,56], "Deputy PM and Defence Minister under Albanese.");
  I("Jim Chalmers",          "Australian Labor Party","e7",["chancellor","business","leader"],[60,54,60,60,56], "Treasurer under Albanese; former Kevin Rudd staffer; economist-politician.");
  I("Tanya Plibersek",       "Australian Labor Party","e7",["environment","education","deputy"],[62,62,62,60,58], "Environment and Water Minister; formerly Housing and Education; ran for leadership.");
  I("Bob Katter",            "Australian Labor Party","e7",["business","environment","leader"],[54,64,54,44,44], "Independent Queensland MP; cattle farmer; broad-brimmed hat icon of rural politics.");
  I("Daniel Andrews",        "Australian Labor Party","e7",["pm","health","leader"], [66,62,64,64,68], "Premier of Victoria 2014–23; 'Big Build' infrastructure; COVID lockdowns architect.");
  I("Annastacia Palaszczuk", "Australian Labor Party","e7",["pm","health","leader"],[60,58,58,58,58], "Queensland Premier 2015–23; three election victories; later resigned unexpectedly.");
  I("Gladys Berejiklian",    "Liberal (AU)",    "e7", ["pm","chancellor","business"],[62,60,60,62,58], "NSW Premier 2017–21; resigned over ICAC investigation into her partner.");
  I("Dom Perrottet",         "Liberal (AU)",    "e7", ["pm","chancellor","leader"],[56,54,56,56,56], "NSW Premier 2021–23; lost to Labor's Chris Minns; devout Catholic conservative.");
  I("Mark McGowan",          "Australian Labor Party","e7",["pm","health","business"],[68,60,62,66,64], "WA Premier 2017–23; managed COVID closed borders to extraordinary popularity.");
  I("Steven Marshall",       "Liberal (AU)",    "e7", ["pm","business","leader"],  [54,52,52,54,52], "SA Premier 2018–22; lost to Labor; pro-business moderate Liberal.");
  I("Malcolm Fraser",        "Liberal (AU)",    "e5", ["pm","foreign","leader"],   [56,78,52,62,64], "Liberal PM 1975–83; came to power through the constitutional crisis; later a human-rights advocate.");
  I("Ben Chifley",           "Australian Labor Party","e4",["pm","chancellor","defence"],[66,72,64,68,66], "ALP PM 1945–49; nationalised the banks; introduced the Snowy Mountains Scheme.");
  I("Gough Whitlam",         "Australian Labor Party","e5",["pm","foreign","education"],[72,74,78,68,64], "ALP PM 1972–75; radical reformer dismissed by the Governor-General; 'It's Time'.");
  I("Paul Keating",          "Australian Labor Party","e6",["pm","chancellor","leader"],[68,78,72,72,68], "ALP Treasurer who delivered the recession 'we had to have'; PM 1991–96; visionary reformer.");
  I("Bob Hawke",             "Australian Labor Party","e5",["pm","business","foreign"],[80,76,74,78,76], "ALP PM 1983–91; longest serving; floated the dollar, privatised, created Medicare.");
  I("Kevin Rudd",            "Australian Labor Party","e7",["pm","foreign","education"],[64,66,60,60,58], "ALP PM 2007–10, 2013; Apology to Indigenous Australians; later UN Secretary-General bid.");
  I("Julia Gillard",         "Australian Labor Party","e7",["pm","education","leader"],[62,68,64,64,62], "Australia's first female PM 2010–13; National Disability Insurance Scheme; minority government.");
  I("Tony Abbott",           "Liberal (AU)",    "e7", ["pm","health","leader"],    [52,68,52,52,54], "Liberal PM 2013–15; stopped the boats; repealed the carbon tax; slogans over substance.");
  I("Malcolm Turnbull",      "Liberal (AU)",    "e7", ["pm","chancellor","business"],[66,64,66,62,58], "Liberal PM 2015–18; former Goldman banker and republican; ousted by Morrison.");
  I("John Howard",           "Liberal (AU)",    "e6", ["pm","chancellor","foreign"],[60,82,58,70,70], "Liberal PM 1996–2007; second-longest serving; gun reform, Iraq invasion, WorkChoices.");
  I("Robert Menzies",        "Liberal (AU)",    "e4", ["pm","foreign","leader"],   [64,88,68,72,72], "Australia's longest-serving PM; founded the Liberal Party; the 'Menzies era' lasted 17 years.");

  /* ════════════════════════════════════════════════════════
     CANADA — bring total to ~100
     Parties: "Liberal (CA)", "Conservative (CA)", "NDP",
              "Bloc Québécois", "Social Credit (CA)",
              "CCF (CA)", "Reform (CA)"
     ════════════════════════════════════════════════════════ */

  I("John A. Macdonald",     "Conservative (CA)","e1",["pm","justice","foreign"],  [70,82,68,72,74], "Canada's first PM; 'Father of Confederation'; built the transcontinental railway.");
  I("Alexander Mackenzie",   "Liberal (CA)",    "e1", ["pm","chancellor","leader"], [58,68,60,60,62], "Canada's second PM; first Liberal PM; built the Ottawa post office with his bare hands.");
  I("Wilfrid Laurier",       "Liberal (CA)",    "e1", ["pm","foreign","leader"],   [78,80,80,74,74], "Canada's first francophone PM; the 'sunny ways' original; led Canada into the 20th century.");
  I("Robert Borden",         "Conservative (CA)","e2",["pm","foreign","defence"],  [58,74,60,64,62], "PM during WWI; Canada's Vimy Ridge moment; secured independent voice at Paris peace.");
  I("Arthur Meighen",        "Conservative (CA)","e2",["pm","leader","chancellor"],[52,66,56,56,60], "Twice Conservative PM; brilliant debater; lost both elections he contested.");
  I("R.B. Bennett",          "Conservative (CA)","e3",["pm","chancellor","business"],[52,72,54,54,56], "PM during the Depression; 'Bennett buggies'; later tried the 'Bennett New Deal'.");
  I("Louis St. Laurent",     "Liberal (CA)",    "e4", ["pm","foreign","justice"],  [62,76,60,66,64], "'Uncle Louis'; PM 1948–57; created NATO; professorial but effective.");
  I("Joe Clark",             "Conservative (CA)","e5",["pm","foreign","leader"],   [50,66,52,54,52], "Canada's youngest PM at 39; led a minority government that lasted nine months.");
  I("John Turner",           "Liberal (CA)",    "e5", ["pm","justice","chancellor"],[56,68,58,56,54], "PM for only 79 days in 1984; lost decisively to Mulroney; a man out of time.");
  I("Kim Campbell",          "Conservative (CA)","e6",["pm","justice","defence"],  [58,60,60,58,50], "Canada's first female PM; led the Conservatives to near-annihilation — nine seats.");
  I("Jean Chrétien",         "Liberal (CA)",    "e6", ["pm","foreign","justice"],  [64,82,64,68,76], "PM 1993–2003; kept Canada out of Iraq; balanced the budget; the 'little guy from Shawinigan'.");
  I("Paul Martin",           "Liberal (CA)",    "e6", ["pm","chancellor","leader"], [54,74,52,58,54], "Finance Minister who slayed the deficit; PM 2003–06; lost to Harper's scandal attacks.");
  I("Stephen Harper",        "Conservative (CA)","e7",["pm","chancellor","foreign"],[52,74,50,60,66], "Conservative PM 2006–15; methodical, controlling; repositioned Canada's politics rightward.");
  I("Justin Trudeau",        "Liberal (CA)",    "e7", ["pm","leader","education"], [76,58,76,56,64], "PM 2015–25; 'sunny ways' redux; legalised cannabis; tainted by scandals in later terms.");
  I("Mark Carney",           "Liberal (CA)",    "e7", ["pm","chancellor","business"],[66,62,64,68,60], "Former Bank of Canada and Bank of England Governor; Liberal leader and PM from 2025.");
  I("Pierre Poilievre",      "Conservative (CA)","e7",["pm","chancellor","leader"],[62,58,66,58,60], "Conservative leader from 2022; libertarian economics and 'freedom convoy' energy.");
  I("Jagmeet Singh",         "NDP",             "e7", ["leader","pm","justice"],   [72,48,74,58,62], "NDP leader from 2017; first visible-minority federal party leader; Sikh; socially popular.");
  I("Jack Layton",           "NDP",             "e7", ["leader","health","chancellor"],[76,62,78,62,66], "NDP leader 2003–11; led party to best-ever election result 2011; died of cancer that summer.");
  I("Tommy Douglas",         "NDP",             "e4", ["pm","health","leader"],    [78,72,82,72,72], "Father of Medicare; Saskatchewan Premier; greatest Canadian voted in CBC poll.");
  I("Ed Broadbent",          "NDP",             "e5", ["leader","chancellor","work"],[62,72,66,62,64], "NDP leader 1975–89; brought party to new heights; respected across party lines.");
  I("Audrey McLaughlin",     "NDP",             "e6", ["leader","health","work"],  [54,58,56,52,54], "First woman to lead a major Canadian party at federal level.");
  I("Alexa McDonough",       "NDP",             "e6", ["leader","health","foreign"],[56,60,58,54,56], "Led NDP 1995–2003; built the party in Atlantic Canada.");
  I("Gilles Duceppe",        "Bloc Québécois",  "e6", ["leader","foreign","health"],[62,68,66,58,64], "Bloc Québécois leader for most of 1997–2015; sovereignist icon.");
  I("René Lévesque",         "Bloc Québécois",  "e5", ["pm","leader","health"],    [78,76,80,72,72], "Parti Québécois founder and Quebec Premier 1976–85; almost won independence in 1980.");
  I("Robert Bourassa",       "Liberal (CA)",    "e5", ["pm","chancellor","health"], [62,72,60,62,62], "Quebec Premier twice; pragmatic federalist; oversaw the James Bay hydroelectric project.");
  I("Jacques Parizeau",      "Bloc Québécois",  "e6", ["pm","chancellor","leader"], [60,74,62,60,60], "PQ leader and Quebec Premier; lost the 1995 referendum by only 50,000 votes.");
  I("Lucien Bouchard",       "Bloc Québécois",  "e6", ["pm","foreign","health"],   [70,68,72,64,62], "Bloc founder after breaking with Mulroney; led the 1995 Yes campaign; Quebec Premier.");
  I("Preston Manning",       "Reform (CA)",     "e6", ["leader","chancellor","pm"], [60,64,62,58,62], "Founded the Reform Party; populist right; 'the West wants in'; Stockwell Day's predecessor.");
  I("Stockwell Day",         "Conservative (CA)","e6",["leader","foreign","home"], [52,58,54,50,52], "Canadian Alliance leader; lost 2000 election; later Foreign and Public Safety minister.");
  I("Andrew Scheer",         "Conservative (CA)","e7",["leader","pm","chancellor"],[50,52,50,50,52], "Conservative leader 2017–20; lost to Trudeau twice; dual-citizenship controversy.");
  I("Erin O'Toole",          "Conservative (CA)","e7",["leader","pm","foreign"],   [52,52,52,52,50], "Conservative leader 2020–22; tried to moderate the party; ousted before election.");
  I("Chrystia Freeland",     "Liberal (CA)",    "e7", ["chancellor","foreign","deputy"],[64,60,66,62,60], "Deputy PM and Finance Minister; resigned 2024 over Trudeau's leadership; key architect of Canada's Ukraine policy.");
  I("Lloyd Axworthy",        "Liberal (CA)",    "e6", ["foreign","health","leader"],[60,70,64,66,58], "Liberal Foreign Minister; anti-landmine campaign and R2P doctrine; human security advocate.");
  I("Stéphane Dion",         "Liberal (CA)",    "e7", ["leader","pm","environment"],[54,62,58,56,52], "Liberal leader 2006–08; Green Shift carbon tax doomed him in the 2008 election.");
  I("Michael Ignatieff",     "Liberal (CA)",    "e7", ["leader","pm","foreign"],   [56,58,60,54,50], "Harvard intellectual turned Liberal leader; 'just visiting' attack ads were devastating.");
  I("Bob Rae",               "NDP",             "e6", ["pm","health","foreign"],   [64,72,66,64,60], "Ontario NDP Premier 1990–95; 'Rae Days'; later became Liberal Party interim leader.");
  I("Bill Blaikie",          "NDP",             "e6", ["leader","foreign","health"],[58,70,62,58,60], "NDP deputy leader; ran for leadership 2003; wry Manitoba voice of social democracy.");
  I("Douglas Abbott",        "Liberal (CA)",    "e4", ["chancellor","defence","foreign"],[50,66,50,56,54], "Finance Minister under St. Laurent; steered postwar reconstruction.");
  I("Lester Pearson",        "Liberal (CA)",    "e4", ["pm","foreign","leader"],   [68,76,64,70,66], "Liberal PM 1963–68; won Nobel Peace Prize for Suez; gave Canada its flag and Medicare.");
  I("Brian Mulroney",        "Conservative (CA)","e5",["pm","foreign","chancellor"],[66,74,68,68,64], "Conservative PM 1984–93; Free Trade Agreement with US; Meech Lake Accord; NAFTA.");

  /* ════════════════════════════════════════════════════════
     JAPAN — bring total to ~100
     Parties: "LDP (JP)", "DPJ", "CDP (JP)", "Komeito",
              "Nippon Ishin", "Seiyukai (JP)", "Minseito (JP)",
              "Taisei Yokusankai (JP)", "JSP (JP)"
     ════════════════════════════════════════════════════════ */

  I("Shigeru Yoshida",       "LDP (JP)",        "e4", ["pm","foreign","leader"],   [72,84,64,76,72], "Twice PM totalling seven years; forged the US-Japan security alliance; founding father of postwar Japan.");
  I("Nobusuke Kishi",        "LDP (JP)",        "e4", ["pm","foreign","leader"],   [56,78,52,62,62], "PM 1957–60; revised the US-Japan Security Treaty amid massive protests; Shinzo Abe's grandfather.");
  I("Zenko Suzuki",          "LDP (JP)",        "e5", ["pm","leader","foreign"],   [50,72,44,54,58], "LDP PM 1980–82; unintentional and accidental; famous for stumbling over the word 'alliance'.");
  I("Yasuhiro Nakasone",     "LDP (JP)",        "e5", ["pm","defence","foreign"],  [66,78,64,68,64], "LDP PM 1982–87; close to Reagan and Thatcher; rebuilt Japan's self-defence capabilities.");
  I("Noboru Takeshita",      "LDP (JP)",        "e5", ["pm","chancellor","leader"],[52,76,48,62,68], "Introduced Japan's consumption tax; brought down by Recruit scandal.");
  I("Sōsuke Uno",            "LDP (JP)",        "e5", ["pm","foreign","leader"],   [46,68,44,52,52], "PM for only 69 days 1989; forced out after a geisha scandal during his first weeks.");
  I("Toshiki Kaifu",         "LDP (JP)",        "e6", ["pm","foreign","education"],[56,64,60,56,56], "Clean-image LDP PM 1989–91; Gulf War crisis revealed Japan's inability to deploy troops.");
  I("Kiichi Miyazawa",       "LDP (JP)",        "e6", ["pm","chancellor","foreign"],[58,80,58,66,60], "Last LDP PM before the party lost power in 1993; responsible economic manager.");
  I("Morihiro Hosokawa",     "Nippon Ishin",    "e6", ["pm","leader","home"],      [68,62,66,60,58], "Founded Japan New Party; became PM 1993 ending 38 years of LDP rule; resigned over scandal.");
  I("Tsutomu Hata",          "DPJ",             "e6", ["pm","chancellor","foreign"],[48,66,46,52,50], "PM for only 64 days in 1994 after Hosokawa; LDP withdrew coalition support.");
  I("Tomiichi Murayama",     "JSP (JP)",        "e6", ["pm","health","leader"],    [54,70,52,56,58], "Japan Socialist Party PM 1994–96; issued historic apology for WWII aggression.");
  I("Ryutaro Hashimoto",     "LDP (JP)",        "e6", ["pm","health","chancellor"],[58,74,58,62,62], "LDP PM 1996–98; administrative and fiscal reform; deregulated finance.");
  I("Keizō Obuchi",          "LDP (JP)",        "e6", ["pm","foreign","chancellor"],[56,70,52,58,60], "PM 1998–2000; stimulus measures to lift Japan from recession; died in office.");
  I("Yoshirō Mori",          "LDP (JP)",        "e6", ["pm","education","leader"], [42,68,40,46,54], "PM 2000–01; gaffe-prone and hugely unpopular; resigned after a bowling flap.");
  I("Junichiro Koizumi",     "LDP (JP)",        "e6", ["pm","business","leader"],  [78,72,76,68,68], "Charismatic LDP PM 2001–06; privatised Japan Post; his Lion's mane hair was iconic.");
  I("Shinzo Abe",            "LDP (JP)",        "e7", ["pm","foreign","defence"],  [64,72,62,64,66], "Japan's longest-serving PM; two stints (2006–07, 2012–20); 'Abenomics'; assassinated 2022.");
  I("Yasuo Fukuda",          "LDP (JP)",        "e7", ["pm","foreign","leader"],   [52,68,50,58,54], "LDP PM 2007–08; son of former PM Takeo Fukuda; resigned citing political fatigue.");
  I("Yukio Hatoyama",        "DPJ",             "e7", ["pm","leader","foreign"],   [56,60,54,50,52], "DPJ PM 2009–10; promised to move US base, failed; his party's brief revolution.");
  I("Naoto Kan",             "DPJ",             "e7", ["pm","foreign","health"],   [54,62,52,52,52], "DPJ PM during March 2011 triple disaster; managed Fukushima crisis.");
  I("Yoshihide Suga",        "LDP (JP)",        "e7", ["pm","home","leader"],      [52,64,44,56,60], "LDP PM 2020–21; pandemic mismanagement; held Tokyo Olympics against public wishes.");
  I("Fumio Kishida",         "LDP (JP)",        "e7", ["pm","foreign","chancellor"],[58,66,54,60,58], "LDP PM 2021–24; led Japan's largest defence build-up since WWII; political donor scandal ended him.");
  I("Shigeru Ishiba",        "LDP (JP)",        "e7", ["pm","defence","leader"],   [60,68,56,60,58], "LDP PM from 2024; defence hawk; struggled to maintain parliamentary majority.");
  I("Tarō Kōno",             "LDP (JP)",        "e7", ["foreign","defence","chancellor"],[60,58,62,58,56], "LDP multi-portfolio minister; digital government reformer; ran for party leadership.");
  I("Sanae Takaichi",        "LDP (JP)",        "e7", ["leader","business","chancellor"],[54,62,52,56,52], "LDP leadership contender; economic stimulus advocate; ties to controversial religious group.");
  I("Katsuya Okada",         "DPJ",             "e7", ["leader","foreign","business"],[54,68,52,58,58], "DPJ leader; Foreign Minister; kept opposition alive through years in wilderness.");
  I("Ichiro Matsui",         "Nippon Ishin",    "e7", ["pm","home","leader"],      [56,56,54,56,52], "Osaka mayor and Nippon Ishin co-founder; led party's push for Osaka double election.");
  I("Komeito Yamaguchi",     "Komeito",         "e7", ["leader","health","education"],[48,64,48,52,58], "Komeito leader; LDP's coalition partner; Buddhist-backed voters and welfare focus.");
  I("Itō Hirobumi",          "Seiyukai (JP)",   "e1", ["pm","foreign","leader","justice"],[70,84,68,76,72], "Four-time PM; drafted the Meiji Constitution; first Resident-General of Korea; assassinated 1909.");
  I("Yamagata Aritomo",      "Seiyukai (JP)",   "e1", ["pm","defence","leader"],   [56,84,44,68,68], "Twice PM; founder of the modern Japanese army; elder statesman (genrō).");
  I("Inukai Tsuyoshi",       "Seiyukai (JP)",   "e3", ["pm","leader","foreign"],   [60,76,64,58,62], "PM assassinated by naval officers in May 1932, marking Japan's slide to militarism.");
  I("Hideki Tojo",           "Taisei Yokusankai (JP)","e3",["pm","defence","leader"],[44,62,44,34,58], "General and PM who ordered the attack on Pearl Harbor; executed for war crimes in 1948.");
  I("Banri Kaieda",          "DPJ",             "e7", ["leader","business","chancellor"],[50,60,50,52,54], "DPJ leader 2011–14; tried to rebuild an imploded party after tsunami and nuclear disaster.");
  I("Hiroshi Hase",          "LDP (JP)",        "e7", ["education","chancellor","leader"],[48,56,48,50,50], "LDP minister of education and culture; promoted traditional values and patriotic curriculum.");
  I("Takeo Fukuda",          "LDP (JP)",        "e5", ["pm","chancellor","foreign"],[56,80,52,64,60], "LDP PM 1976–78; veteran Finance Minister; signed the Fukuda Doctrine with Southeast Asia.");
  I("Takeo Miki",            "LDP (JP)",        "e5", ["pm","foreign","leader"],   [58,76,56,60,58], "LDP PM 1974–76; 'Mr Clean' brought in after Tanaka corruption scandal.");
  I("Masayoshi Ohira",       "LDP (JP)",        "e5", ["pm","foreign","chancellor"],[56,76,54,60,58], "LDP PM 1978–80; died in office during election campaign; first Sino-Japanese peace treaty.");
  I("Jiro Hatoyama",         "LDP (JP)",        "e4", ["pm","foreign","leader"],   [56,72,54,60,58], "LDP PM 1954–56; normalised relations with the Soviet Union; anti-occupation conservative.");

  /* ════════════════════════════════════════════════════════
     INDIA — bring total to ~100
     Parties: "INC", "BJP", "AITC", "BSP", "AAP",
              "Samajwadi Party", "Janata Party (IN)",
              "Janata Dal (IN)", "CPI(M) (IN)", "RJD (IN)"
     ════════════════════════════════════════════════════════ */

  I("Indira Gandhi",         "INC",             "e4", ["pm","foreign","home","defence"],[74,80,72,70,72], "India's only female PM; twice in office; Emergency rule; split the Congress; assassinated 1984.");
  I("Rajiv Gandhi",          "INC",             "e5", ["pm","foreign","business"], [64,62,62,62,60], "India's youngest PM; Bofors scandal; assassinated 1991; opened India's IT sector.");
  I("P.V. Narasimha Rao",    "INC",             "e6", ["pm","foreign","business"], [60,80,56,70,66], "PM 1991–96; architect with Manmohan Singh of India's economic liberalisation.");
  I("Atal Bihari Vajpayee",  "BJP",             "e6", ["pm","foreign","health","leader"],[78,80,82,74,72], "BJP's founding elder; PM twice; poet and statesman; the most beloved leader of his era.");
  I("Manmohan Singh",        "INC",             "e7", ["pm","chancellor","business"],[60,86,52,80,62], "Finance Minister who freed India's economy; PM 2004–14; honest but called 'underachiever'.");
  I("Narendra Modi",         "BJP",             "e7", ["pm","foreign","home","leader"],[82,72,80,70,80], "Gujarat CM then PM from 2014; Hindu nationalist development agenda; controversial and dominant.");
  I("Rahul Gandhi",          "INC",             "e7", ["leader","pm","foreign"],   [56,54,58,52,50], "Congress president; Nehru-Gandhi scion; lost three elections; Bharat Jodo Yatra reinvigorated his image.");
  I("Priyanka Gandhi Vadra", "INC",             "e7", ["leader","health","education"],[62,44,64,50,56], "Congress general secretary; Indira Gandhi's granddaughter; entered electoral politics 2019.");
  I("Sonia Gandhi",          "INC",             "e6", ["leader","pm","foreign"],   [64,72,60,62,66], "Italian-born widow of Rajiv Gandhi; INC president who turned down PM to install Manmohan Singh.");
  I("H.D. Deve Gowda",       "Janata Dal (IN)", "e6", ["pm","chancellor","leader"],[48,62,44,50,52], "PM 1996–97; Tamil Nadu irrigation advocate; led an unlikely united front coalition.");
  I("I.K. Gujral",           "Janata Dal (IN)", "e6", ["pm","foreign","leader"],   [54,72,54,58,54], "PM 1997–98; the 'Gujral Doctrine' of goodwill diplomacy toward smaller neighbours.");
  I("V.P. Singh",            "Janata Party (IN)","e6",["pm","chancellor","leader"],[54,70,56,56,52], "PM 1989–90; implemented Mandal Commission reservations, triggering protests.");
  I("Chandra Shekhar",       "Janata Party (IN)","e6",["pm","leader","foreign"],   [48,66,50,50,50], "PM for only 7 months; padayatra (cross-country walk) earned him national recognition.");
  I("L.K. Advani",           "BJP",             "e6", ["pm","home","leader"],      [56,78,58,60,64], "BJP's founding strategist; Ram Rath Yatra; Babri Masjid demolition — shaped modern Hindu politics.");
  I("Arun Jaitley",          "BJP",             "e7", ["chancellor","business","leader"],[60,68,62,62,62], "Trusted Modi lieutenant; Finance Minister; master political operator; died 2019.");
  I("Sushma Swaraj",         "BJP",             "e7", ["foreign","health","leader"],[72,70,74,66,64], "BJP's most popular woman politician; Foreign Minister; champion of overseas Indians in distress.");
  I("Rajnath Singh",         "BJP",             "e7", ["home","defence","leader"], [58,68,60,62,62], "Twice Home Minister and Defence Minister; trusted Modi confidant.");
  I("Yogi Adityanath",       "BJP",             "e7", ["pm","home","leader"],      [64,54,60,50,60], "Uttar Pradesh CM; saffron-robed Hindu monk; most populous state leader; Modi's populist wing.");
  I("Mamata Banerjee",       "AITC",            "e7", ["pm","leader","home"],      [70,70,72,62,68], "West Bengal CM; Trinamool Congress founder; stopped BJP's eastward march with 2021 victory.");
  I("Arvind Kejriwal",       "AAP",             "e7", ["pm","chancellor","education"],[68,52,70,58,60], "AAP founder; Delhi CM; architect of free electricity and water; anti-corruption crusade.");
  I("Nitish Kumar",          "Janata Dal (IN)", "e7", ["pm","chancellor","business"],[58,68,56,60,58], "Bihar CM for most of 2005–present; famously switched coalitions multiple times.");
  I("Mulayam Singh Yadav",   "Samajwadi Party", "e6", ["pm","home","defence"],     [58,72,54,54,60], "Uttar Pradesh CM three times; Samajwadi patriarch; Defence Minister; the Yadav dynasty founder.");
  I("Akhilesh Yadav",        "Samajwadi Party", "e7", ["pm","chancellor","education"],[60,52,60,56,56], "Youngest UP CM; Mulayam's son; IT-savvy 'bicycle' politician.");
  I("Mayawati",              "BSP",             "e7", ["pm","home","leader"],       [54,66,50,54,56], "Four-time UP CM; Dalit icon and BSP supremo; commanded enormous personal loyalty.");
  I("Sharad Pawar",          "INC",             "e6", ["chancellor","agriculture","leader"],[60,76,58,60,62], "Maharashtra strongman; NCP founder; Agriculture Minister; cricket board baron.");
  I("Pranab Mukherjee",      "INC",             "e7", ["chancellor","foreign","pm"],[60,86,56,70,64], "INC's all-purpose elder; Finance Minister; President of India 2012–17.");
  I("P. Chidambaram",        "INC",             "e7", ["chancellor","home","leader"],[58,74,60,64,58], "Harvard-educated Finance and Home Minister; Tamil Nadu's most powerful national politician.");
  I("Subhas Chandra Bose",   "INC",             "e3", ["pm","defence","foreign","leader"],[78,64,78,62,60], "Congress president; formed Indian National Army; 'Netaji'; died mysteriously in 1945.");
  I("Maulana Azad",          "INC",             "e4", ["pm","education","foreign"],[66,72,70,62,60], "First Education Minister; opposed Partition; kept Congress secular after independence.");
  I("V.K. Krishna Menon",    "INC",             "e4", ["defence","foreign","leader"],[56,74,60,60,52], "India's first high commissioner to UK; firebrand Defence Minister ousted after 1962 war.");
  I("E. Ahamed",             "Janata Dal (IN)", "e7", ["foreign","health","chancellor"],[46,62,44,50,48], "Kerala Muslim League leader; Union Minister for years; died in Parliament 2017.");
  I("Farooq Abdullah",       "Janata Dal (IN)", "e6", ["pm","chancellor","leader"],[58,66,60,58,56], "Jammu & Kashmir CM and National Conference leader; survived militancy years.");
  I("Omar Abdullah",         "Janata Dal (IN)", "e7", ["pm","foreign","leader"],   [60,54,60,56,52], "J&K CM; Farooq's son; pushed for statehood restoration after Article 370 was revoked.");

  /* ════════════════════════════════════════════════════════
     SOVIET UNION & RUSSIA — bring total to ~100
     Parties: "CPSU", "Communist Party (SU)", "United Russia",
              "RSDLP (SU)", "Bolshevik (SU)", "Mensheviks (SU)"
     ════════════════════════════════════════════════════════ */

  I("Vladimir Lenin",        "Bolshevik (SU)",  "e2", ["pm","leader","foreign"],   [74,68,74,70,84], "Father of the Soviet state; founder of Bolshevik party; led October Revolution 1917.");
  I("Leon Trotsky",          "Bolshevik (SU)",  "e2", ["defence","foreign","leader"],[76,62,80,64,60], "Architect of the Red Army; deported by Stalin; assassinated in Mexico 1940.");
  I("Nikolai Bukharin",      "CPSU",            "e3", ["leader","chancellor","education"],[62,62,66,56,54], "'The Party's favourite'; Marxist theorist executed in the Great Purge 1938.");
  I("Alexei Rykov",          "CPSU",            "e2", ["pm","chancellor","leader"],[54,66,52,56,54], "Lenin's successor as Premier; NEP pragmatist; executed in the Great Purge 1938.");
  I("Grigory Zinoviev",      "CPSU",            "e2", ["leader","foreign"],        [54,58,58,44,56], "Comintern chief; power in the triumvirate after Lenin; show-trial victim 1936.");
  I("Lev Kamenev",           "CPSU",            "e2", ["leader","chancellor"],     [54,56,56,46,52], "Lenin's closest ally; coalition with Zinoviev vs Trotsky; executed 1936.");
  I("Mikhail Kalinin",       "CPSU",            "e3", ["pm","leader","education"], [44,68,40,44,50], "Nominal head of Soviet state 1919–46; 'All-Union elder'; puppet figurehead.");
  I("Mikhail Tukhachevsky",  "CPSU",            "e3", ["defence"],                [62,64,52,54,48], "Marshal and Red Army moderniser; falsely accused of treason; executed 1937.");
  I("Lavrentiy Beria",       "CPSU",            "e3", ["home","leader","justice"],  [34,66,32,40,58], "NKVD/MGB chief; architect of the Gulag; attempted power grab after Stalin's death; executed 1953.");
  I("Georgy Malenkov",       "CPSU",            "e4", ["pm","leader","chancellor"],[50,70,44,52,60], "Soviet Premier after Stalin's death; almost won the succession; then ousted by Khrushchev.");
  I("Anastas Mikoyan",       "CPSU",            "e4", ["pm","business","foreign"], [54,84,48,56,60], "Survived every Soviet leader from Lenin to Brezhnev; trade and foreign commerce minister.");
  I("Andrei Gromyko",        "CPSU",            "e5", ["foreign","pm","leader"],   [50,88,44,62,60], "'Mr Nyet' at the UN; Soviet Foreign Minister 1957–85; Cold War's most durable diplomat.");
  I("Alexei Kosygin",        "CPSU",            "e5", ["pm","chancellor","business"],[52,78,46,62,58], "Soviet Premier under Brezhnev; tried technocratic economic reforms; sidelined by Brezhnev.");
  I("Mikhail Suslov",        "CPSU",            "e5", ["leader","education"],      [40,82,36,48,62], "'The grey cardinal' of Soviet ideology; kingmaker who blocked Shelepin and chose Andropov.");
  I("Mikhail Gorbachev",     "CPSU",            "e6", ["pm","foreign","leader"],   [74,78,72,62,62], "Last Soviet leader; glasnost and perestroika; ended the Cold War; Nobel Peace laureate 1990.");
  I("Boris Yeltsin",         "United Russia",   "e6", ["pm","chancellor","leader"],[66,72,68,54,60], "First Russian President; dissolved the USSR; constitutional crisis; handed power to Putin.");
  I("Vladimir Putin",        "United Russia",   "e7", ["pm","foreign","defence","leader"],[66,80,60,64,82], "Russia's dominant leader since 2000; reconstituted state power; launched Ukraine invasion 2022.");
  I("Dmitry Medvedev",       "United Russia",   "e7", ["pm","chancellor","justice"],[52,62,52,54,56], "Russian President 2008–12 (Putin's placeholder); now hawkish state-media voice.");
  I("Sergei Lavrov",         "United Russia",   "e7", ["foreign","pm","leader"],   [50,82,52,58,58], "Russia's Foreign Minister since 2004; brutal Cold War-style diplomat defending Putin's line.");
  I("Alexei Navalny",        "United Russia",   "e7", ["leader","justice","chancellor"],[72,52,76,60,58], "Russia's most prominent opposition leader; poisoned, imprisoned, died in Arctic prison 2024.");
  I("Yegor Gaidar",          "United Russia",   "e6", ["chancellor","business","pm"],[48,64,48,54,46], "Architect of Russia's shock therapy privatisation 1992; 'young reformers' liberal.");
  I("Viktor Chernomyrdin",   "United Russia",   "e6", ["pm","business","chancellor"],[52,72,46,56,60], "Gazprom boss; Russian PM 1992–98; famous for accidental wisdom in malapropisms.");
  I("Evgeny Primakov",       "United Russia",   "e6", ["pm","foreign","leader"],   [60,76,54,64,60], "PM 1998–99; former spy chief and academic; halted the rouble crisis; pan-Eurasian vision.");
  I("Boris Nemtsov",         "United Russia",   "e6", ["deputy","chancellor","leader"],[66,58,68,58,56], "Liberal reformer and deputy PM; shot outside the Kremlin walls 2015.");
  I("Anatoly Sobchak",       "United Russia",   "e6", ["pm","justice","leader"],   [64,60,68,58,52], "Reforming St. Petersburg mayor; Putin's patron; briefly cleared then died suspiciously.");
  I("Gennady Zyuganov",      "Communist Party (SU)","e6",["leader","chancellor","pm"],[52,72,52,56,60], "CPRF leader; lost 1996 election to Yeltsin amid disputed result; led hard-left in perpetual opposition.");
  I("Vladimir Zhirinovsky",  "United Russia",   "e6", ["leader","foreign","defence"],[62,68,64,50,58], "LDPR leader 1990–2022; nationalist showman; Putin's loyal parliamentary partner; died 2022.");
  I("Mikhail Prokhorov",     "United Russia",   "e7", ["leader","business","chancellor"],[54,44,54,50,42], "Oligarch who ran against Putin in 2012 getting 8%; founded short-lived Civic Platform.");
  I("Ksenia Sobchak",        "United Russia",   "e7", ["leader","home"],           [58,40,60,44,40], "Journalist and reality-TV star; ran against Putin 2018; anti-establishment 'she-candidate'.");
  I("Alexander Rutskoy",     "United Russia",   "e6", ["deputy","defence","leader"],[48,60,50,46,48], "Yeltsin's Vice President who turned against him; besieged parliament in 1993 crisis; arrested.");
  I("Sergei Kiriyenko",      "United Russia",   "e6", ["pm","chancellor","business"],[48,58,46,50,52], "PM whose 98-day government oversaw Russia's 1998 financial default.");
  I("Sergei Stepashin",      "United Russia",   "e6", ["pm","home","justice"],     [50,60,48,52,50], "PM for just three months 1999; succeeded Primakov; replaced by Putin.");
  I("Mikhail Kasyanov",      "United Russia",   "e6", ["pm","chancellor","business"],[52,62,50,56,52], "Putin's first PM 2000–04; later became opposition figure.");
  I("Valentina Matvienko",   "United Russia",   "e7", ["pm","leader","foreign"],   [44,72,44,52,56], "Federation Council speaker; St. Petersburg governor; one of Russia's most powerful women.");
  I("Felix Dzerzhinsky",     "Bolshevik (SU)",  "e2", ["home","justice","leader"],  [38,62,36,40,60], "Founder of the Cheka (secret police); Lenin's enforcer; 'Iron Felix'.");

  /* ════════════════════════════════════════════════════════
     CHINA — bring total to ~100
     Parties: "Chinese Communist Party", "Kuomintang (CN)",
              "CCP", "Chinese Nationalist Party (CN)"
     ════════════════════════════════════════════════════════ */

  I("Sun Yat-sen",           "Chinese Nationalist Party (CN)","e2",["pm","foreign","leader"],[78,66,76,66,68], "Founding father of the Republic of China; Three Principles of the People; first provisional president.");
  I("Yuan Shikai",           "Chinese Nationalist Party (CN)","e2",["pm","defence","leader"],[52,68,44,48,60], "Warlord who betrayed the republic; briefly proclaimed himself Emperor; died 1916 amid ridicule.");
  I("Chiang Kai-shek",       "Kuomintang (CN)", "e3", ["pm","defence","foreign"], [52,78,44,52,64], "Nationalist leader; fought Communists and Japanese; lost the civil war; retreated to Taiwan.");
  I("Mao Zedong's ally Zhou Enlai","Chinese Communist Party","e4",["foreign","pm","chancellor"],[72,84,72,74,72], "Premier 1949–76; adept diplomatic shield for Mao's excesses; ran the state while Mao ran the party.");
  I("Deng Xiaoping",         "Chinese Communist Party","e5",["pm","chancellor","leader","foreign"],[66,86,54,84,78], "Paramount leader 1978–92; opened China to the world; four modernisations; 'Some must get rich first'.");
  I("Hua Guofeng",           "Chinese Communist Party","e5",["pm","leader"],      [44,66,38,44,52], "Mao's designated successor; ousted by Deng; 'Two Whatevers' policy discredited quickly.");
  I("Hu Yaobang",            "Chinese Communist Party","e5",["pm","leader","education"],[62,68,60,60,58], "CCP General Secretary; reformer; his death in 1989 triggered Tiananmen Square protests.");
  I("Zhao Ziyang",           "Chinese Communist Party","e5",["pm","chancellor","leader"],[62,72,58,62,58], "Premier and General Secretary; supported Tiananmen protesters; stripped of power and put under house arrest.");
  I("Jiang Zemin",           "Chinese Communist Party","e6",["pm","foreign","leader"],[54,78,50,62,64], "CCP General Secretary 1989–2002; 'Three Represents'; presided over HK handover; kept Tiananmen lid on.");
  I("Li Peng",               "Chinese Communist Party","e6",["pm","chancellor","business"],[40,76,36,46,58], "PM during Tiananmen; declared martial law; 'the Butcher of Beijing'.");
  I("Zhu Rongji",            "Chinese Communist Party","e6",["pm","chancellor","business"],[60,76,56,70,60], "Zhu Rongji's economic reforms transformed China; WTO accession; anti-corruption campaign.");
  I("Hu Jintao",             "Chinese Communist Party","e7",["pm","foreign","leader"],[50,74,44,56,60], "CCP General Secretary 2002–12; 'Harmonious Society'; engineered 2008 Olympics; technocratic.");
  I("Wen Jiabao",            "Chinese Communist Party","e7",["pm","chancellor","education"],[58,72,56,62,56], "Premier 2003–13; 'Grandpa Wen'; disaster management; last major CCP liberal voice.");
  I("Xi Jinping",            "Chinese Communist Party","e7",["pm","foreign","defence","leader"],[58,72,50,64,82], "CCP General Secretary from 2012; 'Xi Jinping Thought'; the most powerful leader since Mao.");
  I("Li Keqiang",            "Chinese Communist Party","e7",["pm","chancellor","business"],[54,70,52,60,56], "Premier 2013–23; technocratic economist; occasionally candid about China's real GDP levels.");
  I("Wang Qishan",           "Chinese Communist Party","e7",["deputy","chancellor","leader"],[50,72,46,62,62], "Anti-corruption czar; Vice President; Xi's most trusted enforcer of the 'tiger hunt'.");
  I("Bo Xilai",              "Chinese Communist Party","e7",["pm","leader","home"], [60,60,64,52,52], "Chongqing boss; neo-Maoist populist; his wife murdered a British businessman; imprisoned for life.");
  I("Peng Dehuai",           "Chinese Communist Party","e4",["defence","foreign","leader"],[56,72,54,56,52], "Korean War commander; purged after criticising Mao's Great Leap Forward.");
  I("Chen Yi",               "Chinese Communist Party","e4",["foreign","defence","leader"],[58,70,60,56,52], "Marshal of China; Foreign Minister 1958–72; cultural revolution target.");
  I("Lin Biao",              "Chinese Communist Party","e4",["defence","leader","foreign"],[48,68,44,46,54], "Mao's designated successor; died fleeing in a plane crash over Mongolia in 1971.");
  I("Liu Shaoqi",            "Chinese Communist Party","e4",["pm","leader","chancellor"],[52,72,48,56,56], "Head of State ousted and tortured during Cultural Revolution; posthumously rehabilitated.");
  I("Jiang Qing",            "Chinese Communist Party","e5",["leader","culture","education"],[38,58,42,32,52], "Mao's wife; Gang of Four leader; orchestrated Cultural Revolution terror; tried and sentenced 1980.");
  I("Wang Yi",               "Chinese Communist Party","e7",["foreign","leader","chancellor"],[52,72,48,58,56], "China's dominant Foreign Minister and Politburo Standing Committee member under Xi.");
  I("Li Qiang",              "Chinese Communist Party","e7",["pm","chancellor","business"],[50,64,44,56,56], "Shanghai party boss; Xi's ally; Premier from 2023.");
  I("Zhao Leji",             "Chinese Communist Party","e7",["leader","justice","home"],[46,68,40,52,58], "NPC chairman from 2023; former anti-corruption chief; Politburo Standing Committee member.");
  I("Sun Li-jen",            "Kuomintang (CN)", "e4", ["defence","foreign"],        [56,64,52,56,48], "KMT general who defeated Communist forces multiple times; politically sidelined by Chiang.");
  I("Chen Shui-bian",        "Kuomintang (CN)", "e6", ["pm","foreign","leader"],   [60,58,62,54,52], "Taiwan President 2000–08; pro-independence DPP; imprisoned for corruption after office.");
  I("Ma Ying-jeou",          "Kuomintang (CN)", "e7", ["pm","foreign","leader"],   [58,62,58,56,54], "KMT Taiwan President 2008–16; 'One China' rapprochement with Beijing.");
  I("Tsai Ing-wen",          "Kuomintang (CN)", "e7", ["pm","foreign","leader"],   [64,64,62,64,62], "DPP Taiwan President 2016–24; defended Taiwan's autonomy amid rising cross-strait tension.");
  I("Zhang Zuolin",          "Chinese Nationalist Party (CN)","e2",["pm","defence","leader"],[48,60,44,42,52], "Manchurian warlord; de facto ruler of Beijing; assassinated by Japanese Kwantung Army 1928.");
  I("Warlord Feng Yuxiang",  "Chinese Nationalist Party (CN)","e2",["pm","defence","leader"],[48,58,46,42,50], "'Christian Warlord'; baptised troops with fire hose; repeatedly changed sides; key KMT ally.");
  I("Zhou Enlai",            "Chinese Communist Party","e4",["foreign","pm","chancellor"],[72,86,70,76,70], "PRC Premier 1949–76; brilliant diplomat who brought China into the world; moderate amid Mao's terror.");

  /* ════════════════════════════════════════════════════════
     NORTH KOREA — aim for ~25 entries
     Party: "Korean Workers' Party"
     ════════════════════════════════════════════════════════ */

  I("Kim Il-sung",           "Korean Workers' Party","e4",["pm","defence","leader"],[62,80,56,56,78], "Eternal President of North Korea; founding dictator; built the world's most totalitarian state.");
  I("Kim Jong-il",           "Korean Workers' Party","e5",["pm","leader","defence"],[42,74,36,40,72], "Kim Il-sung's son; 'Dear Leader'; nuclear weapons programme; Songun (military-first) ideology.");
  I("Kim Jong-un",           "Korean Workers' Party","e7",["pm","defence","leader"],[50,62,44,46,72], "Third Kim; executed his uncle and a half-brother; accelerated nuclear programme; Supreme Leader.");
  I("Kim Yo-jong",           "Korean Workers' Party","e7",["deputy","leader","home"],[48,50,46,48,70], "Kim Jong-un's sister; de facto second-in-command; wields enormous power behind the scenes.");
  I("Choe Ryong-hae",        "Korean Workers' Party","e7",["pm","deputy","leader"],[38,62,34,38,62], "President of the Supreme People's Assembly; previously the regime's #2; survivor.");
  I("Kim Yong-nam",          "Korean Workers' Party","e5",["foreign","pm","leader"],[34,80,30,36,58], "Figurehead head of state for three decades; attended Olympics as the regime's public face.");
  I("Pak Pong-ju",           "Korean Workers' Party","e7",["pm","chancellor","business"],[36,66,30,38,54], "Twice Premier; economic reformer; managed the Kaesong Industrial Complex experiment.");
  I("Choe Son-hui",          "Korean Workers' Party","e7",["foreign","deputy"],    [42,54,38,42,52], "Vice-foreign minister then Foreign Minister; led nuclear negotiations with the US 2018–19.");
  I("Hwang Jang-yop",        "Korean Workers' Party","e5",["leader","education","foreign"],[44,68,42,46,52], "Juche ideology architect; highest-level official to defect (1997); warned of regime's brutality.");
  I("Chang Sung-taek",       "Korean Workers' Party","e7",["deputy","chancellor","business"],[42,60,36,40,56], "Kim Jong-un's uncle and regent; publicly accused of treason and executed December 2013.");
  I("Kim Kyong-hui",         "Korean Workers' Party","e6",["deputy","leader"],     [40,58,34,38,52], "Kim Jong-il's sister and Chang's wife; once highly powerful; faded after husband's execution.");
  I("O Jin-u",               "Korean Workers' Party","e5",["defence","pm","leader"],[38,72,32,38,56], "Marshal and Defence Minister; Kim Il-sung's most loyal general; died 1995.");
  I("Ri Sol-ju",             "Korean Workers' Party","e7",["deputy","leader"],     [44,30,40,36,40], "Kim Jong-un's wife; elevated to 'first lady' status; rare public female presence in regime.");
  I("Kim Jong-chol",         "Korean Workers' Party","e7",["leader","culture"],    [36,40,32,30,36], "Kim Jong-un's older brother; passed over for succession; known for his love of music.");
  I("Ri Yong-ho",            "Korean Workers' Party","e7",["foreign","defence"],   [38,54,34,38,44], "Chief of General Staff 2010–12, then Foreign Minister 2016–20; nuclear talks envoy.");
  I("Hyon Yong-chol",        "Korean Workers' Party","e7",["defence"],             [34,52,28,30,44], "Defence Minister; allegedly executed by anti-aircraft gun in 2015 — may be apocryphal.");
  I("Nam Il",                "Korean Workers' Party","e4",["foreign","deputy"],    [38,60,36,40,48], "Korean War armistice negotiator; Foreign Minister 1953–72; survived factional purges.");
  I("Kim Il",                "Korean Workers' Party","e4",["deputy","defence","leader"],[36,64,30,36,54], "Vice Premier under Kim Il-sung; one of the most senior officials of the founding generation.");
  I("Pak Jong-chon",         "Korean Workers' Party","e7",["defence","deputy","leader"],[38,54,32,36,52], "Chief of General Staff from 2018; rose in Kim Jong-un's 'grey-collar' military circle.");
  I("Kim Pyong-il",          "Korean Workers' Party","e7",["foreign","deputy"],    [36,52,34,36,42], "Kim Il-sung's youngest son; spent decades as ambassador — kept out of the succession.");
  I("Ri Man-gon",            "Korean Workers' Party","e7",["chancellor","pm","business"],[36,56,30,36,48], "Premier; oversaw agricultural policy; removed 2019 after food security failures.");
  I("Jang Chol",             "Korean Workers' Party","e6",["chancellor","pm","business"],[34,52,28,32,44], "Agricultural committee chief; premier figure in the KWP economic administration.");
  I("Kim Jong-suk",          "Korean Workers' Party","e3",["deputy","leader"],     [42,44,38,38,46], "Kim Il-sung's first wife and Kim Jong-il's mother; anti-Japanese guerrilla; cult heroine.");
  I("Choe Hyon",             "Korean Workers' Party","e4",["defence","leader"],    [38,64,32,36,52], "Founding Korean People's Army general; Defence Minister 1960s–70s; elder revolutionary.");

  /* ════════════════════════════════════════════════════════
     CUBA — aim for ~25 entries
     Party: "Communist Party (CU)"
     ════════════════════════════════════════════════════════ */

  I("Fidel Castro",          "Communist Party (CU)","e4",["pm","foreign","defence","leader"],[78,80,82,64,78], "Cuban revolutionary leader 1959–2008; defied the US for five decades; Communist Party patriarch.");
  I("Raúl Castro",           "Communist Party (CU)","e5",["pm","defence","leader"],[56,78,44,58,72], "Fidel's brother; Defence Minister; President 2008–18; cautious market reforms; handed power to Díaz-Canel.");
  I("Che Guevara",           "Communist Party (CU)","e4",["defence","foreign","chancellor"],[76,52,72,56,52], "Argentine doctor; guerrilla icon; Cuba's guerrilla minister; killed in Bolivia 1967.");
  I("Camilo Cienfuegos",     "Communist Party (CU)","e4",["defence","leader"],    [66,42,60,50,52], "Revolutionary commander called 'the man with the cowboy hat'; disappeared 1959 in mysterious plane crash.");
  I("Fulgencio Batista",     "Communist Party (CU)","e3",["pm","defence","leader"],[44,64,40,38,58], "US-backed Cuban dictator overthrown by Castro; his regime's corruption fuelled the revolution.");
  I("Carlos Rafael Rodríguez","Communist Party (CU)","e4",["chancellor","foreign","education"],[54,74,50,58,60], "Marxist economist who joined Castro before victory; vice-president; regime's intellectual architect.");
  I("Blas Roca",             "Communist Party (CU)","e4",["leader","education"],  [46,68,44,46,60], "Original Cuban Communist Party general secretary; survived the transition to Castro's rule.");
  I("Ramiro Valdés",         "Communist Party (CU)","e4",["home","defence","leader"],[44,72,38,44,58], "Founding revolutionary; Interior Minister; intelligence chief; outlived nearly all his comrades.");
  I("Juan Almeida Bosque",   "Communist Party (CU)","e4",["defence","deputy","leader"],[48,66,44,48,52], "Afro-Cuban commander of the Granma landing; highest-ranking Afro-Cuban in the revolution.");
  I("José Ramón Machado Ventura","Communist Party (CU)","e5",["deputy","health","leader"],[36,78,32,38,58], "Vice-President into his 90s; hard-line ideological gatekeeper; Cuba's second-highest official for decades.");
  I("Esteban Lazo Hernández","Communist Party (CU)","e7",["pm","leader","deputy"],[36,68,32,36,54], "National Assembly president; Afro-Cuban Politburo member; regime's public face for domestic audiences.");
  I("Miguel Díaz-Canel",     "Communist Party (CU)","e7",["pm","leader","education"],[42,62,38,42,56], "Cuba's President from 2018; first non-Castro to hold power in 60 years; managing economic collapse.");
  I("Bruno Rodríguez Parrilla","Communist Party (CU)","e7",["foreign","pm","leader"],[44,62,40,46,50], "Foreign Minister; Cuba's face to the world; defends the embargo as a US 'blockade'.");
  I("Salvador Valdés Mesa",  "Communist Party (CU)","e7",["deputy","work","chancellor"],[36,62,32,36,50], "Vice-President; sugar industry veteran; nominal #2 to Díaz-Canel.");
  I("Roberto Morales Ojeda", "Communist Party (CU)","e7",["home","health","leader"],[38,58,34,38,50], "Party organisation secretary; oversees political education and internal discipline.");
  I("Ricardo Alarcón",       "Communist Party (CU)","e5",["pm","foreign","leader"],[48,74,46,50,54], "National Assembly president 1993–2013; long-time foreign affairs chief; regime voice on US relations.");
  I("Vilma Espín",           "Communist Party (CU)","e4",["health","education","deputy"],[52,60,48,50,52], "Raúl Castro's wife; founding revolutionary; led the Federation of Cuban Women for decades.");
  I("Armando Hart",          "Communist Party (CU)","e4",["education","culture","leader"],[52,68,50,52,52], "Founding M-26-7 member; Education Minister who led the literacy campaign; Cultural Minister.");
  I("Abel Prieto",           "Communist Party (CU)","e7",["culture","education","deputy"],[50,62,52,50,48], "Cuban novelist and Fidel's closest cultural adviser; twice Minister of Culture.");
  I("Frank País",            "Communist Party (CU)","e4",["leader","home","deputy"],[60,36,56,44,54], "M-26-7 urban revolutionary; coordinated the city resistance; killed by Batista's police 1957, aged 22.");
  I("José Martí",            "Communist Party (CU)","e1",["leader","foreign","education"],[82,58,86,68,64], "Cuba's 'Apostle'; poet and independence leader; killed in first battle of final independence war 1895.");
  I("Osmany Cienfuegos",     "Communist Party (CU)","e5",["chancellor","pm","business"],[44,66,40,44,50], "Camilo's brother; long-serving government minister; tourism and construction portfolios.");
  I("Pedro Miret Prieto",    "Communist Party (CU)","e4",["defence","deputy","chancellor"],[40,64,36,40,48], "Granma survivor and Moncada veteran; long-serving deputy premier and defence figure.");
  I("Abelardo Colomé Ibarra","Communist Party (CU)","e5",["home","defence","leader"],[38,68,32,36,54], "Interior Minister 1989–2015; ran Cuba's secret police and intelligence apparatus.");

  /* Register party colour bands for any new party strings */
  if (G.PARTIES) {
    function reg(label, key, colour, align) {
      if (!G.PARTIES[key]) G.PARTIES[key] = { label: label, colour: colour, align: align };
    }
    reg("Bolshevik (SU)", "bolshevik_su", "#8B0000", -2.0);
    reg("RSDLP (SU)", "rsdlp_su", "#8B0000", -2.0);
    reg("SED (DE)", "sed_de", "#CC0000", -1.8);
    reg("SFIO (FR)", "sfio_fr", "#E74C3C", -1.5);
    reg("MRP (FR)", "mrp_fr", "#3498DB", -0.2);
    reg("Gaulliste (FR)", "gaulliste_fr", "#2C3E50", +1.2);
    reg("Seiyukai (JP)", "seiyukai_jp", "#1A5276", +0.8);
    reg("Minseito (JP)", "minseito_jp", "#154360", +0.4);
    reg("Taisei Yokusankai (JP)", "taisei_jp", "#1B2631", +1.8);
    reg("JSP (JP)", "jsp_jp", "#E74C3C", -1.4);
    reg("Janata Party (IN)", "janata_in", "#E67E22", +0.4);
    reg("Janata Dal (IN)", "janatal_in", "#27AE60", +0.2);
    reg("CPI(M) (IN)", "cpim_in", "#C0392B", -1.6);
    reg("RJD (IN)", "rjd_in", "#2ECC71", -0.4);
    reg("Chinese Nationalist Party (CN)", "kmt_cn", "#003F87", +0.6);
    reg("Kuomintang (CN)", "kmt2_cn", "#003F87", +0.6);
    reg("Social Credit (CA)", "socialcredit_ca", "#2ECC71", -0.6);
    reg("CCF (CA)", "ccf_ca", "#CC3333", -1.4);
    reg("Reform (CA)", "reform_ca", "#2196F3", +1.4);
    reg("Country Party (AU)", "country_au", "#27AE60", +0.8);
  }

  /* Also extend PARTY_COUNTRY for any new party strings */
  if (G.PARTY_COUNTRY) {
    var extra = {
      "Bolshevik (SU)": "SU", "RSDLP (SU)": "SU",
      "SED (DE)": "DE",
      "SFIO (FR)": "FR", "MRP (FR)": "FR", "Gaulliste (FR)": "FR",
      "Seiyukai (JP)": "JP", "Minseito (JP)": "JP", "Taisei Yokusankai (JP)": "JP", "JSP (JP)": "JP",
      "Janata Party (IN)": "IN", "Janata Dal (IN)": "IN", "CPI(M) (IN)": "IN", "RJD (IN)": "IN",
      "Chinese Nationalist Party (CN)": "CN", "Kuomintang (CN)": "CN",
      "Social Credit (CA)": "CA", "CCF (CA)": "CA", "Reform (CA)": "CA",
      "Country Party (AU)": "AU",
      "Bull Moose": "US"
    };
    for (var k in extra) G.PARTY_COUNTRY[k] = extra[k];
  }

})();

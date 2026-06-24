/* =============================================================================
   650 — POLITICIANS EXPANSION II  (international depth)
   Adds ~250 international historical and modern figures across all supported
   countries and systems. All tagged scope:"wild".
   Stats: [appeal, experience, oratory, statecraft, partyMgmt]
   Loaded after data.international.js.
   ============================================================================= */
window.G = window.G || {};

(function () {
  var G = window.G;

  var existing = {};
  G.POLITICIANS.forEach(function (p) { existing[p.name + "|" + (p.scope || "uk")] = 1; });

  function I(name, party, era, fits, s, note, extra) {
    extra = extra || {};
    var scope = "wild";
    if (existing[name + "|" + scope]) return;
    existing[name + "|" + scope] = 1;
    var fig = {
      name: name, party: party, era: era, fits: fits,
      stats: { appeal: s[0], experience: s[1], oratory: s[2], statecraft: s[3], partyMgmt: s[4] },
      note: note || "", scope: scope
    };
    if (extra.despot) fig.despot = true;
    if (extra.flag)   fig.flag   = extra.flag;
    if (extra.wiki)   G.PHOTO[name] = { wiki: extra.wiki };
    G.POLITICIANS.push(fig);
  }

  function regParty(label, lineage, colour, align, cap) {
    if (!G.PARTIES[label]) G.PARTIES[label] = { label: label, lineage: lineage, colour: colour, cap: cap || 2980 };
    if (G.PARTY_ALIGN && !(label in G.PARTY_ALIGN)) G.PARTY_ALIGN[label] = align || 0;
    if (G.LINEAGE_ALIGN && !(lineage in G.LINEAGE_ALIGN)) G.LINEAGE_ALIGN[lineage] = align || 0;
  }

  /* ---- Register any missing parties ----------------------------------------- */
  regParty("Whig (USA)",         "WhigUSA",   "#c5a028",  0.3);
  regParty("Know Nothing",       "KnowNothing","#8b6914",  1.2);
  regParty("Progressive (USA)",  "ProgressUS","#4caf50",  -1.0);
  regParty("CDU",                "CDU_MOD",   "#151515",   1.0);
  regParty("SPD (DE)",           "SPD_MOD",   "#e3000f",  -1.0);
  regParty("RPR",                "RPR_FR",    "#003189",   1.2);
  regParty("PS (FR)",            "PS_MOD",    "#e91e63",  -1.0);
  regParty("UMP",                "UMP_FR",    "#0d47a1",   1.2);
  regParty("LREM",               "LREM",      "#ffeb3b",   0.2);
  regParty("National (AU)",      "NatAU2",    "#2e7d32",   1.0);
  regParty("NDP (CA)",           "NDPCA",     "#f4700e",  -1.2);
  regParty("Bloc Québécois",     "BQ",        "#00a3e0",  -0.5);
  regParty("LDP (JP)",           "LDP_JP",    "#cc0000",   0.8);
  regParty("DPJ",                "DPJ",       "#1565c0",  -0.4);
  regParty("BJP",                "BJP_IN",    "#ff6600",   1.4);
  regParty("BSP",                "BSP",       "#0000ff",  -0.8);
  regParty("AAP",                "AAP",       "#00bcd4",  -0.5);
  regParty("CPSU",               "CPSU",      "#cc0000",  -2.0);
  regParty("United Russia",      "UnitedRU",  "#0b3d91",   1.8);
  regParty("CCP",                "CCP",       "#de2910",  -0.5);
  regParty("Worker's Party (BR)","PT_BR",     "#e53935",  -1.2);
  regParty("ANC",                "ANC",       "#007a4d",  -1.0);
  regParty("Fatah",              "Fatah",     "#006600",   0.0);
  regParty("Mapai",              "Mapai",     "#e53935",  -1.0);
  regParty("Likud",              "Likud",     "#00356b",   1.4);
  regParty("CHP (TR)",           "CHP_TR",    "#d50000",  -0.5);
  regParty("AKP",                "AKP",       "#ff8f00",   1.2);
  regParty("ZANU-PF",            "ZANUPF",    "#cc0000",   0.0);
  regParty("Peronist",           "Peronist",  "#00aaff",  -0.5);
  regParty("PAN (MX)",           "PAN_MX",    "#1565c0",   1.0);
  regParty("PRI",                "PRI_MX",    "#009922",   0.2);
  regParty("Morena",             "Morena",    "#883300",  -1.2);
  regParty("Solidarity (PL)",    "SolidarPL", "#d50000",  -0.3);
  regParty("Polish KO",          "KO_PL",     "#ff9800",   0.2);
  regParty("Sinn Féin",         "SinnFein",   "#009a49",  -1.4);
  regParty("Workers' Party (IE)","WP_IE",     "#cc0000",  -1.6);
  regParty("Fine Gael",          "FineGael",  "#009a49",   0.4);
  regParty("Fianna Fáil",       "FiannaFail", "#336600",   0.2);
  regParty("Swedish Social Democrats","SAP",  "#e3000f",  -1.0);
  regParty("Moderates (SE)",     "ModSE",     "#003399",   1.0);
  regParty("Dutch Labour",       "PvdA",      "#d50000",  -1.0);
  regParty("VVD",                "VVD",       "#ff7700",   0.8);

  /* ==========================================================================
     USA — additional presidents, VPs, cabinet officers, senators
     ========================================================================== */
  I("John Adams",          "Federalist",       "e0", ["pm","foreign","justice","leader"],  [70,78,72,74,62],
    "Second President; XYZ Affair, Alien and Sedition Acts, established an independent judiciary.",
    { wiki: "John Adams" });
  I("James Madison",       "Democrat (USA)",   "e0", ["pm","foreign","justice","leader"],  [68,84,70,80,74],
    "Father of the Constitution; War of 1812 president and architect of the Bill of Rights.",
    { wiki: "James Madison" });
  I("James Monroe",        "Democrat (USA)",   "e0", ["pm","foreign","leader"],            [70,80,66,74,72],
    "Fifth President; Monroe Doctrine established American hemispheric supremacy.",
    { wiki: "James Monroe" });
  I("Andrew Jackson",      "Democrat (USA)",   "e1", ["pm","leader","home","defence"],     [82,74,78,70,82],
    "Seventh President; Indian Removal Act, spoils system, populist hero and tyrant combined.",
    { wiki: "Andrew Jackson" });
  I("James K. Polk",       "Democrat (USA)",   "e1", ["pm","trade","foreign","leader"],    [66,76,64,78,72],
    "Eleventh President; Mexican–American War won Texas and California for the United States.",
    { wiki: "James K. Polk" });
  I("Abraham Lincoln",     "Republican (USA)", "e1", ["pm","leader","justice"],           [90,78,92,94,86],
    "Sixteenth President; held the Union through Civil War and issued the Emancipation Proclamation.",
    { wiki: "Abraham Lincoln" });
  I("William McKinley",    "Republican (USA)", "e2", ["pm","trade","foreign","leader"],   [72,78,70,74,78],
    "25th President; Spanish-American War, 'Full Dinner Pail' prosperity, assassinated 1901.",
    { wiki: "William McKinley" });
  I("William Howard Taft", "Republican (USA)", "e2", ["pm","justice","trade","leader"],   [62,82,60,74,64],
    "27th President, later Chief Justice; trust-buster who split from Roosevelt's progressive wing.",
    { wiki: "William Howard Taft" });
  I("Warren G. Harding",   "Republican (USA)", "e3", ["pm","leader"],                    [66,66,68,52,68],
    "29th President; 'Return to Normalcy' but the Tea Pot Dome scandal tainted his legacy.",
    { wiki: "Warren G. Harding" });
  I("Calvin Coolidge",     "Republican (USA)", "e3", ["pm","chancellor","trade","leader"],[64,74,56,66,68],
    "30th President; Silent Cal, roaring twenties prosperity and minimal government.",
    { wiki: "Calvin Coolidge" });
  I("Herbert Hoover",      "Republican (USA)", "e3", ["pm","trade","chancellor","leader"],[62,82,58,60,60],
    "31st President; great humanitarian administrator, terrible president through the Great Depression.",
    { wiki: "Herbert Hoover" });
  I("George W. Bush",      "Republican (USA)", "e7", ["pm","defence","foreign","leader"], [64,72,60,62,72],
    "43rd President; post-9/11 wars in Afghanistan and Iraq, Katrina response failures.",
    { wiki: "George W. Bush" });
  I("Barack Obama",        "Democrat (USA)",   "e7", ["pm","foreign","health","leader"],  [90,72,94,82,80],
    "44th President; first African-American president, ACA, killed Bin Laden, Nobel Peace Prize.",
    { wiki: "Barack Obama" });
  I("Donald Trump",        "Republican (USA)", "e7", ["pm","trade","leader"],             [72,68,76,58,74],
    "45th and 47th President; tax cuts, trade wars, Capitol riot and 'America First' nationalism.",
    { wiki: "Donald Trump" });
  I("Joe Biden",           "Democrat (USA)",   "e7", ["pm","foreign","leader"],           [68,90,66,72,74],
    "46th President; Covid recovery, student debt, Ukraine aid and age-shaped exit from 2024 race.",
    { wiki: "Joe Biden" });
  I("Al Gore",             "Democrat (USA)",   "e6", ["pm","environment","foreign","leader"],[76,78,74,78,66],
    "VP and 2000 election loser by 537 Florida votes; climate campaigner and Nobel Peace Prize winner.",
    { wiki: "Al Gore" });
  I("Dick Cheney",         "Republican (USA)", "e7", ["pm","defence","foreign","leader"], [52,90,50,68,76],
    "VP to Bush 43; dark-horse power broker, architect of the Iraq War's legal framework.",
    { wiki: "Dick Cheney" });
  I("Kamala Harris",       "Democrat (USA)",   "e7", ["pm","justice","leader"],           [72,72,74,66,68],
    "First female, Black and South Asian VP; 2024 Democratic nominee who lost to Trump.",
    { wiki: "Kamala Harris" });
  I("Mike Pence",          "Republican (USA)", "e7", ["pm","leader","home"],              [56,74,58,62,68],
    "VP under Trump; refused to overturn 2020 election results, became a pariah to MAGA base.",
    { wiki: "Mike Pence" });
  I("Hillary Clinton",     "Democrat (USA)",   "e7", ["pm","foreign","leader"],           [74,86,72,80,72],
    "First Lady, Senator, SecState, 2016 Democratic nominee; lost Electoral College to Trump.",
    { wiki: "Hillary Clinton" });
  I("Colin Powell",        "Republican (USA)", "e6", ["foreign","defence","leader"],      [80,90,78,82,72],
    "First Black Chairman of the Joint Chiefs and Secretary of State; Iraq WMD speech haunted him.",
    { wiki: "Colin Powell" });
  I("Condoleezza Rice",    "Republican (USA)", "e7", ["foreign","education","leader"],    [74,88,74,80,68],
    "First Black female National Security Adviser and Secretary of State; Sovietologist and pianist.",
    { wiki: "Condoleezza Rice" });
  I("John Kerry",          "Democrat (USA)",   "e7", ["foreign","environment","leader"],  [70,84,70,76,62],
    "2004 Democratic nominee, then SecState; Iran nuclear deal and Paris Climate Accord champion.",
    { wiki: "John Kerry" });
  I("Bernie Sanders",      "Democrat (USA)",   "e7", ["pm","health","chancellor","leader"],[82,72,82,68,64],
    "Independent Senator turned Democratic socialist; Medicare for All and the squad movement.",
    { wiki: "Bernie Sanders" });
  I("Elizabeth Warren",    "Democrat (USA)",   "e7", ["chancellor","justice","leader"],   [76,74,78,76,68],
    "Senator and 2020 candidate; Consumer Financial Protection Bureau founder and Wall St. scourge.",
    { wiki: "Elizabeth Warren" });
  I("John McCain",         "Republican (USA)", "e7", ["pm","defence","foreign","leader"], [80,90,78,78,70],
    "Vietnam POW, Senator, 2008 Republican nominee; maverick whose thumbs-down killed ACA repeal.",
    { wiki: "John McCain" });
  I("Ted Kennedy",         "Democrat (USA)",   "e5", ["pm","health","justice","leader"],  [80,88,84,76,80],
    "Lion of the Senate; champion of healthcare reform whose 1980 primary challenge divided Democrats.",
    { wiki: "Ted Kennedy" });
  I("Robert F. Kennedy",   "Democrat (USA)",   "e4", ["pm","justice","foreign","leader"], [88,66,84,76,72],
    "Attorney General, Senator, 1968 presidential candidate; assassinated after California primary win.",
    { wiki: "Robert F. Kennedy" });
  I("Henry Kissinger",     "Republican (USA)", "e5", ["foreign","defence","leader"],      [68,90,68,88,60],
    "National Security Adviser and Secretary of State; opening China, Vietnam peace and Nobel Peace Prize.",
    { wiki: "Henry Kissinger" });
  I("Douglas MacArthur",   "Republican (USA)", "e3", ["defence","leader","foreign"],      [74,88,76,80,66],
    "Supreme Commander Pacific; 'Old soldiers never die', sacked by Truman for insubordination.",
    { wiki: "Douglas MacArthur" });

  /* ==========================================================================
     Germany — Weimar era additions and modern Bundestag figures
     ========================================================================== */
  I("Gustav Stresemann",   "DVP",              "e3", ["pm","foreign","chancellor","leader"],[74,82,76,84,70],
    "Weimar Foreign Minister; Locarno Treaties, League of Nations entry, Nobel Peace Prize 1926.",
    { wiki: "Gustav Stresemann" });
  I("Heinrich Brüning",    "Zentrum",          "e3", ["pm","chancellor","leader"],         [60,82,60,68,64],
    "Weimar Chancellor 1930–32; austerity under Depression, ruling by emergency decree.",
    { wiki: "Heinrich Brüning" });
  I("Franz von Papen",     "Zentrum",          "e3", ["pm","leader","home"],               [58,76,60,56,60],
    "Weimar Chancellor 1932 who miscalculated Hitler could be tamed — the worst mistake in German history.",
    { wiki: "Franz von Papen" });
  I("Hermann Göring",      "NSDAP",            "e3", ["pm","defence","home","leader"],     [70,72,70,56,78],
    "Luftwaffe commander and second man to Hitler; collected art and ran the Holocaust machinery.",
    { wiki: "Hermann Göring", despot: true });
  I("Joseph Goebbels",     "NSDAP",            "e3", ["culture","leader","pm"],            [58,72,82,58,80],
    "Nazi propaganda minister; master of the 'big lie', poisoned his six children before suicide in 1945.",
    { wiki: "Joseph Goebbels", despot: true });
  I("Heinrich Himmler",    "NSDAP",            "e3", ["home","leader","defence"],          [48,78,44,56,86],
    "SS Reichsführer and architect of the Holocaust; Germany's most feared bureaucrat of murder.",
    { wiki: "Heinrich Himmler", despot: true });
  I("Konrad Adenauer",     "CDU",              "e4", ["pm","foreign","leader","trade"],    [80,88,74,86,82],
    "First Federal Chancellor of West Germany; Wirtschaftswunder, NATO membership, Franco-German rapprochement.",
    { wiki: "Konrad Adenauer" });
  I("Ludwig Erhard",       "CDU",              "e4", ["chancellor","trade","pm","leader"], [72,84,66,84,70],
    "Father of the 'social market economy'; architect of West Germany's postwar economic miracle.",
    { wiki: "Ludwig Erhard" });
  I("Willy Brandt",        "SPD (DE)",         "e5", ["pm","foreign","leader","trade"],    [84,82,84,84,78],
    "Chancellor 1969–74; Ostpolitik, Warsaw genuflection, Nobel Peace Prize, but the Guillaume spy affair.",
    { wiki: "Willy Brandt" });
  I("Helmut Schmidt",      "SPD (DE)",         "e5", ["pm","chancellor","defence","leader"],[76,88,74,84,76],
    "Chancellor 1974–82; fiscal realist, NATO double-track decision, called Thatcher 'the iron lady'.",
    { wiki: "Helmut Schmidt" });
  I("Helmut Kohl",         "CDU",              "e5", ["pm","foreign","leader","trade"],    [74,90,66,86,84],
    "Chancellor 1982–98; masterminded German reunification and the euro, shaped post-Cold War Europe.",
    { wiki: "Helmut Kohl" });
  I("Gerhard Schröder",    "SPD (DE)",         "e6", ["pm","trade","chancellor","leader"], [74,80,76,76,78],
    "Chancellor 1998–2005; Agenda 2010 labour reforms and opposed the Iraq War.",
    { wiki: "Gerhard Schröder" });
  I("Angela Merkel",       "CDU",              "e7", ["pm","foreign","trade","leader"],    [80,92,70,90,86],
    "Chancellor 2005–21; physics PhD, four terms, Eurozone rescue, refugee welcome and steady pragmatism.",
    { wiki: "Angela Merkel" });
  I("Olaf Scholz",         "SPD (DE)",         "e7", ["pm","chancellor","leader"],         [62,78,60,66,68],
    "Chancellor from 2021; traffic-light coalition, Ukraine support and 'Zeitenwende' rearmament.",
    { wiki: "Olaf Scholz" });
  I("Friedrich Merz",      "CDU",              "e7", ["chancellor","trade","leader"],      [64,76,66,68,72],
    "CDU leader and likely next Chancellor; lawyer, businessman and trans-Atlantic hawk.",
    { wiki: "Friedrich Merz" });
  I("Robert Habeck",       "Greens (DE)",      "e7", ["environment","chancellor","leader"],[72,70,76,72,66],
    "Greens economy minister; oversaw the energy transition but LNG terminals replaced Russian gas.",
    { wiki: "Robert Habeck" });
  I("Alice Weidel",        "AfD",              "e7", ["pm","chancellor","leader"],         [62,68,68,58,74],
    "AfD party leader; economist and provocateur who took the far right into mainstream German politics.",
    { wiki: "Alice Weidel" });

  /* ==========================================================================
     France — Presidents and Prime Ministers
     ========================================================================== */
  I("Georges Clemenceau",  "Radical (FR)",     "e2", ["pm","defence","foreign","leader"],  [82,84,84,82,74],
    "The Tiger; PM through WWI, drove the Treaty of Versailles and French victory.",
    { wiki: "Georges Clemenceau" });
  I("Léon Blum",          "Parti Socialiste", "e3", ["pm","chancellor","trade","leader"],  [78,82,84,76,76],
    "First socialist and first Jewish PM of France; Popular Front government, 40-hour week, paid holidays.",
    { wiki: "Léon Blum" });
  I("Philippe Pétain",     "Dictators",        "e3", ["pm","defence","leader"],             [62,82,66,56,72],
    "WWI hero turned Vichy collaborator; executed Dreyfus affair fighter, then sent Jews to their deaths.",
    { wiki: "Philippe Pétain", despot: true });
  I("Charles de Gaulle",   "RPR",              "e4", ["pm","defence","foreign","leader"],   [88,82,88,88,80],
    "Free French leader, liberator of Paris, Fifth Republic founder; 'la France c'est moi'.",
    { wiki: "Charles de Gaulle" });
  I("Georges Pompidou",    "RPR",              "e4", ["pm","culture","foreign","leader"],   [72,84,70,78,76],
    "PM then President; modernised France with motorways and the eponymous arts centre.",
    { wiki: "Georges Pompidou" });
  I("Valéry Giscard d'Estaing","UMP",         "e5", ["pm","chancellor","foreign","leader"],[70,82,72,76,70],
    "President 1974–81; abortion reform, 18-year-old vote and Franco-German engine of Europe.",
    { wiki: "Valéry Giscard d'Estaing" });
  I("François Mitterrand", "Parti Socialiste", "e5", ["pm","culture","leader","foreign"],   [82,84,82,80,82],
    "Socialist president 1981–95; 39-hour week, abolition of death penalty and European integration.",
    { wiki: "François Mitterrand" });
  I("Jacques Chirac",      "RPR",              "e6", ["pm","foreign","leader","trade"],     [74,86,74,72,78],
    "President 1995–2007; opposed Iraq War, firm on secularism and anti-corruption never quite stuck.",
    { wiki: "Jacques Chirac" });
  I("Nicolas Sarkozy",     "UMP",              "e7", ["pm","home","foreign","leader"],      [72,78,76,70,74],
    "President 2007–12; the bling president, active during the financial crisis and the Libya intervention.",
    { wiki: "Nicolas Sarkozy" });
  I("François Hollande",   "PS (FR)",          "e7", ["pm","chancellor","leader"],           [62,78,60,62,62],
    "Socialist president 2012–17; legalized same-sex marriage but left with 4% approval rating.",
    { wiki: "François Hollande" });
  I("Emmanuel Macron",     "LREM",             "e7", ["pm","foreign","chancellor","leader"], [76,72,78,76,70],
    "Former banker, youngest French president; En Marche! centrist upending of traditional politics.",
    { wiki: "Emmanuel Macron" });
  I("Marine Le Pen",       "Rassemblement National","e7",["pm","leader","home"],           [72,74,76,60,78],
    "RN leader who reached the presidential run-off twice; de-demonised her father's far-right party.",
    { wiki: "Marine Le Pen" });
  I("Jean-Luc Mélenchon", "La France Insoumise","e7",["pm","leader","trade","foreign"],   [74,74,82,64,68],
    "LFI leader; radical left tribune, three presidential runs and a talent for political spectacle.",
    { wiki: "Jean-Luc Mélenchon" });

  /* ==========================================================================
     Australia — Prime Ministers and party leaders
     ========================================================================== */
  I("Alfred Deakin",       "Liberal (AU)",     "e2", ["pm","trade","justice","leader"],    [76,80,78,78,74],
    "Second and multi-term PM; federation architect, White Australia Policy and New Protection.",
    { wiki: "Alfred Deakin" });
  I("John Curtin",         "Australian Labor Party","e3",["pm","defence","foreign","leader"],[82,78,80,82,80],
    "Wartime PM; faced down Churchill, invited MacArthur and mobilised Australia for the Pacific War.",
    { wiki: "John Curtin" });
  I("Ben Chifley",         "Australian Labor Party","e4",["pm","chancellor","trade","leader"],[76,80,72,78,76],
    "Labor PM 1945–49; 'Light on the Hill', the Sydney Harbour Bank and the Communist Party split.",
    { wiki: "Ben Chifley" });
  I("Robert Menzies",      "Liberal Party",    "e4", ["pm","foreign","leader"],            [78,86,76,80,82],
    "Australia's longest-serving PM; founder of the Liberal Party and Cold War loyalist.",
    { wiki: "Robert Menzies" });
  I("Gough Whitlam",       "Australian Labor Party","e5",["pm","foreign","health","leader"],[82,76,84,76,72],
    "PM 1972–75; Medicare's precursor, free uni tuition, recognised China — then sacked by the Governor-General.",
    { wiki: "Gough Whitlam" });
  I("Kim Beazley",         "Australian Labor Party","e6",["pm","defence","leader"],        [68,80,68,70,72],
    "Labor opposition leader twice; narrowly lost in 1998 and 2001, later ambassador to the USA.",
    { wiki: "Kim Beazley" });
  I("Peter Dutton",        "Liberal Party",    "e7", ["pm","home","defence","leader"],     [58,74,58,60,70],
    "Liberal leader; former home affairs minister and shadow PM seeking return to government.",
    { wiki: "Peter Dutton" });
  I("Penny Wong",          "Australian Labor Party","e7",["foreign","trade","leader"],     [74,78,74,74,70],
    "Foreign Minister; China relations reset, Pacific engagement and ASEAN diplomacy.",
    { wiki: "Penny Wong" });

  /* ==========================================================================
     Canada — Prime Ministers and party leaders
     ========================================================================== */
  I("Wilfrid Laurier",     "Liberal (CA)",     "e2", ["pm","trade","foreign","leader"],    [84,84,84,82,82],
    "First French-Canadian PM; Pacific railway, immigration boom and nation-building in the 'sunny ways'.",
    { wiki: "Wilfrid Laurier" });
  I("William Lyon Mackenzie King","Liberal (CA)","e3",["pm","trade","leader","home"],      [68,92,64,78,82],
    "Canada's longest-serving PM; WWI and WWII steering, sought advice from the spirit of his dead mother.",
    { wiki: "William Lyon Mackenzie King" });
  I("John Diefenbaker",    "Conservative (CA)","e4",["pm","justice","leader"],             [72,80,72,68,70],
    "PM 1957–63; 'Dief the Chief', Bill of Rights, but scrapping the Avro Arrow still smarts.",
    { wiki: "John Diefenbaker" });
  I("Lester Pearson",      "Liberal (CA)",     "e4", ["pm","foreign","leader"],            [80,84,78,82,76],
    "PM 1963–68; Nobel Peace Prize for Suez Canal solution, Canadian flag and universal healthcare.",
    { wiki: "Lester B. Pearson" });
  I("Kim Campbell",        "Conservative (CA)","e6",["pm","defence","justice","leader"],   [68,72,70,66,58],
    "Canada's only female PM — for 132 days; lost the 1993 election from 156 seats to 2.",
    { wiki: "Kim Campbell" });
  I("Mark Carney",         "Liberal (CA)",     "e7", ["pm","chancellor","trade","leader"], [74,78,70,80,66],
    "Former Bank of England and Bank of Canada governor who replaced Trudeau as Liberal leader.",
    { wiki: "Mark Carney" });
  I("Pierre Poilievre",    "Conservative (CA)","e7",["pm","chancellor","leader"],          [70,72,74,64,74],
    "Conservative leader; 'Captain Bitcoin', inflation hawk and scourge of 'gatekeepers'.",
    { wiki: "Pierre Poilievre" });
  I("Chrystia Freeland",   "Liberal (CA)",     "e7", ["chancellor","foreign","leader"],    [72,76,74,76,68],
    "Deputy PM and Finance Minister; CUSMA negotiator, Ukraine hawk and Trudeau's trusted lieutenant.",
    { wiki: "Chrystia Freeland" });
  I("Gilles Duceppe",      "Bloc Québécois",   "e7", ["pm","leader","culture"],            [70,76,72,68,74],
    "Long-serving BQ leader; Quebec sovereignist who fought five federal elections and nearly won one.",
    { wiki: "Gilles Duceppe" });

  /* ==========================================================================
     Japan — Prime Ministers and political leaders
     ========================================================================== */
  I("Itō Hirobumi",        "LDP (JP)",         "e2", ["pm","justice","foreign","leader"],  [78,86,72,84,80],
    "Japan's first Prime Minister; Meiji Constitution drafter and Korea's Resident-General.",
    { wiki: "Itō Hirobumi" });
  I("Tōjō Hideki",         "LDP (JP)",         "e3", ["pm","defence","leader"],             [56,80,54,56,74],
    "Wartime PM who ordered Pearl Harbor; hanged as a Class A war criminal in 1948.",
    { wiki: "Tōjō Hideki", despot: true });
  I("Hayato Ikeda",        "LDP (JP)",         "e4", ["pm","chancellor","trade","leader"],  [70,84,64,80,74],
    "PM 1960–64; 'income-doubling plan', turned Japan's political focus from security to economic growth.",
    { wiki: "Hayato Ikeda" });
  I("Eisaku Satō",         "LDP (JP)",         "e4", ["pm","foreign","trade","leader"],     [68,86,62,78,78],
    "Japan's longest-serving PM; Okinawa reversion, nuclear non-proliferation, Nobel Peace Prize.",
    { wiki: "Eisaku Satō" });
  I("Kakuei Tanaka",       "LDP (JP)",         "e5", ["pm","trade","infrastructure","leader"],[74,80,70,72,82],
    "Bulldozer PM; remodelling the Japanese archipelago and the Lockheed bribery scandal.",
    { wiki: "Kakuei Tanaka" });
  I("Ryutaro Hashimoto",   "LDP (JP)",         "e6", ["pm","chancellor","trade","leader"],  [68,82,64,72,74],
    "PM 1996–98; Big Bang financial reform and the Okinawa rape crisis.",
    { wiki: "Ryutaro Hashimoto" });
  I("Yukio Hatoyama",      "DPJ",              "e7", ["pm","foreign","leader"],              [62,72,62,58,58],
    "DPJ PM who promised to move Futenma base — and couldn't. Resigned after eight months.",
    { wiki: "Yukio Hatoyama" });
  I("Naoto Kan",           "DPJ",              "e7", ["pm","environment","leader"],          [64,74,62,60,60],
    "PM during the 3/11 Fukushima disaster; managed the nuclear crisis and the public anger.",
    { wiki: "Naoto Kan" });
  I("Taro Aso",            "LDP (JP)",         "e7", ["pm","chancellor","leader"],           [60,82,60,66,70],
    "PM 2008–09; stimulus spending through the GFC, later deputy PM and Finance Minister.",
    { wiki: "Tarō Asō" });
  I("Yoshihiko Noda",      "DPJ",              "e7", ["pm","chancellor","leader"],           [64,76,62,68,66],
    "Final DPJ PM; raised consumption tax and triggered the snap election that lost power.",
    { wiki: "Yoshihiko Noda" });
  I("Yōichi Masuzoe",      "LDP (JP)",         "e7", ["health","leader"],                   [62,72,62,60,56],
    "Health minister then Tokyo governor; healthcare reform architect who resigned in expenses scandal.",
    { wiki: "Yōichi Masuzoe" });
  I("Kōmei Hata",          "LDP (JP)",         "e6", ["pm","foreign","leader"],              [58,74,58,62,60],
    "Short-lived PM 1994 who fell as coalition member Kōmeitō withdrew over consumption tax.",
    { wiki: "Tsutomu Hata" });
  I("Kōichi Kaieda",       "DPJ",              "e7", ["pm","chancellor","leader"],           [56,72,58,60,56],
    "DPJ leader after Noda, suffered a string of electoral defeats in the wilderness years.",
    { wiki: "Banri Kaieda" });

  /* ==========================================================================
     India — Prime Ministers, Presidents, and key political figures
     ========================================================================== */
  I("Sardar Vallabhbhai Patel","INC",          "e4", ["pm","home","leader","justice"],      [84,80,76,86,82],
    "Iron Man of India; unified 562 princely states into the Indian republic through force and diplomacy.",
    { wiki: "Vallabhbhai Patel" });
  I("B.R. Ambedkar",       "BSP",              "e4", ["justice","education","leader"],       [82,82,84,82,70],
    "Father of the Indian Constitution; led the Dalit movement and converted to Buddhism in 1956.",
    { wiki: "B. R. Ambedkar" });
  I("Lal Bahadur Shastri", "INC",              "e4", ["pm","leader","defence","trade"],      [74,76,72,74,72],
    "PM 1964–66; 'Jai Jawan Jai Kisan', victory in the 1965 Indo-Pakistan war, died mysteriously in Tashkent.",
    { wiki: "Lal Bahadur Shastri" });
  I("Morarji Desai",       "INC",              "e5", ["pm","leader","chancellor"],           [62,84,60,66,60],
    "PM 1977–79; broke the Congress stranglehold, anti-prohibitionist (and urine drinker).",
    { wiki: "Morarji Desai" });
  I("Chandra Shekhar",     "INC",              "e5", ["pm","leader"],                        [56,74,56,58,58],
    "PM for just 7 months in 1990–91; minority government fell when Congress withdrew support.",
    { wiki: "Chandra Shekhar" });
  I("V.P. Singh",          "INC",              "e5", ["pm","justice","leader"],              [68,78,66,68,62],
    "PM 1989–90; implemented Mandal Commission reservations, triggering nationwide caste-politics shift.",
    { wiki: "V. P. Singh" });
  I("Sonia Gandhi",        "INC",              "e6", ["pm","leader"],                        [70,72,64,66,74],
    "INC president who led two election victories but declined the PM role; Italian by birth.",
    { wiki: "Sonia Gandhi" });
  I("L.K. Advani",         "BJP",              "e6", ["pm","home","leader","culture"],       [68,84,70,72,78],
    "BJP strongman; Rath Yatra sparked communal riots, senior leader overshadowed by Vajpayee and Modi.",
    { wiki: "L. K. Advani" });
  I("Pranab Mukherjee",    "INC",              "e7", ["pm","chancellor","foreign","leader"], [70,90,64,80,76],
    "Finance minister turned President of India; 'Man for all seasons' and BJP admirer.",
    { wiki: "Pranab Mukherjee" });
  I("Arvind Kejriwal",     "AAP",              "e7", ["pm","leader","education","health"],   [76,66,78,66,72],
    "Aam Aadmi Party founder; Delhi CM who pushed free water, electricity and school reform.",
    { wiki: "Arvind Kejriwal" });
  I("Amit Shah",           "BJP",              "e7", ["home","pm","leader","justice"],       [66,78,64,70,88],
    "Home Minister and BJP president; Modi's chief strategist and the man who scrapped Article 370.",
    { wiki: "Amit Shah" });
  I("Mamata Banerjee",     "INC",              "e7", ["pm","leader","home"],                 [76,76,78,68,74],
    "Chief Minister of West Bengal; TMC founder who defied the BJP and became a national opposition figure.",
    { wiki: "Mamata Banerjee" });

  /* ==========================================================================
     Soviet Union / Russia — additional Politburo and modern figures
     ========================================================================== */
  I("Felix Dzerzhinsky",   "CPSU",             "e3", ["home","leader","justice"],            [56,74,58,62,78],
    "Founder of the Cheka secret police; 'Iron Felix' built the Soviet surveillance apparatus.",
    { wiki: "Felix Dzerzhinsky", despot: true });
  I("Vyacheslav Molotov",  "CPSU",             "e3", ["foreign","pm","leader"],              [58,84,54,66,78],
    "Soviet FM; Molotov-Ribbentrop Pact signer and Stalin's foreign enforcer for decades.",
    { wiki: "Vyacheslav Molotov", despot: true });
  I("Georgy Zhukov",       "CPSU",             "e3", ["defence","leader","foreign"],         [78,86,70,78,70],
    "Marshal of Victory; greatest Soviet general who defeated Nazi Germany at Stalingrad and Berlin.",
    { wiki: "Georgy Zhukov" });
  I("Yuri Andropov",       "CPSU",             "e5", ["pm","home","leader"],                 [60,86,52,68,76],
    "KGB head turned General Secretary; fifteen months of reform before kidney failure killed him.",
    { wiki: "Yuri Andropov" });
  I("Konstantin Chernenko","CPSU",             "e5", ["pm","leader"],                        [44,80,44,50,68],
    "General Secretary for thirteen months; elderly, infirm caretaker between Andropov and Gorbachev.",
    { wiki: "Konstantin Chernenko" });
  I("Boris Yeltsin",       "United Russia",    "e6", ["pm","leader","chancellor","trade"],   [76,72,68,60,62],
    "First President of Russia; broke up the USSR, shock therapy economy and the 1993 tank moment.",
    { wiki: "Boris Yeltsin" });
  I("Alexei Navalny",      "United Russia",    "e7", ["pm","leader","justice","home"],       [82,64,84,70,66],
    "Anti-corruption blogger and opposition leader; twice poisoned, died in Arctic prison colony.",
    { wiki: "Alexei Navalny" });
  I("Dmitry Medvedev",     "United Russia",    "e7", ["pm","chancellor","trade","leader"],   [62,80,60,64,68],
    "President 2008–12 (while Putin was PM); digital Russia, 'reset' with Obama and Skolkovo.",
    { wiki: "Dmitry Medvedev" });
  I("Sergei Lavrov",       "United Russia",    "e7", ["foreign","leader"],                   [62,90,60,70,68],
    "Russia's Foreign Minister since 2004; marathon diplomat and holder of record UN vetoes.",
    { wiki: "Sergei Lavrov" });

  /* ==========================================================================
     China — additional CCP leaders and reformers
     ========================================================================== */
  I("Zhou Enlai",          "CCP",              "e4", ["pm","foreign","trade","leader"],      [84,88,80,86,82],
    "Premier of China 1949–76; Deng's mentor, pragmatic fixer and charming face of the PRC abroad.",
    { wiki: "Zhou Enlai" });
  I("Zhu De",              "CCP",              "e3", ["defence","leader"],                   [72,84,66,74,76],
    "Commander of the People's Liberation Army and co-founder of the Red Army.",
    { wiki: "Zhu De" });
  I("Liu Shaoqi",          "CCP",              "e4", ["pm","chancellor","leader"],            [68,82,62,74,74],
    "CCP president and Mao's heir-apparent until the Cultural Revolution; died in detention.",
    { wiki: "Liu Shaoqi" });
  I("Zhao Ziyang",         "CCP",              "e5", ["pm","chancellor","trade","leader"],   [72,82,68,78,70],
    "Reform PM and General Secretary; expressed sympathy for Tiananmen protesters and died under house arrest.",
    { wiki: "Zhao Ziyang" });
  I("Li Peng",             "CCP",              "e5", ["pm","energy","trade","leader"],       [56,84,50,64,74],
    "PM who signed the martial law declaration at Tiananmen; later chaired the NPC.",
    { wiki: "Li Peng", despot: true });
  I("Zhu Rongji",          "CCP",              "e6", ["pm","chancellor","trade","leader"],   [72,86,66,82,74],
    "PM 1998–2003; WTO accession, shuttered thousands of state enterprises and tackled corruption.",
    { wiki: "Zhu Rongji" });
  I("Wen Jiabao",          "CCP",              "e7", ["pm","trade","foreign","leader"],      [72,84,70,76,72],
    "Premier 2003–13; Sichuan earthquake response and 'Premier Wen the people's man' image.",
    { wiki: "Wen Jiabao" });
  I("Wang Yi",             "CCP",              "e7", ["foreign","leader"],                   [60,86,58,68,70],
    "Foreign Minister and director of CCP's foreign affairs commission; Wolf Warrior diplomacy chief.",
    { wiki: "Wang Yi" });
  I("Lin Biao",            "CCP",              "e4", ["defence","leader","pm"],              [62,78,60,62,70],
    "Mao's chosen successor who fled to the Soviet Union and died when his plane crashed in 1971.",
    { wiki: "Lin Biao", despot: true });

  /* ==========================================================================
     Cuba and Latin America — additions
     ========================================================================== */
  I("Salvador Allende",    "Worker's Party (BR)","e5",["pm","health","chancellor","leader"],[82,78,84,74,74],
    "Chile's elected socialist president; overthrown by Pinochet's US-backed coup in 1973.",
    { wiki: "Salvador Allende" });
  I("Augusto Pinochet",    "Dictators",        "e5", ["pm","defence","trade","leader"],      [58,80,54,60,78],
    "Chilean dictator 1973–90; Chicago Boys economics over concentration camps and disappearances.",
    { wiki: "Augusto Pinochet", despot: true });
  I("Nicolás Maduro",      "Revolutionaries",  "e7", ["pm","leader","home"],                 [58,72,60,48,72],
    "Chávez's successor; Venezuela's economic collapse, hyperinflation and mass emigration on his watch.",
    { wiki: "Nicolás Maduro", despot: true });
  I("Juan Perón",          "Peronist",         "e4", ["pm","leader","trade","home"],         [80,74,80,68,82],
    "Argentine strongman and three-time president; Peronism created a political tradition outlasting him.",
    { wiki: "Juan Perón" });
  I("Javier Milei",        "Dictators",        "e7", ["pm","chancellor","leader"],            [70,62,78,58,68],
    "Argentine libertarian president; chainsaw economist cutting the state and shocking the establishment.",
    { wiki: "Javier Milei" });
  I("Benito Juárez",       "PAN (MX)",         "e1", ["pm","justice","leader","education"],  [82,80,78,82,76],
    "Mexico's first indigenous president; Reform War victor and resisted French intervention.",
    { wiki: "Benito Juárez" });
  I("Lázaro Cárdenas",     "PRI",              "e3", ["pm","trade","environment","leader"],   [78,78,76,78,78],
    "Mexican president 1934–40; oil nationalisation, land reform and asylum for Trotsky.",
    { wiki: "Lázaro Cárdenas" });
  I("AMLO",                "Morena",           "e7", ["pm","health","trade","leader"],        [76,74,78,64,78],
    "Andrés Manuel López Obrador; Mexico's leftist president 2018–24, 'the Fourth Transformation'.",
    { wiki: "Andrés Manuel López Obrador" });

  /* ==========================================================================
     Turkey — Presidents and Prime Ministers
     ========================================================================== */
  I("Mustafa Kemal Atatürk","CHP (TR)",        "e3", ["pm","defence","education","leader"],  [88,80,84,88,84],
    "Founder of modern Turkey; abolished the Caliphate, secularised the state, changed the alphabet.",
    { wiki: "Mustafa Kemal Atatürk" });
  I("İsmet İnönü",         "CHP (TR)",         "e3", ["pm","leader","foreign"],              [72,86,66,76,74],
    "Atatürk's successor; kept Turkey neutral in WWII and oversaw the transition to multi-party democracy.",
    { wiki: "İsmet İnönü" });
  I("Süleyman Demirel",    "AKP",              "e5", ["pm","trade","leader","chancellor"],    [68,86,66,70,74],
    "Seven-time PM of Turkey; 'grandfather' figure who shaped Turkey's centrist right for decades.",
    { wiki: "Süleyman Demirel" });
  I("Bülent Ecevit",       "CHP (TR)",         "e5", ["pm","foreign","leader"],               [68,80,70,66,68],
    "Social-democratic PM who ordered the 1974 Cyprus invasion; poet and anti-corruption crusader.",
    { wiki: "Bülent Ecevit" });
  I("Recep Tayyip Erdoğan","AKP",              "e7", ["pm","leader","home","foreign"],        [76,80,78,68,86],
    "Turkey's dominant figure since 2002; Islamist roots, economic rise then inflation crisis.",
    { wiki: "Recep Tayyip Erdoğan" });

  /* ==========================================================================
     Israel — Prime Ministers and presidents
     ========================================================================== */
  I("David Ben-Gurion",    "Mapai",            "e4", ["pm","defence","leader","foreign"],    [86,82,82,86,82],
    "Israel's founding PM; declared independence, won the 1948 war and built the IDF.",
    { wiki: "David Ben-Gurion" });
  I("Golda Meir",          "Mapai",            "e5", ["pm","foreign","leader"],              [80,82,76,78,78],
    "Israel's first female PM; won the War of Attrition but caught off guard by Yom Kippur War.",
    { wiki: "Golda Meir" });
  I("Menachem Begin",      "Likud",            "e5", ["pm","foreign","leader","defence"],    [74,82,72,76,76],
    "First Likud PM; Camp David Accords with Egypt, but launched Lebanon war in 1982.",
    { wiki: "Menachem Begin" });
  I("Yitzhak Rabin",       "Mapai",            "e5", ["pm","defence","foreign","leader"],    [80,84,74,80,74],
    "Oslo Accords architect; Nobel Peace Prize winner, assassinated by Israeli extremist in 1995.",
    { wiki: "Yitzhak Rabin" });
  I("Shimon Peres",        "Mapai",            "e5", ["pm","foreign","trade","leader"],      [78,88,78,82,72],
    "State-builder, peace-maker and president; survived 60 years of Israeli politics with dignity.",
    { wiki: "Shimon Peres" });
  I("Ariel Sharon",        "Likud",            "e7", ["pm","defence","leader"],              [68,84,62,70,74],
    "General turned PM; disengagement from Gaza before a stroke ended his political life.",
    { wiki: "Ariel Sharon" });
  I("Benjamin Netanyahu",  "Likud",            "e7", ["pm","foreign","leader"],              [72,84,76,68,80],
    "Israel's longest-serving PM; multiple terms, corruption trials and the Gaza war from 2023.",
    { wiki: "Benjamin Netanyahu" });
  I("Yair Lapid",          "Likud",            "e7", ["pm","chancellor","leader"],            [70,68,72,66,68],
    "TV anchor turned centrist PM; Yesh Atid leader who formed the anti-Netanyahu coalition.",
    { wiki: "Yair Lapid" });

  /* ==========================================================================
     South Africa — Presidents and liberation figures
     ========================================================================== */
  I("Oliver Tambo",        "ANC",              "e5", ["pm","foreign","leader"],              [82,80,78,80,78],
    "ANC president in exile; kept the liberation movement alive internationally for 30 years.",
    { wiki: "Oliver Tambo" });
  I("Chris Hani",          "ANC",              "e6", ["pm","defence","leader","home"],       [80,72,80,76,72],
    "SACP and ANC leader; assassinated in 1993, his death nearly derailed the transition to democracy.",
    { wiki: "Chris Hani" });
  I("F.W. de Klerk",       "ANC",              "e6", ["pm","leader","justice","foreign"],    [68,82,64,74,72],
    "Last apartheid president; unbanned the ANC and released Mandela, shared Nobel Prize with him.",
    { wiki: "F. W. de Klerk" });
  I("Thabo Mbeki",         "ANC",              "e7", ["pm","foreign","trade","leader"],      [66,80,64,70,70],
    "Mandela's successor; AIDS denialism and Zimbabwe failure tarnished his respected intellectual image.",
    { wiki: "Thabo Mbeki" });
  I("Cyril Ramaphosa",     "ANC",              "e7", ["pm","trade","chancellor","leader"],   [74,80,72,72,72],
    "Post-Zuma President; Marikana massacre cloud, anti-corruption champion and labour negotiator.",
    { wiki: "Cyril Ramaphosa" });
  I("Jacob Zuma",          "ANC",              "e7", ["pm","leader","home"],                 [66,76,70,52,78],
    "South Africa's most corrupt president; 'state capture', shower jokes and 783 corruption charges.",
    { wiki: "Jacob Zuma" });

  /* ==========================================================================
     World Leaders — miscellaneous historical and modern
     ========================================================================== */
  /* Churchill is already in data.js as a UK figure; skip here */
  I("Ho Chi Minh",         "Revolutionaries",  "e4", ["pm","leader","foreign","defence"],    [82,80,82,78,82],
    "Founder of the Democratic Republic of Vietnam; led resistance against France and the USA.",
    { wiki: "Ho Chi Minh" });
  I("Jawaharlal Nehru",    "INC",              "e4", ["pm","foreign","education","leader"],  [86,84,86,84,80],
    "India's first PM; non-alignment, five-year plans and architect of the world's largest democracy.",
    { wiki: "Jawaharlal Nehru" });
  I("Leopold Senghor",     "World Leaders",    "e4", ["pm","culture","education","leader"],  [78,80,80,76,70],
    "First President of Senegal; founder of Négritude movement and the only African elected to the Académie française.",
    { wiki: "Léopold Sédar Senghor" });
  I("Václav Havel",        "Solidarity (PL)",  "e6", ["pm","culture","leader","foreign"],    [86,72,86,80,68],
    "Playwright turned dissident turned President; led the Velvet Revolution and reunited Czech democracy.",
    { wiki: "Václav Havel" });
  I("Lech Wałęsa",         "Solidarity (PL)",  "e6", ["pm","trade","leader"],                [82,70,80,72,72],
    "Solidarity electrician and Nobel Peace Prize winner who led Poland's transition from communism.",
    { wiki: "Lech Wałęsa" });
  I("Donald Tusk",         "Polish KO",        "e7", ["pm","foreign","leader","trade"],      [76,80,74,76,74],
    "Polish PM twice and European Council president; anti-PiS democrat and liberal standard-bearer.",
    { wiki: "Donald Tusk" });
  I("Viktor Orbán",        "Dictators",        "e7", ["pm","leader","home","foreign"],       [68,78,72,64,84],
    "Hungarian PM; 'illiberal democracy' architect, EU funds manipulation and Ukraine aid blocking.",
    { wiki: "Viktor Orbán" });
  I("Joschka Fischer",     "Greens (DE)",      "e6", ["foreign","environment","leader"],     [76,76,78,74,68],
    "German Green FM; went from street fighter to NATO advocate, led the party into government.",
    { wiki: "Joschka Fischer" });
  I("Bertrand Russell",    "Liberal",          "e3", ["education","leader","foreign"],       [82,80,90,78,50],
    "Nobel laureate philosopher and peace activist; anti-nuclear crusader and public intellectual.",
    { wiki: "Bertrand Russell" });
  I("Dag Hammarskjöld",    "World Leaders",    "e4", ["pm","foreign","leader"],              [82,84,80,86,68],
    "UN Secretary-General; expanded the UN's peacekeeping role, died mysteriously in a Congo plane crash.",
    { wiki: "Dag Hammarskjöld" });
  I("Boutros Boutros-Ghali","World Leaders",   "e6", ["pm","foreign","leader"],              [68,84,68,72,62],
    "Egyptian UN Secretary-General; clashed with the USA over Somalia and was not given a second term.",
    { wiki: "Boutros Boutros-Ghali" });
  I("Kofi Annan",          "World Leaders",    "e7", ["pm","foreign","leader","justice"],    [84,84,80,84,74],
    "Nobel Peace Prize UN Secretary-General; Iraq 'oil for food' scandal shadowed his third term.",
    { wiki: "Kofi Annan" });
  I("Aung San Suu Kyi",    "World Leaders",    "e7", ["pm","leader","justice","foreign"],    [80,72,78,68,66],
    "Myanmar democracy icon; Nobel Peace Prize, then protected the military over the Rohingya genocide.",
    { wiki: "Aung San Suu Kyi" });

  /* ==========================================================================
     Ireland — Taoisigh and key figures
     ========================================================================== */
  I("Éamon de Valera",     "Fianna Fáil",      "e3", ["pm","leader","foreign","home"],       [74,82,72,74,80],
    "Dominant figure in Irish politics for 50 years; republic, constitution, neutrality and de-Anglicisation.",
    { wiki: "Éamon de Valera" });
  I("Seán Lemass",         "Fianna Fáil",      "e4", ["pm","trade","chancellor","leader"],   [72,82,68,78,76],
    "Taoiseach 1959–66; opened Ireland to foreign investment, the EEC and economic modernisation.",
    { wiki: "Seán Lemass" });
  I("Garret FitzGerald",   "Fine Gael",        "e5", ["pm","foreign","chancellor","leader"], [76,80,74,78,70],
    "Taoiseach twice; Anglo-Irish Agreement, economic reform and constitutional crusade for pluralism.",
    { wiki: "Garret FitzGerald" });
  I("Charles Haughey",     "Fianna Fáil",      "e5", ["pm","culture","leader","chancellor"], [76,82,72,68,78],
    "Controversial Taoiseach three times; preached austerity while living lavishly on corrupt payments.",
    { wiki: "Charles Haughey" });
  I("Mary Robinson",       "Workers' Party (IE)","e6",["pm","justice","leader","foreign"],  [82,76,80,80,66],
    "Ireland's first female President; transformed the office and later became UN High Commissioner.",
    { wiki: "Mary Robinson" });
  I("Bertie Ahern",        "Fianna Fáil",      "e6", ["pm","leader","trade","home"],         [76,82,74,72,80],
    "Three-term Taoiseach; Good Friday Agreement co-architect, Celtic Tiger prosperity.",
    { wiki: "Bertie Ahern" });
  I("Enda Kenny",          "Fine Gael",        "e7", ["pm","trade","leader"],                [68,78,66,70,72],
    "Taoiseach 2011–17; Mayo man who steered Ireland through the bailout and marriage equality referendum.",
    { wiki: "Enda Kenny" });
  I("Leo Varadkar",        "Fine Gael",        "e7", ["pm","health","trade","leader"],       [72,72,74,68,68],
    "Ireland's first gay and mixed-heritage Taoiseach; Brexit backstop and marriage equality champion.",
    { wiki: "Leo Varadkar" });
  I("Gerry Adams",         "Sinn Féin",        "e6", ["pm","leader","foreign","home"],       [70,78,72,68,76],
    "Sinn Féin president; disputed IRA membership but central to peace process and partition debate.",
    { wiki: "Gerry Adams" });
  I("Mary Lou McDonald",   "Sinn Féin",        "e7", ["pm","leader","home","chancellor"],    [76,72,76,68,74],
    "Sinn Féin leader from 2018; took the party to its best ever results in both jurisdictions.",
    { wiki: "Mary Lou McDonald" });

  /* ==========================================================================
     Scandinavia and Netherlands
     ========================================================================== */
  I("Olof Palme",          "Swedish Social Democrats","e5",["pm","foreign","leader","trade"],[82,78,84,80,78],
    "Swedish PM; Third World solidarity, Vietnam war critic, assassinated in Stockholm in 1986.",
    { wiki: "Olof Palme" });
  I("Ingvar Carlsson",     "Swedish Social Democrats","e6",["pm","trade","leader"],          [68,80,66,70,72],
    "Palme's successor; negotiated Sweden into the EU.",
    { wiki: "Ingvar Carlsson" });
  I("Carl Bildt",          "Moderates (SE)",   "e6", ["pm","foreign","trade","leader"],      [70,80,70,74,70],
    "First centre-right Swedish PM in decades; Balkan peacemaker and later EU foreign policy chief.",
    { wiki: "Carl Bildt" });
  I("Ruud Lubbers",        "VVD",              "e5", ["pm","trade","chancellor","leader"],   [72,82,68,76,72],
    "Netherlands PM 1982–94; pragmatic Christian democrat who dominated Dutch politics for a decade.",
    { wiki: "Ruud Lubbers" });
  I("Wim Kok",             "Dutch Labour",     "e6", ["pm","trade","chancellor","leader"],   [70,80,66,72,70],
    "Dutch PM 1994–2002; trade union man turned free-market liberal, presided over 'purple coalition'.",
    { wiki: "Wim Kok" });
  I("Mark Rutte",          "VVD",              "e7", ["pm","trade","foreign","leader"],      [72,84,68,74,76],
    "Longest-serving Dutch PM; 'Teflon Mark', now NATO Secretary-General.",
    { wiki: "Mark Rutte" });

})();

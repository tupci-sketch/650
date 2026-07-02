/* =============================================================================
   650 — DYNASTY FILL
   Tops up under-strength national dynasties toward ~30 playable figures each,
   using only genuine, verifiable historical politicians. All figures are
   scope:"wild" and use canonical party labels that resolve to the correct
   country + lineage (see data.party_fix.js).
   Loaded after data.politicians11.js, before data.party_fix.js, so party_fix
   normalisation/registration still applies to anything added here.
   Stats: [appeal, experience, oratory, statecraft, partyMgmt]
   ============================================================================= */
window.G = window.G || {};
(function () {
  var G = window.G;
  G.POLITICIANS = G.POLITICIANS || [];
  G.PHOTO = G.PHOTO || {};

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
    if (extra.wiki) G.PHOTO[name] = { wiki: extra.wiki };
    G.POLITICIANS.push(fig);
  }

  /* ═══════════════════════════════════════════════════════════════
     UNITED STATES — Federalists · Whigs · Progressives
     ═══════════════════════════════════════════════════════════════ */
  I("Theodore Sedgwick",   "Federalist", "e0", ["pm","leader","justice"],            [58,66,60,60,58], "Federalist Speaker of the House and Senator from Massachusetts.", { wiki: "Theodore Sedgwick" });
  I("Benjamin Stoddert",   "Federalist", "e0", ["defence","business","leader"],      [55,62,52,60,56], "First Secretary of the Navy; built the early US fleet under Adams.", { wiki: "Benjamin Stoddert" });

  I("Rufus Choate",        "Whig (USA)", "e1", ["justice","leader","culture"],       [64,66,80,62,56], "Whig Senator and famed orator-advocate from Massachusetts.", { wiki: "Rufus Choate" });
  I("Willie P. Mangum",    "Whig (USA)", "e1", ["leader","foreign"],                 [56,66,60,58,58], "Whig Senator from North Carolina and President pro tempore.", { wiki: "Willie Person Mangum" });
  I("John M. Clayton",     "Whig (USA)", "e1", ["foreign","leader","justice"],       [58,68,62,64,58], "Whig Secretary of State; negotiated the Clayton–Bulwer Treaty.", { wiki: "John M. Clayton" });
  I("Thomas Ewing",        "Whig (USA)", "e1", ["chancellor","home","leader"],       [56,68,58,62,58], "Whig Treasury Secretary and first Interior Secretary.", { wiki: "Thomas Ewing" });
  I("William A. Graham",   "Whig (USA)", "e1", ["defence","leader"],                 [54,62,56,58,56], "Whig Navy Secretary and 1852 vice-presidential nominee.", { wiki: "William Alexander Graham" });
  I("George E. Badger",    "Whig (USA)", "e1", ["defence","justice","leader"],       [52,62,55,58,55], "Whig Navy Secretary and Senator from North Carolina.", { wiki: "George Edmund Badger" });

  I("William Borah",       "Progressive (USA)", "e2", ["foreign","leader","justice"],[70,74,82,66,58], "Progressive 'Lion of Idaho'; isolationist Senator and orator.", { wiki: "William Borah" });
  I("Frances Perkins",     "Progressive (USA)", "e3", ["work","home","leader"],      [66,76,66,74,64], "First woman Cabinet member; architect of Social Security.", { wiki: "Frances Perkins" });
  I("Harry Hopkins",       "Progressive (USA)", "e3", ["home","foreign","leader"],   [60,74,60,72,62], "FDR's closest aide; ran the WPA and wartime Lend-Lease.", { wiki: "Harry Hopkins" });
  I("Rexford Tugwell",     "Progressive (USA)", "e3", ["chancellor","work","education"],[56,66,60,64,54], "New Deal Brain Trust economist and Governor of Puerto Rico.", { wiki: "Rexford Tugwell" });

  /* ═══════════════════════════════════════════════════════════════
     AUSTRALIA — Labor · Liberal
     ═══════════════════════════════════════════════════════════════ */
  I("H.V. Evatt",          "Australian Labor Party", "e4", ["foreign","justice","leader"],[62,74,70,68,58], "Labor leader and first President of the UN General Assembly.", { wiki: "H. V. Evatt" });
  I("Arthur Calwell",      "Australian Labor Party", "e4", ["leader","home"],           [58,68,66,58,60], "Labor leader 1960–67; survived an assassination attempt in 1966.", { wiki: "Arthur Calwell" });
  I("Frank Forde",         "Australian Labor Party", "e3", ["pm","defence","leader"],   [52,62,54,56,56], "Australia's shortest-serving PM (eight days) in 1945.", { wiki: "Frank Forde" });
  I("Neville Wran",        "Australian Labor Party", "e5", ["leader","justice"],        [72,74,74,70,72], "Popular Labor Premier of New South Wales 1976–86.", { wiki: "Neville Wran" });
  I("Bob Carr",            "Australian Labor Party", "e6", ["foreign","leader","culture"],[68,74,72,68,66], "Longest-serving NSW Premier; later Foreign Minister.", { wiki: "Bob Carr" });
  I("Peter Beattie",       "Australian Labor Party", "e6", ["leader","health"],         [66,66,68,60,64], "Labor Premier of Queensland 1998–2007; 'Smart State' campaigner.", { wiki: "Peter Beattie" });
  I("Steve Bracks",        "Australian Labor Party", "e6", ["leader","chancellor"],     [64,66,62,64,62], "Labor Premier of Victoria 1999–2007.", { wiki: "Steve Bracks" });

  I("Billy Snedden",       "Liberal Party", "e5", ["leader","chancellor"],             [54,64,58,58,56], "Liberal leader 1972–75; later Speaker of the House.", { wiki: "Billy Snedden" });
  I("Brendan Nelson",      "Liberal Party", "e7", ["defence","education","leader"],     [58,60,62,58,54], "Liberal leader 2007–08; later ran the Australian War Memorial.", { wiki: "Brendan Nelson" });
  I("Peter Costello",      "Liberal Party", "e6", ["chancellor","leader"],             [66,78,70,74,64], "Australia's longest-serving Treasurer, 1996–2007.", { wiki: "Peter Costello" });
  I("Josh Frydenberg",     "Liberal Party", "e7", ["chancellor","business","leader"],  [64,64,66,64,60], "Liberal Treasurer 2018–22 who framed the COVID budgets.", { wiki: "Josh Frydenberg" });
  I("Jeff Kennett",        "Liberal Party", "e6", ["leader","business"],               [64,66,66,64,64], "Combative Liberal Premier of Victoria 1992–99.", { wiki: "Jeff Kennett" });
  I("Nick Greiner",        "Liberal Party", "e6", ["leader","chancellor"],             [58,64,58,64,60], "Liberal Premier of NSW; created the state's ICAC.", { wiki: "Nick Greiner" });
  I("Campbell Newman",     "Liberal Party", "e7", ["leader","business"],               [52,58,54,56,54], "LNP Premier of Queensland 2012–15.", { wiki: "Campbell Newman" });
  I("Colin Barnett",       "Liberal Party", "e7", ["leader","business","chancellor"],  [54,64,56,60,58], "Liberal Premier of Western Australia 2008–17.", { wiki: "Colin Barnett" });
  I("Ted Baillieu",        "Liberal Party", "e7", ["leader","culture"],                [52,58,56,56,54], "Liberal Premier of Victoria 2010–13.", { wiki: "Ted Baillieu" });

  /* ═══════════════════════════════════════════════════════════════
     CANADA — Liberals · Conservatives · NDP
     ═══════════════════════════════════════════════════════════════ */
  I("Edward Blake",        "Liberal (CA)", "e1", ["leader","justice"],                 [54,66,64,62,54], "Only federal Liberal leader never to become PM (1880–87).", { wiki: "Edward Blake" });
  I("John Manley",         "Liberal (CA)", "e6", ["chancellor","foreign","deputy"],    [58,66,58,64,58], "Liberal Deputy PM and Finance Minister under Chrétien.", { wiki: "John Manley" });
  I("Ralph Goodale",       "Liberal (CA)", "e6", ["chancellor","home","leader"],       [56,68,56,62,58], "Long-serving Liberal Finance and Public Safety Minister.", { wiki: "Ralph Goodale" });
  I("Anne McLellan",       "Liberal (CA)", "e6", ["justice","home","deputy"],          [56,64,56,62,56], "Liberal Deputy PM and Justice Minister; 'Landslide Annie'.", { wiki: "Anne McLellan" });
  I("Allan MacEachen",     "Liberal (CA)", "e5", ["chancellor","foreign","deputy"],    [54,70,58,64,60], "Liberal Deputy PM and master parliamentary tactician.", { wiki: "Allan MacEachen" });
  I("Bill Morneau",        "Liberal (CA)", "e7", ["chancellor","business"],            [54,58,52,58,52], "Liberal Finance Minister 2015–20.", { wiki: "Bill Morneau" });
  I("Dominic LeBlanc",     "Liberal (CA)", "e7", ["home","foreign","leader"],          [58,62,58,60,58], "Senior Liberal minister and close ally of Justin Trudeau.", { wiki: "Dominic LeBlanc" });
  I("Kathleen Wynne",      "Liberal (CA)", "e7", ["leader","education"],               [56,60,58,58,56], "Liberal Premier of Ontario 2013–18.", { wiki: "Kathleen Wynne" });
  I("Dalton McGuinty",     "Liberal (CA)", "e6", ["leader","education"],               [58,64,58,60,60], "Liberal Premier of Ontario 2003–13; 'the Education Premier'.", { wiki: "Dalton McGuinty" });
  I("Christy Clark",       "Liberal (CA)", "e7", ["leader","business"],                [58,60,60,58,56], "BC Liberal Premier 2011–17.", { wiki: "Christy Clark" });
  I("Frank McKenna",       "Liberal (CA)", "e6", ["leader","business","foreign"],      [60,64,60,62,60], "Liberal Premier of New Brunswick; later Ambassador to the US.", { wiki: "Frank McKenna" });

  I("Charles Tupper",      "Conservative (CA)", "e1", ["pm","foreign","leader"],       [54,70,60,62,58], "A Father of Confederation and briefly PM in 1896.", { wiki: "Charles Tupper" });
  I("John Abbott",         "Conservative (CA)", "e1", ["pm","chancellor","leader"],    [50,64,52,58,54], "Canada's first Canadian-born PM, 1891–92.", { wiki: "John Abbott (politician)" });
  I("John Thompson",       "Conservative (CA)", "e1", ["pm","justice","leader"],       [56,64,58,62,56], "Conservative PM 1892–94; died at Windsor Castle.", { wiki: "John Sparrow David Thompson" });
  I("Mackenzie Bowell",    "Conservative (CA)", "e1", ["pm","leader"],                 [46,60,48,52,50], "Conservative PM 1894–96, undone by a cabinet revolt.", { wiki: "Mackenzie Bowell" });
  I("Preston Manning",     "Conservative (CA)", "e6", ["leader","chancellor"],         [62,64,68,62,64], "Founder of the Reform Party that remade the Canadian right.", { wiki: "Preston Manning" });
  I("Peter MacKay",        "Conservative (CA)", "e7", ["foreign","defence","justice"], [60,64,60,62,58], "Last PC leader; senior minister who forged the merged party.", { wiki: "Peter MacKay" });
  I("Jason Kenney",        "Conservative (CA)", "e7", ["leader","home","business"],    [58,66,64,62,60], "Federal minister then United Conservative Premier of Alberta.", { wiki: "Jason Kenney" });
  I("Doug Ford",           "Conservative (CA)", "e7", ["leader","business"],           [58,58,58,56,58], "Progressive Conservative Premier of Ontario from 2018.", { wiki: "Doug Ford" });
  I("Mike Harris",         "Conservative (CA)", "e6", ["leader","chancellor"],         [56,62,58,60,60], "PC Premier of Ontario; the 'Common Sense Revolution'.", { wiki: "Mike Harris" });
  I("Ralph Klein",         "Conservative (CA)", "e6", ["leader","business"],           [62,62,62,58,60], "Popular PC Premier of Alberta 1992–2006.", { wiki: "Ralph Klein" });
  I("Brad Wall",           "Conservative (CA)", "e7", ["leader","business"],           [62,62,64,60,62], "Saskatchewan Party Premier 2007–18.", { wiki: "Brad Wall" });
  I("Danielle Smith",      "Conservative (CA)", "e7", ["leader","business"],           [54,56,60,54,56], "United Conservative Premier of Alberta from 2022.", { wiki: "Danielle Smith" });
  I("Jim Flaherty",        "Conservative (CA)", "e7", ["chancellor","business"],       [58,66,60,64,58], "Conservative Finance Minister who steered Canada through 2008.", { wiki: "Jim Flaherty" });
  I("John Baird",          "Conservative (CA)", "e7", ["foreign","home","leader"],     [56,62,62,58,56], "Conservative Foreign Affairs Minister under Harper.", { wiki: "John Baird" });
  I("Rona Ambrose",        "Conservative (CA)", "e7", ["leader","health","foreign"],   [58,60,58,58,56], "Interim Conservative leader 2015–17; environment minister.", { wiki: "Rona Ambrose" });
  I("Maxime Bernier",      "Conservative (CA)", "e7", ["foreign","business","leader"], [54,56,58,52,50], "Conservative minister who founded the People's Party.", { wiki: "Maxime Bernier" });
  I("Tony Clement",        "Conservative (CA)", "e7", ["health","business","home"],    [52,58,52,56,52], "Conservative Health and Industry Minister under Harper.", { wiki: "Tony Clement" });

  I("David Lewis",         "NDP", "e5", ["leader","justice"],                          [58,66,72,60,62], "NDP federal leader 1971–75; a founder of the party.", { wiki: "David Lewis (politician)" });
  I("Thomas Mulcair",      "NDP", "e7", ["leader","justice","foreign"],               [62,68,72,64,60], "NDP leader 2012–17; took the party to Official Opposition.", { wiki: "Tom Mulcair" });
  I("M.J. Coldwell",       "NDP", "e4", ["leader","chancellor"],                       [54,64,66,58,58], "CCF leader 1942–60, precursor to the NDP.", { wiki: "M. J. Coldwell" });
  I("J.S. Woodsworth",     "NDP", "e3", ["leader","work","justice"],                   [56,60,68,56,58], "Founding CCF leader and pioneer of Canadian social democracy.", { wiki: "J. S. Woodsworth" });
  I("Stephen Lewis",       "NDP", "e5", ["leader","foreign","culture"],               [62,60,78,58,58], "Ontario NDP leader and celebrated UN AIDS envoy.", { wiki: "Stephen Lewis" });
  I("Rachel Notley",       "NDP", "e7", ["leader","chancellor"],                       [62,60,66,60,62], "NDP Premier of Alberta 2015–19.", { wiki: "Rachel Notley" });
  I("John Horgan",         "NDP", "e7", ["leader","business"],                         [62,60,62,58,60], "Popular NDP Premier of British Columbia 2017–22.", { wiki: "John Horgan" });
  I("Roy Romanow",         "NDP", "e6", ["leader","chancellor","justice"],            [58,66,60,64,62], "NDP Premier of Saskatchewan; balanced the province's books.", { wiki: "Roy Romanow" });
  I("Gary Doer",           "NDP", "e6", ["leader","foreign"],                          [60,64,60,60,62], "NDP Premier of Manitoba; later Ambassador to the US.", { wiki: "Gary Doer" });
  I("Wab Kinew",           "NDP", "e7", ["leader","culture","education"],             [62,54,66,56,58], "NDP Premier of Manitoba from 2023; first First Nations premier.", { wiki: "Wab Kinew" });
  I("Darrell Dexter",      "NDP", "e7", ["leader","chancellor"],                       [54,58,56,56,56], "NDP Premier of Nova Scotia 2009–13.", { wiki: "Darrell Dexter" });
  I("David Eby",           "NDP", "e7", ["leader","justice","home"],                   [58,56,60,58,56], "NDP Premier of British Columbia from 2022.", { wiki: "David Eby" });
  I("Dave Barrett",        "NDP", "e5", ["leader","work"],                             [58,58,64,54,58], "First NDP Premier of British Columbia, 1972–75.", { wiki: "Dave Barrett" });
  I("Allan Blakeney",      "NDP", "e5", ["leader","chancellor","health"],             [56,66,60,64,60], "NDP Premier of Saskatchewan 1971–82; constitutional scholar.", { wiki: "Allan Blakeney" });
  I("Ed Schreyer",         "NDP", "e5", ["leader","foreign"],                          [56,62,56,58,56], "NDP Premier of Manitoba; later Governor General of Canada.", { wiki: "Ed Schreyer" });
  I("Howard Pawley",       "NDP", "e5", ["leader","justice"],                          [52,60,54,56,56], "NDP Premier of Manitoba 1981–88.", { wiki: "Howard Pawley" });
  I("Mike Harcourt",       "NDP", "e6", ["leader","home"],                             [54,60,56,56,56], "NDP Premier of British Columbia 1991–96.", { wiki: "Mike Harcourt" });
  I("Glen Clark",          "NDP", "e6", ["leader","business"],                         [52,56,56,52,54], "NDP Premier of British Columbia 1996–99.", { wiki: "Glen Clark" });
  I("Nathan Cullen",       "NDP", "e7", ["leader","environment","home"],              [58,56,64,54,54], "Prominent BC New Democrat MP and leadership contender.", { wiki: "Nathan Cullen" });
  I("Charlie Angus",       "NDP", "e7", ["culture","work","leader"],                   [58,56,64,52,52], "Northern Ontario New Democrat MP and author-musician.", { wiki: "Charlie Angus" });
  I("Niki Ashton",         "NDP", "e7", ["leader","work","education"],                 [54,52,60,50,50], "Left-wing Manitoba New Democrat MP and leadership contender.", { wiki: "Niki Ashton" });
  I("Peggy Nash",          "NDP", "e7", ["chancellor","work"],                         [52,54,56,52,52], "NDP finance critic and leadership contender from Toronto.", { wiki: "Peggy Nash" });

})();

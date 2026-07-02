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
  I("Libby Davies",        "NDP", "e7", ["home","health","leader"],                    [54,58,56,52,52], "Long-serving Vancouver New Democrat MP and House Leader.", { wiki: "Libby Davies" });
  I("Svend Robinson",      "NDP", "e6", ["justice","home","leader"],                   [56,58,62,52,50], "Pioneering BC New Democrat MP and human-rights campaigner.", { wiki: "Svend Robinson" });
  I("Blaine Higgs",        "Conservative (CA)", "e7", ["leader","chancellor"],         [52,58,52,56,54], "Progressive Conservative Premier of New Brunswick 2018–24.", { wiki: "Blaine Higgs" });
  I("Tim Houston",         "Conservative (CA)", "e7", ["leader","health"],             [56,56,58,56,56], "Progressive Conservative Premier of Nova Scotia from 2021.", { wiki: "Tim Houston" });

  /* ═══════════════════════════════════════════════════════════════
     INDIA — BJP
     ═══════════════════════════════════════════════════════════════ */
  I("Murli Manohar Joshi", "BJP", "e6", ["education","home","leader"],                 [56,68,60,58,58], "BJP elder and former party president; a Ram Janmabhoomi figurehead.", { wiki: "Murli Manohar Joshi" });
  I("Venkaiah Naidu",      "BJP", "e6", ["deputy","culture","leader"],                 [58,66,64,58,60], "BJP president turned Vice-President of India 2017–22.", { wiki: "Venkaiah Naidu" });
  I("Nitin Gadkari",       "BJP", "e7", ["transport","business","leader"],            [66,68,62,66,60], "BJP Roads Minister renowned for India's highway expansion.", { wiki: "Nitin Gadkari" });
  I("Shivraj Singh Chouhan","BJP", "e7", ["leader","work","home"],                    [62,68,60,62,64], "Long-serving BJP Chief Minister of Madhya Pradesh; 'Mama'.", { wiki: "Shivraj Singh Chouhan" });
  I("Vasundhara Raje",     "BJP", "e7", ["leader","culture"],                          [58,64,58,58,60], "BJP Chief Minister of Rajasthan and Scindia royal.", { wiki: "Vasundhara Raje" });
  I("B.S. Yediyurappa",    "BJP", "e7", ["leader","work"],                             [56,66,56,56,60], "BJP strongman and repeated Chief Minister of Karnataka.", { wiki: "B. S. Yediyurappa" });
  I("Manohar Lal Khattar", "BJP", "e7", ["leader","home"],                             [52,58,52,56,56], "BJP Chief Minister of Haryana 2014–24; RSS organiser.", { wiki: "Manohar Lal Khattar" });
  I("Kalyan Singh",        "BJP", "e6", ["leader","home"],                             [54,64,58,54,56], "BJP UP Chief Minister during the 1992 Babri demolition.", { wiki: "Kalyan Singh" });
  I("Uma Bharti",          "BJP", "e6", ["culture","environment","leader"],           [58,58,64,52,52], "Firebrand BJP sadhvi and Chief Minister of Madhya Pradesh.", { wiki: "Uma Bharti" });
  I("S. Jaishankar",       "BJP", "e7", ["foreign","leader"],                          [64,80,66,74,58], "Career diplomat turned BJP External Affairs Minister.", { wiki: "S. Jaishankar" });
  I("Piyush Goyal",        "BJP", "e7", ["chancellor","trade","business"],            [58,64,58,62,56], "BJP Commerce and Railways Minister; party floor manager.", { wiki: "Piyush Goyal" });
  I("Dharmendra Pradhan",  "BJP", "e7", ["education","business"],                      [56,60,54,58,56], "BJP Education and former Petroleum Minister from Odisha.", { wiki: "Dharmendra Pradhan" });
  I("Ravi Shankar Prasad", "BJP", "e7", ["justice","business","leader"],              [56,62,62,58,54], "BJP Law and IT Minister and senior party spokesman.", { wiki: "Ravi Shankar Prasad" });
  I("Sushil Kumar Modi",   "BJP", "e6", ["chancellor","deputy"],                       [52,62,54,58,56], "BJP Deputy Chief Minister of Bihar and GST architect.", { wiki: "Sushil Kumar Modi" });
  I("Bhupendra Patel",     "BJP", "e7", ["leader","business"],                         [50,54,48,54,54], "BJP Chief Minister of Gujarat from 2021.", { wiki: "Bhupendra Patel" });

  /* ═══════════════════════════════════════════════════════════════
     INDIA — Janata Dal / Janata family (janatal_in lineage)
     ═══════════════════════════════════════════════════════════════ */
  I("Ramakrishna Hegde",   "Janata Dal (IN)", "e5", ["leader","chancellor"],          [58,66,60,60,58], "Janata Chief Minister of Karnataka and reformist face of the party.", { wiki: "Ramakrishna Hegde" });
  I("S.R. Bommai",         "Janata Dal (IN)", "e5", ["leader","justice"],             [54,64,56,58,54], "Janata Dal Karnataka CM; namesake of the landmark federalism ruling.", { wiki: "S. R. Bommai" });
  I("Biju Patnaik",        "Janata Dal (IN)", "e4", ["leader","business","defence"],  [62,66,62,58,60], "Aviator-statesman and Janata Chief Minister of Odisha.", { wiki: "Biju Patnaik" });
  I("Devi Lal",            "Janata Dal (IN)", "e5", ["deputy","work","leader"],        [58,64,58,54,58], "Jat farmer-leader; Deputy PM and Haryana Chief Minister.", { wiki: "Devi Lal" });
  I("George Fernandes",    "Janata Dal (IN)", "e5", ["defence","work","leader"],       [64,68,70,58,56], "Firebrand trade-unionist; Defence Minister and socialist icon.", { wiki: "George Fernandes" });
  I("Sharad Yadav",        "Janata Dal (IN)", "e6", ["leader","work"],                [56,66,64,56,58], "Long-time Janata Dal (United) president and socialist stalwart.", { wiki: "Sharad Yadav" });
  I("Madhu Dandavate",     "Janata Dal (IN)", "e5", ["chancellor","transport"],       [54,62,58,58,52], "Janata finance and railways minister; introduced second-class sleeper.", { wiki: "Madhu Dandavate" });
  I("H.D. Kumaraswamy",    "Janata Dal (IN)", "e7", ["leader","work"],                [54,58,54,54,56], "JD(S) Chief Minister of Karnataka; Deve Gowda's son.", { wiki: "H. D. Kumaraswamy" });
  I("Karpoori Thakur",     "Janata Dal (IN)", "e5", ["leader","work","education"],    [58,60,58,54,56], "Socialist Chief Minister of Bihar; champion of OBC reservation.", { wiki: "Karpoori Thakur" });
  I("Raj Narain",          "Janata Dal (IN)", "e5", ["leader","home"],                [52,56,60,48,50], "Socialist giant-killer who defeated Indira Gandhi in 1977.", { wiki: "Raj Narain" });
  I("Ram Sundar Das",      "Janata Dal (IN)", "e5", ["leader"],                        [48,58,48,52,50], "Janata Chief Minister of Bihar and JD(U) MP.", { wiki: "Ram Sundar Das" });
  I("Jitan Ram Manjhi",    "Janata Dal (IN)", "e7", ["leader","work"],                [48,54,50,48,48], "Dalit leader and Chief Minister of Bihar; later HAM founder.", { wiki: "Jitan Ram Manjhi" });
  I("Upendra Kushwaha",    "Janata Dal (IN)", "e7", ["education","leader"],            [48,52,50,48,50], "JD(U) leader and Union Minister for OBC empowerment.", { wiki: "Upendra Kushwaha" });
  I("K.C. Tyagi",          "Janata Dal (IN)", "e7", ["leader"],                        [50,58,58,48,52], "Veteran socialist and JD(U) national spokesman.", { wiki: "K. C. Tyagi" });
  I("Om Prakash Chautala", "Lok Dal (IN)", "e6", ["leader","work"],                   [52,62,54,52,56], "INLD patriarch and repeated Chief Minister of Haryana.", { wiki: "Om Prakash Chautala" });
  I("Ajit Singh",          "Lok Dal (IN)", "e6", ["work","business","leader"],        [54,60,54,54,52], "RLD founder and Union Minister; Charan Singh's son.", { wiki: "Ajit Singh (Uttar Pradesh politician)" });

  /* ═══════════════════════════════════════════════════════════════
     CHINA — Kuomintang (ROC & Taiwan)
     ═══════════════════════════════════════════════════════════════ */
  I("Chiang Ching-kuo",    "Kuomintang", "e5", ["pm","leader","defence"],             [66,80,64,74,72], "ROC President who lifted martial law and democratised Taiwan.", { wiki: "Chiang Ching-kuo" });
  I("Lee Teng-hui",        "Kuomintang", "e6", ["pm","leader","foreign"],             [70,76,72,72,66], "'Father of Taiwan's democracy'; first directly-elected president.", { wiki: "Lee Teng-hui" });
  I("Lien Chan",           "Kuomintang", "e6", ["pm","foreign","leader"],             [54,70,56,62,60], "KMT chairman and Vice-President; opened cross-strait dialogue.", { wiki: "Lien Chan" });
  I("Wu Poh-hsiung",       "Kuomintang", "e6", ["leader","home"],                     [52,64,52,56,60], "KMT chairman and former Taipei mayor.", { wiki: "Wu Poh-hsiung" });
  I("Eric Chu",            "Kuomintang", "e7", ["leader","chancellor"],               [56,60,58,58,58], "KMT chairman and 2016 presidential nominee.", { wiki: "Eric Chu" });
  I("Hung Hsiu-chu",       "Kuomintang", "e7", ["leader","education"],                [52,56,60,50,54], "KMT chairwoman known as the 'Little Hot Pepper'.", { wiki: "Hung Hsiu-chu" });
  I("Han Kuo-yu",          "Kuomintang", "e7", ["leader"],                            [60,52,66,48,52], "Populist Kaohsiung mayor and 2020 KMT presidential nominee.", { wiki: "Han Kuo-yu" });
  I("Hau Pei-tsun",        "Kuomintang", "e5", ["pm","defence","leader"],             [54,74,54,64,60], "ROC Premier and general; hardline anti-communist.", { wiki: "Hau Pei-tsun" });
  I("Chen Cheng",          "Kuomintang", "e4", ["pm","defence","chancellor"],         [56,74,56,68,62], "ROC Premier and Vice-President; land reform architect on Taiwan.", { wiki: "Chen Cheng" });
  I("Yen Chia-kan",        "Kuomintang", "e5", ["pm","chancellor"],                   [46,68,46,58,52], "ROC President 1975–78, bridging the two Chiangs.", { wiki: "Yen Chia-kan" });
  I("H.H. Kung",           "Kuomintang", "e3", ["chancellor","business"],             [50,70,52,64,56], "ROC Finance Minister and one of the era's richest financiers.", { wiki: "H. H. Kung" });
  I("T.V. Soong",          "Kuomintang", "e3", ["chancellor","foreign","business"],   [54,72,56,66,58], "ROC Premier and financier; brother-in-law of Chiang Kai-shek.", { wiki: "T. V. Soong" });
  I("Sun Fo",              "Kuomintang", "e3", ["pm","leader"],                        [50,64,54,56,52], "ROC Premier and son of Sun Yat-sen.", { wiki: "Sun Fo" });
  I("Bai Chongxi",         "Kuomintang", "e3", ["defence","leader"],                  [58,72,56,60,58], "Nationalist 'War God' general and first ROC Defence Minister.", { wiki: "Bai Chongxi" });
  I("Yan Xishan",          "Kuomintang", "e3", ["leader","home","business"],          [54,70,52,58,60], "The 'Model Governor' warlord of Shanxi allied to the KMT.", { wiki: "Yan Xishan" });

  /* ═══════════════════════════════════════════════════════════════
     NORTH KOREA — Workers' Party officials
     ═══════════════════════════════════════════════════════════════ */
  I("Kim Tu-bong",         "Korean Workers' Party", "e4", ["leader","education"],     [44,60,48,50,54], "First WPK chairman; purged early by Kim Il-sung.", { wiki: "Kim Tu-bong" });
  I("Choe Yong-gon",       "Korean Workers' Party", "e4", ["defence","leader"],       [42,62,44,50,56], "WPK marshal and long-serving nominal head of state.", { wiki: "Choe Yong-gon (politician, born 1900)" });
  I("Kim Chaek",           "Korean Workers' Party", "e4", ["defence","business"],     [46,60,46,50,54], "Revolutionary general; an industrial city bears his name.", { wiki: "Kim Chaek" });
  I("Jo Yong-won",         "Korean Workers' Party", "e7", ["leader","home"],          [40,54,42,50,58], "Kim Jong-un's powerful organisation-secretary confidant.", { wiki: "Jo Yong-won" });
  I("Kim Tok-hun",         "Korean Workers' Party", "e7", ["pm","chancellor"],        [40,56,42,50,52], "WPK Premier of North Korea from 2020.", { wiki: "Kim Tok-hun" });
  I("Kim Ki-nam",          "Korean Workers' Party", "e6", ["culture","education"],    [42,62,50,48,54], "Long-serving WPK propaganda chief; the regime's 'Goebbels'.", { wiki: "Kim Ki-nam" });

  /* ═══════════════════════════════════════════════════════════════
     CUBA — Communist Party
     ═══════════════════════════════════════════════════════════════ */
  I("Guillermo García Frías","Communist Party (CU)", "e4", ["defence","leader"],      [46,64,48,50,54], "Comandante of the Revolution and Politburo veteran.", { wiki: "Guillermo García Frías" });
  I("Carlos Lage",         "Communist Party (CU)", "e6", ["chancellor","health","deputy"],[54,60,54,58,52], "Vice-President who ran the economy in the Special Period.", { wiki: "Carlos Lage" });
  I("José Ramón Fernández","Communist Party (CU)", "e5", ["defence","education"],     [50,64,52,56,52], "Bay of Pigs battlefield commander and education minister.", { wiki: "José Ramón Fernández" });
  I("Jorge Risquet",       "Communist Party (CU)", "e5", ["foreign","leader"],        [48,60,52,54,52], "Politburo member and key figure in Cuba's Africa policy.", { wiki: "Jorge Risquet" });

  /* ═══════════════════════════════════════════════════════════════
     RUSSIA — United Russia (post-Soviet)
     ═══════════════════════════════════════════════════════════════ */
  I("Boris Gryzlov",       "United Russia", "e7", ["leader","home"],                  [46,64,48,54,62], "Founding United Russia chairman and Duma speaker.", { wiki: "Boris Gryzlov" });
  I("Vyacheslav Volodin",  "United Russia", "e7", ["leader","justice"],              [44,64,50,56,64], "State Duma chairman and former Kremlin domestic-politics chief.", { wiki: "Vyacheslav Volodin" });
  I("Valentina Matviyenko","United Russia", "e7", ["leader","foreign"],             [48,68,52,58,60], "Chair of the Federation Council and former governor of St Petersburg.", { wiki: "Valentina Matviyenko" });
  I("Sergei Sobyanin",     "United Russia", "e7", ["leader","business","transport"], [52,66,50,60,58], "Powerful Mayor of Moscow and former Kremlin chief of staff.", { wiki: "Sergei Sobyanin" });

  /* ═══════════════════════════════════════════════════════════════
     INDIA — Congress top-up + a few more Janata-family figures
     ═══════════════════════════════════════════════════════════════ */
  I("K. Kamaraj",          "INC", "e4", ["leader","education","work"],                [60,68,60,64,66], "'Kingmaker' Congress president and Chief Minister of Madras.", { wiki: "K. Kamaraj" });
  I("Jagjivan Ram",        "INC", "e5", ["defence","deputy","work"],                  [58,72,62,62,60], "Dalit Congress giant; Deputy PM and 1971-war Defence Minister.", { wiki: "Jagjivan Ram" });
  I("Y.B. Chavan",         "INC", "e5", ["defence","home","deputy"],                  [56,70,58,62,58], "First Chief Minister of Maharashtra; Deputy PM and Defence Minister.", { wiki: "Y. B. Chavan" });
  I("Ram Vilas Paswan",    "Janata Dal (IN)", "e6", ["work","business","leader"],     [56,64,58,54,54], "Dalit leader and perennial Union Minister; LJP founder.", { wiki: "Ram Vilas Paswan" });
  I("Dushyant Chautala",   "Lok Dal (IN)", "e7", ["deputy","work"],                   [48,50,50,48,50], "JJP leader and Deputy Chief Minister of Haryana.", { wiki: "Dushyant Chautala" });

  /* ═══════════════════════════════════════════════════════════════
     FRANCE — Les Républicains · Radicals · RN · MRP · Gaullists · PS
     ═══════════════════════════════════════════════════════════════ */
  I("Christian Estrosi",   "Les Républicains", "e7", ["home","business","leader"],    [56,62,58,56,54], "LR Mayor of Nice and former Industry Minister.", { wiki: "Christian Estrosi" });
  I("Renaud Muselier",     "Les Républicains", "e7", ["leader","foreign"],            [52,58,54,54,52], "LR president of the Provence-Alpes-Côte d'Azur region.", { wiki: "Renaud Muselier" });
  I("Gaston Doumergue",    "Radical (FR)", "e2", ["pm","leader","foreign"],           [54,72,58,60,58], "Radical President of France and Third-Republic Premier.", { wiki: "Gaston Doumergue" });
  I("Théophile Delcassé",  "Radical (FR)", "e2", ["foreign","leader"],                [52,70,56,64,52], "Architect of the Entente Cordiale as Foreign Minister.", { wiki: "Théophile Delcassé" });
  I("Ferdinand Buisson",   "Radical (FR)", "e2", ["education","justice"],             [54,62,58,54,50], "Nobel-laureate radical; father of French secular schooling.", { wiki: "Ferdinand Buisson" });
  I("Wallerand de Saint-Just","Rassemblement National", "e7", ["chancellor","justice"],[46,56,52,52,52], "Long-time RN treasurer and Paris regional councillor.", { wiki: "Wallerand de Saint-Just" });
  I("Julien Odoul",        "Rassemblement National", "e7", ["home","leader"],         [48,50,58,46,48], "Prominent RN MP and party spokesman.", { wiki: "Julien Odoul" });
  I("Laurent Jacobelli",   "Rassemblement National", "e7", ["leader","culture"],      [48,50,56,46,48], "RN national spokesman and MP for Moselle.", { wiki: "Laurent Jacobelli" });
  I("Paul Bacon",          "MRP (FR)", "e4", ["work","health"],                       [48,60,50,54,50], "MRP Labour Minister across the Fourth and Fifth Republics.", { wiki: "Paul Bacon" });
  I("Robert Buron",        "MRP (FR)", "e4", ["transport","chancellor"],             [48,60,50,54,50], "MRP minister who signed the Évian Accords ending the Algerian War.", { wiki: "Robert Buron" });
  I("Pierre Abelin",       "MRP (FR)", "e5", ["foreign","chancellor"],               [46,58,48,52,48], "MRP minister for cooperation and centrist deputy.", { wiki: "Pierre Abelin" });
  I("Michèle Alliot-Marie","Gaullist", "e6", ["defence","justice","home"],           [58,72,60,64,58], "First woman to hold Defence, Interior and Justice in France.", { wiki: "Michèle Alliot-Marie" });
  I("Jean-Louis Debré",    "Gaullist", "e6", ["home","justice","leader"],            [54,68,58,60,56], "Gaullist Interior Minister and President of the Constitutional Council.", { wiki: "Jean-Louis Debré" });
  I("Philippe Douste-Blazy","Gaullist", "e6", ["health","foreign"],                  [52,62,54,56,50], "Gaullist Health and Foreign Minister; later UNITAID chief.", { wiki: "Philippe Douste-Blazy" });
  I("Roselyne Bachelot",   "Gaullist", "e6", ["health","culture"],                    [58,60,60,54,50], "Outspoken Gaullist Health and Culture Minister.", { wiki: "Roselyne Bachelot" });
  I("Xavier Darcos",       "Gaullist", "e6", ["education","work"],                     [52,62,56,56,50], "Gaullist Education and Labour Minister; academician.", { wiki: "Xavier Darcos" });
  I("Bernard Accoyer",     "Gaullist", "e6", ["leader","health"],                     [50,62,52,56,54], "Gaullist President of the National Assembly 2007–12.", { wiki: "Bernard Accoyer" });
  I("Bernard Cazeneuve",   "Parti Socialiste", "e7", ["pm","home","leader"],          [58,68,60,64,58], "Socialist Interior Minister then Prime Minister 2016–17.", { wiki: "Bernard Cazeneuve" });
  I("Jean-Marc Ayrault",   "Parti Socialiste", "e7", ["pm","foreign","leader"],       [54,66,56,60,58], "Socialist Prime Minister 2012–14 under Hollande.", { wiki: "Jean-Marc Ayrault" });
  I("Arnaud Montebourg",   "Parti Socialiste", "e7", ["business","chancellor","leader"],[56,58,66,52,50], "Socialist industry minister and champion of 'made in France'.", { wiki: "Arnaud Montebourg" });
  I("Najat Vallaud-Belkacem","Parti Socialiste", "e7", ["education","culture"],       [58,58,62,54,52], "First woman Education Minister of France.", { wiki: "Najat Vallaud-Belkacem" });
  I("Olivier Faure",       "Parti Socialiste", "e7", ["leader"],                       [52,58,56,54,56], "First Secretary of the Socialist Party from 2018.", { wiki: "Olivier Faure" });
  I("Marisol Touraine",    "Parti Socialiste", "e7", ["health","work"],               [52,58,52,56,50], "Socialist Health Minister 2012–17.", { wiki: "Marisol Touraine" });
  I("Stéphane Le Foll",    "Parti Socialiste", "e7", ["environment","culture","leader"],[52,58,56,54,52], "Socialist Agriculture Minister and government spokesman.", { wiki: "Stéphane Le Foll" });
  I("Jean-Christophe Cambadélis","Parti Socialiste", "e6", ["leader"],               [48,60,54,52,54], "First Secretary of the Socialist Party 2014–17.", { wiki: "Jean-Christophe Cambadélis" });
  I("Élisabeth Guigou",    "Parti Socialiste", "e6", ["justice","foreign"],           [52,64,54,58,50], "Socialist Justice Minister who introduced the PACS civil union.", { wiki: "Élisabeth Guigou" });

  /* ═══════════════════════════════════════════════════════════════
     GERMANY — active parties: CDU/CSU · AfD · FDP · Greens · Die Linke · KPD
     ═══════════════════════════════════════════════════════════════ */
  I("Daniel Günther",      "CDU/CSU", "e7", ["leader"],                                [58,60,56,58,58], "CDU Minister-President of Schleswig-Holstein.", { wiki: "Daniel Günther" });
  I("Hendrik Wüst",        "CDU/CSU", "e7", ["leader","transport"],                    [56,58,56,56,56], "CDU Minister-President of North Rhine-Westphalia.", { wiki: "Hendrik Wüst" });
  I("Jens Spahn",          "CDU/CSU", "e7", ["health","leader"],                       [56,58,60,54,54], "CDU Health Minister during the pandemic.", { wiki: "Jens Spahn" });
  I("Sebastian Münzenmaier","AfD", "e7", ["business","leader"],                        [46,50,52,46,50], "AfD Bundestag deputy leader from Rhineland-Palatinate.", { wiki: "Sebastian Münzenmaier" });
  I("Bernd Baumann",       "AfD", "e7", ["leader"],                                    [44,52,52,48,52], "AfD chief whip in the Bundestag.", { wiki: "Bernd Baumann" });
  I("Peter Boehringer",    "AfD", "e7", ["chancellor","business"],                     [44,52,50,48,48], "AfD chair of the Bundestag budget committee.", { wiki: "Peter Boehringer" });
  I("Wolfgang Kubicki",    "FDP", "e7", ["justice","leader"],                          [58,64,66,56,56], "FDP Deputy Bundestag President and party heavyweight.", { wiki: "Wolfgang Kubicki" });
  I("Marco Buschmann",     "FDP", "e7", ["justice","leader"],                          [54,58,56,56,54], "FDP Justice Minister in the traffic-light coalition.", { wiki: "Marco Buschmann" });
  I("Bettina Stark-Watzinger","FDP", "e7", ["education","chancellor"],                 [50,54,52,54,50], "FDP Education and Research Minister.", { wiki: "Bettina Stark-Watzinger" });
  I("Volker Wissing",      "FDP", "e7", ["transport","business"],                      [50,56,50,54,50], "FDP Transport and Digital Minister.", { wiki: "Volker Wissing" });
  I("Alexander Graf Lambsdorff","FDP", "e7", ["foreign","leader"],                     [52,60,54,56,50], "FDP foreign-policy voice and Ambassador to Russia.", { wiki: "Alexander Graf Lambsdorff" });
  I("Christian Dürr",      "FDP", "e7", ["chancellor","leader"],                       [50,54,54,52,52], "FDP Bundestag parliamentary group leader.", { wiki: "Christian Dürr" });
  I("Marie-Agnes Strack-Zimmermann","FDP", "e7", ["defence","leader"],                [54,58,62,52,52], "FDP chair of the Bundestag defence committee.", { wiki: "Marie-Agnes Strack-Zimmermann" });
  I("Nicola Beer",         "FDP", "e7", ["foreign","education"],                       [50,56,52,54,50], "FDP Vice-President of the European Parliament.", { wiki: "Nicola Beer" });
  I("Sabine Leutheusser-Schnarrenberger","FDP", "e6", ["justice"],                     [54,64,56,58,50], "Two-time FDP Justice Minister and civil-liberties champion.", { wiki: "Sabine Leutheusser-Schnarrenberger" });
  I("Gerhart Baum",        "FDP", "e5", ["home","justice"],                            [52,66,56,56,50], "Liberal FDP Interior Minister and human-rights advocate.", { wiki: "Gerhart Baum" });
  I("Wolfgang Mischnick",  "FDP", "e5", ["leader"],                                    [50,66,52,56,58], "Long-serving FDP Bundestag group leader.", { wiki: "Wolfgang Mischnick" });
  I("Erich Mende",         "FDP", "e4", ["leader","deputy"],                           [50,64,54,54,56], "FDP chairman and Vice-Chancellor in the 1960s.", { wiki: "Erich Mende" });
  I("Thomas Dehler",       "FDP", "e4", ["justice","leader"],                          [52,62,60,54,52], "First Justice Minister of West Germany and FDP chairman.", { wiki: "Thomas Dehler" });
  I("Rainer Brüderle",     "FDP", "e7", ["business","chancellor"],                     [52,60,56,54,52], "FDP Economics Minister and 2013 lead candidate.", { wiki: "Rainer Brüderle" });
  I("Hermann Otto Solms",  "FDP", "e6", ["chancellor","leader"],                       [48,62,50,56,52], "FDP finance spokesman and Bundestag Vice-President.", { wiki: "Hermann Otto Solms" });
  I("Katja Suding",        "FDP", "e7", ["education","leader"],                        [52,52,54,50,48], "FDP Hamburg leader and deputy federal chair.", { wiki: "Katja Suding" });
  I("Ricarda Lang",        "Greens (DE)", "e7", ["leader","work"],                     [52,52,56,50,54], "Co-leader of the Greens 2022–24.", { wiki: "Ricarda Lang" });
  I("Omid Nouripour",      "Greens (DE)", "e7", ["leader","foreign"],                  [52,54,56,52,52], "Iranian-born co-leader of the Greens 2022–24.", { wiki: "Omid Nouripour" });
  I("Anton Hofreiter",     "Greens (DE)", "e7", ["environment","transport","leader"],  [52,58,58,52,50], "Green Bundestag group co-leader and Europe committee chair.", { wiki: "Anton Hofreiter" });
  I("Britta Haßelmann",    "Greens (DE)", "e7", ["leader"],                            [50,56,54,52,54], "Green Bundestag parliamentary group co-leader.", { wiki: "Britta Haßelmann" });
  I("Steffi Lemke",        "Greens (DE)", "e7", ["environment"],                       [50,56,52,54,52], "Green Federal Environment Minister from 2021.", { wiki: "Steffi Lemke" });
  I("Franziska Brantner",  "Greens (DE)", "e7", ["business","foreign"],               [50,52,52,52,50], "Green economics state-secretary and co-leader.", { wiki: "Franziska Brantner" });
  I("Reinhard Bütikofer",  "Greens (DE)", "e6", ["foreign","leader"],                 [50,60,54,52,52], "Green party co-chair and MEP on China policy.", { wiki: "Reinhard Bütikofer" });
  I("Volker Beck",         "Greens (DE)", "e6", ["justice","home"],                   [50,58,56,50,48], "Green rights campaigner and long-time Bundestag MP.", { wiki: "Volker Beck" });
  I("Sven Giegold",        "Greens (DE)", "e7", ["chancellor","business"],            [50,56,52,54,48], "Green economist, Attac co-founder and state-secretary.", { wiki: "Sven Giegold" });
  I("Katharina Dröge",     "Greens (DE)", "e7", ["business","leader"],                [50,52,54,50,50], "Green Bundestag group co-leader.", { wiki: "Katharina Dröge" });
  I("Terry Reintke",       "Greens (DE)", "e7", ["foreign","leader"],                 [50,50,54,48,48], "Green co-president of the European Parliament group.", { wiki: "Terry Reintke" });
  I("Anja Hajduk",         "Greens (DE)", "e6", ["chancellor","business"],            [48,56,50,52,48], "Green budget expert and economics state-secretary.", { wiki: "Anja Hajduk" });
  I("Irene Mihalic",       "Greens (DE)", "e7", ["home","justice"],                   [48,52,50,50,48], "Green Bundestag first parliamentary secretary; ex-police officer.", { wiki: "Irene Mihalic" });
  I("Oskar Lafontaine",    "Die Linke", "e6", ["chancellor","leader"],               [62,72,74,60,58], "SPD then Left-party firebrand; Saarland Minister-President.", { wiki: "Oskar Lafontaine" });
  I("Petra Pau",           "Die Linke", "e6", ["home","leader"],                      [48,60,50,50,50], "Left-party Bundestag Vice-President.", { wiki: "Petra Pau" });
  I("Jan van Aken",        "Die Linke", "e7", ["foreign","leader"],                   [52,54,58,50,52], "Left-party co-leader from 2024 and disarmament expert.", { wiki: "Jan van Aken" });
  I("Caren Lay",           "Die Linke", "e7", ["work","business"],                    [48,52,52,48,48], "Left-party housing-policy spokeswoman.", { wiki: "Caren Lay" });
  I("Jan Korte",           "Die Linke", "e7", ["leader","justice"],                   [48,54,52,50,52], "Left-party Bundestag chief whip.", { wiki: "Jan Korte" });
  I("Gesine Lötzsch",      "Die Linke", "e6", ["chancellor","leader"],               [48,58,50,52,52], "Left-party co-chair and budget committee chair.", { wiki: "Gesine Lötzsch" });
  I("André Hahn",          "Die Linke", "e7", ["home","justice"],                     [46,52,48,48,48], "Left-party intelligence-oversight spokesman.", { wiki: "André Hahn" });
  I("Sören Pellmann",      "Die Linke", "e7", ["leader","work"],                       [48,50,50,48,48], "Left-party Leipzig MP who held a crucial direct seat.", { wiki: "Sören Pellmann" });
  I("Martina Renner",      "Die Linke", "e7", ["home","justice"],                      [46,50,50,48,46], "Left-party anti-fascism and interior-affairs spokeswoman.", { wiki: "Martina Renner" });
  I("Ernst Torgler",       "KPD", "e3", ["leader"],                                    [48,58,54,48,50], "Last KPD Reichstag group leader, tried after the Reichstag fire.", { wiki: "Ernst Torgler" });
  I("Franz Dahlem",        "KPD", "e3", ["leader","defence"],                          [46,58,50,48,52], "KPD leader and resistance organiser imprisoned by the Nazis.", { wiki: "Franz Dahlem" });
  I("Hugo Eberlein",       "KPD", "e3", ["leader","chancellor"],                       [44,56,48,48,50], "KPD co-founder and Comintern delegate; killed in Stalin's purges.", { wiki: "Hugo Eberlein" });
  I("Hermann Remmele",     "KPD", "e3", ["leader"],                                    [44,54,50,46,48], "KPD Politburo member; a victim of the Soviet Great Purge.", { wiki: "Hermann Remmele" });
  I("Werner Scholem",      "KPD", "e3", ["leader"],                                    [46,54,52,46,46], "KPD organisational chief of the party's left wing.", { wiki: "Werner Scholem" });
  I("Ottomar Geschke",     "KPD", "e3", ["home","leader"],                             [42,54,46,46,48], "KPD Reichstag deputy and concentration-camp survivor.", { wiki: "Ottomar Geschke" });
  I("Wilhelm Koenen",      "KPD", "e3", ["leader"],                                    [42,54,46,46,48], "KPD Reichstag deputy and later East German official.", { wiki: "Wilhelm Koenen" });
  I("Philipp Dengel",      "KPD", "e3", ["leader","culture"],                          [42,52,46,44,46], "KPD Central Committee member and party journalist.", { wiki: "Philipp Dengel" });

  /* ── active-party top-ups: PS, Die Linke, FDP ── */
  I("Pierre Moscovici",    "Parti Socialiste", "e7", ["chancellor","foreign"],        [52,64,54,60,50], "Socialist Finance Minister and European Commissioner.", { wiki: "Pierre Moscovici" });
  I("Jean-Yves Le Drian",  "Parti Socialiste", "e7", ["defence","foreign"],           [54,68,54,62,54], "Socialist Defence then Foreign Minister across two presidencies.", { wiki: "Jean-Yves Le Drian" });
  I("Nicole Gohlke",       "Die Linke", "e7", ["education","leader"],                  [46,50,52,48,48], "Left-party deputy federal chair and Bundestag group deputy.", { wiki: "Nicole Gohlke" });
  I("Ali Al-Dailami",      "Die Linke", "e7", ["foreign","leader"],                    [44,48,50,46,46], "Left-party deputy leader and foreign-affairs spokesman.", { wiki: "Ali Al-Dailami" });
  I("Johannes Vogel",      "FDP", "e7", ["work","leader"],                             [52,54,58,52,52], "FDP deputy leader and labour-policy spokesman.", { wiki: "Johannes Vogel" });
  I("Konstantin Kuhle",    "FDP", "e7", ["home","justice"],                            [50,52,54,50,50], "FDP deputy parliamentary group leader on interior affairs.", { wiki: "Konstantin Kuhle" });
  I("Cornelia Pieper",     "FDP", "e6", ["foreign","education"],                       [48,58,50,52,48], "FDP Minister of State at the Foreign Office.", { wiki: "Cornelia Pieper" });
  I("Walter Döring",       "FDP", "e6", ["business","chancellor"],                     [48,58,50,52,50], "FDP economics minister of Baden-Württemberg.", { wiki: "Walter Döring" });
  I("Birgit Homburger",    "FDP", "e6", ["leader","environment"],                      [48,56,50,50,52], "FDP Bundestag parliamentary group leader.", { wiki: "Birgit Homburger" });

  /* ── East Germany — SED Politburo (toward the real historical ceiling) ── */
  I("Kurt Hager",          "SED (DE)", "e5", ["culture","education","leader"],         [42,66,48,52,58], "SED chief ideologist and Politburo culture boss.", { wiki: "Kurt Hager" });
  I("Günter Mittag",       "SED (DE)", "e5", ["chancellor","business"],               [42,66,46,54,58], "SED economics supremo of the GDR planned economy.", { wiki: "Günter Mittag" });
  I("Horst Sindermann",    "SED (DE)", "e5", ["pm","leader"],                          [42,64,48,50,56], "SED Chairman of the GDR Council of Ministers.", { wiki: "Horst Sindermann" });
  I("Paul Verner",         "SED (DE)", "e4", ["home","leader"],                        [40,62,46,48,56], "SED Berlin party chief and Politburo member.", { wiki: "Paul Verner" });
  I("Hermann Matern",      "SED (DE)", "e4", ["justice","leader"],                     [40,62,46,48,56], "SED control-commission chairman and purge enforcer.", { wiki: "Hermann Matern" });
  I("Alfred Neumann",      "SED (DE)", "e5", ["business","chancellor"],               [40,62,44,50,54], "SED Politburo member overseeing GDR industry.", { wiki: "Alfred Neumann (politician)" });
  I("Werner Lamberz",      "SED (DE)", "e5", ["culture","foreign"],                    [46,58,52,48,54], "Rising SED agitprop chief killed in a 1978 helicopter crash.", { wiki: "Werner Lamberz" });
  I("Margot Honecker",     "SED (DE)", "e5", ["education","leader"],                    [40,60,46,48,54], "SED Minister of Education; wife of Erich Honecker.", { wiki: "Margot Honecker" });
  I("Hilde Benjamin",      "SED (DE)", "e4", ["justice"],                              [40,60,50,48,50], "SED Justice Minister known as 'Red Guillotine'.", { wiki: "Hilde Benjamin" });
  I("Werner Krolikowski",  "SED (DE)", "e5", ["chancellor","leader"],                  [38,60,42,48,52], "SED Politburo hardliner and deputy premier.", { wiki: "Werner Krolikowski" });
  I("Fritz Selbmann",      "SED (DE)", "e4", ["business","culture"],                   [42,58,48,48,50], "SED industry minister and later writer.", { wiki: "Fritz Selbmann" });
  I("Erich Apel",          "SED (DE)", "e5", ["chancellor","business"],               [44,58,44,52,50], "SED planning chief whose 1965 suicide shook the leadership.", { wiki: "Erich Apel" });

  /* ── Weimar Centre Party (Zentrum) — historical figures ── */
  I("Ludwig Windthorst",   "Zentrum", "e1", ["leader","justice"],                      [58,70,72,58,60], "Founder-leader of the Centre Party and Bismarck's great foe.", { wiki: "Ludwig Windthorst" });
  I("Constantin Fehrenbach","Zentrum", "e3", ["pm","leader"],                          [52,66,58,56,54], "Centre Party Chancellor of the early Weimar Republic.", { wiki: "Constantin Fehrenbach" });
  I("Peter Reichensperger","Zentrum", "e1", ["justice","leader"],                      [50,62,56,54,50], "Co-founder of the Centre Party and jurist.", { wiki: "Peter Reichensperger" });
  I("August Reichensperger","Zentrum", "e1", ["culture","justice"],                    [48,60,56,50,48], "Centre Party co-founder and Gothic-revival champion.", { wiki: "August Reichensperger" });
  I("Felix Porsch",        "Zentrum", "e2", ["leader"],                                [46,60,50,50,52], "Centre Party leader in the Prussian House of Lords.", { wiki: "Felix Porsch" });
  I("Adolf Gröber",        "Zentrum", "e2", ["justice","leader"],                      [48,60,52,52,50], "Centre Party co-drafter of the German civil code.", { wiki: "Adolf Gröber" });
  I("Joseph Ersing",       "Zentrum", "e3", ["work","leader"],                         [44,56,48,48,50], "Christian trade-unionist and Centre Party Reichstag deputy.", { wiki: "Joseph Ersing" });

  /* ── Weimar DDP (left-liberal) — historical figures ── */
  I("Walther Rathenau",    "DDP", "e3", ["foreign","business","chancellor"],           [58,72,66,66,54], "DDP industrialist and Foreign Minister assassinated in 1922.", { wiki: "Walther Rathenau" });
  I("Gertrud Bäumer",      "DDP", "e3", ["education","culture"],                        [52,62,58,50,48], "DDP feminist leader and Reichstag deputy.", { wiki: "Gertrud Bäumer" });
  I("Ludwig Quidde",       "DDP", "e3", ["foreign","culture"],                         [50,62,56,50,46], "DDP pacifist and Nobel Peace Prize laureate.", { wiki: "Ludwig Quidde" });
  I("Conrad Haußmann",     "DDP", "e2", ["justice","leader"],                          [48,60,56,50,48], "Left-liberal co-founder of the DDP and Weimar constitution drafter.", { wiki: "Conrad Haußmann" });
  I("Hermann Dietrich",    "DDP", "e3", ["chancellor","business"],                     [48,62,50,54,50], "DDP Finance Minister and Vice-Chancellor.", { wiki: "Hermann Dietrich" });
  I("Bernhard Dernburg",   "DDP", "e2", ["chancellor","business"],                     [48,62,52,54,48], "Colonial secretary and short-lived Weimar Finance Minister.", { wiki: "Bernhard Dernburg" });

  /* ── Weimar DNVP (national-conservative) — historical figures ── */
  I("Oskar Hergt",         "DNVP", "e3", ["leader","justice"],                         [46,62,52,52,54], "DNVP chairman and Vice-Chancellor.", { wiki: "Oskar Hergt" });
  I("Gottfried Treviranus", "DNVP", "e3", ["chancellor","transport"],                  [46,58,52,50,48], "Conservative minister who broke with Hugenberg's DNVP.", { wiki: "Gottfried Reinhold Treviranus" });
  I("Otto Schmidt-Hannover","DNVP", "e3", ["leader"],                                  [42,56,50,46,50], "DNVP Reichstag group leader under Hugenberg.", { wiki: "Otto Schmidt-Hannover" });

  /* ── Weimar DVP (national-liberal) — historical figures ── */
  I("Siegfried von Kardorff","DVP", "e3", ["leader","business"],                       [46,60,50,52,50], "DVP Vice-President of the Reichstag.", { wiki: "Siegfried von Kardorff" });
  I("Otto Hugo",           "DVP", "e3", ["business","work"],                           [42,56,46,48,48], "DVP industrialist and Reichstag deputy.", { wiki: "Otto Hugo" });

})();

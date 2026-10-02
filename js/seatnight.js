/* =============================================================================
   650 — ELECTION NIGHT: declaration order + named MPs
   -----------------------------------------------------------------------------
   Two cosmetic-but-lovely layers over a finished result (they never change who
   won — purely deterministic labelling, so shared run codes reproduce the same
   names in the same order):

   • G.orderDeclarations(results, intl) — sorts the per-seat list into the order
     a real election night declares (the North East races first; the rural and
     island seats crawl in last). International lists already flow by region.
   • G.assignSeatMPs(results, ctx) — gives EVERY seat a named MP of the winning
     party. Your cabinet take the seats they win; the rest of your benches are
     figures drawn to your ticket by the company you keep (your cabinet's own
     political traditions); rival parties are staffed only from figures that
     genuinely belong to them (never one of your drafted names); anything left
     over gets a plausible generated name so no seat is ever blank.
   ============================================================================= */
window.G = window.G || {};
(function () {
  var G = window.G;

  /* ---- declaration order --------------------------------------------------- */
  var UK_REGION_HOUR = { NE: 0.0, NW: 1.3, YH: 1.5, EM: 1.7, WM: 1.9, SCO: 2.5, LDN: 2.6, WAL: 2.9, EE: 3.1, SE: 3.5, SW: 3.7, NI: 4.6 };
  var UK_FAST = ["Houghton", "Sunderland", "Newcastle", "Blyth", "Washington", "Nuneaton", "Swindon"];
  var UK_SLOW = ["Na h-Eileanan", "Orkney", "Shetland", "Ross,", "Argyll", "St Ives", "Skye", "Inverness"];

  function h01(s) { return G.hash32 ? (G.hash32(String(s)) % 100000) / 100000 : 0.5; }

  G.seatDeclareTime = function (c, regionId) {
    var base = UK_REGION_HOUR[regionId] != null ? UK_REGION_HOUR[regionId] : 2.6;
    var t = base + h01((c.gss || c.id || "") + "|dt") * 1.7;
    if (c.recount) t += 2.2 + h01((c.gss || c.id || "") + "|rc") * 2;   // recounts declare late
    var nm = c.name || "";
    if (!c.recount) for (var i = 0; i < UK_FAST.length; i++) if (nm.indexOf(UK_FAST[i]) !== -1) return -1 + t * 0.04;
    for (var j = 0; j < UK_SLOW.length; j++) if (nm.indexOf(UK_SLOW[j]) !== -1) return 7 + t * 0.1;
    return t;
  };

  G.orderDeclarations = function (results, intl) {
    if (!results || !results.length) return results || [];
    if (intl) return results;
    return results.slice().sort(function (a, b) {
      var ta = G.seatDeclareTime(a, a.region), tb = G.seatDeclareTime(b, b.region);
      if (ta !== tb) return ta - tb;
      return (a.gss || a.id || "") < (b.gss || b.id || "") ? -1 : 1;
    });
  };

  /* ---- deterministic plausible name generator (filler backbenchers) -------- */
  var FIRST = ["James","John","Sarah","Emma","David","Michael","Rachel","Laura","Andrew","Peter","Helen","Claire","Mark","Paul","Susan","Karen","Robert","Thomas","Angela","Fiona","Ian","Neil","Gordon","Diane","Margaret","Alan","Kevin","Stephen","Julie","Nicola","Richard","Simon","Caroline","Amanda","Chris","Gareth","Owen","Rhys","Ffion","Catrin","Hamish","Eilidh","Aisling","Niamh","Priya","Amara","Kwame","Yusuf","Mateusz","Sofia"];
  var LAST  = ["Smith","Jones","Williams","Brown","Taylor","Davies","Wilson","Evans","Thomas","Roberts","Walker","Wright","Thompson","Robinson","Hughes","Edwards","Green","Hall","Wood","Harris","Clarke","Patel","Khan","Ahmed","Kaur","Okafor","Nowak","Murphy","Kelly","OBrien","MacLeod","Campbell","Stewart","Fraser","Morgan","Price","Rees","Lewis","Griffiths","Owen","Bennett","Cooper","Ward","Foster","Gray","Marsh","Doyle","Byrne","Ellis","Reid"];
  /* country-appropriate filler names (the UK lists above are the default) */
  var NAMES = {
    US: { f: ["Michael","Jennifer","David","Maria","James","Linda","Robert","Patricia","Carlos","Ashley","Brian","Michelle","Kevin","Lisa","Jose","Karen","Tyler","Amanda","Marcus","Rosa","Daniel","Tanisha"],
          l: ["Johnson","Miller","Davis","Garcia","Rodriguez","Martinez","Anderson","Jackson","Lee","Harris","Clark","Lewis","Young","Allen","King","Hernandez","Lopez","Nguyen","Baker","Carter","Mitchell","Perez"] },
    DE: { f: ["Thomas","Andreas","Stefan","Michael","Sabine","Katrin","Ursula","Petra","Jürgen","Klaus","Anja","Julia","Markus","Christian","Heike","Monika","Lars","Jens","Birgit","Frank"],
          l: ["Müller","Schmidt","Schneider","Fischer","Weber","Meyer","Wagner","Becker","Schulz","Hoffmann","Koch","Richter","Klein","Wolf","Neumann","Schwarz","Zimmermann","Braun","Krüger","Hartmann"] },
    FR: { f: ["Jean","Pierre","Marie","Sophie","Nicolas","Isabelle","François","Nathalie","Philippe","Camille","Julien","Céline","Antoine","Claire","Laurent","Aurélie","Mathieu","Élodie","Olivier","Sandrine"],
          l: ["Martin","Bernard","Dubois","Thomas","Robert","Richard","Petit","Durand","Leroy","Moreau","Simon","Laurent","Lefebvre","Michel","Garcia","David","Bertrand","Roux","Vincent","Fournier"] },
    AU: { f: ["Jack","Olivia","Liam","Charlotte","Noah","Mia","Brendan","Kylie","Shane","Tegan","Darren","Leanne","Mitchell","Bronwyn","Hamish","Jodie","Lachlan","Kirra","Matt","Sharon"],
          l: ["Smith","Jones","Williams","Brown","Wilson","Taylor","Nguyen","Johnson","Martin","White","Anderson","Walker","Thompson","Kelly","Ryan","O'Brien","Murphy","Papadopoulos","Rossi","Chen"] },
    CA: { f: ["Ryan","Emily","Justin","Sarah","Mark","Jennifer","Kevin","Amanda","Harjit","Priya","Brent","Colleen","Derek","Melissa","Tyler","Danielle","Ravi","Shannon","Colin","Lindsay"],
          l: ["Smith","Brown","Tremblay","Martin","Roy","Wilson","MacDonald","Campbell","Anderson","Taylor","Singh","Leblanc","Clarke","Morrison","Fraser","Chen","Patel","Murray","Reid","Stewart"] },
    CA_QC: { f: ["Jean-François","Marie-Ève","Mathieu","Geneviève","Sébastien","Isabelle","Louis","Catherine","Maxime","Julie","Simon","Chantal","Éric","Mélanie","Pierre-Luc","Nathalie"],
             l: ["Tremblay","Gagnon","Roy","Côté","Bouchard","Gauthier","Morin","Lavoie","Fortin","Gagné","Ouellet","Pelletier","Bélanger","Lévesque","Bergeron","Leblanc"] },
    IN: { f: ["Rahul","Priya","Amit","Sunita","Rajesh","Anjali","Vikram","Kavita","Suresh","Meena","Arjun","Pooja","Sanjay","Lakshmi","Ravi","Deepa","Manoj","Asha","Imran","Harpreet"],
          l: ["Sharma","Verma","Patel","Singh","Kumar","Reddy","Yadav","Gupta","Nair","Iyer","Rao","Das","Chauhan","Mishra","Joshi","Pandey","Khan","Banerjee","Pillai","Gill"] },
    Japan: { f: ["Hiroshi","Takashi","Yuko","Kenji","Akiko","Satoshi","Naoko","Masaru","Keiko","Taro","Emi","Daisuke","Yumi","Shinji","Haruka","Kazuo","Mariko","Tetsuya","Noriko","Ichiro"],
             l: ["Sato","Suzuki","Takahashi","Tanaka","Watanabe","Ito","Yamamoto","Nakamura","Kobayashi","Kato","Yoshida","Yamada","Sasaki","Yamaguchi","Matsumoto","Inoue","Kimura","Hayashi","Shimizu","Mori"] },
    KP: { f: ["Chol","Myong","Song","Hyok","Kum","Yong","Ok","Jin","Chun","Hui","Il","Su","Nam","Kwang"], l: ["Kim","Ri","Pak","Choe","Jong","Kang","Han","Ryu","O","Hwang","Jang","Ho"] },
    SU: { f: ["Ivan","Nikolai","Pyotr","Sergei","Mikhail","Alexei","Vasily","Anna","Maria","Yekaterina","Olga","Dmitri","Grigory","Fyodor","Lyudmila","Valentina"],
          l: ["Ivanov","Petrov","Smirnov","Kuznetsov","Popov","Sokolov","Lebedev","Kozlov","Novikov","Morozov","Volkov","Pavlov","Semyonov","Golubev","Vinogradov","Bogdanov"] },
    CU: { f: ["José","María","Juan","Ana","Luis","Rosa","Carlos","Yolanda","Jorge","Marta","Raúl","Teresa","Pedro","Elena","Ernesto","Caridad"],
          l: ["González","Rodríguez","Pérez","Hernández","García","Martínez","López","Díaz","Fernández","Sánchez","Ramírez","Torres","Álvarez","Castillo","Morales","Cruz"] },
    CN: { f: ["Wei","Fang","Jun","Li","Ming","Hua","Jian","Xiu","Gang","Yan","Lei","Ping","Hong","Bo","Qiang","Mei"], l: ["Wang","Li","Zhang","Liu","Chen","Yang","Huang","Zhao","Wu","Zhou","Xu","Sun","Ma","Zhu","Hu","Guo"] }
  };
  var FAMILY_FIRST = { KP: 1, CN: 1, Japan: 0 };
  G.generatedMPName = function (seed, country, region) {
    var a = G.hash32 ? G.hash32(seed + "|f") : 0, b = G.hash32 ? G.hash32(seed + "|l") : 0;
    var set = (country === "CA" && region === "CA_QC" && NAMES.CA_QC) || NAMES[country];
    /* Weimar and the modern Bundestag share German names */
    if (!set) return FIRST[a % FIRST.length] + " " + LAST[b % LAST.length];
    var f = set.f[a % set.f.length], l = set.l[b % set.l.length];
    return FAMILY_FIRST[country] ? l + " " + f : f + " " + l;
  };
  var SUFFIX = ["", "", "II", "III", "IV", "V", "VI", "VII"];
  function genUnique(seat, used, country) {
    var base = G.generatedMPName((seat.gss || seat.id || seat.name || "") + "|mp", country, seat.region), n = base, k = 2;
    while (used[n] && k < SUFFIX.length) { n = base + " " + SUFFIX[k]; k++; }
    if (used[n]) n = base + " (" + (seat.gss || seat.id || Math.round(h01(seat.name) * 999)) + ")";
    return n;
  }

  function prom(p) { return G.PROMINENCE ? G.PROMINENCE(p) : 50; }
  function fitParty(p) {
    return p && p.stats && !(G.isDespot && G.isDespot(p)) && (!G.castOf || G.castOf(p) === "statesman") && p.scope !== "p24";
  }
  function nextFrom(list, used) {
    while (list.i < list.names.length) { var n = list.names[list.i++]; if (!used[n]) return n; }
    return null;
  }

  /* Give every seat a named MP. Mutates results (adds .mp). No RNG. */
  G.assignSeatMPs = function (results, ctx) {
    if (!results || !results.length) return results;
    ctx = ctx || {};
    var userLabel = ctx.blocLabel;
    var drafted = ctx.draftedNames || {};
    var cabinet = ctx.cabinet || {};
    var used = {};

    /* HOME SEATS first: a minister (or rival leader) who stood in a named seat
       either takes it or is out — never quietly parachuted in elsewhere. */
    var homes = (ctx.homes && ctx.homes.bySeat) || {};
    Object.keys(homes).forEach(function (id) { used[homes[id].name] = 1; });
    results.forEach(function (r) {
      var h = homes[r.id]; if (!h) return;
      var held = h.kind === "min" ? (r.won || r.winner === userLabel) : r.winner === h.party;
      if (held) r.mp = h.name; else r.unseated = h.name;
    });

    /* USER seats: cabinet (in portfolio order) hold the seats they win, then
       figures drawn from the SAME traditions as your cabinet, most prominent
       first, then generated names. */
    var cabLineages = {}, userNames = [];
    (G.PORTFOLIOS || []).forEach(function (port) {
      var m = cabinet[port.key];
      if (m && m.name) { userNames.push(m.name); if (m.party && G.lineageOf) cabLineages[G.lineageOf(m.party)] = 1; }
    });
    var userAligned = (G.POLITICIANS || []).filter(function (p) {
      return fitParty(p) && !drafted[p.name] && G.lineageOf && cabLineages[G.lineageOf(p.party)];
    }).sort(function (a, b) { return prom(b) - prom(a); }).map(function (p) { return p.name; });
    var userList = { names: userNames.concat(userAligned), i: 0 };

    /* RIVAL parties: only figures that genuinely belong to that lineage, never a
       drafted name of yours. Their pre-drafted bench (already named) leads. */
    var byLineage = {};
    function poolFor(party) {
      var lin = G.lineageOf ? G.lineageOf(party) : party;
      if (byLineage[lin]) return byLineage[lin];
      var names = [];
      var bench = (ctx.oppositionField && ctx.oppositionField[party] && ctx.oppositionField[party].bench) || [];
      bench.forEach(function (b) { if (b && b.name) names.push(b.name); });
      (G.POLITICIANS || []).filter(function (p) {
        return fitParty(p) && !drafted[p.name] && G.lineageOf && G.lineageOf(p.party) === lin;
      }).sort(function (a, b) { return prom(b) - prom(a); }).forEach(function (p) { names.push(p.name); });
      byLineage[lin] = { names: names, i: 0 };
      return byLineage[lin];
    }

    results.forEach(function (r) {
      if (r.mp && homes[r.id] && r.mp === homes[r.id].name) return;   // a held home seat
      var mine = r.won || r.winner === userLabel;
      var nm = mine ? nextFrom(userList, used) : nextFrom(poolFor(r.winner), used);
      if (!nm) nm = genUnique(r, used, ctx.country);
      used[nm] = 1;
      r.mp = nm;
    });
    return results;
  };
})();

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
    var nm = c.name || "";
    for (var i = 0; i < UK_FAST.length; i++) if (nm.indexOf(UK_FAST[i]) !== -1) return -1 + t * 0.04;
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
  G.generatedMPName = function (seed) {
    var a = G.hash32 ? G.hash32(seed + "|f") : 0, b = G.hash32 ? G.hash32(seed + "|l") : 0;
    return FIRST[a % FIRST.length] + " " + LAST[b % LAST.length];
  };
  var SUFFIX = ["", "", "II", "III", "IV", "V", "VI", "VII"];
  function genUnique(seat, used) {
    var base = G.generatedMPName((seat.gss || seat.id || seat.name || "") + "|mp"), n = base, k = 2;
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
      var mine = r.won || r.winner === userLabel;
      var nm = mine ? nextFrom(userList, used) : nextFrom(poolFor(r.winner), used);
      if (!nm) nm = genUnique(r, used);
      used[nm] = 1;
      r.mp = nm;
    });
    return results;
  };
})();

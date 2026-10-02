/* =============================================================================
   650 — ELECTION NIGHT SPECTACLE
   -----------------------------------------------------------------------------
   Everything here is DETERMINISTIC colour laid over a finished campaign — it
   never changes who won a seat, and it draws nothing from the run's RNG, so a
   shared run code replays the very same night:

   • planHomes  — before seats are named, every cabinet minister is put up for
     a SPECIFIC seat (the safer ones for the senior jobs), and each big rival's
     leader stands in one of their party's heartland seats. Lose that seat and
     you are out of the chamber — whatever the national picture.
   • annotate   — per-seat vote margins (from how close the seat's draw came to
     its win probability), GAIN / HOLD against the previous holder (the 2024
     result, or your last parliament in a career), recounts on knife-edges.
   • moments    — the night's headlines: scalps, ministers falling, the
     narrowest holds, the recounts.
   • swing      — national vote-share estimate for every party, and a Butler
     swing for the swingometer (UK, against the 2024 general election).
   ============================================================================= */
window.G = window.G || {};
(function () {
  var G = window.G;
  var FX = G.NightFX = {};

  function h01(s) { return (G.hash32(String(s)) % 100000) / 100000; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function logit(p) { p = clamp(p, 1e-6, 1 - 1e-6); return Math.log(p / (1 - p)); }

  /* the 2024 general election (GB vote share, %) — the swingometer baseline */
  FX.UK2024 = { "Labour": 33.7, "Conservative": 23.7, "Reform UK": 14.3, "Liberal Democrat": 12.2,
                "Green": 6.7, "SNP": 2.5, "Plaid Cymru": 0.7, "Independent": 2.0, "Sinn Féin": 0.7,
                "DUP": 0.6, "Alliance": 0.4, "UUP": 0.3, "SDLP": 0.3 };

  /* which kind of seat does a system have? single-member (a minister can lose
     their own seat), list (safe at the top of the list), none (appointed). */
  FX.seatKind = function (sys) {
    if (!sys) return "single";
    if (sys.despotMode || sys.coalitionStyle === "guided") return "none";
    if (sys.coalitionStyle === "presidential") return "none";
    if (sys.coalitionStyle === "pr") return "list";
    return "single";
  };
  FX.activeSys = function () {
    var k = G.state && G.state._electoralSystemKey;
    return (k && k !== "fptp_uk" && G.ELECTORAL_SYSTEMS) ? G.ELECTORAL_SYSTEMS[k] : null;
  };

  /* who actually has to win a seat? In the US the cabinet cannot sit in
     Congress at all (only your Speaker stands for a House seat); France's President
     is elected separately — the rest of the government does run. */
  FX.stands = function (port, sys) {
    if (!sys) return true;
    if (sys.country === "US") return port === "leader";            // the Speaker
    if (sys.country === "FR") return port !== "pm";
    return true;
  };

  /* country-appropriate post titles (the game's own PORTFOLIO_TITLES) */
  FX.postTitle = function (key) {
    var t = G._activePortfolioTitles ? G._activePortfolioTitles() : null;
    if (t && t[key]) return t[key];
    var port = G.PORTFOLIO_BY_KEY && G.PORTFOLIO_BY_KEY[key];
    return port ? port.name : key;
  };

  /* a readable seat label: real UK constituencies by name; the synthetic
     international seats as "a seat in <region>" */
  FX.shortRegion = function (n) { return String(n || "").replace(/\s*\(.*\)\s*/g, "").trim(); };
  FX.seatLabel = function (r) { return r.gss ? r.name : "a seat in " + FX.shortRegion(r.name); };

  /* the previous holder of a UK seat: your last parliament in a career (if the
     seat was yours or recorded), else the 2024 general election */
  FX.prevHolder = function (r, blocLabel) {
    var car = G.career;
    if (car && car.active && car.prevWinners && car.prevWinners[r.gss]) {
      var pw = car.prevWinners[r.gss];
      return pw === "__you__" ? blocLabel : pw;
    }
    var geo = G.buildGeo ? G.buildGeo() : null;
    var mp = geo && geo.seatMP[r.gss];
    return mp ? mp.party : null;
  };

  /* rival leaders stand in their party's strongest region. They hold with a
     chance that tracks how their party did there (a wiped-out party's leader
     is always out) — on the UK map preferring a seat the party held in 2024,
     so a fall reads as a genuine heartland loss. Deterministic per name. */
  function placeLeaders(results, ctx, taken, claim, uk) {
    FX.rivalLeaders(ctx.opposition).forEach(function (L) {
      var reg = {}, best = null;
      results.forEach(function (r) {
        var g = reg[r.region] || (reg[r.region] = { id: r.region, n: 0, mine: 0, seats: [] });
        g.n++; g.seats.push(r); if (r.winner === L.party) g.mine++;
      });
      Object.keys(reg).sort().forEach(function (k) {
        var g = reg[k]; g.share = g.mine / g.n;
        if (!best || g.mine > best.mine || (g.mine === best.mine && g.share > best.share)) best = g;
      });
      if (!best) return;
      var hold = best.mine > 0 && h01(L.name + "|hold") < clamp(0.62 + 1.1 * best.share, 0.1, 0.96);
      var pool = best.seats.filter(function (r) { return !taken[r.id] && (hold ? r.winner === L.party : r.winner !== L.party); });
      if (uk) {
        var heart = pool.filter(function (r) { return FX.prevHolder(r, ctx.blocLabel) === L.party; });
        if (heart.length) pool = heart;
      }
      pool.sort(function (a, b) { return a.id < b.id ? -1 : 1; });
      var r = pool[Math.floor(h01(L.name + "|lhome") * pool.length)];
      if (r) claim(r, L);
    });
  }

  /* ---- home seats -------------------------------------------------------- */
  /* ctx: { blocLabel, intl, sys, cabinet, opposition }
     returns { bySeat:{seatId:{name,kind,port?,party}}, list:[…] } */
  FX.planHomes = function (results, ctx) {
    var out = { bySeat: {}, list: [] };
    if (!results || !results.length) return out;
    var kind = ctx.intl ? FX.seatKind(ctx.sys) : "single";
    if (kind !== "single") return out;
    var cab = ctx.cabinet || {};
    var taken = {};
    function claim(r, rec) { taken[r.id] = 1; out.bySeat[r.id] = rec; rec.seatId = r.id; rec.seat = r.name; out.list.push(rec); }

    var ministers = [];
    (G.PORTFOLIOS || []).forEach(function (port) {
      var m = cab[port.key];
      if (m && m.name && !m.coalitionParty && FX.stands(port.key, ctx.intl ? ctx.sys : null))
        ministers.push({ name: m.name, port: port.key, party: ctx.blocLabel, kind: "min" });
    });

    if (!ctx.intl) {
      /* UK: rank every seat by its pre-campaign safety for you. The PM sits in
         the safest tenth of your expected haul; the rest anywhere in the top
         ~80% of it — so a bad night takes real scalps from your own cabinet. */
      /* rank by the seat's own win probability (everything but the count's
         luck): the party machine always finds its grandees the safest berths */
      /* GB parties don't stand in Northern Ireland (and NI parties only do) */
      var NI = { DUP: 1, UUP: 1, SDLP: 1, SinnFein: 1, Alliance: 1, TUV: 1 };
      var lin = G.state && G.state.mode === "dynasty" ? G.state.lineage : null;
      var niOnly = !!(lin && NI[lin]);
      var ranked = results.filter(function (r) { return r.p != null && ((r.region === "NI") === niOnly); })
        .sort(function (a, b) { return (b.p - a.p) || (a.id < b.id ? -1 : 1); });
      var E = 0; ranked.forEach(function (r) { E += r.p; });
      var span = Math.max(ministers.length * 2, Math.round(E * 0.6));
      ministers.forEach(function (m, i) {
        var top = m.port === "pm" ? Math.max(3, Math.round(E * 0.05)) :
                  (m.port === "chancellor" || m.port === "foreign" || m.port === "home") ? Math.max(6, Math.round(E * 0.30)) : span;
        top = Math.min(top, ranked.length);
        var k = Math.floor(h01(m.name + "|home") * top), tries = 0;
        /* the PM's personal vote: they only fall when the party's whole safest
           tier goes (a genuine collapse), never to one freak count */
        if (m.port === "pm") {
          var safeWon = [];
          for (var q = 0; q < top; q++) if (ranked[q] && !taken[ranked[q].id] && ranked[q].won) safeWon.push(q);
          if (safeWon.length) k = safeWon[Math.floor(h01(m.name + "|home") * safeWon.length)];
        }
        while (ranked[k] && taken[ranked[k].id] && tries < ranked.length) { k = (k + 1) % ranked.length; tries++; }
        if (ranked[k]) claim(ranked[k], m);
      });
      placeLeaders(results, ctx, taken, claim, true);
      return out;
    }

    /* international single-member systems: seats are synthetic, so a minister
       stands in a region (the PM in your strongest), and holds with a chance
       that tracks your vote there — deterministic per name. */
    var regions = {}, order = [];
    results.forEach(function (r) {
      var g = regions[r.region]; if (!g) { g = regions[r.region] = { id: r.region, seats: [], won: 0 }; order.push(g); }
      g.seats.push(r); if (r.won) g.won++;
    });
    order.forEach(function (g) { g.share = g.won / g.seats.length; });
    var best = order.slice().sort(function (a, b) { return b.share - a.share; })[0];
    var totalSeats = results.length;
    function pickRegion(seed) {
      var x = h01(seed) * totalSeats, acc = 0;
      for (var i = 0; i < order.length; i++) { acc += order[i].seats.length; if (x < acc) return order[i]; }
      return order[order.length - 1];
    }
    function seatIn(g, wantWon, seed, pred) {
      var c = g.seats.filter(function (r) { return !taken[r.id] && (pred ? pred(r) : (!!r.won === wantWon)); });
      if (!c.length) return null;
      return c[Math.floor(h01(seed) * c.length)];
    }
    ministers.forEach(function (m) {
      var g = m.port === "pm" ? best : pickRegion(m.name + "|reg");
      var hold = clamp(0.25 + 1.25 * g.share + (m.port === "pm" ? 0.2 : 0), 0.05, 0.97);
      var holds = h01(m.name + "|hold") < hold;
      var r = seatIn(g, holds, m.name + "|seat") || seatIn(g, !holds, m.name + "|seat");
      if (r) claim(r, m);
    });
    placeLeaders(results, ctx, taken, claim, false);
    return out;
  };

  /* the leader of each serious rival bench (most prominent figure), top 4 */
  FX.rivalLeaders = function (opp) {
    if (!opp) return [];
    var out = [];
    Object.keys(opp).forEach(function (party) {
      if (party.charAt(0) === "_") return;
      var f = opp[party]; if (!f || !f.bench || !f.bench.length) return;
      var lead = f.bench.slice().sort(function (a, b) {
        var pa = G.PROMINENCE ? G.PROMINENCE(a) : 50, pb = G.PROMINENCE ? G.PROMINENCE(b) : 50;
        return (pb - pa) || (a.name < b.name ? -1 : 1);
      })[0];
      out.push({ name: lead.name, party: party, kind: "lead", strength: f.strength || 1 });
    });
    out.sort(function (a, b) { return (b.strength - a.strength) || (a.party < b.party ? -1 : 1); });
    return out.slice(0, 4);
  };

  /* ---- per-seat margins, GAIN/HOLD, recounts ----------------------------- */
  FX.annotate = function (results, ctx) {
    if (!results || !results.length) return results;
    ctx = ctx || {};
    var sys = ctx.intl ? ctx.sys : (G.ELECTORAL_SYSTEMS && G.ELECTORAL_SYSTEMS.fptp_uk);
    var kind = ctx.intl ? FX.seatKind(sys) : "single";
    var total = (sys && sys.totalSeats) || results.length || 650;
    var elect = (sys && sys.registeredElectorate) ? sys.registeredElectorate / total : 73000;
    var to = (sys && sys.typicalTurnout) || [0.6, 0.72];
    /* regional share for the synthetic (international) seats */
    var regWin = {};
    if (ctx.intl) results.forEach(function (r) {
      var g = regWin[r.region] || (regWin[r.region] = { n: 0, by: {} });
      g.n++; g.by[r.winner] = (g.by[r.winner] || 0) + 1;
    });
    results.forEach(function (r) {
      var key = (r.gss || r.id || r.name) + "";
      var turnout = to[0] + (to[1] - to[0]) * h01(key + "|to");
      var cast = Math.round(elect * turnout);
      r.turnout = Math.round(turnout * 1000) / 10;
      if (kind === "none") { r.marginPct = null; r.marginVotes = null; return; }
      if (kind === "list") { r.marginPct = null; r.marginVotes = null; return; }
      var pp;
      if (r.p != null && r.u != null) {
        var gap = Math.abs(logit(r.p) - logit(r.u));
        pp = gap * 6.2 + h01(key + "|mj") * 0.15;
      } else {
        var g = regWin[r.region], s = g ? (g.by[r.winner] || 0) / g.n : 0.5;
        var mean = 3 + 26 * Math.abs(2 * s - 1);
        pp = -Math.log(1 - h01(key + "|mg") * 0.999) * mean;
      }
      pp = clamp(pp, 0.004, 64);
      r.marginPct = Math.round(pp * 10) / 10;
      r.marginVotes = Math.max(2, Math.round(pp / 100 * cast));
      if (r.marginVotes < 100 || pp < 0.15) r.recount = true;
      if (!ctx.intl) {
        var prev = FX.prevHolder(r, ctx.blocLabel);
        r.prev = prev;
        r.change = prev ? (prev === r.winner ? "hold" : "gain") : null;
      }
    });
    return results;
  };

  /* ---- the night's headlines --------------------------------------------- */
  FX.moments = function (res) {
    var c = res && res.campaign; if (!c || !c.results) return null;
    var sys = FX.activeSys();
    var homes = c.homes || { list: [] };
    var out = { scalps: [], ministersLost: [], ministersHeld: [], narrow: [], recounts: 0, gains: {}, losses: {}, closest: [] };
    var bySeat = {};
    c.results.forEach(function (r) { bySeat[r.id] = r; if (r.recount) out.recounts++; });
    homes.list.forEach(function (h) {
      var r = bySeat[h.seatId]; if (!r) return;
      var held = h.kind === "min" ? (r.won || r.winner === c.blocLabel) : r.winner === h.party;
      var rec = { name: h.name, party: h.party, port: h.port, seat: FX.seatLabel(r), seatId: r.id, winner: r.winner,
                  mp: r.mp, marginVotes: r.marginVotes, marginPct: r.marginPct, recount: !!r.recount, held: held,
                  title: h.port ? FX.postTitle(h.port) : null };
      /* Japan: a beaten district candidate can be revived on the PR list */
      if (!held && h.kind === "min" && sys && sys.country === "Japan" && h01(h.name + "|zombie") < 0.6) { rec.revived = true; rec.held = true; }
      if (h.kind === "min") (rec.held ? out.ministersHeld : out.ministersLost).push(rec);
      else if (!held) out.scalps.push(rec);
    });
    out.ministersHeld.forEach(function (m) { if (!m.revived && m.marginPct != null && m.marginPct < 2) out.narrow.push(m); });
    out.narrow.sort(function (a, b) { return a.marginVotes - b.marginVotes; });
    out.narrow = out.narrow.slice(0, 3);
    if (!sys) c.results.forEach(function (r) {
      if (r.change !== "gain") return;
      out.gains[r.winner] = (out.gains[r.winner] || 0) + 1;
      if (r.prev) out.losses[r.prev] = (out.losses[r.prev] || 0) + 1;
    });
    out.closest = c.results.filter(function (r) { return r.marginVotes != null; })
      .sort(function (a, b) { return a.marginVotes - b.marginVotes; }).slice(0, 5);
    return out;
  };

  /* a short feed line for a notable seat (or null) */
  FX.feedLine = function (r, c) {
    var homes = c.homes && c.homes.bySeat; var h = homes && homes[r.id];
    var sys = FX.activeSys();
    if (h && h.kind === "min") {
      var title = FX.postTitle(h.port);
      var held = r.won || r.winner === c.blocLabel;
      if (held) {
        if (r.marginVotes != null && r.marginPct < 2) return { text: "Phew — your " + title + " " + h.name + " holds on in " + FX.seatLabel(r) + " by " + r.marginVotes.toLocaleString() + " votes.", cls: "warn" };
        return null;
      }
      if (sys && sys.country === "Japan" && h01(h.name + "|zombie") < 0.6)
        return { text: h.name + " (" + title + ") loses " + FX.seatLabel(r) + " — but is revived on the PR list.", cls: "warn" };
      return { text: (h.port === "pm" ? "EARTHQUAKE: your " + title + " " + h.name + " loses their own seat — " + FX.seatLabel(r) + " falls" : "Defeat: your " + title + " " + h.name + " is out in " + FX.seatLabel(r)) + " to " + r.winner + (r.marginVotes != null ? " (by " + r.marginVotes.toLocaleString() + ")" : "") + ".", cls: "bad" };
    }
    if (h && h.kind === "lead" && r.winner !== h.party)
      return { text: "SHOCK: " + h.party + " leader " + h.name + " loses " + FX.seatLabel(r) + " to " + (r.won ? "you" : r.winner) + "!", cls: "scalp" };
    return null;
  };

  /* ---- national vote shares + swing -------------------------------------- */
  FX.voteShares = function (res) {
    var c = res && res.campaign; if (!c) return [];
    var you = clamp(res.voteShare || 0, 0, 1);
    var land = {};
    var regs = (G.activeRegions ? G.activeRegions() : null) || G.REGIONS || [];
    regs.forEach(function (r) {
      var L = (G.activeLandscape ? G.activeLandscape(r.id) : null) || (G.LANDSCAPE && G.LANDSCAPE[r.id]) || [];
      var tot = 0; L.forEach(function (e) { tot += e[1]; });
      L.forEach(function (e) { land[e[0]] = (land[e[0]] || 0) + (tot ? e[1] / tot : 0) * (r.seats || 1); });
    });
    var opp = res.opposition || c.opposition || {};
    var rows = [], tot = 0;
    Object.keys(land).forEach(function (p) {
      if (p === c.blocLabel) return;
      var s = opp[p] && opp[p].strength ? opp[p].strength : 1;
      var v = land[p] * s * s; rows.push({ party: p, v: v }); tot += v;
    });
    var outRows = [{ party: c.blocLabel, share: you * 100, colour: c.blocColour, isYou: true }];
    rows.forEach(function (r) {
      outRows.push({ party: r.party, share: tot ? (1 - you) * r.v / tot * 100 : 0, colour: G.partyColour(r.party, c.blocLabel, c.blocColour) });
    });
    outRows.sort(function (a, b) { return b.share - a.share; });
    outRows.forEach(function (r) { r.share = Math.round(r.share * 10) / 10; });
    return outRows;
  };
  /* Butler swing between you and your main rival vs 2024 (UK only) */
  FX.swing = function (res) {
    if (FX.activeSys()) return null;
    var shares = FX.voteShares(res); if (!shares.length) return null;
    var you = shares.filter(function (s) { return s.isYou; })[0];
    var rival = shares.filter(function (s) { return !s.isYou; })[0];
    if (!you || !rival) return null;
    var you24 = FX.UK2024[you.party] || 0, riv24 = FX.UK2024[rival.party] || 0;
    var sw = ((you.share - you24) - (rival.share - riv24)) / 2;
    return { swing: Math.round(sw * 10) / 10, you: you, rival: rival, you24: you24, rival24: riv24, newParty: !FX.UK2024[you.party] };
  };

  /* remember who held each seat, for the next parliament's GAIN/HOLD */
  FX.recordWinners = function (res) {
    if (!G.career || !res || !res.campaign || !res.campaign.results || FX.activeSys()) return;
    var m = {};
    res.campaign.results.forEach(function (r) { if (r.gss) m[r.gss] = r.won ? "__you__" : r.winner; });
    G.career.prevWinners = m;
  };
})();

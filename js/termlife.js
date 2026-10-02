/* =============================================================================
   650 — A LIVING TERM
   -----------------------------------------------------------------------------
   Layers real people and real places over the governing loop:

   • Seat losses   — ministers who lost their own seat on election night must
                     be dealt with the way that country actually does it (a
                     peerage, a Senate or Rajya Sabha seat, a by-election, the
                     Juppé rule, a non-Diet minister…). A PM without a seat is a
                     crisis.
   • The Opposition — a NAMED leader and front bench (drawn from the rival
                     party's simulated bench) who make moves every session:
                     question-time duels, shadow budgets, scandal attacks,
                     poaching your MPs, opposition-day motions — and who knife
                     their own leader after a run of bad polls.
   • Your benches  — the MPs who actually won your seats. By-elections fall in
                     their named seats, rebellions have named ringleaders
                     (sacked ministers first), and the disloyal cross the floor.
   • The polls     — a tracker every session, a seat projection and the papers'
                     verdict, all in that country's voice.

   Governing already runs off Math.random (only the election is seeded), so
   nothing here touches run codes or leaderboard fairness.
   ============================================================================= */
window.G = window.G || {};
(function () {
  var G = window.G;
  var TL = G.TermLife = {};

  function rnd() { return Math.random(); }
  function pick(a) { return a[Math.floor(rnd() * a.length)]; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function r1(v) { return Math.round(v * 10) / 10; }
  function cap(s) { s = String(s || ""); return s.charAt(0).toUpperCase() + s.slice(1); }
  function esc(s) { return String(s == null ? "" : s); }

  /* ---- country voice ------------------------------------------------------ */
  TL.deck = function () {
    var k = G.term && G.term.systemKey;
    return (G.govDeckFor && G.govDeckFor(k)) || "uk";
  };
  TL.sys = function () {
    var k = G.term && G.term.systemKey;
    return (k && k !== "fptp_uk" && G.ELECTORAL_SYSTEMS) ? G.ELECTORAL_SYSTEMS[k] : null;
  };
  TL.isDespot = function () {
    var s = TL.sys();
    return !!(s && (s.despotMode || s.coalitionStyle === "guided"));
  };
  TL.PRESS = {
    uk: ["The Times", "The Guardian", "Daily Mail", "The Sun", "The Telegraph", "Daily Mirror", "Financial Times"],
    usa: ["The New York Times", "The Wall Street Journal", "The Washington Post", "Fox News", "Politico"],
    weimar: ["Vossische Zeitung", "Vorwärts", "Berliner Tageblatt", "Die Rote Fahne"],
    germany: ["Der Spiegel", "Bild", "FAZ", "Süddeutsche Zeitung", "Die Zeit"],
    france: ["Le Monde", "Le Figaro", "Libération", "Le Parisien"],
    australia: ["The Sydney Morning Herald", "The Australian", "The Age", "The Daily Telegraph (Sydney)"],
    canada: ["The Globe and Mail", "National Post", "Toronto Star", "La Presse"],
    india: ["The Times of India", "The Hindu", "Hindustan Times", "The Indian Express"],
    japan: ["Yomiuri Shimbun", "Asahi Shimbun", "Nikkei", "Mainichi Shimbun"],
    authoritarian: ["the state newspaper", "the official news agency", "the Party daily"]
  };
  TL.QT = { uk: "PMQs", usa: "the floor debate", weimar: "the Reichstag debate", germany: "Regierungsbefragung",
            france: "Questions au gouvernement", australia: "Question Time", canada: "Question Period",
            india: "Question Hour", japan: "the Diet interpellation" };
  TL.CROSS = { uk: "crosses the floor to", canada: "crosses the floor to", australia: "crosses the floor to",
               usa: "switches parties to join", france: "quits your group for", germany: "switches Fraktion to",
               weimar: "switches Fraktion to", japan: "bolts to", india: "defects to" };
  TL.MEMBER = { uk: "MP", canada: "MP", australia: "MP", usa: "Rep.", france: "député", germany: "MdB",
                weimar: "deputy", india: "MP", japan: "Diet member", authoritarian: "deputy" };
  TL.SHADOW = { uk: "shadow chancellor", canada: "finance critic", australia: "shadow treasurer", usa: "ranking member on Ways & Means",
                france: "economic spokesperson", germany: "finance spokesperson", weimar: "finance spokesman",
                india: "finance spokesperson", japan: "policy chief" };
  TL.BYEL = { usa: "Special election", india: "By-poll", france: "Élection partielle", canada: "By-election" };
  TL.byel = function () { return TL.BYEL[TL.deck()] || "By-election"; };
  TL.papers = function () { return TL.PRESS[TL.deck()] || TL.PRESS.uk; };
  /* "(MP for Hartlepool)" / "(Rep. from Texas)" */
  TL.of = function (b) { return b.place ? "(" + TL.member() + " from " + b.place + ")" : "(" + TL.member() + " for " + b.seat + ")"; };
  TL.member = function () { return TL.MEMBER[TL.deck()] || "MP"; };

  function politicianByName(n) {
    if (!TL._byName) { TL._byName = {}; (G.POLITICIANS || []).forEach(function (p) { TL._byName[p.name] = p; }); }
    return TL._byName[n] || null;
  }
  function inCabinet(name) {
    var cab = (G.state && G.state.cabinet) || {};
    for (var k in cab) if (cab[k] && cab[k].name === name) return k;
    return null;
  }

  /* ---- start ------------------------------------------------------------- */
  TL.start = function (res, opts) {
    var t = G.term; if (!t || !res) return;
    TL._byName = null;
    var c = res.campaign || {};
    var despot = TL.isDespot();
    t.blocLabel = c.blocLabel; t.blocColour = c.blocColour;
    t.tl = { despot: despot, feed: [], sacked: [], lostSeats: [], defections: 0, rivalOusted: 0, scalps: [] };

    /* your benches: every MP who won one of your seats (minus the cabinet) */
    var blocLabel = c.blocLabel;
    t.backbench = (c.results || []).filter(function (r) {
      return (r.won || r.winner === blocLabel) && r.mp && !inCabinet(r.mp);
    }).map(function (r) {
      var intl = !r.gss, place = G.NightFX ? G.NightFX.shortRegion(r.name) : r.name;
      return { name: r.mp, seat: intl ? "a seat in " + place : r.name, place: intl ? place : null, seatId: r.id,
               region: r.region, margin: r.marginPct, real: !!politicianByName(r.mp) };
    });

    var moments = G.NightFX ? G.NightFX.moments(res) : null;
    if (moments) t.tl.scalps = moments.scalps.map(function (s) { return s.name + " (" + s.party + ")"; });

    /* the rival: the largest party that is NOT you or a coalition partner; in
       opposition, the governing party */
    var partners = {};
    if (opts && opts.coalition && opts.coalition.parties) opts.coalition.parties.forEach(function (p) { partners[p.party] = 1; });
    var rivalRow = null;
    function hasBench(b) { var f = res.opposition && res.opposition[b.party]; return f && f.bench && f.bench.length; }
    if (t.kind === "opp") rivalRow = (res.breakdown || []).filter(function (b) { return b.party === (t.gov && t.gov.party) && hasBench(b); })[0];
    if (!rivalRow) rivalRow = (res.breakdown || []).filter(function (b) { return !b.isYou && !partners[b.party] && b.party !== "Independent" && hasBench(b); })[0];
    if (rivalRow && !despot) {
      var field = (res.opposition && res.opposition[rivalRow.party]) || {};
      var bench = (field.bench || []).slice().sort(function (a, b) {
        return (G.PROMINENCE ? G.PROMINENCE(b) - G.PROMINENCE(a) : 0) || (a.name < b.name ? -1 : 1);
      });
      var leader = bench[0] || null, lostSeat = false;
      var hl = c.homes && c.homes.list ? c.homes.list.filter(function (h) { return h.kind === "lead" && h.party === rivalRow.party; })[0] : null;
      if (hl && moments && moments.scalps.some(function (s) { return s.name === hl.name; })) lostSeat = true;
      if (lostSeat && bench.length > 1) bench = bench.slice(1).concat([bench[0]]);
      t.rival = {
        party: rivalRow.party, colour: rivalRow.colour || G.partyColour(rivalRow.party), seats: rivalRow.seats,
        leader: lostSeat ? (bench[0] || leader) : leader,
        exLeader: lostSeat ? leader : null, interim: lostSeat,
        bench: bench.slice(0, 6), form: 50, badPolls: 0, lastMove: "", moves: 0, leaders: [(lostSeat ? (bench[0] || leader) : leader) ? (lostSeat ? (bench[0] || leader).name : leader.name) : ""]
      };
      if (!t.rival.leader) t.rival = null;
    }

    /* the polls start from the election-night vote */
    var you = r1((res.voteShare || 0.33) * 100);
    var shares = G.NightFX ? G.NightFX.voteShares(res) : [];
    var rv = t.rival ? (shares.filter(function (s) { return s.party === t.rival.party; })[0] || {}).share : null;
    if (rv == null) rv = r1(Math.max(5, (100 - you) * 0.4));
    if (despot) { you = r1(97 + (res.seats / Math.max(1, t.totalSeats || res.seats)) * 2.5); rv = 0; }
    t.polls = [{ s: 0, you: you, rival: rv, label: "Election" }];
    t.pollBase = { you: you, rival: rv, approval: t.meters.approval, gov: t.gov ? t.gov.approval : null, seats: t.seats };
    t.press = [];

    /* seat losses on election night (government only — and only the ministers
       still in the cabinet after any coalition hand-over) */
    t.seatLosses = [];
    if (t.kind === "govt" && !despot && moments) {
      moments.ministersLost.forEach(function (m) {
        var k = inCabinet(m.name);
        if (k && k === m.port) t.seatLosses.push({ name: m.name, port: k, seat: m.seat, winner: m.winner, margin: m.marginVotes });
      });
    }
    /* in opposition, your shadow ministers who lost seats just sit it out */
    if (t.kind === "opp" && moments && moments.ministersLost.length) {
      t.tl.oppLost = moments.ministersLost.map(function (m) { return m.name; });
    }
  };

  /* ---- the opening session: seat-loss decisions -------------------------- */
  TL.opening = function () {
    var t = G.term; if (!t || !t.turnEvents) return;
    var evs = TL.seatLossEvents();
    if (evs.length) t.turnEvents = evs.map(function (e) { return { event: e, stagedChoice: null }; }).concat(t.turnEvents);
  };

  function titleOf(k) { return G.NightFX ? G.NightFX.postTitle(k) : (G.PORTFOLIO_BY_KEY[k] || {}).name || k; }

  /* the routes each country actually uses to keep an unseated minister */
  TL.routes = function (deck) {
    switch (deck) {
      case "uk": return [
        { act: "peer", label: "Send them to the Lords", text: "A life peerage keeps them at the table — unelected, mind." },
        { act: "byel", label: "Find them a by-election", text: "A loyal backbencher in a safe seat stands aside. Voters hate a parachute." },
        { act: "replace", label: "Promote a backbencher", text: "Thank them for their service and bring on new blood." } ];
      case "australia": return [
        { act: "senate", label: "Fill a Senate casual vacancy", text: "Section 64 gives them three months to find a seat — the Senate is the quiet way in." },
        { act: "byel", label: "Engineer a by-election", text: "A safe-seat MP retires early. Risky in a hostile climate." },
        { act: "replace", label: "Promote from the backbench", text: "Bring someone up from the party room." } ];
      case "canada": return [
        { act: "byel", label: "Open a safe riding", text: "A loyal MP steps aside; the convention is a seat within months." },
        { act: "senate", label: "Appoint them to the Senate", text: "Legal, but it looks like a patronage plum." },
        { act: "replace", label: "Promote from caucus", text: "A fresh face from the backbench." } ];
      case "india": return [
        { act: "rajya", label: "Nominate them to the Rajya Sabha", text: "The standard route — a seat in the upper house within six months." },
        { act: "byel", label: "Contest a Lok Sabha by-election", text: "Prove the mandate the hard way." },
        { act: "replace", label: "Promote a backbencher", text: "Let a new MP take the portfolio." } ];
      case "japan": return [
        { act: "nondiet", label: "Keep them as a non-Diet minister", text: "Article 68 allows it, so long as most of the cabinet sits in the Diet." },
        { act: "replace", label: "Appoint a Diet member instead", text: "A faction elder will gladly step up." } ];
      case "france": return [
        { act: "replace", label: "Apply the Juppé rule — they resign", text: "Since 2007 a beaten minister steps down. Convention honoured." },
        { act: "defy", label: "Keep them regardless", text: "No law forces it — but the press will say you ignored the voters." } ];
      case "usa": return [
        { act: "replace", label: "Elect a new Speaker from the conference", text: "The caucus picks a new Speaker on day one." },
        { act: "defy", label: "Elect them Speaker anyway", text: "The Constitution doesn't require a member. It has simply never been done." } ];
      default: return [{ act: "replace", label: "Replace them", text: "A new minister takes the post." }];
    }
  };

  TL.seatLossEvents = function () {
    var t = G.term; if (!t || !t.seatLosses || !t.seatLosses.length) return [];
    var deck = TL.deck(), out = [];
    var pmLoss = t.seatLosses.filter(function (l) { return l.port === "pm"; })[0];
    var rest = t.seatLosses.filter(function (l) { return l.port !== "pm"; });
    if (pmLoss) {
      var hoTo = TL.successor();
      var ch = [
        { label: "A loyal MP stands aside for you", text: "A by-election in the safest seat you have. Lose it and you are finished.",
          base: { a: -1, e: 0, u: -2 }, tl: { act: "pm_byel", who: [pmLoss] } },
        { label: hoTo ? "Resign — " + hoTo.name + " takes over" : "Resign as leader", text: "The party chooses continuity over a gamble.",
          base: { a: -2, e: -1, u: -6 }, tl: { act: "pm_handover", who: [pmLoss] } }
      ];
      if (deck === "india") ch.unshift({ label: "Take a Rajya Sabha seat", text: "Manmohan Singh governed for a decade from the upper house.",
          base: { a: -3, e: 0, u: -1 }, tl: { act: "pm_upper", who: [pmLoss] } });
      if (deck === "australia" || deck === "canada") ch.unshift({ label: "Govern from outside the House — for now", text: "Legal for a while; every Question Time without you is a gift to the Opposition.",
          base: { a: -4, e: 0, u: -3 }, tl: { act: "pm_wait", who: [pmLoss] } });
      out.push({ id: "tl-pmseat", dept: "pm", special: "seatloss", icon: "⚠",
        title: "Crisis: The " + titleOf("pm") + " Has No Seat",
        text: pmLoss.name + " lost " + pmLoss.seat + " to " + pmLoss.winner + " on election night" +
              (pmLoss.margin ? " by " + Number(pmLoss.margin).toLocaleString() + " votes" : "") +
              ". The party won the country but its leader cannot sit in the chamber.",
        choices: ch });
    }
    if (rest.length) {
      var names = rest.map(function (l) { return l.name + " (" + titleOf(l.port) + ", " + l.seat + ")"; });
      var routes = TL.routes(deck);
      out.push({ id: "tl-minseat", dept: "leader", special: "seatloss", icon: "✖",
        title: rest.length === 1 ? "A Minister Without a Seat" : rest.length + " Ministers Without Seats",
        text: "Beaten on election night: " + names.join("; ") + ". Your " + titleOf("whip") + " needs a decision.",
        choices: routes.map(function (r) {
          var base = { a: 0, e: 0, u: 0 };
          if (r.act === "peer" || r.act === "senate") base = { a: -1, e: 0, u: 0 };
          if (r.act === "defy") base = { a: -3, e: 0, u: -2 };
          if (r.act === "replace") base = { a: 1, e: 0, u: -1 };
          if (r.act === "nondiet") base = { a: -1, e: 0, u: 0 };
          return { label: r.label, text: r.text, base: base, tl: { act: r.act, who: rest } };
        }) });
    }
    return out;
  };

  /* the best figure to take over as head of government */
  TL.successor = function () {
    var cab = (G.state && G.state.cabinet) || {}, t = G.term;
    var lost = {}; (t && t.seatLosses || []).forEach(function (l) { lost[l.name] = 1; });
    var best = null, bestK = null, bestV = -1;
    ["deputy", "chancellor", "foreign", "home", "leader"].forEach(function (k) {
      var p = cab[k]; if (!p || lost[p.name] || p.coalitionParty) return;
      var v = G.scoreFor(p, "pm") * G.fitMultiplier(p, "pm");
      if (v > bestV) { bestV = v; best = p; bestK = k; }
    });
    return best ? { name: best.name, key: bestK, pol: best } : null;
  };

  /* promote the best real backbencher into a post (or leave it in caretaker hands) */
  TL.promote = function (port, log) {
    var t = G.term, st = G.state;
    var cands = (t.backbench || []).filter(function (b) { return b.real && !inCabinet(b.name); }).map(function (b) {
      var p = politicianByName(b.name); return p ? { b: b, p: p, v: G.scoreFor(p, port) * G.fitMultiplier(p, port) } : null;
    }).filter(Boolean).sort(function (a, b) { return b.v - a.v; });
    var old = st.cabinet[port];
    if (old) t.tl.sacked.push(old.name);
    if (!cands.length) {
      t.caretaker[port] = true;
      log.push({ text: "No obvious replacement — " + titleOf(port) + " goes to a caretaker.", cls: "bad" });
      return null;
    }
    var c = cands[0];
    st.cabinet[port] = c.p;
    if (st.draftedNames) { if (old) delete st.draftedNames[old.name]; st.draftedNames[c.p.name] = port; }
    t.backbench = t.backbench.filter(function (b) { return b.name !== c.b.name; });
    delete t.caretaker[port];
    log.push({ text: c.p.name + " " + TL.of(c.b) + " is promoted to " + titleOf(port) + ".", cls: "good" });
    return c.p;
  };

  function byelOdds() {
    var t = G.term;
    return clamp(0.62 + (t.meters.approval - 50) / 90 - (G._diff ? G._diff().confidence : 0) * 0.5, 0.2, 0.92);
  }

  /* ---- resolve a TermLife choice ---------------------------------------- */
  TL.applyChoice = function (ev, choice, log) {
    var t = G.term, x = choice.tl; if (!t || !x) return;
    var who = x.who || [];
    switch (x.act) {
      case "peer": case "senate": case "rajya":
        who.forEach(function (w) {
          var where = x.act === "peer" ? "the House of Lords" : x.act === "senate" ? "the Senate" : "the Rajya Sabha";
          log.push({ text: w.name + " takes a seat in " + where + " and stays " + titleOf(w.port) + ".", cls: "" });
          if (x.act === "peer" && (w.port === "chancellor" || w.port === "home")) {
            G._apply({ a: -2, u: -1 }, true);
            log.push({ text: "A " + titleOf(w.port) + " in the Lords? The Commons is not amused.", cls: "bad" });
          }
          if (x.act === "senate" && TL.deck() === "canada") G._apply({ a: -1 }, true);
        });
        break;
      case "nondiet":
        who.forEach(function (w) { log.push({ text: w.name + " stays on as a non-Diet " + titleOf(w.port) + ".", cls: "" }); });
        break;
      case "byel":
        who.forEach(function (w) {
          var seat = TL.safeSeat();
          if (rnd() < byelOdds()) {
            log.push({ text: TL.byel() + " in " + (seat ? seat.seat : "a safe seat") + ": " + w.name + " is returned. Back in the chamber.", cls: "good" });
            if (seat) { t.backbench = t.backbench.filter(function (b) { return b !== seat; }); }
          } else {
            t.seats = Math.max(0, t.seats - 1);
            if (t.rival) t.rival.seats++;
            G._apply({ a: -3, u: -3 }, true);
            log.push({ text: "Humiliation in " + (seat ? seat.seat : "the by-election") + ": " + w.name + " is beaten again — the seat is lost too (" + t.seats + " held).", cls: "bad" });
            if (seat) t.backbench = t.backbench.filter(function (b) { return b !== seat; });
            TL.promote(w.port, log);
          }
        });
        break;
      case "replace":
        who.forEach(function (w) {
          if (TL.deck() === "france") log.push({ text: w.name + " resigns, honouring the Juppé rule.", cls: "" });
          TL.promote(w.port, log);
        });
        break;
      case "defy":
        who.forEach(function (w) { log.push({ text: w.name + " stays on as " + titleOf(w.port) + " — the convention is broken.", cls: "bad" }); });
        if (TL.deck() === "usa") {
          if (rnd() < 0.35) log.push({ text: "Against all precedent the House elects them. History is made.", cls: "good" });
          else { log.push({ text: "Enough of your own conference balks — a member is elected Speaker instead.", cls: "bad" }); who.forEach(function (w) { TL.promote(w.port, log); }); }
        }
        break;
      case "pm_byel":
        var seat = TL.safeSeat();
        if (rnd() < clamp(byelOdds() + 0.12, 0.3, 0.95)) {
          log.push({ text: TL.byel() + " in " + (seat ? seat.seat : "a safe seat") + ": the " + titleOf("pm") + " is back in the chamber.", cls: "good" });
          G._apply({ u: 3 }, false);
        } else {
          t.seats = Math.max(0, t.seats - 1);
          log.push({ text: "Disaster in " + (seat ? seat.seat : "the by-election") + ": the " + titleOf("pm") + " is beaten twice. The party moves.", cls: "bad" });
          TL.handover(log, true);
        }
        if (seat) t.backbench = t.backbench.filter(function (b) { return b !== seat; });
        break;
      case "pm_handover": TL.handover(log, false); break;
      case "pm_upper":
        log.push({ text: G.ministerName("pm") + " governs from the Rajya Sabha.", cls: "" });
        break;
      case "pm_wait":
        t.tl.pmNoSeat = 3;
        log.push({ text: "The " + titleOf("pm") + " governs from outside the House while a seat is found.", cls: "" });
        break;
      case "oppday":
        if (x.how === "fight") {
          var lead = G.ministerStat("leader", "oratory"), riv = TL.rivalStat("oratory");
          if (rnd() < clamp(0.5 + (lead - riv) / 120, 0.15, 0.85)) { G._apply({ a: 3, u: 2 }, false); log.push({ text: "Your " + titleOf("leader") + " turns the motion into a rout of " + t.rival.leader.name + ".", cls: "good" }); t.rival.form = clamp(t.rival.form - 6, 0, 100); }
          else { G._apply({ a: -3 }, true); log.push({ text: t.rival.leader.name + " wins the argument and the headlines.", cls: "bad" }); t.rival.form = clamp(t.rival.form + 6, 0, 100); }
        }
        break;
    }
  };

  /* the handover: the PM stands down and the strongest colleague takes over */
  TL.handover = function (log, forced) {
    var st = G.state, t = G.term, s = TL.successor();
    var old = st.cabinet.pm;
    if (!s) { t.caretaker.pm = true; log.push({ text: "No successor commands the party — a caretaker holds the fort.", cls: "bad" }); return; }
    st.cabinet.pm = s.pol;
    st.cabinet[s.key] = null;
    if (st.draftedNames) { if (old) delete st.draftedNames[old.name]; st.draftedNames[s.pol.name] = "pm"; }
    if (old) t.tl.sacked.push(old.name);
    log.push({ text: s.name + " becomes " + titleOf("pm") + (forced ? " after the defeat." : ". " + (old ? old.name : "The old leader") + " steps aside."), cls: "head" });
    if (!TL.promote(s.key, log)) { /* promote() already set a caretaker */ }
    G._apply({ a: forced ? -4 : -1, u: forced ? -6 : 0 }, true);
  };

  /* a safe seat on your benches that could be vacated */
  TL.safeSeat = function () {
    var t = G.term;
    var c = (t.backbench || []).filter(function (b) { return b.margin != null; }).sort(function (a, b) { return b.margin - a.margin; });
    if (!c.length) c = t.backbench || [];
    return c.length ? c[Math.floor(rnd() * Math.min(10, c.length))] : null;
  };

  TL.rivalStat = function (stat) {
    var t = G.term, L = t && t.rival && t.rival.leader;
    return (L && L.stats && typeof L.stats[stat] === "number") ? L.stats[stat] : 50;
  };

  /* ---- named by-elections, rebellions and defections --------------------- */
  var BYEL_WHY = {
    uk: ["stands down to take a job in the City", "is suspended and faces a recall petition", "resigns on health grounds", "is appointed to a public post", "quits in protest at the whip"],
    usa: ["resigns to run for governor", "steps down after an ethics probe", "takes a lobbying job"],
    australia: ["retires mid-term", "is found to hold dual citizenship under section 44", "resigns over an expenses row"],
    canada: ["resigns to run provincially", "steps down for family reasons", "is named an ambassador"],
    india: ["is elevated to a governorship", "dies in office", "is disqualified by a court"],
    japan: ["resigns over a political-funds scandal", "runs for prefectural governor", "retires on health grounds"],
    france: ["is appointed to the Constitutional Council", "resigns after an investigation", "takes a European post"],
    germany: ["moves to the European Parliament", "resigns over a plagiarism scandal"],
    weimar: ["resigns in disgust", "is arrested after street violence"]
  };
  TL.byElection = function (log) {
    var t = G.term;
    var bb = (t.backbench || []);
    if (t.tl && t.tl.despot) return true;                                             // no contested by-elections in a one-party state
    if (!bb.length || TL.deck() === "weimar" || TL.deck() === "germany") return false;   // list seats: the next on the list steps in
    var seat = bb[Math.floor(rnd() * bb.length)];
    var why = pick(BYEL_WHY[TL.deck()] || BYEL_WHY.uk);
    var ap = t.meters.approval;
    var marg = seat.margin != null ? seat.margin : 10;
    var lossP = clamp(0.42 + (50 - ap) / 60 - marg / 60, 0.05, 0.9) * (G._diff ? G._diff().byEloss : 1);
    var who = t.rival ? t.rival.party : "the opposition";
    log.push({ text: seat.name + " " + TL.of(seat) + " " + why + ".", cls: "" });
    if (rnd() < lossP) {
      t.seats = Math.max(0, t.seats - 1);
      if (t.rival) t.rival.seats++;
      t.meters.unity = G._clampM(t.meters.unity - 2);
      t.backbench = bb.filter(function (b) { return b !== seat; });
      t.byElectionSeats.push({ seat: seat.seat, result: "lost", to: who });
      log.push({ text: TL.byel() + " in " + seat.seat + ": " + who + " GAIN. (" + t.seats + " held)", cls: "bad" });
    } else {
      var sys0 = TL.sys();
      var nm = G.generatedMPName ? G.generatedMPName(seat.seatId + "|by|" + t.session, sys0 ? sys0.country : "UK", seat.region) : seat.name;
      seat.name = nm; seat.real = false;
      t.byElectionSeats.push({ seat: seat.seat, result: "held" });
      log.push({ text: TL.byel() + " in " + seat.seat + ": HOLD — " + nm + " is your new " + TL.member() + ".", cls: "good" });
    }
    return true;
  };

  /* who leads a revolt: a sacked minister first, else an ambitious backbencher */
  TL.ringleader = function () {
    var t = G.term;
    if (t.tl && t.tl.sacked.length) return { name: t.tl.sacked[t.tl.sacked.length - 1], sacked: true };
    var real = (t.backbench || []).filter(function (b) { return b.real; });
    var b = real.length ? pick(real) : (t.backbench || [])[0];
    return b ? { name: b.name, seat: b.seat } : null;
  };

  TL.defect = function (log, cause) {
    var t = G.term; if (!t.rival || !t.backbench || !t.backbench.length) return false;
    if (TL.deck() === "india" && t.meters.unity > 15) return false;     // the anti-defection law bites
    var pool = t.backbench.slice().sort(function (a, b) { return (a.margin || 50) - (b.margin || 50); }).slice(0, 25);
    var d = pick(pool);
    var verb = TL.CROSS[TL.deck()] || "defects to";
    t.backbench = t.backbench.filter(function (b) { return b !== d; });
    t.seats = Math.max(0, t.seats - 1);
    t.rival.seats++;
    t.tl.defections++;
    G._apply({ a: -1, u: -3 }, true);
    log.push({ text: "DEFECTION: " + d.name + " " + TL.of(d) + " " + verb + " " + t.rival.party +
                     (cause ? " — " + cause : "") + ". (" + t.seats + " held)", cls: "bad" });
    return true;
  };

  /* ---- the opposition AI ------------------------------------------------- */
  TL.rivalMove = function (log) {
    var t = G.term, R = t.rival; if (!R || t.over) return;
    var L = R.leader, deck = TL.deck();
    var qt = TL.QT[deck];
    /* the weekly duel */
    if (qt && t.kind === "govt" && rnd() < 0.6) {
      qt = cap(qt);
      var me = (G.ministerStat("pm", "oratory") + G.ministerStat("pm", "appeal")) / 2;
      var them = (TL.rivalStat("oratory") + TL.rivalStat("appeal")) / 2 + (R.form - 50) * 0.2;
      var edge = me - them + (rnd() - 0.5) * 30;
      if (edge > 8) { G._apply({ a: 1 }, false); R.form = clamp(R.form - 3, 0, 100); log.push({ text: qt + ": " + G.ministerName("pm") + " runs rings round " + L.name + ".", cls: "good" }); }
      else if (edge < -8) { G._apply({ a: -1 }, true); R.form = clamp(R.form + 3, 0, 100); log.push({ text: qt + ": " + L.name + " lands the blow of the week on " + G.ministerName("pm") + ".", cls: "bad" }); }
    }
    if (rnd() > 0.55) return;
    /* a set-piece move, chosen by the situation */
    var m = t.meters, opts = [];
    if (t.kind === "govt") {
      opts.push("scandal");
      if (m.economy < 55) opts.push("budget", "budget");
      if (m.unity < 50 && t.backbench && t.backbench.length) opts.push("poach");
      if (!t.tl.oppDayQueued && t.session < t.length - 1) opts.push("oppday");
      opts.push("tour");
    } else {
      opts.push("govgive", "govgive", "govsmear");
    }
    var mv = pick(opts), shadow = R.bench[1] ? R.bench[1].name : L.name;
    R.moves++;
    switch (mv) {
      case "budget":
        var hit = m.economy < 45 ? -3 : -1;
        G._apply({ a: hit }, true); R.form = clamp(R.form + 4, 0, 100);
        R.lastMove = "Unveiled an alternative budget";
        log.push({ text: R.party + "'s " + (TL.SHADOW[deck] || "spokesperson") + " " + shadow + " unveils an alternative budget" + (hit < -1 ? " — and it is cutting through." : "."), cls: "bad" });
        break;
      case "scandal":
        var cab = G.state.cabinet, keys = Object.keys(cab).filter(function (k) { return cab[k] && !cab[k].coalitionParty && k !== "pm"; });
        if (!keys.length) break;
        var fresh = keys.filter(function (k) { return cab[k].name !== R.lastTarget; });
        if (fresh.length) keys = fresh;
        var tk = keys.sort(function (a, b) { return (G.minState(cab[a].name).loyalty || 50) - (G.minState(cab[b].name).loyalty || 50); })[Math.floor(rnd() * Math.min(3, keys.length))];
        R.lastTarget = cab[tk].name;
        var victim = cab[tk], flagged = (G.isFlagged && G.isFlagged(victim)) || (G.isDespot && G.isDespot(victim));
        G._apply({ a: flagged ? -4 : -2 }, true);
        var ms = G.minState(victim.name); ms.loyalty = Math.max(10, (ms.loyalty || 55) - 4);
        R.lastMove = "Went after " + victim.name;
        R.form = clamp(R.form + 3, 0, 100);
        log.push({ text: L.name + " demands the resignation of " + victim.name + " (" + titleOf(tk) + ")" + (flagged ? ". The record makes it stick." : ". The story runs for days."), cls: "bad" });
        break;
      case "poach":
        R.lastMove = "Poached one of your MPs";
        if (rnd() < 0.55) TL.defect(log, "wooed by " + L.name);
        else log.push({ text: L.name + " tries to lure your backbenchers across — your whips hold the line.", cls: "good" });
        break;
      case "oppday":
        t.tl.oppDayQueued = true;
        R.lastMove = "Tabled a motion";
        t.tl.queued = t.tl.queued || [];
        t.tl.queued.push(TL.oppDayEvent());
        log.push({ text: R.party + " announce they will force a vote next session.", cls: "" });
        break;
      case "tour":
        R.form = clamp(R.form + 2, 0, 100);
        R.lastMove = "Toured the marginals";
        log.push({ text: L.name + " tours your most marginal seats.", cls: "" });
        break;
      case "govgive":
        t.gov.approval = G._clampM(t.gov.approval + 2 + rnd() * 3);
        R.lastMove = "Announced a giveaway";
        log.push({ text: "The " + R.party + " government, led by " + L.name + ", announces a crowd-pleasing giveaway.", cls: "bad" });
        break;
      case "govsmear":
        G._apply({ a: -2 }, true);
        R.lastMove = "Attacked your leadership";
        log.push({ text: L.name + "'s ministers brief against your leadership.", cls: "bad" });
        break;
    }
  };
  TL.oppDayEvent = function () {
    var t = G.term, R = t.rival;
    var topics = ["the cost of living", "NHS waiting lists", "the economy", "immigration", "crime", "housing"];
    if (TL.deck() !== "uk") topics = ["the cost of living", "the economy", "public services", "corruption", "security"];
    var topic = pick(topics);
    return { id: "tl-oppday-" + t.session, dept: "leader", special: "oppday", icon: "⚔",
      title: "The Opposition Forces a Vote on " + topic.charAt(0).toUpperCase() + topic.slice(1),
      text: R.leader.name + " has tabled a motion condemning your record on " + topic + ". The cameras will be on the division lobbies.",
      choices: [
        { label: "Whip against it", text: "Discipline over optics.", base: { a: -1, e: 0, u: 1 }, tl: { act: "oppday", how: "whip" } },
        { label: "Accept it and promise action", text: "Steal their clothes; anger your backbenches.", base: { a: 2, e: -1, u: -3 }, tl: { act: "oppday", how: "accept" } },
        { label: "Counter-attack in the debate", text: "Your " + titleOf("leader") + " takes them on.", base: { a: 0, e: 0, u: 0 }, tl: { act: "oppday", how: "fight" } }
      ] };
  };

  /* the opposition knifes its own leader after a run of bad polls */
  TL.rivalLeadership = function (log) {
    var t = G.term, R = t.rival; if (!R) return;
    if (R.interim && t.session >= 2) {
      var nl = R.bench.filter(function (b) { return b.name !== R.leader.name && (!R.exLeader || b.name !== R.exLeader.name); })[0];
      R.interim = false;
      if (nl && rnd() < 0.6) {
        log.push({ text: R.party + " leadership contest: " + nl.name + " beats interim leader " + R.leader.name + ".", cls: "head" });
        R.leader = nl; R.leaders.push(nl.name); R.form = clamp(R.form + 8, 0, 100); G._apply({ a: -1 }, true);
      } else log.push({ text: R.party + " confirm " + R.leader.name + " as their permanent leader.", cls: "" });
      return;
    }
    var last = t.polls[t.polls.length - 1];
    if (!last) return;
    var gap = t.kind === "govt" ? last.you - last.rival : last.rival - last.you;   // + = rival trailing
    R.badPolls = gap > 6 ? R.badPolls + 1 : Math.max(0, R.badPolls - 1);
    if (R.cool > 0) { R.cool--; return; }
    if (R.badPolls >= 4 && rnd() < 0.3) {
      var ch = R.bench.filter(function (b) { return R.leaders.indexOf(b.name) === -1; })[Math.floor(rnd() * 2)];
      if (!ch) return;
      var old = R.leader.name;
      R.leader = ch; R.leaders.push(ch.name); R.badPolls = 0; R.cool = 5; R.form = clamp(R.form + 10, 0, 100);
      t.tl.rivalOusted++;
      if (t.kind === "govt") {
        G._apply({ a: -2 }, true);
        log.push({ text: "COUP: " + ch.name + " topples " + old + " as " + R.party + " leader. Expect a honeymoon bounce.", cls: "head" });
      } else {
        t.gov.approval = G._clampM(t.gov.approval + 8);
        log.push({ text: "The " + R.party + " government ditches " + old + " — " + ch.name + " is the new " + titleOf("pm") + ".", cls: "head" });
      }
    }
  };

  /* ---- the polls --------------------------------------------------------- */
  TL.poll = function () {
    var t = G.term, b = t.pollBase; if (!b) return null;
    var noise = function () { return (rnd() + rnd() + rnd() - 1.5) * 1.6; };
    var you, rival;
    if (t.tl && t.tl.despot) {
      you = r1(clamp(97 + rnd() * 2.6, 0, 99.9)); rival = 0;
    } else if (t.kind === "govt") {
      you = b.you + (t.meters.approval - b.approval) * 0.32 + (t.meters.economy - 50) * 0.04 + noise();
      rival = b.rival - (you - b.you) * 0.45 + ((t.rival ? t.rival.form : 50) - 50) * 0.12 + noise();
    } else {
      you = b.you + (t.meters.approval - b.approval) * 0.30 + (t.meters.economy - 50) * 0.05 + noise();
      rival = b.rival + ((t.gov ? t.gov.approval : 50) - (b.gov || 50)) * 0.30 + noise();
    }
    if (!(t.tl && t.tl.despot)) { you = r1(clamp(you, 1, 75)); rival = r1(clamp(rival, 0, 75)); }
    var p = { s: t.session, you: you, rival: rival, proj: TL.project(you) };
    t.polls.push(p);
    return p;
  };
  /* seat projection: winner's-bonus curve for single-member systems,
     near-proportional for list PR */
  TL.project = function (you) {
    var t = G.term, b = t.pollBase, total = t.totalSeats || 650;
    var sys = TL.sys(), list = sys && sys.coalitionStyle === "pr";
    if (t.tl && t.tl.despot) return t.seats;
    var base = Math.max(1, b.seats), ratio = you / Math.max(1, b.you);
    var proj = list ? base * ratio : base * Math.pow(ratio, 2.6);
    return Math.max(0, Math.min(total, Math.round(proj)));
  };
  TL.headline = function (p, prev) {
    var t = G.term, paper = pick(TL.papers());
    var d = prev ? p.you - prev.you : 0, me = G.ministerName("pm");
    var R = t.rival, rl = R ? R.leader.name : "The Opposition";
    if (t.tl && t.tl.despot) return { paper: paper, text: pick(["The people rejoice as harvest targets are exceeded", "Unanimous gratitude for the leadership's wisdom", "Foreign slanders exposed and refuted"]) };
    var lines;
    if (d >= 2) lines = [me + " soars as voters warm", "Poll boost for " + me, "Momentum is with the government"];
    else if (d <= -2) lines = [me + " in trouble as support slides", "Poll slump piles pressure on " + me, rl + " sniffs victory"];
    else lines = ["Voters unmoved as " + (R ? rl : "the Opposition") + " struggles to cut through", "Polls hold steady", "The long grind of government"];
    if (t.kind === "opp") {
      if (d >= 2) lines = [rl + " rattled as the Opposition gains", "Your party surges in the polls"];
      else if (d <= -2) lines = ["Opposition stalls as " + rl + " recovers", "Your party slips"];
    }
    return { paper: paper, text: cap(pick(lines)) };
  };

  /* ---- per-session hook (from confirmTurn) ------------------------------- */
  TL.afterTurn = function (log) {
    var t = G.term; if (!t || !t.tl) return;
    if (!t.tl.despot) {
      TL.rivalMove(log);
      /* disloyal benches cross the floor */
      if (t.kind === "govt" && t.meters.unity < 34 && rnd() < 0.22) TL.defect(log, "citing the collapse of discipline");
      if (t.tl.pmNoSeat) { t.tl.pmNoSeat--; G._apply({ a: -1 }, true); if (!t.tl.pmNoSeat) log.push({ text: "A seat is found: the " + titleOf("pm") + " is back in the House.", cls: "good" }); }
    }
    var prev = t.polls[t.polls.length - 1];
    var p = TL.poll();
    if (p) {
      var h = TL.headline(p, prev);
      p.paper = h.paper; p.headline = h.text;
      t.press.push(h);
      if (!t.tl.despot) TL.rivalLeadership(log);
    }
  };
  /* queued events (e.g. an opposition-day motion) jump into the next session */
  TL.injectQueued = function () {
    var t = G.term; if (!t || !t.tl || !t.tl.queued || !t.tl.queued.length || !t.turnEvents) return;
    var ev = t.tl.queued.shift();
    t.turnEvents.unshift({ event: ev, stagedChoice: null });
    t.tl.oppDayQueued = false;
  };

  /* a summary for the legacy screen */
  TL.summary = function () {
    var t = G.term; if (!t || !t.tl) return null;
    var last = t.polls && t.polls[t.polls.length - 1];
    return { finalPoll: last, rivalLeaders: t.rival ? t.rival.leaders : [], defections: t.tl.defections,
             rivalOusted: t.tl.rivalOusted, byElections: t.byElectionSeats || [] };
  };
})();

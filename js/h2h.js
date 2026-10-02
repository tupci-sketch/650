/* =============================================================================
   650 — HEAD-TO-HEAD
   -----------------------------------------------------------------------------
   Two players, one shared deal. The host creates a match (nation, mode,
   difficulty, cabinet size) and gets a five-letter code; a friend joins with
   it. Picks alternate — host first — and each pick comes off a deal seeded by
   the match and the pick number, from the pool both of you share (a name the
   other side took is gone). When both cabinets are full you fight the SAME
   election as rival parties: both campaigns run off the match seed, then seat
   by seat the stronger of the two claims it (by how far each cleared the
   count), and the rest of the field takes what neither won. Every client
   computes the identical night, so the result needs no referee.
   ============================================================================= */
window.G = window.G || {};
(function () {
  var G = window.G;
  var H = G.H2H = { match: null, role: null, timer: null, pending: null, lastSig: "" };
  function $(id) { return document.getElementById(id); }
  function esc(s) { return G.UI && G.UI._esc ? G.UI._esc(s) : String(s); }

  H.NATIONS = [
    { country: "uk", scenario: "freshstart", label: "🇬🇧 United Kingdom" },
    { country: "us", scenario: "usa_house_2024", label: "🇺🇸 US House" },
    { country: "de", scenario: "bundestag_2021", label: "🇩🇪 Germany" },
    { country: "fr", scenario: "france_2022", label: "🇫🇷 France" },
    { country: "au", scenario: "australia_2022", label: "🇦🇺 Australia" },
    { country: "ca", scenario: "canada_2021", label: "🇨🇦 Canada" },
    { country: "jp", scenario: "japan_2021", label: "🇯🇵 Japan" },
    { country: "in", scenario: "india_2024", label: "🇮🇳 India" }
  ];
  H.COLOURS = { host: "#2f8f5b", guest: "#7b3fa0" };

  /* ---- shared state ------------------------------------------------------ */
  H.need = function (m) { return ((m.spec && m.spec.cabinetSize) === "expanded" ? 16 : 12); };
  H.turnRole = function (m) { return m.picks.length % 2 === 0 ? "host" : "guest"; };
  H.partyOf = function (m, role) {
    var nm = role === "host" ? m.hostName : (m.guestName || "Challenger");
    return { name: String(nm).slice(0, 18) + "'s Party", align: "centre", colour: H.COLOURS[role] };
  };

  /* build the shared pool for this match (identical on both clients) */
  H.setup = function (m) {
    var sp = m.spec || {};
    G.career = null;
    G.newGame({ mode: sp.mode || "unity", difficulty: sp.difficulty || "normal", cabinetSize: sp.cabinetSize || "standard",
                redos: 0, govern: false, watch: true, country: sp.country || "uk",
                casts: { insider: true, novelty: false }, custom: H.partyOf(m, H.role || "host") });
    if (G.applyScenario) G.applyScenario(sp.scenario || "freshstart");
    G.state.scenarioKey = sp.scenario || "freshstart";
    G.state.govern = false;
    G.state._h2h = m.code;
    H._key = m.code + "|" + (sp.seed || "");
    H._byName = null;
  };

  /* resolve through the shared pool first (the roster has a few same-named
     figures; the pool holds the exact ones that were dealt) */
  function byName(n) {
    if (!H._byName) {
      H._byName = {};
      (G.POLITICIANS || []).forEach(function (p) { if (!H._byName[p.name]) H._byName[p.name] = p; });
      ((G.state && G.state.pool) || []).forEach(function (p) { H._byName[p.name] = p; });
    }
    return H._byName[n] || null;
  }
  H.cabinetOf = function (m, role) {
    var cab = {};
    m.picks.forEach(function (p) { if (p.r === role) { var pol = byName(p.n); if (pol) cab[p.k] = pol; } });
    return cab;
  };
  H.openPosts = function (m, role) {
    var cab = H.cabinetOf(m, role);
    return (G.PORTFOLIOS || []).filter(function (p) { return !cab[p.key]; });
  };

  /* the three cards for pick number `seq`: seeded, from what's left */
  H.deal = function (m, seq) {
    var taken = {}; m.picks.forEach(function (p) { taken[p.n] = 1; });
    var pool = (G.state.pool || []).filter(function (p) {
      return !taken[p.name] && !(m.spec.mode !== "wildcard" && G.isDespot && G.isDespot(p));
    });
    var rnd = G.makeRng(G.hash32(H._key + "|deal|" + seq));
    var out = [], guard = 0;
    while (out.length < 3 && pool.length && guard++ < 200) {
      var tot = 0, w = pool.map(function (p) { var v = Math.max(1, G.PROMINENCE(p)); v = v * v; tot += v; return v; });
      var r = rnd() * tot, i = 0;
      for (; i < pool.length; i++) { r -= w[i]; if (r <= 0) break; }
      out.push(pool.splice(Math.min(i, pool.length - 1), 1)[0]);
    }
    return out;
  };

  /* ---- networking -------------------------------------------------------- */
  H.call = function (kind, payload) { return G.NET ? G.NET._auth(kind, payload || {}) : Promise.resolve({ ok: false, error: "offline" }); };
  H.adopt = function (d) {
    if (!d || !d.match) return d;
    var m = d.match, sig = m.status + "|" + m.picks.length + "|" + (m.guestName || "") + "|" + JSON.stringify(m.results || {});
    var first = !H.match || H.match.code !== m.code;
    H.match = m; H.role = m.role || H.role;
    if (first) { H._byName = null; H.setup(m); }
    if (sig !== H.lastSig) { H.lastSig = sig; H.render(); }
    if (m.status === "election" || m.status === "done") H.maybeRunElection();
    return d;
  };
  H.create = function (spec) {
    return H.call("h2h_create", { spec: spec }).then(function (d) { if (d && d.ok) { H.reset(); H.adopt(d); H.poll(); } return d; });
  };
  H.join = function (code) {
    return H.call("h2h_join", { code: String(code || "").trim().toUpperCase() }).then(function (d) { if (d && d.ok) { H.reset(); H.adopt(d); H.poll(); } return d; });
  };
  H.refresh = function () {
    if (!H.match) return Promise.resolve(null);
    return H.call("h2h_get", { code: H.match.code }).then(function (d) { if (d && d.ok) H.adopt(d); return d; });
  };
  H.poll = function () {
    H.stop();
    H.timer = setInterval(function () {
      var scr = $("screen-h2h");
      if (!scr || !scr.classList.contains("active") || !H.match || H.match.status === "done") { if (H.match && H.match.status === "done") H.stop(); return; }
      if (H.match.status === "draft" && H.turnRole(H.match) === H.role) return;   // your move — nothing to wait for
      H.refresh();
    }, 2000);
  };
  H.stop = function () { if (H.timer) { clearInterval(H.timer); H.timer = null; } };
  H.reset = function () { H.stop(); H.match = null; H.role = null; H.pending = null; H.lastSig = ""; H._ran = null; };

  H.pick = function (name, port) {
    var m = H.match; if (!m || m.status !== "draft" || H.turnRole(m) !== H.role) return;
    var seq = m.picks.length;
    H._busy = true; H.render();
    H.call("h2h_move", { code: m.code, seq: seq, name: name, port: port }).then(function (d) {
      H._busy = false; H.pending = null;
      if (d && d.match) H.adopt(d);
      if (!d || !d.ok) { H.flash(d && d.error ? "Move rejected: " + d.error : "Couldn't reach the server — try again."); H.render(); }
    });
  };
  H.flash = function (t) { var el = $("h2hMsg"); if (el) { el.textContent = t || ""; el.style.display = t ? "" : "none"; } };

  /* ---- the duel election ------------------------------------------------- */
  function lg(p) { p = Math.max(1e-6, Math.min(1 - 1e-6, p)); return Math.log(p / (1 - p)); }
  H.duel = function (m, viewer) {
    var sp = m.spec || {};
    var cabs = { host: H.cabinetOf(m, "host"), guest: H.cabinetOf(m, "guest") };
    var parties = { host: H.partyOf(m, "host"), guest: H.partyOf(m, "guest") };
    var drafted = {}; m.picks.forEach(function (p) { drafted[p.n] = p.k; });
    var seed = G.hash32(H._key + "|election");
    var runs = {};
    ["host", "guest"].forEach(function (role) {
      G.state.cabinet = cabs[role]; G.state.custom = parties[role];
      runs[role] = G.runElection(cabs[role], { mode: sp.mode || "unity", difficulty: sp.difficulty || "normal",
        custom: parties[role], draftedNames: drafted, seed: seed, runId: m.code + "-" + role, pool: [] });
    });
    var A = runs.host.campaign, B = runs.guest.campaign;
    var Ab = {}; A.results.forEach(function (r) { Ab[r.id] = r; });
    var Bb = {}; B.results.forEach(function (r) { Bb[r.id] = r; });
    var labels = { host: A.blocLabel, guest: B.blocLabel };
    var combined = [];
    if (A.results[0] && A.results[0].p != null) {
      /* UK: seat by seat — whoever cleared the count by more takes it */
      A.results.forEach(function (ra) {
        var rb = Bb[ra.id] || {}, w, mp, src;
        if (ra.won && rb.won) {
          var ma = lg(ra.p) - lg(ra.u), mb = lg(rb.p) - lg(rb.u);
          if (ma >= mb) { w = labels.host; mp = ra.mp; src = ra; } else { w = labels.guest; mp = rb.mp; src = rb; }
        } else if (ra.won) { w = labels.host; mp = ra.mp; src = ra; }
        else if (rb.won) { w = labels.guest; mp = rb.mp; src = rb; }
        else { w = ra.winner; mp = ra.mp; src = ra; }
        var r = {}; for (var k in src) if (Object.prototype.hasOwnProperty.call(src, k)) r[k] = src[k];
        r.winner = w; r.mp = mp; r._bigShown = false;
        combined.push(r);
      });
    } else {
      /* region-level systems: the overlap is shared in proportion */
      var regs = {}, order = [];
      A.results.forEach(function (r) { var g = regs[r.region]; if (!g) { g = regs[r.region] = { id: r.region, name: r.name, a: [], b: 0 }; order.push(g); } g.a.push(r); });
      B.results.forEach(function (r) { if (regs[r.region] && r.won) regs[r.region].b++; });
      order.forEach(function (g) {
        var n = g.a.length, a = g.a.filter(function (r) { return r.won; }).length, b = g.b, over = Math.max(0, a + b - n);
        var af = a, bf = b;
        if (over > 0) { af = Math.round(a - over * b / (a + b)); bf = n - af; }
        var field = g.a.filter(function (r) { return !r.won; }).map(function (r) { return r; });
        var groups = [{ w: labels.host, n: af }, { w: labels.guest, n: bf }, { w: null, n: n - af - bf }], recs = [];
        groups.forEach(function (gr) { for (var i = 0; i < gr.n; i++) recs.push({ w: gr.w, key: (i + 0.5) / gr.n }); });
        recs.sort(function (x, y) { return x.key - y.key; });
        var fi = 0;
        recs.forEach(function (rec, i) {
          var base = g.a[i], r = {}; for (var k in base) if (Object.prototype.hasOwnProperty.call(base, k)) r[k] = base[k];
          if (rec.w) { r.winner = rec.w; r.mp = G.generatedMPName(r.id + "|h2h", (G.NightFX && G.NightFX.activeSys() || {}).country, r.region); }
          else { var f = field[fi++] || base; r.winner = f.winner; r.mp = f.mp; }
          combined.push(r);
        });
      });
    }
    /* the viewer's perspective */
    var mine = runs[viewer], myLabel = labels[viewer];
    var other = viewer === "host" ? "guest" : "host";
    combined.forEach(function (r) { r.won = r.winner === myLabel; });
    var tot = {}, byRegion = {}, regOrder = [];
    combined.forEach(function (r) {
      tot[r.winner] = (tot[r.winner] || 0) + 1;
      var g = byRegion[r.region]; if (!g) { g = byRegion[r.region] = { id: r.region, name: r.name, total: 0, won: 0, winnable: true }; regOrder.push(g); }
      g.total++; if (r.won) g.won++;
    });
    var colourOf = function (lbl) { return lbl === labels.host ? parties.host.colour : lbl === labels.guest ? parties.guest.colour : G.partyColour(lbl); };
    var breakdown = Object.keys(tot).map(function (p) { return { party: p, seats: tot[p], colour: colourOf(p), isYou: p === myLabel }; })
      .sort(function (a, b) { return b.seats - a.seats; });
    var res = {}; for (var k2 in mine) if (Object.prototype.hasOwnProperty.call(mine, k2)) res[k2] = mine[k2];
    var camp = {}; for (var k3 in mine.campaign) if (Object.prototype.hasOwnProperty.call(mine.campaign, k3)) camp[k3] = mine.campaign[k3];
    camp.results = combined; camp.breakdown = breakdown; camp.byRegion = regOrder;
    camp.seats = tot[myLabel] || 0;
    res.campaign = camp; res.breakdown = breakdown; res.seats = camp.seats;
    var sys = G.activeElectoralSystem && G.activeElectoralSystem();
    var maj = (G.activeMajority ? G.activeMajority() : 326), total = combined.length;
    if (sys && sys.tierLabel) res.tier = { key: "govt", label: sys.tierLabel(res.seats, total), govt: res.seats >= maj, role: res.seats >= maj ? "majority" : "coalition" };
    else res.tier = G.tierFor(res.seats, 650);
    res.majorityOf = res.seats - maj;
    res.youRank = 1 + breakdown.filter(function (b) { return b.seats > res.seats; }).length;
    res.coalition = G.coalitionOptions(res.seats, camp, 0);
    res.govern = false;
    res.totalSeats = total;
    res.manifest = (G.PORTFOLIOS || []).map(function (p) { var x = cabs[viewer][p.key]; return x ? { key: p.key, name: x.name } : null; }).filter(Boolean);
    res.pmName = cabs[viewer].pm ? cabs[viewer].pm.name : "—";
    res.blocLabel = myLabel;
    res.h2h = { code: m.code, me: { label: myLabel, seats: tot[myLabel] || 0, colour: parties[viewer].colour },
                opp: { label: labels[other], seats: tot[labels[other]] || 0, colour: parties[other].colour, name: other === "host" ? m.hostName : m.guestName } };
    res._h2h = true;
    G.state.cabinet = cabs[viewer]; G.state.custom = parties[viewer];
    return res;
  };

  H.maybeRunElection = function () {
    var m = H.match; if (!m || H._ran === m.code) return;
    H._ran = m.code;
    var res = H.duel(m, H.role);
    H.lastResult = res;
    var mine = res.h2h.me.seats, theirs = res.h2h.opp.seats;
    if (!(m.results && m.results[H.role])) {
      H.call("h2h_result", { code: m.code, mySeats: mine, oppSeats: theirs });
      if (mine > theirs && G.Profiles) {
        G.Profiles.award("h2h_win");
        var n = 0; try { n = (parseInt(window.localStorage.getItem("650.h2hWins") || "0", 10) || 0) + 1; window.localStorage.setItem("650.h2hWins", String(n)); } catch (e) {}
        if (n >= 5) G.Profiles.award("h2h_five");
      }
    }
    H.render();
  };
  H.watch = function () { if (H.lastResult && G._flow) { G.state.watch = true; G._flow.startWatch(H.lastResult); } };

  /* ---- rendering --------------------------------------------------------- */
  H.render = function () {
    var box = $("h2hBody"); if (!box) return;
    var m = H.match;
    if (!m) { box.innerHTML = ""; $("h2hLobby").style.display = ""; return; }
    $("h2hLobby").style.display = "none";
    var hostLbl = esc(m.hostName), guestLbl = m.guestName ? esc(m.guestName) : "<i>waiting…</i>";
    var nation = (H.NATIONS.filter(function (n) { return n.scenario === m.spec.scenario; })[0] || {}).label || m.spec.scenario;
    var head = '<div class="h2h-head"><div class="h2h-code">Match <b>' + esc(m.code) + '</b><button class="link-btn" id="h2hCopyCode">copy</button></div>' +
      '<div class="h2h-spec">' + esc(nation) + ' · ' + esc(m.spec.mode === "wildcard" ? "Global Wildcard" : "Greatest Cabinet") + ' · ' + esc(m.spec.difficulty) + ' · ' + esc(m.spec.cabinetSize) + '</div>' +
      '<div class="h2h-vs"><span style="color:' + H.COLOURS.host + '">' + hostLbl + '</span> vs <span style="color:' + H.COLOURS.guest + '">' + guestLbl + '</span></div></div>';
    var body = "";
    if (m.status === "waiting") {
      body = '<p class="h2h-wait">Share the code <b>' + esc(m.code) + '</b> with your opponent. The draft begins the moment they join.</p>';
    } else if (m.status === "draft") {
      var turn = H.turnRole(m), mine = turn === H.role, need = H.need(m);
      body += '<p class="h2h-turn ' + (mine ? "mine" : "") + '">Pick ' + (m.picks.length + 1) + ' of ' + (need * 2) + ' — ' +
        (mine ? "<b>your pick</b>" : "waiting for " + esc(turn === "host" ? m.hostName : m.guestName) + "…") + '</p>';
      if (mine && !H._busy) {
        var cards = H.deal(m, m.picks.length), open = H.openPosts(m, H.role);
        if (!H.pending) {
          body += '<div class="h2h-cards">' + cards.map(function (p) {
            var fit = open.filter(function (o) { return p.fits.indexOf(o.key) !== -1; }).map(function (o) { return o.name; });
            return '<button class="h2h-card" data-pick="' + esc(p.name) + '"><span class="cab-face" data-pol="' + esc(p.name) + '">' + G.UI._initials(p.name) + '</span>' +
              '<b>' + esc(p.name) + '</b><span class="h2h-party">' + esc(p.party) + '</span>' +
              '<span class="h2h-ovr">' + G.overall(p) + '</span><span class="h2h-fits">' + esc(fit.length ? "fits: " + fit.slice(0, 3).join(", ") : "no natural fit left") + '</span></button>';
          }).join("") + '</div>';
        } else {
          var pol = byName(H.pending);
          body += '<p class="h2h-place">Place <b>' + esc(H.pending) + '</b>: <button class="link-btn" id="h2hUnpick">change</button></p><div class="h2h-posts">' +
            open.map(function (o) {
              var cls = pol ? G.fitClass(pol, o.key) : "okay";
              return '<button class="h2h-post fit-' + cls + '" data-post="' + o.key + '">' + esc(o.name) + '</button>';
            }).join("") + '</div>';
        }
      }
    } else {
      var r = H.lastResult;
      if (r) {
        var me = r.h2h.me, op = r.h2h.opp, won = me.seats > op.seats, tie = me.seats === op.seats;
        body = '<div class="h2h-final ' + (tie ? "tie" : won ? "win" : "lose") + '"><div class="h2h-score"><span style="color:' + me.colour + '">' + me.seats + '</span> – <span style="color:' + op.colour + '">' + op.seats + '</span></div>' +
          '<p>' + (tie ? "Dead heat. Honours even." : won ? "You beat " + esc(op.name) + "'s party on the night." : esc(op.name) + "'s party wins the night.") + '</p>' +
          '<div class="btn-row"><button class="btn btn-primary" id="h2hWatchBtn">Watch the night →</button><button class="btn btn-ghost" id="h2hNewBtn">New match</button></div></div>';
      }
    }
    var cabsHtml = '<div class="h2h-cabs">' + ["host", "guest"].map(function (role) {
      var cab = H.cabinetOf(m, role);
      return '<div class="h2h-cab" style="--side:' + H.COLOURS[role] + '"><p class="section-label">' + (role === "host" ? hostLbl : guestLbl) + (role === H.role ? " (you)" : "") + '</p>' +
        (G.PORTFOLIOS || []).map(function (p) { var x = cab[p.key]; return '<div class="h2h-row"><span>' + esc(p.name) + '</span><b>' + (x ? esc(x.name) : "—") + '</b></div>'; }).join("") + '</div>';
    }).join("") + '</div>';
    box.innerHTML = head + '<p class="acct-note" id="h2hMsg" style="display:none"></p>' + body + cabsHtml;
    if (G.UI._hydratePortraits) G.UI._hydratePortraits(box);
  };

  H.wire = function () {
    var body = $("h2hBody"), lobby = $("h2hLobby");
    if (lobby && $("h2hNation")) $("h2hNation").innerHTML = H.NATIONS.map(function (n) { return '<option value="' + n.scenario + '|' + n.country + '">' + n.label + '</option>'; }).join("");
    if ($("h2hCreateBtn")) $("h2hCreateBtn").onclick = function () {
      if (!G.NET || !G.NET.me) { H.needLogin(); return; }
      var nv = ($("h2hNation").value || "freshstart|uk").split("|");
      H.create({ scenario: nv[0], country: nv[1], mode: $("h2hMode").value, difficulty: $("h2hDiff").value, cabinetSize: $("h2hSize").value })
        .then(function (d) { if (!d || !d.ok) $("h2hLobbyMsg").textContent = (d && d.error) || "Couldn't create a match."; });
    };
    if ($("h2hJoinBtn")) $("h2hJoinBtn").onclick = function () {
      if (!G.NET || !G.NET.me) { H.needLogin(); return; }
      H.join($("h2hCodeInput").value).then(function (d) { if (!d || !d.ok) $("h2hLobbyMsg").textContent = (d && d.error) || "Couldn't join that match."; });
    };
    if (body) body.addEventListener("click", function (e) {
      var t = e.target.closest ? e.target.closest("[data-pick],[data-post],#h2hUnpick,#h2hWatchBtn,#h2hNewBtn,#h2hCopyCode") : null; if (!t) return;
      if (t.hasAttribute("data-pick")) { H.pending = t.getAttribute("data-pick"); H.render(); }
      else if (t.hasAttribute("data-post")) { if (H.pending) H.pick(H.pending, t.getAttribute("data-post")); }
      else if (t.id === "h2hUnpick") { H.pending = null; H.render(); }
      else if (t.id === "h2hWatchBtn") H.watch();
      else if (t.id === "h2hNewBtn") { H.reset(); H.render(); }
      else if (t.id === "h2hCopyCode" && navigator.clipboard) navigator.clipboard.writeText(H.match.code);
    });
  };
  H.open = function () {
    G.UI.show("screen-h2h");
    if (H.match) { H.refresh(); H.poll(); }
    H.render();
    var who = $("h2hWho"); if (who) who.textContent = G.NET && G.NET.me ? "Playing as " + G.NET.me.name : "Sign in to play head-to-head.";
  };
  H.needLogin = function () {
    G.UI.show("screen-account");
    var msg = $("acctMsg"); if (msg) msg.textContent = "Sign in (or register) to play head-to-head.";
  };
})();

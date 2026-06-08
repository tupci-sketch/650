/* =============================================================================
   650 — CONTROLLER  (v2)
   Reads the setup screen, drives the draft via the engine, runs the seat-by-seat
   count, and repaints through G.UI. The only file that holds the wires.
   ========================================================================== */

(function () {
  "use strict";

  var sel = function (id) { return document.getElementById(id); };
  var each = function (list, fn) { Array.prototype.forEach.call(list, fn); };

  /* setup selections (defaults match the .sel buttons in the markup) */
  var choice = { mode: "unity", lineage: null, eras: [], difficulty: "normal",
                 hard: false, govern: true, watch: true, speed: "normal",
                 redos: 1, cabinetSize: "standard", policy: false };

  var lastResult = null;   // kept for re-run / download / copy
  var watch = null;        // live-count animation state
  var currentVerdict = null; // last governing verdict (for sharing)

  /* ---------------------------------------------------------------- boot -- */
  function boot() {
    sel("metaCount").textContent = G.POLITICIANS.length;
    sel("metaEras").textContent = G.ERAS.filter(function (e) { return !e.wildOnly; }).length;
    buildEraToggles(true);
    buildDynastyChips();
    wireSetup();
    wireDraft();
    wireWatch();
    wireResult();
    wireAbout();
    wireGovern();
    wireCoalition();
    wirePolicy();
    wireExplore();
    renderRecords();
    sel("homeLink").onclick = goMenu;
    if (G.buildGeo) G.buildGeo();
    sel("exploreBtn").onclick = function () {
      var s = sel("exploreSearch"); if (s) s.value = "";
      G.UI.renderExplore(); G.UI.filterExplore("");
    };
    updateHint();
    G.UI.show("screen-menu");
  }

  /* -------------------------------------------------------- setup: eras -- */
  function erasList() {
    return G.ERAS.filter(function (e) { return choice.mode === "wildcard" ? true : !e.wildOnly; });
  }
  function buildEraToggles(reset) {
    var box = sel("eraToggles"); box.innerHTML = "";
    var list = erasList();
    if (reset) choice.eras = list.map(function (e) { return e.id; });
    else choice.eras = choice.eras.filter(function (id) {
      return list.some(function (e) { return e.id === id; });
    });
    if (!choice.eras.length) choice.eras = list.map(function (e) { return e.id; });

    list.forEach(function (e) {
      var on = choice.eras.indexOf(e.id) !== -1;
      var b = document.createElement("button");
      b.className = "era-chip" + (on ? " sel" : "");
      b.innerHTML = '<b>' + e.label + '</b><span>' + e.years + '</span>';
      b.onclick = function () { toggleEra(e.id); };
      box.appendChild(b);
    });
  }
  function toggleEra(id) {
    var i = choice.eras.indexOf(id);
    if (i !== -1) { if (choice.eras.length > 1) choice.eras.splice(i, 1); }
    else choice.eras.push(id);
    buildEraToggles(false);
    buildDynastyChips();
    updateHint();
  }

  /* --------------------------------------------------- setup: dynasties -- */
  function buildDynastyChips() {
    var box = sel("dynastyPick"); box.innerHTML = "";
    var need = choice.cabinetSize === "expanded"
      ? (G.PORTFOLIOS_BASE.length + G.PORTFOLIOS_EXTRA.length) : G.PORTFOLIOS_BASE.length;
    var lineages = G.eligibleDynastyLineages(choice.eras, need);
    if (choice.lineage && lineages.indexOf(choice.lineage) === -1) choice.lineage = null;
    if (!choice.lineage) choice.lineage = lineages[0] || null;
    if (lineages.length === 0) {
      box.innerHTML = '<p class="mini-help warn">No tradition can field a full twelve in these eras.</p>';
      return;
    }
    lineages.forEach(function (lin) {
      var b = document.createElement("button");
      b.className = "chip" + (lin === choice.lineage ? " sel" : "");
      b.textContent = lin;
      b.onclick = function () {
        choice.lineage = lin;
        each(box.children, function (c) { c.classList.toggle("sel", c === b); });
        updateHint();
      };
      box.appendChild(b);
    });
  }

  /* ------------------------------------------------- setup: playability -- */
  function poolCount() {
    return G.poolFor({
      mode: choice.mode, eras: choice.eras,
      lineage: choice.mode === "dynasty" ? choice.lineage : null
    }).length;
  }
  function updateHint() {
    var n = poolCount(), need = G.PORTFOLIOS.length;
    var hint = sel("setupHint");
    var ok = n >= need && (choice.mode !== "dynasty" || !!choice.lineage);
    sel("startBtn").disabled = !ok;
    if (choice.mode === "dynasty" && !choice.lineage) {
      hint.textContent = "Pick a party tradition with a deep enough bench."; hint.className = "setup-hint warn";
    } else if (n < need) {
      hint.textContent = "Only " + n + " draftable here — you need at least " + need + ". Put an era back in.";
      hint.className = "setup-hint warn";
    } else {
      var flavour = choice.mode === "wildcard" ? "the gloves are off"
                  : choice.mode === "dynasty" ? (choice.lineage + " only") : "all parties welcome";
      hint.textContent = n + " figures in the pool · " + flavour; hint.className = "setup-hint";
    }
  }

  /* ----------------------------------------------------- setup: wiring --- */
  function bindRow(rowId, attr, apply) {
    var row = sel(rowId);
    each(row.querySelectorAll("[" + attr + "]"), function (btn) {
      btn.onclick = function () {
        each(row.querySelectorAll("[" + attr + "]"), function (b) { b.classList.toggle("sel", b === btn); });
        apply(btn.getAttribute(attr));
      };
    });
  }
  function wireSetup() {
    bindRow("modeRow", "data-mode", function (v) {
      choice.mode = v;
      sel("dynastyPick").classList.toggle("show", v === "dynasty");
      sel("wildNote").classList.toggle("show", v === "wildcard");
      buildEraToggles(true);
      buildDynastyChips();
      updateHint();
    });
    bindRow("diffRow",   "data-diff",   function (v) { choice.difficulty = v; });
    bindRow("hardRow",   "data-hard",   function (v) { choice.hard   = v === "true"; });
    bindRow("governRow", "data-govern", function (v) { choice.govern = v === "true"; });
    bindRow("watchRow",  "data-watch",  function (v) { choice.watch  = v === "true"; });
    bindRow("speedRow",  "data-speed",  function (v) { choice.speed  = v; });
    bindRow("redoRow",   "data-redos",  function (v) { choice.redos = parseInt(v, 10); });
    bindRow("sizeRow",   "data-size",   function (v) { choice.cabinetSize = v; buildDynastyChips(); updateHint(); });
    bindRow("policyRow", "data-policy", function (v) { choice.policy = (v === "true"); });

    sel("startBtn").onclick = function () {
      if (sel("startBtn").disabled) return;
      G.newGame({
        mode: choice.mode,
        lineage: choice.mode === "dynasty" ? choice.lineage : null,
        hard: choice.hard,
        eras: choice.eras.slice(),
        difficulty: choice.difficulty,
        govern: choice.govern,
        watch: choice.watch,
        redos: choice.redos,
        cabinetSize: choice.cabinetSize,
        policyOn: choice.policy
      });
      G.UI.show("screen-draft");
      G.UI.renderDraft();
    };
    sel("aboutBtn").onclick = function () { G.UI.renderAbout(); };
  }

  /* --------------------------------------------------------- the wheel ---- */
  var spinning = false;
  function spinFlourish(commit) {
    if (spinning) return;
    spinning = true;
    G.UI.setSpinning(true);
    sel("spinBtn").disabled = true;
    sel("skipEraBtn").disabled = true;
    sel("skipPartyBtn").disabled = true;
    var flick = setInterval(function () { G.UI.flickerReels(); }, 70);
    setTimeout(function () {
      clearInterval(flick);
      G.UI.setSpinning(false);
      spinning = false;
      commit();
      G.UI.renderDraft();
    }, 720);
  }

  G.ctrl = {
    spin:     function () { spinFlourish(function () { G.spin(); }); },
    spinTier: function (key) { spinFlourish(function () { G.spinTier(key); }); },
    reshuffle:function () { if (G.reshufflePool()) { G.UI.renderPool(); G.UI.renderReels(); } },
    skipEra:  function () { if (G.state.spin && G.state.skips.era > 0) spinFlourish(function () { G.skipEra(); }); },
    skipParty:function () { if (G.state.spin && G.state.skips.party > 0) spinFlourish(function () { G.skipParty(); }); },
    chooseCandidate: function (name) {
      G.choosePick(name);
      G.UI.renderPool(); G.UI.renderCabinet(); G.UI.refreshControls();
    },
    assign: function (portfolioKey) { if (G.assignTo(portfolioKey)) G.UI.renderDraft(); },
    hold:   function () { runElectionFlow(); }
  };

  function wireDraft() {
    sel("spinBtn").onclick = function () { G.ctrl.spin(); };
    sel("skipEraBtn").onclick = function () { G.ctrl.skipEra(); };
    sel("skipPartyBtn").onclick = function () { G.ctrl.skipParty(); };
    sel("holdBtn").onclick = function () { G.ctrl.hold(); };
  }

  /* ------------------------------------------------------- the election --- */
  function runElectionFlow() {
    if (!G.isComplete()) return;
    if (G.state.policyOn && !G.state.policy) { G.UI.renderPolicy("manifesto"); return; }
    proceedElection();
  }
  function proceedElection() {
    lastResult = G.hold();
    if (G.state.watch) startWatch(lastResult);
    else showResult(lastResult);
  }
  function showResult(res) {
    G.UI.renderResult(res);
    updatePersonalBest(res);
  }

  /* ----------------------------------------------- seat-by-seat count ----- */
  function regionBounds(results) {
    var out = [], idx = 0;
    G.REGIONS.forEach(function (r) {
      out.push({ id: r.id, name: r.name, start: idx, end: idx + r.seats, total: r.seats });
      idx += r.seats;
    });
    return out;
  }

  /* declaration pace — total seconds to call all 650 seats, by chosen speed */
  function revealRate() {
    var secs = choice.speed === "slow" ? 26 : choice.speed === "fast" ? 2.4 : 9;
    return 650 / secs;   // seats per second
  }

  function startWatch(res) {
    cancelWatch();
    var setup = G.UI.renderWatch(res);
    watch = {
      res: res, byId: setup.byId, colour: setup.colour, results: res.campaign.results,
      bounds: regionBounds(res.campaign.results), i: 0, won: 0, regIdx: 0, regWon: 0,
      cancelled: false, done: false, raf: null,
      sps: revealRate(), acc: 0, lastT: null,
      tally: {}, blocLabel: res.campaign.blocLabel, blocColour: res.campaign.blocColour
    };
    G.UI.pushFeed("Counting in " + watch.bounds[0].name + "…", "muted");
    frame();
  }

  function liveBreakdown(w) {
    return Object.keys(w.tally).map(function (label) {
      return { party: label, seats: w.tally[label],
        colour: label === w.blocLabel ? w.blocColour : ((G.PARTIES[label] || {}).colour || "#6b6b6b"),
        isYou: label === w.blocLabel };
    }).sort(function (a, b) { return b.seats - a.seats; });
  }

  function reveal(n) {
    var w = watch; if (!w) return;
    var last = null;
    for (var c = 0; c < n && w.i < w.results.length; c++) {
      while (w.regIdx < w.bounds.length && w.i >= w.bounds[w.regIdx].end) {
        var b = w.bounds[w.regIdx];
        G.UI.pushFeed(b.name + " — " + w.regWon + " / " + b.total, (w.regWon * 2 >= b.total) ? "win" : "");
        w.regIdx++; w.regWon = 0;
        if (w.regIdx < w.bounds.length) G.UI.pushFeed("Counting in " + w.bounds[w.regIdx].name + "…", "muted");
      }
      var res = w.results[w.i];
      G.UI.flipSeat(w.byId[res.id], res.won, w.colour);
      if (res.won) { w.won++; w.regWon++; }
      w.tally[res.winner] = (w.tally[res.winner] || 0) + 1;
      last = res; w.i++;
    }
    if (last) G.UI.pushFeed(last.name + (last.won ? " — won" : " — lost (" + last.winner + ")"), last.won ? "win" : "");
    G.UI.setWatchTally(w.won, w.i);
    G.UI.renderStandings("watchStandings", liveBreakdown(w));
  }

  function frame() {
    if (!watch || watch.cancelled) return;
    var now = (window.performance && window.performance.now) ? window.performance.now() : Date.now();
    if (watch.lastT == null) watch.lastT = now;
    var dt = now - watch.lastT; if (dt > 250) dt = 250; watch.lastT = now;
    watch.acc += watch.sps * dt / 1000;
    var n = Math.floor(watch.acc);
    if (n > 0) { watch.acc -= n; reveal(n); }
    if (watch.i < watch.results.length) watch.raf = requestAnimationFrame(frame);
    else finishWatch();
  }

  function finishWatch() {
    var w = watch; if (!w) return;
    while (w.regIdx < w.bounds.length) {
      var b = w.bounds[w.regIdx];
      G.UI.pushFeed(b.name + " — " + w.regWon + " / " + b.total, (w.regWon * 2 >= b.total) ? "win" : "");
      w.regIdx++; w.regWon = 0;
    }
    w.done = true;
    G.UI.setWatchTally(w.won, w.i);
    G.UI.pushFeed("All 650 seats declared.", "win");
    sel("skipCountBtn").style.display = "none";
    sel("toResultBtn").style.display = "";
  }

  function cancelWatch() {
    if (watch) { watch.cancelled = true; if (watch.raf) cancelAnimationFrame(watch.raf); }
  }

  function wireWatch() {
    sel("skipCountBtn").onclick = function () {
      if (!watch) return;
      watch.cancelled = true; if (watch.raf) cancelAnimationFrame(watch.raf);
      reveal(watch.results.length);
      finishWatch();
    };
    sel("toResultBtn").onclick = function () {
      if (!watch) return;
      showResult(watch.res);
    };
  }

  /* --------------------------------------------------- the result screen -- */
  function wireResult() {
    sel("downloadBtn").onclick = function () {
      if (!lastResult) return;
      var go = function () {
        var url = G.UI.drawShareCard(lastResult);
        var a = document.createElement("a");
        a.href = url; a.download = "650-result.png";
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
      };
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(go).catch(go);
      else go();
    };

    sel("copyBtn").onclick = function () {
      if (!lastResult) return;
      var text = G.UI.resultText(lastResult);
      var done = function () { flashButton(sel("copyBtn"), "Copied ✓"); };
      if (navigator.clipboard && navigator.clipboard.writeText)
        navigator.clipboard.writeText(text).then(done).catch(function () { legacyCopy(text, done); });
      else legacyCopy(text, done);
    };

    sel("xShareBtn").onclick = function () {
      if (!lastResult) return;
      postToX(G.UI.resultText(lastResult) + " #650game", function () { return G.UI.shareCardBlob(lastResult); });
    };

    sel("againBtn").onclick = function () {
      cancelWatch();
      lastResult = G.hold();
      if (G.state.watch) startWatch(lastResult);
      else showResult(lastResult);
    };
    sel("menuBtn").onclick = goMenu;
  }

  /* ------------------------------------------------------ share to X ------ */
  function openXIntent(text, url) {
    var href = "https://x.com/intent/tweet?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(url);
    try { window.open(href, "_blank", "noopener"); } catch (e) {}
  }
  function postToX(text, getBlob) {
    var url = "https://650-0.co.uk";
    // On phones that support it, share the actual result image to the X app.
    if (getBlob && typeof navigator !== "undefined" && navigator.canShare) {
      try {
        getBlob().then(function (blob) {
          try {
            var file = new File([blob], "650-result.png", { type: "image/png" });
            if (navigator.canShare({ files: [file] }) && navigator.share) {
              navigator.share({ files: [file], text: text }).catch(function () { openXIntent(text, url); });
              return;
            }
          } catch (e) {}
          openXIntent(text, url);
        }).catch(function () { openXIntent(text, url); });
        return;
      } catch (e) {}
    }
    openXIntent(text, url);
  }

  function goMenu() { cancelWatch(); G.UI.show("screen-menu"); }

  function flashButton(btn, msg) {
    var old = btn.textContent; btn.textContent = msg;
    setTimeout(function () { btn.textContent = old; }, 1400);
  }
  function legacyCopy(text, done) {
    try {
      var ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); document.execCommand("copy");
      document.body.removeChild(ta); if (done) done();
    } catch (e) { /* clipboard unavailable */ }
  }

  /* ----------------------------------------------------- personal best ---- */
  var PB_KEY = "650.bestSeats";
  function readPB() { try { var v = window.localStorage.getItem(PB_KEY); return v === null ? null : parseInt(v, 10); } catch (e) { return null; } }
  function writePB(n) { try { window.localStorage.setItem(PB_KEY, String(n)); } catch (e) {} }
  function updatePersonalBest(res) {
    var note = sel("pbNote"), prev = readPB();
    if (prev === null || res.seats > prev) {
      writePB(res.seats);
      note.innerHTML = prev === null
        ? "Saved as your personal best: <b>" + res.seats + "</b> seats."
        : "🏆 New personal best — <b>" + res.seats + "</b> seats, beating " + prev + ".";
    } else {
      note.innerHTML = "Your personal best is <b>" + prev + "</b> seats.";
    }
  }

  /* --------------------------------------------------------- governing ---- */
  function enterGovernment(res, opts) {
    G.startTerm(res, opts || {});
    if (G.state.policyOn) G.UI.renderPolicy("programme");
    else G.UI.renderGovern();
  }
  function startCoalitionGovern(res, deal, minority) {
    enterGovernment(res, { coalition: deal || null, minority: !!minority });
  }
  function startOpposition(res) {
    G.startOpposition(res);
    G.UI.renderGovern();
  }

  function wireCoalition() {
    sel("coalitionOptions").addEventListener("click", function (e) {
      var n = e.target;
      while (n && n !== this && !(n.classList && n.classList.contains("coal-opt"))) n = n.parentNode;
      if (!n || !n.classList || !n.classList.contains("coal-opt")) return;
      if (!lastResult || !lastResult.coalition) return;
      var act = n.getAttribute("data-act");
      if (act === "deal") {
        var i = parseInt(n.getAttribute("data-i"), 10);
        startCoalitionGovern(lastResult, lastResult.coalition.deals[i], false);
      } else if (act === "minority") {
        startCoalitionGovern(lastResult, null, true);
      } else if (act === "opposition") {
        startOpposition(lastResult);
      }
    });
    sel("oppositionBtn").onclick = function () { if (lastResult) startOpposition(lastResult); };
  }

  function wirePolicy() {
    sel("policyConfirm").onclick = function () {
      var sel2 = {};
      G.POLICY_AXES.forEach(function (ax) { sel2[ax.key] = G.UI._policySel[ax.key]; });
      if (G.UI._policyMode === "manifesto") {
        G.state.policy = sel2;
        proceedElection();
      } else {
        G.applyProgramme(sel2);
        G.UI.renderGovern();
      }
    };
  }

  function wireGovern() {
    sel("governBtn").onclick = function () {
      if (!lastResult || !lastResult.coalition || !lastResult.coalition.soloMajority) return;
      enterGovernment(lastResult);
    };
    sel("eventChoices").addEventListener("click", function (e) {
      var n = e.target;
      while (n && n !== this && !(n.classList && n.classList.contains("choice"))) n = n.parentNode;
      if (!n || !n.classList || !n.classList.contains("choice")) return;
      if (!G.term || G.term.over) return;
      var idx = parseInt(n.getAttribute("data-idx"), 10);
      var r = (G.term.kind === "opp") ? G.oppChoose(idx) : G.govChoose(idx);
      G.UI.pushGovLog(r.log);
      G.UI.afterChoice();
      if (r.over) endTerm();
    });
    sel("legacyAgainBtn").onclick = function () {
      cancelWatch();
      lastResult = G.hold();
      if (G.state.watch) startWatch(lastResult); else showResult(lastResult);
    };
    sel("legacyShareBtn").onclick = function () {
      if (!currentVerdict) return;
      var text = G.UI.legacyText(currentVerdict);
      var done = function () { flashButton(sel("legacyShareBtn"), "Copied ✓"); };
      if (navigator.clipboard && navigator.clipboard.writeText)
        navigator.clipboard.writeText(text).then(done).catch(function () { legacyCopy(text, done); });
      else legacyCopy(text, done);
    };
    sel("legacyMenuBtn").onclick = goMenu;
    sel("legacyXBtn").onclick = function () {
      if (!currentVerdict) return;
      postToX(G.UI.legacyText(currentVerdict) + " #650game", null);
    };
  }
  function endTerm() {
    currentVerdict = G.govVerdict();
    G.UI.renderLegacy(currentVerdict);
    recordLegacy(currentVerdict);
  }

  /* --------------------------------------------------------- explorer ----- */
  function wireExplore() {
    var s = sel("exploreSearch");
    if (s) s.addEventListener("input", function () { G.UI.filterExplore(s.value); });
  }

  /* ----------------------------------------------------------- records ---- */
  var LEG_KEY = "650.bestLegacy";
  function readLeg() { try { var v = window.localStorage.getItem(LEG_KEY); return v === null ? null : parseInt(v, 10); } catch (e) { return null; } }
  function recordLegacy(v) {
    try { var prev = readLeg(); if (prev === null || v.legacy > prev) window.localStorage.setItem(LEG_KEY, String(v.legacy)); } catch (e) {}
    renderRecords();
  }
  function renderRecords() {
    var el = sel("recordsLine"); if (!el) return;
    var seats = readPB(), leg = readLeg(), bits = [];
    if (seats !== null) bits.push("best <b>" + seats + "</b> seats");
    if (leg !== null) bits.push("best legacy <b>" + leg + "</b>");
    el.innerHTML = bits.length ? ("Your records: " + bits.join(" · ")) : "";
  }

  /* --------------------------------------------------------- the about ---- */
  function wireAbout() {
    sel("aboutBackBtn").onclick = goMenu;
    sel("exploreBackBtn").onclick = goMenu;
    sel("methodLink").onclick = function () { G.UI.renderAbout(); };
  }

  /* ------------------------------------------------------------- launch --- */
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();

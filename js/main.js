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
                 hard: false, govern: false, watch: true };

  var lastResult = null;   // kept for re-run / download / copy
  var watch = null;        // live-count animation state

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
    sel("homeLink").onclick = goMenu;
    if (G.buildGeo) G.buildGeo();
    sel("exploreBtn").onclick = function () { G.UI.renderExplore(); };
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
    var lineages = G.eligibleDynastyLineages(choice.eras);
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

    sel("startBtn").onclick = function () {
      if (sel("startBtn").disabled) return;
      G.newGame({
        mode: choice.mode,
        lineage: choice.mode === "dynasty" ? choice.lineage : null,
        hard: choice.hard,
        eras: choice.eras.slice(),
        difficulty: choice.difficulty,
        govern: choice.govern,
        watch: choice.watch
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

  function startWatch(res) {
    cancelWatch();
    var setup = G.UI.renderWatch(res);
    watch = {
      res: res, byId: setup.byId, colour: setup.colour, results: res.campaign.results,
      bounds: regionBounds(res.campaign.results), i: 0, won: 0, regIdx: 0, regWon: 0,
      cancelled: false, done: false, raf: null
    };
    G.UI.pushFeed("Counting in " + watch.bounds[0].name + "…", "muted");
    frame();
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
      last = res; w.i++;
    }
    if (last) G.UI.pushFeed(last.name + (last.won ? " — won" : " — lost"), last.won ? "win" : "");
    G.UI.setWatchTally(w.won, w.i);
  }

  function frame() {
    if (!watch || watch.cancelled) return;
    reveal(5);
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

    sel("againBtn").onclick = function () {
      cancelWatch();
      lastResult = G.hold();
      if (G.state.watch) startWatch(lastResult);
      else showResult(lastResult);
    };
    sel("menuBtn").onclick = goMenu;
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

/* =============================================================================
   650 — POLISH
   • G.Sound    — an optional, synthesised soundscape (Web Audio, nothing to
                  download): the Big Ben bongs as the polls close, a soft
                  chime on your gains, a sting for the big moments. Off by
                  default; the toggle lives in the footer and is remembered.
   • Map zoom   — pinch / wheel to zoom and drag to pan every hex map (UK and
                  each nation's cartogram); double-tap to reset. A tap still
                  shows the seat and its MP.
   • Cabinet card — a shareable PNG of your front bench, straight from the
                  draft (or the result).
   • Region "why" — each region on the result explains itself: seats gained
                  on 2024, what the voter blocs did there, and how you ran
                  against the projection.
   ============================================================================= */
window.G = window.G || {};
(function () {
  var G = window.G;

  /* ------------------------------------------------------------- sound --- */
  var S = G.Sound = { on: false, ctx: null, last: 0 };
  try { S.on = window.localStorage.getItem("650.sound") === "1"; } catch (e) {}
  S.audio = function () {
    if (!S.on) return null;
    if (!S.ctx) { var A = window.AudioContext || window.webkitAudioContext; if (!A) return null; S.ctx = new A(); }
    if (S.ctx.state === "suspended") S.ctx.resume();
    return S.ctx;
  };
  function tone(ctx, freq, start, dur, gain, type) {
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || "sine"; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(gain, start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    o.connect(g); g.connect(ctx.destination); o.start(start); o.stop(start + dur + 0.05);
  }
  /* a bell: inharmonic partials over a long decay */
  function bell(ctx, f, t, vol) {
    [[1, 1], [2.0, 0.5], [2.4, 0.35], [3.0, 0.25], [4.1, 0.15], [5.4, 0.08]].forEach(function (p) { tone(ctx, f * p[0], t, 3.2 / p[0] + 0.6, vol * p[1]); });
  }
  S.play = function (what) {
    var ctx = S.audio(); if (!ctx) return;
    var t = ctx.currentTime + 0.02;
    if (what === "bong") { bell(ctx, 164.8, t, 0.28); bell(ctx, 164.8, t + 2.4, 0.22); }      // Big Ben's E3, twice
    else if (what === "chime") { tone(ctx, 880, t, 0.35, 0.06, "triangle"); tone(ctx, 1318.5, t + 0.07, 0.4, 0.04, "triangle"); }
    else if (what === "sting") { tone(ctx, 196, t, 0.9, 0.12, "sawtooth"); tone(ctx, 185, t + 0.12, 0.9, 0.09, "sawtooth"); }
    else if (what === "scalp") { [523.3, 659.3, 784, 1046.5].forEach(function (f, i) { tone(ctx, f, t + i * 0.09, 0.5, 0.07, "triangle"); }); }
    else if (what === "fanfare") { [392, 523.3, 659.3, 784].forEach(function (f, i) { tone(ctx, f, t + i * 0.14, 0.8, 0.09, "triangle"); }); }
  };
  /* per-seat: only your gains chime, and never more than ~4 a second */
  S.seat = function (r) {
    if (!S.on || !r || !r.won) return;
    var now = Date.now(); if (now - S.last < 240) return;
    if (r.change === "gain" || !r.gss) { S.last = now; S.play("chime"); }
  };
  S.set = function (on) {
    S.on = !!on;
    try { window.localStorage.setItem("650.sound", S.on ? "1" : "0"); } catch (e) {}
    var b = document.getElementById("soundToggleBtn"); if (b) b.textContent = S.on ? "🔔 Sound on" : "🔕 Sound off";
    if (S.on) S.play("chime");
  };

  /* -------------------------------------------------------------- zoom --- */
  G.UI = G.UI || {};
  G.UI.enableZoom = function (svg) {
    if (!svg || svg._zoom) return;
    var vb = (svg.getAttribute("viewBox") || "").split(/[\s,]+/).map(Number);
    if (vb.length !== 4 || vb.some(isNaN)) return;
    var base = vb.slice(), cur = vb.slice();
    svg._zoom = true;
    svg.style.touchAction = "none";
    function apply() { svg.setAttribute("viewBox", cur.join(" ")); }
    function clampView() {
      cur[2] = Math.max(base[2] / 8, Math.min(base[2], cur[2])); cur[3] = cur[2] * base[3] / base[2];
      cur[0] = Math.max(base[0], Math.min(base[0] + base[2] - cur[2], cur[0]));
      cur[1] = Math.max(base[1], Math.min(base[1] + base[3] - cur[3], cur[1]));
    }
    function toSvg(cx, cy) { var r = svg.getBoundingClientRect(); return [cur[0] + (cx - r.left) / r.width * cur[2], cur[1] + (cy - r.top) / r.height * cur[3]]; }
    function zoomAt(cx, cy, k) {
      var p = toSvg(cx, cy), nw = cur[2] / k;
      nw = Math.max(base[2] / 8, Math.min(base[2], nw)); k = cur[2] / nw;
      cur[0] = p[0] - (p[0] - cur[0]) / k; cur[1] = p[1] - (p[1] - cur[1]) / k; cur[2] = nw; cur[3] = nw * base[3] / base[2];
      clampView(); apply();
    }
    svg.addEventListener("wheel", function (e) {
      /* at full view the wheel scrolls the page; ctrl/⌘ + wheel (or a
         trackpad pinch) zooms, and once zoomed the wheel keeps zooming */
      if (!e.ctrlKey && !e.metaKey && cur[2] >= base[2] - 0.01) return;
      e.preventDefault(); zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? 1.25 : 0.8);
    }, { passive: false });
    var pts = {}, startDist = 0, startW = 0, moved = false, lastTap = 0;
    svg.addEventListener("pointerdown", function (e) { pts[e.pointerId] = { x: e.clientX, y: e.clientY }; moved = false;
      var ids = Object.keys(pts); if (ids.length === 2) { var a = pts[ids[0]], b = pts[ids[1]]; startDist = Math.hypot(a.x - b.x, a.y - b.y); startW = cur[2]; } });
    svg.addEventListener("pointermove", function (e) {
      var p = pts[e.pointerId]; if (!p) return;
      var ids = Object.keys(pts);
      if (ids.length === 2) {
        p.x = e.clientX; p.y = e.clientY;
        var a = pts[ids[0]], b = pts[ids[1]], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (startDist > 10) { var k = (startW / cur[2]) * (d / startDist); zoomAt((a.x + b.x) / 2, (a.y + b.y) / 2, k); moved = true; }
        e.preventDefault(); return;
      }
      var dx = e.clientX - p.x, dy = e.clientY - p.y;
      if (Math.abs(dx) + Math.abs(dy) > 3 && cur[2] < base[2] - 0.01) {
        var r = svg.getBoundingClientRect();
        cur[0] -= dx / r.width * cur[2]; cur[1] -= dy / r.height * cur[3]; clampView(); apply();
        p.x = e.clientX; p.y = e.clientY; moved = true; e.preventDefault();
      }
    });
    function up(e) {
      delete pts[e.pointerId];
      if (!moved && e.type === "pointerup") {
        var now = Date.now();
        if (now - lastTap < 300) { cur = base.slice(); apply(); }
        lastTap = now;
      }
    }
    svg.addEventListener("pointerup", up); svg.addEventListener("pointercancel", up); svg.addEventListener("pointerleave", up);
    svg.addEventListener("click", function (e) { if (moved) { e.stopPropagation(); e.preventDefault(); } }, true);
  };
  /* every hex map gets zoom as soon as it's drawn */
  function scan(root) {
    var svgs = (root || document).querySelectorAll ? (root || document).querySelectorAll(".hexmap svg") : [];
    for (var i = 0; i < svgs.length; i++) G.UI.enableZoom(svgs[i]);
  }
  if (window.MutationObserver) new MutationObserver(function (muts) {
    for (var i = 0; i < muts.length; i++) if (muts[i].addedNodes.length) { scan(document); break; }
  }).observe(document.documentElement, { childList: true, subtree: true });

  /* ---------------------------------------------------- cabinet card ----- */
  G.UI.cabinetCard = function () {
    var st = G.state; if (!st || !st.cabinet) return null;
    var cab = st._playerCabinet || st.cabinet;
    var ports = (G.PORTFOLIOS || []).filter(function (p) { return cab[p.key]; });
    var cols = 4, rows = Math.ceil(ports.length / cols), W = 1200, H = 250 + rows * 190;
    var c = document.createElement("canvas"); c.width = W; c.height = H;
    var x = c.getContext("2d");
    var dark = !document.documentElement.classList.contains("theme-light");
    x.fillStyle = dark ? "#0f1623" : "#f6f1e4"; x.fillRect(0, 0, W, H);
    var ink = dark ? "#dde5f0" : "#1e1a12", soft = dark ? "#7a90a8" : "#6b6252", brass = "#e8a030";
    var colour = G.UI.ticketColour ? G.UI.ticketColour(st) : brass;
    x.fillStyle = colour; x.fillRect(0, 0, W, 10);
    x.fillStyle = brass; x.font = "600 22px Georgia, serif"; x.textAlign = "center";
    x.fillText("6 5 0  ·  M Y   C A B I N E T", W / 2, 62);
    x.fillStyle = ink; x.font = "700 46px Georgia, serif";
    x.fillText(G.UI.ticketName ? G.UI.ticketName(st).replace(/ seats$/, "") : "My cabinet", W / 2, 120);
    var sys = G.activeElectoralSystem && G.activeElectoralSystem();
    var rating = G.rateCabinet(cab);
    x.fillStyle = soft; x.font = "20px Georgia, serif";
    x.fillText((sys ? (sys.country + " · " + sys.name) : "United Kingdom · House of Commons") + "  ·  cabinet strength " + Math.round(rating.perSeat), W / 2, 156);
    ports.forEach(function (p, i) {
      var col = i % cols, row = Math.floor(i / cols), cx = 150 + col * 300, cy = 250 + row * 190;
      var pol = cab[p.key], fit = G.fitClass ? G.fitClass(pol, p.key) : "okay";
      x.beginPath(); x.arc(cx, cy, 46, 0, Math.PI * 2);
      x.fillStyle = dark ? "#1d2a3d" : "#e9e1cc"; x.fill();
      x.lineWidth = 5; x.strokeStyle = fit === "good" ? "#3dc888" : fit === "okay" ? brass : "#e04060"; x.stroke();
      x.fillStyle = ink; x.font = "700 30px Georgia, serif";
      x.fillText(G.UI._initials(pol.name), cx, cy + 11);
      x.font = "700 21px Georgia, serif";
      var nm = pol.name.length > 22 ? pol.name.slice(0, 21) + "…" : pol.name;
      x.fillText(nm, cx, cy + 80);
      x.fillStyle = soft; x.font = "15px Georgia, serif";
      var post = (G.NightFX ? G.NightFX.postTitle(p.key) : p.name);
      x.fillText(post.length > 30 ? post.slice(0, 29) + "…" : post, cx, cy + 104);
    });
    x.fillStyle = soft; x.font = "18px Georgia, serif";
    x.fillText("650-0.co.uk", W / 2, H - 24);
    return c;
  };
  G.UI.downloadCabinetCard = function () {
    var c = G.UI.cabinetCard(); if (!c) return;
    var a = document.createElement("a"); a.href = c.toDataURL("image/png"); a.download = "650-cabinet.png";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  /* ------------------------------------------------- region "why" -------- */
  G.UI.regionWhy = function (res, r) {
    var c = res.campaign || {}, bits = [];
    var results = (c.results || []).filter(function (x) { return x.region === r.id; });
    if (results.length && results[0].gss) {
      var gain = 0, loss = 0;
      results.forEach(function (x) {
        if (x.change === "gain" && x.won) gain++;
        if (x.change === "gain" && !x.won && x.prev === c.blocLabel) loss++;
      });
      var net = gain - loss;
      if (gain || loss) bits.push((net >= 0 ? "+" : "") + net + " on 2024" + (loss ? " (" + gain + " gained, " + loss + " lost)" : ""));
    }
    var exp = c.regionExpected && c.regionExpected[r.id];
    if (exp != null && r.total) {
      var d = r.won - Math.round(exp * r.total);
      if (Math.abs(d) >= 2) bits.push(d > 0 ? "ran " + d + " ahead of the projection" : "fell " + (-d) + " short of the projection");
    }
    if (res.blocSupport && G.electorateRegionTilt) {
      try {
        var tilt = G.electorateRegionTilt(res.blocSupport)[r.id];
        if (tilt != null && Math.abs(tilt) >= 0.05) bits.push(tilt > 0 ? "the voter blocs here broke for you" : "the voter blocs here broke against you");
      } catch (e) {}
    }
    var mom = (G.NightFX ? G.NightFX.moments(res) : null);
    if (mom) {
      mom.scalps.forEach(function (s) { var hr = results.filter(function (x) { return x.id === s.seatId; })[0]; if (hr) bits.push("took " + s.name + "'s seat"); });
      mom.ministersLost.forEach(function (s) { var hr = results.filter(function (x) { return x.id === s.seatId; })[0]; if (hr) bits.push("lost " + s.name); });
    }
    return bits.join(" · ");
  };
  var _rs = G.UI.renderRegionSummary;
  G.UI.renderRegionSummary = function (containerId, res, colour) {
    _rs.apply(this, arguments);
    var box = document.getElementById(containerId); if (!box) return;
    var rows = box.querySelectorAll(".rs-row");
    (res.campaign.byRegion || []).forEach(function (r, i) {
      var row = rows[i]; if (!row) return;
      var why = G.UI.regionWhy(res, r);
      if (!why) return;
      row.title = r.name + ": " + why;
      var w = document.createElement("span"); w.className = "rs-why"; w.textContent = why;
      row.appendChild(w);
    });
  };
})();

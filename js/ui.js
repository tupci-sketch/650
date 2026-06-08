/* =============================================================================
   650 — UI  (v2)
   Pure rendering. Reads G.state / a result object and paints the DOM.
   Interactive elements call into G.ctrl.* (defined in main.js).
   ========================================================================== */

window.G = window.G || {};
G.UI = {};

var $ = function (id) { return document.getElementById(id); };

var SCREENS = ["screen-menu", "screen-draft", "screen-watch", "screen-result", "screen-about", "screen-explore"];

G.UI.show = function (screenId) {
  SCREENS.forEach(function (s) {
    var el = $(s); if (el) el.classList.toggle("active", s === screenId);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
};

/* the colour a ticket's won seats are painted in */
G.UI.ticketColour = function (state) {
  if (state && state.mode === "dynasty") {
    var keys = Object.keys(G.PARTIES);
    for (var i = keys.length - 1; i >= 0; i--) {
      if (G.PARTIES[keys[i]].lineage === state.lineage) return G.PARTIES[keys[i]].colour;
    }
  }
  if (state && state.mode === "wildcard") return "#b3862f";
  return "#2f5d3a";
};

/* --------------------------------------------------------- draft: pips -- */
G.UI.renderProgress = function () {
  var pips = $("pips"); pips.innerHTML = "";
  var filled = G.PORTFOLIOS.length - G.openSeats().length;
  G.PORTFOLIOS.forEach(function (_, i) {
    var d = document.createElement("span");
    d.className = "pip" + (i < filled ? " on" : "");
    pips.appendChild(d);
  });
  $("draftCount").textContent = filled + " / " + G.PORTFOLIOS.length + " seats filled";
  var tag = G.state.mode === "dynasty" ? (G.state.lineage + " dynasty")
          : G.state.mode === "wildcard" ? "Wildcard \u26A1" : "Unity ticket";
  if (G.state.hard) tag += " · blind";
  if (G.state.difficulty && G.state.difficulty !== "normal")
    tag += " · " + (G.CONFIG.difficulties[G.state.difficulty] || {}).label;
  $("modeTag").textContent = tag;
};

/* --------------------------------------------------------- draft: reels - */
G.UI.renderReels = function () {
  var sp = G.state.spin;
  var pv = $("reelParty").querySelector(".reel-value");
  var ps = $("reelParty").querySelector(".reel-sub");
  var ev = $("reelEra").querySelector(".reel-value");
  var es = $("reelEra").querySelector(".reel-sub");
  if (!sp) {
    pv.innerHTML = "—"; ps.textContent = "spin to begin";
    ev.textContent = "—"; es.textContent = "";
    return;
  }
  var party = G.PARTIES[sp.party];
  var era = G.ERA_BY_ID[sp.era];
  pv.innerHTML = '<span class="party-dot" style="background:' + (party ? party.colour : "#999") + '"></span>' + (party ? party.label : sp.party);
  ps.textContent = sp.candidates.length + " available";
  ev.textContent = era ? era.label : sp.era;
  es.textContent = era ? era.years : "";
};

G.UI.flickerReels = function () {
  var parties = Object.keys(G.PARTIES);
  var p = G.PARTIES[parties[Math.floor(Math.random() * parties.length)]];
  var e = G.ERAS[Math.floor(Math.random() * G.ERAS.length)];
  $("reelParty").querySelector(".reel-value").textContent = p.label;
  $("reelParty").querySelector(".reel-sub").textContent = "···";
  $("reelEra").querySelector(".reel-value").textContent = e.label;
  $("reelEra").querySelector(".reel-sub").textContent = e.years;
};

G.UI.setSpinning = function (on) {
  $("reelParty").classList.toggle("spinning", on);
  $("reelEra").classList.toggle("spinning", on);
};

/* --------------------------------------------------------- draft: pool -- */
G.UI.renderPool = function () {
  var pool = $("pool"); pool.innerHTML = "";
  var sp = G.state.spin;
  if (!sp) { return; }

  if (sp.candidates.length === 0) {
    pool.innerHTML = '<p class="pool-empty">No one left from this party and era. Spin again or use a skip.</p>';
    return;
  }

  var note = document.createElement("p");
  note.className = "assign-note";
  if (G.state.pendingPick) {
    note.textContent = "▶ " + G.state.pendingPick.name + " chosen — now click an open seat on the right →";
  } else {
    note.style.color = "var(--ink-soft)";
    note.textContent = "Pick one to bring into your cabinet:";
  }
  pool.appendChild(note);

  sp.candidates.forEach(function (p) {
    var b = document.createElement("button");
    var isSel = G.state.pendingPick && G.state.pendingPick.name === p.name;
    b.className = "cand" + (isSel ? " sel" : "");
    var fitNames = p.fits.map(function (k) { return G.PORTFOLIO_BY_KEY[k].name.split(" ")[0]; }).slice(0, 3).join(" · ");

    var html = '<span class="who">' +
        '<span class="nm">' + p.name + '</span>' +
        '<span class="meta">fits: ' + (fitNames || "—") + '</span>';
    /* Classic mode shows more than blind: ratings + the editorial note */
    if (!G.state.hard) {
      if (p.scope === "wild") html += '<span class="wild-tag">wildcard</span>';
      if (p.note) html += '<span class="cand-note">' + p.note + '</span>';
    }
    html += '</span>';

    if (!G.state.hard) {
      var s = p.stats;
      html += '<div class="stats">' +
          '<span class="stat-chip">APP<b>' + s.appeal + '</b></span>' +
          '<span class="stat-chip">EXP<b>' + s.experience + '</b></span>' +
          '<span class="stat-chip">ORA<b>' + s.oratory + '</b></span>' +
          '<span class="stat-chip">STA<b>' + s.statecraft + '</b></span>' +
          '<span class="stat-chip">PTY<b>' + s.partyMgmt + '</b></span>' +
        '</div>';
    }
    b.innerHTML = html;
    b.onclick = function () { G.ctrl.chooseCandidate(p.name); };
    pool.appendChild(b);
  });
};

/* ------------------------------------------------------ draft: cabinet -- */
G.UI.renderCabinet = function () {
  var box = $("cabinet"); box.innerHTML = "";
  var pending = G.state.pendingPick;
  G.PORTFOLIOS.forEach(function (port) {
    var holder = G.state.cabinet[port.key];
    var seat = document.createElement("div");
    var roleShort = port.name.replace(" of the Exchequer", "").replace(" Secretary", "").replace("Prime Minister", "PM");

    if (holder) {
      var fit = holder.fits.indexOf(port.key) !== -1;
      seat.className = "seat";
      seat.innerHTML =
        '<span class="role">' + roleShort + '</span>' +
        '<span class="holder">' + holder.name +
          ' <span class="era-mini">' + (G.ERA_BY_ID[holder.era] ? G.ERA_BY_ID[holder.era].years : "") + '</span></span>' +
        '<span class="fitmark ' + (fit ? "good" : "bad") + '">' + (fit ? "✓ fit" : "△ stretch") + '</span>';
    } else if (pending) {
      seat.className = "seat target";
      seat.innerHTML =
        '<span class="role">' + roleShort + '</span>' +
        '<span class="vacant">Place ' + pending.name + ' here</span>' +
        '<span class="fitmark ' + (pending.fits.indexOf(port.key) !== -1 ? "good" : "bad") + '">' +
          (pending.fits.indexOf(port.key) !== -1 ? "✓ fit" : "△ stretch") + '</span>';
      seat.onclick = function () { G.ctrl.assign(port.key); };
    } else {
      seat.className = "seat empty";
      seat.innerHTML = '<span class="role">' + roleShort + '</span><span class="vacant">vacant</span>';
    }
    box.appendChild(seat);
  });

  if (G.state.hard) {
    $("strengthVal").textContent = "hidden";
    $("strengthVal").style.fontSize = "18px";
  } else {
    var r = G.preview();
    $("strengthVal").textContent = Math.round(r.raw);
    $("strengthVal").style.fontSize = "";
  }
};

/* ----------------------------------------------------- draft: controls - */
G.UI.refreshControls = function () {
  $("spinBtn").disabled = !!G.state.spin || G.isComplete();
  $("spinBtn").textContent = G.isComplete() ? "Cabinet complete" :
    (G.state.spin ? "Choose from the wheel" : (G.state.spinsTaken ? "Spin again" : "Spin the wheel"));
  $("skipEraBtn").disabled = !(G.state.spin && G.state.skips.era > 0);
  $("skipPartyBtn").disabled = !(G.state.spin && G.state.skips.party > 0);
  $("skipEraBtn").textContent = "↻ Different era (" + G.state.skips.era + " left)";
  $("skipPartyBtn").textContent = "↻ Different party (" + G.state.skips.party + " left)";
  $("holdBtn").disabled = !G.isComplete();
  $("holdBtn").textContent = G.state.watch ? "Hold the election →" : "Hold the election";
};

G.UI.renderDraft = function () {
  G.UI.renderProgress();
  G.UI.renderReels();
  G.UI.renderPool();
  G.UI.renderCabinet();
  G.UI.refreshControls();
};

/* ================================================================ MAP === */
/* Interactive hex cartogram of all 650 constituencies (2024 boundaries).
   Builds an SVG once and returns { byId } so the watch-along can flip seats. */
G.UI._hexPts = function (cx, cy, s) {
  var w = Math.sqrt(3) / 2 * s;
  return [cx, cy - s, cx + w, cy - s / 2, cx + w, cy + s / 2,
          cx, cy + s, cx - w, cy + s / 2, cx - w, cy - s / 2].join(",");
};
G.UI._tip = function () {
  var t = $("mapTip");
  if (!t) { t = document.createElement("div"); t.id = "mapTip"; t.className = "map-tip"; document.body.appendChild(t); }
  return t;
};
G.UI.buildMap = function (containerId, opts) {
  opts = opts || {};
  var geo = G.buildGeo(), cons = geo.constituencies;
  var s = 10, w = Math.sqrt(3) * s, rowH = 1.5 * s, W2 = Math.sqrt(3) / 2 * s;
  var minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9, P = [];
  cons.forEach(function (c) {
    var shift = (((c.r % 2) + 2) % 2);
    var cx = (c.q + 0.5 * shift) * w, cy = (-c.r) * rowH;   // north up
    P.push({ c: c, cx: cx, cy: cy });
    if (cx - W2 < minX) minX = cx - W2; if (cx + W2 > maxX) maxX = cx + W2;
    if (cy - s < minY) minY = cy - s; if (cy + s > maxY) maxY = cy + s;
  });
  var pad = 6, vbW = (maxX - minX) + pad * 2, vbH = (maxY - minY) + pad * 2;
  var resById = {};
  if (opts.results) opts.results.forEach(function (r) { resById[r.id] = r; });
  var svg = '<svg class="hexsvg" viewBox="' + (minX - pad) + ' ' + (minY - pad) + ' ' + vbW + ' ' + vbH +
            '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="UK constituency map">';
  P.forEach(function (p) {
    var c = p.c, fill = "rgba(80,74,60,.10)", state = "", info = "";
    if (opts.mode === "explore") {
      var mp = geo.seatMP[c.gss];
      fill = mp ? mp.colour : "rgba(80,74,60,.18)";
      info = mp ? (mp.name + " (" + mp.party + ")") : "vacant / no data";
    } else if (opts.revealed && opts.results) {
      var rr = resById[c.id];
      if (rr && rr.won) { fill = opts.colour; state = "won"; } else { fill = "rgba(80,74,60,.22)"; state = "lost"; }
    }
    svg += '<polygon points="' + G.UI._hexPts(p.cx, p.cy, s) + '" fill="' + fill + '"' +
           ' data-id="' + c.id + '" data-name="' + c.name.replace(/"/g, "&quot;") + '"' +
           (info ? ' data-info="' + info.replace(/"/g, "&quot;") + '"' : '') +
           (state ? ' data-state="' + state + '"' : '') + '></polygon>';
  });
  svg += '</svg>';
  var box = $(containerId); box.innerHTML = svg;
  var svgEl = box.querySelector("svg"), tip = G.UI._tip();
  function showTip(t, x, y) {
    var name = t.getAttribute("data-name"), info = t.getAttribute("data-info"), st = t.getAttribute("data-state");
    tip.textContent = name + (info ? " — " + info : st === "won" ? " — won" : st === "lost" ? " — lost" : "");
    tip.style.display = "block"; tip.style.left = x + "px"; tip.style.top = (y - 14) + "px";
  }
  svgEl.addEventListener("mousemove", function (e) { if (e.target.tagName === "polygon") showTip(e.target, e.clientX, e.clientY); else tip.style.display = "none"; });
  svgEl.addEventListener("mouseleave", function () { tip.style.display = "none"; });
  svgEl.addEventListener("click", function (e) { if (e.target.tagName === "polygon") showTip(e.target, e.clientX, e.clientY); });
  var byId = {}, polys = svgEl.querySelectorAll("polygon");
  for (var i = 0; i < polys.length; i++) byId[polys[i].getAttribute("data-id")] = polys[i];
  return { byId: byId };
};
G.UI.flipSeat = function (el, won, colour) {
  if (!el) return;
  el.setAttribute("fill", won ? colour : "rgba(80,74,60,.22)");
  el.setAttribute("data-state", won ? "won" : "lost");
};
G.UI.renderMapLegend = function (containerId, colour, mode) {
  var label = mode === "dynasty" ? "your party" : "your seats";
  $(containerId).innerHTML =
    '<span class="bk"><span class="bk-sw" style="background:' + colour + '"></span>' + label + '</span>' +
    '<span class="bk"><span class="bk-sw lost"></span>other parties</span>' +
    '<span class="bk muted-k">hover / tap a hex for the seat</span>';
};
G.UI.renderRegionSummary = function (containerId, res, colour) {
  var box = $(containerId); if (!box) return;
  box.innerHTML = "";
  res.campaign.byRegion.forEach(function (r) {
    var pct = r.total ? Math.round(r.won / r.total * 100) : 0;
    var row = document.createElement("div"); row.className = "rs-row";
    row.innerHTML =
      '<span class="rs-name">' + r.name + '</span>' +
      '<span class="rs-bar"><span class="rs-fill" style="width:' + pct + '%;background:' + colour + '"></span></span>' +
      '<span class="rs-num">' + r.won + ' / ' + r.total + '</span>';
    box.appendChild(row);
  });
};
G.UI.renderExplore = function () {
  G.UI.buildMap("mapExplore", { mode: "explore" });
  var geo = G.buildGeo(), counts = {};
  Object.keys(geo.seatMP).forEach(function (g) { var p = geo.seatMP[g].party; counts[p] = (counts[p] || 0) + 1; });
  var top = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a]; });
  $("exploreLegend").innerHTML = top.map(function (p) {
    var col = (G.PARTIES[p] || {}).colour || "#888";
    return '<span class="bk"><span class="bk-sw" style="background:' + col + '"></span>' + p + ' ' + counts[p] + '</span>';
  }).join("") + '<span class="bk muted-k">hover / tap a hex</span>';
  G.UI.show("screen-explore");
};

/* =========================================================== WATCH-ALONG = */
G.UI.renderWatch = function (res) {
  var colour = G.UI.ticketColour(G.state);
  $("watchTicketName").textContent = G.state.mode === "dynasty" ? (G.state.lineage + " seats") : "Your seats";
  $("watchSeats").textContent = "0";
  $("watchDeclared").textContent = "0";
  $("watchMaj").textContent = G.CONFIG.majority;
  $("watchFeed").innerHTML = '<div class="feed-line muted">The polls have closed. Counting begins…</div>';
  $("toResultBtn").style.display = "none";
  $("skipCountBtn").style.display = "";
  var map = G.UI.buildMap("mapWatch", { mode: "result", results: res.campaign.results, colour: colour, revealed: false });
  G.UI.renderMapLegend("mapWatchLegend", colour, G.state.mode);
  G.UI.show("screen-watch");
  return { byId: map.byId, colour: colour };
};

G.UI.pushFeed = function (text, cls) {
  var feed = $("watchFeed");
  var line = document.createElement("div");
  line.className = "feed-line" + (cls ? " " + cls : "");
  line.textContent = text;
  feed.insertBefore(line, feed.firstChild);
  while (feed.children.length > 7) feed.removeChild(feed.lastChild);
};

G.UI.setWatchTally = function (seats, declared) {
  $("watchSeats").textContent = seats;
  $("watchDeclared").textContent = declared;
};

/* ============================================================== RESULTS == */
G.UI.renderResult = function (res) {
  var C = G.CONFIG;
  var banner = $("govtBanner");
  if (res.tier.govt) {
    banner.className = "govt-banner win";
    banner.textContent = res.tier.key === "hung"
      ? "You are invited to form a government" : "You form His Majesty's Government";
  } else {
    banner.className = "govt-banner lose";
    banner.textContent = "You lead the Opposition — the Shadow Cabinet";
  }

  $("tierName").textContent = res.tier.label;

  var maj = res.majorityOf, ml;
  if (res.seats >= C.totalSeats) ml = "Every seat in the House. This is not supposed to be possible.";
  else if (maj >= 0) ml = "A working majority of <b>" + maj + "</b>.";
  else ml = "Short of a majority by <b>" + Math.abs(maj) + "</b> seats.";
  if (res.contestable < C.totalSeats)
    ml += " &nbsp;·&nbsp; this ticket could only contest <b>" + res.contestable + "</b> seats.";
  $("majorityLine").innerHTML = ml;

  /* governing verdict */
  var gp = $("governPanel");
  if (res.govern) {
    gp.style.display = "";
    var gv = res.governVerdict;
    $("govPct").textContent = res.tier.govt ? gv.stability + "%" : "—";
    $("govLine").textContent = gv.line;
    setTimeout(function () { $("govFill").style.width = (res.tier.govt ? gv.stability : 0) + "%"; }, 90);
  } else {
    gp.style.display = "none";
  }

  /* results map (fully declared) + a per-region summary */
  var colour = G.UI.ticketColour(G.state);
  G.UI.buildMap("mapResult", { mode: "result", results: res.campaign.results, colour: colour, revealed: true });
  G.UI.renderMapLegend("mapResultLegend", colour, G.state.mode);
  G.UI.renderRegionSummary("regionSummary", res, colour);

  /* odds */
  var pc = function (x) { return x >= 0.995 ? "100%" : x <= 0.0005 ? "<0.1%" : (x * 100).toFixed(x < 0.1 ? 1 : 0) + "%"; };
  $("oddMaj").textContent = pc(res.odds.majority);
  $("oddLand").textContent = pc(res.odds.landslide);
  $("oddSuper").textContent = pc(res.odds.supermajority);
  $("oddSweep").textContent = pc(res.odds.sweep);
  $("rangeNote").innerHTML = "This campaign returned <b>" + res.seats + "</b> on <b>" +
    (res.voteShare * 100).toFixed(1) + "%</b> of the vote. Across " + C.trials.toLocaleString() +
    " simulated campaigns the result ranged from <b>" + res.range.low + "</b> to <b>" + res.range.high +
    "</b> seats (median <b>" + res.range.median + "</b>; central projection <b>" + res.expectedSeats +
    "</b>). Run it again to fight another.";

  /* commons bar */
  $("majMark").style.left = (C.majority / C.totalSeats * 100) + "%";
  $("majKeyLabel").textContent = C.majority + " needed";
  setTimeout(function () { $("commonsFill").style.width = (res.seats / C.totalSeats * 100) + "%"; }, 80);

  /* front bench */
  var roll = $("cabinetRoll"); roll.innerHTML = "";
  G.PORTFOLIOS.forEach(function (port) {
    var h = G.state.cabinet[port.key];
    var line = document.createElement("div"); line.className = "roll-line";
    line.innerHTML = '<span class="r">' + port.name + '</span><span class="n">' + (h ? h.name : "—") + '</span>';
    roll.appendChild(line);
  });

  G.UI.countTo($("seatNumber"), res.seats);
  G.UI.show("screen-result");
};

G.UI.countTo = function (el, target) {
  var start = performance.now(), dur = 1100;
  function frame(t) {
    var k = Math.min(1, (t - start) / dur);
    var eased = 1 - Math.pow(1 - k, 3);
    var v = Math.round(target * eased);
    el.innerHTML = v + '<span class="of"> / 650</span>';
    if (k < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
};

/* ------------------------------------------------- shareable result card */
G.UI.drawShareCard = function (res) {
  var cv = $("shareCanvas"), x = cv.getContext("2d");
  var W = cv.width, H = cv.height;

  x.fillStyle = "#f3ecda"; x.fillRect(0, 0, W, H);
  var g = x.createRadialGradient(W * 0.85, 0, 0, W * 0.85, 0, W);
  g.addColorStop(0, "rgba(47,93,58,.16)"); g.addColorStop(1, "rgba(47,93,58,0)");
  x.fillStyle = g; x.fillRect(0, 0, W, H);

  x.strokeStyle = "#20201b"; x.lineWidth = 3; x.strokeRect(26, 26, W - 52, H - 52);
  x.strokeStyle = "#b3862f"; x.lineWidth = 1; x.strokeRect(34, 34, W - 68, H - 68);

  x.textAlign = "center";
  x.fillStyle = "#862231";
  x.font = "500 22px 'Spline Sans Mono', monospace";
  var modeLine = G.state.mode === "dynasty" ? (G.state.lineage.toUpperCase() + " DYNASTY")
               : G.state.mode === "wildcard" ? "WILDCARD" : "UNITY TICKET";
  x.fillText("6 5 0   ·   " + modeLine, W / 2, 96);

  x.fillStyle = "#20201b";
  x.font = "900 210px 'Fraunces', Georgia, serif";
  x.fillText(String(res.seats), W / 2, 320);
  x.fillStyle = "#4f4a3c";
  x.font = "500 30px 'Spline Sans Mono', monospace";
  x.fillText("SEATS OF 650", W / 2, 366);

  x.fillStyle = "#862231";
  x.font = "italic 700 46px 'Fraunces', Georgia, serif";
  x.fillText(res.tier.label, W / 2, 432);

  x.fillStyle = "#2f5d3a";
  x.font = "500 24px 'Spline Sans Mono', monospace";
  x.fillText(res.tier.govt ? "FORMS THE GOVERNMENT" : "LEADS THE OPPOSITION", W / 2, 472);

  var pm = G.state.cabinet["pm"], ch = G.state.cabinet["chancellor"], fo = G.state.cabinet["foreign"];
  x.fillStyle = "#20201b";
  x.font = "600 26px 'Newsreader', Georgia, serif";
  var who = [];
  if (pm) who.push("PM " + pm.name);
  if (ch) who.push("Chancellor " + ch.name);
  x.fillText(who.join("    ·    "), W / 2, 528);
  if (fo) x.fillText("Foreign Secretary " + fo.name, W / 2, 560);

  x.fillStyle = "#4f4a3c";
  x.font = "400 20px 'Spline Sans Mono', monospace";
  x.fillText("can you build the greatest cabinet — and go 650-0?", W / 2, H - 60);

  return cv.toDataURL("image/png");
};

G.UI.resultText = function (res) {
  var pm = G.state.cabinet["pm"], ch = G.state.cabinet["chancellor"];
  var modeLine = G.state.mode === "dynasty" ? (G.state.lineage + " dynasty")
               : G.state.mode === "wildcard" ? "wildcard cabinet" : "unity ticket";
  var lines = [
    "650 — my " + modeLine + " won " + res.seats + " of 650 seats.",
    res.tier.label + (res.tier.govt ? " — formed the government." : " — leads the opposition."),
    (pm ? "PM: " + pm.name : "") + (ch ? "  ·  Chancellor: " + ch.name : ""),
    "Can you go 650-0? — 650-0.co.uk"
  ];
  return lines.filter(Boolean).join("\n");
};

/* ------------------------------------------------------------- about --- */
G.UI.renderAbout = function () {
  $("aboutBody").innerHTML =
    '<h3>The idea</h3>' +
    '<p>Spin a wheel that lands on a party and an era, draft whichever politician fortune offers you, and fill all twelve seats of the cabinet. Then hold a general election. Win a majority of the 650 seats and you govern; fall short and you become the Shadow Cabinet. The white whale is the impossible one — every seat in the House, a 650-0 clean sweep.</p>' +
    '<h3>With thanks</h3>' +
    '<p>650 is an unaffiliated homage to two brilliant sports-draft games: <b>82-0</b>, which has you draft an all-time NBA roster and chase a perfect 82–0 season, and <b>38-0</b>, the Premier League version over a 38-game season. 650 borrows their core loop — a constrained, luck-of-the-draw draft against the dream of a flawless record — and points it at Westminster.</p>' +
    '<h3>How a seat is scored</h3>' +
    '<p>Every politician carries five ratings: <code>appeal</code>, <code>experience</code>, <code>oratory</code>, <code>statecraft</code> and <code>party management</code>. Each cabinet seat weights those five differently — a Chancellor leans on statecraft and experience, the Leader of the House on oratory. Sit someone in a job they actually held and they earn a fit bonus; play them out of position and they take a penalty.</p>' +
    '<h3>How the election works — seat by seat</h3>' +
    '<p>Your cabinet\'s total strength maps to a projected national vote share, nudged by your chosen difficulty. That share sets a national per-seat win probability through a responsiveness curve inspired by the historic "cube law" of British elections. Then every one of the 650 constituencies is fought as its own contest: a regional lean, a shared regional swing, and a dose of per-seat luck decide each winner. That is the cruelty of first-past-the-post — a small move in the vote can swing a great many seats. Run many campaigns and you get the odds you were really facing.</p>' +
    '<h3>Modes, eras &amp; difficulty</h3>' +
    '<p>A <b>unity ticket</b> drafts across all parties and can contest all 650 seats. A <b>single-party dynasty</b> only wins where that party\'s geography allows — an SNP dynasty can sweep Scotland but never form a UK majority. <b>Wildcard</b> throws open the whole globe and all of history. You can leave eras out before you start, choose Easy/Normal/Hard, hide the ratings to draft on reputation alone, watch the count seat by seat or skip to the verdict, and simply simulate or play on to govern.</p>' +
    '<h3>The map is real</h3>' +
    '<p>The results map is a hex cartogram of all 650 Westminster constituencies on the 2024 boundaries — the same style of map the BBC and others use on election night. Each hexagon is one seat; hover or tap any of them to see the constituency, and in the explorer, the actual sitting MP and their party. The hex layout is by <b>Open Innovations</b> (open-innovations.org) and contributors, used under an open licence.</p>' +
    '<h3>The current Parliament is in the game</h3>' +
    '<p>Every sitting MP is draftable, by their real name, party and constituency, sourced from <b>mySociety\'s parlparse</b> open dataset. Their ratings are the game\'s editorial baseline: a few dozen front-rank figures are hand-rated, and everyone else gets a consistent, modest baseline — rather than inventing biographies for hundreds of backbenchers. That depth is what lets the big parties field a full single-party dynasty.</p>' +
    '<h3>The ratings are meant to be argued about</h3>' +
    '<p>The stats are an editorial abstraction, applied by the same logic to every party and anchored to the record where possible. Wildcard mode is satire, not endorsement: figures responsible for atrocities are named as historical fact and their disastrous records keep them poor picks. Everything lives in one plain data file, so disagree by editing it.</p>';
  G.UI.show("screen-about");
};

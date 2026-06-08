/* =============================================================================
   650 — UI  (v2)
   Pure rendering. Reads G.state / a result object and paints the DOM.
   Interactive elements call into G.ctrl.* (defined in main.js).
   ========================================================================== */

window.G = window.G || {};
G.UI = {};

var $ = function (id) { return document.getElementById(id); };

var SCREENS = ["screen-menu", "screen-draft", "screen-watch", "screen-result", "screen-about", "screen-explore", "screen-govern", "screen-legacy", "screen-policy", "screen-leaderboard"];

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
  if (sp.stage === "tier") ps.textContent = sp.full.length + " in play — spin for a tier";
  else if (sp.tier) ps.textContent = sp.tier.label + " · " + sp.candidates.length + " shortlisted";
  else ps.textContent = sp.candidates.length + " available";
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

  /* TIER STAGE — too many in this party+era: spin for a tier first */
  if (sp.stage === "tier") {
    var tnote = document.createElement("p");
    tnote.className = "assign-note"; tnote.style.color = "var(--ink-soft)";
    tnote.textContent = "A deep bench — " + sp.full.length + " in play. Spin for a calibre, then pick from a shortlist:";
    pool.appendChild(tnote);
    sp.tiers.forEach(function (t) {
      var b = document.createElement("button");
      b.className = "tier-opt tier-" + t.key;
      b.innerHTML = '<span class="tier-name">' + t.label + '</span>' +
                    '<span class="tier-count">' + t.count + ' to choose from</span>';
      b.onclick = function () { G.ctrl.spinTier(t.key); };
      pool.appendChild(b);
    });
    return;
  }

  if (!sp.candidates || sp.candidates.length === 0) {
    pool.innerHTML = '<p class="pool-empty">No one left from this party and era. Spin again or use a do-over.</p>';
    return;
  }

  var note = document.createElement("p");
  note.className = "assign-note";
  if (G.state.pendingPick) {
    note.textContent = "▶ " + G.state.pendingPick.name + " chosen — now click an open seat on the right →";
  } else {
    note.style.color = "var(--ink-soft)";
    note.textContent = sp.tier ? ("The " + sp.tier.label.toLowerCase() + " shortlist — pick one:") : "Pick one to bring into your cabinet:";
  }
  pool.appendChild(note);

  sp.candidates.forEach(function (p) {
    var b = document.createElement("button");
    var isSel = G.state.pendingPick && G.state.pendingPick.name === p.name;
    b.className = "cand" + (isSel ? " sel" : "");
    var fitNames = p.fits.map(function (k) { return (G.PORTFOLIO_BY_KEY[k] ? G.PORTFOLIO_BY_KEY[k].name.split(" ")[0] : k); }).slice(0, 3).join(" · ");

    var html = '<span class="who">' +
        '<span class="nm">' + p.name + '</span>' +
        '<span class="meta">fits: ' + (fitNames || "—") + '</span>';
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

  if (G.poolRemainder && G.poolRemainder() > 0) {
    var rb = document.createElement("button");
    rb.className = "reshuffle-btn";
    rb.textContent = "↻ Show me different names (" + G.poolRemainder() + " more)";
    rb.onclick = function () { G.ctrl.reshuffle(); };
    pool.appendChild(rb);
  }
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
      var hCls = G.fitClass(holder, port.key);
      var hLabel = hCls === "good" ? "✓ fit" : hCls === "okay" ? "≈ capable" : "△ stretch";
      seat.className = "seat";
      seat.innerHTML =
        '<span class="role">' + roleShort + '</span>' +
        '<span class="holder">' + holder.name +
          ' <span class="era-mini">' + (G.ERA_BY_ID[holder.era] ? G.ERA_BY_ID[holder.era].years : "") + '</span></span>' +
        '<span class="fitmark ' + hCls + '">' + hLabel + '</span>';
    } else if (pending) {
      var pCls = G.fitClass(pending, port.key);
      var pLabel = pCls === "good" ? "✓ fit" : pCls === "okay" ? "≈ capable" : "△ stretch";
      seat.className = "seat target";
      seat.innerHTML =
        '<span class="role">' + roleShort + '</span>' +
        '<span class="vacant">Place ' + pending.name + ' here</span>' +
        '<span class="fitmark ' + pCls + '">' + pLabel + '</span>';
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
G.UI.filterExplore = function (term) {
  term = (term || "").trim().toLowerCase();
  var polys = document.querySelectorAll("#mapExplore polygon"), n = 0;
  for (var i = 0; i < polys.length; i++) {
    var nm = (polys[i].getAttribute("data-name") || "").toLowerCase();
    var hit = !term || nm.indexOf(term) !== -1;
    polys[i].style.opacity = hit ? "1" : "0.12";
    if (term && hit) n++;
  }
  var hint = $("exploreSearchHint");
  if (hint) hint.textContent = term ? (n + " seat" + (n === 1 ? "" : "s") + " match") : "";
};

/* ============================================================== GOVERN === */
G.UI.setMeter = function (id, value) {
  var el = $(id); if (!el) return;
  var fill = el.querySelector(".meter-fill"), num = el.querySelector(".meter-num");
  var col = value < 34 ? "var(--oxblood,#862231)" : value < 55 ? "var(--brass,#b3862f)" : "var(--green,#2f5d3a)";
  if (fill) { fill.style.width = Math.max(0, Math.min(100, value)) + "%"; fill.style.background = col; }
  if (num) num.textContent = Math.round(value);
};
G.UI.updateGovSeats = function () {
  var t = G.term, maj = t.seats - G.CONFIG.majority;
  $("govSeats").textContent = t.seats;
  $("govSeatsSub").textContent = maj >= 0 ? "(majority of " + maj + ")" : "(minority — " + Math.abs(maj) + " short)";
};
G.UI.showEvent = function (ev) {
  $("eventIcon").textContent = ev.icon || "◆";
  $("eventTitle").textContent = ev.title;
  $("eventText").textContent = ev.text;
  var box = $("eventChoices"); box.innerHTML = "";
  ev.choices.forEach(function (c, i) {
    var b = document.createElement("button");
    b.className = "choice"; b.setAttribute("data-idx", i);
    b.innerHTML = '<span class="choice-label">' + c.label + '</span>' +
                  '<span class="choice-sub">' + (c.text || "") + '</span>';
    box.appendChild(b);
  });
};
G.UI._meterLabel = function (meterId, text) {
  var el = $(meterId); if (!el) return;
  var l = el.querySelector(".meter-label"); if (l) l.textContent = text;
};
G.UI.renderGovern = function () {
  var t = G.term, opp = t.kind === "opp";
  if ($("govHeading")) $("govHeading").textContent = opp ? "In opposition" : "In government";
  $("govSession").textContent = "· session " + t.session + " of " + t.length;
  var modeLabel = opp
    ? (t.mode === "dynasty" ? (G.state.lineage + " opposition") : t.mode === "wildcard" ? "Wildcard opposition" : "Opposition front bench")
    : (t.mode === "dynasty" ? (G.state.lineage + " government") : t.mode === "wildcard" ? "Wildcard government" : "Cabinet of all the talents");
  if (t.coalition) modeLabel += " · coalition";
  else if (t.minority) modeLabel += " · minority";
  $("govModeTag").textContent = modeLabel + " · " + (t.difficulty || "normal");
  G.UI._meterLabel("meterApproval", opp ? "Public support" : "Approval");
  G.UI._meterLabel("meterEconomy", opp ? "Momentum" : "Economy");
  G.UI._meterLabel("meterUnity", "Party unity");
  G.UI.setMeter("meterApproval", t.meters.approval);
  G.UI.setMeter("meterEconomy", t.meters.economy);
  G.UI.setMeter("meterUnity", t.meters.unity);
  G.UI.updateGovSeats();
  $("govLog").innerHTML = '<div class="feed-line muted">' +
    (opp ? "You take charge of the Opposition. The long campaign begins…" : "You enter office. The work begins…") + '</div>';
  G.UI.showEvent(t.current);
  G.UI.show("screen-govern");
};
G.UI.pushGovLog = function (lines) {
  var feed = $("govLog");
  (Array.isArray(lines) ? lines : [lines]).slice().reverse().forEach(function (ln) {
    var d = document.createElement("div");
    d.className = "feed-line" + (ln.cls ? " gl-" + ln.cls : "");
    d.textContent = ln.text;
    feed.insertBefore(d, feed.firstChild);
  });
  while (feed.children.length > 9) feed.removeChild(feed.lastChild);
};
G.UI.afterChoice = function () {
  var t = G.term;
  G.UI.setMeter("meterApproval", t.meters.approval);
  G.UI.setMeter("meterEconomy", t.meters.economy);
  G.UI.setMeter("meterUnity", t.meters.unity);
  G.UI.updateGovSeats();
  $("govSession").textContent = "· session " + Math.min(t.session, t.length) + " of " + t.length;
  if (!t.over) G.UI.showEvent(t.current);
};
G.UI.legacyText = function (v) {
  if (v.kind === "opp") {
    var ov = v.outcome === "ousted" ? "I was deposed as Leader of the Opposition"
      : v.outcome === "forced" ? "I forced the government to an early election"
      : "I led the Opposition for a full parliament";
    return "650 — " + ov + ". Opposition score " + v.legacy + "/100: \u201c" + v.tier.label + "\u201d. " +
           "Build a cabinet and play at 650-0.co.uk";
  }
  var verb = v.outcome === "collapsed"
    ? "My government fell after " + v.sessionsServed + " sessions"
    : "I governed for a full term";
  return "650 — " + verb + ". Legacy score " + v.legacy + "/100: \u201c" + v.tier.label + "\u201d. " +
         "Build a cabinet and govern at 650-0.co.uk";
};
G.UI.renderLegacy = function (v) {
  var opp = v.kind === "opp";
  var b = $("legacyBanner");
  var fell = v.outcome === "collapsed" || v.outcome === "ousted";
  var win = ["great", "good", "swept", "forced"].indexOf(v.tier.key) !== -1;
  b.className = "legacy-banner " + (fell ? "fell" : win ? "win" : "mixed");
  b.textContent = v.tier.label;
  $("legacyLine").textContent = v.tier.line;
  G.UI._meterLabel("legApproval", opp ? "Public support" : "Approval");
  G.UI._meterLabel("legEconomy", opp ? "Momentum" : "Economy");
  G.UI._meterLabel("legUnity", "Party unity");
  G.UI.setMeter("legApproval", v.meters.approval);
  G.UI.setMeter("legEconomy", v.meters.economy);
  G.UI.setMeter("legUnity", v.meters.unity);
  $("legSeats").innerHTML = "<b>" + v.seats + "</b> seats · " + v.sessionsServed + " of " + v.length +
    " sessions served" + (v.caretakers ? " · " + v.caretakers + " caretaker department" + (v.caretakers > 1 ? "s" : "") : "");
  var box = $("termReview"); box.innerHTML = "";
  v.history.forEach(function (h) {
    var row = document.createElement("div"); row.className = "tr-row";
    row.innerHTML = '<span class="tr-s">S' + h.session + '</span>' +
                    '<span class="tr-t">' + h.title + '</span>' +
                    '<span class="tr-c">' + h.choice + '</span>';
    box.appendChild(row);
  });
  G.UI.show("screen-legacy");
  G.UI.countTo($("legacyNum"), v.legacy);
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

  /* post-election: solo government, coalition, or opposition */
  G.UI.renderPostElection(res);

  /* the full House breakdown */
  G.UI.renderStandings("seatBreakdown", res.breakdown);

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
G.UI._policySel = {};
G.UI._policyMode = "manifesto";
G.UI.renderPolicy = function (mode) {
  G.UI._policyMode = mode;
  var isProg = mode === "programme";
  $("policyTitle").textContent = isProg ? "Your programme for government" : "Your manifesto";
  $("policyIntro").textContent = isProg
    ? "What you will actually do in office. Match your manifesto to keep faith with the voters — diverge, and your own party may cry betrayal."
    : "What you promise to win votes. Each stance helps or hurts you at the ballot box; choose the platform you'll run on.";
  $("policyConfirm").textContent = isProg ? "Take office with this programme →" : "Adopt this manifesto →";

  var base = isProg ? ((G.state && G.state.policy) || {}) : {};
  G.UI._policySel = {};
  G.POLICY_AXES.forEach(function (ax) { G.UI._policySel[ax.key] = base[ax.key] || ax.options[0].key; });

  var box = $("policyAxes"); box.innerHTML = "";
  G.POLICY_AXES.forEach(function (ax) {
    var group = document.createElement("div"); group.className = "policy-axis";
    var h = document.createElement("p"); h.className = "policy-axis-title"; h.textContent = ax.title; group.appendChild(h);
    var opts = document.createElement("div"); opts.className = "policy-opts";
    ax.options.forEach(function (o) {
      var b = document.createElement("button");
      b.className = "policy-opt" + (G.UI._policySel[ax.key] === o.key ? " sel" : "");
      b.setAttribute("data-axis", ax.key); b.setAttribute("data-opt", o.key);
      b.innerHTML = '<span class="po-label">' + o.label + '</span><span class="po-blurb">' + o.blurb + '</span>';
      b.onclick = function () {
        G.UI._policySel[ax.key] = o.key;
        var sibs = opts.querySelectorAll(".policy-opt");
        for (var i = 0; i < sibs.length; i++) sibs[i].classList.toggle("sel", sibs[i].getAttribute("data-opt") === o.key);
      };
      opts.appendChild(b);
    });
    group.appendChild(opts); box.appendChild(group);
  });
  G.UI.show("screen-policy");
};

G.UI.renderPostElection = function (res) {
  var gp = $("governPanel"), cp = $("coalitionPanel"), op = $("oppositionPanel"), C = G.CONFIG;
  gp.style.display = "none"; cp.style.display = "none"; op.style.display = "none";
  if (!res.govern) return;                       // player chose "just the election"
  var co = res.coalition;

  if (co.soloMajority) {
    gp.style.display = "";
    var gv = res.governVerdict;
    var word = gv.stability >= 66 ? "commanding" : gv.stability >= 50 ? "workable" : gv.stability >= 38 ? "precarious" : "fragile";
    $("govPct").textContent = gv.stability + "%";
    $("govLine").textContent = "Your opening position looks " + word + ". Take office and govern through a full parliament — steer approval, the economy and your party, survive the crises, and chase a lasting legacy.";
    setTimeout(function () { $("govFill").style.width = gv.stability + "%"; }, 90);
    return;
  }

  if (co.deals.length > 0 || co.canMinority) {
    cp.style.display = "";
    $("coalitionIntro").innerHTML = "No party has a majority — you hold <b>" + res.seats + "</b> seats and need <b>" + C.majority +
      "</b>. " + (co.largest ? "As the largest party you get first go at forming a government." : "You could still try to assemble a majority of others.");
    var box = $("coalitionOptions"); box.innerHTML = "";
    co.deals.forEach(function (d, i) {
      var names = d.parties.map(function (p) { return p.party; }).join(" + ");
      var sw = d.parties.map(function (p) { return '<span class="coal-sw" style="background:' + p.colour + '"></span>'; }).join("");
      var b = document.createElement("button");
      b.className = "coal-opt"; b.setAttribute("data-act", "deal"); b.setAttribute("data-i", i);
      b.innerHTML = '<span class="coal-main">' + sw + 'Coalition with ' + names + '</span>' +
                    '<span class="coal-sub">' + d.combined + ' seats</span>' +
                    '<span class="coal-tag ' + (d.natural ? "natural" : "unlikely") + '">' + (d.natural ? "natural" : "unlikely") + '</span>';
      box.appendChild(b);
    });
    if (co.canMinority) {
      var m = document.createElement("button");
      m.className = "coal-opt minority"; m.setAttribute("data-act", "minority");
      m.innerHTML = '<span class="coal-main">Govern alone as a minority</span><span class="coal-sub">' + res.seats + ' seats · confidence on a knife-edge</span>';
      box.appendChild(m);
    }
    var o = document.createElement("button");
    o.className = "coal-opt opp"; o.setAttribute("data-act", "opposition");
    o.innerHTML = '<span class="coal-main">Decline — go into opposition</span><span class="coal-sub">let others try to govern</span>';
    box.appendChild(o);
    return;
  }

  op.style.display = "";
  $("oppositionLine").textContent = "You came up short and cannot form a government. Lead the Opposition: hold the government to account, win the by-elections, build public support and try to force them out before the next election.";
};

G.UI.renderStandings = function (containerId, breakdown, opts) {
  opts = opts || {};
  var box = $(containerId); if (!box) return;
  var max = 1; breakdown.forEach(function (b) { if (b.seats > max) max = b.seats; });
  box.innerHTML = breakdown.map(function (b) {
    var pct = Math.round(b.seats / max * 100);
    return '<div class="st-row' + (b.isYou ? " you" : "") + '">' +
      '<span class="st-name"><span class="st-sw" style="background:' + b.colour + '"></span>' +
        b.party + (b.isYou ? ' <span class="st-you">you</span>' : '') + '</span>' +
      '<span class="st-bar"><span class="st-fill" style="width:' + pct + '%;background:' + b.colour + '"></span></span>' +
      '<span class="st-seats">' + b.seats + '</span>' +
    '</div>';
  }).join("");
};
G.UI.drawShareCard = function (res) {
  var cv = $("shareCanvas"), x = cv.getContext("2d");
  var W = cv.width, H = cv.height;

  /* background */
  x.fillStyle = "#f3ecda"; x.fillRect(0, 0, W, H);
  var g = x.createRadialGradient(W * 0.5, -40, 0, W * 0.5, -40, W);
  g.addColorStop(0, "rgba(47,93,58,.14)"); g.addColorStop(1, "rgba(47,93,58,0)");
  x.fillStyle = g; x.fillRect(0, 0, W, H);
  x.strokeStyle = "#20201b"; x.lineWidth = 3; x.strokeRect(26, 26, W - 52, H - 52);
  x.strokeStyle = "#b3862f"; x.lineWidth = 1; x.strokeRect(34, 34, W - 68, H - 68);

  /* masthead */
  x.textAlign = "center"; x.fillStyle = "#862231";
  x.font = "500 22px 'Spline Sans Mono', monospace";
  var modeLine = G.state.mode === "dynasty" ? (String(G.state.lineage).toUpperCase() + " DYNASTY")
               : G.state.mode === "wildcard" ? "WILDCARD CABINET" : "UNITY TICKET";
  x.fillText("6 5 0   ·   " + modeLine, W / 2, 74);
  x.strokeStyle = "rgba(32,32,27,.28)"; x.lineWidth = 1;
  x.beginPath(); x.moveTo(70, 92); x.lineTo(W - 70, 92); x.stroke();

  /* LEFT — the headline result */
  var lx = 270;
  x.textAlign = "center"; x.fillStyle = "#20201b";
  x.font = "900 150px 'Fraunces', Georgia, serif";
  x.fillText(String(res.seats), lx, 250);
  x.fillStyle = "#4f4a3c"; x.font = "500 22px 'Spline Sans Mono', monospace";
  x.fillText("SEATS OF 650", lx, 288);
  x.fillStyle = "#862231"; x.font = "italic 700 30px 'Fraunces', Georgia, serif";
  x.fillText(res.tier.label, lx, 340);
  x.fillStyle = res.tier.govt ? "#2f5d3a" : "#862231";
  x.font = "500 19px 'Spline Sans Mono', monospace";
  x.fillText(res.tier.govt ? "FORMS THE GOVERNMENT" : "LEADS THE OPPOSITION", lx, 374);
  var maj = res.majorityOf;
  var majLine = (res.voteShare != null ? (Math.round(res.voteShare * 1000) / 10) + "% vote" : "");
  if (typeof maj === "number") majLine += (majLine ? "  ·  " : "") + (maj >= 0 ? "majority " + maj : maj + " short");
  x.fillStyle = "#4f4a3c"; x.font = "400 18px 'Spline Sans Mono', monospace";
  x.fillText(majLine, lx, 406);

  /* divider */
  x.strokeStyle = "rgba(32,32,27,.22)"; x.lineWidth = 1;
  x.beginPath(); x.moveTo(512, 118); x.lineTo(512, H - 96); x.stroke();

  /* RIGHT — the full cabinet */
  var rx = 548;
  x.textAlign = "left"; x.fillStyle = "#862231";
  x.font = "500 20px 'Spline Sans Mono', monospace";
  x.fillText("THE CABINET", rx, 138);
  var shortRole = {
    pm: "PM", chancellor: "CHANCELLOR", foreign: "FOREIGN", home: "HOME",
    deputy: "DEPUTY PM", defence: "DEFENCE", health: "HEALTH", education: "EDUCATION",
    justice: "JUSTICE", business: "BUSINESS", whip: "CHIEF WHIP", leader: "LEADER"
  };
  var y = 172, lh = 31;
  G.PORTFOLIOS.forEach(function (port) {
    var who = G.state.cabinet[port.key];
    x.fillStyle = "#862231"; x.font = "500 13px 'Spline Sans Mono', monospace";
    x.fillText(shortRole[port.key] || port.key.toUpperCase(), rx, y);
    x.fillStyle = "#20201b"; x.font = "600 21px 'Newsreader', Georgia, serif";
    x.fillText(who ? who.name : "—", rx + 168, y);
    y += lh;
  });

  /* footer */
  x.textAlign = "center"; x.fillStyle = "#4f4a3c";
  x.font = "400 18px 'Spline Sans Mono', monospace";
  x.fillText("650-0.co.uk   ·   build a cabinet, fight an election, go 650-0", W / 2, H - 46);

  return cv.toDataURL("image/png");
};
G.UI.shareCardBlob = function (res) {
  G.UI.drawShareCard(res);
  var cv = $("shareCanvas");
  return new Promise(function (resolve, reject) {
    if (cv.toBlob) cv.toBlob(function (b) { b ? resolve(b) : reject(new Error("no blob")); }, "image/png");
    else reject(new Error("toBlob unsupported"));
  });
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
    '<p>Spin a wheel that lands on a party and an era, draft whichever politician fortune offers you, and fill every seat of the cabinet. Then hold a general election. Win a majority of the 650 seats and you govern; fall short and you can try to build a coalition, govern as a minority, or cross to the Opposition. The white whale is the impossible one — every seat in the House, a 650-0 clean sweep.</p>' +
    '<h3>With thanks</h3>' +
    '<p>650 is an unaffiliated homage to two brilliant sports-draft games: <b>82-0</b>, which has you draft an all-time NBA roster and chase a perfect 82–0 season, and <b>38-0</b>, the Premier League version over a 38-game season. 650 borrows their core loop — a constrained, luck-of-the-draw draft against the dream of a flawless record — and points it at Westminster.</p>' +
    '<h3>How a seat is scored</h3>' +
    '<p>Every politician carries five ratings: <code>appeal</code>, <code>experience</code>, <code>oratory</code>, <code>statecraft</code> and <code>party management</code>. Each cabinet seat weights those five differently — a Chancellor leans on statecraft and experience, the Leader of the House on oratory. Sit someone in a job they actually held and they earn a <b>fit</b> bonus. Sit them in a closely related one — a Leader of the House, Deputy or great-office holder as Prime Minister, say, or a Chancellor at Business — and they\'re marked <b>capable</b>: no bonus, but no penalty either, so your "could-have-been-PMs" don\'t suffer for it. Play someone truly out of position and they take the <b>stretch</b> penalty.</p>' +
    '<h3>How the election works — seat by seat</h3>' +
    '<p>Your cabinet\'s total strength maps to a projected national vote share, nudged by your chosen difficulty. That share sets a national per-seat win probability through a responsiveness curve inspired by the historic "cube law" of British elections. Then every one of the 650 constituencies is fought as its own contest: a regional lean, a shared regional swing, and a dose of per-seat luck decide each winner. That is the cruelty of first-past-the-post — a small move in the vote can swing a great many seats. Run many campaigns and you get the odds you were really facing. Every seat is awarded to a party, so the whole House is shown — your bench against all the rest — and the make-up of the other parties reflects the current (2026) landscape, with Reform and the Greens as the serious forces they have become.</p>' +
    '<h3>Modes, eras &amp; difficulty</h3>' +
    '<p>A <b>unity ticket</b> drafts across all parties and can contest all 650 seats. A <b>single-party dynasty</b> draws on one tradition; its strongest ground is where that party\'s geography allows — an SNP dynasty can sweep Scotland and, in this game, contest every other seat too — only the rival parties stay bound to where they really stand. Even the insurgent traditions can now field a full twelve: a <b>Reform</b> bench drawing on UKIP and Brexit Party heritage, or a <b>Green</b> one spanning Westminster, Holyrood and the European Parliament. <b>Wildcard</b> throws open the whole globe and all of history. Before you start you can leave eras out, choose Easy/Normal/Hard, hide the ratings to draft on reputation alone, set the count to declare slow, normal or fast, watch it seat by seat or skip to the verdict, and simply simulate or play on to govern. When a party offers a deep bench — Labour after 2010 fields hundreds — you first spin for a <b>tier</b> (front rank down to the new intake, ranked by prominence) and then pick from a short, randomised shortlist, so you never scroll a list of four hundred. You can also choose how many <b>do-overs</b> you get, take a standard twelve-seat or an <b>expanded</b> sixteen-seat cabinet, and switch on a <b>policy phase</b>: a manifesto before the vote that shifts your support, and a programme in office — where keeping your promises steadies the party and breaking them invites a backlash.</p>' +
    '<h3>Govern: a term in office</h3>' +
    '<p>Win, and the game doesn\'t stop at a score — you take office. A term is played as a parliament of crisis cards across health, the economy, foreign affairs, the unions, your own backbenches and more. You juggle three meters — <b>Approval</b>, the <b>Economy</b> and <b>Party Unity</b> — plus the seats you hold, which can fall in by-elections. Crucially, the ministers you drafted now matter: many choices are gambles resolved by the relevant minister\'s stats, so a brilliant Chancellor lands a risky Budget where a weak one wrecks it. Let unity collapse and the benches revolt; let approval and your majority slide and you face a confidence vote that can end your government early. Reach polling day intact and your record is graded into a <b>legacy score</b> and a place in history.</p>' +
    '<h3>Coalitions &amp; opposition</h3>' +
    '<p>No overall majority? If another party — or two — can carry you over the line, you can strike a <b>coalition</b> (a natural partner is far easier to hold together than an awkward one), or try to govern as a <b>minority</b> on a knife-edge. Decline, and you cross to the <b>Opposition</b>: a parallel term where you steer <b>Public support</b>, <b>Momentum</b> against the government and your own <b>Party unity</b>, fight by-elections, and try to force an early election and sweep into power — or be deposed by your own side first.</p>' +
    '<h3>The map is real</h3>' +
    '<p>The results map is a hex cartogram of all 650 Westminster constituencies on the 2024 boundaries — the same style of map the BBC and others use on election night. Each hexagon is one seat; hover or tap any of them to see the constituency, and in the explorer, the actual sitting MP and their party. The hex layout is by <b>Open Innovations</b> (open-innovations.org) and contributors, used under an open licence.</p>' +
    '<h3>The current Parliament is in the game</h3>' +
    '<p>Every sitting MP is draftable, by their real name, party and constituency, sourced from <b>mySociety\'s parlparse</b> open dataset. Their ratings are the game\'s editorial baseline: a few dozen front-rank figures are hand-rated, and everyone else gets a consistent, modest baseline — rather than inventing biographies for hundreds of backbenchers. That depth is what lets the big parties field a full single-party dynasty.</p>' +
    '<h3>The ratings are meant to be argued about</h3>' +
    '<p>The stats are an editorial abstraction, applied by the same logic to every party and anchored to the record where possible. Wildcard mode is satire, not endorsement: figures responsible for atrocities are named as historical fact and their disastrous records keep them poor picks. Everything lives in one plain data file, so disagree by editing it.</p>';
  G.UI.show("screen-about");
};

/* ------------------------------------------------------- leaderboard ---- */
G.UI._esc = function (s) { return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); };
G.UI.renderLeaderboard = function (top, communal, error) {
  var status = $("lbStatus");
  if (status) status.textContent = error
    ? "Couldn't reach the shared leaderboard — showing your local board."
    : communal ? "A shared, worldwide board. Each player keeps a single best run."
               : "A local board on this device. (Deploy the backend to play communally — see leaderboard-backend.gs.)";
  var box = $("lbTable"); if (!box) return;
  if (!top || !top.length) { box.innerHTML = '<p class="pool-empty">No entries yet — be the first to post a result.</p>'; return; }
  var head = '<div class="lb-row lb-head"><span class="lb-rk">#</span><span class="lb-nm">Player</span><span class="lb-md">Ticket</span><span class="lb-seats">Seats</span><span class="lb-leg">Legacy</span></div>';
  var rows = top.slice(0, G.LB.MAX_SHOW).map(function (e, i) {
    var leg = (e.legacy === null || e.legacy === undefined) ? "—" : ("" + e.legacy);
    var tag = (e.mode || "") + (e.govt ? " · govt" : "");
    return '<div class="lb-row' + (i < 3 ? " top" : "") + '">' +
      '<span class="lb-rk">' + (i + 1) + '</span>' +
      '<span class="lb-nm">' + G.UI._esc(e.name) + '</span>' +
      '<span class="lb-md">' + G.UI._esc(tag) + '</span>' +
      '<span class="lb-seats">' + (e.seats | 0) + '</span>' +
      '<span class="lb-leg">' + leg + '</span></div>';
  }).join("");
  box.innerHTML = head + rows;
};

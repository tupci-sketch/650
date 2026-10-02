/* =============================================================================
   650 — UI for the election-night spectacle and the living term
   (vote-share bar, swingometer, the night's moments, breaking-news straps,
    the polling tracker and the named Opposition panel)
   ============================================================================= */
window.G = window.G || {};
G.UI = G.UI || {};
(function () {
  var G = window.G, UI = G.UI;
  function $(id) { return document.getElementById(id); }
  function esc(s) { return UI._esc ? UI._esc(s) : String(s); }
  function fmt(n) { return Number(n).toLocaleString(); }

  /* "MP for Hartlepool · maj 4,512" or a red "lost their seat" under a minister */
  UI.seatNote = function (res, name) {
    var c = res && res.campaign; if (!c || !c.homes || !c.homes.list) return "";
    var h = c.homes.list.filter(function (x) { return x.kind === "min" && x.name === name; })[0];
    if (!h) return "";
    var r = (c.results || []).filter(function (x) { return x.id === h.seatId; })[0]; if (!r) return "";
    var label = G.NightFX ? G.NightFX.seatLabel(r) : r.name;
    var held = r.won || r.winner === c.blocLabel;
    var sys = G.NightFX && G.NightFX.activeSys();
    if (!held && sys && sys.country === "Japan") return '<span class="roll-seat warn">lost ' + esc(label) + ' · revived on the PR list?</span>';
    if (!held) return '<span class="roll-seat lost">✖ lost ' + esc(label) + ' to ' + esc(r.winner) + (r.marginVotes != null ? ' by ' + fmt(r.marginVotes) : '') + '</span>';
    return '<span class="roll-seat">' + esc(label) + (r.marginVotes != null ? ' · maj ' + fmt(r.marginVotes) : '') + '</span>';
  };

  /* a breaking-news strap over the live map */
  var flashT = null;
  UI.flashMoment = function (m) {
    var el = $("watchFlash"); if (!el || !m) return;
    el.className = "watch-flash " + (m.cls || "");
    el.textContent = m.text;
    el.style.display = "";
    if (flashT) clearTimeout(flashT);
    flashT = setTimeout(function () { el.style.display = "none"; }, 3600);
    if (G.Sound) G.Sound.play(m.cls === "scalp" ? "scalp" : m.cls === "bad" ? "sting" : "chime");
  };

  /* ---- the result screen panel ------------------------------------------ */
  UI.renderNight = function (res) {
    var panel = $("nightPanel"); if (!panel || !G.NightFX) return;
    var sys = G.NightFX.activeSys();
    var guided = sys && (sys.despotMode || sys.coalitionStyle === "guided");
    var c = res.campaign || {};
    panel.style.display = "";

    /* vote share bar (animated) */
    var shares = G.NightFX.voteShares(res);
    var bar = $("voteShareBar"), key = $("voteShareKey");
    if (guided) {
      var off = Math.min(99.9, 97 + (res.seats / Math.max(1, res.totalSeats || res.seats)) * 2.9);
      shares = [{ party: c.blocLabel, share: Math.round(off * 10) / 10, colour: c.blocColour, isYou: true },
                { party: "Spoiled / against", share: Math.round((100 - off) * 10) / 10, colour: "#888" }];
    }
    var top = shares.slice(0, 6), other = 0;
    shares.slice(6).forEach(function (s) { other += s.share; });
    if (other > 0.05) top.push({ party: "Others", share: Math.round(other * 10) / 10, colour: "#9a9486" });
    bar.innerHTML = top.map(function (s) {
      return '<span class="vs-seg' + (s.isYou ? ' you' : '') + '" style="background:' + s.colour + '" data-w="' + s.share + '" title="' + esc(s.party + " " + s.share + "%") + '"></span>';
    }).join("");
    key.innerHTML = top.map(function (s) {
      return '<span class="vs-k"><i style="background:' + s.colour + '"></i>' + esc(s.party) + ' <b>' + s.share + '%</b></span>';
    }).join("");
    setTimeout(function () {
      var segs = bar.querySelectorAll(".vs-seg");
      for (var i = 0; i < segs.length; i++) segs[i].style.width = segs[i].getAttribute("data-w") + "%";
    }, 60);

    /* swingometer (UK, against 2024) */
    var sw = $("swingometer"), swing = G.NightFX.swing(res);
    if (swing && sw) {
      sw.style.display = "";
      var v = swing.newParty ? null : swing.swing;
      var ang = v == null ? 0 : Math.max(-80, Math.min(80, v / 15 * 80));
      sw.innerHTML =
        '<svg viewBox="0 0 220 128" class="swingo-svg" aria-label="Swingometer">' +
          '<path d="M10 118 A100 100 0 0 1 210 118" fill="none" stroke="var(--rule,#ccc)" stroke-width="18"/>' +
          '<path d="M10 118 A100 100 0 0 1 110 18" fill="none" stroke="' + swing.rival.colour + '" stroke-opacity=".55" stroke-width="18"/>' +
          '<path d="M110 18 A100 100 0 0 1 210 118" fill="none" stroke="' + swing.you.colour + '" stroke-opacity=".55" stroke-width="18"/>' +
          '<g class="swingo-needle" style="transform:rotate(0deg)" data-ang="' + ang + '"><line x1="110" y1="118" x2="110" y2="30" stroke="var(--ink,#222)" stroke-width="3"/></g>' +
          '<circle cx="110" cy="118" r="6" fill="var(--ink,#222)"/>' +
        '</svg>' +
        '<div class="swingo-read">' + (v == null
          ? 'A new party — no 2024 baseline. ' + esc(swing.rival.party) + ' ' + (swing.rival.share - swing.rival24 >= 0 ? '+' : '') + (Math.round((swing.rival.share - swing.rival24) * 10) / 10) + ' on 2024.'
          : '<b>' + (v >= 0 ? v.toFixed(1) + '% swing to you' : Math.abs(v).toFixed(1) + '% swing to ' + esc(swing.rival.party)) + '</b> from ' + (v >= 0 ? esc(swing.rival.party) : 'you') + ' since 2024') + '</div>';
      setTimeout(function () { var n = sw.querySelector(".swingo-needle"); if (n) n.style.transform = "rotate(" + n.getAttribute("data-ang") + "deg)"; }, 120);
    } else if (sw) sw.style.display = "none";

    /* the moments */
    var m = G.NightFX.moments(res), box = $("nightMoments"), parts = [];
    /* a historic what-if: judged against what really happened */
    var scKey = G.state && G.state.scenarioKey;
    var sc = scKey && (G.SCENARIOS || []).filter(function (x) { return x.key === scKey; })[0];
    if (sc && sc.par) {
      var d = res.seats - sc.par.seats;
      parts.push('<div class="nm par ' + (d > 0 ? 'win' : 'bad') + '">🏛 <b>History\'s par:</b> ' + esc(sc.par.who) + ' won ' + sc.par.seats +
        (sc.par.note ? ' (' + esc(sc.par.note) + ')' : '') + '. You won <b>' + res.seats + '</b> — ' +
        (d > 0 ? '<b>you beat history by ' + d + '</b>.' : d === 0 ? 'exactly as history had it.' : 'history did better by ' + (-d) + '.') + '</div>');
    }
    if (m) {
      m.scalps.forEach(function (s) { parts.push('<div class="nm scalp">⚡ <b>Scalp:</b> ' + esc(s.party) + ' leader <b>' + esc(s.name) + '</b> loses ' + esc(s.seat) + ' to ' + esc(s.winner === c.blocLabel ? "you" : s.winner) + '.</div>'); });
      m.ministersLost.forEach(function (x) { parts.push('<div class="nm bad">✖ Your ' + esc(x.title) + ' <b>' + esc(x.name) + '</b> loses ' + esc(x.seat) + ' to ' + esc(x.winner) + (x.marginVotes != null ? ' by ' + fmt(x.marginVotes) + ' votes' : '') + '.</div>'); });
      m.ministersHeld.filter(function (x) { return x.revived; }).forEach(function (x) { parts.push('<div class="nm warn">↺ ' + esc(x.name) + ' loses their district but is revived on the PR list.</div>'); });
      m.narrow.forEach(function (x) { parts.push('<div class="nm warn">😅 Your ' + esc(x.title) + ' <b>' + esc(x.name) + '</b> holds on by ' + fmt(x.marginVotes) + ' votes.</div>'); });
      if (m.closest.length && !guided) parts.push('<div class="nm">📏 Closest count: <b>' + esc(G.NightFX.seatLabel(m.closest[0])) + '</b>, won by ' + esc(m.closest[0].won ? "you" : m.closest[0].winner) + ' by ' + fmt(m.closest[0].marginVotes) + ' votes' + (m.recounts ? ' · ' + m.recounts + ' recount' + (m.recounts > 1 ? 's' : '') + ' on the night' : '') + '.</div>');
      var g = Object.keys(m.gains);
      if (g.length) {
        var rows = g.map(function (p) { return { p: p, g: m.gains[p] || 0, l: m.losses[p] || 0 }; })
          .concat(Object.keys(m.losses).filter(function (p) { return !m.gains[p]; }).map(function (p) { return { p: p, g: 0, l: m.losses[p] }; }))
          .sort(function (a, b) { return (b.g - b.l) - (a.g - a.l); }).slice(0, 8);
        parts.push('<div class="nm-gl"><span class="nm-gl-h">Gains & losses vs ' + (G.career && G.career.active && G.career.prevWinners ? 'last parliament' : '2024') + '</span>' + rows.map(function (r) {
          var net = r.g - r.l;
          return '<span class="nm-gl-r"><i style="background:' + G.partyColour(r.p, c.blocLabel, c.blocColour) + '"></i>' + esc(r.p) + ' <b class="' + (net >= 0 ? 'up' : 'down') + '">' + (net >= 0 ? '+' : '') + net + '</b></span>';
        }).join("") + '</div>');
      }
    }
    if (guided) parts = ['<div class="nm">The count is unanimous, as it always is. Turnout: a glorious ' + (99 + Math.round(Math.random() * 9) / 10) + '%.</div>'];
    box.innerHTML = parts.join("") || '<div class="nm muted">A quiet night: no big names fell.</div>';
    var note = $("nightNote");
    if (note) note.textContent = sys ? (sys.flag || "") + " " + (sys.name || "") : "vs the 2024 general election";
  };

  /* ---- the governing panels --------------------------------------------- */
  UI.renderPolls = function () {
    var panel = $("pollPanel"), t = G.term;
    if (!panel) return;
    if (!t || !t.polls || !t.polls.length) { panel.style.display = "none"; return; }
    panel.style.display = "";
    var despot = t.tl && t.tl.despot;
    var R = t.rival;
    var you = t.blocLabel || "You";
    var yc = t.blocColour || (G.UI.ticketColour ? G.UI.ticketColour(G.state) : "#2f5d3a");
    var rc = R ? R.colour : "#888";
    var W = 300, H = 110, pad = 6, n = Math.max(t.length || 14, t.polls.length - 1);
    var lo = 0, hi = despot ? 100 : 60;
    t.polls.forEach(function (p) { hi = Math.max(hi, p.you + 5, p.rival + 5); });
    function X(i) { return pad + i / n * (W - pad * 2); }
    function Y(v) { return H - pad - (v - lo) / (hi - lo) * (H - pad * 2); }
    function path(key) { return t.polls.map(function (p, i) { return (i ? "L" : "M") + X(i).toFixed(1) + " " + Y(p[key]).toFixed(1); }).join(" "); }
    var last = t.polls[t.polls.length - 1];
    var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" class="poll-svg" preserveAspectRatio="none">' +
      [10, 20, 30, 40, 50].filter(function (v) { return v < hi; }).map(function (v) { return '<line x1="0" x2="' + W + '" y1="' + Y(v) + '" y2="' + Y(v) + '" class="poll-grid"/>'; }).join("") +
      (R && !despot ? '<path d="' + path("rival") + '" fill="none" stroke="' + rc + '" stroke-width="2.2"/>' : '') +
      '<path d="' + path("you") + '" fill="none" stroke="' + yc + '" stroke-width="2.6"/>' +
      '</svg>';
    var lead = last.you - last.rival;
    var proj = last.proj != null ? last.proj : t.seats;
    var maj = t.majority || (G.CONFIG && G.CONFIG.majority) || 326;
    var head = t.press && t.press.length ? t.press[t.press.length - 1] : null;
    $("pollChart").innerHTML = svg;
    $("pollRead").innerHTML = despot
      ? '<b>' + last.you + '%</b> reported support for ' + esc(you) + '.'
      : '<span class="poll-k"><i style="background:' + yc + '"></i>' + esc(you) + ' <b>' + last.you + '%</b></span>' +
        (R ? '<span class="poll-k"><i style="background:' + rc + '"></i>' + esc(R.party) + ' <b>' + last.rival + '%</b></span>' : '') +
        '<span class="poll-lead ' + (lead >= 0 ? 'up' : 'down') + '">' + (lead >= 0 ? 'Lead ' : 'Trail ') + Math.abs(Math.round(lead * 10) / 10) + '</span>' +
        '<span class="poll-proj">Seat projection: <b>' + proj + '</b> ' + (t.kind === "govt" ? (proj >= maj ? '(majority ' + (proj - maj) + ')' : '(short by ' + (maj - proj) + ')') : '') + '</span>';
    $("pollPress").innerHTML = head ? '<i>' + esc(head.paper) + ':</i> “' + esc(head.text) + '”' : '';
  };

  UI.renderRival = function () {
    var panel = $("rivalPanel"), t = G.term;
    if (!panel) return;
    var R = t && t.rival;
    if (!R || (t.tl && t.tl.despot)) { panel.style.display = "none"; return; }
    panel.style.display = "";
    $("rivalHead").innerHTML = (t.kind === "opp" ? "The " + esc(R.party) + " government" : "The Opposition · " + esc(R.party));
    var L = R.leader;
    var bench = R.bench.filter(function (b) { return b.name !== L.name; }).slice(0, 4);
    $("rivalBody").innerHTML =
      '<div class="rival-lead"><span class="cab-face" data-pol="' + esc(L.name) + '" style="--ring:' + R.colour + '">' + (UI._initials ? UI._initials(L.name) : "") + '</span>' +
        '<div><div class="rival-name">' + esc(L.name) + (R.interim ? ' <span class="board-note">interim</span>' : '') + '</div>' +
        '<div class="rival-role">' + (t.kind === "opp" ? "Head of government" : "Leader of the Opposition") + ' · ' + R.seats + ' seats</div>' +
        (R.lastMove ? '<div class="rival-move">Last move: ' + esc(R.lastMove) + '</div>' : '') + '</div></div>' +
      '<div class="rival-bench">' + bench.map(function (b) { return '<span class="rival-b">' + esc(b.name) + '</span>'; }).join("") + '</div>' +
      (R.leaders.length > 1 ? '<div class="rival-hist">Leaders this term: ' + R.leaders.map(esc).join(" → ") + '</div>' : '');
    if (UI._hydratePortraits) UI._hydratePortraits(panel);
  };
})();

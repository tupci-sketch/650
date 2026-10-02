/* =============================================================================
   650 — PROFILES, BADGES & THE HALL OF FAME
   -----------------------------------------------------------------------------
   • Badges   — earned from your achievements, daily streaks, head-to-head
                wins, beating history and long careers; synced to your public
                profile (and shown there).
   • Profiles — a public page for every player (tap any name on a board):
                bio, colour, badges, per-nation bests, daily record, H2H.
                Your own profile gains an editor (bio + colour).
   • The Hall of Fame — the game's records: biggest landslide per nation,
                highest legacy, longest careers, the most-elected PMs, daily
                streaks and wins, head-to-head champions, the ranked leader.
   ============================================================================= */
window.G = window.G || {};
(function () {
  var G = window.G;
  var P = G.Profiles = {};
  function $(id) { return document.getElementById(id); }
  function esc(s) { return G.UI._esc(s == null ? "" : s); }

  /* ---- badges ------------------------------------------------------------ */
  P.EXTRA = {
    daily_first: { icon: "📅", label: "Daily debut" }, daily_streak3: { icon: "🔥", label: "Three-day streak" },
    daily_streak7: { icon: "🔥", label: "Week-long streak" }, daily_streak30: { icon: "🏅", label: "Thirty-day streak" },
    h2h_win: { icon: "⚔", label: "Head-to-head victor" }, h2h_five: { icon: "⚔", label: "Five H2H wins" },
    beat_history: { icon: "🏛", label: "Rewrote history" }, career3: { icon: "📖", label: "Three-parliament career" },
    career5: { icon: "👑", label: "Five-parliament dynasty" }
  };
  P.LOCAL = "650.badges";
  P.localBadges = function () { try { return JSON.parse(window.localStorage.getItem(P.LOCAL) || "[]"); } catch (e) { return []; } };
  P.award = function (key) {
    var b = P.localBadges(); if (b.indexOf(key) !== -1) return false;
    b.push(key); try { window.localStorage.setItem(P.LOCAL, JSON.stringify(b)); } catch (e) {}
    P.sync();
    return true;
  };
  P.allBadges = function () {
    var out = (G.getAchievements ? G.getAchievements() : []).slice();
    P.localBadges().forEach(function (k) { if (out.indexOf(k) === -1) out.push(k); });
    return out;
  };
  P.badgeInfo = function (k) {
    if (P.EXTRA[k]) return P.EXTRA[k];
    var o = (G.OBJECTIVES || []).filter(function (x) { return x.key === k; })[0];
    if (o) return { icon: "★", label: o.label };
    if (k.indexOf("scenario_") === 0) {
      var sc = (G.SCENARIOS || []).filter(function (s) { return "scenario_" + s.key === k; })[0];
      return { icon: sc && sc.whatIf ? "🏛" : "🎯", label: sc ? sc.name : k.slice(9).replace(/_/g, " ") };
    }
    return { icon: "★", label: k.replace(/_/g, " ") };
  };
  P.badgeHtml = function (keys) {
    return (keys || []).map(function (k) { var b = P.badgeInfo(k); return '<span class="pf-badge" title="' + esc(b.label) + '">' + b.icon + ' ' + esc(b.label) + '</span>'; }).join("");
  };
  /* derived badges from what's on this device */
  P.check = function () {
    if (G.Daily) {
      var st = G.Daily.streak(), best = G.Daily.best();
      if (best.played >= 1) P.award("daily_first");
      if (st >= 3) P.award("daily_streak3"); if (st >= 7) P.award("daily_streak7"); if (st >= 30) P.award("daily_streak30");
    }
    if (G.career && G.career.parliament > 3) P.award("career3");
    if (G.career && G.career.parliament > 5) P.award("career5");
    (G.getAchievements ? G.getAchievements() : []).forEach(function (k) { if (/^scenario_wi_/.test(k)) P.award("beat_history"); });
  };
  P.sync = function () {
    if (!G.NET || !G.NET.me) return;
    G.NET._auth("profile_update", { badges: P.allBadges() });
  };

  /* ---- a public profile -------------------------------------------------- */
  P.open = function (name, back) {
    if (!name) return;
    P._back = back || (document.querySelector(".screen.active") || {}).id || "screen-menu";
    var box = $("playerBody"); if (!box) return;
    box.innerHTML = '<p class="muted">Loading ' + esc(name) + '…</p>';
    G.UI.show("screen-player");
    G.NET._call("profile_public", { name: name }).then(function (d) {
      if (!d || !d.ok) { box.innerHTML = '<p class="muted">' + (d && d.error === "no such player" ? "No such player." : "Profiles are unavailable right now.") + '</p>'; return; }
      box.innerHTML = P.render(d.profile, G.NET.me && G.NET.me.name === d.profile.name);
    });
  };
  P.render = function (p, mine) {
    var col = p.colour || "#b3862f";
    function tile(v, l) { return '<div class="pf-stat"><div class="pf-stat-v">' + v + '</div><div class="pf-stat-l">' + l + '</div></div>'; }
    var role = p.level >= 9 ? "Administrator" : p.level >= 5 ? "Moderator" : "Player";
    var h = p.h2h || { w: 0, l: 0, d: 0 }, dl = p.daily || {};
    var recent = (dl.recent || []).slice().reverse();
    return '<div class="panel pp-head" style="--pcol:' + col + '">' +
        '<span class="profile-avatar pp-av" style="background:' + col + '">' + esc((p.name || "?").slice(0, 2).toUpperCase()) + '</span>' +
        '<div><div class="profile-name">' + esc(p.name) + '</div><div class="profile-rank">' + role + ' · since ' + esc(p.since) + (mine ? ' · <b>you</b>' : '') + '</div>' +
        (p.bio ? '<p class="pp-bio">' + esc(p.bio) + '</p>' : (mine ? '<p class="pp-bio muted">Add a bio from your account page.</p>' : '')) + '</div></div>' +
      '<div class="panel"><div class="profile-stats">' +
        tile(p.runs, "Games") + tile(p.govts, "Governments") + tile(p.bestLegacy >= 0 ? p.bestLegacy : "—", "Best legacy") +
        tile(p.longestCareer || "—", "Longest career") + tile(p.ranked ? p.ranked.seats : "—", "Ranked best") +
        tile(dl.played || 0, "Dailies") + tile((dl.streak || 0) + (dl.bestStreak > dl.streak ? ' <small>/ ' + dl.bestStreak + '</small>' : ''), "Daily streak") +
        tile(h.w + "–" + h.l + (h.d ? "–" + h.d : ""), "Head-to-head") +
      '</div></div>' +
      (p.badges && p.badges.length ? '<div class="panel"><p class="sub-label">Badges</p><div class="pf-badges">' + P.badgeHtml(p.badges) + '</div></div>' : '') +
      (p.nations && p.nations.length ? '<div class="panel"><p class="sub-label">By nation</p>' + p.nations.map(function (n) {
        return '<div class="pf-nat"><span>' + esc(n.nation) + ' <i class="muted">' + n.runs + ' run' + (n.runs === 1 ? '' : 's') + '</i></span><span class="pf-nat-s">' + n.best + ' / ' + n.total +
          (n.bestLegacy != null ? ' · legacy ' + n.bestLegacy : '') + '</span></div>';
      }).join("") + '</div>' : '') +
      (recent.length ? '<div class="panel"><p class="sub-label">Recent dailies</p><div class="pp-daily">' + recent.map(function (r) {
        var pct = r.total ? r.seats / r.total : 0;
        var cls = pct >= 0.5 ? "d-win" : pct >= 0.35 ? "d-mid" : "d-low";
        return '<span class="pp-day ' + cls + '" title="' + esc(r.day + ": " + r.seats + "/" + r.total) + '">' + r.seats + '</span>';
      }).join("") + '</div></div>' : '') +
      (p.recent && p.recent.length ? '<div class="panel"><p class="sub-label">Recent games</p>' + p.recent.map(function (r) {
        return '<div class="run-row"><div><span class="run-seats">' + r.seats + '</span><span class="run-meta"> / ' + r.total + ' · ' + esc(r.nation) + (r.govt ? ' · governed' : '') + (r.legacy != null ? ' · legacy ' + r.legacy : '') + '</span></div>' +
          '<div class="run-right"><span class="run-meta">' + esc(r.pm ? "PM: " + r.pm : r.mode) + '</span><span class="run-date">' + esc(r.ts) + '</span></div></div>';
      }).join("") + '</div>' : '');
  };

  /* ---- your own profile: editor ----------------------------------------- */
  P.COLOURS = ["#b3862f", "#2f8f5b", "#d4202a", "#0087dc", "#7b3fa0", "#e8a030", "#12b6cf", "#3a3a3a", "#c2185b", "#5d8a3a"];
  P.renderEditor = function () {
    var box = $("profileEdit"); if (!box || !G.NET || !G.NET.me) return;
    P.check();
    box.innerHTML = '<p class="sub-label">Your public profile</p>' +
      '<textarea id="pfBio" class="lb-input pf-bio" maxlength="280" placeholder="A line about you — your politics, your best run, your nemesis…"></textarea>' +
      '<div class="pf-cols" id="pfCols">' + P.COLOURS.map(function (c) { return '<button class="party-swatch" data-pcol="' + c + '" style="background:' + c + '" aria-label="' + c + '"></button>'; }).join("") + '</div>' +
      '<div class="btn-row"><button class="btn btn-ghost" id="pfSave">Save profile</button><button class="btn btn-ghost" id="pfView">View public profile</button></div>' +
      '<p class="acct-note" id="pfMsg"></p>' +
      '<p class="sub-label">Your badges</p><div class="pf-badges">' + (P.badgeHtml(P.allBadges()) || '<span class="muted">Play to earn badges — dailies, head-to-head, beating history…</span>') + '</div>';
    var sel = null;
    G.NET._call("profile_public", { name: G.NET.me.name }).then(function (d) {
      if (!d || !d.ok) return;
      var bio = $("pfBio"); if (bio && !bio.value) bio.value = d.profile.bio || "";
      sel = d.profile.colour || null; mark();
    });
    function mark() { var b = box.querySelectorAll("[data-pcol]"); for (var i = 0; i < b.length; i++) b[i].classList.toggle("sel", b[i].getAttribute("data-pcol") === sel); }
    $("pfCols").onclick = function (e) { var c = e.target.getAttribute && e.target.getAttribute("data-pcol"); if (c) { sel = c; mark(); } };
    $("pfSave").onclick = function () {
      $("pfMsg").textContent = "Saving…";
      G.NET._auth("profile_update", { bio: $("pfBio").value, colour: sel || "", badges: P.allBadges() }).then(function (d) {
        $("pfMsg").textContent = d && d.ok ? "Saved ✓" : (d && d.error) || "Couldn't save.";
      });
    };
    $("pfView").onclick = function () { P.open(G.NET.me.name, "screen-account"); };
    P.sync();
  };

  /* ---- the Hall of Fame -------------------------------------------------- */
  P.openHof = function () {
    var box = $("hofBody"); if (!box) return;
    G.UI.show("screen-hof");
    box.innerHTML = '<p class="muted">Loading the records…</p>';
    G.NET._call("records").then(function (d) {
      if (!d || !d.ok) { box.innerHTML = '<p class="muted">The Hall of Fame is unavailable right now.</p>'; return; }
      var r = d.records;
      function who(n) { return '<span class="dly-name" data-profile="' + esc(n) + '">' + esc(n) + '</span>'; }
      function card(title, rows, empty) {
        return '<div class="panel hof-card"><p class="sub-label">' + title + '</p>' + (rows.length ? rows.join("") : '<p class="muted">' + (empty || "No record yet — make history.") + '</p>') + '</div>';
      }
      function row(a, b) { return '<div class="hof-row"><span>' + a + '</span><b>' + b + '</b></div>'; }
      box.innerHTML =
        card("🏆 Ranked champion", r.ranked ? [row(who(r.ranked.name), r.ranked.seats + " seats" + (r.ranked.legacy != null ? " · legacy " + r.ranked.legacy : ""))] : []) +
        card("🗳 Biggest landslide, by nation", (r.landslides || []).map(function (x) { return row(esc(x.nation) + " · " + who(x.name), x.seats + " / " + x.total + " (" + Math.round(x.pct * 100) + "%)"); })) +
        card("📜 Greatest legacies", (r.legacy || []).map(function (x) { return row(who(x.name), x.legacy + "/100 · " + x.seats + " seats"); })) +
        card("📖 Longest careers", (r.careers || []).map(function (x) { return row(who(x.name), x.parl + " parliaments"); })) +
        card("🎩 The most-elected leaders", (r.pms || []).map(function (x) { return row(esc(x.pm), x.govts + " government" + (x.govts === 1 ? "" : "s") + " formed"); })) +
        card("🔥 Longest daily streaks", (r.streaks || []).filter(function (x) { return x.streak > 0; }).map(function (x) { return row(who(x.name), x.streak + " day" + (x.streak === 1 ? "" : "s")); })) +
        card("📅 Daily wins", (r.dailyWins || []).map(function (x) { return row(who(x.name), x.wins + " day" + (x.wins === 1 ? "" : "s") + " at #1"); })) +
        card("🗓 Most dailies played", (r.dailyPlayed || []).map(function (x) { return row(who(x.name), x.days + ""); })) +
        card("⚔ Head-to-head champions", (r.h2h || []).map(function (x) { return row(who(x.name), x.w + " wins from " + x.p); }));
    });
  };

  /* any [data-profile] name anywhere opens that player's profile */
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target.closest("[data-profile]") : null;
    if (!t) return;
    e.stopPropagation();
    P.open(t.getAttribute("data-profile"));
  }, true);
})();

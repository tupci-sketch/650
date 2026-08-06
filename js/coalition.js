/* =============================================================================
   650 — ACTIVE COALITIONS
   -----------------------------------------------------------------------------
   When you finish short of a majority and form a government with partners, the
   arithmetic is no longer cosmetic: each partner party CLAIMS a share of the
   cabinet, staffed by named politicians drawn from the same background-simulated
   benches the opposition drafted for the election (G.buildOppositionField).
   Those ministers really sit in your G.state.cabinet for the term, so every
   governing gamble runs on the coalition's mixed quality — a strong senior
   partner shores you up; a thin junior partner is a liability you chose.

   Distinct by electoral system: PR governments share ministries in full
   proportion; Westminster-style FPTP hands juniors a token few red boxes;
   two-round France is a wary cohabitation. Country-specific phrasing (the
   Koalitionsvertrag, the Rose Garden, cohabitation…) is attached per system.
   ============================================================================= */
window.G = window.G || {};
(function () {
  var G = window.G;

  /* how large a slice of the cabinet partners get, per system style — a
     multiplier on their strict seat-proportional share. PR = full; Westminster
     FPTP = juniors kept small; TRS = wary middle. */
  G.COALITION_SHARE = { pr: 1.0, trs: 0.8, fptp: 0.65, "default": 0.72 };

  /* per-system flavour: the negotiation's name + a line of country colour.
     deputyFirst = give the lead partner the deputy-head post (their leader as
     Deputy PM / Vice-Chancellor), the classic junior-partner prize. */
  G.COALITION_FLAVOR = {
    fptp_uk:             { title: "The Rose Garden", note: "A full coalition or a confidence-and-supply deal — either way your partner wants red boxes of their own.", deputyFirst: true },
    pr_dhondt_bundestag: { title: "Koalitionsvertrag", note: "German government is coalition government. Sign the agreement and divide the ministries in proportion.", deputyFirst: true },
    pr_dhondt_weimar:    { title: "A Coalition of the Centre", note: "Weimar cabinets are fragile marriages of many parties — hand out the ministries and hope it holds.", deputyFirst: true },
    trs_france:          { title: "Cohabitation", note: "A wary sharing of power across the aisle — the partner takes their portfolios, and their distance.", deputyFirst: true },
    fptp_canada:         { title: "A Supply-and-Confidence Accord", note: "Minority Ottawa runs on deals — give your partner a seat at the table and keep the House.", deputyFirst: false },
    fptp_india:          { title: "A Front of Allies", note: "Delhi governs through coalitions of many parties — the allies expect ministries for their support.", deputyFirst: true },
    av_australia:        { title: "The Coalition Agreement", note: "Partners share the front bench and a joint party room — their leader expects the deputy's chair.", deputyFirst: true },
    fptp_japan:          { title: "A Ruling Coalition", note: "Tokyo's governments are built from partners — hand them cabinet posts to keep the Diet.", deputyFirst: true }
  };
  G.coalitionFlavor = function (sysKey) {
    return G.COALITION_FLAVOR[sysKey] || { title: "Coalition talks", note: "Your partners expect cabinet posts in return for their votes.", deputyFirst: true };
  };

  function fitScore(pol, portKey) {
    var port = G.PORTFOLIO_BY_KEY && G.PORTFOLIO_BY_KEY[portKey];
    var w = port && port.w, s = pol && pol.stats;
    if (!w || !s) return 0;
    var t = 0; for (var k in w) if (w.hasOwnProperty(k)) t += (w[k] || 0) * (s[k] || 50);
    return t;
  }

  /* posts a junior partner may hold. PM is never ceded; when the player is the
     larger party the internal management posts (Leader of the House, Chief Whip)
     also stay in-house. Everything else is fair game, best-fit first. */
  function claimablePosts(cabinet, playerLarger) {
    var block = { pm: 1 };
    if (playerLarger) { block.leader = 1; block.whip = 1; }
    return Object.keys(cabinet).filter(function (k) { return cabinet[k] && !block[k]; });
  }

  /* Build the coalition cabinet. Returns a NEW cabinet plus the handover list;
     never mutates the input cabinet.
       deal       : { parties:[{party,seats,colour}], combined, tag }
       opposition : the field from buildOppositionField (party -> { bench:[pol] })
       cabinet    : the player's own G.state.cabinet
       opts       : { sysKey, playerSeats }                                     */
  G.buildCoalitionCabinet = function (deal, opposition, cabinet, opts) {
    opts = opts || {};
    var out = {}; for (var k in cabinet) if (cabinet.hasOwnProperty(k)) out[k] = cabinet[k];
    if (!deal || !deal.parties || !deal.parties.length) return { cabinet: out, handovers: [] };

    var sys = opts.sysKey && G.ELECTORAL_SYSTEMS ? G.ELECTORAL_SYSTEMS[opts.sysKey] : null;
    var style = (sys && sys.coalitionStyle) || "default";
    var mult = G.COALITION_SHARE[style] != null ? G.COALITION_SHARE[style] : G.COALITION_SHARE["default"];
    var flavor = G.coalitionFlavor(opts.sysKey);

    var N = Object.keys(cabinet).length || 12;
    var combined = deal.combined || 1;
    var playerSeats = (opts.playerSeats != null) ? opts.playerSeats
                    : combined - deal.parties.reduce(function (a, p) { return a + (p.seats || 0); }, 0);
    var playerLarger = deal.parties.every(function (p) { return playerSeats >= (p.seats || 0); });

    /* the player must keep a working grip on their own cabinet: partners never
       take more than (N-1)/2 posts between them (+ any negotiated widening), and
       the player always keeps PM. */
    var partnerCap = Math.max(1, Math.floor((N - 1) / 2) + (opts.capBonus || 0));
    partnerCap = Math.min(partnerCap, N - 3);        // never leave the player fewer than 3 posts
    var pool = claimablePosts(out, playerLarger);
    var forcePosts = (opts.forcePosts || []).filter(function (k) { return pool.indexOf(k) !== -1; });
    var taken = {}, handovers = [], givenTotal = 0;

    /* partners handled largest-first, so the senior partner gets first pick */
    var partners = deal.parties.slice().sort(function (a, b) { return (b.seats || 0) - (a.seats || 0); });
    partners.forEach(function (pp, pi) {
      var field = opposition && opposition[pp.party];
      var bench = (field && field.bench ? field.bench.slice() : []);
      if (!bench.length) return;                       // no simulated bench => can't staff
      var want = Math.round((pp.seats || 0) / combined * N * mult);
      want = Math.max(1, want);
      var budget = Math.min(partnerCap - givenTotal, bench.length, pool.length);
      if (budget <= 0) return;

      var claims = [];
      /* negotiated concessions: the lead partner takes the posts you conceded */
      if (pi === 0) forcePosts.forEach(function (k) { if (!taken[k] && claims.indexOf(k) === -1 && claims.length < budget) claims.push(k); });
      /* the lead partner's leader takes the deputy head-of-government post */
      if (flavor.deputyFirst && pi === 0 && playerLarger && out.deputy && !taken.deputy && pool.indexOf("deputy") !== -1 && claims.indexOf("deputy") === -1 && claims.length < budget) {
        claims.push("deputy");
      }
      /* everything the concessions didn't already fix is theirs by seat share */
      want = Math.max(want, claims.length);
      want = Math.min(want, budget);
      /* fill the rest with the posts this bench is strongest at */
      var avail = pool.filter(function (k) { return !taken[k] && claims.indexOf(k) === -1; });
      avail.sort(function (a, b) {
        var ba = bestOf(bench, a), bb = bestOf(bench, b);
        return fitScore(bb.pol, b) - fitScore(ba.pol, a);
      });
      for (var qi = 0; qi < avail.length && claims.length < want; qi++) claims.push(avail[qi]);

      claims.forEach(function (portKey) {
        var pick = bestOf(bench, portKey);
        if (!pick.pol) return;
        bench.splice(pick.idx, 1);
        taken[portKey] = 1; givenTotal++;
        var minister = {
          name: pick.pol.name, party: pp.party,
          stats: pick.pol.stats, fits: pick.pol.fits, era: pick.pol.era,
          scope: pick.pol.scope, note: pick.pol.note,
          coalitionParty: pp.party, coalitionColour: pp.colour || partyColour(pp.party)
        };
        out[portKey] = minister;
        handovers.push({ key: portKey, title: portTitle(portKey), minister: minister, party: pp.party, colour: minister.coalitionColour });
      });
    });

    return { cabinet: out, handovers: handovers, flavor: flavor, playerLarger: playerLarger };
  };

  /* ======================================================================
     NEGOTIATION MINI-GAME
     Forming a coalition is no longer a given: the partner comes to the table
     with demands. Concede to raise your odds (at a price you pay in office);
     hold firm to keep your position (but risk the talks). A final roll decides
     whether the deal is struck. Lives in the governing (post-result) phase, so
     its randomness never touches the reproducible election result.
     ====================================================================== */
  var TAG_BASE = { natural: 0.86, workable: 0.70, strained: 0.52, unlikely: 0.36 };
  /* the pool of things a partner might demand; cost is paid only on success */
  var DEMAND_POOL = [
    { id: "treasury", post: "chancellor", label: "the Treasury", ask: "We want the Chancellor's red box.", gain: 0.14 },
    { id: "home",     post: "home",       label: "the Home Office", ask: "The Home Office is ours, or there is no deal.", gain: 0.12 },
    { id: "foreign",  post: "foreign",    label: "the Foreign brief", ask: "Give us the Foreign Secretary's chair.", gain: 0.11 },
    { id: "deputy",   post: "deputy",     label: "the deputy's chair", ask: "Our leader sits beside you as Deputy.", gain: 0.10 },
    { id: "seats",    cap: 1,             label: "a wider share", ask: "We want more of the cabinet than you're offering.", gain: 0.12 },
    { id: "veto",     unity: 8,           label: "a policy veto", ask: "We keep a veto over the programme.", gain: 0.13 },
    { id: "pledge",   pledge: true,       label: "a pledge dropped", ask: "One of your manifesto pledges has to go.", gain: 0.10 }
  ];

  function negotiatorSkill() {
    var cab = (G.state && G.state.cabinet) || {}, best = 55;
    Object.keys(cab).forEach(function (k) {
      var s = cab[k] && cab[k].stats; if (!s) return;
      best = Math.max(best, ((s.statecraft || 50) + (s.partyMgmt || 50) + (s.oratory || 50)) / 3);
    });
    return best;
  }

  G.Negotiation = {
    start: function (deal, res) {
      var tag = deal.tag || (deal.natural ? "natural" : "unlikely");
      var lead = deal.parties.slice().sort(function (a, b) { return (b.seats || 0) - (a.seats || 0); })[0];
      var skill = negotiatorSkill();
      var base = (TAG_BASE[tag] != null ? TAG_BASE[tag] : 0.5) + Math.max(-0.10, Math.min(0.18, (skill - 62) / 120));
      /* pick 3 distinct demands, biased by what the partner could plausibly take */
      var avail = DEMAND_POOL.filter(function (d) {
        if (d.post) return G.state && G.state.cabinet && G.state.cabinet[d.post];
        if (d.pledge) return !!(G.state && G.state.policyOn && G.state.policy);
        return true;
      });
      var demands = [];
      var a = avail.slice();
      while (a.length && demands.length < 3) demands.push(a.splice(Math.floor(Math.random() * a.length), 1)[0]);
      return {
        deal: deal, res: res, tag: tag, leadParty: lead ? lead.party : (deal.parties[0] && deal.parties[0].party),
        odds: Math.max(0.05, Math.min(0.97, base)), base: base, skill: Math.round(skill),
        demands: demands.map(function (d) { return { def: d, conceded: null }; }),
        concessions: { posts: [], capBonus: 0, unityPen: 0, pledgeDrop: false },
        done: false, success: null, walked: false
      };
    },
    choose: function (st, i, concede) {
      var d = st.demands[i]; if (!d || d.conceded != null || st.done) return st;
      d.conceded = !!concede;
      if (concede) {
        st.odds = Math.min(0.97, st.odds + d.def.gain);
        if (d.def.post) st.concessions.posts.push(d.def.post);
        if (d.def.cap) st.concessions.capBonus += d.def.cap;
        if (d.def.unity) st.concessions.unityPen += d.def.unity;
        if (d.def.pledge) st.concessions.pledgeDrop = true;
      } else {
        /* refusing costs odds — the stiffer the partner (worse chemistry), the more */
        var sting = st.tag === "unlikely" ? 0.16 : st.tag === "strained" ? 0.12 : 0.08;
        st.odds = Math.max(0.03, st.odds - sting);
      }
      return st;
    },
    answered: function (st) { return st.demands.every(function (d) { return d.conceded != null; }); },
    resolve: function (st) {
      if (st.done) return st;
      st.done = true;
      st.success = Math.random() < st.odds;
      return st;
    }
  };

  function bestOf(bench, portKey) {
    var best = null, bi = -1;
    for (var i = 0; i < bench.length; i++) {
      var sc = fitScore(bench[i], portKey);
      if (!best || sc > best._sc) { best = bench[i]; best._sc = sc; bi = i; }
    }
    return { pol: best, idx: bi };
  }
  function portTitle(k) { var p = G.PORTFOLIO_BY_KEY && G.PORTFOLIO_BY_KEY[k]; return (p && p.name) || k; }
  function partyColour(label) { var p = G.PARTIES && G.PARTIES[label]; return (p && p.colour) || "#6b6b6b"; }
})();

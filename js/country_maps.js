/* =============================================================================
   650 — COUNTRY MAPS (v2)
   -----------------------------------------------------------------------------
   Per-seat hex cartograms for every international electoral system, in the
   spirit of the UK constituency hex map. Each country is drawn as a silhouette
   of *region cells* (an ASCII mask that follows the real geography); every
   region's cells are then packed with exactly that region's seat count — one
   hex per seat, full resolution (China renders 2,980 hexes, India 543, and so
   on). The hexes are coloured by who carried each seat: the player's ticket, or
   the actual winning party from the per-seat declaration list.

   The map scales to fit its panel (a 2,980-seat chamber simply draws smaller
   hexes); the hex *count* always equals the real seat count.

   Loaded after electoral_systems.js / ui.js / election.js, before main.js.
   ============================================================================= */
window.G = window.G || {};
G.UI = G.UI || {};

/* =========================================================================
   1 · COUNTRY SHAPES
       regionKey → { mask: [rows…], legend: { char: regionId } }
       Every non-space char in the mask is a cell belonging to a region; the
       union of cells forms the country's silhouette and places each region in
       its geographic position. Cell counts roughly track seat share so density
       stays even. (The UK is omitted — it uses its real G.HEXMAP cartogram.)
   ========================================================================= */
G.COUNTRY_SHAPES = {

  /* ---- USA — House of Representatives (regional blocks) ----------------- */
  usa_house: {
    legend: { P:"US_PNW", C:"US_CA", W:"US_SW", L:"US_PL", G:"US_GL",
              N:"US_NE", A:"US_MA", V:"US_WV", T:"US_TX", E:"US_SE" },
    mask: [
      "PP     LLL  GGGG   NN",
      "PP  WW LLL  GGGG  AANN",
      "CCWWWW LL  GGG   AAAA",
      "CCWWW  LL   GG  VAAA ",
      "CC WW  TTT   EEE V   ",
      "C  WW TTTT  EEEEE    ",
      "      TTTT  EEEEEE   ",
      "       TT    EEEE    "
    ]
  },

  /* ---- USA — Electoral College (swing states + safe/lean blocks) -------- */
  usa_ec: {
    legend: { D:"EC_SAFE_DEM", d:"EC_LEAN_DEM", w:"EC_WI", m:"EC_MI", p:"EC_PA",
              v:"EC_NV", z:"EC_AZ", g:"EC_GA", c:"EC_NC", r:"EC_LEAN_REP", R:"EC_SAFE_REP" },
    mask: [
      "DD   ww mm   d DD",
      "DD   ww mm pp  DD",
      "D  d        pp dd",
      "D  vv       cc r ",
      "D zz  RR R cc gg r",
      "  zz RRRRR gg  RR ",
      "     RRR RR   RR  "
    ]
  },

  /* ---- Germany — Weimar Reichstag (Prussia dominant) -------------------- */
  germany_weimar: {
    legend: { H:"DE_HH", B:"DE_BR", P:"DE_PR", O:"DE_OT", E:"DE_HE",
              T:"DE_TH", S:"DE_SA", W:"DE_WU", A:"DE_BA", Y:"DE_BY" },
    mask: [
      "  B H P P  ",
      "  O P P P P",
      "  O O P P S",
      "  O E T S S",
      "  W A E Y Y",
      "  W A Y Y Y"
    ]
  },

  /* ---- Germany — modern Bundestag (16 Länder) --------------------------- */
  germany_modern: {
    legend: { s:"DM_SH", h:"DM_HH", b:"DM_HB", m:"DM_MV", n:"DM_NI", w:"DM_NW",
              e:"DM_HE", t:"DM_TH", x:"DM_ST", k:"DM_BB", l:"DM_BE", a:"DM_SN",
              r:"DM_RP", z:"DM_SL", q:"DM_BW", y:"DM_BY" },
    mask: [
      "   s s    ",
      "  b h m m ",
      "  n n k l m",
      "w w n k k ",
      "w w n x a ",
      "r e e t a ",
      "z r q y y ",
      "  q q y y ",
      "  q q y y "
    ]
  },

  /* ---- France — the Hexagon (Paris central-north, Outre-mer detached) --- */
  france: {
    legend: { N:"FR_NO", I:"FR_IDF", E:"FR_NE", O:"FR_OUE", C:"FR_CEN", S:"FR_SUD", M:"FR_OUT" },
    mask: [
      "  N N    ",
      " O I I E ",
      " O O C E ",
      " O C C S ",
      "   C S S ",
      "   S S S ",
      "M        "
    ]
  },

  /* ---- Australia -------------------------------------------------------- */
  australia: {
    legend: { W:"AU_WA", A:"AU_SA", Q:"AU_QLD", N:"AU_NSW", V:"AU_VIC", T:"AU_TAS", C:"AU_ACT" },
    mask: [
      "W W A A Q Q",
      "W W A A Q Q",
      "W W A N N Q",
      "    N N N C",
      "    V V V C",
      "    V V    ",
      "      T    "
    ]
  },

  /* ---- Canada ----------------------------------------------------------- */
  canada: {
    legend: { B:"CA_BC", P:"CA_PR", O:"CA_ON", Q:"CA_QC", A:"CA_ATL", N:"CA_NT" },
    mask: [
      "N N N N N    ",
      "B P P O O Q Q A",
      "B P P O O Q Q A",
      "B     O O Q   A"
    ]
  },

  /* ---- Japan — archipelago SW→NE --------------------------------------- */
  japan: {
    legend: { K:"JP_KY", G:"JP_CG", O:"JP_OS", C:"JP_CH", A:"JP_KA",
              T:"JP_TO", H:"JP_TH", D:"JP_HK", P:"JP_PR" },
    mask: [
      "          D D",
      "          D D",
      "         H H ",
      "        H A T",
      "      C C A A",
      "    O O C    ",
      "   G O P     ",
      "  K G        ",
      " K K         "
    ]
  },

  /* ---- India — northern plains down to the southern peninsula ----------- */
  india: {
    legend: { O:"IN_OTH", W:"IN_NWE", N:"IN_NOR", E:"IN_EAS", G:"IN_GUJ", M:"IN_MAH", S:"IN_SOU" },
    mask: [
      "   O     ",
      " W W N N ",
      " W W N N E E",
      " G G N M E E",
      " G M M S E ",
      "   M S S S ",
      "   S S S   ",
      "    S S    "
    ]
  },

  /* ---- North Korea ------------------------------------------------------ */
  north_korea: {
    legend: { Y:"KP_PY", N:"KP_NN", S:"KP_SN", K:"KP_KG", W:"KP_HW",
              H:"KP_HN", M:"KP_HS", R:"KP_RY", O:"KP_OT" },
    mask: [
      "   N R H ",
      "   N R H ",
      "  N S M M",
      "  S S M K",
      "  Y W O K",
      "  W W O  ",
      "   W O   "
    ]
  },

  /* ---- Soviet Union — broad east–west span ------------------------------ */
  soviet_1937: {
    legend: { B:"SU_BE", U:"SU_UK", R:"SU_RS", T:"SU_TR", K:"SU_KZ", O:"SU_OT" },
    mask: [
      "B R R R R R R R",
      "U R R R R R R O",
      "U R R R R R O O",
      "  T T K K K K  "
    ]
  },

  /* ---- Cuba — the long island, west→east -------------------------------- */
  cuba: {
    legend: { P:"CU_PNR", H:"CU_HAB", M:"CU_MAT", V:"CU_VIL", C:"CU_CAM", G:"CU_GRA", O:"CU_OR" },
    mask: [
      "PP HHH MM VVV CC GG OOO",
      " P HHH MM VVV CC GG OOO",
      "        V   C  G  O O  "
    ]
  },

  /* ---- China — broad west, populous east; OTH detached ------------------ */
  china: {
    legend: { N:"CN_NOR", B:"CN_BJ", W:"CN_NWE", C:"CN_CEN", H:"CN_HUB",
              S:"CN_SH", G:"CN_GUA", U:"CN_SOU", O:"CN_OTH" },
    mask: [
      "W W W W N N N",
      "W W W W B N N",
      "W W C C C S S",
      "W C C C H H S",
      "  C C H H U U",
      "  H H G G U U",
      "    G G G U U",
      "O O O O O O  "
    ]
  }
};

/* =========================================================================
   2 · RENDERER  —  one hex per seat, packed into geographic region cells.
       Returns { byId } (seat-id → polygon, for the live count) or false.

       opts.revealed — paint the final result immediately (result screen)
   ========================================================================= */
G.UI.buildCountryMap = function (containerId, sys, res, colour, opts) {
  opts = opts || {};
  var box = document.getElementById(containerId);
  if (!box || !sys) return false;

  var shape    = sys.regionKey && G.COUNTRY_SHAPES[sys.regionKey];
  var byRegion = (res.campaign && res.campaign.byRegion) || res.byRegion;
  if (!shape || !byRegion || !byRegion.length) return false;

  var camp       = res.campaign || res;
  var blocLabel  = camp.blocLabel || res.blocLabel;
  var blocColour = camp.blocColour || res.blocColour || colour;
  var despot     = sys.despotMode || sys.coalitionStyle === "guided";

  /* per-seat declarations (winners + won flag); synthesize if absent */
  var results = camp.results || res.results;
  if ((!results || !results.length) && G.expandSeatResults) results = G.expandSeatResults(camp, sys);
  var resByRegion = {};
  (results || []).forEach(function (r) { (resByRegion[r.region] = resByRegion[r.region] || []).push(r); });

  var reg = {};
  byRegion.forEach(function (r) { reg[r.id] = r; });

  /* gather mask cells per region (preserving row-major order) */
  var cellsByRegion = {};
  for (var row = 0; row < shape.mask.length; row++) {
    var line = shape.mask[row];
    for (var col = 0; col < line.length; col++) {
      var rid = shape.legend[line.charAt(col)];
      if (!rid) continue;
      (cellsByRegion[rid] = cellsByRegion[rid] || []).push({ row: row, col: col });
    }
  }

  var CELL = 34;                                    /* px per mask cell */
  var esc  = G.UI._esc;
  var partyColour = G.partyColour || function () { return "#7a7f88"; };

  var parts = [], byId = {}, idx = 0;
  var minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;

  Object.keys(cellsByRegion).forEach(function (rid) {
    var r = reg[rid]; if (!r) return;
    var cells = cellsByRegion[rid];
    var total = Math.max(0, r.total | 0);
    if (!total) return;

    /* distribute the region's seats across its cells (largest remainder) */
    var nCells = cells.length;
    var base = Math.floor(total / nCells), extra = total - base * nCells;
    var perCell = cells.map(function (_, i) { return base + (i < extra ? 1 : 0); });

    var rlist = resByRegion[rid] || [];
    var rp = 0;                                     /* pointer into the region's seats */
    var nm = esc(r.name || rid).replace(/"/g, "&quot;");
    var info = r.won + " / " + r.total;

    cells.forEach(function (cell, ci) {
      var k = perCell[ci]; if (!k) return;
      /* lay k hexes in a sub-grid that fills the cell */
      var subCols = Math.max(1, Math.ceil(Math.sqrt(k)));
      var subRows = Math.ceil(k / subCols);
      var s = Math.min(CELL / (subCols * Math.sqrt(3)), CELL / (subRows * 1.5)) * 0.96;
      var hw = Math.sqrt(3) * s, rowH = 1.5 * s;
      var ox = cell.col * CELL + (CELL - subCols * hw) / 2 + hw / 2;
      var oy = cell.row * CELL + (CELL - subRows * rowH) / 2 + rowH / 2;

      for (var i = 0; i < k; i++) {
        var sr = Math.floor(i / subCols), sc = i % subCols;
        var cx = ox + (sc + 0.5 * (sr & 1)) * hw, cy = oy + sr * rowH;
        var rec = rlist[rp++];
        var won = rec ? rec.won : despot;
        var winner = rec ? rec.winner : (won ? blocLabel : "Opposition");
        var fill = "rgba(220,229,240,.10)", st = "undeclared";
        if (opts.revealed) {
          if (won) { fill = colour; st = "won"; }
          else { fill = partyColour(winner, blocLabel, blocColour); st = "lost"; }
        }
        var id = rec ? rec.id : (rid + "#" + idx);
        parts.push('<polygon points="' + G.UI._hexPts(cx, cy, s) + '" fill="' + fill +
          '" data-name="' + nm + '" data-info="' + info + '" data-id="' + id + '"' +
          (st !== "undeclared" ? ' data-state="' + st + '"' : '') + '></polygon>');
        byId[id] = idx++;
        if (cx - hw < minX) minX = cx - hw; if (cx + hw > maxX) maxX = cx + hw;
        if (cy - s < minY) minY = cy - s;   if (cy + s > maxY) maxY = cy + s;
      }
    });
  });

  if (!parts.length) return false;

  var pad = 10, vbW = (maxX - minX) + pad * 2, vbH = (maxY - minY) + pad * 2;
  box.innerHTML = '<svg class="hexsvg country-hexsvg" viewBox="' + (minX - pad) + ' ' + (minY - pad) +
    ' ' + vbW + ' ' + vbH + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' +
    esc((sys.country || "") + " " + (sys.resultLabel || "results") + " map") + '">' + parts.join("") + '</svg>';

  /* resolve indices to live polygon elements for fast flipping */
  var svgEl = box.querySelector("svg");
  var polys = svgEl.querySelectorAll("polygon");
  Object.keys(byId).forEach(function (id) { byId[id] = polys[byId[id]]; });

  /* tooltip wiring (shares the global map tip element) */
  var tip = G.UI._tip();
  function showTip(t, x, y) {
    var n = t.getAttribute("data-name"), inf = t.getAttribute("data-info");
    tip.textContent = n + (inf ? " — " + inf + " seats" : "");
    tip.style.display = "block"; tip.style.left = x + "px"; tip.style.top = (y - 14) + "px";
  }
  svgEl.addEventListener("mousemove", function (e) {
    if (e.target.tagName === "polygon") showTip(e.target, e.clientX, e.clientY);
    else tip.style.display = "none";
  });
  svgEl.addEventListener("mouseleave", function () { tip.style.display = "none"; });
  svgEl.addEventListener("click", function (e) {
    if (e.target.tagName === "polygon") showTip(e.target, e.clientX, e.clientY);
  });

  return { byId: byId };
};

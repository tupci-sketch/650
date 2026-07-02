/* =============================================================================
   650 — COUNTRY MAPS (v3)
   -----------------------------------------------------------------------------
   Per-seat hex cartograms for every international electoral system, drawn as
   geographic silhouettes. Each country's mask traces the real outline with
   regions in their actual geographic positions. The renderer packs one hex per
   seat into the mask cells, so seat density varies within the map (denser in
   populous regions) mirroring real electoral cartograms.

   Loaded after electoral_systems.js / ui.js / election.js, before main.js.
   ============================================================================= */
window.G = window.G || {};
G.UI = G.UI || {};

/* =========================================================================
   1 · COUNTRY SHAPES
       regionKey → { mask: [rows…], legend: { char: regionId } }
       Each non-space char is a cell belonging to a region; the union of all
       filled cells forms the country silhouette. Regions are placed at their
       real geographic positions. (UK omitted — uses the G.HEXMAP cartogram.)
   ========================================================================= */
G.COUNTRY_SHAPES = {

  /* ---- USA — House of Representatives ----------------------------------- */
  /*  Continental US shape. Pacific coast left, Atlantic right.
      PNW=Pacific NW, CA=California, SW=Southwest, PL=Plains,
      GL=Great Lakes, NE=New England, MA=Mid-Atlantic, WV=Appalachia,
      TX=Texas, SE=Southeast.                                               */
  usa_house: {
    legend: { P:"US_PNW", C:"US_CA", W:"US_SW", L:"US_PL", G:"US_GL",
              N:"US_NE", A:"US_MA", V:"US_WV", T:"US_TX", E:"US_SE" },
    mask: [
      "  PPP   LLL   GGGGG  NNN  ",
      " PPPPWWLLL    GGGGG NAAAA ",
      " CPPWWWLLLL   GGG  AAAAAAA",
      " CCCWWWWLLL   GGG VVAAAAA ",
      " CCCWWWWLLL  EEVVVAAAAA   ",
      " CCCWWWWLLL  EEEEEVAAAA   ",
      " CCCWWWTTLL   EEEEEVAA    ",
      " CC  WTTTTLLL  EEEEEEE    ",
      "      TTTTTLL   EEEEEEE   ",
      "       TTTTLL    EEEEEEE  ",
      "        TTTLL     EEEEEEE ",
      "         TTTT     EEEEEEE ",
      "          TTT      EEEEEE ",
      "                   EEEE   "
    ]
  },

  /* ---- USA — Electoral College ----------------------------------------- */
  /*  Safe blocs on coasts, swing states in interior.
      D=Safe Dem, d=Lean Dem, w=Wisconsin, m=Michigan, p=Pennsylvania,
      v=Nevada, z=Arizona, g=Georgia, c=North Carolina,
      r=Lean Rep, R=Safe Rep.                                               */
  usa_ec: {
    legend: { D:"EC_SAFE_DEM", d:"EC_LEAN_DEM", w:"EC_WI", m:"EC_MI", p:"EC_PA",
              v:"EC_NV", z:"EC_AZ", g:"EC_GA", c:"EC_NC", r:"EC_LEAN_REP", R:"EC_SAFE_REP" },
    mask: [
      "  DDD    d    mmm   DD  ",
      " DDDD   ddd  pwwm  DDD  ",
      " DDDD   dv   pp   DDDD  ",
      " DDDD   vz    c   DDD   ",
      " DDDD   zz  rccg  RRR   ",
      "  DDD    rrRRRRRRRRRR   ",
      "   D     RRRRRRRRRRRR   ",
      "          RRRRRRRRRRR   ",
      "           RRRRRRRRRR   ",
      "            RRRRRRRR    "
    ]
  },

  /* ---- Germany — Weimar Reichstag --------------------------------------- */
  /*  Prussia (P) dominates the north and east; Bavaria (Y) in SE;
      smaller states fill the west and south.
      H=Hamburg, B=Bremen, P=Prussia, O=Other states (northwest + east),
      E=Hesse, T=Thuringia, S=Saxony, W=Württemberg, A=Baden, Y=Bavaria. */
  germany_weimar: {
    legend: { H:"DE_HH", B:"DE_BR", P:"DE_PR", O:"DE_OT", E:"DE_HE",
              T:"DE_TH", S:"DE_SA", W:"DE_WU", A:"DE_BA", Y:"DE_BY" },
    mask: [
      "OOOHBHPPPPPPPPPP   ",
      "OOOOO PPPPPPPPPPOOO",
      "OOOOO PPPPPPPPPPOO ",
      " OOEEEPPPPPPPPPOO  ",
      " OEEEEPPPPPSSPOO   ",
      " OEEEEPPTTTSSSPP   ",
      "  EEEEPTTTTSSPP    ",
      "  WEEEATTTTSSS     ",
      "  WWEAATTTTYYYY    ",
      "  WWWAATTTYYYYY    ",
      "  WWAAATYYYYYYY    ",
      "   WAAAYYYYYYY     ",
      "    AAAYYYYYY      ",
      "     AAYYYYYYY     ",
      "      AAYYYY       "
    ]
  },

  /* ---- Germany — modern Bundestag (16 Länder) -------------------------- */
  /*  N=Schleswig-Holstein, h=Hamburg, b=Bremen, m=Mecklenburg-Vorpommern,
      n=Lower Saxony, w=NRW, e=Hesse, t=Thuringia, x=Saxony-Anhalt,
      k=Brandenburg, l=Berlin, a=Saxony, r=Rhineland-Palatinate, z=Saarland,
      q=Baden-Württemberg, y=Bavaria.                                       */
  germany_modern: {
    legend: { s:"DM_SH", h:"DM_HH", b:"DM_HB", m:"DM_MV", n:"DM_NI", w:"DM_NW",
              e:"DM_HE", t:"DM_TH", x:"DM_ST", k:"DM_BB", l:"DM_BE", a:"DM_SN",
              r:"DM_RP", z:"DM_SL", q:"DM_BW", y:"DM_BY" },
    mask: [
      "   sssss hh mmmmmmm  ",
      "  bssss h  mmmmmmm   ",
      "  bnnnnn  kkkkl mmm  ",
      "  bnnnnnn kkkll aaa  ",
      "  wwnnnnn kkx  laa   ",
      "  wwwnnnn  xxt  aa   ",
      "  wwwwnnnn ettt aa   ",
      "  wwwwnnne ettt yy   ",
      "  wwwwwrne ettyyyy   ",
      "   wwwrrrn ettyyyy   ",
      "   zwwrrrn  tyyyyyy  ",
      "   zqqrrrre tyyyyyy  ",
      "    qqqqqqe yyyyyyy  ",
      "    qqqqqqq yyyyyyy  ",
      "     qqqqqq  yyyyy   ",
      "      qqqqq  yyyy    "
    ]
  },

  /* ---- France — the Hexagon -------------------------------------------- */
  /*  N=North (Nord-Picardie), I=Île-de-France, E=East (Alsace-Lorraine),
      O=West (Bretagne-Normandie), C=Centre/Aquitaine, S=South/Midi,
      M=Outre-mer (small inset top-left).                                   */
  france: {
    legend: { N:"FR_NO", I:"FR_IDF", E:"FR_NE", O:"FR_OUE", C:"FR_CEN", S:"FR_SUD", M:"FR_OUT" },
    mask: [
      "    NNNNNN NNN    ",
      "   NNNNNIII NNE   ",
      "  OONNNIII  EEEE  ",
      "  OOOONIIII EEEE  ",
      "  OOONOIIICCEEE   ",
      "  OOOOOCCCCCEE    ",
      "  OOOOOCCCCCSS    ",
      "  OOOOOCCCCSSSS   ",
      "   OOOOCCCSSSSSS  ",
      "    OOCCCCSSSSSS  ",
      "     OCCCSSSSSS   ",
      "      CCCSSSSSSS  ",
      "       CCSSSSSSS  ",
      "        CSSSSS    ",
      "M         SSSSS   "
    ]
  },

  /* ---- Australia ------------------------------------------------------- */
  /*  Continental shape: WA (huge west), ACT+NT (north/center), QLD (NE),
      NSW (east), VIC (SE corner), TAS (island below VIC), SA (center-south).
      W=WA, A=SA, Q=QLD, N=NSW, V=VIC, T=TAS, C=ACT&NT.                  */
  australia: {
    legend: { W:"AU_WA", A:"AU_SA", Q:"AU_QLD", N:"AU_NSW", V:"AU_VIC", T:"AU_TAS", C:"AU_ACT" },
    mask: [
      "WWWWWWWWWWCCCQQQQQQQQQ",
      "WWWWWWWWWWCCCQQQQQQQQQ",
      "WWWWWWWWWWCCCQQQQQQQQ ",
      "WWWWWWWWWWCCCQQQQQQQQ ",
      "WWWWWWWWWWCAAQQQQNNNN ",
      "WWWWWWWWWWCAAQNNNNNNN ",
      "WWWWWWWWWWAAAANNNNNN  ",
      "WWWWWWWWWWAAANNNNN    ",
      "WWWWWWWWWWAAANNNNN    ",
      "WWWWWWWWWWAAAANNNVVV  ",
      "        WWAAAAAVVVVVVV",
      "          AAAAVVVVVVVV",
      "           AAAVVVVVVV ",
      "            AAVVVVVVV ",
      "              AVVVVV  ",
      "               TVVVV  ",
      "               TT     "
    ]
  },

  /* ---- Canada ---------------------------------------------------------- */
  /*  Wide E-W strip; territories (N) above provinces.
      B=BC, P=Prairies (AB+SK+MB), O=Ontario, Q=Quebec, A=Atlantic, N=Territories. */
  canada: {
    legend: { B:"CA_BC", P:"CA_PR", O:"CA_ON", Q:"CA_QC", A:"CA_ATL", N:"CA_NT" },
    mask: [
      "NNNNN NNNNNN NNNN       ",
      "BBBBB PPPPPP OOOOO QQ   ",
      "BBBBB PPPPPPPOOOOOQQQAAA",
      "BBBBB PPPPPPPOOOOOQQAAAA",
      " BBBB PPPPPPPOOOOOQQAAAA",
      "  BBB  PPPPPPOOOOOQQAAA ",
      "   BB  PPPPPP OOOOOO AA "
    ]
  },

  /* ---- Japan — archipelago SW to NE ------------------------------------ */
  /*  K=Kyushu, G=Chugoku+Shikoku, O=Kinki/Osaka, C=Chubu/Nagoya,
      A=Kanto (non-Tokyo), T=Tokyo, H=Tohoku, D=Hokkaido, P=Proportional. */
  japan: {
    legend: { K:"JP_KY", G:"JP_CG", O:"JP_OS", C:"JP_CH", A:"JP_KA",
              T:"JP_TO", H:"JP_TH", D:"JP_HK", P:"JP_PR" },
    mask: [
      "PPPPPP           DDD    ",
      "PPPPPP          DDDDD   ",
      "  PPP           DDDDD   ",
      "  PPP          HHDDD    ",
      "  PPP         HHHHHH    ",
      "  PPP        HHHHHA     ",
      "  PPP       THHHHAA     ",
      "  PPP       TTHAAA      ",
      "   PP      TTTAAAA      ",
      "   PP     TTCAAAA       ",
      "   PP    TCCCCAAA       ",
      "   P     CCCCOOO        ",
      "    P   GGOOOOO         ",
      "    P  GGGOOOO          ",
      "   PP KGGOOOO           ",
      "   PKKKKGOO             ",
      "   KKKKKK               "
    ]
  },

  /* ---- India — triangular subcontinent --------------------------------- */
  /*  Wide northern plains narrowing to southern peninsula.
      O=Other (NE+J&K), W=Northwest (Punjab/Raj/Delhi), N=North (UP/Bihar),
      E=East (WB/Odisha/Assam), G=Gujarat+MP, M=Maharashtra, S=South.     */
  india: {
    legend: { O:"IN_OTH", W:"IN_NWE", N:"IN_NOR", E:"IN_EAS", G:"IN_GUJ", M:"IN_MAH", S:"IN_SOU" },
    mask: [
      " OOOOWWWWWNNNNNNNEEE  ",
      "  OOOWWWWWNNNNNNNEEEE ",
      "  OWWWWWWWNNNNNNNEEEE ",
      "  WWWWWWWWNNNNNNNEEEE ",
      "  WWWWWWNNNNNNNNN EEE ",
      "  WWGGGGNNNMNNNNEEEE  ",
      "   WGGGGGNMMMMNEEEE   ",
      "   GGGGGGGMMMMSSEEE   ",
      "   GGGGGGGMMMMSSSS    ",
      "    GGGGGMMMSSSSSS    ",
      "    GGGGMMMSSSSSSS    ",
      "     GGGMMSSSSSSS     ",
      "      GGMSSSSSSSS     ",
      "       GMSSSSSSSS     ",
      "        MSSSSSSSS     ",
      "         SSSSSSSS     ",
      "          SSSSSS      ",
      "           SSSS       ",
      "            SS        "
    ]
  },

  /* ---- North Korea ----------------------------------------------------- */
  /*  Y=Pyongyang, N=North Pyongan+Chagang, S=South Pyongan+Nampho,
      K=Kangwon, W=Hwanghae, H=North Hamgyong, M=South Hamgyong,
      R=Ryanggang, O=Other.                                                 */
  north_korea: {
    legend: { Y:"KP_PY", N:"KP_NN", S:"KP_SN", K:"KP_KG", W:"KP_HW",
              H:"KP_HN", M:"KP_HS", R:"KP_RY", O:"KP_OT" },
    mask: [
      "  NNNN RRRHHHHHH  ",
      " NNNNNN RRRHHHHH  ",
      " NNNNNNN RHMMMMMM ",
      " NNOSSSSRHMMMMMM  ",
      " NOOSSSSRHMMMMM   ",
      "  OOSSSSYMMMMMM   ",
      "  OOWWWSSYMMMM    ",
      "  OOWWWWWYKKKKK   ",
      "   OWWWWWYKKKK    ",
      "   OWWWWWYKKKK    ",
      "    WWWWYYKKK     "
    ]
  },

  /* ---- Soviet Union 1937 ----------------------------------------------- */
  /*  Russia (R) dominates; other republics on western and southern margins.
      B=Byelorussia, U=Ukraine, R=Russia SFSR, T=Transcaucasus,
      K=Kazakhstan+Central Asia, O=Other (Baltic+Moldavia).                */
  soviet_1937: {
    legend: { B:"SU_BE", U:"SU_UK", R:"SU_RS", T:"SU_TR", K:"SU_KZ", O:"SU_OT" },
    mask: [
      "OOBBRRRRRRRRRRRRRRRRRRRRRRR ",
      "OOUURRRRRRRRRRRRRRRRRRRRRRR ",
      "OUUURRRRRRRRRRRRRRRRRRRRRRRR",
      " UUURRRRRRRRRRRRRRRRRRRRRRRO",
      " UURRRRRRRRRRRRRRRRRRRRRROOO",
      "  URRRKKKKKKKKKRRRRRRRRRROOO",
      "  TRRRRKKKKKKKRRRRRRROOOOOO ",
      "  TTRRKKKKKKKRRRRROOOOOOOO  ",
      "   TTKKKKKKKKKRRROOOOOOOO   ",
      "    TKKKKKKKKKKROOOOOOOO    "
    ]
  },

  /* ---- Cuba — long narrow island --------------------------------------- */
  /*  P=Pinar del Río, H=Havana, M=Matanzas, V=Villa Clara,
      C=Camagüey, G=Granma, O=Oriente.                                     */
  cuba: {
    legend: { P:"CU_PNR", H:"CU_HAB", M:"CU_MAT", V:"CU_VIL", C:"CU_CAM", G:"CU_GRA", O:"CU_OR" },
    mask: [
      "PPPHHHHHHHMMMMMMVVVVVCCCCGGGGGGOOOOOOOO",
      " PPHHHHHHHMMMMMVVVVVCCCCCGGGGGGOOOOOOOOO",
      "   HHHHHH MMMM VVVV CCCC GGGGG OOOOOO  ",
      "           MM   VV   CC   GGG    OOO    "
    ]
  },

  /* ---- China ----------------------------------------------------------- */
  /*  N=Northeast, B=Beijing+Tianjin, W=Northwest (Xinjiang+Tibet+Qinghai),
      C=Central provinces, H=Hubei+Hunan+Jiangxi, S=Shanghai,
      G=Guangdong+Guangxi, U=Southern coastal, O=Other (military+HK/MC). */
  china: {
    legend: { N:"CN_NOR", B:"CN_BJ", W:"CN_NWE", C:"CN_CEN", H:"CN_HUB",
              S:"CN_SH", G:"CN_GUA", U:"CN_SOU", O:"CN_OTH" },
    mask: [
      " WWWWWWWWWWNNNNNNNNNNN   ",
      " WWWWWWWWWWBNNNNNNNNNN   ",
      " WWWWWWWWWWBNNNNNNNNSS   ",
      " WWWWWWWWWWCCCCNNNNSSOO  ",
      " WWWWWWWWWWCCCCCCCSSOOOO ",
      " WWWWWWWWWWCCCCCHHSSOOOOO",
      " WWWWWWWWWWCCCCCHHHSSOOOO",
      " WWWWWWWWCCCCCHHHHHUUUOOO",
      " WWWWWWWCCCCCHHHHUUUUUOOO",
      "  WWWWWWCCCCHHHHGUUUUUOOO",
      "  WWWWWCCCCCHHHGGUUUUUOOO",
      "  WWWWWCCCCCCHHGGGGUUUUOO",
      "   WWWWCCCCCCHGGGGGGUUUOO",
      "    WWWCCCCCCGGGGGGGUUUOO",
      "     WWCCCCCCGGGGGGGUUOOO",
      "      WCCCCCGGGGGGGGUUOOO",
      "       CCCCCCGGGGGGUUOOOO"
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

  /* Prefer a real external hex cartogram (US / Canada) when one exists for this
     system — renders the true country silhouette, coloured by game-region result. */
  var hexLayout = sys.regionKey && G.COUNTRY_HEXLAYOUTS && G.COUNTRY_HEXLAYOUTS[sys.regionKey];
  if (hexLayout && G.UI.buildCountryMapHex) {
    var hx = G.UI.buildCountryMapHex(containerId, sys, res, colour, opts, hexLayout);
    if (hx) return hx;
  }

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

/* =========================================================================
   2b · REAL HEX-CARTOGRAM RENDERER
        Draws a genuine external hex cartogram (see country_hexmaps.js). Each
        hex carries a game-region tag ("gr"); a region's win/loss proportion is
        painted deterministically across its hexes, so the map matches the
        seeded result without any engine change. Same {byId} contract as the
        mask renderer, so the live count and result screen both work.
   ========================================================================= */
G.UI.buildCountryMapHex = function (containerId, sys, res, colour, opts, layout) {
  opts = opts || {};
  var box = document.getElementById(containerId);
  if (!box || !layout || !layout.hexes) return false;

  var byRegion = (res.campaign && res.campaign.byRegion) || res.byRegion;
  if (!byRegion || !byRegion.length) return false;

  var camp       = res.campaign || res;
  var blocLabel  = camp.blocLabel || res.blocLabel;
  var blocColour = camp.blocColour || res.blocColour || colour;
  var despot     = sys.despotMode || sys.coalitionStyle === "guided";

  var results = camp.results || res.results;
  if ((!results || !results.length) && G.expandSeatResults) results = G.expandSeatResults(camp, sys);
  var resByRegion = {};
  (results || []).forEach(function (r) { (resByRegion[r.region] = resByRegion[r.region] || []).push(r); });

  var reg = {};
  byRegion.forEach(function (r) { reg[r.id] = r; });

  /* group the layout's hexes by their game-region tag */
  var hexesByRegion = {};
  Object.keys(layout.hexes).forEach(function (k) {
    var h = layout.hexes[k];
    (hexesByRegion[h.gr] = hexesByRegion[h.gr] || []).push({ key: k, q: h.q, r: h.r, n: h.n });
  });

  var esc         = G.UI._esc;
  var partyColour = G.partyColour || function () { return "#7a7f88"; };
  var S = 12, pitchX = Math.sqrt(3) * S, pitchY = 1.5 * S;

  var parts = [], byId = {}, idx = 0;
  var minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;

  Object.keys(hexesByRegion).forEach(function (gr) {
    var r = reg[gr];
    var hexes = hexesByRegion[gr];
    hexes.sort(function (a, b) { return (a.r - b.r) || (a.q - b.q); });
    var M = hexes.length;
    var rlist = resByRegion[gr] || [];
    var total = r ? Math.max(0, r.total | 0) : 0;
    var won   = r ? Math.max(0, r.won | 0)   : 0;
    /* how many of this region's hexes to paint as player wins (proportional) */
    var wonHexes = total > 0 ? Math.round(won / total * M) : (despot ? M : 0);
    /* opposition winners actually seen in this region, for realistic loss colours */
    var oppWinners = rlist.filter(function (x) { return !x.won; }).map(function (x) { return x.winner; });

    var nm   = esc((r && r.name) || gr).replace(/"/g, "&quot;");
    var info = r ? (r.won + " / " + r.total) : "";
    var oppI = 0;

    hexes.forEach(function (hx, hi) {
      var isWon = hi < wonHexes;
      /* keep the live-count contract: tie this hex to a real seat id when we can */
      var rec = rlist.length ? rlist[Math.min(rlist.length - 1, Math.floor(hi * rlist.length / M))] : null;
      var winner = isWon ? blocLabel
                 : (oppWinners.length ? oppWinners[oppI++ % oppWinners.length]
                    : (rec && rec.winner) || "Opposition");
      var fill = "rgba(220,229,240,.10)", st = "undeclared";
      if (opts.revealed) {
        if (isWon) { fill = colour; st = "won"; }
        else       { fill = partyColour(winner, blocLabel, blocColour); st = "lost"; }
      }
      var cx = (hx.q + 0.5 * (hx.r & 1)) * pitchX;
      var cy = hx.r * pitchY;
      var id = rec ? rec.id : (gr + "#" + idx);
      parts.push('<polygon points="' + G.UI._hexPts(cx, cy, S) + '" fill="' + fill +
        '" data-name="' + nm + '" data-info="' + info + '" data-id="' + id + '"' +
        (st !== "undeclared" ? ' data-state="' + st + '"' : '') + '></polygon>');
      byId[id] = idx++;
      if (cx - pitchX < minX) minX = cx - pitchX; if (cx + pitchX > maxX) maxX = cx + pitchX;
      if (cy - S < minY) minY = cy - S;           if (cy + S > maxY) maxY = cy + S;
    });
  });

  if (!parts.length) return false;

  var pad = 10, vbW = (maxX - minX) + pad * 2, vbH = (maxY - minY) + pad * 2;
  box.innerHTML = '<svg class="hexsvg country-hexsvg" viewBox="' + (minX - pad) + ' ' + (minY - pad) +
    ' ' + vbW + ' ' + vbH + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' +
    esc((sys.country || "") + " " + (sys.resultLabel || "results") + " map") + '">' + parts.join("") + '</svg>';

  var svgEl = box.querySelector("svg");
  var polys = svgEl.querySelectorAll("polygon");
  Object.keys(byId).forEach(function (id) { byId[id] = polys[byId[id]]; });

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

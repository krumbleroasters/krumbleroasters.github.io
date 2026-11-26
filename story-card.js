/* story-card.js — 내 커피 기록 9:16 스토리 카드 (1080×1920 PNG)
 *
 * 인스타그램 스토리에 올리는 세로 카드를 브라우저 안에서만 그립니다.
 *  - 지도는 story-map-land.js의 육지 윤곽 좌표로 직접 path를 그립니다(타일·외부 이미지 없음).
 *  - 사진은 이 기기 IndexedDB(data URL)에서 읽으므로 캔버스가 오염(CORS taint)되지 않습니다.
 *  - QR은 qrcode-generator(로컬 qrcode.min.js)로 만들어 캔버스에 직접 그립니다.
 *  - 글자는 화면 언어(KO/EN/JA)를 따라갑니다.
 */
(function () {
  "use strict";
  if (window.CIStory) return;

  var W = 1080;
  var H = 1920;
  var PAD = 84;               // 좌우 여백
  var FRAME = 36;             // 바깥 테두리
  var LAT_TOP = 84;           // 지도에 담는 위도 범위
  var LAT_BOT = -58;
  var SITE = "oncoffeelog.com";

  var COL = {
    cream: "#F7F3EC",
    paper: "#FFFDF8",
    ink: "#2C3A2B",
    inkMid: "#454632",
    brown: "#6B4423",
    terra: "#C2603C",
    sand: "#8A8074",
    line: "#E1D5C1",
    water: "#EFE6D5",
    land: "#DCD9C0",
    landEdge: "#C6C2A6",
    grid: "rgba(107,68,35,.09)",
    star: "#C4813C",
    starOff: "#DFD3BE"
  };
  var FAM = "'Pretendard Variable',Pretendard,'Noto Sans KR','Apple SD Gothic Neo','Malgun Gothic',sans-serif";

  var S = {
    ko: {
      brand: "MY COFFEE LOG",
      title: "나의 커피 기록",
      cupU: "잔", countryU: "개국", placeU: "곳",
      statCup: "마신 커피", statCountry: "나라", statPlace: "산지·농장", statStar: "평균 별점",
      recent: "최근 마신 커피",
      more: "외 {n}잔 더",
      tagline: "Where your cup began",
      scan: "스캔하면 내 커피 지도가 열립니다",
      cardTitle: "스토리 카드",
      cardDesc: "내 기록을 9:16 이미지로 저장해 인스타그램 스토리에 올려 보세요.",
      btn: "스토리 이미지 저장",
      note0: "기록을 1개 이상 추가하면 스토리 카드를 만들 수 있어요",
      modalSub: "인스타그램 스토리에 올리는 9:16 이미지예요.",
      save: "이미지 저장",
      share: "공유하기",
      close: "닫기",
      long: "휴대폰에서는 이 사진을 길게 눌러 저장할 수도 있어요.",
      hint: "1080×1920 PNG · 사진과 기록은 이 브라우저 안에서만 그려집니다.",
      saved: "스토리 카드를 저장했어요",
      savedBtn: "저장했어요",
      fail: "저장하지 못했어요 · 다시 눌러 주세요",
      empty: "기록이 아직 없어요"
    },
    en: {
      brand: "MY COFFEE LOG",
      title: "My coffee log",
      cupU: "cups", countryU: "countries", placeU: "origins",
      statCup: "Cups drunk", statCountry: "Countries", statPlace: "Origins", statStar: "Avg. rating",
      recent: "Recently drunk",
      more: "+{n} more",
      tagline: "Where your cup began",
      scan: "Scan to open my coffee map",
      cardTitle: "Story card",
      cardDesc: "Save your log as a 9:16 image for your Instagram story.",
      btn: "Save story card",
      note0: "Add at least one cup to make a story card.",
      modalSub: "A 9:16 image for your Instagram story.",
      save: "Save image",
      share: "Share",
      close: "Close",
      long: "On a phone, you can also long-press the image to save it.",
      hint: "1080×1920 PNG · Photos and logs are drawn only inside this browser.",
      saved: "Story card saved",
      savedBtn: "Saved",
      fail: "Could not save · please try again",
      empty: "No cups logged yet"
    },
    ja: {
      brand: "MY COFFEE LOG",
      title: "わたしのコーヒー記録",
      cupU: "杯", countryU: "か国", placeU: "か所",
      statCup: "飲んだコーヒー", statCountry: "国", statPlace: "産地・農園", statStar: "平均評価",
      recent: "最近飲んだコーヒー",
      more: "ほか{n}杯",
      tagline: "Where your cup began",
      scan: "スキャンでコーヒーマップが開きます",
      cardTitle: "ストーリーカード",
      cardDesc: "記録を9:16の画像で保存してインスタのストーリーにどうぞ。",
      btn: "ストーリー画像保存",
      note0: "記録を1件以上追加するとストーリーカードを作れます。",
      modalSub: "インスタのストーリー用の9:16画像です。",
      save: "画像を保存",
      share: "共有する",
      close: "閉じる",
      long: "スマホではこの画像を長押しして保存することもできます。",
      hint: "1080×1920 PNG · 写真と記録はこのブラウザ内だけで描画されます。",
      saved: "ストーリーカードを保存しました",
      savedBtn: "保存しました",
      fail: "保存できませんでした · もう一度お試しください",
      empty: "まだ記録がありません"
    }
  };

  function uiLang() {
    try {
      var l = window.CI && window.CI.i18n && window.CI.i18n.lang;
      return l === "en" || l === "ja" ? l : "ko";
    } catch (e) { return "ko"; }
  }
  function T() { return S[uiLang()] || S.ko; }
  function fmt(s, n) { return String(s).replace("{n}", n); }
  /* 카탈로그 이름·국가명은 i18n 낱말 사전이 있으면 함께 옮깁니다 */
  function tr(s) {
    var t = String(s == null ? "" : s);
    if (!t || uiLang() === "ko") return t;
    try {
      var v = window.CI && window.CI.i18n && window.CI.i18n.translate(t);
      return v == null || v === "" ? t : v;
    } catch (e) { return t; }
  }

  /* ── 작은 도우미 ─────────────────────────────────────────────── */
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function todayStamp() {
    var d = new Date();
    return String(d.getFullYear()) + pad2(d.getMonth() + 1) + pad2(d.getDate());
  }
  function dotDate(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ""));
    if (!m) return "";
    return m[1] + "." + m[2] + "." + m[3];
  }
  function num(v) {
    var n = typeof v === "number" ? v : parseFloat(v);
    return isFinite(n) ? n : null;
  }
  function roundRect(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); return; }
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }
  function font(ctx, size, weight, ls) {
    ctx.font = (weight || 400) + " " + size + "px " + FAM;
    try { ctx.letterSpacing = (ls || 0) + "px"; } catch (e) {}
  }
  function ellipsis(ctx, text, maxW) {
    var t = String(text == null ? "" : text);
    if (ctx.measureText(t).width <= maxW) return t;
    while (t.length > 1 && ctx.measureText(t + "…").width > maxW) t = t.slice(0, -1);
    return t.replace(/\s+$/, "") + "…";
  }
  /* 폭에 맞게 글자 크기를 조금 줄이고, 그래도 넘치면 말줄임 */
  function drawFitted(ctx, text, x, y, maxW, size, weight, ls, minRatio) {
    var s = size;
    font(ctx, s, weight, ls);
    var floor = Math.max(12, size * (minRatio || 0.78));
    while (s > floor && ctx.measureText(String(text)).width > maxW) {
      s -= 1;
      font(ctx, s, weight, ls);
    }
    ctx.fillText(ellipsis(ctx, text, maxW), x, y);
  }

  function wrapText(ctx, text, maxW, maxLines) {
    var src = String(text == null ? "" : text).replace(/\s+/g, " ").trim();
    if (!src) return [];
    var words = /[\uac00-\ud7a3\u3040-\u30ff\u4e00-\u9fff]/.test(src) ? src.split("") : src.split(" ");
    var joiner = words.length && words[0] === " " ? "" : (src.indexOf(" ") === -1 ? "" : " ");
    var lines = [], cur = "";
    for (var i = 0; i < words.length; i++) {
      var w = words[i];
      var next = cur ? cur + (joiner || "") + w : w;
      if (ctx.measureText(next).width <= maxW || !cur) {
        cur = next;
      } else {
        lines.push(cur);
        cur = w;
        if (lines.length === maxLines) break;
      }
    }
    if (cur && lines.length < maxLines) lines.push(cur);
    if (lines.length === maxLines) {
      var rest = words.slice(lines.join("").length ? 0 : 0);
      /* 마지막 줄이 넘치면 말줄임 */
      lines[maxLines - 1] = ellipsis(ctx, lines[maxLines - 1], maxW);
    }
    return lines;
  }

  /* ── 기록 모으기 ─────────────────────────────────────────────── */
  function bridge() { return window.CIStoryBridge || {}; }

  function collect() {
    var b = bridge();
    var recs = [];
    try { recs = (b.records && b.records()) || []; } catch (e) { recs = []; }
    recs = recs.filter(function (r) { return r && r.name; });

    var countries = {}, places = {}, rateSum = 0, rateN = 0;
    var pts = [], seen = {};

    recs.forEach(function (r) {
      if (r.country) countries[r.country] = 1;
      var pkey = r.placeId || [r.country || "", r.region || "", r.farm || ""].join("|");
      if (pkey.replace(/\|/g, "")) places[pkey] = 1;
      if (r.rating) { rateSum += r.rating; rateN++; }

      var lat = num(r.lat), lon = num(r.lon);
      if (lat === null || lon === null) {
        var c = b.countryPoint ? b.countryPoint(r.country) : null;
        if (c && num(c.lat) !== null && num(c.lon) !== null) { lat = num(c.lat); lon = num(c.lon); }
      }
      if (lat === null || lon === null) return;
      var k = r.placeId || (lat.toFixed(2) + "," + lon.toFixed(2));
      if (seen[k]) { seen[k].n++; return; }
      var p = { lat: lat, lon: lon, n: 1 };
      seen[k] = p;
      pts.push(p);
    });

    var dates = recs.map(function (r) { return String(r.date || "").slice(0, 10); })
      .filter(function (d) { return /^\d{4}-\d{2}-\d{2}$/.test(d); }).sort();

    return {
      recs: recs,
      cups: recs.length,
      countries: Object.keys(countries).length,
      places: Object.keys(places).length,
      rating: rateN ? Math.round((rateSum / rateN) * 10) / 10 : 0,
      from: dates.length ? dates[0] : "",
      to: dates.length ? dates[dates.length - 1] : "",
      points: pts
    };
  }

  function loadThumb(id) {
    return new Promise(function (resolve) {
      var b = bridge();
      if (!id || !b.photo) return resolve(null);
      var p;
      try { p = b.photo(id); } catch (e) { return resolve(null); }
      if (!p || typeof p.then !== "function") return resolve(null);
      p.then(function (ph) {
        if (!ph || !ph.thumb) return resolve(null);
        var img = new Image();
        img.onload = function () { resolve(img); };
        img.onerror = function () { resolve(null); };
        img.src = ph.thumb;
      }).catch(function () { resolve(null); });
    });
  }

  /* ── QR (qrcode-generator, 로컬) ──────────────────────────────── */
  function qrMatrix(text) {
    try {
      if (typeof window.qrcode !== "function") return null;
      var qr = window.qrcode(0, "M");
      qr.addData(text);
      qr.make();
      return { count: qr.getModuleCount(), dark: function (r, c) { return qr.isDark(r, c); } };
    } catch (e) { return null; }
  }

  /* ── 그리기 ─────────────────────────────────────────────────── */
  function drawStars(ctx, x, y, size, rating) {
    var full = Math.round(rating || 0);
    font(ctx, size, 700, 0);
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    for (var i = 0; i < 5; i++) {
      ctx.fillStyle = i < full ? COL.star : COL.starOff;
      ctx.fillText("★", x + i * (size * 0.98), y);
    }
  }

  /* 기록 지점이 들어오도록 지도 시야를 정합니다.
     점이 적으면 그 지역으로 확대하고, 여러 대륙에 흩어져 있으면 세계지도로 보여 줍니다. */
  function mapView(points, w, h) {
    var MIN_LON = 64, MIN_LAT = 42;
    var WORLD_LAT = LAT_TOP - LAT_BOT;               // 142°
    if (!points || !points.length) {
      var gs = Math.max(w / 360, h / WORLD_LAT);
      return { cx: 0, cy: (LAT_TOP + LAT_BOT) / 2, scale: gs };
    }
    var lonMin = 180, lonMax = -180, latMin = 90, latMax = -90;
    points.forEach(function (p) {
      if (p.lon < lonMin) lonMin = p.lon;
      if (p.lon > lonMax) lonMax = p.lon;
      if (p.lat < latMin) latMin = p.lat;
      if (p.lat > latMax) latMax = p.lat;
    });
    /* 점들이 화면 가장자리에 붙지 않도록 여백을 둡니다 */
    var spanLon = Math.min(360, Math.max(lonMax - lonMin, MIN_LON) * 1.18);
    var spanLat = Math.min(WORLD_LAT, Math.max(latMax - latMin, MIN_LAT) * 1.18);
    var cx = (lonMin + lonMax) / 2;
    var cy = (latMin + latMax) / 2;

    /* 모든 점이 들어오는 배율 (가로·세로 가운데 작은 쪽) */
    var scale = Math.min(w / spanLon, h / spanLat);
    var halfLat = (h / scale) / 2;
    if (halfLat * 2 >= WORLD_LAT) {
      scale = Math.max(w / 360, h / WORLD_LAT);
      cy = (LAT_TOP + LAT_BOT) / 2;
    } else {
      cy = Math.max(LAT_BOT + halfLat, Math.min(LAT_TOP - halfLat, cy));
    }
    return { cx: cx, cy: cy, scale: scale };
  }

  function drawMap(ctx, box, points) {
    /* 물 */
    ctx.save();
    roundRect(ctx, box.x, box.y, box.w, box.h, 16);
    ctx.fillStyle = COL.water;
    ctx.fill();
    ctx.clip();

    var v = mapView(points, box.w, box.h);
    function X(lon) { return box.x + box.w / 2 + (lon - v.cx) * v.scale; }
    function Y(lat) { return box.y + box.h / 2 - (lat - v.cy) * v.scale; }

    /* 경선·위선 — 확대 정도에 따라 간격을 바꿉니다 */
    var step = v.scale * 30 < 90 ? 60 : (v.scale * 30 > 260 ? 15 : 30);
    var lonFrom = v.cx - box.w / (2 * v.scale), lonTo = v.cx + box.w / (2 * v.scale);
    var latFrom = v.cy - box.h / (2 * v.scale), latTo = v.cy + box.h / (2 * v.scale);
    ctx.strokeStyle = COL.grid;
    ctx.lineWidth = 1.3;
    for (var lon = Math.ceil(lonFrom / step) * step; lon <= lonTo; lon += step) {
      var gx = X(lon);
      ctx.beginPath(); ctx.moveTo(gx, box.y); ctx.lineTo(gx, box.y + box.h); ctx.stroke();
    }
    for (var lat = Math.ceil(latFrom / step) * step; lat <= Math.min(latTo, LAT_TOP); lat += step) {
      if (lat < LAT_BOT) continue;
      var gy = Y(lat);
      ctx.beginPath(); ctx.moveTo(box.x, gy); ctx.lineTo(box.x + box.w, gy); ctx.stroke();
    }

    /* 육지 */
    var land = window.CI_STORY_LAND;
    if (land && land.length) {
      ctx.beginPath();
      for (var i = 0; i < land.length; i++) {
        var ring = land[i];
        var rMax = -90;
        for (var q = 0; q < ring.length; q++) if (ring[q][1] > rMax) rMax = ring[q][1];
        if (rMax < -55) continue;               // 남극은 그리지 않음
        var plon = null, plat = null, prevX = 0;
        for (var j = 0; j < ring.length; j++) {
          var lo = ring[j][0], la = ring[j][1];
          var px = X(lo), py = Y(la), wrap = false;
          if (plon !== null) {
            var d = lo - plon;
            if (Math.abs(d) > 180) wrap = true;                       // 날짜변경선
            else px = prevX + (px - prevX);                            // 그대로
          }
          if (j === 0 || wrap) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          prevX = px; plon = lo; plat = la;
        }
        ctx.closePath();
      }
      ctx.fillStyle = COL.land;
      ctx.fill("nonzero");
      ctx.strokeStyle = COL.landEdge;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    /* 기록 지점 */
    points.forEach(function (p) {
      var px = X(p.lon), py = Y(p.lat);
      var r = p.n > 1 ? 13 : 10;
      ctx.beginPath();
      ctx.arc(px, py, r + 8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(194,96,60,.18)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fillStyle = COL.terra;
      ctx.fill();
      ctx.lineWidth = 3.4;
      ctx.strokeStyle = COL.paper;
      ctx.stroke();
    });
    ctx.restore();

    /* 테두리 */
    roundRect(ctx, box.x + 0.5, box.y + 0.5, box.w - 1, box.h - 1, 16);
    ctx.strokeStyle = "rgba(107,68,35,.18)";
    ctx.lineWidth = 1.6;
    ctx.stroke();
  }

  function drawQR(ctx, x, y, size) {
    var m = qrMatrix("https://" + SITE + "/");
    if (!m) return false;
    var quiet = 2;
    var n = m.count + quiet * 2;
    var cell = size / n;
    ctx.fillStyle = COL.paper;
    roundRect(ctx, x, y, size, size, 10);
    ctx.fill();
    ctx.fillStyle = COL.ink;
    for (var r = 0; r < m.count; r++) {
      for (var c = 0; c < m.count; c++) {
        if (!m.dark(r, c)) continue;
        ctx.fillRect(x + (c + quiet) * cell, y + (r + quiet) * cell, Math.ceil(cell), Math.ceil(cell));
      }
    }
    return true;
  }

  function drawCard(data, thumbs) {
    var t = T();
    var cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    var ctx = cv.getContext("2d");
    var inner = W - PAD * 2;

    /* 배경 */
    ctx.fillStyle = COL.cream;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(255,253,248,.55)";
    roundRect(ctx, FRAME, FRAME, W - FRAME * 2, H - FRAME * 2, 26);
    ctx.fill();
    roundRect(ctx, FRAME + 0.5, FRAME + 0.5, W - FRAME * 2 - 1, H - FRAME * 2 - 1, 26);
    ctx.strokeStyle = "rgba(107,68,35,.16)";
    ctx.lineWidth = 2;
    ctx.stroke();

    /* ── 상단 브랜드 ── */
    var Y = 132;
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left";
    font(ctx, 25, 800, 7);
    ctx.fillStyle = COL.terra;
    var brandW = ctx.measureText("ONCOFFEELOG").width;
    ctx.fillText("ONCOFFEELOG", PAD, Y);
    font(ctx, 25, 700, 7);
    ctx.fillStyle = COL.inkMid;
    ctx.fillText("· " + t.brand, PAD + brandW + 16, Y);

    /* 날짜 범위 */
    var range = "";
    if (data.from && data.to) {
      range = data.from === data.to ? dotDate(data.from) : dotDate(data.from) + " — " + dotDate(data.to);
    }
    font(ctx, 23, 600, 1.6);
    ctx.textAlign = "right";
    ctx.fillStyle = COL.sand;
    ctx.fillText(range, W - PAD, Y);
    ctx.textAlign = "left";

    ctx.beginPath();
    ctx.moveTo(PAD, Y + 32); ctx.lineTo(W - PAD, Y + 32);
    ctx.strokeStyle = COL.line; ctx.lineWidth = 1.6; ctx.stroke();

    /* ── 제목 ── */
    font(ctx, 74, 800, -1.6);
    ctx.fillStyle = COL.ink;
    ctx.fillText(ellipsis(ctx, t.title, inner), PAD, 262);

    /* ── 요약 배지 ── */
    var badges = [
      { n: String(data.cups), u: t.cupU, l: t.statCup },
      { n: String(data.countries), u: t.countryU, l: t.statCountry },
      { n: String(data.places), u: t.placeU, l: t.statPlace }
    ];
    if (data.rating) badges.push({ n: String(data.rating), u: "", l: t.statStar, star: true });

    var by = 306, bh = 118;
    ctx.fillStyle = "rgba(255,253,248,.9)";
    roundRect(ctx, PAD, by, inner, bh, 18);
    ctx.fill();
    ctx.strokeStyle = COL.line; ctx.lineWidth = 1.4; ctx.stroke();

    var cw = inner / badges.length;
    badges.forEach(function (b, i) {
      var cx = PAD + cw * i;
      if (i) {
        ctx.beginPath();
        ctx.moveTo(cx, by + 26); ctx.lineTo(cx, by + bh - 26);
        ctx.strokeStyle = COL.line; ctx.lineWidth = 1.2; ctx.stroke();
      }
      ctx.textAlign = "left";
      font(ctx, 20, 700, 1);
      ctx.fillStyle = COL.sand;
      var nx = cx + 26;
      if (b.star) {
        font(ctx, 21, 700, 0);
        ctx.fillStyle = COL.star;
        ctx.fillText("★", nx, by + 46);
        font(ctx, 20, 700, 1);
        ctx.fillStyle = COL.sand;
        ctx.fillText(b.l, nx + 24, by + 46);
      } else {
        ctx.fillText(b.l, nx, by + 46);
      }
      font(ctx, 44, 800, -1);
      ctx.fillStyle = COL.ink;
      var nw = ctx.measureText(b.n).width;
      ctx.fillText(b.n, cx + 26, by + 100);
      if (b.u) {
        font(ctx, 20, 700, 0);
        ctx.fillStyle = COL.brown;
        ctx.fillText(b.u, cx + 30 + nw, by + 100);
      }
    });

    /* ── 기록 목록 자리 먼저 잡고, 남는 높이를 지도에 줍니다 ── */
    var rows = data.recs.slice(0, 5);
    var footerTop = 1712;
    var ROWH = { 1: 300, 2: 258, 3: 200, 4: 172, 5: 142 };
    var rowH = ROWH[rows.length] || 142;
    var hero = rows.length <= 2;
    var k = hero ? Math.min(1.6, rowH / 160) : Math.max(1, Math.min(1.34, rowH / 118));
    var listBlock = rowH * rows.length;
    var listTop = footerTop - 26 - listBlock;
    var headY = listTop - 34;

    var mapY = 476;
    var mapH = Math.max(300, Math.min(880, headY - 96 - mapY));
    var mapBox = { x: PAD, y: mapY, w: inner, h: mapH };
    drawMap(ctx, mapBox, data.points);

    /* 지도 캡션 — 담긴 나라 이름 */
    font(ctx, 21, 700, 1.4);
    ctx.fillStyle = COL.sand;
    ctx.textAlign = "left";
    var capNames = [];
    data.recs.forEach(function (r) {
      var c = tr(r.country);
      if (c && capNames.indexOf(c) === -1) capNames.push(c);
    });
    if (capNames.length) {
      ctx.fillText(ellipsis(ctx, capNames.join("  ·  "), inner), PAD + 2, Math.min(mapBox.y + mapH + 44, headY - 26));
    }

    /* ── 기록 목록 ── */
    font(ctx, 26, 800, -.4);
    ctx.fillStyle = COL.ink;
    ctx.fillText(t.recent, PAD, headY);
    var headW = ctx.measureText(t.recent).width;
    font(ctx, 21, 700, 0);
    ctx.fillStyle = COL.terra;
    ctx.fillText(String(data.cups), PAD + headW + 13, headY);
    if (data.cups > rows.length) {
      font(ctx, 20, 600, 0);
      ctx.fillStyle = COL.sand;
      ctx.textAlign = "right";
      ctx.fillText(fmt(t.more, data.cups - rows.length), W - PAD - 2, headY);
      ctx.textAlign = "left";
    }

    var photoSide = Math.min(rowH - 22 * k, 96 * k);
    var top0 = listTop;

    rows.forEach(function (r, i) {
      var top = top0 + rowH * i;
      var base = top + (hero ? 62 * k : Math.min(rowH / 2, 62 * k) + 4);
      var tx = PAD + 2;

      if (i) {
        ctx.beginPath();
        ctx.moveTo(PAD + 2, top); ctx.lineTo(W - PAD - 2, top);
        ctx.strokeStyle = "rgba(107,68,35,.10)"; ctx.lineWidth = 1.2; ctx.stroke();
      }

      /* 사진 */
      var img = thumbs[i];
      if (img) {
        ctx.save();
        roundRect(ctx, tx, base - photoSide / 2, photoSide, photoSide, 12);
        ctx.clip();
        var sc = Math.max(photoSide / img.width, photoSide / img.height);
        var dw = img.width * sc, dh = img.height * sc;
        try {
          ctx.drawImage(img, tx + (photoSide - dw) / 2, base - photoSide / 2 + (photoSide - dh) / 2, dw, dh);
        } catch (e) {}
        ctx.restore();
        tx += photoSide + 24;
      }

      var dstr = dotDate(r.date) || "";
      ctx.textAlign = "left";

      /* 산지 · 농장 · 가공 */
      var plc = null;
      try { plc = r.placeId ? bridge().place(r.placeId) : null; } catch (e) { plc = null; }
      var proc = "";
      if (plc && plc.processes) proc = tr(String(plc.processes).split(/[·,(]/)[0].trim().split(/\s+/)[0]);
      var origin = [tr(r.country), tr(r.region), tr(r.farm), proc].filter(Boolean).join(" · ");
      var extra = "";
      if (r.note) extra = tr(r.note);
      else if (r.tags && r.tags.length) extra = r.tags.slice(0, 3).map(tr).join(" · ");

      if (hero) {
        /* 기록이 적을 때는 사진·이름을 크게, 별점은 아래 줄에 */
        var fullW = W - PAD - 2 - tx;
        ctx.fillStyle = COL.ink;
        drawFitted(ctx, tr(r.name), tx, base - 36 * k, fullW, 31 * k, 800, -0.4, 0.74);
        font(ctx, 22 * k, 600, 0);
        ctx.fillStyle = COL.brown;
        ctx.fillText(ellipsis(ctx, origin || tr(r.cafe) || "", fullW), tx, base + 8 * k);
        if (extra) {
          font(ctx, 20 * k, 500, 0);
          ctx.fillStyle = COL.sand;
          ctx.fillText(ellipsis(ctx, extra, fullW), tx, base + 44 * k);
        }
        if (r.rating) {
          var starY = base + (extra ? 82 : 52) * k;
          drawStars(ctx, tx, starY, 20 * k, r.rating);
          if (dstr) {
            font(ctx, 19 * k, 600, 0.6);
            ctx.fillStyle = COL.sand;
            ctx.fillText("· " + dstr, tx + 20 * k * 4.9 + 10, starY);
          }
        } else if (dstr) {
          font(ctx, 19 * k, 600, 0.6);
          ctx.fillStyle = COL.sand;
          ctx.fillText(dstr, tx, base + (extra ? 82 : 52) * k);
        }
      } else {
        font(ctx, 20 * k, 600, 0.6);
        var rightW = Math.max(5 * 21 * k * 0.96, ctx.measureText(dstr).width) + 16;
        var textW = W - PAD - 2 - tx - rightW;

        ctx.fillStyle = COL.ink;
        ctx.textAlign = "left";
        drawFitted(ctx, tr(r.name), tx, base - 17 * k, textW, 32 * k, 800, -0.4, 0.72);

        font(ctx, 22 * k, 600, 0);
        ctx.fillStyle = COL.brown;
        ctx.fillText(ellipsis(ctx, origin || tr(r.cafe) || "", textW), tx, base + 13 * k);

        if (extra) {
          font(ctx, 20 * k, 500, 0);
          ctx.fillStyle = COL.sand;
          ctx.fillText(ellipsis(ctx, extra, textW), tx, base + 43 * k);
        }

        var rx = W - PAD - 2;
        if (r.rating) drawStarsRight(ctx, rx, base - 14 * k, 21 * k, r.rating);
        font(ctx, 20 * k, 600, 0.6);
        ctx.textAlign = "right";
        ctx.fillStyle = COL.sand;
        ctx.fillText(dstr, rx, base + 27 * k);
        ctx.textAlign = "left";
      }
    });



    /* ── 바닥 ── */
    ctx.beginPath();
    ctx.moveTo(PAD, footerTop); ctx.lineTo(W - PAD, footerTop);
    ctx.strokeStyle = COL.line; ctx.lineWidth = 1.6; ctx.stroke();

    var qrSize = 118;
    var qrOk = drawQR(ctx, PAD, footerTop + 30, qrSize);
    var textX = qrOk ? PAD + qrSize + 26 : PAD;
    font(ctx, 34, 800, 0.4);
    ctx.fillStyle = COL.ink;
    ctx.fillText(SITE, textX, footerTop + 78);
    font(ctx, 22, 600, 0.6);
    ctx.fillStyle = COL.brown;
    ctx.fillText(t.tagline, textX, footerTop + 112);
    font(ctx, 19, 500, 0);
    ctx.fillStyle = COL.sand;
    ctx.textAlign = "left";
    ctx.fillText(ellipsis(ctx, t.scan, W - PAD - textX), textX, footerTop + 142);

    return cv;
  }

  function drawStarsRight(ctx, rightX, y, size, rating) {
    var full = Math.round(rating || 0);
    font(ctx, size, 700, 0);
    ctx.textAlign = "left";
    var step = size * 0.96;
    var startX = rightX - step * 5 + step * 0.14;
    for (var i = 0; i < 5; i++) {
      ctx.fillStyle = i < full ? COL.star : COL.starOff;
      ctx.fillText("★", startX + i * step, y);
    }
    ctx.textAlign = "left";
  }

  /* ── 준비 + 그리기 ──────────────────────────────────────────── */
  function fontsReady() {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    var sample = "나의 커피 기록 My coffee log わたしの 1080 ★";
    var jobs = [
      "800 74px 'Pretendard Variable'", "800 32px 'Pretendard Variable'",
      "700 22px 'Pretendard Variable'", "600 21px 'Pretendard Variable'"
    ];
    return Promise.all(jobs.map(function (f) {
      return document.fonts.load(f, sample).catch(function () {});
    })).catch(function () {});
  }

  function prepare() {
    var data = collect();
    var rows = data.recs.slice(0, 5);
    return Promise.all(rows.map(function (r) { return loadThumb(r.photoId); }))
      .then(function (thumbs) { return { data: data, thumbs: thumbs }; });
  }

  function render() {
    return fontsReady().then(prepare).then(function (pack) {
      return drawCard(pack.data, pack.thumbs);
    });
  }

  /* ── 미리보기 · 저장 · 공유 ─────────────────────────────────── */
  var back = null, lastCanvas = null, lastUrl = "", onResize = null;

  function close() {
    if (!back) return;
    document.removeEventListener("keydown", onKey);
    if (onResize) { window.removeEventListener("resize", onResize); onResize = null; }
    document.documentElement.classList.remove("st-lock");
    back.remove();
    back = null;
  }
  function onKey(e) { if (e.key === "Escape") close(); }

  function pngFile(canvas) {
    return new Promise(function (resolve) {
      if (!canvas.toBlob) return resolve(null);
      canvas.toBlob(function (b) { resolve(b); }, "image/png");
    });
  }

  function download(blob) {
    var u = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = u;
    a.download = "oncoffeelog-story-" + todayStamp() + ".png";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(u); a.remove(); }, 8000);
  }

  function openPreview() {
    var b = bridge();
    var count = 0;
    try { count = (b.records && b.records() || []).length; } catch (e) { count = 0; }
    if (!count) {
      if (b.toast) b.toast(T().note0);
      return;
    }
    if (back) return;
    var t = T();

    back = document.createElement("div");
    back.className = "stback";
    back.innerHTML =
      '<div class="stmodal" role="dialog" aria-modal="true" aria-label="' + escAttr(t.cardTitle) + '">' +
        '<div class="sthead">' +
          "<div><h2>" + esc(t.cardTitle) + "</h2><p>" + esc(t.modalSub) + "</p></div>" +
          '<button type="button" class="stx" data-st-close aria-label="' + escAttr(t.close) + '">✕</button>' +
        "</div>" +
        '<div class="stbody">' +
          '<div class="stprev"><img alt="' + escAttr(t.cardTitle) + '" decoding="async"></div>' +
          '<p class="stlong">' + esc(t.long) + "</p>" +
          '<div class="stbtns">' +
            '<button type="button" class="btn terra" data-st-save>' + esc(t.save) + "</button>" +
            '<button type="button" class="btn ghost" data-st-share hidden>' + esc(t.share) + "</button>" +
          "</div>" +
          '<p class="sthint">' + esc(t.hint) + "</p>" +
        "</div>" +
      "</div>";
    document.body.appendChild(back);
    document.documentElement.classList.add("st-lock");
    document.addEventListener("keydown", onKey);

    var img = back.querySelector(".stprev img");
    img.alt = t.cardTitle;

    render().then(function (canvas) {
      lastCanvas = canvas;
      try { lastUrl = canvas.toDataURL("image/png"); } catch (e) { lastUrl = ""; }
      if (lastUrl && back) img.src = lastUrl;
      sizePreview();
    }).catch(function (err) {
      if (window.console) console.warn("[story]", err);
      if (b.toast) b.toast(t.fail);
      close();
    });

    function sizePreview() {
      if (!back || !img) return;
      var prev = back.querySelector(".stprev");
      var availW = prev.clientWidth || 300;
      var byH = Math.round((window.innerHeight || 720) * 0.52) * W / H;
      var cssW = Math.max(160, Math.min(320, availW, byH));
      img.style.width = Math.round(cssW) + "px";
      img.style.height = Math.round(cssW * H / W) + "px";
    }
    onResize = sizePreview;
    window.addEventListener("resize", onResize);

    back.addEventListener("click", function (e) {
      if (e.target === back || e.target.closest("[data-st-close]")) { close(); return; }
    });

    back.querySelector("[data-st-save]").addEventListener("click", function (e) {
      var btn = e.currentTarget;
      var label = btn.textContent;
      function done() {
        btn.textContent = T().savedBtn || T().saved;
        btn.classList.add("done");
        if (b.toast) b.toast(T().saved);
        setTimeout(function () { btn.textContent = label; btn.classList.remove("done"); }, 1900);
      }
      if (!lastCanvas) return;
      pngFile(lastCanvas).then(function (blob) {
        if (!blob) {
          btn.textContent = T().fail;
          setTimeout(function () { btn.textContent = label; }, 1900);
          return;
        }
        download(blob);
        done();
      });
    });

    /* 공유 시트(모바일) */
    var shareBtn = back.querySelector("[data-st-share]");
    if (navigator.canShare && window.File) {
      try {
        var probe = new File([new Blob(["x"], { type: "image/png" })], "probe.png", { type: "image/png" });
        if (navigator.canShare({ files: [probe] })) shareBtn.hidden = false;
      } catch (e) {}
      shareBtn.addEventListener("click", function () {
        if (!lastCanvas) return;
        pngFile(lastCanvas).then(function (blob) {
          if (!blob) return;
          var file = new File([blob], "oncoffeelog-story-" + todayStamp() + ".png", { type: "image/png" });
          navigator.share({ files: [file], title: T().cardTitle, text: SITE })
            .catch(function () {});
        });
      });
    }
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function escAttr(s) { return esc(s); }

  /* 버튼 상태 동기화 (기록 0건이면 비활성 + 안내) */
  function sync() {
    var card = document.getElementById("storyCard");
    var btn = document.getElementById("btnStory");
    if (!card || !btn) return;
    var n = 0;
    try { n = (bridge().records && bridge().records() || []).length; } catch (e) { n = 0; }
    card.setAttribute("data-empty", n ? "0" : "1");
    btn.disabled = !n;
    btn.setAttribute("aria-disabled", n ? "false" : "true");
    var note = document.getElementById("storyNote");
    if (note) note.hidden = n > 0;
  }

  function init() {
    var btn = document.getElementById("btnStory");
    if (btn) btn.addEventListener("click", function (e) { e.preventDefault(); openPreview(); });
    sync();
    document.addEventListener("ci:lang", function () {
      sync();
      if (back) { close(); openPreview(); }   // 언어가 바뀌면 카드도 그 언어로 다시 그립니다
    });
  }

  window.CIStory = {
    open: openPreview,
    sync: sync,
    render: render,          /* 검증용: 캔버스를 돌려줍니다 */
    collect: collect
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();

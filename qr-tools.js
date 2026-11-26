/* qr-tools.js — 산지·농장 딥링크 QR 만들기 + 인쇄용 카드 사진(PNG) 저장
 *
 * QR은 qrcode.js(qrcode-generator 1.4.4, MIT)로 브라우저 안에서만 만들고,
 * 외부 QR 생성 API(api.qrserver.com 등)나 CDN에 요청을 보내지 않습니다.
 * 인쇄용 카드는 캔버스로 그려서 PNG(1240×1640px)로 저장합니다.
 * 카드 상단은 저장하는 사람이 넣은 카페/로스터리 이름으로 바뀝니다(비우면 온커피로그 기본 카드).
 */
(function () {
  "use strict";

  var CREAM = "#FBF7F0";
  var INK = "#221E1A";
  var SOFT = "#5A5148";
  var LINE = "#E2D8C9";
  var TERRA = "#C2603C";
  var MUTE = "#9A8F80";

  var BASE_W = 1240;
  var BASE_H = 1640;
  var EXPORT_W = 1240;
  var FAM = '"Pretendard Variable", Pretendard, "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';

  var CAFE_KEY = "oncoffeelog.cafe";
  var CAFE_MAX = 40;
  /* 카페 이름을 넣었을 때 카드 상단에 들어가는 부제 (화면 언어를 따라갑니다) */
  var CAFE_SUB = {
    ko: "커피 산지 · 농장 안내",
    en: "Coffee origins · Farm guide",
    ja: "コーヒー産地 · 農園ガイド"
  };

  /* ── 언어 ─────────────────────────────────────────────────────── */
  function uiLang() {
    try {
      var l = window.CI && window.CI.i18n && window.CI.i18n.lang;
      return l === "en" || l === "ja" ? l : "ko";
    } catch (e) { return "ko"; }
  }

  /* 캔버스에 그리는 글자는 i18n이 바꿔 주지 못하므로 여기서 직접 옮깁니다. */
  function tr(s) {
    var t = String(s == null ? "" : s);
    if (!t || uiLang() === "ko") return t;
    try {
      var v = window.CI.i18n.translate(t);
      return v == null ? t : v;
    } catch (e) { return t; }
  }

  /* ── 카페 이름 저장 ────────────────────────────────────────────── */
  function cleanCafe(v) {
    return String(v == null ? "" : v).replace(/\s+/g, " ").trim().slice(0, CAFE_MAX);
  }

  function readCafe() {
    try { return cleanCafe(localStorage.getItem(CAFE_KEY)); }
    catch (e) { return ""; }
  }

  function writeCafe(v) {
    try {
      if (v) localStorage.setItem(CAFE_KEY, v);
      else localStorage.removeItem(CAFE_KEY);
    } catch (e) {}
  }

  /* ── 캔버스 그리기 ─────────────────────────────────────────────── */
  function setFont(ctx, weight, size) {
    ctx.font = weight + " " + size + "px " + FAM;
  }

  function fitSize(ctx, text, maxW, size, weight, minRatio) {
    var s = size;
    setFont(ctx, weight, s);
    var floor = size * (minRatio || 0.55);
    while (s > floor && ctx.measureText(text).width > maxW) {
      s -= Math.max(0.5, s * 0.035);
      setFont(ctx, weight, s);
    }
    return s;
  }

  function roundRect(ctx, x, y, w, h, r) {
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

  /* QR 모듈을 정수 픽셀로 그립니다(가로로 이어진 모듈은 한 번에). */
  function drawModules(ctx, qr, x, y, size) {
    var n = qr.getModuleCount();
    var cell = Math.floor(size / (n + 8)); // 사방 4모듈 여백
    if (cell < 1) cell = 1;
    var span = cell * (n + 8);
    var ox = Math.round(x + (size - span) / 2) + cell * 4;
    var oy = Math.round(y + (size - span) / 2) + cell * 4;
    ctx.fillStyle = INK;
    for (var r = 0; r < n; r++) {
      var c = 0;
      while (c < n) {
        if (!qr.isDark(r, c)) { c++; continue; }
        var start = c;
        while (c < n && qr.isDark(r, c)) c++;
        ctx.fillRect(ox + start * cell, oy + r * cell, (c - start) * cell, cell);
      }
    }
  }

  function drawCard(canvas, d) {
    var W = canvas.width;
    var H = canvas.height;
    var s = W / BASE_W;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = CREAM;
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = LINE;
    ctx.lineWidth = Math.max(1, 3 * s);
    roundRect(ctx, 44 * s, 44 * s, W - 88 * s, H - 88 * s, 30 * s);
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";

    var cafe = cleanCafe(d.cafe);
    if (cafe) {
      /* 카페·로스터리 이름 — 길면 글자를 줄여 한 줄에 다 담고,
         한글에는 자간을 넣지 않습니다(받침이 붙어 보이지 않도록). */
      var latin = !/[\uac00-\ud7a3\u3131-\u318e]/.test(cafe);
      try { ctx.letterSpacing = latin ? (5 * s) + "px" : "0px"; } catch (e) {}
      ctx.fillStyle = INK;
      var cs = fitSize(ctx, cafe, W - 168 * s, 78 * s, 800, 0.4);
      setFont(ctx, 800, cs);
      ctx.fillText(cafe, W / 2, 190 * s);
      try { ctx.letterSpacing = "0px"; } catch (e) {}

      ctx.fillStyle = MUTE;
      var csub = CAFE_SUB[uiLang()] || CAFE_SUB.ko;
      var csubSize = fitSize(ctx, csub, W - 240 * s, 26 * s, 600, 0.8);
      setFont(ctx, 600, csubSize);
      ctx.fillText(csub, W / 2, 238 * s);
    } else {
      try { ctx.letterSpacing = (12 * s) + "px"; } catch (e) {}
      ctx.fillStyle = INK;
      setFont(ctx, 800, 56 * s);
      ctx.fillText("ONCOFFEELOG", W / 2, 186 * s);
      try { ctx.letterSpacing = "0px"; } catch (e) {}

      ctx.fillStyle = MUTE;
      setFont(ctx, 600, 24 * s);
      ctx.fillText("온커피로그 · 커피 산지 지도", W / 2, 232 * s);
    }

    /* QR 판 — 순백 바탕으로 대비를 확실히 */
    var qrBox = 800 * s;
    var qx = (W - qrBox) / 2;
    var qy = 306 * s;
    ctx.fillStyle = "#FFFFFF";
    roundRect(ctx, qx - 16 * s, qy - 16 * s, qrBox + 32 * s, qrBox + 32 * s, 26 * s);
    ctx.fill();
    ctx.strokeStyle = LINE;
    ctx.lineWidth = Math.max(1, 1.5 * s);
    roundRect(ctx, qx - 16 * s, qy - 16 * s, qrBox + 32 * s, qrBox + 32 * s, 26 * s);
    ctx.stroke();
    drawModules(ctx, d.qr, qx, qy, qrBox);

    /* 구분선 */
    ctx.strokeStyle = LINE;
    ctx.lineWidth = Math.max(1, 2 * s);
    ctx.beginPath();
    ctx.moveTo(W / 2 - 70 * s, 1186 * s);
    ctx.lineTo(W / 2 + 70 * s, 1186 * s);
    ctx.stroke();

    /* 산지·농장 이름 */
    var name = String(d.title || "");
    ctx.fillStyle = INK;
    var ns = fitSize(ctx, name, W - 200 * s, 62 * s, 800, 0.6);
    setFont(ctx, 800, ns);
    ctx.fillText(name, W / 2, 1272 * s);

    if (d.sub) {
      var sub = String(d.sub);
      ctx.fillStyle = SOFT;
      var ss = fitSize(ctx, sub, W - 240 * s, 31 * s, 500, 0.7);
      setFont(ctx, 500, ss);
      ctx.fillText(sub, W / 2, 1328 * s);
    }

    try { ctx.letterSpacing = (2 * s) + "px"; } catch (e) {}
    ctx.fillStyle = TERRA;
    setFont(ctx, 800, 34 * s);
    ctx.fillText("oncoffeelog.com", W / 2, 1444 * s);
    try { ctx.letterSpacing = "0px"; } catch (e) {}

    ctx.fillStyle = MUTE;
    setFont(ctx, 500, 23 * s);
    ctx.fillText(d.hint || "스캔하면 이 산지의 페이지가 열립니다", W / 2, 1496 * s);
  }

  function renderExport(d) {
    var c = document.createElement("canvas");
    c.width = EXPORT_W;
    c.height = Math.round(EXPORT_W * BASE_H / BASE_W);
    drawCard(c, d);
    return c;
  }

  /* ── 유틸 ─────────────────────────────────────────────────────── */
  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function fileSafe(v) {
    var t = String(v == null ? "" : v)
      .replace(/[\\/:*?"<>|#%&{}$!'@+`=~^]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/ /g, "-")
      .slice(0, 48);
    return t || "oncoffeelog";
  }

  /* 저장 파일 이름: 카페 이름이 있으면 {카페}-qr-{산지}.png */
  function exportName(card, name) {
    var cafe = cleanCafe(card.cafe);
    return (cafe ? fileSafe(cafe) + "-qr-" : "oncoffeelog-qr-") + fileSafe(name) + ".png";
  }

  function makeQR(text) {
    if (typeof qrcode !== "function") throw new Error("QR 라이브러리를 불러오지 못했습니다.");
    var qr = qrcode(0, "M");
    qr.addData(text);
    qr.make();
    return qr;
  }

  /* ── 모달 ─────────────────────────────────────────────────────── */
  var back = null;
  var langHandler = null;

  function close() {
    if (!back) return;
    back.remove();
    back = null;
    document.documentElement.classList.remove("qr-lock");
    document.removeEventListener("keydown", onKey);
    if (langHandler) { document.removeEventListener("ci:lang", langHandler); langHandler = null; }
  }

  function onKey(e) {
    if (e.key === "Escape") close();
  }

  function open(o) {
    var url = String((o && o.url) || "");
    if (!/^https?:\/\//i.test(url)) return;
    var title = tr(String(o.title || ""));
    var sub = tr(String(o.sub || ""));
    var hint = tr(String(o.hint || "스캔하면 이 산지의 페이지가 열립니다"));
    var name = String(o.name || o.title || "");

    var qr;
    try {
      qr = makeQR(url);
    } catch (e) {
      if (window.console) console.error("[QR]", e);
      window.alert("QR을 만들지 못했습니다. 아래 주소를 복사해 쓰실 수 있습니다.\n" + url);
      return;
    }

    /* GA4 커스텀 이벤트 — QR이 실제로 만들어졌을 때만 보냅니다. gtag가 없어도 오류가 나지 않게 가드를 둡니다. */
    try {
      if (typeof window.gtag === "function") window.gtag("event", "qr_generate", { qr_page: "bean_card" });
    } catch (e) {}

    close();

    var card = { qr: qr, title: title, sub: sub, hint: hint, name: name, cafe: readCafe() };

    back = document.createElement("div");
    back.className = "qrback";
    back.innerHTML =
      '<div class="qrmodal" role="dialog" aria-modal="true" aria-label="QR 만들기">' +
        '<div class="qrhead">' +
          "<div><h2>QR 만들기</h2><p>" + esc(title) + "</p></div>" +
          '<button type="button" class="qrx" data-qr-close aria-label="닫기">✕</button>' +
        "</div>" +
        '<div class="qrbody">' +
          '<label class="qrfield">' +
            '<span class="qrfield-k">카페 / 로스터리 이름 (선택)</span>' +
            '<input class="qrfield-in" type="text" maxlength="' + CAFE_MAX + '" autocomplete="off" ' +
              'spellcheck="false" enterkeyhint="done" placeholder="비우면 온커피로그 · 예: 크럼블로스터스">' +
          "</label>" +
          '<div class="qrprev"><img alt="QR 카드 미리보기" decoding="async"></div>' +
          '<p class="qrlong">휴대폰에서는 이 사진을 길게 눌러 저장할 수도 있어요.</p>' +
          '<p class="qrurl"><code>' + esc(url) + "</code></p>" +
          '<div class="qrbtns">' +
            '<button type="button" class="qrbtn-save" data-qr-save>사진으로 저장</button>' +
            '<button type="button" class="qrbtn-copy" data-qr-copy>링크 복사</button>' +
            '<button type="button" class="qrbtn-close" data-qr-close>닫기</button>' +
          "</div>" +
          '<p class="qrhint">봉투·메뉴판·테이블 텐트에 붙이는 인쇄용 카드(PNG 1,240×1,640px)입니다. QR은 이 브라우저에서 바로 만들어지고 외부로 전송되지 않습니다.</p>' +
        "</div>" +
      "</div>";

    document.body.appendChild(back);
    document.documentElement.classList.add("qr-lock");
    document.addEventListener("keydown", onKey);

    var prev = back.querySelector(".qrprev");
    var img = back.querySelector(".qrprev img");
    var input = back.querySelector(".qrfield-in");
    var saveBtn = back.querySelector("[data-qr-save]");
    if (input) input.value = card.cafe;

    /* 미리보기: 저장할 이미지와 같은 고해상도 PNG를 <img>로 보여 줍니다.
       (휴대폰에서 이미지를 길게 눌러 사진첩에 저장할 수 있도록) */
    var paintTimer = 0;
    function paintPreview() {
      paintTimer = 0;
      if (!back || !img) return;
      var avail = prev.clientWidth || 320;
      /* 좁은 화면에서도 카드와 저장 버튼이 한눈에 들어오도록 높이도 한정합니다 */
      var byH = Math.round((window.innerHeight || 720) * 0.42 * BASE_W / BASE_H);
      var cssW = Math.max(180, Math.min(340, avail, byH));
      var c = renderExport(card);
      var dataUrl;
      try { dataUrl = c.toDataURL("image/png"); } catch (e) { return; }
      img.style.width = cssW + "px";
      img.style.height = Math.round(cssW * BASE_H / BASE_W) + "px";
      img.src = dataUrl;
    }
    function queuePaint() {
      if (paintTimer) clearTimeout(paintTimer);
      paintTimer = setTimeout(paintPreview, 90);
    }
    paintPreview();

    /* 웹폰트가 준비되면 다시 그립니다 */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { if (back) queuePaint(); }).catch(function () {});
    }

    /* 언어를 바꾸면 카드 글자도 함께 바뀝니다 */
    var base = {
      title: String(o.title || ""),
      sub: String(o.sub || ""),
      hint: String(o.hint || "스캔하면 이 산지의 페이지가 열립니다")
    };
    langHandler = function () {
      if (!back) return;
      card.title = tr(base.title);
      card.sub = tr(base.sub);
      card.hint = tr(base.hint);
      queuePaint();
    };
    document.addEventListener("ci:lang", langHandler);

    if (input) {
      input.addEventListener("input", function () {
        var v = cleanCafe(input.value);
        card.cafe = v;
        writeCafe(v);
        queuePaint();
      });
      input.addEventListener("change", function () {
        var v = cleanCafe(input.value);
        if (input.value !== v) input.value = v;
        card.cafe = v;
        writeCafe(v);
        queuePaint();
      });
    }

    back.addEventListener("click", function (e) {
      if (e.target === back || e.target.closest("[data-qr-close]")) close();
    });

    saveBtn.addEventListener("click", function () {
      var c = renderExport(card);
      var fileName = exportName(card, name);
      function done() {
        saveBtn.textContent = "저장했습니다";
        saveBtn.classList.add("done");
        setTimeout(function () {
          saveBtn.textContent = "사진으로 저장";
          saveBtn.classList.remove("done");
        }, 1800);
      }
      function fail() {
        saveBtn.textContent = "저장 실패 · 다시 눌러주세요";
        setTimeout(function () { saveBtn.textContent = "사진으로 저장"; }, 1800);
      }
      function download(blob) {
        if (!blob) { fail(); return; }
        var u = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = u;
        a.download = fileName;
        a.rel = "noopener";
        document.body.appendChild(a);
        a.click();
        setTimeout(function () { URL.revokeObjectURL(u); a.remove(); }, 5000);
        done();
      }
      if (c.toBlob) c.toBlob(download, "image/png");
      else {
        try {
          var a2 = document.createElement("a");
          a2.href = c.toDataURL("image/png");
          a2.download = fileName;
          document.body.appendChild(a2);
          a2.click();
          setTimeout(function () { a2.remove(); }, 5000);
          done();
        } catch (e) { fail(); }
      }
    });

    back.querySelector("[data-qr-copy]").addEventListener("click", function (e) {
      var b = e.currentTarget;
      var text = "복사됨";
      try {
        navigator.clipboard.writeText(url).then(function () {
          b.textContent = text;
        }).catch(function () {
          b.textContent = "복사 실패";
        });
      } catch (err) {
        b.textContent = "복사 실패";
      }
      setTimeout(function () { b.textContent = "링크 복사"; }, 1600);
    });

    /* 카페 이름을 이미 넣어 둔 사람은 바로 저장을 누를 수 있게.
       휴대폰에서 이름 칸에 자동으로 커서를 두면 키보드가 올라와 미리보기를 가리므로,
       입력 칸 자동 초점은 마우스·펜(pointer: fine) 화면에서만 합니다. */
    var focusEl = null;
    if (card.cafe) focusEl = saveBtn;
    else {
      var fine = true;
      try { fine = !window.matchMedia || window.matchMedia("(pointer: fine)").matches; } catch (e) { fine = true; }
      if (fine) focusEl = input;
    }
    if (focusEl) setTimeout(function () { try { focusEl.focus(); } catch (e) {} }, 40);
  }

  window.CIQR = { open: open, close: close };
})();

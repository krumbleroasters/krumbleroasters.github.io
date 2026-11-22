/* qr-tools.js — 산지·농장 딥링크 QR 만들기 + 인쇄용 카드 PNG 저장
 *
 * QR은 qrcode.js(qrcode-generator 1.4.4, MIT)로 브라우저 안에서만 만들고,
 * 외부 QR 생성 API(api.qrserver.com 등)나 CDN에 요청을 보내지 않습니다.
 * 인쇄용 카드는 캔버스로 그려서 PNG(1240×1640px)로 저장합니다.
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

    try { ctx.letterSpacing = (12 * s) + "px"; } catch (e) {}
    ctx.fillStyle = INK;
    setFont(ctx, 800, 56 * s);
    ctx.fillText("ONCOFFEELOG", W / 2, 186 * s);
    try { ctx.letterSpacing = "0px"; } catch (e) {}

    ctx.fillStyle = MUTE;
    setFont(ctx, 600, 24 * s);
    ctx.fillText("온커피로그 · 커피 산지 지도", W / 2, 232 * s);

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

  function makeQR(text) {
    if (typeof qrcode !== "function") throw new Error("QR 라이브러리를 불러오지 못했습니다.");
    var qr = qrcode(0, "M");
    qr.addData(text);
    qr.make();
    return qr;
  }

  /* ── 모달 ─────────────────────────────────────────────────────── */
  var back = null;

  function close() {
    if (!back) return;
    back.remove();
    back = null;
    document.documentElement.classList.remove("qr-lock");
    document.removeEventListener("keydown", onKey);
  }

  function onKey(e) {
    if (e.key === "Escape") close();
  }

  function open(o) {
    var url = String((o && o.url) || "");
    if (!/^https?:\/\//i.test(url)) return;
    var title = String(o.title || "");
    var sub = String(o.sub || "");
    var hint = String(o.hint || "스캔하면 이 산지의 페이지가 열립니다");
    var name = String(o.name || title);

    var qr;
    try {
      qr = makeQR(url);
    } catch (e) {
      if (window.console) console.error("[QR]", e);
      window.alert("QR을 만들지 못했습니다. 아래 주소를 복사해 쓰실 수 있습니다.\n" + url);
      return;
    }

    close();

    var card = { qr: qr, title: title, sub: sub, hint: hint, name: name };

    back = document.createElement("div");
    back.className = "qrback";
    back.innerHTML =
      '<div class="qrmodal" role="dialog" aria-modal="true" aria-label="QR 만들기">' +
        '<div class="qrhead">' +
          "<div><h2>QR 만들기</h2><p>" + esc(title) + "</p></div>" +
          '<button type="button" class="qrx" data-qr-close aria-label="닫기">✕</button>' +
        "</div>" +
        '<div class="qrbody">' +
          '<div class="qrprev"><canvas aria-label="QR 카드 미리보기"></canvas></div>' +
          '<p class="qrurl"><code>' + esc(url) + "</code></p>" +
          '<div class="qrbtns">' +
            '<button type="button" class="qrbtn-save" data-qr-save>PNG 이미지 저장</button>' +
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
    var cvs = back.querySelector("canvas");
    var dpr = Math.min(3, window.devicePixelRatio || 1);

    function paintPreview() {
      var avail = prev.clientWidth || 320;
      var cssW = Math.max(200, Math.min(340, avail));
      cvs.style.width = cssW + "px";
      cvs.style.height = Math.round(cssW * BASE_H / BASE_W) + "px";
      cvs.width = Math.round(cssW * dpr);
      cvs.height = Math.round(cvs.width * BASE_H / BASE_W);
      drawCard(cvs, card);
    }
    paintPreview();

    /* 웹폰트가 준비되면 다시 그립니다 */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { if (back) paintPreview(); }).catch(function () {});
    }

    back.addEventListener("click", function (e) {
      if (e.target === back || e.target.closest("[data-qr-close]")) close();
    });

    var saveBtn = back.querySelector("[data-qr-save]");
    saveBtn.addEventListener("click", function () {
      var c = renderExport(card);
      var fileName = "oncoffeelog-qr-" + fileSafe(name) + ".png";
      function done() {
        saveBtn.textContent = "저장했습니다";
        saveBtn.classList.add("done");
        setTimeout(function () {
          saveBtn.textContent = "PNG 이미지 저장";
          saveBtn.classList.remove("done");
        }, 1800);
      }
      function fail() {
        saveBtn.textContent = "저장 실패 · 다시 눌러주세요";
        setTimeout(function () { saveBtn.textContent = "PNG 이미지 저장"; }, 1800);
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

    var first = back.querySelector("[data-qr-save]");
    if (first) setTimeout(function () { try { first.focus(); } catch (e) {} }, 40);
  }

  window.CIQR = { open: open, close: close };
})();

/* site-tools.js — coffeeinsight.kr 공용 도구
 *
 * 1) 홈 화면 추가: 안드로이드 크롬은 beforeinstallprompt로 네이티브 설치 창을 띄우고,
 *    iOS Safari 등 미지원 환경은 '공유 → 홈 화면에 추가' 안내를 띄웁니다.
 * 2) 농장 추가 요청: 방문자가 농장·워싱스테이션 정보를 보내는 모달.
 *    입력 후 '요청 보내기'를 누르면 구글 폼(농장 추가 요청)으로 바로 접수됩니다.
 *    (로그인·계정 필요 없음, 개인 이메일 주소는 받지 않습니다)
 *    보내지 못하는 환경을 위해 '요청 내용 복사'와 '구글 폼에서 직접 보내기'를 함께 둡니다.
 * 3) 서비스 워커 등록(sw.js) — 홈 화면 추가 조건 충족용.
 */
(function () {
  "use strict";

  /* ── 설정 ─────────────────────────────────────────────────────────────
   * 농장 추가 요청 접수처: 구글 폼 '커피 인사이트 · 농장 추가 요청'
   * (계정: flatpeople4146@gmail.com, 편집: https://docs.google.com/forms/d/1nBJVvmkRjOiVOEYuMLp98E4pFWTUin6_nS15Sc23dB8/edit)
   * entry.* 번호는 공개 설문지 HTML의 FB_PUBLIC_LOAD_DATA_에서 확인한 실제 값입니다.
   * 질문을 고치면 이 번호도 다시 확인해야 합니다.
   */
  var FARM_FORM = {
    responseUrl: "https://docs.google.com/forms/d/e/1FAIpQLScfpXr_qoib3Ph8bu3EpC34NmSD2DRsuUU-o2nmNL9pGWtxIg/formResponse",
    viewUrl: "https://docs.google.com/forms/d/e/1FAIpQLScfpXr_qoib3Ph8bu3EpC34NmSD2DRsuUU-o2nmNL9pGWtxIg/viewform",
    entry: {
      name: "entry.1636205783",   // 농장 / 워싱스테이션 이름 (필수)
      where: "entry.119310813",   // 국가 · 세부 지역 (필수)
      detail: "entry.2044690201", // 품종·가공·고도·수상 내역 또는 참고 링크
      who: "entry.835769537"      // 요청자 이름 / 로스터리명 (선택)
    }
  };

  var INSTALL_EVENT = null;
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    INSTALL_EVENT = e;
  });
  window.addEventListener("appinstalled", function () {
    INSTALL_EVENT = null;
  });

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ── 공용 팝업 ──────────────────────────────────────────────────────── */
  var pop = null;

  function popup(title, bodyHtml) {
    closePopup();
    pop = document.createElement("div");
    pop.className = "ci-pop-back";
    pop.innerHTML =
      '<div class="ci-pop" role="dialog" aria-modal="true" aria-label="' + esc(title) + '">' +
        '<div class="ci-pop-head"><h2>' + esc(title) + "</h2>" +
          '<button type="button" class="ci-pop-x" data-ci-close aria-label="닫기">✕</button></div>' +
        '<div class="ci-pop-body">' + bodyHtml + "</div>" +
      "</div>";
    document.body.appendChild(pop);
    document.documentElement.classList.add("ci-lock");
    pop.addEventListener("click", function (e) {
      if (e.target === pop || e.target.closest("[data-ci-close]")) closePopup();
    });
    document.addEventListener("keydown", onKey);
    var first = pop.querySelector("input,textarea,button");
    if (first) setTimeout(function () { first.focus(); }, 40);
    return pop;
  }

  function closePopup() {
    if (!pop) return;
    pop.remove();
    pop = null;
    document.documentElement.classList.remove("ci-lock");
    document.removeEventListener("keydown", onKey);
  }

  function onKey(e) {
    if (e.key === "Escape") closePopup();
  }

  /* ── 홈 화면 추가 ───────────────────────────────────────────────────── */
  function isStandalone() {
    return window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
  }

  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  }

  function onInstallClick() {
    if (INSTALL_EVENT) {
      var ev = INSTALL_EVENT;
      INSTALL_EVENT = null;
      ev.prompt();
      if (ev.userChoice) ev.userChoice.catch(function () {});
      return;
    }
    if (isStandalone()) {
      popup("홈 화면 추가",
        "<p>이미 홈 화면에서 열려 있습니다. 앱처럼 바로 쓰실 수 있어요.</p>" +
        '<div class="ci-pop-foot"><button type="button" class="ci-btn primary" data-ci-close>확인</button></div>');
      return;
    }
    if (isIOS()) {
      popup("홈 화면에 추가",
        "<ol class=\"ci-steps\">" +
          "<li>Safari 하단(또는 상단)의 <b>공유</b> 버튼을 누릅니다.</li>" +
          "<li>목록에서 <b>홈 화면에 추가</b>를 선택합니다.</li>" +
          "<li>오른쪽 위 <b>추가</b>를 누르면 홈 화면에 아이콘이 생깁니다.</li>" +
        "</ol>" +
        "<p class=\"ci-note\">iOS는 브라우저가 설치 창을 직접 띄우지 않아 이 안내로 대신합니다. Safari에서 열어야 보입니다.</p>" +
        '<div class="ci-pop-foot"><button type="button" class="ci-btn primary" data-ci-close>알겠어요</button></div>');
      return;
    }
    popup("홈 화면에 추가",
      "<p>브라우저 메뉴에서 추가할 수 있습니다.</p>" +
      "<ol class=\"ci-steps\">" +
        "<li>오른쪽 위 <b>⋮</b>(또는 <b>⋯</b>) 메뉴를 엽니다.</li>" +
        "<li><b>홈 화면에 추가</b> 또는 <b>앱 설치</b>를 선택합니다.</li>" +
        "<li>이름을 확인하고 <b>추가</b>를 누릅니다.</li>" +
      "</ol>" +
      "<p class=\"ci-note\">잠시 뒤 다시 눌러 보시면 설치 창이 바로 뜰 수도 있습니다.</p>" +
      '<div class="ci-pop-foot"><button type="button" class="ci-btn primary" data-ci-close>알겠어요</button></div>');
  }

  /* ── 농장 추가 요청 ─────────────────────────────────────────────────── */
  var FIELDS = [
    { id: "frq-name", key: "name", label: "농장 · 워싱스테이션 이름", required: true, ph: "예: 나노 찰라 (Nano Challa)" },
    { id: "frq-country", key: "country", label: "국가", required: true, ph: "예: 에티오피아" },
    { id: "frq-region", key: "region", label: "지역", required: true, ph: "예: 오로미아 짐마 존 게라 워레다" },
    { id: "frq-detail", key: "detail", label: "품종 · 가공 · 고도 · 수상 내역 또는 참고 링크 (선택)", required: false, area: true,
      ph: "예: 원생종, 워시드, 1,900m, 2015 Taste of Harvest 2위 — https://..." },
    { id: "frq-who", key: "who", label: "요청자 · 로스터리명 (선택)", required: false, ph: "예: 크럼블로스터스" }
  ];

  function farmRequestText() {
    var val = {};
    FIELDS.forEach(function (f) {
      var el = document.getElementById(f.id);
      val[f.key] = el ? el.value.trim() : "";
    });
    var where = [val.country, val.region].filter(Boolean).join(" · ");
    var lines = [
      "농장/워싱스테이션: " + val.name,
      "국가·세부 지역: " + where
    ];
    if (val.detail) lines.push("", "품종·가공·고도·수상 내역 / 참고 링크:", val.detail);
    if (val.who) lines.push("", "요청자/로스터리: " + val.who);
    lines.push("", "(요청 경로: coffeeinsight.kr)");
    return {
      title: "[농장 추가 요청] " + val.name + " (" + val.country + ")",
      body: lines.join("\n"),
      where: where,
      values: val
    };
  }

  /* 구글 폼 접수용 데이터 (entry.* 번호로 전송) */
  function farmFormBody(req) {
    var fd = new FormData();
    fd.append(FARM_FORM.entry.name, req.values.name);
    fd.append(FARM_FORM.entry.where, req.where);
    fd.append(FARM_FORM.entry.detail, req.values.detail);
    fd.append(FARM_FORM.entry.who, req.values.who);
    fd.append("fvv", "1");
    fd.append("pageHistory", "0");
    return fd;
  }

  /* 입력한 내용이 채워진 구글 폼 주소 (직접 열어 보낼 때) */
  function farmFormUrl(req) {
    var params = ["usp=pp_url"];
    function add(entry, v) { if (v) params.push(entry + "=" + encodeURIComponent(v)); }
    add(FARM_FORM.entry.name, req.values.name);
    add(FARM_FORM.entry.where, req.where);
    add(FARM_FORM.entry.detail, req.values.detail);
    add(FARM_FORM.entry.who, req.values.who);
    return FARM_FORM.viewUrl + "?" + params.join("&");
  }

  function openFarmRequest() {
    var rows = FIELDS.map(function (f) {
      var req = f.required ? ' <span class="ci-req">필수</span>' : "";
      var input = f.area
        ? '<textarea id="' + f.id + '" rows="3" placeholder="' + esc(f.ph) + '"></textarea>'
        : '<input id="' + f.id + '" type="text" autocomplete="off" placeholder="' + esc(f.ph) + '"' +
          (f.required ? " required" : "") + " />";
      return '<label class="ci-field" for="' + f.id + '"><span>' + esc(f.label) + req + "</span>" + input + "</label>";
    }).join("");

    popup("농장 추가 요청",
      '<p class="ci-lead">지도와 아카이브에 없는 농장·워싱스테이션을 알려 주세요. 확인되는 자료만 골라 반영합니다.</p>' +
      '<form class="ci-form" id="frq-form" novalidate>' + rows +
        '<p class="ci-note">로그인 없이 바로 보낼 수 있습니다. 개인 이메일 주소는 받지 않습니다. 보내 주신 내용은 지도 반영 검토에만 쓰고, 확인되지 않으면 반영하지 않습니다.</p>' +
        '<p class="ci-msg" id="frq-msg" role="status"></p>' +
        '<div class="ci-pop-foot">' +
          '<button type="submit" class="ci-btn primary" id="frq-send">요청 보내기</button>' +
          '<button type="button" class="ci-btn" id="frq-copy">요청 내용 복사</button>' +
          '<button type="button" class="ci-btn ghost" data-ci-close>닫기</button>' +
        "</div>" +
        '<p class="ci-note"><a class="ci-link" id="frq-formlink" href="' + esc(FARM_FORM.viewUrl) + '" target="_blank" rel="noopener">구글 폼 화면에서 직접 보내기</a></p>' +
      "</form>");

    var form = document.getElementById("frq-form");
    var msg = document.getElementById("frq-msg");
    var send = document.getElementById("frq-send");

    function validate() {
      var missing = FIELDS.filter(function (f) {
        var el = document.getElementById(f.id);
        return f.required && el && !el.value.trim();
      });
      if (!missing.length) return true;
      msg.className = "ci-msg err";
      msg.textContent = "필수 항목을 채워 주세요: " + missing.map(function (f) { return f.label; }).join(", ");
      var firstEl = document.getElementById(missing[0].id);
      if (firstEl) firstEl.focus();
      return false;
    }

    /* '구글 폼에서 직접 보내기'는 입력한 내용을 채운 주소로 엽니다(팝업 차단 회피를 위해 실제 링크). */
    var formLink = document.getElementById("frq-formlink");
    function syncFormLink() {
      if (!formLink) return;
      formLink.href = farmFormUrl(farmRequestText());
    }
    syncFormLink();
    form.addEventListener("input", syncFormLink);
    formLink.addEventListener("click", syncFormLink);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) return;
      var req = farmRequestText();
      send.disabled = true;
      msg.className = "ci-msg";
      msg.textContent = "보내는 중…";
      /* 구글 폼은 응답 본문을 읽을 수 없는 no-cors 방식이라, 요청이 나가면 접수로 봅니다. */
      fetch(FARM_FORM.responseUrl, { method: "POST", mode: "no-cors", body: farmFormBody(req) })
        .then(function () {
          msg.className = "ci-msg ok";
          msg.textContent = "요청이 접수되었습니다. 매일 밤 확인해 지도와 농장 아카이브에 반영합니다. 고맙습니다!";
          form.querySelectorAll("input,textarea").forEach(function (el) { el.value = ""; });
          syncFormLink();
        })
        .catch(function () {
          msg.className = "ci-msg err";
          msg.textContent = "보내지 못했습니다. '요청 내용 복사'로 내용을 복사해 전해 주시거나, 아래 '구글 폼 화면에서 직접 보내기'를 눌러 주세요.";
        })
        .then(function () { send.disabled = false; });
    });

    document.getElementById("frq-copy").addEventListener("click", function () {
      var req = farmRequestText();
      var text = req.title + "\n\n" + req.body;
      copyText(text).then(function (ok) {
        msg.className = "ci-msg " + (ok ? "ok" : "err");
        msg.textContent = ok ? "요청 내용을 복사했습니다. 메일이나 메신저에 붙여 넣어 주세요."
                             : "복사하지 못했습니다. 내용을 직접 선택해 복사해 주세요.";
      });
    });
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function () { return true; }).catch(function () { return fallbackCopy(text); });
    }
    return Promise.resolve(fallbackCopy(text));
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    ta.remove();
    return ok;
  }

  /* ── 연결 ───────────────────────────────────────────────────────────── */
  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(function () {
    document.addEventListener("click", function (e) {
      var req = e.target.closest("[data-farmreq]");
      if (req) { e.preventDefault(); openFarmRequest(); return; }
      var ins = e.target.closest("[data-install]");
      if (ins) { e.preventDefault(); onInstallClick(); }
    });
  });

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(function () {
        /* 등록 실패는 조용히 넘어갑니다. (미리보기·file:// 등) */
      });
    });
  }
})();

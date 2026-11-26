/* research.js — 학술자료(research.html) 검색·필터
 * 카드는 HTML에 그대로 있고 여기서는 보이고 숨기는 일만 합니다.
 * 검색창·필터 이름은 사전(i18n-data 등)과 열쇠가 겹치지 않도록 이 파일이 언어별로 직접 씁니다.
 */
(function () {
  "use strict";
  var list = document.getElementById("list");
  if (!list) return;

  var L = {
    ko: {
      f_field: "분야", f_stage: "로스팅 단계", f_text: "원문",
      all: "전체", roast: "로스팅", origin: "산지·유전", process: "가공·발효", brew: "추출·관능",
      s1: "1단계 건조·황변", s2: "2단계 마이야르", s3: "3단계 1차 크랙", s4: "4단계 디벨롭·배출 후", s5: "전 구간 공통",
      oa: "무료 원문", tr: "전문 번역",
      ph: "제목·저자·요약에서 검색",
      empty: "조건에 맞는 논문이 없습니다. 검색어를 줄이거나 분야를 전체로 바꿔 보세요.",
      cnt: function (a, b) { return b + "편 가운데 " + a + "편"; }
    },
    en: {
      f_field: "Field", f_stage: "Roast stage", f_text: "Full text",
      all: "All", roast: "Roasting", origin: "Origin", process: "Processing", brew: "Extraction",
      s1: "Stage 1 drying", s2: "Stage 2 Maillard", s3: "Stage 3 first crack", s4: "Stage 4 development", s5: "All stages",
      oa: "Open access", tr: "Translation",
      ph: "Search titles, authors, summaries",
      empty: "No paper matches these filters. Try a shorter search or set the field to All.",
      cnt: function (a, b) { return a + " of " + b + " papers"; }
    },
    ja: {
      f_field: "分野", f_stage: "ロースト段階", f_text: "全文",
      all: "すべて", roast: "ロースティング", origin: "産地", process: "精製", brew: "抽出",
      s1: "1段階 乾燥", s2: "2段階 メイラード", s3: "3段階 1ハゼ", s4: "4段階 デベロップ", s5: "全工程共通",
      oa: "無料全文", tr: "全訳",
      ph: "タイトル・著者・要約を検索",
      empty: "条件に合う論文がありません。検索語を短くするか、分野を「すべて」にしてください。",
      cnt: function (a, b) { return b + "件中" + a + "件"; }
    }
  };

  function lang() {
    var l = (window.CI && window.CI.i18n && window.CI.i18n.lang) || "ko";
    return L[l] ? l : "ko";
  }

  var cards = [].slice.call(list.querySelectorAll("article.pp"));
  var input = document.getElementById("rq");
  var countEl = document.getElementById("countLine");
  var emptyBox = document.getElementById("emptyBox");
  var stageRow = document.getElementById("stageRow");
  var fbar = document.getElementById("fbar");
  var catChips = [].slice.call(document.querySelectorAll("#catChips .chip"));
  var stageChips = [].slice.call(document.querySelectorAll("#stageChips .chip"));
  var oaChips = [].slice.call(document.querySelectorAll("#oaChips .chip"));

  var state = { q: "", cat: "all", stage: "all", oa: "all" };
  var hay = null;
  var hayLang = null;

  function norm(s) {
    return String(s || "").toLowerCase().replace(/\s+/g, " ").trim();
  }

  function buildHay() {
    var lg = lang();
    if (hay && hayLang === lg) return;
    hay = cards.map(function (c) {
      return norm(c.textContent + " " + (c.getAttribute("data-doi") || ""));
    });
    hayLang = lg;
  }

  function paintLabels() {
    var t = L[lang()];
    if (fbar) {
      var rows = fbar.querySelectorAll(".frow");
      if (rows[0]) rows[0].querySelector(".flabel").textContent = t.f_field;
      if (rows[1]) rows[1].querySelector(".flabel").textContent = t.f_stage;
      if (rows[2]) rows[2].querySelector(".flabel").textContent = t.f_text;
    }
    function set(chips, map) {
      chips.forEach(function (c) {
        var v = c.getAttribute("data-v");
        if (map[v] != null) c.textContent = map[v];
      });
    }
    set(catChips, { all: t.all, roast: t.roast, origin: t.origin, process: t.process, brew: t.brew });
    set(stageChips, { all: t.all, 1: t.s1, 2: t.s2, 3: t.s3, 4: t.s4, 5: t.s5 });
    set(oaChips, { all: t.all, oa: t.oa, tr: t.tr });
    if (input) {
      input.placeholder = t.ph;
      input.setAttribute("aria-label", t.ph);
    }
    if (emptyBox) emptyBox.textContent = t.empty;
  }

  function pressed(chips, v) {
    chips.forEach(function (c) {
      c.setAttribute("aria-pressed", c.getAttribute("data-v") === v ? "true" : "false");
    });
  }

  function apply() {
    buildHay();
    var q = norm(state.q);
    var shown = 0;
    cards.forEach(function (c, i) {
      var ok = true;
      if (state.cat !== "all" && c.getAttribute("data-cat") !== state.cat) ok = false;
      if (ok && state.cat === "roast" && state.stage !== "all" &&
          c.getAttribute("data-stage") !== state.stage) ok = false;
      if (ok && state.oa === "oa" && c.getAttribute("data-oa") !== "1") ok = false;
      if (ok && state.oa === "tr" && c.getAttribute("data-tr") !== "1") ok = false;
      if (ok && q && hay[i].indexOf(q) < 0) ok = false;
      c.classList.toggle("hide", !ok);
      if (ok) shown++;
    });

    // 구분선은 아래에 보이는 카드가 하나도 없으면 감춥니다
    var runs = [];
    [].slice.call(list.children).forEach(function (el) {
      if (el.classList.contains("sep")) runs.push({ el: el, n: 0 });
      else if (el.classList.contains("pp") && runs.length && !el.classList.contains("hide")) {
        runs[runs.length - 1].n++;
      }
    });
    runs.forEach(function (r) { r.el.classList.toggle("hide", r.n === 0); });

    if (countEl) countEl.textContent = L[lang()].cnt(shown, cards.length);
    if (emptyBox) emptyBox.hidden = shown !== 0;
    if (stageRow) stageRow.hidden = state.cat !== "roast";
    pressed(catChips, state.cat);
    pressed(stageChips, state.stage);
    pressed(oaChips, state.oa);
  }

  catChips.forEach(function (c) {
    c.addEventListener("click", function () {
      state.cat = c.getAttribute("data-v");
      if (state.cat !== "roast") state.stage = "all";
      apply();
    });
  });
  stageChips.forEach(function (c) {
    c.addEventListener("click", function () { state.stage = c.getAttribute("data-v"); apply(); });
  });
  oaChips.forEach(function (c) {
    c.addEventListener("click", function () { state.oa = c.getAttribute("data-v"); apply(); });
  });

  var t = null;
  if (input) {
    input.addEventListener("input", function () {
      clearTimeout(t);
      t = setTimeout(function () { state.q = input.value; apply(); }, 120);
    });
    input.addEventListener("search", function () { state.q = input.value; apply(); });
  }

  function boot() { paintLabels(); apply(); }
  document.addEventListener("ci:lang", function () { hay = null; paintLabels(); setTimeout(apply, 30); });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();

  window.CI = window.CI || {};
  window.CI.research = { state: state, apply: apply };
})();

/* 상단 메뉴 높이만큼 필터 바를 그 아래에 붙입니다 */
(function () {
  var tb = document.querySelector(".topbar");
  if (!tb) return;
  function sync() { document.documentElement.style.setProperty("--tb", tb.offsetHeight + "px"); }
  sync();
  addEventListener("resize", sync, { passive: true });
  addEventListener("orientationchange", sync, { passive: true });
  setTimeout(sync, 400);
  document.addEventListener("ci:lang", function () { setTimeout(sync, 60); });
})();

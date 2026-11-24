/* i18n.js — oncoffeelog.com 한국어(KO) · 영어(EN) · 일본어(JA) 전환
 *
 * 원칙
 *  - HTML을 새로 쓰지 않고, 화면에 이미 있는 한국어 원문을 사전(i18n-data.js)으로 바꿔 끼웁니다.
 *    (원문은 지우지 않고 기억해 두었다가 KO로 되돌릴 때 그대로 복원합니다)
 *  - JS가 나중에 그리는 카드·모달·순위판도 MutationObserver로 같은 사전을 적용합니다.
 *  - 언어 결정 순서: URL의 ?lang=  →  localStorage(oncoffeelog.lang)  →  브라우저 언어
 *  - 사전에 없는 문장은 한국어 그대로 둡니다(빈 화면보다 원문이 낫습니다).
 */
(function () {
  "use strict";
  if (window.CI && window.CI.i18n) return;

  var LANGS = ["ko", "en", "ja"];
  var PIX = { en: 0, ja: 1 };   // 사전 값은 [English, 日本語]
  var GIX = { en: 1, ja: 2 };   // 낱말 사전은 [한국어, English, 日本語]
  var STORE = "oncoffeelog.lang";
  var D = window.CI_I18N || {};
  function pairs(obj) {
    var out = {};
    Object.keys(obj || {}).forEach(function (k) {
      var v = obj[k];
      out[k] = typeof v === "string" ? v.split("||") : v;
    });
    return out;
  }
  var TEXT = pairs(D.text);
  var HTML = pairs(D.html);
  var ATTR = pairs(D.attr);
  var TEMPL = (D.templ || []).map(function (row) {
    if (typeof row === "string") { var a = row.split("||"); return [a[0], a[1], a[2]]; }
    return row;
  });
  var GLOSS = (D.gloss || []).map(function (g) {
    return typeof g === "string" ? g.split("||") : g;
  });

  var KO_RE = /[\uac00-\ud7a3]/;
  var SKIP_TAGS = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1, INPUT: 1, CODE: 0, OPTION: 0 };

  var lang = "ko";
  var origText = new WeakMap();   // text node → 한국어 원문
  var origHtml = new WeakMap();   // element → 한국어 innerHTML
  var origAttr = new WeakMap();   // element → { attr: 한국어 값 }

  /* ---------- 사전 준비 ---------- */
  // 숫자가 들어간 문장은 숫자만 가린 열쇠로도 찾을 수 있게 (예: "외 34종은 …" → "외 #종은 …")
  function mask(s) { return String(s).replace(/\d[\d,\.]*/g, "#"); }
  var MASK = {};
  Object.keys(TEXT).forEach(function (k) {
    var m = mask(k);
    if (m !== k && !MASK[m]) MASK[m] = k;
  });

  // 문장 틀: "{}"는 무엇이든, "{#}"는 숫자만 (긴 틀을 먼저 본다)
  var TPL = TEMPL.map(function (row) {
    var parts = String(row[0]).split(/(\{\}|\{#\})/);
    var src = "^";
    parts.forEach(function (p) {
      if (p === "{}") src += "([\\s\\S]*?)";
      else if (p === "{#}") src += "(\\d[\\d,\\.]*)";
      else src += p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    });
    return { re: new RegExp(src + "$"), en: row[1], ja: row[2], ko: row[0] };
  }).sort(function (a, b) { return b.ko.length - a.ko.length; });

  GLOSS.sort(function (a, b) { return b[0].length - a[0].length; });
  var GLOSS_MAP = {};
  GLOSS.forEach(function (g) { GLOSS_MAP[g[0]] = g; });

  function norm(s) {
    return String(s == null ? "" : s).replace(/\s+/g, " ").trim();
  }

  function pick(pair) {
    if (!pair) return null;
    if (lang === "ko") return pair[0] == null ? null : pair[0];
    return pair[PIX[lang]] == null ? null : pair[PIX[lang]];
  }

  // 짧은 낱말(국가·산지·가공·컵노트 등)은 낱말 사전으로 바꿔 끼운다.
  // 한국어가 남으면(문장 일부만 바뀌는 경우) 아예 바꾸지 않는다 — 반쪽 번역보다 원문이 낫다.
  function glossText(s) {
    if (lang === "ko" || !GLOSS.length) return null;
    var out = s, hit = false;
    for (var i = 0; i < GLOSS.length; i++) {
      var g = GLOSS[i];
      if (out.indexOf(g[0]) < 0) continue;
      out = out.split(g[0]).join(g[GIX[lang]] || g[0]);
      hit = true;
    }
    if (!hit) return null;
    return KO_RE.test(out) ? null : out;
  }

  // 한 문장/낱말을 현재 언어로. 못 찾으면 null.
  function basic(t) {
    var pair = TEXT[t];
    if (pair) return pick(pair);
    // 문장 틀을 먼저 본다 — 숫자가 든 문장은 틀이 숫자를 그대로 옮겨 적는다.
    for (var i = 0; i < TPL.length; i++) {
      var m = t.match(TPL[i].re);
      if (!m) continue;
      var out = lang === "ko" ? TPL[i].ko : (lang === "en" ? TPL[i].en : TPL[i].ja);
      if (!out) return null;
      var n = 0;
      return out.replace(/\{\}/g, function () {
        var v = (m[++n] || "").trim();
        var inner = (v && KO_RE.test(v) && v.length <= 30) ? translate(v) : null;
        return inner == null ? v : inner;
      });
    }
    // 같은 숫자 틀의 다른 문장밖에 없을 때는, 그 번역의 숫자를 지금 문장의 숫자로 바꿔 쓴다.
    var mk = mask(t);
    if (MASK[mk]) {
      var tr = pick(TEXT[MASK[mk]]);
      if (tr != null) {
        var a = String(t).match(/\d[\d,\.]*/g) || [];
        var b = String(tr).match(/\d[\d,\.]*/g) || [];
        if (a.length && a.length === b.length) {
          var k = 0;
          tr = tr.replace(/\d[\d,\.]*/g, function () { return a[k++]; });
        }
        return tr;
      }
    }
    // 사전에 없는 짧은 낱말만 낱말 사전으로 (문장을 토막 내지 않도록)
    if (t.length <= 48 && !/[.!?]$/.test(t) && !/(습니다|해요|예요|이에요|합니다|됩니다|주세요)$/.test(t)) {
      return glossText(t);
    }
    return null;
  }

  // "살구 · 백합 · 꿀"처럼 · 로 묶인 목록은 각 낱말이 사전에 있으면 각각 바꿉니다.
  function translate(s) {
    var t = norm(s);
    if (!t || !KO_RE.test(t)) return null;
    var v = basic(t);
    if (v != null) return v;
    if (t.indexOf(" · ") > -1) {
      var parts = t.split(" · "), outs = [], ok = true;
      for (var i = 0; i < parts.length; i++) {
        var x = basic(parts[i]) || null;
        if (x == null) { ok = false; break; }
        outs.push(x);
      }
      if (ok) return outs.join(" · ");
    }
    return null;
  }

  /* ---------- 화면에 적용 ---------- */
  function keepSpace(orig, next) {
    var a = orig.match(/^\s*/)[0], b = orig.match(/\s*$/)[0];
    return a + next + b;
  }

  function doTextNode(node) {
    if (!node || node.nodeType !== 3) return;
    var p = node.parentNode;
    if (!p) return;
    if (SKIP_TAGS[p.nodeName] === 1) return;
    if (p.closest && p.closest("[data-ci-skip]")) return;
    var cur = node.nodeValue;
    var base = origText.has(node) ? origText.get(node) : cur;
    if (!KO_RE.test(base)) return;
    if (!origText.has(node)) origText.set(node, base);
    var next = lang === "ko" ? base : translate(base);
    var want = next == null ? base : keepSpace(base, next);
    if (cur !== want) node.nodeValue = want;
  }

  function doHtmlEl(el) {
    if (!el || el.nodeType !== 1) return;
    var rec = origHtml.get(el);
    if (!rec) {
      if (!KO_RE.test(el.textContent || "")) return;
      if (!el.firstElementChild) return;           // 글자만 있으면 text 노드 쪽에서 처리
      if ((el.textContent || "").length > 600) return;
      var key = norm(el.textContent);
      if (!HTML[key]) return;
      rec = { key: key, html: el.innerHTML };
      origHtml.set(el, rec);
    }
    var next = lang === "ko" ? rec.html : (pick(HTML[rec.key]) || rec.html);
    if (el.innerHTML !== next) el.innerHTML = next;
  }

  var ATTRS = ["placeholder", "title", "aria-label", "alt", "content"];

  function doAttrs(el) {
    if (!el || el.nodeType !== 1) return;
    var store = origAttr.get(el);
    for (var i = 0; i < ATTRS.length; i++) {
      var a = ATTRS[i];
      if (!el.hasAttribute || !el.hasAttribute(a)) continue;
      var cur = el.getAttribute(a);
      var base = store && store[a] != null ? store[a] : cur;
      if (!KO_RE.test(base)) continue;
      if (!store) { store = {}; origAttr.set(el, store); }
      if (store[a] == null) store[a] = base;
      var next = lang === "ko" ? null : (ATTR[norm(base)] ? pick(ATTR[norm(base)]) : null);
      // 속성 사전에 없는 값(지도 핀의 title 등)은 문장·낱말 사전으로도 시도합니다.
      if (next == null && lang !== "ko") next = translate(norm(base));
      var want = next == null ? base : next;
      if (cur !== want) el.setAttribute(a, want);
    }
  }

  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { doTextNode(root); return; }
    if (root.nodeType !== 1 && root.nodeType !== 9) return;

    // 1) 안쪽에 <b>·<em> 같은 태그가 섞인 제목·문장
    var all = root.querySelectorAll ? root.querySelectorAll("*") : [];
    for (var i = 0; i < all.length; i++) doHtmlEl(all[i]);
    if (root.nodeType === 1) doHtmlEl(root);

    // 2) 글자 노드
    var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var n, list = [];
    while ((n = tw.nextNode())) list.push(n);
    for (var j = 0; j < list.length; j++) doTextNode(list[j]);

    // 3) placeholder·aria-label 같은 속성
    for (var k = 0; k < all.length; k++) doAttrs(all[k]);
    if (root.nodeType === 1) doAttrs(root);
  }

  /* ---------- 언어 결정 ---------- */
  function fromUrl() {
    try {
      var v = (new URLSearchParams(location.search).get("lang") || "").toLowerCase();
      return LANGS.indexOf(v) >= 0 ? v : null;
    } catch (e) { return null; }
  }
  function fromStore() {
    try { var v = localStorage.getItem(STORE); return LANGS.indexOf(v) >= 0 ? v : null; }
    catch (e) { return null; }
  }
  function fromBrowser() {
    var v = String(navigator.language || navigator.userLanguage || "ko").toLowerCase();
    if (v.indexOf("ja") === 0) return "ja";
    if (v.indexOf("en") === 0) return "en";
    return "ko";
  }

  /* ---------- 언어 전환 단추 ---------- */
  var CSS = "" +
    ".cilang{display:inline-flex;align-items:stretch;border:1px solid var(--ci-line,#E2D8C9);" +
    "border-radius:999px;background:#FFFDF9;overflow:hidden;line-height:1;flex:none}" +
    ".cilang button{padding:6px 8px;font:700 11px/1.05 'Pretendard Variable',Pretendard,system-ui,sans-serif;" +
    "letter-spacing:.04em;color:#8A8074;background:none;border:0;cursor:pointer;font-family:inherit}" +
    ".cilang button+button{border-left:1px solid var(--ci-line,#E2D8C9)}" +
    ".cilang button.on{background:#221E1A;color:#FFF8EF}" +
    ".cilang button:focus-visible{outline:2px solid #C2603C;outline-offset:-2px}" +
    ".ci-titlerow{display:flex;align-items:center;gap:8px}" +
    ".ci-titlerow>h1{flex:1 1 auto;min-width:0}" +
    /* 한국어는 어절 단위로 끊지만(keep-all), 영어·일본어는 그 규칙 때문에 줄바꿈이 안 되어 넘칩니다. */
    "html[lang=\"ja\"] body, html[lang=\"ja\"] h1, html[lang=\"ja\"] p, html[lang=\"ja\"] li, html[lang=\"ja\"] dd{word-break:normal;overflow-wrap:anywhere;line-break:strict}" +
    "html[lang=\"en\"] body, html[lang=\"en\"] h1, html[lang=\"en\"] p, html[lang=\"en\"] li, html[lang=\"en\"] dd{word-break:normal;overflow-wrap:break-word}" +
    /* 카드 안 작은 항목 이름('좌표'·'안내')은 영어·일본어에서 폭을 늘려 줄바꿈을 막습니다. */
    "html[lang=\"en\"] .src .k, html[lang=\"ja\"] .src .k{width:auto;min-width:52px;white-space:nowrap}" +
    "html[lang=\"en\"] .facts dt, html[lang=\"ja\"] .facts dt{width:auto;min-width:52px;white-space:nowrap}" +
    "@media (max-width:400px){.cilang button{padding:6px 6px;font-size:10.5px}}";

  function styleOnce() {
    if (document.getElementById("ci-lang-css")) return;
    var s = document.createElement("style");
    s.id = "ci-lang-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  var box = null;

  function label(l) { return l.toUpperCase(); }

  function paintBox() {
    if (!box) return;
    var bs = box.querySelectorAll("button");
    for (var i = 0; i < bs.length; i++) {
      var on = bs[i].getAttribute("data-lang") === lang;
      bs[i].classList.toggle("on", on);
      bs[i].setAttribute("aria-pressed", on ? "true" : "false");
    }
  }

  function buildBox() {
    styleOnce();
    box = document.createElement("div");
    box.className = "cilang";
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", "Language / 언어");
    LANGS.forEach(function (l) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("data-lang", l);
      b.setAttribute("lang", l);
      b.textContent = label(l);
      b.addEventListener("click", function () { setLang(l); });
      box.appendChild(b);
    });
    paintBox();
    return box;
  }

  function placeBox() {
    if (!box) buildBox();
    var slot = document.querySelector("[data-cilang]");
    if (slot) { slot.appendChild(box); paintBox(); return; }
    var act = document.querySelector(".topact");
    if (act) { act.insertBefore(box, act.firstChild); box.style.marginRight = "2px"; paintBox(); return; }
    // log.html: 제목 줄 오른쪽에 (상단 줄은 메뉴로 이미 찼습니다)
    var h1 = document.querySelector(".hdr > h1");
    if (h1 && h1.parentNode) {
      var wrap = document.createElement("div");
      wrap.className = "ci-titlerow";
      h1.parentNode.insertBefore(wrap, h1);
      wrap.appendChild(h1);
      wrap.appendChild(box);
      h1.style.flex = "1 1 auto";
      h1.style.minWidth = "0";
      styleOnce();
      paintBox(); return;
    }
    var bar = document.querySelector(".topbar");
    if (bar) {
      var brand = bar.querySelector(".brand");
      if (brand && brand.nextSibling) bar.insertBefore(box, brand.nextSibling);
      else bar.appendChild(box);
      paintBox(); return;
    }
    var row = document.querySelector(".hdrrow") || document.querySelector("header .head") || document.querySelector("header");
    if (row) { row.appendChild(box); paintBox(); }
  }

  /* ---------- 전환 ---------- */
  function setLang(next, opts) {
    if (LANGS.indexOf(next) < 0) return;
    var changed = next !== lang;
    lang = next;
    try { localStorage.setItem(STORE, lang); } catch (e) {}
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("data-lang", lang);
    // head의 <title>·meta 설명까지 함께 바꿉니다
    walk(document.documentElement);
    paintBox();
    // 지도·앱이 새 언어로 다시 그려야 하는 화면(잔 표시 등)은 이 신호를 받아 처리합니다.
    try {
      var ev = new CustomEvent("ci:lang", { detail: { lang: lang } });
      document.dispatchEvent(ev);
    } catch (e) {}
    if (changed && opts && opts.silent) return;
  }

  /* ---------- JS가 나중에 그리는 화면 ---------- */
  var pending = [];
  var scheduled = false;
  function flush() {
    scheduled = false;
    var roots = pending; pending = [];
    for (var i = 0; i < roots.length; i++) walk(roots[i]);
  }
  function queue(node) {
    if (!node) return;
    if (node.nodeType === 3) { pending.push(node); }
    else if (node.nodeType === 1) { pending.push(node); }
    if (!scheduled) {
      scheduled = true;
      (window.requestAnimationFrame || window.setTimeout)(flush, 0);
    }
    if (pending.length > 400) flush();
  }

  function observe() {
    if (!window.MutationObserver || !document.body) return;
    var mo = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var m = muts[i];
        if (m.type === "characterData") { queue(m.target); continue; }
        var added = m.addedNodes;
        for (var j = 0; j < added.length; j++) {
          var nd = added[j];
          if (nd.nodeType === 1 || nd.nodeType === 3) queue(nd);
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  /* ---------- 시작 ---------- */
  function boot() {
    var l = fromUrl();
    if (l) { try { localStorage.setItem(STORE, l); } catch (e) {} }
    lang = l || fromStore() || fromBrowser();
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("data-lang", lang);
    try { document.title = document.title; } catch (e) {}
    walk(document.documentElement);
    placeBox();
    observe();
    // 언어 전환 뒤에 그려지는 내용이 첫 화면과 같은 언어가 되도록 한 번 더
    setTimeout(function () { walk(document.body); paintBox(); }, 600);
  }

  function t(ko) {
    var v = translate(ko);
    return v == null ? ko : v;
  }
  // 한국어 틀과 값들을 받아 현재 언어 문장으로: tp("{}곳 표시 · {}종", n, m)
  function tp(ko) {
    var args = Array.prototype.slice.call(arguments, 1);
    var i = 0;
    var s = String(ko).replace(/\{\}/g, function () { return String(args[i++]); });
    if (lang === "ko") return s;
    var v = translate(ko);
    if (v == null) return s;
    var j = 0;
    return String(v).replace(/\{\}/g, function () { return String(args[j++]); });
  }
  function country(name) {
    var g = GLOSS_MAP[String(name || "").trim()];
    return g ? (g[GIX[lang]] || g[0]) : name;
  }

  // 카탈로그(beans.json)의 산지·농장 이름(name → nameEn)을 낱말 사전에 더합니다.
  // 새 산지가 매일 추가되어도 사전을 고치지 않고 따라갑니다.
  var dirty = false;
  function addGloss(ko, en, ja) {
    if (!ko || !en || GLOSS_MAP[ko]) return;
    var g = [ko, en, ja || en];
    GLOSS.push(g); GLOSS_MAP[ko] = g; dirty = true;
  }
  function useCatalog(cat) {
    if (!cat || !cat.places) return;
    cat.places.forEach(function (p) {
      if (p && p.name && p.nameEn && p.kind !== "country") addGloss(p.name, p.nameEn, p.nameEn);
    });
    if (dirty) {
      GLOSS.sort(function (a, b) { return b[0].length - a[0].length; });
      dirty = false;
      walk(document.body);
    }
  }

  window.CI = window.CI || {};
  window.CI.i18n = {
    get lang() { return lang; },
    setLang: setLang,
    t: t, tp: tp, country: country,
    translate: translate,
    useCatalog: useCatalog,
    apply: function (root) { walk(root || document.body); }
  };
  window.CI.t = t;

  // 사전이 준비된 상태에서 바로 적용 (스크립트가 body 끝에 있어 첫 화면부터 적용됩니다)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();

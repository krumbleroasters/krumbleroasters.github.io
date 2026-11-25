/* site-notice.js — 관리자가 /admin.html에서 저장한 사이트 공지 배너
 *
 * site-config.json 의 banner.on 이 true이고 문구가 있으면 모든 페이지 맨 위에 한 줄 배너를 붙입니다.
 * 설정 파일이 없거나 꺼져 있으면 아무 일도 하지 않습니다. (실패해도 페이지에 영향 없음)
 */
(function () {
  "use strict";

  var TONES = {
    info: { bg: "#2F4636", fg: "#FFF8EF", bar: "#8FB39B" },
    warn: { bg: "#7C480E", fg: "#FFF6E6", bar: "#E0B980" },
    promo: { bg: "#8E3F27", fg: "#FFF3EC", bar: "#E6A98F" }
  };

  function lang() {
    try {
      var q = (new URLSearchParams(location.search).get("lang") || "").toLowerCase();
      if (q === "en" || q === "ja" || q === "ko") return q;
    } catch (e) {}
    try {
      var s = localStorage.getItem("oncoffeelog.lang");
      if (s === "en" || s === "ja" || s === "ko") return s;
    } catch (e) {}
    return "ko";
  }

  function pick(obj) {
    if (!obj || typeof obj !== "object") return "";
    var l = lang();
    return String(obj[l] || obj.ko || "").trim();
  }

  function paint(cfg) {
    var b = cfg && cfg.banner;
    if (!b || b.on !== true) return;
    var text = pick(b.text);
    if (!text) return;
    var key = "ci-notice-off:" + (cfg.updatedAt || text);
    try { if (sessionStorage.getItem(key) === "1") return; } catch (e) {}

    var tone = TONES[b.tone] || TONES.info;
    var el = document.createElement("div");
    el.className = "ci-notice";
    el.setAttribute("role", "status");
    el.style.cssText = [
      "display:flex", "align-items:center", "gap:8px",
      "background:" + tone.bg, "color:" + tone.fg,
      "font:600 13px/1.4 'Pretendard Variable',Pretendard,system-ui,sans-serif",
      "padding:9px 12px", "padding-top:calc(9px + env(safe-area-inset-top,0px))",
      "border-bottom:2px solid " + tone.bar, "position:relative", "z-index:60"
    ].join(";");

    var linkUrl = b.link && b.link.url ? String(b.link.url) : "";
    var label = b.link && b.link.label ? String(b.link.label) : "";

    var body;
    if (linkUrl && linkUrl.indexOf("http") !== 0 && linkUrl.charAt(0) !== "/") linkUrl = "";
    if (linkUrl) {
      body = document.createElement("a");
      body.href = linkUrl;
      if (linkUrl.indexOf("http") === 0) { body.target = "_blank"; body.rel = "noopener"; }
      body.style.cssText = "color:inherit;text-decoration:none;display:block;flex:1;min-width:0";
      body.innerHTML = '<span>' + esc(text) + "</span>" +
        (label ? ' <span style="text-decoration:underline;white-space:nowrap">' + esc(label) + " →</span>" : "");
    } else {
      body = document.createElement("div");
      body.style.cssText = "flex:1;min-width:0";
      body.textContent = text;
    }

    var x = document.createElement("button");
    x.type = "button";
    x.setAttribute("aria-label", "공지 닫기");
    x.textContent = "✕";
    x.style.cssText = "flex:none;background:none;border:0;color:inherit;opacity:.75;font-size:15px;line-height:1;padding:4px 2px;cursor:pointer";
    x.addEventListener("click", function () {
      try { sessionStorage.setItem(key, "1"); } catch (e) {}
      el.remove();
    });

    el.appendChild(body);
    el.appendChild(x);

    var app = document.querySelector(".app");
    if (app && app.parentNode && app.firstChild) app.insertBefore(el, app.firstChild);
    else if (app) app.appendChild(el);
    else if (document.body) document.body.insertBefore(el, document.body.firstChild);
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function boot() {
    fetch("/site-config.json", { cache: "no-cache" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (cfg) {
        if (!cfg) return;
        window.CI_SITE_CONFIG = cfg;
        try { document.dispatchEvent(new CustomEvent("ci:siteconfig", { detail: cfg })); } catch (e) {}
        paint(cfg);
      })
      .catch(function () {});
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();

/* place-overrides.js — 관리자가 /admin.html에서 고친 농장·산지 내용을 농장 아카이브(farms.html)에 덧씌웁니다.
 * 고친 값은 admin-overrides.json 에만 있고, 원본(beans.json)은 건드리지 않습니다.
 * 적용할 것이 없거나 실패하면 화면은 원래대로 둡니다.
 */
(function () {
  "use strict";

  var LABELS = {
    elevation: "고도",
    harvest: "수확기",
    terroir: "토양·기후",
    varieties: "대표 품종",
    processes: "가공",
    flavorProfile: "대표 향미",
    trend: "최근 동향"
  };

  function articleFor(id) {
    if (!id) return null;
    var direct = document.getElementById(String(id).replace(/\|/g, "-"));
    if (direct) return direct;
    return null;
  }

  function setTerra(art, label, value) {
    if (!value) return false;
    var dls = art.querySelectorAll("dl.terra-dl > div");
    for (var i = 0; i < dls.length; i++) {
      var dt = dls[i].querySelector("dt");
      var dd = dls[i].querySelector("dd");
      if (dt && dd && dt.textContent.trim() === label) {
        dd.textContent = value;
        return true;
      }
    }
    return false;
  }

  function apply(art, o) {
    if (!art || !o) return;
    if (o.story) {
      var p = art.querySelector("p.story");
      if (p) p.textContent = o.story;
    }
    var labels = Object.keys(LABELS);
    for (var i = 0; i < labels.length; i++) {
      var k = labels[i];
      if (o[k]) setTerra(art, LABELS[k], o[k]);
    }
    if (o.notice) {
      var head = art.querySelector("header");
      var note = document.createElement("p");
      note.className = "admin-note";
      note.style.cssText = "margin:10px 0 0;padding:9px 12px;border-radius:10px;background:#FDF6EC;border:1px solid #F0DEC4;color:#7C480E;font-size:13px;font-weight:600";
      note.textContent = o.notice;
      if (head && head.parentNode === art) art.insertBefore(note, head.nextSibling);
      else art.insertBefore(note, art.firstChild);
    }
    art.setAttribute("data-admin-edited", "1");
  }

  function boot() {
    fetch("/admin-overrides.json", { cache: "no-cache" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        var places = data && data.places;
        if (!places) return;
        Object.keys(places).forEach(function (id) {
          var art = articleFor(id);
          if (art) apply(art, places[id] || {});
        });
      })
      .catch(function () {});
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();

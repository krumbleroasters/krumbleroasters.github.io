/* photos.js — 산지·농장 카드의 무료 사진 + 출처·라이선스 표기 + '사진 저장'
 *
 *  · 사진은 모두 저장소 안(photos/)에 함께 두어 같은 출처(same-origin)에서 내려받습니다.
 *  · CC BY / CC BY-SA 사진은 저작자·라이선스·출처를 카드에 표시합니다(licenseUrl·sourcePage 링크).
 *  · '사진 저장'은 fetch → blob → a[download]로 저장하고, 실패하면 원본 이미지를 새 탭으로 엽니다.
 *  · 원문(한국어) 캡션·표기를 그대로 두고, 화면 언어에 맞춰 이 파일이 직접 골라 그립니다.
 */
(function () {
  "use strict";

  var STR = {
    save: { ko: "사진 저장", en: "Save photo", ja: "写真保存" },
    saved: { ko: "저장됨", en: "Saved", ja: "保存済み" },
    photo: { ko: "사진", en: "Photo", ja: "写真" },
    unknown: { ko: "촬영자 미상", en: "Unknown photographer", ja: "撮影者不明" },
    commons: { ko: "위키미디어 공용", en: "Wikimedia Commons", ja: "ウィキメディア・コモンズ" },
    openverse: { ko: "오픈버스", en: "Openverse", ja: "オープンバース" },
    rep: { ko: "국가 대표 사진", en: "country representative photo", ja: "代表写真" }
  };

  function lang() {
    var l = (window.CI && window.CI.i18n && window.CI.i18n.lang)
      || (document.documentElement && document.documentElement.getAttribute && document.documentElement.getAttribute("data-lang"))
      || "ko";
    return l === "en" || l === "ja" ? l : "ko";
  }
  function tr(v) { return (v && (v[lang()] || v.ko)) || ""; }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* 카드 상단 사진 블록. ph = beans.json places[].photo */
  function block(ph, name, opts) {
    if (!ph) return "";
    var src = ph.f || ph.g;
    if (!src) return "";
    opts = opts || {};
    var cap = tr(ph.c) || "";
    var who = ph.a ? esc(ph.a) : tr(STR.unknown);
    var lic = ph.l
      ? (ph.lu ? '<a href="' + esc(ph.lu) + '" target="_blank" rel="noopener">' + esc(ph.l) + "</a>" : esc(ph.l))
      : "";
    var srcName = tr(ph.s === "commons" ? STR.commons : STR.openverse);
    var srcLink = ph.p ? '<a href="' + esc(ph.p) + '" target="_blank" rel="noopener">' + esc(srcName) + "</a>" : srcName;
    var attr = esc(tr(STR.photo)) + ": " + who + (lic ? " / " + lic : "") + " / " + srcLink;
    var fileBase = String(name || "oncoffeelog").replace(/[\\/:*?"<>|\r\n\t]+/g, " ").replace(/\s+/g, " ").trim() || "oncoffeelog";
    var cls = "cardph" + (opts.cls ? " " + opts.cls : "");
    return '<figure class="' + cls + '" data-ci-skip>'
      + '<div class="phimg"><img src="' + esc(src) + '" alt="' + esc(cap) + '" loading="lazy" decoding="async">'
      + '<button class="phdl" type="button" data-photo="' + esc(ph.f || ph.g) + '" data-phorig="' + esc(ph.g || ph.f)
      + '" data-phname="' + esc(fileBase) + '">' + icon() + "<span>" + esc(tr(STR.save)) + "</span></button></div>"
      + '<figcaption><span class="phcap">' + esc(cap) + "</span>"
      + '<span class="phattr">' + attr + "</span></figcaption></figure>";
  }

  function icon() {
    return '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" '
      + 'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="m7 11 5 5 5-5"/>'
      + '<path d="M4 20h16"/></svg>';
  }

  /* 사진 저장: 같은 출처 파일을 fetch → blob 다운로드. 막히면 원본을 새 탭으로. */
  function save(btn) {
    var src = btn.getAttribute("data-photo");
    var orig = btn.getAttribute("data-phorig") || src;
    var base = btn.getAttribute("data-phname") || "oncoffeelog";
    var fname = base + "-oncoffeelog.jpg";
    var old = btn.innerHTML;
    function done() {
      btn.classList.add("done");
      btn.innerHTML = icon() + "<span>" + esc(tr(STR.saved)) + "</span>";
      setTimeout(function () { btn.classList.remove("done"); btn.innerHTML = old; }, 2600);
    }
    function fallback() {
      try { window.open(orig, "_blank", "noopener"); } catch (e) { window.location.href = orig; }
    }
    if (!window.fetch || !window.URL || !URL.createObjectURL) { fallback(); return; }
    fetch(src, { cache: "force-cache" }).then(function (r) {
      if (!r.ok) throw new Error("http " + r.status);
      return r.blob();
    }).then(function (blob) {
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = fname;
      a.rel = "noopener";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      setTimeout(function () { a.remove(); URL.revokeObjectURL(url); }, 4000);
      done();
    }).catch(fallback);
  }

  function bind(root) {
    if (!root) return;
    var list = root.querySelectorAll ? root.querySelectorAll("[data-photo]") : [];
    for (var i = 0; i < list.length; i++) {
      (function (b) {
        if (b.__ciPhoto) return;
        b.__ciPhoto = 1;
        b.addEventListener("click", function (ev) { ev.preventDefault(); ev.stopPropagation(); save(b); });
      })(list[i]);
    }
  }

  /* 정적 페이지(farms.html)용: <figure data-photo-place='{"ph":…,"name":…}'> 를 채웁니다 */
  function fill(root) {
    if (!root || !root.querySelectorAll) return;
    var nodes = root.querySelectorAll("[data-photo-place]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var payload;
      try { payload = JSON.parse(el.getAttribute("data-photo-place")); } catch (e) { continue; }
      var html = block(payload.ph, payload.name, { cls: payload.cls || "" });
      if (html) el.innerHTML = html;
      el.removeAttribute("data-ci-skip");
    }
    bind(root);
  }

  window.CI_PHOTO = { block: block, bind: bind, fill: fill, save: save };

  function onReady() {
    fill(document);
    bind(document);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", onReady);
  else onReady();
  document.addEventListener("ci:lang", function () { fill(document); });
})();

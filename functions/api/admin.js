/**
 * 온커피로그 마스터 관리자 API — Cloudflare Pages Functions
 *
 *   GET  /api/admin                      → 상태(설정 여부·로그인 여부)
 *   GET  /api/admin?action=config        → site-config.json 읽기
 *   GET  /api/admin?action=competitions  → competitions.html 목록 + competitions-extra.json
 *   GET  /api/admin?action=places&q=...  → beans.json 산지·농장 검색
 *   GET  /api/admin?action=place&id=...  → 산지·농장 하나 + 적용 중인 수정
 *   POST /api/admin  {action:"login"|"logout"|"config"|"competitions"|"place"|"place-clear"}
 *
 * 비밀값은 모두 Cloudflare Pages 환경변수(context.env)에서만 읽습니다.
 * ADMIN_PASSWORD 또는 ADMIN_PASSWORD_HASH, GITHUB_TOKEN, (선택) SESSION_SECRET
 * 이 파일에는 어떤 비밀값도 들어 있지 않습니다. 저장소에 커밋해도 안전합니다.
 */

const COOKIE_NAME = "ci_admin";
const HOURS_SESSION = 12;
const HOURS_REMEMBER = 24 * 30;
const MAX_BODY_BYTES = 512 * 1024;

const DEFAULT_REPO = "krumbleroasters/krumbleroasters.github.io";
const DEFAULT_BRANCH = "main";

/* ────────────────────────── 응답 도우미 ────────────────────────── */

const NO_STORE = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
  "x-content-type-options": "nosniff",
  "x-robots-tag": "noindex, nofollow, noarchive",
  "referrer-policy": "no-referrer"
};

function json(obj, status = 200, extraHeaders) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: Object.assign({}, NO_STORE, extraHeaders || {})
  });
}

function fail(code, message, status = 400, extra) {
  return json(Object.assign({ ok: false, code, message }, extra || {}), status);
}

/* ────────────────────────── 암호 도우미 ────────────────────────── */

const enc = new TextEncoder();
const dec = new TextDecoder();

function b64url(bytes) {
  const b = new Uint8Array(bytes);
  let s = "";
  for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function unb64url(str) {
  const s = String(str || "").replace(/-/g, "+").replace(/_/g, "/");
  const pad = s.length % 4 ? "=".repeat(4 - (s.length % 4)) : "";
  const bin = atob(s + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function b64FromText(text) {
  const bytes = enc.encode(String(text));
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
}

function textFromB64(b64) {
  const clean = String(b64 || "").replace(/[\r\n\t ]/g, "");
  const bin = atob(clean);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return dec.decode(bytes);
}

function safeEqual(a, b) {
  const x = String(a == null ? "" : a);
  const y = String(b == null ? "" : b);
  let diff = x.length ^ y.length;
  const n = Math.max(x.length, y.length);
  for (let i = 0; i < n; i++) {
    diff |= (x.charCodeAt(i % (x.length || 1)) || 0) ^ (y.charCodeAt(i % (y.length || 1)) || 0);
  }
  return diff === 0;
}

async function hmac(secret, data) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(String(secret)),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(String(data)));
  return b64url(sig);
}

function sessionSecret(env) {
  const direct = env && env.SESSION_SECRET ? String(env.SESSION_SECRET) : "";
  if (direct.length >= 16) return "s1:" + direct;
  // SESSION_SECRET가 없으면 비밀번호(또는 해시)에서 파생합니다.
  const base = (env && (env.ADMIN_PASSWORD_HASH || env.ADMIN_PASSWORD)) || "";
  return "d1:oncoffeelog-admin-session:" + String(base);
}

async function passwordOk(env, input) {
  const pass = String(input || "");
  if (!pass) return false;
  const hash = env && env.ADMIN_PASSWORD_HASH ? String(env.ADMIN_PASSWORD_HASH) : "";
  if (hash) {
    const parts = hash.split("$");
    if (parts.length >= 5 && parts[0] === "pbkdf2") {
      const algo = parts[1] || "sha256";
      const iter = parseInt(parts[2], 10) || 100000;
      const salt = unb64url(parts[3]);
      const expect = parts[4];
      if (algo.toLowerCase() !== "sha256") return false;
      const key = await crypto.subtle.importKey("raw", enc.encode(pass), "PBKDF2", false, ["deriveBits"]);
      const bits = await crypto.subtle.deriveBits(
        { name: "PBKDF2", hash: "SHA-256", salt, iterations: Math.min(Math.max(iter, 10000), 1000000) },
        key,
        256
      );
      return safeEqual(b64url(bits), expect);
    }
    return false;
  }
  if (env && env.ADMIN_PASSWORD) return safeEqual(pass, String(env.ADMIN_PASSWORD));
  return false;
}

/* ────────────────────────── 세션 쿠키 ────────────────────────── */

function getCookie(request, name) {
  const raw = request.headers.get("cookie") || "";
  const parts = raw.split(";");
  for (const part of parts) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    if (part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return "";
}

async function makeSession(env, hours) {
  const payload = b64url(enc.encode(JSON.stringify({ u: "admin", v: 1, exp: Date.now() + hours * 3600 * 1000 })));
  const sig = await hmac(sessionSecret(env), payload);
  return payload + "." + sig;
}

function sessionCookie(value, maxAgeSeconds, secure) {
  const bits = [
    COOKIE_NAME + "=" + encodeURIComponent(value),
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=" + Math.max(0, Math.round(maxAgeSeconds))
  ];
  if (secure) bits.push("Secure");
  return bits.join("; ");
}

async function readSession(env, request) {
  const raw = getCookie(request, COOKIE_NAME);
  if (!raw) return null;
  const dot = raw.lastIndexOf(".");
  if (dot <= 0) return null;
  const payload = raw.slice(0, dot);
  const sig = raw.slice(dot + 1);
  const expect = await hmac(sessionSecret(env), payload);
  if (!safeEqual(sig, expect)) return null;
  try {
    const data = JSON.parse(dec.decode(unb64url(payload)));
    if (!data || typeof data.exp !== "number" || data.exp < Date.now()) return null;
    return data;
  } catch (e) {
    return null;
  }
}

/* ────────────────────────── 환경변수 ────────────────────────── */

function missingEnv(env) {
  const missing = [];
  if (!(env && (env.ADMIN_PASSWORD || env.ADMIN_PASSWORD_HASH))) missing.push("ADMIN_PASSWORD");
  if (!(env && env.GITHUB_TOKEN)) missing.push("GITHUB_TOKEN");
  return missing;
}

const ENV_HELP =
  "Cloudflare Pages 환경변수(ADMIN_PASSWORD, GITHUB_TOKEN) 설정이 필요합니다. " +
  "Cloudflare 대시보드 → Workers & Pages → oncoffeelog → Settings → Variables and Secrets 에서 " +
  "ADMIN_PASSWORD(마스터 비밀번호), GITHUB_TOKEN(저장소 Contents 읽기·쓰기 권한)을 추가하고 다시 배포해 주세요.";

function repoOf(env) {
  return (env && env.GITHUB_REPO) || DEFAULT_REPO;
}
function branchOf(env) {
  return (env && env.GITHUB_BRANCH) || DEFAULT_BRANCH;
}

/* ────────────────────────── GitHub ────────────────────────── */

class ApiError extends Error {
  constructor(code, message, status = 502) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

function ghHeaders(env) {
  const h = {
    accept: "application/vnd.github+json",
    "user-agent": "oncoffeelog-admin",
    "x-github-api-version": "2022-11-28"
  };
  if (env && env.GITHUB_TOKEN) h.authorization = "Bearer " + env.GITHUB_TOKEN;
  return h;
}

async function readRepoFile(env, path) {
  const repo = repoOf(env);
  const branch = branchOf(env);
  const url = `https://api.github.com/repos/${repo}/contents/${encodeURI(path)}?ref=${encodeURIComponent(branch)}`;
  const res = await fetch(url, { headers: ghHeaders(env) });
  if (res.status === 404) return { missing: true, sha: null, text: null };
  if (res.status === 401 || res.status === 403) {
    throw new ApiError(
      "github_auth",
      "GitHub 토큰이 거부되었습니다(GITHUB_TOKEN 권한·만료 확인 필요).",
      502
    );
  }
  if (!res.ok) throw new ApiError("github_read", "GitHub 파일을 읽지 못했습니다(HTTP " + res.status + ").", 502);
  let meta;
  try {
    meta = await res.json();
  } catch (e) {
    throw new ApiError("github_read", "GitHub 응답을 해석하지 못했습니다.", 502);
  }
  let text = "";
  if (meta && meta.encoding === "base64" && meta.content) {
    text = textFromB64(meta.content);
  } else {
    // 1MB가 넘는 파일은 Contents API가 본문을 주지 않으므로 원본(raw)으로 읽습니다.
    const raw = await fetch(
      `https://raw.githubusercontent.com/${repo}/${encodeURIComponent(branch)}/${encodeURI(path)}`,
      { headers: ghHeaders(env) }
    );
    if (!raw.ok) throw new ApiError("github_read", "GitHub 원본을 읽지 못했습니다(HTTP " + raw.status + ").", 502);
    text = await raw.text();
  }
  return { missing: false, sha: meta && meta.sha ? meta.sha : null, text };
}

async function writeRepoFile(env, path, text, message, sha) {
  const repo = repoOf(env);
  const branch = branchOf(env);
  const body = { message, content: b64FromText(text), branch };
  if (sha) body.sha = sha;
  const res = await fetch(`https://api.github.com/repos/${repo}/contents/${encodeURI(path)}`, {
    method: "PUT",
    headers: Object.assign({ "content-type": "application/json" }, ghHeaders(env)),
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    let detail = "";
    try {
      const j = await res.json();
      detail = j && j.message ? " — " + j.message : "";
    } catch (e) {}
    throw new ApiError(
      "github_write",
      "GitHub 저장에 실패했습니다(HTTP " + res.status + ")" + detail,
      res.status === 401 || res.status === 403 || res.status === 404 || res.status === 409 ? 502 : 502
    );
  }
  let out = {};
  try {
    out = await res.json();
  } catch (e) {}
  return {
    commit: out && out.commit ? out.commit.sha : null,
    url: out && out.commit ? out.commit.html_url || null : null
  };
}

async function readJsonFile(env, path, fallback) {
  const file = await readRepoFile(env, path);
  if (file.missing || !file.text) return { data: fallback, sha: file.sha, missing: true };
  try {
    return { data: JSON.parse(file.text), sha: file.sha, missing: false };
  } catch (e) {
    throw new ApiError("bad_json", path + " 파일이 올바른 JSON이 아닙니다.", 502);
  }
}

/* ────────────────────────── 값 정리 ────────────────────────── */

function s(value, max) {
  return String(value == null ? "" : value).replace(/\s+$/g, "").slice(0, max);
}

function cleanUrl(value) {
  const v = s(value, 500).trim();
  if (!v) return "";
  if (/^\/(?!\/)/.test(v)) return v;
  if (/^https?:\/\/[^\s]+$/i.test(v)) return v;
  return "";
}

function cleanI18n(value, fallbackKo) {
  const src = value && typeof value === "object" ? value : {};
  const ko = s(src.ko != null ? src.ko : fallbackKo || "", 300);
  return {
    ko,
    en: s(src.en, 300),
    ja: s(src.ja, 300)
  };
}

const CONFIG_DEFAULT = {
  banner: { on: false, text: { ko: "", en: "", ja: "" }, link: { label: "", url: "" }, tone: "info" },
  site: { ledeSub: { ko: "", en: "", ja: "" } },
  updatedAt: null
};

function cleanConfig(input) {
  const src = input && typeof input === "object" ? input : {};
  const banner = src.banner && typeof src.banner === "object" ? src.banner : {};
  const site = src.site && typeof src.site === "object" ? src.site : {};
  const tone = ["info", "warn", "promo"].indexOf(banner.tone) >= 0 ? banner.tone : "info";
  return {
    banner: {
      on: banner.on === true,
      text: cleanI18n(banner.text),
      link: {
        label: s(banner.link && banner.link.label, 40),
        url: cleanUrl(banner.link && banner.link.url)
      },
      tone
    },
    site: { ledeSub: cleanI18n(site.ledeSub) },
    updatedAt: new Date().toISOString()
  };
}

const EXTRA_DEFAULT = { updates: {}, add: [], updatedAt: null };
const CATS = ["roast", "barista", "brew", "cup", "latte", "natl"];
const WAYS = ["onsite", "bean", "national"];

function cleanCompetitionExtra(input) {
  const src = input && typeof input === "object" ? input : {};
  const updatesIn = src.updates && typeof src.updates === "object" ? src.updates : {};
  const updates = {};
  let n = 0;
  for (const key of Object.keys(updatesIn)) {
    if (n++ > 500) break;
    const id = s(key, 60);
    if (!id) continue;
    const u = updatesIn[key] && typeof updatesIn[key] === "object" ? updatesIn[key] : {};
    const one = {};
    if (u.ev != null) one.ev = s(u.ev, 80);
    if (u.reg != null) one.reg = s(u.reg, 80);
    if (u.note != null) one.note = s(u.note, 200);
    if (u.cancelled != null) one.cancelled = u.cancelled === true;
    if (Object.keys(one).length) updates[id] = one;
  }
  const addIn = Array.isArray(src.add) ? src.add : [];
  const add = [];
  for (const raw of addIn.slice(0, 200)) {
    if (!raw || typeof raw !== "object") continue;
    const id = s(raw.id, 60) || "admin-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    const nm = Array.isArray(raw.nm) ? raw.nm : [raw.name || ""];
    const ko = s(nm[0], 120);
    if (!ko) continue;
    const cat = (Array.isArray(raw.cat) ? raw.cat : []).filter((c) => CATS.indexOf(c) >= 0).slice(0, 4);
    add.push({
      id,
      nm: [ko, s(nm[1], 120) || ko, s(nm[2], 120) || s(nm[1], 120) || ko],
      ev: s(raw.ev, 80),
      reg: s(raw.reg, 80),
      cat: cat.length ? cat : ["roast"],
      way: WAYS.indexOf(raw.way) >= 0 ? raw.way : "onsite",
      o: [s(raw.org, 60)].filter(Boolean),
      p: s(raw.place, 60),
      href: cleanUrl(raw.href),
      note: s(raw.note, 200)
    });
  }
  return { updates, add, updatedAt: new Date().toISOString() };
}

const PLACE_FIELDS = {
  story: 4000,
  flavorProfile: 400,
  elevation: 300,
  varieties: 400,
  processes: 300,
  harvest: 300,
  terroir: 400,
  trend: 600,
  notice: 400
};

function cleanPlaceOverride(input) {
  const src = input && typeof input === "object" ? input : {};
  const out = {};
  for (const k of Object.keys(PLACE_FIELDS)) {
    if (src[k] == null) continue;
    const v = s(src[k], PLACE_FIELDS[k]);
    if (v) out[k] = v;
  }
  return out;
}

/* ────────────────────────── competitions.html 해석 ────────────────────────── */

function scanBalanced(text, startIdx, open, close) {
  let depth = 0;
  let quote = "";
  let i = startIdx;
  while (i < text.length) {
    const ch = text[i];
    if (quote) {
      if (ch === "\\") {
        i += 2;
        continue;
      }
      if (ch === quote) quote = "";
      i++;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
      i++;
      continue;
    }
    if (ch === "/" && text[i + 1] === "/") {
      const nl = text.indexOf("\n", i);
      i = nl < 0 ? text.length : nl + 1;
      continue;
    }
    if (ch === "/" && text[i + 1] === "*") {
      const endc = text.indexOf("*/", i + 2);
      i = endc < 0 ? text.length : endc + 2;
      continue;
    }
    if (ch === open) depth++;
    else if (ch === close) {
      depth--;
      if (depth === 0) return i;
    }
    i++;
  }
  return -1;
}

function arrayItems(chunk, name) {
  const re = new RegExp("(?:^|[\\s,{])" + name + "\\s*:\\s*\\[");
  const m = re.exec(chunk);
  if (!m) return [];
  const openIdx = m.index + m[0].length - 1;
  const closeIdx = scanBalanced(chunk, openIdx, "[", "]");
  if (closeIdx < 0) return [];
  const body = chunk.slice(openIdx + 1, closeIdx);
  const out = [];
  let buf = "";
  let quote = "";
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (quote) {
      if (ch === "\\") {
        buf += ch + (body[i + 1] || "");
        i++;
        continue;
      }
      if (ch === quote) quote = "";
      buf += ch;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      buf += ch;
      continue;
    }
    if (ch === ",") {
      out.push(buf.trim());
      buf = "";
      continue;
    }
    buf += ch;
  }
  if (buf.trim()) out.push(buf.trim());
  return out.map((x) => x.replace(/^["'`]|["'`]$/g, "").trim()).filter(Boolean);
}

function stringField(chunk, name) {
  const re = new RegExp("(?:^|[\\s,{])" + name + "\\s*:\\s*\"((?:[^\"\\\\]|\\\\.)*)\"");
  const m = re.exec(chunk);
  return m ? m[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\") : "";
}

function parseCompetitions(html) {
  const marker = html.indexOf("var DATA = [");
  if (marker < 0) return [];
  const openIdx = html.indexOf("[", marker);
  const closeIdx = scanBalanced(html, openIdx, "[", "]");
  if (closeIdx < 0) return [];
  const body = html.slice(openIdx + 1, closeIdx);
  const items = [];
  let i = 0;
  while (i < body.length) {
    const start = body.indexOf("{", i);
    if (start < 0) break;
    const end = scanBalanced(body, start, "{", "}");
    if (end < 0) break;
    const chunk = body.slice(start, end + 1);
    const id = stringField(chunk, "id");
    if (id) {
      const nm = arrayItems(chunk, "nm");
      const cat = arrayItems(chunk, "cat");
      const mon = arrayItems(chunk, "mon").map((x) => parseInt(x, 10)).filter((x) => x >= 1 && x <= 12);
      const org = arrayItems(chunk, "o");
      let place = stringField(chunk, "p");
      if (!place) {
        const pArr = arrayItems(chunk, "p");
        place = pArr.length ? pArr[0] : "";
      }
      let reg = stringField(chunk, "reg");
      if (!reg) {
        const regArr = arrayItems(chunk, "reg");
        reg = regArr.length ? regArr[0] : "";
      }
      items.push({
        id,
        nm: nm.length ? nm : [id, id, id],
        ev: stringField(chunk, "ev"),
        reg,
        cat,
        mon,
        way: stringField(chunk, "way"),
        grade: stringField(chunk, "grade"),
        org,
        place,
        href: stringField(chunk, "href"),
        note: stringField(chunk, "note")
      });
    }
    i = end + 1;
  }
  return items;
}

function applyExtra(items, extra) {
  const updates = (extra && extra.updates) || {};
  const out = items.map((it) => {
    const u = updates[it.id];
    if (!u) return Object.assign({}, it, { overridden: false });
    const merged = Object.assign({}, it, {
      ev: u.ev != null ? u.ev : it.ev,
      reg: u.reg != null ? u.reg : it.reg,
      adminNote: u.note || "",
      cancelled: u.cancelled === true,
      overridden: true
    });
    return merged;
  });
  const existing = new Set(out.map((x) => x.id));
  for (const add of (extra && extra.add) || []) {
    if (existing.has(add.id)) continue;
    out.push({
      id: add.id,
      nm: add.nm || [add.id],
      ev: add.ev,
      reg: add.reg,
      cat: add.cat || [],
      mon: monthsFromEv(add.ev),
      way: add.way,
      grade: "official",
      org: add.o || [],
      place: add.p || "",
      href: add.href || "",
      note: add.note || "",
      added: true
    });
  }
  return out;
}

function monthsFromEv(ev) {
  const out = [];
  const re = /(\d{4})\.(\d{1,2})(?:\.(\d{1,2}))?(?:\s*[–~-]\s*(?:(\d{4})\.)?(\d{1,2})(?:\.(\d{1,2}))?)?/g;
  let m;
  while ((m = re.exec(String(ev || "")))) {
    const a = parseInt(m[2], 10);
    const b = m[5] ? parseInt(m[5], 10) : a;
    if (a >= 1 && a <= 12 && out.indexOf(a) < 0) out.push(a);
    if (b >= 1 && b <= 12 && out.indexOf(b) < 0) out.push(b);
  }
  return out.sort((x, y) => x - y);
}

/* ────────────────────────── beans.json (산지·농장) ────────────────────────── */

let BEANS_CACHE = { at: 0, data: null };

async function loadBeans(env) {
  const now = Date.now();
  if (BEANS_CACHE.data && now - BEANS_CACHE.at < 5 * 60 * 1000) return BEANS_CACHE.data;
  const file = await readRepoFile(env, "beans.json");
  if (file.missing || !file.text) throw new ApiError("beans_missing", "beans.json을 찾지 못했습니다.", 502);
  let data;
  try {
    data = JSON.parse(file.text);
  } catch (e) {
    throw new ApiError("beans_bad_json", "beans.json을 해석하지 못했습니다.", 502);
  }
  BEANS_CACHE = { at: now, data };
  return data;
}

function placeSearch(data, q) {
  const needle = String(q || "").trim().toLowerCase();
  const places = (data && data.places) || [];
  if (!needle) {
    return places
      .filter((p) => p.kind === "farm")
      .slice(0, 30)
      .map(compactPlace);
  }
  const toks = needle.split(/\s+/).filter(Boolean);
  const out = [];
  for (const p of places) {
    const hay = [p.name, p.nameEn, p.nameJa, p.country, (p.alias || []).join(" ")].filter(Boolean).join(" ").toLowerCase();
    let ok = true;
    for (const t of toks) if (hay.indexOf(t) < 0) { ok = false; break; }
    if (ok) out.push(p);
    if (out.length >= 40) break;
  }
  return out.map(compactPlace);
}

function compactPlace(p) {
  return {
    id: p.id,
    name: p.name,
    nameEn: p.nameEn || "",
    country: p.country || "",
    kind: p.kind || "",
    precision: p.precision || "",
    beanCount: p.beanCount || 0
  };
}

function placeDetail(data, id) {
  const places = (data && data.places) || [];
  const p = places.find((x) => x.id === id);
  if (!p) return null;
  return {
    id: p.id,
    name: p.name,
    nameEn: p.nameEn || "",
    country: p.country || "",
    kind: p.kind || "",
    precision: p.precision || "",
    beanCount: p.beanCount || 0,
    story: p.story || "",
    flavorProfile: p.flavorProfile || "",
    elevation: p.elevation || "",
    varieties: p.varieties || "",
    processes: p.processes || "",
    harvest: p.harvest || "",
    terroir: p.terroir || "",
    trend: p.trend || ""
  };
}

/* ────────────────────────── 본체 ────────────────────────── */

async function bodyJson(request) {
  const len = parseInt(request.headers.get("content-length") || "0", 10);
  if (len && len > MAX_BODY_BYTES) throw new ApiError("too_large", "요청이 너무 큽니다.", 413);
  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) throw new ApiError("too_large", "요청이 너무 큽니다.", 413);
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new ApiError("bad_body", "요청 본문이 올바른 JSON이 아닙니다.", 400);
  }
}

const HITS = new Map();

function tooManyAttempts(ip) {
  const now = Date.now();
  const rec = HITS.get(ip);
  if (!rec) return false;
  if (now - rec.at > 10 * 60 * 1000) {
    HITS.delete(ip);
    return false;
  }
  return rec.n >= 8;
}

function noteFailure(ip) {
  const now = Date.now();
  const rec = HITS.get(ip);
  if (!rec || now - rec.at > 10 * 60 * 1000) HITS.set(ip, { at: now, n: 1 });
  else rec.n++;
  if (HITS.size > 500) HITS.clear();
}

async function handle(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const missing = missingEnv(env);
  const configured = missing.length === 0;
  const rawMethod = request.method.toUpperCase();
  /* HEAD는 GET과 같은 상태 응답을 돌려줍니다(모니터링·링크 검사기가 HEAD를 쓰기도 합니다). */
  const method = rawMethod === "HEAD" ? "GET" : rawMethod;

  if (method !== "GET" && method !== "POST") {
    return fail("method_not_allowed", "GET 또는 POST만 사용할 수 있습니다.", 405, { allow: "GET, HEAD, POST" });
  }

  if (method === "POST") {
    const origin = request.headers.get("origin");
    if (origin && origin !== url.origin) {
      return fail("bad_origin", "허용되지 않은 출처에서의 요청입니다.", 403);
    }
  }

  const action = (url.searchParams.get("action") || "").toLowerCase();

  /* ── POST ── */
  if (method === "POST") {
    const body = await bodyJson(request);
    const act = String(body.action || action || "").toLowerCase();
    const secure = url.protocol === "https:";

    if (act === "login") {
      if (!configured) {
        return json({
          ok: false,
          code: "env_missing",
          message: ENV_HELP,
          missing,
          configured: false
        });
      }
      const ip = request.headers.get("cf-connecting-ip") || "unknown";
      if (tooManyAttempts(ip)) {
        return fail("too_many", "로그인 시도가 너무 많습니다. 10분 뒤에 다시 시도해 주세요.", 429);
      }
      const okPass = await passwordOk(env, body.password);
      if (!okPass) {
        noteFailure(ip);
        await new Promise((r) => setTimeout(r, 350));
        return fail("bad_password", "비밀번호가 맞지 않습니다.", 401);
      }
      HITS.delete(ip);
      const remember = body.remember === true;
      const hours = remember ? HOURS_REMEMBER : HOURS_SESSION;
      const token = await makeSession(env, hours);
      return json(
        { ok: true, authed: true, expiresIn: hours * 3600, remember },
        200,
        { "set-cookie": sessionCookie(token, hours * 3600, secure) }
      );
    }

    if (act === "logout") {
      return json({ ok: true, authed: false }, 200, {
        "set-cookie": sessionCookie("", 0, secure)
      });
    }

    /* 아래는 모두 로그인 필요 */
    if (!configured) {
      return json({ ok: false, code: "env_missing", message: ENV_HELP, missing, configured: false });
    }
    const session = await readSession(env, request);
    if (!session) return fail("unauthorized", "로그인이 필요합니다.", 401);

    if (act === "config") {
      const current = await readJsonFile(env, "site-config.json", CONFIG_DEFAULT);
      const next = cleanConfig(body.config);
      if (body.reset === true) {
        next.banner = Object.assign({}, CONFIG_DEFAULT.banner);
      }
      const out = await writeRepoFile(
        env,
        "site-config.json",
        JSON.stringify(next, null, 2) + "\n",
        "관리자: 사이트 공지·문구 수정",
        current.sha
      );
      return json({ ok: true, config: next, commit: out.commit, commitUrl: out.url });
    }

    if (act === "competitions") {
      const current = await readJsonFile(env, "competitions-extra.json", EXTRA_DEFAULT);
      const next = cleanCompetitionExtra(body.extra);
      const out = await writeRepoFile(
        env,
        "competitions-extra.json",
        JSON.stringify(next, null, 2) + "\n",
        "관리자: 커피대회 일정 수정",
        current.sha
      );
      return json({ ok: true, extra: next, commit: out.commit, commitUrl: out.url });
    }

    if (act === "place") {
      const id = s(body.id, 120);
      if (!id) return fail("bad_id", "산지·농장 id가 없습니다.", 400);
      const fields = cleanPlaceOverride(body.fields);
      const current = await readJsonFile(env, "admin-overrides.json", { places: {}, updatedAt: null });
      const data = current.data && typeof current.data === "object" ? current.data : {};
      const places = data.places && typeof data.places === "object" ? data.places : {};
      places[id] = Object.assign({}, places[id] || {}, fields, { updatedAt: new Date().toISOString() });
      const next = { places, updatedAt: new Date().toISOString() };
      const out = await writeRepoFile(
        env,
        "admin-overrides.json",
        JSON.stringify(next, null, 2) + "\n",
        "관리자: 농장·산지 정보 수정 — " + id,
        current.sha
      );
      return json({ ok: true, places: next.places, commit: out.commit, commitUrl: out.url });
    }

    if (act === "place-clear") {
      const id = s(body.id, 120);
      if (!id) return fail("bad_id", "산지·농장 id가 없습니다.", 400);
      const current = await readJsonFile(env, "admin-overrides.json", { places: {}, updatedAt: null });
      const data = current.data && typeof current.data === "object" ? current.data : {};
      const places = data.places && typeof data.places === "object" ? data.places : {};
      delete places[id];
      const next = { places, updatedAt: new Date().toISOString() };
      const out = await writeRepoFile(
        env,
        "admin-overrides.json",
        JSON.stringify(next, null, 2) + "\n",
        "관리자: 농장·산지 수정 되돌리기 — " + id,
        current.sha
      );
      return json({ ok: true, places: next.places, commit: out.commit, commitUrl: out.url });
    }

    return fail("unknown_action", "알 수 없는 action입니다: " + act, 400);
  }

  /* ── GET ── */
  const session = configured ? await readSession(env, request) : null;
  const base = {
    ok: true,
    configured,
    missing,
    authed: !!session,
    repo: repoOf(env),
    branch: branchOf(env),
    version: 1
  };
  if (!configured) base.message = ENV_HELP;

  if (!action || action === "status") {
    return json(base);
  }

  if (!configured) {
    return json(Object.assign({}, base, { ok: false, code: "env_missing", message: ENV_HELP }));
  }
  if (!session) return fail("unauthorized", "로그인이 필요합니다.", 401);

  try {
    if (action === "config") {
      const cur = await readJsonFile(env, "site-config.json", CONFIG_DEFAULT);
      return json(Object.assign({}, base, { config: cleanConfig(cur.data), missingFile: cur.missing }));
    }

    if (action === "competitions") {
      const html = await readRepoFile(env, "competitions.html");
      const extra = await readJsonFile(env, "competitions-extra.json", EXTRA_DEFAULT);
      if (html.missing) throw new ApiError("missing", "competitions.html을 찾지 못했습니다.", 502);
      const items = parseCompetitions(html.text || "");
      return json(
        Object.assign({}, base, {
          items: applyExtra(items, extra.data),
          rawCount: items.length,
          extra: extra.data,
          extraMissing: extra.missing
        })
      );
    }

    if (action === "places") {
      const data = await loadBeans(env);
      return json(Object.assign({}, base, { results: placeSearch(data, url.searchParams.get("q")) }));
    }

    if (action === "place") {
      const data = await loadBeans(env);
      const detail = placeDetail(data, url.searchParams.get("id") || "");
      if (!detail) return fail("not_found", "그 산지·농장을 카탈로그에서 찾지 못했습니다.", 404);
      const ov = await readJsonFile(env, "admin-overrides.json", { places: {}, updatedAt: null });
      const places = (ov.data && ov.data.places) || {};
      return json(Object.assign({}, base, { place: detail, override: places[detail.id] || null, overrides: places }));
    }

    return fail("unknown_action", "알 수 없는 action입니다: " + action, 400);
  } catch (err) {
    if (err instanceof ApiError) return fail(err.code, err.message, err.status);
    console.error("admin api error", err && err.stack ? err.stack : err);
    return fail("server_error", "서버에서 처리하지 못했습니다. 잠시 뒤 다시 시도해 주세요.", 500);
  }
}

export async function onRequest(context) {
  try {
    return await handle(context);
  } catch (err) {
    if (err instanceof ApiError) return fail(err.code, err.message, err.status);
    console.error("admin api crashed", err && err.stack ? err.stack : err);
    return fail("server_error", "서버에서 처리하지 못했습니다. 잠시 뒤 다시 시도해 주세요.", 500);
  }
}

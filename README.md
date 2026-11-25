# ONCOFFEELOG · 온커피로그 — 커피 산지·농장 지도 (v0.3 · 농장 단위 좌표)

운영: 크럼블로스터스(KRUMBLE ROASTERS). 사이트 이름 `온커피로그(ONCOFFEELOG)`.

손님용 커피 산지·농장 지도. 배포본은 <https://oncoffeelog.com/>,
이 저장소(`krumbleroasters/krumbleroasters.github.io`)가 곧 배포본입니다.

- 커스텀 도메인: `oncoffeelog.com` (루트 `CNAME` 파일로 고정, GitHub Pages 설정의 Custom domain과 같아야 합니다)
- DNS(호스팅케이알): `A @` → 185.199.108.153 · 185.199.109.153 · 185.199.110.153 · 185.199.111.153, `CNAME www` → `krumbleroasters.github.io`
- 기본 GitHub Pages 주소(`https://krumbleroasters.github.io/`)는 커스텀 도메인이 켜지면 `https://oncoffeelog.com/`로 301 리다이렉트됩니다.

- `index.html` — 페이지 (CSS·JS 포함 단일 파일, 데이터는 `beans.json`에서 불러옴)
- `beans.json` = `catalog-beans.json` — 국내 유통 생두 카탈로그
  (생두 2,846종 · 장소 183곳 · 농장 29곳 · 33개국)

## 데이터

| 항목 | 값 |
|---|---|
| 생두 | 2,846종 |
| 산지·농장 | 183곳 (농장 29 · 산지 123 · 국가 31) |
| 국가 | 33개국 |

좌표 정밀도(생두 기준): 농장 78 · 마을/베레다 286 · 산지 703 · 국가 1,779.

## v0.3에서 바뀐 것 (농장 단위 좌표·검색 디테일)

- **농장 단위 좌표** — 확인된 농장·워싱스테이션 31곳
  (에티오피아 나노 찰라,
  콜롬비아 엘 파라이소 · 파라이소 92 · 인마쿨라다 · 엘 디비소 · 엘 트리운포 · 라 팔마 이 엘 투칸 · 라 로카,
  파나마 엘리다 · 레리다 · 에스메랄다 · 잔슨 · 하트만 · 라스 브루하스,
  코스타리카 돈 마요 · 라스 라하스 · 돈 사비노 · 핀카 마초, 과테말라 엘 인헤르또 · 산타펠리사 ·
  로스 꼬네호스 · 엘 소코로 · 산타클라라 라구나, 니카라과 엘 캄발라체 · 핀카 리브레,
  엘살바도르 핀카 몬테비디오, 인도 아자드 힌드, 페루·브라질·태국 기존 농장).
  각 항목은 농장 자체가 지도에 있는지, 농장이 있는 마을·베레다 단위인지, 산지 단위인지를 배지로 밝힙니다.
- **지도 줌**: 농장 12 · 마을/베레다 11 · 산지 9 · 국가 5. 카드를 열면 그 단계로 들어갑니다.
- **검색**: 원두뿐 아니라 산지·농장도 함께 찾아 결과 맨 위에 보여 주고,
  검색 제안에도 농장을 먼저 띄웁니다. `엘파라이소` → 콜롬비아 카우카 피엔다모(베레다 로스 아라도스).
- **농장 이야기·수상 내역**: 생산자·설립·고도·연혁과 확인된 수상 기록
  (Cup of Excellence, Best of Panama, 세계 바리스타 챔피언십 사용 등)을 넣었습니다.
  카드에서 "농장 이야기"·"수상 · 기록" 섹션으로 보입니다.
- **로스터 한줄 후기**: 농장 카드·생두 카드에 로스터리 이름·배전도·한줄 후기를 남기는 폼이 있습니다.
  지금은 `localStorage`(키 `krumble.roastReviews.v1`)에 이 기기에만 저장되고,
  `loadReviews()` / `saveReview()` 두 함수만 API로 바꾸면 공용 DB로 넘어갑니다.
  화면에도 "이 기기에만 임시 저장" 이라고 밝혀 둡니다.
- **국가 단위 카드의 보조 동작**: "농장 상세 위치 찾기" — 농장 이름(영문)으로
  OpenStreetMap(Nominatim)을 그 자리에서 한 번 더 조회해 후보를 보여 주고,
  고르면 점선 참고 핀으로 지도에 표시합니다(카탈로그 좌표와 구분).

## 2026-11-22: 크럼블 라인업 노출 제거

- 상단 필터 칩 `★ 크럼블 라인업`, 홈 시트의 `KRUMBLE LINEUP` 카드, 지도 별표(`★`) 핀·레이어를 걷어내고
  처음부터 `전체 카탈로그`가 기본인 범용 산지 지도로 정리했습니다.
- 그 원두들(페루 엘 디아만테 게이샤, 과테말라 산타펠리사 등)은 `beans.json` 카탈로그에 들어 있어
  전체 카탈로그에서 검색·지도로 그대로 찾을 수 있습니다. 푸터의 운영 주체 표기(`KRUMBLE ROASTERS`)는 유지합니다.

## 2026-11-22: 내 커피 기록을 정식 메뉴에 연결

- `index.html` · `guide.html` · `farms.html` · `about.html` · `privacy.html` 상단 메뉴와 바닥글 메뉴에
  `내 커피 기록`(`log.html`)을 넣어 지도와 기록을 오갈 수 있게 했습니다. 메뉴 순서는
  `지도 · 가이드 · 농장 아카이브 · 내 커피 기록 · 소개 · 개인정보처리방침`입니다.
- `log.html` 머리글은 우측 상단 `TEST` 배지 대신 `산지 지도` · `가이드` 링크를 둡니다. `noindex`를 `index`로 바꾸고
  canonical을 넣어, `sitemap.xml` 등재와 어긋나지 않게 했습니다.
- 모바일(≤760px)에서는 상단 메뉴가 두 줄로 접히도록 `site.css`를 고쳤습니다(390px에서 가로 스크롤 없음).
- 같은 메뉴를 `build_farms.py`의 템플릿에도 넣어 매일 21시 자동 빌드가 메뉴를 되돌리지 않습니다.
- `sw.js` 캐시를 `oncoffeelog-v9`로 올려 기존 방문자도 새 메뉴를 바로 받습니다.

## 화면

- **`index.html`** — 지도 (검색·핀·카드)
- **`guide.html`** — 산지·품종·가공방식 가이드
- **`farms.html`** — 농장 아카이브 (생산자·연혁·고도·수상 기록)
- **`about.html`** — 사이트 소개와 데이터 원칙
- **`privacy.html`** — 개인정보처리방침
- **`log.html`** — 내 커피 기록. 사진 OCR로 이름을 찾아 내 지도에 핀으로 남기는 페이지로,
  이제 상단 메뉴와 `sitemap.xml`에 들어간 정식 페이지입니다(`index`, canonical `https://oncoffeelog.com/log.html`).
  기록·사진은 방문자 브라우저(localStorage · IndexedDB)에만 저장되고, '내 기록 코드'를 쓸 때만
  사진을 뺀 글자 기록이 구글 시트로 동기화됩니다(개인정보처리방침 4항).
- `site.css` — 위 읽기 페이지 공용 스타일 (지도 화면과 같은 색·서체)
- `site-tools.css` · `site-tools.js` — 홈 화면 추가·농장 추가 요청 버튼(모든 화면 공용)
- `manifest.webmanifest` · `sw.js` — `oncoffeelog.com` 홈 화면 추가(설치)용 매니페스트와 최소 서비스 워커
  (`icon-192.png` · `icon-512.png` · `icon-512-maskable.png`)
- `sitemap.xml` · `robots.txt`

- 검색: 원두 이름·산지·농장·품종·가공·컵노트 (2,846종) + 산지·농장 이름
- 지도: 산지·농장 핀(숫자=그곳 생두 종수), 낮은 줌에서는 묶음 표시
- 카드: 좌표·근거·그곳에서 온 생두 목록 / 생두 카드: 국가·지역·농장·품종·가공·컵노트
- 딥링크: `?bean=`, `?place=`, `?q=`
- 필터 칩: 전체 / 국가별(상위 12개국)

## 원칙

- 가격·매입 정보는 넣지 않습니다(손님용 화면).
- 좌표를 모르면 국가 단위로 두고 배지로 알립니다. 추정으로 핀을 찍지 않습니다.
- 농장 좌표는 **농장 자체·베레다·마을 중 확인된 단계까지만** 올리고, 그 단계를 배지로 밝힙니다.
- 지도·지오코딩 표기(OpenStreetMap · Leaflet · Esri)는 그대로 둡니다.
- 농장 추가 요청은 방문자가 직접 버튼을 눌러 보냅니다. 개인 이메일 주소는 받지 않고,
  `site-tools.js` 상단 `FARM_FORM`에 적힌 농장 추가 요청 구글 폼으로 모달에서 바로 접수됩니다.
  (보내지 못하는 환경을 위해 요청 내용 복사·구글 폼 직접 열기를 함께 둠. 농장 정보만 받고 연락처는 받지 않음)
- 접수된 요청은 매일 밤 9시 자동 업데이트에서 확인해, 검증되는 농장만 지도·농장 아카이브에 반영합니다.

## 2026-11-23: 메인 검색창에 사진(카메라) 검색

- 검색창 안, `검색` 버튼 왼쪽에 카메라 아이콘 버튼(`aria-label="사진으로 검색"`)을 두었습니다.
  보이는 원은 36px, 손가락이 닿는 영역은 44px입니다.
- 누르면 하단 시트(데스크톱은 가운데 모달)로 `카메라로 찍기`(`accept="image/*" capture="environment"`)와
  `사진 보관함에서 고르기`(`accept="image/*"`)를 고릅니다.
- **Tesseract.js는 사진을 실제로 고른 뒤에만** 내려받습니다(첫 화면 로딩에 영향 없음). 사진은 브라우저 안에서만
  읽고 서버로 보내지 않습니다. 처음 한 번은 한국어·영어 글자 데이터(약 18MB)를 받습니다.
- 인식 중에는 `.sheet` 맨 위 패널에 사진 썸네일·진행률 바·안내 문구가 나오고, 끝나면 읽은 글자를 고쳐
  `이 글자로 다시 찾기`로 다시 맞춰 볼 수 있습니다. 후보(생두·농장·산지·국가)를 누르면 기존
  `selectBean()` / `selectPlace()`로 지도가 그곳으로 이동합니다.
- 매칭은 `log.html`과 같은 가중치(이름 일치·2-gram 커버리지·국가 보정)를 씁니다. 사진 전처리는
  `log.html`에서 검증한 리사이즈(긴 변 1000px, JPEG)을 그대로 쓰고, 첫 인식에서 글자를 못 찾으면
  회색조 + 대비 스트레치본으로 한 번 더 읽습니다.
- 글자 데이터 경로는 `log.html`과 같은 `tessdata.projectnaptha.com`을 먼저 쓰고, 실패하면
  jsDelivr의 같은 자료(naptha/tessdata)로 재시도합니다.
- `sw.js` 캐시를 `oncoffeelog-v15`로 올렸습니다.
- **매일 21시 자동 업데이트 작업에 대한 주의**: `index.html`에서 손대는 곳은 `FARM_PROFILES`(농장 프로필)뿐입니다.
  위 사진 검색 블록(`.search-box .cam` · `.psback` · `pspanel` 관련 CSS와 `var PV` 이후 스크립트)은 건드리지 마세요.

## 다국어 (한국어 · English · 日本語)

- `i18n.js` — 화면에 이미 있는 한국어 원문을 사전으로 바꿔 끼우는 스크립트. 언어 순서는 `?lang=` → `localStorage(oncoffeelog.lang)` → 브라우저 언어이고, `document.documentElement.lang`도 함께 바꿉니다. 상단에 `KO | EN | JA` 단추를 스스로 넣습니다.
- `i18n-data.js` — 공통·index·log의 문장 사전(`text`), 태그가 섞인 문장(`html`), 속성 값(`attr`), 숫자가 끼는 문장 틀(`templ`), 국가·산지·가공·컵노트 낱말 사전(`gloss`).
- `i18n-pages.js` — about · guide · privacy · farms의 번역. 원문 열쇠는 페이지에서 그대로 뽑은 문자열이라, **페이지 문장을 고치면 이 파일도 다시 만들어야 합니다**(`work/krumble-i18n/build_dict.py`, `work/krumble-i18n/tr-<page>.json`).
- 문장을 고칠 때는 `i18n*.js?v=` 값을 올리고 `sw.js`의 `CACHE`도 함께 올립니다. `build_farms.py`로 `farms.html`을 다시 만들 때도 같은 값을 씁니다(`I18N_VER`).

## 마스터 관리자 (`/admin.html` + `/api/admin`) — 2026-11-25

세민님이 AI 도움 없이도 급할 때 사이트 내용을 직접 고칠 수 있게 만든 화면입니다. 검색에 노출되지 않고(`noindex`, `robots.txt` Disallow) 사이트 메뉴·푸터 어디에도 링크하지 않습니다. 주소를 아는 사람만 엽니다.

- **화면**: <https://oncoffeelog.pages.dev/admin.html> (Cloudflare Pages는 `.html`을 떼고 `/admin`으로 308 리다이렉트하므로 `/admin`도 같습니다). GitHub Pages(`oncoffeelog.com`)에는 Functions가 없어서 로그인할 수 없습니다 — 관리자 기능은 pages.dev에서만 동작합니다.
- **백엔드**: `functions/api/admin.js` — Cloudflare Pages Functions. 로그인은 HMAC-SHA256 서명 HttpOnly 쿠키(12시간, '로그인 유지' 30일), 비밀번호는 `ADMIN_PASSWORD`(평문) 또는 `ADMIN_PASSWORD_HASH`(`pbkdf2$sha256$<iter>$<salt>$<hash>`, base64url)로 확인합니다.
- **필요한 환경변수** (Cloudflare 대시보드 → Workers & Pages → `oncoffeelog` → Settings → Variables and Secrets):
  - `ADMIN_PASSWORD` (Secret) — 마스터 비밀번호
  - `GITHUB_TOKEN` (Secret) — 이 저장소 Contents **Read and write** 권한의 fine-grained 토큰. 저장 시 GitHub Contents API로 커밋합니다.
  - `SESSION_SECRET` (선택) — 없으면 `ADMIN_PASSWORD`에서 파생합니다.
  값은 저장소에 절대 커밋하지 않습니다. **`functions/`에는 비밀값이 한 글자도 없습니다.**
- **관리 항목과 저장 위치**:
  | 화면 | 저장 파일 | 사이트 반영 방법 |
  |---|---|---|
  | 공지 배너 · 메인 첫 문장 | `site-config.json` | 모든 페이지가 `site-notice.js`로 배너를 읽고, index가 `ledeSub`를 씁니다 |
  | 커피대회 일정 수정·추가 | `competitions-extra.json` | `competitions.html`이 원본 `DATA` 위에 덧씌웁니다(원본은 안 건드림) |
  | 농장·산지 정보 수정 | `admin-overrides.json` | `index.html`(카드)과 `farms.html`(`place-overrides.js`)이 덧씌웁니다 |
- **덧씌우기 방식인 이유**: `beans.json`·`farms.html`은 매일 21시 자동 업데이트가 새로 만들기 때문에, 원본을 고치면 다음 날 지워집니다. 관리자 수정은 별도 파일에만 쌓여 그대로 남습니다.
- **적용 시점**: 저장하면 `main`에 커밋되고 Cloudflare Pages·GitHub Pages가 1~2분 안에 다시 배포합니다.
- **로고 클릭**: 상단 `ONCOFFEELOG · 온커피로그`를 누르면 검색어·필터·선택을 모두 지우고 첫 화면으로 돌아갑니다(`index.html`의 `goHome()`). 다른 페이지에서는 `./`로 이동합니다.

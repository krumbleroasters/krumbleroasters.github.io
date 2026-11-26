/* cafes-i18n.js — cafes.html 화면 문장의 EN·JA 번역 (이 페이지에서만 더합니다)
 * 형식은 i18n-data.js와 같습니다: "한국어": "English||日本語"
 * i18n-data.js 뒤, i18n.js 앞에서 불러옵니다.
 */
(function () {
  if (!window.CI_I18N) window.CI_I18N = {};
  var T = window.CI_I18N.text || (window.CI_I18N.text = {});
  var add = {
    /* ── 제목·소개 ── */
    "로컬 카페": "Local cafes||ローカルカフェ",
    "전국의 ": "Every ",
    "를 한 장의 지도에": " local cafe on one map",
    "프랜차이즈를 뺀 개인 카페를 시·군·구 단위로 나눠 올렸습니다. 지도를 확대하면 그 동네 카페만 불러옵니다.":
      "Independent cafes, franchise chains left out, split by city and district. Zoom in and only that neighbourhood loads.||フランチャイズを除いた個人カフェを市・郡・区単位で載せました。地図を拡大すると、その街のカフェだけを読み込みます。",
    "개인 카페": "Local cafes||個人カフェ",
    "시·군·구": "Districts||市・郡・区",
    "프랜차이즈 제외": "Chains removed||フランチャイズ除外",
    "자료 기준일": "Data as of||データ基準日",

    /* ── 찾기 ── */
    "지역으로 찾기": "Find by area||地域で探す",
    "시·도": "Province||道・広域市",
    "시·군·구": "District||市・郡・区",
    "전체 지역": "All areas||すべての地域",
    "카페명 · 동네 이름 검색": "Cafe name or neighbourhood||カフェ名・街の名前で検索",
    "카페명 또는 동네 이름 검색": "Search by cafe name or neighbourhood||カフェ名・街の名前で検索",
    "시·도 선택": "Choose a province||道・広域市を選ぶ",
    "시·군·구 선택": "Choose a district||市・郡・区を選ぶ",
    "검색": "Search||検索",
    "지도를 확대하면 그 구역의 카페가 표시됩니다.": "Zoom in to see the cafes in that area.||地図を拡大すると、その区域のカフェが表示されます。",
    "지도를 확대하거나 위에서 지역을 고르면 카페가 표시됩니다.":
      "Zoom in, or pick an area above, to see cafes.||地図を拡大するか、上で地域を選ぶとカフェが表示されます。",
    "불러오는 중…": "Loading…||読み込み中…",
    "이 구역에는 등록된 카페가 없습니다.": "No cafes are registered in this area.||この区域に登録されたカフェはありません。",
    "카페 {}곳": "{} cafes||カフェ{}軒",
    "카페 {}곳 표시 중": "{} cafes shown||カフェ{}軒を表示中",
    "카페 {}곳 불러옴": "{} cafes loaded||カフェ{}軒を読み込み済み",
    "검색 결과": "Results||検索結果",
    "결과가 없습니다. 동네 이름을 넣거나 지도를 그 동네로 옮겨 보세요.":
      "No match. Try a neighbourhood name, or move the map there.||該当なし。街の名前を入れるか、地図をその街へ移動してください。",
    "지도에서 보기": "Show on map||地図で見る",
    "네이버 지도": "Naver Map||ネイバーマップ",
    "카카오맵": "KakaoMap||カカオマップ",
    "카페 수": "Cafes||カフェ数",

    /* ── 출처 ── */
    "출처와 한계": "Source and limits||出典と限界",
    "행정안전부 지방행정인허가데이터의 식품_휴게음식점 가운데 영업 중(영업/정상)이면서 업태가 커피숍인 곳만 모았습니다. 주요 커피·음료·디저트·베이커리 프랜차이즈는 브랜드 이름으로 걸러 뺐습니다.":
      "Built from the Ministry of the Interior and Safety's local licensing data (food / rest-area restaurants): only places still trading (open/normal) whose business type is coffee shop. Major coffee, drink, dessert and bakery chains were filtered out by brand name.||行政安全部の地方行政許認可データのうち、営業中（営業/正常）で業態がコーヒーショップの店だけを集めました。主要なコーヒー・飲料・デザート・ベーカリーのフランチャイズはブランド名で除外しています。",
    "일반음식점으로 등록한 카페, 좌표가 없는 곳, 휴게음식점이 아닌 형태로 신고된 곳은 들어 있지 않습니다. 폐업과 신규 개업은 자료 갱신 주기(2일 전 기준)에 따라 실제와 다를 수 있습니다.":
      "Cafes registered as general restaurants, places without coordinates, and places licensed in another category are not included. Closures and new openings can differ from reality because the data follows its own two-day update cycle.||一般飲食店として登録されたカフェ、座標のない店、休憩飲食店以外の形態で届け出られた店は含まれていません。閉業や新規開業は、データの更新周期（2日前基準）により実際と異なる場合があります。",
    "좌표는 원본의 Bessel 중부원점TM(EPSG:5174)을 WGS84로 변환했습니다. 카카오 지도 주소 좌표와 16곳을 맞춰 본 결과 중앙값 4m, 최대 49m 차이였습니다.":
      "Coordinates were converted from the original Bessel Central Belt TM (EPSG:5174) to WGS84. Against Kakao Map address coordinates for 16 sampled cafes the median difference was 4 m and the largest 49 m.||座標は原本のBessel中部原点TM（EPSG:5174）をWGS84に変換しました。カカオマップの住所座標と16か所を照合した結果、中央値4m、最大49mの差でした。",

    /* ── 바닥글 ── */
    "손님용 산지 지도 · 운영 크럼블로스터스(KRUMBLE ROASTERS) · 가격과 매입 정보는 싣지 않습니다.":
      "Origin map for customers · run by KRUMBLE ROASTERS · no prices or purchase details||お客様向け産地マップ · 運営 KRUMBLE ROASTERS · 価格や仕入れ情報は掲載しません"
  };
  Object.keys(add).forEach(function (k) { if (!T[k]) T[k] = add[k]; });

  var A = window.CI_I18N.attr || (window.CI_I18N.attr = {});
  var attr = {
    "카페명 · 동네 이름 검색": "Cafe name or neighbourhood||カフェ名・街の名前で検索",
    "카페명 또는 동네 이름 검색": "Cafe name or neighbourhood||カフェ名・街の名前で検索",
    "시·도 선택": "Choose a province||道・広域市を選ぶ",
    "시·군·구 선택": "Choose a district||市・郡・区を選ぶ",
    "전국 로컬 카페 지도": "Local cafe map of Korea||全国ローカルカフェ地図",
    "산지 지도로 돌아가기": "Back to the origin map||産地マップに戻る"
  };
  Object.keys(attr).forEach(function (k) { if (!A[k]) A[k] = attr[k]; });
})();

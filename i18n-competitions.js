/* i18n-competitions.js — 커피대회 페이지(competitions.html)의 KO → EN · JA 사전
 * 형식: "한국어": ["English", "日本語"]   (열쇠 = 화면에 있는 한국어 원문 그대로)
 *   text  : 글자 노드 (제목·문단·소제목)
 *   html  : <b>·<em>·<strong> 같은 태그가 섞인 문장 (열쇠 = 태그를 뺀 글자 전체)
 *   attr  : meta description · og 설명 같은 속성값
 * 대회 카드·필터·배지는 페이지 안 스크립트가 언어별로 직접 그리므로 여기에 없습니다.
 * 새 문장을 페이지에 더하면 여기에도 같은 문장을 열쇠로 넣어 주세요.
 */
(function () {
  var P = {
    "text": {
      "국내 커피대회 일정 — 온커피로그 ONCOFFEELOG":
        ["Korean coffee competitions — ONCOFFEELOG", "韓国のコーヒー大会 日程 — ONCOFFEELOG（オンコーヒーログ）"],

      "국가대표 선발전부터 원두 출품전, 지역 축제 경연까지 국내에서 열리는 커피대회를 한 페이지에 모았습니다. 대회 날짜와 접수 기간을 나란히 적어, 지금 무엇을 준비할 수 있는지 바로 보이게 했습니다.":
        ["Every coffee competition held in Korea — national team selections, green bean entries and regional festival contests — gathered on one page. Dates and entry periods sit side by side, so you can see what you could prepare for right now.",
         "代表選考から生豆出品、地域フェスティバルの競技まで、韓国で開かれるコーヒー大会を一つのページに集めました。開催日と受付期間を並べて載せ、いま何を準備できるかがすぐ分かるようにしています。"],

      "2026년 11월 25일 기준 · 대회 50여 개 · 주최 측 공식 페이지와 보도로 확인":
        ["As of 25 November 2026 · 50-odd competitions · checked against organiser pages and press",
         "2026年11月25日時点・大会50件あまり・主催者の公式ページと報道で確認"],

      "지금 접수 중": ["Open for entry", "受付中"],
      "대회 전체 목록": ["All competitions", "大会一覧"],
      "읽는 법": ["How to read it", "読み方"],

      "지금 접수 중 · 다가오는 일정": ["Open for entry now, and coming up", "受付中・近日開催"],
      "분야": ["Category", "種目"],
      "위에서 분야를 고르면 이 목록도 그 분야만 남습니다. 접수 기간이 남았거나 곧 열리는 대회를 앞에 모았고, 날짜가 지나면 목록에서 빠져 아래 전체 목록에 지난 일정으로 남습니다.":
        ["Pick a category above and this list narrows to it. Competitions whose entry period is still running, or that open soon, are gathered at the top; once the dates pass they drop off and stay in the full list below as past events.",
         "上で種目を選ぶと、このリストもその種目だけになります。受付期間が残っている大会と、これから開かれる大会を上にまとめ、日付が過ぎるとこのリストから外れて下の一覧に終了した大会として残ります。"],
      "접수 기간이 남았거나 곧 열리는 대회를 앞에 모았습니다. 날짜가 지나면 목록에서 빠지고, 아래 전체 목록에는 지난 일정으로 남습니다.":
        ["Competitions whose entry period is still running, or that open soon, gathered at the top. Once the dates pass they drop off this list and stay below as past events.",
         "受付期間が残っている大会と、これから開かれる大会を上にまとめました。日付が過ぎるとこのリストから外れ、下の一覧に終了した大会として残ります。"],

      "다가오는 일정을 위에, 지난 일정은 아래쪽에 두었습니다. 위에서 고른 분야와 아래 달 필터로 걸러 볼 수 있고, 카드의 공식 링크에서 그 대회의 공고를 확인할 수 있습니다.":
        ["Upcoming events come first and past ones sit at the bottom. Filter by the category chosen above and by month below, and the official link on each card leads to that competition's announcement.",
         "これからの大会を上に、終了した大会は下に置いています。上で選んだ種目と下の月フィルターで絞り込め、カードの公式リンクからその大会の告知を確認できます。"],

      "다가오는 일정을 위에, 지난 일정은 아래쪽에 두었습니다. 월별·종목별로 걸러 볼 수 있고, 카드의 공식 링크에서 그 대회의 공고를 확인할 수 있습니다.":
        ["Upcoming events come first and past ones sit at the bottom. Filter by month or category, and the official link on each card leads to that competition's announcement.",
         "これからの大会を上に、終了した大会は下に置いています。月別・種目別で絞り込め、カードの公式リンクからその大会の告知を確認できます。"],

      "월별": ["Month", "月別"],
      "종목 · 성격": ["Category", "種目・性格"],

      "읽는 법과 확인 한계": ["How to read it, and what is missing", "読み方と確認できていないこと"],
      "이 목록은 2026년 11월 25일에 주최 측 공식 페이지, 주최 측 발표를 인용한 보도, 업계 정리 자료를 교차 확인해 만들었습니다. 그 뒤에 바뀐 일정은 반영되지 않았습니다.":
        ["This list was built on 25 November 2026 by checking organiser pages, press quoting the organisers, and industry round-ups against one another. Changes made after that are not reflected.",
         "このリストは2026年11月25日に、主催者の公式ページ、主催者の発表を引用した報道、業界のまとめ資料を突き合わせて作りました。それ以降に変わった日程は反映されていません。"],

      "표기 등급": ["How each item is sourced", "表記の区分"],
      "이름이 비슷한 대회": ["Competitions with similar names", "名前が似ている大会"],
      "확인하지 못한 대회": ["Competitions not confirmed", "確認できなかった大会"],
      "이 목록의 범위": ["What this list covers", "このリストの範囲"],

      "컵테이스터스만 해도 서로 다른 대회가 여섯 개입니다. KCTC(SCA·부산), CTC(GCA·부산여대), MOC(KCL·코엑스), DCTC(대구), GPCC(영도), WCT(시흥 WCC). 이름이 비슷해도 주최와 권위가 다르니 카드의 주최와 링크를 함께 보세요. 같은 이유로 로스팅 대회도 KCRC(SCA)·KCR(KCL 로스팅)·SRC(스트롱홀드)·WRL KOREA·KRCA처럼 여러 갈래가 있습니다.":
        ["Cupping alone has six different competitions: KCTC (SCA, Busan), CTC (GCA, Busan Women's University), MOC (KCL, COEX), DCTC (Daegu), GPCC (Yeongdo) and WCT (WCC in Siheung). Similar names, different organisers and standing, so read the organiser and the link on each card. Roasting splits the same way — KCRC (SCA), KCR (KCL roasting), SRC (Stronghold), WRL KOREA and KRCA.",
         "カッピングだけでも六つの別の大会があります。KCTC（SCA・釜山）、CTC（GCA・釜山女子大）、MOC（KCL・COEX）、DCTC（大邱）、GPCC（影島）、WCT（始興WCC）。名前は似ていても主催と位置づけが違うので、カードの主催とリンクを一緒に見てください。ローストも同じで、KCRC（SCA）・KCR（KCLロースト）・SRC（ストロングホールド）・WRL KOREA・KRCA に分かれます。"],

      "아래 대회는 2026년 개최 기록이나 세부 일정을 확인하지 못해 목록에 넣지 않았습니다.":
        ["These competitions are left out of the list because their 2026 record or detailed schedule could not be confirmed.",
         "次の大会は2026年の開催記録や詳細な日程を確認できなかったため、一覧に入れていません。"],

      "지자체·상인협의체·카페 커뮤니티가 여는 즉석 라떼아트 배틀처럼 공식 목록이 없는 1회성 행사는 넣지 않았습니다. 금액·참가비·상금은 2026년 기준이며 다음 시즌에 바뀔 수 있습니다. 일정이 달라졌거나 빠진 대회가 있으면 저장소 이슈로 알려 주세요.":
        ["One-off events with no official listing — impromptu latte art battles run by districts, merchant groups or café communities — are not included. Fees and prizes are as of 2026 and may change next season. If a date has moved or a competition is missing, tell us in a repository issue.",
         "行政区・商店会・カフェコミュニティが開く即興のラテアートバトルのように、公式の一覧がない単発の催しは入れていません。参加費や賞金は2026年時点のもので、次のシーズンに変わる可能性があります。日程が変わった、あるいは抜けている大会があれば、リポジトリのissueでお知らせください。"],

      "목록과 필터는 브라우저에서 자바스크립트로 그립니다. 자바스크립트를 켜면 대회 목록이 나옵니다.":
        ["The list and filters are drawn by JavaScript in the browser. Turn it on to see the competition list.",
         "一覧とフィルターはブラウザのJavaScriptで描画します。有効にすると大会一覧が表示されます。"]
    },

    "html": {
      "국내 커피대회, 한 해 일정 한눈에":
        ["Korean coffee competitions, <em>a year at a glance</em>", "韓国のコーヒー大会、<em>一年の日程を一望</em>"],

      "대회 이름의 연도와 실제 열리는 해는 다를 수 있습니다. SCA 계열 대회는 그 대회 우승자가 출전할 세계대회의 연도를 이름에 씁니다. 예를 들어 2027 KNBC·KBrC는 2026년 11월 11~14일 코엑스에서, 2027 KCRC는 2026년 6월 4~7일 킨텍스에서, 2027 KCTC는 2026년 10월 1~4일 부산 해운대 더베이101에서 열렸습니다. 이 페이지의 월 필터는 이름이 아니라 실제 개최일을 기준으로 합니다.":
        ["<b>A competition's name may carry a different year from the year it is held.</b> SCA events are named after the world championship their winner enters. For example <b>2027 KNBC and KBrC</b> were held on 11–14 November 2026 at COEX, <b>2027 KCRC</b> on 4–7 June 2026 at KINTEX, and <b>2027 KCTC</b> on 1–4 October 2026 at The Bay 101 in Haeundae, Busan. The month filter on this page follows the actual dates, not the name.",
         "<b>大会名の年と、実際に開かれる年は違うことがあります。</b>SCA系の大会は、その大会の優勝者が出場する世界大会の年を名前に使います。たとえば<b>2027 KNBC・KBrC</b>は2026年11月11〜14日にCOEXで、<b>2027 KCRC</b>は2026年6月4〜7日にKINTEXで、<b>2027 KCTC</b>は2026年10月1〜4日に釜山・海雲台のザベイ101で開かれました。このページの月フィルターは名前ではなく実際の開催日で分けています。"],

      "공식주최 측 공식 페이지나 공고에서 직접 확인한 항목입니다.":
        ["<b>Official</b>Checked directly on the organiser's own page or announcement.",
         "<b>公式</b>主催者の公式ページや告知で直接確認した項目です。"],
      "보도주최 측 발표를 인용한 언론·업계 매체 보도로 확인한 항목입니다.":
        ["<b>Press</b>Confirmed through press or trade coverage quoting the organiser's announcement.",
         "<b>報道</b>主催者の発表を引用した報道・業界メディアで確認した項目です。"],
      "2차업계 정리 매체로 확인했고 주최 측 공식 페이지에서 다시 확인하지 못한 항목입니다. 참가 전에 주최 측 공고를 확인하세요.":
        ["<b>Second-hand</b>Confirmed through an industry round-up but not re-checked on the organiser's own page. Check the organiser's notice before entering.",
         "<b>二次資料</b>業界のまとめ資料で確認し、主催者の公式ページでは再確認できなかった項目です。参加前に主催者の告知をご確認ください。"],

      "K-Cafe Championship — (사)한국커피연합회. 2025년 지역 리그 개최는 확인되지만 2026년 개최 기록은 확인되지 않았습니다.":
        ["<strong>K-Cafe Championship</strong> — Korea Coffee Association. Regional leagues in 2025 are confirmed, but no 2026 record was found.",
         "<strong>K-Cafe Championship</strong> — 韓国コーヒー連合会。2025年の地域リーグ開催は確認できましたが、2026年の開催記録は確認できませんでした。"],
      "WSBC 월드 슈퍼 바리스타 챔피언십 — 2012~2023년 서울커피엑스포 부대행사로 열렸고, 2026년 프로그램에는 없습니다.":
        ["<strong>WSBC World Super Barista Championship</strong> — ran from 2012 to 2023 as a side event of the Seoul Coffee Expo, and is not in the 2026 programme.",
         "<strong>WSBC ワールドスーパーバリスタチャンピオンシップ</strong> — 2012〜2023年にソウルコーヒーエキスポの併催行事として開かれ、2026年のプログラムにはありません。"],
      "더 블랙 골드 컵 — 국내 로스터가 다수 참가하지만 국내 개최지와 주최를 확인하지 못했습니다.":
        ["<strong>The Black Gold Cup</strong> — many Korean roasters enter, but the Korean venue and organiser could not be confirmed.",
         "<strong>ザ・ブラックゴールドカップ</strong> — 韓国のロースターが多く参加していますが、国内の会場と主催は確認できませんでした。"]
    },

    "attr": {
      "국내 커피대회 일정 — 온커피로그 ONCOFFEELOG":
        ["Korean coffee competitions — ONCOFFEELOG", "韓国のコーヒー大会 日程 — ONCOFFEELOG（オンコーヒーログ）"],
      "국내에서 열리는 커피대회 50여 개의 대회 날짜와 접수 기간, 주최, 장소, 공식 링크를 월별·종목별로 정리했습니다. 국가대표 선발전부터 원두 출품전, 지역 축제 경연까지 2026년 11월 25일 기준.":
        ["Dates, entry periods, organisers, venues and official links for more than 50 coffee competitions held in Korea, sorted by month and category — from national team selections to green bean entries and regional festival contests, as of 25 November 2026.",
         "韓国で開かれるコーヒー大会50件以上の開催日・受付期間・主催・会場・公式リンクを月別・種目別にまとめました。代表選考から生豆出品、地域フェスティバルの競技まで、2026年11月25日時点。"],
      "국내 커피대회 50여 개를 대회 날짜·접수 기간·주최·장소·공식 링크와 함께 월별·종목별로 정리했습니다.":
        ["More than 50 Korean coffee competitions with dates, entry periods, organisers, venues and official links, sorted by month and category.",
         "韓国のコーヒー大会50件以上を、開催日・受付期間・主催・会場・公式リンクとともに月別・種目別に整理しました。"]
    }
  };

  var D = window.CI_I18N || (window.CI_I18N = {});
  ["text", "html", "attr"].forEach(function (k) {
    D[k] = D[k] || {};
    var src = P[k] || {};
    Object.keys(src).forEach(function (key) {
      if (!D[k][key]) D[k][key] = src[key];
    });
  });
})();

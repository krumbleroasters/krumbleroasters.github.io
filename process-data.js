/* process-data.js — 온커피로그 가공방식 사전 (work/process-taxonomy/build_site_assets.py가 만듭니다)
 * 원본: work/process-taxonomy/process-dictionary.json · 이 파일을 직접 고치지 마세요.
 * KO/EN/JA 라벨·설명·주의가 모두 들어 있어, 화면은 현재 언어 값만 그대로 그립니다.
 */
window.CI_PROCESS = {
"version": "1.0",
"generatedAt": "2026-11-25T10:59:40",
"chips": [
{
"id": "all",
"label": {
"ko": "전체",
"en": "All",
"ja": "すべて"
},
"desc": {
"ko": "가공 표기가 없는 원두까지 모두 보여 줍니다.",
"en": "Shows every bean, including those with no process label.",
"ja": "精製表記のない豆も含めてすべて表示します。"
}
},
{
"id": "washed",
"label": {
"ko": "워시드",
"en": "Washed",
"ja": "ウォッシュド"
},
"desc": {
"ko": "과육과 점액질을 씻어 낸 깨끗한 커피. 워시드·케냐 더블 워시드가 들어갑니다.",
"en": "Clean cups with fruit and mucilage washed off: washed and Kenyan double washed.",
"ja": "果肉とミュシレージを洗い流したきれいなコーヒー。ウォッシュドとケニア式ダブルウォッシュドが入ります。"
}
},
{
"id": "natural",
"label": {
"ko": "내추럴",
"en": "Natural",
"ja": "ナチュラル"
},
"desc": {
"ko": "체리를 통째로 말린 과일향 중심의 커피.",
"en": "Fruit-forward coffee dried as whole cherry.",
"ja": "チェリーを丸ごと乾かした果実感中心のコーヒー。"
}
},
{
"id": "honey",
"label": {
"ko": "허니",
"en": "Honey",
"ja": "ハニー"
},
"desc": {
"ko": "점액질을 남겨 단맛과 바디를 올린 커피. 화이트·옐로우·레드·블랙으로 나뉩니다.",
"en": "Mucilage left on for sweetness and body: white, yellow, red and black.",
"ja": "ミュシレージを残して甘さとボディを上げたコーヒー。ホワイト・イエロー・レッド・ブラックに分かれます。"
}
},
{
"id": "semi",
"label": {
"ko": "세미·웻헐",
"en": "Semi / Wet-hulled",
"ja": "セミ・ウェットハル"
},
"desc": {
"ko": "펄프드 내추럴·세미 워시드·웻 헐링·웻 폴리시드처럼 워시드와 내추럴 사이에 놓이는 방식.",
"en": "Methods between washed and natural: pulped natural, semi-washed, wet hulled and wet polished.",
"ja": "パルプドナチュラル・セミウォッシュド・ウェットハル・ウェットポリッシュなど、ウォッシュドとナチュラルの間の方法。"
}
},
{
"id": "anaerobic",
"label": {
"ko": "무산소·특수",
"en": "Anaerobic & Special",
"ja": "アナエロビック・特殊"
},
"desc": {
"ko": "밀폐 발효와 정밀 가공. 탄산침용(CM)·ASD·써멀쇼크·모스토·코지·이스트·락틱·아세틱·다크룸·EF2가 들어갑니다.",
"en": "Sealed fermentation and precision methods: CM, ASD, thermal shock, mosto, koji, yeast, lactic, acetic, dark room and EF2.",
"ja": "密閉発酵と精密精製。CM・ASD・サーマルショック・モスト・麹・酵母・乳酸・酢酸・ダークルーム・EF2が入ります。"
}
},
{
"id": "infused",
"label": {
"ko": "인퓨즈드·코퍼멘",
"en": "Infused & Co-fermented",
"ja": "インフュージョン・共発酵"
},
"desc": {
"ko": "커피 외 재료를 더한 커피. 공동발효와 인퓨즈드가 들어갑니다.",
"en": "Coffee with added ingredients: co-fermentation and infusion.",
"ja": "コーヒー以外の材料を加えたコーヒー。共発酵とインフュージョンが入ります。"
}
},
{
"id": "decaf",
"label": {
"ko": "디카페인",
"en": "Decaf",
"ja": "デカフェ"
},
"desc": {
"ko": "카페인을 뺀 커피. EA 슈가케인·스위스워터·CO2·마운틴워터가 들어갑니다.",
"en": "Caffeine removed: EA sugarcane, Swiss Water, CO2 and Mountain Water.",
"ja": "カフェインを抜いたコーヒー。EAサトウキビ・スイスウォーター・CO2・マウンテンウォーターが入ります。"
}
}
],
"order": [
"decaf-swiss-water",
"decaf-mountain-water",
"decaf-co2",
"decaf-ea",
"decaf",
"koji",
"lactic",
"acetic",
"ef2",
"mosto",
"thermal-shock",
"carbonic-maceration",
"asd",
"dark-room",
"double-anaerobic",
"yeast",
"co-fermentation",
"anaerobic-natural",
"anaerobic-washed",
"anaerobic-honey",
"infused",
"white-honey",
"yellow-honey",
"red-honey",
"black-honey",
"wet-hulled",
"wet-polished",
"kenya-double-washed",
"double-fermentation",
"pulped-natural",
"semi-washed",
"honey",
"natural",
"washed",
"anaerobic",
"experimental-other"
],
"processes": {
"decaf-swiss-water": {
"level": 2,
"group": "디카페인",
"chip": "decaf",
"label": {
"ko": "스위스워터 디카페인",
"en": "Swiss Water Decaf",
"ja": "スイスウォーターデカフェ"
},
"alias": {
"ko": [
"스위스워터",
"스위스 워터",
"SWP"
],
"en": [
"Swiss Water",
"SWP",
"Swiss Water Process"
],
"ja": [
"スイスウォーター",
"SWP"
]
},
"summary": {
"ko": "커피 성분을 포화시킨 물로 카페인만 빼내는, 용매를 쓰지 않는 방식입니다.",
"en": "Water saturated with coffee solids draws out only the caffeine — no solvent involved.",
"ja": "コーヒー成分を飽和させた水でカフェインだけを抜く、溶媒を使わない方法です。"
},
"how": {
"ko": "생두를 뜨거운 물에 담가 향 성분까지 녹여 낸 '그린커피익스트랙트'를 만들고, 카페인만 활성탄으로 걸러 냅니다. 그 액에 새 생두를 담그면 카페인만 빠져나옵니다.",
"en": "Beans steep in hot water to create a green coffee extract, which passes through activated carbon that traps caffeine. New beans soaked in that extract release mainly caffeine.",
"ja": "生豆をお湯に浸けて香り成分まで溶かした「グリーンコーヒーエキス」をつくり、カフェインだけを活性炭で除去します。その液に新しい生豆を浸すと、カフェインだけが抜けます。"
},
"cup": {
"ko": "원두의 산지 개성이 비교적 잘 남습니다. 산미가 둥글고 단맛이 앞서며, 잡내가 적습니다.",
"en": "Origin character survives comparatively well: rounder acidity, forward sweetness, few off-notes.",
"ja": "産地の個性が比較的よく残ります。酸味が丸く甘さが前に出て、雑味が少ないです。"
},
"roast": {
"ko": "밀도가 낮아 색이 빨리 오릅니다. 라이트미디엄에서 단맛을 확인하고 배전을 마칩니다.",
"en": "Low density brings colour fast; check sweetness at light-medium and finish there.",
"ja": "密度が低く色が早く上がります。ライトミディアムで甘さを確認して焙煎を終えます。"
},
"origins": {
"ko": "캐나다 브리티시컬럼비아 델타에서 처리합니다. 산지는 콜롬비아·페루·브라질이 많습니다.",
"en": "Processed in Delta, British Columbia, Canada; the beans often come from Colombia, Peru or Brazil.",
"ja": "カナダ・ブリティッシュコロンビア州デルタで処理します。産地はコロンビア・ペルー・ブラジルが多いです。"
},
"caution": {
"ko": "스위스워터는 회사 이름이자 상표입니다. 물을 썼다는 이유로 모든 물 디카페인을 스위스워터라고 부르면 안 되고, 마운틴워터는 별개 회사의 방식입니다.",
"en": "Swiss Water is a company and a trademark. Not every water decaf is Swiss Water, and Mountain Water is a different company's process.",
"ja": "スイスウォーターは会社名であり商標です。水を使ったからといってすべてをスイスウォーターと呼ぶべきではなく、マウンテンウォーターは別会社の方法です。"
}
},
"decaf-mountain-water": {
"level": 2,
"group": "디카페인",
"chip": "decaf",
"label": {
"ko": "마운틴워터 디카페인",
"en": "Mountain Water Decaf",
"ja": "マウンテンウォーターデカフェ"
},
"alias": {
"ko": [
"마운틴워터",
"마운틴 워터",
"MW",
"MWP"
],
"en": [
"Mountain Water",
"MWP",
"Mountain Water Process"
],
"ja": [
"マウンテンウォーター",
"MWP"
]
},
"summary": {
"ko": "멕시코 데스카멕스가 커피 성분을 포화시킨 물로 카페인을 빼는 방식입니다.",
"en": "Mexico's Descamex uses water saturated with coffee solids to remove caffeine.",
"ja": "メキシコのデスカメックスが、コーヒー成分を飽和させた水でカフェインを抜く方法です。"
},
"how": {
"ko": "생두를 증기로 준비한 뒤 커피 고형분이 녹아 있는 물에 담급니다. 카페인만 농도 차로 빠져나오고, 그 물은 탄소 필터를 거쳐 다시 쓰입니다.",
"en": "Steamed beans soak in water already holding dissolved coffee solids. Only caffeine diffuses out, and the liquid is carbon-filtered and reused.",
"ja": "蒸した生豆を、コーヒー固形分が溶けた水に浸します。カフェインだけが濃度差で抜け、その水は炭素フィルターを通して再利用します。"
},
"cup": {
"ko": "스위스워터와 비슷하게 원두 개성이 남고 단맛이 부드럽습니다. 두 방식을 나란히 마시면 미세한 차이만 납니다.",
"en": "Like Swiss Water, origin character stays and sweetness is soft; side by side the difference is subtle.",
"ja": "スイスウォーターと同様に産地の個性が残り、甘さはやわらかいです。並べて飲むとわずかな差だけです。"
},
"roast": {
"ko": "수분이 낮고 밀도가 고르지 않아 초반에 색이 빨리 오릅니다. 배전을 짧게 가져갑니다.",
"en": "Low moisture and uneven density bring colour early; keep the roast short.",
"ja": "水分が低く密度も不均一で色が早く上がります。焙煎は短めにします。"
},
"origins": {
"ko": "멕시코 베라크루스 코르도바에서 처리합니다. 산지는 멕시코·콜롬비아·과테말라·브라질이 많습니다.",
"en": "Processed in Córdoba, Veracruz, Mexico; beans often from Mexico, Colombia, Guatemala or Brazil.",
"ja": "メキシコ・ベラクルス州コルドバで処理します。産地はメキシコ・コロンビア・グアテマラ・ブラジルが多いです。"
},
"caution": {
"ko": "데스카멕스는 물 방식과 염화메틸렌 방식을 모두 운영합니다. 회사 이름만으로는 어느 쪽인지 알 수 없어, 라벨의 'Mountain Water' 표기를 확인해야 합니다.",
"en": "Descamex runs both a water process and a methylene chloride process, so the company name alone does not say which; look for 'Mountain Water' on the label.",
"ja": "デスカメックスは水方式と塩化メチレン方式の両方を行っています。会社名だけではどちらか分からないため、ラベルの「マウンテンウォーター」を確認する必要があります。"
}
},
"decaf-co2": {
"level": 2,
"group": "디카페인",
"chip": "decaf",
"label": {
"ko": "CO2 디카페인",
"en": "CO2 Decaf",
"ja": "CO2デカフェ"
},
"alias": {
"ko": [
"CO2",
"초임계 CO2",
"이산화탄소"
],
"en": [
"CO2",
"Supercritical CO2"
],
"ja": [
"CO2",
"超臨界CO2"
]
},
"summary": {
"ko": "고압의 이산화탄소가 카페인만 골라 녹여 내는 방식입니다.",
"en": "Pressurised carbon dioxide selectively dissolves and carries off the caffeine.",
"ja": "高圧の二酸化炭素がカフェインだけを選んで溶かし出す方法です。"
},
"how": {
"ko": "불린 생두를 고압 용기에 넣고 액체에 가까운 상태의 CO2를 통과시킵니다. CO2가 카페인을 녹여 내고, 분리 후에는 다시 회수해 씁니다.",
"en": "Moistened beans sit in a high-pressure vessel while CO2 in a liquid-like state passes through, dissolving the caffeine. The CO2 is recovered and reused.",
"ja": "湿らせた生豆を高圧容器に入れ、液体に近い状態のCO2を通します。CO2がカフェインを溶かし、分離後は回収して再利用します。"
},
"cup": {
"ko": "카페인 외 성분을 덜 건드려 원두의 향과 바디가 가장 잘 남는다고 평가됩니다. 다만 설비가 커 소량 로트에서는 보기 드뭅니다.",
"en": "It disturbs less beyond caffeine, so aroma and body are said to survive best; large equipment keeps it rare in small lots.",
"ja": "カフェイン以外の成分をあまり触らないため、香りとボディが最も残ると評価されます。設備が大きいため少量ロットではまれです。"
},
"roast": {
"ko": "일반 생두에 가까운 밀도를 보이지만 수분이 조금 낮습니다. 초반 열량을 소폭 줄여 출발합니다.",
"en": "Density is closer to regular green with slightly lower moisture; start with a touch less heat.",
"ja": "密度は通常の生豆に近いものの水分は少し低めです。序盤の熱量を少し減らして始めます。"
},
"origins": {
"ko": "유럽·북미의 대형 디카페인 공장에서 처리합니다. 산지는 콜롬비아·브라질·에티오피아가 많습니다.",
"en": "Handled at large decaffeination plants in Europe and North America; beans often from Colombia, Brazil or Ethiopia.",
"ja": "欧州・北米の大規模デカフェ工場で処理します。産地はコロンビア・ブラジル・エチオピアが多いです。"
},
"caution": {
"ko": "CO2도 '용매'입니다. 다만 독성이 낮고 회수율이 높아 잔류 우려가 적을 뿐, 향 성분이 전혀 빠지지 않는 것은 아닙니다.",
"en": "CO2 is a solvent too. It is low-toxicity and highly recoverable, but aroma compounds are not entirely untouched.",
"ja": "CO2も「溶媒」です。毒性が低く回収率が高いため残留の心配が少ないだけで、香り成分がまったく抜けないわけではありません。"
}
},
"decaf-ea": {
"level": 2,
"group": "디카페인",
"chip": "decaf",
"label": {
"ko": "EA 슈가케인 디카페인",
"en": "EA / Sugarcane Decaf",
"ja": "EA（サトウキビ）デカフェ"
},
"alias": {
"ko": [
"EA",
"EA 디카페인",
"슈가케인",
"에틸아세테이트"
],
"en": [
"EA",
"Ethyl Acetate",
"Sugarcane Decaf"
],
"ja": [
"EA",
"酢酸エチル",
"サトウキビデカフェ"
]
},
"summary": {
"ko": "사탕수수에서 만든 에틸아세테이트로 카페인을 분리하는, 스페셜티에서 가장 흔한 디카페인입니다.",
"en": "Ethyl acetate made from sugarcane pulls out the caffeine — the most common specialty decaf.",
"ja": "サトウキビ由来の酢酸エチルでカフェインを分離する、スペシャルティで最も一般的なデカフェです。"
},
"how": {
"ko": "생두를 증기로 불린 뒤 에틸아세테이트가 든 용액에 담가 카페인을 결합시켜 빼냅니다. 이후 씻고 다시 증기로 처리해 잔류 용매를 날립니다. 대개 산지에서 처리합니다.",
"en": "Steamed beans soak in an ethyl acetate solution that binds the caffeine, then are washed and steamed again to drive off residue. The work usually happens at origin.",
"ja": "蒸した生豆を酢酸エチル溶液に浸けてカフェインを結合させて取り除き、洗ってから再度蒸気で残留溶媒を飛ばします。多くは産地で処理します。"
},
"cup": {
"ko": "단맛과 바디가 잘 남습니다. 초콜릿·캐러멜 같은 둥근 맛이 살아 있어 에스프레소용으로도 무난합니다.",
"en": "Sweetness and body survive well: round chocolate and caramel notes make it a solid espresso decaf.",
"ja": "甘さとボディがよく残ります。チョコレートやキャラメルのような丸い味が生き、エスプレッソ用にも向きます。"
},
"roast": {
"ko": "일반 생두보다 색이 빨리 오르므로 배전을 5~10% 짧게 잡고, 컵을 보며 조정합니다.",
"en": "Colour rises faster than regular green, so shorten the roast by 5–10% and adjust by cup.",
"ja": "通常の生豆より色が早く上がるので、焙煎を5〜10%短くし、カップを見て調整します。"
},
"origins": {
"ko": "콜롬비아(산 아구스틴·후일라), 브라질, 과테말라, 페루. 'EA'·'슈가케인'·'Mountain Water'가 함께 적힌 라벨도 있습니다.",
"en": "Colombia (San Agustín, Huila), Brazil, Guatemala and Peru; some labels combine EA with Mountain Water.",
"ja": "コロンビア（サンアグスティン・ウイラ）、ブラジル、グアテマラ、ペルー。「EA」と「マウンテンウォーター」を併記するラベルもあります。"
},
"caution": {
"ko": "에틸아세테이트는 '천연' 유래지만 엄연한 용매입니다. '화학 물질 없음'이라는 표현은 마케팅으로 이해하는 편이 정확합니다.",
"en": "Ethyl acetate comes from a natural source but is still a solvent; 'chemical-free' is marketing, not chemistry.",
"ja": "酢酸エチルは天然由来ですが、れっきとした溶媒です。「化学物質なし」という表現はマーケティングと理解するのが正確です。"
}
},
"decaf": {
"level": 1,
"group": "디카페인",
"chip": "decaf",
"label": {
"ko": "디카페인",
"en": "Decaf",
"ja": "デカフェ"
},
"alias": {
"ko": [
"디카페인",
"탈카페인"
],
"en": [
"Decaf",
"Decaffeinated"
],
"ja": [
"デカフェ",
"カフェインレス"
]
},
"summary": {
"ko": "생두에서 카페인만 빼낸 커피로, 물·용매·이산화탄소 중 무엇을 쓰는지에 따라 맛이 갈립니다.",
"en": "Caffeine is removed from green coffee, and which medium does the work — water, solvent or CO2 — shapes the cup.",
"ja": "生豆からカフェインだけを抜いたコーヒーで、水・溶媒・二酸化炭素のどれを使うかで味が変わります。"
},
"how": {
"ko": "생두를 물이나 증기로 불려 카페인을 녹이기 쉬운 상태로 만든 뒤, 용매·물·초임계 CO2로 카페인을 분리합니다. 마지막에 씻고 말려 수분 10~12%로 맞춥니다.",
"en": "Green beans are moistened with water or steam so the caffeine becomes soluble, then caffeine is separated with a solvent, water or supercritical CO2. The beans are washed and dried back to 10–12% moisture.",
"ja": "生豆を水や蒸気で湿らせてカフェインを溶けやすくし、溶媒・水・超臨界CO2でカフェインを分離します。最後に洗って乾かし、水分10〜12%に整えます。"
},
"cup": {
"ko": "향의 일부가 빠져 산미가 둥글고 단맛이 도드라집니다. 원두 개성은 남지만 생기와 산미의 날은 조금 줄어듭니다.",
"en": "Some aroma is lost, so acidity rounds off and sweetness steps forward. Origin character remains, with less brightness and edge.",
"ja": "香りの一部が抜けるため酸味が丸くなり、甘さが前に出ます。産地の個性は残りますが、鮮度や酸味の鋭さは少し減ります。"
},
"roast": {
"ko": "처리 후 밀도가 낮아지고 수분이 고르지 않아 색이 빨리 오릅니다. 일반 생두보다 배전을 조금 짧게 가져갑니다.",
"en": "Density drops and moisture evens out poorly, so colour comes fast. Roast a little shorter than the same coffee would need regular.",
"ja": "処理後は密度が下がり水分も不均一で色が早く上がります。通常の生豆より焙煎を少し短くします。"
},
"origins": {
"ko": "콜롬비아·브라질·과테말라 디카페인이 흔합니다. 이 데이터에서 방식 없이 '디카페인'으로만 적힌 라벨은 10종, 방식을 밝힌 라벨은 96종입니다.",
"en": "Colombian, Brazilian and Guatemalan decafs are common. Here ten beans say only 'decaf', while 96 name the method.",
"ja": "コロンビア・ブラジル・グアテマラのデカフェが一般的です。このデータでは方法を書かず「デカフェ」だけの表記が10種、方法まで書いた表記が96種です。"
},
"caution": {
"ko": "'디카페인'은 방식이 아니라 결과입니다. EA·스위스워터·CO2·마운틴워터 중 무엇을 썼는지에 따라 잔류 향과 가격이 달라지므로, 라벨에 방식이 없으면 판매처에 확인하는 편이 좋습니다.",
"en": "'Decaf' is an outcome, not a method. EA, Swiss Water, CO2 and Mountain Water leave different aromas and costs, so ask the seller when the label is silent.",
"ja": "「デカフェ」は方法ではなく結果です。EA・スイスウォーター・CO2・マウンテンウォーターのどれを使ったかで残る香りと価格が変わるため、表記がなければ販売者に確認するのがよいです。"
}
},
"koji": {
"level": 2,
"group": "무산소·특수",
"chip": "anaerobic",
"label": {
"ko": "코지 발효",
"en": "Koji Fermentation",
"ja": "麹（コウジ）発酵"
},
"alias": {
"ko": [
"코지",
"코지 발효",
"누룩 발효"
],
"en": [
"Koji",
"Koji Fermentation"
],
"ja": [
"麹発酵",
"コウジ"
]
},
"summary": {
"ko": "누룩곰팡이(아스퍼질러스 오리재)를 체리에 번식시켜, 효소로 과육을 분해하는 방식입니다.",
"en": "The mould Aspergillus oryzae is grown on the cherries, and its enzymes break down the fruit.",
"ja": "麹カビ（Aspergillus oryzae）をチェリーに繁殖させ、酵素で果肉を分解する方法です。"
},
"how": {
"ko": "체리 1kg당 포자 1g을 고루 뿌리고 25~30℃에서 24~36시간 둡니다. 곰팡이가 흰 솜처럼 덮이면 바로 건조로 넘기며, 펙틴과 단백질을 분해해 아미노산과 감칠맛을 만듭니다.",
"en": "Spores are dusted at about 1 g per kg of cherry and held at 25–30°C for 24–36 hours. Once a white fuzz covers the fruit, it goes straight to drying; the enzymes break pectin and protein into amino acids and umami compounds.",
"ja": "チェリー1kgあたり胞子1gをまんべんなく振り、25〜30℃で24〜36時間置きます。白い綿状に覆われたらすぐ乾燥へ移し、ペクチンとタンパク質を分解してアミノ酸とうま味をつくります。"
},
"cup": {
"ko": "바디와 감칠맛이 올라가고 산미가 둥글어집니다. 열대과일·꿀 같은 향에 국물 같은 두께가 붙습니다.",
"en": "More body and umami, with rounder acidity: tropical fruit and honey aromas gain a savoury thickness.",
"ja": "ボディとうま味が増し、酸味が丸くなります。トロピカルフルーツやはちみつの香りに、だしのような厚みが加わります。"
},
"roast": {
"ko": "아미노산이 많아 마이야르 반응이 활발합니다. 중배전에서 감칠맛이 살아나고, 너무 밝으면 곰팡이 냄새가 남습니다.",
"en": "Rich in amino acids, so Maillard runs hard. Medium brings out the umami; too light leaves a mouldy edge.",
"ja": "アミノ酸が多くメイラード反応が活発です。中煎りでうま味が生き、浅すぎるとカビ臭が残ります。"
},
"origins": {
"ko": "콜롬비아 엘 베르헬, 에콰도르, 파나마. 2021년 크리스토퍼 페런이 공개한 프로토콜이 널리 퍼졌습니다.",
"en": "El Vergel in Colombia, Ecuador and Panama; the protocol published by Christopher Feran in 2021 spread widely.",
"ja": "コロンビアのエル・ベルヘル、エクアドル、パナマ。2021年にクリストファー・フェランが公開したプロトコルが広まりました。"
},
"caution": {
"ko": "코지는 발효라기보다 '전처리'에 가깝습니다. 곰팡이가 스스로 효소를 내어 과육을 분해하는 과정이라, 효모나 젖산균처럼 알코올·산을 만드는 발효와는 다릅니다.",
"en": "Koji is closer to a pre-treatment than a fermentation. The mould secretes enzymes and digests the fruit rather than producing alcohol or acid like yeast or lactic acid bacteria.",
"ja": "麹は発酵というより前処理に近いものです。カビが酵素を出して果肉を分解する過程で、酵母や乳酸菌のようにアルコールや酸をつくる発酵とは異なります。"
}
},
"lactic": {
"level": 2,
"group": "무산소·특수",
"chip": "anaerobic",
"label": {
"ko": "락틱 발효 (젖산)",
"en": "Lactic Fermentation",
"ja": "乳酸発酵"
},
"alias": {
"ko": [
"락틱",
"락틱 발효",
"젖산 발효"
],
"en": [
"Lactic",
"Lactic Fermentation"
],
"ja": [
"乳酸発酵",
"ラクティック"
]
},
"summary": {
"ko": "젖산균이 주도하도록 온도와 산소를 조절해, 부드럽고 크리미한 산을 만드는 발효입니다.",
"en": "Temperature and oxygen are managed so lactic acid bacteria dominate, producing a soft, creamy acidity.",
"ja": "温度と酸素を管理して乳酸菌を主導させ、やわらかくクリーミーな酸をつくる発酵です。"
},
"how": {
"ko": "탈피한 생두를 낮은 온도의 밀폐 탱크에 넣고, 젖산균이 자라기 좋은 조건에서 48~96시간 발효합니다. 배양균을 넣기도 하고 야생 젖산균을 기다리기도 합니다.",
"en": "Pulped coffee goes into a sealed tank at cool temperature and ferments 48–96 hours in conditions that favour lactic acid bacteria, either from a starter culture or the wild population.",
"ja": "パルピングした豆を低温の密閉タンクに入れ、乳酸菌が育ちやすい条件で48〜96時間発酵させます。培養菌を加える場合も、野生の乳酸菌を待つ場合もあります。"
},
"cup": {
"ko": "요구르트·버터 같은 부드러운 산미, 크리미한 바디, 복숭아·살구 단맛. 쓴맛이 줄어 마시기 편합니다.",
"en": "Yoghurt-and-butter softness, a creamy body, peach and apricot sweetness; bitterness drops away.",
"ja": "ヨーグルトやバターのようなやわらかな酸味、クリーミーなボディ、桃やあんずの甘さ。苦味が減って飲みやすいです。"
},
"roast": {
"ko": "산이 부드러워 중배전까지 안정적입니다. 다만 과발효된 로트는 배전 후반에 시큼한 냄새가 올라옵니다.",
"en": "Soft acidity holds to medium. Over-fermented lots, though, throw a sour note late in the roast.",
"ja": "酸がやわらかく中煎りまで安定します。ただし過発酵ロットは焙煎後半に酸っぱい臭いが上がります。"
},
"origins": {
"ko": "콜롬비아(라 팔마 이 엘 투칸), 코스타리카, 브라질. '락틱'을 자체 브랜드로 쓰는 농장도 있습니다.",
"en": "Colombia (La Palma & El Tucán), Costa Rica and Brazil; some farms use 'lactic' as a house label.",
"ja": "コロンビア（ラ・パルマ・イ・エル・トゥカン）、コスタリカ、ブラジル。「ラクティック」を自社名にする農園もあります。"
},
"caution": {
"ko": "젖산은 과하면 크리미함이 아니라 쿰쿰한 치즈 냄새가 됩니다. '락틱'이라는 라벨이 항상 깨끗한 컵을 뜻하지는 않습니다.",
"en": "Too much lactic acid turns creamy into a cheesy, rancid note. A lactic label does not guarantee a clean cup.",
"ja": "乳酸が多すぎるとクリーミーではなく、チーズのような臭いになります。「ラクティック」の表示がいつもきれいなカップを意味するわけではありません。"
}
},
"acetic": {
"level": 2,
"group": "무산소·특수",
"chip": "anaerobic",
"label": {
"ko": "아세틱 발효 (초산)",
"en": "Acetic Fermentation",
"ja": "酢酸発酵"
},
"alias": {
"ko": [
"아세틱",
"초산 발효"
],
"en": [
"Acetic",
"Acetic Fermentation"
],
"ja": [
"酢酸発酵",
"アセティック"
]
},
"summary": {
"ko": "초산균이 알코올을 식초로 바꾸는 발효로, 적으면 와인 같은 산미가 되고 많으면 결점이 됩니다.",
"en": "Acetic acid bacteria turn alcohol into vinegar: a little reads as winey acidity, too much is a defect.",
"ja": "酢酸菌がアルコールを酢に変える発酵で、少量ならワインのような酸味、多いと欠点になります。"
},
"how": {
"ko": "산소가 있는 환경이나 온도가 높은 탱크에서 초산균이 활발해집니다. 앞선 효모 발효에서 생긴 알코올을 초산으로 바꾸므로, 무산소 발효 뒤 공기에 노출될 때 특히 늘어납니다.",
"en": "Acetic acid bacteria thrive where oxygen and warmth are present. They convert the alcohol from yeast fermentation into acetic acid, so levels climb when an anaerobic lot meets air.",
"ja": "酸素があり温度が高いタンクで酢酸菌が活発になります。酵母発酵で生じたアルコールを酢酸に変えるため、アナエロビック発酵のあと空気に触れると特に増えます。"
},
"cup": {
"ko": "적으면 잘 익은 과일주 같은 산미와 복합미가 되지만, 많으면 식초·발효취로 컵을 덮습니다.",
"en": "At low levels it reads as ripe fruit wine and complexity; at high levels vinegar and ferment stench cover the cup.",
"ja": "少なければ熟した果実酒のような酸味と複雑さになりますが、多いと酢や発酵臭がカップを覆います。"
},
"roast": {
"ko": "초산이 많은 생두는 배전 중에도 시큼한 냄새가 사라지지 않습니다. 컵을 먼저 확인하고 배전을 결정하는 편이 좋습니다.",
"en": "Beans high in acetic acid keep a sour smell through roasting. Cup first, then decide the profile.",
"ja": "酢酸が多い生豆は焙煎中も酸っぱい臭いが消えません。先にカップを確認してから焙煎を決めるのがよいです。"
},
"origins": {
"ko": "특정 산지보다 공정에서 생깁니다. 내추럴 건조 중 뒤집기가 늦거나, 발효 탱크의 온도가 높을 때 늘어납니다.",
"en": "Not tied to an origin: it appears when natural lots are turned late or tanks run warm.",
"ja": "特定の産地ではなく工程で生まれます。ナチュラルの乾燥中に切り返しが遅れたり、発酵タンクの温度が高いと増えます。"
},
"caution": {
"ko": "라벨에 '아세틱'이라고 쓰는 경우는 드물고, 대개 '발효'·'와인' 같은 표현 뒤에 숨어 있습니다. 식초 냄새가 나면 결점으로 보는 것이 업계의 일반적인 기준입니다.",
"en": "Labels rarely say 'acetic'; it hides behind 'fermented' or 'winey'. A vinegar smell is generally treated as a defect.",
"ja": "ラベルに「酢酸」と書くことはまれで、ふつう「発酵」「ワイン」などの表現に隠れています。酢の臭いがすれば欠点と見るのが業界の一般的な基準です。"
}
},
"ef2": {
"level": 2,
"group": "무산소·특수",
"chip": "anaerobic",
"label": {
"ko": "EF2 (확장 발효 2)",
"en": "EF2 (Extended Fermentation 2)",
"ja": "EF2（拡張発酵2）"
},
"alias": {
"ko": [
"EF2",
"확장 발효",
"연장 발효"
],
"en": [
"EF2",
"Extended Fermentation"
],
"ja": [
"EF2",
"拡張発酵"
]
},
"summary": {
"ko": "호기 발효 24시간 뒤 저온 밀폐 발효 50시간을 이어 붙인, 커피넷(Cofinet)의 이름 붙은 방식입니다.",
"en": "Cofinet's named protocol: 24 hours of aerobic fermentation, then 50 hours sealed and cool.",
"ja": "コフィネット（Cofinet）が名付けた方式で、好気発酵24時間のあと低温密閉発酵50時間を行います。"
},
"how": {
"ko": "체리를 24시간 공기 중에 두었다가, 22℃ 아래를 유지한 그레인프로 백에 옮겨 50시간 밀폐 발효합니다. 이후 건조대에서 수분 11%까지 말립니다.",
"en": "Cherries rest in air for 24 hours, move into GrainPro bags held below 22°C for 50 hours of sealed fermentation, then dry on raised beds to 11% moisture.",
"ja": "チェリーを24時間空気中に置き、22℃以下に保ったグレインプロ袋へ移して50時間密閉発酵させます。その後、乾燥台で水分11%まで乾かします。"
},
"cup": {
"ko": "사탕수수 같은 단맛과 시럽 같은 바디, 열대과일 향이 선명합니다. 발효가 깊은데도 컵이 지저분해지지 않는 편입니다.",
"en": "Cane-sugar sweetness, a syrupy body and clear tropical fruit; deep fermentation without a muddy cup.",
"ja": "サトウキビのような甘さとシロップのようなボディ、鮮明なトロピカルフルーツ。発酵が深いのにカップが濁りにくいです。"
},
"roast": {
"ko": "잔당이 많아 중배전에서 단맛이 정점을 찍습니다. 라이트로 가면 산미가, 다크로 가면 발효향이 과해집니다.",
"en": "High sugar peaks at medium; lighter pushes acidity, darker pushes the ferment too far.",
"ja": "残糖が多く中煎りで甘さがピークになります。浅いと酸味、深いと発酵香が過剰になります。"
},
"origins": {
"ko": "콜롬비아 킨디오(자이로 아르실라, 세바스티안 고메스 등 커피넷 포트폴리오 농장). 이 데이터에서는 3종만 확인됩니다.",
"en": "Quindío in Colombia (Jairo Arcila, Sebastián Gómez and other Cofinet farms); only three beans carry it here.",
"ja": "コロンビアのキンディオ（ハイロ・アルシラ、セバスティアン・ゴメスなどコフィネットの農園）。このデータでは3種だけです。"
},
"caution": {
"ko": "EF2는 일반 명칭이 아니라 커피넷이 자기 농장 랏에 붙인 이름입니다. 다른 수입사의 '확장 발효'와 같은 공정이라고 단정할 수 없습니다.",
"en": "EF2 is Cofinet's house name for its own farm lots, not a generic method; it cannot be assumed identical to another importer's 'extended fermentation'.",
"ja": "EF2は一般名ではなく、コフィネットが自社農園のロットに付けた名称です。他社の「拡張発酵」と同じ工程と断定はできません。"
}
},
"mosto": {
"level": 2,
"group": "무산소·특수",
"chip": "anaerobic",
"label": {
"ko": "모스토 발효",
"en": "Mosto Fermentation",
"ja": "モスト発酵"
},
"alias": {
"ko": [
"모스토",
"모스토 발효",
"mossto"
],
"en": [
"Mosto",
"Mossto"
],
"ja": [
"モスト",
"モスト発酵"
]
},
"summary": {
"ko": "앞선 발효에서 흘러나온 체리 즙을 다음 배치의 발효 종균으로 쓰는 방식입니다.",
"en": "The juice drawn off one fermentation is used as the starter culture for the next batch.",
"ja": "前のロットの発酵で出たチェリージュースを、次のロットの発酵スターターとして使う方法です。"
},
"how": {
"ko": "밀폐 탱크에서 체리가 발효하며 흘린 즙(모스토)을 72시간쯤에 걷어 냅니다. 그 즙을 새 배치에 넣으면 효모와 젖산균이 미리 자리 잡아 발효가 빠르고 일정하게 진행됩니다.",
"en": "As cherries ferment in a sealed tank, the runoff juice — mosto — is collected, often around the 72-hour mark. Added to a new batch, it brings an established yeast and lactic acid bacteria population, so fermentation starts fast and runs evenly.",
"ja": "密閉タンクでチェリーが発酵するときに出るジュース（モスト）を、およそ72時間で集めます。新しいロットに加えると酵母と乳酸菌が先に定着し、発酵が速く安定して進みます。"
},
"cup": {
"ko": "워시드처럼 깨끗한 뼈대에 과일주 같은 층이 더해집니다. 잘 익은 복숭아·포도, 밝은 산미, 둥근 단맛.",
"en": "A clean, washed-like frame with a layer of fruit-cordial complexity: ripe peach and grape, bright acidity and round sweetness.",
"ja": "ウォッシュドのようにきれいな骨格に、果実酒のような層が加わります。熟した桃やぶどう、明るい酸味、丸い甘さです。"
},
"roast": {
"ko": "발효향이 깊어 배전이 지나면 시큼한 발효취가 앞섭니다. 라이트미디엄에서 향의 층을 확인합니다.",
"en": "The ferment is deep, so a long roast pushes a sour ferment note forward. Check the layers at light-medium.",
"ja": "発酵香が深く、焙煎が長いと酸っぱい発酵臭が前に出ます。ライトミディアムで香りの層を確認します。"
},
"origins": {
"ko": "콜롬비아 후일라(엘 미라도르·라스 플로레스), 코스타리카, 파나마. 최근 국내 라벨에도 자주 등장합니다.",
"en": "Huila in Colombia (El Mirador, Las Flores), Costa Rica and Panama; increasingly common on Korean labels.",
"ja": "コロンビアのウイラ（エル・ミラドール、ラス・フローレス）、コスタリカ、パナマ。最近は韓国のラベルにもよく出ます。"
},
"caution": {
"ko": "모스토는 향을 더하는 첨가물이 아니라 미생물과 출발점을 주는 '종균'입니다. 같은 모스토를 써도 온도와 시간이 다르면 전혀 다른 컵이 나옵니다.",
"en": "Mosto is not a flavouring but a starter — it supplies microbes and a head start. The same mosto at a different temperature or time gives a different cup.",
"ja": "モストは香りを足す添加物ではなく、微生物とスタート地点を与える「種菌」です。同じモストでも温度と時間が違えばまったく別のカップになります。"
}
},
"thermal-shock": {
"level": 2,
"group": "무산소·특수",
"chip": "anaerobic",
"label": {
"ko": "써멀 쇼크 (열충격)",
"en": "Thermal Shock",
"ja": "サーマルショック（熱衝撃）"
},
"alias": {
"ko": [
"써멀 쇼크",
"열충격",
"써멀 퍼먼테이션"
],
"en": [
"Thermal Shock",
"Thermal Fusion"
],
"ja": [
"サーマルショック",
"熱衝撃"
]
},
"summary": {
"ko": "발효가 끝난 커피를 뜨거운 물에 데운 뒤 찬물로 식혀, 향을 씨앗에 붙잡아 두는 마무리 단계입니다.",
"en": "A finishing step: heat the fermented coffee, then rinse it cold to lock aroma into the seed.",
"ja": "発酵後のコーヒーを温水で温め、冷水で急冷して香りを種に留める仕上げ工程です。"
},
"how": {
"ko": "보통 여러 단계 발효를 거친 뒤, 발효액째 40℃ 안팎으로 데우고 곧바로 10~12℃의 찬물로 씻습니다. 생산자는 열로 기공이 열려 향이 스며들고 냉수가 그것을 고정한다고 설명합니다.",
"en": "After a multi-stage fermentation, the coffee is heated in its juice to around 40°C and washed immediately with 10–12°C water. Producers say the heat opens the bean to aroma and the cold fixes it in place.",
"ja": "多段階の発酵のあと、発酵液ごと40℃ほどに温め、すぐに10〜12℃の冷水で洗います。熱で気孔が開いて香りが入り、冷水がそれを固定するという説明です。"
},
"cup": {
"ko": "장미·리치·열대과일 향이 매우 진하고 단맛이 두텁습니다. 가공 향이 강해 원두 개성이 가려지기도 합니다.",
"en": "Very intense rose, lychee and tropical fruit with thick sweetness; the process can overshadow the bean's own character.",
"ja": "バラやライチ、トロピカルフルーツの香りが非常に濃く、甘さも厚いです。加工香が強く、豆本来の個性が隠れることもあります。"
},
"roast": {
"ko": "향이 예민해 배전이 조금만 지나도 가공 향이 뭉갭니다. 라이트~라이트미디엄을 권합니다.",
"en": "The aroma is fragile; a slightly long roast smears the process notes. Light to light-medium is safest.",
"ja": "香りが繊細で、焙煎が少し長いだけで加工香がぼやけます。ライト〜ライトミディアムがおすすめです。"
},
"origins": {
"ko": "콜롬비아 카우카(윌튼 베니테스·디에고 베르무데스), 에콰도르, 파나마. 대회용 랏에 많습니다.",
"en": "Cauca in Colombia (Wilton Benítez, Diego Bermúdez), Ecuador and Panama; common in competition lots.",
"ja": "コロンビアのカウカ（ウィルトン・ベニテス、ディエゴ・ベルムデス）、エクアドル、パナマ。大会用ロットに多いです。"
},
"caution": {
"ko": "열충격은 표준 공정이 아니라 생산자별 프로토콜의 한 단계입니다. 40℃가 미생물을 죽이는 것도 아니고, '기공이 열린다'는 설명도 검증된 이론이 아닙니다. 라벨만으로 맛을 단정하지 않는 편이 좋습니다.",
"en": "Thermal shock is one step in producer-specific protocols, not a standard. 40°C does not sterilise anything, and the 'pores open' story is unproven. Do not judge the cup from the label alone.",
"ja": "サーマルショックは標準工程ではなく、生産者ごとのプロトコルの一工程です。40℃で微生物が死ぬわけでも、「気孔が開く」という説明も検証された理論ではありません。ラベルだけで味を決めないほうがよいです。"
}
},
"carbonic-maceration": {
"level": 2,
"group": "무산소·특수",
"chip": "anaerobic",
"label": {
"ko": "탄산침용 (CM)",
"en": "Carbonic Maceration (CM)",
"ja": "カーボニックマセレーション（CM）"
},
"alias": {
"ko": [
"탄산침용",
"CM",
"카보닉 매서레이션"
],
"en": [
"Carbonic Maceration",
"CM"
],
"ja": [
"カーボニックマセレーション",
"CM"
]
},
"summary": {
"ko": "밀폐 탱크에 이산화탄소를 채워 산소를 밀어내고, 낮은 온도에서 천천히 발효시키는 방식입니다.",
"en": "Sealed tanks are flushed with carbon dioxide to push out oxygen, then ferment slowly at low temperature.",
"ja": "密閉タンクに二酸化炭素を充填して酸素を追い出し、低い温度でゆっくり発酵させる方法です。"
},
"how": {
"ko": "체리나 탈피한 생두를 탱크에 넣고 CO2로 산소를 밀어낸 뒤, 온도를 낮게 관리하며 며칠 발효합니다. 와인 양조(보졸레 누보)에서 온 방법으로, 워시드·내추럴 어느 쪽에도 붙일 수 있는 한 단계입니다.",
"en": "Cherries or pulped coffee go into a tank, CO2 displaces the oxygen, and fermentation runs for several days with the temperature held low. Borrowed from Beaujolais winemaking, it is a step that can sit on top of washed or natural.",
"ja": "チェリーやパルピングした豆をタンクに入れ、CO2で酸素を追い出し、温度を低く管理しながら数日発酵させます。ボジョレーヌーヴォーの醸造から来た方法で、ウォッシュドにもナチュラルにも付けられる一工程です。"
},
"cup": {
"ko": "맑고 정돈된 과일향, 깨끗한 단맛, 부드러운 산미. 무산소 계열 중 균형이 좋아 마시기 편합니다.",
"en": "Clear, tidy fruit, clean sweetness and soft acidity — the most balanced of the anaerobic family.",
"ja": "澄んで整った果実香、きれいな甘さ、やわらかな酸味。アナエロビック系のなかでバランスがよく飲みやすいです。"
},
"roast": {
"ko": "무산소 계열보다 다루기 쉽습니다. 중배전까지도 향이 남지만, 배전이 길면 와인 같은 향이 산미와 분리됩니다.",
"en": "Easier than other anaerobic lots. Aroma survives into medium, though a long roast separates the winey note from the acidity.",
"ja": "他のアナエロビックより扱いやすいです。中煎りまで香りが残りますが、焙煎が長いとワインのような香りが酸味から分離します。"
},
"origins": {
"ko": "파나마(핀카 데보라·사베이지), 콜롬비아, 인도네시아, 베트남. 2015년 세계 바리스타 챔피언십 우승 커피로 널리 알려졌습니다.",
"en": "Panama (Finca Deborah, Savage), Colombia, Indonesia and Vietnam; it became famous through the 2015 World Barista Championship win.",
"ja": "パナマ（フィンカ・デボラ、サベージ）、コロンビア、インドネシア、ベトナム。2015年世界バリスタ選手権の優勝豆で広く知られました。"
},
"caution": {
"ko": "CO2를 채웠다고 해서 미생물이 죽는 것은 아닙니다. 온도·시간 관리가 느슨하면 탱크 전체가 과발효로 버려지기도 합니다.",
"en": "Filling the tank with CO2 does not kill microbes. Loose control of temperature or time can ruin a whole tank through over-fermentation.",
"ja": "CO2を充填しても微生物が死ぬわけではありません。温度や時間の管理が緩いと、タンク全体が過発酵で捨てられることもあります。"
}
},
"asd": {
"level": 2,
"group": "무산소·특수",
"chip": "anaerobic",
"label": {
"ko": "ASD (무산소 완속 건조)",
"en": "ASD (Anaerobic Slow Dry)",
"ja": "ASD（嫌気性スロードライ）"
},
"alias": {
"ko": [
"ASD",
"무산소 완속 건조",
"무산소 슬로우드라이"
],
"en": [
"ASD",
"Anaerobic Slow Dry",
"Slow Dry"
],
"ja": [
"ASD",
"嫌気性スロードライ"
]
},
"summary": {
"ko": "밀폐 발효를 길게 끌고, 그늘에서 몇 주에 걸쳐 아주 천천히 말리는 방식입니다.",
"en": "A long sealed fermentation followed by very slow drying in shade over several weeks.",
"ja": "密閉発酵を長く行い、日陰で数週間かけて非常にゆっくり乾かす方法です。"
},
"how": {
"ko": "체리를 과육째 밀폐 탱크에 넣어 4~10일 발효하고, 꺼내 아프리칸 베드에 두껍게 널어 그늘에서 3~5주 말립니다. 수분이 천천히 빠지면서 향이 응축됩니다.",
"en": "Whole cherries ferment sealed for four to ten days, then are spread thick on raised beds in shade for three to five weeks. Slow moisture loss concentrates the aroma.",
"ja": "チェリーを果肉ごと密閉タンクで4〜10日発酵させ、アフリカンベッドに厚めに広げて日陰で3〜5週間乾かします。ゆっくり水分が抜けて香りが凝縮します。"
},
"cup": {
"ko": "열대과일과 장미, 시럽 같은 단맛, 매우 긴 여운. 같은 무산소 내추럴보다 밀도가 높습니다.",
"en": "Tropical fruit, rose, syrupy sweetness and a very long finish; denser than a standard anaerobic natural.",
"ja": "トロピカルフルーツとバラ、シロップのような甘さ、非常に長い余韻。標準的なアナエロビックナチュラルより密度が高いです。"
},
"roast": {
"ko": "수분이 낮고 밀도가 고르지 않아 초반에 급히 오르기 쉽습니다. 라이트미디엄에서 향을 확인하고 안정화를 길게 둡니다.",
"en": "Low moisture and uneven density make it race early. Check aroma at light-medium and rest it longer.",
"ja": "水分が低く密度も不均一なので序盤に上がりやすいです。ライトミディアムで香りを確認し、安定化を長めに置きます。"
},
"origins": {
"ko": "에티오피아 구지·예가체프, 파나마 엘리다(라마스투스). 라마스투스는 120시간 발효와 5주 건조로 알려져 있습니다.",
"en": "Guji and Yirgacheffe in Ethiopia, and Elida (Lamastus) in Panama, known for 120 hours of fermentation and five weeks of drying.",
"ja": "エチオピアのグジ・イルガチェフェ、パナマのエリダ（ラマストゥス）。ラマストゥスは120時間発酵と5週間乾燥で知られます。"
},
"caution": {
"ko": "ASD는 단체 표준이 아니라 생산자·수입사가 쓰는 이름입니다. 발효 4~10일, 건조 3~5주처럼 로트마다 숫자가 달라, 이름보다 숫자를 함께 봐야 합니다.",
"en": "ASD is a producer and importer term, not a standard. Fermentation of four to ten days and drying of three to five weeks vary by lot, so read the numbers with the name.",
"ja": "ASDは団体の標準ではなく、生産者や輸入業者が使う名称です。発酵4〜10日、乾燥3〜5週間のようにロットごとに数字が違うため、名前より数字も一緒に見る必要があります。"
}
},
"dark-room": {
"level": 2,
"group": "무산소·특수",
"chip": "anaerobic",
"label": {
"ko": "다크룸 (암실 발효·건조)",
"en": "Dark Room (DRD)",
"ja": "ダークルーム（DRD）"
},
"alias": {
"ko": [
"다크룸",
"다크 룸",
"암실 건조",
"DRD"
],
"en": [
"Dark Room",
"DRD",
"Dark Room Dried"
],
"ja": [
"ダークルーム",
"暗室乾燥",
"DRD"
]
},
"summary": {
"ko": "빛을 차단한 방에서 온도와 습도를 맞춰 발효·건조하는 방식입니다.",
"en": "Fermentation and drying inside a light-blocked room with controlled temperature and humidity.",
"ja": "光を遮った部屋で温度と湿度を管理しながら発酵・乾燥させる方法です。"
},
"how": {
"ko": "발효는 밀폐 탱크나 전용 실에서 하고, 건조는 빛이 들지 않는 방에서 제습기와 팬으로 수분을 천천히 뺍니다. 파나마 엘리다의 DRD는 발효가 끝난 생두를 암실에서 6~8주 말리는 건조 방식입니다.",
"en": "Fermentation happens in sealed tanks or a dedicated room; drying happens in a dark room where dehumidifiers and fans pull moisture out slowly. Elida's DRD in Panama is a drying stage: six to eight weeks in the dark after fermentation.",
"ja": "発酵は密閉タンクや専用室で行い、乾燥は光の入らない部屋で除湿機とファンを使ってゆっくり水分を抜きます。パナマのエリダのDRDは、発酵後の豆を暗室で6〜8週間乾かす乾燥工程です。"
},
"cup": {
"ko": "향이 맑고 깨끗하게 남습니다. 과일향이 과하게 튀지 않고, 산미와 단맛이 정돈된 인상을 줍니다.",
"en": "Aromas stay clear and clean: fruit that does not shout, with acidity and sweetness held in order.",
"ja": "香りが澄んで残ります。果実香が過度に主張せず、酸味と甘さが整った印象です。"
},
"roast": {
"ko": "수분이 낮고 향이 섬세해 초반 열량을 낮게 잡습니다. 배전이 길면 깨끗함이 먼저 사라집니다.",
"en": "Low moisture and delicate aromas call for gentle early heat; a long roast loses the cleanliness first.",
"ja": "水分が低く香りが繊細なので、序盤の熱量を低めにします。焙煎が長いと、まずきれいさが失われます。"
},
"origins": {
"ko": "파나마 엘리다(DRD), 콜롬비아 후일라(엘 미라도르·노갈레스), 코스타리카. 대회 출품 랏에 많습니다.",
"en": "Elida in Panama (DRD), Huila in Colombia (El Mirador, Nogales) and Costa Rica; common in competition lots.",
"ja": "パナマのエリダ（DRD）、コロンビアのウイラ（エル・ミラドール、ノガレス）、コスタリカ。大会出品ロットに多いです。"
},
"caution": {
"ko": "DRD는 발효가 아니라 건조 방식이고, 다크룸 발효와는 단계가 다릅니다. '다크룸'이라는 라벨만으로 발효 방식까지 알 수는 없습니다.",
"en": "DRD is a drying method, not a fermentation, and sits at a different stage from dark-room fermentation. The label alone does not tell you how the coffee fermented.",
"ja": "DRDは発酵ではなく乾燥方法で、ダークルーム発酵とは段階が違います。「ダークルーム」の表示だけでは発酵方法までは分かりません。"
}
},
"double-anaerobic": {
"level": 2,
"group": "무산소·특수",
"chip": "anaerobic",
"label": {
"ko": "이중 무산소",
"en": "Double Anaerobic",
"ja": "ダブルアナエロビック"
},
"alias": {
"ko": [
"이중 무산소",
"더블 무산소",
"무산소 이중발효"
],
"en": [
"Double Anaerobic",
"Two-stage Anaerobic"
],
"ja": [
"ダブルアナエロビック",
"二段階嫌気発酵"
]
},
"summary": {
"ko": "밀폐 발효를 두 번, 보통 통체리로 한 번 그리고 탈피 후 한 번 더 하는 방식입니다.",
"en": "Two sealed fermentations: usually once as whole cherry, then again after pulping.",
"ja": "密閉発酵を二回、ふつうはチェリーのままで一度、パルピング後にもう一度行う方法です。"
},
"how": {
"ko": "체리를 밀폐 탱크에서 1차 발효한 뒤 탈피하고, 점액질이 붙은 생두를 다시 밀폐 탱크에서 2차 발효합니다. 이후 씻거나 그대로 말려 마무리합니다.",
"en": "Whole cherries ferment sealed first, then are depulped and fermented sealed a second time. The lot is washed or dried straight after, depending on the producer.",
"ja": "チェリーを密閉タンクで一次発酵させ、パルピング後、ミュシレージ付きの豆を再び密閉タンクで二次発酵します。その後は洗うか、そのまま乾かして仕上げます。"
},
"cup": {
"ko": "단일 무산소보다 향이 겹겹이 쌓입니다. 장미·리치·열대과일, 높은 단맛, 긴 여운.",
"en": "Aromas stack up compared with single-stage anaerobic: rose, lychee, tropical fruit, high sweetness and a long finish.",
"ja": "単段のアナエロビックより香りが幾重にも重なります。バラやライチ、トロピカルフルーツ、高い甘さ、長い余韻です。"
},
"roast": {
"ko": "발효가 깊어 향이 예민합니다. 라이트~라이트미디엄에서 멈추고, 배전 후 2~3주 안정화를 두는 편이 좋습니다.",
"en": "Deep fermentation makes the aroma fragile. Stop at light to light-medium and rest the beans for two to three weeks.",
"ja": "発酵が深く香りが繊細です。ライト〜ライトミディアムで止め、焙煎後2〜3週間の安定化を置くとよいです。"
},
"origins": {
"ko": "콜롬비아(엘 파라이소·그란하 파라이소 92), 파나마, 코스타리카. 대회 출품 랏에 많습니다.",
"en": "Colombia (El Paraíso, Granja Paraíso 92), Panama and Costa Rica; common in competition lots.",
"ja": "コロンビア（エル・パライソ、グランハ・パライソ92）、パナマ、コスタリカ。大会出品ロットに多いです。"
},
"caution": {
"ko": "1차·2차 시간과 온도는 생산자마다 다르고 표준이 없습니다. 같은 '이중 무산소'라도 36+20시간인지 52+48시간인지에 따라 맛이 크게 달라집니다.",
"en": "Stage times and temperatures vary by producer with no standard. One double anaerobic can be 36+20 hours, another 52+48, and the cup differs a lot.",
"ja": "一次・二次の時間と温度は生産者ごとに違い、標準はありません。同じ「ダブルアナエロビック」でも36+20時間か52+48時間かで味が大きく変わります。"
}
},
"yeast": {
"level": 2,
"group": "무산소·특수",
"chip": "anaerobic",
"label": {
"ko": "이스트 발효 (선택 효모)",
"en": "Inoculated Yeast Fermentation",
"ja": "酵母発酵（選択酵母）"
},
"alias": {
"ko": [
"이스트 발효",
"효모 발효",
"이스트 퍼먼테이션"
],
"en": [
"Yeast Fermentation",
"Inoculated Fermentation"
],
"ja": [
"酵母発酵",
"イースト発酵"
]
},
"summary": {
"ko": "골라낸 효모를 일정량 넣어, 야생 미생물 대신 원하는 균이 발효를 이끌게 하는 방식입니다.",
"en": "A selected yeast is dosed in so the chosen strain, not wild microbes, drives the fermentation.",
"ja": "選んだ酵母を一定量加え、野生の微生物ではなく目的の菌に発酵を主導させる方法です。"
},
"how": {
"ko": "건조 효모를 25~35℃ 물에 20분간 불린 뒤 커피 1kg당 1g 비율로 뿌립니다. 36~96시간 두면 효모가 야생 균을 밀어내며 점액질을 분해하고 향 성분을 만듭니다.",
"en": "Dried yeast is rehydrated in 25–35°C water for 20 minutes and sprayed at about 1 g per kg of coffee. Over 36–96 hours it outcompetes wild microbes, breaks down mucilage and builds aroma compounds.",
"ja": "乾燥酵母を25〜35℃の水で20分戻し、コーヒー1kgあたり1gの割合で散布します。36〜96時間で野生菌を圧倒しながらミュシレージを分解し、香り成分をつくります。"
},
"cup": {
"ko": "같은 산지라도 컵이 일정해집니다. 베리·열대과일 향이 또렷하고 단맛이 안정적이며, 잡내가 줄어듭니다.",
"en": "More consistency lot to lot: clear berry and tropical fruit, steady sweetness, fewer off-notes.",
"ja": "同じ産地でもカップが安定します。ベリーやトロピカルフルーツの香りがはっきりし、甘さが安定して雑味が減ります。"
},
"roast": {
"ko": "발효가 균일해 배전 편차가 작습니다. 다만 향이 단정한 만큼 개성은 산지·품종에서 나오므로 중배전 전후가 무난합니다.",
"en": "Even fermentation means a steady roast. The character comes from origin and variety, so medium is a safe landing.",
"ja": "発酵が均一で焙煎のばらつきが小さいです。個性は産地と品種から来るので、中煎り前後が無難です。"
},
"origins": {
"ko": "콜롬비아, 브라질, 과테말라, 베트남. 라르카페(LalCafé) 같은 상용 효모를 쓰는 농장이 늘고 있습니다.",
"en": "Colombia, Brazil, Guatemala and Vietnam; more farms now use commercial strains such as LalCafé.",
"ja": "コロンビア、ブラジル、グアテマラ、ベトナム。ラルカフェ（LalCafé）などの市販酵母を使う農園が増えています。"
},
"caution": {
"ko": "'이스트 발효'라고만 적혀도 상용 효모인지, 농장에서 배양한 토착 효모인지, 효모를 넣은 모스토인지 알 수 없습니다. 어느 쪽이든 발효 온도가 효모의 적정 범위를 벗어나면 잡내가 납니다.",
"en": "'Yeast fermented' does not say whether it was a commercial strain, a farm-cultured native yeast, or a yeast-fed mosto. Either way, fermentation outside the strain's temperature range produces off-flavours.",
"ja": "「酵母発酵」とだけ書かれても、市販酵母か、農園で培養した在来酵母か、酵母を加えたモストかは分かりません。いずれも発酵温度が適正範囲を外れると雑味が出ます。"
}
},
"co-fermentation": {
"level": 2,
"group": "인퓨즈드·코퍼멘",
"chip": "infused",
"label": {
"ko": "공동발효 (코퍼멘테이션)",
"en": "Co-fermentation",
"ja": "コーファーメンテーション"
},
"alias": {
"ko": [
"공동발효",
"공동 발효",
"코퍼멘테이션"
],
"en": [
"Co-fermentation",
"Coferment"
],
"ja": [
"コーファーメンテーション",
"共発酵"
]
},
"summary": {
"ko": "발효 중인 커피에 과일·향신료 같은 재료를 함께 넣어, 그 향이 배도록 하는 방식입니다.",
"en": "Fruit, spice or other ingredients are added to the fermenting coffee so its aroma carries into the bean.",
"ja": "発酵中のコーヒーに果物やスパイスなどを一緒に入れ、その香りを豆に移す方法です。"
},
"how": {
"ko": "탈피한 생두나 통체리를 탱크에 넣고, 과육·과즙·당밀·향신료를 함께 넣어 24~96시간 발효합니다. 재료가 미생물의 먹이가 되면서 발효가 더 깊어지고, 향 성분도 함께 스밉니다.",
"en": "Pulped coffee or whole cherries ferment in a tank with fruit, juice, molasses or spice for 24–96 hours. The addition feeds the microbes, deepening fermentation, while its aroma compounds travel into the bean.",
"ja": "パルピングした豆やチェリーをタンクに入れ、果肉・果汁・糖蜜・スパイスとともに24〜96時間発酵させます。添加物が微生物の餌になって発酵が深まり、香り成分も移ります。"
},
"cup": {
"ko": "넣은 재료가 그대로 느껴질 만큼 향이 선명합니다. 딸기·수박·리치·포도 같은 과일향이 진하고, 단맛이 높습니다.",
"en": "The added ingredient is unmistakable: strong strawberry, watermelon, lychee or grape, with high sweetness.",
"ja": "入れた材料がそのまま分かるほど香りが鮮明です。いちご・すいか・ライチ・ぶどうなどの果実香が濃く、甘さも高いです。"
},
"roast": {
"ko": "첨가 향이 예민해 배전이 지나면 잼이나 시럽처럼 뭉개집니다. 라이트미디엄에서 향의 선명도를 지키는 편이 좋습니다.",
"en": "Added aromas are fragile; a long roast turns them jammy or syrupy. Light-medium keeps them distinct.",
"ja": "添加香が繊細で、焙煎が長いとジャムやシロップのように潰れます。ライトミディアムで鮮明さを保つのがよいです。"
},
"origins": {
"ko": "콜롬비아 후일라(엘 미라도르·라스 플로레스), 코스타리카, 파나마. 국내 라벨에는 '수박 공동발효'처럼 재료가 붙습니다.",
"en": "Huila in Colombia (El Mirador, Las Flores), Costa Rica and Panama; Korean labels often name the fruit, as in 'watermelon co-ferment'.",
"ja": "コロンビアのウイラ（エル・ミラドール、ラス・フローレス）、コスタリカ、パナマ。韓国のラベルでは「すいか共発酵」のように材料名が付きます。"
},
"caution": {
"ko": "커피에 다른 재료가 들어간 커피입니다. 2023년 세계 바리스타 챔피언십은 '생두 단계 이전'에 첨가한 경우에만 허용하도록 규정을 바꿨고, 대회·경매에 따라 취급이 다릅니다.",
"en": "This is coffee with something else added. The World Barista Championship changed its rules in 2023 to allow it only when ingredients go in before the green coffee stage, and competitions and auctions treat it differently.",
"ja": "コーヒー以外の材料が入ったコーヒーです。2023年の世界バリスタ選手権は「生豆段階より前」に添加した場合のみ許可するよう規則を変え、大会やオークションで扱いが異なります。"
}
},
"anaerobic-natural": {
"level": 2,
"group": "무산소·특수",
"chip": "anaerobic",
"label": {
"ko": "무산소 내추럴",
"en": "Anaerobic Natural",
"ja": "アナエロビックナチュラル"
},
"alias": {
"ko": [
"무산소 내추럴",
"애너로빅 내추럴",
"무산소 건식"
],
"en": [
"Anaerobic Natural",
"Natural Anaerobic"
],
"ja": [
"アナエロビックナチュラル"
]
},
"summary": {
"ko": "체리를 통째로 밀폐 발효한 뒤, 과육째 말리는 방식입니다.",
"en": "Whole cherries ferment in a sealed tank first, then dry with the fruit still on.",
"ja": "チェリーを丸ごと密閉発酵させ、その後は果肉ごと乾かす方法です。"
},
"how": {
"ko": "잘 익은 체리를 밀폐 탱크에 넣어 48~96시간 발효하고, 꺼내서 내추럴처럼 2~3주 말립니다. 발효가 끝난 체리를 그대로 건조하는 것이 핵심입니다.",
"en": "Ripe cherries ferment sealed for 48–96 hours, then come out and dry like a natural for two to three weeks. Drying the fermented cherry whole is the defining step.",
"ja": "完熟チェリーを密閉タンクで48〜96時間発酵させ、取り出してナチュラルと同じように2〜3週間乾かします。発酵後のチェリーをそのまま乾かすのが要点です。"
},
"cup": {
"ko": "진한 베리·열대과일, 시럽 같은 단맛과 두터운 바디. 내추럴보다 발효향이 한층 진합니다.",
"en": "Dense berry and tropical fruit, syrupy sweetness and a heavy body; more fermented than a plain natural.",
"ja": "濃いベリーやトロピカルフルーツ、シロップのような甘さと厚いボディ。ナチュラルより発酵香が一段濃いです。"
},
"roast": {
"ko": "잔당이 많아 색이 빠르게 오릅니다. 라이트~라이트미디엄에서 과일향이 가장 선명하고, 지나면 발효향이 탄 향으로 바뀝니다.",
"en": "Lots of sugar makes colour rise fast. Light to light-medium keeps the fruit clearest; beyond that the ferment turns ashy.",
"ja": "糖が多く色が早く上がります。ライト〜ライトミディアムで果実感がいちばん鮮明で、それ以上だと発酵香が焦げた香りに変わります。"
},
"origins": {
"ko": "에티오피아 구지·시다모, 콜롬비아, 파나마. 에티오피아에서는 ASD와 함께 쓰이는 경우가 많습니다.",
"en": "Guji and Sidamo in Ethiopia, Colombia and Panama; in Ethiopia it often appears alongside ASD.",
"ja": "エチオピアのグジ・シダモ、コロンビア、パナマ。エチオピアではASDと併記されることが多いです。"
}
},
"anaerobic-washed": {
"level": 2,
"group": "무산소·특수",
"chip": "anaerobic",
"label": {
"ko": "무산소 워시드",
"en": "Anaerobic Washed",
"ja": "アナエロビックウォッシュド"
},
"alias": {
"ko": [
"무산소 워시드",
"애너로빅 워시드"
],
"en": [
"Anaerobic Washed"
],
"ja": [
"アナエロビックウォッシュド"
]
},
"summary": {
"ko": "탈피한 생두를 밀폐 탱크에서 발효한 뒤 씻어 말리는, 깨끗한 무산소 방식입니다.",
"en": "Pulped coffee ferments in a sealed tank, then is washed and dried — the clean side of anaerobic.",
"ja": "パルピングした豆を密閉タンクで発酵させ、洗って乾かす、きれいなアナエロビックです。"
},
"how": {
"ko": "탈피 후 점액질이 붙은 상태로 밀폐 탱크에 넣어 24~72시간 발효하고, 물로 씻어 점액질을 제거한 뒤 건조합니다. 발효 중 산소가 차단돼 잡균 번식이 줄어듭니다.",
"en": "Depulped coffee with mucilage ferments sealed for 24–72 hours, is washed clean, then dried. Cutting off oxygen limits spoilage organisms during the ferment.",
"ja": "パルピング後、ミュシレージ付きのまま密閉タンクで24〜72時間発酵させ、洗ってミュシレージを除き、乾燥します。酸素を遮断することで雑菌の繁殖が抑えられます。"
},
"cup": {
"ko": "워시드의 깨끗함에 발효향이 더해집니다. 시트러스·열대과일, 선명한 산미, 중간 바디.",
"en": "Washed clarity plus fermentation: citrus and tropical fruit, bright acidity, a medium body.",
"ja": "ウォッシュドのきれいさに発酵香が加わります。シトラスやトロピカルフルーツ、鮮明な酸味、中程度のボディです。"
},
"roast": {
"ko": "무산소 내추럴보다 밀도가 고르지만 잔당은 많습니다. 중간 배전에서 산미와 단맛의 균형이 좋습니다.",
"en": "More even density than anaerobic natural but still sugary. Medium roast balances acidity and sweetness.",
"ja": "アナエロビックナチュラルより密度は均一ですが残糖は多いです。中煎りで酸味と甘さのバランスが取れます。"
},
"origins": {
"ko": "콜롬비아 카우카·후일라, 에티오피아, 케냐. '워시드 발효'·'무산소 워시드'로 표기됩니다.",
"en": "Cauca and Huila in Colombia, Ethiopia and Kenya; labelled as anaerobic washed or fermented washed.",
"ja": "コロンビアのカウカ・ウイラ、エチオピア、ケニア。「アナエロビックウォッシュド」「発酵ウォッシュド」と表記されます。"
}
},
"anaerobic-honey": {
"level": 2,
"group": "무산소·특수",
"chip": "anaerobic",
"label": {
"ko": "무산소 허니",
"en": "Anaerobic Honey",
"ja": "アナエロビックハニー"
},
"alias": {
"ko": [
"무산소 허니",
"애너로빅 허니",
"무산소 레드 허니"
],
"en": [
"Anaerobic Honey"
],
"ja": [
"アナエロビックハニー"
]
},
"summary": {
"ko": "과육만 벗긴 생두를 밀폐 발효한 뒤, 점액질을 남긴 채 말리는 방식입니다.",
"en": "Depulped coffee ferments sealed, then dries with the mucilage still on.",
"ja": "果肉だけを除いた豆を密閉発酵させ、ミュシレージを残したまま乾かす方法です。"
},
"how": {
"ko": "탈피 후 점액질을 남긴 생두를 탱크에 넣어 24~72시간 발효하고, 씻지 않은 채 허니 단계로 건조합니다. 남기는 점액질 양에 따라 색이 갈립니다.",
"en": "After pulping, the mucilage-covered beans ferment in a tank for 24–72 hours and then dry as a honey, unwashed. How much mucilage remains sets the colour grade.",
"ja": "パルピング後、ミュシレージ付きの豆をタンクで24〜72時間発酵させ、洗わずにハニーとして乾かします。残す量で色の段階が決まります。"
},
"cup": {
"ko": "꿀 같은 단맛에 발효향이 겹칩니다. 붉은 과일·카라멜, 부드러운 산미, 중후한 바디.",
"en": "Honeyed sweetness layered with fermentation: red fruit, caramel, soft acidity, a fuller body.",
"ja": "はちみつの甘さに発酵香が重なります。赤い果実やキャラメル、やわらかな酸味、厚めのボディです。"
},
"roast": {
"ko": "점액질과 잔당이 모두 많아 초반에 타기 쉽습니다. 화력을 낮게 잡고 배전을 천천히 끕니다.",
"en": "Mucilage and sugar both run high, so it scorches easily. Keep the heat low and roast slowly.",
"ja": "ミュシレージも残糖も多いので序盤に焦げやすいです。火力を低めにしてゆっくり焙煎します。"
},
"origins": {
"ko": "코스타리카 라스 라하스(블랙 다이아몬드·알마 네그라), 콜롬비아, 파나마.",
"en": "Las Lajas in Costa Rica (Black Diamond, Alma Negra), Colombia and Panama.",
"ja": "コスタリカのラス・ラハス（ブラックダイヤモンド、アルマ・ネグラ）、コロンビア、パナマ。"
}
},
"infused": {
"level": 2,
"group": "인퓨즈드·코퍼멘",
"chip": "infused",
"label": {
"ko": "인퓨즈드",
"en": "Infused",
"ja": "インフュージョン"
},
"alias": {
"ko": [
"인퓨즈드",
"인퓨전",
"침용",
"향 첨가"
],
"en": [
"Infused",
"Infusion"
],
"ja": [
"インフュージョン",
"インフューズド"
]
},
"summary": {
"ko": "발효가 끝난 생두에 향을 입히는 방식으로, 공동발효와는 단계가 다릅니다.",
"en": "Aroma is applied to coffee after processing — a different stage from co-fermentation.",
"ja": "発酵が終わった生豆に香りを付ける方法で、共発酵とは段階が違います。"
},
"how": {
"ko": "건조·탈곡이 끝난 생두나 로스팅한 원두에 향 성분을 스며들게 합니다. 생두 단계에서 하면 '인퓨즈드', 로스팅 후에 하면 통상 '향 첨가(flavoured)'로 부릅니다.",
"en": "Aroma compounds are introduced into dried green beans or roasted coffee. Applied to green coffee it is usually called infused; applied after roasting it is normally called flavoured.",
"ja": "乾燥・脱殻後の生豆、または焙煎後の豆に香り成分を含ませます。生豆段階なら「インフュージョン」、焙煎後なら通常「フレーバード」と呼びます。"
},
"cup": {
"ko": "향이 코 앞에서 또렷하게 잡히고, 커피 본연의 산미·바디는 상대적으로 뒤로 물러납니다.",
"en": "The aroma hits immediately while the coffee's own acidity and body sit further back.",
"ja": "香りが鼻先ではっきり立ち、コーヒー本来の酸味やボディは相対的に後退します。"
},
"roast": {
"ko": "첨가 향은 열에 약합니다. 배전이 길면 향이 사라지고 탄 향만 남으므로 밝게 짧게 가져갑니다.",
"en": "Added aromas are heat-sensitive; a long roast strips them and leaves only roast notes, so keep it short and light.",
"ja": "添加香は熱に弱いです。焙煎が長いと香りが消えて焙煎臭だけが残るため、浅く短く仕上げます。"
},
"origins": {
"ko": "특정 산지보다 판매처·브랜드에 따라 붙습니다. 국내에서는 과일 향 인퓨즈드 생두가 소량 유통됩니다.",
"en": "Less about origin than the seller or brand; Korean listings carry a small amount of fruit-infused green coffee.",
"ja": "産地よりも販売者やブランドによります。韓国では果実香のインフューズド生豆が少量流通しています。"
},
"caution": {
"ko": "인퓨즈드와 공동발효는 업계에서도 정의가 통일되지 않았습니다. 원두를 고를 때는 '무엇을 언제 넣었는지'를 판매처 설명에서 확인하는 것이 가장 확실합니다.",
"en": "Even the industry has no agreed definition of infused versus co-fermented. The surest check is the seller's note on what was added and when.",
"ja": "インフュージョンと共発酵の定義は業界でも統一されていません。豆を選ぶときは「何をいつ加えたか」を販売者の説明で確認するのが確実です。"
}
},
"white-honey": {
"level": 2,
"group": "허니 세부",
"chip": "honey",
"label": {
"ko": "화이트 허니",
"en": "White Honey",
"ja": "ホワイトハニー"
},
"alias": {
"ko": [
"화이트 허니"
],
"en": [
"White Honey"
],
"ja": [
"ホワイトハニー"
]
},
"summary": {
"ko": "점액질을 거의 남기지 않아 워시드에 가장 가까운 허니입니다.",
"en": "The honey grade closest to washed, with almost all mucilage removed.",
"ja": "ミュシレージをほとんど残さず、ウォッシュドにいちばん近いハニーです。"
},
"how": {
"ko": "탈피 직후 점액질을 10% 안팎만 남기고 햇볕에서 빠르게 말립니다. 건조가 짧아 결점 위험이 낮은 대신 개성도 절제됩니다.",
"en": "Only about 10% of the mucilage is left after pulping, and the coffee dries fast in full sun. Short drying lowers risk but also restraint in character.",
"ja": "パルピング直後にミュシレージを1割ほどだけ残し、日なたで速く乾かします。乾燥が短いぶんリスクは低いものの、個性も控えめです。"
},
"cup": {
"ko": "깨끗하고 산뜻합니다. 시트러스와 가벼운 꿀 단맛, 워시드에 가까운 투명한 산미.",
"en": "Clean and fresh: citrus, light honey sweetness and a transparent, washed-like acidity.",
"ja": "きれいで爽やか。シトラスと軽いはちみつの甘さ、ウォッシュドに近い透明な酸味です。"
},
"roast": {
"ko": "수분이 비교적 고르므로 워시드에 준하는 프로파일로 시작하고, 단맛이 부족하면 후반을 조금 늘립니다.",
"en": "Fairly even moisture, so start from a washed-style profile and stretch the finish slightly if sweetness feels thin.",
"ja": "水分が比較的均一なのでウォッシュドに近いプロファイルから始め、甘さが薄ければ後半を少し伸ばします。"
},
"origins": {
"ko": "코스타리카, 과테말라, 엘살바도르의 마이크로밀. 브라질에서는 화이트 허니를 따로 표기하는 경우가 드뭅니다.",
"en": "Micro-mills in Costa Rica, Guatemala and El Salvador; Brazil rarely labels white honey separately.",
"ja": "コスタリカ、グアテマラ、エルサルバドルのマイクロミル。ブラジルではホワイトハニーを別表記することはまれです。"
}
},
"yellow-honey": {
"level": 2,
"group": "허니 세부",
"chip": "honey",
"label": {
"ko": "옐로우 허니",
"en": "Yellow Honey",
"ja": "イエローハニー"
},
"alias": {
"ko": [
"옐로우 허니",
"옐로 허니",
"골드 허니"
],
"en": [
"Yellow Honey",
"Gold Honey"
],
"ja": [
"イエローハニー",
"ゴールドハニー"
]
},
"summary": {
"ko": "점액질을 25% 안팎 남겨, 산미와 단맛이 균형을 이루는 가장 흔한 허니입니다.",
"en": "About 25% mucilage left — the most common honey grade, balanced between acidity and sweetness.",
"ja": "ミュシレージを25%ほど残し、酸味と甘さのバランスがとれた最も一般的なハニーです。"
},
"how": {
"ko": "점액질을 4분의 1 정도 남기고 햇볕에서 말립니다. 브라질의 펄프드 내추럴과 비슷한 결과가 나오는 경우가 많습니다.",
"en": "Roughly a quarter of the mucilage stays on and the coffee dries in the sun. The result often resembles Brazil's pulped natural.",
"ja": "ミュシレージを4分の1ほど残して天日で乾かします。ブラジルのパルプドナチュラルに近い結果になることが多いです。"
},
"cup": {
"ko": "가볍고 산뜻한 단맛, 부드러운 산미. 밸런스가 좋아 입문용으로 권하기 쉽습니다.",
"en": "Light, fresh sweetness with soft acidity; an easy, balanced cup to recommend to newcomers.",
"ja": "軽く爽やかな甘さとやわらかな酸味。バランスがよく、入門者にも勧めやすいです。"
},
"roast": {
"ko": "중배전까지 단맛이 잘 살아납니다. 초반 열량을 조금 낮춰 점액질이 타지 않게 합니다.",
"en": "Sweetness holds into medium roast. Ease off the early heat so the mucilage does not scorch.",
"ja": "中煎りまで甘さがよく残ります。序盤の熱量を少し下げ、ミュシレージを焦がさないようにします。"
},
"origins": {
"ko": "브라질, 코스타리카, 콜롬비아. 브라질은 이 단계를 '펄프드 내추럴'로 부르는 쪽이 많습니다.",
"en": "Brazil, Costa Rica and Colombia; Brazil more often calls this grade pulped natural.",
"ja": "ブラジル、コスタリカ、コロンビア。ブラジルではこの段階を「パルプドナチュラル」と呼ぶことが多いです。"
}
},
"red-honey": {
"level": 2,
"group": "허니 세부",
"chip": "honey",
"label": {
"ko": "레드 허니",
"en": "Red Honey",
"ja": "レッドハニー"
},
"alias": {
"ko": [
"레드 허니"
],
"en": [
"Red Honey"
],
"ja": [
"レッドハニー"
]
},
"summary": {
"ko": "점액질을 절반쯤 남기고 그늘에서 천천히 말려, 단맛과 산미가 함께 올라오는 단계입니다.",
"en": "Half the mucilage stays on and drying slows under shade, lifting both sweetness and acidity.",
"ja": "ミュシレージを半分ほど残し、日陰でゆっくり乾かして甘さと酸味をともに引き上げる段階です。"
},
"how": {
"ko": "점액질을 50% 정도 남기고 차광 아래에서 12~15일가량 말립니다. 건조가 느린 만큼 뒤집기와 환기 관리가 중요합니다.",
"en": "About 50% mucilage remains and the coffee dries under shade for roughly 12–15 days. Slow drying makes turning and airflow critical.",
"ja": "ミュシレージを50%ほど残し、遮光下で12〜15日ほど乾かします。乾燥が遅いぶん、切り返しと換気の管理が重要です。"
},
"cup": {
"ko": "캐러멜과 붉은 과일, 중간 바디. 산미는 살아 있되 날카롭지 않고, 단맛이 길게 남습니다.",
"en": "Caramel and red fruit with a medium body; acidity stays lively without sharpness and the sweetness lingers.",
"ja": "キャラメルと赤い果実、中程度のボディ。酸味は生きているのに鋭くなく、甘さが長く残ります。"
},
"roast": {
"ko": "라이트미디엄에서 균형이 좋습니다. 배전이 지나면 캐러멜이 초콜릿으로 바뀌며 과일향이 줄어듭니다.",
"en": "Light-medium suits it. Past that, caramel turns to chocolate and the fruit recedes.",
"ja": "ライトミディアムでバランスが取れます。それ以上だとキャラメルがチョコレートに変わり、果実感が減ります。"
},
"origins": {
"ko": "코스타리카 라스 라하스, 과테말라, 엘살바도르. 라스 라하스는 '블랙 다이아몬드' 같은 자체 이름을 쓰기도 합니다.",
"en": "Las Lajas in Costa Rica, Guatemala and El Salvador; Las Lajas also sells under house names such as Black Diamond.",
"ja": "コスタリカのラス・ラハス、グアテマラ、エルサルバドル。ラス・ラハスは「ブラックダイヤモンド」などの独自名も使います。"
}
},
"black-honey": {
"level": 2,
"group": "허니 세부",
"chip": "honey",
"label": {
"ko": "블랙 허니",
"en": "Black Honey",
"ja": "ブラックハニー"
},
"alias": {
"ko": [
"블랙 허니",
"블랙허니",
"라이트 허니"
],
"en": [
"Black Honey",
"Light Honey"
],
"ja": [
"ブラックハニー"
]
},
"summary": {
"ko": "점액질을 거의 다 남긴 채 가장 느리게 말려, 내추럴에 가까운 진한 단맛을 내는 단계입니다.",
"en": "Almost all the mucilage stays on and drying is slowest, giving a deep sweetness close to natural.",
"ja": "ミュシレージをほぼ全部残して最もゆっくり乾かし、ナチュラルに近い濃い甘さを出す段階です。"
},
"how": {
"ko": "점액질을 75~100% 남기고 차광 아래에서 2~4주 말립니다. 당이 많은 만큼 곰팡이와 과발효 위험이 가장 큽니다.",
"en": "With 75–100% of the mucilage left, the coffee dries in shade for two to four weeks. All that sugar makes mould and over-fermentation the biggest risks.",
"ja": "ミュシレージを75〜100%残し、遮光下で2〜4週間乾かします。糖が多いぶん、カビと過発酵のリスクが最も大きいです。"
},
"cup": {
"ko": "진한 꿀·시럽 단맛과 무거운 바디, 붉은 과일과 초콜릿. 내추럴과 구분이 어려울 만큼 과일향이 앞섭니다.",
"en": "Thick honey-syrup sweetness, a heavy body, red fruit and chocolate — fruity enough to be mistaken for a natural.",
"ja": "濃いはちみつ・シロップの甘さと重いボディ、赤い果実とチョコレート。ナチュラルと見間違えるほど果実感が前に出ます。"
},
"roast": {
"ko": "잔당이 많아 초반에 겉이 타기 쉽습니다. 화력을 낮게 시작해 배전을 천천히 끌고 갑니다.",
"en": "Lots of residual sugar scorches the surface early. Start low and draw the roast out slowly.",
"ja": "残糖が多く序盤に表面が焦げやすいです。火力を低めに始め、焙煎をゆっくり進めます。"
},
"origins": {
"ko": "코스타리카, 파나마, 콜롬비아. 라스 라하스의 '블랙 다이아몬드'는 대개 이 단계나 무산소 허니로 나옵니다.",
"en": "Costa Rica, Panama and Colombia; Las Lajas' Black Diamond is usually this grade or an anaerobic honey.",
"ja": "コスタリカ、パナマ、コロンビア。ラス・ラハスの「ブラックダイヤモンド」はふつうこの段階かアナエロビックハニーです。"
},
"caution": {
"ko": "이 데이터에는 '라이트 허니'가 블랙 허니로 표기돼 있습니다. 판매처에 따라 라이트 허니를 화이트·옐로우 사이로 쓰기도 하므로, 라이트 허니 라벨은 점액질 양을 따로 확인하는 편이 좋습니다.",
"en": "This dataset files 'Light Honey' under black honey. Some sellers use light honey between white and yellow, so check the mucilage level behind that label.",
"ja": "このデータでは「ライトハニー」をブラックハニーに分類しています。販売者によってはホワイトとイエローの間に置くため、ラベルだけで判断せず残存率を確認するのがよいです。"
}
},
"wet-hulled": {
"level": 2,
"group": "세미·웻헐",
"chip": "semi",
"label": {
"ko": "웻 헐링 (길링 바사)",
"en": "Wet Hulled (Giling Basah)",
"ja": "ウェットハル（ギリン・バサ）"
},
"alias": {
"ko": [
"웻 헐드",
"웻헐",
"길링 바사",
"하이브리드 웻 헐"
],
"en": [
"Wet Hulled",
"Giling Basah",
"Wet-hulling"
],
"ja": [
"ウェットハル",
"ギリン・バサ",
"スマトラ式"
]
},
"summary": {
"ko": "속껍질을 벗기기 전에 생두를 반쯤만 말려, 젖은 상태에서 껍질을 벗기는 인도네시아 방식입니다.",
"en": "Indonesia's method: dry the parchment only partway, then hull it while the bean is still wet.",
"ja": "パーチメントを半分ほど乾かしたところで、まだ湿ったまま脱殻するインドネシアの方法です。"
},
"how": {
"ko": "탈피·짧은 발효·세척을 거친 뒤 1~2일만 말려 수분 20~40%일 때 껍질을 벗깁니다. 문헌마다 20~24%와 35~50%로 기록이 갈리지만, 속껍질이 마르기 전에 벗긴다는 점은 같습니다. 껍질이 없는 생두를 다시 12%까지 말리기 때문에 빛이 짙은 청록색을 띱니다.",
"en": "After pulping, a short fermentation and a wash, the parchment dries for only a day or two. It is hulled at roughly 20–40% moisture, and the naked bean dries down to 12%, which leaves it dark bluish-green.",
"ja": "パルピングと短い発酵、洗浄のあと1〜2日だけ乾かし、水分20〜40%で脱殻します。パーチメントのない生豆を12%まで再乾燥するため、濃い青緑色になります。"
},
"cup": {
"ko": "낮은 산미와 무거운 바디, 나무·흙·허브·담배 같은 향. 인도네시아 특유의 묵직하고 짭짤한 인상입니다.",
"en": "Low acidity, a heavy body, and woody, earthy, herbal or tobacco notes — the weighty, savoury Indonesian signature.",
"ja": "低い酸味と重いボディ、木や土、ハーブ、たばこのような香り。インドネシア特有の重く塩気のある印象です。"
},
"roast": {
"ko": "밀도가 낮고 수분이 고르지 않아 초반에 급격히 타기 쉽습니다. 중배전 이상에서 흙 향이 정돈됩니다.",
"en": "Low density and uneven moisture scorch easily early; medium or darker settles the earthy notes.",
"ja": "密度が低く水分も不均一なので序盤に焦げやすいです。中煎り以上で土の香りが整います。"
},
"origins": {
"ko": "인도네시아 수마트라(만델링·아체), 술라웨시, 발리. 최근에는 베트남과 인도 일부에서도 이 표기를 씁니다.",
"en": "Sumatra (Mandheling, Aceh), Sulawesi and Bali in Indonesia; lately also parts of Vietnam and India.",
"ja": "インドネシアのスマトラ（マンデリン・アチェ）、スラウェシ、バリ。最近はベトナムやインドの一部でも使われます。"
}
},
"wet-polished": {
"level": 2,
"group": "세미·웻헐",
"chip": "semi",
"label": {
"ko": "웻 폴리시드",
"en": "Wet Polished",
"ja": "ウェットポリッシュ"
},
"alias": {
"ko": [
"웻 폴리시드",
"웻 폴리싱",
"애프터 폴리시드",
"하이브리드 워터 폴리시드"
],
"en": [
"Wet Polished",
"Water Polished",
"After Polished"
],
"ja": [
"ウェットポリッシュ",
"ウォーターポリッシュ"
]
},
"summary": {
"ko": "건조한 생두에 물을 살짝 뿌려 남은 실크스킨을 문질러 떼는 마무리 공정입니다.",
"en": "A finishing step that mists already-dry green beans and rubs off the remaining silverskin.",
"ja": "乾いた生豆に少し水を吹きかけ、残ったシルバースキンをこすって落とす仕上げ工程です。"
},
"how": {
"ko": "탈곡·선별이 끝난 생두에 물이나 증기를 조금 가해 실크스킨을 불린 뒤, 회전통 안에서 서로 마찰시켜 떼어 냅니다. 다시 수분 12% 이하로 말려 마무리합니다.",
"en": "Hulled, graded beans meet a fine mist or steam so the silverskin loosens, then rub against each other in a rotating drum. The lot is dried back to 12% or below.",
"ja": "脱殻・選別が終わった生豆に霧か蒸気を当ててシルバースキンを緩め、回転ドラムの中で豆同士をこすって落とします。水分12%以下まで再乾燥して仕上げます。"
},
"cup": {
"ko": "가공이 아니라 표면 마무리라 컵 변화는 작습니다. 겉모습이 깨끗해지고 잡내가 조금 줄어드는 정도입니다.",
"en": "A surface finish, not a process: the cup changes little. The lot looks cleaner and may taste slightly cleaner.",
"ja": "精製ではなく表面の仕上げなので、カップの変化は小さいです。見た目がきれいになり、雑味が少し減る程度です。"
},
"roast": {
"ko": "일반 생두와 같은 프로파일로 볶습니다. 다만 재건조가 덜 된 로트는 수분이 높아 초반 열량을 조금 줄입니다.",
"en": "Roast it like any green bean. If re-drying was incomplete, moisture runs high, so ease the early heat.",
"ja": "通常の生豆と同じプロファイルで焙煎します。再乾燥が不十分なロットは水分が高いので、序盤の熱量を少し下げます。"
},
"origins": {
"ko": "베트남 로부스타, 인도, 케냐 일부. 로부스타 거래에서 프리미엄을 받기 위한 마무리로 자주 쓰입니다.",
"en": "Vietnamese robusta, India and some Kenyan lots; common as a premium finish in robusta trading.",
"ja": "ベトナムのロブスタ、インド、ケニアの一部。ロブスタ取引でプレミアムを得る仕上げとしてよく使われます。"
},
"caution": {
"ko": "이 표기는 세 가지로 쓰입니다. ① 건조 후 실크스킨 제거(가장 널리 문서화된 뜻) ② 물에 담갔다가 폴리싱 ③ 기계식 점액질 제거 후 건조. '웻'은 물을 썼다는 뜻일 뿐, 습식 가공이나 발효를 뜻하지 않습니다.",
"en": "The label carries three meanings: silverskin removal after drying (best documented), soaking before polishing, and mechanical demucilaging. 'Wet' describes the water used, not wet processing or fermentation.",
"ja": "この表記には三つの意味があります。①乾燥後のシルバースキン除去（最も文書化されている意味）②水に浸してから研磨 ③機械式ミュシレージ除去後の乾燥。「ウェット」は水を使ったという意味で、湿式精製や発酵を意味しません。"
}
},
"kenya-double-washed": {
"level": 2,
"group": "세미·웻헐",
"chip": "washed",
"label": {
"ko": "케냐 더블 워시드",
"en": "Kenyan Double Washed",
"ja": "ケニア式ダブルウォッシュ"
},
"alias": {
"ko": [
"더블 워시드",
"이중 워시드",
"72시간 워시드",
"케냐식 워시드"
],
"en": [
"Double Washed",
"Kenyan Process",
"72-hour Washed"
],
"ja": [
"ダブルウォッシュド",
"ケニア式",
"72時間ウォッシュド"
]
},
"summary": {
"ko": "발효와 세척을 두 번에 나눠 하고, 맑은 물에 담갔다가 말리는 케냐식 워시드입니다.",
"en": "Kenya's washed style: fermentation and washing split into two rounds, then a soak in clean water.",
"ja": "発酵と洗浄を二回に分け、きれいな水に浸けてから乾かすケニア式ウォッシュドです。"
},
"how": {
"ko": "탈피 후 12~36시간 1차 발효하고 씻어 낸 뒤, 남은 점액질을 없애려 12~24시간 한 번 더 발효합니다. 문헌에 따라 1차 발효는 12시간에서 나흘까지로 기록이 갈립니다. 마지막으로 맑은 물에 12~24시간 담갔다가 건조대로 옮깁니다.",
"en": "After pulping, a first fermentation of 12–36 hours and a wash, then a second fermentation of 12–24 hours for the remaining mucilage; published first-stage times run from 12 hours to four days. A 12–24 hour soak in clean water follows before drying.",
"ja": "パルピング後に12〜36時間の一次発酵と洗浄、残ったミュシレージのため12〜24時間の二次発酵を行います。一次発酵は文献により12時間から4日まで幅があります。最後にきれいな水へ12〜24時間浸けてから乾燥台へ移します。"
},
"cup": {
"ko": "블랙커런트·자몽·토마토 같은 강한 산미와 두터운 바디. 같은 워시드보다 산미의 밀도가 높습니다.",
"en": "Intense blackcurrant, grapefruit or tomato-like acidity with a thick body; denser acidity than a standard washed lot.",
"ja": "カシスやグレープフルーツ、トマトのような強い酸味と厚いボディ。標準的なウォッシュドより酸味の密度が高いです。"
},
"roast": {
"ko": "밀도가 매우 높아 초반 열량을 넉넉히 주고, 배전이 지나면 검은 차 같은 쓴맛이 앞섭니다. 라이트미디엄 권장.",
"en": "Very dense, so charge generously; past medium the black-tea bitterness takes over. Light-medium recommended.",
"ja": "密度が非常に高いので序盤の熱量を十分に。中煎りを超えると紅茶のような苦味が前に出ます。ライトミディアムがおすすめです。"
},
"origins": {
"ko": "케냐 니에리·키리냐가·무랑가, 르완다·부룬디의 유사 방식. 케냐 협동조합 팩토리에서 흔합니다.",
"en": "Nyeri, Kirinyaga and Murang'a in Kenya, with similar methods in Rwanda and Burundi; common at Kenyan cooperative factories.",
"ja": "ケニアのニエリ・キリニャガ・ムランガ、ルワンダ・ブルンジの類似方式。ケニアの協同組合ファクトリーでよく見られます。"
},
"caution": {
"ko": "'더블 워시드'가 항상 두 번 발효했다는 뜻은 아닙니다. 발효 후 물에 담그는 단계만 있어도 이렇게 부르는 경우가 많아, 케냐 밖에서는 '발효 2회'와 '담그기'를 구분해 설명하는 편이 좋습니다.",
"en": "Double washed does not always mean two fermentations. A post-fermentation soak is often enough to earn the name, so outside Kenya it helps to say whether the lot fermented twice or was soaked.",
"ja": "「ダブルウォッシュド」がいつも二回発酵という意味ではありません。発酵後の浸水だけでもこう呼ぶことが多いため、ケニア以外では「二回発酵」か「浸水」かを分けて説明するのがよいです。"
}
},
"double-fermentation": {
"level": 2,
"group": "무산소·특수",
"chip": "anaerobic",
"label": {
"ko": "이중 발효",
"en": "Double Fermentation",
"ja": "二重発酵"
},
"alias": {
"ko": [
"이중 발효",
"더블 퍼멘테이션",
"2차 발효"
],
"en": [
"Double Fermentation",
"Double Fermented"
],
"ja": [
"二重発酵",
"ダブルファーメンテーション"
]
},
"summary": {
"ko": "발효를 두 번에 나눠 하는 방식을 통칭하는 말로, 뜻이 넓고 표준이 없습니다.",
"en": "An umbrella term for fermenting in two stages — broad, and without a standard.",
"ja": "発酵を二回に分ける方法の総称で、意味が広く標準はありません。"
},
"how": {
"ko": "통체리로 한 번 발효한 뒤 탈피해 다시 발효하기도 하고, 발효 후 맑은 물에 담그는 단계를 가리키기도 합니다. 케냐식 더블 워시드도 이 이름으로 불립니다.",
"en": "It can mean a whole-cherry ferment followed by a second ferment after pulping, or simply a post-fermentation soak. Kenyan double washed also travels under this name.",
"ja": "チェリーで一度発酵させてからパルピング後に再度発酵する場合も、発酵後の浸水を指す場合もあります。ケニア式ダブルウォッシュドもこの名で呼ばれます。"
},
"cup": {
"ko": "두 번 발효하면 산미가 깊어지고 단맛이 늘지만, 과하면 발효취가 앞섭니다. 컵은 베이스 가공에 따라 크게 갈립니다.",
"en": "Two ferments can deepen acidity and sweetness, but overdo it and the ferment note dominates. The cup depends heavily on the base process.",
"ja": "二回発酵すると酸味が深まり甘さも増しますが、過ぎると発酵臭が前に出ます。カップはベースの精製で大きく変わります。"
},
"roast": {
"ko": "베이스가 워시드인지 내추럴인지에 맞춰 프로파일을 잡습니다. '이중 발효'라는 말만으로 열량을 정하기는 어렵습니다.",
"en": "Set the profile by whether the base is washed or natural; the phrase alone does not tell you the heat.",
"ja": "ベースがウォッシュドかナチュラルかに合わせてプロファイルを決めます。「二重発酵」という言葉だけでは熱量を決められません。"
},
"origins": {
"ko": "케냐·르완다·부룬디의 더블 워시드, 콜롬비아·과테말라의 실험적 2차 발효. 표기가 가장 제각각인 항목입니다.",
"en": "Double washed in Kenya, Rwanda and Burundi; experimental second ferments in Colombia and Guatemala. The label varies most here.",
"ja": "ケニア・ルワンダ・ブルンジのダブルウォッシュド、コロンビア・グアテマラの実験的な二次発酵。表記がいちばんばらつく項目です。"
},
"caution": {
"ko": "'이중 발효'는 '이중 무산소'와 다릅니다. 두 번째 발효가 산소에 노출된 상태라면 무산소가 아니고, 반대로 두 번 모두 밀폐였다면 이중 무산소로 부르는 편이 정확합니다.",
"en": "Double fermentation is not double anaerobic. If the second stage is open to air it is not anaerobic; if both stages were sealed, double anaerobic is the more accurate name.",
"ja": "「二重発酵」は「ダブルアナエロビック」とは違います。二回目が空気に触れていれば嫌気ではなく、両方とも密閉ならダブルアナエロビックと呼ぶほうが正確です。"
}
},
"pulped-natural": {
"level": 2,
"group": "세미·웻헐",
"chip": "semi",
"label": {
"ko": "펄프드 내추럴",
"en": "Pulped Natural",
"ja": "パルプドナチュラル"
},
"alias": {
"ko": [
"펄프드 내추럴",
"펄프드",
"에코펄프드"
],
"en": [
"Pulped Natural",
"Eco-pulped"
],
"ja": [
"パルプドナチュラル"
]
},
"summary": {
"ko": "과육만 벗기고 점액질은 거의 씻지 않은 채 말리는 브라질식 방식입니다.",
"en": "Brazil's method: strip the fruit only, leave the mucilage on almost entirely, and dry.",
"ja": "果肉だけを除き、ミュシレージはほとんど洗わずに乾かすブラジル式の方法です。"
},
"how": {
"ko": "탈피 후 발효조와 세척 수로를 거의 쓰지 않고 바로 건조대로 옮깁니다. 물 사용이 적고, 점액질이 남아 건조 중에도 발효가 조금씩 이어집니다.",
"en": "After pulping the coffee skips fermentation tanks and washing channels and goes straight to the beds. It uses little water, and the remaining mucilage keeps fermenting gently while it dries.",
"ja": "パルピング後は発酵槽や洗浄水路をほとんど使わず、すぐ乾燥台へ移します。水の使用が少なく、残ったミュシレージが乾燥中もゆっくり発酵します。"
},
"cup": {
"ko": "견과·밀크초콜릿 같은 둥근 단맛, 낮은 산미, 부드러운 바디. 에스프레소 베이스로 인기가 많습니다.",
"en": "Round nut and milk-chocolate sweetness, low acidity and a soft body; a popular espresso base.",
"ja": "ナッツやミルクチョコレートのような丸い甘さ、低い酸味、やわらかなボディ。エスプレッソベースとして人気です。"
},
"roast": {
"ko": "중배전 이상에서 단맛이 살아납니다. 브라질 산은 초반 열을 조금 낮춰 견과 향을 지키는 편이 좋습니다.",
"en": "Sweetness opens at medium and beyond. With Brazilian lots, ease the early heat to keep the nutty note.",
"ja": "中煎り以上で甘さが生きてきます。ブラジル産は序盤の熱を少し抑えるとナッツの香りが残ります。"
},
"origins": {
"ko": "브라질(주정부별 표기 차이), 콜롬비아, 인도. 브라질은 대개 옐로우 허니와 비슷한 결과가 나옵니다.",
"en": "Brazil, Colombia and India. In Brazil the result usually resembles a yellow honey.",
"ja": "ブラジル、コロンビア、インド。ブラジルではふつうイエローハニーに近い結果になります。"
}
},
"semi-washed": {
"level": 2,
"group": "세미·웻헐",
"chip": "semi",
"label": {
"ko": "세미 워시드",
"en": "Semi-washed",
"ja": "セミウォッシュド"
},
"alias": {
"ko": [
"세미 워시드",
"반수세식"
],
"en": [
"Semi-washed",
"Semi-wash"
],
"ja": [
"セミウォッシュド",
"半水洗"
]
},
"summary": {
"ko": "발효조에 오래 두지 않고 기계로 점액질을 벗겨, 워시드와 허니 사이의 맛을 내는 방식입니다.",
"en": "Mucilage is removed by machine instead of a long fermentation, landing between washed and honey.",
"ja": "長い発酵をせず機械でミュシレージを除き、ウォッシュドとハニーの間の味になる方法です。"
},
"how": {
"ko": "탈피 후 디뮤실리지(기계식 점액질 제거기)로 점액질을 걷어내고 바로 건조합니다. 물과 시간을 아끼려는 방식이라 산지마다 공정이 조금씩 다릅니다.",
"en": "After pulping a mechanical demucilager strips the mucilage and the coffee dries straight away. It saves water and time, so the exact steps vary by mill.",
"ja": "パルピング後に機械式デミュシレージャーでミュシレージを除き、すぐ乾燥します。水と時間を節約する方法なので、工場ごとに工程が少しずつ違います。"
},
"cup": {
"ko": "워시드보다 바디가 있고 허니보다 깔끔합니다. 견과와 시트러스, 부드러운 산미.",
"en": "More body than washed, cleaner than honey: nuts, citrus and soft acidity.",
"ja": "ウォッシュドよりボディがあり、ハニーよりきれい。ナッツとシトラス、やわらかな酸味です。"
},
"roast": {
"ko": "수분이 고르고 밀도가 중간 정도라 다루기 쉽습니다. 중배전에서 단맛과 산미가 균형을 이룹니다.",
"en": "Even moisture and medium density make it forgiving; medium roast balances sweetness and acidity.",
"ja": "水分が均一で密度も中程度なので扱いやすいです。中煎りで甘さと酸味が釣り合います。"
},
"origins": {
"ko": "인도네시아, 인도, 베트남, 브라질. 인도네시아에서는 웻 헐링과 섞어 쓰는 경우가 많습니다.",
"en": "Indonesia, India, Vietnam and Brazil; in Indonesia the term often blurs into wet hulling.",
"ja": "インドネシア、インド、ベトナム、ブラジル。インドネシアではウェットハルと混同されることが多いです。"
},
"caution": {
"ko": "'세미 워시드'는 지역마다 뜻이 다릅니다. 중미에서는 허니와 거의 같은 뜻으로, 인도네시아에서는 웻 헐링을 가리키는 말로, 베트남에서는 기계식 점액질 제거를 뜻합니다.",
"en": "Semi-washed means different things by region: roughly honey in Central America, wet hulling in Indonesia, mechanical demucilaging in Vietnam.",
"ja": "「セミウォッシュド」は地域で意味が違います。中米ではほぼハニー、インドネシアではウェットハル、ベトナムでは機械式ミュシレージ除去を指します。"
}
},
"honey": {
"level": 1,
"group": "기본",
"chip": "honey",
"label": {
"ko": "허니",
"en": "Honey",
"ja": "ハニー"
},
"alias": {
"ko": [
"허니",
"허니 프로세스",
"점액질 건조"
],
"en": [
"Honey",
"Honey Process"
],
"ja": [
"ハニー",
"ハニープロセス"
]
},
"summary": {
"ko": "과육만 벗기고 끈적한 점액질을 남긴 채 말려, 단맛과 바디를 끌어올리는 중간 방식입니다.",
"en": "A middle path: the fruit is removed but the sticky mucilage stays on during drying, lifting sweetness and body.",
"ja": "果肉だけを除き、粘つくミュシレージを残したまま乾かして甘さとボディを引き上げる中間的な方法です。"
},
"how": {
"ko": "탈피한 뒤 점액질을 얼마나 남길지 기계로 조절하고, 그대로 건조대에 널어 1~4주 말립니다. 남긴 양과 그늘 정도에 따라 화이트·옐로우·레드·블랙으로 나뉩니다.",
"en": "After pulping, a demucilager sets how much mucilage remains. The coffee dries on beds for one to four weeks, and the amount left plus the shade decides white, yellow, red or black.",
"ja": "パルピング後にミュシレージをどれだけ残すかを機械で調整し、そのまま1〜4週間乾かします。残す量と日陰の程度でホワイト・イエロー・レッド・ブラックに分かれます。"
},
"cup": {
"ko": "꿀·캐러멜 같은 단맛과 부드러운 산미, 중간 정도의 바디. 워시드보다 과일향이 앞서고 내추럴보다 정돈된 편입니다.",
"en": "Honey and caramel sweetness, soft acidity, a medium body. Fruitier than washed, tidier than natural.",
"ja": "はちみつやキャラメルの甘さ、やわらかな酸味、中程度のボディ。ウォッシュドより果実感があり、ナチュラルより整っています。"
},
"roast": {
"ko": "점액질이 남아 끈적하고 수분이 고르지 않습니다. 드럼에 붙는 정도를 살피며 초반 열량을 조절합니다.",
"en": "The mucilage makes the batch sticky with uneven moisture. Watch how much clings to the drum and adjust the early heat.",
"ja": "ミュシレージが残るのでべたつき、水分も均一ではありません。ドラムへの付き方を見て序盤の熱量を調整します。"
},
"origins": {
"ko": "코스타리카 마이크로밀, 브라질, 과테말라, 엘살바도르. 국내 유통에서는 '허니'만 적힌 라벨이 가장 흔합니다.",
"en": "Costa Rican micro-mills, Brazil, Guatemala and El Salvador. In Korean listings a bare 'honey' label is the most common form.",
"ja": "コスタリカのマイクロミル、ブラジル、グアテマラ、エルサルバドル。韓国の流通では「ハニー」だけの表記がいちばん多いです。"
},
"caution": {
"ko": "색 이름의 점액질 잔류율(화이트 10%, 옐로우 25%, 레드 50%, 블랙 75~100%)은 어느 단체도 정한 기준이 아닙니다. 같은 농장의 '레드'가 다른 농장의 '옐로우'일 수 있어, 수치보다 판매처의 건조 설명을 보는 편이 정확합니다.",
"en": "The mucilage percentages behind the colour names (white 10%, yellow 25%, red 50%, black 75–100%) are not set by any standards body. One farm's red can be another's yellow, so read the producer's drying notes rather than the number.",
"ja": "色名のミュシレージ残存率（ホワイト10%、イエロー25%、レッド50%、ブラック75〜100%）は、どの団体も定めた基準ではありません。ある農園の「レッド」が別の農園の「イエロー」であることもあるため、数値より生産者の乾燥説明を見るほうが正確です。"
}
},
"natural": {
"level": 1,
"group": "기본",
"chip": "natural",
"label": {
"ko": "내추럴",
"en": "Natural",
"ja": "ナチュラル"
},
"alias": {
"ko": [
"내추럴",
"건식 가공",
"체리 건조",
"선드라이"
],
"en": [
"Natural",
"Dry Process",
"Sun-dried",
"Cherry-dried"
],
"ja": [
"ナチュラル",
"乾式精製",
"天日干し"
]
},
"summary": {
"ko": "체리를 통째로 말려, 과육이 마르는 동안 당과 향이 씨앗으로 스며들게 하는 방식입니다.",
"en": "Whole cherries are dried intact, so sugar and aroma move into the seed while the fruit dries.",
"ja": "チェリーを丸ごと乾かし、果肉が乾くあいだに糖と香りを種に移す方法です。"
},
"how": {
"ko": "잘 익은 체리를 골라 파티오나 아프리칸 베드에 얇게 널고 2~4주 동안 뒤집어 가며 말립니다. 수분 10~12%가 되면 마른 과육과 속껍질을 한꺼번에 벗겨 냅니다.",
"en": "Ripe cherries are spread thin on patios or raised beds and turned regularly for two to four weeks. At 10–12% moisture the dried fruit and parchment come off together in dry milling.",
"ja": "完熟チェリーをパティオやアフリカンベッドに薄く広げ、2〜4週間切り返しながら乾かします。水分10〜12%で乾いた果肉とパーチメントをまとめて脱殻します。"
},
"cup": {
"ko": "베리·열대과일 같은 과일향과 진한 단맛, 두터운 바디가 살아납니다. 발효가 길면 와인이나 럼 같은 뉘앙스가 붙습니다.",
"en": "Berry and tropical fruit, deep sweetness and a heavy body. Longer fermentation adds wine or rum-like notes.",
"ja": "ベリーやトロピカルフルーツの香り、濃い甘さ、厚いボディが出ます。発酵が長いとワインやラムのようなニュアンスが加わります。"
},
"roast": {
"ko": "당이 많아 색이 빨리 오릅니다. 초반 화력을 낮추고 넘어가는 지점을 세심하게 봐야 탄 향이 나지 않습니다.",
"en": "High sugar means colour develops fast. Lower the early heat and watch the turn point so no burnt note appears.",
"ja": "糖が多いので色が早く上がります。序盤の火力を下げ、変わり目を丁寧に見て焦げた香りを出さないようにします。"
},
"origins": {
"ko": "에티오피아 구지·시다모, 브라질, 예멘. 최근에는 콜롬비아와 중미에서도 비중이 큽니다.",
"en": "Guji and Sidamo in Ethiopia, Brazil and Yemen; increasingly Colombia and Central America.",
"ja": "エチオピアのグジ・シダモ、ブラジル、イエメン。最近はコロンビアや中米でも増えています。"
}
},
"washed": {
"level": 1,
"group": "기본",
"chip": "washed",
"label": {
"ko": "워시드",
"en": "Washed",
"ja": "ウォッシュド"
},
"alias": {
"ko": [
"워시드",
"풀리 워시드",
"습식 가공",
"수세식"
],
"en": [
"Washed",
"Fully Washed",
"Wet Process"
],
"ja": [
"ウォッシュド",
"フリーウォッシュド",
"湿式精製"
]
},
"summary": {
"ko": "과육과 점액질을 모두 씻어 낸 뒤 속껍질째 말리는, 가장 기본이 되는 방식입니다.",
"en": "The baseline method: fruit and mucilage are both removed before the parchment coffee is dried.",
"ja": "果肉とミュシレージをすべて洗い流し、パーチメントのまま乾かす基本の精製方法です。"
},
"how": {
"ko": "체리를 기계로 탈피해 과육을 걷어내고, 물속에서 12~72시간 두어 점액질을 풀어 씻어 냅니다. 속껍질이 붙은 채로 수분 10~12%까지 말린 다음 탈곡합니다.",
"en": "Cherries are pulped to remove the skin and fruit, fermented in water for about 12–72 hours so the mucilage breaks down, washed clean, then dried in parchment to 10–12% moisture and hulled.",
"ja": "チェリーをパルピングして果肉を除き、水中で12〜72時間おいてミュシレージを分解し、洗い流します。パーチメント付きのまま水分10〜12%まで乾燥させ、脱殻します。"
},
"cup": {
"ko": "산지와 품종의 개성이 가장 또렷하게 드러납니다. 시트러스·꽃향 같은 밝은 산미, 깨끗한 여운, 가벼운 바디가 특징입니다.",
"en": "It shows origin and variety most clearly: bright citrus or floral acidity, a clean finish and a lighter body.",
"ja": "産地と品種の個性がいちばんはっきり出ます。シトラスや花の香りの明るい酸味、きれいな余韻、軽いボディが特徴です。"
},
"roast": {
"ko": "밀도가 높고 수분이 고르므로 초반에 열을 충분히 줍니다. 배전이 빠르면 산미가 날카로워지고, 너무 늦으면 향이 뭉갭니다.",
"en": "Dense with fairly even moisture, so charge with enough heat. A fast roast sharpens the acidity; a slow one flattens the aromatics.",
"ja": "密度が高く水分も比較的均一なので、序盤にしっかり熱を入れます。焙煎が速いと酸味が鋭くなり、遅いと香りがぼやけます。"
},
"origins": {
"ko": "에티오피아·케냐·콜롬비아와 중미 전반. 이 데이터에서는 워시드 표기가 가장 많습니다.",
"en": "Ethiopia, Kenya, Colombia and most of Central America. It is the most common label in this dataset.",
"ja": "エチオピア・ケニア・コロンビアと中米全般。このデータではいちばん多い表記です。"
}
},
"anaerobic": {
"level": 1,
"group": "무산소·특수",
"chip": "anaerobic",
"label": {
"ko": "무산소 발효",
"en": "Anaerobic Fermentation",
"ja": "アナエロビック発酵"
},
"alias": {
"ko": [
"무산소",
"무산소 발효",
"애너로빅",
"혐기 발효"
],
"en": [
"Anaerobic",
"Anoxic",
"Low Oxygen"
],
"ja": [
"アナエロビック",
"嫌気発酵",
"低酸素"
]
},
"summary": {
"ko": "산소를 막은 탱크에서 발효해, 과일향과 단맛을 진하게 끌어올리는 방식입니다.",
"en": "Fermentation in a sealed, low-oxygen tank that pushes fruit aroma and sweetness much further.",
"ja": "酸素を遮断したタンクで発酵させ、果実香と甘さを濃く引き出す方法です。"
},
"how": {
"ko": "체리나 탈피한 생두를 밀폐 탱크나 배럴에 넣고 24~96시간 둡니다. 산소가 줄면 효모와 젖산균이 천천히 일하면서 향 성분이 쌓이고, 가스는 밸브로 빼냅니다.",
"en": "Cherries or pulped coffee go into sealed tanks or barrels for roughly 24–96 hours. With little oxygen, yeasts and lactic acid bacteria work slowly, aroma compounds build up, and a valve vents the gas.",
"ja": "チェリーやパルピングした豆を密閉タンクや樽に入れ、24〜96時間ほど置きます。酸素が少ないと酵母や乳酸菌がゆっくり働いて香り成分が蓄積し、ガスはバルブから抜きます。"
},
"cup": {
"ko": "복숭아·리치·장미 같은 향이 강하고 단맛이 높습니다. 과하면 술·식초 같은 발효 뉘앙스가 붙습니다.",
"en": "Strong peach, lychee or rose aromas with high sweetness; pushed too far, it turns boozy or vinegary.",
"ja": "桃やライチ、バラのような香りが強く、甘さも高いです。行き過ぎると酒や酢のような発酵ニュアンスが付きます。"
},
"roast": {
"ko": "잔당이 많고 밀도가 고르지 않아 배전이 들쭉날쭉합니다. 초반 열량을 낮추고 중간 배전에서 향을 확인합니다.",
"en": "High residual sugar and uneven density make the roast jumpy. Start with lower heat and check aroma at medium.",
"ja": "残糖が多く密度も不均一なので焙煎がばらつきます。序盤の熱量を下げ、中煎りで香りを確認します。"
},
"origins": {
"ko": "콜롬비아(카우카·후일라), 에티오피아, 파나마, 코스타리카. 국내 유통에서는 '무산소'만 적힌 라벨이 흔합니다.",
"en": "Colombia (Cauca, Huila), Ethiopia, Panama and Costa Rica; in Korean listings a bare 'anaerobic' label is common.",
"ja": "コロンビア（カウカ・ウイラ）、エチオピア、パナマ、コスタリカ。韓国の流通では「アナエロビック」だけの表記がよくあります。"
},
"caution": {
"ko": "'무산소'는 완성된 가공 이름이 아니라 한 단계입니다. 통체리로 했는지, 탈피 후 했는지, 이후 워시드·내추럴·허니 중 무엇으로 마무리했는지가 라벨에 없으면 맛을 예측하기 어렵습니다.",
"en": "'Anaerobic' names a step, not a finished process. Without knowing whether it was whole cherry or pulped, and how it was finished — washed, natural or honey — the cup is hard to predict.",
"ja": "「アナエロビック」は完成した精製名ではなく一工程です。チェリーのままか、パルピング後か、最後にウォッシュド・ナチュラル・ハニーのどれで仕上げたかが分からないと味は予測しにくいです。"
}
},
"experimental-other": {
"level": 2,
"group": "기타",
"chip": "other",
"label": {
"ko": "기타·실험적 가공",
"en": "Other / Experimental",
"ja": "その他・実験的精製"
},
"alias": {
"ko": [
"기타가공",
"기타",
"실험적 가공",
"슈퍼 내추럴",
"더블 다이아몬드",
"안티 마세레이션"
],
"en": [
"Other",
"Experimental",
"Super Natural"
],
"ja": [
"その他",
"実験的精製"
]
},
"summary": {
"ko": "생산자나 판매처가 붙인 이름이거나, 아직 분류가 굳지 않은 실험적 가공을 모아 두는 자리입니다.",
"en": "A home for producer or seller names and experimental methods that are not yet settled categories.",
"ja": "生産者や販売者が付けた名称、まだ分類が固まっていない実験的精製をまとめる場所です。"
},
"how": {
"ko": "한 가지 공정으로 묶기 어려운 표기들이 여기 들어옵니다. '슈퍼 내추럴', '더블 다이아몬드', '안티 마세레이션', '이니그마'처럼 농장이나 수입사가 자체 이름을 붙인 경우가 대표적입니다.",
"en": "Labels that resist a single process fit here: house names such as Super Natural, Double Diamond, Anti-maceration or Enigma, given by a farm or importer.",
"ja": "一つの工程にまとめにくい表記がここに入ります。「スーパーナチュラル」「ダブルダイヤモンド」「アンチマセレーション」「エニグマ」のように、農園や輸入業者が独自に名付けた場合が典型です。"
},
"cup": {
"ko": "이름만으로는 예측할 수 없습니다. 같은 '슈퍼 내추럴'이라도 농장마다 공정이 달라 컵도 제각각입니다.",
"en": "The name alone predicts nothing; one farm's Super Natural differs from another's.",
"ja": "名前だけでは予測できません。同じ「スーパーナチュラル」でも農園ごとに工程が違い、カップもそれぞれです。"
},
"roast": {
"ko": "베이스가 무엇인지 먼저 확인한 뒤 프로파일을 잡습니다. 정보가 없으면 라이트미디엄에서 시작해 컵을 보며 조정합니다.",
"en": "Find the base process first, then set the profile. Without information, start light-medium and adjust by cup.",
"ja": "ベースが何かを先に確認してからプロファイルを決めます。情報がなければライトミディアムから始め、カップを見て調整します。"
},
"origins": {
"ko": "콜롬비아, 코스타리카, 파나마의 실험적인 마이크로 랏. 이 데이터에서는 12종이 여기에 해당합니다.",
"en": "Experimental micro-lots in Colombia, Costa Rica and Panama; 12 beans fall here in this dataset.",
"ja": "コロンビア、コスタリカ、パナマの実験的なマイクロロット。このデータでは12種がここに該当します。"
},
"caution": {
"ko": "이름이 붙었다고 해서 표준화된 공정은 아닙니다. 업계에서도 새 가공법의 정의를 두고 합의가 이뤄지지 않아, 판매처의 공정 설명이 유일한 단서인 경우가 많습니다.",
"en": "A name is not a standard. The industry has not agreed on definitions for newer methods, so the seller's protocol notes are often the only clue.",
"ja": "名前が付いていても標準化された工程ではありません。業界でも新しい精製法の定義は合意されておらず、販売者の工程説明が唯一の手がかりであることが多いです。"
}
}
},
"unverified": {
"VAP": {
"ko": "올인커피 판매 표기. 판매처 설명을 확인하지 못해 가공 의미를 확정하지 않음(향미 첨가·특수발효 계열로 추정).",
"en": "A retailer's own label. The seller's description could not be checked, so its meaning is not interpreted.",
"ja": "販売店独自の表記です。販売元の説明を確認できなかったため、意味は解釈していません。"
}
},
"ui": {
"filterTitle": [
"가공방식",
"Process",
"精製方法"
],
"filterAll": [
"전체",
"All",
"すべて"
],
"detail": [
"세부",
"Detail",
"詳細"
],
"modalTitle": [
"가공방식",
"Process",
"精製方法"
],
"close": [
"닫기",
"Close",
"閉じる"
],
"summary": [
"한 줄 요약",
"In one line",
"ひとことで"
],
"how": [
"어떻게 만드나",
"How it is made",
"つくり方"
],
"cup": [
"맛 · 바디 · 산미",
"Cup, body, acidity",
"味・ボディ・酸味"
],
"roast": [
"로스팅 · 추출 팁",
"Roasting and brewing",
"焙煎・抽出のヒント"
],
"caution": [
"주의할 점",
"Good to know",
"気をつけること"
],
"origins": [
"주요 산지",
"Where it shows up",
"主な産地"
],
"guideLink": [
"가이드에서 더 읽기",
"Read more in the guide",
"ガイドでさらに読む"
],
"filterNote": [
"가공방식으로 좁혀 보기",
"Narrow by process",
"精製方法で絞り込む"
],
"resultTitle": [
"{} 가공 생두",
"{} beans",
"{}精製の生豆"
],
"empty": [
"이 가공의 생두가 아직 없습니다.",
"No beans with this process yet.",
"この精製の生豆はまだありません。"
],
"unverifiedTitle": [
"의미를 확인하지 못한 표기",
"A label we could not interpret",
"意味を確認できなかった表記"
],
"unverifiedBody": [
"판매처가 붙인 표기라 뜻을 확인하지 못해, 임의로 다른 가공으로 분류하지 않았습니다.",
"This is a retailer's own label and its meaning could not be confirmed, so we did not place it in another process.",
"販売店が付けた表記で意味を確認できなかったため、他の精製に分類していません。"
],
"unlabeledTitle": [
"가공 표기 없음",
"No process label",
"精製の表記なし"
],
"unlabeledBody": [
"라벨에 가공 표기가 없어 추정하지 않았습니다. '전체'에서만 보입니다.",
"The label carries no process, and we do not guess. It appears only under All.",
"ラベルに精製の表記がなく、推測していません。「すべて」でのみ表示されます。"
]
},
"counts": {
"beans": 3113,
"groups": {
"washed": 1250,
"natural": 801,
"semi": 136,
"decaf": 106,
"honey": 203,
"anaerobic": 355,
"infused": 65,
"other": 22
},
"processes": {
"washed": 1250,
"natural": 801,
"wet-polished": 17,
"decaf-ea": 34,
"wet-hulled": 30,
"decaf-mountain-water": 47,
"decaf-swiss-water": 9,
"decaf-co2": 6,
"honey": 167,
"anaerobic-natural": 184,
"mosto": 15,
"yeast": 13,
"anaerobic-honey": 15,
"anaerobic-washed": 34,
"red-honey": 12,
"pulped-natural": 57,
"carbonic-maceration": 16,
"black-honey": 17,
"anaerobic": 19,
"asd": 14,
"yellow-honey": 4,
"co-fermentation": 55,
"semi-washed": 32,
"double-fermentation": 20,
"experimental-other": 12,
"double-anaerobic": 12,
"infused": 10,
"lactic": 2,
"decaf": 10,
"koji": 1,
"dark-room": 8,
"white-honey": 3,
"thermal-shock": 1,
"ef2": 1
}
}
};

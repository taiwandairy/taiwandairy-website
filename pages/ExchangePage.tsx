import React from 'react';

// 交流緣起：這次交流談了什麼
const TALKING_POINTS = [
  { icon: '🎓', title: '雙向學生交流', desc: '探詢澳洲學生來台實習、台灣學生赴澳交換的可行性' },
  { icon: '🐄', title: '牧場實習模式', desc: '分享協會以牧場現場為核心的培育經驗' },
  { icon: '📊', title: '產業現況互換', desc: '了解澳洲乳業的供給、價格與市場趨勢' },
  { icon: '🌏', title: '永續與韌性', desc: '氣候、飼料成本與產業轉型的共同課題' },
];

// 澳洲乳業關鍵數據（來源：Dairy Australia, Situation and Outlook Report, Mid-year 2026）
const AUS_STATS = [
  { value: '−0.7%', label: '本季生乳產量', sub: '2025–26 季至 3 月止（YTD）；全季預估約 −1%' },
  { value: '−2%', label: '2026–27 產量預測', sub: '基準情境；樂觀 −1%、悲觀 −3%' },
  { value: '80%', label: '農民對自身事業樂觀', sub: '2026 年 2 月 NDFS 調查，較前年 +9' },
  { value: 'A$31.2億', label: '國內乳品家用零售額', sub: '52 週；銷售額 +4.5%、銷量 +0.5%' },
  { value: '+121%', label: '尿素肥料年增', sub: '2026/4 均價 857 US$/公噸，中東衝突推升' },
  { value: '+50%', label: '淘汰乳牛價年增（活重）', sub: '至 2026/3，341 ¢/kg；高牛肉價加速淘汰' },
  { value: '3.4%', label: '占全球乳製品出口量', sub: '由 3.6% 下滑；美、紐同步增產搶市占' },
  { value: '＞95%', label: '家庭持續購買乳品', sub: '乳品仍是澳洲家庭的民生必需品' },
];

// 六大面向
const AUS_THEMES = [
  {
    icon: '🥛', title: '供給與產量：一季在蹺蹺板上', points: [
      '開季前四個月因乾旱與高飼料成本，產量較去年同期低 2.4%',
      '12 月起夏季雨量改善，跌幅逐月收斂，至 3 月止僅 −0.7%',
      '區域分化：昆士蘭 +3.3%、NSW +2.6%、維多利亞自高基期小幅回落、南澳最弱',
      '規模分化：大型農場擴張、小型農場多維持或縮減',
    ],
  },
  {
    icon: '💰', title: '價格與農場獲利', points: [
      '農場收購價展現韌性，加工廠給予暫時性調升，穩住信心',
      '但極端天氣區獲利急凍：西維／南澳 EBIT −48%、Gippsland 平均利潤 −57%',
      '77% 農場 2024–25 有營運獲利，逾 78% 預期 2026–27 續獲利',
    ],
  },
  {
    icon: '⛽', title: '成本與投入：最大的下行風險', points: [
      '核心變數是中東衝突——推升燃料與肥料價格、加劇通膨',
      '尿素 +121% 年增；南部產區乾草價一度飆漲約 33%',
      '應對：每頭精料補充增至 2 公噸（2009 年來最高）、副產品入料農場占 29%',
    ],
  },
  {
    icon: '🌏', title: '出口與國際市場', points: [
      '全球乳品供給強勁，但脫脂奶粉價因乳清蛋白排擠仍維持高檔',
      '對中國出口跌幅收斂（−1% vs 前年 −6%），東南亞回到成長',
      '澳幣走強（0.64→0.71 美元），削弱出口競爭力',
    ],
  },
  {
    icon: '🛒', title: '國內需求：量穩、內部劇烈換位', points: [
      '逾 95% 家庭持續買乳品，總量大致持平，但類別內部換手劇烈',
      '優格 +7.5%（希臘優格 +17%）、大瓶裝當道、奶油 +1.7%',
      '植物奶退燒 −2.9%；品牌力回升，壓過自有品牌',
    ],
  },
  {
    icon: '🌦️', title: '氣候與飼料條件', points: [
      '80% 農場過去一年受極端天氣衝擊（設題以來最高）',
      '西維多利亞重災 97%；南澳酪農區直到 2026/3 才等到有效降雨',
      '復原能力高度取決於飼料庫存與財務儲備',
    ],
  },
];

// 給台灣讀者的觀察點
const TAKEAWAYS = [
  { title: '收購價的「韌性」是穩住信心的關鍵', body: '即使全球供給過剩、成本飆漲，收購價與加工廠的暫時性調升仍撐住澳洲農民信心（自身事業樂觀度衝到 80%）。台灣的鮮乳收購契約與價格穩定機制，同樣是留住酪農、支撐投資意願的核心。' },
  { title: '地緣政治直接打進成本結構', body: '報告最反覆出現的變數不是乳價，而是「中東衝突 → 燃料與肥料」。台灣飼料、肥料高度仰賴進口，投入成本的地緣風險值得比照納入產業風險評估。' },
  { title: '氣候韌性 ＝ 飼料與資金儲備', body: '能不能撐過乾旱與洪水，取決於飼料庫存與財務儲備。台灣面對颱風與熱緊迫，可把「飼草料儲備」與「牧場現金流」當成防災投資，而非事後救濟。' },
  { title: '消費端「量穩、內部換位」的訊號', body: '大包裝取代小包裝、高蛋白優格高成長、植物奶退燒、品牌力回升。台灣乳品行銷可留意高蛋白訴求與包裝的價值感，而植物奶的威脅正在減弱。' },
  { title: '產業走向規模分化', body: '澳洲是「大場擴張、小場維持或退場」，牛肉高價又加速淘汰。台灣同樣面臨世代交替與規模門檻，政策需兼顧兩端——既支持擴張者投資，也為小型與高齡經營者設計有尊嚴的轉型或退場路徑。' },
];

const DAIRY_AU_URL = 'https://www.dairyaustralia.com.au/';

export const ExchangePage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent text-sm font-semibold tracking-widest mb-3">國際產業交流</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">台澳乳業交流：向昆士蘭大學取經</h1>
          <p className="text-blue-200 text-lg max-w-3xl leading-relaxed">
            協會的人才培育計畫開始有國際學生加入，我們也把交流延伸到海外。這頁記錄我們拜訪昆士蘭大學的過程，並整理澳洲乳業的發展現況，給台灣同業參考。
          </p>
        </div>
      </section>

      {/* 交流緣起 */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">當人才培育開始跨出國界</h2>
              <div className="w-20 h-1 bg-accent mb-6"></div>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>協會的<strong className="text-gray-900">牧場見實習人才培育計畫</strong>自 2015 年起，已陪伴超過 <strong className="text-gray-900">100 位</strong>台灣學生走進牧場現場。近年來，計畫更開始迎來<strong className="text-gray-900">來自海外的學生</strong>——包括墨爾本大學、雪梨大學、都柏林大學與香港的學員。</p>
                <p>有了國際學生，我們也更想知道台灣以外的牧場怎麼運作。於是主動走出去，找上乳業發展成熟、和台灣一樣長期面對氣候與成本壓力的澳洲。</p>
                <p><strong className="text-gray-900">2026 年 7 月，協會拜訪了澳洲昆士蘭大學（The University of Queensland）</strong>，就雙向學生交流、實習合作與產業經驗進行交流，並帶回這份澳洲乳業發展現況的觀察。</p>
              </div>
            </div>
            <div className="bg-gray-warm rounded-2xl p-7 md:p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-5">這次交流談了什麼</h3>
              <ul className="space-y-4">
                {TALKING_POINTS.map((p, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-white flex items-center justify-center text-lg shadow-sm">{p.icon}</span>
                    <div>
                      <div className="font-semibold text-gray-900">{p.title}</div>
                      <div className="text-sm text-gray-600 leading-relaxed">{p.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 拜訪紀錄 */}
      <section className="py-12 md:py-20 bg-gray-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">在昆士蘭大學</h2>
            <div className="w-20 h-1 bg-accent mx-auto"></div>
          </div>
          <figure className="rounded-2xl overflow-hidden shadow-lg bg-white">
            <img
              src="/images/exchange/uq-visit-1.jpg"
              alt="協會代表與昆士蘭大學師長合影"
              className="w-full h-auto object-cover"
            />
            <figcaption className="text-center text-sm text-gray-500 py-4 px-4">
              協會代表與昆士蘭大學（The University of Queensland）師長合影，2026 年 7 月。
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 澳洲乳業發展現況（深色） */}
      <section className="py-14 md:py-20 bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-accent text-sm font-semibold tracking-widest mb-3">產業參考</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">澳洲乳業發展現況</h2>
            <p className="text-blue-200 leading-relaxed">
              全球乳品供給增加、投入成本劇烈波動、消費型態也在變。這樣的環境裡，澳洲乳業靠收購價韌性與穩定內需站穩腳步、農民信心明顯回升；但中東衝突推升的燃料與肥料成本，正在威脅生產——2026–27 年產量預估下滑約 2%。
            </p>
            <p className="text-xs text-blue-300/80 leading-relaxed mt-5">
              以下「發展現況」「六大面向」「未來展望」各項數據，均整理自 Dairy Australia《Situation and Outlook Report — Mid-year 2026》（2026 年 5 月出版）。完整報告與更多澳洲乳業產業資料，見{' '}
              <a href={DAIRY_AU_URL} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">dairyaustralia.com.au</a>。
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {AUS_STATS.map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-2xl md:text-3xl font-black text-accent leading-tight">{s.value}</div>
                <div className="text-sm font-semibold mt-2">{s.label}</div>
                <div className="text-xs text-blue-200/70 mt-1 leading-relaxed">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 六大面向 */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">從六個面向看澳洲乳業</h2>
            <div className="w-20 h-1 bg-accent mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AUS_THEMES.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-7">
                <div className="w-11 h-11 rounded-xl bg-gray-warm flex items-center justify-center text-xl mb-4">{t.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{t.title}</h3>
                <ul className="space-y-2">
                  {t.points.map((pt, j) => (
                    <li key={j} className="relative pl-4 text-gray-600 text-sm leading-relaxed">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-accent"></span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 未來展望與觀察點 */}
      <section className="py-12 md:py-20 bg-gray-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary to-primary-light rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-xl md:text-2xl font-bold mb-4">未來展望與風險</h3>
            <p className="text-blue-100 leading-relaxed max-w-4xl">
              基準情境下，2026–27 年澳洲全國生乳產量預估下滑約 2%。若中東衝突及時緩解、天氣有利，可望收斂至 −1%；反之若高投入成本全年持續或再逢乾旱，則可能擴大至 −3%。牧草與土壤含水、飼料庫存良好，加上內需韌性與加工廠暫時性調升收購價，是主要支撐；而中東衝突延長、雨量低於平均、以及成本漲幅超過乳價的利潤壓縮，則是最大風險。
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {TAKEAWAYS.map((t, i) => (
                <div key={i} className="bg-white/7 border border-white/15 rounded-xl p-5">
                  <div className="text-xs font-bold tracking-wider text-accent mb-2">給台灣的觀察 {i + 1}</div>
                  <div className="font-semibold mb-1">{t.title}</div>
                  <p className="text-sm text-blue-100/85 leading-relaxed">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-6 leading-relaxed">
            資料來源：Dairy Australia《Situation and Outlook Report — Mid-year 2026》。參考連結：
            <a href={DAIRY_AU_URL} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">www.dairyaustralia.com.au</a>
            。本頁摘要與觀察僅供台灣產業交流參考。
          </p>
        </div>
      </section>

      {/* 國際合作邀請 */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">在台灣與澳洲之間，搭一座雙向的橋</h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-5"></div>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              協會的實習計畫已迎來墨爾本大學與雪梨大學的學生，我們期待與昆士蘭大學進一步深化這樣的交流。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
              <div className="text-xs font-bold tracking-wider text-accent mb-2">境外 → 台灣</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">接待國際學生來台</h3>
              <p className="text-gray-600 text-sm leading-relaxed">邀請澳洲的獸醫與動物科學學生加入我們的牧場實習，看看台灣怎麼在有限土地上把乳業做起來，以及獸醫之間怎麼密切支援。</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
              <div className="text-xs font-bold tracking-wider text-accent mb-2">台灣 → 境外</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">台灣學生赴澳交流</h3>
              <p className="text-gray-600 text-sm leading-relaxed">我們也在找台灣學生赴澳洲交換與實習的管道，讓兩邊的酪農走得更近、彼此都學得到東西。</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

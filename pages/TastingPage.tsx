import React, { useState } from 'react';

// 口感輪 9 個詞彙與定義（取自協會鮮乳品鑑課程）
const TEXTURES: { term: string; en: string; desc: string; cls: string }[] = [
  { term: '濃郁', en: 'Rich', desc: '相同脂肪與蛋白質條件下感受到的風味較多，各種感官印象之間有豐富複雜的互動。', cls: 'bg-amber-50 text-amber-800 border-amber-200' },
  { term: '清爽', en: 'Refreshing', desc: '風味物質豐富，但整體脂肪與蛋白質感較低所形成的乾淨口感。', cls: 'bg-sky-50 text-sky-800 border-sky-200' },
  { term: '厚實', en: 'Thick', desc: '鮮乳在舌面的重量感較多，通常來自較高的脂肪含量。', cls: 'bg-orange-50 text-orange-800 border-orange-200' },
  { term: '滑順', en: 'Smooth', desc: '在口中流動性佳；脂肪、蛋白質、乳糖恰到好處且滅菌得當、蛋白質狀態良好。', cls: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  { term: '黏稠', en: 'Sticky', desc: '在口中流動性較低，可能來自蛋白質、非脂固形物較多，或體細胞數值較高。', cls: 'bg-yellow-50 text-yellow-800 border-yellow-200' },
  { term: '粉質', en: 'Chalky', desc: '帶有沙沙、粉粉的觸感，可能來自滅菌過程中蛋白質結構改變。', cls: 'bg-stone-100 text-stone-700 border-stone-200' },
  { term: '乾澀', en: 'Dry', desc: '舌面流動性不佳、口腔摩擦力增加，可能因脂肪較低或蛋白質滅菌後結構改變。', cls: 'bg-rose-50 text-rose-800 border-rose-200' },
  { term: '淡薄', en: 'Thin', desc: '乳中各項無脂固形物皆偏低。', cls: 'bg-slate-50 text-slate-600 border-slate-200' },
  { term: '平淡', en: 'Flat', desc: '含相當程度的蛋白質和脂肪，但香氣風味較少，感覺較扁平、無趣。', cls: 'bg-gray-50 text-gray-600 border-gray-200' },
];

// 風味輪 7 大類與描述語
const FLAVORS: { cat: string; en: string; items: string; dot: string }[] = [
  { cat: '花香果香', en: 'Floral & Fruity', items: '白花、柑橘花香、蘋果、水梨', dot: 'bg-pink-400' },
  { cat: '草本', en: 'Herbal', items: '甜燕麥草、小麥草、苜蓿草、百慕達草、新鮮青草', dot: 'bg-green-500' },
  { cat: '堅果', en: 'Nutty', items: '腰果、榛果、杏仁', dot: 'bg-amber-600' },
  { cat: '穀物', en: 'Grain', items: '玉米、燕麥、麥芽、黃豆', dot: 'bg-yellow-500' },
  { cat: '甜味', en: 'Sweet', items: '黑糖、焦糖、麥芽糖、蔗糖', dot: 'bg-orange-500' },
  { cat: '乳香', en: 'Fragrance', items: '起司、優格、奶粉、鮮奶油、奶漬味', dot: 'bg-sky-400' },
  { cat: '雜味（瑕疵）', en: 'Miscellaneous', items: '牛舍味、酸味、霉味、塑膠味、金屬味、刺鼻味、苦味', dot: 'bg-gray-400' },
];

// 專業品鑑評鑑面向（鮮乳品鑑表）
const DIMENSIONS: { name: string; en: string }[] = [
  { name: '香氣', en: 'Aroma' },
  { name: '風味', en: 'Flavor' },
  { name: '甜感', en: 'Sweetness' },
  { name: '平衡', en: 'Balance' },
  { name: '體質', en: 'Body' },
  { name: '質地', en: 'Texture' },
  { name: '餘韻', en: 'Aftertaste' },
  { name: '綜合考量', en: 'Overall' },
];

export const TastingPage: React.FC = () => {
  const [zoom, setZoom] = useState<{ src: string; title: string } | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">牛乳風味品鑑</h1>
          <p className="text-blue-200 text-lg max-w-3xl">
            像品鑑精品咖啡與紅酒一樣，用一套科學的感官語彙，品味每一支莊園級鮮乳的風味與口感。
          </p>
        </div>
      </section>

      {/* 系統源起 */}
      <section className="py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">從精品咖啡，到莊園級鮮乳</h2>
            <p className="text-gray-600">學習精品咖啡的品鑑系統，建立一套屬於台灣鮮乳的風味語言</p>
          </div>

          <div className="bg-cream rounded-2xl p-6 md:p-8 mb-8 border border-yellow-100">
            <p className="text-gray-700 leading-relaxed mb-4">
              就像「第三波咖啡革命」讓人們重新講究從一顆咖啡豆到一杯咖啡的過程，
              鮮乳坊與協會將精品咖啡的<b>杯測精神</b>引入台灣鮮乳——
              <b>鮮乳，是在地風土人文的載體</b>。同樣的乳牛品種，在不同的風土、飼糧配方與飼養技法下，
              會呈現截然不同的風味與口感。
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
              {[
                { t: '風土', e: 'Terroir' },
                { t: '人文', e: 'Cultures' },
                { t: '飼糧配方', e: 'Feed' },
                { t: '乳牛', e: 'Cattle' },
                { t: '技法', e: 'Technique' },
              ].map(x => (
                <div key={x.e} className="bg-white rounded-xl py-4 text-center shadow-sm">
                  <div className="text-primary font-bold">{x.t}</div>
                  <div className="text-xs text-gray-400">{x.e}</div>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-lg font-bold text-primary mb-4 text-center">用「價值評估（CVA）」四個層次，把一般鮮奶提升為「莊園級鮮奶」</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { n: '物理性評估', d: '好農好乳指南：好牧場、好牛乳的具體標準', c: 'border-t-secondary' },
              { n: '外在評估', d: '鮮乳源：溯源產地與酪農，認識各牧場理念', c: 'border-t-green-500' },
              { n: '描述性評估', d: '牛乳風味品鑑：風味輪、口感輪等感官工具', c: 'border-t-accent' },
              { n: '情感性評估', d: '喜好：自己或市場對風味的偏好', c: 'border-t-rose-400' },
            ].map((x, i) => (
              <div key={i} className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 border-t-4 ${x.c}`}>
                <div className="font-bold text-primary mb-1">{x.n}</div>
                <p className="text-sm text-gray-600 leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 風味輪 + 口感輪 */}
      <section className="py-12 md:py-20 bg-gray-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">牛乳風味輪 ＆ 口感輪</h2>
            <p className="text-gray-600">協會建立的兩大感官工具，幫助你說出鮮乳「聞到什麼、嚐到什麼、口感如何」</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 風味輪 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <button onClick={() => setZoom({ src: '/images/tasting/flavor-wheel.jpg', title: '牛乳風味輪' })} className="block w-full relative group">
                <img src="/images/tasting/flavor-wheel.jpg" alt="牛乳風味輪" className="w-full" />
                <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/55 text-white text-xs opacity-0 group-hover:opacity-100 transition">點擊放大 🔍</span>
              </button>
              <div className="p-5">
                <h3 className="font-bold text-primary mb-3">風味輪 · 7 大類風味</h3>
                <div className="space-y-2">
                  {FLAVORS.map(f => (
                    <div key={f.cat} className="flex items-start gap-2 text-sm">
                      <span className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${f.dot}`}></span>
                      <span><b className="text-gray-800">{f.cat}</b> <span className="text-gray-400">{f.en}</span>｜<span className="text-gray-600">{f.items}</span></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 口感輪 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <button onClick={() => setZoom({ src: '/images/tasting/texture-wheel.jpg', title: '牛乳口感輪' })} className="block w-full relative group">
                <img src="/images/tasting/texture-wheel.jpg" alt="牛乳口感輪" className="w-full" />
                <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/55 text-white text-xs opacity-0 group-hover:opacity-100 transition">點擊放大 🔍</span>
              </button>
              <div className="p-5">
                <h3 className="font-bold text-primary mb-3">口感輪 · 9 種口感詞彙</h3>
                <p className="text-sm text-gray-500">描述鮮乳在口中的觸感與重量感，下方有每個詞彙的定義 👇</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 口感詞彙定義 */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">9 種口感詞彙</h2>
            <p className="text-gray-600">每一種口感，背後都對應鮮乳的乳成分與滅菌製程</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEXTURES.map(t => (
              <div key={t.term} className={`rounded-xl p-5 border ${t.cls}`}>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-xl font-extrabold">{t.term}</span>
                  <span className="text-xs opacity-70">{t.en}</span>
                </div>
                <p className="text-sm leading-relaxed opacity-90">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 品鑑流程與評鑑面向 */}
      <section className="py-12 md:py-20 bg-gray-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">專業品鑑流程</h2>
            <p className="text-gray-600">參照精品咖啡杯測（CVA），以八大面向為每一支鮮乳評分</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {DIMENSIONS.map(d => (
              <div key={d.en} className="bg-white rounded-xl py-4 text-center shadow-sm border border-gray-100">
                <div className="font-bold text-primary">{d.name}</div>
                <div className="text-xs text-gray-400">{d.en}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <figure className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <button onClick={() => setZoom({ src: '/images/tasting/sop.jpg', title: '標準品鑑操作流程' })} className="block w-full relative group">
                <img src="/images/tasting/sop.jpg" alt="標準品鑑操作流程" className="w-full" />
                <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/55 text-white text-xs opacity-0 group-hover:opacity-100 transition">點擊放大 🔍</span>
              </button>
              <figcaption className="p-4 text-center text-sm font-medium text-gray-600">標準品鑑操作流程</figcaption>
            </figure>
            <figure className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <button onClick={() => setZoom({ src: '/images/tasting/record-pro.jpg', title: '鮮乳品鑑紀錄表（專業人士版）' })} className="block w-full relative group">
                <img src="/images/tasting/record-pro.jpg" alt="鮮乳品鑑紀錄表" className="w-full" />
                <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/55 text-white text-xs opacity-0 group-hover:opacity-100 transition">點擊放大 🔍</span>
              </button>
              <figcaption className="p-4 text-center text-sm font-medium text-gray-600">鮮乳品鑑紀錄表（專業人士版）</figcaption>
            </figure>
          </div>

          <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-primary mb-3">品鑑筆記範例</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-warm rounded-xl p-4">
                <div className="font-bold text-gray-800 mb-1">桂芳牧場（台南柳營）</div>
                <p className="text-gray-600">香瓜、青割牧草，甘蔗般的甜感，口感滑順綿密，餘韻中等偏長。</p>
              </div>
              <div className="bg-gray-warm rounded-xl p-4">
                <div className="font-bold text-gray-800 mb-1">許慶良牧場（雲林崙背）</div>
                <p className="text-gray-600">烤杏仁、奶油、牛奶糖的甜感，口感厚實濃郁、滑順，餘韻綿長。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 首席品奶師 廖思為 */}
      <section className="py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 md:p-10 text-white">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0 w-full md:w-64">
                <img src="/images/tasting/liao.jpg" alt="芒果咖啡創辦人廖思為於烘豆室" className="w-full h-56 md:h-64 object-cover rounded-2xl shadow-lg" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block px-3 py-1 rounded-full bg-accent text-white text-xs font-bold mb-3">協會首席品奶師 · 風味品鑑顧問</div>
                <h2 className="text-2xl md:text-3xl font-bold mb-1">廖思為（國王）</h2>
                <p className="text-blue-200 mb-4">芒果咖啡 創辦人</p>
                <p className="text-white/90 leading-relaxed">
                  來自雲林斗六知名精品咖啡品牌「芒果咖啡」的創辦人廖思為，是台灣精品咖啡界的資深職人。
                  他將精品咖啡的杯測與感官品鑑系統引入台灣鮮乳，協助協會建立<b>牛乳風味輪</b>與<b>口感輪</b>，
                  訓練嗅聞、口感與風味的辨識能力，為台灣鮮乳建立一套專業的品鑑語彙與應用流程，
                  讓「莊園級鮮乳」的風味價值能被清楚描述、被更多人看見。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 媒體報導 */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cream rounded-2xl p-6 md:p-8 border border-yellow-100 text-center">
            <h3 className="text-lg font-bold text-primary mb-2">延伸閱讀：當莊園級鮮乳遇上精品咖啡</h3>
            <p className="text-gray-600 mb-5 max-w-2xl mx-auto">
              透過單一牧場溯源、無添加、無調整，讓每一款鮮乳展現自己的個性。就像第三波浪潮改變了人們對咖啡的想像，
              我們正為牛奶帶來一場風味與理念並重的革新。
            </p>
            <a href="https://c3.coffee/bettermilk_tasting/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition">
              閱讀媒體報導
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
          {/* 版權與授權聲明 */}
          <div className="mt-8 bg-white border-2 border-accent/40 rounded-2xl p-6 md:p-7">
            <div className="flex items-start gap-3">
              <svg className="w-7 h-7 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-bold text-primary mb-2">© 版權所有．使用前請取得授權</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-2">
                  本頁所載之「<b>牛乳風味輪</b>」、「<b>牛乳口感輪</b>」、<b>鮮乳品鑑紀錄表</b>與<b>標準品鑑操作流程</b>，
                  其著作權及智慧財產權均屬<b>台灣農酪產業永續發展協會</b>所有。未經本協會事前書面同意，
                  不得擅自複製、重製、轉載、修改或公開散佈。
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  如有<b>授權使用需求（包括推廣、教育、教學、商業應用等）</b>，請事先與協會聯繫取得同意：
                  <a href="mailto:tinghsuan@bettermilk.com.tw" className="text-secondary font-semibold hover:underline ml-1">tinghsuan@bettermilk.com.tw</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 圖片放大 lightbox */}
      {zoom && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4" onClick={() => setZoom(null)}>
          <button
            onClick={() => setZoom(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center"
            aria-label="關閉"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img src={zoom.src} alt={zoom.title} className="max-w-full max-h-[90vh] rounded-lg shadow-2xl" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
};

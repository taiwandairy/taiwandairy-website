import React from 'react';

// 年度成果：每年依協會計畫結案報告整理，只放可對外公開的內容
// （不放經費明細、廠商與委託資訊、聯絡電話、簽到與領據等文件）
interface Kpi { value: string; label: string; note?: string }
interface Photo { src: string; caption: string }
interface Activity { title: string; period: string; body: string; stats: Kpi[]; photos: Photo[] }
interface Project {
  name: string;
  theme: string;
  period: string;
  support: string;
  summary: string;
  kpis: Kpi[];
  activities: Activity[];
  feedback: { score: string; label: string }[];
  feedbackNote: string;
  closing: string;
}
interface YearResult { year: string; projects: Project[] }

const IMG = '/images/results/2026';

const RESULTS: YearResult[] = [
  {
    year: '2026',
    projects: [
      {
        name: '國產鮮乳在地供應鏈信任共創計畫',
        theme: '「星級之路」在地職人咖啡 × 國產鮮乳串店活動',
        period: '2026.05.05 – 08.31',
        support: '農業部指導・農產品受進口損害救助基金補助',
        summary:
          '以建立消費者對國產鮮乳的信任為核心，串聯大稻埕在地職人咖啡店與跨領域風味顧問，把國產鮮乳帶進日常的咖啡時光。透過風味研發座談、主題特展與跑店集點，讓民眾親身品嚐、認識「新鮮、優質、在地」的台灣鮮乳。',
        kpis: [
          { value: '4,173', label: '特展參與人次', note: '目標 2,000＋，達預期 2 倍' },
          { value: '2,514 萬', label: '媒體與社群觸及', note: '目標 200 萬＋' },
          { value: '46–63%', label: '合作店家國產鮮乳使用量成長', note: '目標 20–25%' },
          { value: '1,605 杯', label: '跑店集點杯數', note: '串聯 14 間職人咖啡店' },
        ],
        activities: [
          {
            title: '專家顧問鮮乳風味研發座談',
            period: '2026.05 – 06・共 5 場',
            body:
              '邀請首席品奶師廖思為、餐飲創業與產品開發顧問王琴理、SCA Q Grader 咖啡品質鑑定師林昌潔、咖啡師王春蓁四位跨領域顧問，逐場品鑑國產鮮乳風味，並研發以鮮乳為基底的檔期限定飲品與延伸乳製品。',
            stats: [
              { value: '5', label: '場研發座談' },
              { value: '4', label: '位跨領域顧問' },
            ],
            photos: [
              { src: `${IMG}/session-milk.jpg`, caption: '多款國產鮮乳並列品鑑' },
              { src: `${IMG}/session-cupping.jpg`, caption: '顧問探索鮮乳與咖啡的風味搭配' },
              { src: `${IMG}/session-talk.jpg`, caption: '記錄鮮乳性狀與風味關聯' },
            ],
          },
          {
            title: 'OrigInn Space「星級之路」特展',
            period: '2026.05.06 – 05.18・大稻埕・13 天',
            body:
              '在大稻埕 OrigInn Space 打造「從產地到餐桌」牧場情境展區，搭配鮮乳風味輪互動品飲與集點抽獎裝置，讓民眾在逛展中認識台灣酪農與國產鮮乳。',
            stats: [
              { value: '4,173', label: '人次參觀' },
              { value: '779', label: '份現場有效問卷' },
            ],
            photos: [
              { src: `${IMG}/expo-diorama.jpg`, caption: '「從產地到餐桌」牧場情境展區' },
              { src: `${IMG}/expo-tasting.jpg`, caption: '鮮乳風味輪互動品飲體驗' },
              { src: `${IMG}/expo-game.jpg`, caption: '集點抽獎互動遊戲' },
              { src: `${IMG}/expo-entrance.jpg`, caption: '特展入口意象' },
            ],
          },
          {
            title: '大稻埕跑店集點活動',
            period: '2026.05.05 – 06.30',
            body:
              '串聯大稻埕周邊 14 間在地職人咖啡店，各店以國產鮮乳研發特調飲品，鼓勵民眾走訪店家、集點兌獎，帶動店家來客與國產鮮乳的採用。',
            stats: [
              { value: '14', label: '間職人咖啡店' },
              { value: '1,605', label: '杯集點飲品' },
            ],
            photos: [
              { src: `${IMG}/shop-drink.jpg`, caption: '店家以國產鮮乳研發的特調' },
              { src: `${IMG}/shop-allday.jpg`, caption: '參與店家門口的活動文宣' },
              { src: `${IMG}/shop-backer.jpg`, caption: '民眾走訪支持國產鮮乳的店家' },
            ],
          },
        ],
        feedback: [
          { score: '4.6', label: '整體滿意度' },
          { score: '4.45', label: '體驗流暢度' },
        ],
        feedbackNote: '依 779 份現場問卷統計（滿分 5 分）。民眾最常提到的是展場內容與設計、對國產鮮乳的認同，以及工作人員的親切服務。',
        closing:
          '本計畫各項量化指標皆達成或超越目標。協會將延續這次與在地店家建立的合作基礎，持續推動國產鮮乳在地供應鏈，強化台灣酪農產業的韌性與競爭力。',
      },
    ],
  },
];

const KpiTile: React.FC<{ k: Kpi }> = ({ k }) => (
  <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100">
    <div className="text-3xl md:text-4xl font-bold text-accent leading-none mb-2 whitespace-nowrap">{k.value}</div>
    <div className="text-sm md:text-base font-semibold text-gray-900">{k.label}</div>
    {k.note && <div className="text-xs text-gray-500 mt-1">{k.note}</div>}
  </div>
);

const ActivityBlock: React.FC<{ a: Activity; index: number }> = ({ a, index }) => {
  const [first, ...rest] = a.photos;
  return (
    <div className="md:grid md:grid-cols-5 md:gap-10 items-start">
      <div className={`md:col-span-2 mb-6 md:mb-0 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
        <div className="text-sm font-semibold text-accent mb-1">活動 {index + 1}</div>
        <h3 className="text-xl md:text-2xl font-bold text-primary mb-1">{a.title}</h3>
        <div className="text-sm text-gray-500 mb-4">{a.period}</div>
        <p className="text-gray-700 leading-relaxed mb-5">{a.body}</p>
        <div className="flex gap-8">
          {a.stats.map(s => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-primary leading-none">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={`md:col-span-3 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
        <figure className="mb-3">
          <img src={first.src} alt={first.caption} loading="lazy" className="w-full aspect-[16/10] object-cover rounded-xl shadow-md" />
          <figcaption className="text-xs text-gray-500 mt-1">{first.caption}</figcaption>
        </figure>
        <div className={`grid gap-3 ${rest.length >= 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {rest.map(p => (
            <figure key={p.src}>
              <img src={p.src} alt={p.caption} loading="lazy" className="w-full aspect-square object-cover rounded-lg shadow-sm" />
              <figcaption className="text-xs text-gray-500 mt-1 leading-snug">{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ResultsPage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">年度成果</h1>
          <p className="text-blue-200 text-lg">協會每年推動的計畫與活動成果</p>
          {RESULTS.length > 1 && (
            <div className="flex gap-2 mt-6">
              {RESULTS.map(y => (
                <a key={y.year} href={`#results`} onClick={e => { e.preventDefault(); document.getElementById(`y${y.year}`)?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-sm transition">{y.year}</a>
              ))}
            </div>
          )}
        </div>
      </section>

      {RESULTS.map(y => (
        <div key={y.year} id={`y${y.year}`}>
          {y.projects.map(p => (
            <React.Fragment key={p.name}>
              {/* 計畫總覽 */}
              <section className="py-12 md:py-16 bg-gray-warm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="text-4xl md:text-5xl font-bold text-accent leading-none">{y.year}</span>
                    <span className="text-sm text-gray-500">{p.period}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{p.name}</h2>
                  <p className="text-lg text-primary font-medium mb-2">{p.theme}</p>
                  <p className="text-sm text-gray-500 mb-6">{p.support}</p>
                  <p className="text-gray-700 leading-relaxed max-w-3xl mb-10">{p.summary}</p>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {p.kpis.map(k => <KpiTile key={k.label} k={k} />)}
                  </div>
                </div>
              </section>

              {/* 活動 */}
              <section className="py-12 md:py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-20">
                  {p.activities.map((a, i) => <ActivityBlock key={a.title} a={a} index={i} />)}
                </div>
              </section>

              {/* 民眾回饋與結語 */}
              <section className="py-12 md:py-16 bg-primary text-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 md:grid md:grid-cols-2 md:gap-12 items-center">
                  <div className="flex gap-10 mb-8 md:mb-0">
                    {p.feedback.map(f => (
                      <div key={f.label}>
                        <div className="text-5xl md:text-6xl font-bold text-accent leading-none">{f.score}<span className="text-xl text-blue-200 font-medium"> / 5</span></div>
                        <div className="text-blue-100 mt-2">{f.label}</div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-blue-100 text-sm leading-relaxed mb-4">{p.feedbackNote}</p>
                    <p className="leading-relaxed">{p.closing}</p>
                  </div>
                </div>
              </section>
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};

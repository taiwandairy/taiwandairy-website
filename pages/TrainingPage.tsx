import React, { useRef, useState } from 'react';
import { TrainingResults } from '../components/TrainingResults';
import { TESTIMONIALS } from '../utils/trainingTestimonials';
import type { Testimonial } from '../utils/trainingTestimonials';

const TRAINING_PHOTOS = [
  { src: '/images/training/training-1.jpg', alt: '牧場實習 — 學員與小牛互動' },
  { src: '/images/training/training-2.jpg', alt: '超音波檢查教學實作' },
  { src: '/images/training/training-3.jpg', alt: '乳牛手術實作訓練' },
];

// 學生來自哪裡（累計受訓學員的來源校系）
const SCHOOLS_TW = [
  { name: '國立臺灣大學', count: 43 },
  { name: '國立中興大學', count: 17 },
  { name: '國立嘉義大學', count: 16 },
  { name: '亞洲大學', count: 12 },
  { name: '國立屏東科技大學', count: 8 },
  { name: '東海大學', count: 3 },
  { name: '國立宜蘭大學', count: 3 },
];

const SCHOOLS_INTL = [
  { flag: '🇦🇺', name: '墨爾本大學', count: 1 },
  { flag: '🇦🇺', name: '雪梨大學', count: 1 },
  { flag: '🇮🇪', name: '都柏林大學', count: 1 },
  { flag: '🇭🇰', name: '香港', count: 1 },
  { flag: '🇦🇺', name: '昆士蘭大學', count: null as number | null },
];

// 紀錄片《通道》（The Passage，2021，導演柯智元）
// 預告片用外連＋縮圖，不嵌 iframe（vercel.json 的 CSP 為 frame-src 'none'）
const PASSAGE_TRAILER_URL = 'https://www.youtube.com/watch?v=ly27tmEN9SU';
const PASSAGE_TRAILER_THUMB = 'https://i.ytimg.com/vi/ly27tmEN9SU/hqdefault.jpg';
const PASSAGE_PLATFORMS = [
  { name: 'HamiVideo', url: 'https://hamivideo.hinet.net/product/261230.do?cs=2' },
  { name: 'Giloo 紀實影音', url: 'https://giloo.ist/zh-TW/episodes/1263/' },
  { name: 'friDay 影音', url: 'https://video.friday.tw/movie/detail/106172' },
  { name: 'CATCHPLAY+', url: 'https://www.catchplay.com/tw/video/c7441af2-5b74-4f5b-9006-53d9914bbe9e' },
];

const TESTIMONIAL_YEARS = Array.from(new Set(TESTIMONIALS.map(t => t.year))).sort((a, b) => b - a);

const TestimonialCard: React.FC<{ t: Testimonial }> = ({ t }) => {
  const [open, setOpen] = useState(false);
  const long = t.paragraphs.join('').length > 110;
  return (
    <article className="snap-start shrink-0 w-[82%] sm:w-[340px] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      <div className="relative aspect-[8/9] bg-gray-warm">
        <img src={t.photo} alt={`${t.name}在牧場實習`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className={`relative text-sm text-gray-700 leading-relaxed space-y-3 ${open || !long ? '' : 'max-h-[8.5rem] overflow-hidden'}`}>
          {t.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          {long && !open && <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />}
        </div>
        {long && (
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            className="self-start mt-2 text-sm text-primary font-medium hover:text-accent transition"
          >
            {open ? '收合' : '…看完整心得'}
          </button>
        )}
        <div className="mt-auto pt-4">
          <div className="border-t border-gray-100 pt-3">
            <div className="text-sm font-bold text-gray-900">{t.name}</div>
            <div className="text-xs text-gray-500 mt-0.5">{t.school}｜{t.year}</div>
          </div>
        </div>
      </div>
    </article>
  );
};

const TestimonialsSection: React.FC = () => {
  const [year, setYear] = useState(TESTIMONIAL_YEARS[0]);
  const track = useRef<HTMLDivElement>(null);
  const list = TESTIMONIALS.filter(t => t.year === year);

  const pickYear = (y: number) => {
    setYear(y);
    track.current?.scrollTo({ left: 0 });
  };
  const slide = (dir: number) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.9, 720), behavior: 'smooth' });
  };

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">學生心得</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            一起看看參與牧場實習的同學們，在牧場的身影和心得回饋。
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex flex-wrap gap-2" role="group" aria-label="選擇年度">
            {TESTIMONIAL_YEARS.map(y => (
              <button
                key={y}
                type="button"
                onClick={() => pickYear(y)}
                aria-pressed={y === year}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  y === year ? 'bg-primary text-white' : 'bg-gray-warm text-gray-600 hover:bg-gray-200'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
          <div className="hidden sm:flex gap-2">
            {[-1, 1].map(dir => (
              <button
                key={dir}
                type="button"
                onClick={() => slide(dir)}
                aria-label={dir < 0 ? '上一張' : '下一張'}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary transition flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={dir < 0 ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div
          ref={track}
          className="flex items-start gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-pl-4 sm:scroll-pl-0"
        >
          {list.map(t => <TestimonialCard key={t.photo} t={t} />)}
        </div>
        <p className="text-xs text-gray-400 mt-2 sm:hidden">← 左右滑動看更多 →</p>
      </div>
    </section>
  );
};

export const TrainingPage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">人才培育</h1>
          <p className="text-blue-200 text-lg">為台灣農酪產業注入新世代專業力量</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">培育計畫簡介</h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-xl font-bold text-gray-900 mb-4">計畫背景與目標</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              2015年，台灣12萬頭乳牛，僅有20位左右乳牛獸醫師，許多甚至屆臨退休，同時年輕學子們沒有管道可以接觸現場，導致現場專業人才的匱乏，除了乳牛無法獲得足夠的醫療與日常照護，也可能衍伸乳品與肉品的食品安全。
            </p>
            <p className="text-gray-600 leading-relaxed">
              藉由牧場見實習安排，學生有機會接觸、了解牧場環境與工作型態，作為職涯規劃的評估依據，期待藉此提升未來投入產業意願，以達到酪農產業永續發展願景。
            </p>
          </div>

        </div>
      </section>

      {/* 計畫成果 */}
      <section className="py-12 md:py-20 bg-gray-warm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">計畫成果</h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              牧場人才培訓計畫自 2015 年起，歷年累計參與人次與學員回饋。
            </p>
          </div>
          <TrainingResults />
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">活動花絮</h2>
            <div className="w-20 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TRAINING_PHOTOS.map((photo, i) => (
              <div key={i} className="aspect-[4/3] bg-gray-warm rounded-xl overflow-hidden shadow-sm group">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement!;
                    parent.classList.add('flex', 'items-center', 'justify-center', 'bg-blue-50');
                    const placeholder = document.createElement('div');
                    placeholder.className = 'text-center p-4';
                    placeholder.innerHTML = `
                      <svg class="w-12 h-12 mx-auto text-blue-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p class="text-xs text-gray-400">${photo.alt}</p>
                    `;
                    parent.appendChild(placeholder);
                  }}
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 學生來自哪裡 */}
      <section className="py-12 md:py-20 bg-gray-warm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">學生來自哪裡</h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              來自台灣各地的獸醫與動物科學學生，以及越來越多來自海外的學員。
            </p>
          </div>

          {/* 台灣 */}
          <div className="mb-10">
            <h3 className="text-sm font-bold text-gray-500 tracking-wider mb-4">台灣</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {SCHOOLS_TW.map((s, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-4">
                  <div className="text-base font-bold text-gray-900">{s.name}</div>
                  <div className="text-xs text-gray-500 mt-1">累計 {s.count} 位學員</div>
                </div>
              ))}
            </div>
          </div>

          {/* 海外 */}
          <div>
            <h3 className="text-sm font-bold text-gray-500 tracking-wider mb-4">海外</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {SCHOOLS_INTL.map((s, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-4">
                  <div className="text-lg mb-1">{s.flag}</div>
                  <div className="text-base font-bold text-gray-900">{s.name}</div>
                  {s.count !== null && <div className="text-xs text-gray-500 mt-1">累計 {s.count} 位學員</div>}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 leading-relaxed">
              數字為累計參與牧場實習的學員人數。國際交流的更多內容，見{' '}
              <a href="#exchange" className="text-primary font-medium hover:underline">產業交流</a> 分頁。
            </p>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* 紀錄片《通道》 */}
      <section className="py-12 md:py-20 bg-gray-warm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">紀錄片《通道》</h2>
            <div className="w-20 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
            <a
              href={PASSAGE_TRAILER_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="在 YouTube 觀看《通道》預告片（另開新視窗）"
              className="relative block aspect-video rounded-2xl overflow-hidden shadow-md bg-gray-900 group"
            >
              <img
                src={PASSAGE_TRAILER_THUMB}
                alt="紀錄片《通道》預告片畫面"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition">
                <span className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            </a>

            <div>
              <div className="text-xs font-bold tracking-wider text-accent mb-2">The Passage · 2021 新北市紀錄片獎優選影片</div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">通道</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                2021 年的台灣紀錄短片，由柯智元執導，全片約 29 分鐘，記錄大動物獸醫師龔建嘉在牧場現場的工作與日常，帶觀眾看見乳牛獸醫這份工作的樣貌。
              </p>
              <a
                href={PASSAGE_TRAILER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition"
              >
                觀看預告片
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-8 leading-relaxed text-center">
            完整影片可於以下線上平台觀賞：
            {PASSAGE_PLATFORMS.map((p, i) => (
              <React.Fragment key={p.url}>
                {i > 0 && '、'}
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline whitespace-nowrap">
                  {p.name}
                </a>
              </React.Fragment>
            ))}
          </p>
        </div>
      </section>
    </div>
  );
};

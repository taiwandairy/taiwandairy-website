import React from 'react';

const TRAINING_PHOTOS = [
  { src: '/images/training/training-1.jpg', alt: '牧場實習 — 學員與小牛互動' },
  { src: '/images/training/training-2.jpg', alt: '超音波檢查教學實作' },
  { src: '/images/training/training-3.jpg', alt: '乳牛手術實作訓練' },
];

const ANNUAL_REPORTS = [
  { year: 2025, title: '114 年度人才培育計畫成果報告', link: '#' },
  { year: 2024, title: '113 年度人才培育計畫成果報告', link: '#' },
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
  { flag: '🇦🇺', name: '昆士蘭大學', count: null },
];

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

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 max-w-lg mx-auto">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-3xl font-black text-primary mb-2">100+</div>
              <div className="text-sm text-gray-600">累計受訓學員</div>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-3xl font-black text-primary mb-2">20+</div>
              <div className="text-sm text-gray-600">合作專家講師</div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-12 md:py-20 bg-gray-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">活動花絮</h2>
            <div className="w-20 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TRAINING_PHOTOS.map((photo, i) => (
              <div key={i} className="aspect-[4/3] bg-white rounded-xl overflow-hidden shadow-sm group">
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
      <section className="py-12 md:py-20">
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
                <div key={i} className="relative bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-4">
                  <span className="absolute top-3 right-3 text-xs font-bold text-accent bg-gray-warm rounded-full px-2 py-0.5">{s.count}</span>
                  <div className="text-base font-bold text-gray-900 pr-8">{s.name}</div>
                  <div className="text-xs text-gray-400 mt-1">累計 {s.count} 位學員</div>
                </div>
              ))}
            </div>
          </div>

          {/* 海外 */}
          <div>
            <h3 className="text-sm font-bold text-gray-500 tracking-wider mb-4">海外</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {SCHOOLS_INTL.map((s, i) => (
                <div key={i} className="relative bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-4">
                  {s.count !== null && (
                    <span className="absolute top-3 right-3 text-xs font-bold text-accent bg-gray-warm rounded-full px-2 py-0.5">{s.count}</span>
                  )}
                  <div className="text-lg mb-1">{s.flag}</div>
                  <div className="text-base font-bold text-gray-900 pr-8">{s.name}</div>
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

      {/* Annual Reports */}
      <section className="py-12 md:py-20 bg-gray-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">歷年成果報告</h2>
            <div className="w-20 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="space-y-4">
            {ANNUAL_REPORTS.map((report, i) => (
              <a
                key={i}
                href={report.link}
                className="flex items-center gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:border-primary hover:shadow-md transition group"
              >
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary transition">{report.title}</h3>
                  <p className="text-sm text-gray-400">{report.year} 年度</p>
                </div>
                <svg className="w-5 h-5 text-gray-300 group-hover:text-primary transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
            ))}
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            報告連結待更新，檔案上傳後即可下載。
          </p>
        </div>
      </section>
    </div>
  );
};

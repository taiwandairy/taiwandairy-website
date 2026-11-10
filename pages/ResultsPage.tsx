import React, { useState } from 'react';
import { useSheetData } from '../hooks/useSheetData';
import { fetchResults, isExternalLink } from '../utils/sheets';
import type { YearResults, ResultEvent } from '../utils/sheets';

// 資料來源：官網 CMS 試算表「年度成果」分頁（一個年度一個分頁籤；指標＝最上方大數字，活動＝時間軸節點）
// 只放可對外公開的內容：不放經費明細、委託廠商、聯絡電話、簽到與領據等文件

// 直式海報用 contain、照片用 cover
const EventImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [portrait, setPortrait] = useState(false);
  return (
    <div className={`rounded-xl overflow-hidden shadow-md ${portrait ? 'bg-gray-warm' : ''}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={e => setPortrait(e.currentTarget.naturalHeight > e.currentTarget.naturalWidth)}
        className={`w-full h-56 md:h-64 ${portrait ? 'object-contain' : 'object-cover'}`}
      />
    </div>
  );
};

const EventItem: React.FC<{ e: ResultEvent; imageRight: boolean }> = ({ e, imageRight }) => (
  <li className="relative pl-12 md:pl-0 mb-12 md:mb-16 last:mb-0">
    <div className="absolute left-4 md:left-1/2 top-1 -translate-x-1/2 z-10">
      <span className="flex items-center justify-center w-4 h-4 rounded-full bg-accent ring-4 ring-white" />
    </div>
    <div className="md:grid md:grid-cols-2 md:gap-12 items-start">
      <div className={`${imageRight ? 'md:order-1 md:text-right' : 'md:order-2'} mb-4 md:mb-0`}>
        {e.date && <div className="text-sm font-semibold text-accent mb-1">{e.date}</div>}
        <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">{e.title}</h3>
        {e.summary && <p className="text-gray-600 leading-relaxed">{e.summary}</p>}
        {e.organizer && <p className="text-xs text-gray-500 mt-2">舉辦單位｜{e.organizer}</p>}
        {e.link && (
          <a
            href={e.link}
            {...(isExternalLink(e.link) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="inline-block mt-3 text-sm font-medium text-primary hover:text-accent transition"
          >
            了解更多 →
          </a>
        )}
      </div>
      <div className={imageRight ? 'md:order-2' : 'md:order-1'}>
        {e.image && <EventImage src={e.image} alt={e.title} />}
      </div>
    </div>
  </li>
);

const YearView: React.FC<{ y: YearResults }> = ({ y }) => (
  <>
    {y.kpis.length > 0 && (
      <section className="py-12 md:py-14 bg-gray-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{y.year} 年度總覽</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {y.kpis.map(k => (
              <div key={k.label} className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100">
                <div className="text-3xl md:text-4xl font-bold text-accent leading-none mb-2 whitespace-nowrap">{k.value}</div>
                <div className="text-sm md:text-base font-semibold text-gray-900">{k.label}</div>
                {k.note && <div className="text-xs text-gray-500 mt-1">{k.note}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    )}
    <section className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">{y.year} 活動紀事</h2>
        <ol className="relative">
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-0.5 bg-blue-100 md:-translate-x-1/2" aria-hidden="true" />
          {y.events.map((e, i) => <EventItem key={e.title + e.date} e={e} imageRight={i % 2 === 1} />)}
        </ol>
      </div>
    </section>
  </>
);

export const ResultsPage: React.FC = () => {
  const { data: years, loading, error } = useSheetData<YearResults>('results', fetchResults);
  const [picked, setPicked] = useState<string | null>(null);
  const current = years.find(y => y.year === picked) || years[0];
  const status = loading ? '載入中…' : error ? '年度成果暫時無法載入，請稍後再試。' : '';

  return (
    <div>
      {/* Hero＋年度分頁籤 */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">年度成果</h1>
          <p className="text-blue-200 text-lg pb-8">協會每年推動的計畫與活動成果</p>
          <div className="flex gap-1 overflow-x-auto" role="tablist">
            {years.map(y => {
              const active = current?.year === y.year;
              return (
                <button
                  key={y.year}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setPicked(y.year)}
                  className={`px-6 py-3 rounded-t-lg text-base font-semibold transition ${
                    active ? 'bg-gray-warm text-primary' : 'text-blue-100 hover:bg-white/10'
                  }`}
                >
                  {y.year}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {status && <p className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-500">{status}</p>}
      {current && <YearView y={current} />}
    </div>
  );
};

import React, { useState } from 'react';
import { useSheetData } from '../hooks/useSheetData';
import { fetchPromotionItems, safeHttpUrl } from '../utils/sheets';
import type { SheetPromotionItem } from '../utils/sheets';

export const PromotionPage: React.FC = () => {
  const { data: items, loading, error } = useSheetData('promotion', fetchPromotionItems);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">推廣活動</h1>
          <p className="text-blue-200 text-lg">彙整全台鮮乳推廣行銷活動，一起支持國產鮮乳</p>
        </div>
      </section>

      {/* Promotion List */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                  <div className="h-44 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && items.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {items.map((item, i) => (
                <PromotionCard key={i} item={item} />
              ))}
            </div>
          )}

          {!loading && items.length === 0 && !error && (
            <div className="p-8 bg-cream rounded-xl border border-yellow-200 text-center">
              <p className="text-gray-600">推廣活動資訊即將上線，敬請期待。</p>
            </div>
          )}

          {error && (
            <div className="p-8 bg-red-50 rounded-xl border border-red-200 text-center">
              <p className="text-gray-600">資料載入失敗，請稍後再試。</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const PromotionCard: React.FC<{ item: SheetPromotionItem }> = ({ item }) => {
  // 圖片來源是各主辦單位的外部連結，掛掉時整塊隱藏、卡片降級為純文字版
  const [imgFailed, setImgFailed] = useState(false);
  const img = safeHttpUrl(item.image);
  const link = safeHttpUrl(item.link);

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      {img && !imgFailed && (
        <div className="h-44 overflow-hidden bg-gray-100">
          <img
            src={img}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover"
            onError={() => setImgFailed(true)}
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {item.organizer && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
              {item.organizer}
            </span>
          )}
          {item.region && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
              {item.region}
            </span>
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h2>
        <time className="text-sm text-gray-400 mb-3 block">{item.period || item.date}</time>
        <p className="text-gray-600 leading-relaxed mb-4 whitespace-pre-line flex-1">{item.summary}</p>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition self-start"
          >
            活動資訊
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
};

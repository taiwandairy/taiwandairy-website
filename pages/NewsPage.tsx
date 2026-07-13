import React from 'react';
import { useSheetData } from '../hooks/useSheetData';
import { fetchNewsItems, safeHttpUrl } from '../utils/sheets';

export const NewsPage: React.FC = () => {
  const { data: news, loading, error } = useSheetData('news', fetchNewsItems);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">會務新知</h1>
          <p className="text-blue-200 text-lg">掌握協會最新動態與活動資訊</p>
        </div>
      </section>

      {/* News List */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="space-y-6">
              {[1, 2].map(i => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          )}

          {!loading && news.length > 0 && (
            <div className="space-y-6">
              {news.map((item, i) => (
                <article key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    {item.tag && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {item.tag}
                      </span>
                    )}
                    <time className="text-sm text-gray-400">{item.date}</time>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-4 whitespace-pre-line">{item.summary}</p>
                  {safeHttpUrl(item.link) && (
                    <a
                      href={safeHttpUrl(item.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition"
                    >
                      {item.linkText}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </article>
              ))}
            </div>
          )}

          {!loading && news.length === 0 && !error && (
            <div className="p-8 bg-cream rounded-xl border border-yellow-200 text-center">
              <svg className="w-12 h-12 mx-auto text-accent mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <p className="text-gray-600">未來將持續更新協會活動公告與新聞稿。</p>
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

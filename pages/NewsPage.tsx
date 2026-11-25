import React, { useMemo, useState } from 'react';
import { useSheetData } from '../hooks/useSheetData';
import { fetchNewsItems, safeLinkUrl, isExternalLink } from '../utils/sheets';

export const NewsPage: React.FC = () => {
  const { data: news, loading, error } = useSheetData('news', fetchNewsItems);
  const [tag, setTag] = useState('');
  const [keyword, setKeyword] = useState('');

  // 分類選項取自後台「標籤」欄，依出現順序去重
  const tags = useMemo(() => Array.from(new Set(news.map(n => n.tag).filter(Boolean))), [news]);
  const filtered = useMemo(() => {
    const words = keyword.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return news.filter(n => {
      if (tag && n.tag !== tag) return false;
      const text = `${n.title} ${n.summary} ${n.tag} ${n.date}`.toLowerCase();
      return words.every(w => text.includes(w));
    });
  }, [news, tag, keyword]);
  const isFiltering = tag !== '' || keyword.trim() !== '';
  const chip = (active: boolean) =>
    `px-4 py-1.5 rounded-full text-sm font-medium border transition ${
      active ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
    }`;

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
            <div className="mb-8">
              <div className="relative mb-4">
                <svg className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                </svg>
                <input
                  type="search"
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  placeholder="輸入關鍵字查詢公告（例如：遴選要點、核定）"
                  aria-label="關鍵字查詢"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2" role="group" aria-label="公告分類">
                  <button type="button" onClick={() => setTag('')} aria-pressed={tag === ''} className={chip(tag === '')}>全部</button>
                  {tags.map(t => (
                    <button key={t} type="button" onClick={() => setTag(t)} aria-pressed={tag === t} className={chip(tag === t)}>{t}</button>
                  ))}
                </div>
              )}
              <p className="text-sm text-gray-500 mt-4" aria-live="polite">
                {isFiltering ? `查詢結果：共 ${filtered.length} 則` : `共 ${news.length} 則`}
                {isFiltering && (
                  <button type="button" onClick={() => { setTag(''); setKeyword(''); }} className="ml-3 text-primary hover:underline">清除條件</button>
                )}
              </p>
            </div>
          )}

          {!loading && news.length > 0 && filtered.length === 0 && (
            <div className="p-8 bg-gray-50 rounded-xl border border-gray-200 text-center">
              <p className="text-gray-600">找不到符合條件的公告，請換個關鍵字或分類。</p>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="space-y-6">
              {filtered.map((item, i) => {
                const link = safeLinkUrl(item.link);
                const external = isExternalLink(link);
                return (
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
                  {link && (
                    <a
                      href={link}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition"
                    >
                      {item.linkText}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </article>
                );
              })}
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

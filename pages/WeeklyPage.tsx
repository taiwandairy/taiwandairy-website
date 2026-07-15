import React, { useMemo } from 'react';
import { useSheetData } from '../hooks/useSheetData';
import { fetchWeeklyItems, safeHttpUrl } from '../utils/sheets';
import type { SheetWeeklyItem } from '../utils/sheets';

interface WeeklyIssue {
  weekDate: string;
  international: SheetWeeklyItem[];
  taiwan: SheetWeeklyItem[];
  total: number;
}

const WeeklyCard: React.FC<{ item: SheetWeeklyItem }> = ({ item }) => {
  const isInternational = item.section.includes('國際');
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            isInternational ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
          }`}
        >
          {isInternational ? '國際' : '台灣'}
        </span>
        {item.source && <span className="text-sm text-gray-400">{item.source}</span>}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
      <p className="text-gray-600 leading-relaxed whitespace-pre-line">{item.summary}</p>
      {safeHttpUrl(item.link) && (
        <a
          href={safeHttpUrl(item.link)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition"
        >
          閱讀原文
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}
    </article>
  );
};

export const WeeklyPage: React.FC = () => {
  const { data: items, loading, error } = useSheetData('weekly', fetchWeeklyItems);

  // 依週報日期分組成一期一期，fetchWeeklyItems 已由新到舊排序，分組後順序不變
  const issues = useMemo<WeeklyIssue[]>(() => {
    const map = new Map<string, WeeklyIssue>();
    items.forEach(item => {
      let issue = map.get(item.weekDate);
      if (!issue) {
        issue = { weekDate: item.weekDate, international: [], taiwan: [], total: 0 };
        map.set(item.weekDate, issue);
      }
      if (item.section.includes('國際')) {
        issue.international.push(item);
      } else {
        issue.taiwan.push(item);
      }
      issue.total++;
    });
    return Array.from(map.values());
  }, [items]);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">乳業週報</h1>
          <p className="text-blue-200 text-lg">每週一發送的乳業情報彙整：國際乳業動態與台灣產業、品牌、通路消息</p>
        </div>
      </section>

      {/* Weekly Issues */}
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

          {!loading && issues.length > 0 && (
            <div className="space-y-12">
              {issues.map(issue => (
                <div key={issue.weekDate}>
                  {/* 期別標頭 */}
                  <div className="flex flex-wrap items-baseline gap-3 mb-6 pb-3 border-b-2 border-primary">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {issue.weekDate.replace(/-/g, '/')} 當期週報
                    </h2>
                    <span className="text-sm text-gray-400">共 {issue.total} 則</span>
                  </div>

                  {issue.international.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">🌍 國際乳業動態</h3>
                      <div className="space-y-6">
                        {issue.international.map((item, i) => (
                          <WeeklyCard key={i} item={item} />
                        ))}
                      </div>
                    </div>
                  )}

                  {issue.taiwan.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">🇹🇼 台灣乳業</h3>
                      <div className="space-y-6">
                        {issue.taiwan.map((item, i) => (
                          <WeeklyCard key={i} item={item} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {!loading && issues.length === 0 && !error && (
            <div className="p-8 bg-cream rounded-xl border border-yellow-200 text-center">
              <svg className="w-12 h-12 mx-auto text-accent mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <p className="text-gray-600">週報典藏建置中，敬請期待。</p>
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

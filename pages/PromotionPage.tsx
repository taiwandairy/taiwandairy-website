import React, { useMemo, useState } from 'react';
import { useSheetData } from '../hooks/useSheetData';
import { fetchPromotionItems, safeHttpUrl } from '../utils/sheets';
import type { SheetPromotionItem } from '../utils/sheets';

// 月份 key 一律用本地時區組 YYYY-MM（沿用 fetchPromotionItems 的 local-date 慣例，避免 UTC 差 8 小時）
const monthKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;

const shiftMonth = (key: string, delta: number) => {
  const [y, m] = key.split('-').map(Number);
  return monthKey(new Date(y, m - 1 + delta, 1));
};

export const PromotionPage: React.FC = () => {
  const { data: items, loading, error } = useSheetData('promotion', fetchPromotionItems);
  const [zoom, setZoom] = useState<{ src: string; name: string } | null>(null);
  const [viewMonth, setViewMonth] = useState(() => monthKey(new Date()));

  // 依「日期」欄（活動開始日）分桶到月份；跨月活動只出現在開始月（活動期間為自由文字，不解析）
  const byMonth = useMemo(() => {
    const map = new Map<string, SheetPromotionItem[]>();
    for (const item of items) {
      const key = item.date.slice(0, 7);
      if (!/^\d{4}-\d{2}$/.test(key)) continue;
      const bucket = map.get(key) ?? [];
      bucket.push(item);
      map.set(key, bucket);
    }
    // 單月檢視內依日期升冪（照時間順序），與全域排序（已開始最新在上）不同
    for (const bucket of map.values()) {
      bucket.sort((a, b) => a.date.localeCompare(b.date));
    }
    return map;
  }, [items]);

  const monthItems = byMonth.get(viewMonth) ?? [];
  const activityDays = useMemo(
    () => new Set(monthItems.map(item => Number(item.date.slice(8, 10)))),
    [monthItems]
  );

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">台灣鮮乳推廣活動</h1>
          <p className="text-blue-200 text-lg">彙整全台鮮乳推廣行銷活動，一起支持國產鮮乳</p>
        </div>
      </section>

      {/* Promotion List */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {!error && (
            <MonthCalendar
              month={viewMonth}
              activityDays={activityDays}
              count={monthItems.length}
              onShift={delta => setViewMonth(prev => shiftMonth(prev, delta))}
            />
          )}

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

          {!loading && monthItems.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {monthItems.map((item, i) => (
                <PromotionCard key={i} item={item} onZoom={(src, name) => setZoom({ src, name })} />
              ))}
            </div>
          )}

          {!loading && !error && items.length > 0 && monthItems.length === 0 && (
            <div className="p-8 bg-cream rounded-xl border border-yellow-200 text-center">
              <p className="text-gray-600">本月尚無活動，可用月曆箭頭查看其他月份。</p>
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

      {/* 圖片放大 lightbox（沿用 TastingPage 模式）：卡片縮圖有裁切，點圖看完整海報 */}
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
          <img src={zoom.src} alt={zoom.name} className="max-w-full max-h-[90vh] rounded-lg shadow-2xl" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
};

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

const MonthCalendar: React.FC<{
  month: string;
  activityDays: Set<number>;
  count: number;
  onShift: (delta: number) => void;
}> = ({ month, activityDays, count, onShift }) => {
  const [y, m] = month.split('-').map(Number);
  const firstWeekday = new Date(y, m - 1, 1).getDay();
  const daysInMonth = new Date(y, m, 0).getDate();
  const now = new Date();
  const today = now.getFullYear() === y && now.getMonth() + 1 === m ? now.getDate() : 0;
  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="max-w-md mx-auto mb-10 md:mb-14">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => onShift(-1)}
            aria-label="上個月"
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-primary transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-bold text-gray-900">{y} 年 {m} 月</h2>
          <button
            type="button"
            onClick={() => onShift(1)}
            aria-label="下個月"
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-primary transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-7 text-center text-xs text-gray-400 mb-1">
          {WEEKDAYS.map(w => (
            <div key={w} className="py-1">{w}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 text-center">
          {cells.map((d, i) =>
            d === null ? (
              <div key={i} />
            ) : (
              <div key={i} className="relative py-1">
                <span
                  className={`inline-flex w-8 h-8 items-center justify-center rounded-full text-sm ${
                    activityDays.has(d) ? 'font-bold text-primary' : 'text-gray-600'
                  } ${d === today ? 'ring-2 ring-accent' : ''}`}
                >
                  {d}
                </span>
                {activityDays.has(d) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent"></span>
                )}
              </div>
            )
          )}
        </div>
      </div>
      <p className="text-center text-sm text-gray-500 mt-3">本月 {count} 場活動</p>
    </div>
  );
};

const PromotionCard: React.FC<{
  item: SheetPromotionItem;
  onZoom: (src: string, name: string) => void;
}> = ({ item, onZoom }) => {
  // 圖片來源是各主辦單位的外部連結，掛掉時整塊隱藏、卡片降級為純文字版
  const [imgFailed, setImgFailed] = useState(false);
  // 直式海報（多為場次表／文字資訊型）橫幅裁切會看不到內容，改放卡片左側長條欄
  const [portrait, setPortrait] = useState(false);
  const img = safeHttpUrl(item.image);
  const link = safeHttpUrl(item.link);
  const showImg = img && !imgFailed;

  return (
    <article
      className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col ${
        showImg && portrait ? 'sm:flex-row' : ''
      }`}
    >
      {showImg && (
        <button
          type="button"
          onClick={() => onZoom(img, item.name)}
          aria-label={`放大檢視「${item.name}」活動圖片`}
          className={`relative overflow-hidden bg-gray-100 cursor-zoom-in group flex-shrink-0 ${
            portrait ? 'h-56 sm:h-auto sm:w-44 sm:self-stretch' : 'h-44'
          }`}
        >
          <img
            src={img}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover"
            onLoad={e => {
              const t = e.currentTarget;
              if (t.naturalHeight > t.naturalWidth * 1.15) setPortrait(true);
            }}
            onError={() => setImgFailed(true)}
          />
          <span className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-black/45 text-white flex items-center justify-center group-hover:bg-black/65 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0zM11 8v6M8 11h6" />
            </svg>
          </span>
        </button>
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

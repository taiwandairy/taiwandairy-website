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

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// 活動有效區間：「結束日期」空白、格式錯或早於開始日 → 視同單日活動
const itemRange = (item: SheetPromotionItem): [string, string] => {
  const start = item.date;
  const end = DATE_RE.test(item.endDate) && item.endDate >= start ? item.endDate : start;
  return [start, end];
};

// 活動區間是否觸及某月（跨月活動出現在每個有交集的月份）
const touchesMonth = (item: SheetPromotionItem, month: string) => {
  const [start, end] = itemRange(item);
  return start.slice(0, 7) <= month && month <= end.slice(0, 7);
};

const daysInMonth = (month: string) => {
  const [y, m] = month.split('-').map(Number);
  return new Date(y, m, 0).getDate();
};

const spanDays = (start: string, end: string) =>
  Math.round((Date.parse(end) - Date.parse(start)) / 86400000) + 1;

// 該月要打點的日期：活動區間與該月交集的每一天；超過 31 天的長期活動只點開始日（避免整月塗滿）
const activityDaysOf = (items: SheetPromotionItem[], month: string): Set<number> => {
  const days = new Set<number>();
  const monthStart = `${month}-01`;
  const monthEnd = `${month}-${String(daysInMonth(month)).padStart(2, '0')}`;
  for (const item of items) {
    if (!touchesMonth(item, month)) continue;
    const [start, end] = itemRange(item);
    if (spanDays(start, end) > 31) {
      if (start.slice(0, 7) === month) days.add(Number(start.slice(8, 10)));
      continue;
    }
    const from = start > monthStart ? start : monthStart;
    const to = end < monthEnd ? end : monthEnd;
    for (let d = Number(from.slice(8, 10)); d <= Number(to.slice(8, 10)); d++) days.add(d);
  }
  return days;
};

export const PromotionPage: React.FC = () => {
  const { data: items, loading, error } = useSheetData('promotion', fetchPromotionItems);
  const [zoom, setZoom] = useState<{ src: string; name: string } | null>(null);
  const [viewMonth, setViewMonth] = useState(() => monthKey(new Date()));

  // 雙月檢視：同時顯示 [起始月, 下一月]，箭頭一次移動一個月
  const months = [viewMonth, shiftMonth(viewMonth, 1)];

  const view = useMemo(() => {
    const valid = items.filter(item => DATE_RE.test(item.date));
    const list = valid
      .filter(item => months.some(month => touchesMonth(item, month)))
      .sort((a, b) => a.date.localeCompare(b.date));
    return {
      list,
      counts: months.map(month => valid.filter(item => touchesMonth(item, month)).length),
      dots: months.map(month => activityDaysOf(valid, month)),
    };
    // months 由 viewMonth 唯一決定
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, viewMonth]);

  const [y1, m1] = months[0].split('-').map(Number);
  const [y2, m2] = months[1].split('-').map(Number);
  const rangeLabel = y1 === y2 ? `${y1} 年 ${m1} 月 – ${m2} 月` : `${y1} 年 ${m1} 月 – ${y2} 年 ${m2} 月`;

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
            <div className="max-w-3xl mx-auto mb-10 md:mb-14">
              <div className="flex items-center justify-between mb-4 px-1">
                <button
                  type="button"
                  onClick={() => setViewMonth(prev => shiftMonth(prev, -1))}
                  aria-label="上個月"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-primary transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="text-lg font-bold text-gray-900">{rangeLabel}</h2>
                <button
                  type="button"
                  onClick={() => setViewMonth(prev => shiftMonth(prev, 1))}
                  aria-label="下個月"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-primary transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {months.map((month, i) => (
                  <MonthCalendar key={month} month={month} activityDays={view.dots[i]} />
                ))}
              </div>
              <p className="text-center text-sm text-gray-500 mt-3">
                {m1} 月 {view.counts[0]} 場・{m2} 月 {view.counts[1]} 場
              </p>
            </div>
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

          {!loading && view.list.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {view.list.map((item, i) => (
                <PromotionCard key={i} item={item} onZoom={(src, name) => setZoom({ src, name })} />
              ))}
            </div>
          )}

          {!loading && !error && items.length > 0 && view.list.length === 0 && (
            <div className="p-8 bg-cream rounded-xl border border-yellow-200 text-center">
              <p className="text-gray-600">這兩個月尚無活動，可用月曆箭頭查看其他月份。</p>
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
}> = ({ month, activityDays }) => {
  const [y, m] = month.split('-').map(Number);
  const firstWeekday = new Date(y, m - 1, 1).getDay();
  const totalDays = daysInMonth(month);
  const now = new Date();
  const today = now.getFullYear() === y && now.getMonth() + 1 === m ? now.getDate() : 0;
  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <h3 className="text-center text-base font-bold text-gray-900 mb-3">{y} 年 {m} 月</h3>
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

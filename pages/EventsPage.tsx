import React from 'react';
import { useSheetData } from '../hooks/useSheetData';
import { fetchEventItems, safeImageSrc } from '../utils/sheets';
import type { SheetEventItem } from '../utils/sheets';

const BADGE: Record<SheetEventItem['status'], string> = {
  open: 'bg-green-100 text-green-800',
  soon: 'bg-yellow-100 text-yellow-800',
  closed: 'bg-gray-100 text-gray-600',
};

const Meta: React.FC<{ label: string; value: string }> = ({ label, value }) =>
  value ? (
    <div className="flex gap-3">
      <dt className="w-16 flex-shrink-0 text-gray-400">{label}</dt>
      <dd className="text-gray-700">{value}</dd>
    </div>
  ) : null;

const EventCard: React.FC<{ item: SheetEventItem }> = ({ item }) => {
  const image = safeImageSrc(item.image);
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden md:flex">
      {image && (
        <img src={image} alt="" loading="lazy" className="w-full md:w-64 h-48 md:h-auto object-cover flex-shrink-0" />
      )}
      <div className="p-6 flex-1 min-w-0">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${BADGE[item.status]}`}>
          {item.statusLabel}
        </span>
        <h2 className="text-xl font-bold text-gray-900 mb-4">{item.name}</h2>
        <dl className="space-y-1.5 text-sm mb-4">
          <Meta label="日期" value={[item.date, item.time].filter(Boolean).join('　')} />
          <Meta label="地點" value={item.place} />
          <Meta label="對象" value={item.audience} />
          <Meta label="名額" value={item.quota} />
          <Meta label="報名截止" value={item.deadline} />
        </dl>
        {item.description && (
          <p className="text-gray-600 leading-relaxed mb-5 whitespace-pre-line">{item.description}</p>
        )}
        {item.status === 'open' ? (
          <a
            href={item.formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-light transition"
          >
            我要報名
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ) : (
          <span className="inline-block px-5 py-2.5 bg-gray-100 text-gray-500 rounded-lg text-sm font-semibold">
            {item.status === 'soon' ? '報名表單準備中' : '已停止報名'}
          </span>
        )}
      </div>
    </article>
  );
};

export const EventsPage: React.FC = () => {
  const { data: events, loading, error } = useSheetData('events', fetchEventItems);
  const current = events.filter(e => e.status !== 'closed');
  const closed = events.filter(e => e.status === 'closed').slice(0, 6);

  return (
    <div>
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">活動報名</h1>
          <p className="text-blue-200 text-lg">協會論壇、課程與參訪活動，線上填表即可報名</p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
              <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          )}

          {!loading && !error && current.length > 0 && (
            <div className="space-y-6">
              {current.map((item, i) => <EventCard key={i} item={item} />)}
            </div>
          )}

          {!loading && !error && current.length === 0 && (
            <div className="p-8 bg-cream rounded-xl border border-yellow-200 text-center">
              <p className="text-gray-700 font-medium mb-1">目前沒有開放報名的活動</p>
              <p className="text-gray-600 text-sm">
                新活動開放報名時會公告在這裡，也可以到
                <a href="#news" className="text-primary font-medium hover:underline mx-1">會務新知</a>
                查看最新消息。
              </p>
            </div>
          )}

          {!loading && !error && closed.length > 0 && (
            <div className="mt-14">
              <h2 className="text-lg font-bold text-gray-900 mb-4">已截止的活動</h2>
              <div className="space-y-6 opacity-80">
                {closed.map((item, i) => <EventCard key={i} item={item} />)}
              </div>
            </div>
          )}

          {error && (
            <div className="p-8 bg-red-50 rounded-xl border border-red-200 text-center">
              <p className="text-gray-600">資料載入失敗，請稍後再試。</p>
            </div>
          )}

          {!loading && !error && (
            <p className="text-xs text-gray-400 mt-10 leading-relaxed">
              報名表單使用 Google 表單。您填寫的資料僅供本次活動的聯繫、名額確認與統計使用，不會另作他用。
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

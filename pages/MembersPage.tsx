import React from 'react';
import { useSheetData } from '../hooks/useSheetData';
import { fetchMembers } from '../utils/sheets';
import type { SheetMember } from '../utils/sheets';

// 資料來源：官網 CMS 試算表「協會會員」分頁（個人與專家會員不公開列出）
const MemberCard: React.FC<{ m: SheetMember }> = ({ m }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
    <div className="h-36 flex items-center justify-center bg-white border-b border-gray-100 px-8 py-5">
      {m.logo ? (
        <img src={m.logo} alt={`${m.name} logo`} loading="lazy" className="max-h-full max-w-full object-contain" />
      ) : (
        <span className="text-2xl font-bold text-primary/70 tracking-wide">{m.name}</span>
      )}
    </div>
    <div className="p-5 flex-1 flex flex-col">
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <h3 className="text-lg font-bold text-gray-900">{m.name}</h3>
        <span className="text-xs text-gray-500 whitespace-nowrap">{m.region}</span>
      </div>
      <p className="text-xs text-gray-400 mb-3">{m.org}</p>
      {m.brands.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {m.brands.map(b => (
            <span key={b} className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-primary">{b}</span>
          ))}
        </div>
      )}
      {m.links.length > 0 && (
        <div className="flex gap-4 mt-auto pt-1 text-sm">
          {m.links.map(l => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent font-medium transition">
              {l.label} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  </div>
);

export const MembersPage: React.FC = () => {
  const { data: members, loading, error } = useSheetData<SheetMember>('members', fetchMembers);
  const dairyMembers = members.filter(m => m.category === 'dairy');
  const partnerMembers = members.filter(m => m.category === 'partner');
  const status = loading ? '載入中…' : error ? '會員資料暫時無法載入，請稍後再試。' : '';

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">協會會員</h1>
          <p className="text-blue-200 text-lg">一起為台灣鮮乳努力的牧場、乳品牌與產業夥伴</p>
        </div>
      </section>

      {/* 牧場／乳品品牌 */}
      <section className="py-12 md:py-16 bg-gray-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">牧場・乳品品牌</h2>
              <p className="text-gray-600">{dairyMembers.length} 家會員，旗下 {dairyMembers.reduce((n, m) => n + m.brands.length, 0)} 個鮮乳品牌</p>
            </div>
            <a href="#dairy" className="text-sm font-medium text-primary hover:text-accent transition">在特色乳地圖上看乳源分布 →</a>
          </div>
          {status && <p className="text-gray-500">{status}</p>}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dairyMembers.map(m => <MemberCard key={m.name + m.org} m={m} />)}
          </div>
        </div>
      </section>

      {/* 產業相關夥伴 */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">產業相關夥伴</h2>
          <p className="text-gray-600 mb-8">從數位服務到風味專業，支持酪農產業的夥伴</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partnerMembers.map(m => <MemberCard key={m.name + m.org} m={m} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">成為協會會員</h2>
          <p className="text-blue-200 mb-6">歡迎牧場、乳品牌與產業夥伴加入，一起推動台灣農酪產業永續發展。</p>
          <a href="#join" className="inline-block px-6 py-3 rounded-lg bg-accent text-white font-semibold hover:opacity-90 transition">了解入會方式</a>
        </div>
      </section>
    </div>
  );
};

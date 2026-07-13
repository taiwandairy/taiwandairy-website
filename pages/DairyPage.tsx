import React, { useMemo, useState } from 'react';
import { useSheetData } from '../hooks/useSheetData';
import { fetchDairyBrands } from '../utils/sheets';
import type { SheetDairyBrand } from '../utils/sheets';
import { TaiwanMap } from '../components/TaiwanMap';

const REGION_ORDER = [
  '基隆', '台北', '新北', '桃園', '新竹', '苗栗', '台中', '南投', '彰化',
  '雲林', '嘉義', '台南', '高雄', '屏東', '台東', '花蓮', '宜蘭',
];

const CERT_STYLE: { match: string; cls: string }[] = [
  { match: '鮮乳標章', cls: 'bg-blue-100 text-blue-700' },
  { match: '產銷履歷', cls: 'bg-green-100 text-green-700' },
  { match: '動物福利', cls: 'bg-amber-100 text-amber-700' },
  { match: 'CAS', cls: 'bg-rose-100 text-rose-700' },
];
// 尚未取得、仍在申請/認證中的標章
function isPendingCert(cert: string): boolean {
  return /認證中|審核中|申請中|進行中/.test(cert);
}
function certClass(cert: string): string {
  if (isPendingCert(cert)) return 'bg-gray-100 text-gray-400';
  return CERT_STYLE.find(c => cert.includes(c.match))?.cls || 'bg-gray-100 text-gray-700';
}
// 「認證中」統一顯示為「審核中」
function certLabel(cert: string): string {
  return cert.replace(/認證中|申請中|進行中/g, '審核中');
}

// 卡片占位圖配色（之後表單補上品牌照片可替換）
const CARD_GRADIENTS = [
  'from-[#1E2D4E] to-[#3B6B8A]',
  'from-[#558B2F] to-[#8BC34A]',
  'from-[#3B6B8A] to-[#6BA3C4]',
  'from-[#8a6d1f] to-[#D4A017]',
  'from-[#2E5E4E] to-[#5FA88C]',
];

function validUrl(s: string): string {
  const t = (s || '').trim();
  if (!t || t === '無' || t === '-') return '';
  return /^https?:\/\//i.test(t) ? t : '';
}

// 品牌封面照（取自協會「特色乳品牌圖檔」資料夾，已下載壓縮至 public/images/dairy/）
const BRAND_IMAGES: Record<string, string> = {
  高大牧場: '/images/dairy/gaoda.jpg',
  四方鮮乳: '/images/dairy/sifang.jpg',
  初鹿牧場: '/images/dairy/chulu.jpg',
  綠盈牧場: '/images/dairy/lvying.jpg',
  丹醇研選: '/images/dairy/danchun.jpg',
  豐樂鮮乳: '/images/dairy/fengle.jpg',
  嘉明鮮乳: '/images/dairy/jiaming.jpg',
  幸運兒鮮乳: '/images/dairy/xingyuner.jpg',
  許慶良鮮乳: '/images/dairy/xuqingliang.jpg',
  桂芳牧場: '/images/dairy/guifang.jpg',
  '柳營鮮乳/六甲田莊/母傳優格': '/images/dairy/taiwanranch.jpg',
  禾香鮮乳: '/images/dairy/hesiang.jpg',
  台農乳品: '/images/dairy/tainong.jpg',
};
function brandImage(brand: string): string {
  return BRAND_IMAGES[brand.trim()] || '';
}

export const DairyPage: React.FC = () => {
  const { data: brands, loading, error } = useSheetData<SheetDairyBrand>('dairy', fetchDairyBrands);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [selected, setSelected] = useState<SheetDairyBrand | null>(null);

  const groups = useMemo(() => {
    const counts = new Map<string, number>();
    brands.forEach(b => {
      if (b.region) counts.set(b.region, (counts.get(b.region) || 0) + 1);
    });
    return Array.from(counts.entries()).map(([region, count]) => ({ region, count }));
  }, [brands]);

  const sortedBrands = useMemo(() => {
    return [...brands].sort((a, b) => {
      const ai = REGION_ORDER.indexOf(a.region);
      const bi = REGION_ORDER.indexOf(b.region);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });
  }, [brands]);

  const handleSelectRegion = (region: string) => {
    setActiveRegion(prev => (prev === region ? null : region));
    document.getElementById('brand-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">台灣特色鮮乳</h1>
          <p className="text-blue-200 text-lg max-w-3xl">
            從北到南，認識堅持品質與動物福利的台灣在地酪農品牌。支持在地鮮乳、縮短食物里程，是對健康與土地最好的選擇。
          </p>
        </div>
      </section>

      {/* 鮮乳地圖 */}
      <section className="py-12 md:py-16 bg-gray-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">鮮乳地圖</h2>
            <p className="text-gray-600">點選地圖上的乳源地點，認識當地的特色鮮乳品牌</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              {loading ? (
                <div className="h-[400px] flex items-center justify-center text-gray-300 animate-pulse">載入地圖中…</div>
              ) : (
                <TaiwanMap groups={groups} activeRegion={activeRegion} onSelect={handleSelectRegion} />
              )}
            </div>

            <div>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl font-extrabold text-accent">{brands.length}</span>
                <span className="text-gray-600">個台灣特色鮮乳品牌，分佈於</span>
                <span className="text-2xl font-bold text-primary">{groups.length}</span>
                <span className="text-gray-600">個縣市</span>
              </div>
              <p className="text-sm text-gray-500 mb-5">依乳源地點分區，點選即可瀏覽該地品牌：</p>
              <div className="flex flex-wrap gap-2">
                {groups
                  .slice()
                  .sort((a, b) => (REGION_ORDER.indexOf(a.region) - REGION_ORDER.indexOf(b.region)))
                  .map(({ region, count }) => (
                    <button
                      key={region}
                      onClick={() => handleSelectRegion(region)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
                        activeRegion === region
                          ? 'bg-accent text-white border-accent'
                          : 'bg-white text-primary border-gray-200 hover:border-accent hover:text-accent'
                      }`}
                    >
                      {region} · {count}
                    </button>
                  ))}
                {activeRegion && (
                  <button
                    onClick={() => setActiveRegion(null)}
                    className="px-4 py-2 rounded-full text-sm font-medium text-gray-500 hover:text-gray-800 transition"
                  >
                    顯示全部 ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 品牌介紹 */}
      <section id="brand-grid" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">品牌介紹</h2>
            <p className="text-gray-600">
              {activeRegion ? `目前顯示：${activeRegion}` : '每一瓶鮮乳，背後都是一座牧場與一家人的故事'}
            </p>
          </div>

          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                  <div className="h-44 bg-gray-200"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && sortedBrands.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedBrands.map((b, i) => {
                const dimmed = activeRegion && b.region !== activeRegion;
                const img = brandImage(b.brand);
                return (
                  <button
                    key={b.brand + i}
                    onClick={() => setSelected(b)}
                    className={`text-left bg-white rounded-2xl shadow-sm border overflow-hidden transition hover:shadow-lg hover:-translate-y-1 ${
                      activeRegion && b.region === activeRegion ? 'border-accent ring-2 ring-accent/40' : 'border-gray-100'
                    } ${dimmed ? 'opacity-40' : ''}`}
                  >
                    {/* 品牌封面 */}
                    <div className={`relative h-44 overflow-hidden ${img ? 'bg-gray-200' : `bg-gradient-to-br ${CARD_GRADIENTS[i % CARD_GRADIENTS.length]}`}`}>
                      {img ? (
                        <>
                          <img src={img} alt={b.brand} loading="lazy" className="w-full h-full object-cover" />
                          <span className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/65 to-transparent"></span>
                          <span className="absolute bottom-3 left-4 text-white text-xl font-extrabold drop-shadow">{b.brand}</span>
                        </>
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center text-white text-3xl font-extrabold tracking-wide drop-shadow">{b.brand}</span>
                      )}
                      {b.region && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-primary text-xs font-bold">
                          📍 {b.region}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      {b.slogan && <p className="text-primary font-semibold mb-2 line-clamp-2">「{b.slogan}」</p>}
                      <p className="text-sm text-gray-500 line-clamp-3 mb-3">{b.intro}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {b.certifications.map(c => (
                          <span key={c} className={`px-2 py-0.5 rounded text-[11px] font-medium ${certClass(c)}`}>
                            {certLabel(c)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {!loading && sortedBrands.length === 0 && !error && (
            <div className="p-8 bg-cream rounded-xl border border-yellow-200 text-center">
              <p className="text-gray-600">特色鮮乳品牌介紹即將上線，敬請期待。</p>
            </div>
          )}

          {error && (
            <div className="p-8 bg-red-50 rounded-xl border border-red-200 text-center">
              <p className="text-gray-600">資料載入失敗，請稍後再試。</p>
            </div>
          )}

          <p className="text-center text-xs text-gray-400 mt-10">
            資料由各品牌提供、持續更新中。欲加入特色鮮乳介紹，歡迎與協會聯繫。
          </p>
        </div>
      </section>

      {/* 詳細彈窗 */}
      {selected && <BrandModal brand={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

const BrandModal: React.FC<{ brand: SheetDairyBrand; onClose: () => void }> = ({ brand, onClose }) => {
  const website = validUrl(brand.website);
  const social = validUrl(brand.social);
  const video = validUrl(brand.video);
  const img = brandImage(brand.brand);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 flex items-start md:items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition"
          aria-label="關閉"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header（有照片用照片做主視覺，否則用漸層） */}
        <div className="relative flex text-white min-h-[200px] md:min-h-[240px]">
          {img && <img src={img} alt={brand.brand} className="absolute inset-0 w-full h-full object-cover" />}
          <div className={`absolute inset-0 ${img ? 'bg-gradient-to-t from-black/85 via-black/35 to-black/10' : 'bg-gradient-to-br from-primary to-secondary'}`}></div>
          <div className="relative mt-auto w-full p-6 md:p-8">
            <div className="flex items-center gap-2 mb-2">
              {brand.region && (
                <span className="px-3 py-1 rounded-full bg-white/25 backdrop-blur text-sm font-medium">📍 {brand.region}</span>
              )}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-1 drop-shadow">{brand.brand}</h3>
            {brand.company && <p className="text-white/80 text-sm">{brand.company}</p>}
            {brand.slogan && <p className="text-lg mt-3 font-medium drop-shadow">「{brand.slogan}」</p>}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 space-y-6">
          {brand.certifications.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {brand.certifications.map(c => (
                <span key={c} className={`px-3 py-1 rounded-full text-xs font-medium ${certClass(c)}`}>
                  {isPendingCert(c) ? certLabel(c) : `✓ ${certLabel(c)}`}
                </span>
              ))}
            </div>
          )}

          {brand.intro && (
            <div>
              <h4 className="text-sm font-bold text-accent mb-2">品牌故事</h4>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{brand.intro}</p>
            </div>
          )}

          {brand.products && (
            <div>
              <h4 className="text-sm font-bold text-accent mb-2">代表產品</h4>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{brand.products}</p>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            {brand.origin && (
              <div className="bg-gray-warm rounded-xl p-4">
                <h4 className="text-xs font-bold text-gray-500 mb-1">乳源牧場 / 產地</h4>
                <p className="text-gray-800 text-sm">{brand.origin}</p>
              </div>
            )}
            {brand.channels && (
              <div className="bg-gray-warm rounded-xl p-4">
                <h4 className="text-xs font-bold text-gray-500 mb-1">購買通路</h4>
                <p className="text-gray-800 text-sm whitespace-pre-line">{brand.channels}</p>
              </div>
            )}
          </div>

          {(website || social || video) && (
            <div className="flex flex-wrap gap-3 pt-2">
              {website && (
                <a href={website} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition">
                  官方網站
                </a>
              )}
              {social && (
                <a href={social} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg text-sm font-medium hover:opacity-90 transition">
                  社群媒體
                </a>
              )}
              {video && (
                <a href={video} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:opacity-90 transition">
                  影音介紹
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

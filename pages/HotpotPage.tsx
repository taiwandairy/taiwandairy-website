import React, { useMemo, useState } from 'react';
import { useSheetData } from '../hooks/useSheetData';
import { fetchHotpotBrands, fetchHotpotStores } from '../utils/sheets';
import type { SheetHotpotBrand, SheetHotpotStore } from '../utils/sheets';
import { TaiwanMap } from '../components/TaiwanMap';
import type { MapPalette } from '../components/TaiwanMap';

// 火鍋季主視覺的色票（米色底／藍灰標題／磚紅點綴），與官網主色系分開，
// 只在這一頁使用——活動有自己的視覺識別，但導覽列與頁尾維持協會原本的樣子。
const C = {
  cream: '#FBF0E1',
  creamDeep: '#F4E0C6',
  blue: '#56728A',
  blueDark: '#3F5668',
  brick: '#C4553F',
  sage: '#A8C0B8',
};

const MAP_PALETTE: MapPalette = {
  active: C.brick,
  filled: C.blue,
  empty: '#D9CBB6',
  pin: C.brick,
  label: C.blueDark,
};

// 主視覺圖檔由設計師匯出後放進 public/images/hotpot/，放進去就會自動顯示；
// 檔案還沒到時走純文字版 hero，不會出現破圖。
const HERO_IMAGE = '/images/hotpot/hero.jpg';

const PERIOD = '2026.10.01 — 12.31';

const PRESS = {
  date: '2026 年 9 月 30 日（三）11:00–12:00',
  venue: '88 號樂章',
  address: '台北市內湖區民善街 88 號 5 樓',
};

export const HotpotPage: React.FC = () => {
  const { data: brands, loading: brandsLoading, error: brandsError } =
    useSheetData<SheetHotpotBrand>('hotpot-brands', fetchHotpotBrands);
  const { data: stores, loading: storesLoading } =
    useSheetData<SheetHotpotStore>('hotpot-stores', fetchHotpotStores);

  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [activeDairy, setActiveDairy] = useState<string | null>(null);
  const [heroOk, setHeroOk] = useState(true);

  // 鮮乳品牌清單（依合作的火鍋品牌數排序，多的在前）
  const dairyBrands = useMemo(() => {
    const counts = new Map<string, number>();
    for (const b of brands) {
      if (!b.dairy) continue;
      counts.set(b.dairy, (counts.get(b.dairy) || 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [brands]);

  const totalStores = useMemo(
    () => brands.reduce((sum, b) => sum + b.storeCount, 0),
    [brands],
  );

  // 地圖分區：每個縣市有幾家已登錄地址的門市
  const regionGroups = useMemo(() => {
    const counts = new Map<string, number>();
    for (const s of stores) {
      if (!s.region) continue;
      counts.set(s.region, (counts.get(s.region) || 0) + 1);
    }
    return [...counts.entries()].map(([region, count]) => ({ region, count }));
  }, [stores]);

  const visibleStores = useMemo(
    () => stores.filter(s =>
      (!activeRegion || s.region === activeRegion) &&
      (!activeDairy || s.dairy === activeDairy)),
    [stores, activeRegion, activeDairy],
  );

  const visibleBrands = useMemo(
    () => brands.filter(b => !activeDairy || b.dairy === activeDairy),
    [brands, activeDairy],
  );

  const toggleRegion = (region: string) =>
    setActiveRegion(prev => (prev === region ? null : region));

  return (
    <div style={{ backgroundColor: C.cream }}>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(160deg, ${C.creamDeep} 0%, ${C.cream} 55%, ${C.creamDeep} 100%)` }}
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p
                className="text-sm md:text-base font-semibold tracking-[0.3em] mb-4"
                style={{ color: C.brick }}
              >
                2026 國產鮮乳火鍋季
              </p>
              <h1
                className="text-5xl md:text-7xl font-black leading-[1.15] mb-6"
                style={{ color: C.blue }}
              >
                台灣鮮乳<br />入鍋正好
              </h1>
              <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: C.blueDark }}>
                冬季暖鍋時刻，用一鍋濃醇的國產鮮乳，
                認識台灣酪農的堅持。
                {brands.length > 0 && (
                  <>
                    <br />全台 {brands.length} 個火鍋品牌 × {dairyBrands.length} 家國產鮮乳，聯手開鍋。
                  </>
                )}
              </p>
              <div
                className="inline-flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl px-6 py-4 text-white"
                style={{ backgroundColor: C.blue }}
              >
                <span className="text-2xl md:text-3xl font-black tracking-wide">{PERIOD}</span>
              </div>
            </div>

            <div className="flex justify-center">
              {heroOk ? (
                <img
                  src={HERO_IMAGE}
                  alt="2026 國產鮮乳火鍋季主視覺"
                  className="w-full max-w-md rounded-2xl shadow-xl"
                  onError={() => setHeroOk(false)}
                />
              ) : (
                <div
                  className="w-full max-w-md aspect-[3/4] rounded-2xl flex flex-col items-center justify-center text-center px-8 border-4 border-dashed"
                  style={{ borderColor: C.sage, color: C.blueDark }}
                >
                  <div className="text-6xl mb-4" aria-hidden="true">🍲</div>
                  <p className="font-bold text-lg mb-2">主視覺待放入</p>
                  <p className="text-sm leading-relaxed opacity-80">
                    設計師匯出橫式／直式主視覺後，
                    放到 <code className="font-mono text-xs">public/images/hotpot/hero.jpg</code>，
                    這個位置就會自動換成正式圖。
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 數字帶 ===== */}
      <section style={{ backgroundColor: C.blue }} className="text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <Stat value={brands.length || '—'} label="火鍋品牌" />
          <Stat value={dairyBrands.length || '—'} label="國產鮮乳品牌" />
          <Stat value={totalStores ? `${totalStores}+` : '—'} label="參與門市" />
          <Stat value="3" label="個月檔期" />
        </div>
      </section>

      {/* ===== 活動宗旨 ===== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <h2 className="text-3xl md:text-4xl font-black mb-8 text-center" style={{ color: C.blue }}>
          為什麼是鮮乳火鍋？
        </h2>
        <div className="space-y-5 text-base md:text-lg leading-loose" style={{ color: C.blueDark }}>
          <p>
            面對國際貿易自由化的市場挑戰，國產酪農產業正站在轉型的關鍵時刻。
            鮮乳不只是早餐桌上的日常飲品——透過料理創新，它可以和台灣的風土滋味深度結合，
            走進大眾的每一餐。
          </p>
          <p>
            「台灣鮮乳，入鍋正好」邀集全台火鍋業者，共同開發以國產鮮乳入湯的創新鍋物。
            我們希望在最適合吃鍋的季節裡，讓消費者自然而然地認識、品嚐並愛上台灣在地鮮乳的濃醇好滋味，
            也看見酪農產業面對挑戰時的堅持與用心。
          </p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm" style={{ color: C.blueDark }}>
          <Tag label="指導單位｜農業部" />
          <Tag label="執行單位｜台灣農酪產業永續發展協會" />
          <Tag label="執行單位｜食在力量美食產業交流協會" />
        </div>
      </section>

      {/* ===== 地圖 ===== */}
      <section id="hotpot-map" style={{ backgroundColor: C.creamDeep }} className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black mb-3 text-center" style={{ color: C.blue }}>
            到哪裡吃得到
          </h2>
          <p className="text-center mb-10 text-sm md:text-base" style={{ color: C.blueDark }}>
            點選地圖上的縣市，或用下方的鮮乳品牌篩選
          </p>

          <div className="grid md:grid-cols-[minmax(0,340px)_1fr] gap-10 items-start">
            <div className="bg-white/60 rounded-2xl p-6">
              {storesLoading && regionGroups.length === 0 ? (
                <p className="text-center py-16 text-sm" style={{ color: C.blueDark }}>地圖載入中…</p>
              ) : (
                <TaiwanMap
                  groups={regionGroups}
                  activeRegion={activeRegion}
                  onSelect={toggleRegion}
                  palette={MAP_PALETTE}
                  ariaLabel="2026 國產鮮乳火鍋季門市分佈地圖"
                />
              )}
              {activeRegion && (
                <button
                  onClick={() => setActiveRegion(null)}
                  className="mt-4 w-full text-sm underline"
                  style={{ color: C.brick }}
                >
                  清除「{activeRegion}」篩選
                </button>
              )}
            </div>

            <div>
              {/* 鮮乳品牌篩選 */}
              <div className="flex flex-wrap gap-2 mb-6">
                <FilterChip
                  active={activeDairy === null}
                  onClick={() => setActiveDairy(null)}
                  label="全部鮮乳品牌"
                />
                {dairyBrands.map(([name, count]) => (
                  <FilterChip
                    key={name}
                    active={activeDairy === name}
                    onClick={() => setActiveDairy(prev => (prev === name ? null : name))}
                    label={`${name}（${count}）`}
                  />
                ))}
              </div>

              {visibleStores.length === 0 ? (
                <div className="bg-white/70 rounded-2xl p-8 text-center" style={{ color: C.blueDark }}>
                  <p className="font-semibold mb-2">這個條件下還沒有已登錄地址的門市</p>
                  <p className="text-sm opacity-80">
                    多數品牌的門市資料仍在彙整中，會陸續更新上來。
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {visibleStores.map((s, i) => (
                    <StoreCard key={`${s.brand}-${s.store}-${i}`} store={s} />
                  ))}
                </div>
              )}

              <p className="mt-6 text-xs leading-relaxed opacity-75" style={{ color: C.blueDark }}>
                目前共 {stores.length} 家門市已登錄完整地址；其餘品牌門市資料彙整中，
                完整名單請見下方「參與品牌」。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 參與品牌 ===== */}
      <section id="hotpot-brands" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black mb-3 text-center" style={{ color: C.blue }}>
            參與品牌
          </h2>
          <p className="text-center mb-10 text-sm md:text-base" style={{ color: C.blueDark }}>
            每個火鍋品牌搭配一家國產鮮乳，依推廣檔期先後排列
          </p>

          {brandsError && (
            <p className="text-center text-red-700 mb-6">品牌資料載入失敗：{brandsError}</p>
          )}
          {brandsLoading && brands.length === 0 && (
            <p className="text-center" style={{ color: C.blueDark }}>載入中…</p>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleBrands.map(b => (
              <BrandCard key={b.brand} brand={b} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 記者會 ===== */}
      <section id="hotpot-press" style={{ backgroundColor: C.blue }} className="text-white py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold tracking-[0.3em] mb-4" style={{ color: C.sage }}>
            啟動記者會
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-8">
            2026 國產鮮乳鍋聯名行動
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            <PressItem label="時間" value={PRESS.date} />
            <PressItem label="地點" value={PRESS.venue} sub={PRESS.address} />
            <PressItem label="現場" value="8 個火鍋品牌設攤" sub="鮮乳鍋物現場試吃" />
          </div>
        </div>
      </section>
    </div>
  );
};

const Stat: React.FC<{ value: React.ReactNode; label: string }> = ({ value, label }) => (
  <div>
    <div className="text-3xl md:text-4xl font-black">{value}</div>
    <div className="text-xs md:text-sm mt-1 opacity-85">{label}</div>
  </div>
);

const Tag: React.FC<{ label: string }> = ({ label }) => (
  <span className="px-4 py-2 rounded-full bg-white/70 font-medium">{label}</span>
);

const FilterChip: React.FC<{ active: boolean; onClick: () => void; label: string }> = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 rounded-full text-sm font-medium transition border"
    style={
      active
        ? { backgroundColor: C.brick, borderColor: C.brick, color: '#fff' }
        : { backgroundColor: 'rgba(255,255,255,.7)', borderColor: 'rgba(86,114,138,.25)', color: C.blueDark }
    }
  >
    {label}
  </button>
);

const StoreCard: React.FC<{ store: SheetHotpotStore }> = ({ store: s }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm">
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
      <h3 className="text-lg font-bold" style={{ color: C.blue }}>{s.store}</h3>
      <span className="text-sm" style={{ color: C.blueDark }}>{s.brand}</span>
      {s.dairy && (
        <span
          className="text-xs px-2.5 py-1 rounded-full font-medium"
          style={{ backgroundColor: C.creamDeep, color: C.brick }}
        >
          {s.dairy}
        </span>
      )}
    </div>
    <dl className="space-y-1.5 text-sm" style={{ color: C.blueDark }}>
      {s.dish && <Row label="鍋物" value={s.price ? `${s.dish}　${s.price}` : s.dish} />}
      {s.address && <Row label="地址" value={s.address} />}
      {s.hours && <Row label="營業" value={s.hours} />}
      {s.phone && <Row label="電話" value={s.phone} />}
    </dl>
    {s.mapUrl && (
      <a
        href={s.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 text-sm font-semibold underline"
        style={{ color: C.brick }}
      >
        在 Google 地圖開啟 →
      </a>
    )}
  </div>
);

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex gap-3">
    <dt className="shrink-0 w-10 opacity-70">{label}</dt>
    <dd className="flex-1">{value}</dd>
  </div>
);

const BrandCard: React.FC<{ brand: SheetHotpotBrand }> = ({ brand: b }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col">
    <div className="flex items-start justify-between gap-3 mb-3">
      <h3 className="text-xl font-bold leading-snug" style={{ color: C.blue }}>{b.brand}</h3>
      {b.booth && (
        <span
          className="shrink-0 text-xs px-2.5 py-1 rounded-full font-bold text-white"
          style={{ backgroundColor: C.brick }}
        >
          記者會設攤
        </span>
      )}
    </div>

    {b.dairy && (
      <p className="text-sm font-semibold mb-3" style={{ color: C.brick }}>
        搭配 {b.dairy}
      </p>
    )}

    {b.intro && (
      <p className="text-sm leading-relaxed mb-3" style={{ color: C.blueDark }}>{b.intro}</p>
    )}
    {b.dairyIntro && (
      <p
        className="text-sm leading-relaxed mb-3 pl-3 border-l-2"
        style={{ color: C.blueDark, borderColor: C.sage }}
      >
        {b.dairyIntro}
      </p>
    )}
    {!b.intro && !b.dairyIntro && (
      <p className="text-sm mb-3 opacity-60" style={{ color: C.blueDark }}>品牌介紹更新中</p>
    )}

    <div
      className="mt-auto pt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs border-t"
      style={{ color: C.blueDark, borderColor: C.creamDeep }}
    >
      {b.storeCount > 0 && <span>{b.storeCount} 家門市</span>}
      {b.period && <span>{b.period}</span>}
      {b.website && (
        <a href={b.website} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: C.brick }}>
          官網
        </a>
      )}
      {b.instagram && (
        <a href={b.instagram} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: C.brick }}>
          Instagram
        </a>
      )}
    </div>
  </div>
);

const PressItem: React.FC<{ label: string; value: string; sub?: string }> = ({ label, value, sub }) => (
  <div className="bg-white/10 rounded-xl p-5">
    <div className="text-xs mb-2 opacity-75">{label}</div>
    <div className="font-bold leading-snug">{value}</div>
    {sub && <div className="text-sm mt-1 opacity-80">{sub}</div>}
  </div>
);

import React from 'react';

interface Member {
  name: string;        // 對外顯示名（品牌名優先）
  org: string;         // 會員單位全名
  region: string;
  brands: string[];
  intro: string;
  logo?: string;
  links: { href: string; label: string }[];
}

// 來源：協會「會員簡歷」試算表團體會員（C01–C04、D01–D06），簡介取自官網特色鮮乳頁公開資料
// 個人與專家會員不公開列出
const DAIRY_MEMBERS: Member[] = [
  {
    name: '鮮乳坊',
    org: '慕渴股份有限公司',
    region: '彰化・雲林・台南',
    brands: ['豐樂鮮乳', '嘉明鮮乳', '幸運兒鮮乳', '許慶良鮮乳', '桂芳鮮乳'],
    intro: '以「單一牧場、單一乳源」經營鮮乳品牌，與獸醫師一起照顧合作牧場。',
    logo: '/images/members/bettermilk.png',
    links: [{ href: 'https://www.bettermilk.com.tw/', label: '官網' }],
  },
  {
    name: '四方鮮乳',
    org: '四方乳品工業股份有限公司',
    region: '苗栗竹南',
    brands: ['四方鮮乳'],
    intro: '1994 年創立，自有牧場與離牧場不到五公里的鮮乳加工廠，以 90°C HTST 溫和殺菌；2008 年成立臺灣第一間穩定量產起司的工廠。',
    logo: '/images/members/sifang.png',
    links: [
      { href: 'https://www.fourways.com.tw', label: '官網' },
      { href: 'https://www.facebook.com/fourways.factory', label: 'Facebook' },
    ],
  },
  {
    name: '台農乳品',
    org: '中華民國農會台農鮮乳廠',
    region: '雲林崙背',
    brands: ['崙背鮮乳', '貓兒干鮮乳'],
    intro: '農民團體自營的乳品加工廠，秉持照顧酪農權益；崙背鮮乳由雲林縣政府與台農鮮乳廠合作推出。',
    logo: '/images/members/tainong.png',
    links: [
      { href: 'https://www.farmer.org.tw/milk_infoAbout.aspx', label: '官網' },
      { href: 'https://www.facebook.com/best.friend.farmer/', label: 'Facebook' },
    ],
  },
  {
    name: '初鹿牧場',
    org: '超能生化科技股份有限公司台東分公司初鹿牧場',
    region: '台東',
    brands: ['初鹿鮮乳'],
    intro: '以天然純淨為初心、堅持與環境共生；以初鹿鮮乳為核心，延伸保久乳、優格飲、鮮奶饅頭等產品。',
    logo: '/images/members/chulu.png',
    links: [
      { href: 'https://www.chuluranch-shop.com.tw/', label: '官網' },
      { href: 'https://www.facebook.com/share/1H6J8bp5Ux/', label: 'Facebook' },
    ],
  },
  {
    name: '丹醇研選',
    org: '丹醇行',
    region: '屏東萬丹',
    brands: ['丹醇鮮乳', '丹醇研選'],
    intro: '源自自有牧場與丹醇鮮乳品牌，打造純鮮乳茶飲品牌「丹醇研選」；牧場以數據化管理，牛隻配戴計步器追蹤健康。',
    logo: '/images/members/danchun.png',
    links: [
      { href: 'https://www.ltdmilk.com.tw/', label: '官網' },
      { href: 'https://www.facebook.com/dcselect01', label: 'Facebook' },
    ],
  },
  {
    name: '主恩鮮乳',
    org: '豐正乳品行',
    region: '彰化秀水',
    brands: ['主恩鮮乳'],
    intro: '牧場有 50 年歷史、約 300 頭乳牛，每天提供有機栽種的新鮮牧草，並自製有機肥回歸牧草園，形成對土地友善的循環。',
    links: [],
  },
  {
    name: '高大牧場',
    org: '高大鮮乳企業社',
    region: '高雄',
    brands: ['牧質調鮮乳'],
    intro: '創立於 1946 年，全國最大的自營乳牛牧場及鮮乳工廠，取得全台第一張 TAP 牧場產銷履歷。',
    logo: '/images/members/gaoda.png',
    links: [
      { href: 'https://kaodafarm.com.tw/', label: '官網' },
      { href: 'https://www.facebook.com/profile.php?id=61553802815310', label: 'Facebook' },
    ],
  },
  {
    name: '綠盈牧場',
    org: '旭騰乳有限公司',
    region: '嘉義中埔',
    brands: ['綠盈鮮乳', '五梅鮮乳'],
    intro: '從生產轉型為觀光休閒、自有品牌鮮乳到門市經營，牧場主是神農獎得主；另有嚴選五梅獎牧場乳源、每日限量的五梅鮮乳。',
    logo: '/images/members/lvying.png',
    links: [{ href: 'https://www.instagram.com/milkdaily.chiayi', label: 'Instagram' }],
  },
];

const PARTNER_MEMBERS: Member[] = [
  {
    name: '宏威數位',
    org: '宏威數位有限公司',
    region: '台北',
    brands: [],
    intro: '',
    links: [],
  },
  {
    name: '芒果咖啡',
    org: '芒果咖啡文化有限公司',
    region: '雲林莿桐',
    brands: [],
    intro: '雲林莿桐的咖啡品牌，創辦人暨烘豆師也是協會風味品鑑顧問，參與建立台灣鮮乳的風味語彙。',
    logo: '/images/members/mango-coffee.png',
    links: [],
  },
];

const MemberCard: React.FC<{ m: Member }> = ({ m }) => (
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
      {m.intro && <p className="text-sm text-gray-600 leading-relaxed flex-1">{m.intro}</p>}
      {m.links.length > 0 && (
        <div className="flex gap-4 mt-4 text-sm">
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
              <p className="text-gray-600">{DAIRY_MEMBERS.length} 家會員，旗下 {DAIRY_MEMBERS.reduce((n, m) => n + m.brands.length, 0)} 個鮮乳品牌</p>
            </div>
            <a href="#dairy" className="text-sm font-medium text-primary hover:text-accent transition">在特色乳地圖上看乳源分布 →</a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DAIRY_MEMBERS.map(m => <MemberCard key={m.org} m={m} />)}
          </div>
        </div>
      </section>

      {/* 產業相關夥伴 */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">產業相關夥伴</h2>
          <p className="text-gray-600 mb-8">從數位服務到風味專業，支持酪農產業的夥伴</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNER_MEMBERS.map(m => <MemberCard key={m.org} m={m} />)}
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

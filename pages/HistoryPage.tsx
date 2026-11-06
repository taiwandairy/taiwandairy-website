import React from 'react';

interface Milestone {
  year: string;
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
  // 直式海報用 contain，避免裁掉主標
  imageFit?: 'cover' | 'contain';
  // 多張小圖（2×2 格）＋各自說明，取代單張 image
  gallery?: { src: string; caption: string }[];
  link?: { href: string; label: string };
}

// 內容來源：協會「20260921 農業部政策資源說明會」簡報第 4–7 頁、農業部 115 年計畫核定本
const MILESTONES: Milestone[] = [
  {
    year: '2016',
    title: '牧場人才培訓計劃',
    body:
      '協會於 2016 年成立。當時全台約有 12 萬頭乳牛，乳牛獸醫師卻只有 20 位左右，年輕學子也少有接觸牧場現場的機會。協會成立後的第一件事就是培育牧場人才，帶大專學生走進牧場實習。至今已有近百位學生參與，培養出 13 位乳牛獸醫與現場技術人員。',
    image: '/images/history/2016-training.jpg',
    imageAlt: '兩位學員在牛舍裡陪伴小牛',
    link: { href: '#training', label: '了解人才培育' },
  },
  {
    year: '2021',
    title: '台灣鮮乳風味口感探索計劃',
    body:
      '茶、酒、咖啡都有自己的風味語言，鮮乳卻還沒有。2021 年起，我們攜手茶、酒、咖啡等風味專家，逐批品飲、記錄台灣鮮乳，2022 年舉辦第一場專家鮮乳品鑑會，再把品鑑帶進牧場，逐步建立「牛乳口感輪」，整理出屬於台灣鮮乳的風味與口感語彙。',
    image: '/images/history/2021-tasting.jpg',
    imageAlt: '鮮乳盲飲品鑑桌：酒杯、麻布袋與口感輪',
    link: { href: '#tasting', label: '認識風味品鑑' },
  },
  {
    year: '2023',
    title: '產業發聲與倡議',
    body:
      '台紐經濟合作協定（ANZTEC）讓紐西蘭液態乳自 2025 年起關稅歸零。協會與中華民國乳業協會、中華民國酪農協會等產業團體共同提出訴求，透過立委質詢、記者會發聲、公共政策平台連署與媒體擴散，讓大眾認識酪農與乳品產業面臨的挑戰。此後持續參與產業政策溝通。',
    gallery: [
      { src: '/images/history/2023-1.jpg', caption: '7/19 立委院會質詢' },
      { src: '/images/history/2023-2.jpg', caption: '8/2「支持台灣奶，全民一起來」記者會' },
      { src: '/images/history/2023-3.jpg', caption: '8/5 公共政策網路參與平台連署上線' },
      { src: '/images/history/2023-4.jpg', caption: '透過媒體專訪擴散議題' },
    ],
  },
  {
    year: '2026',
    title: '與農業部協作國產鮮乳推廣',
    body:
      '2026 年，協會與農業部協作，執行「國產鮮乳在地供應鏈信任共創計畫」與「國產鮮乳多元行銷推廣計畫」：串聯全台特色鮮乳品牌推出特色乳地圖，與食在力量美食產業交流協會共同舉辦「台灣鮮乳，入鍋正好」國產鮮乳火鍋季，並提供會員乳品推廣活動補助，讓國產鮮乳被更多人看見。',
    image: '/images/history/2026-hotpot.jpg',
    imageAlt: '「台灣鮮乳，入鍋正好」2026 國產鮮乳火鍋季主視覺',
    imageFit: 'contain',
    link: { href: '#hotpot', label: '看火鍋季' },
  },
];

export const HistoryPage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">協會歷程</h1>
          <p className="text-blue-200 text-lg">從牧場人才到國產鮮乳推廣　2016–2026</p>
        </div>
      </section>

      {/* Intro */}
      <section className="pt-12 md:pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-700 text-lg leading-relaxed">
            台灣農酪產業永續發展協會成立於 2016 年，從培育牧場人才起步，2021 年啟動鮮乳風味探索，近年參與產業政策倡議，2026 年開始與農業部協作國產鮮乳推廣系列計畫。
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="relative">
            {/* 中軸線：手機靠左、桌機置中 */}
            <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-0.5 bg-blue-100 md:-translate-x-1/2" aria-hidden="true" />
            {MILESTONES.map((m, i) => {
              const imageRight = i % 2 === 1;
              return (
                <li key={m.year} className="relative pl-12 md:pl-0 mb-12 md:mb-16 last:mb-0">
                  {/* 年份圓點 */}
                  <div className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 z-10">
                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-accent ring-4 ring-white" />
                  </div>
                  <div className={`md:grid md:grid-cols-2 md:gap-12 items-start`}>
                    {/* 文字 */}
                    <div className={`${imageRight ? 'md:order-1 md:text-right' : 'md:order-2'} mb-4 md:mb-0`}>
                      <div className="text-3xl md:text-4xl font-bold text-accent leading-none mb-2">{m.year}</div>
                      <h2 className="text-xl md:text-2xl font-bold text-primary mb-3">{m.title}</h2>
                      <p className="text-gray-600 leading-relaxed">{m.body}</p>
                      {m.link && (
                        <a href={m.link.href} className="inline-block mt-3 text-sm font-medium text-primary hover:text-accent transition">
                          {m.link.label} →
                        </a>
                      )}
                    </div>
                    {/* 圖片 */}
                    <div className={imageRight ? 'md:order-2' : 'md:order-1'}>
                      {m.gallery ? (
                        <div className="grid grid-cols-2 gap-3">
                          {m.gallery.map(g => (
                            <figure key={g.src}>
                              <img src={g.src} alt={g.caption} loading="lazy" className="w-full aspect-[3/2] object-cover rounded-lg shadow-sm" />
                              <figcaption className="text-xs text-gray-500 mt-1 leading-snug">{g.caption}</figcaption>
                            </figure>
                          ))}
                        </div>
                      ) : (
                        <div className={`rounded-xl overflow-hidden shadow-md ${m.imageFit === 'contain' ? 'bg-gray-warm' : ''}`}>
                          <img
                            src={m.image}
                            alt={m.imageAlt}
                            loading="lazy"
                            className={`w-full ${m.imageFit === 'contain' ? 'h-72 md:h-80 object-contain' : 'h-56 md:h-64 object-cover'}`}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </div>
  );
};

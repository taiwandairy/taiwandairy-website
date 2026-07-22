// Google Analytics 4（評估 ID 為公開資訊，寫死無妨）
// hash 路由 SPA 的 page_path 永遠是「/」，各分頁瀏覽要自己回報虛擬路徑，
// 所以關掉 config 預設的首次 page_view，統一由 App 的 useEffect 發（含初次載入）。
const GA_ID = 'G-DDDR11NS70';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// GA 報表顯示用：虛擬路徑對應的中文頁名
const PAGE_TITLES: Record<string, string> = {
  home: '首頁',
  charter: '協會章程',
  news: '會務新知',
  promotion: '台灣鮮乳推廣活動',
  training: '人才培育',
  media: '影音媒體',
  dairy: '特色鮮乳',
  tasting: '風味品鑑',
  exchange: '產業交流',
  weekly: '乳業週報',
  join: '加入我們',
};

export function initAnalytics(): void {
  if (window.gtag) return;
  const dataLayer = window.dataLayer || [];
  window.dataLayer = dataLayer;
  // gtag 官方 snippet 要求 push 的是 arguments 物件本身，不能展開成陣列
  const gtag = function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  };
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

export function trackPageView(page: string): void {
  if (!window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: page === 'home' ? '/' : `/${page}`,
    page_title: PAGE_TITLES[page] || page,
    page_location: window.location.href,
  });
}

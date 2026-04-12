import React from 'react';

const YOUTUBE_CHANNEL = 'https://www.youtube.com/@%E5%8F%B0%E7%81%A3%E8%BE%B2%E9%85%AA%E7%94%A2%E6%A5%AD%E6%B0%B8%E7%BA%8C%E7%99%BC%E5%B1%95';

interface MediaItem {
  id: string;
  title: string;
  date: string;
  type: 'article' | 'video';
  source: string;
  summary: string;
  link?: string;
}

const SAMPLE_MEDIA: MediaItem[] = [
  {
    id: '1',
    title: '台灣農酪產業永續發展協會成立 產官學攜手推動產業轉型',
    date: '2025-01-20',
    type: 'article',
    source: '農傳媒',
    summary: '台灣農酪產業永續發展協會於日前正式成立，匯聚產官學研各界力量，致力推動國內酪農產業升級轉型與永續發展。',
  },
  {
    id: '2',
    title: '永續酪農的未來：從牧場到餐桌的綠色革命',
    date: '2025-02-15',
    type: 'video',
    source: '協會自製',
    summary: '深入探訪台灣模範牧場，了解永續經營理念如何在第一線落實，從飼養管理到碳足跡追蹤的完整故事。',
    link: YOUTUBE_CHANNEL,
  },
  {
    id: '3',
    title: '專訪理事長韓宗諭：談台灣酪農產業的機遇與挑戰',
    date: '2025-03-05',
    type: 'article',
    source: '產業人物誌',
    summary: '本會理事長韓宗諭接受專訪，暢談台灣酪農產業面臨的國際競爭壓力與永續轉型機遇。',
  },
];

export const MediaPage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">影音媒體</h1>
          <p className="text-blue-200 text-lg">媒體報導與協會自製影音內容</p>
        </div>
      </section>

      {/* YouTube Channel Banner */}
      <section className="py-12 bg-gray-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href={YOUTUBE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition group"
          >
            <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
              <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition">台灣農酪產業永續發展協會 YouTube 頻道</h2>
              <p className="text-sm text-gray-500 mt-1">觀看協會影音內容、活動紀錄與產業知識分享</p>
            </div>
            <svg className="w-6 h-6 text-gray-300 group-hover:text-red-600 transition flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_MEDIA.map((item) => (
              <article
                key={item.id}
                onClick={() => item.link && window.open(item.link, '_blank')}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center bg-blue-50">
                    {item.type === 'video' ? (
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-red-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                        <span className="text-xs text-gray-400">影片</span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <svg className="w-12 h-12 mx-auto text-blue-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <span className="text-xs text-gray-400">報導</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.type === 'video' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                    }`}>
                      {item.type === 'video' ? '影片' : '報導'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-400">{item.date}</span>
                    <span className="text-xs text-gray-300">|</span>
                    <span className="text-xs text-primary font-medium">{item.source}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.summary}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 p-8 bg-cream rounded-xl border border-yellow-200 text-center">
            <p className="text-gray-600 mb-1">更多媒體內容持續建置中</p>
            <p className="text-sm text-gray-400">
              未來將收錄以協會名義受訪的媒體報導，以及協會自製的影音內容。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

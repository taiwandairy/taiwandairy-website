import React from 'react';
import type { Page } from '../types';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const CHARTER_POINTS = [
  { icon: '/images/icons/icon-1.png', title: '推動產業升級與轉型輔導', desc: '協助農酪產業導入現代化管理與技術，推動轉型升級' },
  { icon: '/images/icons/icon-2.png', title: '建立「特色鮮乳與農產」差異化', desc: '打造在地特色鮮乳與農產品牌，提升市場競爭力' },
  { icon: '/images/icons/icon-3.png', title: '深化食農教育與社會連結', desc: '推廣食農教育，加強產業與社會大眾的互動連結' },
  { icon: '/images/icons/icon-4.png', title: '媒合商務應用與供應鏈整合', desc: '促進產業上下游合作，整合供應鏈資源與商務媒合' },
  { icon: '/images/icons/icon-5.png', title: '驅動產品創新與產業價值優化', desc: '鼓勵產品研發創新，提升農酪產業整體附加價值' },
  { icon: '/images/icons/icon-6.png', title: '建構產業智庫與政策研究', desc: '建立產業研究智庫，提供政策建議與產業趨勢分析' },
  { icon: '/images/icons/icon-7.png', title: '承接政府委辦與專案計畫', desc: '執行政府委託專案，落實產業輔導與發展計畫' },
  { icon: '/images/icons/icon-8.png', title: '促進國際交流與產學合作', desc: '推動國際產業交流，強化產學研合作與技術引進' },
  { icon: '/images/icons/icon-9.png', title: '維護會員福祉與辦理其他符合本會宗旨之事項', desc: '保障會員權益，推動一切符合協會永續發展宗旨之事務' },
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        {/* Background image with fallback gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-blue-700">
          <img
            src="/images/hero.jpg"
            alt=""
            className="w-full h-full object-cover opacity-30"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              台灣農酪產業<br />永續發展協會
            </h1>
            <p className="text-base text-blue-200 leading-relaxed mb-8 max-w-2xl">
              致力推動產業智慧化與ESG轉型，引領台灣農酪產業走向共榮發展。
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('charter')}
                className="px-8 py-3 bg-white text-primary font-bold rounded-lg hover:bg-blue-50 transition shadow-lg"
              >
                認識協會
              </button>
              <button
                onClick={() => onNavigate('news')}
                className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-primary transition"
              >
                最新消息
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">協會簡介</h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              台灣農酪產業永續發展協會（以下簡稱農酪永續協會），成立於2016年，在產業巨變的現況下，致力推動產業智慧化與ESG轉型、建立「特色乳品與農產」差異化並深化食農教育。同時，積極媒合商務供應鏈、建構產業智庫與促進產學合作，全面優化產業鏈價值，引領台灣農酪產業走向共榮發展。
            </p>
            <p className="text-base text-gray-500 leading-relaxed italic">
              Taiwan Sustainable Dairy Development Association (TSDDA), established in 2016, is dedicated to advancing smart agriculture and ESG transformation amidst a rapidly evolving industry. We strive to differentiate "Specialty Dairy and Agricultural Products" while deepening food and agricultural education. Furthermore, TSDDA actively facilitates supply chain integration, establishes industry think tanks, and promotes industry-academia collaboration. Our mission is to optimize the entire value chain and lead Taiwan's dairy industry toward a sustainable and prosperous future.
            </p>
          </div>
        </div>
      </section>

      {/* Charter Icons Section */}
      <section className="py-16 md:py-24 bg-gray-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">協會宗旨</h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              本協會以九大核心任務為方針，全方位推動台灣農酪產業的永續發展
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHARTER_POINTS.map((point, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition group"
              >
                <div className="w-16 h-16 mb-4 flex items-center justify-center">
                  <img
                    src={point.icon}
                    alt={point.title}
                    className="w-16 h-16 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const numEl = document.createElement('div');
                      numEl.className = 'w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold';
                      numEl.textContent = String(i + 1);
                      target.parentElement!.appendChild(numEl);
                    }}
                  />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-primary transition">{point.title}</h3>
                <p className="text-sm text-gray-600">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Preview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">會務新知</h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { title: '牛隻疾病及衛生防疫進階訓練班', date: '2026-03-16' },
              { title: '2026 乳牛動物福利產業交流工作坊', date: '2026-03-16' },
              { title: '因應氣候變遷之跨域調適治理與科研協作建構研討會', date: '2026-03-16' },
            ].map((item, i) => (
              <div
                key={i}
                onClick={() => onNavigate('news')}
                className="flex items-center gap-4 p-5 bg-gray-warm rounded-xl hover:shadow-md transition cursor-pointer group"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary transition">{item.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{item.date}</p>
                </div>
                <svg className="w-5 h-5 text-gray-300 group-hover:text-primary transition flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate('news')}
              className="px-6 py-2 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition"
            >
              查看更多
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-gray-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">聯絡資訊</h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Address */}
              <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">協會地址</h3>
                  <p className="text-gray-600 text-sm">臺北市內湖區內湖路二段311號11樓之1</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">電子信箱</h3>
                  <p className="text-gray-600 text-sm">tinghsuan@bettermilk.com.tw</p>
                </div>
              </div>

              {/* Facebook */}
              <a href="https://www.facebook.com/dfsd.org.tw" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition group">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-primary transition">Facebook</h3>
                  <p className="text-gray-600 text-sm">台灣農酪產業永續發展協會</p>
                </div>
              </a>

              {/* Instagram */}
              <a href="https://www.instagram.com/dfsd.org.tw/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-primary transition">Instagram</h3>
                  <p className="text-gray-600 text-sm">@dfsd.org.tw</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

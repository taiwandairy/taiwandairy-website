import React from 'react';

export const NewsPage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">會務新知</h1>
          <p className="text-blue-200 text-lg">掌握協會最新動態與活動資訊</p>
        </div>
      </section>

      {/* News List */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* 2026 牧場人才培訓計畫 */}
            <article className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">人才培育</span>
                <time className="text-sm text-gray-400">2026-04-07</time>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                2026 牧場人才培訓計畫｜第 11 屆招生中！
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  全台灣共有 6,120 位獸醫師，近 70% 從事貓狗毛小孩醫療照顧。而每天在牧場、流著汗、捲起衣袖和牛、豬、雞、鴨為伍，在第一線守護大家蛋、奶、肉食物安全的畜牧獸醫，卻只有不到 6%、352 位！
                </p>
                <h3 className="font-bold text-gray-900">10 年來我們持續在做</h3>
                <p>
                  鮮乳坊成立以來就投入「牧場人才培訓計畫」，今年邁入第 11 年啦！98 位國內外獸醫和動物科學系同學在計畫安排下進到牧場體驗學習，我們也不定期舉辦線上職涯說明會、協助轉介職缺。至今，超過 10 位參與同學在畢業後選擇乳牛相關工作。能在牧場再次看到大家，是最開心的事！
                </p>
                <h3 className="font-bold text-gray-900">人才培訓資訊交流平台</h3>
                <p>
                  我們努力做好產業和學生的橋樑，希望每個珍貴的實習機會，都能拉近現場和學術的距離，讓學生不再對乳牛產業陌生，也讓牧場更有機會請到專業人才。當然，還有長期穩定配合計畫、並廣受學生好評的實習單位文雅牧場、米克乳牛專科診所，一起成為產業人才的孵育搖籃。
                </p>
                <h3 className="font-bold text-gray-900">現在開始報名！</h3>
                <p>
                  如果你是對加入經濟動物產業篤定的同學，期待參與計畫能讓你往夢想更進一步。不過我們也樂意聽到同學們侃侃而談自己還在努力摸索，一兩個月無法讓你學到足夠的技能，但一定有助於你「納入或排除」這項職涯選擇。無論如何，別擔心也千萬別著急，因為你注定會做一件只有你能做的事！
                </p>
                <p>
                  想了解更多計畫內容，請參考報名連結裡的計畫簡章，第一階段截止日期 4/17（五）。
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="https://bettermilk.cc/5C6HW"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition"
                  >
                    立即報名
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/share/p/18EknQvsya/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                  >
                    Facebook 貼文
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          </div>

          {/* Note */}
          <div className="mt-12 p-8 bg-cream rounded-xl border border-yellow-200 text-center">
            <svg className="w-12 h-12 mx-auto text-accent mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p className="text-gray-600">
              未來將持續更新協會活動公告與新聞稿。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

import React from 'react';

const CHARTER_ARTICLES = [
  {
    chapter: '協會章程',
    articles: [
      { num: 1, content: '本會名稱為「台灣農酪產業永續發展協會」。' },
      { num: 2, content: '本會為依法設立、非以營利為目的之社會團體，以協助酪農產業與台灣農業永續發展為最主要宗旨。' },
      { num: 3, content: '本會以全國行政區域為組織區域。' },
      { num: 4, content: '本會會址設於主管機關所在地區。會址之設置及變更時，應函報主管機關核備。' },
      { num: 5, content: '本會之任務如下：\n一、推動產業升級與轉型輔導：引領產業經營轉型，輔導會員落實產銷穩健、品質提升、數據智慧化升級、淨零路徑、ESG永續治理等達成國家政策與國際趨勢之永續發展目標。\n二、建立「特色鮮乳與農產」差異化：推動國產乳品分級制度，提升國產鮮乳之市場識別度與價值認同。\n三、深化食農教育與社會連結：搭任生產者與消費者間之溝通橋樑，串連食農教育與地方創生等資源，建立國產鮮乳價值認同。\n四、媒合商務應用與供應鏈整合：整合全國性通路與各類餐飲業者資源，媒合國產乳源多元商業應用機會。\n五、驅動產品創新與產業價值優化：支持並參與多元乳製品之技術研發、生產建置與行銷推廣，優化整體產業鏈價值。\n六、建構產業智庫與政策研究：執行農酪產業趨勢研究、產業白皮書及數據統計分析，提供各級政府機關產業政策諮詢與法規修訂建議，並建立政策溝通平台。\n七、承接政府委辦與專案計畫：積極配合政府施政目標，承接產業轉型、技術推廣、資源整合及補助案件之審核與管理等政府委託業務。\n八、促進國際交流與產學合作：推動技術與經營人才培育與產學研結盟，辦理國內外技術考察，落實產業傳承。\n九、維護會員福祉與辦理其他符合本會宗旨之事項：包含但不限辦理資材共同採購與經營諮詢，協助解決產業困境，增進台灣農酪產業共榮發展之各項活動。' },
      { num: 6, content: '本會之主管機關為內政部。本會之目的事業應受各該事業主管機關之指導、監督。' },
    ]
  },
];

export const CharterPage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">協會章程</h1>
          <p className="text-blue-200 text-lg">台灣農酪產業永續發展協會章程　2026.02</p>
        </div>
      </section>

      {/* Charter Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {CHARTER_ARTICLES.map((chapter, ci) => (
            <div key={ci} className="mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-6 pb-2 border-b-2 border-accent">
                {chapter.chapter}
              </h2>
              <div className="space-y-6">
                {chapter.articles.map((article) => (
                  <div key={article.num} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-primary font-bold text-sm">
                        {article.num}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">第 {article.num} 條</h3>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">{article.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

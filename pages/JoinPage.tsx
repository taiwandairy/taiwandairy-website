import React from 'react';

// Google 表單建置完成後（Phase B）填入表單網址，CTA 會自動從「即將開放」切換成可點擊申請。
const APPLY_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScLWP1EaMwhY70chZLrn1WvQujnSxOf_xrwwsM5xFpRsaO5LQ/viewform';
// 表單開放前的入會洽詢窗口（此信箱已公開於風味品鑑頁）
const CONTACT_EMAIL = 'tinghsuan@bettermilk.com.tw';

interface Benefit {
  icon: string;
  title: string;
  desc: string;
}

const BENEFITS: Benefit[] = [
  { icon: '📩', title: '第一手產業情報', desc: '每週乳業週報、政策動態與國際乳業趨勢，第一手掌握產業脈動。' },
  { icon: '🎓', title: '教育訓練與活動優先', desc: '協會論壇、牧場參訪、人才培育課程與風味品鑑等活動，優先報名與會員專屬優惠。' },
  { icon: '📋', title: '協會計畫申請權', desc: '得申請或參與協會爭取的政府計畫、補助資源與產業合作專案。' },
  { icon: '📣', title: '產業發聲與倡議', desc: '參與乳品標示、鮮乳標章、飲用量等政策議題，凝聚產業共同意見。' },
  { icon: '🤝', title: '產業網絡連結', desc: '與牧場、品牌、加工、通路及專家建立合作網絡，拓展產業人脈。' },
  { icon: '🗳️', title: '會務參與權', desc: '依章程享有表決權、選舉權與被選舉權，共同決定協會發展方向。' },
];

interface Tier {
  name: string;
  who: string;
  join: string;
  annual: string;
}

const TIERS: Tier[] = [
  { name: '個人會員', who: '年滿 20 歲、從事或關注農酪產業的個人', join: '1,000', annual: '2,000' },
  { name: '牧場會員', who: '依法登記、經營特色鮮乳與農產品牌的牧場', join: '1,000', annual: '3,000' },
  { name: '團體會員・甲級', who: '具工廠登記，或實收資本額 500 萬元以上', join: '1,000', annual: '10,000' },
  { name: '團體會員・乙級', who: '資本額未達 500 萬的公司行號、獨立門市或個人工作室', join: '1,000', annual: '3,000' },
  { name: '專家會員', who: '具農酪產業關鍵技術、學術研究或實務貢獻者', join: '1,000', annual: '1,000' },
  { name: '贊助會員', who: '認同協會宗旨、以資源支持會務發展者', join: '1,000', annual: '另洽協會' },
];

interface Step {
  num: string;
  title: string;
  desc: string;
}

const STEPS: Step[] = [
  { num: '1', title: '線上申請', desc: '選擇會員別、填寫基本聯絡與資格資料後送出。' },
  { num: '2', title: '資格審核', desc: '由協會理事會依章程審核會員資格。' },
  { num: '3', title: '繳納會費', desc: '審核通過後，繳納入會費與當年度常年會費（身分證明等文件於此階段補件）。' },
  { num: '4', title: '完成入會', desc: '確認入帳後啟用會籍，正式成為協會會員。' },
];

export const JoinPage: React.FC = () => {
  const formReady = APPLY_FORM_URL.trim().length > 0;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">加入我們</h1>
          <p className="text-blue-200 text-lg md:text-xl max-w-3xl leading-relaxed">
            成為台灣農酪產業永續發展協會的一員，與牧場、品牌、專家一同推動台灣農酪產業的永續發展。
          </p>
        </div>
      </section>

      {/* 會員權益 */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">為什麼加入協會</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">會員可享有以下權益，一同凝聚產業力量：</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                <div className="text-3xl mb-3">{b.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 會員別與會費 */}
      <section className="py-14 md:py-20 bg-gray-warm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">會員別與會費</h2>
            <p className="text-gray-500">依身分選擇對應的會員別，會費如下表：</p>
          </div>

          {/* 桌機：表格 */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-primary text-white text-sm">
                  <th className="px-6 py-4 font-semibold">會員別</th>
                  <th className="px-6 py-4 font-semibold">適用對象</th>
                  <th className="px-6 py-4 font-semibold text-right whitespace-nowrap">入會費</th>
                  <th className="px-6 py-4 font-semibold text-right whitespace-nowrap">常年會費</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {TIERS.map((t) => (
                  <tr key={t.name} className="hover:bg-blue-50/40 transition">
                    <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">{t.name}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{t.who}</td>
                    <td className="px-6 py-4 text-right text-gray-700 whitespace-nowrap">{t.join}</td>
                    <td className="px-6 py-4 text-right font-semibold text-primary whitespace-nowrap">{t.annual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 手機：卡片 */}
          <div className="md:hidden space-y-4">
            {TIERS.map((t) => (
              <div key={t.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold text-gray-900 mb-1">{t.name}</h3>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{t.who}</p>
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="text-gray-400">入會費</span>
                    <div className="font-semibold text-gray-700">{t.join}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">常年會費</span>
                    <div className="font-semibold text-primary">{t.annual}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-4 leading-relaxed">
            單位：新臺幣元。入會費為加入時一次性繳納，常年會費為每年繳納。實際會員別與資格以理事會審核結果為準；贊助會員之支持方式與金額歡迎另行洽詢協會。
          </p>
        </div>
      </section>

      {/* 入會流程 */}
      <section className="py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">入會流程</h2>
            <p className="text-gray-500">四個步驟，完成入會：</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.num} className="relative bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="w-10 h-10 rounded-full bg-accent text-white font-bold flex items-center justify-center mb-4">
                  {s.num}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">準備好加入了嗎？</h2>
          {formReady ? (
            <>
              <p className="text-blue-200 mb-8 leading-relaxed">
                填寫線上入會申請表，我們將盡快與您聯繫後續審核與繳費事宜。
              </p>
              <a
                href={APPLY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-lg text-lg font-semibold hover:opacity-90 transition"
              >
                立即線上申請
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </>
          ) : (
            <>
              <p className="text-blue-200 mb-6 leading-relaxed">
                線上入會申請表即將開放。在此之前，歡迎來信洽詢入會事宜，我們將為您說明。
              </p>
              <div className="inline-flex flex-col items-center gap-3">
                <span className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-blue-200 rounded-lg text-lg font-semibold cursor-default border border-white/20">
                  線上申請即將開放
                </span>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-200 hover:text-white underline text-sm">
                  入會洽詢：{CONTACT_EMAIL}
                </a>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

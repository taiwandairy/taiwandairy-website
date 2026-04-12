import React from 'react';

interface LeaderCard {
  name: string;
  title: string;
  photo: string;
  description: string;
}

const LEADERS: LeaderCard[] = [
  {
    name: '韓宗諭',
    title: '理事長',
    photo: '/images/team/chairman.jpg',
    description: '致力於推動台灣農酪產業的永續轉型，結合國際經驗與在地實踐，帶領協會邁向新的里程碑。',
  },
  {
    name: '（待補）',
    title: '秘書長',
    photo: '/images/team/secretary.jpg',
    description: '負責協會日常會務運作與各項計畫之統籌推動，確保協會使命的落實執行。',
  },
];

interface BoardMember {
  name: string;
  role: string;
  affiliation?: string;
}

const BOARD_MEMBERS: BoardMember[] = [
  { name: '（待補）', role: '常務理事', affiliation: '' },
  { name: '（待補）', role: '理事', affiliation: '' },
  { name: '（待補）', role: '理事', affiliation: '' },
  { name: '（待補）', role: '理事', affiliation: '' },
  { name: '（待補）', role: '理事', affiliation: '' },
  { name: '（待補）', role: '常務監事', affiliation: '' },
  { name: '（待補）', role: '監事', affiliation: '' },
  { name: '（待補）', role: '監事', affiliation: '' },
];

export const TeamPage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">協會團隊</h1>
          <p className="text-blue-200 text-lg">匯聚專業力量，共同推動產業發展</p>
        </div>
      </section>

      {/* Leaders */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">核心領導</h2>
            <div className="w-20 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {LEADERS.map((leader, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition">
                <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                  <img
                    src={leader.photo}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                      const placeholder = document.createElement('div');
                      placeholder.className = 'text-center p-6';
                      placeholder.innerHTML = `
                        <div class="w-32 h-32 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                          <svg class="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <p class="text-sm text-gray-400">照片待上傳</p>
                      `;
                      target.parentElement!.appendChild(placeholder);
                    }}
                  />
                </div>
                <div className="p-6 text-center">
                  <div className="inline-block px-3 py-1 bg-accent text-white text-xs font-bold rounded-full mb-3">
                    {leader.title}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{leader.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{leader.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board Members Table */}
      <section className="py-12 md:py-20 bg-gray-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">理監事名單</h2>
            <div className="w-20 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">職稱</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">姓名</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">服務單位</th>
                </tr>
              </thead>
              <tbody>
                {BOARD_MEMBERS.map((member, i) => (
                  <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-blue-50'} hover:bg-blue-100 transition`}>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        member.role.includes('常務') ? 'bg-accent text-white' : 'bg-blue-100 text-primary'
                      }`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{member.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 hidden sm:table-cell">{member.affiliation || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            名單持續更新中，如有異動以協會正式公告為準。
          </p>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';

// 牧場人才培訓計畫歷年成果（來源：「牧場人才培訓計畫｜2026」簡報第 9 頁，2026.03 更新）
// 每年更新時改這三組數字即可
const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
const PARTICIPANTS = [4, 7, 12, 29, 41, 60, 67, 75, 84, 90, 98, 108]; // 累計參與實習人次
const JOINED = [1, 1, 1, 1, 1, 3, 9, 12, 13, 13, 13, 13]; // 累計加入產業人次

// 學員回饋問卷（滿分 10 分）
const FEEDBACK = [
  { label: '有助於了解酪農產業', score: 9.63 },
  { label: '實習過程中的輔導與關心', score: 8.7 },
  { label: '實習有助於未來職涯規劃', score: 8.51 },
  { label: '向同儕推薦本次的實習', score: 8.49 },
  { label: '計畫的安排與流程順暢度', score: 8.35 },
];

const C_PART = '#2E74A6';
const C_JOIN = '#C2554F';

const W = 520;
const H = 300;
const PAD = { l: 36, r: 34, t: 16, b: 30 };
const Y_MAX = 120;
const x = (i: number) => PAD.l + (i * (W - PAD.l - PAD.r)) / (YEARS.length - 1);
const y = (v: number) => H - PAD.b - (v * (H - PAD.t - PAD.b)) / Y_MAX;
const path = (vals: number[]) => vals.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');

const GrowthChart: React.FC = () => {
  const [hover, setHover] = useState<number | null>(null);
  const last = YEARS.length - 1;
  const step = (W - PAD.l - PAD.r) / last;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6">
      <h3 className="text-base font-bold text-gray-900 mb-1">歷年累計參與人次</h3>
      <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-600 mb-3">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: C_PART }} />累計參與實習人次
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: C_JOIN }} />累計加入產業人次
        </span>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          role="img"
          aria-label={`歷年累計參與實習人次由 ${YEARS[0]} 年的 ${PARTICIPANTS[0]} 人次成長到 ${YEARS[last]} 年的 ${PARTICIPANTS[last]} 人次；累計加入產業 ${JOINED[last]} 人次`}
          onMouseLeave={() => setHover(null)}
        >
          {[0, 40, 80, 120].map(v => (
            <g key={v}>
              <line x1={PAD.l} x2={W - PAD.r} y1={y(v)} y2={y(v)} stroke="#E5E7EB" strokeWidth={1} />
              <text x={PAD.l - 8} y={y(v) + 4} fontSize={11} textAnchor="end" fill="#9CA3AF">{v}</text>
            </g>
          ))}
          {YEARS.map((yr, i) =>
            i % 2 === 1 || i === last ? (
              <text key={yr} x={x(i)} y={H - 10} fontSize={11} textAnchor="middle" fill="#9CA3AF">{yr}</text>
            ) : null
          )}

          {hover !== null && (
            <line x1={x(hover)} x2={x(hover)} y1={PAD.t} y2={H - PAD.b} stroke="#9CA3AF" strokeWidth={1} strokeDasharray="3 3" />
          )}

          <path d={path(PARTICIPANTS)} fill="none" stroke={C_PART} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          <path d={path(JOINED)} fill="none" stroke={C_JOIN} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

          {/* 只標最新一年的數字，其餘年份滑過或點按查看 */}
          {[
            { vals: PARTICIPANTS, c: C_PART },
            { vals: JOINED, c: C_JOIN },
          ].map(s => (
            <g key={s.c}>
              {hover !== null && hover !== last && (
                <circle cx={x(hover)} cy={y(s.vals[hover])} r={4} fill={s.c} stroke="#fff" strokeWidth={2} />
              )}
              <circle cx={x(last)} cy={y(s.vals[last])} r={4.5} fill={s.c} stroke="#fff" strokeWidth={2} />
              <text x={x(last)} y={y(s.vals[last]) - 10} fontSize={13} fontWeight={700} textAnchor="middle" fill="#111827">
                {s.vals[last]}
              </text>
            </g>
          ))}

          {YEARS.map((yr, i) => (
            <rect
              key={yr}
              x={x(i) - step / 2}
              y={0}
              width={step}
              height={H}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
              onClick={() => setHover(i)}
            />
          ))}
        </svg>

        {hover !== null && (
          <div
            className="absolute top-2 pointer-events-none bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2 text-xs whitespace-nowrap"
            style={hover > last / 2 ? { right: `${100 - (x(hover) / W) * 100 + 3}%` } : { left: `${(x(hover) / W) * 100 + 3}%` }}
          >
            <div className="font-bold text-gray-900 mb-1">{YEARS[hover]} 年</div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <span className="w-2 h-2 rounded-full" style={{ background: C_PART }} />累計參與 <b className="text-gray-900">{PARTICIPANTS[hover]}</b> 人次
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <span className="w-2 h-2 rounded-full" style={{ background: C_JOIN }} />加入產業 <b className="text-gray-900">{JOINED[hover]}</b> 人次
            </div>
          </div>
        )}
      </div>

      <details className="mt-3 text-xs text-gray-500">
        <summary className="cursor-pointer hover:text-primary">查看各年度數字</summary>
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="text-gray-400">
                <th className="text-left font-medium py-1 pr-3 whitespace-nowrap">年度</th>
                {YEARS.map(yr => <th key={yr} className="font-medium px-1.5">{String(yr).slice(2)}</th>)}
              </tr>
            </thead>
            <tbody className="tabular-nums text-gray-700">
              <tr className="border-t border-gray-100">
                <td className="text-left py-1 pr-3 whitespace-nowrap">參與實習</td>
                {PARTICIPANTS.map((v, i) => <td key={i} className="px-1.5">{v}</td>)}
              </tr>
              <tr className="border-t border-gray-100">
                <td className="text-left py-1 pr-3 whitespace-nowrap">加入產業</td>
                {JOINED.map((v, i) => <td key={i} className="px-1.5">{v}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
};

const FeedbackBars: React.FC = () => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6">
    <h3 className="text-base font-bold text-gray-900 mb-1">學員回饋</h3>
    <p className="text-xs text-gray-500 mb-5">實習後問卷平均分數，滿分 10 分</p>
    <div className="space-y-4">
      {FEEDBACK.map(f => (
        <div key={f.label}>
          <div className="flex items-baseline justify-between gap-3 mb-1.5">
            <span className="text-sm text-gray-700">{f.label}</span>
            <span className="text-sm font-bold text-gray-900 tabular-nums">{f.score.toFixed(2)}</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${f.score * 10}%`, background: C_PART }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const TrainingResults: React.FC = () => {
  const last = YEARS.length - 1;
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto mb-8">
        <div className="text-center p-5 md:p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="text-3xl md:text-4xl font-black text-primary mb-1">{PARTICIPANTS[last]}</div>
          <div className="text-sm text-gray-600">累計參與實習人次</div>
          <div className="text-xs text-gray-400 mt-1">{YEARS[0]}–{YEARS[last]}</div>
        </div>
        <div className="text-center p-5 md:p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="text-3xl md:text-4xl font-black text-primary mb-1">{JOINED[last]} 位</div>
          <div className="text-sm text-gray-600">畢業後投入乳牛產業</div>
          <div className="text-xs text-gray-400 mt-1">約占已畢業學員 16%</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GrowthChart />
        <FeedbackBars />
      </div>
    </div>
  );
};

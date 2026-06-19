import React from 'react';
import { TW_VIEWBOX, TW_COUNTIES, TW_CENTROIDS } from './taiwanGeo';

export interface RegionGroup {
  region: string;
  count: number;
}

interface Props {
  groups: RegionGroup[];
  activeRegion: string | null;
  onSelect: (region: string) => void;
}

export const TaiwanMap: React.FC<Props> = ({ groups, activeRegion, onSelect }) => {
  const brandCores = new Set(groups.map(g => g.region));

  return (
    <svg
      viewBox={TW_VIEWBOX}
      className="w-full h-auto max-w-[300px] sm:max-w-[340px] mx-auto select-none"
      style={{ filter: 'drop-shadow(0 3px 8px rgba(20,45,30,.18))' }}
      role="img"
      aria-label="台灣特色鮮乳乳源分佈地圖"
    >
      {/* 縣市底圖（有品牌的縣市顏色較深，點選中變金色） */}
      {TW_COUNTIES.map(c => {
        const isBrand = brandCores.has(c.core);
        const isActive = activeRegion === c.core;
        const fill = isActive ? '#D4A017' : isBrand ? '#5C9E45' : '#8AC76B';
        return (
          <path
            key={c.name}
            d={c.path}
            fill={fill}
            stroke="#ffffff"
            strokeWidth={0.8}
            className={isBrand ? 'cursor-pointer' : ''}
            onClick={isBrand ? () => onSelect(c.core) : undefined}
            style={{ transition: 'fill .2s' }}
          />
        );
      })}

      {/* 乳源標記 */}
      {groups.map(({ region, count }) => {
        const p = TW_CENTROIDS[region];
        if (!p) return null;
        const active = activeRegion === region;
        return (
          <g key={region} className="cursor-pointer" onClick={() => onSelect(region)}>
            {active && <circle cx={p.x} cy={p.y} r={18} fill="#D4A017" opacity={0.3} />}
            <circle
              cx={p.x}
              cy={p.y}
              r={12}
              fill={active ? '#D4A017' : '#1E2D4E'}
              stroke="#ffffff"
              strokeWidth={2.5}
            />
            <text x={p.x} y={p.y + 4.5} textAnchor="middle" fontSize={13} fontWeight={700} fill="#ffffff">
              {count}
            </text>
            <text
              x={p.x}
              y={p.y - 16}
              textAnchor="middle"
              fontSize={12.5}
              fontWeight={700}
              fill="#1E2D4E"
              stroke="#ffffff"
              strokeWidth={3.5}
              paintOrder="stroke"
            >
              {region}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

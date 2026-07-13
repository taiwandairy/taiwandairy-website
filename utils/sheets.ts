const SHEET_ID = '1f3aLrPoWjBhXETAtBJrtuaOCpqyjMDDcDYmWKwgeWTE';
const NEWS_GID = '1743163530';
const MEDIA_GID = '1656517806';

// 特色鮮乳品牌資料來自「網站發布用」試算表（只含公開欄位；原表單回覆表含洽談人個資、已改為私人）
// 有新品牌入會時，需從原回覆表同步公開欄位到這張發布表
const DAIRY_SHEET_ID = '1BZdz1D9DxUNyO6uhMa-lwDT6ln1jfECqq2JMjEhHlAQ';
const DAIRY_GID = '1629092294';

export function safeHttpUrl(url: string): string {
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return '';
}

function buildCsvUrl(gid: string, sheetId: string = SHEET_ID): string {
  // headers=1 強制 gviz 只把第 1 行當表頭；不加的話 gviz 會根據儲存格換行 heuristic 猜表頭行數，
  // 一旦摘要欄有多行內容，整張表會被壓成單列導致前端解析後 0 筆。
  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=${gid}&headers=1`;
}

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let current = '';
  let inQuotes = false;
  let row: string[] = [];

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        row.push(current);
        current = '';
      } else if (ch === '\n' || (ch === '\r' && text[i + 1] === '\n')) {
        row.push(current);
        current = '';
        rows.push(row);
        row = [];
        if (ch === '\r') i++;
      } else {
        current += ch;
      }
    }
  }
  if (current || row.length > 0) {
    row.push(current);
    rows.push(row);
  }
  return rows;
}

function csvToObjects(text: string): Record<string, string>[] {
  const rows = parseCSV(text);
  if (rows.length < 2) return [];
  const headers = rows[0];
  return rows.slice(1).map(row => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = row[i] || '';
    });
    return obj;
  });
}

export interface SheetNewsItem {
  date: string;
  title: string;
  tag: string;
  summary: string;
  link: string;
  linkText: string;
}

export interface SheetMediaItem {
  date: string;
  title: string;
  type: 'article' | 'video';
  source: string;
  summary: string;
  link: string;
}

export async function fetchNewsItems(): Promise<SheetNewsItem[]> {
  const res = await fetch(buildCsvUrl(NEWS_GID));
  if (!res.ok) throw new Error('Failed to fetch news');
  const text = await res.text();
  const rows = csvToObjects(text);
  return rows
    .filter(r => r['顯示'] === 'Y')
    .map(r => ({
      date: r['日期'] || '',
      title: r['標題'] || '',
      tag: r['標籤'] || '',
      summary: r['摘要'] || '',
      link: r['連結'] || '',
      linkText: r['連結文字'] || '了解更多',
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function fetchMediaItems(): Promise<SheetMediaItem[]> {
  const res = await fetch(buildCsvUrl(MEDIA_GID));
  if (!res.ok) throw new Error('Failed to fetch media');
  const text = await res.text();
  const rows = csvToObjects(text);
  return rows
    .filter(r => r['顯示'] === 'Y')
    .map(r => ({
      date: r['日期'] || '',
      title: r['標題'] || '',
      type: r['類型'] === '影片' ? 'video' as const : 'article' as const,
      source: r['來源'] || '',
      summary: r['摘要'] || '',
      link: r['連結'] || '',
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

// ===== 特色鮮乳品牌 =====

export interface SheetDairyBrand {
  company: string;       // 公司全名
  brand: string;         // 品牌名稱
  slogan: string;        // 一句 slogan
  intro: string;         // 品牌簡介
  products: string;      // 提供之產品
  origin: string;        // 乳源牧場 / 產地（原始字串）
  certifications: string[]; // 認證／標章
  channels: string;      // 可購買通路
  website: string;       // 官網
  social: string;        // 社群
  video: string;         // 影音
  region: string;        // 推斷出的縣市（給地圖用）
}

// 鄉鎮 → 縣市（比縣市名更精確，優先比對）
const TOWNSHIP_TO_COUNTY: Record<string, string> = {
  柳營: '台南', 崙背: '雲林', 福興: '彰化', 竹南: '苗栗',
  阿蓮: '高雄', 民雄: '嘉義', 初鹿: '台東',
};
const COUNTIES = [
  '台北', '新北', '基隆', '桃園', '新竹', '苗栗', '台中', '彰化', '南投',
  '雲林', '嘉義', '台南', '高雄', '屏東', '宜蘭', '花蓮', '台東', '澎湖', '金門', '連江',
];
// 表單「乳源/產地」欄位陸續補齊前，少數品牌文字判讀不到，先用已知公開事實補位（之後表單填了會自動覆蓋）
const BRAND_REGION_FALLBACK: Record<string, string> = {
  高大牧場: '高雄', 綠盈牧場: '嘉義',
};

function inferRegion(brand: string, origin: string, intro: string, company: string): string {
  const text = `${origin} ${intro} ${company}`.replace(/臺/g, '台');
  for (const [town, county] of Object.entries(TOWNSHIP_TO_COUNTY)) {
    if (text.includes(town)) return county;
  }
  for (const c of COUNTIES) {
    if (text.includes(c)) return c;
  }
  return BRAND_REGION_FALLBACK[brand] || '';
}

// 表單回覆的表頭是「1-2. 品牌名稱」這種帶序號前綴的字串，用前綴比對較穩
function pick(row: Record<string, string>, prefix: string): string {
  const key = Object.keys(row).find(k => k.trim().startsWith(prefix));
  return key ? (row[key] || '').trim() : '';
}

export async function fetchDairyBrands(): Promise<SheetDairyBrand[]> {
  const res = await fetch(buildCsvUrl(DAIRY_GID, DAIRY_SHEET_ID));
  if (!res.ok) throw new Error('Failed to fetch dairy brands');
  const text = await res.text();
  const rows = csvToObjects(text);
  return rows
    .map(r => {
      const brand = pick(r, '1-2');
      const origin = pick(r, '2-2');   // 2-2 乳源產地（驅動地圖分區）
      const farm = pick(r, '2-4');     // 2-4 乳源牧場（表單改版後新分出的欄位）
      const intro = pick(r, '1-4');
      const company = pick(r, '1-1');
      return {
        company,
        brand,
        slogan: pick(r, '1-3'),
        intro,
        products: pick(r, '2-1'),
        // 顯示用：有分開填牧場就併成「產地（牧場）」，否則只顯示產地
        origin: farm && origin ? `${origin}（${farm}）` : (origin || farm),
        // 認證：表單在乳源段插入「乳源類型/乳源牧場」後，認證欄由 2-3 移到 2-5
        certifications: pick(r, '2-5')
          .split(/[,、，]/)
          .map(s => s.trim())
          .filter(Boolean),
        channels: pick(r, '2-6'),   // 可購買通路由 2-4 移到 2-6
        website: pick(r, '3-1'),
        social: pick(r, '3-2'),
        video: pick(r, '3-3'),
        region: inferRegion(brand, origin, intro, company),
      };
    })
    .filter(b => b.brand);
}

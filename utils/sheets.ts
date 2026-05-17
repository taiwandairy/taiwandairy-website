const SHEET_ID = '1f3aLrPoWjBhXETAtBJrtuaOCpqyjMDDcDYmWKwgeWTE';
const NEWS_GID = '1743163530';
const MEDIA_GID = '1656517806';

function buildCsvUrl(gid: string): string {
  // headers=1 強制 gviz 只把第 1 行當表頭；不加的話 gviz 會根據儲存格換行 heuristic 猜表頭行數，
  // 一旦摘要欄有多行內容，整張表會被壓成單列導致前端解析後 0 筆。
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${gid}&headers=1`;
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

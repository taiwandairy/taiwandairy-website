export type Page = 'home' | 'charter' | 'team' | 'news' | 'training' | 'media' | 'dairy' | 'tasting' | 'exchange';

export interface NavItem {
  label: string;
  page: Page;
  children?: { label: string; page: Page }[];
}

export interface TeamMember {
  name: string;
  title: string;
  photo?: string;
  description?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  link?: string;
}

export interface MediaItem {
  id: string;
  title: string;
  date: string;
  type: 'article' | 'video';
  source: string;
  link?: string;
  thumbnail?: string;
}

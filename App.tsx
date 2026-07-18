import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CharterPage } from './pages/CharterPage';
import { TeamPage } from './pages/TeamPage';
import { NewsPage } from './pages/NewsPage';
import { PromotionPage } from './pages/PromotionPage';
import { TrainingPage } from './pages/TrainingPage';
import { MediaPage } from './pages/MediaPage';
import { DairyPage } from './pages/DairyPage';
import { TastingPage } from './pages/TastingPage';
import { ExchangePage } from './pages/ExchangePage';
import { WeeklyPage } from './pages/WeeklyPage';
import { trackPageView } from './utils/analytics';

type Page = 'home' | 'charter' | 'team' | 'news' | 'promotion' | 'training' | 'media' | 'dairy' | 'tasting' | 'exchange' | 'weekly';

const ROUTE_MAP: Record<string, Page> = {
  '': 'home',
  'home': 'home',
  'charter': 'charter',
  'team': 'team',
  'news': 'news',
  'promotion': 'promotion',
  'training': 'training',
  'media': 'media',
  'dairy': 'dairy',
  'tasting': 'tasting',
  'exchange': 'exchange',
  'weekly': 'weekly',
};

function getPageFromHash(): Page {
  const hash = window.location.hash.replace('#', '');
  return ROUTE_MAP[hash] || 'home';
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromHash);

  // 初次載入與每次換頁都回報 GA page_view（含 hashchange 與點導覽列兩條路徑）
  useEffect(() => {
    trackPageView(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const onHashChange = () => {
      setCurrentPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (page: Page) => {
    window.location.hash = page === 'home' ? '' : page;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={navigate} />;
      case 'charter': return <CharterPage />;
      // 團隊頁暫時隱藏（理監事名單多為待補），內容齊全後改回 <TeamPage />
      case 'team': return <HomePage onNavigate={navigate} />;
      case 'news': return <NewsPage />;
      case 'promotion': return <PromotionPage />;
      case 'training': return <TrainingPage />;
      case 'media': return <MediaPage />;
      case 'dairy': return <DairyPage />;
      case 'tasting': return <TastingPage />;
      case 'exchange': return <ExchangePage />;
      case 'weekly': return <WeeklyPage />;
      default: return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;

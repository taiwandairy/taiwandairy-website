import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CharterPage } from './pages/CharterPage';
import { TeamPage } from './pages/TeamPage';
import { NewsPage } from './pages/NewsPage';
import { TrainingPage } from './pages/TrainingPage';
import { MediaPage } from './pages/MediaPage';
import { DairyPage } from './pages/DairyPage';
import { TastingPage } from './pages/TastingPage';
import { ExchangePage } from './pages/ExchangePage';

type Page = 'home' | 'charter' | 'team' | 'news' | 'training' | 'media' | 'dairy' | 'tasting' | 'exchange';

const ROUTE_MAP: Record<string, Page> = {
  '': 'home',
  'home': 'home',
  'charter': 'charter',
  'team': 'team',
  'news': 'news',
  'training': 'training',
  'media': 'media',
  'dairy': 'dairy',
  'tasting': 'tasting',
  'exchange': 'exchange',
};

function getPageFromHash(): Page {
  const hash = window.location.hash.replace('#', '');
  return ROUTE_MAP[hash] || 'home';
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromHash);

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
      case 'team': return <HomePage onNavigate={navigate} />;
      case 'news': return <NewsPage />;
      case 'training': return <TrainingPage />;
      case 'media': return <MediaPage />;
      case 'dairy': return <DairyPage />;
      case 'tasting': return <TastingPage />;
      case 'exchange': return <ExchangePage />;
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

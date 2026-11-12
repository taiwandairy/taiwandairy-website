import React, { useState } from 'react';
import type { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [industryOpen, setIndustryOpen] = useState(false);
  const [latestOpen, setLatestOpen] = useState(false);

  const isActive = (page: Page) => currentPage === page;
  const isAboutActive = currentPage === 'history' || currentPage === 'members' || currentPage === 'charter' || currentPage === 'team';
  const isIndustryActive = currentPage === 'weekly' || currentPage === 'exchange';
  const isLatestActive = currentPage === 'news' || currentPage === 'promotion' || currentPage === 'media' || currentPage === 'hotpot' || currentPage === 'results';

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
    setAboutOpen(false);
    setIndustryOpen(false);
    setLatestOpen(false);
  };

  return (
    <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center hover:opacity-90 transition"
            aria-label="台灣農酪產業永續發展協會"
          >
            <img
              src="/images/logo-horizontal-white.png"
              alt="台灣農酪產業永續發展協會 Taiwan Dairy Farming Sustainable Development Association"
              className="h-10 md:h-14 w-auto"
            />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink active={isActive('home')} onClick={() => handleNav('home')}>首頁</NavLink>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  isAboutActive ? 'bg-primary-light text-white' : 'text-blue-100 hover:bg-primary-light hover:text-white'
                }`}
              >
                認識協會
                <svg className="inline-block ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {aboutOpen && (
                <div className="absolute top-full left-0 mt-0 w-40 bg-white rounded-lg shadow-xl py-2 z-50">
                  <button
                    onClick={() => handleNav('history')}
                    className={`block w-full text-left px-4 py-2 text-sm transition ${
                      isActive('history') ? 'bg-blue-50 text-primary font-semibold' : 'text-gray-700 hover:bg-blue-50 hover:text-primary'
                    }`}
                  >
                    協會歷程
                  </button>
                  <button
                    onClick={() => handleNav('members')}
                    className={`block w-full text-left px-4 py-2 text-sm transition ${
                      isActive('members') ? 'bg-blue-50 text-primary font-semibold' : 'text-gray-700 hover:bg-blue-50 hover:text-primary'
                    }`}
                  >
                    協會會員
                  </button>
                  <button
                    onClick={() => handleNav('charter')}
                    className={`block w-full text-left px-4 py-2 text-sm transition ${
                      isActive('charter') ? 'bg-blue-50 text-primary font-semibold' : 'text-gray-700 hover:bg-blue-50 hover:text-primary'
                    }`}
                  >
                    協會章程
                  </button>
                  {/* 團隊介紹入口暫時隱藏：TeamPage 理監事名單多為待補，內容齊全後再開放 */}
                </div>
              )}
            </div>

            <NavLink active={isActive('dairy')} onClick={() => handleNav('dairy')}>特色鮮乳</NavLink>
            <NavLink active={isActive('training')} onClick={() => handleNav('training')}>人才培育</NavLink>
            <NavLink active={isActive('tasting')} onClick={() => handleNav('tasting')}>風味品鑑</NavLink>

            <NavDropdown label="產業資訊" active={isIndustryActive} open={industryOpen} setOpen={setIndustryOpen}>
              <DropdownLink active={isActive('weekly')} onClick={() => handleNav('weekly')}>乳業週報</DropdownLink>
              <DropdownLink active={isActive('exchange')} onClick={() => handleNav('exchange')}>產業交流</DropdownLink>
            </NavDropdown>

            <NavDropdown label="協會動態" active={isLatestActive} open={latestOpen} setOpen={setLatestOpen}>
              <DropdownLink active={isActive('promotion')} onClick={() => handleNav('promotion')}>台灣乳品推廣活動</DropdownLink>
              <DropdownLink active={isActive('hotpot')} onClick={() => handleNav('hotpot')}>國產鮮乳火鍋季</DropdownLink>
              <DropdownLink active={isActive('results')} onClick={() => handleNav('results')}>年度成果</DropdownLink>
              <DropdownLink active={isActive('media')} onClick={() => handleNav('media')}>影音媒體</DropdownLink>
              <DropdownLink active={isActive('news')} onClick={() => handleNav('news')}>會務新知</DropdownLink>
            </NavDropdown>

            {/* 加入我們：招募 CTA，用 accent 金色與其他項目區隔 */}
            <button
              onClick={() => handleNav('join')}
              className={`ml-2 px-4 py-2 rounded-md text-sm font-semibold transition ${
                isActive('join') ? 'bg-accent text-white' : 'bg-accent/90 text-white hover:bg-accent'
              }`}
            >
              加入我們
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-md hover:bg-primary-light transition"
            aria-label="選單"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-primary-dark border-t border-blue-800">
          <div className="px-4 py-3 space-y-1">
            <MobileNavLink active={isActive('home')} onClick={() => handleNav('home')}>首頁</MobileNavLink>
            <div className="text-xs text-blue-300 px-3 pt-3 pb-1 font-medium uppercase tracking-wide">認識協會</div>
            <MobileNavLink active={isActive('history')} onClick={() => handleNav('history')}>協會歷程</MobileNavLink>
            <MobileNavLink active={isActive('members')} onClick={() => handleNav('members')}>協會會員</MobileNavLink>
            <MobileNavLink active={isActive('charter')} onClick={() => handleNav('charter')}>協會章程</MobileNavLink>
            {/* 團隊介紹入口暫時隱藏：TeamPage 理監事名單多為待補，內容齊全後再開放 */}
            <div className="border-t border-blue-800 my-2"></div>
            <MobileNavLink active={isActive('dairy')} onClick={() => handleNav('dairy')}>特色鮮乳</MobileNavLink>
            <MobileNavLink active={isActive('training')} onClick={() => handleNav('training')}>人才培育</MobileNavLink>
            <MobileNavLink active={isActive('tasting')} onClick={() => handleNav('tasting')}>風味品鑑</MobileNavLink>
            <div className="text-xs text-blue-300 px-3 pt-3 pb-1 font-medium uppercase tracking-wide">產業資訊</div>
            <MobileNavLink active={isActive('weekly')} onClick={() => handleNav('weekly')}>乳業週報</MobileNavLink>
            <MobileNavLink active={isActive('exchange')} onClick={() => handleNav('exchange')}>產業交流</MobileNavLink>
            <div className="text-xs text-blue-300 px-3 pt-3 pb-1 font-medium uppercase tracking-wide">協會動態</div>
            <MobileNavLink active={isActive('promotion')} onClick={() => handleNav('promotion')}>台灣乳品推廣活動</MobileNavLink>
            <MobileNavLink active={isActive('hotpot')} onClick={() => handleNav('hotpot')}>國產鮮乳火鍋季</MobileNavLink>
            <MobileNavLink active={isActive('results')} onClick={() => handleNav('results')}>年度成果</MobileNavLink>
            <MobileNavLink active={isActive('media')} onClick={() => handleNav('media')}>影音媒體</MobileNavLink>
            <MobileNavLink active={isActive('news')} onClick={() => handleNav('news')}>會務新知</MobileNavLink>
            <div className="border-t border-blue-800 my-2"></div>
            <button
              onClick={() => handleNav('join')}
              className="block w-full text-center px-3 py-2 rounded-md text-sm font-semibold bg-accent text-white hover:opacity-90 transition"
            >
              加入我們
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

const NavDropdown: React.FC<{ label: string; active: boolean; open: boolean; setOpen: (v: boolean) => void; children: React.ReactNode }> = ({ label, active, open, setOpen, children }) => (
  <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
    <button
      className={`px-4 py-2 rounded-md text-sm font-medium transition ${
        active ? 'bg-primary-light text-white' : 'text-blue-100 hover:bg-primary-light hover:text-white'
      }`}
    >
      {label}
      <svg className="inline-block ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    {open && <div className="absolute top-full left-0 mt-0 w-48 bg-white rounded-lg shadow-xl py-2 z-50">{children}</div>}
  </div>
);

const DropdownLink: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`block w-full text-left px-4 py-2 text-sm transition ${
      active ? 'bg-blue-50 text-primary font-semibold' : 'text-gray-700 hover:bg-blue-50 hover:text-primary'
    }`}
  >
    {children}
  </button>
);

const NavLink: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md text-sm font-medium transition ${
      active ? 'bg-primary-light text-white' : 'text-blue-100 hover:bg-primary-light hover:text-white'
    }`}
  >
    {children}
  </button>
);

const MobileNavLink: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition ${
      active ? 'bg-primary-light text-white' : 'text-blue-100 hover:bg-primary-light'
    }`}
  >
    {children}
  </button>
);

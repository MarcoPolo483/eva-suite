import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [lang, setLang] = useState<'en' | 'fr'>('en');

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-header-row">
            <Link to="/" className="app-title">
              <span aria-hidden="true">✨</span>
              <div>
                <div className="app-title-main">EVA Suite</div>
                <div className="app-title-sub">
                  Personal lab – Dec 24, 2025 demo
                </div>
              </div>
            </Link>
            <nav className="app-nav" aria-label="Main navigation">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'app-nav-link--active' : undefined
                }
              >
                {lang === 'en' ? 'Products' : 'Produits'}
              </NavLink>
              <button
                type="button"
                className="app-lang-toggle"
                onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
                aria-label={
                  lang === 'en' ? 'Passer en français' : 'Switch to English'
                }
              >
                {lang === 'en' ? 'FR' : 'EN'}
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="app-main-inner">{children}</div>
      </main>

      <footer className="app-footer">
        <div className="app-footer-inner">
          <span>© {new Date().getFullYear()} EVA Suite Lab</span>
          <span>Built with ChatGPT + Copilot</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

import React from 'react';
import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useI18n } from '../i18n/i18n';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { lang, toggleLanguage, t } = useI18n();

  return (
    <div className="app-shell">
      <header className="app-header" style={{
        background: '#26374a',
        borderBottom: '4px solid #ffbf47',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        <div className="app-header-inner">
          <div className="app-header-row">
            <Link to="/" className="app-title" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              color: '#ffffff',
              textDecoration: 'none'
            }}>
              <span aria-hidden="true" style={{ fontSize: '2.5rem' }}>🍁</span>
              <div>
                <div className="app-title-main" style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  fontFamily: "'Lato', sans-serif"
                }}>
                  {t('appTitle')}
                </div>
                <div className="app-title-sub" style={{
                  fontSize: '0.75rem',
                  opacity: 0.9,
                  fontWeight: 400
                }}>
                  {t('heroTagline')}
                </div>
              </div>
            </Link>
            <nav className="app-nav" aria-label="Main navigation" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'app-nav-link--active' : undefined
                }
                style={({ isActive }) => ({
                  color: '#ffffff',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  transition: 'all 0.3s',
                  background: isActive ? 'rgba(255, 191, 71, 0.3)' : 'transparent',
                  fontWeight: isActive ? 600 : 400
                })}
              >
                {t('navProducts')}
              </NavLink>
              <NavLink
                to="/devtools"
                className={({ isActive }) =>
                  isActive ? 'app-nav-link--active' : undefined
                }
                style={({ isActive }) => ({
                  color: '#ffffff',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  transition: 'all 0.3s',
                  background: isActive ? 'rgba(255, 191, 71, 0.3)' : 'transparent',
                  fontWeight: isActive ? 600 : 400
                })}
              >
                {t('navDevTools')}
              </NavLink>
              <NavLink
                to="/gc-demo"
                className={({ isActive }) =>
                  isActive ? 'app-nav-link--active' : undefined
                }
                style={({ isActive }) => ({
                  color: '#ffffff',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  transition: 'all 0.3s',
                  background: isActive ? 'rgba(255, 191, 71, 0.3)' : 'rgba(39, 132, 0, 0.15)',
                  border: '1px solid rgba(39, 132, 0, 0.3)',
                  fontWeight: isActive ? 600 : 500
                })}
              >
                🍁 GC Demo
              </NavLink>
              <button
                type="button"
                className="app-lang-toggle"
                onClick={toggleLanguage}
                aria-label={
                  lang === 'en'
                    ? 'Basculer l\'interface en français'
                    : 'Switch interface to English'
                }
                style={{
                  background: '#0535d2',
                  border: '2px solid #ffbf47',
                  color: '#ffffff',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#ffbf47';
                  e.currentTarget.style.color = '#26374a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#0535d2';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                {lang.toUpperCase()}
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="app-main-inner">{children}</div>
      </main>

      <footer className="app-footer" style={{
        background: '#26374a',
        color: 'rgba(255, 255, 255, 0.85)',
        padding: '2rem',
        textAlign: 'center',
        marginTop: '50px',
        borderTop: '4px solid #ffbf47'
      }}>
        <div className="app-footer-inner" style={{
          fontSize: '0.9rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🍁</span>
            <span>© {new Date().getFullYear()} EVA Suite Lab</span>
          </div>
          <span>{t('footer.builtWith')}</span>
          <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
            {lang === 'fr' 
              ? 'Conforme au Programme de coordination de l\'image de marque • WCAG 2.1 AA'
              : 'Federal Identity Program Compliant • WCAG 2.1 AA'}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

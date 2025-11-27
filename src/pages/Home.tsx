import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { EvaProduct } from '../components/ProductCard';
import rawData from '../data/eva-suite-products.json';
import { useI18n } from '../i18n/i18n';
import AuditTrailDashboard from '../components/AuditTrailDashboard';
import { getProductRouteSegment } from '../utils/productRoutes';

interface ExtendedProduct extends EvaProduct {
  use_case?: {
    title?: string;
    steps?: string[];
    result?: string;
  };
  moonshot?: string;
}

interface EvaSuiteJson {
  eva_suite: {
    total_products: number;
    categories: string[];
    vision?: {
      origin?: string;
      mission?: string;
      status?: string;
    };
    products: ExtendedProduct[];
  };
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const data = rawData as unknown as EvaSuiteJson;
  const suite = data.eva_suite;
  const products = suite.products ?? [];

  const [expandedCard, setExpandedCard] = useState<{ id: number; type: 'description' | 'usecase' } | null>(null);

  const showProductInfo = (productId: number, type: 'description' | 'usecase') => {
    // If clicking the same button on the same card, close it
    if (expandedCard?.id === productId && expandedCard?.type === type) {
      setExpandedCard(null);
    } else {
      // Otherwise, close any open card and open the new one
      setExpandedCard({ id: productId, type });
    }
  };

  const hasDemo = (product: ExtendedProduct): boolean => {
    const name = product.name.toLowerCase();
    return name.includes('liveops') ||
      name.includes('eva da') ||
      name.includes('devtools') ||
      name.includes('accessibility') ||
      name.includes('impact analyzer') ||
      name.includes('process mapper') ||
      name.includes('info assistant');
  };

  return (
    <>
      {/* Vision Banner - GC Styled */}
      <section className="vision-banner" aria-labelledby="vision-heading" style={{
        background: '#26374a',
        color: '#ffffff',
        padding: '3rem 0',
        borderBottom: '4px solid #ffbf47',
        marginBottom: '2rem'
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '3rem' }}>🍁</span>
            <h1 id="vision-heading" style={{
              margin: 0,
              fontSize: '2.5rem',
              fontWeight: 700,
              fontFamily: "'Lato', sans-serif",
              color: '#ffffff'
            }}>
              {t('home.vision.title')}
            </h1>
          </div>
          <div className="vision-story">
            <p>
              <strong style={{ color: '#ffbf47' }}>EVA Suite</strong> is an enterprise AI platform comprising{' '}
              <strong style={{ color: '#ffbf47' }}>24 products</strong> across 5 categories.
            </p>

            <div className="vision-highlight" style={{
              background: 'rgba(255, 191, 71, 0.15)',
              padding: '1.5rem',
              borderRadius: '8px',
              margin: '1.5rem auto',
              borderLeft: '4px solid #ffbf47',
              maxWidth: '850px'
            }}>
              <p style={{ fontSize: '1.15rem', fontStyle: 'italic', marginBottom: '0.5rem', color: '#ffffff' }}>
                <strong>"I see EVA everywhere... agents talking to agents."</strong>
              </p>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0 }}>– Marco's email, December 2023</p>
            </div>

            <p>
              Back in <strong style={{ color: '#ffbf47' }}>December 2023</strong>, before the world fully understood agentic AI,
              Marco wrote those prophetic words. He saw it: <strong style={{ color: '#ffbf47' }}>agents talking to agents</strong>,
              autonomous systems collaborating, AI that doesn't just answer questions but <em>takes action</em>.
            </p>

            <p><strong style={{ color: '#ffbf47' }}>Now, in 2025, Marco is making that vision real.</strong></p>

            <p className="signature" style={{
              fontSize: '0.85rem',
              opacity: 0.7,
              marginTop: '1.5rem'
            }}>
              Personal project of Marco • Vision from December 2023 • Reality in 2025
            </p>
          </div>
        </div>
      </section>

      {/* DevTools Hero Section - GC Styled */}
      <section className="card" style={{
        marginBottom: '2rem',
        background: '#ffffff',
        borderRadius: '8px',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '2px solid #278400',
        borderLeft: '6px solid #278400'
      }}>
        <div className="container">
          <h2 style={{
            color: '#278400',
            marginBottom: '1rem',
            fontSize: '1.8rem',
            fontWeight: 700,
            fontFamily: "'Lato', sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <span style={{ fontSize: '2rem' }}>⚙️</span>
            {t('home.devtools.hero.title')}
          </h2>
          <p style={{
            color: '#605e5c',
            fontSize: '1.1rem',
            marginBottom: '1.5rem',
            maxWidth: '800px',
            lineHeight: 1.6
          }}>
            {t('home.devtools.hero.subtitle')}
          </p>

          {/* Three Highlight Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.25rem',
            marginTop: '1.5rem'
          }}>
            <div style={{
              background: '#f5f5f5',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              borderLeft: '4px solid #278400'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔎</div>
              <h3 style={{
                color: '#26374a',
                fontSize: '1.1rem',
                marginBottom: '0.5rem',
                fontWeight: 600
              }}>
                {t('home.devtools.highlights.audit.title')}
              </h3>
              <p style={{ color: '#605e5c', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {t('home.devtools.highlights.audit.description')}
              </p>
            </div>
            <div style={{
              background: '#f5f5f5',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              borderLeft: '4px solid #278400'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚙️</div>
              <h3 style={{
                color: '#26374a',
                fontSize: '1.1rem',
                marginBottom: '0.5rem',
                fontWeight: 600
              }}>
                {t('home.devtools.highlights.automate.title')}
              </h3>
              <p style={{ color: '#605e5c', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {t('home.devtools.highlights.automate.description')}
              </p>
            </div>
            <div style={{
              background: '#f5f5f5',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              borderLeft: '4px solid #278400'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💸</div>
              <h3 style={{
                color: '#26374a',
                fontSize: '1.1rem',
                marginBottom: '0.5rem',
                fontWeight: 600
              }}>
                {t('home.devtools.highlights.measure.title')}
              </h3>
              <p style={{ color: '#605e5c', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {t('home.devtools.highlights.measure.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <div className="container">
        {/* EVA Audit Trail LiveOps Section - GC Styled */}
        <section className="card" style={{
          marginBottom: '2rem',
          background: '#ffffff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0',
          borderLeft: '4px solid #0535d2'
        }} aria-labelledby="audit-liveops-heading">
          <h3 id="audit-liveops-heading" style={{
            color: '#0535d2',
            marginBottom: '1rem',
            fontSize: '1.5rem',
            fontWeight: 700,
            fontFamily: "'Lato', sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>🎯</span> EVA Audit Trail LiveOps
          </h3>
          <p style={{
            marginBottom: '1.5rem',
            color: '#605e5c',
            lineHeight: 1.6
          }}>
            Real-time view of EVA Suite repository activity. Demonstrates operational transparency
            for IT shops & research labs implementing autonomous AI platforms.
          </p>
          <AuditTrailDashboard />
        </section>

        <div className="hero" style={{ textAlign: 'center', margin: '3rem 0' }}>
          <h2 style={{
            fontSize: '2.5rem',
            color: '#0535d2',
            marginBottom: '0.5rem',
            fontWeight: 700,
            fontFamily: "'Lato', sans-serif"
          }}>
            🚀 {t('home.dashboard.title')}
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#605e5c'
          }}>
            {t('home.dashboard.subtitle')}
          </p>
        </div>

        {/* Products Section - GC Styled */}
        <section className="card" style={{
          background: '#ffffff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0'
        }} aria-labelledby="products-heading">
          <h3 id="products-heading" style={{
            color: '#0535d2',
            marginBottom: '1rem',
            fontSize: '1.5rem',
            fontWeight: 700,
            fontFamily: "'Lato', sans-serif"
          }}>
            🎯 {t('home.products.title')} ({suite.total_products} Products) - Real Examples
          </h3>
          <p className="products-intro" style={{
            color: '#605e5c',
            marginBottom: '2rem',
            fontSize: '1.05rem',
            lineHeight: 1.6
          }}>
            {t('home.products.intro')}
            Click any product to see concrete examples.
          </p>

          <div className="eva-products">
            {products.map((product) => (
              <div
                key={product.id}
                className={`product-card ${expandedCard?.id === product.id ? 'expanded' : ''
                  }`}
                onClick={(e) => {
                  // Only navigate if this product has a demo AND not clicking a button
                  if (hasDemo(product) && !(e.target as HTMLElement).closest('button')) {
                    const routeSegment = getProductRouteSegment(product);
                    navigate(`/products/${routeSegment}`);
                  }
                }}
                style={{
                  cursor: hasDemo(product) ? 'pointer' : 'default',
                  background: hasDemo(product) ? '#ffffff' : '#fafafa',
                  border: hasDemo(product)
                    ? '2px solid #278400'
                    : '1px solid #e0e0e0',
                  borderLeft: hasDemo(product) ? '4px solid #278400' : '1px solid #e0e0e0',
                  opacity: hasDemo(product) ? 1 : 0.7,
                  boxShadow: hasDemo(product) ? '0 2px 8px rgba(39, 132, 0, 0.15)' : '0 1px 3px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (hasDemo(product)) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(39, 132, 0, 0.25)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (hasDemo(product)) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(39, 132, 0, 0.15)';
                  }
                }}
              >
                <div className="product-icon">{product.icon ?? '🧩'}</div>
                <h3 style={{
                  color: '#26374a',
                  fontSize: '1.4rem',
                  marginBottom: '1rem',
                  fontWeight: 700,
                  fontFamily: "'Lato', sans-serif"
                }}>
                  {product.name}
                </h3>
                <span className="product-category" style={{
                  background: '#f5f5f5',
                  color: '#605e5c',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  display: 'inline-block',
                  marginTop: 'auto',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  border: '1px solid #e0e0e0'
                }}>
                  {product.category}
                </span>
                {hasDemo(product) && (
                  <span style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    padding: '0.4rem 0.75rem',
                    fontSize: '0.7rem',
                    borderRadius: '12px',
                    background: '#d8eeca',
                    border: '1.5px solid #278400',
                    color: '#278400',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    boxShadow: '0 2px 6px rgba(39, 132, 0, 0.2)'
                  }}>
                    ✨ {t('home.demo.badge')}
                  </span>
                )}

                {product.has_dual_buttons && (
                  <div className="product-buttons" style={{
                    display: 'flex',
                    gap: '0.75rem',
                    justifyContent: 'center',
                    marginTop: '1.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid #e0e0e0'
                  }}>
                    <button
                      className={`product-btn ${expandedCard?.id === product.id && expandedCard?.type === 'description'
                        ? 'active'
                        : ''
                        }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        showProductInfo(product.id, 'description');
                      }}
                      style={{
                        background: expandedCard?.id === product.id && expandedCard?.type === 'description'
                          ? '#278400'
                          : '#0535d2',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        transition: 'all 0.3s',
                        textTransform: 'none'
                      }}
                    >
                      {t('product.description')}
                    </button>
                    <button
                      className={`product-btn ${expandedCard?.id === product.id && expandedCard?.type === 'usecase'
                        ? 'active'
                        : ''
                        }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        showProductInfo(product.id, 'usecase');
                      }}
                      style={{
                        background: expandedCard?.id === product.id && expandedCard?.type === 'usecase'
                          ? '#278400'
                          : '#0535d2',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        transition: 'all 0.3s',
                        textTransform: 'none'
                      }}
                    >
                      {t('product.useCase')}
                    </button>
                  </div>
                )}

                {expandedCard?.id === product.id && expandedCard?.type === 'description' && (
                  <div className="product-description" style={{
                    marginTop: '1.5rem',
                    padding: '1.5rem',
                    background: '#d7faff',
                    borderLeft: '4px solid #0535d2',
                    borderRadius: '4px',
                    color: '#26374a',
                    lineHeight: 1.6,
                    textAlign: 'left',
                    fontSize: '0.95rem'
                  }}>
                    <strong style={{ color: '#0535d2' }}>{t('product.example')}</strong> {product.description}
                    {product.moonshot && (
                      <>
                        {' '}
                        <strong style={{ color: '#0535d2' }}>{t('product.theArt')}</strong> {product.moonshot}
                      </>
                    )}
                  </div>
                )}

                {expandedCard?.id === product.id && expandedCard?.type === 'usecase' && product.use_case && (
                  <div className="product-usecase" style={{
                    marginTop: '1.5rem',
                    padding: '1.5rem',
                    background: '#d8eeca',
                    borderLeft: '4px solid #278400',
                    borderRadius: '4px',
                    color: '#26374a',
                    lineHeight: 1.6,
                    textAlign: 'left',
                    fontSize: '0.95rem'
                  }}>
                    {product.use_case.title && (
                      <>
                        <strong style={{ color: '#278400' }}>Use Case: {product.use_case.title}</strong>
                        <br />
                      </>
                    )}
                    {product.use_case.steps?.map((step, idx) => (
                      <React.Fragment key={idx}>
                        <strong style={{ color: '#278400' }}>{idx + 1})</strong> {step}
                        <br />
                      </React.Fragment>
                    ))}
                    {product.use_case.result && (
                      <>
                        <strong style={{ color: '#278400' }}>Result:</strong> {product.use_case.result}
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;

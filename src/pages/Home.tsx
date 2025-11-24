import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { EvaProduct } from '../components/ProductCard';
import rawData from '../data/eva-suite-products.json';
import { useI18n } from '../i18n/i18n';

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
           name.includes('process mapper');
  };

  return (
    <>
      {/* Vision Banner */}
      <section className="vision-banner" aria-labelledby="vision-heading">
        <div className="container">
          <h1 id="vision-heading">💫 {t('home.vision.title')}</h1>
          <div className="vision-story">
            <p>
              <strong>EVA Suite</strong> is an enterprise AI platform comprising{' '}
              <strong>24 products</strong> across 5 categories.
            </p>
            
            <div className="vision-highlight">
              <p>
                <strong>"I see EVA everywhere... agents talking to agents."</strong>
              </p>
              <p>– Marco's email, December 2023</p>
            </div>
            
            <p>
              Back in <strong>December 2023</strong>, before the world fully understood agentic AI,
              Marco wrote those prophetic words. He saw it: <strong>agents talking to agents</strong>,
              autonomous systems collaborating, AI that doesn't just answer questions but <em>takes action</em>.
            </p>
            
            <p><strong>Now, in 2025, Marco is making that vision real.</strong></p>
            
            <p className="signature">
              Personal project of Marco • Vision from December 2023 • Reality in 2025
            </p>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <div className="container">
        <div className="hero">
          <h2>🚀 {t('home.dashboard.title')}</h2>
          <p>{t('home.dashboard.subtitle')}</p>
        </div>

        {/* Products Section */}
        <section className="card" aria-labelledby="products-heading">
          <h3 id="products-heading">🎯 {t('home.products.title')} ({suite.total_products} Products) - Real Examples</h3>
          <p className="products-intro">
            {t('home.products.intro')}
            Click any product to see concrete examples.
          </p>
          
          <div className="eva-products">
            {products.map((product) => (
              <div 
                key={product.id} 
                className={`product-card ${
                  expandedCard?.id === product.id ? 'expanded' : ''
                }`}
                onClick={(e) => {
                  // Only navigate if this product has a demo AND not clicking a button
                  if (hasDemo(product) && !(e.target as HTMLElement).closest('button')) {
                    navigate(`/products/${product.id}`);
                  }
                }}
                style={{ 
                  cursor: hasDemo(product) ? 'pointer' : 'default',
                  background: hasDemo(product) 
                    ? 'linear-gradient(135deg, rgba(16, 124, 16, 0.15) 0%, rgba(40, 167, 69, 0.1) 100%)'
                    : undefined,
                  border: hasDemo(product) 
                    ? '2px solid rgba(40, 167, 69, 0.3)'
                    : undefined,
                  opacity: hasDemo(product) ? 1 : 0.7
                }}
              >
                <div className="product-icon">{product.icon ?? '🧩'}</div>
                <h3>{product.name}</h3>
                <span className="product-category">{product.category}</span>
                {hasDemo(product) && (
                  <span style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    padding: '0.4rem 0.75rem',
                    fontSize: '0.7rem',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(40, 167, 69, 0.2) 0%, rgba(74, 222, 128, 0.25) 100%)',
                    border: '1.5px solid rgba(40, 167, 69, 0.6)',
                    color: '#22c55e',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    boxShadow: '0 2px 8px rgba(40, 167, 69, 0.25)',
                    backdropFilter: 'blur(4px)'
                  }}>
                    ✨ {t('home.demo.badge')}
                  </span>
                )}
                
                {product.has_dual_buttons && (
                  <div className="product-buttons">
                    <button
                      className={`product-btn ${
                        expandedCard?.id === product.id && expandedCard?.type === 'description'
                          ? 'active'
                          : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        showProductInfo(product.id, 'description');
                      }}
                    >
                      {t('product.description')}
                    </button>
                    <button
                      className={`product-btn ${
                        expandedCard?.id === product.id && expandedCard?.type === 'usecase'
                          ? 'active'
                          : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        showProductInfo(product.id, 'usecase');
                      }}
                    >
                      {t('product.useCase')}
                    </button>
                  </div>
                )}

                {expandedCard?.id === product.id && expandedCard?.type === 'description' && (
                  <div className="product-description">
                    <strong>{t('product.example')}</strong> {product.description}
                    {product.moonshot && (
                      <>
                        {' '}
                        <strong>{t('product.theArt')}</strong> {product.moonshot}
                      </>
                    )}
                  </div>
                )}

                {expandedCard?.id === product.id && expandedCard?.type === 'usecase' && product.use_case && (
                  <div className="product-usecase">
                    {product.use_case.title && (
                      <>
                        <strong>Use Case: {product.use_case.title}</strong>
                        <br />
                      </>
                    )}
                    {product.use_case.steps?.map((step, idx) => (
                      <React.Fragment key={idx}>
                        <strong>{idx + 1})</strong> {step}
                        <br />
                      </React.Fragment>
                    ))}
                    {product.use_case.result && (
                      <>
                        <strong>Result:</strong> {product.use_case.result}
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

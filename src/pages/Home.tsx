import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { EvaProduct } from '../components/ProductCard';
import rawData from '../data/eva-suite-products.json';

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
      <div className="vision-banner">
        <div className="container">
          <h2>💫 The EVA Suite: A Visionary's Personal Project</h2>
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
      </div>

      {/* Main Dashboard */}
      <div className="container">
        <div className="hero">
          <h1>🚀 EVA Suite Dashboard</h1>
          <p>Enterprise AI Platform - Development Status & Progress Tracking</p>
        </div>

        {/* Products Section */}
        <div className="card">
          <h2>🎯 EVA Suite Product Lineup ({suite.total_products} Products) - Real Examples</h2>
          <p className="products-intro">
            Every EVA product works 3 ways: Traditional UI clicks, Chat with keyboard, or Voice commands.
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
                    top: '0.5rem',
                    right: '0.5rem',
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.65rem',
                    borderRadius: '8px',
                    background: 'rgba(40, 167, 69, 0.25)',
                    border: '1px solid rgba(40, 167, 69, 0.5)',
                    color: '#4ade80',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>
                    ✨ Demo
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
                      Description
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
                      Use Case
                    </button>
                  </div>
                )}

                {expandedCard?.id === product.id && expandedCard?.type === 'description' && (
                  <div className="product-description">
                    <strong>Example:</strong> {product.description}
                    {product.moonshot && (
                      <>
                        {' '}
                        <strong>The Art:</strong> {product.moonshot}
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
        </div>
      </div>
    </>
  );
};

export default Home;

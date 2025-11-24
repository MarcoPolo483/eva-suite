import React, { useState } from 'react';
import metricsData from '../data/liveops-demo.json';
import insightsData from '../data/liveops-ai-insights.json';

interface KPIs {
  total_sessions: number;
  error_rate_pct: number;
  p95_latency_ms: number;
  apim_cost_cad: number;
}

interface TimeSeriesEntry {
  hour_label: string;
  sessions: number;
  errors: number;
}

interface MetricsData {
  timeframe: string;
  updated_at: string;
  kpis: KPIs;
  timeseries: TimeSeriesEntry[];
}

interface Insight {
  viewpoint: string;
  label: string;
  summary: string;
  findings: string[];
  recommendations: string[];
}

interface InsightsData {
  insights: Insight[];
}

const LiveOpsDashboard: React.FC = () => {
  const metrics = metricsData as MetricsData;
  const insights = insightsData as InsightsData;
  
  const [selectedViewpoint, setSelectedViewpoint] = useState('overview');
  
  const currentInsight = insights.insights.find(
    (i) => i.viewpoint === selectedViewpoint
  ) || insights.insights[0];

  const maxSessions = Math.max(...metrics.timeseries.map(t => t.sessions));

  const formatTimestamp = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      padding: '2rem',
      borderRadius: '12px',
      color: '#fff'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
          📊 EVA LiveOps Dashboard
        </h2>
        <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
          Timeframe: {metrics.timeframe.replace('_', ' ')} • 
          Last updated: {formatTimestamp(metrics.updated_at)}
        </p>
      </div>

      {/* KPI Tiles */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'rgba(0, 123, 255, 0.1)',
          border: '1px solid rgba(0, 123, 255, 0.3)',
          padding: '1.5rem',
          borderRadius: '8px'
        }}>
          <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.5rem' }}>
            Total Sessions
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>
            {metrics.kpis.total_sessions.toLocaleString()}
          </div>
        </div>

        <div style={{
          background: 'rgba(40, 167, 69, 0.1)',
          border: '1px solid rgba(40, 167, 69, 0.3)',
          padding: '1.5rem',
          borderRadius: '8px'
        }}>
          <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.5rem' }}>
            Error Rate
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>
            {metrics.kpis.error_rate_pct}%
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 193, 7, 0.1)',
          border: '1px solid rgba(255, 193, 7, 0.3)',
          padding: '1.5rem',
          borderRadius: '8px'
        }}>
          <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.5rem' }}>
            p95 Latency
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>
            {metrics.kpis.p95_latency_ms}ms
          </div>
        </div>

        <div style={{
          background: 'rgba(220, 53, 69, 0.1)',
          border: '1px solid rgba(220, 53, 69, 0.3)',
          padding: '1.5rem',
          borderRadius: '8px'
        }}>
          <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.5rem' }}>
            APIM Cost (24h)
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc3545' }}>
            ${metrics.kpis.apim_cost_cad.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Sessions Chart */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
          Sessions per Hour
        </h3>
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'flex-end', 
            gap: '0.5rem',
            height: '150px'
          }}
          role="img"
          aria-label="Bar chart showing sessions per hour over the last 24 hours"
        >
          {metrics.timeseries.map((entry, idx) => {
            const heightPercent = (entry.sessions / maxSessions) * 100;
            return (
              <div 
                key={idx}
                style={{ 
                  flex: 1, 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  height: '100%'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: `${heightPercent}%`,
                    background: 'linear-gradient(180deg, #007bff, #0056b3)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  title={`${entry.hour_label}: ${entry.sessions} sessions, ${entry.errors} errors`}
                >
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '0.7rem',
                    color: '#aaa',
                    whiteSpace: 'nowrap'
                  }}>
                    {entry.sessions}
                  </div>
                </div>
                <div style={{ 
                  fontSize: '0.7rem', 
                  color: '#888',
                  marginTop: '0.5rem',
                  transform: 'rotate(-45deg)',
                  transformOrigin: 'center',
                  whiteSpace: 'nowrap'
                }}>
                  {entry.hour_label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EVA LiveOps Copilot Panel */}
      <div style={{
        background: 'rgba(255, 140, 0, 0.1)',
        border: '2px solid rgba(255, 140, 0, 0.3)',
        padding: '1.5rem',
        borderRadius: '8px'
      }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#ff8c00' }}>
          🤖 EVA LiveOps Copilot
        </h3>

        {/* Viewpoint Selector */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            marginBottom: '1.5rem',
            flexWrap: 'wrap'
          }}
          role="tablist"
          aria-label="Select AI viewpoint"
        >
          {insights.insights.map((insight) => (
            <button
              key={insight.viewpoint}
              onClick={() => setSelectedViewpoint(insight.viewpoint)}
              role="tab"
              aria-selected={selectedViewpoint === insight.viewpoint}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                border: 'none',
                background: selectedViewpoint === insight.viewpoint 
                  ? '#ff8c00' 
                  : 'rgba(255, 255, 255, 0.1)',
                color: selectedViewpoint === insight.viewpoint 
                  ? '#000' 
                  : '#fff',
                fontWeight: selectedViewpoint === insight.viewpoint 
                  ? 'bold' 
                  : 'normal',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.9rem'
              }}
              onMouseEnter={(e) => {
                if (selectedViewpoint !== insight.viewpoint) {
                  e.currentTarget.style.background = 'rgba(255, 140, 0, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedViewpoint !== insight.viewpoint) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }
              }}
            >
              {insight.label}
            </button>
          ))}
        </div>

        {/* Insight Content */}
        <div role="tabpanel" aria-labelledby={`${selectedViewpoint}-tab`}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            <h4 style={{ 
              fontSize: '1.1rem', 
              marginBottom: '0.75rem',
              color: '#ff8c00'
            }}>
              Summary
            </h4>
            <p style={{ lineHeight: 1.6, color: '#ddd' }}>
              {currentInsight.summary}
            </p>
          </div>

          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            <h4 style={{ 
              fontSize: '1.1rem', 
              marginBottom: '0.75rem',
              color: '#ff8c00'
            }}>
              Key Findings
            </h4>
            <ul style={{ 
              lineHeight: 1.8, 
              color: '#ddd',
              paddingLeft: '1.5rem'
            }}>
              {currentInsight.findings.map((finding, idx) => (
                <li key={idx}>{finding}</li>
              ))}
            </ul>
          </div>

          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '1.5rem',
            borderRadius: '8px'
          }}>
            <h4 style={{ 
              fontSize: '1.1rem', 
              marginBottom: '0.75rem',
              color: '#ff8c00'
            }}>
              Recommendations
            </h4>
            <ul style={{ 
              lineHeight: 1.8, 
              color: '#ddd',
              paddingLeft: '1.5rem'
            }}>
              {currentInsight.recommendations.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveOpsDashboard;

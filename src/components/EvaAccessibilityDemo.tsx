import React from 'react';
import demoData from '../data/eva-accessibility-demo.json';

// TypeScript interfaces
interface ScanTarget {
  name: string;
  url: string;
  timestamp: string;
}

interface Summary {
  overall_grade: string;
  issues_count: number;
  warnings_count: number;
  passes_count: number;
}

interface Issue {
  id: string;
  wcag_ref: string;
  severity: string;
  area: string;
  description: string;
  suggested_fix: string;
  demo_only: boolean;
}

interface AccessibilityData {
  scan_target: ScanTarget;
  summary: Summary;
  issues: Issue[];
  quick_fixes: string[];
  disclaimer: string;
}

const EvaAccessibilityDemo: React.FC = () => {
  const data = demoData as AccessibilityData;

  const getSeverityColor = (severity: string): string => {
    const sev = severity.toLowerCase();
    if (sev === 'high' || sev === 'critical') return '#dc3545';
    if (sev === 'medium') return '#ffc107';
    if (sev === 'low') return '#17a2b8';
    return '#6c757d';
  };

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-CA', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      borderRadius: '12px',
      padding: '2rem',
      color: '#fff',
      maxWidth: '1000px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <h2 style={{ fontSize: '1.8rem', margin: 0, color: '#50e6ff' }}>
            ♿ EVA Accessibility – AI WCAG Scanner
          </h2>
          <span style={{
            padding: '0.25rem 0.75rem',
            fontSize: '0.75rem',
            borderRadius: '12px',
            background: 'rgba(255, 193, 7, 0.2)',
            border: '1px solid rgba(255, 193, 7, 0.4)',
            color: '#ffc107',
            fontWeight: 'bold'
          }}>
            Demo · Mock data only
          </span>
        </div>
        <p style={{ color: '#aaa', fontSize: '0.9rem', margin: 0 }}>
          AI-powered accessibility scanning with WCAG compliance insights
        </p>
      </div>

      {/* Scan Target Info */}
      <div style={{
        marginBottom: '2rem',
        padding: '1rem',
        background: 'rgba(80, 230, 255, 0.05)',
        border: '1px solid rgba(80, 230, 255, 0.2)',
        borderRadius: '8px'
      }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#50e6ff' }}>
          Scan Target
        </h3>
        <p style={{ margin: '0.25rem 0', color: '#ddd', fontSize: '0.95rem' }}>
          <strong>Site:</strong> {data.scan_target.name}
        </p>
        <p style={{ margin: '0.25rem 0', color: '#aaa', fontSize: '0.85rem' }}>
          <strong>URL:</strong> <a href={data.scan_target.url} target="_blank" rel="noopener noreferrer" style={{ color: '#50e6ff' }}>{data.scan_target.url}</a>
        </p>
        <p style={{ margin: '0.25rem 0', color: '#aaa', fontSize: '0.85rem' }}>
          <strong>Scanned:</strong> {formatTimestamp(data.scan_target.timestamp)}
        </p>
      </div>

      {/* Summary Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          padding: '1rem',
          background: '#2a2a2a',
          borderRadius: '8px',
          border: '2px solid #444',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.5rem' }}>Overall Grade</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ffc107' }}>
            {data.summary.overall_grade}
          </div>
        </div>
        <div style={{
          padding: '1rem',
          background: '#2a2a2a',
          borderRadius: '8px',
          border: '2px solid #dc3545',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.5rem' }}>Issues</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#dc3545' }}>
            {data.summary.issues_count}
          </div>
        </div>
        <div style={{
          padding: '1rem',
          background: '#2a2a2a',
          borderRadius: '8px',
          border: '2px solid #ffc107',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.5rem' }}>Warnings</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ffc107' }}>
            {data.summary.warnings_count}
          </div>
        </div>
        <div style={{
          padding: '1rem',
          background: '#2a2a2a',
          borderRadius: '8px',
          border: '2px solid #28a745',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.5rem' }}>Passes</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#28a745' }}>
            {data.summary.passes_count}
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#ddd', borderBottom: '2px solid #444', paddingBottom: '0.5rem' }}>
          🔍 Accessibility Issues
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {data.issues.map((issue) => (
            <div key={issue.id} style={{
              padding: '1.25rem',
              background: '#2a2a2a',
              borderRadius: '8px',
              border: `2px solid ${getSeverityColor(issue.severity)}33`,
              borderLeft: `4px solid ${getSeverityColor(issue.severity)}`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                <span style={{ 
                  fontSize: '0.85rem', 
                  fontWeight: 'bold', 
                  color: '#50e6ff',
                  fontFamily: 'monospace'
                }}>
                  {issue.id}
                </span>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.7rem',
                  borderRadius: '12px',
                  background: `${getSeverityColor(issue.severity)}22`,
                  border: `1px solid ${getSeverityColor(issue.severity)}`,
                  color: getSeverityColor(issue.severity),
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}>
                  {issue.severity}
                </span>
                <span style={{
                  padding: '0.2rem 0.6rem',
                  fontSize: '0.7rem',
                  borderRadius: '10px',
                  background: '#444',
                  color: '#aaa',
                  fontWeight: 'bold'
                }}>
                  WCAG {issue.wcag_ref}
                </span>
                <span style={{ color: '#aaa', fontSize: '0.9rem', fontWeight: 'bold' }}>
                  {issue.area}
                </span>
              </div>
              <p style={{ margin: '0.5rem 0', color: '#ddd', fontSize: '0.95rem' }}>
                {issue.description}
              </p>
              <div style={{
                marginTop: '0.75rem',
                padding: '0.75rem',
                background: 'rgba(80, 230, 255, 0.08)',
                borderRadius: '6px',
                borderLeft: '3px solid #50e6ff'
              }}>
                <strong style={{ color: '#50e6ff', fontSize: '0.85rem' }}>Suggested Fix:</strong>
                <span style={{ color: '#ccc', fontSize: '0.9rem', marginLeft: '0.5rem' }}>
                  {issue.suggested_fix}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Accessibility Coach */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(80, 230, 255, 0.1) 0%, rgba(16, 124, 16, 0.1) 100%)',
        border: '2px solid rgba(80, 230, 255, 0.3)',
        borderRadius: '12px',
        padding: '1.5rem'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.25rem', color: '#50e6ff' }}>
            🧠 AI Accessibility Coach
          </h3>
          <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0 }}>
            Static EVA Accessibility demo
          </p>
        </div>

        {/* Quick Fixes */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{
            fontSize: '1rem',
            marginBottom: '0.75rem',
            color: '#ddd',
            fontWeight: 'bold',
            borderBottom: '1px solid rgba(80, 230, 255, 0.3)',
            paddingBottom: '0.5rem'
          }}>
            🎯 Quick Fixes Recommended
          </h4>
          <ul style={{
            margin: 0,
            paddingLeft: '1.5rem',
            color: '#ccc',
            lineHeight: 1.8
          }}>
            {data.quick_fixes.map((fix, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>
                {fix}
              </li>
            ))}
          </ul>
        </div>

        {/* Disclaimer */}
        <div style={{
          padding: '1rem',
          background: 'rgba(209, 52, 56, 0.1)',
          border: '1px solid rgba(209, 52, 56, 0.3)',
          borderRadius: '6px',
          fontSize: '0.85rem',
          color: '#ff6b6b'
        }}>
          <strong>⚠️ Disclaimer:</strong> {data.disclaimer}
        </div>
      </div>
    </div>
  );
};

export default EvaAccessibilityDemo;

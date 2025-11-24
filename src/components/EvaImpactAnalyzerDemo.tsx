import React, { useState } from 'react';
import demoData from '../data/eva-impact-analyzer-demo.json';

// TypeScript interfaces
interface Baseline {
  description: string;
  notes: string;
}

interface ScenarioInputs {
  employees: number;
  hours_saved_per_week: number;
  hourly_cost_cad: number;
  weeks_per_year: number;
  annual_platform_cost_cad: number;
}

interface ScenarioOutputs {
  annual_hours_saved: number;
  annual_gross_savings_cad: number;
  annual_net_savings_cad: number;
  roi_pct: number;
  payback_months: number;
}

interface Scenario {
  id: string;
  label: string;
  inputs: ScenarioInputs;
  outputs: ScenarioOutputs;
  narrative: string;
}

interface ImpactAnalyzerData {
  baseline: Baseline;
  scenarios: Scenario[];
  disclaimer: string;
}

const EvaImpactAnalyzerDemo: React.FC = () => {
  const data = demoData as ImpactAnalyzerData;
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('expected');

  const currentScenario = data.scenarios.find(s => s.id === selectedScenarioId) || data.scenarios[1];

  const formatCurrency = (amount: number): string => {
    return `$${amount.toLocaleString('en-CA')}`;
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-CA');
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
            💰 EVA Impact Analyzer – ROI Calculator
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
          {data.baseline.description}
        </p>
        <p style={{ color: '#777', fontSize: '0.8rem', margin: '0.5rem 0 0 0', fontStyle: 'italic' }}>
          {data.baseline.notes}
        </p>
      </div>

      {/* Scenario Selector */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#ddd' }}>
          Select Impact Scenario
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {data.scenarios.map(scenario => (
            <button
              key={scenario.id}
              onClick={() => setSelectedScenarioId(scenario.id)}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                borderRadius: '8px',
                border: selectedScenarioId === scenario.id ? '2px solid #50e6ff' : '2px solid #444',
                background: selectedScenarioId === scenario.id ? 'rgba(80, 230, 255, 0.15)' : '#2a2a2a',
                color: selectedScenarioId === scenario.id ? '#50e6ff' : '#aaa',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (selectedScenarioId !== scenario.id) {
                  e.currentTarget.style.background = '#333';
                  e.currentTarget.style.borderColor = '#666';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedScenarioId !== scenario.id) {
                  e.currentTarget.style.background = '#2a2a2a';
                  e.currentTarget.style.borderColor = '#444';
                }
              }}
            >
              {scenario.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Inputs Panel */}
        <div style={{
          padding: '1.5rem',
          background: '#2a2a2a',
          borderRadius: '10px',
          border: '2px solid #444'
        }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#50e6ff', borderBottom: '2px solid #444', paddingBottom: '0.5rem' }}>
            📊 Inputs
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.25rem' }}>Employees</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff' }}>
                {formatNumber(currentScenario.inputs.employees)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.25rem' }}>Hours saved/week/person</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff' }}>
                {currentScenario.inputs.hours_saved_per_week}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.25rem' }}>Hourly cost (CAD)</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff' }}>
                {formatCurrency(currentScenario.inputs.hourly_cost_cad)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.25rem' }}>Weeks per year</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff' }}>
                {currentScenario.inputs.weeks_per_year}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.25rem' }}>Annual platform cost</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#ffc107' }}>
                {formatCurrency(currentScenario.inputs.annual_platform_cost_cad)}
              </div>
            </div>
          </div>
        </div>

        {/* Outputs Panel */}
        <div style={{
          padding: '1.5rem',
          background: 'linear-gradient(135deg, rgba(16, 124, 16, 0.2) 0%, rgba(40, 167, 69, 0.15) 100%)',
          borderRadius: '10px',
          border: '2px solid rgba(40, 167, 69, 0.5)'
        }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#4ade80', borderBottom: '2px solid rgba(40, 167, 69, 0.5)', paddingBottom: '0.5rem' }}>
            📈 Outputs
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.25rem' }}>Annual hours saved</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#4ade80' }}>
                {formatNumber(currentScenario.outputs.annual_hours_saved)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.25rem' }}>Gross savings (CAD)</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#4ade80' }}>
                {formatCurrency(currentScenario.outputs.annual_gross_savings_cad)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.25rem' }}>Net savings (CAD)</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80' }}>
                {formatCurrency(currentScenario.outputs.annual_net_savings_cad)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.25rem' }}>ROI</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#50e6ff' }}>
                {currentScenario.outputs.roi_pct}%
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.25rem' }}>Payback period</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#ffc107' }}>
                {currentScenario.outputs.payback_months} months
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Narrator */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255, 140, 0, 0.1) 0%, rgba(80, 230, 255, 0.1) 100%)',
        border: '2px solid rgba(255, 140, 0, 0.3)',
        borderRadius: '12px',
        padding: '1.5rem'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.25rem', color: '#ff8c00' }}>
            💡 Impact Narrator
          </h3>
          <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0 }}>
            Business case summary for {currentScenario.label.toLowerCase()} scenario
          </p>
        </div>

        <div style={{
          padding: '1rem',
          background: 'rgba(80, 230, 255, 0.08)',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          borderLeft: '4px solid #50e6ff'
        }}>
          <p style={{ margin: 0, color: '#ddd', fontSize: '1rem', lineHeight: 1.6 }}>
            {currentScenario.narrative}
          </p>
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

export default EvaImpactAnalyzerDemo;

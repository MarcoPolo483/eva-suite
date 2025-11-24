import React from 'react';
import demoData from '../data/eva-process-mapper-demo.json';

// TypeScript interfaces
interface Actor {
  id: string;
  label: string;
}

interface Step {
  id: string;
  order: number;
  label: string;
  type: string;
  assisted_by_eva: boolean;
  notes: string;
}

interface Lane {
  actor_id: string;
  steps: Step[];
}

interface Summary {
  highlights: string[];
  opportunities: string[];
  disclaimer: string;
}

interface Process {
  id: string;
  name: string;
  description: string;
  scenario: string;
  actors: Actor[];
  lanes: Lane[];
  summary: Summary;
}

interface ProcessMapperData {
  process: Process;
}

const EvaProcessMapperDemo: React.FC = () => {
  const data = demoData as ProcessMapperData;
  const process = data.process;

  // Get actor label by id
  const getActorLabel = (actorId: string): string => {
    return process.actors.find(a => a.id === actorId)?.label || actorId;
  };

  // Get type color
  const getTypeColor = (type: string): string => {
    const typeMap: Record<string, string> = {
      'action': '#17a2b8',
      'interaction': '#6c757d',
      'outcome': '#28a745',
      'system': '#6f42c1',
      'routing': '#fd7e14',
      'knowledge_capture': '#ffc107',
      'explanation': '#50e6ff',
      'knowledge': '#20c997',
      'rules': '#e83e8c'
    };
    return typeMap[type] || '#6c757d';
  };

  // Sort lanes by actor order
  const orderedLanes = process.actors.map(actor => {
    const lane = process.lanes.find(l => l.actor_id === actor.id);
    return {
      actor,
      steps: lane ? lane.steps.sort((a, b) => a.order - b.order) : []
    };
  });

  return (
    <div 
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        borderRadius: '12px',
        padding: '2rem',
        color: '#fff',
        maxWidth: '1200px',
        margin: '0 auto'
      }}
      aria-label="EVA Process Mapper Demo"
    >
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: '1.8rem', margin: 0, color: '#50e6ff' }}>
            🧩 EVA Process Mapper
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
            Demo · Mock process map
          </span>
        </div>
        <h3 style={{ fontSize: '1.3rem', margin: '0.5rem 0', color: '#ddd' }}>
          {process.name}
        </h3>
        <p style={{ color: '#aaa', fontSize: '0.95rem', margin: '0.5rem 0' }}>
          {process.description}
        </p>
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: 'rgba(80, 230, 255, 0.05)',
          border: '1px solid rgba(80, 230, 255, 0.2)',
          borderRadius: '8px'
        }}>
          <strong style={{ color: '#50e6ff', fontSize: '0.9rem' }}>Scenario:</strong>
          <span style={{ color: '#ccc', fontSize: '0.95rem', marginLeft: '0.5rem' }}>
            {process.scenario}
          </span>
        </div>
      </div>

      {/* Process Flow - Swimlanes */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ 
          fontSize: '1.3rem', 
          marginBottom: '1.5rem', 
          color: '#ddd', 
          borderBottom: '2px solid #444', 
          paddingBottom: '0.5rem' 
        }}>
          🔄 Process Flow
        </h3>

        {/* Swimlanes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orderedLanes.map(({ actor, steps }) => (
            <div 
              key={actor.id}
              style={{
                background: '#2a2a2a',
                borderRadius: '10px',
                border: '2px solid #444',
                overflow: 'hidden'
              }}
            >
              {/* Lane Header */}
              <div style={{
                background: actor.id === 'eva' 
                  ? 'linear-gradient(135deg, rgba(80, 230, 255, 0.2) 0%, rgba(32, 201, 151, 0.2) 100%)'
                  : '#333',
                padding: '1rem 1.5rem',
                borderBottom: '2px solid #444'
              }}>
                <h4 style={{ 
                  fontSize: '1.1rem', 
                  margin: 0, 
                  color: actor.id === 'eva' ? '#50e6ff' : '#ddd',
                  fontWeight: 'bold'
                }}>
                  {actor.label}
                  {actor.id === 'eva' && (
                    <span style={{
                      marginLeft: '0.75rem',
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.6rem',
                      background: 'rgba(80, 230, 255, 0.3)',
                      borderRadius: '10px',
                      border: '1px solid #50e6ff'
                    }}>
                      AI-Powered
                    </span>
                  )}
                </h4>
              </div>

              {/* Lane Steps */}
              <div style={{ padding: '1.5rem' }}>
                {steps.length === 0 ? (
                  <p style={{ color: '#777', fontSize: '0.9rem', fontStyle: 'italic' }}>
                    No steps in this lane
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {steps.map(step => (
                      <div 
                        key={step.id}
                        style={{
                          padding: '1rem',
                          background: step.assisted_by_eva 
                            ? 'rgba(80, 230, 255, 0.08)' 
                            : '#1a1a1a',
                          borderRadius: '8px',
                          border: step.assisted_by_eva 
                            ? '2px solid rgba(80, 230, 255, 0.3)' 
                            : '1px solid #444',
                          borderLeft: `4px solid ${getTypeColor(step.type)}`
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                          {/* Step Order */}
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '1.75rem',
                            height: '1.75rem',
                            borderRadius: '50%',
                            background: '#444',
                            color: '#fff',
                            fontSize: '0.85rem',
                            fontWeight: 'bold',
                            fontFamily: 'monospace'
                          }}>
                            {step.order}
                          </span>

                          {/* Step ID */}
                          <span style={{
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            color: '#50e6ff',
                            fontFamily: 'monospace'
                          }}>
                            {step.id}
                          </span>

                          {/* Type Badge */}
                          <span style={{
                            padding: '0.2rem 0.6rem',
                            fontSize: '0.7rem',
                            borderRadius: '10px',
                            background: `${getTypeColor(step.type)}22`,
                            border: `1px solid ${getTypeColor(step.type)}`,
                            color: getTypeColor(step.type),
                            fontWeight: 'bold',
                            textTransform: 'capitalize'
                          }}>
                            {step.type.replace('_', ' ')}
                          </span>

                          {/* EVA-Assisted Badge */}
                          {step.assisted_by_eva && (
                            <span style={{
                              padding: '0.2rem 0.6rem',
                              fontSize: '0.7rem',
                              borderRadius: '10px',
                              background: 'rgba(80, 230, 255, 0.25)',
                              border: '1px solid #50e6ff',
                              color: '#50e6ff',
                              fontWeight: 'bold'
                            }}>
                              ⚡ EVA-assisted
                            </span>
                          )}
                        </div>

                        {/* Step Label */}
                        <p style={{ 
                          margin: '0.5rem 0', 
                          color: '#fff', 
                          fontSize: '1rem',
                          fontWeight: '500'
                        }}>
                          {step.label}
                        </p>

                        {/* Step Notes */}
                        <p style={{ 
                          margin: '0.5rem 0 0 0', 
                          color: '#aaa', 
                          fontSize: '0.85rem',
                          fontStyle: 'italic'
                        }}>
                          {step.notes}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EVA Process Coach */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255, 140, 0, 0.1) 0%, rgba(32, 201, 151, 0.1) 100%)',
        border: '2px solid rgba(80, 230, 255, 0.3)',
        borderRadius: '12px',
        padding: '1.5rem'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.25rem', color: '#50e6ff' }}>
            🧠 EVA Process Coach
          </h3>
          <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0 }}>
            AI insights into your process design
          </p>
        </div>

        {/* What this map shows */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{
            fontSize: '1rem',
            marginBottom: '0.75rem',
            color: '#ddd',
            fontWeight: 'bold',
            borderBottom: '1px solid rgba(80, 230, 255, 0.3)',
            paddingBottom: '0.5rem'
          }}>
            📊 What this map shows
          </h4>
          <ul style={{
            margin: 0,
            paddingLeft: '1.5rem',
            color: '#ccc',
            lineHeight: 1.8
          }}>
            {process.summary.highlights.map((highlight, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Where EVA can help more */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{
            fontSize: '1rem',
            marginBottom: '0.75rem',
            color: '#ddd',
            fontWeight: 'bold',
            borderBottom: '1px solid rgba(32, 201, 151, 0.3)',
            paddingBottom: '0.5rem'
          }}>
            🎯 Where EVA can help more
          </h4>
          <ul style={{
            margin: 0,
            paddingLeft: '1.5rem',
            color: '#ccc',
            lineHeight: 1.8
          }}>
            {process.summary.opportunities.map((opportunity, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>
                {opportunity}
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
          <strong>⚠️ Disclaimer:</strong> {process.summary.disclaimer}
        </div>
      </div>
    </div>
  );
};

export default EvaProcessMapperDemo;

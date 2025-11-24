import React, { useState } from 'react';
import demoData from '../data/eva-devcrew-demo.json';

// TypeScript interfaces
interface Agent {
  id: string;
  name: string;
  role: string;
  status: string;
  focus: string;
  capacity_pct: number;
}

interface Task {
  id: string;
  title: string;
  type: string;
  assignee: string;
  status: string;
  confidence: string;
}

interface SprintSummary {
  status: string;
  highlights: string[];
  risks: string[];
  next_steps: string[];
}

interface Sprint {
  id: number;
  name: string;
  goal: string;
  agents: Agent[];
  tasks: Task[];
  summary: SprintSummary;
}

interface DevCrewData {
  current_sprint: number;
  sprints: Sprint[];
}

const EvaDevCrewDemo: React.FC = () => {
  const data = demoData as DevCrewData;
  const [selectedSprintId, setSelectedSprintId] = useState<number>(data.current_sprint);
  
  const currentSprint = data.sprints.find(s => s.id === selectedSprintId) || data.sprints[0];

  const getStatusColor = (status: string): string => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'done') return '#28a745';
    if (statusLower === 'in progress' || statusLower === 'working') return '#ffc107';
    if (statusLower === 'reviewing') return '#17a2b8';
    if (statusLower === 'planned' || statusLower === 'not started') return '#6c757d';
    if (statusLower === 'idle') return '#aaa';
    return '#6c757d';
  };

  const getConfidenceColor = (confidence: string): string => {
    const confLower = confidence.toLowerCase();
    if (confLower === 'high') return '#28a745';
    if (confLower === 'medium') return '#ffc107';
    if (confLower === 'low') return '#dc3545';
    return '#6c757d';
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      borderRadius: '12px',
      padding: '2rem',
      color: '#fff',
      maxWidth: '1100px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <h2 style={{ fontSize: '1.8rem', margin: 0, color: '#50e6ff' }}>
            🤖 EVA DevTools – AI Agile Crew
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
          AI agents working together on EVA Suite development sprints
        </p>
      </div>

      {/* Sprint Selector */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {data.sprints.map(sprint => (
            <button
              key={sprint.id}
              onClick={() => setSelectedSprintId(sprint.id)}
              style={{
                padding: '0.5rem 1.25rem',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                borderRadius: '6px',
                border: selectedSprintId === sprint.id ? '2px solid #50e6ff' : '2px solid #444',
                background: selectedSprintId === sprint.id ? 'rgba(80, 230, 255, 0.15)' : '#2a2a2a',
                color: selectedSprintId === sprint.id ? '#50e6ff' : '#aaa',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (selectedSprintId !== sprint.id) {
                  e.currentTarget.style.background = '#333';
                  e.currentTarget.style.borderColor = '#666';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedSprintId !== sprint.id) {
                  e.currentTarget.style.background = '#2a2a2a';
                  e.currentTarget.style.borderColor = '#444';
                }
              }}
            >
              Sprint {sprint.id}
            </button>
          ))}
        </div>
      </div>

      {/* Sprint Goal */}
      <div style={{
        marginBottom: '2rem',
        padding: '1rem',
        background: 'rgba(80, 230, 255, 0.05)',
        border: '1px solid rgba(80, 230, 255, 0.2)',
        borderRadius: '8px'
      }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#50e6ff' }}>
          {currentSprint.name}
        </h3>
        <p style={{ margin: 0, color: '#ddd', fontSize: '0.95rem' }}>
          <strong>Goal:</strong> {currentSprint.goal}
        </p>
      </div>

      {/* Agents Panel */}
      {currentSprint.agents.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#ddd', borderBottom: '2px solid #444', paddingBottom: '0.5rem' }}>
            🤖 AI Agents ({currentSprint.agents.length})
          </h3>
          <div style={{
            background: '#2a2a2a',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #444'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#333' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#aaa', fontSize: '0.85rem', fontWeight: 'bold' }}>Agent</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#aaa', fontSize: '0.85rem', fontWeight: 'bold' }}>Role</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#aaa', fontSize: '0.85rem', fontWeight: 'bold' }}>Status</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#aaa', fontSize: '0.85rem', fontWeight: 'bold' }}>Focus</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center', color: '#aaa', fontSize: '0.85rem', fontWeight: 'bold' }}>Capacity</th>
                </tr>
              </thead>
              <tbody>
                {currentSprint.agents.map((agent, idx) => (
                  <tr key={agent.id} style={{ borderTop: idx > 0 ? '1px solid #444' : 'none' }}>
                    <td style={{ padding: '0.75rem', color: '#fff', fontWeight: 'bold' }}>{agent.name}</td>
                    <td style={{ padding: '0.75rem', color: '#ccc', fontSize: '0.9rem' }}>{agent.role}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        fontSize: '0.75rem',
                        borderRadius: '12px',
                        background: `${getStatusColor(agent.status)}22`,
                        border: `1px solid ${getStatusColor(agent.status)}`,
                        color: getStatusColor(agent.status),
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap'
                      }}>
                        {agent.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', color: '#aaa', fontSize: '0.9rem' }}>{agent.focus}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                      <div style={{ display: 'inline-block', position: 'relative', width: '60px' }}>
                        <div style={{
                          height: '8px',
                          background: '#444',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            height: '100%',
                            width: `${agent.capacity_pct}%`,
                            background: agent.capacity_pct > 70 ? '#28a745' : agent.capacity_pct > 40 ? '#ffc107' : '#dc3545',
                            transition: 'width 0.3s'
                          }} />
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '0.25rem', display: 'block' }}>
                          {agent.capacity_pct}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tasks Panel */}
      {currentSprint.tasks.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#ddd', borderBottom: '2px solid #444', paddingBottom: '0.5rem' }}>
            📋 Sprint Tasks ({currentSprint.tasks.length})
          </h3>
          <div style={{
            background: '#2a2a2a',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #444'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#333' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#aaa', fontSize: '0.85rem', fontWeight: 'bold' }}>ID</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#aaa', fontSize: '0.85rem', fontWeight: 'bold' }}>Title</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#aaa', fontSize: '0.85rem', fontWeight: 'bold' }}>Type</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#aaa', fontSize: '0.85rem', fontWeight: 'bold' }}>Assignee</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#aaa', fontSize: '0.85rem', fontWeight: 'bold' }}>Status</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center', color: '#aaa', fontSize: '0.85rem', fontWeight: 'bold' }}>Confidence</th>
                </tr>
              </thead>
              <tbody>
                {currentSprint.tasks.map((task, idx) => (
                  <tr key={task.id} style={{ borderTop: idx > 0 ? '1px solid #444' : 'none' }}>
                    <td style={{ padding: '0.75rem', color: '#50e6ff', fontWeight: 'bold', fontSize: '0.85rem' }}>{task.id}</td>
                    <td style={{ padding: '0.75rem', color: '#fff' }}>{task.title}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{
                        padding: '0.2rem 0.6rem',
                        fontSize: '0.7rem',
                        borderRadius: '10px',
                        background: '#444',
                        color: '#aaa',
                        textTransform: 'uppercase',
                        fontWeight: 'bold'
                      }}>
                        {task.type}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', color: '#ccc', fontSize: '0.9rem' }}>{task.assignee}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        fontSize: '0.75rem',
                        borderRadius: '12px',
                        background: `${getStatusColor(task.status)}22`,
                        border: `1px solid ${getStatusColor(task.status)}`,
                        color: getStatusColor(task.status),
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap'
                      }}>
                        {task.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                      <span style={{
                        padding: '0.25rem 0.6rem',
                        fontSize: '0.75rem',
                        borderRadius: '10px',
                        background: `${getConfidenceColor(task.confidence)}22`,
                        border: `1px solid ${getConfidenceColor(task.confidence)}`,
                        color: getConfidenceColor(task.confidence),
                        fontWeight: 'bold'
                      }}>
                        {task.confidence}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI Sprint Coach Summary */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255, 140, 0, 0.1) 0%, rgba(80, 230, 255, 0.1) 100%)',
        border: '2px solid rgba(255, 140, 0, 0.3)',
        borderRadius: '12px',
        padding: '1.5rem'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.25rem', color: '#ff8c00' }}>
            🧠 AI Sprint Coach
          </h3>
          <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0 }}>
            Mock AI sprint summary
          </p>
        </div>

        {/* Status */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            padding: '0.75rem 1rem',
            background: 'rgba(40, 167, 69, 0.15)',
            border: '1px solid rgba(40, 167, 69, 0.4)',
            borderRadius: '6px',
            color: '#4ade80',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}>
            Status: {currentSprint.summary.status}
          </div>
        </div>

        {/* Highlights */}
        {currentSprint.summary.highlights.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{
              fontSize: '1rem',
              marginBottom: '0.75rem',
              color: '#ddd',
              fontWeight: 'bold',
              borderBottom: '1px solid rgba(255, 140, 0, 0.3)',
              paddingBottom: '0.5rem'
            }}>
              ✨ Highlights
            </h4>
            <ul style={{
              margin: 0,
              paddingLeft: '1.5rem',
              color: '#ccc',
              lineHeight: 1.8
            }}>
              {currentSprint.summary.highlights.map((highlight, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Risks */}
        {currentSprint.summary.risks.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{
              fontSize: '1rem',
              marginBottom: '0.75rem',
              color: '#ddd',
              fontWeight: 'bold',
              borderBottom: '1px solid rgba(255, 140, 0, 0.3)',
              paddingBottom: '0.5rem'
            }}>
              ⚠️ Risks
            </h4>
            <ul style={{
              margin: 0,
              paddingLeft: '1.5rem',
              color: '#ffb74d',
              lineHeight: 1.8
            }}>
              {currentSprint.summary.risks.map((risk, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>
                  {risk}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Next Steps */}
        {currentSprint.summary.next_steps.length > 0 && (
          <div>
            <h4 style={{
              fontSize: '1rem',
              marginBottom: '0.75rem',
              color: '#ddd',
              fontWeight: 'bold',
              borderBottom: '1px solid rgba(255, 140, 0, 0.3)',
              paddingBottom: '0.5rem'
            }}>
              🎯 Next Steps
            </h4>
            <ul style={{
              margin: 0,
              paddingLeft: '1.5rem',
              color: '#50e6ff',
              lineHeight: 1.8
            }}>
              {currentSprint.summary.next_steps.map((step, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaDevCrewDemo;

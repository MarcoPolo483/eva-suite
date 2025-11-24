import React, { useState, useEffect } from 'react';
import demoData from '../data/eva-da-demo.json';

// TypeScript interfaces
interface Domain {
  id: string;
  label: string;
}

interface Answer {
  decision: string;
  explanation: string;
  conditions: string[];
  sources: string[];
  notes: string;
}

interface Scenario {
  id: string;
  domain: string;
  question: string;
  answer: Answer;
}

interface EvaDaDemoData {
  default_domain: string;
  domains: Domain[];
  scenarios: Scenario[];
  generic_disclaimer: string;
}

const EvaDaDemo: React.FC = () => {
  const data = demoData as EvaDaDemoData;
  
  const [selectedDomainId, setSelectedDomainId] = useState<string>(data.default_domain);
  const [questionText, setQuestionText] = useState<string>('');
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isQuestionEdited, setIsQuestionEdited] = useState<boolean>(false);

  // When domain changes, update question and reset answer
  useEffect(() => {
    const scenario = data.scenarios.find(s => s.domain === selectedDomainId);
    if (scenario) {
      setQuestionText(scenario.question);
      setActiveScenario(scenario);
      setIsQuestionEdited(false);
    }
    setShowAnswer(false);
  }, [selectedDomainId, data.scenarios]);

  const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDomainId(e.target.value);
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionText(e.target.value);
    if (activeScenario && e.target.value !== activeScenario.question) {
      setIsQuestionEdited(true);
    } else {
      setIsQuestionEdited(false);
    }
  };

  const handleAskClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeScenario) {
      setShowAnswer(true);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      borderRadius: '12px',
      padding: '2rem',
      color: '#fff',
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#50e6ff' }}>
          🔍 EVA DA – Decision Support Assistant
        </h2>
        <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
          Mock demo: Ask a question about CPP-D or EI eligibility and see decision reasoning.
        </p>
      </div>

      <form onSubmit={handleAskClick}>
        {/* Domain Selector */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label 
            htmlFor="domain-selector" 
            style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontSize: '0.95rem',
              fontWeight: 'bold',
              color: '#ddd'
            }}
          >
            Select Domain:
          </label>
          <select
            id="domain-selector"
            value={selectedDomainId}
            onChange={handleDomainChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1rem',
              borderRadius: '6px',
              border: '2px solid #444',
              background: '#2a2a2a',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            {data.domains.map(domain => (
              <option key={domain.id} value={domain.id}>
                {domain.label}
              </option>
            ))}
          </select>
        </div>

        {/* Question Textarea */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label 
            htmlFor="question-input" 
            style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontSize: '0.95rem',
              fontWeight: 'bold',
              color: '#ddd'
            }}
          >
            Your Question:
          </label>
          <textarea
            id="question-input"
            value={questionText}
            onChange={handleQuestionChange}
            rows={4}
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1rem',
              borderRadius: '6px',
              border: '2px solid #444',
              background: '#2a2a2a',
              color: '#fff',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Ask Button */}
        <button
          type="submit"
          style={{
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '6px',
            border: 'none',
            background: 'linear-gradient(135deg, #0078d4 0%, #50e6ff 100%)',
            color: '#fff',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 12px rgba(0, 120, 212, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 120, 212, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 120, 212, 0.3)';
          }}
        >
          Ask EVA DA
        </button>
      </form>

      {/* Answer Panel */}
      {showAnswer && activeScenario && (
        <div 
          aria-live="polite"
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'rgba(80, 230, 255, 0.05)',
            border: '2px solid rgba(80, 230, 255, 0.3)',
            borderRadius: '8px'
          }}
        >
          {isQuestionEdited && (
            <div style={{
              marginBottom: '1rem',
              padding: '0.75rem',
              background: 'rgba(255, 193, 7, 0.1)',
              border: '1px solid rgba(255, 193, 7, 0.3)',
              borderRadius: '6px',
              fontSize: '0.85rem',
              color: '#ffc107'
            }}>
              ℹ️ This is a static demo – answer is based on a canned scenario for this domain.
            </div>
          )}

          {/* Decision */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ 
              fontSize: '1.3rem', 
              marginBottom: '0.5rem',
              color: '#50e6ff',
              fontWeight: 'bold'
            }}>
              Decision
            </h3>
            <div style={{
              padding: '1rem',
              background: 'rgba(16, 124, 16, 0.2)',
              border: '2px solid rgba(16, 124, 16, 0.5)',
              borderRadius: '6px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              color: '#4ade80'
            }}>
              {activeScenario.answer.decision}
            </div>
          </div>

          {/* Explanation */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ 
              fontSize: '1.1rem', 
              marginBottom: '0.75rem',
              color: '#ddd',
              fontWeight: 'bold',
              borderBottom: '1px solid #444',
              paddingBottom: '0.5rem'
            }}>
              Explanation
            </h4>
            <p style={{ 
              lineHeight: 1.6, 
              color: '#ccc',
              fontSize: '0.95rem'
            }}>
              {activeScenario.answer.explanation}
            </p>
          </div>

          {/* Conditions */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ 
              fontSize: '1.1rem', 
              marginBottom: '0.75rem',
              color: '#ddd',
              fontWeight: 'bold',
              borderBottom: '1px solid #444',
              paddingBottom: '0.5rem'
            }}>
              Key Conditions
            </h4>
            <ul style={{ 
              margin: 0,
              paddingLeft: '1.5rem',
              color: '#ccc',
              lineHeight: 1.8
            }}>
              {activeScenario.answer.conditions.map((condition, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>
                  {condition}
                </li>
              ))}
            </ul>
          </div>

          {/* Sources */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ 
              fontSize: '1.1rem', 
              marginBottom: '0.75rem',
              color: '#ddd',
              fontWeight: 'bold',
              borderBottom: '1px solid #444',
              paddingBottom: '0.5rem'
            }}>
              Sources Referenced (Demo)
            </h4>
            <ul style={{ 
              margin: 0,
              paddingLeft: '1.5rem',
              color: '#aaa',
              lineHeight: 1.8,
              fontSize: '0.9rem'
            }}>
              {activeScenario.answer.sources.map((source, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>
                  {source}
                </li>
              ))}
            </ul>
          </div>

          {/* Notes */}
          {activeScenario.answer.notes && (
            <div style={{
              padding: '0.75rem',
              background: 'rgba(0, 120, 212, 0.1)',
              border: '1px solid rgba(0, 120, 212, 0.3)',
              borderRadius: '6px',
              fontSize: '0.85rem',
              color: '#50e6ff',
              marginBottom: '1rem'
            }}>
              <strong>Note:</strong> {activeScenario.answer.notes}
            </div>
          )}

          {/* Generic Disclaimer */}
          <div style={{
            padding: '1rem',
            background: 'rgba(209, 52, 56, 0.1)',
            border: '1px solid rgba(209, 52, 56, 0.3)',
            borderRadius: '6px',
            fontSize: '0.85rem',
            color: '#ff6b6b'
          }}>
            <strong>⚠️ Disclaimer:</strong> {data.generic_disclaimer}
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaDaDemo;

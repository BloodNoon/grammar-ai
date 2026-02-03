// This component displays essential grammar information in a clean, simple format
import React, { useState } from 'react';

const VerbGrammarLegend = () => {
  
  // State to control which section is expanded (only one at a time for simplicity)
  const [activeSection, setActiveSection] = useState('');

  // Toggle function - closes if same section clicked, opens if different
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? '' : section);
  };

  // Essential verb tense information - simplified
  const verbTenses = [
    { name: 'Present Simple', form: 'walk/walks', example: 'I walk to school.' },
    { name: 'Past Simple', form: 'walked', example: 'I walked to school.' },
    { name: 'Future Simple', form: 'will walk', example: 'I will walk to school.' },
    { name: 'Present Continuous', form: 'am/is/are walking', example: 'I am walking to school.' },
    { name: 'Past Continuous', form: 'was/were walking', example: 'I was walking to school.' },
    { name: 'Present Perfect', form: 'have/has walked', example: 'I have walked to school.' }
  ];

  // Common auxiliary verbs - simplified
  const auxiliaries = [
    { type: 'Be verbs', verbs: 'am, is, are, was, were', use: 'Continuous tenses' },
    { type: 'Have verbs', verbs: 'have, has, had', use: 'Perfect tenses' },
    { type: 'Modal verbs', verbs: 'will, can, could, should', use: 'Future and possibility' }
  ];

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '6px',
      margin: '20px 0',
      border: '1px solid #ddd'
    }}>
      
      {/* Simple title */}
      <h2 style={{
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
        fontSize: '20px'
      }}>
        📚 Grammar Quick Reference
      </h2>

      {/* Verb Tenses Section */}
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={() => toggleSection('tenses')}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          Verb Tenses {activeSection === 'tenses' ? '▼' : '▶'}
        </button>

        {activeSection === 'tenses' && (
          <div style={{
            marginTop: '10px',
            padding: '15px',
            backgroundColor: 'white',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}>
            {verbTenses.map((tense, index) => (
              <div key={index} style={{
                padding: '8px 0',
                borderBottom: index < verbTenses.length - 1 ? '1px solid #eee' : 'none'
              }}>
                <div style={{ fontWeight: 'bold', color: '#333' }}>
                  {tense.name}: {tense.form}
                </div>
                <div style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
                  "{tense.example}"
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Auxiliary Verbs Section */}
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={() => toggleSection('auxiliaries')}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          Helper Verbs {activeSection === 'auxiliaries' ? '▼' : '▶'}
        </button>

        {activeSection === 'auxiliaries' && (
          <div style={{
            marginTop: '10px',
            padding: '15px',
            backgroundColor: 'white',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}>
            {auxiliaries.map((aux, index) => (
              <div key={index} style={{
                padding: '8px 0',
                borderBottom: index < auxiliaries.length - 1 ? '1px solid #eee' : 'none'
              }}>
                <div style={{ fontWeight: 'bold', color: '#333' }}>
                  {aux.type}: {aux.verbs}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  Used for: {aux.use}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Tips Section */}
      <div>
        <button
          onClick={() => toggleSection('tips')}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#ffc107',
            color: '#212529',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          Quick Tips {activeSection === 'tips' ? '▼' : '▶'}
        </button>

        {activeSection === 'tips' && (
          <div style={{
            marginTop: '10px',
            padding: '15px',
            backgroundColor: 'white',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}>
            <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
              <div style={{ marginBottom: '8px' }}>
                <strong>✓ Subject-Verb Agreement:</strong> "I am" but "He is"
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong>✓ Tense Consistency:</strong> Keep the same tense in your sentence
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong>✓ Word Order:</strong> Subject + Verb + Object
              </div>
              <div>
                <strong>✓ Practice:</strong> Start simple, then add complexity
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Simple footer */}
      <div style={{
        marginTop: '20px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#666',
        fontStyle: 'italic'
      }}>
        💡 Use this reference while practicing above!
      </div>
    </div>
  );
};

export default VerbGrammarLegend;
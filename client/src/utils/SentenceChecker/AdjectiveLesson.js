import React, { useState } from 'react';

const AdjectiveLesson = () => {
  const [selectedExample, setSelectedExample] = useState(null);

  const adjectiveExamples = [
    {
      sentence: "The red apple",
      breakdown: ["The (article)", "red (adjective - color)", "apple (noun)"],
      explanation: "Describes the color of the apple"
    },
    {
      sentence: "A difficult question",
      breakdown: ["A (article)", "difficult (adjective - opinion)", "question (noun)"],
      explanation: "Describes the difficulty level of the question"
    },
    {
      sentence: "She is happy",
      breakdown: ["She (pronoun)", "is (verb)", "happy (adjective - emotion)"],
      explanation: "Describes her emotional state"
    },
    {
      sentence: "My two beautiful small old round green Italian wooden racing chairs",
      breakdown: [
        "My (determiner)",
        "two (quantity)",
        "beautiful (opinion)",
        "small (size)",
        "old (age)",
        "round (shape)",
        "green (color)",
        "Italian (origin)",
        "wooden (material)",
        "racing (purpose)",
        "chairs (noun)"
      ],
      explanation: "Example of the Royal Order of Adjectives - all adjectives are in the correct order!"
    }
  ];

  return (
    <div style={{
      marginTop: '2rem',
      padding: '2rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      border: '1px solid #dee2e6'
    }}>
      {/* What is an Adjective? */}
      <div style={{
        backgroundColor: '#f9f9f9',
        padding: '2rem',
        borderRadius: '10px',
        marginBottom: '2rem',
        border: '1px solid #ddd'
      }}>
        <h3 style={{ color: '#333', marginBottom: '1rem' }}>What is an Adjective?</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
          An <strong>adjective</strong> is a word that describes, modifies, or gives more information about a <strong>noun</strong> or <strong>pronoun</strong>. 
          Adjectives help the reader visualize, feel, or understand something more precisely.
        </p>

        {/* Examples Section */}
        <div style={{ marginTop: '1.5rem' }}>
          <h4 style={{ color: '#555', marginBottom: '1rem' }}>Interactive Examples:</h4>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {adjectiveExamples.map((example, index) => (
              <div
                key={index}
                onClick={() => setSelectedExample(selectedExample === index ? null : index)}
                style={{
                  padding: '1rem',
                  backgroundColor: selectedExample === index ? '#e3f2fd' : '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {example.sentence}
                </div>
                {selectedExample === index && (
                  <div>
                    <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                      Breakdown:
                    </div>
                    <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                      {example.breakdown.map((item, i) => (
                        <li key={i} style={{ fontSize: '0.9rem', color: '#555' }}>{item}</li>
                      ))}
                    </ul>
                    <div style={{ fontSize: '0.9rem', color: '#007acc', fontStyle: 'italic' }}>
                      {example.explanation}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdjectiveLesson;
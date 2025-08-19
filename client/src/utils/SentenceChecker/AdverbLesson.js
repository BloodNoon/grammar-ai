import React, { useState } from 'react';

const AdverbLesson = () => {
  const [selectedExample, setSelectedExample] = useState(null);

  const adverbExamples = [
    {
      sentence: "She sings beautifully.",
      breakdown: ["She (pronoun)", "sings (verb)", "beautifully (adverb - modifies verb)"],
      explanation: "The adverb 'beautifully' modifies the verb 'sings' to show HOW she sings."
    },
    {
      sentence: "The water is extremely cold.",
      breakdown: ["The (article)", "water (noun)", "is (verb)", "extremely (adverb)", "cold (adjective)"],
      explanation: "The adverb 'extremely' modifies the adjective 'cold' to show the DEGREE of coldness."
    },
    {
      sentence: "He ran very quickly.",
      breakdown: ["He (pronoun)", "ran (verb)", "very (adverb)", "quickly (adverb)"],
      explanation: "The adverb 'very' modifies another adverb 'quickly' to strengthen its meaning."
    },
    {
      sentence: "Yesterday, I finished my homework.",
      breakdown: ["Yesterday (adverb - time)", "I (pronoun)", "finished (verb)", "my (determiner)", "homework (noun)"],
      explanation: "The adverb 'yesterday' tells us WHEN the action happened."
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
      {/* What is an Adverb? */}
      <div style={{
        backgroundColor: '#f9f9f9',
        padding: '2rem',
        borderRadius: '10px',
        marginBottom: '2rem',
        border: '1px solid #ddd'
      }}>
        <h3 style={{ color: '#333', marginBottom: '1rem' }}>1. What is an Adverb?</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
          An <strong>adverb</strong> is a word that modifies a <strong>verb, adjective, or another adverb</strong>. 
          It can describe <strong>how</strong>, <strong>when</strong>, <strong>where</strong>, <strong>how often</strong>, 
          or <strong>to what extent</strong> something happens.
        </p>

        {/* What do Adverbs do? */}
        <div style={{ marginTop: '1.5rem' }}>
          <h4 style={{ color: '#555', marginBottom: '1rem' }}>2. What do Adverbs do, and what do they do it to?</h4>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{
              padding: '1rem',
              backgroundColor: '#e3f2fd',
              borderRadius: '8px',
              border: '1px solid #90caf9'
            }}>
              <strong style={{ color: '#1565c0' }}>To verbs:</strong> Show how an action happens
              <div style={{ fontStyle: 'italic', marginTop: '0.5rem', color: '#555' }}>
                She sings <span style={{ color: '#1565c0', fontWeight: 'bold' }}>beautifully</span>.
              </div>
            </div>
            
            <div style={{
              padding: '1rem',
              backgroundColor: '#e8f5e9',
              borderRadius: '8px',
              border: '1px solid #a5d6a7'
            }}>
              <strong style={{ color: '#2e7d32' }}>To adjectives:</strong> Modify intensity
              <div style={{ fontStyle: 'italic', marginTop: '0.5rem', color: '#555' }}>
                The water is <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>extremely</span> cold.
              </div>
            </div>
            
            <div style={{
              padding: '1rem',
              backgroundColor: '#fff3e0',
              borderRadius: '8px',
              border: '1px solid #ffcc02'
            }}>
              <strong style={{ color: '#ef6c00' }}>To other adverbs:</strong> Strengthen or weaken
              <div style={{ fontStyle: 'italic', marginTop: '0.5rem', color: '#555' }}>
                He ran <span style={{ color: '#ef6c00', fontWeight: 'bold' }}>very</span> quickly.
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Examples */}
        <div style={{ marginTop: '2rem' }}>
          <h4 style={{ color: '#555', marginBottom: '1rem' }}>Interactive Examples:</h4>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {adverbExamples.map((example, index) => (
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

export default AdverbLesson;
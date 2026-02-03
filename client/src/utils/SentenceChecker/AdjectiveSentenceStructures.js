import React from 'react';

const AdjectiveSentenceStructures = () => {
  const sentenceStructures = [
    {
      title: 'Pronoun + Be Verb + Adjective',
      examples: ['She is happy.', 'They are excited.']
    },
    {
      title: 'Article + Noun + Be Verb + Adjective',
      examples: ['The car is fast.', 'A dog is friendly.']
    },
    {
      title: 'Article + Adjective + Noun + Be Verb + Adjective',
      examples: ['The tall building is impressive.', 'A sweet cake is delicious.']
    },
    {
      title: 'Pronoun + Verb + Preposition + Article + Adjective + Noun',
      examples: ['He walked into a dark room.', 'They looked at the beautiful painting.']
    },
    {
      title: 'Article + Adjective + Noun + Verb + Article + Adjective + Noun',
      examples: ['The hungry cat chased the small mouse.', 'A young boy met a kind teacher.']
    }
  ];

  return (
    <div style={{
      backgroundColor: '#e8f5e9',
      padding: '2rem',
      borderRadius: '10px',
      marginBottom: '2rem',
      border: '1px solid #4caf50'
    }}>
      <h3 style={{ color: '#2e7d32', marginBottom: '1.5rem' }}>📝 Basic Adjective Sentence Structures</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {sentenceStructures.map((structure, index) => (
          <div key={index} style={{
            backgroundColor: '#fff',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}>
            <div style={{ fontWeight: 'bold', color: '#2e7d32', marginBottom: '0.75rem' }}>
              {structure.title}
            </div>
            {structure.examples.map((example, i) => (
              <div key={i} style={{ 
                fontSize: '1rem', 
                fontStyle: 'italic', 
                marginBottom: '0.25rem',
                color: '#555'
              }}>
                • {example}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: '#fff',
        borderRadius: '8px',
        border: '1px solid #4caf50'
      }}>
        <h4 style={{ color: '#2e7d32', marginBottom: '0.5rem' }}>💡 Pro Tip:</h4>
        <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: '1.5' }}>
          Notice how adjectives can come before nouns (descriptive) or after "be" verbs (predicative). 
          Both positions are correct but serve different purposes in your sentences!
        </p>
      </div>
    </div>
  );
};

export default AdjectiveSentenceStructures;
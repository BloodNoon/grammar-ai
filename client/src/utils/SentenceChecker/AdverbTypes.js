import React from 'react';

const AdverbTypes = () => {
  const adverbTypes = [
    {
      type: 'Manner',
      description: 'How something happens',
      examples: ['quickly', 'gently', 'loudly', 'carefully', 'beautifully'],
      color: '#e3f2fd',
      borderColor: '#1976d2',
      textColor: '#1565c0'
    },
    {
      type: 'Time',
      description: 'When something happens',
      examples: ['yesterday', 'soon', 'now', 'later', 'always'],
      color: '#e8f5e9',
      borderColor: '#388e3c',
      textColor: '#2e7d32'
    },
    {
      type: 'Place',
      description: 'Where something happens',
      examples: ['here', 'outside', 'upstairs', 'everywhere', 'nearby'],
      color: '#fff3e0',
      borderColor: '#f57c00',
      textColor: '#ef6c00'
    },
    {
      type: 'Frequency',
      description: 'How often something happens',
      examples: ['always', 'often', 'rarely', 'sometimes', 'never'],
      color: '#f3e5f5',
      borderColor: '#7b1fa2',
      textColor: '#6a1b9a'
    },
    {
      type: 'Degree',
      description: 'To what extent something happens',
      examples: ['very', 'completely', 'almost', 'quite', 'extremely'],
      color: '#ffebee',
      borderColor: '#c62828',
      textColor: '#c62828'
    }
  ];

  return (
    <div style={{
      backgroundColor: '#fff8e1',
      padding: '2rem',
      borderRadius: '10px',
      marginBottom: '2rem',
      border: '2px solid #ffc107'
    }}>
      <h3 style={{ color: '#e65100', marginBottom: '1rem' }}>⚡ 3. Types of Adverbs</h3>
      <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
        Adverbs can be grouped into different categories based on what they describe:
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {adverbTypes.map((type, index) => (
          <div key={index} style={{
            backgroundColor: type.color,
            padding: '1.5rem',
            borderRadius: '8px',
            border: `2px solid ${type.borderColor}`
          }}>
            <div style={{ fontWeight: 'bold', color: type.textColor, marginBottom: '0.5rem', fontSize: '1.1rem' }}>
              {type.type}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem', fontStyle: 'italic' }}>
              {type.description}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {type.examples.map((example, i) => (
                <span key={i} style={{
                  backgroundColor: '#fff',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  border: `1px solid ${type.borderColor}`,
                  color: type.textColor,
                  fontWeight: '500'
                }}>
                  {example}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: '#fff',
        borderRadius: '8px',
        border: '1px solid #ffc107'
      }}>
        <h4 style={{ color: '#e65100', marginBottom: '0.5rem' }}>💡 Quick Tip:</h4>
        <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: '1.5', margin: 0 }}>
          Many adverbs end in -ly (quickly, beautifully), but not all! Words like "fast," "well," "soon," and "here" 
          are also adverbs. The key is understanding what they modify in the sentence.
        </p>
      </div>
    </div>
  );
};

export default AdverbTypes;
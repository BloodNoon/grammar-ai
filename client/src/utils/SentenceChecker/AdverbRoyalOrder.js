import React from 'react';

const AdverbRoyalOrder = () => {
  const adverbOrder = [
    { order: '1', type: 'Manner', description: 'How?', examples: 'hard, carefully, quietly', color: '#e3f2fd' },
    { order: '2', type: 'Place', description: 'Where?', examples: 'in the library, outside, here', color: '#e8f5e9' },
    { order: '3', type: 'Frequency', description: 'How often?', examples: 'every day, always, rarely', color: '#fff3e0' },
    { order: '4', type: 'Time', description: 'When?', examples: 'last year, yesterday, soon', color: '#f3e5f5' },
    { order: '5', type: 'Purpose', description: 'Why?', examples: 'to improve, for success', color: '#ffebee' }
  ];

  return (
    <div style={{
      backgroundColor: '#e8f5e9',
      padding: '2rem',
      borderRadius: '10px',
      marginBottom: '2rem',
      border: '2px solid #4caf50'
    }}>
      <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>👑 4. The Royal Order of Adverbs</h3>
      <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
        When multiple adverbs appear together, they tend to follow this sequence:
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {adverbOrder.map((item, index) => (
          <div key={item.order} style={{
            backgroundColor: item.color,
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: '1px solid #ddd',
            textAlign: 'center',
            minWidth: '120px'
          }}>
            <div style={{ fontWeight: 'bold', color: '#2e7d32', marginBottom: '0.25rem' }}>
              {item.order}. {item.type}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#666', fontStyle: 'italic' }}>
              {item.description}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {adverbOrder.map((item) => (
          <div key={item.order} style={{
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}>
            <div style={{ fontWeight: 'bold', color: '#2e7d32', marginBottom: '0.5rem' }}>
              {item.order}. {item.type}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666', fontStyle: 'italic' }}>
              {item.examples}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '2px solid #4caf50'
      }}>
        <h4 style={{ color: '#2e7d32', marginBottom: '0.75rem' }}>Perfect Example:</h4>
        <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: '#333', marginBottom: '0.75rem' }}>
          "He worked <span style={{ color: '#1976d2', fontWeight: 'bold' }}>hard</span> <span style={{ color: '#388e3c', fontWeight: 'bold' }}>in the library</span> <span style={{ color: '#f57c00', fontWeight: 'bold' }}>every day</span> <span style={{ color: '#7b1fa2', fontWeight: 'bold' }}>last year</span> <span style={{ color: '#c62828', fontWeight: 'bold' }}>to improve his grades</span>."
        </p>
        <div style={{ fontSize: '0.9rem', color: '#666', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <span><strong style={{ color: '#1976d2' }}>Manner:</strong> hard</span>
          <span><strong style={{ color: '#388e3c' }}>Place:</strong> in the library</span>
          <span><strong style={{ color: '#f57c00' }}>Frequency:</strong> every day</span>
          <span><strong style={{ color: '#7b1fa2' }}>Time:</strong> last year</span>
          <span><strong style={{ color: '#c62828' }}>Purpose:</strong> to improve his grades</span>
        </div>
      </div>
    </div>
  );
};

export default AdverbRoyalOrder;
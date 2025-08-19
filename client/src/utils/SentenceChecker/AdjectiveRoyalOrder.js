import React from 'react';

const AdjectiveRoyalOrder = () => {
  const adjectiveOrder = [
    { order: '1', type: 'Determiner', examples: 'a, an, the, my, three, some' },
    { order: '2', type: 'Quantity or number', examples: 'two, several, many' },
    { order: '3', type: 'Opinion', examples: 'beautiful, delicious, strange' },
    { order: '4', type: 'Size', examples: 'small, huge, tall' },
    { order: '5', type: 'Age', examples: 'young, ancient, modern' },
    { order: '6', type: 'Shape', examples: 'round, square, oval' },
    { order: '7', type: 'Color', examples: 'red, blue, green' },
    { order: '8', type: 'Origin', examples: 'French, American, African' },
    { order: '9', type: 'Material', examples: 'wooden, silk, metal' },
    { order: '10', type: 'Purpose', examples: 'sleeping bag, racing car' }
  ];

  return (
    <div style={{
      backgroundColor: '#fff3e0',
      padding: '2rem',
      borderRadius: '10px',
      marginBottom: '2rem',
      border: '2px solid #ff9800'
    }}>
      <h3 style={{ color: '#e65100', marginBottom: '1rem' }}>👑 The Royal Order of Adjectives</h3>
      <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
        When using multiple adjectives before a noun in English, they usually follow this order:
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {adjectiveOrder.map((item) => (
          <div key={item.order} style={{
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}>
            <div style={{ fontWeight: 'bold', color: '#e65100', marginBottom: '0.5rem' }}>
              {item.order}. {item.type}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666', fontStyle: 'italic' }}>
              {item.examples}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: '#fff',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
        <h4 style={{ color: '#e65100', marginBottom: '0.5rem' }}>Perfect Example:</h4>
        <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#333' }}>
          "My two beautiful small old round green Italian wooden racing chairs"
        </p>
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
          This follows the exact order: Determiner → Quantity → Opinion → Size → Age → Shape → Color → Origin → Material → Purpose → Noun
        </p>
      </div>
    </div>
  );
};

export default AdjectiveRoyalOrder;
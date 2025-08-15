import React from 'react';

const PrepositionPhraseLesson = () => {
  return (
    <div
      style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: '#f0f8ff',
        borderRadius: '10px',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
      }}
    >
      <h2
        style={{
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: '#333',
        }}
      >
        Learn the Lesson: What are Prepositional Phrases?
      </h2>

      <div style={{ textAlign: 'left', fontSize: '1.1rem', lineHeight: '1.8' }}>
        <p><strong>Definition:</strong> A prepositional phrase = preposition + article/determiner + noun</p>
        
        <div style={{ margin: '1rem 0', padding: '1rem', backgroundColor: '#e8f4fd', borderRadius: '8px' }}>
          <h4 style={{ color: '#1565c0', marginBottom: '0.5rem' }}>Examples of Prepositional Phrases:</h4>
          <ul style={{ margin: '0.5rem 0' }}>
            <li><strong>in the house</strong> (preposition + article + noun)</li>
            <li><strong>on the table</strong> (preposition + article + noun)</li>
            <li><strong>under the bridge</strong> (preposition + article + noun)</li>
            <li><strong>after the movie</strong> (preposition + article + noun)</li>
            <li><strong>during the game</strong> (preposition + article + noun)</li>
          </ul>
        </div>

        <p><strong>How they work in sentences:</strong></p>
        <div style={{ margin: '1rem 0', padding: '1rem', backgroundColor: '#fff3e0', borderRadius: '8px' }}>
          <p>• <strong>After the movie</strong>, we went home.</p>
          <p>• The cat sleeps <strong>on the couch</strong>.</p>
          <p>• <strong>During the storm</strong>, the power went out.</p>
        </div>
      </div>
    </div>
  );
};

export default PrepositionPhraseLesson;
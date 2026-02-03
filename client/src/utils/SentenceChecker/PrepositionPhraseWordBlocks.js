import React, { useState } from 'react';

const PrepositionPhraseWordBlocks = () => {
  // Initialize with objects that have unique IDs
  const initialWords = [
    { id: 0, text: 'After' },
    { id: 1, text: 'the' },
    { id: 2, text: 'movie,' },
    { id: 3, text: 'we' },
    { id: 4, text: 'went' },
    { id: 5, text: 'to' },
    { id: 6, text: 'the' },
    { id: 7, text: 'store.' }
  ];

  const [droppedWords, setDroppedWords] = useState([]);
  const [availableWords, setAvailableWords] = useState(initialWords);
  const correctOrder = ['After', 'the', 'movie,', 'we', 'went', 'to', 'the', 'store.'];

  const handleDragStart = (e, wordObj) => {
    e.dataTransfer.setData('application/json', JSON.stringify(wordObj));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const wordObj = JSON.parse(e.dataTransfer.getData('application/json'));
    
    // Check if this word is still available (prevent double-dropping)
    if (availableWords.some(w => w.id === wordObj.id)) {
      setDroppedWords(prev => [...prev, wordObj]);
      setAvailableWords(prev => prev.filter(w => w.id !== wordObj.id));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const resetGame = () => {
    setDroppedWords([]);
    setAvailableWords(initialWords);
  };

  const checkAnswer = () => {
    const droppedTexts = droppedWords.map(w => w.text);
    if (JSON.stringify(droppedTexts) === JSON.stringify(correctOrder)) {
      alert('🎉 Perfect! You created the correct sentence!');
    } else {
      alert('❌ Not quite right. Try again!');
    }
  };

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
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '1rem', color: '#333' }}>
        🧩 Practice: Arrange Word Blocks
      </h2>
      
      <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
        Drag the words to create: <strong>"After the movie, we went to the store."</strong>
      </p>

      {/* Available Words */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '0.5rem', 
        justifyContent: 'center',
        marginBottom: '1rem',
        padding: '1rem',
        backgroundColor: '#fff',
        borderRadius: '8px',
        border: '2px dashed #ccc',
        minHeight: '60px'
      }}>
        <strong style={{ width: '100%', textAlign: 'center', marginBottom: '0.5rem' }}>Available Words:</strong>
        {availableWords.map((wordObj) => (
          <div
            key={wordObj.id}
            draggable
            onDragStart={(e) => handleDragStart(e, wordObj)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#007bff',
              color: 'white',
              borderRadius: '4px',
              cursor: 'grab',
              userSelect: 'none'
            }}
          >
            {wordObj.text}
          </div>
        ))}
      </div>

      {/* Drop Zone */}
      <div 
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          minHeight: '80px',
          border: '2px dashed #28a745',
          borderRadius: '8px',
          padding: '1rem',
          backgroundColor: '#f8fff9',
          textAlign: 'center',
          fontSize: '1.1rem',
          marginBottom: '1rem'
        }}
      >
        {droppedWords.length === 0 ? (
          <span style={{ color: '#666' }}>Drop words here to build your sentence</span>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {droppedWords.map((wordObj) => (
              <div
                key={`dropped-${wordObj.id}`}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  borderRadius: '4px'
                }}
              >
                {wordObj.text}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div style={{ textAlign: 'center', gap: '1rem', display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={checkAnswer}
          disabled={droppedWords.length !== correctOrder.length}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: droppedWords.length === correctOrder.length ? '#28a745' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: droppedWords.length === correctOrder.length ? 'pointer' : 'not-allowed',
            fontWeight: 'bold'
          }}
        >
          Check Answer
        </button>
        
        <button
          onClick={resetGame}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PrepositionPhraseWordBlocks;
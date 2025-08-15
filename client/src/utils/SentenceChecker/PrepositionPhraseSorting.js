import React, { useState } from 'react';

const PrepositionPhraseSorting = () => {
  const [timeCategory, setTimeCategory] = useState([]);
  const [placeCategory, setPlaceCategory] = useState([]);
  const [availablePhrases, setAvailablePhrases] = useState([
    { phrase: 'after the movie', type: 'time' },
    { phrase: 'in the kitchen', type: 'place' },
    { phrase: 'during the game', type: 'time' },
    { phrase: 'under the bridge', type: 'place' },
    { phrase: 'before dinner', type: 'time' },
    { phrase: 'on the table', type: 'place' }
  ]);

  const handleDragStart = (e, phraseObj) => {
    e.dataTransfer.setData('application/json', JSON.stringify(phraseObj));
  };

  const handleDrop = (e, category) => {
    e.preventDefault();
    const phraseObj = JSON.parse(e.dataTransfer.getData('application/json'));
    
    // Remove from available phrases
    setAvailablePhrases(prev => prev.filter(p => p.phrase !== phraseObj.phrase));
    
    // Add to appropriate category
    if (category === 'time') {
      setTimeCategory(prev => [...prev, phraseObj]);
    } else if (category === 'place') {
      setPlaceCategory(prev => [...prev, phraseObj]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropToAvailable = (e) => {
    e.preventDefault();
    const phraseObj = JSON.parse(e.dataTransfer.getData('application/json'));
    
    // Remove from categories
    setTimeCategory(prev => prev.filter(p => p.phrase !== phraseObj.phrase));
    setPlaceCategory(prev => prev.filter(p => p.phrase !== phraseObj.phrase));
    
    // Add back to available
    setAvailablePhrases(prev => [...prev, phraseObj]);
  };

  const checkAnswers = () => {
    let correct = 0;
    let total = timeCategory.length + placeCategory.length;
    
    timeCategory.forEach(item => {
      if (item.type === 'time') correct++;
    });
    
    placeCategory.forEach(item => {
      if (item.type === 'place') correct++;
    });

    if (correct === total && total === 6) {
      alert(`🎉 Perfect! You got ${correct} out of ${total} correct!`);
    } else {
      alert(`You got ${correct} out of ${total} correct. Try again!`);
    }
  };

  const resetGame = () => {
    setTimeCategory([]);
    setPlaceCategory([]);
    setAvailablePhrases([
      { phrase: 'after the movie', type: 'time' },
      { phrase: 'in the kitchen', type: 'place' },
      { phrase: 'during the game', type: 'time' },
      { phrase: 'under the bridge', type: 'place' },
      { phrase: 'before dinner', type: 'time' },
      { phrase: 'on the table', type: 'place' }
    ]);
  };

  const renderPhrase = (item, index, source) => (
    <div
      key={`${item.phrase}-${index}-${source}`}
      draggable
      onDragStart={(e) => handleDragStart(e, item)}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: '#6c757d',
        color: 'white',
        borderRadius: '4px',
        cursor: 'grab',
        userSelect: 'none',
        fontSize: '0.9rem',
        margin: '0.25rem'
      }}
    >
      {item.phrase}
    </div>
  );

  return (
    <div
      style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
      }}
    >
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '1rem', color: '#333' }}>
        🎨 Extra Practice: Sort Prepositions by Type
      </h2>

      <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
        Drag each prepositional phrase to its correct category:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        {/* Time Category */}
        <div 
          style={{ 
            padding: '1rem', 
            backgroundColor: '#e3f2fd', 
            borderRadius: '8px',
            border: '2px dashed #1976d2',
            minHeight: '120px'
          }}
          onDrop={(e) => handleDrop(e, 'time')}
          onDragOver={handleDragOver}
        >
          <h4 style={{ color: '#1976d2', marginBottom: '0.5rem' }}>⏰ Time</h4>
          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
            Drop time-related phrases here
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {timeCategory.map((item, index) => renderPhrase(item, index, 'time'))}
          </div>
        </div>

        {/* Place Category */}
        <div 
          style={{ 
            padding: '1rem', 
            backgroundColor: '#e8f5e9', 
            borderRadius: '8px',
            border: '2px dashed #388e3c',
            minHeight: '120px'
          }}
          onDrop={(e) => handleDrop(e, 'place')}
          onDragOver={handleDragOver}
        >
          <h4 style={{ color: '#388e3c', marginBottom: '0.5rem' }}>📍 Place</h4>
          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
            Drop location-related phrases here
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {placeCategory.map((item, index) => renderPhrase(item, index, 'place'))}
          </div>
        </div>
      </div>

      {/* Available phrases */}
      <div 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '0.5rem', 
          justifyContent: 'center',
          padding: '1rem',
          backgroundColor: '#fff',
          borderRadius: '8px',
          border: '1px solid #ddd',
          minHeight: '80px'
        }}
        onDrop={handleDropToAvailable}
        onDragOver={handleDragOver}
      >
        <strong style={{ width: '100%', textAlign: 'center', marginBottom: '0.5rem' }}>
          Available Phrases:
        </strong>
        {availablePhrases.map((item, index) => renderPhrase(item, index, 'available'))}
      </div>

      {/* Control Buttons */}
      <div style={{ textAlign: 'center', marginTop: '1rem', gap: '1rem', display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={checkAnswers}
          disabled={availablePhrases.length > 0}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: availablePhrases.length === 0 ? '#28a745' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: availablePhrases.length === 0 ? 'pointer' : 'not-allowed',
            fontWeight: 'bold'
          }}
        >
          Check Answers
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

export default PrepositionPhraseSorting;
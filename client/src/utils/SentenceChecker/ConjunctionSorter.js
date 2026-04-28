import React, { useState } from 'react';

const ConjunctionSorter = () => {
  const [coordinating, setCoordinating] = useState([]);
  const [subordinating, setSubordinating] = useState([]);
  const [correlative, setCorrelative] = useState([]);
  
  const [availableWords, setAvailableWords] = useState([
    { word: 'and', type: 'coordinating' },
    { word: 'because', type: 'subordinating' },
    { word: 'Both... and', type: 'correlative' },
    { word: 'although', type: 'subordinating' },
    { word: 'but', type: 'coordinating' },
    { word: 'Either... or', type: 'correlative' },
    { word: 'if', type: 'subordinating' },
    { word: 'so', type: 'coordinating' },
    { word: 'Not only... but also', type: 'correlative' }
  ]);

  const handleDragStart = (e, wordObj) => {
    e.dataTransfer.setData('application/json', JSON.stringify(wordObj));
  };

  const handleDrop = (e, category) => {
    e.preventDefault();
    const wordObj = JSON.parse(e.dataTransfer.getData('application/json'));
    
    // Remove from all arrays first to avoid duplicates
    setAvailableWords(prev => prev.filter(w => w.word !== wordObj.word));
    setCoordinating(prev => prev.filter(w => w.word !== wordObj.word));
    setSubordinating(prev => prev.filter(w => w.word !== wordObj.word));
    setCorrelative(prev => prev.filter(w => w.word !== wordObj.word));

    // Add to the new category
    if (category === 'coordinating') setCoordinating(prev => [...prev, wordObj]);
    else if (category === 'subordinating') setSubordinating(prev => [...prev, wordObj]);
    else if (category === 'correlative') setCorrelative(prev => [...prev, wordObj]);
    else setAvailableWords(prev => [...prev, wordObj]);
  };

  const handleDragOver = (e) => e.preventDefault();

  const renderWord = (item) => (
    <div
      key={item.word}
      draggable
      onDragStart={(e) => handleDragStart(e, item)}
      style={{
        padding: '8px 12px', background: '#fff', border: '2px solid #3B82F6', borderRadius: '6px',
        cursor: 'grab', display: 'inline-block', margin: '4px', fontWeight: 'bold', color: '#1E3A8A'
      }}
    >
      {item.word}
    </div>
  );

  const checkAnswers = () => {
    const isCoordinatingCorrect = coordinating.every(w => w.type === 'coordinating');
    const isSubordinatingCorrect = subordinating.every(w => w.type === 'subordinating');
    const isCorrelativeCorrect = correlative.every(w => w.type === 'correlative');

    if (isCoordinatingCorrect && isSubordinatingCorrect && isCorrelativeCorrect) {
      alert('🎉 Perfect sorting! You know your conjunction types!');
    } else {
      alert('❌ Some words are in the wrong category. Keep trying!');
    }
  };

  const resetGame = () => {
    setAvailableWords([
      { word: 'and', type: 'coordinating' }, { word: 'because', type: 'subordinating' }, { word: 'Both... and', type: 'correlative' },
      { word: 'although', type: 'subordinating' }, { word: 'but', type: 'coordinating' }, { word: 'Either... or', type: 'correlative' },
      { word: 'if', type: 'subordinating' }, { word: 'so', type: 'coordinating' }, { word: 'Not only... but also', type: 'correlative' }
    ]);
    setCoordinating([]); setSubordinating([]); setCorrelative([]);
  };

  return (
    <div style={{ width: '100%', fontFamily: 'sans-serif' }}>
      
      {/* Target Drop Zones */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        <div onDrop={(e) => handleDrop(e, 'coordinating')} onDragOver={handleDragOver} style={{ minHeight: '120px', padding: '10px', background: '#fff3e0', border: '2px dashed #f57c00', borderRadius: '8px' }}>
          <strong style={{ color: '#e65100', display: 'block', textAlign: 'center', marginBottom: '10px' }}>Coordinating</strong>
          {coordinating.map(renderWord)}
        </div>
        <div onDrop={(e) => handleDrop(e, 'subordinating')} onDragOver={handleDragOver} style={{ minHeight: '120px', padding: '10px', background: '#e3f2fd', border: '2px dashed #1976d2', borderRadius: '8px' }}>
          <strong style={{ color: '#1565c0', display: 'block', textAlign: 'center', marginBottom: '10px' }}>Subordinating</strong>
          {subordinating.map(renderWord)}
        </div>
        <div onDrop={(e) => handleDrop(e, 'correlative')} onDragOver={handleDragOver} style={{ minHeight: '120px', padding: '10px', background: '#f3e5f5', border: '2px dashed #7b1fa2', borderRadius: '8px' }}>
          <strong style={{ color: '#6a1b9a', display: 'block', textAlign: 'center', marginBottom: '10px' }}>Correlative</strong>
          {correlative.map(renderWord)}
        </div>
      </div>

      {/* Available Words Zone */}
      <div onDrop={(e) => handleDrop(e, 'available')} onDragOver={handleDragOver} style={{ minHeight: '80px', padding: '15px', background: '#f8f9fa', border: '2px solid #ddd', borderRadius: '8px', textAlign: 'center' }}>
        <strong style={{ display: 'block', marginBottom: '10px', color: '#555' }}>Drag these words to their correct category:</strong>
        {availableWords.map(renderWord)}
      </div>

      {/* Controls */}
      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        <button onClick={checkAnswers} disabled={availableWords.length > 0} style={{ padding: '10px 20px', backgroundColor: availableWords.length === 0 ? '#28a745' : '#ccc', color: 'white', border: 'none', borderRadius: '6px', cursor: availableWords.length === 0 ? 'pointer' : 'not-allowed', fontWeight: 'bold', marginRight: '10px' }}>Check Answers</button>
        <button onClick={resetGame} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Reset</button>
      </div>
    </div>
  );
};

export default ConjunctionSorter;
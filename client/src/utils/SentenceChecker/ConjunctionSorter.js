import { Box, Button } from '@chakra-ui/react';
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
    <Box
      key={item.word}
      draggable
      onDragStart={(e) => handleDragStart(e, item)}
      style={{
        padding: '8px 12px', background: 'white', border: '2px solid #3B82F6', borderRadius: '6px',
        cursor: 'grab', display: 'inline-block', margin: '4px', fontWeight: 'bold', color: '#1E3A8A'
      }}
    >
      {item.word}
    </Box>
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
    <Box style={{ width: '100%', fontFamily: 'sans-serif' }}>
      
      {/* Target Drop Zones */}
      <Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        <Box onDrop={(e) => handleDrop(e, 'coordinating')} onDragOver={handleDragOver} style={{ minHeight: '120px', padding: '10px', background: 'orange.50', border: '2px dashed #f57c00', borderRadius: '8px' }}>
          <strong style={{ color: '#e65100', display: 'block', textAlign: 'center', marginBottom: '10px' }}>Coordinating</strong>
          {coordinating.map(renderWord)}
        </Box>
        <Box onDrop={(e) => handleDrop(e, 'subordinating')} onDragOver={handleDragOver} style={{ minHeight: '120px', padding: '10px', background: 'blue.50', border: '2px dashed blue.700', borderRadius: '8px' }}>
          <strong style={{ color: 'blue.800', display: 'block', textAlign: 'center', marginBottom: '10px' }}>Subordinating</strong>
          {subordinating.map(renderWord)}
        </Box>
        <Box onDrop={(e) => handleDrop(e, 'correlative')} onDragOver={handleDragOver} style={{ minHeight: '120px', padding: '10px', background: 'purple.50', border: '2px dashed #7b1fa2', borderRadius: '8px' }}>
          <strong style={{ color: '#6a1b9a', display: 'block', textAlign: 'center', marginBottom: '10px' }}>Correlative</strong>
          {correlative.map(renderWord)}
        </Box>
      </Box>

      {/* Available Words Zone */}
      <Box onDrop={(e) => handleDrop(e, 'available')} onDragOver={handleDragOver} style={{ minHeight: '80px', padding: '15px', background: 'gray.50', border: '2px solid gray.200', borderRadius: '8px', textAlign: 'center' }}>
        <strong style={{ display: 'block', marginBottom: '10px', color: '#555' }}>Drag these words to their correct category:</strong>
        {availableWords.map(renderWord)}
      </Box>

      {/* Controls */}
      <Box style={{ textAlign: 'center', marginTop: '15px' }}>
        <Button onClick={checkAnswers} disabled={availableWords.length > 0} style={{ padding: '10px 20px', backgroundColor: availableWords.length === 0 ? 'green.500' : 'gray.300', color: 'white', border: 'none', borderRadius: '6px', cursor: availableWords.length === 0 ? 'pointer' : 'not-allowed', fontWeight: 'bold', marginRight: '10px' }}>Check Answers</Button>
        <Button onClick={resetGame} sx={{ padding: '10px 20px', backgroundColor: 'gray.500', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Reset</Button>
      </Box>
    </Box>
  );
};

export default ConjunctionSorter;
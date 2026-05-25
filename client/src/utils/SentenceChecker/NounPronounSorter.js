import { Box, Button, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const NounPronounSorter = () => {
  const [common, setCommon] = useState([]);
  const [proper, setProper] = useState([]);
  const [pronoun, setPronoun] = useState([]);
  
  const [availableWords, setAvailableWords] = useState([
    { word: 'city', type: 'common' },
    { word: 'Sarah', type: 'proper' },
    { word: 'they', type: 'pronoun' },
    { word: 'dog', type: 'common' },
    { word: 'Chicago', type: 'proper' },
    { word: 'herself', type: 'pronoun' },
    { word: 'idea', type: 'common' },
    { word: 'mine', type: 'pronoun' },
    { word: 'Tuesday', type: 'proper' }
  ]);

  const handleDragStart = (e, wordObj) => {
    e.dataTransfer.setData('application/json', JSON.stringify(wordObj));
  };

  const handleDrop = (e, category) => {
    e.preventDefault();
    const wordObj = JSON.parse(e.dataTransfer.getData('application/json'));
    
    setAvailableWords(prev => prev.filter(w => w.word !== wordObj.word));
    setCommon(prev => prev.filter(w => w.word !== wordObj.word));
    setProper(prev => prev.filter(w => w.word !== wordObj.word));
    setPronoun(prev => prev.filter(w => w.word !== wordObj.word));

    if (category === 'common') setCommon(prev => [...prev, wordObj]);
    else if (category === 'proper') setProper(prev => [...prev, wordObj]);
    else if (category === 'pronoun') setPronoun(prev => [...prev, wordObj]);
    else setAvailableWords(prev => [...prev, wordObj]);
  };

  const handleDragOver = (e) => e.preventDefault();

  const renderWord = (item) => (
    <Box
      key={item.word}
      draggable
      onDragStart={(e) => handleDragStart(e, item)}
      style={{
        padding: '8px 12px', background: 'white', border: '2px solid #cbd5e1', borderRadius: '6px',
        cursor: 'grab', display: 'inline-block', margin: '4px', fontWeight: 'bold', color: '#1e293b', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}
    >
      {item.word}
    </Box>
  );

  const checkAnswers = () => {
    const isCommonOk = common.every(w => w.type === 'common');
    const isProperOk = proper.every(w => w.type === 'proper');
    const isPronounOk = pronoun.every(w => w.type === 'pronoun');

    if (isCommonOk && isProperOk && isPronounOk) alert('🎉 Perfect! You know your Nouns and Pronouns!');
    else alert('❌ Something is in the wrong place. Remember, Proper Nouns are capitalized!');
  };

  const resetGame = () => {
    setAvailableWords([
      { word: 'city', type: 'common' }, { word: 'Sarah', type: 'proper' }, { word: 'they', type: 'pronoun' },
      { word: 'dog', type: 'common' }, { word: 'Chicago', type: 'proper' }, { word: 'herself', type: 'pronoun' },
      { word: 'idea', type: 'common' }, { word: 'mine', type: 'pronoun' }, { word: 'Tuesday', type: 'proper' }
    ]);
    setCommon([]); setProper([]); setPronoun([]);
  };

  return (
    <Box style={{ width: '100%' }}>
      <Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        <Box onDrop={(e) => handleDrop(e, 'common')} onDragOver={handleDragOver} style={{ minHeight: '120px', padding: '10px', background: '#e0f2fe', border: '2px dashed #0284c7', borderRadius: '8px' }}>
          <strong style={{ color: '#0369a1', display: 'block', textAlign: 'center', marginBottom: '10px' }}>Common Nouns</strong>
          {common.map(renderWord)}
        </Box>
        <Box onDrop={(e) => handleDrop(e, 'proper')} onDragOver={handleDragOver} style={{ minHeight: '120px', padding: '10px', background: '#ffedd5', border: '2px dashed #ea580c', borderRadius: '8px' }}>
          <strong style={{ color: '#c2410c', display: 'block', textAlign: 'center', marginBottom: '10px' }}>Proper Nouns</strong>
          {proper.map(renderWord)}
        </Box>
        <Box onDrop={(e) => handleDrop(e, 'pronoun')} onDragOver={handleDragOver} style={{ minHeight: '120px', padding: '10px', background: '#f3e8ff', border: '2px dashed #9333ea', borderRadius: '8px' }}>
          <strong style={{ color: '#7e22ce', display: 'block', textAlign: 'center', marginBottom: '10px' }}>Pronouns</strong>
          {pronoun.map(renderWord)}
        </Box>
      </Box>

      <Box onDrop={(e) => handleDrop(e, 'available')} onDragOver={handleDragOver} style={{ minHeight: '80px', padding: '15px', background: 'gray.50', border: '2px solid gray.200', borderRadius: '8px', textAlign: 'center' }}>
        {availableWords.map(renderWord)}
        {availableWords.length === 0 && <Text as="span" style={{color: '#94a3b8'}}>All words placed!</Text>}
      </Box>

      <Box style={{ textAlign: 'center', marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Button onClick={checkAnswers} disabled={availableWords.length > 0} style={{ padding: '8px 16px', backgroundColor: availableWords.length === 0 ? '#22c55e' : '#cbd5e1', color: 'white', border: 'none', borderRadius: '6px', cursor: availableWords.length === 0 ? 'pointer' : 'not-allowed', fontWeight: 'bold' }}>Check Answers</Button>
        <Button onClick={resetGame} style={{ padding: '8px 16px', backgroundColor: '#64748b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Reset</Button>
      </Box>
    </Box>
  );
};

export default NounPronounSorter;
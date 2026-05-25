import { Box, Button, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const PossessiveSorter = () => {
  const [singular, setSingular] = useState([]);
  const [regularPlural, setRegularPlural] = useState([]);
  const [irregularPlural, setIrregularPlural] = useState([]);
  
  const [availableWords, setAvailableWords] = useState([
    { word: "boy's", type: 'singular' },
    { word: "boys'", type: 'regularPlural' },
    { word: "children's", type: 'irregularPlural' },
    { word: "teachers'", type: 'regularPlural' },
    { word: "teacher's", type: 'singular' },
    { word: "women's", type: 'irregularPlural' },
    { word: "dog's", type: 'singular' },
    { word: "cats'", type: 'regularPlural' }
  ]);

  const handleDragStart = (e, wordObj) => {
    e.dataTransfer.setData('application/json', JSON.stringify(wordObj));
  };

  const handleDrop = (e, category) => {
    e.preventDefault();
    const wordObj = JSON.parse(e.dataTransfer.getData('application/json'));
    
    setAvailableWords(prev => prev.filter(w => w.word !== wordObj.word));
    setSingular(prev => prev.filter(w => w.word !== wordObj.word));
    setRegularPlural(prev => prev.filter(w => w.word !== wordObj.word));
    setIrregularPlural(prev => prev.filter(w => w.word !== wordObj.word));

    if (category === 'singular') setSingular(prev => [...prev, wordObj]);
    else if (category === 'regularPlural') setRegularPlural(prev => [...prev, wordObj]);
    else if (category === 'irregularPlural') setIrregularPlural(prev => [...prev, wordObj]);
    else setAvailableWords(prev => [...prev, wordObj]);
  };

  const handleDragOver = (e) => e.preventDefault();

  const renderWord = (item) => (
    <Box
      key={item.word}
      draggable
      onDragStart={(e) => handleDragStart(e, item)}
      style={{
        padding: '6px 12px', background: 'white', border: '2px solid #cbd5e1', borderRadius: '6px',
        cursor: 'grab', display: 'inline-block', margin: '4px', fontWeight: 'bold', color: '#1e293b', fontSize: '1rem'
      }}
    >
      {item.word}
    </Box>
  );

  const checkAnswers = () => {
    const isSingularOk = singular.every(w => w.type === 'singular');
    const isRegPluralOk = regularPlural.every(w => w.type === 'regularPlural');
    const isIrrPluralOk = irregularPlural.every(w => w.type === 'irregularPlural');

    if (isSingularOk && isRegPluralOk && isIrrPluralOk) alert('🎉 Perfect! You mastered the apostrophe rules!');
    else alert('❌ Something is out of place. Look closely at where the apostrophe is!');
  };

  const resetGame = () => {
    setAvailableWords([
      { word: "boy's", type: 'singular' }, { word: "boys'", type: 'regularPlural' }, { word: "children's", type: 'irregularPlural' },
      { word: "teachers'", type: 'regularPlural' }, { word: "teacher's", type: 'singular' }, { word: "women's", type: 'irregularPlural' },
      { word: "dog's", type: 'singular' }, { word: "cats'", type: 'regularPlural' }
    ]);
    setSingular([]); setRegularPlural([]); setIrregularPlural([]);
  };

  return (
    <Box style={{ width: '100%' }}>
      <Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '15px' }}>
        <Box onDrop={(e) => handleDrop(e, 'singular')} onDragOver={handleDragOver} style={{ minHeight: '100px', padding: '10px', background: '#e0f2fe', border: '2px dashed #0284c7', borderRadius: '8px' }}>
          <strong style={{ color: '#0369a1', display: 'block', textAlign: 'center', marginBottom: '8px' }}>Singular ('s)</strong>
          {singular.map(renderWord)}
        </Box>
        <Box onDrop={(e) => handleDrop(e, 'regularPlural')} onDragOver={handleDragOver} style={{ minHeight: '100px', padding: '10px', background: '#ffedd5', border: '2px dashed #ea580c', borderRadius: '8px' }}>
          <strong style={{ color: '#c2410c', display: 'block', textAlign: 'center', marginBottom: '8px' }}>Plural (s')</strong>
          {regularPlural.map(renderWord)}
        </Box>
        <Box onDrop={(e) => handleDrop(e, 'irregularPlural')} onDragOver={handleDragOver} style={{ minHeight: '100px', padding: '10px', background: '#f3e8ff', border: '2px dashed #9333ea', borderRadius: '8px' }}>
          <strong style={{ color: '#7e22ce', display: 'block', textAlign: 'center', marginBottom: '8px' }}>Irregular Plural ('s)</strong>
          {irregularPlural.map(renderWord)}
        </Box>
      </Box>

      <Box onDrop={(e) => handleDrop(e, 'available')} onDragOver={handleDragOver} style={{ minHeight: '60px', padding: '10px', background: 'gray.50', border: '2px solid gray.200', borderRadius: '8px', textAlign: 'center' }}>
        {availableWords.map(renderWord)}
        {availableWords.length === 0 && <Text as="span" style={{color: '#94a3b8', fontSize: '0.9rem'}}>All words placed!</Text>}
      </Box>

      <Box style={{ textAlign: 'center', marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Button onClick={checkAnswers} disabled={availableWords.length > 0} style={{ padding: '8px 16px', backgroundColor: availableWords.length === 0 ? '#22c55e' : '#cbd5e1', color: 'white', border: 'none', borderRadius: '6px', cursor: availableWords.length === 0 ? 'pointer' : 'not-allowed', fontWeight: 'bold' }}>Check Answers</Button>
        <Button onClick={resetGame} style={{ padding: '8px 16px', backgroundColor: '#64748b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Reset</Button>
      </Box>
    </Box>
  );
};

export default PossessiveSorter;
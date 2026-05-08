import React, { useState } from 'react';

const PluralRuleSorter = () => {
  const [sWords, setSWords] = useState([]);
  const [esWords, setEsWords] = useState([]);
  const [iesWords, setIesWords] = useState([]);
  const [irregular, setIrregular] = useState([]);
  
  const [availableWords, setAvailableWords] = useState([
    { word: 'cats', type: 's' },
    { word: 'foxes', type: 'es' },
    { word: 'babies', type: 'ies' },
    { word: 'mice', type: 'irregular' },
    { word: 'buses', type: 'es' },
    { word: 'apples', type: 's' },
    { word: 'children', type: 'irregular' },
    { word: 'cities', type: 'ies' }
  ]);

  const handleDragStart = (e, wordObj) => {
    e.dataTransfer.setData('application/json', JSON.stringify(wordObj));
  };

  const handleDrop = (e, category) => {
    e.preventDefault();
    const wordObj = JSON.parse(e.dataTransfer.getData('application/json'));
    
    setAvailableWords(prev => prev.filter(w => w.word !== wordObj.word));
    setSWords(prev => prev.filter(w => w.word !== wordObj.word));
    setEsWords(prev => prev.filter(w => w.word !== wordObj.word));
    setIesWords(prev => prev.filter(w => w.word !== wordObj.word));
    setIrregular(prev => prev.filter(w => w.word !== wordObj.word));

    if (category === 's') setSWords(prev => [...prev, wordObj]);
    else if (category === 'es') setEsWords(prev => [...prev, wordObj]);
    else if (category === 'ies') setIesWords(prev => [...prev, wordObj]);
    else if (category === 'irregular') setIrregular(prev => [...prev, wordObj]);
    else setAvailableWords(prev => [...prev, wordObj]);
  };

  const handleDragOver = (e) => e.preventDefault();

  const renderWord = (item) => (
    <div
      key={item.word}
      draggable
      onDragStart={(e) => handleDragStart(e, item)}
      style={{
        padding: '6px 10px', background: '#fff', border: '2px solid #cbd5e1', borderRadius: '6px',
        cursor: 'grab', display: 'inline-block', margin: '4px', fontWeight: 'bold', color: '#1e293b', fontSize: '0.9rem'
      }}
    >
      {item.word}
    </div>
  );

  const checkAnswers = () => {
    const isSOk = sWords.every(w => w.type === 's');
    const isEsOk = esWords.every(w => w.type === 'es');
    const isIesOk = iesWords.every(w => w.type === 'ies');
    const isIrrOk = irregular.every(w => w.type === 'irregular');

    if (isSOk && isEsOk && isIesOk && isIrrOk) alert('🎉 Perfect sorting! You know your plural rules!');
    else alert('❌ Something is in the wrong place. Check your spelling endings!');
  };

  const resetGame = () => {
    setAvailableWords([
      { word: 'cats', type: 's' }, { word: 'foxes', type: 'es' }, { word: 'babies', type: 'ies' }, { word: 'mice', type: 'irregular' },
      { word: 'buses', type: 'es' }, { word: 'apples', type: 's' }, { word: 'children', type: 'irregular' }, { word: 'cities', type: 'ies' }
    ]);
    setSWords([]); setEsWords([]); setIesWords([]); setIrregular([]);
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
        <div onDrop={(e) => handleDrop(e, 's')} onDragOver={handleDragOver} style={{ minHeight: '100px', padding: '10px', background: '#e0f2fe', border: '2px dashed #0284c7', borderRadius: '8px' }}>
          <strong style={{ color: '#0369a1', display: 'block', textAlign: 'center', marginBottom: '8px' }}>Add -s</strong>
          {sWords.map(renderWord)}
        </div>
        <div onDrop={(e) => handleDrop(e, 'es')} onDragOver={handleDragOver} style={{ minHeight: '100px', padding: '10px', background: '#ffedd5', border: '2px dashed #ea580c', borderRadius: '8px' }}>
          <strong style={{ color: '#c2410c', display: 'block', textAlign: 'center', marginBottom: '8px' }}>Add -es</strong>
          {esWords.map(renderWord)}
        </div>
        <div onDrop={(e) => handleDrop(e, 'ies')} onDragOver={handleDragOver} style={{ minHeight: '100px', padding: '10px', background: '#f3e8ff', border: '2px dashed #9333ea', borderRadius: '8px' }}>
          <strong style={{ color: '#7e22ce', display: 'block', textAlign: 'center', marginBottom: '8px' }}>Change to -ies</strong>
          {iesWords.map(renderWord)}
        </div>
        <div onDrop={(e) => handleDrop(e, 'irregular')} onDragOver={handleDragOver} style={{ minHeight: '100px', padding: '10px', background: '#dcfce7', border: '2px dashed #16a34a', borderRadius: '8px' }}>
          <strong style={{ color: '#15803d', display: 'block', textAlign: 'center', marginBottom: '8px' }}>Irregular</strong>
          {irregular.map(renderWord)}
        </div>
      </div>

      <div onDrop={(e) => handleDrop(e, 'available')} onDragOver={handleDragOver} style={{ minHeight: '60px', padding: '10px', background: '#f8f9fa', border: '2px solid #ddd', borderRadius: '8px', textAlign: 'center' }}>
        {availableWords.map(renderWord)}
        {availableWords.length === 0 && <span style={{color: '#94a3b8', fontSize: '0.9rem'}}>All words placed!</span>}
      </div>

      <div style={{ textAlign: 'center', marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={checkAnswers} disabled={availableWords.length > 0} style={{ padding: '8px 16px', backgroundColor: availableWords.length === 0 ? '#22c55e' : '#cbd5e1', color: 'white', border: 'none', borderRadius: '6px', cursor: availableWords.length === 0 ? 'pointer' : 'not-allowed', fontWeight: 'bold' }}>Check Answers</button>
        <button onClick={resetGame} style={{ padding: '8px 16px', backgroundColor: '#64748b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Reset</button>
      </div>
    </div>
  );
};

export default PluralRuleSorter;
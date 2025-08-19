import React, { useState } from 'react';

const AdverbTypeSorting = () => {
  const [mannerCategory, setMannerCategory] = useState([]);
  const [timeCategory, setTimeCategory] = useState([]);
  const [placeCategory, setPlaceCategory] = useState([]);
  const [frequencyCategory, setFrequencyCategory] = useState([]);
  const [availableAdverbs, setAvailableAdverbs] = useState([
    { adverb: 'quickly', type: 'manner' },
    { adverb: 'yesterday', type: 'time' },
    { adverb: 'here', type: 'place' },
    { adverb: 'always', type: 'frequency' },
    { adverb: 'beautifully', type: 'manner' },
    { adverb: 'soon', type: 'time' },
    { adverb: 'outside', type: 'place' },
    { adverb: 'rarely', type: 'frequency' },
    { adverb: 'carefully', type: 'manner' },
    { adverb: 'now', type: 'time' },
    { adverb: 'upstairs', type: 'place' },
    { adverb: 'often', type: 'frequency' }
  ]);

  const handleDragStart = (e, adverbObj) => {
    e.dataTransfer.setData('application/json', JSON.stringify(adverbObj));
  };

  const handleDrop = (e, category) => {
    e.preventDefault();
    const adverbObj = JSON.parse(e.dataTransfer.getData('application/json'));
    
    // Remove from available adverbs
    setAvailableAdverbs(prev => prev.filter(a => a.adverb !== adverbObj.adverb));
    
    // Add to appropriate category
    if (category === 'manner') {
      setMannerCategory(prev => [...prev, adverbObj]);
    } else if (category === 'time') {
      setTimeCategory(prev => [...prev, adverbObj]);
    } else if (category === 'place') {
      setPlaceCategory(prev => [...prev, adverbObj]);
    } else if (category === 'frequency') {
      setFrequencyCategory(prev => [...prev, adverbObj]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropToAvailable = (e) => {
    e.preventDefault();
    const adverbObj = JSON.parse(e.dataTransfer.getData('application/json'));
    
    // Remove from categories
    setMannerCategory(prev => prev.filter(a => a.adverb !== adverbObj.adverb));
    setTimeCategory(prev => prev.filter(a => a.adverb !== adverbObj.adverb));
    setPlaceCategory(prev => prev.filter(a => a.adverb !== adverbObj.adverb));
    setFrequencyCategory(prev => prev.filter(a => a.adverb !== adverbObj.adverb));
    
    // Add back to available
    setAvailableAdverbs(prev => [...prev, adverbObj]);
  };

  const checkAnswers = () => {
    let correct = 0;
    let total = mannerCategory.length + timeCategory.length + placeCategory.length + frequencyCategory.length;
    
    mannerCategory.forEach(item => {
      if (item.type === 'manner') correct++;
    });
    
    timeCategory.forEach(item => {
      if (item.type === 'time') correct++;
    });

    placeCategory.forEach(item => {
      if (item.type === 'place') correct++;
    });

    frequencyCategory.forEach(item => {
      if (item.type === 'frequency') correct++;
    });

    if (correct === total && total === 12) {
      alert(`🎉 Perfect! You correctly sorted all ${correct} adverbs!`);
    } else {
      alert(`You got ${correct} out of ${total} correct. Try again!`);
    }
  };

  const resetGame = () => {
    setMannerCategory([]);
    setTimeCategory([]);
    setPlaceCategory([]);
    setFrequencyCategory([]);
    setAvailableAdverbs([
      { adverb: 'quickly', type: 'manner' },
      { adverb: 'yesterday', type: 'time' },
      { adverb: 'here', type: 'place' },
      { adverb: 'always', type: 'frequency' },
      { adverb: 'beautifully', type: 'manner' },
      { adverb: 'soon', type: 'time' },
      { adverb: 'outside', type: 'place' },
      { adverb: 'rarely', type: 'frequency' },
      { adverb: 'carefully', type: 'manner' },
      { adverb: 'now', type: 'time' },
      { adverb: 'upstairs', type: 'place' },
      { adverb: 'often', type: 'frequency' }
    ]);
  };

  const renderAdverb = (item, index, source) => (
    <div
      key={`${item.adverb}-${index}-${source}`}
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
      {item.adverb}
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
        🎨 Practice: Sort Adverbs by Type
      </h2>

      <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
        Drag each adverb to its correct category:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        {/* Manner Category */}
        <div 
          style={{ 
            padding: '1rem', 
            backgroundColor: '#e3f2fd', 
            borderRadius: '8px',
            border: '2px dashed #1976d2',
            minHeight: '120px'
          }}
          onDrop={(e) => handleDrop(e, 'manner')}
          onDragOver={handleDragOver}
        >
          <h4 style={{ color: '#1976d2', marginBottom: '0.5rem' }}>🏃‍♂️ Manner (How?)</h4>
          <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>
            describes how actions happen
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {mannerCategory.map((item, index) => renderAdverb(item, index, 'manner'))}
          </div>
        </div>

        {/* Time Category */}
        <div 
          style={{ 
            padding: '1rem', 
            backgroundColor: '#e8f5e9', 
            borderRadius: '8px',
            border: '2px dashed #388e3c',
            minHeight: '120px'
          }}
          onDrop={(e) => handleDrop(e, 'time')}
          onDragOver={handleDragOver}
        >
          <h4 style={{ color: '#388e3c', marginBottom: '0.5rem' }}>⏰ Time (When?)</h4>
          <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>
            tells when actions happen
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {timeCategory.map((item, index) => renderAdverb(item, index, 'time'))}
          </div>
        </div>

        {/* Place Category */}
        <div 
          style={{ 
            padding: '1rem', 
            backgroundColor: '#fff3e0', 
            borderRadius: '8px',
            border: '2px dashed #f57c00',
            minHeight: '120px'
          }}
          onDrop={(e) => handleDrop(e, 'place')}
          onDragOver={handleDragOver}
        >
          <h4 style={{ color: '#f57c00', marginBottom: '0.5rem' }}>📍 Place (Where?)</h4>
          <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>
            tells where actions happen
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {placeCategory.map((item, index) => renderAdverb(item, index, 'place'))}
          </div>
        </div>

        {/* Frequency Category */}
        <div 
          style={{ 
            padding: '1rem', 
            backgroundColor: '#f3e5f5', 
            borderRadius: '8px',
            border: '2px dashed #7b1fa2',
            minHeight: '120px'
          }}
          onDrop={(e) => handleDrop(e, 'frequency')}
          onDragOver={handleDragOver}
        >
          <h4 style={{ color: '#7b1fa2', marginBottom: '0.5rem' }}>🔄 Frequency (How often?)</h4>
          <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>
            tells how often actions happen
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {frequencyCategory.map((item, index) => renderAdverb(item, index, 'frequency'))}
          </div>
        </div>
      </div>

      {/* Available adverbs */}
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
          Available Adverbs:
        </strong>
        {availableAdverbs.map((item, index) => renderAdverb(item, index, 'available'))}
      </div>

      {/* Control Buttons */}
      <div style={{ textAlign: 'center', marginTop: '1rem', gap: '1rem', display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={checkAnswers}
          disabled={availableAdverbs.length > 0}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: availableAdverbs.length === 0 ? '#28a745' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: availableAdverbs.length === 0 ? 'pointer' : 'not-allowed',
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

export default AdverbTypeSorting;
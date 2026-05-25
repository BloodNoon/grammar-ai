import { Box, Button, Heading, Text } from '@chakra-ui/react';
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
    <Box
      key={`${item.adverb}-${index}-${source}`}
      draggable
      onDragStart={(e) => handleDragStart(e, item)}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: 'gray.500',
        color: 'white',
        borderRadius: '4px',
        cursor: 'grab',
        userSelect: 'none',
        fontSize: '0.9rem',
        margin: '0.25rem'
      }}
    >
      {item.adverb}
    </Box>
  );

  return (
    <Box
      sx={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: 'gray.50',
        borderRadius: '10px',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Heading as="h2" size="lg" sx={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '1rem', color: 'gray.700' }}>
        🎨 Practice: Sort Adverbs by Type
      </Heading>

      <Text style={{ fontSize: '1rem', marginBottom: '1rem' }}>
        Drag each adverb to its correct category:
      </Text>

      <Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        {/* Manner Category */}
        <Box 
          sx={{ 
            padding: '1rem', 
            backgroundColor: 'blue.50', 
            borderRadius: '8px',
            border: '2px dashed blue.700',
            minHeight: '120px'
          }}
          onDrop={(e) => handleDrop(e, 'manner')}
          onDragOver={handleDragOver}
        >
          <Heading as="h4" size="sm" sx={{ color: 'blue.700', marginBottom: '0.5rem' }}>🏃‍♂️ Manner (How?)</Heading>
          <Text sx={{ fontSize: '0.8rem', color: 'gray.500', marginBottom: '0.5rem' }}>
            describes how actions happen
          </Text>
          <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
            {mannerCategory.map((item, index) => renderAdverb(item, index, 'manner'))}
          </Box>
        </Box>

        {/* Time Category */}
        <Box 
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
          <Heading as="h4" size="sm" style={{ color: '#388e3c', marginBottom: '0.5rem' }}>⏰ Time (When?)</Heading>
          <Text sx={{ fontSize: '0.8rem', color: 'gray.500', marginBottom: '0.5rem' }}>
            tells when actions happen
          </Text>
          <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
            {timeCategory.map((item, index) => renderAdverb(item, index, 'time'))}
          </Box>
        </Box>

        {/* Place Category */}
        <Box 
          sx={{ 
            padding: '1rem', 
            backgroundColor: 'orange.50', 
            borderRadius: '8px',
            border: '2px dashed #f57c00',
            minHeight: '120px'
          }}
          onDrop={(e) => handleDrop(e, 'place')}
          onDragOver={handleDragOver}
        >
          <Heading as="h4" size="sm" style={{ color: '#f57c00', marginBottom: '0.5rem' }}>📍 Place (Where?)</Heading>
          <Text sx={{ fontSize: '0.8rem', color: 'gray.500', marginBottom: '0.5rem' }}>
            tells where actions happen
          </Text>
          <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
            {placeCategory.map((item, index) => renderAdverb(item, index, 'place'))}
          </Box>
        </Box>

        {/* Frequency Category */}
        <Box 
          sx={{ 
            padding: '1rem', 
            backgroundColor: 'purple.50', 
            borderRadius: '8px',
            border: '2px dashed #7b1fa2',
            minHeight: '120px'
          }}
          onDrop={(e) => handleDrop(e, 'frequency')}
          onDragOver={handleDragOver}
        >
          <Heading as="h4" size="sm" style={{ color: '#7b1fa2', marginBottom: '0.5rem' }}>🔄 Frequency (How often?)</Heading>
          <Text sx={{ fontSize: '0.8rem', color: 'gray.500', marginBottom: '0.5rem' }}>
            tells how often actions happen
          </Text>
          <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
            {frequencyCategory.map((item, index) => renderAdverb(item, index, 'frequency'))}
          </Box>
        </Box>
      </Box>

      {/* Available adverbs */}
      <Box 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '0.5rem', 
          justifyContent: 'center',
          padding: '1rem',
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid gray.200',
          minHeight: '80px'
        }}
        onDrop={handleDropToAvailable}
        onDragOver={handleDragOver}
      >
        <strong style={{ width: '100%', textAlign: 'center', marginBottom: '0.5rem' }}>
          Available Adverbs:
        </strong>
        {availableAdverbs.map((item, index) => renderAdverb(item, index, 'available'))}
      </Box>

      {/* Control Buttons */}
      <Box style={{ textAlign: 'center', marginTop: '1rem', gap: '1rem', display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={checkAnswers}
          disabled={availableAdverbs.length > 0}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: availableAdverbs.length === 0 ? 'green.500' : 'gray.300',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: availableAdverbs.length === 0 ? 'pointer' : 'not-allowed',
            fontWeight: 'bold'
          }}
        >
          Check Answers
        </Button>
        
        <Button
          onClick={resetGame}
          sx={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'gray.500',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default AdverbTypeSorting;
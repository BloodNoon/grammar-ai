import { Box, Button, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const AdjectiveSortingGame = () => {
  const [opinionCategory, setOpinionCategory] = useState([]);
  const [colorCategory, setColorCategory] = useState([]);
  const [sizeCategory, setSizeCategory] = useState([]);
  const [availableAdjectives, setAvailableAdjectives] = useState([
    { adjective: 'beautiful', type: 'opinion' },
    { adjective: 'red', type: 'color' },
    { adjective: 'large', type: 'size' },
    { adjective: 'ugly', type: 'opinion' },
    { adjective: 'blue', type: 'color' },
    { adjective: 'tiny', type: 'size' },
    { adjective: 'wonderful', type: 'opinion' },
    { adjective: 'green', type: 'color' },
    { adjective: 'huge', type: 'size' }
  ]);

  const handleDragStart = (e, adjectiveObj) => {
    e.dataTransfer.setData('application/json', JSON.stringify(adjectiveObj));
  };

  const handleDrop = (e, category) => {
    e.preventDefault();
    const adjectiveObj = JSON.parse(e.dataTransfer.getData('application/json'));
    
    // Remove from available adjectives
    setAvailableAdjectives(prev => prev.filter(a => a.adjective !== adjectiveObj.adjective));
    
    // Add to appropriate category
    if (category === 'opinion') {
      setOpinionCategory(prev => [...prev, adjectiveObj]);
    } else if (category === 'color') {
      setColorCategory(prev => [...prev, adjectiveObj]);
    } else if (category === 'size') {
      setSizeCategory(prev => [...prev, adjectiveObj]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropToAvailable = (e) => {
    e.preventDefault();
    const adjectiveObj = JSON.parse(e.dataTransfer.getData('application/json'));
    
    // Remove from categories
    setOpinionCategory(prev => prev.filter(a => a.adjective !== adjectiveObj.adjective));
    setColorCategory(prev => prev.filter(a => a.adjective !== adjectiveObj.adjective));
    setSizeCategory(prev => prev.filter(a => a.adjective !== adjectiveObj.adjective));
    
    // Add back to available
    setAvailableAdjectives(prev => [...prev, adjectiveObj]);
  };

  const checkAnswers = () => {
    let correct = 0;
    let total = opinionCategory.length + colorCategory.length + sizeCategory.length;
    
    opinionCategory.forEach(item => {
      if (item.type === 'opinion') correct++;
    });
    
    colorCategory.forEach(item => {
      if (item.type === 'color') correct++;
    });

    sizeCategory.forEach(item => {
      if (item.type === 'size') correct++;
    });

    if (correct === total && total === 9) {
      alert(`🎉 Perfect! You correctly sorted all ${correct} adjectives!`);
    } else {
      alert(`You got ${correct} out of ${total} correct. Try again!`);
    }
  };

  const resetGame = () => {
    setOpinionCategory([]);
    setColorCategory([]);
    setSizeCategory([]);
    setAvailableAdjectives([
      { adjective: 'beautiful', type: 'opinion' },
      { adjective: 'red', type: 'color' },
      { adjective: 'large', type: 'size' },
      { adjective: 'ugly', type: 'opinion' },
      { adjective: 'blue', type: 'color' },
      { adjective: 'tiny', type: 'size' },
      { adjective: 'wonderful', type: 'opinion' },
      { adjective: 'green', type: 'color' },
      { adjective: 'huge', type: 'size' }
    ]);
  };

  const renderAdjective = (item, index, source) => (
    <Box
      key={`${item.adjective}-${index}-${source}`}
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
      {item.adjective}
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
        🎨 Practice: Sort Adjectives by Type
      </Heading>

      <Text style={{ fontSize: '1rem', marginBottom: '1rem' }}>
        Drag each adjective to its correct category:
      </Text>

      <Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        {/* Opinion Category */}
        <Box 
          sx={{ 
            padding: '1rem', 
            backgroundColor: 'blue.50', 
            borderRadius: '8px',
            border: '2px dashed blue.700',
            minHeight: '120px'
          }}
          onDrop={(e) => handleDrop(e, 'opinion')}
          onDragOver={handleDragOver}
        >
          <Heading as="h4" size="sm" sx={{ color: 'blue.700', marginBottom: '0.5rem' }}>💭 Opinion</Heading>
          <Text sx={{ fontSize: '0.8rem', color: 'gray.500', marginBottom: '0.5rem' }}>
            subjective descriptions
          </Text>
          <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
            {opinionCategory.map((item, index) => renderAdjective(item, index, 'opinion'))}
          </Box>
        </Box>

        {/* Color Category */}
        <Box 
          style={{ 
            padding: '1rem', 
            backgroundColor: '#e8f5e9', 
            borderRadius: '8px',
            border: '2px dashed #388e3c',
            minHeight: '120px'
          }}
          onDrop={(e) => handleDrop(e, 'color')}
          onDragOver={handleDragOver}
        >
          <Heading as="h4" size="sm" style={{ color: '#388e3c', marginBottom: '0.5rem' }}>🎨 Color</Heading>
          <Text sx={{ fontSize: '0.8rem', color: 'gray.500', marginBottom: '0.5rem' }}>
            what color is it?
          </Text>
          <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
            {colorCategory.map((item, index) => renderAdjective(item, index, 'color'))}
          </Box>
        </Box>

        {/* Size Category */}
        <Box 
          sx={{ 
            padding: '1rem', 
            backgroundColor: 'orange.50', 
            borderRadius: '8px',
            border: '2px dashed #f57c00',
            minHeight: '120px'
          }}
          onDrop={(e) => handleDrop(e, 'size')}
          onDragOver={handleDragOver}
        >
          <Heading as="h4" size="sm" style={{ color: '#f57c00', marginBottom: '0.5rem' }}>📏 Size</Heading>
          <Text sx={{ fontSize: '0.8rem', color: 'gray.500', marginBottom: '0.5rem' }}>
            how big or small?
          </Text>
          <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
            {sizeCategory.map((item, index) => renderAdjective(item, index, 'size'))}
          </Box>
        </Box>
      </Box>

      {/* Available adjectives */}
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
          Available Adjectives:
        </strong>
        {availableAdjectives.map((item, index) => renderAdjective(item, index, 'available'))}
      </Box>

      {/* Control Buttons */}
      <Box style={{ textAlign: 'center', marginTop: '1rem', gap: '1rem', display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={checkAnswers}
          disabled={availableAdjectives.length > 0}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: availableAdjectives.length === 0 ? 'green.500' : 'gray.300',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: availableAdjectives.length === 0 ? 'pointer' : 'not-allowed',
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

export default AdjectiveSortingGame;
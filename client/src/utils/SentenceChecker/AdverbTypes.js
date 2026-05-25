import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const AdverbTypes = () => {
  const adverbTypes = [
    {
      type: 'Manner',
      description: 'How something happens',
      examples: ['quickly', 'gently', 'loudly', 'carefully', 'beautifully'],
      color: 'blue.50',
      borderColor: 'blue.700',
      textColor: 'blue.800'
    },
    {
      type: 'Time',
      description: 'When something happens',
      examples: ['yesterday', 'soon', 'now', 'later', 'always'],
      color: '#e8f5e9',
      borderColor: '#388e3c',
      textColor: '#2e7d32'
    },
    {
      type: 'Place',
      description: 'Where something happens',
      examples: ['here', 'outside', 'upstairs', 'everywhere', 'nearby'],
      color: 'orange.50',
      borderColor: '#f57c00',
      textColor: '#ef6c00'
    },
    {
      type: 'Frequency',
      description: 'How often something happens',
      examples: ['always', 'often', 'rarely', 'sometimes', 'never'],
      color: 'purple.50',
      borderColor: '#7b1fa2',
      textColor: '#6a1b9a'
    },
    {
      type: 'Degree',
      description: 'To what extent something happens',
      examples: ['very', 'completely', 'almost', 'quite', 'extremely'],
      color: 'red.50',
      borderColor: '#c62828',
      textColor: '#c62828'
    }
  ];

  return (
    <Box style={{
      backgroundColor: 'white8e1',
      padding: '2rem',
      borderRadius: '10px',
      marginBottom: '2rem',
      border: '2px solid yellow.400'
    }}>
      <Heading as="h3" size="md" style={{ color: '#e65100', marginBottom: '1rem' }}>⚡ 3. Types of Adverbs</Heading>
      <Text style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
        Adverbs can be grouped into different categories based on what they describe:
      </Text>
      
      <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {adverbTypes.map((type, index) => (
          <Box key={index} style={{
            backgroundColor: type.color,
            padding: '1.5rem',
            borderRadius: '8px',
            border: `2px solid ${type.borderColor}`
          }}>
            <Box style={{ fontWeight: 'bold', color: type.textColor, marginBottom: '0.5rem', fontSize: '1.1rem' }}>
              {type.type}
            </Box>
            <Box sx={{ fontSize: '0.9rem', color: 'gray.500', marginBottom: '1rem', fontStyle: 'italic' }}>
              {type.description}
            </Box>
            <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {type.examples.map((example, i) => (
                <Text as="span" key={i} style={{
                  backgroundColor: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  border: `1px solid ${type.borderColor}`,
                  color: type.textColor,
                  fontWeight: '500'
                }}>
                  {example}
                </Text>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
      
      <Box style={{
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid yellow.400'
      }}>
        <Heading as="h4" size="sm" style={{ color: '#e65100', marginBottom: '0.5rem' }}>💡 Quick Tip:</Heading>
        <Text style={{ fontSize: '0.95rem', color: '#555', lineHeight: '1.5', margin: 0 }}>
          Many adverbs end in -ly (quickly, beautifully), but not all! Words like "fast," "well," "soon," and "here" 
          are also adverbs. The key is understanding what they modify in the sentence.
        </Text>
      </Box>
    </Box>
  );
};

export default AdverbTypes;
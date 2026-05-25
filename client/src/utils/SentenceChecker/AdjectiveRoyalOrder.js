import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const AdjectiveRoyalOrder = () => {
  const adjectiveOrder = [
    { order: '1', type: 'Determiner', examples: 'a, an, the, my, three, some' },
    { order: '2', type: 'Quantity or number', examples: 'two, several, many' },
    { order: '3', type: 'Opinion', examples: 'beautiful, delicious, strange' },
    { order: '4', type: 'Size', examples: 'small, huge, tall' },
    { order: '5', type: 'Age', examples: 'young, ancient, modern' },
    { order: '6', type: 'Shape', examples: 'round, square, oval' },
    { order: '7', type: 'Color', examples: 'red, blue, green' },
    { order: '8', type: 'Origin', examples: 'French, American, African' },
    { order: '9', type: 'Material', examples: 'wooden, silk, metal' },
    { order: '10', type: 'Purpose', examples: 'sleeping bag, racing car' }
  ];

  return (
    <Box sx={{
      backgroundColor: 'orange.50',
      padding: '2rem',
      borderRadius: '10px',
      marginBottom: '2rem',
      border: '2px solid #ff9800'
    }}>
      <Heading as="h3" size="md" style={{ color: '#e65100', marginBottom: '1rem' }}>👑 The Royal Order of Adjectives</Heading>
      <Text style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
        When using multiple adjectives before a noun in English, they usually follow this order:
      </Text>
      
      <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {adjectiveOrder.map((item) => (
          <Box key={item.order} style={{
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid gray.200'
          }}>
            <Box style={{ fontWeight: 'bold', color: '#e65100', marginBottom: '0.5rem' }}>
              {item.order}. {item.type}
            </Box>
            <Box sx={{ fontSize: '0.9rem', color: 'gray.500', fontStyle: 'italic' }}>
              {item.examples}
            </Box>
          </Box>
        ))}
      </Box>
      
      <Box style={{
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid gray.200'
      }}>
        <Heading as="h4" size="sm" style={{ color: '#e65100', marginBottom: '0.5rem' }}>Perfect Example:</Heading>
        <Text sx={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'gray.700' }}>
          "My two beautiful small old round green Italian wooden racing chairs"
        </Text>
        <Text sx={{ fontSize: '0.9rem', color: 'gray.500', marginTop: '0.5rem' }}>
          This follows the exact order: Determiner → Quantity → Opinion → Size → Age → Shape → Color → Origin → Material → Purpose → Noun
        </Text>
      </Box>
    </Box>
  );
};

export default AdjectiveRoyalOrder;
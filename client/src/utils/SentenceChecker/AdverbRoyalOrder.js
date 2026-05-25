import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const AdverbRoyalOrder = () => {
  const adverbOrder = [
    { order: '1', type: 'Manner', description: 'How?', examples: 'hard, carefully, quietly', color: 'blue.50' },
    { order: '2', type: 'Place', description: 'Where?', examples: 'in the library, outside, here', color: '#e8f5e9' },
    { order: '3', type: 'Frequency', description: 'How often?', examples: 'every day, always, rarely', color: 'orange.50' },
    { order: '4', type: 'Time', description: 'When?', examples: 'last year, yesterday, soon', color: 'purple.50' },
    { order: '5', type: 'Purpose', description: 'Why?', examples: 'to improve, for success', color: 'red.50' }
  ];

  return (
    <Box style={{
      backgroundColor: '#e8f5e9',
      padding: '2rem',
      borderRadius: '10px',
      marginBottom: '2rem',
      border: '2px solid #4caf50'
    }}>
      <Heading as="h3" size="md" style={{ color: '#2e7d32', marginBottom: '1rem' }}>👑 4. The Royal Order of Adverbs</Heading>
      <Text style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
        When multiple adverbs appear together, they tend to follow this sequence:
      </Text>
      
      <Box style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {adverbOrder.map((item, index) => (
          <Box key={item.order} style={{
            backgroundColor: item.color,
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: '1px solid gray.200',
            textAlign: 'center',
            minWidth: '120px'
          }}>
            <Box style={{ fontWeight: 'bold', color: '#2e7d32', marginBottom: '0.25rem' }}>
              {item.order}. {item.type}
            </Box>
            <Box sx={{ fontSize: '0.8rem', color: 'gray.500', fontStyle: 'italic' }}>
              {item.description}
            </Box>
          </Box>
        ))}
      </Box>

      <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {adverbOrder.map((item) => (
          <Box key={item.order} style={{
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid gray.200'
          }}>
            <Box style={{ fontWeight: 'bold', color: '#2e7d32', marginBottom: '0.5rem' }}>
              {item.order}. {item.type}
            </Box>
            <Box sx={{ fontSize: '0.9rem', color: 'gray.500', fontStyle: 'italic' }}>
              {item.examples}
            </Box>
          </Box>
        ))}
      </Box>
      
      <Box style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '2px solid #4caf50'
      }}>
        <Heading as="h4" size="sm" style={{ color: '#2e7d32', marginBottom: '0.75rem' }}>Perfect Example:</Heading>
        <Text sx={{ fontSize: '1.2rem', fontStyle: 'italic', color: 'gray.700', marginBottom: '0.75rem' }}>
          "He worked <Text as="span" sx={{ color: 'blue.700', fontWeight: 'bold' }}>hard</Text> <Text as="span" style={{ color: '#388e3c', fontWeight: 'bold' }}>in the library</Text> <Text as="span" style={{ color: '#f57c00', fontWeight: 'bold' }}>every day</Text> <Text as="span" style={{ color: '#7b1fa2', fontWeight: 'bold' }}>last year</Text> <Text as="span" style={{ color: '#c62828', fontWeight: 'bold' }}>to improve his grades</Text>."
        </Text>
        <Box sx={{ fontSize: '0.9rem', color: 'gray.500', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <Text as="span"><strong style={{ color: 'blue.700' }}>Manner:</strong> hard</Text>
          <Text as="span"><strong style={{ color: '#388e3c' }}>Place:</strong> in the library</Text>
          <Text as="span"><strong style={{ color: '#f57c00' }}>Frequency:</strong> every day</Text>
          <Text as="span"><strong style={{ color: '#7b1fa2' }}>Time:</strong> last year</Text>
          <Text as="span"><strong style={{ color: '#c62828' }}>Purpose:</strong> to improve his grades</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default AdverbRoyalOrder;
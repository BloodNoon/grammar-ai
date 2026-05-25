import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const AdverbForms = () => {
  const lyAdverbs = [
    { base: 'slow', adverb: 'slowly', example: 'She walks slowly.' },
    { base: 'happy', adverb: 'happily', example: 'He smiled happily.' },
    { base: 'clear', adverb: 'clearly', example: 'She spoke clearly.' },
    { base: 'careful', adverb: 'carefully', example: 'Drive carefully!' },
    { base: 'quick', adverb: 'quickly', example: 'Run quickly!' }
  ];

  const withoutLyAdverbs = [
    { word: 'fast', type: 'manner', example: 'He runs fast.' },
    { word: 'well', type: 'manner', example: 'She sings well.' },
    { word: 'soon', type: 'time', example: 'We will leave soon.' },
    { word: 'here', type: 'place', example: 'Come here!' },
    { word: 'very', type: 'degree', example: 'It\'s very cold.' }
  ];

  const adverbPhrases = [
    { phrase: 'in the morning', type: 'time', example: 'I exercise in the morning.' },
    { phrase: 'with great care', type: 'manner', example: 'Handle it with great care.' },
    { phrase: 'to a large extent', type: 'degree', example: 'The plan succeeded to a large extent.' },
    { phrase: 'once in a while', type: 'frequency', example: 'We visit once in a while.' },
    { phrase: 'in the garden', type: 'place', example: 'Children play in the garden.' }
  ];

  return (
    <Box sx={{
      backgroundColor: 'purple.50',
      padding: '2rem',
      borderRadius: '10px',
      marginBottom: '2rem',
      border: '2px solid #9c27b0'
    }}>
      <Heading as="h3" size="md" style={{ color: '#7b1fa2', marginBottom: '1.5rem' }}>📝 5. Adverbs with -ly and without</Heading>
      
      {/* With -ly Section */}
      <Box style={{ marginBottom: '2rem' }}>
        <Heading as="h4" size="sm" style={{ color: '#7b1fa2', marginBottom: '1rem' }}>With -ly: Most Common Form</Heading>
        <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {lyAdverbs.map((item, index) => (
            <Box key={index} style={{
              backgroundColor: 'white',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #ce93d8'
            }}>
              <Box style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                <Text as="span" sx={{ color: 'gray.500' }}>{item.base}</Text> → <Text as="span" style={{ color: '#7b1fa2' }}>{item.adverb}</Text>
              </Box>
              <Box style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#555' }}>
                {item.example}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Without -ly Section */}
      <Box style={{ marginBottom: '2rem' }}>
        <Heading as="h4" size="sm" style={{ color: '#7b1fa2', marginBottom: '1rem' }}>Without -ly: Special Cases</Heading>
        <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {withoutLyAdverbs.map((item, index) => (
            <Box key={index} style={{
              backgroundColor: 'white',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #ce93d8'
            }}>
              <Box style={{ fontWeight: 'bold', color: '#7b1fa2', marginBottom: '0.25rem' }}>
                {item.word}
              </Box>
              <Box sx={{ fontSize: '0.8rem', color: 'gray.400', marginBottom: '0.5rem' }}>
                ({item.type})
              </Box>
              <Box style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#555' }}>
                {item.example}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Adverb Phrases Section */}
      <Box>
        <Heading as="h4" size="sm" style={{ color: '#7b1fa2', marginBottom: '1rem' }}>6. Phrases that work as adverbs</Heading>
        <Text sx={{ fontSize: '0.95rem', color: 'gray.500', marginBottom: '1rem' }}>
          Adverb phrases act like a single adverb but use multiple words:
        </Text>
        <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {adverbPhrases.map((item, index) => (
            <Box key={index} style={{
              backgroundColor: 'white',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #ce93d8'
            }}>
              <Box style={{ fontWeight: 'bold', color: '#7b1fa2', marginBottom: '0.25rem' }}>
                {item.phrase}
              </Box>
              <Box sx={{ fontSize: '0.8rem', color: 'gray.400', marginBottom: '0.5rem' }}>
                ({item.type})
              </Box>
              <Box style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#555' }}>
                {item.example}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box style={{
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #9c27b0'
      }}>
        <Heading as="h4" size="sm" style={{ color: '#7b1fa2', marginBottom: '0.5rem' }}>🎯 Remember:</Heading>
        <Text style={{ fontSize: '0.95rem', color: '#555', lineHeight: '1.5', margin: 0 }}>
          Not all words ending in -ly are adverbs (like "friendly" which is an adjective), 
          and not all adverbs end in -ly. Focus on what the word does in the sentence!
        </Text>
      </Box>
    </Box>
  );
};

export default AdverbForms;
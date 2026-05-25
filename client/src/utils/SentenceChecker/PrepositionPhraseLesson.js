import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const PrepositionPhraseLesson = () => {
  return (
    <Box
      style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: '#f0f8ff',
        borderRadius: '10px',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Heading as="h2" size="lg"
        sx={{
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: 'gray.700',
        }}
      >
        Learn the Lesson: What are Prepositional Phrases?
      </Heading>

      <Box style={{ textAlign: 'left', fontSize: '1.1rem', lineHeight: '1.8' }}>
        <Text><strong>Definition:</strong> A prepositional phrase = preposition + article/determiner + noun</Text>
        
        <Box style={{ margin: '1rem 0', padding: '1rem', backgroundColor: '#e8f4fd', borderRadius: '8px' }}>
          <Heading as="h4" size="sm" sx={{ color: 'blue.800', marginBottom: '0.5rem' }}>Examples of Prepositional Phrases:</Heading>
          <ul style={{ margin: '0.5rem 0' }}>
            <li><strong>in the house</strong> (preposition + article + noun)</li>
            <li><strong>on the table</strong> (preposition + article + noun)</li>
            <li><strong>under the bridge</strong> (preposition + article + noun)</li>
            <li><strong>after the movie</strong> (preposition + article + noun)</li>
            <li><strong>during the game</strong> (preposition + article + noun)</li>
          </ul>
        </Box>

        <Text><strong>How they work in sentences:</strong></Text>
        <Box sx={{ margin: '1rem 0', padding: '1rem', backgroundColor: 'orange.50', borderRadius: '8px' }}>
          <Text>• <strong>After the movie</strong>, we went home.</Text>
          <Text>• The cat sleeps <strong>on the couch</strong>.</Text>
          <Text>• <strong>During the storm</strong>, the power went out.</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default PrepositionPhraseLesson;
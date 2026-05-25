import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const AdverbSentenceStructures = () => {
  const sentenceStructures = [
    {
      pattern: '(Adverb,) Pronoun + (Adverb) Be Verb (Adverb) + Adjective (Adverb)',
      example: 'He is quickly happy.',
      breakdown: 'Adverb inside, after "Be Verb" — modifies "happy"',
      position: 'after verb'
    },
    {
      pattern: '(Adverb,) Article + Noun + (Adverb) Be Verb (Adverb) + Adjective (Adverb)',
      example: 'The dog is playfully happy.',
      breakdown: 'Adverb before adjective — shows manner of happiness',
      position: 'before adjective'
    },
    {
      pattern: '(Adverb,) Article + Adjective + Noun + (Adverb) Be Verb (Adverb) + Adjective (Adverb)',
      example: 'Quickly, the small dog is friendly.',
      breakdown: 'Adverb at sentence start — sets tone for entire action/state',
      position: 'sentence start'
    },
    {
      pattern: '(Adverb,) Pronoun + (Adverb) Verb (Adverb) + Preposition + Article + Adjective + Noun (Adverb)',
      example: 'She sings beautifully to the bright crowd.',
      breakdown: 'Adverb right after verb — describes "how" she sings',
      position: 'after verb'
    },
    {
      pattern: '(Adverb,) Article + Adjective + Noun + (Adverb) Verb (Adverb) + Article + Adjective + Noun (Adverb)',
      example: 'The young student writes carefully a difficult essay.',
      breakdown: 'Adverb between verb and object — emphasizes manner of action',
      position: 'between verb and object'
    },
    {
      pattern: '(Adverb,) Article + Adjective + Noun + Preposition + (Adverb) Verb (Adverb) + Article + Adjective + Noun + Preposition + Article + Adjective + Noun (Adverb)',
      example: 'The excited class in the noisy room slowly discusses a new project in the large hall.',
      breakdown: 'Adverb before main verb in a long sentence — keeps action deliberate',
      position: 'before main verb'
    },
    {
      pattern: '(Adverb,) Article + Adjective + Noun + (Adverb) Verb (Adverb) + Preposition + Article + Adjective + Noun + Article + Adjective + Noun (Adverb)',
      example: 'The clever fox jumps quickly over the lazy dog and the small cat.',
      breakdown: 'Adverb after verb — shows speed of action',
      position: 'after verb'
    }
  ];

  const getPositionColor = (position) => {
    const colors = {
      'sentence start': 'blue.50',
      'after verb': '#e8f5e9',
      'before adjective': 'orange.50',
      'between verb and object': 'purple.50',
      'before main verb': 'red.50'
    };
    return colors[position] || 'gray.50';
  };

  const getPositionBorder = (position) => {
    const borders = {
      'sentence start': 'blue.700',
      'after verb': '#388e3c',
      'before adjective': '#f57c00',
      'between verb and object': '#7b1fa2',
      'before main verb': '#c62828'
    };
    return borders[position] || 'gray.400';
  };

  return (
    <Box style={{
      backgroundColor: '#e8f4fd',
      padding: '2rem',
      borderRadius: '10px',
      marginBottom: '2rem',
      border: '1px solid #90caf9'
    }}>
      <Heading as="h3" size="md" sx={{ color: 'blue.800', marginBottom: '1.5rem' }}>🔄 Adverbs – Sentence Structures with Varied Placement</Heading>
      <Text sx={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem', color: 'gray.500' }}>
        <em>One adverb per sentence, in a different position each time</em>
      </Text>
      
      <Box style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {sentenceStructures.map((structure, index) => (
          <Box key={index} style={{
            backgroundColor: getPositionColor(structure.position),
            padding: '1.5rem',
            borderRadius: '8px',
            border: `2px solid ${getPositionBorder(structure.position)}`
          }}>
            {/* Pattern */}
            <Box sx={{ 
              fontWeight: 'bold', 
              color: 'gray.700', 
              marginBottom: '0.75rem',
              fontSize: '0.95rem',
              fontFamily: 'monospace'
            }}>
              {structure.pattern}
            </Box>
            
            {/* Example */}
            <Box sx={{ 
              fontSize: '1.1rem', 
              fontStyle: 'italic', 
              marginBottom: '0.75rem',
              color: 'gray.700',
              padding: '0.5rem',
              backgroundColor: 'white',
              borderRadius: '4px',
              border: '1px solid gray.200'
            }}>
              {structure.example}
            </Box>
            
            {/* Breakdown */}
            <Box style={{ 
              fontSize: '0.9rem', 
              color: '#555',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Text as="span" style={{
                backgroundColor: getPositionBorder(structure.position),
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {structure.position}
              </Text>
              {structure.breakdown}
            </Box>
          </Box>
        ))}
      </Box>
      
      <Box style={{
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #90caf9'
      }}>
        <Heading as="h4" size="sm" sx={{ color: 'blue.800', marginBottom: '0.5rem' }}>🎯 Placement Strategy:</Heading>
        <Text style={{ fontSize: '0.95rem', color: '#555', lineHeight: '1.5', margin: 0 }}>
          Adverbs are very flexible! They can move to different positions in a sentence to change emphasis. 
          The key is understanding what you want to emphasize and how the adverb sounds in each position.
        </Text>
      </Box>
    </Box>
  );
};

export default AdverbSentenceStructures;
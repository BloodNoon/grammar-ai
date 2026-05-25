import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const AdverbLesson = () => {
  const [selectedExample, setSelectedExample] = useState(null);

  const adverbExamples = [
    {
      sentence: "She sings beautifully.",
      breakdown: ["She (pronoun)", "sings (verb)", "beautifully (adverb - modifies verb)"],
      explanation: "The adverb 'beautifully' modifies the verb 'sings' to show HOW she sings."
    },
    {
      sentence: "The water is extremely cold.",
      breakdown: ["The (article)", "water (noun)", "is (verb)", "extremely (adverb)", "cold (adjective)"],
      explanation: "The adverb 'extremely' modifies the adjective 'cold' to show the DEGREE of coldness."
    },
    {
      sentence: "He ran very quickly.",
      breakdown: ["He (pronoun)", "ran (verb)", "very (adverb)", "quickly (adverb)"],
      explanation: "The adverb 'very' modifies another adverb 'quickly' to strengthen its meaning."
    },
    {
      sentence: "Yesterday, I finished my homework.",
      breakdown: ["Yesterday (adverb - time)", "I (pronoun)", "finished (verb)", "my (determiner)", "homework (noun)"],
      explanation: "The adverb 'yesterday' tells us WHEN the action happened."
    }
  ];

  return (
    <Box sx={{
      marginTop: '2rem',
      padding: '2rem',
      backgroundColor: 'gray.50',
      borderRadius: '10px',
      border: '1px solid gray.200'
    }}>
      {/* What is an Adverb? */}
      <Box style={{
        backgroundColor: '#f9f9f9',
        padding: '2rem',
        borderRadius: '10px',
        marginBottom: '2rem',
        border: '1px solid gray.200'
      }}>
        <Heading as="h3" size="md" sx={{ color: 'gray.700', marginBottom: '1rem' }}>1. What is an Adverb?</Heading>
        <Text style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
          An <strong>adverb</strong> is a word that modifies a <strong>verb, adjective, or another adverb</strong>. 
          It can describe <strong>how</strong>, <strong>when</strong>, <strong>where</strong>, <strong>how often</strong>, 
          or <strong>to what extent</strong> something happens.
        </Text>

        {/* What do Adverbs do? */}
        <Box style={{ marginTop: '1.5rem' }}>
          <Heading as="h4" size="sm" style={{ color: '#555', marginBottom: '1rem' }}>2. What do Adverbs do, and what do they do it to?</Heading>
          <Box style={{ display: 'grid', gap: '1rem' }}>
            <Box sx={{
              padding: '1rem',
              backgroundColor: 'blue.50',
              borderRadius: '8px',
              border: '1px solid #90caf9'
            }}>
              <strong style={{ color: 'blue.800' }}>To verbs:</strong> Show how an action happens
              <Box style={{ fontStyle: 'italic', marginTop: '0.5rem', color: '#555' }}>
                She sings <Text as="span" sx={{ color: 'blue.800', fontWeight: 'bold' }}>beautifully</Text>.
              </Box>
            </Box>
            
            <Box style={{
              padding: '1rem',
              backgroundColor: '#e8f5e9',
              borderRadius: '8px',
              border: '1px solid #a5d6a7'
            }}>
              <strong style={{ color: '#2e7d32' }}>To adjectives:</strong> Modify intensity
              <Box style={{ fontStyle: 'italic', marginTop: '0.5rem', color: '#555' }}>
                The water is <Text as="span" style={{ color: '#2e7d32', fontWeight: 'bold' }}>extremely</Text> cold.
              </Box>
            </Box>
            
            <Box sx={{
              padding: '1rem',
              backgroundColor: 'orange.50',
              borderRadius: '8px',
              border: '1px solid #ffcc02'
            }}>
              <strong style={{ color: '#ef6c00' }}>To other adverbs:</strong> Strengthen or weaken
              <Box style={{ fontStyle: 'italic', marginTop: '0.5rem', color: '#555' }}>
                He ran <Text as="span" style={{ color: '#ef6c00', fontWeight: 'bold' }}>very</Text> quickly.
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Interactive Examples */}
        <Box style={{ marginTop: '2rem' }}>
          <Heading as="h4" size="sm" style={{ color: '#555', marginBottom: '1rem' }}>Interactive Examples:</Heading>
          <Box style={{ display: 'grid', gap: '1rem' }}>
            {adverbExamples.map((example, index) => (
              <Box
                key={index}
                onClick={() => setSelectedExample(selectedExample === index ? null : index)}
                style={{
                  padding: '1rem',
                  backgroundColor: selectedExample === index ? 'blue.50' : 'white',
                  border: '1px solid gray.300',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <Box style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {example.sentence}
                </Box>
                {selectedExample === index && (
                  <Box>
                    <Box sx={{ fontSize: '0.9rem', color: 'gray.500', marginBottom: '0.5rem' }}>
                      Breakdown:
                    </Box>
                    <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                      {example.breakdown.map((item, i) => (
                        <li key={i} style={{ fontSize: '0.9rem', color: '#555' }}>{item}</li>
                      ))}
                    </ul>
                    <Box style={{ fontSize: '0.9rem', color: '#007acc', fontStyle: 'italic' }}>
                      {example.explanation}
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdverbLesson;
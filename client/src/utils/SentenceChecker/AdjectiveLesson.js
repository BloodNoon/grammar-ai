import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const AdjectiveLesson = () => {
  const [selectedExample, setSelectedExample] = useState(null);

  const adjectiveExamples = [
    {
      sentence: "The red apple",
      breakdown: ["The (article)", "red (adjective - color)", "apple (noun)"],
      explanation: "Describes the color of the apple"
    },
    {
      sentence: "A difficult question",
      breakdown: ["A (article)", "difficult (adjective - opinion)", "question (noun)"],
      explanation: "Describes the difficulty level of the question"
    },
    {
      sentence: "She is happy",
      breakdown: ["She (pronoun)", "is (verb)", "happy (adjective - emotion)"],
      explanation: "Describes her emotional state"
    },
    {
      sentence: "My two beautiful small old round green Italian wooden racing chairs",
      breakdown: [
        "My (determiner)",
        "two (quantity)",
        "beautiful (opinion)",
        "small (size)",
        "old (age)",
        "round (shape)",
        "green (color)",
        "Italian (origin)",
        "wooden (material)",
        "racing (purpose)",
        "chairs (noun)"
      ],
      explanation: "Example of the Royal Order of Adjectives - all adjectives are in the correct order!"
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
      {/* What is an Adjective? */}
      <Box style={{
        backgroundColor: '#f9f9f9',
        padding: '2rem',
        borderRadius: '10px',
        marginBottom: '2rem',
        border: '1px solid gray.200'
      }}>
        <Heading as="h3" size="md" sx={{ color: 'gray.700', marginBottom: '1rem' }}>What is an Adjective?</Heading>
        <Text style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
          An <strong>adjective</strong> is a word that describes, modifies, or gives more information about a <strong>noun</strong> or <strong>pronoun</strong>. 
          Adjectives help the reader visualize, feel, or understand something more precisely. Click on the video to the right to learn more
        </Text>
        <Box style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>

								</Box>

        {/* Examples Section */}
        <Box style={{ marginTop: '1.5rem' }}>
          <Heading as="h4" size="sm" style={{ color: '#555', marginBottom: '1rem' }}>Interactive Examples:</Heading>
          <Box style={{ display: 'grid', gap: '1rem' }}>
            {adjectiveExamples.map((example, index) => (
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

export default AdjectiveLesson;
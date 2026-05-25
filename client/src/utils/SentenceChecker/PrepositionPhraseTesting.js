import { Box, Button, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const PrepositionPhraseTesting = () => {
  const [answers, setAnswers] = useState(['', '', '']);

  const handleInputChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const checkPattern1 = (sentence) => {
    const trimmed = sentence.trim().toLowerCase();
    if (trimmed.includes(',') && trimmed.split(',').length === 2) {
      const [firstPart, secondPart] = trimmed.split(',');
      if (firstPart.trim().split(' ').length >= 3 && secondPart.trim().split(' ').length >= 5) {
        return '✅ Great! Your sentence follows the pattern!';
      } else {
        return '❌ Try again! Make sure to follow the pattern: Preposition + article + noun, + pronoun + verb + preposition + article + noun';
      }
    } else {
      return '❌ Remember to use a comma to separate the prepositional phrase!';
    }
  };

  const checkPattern2 = (sentence) => {
    const trimmed = sentence.trim().toLowerCase();
    if (trimmed.includes(',') && trimmed.split(',').length === 2) {
      const [firstPart, secondPart] = trimmed.split(',');
      if (firstPart.trim().split(' ').length >= 3 && secondPart.trim().split(' ').length >= 6) {
        return '✅ Excellent! Your sentence follows the pattern!';
      } else {
        return '❌ Try again! Make sure to follow the pattern: Preposition + article + noun, + Article + noun + verb + preposition + article + noun';
      }
    } else {
      return '❌ Remember to use a comma to separate the prepositional phrase!';
    }
  };

  const checkPattern3 = (sentence) => {
    const trimmed = sentence.trim().toLowerCase();
    if (trimmed.includes(',') && trimmed.split(',').length === 2) {
      const [firstPart, secondPart] = trimmed.split(',');
      if (firstPart.trim().split(' ').length >= 3 && secondPart.trim().split(' ').length >= 9) {
        return '✅ Outstanding! Your sentence follows the complex pattern!';
      } else {
        return '❌ Try again! This is the most complex pattern - make sure you have enough words in each part!';
      }
    } else {
      return '❌ Remember to use a comma to separate the prepositional phrase!';
    }
  };

  const patterns = [
    {
      title: "1. Preposition + article + noun, + pronoun + verb + preposition + article + noun",
      example: "After the game, I went to the store.",
      checker: checkPattern1
    },
    {
      title: "2. Preposition + article + noun, + Article + noun + verb + preposition + article + noun",
      example: "During the storm, the dog ran under the table.",
      checker: checkPattern2
    },
    {
      title: "3. Preposition + article + noun, + Article + noun + verb + preposition + article + noun + preposition + article + noun",
      example: "Before the party, the children ran through the yard into the house.",
      checker: checkPattern3
    }
  ];

  return (
    <Box
      sx={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: 'orange.50',
        borderRadius: '10px',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Heading as="h2" size="lg" sx={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '1rem', color: 'gray.700' }}>
        🏆 Testing for Triumph: Create Prepositional Phrase Sentences
      </Heading>

      <Text style={{ fontSize: '1rem', marginBottom: '1.5rem', textAlign: 'left' }}>
        Create sentences using these structures:
      </Text>

      {patterns.map((pattern, index) => (
        <Box key={index} style={{
          backgroundColor: 'white',
          border: '1px solid #eee',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          <Text style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.5rem', textAlign: 'left' }}>
            {pattern.title}
          </Text>
          <Text sx={{ fontSize: '0.9rem', color: 'gray.500', marginBottom: '0.5rem', fontStyle: 'italic', textAlign: 'left' }}>
            Example: "{pattern.example}"
          </Text>
          <Box style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="text"
              value={answers[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder="Type your sentence here..."
              style={{
                flex: 1,
                padding: '0.75rem',
                fontSize: '1rem',
                border: '1px solid gray.300',
                borderRadius: '4px'
              }}
            />
            <Button
              sx={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'green.500',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
              onClick={() => {
                const result = pattern.checker(answers[index]);
                alert(result);
              }}
            >
              Check
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default PrepositionPhraseTesting;
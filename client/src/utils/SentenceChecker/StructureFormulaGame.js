import { Box, Button, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import nlp from 'compromise';

const formulaData = [
  {
    formula:
      'Pronoun + verb + preposition + article + noun',
    color: 'blue.800',
    example: 'She walked to the store.',
    pattern: ['pronoun', 'verb', 'preposition', 'determiner', 'noun'],
  },
  {
    formula:
      'Article + noun + verb + preposition + article + noun',
    color: '#ef6c00',
    example: 'The dog ran through the yard.',
    pattern: ['determiner', 'noun', 'verb', 'preposition', 'determiner', 'noun'],
  },
  {
    formula:
      'Noun + verb + article + noun + preposition + noun',
    color: '#2e7d32',
    example: 'Mark gave the book to Sarah.',
    pattern: ['noun', 'verb', 'determiner', 'noun', 'preposition', 'noun'],
  },
  {
    formula:
      'Noun + verb + preposition + gerund + noun',
    color: '#8e24aa',
    example: 'They talked about eating lunch.',
    pattern: ['noun', 'verb', 'preposition', 'gerund', 'noun'],
  },
  {
    formula:
      'Preposition + article + noun + comma + noun + verb + article + noun',
    color: '#c62828',
    example: 'After the movie, Jack ate the pizza.',
    pattern: ['preposition', 'determiner', 'noun', 'comma', 'noun', 'verb', 'determiner', 'noun'],
  },
];

// Helper to tag words using compromise and return simplified tags
function tagWords(sentence) {
  const doc = nlp(sentence);
  const terms = doc.terms().json();

  const tagged = terms.map(term => {
    if (term.text === ',') return 'comma';
    if (term.tags.includes('Pronoun')) return 'pronoun';
    if (term.tags.includes('Verb')) return 'verb';
    if (term.tags.includes('Preposition')) return 'preposition';
    if (term.tags.includes('Determiner')) return 'determiner';
    if (term.tags.includes('Noun')) return 'noun';
    if (term.tags.includes('Gerund')) return 'gerund';
    return 'other';
  });

  return tagged;
}

const StructureFormulaGame = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [inputSentence, setInputSentence] = useState('');
  const [feedback, setFeedback] = useState(null);

  const checkStructure = () => {
    const tagged = tagWords(inputSentence);
    const expected = formulaData[currentQ].pattern;

    if (tagged.length !== expected.length) {
      setFeedback(`Sentence has ${tagged.length} words, expected ${expected.length}. Try again.`);
      return;
    }

    for (let i = 0; i < expected.length; i++) {
      if (tagged[i] !== expected[i]) {
        setFeedback(
          `Mismatch at word ${i + 1}: expected "${expected[i]}", got "${tagged[i]}".`
        );
        return;
      }
    }

    setFeedback('✅ Correct structure! Well done.');
  };

  const nextQuestion = () => {
    setFeedback(null);
    setInputSentence('');
    setCurrentQ((prev) => (prev < formulaData.length - 1 ? prev + 1 : prev));
  };

  const prevQuestion = () => {
    setFeedback(null);
    setInputSentence('');
    setCurrentQ((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <Box
      style={{
        marginTop: '3rem',
        padding: '1.5rem',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'left',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <Heading as="h2" size="lg" style={{ color: formulaData[currentQ].color, marginBottom: '0.5rem' }}>
        Question {currentQ + 1} of {formulaData.length}: Structure Formula
      </Heading>
      <Text style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{formulaData[currentQ].formula}</Text>
      <Text>
        Example: <em>{formulaData[currentQ].example}</em>
      </Text>

      <label htmlFor="sentenceInput" style={{ display: 'block', marginTop: '1rem', fontWeight: 'bold' }}>
        Enter a sentence matching the formula:
      </label>
      <textarea
        id="sentenceInput"
        value={inputSentence}
        onChange={(e) => setInputSentence(e.target.value)}
        rows={3}
        placeholder="Type your sentence here..."
        style={{
          width: '100%',
          padding: '0.5rem',
          fontSize: '1rem',
          borderRadius: '6px',
          border: '1px solid gray.300',
          marginTop: '0.5rem',
          resize: 'vertical',
        }}
      />

      <Button
        onClick={checkStructure}
        sx={{
          marginTop: '1rem',
          padding: '0.6rem 1.2rem',
          backgroundColor: 'blue.500',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Check
      </Button>

      {feedback && (
        <Text
          style={{
            marginTop: '1rem',
            fontWeight: 'bold',
            color: feedback.startsWith('✅') ? 'green' : 'red',
          }}
        >
          {feedback}
        </Text>
      )}

      <Box style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
        <Button
          onClick={prevQuestion}
          disabled={currentQ === 0}
          sx={{
            padding: '0.5rem 1rem',
            backgroundColor: currentQ === 0 ? 'gray.300' : 'blue.500',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: currentQ === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          Previous
        </Button>

        <Button
          onClick={nextQuestion}
          disabled={currentQ === formulaData.length - 1}
          sx={{
            padding: '0.5rem 1rem',
            backgroundColor: currentQ === formulaData.length - 1 ? 'gray.300' : 'blue.500',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: currentQ === formulaData.length - 1 ? 'not-allowed' : 'pointer',
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default StructureFormulaGame;
import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, Text, Heading, Button, SimpleGrid, VStack } from '@chakra-ui/react';

const SortingGame = ({ question, onNext }) => {
  const [wordBank, setWordBank] = useState([]);
  const [categories, setCategories] = useState({});
  const [isCorrect, setIsCorrect] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const dragItem = useRef(null);

  useEffect(() => {
    // 1. Detect format: Is it the "Multiple-word" format or "Single-word" format?
    let initialWords = [];
    const initialCategories = {};

    if (question.options) {
      // Multi-category sorting (old format with options and answer arrays)
      question.options.forEach(opt => { initialCategories[opt] = []; });
      question.answer.forEach(ansString => {
        const [_, wordsStr] = ansString.split(': ');
        if (wordsStr) initialWords = [...initialWords, ...wordsStr.split(', ')];
      });
    } else if (question.word && question.category) {
      // Single word sorting (new format with word and category)
      initialWords = [question.word];

      // Create category pairs based on noun_type
      const categoryPairs = {
        'Concrete': ['Concrete', 'Abstract'],
        'Abstract': ['Concrete', 'Abstract'],
        'Common': ['Common', 'Proper'],
        'Proper': ['Common', 'Proper'],
        'Collective': ['Collective', 'Individual'],
        'Countable': ['Countable', 'Uncountable'],
        'Uncountable': ['Countable', 'Uncountable'],
        'Irregular': ['Irregular', 'Regular'],
        'Irregular Plural Possessive': ['Irregular Plural Possessive', 'Regular Possessive'],
        'Object Pronoun': ['Subject Pronoun', 'Object Pronoun'],
        'Subject Pronoun': ['Subject Pronoun', 'Object Pronoun'],
        'Possessive Pronoun': ['Possessive Pronoun', 'Personal Pronoun'],
        'Demonstrative': ['Demonstrative', 'Personal'],
        'Demonstrative (Far/Plural)': ['Demonstrative (Near)', 'Demonstrative (Far)'],
        'Demonstrative (Near/Singular)': ['Demonstrative (Near)', 'Demonstrative (Far)'],
        'Reflexive Pronoun': ['Reflexive Pronoun', 'Personal Pronoun'],
        'Vowel + Y Rule': ['Vowel + Y Rule', 'Consonant + Y Rule'],
        'f to ves': ['f to ves', 'Regular Plural']
      };

      // Get the category pair or default to the category + "Other"
      const categories = categoryPairs[question.category] || [question.category, 'Other'];
      categories.forEach(cat => { initialCategories[cat] = []; });
    }

    setWordBank(initialWords.sort(() => Math.random() - 0.5));
    setCategories(initialCategories);
    setIsCorrect(null);
    setAttempts(0);
  }, [question]);

  const handleDrop = (e, targetCategory) => {
    e.preventDefault();
    const { word, sourceCategory } = dragItem.current;
    if (sourceCategory === targetCategory) return;

    if (sourceCategory === 'bank') setWordBank(prev => prev.filter(w => w !== word));
    else setCategories(prev => ({ ...prev, [sourceCategory]: prev[sourceCategory].filter(w => w !== word) }));

    if (targetCategory === 'bank') setWordBank(prev => [...prev, word]);
    else setCategories(prev => ({ ...prev, [targetCategory]: [...prev[targetCategory], word] }));
    setIsCorrect(null);
  };

  const checkAnswers = () => {
    setAttempts(prev => prev + 1);
    let allCorrect = true;

    if (question.answer) {
      // Logic for Multi-category Answer check
      question.answer.forEach(ansString => {
        const [category, wordsStr] = ansString.split(': ');
        const correctWords = wordsStr.split(', ');
        const userWords = categories[category] || [];
        if (correctWords.length !== userWords.length || !correctWords.every(w => userWords.includes(w))) {
          allCorrect = false;
        }
      });
    } else {
      // Logic for Single-word Answer check
      if (!categories[question.category]?.includes(question.word)) {
        allCorrect = false;
      }
    }

    setIsCorrect(allCorrect);
  };

  return (
    <Box bg="white" p={8} borderRadius="2xl" borderWidth="4px" borderColor="#1A1A1A" boxShadow="8px 8px 0px #1A1A1A" w="100%">
      <Heading size="lg" mb={6} textAlign="center" color="#1A0933">
        {question.question_text || `Sort the word: ${question.word}`}
      </Heading>

      <Flex minH="100px" bg="gray.50" p={4} borderRadius="xl" mb={8} wrap="wrap" gap={4} justify="center" align="center" border="2px dashed #1A1A1A" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, 'bank')}>
        {wordBank.map((word) => (
          <Box key={word} draggable onDragStart={() => dragItem.current = { word, sourceCategory: 'bank' }} bg="#FFEA00" px={6} py={2} borderRadius="md" borderWidth="3px" borderColor="#1A1A1A" fontWeight="bold" cursor="grab" boxShadow="4px 4px(0px #1A1A1A)">{word}</Box>
        ))}
      </Flex>

      <SimpleGrid columns={[1, null, 2]} spacing={6} mb={8}>
        {Object.keys(categories).map(category => (
          <Box key={category} bg="gray.50" borderRadius="xl" borderWidth="3px" borderColor="#1A1A1A" minH="150px" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, category)}>
            <Box bg="#00F5D4" borderBottomWidth="3px" borderColor="#1A1A1A" p={3} borderTopRadius="lg">
              <Heading size="md" textAlign="center">{category}</Heading>
            </Box>
            <Flex p={4} wrap="wrap" gap={3} justify="center">
              {categories[category]?.map(word => (
                <Box key={word} draggable onDragStart={() => dragItem.current = { word, sourceCategory: category }} bg="#FFEA00" px={4} py={1} borderRadius="md" border="2px solid #1A1A1A" fontWeight="bold" cursor="grab">{word}</Box>
              ))}
            </Flex>
          </Box>
        ))}
      </SimpleGrid>

      <VStack>
        {!isCorrect && <Button onClick={checkAnswers} bg="#FFEA00" size="lg" borderWidth="3px" borderColor="#1A1A1A" boxShadow="4px 4px 0px #1A1A1A">Check Answer</Button>}
        {isCorrect && (
          <Box bg="#00E676" p={4} borderRadius="xl" border="3px solid #1A1A1A" w="100%" textAlign="center">
            <Text fontWeight="bold" mb={3}>🎉 {question.explanation || "Well done!"}</Text>
            <Button onClick={() => onNext(attempts === 1)} bg="#FF1053" color="white">Next Question ➡️</Button>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default SortingGame;
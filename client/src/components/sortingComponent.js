import React, { useState, useRef } from "react";
import { Box, Flex, Text, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { GameCard, ActionButton, FeedbackBanner } from "./ui";

const categoryPairs = {
  Concrete: ["Concrete", "Abstract"],
  Abstract: ["Concrete", "Abstract"],
  Common: ["Common", "Proper"],
  Proper: ["Common", "Proper"],
  Collective: ["Collective", "Individual"],
  Countable: ["Countable", "Uncountable"],
  Uncountable: ["Countable", "Uncountable"],
  Irregular: ["Irregular", "Regular"],
  "Irregular Plural Possessive": [
    "Irregular Plural Possessive",
    "Regular Possessive",
  ],
  "Object Pronoun": ["Subject Pronoun", "Object Pronoun"],
  "Subject Pronoun": ["Subject Pronoun", "Object Pronoun"],
  "Possessive Pronoun": ["Possessive Pronoun", "Personal Pronoun"],
  Demonstrative: ["Demonstrative", "Personal"],
  "Demonstrative (Far/Plural)": ["Demonstrative (Near)", "Demonstrative (Far)"],
  "Demonstrative (Near/Singular)": [
    "Demonstrative (Near)",
    "Demonstrative (Far)",
  ],
  "Reflexive Pronoun": ["Reflexive Pronoun", "Personal Pronoun"],
  "Vowel + Y Rule": ["Vowel + Y Rule", "Consonant + Y Rule"],
  "f to ves": ["f to ves", "Regular Plural"],
};

const getInitialState = (question) => {
  let initialWords = [];
  const initialCategories = {};

  if (question?.options) {
    question.options.forEach((opt) => {
      initialCategories[opt] = [];
    });
    question.answer?.forEach((ansString) => {
      const [, wordsStr] = ansString.split(": ");
      if (wordsStr) initialWords = [...initialWords, ...wordsStr.split(", ")];
    });
  } else if (question?.word && question?.category) {
    initialWords = [question.word];
    const cats = categoryPairs[question.category] || [
      question.category,
      "Other",
    ];
    cats.forEach((cat) => {
      initialCategories[cat] = [];
    });
  }

  return {
    wordBank: initialWords.sort(() => Math.random() - 0.5),
    categories: initialCategories,
    isCorrect: null,
    attempts: 0,
  };
};

const SortingGame = ({ question, onNext }) => {
  const initialState = getInitialState(question);
  const [wordBank, setWordBank] = useState(initialState.wordBank);
  const [categories, setCategories] = useState(initialState.categories);
  const [isCorrect, setIsCorrect] = useState(initialState.isCorrect);
  const [attempts, setAttempts] = useState(initialState.attempts);
  const dragItem = useRef(null);

  const handleDrop = (e, targetCategory) => {
    e.preventDefault();
    const { word, sourceCategory } = dragItem.current;
    if (sourceCategory === targetCategory) return;

    if (sourceCategory === "bank")
      setWordBank((prev) => prev.filter((w) => w !== word));
    else
      setCategories((prev) => ({
        ...prev,
        [sourceCategory]: prev[sourceCategory].filter((w) => w !== word),
      }));

    if (targetCategory === "bank") setWordBank((prev) => [...prev, word]);
    else
      setCategories((prev) => ({
        ...prev,
        [targetCategory]: [...prev[targetCategory], word],
      }));
    setIsCorrect(null);
  };

  const checkAnswers = () => {
    setAttempts((prev) => prev + 1);
    let allCorrect = true;

    if (question.answer) {
      question.answer.forEach((ansString) => {
        const [category, wordsStr] = ansString.split(": ");
        const correctWords = wordsStr.split(", ");
        const userWords = categories[category] || [];
        if (
          correctWords.length !== userWords.length ||
          !correctWords.every((w) => userWords.includes(w))
        ) {
          allCorrect = false;
        }
      });
    } else {
      if (!categories[question.category]?.includes(question.word)) {
        allCorrect = false;
      }
    }

    setIsCorrect(allCorrect);
  };

  return (
    <GameCard variant="game">
      <Heading size="lg" mb={6} textAlign="center" color="ink.700">
        {question.question_text || `Sort the word: ${question.word}`}
      </Heading>

      <Flex
        minH="100px"
        bg="gray.50"
        p={4}
        borderRadius="xl"
        mb={8}
        wrap="wrap"
        gap={4}
        justify="center"
        align="center"
        border="2px dashed"
        borderColor="ink.900"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, "bank")}
      >
        {wordBank.map((word) => (
          <Box
            key={word}
            draggable
            onDragStart={() =>
              (dragItem.current = { word, sourceCategory: "bank" })
            }
            bg="accent.yellow"
            px={6}
            py={2}
            borderRadius="md"
            borderWidth="3px"
            borderColor="ink.900"
            fontWeight="bold"
            cursor="grab"
            boxShadow="neu"
          >
            {word}
          </Box>
        ))}
      </Flex>

      <SimpleGrid columns={[1, null, 2]} spacing={6} mb={8}>
        {Object.keys(categories).map((category) => (
          <Box
            key={category}
            bg="gray.50"
            borderRadius="xl"
            borderWidth="3px"
            borderColor="ink.900"
            minH="150px"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, category)}
          >
            <Box
              bg="accent.teal"
              borderBottomWidth="3px"
              borderColor="ink.900"
              p={3}
              borderTopRadius="lg"
            >
              <Heading size="md" textAlign="center">
                {category}
              </Heading>
            </Box>
            <Flex p={4} wrap="wrap" gap={3} justify="center">
              {categories[category]?.map((word) => (
                <Box
                  key={word}
                  draggable
                  onDragStart={() =>
                    (dragItem.current = { word, sourceCategory: category })
                  }
                  bg="accent.yellow"
                  px={4}
                  py={1}
                  borderRadius="md"
                  borderWidth="2px"
                  borderColor="ink.900"
                  fontWeight="bold"
                  cursor="grab"
                >
                  {word}
                </Box>
              ))}
            </Flex>
          </Box>
        ))}
      </SimpleGrid>

      <VStack>
        {!isCorrect && (
          <ActionButton variant="check" onClick={checkAnswers} size="lg">
            Check Answer
          </ActionButton>
        )}
        {isCorrect && (
          <FeedbackBanner type="success" w="100%">
            <Text fontWeight="bold" mb={3}>
              🎉 {question.explanation || "Well done!"}
            </Text>
            <ActionButton
              variant="danger"
              onClick={() => onNext(attempts === 1)}
            >
              Next Question ➡️
            </ActionButton>
          </FeedbackBanner>
        )}
      </VStack>
    </GameCard>
  );
};

export default SortingGame;

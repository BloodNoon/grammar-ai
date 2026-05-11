import React from 'react';
import { Box, Heading, Text, VStack, Grid, Badge, SimpleGrid, Flex } from '@chakra-ui/react';

// Import the refactored wrappers
import SortingGameWrapper from '../components/SortingGameWrapper';
import TypingGameWrapper from '../components/typingGameWrapper';
import MultipleChoiceWrapper from '../components/multipleChoiceWrapper';

// Import verb questions JSON file
import verbData from '../data/verbs_questions.json';

const practiceTypes = [
  {
    name: "Multiple Choice",
    desc: "Identify the correct verb tense or form from given options.",
    color: "green",
    icon: "📝",
    examples: "Present Perfect, Past Continuous, Future Simple"
  },
  {
    name: "Typing Practice",
    desc: "Type the correct verb form or tense.",
    color: "purple",
    icon: "✍️",
    examples: "has eaten, was running, will go"
  },
  {
    name: "Sorting Game",
    desc: "Drag and drop verbs into the correct categories.",
    color: "orange",
    icon: "🔀",
    examples: "Action vs Linking, Helping vs Main"
  }
];

const VerbPractice = () => {
  const sortingQuestions = verbData.filter(q => q.practice_type === "sorting");
  const typingQuestions = verbData.filter(q => q.practice_type === "typing");
  const mcQuestions = verbData.filter(q => q.practice_type === "multiple_choice");

  return (
    <Box bg="#F6D5B4" minH="100vh" p={{ base: 4, md: 8 }} fontFamily="'Inter', sans-serif">

      {/* Page Header */}
      <Box maxW="1400px" mx="auto" mb={8} bg="#F0B784" p={4} borderRadius="xl" borderWidth="2px" borderColor="whiteAlpha.600" textAlign="center">
        <Heading color="#4A2C11" size="xl">
          🎯 Verb Practice Games
        </Heading>
        <Text fontSize="md" color="#4A2C11" mt={2} opacity={0.8}>
          Complete 15 questions with 100% accuracy in each game to master verbs!
        </Text>
      </Box>

      {/* Main 2-Column Grid */}
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8} maxW="1400px" mx="auto">

        {/* LEFT COLUMN: Practice Types Info */}
        <VStack spacing={6} align="stretch">

          {/* Practice Types Overview */}
          <Box bg="white" p={8} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
            <Heading size="lg" color="#1A0933" mb={4}>Practice Game Types</Heading>
            <Text fontSize="md" color="gray.600" mb={6}>
              Master your verb knowledge through three different interactive challenges. Each game tests your skills in a unique way!
            </Text>

            <SimpleGrid columns={1} spacing={4}>
              {practiceTypes.map((type, idx) => (
                <Flex key={idx} bg="gray.50" p={4} borderRadius="xl" borderWidth="1px" borderColor="gray.200" direction="column">
                  <Flex align="center" mb={2}>
                    <Text fontSize="2xl" mr={2}>{type.icon}</Text>
                    <Badge colorScheme={type.color} w="fit-content" px={2} py={1} borderRadius="md">{type.name}</Badge>
                  </Flex>
                  <Text fontSize="sm" color="gray.700" mb={3}>{type.desc}</Text>
                  <Box bg="white" p={2} borderRadius="md" borderWidth="1px" borderColor="gray.200">
                    <Text fontSize="xs" fontWeight="bold" color="gray.500">EXAMPLES:</Text>
                    <Text fontSize="sm" fontWeight="bold" color="#4A2C11">{type.examples}</Text>
                  </Box>
                </Flex>
              ))}
            </SimpleGrid>
          </Box>

          {/* Typing Game */}
          <Box bg="white" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
            <Heading size="md" color="#9C27B0" mb={4}>✍️ Typing Challenge</Heading>
            <TypingGameWrapper
              questionsToPlay={typingQuestions}
              nextPath="/verb-tense-structure"
            />
          </Box>

        </VStack>

        {/* RIGHT COLUMN: Practice Games */}
        <VStack spacing={6} align="stretch">

          {/* Multiple Choice Game */}
          <Box bg="white" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
            <Heading size="md" color="#4CAF50" mb={4}>📝 Verb Identification Challenge</Heading>
            <MultipleChoiceWrapper
              questionsToPlay={mcQuestions}
              nextPath="/verb-tense-structure"
            />
          </Box>

          {/* Sorting Game */}
          <Box bg="white" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
            <Heading size="md" color="#FF5722" mb={4}>🔀 Verb Tense Sorting</Heading>
            <SortingGameWrapper
              questionsToPlay={sortingQuestions}
              nextPath="/verb-tense-structure"
            />
          </Box>

        </VStack>
      </Grid>

    </Box>
  );
};

export default VerbPractice;

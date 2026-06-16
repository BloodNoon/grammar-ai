import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Grid,
  Badge,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import { PageContainer, GameCard, LessonPageHeader } from "../../components/ui";

// Import the refactored wrappers
import TypingGameWrapper from "../../components/typingGameWrapper";
import MultipleChoiceWrapper from "../../components/multipleChoiceWrapper";

// Import Adjective Hunt Game
import AdjectiveHuntGame from "./adjectiveComponents/AdjectiveHuntGame";

// Import adjective questions JSON file
import adjectiveData from "../../data/adjectives_questions.json";

const practiceTypes = [
  {
    name: "Multiple Choice",
    desc: "Identify the correct adjective or its form from given options.",
    color: "green",
    icon: "📝",
    examples: "Descriptive, Comparative, Superlative",
  },
  {
    name: "Typing Practice",
    desc: "Type the correct adjective form for the sentence.",
    color: "purple",
    icon: "✍️",
    examples: "taller, happiest, more careful",
  },
  {
    name: "Adjective Hunt",
    desc: "Find every adjective in a paragraph and identify its type.",
    color: "yellow",
    icon: "🔍",
    examples: "Descriptive, Comparative, Superlative, Proper",
  },
];

const AdjectivePractice = () => {
  const typingQuestions = adjectiveData.filter(
    (q) => q.practice_type === "typing",
  );
  const mcQuestions = adjectiveData.filter(
    (q) => q.practice_type === "multiple_choice",
  );

  return (
    <PageContainer>
      <LessonPageHeader icon="🎯" title="Adjective Practice Games" />
      <GameCard mb={8} textAlign="center" bg="brand.500" display="none">
        <Heading size="xl">🎯 Adjective Practice Games</Heading>
        <Text fontSize="md" color="brand.900" mt={2} opacity={0.8}>
          Complete 15 questions with 100% accuracy in each game type to master
          adjectives!
        </Text>
      </GameCard>

      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        {/* LEFT COLUMN: Practice Types Info + Adjective Hunt */}
        <VStack spacing={6} align="stretch">
          {/* Practice Types Overview */}
          <GameCard variant="game">
            <Heading size="lg" color="ink.700" mb={4}>
              Practice Game Types
            </Heading>
            <Text fontSize="md" color="gray.600" mb={6}>
              Master your adjective knowledge through three different interactive
              challenges. Each game tests your skills in a unique way!
            </Text>

            <SimpleGrid columns={1} spacing={4}>
              {practiceTypes.map((type, idx) => (
                <Flex
                  key={idx}
                  bg="gray.50"
                  p={4}
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="gray.200"
                  direction="column"
                >
                  <Flex align="center" mb={2}>
                    <Text fontSize="2xl" mr={2}>
                      {type.icon}
                    </Text>
                    <Badge
                      colorScheme={type.color}
                      w="fit-content"
                      px={2}
                      py={1}
                      borderRadius="md"
                    >
                      {type.name}
                    </Badge>
                  </Flex>
                  <Text fontSize="sm" color="gray.700" mb={3}>
                    {type.desc}
                  </Text>
                  <Box
                    bg="white"
                    p={2}
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor="gray.200"
                  >
                    <Text fontSize="xs" fontWeight="bold" color="gray.500">
                      EXAMPLES:
                    </Text>
                    <Text fontSize="sm" fontWeight="bold" color="brand.900">
                      {type.examples}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </SimpleGrid>
          </GameCard>

          {/* Typing Game */}
          <GameCard variant="game">
            <Heading size="md" color="purple.500" mb={4}>
              ✍️ Typing Challenge
            </Heading>
            <TypingGameWrapper
              questionsToPlay={typingQuestions}
              nextPath="/adjective-structure"
            />
          </GameCard>
        </VStack>

        {/* RIGHT COLUMN: Multiple Choice + Adjective Hunt */}
        <VStack spacing={6} align="stretch">
          {/* Multiple Choice Game */}
          <GameCard variant="game">
            <Heading size="md" color="green.500" mb={4}>
              📝 Adjective Identification Challenge
            </Heading>
            <MultipleChoiceWrapper
              questionsToPlay={mcQuestions}
              nextPath="/adjective-structure"
            />
          </GameCard>

          {/* Adjective Hunt Game */}
          <GameCard variant="game">
            <Heading size="md" color="yellow.500" mb={4}>
              🔍 Adjective Hunt
            </Heading>
            <AdjectiveHuntGame />
          </GameCard>
        </VStack>
      </Grid>
    </PageContainer>
  );
};

export default AdjectivePractice;

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
import { PageContainer, GameCard, LessonPageHeader } from "../components/ui";

// Import the refactored wrappers
import SortingGameWrapper from "../components/SortingGameWrapper";
import TypingGameWrapper from "../components/typingGameWrapper";
import MultipleChoiceWrapper from "../components/multipleChoiceWrapper";

// Import Verb Hunt Game
import VerbHuntGame from "./verbComponents/VerbHuntGame";

// Import verb questions JSON file
import verbData from "../data/verbs_questions.json";

const practiceTypes = [
  {
    name: "Multiple Choice",
    desc: "Identify the correct verb tense or form from given options.",
    color: "green",
    icon: "📝",
    examples: "Present Perfect, Past Continuous, Future Simple",
  },
  {
    name: "Typing Practice",
    desc: "Type the correct verb form or tense.",
    color: "purple",
    icon: "✍️",
    examples: "has eaten, was running, will go",
  },
  {
    name: "Sorting Game",
    desc: "Drag and drop verbs into the correct categories.",
    color: "orange",
    icon: "🔀",
    examples: "Action vs Linking, Helping vs Main",
  },
  {
    name: "Verb Hunt",
    desc: "Find every verb in a paragraph and identify its type.",
    color: "yellow",
    icon: "🔍",
    examples: "Action, Linking, Helping",
  },
];

const VerbPractice = () => {
  const sortingQuestions = verbData.filter(
    (q) => q.practice_type === "sorting",
  );
  const typingQuestions = verbData.filter((q) => q.practice_type === "typing");
  const mcQuestions = verbData.filter(
    (q) => q.practice_type === "multiple_choice",
  );

  return (
    <PageContainer>
      <LessonPageHeader icon="🎯" title="Verb Practice Games" />
      <GameCard mb={8} textAlign="center" bg="brand.500" display="none">
        <Heading size="xl">🎯 Verb Practice Games</Heading>
        <Text fontSize="md" color="brand.900" mt={2} opacity={0.8}>
          Complete 15 questions with 100% accuracy in each game to master verbs!
        </Text>
      </GameCard>

      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        {/* LEFT COLUMN: Practice Types Info + Typing Game + Verb Hunt */}
        <VStack spacing={6} align="stretch">
          {/* Practice Types Overview */}
          <GameCard variant="game">
            <Heading size="lg" color="ink.700" mb={4}>
              Practice Game Types
            </Heading>
            <Text fontSize="md" color="gray.600" mb={6}>
              Master your verb knowledge through four different interactive
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
              nextPath="/verb-tense-structure"
            />
          </GameCard>

          {/* Verb Hunt Game */}
          <GameCard variant="game">
            <Heading size="md" color="yellow.500" mb={4}>
              🔍 Verb Hunt
            </Heading>
            <VerbHuntGame />
          </GameCard>
        </VStack>

        {/* RIGHT COLUMN: Multiple Choice + Sorting Game */}
        <VStack spacing={6} align="stretch">
          {/* Multiple Choice Game */}
          <GameCard variant="game">
            <Heading size="md" color="green.500" mb={4}>
              📝 Verb Identification Challenge
            </Heading>
            <MultipleChoiceWrapper
              questionsToPlay={mcQuestions}
              nextPath="/verb-tense-structure"
            />
          </GameCard>

          {/* Sorting Game */}
          <GameCard variant="game">
            <Heading size="md" color="#FF5722" mb={4}>
              🔀 Verb Tense Sorting
            </Heading>
            <SortingGameWrapper
              questionsToPlay={sortingQuestions}
              nextPath="/verb-tense-structure"
            />
          </GameCard>
        </VStack>
      </Grid>
    </PageContainer>
  );
};

export default VerbPractice;

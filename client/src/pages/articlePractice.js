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

// Import article questions JSON file
import articleData from "../data/articles_questions.json";

const practiceTypes = [
  {
    name: "Multiple Choice",
    desc: "Identify the correct article (a, an, the) from given options.",
    color: "green",
    icon: "📝",
    examples: "Definite vs Indefinite, A vs An",
  },
  {
    name: "Typing Practice",
    desc: "Type the correct article for the sentence.",
    color: "purple",
    icon: "✍️",
    examples: "the, a, an",
  },
  {
    name: "Sorting Game",
    desc: "Drag and drop words into correct article categories.",
    color: "orange",
    icon: "🔀",
    examples: "Definite vs Indefinite, A vs An",
  },
];

const ArticlePractice = () => {
  const sortingQuestions = articleData.filter(
    (q) => q.practice_type === "sorting",
  );
  const typingQuestions = articleData.filter(
    (q) => q.practice_type === "typing",
  );
  const mcQuestions = articleData.filter(
    (q) => q.practice_type === "multiple_choice",
  );

  return (
    <PageContainer>
      <LessonPageHeader icon="🎯" title="Article Practice Games" />
      <GameCard mb={8} textAlign="center" bg="brand.500" display="none">
        <Heading size="xl">🎯 Article Practice Games</Heading>
        <Text fontSize="md" color="brand.900" mt={2} opacity={0.8}>
          Complete 15 questions with 100% accuracy in each game to master
          articles!
        </Text>
      </GameCard>

      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        {/* LEFT COLUMN: Practice Types Info */}
        <VStack spacing={6} align="stretch">
          {/* Practice Types Overview */}
          <GameCard variant="game">
            <Heading size="lg" color="ink.700" mb={4}>
              Practice Game Types
            </Heading>
            <Text fontSize="md" color="gray.600" mb={6}>
              Master your article knowledge through three different interactive
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
              nextPath="/article-structure"
            />
          </GameCard>
        </VStack>

        {/* RIGHT COLUMN: Practice Games */}
        <VStack spacing={6} align="stretch">
          {/* Multiple Choice Game */}
          <GameCard variant="game">
            <Heading size="md" color="green.500" mb={4}>
              📝 Article Identification Challenge
            </Heading>
            <MultipleChoiceWrapper
              questionsToPlay={mcQuestions}
              nextPath="/article-structure"
            />
          </GameCard>

          {/* Sorting Game */}
          <GameCard variant="game">
            <Heading size="md" color="#FF5722" mb={4}>
              🔀 Article Sorting
            </Heading>
            <SortingGameWrapper
              questionsToPlay={sortingQuestions}
              nextPath="/article-structure"
            />
          </GameCard>
        </VStack>
      </Grid>
    </PageContainer>
  );
};

export default ArticlePractice;

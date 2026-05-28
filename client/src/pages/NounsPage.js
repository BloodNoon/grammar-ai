import React from "react";
import {
  Box,
  Heading,
  Text,
  Grid,
  Flex,
  VStack,
  SimpleGrid,
  Badge,
  Button,
} from "@chakra-ui/react";
import {
  PageContainer,
  GameCard,
  LessonIntroCard,
  LessonPageHeader,
} from "../components/ui";

// Import our Interactive Components!
import NounPronounSorter from "../utils/SentenceChecker/NounPronounSorter";
import PronounReplacement from "../utils/SentenceChecker/PronounReplacement";
import NounSentenceBuilder from "../utils/SentenceChecker/NounSentenceBuilder";
import NounTypingGame from "../utils/SentenceChecker/NounTypingGame";

const nounTypes = [
  {
    name: "Common",
    desc: "Everyday, generic names. No capital letters.",
    examples: "city, dog, car",
  },
  {
    name: "Proper",
    desc: "Specific, special names. Always capitalized.",
    examples: "Paris, Rover, Tuesday",
  },
  {
    name: "Concrete",
    desc: "Things you can physically touch or see.",
    examples: "apple, water, jacket",
  },
  {
    name: "Abstract",
    desc: "Ideas or feelings. You cannot touch them.",
    examples: "love, bravery, time",
  },
  {
    name: "Collective",
    desc: "A single word for a group of things.",
    examples: "flock, team, family",
  },
  {
    name: "Countable",
    desc: "Things you can count with numbers.",
    examples: "one cat, two cats",
  },
  {
    name: "Uncountable",
    desc: "Things you cannot easily count.",
    examples: "sand, knowledge, water",
  },
  {
    name: "Compound",
    desc: "Two or more words together make one noun.",
    examples: "toothbrush, basketball, bus stop",
  },
];

const pronounTypes = [
  {
    name: "Personal",
    desc: "Replaces specific people or things.",
    examples: "he, she, it, they, we",
  },
  {
    name: "Possessive",
    desc: "Shows ownership of a noun.",
    examples: "mine, yours, his, theirs",
  },
  {
    name: "Reflexive",
    desc: "Reflects back to the subject.",
    examples: "myself, herself, themselves",
  },
  {
    name: "Demonstrative",
    desc: "Points to specific things.",
    examples: "this, that, these, those",
  },
  {
    name: "Indefinite",
    desc: "Refers to non-specific people/things.",
    examples: "someone, anything, nobody",
  },
];

const practices = [
  {
    id: 1,
    title: "Practice 1: Noun vs Pronoun Sorter",
    color: "cyan.500",
    component: <NounPronounSorter />,
  },
  {
    id: 2,
    title: "Practice 2: Pronoun Replacement",
    color: "green.500",
    component: <PronounReplacement />,
  },
  {
    id: 3,
    title: "Practice 3: Sentence Builder",
    color: "orange.500",
    component: <NounSentenceBuilder />,
  },
  {
    id: 4,
    title: "Practice 4: Spelling & Forms Typer",
    color: "purple.500",
    component: <NounTypingGame />,
  },
];

const NounsPage = () => {
  const [activePractice, setActivePractice] = React.useState(0);

  const current = practices[activePractice];
  const isLast = activePractice === practices.length - 1;

  return (
    <PageContainer>
      <LessonPageHeader icon="🐸" title="Nouns & Pronouns Builder" />

      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        <VStack spacing={6} align="stretch">
          {/* Learn the Lesson Box */}
          <LessonIntroCard
            title="Learn the Lesson"
            directions="Directions: Read the explanation in the boxes, take notes, and watch the video(s)."
          />

          {/* Nouns Lesson Box */}
          <GameCard variant="game">
            <Heading size="lg" color="ink.700" mb={4}>
              1. Types of Nouns
            </Heading>
            <Text fontSize="md" color="gray.600" mb={6}>
              A <strong>noun</strong> is a person, place, thing, or idea. They
              are the building blocks of every sentence you write!
            </Text>

            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
              {nounTypes.map((noun, idx) => (
                <Flex
                  key={idx}
                  bg="gray.50"
                  p={4}
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="gray.200"
                  direction="column"
                >
                  <Badge
                    colorScheme="orange"
                    w="fit-content"
                    mb={2}
                    px={2}
                    py={1}
                    borderRadius="md"
                  >
                    {noun.name} Nouns
                  </Badge>
                  <Text fontSize="sm" color="gray.700" mb={3} flex="1">
                    {noun.desc}
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
                      {noun.examples}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </SimpleGrid>
          </GameCard>

          {/* Pronouns Lesson Box */}
          <GameCard variant="game">
            <Heading size="lg" color="ink.700" mb={4}>
              2. Types of Pronouns
            </Heading>
            <Text fontSize="md" color="gray.600" mb={6}>
              A <strong>pronoun</strong> takes the place of a noun. If we didn't
              have pronouns, we would have to say:{" "}
              <em>"John drove John's car to John's house."</em>
            </Text>

            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
              {pronounTypes.map((pro, idx) => (
                <Flex
                  key={idx}
                  bg="purple.50"
                  p={4}
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="purple.200"
                  direction="column"
                >
                  <Badge
                    colorScheme="purple"
                    w="fit-content"
                    mb={2}
                    px={2}
                    py={1}
                    borderRadius="md"
                  >
                    {pro.name}
                  </Badge>
                  <Text fontSize="sm" color="gray.700" mb={3} flex="1">
                    {pro.desc}
                  </Text>
                  <Box
                    bg="white"
                    p={2}
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor="purple.200"
                  >
                    <Text fontSize="xs" fontWeight="bold" color="purple.500">
                      EXAMPLES:
                    </Text>
                    <Text fontSize="sm" fontWeight="bold" color="brand.900">
                      {pro.examples}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </SimpleGrid>
          </GameCard>
        </VStack>

        {/* ========================================== */}
        {/* RIGHT COLUMN: Video & Sequential Practice */}
        {/* ========================================== */}
        <VStack spacing={6} align="stretch">
          {/* THE VIDEO PANEL */}
          <GameCard variant="game" bg="gray.50">
            <Heading size="md" color="ink.700" mb={4}>
              📹 Today's Lesson: Nouns & Pronouns
            </Heading>

            <Box
              position="relative"
              w="100%"
              bg="black"
              borderRadius="lg"
              overflow="hidden"
              borderWidth="1px"
              borderColor="gray.300"
            >
              <video
                controls
                style={{ width: "100%", height: "480px", display: "block" }}
              >
                <source src="/Lesson1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>

            <Text mt={3} fontSize="sm" color="gray.500" fontStyle="italic">
              💡 Watch the lesson before practicing with the exercises below
            </Text>
          </GameCard>

          <LessonIntroCard 
            title="Practice Makes Perfect" 
            directions="Directions: Complete each of the practice exercises to improve your grammar" 
          />
          <GameCard variant="game">
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="md" color={current.color}>
                {current.title}
              </Heading>
              <Flex gap={1.5} align="center">
                {practices.map((p, idx) => (
                  <Box
                    key={p.id}
                    w={2}
                    h={2}
                    borderRadius="full"
                    bg={
                      idx === activePractice
                        ? current.color
                        : idx < activePractice
                          ? "green.400"
                          : "gray.300"
                    }
                    transition="background 0.3s"
                  />
                ))}
              </Flex>
            </Flex>

            {current.component}

            <Flex justify="flex-end" mt={6}>
              {!isLast ? (
                <Button
                  onClick={() => setActivePractice((prev) => prev + 1)}
                  bg={current.color}
                  color="white"
                  px={6}
                  py={2.5}
                  borderRadius="xl"
                  fontWeight="600"
                  border="2px solid"
                  borderColor="ink.900"
                  boxShadow="neu"
                >
                  Next Practice →
                </Button>
              ) : (
                <Button
                  onClick={() => setActivePractice(0)}
                  bg="green.500"
                  color="white"
                  px={6}
                  py={2.5}
                  borderRadius="xl"
                  fontWeight="600"
                  border="2px solid"
                  borderColor="ink.900"
                  boxShadow="neu"
                >
                  ↺ Restart All Practices
                </Button>
              )}
            </Flex>
          </GameCard>
        </VStack>
      </Grid>
    </PageContainer>
  );
};

export default NounsPage;

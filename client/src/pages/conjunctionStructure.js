import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Grid,
  Flex,
  VStack,
  Badge,
  Table,
  Tbody,
  Tr,
  Td,
  Button,
} from "@chakra-ui/react";
import { PageContainer, GameCard, LessonIntroCard, LessonPageHeader } from "../components/ui";

// CONJUNCTION COMPONENTS
import ConjunctionSorter from "./../utils/SentenceChecker/ConjunctionSorter";
import ConjunctionFillBlanks from "./../utils/SentenceChecker/ConjunctionFillBlanks";
import ConjunctionStructureGame from "./../utils/SentenceChecker/ConjunctionStructureGame";

const practices = [
  {
    id: 1,
    title: "Practice 1: Conjunction Sorter",
    color: "cyan.500",
    component: <ConjunctionSorter />,
  },
  {
    id: 2,
    title: "Practice 2: Comma or No Comma?",
    color: "green.500",
    component: <ConjunctionFillBlanks />,
  },
  {
    id: 3,
    title: "Practice 3: Complex Builder",
    color: "orange.500",
    component: <ConjunctionStructureGame />,
  },
];

const ConjunctionStructure = () => {
  const [showCongrats, setShowCongrats] = useState(true);
  const [activePractice, setActivePractice] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowCongrats(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const complexStructures = [
    {
      level: 1,
      pattern:
        "Pronoun + Be Verb + Adjective + SUB CONJ + Pronoun + Be Verb + Adjective",
      example: "He is quickly happy because she is calmly cheerful.",
    },
    {
      level: 2,
      pattern:
        "Article + Noun + Be Verb + Adjective + SUB CONJ + Article + Noun + Be Verb + Adjective",
      example:
        "The dog is playfully happy although the cat is quietly content.",
    },
    {
      level: 3,
      pattern:
        "Article + Adjective + Noun + Be Verb + Adjective + SUB CONJ + Article + Adjective + Noun + Be Verb + Adjective",
      example:
        "Quickly, the small dog is friendly while cautiously, the large cat is reserved.",
    },
    {
      level: 4,
      pattern:
        "Pronoun + Verb + Preposition + Article + Adjective + Noun + SUB CONJ + Pronoun + Verb + Preposition + Article + Adjective + Noun",
      example:
        "She sings beautifully to the bright crowd after he plays softly for the eager audience.",
    },
    {
      level: 5,
      pattern:
        "Article + Adjective + Noun + Verb + Article + Adjective + Noun + SUB CONJ + Article + Adjective + Noun + Verb + Article + Adjective + Noun",
      example:
        "Since the young student writes carefully a difficult essay, the diligent scholar solves methodically a complex problem.",
    },
    {
      level: 6,
      pattern:
        "Article + Adjective + Noun + Preposition + Article + Adjective + Noun + Verb + Preposition... [Complex Phrasal]",
      example:
        "While the excited class in the noisy room slowly discusses a new project in the large hall, the determined group in the quiet library carefully prepares an important report in the old building.",
    },
    {
      level: 7,
      pattern:
        "Article + Adjective + Noun + Verb + Preposition + Article + Adjective + Noun + CONJ + Article + Adjective + Noun + SUB CONJ...",
      example:
        "Because the clever fox jumps quickly over the lazy dog and the small cat, the sly wolf runs swiftly past the tired horse and the old goat.",
    },
  ];

  return (
    <PageContainer>
      <LessonPageHeader icon="🐸" title="Conjunction Lessons" />

      {showCongrats && (
        <GameCard
          variant="game"
          bg="green.50"
          borderColor="green.500"
          maxW="800px"
          mx="auto"
          mb={8}
        >
          <Heading size="md" color="green.500" mb={4}>
            🎉 Great job!
          </Heading>
          <Text fontSize="lg" color="gray.700">
            You have mastered the basic parts of speech. Now, let's learn how to
            glue them together into longer, complex sentences using
            conjunctions!
          </Text>
        </GameCard>
      )}

      {/* Main 2-Column Grid */}
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        {/* LEFT COLUMN */}
        <VStack spacing={6} align="stretch">
          {/* Learn the Lesson Box */}
          <LessonIntroCard
            title="Learn the Lesson"
            directions="Directions: Read the explanation in the boxes, take notes, and watch the video(s)."
          />

          <GameCard variant="game">
            <Heading size="lg" color="ink.700" mb={4}>
              1. Types of Conjunctions
            </Heading>
            <Text fontSize="md" color="gray.600" mb={6}>
              A <strong>conjunction</strong> is the "glue" of the English
              language. It connects words, phrases, or entirely independent
              clauses together so your writing doesn't sound choppy.
            </Text>

            <VStack spacing={8} align="stretch">
              <Box>
                <Heading size="sm" color="orange.600" mb={2}>
                  1. Coordinating Conjunctions (FANBOYS)
                </Heading>
                <Text fontSize="sm" color="gray.600" mb={4}>
                  These connect two ideas that have{" "}
                  <strong>equal importance</strong>. If you put one of these
                  between two complete sentences, you must use a comma.
                </Text>
                <Box
                  bg="gray.50"
                  p={3}
                  borderRadius="md"
                  border="1px dashed"
                  borderColor="gray.400"
                  mb={4}
                >
                  <Text fontSize="sm">
                    <strong>Example:</strong> I wanted to go to the park,{" "}
                    <strong>but</strong> it started raining.
                  </Text>
                </Box>
                <Table
                  size="sm"
                  variant="simple"
                  border="1px solid"
                  borderColor="gray.200"
                >
                  <Tbody>
                    <Tr>
                      <Td fontWeight="bold">F</Td>
                      <Td>For</Td>
                      <Td>Reason or purpose</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold">A</Td>
                      <Td>And</Td>
                      <Td>Addition</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold">N</Td>
                      <Td>Nor</Td>
                      <Td>Non-contrasting negative ideas</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold">B</Td>
                      <Td>But</Td>
                      <Td>Contrast</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold">O</Td>
                      <Td>Or</Td>
                      <Td>Choice</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold">Y</Td>
                      <Td>Yet</Td>
                      <Td>Contrast or exception</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold">S</Td>
                      <Td>So</Td>
                      <Td>Result or consequence</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>

              <Box>
                <Heading size="sm" color="purple.600" mb={2}>
                  2. Correlative Conjunctions (Pairs)
                </Heading>
                <Text fontSize="sm" color="gray.600" mb={4}>
                  These conjunctions always travel in <strong>pairs</strong>.
                  They link two balanced options or ideas.
                </Text>
                <Box
                  bg="gray.50"
                  p={3}
                  borderRadius="md"
                  border="1px dashed"
                  borderColor="gray.400"
                  mb={4}
                >
                  <Text fontSize="sm">
                    <strong>Example:</strong> <strong>Not only</strong> is she a
                    great singer, <strong>but also</strong> a talented dancer.
                  </Text>
                </Box>
                <Table
                  size="sm"
                  variant="simple"
                  border="1px solid"
                  borderColor="gray.200"
                >
                  <Tbody>
                    <Tr>
                      <Td fontWeight="bold">Not only... but also</Td>
                      <Td>Emphasizes two things</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold">Both... and</Td>
                      <Td>Includes both</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold">Either... or</Td>
                      <Td>One or the other</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold">Neither... nor</Td>
                      <Td>None of the two</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>

              <Box>
                <Heading size="sm" color="blue.600" mb={2}>
                  3. Subordinating Conjunctions (AWUBIS)
                </Heading>
                <Text fontSize="sm" color="gray.600" mb={4}>
                  These make a clause <strong>dependent</strong>. They establish
                  time, cause, or condition.
                </Text>
                <Box
                  bg="gray.50"
                  p={3}
                  borderRadius="md"
                  border="1px dashed"
                  borderColor="gray.400"
                  mb={4}
                >
                  <Text fontSize="sm">
                    <strong>Example:</strong> We stayed inside{" "}
                    <strong>because</strong> the storm was getting worse.
                  </Text>
                </Box>
                <Table
                  size="sm"
                  variant="simple"
                  border="1px solid"
                  borderColor="gray.200"
                >
                  <Tbody>
                    <Tr>
                      <Td fontWeight="bold">Time</Td>
                      <Td>after, before, until, when, while</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold">Cause</Td>
                      <Td>because, since, so that</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold">Contrast</Td>
                      <Td>although, even though, whereas</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold">Condition</Td>
                      <Td>if, unless, provided that</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
            </VStack>
          </GameCard>

          <GameCard variant="game">
            <Heading size="md" color="ink.700" mb={4}>
              2. Complex Sentence Structures
            </Heading>
            <Text fontSize="sm" color="gray.600" mb={6}>
              You can place subordinating conjunctions in the middle, or{" "}
              <strong>"front-load"</strong> them at the beginning. If you
              front-load, you MUST use a comma!
            </Text>

            <VStack spacing={4} align="stretch">
              {complexStructures.map((struct, index) => (
                <Box
                  key={index}
                  p={4}
                  bg="gray.50"
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="gray.200"
                >
                  <Badge colorScheme="blue" mb={2}>
                    Sentence Structure {struct.level}
                  </Badge>
                  <Text
                    fontSize="xs"
                    fontFamily="monospace"
                    color="gray.600"
                    mb={2}
                  >
                    {struct.pattern}
                  </Text>
                  <Box
                    bg="white"
                    p={3}
                    borderRadius="md"
                    border="1px dashed"
                    borderColor="gray.300"
                  >
                    <Text fontSize="sm">
                      <strong>Example:</strong> "{struct.example}"
                    </Text>
                  </Box>
                </Box>
              ))}
            </VStack>
          </GameCard>
        </VStack>

        {/* RIGHT COLUMN */}
        <VStack spacing={6} align="stretch">
          {/* THE VIDEO PANEL */}
          <GameCard variant="game" bg="gray.50" textAlign="center">
            <Heading size="md" color="ink.700" mb={4}>
              📹 Today's Lesson: Conjunctions
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
                style={{ width: "100%", height: "580px", display: "block" }}
              >
                <source
                  src="/Coordinating Conjunctions (Part 1).mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </Box>

            <Text mt={3} fontSize="sm" color="gray.500" fontStyle="italic">
              💡 Watch the lesson before practicing with the exercises below
            </Text>
          </GameCard>

          {/* This is the new added section. */}
          <LessonIntroCard 
            title="Practice Makes Perfect" 
            directions="Directions: Complete each of the practice exercises to improve your grammar" 
          />

          {/* Active Practice Card */}
          <GameCard variant="game">
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="md" color={practices[activePractice].color}>
                {practices[activePractice].title}
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
                        ? practices[activePractice].color
                        : idx < activePractice
                          ? "green.400"
                          : "gray.300"
                    }
                    transition="background 0.3s"
                  />
                ))}
              </Flex>
            </Flex>

            {practices[activePractice].component}

            <Flex justify="flex-end" mt={6}>
              {activePractice < practices.length - 1 ? (
                <Button
                  onClick={() => setActivePractice((prev) => prev + 1)}
                  bg={practices[activePractice].color}
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

export default ConjunctionStructure;

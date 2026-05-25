import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Grid,
  Flex,
  VStack,
  Table,
  Tbody,
  Tr,
  Td,
  Th,
  Thead,
  Button,
} from "@chakra-ui/react";
import { PageContainer, GameCard } from "../../components/ui";

// PREP1 COMPONENTS
import PrepositionSorter from "../../utils/SentenceChecker/PrepositionSorter";
import PrepositionStructureGame from "../../utils/SentenceChecker/PrepositionStructureGame";
import PrepositionFillBlanks from "../../utils/SentenceChecker/PrepositionFillBlanks";

const practices = [
  {
    id: 1,
    title: "Practice 1: Prepositions Sorter",
    color: "cyan.500",
    component: <PrepositionSorter />,
  },
  {
    id: 2,
    title: "Practice 2: Fill-in-the-Blanks",
    color: "green.500",
    component: (
      <Box
        bg="gray.50"
        p={6}
        borderRadius="xl"
        border="1px solid"
        borderColor="gray.200"
        textAlign="center"
      >
        <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={4}>
          The boy is sitting ______ a chair.
        </Text>
        <PrepositionFillBlanks />
      </Box>
    ),
  },
  {
    id: 3,
    title: "Practice 3: Structure Game",
    color: "orange.500",
    component: <PrepositionStructureGame />,
  },
];

const Prep1Structure = () => {
  const [showCongrats, setShowCongrats] = useState(true);
  const [activePractice, setActivePractice] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCongrats(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const formulas = [
    {
      pattern: "#Pronoun #Verb #Preposition #Article #Noun",
      example: "She walked to the store.",
    },
    {
      pattern: "#Article #Noun #Verb #Preposition #Article #Noun",
      example: "The dog ran through the yard.",
    },
    {
      pattern:
        "#Article #Noun #Verb #Preposition #Article #Noun #Preposition #Article #Noun",
      example: "Mark gave the book to Sarah.",
    },
    {
      pattern: "#Pronoun #Verb #Preposition #Article #Noun",
      example: "They talked about eating lunch.",
    },
    {
      pattern: "#Preposition #Article #Noun, #Noun #Verb #Article #Noun",
      example: "After the movie, Jack ate the pizza.",
    },
  ];

  return (
    <PageContainer>
      <GameCard mb={8} textAlign="center" bg="brand.500">
        <Heading size="xl">🐸 Preposition Lessons</Heading>
      </GameCard>

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
            🎉 Almost there!
          </Heading>
          <Text fontSize="lg" color="gray.700">
            You are making great progress! You've learned about subjects,
            objects, verb tenses, and articles. Let's master prepositions!
          </Text>
        </GameCard>
      )}

      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        {/* LEFT COLUMN */}
        <VStack spacing={6} align="stretch">
          <GameCard variant="game">
            <Heading size="lg" color="ink.700" mb={4}>
              1. Understanding Prepositions
            </Heading>
            <Text fontSize="md" color="gray.600" mb={6}>
              A <strong>preposition</strong> is a word that indicates the
              relationship between a noun or pronoun and other words in a
              sentence. They often express relationships of time, place,
              direction, or situation.
            </Text>

            <Table
              size="sm"
              variant="simple"
              border="1px solid"
              borderColor="gray.200"
            >
              <Thead bg="gray.50">
                <Tr>
                  <Th>Type</Th>
                  <Th>Examples</Th>
                  <Th>Sample Phrase</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td fontWeight="bold">Time</Td>
                  <Td>before, during, after</Td>
                  <Td>
                    ...<em>during</em> the movie.
                  </Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Place</Td>
                  <Td>in, on, under</Td>
                  <Td>
                    ...<em>under</em> the bed.
                  </Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Direction</Td>
                  <Td>to, through, around</Td>
                  <Td>
                    ...<em>through</em> the door.
                  </Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Situation</Td>
                  <Td>with, for, about</Td>
                  <Td>
                    ...<em>about</em> the test.
                  </Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Comparison</Td>
                  <Td>like, as, than</Td>
                  <Td>
                    ...<em>like</em> a tiger.
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </GameCard>

          <GameCard variant="game">
            <Heading size="md" color="ink.700" mb={4}>
              2. Sentence Patterns
            </Heading>
            <Text fontSize="sm" color="gray.600" mb={6}>
              Learn your new sentence structures:
            </Text>

            <VStack spacing={4} align="stretch">
              {formulas.map((item, index) => (
                <Box
                  key={index}
                  p={4}
                  bg="gray.50"
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="gray.200"
                >
                  <Text
                    fontSize="xs"
                    fontFamily="monospace"
                    color="gray.600"
                    mb={2}
                  >
                    {item.pattern}
                  </Text>
                  <Box
                    bg="white"
                    p={3}
                    borderRadius="md"
                    border="1px dashed"
                    borderColor="gray.300"
                  >
                    <Text fontSize="sm">
                      <strong>Example:</strong> "{item.example}"
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
              📹 Today's Lesson: Prepositions
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
                <source src="/Lesson6.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>

            <Text mt={3} fontSize="sm" color="gray.500" fontStyle="italic">
              💡 Watch the lesson before practicing with the exercises below
            </Text>
          </GameCard>

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

export default Prep1Structure;

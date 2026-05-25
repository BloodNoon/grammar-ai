import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Grid,
  Flex,
  VStack,
  Badge,
  Button,
} from "@chakra-ui/react";
import { PageContainer, GameCard } from "../../components/ui";

// ADVERB COMPONENTS
import AdverbLesson from "../../utils/SentenceChecker/AdverbLesson";
import AdverbTypes from "../../utils/SentenceChecker/AdverbTypes";
import AdverbRoyalOrder from "../../utils/SentenceChecker/AdverbRoyalOrder";
import AdverbForms from "../../utils/SentenceChecker/AdverbForms";
import AdverbSentenceStructures from "../../utils/SentenceChecker/AdverbSentenceStructures";
import AdverbIdentificationGame from "../../utils/SentenceChecker/AdverbIdentificationGame";
import AdverbTypeSorting from "../../utils/SentenceChecker/AdverbTypeSorting";
import AdverbQuiz from "../../utils/SentenceChecker/AdverbQuiz";

const practices = [
  {
    id: 1,
    title: "Practice 1: Identification Game",
    color: "cyan.500",
    component: <AdverbIdentificationGame />,
  },
  {
    id: 2,
    title: "Practice 2: Type Sorting",
    color: "green.500",
    component: <AdverbTypeSorting />,
  },
  {
    id: 3,
    title: "Practice 3: Royal Order",
    color: "orange.500",
    component: <AdverbRoyalOrder />,
  },
  {
    id: 4,
    title: "Practice 4: Sentence Structures",
    color: "purple.500",
    component: <AdverbSentenceStructures />,
  },
];

const AdverbStructure = () => {
  const [activePractice, setActivePractice] = useState(0);

  const current = practices[activePractice];
  const isLast = activePractice === practices.length - 1;

  return (
    <PageContainer>
      <GameCard mb={8} textAlign="center" bg="brand.500">
        <Heading size="xl">🐸 Adverb Lessons</Heading>
      </GameCard>

      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        {/* LEFT COLUMN */}
        <VStack spacing={6} align="stretch">
          <GameCard variant="game">
            <Heading size="lg" color="ink.700" mb={4}>
              1. Introduction to Adverbs
            </Heading>
            <Text fontSize="md" color="gray.600" mb={6}>
              Discover{" "}
              <Badge colorScheme="blue" fontSize="md">
                adverbs
              </Badge>{" "}
              - the words that modify verbs, adjectives, and other adverbs!
              Learn how to use them correctly and understand their flexible
              placement in sentences.
            </Text>

            <Box
              bg="gray.50"
              p={4}
              borderRadius="xl"
              border="1px dashed"
              borderColor="blue.500"
              mb={6}
            >
              <Text fontSize="md">
                <strong>Example:</strong> She runs <em>quickly</em>.
              </Text>
              <Text fontSize="sm" color="gray.500" mt={1}>
                "Quickly" describes how she runs.
              </Text>
            </Box>

            <AdverbLesson />
          </GameCard>

          <GameCard variant="game">
            <Heading size="md" color="blue.500" mb={4}>
              🔤 Adverb Types
            </Heading>
            <AdverbTypes />
          </GameCard>

          <GameCard variant="game">
            <Heading size="md" color="green.500" mb={4}>
              📐 Adverb Forms
            </Heading>
            <AdverbForms />
          </GameCard>
        </VStack>

        {/* RIGHT COLUMN */}
        <VStack spacing={6} align="stretch">
          {/* THE VIDEO PANEL */}
          <GameCard variant="game" bg="gray.50">
            <Heading size="md" color="ink.700" mb={4}>
              📹 Today's Lesson: Adverbs
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
                <source src="/adverbs1.mp4" type="video/mp4" />
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

      <GameCard variant="game" mt={8}>
        <Heading size="xl" textAlign="center" mb={6} color="gray.700">
          🏆 Final Adverb Quiz
        </Heading>
        <AdverbQuiz />
      </GameCard>
    </PageContainer>
  );
};

export default AdverbStructure;

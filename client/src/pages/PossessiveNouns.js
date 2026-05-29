import React, { useState } from "react";
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
import { PageContainer, GameCard, LessonIntroCard, LessonPageHeader } from "../components/ui";

import PossessiveSorter from "../utils/SentenceChecker/PossessiveSorter";
import PossessiveTypingGame from "../utils/SentenceChecker/PossessiveTypingGame";

const possessiveRules = [
  {
    rule: "Singular Nouns",
    desc: "Add an apostrophe + s ('s) to show ownership for one person/thing.",
    examples: "the dog's bone, Sarah's car",
  },
  {
    rule: "Plural Nouns (ending in s)",
    desc: "Just add an apostrophe (') after the 's'. Do NOT add another 's'.",
    examples: "the dogs' bones, the teachers' lounge",
  },
  {
    rule: "Irregular Plurals",
    desc: "If the plural word doesn't end in 's', treat it like a singular word and add ('s).",
    examples: "the children's toys, the men's shoes",
  },
  {
    rule: "Singular ending in 's'",
    desc: "Usually, you still add ('s), though just (') is sometimes accepted in older styles.",
    examples: "the boss's desk, James's book",
  },
];

const practices = [
  {
    id: 1,
    title: "Practice 1: Apostrophe Sorter",
    color: "cyan.500",
    component: <PossessiveSorter />,
  },
  {
    id: 2,
    title: "Practice 2: Ownership Typer",
    color: "orange.500",
    component: <PossessiveTypingGame />,
  },
];

const PossessiveNouns = () => {
  const [activePractice, setActivePractice] = useState(0);

  return (
    <PageContainer>
      <LessonPageHeader icon="🐸" title="Possessive Nouns & Apostrophes" />
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        <VStack spacing={6} align="stretch">
          {/* Learn the Lesson Box */}
          <LessonIntroCard
            title="Learn the Lesson"
            directions="Directions: Read the explanation in the boxes, take notes, and watch the video(s)."
          />

          <GameCard variant="game">
            <Heading size="lg" color="ink.700" mb={4}>
              Showing Ownership
            </Heading>
            <Text fontSize="md" color="gray.600" mb={6}>
              A <strong>possessive noun</strong> shows that someone or something
              owns something else. We use <strong>apostrophes</strong> to show
              this ownership, but the placement depends on whether the noun is
              singular or plural!
            </Text>

            <SimpleGrid minChildWidth="240px" spacing={4}>
              {possessiveRules.map((rule, idx) => (
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
                    colorScheme="purple"
                    w="fit-content"
                    mb={2}
                    px={2}
                    py={1}
                    borderRadius="md"
                  >
                    {rule.rule}
                  </Badge>
                  <Text fontSize="sm" color="gray.700" mb={3} flex="1">
                    {rule.desc}
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
                      {rule.examples}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </SimpleGrid>
          </GameCard>
        </VStack>

        <VStack spacing={6} align="stretch">
          <GameCard variant="game" bg="gray.50">
            <Heading size="md" color="ink.700" mb={4}>
              📹 Today's Lesson: Possessive Nouns
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
                <source src="/possessives1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>

            <Text mt={3} fontSize="sm" color="gray.500" fontStyle="italic">
              💡 Watch the lesson before practicing with the exercises below
            </Text>
          </GameCard>

          {/* Active Practice Card */}
          <LessonIntroCard 
            title="Practice Makes Perfect" 
            directions="Directions: Complete each of the practice exercises to improve your grammar" 
          />
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

export default PossessiveNouns;

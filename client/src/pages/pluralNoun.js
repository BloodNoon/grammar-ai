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

import PluralRuleSorter from "../utils/SentenceChecker/PluralRuleSorter";
import PluralTypingGame from "../utils/SentenceChecker/PluralTypingGame";

const pluralRules = [
  {
    rule: "Add -s",
    desc: "Most regular nouns just need an 's' at the end.",
    examples: "cat → cats, tree → trees",
  },
  {
    rule: "Add -es",
    desc: "Nouns ending in s, x, z, ch, or sh.",
    examples: "bus → buses, box → boxes",
  },
  {
    rule: "Change 'y' to 'ies'",
    desc: "Ends in a consonant + y. Drop the y!",
    examples: "city → cities, baby → babies",
  },
  {
    rule: "Vowel + 'y'",
    desc: "Ends in a vowel (a,e,i,o,u) + y. Just add 's'.",
    examples: "boy → boys, toy → toys",
  },
  {
    rule: "Change 'f' to 'ves'",
    desc: "Ends in f or fe. Drop it and add 'ves'.",
    examples: "wolf → wolves, knife → knives",
  },
  {
    rule: "Irregular",
    desc: "These completely change their spelling!",
    examples: "child → children, mouse → mice",
  },
  {
    rule: "No Change",
    desc: "Some words are the same singular and plural.",
    examples: "deer → deer, sheep → sheep",
  },
];

const practices = [
  {
    id: 1,
    title: "Practice 1: Plural Rule Sorter",
    color: "cyan.500",
    component: <PluralRuleSorter />,
  },
  {
    id: 2,
    title: "Practice 2: Spelling Typer",
    color: "purple.500",
    component: <PluralTypingGame />,
  },
];

const PluralNoun = () => {
  const [activePractice, setActivePractice] = useState(0);

  return (
    <PageContainer>
      <LessonPageHeader icon="🐸" title="Plural Nouns & Spelling Rules" />
      <LessonIntroCard />

      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        <VStack spacing={6} align="stretch">
          <GameCard variant="game">
            <Heading size="lg" color="ink.700" mb={4}>
              How to Make Nouns Plural
            </Heading>
            <Text fontSize="md" color="gray.600" mb={6}>
              A singular noun means there is only <strong>one</strong>. A plural
              noun means there is <strong>more than one</strong>. While most
              nouns just need an "s", there are a few important spelling rules
              you must memorize!
            </Text>

            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
              {pluralRules.map((rule, idx) => (
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
                    colorScheme="blue"
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
              📹 Today's Lesson: Plural Rules
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
                <source src="/The-Plural-Nouns-Power-Up.mp4" type="video/mp4" />
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

export default PluralNoun;

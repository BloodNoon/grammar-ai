import React, { useState } from "react";
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
import { PageContainer, GameCard, LessonIntroCard, LessonPageHeader } from "../../components/ui";

// PREP2 COMPONENTS
import PrepositionPhraseLesson from "../../utils/SentenceChecker/PrepositionPhraseLesson";
import PrepositionPhraseFillBlanks from "../../utils/SentenceChecker/PrepositionPhraseFillBlanks";
import PrepositionPhraseWordBlocks from "../../utils/SentenceChecker/PrepositionPhraseWordBlocks";
import PrepositionPhraseTesting from "../../utils/SentenceChecker/PrepositionPhraseTesting";
import PrepositionPhraseSorting from "../../utils/SentenceChecker/PrepositionPhraseSorting";
const practices = [
  {
    id: 1,
    title: "Practice 1: Phrase Lesson",
    color: "gray.700",
    component: <PrepositionPhraseLesson />,
  },
  {
    id: 2,
    title: "Practice 2: Fill in the Blanks",
    color: "gray.700",
    component: <PrepositionPhraseFillBlanks />,
  },
  {
    id: 3,
    title: "Practice 3: Word Blocks",
    color: "gray.700",
    component: <PrepositionPhraseWordBlocks />,
  },
  {
    id: 4,
    title: "Practice 4: Sorting Game",
    color: "gray.700",
    component: <PrepositionPhraseSorting />,
  },
];

const Prep2Structure = () => {
  const [activePractice, setActivePractice] = useState(0);

  const current = practices[activePractice];
  const isLast = activePractice === practices.length - 1;

  return (
    <PageContainer>
      <LessonPageHeader icon="🐸" title="Prepositional Phrases" />
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
              1. Understanding Prepositional Phrases
            </Heading>
            <Text fontSize="md" color="gray.600" mb={6}>
              A <strong>prepositional phrase</strong> is a group of words that
              begins with a preposition and ends with a noun or pronoun. It adds
              detail about time, place, or manner.
            </Text>

            <Table
              size="sm"
              variant="simple"
              border="1px solid"
              borderColor="gray.200"
            >
              <Thead bg="gray.50">
                <Tr>
                  <Th>Function</Th>
                  <Th>What it does</Th>
                  <Th>Example</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td fontWeight="bold">Adverbial</Td>
                  <Td>Modifies verbs</Td>
                  <Td>
                    She ran <em>with speed</em>.
                  </Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Adjectival</Td>
                  <Td>Modifies nouns</Td>
                  <Td>
                    The book <em>on the table</em> is mine.
                  </Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Complement</Td>
                  <Td>Completes the meaning</Td>
                  <Td>
                    We rely <em>on you</em>.
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </GameCard>

          <GameCard variant="game">
            <Heading size="md" color="ink.700" mb={4}>
              2. Anatomy of a Phrase
            </Heading>

            <Box
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
                #Preposition + (Modifiers/Article) + #Noun/#Pronoun
              </Text>
              <Box
                bg="white"
                p={3}
                borderRadius="md"
                border="1px dashed"
                borderColor="gray.300"
              >
                <Text fontSize="sm">
                  <strong>Example:</strong> "in the house"
                </Text>
                <Text fontSize="xs" color="gray.500" mt={1}>
                  <em>"in" (preposition) + "the" (article) + "house" (noun)</em>
                </Text>
              </Box>
            </Box>
          </GameCard>
        </VStack>

        {/* RIGHT COLUMN */}
        <VStack spacing={6} align="stretch">
          {/* THE VIDEO PANEL */}
          <GameCard variant="game" bg="gray.50" textAlign="center">
            <Heading size="md" color="ink.700" mb={4}>
              📹 Today's Lesson
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
                <source src="/PrepPhrase.mp4" type="video/mp4" />
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
          🏆 Final Phrase Test
        </Heading>
        <PrepositionPhraseTesting />
      </GameCard>
    </PageContainer>
  );
};
export default Prep2Structure;

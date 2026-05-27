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
  Button,
} from "@chakra-ui/react";
import { PageContainer, GameCard, LessonIntroCard, LessonPageHeader } from "../../components/ui";

// PREP3 COMPONENTS
import SentenceScramble from "../../utils/SentenceChecker/SentenceScramble";
import PrepositionBuilder from "../../utils/SentenceChecker/PrepositionBuilder";
import PrepositionQuizFinal from "../../utils/SentenceChecker/PrepositionQuizFinal";

const practices = [
  {
    id: 1,
    title: "Practice 1: Sentence Scramble",
    color: "gray.700",
    component: <SentenceScramble />,
  },
  {
    id: 2,
    title: "Practice 2: Preposition Builder",
    color: "gray.700",
    component: <PrepositionBuilder />,
  },
];

const Prep3Structure = () => {
  const [activePractice, setActivePractice] = useState(0);

  const current = practices[activePractice];
  const isLast = activePractice === practices.length - 1;

  return (
    <PageContainer>
      <LessonPageHeader icon="🐸" title="Compound Prepositions" />
      <LessonIntroCard />

      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        {/* LEFT COLUMN */}
        <VStack spacing={6} align="stretch">
          <GameCard variant="game">
            <Heading size="lg" color="ink.700" mb={4}>
              1. Understanding Compound Prepositions
            </Heading>
            <Text fontSize="md" color="gray.600" mb={6}>
              A <strong>compound preposition</strong> is a phrase that works
              like a single preposition, connecting a noun or pronoun to another
              word in the sentence.
            </Text>

            <Table
              size="sm"
              variant="simple"
              border="1px solid"
              borderColor="gray.200"
            >
              <Tbody>
                <Tr>
                  <Td fontWeight="bold">According to</Td>
                  <Td fontWeight="bold">As of</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">As well as</Td>
                  <Td fontWeight="bold">Aside from</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Because of</Td>
                  <Td fontWeight="bold">In addition to</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Ahead of</Td>
                  <Td fontWeight="bold">Due to</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Along with</Td>
                  <Td fontWeight="bold">Out of</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Next to</Td>
                  <Td fontWeight="bold">Instead of</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Prior to</Td>
                  <Td fontWeight="bold">In respect to</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">In spite of</Td>
                  <Td fontWeight="bold">In place of</Td>
                </Tr>
              </Tbody>
            </Table>
          </GameCard>

          <GameCard variant="game">
            <Heading size="md" color="ink.700" mb={4}>
              2. Usage Rules & Examples
            </Heading>

            <VStack spacing={4} align="stretch">
              <Box
                p={3}
                bg="gray.50"
                borderRadius="md"
                border="1px dashed"
                borderColor="gray.300"
              >
                <Text fontSize="sm">
                  <strong>1.</strong> She succeeded <strong>because of</strong>{" "}
                  her hard work.
                </Text>
              </Box>
              <Box
                p={3}
                bg="gray.50"
                borderRadius="md"
                border="1px dashed"
                borderColor="gray.300"
              >
                <Text fontSize="sm">
                  <strong>2.</strong> <strong>In spite of</strong> the rain, we
                  went for a walk.
                </Text>
              </Box>
              <Box
                p={3}
                bg="gray.50"
                borderRadius="md"
                border="1px dashed"
                borderColor="gray.300"
              >
                <Text fontSize="sm">
                  <strong>3.</strong> The decision was made{" "}
                  <strong>according to</strong> the rules.
                </Text>
              </Box>

              <Box
                mt={4}
                p={5}
                bg="blue.50"
                borderRadius="xl"
                border="1px solid"
                borderColor="blue.200"
              >
                <Heading size="xs" color="blue.700" mb={3}>
                  💡 Quick Tips:
                </Heading>
                <VStack
                  align="start"
                  spacing={2}
                  fontSize="xs"
                  color="gray.700"
                >
                  <Text>• Treat compound prepositions as single units.</Text>
                  <Text>
                    • They are usually followed by a noun or gerund (-ing form).
                  </Text>
                  <Text>
                    • Some can be replaced with single-word equivalents.
                  </Text>
                </VStack>
              </Box>
            </VStack>
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
                <source src="/Lesson8.mp4" type="video/mp4" />
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
          🏆 Final Quiz
        </Heading>
        <PrepositionQuizFinal />
      </GameCard>
    </PageContainer>
  );
};

export default Prep3Structure;

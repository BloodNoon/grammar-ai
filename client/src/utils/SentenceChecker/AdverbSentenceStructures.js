import React from "react";
import {
  Box,
  Heading,
  Text,
  Grid,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import {
  PageContainer,
  GameCard,
  LessonIntroCard,
  LessonPageHeader,
} from "../../components/ui";

const sentenceStructures = [
  {
    pattern: "(Adverb,) Pronoun + (Adverb) Be Verb (Adverb) + Adjective (Adverb)",
    example: "He is quickly happy.",
    breakdown: "Adverb inside, after \"Be Verb\" — modifies \"happy\"",
    position: "after verb",
  },
  {
    pattern: "(Adverb,) Article + Noun + (Adverb) Be Verb (Adverb) + Adjective (Adverb)",
    example: "The dog is playfully happy.",
    breakdown: "Adverb before adjective — shows manner of happiness",
    position: "before adjective",
  },
  {
    pattern: "(Adverb,) Article + Adjective + Noun + (Adverb) Be Verb (Adverb) + Adjective (Adverb)",
    example: "Quickly, the small dog is friendly.",
    breakdown: "Adverb at sentence start — sets tone for entire action/state",
    position: "sentence start",
  },
  {
    pattern: "(Adverb,) Pronoun + (Adverb) Verb (Adverb) + Preposition + Article + Adjective + Noun (Adverb)",
    example: "She sings beautifully to the bright crowd.",
    breakdown: "Adverb right after verb — describes \"how\" she sings",
    position: "after verb",
  },
  {
    pattern: "(Adverb,) Article + Adjective + Noun + (Adverb) Verb (Adverb) + Article + Adjective + Noun (Adverb)",
    example: "The young student writes carefully a difficult essay.",
    breakdown: "Adverb between verb and object — emphasizes manner of action",
    position: "between verb and object",
  },
  {
    pattern: "(Adverb,) Article + Adjective + Noun + Preposition + (Adverb) Verb (Adverb) + Article + Adjective + Noun + Preposition + Article + Adjective + Noun (Adverb)",
    example: "The excited class in the noisy room slowly discusses a new project in the large hall.",
    breakdown: "Adverb before main verb in a long sentence — keeps action deliberate",
    position: "before main verb",
  },
  {
    pattern: "(Adverb,) Article + Adjective + Noun + (Adverb) Verb (Adverb) + Preposition + Article + Adjective + Noun + Article + Adjective + Noun (Adverb)",
    example: "The clever fox jumps quickly over the lazy dog and the small cat.",
    breakdown: "Adverb after verb — shows speed of action",
    position: "after verb",
  },
];

const POSITION_COLORS = {
  "sentence start": { bg: "blue.50", text: "blue.700" },
  "after verb": { bg: "green.50", text: "green.700" },
  "before adjective": { bg: "orange.50", text: "orange.700" },
  "between verb and object": { bg: "purple.50", text: "purple.700" },
  "before main verb": { bg: "pink.50", text: "pink.700" },
};

const AdverbSentenceStructures = () => {
  return (
    <PageContainer>
      <LessonPageHeader icon="🐸" title="Adverb Sentence Structures" />
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>

        {/* LEFT COLUMN */}
        <VStack spacing={6} align="stretch">
          <LessonIntroCard
            title="Learn the Lesson"
            directions="Directions: Read the explanation in the boxes, take notes."
          />

          {/* Introduction */}
          <GameCard variant="game">
            <Heading size="lg" color="ink.700" mb={4}>
              What are Adverb Sentence Structures?
            </Heading>
            <Text fontSize="md" color="gray.600" mb={4}>
              Adverbs are unique because they can move to different
              positions in a sentence and still make sense. Each position
              changes the emphasis of the sentence slightly. Below are the
              five positions an adverb can take.
            </Text>
            <VStack align="stretch" spacing={2}>
              <Box bg="blue.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="blue.700">
                  Sentence Start
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Sets the tone for the entire action or state.
                </Text>
              </Box>
              <Box bg="green.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="green.700">
                  After Verb
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Describes how the action is performed.
                </Text>
              </Box>
              <Box bg="orange.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="orange.700">
                  Before Adjective
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Shows the degree or manner of the adjective.
                </Text>
              </Box>
              <Box bg="purple.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="purple.700">
                  Between Verb and Object
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Emphasizes the manner of the action itself.
                </Text>
              </Box>
              <Box bg="pink.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="pink.700">
                  Before Main Verb
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Keeps the action deliberate, often in longer sentences.
                </Text>
              </Box>
            </VStack>
          </GameCard>

          {/* Placement Strategy */}
          <GameCard variant="game">
            <Heading size="md" color="ink.700" mb={3}>
              Placement Strategy
            </Heading>
            <Text fontSize="md" color="gray.600">
              Adverbs are very flexible! They can move to different
              positions in a sentence to change emphasis. The key is
              understanding what you want to emphasize and how the adverb
              sounds in each position.
            </Text>
          </GameCard>
        </VStack>

        {/* RIGHT COLUMN */}
        <VStack spacing={6} align="stretch">

          {/* Pattern Table */}
          <GameCard variant="game">
            <Heading size="md" color="ink.700" mb={4}>
              Sentence Patterns
            </Heading>
            <Table
              size="sm"
              variant="simple"
              border="1px solid"
              borderColor="gray.200"
              mb={4}
            >
              <Thead bg="gray.50">
                <Tr>
                  <Th color="ink.700">Example</Th>
                  <Th color="ink.700">Position</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sentenceStructures.map((s, i) => (
                  <Tr key={i} bg={i % 2 === 1 ? "gray.50" : "white"}>
                    <Td fontWeight="bold" color="ink.700">{s.example}</Td>
                    <Td>
                      <Text
                        as="span"
                        fontSize="xs"
                        fontWeight="bold"
                        color={POSITION_COLORS[s.position]?.text || "gray.700"}
                        bg={POSITION_COLORS[s.position]?.bg || "gray.100"}
                        borderRadius="full"
                        px={2}
                        py={1}
                      >
                        {s.position}
                      </Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Text fontSize="sm" color="gray.500" fontStyle="italic">
              One adverb per sentence, in a different position each time.
            </Text>
          </GameCard>

          {/* Examples with breakdown and pattern */}
          <GameCard variant="game">
            <Heading size="md" color="ink.700" mb={4}>
              Examples in Context
            </Heading>
            <VStack align="stretch" spacing={4}>
              {sentenceStructures.map((s, i) => (
                <Box
                  key={i}
                  bg={POSITION_COLORS[s.position]?.bg || "gray.50"}
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="gray.200"
                  p={4}
                >
                  <Text fontSize="md" fontWeight="bold" color="ink.700" mb={2}>
                    "{s.example}"
                  </Text>
                  <Text
                    fontSize="xs"
                    fontFamily="monospace"
                    color="gray.600"
                    mb={2}
                  >
                    {s.pattern}
                  </Text>
                  <Text fontSize="sm" color="gray.600" display="flex" alignItems="center" gap={2}>
                    <Text
                      as="span"
                      fontSize="xs"
                      fontWeight="bold"
                      color={POSITION_COLORS[s.position]?.text || "gray.700"}
                      bg="white"
                      borderRadius="full"
                      px={2}
                      py={1}
                    >
                      {s.position}
                    </Text>
                    {s.breakdown}
                  </Text>
                </Box>
              ))}
            </VStack>
          </GameCard>

        </VStack>
      </Grid>
    </PageContainer>
  );
};

export default AdverbSentenceStructures;

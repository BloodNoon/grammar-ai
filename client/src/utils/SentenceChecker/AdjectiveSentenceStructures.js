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
    title: "Pronoun + Be Verb + Adjective",
    examples: ["She is happy.", "They are excited."],
  },
  {
    title: "Article + Noun + Be Verb + Adjective",
    examples: ["The car is fast.", "A dog is friendly."],
  },
  {
    title: "Article + Adjective + Noun + Be Verb + Adjective",
    examples: ["The tall building is impressive.", "A sweet cake is delicious."],
  },
  {
    title: "Pronoun + Verb + Preposition + Article + Adjective + Noun",
    examples: ["He walked into a dark room.", "They looked at the beautiful painting."],
  },
  {
    title: "Article + Adjective + Noun + Verb + Article + Adjective + Noun",
    examples: ["The hungry cat chased the small mouse.", "A young boy met a kind teacher."],
  },
];

const AdjectiveSentenceStructures = () => {
  return (
    <PageContainer>
      <LessonPageHeader icon="🐸" title="Adjective Sentence Structures" />
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
              What are Adjective Sentence Structures?
            </Heading>
            <Text fontSize="md" color="gray.600" mb={4}>
              Adjectives describe nouns and can appear in two main
              positions: before the noun (descriptive) or after a "be"
              verb (predicative). Below are five common patterns showing
              adjectives in action.
            </Text>
            <VStack align="stretch" spacing={2}>
              <Box bg="blue.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="blue.700">
                  Descriptive Position
                </Text>
                <Text fontSize="sm" color="gray.600">
                  The adjective comes directly before the noun it
                  describes. Example: the tall building.
                </Text>
              </Box>
              <Box bg="green.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="green.700">
                  Predicative Position
                </Text>
                <Text fontSize="sm" color="gray.600">
                  The adjective follows a "be" verb and describes the
                  subject. Example: the building is tall.
                </Text>
              </Box>
            </VStack>
          </GameCard>

          {/* Pro Tip */}
          <GameCard variant="game">
            <Heading size="md" color="ink.700" mb={3}>
              Pro Tip
            </Heading>
            <Text fontSize="md" color="gray.600">
              Notice how adjectives can come before nouns (descriptive) or
              after "be" verbs (predicative). Both positions are correct
              but serve different purposes in your sentences!
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
                  <Th color="ink.700">Pattern</Th>
                  <Th color="ink.700">Example</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sentenceStructures.map((s, i) => (
                  <Tr key={i} bg={i % 2 === 1 ? "gray.50" : "white"}>
                    <Td fontWeight="bold" color="ink.700" fontSize="xs" fontFamily="monospace">
                      {s.title}
                    </Td>
                    <Td fontWeight="bold" color="green.700">
                      {s.examples[0]}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </GameCard>

          {/* Examples */}
          <GameCard variant="game">
            <Heading size="md" color="ink.700" mb={4}>
              Examples in Context
            </Heading>
            <VStack align="stretch" spacing={4}>
              {sentenceStructures.map((s, i) => (
                <Box
                  key={i}
                  bg="gray.50"
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="gray.200"
                  p={4}
                >
                  <Text
                    fontSize="xs"
                    fontFamily="monospace"
                    color="gray.500"
                    mb={2}
                  >
                    {s.title}
                  </Text>
                  <VStack align="stretch" spacing={1}>
                    {s.examples.map((example, j) => (
                      <Text
                        key={j}
                        fontSize="md"
                        fontStyle="italic"
                        color="ink.700"
                      >
                        • {example}
                      </Text>
                    ))}
                  </VStack>
                </Box>
              ))}
            </VStack>
          </GameCard>

        </VStack>
      </Grid>
    </PageContainer>
  );
};

export default AdjectiveSentenceStructures;

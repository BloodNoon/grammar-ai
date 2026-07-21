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
} from "../components/ui";

const VerbSentenceStructures = () => {
  return (
    <PageContainer>
      <LessonPageHeader icon="🐸" title="Verb Sentence Structures" />
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>

        {/* LEFT COLUMN */}
        <VStack spacing={6} align="stretch">
          <LessonIntroCard
            title="Learn the Lesson"
            directions="Directions: Read the explanation in the boxes, take notes."
          />

          {/* Explanation */}
          <GameCard variant="game">
            <Heading size="lg" color="ink.700" mb={4}>
              What is a Verb Sentence Structure?
            </Heading>
            <Text fontSize="md" color="gray.600" mb={4}>
              A sentence is built from parts that work together to express a
              complete thought. The most fundamental sentence pattern in English
              follows this structure:
            </Text>
            <Box
              bg="gray.50"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="xl"
              p={4}
              textAlign="center"
              mb={4}
            >
              <Text fontSize="xl" fontWeight="bold" color="ink.700" letterSpacing="wide">
                Subject Noun &nbsp;+&nbsp; Verb &nbsp;+&nbsp; Object Noun
              </Text>
            </Box>
            <Text fontSize="md" color="gray.600" mb={2}>
              Each part plays a specific role:
            </Text>
            <VStack align="stretch" spacing={2}>
              <Box bg="blue.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="blue.700">
                  Subject Noun
                </Text>
                <Text fontSize="sm" color="gray.600">
                  The person, place, or thing performing the action.
                </Text>
              </Box>
              <Box bg="green.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="green.700">
                  Verb
                </Text>
                <Text fontSize="sm" color="gray.600">
                  The action being performed in the sentence.
                </Text>
              </Box>
              <Box bg="orange.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="orange.700">
                  Object Noun
                </Text>
                <Text fontSize="sm" color="gray.600">
                  The person, place, or thing receiving the action.
                </Text>
              </Box>
            </VStack>
          </GameCard>
        </VStack>

        {/* RIGHT COLUMN */}
        <VStack spacing={6} align="stretch">

          {/* Pattern Table */}
          <GameCard variant="game">
            <Heading size="md" color="ink.700" mb={4}>
              Sentence Pattern
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
                  <Th color="blue.600">Subject Noun</Th>
                  <Th color="green.600">Verb</Th>
                  <Th color="orange.600">Object Noun</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td fontWeight="bold" color="blue.700">The dog</Td>
                  <Td fontWeight="bold" color="green.700">chases</Td>
                  <Td fontWeight="bold" color="orange.700">the ball.</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="blue.700">The student</Td>
                  <Td fontWeight="bold" color="green.700">reads</Td>
                  <Td fontWeight="bold" color="orange.700">the book.</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="blue.700">The chef</Td>
                  <Td fontWeight="bold" color="green.700">prepares</Td>
                  <Td fontWeight="bold" color="orange.700">the meal.</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="blue.700">The teacher</Td>
                  <Td fontWeight="bold" color="green.700">explains</Td>
                  <Td fontWeight="bold" color="orange.700">the lesson.</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="blue.700">The engineer</Td>
                  <Td fontWeight="bold" color="green.700">builds</Td>
                  <Td fontWeight="bold" color="orange.700">the bridge.</Td>
                </Tr>
              </Tbody>
            </Table>
            <Text fontSize="sm" color="gray.500" fontStyle="italic">
              Notice how each sentence follows the same pattern: who is doing
              it, what they are doing, and what they are doing it to.
            </Text>
          </GameCard>

          {/* Examples */}
          <GameCard variant="game">
            <Heading size="md" color="ink.700" mb={4}>
              Examples in Context
            </Heading>
            <VStack align="stretch" spacing={4}>
              {[
                {
                  sentence: "The cat chases the mouse.",
                  subject: "The cat",
                  verb: "chases",
                  object: "the mouse",
                },
                {
                  sentence: "Maria writes a letter.",
                  subject: "Maria",
                  verb: "writes",
                  object: "a letter",
                },
                {
                  sentence: "The pilot flies the plane.",
                  subject: "The pilot",
                  verb: "flies",
                  object: "the plane",
                },
              ].map((ex, i) => (
                <Box
                  key={i}
                  bg="gray.50"
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="gray.200"
                  p={4}
                >
                  <Text fontSize="md" fontWeight="bold" color="ink.700" mb={2}>
                    "{ex.sentence}"
                  </Text>
                  <Grid templateColumns="1fr 1fr 1fr" gap={2}>
                    <Box textAlign="center">
                      <Text fontSize="xs" color="blue.600" fontWeight="bold" mb={1}>
                        SUBJECT
                      </Text>
                      <Box bg="blue.50" borderRadius="md" px={2} py={1}>
                        <Text fontSize="sm" color="blue.700" fontWeight="bold">
                          {ex.subject}
                        </Text>
                      </Box>
                    </Box>
                    <Box textAlign="center">
                      <Text fontSize="xs" color="green.600" fontWeight="bold" mb={1}>
                        VERB
                      </Text>
                      <Box bg="green.50" borderRadius="md" px={2} py={1}>
                        <Text fontSize="sm" color="green.700" fontWeight="bold">
                          {ex.verb}
                        </Text>
                      </Box>
                    </Box>
                    <Box textAlign="center">
                      <Text fontSize="xs" color="orange.600" fontWeight="bold" mb={1}>
                        OBJECT
                      </Text>
                      <Box bg="orange.50" borderRadius="md" px={2} py={1}>
                        <Text fontSize="sm" color="orange.700" fontWeight="bold">
                          {ex.object}
                        </Text>
                      </Box>
                    </Box>
                  </Grid>
                </Box>
              ))}
            </VStack>
          </GameCard>

        </VStack>
      </Grid>
    </PageContainer>
  );
};

export default VerbSentenceStructures;

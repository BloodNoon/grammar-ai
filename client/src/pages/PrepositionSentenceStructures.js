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

const PrepositionSentenceStructures = () => {
  return (
    <PageContainer>
      <LessonPageHeader icon="🐸" title="Preposition Sentence Structures" />
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
              What is a Preposition Sentence Structure?
            </Heading>
            <Text fontSize="md" color="gray.600" mb={4}>
              Prepositions are words that show how a noun relates to
              another word in the sentence — often showing location,
              direction, or time. The most common sentence pattern using a
              preposition follows this structure:
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
                Subject &nbsp;+&nbsp; Verb &nbsp;+&nbsp; Preposition &nbsp;+&nbsp; Article &nbsp;+&nbsp; Object Noun
              </Text>
            </Box>
            <Text fontSize="md" color="gray.600" mb={2}>
              Each part plays a specific role:
            </Text>
            <VStack align="stretch" spacing={2}>
              <Box bg="blue.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="blue.700">
                  Subject
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
              <Box bg="pink.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="pink.700">
                  Preposition
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Shows the relationship between the verb and the object
                  noun, such as location or direction (on, in, under, near).
                </Text>
              </Box>
              <Box bg="blue.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="blue.700">
                  Article
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Introduces the object noun. Use a, an, or the.
                </Text>
              </Box>
              <Box bg="orange.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="orange.700">
                  Object Noun
                </Text>
                <Text fontSize="sm" color="gray.600">
                  The person, place, or thing the preposition is relating
                  to.
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
                  <Th color="blue.600">Subject</Th>
                  <Th color="green.600">Verb</Th>
                  <Th color="pink.600">Preposition</Th>
                  <Th color="blue.600">Article</Th>
                  <Th color="orange.600">Object Noun</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td fontWeight="bold" color="blue.700">The cat</Td>
                  <Td fontWeight="bold" color="green.700">sat</Td>
                  <Td fontWeight="bold" color="pink.700">on</Td>
                  <Td fontWeight="bold" color="blue.700">the</Td>
                  <Td fontWeight="bold" color="orange.700">mat.</Td>
                </Tr>
                <Tr bg="gray.50">
                  <Td fontWeight="bold" color="blue.700">The keys</Td>
                  <Td fontWeight="bold" color="green.700">are</Td>
                  <Td fontWeight="bold" color="pink.700">in</Td>
                  <Td fontWeight="bold" color="blue.700">the</Td>
                  <Td fontWeight="bold" color="orange.700">drawer.</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="blue.700">The dog</Td>
                  <Td fontWeight="bold" color="green.700">hid</Td>
                  <Td fontWeight="bold" color="pink.700">under</Td>
                  <Td fontWeight="bold" color="blue.700">the</Td>
                  <Td fontWeight="bold" color="orange.700">table.</Td>
                </Tr>
                <Tr bg="gray.50">
                  <Td fontWeight="bold" color="blue.700">She</Td>
                  <Td fontWeight="bold" color="green.700">walked</Td>
                  <Td fontWeight="bold" color="pink.700">to</Td>
                  <Td fontWeight="bold" color="blue.700">the</Td>
                  <Td fontWeight="bold" color="orange.700">store.</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="blue.700">The book</Td>
                  <Td fontWeight="bold" color="green.700">is</Td>
                  <Td fontWeight="bold" color="pink.700">near</Td>
                  <Td fontWeight="bold" color="blue.700">the</Td>
                  <Td fontWeight="bold" color="orange.700">window.</Td>
                </Tr>
              </Tbody>
            </Table>
            <Text fontSize="sm" color="gray.500" fontStyle="italic">
              Notice how the preposition connects the action to where, or
              in relation to what, it happens.
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
                  sentence: "The cat sat on the mat.",
                  subject: "The cat",
                  verb: "sat",
                  prep: "on",
                  object: "the mat",
                },
                {
                  sentence: "The dog hid under the table.",
                  subject: "The dog",
                  verb: "hid",
                  prep: "under",
                  object: "the table",
                },
                {
                  sentence: "She walked to the store.",
                  subject: "She",
                  verb: "walked",
                  prep: "to",
                  object: "the store",
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
                  <Grid templateColumns="1fr 1fr 1fr 1fr" gap={2}>
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
                      <Text fontSize="xs" color="pink.600" fontWeight="bold" mb={1}>
                        PREPOSITION
                      </Text>
                      <Box bg="pink.50" borderRadius="md" px={2} py={1}>
                        <Text fontSize="sm" color="pink.700" fontWeight="bold">
                          {ex.prep}
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

export default PrepositionSentenceStructures;

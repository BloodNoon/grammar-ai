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

const ConjunctionSentenceStructures = () => {
  return (
    <PageContainer>
      <LessonPageHeader icon="🐸" title="Conjunction Sentence Structures" />
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
              What are Conjunction Sentence Structures?
            </Heading>
            <Text fontSize="md" color="gray.600" mb={4}>
              Conjunctions are words that connect other words, phrases, or
              clauses. They help combine short, choppy sentences into
              longer, clearer ones. There are two key patterns to learn:
            </Text>
            <VStack align="stretch" spacing={3}>
              <Box
                bg="purple.50"
                borderRadius="xl"
                p={4}
                border="1px solid"
                borderColor="purple.100"
              >
                <Text fontSize="sm" fontWeight="bold" color="purple.700" mb={1}>
                  Pattern 1
                </Text>
                <Text fontSize="md" fontWeight="bold" color="ink.700">
                  Independent Clause + Coordinating Conjunction + Independent Clause
                </Text>
                <Text fontSize="sm" color="gray.500" mt={1}>
                  Joins two complete sentences using a FANBOYS word (for,
                  and, nor, but, or, yet, so).
                </Text>
              </Box>
              <Box
                bg="teal.50"
                borderRadius="xl"
                p={4}
                border="1px solid"
                borderColor="teal.100"
              >
                <Text fontSize="sm" fontWeight="bold" color="teal.700" mb={1}>
                  Pattern 2
                </Text>
                <Text fontSize="md" fontWeight="bold" color="ink.700">
                  Subordinating Conjunction + Dependent Clause, + Independent Clause
                </Text>
                <Text fontSize="sm" color="gray.500" mt={1}>
                  Joins a dependent clause to an independent clause using a
                  word like because, although, or when.
                </Text>
              </Box>
            </VStack>
          </GameCard>

          {/* Pattern 1 Explanation */}
          <GameCard variant="game">
            <Heading size="md" color="purple.600" mb={3}>
              Pattern 1 — Coordinating Conjunctions
            </Heading>
            <Text fontSize="md" color="gray.600" mb={4}>
              Coordinating conjunctions connect two independent clauses —
              two groups of words that could each stand alone as their own
              sentence. Remember them with FANBOYS: for, and, nor, but, or,
              yet, so.
            </Text>
            <VStack align="stretch" spacing={2} mb={4}>
              <Box bg="blue.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="blue.700">
                  Independent Clause
                </Text>
                <Text fontSize="sm" color="gray.600">
                  A complete thought that could stand alone as a sentence.
                </Text>
              </Box>
              <Box bg="green.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="green.700">
                  Coordinating Conjunction
                </Text>
                <Text fontSize="sm" color="gray.600">
                  A FANBOYS word joining the two clauses (for, and, nor,
                  but, or, yet, so).
                </Text>
              </Box>
              <Box bg="orange.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="orange.700">
                  Independent Clause
                </Text>
                <Text fontSize="sm" color="gray.600">
                  A second complete thought that could also stand alone.
                </Text>
              </Box>
            </VStack>
          </GameCard>

          {/* Pattern 2 Explanation */}
          <GameCard variant="game">
            <Heading size="md" color="teal.600" mb={3}>
              Pattern 2 — Subordinating Conjunctions
            </Heading>
            <Text fontSize="md" color="gray.600" mb={4}>
              Subordinating conjunctions connect a dependent clause (a group
              of words that can't stand alone) to an independent clause.
              Common ones include because, although, since, when, if, and
              while.
            </Text>
            <VStack align="stretch" spacing={2}>
              <Box bg="pink.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="pink.700">
                  Subordinating Conjunction
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Begins the dependent clause. Example: because, although,
                  when.
                </Text>
              </Box>
              <Box bg="blue.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="blue.700">
                  Dependent Clause
                </Text>
                <Text fontSize="sm" color="gray.600">
                  A group of words that cannot stand alone as a complete
                  sentence.
                </Text>
              </Box>
              <Box bg="orange.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="orange.700">
                  Independent Clause
                </Text>
                <Text fontSize="sm" color="gray.600">
                  A complete thought that finishes the sentence.
                </Text>
              </Box>
            </VStack>
          </GameCard>
        </VStack>

        {/* RIGHT COLUMN */}
        <VStack spacing={6} align="stretch">

          {/* Pattern 1 Table */}
          <GameCard variant="game">
            <Heading size="md" color="purple.600" mb={4}>
              Pattern 1 — Sentence Table
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
                  <Th color="blue.600">Independent Clause</Th>
                  <Th color="green.600">Conjunction</Th>
                  <Th color="orange.600">Independent Clause</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td fontWeight="bold" color="blue.700">I wanted to go outside</Td>
                  <Td fontWeight="bold" color="green.700">but</Td>
                  <Td fontWeight="bold" color="orange.700">it was raining.</Td>
                </Tr>
                <Tr bg="gray.50">
                  <Td fontWeight="bold" color="blue.700">She studied all night</Td>
                  <Td fontWeight="bold" color="green.700">so</Td>
                  <Td fontWeight="bold" color="orange.700">she passed the test.</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="blue.700">He likes tea</Td>
                  <Td fontWeight="bold" color="green.700">and</Td>
                  <Td fontWeight="bold" color="orange.700">he likes coffee.</Td>
                </Tr>
                <Tr bg="gray.50">
                  <Td fontWeight="bold" color="blue.700">We could stay home</Td>
                  <Td fontWeight="bold" color="green.700">or</Td>
                  <Td fontWeight="bold" color="orange.700">we could go to the park.</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="blue.700">The movie was long</Td>
                  <Td fontWeight="bold" color="green.700">yet</Td>
                  <Td fontWeight="bold" color="orange.700">it was interesting.</Td>
                </Tr>
              </Tbody>
            </Table>

            <Heading size="sm" color="ink.700" mb={3}>
              Examples in Context
            </Heading>
            <VStack align="stretch" spacing={3}>
              {[
                { sentence: "I wanted to go outside, but it was raining.", clause1: "I wanted to go outside", conj: "but", clause2: "it was raining" },
                { sentence: "She studied all night, so she passed the test.", clause1: "She studied all night", conj: "so", clause2: "she passed the test" },
              ].map((ex, i) => (
                <Box key={i} bg="gray.50" borderRadius="xl" borderWidth="1px" borderColor="gray.200" p={3}>
                  <Text fontSize="sm" fontWeight="bold" color="ink.700" mb={2}>
                    "{ex.sentence}"
                  </Text>
                  <Grid templateColumns="1fr 1fr 1fr" gap={2}>
                    <Box textAlign="center">
                      <Text fontSize="xs" color="blue.600" fontWeight="bold" mb={1}>CLAUSE 1</Text>
                      <Box bg="blue.50" borderRadius="md" px={2} py={1}>
                        <Text fontSize="sm" color="blue.700" fontWeight="bold">{ex.clause1}</Text>
                      </Box>
                    </Box>
                    <Box textAlign="center">
                      <Text fontSize="xs" color="green.600" fontWeight="bold" mb={1}>CONJUNCTION</Text>
                      <Box bg="green.50" borderRadius="md" px={2} py={1}>
                        <Text fontSize="sm" color="green.700" fontWeight="bold">{ex.conj}</Text>
                      </Box>
                    </Box>
                    <Box textAlign="center">
                      <Text fontSize="xs" color="orange.600" fontWeight="bold" mb={1}>CLAUSE 2</Text>
                      <Box bg="orange.50" borderRadius="md" px={2} py={1}>
                        <Text fontSize="sm" color="orange.700" fontWeight="bold">{ex.clause2}</Text>
                      </Box>
                    </Box>
                  </Grid>
                </Box>
              ))}
            </VStack>
          </GameCard>

          {/* Pattern 2 Table */}
          <GameCard variant="game">
            <Heading size="md" color="teal.600" mb={4}>
              Pattern 2 — Sentence Table
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
                  <Th color="pink.600">Conjunction</Th>
                  <Th color="blue.600">Dependent Clause</Th>
                  <Th color="orange.600">Independent Clause</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td fontWeight="bold" color="pink.700">Because</Td>
                  <Td fontWeight="bold" color="blue.700">it was raining,</Td>
                  <Td fontWeight="bold" color="orange.700">I stayed home.</Td>
                </Tr>
                <Tr bg="gray.50">
                  <Td fontWeight="bold" color="pink.700">Although</Td>
                  <Td fontWeight="bold" color="blue.700">she was tired,</Td>
                  <Td fontWeight="bold" color="orange.700">she finished her homework.</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="pink.700">When</Td>
                  <Td fontWeight="bold" color="blue.700">the bell rang,</Td>
                  <Td fontWeight="bold" color="orange.700">the students left the room.</Td>
                </Tr>
                <Tr bg="gray.50">
                  <Td fontWeight="bold" color="pink.700">If</Td>
                  <Td fontWeight="bold" color="blue.700">you study hard,</Td>
                  <Td fontWeight="bold" color="orange.700">you will pass the exam.</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="pink.700">While</Td>
                  <Td fontWeight="bold" color="blue.700">he cooked dinner,</Td>
                  <Td fontWeight="bold" color="orange.700">she set the table.</Td>
                </Tr>
              </Tbody>
            </Table>

            <Heading size="sm" color="ink.700" mb={3}>
              Examples in Context
            </Heading>
            <VStack align="stretch" spacing={3}>
              {[
                { sentence: "Because it was raining, I stayed home.", conj: "Because", dep: "it was raining", indep: "I stayed home" },
                { sentence: "When the bell rang, the students left the room.", conj: "When", dep: "the bell rang", indep: "the students left the room" },
              ].map((ex, i) => (
                <Box key={i} bg="gray.50" borderRadius="xl" borderWidth="1px" borderColor="gray.200" p={3}>
                  <Text fontSize="sm" fontWeight="bold" color="ink.700" mb={2}>
                    "{ex.sentence}"
                  </Text>
                  <Grid templateColumns="1fr 1fr 1fr" gap={2}>
                    <Box textAlign="center">
                      <Text fontSize="xs" color="pink.600" fontWeight="bold" mb={1}>CONJUNCTION</Text>
                      <Box bg="pink.50" borderRadius="md" px={2} py={1}>
                        <Text fontSize="sm" color="pink.700" fontWeight="bold">{ex.conj}</Text>
                      </Box>
                    </Box>
                    <Box textAlign="center">
                      <Text fontSize="xs" color="blue.600" fontWeight="bold" mb={1}>DEPENDENT</Text>
                      <Box bg="blue.50" borderRadius="md" px={2} py={1}>
                        <Text fontSize="sm" color="blue.700" fontWeight="bold">{ex.dep}</Text>
                      </Box>
                    </Box>
                    <Box textAlign="center">
                      <Text fontSize="xs" color="orange.600" fontWeight="bold" mb={1}>INDEPENDENT</Text>
                      <Box bg="orange.50" borderRadius="md" px={2} py={1}>
                        <Text fontSize="sm" color="orange.700" fontWeight="bold">{ex.indep}</Text>
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

export default ConjunctionSentenceStructures;

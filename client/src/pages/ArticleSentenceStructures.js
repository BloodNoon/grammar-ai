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

const ArticleSentenceStructures = () => {
  return (
    <PageContainer>
      <LessonPageHeader icon="🐸" title="Article Sentence Structures" />
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
              What are Article Sentence Structures?
            </Heading>
            <Text fontSize="md" color="gray.600" mb={4}>
              Articles (a, an, the) are small but essential words that
              introduce nouns in a sentence. When combined with pronouns,
              verbs, and nouns, they create clear and natural-sounding
              sentences. There are two key patterns to learn:
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
                  Pronoun + Verb + Article + Object Noun
                </Text>
                <Text fontSize="sm" color="gray.500" mt={1}>
                  The subject is replaced by a pronoun.
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
                  Article + Subject Noun + Verb + Article + Object Noun
                </Text>
                <Text fontSize="sm" color="gray.500" mt={1}>
                  Both the subject and object are introduced by articles.
                </Text>
              </Box>
            </VStack>
          </GameCard>

          {/* Pattern 1 Explanation */}
          <GameCard variant="game">
            <Heading size="md" color="purple.600" mb={3}>
              Pattern 1 — Pronoun + Verb + Article + Object Noun
            </Heading>
            <Text fontSize="md" color="gray.600" mb={4}>
              In this pattern, the subject is a pronoun (he, she, they, it,
              we, I, you). The object is introduced by an article (a, an,
              or the).
            </Text>
            <VStack align="stretch" spacing={2} mb={4}>
              <Box bg="pink.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="pink.700">Pronoun</Text>
                <Text fontSize="sm" color="gray.600">Replaces the subject noun. Example: He, She, They</Text>
              </Box>
              <Box bg="green.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="green.700">Verb</Text>
                <Text fontSize="sm" color="gray.600">The action being performed.</Text>
              </Box>
              <Box bg="blue.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="blue.700">Article</Text>
                <Text fontSize="sm" color="gray.600">Introduces the object noun. Use a, an, or the.</Text>
              </Box>
              <Box bg="orange.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="orange.700">Object Noun</Text>
                <Text fontSize="sm" color="gray.600">The thing receiving the action.</Text>
              </Box>
            </VStack>
          </GameCard>

          {/* Pattern 2 Explanation */}
          <GameCard variant="game">
            <Heading size="md" color="teal.600" mb={3}>
              Pattern 2 — Article + Subject Noun + Verb + Article + Object Noun
            </Heading>
            <Text fontSize="md" color="gray.600" mb={4}>
              In this pattern, both the subject and the object are nouns
              introduced by articles. This is one of the most common sentence
              structures in English.
            </Text>
            <VStack align="stretch" spacing={2}>
              <Box bg="blue.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="blue.700">Article (1st)</Text>
                <Text fontSize="sm" color="gray.600">Introduces the subject noun. Example: The, A, An</Text>
              </Box>
              <Box bg="teal.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="teal.700">Subject Noun</Text>
                <Text fontSize="sm" color="gray.600">The person, place, or thing performing the action.</Text>
              </Box>
              <Box bg="green.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="green.700">Verb</Text>
                <Text fontSize="sm" color="gray.600">The action being performed.</Text>
              </Box>
              <Box bg="blue.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="blue.700">Article (2nd)</Text>
                <Text fontSize="sm" color="gray.600">Introduces the object noun. Example: The, A, An</Text>
              </Box>
              <Box bg="orange.50" borderRadius="lg" p={3}>
                <Text fontSize="sm" fontWeight="bold" color="orange.700">Object Noun</Text>
                <Text fontSize="sm" color="gray.600">The thing receiving the action.</Text>
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
                  <Th color="pink.600">Pronoun</Th>
                  <Th color="green.600">Verb</Th>
                  <Th color="blue.600">Article</Th>
                  <Th color="orange.600">Object Noun</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td fontWeight="bold" color="pink.700">She</Td>
                  <Td fontWeight="bold" color="green.700">reads</Td>
                  <Td fontWeight="bold" color="blue.700">a</Td>
                  <Td fontWeight="bold" color="orange.700">book.</Td>
                </Tr>
                <Tr bg="gray.50">
                  <Td fontWeight="bold" color="pink.700">He</Td>
                  <Td fontWeight="bold" color="green.700">rides</Td>
                  <Td fontWeight="bold" color="blue.700">a</Td>
                  <Td fontWeight="bold" color="orange.700">bike.</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="pink.700">They</Td>
                  <Td fontWeight="bold" color="green.700">watch</Td>
                  <Td fontWeight="bold" color="blue.700">a</Td>
                  <Td fontWeight="bold" color="orange.700">movie.</Td>
                </Tr>
                <Tr bg="gray.50">
                  <Td fontWeight="bold" color="pink.700">We</Td>
                  <Td fontWeight="bold" color="green.700">visit</Td>
                  <Td fontWeight="bold" color="blue.700">the</Td>
                  <Td fontWeight="bold" color="orange.700">museum.</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="pink.700">I</Td>
                  <Td fontWeight="bold" color="green.700">buy</Td>
                  <Td fontWeight="bold" color="blue.700">an</Td>
                  <Td fontWeight="bold" color="orange.700">apple.</Td>
                </Tr>
              </Tbody>
            </Table>

            {/* Pattern 1 Examples */}
            <Heading size="sm" color="ink.700" mb={3}>
              Examples in Context
            </Heading>
            <VStack align="stretch" spacing={3}>
              {[
                { sentence: "She reads a book.", pronoun: "She", verb: "reads", article: "a", object: "book" },
                { sentence: "He rides a bike.", pronoun: "He", verb: "rides", article: "a", object: "bike" },
                { sentence: "They watch a movie.", pronoun: "They", verb: "watch", article: "a", object: "movie" },
              ].map((ex, i) => (
                <Box key={i} bg="gray.50" borderRadius="xl" borderWidth="1px" borderColor="gray.200" p={3}>
                  <Text fontSize="sm" fontWeight="bold" color="ink.700" mb={2}>
                    "{ex.sentence}"
                  </Text>
                  <Grid templateColumns="1fr 1fr 1fr 1fr" gap={1}>
                    <Box textAlign="center">
                      <Text fontSize="9px" color="pink.600" fontWeight="bold" mb={1}>PRONOUN</Text>
                      <Box bg="pink.50" borderRadius="md" px={1} py={1}>
                        <Text fontSize="10px" color="pink.700" fontWeight="bold">{ex.pronoun}</Text>
                      </Box>
                    </Box>
                    <Box textAlign="center">
                      <Text fontSize="9px" color="green.600" fontWeight="bold" mb={1}>VERB</Text>
                      <Box bg="green.50" borderRadius="md" px={1} py={1}>
                        <Text fontSize="10px" color="green.700" fontWeight="bold">{ex.verb}</Text>
                      </Box>
                    </Box>
                    <Box textAlign="center">
                      <Text fontSize="9px" color="blue.600" fontWeight="bold" mb={1}>ARTICLE</Text>
                      <Box bg="blue.50" borderRadius="md" px={1} py={1}>
                        <Text fontSize="10px" color="blue.700" fontWeight="bold">{ex.article}</Text>
                      </Box>
                    </Box>
                    <Box textAlign="center">
                      <Text fontSize="9px" color="orange.600" fontWeight="bold" mb={1}>OBJECT</Text>
                      <Box bg="orange.50" borderRadius="md" px={1} py={1}>
                        <Text fontSize="10px" color="orange.700" fontWeight="bold">{ex.object}</Text>
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
                  <Th color="blue.600">Article</Th>
                  <Th color="teal.600">Subject Noun</Th>
                  <Th color="green.600">Verb</Th>
                  <Th color="blue.600">Article</Th>
                  <Th color="orange.600">Object Noun</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td fontWeight="bold" color="blue.700">The</Td>
                  <Td fontWeight="bold" color="teal.700">cat</Td>
                  <Td fontWeight="bold" color="green.700">chases</Td>
                  <Td fontWeight="bold" color="blue.700">the</Td>
                  <Td fontWeight="bold" color="orange.700">mouse.</Td>
                </Tr>
                <Tr bg="gray.50">
                  <Td fontWeight="bold" color="blue.700">A</Td>
                  <Td fontWeight="bold" color="teal.700">dog</Td>
                  <Td fontWeight="bold" color="green.700">buries</Td>
                  <Td fontWeight="bold" color="blue.700">a</Td>
                  <Td fontWeight="bold" color="orange.700">bone.</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="blue.700">The</Td>
                  <Td fontWeight="bold" color="teal.700">teacher</Td>
                  <Td fontWeight="bold" color="green.700">grades</Td>
                  <Td fontWeight="bold" color="blue.700">the</Td>
                  <Td fontWeight="bold" color="orange.700">papers.</Td>
                </Tr>
                <Tr bg="gray.50">
                  <Td fontWeight="bold" color="blue.700">A</Td>
                  <Td fontWeight="bold" color="teal.700">bird</Td>
                  <Td fontWeight="bold" color="green.700">builds</Td>
                  <Td fontWeight="bold" color="blue.700">a</Td>
                  <Td fontWeight="bold" color="orange.700">nest.</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold" color="blue.700">The</Td>
                  <Td fontWeight="bold" color="teal.700">chef</Td>
                  <Td fontWeight="bold" color="green.700">cooks</Td>
                  <Td fontWeight="bold" color="blue.700">a</Td>
                  <Td fontWeight="bold" color="orange.700">meal.</Td>
                </Tr>
              </Tbody>
            </Table>

            {/* Pattern 2 Examples */}
            <Heading size="sm" color="ink.700" mb={3}>
              Examples in Context
            </Heading>
            <VStack align="stretch" spacing={3}>
              {[
                { sentence: "The cat chases the mouse.", article1: "The", subject: "cat", verb: "chases", article2: "the", object: "mouse" },
                { sentence: "A bird builds a nest.", article1: "A", subject: "bird", verb: "builds", article2: "a", object: "nest" },
                { sentence: "The chef cooks a meal.", article1: "The", subject: "chef", verb: "cooks", article2: "a", object: "meal" },
              ].map((ex, i) => (
                <Box key={i} bg="gray.50" borderRadius="xl" borderWidth="1px" borderColor="gray.200" p={3}>
                  <Text fontSize="sm" fontWeight="bold" color="ink.700" mb={2}>
                    "{ex.sentence}"
                  </Text>
                  <Grid templateColumns="1fr 1fr 1fr 1fr 1fr" gap={1}>
                    <Box textAlign="center">
                      <Text fontSize="9px" color="blue.600" fontWeight="bold" mb={1}>ART.</Text>
                      <Box bg="blue.50" borderRadius="md" px={1} py={1}>
                        <Text fontSize="10px" color="blue.700" fontWeight="bold">{ex.article1}</Text>
                      </Box>
                    </Box>
                    <Box textAlign="center">
                      <Text fontSize="9px" color="teal.600" fontWeight="bold" mb={1}>SUBJECT</Text>
                      <Box bg="teal.50" borderRadius="md" px={1} py={1}>
                        <Text fontSize="10px" color="teal.700" fontWeight="bold">{ex.subject}</Text>
                      </Box>
                    </Box>
                    <Box textAlign="center">
                      <Text fontSize="9px" color="green.600" fontWeight="bold" mb={1}>VERB</Text>
                      <Box bg="green.50" borderRadius="md" px={1} py={1}>
                        <Text fontSize="10px" color="green.700" fontWeight="bold">{ex.verb}</Text>
                      </Box>
                    </Box>
                    <Box textAlign="center">
                      <Text fontSize="9px" color="blue.600" fontWeight="bold" mb={1}>ART.</Text>
                      <Box bg="blue.50" borderRadius="md" px={1} py={1}>
                        <Text fontSize="10px" color="blue.700" fontWeight="bold">{ex.article2}</Text>
                      </Box>
                    </Box>
                    <Box textAlign="center">
                      <Text fontSize="9px" color="orange.600" fontWeight="bold" mb={1}>OBJECT</Text>
                      <Box bg="orange.50" borderRadius="md" px={1} py={1}>
                        <Text fontSize="10px" color="orange.700" fontWeight="bold">{ex.object}</Text>
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

export default ArticleSentenceStructures;

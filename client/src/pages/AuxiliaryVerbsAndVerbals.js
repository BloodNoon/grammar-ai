import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Grid,
  Table,
  Tbody,
  Tr,
  Td,
  Th,
  Thead,
} from "@chakra-ui/react";
import {
  PageContainer,
  GameCard,
  LessonIntroCard,
  LessonPageHeader,
} from "../components/ui";

const AuxiliaryVerbsAndVerbals = () => {
  return (
    <PageContainer>
      <LessonPageHeader icon="📘" title="Auxiliary Verbs and Verbals" />

      <LessonIntroCard
        title="Learn the Lesson"
        directions="Directions: Read the explanation in each section, take notes, and study the examples carefully."
      />

      <VStack spacing={8} mt={8} align="stretch">

        
        <GameCard variant="game">
          <Heading size="lg" color="cyan.600" mb={3}>
            1. Auxiliary Verbs
          </Heading>
          <Text fontSize="md" color="gray.600" mb={5}>
            <strong>Auxiliary verbs</strong> (also called helping verbs) work
            alongside a main verb to express tense, mood, voice, or modal
            meaning such as ability, possibility, or obligation. They never
            stand alone as the main action of a sentence.
          </Text>

          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6} mb={5}>
            <Table size="sm" variant="simple" border="1px solid" borderColor="gray.200">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Primary Auxiliaries</Th>
                  <Th>Use</Th>
                  <Th>Example</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td fontWeight="bold">be / is / am / are / was / were</Td>
                  <Td>Continuous & passive</Td>
                  <Td>She <em>is running</em>.</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">have / has / had</Td>
                  <Td>Perfect tenses</Td>
                  <Td>He <em>has finished</em>.</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">do / does / did</Td>
                  <Td>Questions & negatives</Td>
                  <Td>I <em>do understand</em>.</Td>
                </Tr>
              </Tbody>
            </Table>

            <Table size="sm" variant="simple" border="1px solid" borderColor="gray.200">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Modal Auxiliaries</Th>
                  <Th>Use</Th>
                  <Th>Example</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td fontWeight="bold">can / could</Td>
                  <Td>Ability / possibility</Td>
                  <Td>She <em>can</em> swim.</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">will / would</Td>
                  <Td>Future / conditional</Td>
                  <Td>He <em>will</em> arrive.</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">shall / should</Td>
                  <Td>Obligation / advice</Td>
                  <Td>You <em>should</em> study.</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">may / might</Td>
                  <Td>Permission / uncertainty</Td>
                  <Td>It <em>might</em> rain.</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">must / ought to</Td>
                  <Td>Necessity / duty</Td>
                  <Td>You <em>must</em> go.</Td>
                </Tr>
              </Tbody>
            </Table>
          </Grid>

          <Box p={4} bg="cyan.50" borderRadius="xl" border="1px solid" borderColor="cyan.200">
            <Heading size="xs" color="cyan.700" mb={2}>💡 Quick Tips</Heading>
            <VStack align="start" spacing={1} fontSize="xs" color="gray.700">
              <Text>• Modal auxiliaries never change form — no "cans" or "wills."</Text>
              <Text>• They are always followed by a bare infinitive: "You <strong>must go</strong>."</Text>
              <Text>• A sentence can have more than one auxiliary: "She <strong>will have been</strong> waiting."</Text>
              <Text>• "Have/has/had" as auxiliaries form perfect tenses, not just possession.</Text>
            </VStack>
          </Box>
        </GameCard>

        
        <Box>
          <Heading size="md" color="gray.600" mb={4} pl={1}>
            2. Verbals — Gerunds &amp; Infinitives
          </Heading>
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>

            {/* GERUNDS */}
            <GameCard variant="game">
              <Heading size="md" color="green.600" mb={3}>
                Gerunds
              </Heading>
              <Text fontSize="md" color="gray.600" mb={4}>
                A <strong>gerund</strong> is a verb form ending in{" "}
                <strong>-ing</strong> that functions as a <strong>noun</strong>{" "}
                in a sentence.
              </Text>

              <Table size="sm" variant="simple" border="1px solid" borderColor="gray.200" mb={4}>
                <Thead bg="gray.50">
                  <Tr>
                    <Th>Role</Th>
                    <Th>Example</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td fontWeight="bold">Subject</Td>
                    <Td><em>Swimming</em> is great exercise.</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Object</Td>
                    <Td>She enjoys <em>reading</em>.</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Complement</Td>
                    <Td>His hobby is <em>painting</em>.</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Object of Preposition</Td>
                    <Td>He is good at <em>cooking</em>.</Td>
                  </Tr>
                </Tbody>
              </Table>

              <Box p={3} bg="green.50" borderRadius="xl" border="1px solid" borderColor="green.200">
                <Heading size="xs" color="green.700" mb={2}>💡 Quick Tips</Heading>
                <VStack align="start" spacing={1} fontSize="xs" color="gray.700">
                  <Text>• Gerunds look like present participles but act as nouns.</Text>
                  <Text>• They can follow prepositions: "She is good at <strong>learning</strong>."</Text>
                  <Text>• Common verbs followed by gerunds: enjoy, avoid, consider, suggest.</Text>
                </VStack>
              </Box>
            </GameCard>

            {/* INFINITIVES */}
            <GameCard variant="game">
              <Heading size="md" color="purple.600" mb={3}>
                Infinitives
              </Heading>
              <Text fontSize="md" color="gray.600" mb={4}>
                An <strong>infinitive</strong> is the base form of a verb,
                usually preceded by <strong>to</strong>. It can function as a
                noun, adjective, or adverb.
              </Text>

              <Table size="sm" variant="simple" border="1px solid" borderColor="gray.200" mb={4}>
                <Thead bg="gray.50">
                  <Tr>
                    <Th>Role</Th>
                    <Th>Example</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td fontWeight="bold">Noun (Subject)</Td>
                    <Td><em>To travel</em> is her dream.</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Noun (Object)</Td>
                    <Td>He wants <em>to learn</em>.</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Adjective</Td>
                    <Td>She needs a book <em>to read</em>.</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Adverb</Td>
                    <Td>They came <em>to help</em>.</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Bare Infinitive</Td>
                    <Td>Let him <em>speak</em>. (no "to")</Td>
                  </Tr>
                </Tbody>
              </Table>

              <Box p={3} bg="purple.50" borderRadius="xl" border="1px solid" borderColor="purple.200">
                <Heading size="xs" color="purple.700" mb={2}>💡 Quick Tips</Heading>
                <VStack align="start" spacing={1} fontSize="xs" color="gray.700">
                  <Text>• Most infinitives use "to": <strong>to run</strong>, <strong>to eat</strong>.</Text>
                  <Text>• Bare infinitives follow modal verbs: "She <strong>can swim</strong>."</Text>
                  <Text>• Avoid splitting infinitives in formal writing.</Text>
                </VStack>
              </Box>
            </GameCard>

          </Grid>
        </Box>

                  
        <Box>
          <Heading size="md" color="gray.600" mb={4} pl={1}>
            3. Participles
          </Heading>
          <Text fontSize="md" color="gray.500" mb={5} pl={1}>
            A <strong>participle</strong> is a verb form that functions as an
            adjective or as part of a verb phrase. There are three types:
            Present, Past, and Perfect.
          </Text>

          <VStack spacing={6} align="stretch">

            {/* PRESENT PARTICIPLE */}
            <GameCard variant="game">
              <Heading size="md" color="orange.500" mb={3}>
                Present Participle
              </Heading>
              <Text fontSize="md" color="gray.600" mb={4}>
                Formed by adding <strong>-ing</strong> to the base verb. Used to
                describe an ongoing action or to modify a noun.
              </Text>
              <Table size="sm" variant="simple" border="1px solid" borderColor="gray.200" mb={4}>
                <Thead bg="gray.50">
                  <Tr>
                    <Th>Use</Th>
                    <Th>Example</Th>
                    <Th>Note</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td fontWeight="bold">As adjective</Td>
                    <Td>The <em>running</em> water was cold.</Td>
                    <Td>Modifies "water"</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">In verb phrase</Td>
                    <Td>She is <em>singing</em> a song.</Td>
                    <Td>Part of continuous tense</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Participial phrase</Td>
                    <Td><em>Running fast</em>, he caught the bus.</Td>
                    <Td>Modifies "he"</Td>
                  </Tr>
                </Tbody>
              </Table>
              <Box p={3} bg="orange.50" borderRadius="xl" border="1px solid" borderColor="orange.200">
                <Heading size="xs" color="orange.700" mb={2}>💡 Quick Tips</Heading>
                <VStack align="start" spacing={1} fontSize="xs" color="gray.700">
                  <Text>• Present participles always end in <strong>-ing</strong>.</Text>
                  <Text>• Don't confuse them with gerunds — participles modify nouns, gerunds act as nouns.</Text>
                  <Text>• Watch for dangling participles: the subject must match the action.</Text>
                </VStack>
              </Box>
            </GameCard>

            {/* PAST PARTICIPLE */}
            <GameCard variant="game">
              <Heading size="md" color="cyan.600" mb={3}>
                Past Participle
              </Heading>
              <Text fontSize="md" color="gray.600" mb={4}>
                Usually formed by adding <strong>-ed</strong> to the base verb
                (regular verbs) or through an irregular change. Used in perfect
                tenses and passive constructions.
              </Text>
              <Table size="sm" variant="simple" border="1px solid" borderColor="gray.200" mb={4}>
                <Thead bg="gray.50">
                  <Tr>
                    <Th>Use</Th>
                    <Th>Example</Th>
                    <Th>Note</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td fontWeight="bold">As adjective</Td>
                    <Td>The <em>broken</em> window was fixed.</Td>
                    <Td>Modifies "window"</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Perfect tense</Td>
                    <Td>She has <em>written</em> the report.</Td>
                    <Td>With "have/has/had"</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Passive voice</Td>
                    <Td>The letter was <em>signed</em> by him.</Td>
                    <Td>With "be" auxiliary</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Irregular form</Td>
                    <Td>He has <em>gone</em> home.</Td>
                    <Td>"go" → "gone"</Td>
                  </Tr>
                </Tbody>
              </Table>
              <Box p={3} bg="cyan.50" borderRadius="xl" border="1px solid" borderColor="cyan.200">
                <Heading size="xs" color="cyan.700" mb={2}>💡 Quick Tips</Heading>
                <VStack align="start" spacing={1} fontSize="xs" color="gray.700">
                  <Text>• Regular past participles end in <strong>-ed</strong>: walked, played, finished.</Text>
                  <Text>• Irregular ones must be memorized: go→gone, write→written, break→broken.</Text>
                  <Text>• Always used with an auxiliary in perfect tenses.</Text>
                </VStack>
              </Box>
            </GameCard>

            {/* PERFECT PARTICIPLE */}
            <GameCard variant="game">
              <Heading size="md" color="purple.600" mb={3}>
                Perfect Participle
              </Heading>
              <Text fontSize="md" color="gray.600" mb={4}>
                Formed with <strong>having + past participle</strong>. It
                indicates that one action was completed before another action
                began, and is most commonly used in participial phrases.
              </Text>
              <Table size="sm" variant="simple" border="1px solid" borderColor="gray.200" mb={4}>
                <Thead bg="gray.50">
                  <Tr>
                    <Th>Use</Th>
                    <Th>Example</Th>
                    <Th>Note</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td fontWeight="bold">Sequential actions</Td>
                    <Td><em>Having finished</em> her work, she left.</Td>
                    <Td>Work finished first</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Cause and effect</Td>
                    <Td><em>Having studied</em> hard, he passed.</Td>
                    <Td>Studying led to passing</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Passive form</Td>
                    <Td><em>Having been told</em> the news, she cried.</Td>
                    <Td>"having been + past participle"</Td>
                  </Tr>
                </Tbody>
              </Table>
              <Box p={3} bg="purple.50" borderRadius="xl" border="1px solid" borderColor="purple.200">
                <Heading size="xs" color="purple.700" mb={2}>💡 Quick Tips</Heading>
                <VStack align="start" spacing={1} fontSize="xs" color="gray.700">
                  <Text>• Structure: <strong>having + past participle</strong> (e.g., having eaten, having seen).</Text>
                  <Text>• Shows the first action was completed before the second started.</Text>
                  <Text>• Common in formal and literary writing.</Text>
                </VStack>
              </Box>
            </GameCard>

          </VStack>
        </Box>

      </VStack>
    </PageContainer>
  );
};

export default AuxiliaryVerbsAndVerbals;

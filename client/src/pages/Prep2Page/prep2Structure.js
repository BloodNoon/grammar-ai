import React from 'react';
import { Box, Heading, Text, Grid, Flex, VStack, SimpleGrid, Badge, Divider, Table, Tbody, Tr, Td, Th, Thead } from '@chakra-ui/react';

// PREP2 COMPONENTS
import PrepositionPhraseLesson from '../../utils/SentenceChecker/PrepositionPhraseLesson';
import PrepositionPhraseFillBlanks from '../../utils/SentenceChecker/PrepositionPhraseFillBlanks';
import PrepositionPhraseWordBlocks from '../../utils/SentenceChecker/PrepositionPhraseWordBlocks';
import PrepositionPhraseTesting from '../../utils/SentenceChecker/PrepositionPhraseTesting';
import PrepositionPhraseSorting from '../../utils/SentenceChecker/PrepositionPhraseSorting';
const Prep2Structure = () => {
 return (
    <Box bg="#F6D5B4" minH="100vh" p={{ base: 4, md: 8 }} fontFamily="'Inter', sans-serif">
      
      {/* Page Header */}
      <Box maxW="1400px" mx="auto" mb={8} bg="#F0B784" p={4} borderRadius="xl" borderWidth="2px" borderColor="whiteAlpha.600" textAlign="center">
        <Heading color="#4A2C11" size="xl">
          🐸 Prepositional Phrases
        </Heading>
      </Box>

      {/* Main 2-Column Grid */}
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8} maxW="1400px" mx="auto">
        
        {/* LEFT COLUMN */}
        <VStack spacing={6} align="stretch">
          
          <Box bg="white" p={8} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
            <Heading size="lg" color="#1A0933" mb={4}>1. Understanding Prepositional Phrases</Heading>
            <Text fontSize="md" color="gray.600" mb={6}>
              A <strong>prepositional phrase</strong> is a group of words that begins with a preposition and ends with a noun or pronoun. It adds detail about time, place, or manner.
            </Text>

            <Table size="sm" variant="simple" border="1px solid" borderColor="gray.200">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Function</Th>
                  <Th>What it does</Th>
                  <Th>Example</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr><Td fontWeight="bold">Adverbial</Td><Td>Modifies verbs</Td><Td>She ran <em>with speed</em>.</Td></Tr>
                <Tr><Td fontWeight="bold">Adjectival</Td><Td>Modifies nouns</Td><Td>The book <em>on the table</em> is mine.</Td></Tr>
                <Tr><Td fontWeight="bold">Complement</Td><Td>Completes the meaning</Td><Td>We rely <em>on you</em>.</Td></Tr>
              </Tbody>
            </Table>
          </Box>

          <Box bg="white" p={8} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
            <Heading size="md" color="#1A0933" mb={4}>2. Anatomy of a Phrase</Heading>
            
            <Box p={4} bg="gray.50" borderRadius="xl" borderWidth="1px" borderColor="gray.200">
              <Text fontSize="xs" fontFamily="monospace" color="gray.600" mb={2}>#Preposition + (Modifiers/Article) + #Noun/#Pronoun</Text>
              <Box bg="white" p={3} borderRadius="md" border="1px dashed" borderColor="gray.300">
                <Text fontSize="sm"><strong>Example:</strong> "in the house"</Text>
                <Text fontSize="xs" color="gray.500" mt={1}><em>"in" (preposition) + "the" (article) + "house" (noun)</em></Text>
              </Box>
            </Box>
          </Box>
        </VStack>

        {/* RIGHT COLUMN */}
        <VStack spacing={6} align="stretch">
          
          {/* THE VIDEO PANEL */}
          <Box bg="#f8f9fa" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)" textAlign="center">
            <Heading size="md" color="#1A0933" mb={4}>
              📹 Today's Lesson
            </Heading>
            
            <Box position="relative" w="100%" bg="black" borderRadius="lg" overflow="hidden" borderWidth="1px" borderColor="gray.300">
              <video controls style={{ width: '100%', height: '580px', display: 'block' }}>
                <source src="/Lesson7.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
            
            <Text mt={3} fontSize="sm" color="gray.500" fontStyle="italic">
              💡 Watch the lesson before practicing with the exercises below
            </Text>
          </Box>

          <Box bg="white" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
             <Heading size="lg" textAlign="center" mb={6}>Interactive Practice</Heading>
             
             <Heading size="sm" color="#333" mb={3}>Practice 1: Phrase Lesson</Heading>
             <PrepositionPhraseLesson />
             
             <Divider my={6} />
             
             <Heading size="sm" color="#333" mb={3}>Practice 2: Fill in the Blanks</Heading>
             <PrepositionPhraseFillBlanks />
             
             <Divider my={6} />
             
             <Heading size="sm" color="#333" mb={3}>Practice 3: Word Blocks</Heading>
             <PrepositionPhraseWordBlocks />

             <Divider my={6} />
             
             <Heading size="sm" color="#333" mb={3}>Practice 4: Sorting Game</Heading>
             <PrepositionPhraseSorting />
          </Box>
        </VStack>
      </Grid>

      {/* Final Test Section */}
      <Box maxW="1400px" mx="auto" mt={8} bg="white" p={8} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
        <Heading size="xl" textAlign="center" mb={6} color="#333">🏆 Final Phrase Test</Heading>
        <PrepositionPhraseTesting />
      </Box>
    </Box>
  );

}
export default Prep2Structure;

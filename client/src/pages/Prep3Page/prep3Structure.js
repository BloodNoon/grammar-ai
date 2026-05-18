import React from 'react';
import { Box, Heading, Text, Grid, Flex, VStack, SimpleGrid, Badge, Divider, Table, Tbody, Tr, Td, Th, Thead } from '@chakra-ui/react';

// PREP3 COMPONENTS
import SentenceScramble from '../../utils/SentenceChecker/SentenceScramble';
import PrepositionBuilder from '../../utils/SentenceChecker/PrepositionBuilder';
import PrepositionQuizFinal from '../../utils/SentenceChecker/PrepositionQuizFinal';

const Prep3Structure = () => {
  return (
    <Box bg="#F6D5B4" minH="100vh" p={{ base: 4, md: 8 }} fontFamily="'Inter', sans-serif">
      
      {/* Page Header */}
      <Box maxW="1400px" mx="auto" mb={8} bg="#F0B784" p={4} borderRadius="xl" borderWidth="2px" borderColor="whiteAlpha.600" textAlign="center">
        <Heading color="#4A2C11" size="xl">
          🐸 Compound Prepositions
        </Heading>
      </Box>

      {/* Main 2-Column Grid */}
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8} maxW="1400px" mx="auto">
        
        {/* LEFT COLUMN */}
        <VStack spacing={6} align="stretch">
          
          <Box bg="white" p={8} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
            <Heading size="lg" color="#1A0933" mb={4}>1. Understanding Compound Prepositions</Heading>
            <Text fontSize="md" color="gray.600" mb={6}>
              A <strong>compound preposition</strong> is a phrase that works like a single preposition, connecting a noun or pronoun to another word in the sentence.
            </Text>

            <Table size="sm" variant="simple" border="1px solid" borderColor="gray.200">
              <Tbody>
                <Tr><Td fontWeight="bold">According to</Td><Td fontWeight="bold">As of</Td></Tr>
                <Tr><Td fontWeight="bold">As well as</Td><Td fontWeight="bold">Aside from</Td></Tr>
                <Tr><Td fontWeight="bold">Because of</Td><Td fontWeight="bold">In addition to</Td></Tr>
                <Tr><Td fontWeight="bold">Ahead of</Td><Td fontWeight="bold">Due to</Td></Tr>
                <Tr><Td fontWeight="bold">Along with</Td><Td fontWeight="bold">Out of</Td></Tr>
                <Tr><Td fontWeight="bold">Next to</Td><Td fontWeight="bold">Instead of</Td></Tr>
                <Tr><Td fontWeight="bold">Prior to</Td><Td fontWeight="bold">In respect to</Td></Tr>
                <Tr><Td fontWeight="bold">In spite of</Td><Td fontWeight="bold">In place of</Td></Tr>
              </Tbody>
            </Table>
          </Box>

          <Box bg="white" p={8} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
            <Heading size="md" color="#1A0933" mb={4}>2. Usage Rules & Examples</Heading>
            
            <VStack spacing={4} align="stretch">
              <Box p={3} bg="gray.50" borderRadius="md" border="1px dashed" borderColor="gray.300">
                <Text fontSize="sm"><strong>1.</strong> She succeeded <strong>because of</strong> her hard work.</Text>
              </Box>
              <Box p={3} bg="gray.50" borderRadius="md" border="1px dashed" borderColor="gray.300">
                <Text fontSize="sm"><strong>2.</strong> <strong>In spite of</strong> the rain, we went for a walk.</Text>
              </Box>
              <Box p={3} bg="gray.50" borderRadius="md" border="1px dashed" borderColor="gray.300">
                <Text fontSize="sm"><strong>3.</strong> The decision was made <strong>according to</strong> the rules.</Text>
              </Box>
              
              <Box mt={4} p={5} bg="blue.50" borderRadius="xl" border="1px solid" borderColor="blue.200">
                <Heading size="xs" color="blue.700" mb={3}>💡 Quick Tips:</Heading>
                <VStack align="start" spacing={2} fontSize="xs" color="gray.700">
                  <Text>• Treat compound prepositions as single units.</Text>
                  <Text>• They are usually followed by a noun or gerund (-ing form).</Text>
                  <Text>• Some can be replaced with single-word equivalents.</Text>
                </VStack>
              </Box>
            </VStack>
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
                <source src="/Lesson8.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
            
            <Text mt={3} fontSize="sm" color="gray.500" fontStyle="italic">
              💡 Watch the lesson before practicing with the exercises below
            </Text>
          </Box>

          <Box bg="white" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
             <Heading size="lg" textAlign="center" mb={6}>Interactive Practice</Heading>
             
             <Heading size="sm" color="#333" mb={3}>Practice 1: Sentence Scramble</Heading>
             <SentenceScramble />
             
             <Divider my={6} />
             
             <Heading size="sm" color="#333" mb={3}>Practice 2: Preposition Builder</Heading>
             <PrepositionBuilder />
          </Box>
        </VStack>
      </Grid>

      {/* Final Quiz Section */}
      <Box maxW="1400px" mx="auto" mt={8} bg="white" p={8} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
        <Heading size="xl" textAlign="center" mb={6} color="#333">🏆 Final Quiz</Heading>
        <PrepositionQuizFinal />
      </Box>
    </Box>
  );
};

export default Prep3Structure;

import React from 'react';
import { Box, Heading, Text, Grid, Flex, VStack, SimpleGrid, Badge, Divider } from '@chakra-ui/react';

// ADVERB COMPONENTS
import AdverbLesson from '../../utils/SentenceChecker/AdverbLesson';
import AdverbTypes from '../../utils/SentenceChecker/AdverbTypes';
import AdverbRoyalOrder from '../../utils/SentenceChecker/AdverbRoyalOrder';
import AdverbForms from '../../utils/SentenceChecker/AdverbForms';
import AdverbSentenceStructures from '../../utils/SentenceChecker/AdverbSentenceStructures';
import AdverbIdentificationGame from '../../utils/SentenceChecker/AdverbIdentificationGame';
import AdverbTypeSorting from '../../utils/SentenceChecker/AdverbTypeSorting';
import AdverbQuiz from '../../utils/SentenceChecker/AdverbQuiz';

const AdverbStructure = () => {
  return (
    <Box bg="#F6D5B4" minH="100vh" p={{ base: 4, md: 8 }} fontFamily="'Inter', sans-serif">
      
      {/* Page Header */}
      <Box maxW="1400px" mx="auto" mb={8} bg="#F0B784" p={4} borderRadius="xl" borderWidth="2px" borderColor="whiteAlpha.600" textAlign="center">
        <Heading color="#4A2C11" size="xl">
          🐸 Adverb Lessons
        </Heading>
      </Box>

      {/* Main 2-Column Grid */}
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8} maxW="1400px" mx="auto">
        
        {/* LEFT COLUMN */}
        <VStack spacing={6} align="stretch">
          
          <Box bg="white" p={8} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
            <Heading size="lg" color="#1A0933" mb={4}>1. Introduction to Adverbs</Heading>
            <Text fontSize="md" color="gray.600" mb={6}>
              Discover <Badge colorScheme="blue" fontSize="md">adverbs</Badge> - the words that modify verbs, adjectives, and other adverbs! 
              Learn how to use them correctly and understand their flexible placement in sentences.
            </Text>
            
            <Box bg="gray.50" p={4} borderRadius="xl" border="1px dashed" borderColor="blue.500" mb={6}>
              <Text fontSize="md"><strong>Example:</strong> She runs <em>quickly</em>.</Text>
              <Text fontSize="sm" color="gray.500" mt={1}>"Quickly" describes how she runs.</Text>
            </Box>

            <AdverbLesson />
          </Box>

          <Box bg="white" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
            <Heading size="md" color="#2196F3" mb={4}>🔤 Adverb Types</Heading>
            <AdverbTypes />
          </Box>

          <Box bg="white" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
            <Heading size="md" color="#8BC34A" mb={4}>📐 Adverb Forms</Heading>
            <AdverbForms />
          </Box>
        </VStack>

        {/* RIGHT COLUMN */}
        <VStack spacing={6} align="stretch">
          
          {/* THE VIDEO PANEL */}
          <Box bg="#f8f9fa" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)" textAlign="center">
            <Heading size="md" color="#1A0933" mb={4}>
              📹 Today's Lesson: Adverbs
            </Heading>
            
            <Box position="relative" w="100%" bg="black" borderRadius="lg" overflow="hidden" borderWidth="1px" borderColor="gray.300">
              <video controls style={{ width: '100%', height: '580px', display: 'block' }}>
                <source src="/adverbs1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
            
            <Text mt={3} fontSize="sm" color="gray.500" fontStyle="italic">
              💡 Watch the lesson before practicing with the exercises below
            </Text>
          </Box>

          <Box bg="white" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
             <Heading size="lg" textAlign="center" mb={6}>Interactive Practice</Heading>
             
             <Heading size="sm" color="#00BCD4" mb={3}>Practice 1: Identification Game</Heading>
             <AdverbIdentificationGame />
             
             <Divider my={6} />
             
             <Heading size="sm" color="#4CAF50" mb={3}>Practice 2: Type Sorting</Heading>
             <AdverbTypeSorting />
             
             <Divider my={6} />
             
             <Heading size="sm" color="#FF5722" mb={3}>Practice 3: Royal Order</Heading>
             <AdverbRoyalOrder />

             <Divider my={6} />
             
             <Heading size="sm" color="#9C27B0" mb={3}>Practice 4: Sentence Structures</Heading>
             <AdverbSentenceStructures />
          </Box>
        </VStack>
      </Grid>

      {/* Final Quiz Section */}
      <Box maxW="1400px" mx="auto" mt={8} bg="white" p={8} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
        <Heading size="xl" textAlign="center" mb={6} color="#333">🏆 Final Adverb Quiz</Heading>
        <AdverbQuiz />
      </Box>
    </Box>
  );
};

export default AdverbStructure;

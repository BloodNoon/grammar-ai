import React from 'react';
import { Box, Heading, Text, Grid, Flex, VStack, SimpleGrid, Badge, Divider } from '@chakra-ui/react';


// ADJECTIVE COMPONENTS
import AdjectiveLesson from '../../utils/SentenceChecker/AdjectiveLesson';
import AdjectiveRoyalOrder from '../../utils/SentenceChecker/AdjectiveRoyalOrder';
import AdjectiveSentenceStructures from '../../utils/SentenceChecker/AdjectiveSentenceStructures';
import AdjectiveFillBlanks from '../../utils/SentenceChecker/AdjectiveFillBlanks';
import AdjectiveSortingGame from '../../utils/SentenceChecker/AdjectiveSortingGame';
import AdjectiveQuiz from '../../utils/SentenceChecker/AdjectiveQuiz';
import adjectivesData from '../../data/adjectives_questions.json';
import WordHunterGame from '../../components/wordHunter';

const AdjectivePage = () => {
  return (
    <Box bg="#F6D5B4" minH="100vh" p={{ base: 4, md: 8 }} fontFamily="'Inter', sans-serif">
      
      {/* Page Header */}
      <Box maxW="1400px" mx="auto" mb={8} bg="#F0B784" p={4} borderRadius="xl" borderWidth="2px" borderColor="whiteAlpha.600" textAlign="center">
        <Heading color="#4A2C11" size="xl">
          🐸 Adjective Lessons
        </Heading>
      </Box>

      {/* Main 2-Column Grid */}
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8} maxW="1400px" mx="auto">
        
        {/* LEFT COLUMN */}
        <VStack spacing={6} align="stretch">
          
          <Box bg="white" p={8} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
            <AdjectiveLesson />
          </Box>

          <Box bg="white" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
            <Heading size="md" color="#1565c0" mb={4}>✍️ Adjective Fill-in-the-Blank</Heading>
            <AdjectiveFillBlanks />
          </Box>

          <Box bg="#FAF5FF" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
            <WordHunterGame
              questions={adjectivesData.filter(q => q.exercise === "identifying")}
            />
          </Box>
        </VStack>

        {/* RIGHT COLUMN */}
        <VStack spacing={6} align="stretch">
          
          {/* THE VIDEO PANEL */}
          <Box bg="#f8f9fa" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)" textAlign="center">
            <Heading size="md" color="#1A0933" mb={4}>
              📹 Today's Lesson: Adjectives
            </Heading>
            
            <Box position="relative" w="100%" bg="black" borderRadius="lg" overflow="hidden" borderWidth="1px" borderColor="gray.300">
              <video controls style={{ width: '100%', height: '580px', display: 'block' }}>
                <source src="/lesson4.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
            
            <Text mt={3} fontSize="sm" color="gray.500" fontStyle="italic">
              💡 Watch the lesson before practicing with the exercises below
            </Text>
          </Box>

          <Box bg="white" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
            <Heading size="lg" textAlign="center" mb={6}>Interactive Practice</Heading>
            <AdjectiveRoyalOrder />
            <Divider my={6} />
            <AdjectiveSentenceStructures />
            <Divider my={6} />
            <AdjectiveSortingGame />
          </Box>
        </VStack>
      </Grid>

      {/* Final Quiz Section */}
      <Box maxW="1400px" mx="auto" mt={8} bg="white" p={8} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
        <Heading size="xl" textAlign="center" mb={6} color="#333">🏆 Final Adjective Quiz</Heading>
        <AdjectiveQuiz />
      </Box>
    </Box>
  );
};

export default AdjectivePage;

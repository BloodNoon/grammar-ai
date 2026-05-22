import React from 'react';
import { Box, Heading, Text, SimpleGrid, Flex, VStack, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const PracticeMenu = () => {

  const categories = [
    {
      id: 1,
      title: "Nouns",
      icon: "👤",
      description: "Learn about people, places, things, and ideas.",
      path: "/nouns",
      colorScheme: "blue"
    },
    {
      id: 2,
      title: "Verb Tenses",
      icon: "⏱️",
      description: "Master past, present, future, and auxiliary verbs.",
      path: "/verb-tense-structure",
      colorScheme: "red"
    },
    {
      id: 3,
      title: "Articles",
      icon: "📰",
      description: "Master the rules for using A, An, and The.",
      path: "/article-structure",
      colorScheme: "teal"
    },
    {
      id: 4,
      title: "Prepositions",
      icon: "📍",
      description: "Connect nouns with time, place, and direction.",
      path: "/prep1-structure",
      colorScheme: "green"
    },
    {
      id: 5,
      title: "Adjectives",
      icon: "🎨",
      description: "Learn how to describe nouns and use the Royal Order.",
      path: "/adjective-structure",
      colorScheme: "orange"
    },
    {
      id: 6,
      title: "Adverbs",
      icon: "⚡",
      description: "Discover how to modify verbs, adjectives, and other adverbs.",
      path: "/adverb-structure",
      colorScheme: "purple"
    },
    {
      id: 7,
      title: "Conjunctions",
      icon: "🔗",
      description: "Glue your sentences together with FANBOYS and AWUBIS.",
      path: "/conjunction-structure",
      colorScheme: "pink"
    }
  ];

  return (
    <Box bg="#F6D5B4" minH="100vh" p={{ base: 4, md: 8 }} fontFamily="'Inter', sans-serif">
      
      
      <Box maxW="1200px" mx="auto" mb={10} textAlign="center">
        <Heading size="2xl" color="#4A2C11" mb={4}>
          🐸 Sentence Structure Course
        </Heading>
        <Text fontSize="xl" color="#8B3A3A" fontWeight="medium">
          Choose a category below to start building better sentences!
        </Text>
      </Box>

   
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} maxW="1200px" mx="auto">
        {categories.map((category) => (
          <Box
            key={category.id}
            as={RouterLink}
            to={category.path}
            bg="white"
            borderRadius="xl"
            borderWidth="3px"
            borderColor="#1A1A1A"
            boxShadow="6px 6px 0px rgba(0,0,0,0.1)"
            p={6}
            position="relative"
            transition="all 0.2s"
            display="flex"
            flexDirection="column"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "8px 8px 0px rgba(0,0,0,0.15)",
              borderColor: `${category.colorScheme}.400`
            }}
          >

            <Flex justify="center" align="center" mb={4}>
              <Box fontSize="4xl" bg={`${category.colorScheme}.50`} p={3} borderRadius="lg" borderWidth="2px" borderColor={`${category.colorScheme}.200`}>
                {category.icon}
              </Box>
            </Flex>


            <VStack align="flex-start" spacing={2} mb={6}>
              <Heading size="md" color="#1A0933">
                Lesson {category.id}: {category.title}
              </Heading>
              <Text color="gray.600" fontSize="md" lineHeight="tall">
                {category.description}
              </Text>
            </VStack>

            <Button
              w="100%"
              bg="#F0B784"
              color="#4A2C11"
              borderWidth="2px"
              borderColor="#1A1A1A"
              _hover={{ bg: "#E5A872" }}
            >
              Start Learning ➡️
            </Button>
          </Box>
        ))}
      </SimpleGrid>

    </Box>
  );
};

export default PracticeMenu;

import React from "react";
import { Box, Heading, Text, SimpleGrid, Flex, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { PageContainer, ActionButton, GameCard } from "../components/ui";

const PracticeMenu = () => {
  const categories = [
    {
      id: 1,
      title: "Nouns",
      icon: "👤",
      description: "Learn about people, places, things, and ideas.",
      path: "/nouns",
      colorScheme: "blue",
    },
    {
      id: 2,
      title: "Verb Tenses",
      icon: "⏱️",
      description: "Master past, present, future, and auxiliary verbs.",
      path: "/verb-tense-structure",
      colorScheme: "red",
    },
    {
      id: 3,
      title: "Articles",
      icon: "📰",
      description: "Master the rules for using A, An, and The.",
      path: "/article-structure",
      colorScheme: "teal",
    },
    {
      id: 4,
      title: "Prepositions",
      icon: "📍",
      description: "Connect nouns with time, place, and direction.",
      path: "/prep1-structure",
      colorScheme: "green",
    },
    {
      id: 5,
      title: "Adjectives",
      icon: "🎨",
      description: "Learn how to describe nouns and use the Royal Order.",
      path: "/adjective-structure",
      colorScheme: "orange",
    },
    {
      id: 6,
      title: "Adverbs",
      icon: "⚡",
      description: "Discover how to modify verbs, adjectives, and other adverbs.",
      path: "/adverb-structure",
      colorScheme: "purple",
    },
    {
      id: 7,
      title: "Conjunctions",
      icon: "🔗",
      description: "Glue your sentences together with FANBOYS and AWUBIS.",
      path: "/conjunction-structure",
      colorScheme: "pink",
    },
  ];

  return (
    <PageContainer>
      <Box mb={10} textAlign="center">
        <Heading size="2xl" color="brand.900" mb={4}>
          🐸 Sentence Structure Course
        </Heading>
        <Text fontSize="xl" color="brand.700" fontWeight="medium">
          Choose a category below to start building better sentences!
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {categories.map((category) => (
          <GameCard
            key={category.id}
            as={RouterLink}
            to={category.path}
            bg="white"
            p={6}
            position="relative"
            transition="all 0.2s"
            display="flex"
            flexDirection="column"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "neu-hover",
              borderColor: `${category.colorScheme}.400`,
            }}
          >
            <Flex justify="center" align="center" mb={4}>
              <Box
                fontSize="4xl"
                bg={`${category.colorScheme}.50`}
                p={3}
                borderRadius="lg"
                borderWidth="2px"
                borderColor={`${category.colorScheme}.200`}
              >
                {category.icon}
              </Box>
            </Flex>

            <VStack align="flex-start" spacing={2} mb={6} flex="1">
              <Heading size="md" color="ink.700">
                Lesson {category.id}: {category.title}
              </Heading>
              <Text color="gray.600" fontSize="md" lineHeight="tall">
                {category.description}
              </Text>
            </VStack>

            <ActionButton variant="primary" w="100%">
              Start Learning ➡️
            </ActionButton>
          </GameCard>
        ))}
      </SimpleGrid>
    </PageContainer>
  );
};

export default PracticeMenu;

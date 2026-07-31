import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  VStack,
} from "@chakra-ui/react";

const QUESTS = [
  { grade: 3, title: "Grade 3 Quest", to: "/grade-3-quest" },
  { grade: 4, title: "Grade 4 Quest", to: "/grade-4-quest" },
  { grade: 5, title: "Grade 5 Quest", to: "/grade-5-quest" },
  { grade: 6, title: "Grade 6 Quest", to: "/grade-6-quest" },
  { grade: 7, title: "Grade 7 Quest", to: "/grade-7-quest" },
  { grade: 8, title: "Grade 8 Quest", to: "/grade-8-quest" },
  { grade: 9, title: "Grade 9 Quest", to: "/grade-9-quest" },
];

const TEST_PREP = {
  title: "Test Prep",
  description: "Prepare for the SHSAT and SAT English exams.",
  buttonLabel: "Explore Prep",
  to: "/test-prep",
};

export default function GradeQuests() {
  return (
    <Box p="2rem">
      <Heading textAlign="center" mb="2rem" color="brand.700">
        Choose Your English Quest
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
        {QUESTS.map((q) => (
          <VStack
            key={q.grade}
            bg="white"
            borderRadius="xl"
            boxShadow="md"
            p="1.5rem"
            spacing={4}
            textAlign="center"
          >
            <Heading size="md" color="ink.700">
              {q.title}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Embark on awesome English challenges for Grade {q.grade}{" "}
              explorers!
            </Text>
            <Button
              as={RouterLink}
              to={q.to}
              bg="blue.400"
              color="white"
              _hover={{ bg: "blue.500" }}
              borderRadius="full"
              px={6}
            >
              Start Adventure
            </Button>
          </VStack>
        ))}

        <VStack
          bg="white"
          borderRadius="xl"
          boxShadow="md"
          p="1.5rem"
          spacing={4}
          textAlign="center"
        >
          <Heading size="md" color="ink.700">
            {TEST_PREP.title}
          </Heading>
          <Text fontSize="sm" color="gray.500">
            {TEST_PREP.description}
          </Text>
          <Button
            as={RouterLink}
            to={TEST_PREP.to}
            bg="blue.400"
            color="white"
            _hover={{ bg: "blue.500" }}
            borderRadius="full"
            px={6}
          >
            {TEST_PREP.buttonLabel}
          </Button>
        </VStack>
      </SimpleGrid>
    </Box>
  );
}

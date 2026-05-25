import React from "react";
import { Box, VStack, Heading, Text } from "@chakra-ui/react";
import SentenceArranger from "./nounComponents/sentenceArranger";
import nounData from "../data/nouns_questions.json";
import TypingGameWrapper from "../components/typingGameWrapper";
import MultipleChoiceWrapper from "../components/multipleChoiceWrapper";

// Content box template
function ContentBox({ title, info, children }) {
  return (
    <Box
      p={5}
      borderWidth="1px"
      backgroundColor="cyan.400"
      borderColor="teal.900"
      borderRadius="2xl"
      boxShadow="6px 6px 0px teal.900"
    >
      <Heading
        color="teal.900"
        fontSize="2em"
        fontWeight="semibold"
        textAlign="center"
      >
        {title}
      </Heading>
      <Text color="teal.900" fontSize="xl" mt={4} textAlign="center">
        {info}
      </Text>
      {children}
    </Box>
  );
}

export default function NounComponentTest() {
  // Filter for typing questions (Single answer, no arrows, max 2 words)
  const typingQuestions = nounData.filter((q) => {
    if (q.answer_count !== "Single" || q.answer.length !== 1) return false;
    const answerText = q.answer[0];
    if (answerText.includes("→")) return false;
    if (answerText.split(" ").length > 2) return false;
    return true;
  });

  // Filter for multiple choice questions (Multiple answers with 4 options)
  const multipleChoiceQuestions = nounData.filter((q) => {
    if (q.answer_count !== "Single") return false;
    if (!q.options || q.options.length !== 4) return false;
    return true;
  });

  return (
    <Box borderWidth="1px" backgroundColor="orange.200" minH="100vh">
      <VStack spacing={6} p={8} align="stretch">
        <ContentBox
          title="Noun Component Test Page"
          info="This is a test page for noun components."
        />

        <Box>
          <Heading mb={6} color="teal.900" textAlign="center">
            Noun Typing Practice
          </Heading>
          <TypingGameWrapper questionsToPlay={typingQuestions} />
        </Box>

        <Box>
          <Heading mb={6} color="teal.900" textAlign="center">
            Noun Multiple Choice
          </Heading>
          <MultipleChoiceWrapper questionsToPlay={multipleChoiceQuestions} />
        </Box>
        <SentenceArranger />
      </VStack>
    </Box>
  );
}

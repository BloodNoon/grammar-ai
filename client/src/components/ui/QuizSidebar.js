import React from "react";
import { Box, Heading, Text, Progress } from "@chakra-ui/react";
import ActionButton from "./ActionButton";

const QuizSidebar = ({
  answered,
  total,
  progress,
  isSubmitted,
  score,
  onSubmit,
  onRetake,
}) => (
  <Box
    bg="brand.100"
    p={6}
    borderRadius="lg"
    borderWidth="2px"
    borderColor="ink.900"
    boxShadow="neu"
    position="sticky"
    top="24px"
  >
    <Heading size="md" color="ink.900" mb={6}>
      Quiz Status
    </Heading>

    {!isSubmitted ? (
      <Box>
        <Text fontWeight="bold" color="gray.700" mb={2}>
          Answered: {answered} / {total}
        </Text>
        <Progress value={progress} colorScheme="orange" mb={8} />
        <Text fontSize="sm" color="gray.600" mb={4}>
          Answer all questions before submitting your quiz for grading.
        </Text>
        <ActionButton
          variant="primary"
          onClick={onSubmit}
          isDisabled={answered !== total}
          w="100%"
          size="lg"
        >
          Submit Quiz
        </ActionButton>
      </Box>
    ) : (
      <Box textAlign="center" py={4}>
        <Heading size="3xl" color="brand.900" mb={2}>
          {score}/{total}
        </Heading>
        <Text fontWeight="bold" color="gray.700" mb={6}>
          Final Score
        </Text>
        <ActionButton variant="primary" onClick={onRetake} w="100%" size="lg">
          Retake Quiz 🔄
        </ActionButton>
      </Box>
    )}
  </Box>
);

export default QuizSidebar;

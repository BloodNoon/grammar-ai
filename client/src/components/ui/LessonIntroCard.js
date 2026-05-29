import React from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

const getIcon = (title) => {
  const t = title.toLowerCase();
  if (t.includes("learn")) return "📖";
  if (t.includes("practice")) return "🎯";
  return "💡";
};

const LessonIntroCard = ({
  title = "Learn The Lesson",
  directions = "Directions: Read the explanation of the lesson and watch the video",
  children,
  ...rest
}) => {
  return (
    <Box
      bg="paper"
      p={{ base: 4, md: 5 }}
      borderRadius="2xl"
      borderWidth="2px"
      borderColor="gray.700"
      boxShadow="4px 4px 0px rgba(0,0,0,0.1)"
      w="100%"
      mb={6}
      {...rest}
    >
      <VStack align="stretch" spacing={2}>
        <Heading 
          size="lg" 
          color="ink.700" 
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Box as="span" fontSize="xl" display="inline-flex" alignItems="center">
            {getIcon(title)}
          </Box>
          {title}
        </Heading>
        <Text
          color="gray.600"
          fontSize="md"
          lineHeight="1.5"
        >
          {directions}
        </Text>
      </VStack>
      {children && <Box mt={4}>{children}</Box>}
    </Box>
  );
};

export default LessonIntroCard;

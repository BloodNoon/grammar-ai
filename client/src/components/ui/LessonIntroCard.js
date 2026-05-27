import React from "react";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";

const LessonIntroCard = ({
  title = "Learn The Lesson",
  directions = "Directions: Read the explanation of the lesson and watch the video",
  children,
  ...rest
}) => {
  return (
    <Box
      bg="brand.100"
      p={{ base: 4, md: 5 }}
      borderRadius="2xl"
      borderWidth="2px"
      borderColor="gray.700"
      boxShadow="4px 4px 0px rgba(0,0,0,0.1)"
      w="100%"
      maxW="760px"
      mx="auto"
      mb={6}
      {...rest}
    >
      <Flex 
        direction={{ base: "column", sm: "row" }} 
        align="center" 
        gap={{ base: 3, sm: 5 }}
      >
        <Flex 
          align="center" 
          justify="center" 
          bg="brand.500" 
          w="50px" 
          h="50px" 
          borderRadius="xl" 
          borderWidth="2px"
          borderColor="gray.700"
          flexShrink={0}
        >
          <Text fontSize="2xl">💡</Text>
        </Flex>
        <Box flex="1" textAlign={{ base: "center", sm: "left" }}>
          <Heading 
            size="sm" 
            color="brand.900" 
            mb={1} 
            fontWeight="semibold"
            fontSize="md"
          >
            {title}
          </Heading>
          <Text
            color="brand.900"
            fontSize="sm"
            fontWeight="500"
            lineHeight="1.5"
            opacity={0.85}
          >
            {directions}
          </Text>
        </Box>
      </Flex>
      {children && <Box mt={4}>{children}</Box>}
    </Box>
  );
};

export default LessonIntroCard;

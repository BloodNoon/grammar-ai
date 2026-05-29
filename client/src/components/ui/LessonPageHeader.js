import React from "react";
import { Box, Heading } from "@chakra-ui/react";

const LessonPageHeader = ({ children, title, icon, ...rest }) => {
  return (
    <Box
      bg="brand.500"
      color="brand.900"
      py={{ base: 4, md: 5 }}
      px={{ base: 5, md: 6 }}
      borderRadius="xl"
      w="fit-content"
      mb={8}
      {...rest}
    >
      <Heading size="lg" color="brand.900" whiteSpace={{ base: "normal", md: "nowrap" }}>
        {children || `${icon ? `${icon} ` : ""}${title}`}
      </Heading>
    </Box>
  );
};

export default LessonPageHeader;

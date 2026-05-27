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
      maxW={{ base: "100%", lg: "calc(100vw - 2rem)" }}
      mb={8}
      ml={{ base: 0, lg: "calc(-1 * max(0px, (100vw - var(--sidebar-width, 260px) - 1264px) / 2))" }}
      transition="margin-left 0.3s ease"
      {...rest}
    >
      <Heading size="lg" color="brand.900" whiteSpace={{ base: "normal", md: "nowrap" }}>
        {children || `${icon ? `${icon} ` : ""}${title}`}
      </Heading>
    </Box>
  );
};

export default LessonPageHeader;

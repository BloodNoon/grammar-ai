import React from "react";
import { Box } from "@chakra-ui/react";

const GameCard = ({ children, variant = "default", ...rest }) => {
  const isHeader =
    rest.bg === "brand.500" ||
    rest.background === "brand.500" ||
    variant === "header";
  return (
    <Box
      bg="white"
      p={variant === "game" ? 8 : 6}
      borderRadius={variant === "game" ? "2xl" : "xl"}
      borderWidth={isHeader ? "0" : variant === "game" ? "2px" : "1px"}
      borderColor="gray.700"
      boxShadow={
        isHeader
          ? "none"
          : variant === "game"
            ? "4px 4px 0px rgba(0,0,0,0.1)"
            : "2px 2px 0px rgba(0,0,0,0.1)"
      }
      w="100%"
      {...rest}
    >
      {children}
    </Box>
  );
};

export default GameCard;

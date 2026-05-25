import React from "react";
import { Button } from "@chakra-ui/react";

const OptionButton = ({
  isSelected,
  isCorrect,
  children,
  onClick,
  isDisabled,
  ...rest
}) => {
  let bg = "gray.50";
  let color = "ink.900";
  let borderColor = "gray.300";
  let boxShadow = "neu";
  let transform = "none";

  if (isCorrect === true) {
    bg = "pastel.green";
    borderColor = "green.700";
    boxShadow = "none";
  } else if (isCorrect === false) {
    bg = "pastel.red";
    borderColor = "red.700";
    boxShadow = "none";
  } else if (isSelected) {
    bg = "brand.500";
    borderColor = "brand.900";
    color = "brand.900";
    boxShadow = "none";
    transform = "translateY(4px)";
  }

  return (
    <Button
      onClick={onClick}
      isDisabled={isDisabled}
      bg={bg}
      color={color}
      fontSize="md"
      fontWeight="bold"
      height="auto"
      py={3}
      whiteSpace="normal"
      borderRadius="md"
      borderWidth="2px"
      borderColor={borderColor}
      justifyContent="flex-start"
      px={4}
      transition="all 0.1s"
      boxShadow={boxShadow}
      transform={transform}
      _hover={!isDisabled ? { bg: isSelected ? "brand.500" : "gray.100" } : {}}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default OptionButton;

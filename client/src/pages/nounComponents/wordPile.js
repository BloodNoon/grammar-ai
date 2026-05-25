import React, { useMemo } from "react";
import { Box, Text } from "@chakra-ui/react";

const WordPile = () => {
  // A collection of words to stack
  const words = [
    "City",
    "Teacher",
    "Doctor",
    "Dog",
    "Cat",
    "School",
    "Girl",
    "Apple",
    "Horse",
    "Chair",
    "Park",
    "Book",
  ];

  // Calculate random positions, rotations, and sizes once on mount
  const pileData = useMemo(() => {
    return words.map((word) => ({
      text: word,
      // Random rotation between -40deg and 40deg
      rotation: Math.floor(Math.random() * 80) - 40,
      // Cluster the words near the center (between 35% and 65%)
      top: `${35 + Math.random() * 30}%`,
      left: `${35 + Math.random() * 30}%`,
      right: `${35 + Math.random() * 30}%`,
      // Random font sizes to create depth
      fontSize: `${1.5 + Math.random() * 2.5}rem`,
      // Random z-index so the stacking order is mixed up
      zIndex: Math.floor(Math.random() * 20),
    }));
  }, [words]);

  return (
    <Box
      position="relative"
      maxW="600px"
      h="400px"
      mx="auto"
      bg="white"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="sm"
    >
      {pileData.map((item, index) => (
        <Text
          key={index}
          position="absolute"
          top={item.top}
          left={item.left}
          // translate(-50%, -50%) centers the text exactly on its top/left coordinates
          transform={`translate(-50%, -50%) rotate(${item.rotation}deg)`}
          fontSize={item.fontSize}
          fontWeight="extrabold"
          color="black"
          zIndex={item.zIndex}
          textShadow="2px 2px 4px rgba(0,0,0,0.15)"
          // Adding a hover effect to pull the word to the top of the pile
          _hover={{
            zIndex: 50,
            color: "blue.500",
            transform: `translate(-50%, -50%) rotate(0deg) scale(1.1)`,
          }}
          transition="all 0.2s ease-in-out"
          cursor="default"
          userSelect="none"
        >
          {item.text}
        </Text>
      ))}
    </Box>
  );
};

export default WordPile;

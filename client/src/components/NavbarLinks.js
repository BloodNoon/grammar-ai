import React from "react";
import { Link } from "react-router-dom";
import { HStack, Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function NavbarLinks() {
  const MotionBox = motion(Box);

  return (
    <HStack spacing={8}>
      <MotionBox
        _hover={{
          borderBottom: "2px",
          borderColor: "orange.400",
        }}
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      >
        <Link to="/" mx="1rem">
          <Text mx="1rem" fontSize="lg">
            Home
          </Text>
        </Link>
      </MotionBox>
      <MotionBox
        _hover={{
          borderBottom: "2px",
          borderColor: "orange.400",
        }}
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      >
        <Link to="/practice-menu" mx="1rem">
          <Text mx="1rem" fontSize="lg">
            Practice Menu
          </Text>
        </Link>
      </MotionBox>
      <MotionBox
        _hover={{
          borderBottom: "2px",
          borderColor: "orange.400",
        }}
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      >
        <Link
          to={{ pathname: "https://forms.gle/N8aZD3yeA9ya7SMW6" }}
          target="_blank"
          mx="1rem"
        >
          <Text mx="1rem" fontSize="lg">
            Report Bug
          </Text>
        </Link>
      </MotionBox>
    </HStack>
  );
}

import React, { useState } from "react";
import { Box, Flex, Heading, Text, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const carouselData = [
  {
    id: 1,
    title: "Person",
    content: "teacher, doctor, girl",
  },
  {
    id: 2,
    title: "Place",
    content: "city, park, school",
  },
  {
    id: 3,
    title: "Thing",
    content: "book, apple, chair",
  },
  {
    id: 4,
    title: "Animal",
    content: "dog, cat, horse",
  },
];

const Carousel = ({ title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1,
    );
  };

  return (
    <Box mx="auto" p={5}>
      {/* Optional Title Section */}
      {title && (
        <Heading as="h2" size="xl" textAlign="center" mb={6}>
          {title}
        </Heading>
      )}

      {/* Main Carousel Area */}
      <Flex
        align="center"
        justify="space-between"
        borderRadius="xl"
        p={6}
        backgroundColor="white"
        boxShadow="md"
        minH="250px"
      >
        <IconButton
          aria-label="Previous slide"
          icon={<ChevronLeftIcon w={8} h={8} />}
          onClick={prevSlide}
          variant="ghost"
          colorScheme="blue"
          borderRadius="full"
        />

        <Box textAlign="center" flex="1" px={4}>
          <Heading as="h2" size="xl" mb={4} color="blue.500">
            {carouselData[currentIndex].title}
          </Heading>
          <Text fontSize="xl">{carouselData[currentIndex].content}</Text>
        </Box>

        <IconButton
          aria-label="Next slide"
          icon={<ChevronRightIcon w={8} h={8} />}
          onClick={nextSlide}
          variant="ghost"
          colorScheme="blue"
          borderRadius="full"
        />
      </Flex>

      {/* Dot Indicators */}
      <Flex justify="center" mt={6} gap={3}>
        {carouselData.map((_, index) => (
          <Box
            key={index}
            w={3}
            h={3}
            borderRadius="full"
            bg={index === currentIndex ? "blue.500" : "gray.300"}
            transition="background-color 0.2s"
            cursor="pointer"
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default Carousel;

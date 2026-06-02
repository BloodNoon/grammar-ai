import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import GameCard from "./GameCard";

/**
 * LessonVideoCard - A reusable component for lesson videos.
 * If multiple videos are provided, it renders them as separate cards.
 * 
 * @param {Array|string} videos - A single video source string or an array of objects { src, title, subtitle }.
 * @param {string} title - The title to display if not provided in the video object.
 * @param {string} subtitle - The subtitle to display if not provided in the video object.
 */
const LessonVideoCard = ({ videos, title, subtitle }) => {
  // Normalize videos to an array of objects
  const videoList = Array.isArray(videos) 
    ? videos.map(v => (typeof v === 'string' ? { src: v } : v))
    : [{ src: videos }];

  return (
    <>
      {videoList.map((video, index) => (
        <GameCard key={index} variant="game" bg="gray.50">
          <Heading size="md" color="ink.700" mb={4}>
            📹 Today's Lesson: {video.title || title || "Grammar Focus"}
          </Heading>

          <Box
            position="relative"
            w="100%"
            bg="black"
            borderRadius="lg"
            overflow="hidden"
            borderWidth="1px"
            borderColor="gray.300"
          >
            <video
              controls
              style={{ width: "100%", height: "480px", display: "block" }}
            >
              <source src={video.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>

          {(video.subtitle || (index === 0 && subtitle)) && (
            <Text mt={3} fontSize="sm" color="gray.500" fontStyle="italic">
              {video.subtitle || subtitle}
            </Text>
          )}
        </GameCard>
      ))}
    </>
  );
};

export default LessonVideoCard;

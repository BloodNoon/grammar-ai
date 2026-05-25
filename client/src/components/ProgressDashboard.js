import React from "react";
import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { StatCard, ProgressBar } from "./ui";

const AchievementBadge = ({ title, unlocked, icon }) => (
  <Box
    textAlign="center"
    p={4}
    borderRadius="lg"
    bg={unlocked ? "green.100" : "gray.200"}
    color={unlocked ? "green.800" : "gray.500"}
  >
    <Box
      mx="auto"
      w={16}
      h={16}
      borderRadius="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={unlocked ? "green.200" : "gray.300"}
    >
      {icon}
    </Box>
    <Text mt={2} fontSize="sm" fontWeight="semibold">
      {title}
    </Text>
    <Text fontSize="xs">{unlocked ? "Unlocked!" : "Locked"}</Text>
  </Box>
);

export default function ProgressDashboard() {
  const progressData = {
    lessonsCompleted: 5,
    totalLessons: 20,
    quizAverage: 88,
    achievements: [
      { id: 1, title: "First Steps", unlocked: true },
      { id: 2, title: "Quiz Whiz", unlocked: true },
      { id: 3, title: "Sentence Starter", unlocked: true },
      { id: 4, title: "Grammar Guru", unlocked: false },
      { id: 5, title: "Punctuation Pro", unlocked: false },
    ],
  };

  const completionPercentage =
    (progressData.lessonsCompleted / progressData.totalLessons) * 100;

  const BookIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 6.253v11.494m0 0a7.5 7.5 0 007.5-7.5H4.5a7.5 7.5 0 007.5 7.5z" />
    </svg>
  );
  const ChartIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9.5a2.5 2.5 0 015 0V19m-5 0h5" />
    </svg>
  );
  const TrophyIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
    </svg>
  );

  return (
    <Box bg="gray.50" p={{ base: 6, md: 8 }} borderRadius="2xl" boxShadow="lg">
      <Heading size="xl" color="gray.800" mb={6}>
        Your Progress
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
        <StatCard
          title="Lessons Completed"
          value={`${progressData.lessonsCompleted} / ${progressData.totalLessons}`}
          icon={<BookIcon />}
        />
        <StatCard
          title="Quiz Average"
          value={`${progressData.quizAverage}%`}
          icon={<ChartIcon />}
        />
      </SimpleGrid>

      <Box mb={8}>
        <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={2}>
          Overall Completion
        </Text>
        <ProgressBar value={completionPercentage} colorScheme="blue" />
        <Text textAlign="right" fontSize="sm" color="gray.500" mt={1}>
          {Math.round(completionPercentage)}% Complete
        </Text>
      </Box>

      <Box>
        <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={4}>
          Achievements
        </Text>
        <SimpleGrid columns={{ base: 2, sm: 3, md: 5 }} spacing={4}>
          {progressData.achievements.map((ach) => (
            <AchievementBadge
              key={ach.id}
              title={ach.title}
              unlocked={ach.unlocked}
              icon={<TrophyIcon />}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

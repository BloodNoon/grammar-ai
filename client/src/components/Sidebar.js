import React, { useState } from "react";
import {
  Box,
  VStack,
  Button,
  Text,
  Collapse,
  Flex,
  IconButton,
  Divider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  HamburgerIcon,
  ArrowForwardIcon,
  ArrowBackIcon,
} from "@chakra-ui/icons";

const NAV_SECTIONS = [
  {
    title: "Noun Lessons",
    items: [
      { label: "Introduction to Nouns", to: "/nouns" },
      { label: "Plural Nouns", to: "/plural-noun" },
      { label: "Possessive Nouns", to: "/possessive-nouns" },
      { label: "Noun Practice Games", to: "/noun-practice" },
      { label: "Noun Quiz", to: "/NounQuizPageTest" },
    ],
  },
  {
    title: "Verb Lessons",
    items: [
      { label: "Introduction to Verbs", to: "/verb-tense-structure" },
      { label: "Verb Practice Games", to: "/verb-practice" },
      { label: "Verb Quiz", to: "/verb-tense-quiz" },
    ],
  },
  {
    title: "Article Lessons",
    items: [
      { label: "Introduction to Articles", to: "/article-structure" },
      { label: "Article Practice Games", to: "/article-practice" },
      { label: "Article Quiz", to: "/article-quiz" },
    ],
  },
  {
    title: "Preposition Lessons",
    items: [
      { label: "Preposition Lesson", to: "/prep1-structure" },
      { label: "Prepositional Phrases", to: "/prep2-structure" },
      { label: "Compound Prepositions", to: "/prep3-structure" },
      { label: "Preposition Practice", to: "/preposition-practice" },
      { label: "Preposition Quiz", to: "/preposition-quiz" },
    ],
  },
  {
    title: "Adjective Lessons",
    items: [
      { label: "Introduction to Adjectives", to: "/adjective-structure" },
      { label: "Adjective Royal Order", to: "/adjective-royal-order" },
      { label: "Sentence Structures", to: "/adjective-sentence-structures" },
      { label: "Adjective Game", to: "/adjective-fill-blanks" },
      { label: "Adjective Practice", to: "/adjective-practice" },
      { label: "Adjective Quiz", to: "/adj-quiz" },
    ],
  },
  {
    title: "Adverb Lessons",
    items: [
      { label: "Introduction to Adverbs", to: "/adverb-structure" },
      { label: "Adverb Types", to: "/adverb-types" },
      { label: "Type Sorting", to: "/adverb-type-sorting" },
      { label: "Adverb Forms", to: "/adverb-forms" },
      { label: "Adverb Royal Order", to: "/adverb-royal-order" },
      { label: "Sentence Structures", to: "/adverb-sentence-structures" },
      { label: "Identification Game", to: "/adverb-identification-game" },
      { label: "Adverb Practice", to: "/adverb-practice" },
      { label: "Adverb Quiz", to: "/adverb-quiz" },
    ],
  },
  {
    title: "Conjunction Lessons",
    items: [
      { label: "Introduction to Conjunctions", to: "/conjunction-structure" },
      { label: "Conjunction Practice", to: "/conjunction-practice" },
      { label: "Conjunction Quiz", to: "/conjunction-quiz" },
    ],
  },
  {
    title: "Sentence Structure",
    items: [
      { label: "Lesson 1: Nouns", to: "/nouns" },
      { label: "Lesson 2: Verb Tenses", to: "/verb-tense-structure" },
      { label: "Lesson 3: Articles", to: "/article-structure" },
      { label: "Lesson 4: Prepositions", to: "/prep1-structure" },
      { label: "Lesson 5: Adjectives", to: "/adjective-structure" },
      { label: "Lesson 6: Adverbs", to: "/adverb-structure" },
      { label: "Lesson 7: Conjunctions", to: "/conjunction-structure" },
    ],
  },
];

const renderTitle = (title, isCollapsed) => {
  if (isCollapsed) {
    let lines = [];
    if (title === "🐸 Practice Menu") {
      lines = ["🐸 Practice", "Menu"];
    } else {
      lines = title.split(" ");
    }
    return (
      <VStack spacing={0.5} align="flex-start" py={1.5} w="100%">
        {lines.map((line, idx) => (
          <Text
            key={idx}
            fontSize="md"
            fontWeight="semibold"
            lineHeight="1.1"
            whiteSpace="nowrap"
          >
            {line}
          </Text>
        ))}
      </VStack>
    );
  }
  return (
    <Text fontSize="md" fontWeight="semibold">
      {title}
    </Text>
  );
};

const SidebarContent = ({
  isCollapsed,
  setIsCollapsed,
  isMobileDrawer = false,
}) => {
  const [expandedSections, setExpandedSections] = useState(new Set());
  const [hoveredSection, setHoveredSection] = useState(null);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const toggleSection = (index) => {
    if (isCollapsed) {
      setIsCollapsed(false);
      return;
    }
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const isSectionOpen = (index) =>
    !isCollapsed && (expandedSections.has(index) || hoveredSection === index);

  return (
    <Box
      w={isCollapsed ? "160px" : "260px"}
      h="100%"
      transition="width 0.3s ease"
      bg="brand.100"
      display="flex"
      flexDirection="column"
      overflow="hidden"
    >
      {/* Toggle */}
      {!isMobileDrawer && (
        <Flex justify="flex-end" p={2}>
          <IconButton
            icon={isCollapsed ? <ArrowForwardIcon /> : <ArrowBackIcon />}
            size="sm"
            variant="ghost"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          />
        </Flex>
      )}

      {/* Nav Items */}
      <VStack
        align="stretch"
        spacing={6}
        flex="1"
        overflowY="auto"
        px={isCollapsed ? 1 : 2}
        py={4}
      >
        {NAV_SECTIONS.map((section, index) => (
          <Box
            key={index}
            onMouseEnter={() => setHoveredSection(index)}
            onMouseLeave={() => setHoveredSection(null)}
            w="100%"
          >
            {section.isLink ? (
              <Button
                as={RouterLink}
                to={section.to}
                w="100%"
                h={isCollapsed ? "auto" : undefined}
                py={3}
                justifyContent="flex-start"
                variant="ghost"
                size="sm"
                px={isCollapsed ? 3 : undefined}
                colorScheme={isActive(section.to) ? "brand" : undefined}
                fontWeight={isActive(section.to) ? "bold" : "normal"}
                whiteSpace="nowrap"
                onClick={() => isCollapsed && setIsCollapsed(false)}
              >
                {renderTitle(section.title, isCollapsed)}
              </Button>
            ) : (
              <>
                <Button
                  w="100%"
                  h={isCollapsed ? "auto" : undefined}
                  py={3}
                  justifyContent={isCollapsed ? "flex-start" : "space-between"}
                  variant="ghost"
                  size="sm"
                  px={isCollapsed ? 3 : undefined}
                  onClick={() => toggleSection(index)}
                  rightIcon={
                    !isCollapsed &&
                    (isSectionOpen(index) ? (
                      <ChevronDownIcon />
                    ) : (
                      <ChevronRightIcon />
                    ))
                  }
                  whiteSpace="nowrap"
                >
                  {renderTitle(section.title, isCollapsed)}
                </Button>
                <Collapse in={isSectionOpen(index)} animateOpacity>
                  <VStack align="stretch" pl={4} spacing={0}>
                    {section.items.map((item, i) => (
                      <Button
                        key={i}
                        as={RouterLink}
                        to={item.to}
                        w="100%"
                        justifyContent="flex-start"
                        variant="ghost"
                        size="sm"
                        colorScheme={isActive(item.to) ? "brand" : undefined}
                        fontWeight={isActive(item.to) ? "bold" : "normal"}
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        onClick={() => isMobileDrawer && setIsCollapsed(false)}
                      >
                        {item.label}
                      </Button>
                    ))}
                  </VStack>
                </Collapse>
              </>
            )}
          </Box>
        ))}
      </VStack>

      <Divider borderColor="brand.900" opacity={0.2} />

      {/* Auth */}
      <VStack align="stretch" spacing={1} p={2}>
        {!currentUser ? (
          <>
            <Button
              as={RouterLink}
              to="/signup"
              w="100%"
              justifyContent="flex-start"
              variant="ghost"
              size="sm"
              colorScheme="red"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              onClick={() => isCollapsed && setIsCollapsed(false)}
            >
              Sign Up
            </Button>
            <Button
              as={RouterLink}
              to="/login"
              w="100%"
              justifyContent="flex-start"
              variant="ghost"
              size="sm"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              onClick={() => isCollapsed && setIsCollapsed(false)}
            >
              Login
            </Button>
          </>
        ) : (
          <>
            <Text
              fontSize="sm"
              fontWeight="bold"
              px={2}
              noOfLines={1}
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {currentUser.data.alias || currentUser.data.email}
            </Text>
            <Button
              as={RouterLink}
              to="/dashboard"
              w="100%"
              justifyContent="flex-start"
              variant="ghost"
              size="sm"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              onClick={() => isCollapsed && setIsCollapsed(false)}
            >
              Dashboard
            </Button>
            <Button
              w="100%"
              justifyContent="flex-start"
              variant="ghost"
              size="sm"
              onClick={() => {
                logout();
                if (isCollapsed) setIsCollapsed(false);
              }}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              Log Out
            </Button>
          </>
        )}
      </VStack>
    </Box>
  );
};

const Sidebar = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (isMobile) {
    return (
      <>
        <Box position="fixed" top={2} left={2} zIndex={1000}>
          <IconButton
            icon={<HamburgerIcon />}
            size="md"
            colorScheme="brand"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            borderRadius="md"
            boxShadow="sm"
          />
        </Box>
        <Drawer
          isOpen={mobileOpen}
          placement="left"
          onClose={() => setMobileOpen(false)}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody p={0}>
              <SidebarContent
                isCollapsed={false}
                setIsCollapsed={setIsCollapsed}
                isMobileDrawer={true}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return (
    <SidebarContent isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
  );
};

export default Sidebar;

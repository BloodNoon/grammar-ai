import React from 'react';
import { HStack, Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const MainNav = () => {
  // Shared styles for the top-level Menu Buttons to keep your code clean!
  const menuButtonStyles = {
    fontSize: "25px",
    mx: "10px",
    my: "5px",
    _hover: {
      backgroundColor: 'rgb(165, 132, 101)',
      color: 'white',
    }
  };

  return (
    <HStack background="rgba(255, 206, 160)" width="100%" spacing={2} pl="5%">
      <div className="mainNav">

        {/* Practice Menu Button */}
        <Button
          as={ReactRouterLink}
          to="/practice-menu"
          variant="unstyled"
          {...menuButtonStyles}
          p="10px"
        >
          🐸 Practice Menu
        </Button>

        <Menu>
          <MenuButton as={Button} variant="unstyled" {...menuButtonStyles}>
            Noun Lessons
          </MenuButton>
          <MenuList>
            <MenuItem as={ReactRouterLink} to="/nouns">Introduction to Nouns</MenuItem>
            <MenuItem as={ReactRouterLink} to="/noun-practice">Noun Practice Games</MenuItem>
            <MenuItem as={ReactRouterLink} to="/nounComponentTest">Component Test</MenuItem>
            <MenuItem as={ReactRouterLink} to="/NounQuizPageTest">Quiz Test</MenuItem>
          </MenuList>
        </Menu>
        
        
       

{/* Verb Tense Menu */}
        <Menu>
          <MenuButton as={Button} variant="unstyled" {...menuButtonStyles}>
            Verb Lesson
          </MenuButton>
          <MenuList>
            <MenuItem as={ReactRouterLink} to="/verb-tense-structure">Introduction to Verbs</MenuItem>
            <MenuItem as={ReactRouterLink} to="/verb-grammar-legend">Verb Grammar</MenuItem>
            <MenuItem as={ReactRouterLink} to="/verb-sentence-builder">Verb Sentence Building</MenuItem>
            <MenuItem as={ReactRouterLink} to="/verb-level-selection">Verb Level Selector</MenuItem>
            <MenuItem as={ReactRouterLink} to="/verb-wordbank">Verb Word Game</MenuItem>
            <MenuItem as={ReactRouterLink} to="/verb-tense-quiz">Verb Quiz</MenuItem>
          </MenuList>
        </Menu>
          
          {/* Article Menu */}
        <Menu>
          <MenuButton as={Button} variant="unstyled" {...menuButtonStyles}>
            Article Lesson
          </MenuButton>
          <MenuList>
            <MenuItem as={ReactRouterLink} to="/article-structure">Introduction to Articles</MenuItem>
            <MenuItem as={ReactRouterLink} to="/article-grammar-legend">Article Grammar</MenuItem>
            <MenuItem as={ReactRouterLink} to="/article-sentence-builder">Article Sentence Building</MenuItem>
            <MenuItem as={ReactRouterLink} to="/article-level-selection">Article Level Selector</MenuItem>
            <MenuItem as={ReactRouterLink} to="/article-wordbank">Article Word Game</MenuItem>
            <MenuItem as={ReactRouterLink} to="/article-quiz">Article Quiz</MenuItem>
          </MenuList>
        </Menu>
      
      
       {/* Preposition Menu */}
        <Menu>
          <MenuButton as={Button} variant="unstyled" {...menuButtonStyles}>
            Preposition Lesson
          </MenuButton>
          <MenuList>
            <MenuItem as={ReactRouterLink} to="/prep1-structure">Preposition Lesson</MenuItem>
            <MenuItem as={ReactRouterLink} to="/prep2-structure">Prepositional Phrases</MenuItem>
            <MenuItem as={ReactRouterLink} to="/prep3-structure">Compound Prepositions</MenuItem>
            <MenuItem as={ReactRouterLink} to="/preposition-quiz">Preposition Quiz</MenuItem>
          </MenuList>
        </Menu>
        
        
        {/* Adjective Menu */}
        <Menu>
          <MenuButton as={Button} variant="unstyled" {...menuButtonStyles}>
            Adjective Lesson
          </MenuButton>
          <MenuList>
            <MenuItem as={ReactRouterLink} to="/adjective-structure">Introduction to Adjectives</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adjective-royal-order">Adjective Royal Order</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adjective-sentence-structures">Adjective Sentence Structure</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adjective-fill-blanks">Adjective Game</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adj-quiz">Adjective Quiz</MenuItem>
          </MenuList>
        </Menu>

        {/* Adverb Menu */}
        <Menu>
          <MenuButton as={Button} variant="unstyled" {...menuButtonStyles}>
            Adverb Lesson
          </MenuButton>
          <MenuList>
            <MenuItem as={ReactRouterLink} to="/adverb-structure">Introduction to Adverbs</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adverb-types">Adverb Types</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adverb-type-sorting">Adverb Type Sorting</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adverb-forms">Adverb Forms</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adverb-royal-order">Adverb Royal Order</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adverb-sentence-structures">Adverb Sentence Structure</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adverb-identification-game">Adverb Identification Game</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adverb-quiz">Adverb Quiz</MenuItem>
          </MenuList>
        </Menu>
         
         
      
        
       
        {/* Noun Menu (The one that was right!) */}
        

        

{/* Conjunction Menu */}
        <Menu>
          <MenuButton as={Button} variant="unstyled" {...menuButtonStyles}>
            Conjunctions
          </MenuButton>
          <MenuList>
            <MenuItem as={ReactRouterLink} to="/conjunction-structure">Introduction to Conjunctions</MenuItem>
            <MenuItem as={ReactRouterLink} to="/conjunction-quiz">Conjunction Quiz</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </HStack>
  );
};

export default MainNav;

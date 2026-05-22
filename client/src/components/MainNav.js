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
            <MenuItem as={ReactRouterLink} to="/plural-noun">Plural Nouns Lesson</MenuItem>
            <MenuItem as={ReactRouterLink} to="/possessive-nouns">Possessive Nouns</MenuItem>
            <MenuItem as={ReactRouterLink} to="/noun-practice">Noun Practice Games</MenuItem>
            <MenuItem as={ReactRouterLink} to="/NounQuizPageTest">Noun Quiz</MenuItem>
          </MenuList>
        </Menu>
        
        
       

{/* Verb Tense Menu */}
        <Menu>
          <MenuButton as={Button} variant="unstyled" {...menuButtonStyles}>
            Verb Lessons
          </MenuButton>
          <MenuList>
            <MenuItem as={ReactRouterLink} to="/verb-tense-structure">Introduction to Verbs</MenuItem>
            <MenuItem as={ReactRouterLink} to="/verb-practice">Verb Practice Games</MenuItem>
            <MenuItem as={ReactRouterLink} to="/verb-tense-quiz">Verb Quiz</MenuItem>
          </MenuList>
        </Menu>
          
          {/* Article Menu */}
        <Menu>
          <MenuButton as={Button} variant="unstyled" {...menuButtonStyles}>
            Article Lessons
          </MenuButton>
          <MenuList>
            <MenuItem as={ReactRouterLink} to="/article-structure">Introduction to Articles</MenuItem>
            <MenuItem as={ReactRouterLink} to="/article-practice">Article Practice Games</MenuItem>
            <MenuItem as={ReactRouterLink} to="/article-quiz">Article Quiz</MenuItem>
          </MenuList>
        </Menu>
      
      
       {/* Preposition Menu */}
        <Menu>
          <MenuButton as={Button} variant="unstyled" {...menuButtonStyles}>
            Preposition Lessons
          </MenuButton>
          <MenuList>
            <MenuItem as={ReactRouterLink} to="/prep1-structure">Preposition Lesson</MenuItem>
            <MenuItem as={ReactRouterLink} to="/prep2-structure">Prepositional Phrases</MenuItem>
            <MenuItem as={ReactRouterLink} to="/prep3-structure">Compound Prepositions</MenuItem>
            <MenuItem as={ReactRouterLink} to="/preposition-practice">Preposition Practice Games</MenuItem>
            <MenuItem as={ReactRouterLink} to="/preposition-quiz">Preposition Quiz</MenuItem>
          </MenuList>
        </Menu>
        
        
        {/* Adjective Menu */}
        <Menu>
          <MenuButton as={Button} variant="unstyled" {...menuButtonStyles}>
            Adjective Lessons
          </MenuButton>
          <MenuList>
            <MenuItem as={ReactRouterLink} to="/adjective-structure">Introduction to Adjectives</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adjective-royal-order">Adjective Royal Order</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adjective-sentence-structures">Adjective Sentence Structure</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adjective-fill-blanks">Adjective Game</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adjective-practice">Adjective Practice Games</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adj-quiz">Adjective Quiz</MenuItem>
          </MenuList>
        </Menu>
 
        {/* Adverb Menu */}
        <Menu>
          <MenuButton as={Button} variant="unstyled" {...menuButtonStyles}>
            Adverb Lessons
          </MenuButton>
          <MenuList>
            <MenuItem as={ReactRouterLink} to="/adverb-structure">Introduction to Adverbs</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adverb-types">Adverb Types</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adverb-type-sorting">Adverb Type Sorting</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adverb-forms">Adverb Forms</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adverb-royal-order">Adverb Royal Order</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adverb-sentence-structures">Adverb Sentence Structure</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adverb-identification-game">Adverb Identification Game</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adverb-practice">Adverb Practice Games</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adverb-quiz">Adverb Quiz</MenuItem>
          </MenuList>
        </Menu>
         
         
      
        
       
        {/* Noun Menu (The one that was right!) */}
        

        

{/* Conjunction Menu */}
        <Menu>
          <MenuButton as={Button} variant="unstyled" {...menuButtonStyles}>
            Conjunction Lessons
          </MenuButton>
          <MenuList>
            <MenuItem as={ReactRouterLink} to="/conjunction-structure">Introduction to Conjunctions</MenuItem>
            <MenuItem as={ReactRouterLink} to="/conjunction-practice">Conjunction Practice Games</MenuItem>
            <MenuItem as={ReactRouterLink} to="/conjunction-quiz">Conjunction Quiz</MenuItem>
          </MenuList>
        </Menu>

        {/* Sentence Structure dropdown munu */}
        <Menu>
          <MenuButton as={Button} variant="unstyled" {...menuButtonStyles}>
            Sentence Structure
          </MenuButton>
          <MenuList>
            <MenuItem as={ReactRouterLink} to="/nouns">Lesson 1: Nouns</MenuItem>
            <MenuItem as={ReactRouterLink} to="/article-structure">Lesson 2: Articles</MenuItem>
            <MenuItem as={ReactRouterLink} to="/verb-tense-structure">Lesson 3: Verb Tenses</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adjective-structure">Lesson 4: Adjectives</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adverb-structure">Lesson 5: Adverbs</MenuItem>
            <MenuItem as={ReactRouterLink} to="/prep1-structure">Lesson 6: Prepositions</MenuItem>
            <MenuItem as={ReactRouterLink} to="/conjunction-structure">Lesson 7: Conjunctions</MenuItem>
          </MenuList>
        </Menu>

      </div>
    </HStack>
  );
};

export default MainNav;

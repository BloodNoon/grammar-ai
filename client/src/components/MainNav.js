import React from 'react';
import { HStack, Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";



const MainNav = () => {
  return (
    <HStack background="rgba(255, 206, 160)" width="100%" spacing={0}>
      <div className="mainNav">
        <Menu>
        <MenuButton as={ReactRouterLink} 
        to="/sentence-structure" 
        colorScheme='rgb(255, 206, 160)' 
        color="black.500"
        fontSize="25px"
        mx="10px"
        my="5px"
        _hover={{
          backgroundColor: 'rgb(165, 132, 101)',
          color: 'white',
        }}>
          Sentence Structure
        </MenuButton>
        <MenuList>
            <MenuItem as={ReactRouterLink} to="/sentence-structure">Sentence Structure Quiz</MenuItem>
          </MenuList>
        </Menu>
        
        <Menu>
        <MenuButton as={ReactRouterLink} 
        to="/adjective-structure" 
        colorScheme='rgb(255, 206, 160)' 
        color="black.500"
        fontSize="25px"
        mx="10px"
        my="5px"
        _hover={{
          backgroundColor: 'rgb(165, 132, 101)',
          color: 'white',
        }}>
          Adjective Lesson
            

        </MenuButton>
        <MenuList>
            <MenuItem as={ReactRouterLink} to="/adjective-lesson">Introduction to Adjectives</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adjective-royal-order">Adjective Royal Order</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adjective-sentence-structures">Adjective Sentence Structure</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adjective-fill-blanks">Adjective Game</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adjective-quiz">Adjective Quiz</MenuItem>
          </MenuList>
          </Menu>


        <Menu>
          <MenuButton as={ReactRouterLink} 
        to="/adverb-structure" 
        colorScheme='rgb(255, 206, 160)' 
        color="black.500"
        fontSize="25px"
        mx="10px"
        my="5px"
        _hover={{
          backgroundColor: 'rgb(165, 132, 101)',
          color: 'white',
        }}>
          Adverb Lesson
        </MenuButton>
         <MenuList>
            <MenuItem as={ReactRouterLink} to="/adverb-lesson">Introduction to Adverbs</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adverb-types">Adverb Types</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adverb-type-sorting">Adverb Type Sorting</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adverb-forms">Adverb Forms</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adverb-royal-order">Adverb Royal Order</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adverb-sentence-structures">Adverb Sentence Structure</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adverb-sorting-game">Adverb Sorting Game</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adverb-identification-game">Adverb Identification Game</MenuItem>
            <MenuItem as={ReactRouterLink} to="/adverb-quiz">Adverb Quiz</MenuItem>
          </MenuList>
        </Menu>
        

        <Menu>
        <MenuButton as={ReactRouterLink} 
        to="/article-structure" 
        colorScheme='rgb(255, 206, 160)' 
        color="black.500" 
        fontSize="25px"
        mx="10px"
        my="5px"
        _hover={{
          backgroundColor: 'rgb(165, 132, 101)',
          color: 'white',
        }}>
          Article Lesson
        </MenuButton>
        <MenuList>
            <MenuItem as={ReactRouterLink} to="/article-lesson">Introduction to Articles</MenuItem>
            <MenuItem as={ReactRouterLink} to="/article-grammar-legend">Article Grammar</MenuItem>
            <MenuItem as={ReactRouterLink} to="/article-sentence-builder">Article Sentence Building</MenuItem>
            <MenuItem as={ReactRouterLink} to="/article-level-selection">Article Level Selector</MenuItem>
            <MenuItem as={ReactRouterLink} to="/article-wordbank">Article Word Game</MenuItem>
            <MenuItem as={ReactRouterLink} to="/article-typing-quiz">Article Quiz</MenuItem>
          </MenuList>
        </Menu>
        
        <Menu>
        <MenuButton as={ReactRouterLink} 
        to="/verb-tense-structure" 
        colorScheme='rgb(255, 206, 160)' 
        color="black.500"
        fontSize="25px"
        mx="10px"
        my="5px"
        _hover={{
          backgroundColor: 'rgb(165, 132, 101)',
          color: 'white',
        }}
        >
          Verb Tense Lesson
        </MenuButton>
        <MenuList>
            <MenuItem as={ReactRouterLink} to="/verb-tense-lesson">Introduction to Verbss</MenuItem>
            <MenuItem as={ReactRouterLink} to="/verb-grammar-legend">Verb Grammar</MenuItem>
            <MenuItem as={ReactRouterLink} to="/verb-sentence-builder">Verb Sentence Building</MenuItem>
            <MenuItem as={ReactRouterLink} to="/verb-level-selection">Verb Level Selector</MenuItem>
            <MenuItem as={ReactRouterLink} to="/verb-wordbank">Verb Word Game</MenuItem>
            <MenuItem as={ReactRouterLink} to="/verb-typing-quiz">Verb Quiz</MenuItem>
          </MenuList>
        </Menu>
        

        <Menu>
          <MenuButton as={Button}
          variant="unstyled"
          fontSize="25px"
          mx="10px"
          my="5px"
          _hover={{
          backgroundColor: 'rgb(165, 132, 101)',
          color: 'white',
        }}>
            Noun Lessons
          </MenuButton>
          <MenuList>
            <MenuItem as={ReactRouterLink} to="/nouns">Introduction to Nouns</MenuItem>
            <MenuItem as={ReactRouterLink} to="/propcom-nouns">Common & Proper Nouns</MenuItem>
            <MenuItem as={ReactRouterLink} to="/abplur-nouns">Abstract & Plural Nouns</MenuItem>
            <MenuItem as={ReactRouterLink} to="/noun-practice">Noun Practice Games</MenuItem>
            <MenuItem as={ReactRouterLink} to="/noun-component-test">Component Test</MenuItem>
            <MenuItem as={ReactRouterLink} to="/NounQuizPageTest">Quiz Test</MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton as={Button}
          variant="unstyled"
          fontSize="25px"
          mx="10px"
          my="5px"
          _hover={{
          backgroundColor: 'rgb(165, 132, 101)',
          color: 'white',
        }}>
            Preposition Lesson
          </MenuButton>
          <MenuList>
            <MenuItem as={ReactRouterLink} to="/prep1-structure">Preposition Lesson</MenuItem>
            <MenuItem as={ReactRouterLink} to="/prep2-structure">Prepositional Phrases</MenuItem>
            <MenuItem as={ReactRouterLink} to="/prep3-structure">Compound Prepositions</MenuItem>
          </MenuList>
        </Menu>

      </div>
    </HStack>
  );
};

export default MainNav;

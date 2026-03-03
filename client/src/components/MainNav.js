import React from 'react';
import { HStack, Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";



const MainNav = () => {
  return (
    <HStack background="rgba(255, 206, 160)" width="100%" spacing={0}>
      <div className="mainNav">
        
<Button as={ReactRouterLink} 
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
        </Button>

        <Button as={ReactRouterLink} 
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
        </Button>

        <Button as={ReactRouterLink} 
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
        </Button>

        <Button as={ReactRouterLink} 
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
        </Button>

        <Button as={ReactRouterLink} 
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
        </Button>

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
            <MenuItem as={ReactRouterLink} to="/noun-component-test">Component Test</MenuItem>
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
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {Box, VStack, Heading, Text} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';



function ContentBox({ title, info }) {
  return (
    <Box
      p={5}
      borderWidth="1px"
      borderRadius="lg"
      backgroundColor="white"
    >
      <Heading fontSize="2em" fontWeight="semibold" textAlign="center">
        {title}
      </Heading>
      <Text fontSize="xl" mt={4} textAlign="center">
        {info}
      </Text>
    </Box>
  );
}






export default function NounsPage() {
  return (
    <Box borderWidth="1px" backgroundColor="#F0FDF4">
    <VStack spacing={6} p={8} align="stretch">
      <ContentBox
        title="Lesson 1: Introduction to Nouns"
        info="A noun is a word that names a person, place, thing, or animal."
      />
      <ContentBox
        title="Examples of Nouns"
        info="Here are some examples of nouns:"
        />
    </VStack>
    </Box>
  );
}
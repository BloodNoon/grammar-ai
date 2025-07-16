import React from 'react';
import { Box, Center, Heading, Text, VStack, Flex } from '@chakra-ui/react';

export default function HomeIntro() {
	return (
		<Box bgGradient="linear(to-r, red.300, yellow.400)" w="100vw">
			<Center>
				<VStack py="4rem">
					<Flex
						w="60vw"
						p="2rem"
						direction="column"
						justify="center"
						align="center"
						textAlign="center"
					>
						<Heading
							mb="1rem"
							bgGradient="linear(to-l, teal.400, yellow.700)"
							bgClip="text"
							fontSize="5xl"
						>
							Learn all the sentence structures!
						</Heading>
						<Text fontSize="2xl" textAlign="center" color="white">
							Writing is like playing puzzles. You pick the{' '}
							<strong>right</strong> piece and stick it in the{' '}
							<strong>right</strong> place.
						</Text>
					</Flex>
				</VStack>
			</Center>
		</Box>
	);
}

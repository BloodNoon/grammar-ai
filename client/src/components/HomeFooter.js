import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';
import {
	Box,
	Center,
	Heading,
	Text,
	VStack,
	Flex,
	Button,
} from '@chakra-ui/react';

export default function HomeFooter() {
	const history = useHistory();
	const { currentUser } = useAuth();

	function handleClick() {
		if (currentUser) {
			history.push('/prompts');
		} else {
			history.push('/signup');
		}
	}

	return (
		<Box bgGradient="linear(to-l, red.300, yellow.400)" w="100vw">
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
							Excited to learn about writing?
						</Heading>
						<Text fontSize="2xl" textAlign="center" color="white">
							We believe you are in the <strong>right</strong> place!
						</Text>
						<Button
							onClick={handleClick}
							w="40vw"
							py="2rem"
							mt="1rem"
							fontSize="2xl"
							rightIcon={<ChevronRightIcon />}
						>
							{currentUser ? 'Start Writing Now!' : 'Try it out now!'}
						</Button>
					</Flex>
				</VStack>
			</Center>
		</Box>
	);
}

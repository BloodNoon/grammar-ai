import React from 'react';
import { Link } from 'react-router-dom';
import {
	Icon,
	SimpleGrid,
	Box,
	Text,
	VStack,
	Heading,
	Center,
} from '@chakra-ui/react';
import { BsBook, BsCheckBox } from 'react-icons/bs';

export default function HomeFeature() {
	return (
		<Box>
			<Center>
				<VStack>
					<Heading
						mb="1rem"
						bgGradient="linear(to-l, teal.400, yellow.700)"
						bgClip="text"
						fontSize="5xl"
					>
						How we can help you to improve?
					</Heading>
					<SimpleGrid columns={[1, 1, 2, 2]} spacingX="1rem">
						<Box
							w="20rem"
							px="2rem"
							py="1rem"
							border="2px"
							borderColor="orange.300"
							borderRadius="1rem"
						>
							<Center>
								<Icon as={BsBook} boxSize="5rem" color="gray.200" />
							</Center>

							<Heading
								fontSize="lg"
								color="orange.400"
								fontWeight="500"
								my="0.5rem"
							>
								Read and learn from others
							</Heading>
							<Text fontSize="md" color="gray.400">
								Let the world see how you write and improve while
								reading.
							</Text>
						</Box>
					<Link to="/sentence-structure">
						<Box
							w="20rem"
							px="2rem"
							py="1rem"
							border="2px"
							borderColor="orange.300"
							borderRadius="1rem"
						>
							<Center>
								<Icon as={BsCheckBox} boxSize="5rem" color="gray.200" />
							</Center>
							<Heading
								fontSize="lg"
								color="orange.400"
								fontWeight="500"
								my="0.5rem"
							>
								Sentence structure checking
							</Heading>
							<Text fontSize="md" color="gray.400">
								Nothing to worry about wrong structures because we will
								check it for you with just <strong>one click</strong>.
							</Text>
						</Box>
					</Link>
					</SimpleGrid>
				</VStack>
			</Center>
		</Box>
	);
}

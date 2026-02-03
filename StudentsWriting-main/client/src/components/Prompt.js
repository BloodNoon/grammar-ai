import React from 'react';
import {
	Box,
	Grid,
	GridItem,
	Heading,
	Text,
	HStack,
	Tag,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

export default function Prompt({ prompt }) {
	const date = new Date(prompt.createdOn).toLocaleString();
	const MotionBox = motion(Box);

	function getGrade() {
		if (prompt?.grade) {
			let grade = [];
			for (const g in prompt.grade) {
				if (prompt.grade[g]) {
					grade.push(g.split('_')[1]);
				}
			}
			return grade.includes('any') ? ['any'] : grade;
		}
	}

	return (
		<MotionBox
			px="2rem"
			py="1rem"
			my="1rem"
			border="1px solid orange"
			borderRadius="1rem"
			whileHover={{ scale: 1.01 }}
		>
			<Grid
				templateColumns={['repeat(1, 1fr)', null, 'repeat(6, 1fr)']}
				templateRows={['repeat(4, 1fr)', 'repeat(3, 1fr)']}
			>
				<GridItem colSpan={['2', '4']}>
					<Heading fontSize="md">{prompt.title}</Heading>
				</GridItem>
				<GridItem colSpan="1" colStart={['1', null, '6']} colEnd="7">
					<HStack spacing="1rem">
						<Tag color="gray.400" fontSize="0.75rem">
							{prompt.type}
						</Tag>
						<Text color="gray.400" fontSize="0.75rem">
							{date}
						</Text>
					</HStack>
				</GridItem>
				<GridItem colSpan="6" colStart="1">
					<Text color="gray.400" fontSize="sm" fontStyle="italic">
						{prompt.description ? prompt.description : ''}
					</Text>
				</GridItem>
				<GridItem>
					<HStack>
						{getGrade().map((g) => {
							return (
								<Tag color="gray.400" fontSize="0.75rem" key={g}>
									{g}
								</Tag>
							);
						})}
					</HStack>
				</GridItem>
			</Grid>
		</MotionBox>
	);
}

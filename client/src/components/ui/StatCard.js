import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const StatCard = ({ title, value, icon }) => (
	<Box
		bg="white"
		p={6}
		borderRadius="xl"
		boxShadow="md"
		transition="transform 0.2s"
		_hover={{ transform: 'scale(1.05)' }}
	>
		<Flex align="center" gap={4}>
			<Box bg="blue.50" p={3} borderRadius="full">
				{icon}
			</Box>
			<Box>
				<Text fontSize="sm" fontWeight="medium" color="gray.500">
					{title}
				</Text>
				<Text fontSize="2xl" fontWeight="bold" color="gray.800">
					{value}
				</Text>
			</Box>
		</Flex>
	</Box>
);

export default StatCard;

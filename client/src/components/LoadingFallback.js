import React from 'react';
import { Center, Spinner, VStack, Text } from '@chakra-ui/react';

export default function LoadingFallback() {
	return (
		<Center minH="60vh" w="100%">
			<VStack spacing={4}>
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="teal.500"
					size="xl"
				/>
				<Text color="gray.500" fontSize="lg">
					Loading...
				</Text>
			</VStack>
		</Center>
	);
}

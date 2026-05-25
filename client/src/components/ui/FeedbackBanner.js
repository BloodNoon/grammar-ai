import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const FeedbackBanner = ({ type, children, ...rest }) => (
	<Box
		bg={type === 'success' ? 'green.50' : 'red.50'}
		p={4}
		borderRadius="xl"
		borderWidth="3px"
		borderColor={type === 'success' ? 'green.400' : 'red.400'}
		textAlign="center"
		{...rest}
	>
		<Text fontWeight="bold" color={type === 'success' ? 'green.800' : 'red.800'}>
			{children}
		</Text>
	</Box>
);

export default FeedbackBanner;

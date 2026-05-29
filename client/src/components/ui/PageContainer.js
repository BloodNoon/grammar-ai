import React from 'react';
import { Box } from '@chakra-ui/react';

const PageContainer = ({ bg = 'brand.300', children }) => (
	<Box bg={bg} minH="100%" py={6} px={{ base: 4, md: 8 }} fontFamily="body">
		<Box maxW="1600px" mx="auto">
			{children}
		</Box>
	</Box>
);

export default PageContainer;

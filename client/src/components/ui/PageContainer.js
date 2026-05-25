import React from 'react';
import { Box } from '@chakra-ui/react';

const PageContainer = ({ bg = 'brand.300', children }) => (
	<Box bg={bg} minH="100vh" py={6} px={{ base: 4, md: 8 }} fontFamily="body">
		<Box maxW="1200px" mx="auto">
			{children}
		</Box>
	</Box>
);

export default PageContainer;

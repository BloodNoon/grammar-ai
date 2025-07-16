import React from 'react';
import Navbar from './Navbar';
import { Flex, Text } from '@chakra-ui/react';

export default function Layout({ children }) {
	return (
		<div>
			<Navbar />

			<Flex justify="center">{children}</Flex>

			<Flex minW="100vw" mt="1.5rem" justify="center" align="center">
				<Text>© 2020 - 2021 Students Writing.com</Text>
			</Flex>
		</div>
	);
}

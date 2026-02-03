import React from 'react';
import { Link } from 'react-router-dom';
import { HStack, Image, Heading } from '@chakra-ui/react';
import logo from '../images/logo.svg';

export default function NavbarLogo() {
	return (
		<HStack>
			<Image
				boxSize="2.5rem"
				src={logo}
				alt="logo"
				boxShadow="xl"
				rounded="md"
			/>
			<Link to="/">
				<Heading
					size="lg"
					fontWeight="bold"
					bgGradient="linear(to-l, red.400, yellow.300)"
					bgClip="text"
				>
					Students Writing
				</Heading>
			</Link>
		</HStack>
	);
}

import React from 'react';
import { Link } from 'react-router-dom';
import { HStack, Image, Heading } from '@chakra-ui/react';
import logo from '../images/logo.svg';

export default function NavbarLogo(props) {
	return (
		<HStack {...props}>
			<Image
				boxSize="2.5rem"
				src={logo}
				alt="logo"
				boxShadow="xl"
				rounded="md"
				bg="brand.900"
				p={1.5}
			/>
			<Link to="/">
				<Heading
					size="lg"
					fontWeight="bold"
					color="brand.900"
				>
					Students Writing
				</Heading>
			</Link>
		</HStack>
	);
}

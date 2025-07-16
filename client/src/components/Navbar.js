import React from 'react';
import { Box, Flex, Center, Spacer, useMediaQuery } from '@chakra-ui/react';
import NavbarLinks from './NavbarLinks';
import NavbarLogo from './NavbarLogo';
import NavbarDropDown from './NavbarDropDown';

export default function Navbar() {
	const [isMobile] = useMediaQuery('(max-width:480px)');

	return (
		<Center>
			<Box
				w="90vw"
				p={['0.5rem', '1rem']}
				mx={['0.25rem', '0.5rem']}
				my="0.5rem"
				borderRadius="10px"
				// bgGradient="linear(to-l, red.400, yellow.300)"
				// position="fixed"
			>
				<Flex>
					<NavbarLogo />
					<Spacer />
					{!isMobile && <NavbarLinks />}
					<Spacer />
					<NavbarDropDown />
				</Flex>
			</Box>
		</Center>
	);
}

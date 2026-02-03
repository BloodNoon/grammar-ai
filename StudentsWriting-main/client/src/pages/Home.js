import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import HomeIntro from '../components/HomeIntro';
import { VStack, Divider } from '@chakra-ui/react';
import HomeFeature from '../components/HomeFeature';
import HomeFooter from '../components/HomeFooter';

export default function Home() {
	return (
		<Layout>
			<VStack spacing="5rem">
				<Divider />
				<Hero />
				<HomeIntro />
				<HomeFeature />
				<HomeFooter />
			</VStack>
		</Layout>
	);
}

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
	Button,
	HStack,
	Text,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	useMediaQuery,
	Link as ChakraLink,
} from '@chakra-ui/react';
import { useQueryClient } from 'react-query';
import { ChevronDownIcon } from '@chakra-ui/icons';

const SENTENCE_STRUCTURE_LESSONS = [
	{ label: 'Lesson 1: Nouns', to: '/nouns' },
	{ label: 'Lesson 2: Articles', to: '/article-structure' },
	{ label: 'Lesson 3: Verb Tenses', to: '/verb-tense-structure' },
	{ label: 'Lesson 4: Adjectives', to: '/adjective-structure' },
	{ label: 'Lesson 5: Adverbs', to: '/adverb-structure' },
	{ label: 'Lesson 6: Prepositions', to: '/prep1-structure' },
	{ label: 'Lesson 7: Conjunctions', to: '/conjunction-structure' },
];

export default function NavbarDropDown() {
	const { currentUser, logout } = useAuth();
	const queryClient = useQueryClient();
	const [isMobile] = useMediaQuery('(max-width:480px)');
	const location = useLocation();
	const isLandingPage = location.pathname === '/';

	function handleLogout() {
		logout();
		queryClient.removeQueries('user', { exact: true });
	}

	return (
		<HStack>
			{!isLandingPage && (
				<Menu>
					<MenuButton
						as={Button}
						mx="1rem"
						rightIcon={<ChevronDownIcon />}
						fontSize="lg"
					>
						Sentence Structure
					</MenuButton>
					<MenuList>
						{SENTENCE_STRUCTURE_LESSONS.map((lesson) => (
							<MenuItem
								key={lesson.to}
								as={Link}
								to={lesson.to}
								color="red.700"
							>
								{lesson.label}
							</MenuItem>
						))}
					</MenuList>
				</Menu>
			)}
			{!currentUser ? (
				<>
					<Text
						as={Link}
						to="/signup"
						px="1.2rem"
						py="0.35rem"
						mr="1rem"
						borderRadius="0.5rem"
						bgGradient="linear(to-l, red.400, yellow.300)"
						fontSize="lg"
					>
						Sign Up
					</Text>
					<Button as={Link} to="/login" fontSize="lg">
						Login
					</Button>
				</>
			) : (
				<Menu>
					<MenuButton
						as={Button}
						mx="1rem"
						rightIcon={<ChevronDownIcon />}
						fontSize="lg"
					>
						{currentUser.data.alias
							? currentUser.data.alias
							: currentUser.data.email}
					</MenuButton>
					<MenuList>
						<MenuItem as={Link} to="/dashboard" color="red.700">
							DashBoard
						</MenuItem>
						{isMobile && (
							<>
								<MenuItem as={Link} to="/prompts" color="red.700">
									Start Writing
								</MenuItem>
								<MenuItem
									as={Link}
									to={{
										pathname: 'https://forms.gle/N8aZD3yeA9ya7SMW6',
									}}
									target="_blank"
									color="red.700"
								>
									Report Bug
								</MenuItem>
							</>
						)}
						<MenuItem
							as={Link}
							to="/"
							onClick={handleLogout}
							color="red.700"
						>
							Log Out
						</MenuItem>
					</MenuList>
				</Menu>
			)}
		</HStack>
	);
}

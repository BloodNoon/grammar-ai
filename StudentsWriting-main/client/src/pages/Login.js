import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import loginImg from '../images/undraw_my_password.svg';
import {
	Grid,
	GridItem,
	Heading,
	Text,
	Button,
	Image,
	Input,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Flex,
	HStack,
	Center,
	Alert,
	AlertIcon,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

export default function Login() {
	const { currentUser, login } = useAuth();
	const history = useHistory();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({ defaultValues: { email: '', password: '' } });

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { isLoading, isError, error, refetch, status } = useQuery(
		['user', { email, password }],
		login,
		{ enabled: false }
	);

	if (currentUser) {
		return <Redirect to="/" />;
	}

	async function onSubmit() {
		try {
			refetch();
			if (status === 200) history.push('/');
		} catch (err) {
			console.error(err, 'Failed to log in.');
		}
	}

	return (
		<Layout>
			{isError && (
				<Alert status="error" mt="2rem">
					<AlertIcon />
					An error occurred: {error.message}
				</Alert>
			)}
			<Grid
				templateColumns="repeat(2, 1fr)"
				my="2rem"
				gap="2rem"
				boxShadow="md"
				borderRadius="1rem"
			>
				<GridItem>
					<Flex direction="column" justify="center" align="center">
						<Heading size="lg" my="2rem">
							Welcome Back
						</Heading>
						<form
							onSubmit={handleSubmit(onSubmit)}
							style={{ width: '70%' }}
						>
							<FormControl
								id="email"
								isRequired
								isInvalid={errors.email}
							>
								<FormLabel>Email address</FormLabel>
								<Input
									name="email"
									type="email"
									{...register('email', {
										required: 'This is required',
									})}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<FormErrorMessage>
									{errors.email?.message}
								</FormErrorMessage>
							</FormControl>
							<FormControl
								id="password"
								isRequired
								isInvalid={errors.password}
							>
								<FormLabel>Password</FormLabel>
								<Input
									name="password"
									type="password"
									{...register('password', {
										required: 'This is required',
										minLength: {
											value: 8,
											message:
												'Password must have at least 8 characters',
										},
									})}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<FormErrorMessage>
									{errors.password?.message}
								</FormErrorMessage>
							</FormControl>
							<Center>
								<Button
									isLoading={isLoading}
									my="1rem"
									loadingText="Loading"
									type="submit"
								>
									Log in
								</Button>
							</Center>
							<Center>
								<HStack>
									<Text color="gray.400">Don't have an account?</Text>
									<Text as={Link} to="/signup">
										Sign Up
									</Text>
								</HStack>
							</Center>
						</form>
					</Flex>
				</GridItem>
				<GridItem p="2rem">
					<Image src={loginImg} alt="login" boxSize="30rem" />
				</GridItem>
			</Grid>
		</Layout>
	);
}

import React from 'react';
import Layout from '../components/Layout';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import signUpImg from '../images/undraw_sign_in.svg';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import {
	Grid,
	GridItem,
	Text,
	Heading,
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

export default function Signup() {
	const { currentUser, signUp } = useAuth();
	const queryClient = useQueryClient();
	const history = useHistory();
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { email: '', password: '', confirmPassword: '' },
	});

	const { isLoading, isError, error, mutate } = useMutation(
		({ email, password }) => signUp(email, password),
		{ onSuccess: () => queryClient.invalidateQueries('user') }
	);

	if (currentUser) {
		return <Redirect to="/" />;
	}

	async function onSubmit(data) {
		const { email, password } = data;

		try {
			mutate({ email, password });
			history.push('/');
		} catch (err) {
			console.error(err, 'Failed to create an account.');
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
				<GridItem p="2rem">
					<Image src={signUpImg} alt="signup" boxSize="30rem" />
				</GridItem>
				<GridItem p="2rem">
					<Flex direction="column" justify="center" align="center">
						<Heading size="lg" my="2rem">
							Create an account
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
								/>
								<FormErrorMessage>
									{errors.password?.message}
								</FormErrorMessage>
							</FormControl>
							<FormControl
								id="confirmPassword"
								isRequired
								isInvalid={errors.confirmPassword}
							>
								<FormLabel>Confirm Password</FormLabel>
								<Input
									name="confirmPassword"
									type="password"
									{...register('confirmPassword', {
										required: 'This is required',
										validate: (value) =>
											value === watch('password') ||
											'Password does not match.',
									})}
								/>
								<FormErrorMessage>
									{errors.confirmPassword?.message}
								</FormErrorMessage>
							</FormControl>
							<Center>
								<Button
									isLoading={isLoading}
									my="1rem"
									loadingText="Creating"
									type="submit"
								>
									Create account
								</Button>
							</Center>
							<Center>
								<HStack>
									<Text color="gray.400">
										Already have an account?
									</Text>
									<Text as={Link} to="/login">
										Log in
									</Text>
								</HStack>
							</Center>
						</form>
					</Flex>
				</GridItem>
			</Grid>
		</Layout>
	);
}

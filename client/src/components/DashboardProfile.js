import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import {
	Avatar,
	Button,
	Center,
	Container,
	Text,
	Heading,
	SimpleGrid,
	Input,
	Select,
	useToast,
} from '@chakra-ui/react';
import { updateUserProfile } from '../api/User';

export default function DashboardProfile() {
	const { currentUser, token } = useAuth();
	const queryClient = useQueryClient();
	const toast = useToast();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		defaultValues: {
			firstName: currentUser.data.name.firstName,
			lastName: currentUser.data.name.lastName,
			alias: currentUser.data.alias,
			password: '',
			confirmPassword: '',
			grade: currentUser.data.grade,
		},
	});

	const { isLoading, mutate } = useMutation(
		(updatedUser) => updateUserProfile(updatedUser, token),
		{
			onSuccess: () => {
				queryClient.invalidateQueries('user');
				toast({
					title: 'Profile updated!',
					description: 'Your profile is now up-to-date.',
					status: 'success',
					duration: 5000,
					isClosable: true,
				});
			},
		}
	);

	const grades = [
		{ label: 'Please select one', value: '' },
		{ label: '3rd grade', value: '3rd grade' },
		{ label: '4th grade', value: '4th grade' },
		{ label: '5th grade', value: '5th grade' },
		{ label: '6th grade', value: '6th grade' },
		{ label: '7th grade', value: '7th grade' },
		{ label: '8th grade', value: '8th grade' },
		{ label: 'other', value: 'other' },
	];

	const editProfile = async (data) => {
		const { firstName, lastName, alias, password, grade } = data;

		const updatedUser = {
			password,
			name: {
				firstName,
				lastName,
			},
			alias,
			grade,
		};

		mutate(updatedUser);
	};

	return (
		<Container>
			<Heading>
				Hello,{' '}
				{currentUser?.data.alias
					? currentUser.data.alias
					: currentUser.data.email}
			</Heading>
			<Center my="2rem">
				<Avatar
					size="xl"
					src={`https://avatars.dicebear.com/api/jdenticon/${currentUser.data.email}.svg`}
				/>
			</Center>

			<form onSubmit={handleSubmit(editProfile)}>
				<SimpleGrid columns={2} spacingY="1rem">
					<Text>Email:</Text>
					<Text>{currentUser.data.email}</Text>
					<Text>First Name:</Text>
					<Input name="firstName" type="text" {...register('firstName')} />
					<Text>Last Name:</Text>
					<Input name="lastName" type="text" {...register('lastName')} />
					<Text>Alias:</Text>
					<Input name="alias" type="text" {...register('alias')} />
					<Text>Password:</Text>
					<Input
						name="password"
						type="password"
						placeholder="Leave blank if unchanged"
						{...register('password', {
							minLength: 8,
							message: 'Password must have at least 8 characters',
						})}
					/>
					{errors.password?.message}
					<Text>Confirm password:</Text>
					<Input
						name="confirmPassword"
						type="password"
						placeholder="Leave blank if unchanged"
						{...register('confirmPassword', {
							validate: (value) =>
								value === watch('password') ||
								'Password does not match.',
						})}
					/>
					{errors.confirmPassword?.message}
					<Text>Role:</Text>
					<Text>{currentUser.data.role}</Text>
					<Text>Grade:</Text>
					<Select name="grade" {...register('grade')}>
						{grades.map((grade) => (
							<option key={grade.value} value={grade.value}>
								{grade.label}
							</option>
						))}
					</Select>
				</SimpleGrid>
				<Center my="2rem">
					<Button
						type="submit"
						isLoading={isLoading}
						loadingText="Updating"
					>
						Update
					</Button>
				</Center>
			</form>
		</Container>
	);
}

import React, { useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Flex,
	Spacer,
	Select,
	useDisclosure,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Alert,
	AlertIcon,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { updateUserRole } from '../api/User';

export default function UserListSetRoleButton({ users }) {
	const [selectedUser, setSelectedUser] = useState(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { token } = useAuth();
	const queryClient = useQueryClient();

	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const { isLoading, mutate } = useMutation(
		(userData) => updateUserRole(userData, token),
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries('users');
				setSuccess(`${data.email} in now a(n) ${data.role}`);
			},
		}
	);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			role: '',
		},
	});
	const roles = [
		{ label: 'user', value: 'user' },
		{ label: 'admin', value: 'admin' },
	];

	function handleChange(e) {
		setError('');
		setSuccess('');
		const user = users.find((user) => user.email === e.target.value);

		if (user) {
			setSelectedUser(user);
			setValue('role', user.role);
		} else {
			setSelectedUser(null);
			setValue('role', '');
		}
	}

	function onSubmit(data) {
		const { email, role } = data;

		setError('');
		setSuccess('');

		if (selectedUser.role === role) {
			return setError(`${email} is already a(n) ${role}.`);
		}

		const userData = { email, role };

		mutate(userData);
	}

	return (
		<Flex my="1rem">
			<Spacer />
			<Button onClick={onOpen} leftIcon={<SettingsIcon />}>
				Set user role
			</Button>
			<Modal isOpen={isOpen} onClose={onClose} size="lg">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Set user role</ModalHeader>
					<ModalCloseButton />
					{error && (
						<Alert status="error">
							<AlertIcon />
							{error}
						</Alert>
					)}
					{success && (
						<Alert status="success">
							<AlertIcon />
							{success}
						</Alert>
					)}
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalBody>
							<FormControl
								id="email"
								isRequired
								isInvalid={errors.email}
							>
								<FormLabel>Email</FormLabel>
								<Select
									name="email"
									{...register('email', {
										required: 'This is required',
									})}
									onChange={(e) => handleChange(e)}
								>
									<option value="">Please select a user</option>
									{users?.map((user) => (
										<option key={user._id} value={user.email}>
											{user.email}
										</option>
									))}
								</Select>
								<FormErrorMessage>
									{errors.email?.message}
								</FormErrorMessage>
							</FormControl>
							{selectedUser && (
								<>
									<FormControl>
										<FormLabel>First Name</FormLabel>
										<Input
											isDisabled={true}
											placeholder={
												selectedUser.name?.firstName || 'Not Set'
											}
										/>
									</FormControl>
									<FormControl>
										<FormLabel>Last Name</FormLabel>
										<Input
											isDisabled={true}
											placeholder={
												selectedUser.name?.lastName || 'Not Set'
											}
										/>
									</FormControl>
									<FormControl
										id="role"
										isRequired
										isInvalid={errors.role}
									>
										<FormLabel>Role</FormLabel>
										<Select
											name="role"
											{...register('role', {
												required: 'This is required',
											})}
											placeholder="Please select a role"
										>
											{roles?.map((role) => (
												<option key={role.value} value={role.value}>
													{role.label}
												</option>
											))}
										</Select>
										<FormErrorMessage>
											{errors.role?.message}
										</FormErrorMessage>
									</FormControl>
								</>
							)}
						</ModalBody>
						<ModalFooter>
							<Button onClick={onClose} mx="0.5rem">
								Close
							</Button>
							<Button
								type="submit"
								mx="0.5rem"
								isLoading={isLoading}
								loadingText="Loading"
							>
								Set
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</Flex>
	);
}

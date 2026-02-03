import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import {
	Button,
	Flex,
	Box,
	Text,
	Select,
	Alert,
	AlertIcon,
} from '@chakra-ui/react';

export default function RoleMod({ users, onClose }) {
	const roles = [
		{ label: '', value: '' },
		{ label: 'user', value: 'user' },
		{ label: 'admin', value: 'admin' },
	];

	const { register, handleSubmit, setValue } = useForm({
		defaultValues: {
			user: '',
			role: '',
		},
	});

	const { token } = useAuth();
	const [userList, setUserList] = useState(users);
	const [selectedUser, setSelectedUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	useEffect(() => {
		setUserList(users);
	}, [users]);

	function handleChange(e) {
		setError('');
		setSuccess('');
		const user = userList.find((user) => user.email === e.target.value);

		if (user) {
			setSelectedUser(user);
			setValue('role', user.role);
		} else {
			setSelectedUser(null);
			setValue('role', '');
		}
	}

	function handleClose() {
		setSelectedUser(null);
		setValue('email', '');
		setError('');
		setSuccess('');
		onClose();
	}

	async function setRole(data) {
		setError('');
		setSuccess('');
		const { email, role } = data;

		if (email === '') {
			return setError('Please select a user');
		}
		if (role === '') {
			return setError('A role is not selected.');
		}
		if (selectedUser.role === role) {
			return setError(`${email} is already a(n) ${role}.`);
		}

		setLoading(true);
		try {
			await axios.patch('/api/user/setRole', { email, role }, config);

			const found = userList.findIndex((user) => {
				return user.email === email;
			});
			userList[found].role = role;

			setSuccess(`${email} set to ${role}.`);
		} catch (err) {
			setError(`Failed to set ${email} as ${role}.`);
			console.log('Failed to set role.', err);
		}
		setLoading(false);
	}

	return (
		<Box>
			<form
				className="flex flex-col flex-jc-c"
				onSubmit={handleSubmit(setRole)}
			>
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
				<Text>Email:</Text>
				<Select
					name="email"
					{...register('email')}
					onChange={(e) => handleChange(e)}
				>
					<option value="">Please select a user</option>
					{userList?.map((user) => (
						<option key={user._id} value={user.email}>
							{user.email}
						</option>
					))}
				</Select>

				{selectedUser && (
					<>
						<Text>
							Name: {selectedUser.name?.lastName || 'Not Set'},{' '}
							{selectedUser.name?.firstName || 'Not Set'}
						</Text>

						<Text>
							Alias:{' '}
							{selectedUser.alias ? selectedUser.alias : 'Not Set'}
						</Text>
						<Text>Role:</Text>
						<Select name="role" {...register('role')}>
							{roles?.map((role) => (
								<option key={role.value} value={role.value}>
									{role.label}
								</option>
							))}
						</Select>
					</>
				)}
				<Flex justify="center" align="center" my="1.5rem">
					<Button onClick={handleClose} mx="0.5rem">
						Close
					</Button>
					<Button type="submit" disabled={loading} mx="0.5rem">
						Set
					</Button>
				</Flex>
			</form>
		</Box>
	);
}

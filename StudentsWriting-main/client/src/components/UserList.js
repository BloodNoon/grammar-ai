import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserInfo from './UserInfo';
import {
	Table,
	Thead,
	Th,
	Tr,
	Tbody,
	Box,
	Center,
	Spinner,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { fetchAllUsers } from '../api/User';
import UserListSetRoleButton from './UserListSetRoleButton';

export default function UserList() {
	const { token } = useAuth();
	const { data: users, isLoading } = useQuery(['users', token], () =>
		fetchAllUsers(token)
	);

	return (
		<>
			{isLoading && (
				<Center>
					<Spinner
						mt="2rem"
						thickness="3px"
						emptyColor="gray.200"
						color="yellow.400"
						size="md"
					/>
				</Center>
			)}
			{!isLoading && (
				<Box minW="60vw">
					<UserListSetRoleButton users={users} />
					<Table variant="striped">
						<Thead>
							<Tr>
								<Th>Email</Th>
								<Th>Alias</Th>
								<Th>Role</Th>
							</Tr>
						</Thead>
						<Tbody>
							{users?.map((user) => {
								return <UserInfo user={user} key={user._id} />;
							})}
						</Tbody>
					</Table>
				</Box>
			)}
		</>
	);
}

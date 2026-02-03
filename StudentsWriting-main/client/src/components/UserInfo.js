import React from 'react';
import { Tr, Td } from '@chakra-ui/react';

export default function UserInfo({ user }) {
	return (
		<Tr>
			<Td>{user.email}</Td>
			<Td>{user.alias ? user.alias : 'Not Set'}</Td>
			<Td>{user.role}</Td>
		</Tr>
	);
}

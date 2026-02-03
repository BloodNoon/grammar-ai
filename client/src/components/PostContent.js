import React from 'react';
import { Avatar, Box, HStack, Text } from '@chakra-ui/react';

export default function PostContent({ userPost }) {
	return (
		<>
			<Box>
				<HStack>
					<Avatar
						size="sm"
						src={`https://avatars.dicebear.com/api/jdenticon/${userPost.author.email}.svg`}
					/>
					<Text>
						{userPost.author.alias
							? userPost.author.alias
							: userPost.author.email}
					</Text>
				</HStack>

				<Text fontSize="sm" color="gray.400">
					{new Date(userPost.updatedOn).toLocaleString()}
				</Text>
			</Box>
			<Text my="1rem">{userPost.text}</Text>
		</>
	);
}

import React from 'react';
import PostCheckButton from './PostCheckButton';
import { Container, HStack, Spacer } from '@chakra-ui/react';
import PostEditButton from './PostEditButton';
import PostDeleteButton from './PostDeleteButton';
import PostContent from './PostContent';

export default function Post({ userPost, currentUser, promptStructure }) {
	const isOwner = currentUser
		? userPost.author.email === currentUser.data.email
		: false;

	return (
		<Container
			minW="60vw"
			px="2rem"
			py="1rem"
			my="1rem"
			border="1px"
			borderColor="gray.300"
			borderRadius="1rem"
		>
			<PostContent userPost={userPost} />
			{isOwner && (
				<>
					<HStack spacing="1rem">
						<Spacer />
						<PostCheckButton
							userPost={userPost}
							promptStructure={promptStructure}
						/>
						<PostEditButton userPost={userPost} />
						<PostDeleteButton pid={userPost._id} />
					</HStack>
				</>
			)}
		</Container>
	);
}

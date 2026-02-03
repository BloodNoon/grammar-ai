import React from 'react';
import { useParams } from 'react-router-dom';
import { deletePost } from '../api/Post';
import { Button, useToast, useDisclosure } from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import DeleteAlertDialog from './DeleteAlertDialog';

export default function PostDeleteButton({ pid }) {
	const { id } = useParams();
	const toast = useToast();
	const queryClient = useQueryClient();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isLoading, mutate } = useMutation((pid) => deletePost(id, pid), {
		onSuccess: () => {
			queryClient.invalidateQueries('prompt');
			toast({
				title: 'Post deleted!',
				description: 'Your post has been successfully deleted.',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
		},
	});

	function handlePostDelete() {
		mutate(pid);
		onClose();
	}

	return (
		<>
			<Button
				colorScheme="red"
				onClick={onOpen}
				isLoading={isLoading}
				loadingText="Deleting"
			>
				Delete
			</Button>
			<DeleteAlertDialog
				type="post"
				dialogHeader="Delete Post"
				isOpen={isOpen}
				onClose={onClose}
				deleteHandler={handlePostDelete}
			/>
		</>
	);
}

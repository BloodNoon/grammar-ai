import React from 'react';
import { Button, useToast, useDisclosure } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { deletePromptById } from '../api/Prompt';
import DeleteAlertDialog from './DeleteAlertDialog';

export default function PromptDeleteButton() {
	const { id } = useParams();
	const queryClient = useQueryClient();
	const history = useHistory();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isLoading, mutate } = useMutation(() => deletePromptById(id), {
		onSuccess: () => {
			queryClient.invalidateQueries('prompts');
			toast({
				title: 'Prompt deleted!',
				description: 'Your prompt has been successfully deleted.',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
		},
	});

	function handlePromptDelete() {
		mutate();
		onClose();
		history.goBack();
	}

	return (
		<>
			<Button
				colorScheme="red"
				leftIcon={<DeleteIcon />}
				onClick={onOpen}
				isLoading={isLoading}
				loadingText="Deleting"
			>
				Delete
			</Button>
			<DeleteAlertDialog
				type="prompt"
				dialogHeader="Delete prompt"
				isOpen={isOpen}
				onClose={onClose}
				deleteHandler={handlePromptDelete}
			/>
		</>
	);
}

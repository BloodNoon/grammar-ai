import React from 'react';
import { useForm } from 'react-hook-form';
import {
	Button,
	useToast,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Textarea,
	FormControl,
	FormLabel,
	FormErrorMessage,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import { editPost } from '../api/Post';

export default function PostEditButton({ userPost }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { text: userPost.text },
	});
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const queryClient = useQueryClient();

	const { isLoading, mutate } = useMutation(
		(updatedPost) => editPost(userPost._id, updatedPost),
		{
			onSuccess: () => {
				queryClient.invalidateQueries('prompt');
				toast({
					title: 'Post edited!',
					description: 'Your post has been successfully updated.',
					status: 'success',
					duration: 5000,
					isClosable: true,
				});
			},
		}
	);

	function onSubmit(data) {
		const { text } = data;
		mutate(text);
		onClose();
	}

	return (
		<>
			<Button onClick={onOpen}>Edit</Button>
			<Modal isOpen={isOpen} onClose={onClose} size="4xl">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalBody>
							<FormControl
								id="text"
								isRequired
								isInvalid={errors.message}
							>
								<FormLabel>Write here...</FormLabel>
								<Textarea
									minW="70%"
									minH="40vh"
									{...register('text', {
										required: 'This is required',
										minLength: {
											value: 4,
											message:
												"I'm sure you can write longer than this.",
										},
									})}
								/>
								<FormErrorMessage>
									{errors.text?.message}
								</FormErrorMessage>
							</FormControl>
						</ModalBody>
						<ModalFooter>
							<Button onClick={onClose} mx="0.5rem" colorScheme="red">
								Discard
							</Button>
							<Button
								type="submit"
								mx="0.5rem"
								loadingText="Submitting"
								isLoading={isLoading}
							>
								Submit
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
}

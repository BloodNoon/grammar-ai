import React from 'react';
import { useParams } from 'react-router-dom';
import {
	Alert,
	AlertIcon,
	Textarea,
	Heading,
	Button,
	HStack,
	Flex,
	useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { submitPost } from '../api/Post';

export default function PromptInputSection() {
	const { id } = useParams();
	const toast = useToast();
	const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({ defaultValues: { text: '' } });

	const { isLoading, mutate } = useMutation(
		(newText) => submitPost(id, newText),
		{
			onSuccess: () => {
				queryClient.invalidateQueries('prompt');
				toast({
					title: 'Good job!',
					description: 'Your post is submitted successfully.',
					status: 'success',
					duration: 5000,
					isClosable: true,
				});
			},
			onError: () => {
				toast({
					title: 'Oops!',
					description: 'We have a problem submitting your post.',
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			},
		}
	);

	function onSubmit(data) {
		const { text } = data;
		mutate(text);
		setValue('text', '');
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Flex direction="column" justify="center" align="center">
				<Heading fontSize="xl" my="1rem">
					Finding a place to write?
				</Heading>
				{errors.text && (
					<Alert status="error" my="0.5rem">
						<AlertIcon />
						{errors.text.message}
					</Alert>
				)}
				<Textarea
					name="text"
					placeholder="Start writing here..."
					minW="70vw"
					minH="40vh"
					boxShadow="lg"
					{...register('text', {
						required: 'Did you type something here?',
						minLength: 1,
					})}
				/>
				<HStack my="1rem">
					<Button
						isLoading={isLoading}
						type="submit"
						loadingText="Submitting"
					>
						Submit
					</Button>
				</HStack>
			</Flex>
		</form>
	);
}

import React from 'react';
import {
	Heading,
	Text,
	HStack,
	Box,
	Tag,
	Spacer,
	Flex,
} from '@chakra-ui/react';
import { DraftailEditor } from 'draftail';

export default function PromptMainSection({
	prompt,
	getGrade,
	editorState,
	setEditorState,
}) {
	return (
		<Flex direction="column" justify="center" align="center" mb="1rem">
			<Heading size="lg" my="1rem">
				{prompt.title}
			</Heading>

			<HStack spacing="1rem">
				<Text fontSize="sm" color="gray.400">
					Grade:{' '}
					{getGrade().map((g) => (
						<Tag key={g} mx="0.25rem">
							{g}
						</Tag>
					))}
				</Text>
				<Spacer />
				<Tag>{prompt.type}</Tag>
				<Spacer />
				<Text fontSize="sm" color="gray.400">
					{new Date(prompt.createdOn).toLocaleString()}
				</Text>
			</HStack>
			<Text as="i" mt="0.5rem">
				Sentence Structure: {prompt?.structure ? prompt.structure : 'None'}
			</Text>
			<Text as="i" color="gray.300" my="0.5rem">
				{prompt.description ? prompt.description : ''}
			</Text>

			<Box minW="40vw" maxW="80vw" maxH="50vh" overflowY="scroll">
				<DraftailEditor
					editorState={editorState}
					onChange={(editorState) => setEditorState(editorState)}
					readOnly={true}
				/>
			</Box>
		</Flex>
	);
}

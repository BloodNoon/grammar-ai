import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { Text, Center, Spinner, Flex, HStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Post from '../components/Post';
import { EditorState, convertFromRaw } from 'draft-js';
import { useQuery } from 'react-query';
import { fetchPromptById } from '../api/Prompt';
import PromptMainSection from '../components/PromptMainSection';
import PromptInputSection from '../components/PromptInputSection';
import PromptEditButton from '../components/PromptEditButton';
import PromptDeleteButton from '../components/PromptDeleteButton';

export default function PromptOverview() {
	const { id } = useParams();
	const { currentUser } = useAuth();
	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	const {
		data: prompt,
		isLoading,
		isSuccess,
	} = useQuery(['prompt', id], () => fetchPromptById(id));

	useEffect(() => {
		if (isSuccess) {
			setEditorState(
				EditorState.createWithContent(
					convertFromRaw(JSON.parse(prompt.content))
				)
			);
		}
	}, [isSuccess, prompt]);

	function getGrade() {
		if (prompt?.grade) {
			let grade = [];
			for (const g in prompt.grade) {
				if (prompt.grade[g]) {
					grade.push(g.split('_')[1]);
				}
			}
			return grade.includes('any') ? ['any'] : grade;
		}
	}

	return (
		<Layout>
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

			{!isLoading && prompt && (
				<Flex direction="column" justify="center" align="center">
					{currentUser?.data.role === 'admin' && (
						<HStack spacing="1rem" mt="1rem">
							<PromptEditButton prompt={prompt} />
							<PromptDeleteButton />
						</HStack>
					)}
					<PromptMainSection
						prompt={prompt}
						getGrade={getGrade}
						editorState={editorState}
						setEditorState={setEditorState}
					/>

					<Flex direction="column" justify="center" align="center">
						{prompt.posts.length > 0 ? (
							prompt.posts.map((userPost) => {
								return (
									<Post
										key={userPost._id}
										userPost={userPost}
										currentUser={currentUser}
										promptStructure={prompt?.structure}
									/>
								);
							})
						) : (
							<Text fontStyle="italic" my="2rem">
								---Still waiting for an answer---
							</Text>
						)}
					</Flex>
					{currentUser ? (
						<PromptInputSection />
					) : (
						<Text as={Link} to="/login" size="xl">
							Click here to login.
						</Text>
					)}
				</Flex>
			)}
		</Layout>
	);
}

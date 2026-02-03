import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useAuth } from '../contexts/AuthContext';
import { fetchPrompts } from '../api/Prompt';
import Layout from '../components/Layout';
import Prompt from '../components/Prompt';
import PromptAddIcon from '../components/PromptAddIcon';
import {
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	CloseButton,
	Spinner,
	Center,
	Grid,
	GridItem,
} from '@chakra-ui/react';

export default function PromptList() {
	const { currentUser } = useAuth();

	const {
		data: list,
		isLoading,
		isError,
		error,
	} = useQuery('prompts', fetchPrompts);

	if (isError)
		return (
			<Alert>
				<AlertIcon />
				<AlertTitle mr={2}>Oops!</AlertTitle>
				<AlertDescription>{error}</AlertDescription>
				<CloseButton position="absolute" right="8px" top="8px" />
			</Alert>
		);

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

			{!isLoading && (
				<Center>
					<Grid minW="80vw" templateColumns="repeat(12, 1fr)">
						<GridItem colSpan="12" colStart="12">
							{currentUser?.data.role === 'admin' && (
								<PromptAddIcon list={list} />
							)}
						</GridItem>
						<GridItem colSpan="12" colStart="1">
							{list ? (
								list.map((prompt) => {
									return (
										<Link
											to={`/overview/${prompt._id}`}
											key={prompt._id}
										>
											<Prompt prompt={prompt} />
										</Link>
									);
								})
							) : (
								<Center>No content.</Center>
							)}
						</GridItem>
					</Grid>
				</Center>
			)}
		</Layout>
	);
}

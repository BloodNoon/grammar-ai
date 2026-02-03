import React, { useState, useMemo } from 'react';
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Alert,
	AlertIcon,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	useDisclosure,
} from '@chakra-ui/react';
import {
	getFullStructCheck,
	getTags,
} from '../utils/SentenceChecker/StructureChecker';

export default function PostCheckButton({ userPost, promptStructure }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [checkResult, setCheckResult] = useState(false);
	//const [tags, setTags] = useState();

	const tags = useMemo(() => {
		const [terms] = getTags(userPost.text);
		return terms.terms;
	}, [userPost.text]);

	function check() {
		const result = getFullStructCheck(userPost.text, promptStructure);
		//const [terms] = getTags(userPost.text);
		//setTags(terms.terms);
		setCheckResult(result);
	}

	function handleClick() {
		onOpen();
		check();
	}

	return (
		<>
			<Button onClick={handleClick}>Check</Button>
			<Modal isOpen={isOpen} onClose={onClose} size="3xl">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Your Result</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Alert status="warning">
							<AlertIcon />
							This feature is still under construction and only works for
							sentences.
						</Alert>

						<Alert
							status={checkResult ? 'success' : 'error'}
							variant="solid"
						>
							<AlertIcon />
							{checkResult
								? 'Yay! You got it. Your sentence matches a structure.'
								: 'Oops! Something is wrong with your sentence.'}
						</Alert>
						<Table>
							<Thead>
								<Tr>
									<Th>Text</Th>
									<Th>Part of Speech</Th>
								</Tr>
							</Thead>
							<Tbody>
								{tags?.map((tag, index) => {
									return (
										<Tr key={tag + index}>
											<Td>{tag.text}</Td>
											<Td>{tag.tags.join(', ')}</Td>
										</Tr>
									);
								})}
							</Tbody>
						</Table>
					</ModalBody>
					<ModalFooter>
						<Button type="button" onClick={onClose}>
							Done
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

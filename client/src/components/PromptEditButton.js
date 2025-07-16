import React from 'react';
import { Button, Modal, useDisclosure } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import PromptManager from './PromptManager';

export default function PromptEditButton({ prompt }) {
	const { id } = useParams();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Button leftIcon={<EditIcon />} onClick={onOpen}>
				Edit
			</Button>
			<Modal isOpen={isOpen} onClose={onClose} size="3xl">
				<PromptManager id={id} prompt={prompt} onClose={onClose} />
			</Modal>
		</>
	);
}

import React from 'react';
import { Modal, IconButton, useDisclosure } from '@chakra-ui/react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PromptManager from '../components/PromptManager';

export default function PromptAddIcon({ list }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<IconButton
				onClick={onOpen}
				aria-label="add new prompt"
				icon={<AddCircleOutlineIcon />}
				colorScheme="orange"
			/>
			<Modal isOpen={isOpen} onClose={onClose} size="3xl">
				<PromptManager list={list} onClose={onClose} />
			</Modal>
		</>
	);
}

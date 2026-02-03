import React from 'react';
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Button,
} from '@chakra-ui/react';

export default function DeleteAlertDialog({
	type,
	dialogHeader,
	isOpen,
	onClose,
	deleteHandler,
}) {
	return (
		<AlertDialog isOpen={isOpen} onClose={onClose}>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader>{dialogHeader}</AlertDialogHeader>
					<AlertDialogBody>
						Are you sure you want to delete this {type}? You can't undo
						afterwards.
					</AlertDialogBody>
					<AlertDialogFooter>
						<Button onClick={onClose}>Cancel</Button>
						<Button colorScheme="red" onClick={deleteHandler} ml={3}>
							Delete
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
}

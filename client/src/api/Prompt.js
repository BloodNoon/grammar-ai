import axios from 'axios';
import axiosInstance from './axiosInstance';
// New / Edit Prompt API endpoint controller

export async function createNewPrompt(newPrompt) {
	try {
		const { data } = await axiosInstance.post(
			'/api/prompt/create',
			newPrompt
		);
		return data;
	} catch (err) {
		console.log(err, 'Unable to create prompt.');
	}
}

export async function fetchPrompts() {
	try {
		const { data } = await axios.get('/api/prompt');
		return data;
	} catch (err) {
		console.log(err, 'Unable to fetch data from server.');
	}
}

export async function fetchPromptById(id) {
	try {
		const { data } = await axios.get(`/api/prompt/${id}`);
		return data;
	} catch (err) {
		console.log(err, 'Unable to fetch data from server.');
	}
}

export async function editPromptById(id, updatedPrompt) {
	try {
		const { data } = await axiosInstance.patch(
			`/api/prompt/${id}/edit`,
			updatedPrompt
		);

		return data;
	} catch (err) {
		console.log(err, 'Unable to edit prompt.');
	}
}

export async function deletePromptById(id) {
	try {
		await axiosInstance.delete(`/api/prompt/${id}/delete`);
	} catch (err) {
		console.log(err, 'Unable to delete prompt.');
	}
}

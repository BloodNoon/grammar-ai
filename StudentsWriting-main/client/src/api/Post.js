import axiosInstance from './axiosInstance';
// New / Edit Post API endpoint controller

export async function submitPost(id, text) {
	try {
		const { data } = await axiosInstance.patch(`/api/prompt/${id}/post`, {
			text,
		});
		return data;
	} catch (err) {
		console.log(err, 'Unable to submit answer.');
	}
}

export async function editPost(pid, text) {
	try {
		const { data } = axiosInstance.patch(`/api/prompt/edit/${pid}`, { text });
		return data;
	} catch (err) {
		console.log(err, 'Unable to edit answer.');
	}
}

export async function deletePost(id, pid) {
	try {
		await axiosInstance.patch(`/api/prompt/${id}/delete/${pid}`);
	} catch (err) {
		console.log(err, 'Unable to delete post.');
	}
}

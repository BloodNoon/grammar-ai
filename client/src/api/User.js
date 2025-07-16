import axiosInstance from './axiosInstance';

export async function fetchAllUsers() {
	try {
		const { data } = await axiosInstance.post('/api/user/all');

		return data;
	} catch (err) {
		console.log(err, 'Unable to fetch data from server.');
	}
}

export async function updateUserProfile(updatedUser) {
	try {
		const { data } = await axiosInstance.patch(
			'/api/user/updateProfile',
			updatedUser
		);

		return data;
	} catch (err) {
		console.log(err, 'Unable to update profile.');
	}
}

export async function updateUserRole(userData) {
	try {
		const { data } = await axiosInstance.patch('/api/user/setRole', userData);

		return data;
	} catch (err) {
		console.log(err, 'Unable to change user role.');
	}
}

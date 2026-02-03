import axios from 'axios';

const PREFIX = 'students-writing-';
const prefixedKey = PREFIX + 'token';

const axiosInstance = axios.create({
	headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(
	(config) => {
		if (!config.headers.Authorization) {
			const token = JSON.parse(localStorage.getItem(prefixedKey));
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;

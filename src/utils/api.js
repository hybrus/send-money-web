import axios from 'axios';

const api = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL,
});

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response && error.response.status === 401 && window.location.pathname !== '/login') {
			// console.log(window.location.href);
			window.location.href = '/login';
		}
		return Promise.reject(error);
	}
);

api.interceptors.request.use((config) => {
	const token = localStorage.getItem('access_token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default api;

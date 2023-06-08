import type { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { axiosInstance } from '../services/axios.services';

export const userService = {
	register: async (name: string, email: string, password: string) => {
		try {
			const response: AxiosResponse = await axiosInstance.post('/user/register', {
				name,
				email,
				password
			});
			Cookies.set('token', response.data.accesstoken, { expires: 1 });
			return response.data;
		} catch (error) {
			const message = (error as Error).message;
			throw new Error(message);
		}
	},
	login: async (email: string, password: string) => {
		try {
			const response: AxiosResponse = await axiosInstance.post('/user/login', { email, password });
			Cookies.set('token', response.data.accesstoken, { expires: 1 });
			return response;
		} catch (error) {
			const message = (error as Error).message;
			throw new Error(message);
		}
	},
	logout: async () => {
		try {
			Cookies.set('token', '', { expires: 0 });
		} catch (error) {
			const message = (error as Error).message;
			throw new Error(message);
		}
	},
	getUserProfile: async () => {
		try {
			const token = Cookies.get('token');
			if (token) {
				const response: AxiosResponse = await axiosInstance.get('/user/info');
				return response.data;
			}
		} catch (error) {
			const message = (error as Error).message;
			throw new Error(message);
		}
	}
};

import type { AxiosResponse } from 'axios';
import { axiosInstance } from '../services/axios.services';

export const categoryService = {
	getAllCategory: async () => {
		try {
			const response: AxiosResponse = await axiosInstance.get('/api/category');
			return response.data;
		} catch (error) {
			const message = (error as Error).message;
			throw new Error(message);
		}
	},
	createCategory: async (name: string) => {
		try {
			const response: AxiosResponse = await axiosInstance.post('/api/category', { name });
			return response.data;
		} catch (error) {
			const message = (error as Error).message;
			throw new Error(message);
		}
	},
	updateCategory: async (id: string, name: string) => {
		try {
			const response: AxiosResponse = await axiosInstance.put(`/api/category/${id}`, { name });
			return response.data;
		} catch (error) {
			const message = (error as Error).message;
			throw new Error(message);
		}
	},
	deleteCategory: async (id: string) => {
		try {
			const response: AxiosResponse = await axiosInstance.delete(`/api/category/${id}`);
			return response.data;
		} catch (error) {
			const message = (error as Error).message;
			throw new Error(message);
		}
	}
};

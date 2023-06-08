import type { AxiosResponse, AxiosProgressEvent } from 'axios';
import { axiosInstance } from '../services/axios.services';

export const uploadService = {
	uploadImage: async (file: File, onProgress: (progressEvent: AxiosProgressEvent) => void) => {
		try {
			const formData = new FormData();
			formData.append('file', file);

			const config = {
				headers: {
					'content-type': 'multipart/form-data'
				},
				onUploadProgress: (progressEvent: AxiosProgressEvent) => {
					onProgress(progressEvent);
				}
			};

			const response: AxiosResponse = await axiosInstance.post('/api/upload', formData, config);
			return response.data;
		} catch (error) {
			const message = (error as Error).message;
			throw new Error(message);
		}
	},
	uploadVideo: async (file: File, onProgress: (progressEvent: AxiosProgressEvent) => void) => {
		try {
			const formData = new FormData();
			formData.append('file', file);

			const config = {
				headers: {
					'content-type': 'multipart/form-data'
				},
				onUploadProgress: (progressEvent: AxiosProgressEvent) => {
					const progress = Math.round((progressEvent.loaded / progressEvent.total!) * 100);
					onProgress(progressEvent);
				}
			};

			const response: AxiosResponse = await axiosInstance.post('/api/upload/video', formData, config);
			return response.data;
		} catch (error) {
			const message = (error as Error).message;
			throw new Error(message);
		}
	},
	deleteImage: async (public_id: string) => {
		try {
			const response: AxiosResponse = await axiosInstance.post('/api/destroy', { public_id });
			return response.data;
		} catch (error) {
			const message = (error as Error).message;
			throw new Error(message);
		}
	}
};

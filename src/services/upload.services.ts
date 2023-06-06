import type { AxiosResponse } from "axios";
import { axiosInstance } from "../services/axios.services";

export const uploadService = {
    uploadImage: async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response: AxiosResponse = await axiosInstance.post('/api/upload', formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
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
}
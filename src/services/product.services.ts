import type { AxiosResponse } from 'axios';
import type { IImages } from '../interfaces/product';
import { axiosInstance } from '../services/axios.services';

export const productService = {
    getAllProducts: async () => {
        try {
            const response: AxiosResponse = await axiosInstance.get('/api/products');
            return response.data;
        } catch (error) {
            const message = (error as Error).message;
            throw new Error(message);
        }
    },
    createProducts: async (product_id: string, title: string, price: number, description: string, content: string, category: string, images: IImages) => {
        try {
            const response: AxiosResponse = await axiosInstance.post('/api/products', { product_id, title, price, description, content, category, images });
            return response.data;
        } catch (error) {
            const message = (error as Error).message;
            throw new Error(message);
        }
    },
    updateProducts: async (id: string, product_id: string, title: string, price: number, description: string, content: string, category: string, images: IImages) => {
        try {
            const response: AxiosResponse = await axiosInstance.put(`/api/products/${id}`, { product_id, title, price, description, content, category, images });
            return response.data;
        } catch (error) {
            const message = (error as Error).message;
            throw new Error(message);
        }
    },
    deleteProducts: async (id: string) => {
        try {
            const response: AxiosResponse = await axiosInstance.delete(`/api/products/${id}`);
            return response.data;
        } catch (error) {
            const message = (error as Error).message;
            throw new Error(message);
        }
    }
}
import Cookies from 'js-cookie';
import { axiosInstance } from '../services/axios.services';

export const userService = {
    login: async (email: string, password: string) => {
        try {
            const response = await axiosInstance.post('/user/login', { email, password });
            Cookies.set('token', response.data.accesstoken, { expires: 1 });
            return response;
        } catch (error) {
            const message = (error as Error).message;
            throw new Error(message);
        }
    },
    logout: async () => {
        try {
            Cookies.remove('token');
        } catch (error) {
            const message = (error as Error).message;
            throw new Error(message);
        }
    },
    getUserProfile: async () => {
        try {
            const response = await axiosInstance.get('/user/info');
            return response.data;
        } catch (error) {
            return error;
        }
    }
}
import { LoginData, LoginResponse, RegisterData } from '@/types/Auth';
import { api } from './api';

export const login = async (data: LoginData) => {
    const response = await api.post<LoginResponse>('/auth/login', data);
    return response.data;
};

export const register = async (data: RegisterData) => {
    const response = await api.post('/auth/register', data);
    return response.data;
};

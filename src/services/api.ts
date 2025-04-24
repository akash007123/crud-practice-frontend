import axios from 'axios';
import { User, UserFormData } from '../types/User';

const API_BASE_URL = 'https://learnnode-profilics.onrender.com/api';

export const api = {
  getUsers: async (): Promise<User[]> => {
    const response = await axios.get(`${API_BASE_URL}/user`);
    return response.data;
  },

  getUser: async (id: string): Promise<User> => {
    const response = await axios.get(`${API_BASE_URL}/user/${id}`);
    return response.data;
  },

  createUser: async (userData: UserFormData): Promise<User> => {
    const response = await axios.post(`${API_BASE_URL}/user`, userData);
    return response.data.user;
  },

  updateUser: async (id: string, userData: Partial<UserFormData>): Promise<User> => {
    const response = await axios.patch(`${API_BASE_URL}/user/${id}`, userData);
    return response.data.user;
  },

  deleteUser: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/user/${id}`);
  },
};
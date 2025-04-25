import axios, { AxiosError } from 'axios';
import { User, UserFormData } from '../types/User';

const API_BASE_URL = 'http://localhost:8000/api';


//for sorting and searching
interface GetUsersParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  page?: number;
  limit?: number;
  gender?: string;
  jobTitle?: string;
  startDate?: string;
  endDate?: string;
}

interface PaginatedResponse {
  users: User[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    usersPerPage: number;
  };
}

export const api = {
  getUsers: async (params?: GetUsersParams): Promise<PaginatedResponse> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user`, { params });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.error || 'Failed to fetch users');
      }
      throw error;
    }
  },

  getUser: async (id: string): Promise<User> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.error || 'Failed to fetch user');
      }
      throw error;
    }
  },

  createUser: async (userData: UserFormData): Promise<User> => {
    try {
      const formData = new FormData();
      
      // Append all user data to FormData
      Object.entries(userData).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });

      const response = await axios.post(`${API_BASE_URL}/user`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.user;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.error || 'Failed to create user');
      }
      throw error;
    }
  },

  updateUser: async (id: string, userData: Partial<UserFormData>): Promise<User> => {
    try {
      const formData = new FormData();
      
      // Append all user data to FormData
      Object.entries(userData).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });

      const response = await axios.patch(`${API_BASE_URL}/user/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.user;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.error || 'Failed to update user');
      }
      throw error;
    }
  },

  deleteUser: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/user/${id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.error || 'Failed to delete user');
      }
      throw error;
    }
  },
};
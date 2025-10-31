import axios from 'axios';
import type { User, RegisterData, LoginData, Project, ProjectDetail, Task } from '../types';

const API_BASE_URL = 'https://project-manager-api-fe1o.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    const user: User = JSON.parse(userStr);
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  register: async (data: RegisterData): Promise<User> => {
    const response = await api.post<User>('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginData): Promise<User> => {
    const response = await api.post<User>('/auth/login', data);
    return response.data;
  },
};

export const projectApi = {
  getAll: async (): Promise<Project[]> => {
    const response = await api.get<Project[]>('/projects');
    return response.data;
  },

  getById: async (id: number): Promise<ProjectDetail> => {
    const response = await api.get<ProjectDetail>(`/projects/${id}`);
    return response.data;
  },

  create: async (data: { title: string; description?: string }): Promise<Project> => {
    const response = await api.post<Project>('/projects', data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },

  schedule: async (projectId: number, tasks: any[]): Promise<any> => {
    const response = await api.post(`/projects/${projectId}/schedule`, { tasks });
    return response.data;
  },
};

export const taskApi = {
  create: async (projectId: number, data: { title: string; dueDate?: string }): Promise<Task> => {
    const response = await api.post<Task>(`/projects/${projectId}/tasks`, data);
    return response.data;
  },

  update: async (taskId: number, data: Partial<Task>): Promise<Task> => {
    const response = await api.put<Task>(`/tasks/${taskId}`, data);
    return response.data;
  },

  delete: async (taskId: number): Promise<void> => {
    await api.delete(`/tasks/${taskId}`);
  },
};
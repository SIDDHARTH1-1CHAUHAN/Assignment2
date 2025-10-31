export interface User {
  email: string;
  fullName: string;
  token: string;
}

export interface Project {
  id: number;
  title: string;
  description?: string;
  createdAt: string;
  taskCount: number;
  completedTaskCount: number;
}

export interface Task {
  id: number;
  title: string;
  dueDate?: string;
  isCompleted: boolean;
  createdAt: string;
  projectId: number;
}

export interface ProjectDetail {
  id: number;
  title: string;
  description?: string;
  createdAt: string;
  tasks: Task[];
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginData {
  email: string;
  password: string;
}
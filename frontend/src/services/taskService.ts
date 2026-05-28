import { CreateTaskData, Task } from '@/types/Task';
import { api } from './api';

export const getTasks = async () => {
    const response = await api.get<Task[]>('/tasks');

    return response.data;
};

export const createTask = async (data: CreateTaskData) => {
    const response = await api.post<Task>('/tasks', data);

    return response.data;
};

export const deleteTask = async (id: number) => {
    await api.delete(`/tasks/${id}`);
}

export const completeTask = async (id: number) => {
    const response = await api.patch(`/tasks/${id}/complete`);

    return response.data;
}

export const updateTask = async (id: number, data: CreateTaskData) => {
    const response = await api.put<Task>(`/tasks/${id}`, {
        ...data,
        completed: false, // Garantir que a tarefa seja marcada como pendente ao atualizar
    });

    return response.data;
}
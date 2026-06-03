'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import {
    completeTask,
    createTask,
    deleteTask,
    getTasks,
    updateTask,
} from '@/services/taskService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DashboardHeader } from './DashboardHeader';
import { CreateTaskForm } from './CreateTaskForm';
import { TaskList } from './TaskList';
import { SearchTask } from './SearchTask';
import { DashboardStats } from './DashboardStats';
import { FilterTask } from '@/components/FilterTask';
import { TaskSkeleton } from '@/components/TaskSkeleton';
import { Spinner } from '@/components/spinner';

const createTaskSchema = z.object({
    title: z.string().min(3, 'Título muito curto!'),
    description: z.string().min(3, 'Descrição muito curta!'),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;

const DashboardPage = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all'); 

    const form = useForm<CreateTaskSchema>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            title: '',
            description: '',
        },
    });

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login');
            return;
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    const createTaskMutation = useMutation({
        mutationFn: createTask,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            form.reset();
            toast.success('Task criada com sucesso!');
        },

        onError: () => {
            toast.error('Erro ao criar a task. Tente novamente.');
            console.error('Erro ao criar a task');
        }
    });

    const handleCreateTask = (data: CreateTaskSchema) => {
        createTaskMutation.mutate(data);    
    }

    const deleteTaskMutation = useMutation({
        mutationFn: deleteTask,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task excluída com sucesso!');
        },
        
        onError: () => {
            toast.error('Erro ao excluir a task. Tente novamente.');
            console.error('Erro ao excluir a task');
        }
    });

    const handleDeleteTask = (id: number) => {
        deleteTaskMutation.mutate(id);
    };

    const completeTaskMutation = useMutation({
        mutationFn: completeTask,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },

        onError: () => {
            toast.error('Erro ao atualizar a task. Tente novamente.');
            console.error('Erro ao atualizar a task');
        }
    });

    const handleCompleteTask = (id: number) => {
        completeTaskMutation.mutate(id);
    };

    const updateTaskMutation = useMutation({
        mutationFn: ({ id, data }: { id: number, data: CreateTaskSchema }) => updateTask(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });

            setEditingTaskId(null);
            setEditTitle('');
            setEditDescription('');

            toast.success('Task editada com sucesso!');
        },

        onError: () => {
            toast.error('Erro ao editar a task. Tente novamente.');
            console.error('Erro ao editar a task');
        }
    });

    const handleUpdateTask = (id: number) => {
        updateTaskMutation.mutate({ 
            id,
            data: { 
                title: editTitle,
                description: editDescription 
            } 
        });
    }

    const {
        data: tasks = [],
        isLoading,
        isFetching,
        error
    } = useQuery({
        queryKey: ['tasks'],
        queryFn: getTasks,
    });

    if (isLoading) {
        return (
            <main className="min-h-screen bg-background">
                <DashboardHeader onLogout={handleLogout} />

                <section className="container mx-auto p-6">
                    <TaskSkeleton />
                </section>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen flex items-center justify-center">
            <p>Erro ao carregar tasks.</p>
            </main>
        );
    }

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch =
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.description.toLowerCase().includes(search.toLowerCase());

        const matchesFilter =
            filter === "all"
            ? true
            : filter === "completed"
            ? task.completed
            : !task.completed;

        return matchesSearch && matchesFilter;
    });

    return (
        <main className="relative min-h-screen overflow-hidden bg-background">
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

                <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
            </div>

            <DashboardHeader onLogout={handleLogout} />

            <section className="container mx-auto px-6 pt-8">
                <div
                    className="
                        rounded-3xl
                        border
                        bg-card/40
                        backdrop-blur-xl
                        p-8
                        mb-8
                    "
                >
                    <span
                        className="
                            inline-flex
                            items-center
                            rounded-full
                            border
                            px-4
                            py-2
                            text-sm
                            mb-4
                        "
                    >
                        🚀 Bem-vindo ao TaskFlow
                    </span>

                    <h1
                        className="
                            text-4xl
                            font-bold
                            bg-linear-to-r
                            from-cyan-400
                            via-emerald-400
                            to-violet-500
                            bg-clip-text
                            text-transparent
                        "
                    >
                        Organize suas tarefas com eficiência
                    </h1>

                    <p className="mt-4 text-muted-foreground max-w-2xl">
                        Crie, acompanhe e conclua tarefas em uma experiência moderna,
                        rápida e intuitiva.
                    </p>
                </div>
            </section>

            <section className="container mx-auto p-6">

                <DashboardStats tasks={tasks} />

                <FilterTask filter={filter} setFilter={setFilter} />

                <div className="
                        rounded-3xl
                        border
                        bg-card/40
                        backdrop-blur-xl
                        p-8
                        shadow-xl
                    "
                >
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h2 className="text-3xl font-bold">
                                Minhas Tasks
                            </h2>

                            <p className="text-muted-foreground text-sm">
                                Gerencie e acompanhe suas atividades.
                            </p>
                        </div>

                        {isFetching && (
                            <div className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    px-4
                                    py-2
                                    text-sm
                                    bg-card/50
                                    backdrop-blur
                                "
                            >
                                <Spinner size={20}/>
                                Atualizando...
                            </div>
                        )}
                    </div>

                    <SearchTask search={search} setSearch={setSearch} />

                    <CreateTaskForm 
                        form={form}
                        onSubmit={handleCreateTask}
                        isPending={createTaskMutation.isPending}
                    />

                    <TaskList 
                        tasks={filteredTasks}
                        editingTaskId={editingTaskId}
                        editTitle={editTitle}
                        editDescription={editDescription}
                        setEditTitle={setEditTitle}
                        setEditDescription={setEditDescription}
                        onSave={handleUpdateTask}
                        onDelete={handleDeleteTask}
                        onComplete={handleCompleteTask}
                        onStartEdit={(task) => {
                            setEditingTaskId(task.id);
                            setEditTitle(task.title);
                            setEditDescription(task.description);
                        }}
                        onCancelEdit={() => {
                            setEditingTaskId(null);
                            setEditTitle('');
                            setEditDescription('');
                        }}
                    />
                </div>
            </section>
        </main>
    );
};

export default DashboardPage;


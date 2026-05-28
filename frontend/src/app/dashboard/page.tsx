'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    completeTask,
    createTask,
    deleteTask,
    getTasks,
    updateTask,
} from '@/services/taskService';
import { Task } from '@/types/Task';

const createTaskSchema = z.object({
    title: z.string().min(3, 'Título muito curto!'),
    description: z.string().min(3, 'Descrição muito curta!'),
});

type CreateTaskSchema = z.infer<typeof createTaskSchema>;

const DashboardPage = () => {
    const router = useRouter();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [isCreatingTask, setIsCreatingTask] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState<number | null>(
        null
    );
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const form = useForm<CreateTaskSchema>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            title: '',
            description: '',
        },
    });

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login');
            return;
        }

        fetchTasks();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    const handleCreateTask = async (data: CreateTaskSchema) => {
        try {
            setIsCreatingTask(true);

            const newTask = await createTask(data);

            setTasks((prevTasks) => [newTask, ...prevTasks]);

            form.reset();

            toast.success('Task criada com sucesso!');

        } catch (error) {
            console.error(error);
            toast.error('Erro ao criar a task.');
        } finally {
            setIsCreatingTask(false);
        }
    };

    const handleDeleteTask = async (id: number) => {
        try {
            await deleteTask(id);

            setTasks((prevTasks) =>
                prevTasks.filter((task) => task.id !== id)
            );

            toast.success('Task excluída com sucesso!');
        } catch (error) {
            console.error(error);
            toast.error('Erro ao excluir a task.');
        }
    };

    const handleCompleteTask = async (id: number) => {
        try {
            const updatedTask = await completeTask(id);

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === id ? updatedTask : task
                )
            );

            toast.success(`Task ${
                updatedTask.completed ? 'concluída' : 'marcada como pendente'}!`);
        } catch (error) {
            console.error(error);
            toast.error('Erro ao atualizar a task.');
        }
    };

    const handleUpdateTask = async (id: number) => {
        try {
            const updatedTask = await updateTask(id, {
                title: editTitle,
                description: editDescription,
            });

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === id ? updatedTask : task
                )
            );

            setEditingTaskId(null);
            setEditTitle('');
            setEditDescription('');

            toast.success('Task editada com sucesso!');
        } catch (error) {
            console.error(error);
            toast.error('Erro ao editar a task.');
        }
    }

    return (
        <main className="min-h-screen bg-background">
            <header className="border-b">
                <div className="container mx-auto flex items-center justify-between p-4">
                    <div>
                        <h1 className="text-2xl font-bold">ToDo App</h1>

                        <p className="text-muted-foreground">
                            Gerencie suas Tarefas
                        </p>
                    </div>

                    <Button
                        variant="destructive"
                        onClick={handleLogout}
                    >
                        Sair
                    </Button>
                </div>
            </header>

            <section className="container mx-auto p-6">
                <div className="rounded-2xl border p-6">
                    <h2 className="text-2xl font-semibold mb-2">
                        Minhas Tasks
                    </h2>

                    <form
                        onSubmit={form.handleSubmit(handleCreateTask)}
                        className="space-y-6 mb-8"
                    >
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Título</FieldLabel>

                                <FieldContent>
                                    <Input
                                        placeholder="Digite o título da task"
                                        {...form.register('title')}
                                    />
                                </FieldContent>

                                <FieldDescription>
                                    Nome da tarefa
                                </FieldDescription>

                                {form.formState.errors.title && (
                                    <FieldError>
                                        {form.formState.errors.title
                                            .message}
                                    </FieldError>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel>Descrição</FieldLabel>

                                <FieldContent>
                                    <Input
                                        placeholder="Digite a descrição"
                                        {...form.register(
                                            'description'
                                        )}
                                    />
                                </FieldContent>

                                <FieldDescription>
                                    Descrição da tarefa
                                </FieldDescription>

                                {form.formState.errors.description && (
                                    <FieldError>
                                        {
                                            form.formState
                                                .errors
                                                .description?.message
                                        }
                                    </FieldError>
                                )}
                            </Field>
                        </FieldGroup>

                        <Button
                            type="submit"
                            disabled={isCreatingTask}
                            className="w-full"
                        >
                            {isCreatingTask
                                ? 'Criando...'
                                : 'Criar task'}
                        </Button>
                    </form>

                    <div className="space-y-4">
                        {tasks.length === 0 ? (
                            <p className="text-muted-foreground">
                                Nenhuma tarefa encontrada.
                            </p>
                        ) : (
                            tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="border rounded-2xl p-4 bg-card flex items-center justify-between gap-4"
                                >
                                    <div className="flex-1 min-w-0">
                                        {editingTaskId === task.id ? (
                                            <div className="space-y-3">
                                                <Input
                                                    value={editTitle}
                                                    onChange={(e) =>
                                                        setEditTitle(
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <Input
                                                    value={editDescription}
                                                    onChange={(e) =>
                                                        setEditDescription(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <h3 className="font-semibold text-lg">
                                                    {task.title}
                                                </h3>

                                                <p className="text-muted-foreground">
                                                    {task.description}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {editingTaskId === task.id ? (
                                          <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleUpdateTask(task.id)}
                                            >
                                                Salvar
                                            </Button>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    setEditingTaskId(null)
                                                    setEditTitle('')
                                                    setEditDescription('')
                                                }}
                                            >
                                                Cancelar
                                            </Button>
                                          </div>
                                        ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setEditingTaskId(task.id);
                                                setEditTitle(task.title);
                                                setEditDescription(
                                                    task.description
                                                );
                                            }}
                                        >
                                            Editar
                                        </Button>
                                        )}

                                        <Button
                                            variant={
                                                task.completed
                                                    ? 'default'
                                                    : 'secondary'
                                            }
                                            size="sm"
                                            onClick={() =>
                                                handleCompleteTask(
                                                    task.id
                                                )
                                            }
                                        >
                                            {task.completed
                                                ? '✅ Concluída'
                                                : '⏳ Pendente'}
                                        </Button>

                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() =>
                                                handleDeleteTask(task.id)
                                            }
                                        >
                                            Excluir
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default DashboardPage;


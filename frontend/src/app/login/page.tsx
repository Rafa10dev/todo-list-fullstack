'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { login } from '@/services/authService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const LoginPage = () => {
    const router = useRouter();

    const loginSchema = z.object({
        email: z.email('Email inválido!'),
        password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    });

    type LoginSchema = z.infer<typeof loginSchema>;

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),

        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleLogin = async (data: LoginSchema) => {
        try {
            const response = await login(data);

            const token = response.token;

            localStorage.setItem('token', token);

            toast.success('Login realizado com sucesso!');

            router.push('/dashboard');
        } catch (error) {
            console.error(error);

            toast.error('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-3xl">Login</CardTitle>
                    <CardDescription>Entre na sua conta</CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={form.handleSubmit(handleLogin)}
                        className="space-y-6"
                    >
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <FieldContent>
                                    <Input
                                        type="email"
                                        placeholder="Digite seu email"
                                        {...form.register('email')}
                                    />
                                </FieldContent>
                                <FieldDescription>
                                    Use o email cadastrado
                                </FieldDescription>

                                {form.formState.errors.email && (
                                    <FieldError>
                                        {form.formState.errors.email.message}
                                    </FieldError>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel>Senha</FieldLabel>
                                <FieldContent>
                                    <Input
                                        type="password"
                                        placeholder="Digite sua senha"
                                        {...form.register('password')}
                                    />
                                </FieldContent>
                                <FieldDescription>
                                    Mínimo de 6 caracteres
                                </FieldDescription>

                                {form.formState.errors.password && (
                                    <FieldError>
                                        {form.formState.errors.password.message}
                                    </FieldError>
                                )}
                            </Field>
                        </FieldGroup>

                        <Button type="submit" className="w-full">
                            Entrar
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
};
export default LoginPage;

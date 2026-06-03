'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckSquare } from 'lucide-react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { login } from '@/services/authService';

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

const loginSchema = z.object({
    email: z.email('Email inválido!'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

type LoginSchema = z.infer<typeof loginSchema>;

const LoginPage = () => {
    const router = useRouter();

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

            localStorage.setItem(
                'token',
                response.token
            );

            toast.success(
                'Login realizado com sucesso!'
            );

            router.push('/dashboard');
        } catch (error) {
            console.error(error);

            toast.error(
                'Erro ao fazer login. Verifique suas credenciais.'
            );
        }
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-background flex items-center justify-center px-6">

            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

                <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

                <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
            </div>

            <motion.div
                initial={{
                    opacity: 0,
                    y: 30,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.6,
                }}
            >
                <Card
                    className="
                        w-full
                        max-w-5xl
                        border
                        bg-card/60
                        backdrop-blur-xl
                        shadow-2xl
                    "
                >
                    <CardHeader>

                        <div className="flex flex-col items-center">

                            <div className="flex items-center gap-2 mb-4">

                                <CheckSquare
                                    className="
                                        h-8
                                        w-8
                                        text-cyan-500
                                        drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]
                                    "
                                />

                                <span className="text-2xl font-bold">
                                    TaskFlow
                                </span>

                            </div>

                            <CardTitle className="text-3xl">
                                Login
                            </CardTitle>

                            <CardDescription>
                                Entre na sua conta
                            </CardDescription>

                        </div>

                    </CardHeader>

                    <CardContent className="p-6">
                        <form
                            onSubmit={form.handleSubmit(handleLogin)}
                            className="space-y-6"
                        >
                            <FieldGroup>

                                <Field>
                                    <FieldLabel>
                                        Email
                                    </FieldLabel>

                                    <FieldContent>
                                        <Input
                                            type="email"
                                            placeholder="Digite seu email"
                                            className="h-11 rounded-xl"
                                            {...form.register('email')}
                                        />
                                    </FieldContent>

                                    <FieldDescription>
                                        Use o email cadastrado
                                    </FieldDescription>

                                    {form.formState.errors.email && (
                                        <FieldError>
                                            {
                                                form.formState.errors.email
                                                    .message
                                            }
                                        </FieldError>
                                    )}
                                </Field>

                                <Field>
                                    <FieldLabel>
                                        Senha
                                    </FieldLabel>

                                    <FieldContent>
                                        <Input
                                            type="password"
                                            placeholder="Digite sua senha"
                                            className="h-11 rounded-xl"
                                            {...form.register('password')}
                                        />
                                    </FieldContent>

                                    <FieldDescription>
                                        Mínimo de 6 caracteres
                                    </FieldDescription>

                                    {form.formState.errors.password && (
                                        <FieldError>
                                            {
                                                form.formState.errors.password
                                                    .message
                                            }
                                        </FieldError>
                                    )}
                                </Field>

                            </FieldGroup>

                            <Button
                                type="submit"
                                className="
                                    w-full
                                    h-12
                                    rounded-xl
                                    bg-linear-to-r
                                    from-cyan-500
                                    via-emerald-500
                                    to-violet-500
                                    hover:scale-[1.02]
                                    transition-all
                                    duration-300
                                    shadow-lg
                                    shadow-cyan-500/20
                                "
                            >
                                Entrar
                            </Button>

                            <div className="text-center text-sm text-muted-foreground">

                                Não possui uma conta?

                                <Link
                                    href="/register"
                                    className="
                                        ml-2
                                        font-medium
                                        text-cyan-500
                                        hover:text-cyan-400
                                    "
                                >
                                    Criar Conta
                                </Link>

                            </div>

                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </main>
    );
};

export default LoginPage;
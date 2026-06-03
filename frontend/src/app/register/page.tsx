'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckSquare, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { register } from "@/services/authService";
import { useState } from 'react';

    const registerSchema = z
        .object({
            name: z
                .string()
                .min(3, "Nome deve ter pelo menos 3 caracteres"),

            email: z
                .string()
                .email("Email inválido"),

            password: z
                .string()
                .min(6, "Senha deve ter pelo menos 6 caracteres"),

            confirmPassword: z
                .string(),
        })
        .refine(
            (data) => data.password === data.confirmPassword,
            {
                message: "As senhas não coincidem",
                path: ["confirmPassword"],
            }
        );

    type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),

        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const handleRegister = async (
        data: RegisterFormData  
    ) => {
        try {
            setIsLoading(true);
            await register({
                name: data.name,
                email: data.email,
                password: data.password,
            });

            toast.success(
                "Conta criada com sucesso!"
            );

            router.push("/login");
        } catch {
            toast.error(
                "Erro ao criar conta."
            );
        } finally {
            setIsLoading(false);
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
                className="
                    w-full
                    max-w-md
                    rounded-3xl
                    border
                    bg-card/60
                    backdrop-blur-xl
                    p-8
                    shadow-2xl
                "
            >
                {/* Logo */}

                <div className="flex flex-col items-center mb-8">
                    <div className="flex items-center gap-2 mb-3">
                        <CheckSquare
                            className="
                                h-8
                                w-8
                                text-cyan-500
                                drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]
                            "
                        />

                        <h1 className="text-2xl font-bold">
                            TaskFlow
                        </h1>
                    </div>

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            px-4
                            py-2
                            text-sm
                            bg-card/50
                        "
                    >
                        <UserPlus className="h-4 w-4 text-emerald-500" />

                        Criar nova conta
                    </div>
                </div>

                {/* Form */}

                <form 
                    className="space-y-4"
                    onSubmit={form.handleSubmit(handleRegister)}
                >

                    <Input
                        placeholder="Nome"
                        {...form.register("name")}
                    />

                    {
                        form.formState.errors.name && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.name.message}
                            </p>
                        )
                    }

                    <Input
                        type="email"
                        placeholder="Email"
                        {...form.register("email")}
                    />

                    {
                        form.formState.errors.email && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.email.message}
                            </p>
                        )
                    }

                    <Input
                        type="password"
                        placeholder="Senha"
                        {...form.register("password")}
                    />

                    {
                        form.formState.errors.password && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.password.message}
                            </p>
                        )
                    }

                    <Input
                        type="password"
                        placeholder="Confirmar senha"
                        {...form.register("confirmPassword")}
                    />

                    {
                        form.formState.errors.confirmPassword && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.confirmPassword.message}
                            </p>
                        )
                    }

                    <Button
                        type="submit"
                        disabled={isLoading}
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
                         {isLoading
                            ? "Criando conta..."
                            : "Criar Conta"
                        }
                    </Button>
                </form>

                {/* Footer */}

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    Já possui uma conta?

                    <Link
                        href="/login"
                        className="
                            ml-2
                            font-medium
                            text-cyan-500
                            hover:text-cyan-400
                        "
                    >
                        Fazer Login
                    </Link>
                </div>
            </motion.div>
        </main>
    );
}
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2, CheckSquare, MoonStar, Rocket } from 'lucide-react';
import { ThemeToggle } from '@/components/toggle-theme';

export default function HomePage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

                <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

                <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
            </div>

            {/* Navbar */}
            <header className="flex items-center justify-between px-8 py-6 border-b border-border/50 backdrop-blur-md">
                <div className="flex items-center gap-2">
                    <CheckSquare 
                        className="
                            h-6 
                            w-6 
                            text-cyan-500
                            drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]
                        " 
                    />

                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl font-bold tracking-tight"
                    >
                        TaskFlow
                    </motion.h1>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-4"
                >
                    <ThemeToggle />
                    <Link href="/login">
                        <Button variant="outline">Login</Button>
                    </Link>
                </motion.div>
            </header>

            {/* Hero */}
            <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl"
                >
                    <div className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        px-4
                        py-2
                        text-sm
                        mb-6
                        bg-card/50
                        backdrop-blur
                        mt-6
                    ">
                        ✨ Nova experiência de produtividade
                    </div>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-linear-to-r from-cyan-400 via-emerald-400 to-violet-500 bg-clip-text text-6xl font-extrabold tracking-tight text-transparent md:text-7xl"
                    >
                        Organize sua vida com mais produtividade
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 text-lg text-muted-foreground md:text-xl"
                    >
                        Gerencie tarefas, acompanhe sua produtividade e mantenha
                        tudo sob controle com uma experiência moderna e
                        intuitiva.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                    >
                        <Link href="/register">
                            <Button
                                size="lg"
                                className="
                                    h-14
                                    px-10
                                    rounded-xl
                                    bg-linear-to-r
                                    from-cyan-500
                                    to-violet-500
                                    shadow-lg
                                    shadow-cyan-500/20
                                    hover:scale-105
                                    transition-all
                                    duration-300
                                "
                            >
                                Criar Conta
                            </Button>
                        </Link>

                        <Link href="/login">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="
                                h-14
                                px-10
                                rounded-xl
                                border
                                bg-card/50
                                backdrop-blur
                                hover:scale-105
                                transition
                                "
                            >
                                Fazer Login
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Floating Cards */}
                <div className="mt-24 hidden w-full max-w-5xl grid-cols-3 gap-6 md:grid">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                        }}
                        className="
                            rounded-2xl
                            border
                            border-white/10
                            bg-card/40
                            p-6
                            shadow-2xl
                            backdrop-blur
                            hover:scale-105
                            transition-all
                            duration-300
                        "
                    >
                        <CheckCircle2 className="h-8 w-8 text-emerald-500 mb-3" />

                        <p className="text-lg font-semibold">
                            Criar tarefas
                        </p>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Organize todas suas atividades facilmente.
                        </p>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                        }}
                        className="
                            rounded-2xl
                            border
                            border-white/10
                            bg-card/40
                            p-6
                            shadow-2xl
                            backdrop-blur
                            hover:scale-105
                            transition-all
                            duration-300
                        "
                    >
                        <Rocket className="h-8 w-8 text-cyan-500 mb-3" />

                        <p className="text-lg font-semibold">
                            Alta produtividade
                        </p>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Acompanhe seu progresso em tempo real.
                        </p>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                        }}
                        className="
                            rounded-2xl
                            border
                            border-white/10
                            bg-card/40
                            p-6
                            shadow-2xl
                            backdrop-blur
                            hover:scale-105
                            transition-all
                            duration-300
                        "
                    >
                        <MoonStar className="h-8 w-8 text-violet-500 mb-3" />

                        <p className="text-lg font-semibold">
                            Dark Mode Moderno
                        </p>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Interface elegante e confortável para usar.
                        </p>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}

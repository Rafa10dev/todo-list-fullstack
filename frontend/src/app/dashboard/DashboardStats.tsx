import { Task } from "@/types/Task";
import {
    CheckCircle,
    Clock,
    Clock3,
    ListTodo,
    TrendingUp
} from "lucide-react";

type Props = {
    tasks: Task[];
};

export const DashboardStats = ({ tasks }: Props) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length;

    const pendingTasks = tasks.filter(
        (task) => !task.completed
    ).length;

    const completionRate =
        totalTasks > 0
            ? Math.round(
                  (completedTasks / totalTasks) * 100
              )
            : 0;

    const cardStyle =
        `
            rounded-3xl
            border
            backdrop-blur-xl
            p-5
            flex
            items-center
            gap-4
            shadow-lg
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
        `;
    return (
        <section className="mb-8">

            <h2
                className="
                    mb-6
                    text-3xl
                    font-bold
                    bg-linear-to-r
                    from-cyan-400
                    via-emerald-400
                    to-violet-500
                    bg-clip-text
                    text-transparent
                "
            >
                Visão Geral
            </h2>

            {/* Cards */}
            <div className="grid gap-4 md:grid-cols-4">

                <div className={`${cardStyle}
                    bg-linear-to-br
                    from-cyan-500/10
                    to-cyan-500/5
                    border-cyan-500/20

                    `}
                >
                    <ListTodo className="w-8 h-8 text-cyan-400" />

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Total
                        </p>

                        <h2 className="text-3xl font-bold">
                            {totalTasks}
                        </h2>
                    </div>
                </div>

                <div
                    className={`${cardStyle}
                    bg-linear-to-br
                    from-emerald-500/10
                    to-emerald-500/5
                    border-emerald-500/20
                    `}
                >
                    <CheckCircle className="w-8 h-8 text-emerald-400" />

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Concluídas
                        </p>

                        <h2 className="text-3xl font-bold">
                            {completedTasks}
                        </h2>
                    </div>
                </div>

                <div
                    className={`${cardStyle}
                    bg-linear-to-br
                    from-orange-500/10
                    to-orange-500/5
                    border-orange-500/20
                    `}
                >
                    <Clock3 className="w-8 h-8 text-orange-400" />

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Pendentes
                        </p>

                        <h2 className="text-3xl font-bold">
                            {pendingTasks}
                        </h2>
                    </div>
                </div>

                <div
                    className={`${cardStyle}
                    bg-linear-to-br
                    from-violet-500/10
                    to-violet-500/5
                    border-violet-500/20
                    `}
                >
                    <TrendingUp className="w-8 h-8 text-violet-400" />

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Taxa de Conclusão
                        </p>

                        <h2 className="text-3xl font-bold">
                            {completionRate}%
                        </h2>
                    </div>
                </div>

            </div>

            {/* Barra de progresso */}
            <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                    <span>Progresso Geral</span>
                    <span>{completionRate}%</span>
                </div>

                <div className="h-4 w-full rounded-full bg-muted overflow-hidden">

                    <div
                        className="
                            h-full
                            rounded-full
                            bg-linear-to-r
                            from-cyan-500
                            via-emerald-500
                            to-violet-500
                            transition-all
                            duration-1000
                        "
                        style={{
                            width: `${completionRate}%`
                        }}
                    />

                </div>
            </div>

        </section>
    );
};
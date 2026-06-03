import { Task } from "@/types/Task";
import { TaskCard } from "./TaskCard";
import { AnimatePresence } from "framer-motion";
import { ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
    tasks: Task[];

    editingTaskId: number | null;

    editTitle: string;
    editDescription: string;

    setEditTitle: (title: string) => void;
    setEditDescription: (description: string) => void;

    onSave: (id: number) => void;
    onDelete: (id: number) => void;
    onComplete: (id: number) => void;

    onStartEdit: (task: Task) => void;
    onCancelEdit: () => void;
};


export const TaskList = ({ 
    tasks, 
    editingTaskId, 
    editTitle, 
    editDescription,
    setEditTitle,
    setEditDescription,
    onSave,
    onDelete,
    onComplete,
    onStartEdit,
    onCancelEdit}: Props) => {
        
    return (
        <div className="space-y-5">
            <AnimatePresence>
            {tasks.length === 0 ? (
                <motion.div 
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.5,
                    }}
                    className="flex flex-col items-center justify-center py-24 text-center"
                >

                    <div
                        className="
                            mb-6
                            flex
                            h-24
                            w-24
                            items-center
                            justify-center
                            rounded-full
                            bg-linear-to-br
                            from-cyan-500/20
                            via-emerald-500/20
                            to-violet-500/20
                            border
                            backdrop-blur-xl
                        "
                    >
                        <ClipboardList
                            size={48}
                            className="text-cyan-400"
                        />
                    </div>

                    <div
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            px-4
                            py-2
                            text-sm
                            mb-4
                            bg-card/50
                            backdrop-blur
                        "
                    >
                        ✨ Tudo organizado
                    </div>

                    <h2
                        className="
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
                        Nenhuma tarefa encontrada
                    </h2>

                    <p
                        className="
                            text-muted-foreground
                            mt-4
                            max-w-md
                        "
                    >
                        Você ainda não possui tarefas cadastradas
                        ou nenhum resultado corresponde à sua busca.
                    </p>

                </motion.div>
            ) : (
                tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        editingTaskId={editingTaskId}
                        editTitle={editTitle}
                        editDescription={editDescription}
                        setEditTitle={setEditTitle}
                        setEditDescription={setEditDescription}
                        onSave={onSave}
                        onDelete={onDelete}
                        onComplete={onComplete}
                        onStartEdit={onStartEdit}
                        onCancelEdit={onCancelEdit}
                    />
                ))
            )}
            </AnimatePresence>
        </div>
    );
}
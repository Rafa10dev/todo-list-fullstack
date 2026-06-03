import { DeleteTaskDialog } from "@/components/DeleteTaskDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Task } from "@/types/Task";
import { motion } from "framer-motion";
import { Check, Clock, Pencil, Trash2, X } from "lucide-react";

type Props = {
    task: Task;

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
}

export const TaskCard = ({ 
    task,
    editingTaskId,
    editTitle, 
    editDescription, 
    setEditTitle, 
    setEditDescription, 
    onSave, 
    onDelete, 
    onComplete, 
    onStartEdit, 
    onCancelEdit }: Props) => {

    return (
        <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{opacity: 0, x: 100, scale: 0.9}}
            whileHover={{
                scale: 1.015,
                y: -4
            }}
            transition={{
                duration: 0.25
            }}
            className={`
                rounded-3xl
                border
                p-5
                backdrop-blur-xl
                flex
                items-center
                justify-between
                gap-4
                shadow-lg
                hover:shadow-2xl
                transition-all
                duration-300
            "
                ${
                    task.completed
                        ? `
                            bg-linear-to-r
                            from-emerald-500/10
                            to-emerald-500/5
                            border-emerald-500/20
                        `
                        : `
                            bg-linear-to-r
                            from-cyan-500/5
                            to-violet-500/5
                        `
                }
            `}
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
                        <div className="flex items-center gap-2 mb-2">

                            {task.completed ? (
                                <Check
                                    className="
                                        h-4
                                        w-4
                                        text-emerald-400
                                    "
                                />
                            ) : (
                                <Clock
                                    className="
                                        h-4
                                        w-4
                                        text-orange-400
                                    "
                                />
                            )}

                            <span className="text-xs text-muted-foreground">
                                {task.completed
                                    ? "Finalizada"
                                    : "Em andamento"}
                            </span>

                        </div>

                        <h3 
                             className={`
                                text-xl
                                font-bold
                                ${
                                    task.completed
                                        ? "line-through opacity-70"
                                        : ""
                                }
                            `}
                        >
                            {task.title}
                        </h3>

                        <p 
                            className={`
                                text-muted-foreground
                                ${
                                    task.completed
                                        ? "line-through opacity-60"
                                        : ""
                                }
                            `}
                        >
                            {task.description}
                        </p>

                        <span
                            className={`
                                 mt-3
                                inline-flex
                                items-center
                                rounded-full
                                px-3
                                py-1
                                text-xs
                                font-semibold
                                ${
                                    task.completed
                                        ? "bg-emerald-500/20 text-emerald-400"
                                        : "bg-orange-500/20 text-orange-400"
                                }
                            `}
                        >
                            {task.completed
                                ? "Concluída"
                                : "Pendente"
                            }
                        </span>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-3">
                {editingTaskId === task.id ? (
                    <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onSave(task.id)}
                    >
                        <Check />Salvar
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {onCancelEdit();}}
                    >
                        <X />Cancelar
                    </Button>
                    </div>
                ) : (
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {onStartEdit(task)}}
                >
                    <Pencil /> Editar
                </Button>
                )}

                <Button
                    variant={
                        task.completed
                            ? 'default'
                            : 'outline'
                    }
                    size="sm"
                    onClick={() => onComplete(task.id)}
                >
                    {task.completed ? (
                        <>
                            <Check /> Concluída
                        </>
                    ) : (
                        <>
                            <Clock /> Marcar como feita
                        </>
                    )}
                </Button>

                
                <DeleteTaskDialog onDelete={() => onDelete(task.id)} />
            </div>
        </motion.div>
    );
}
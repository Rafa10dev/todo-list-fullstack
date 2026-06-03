import { UseFormReturn } from "react-hook-form";
import { CreateTaskSchema } from "./page";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

type Props = {
    form: UseFormReturn<CreateTaskSchema>;
    onSubmit: (data: CreateTaskSchema) => void;
    isPending: boolean;
}

export const CreateTaskForm = ({ form, onSubmit, isPending }: Props) => {
    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="
                mb-8
                rounded-3xl
                border
                border-cyan-500/10
                bg-card/50
                backdrop-blur-xl
                p-6
                space-y-6
                shadow-lg
            "
        >
            <div className="flex items-center gap-3">

                <div
                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-linear-to-r
                        from-cyan-500
                        via-emerald-500
                        to-violet-500
                    "
                >
                    <PlusCircle className="h-5 w-5 text-white" />
                </div>

                <div>
                    <h3 className="font-bold text-lg">
                        Nova Task
                    </h3>

                    <p className="text-sm text-muted-foreground">
                        Adicione uma nova tarefa à sua lista
                    </p>
                </div>

            </div>

            <FieldGroup>
                <Field>
                    <FieldLabel>Título</FieldLabel>

                    <FieldContent>
                        <Input
                            className="rounded-xl h-12"
                            placeholder="Digite o título da task"
                            {...form.register('title')}
                        />
                    </FieldContent>

                    <FieldDescription>
                        Nome da tarefa
                    </FieldDescription>

                    {form.formState.errors.title && (
                        <FieldError>
                            {form.formState.errors.title.message}
                        </FieldError>
                    )}
                </Field>

                <Field>
                    <FieldLabel>Descrição</FieldLabel>

                    <FieldContent>
                        <Input
                            className="rounded-xl h-12"
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
                disabled={isPending}
                className="
                    w-full
                    h-12
                    rounded-xl
                    bg-linear-to-r
                    from-cyan-500
                    via-emerald-500
                    to-violet-500
                    hover:scale-[1.01]
                    transition-all
                    duration-300
                    shadow-lg
                "
            >
                {isPending
                    ? 'Criando...'
                    : '✨ Criar task'}
            </Button>
        </form>
    );
}
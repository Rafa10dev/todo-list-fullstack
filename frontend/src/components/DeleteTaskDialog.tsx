import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type Props = {
    onDelete: () => void;
};

export const DeleteTaskDialog = ({ onDelete }: Props) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="destructive"
                    size="sm"
                >
                    <Trash2 />
                    Excluir
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Excluir tarefa?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancelar
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={onDelete}
                    >
                        Excluir
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
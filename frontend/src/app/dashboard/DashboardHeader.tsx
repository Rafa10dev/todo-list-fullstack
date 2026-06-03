import { ThemeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import { CheckSquare, LogOut } from "lucide-react";

type DashboardHeaderProps = {
    onLogout: () => void;
};

export const DashboardHeader = ({
    onLogout,
}: DashboardHeaderProps) => {
    return (
        <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/70">
            <div className="container mx-auto flex items-center justify-between py-4">

                <div className="flex items-center gap-3">

                    <div
                        className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-2xl
                            bg-linear-to-br
                            from-cyan-500
                            via-emerald-500
                            to-violet-500
                            shadow-lg
                        "
                    >
                        <CheckSquare className="h-6 w-6 text-white" />
                    </div>

                    <div>
                        <h1
                            className="
                                text-2xl
                                font-bold
                                bg-linear-to-r
                                from-cyan-400
                                via-emerald-400
                                to-violet-500
                                bg-clip-text
                                text-transparent
                            "
                        >
                            TaskFlow
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Organize seu dia com produtividade
                        </p>
                    </div>

                </div>

                <div className="flex items-center gap-3">

                    <ThemeToggle />

                    <Button
                        variant="outline"
                        onClick={onLogout}
                        className="
                            rounded-xl
                            border-red-500/30
                            hover:bg-red-500/10
                        "
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sair
                    </Button>

                </div>

            </div>
        </header>
    );
};
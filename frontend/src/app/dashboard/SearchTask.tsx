import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type Props = {
    search: string;
    setSearch: (value: string) => void;
}

export const SearchTask = ({ search, setSearch }: Props) => {

    return (
        <div className="relative mb-6">

            <Search
                className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    h-4
                    w-4
                    z-10
                    text-muted-foreground
                "
            />

            <Input
                placeholder="Buscar tarefas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                    h-12
                    rounded-xl
                    pl-11
                    bg-card/50
                    backdrop-blur-xl
                    border-white/10
                    focus-visible:ring-cyan-500
                "
            />

        </div>
    );
}
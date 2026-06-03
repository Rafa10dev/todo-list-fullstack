import { Button } from "@/components/ui/button";

type Props = {
  filter: string;
  setFilter: (
    filter: "all" | "completed" | "pending"
  ) => void;
};

export const FilterTask = ({
  filter,
  setFilter,
}: Props) => {
  return (
    <div className="flex gap-2 mb-6">
      <Button
        variant={filter === "all" ? "default" : "outline"}
        onClick={() => setFilter("all")}
      >
        Todas
      </Button>

      <Button
        variant={
          filter === "completed"
            ? "default"
            : "outline"
        }
        onClick={() => setFilter("completed")}
      >
        Concluídas
      </Button>

      <Button
        variant={
          filter === "pending"
            ? "default"
            : "outline"
        }
        onClick={() => setFilter("pending")}
      >
        Pendentes
      </Button>
    </div>
  );
};
import { Skeleton } from "@/components/ui/skeleton";

export const TaskSkeleton = () => {
    return (
        <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
                <div
                    key={index}
                    className="border rounded-2xl p-4 flex items-center justify-between"
                >
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-6 w-48" />

                        <Skeleton className="h-4 w-full max-w-md" />

                        <Skeleton className="h-4 w-24" />
                    </div>

                    <div className="flex gap-2">
                        <Skeleton className="h-9 w-20" />
                        <Skeleton className="h-9 w-24" />
                        <Skeleton className="h-9 w-20" />
                    </div>
                </div>
            ))}
        </div>
    );
};
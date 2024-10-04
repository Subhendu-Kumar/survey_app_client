import { Skeleton } from "../ui/skeleton";

const CardViewSkeleton = () => {
  return (
    <div className="w-full h-auto border border-gray-300 rounded-lg hover:border-purple-500 transition-colors duration-300">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="w-8 h-8 rounded-full bg-purple-200" />
          <Skeleton className="w-32 h-6 rounded bg-purple-200" />
        </div>
        <Skeleton className="w-full h-4 rounded bg-purple-200 mb-4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="w-6 h-6 rounded-full bg-purple-200" />
            <Skeleton className="w-20 h-4 rounded bg-purple-200" />
          </div>
          <Skeleton className="w-20 h-8 rounded bg-purple-200" />
        </div>
      </div>
    </div>
  );
};

export default CardViewSkeleton;

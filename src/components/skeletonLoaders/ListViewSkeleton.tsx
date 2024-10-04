import { Skeleton } from "../ui/skeleton";

const ListViewSkeleton = () => {
  return (
    <div className="w-full h-14 rounded-full bg-purple-50 transition-all duration-300 ease-in-out flex items-center justify-between px-6">
      <div className="flex items-center justify-center gap-2">
        <Skeleton className="w-8 h-8 rounded-full bg-purple-200" />
        <Skeleton className="w-32 h-6 rounded bg-purple-200" />
      </div>
      <Skeleton className="w-48 h-4 rounded bg-purple-200" />
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-1 leading-none">
          <Skeleton className="w-6 h-6 rounded-full bg-purple-200" />
          <Skeleton className="w-24 h-4 rounded bg-purple-200" />
        </div>
        <Skeleton className="w-20 h-8 rounded bg-purple-200" />
      </div>
    </div>
  );
};

export default ListViewSkeleton;

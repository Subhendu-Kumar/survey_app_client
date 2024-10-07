import { Skeleton } from "../ui/skeleton";

const FormHeaderSkeleton = () => {
  return (
    <div className="w-full h-auto bg-purple-100 border-t-8 border-purple-600 rounded-xl p-6">
      <div className="w-full relative h-auto flex items-center justify-start">
        <Skeleton className="w-[95%] h-12" />
      </div>
      <Skeleton className="w-full h-2 mt-2" />
      <div className="w-full relative h-auto flex items-center justify-start mt-3">
        <Skeleton className="w-[95%] h-10" />
      </div>
    </div>
  );
};

export default FormHeaderSkeleton;

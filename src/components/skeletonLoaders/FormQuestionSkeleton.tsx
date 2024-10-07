import { Skeleton } from "@/components/ui/skeleton";

const FormQuestionSkeleton = () => {
  return (
    <div className="w-full h-auto bg-purple-100 cursor-pointer rounded-md p-6 flex items-start justify-start flex-col gap-2">
      <Skeleton className="w-full h-6" />
      <Skeleton className="w-[50%] h-8" />
      <div className="w-full flex flex-col gap-4 mt-5">
        {[1, 2, 3].map((_, idx) => (
          <Skeleton className="w-full h-6" key={idx} />
        ))}
      </div>
    </div>
  );
};

export default FormQuestionSkeleton;

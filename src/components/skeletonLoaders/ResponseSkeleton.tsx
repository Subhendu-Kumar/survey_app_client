import { Skeleton } from "../ui/skeleton";

const ResponseSkeleton = () => {
  return (
    <table className="border border-gray-300 w-full">
      <thead>
        <tr>
          <th className="w-[300px]">
            <Skeleton className="h-10 w-full bg-gray-300" />
          </th>
          <th>
            <Skeleton className="h-10 w-full bg-gray-300" />
          </th>
          <th>
            <Skeleton className="h-10 w-full bg-gray-300" />
          </th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 3 }).map((_, idx) => (
          <tr key={idx}>
            <td>
              <Skeleton className="h-10 w-full bg-gray-300" />
            </td>
            <td>
              <Skeleton className="h-10 w-full bg-gray-300" />
            </td>
            <td>
              <Skeleton className="h-10 w-full bg-gray-300" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResponseSkeleton;

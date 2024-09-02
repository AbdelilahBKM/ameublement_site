import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col items-start justify-center w-full h-screen px-10 gap-4">
      <div className="flex gap-5">
        <Skeleton className="w-[150px] h-[50px]" />
        <Skeleton className="w-[150px] h-[50px]" />
      </div>
      <Skeleton className="w-full h-1/2" />
    </div>
  );
}

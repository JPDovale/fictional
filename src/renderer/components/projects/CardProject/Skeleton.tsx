import { SkeletonBase } from '../../ui/skeletonBase';

export function Skeleton() {
  return (
    <div className="w-full flex flex-col gap-0.5 h-50">
      <SkeletonBase className="min-h-[9.75rem] w-full rounded-tr-lg rounded-tl-lg" />
      <SkeletonBase className="h-full w-full rounded-bl-lg rounded-br-lg py-2 flex gap-1 items-center justify-center border-t border-gray800">
        <SkeletonBase className="h-7 w-7 rounded-full" />
        <SkeletonBase className="h-7 w-7 rounded-full" />
        <SkeletonBase className="h-7 w-7 rounded-full" />
      </SkeletonBase>
    </div>
  );
}

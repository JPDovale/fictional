import { SkeletonBase } from '@rComponents/ui/skeletonBase';

export function EditorSkeleton() {
  return (
    <div className="w-full space-y-0.5 mt-4 mb-2">
      <SkeletonBase className="w-[90%] h-4 rounded-full" />
      <SkeletonBase className="w-[95%] h-4 rounded-full" />
      <SkeletonBase className="w-[90%] h-4 rounded-full" />
    </div>
  );
}

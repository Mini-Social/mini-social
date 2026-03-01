const PostSkeleton = () => (
  <div className="border-border bg-background mx-auto w-full animate-pulse rounded-lg border p-4 shadow-sm">
    <div className="mb-4 flex items-center space-x-3">
      <div className="h-10 w-10 rounded-full bg-gray-300"></div>
      <div className="flex-1 space-y-2 py-1">
        <div className="h-3 w-1/4 rounded bg-gray-300"></div>
        <div className="h-2 w-1/6 rounded bg-gray-200"></div>
      </div>
    </div>

    <div className="mb-4 space-y-3">
      <div className="h-3 w-full rounded bg-gray-300"></div>
      <div className="h-3 w-5/6 rounded bg-gray-300"></div>
      <div className="h-3 w-2/3 rounded bg-gray-300"></div>
    </div>

    <div className="mb-4 h-64 w-full rounded-lg bg-gray-300"></div>

    <div className="flex justify-between pt-2">
      <div className="h-8 w-20 rounded bg-gray-200"></div>
      <div className="h-8 w-20 rounded bg-gray-200"></div>
      <div className="h-8 w-20 rounded bg-gray-200"></div>
    </div>
  </div>
);
export default PostSkeleton;

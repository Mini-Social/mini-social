const UserSearchResultSkeleton = () => (
  <div className="space-y-2">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="flex items-center gap-3 p-2">
        <div className="h-12 w-12 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-4 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
          <div className="h-3 w-1/4 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900"></div>
        </div>
      </div>
    ))}
  </div>
);
export default UserSearchResultSkeleton

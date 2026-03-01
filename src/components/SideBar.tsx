const SidebarSkeleton = () => (
  <div className="space-y-4">
    {/* Box Thông tin */}
    <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-zinc-900">
      <div className="mb-4 h-6 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
      <div className="space-y-4">
        <div className="h-9 w-full animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800"></div>
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-5 w-5 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
            <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800/50"></div>
          </div>
        ))}
      </div>
    </div>

    {/* Box Bạn bè 9 ô vuông */}
    <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <div className="h-6 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
        <div className="h-4 w-16 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800"></div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="aspect-square w-full animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800"></div>
            <div className="mx-auto h-3 w-3/4 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default SidebarSkeleton;

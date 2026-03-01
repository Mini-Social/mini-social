const HeaderSkeleton = () => (
  <div className="w-full bg-white dark:bg-zinc-950">
    <div className="relative aspect-3/1 w-full animate-pulse bg-zinc-200 dark:bg-zinc-800">
      <div className="absolute right-4 bottom-4 flex gap-2">
        <div className="h-9 w-9 rounded-lg bg-zinc-300 dark:bg-zinc-700"></div>
        <div className="h-9 w-9 rounded-lg bg-zinc-300 dark:bg-zinc-700"></div>
      </div>
    </div>
    <div className="relative flex flex-col items-center bg-(--background-primary) pb-8">
      <div className="absolute -top-16 h-32 w-32 rounded-full border-4 border-white bg-white p-1 sm:-top-24 sm:h-40 sm:w-40 dark:border-zinc-950 dark:bg-zinc-800">
        <div className="h-full w-full animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
      </div>
      <div className="mt-20 flex flex-col items-center space-y-3 sm:mt-24">
        <div className="h-7 w-40 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800"></div>
        <div className="h-4 w-24 animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-900"></div>
      </div>
    </div>
  </div>
);
export default HeaderSkeleton;

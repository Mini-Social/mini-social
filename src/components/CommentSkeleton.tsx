const CommentSkeleton = ({ avatarSize }: { avatarSize: number }) => (
  <div className="flex gap-2 py-2 pl-3">
    <div
      className="shrink-0 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800"
      style={{
        width: avatarSize,
        height: avatarSize,
      }}
    ></div>

    <div className="flex flex-1 flex-col gap-1">
      <div className="max-w-[80%] rounded-2xl bg-zinc-100 px-4 py-2 dark:bg-zinc-800/50">
        <div className="mb-2 h-3 w-20 animate-pulse rounded bg-zinc-300 dark:bg-zinc-700"></div>
        <div className="space-y-1.5">
          <div className="h-3 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-700/50"></div>
        </div>
      </div>
    </div>
  </div>
);
export default CommentSkeleton;

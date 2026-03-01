import HeaderSkeleton from '@/components/HeaderSkeleton';
import PostSkeleton from '@/components/PostSkeleton';
import SidebarSkeleton from '@/components/SideBar';

const ProfilePageSkeleton = () => (
  <div className="mx-auto min-h-screen max-w-[1000px] min-w-full bg-zinc-100 lg:min-w-[1000px] dark:bg-black">
    <HeaderSkeleton />

    <div className="mx-auto max-w-6xl px-4 py-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[360px_1fr]">
        <div className="hidden md:block">
          <SidebarSkeleton />
        </div>
        <div className="space-y-4">
          <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-zinc-900">
            <div className="flex gap-3">
              <div className="h-10 w-10 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
              <div className="h-10 flex-1 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800"></div>
            </div>
          </div>

          <PostSkeleton />
          <PostSkeleton />
        </div>
      </div>
    </div>
  </div>
);
export default ProfilePageSkeleton;

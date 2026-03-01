import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import ModelCreatePost from '@/components/ModelCreatePost';
import Posts from '@/components/Posts';
import PostSkeleton from '@/components/PostSkeleton';
import Share from '@/components/Share';
import Stories from '@/components/Stories';
import { useGetPostsQuery } from '@/features/post/post.api.slice';
import type { RootState } from '@/store';

const Home = () => {
  const [openModel, setOpenModel] = useState<string>('');
  const { data, isFetching } = useGetPostsQuery();
  const [activeReaction, setActiveReaction] = useState<string | null>(null);
  const selectPost = useSelector((state: RootState) => state.post.postSelect);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpenEmoj, setIsOpenEmoj] = useState<boolean>(false);
  return (
    <>
      <ModelCreatePost
        key={selectPost?._id}
        openModel={openModel}
        onClose={setOpenModel}
        fileInputRef={fileInputRef}
        isOpenEmoj={isOpenEmoj}
        setIsOpenEmoj={setIsOpenEmoj}
      />

      <div className="min-w-0 md:flex-5 xl:flex-6">
        <div className="py-2.5 md:px-5 lg:px-5 lg:py-2.5 xl:px-17.5 xl:py-5">
          <Stories />
          <Share
            setOpenModel={setOpenModel}
            fileInputRef={fileInputRef}
            setIsOpenEmoj={setIsOpenEmoj}
          />
          {data?.data?.posts && (
            <Posts
              posts={data?.data.posts}
              activeReaction={activeReaction}
              setActiveReaction={setActiveReaction}
              setOpenModel={setOpenModel}
            />
          )}
          {isFetching && <PostSkeleton />}
        </div>
      </div>
    </>
  );
};

export default Home;

import { useState } from 'react';
import { useSelector } from 'react-redux';

import ModelCreatePost from '@/components/ModelCreatePost';
import ModelMessage from '@/components/ModelMessage';
import Posts from '@/components/Posts';
import Share from '@/components/Share';
import Stories from '@/components/Stories';
import { useGetPostsQuery } from '@/features/post/post.api.slice';
import type { RootState } from '@/store';

const Home = () => {
  const [openModel, setOpenModel] = useState<string>('');
  const openModelMessage = useSelector(
    (state: RootState) => state.conversation.conversationId,
  );
  const { data } = useGetPostsQuery();
  const [activeReaction, setActiveReaction] = useState<string | null>(null);
  const selectPost = useSelector((state: RootState) => state.post.postSelect);
  return (
    <>
      <ModelCreatePost
        key={selectPost?._id}
        openModel={openModel}
        onClose={setOpenModel}
      />
      <div className="min-w-0 md:flex-5 xl:flex-6">
        <div className="py-2.5 md:px-5 lg:px-5 lg:py-2.5 xl:px-17.5 xl:py-5">
          <Stories />
          <Share setOpenModel={setOpenModel} />
          {data?.data?.posts && (
            <Posts
              posts={data?.data.posts}
              activeReaction={activeReaction}
              setActiveReaction={setActiveReaction}
              setOpenModel={setOpenModel}
            />
          )}
        </div>
      </div>
      {openModelMessage && <ModelMessage />}
    </>
  );
};

export default Home;

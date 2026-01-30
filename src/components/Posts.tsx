import { useState } from 'react';

import ModelComment from '@/components/ModelComment';
import ModelReaction from '@/components/ModelReaction';
import Post from '@/components/Post';
import type { IPost } from '@/types/type';

interface Props {
  posts: IPost[];
}
const Posts = ({ posts }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeReaction, setActiveReaction] = useState<string | null>(null);
  if (!posts) {
    return null;
  }
  return (
    <>
      {posts.length > 0 &&
        posts.map(post => {
          if (post.visibility !== 'private') {
            return (
              <Post
                key={post._id}
                setIsVisible={setIsVisible}
                setActiveReaction={setActiveReaction}
                post={post}
              />
            );
          }
        })}
      {isVisible && (
        <ModelComment
          setIsVisible={setIsVisible}
          isVisible={isVisible}
          setActiveReaction={setActiveReaction}
        />
      )}
      {activeReaction === 'reaction-model' && (
        <ModelReaction
          activeReaction={activeReaction}
          setActiveReaction={setActiveReaction}
        />
      )}
    </>
  );
};

export default Posts;

import React, { useState } from 'react';

import ModelComment from '@/components/ModelComment';
import ModelReaction from '@/components/ModelReaction';
import Post from '@/components/Post';
import type { IPost } from '@/types/type';

interface Props {
  posts: IPost[];
  activeReaction: string | null;
  setActiveReaction: React.Dispatch<React.SetStateAction<string | null>>;
  isProfileOwner?: boolean;
}
const Posts = ({
  posts,
  activeReaction,
  setActiveReaction,
  isProfileOwner,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  if (!posts) {
    return null;
  }
  return (
    <>
      {posts.length > 0 &&
        isProfileOwner &&
        posts.map(post => (
          <Post
            key={post._id}
            setIsVisible={setIsVisible}
            setActiveReaction={setActiveReaction}
            post={post}
          />
        ))}
      {posts.length > 0 &&
        !isProfileOwner &&
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

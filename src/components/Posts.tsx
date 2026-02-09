import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import ModelComment from '@/components/ModelComment';
import ModelReaction from '@/components/ModelReaction';
import Post from '@/components/Post';
import type { RootState } from '@/store';
import type { IPost } from '@/types/type';

interface Props {
  posts: IPost[];
  activeReaction: string | null;
  setActiveReaction: React.Dispatch<React.SetStateAction<string | null>>;
  isProfileOwner?: boolean;
  setOpenModel?: React.Dispatch<React.SetStateAction<string>>;
}
const Posts = ({
  posts,
  activeReaction,
  setActiveReaction,
  isProfileOwner,
  setOpenModel,
}: Props) => {
  const ownUser = useSelector((state: RootState) => state.auth.user);
  const [isVisible, setIsVisible] = useState(false);
  if (!posts) {
    return null;
  }
  const postSorted = [...posts].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });
  return (
    <>
      {posts.length > 0 &&
        isProfileOwner &&
        postSorted.map(post => (
          <Post
            key={post._id}
            setIsVisible={setIsVisible}
            setActiveReaction={setActiveReaction}
            post={post}
            setOpenModel={setOpenModel}
          />
        ))}
      {posts.length > 0 &&
        !isProfileOwner &&
        postSorted.map(post => {
          if (
            ownUser?._id === post.author._id ||
            post.visibility !== 'private'
          ) {
            return (
              <Post
                key={post._id}
                setIsVisible={setIsVisible}
                setActiveReaction={setActiveReaction}
                post={post}
                setOpenModel={setOpenModel}
              />
            );
          }
        })}
      {isVisible && (
        <ModelComment
          setIsVisible={setIsVisible}
          isVisible={isVisible}
          setActiveReaction={setActiveReaction}
          setOpenModel={setOpenModel}
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

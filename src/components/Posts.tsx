import { useState } from 'react';

import ModelComment from '@/components/ModelComment';
import ModelReaction from '@/components/ModelReaction';
import Post from '@/components/Post';

const posts = [
  {
    _id: 1,
    firstName: 'Nguyễn',
    lastName: 'Công Hiệp',
    avatar:
      'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg',
    createdAt: '2025-12-22T16:02:53.252+00:00',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    images: ['http://localhost:3001/assets/post/1.jpeg'],
    reactions: {
      like: 932,
      love: 0,
      haha: 0,
      wow: 0,
      sad: 0,
      angry: 0,
    },
    visibility: 'public',
  },
  {
    _id: 2,
    firstName: 'Nguyễn',
    lastName: 'Công Hiệp',
    avatar:
      'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg',
    createdAt: '2025-12-22T16:02:53.252+00:00',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    images: [
      'https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    reactions: {
      like: 1000120,
      love: 0,
      haha: 0,
      wow: 0,
      sad: 0,
      angry: 0,
    },
    visibility: 'public',
  },
];

const Posts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeReaction, setActiveReaction] = useState<string | null>(null);
  return (
    <>
      {posts &&
        posts.map(post => (
          <Post
            key={post._id}
            setIsVisible={setIsVisible}
            setActiveReaction={setActiveReaction}
            post={post}
          />
        ))}
      {isVisible && (
        <ModelComment
          post={posts[0]}
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

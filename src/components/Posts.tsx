import { useState } from 'react';

import CommentTree from '@/components/CommentTree';
import ModelComment from '@/components/ModelComment';
import ModelReaction from '@/components/ModelReaction';
import Post from '@/components/Post';

const posts = [
  {
    _id: 1,
    firstName: 'Nguyễn',
    lastName: 'Công Hiệp',
    avatar:
      'https://scontent.fhph4-1.fna.fbcdn.net/v/t39.30808-1/513851649_1268726824695790_4766704651740185785_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_ohc=m-6ktscyxl8Q7kNvwEFTlzs&_nc_oc=Admy3CPyUYx9zO-5UU8OY8YT-LMzOTPl_GtZjqBbx9BeQMUYmIzgumvdsVepMKznF-9LzvYgJdLuGDS7J2tUIcRp&_nc_zt=24&_nc_ht=scontent.fhph4-1.fna&_nc_gid=3ulkjThCxTPxZ2in6b6KYw&oh=00_AfpcNH9dCaL3U0KMtn4LaxKHVJHACvLIFRmxILiwI8YL8g&oe=695EFC80',
    createdAt: '2025-12-22T16:02:53.252+00:00',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    images: [
      'https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
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
      'https://scontent.fhph4-1.fna.fbcdn.net/v/t39.30808-1/513851649_1268726824695790_4766704651740185785_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_ohc=m-6ktscyxl8Q7kNvwEFTlzs&_nc_oc=Admy3CPyUYx9zO-5UU8OY8YT-LMzOTPl_GtZjqBbx9BeQMUYmIzgumvdsVepMKznF-9LzvYgJdLuGDS7J2tUIcRp&_nc_zt=24&_nc_ht=scontent.fhph4-1.fna&_nc_gid=3ulkjThCxTPxZ2in6b6KYw&oh=00_AfpcNH9dCaL3U0KMtn4LaxKHVJHACvLIFRmxILiwI8YL8g&oe=695EFC80',
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
  const [isVisible, setIsVisible] = useState(true);
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

import angry from '@/assets/icons/angry.svg';
import haha from '@/assets/icons/haha.svg';
import like from '@/assets/icons/like.png';
import liked from '@/assets/icons/like.svg';
import love from '@/assets/icons/love.svg';
import sad from '@/assets/icons/sad.svg';
import wow from '@/assets/icons/wow.svg';

export interface PostReactions {
  like: number;
  love: number;
  haha: number;
  wow: number;
  sad: number;
  angry: number;
}

export interface IPost {
  _id: string | number;
  firstName: string;
  lastName: string;
  avatar: string;
  createdAt: string;
  content: string;
  images: string[];
  reactions: PostReactions;
  visibility: string;
}

export type ReactionType =
  | 'default'
  | 'like'
  | 'love'
  | 'haha'
  | 'wow'
  | 'sad'
  | 'angry';
export interface ReactionDetail {
  text: string;
  color: string;
  icon: string;
}

export const reactionStyle: Record<ReactionType, ReactionDetail> = {
  default: {
    text: 'Likes',
    color: 'text-[#65676B]',
    icon: like,
  },
  like: {
    text: 'Liked',
    color: 'text-[#0866ff]',
    icon: liked,
  },
  love: {
    text: 'Love',
    color: 'text-[#f33e58]',
    icon: love,
  },
  haha: {
    text: 'Haha',
    color: 'text-[#f7b125]',
    icon: haha,
  },
  wow: {
    text: 'Wow',
    color: 'text-[#f7b125]',
    icon: wow,
  },
  sad: {
    text: 'Sad',
    color: 'text-[#f7b125]',
    icon: sad,
  },
  angry: {
    text: 'Angry',
    color: 'text-[#e9710f]',
    icon: angry,
  },
};

export interface User {
  name: string;
  avatar: string;
}
export interface CommentType {
  _id: string;
  user: User;
  content: string;
  createdAt: string;
  replies: CommentType[];
}
export interface Message {
  _id: string;
  conversationId: string;
  sender: string;
  content: string;
  readBy: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

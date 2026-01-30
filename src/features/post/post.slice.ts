import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface IPost {
  id: string;
  content?: string;
  author: string;
  images?: string[];
  reactions?: {
    like: number;
    love: number;
    haha: number;
    wow: number;
    sad: number;
    angry: number;
  };
  userReactions?: [
    {
      userId: string;
      reaction: string;
      reactionAt: Date;
    },
  ];
  visibility: 'public' | 'private' | 'friends';
  shares?: [
    {
      userId: string;
      sharePostId: string;
      shareAt: Date;
    },
  ];
  sharePostId?: string | null;
  deleted?: boolean;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
type initialStateType = {
  postId: string;
  selectPostId: string;
};
const initialState: initialStateType = {
  postId: '',
  selectPostId: '',
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    startEditPost: (state, action: PayloadAction<string>) => {
      state.postId = action.payload;
    },
    stopEditPost: state => {
      state.postId = '';
    },
    selectPost: (state, action: PayloadAction<string>) => {
      state.selectPostId = action.payload;
    },
    unSelectPost: state => {
      state.selectPostId = '';
    },
  },
});

export const { startEditPost, stopEditPost, selectPost, unSelectPost } =
  postSlice.actions;
export default postSlice.reducer;

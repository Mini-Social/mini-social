import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import apiSlice from '@/app/api.slice';
import authReducer from '@/features/auth/auth.slice';
import commentReducer from '@/features/comment/comment.slice';
import conversationReducer from '@/features/conversation/conversation.slice';
import postReducer from '@/features/post/post.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    post: postReducer,
    comment: commentReducer,
    conversation: conversationReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const UseAppDispatch = () => useDispatch<AppDispatch>();

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import authReducer from '@/features/auth/auth.slice';
import commentApi from '@/features/comment/comment.service';
import postApi from '@/features/post/post.service';
import postReducer from '@/features/post/post.slice';
import userApi from '@/features/user/user.service';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    [postApi.reducerPath]: postApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      postApi.middleware,
      userApi.middleware,
      commentApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const UseAppDispatch = () => useDispatch<AppDispatch>();

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import {
  checkAuth,
  logOut,
  signInThunk,
  signUpThunk,
} from '@/features/auth/auth.api.slice';
import { type IUser } from '@/types/user.type';

type initialStateType = {
  user: IUser | null;
  isLoading: boolean;
  isAuthChecked: boolean;
};
const initialState: initialStateType = {
  user: null,
  isLoading: false,
  isAuthChecked: false,
};
type responseType = {
  status: string;
  data: {
    user: IUser;
    token: string;
  };
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredential: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        signInThunk.fulfilled,
        (state, action: PayloadAction<responseType>) => {
          state.user = action.payload.data.user;
        },
      )
      .addCase(
        signUpThunk.fulfilled,
        (state, action: PayloadAction<responseType>) => {
          state.user = action.payload.data.user;
        },
      )
      .addCase(checkAuth.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        checkAuth.fulfilled,
        (state, action: PayloadAction<responseType>) => {
          state.user = action.payload.data.user;
          state.isLoading = false;
          state.isAuthChecked = true;
        },
      )
      .addCase(checkAuth.rejected, state => {
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = null;
      })
      .addCase(logOut.rejected, state => {
        state.user = null;
      });
  },
});
export const { setCredential } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { checkAuth, logOut, signInThunk, signUpThunk } from '@/features/auth.api.slice';

export interface IUser {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string | undefined;
  avatar: string | null;
  bio: string | null;
  gender: string;
  phone: string | null;
  birthDate: string | null;
  role: 'Admin' | 'User';
  friends: IUser;
  isOnline: boolean;
  lastOnline: Date | null;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
type initialStateType = {
 auth: {
  user: IUser | null;
  isLoading: boolean;
  isAuthChecked: boolean
 }
};
const initialState: initialStateType = {
  auth: {
    user: null,
    isLoading: false,
    isAuthChecked: false
  }

};
type responseType = {
  status: string,
  data: {
    user: IUser,
    token: string
  }
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredential: (state, action: PayloadAction<IUser>) => {
      state.auth.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signInThunk.fulfilled, (state, action: PayloadAction<responseType>) => {
        state.auth.user = action.payload.data.user;
      })
      .addCase(signUpThunk.fulfilled, (state, action: PayloadAction<responseType>) => {
        state.auth.user = action.payload.data.user;
      })
      .addCase(checkAuth.pending, (state) => {
        state.auth.isLoading = true
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<responseType>) => {
        state.auth.user = action.payload.data.user;
        state.auth.isLoading = false;
        state.auth.isAuthChecked = true
      })
      .addCase(checkAuth.rejected, (state) => {
        state.auth.isLoading = false
        state.auth.isAuthChecked = true
      })
      .addCase(logOut.fulfilled, (state) => {
        state.auth.user = null;
      })
      .addCase(logOut.rejected, (state) => {
        state.auth.user = null;
      })
  },
});
export const { setCredential } = authSlice.actions;
export default authSlice.reducer;

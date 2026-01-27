import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import http from '@/http';
import { formSchema } from '@/types/auth.type';

import type z from 'zod';

export const signInThunk = createAsyncThunk(
  'auth/signin',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI,
  ) => {
    try {
      const res = await http.post(
        '/v1/user/sign-in',
        {
          email,
          password,
        },
        {
          signal: thunkAPI.signal,
        },
      );
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.name === 'AxiosError' && error.response?.status === 401) {
          return thunkAPI.rejectWithValue(error.response.data);
        }
      }
      throw error;
    }
  },
);
export const signUpThunk = createAsyncThunk(
  'auth/signup',
  async (body: z.infer<typeof formSchema>, thunkAPI) => {
    try {
      const res = await http.post('/v1/user/sign-up', body, {
        signal: thunkAPI.signal,
      });
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.name === 'AxiosError' && error.response?.status === 400) {
          return thunkAPI.rejectWithValue(error.response.data);
        }
      }
      throw error;
    }
  },
);
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, thunkAPI) => {
    const res = await http.get('/v1/user/checkAuth', {
      signal: thunkAPI.signal,
    });
    return res.data;
  },
);
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const res = await http.post('/v1/user/logout', {
      signal: thunkAPI.signal,
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.name === 'AxiosError' && error.response?.status === 401) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
    throw error;
  }
})

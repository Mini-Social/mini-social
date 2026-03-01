import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: [
    'User',
    'Posts',
    'Comments',
    'Messages',
    'FriendRequest',
    'Friends',
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL || 'http://localhost:8080'}/v1/`,
  }),
  endpoints: () => ({}),
});

export default apiSlice;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const postApi = createApi({
  reducerPath: 'posts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/v1/post/',
    credentials: 'include',
  }),
  endpoints: () => ({}),
});

export default postApi;

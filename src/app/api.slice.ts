import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['User', 'Posts'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/v1/' }),
  endpoints: () => ({}),
});

export default apiSlice;

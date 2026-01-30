import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/v1/user/',
    credentials: 'include',
  }),
  endpoints: () => ({}),
});

export default userApi;

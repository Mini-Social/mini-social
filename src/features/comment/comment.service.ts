import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const commentApi = createApi({
  reducerPath: 'comment',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/v1/comment' }),
  endpoints: () => ({}),
});
export default commentApi;

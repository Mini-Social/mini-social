import apiSlice from '@/app/api.slice';
import { type IPost } from '@/types/type';

export const postApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getPosts: build.query<
      {
        status: string;
        data: {
          posts: IPost[];
        };
      },
      void
    >({
      query: () => ({
        url: 'post/getAllPost',
        credentials: 'include',
      }),
    }),
    getDetailPost: build.query<
      { status: string; data: { post: IPost } },
      string
    >({
      query: id => ({
        url: `post/getPost/${id}`,
        credentials: 'include',
      }),
    }),
    getPostByUserId: build.query<
      { status: string; data: { posts: IPost[] } },
      string
    >({
      query: userId => ({
        url: `post/getPostByUserId/${userId}`,
        credentials: 'include',
      }),
      providesTags: (_, __, userId) => [
        {
          type: 'Posts' as const,
          id: userId,
        },
      ],
    }),
  }),
});
export const {
  useGetPostsQuery,
  useGetDetailPostQuery,
  useGetPostByUserIdQuery,
} = postApi;

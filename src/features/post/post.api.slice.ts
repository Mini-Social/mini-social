import postService from './post.service';
import { type IPost } from '@/types/type';

export const postApi = postService.injectEndpoints({
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
      query: () => 'getAllPost',
    }),
    getDetailPost: build.query<
      { status: string; data: { post: IPost } },
      string
    >({
      query: id => `getPost/${id}`,
    }),
    getPostByUserId: build.query<
      { status: string; data: { posts: IPost[] } },
      string
    >({
      query: userId => `getPostByUserId/${userId}`,
    }),
  }),
});
export const {
  useGetPostsQuery,
  useGetDetailPostQuery,
  useGetPostByUserIdQuery,
} = postApi;

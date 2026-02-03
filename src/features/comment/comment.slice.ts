import apiSlice from '@/app/api.slice';
import type { IComment } from '@/types/comment.type';

const commentApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCommentsByPostId: builder.query<
      {
        status: string;
        length: number;
        data: {
          comments: IComment[];
        };
      },
      string
    >({
      query: postId => ({
        url: `comment/getComments/${postId}`,
        credentials: 'include',
      }),
    }),
    getCommentsReplies: builder.query<
      {
        status: string;
        length: number;
        data: {
          repliesComments: IComment[];
        };
      },
      string
    >({
      query: parentCommentId => ({
        url: `comment/getCommentsReplies/${parentCommentId}`,
        credentials: 'include',
      }),
    }),
  }),
});
export const { useGetCommentsByPostIdQuery, useGetCommentsRepliesQuery } =
  commentApi;
export default commentApi.reducer;

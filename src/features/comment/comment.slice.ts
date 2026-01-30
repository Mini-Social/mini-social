import commentService from '@/features/comment/comment.service';
import type { IComment } from '@/types/comment.type';

const commentApi = commentService.injectEndpoints({
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
      query: postId => `/getComments/${postId}`,
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
      query: parentCommentId => `/getCommentsReplies/${parentCommentId}`,
    }),
  }),
});
export const { useGetCommentsByPostIdQuery, useGetCommentsRepliesQuery } =
  commentApi;
export default commentApi.reducer;

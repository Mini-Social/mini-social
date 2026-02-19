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
      providesTags: (result, __, postId) =>
        result
          ? [
              ...result.data.comments.map(c => ({
                type: 'Comments' as const,
                id: c._id,
              })),
              {
                type: 'Comments' as const,
                id: postId,
              },
            ]
          : [
              {
                type: 'Comments' as const,
                id: 'LIST',
              },
            ],
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
      providesTags: (result, __, parentCommentId) =>
        result
          ? [
              ...result.data.repliesComments.map(c => ({
                type: 'Comments' as const,
                id: c._id,
              })),
              {
                type: 'Comments' as const,
                id: parentCommentId,
              },
            ]
          : [
              {
                type: 'Comments' as const,
                id: 'LIST',
              },
            ],
    }),
    addComment: builder.mutation<
      { data: { comment: IComment } },
      { postId: string; parentCommentId: string | null; content: string }
    >({
      query: body => ({
        url: `comment/addComment/${body.postId}`,
        method: 'POST',
        credentials: 'include',
        body,
      }),
      invalidatesTags: (_, __, { postId, parentCommentId }) => {
        const tags: Array<{ type: 'Comments' | 'Posts'; id: string }> = [
          {
            type: 'Posts' as const,
            id: postId,
          },
        ];

        if (parentCommentId) {
          tags.push({
            type: 'Comments' as const,
            id: parentCommentId,
          });
        } else {
          tags.push({
            type: 'Comments' as const,
            id: postId,
          });
        }

        return tags;
      },
    }),
    reactionComment: builder.mutation<
      { data: { comment: IComment } },
      {
        commentId: string;
        action: string;
        postId?: string;
        parentCommentId?: string;
      }
    >({
      query: ({ commentId, action }) => ({
        url: `/comment/reactions/${commentId}/${action}`,
        method: 'PUT',
        credentials: 'include',
      }),
      onQueryStarted: async (
        { commentId, postId, parentCommentId },
        { dispatch, queryFulfilled },
      ) => {
        try {
          const { data: updateComment } = await queryFulfilled;
          if (postId) {
            dispatch(
              commentApi.util.updateQueryData(
                'getCommentsByPostId',
                postId,
                draft => {
                  const index = draft.data.comments.findIndex(
                    c => c._id === commentId,
                  );
                  if (index !== -1) {
                    draft.data.comments[index].reactions =
                      updateComment.data.comment.reactions;
                    draft.data.comments[index].userReactions =
                      updateComment.data.comment.userReactions;
                  }
                },
              ),
            );
          }
          if (parentCommentId) {
            dispatch(
              commentApi.util.updateQueryData(
                'getCommentsReplies',
                parentCommentId,
                draft => {
                  const index = draft.data.repliesComments.findIndex(
                    c => c._id === commentId,
                  );
                  if (index !== -1) {
                    draft.data.repliesComments[index].reactions =
                      updateComment.data.comment.reactions;
                    draft.data.repliesComments[index].userReactions =
                      updateComment.data.comment.userReactions;
                  }
                },
              ),
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
      //  invalidatesTags: (_, __, { commentId }) => [
      //   {
      //     type: 'Comments' as const,
      //     id: commentId,
      //   },
      // ],
    }),
    updateComment: builder.mutation<
      { data: { comment: IComment } },
      {
        postId: string;
        commentId: string;
        parentCommentId: string | null;
        content: string;
      }
    >({
      query: body => ({
        url: `comment/updateComment/${body.commentId}`,
        method: 'PUT',
        credentials: 'include',
        body,
      }),
      // invalidatesTags: (_, __, {postId, parentCommentId }) => {
      //   const tags: Array<{ type: 'Comments' | 'Posts'; id: string }> = [
      //     {
      //       type: 'Posts' as const,
      //       id: postId,
      //     },
      //   ];

      //   if (parentCommentId) {
      //     tags.push({
      //       type: 'Comments' as const,
      //       id: parentCommentId,
      //     });
      //   } else {
      //     tags.push({
      //       type: 'Comments' as const,
      //       id: postId,
      //     });
      //   }

      //   return tags;
      // },
      onQueryStarted: async (
        { commentId, postId, parentCommentId },
        { dispatch, queryFulfilled },
      ) => {
        try {
          const { data: updateComment } = await queryFulfilled;
          if (postId) {
            dispatch(
              commentApi.util.updateQueryData(
                'getCommentsByPostId',
                postId,
                draft => {
                  const index = draft.data.comments.findIndex(
                    c => c._id === commentId,
                  );
                  if (index !== -1) {
                    draft.data.comments[index] = updateComment.data.comment;
                  }
                },
              ),
            );
          }
          if (parentCommentId) {
            dispatch(
              commentApi.util.updateQueryData(
                'getCommentsReplies',
                parentCommentId,
                draft => {
                  console.log(draft.data.repliesComments);
                  const index = draft.data.repliesComments.findIndex(
                    c => c._id === commentId,
                  );
                  if (index !== -1) {
                    draft.data.repliesComments[index] =
                      updateComment.data.comment;
                  }
                },
              ),
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
     deleteComment: builder.mutation<
      { data: { comment: IComment } },
      {
        commentId: string,
        postId: string,
        parentCommentId: string
      }
    >({
      query: body => ({
        url: `comment/deleteComment/${body.commentId}`,
        method: 'DELETE',
        credentials: 'include',
        body,
      }),
      // invalidatesTags: (_, __, { postId, parentCommentId }) => {
      //   const tags: Array<{ type: 'Comments' | 'Posts'; id: string }> = [
      //     {
      //       type: 'Posts' as const,
      //       id: postId,
      //     },
      //   ];

      //   if (parentCommentId) {
      //     tags.push({
      //       type: 'Comments' as const,
      //       id: parentCommentId,
      //     });
      //   } else {
      //     tags.push({
      //       type: 'Comments' as const,
      //       id: postId,
      //     });
      //   }

      //   return tags;
      // },
      onQueryStarted: async (
        { commentId, postId, parentCommentId },
        { dispatch, queryFulfilled },
      ) => {
        try {
          const { data: deletedComment } = await queryFulfilled;
          if (postId) {
            dispatch(
              commentApi.util.updateQueryData(
                'getCommentsByPostId',
                postId,
                draft => {
                  const index = draft.data.comments.findIndex(
                    c => c._id === commentId,
                  );
                  if (index !== -1) {
                    draft.data.comments[index] = deletedComment.data.comment;
                  }
                },
              ),
            );
          }
          if (parentCommentId) {
            console.log(parentCommentId)
            dispatch(
              commentApi.util.updateQueryData(
                'getCommentsReplies',
                parentCommentId,
                draft => {
                  const index = draft.data.repliesComments.findIndex(
                    c => c._id === commentId,
                  );
                  if (index !== -1) {
                    draft.data.repliesComments[index] =
                      deletedComment.data.comment;
                  }
                },
              ),
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});
export const {
  useGetCommentsByPostIdQuery,
  useGetCommentsRepliesQuery,
  useAddCommentMutation,
  useReactionCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation
} = commentApi;
export default commentApi.reducer;

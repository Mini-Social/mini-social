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
      providesTags: result =>
        result
          ? [
              ...result.data.posts.map(({ _id }) => ({
                type: 'Posts' as const,
                id: _id,
              })),
              {
                type: 'Posts' as const,
                id: 'LIST',
              },
            ]
          : [
              {
                type: 'Posts' as const,
                id: 'LIST',
              },
            ],
    }),
    getDetailPost: build.query<
      { status: string; data: { post: IPost } },
      string
    >({
      query: id => ({
        url: `post/getPost/${id}`,
        credentials: 'include',
      }),
      providesTags: (_, __, id) => [
        {
          type: 'Posts' as const,
          id,
        },
      ],
    }),
    getPostByUserId: build.query<
      { status: string; data: { posts: IPost[] } },
      string
    >({
      query: userId => ({
        url: `post/getPostByUserId/${userId}`,
        credentials: 'include',
      }),
      providesTags: (result, __, userId) =>
        result
          ? [
              ...result.data.posts.map(({ _id }) => ({
                type: 'Posts' as const,
                id: _id,
              })),
              {
                type: 'Posts' as const,
                id: userId,
              },
              {
                type: 'Posts' as const,
                id: 'LIST',
              },
            ]
          : [
              {
                type: 'Posts' as const,
                id: 'LIST',
              },
            ],
    }),
    addPost: build.mutation<
      {
        status: string;
        data: {
          post: IPost;
        };
      },
      object
    >({
      query: body => ({
        url: 'post/addPost',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      invalidatesTags: () => [
        {
          type: 'Posts' as const,
          id: 'LIST',
        },
      ],
      // onQueryStarted: async (agr, { dispatch, queryFulfilled }) => {
      //   try {
      //     const { data: createdPost } = await queryFulfilled;
      //     dispatch(
      //       postApi.util.updateQueryData('getPosts', undefined, draft => {
      //         if (Array.isArray(draft.data.posts)) {
      //           draft.data.posts.unshift(createdPost.data.post);
      //         }
      //       }),
      //     );
      //   } catch (error) {
      //     console.error('Lỗi cập nhật cache:', error);
      //   }
      // },
    }),
    updatePost: build.mutation<
      {
        status: string;
        data: {
          post: IPost;
        };
      },
      { id: string; body?: FormData }
    >({
      query: data => ({
        url: `post/updatePost/${data.id}`,
        method: 'PUT',
        body: data.body,
        credentials: 'include',
      }),
      invalidatesTags: (_, __, { id }) => [
        {
          type: 'Posts' as const,
          id,
        },
      ],
      // onQueryStarted: async (agr, { dispatch, queryFulfilled }) => {
      //   try {
      //     const { data: updatePost } = await queryFulfilled;
      //     dispatch(
      //       postApi.util.updateQueryData('getPosts', undefined, (draft) => {
      //         if (Array.isArray(draft.data.posts)) {
      //           const index = draft.data.posts.findIndex(post => post._id === agr.id)
      //           draft.data.posts[index] = updatePost.data.post
      //         }
      //       }),
      //     );
      //   } catch (error) {
      //     console.error('Lỗi cập nhật cache:', error);
      //   }
      // },
    }),
    deletePost: build.mutation<
      {
        status: string;
        data: {
          post: IPost;
        };
      },
      string
    >({
      query: id => ({
        url: `post/deletePost/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: (_, __, id) => [
        {
          type: 'Posts' as const,
          id,
        },
        {
          type: 'Posts' as const,
          id: 'LIST',
        },
      ],
      // onQueryStarted: async (agr, { dispatch, queryFulfilled }) => {
      //   try {
      //     await queryFulfilled;
      //     dispatch(
      //       postApi.util.updateQueryData('getPosts', undefined, (draft) => {
      //         if (Array.isArray(draft.data.posts)) {
      //           draft.data.posts = draft.data.posts.filter(post => post._id !== agr)
      //         }
      //       }),
      //     );
      //   } catch (error) {
      //     console.error('Lỗi cập nhật cache:', error);
      //   }
      // },
    }),
    reactionPost: build.mutation<
      { status: string; data: { post: IPost } },
      { postId: string; action: string }
    >({
      query: ({ postId, action }) => ({
        url: `post/reactions/${postId}/${action}`,
        method: 'PUT',
        credentials: 'include',
      }),
      invalidatesTags: (_, __, { postId }) => [
        {
          type: 'Posts' as const,
          id: postId,
        },
        {
          type: 'Posts' as const,
          id: 'LIST',
        },
      ],
      onQueryStarted: async (agr, { dispatch, queryFulfilled }) => {
        try {
          const { data: updatePost } = await queryFulfilled;
          dispatch(
            postApi.util.updateQueryData('getPosts', undefined, draft => {
              const index = draft.data.posts.findIndex(
                post => post._id === agr.postId,
              );
              draft.data.posts[index] = updatePost.data.post;
            }),
          );
        } catch (error) {
          console.error('Lỗi cập nhật cache:', error);
        }
      },
    }),
  }),
});
export const {
  useGetPostsQuery,
  useGetDetailPostQuery,
  useGetPostByUserIdQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useReactionPostMutation,
} = postApi;

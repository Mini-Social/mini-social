import apiSlice from '@/app/api.slice';
import { type IUser } from '@/types/user.type';

const useApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getUserByUserName: build.query<
      {
        message: string;
        data: IUser;
      },
      string
    >({
      query: userName => ({
        url: `user/getUserByUserName/${userName}`,
        credentials: 'include',
      }),
      providesTags: result => {
        if (result?.data) {
          const final = [
            {
              type: 'User' as const,
              id: result.data._id,
            },
            {
              type: 'User' as const,
              id: 'LIST',
            },
          ];
          return final;
        }
        return [
          {
            type: 'User' as const,
            id: 'LIST',
          },
        ];
      },
    }),
    updateProfile: build.mutation<{ status: string; data: IUser }, object>({
      query: body => ({
        url: 'user/update-profile',
        method: 'PUT',
        credentials: 'include',
        body,
      }),
      invalidatesTags: result => [
        {
          type: 'User' as const,
          id: result?.data._id,
        },
        {
          type: 'Posts' as const,
          id: result?.data._id,
        },
      ],
    }),
    updatePassword: build.mutation<{ message: string }, object>({
      query: body => ({
        url: 'user/update-password',
        method: 'PUT',
        body,
        credentials: 'include',
      }),
      //       invalidatesTags: (result) => [{
      // type: 'User' as const, id: 'LIST'
      // }]
    }),
    getSuggestion: build.query<
      {
        message: string;
        data: IUser[];
      },
      void
    >({
      query: () => ({
        url: `user/getSuggestion`,
        credentials: 'include',
      }),
    }),
    getFriendsList: build.query<
      {
        message: string;
        data: {
          _id: string;
          userName: string;
          firstName: string;
          lastName: string;
          avatar: string;
        }[];
      },
      void
    >({
      query: () => ({
        url: `user/getFriendsList`,
        credentials: 'include',
      }),
      providesTags: ['Friends'],
    }),
     getSearchUsers: build.query<
      {
        data: {
          _id: string;
          userName: string;
          firstName: string;
          lastName: string;
          avatar: string;
        }[];
      },
      string
    >({
      query: (query) => ({
        url: `user/searchUsers?q=${query}`,
        credentials: 'include',
      }),
    }),
    getHistory: build.query<
      {
        data: {
          searchedUser: {
             _id: string;
          userName: string;
          firstName: string;
          lastName: string;
          avatar: string;
          }
        }[];
      },
      void
    >({
      query: () => ({
        url: `user/getHistory`,
        credentials: 'include',
      }),
    }),
    addToHistory: build.mutation<{ message: string }, string>({
      query: (searchedUserId) => ({
        url: 'user/addToHistory',
        method: 'POST',
        body: {searchedUserId},
        credentials: 'include',
      })
    }),
    removeHistory: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `user/removeHistory/${id}` ,
        method: 'DELETE',
        credentials: 'include',
      })
    })
  }),
});
export default useApi;
export const {
  useGetUserByUserNameQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useGetSuggestionQuery,
  useGetFriendsListQuery,
  useGetSearchUsersQuery,
  useAddToHistoryMutation,
  useRemoveHistoryMutation,
  useGetHistoryQuery
} = useApi;

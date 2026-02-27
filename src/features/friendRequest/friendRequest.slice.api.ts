import apiSlice from '@/app/api.slice';
import type { IFriendRequest } from '@/types/friendRequest.type';

const friendRequestApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getFriendRequests: builder.query<{ data: IFriendRequest[] }, void>({
      query: () => ({
        url: `friend-requests/get-requests`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: result =>
        result?.data.map(request => ({
          type: 'FriendRequest' as const,
          id: request._id,
        })) || [
          {
            type: 'FriendRequest' as const,
            id: 'LIST',
          },
        ],
    }),
    getSentFriendRequests: builder.query<{ data: IFriendRequest[] }, void>({
      query: () => ({
        url: `friend-requests/get-sent-requests`,
        method: 'GET',
        credentials: 'include',
      }),
    }),
    sendFriendRequest: builder.mutation<{ data: IFriendRequest }, string>({
      query: receiverId => ({
        url: `friend-requests/send-request/${receiverId}`,
        method: 'POST',
        credentials: 'include',
      }),
    }),
    acceptFriendRequest: builder.mutation<
      { status: string; message: string; data: IFriendRequest },
      string
    >({
      query: requestId => ({
        url: `friend-requests/accept-request/${requestId}`,
        method: 'PUT',
        credentials: 'include',
      }),
      invalidatesTags: (_, __, requestId) => [
        {
          type: 'FriendRequest' as const,
          id: requestId,
        },
        {
          type: 'FriendRequest' as const,
          id: 'LIST',
        },
      ],
    }),
    rejectFriendRequest: builder.mutation<
      { status: string; message: string },
      string
    >({
      query: requestId => ({
        url: `friend-requests/refused-request/${requestId}`,
        method: 'PUT',
        credentials: 'include',
      }),
      invalidatesTags: (_, __, requestId) => [
        {
          type: 'FriendRequest' as const,
          id: requestId,
        },
        {
          type: 'FriendRequest' as const,
          id: 'LIST',
        },
      ],
    }),
    cancelFriendRequest: builder.mutation<
      { status: string; message: string; data: IFriendRequest },
      string
    >({
      query: requestId => ({
        url: `friend-requests/cancel-request/${requestId}`,
        method: 'PUT',
        credentials: 'include',
      }),
      invalidatesTags: (_, __, requestId) => [
        {
          type: 'FriendRequest' as const,
          id: requestId,
        },
        {
          type: 'FriendRequest' as const,
          id: 'LIST',
        },
      ],
    }),
  }),
});

export const {
  useGetFriendRequestsQuery,
  useCancelFriendRequestMutation,
  useGetSentFriendRequestsQuery,
  useAcceptFriendRequestMutation,
  useRejectFriendRequestMutation,
  useSendFriendRequestMutation,
} = friendRequestApi;

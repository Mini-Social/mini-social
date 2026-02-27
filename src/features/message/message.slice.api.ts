import apiSlice from '@/app/api.slice';
import type { IConversation } from '@/types/conversation.type';
import type { IMessage } from '@/types/message.type';

const messageApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getMessages: build.query<
      {
        status: string;
        nextCursor: Date | null;
        messages: IMessage[];
        conversation: IConversation;
      },
      string
    >({
      query: conversationId => ({
        url: `conversation/${conversationId}/messages`,
        credentials: 'include',
      }),
      //           providesTags: (_, __, conversationId) => [{
      //  type: 'Messages' as const, id: conversationId
      // }],
    }),
    sendPrivateMessage: build.mutation<
      {
        status: string;
        data: {
          message: IMessage;
        };
      },
      FormData
    >({
      query: body => ({
        url: `message/sendPrivate`,
        method: 'POST',
        body,
        credentials: 'include',
      }),
      //       invalidatesTags: (result) => [
      //     {
      //  type: 'Messages' as const, id: result?.data.message.conversationId
      // }
      //   ],
      // onQueryStarted: async(_, { dispatch, queryFulfilled }) => {
      //   try {
      //     const { data } = await queryFulfilled
      //     dispatch(messageApi.util.updateQueryData('getMessages', data.data.message.conversationId, draft => {
      //       draft.messages.push(data.data.message)
      //     }))
      //   } catch (error) {
      //     console.log(error)
      //   }
      // }
    }),
    seenMessage: build.mutation<{ status: string; message: string }, string>({
      query: conversationId => ({
        url: `message/seenMessage/${conversationId}`,
        method: 'PUT',
        credentials: 'include',
      }),
      invalidatesTags: [
        {
          type: 'Messages' as const,
          id: 'LIST',
        },
      ],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useSendPrivateMessageMutation,
  useSeenMessageMutation,
} = messageApi;

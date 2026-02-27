import apiSlice from '@/app/api.slice';
import type { IConversation } from '@/types/conversation.type';
import type { IMessage } from '@/types/message.type';

const conversationApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getConversations: build.query<
      {
        status: string;
        length: number;
        data: {
          conversations: IConversation[];
        };
      },
      void
    >({
      query: () => ({
        url: `conversation`,
        credentials: 'include',
      }),
      providesTags: [
        {
          type: 'Messages' as const,
          id: 'LIST',
        },
      ],
    }),
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
    }),
    createPrivateConversation: build.mutation<
      {
        status: string;
        data: {
          conversation: IConversation;
        };
      },
      string
    >({
      query: userId => ({
        url: `conversation/createPrivate/${userId}`,
        method: 'POST',
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useCreatePrivateConversationMutation,
} = conversationApi;

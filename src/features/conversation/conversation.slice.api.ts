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
  }),
});

export const { useGetConversationsQuery, useGetMessagesQuery } =
  conversationApi;

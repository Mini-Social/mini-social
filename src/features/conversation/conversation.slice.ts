import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  conversationId: string;
};

const initialState: initialStateType = {
  conversationId: '',
};

const conversationSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    startConversation: (state, action: PayloadAction<string>) => {
      state.conversationId = action.payload;
    },
    closeConversation: state => {
      state.conversationId = '';
    },
  },
});
export const { startConversation, closeConversation } =
  conversationSlice.actions;
export default conversationSlice.reducer;

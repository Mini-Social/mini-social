import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  isOpenEdit: string;
  editCommentModel: {
    commentId: string;
    parentCommentId: string;
    content: string;
  };
  deleteCommentId: {
    commentId: string;
    parentCommentId: string
  }
};
const initialState: initialStateType = {
  isOpenEdit: '',
  editCommentModel: {
    commentId: '',
    parentCommentId: '',
    content: '',
  },
  deleteCommentId: {
    commentId: '',
    parentCommentId: '',
  }
};
const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: () => ({
    startOpenModel: (state, action: PayloadAction<string>) => {
      state.isOpenEdit = action.payload;
    },
    startEditComment: (
      state,
      action: PayloadAction<{
        postId: string;
        commentId: string;
        parentCommentId: string;
        content: string;
      }>,
    ) => {
      state.editCommentModel = {
        ...action.payload,
      };
    },
    closeEditComment: state => {
      state.isOpenEdit = '';
      state.editCommentModel = {
        commentId: '',
        parentCommentId: '',
        content: '',
      };
    },
    startDeleteComment: (state, action: PayloadAction<{commentId: string;
    parentCommentId: string}>) => {
        state.deleteCommentId.commentId = action.payload.commentId
        state.deleteCommentId.parentCommentId = action.payload.parentCommentId
    },
    closeDeleteComment: (state) => {
      state.deleteCommentId.commentId = ''
      state.deleteCommentId.parentCommentId = ''
    }
  }),
});
export const { startEditComment, closeEditComment, startOpenModel, startDeleteComment, closeDeleteComment } =
  commentSlice.actions;
export default commentSlice.reducer;

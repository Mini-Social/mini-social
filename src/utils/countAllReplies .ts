import type { CommentType } from '@/types/type';

export const countAllReplies = (comment: CommentType): number => {
  if (comment.replies.length === 0) {
    return 0;
  }
  return comment.replies.reduce(
    (total, reply) => total + 1 + countAllReplies(reply),
    0,
  );
};

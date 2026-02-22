import {
  startDeleteComment,
  startEditComment,
} from '@/features/comment/comment.slice';
import { UseAppDispatch } from '@/store';
import type { IComment } from '@/types/comment.type';

const ModelCommentEdit = ({
  comment,
  ref,
}: {
  comment: IComment;
  ref: React.RefObject<HTMLDivElement | null>;
}) => {
  const dispatch = UseAppDispatch();

  return (
    <div
      ref={ref}
      className="absolute top-full right-0 z-999999 flex min-w-max flex-col items-start justify-center gap-1 rounded-md bg-(--background-primary) p-1 shadow-md"
      onClick={e => e.stopPropagation()}
    >
      <button
        className="border-none! bg-(--background-primary)! text-[13px]! font-bold!"
        onClick={() => {
          dispatch(
            startEditComment({
              postId: comment.postId,
              commentId: comment._id,
              content: comment.content,
              parentCommentId: String(comment.parentCommentId),
            }),
          );
        }}
      >
        Sửa
      </button>
      <button
        className="border-none! bg-(--background-primary)! text-[13px]! font-bold!"
        onClick={() => {
          dispatch(
            startDeleteComment({
              commentId: comment._id,
              parentCommentId: String(comment.parentCommentId?._id),
            }),
          );
        }}
      >
        Xóa
      </button>
    </div>
  );
};

export default ModelCommentEdit;

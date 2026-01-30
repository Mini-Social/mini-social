import { useEffect, useRef } from 'react';

import CommentNode from '@/components/CommentNode';
import type { IComment } from '@/types/comment.type';

interface CommentTreeProps {
  comments: IComment[];
  depth?: number;
  replyingId: string[];
  handleOpenReply: (id: string) => void;
}
const CommentTree = ({
  comments,
  depth = 0,
  replyingId,
  handleOpenReply,
}: CommentTreeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const autoFocus = () => {
    if (!ref.current) {
      return;
    }
    ref.current.focus();
  };
  useEffect(() => {
    autoFocus();
  }, []);
  return (
    <>
      {comments.map((comment, index) => (
        <CommentNode
          key={comment._id}
          comment={comment}
          comments={comments}
          depth={depth}
          replyingId={replyingId}
          handleOpenReply={handleOpenReply}
          index={index}
        />
      ))}
    </>
  );
};

export default CommentTree;

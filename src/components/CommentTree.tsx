import { useEffect, useRef } from 'react';

import CommentNode from '@/components/CommentNode';
import type { IComment } from '@/types/comment.type';

interface CommentTreeProps {
  comments: IComment[];
  depth?: number;
  replyingId: string[];
  handleToggleReply: (id: string) => void;
}
const CommentTree = ({
  comments,
  depth = 0,
  replyingId,
  handleToggleReply,
}: CommentTreeProps) => {
  console.log(comments);
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
          handleToggleReply={handleToggleReply}
          index={index}
        />
      ))}
    </>
  );
};

export default CommentTree;

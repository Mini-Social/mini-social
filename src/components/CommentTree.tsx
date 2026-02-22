import React, { useEffect, useRef } from 'react';

import CommentNode from '@/components/CommentNode';
import type { IComment } from '@/types/comment.type';

interface CommentTreeProps {
  comments: IComment[];
  depth?: number;
  replyingId: string[];
  handleToggleReply: (id: string) => void;
  setReplyTarget?: React.Dispatch<
    React.SetStateAction<{ id: string; name: string }>
  >;
}
const CommentTree = ({
  comments,
  depth = 0,
  replyingId,
  handleToggleReply,
  setReplyTarget,
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
          handleToggleReply={handleToggleReply}
          index={index}
          setGlobalReplyTarget={setReplyTarget}
        />
      ))}
    </>
  );
};

export default CommentTree;

import { useEffect, useRef, useState } from 'react';

import SendIcon from '@/assets/icons/send-message.png';
import CommentItem from '@/components/CommentItem';
import { type CommentType } from '@/types/type';
import { COMMENT_LAYOUT } from '@/utils/variable';

interface CommentTreeProps {
  comments: CommentType[];
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
  const avatarSize = Math.max(24, 32 - depth * 4);
  const [replies, setReplies] = useState<Record<string, boolean>>({});
  const ref = useRef<HTMLDivElement>(null);
  const autoFocus = () => {
    if (!ref.current) {
      return;
    }
    ref.current.focus();
  };
  const toggleReplies = (id: string) => {
    setReplies(pre => ({
      ...pre,
      [id]: true,
    }));
  };
  useEffect(() => {
    autoFocus();
  }, []);
  return (
    <>
      {comments.map((comment, index) => (
        <div key={comment._id}>
          <div className="relative">
            {(comment.replies.length > 0 ||
              replyingId.includes(comment._id)) && (
              <div
                className={`absolute z-50 bg-gray-300`}
                style={{
                  left:
                    depth <= 2
                      ? Math.min(36, depth * 36) +
                        avatarSize / 2 +
                        COMMENT_LAYOUT.paddingLeft
                      : avatarSize / 2 + COMMENT_LAYOUT.paddingLeft,
                  top: avatarSize,
                  width: depth > 1 ? (comment.replies.length > 0 ? 0 : 1) : 1,
                  bottom: !replyingId.includes(comment._id) ? 20 : 0,
                }}
              ></div>
            )}
            <div
              style={{
                marginLeft: depth < 3 ? Math.min(36, depth * 36) : 0,
              }}
            >
              <CommentItem
                key={comment._id}
                handleOpenReply={handleOpenReply}
                comment={comment}
                avatarSize={avatarSize}
                depth={depth}
                replies={replies}
                toggleReplies={toggleReplies}
              />
              {/* Đệ quy */}
              {(depth < 2
                ? comment.replies.length > 0 && replies[comment._id]
                : true) && (
                <>
                  <CommentTree
                    comments={comment.replies}
                    depth={depth + 1}
                    replyingId={replyingId}
                    handleOpenReply={handleOpenReply}
                  />
                </>
              )}
            </div>
          </div>

          {replyingId.includes(comment._id) && (
            <div
              className={`relative mt-3 flex items-center`}
              style={{
                marginLeft:
                  depth >= 1
                    ? depth > 1
                      ? comment.replies.length > 0
                        ? 38
                        : index === comments.length - 1
                          ? depth <= 2
                            ? 72
                            : 36
                          : Math.max(36, depth * 36)
                      : 36 * 2
                    : Math.max(36, depth * 36),
              }}
            >
              <div
                className="absolute top-0 h-6 w-6 -translate-y-full rounded-bl-[12px] border-b border-l border-gray-300"
                style={{
                  top: COMMENT_LAYOUT.replyCommentHeight / 2,
                  left: depth > 1 ? -12 : depth === 0 ? -8 : -10,
                }}
              ></div>
              <div
                className="flex h-auto flex-1 items-start gap-1 pl-3"
                // style={{
                //   height: COMMENT_LAYOUT.replyCommentHeight,
                // }}
              >
                <img
                  src={
                    'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'
                  }
                  alt=""
                  className="z-100 rounded-[50%]"
                  style={{
                    width: COMMENT_LAYOUT.replyCommentHeight,
                    height: COMMENT_LAYOUT.replyCommentHeight,
                  }}
                />
                <div
                  className="flex w-full items-center justify-between rounded-[12px] bg-(--background-primary) px-2 py-1.5"
                  style={{}}
                >
                  <div
                    contentEditable="true"
                    className="h-auto w-full text-[16px] leading-5 break-all outline-none lg:text-[13px]"
                  >
                    <span
                      contentEditable="false"
                      className="inline-block bg-[#C2D6F7] px-1 text-[#080809]"
                    >
                      {comment.user.name}
                    </span>
                    &nbsp;
                  </div>
                  <img
                    src={SendIcon}
                    alt=""
                    className="ml-2.5 h-5 w-5 cursor-pointer self-end object-contain"
                  />
                </div>

                <div></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default CommentTree;

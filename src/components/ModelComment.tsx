import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import SendIcon from '@/assets/icons/send-message.png';
import CommentTree from '@/components/CommentTree';
import Post from '@/components/Post';
import { useGetCommentsByPostIdQuery } from '@/features/comment/comment.slice';
import { useGetDetailPostQuery } from '@/features/post/post.api.slice';
import type { RootState } from '@/store';

interface ModelCommentProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveReaction: React.Dispatch<React.SetStateAction<string | null>>;
}

const ModelComment = ({
  isVisible,
  setIsVisible,
  setActiveReaction,
}: ModelCommentProps) => {
  const postId = useSelector((state: RootState) => state.post.selectPostId);
  const { data } = useGetDetailPostQuery(postId);
  const { data: commentData } = useGetCommentsByPostIdQuery(postId);
  const [replyingId, setReplyingId] = useState<string[]>([]);
  const handleOpenReply = (id: string) => {
    setReplyingId(pre => (pre.includes(id) ? pre : [...pre, id]));
  };
  useEffect(() => {
    if (isVisible) {
      document.body.style.paddingRight = '15px';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isVisible]);
  return (
    <div className="pointer-events-auto fixed inset-0 z-9999 bg-gray-500/50 shadow-[0px_0px_1px_1px_rgba(0_0_0/0.2)]">
      <div className="flex h-full w-full items-center justify-center">
        <div className="bg-background relative flex h-dvh w-full flex-col rounded-2xl p-2 md:h-[95vh] md:w-[80%] lg:w-[50%]">
          <div className="border-b--border bg-background flex h-15 w-full items-center justify-between border-b p-2">
            <span></span>
            <span className="text-[1rem] font-bold text-(--textColor2)">
              Bài viết của{' '}
              {`${data?.data?.post.author.firstName + ' ' + data?.data?.post.author.lastName}`}
            </span>
            <div
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[50%] bg-(--closeColor) hover:opacity-80"
              onClick={() => setIsVisible(false)}
            >
              <CloseIcon fontSize="small" className="cursor-pointer" />
            </div>
          </div>
          <div className="no-scrollbar h-full w-full flex-1 overflow-x-hidden overflow-y-auto">
            {data?.data?.post && (
              <Post
                post={data?.data.post}
                setIsVisible={setIsVisible}
                setActiveReaction={setActiveReaction}
                noShadow
              />
            )}
            {commentData?.data && (
              <CommentTree
                comments={commentData?.data.comments}
                handleOpenReply={handleOpenReply}
                replyingId={replyingId}
              />
            )}
            <div></div>
          </div>

          <div className={`sticky bottom-0 flex h-fit items-center pt-3`}>
            <div className="sticky bottom-0 flex h-auto flex-1 items-start gap-1">
              <img
                src={
                  'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'
                }
                alt=""
                className="z-100 h-8 w-8 cursor-pointer rounded-[50%]"
              />
              <div className="flex w-full items-center justify-between rounded-[12px] bg-(--background-primary) px-2 py-1.5">
                <textarea
                  contentEditable={false}
                  className="no-scrollbar relative h-auto w-full resize-none bg-(--background-primary) text-[16px] leading-5 break-all outline-none placeholder:text-[13px] placeholder:text-[#808080] lg:text-[13px]"
                  placeholder="Viết bình luận...."
                ></textarea>
                <img
                  src={SendIcon}
                  alt=""
                  className="ml-2.5 h-5 w-5 cursor-pointer self-end object-contain"
                />
              </div>

              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelComment;

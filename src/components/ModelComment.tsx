import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import noAvatar from '@/assets/avatars/noavatar.png';
import CommentTree from '@/components/CommentTree';
import Post from '@/components/Post';
import LanguageContext from '@/contexts/LanguageContext';
import {
  useAddCommentMutation,
  useGetCommentsByPostIdQuery,
} from '@/features/comment/comment.slice.api';
import { useGetDetailPostQuery } from '@/features/post/post.api.slice';
import type { RootState } from '@/store';

interface ModelCommentProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveReaction: React.Dispatch<React.SetStateAction<string | null>>;
  setOpenModel?: React.Dispatch<React.SetStateAction<string>>;
}
const API_URL = import.meta.env.VITE_API_URL;
const ModelComment = ({
  isVisible,
  setIsVisible,
  setActiveReaction,
  setOpenModel,
}: ModelCommentProps) => {
  const postId = useSelector((state: RootState) => state.post.selectPostId);
  const ownUser = useSelector((state: RootState) => state.auth.user);
  const { data } = useGetDetailPostQuery(postId);
  const { data: commentData } = useGetCommentsByPostIdQuery(postId);
  const [addComment] = useAddCommentMutation();
  const [replyingId, setReplyingId] = useState<string[]>([]);
  const [commentContent, setCommentContent] = useState<string>('');
  const refScroll = useRef<HTMLDivElement>(null);
  const handleToggleReply = (id: string) => {
    setReplyingId(pre => (pre.includes(id) ? pre : [...pre, id]));
  };
  const handleSendComment = () => {
    setCommentContent('');
    addComment({
      postId,
      content: commentContent,
      parentCommentId: null,
    });
  };
  // useEffect(() => {
  //   if(refScroll.current){
  //     refScroll.current.scrollTop = refScroll.current.scrollHeight
  //   }
  // } , [commentData])
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
  const languageContext = useContext(LanguageContext);
  if (!languageContext) {
    return null;
  }
  const { language, translate } = languageContext;
  return (
    <div className="pointer-events-auto fixed inset-0 z-9999 bg-gray-500/50 shadow-[0px_0px_1px_1px_rgba(0_0_0/0.2)]">
      <div className="flex h-full w-full items-center justify-center">
        <div className="bg-background relative flex h-dvh w-full flex-col rounded-2xl p-2 md:h-[95vh] md:w-[80%] lg:w-[50%]">
          <div className="border-b--border bg-background flex h-15 w-full items-center justify-between border-b p-2">
            <span></span>
            <span className="text-[1rem] font-bold text-(--textColor2)">
              {translate(language, 'article')}{' '}
              {`${data?.data?.post.author.firstName + ' ' + data?.data?.post.author.lastName}`}
            </span>
            <div
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[50%] bg-(--closeColor) hover:opacity-80"
              onClick={() => setIsVisible(false)}
            >
              <CloseIcon fontSize="small" className="cursor-pointer" />
            </div>
          </div>
          <div
            className="no-scrollbar h-full w-full flex-1 overflow-y-auto"
            ref={refScroll}
          >
            {data?.data?.post && (
              <Post
                post={data?.data.post}
                setIsVisible={setIsVisible}
                setActiveReaction={setActiveReaction}
                setOpenModel={setOpenModel}
                noShadow
              />
            )}
            {commentData?.data && (
              <CommentTree
                comments={commentData?.data.comments}
                handleToggleReply={handleToggleReply}
                replyingId={replyingId}
              />
            )}
            <div></div>
          </div>

          <div className={`sticky bottom-0 flex h-fit items-center pt-3`}>
            <div className="sticky bottom-0 flex h-auto flex-1 items-start gap-1">
              <img
                src={
                  ownUser?.avatar
                    ? API_URL + `avatars/${ownUser.avatar}`
                    : noAvatar
                }
                alt=""
                className="z-100 h-8 w-8 cursor-pointer rounded-[50%]"
              />
              <div className="flex w-full items-center justify-between rounded-[12px] bg-(--background-primary) px-2 py-1.5">
                <textarea
                  contentEditable={false}
                  value={commentContent}
                  onChange={e => setCommentContent(e.target.value)}
                  className="no-scrollbar relative h-auto w-full resize-none bg-(--background-primary) text-[16px] leading-5 break-all outline-none placeholder:text-[13px] placeholder:text-[#808080] lg:text-[13px]"
                  placeholder={translate(language, 'writeComment') + '....'}
                ></textarea>
                <button
                  className="self-end border-none! bg-transparent! p-0!"
                  onClick={handleSendComment}
                  disabled={commentContent.length === 0}
                >
                  <SendIcon
                    className={`${commentContent.length > 0 ? 'cursor-pointer text-blue-500' : 'cursor-not-allowed text-gray-400'}`}
                  />
                </button>
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

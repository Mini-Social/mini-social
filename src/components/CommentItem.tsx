import SendIcon from '@mui/icons-material/Send';
import { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

import noAvatar from '@/assets/avatars/noavatar.png';
import angry from '@/assets/icons/angry.svg';
import haha from '@/assets/icons/haha.svg';
import like from '@/assets/icons/like.svg';
import love from '@/assets/icons/love.svg';
import sad from '@/assets/icons/sad.svg';
import wow from '@/assets/icons/wow.svg';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModel';
import ModelCommentEdit from '@/components/ModelCommentEdit';
import ReactionsBar from '@/components/ReactionsBar';
import LanguageContext from '@/contexts/LanguageContext';
import {
  closeDeleteComment,
  closeEditComment,
  startOpenModel,
} from '@/features/comment/comment.slice';
import {
  useDeleteCommentMutation,
  useReactionCommentMutation,
  useUpdateCommentMutation,
} from '@/features/comment/comment.slice.api';
import { setReactModel } from '@/features/post/post.slice';
import { translations } from '@/language/language';
import type { RootState } from '@/store';
import { UseAppDispatch } from '@/store';
import type { IComment } from '@/types/comment.type';
import { reactionStyle } from '@/types/type';
import type { ReactionType, ReactionTypeNotDefault } from '@/types/type';
import { FormatDate } from '@/utils/formatDate';
import { translateCount } from '@/utils/translateReaction';
import { COMMENT_LAYOUT } from '@/utils/variable';

const reaction = {
  like,
  love,
  haha,
  wow,
  sad,
  angry,
};
interface CommentItemProps {
  comment: IComment;
  avatarSize?: number;
  depth: number;
  replies: Record<string, boolean>;
  handleToggleReply: (id: string) => void;
  toggleReplies: (id: string) => void;
  setParentCommentId: (id: string | null) => void;
  setReplyTarget?: React.Dispatch<
    React.SetStateAction<{ id: string; name: string }>
  >;
}
const API_URL = import.meta.env.VITE_API_URL;
const CommentItem = ({
  comment,
  avatarSize = 32,
  depth,
  replies,
  handleToggleReply,
  toggleReplies,
  setParentCommentId,
  setReplyTarget,
}: CommentItemProps) => {
  const ownUser = useSelector((state: RootState) => state.auth.user);
  const editCommentModel = useSelector((state: RootState) => state.comment);
  const deleteCommentId = useSelector(
    (state: RootState) => state.comment.deleteCommentId,
  );
  const dispatch = UseAppDispatch();
  const [reactionComment] = useReactionCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [react, setReact] = useState<ReactionType>(
    (comment.userReactions.find(c => c.userId._id === ownUser?._id)
      ?.reactions as ReactionType) || 'default',
  );
  const modelRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const commentRef = useRef<HTMLDivElement>(null);
  const [showBar, setShowBar] = useState(false);
  const LEFT = 28;
  const count = Object.values(comment.reactions).reduce(
    (acc, value) => acc + value,
    0,
  );
  const isOwnComment = ownUser?._id === comment.userId._id;
  const [updateCommentContent, setUpdateCommentContent] = useState<string>(
    editCommentModel.editCommentModel.content,
  );
  const commentEntries = Object.entries(comment.reactions)
    .sort(([, a], [, b]) => b - a)
    .filter(react => react[1] > 0)
    .map(react => react[0]);
  const handleParentClick = () => {
    if (react !== 'default') {
      reactionComment({
        commentId: comment._id,
        postId: comment.postId,
        parentCommentId: comment.parentCommentId?._id,
        action: `un${react}`,
      });
      setReact('default');
      setShowBar(false);
    } else {
      reactionComment({
        commentId: comment._id,
        postId: comment.postId,
        parentCommentId: comment.parentCommentId?._id,
        action: `like`,
      });
      setReact('like');
      setShowBar(false);
    }
  };
  const handleDeleteComment = () => {
    dispatch(closeEditComment());
    dispatch(closeDeleteComment());
    deleteComment({
      commentId: deleteCommentId.commentId,
      parentCommentId: deleteCommentId.parentCommentId,
      postId: comment.postId,
    });
  };
  useEffect(() => {
    setUpdateCommentContent(editCommentModel.editCommentModel.content);
  }, [editCommentModel.editCommentModel.content]);
  useEffect(() => {
    const handleListener = (e: PointerEvent) => {
      if (
        modelRef.current &&
        !modelRef.current.contains(e.target as Node) &&
        dotRef.current &&
        !dotRef.current.contains(e.target as Node)
      ) {
        dispatch(closeEditComment());
      }
    };
    window.addEventListener('click', handleListener);
    return () => window.removeEventListener('click', handleListener);
  }, [modelRef, dispatch]);

  useEffect(() => {
    if (comment && commentRef.current) {
      setTimeout(() => {
        commentRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 100);
    }
  }, [comment]);
  const focusAndShowCaret = (el: HTMLElement) => {
    el.focus();
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(range);
  };
  const languageContext = useContext(LanguageContext);
  if (!languageContext) {
    return null;
  }
  const { language, translate } = languageContext;
  return (
    <div
      ref={commentRef}
      className={`relative flex w-full flex-1 items-start gap-2.5 pt-1`}
      style={{
        paddingLeft: COMMENT_LAYOUT.paddingLeft,
      }}
    >
      <div className={`shrink-0 rounded-[50%]`}>
        <Link to={`/profile/${comment.userId.userName}`}>
          <img
            src={
              comment.userId.avatar
                ? API_URL + `/avatars/${comment.userId.avatar}`
                : noAvatar
            }
            alt=""
            className="relative z-9999 h-full w-full rounded-[50%] object-cover"
            style={{
              width: avatarSize,
              height: avatarSize,
            }}
          />
        </Link>
      </div>
      {depth > 0 && (
        <div
          className="absolute h-6 w-6 -translate-y-full rounded-bl-[12px] border-b border-l border-gray-300"
          style={{
            top: avatarSize / 2 + 4,
            left: depth > 1 ? -10 : -8,
          }}
        ></div>
      )}

      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-2.5">
          <div
            className={`flex flex-col rounded-[12px] bg-(--background-primary) px-3 py-2 text-[13px] ${editCommentModel.editCommentModel.commentId === comment._id ? 'w-full' : ''}`}
          >
            {editCommentModel.editCommentModel.commentId !== comment._id && (
              <span className="font-medium">
                <Link
                  to={`/profile/${comment.userId.userName}`}
                  className="text-inherit! hover:underline!"
                >
                  {comment.userId.firstName} {comment.userId.lastName}
                </Link>
              </span>
            )}

            <div>
              {depth > 0 &&
                editCommentModel.editCommentModel.commentId !== comment._id &&
                !comment.deleted && (
                  <Link
                    to={`/profile/${comment.parentCommentId?.userId.userName}`}
                    className="text-inherit! hover:underline!"
                  >
                    <span className="font-bold hover:underline">
                      {comment.replyToId?.userId.firstName +
                        ' ' +
                        comment.replyToId?.userId.lastName +
                        ' '}
                    </span>
                  </Link>
                )}
              {editCommentModel.editCommentModel.commentId === comment._id ? (
                <div className="flex w-full items-center justify-between">
                  <TextareaAutosize
                    value={updateCommentContent}
                    className="no-scrollbar relative h-auto w-full resize-none bg-(--background-primary) text-[16px] leading-5 break-all outline-none placeholder:text-[13px] placeholder:text-[#808080] lg:text-[13px]"
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (updateCommentContent.trim().length > 0) {
                          dispatch(closeEditComment());
                          updateComment({
                            content: updateCommentContent.trim(),
                            postId: comment.postId,
                            commentId: comment._id,
                            parentCommentId: String(
                              comment.parentCommentId?._id,
                            ),
                          });
                        }
                      }
                    }}
                    onChange={e => {
                      setUpdateCommentContent(e.target.value);
                    }}
                    placeholder={translate(language, 'writeComment') + '....'}
                  />
                  <button
                    className="self-end border-none! bg-transparent! p-0!"
                    onClick={() => {
                      dispatch(closeEditComment());
                      updateComment({
                        content: updateCommentContent.trim(),
                        postId: comment.postId,
                        commentId: comment._id,
                        parentCommentId: String(comment.parentCommentId?._id),
                      });
                    }}
                    disabled={updateCommentContent.trim().length === 0}
                  >
                    <SendIcon
                      className={`${updateCommentContent.trim().length > 0 ? 'cursor-pointer text-blue-500' : 'cursor-not-allowed text-gray-400'}`}
                    />
                  </button>
                </div>
              ) : (
                <span
                  className={`wrap-break-word break-all ${comment.deleted ? 'text-gray-500' : ''}`}
                >
                  {comment.content}
                </span>
              )}
            </div>
          </div>
          {isOwnComment &&
            editCommentModel.editCommentModel.commentId !== comment._id &&
            !comment.deleted && (
              <div
                className="relative flex h-6 w-6 cursor-pointer items-center justify-center rounded-[50%] text-[1rem] hover:bg-(--background-secondary)"
                onClick={() => {
                  if (editCommentModel.isOpenEdit === comment._id) {
                    dispatch(closeEditComment());
                  } else {
                    dispatch(startOpenModel(comment._id));
                  }
                }}
              >
                {editCommentModel.editCommentModel.commentId !==
                  comment._id && <span ref={dotRef}>⋯</span>}
                {editCommentModel.isOpenEdit === comment._id && (
                  <ModelCommentEdit comment={comment} ref={modelRef} />
                )}
              </div>
            )}
        </div>
        {editCommentModel.editCommentModel.commentId !== comment._id &&
          !comment.deleted && (
            <div className="ml-2 flex items-center gap-2.5 pt-0.75 text-[11px] font-medium text-[#65686c] lg:gap-4">
              <span className="cursor-pointer hover:underline">
                {FormatDate(comment.createdAt, false)}
              </span>
              <span
                onClick={handleParentClick}
                onMouseEnter={() => setShowBar(true)}
                onMouseLeave={() => setShowBar(false)}
                className={`group relative h-fit w-fit cursor-pointer font-bold hover:underline ${reactionStyle[react].color}`}
              >
                {translate(
                  language,
                  reactionStyle[
                    react
                  ].text.toLowerCase() as keyof typeof translations.vi,
                )}
                <ReactionsBar
                  comment={comment}
                  setState={setReact}
                  setShowBar={setShowBar}
                  isVisible={showBar}
                />
              </span>
              <span
                className="cursor-pointer hover:underline"
                onClick={() => {
                  const myName = `${comment.userId.firstName} ${comment.userId.lastName}`;
                  if (depth < 2) {
                    handleToggleReply(comment._id);
                  }
                  if (depth >= 1) {
                    setParentCommentId(comment._id);
                    setReplyTarget?.({
                      id: comment._id,
                      name: myName,
                    });
                  } else {
                    setParentCommentId(comment._id);
                    setReplyTarget?.({
                      id: comment._id,
                      name: myName,
                    });
                  }
                  const targetId =
                    depth >= 2
                      ? comment.parentCommentId?._id || comment._id
                      : comment._id;
                  setTimeout(() => {
                    const inputSection = document.getElementById(
                      `reply-input-${targetId}`,
                    );
                    if (inputSection) {
                      inputSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                      });
                      const editable = inputSection.querySelector(
                        '[contenteditable="true"]',
                      ) as HTMLElement;
                      if (editable) {
                        setTimeout(() => {
                          focusAndShowCaret(editable);
                        }, 300);
                      }
                    }
                  }, 100);
                }}
              >
                {translate(language, 'reply')}
              </span>
              <div className="flex items-center">
                <span
                  className="mr-0.5 cursor-pointer text-xs text-[#65686c] hover:underline"
                  onClick={() => {
                    dispatch(
                      setReactModel({
                        reactions: comment.reactions,
                        userReactions: comment.userReactions,
                      }),
                    );
                  }}
                >
                  {translateCount(count) !== '' && translateCount(count)}
                </span>
                <div className="flex items-center">
                  {commentEntries.slice(0, 3).map((name, index) => (
                    <div
                      key={index}
                      className={`w-5 rounded-[50%] border-2 border-white ${index > 0 ? '-ml-1' : ''}`}
                    >
                      {' '}
                      <img
                        src={reaction[name as ReactionTypeNotDefault]}
                        alt={name}
                        className={`h-full w-full cursor-pointer`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        {editCommentModel.editCommentModel.commentId === comment._id && (
          <span
            className="my-0.5 block cursor-pointer text-xs text-blue-500 hover:underline"
            onClick={() => dispatch(closeEditComment())}
          >
            Hủy
          </span>
        )}
        {comment.replyCount > 0 && !replies[comment._id] && depth < 2 && (
          <>
            <div
              className="absolute h-6 w-6 rounded-bl-[12px] border-b border-l border-gray-300"
              style={{
                bottom: 7,
                left: depth === 0 ? LEFT : depth >= 2 ? LEFT - 4 : LEFT - 2,
              }}
            ></div>
            <span
              className="cursor-pointer text-xs font-medium text-[#65686c]"
              onClick={() => {
                toggleReplies(comment._id);
                if (depth < 2) {
                  handleToggleReply(comment._id);
                }
                if (depth >= 2 && comment.parentCommentId) {
                  setParentCommentId(comment.parentCommentId._id);
                } else {
                  setParentCommentId(comment._id);
                }
              }}
            >
              {translate(language, 'seeAll') + ' '} {comment.replyCount + ' '}{' '}
              {translate(language, 'response').toLowerCase() + ' '}
            </span>
          </>
        )}
      </div>
      <ConfirmDeleteModal
        title="Xóa bình luận"
        desc="Hành động này không thể hoàn tác. Bình luận của bạn sẽ bị xóa vĩnh
            viễn khỏi hệ thống."
        isOpen={deleteCommentId.commentId !== ''}
        Id={comment._id}
        onClose={() => {
          dispatch(closeDeleteComment());
        }}
        onConfirm={handleDeleteComment}
      />
    </div>
  );
};
export default CommentItem;

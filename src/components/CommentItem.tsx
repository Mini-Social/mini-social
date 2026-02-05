import { useContext, useState } from 'react';

import angry from '@/assets/icons/angry.svg';
import haha from '@/assets/icons/haha.svg';
import like from '@/assets/icons/like.svg';
import love from '@/assets/icons/love.svg';
import sad from '@/assets/icons/sad.svg';
import wow from '@/assets/icons/wow.svg';
import ReactionsBar from '@/components/ReactionsBar';
import LanguageContext from '@/contexts/LanguageContext';
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
  handleOpenReply: (id: string) => void;
  toggleReplies: (id: string) => void;
}
const CommentItem = ({
  comment,
  avatarSize = 32,
  depth,
  replies,
  handleOpenReply,
  toggleReplies,
}: CommentItemProps) => {
  const [react, setReact] = useState<ReactionType>('default');
  const [showBar, setShowBar] = useState(false);
  const LEFT = 28;
  const count = Object.values(comment.reactions).reduce(
    (acc, value) => acc + value,
    0,
  );
  const commentEntries = Object.entries(comment.reactions)
    .sort(([, a], [, b]) => b - a)
    .filter(react => react[1] > 0)
    .map(react => react[0]);
  const handleParentClick = () => {
    if (react !== 'default') {
      setReact('default');
      setShowBar(false);
    } else {
      setReact('like');
      setShowBar(false);
    }
  };
  const languageContext = useContext(LanguageContext);
  if (!languageContext) {
    return null;
  }
  const { language, translate } = languageContext;
  return (
    <div
      className={`relative flex items-start gap-2.5 pt-1`}
      style={{
        paddingLeft: COMMENT_LAYOUT.paddingLeft,
      }}
    >
      <div className={`shrink-0 overflow-hidden rounded-[50%]`}>
        <img
          src={comment.userId.avatar}
          alt=""
          className="relative z-9999 h-full w-full rounded-[50%]"
          style={{
            width: avatarSize,
            height: avatarSize,
          }}
        />
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

      <div className="flex flex-col">
        <div className="flex items-center gap-2.5">
          <div className="flex flex-col rounded-[12px] bg-(--background-primary) px-3 py-2 text-[13px]">
            <span className="font-medium">
              {comment.userId.firstName} {comment.userId.lastName}
            </span>
            <span>{comment.content}</span>
          </div>
          <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-[50%] text-[1rem] hover:bg-(--background-secondary)">
            <span>⋯</span>
          </div>
        </div>
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
            {reactionStyle[react].text}
            <ReactionsBar
              setState={setReact}
              setShowBar={setShowBar}
              isVisible={showBar}
            />
          </span>
          <span
            className="cursor-pointer hover:underline"
            onClick={() => {
              handleOpenReply(comment._id);
            }}
          >
            {translate(language, 'reply')}
          </span>
          <div className="flex items-center">
            <span className="cursor-pointer text-xs text-[#65686c] hover:underline">
              {translateCount(count) !== 'reaction' &&
                translateCount(count)}
            </span>
            <div className="flex items-center">
              {commentEntries.slice(0, 3).map((name, index) => (
                <div
                  key={index}
                  className={`w-5 overflow-hidden rounded-[50%] border-2 border-white ${index > 0 ? '-ml-1' : ''}`}
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
        {comment.replyCount > 0 && depth < 2 && !replies[comment._id] && (
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
                  handleOpenReply(comment._id);
                }
              }}
            >
              {translate(language, 'seeAll') + ' '} {comment.replyCount + ' '}{' '}
              {translate(language, 'response').toLowerCase() + ' '}
            </span>
          </>
        )}
      </div>
    </div>
  );
};
export default CommentItem;

import angry from '@/assets/icons/angry.svg';
import haha from '@/assets/icons/haha.svg';
import like from '@/assets/icons/like.svg';
import love from '@/assets/icons/love.svg';
import sad from '@/assets/icons/sad.svg';
import wow from '@/assets/icons/wow.svg';
import { useReactionCommentMutation } from '@/features/comment/comment.slice.api';
import { useReactionPostMutation } from '@/features/post/post.api.slice';
import type { errorResponseType2 } from '@/types/auth.type';
import type { IComment } from '@/types/comment.type';
import { type IPost, type ReactionType } from '@/types/type';

const reactions = {
  like,
  love,
  haha,
  wow,
  sad,
  angry,
};
interface ReactionBarProps {
  setState: React.Dispatch<React.SetStateAction<ReactionType>>;
  setShowBar: React.Dispatch<React.SetStateAction<boolean>>;
  setMyReaction?: React.Dispatch<
    React.SetStateAction<{
      like: number;
      love: number;
      haha: number;
      wow: number;
      sad: number;
      angry: number;
    }>
  >;
  post?: IPost;
  comment?: IComment;
  isVisible: boolean;
  react?: string;
  isPost?: boolean;
}

const ReactionsBar = ({
  setState,
  setShowBar,
  setMyReaction,
  post,
  comment,
  react,
  isVisible,
  isPost,
}: ReactionBarProps) => {
  const [reactionPost] = useReactionPostMutation();
  const [reactionComment] = useReactionCommentMutation();
  const handleReaction = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    name: ReactionType,
  ) => {
    e.stopPropagation();
    {
      const oldReact = react as Exclude<ReactionType, 'default'>;
      const newReact = name as Exclude<ReactionType, 'default'>;
      if (setMyReaction && react) {
        setMyReaction(pre => ({
          ...pre,
          [react]: Math.max(0, pre[oldReact] - 1),
          [newReact]: pre[newReact] + 1,
        }));
      }
      try {
        if (isPost && post) {
          await reactionPost({
            postId: post._id,
            action: newReact,
          }).unwrap();
        } else if (comment) {
          await reactionComment({
            postId: comment.postId,
            action: newReact,
            commentId: comment._id,
            parentCommentId: comment.parentCommentId?._id,
          }).unwrap();
        }
      } catch (error) {
        const errorType = error as errorResponseType2;
        console.log(errorType.data.message);
      }

      setState(name as ReactionType);
      setShowBar(false);
    }
  };
  return (
    <div
      className={`bg-background absolute -top-8 left-0 flex items-center gap-2 rounded-4xl border p-1 transition-all delay-200 duration-200 ${isVisible ? 'pointer-events-auto visible group-hover:-translate-y-3 group-hover:opacity-100' : 'pointer-events-none invisible opacity-0'}`}
    >
      {Object.entries(reactions).map(([name, url], index) => (
        <div
          key={index}
          className={`w-10 overflow-hidden rounded-[50%] border-2 border-white transition-all duration-150 hover:scale-125 ${index > 0 ? '-ml-1' : ''}`}
          onClick={e => handleReaction(e, name as ReactionType)}
        >
          {' '}
          <img
            src={url}
            alt={name}
            className={`h-full w-full cursor-pointer`}
          />
        </div>
      ))}
      <div className="absolute -bottom-4 left-0 h-5 w-full bg-transparent" />
    </div>
  );
};

export default ReactionsBar;

import { useContext } from 'react';

import angry from '@/assets/icons/angry.svg';
import haha from '@/assets/icons/haha.svg';
import like from '@/assets/icons/like.svg';
import love from '@/assets/icons/love.svg';
import sad from '@/assets/icons/sad.svg';
import wow from '@/assets/icons/wow.svg';
import LanguageContext from '@/contexts/LanguageContext';
import { selectPost } from '@/features/post/post.slice';
import type { translations } from '@/language/language';
import { UseAppDispatch } from '@/store';
import type { IPost } from '@/types/type';
import { translateCount } from '@/utils/translateReaction';

type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
const reactionIcon: Record<ReactionType, string> = {
  like,
  love,
  haha,
  wow,
  sad,
  angry,
};
interface Props {
  count: number;
  id: string;
  post: IPost;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveReaction: React.Dispatch<React.SetStateAction<string | null>>;
}
const ReacionsPost = ({
  count,
  post,
  setIsVisible,
  setActiveReaction,
  id,
}: Props) => {
  const dispatch = UseAppDispatch();
  const reactions = Object.entries(post.reactions)
    .sort(([, a], [, b]) => b - a)
    .filter(react => react[1] > 0)
    .map(react => react[0]);
  const languageContext = useContext(LanguageContext);
  if (!languageContext) {
    return null;
  }
  const { language, translate } = languageContext;
  return (
    <div className="mx-3 flex items-center justify-between pt-1.5">
      <div className="flex items-center gap-1">
        <div className="flex items-center">
          {reactions.slice(0, 3).map((name, index) => (
            <div
              key={index}
              className={`w-5 overflow-hidden rounded-[50%] border-2 border-white ${index > 0 ? '-ml-1' : ''}`}
            >
              {' '}
              <img
                src={reactionIcon[name as ReactionType]}
                alt={name}
                className={`h-full w-full cursor-pointer`}
              />
            </div>
          ))}
        </div>
        <span
          className="cursor-pointer text-(--textColor2) hover:underline text-xs"
          onClick={() => {
            setActiveReaction('reaction-model');
            dispatch(selectPost(id));
          }}
        >
          { translateCount(count) === 'reaction' ? translate(language, translateCount(count) as keyof typeof translations.vi) : translateCount(count)}
        </span>
      </div>
      <div className="flex items-center gap-4 text-(--textColor2)">
        <span
          className="cursor-pointer hover:underline"
          onClick={() => {
            dispatch(selectPost(id));
            setIsVisible(true);
          }}
        >
          {post.commentCount} {translate(language, 'comment').toLowerCase()}
        </span>
        {post?.shares && post.shares?.length > 0 && (
          <span className="cursor-pointer hover:underline">
            {post.shares?.length} {translate(language, 'shares')}
          </span>
        )}
      </div>
    </div>
  );
};

export default ReacionsPost;

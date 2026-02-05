import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React, { useContext, useState } from 'react';

import angry from '@/assets/icons/angry.svg';
import haha from '@/assets/icons/haha.svg';
import like from '@/assets/icons/like.svg';
import love from '@/assets/icons/love.svg';
import sad from '@/assets/icons/sad.svg';
import wow from '@/assets/icons/wow.svg';
import ModelMoreReaction from '@/components/ModelMoreReaction';
import ReactionFilterItem from '@/components/ReactionTabItem';
import LanguageContext from '@/contexts/LanguageContext';
import type { ReactionTypeNotDefault } from '@/types/type';

const reactionIcon = {
  like,
  love,
  haha,
  wow,
  sad,
  angry,
};
interface Props {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  reactions: Record<string, number>;
}
const ReactionFilterBar = ({ active, setActive, reactions }: Props) => {
  const [isOpenMore, setIsOpenMore] = useState<boolean>(false);
  const reactionsEntries = Object.entries(reactions).filter(
    react => react[1] > 0,
  );
  const sortedReaction = [...reactionsEntries].sort(([, a], [, b]) => b - a);
  const MAX_VISIBLE = 3;
  const isActive = sortedReaction
    .slice(MAX_VISIBLE)
    .some(react => react[0] === active);
  const isNoReaction = reactionsEntries.every(react => react[1] === 0);
  const languageContext = useContext(LanguageContext);
  if (!languageContext) {
    return null;
  }
  const { language, translate } = languageContext;
  return (
    <>
      <ul className="flex h-15">
        <ReactionFilterItem
          title={translate(language, 'all')}
          active={active === 'all'}
          state="all"
          setIsOpenMore={setIsOpenMore}
          setActive={setActive}
        />
        {sortedReaction.slice(0, MAX_VISIBLE).map((user, index) => {
          if (user[1] > 0) {
            return (
              <ReactionFilterItem
                key={index}
                src={reactionIcon[user[0] as ReactionTypeNotDefault]}
                count={user[1]}
                active={active === user[0]}
                state={user[0]}
                setIsOpenMore={setIsOpenMore}
                setActive={setActive}
              />
            );
          }
        })}
        {sortedReaction.slice(MAX_VISIBLE).length > 0 && (
          <li
            className="relative flex cursor-pointer items-center justify-center gap-1 px-4 text-[14px] font-medium text-[#606366] hover:bg-(--hoverColor) lg:text-[1rem]"
            onClick={() => setIsOpenMore(pre => !pre)}
          >
            <span className={`${isActive && 'text-[#0806ff]'}`}>
              {translate(language, 'seeMore')}
            </span>
            <ArrowDropDownIcon
              style={{
                color: isActive ? '#0806ff' : '',
              }}
            />
            {isActive && (
              <div
                className={`absolute right-0 bottom-0 left-0 h-1 w-full bg-[#0806ff]`}
              ></div>
            )}
            {isOpenMore && (
              <div
                className="bg-background absolute bottom-0 left-0 w-full translate-y-full overflow-hidden rounded-[12px] shadow-[0px_0px_10px_1px_rgba(0_0_0/0.2)]"
                onMouseEnter={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <ul>
                  {sortedReaction.slice(MAX_VISIBLE).map((react, index) => (
                    <ModelMoreReaction
                      key={index}
                      src={reactionIcon[react[0] as ReactionTypeNotDefault]}
                      count={react[1]}
                      state={react[0]}
                      active={active === react[0]}
                      setActive={setActive}
                    />
                  ))}
                </ul>
              </div>
            )}
          </li>
        )}
      </ul>
      {isNoReaction && (
        <span className="text-center text-[1rem]">
          {translate(language, 'reaction')}
        </span>
      )}
    </>
  );
};
export default ReactionFilterBar;

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React, { useState } from 'react';

import angry from '@/assets/icons/angry.svg';
import haha from '@/assets/icons/haha.svg';
import like from '@/assets/icons/like.svg';
import love from '@/assets/icons/love.svg';
import sad from '@/assets/icons/sad.svg';
import wow from '@/assets/icons/wow.svg';
import ModelMoreReaction from '@/components/ModelMoreReaction';
import ReactionFilterItem from '@/components/ReactionTabItem';

interface Props {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}
const ReactionFilterBar = ({ active, setActive }: Props) => {
  const [isOpenMore, setIsOpenMore] = useState<boolean>(false);
  const isActive = active === 'wow' || active === 'sad' || active === 'angry';
  return (
    <ul className="flex h-15">
      <ReactionFilterItem
        title="Tất cả"
        active={active === 'all'}
        state="all"
        setIsOpenMore={setIsOpenMore}
        setActive={setActive}
      />
      <ReactionFilterItem
        src={like}
        count={10000}
        active={active === 'like'}
        state="like"
        setIsOpenMore={setIsOpenMore}
        setActive={setActive}
      />
      <ReactionFilterItem
        src={love}
        count={10000}
        active={active === 'love'}
        state="love"
        setIsOpenMore={setIsOpenMore}
        setActive={setActive}
      />
      <ReactionFilterItem
        src={haha}
        count={10000}
        active={active === 'haha'}
        state="haha"
        setIsOpenMore={setIsOpenMore}
        setActive={setActive}
      />
      {/* <ReactionFilterItem src={wow} count={10000} active = {active === 'wow'} state='wow' setActive={setActive}/> */}
      {/* <ReactionFilterItem src={sad} count={10000} active = {active === 'sad'} state='sad' setActive={setActive}/>
    <ReactionFilterItem src={angry} count={10000} active = {active === 'angry'} state='angry' setActive={setActive}/> */}
      <li
        className="relative flex cursor-pointer items-center justify-center gap-1 px-4 text-[1rem] font-medium text-[#606366] hover:bg-gray-100"
        onClick={() => setIsOpenMore(pre => !pre)}
      >
        <span className={`${isActive && 'text-[#0806ff]'}`}>Xem Thêm</span>
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
            className="absolute bottom-0 left-0 w-full translate-y-full rounded-[12px] bg-white shadow-[0px_0px_10px_1px_rgba(0_0_0/0.2)]"
            onMouseEnter={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <ul>
              <ModelMoreReaction
                src={wow}
                count={10}
                state="wow"
                active={active === 'wow'}
                setActive={setActive}
              />
              <ModelMoreReaction
                src={sad}
                count={10}
                state="sad"
                active={active === 'sad'}
                setActive={setActive}
              />
              <ModelMoreReaction
                src={angry}
                count={10}
                state="angry"
                active={active === 'angry'}
                setActive={setActive}
              />
            </ul>
          </div>
        )}
      </li>
    </ul>
  );
};
export default ReactionFilterBar;

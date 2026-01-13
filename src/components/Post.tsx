import LockIcon from '@mui/icons-material/Lock';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import chat from '@/assets/icons/chat.png';
import share from '@/assets/icons/share.png';
import PostImages from '@/components/PostImages';
import ReactionsBar from '@/components/ReactionsBar';
import ReacionsPost from '@/components/ReactionsPost';
import { type IPost, type ReactionType } from '@/types/type';
import { reactionStyle } from '@/types/type';
import { FormatDate } from '@/utils/formatDate';

interface PostProps {
  post: IPost;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveReaction: React.Dispatch<React.SetStateAction<string | null>>;
  noShadow?: boolean;
}
const Post = ({
  post,
  setIsVisible,
  noShadow,
  setActiveReaction,
}: PostProps) => {
  const [react, setReact] = useState<ReactionType>('default');
  const [showBar, setShowBar] = useState(false);

  const count = Object.values(post.reactions).reduce(
    (acc, value) => acc + value,
    0,
  );
  const handleParentClick = () => {
    if (react !== 'default') {
      setReact('default');
      setShowBar(false);
    } else {
      setReact('like');
      setShowBar(false);
    }
    console.log('Đã reset về mặc định');
  };
  return (
    <div
      className={`mb-5 rounded-[10px] ${noShadow ? 'shadow-none' : 'shadow-[0px_0px_5px_1px_rgba(0_0_0/0.2)]'}`}
    >
      <div className="item-center flex justify-between px-3 pt-3">
        <div className="flex items-center gap-3">
          <Link to={'/'}>
            <img
              src={post.avatar}
              alt=""
              className="h-10 w-10 rounded-[50%] object-cover"
            />
          </Link>
          <div className="flex flex-col">
            <Link to={'/'} className="text-inherit!">
              <span className="font-medium text-[14x] hover:underline">{`${post.firstName} ${post.lastName}`}</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#65686c]">
                {FormatDate(post.createdAt, true)}
              </span>
              {(post.visibility === 'public' && (
                <PublicIcon
                  fontSize="small"
                  sx={{
                    width: 14,
                    height: 14,
                  }}
                  htmlColor="#65686c"
                />
              )) ||
                (post.visibility === 'friends' && (
                  <PeopleIcon
                    fontSize="small"
                    sx={{
                      width: 14,
                      height: 14,
                    }}
                    htmlColor="#65686c"
                  />
                )) ||
                (post.visibility === 'private' && (
                  <LockIcon
                    fontSize="small"
                    sx={{
                      width: 14,
                      height: 14,
                    }}
                    htmlColor="#65686c"
                  />
                ))}
            </div>
          </div>
        </div>
        <MoreHorizIcon className="cursor-pointer self-center" />
      </div>
      <div className="mt-2">
        <span className="mb-2 block px-3 text-[13px]">
          Cựu Đội trưởng ĐTQG Việt Nam - Quế Ngọc Hải khoe món quà năm mới 2026
          mà anh nhận được là chiếc áo đấu Real Madrid có in tên, số kèm chữ ký
          của Jude Bellingham 🔥 Fan 20 năm là có thật 🤍
        </span>
        <PostImages images={post.images} />
        <ReacionsPost
          setIsVisible={setIsVisible}
          count={count}
          setActiveReaction={setActiveReaction}
        />

        <div className="mx-3 flex items-center justify-between">
          <div className="flex h-11 flex-1 items-center justify-center">
            <div
              onMouseEnter={() => setShowBar(true)}
              onMouseLeave={() => setShowBar(false)}
              onClick={handleParentClick}
              className="group relative z-50 flex h-fit w-full cursor-pointer items-center justify-center gap-2 py-1 transition-all duration-200 hover:bg-[#eaeaea]"
            >
              <img src={reactionStyle[react].icon} alt="" className="h-5 w-5" />
              <span className={`${reactionStyle[react].color} font-medium`}>
                {reactionStyle[react].text}
              </span>
              <ReactionsBar
                setState={setReact}
                setShowBar={setShowBar}
                isVisible={showBar}
              />
            </div>
            <div
              className="flex h-fit w-full cursor-pointer items-center justify-center gap-2 py-1 font-medium text-[#65676B] transition-all duration-200 hover:bg-[#eaeaea]"
              onClick={() => setIsVisible(true)}
            >
              <img src={chat} alt="" className="h-5 w-5" />
              <span>Comments</span>
            </div>
            <div className="flex h-fit w-full cursor-pointer items-center justify-center gap-2 py-1 font-medium text-[#65676B] transition-all duration-200 hover:bg-[#eaeaea]">
              <img src={share} alt="" className="h-5 w-5" />
              <span>Shares</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

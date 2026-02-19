import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import noAvatar from '@/assets/avatars/noavatar.png';
import angry from '@/assets/icons/angry.svg';
import haha from '@/assets/icons/haha.svg';
import like from '@/assets/icons/like.svg';
import love from '@/assets/icons/love.svg';
import sad from '@/assets/icons/sad.svg';
import wow from '@/assets/icons/wow.svg';
import LanguageContext from '@/contexts/LanguageContext';
import { closeReactModel } from '@/features/post/post.slice';
import type { RootState } from '@/store';
import { UseAppDispatch } from '@/store';

type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
const iconsReaction: Record<ReactionType, string> = {
  like,
  love,
  haha,
  wow,
  sad,
  angry,
};
interface Props {
  id: string;
  userName: string;
  avatar: string;
  react: ReactionType;
  firstName: string;
  lastName: string;
  isFriend: boolean | undefined;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}
const API_URL = import.meta.env.VITE_API_URL;
const UserReaction = ({
  id,
  userName,
  avatar,
  react,
  firstName,
  lastName,
  isFriend,
  setActive,
}: Props) => {
  const ownUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = UseAppDispatch();
  const languageContext = useContext(LanguageContext);
  if (!languageContext) {
    return null;
  }
  const { language, translate } = languageContext;
  return (
    <>
      <Link
        className="text-inherit!"
        to={`/profile/${userName}`}
        onClick={() => {
          dispatch(closeReactModel());
          setActive('all');
        }}
      >
        <li className="flex h-14 items-center justify-between px-2">
          <div className="flex shrink-0 cursor-pointer items-center gap-4">
            <div className="relative h-10 w-10 shrink-0 rounded-[50%]">
              <img
                src={avatar ? API_URL + `/avatars/${avatar}` : noAvatar}
                alt=""
                className="h-full w-full rounded-[50%] object-cover"
              />
              <div className="absolute right-0 bottom-0">
                <img src={iconsReaction[react]} alt="" className="h-4 w-4" />
              </div>
            </div>
            <span className="text-[15px] font-medium">{`${firstName} ${lastName}`}</span>
          </div>
          <div>
            {id !== ownUser?._id && (
              <button className="flex items-center gap-2.5 bg-(--closeColor)! hover:border-transparent! hover:opacity-80!">
                {!isFriend && (
                  <>
                    <PersonAddIcon fontSize="small" />
                    <span>{translate(language, 'addFriend')}</span>
                  </>
                )}

                {isFriend && (
                  <>
                    <FontAwesomeIcon icon={faFacebookMessenger} />
                    <span>{translate(language, 'message')}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </li>
      </Link>
    </>
  );
};

export default UserReaction;

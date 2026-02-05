import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import angry from '@/assets/icons/angry.svg';
import haha from '@/assets/icons/haha.svg';
import like from '@/assets/icons/like.svg';
import love from '@/assets/icons/love.svg';
import sad from '@/assets/icons/sad.svg';
import wow from '@/assets/icons/wow.svg';
import LanguageContext from '@/contexts/LanguageContext';

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
  userName: string;
  avatar: string;
  react: ReactionType;
  firstName: string;
  lastName: string;
  isFriend: boolean | undefined;
}

const UserReaction = ({
  userName,
  avatar,
  react,
  firstName,
  lastName,
  isFriend,
}: Props) => {

   const languageContext = useContext(LanguageContext);
    if (!languageContext) {
      return null;
    }
    const { language, translate } = languageContext;
  return <>
    <Link className="text-inherit!" to={`/profile/${userName}`}>
      <li className="flex h-14 items-center justify-between px-2">
        <div className="flex shrink-0 cursor-pointer items-center gap-4">
          <div className="relative h-10 w-10 shrink-0 rounded-[50%]">
            <img
              src={avatar}
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
        </div>
      </li>
    </Link>
  </>
}

export default UserReaction;

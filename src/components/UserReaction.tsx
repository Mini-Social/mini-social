import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import angry from '@/assets/icons/angry.svg';
import haha from '@/assets/icons/haha.svg';
import like from '@/assets/icons/like.svg';
import love from '@/assets/icons/love.svg';
import sad from '@/assets/icons/sad.svg';
import wow from '@/assets/icons/wow.svg';


type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
const iconsReaction : Record<ReactionType, string> = {
  like,
  love,
  haha,
  wow,
  sad,
  angry
}
interface Props {
  avatar: string,
  react: ReactionType,
  firstName: string,
  lastName: string,
  isFriend: boolean
}

const UserReaction = ({avatar, react, firstName, lastName, isFriend}: Props) => (
    <>
    <li className="flex items-center justify-between px-2 h-14">
        <div className="flex items-center gap-4 cursor-pointer shrink-0">
          <div className="relative w-10 h-10 rounded-[50%] shrink-0">
          <img src={avatar} alt="" className="w-full h-full object-cover rounded-[50%]"/>
          <div className="absolute bottom-0 right-0">
            <img src={iconsReaction[react]} alt="" className="w-4 h-4"/>
          </div>
        </div>
        <span className="text-[15px] font-medium">{`${firstName} ${lastName}`}</span>
        </div>
        <div>
          <button className="flex items-center gap-2.5 bg-gray-200! hover:bg-[#D6D9DD]! hover:border-transparent!">
            {
              !isFriend && <>
              <PersonAddIcon fontSize='small'/>
              <span>Thêm bạn bè</span>
              </>
            }

            {
              isFriend && <>
              <FontAwesomeIcon icon={faFacebookMessenger} />
              <span>Nhắn tin</span>
              </>
            }
          </button>
        </div>
    </li>

    </>
  )

export default UserReaction

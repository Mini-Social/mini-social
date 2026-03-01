import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom'

import noAvatar from '../assets/avatars/noavatar.png'

interface Props {
  firstName: string,
  lastName: string,
  userName: string,
  avatar: string
}
const API_URL = import.meta.env.VITE_API_URL
const UserSearchModel = ({firstName, lastName, userName, avatar}: Props) => <>
  <Link to={`/profile/${userName}`}>
  <li className='flex items-center justify-between'>
     <img src={avatar ? API_URL + `/avatars/${avatar}` : noAvatar } alt="" className="w-9 h-9 rounded-[50%] p-1.5"/>
     <span className='flex-1 text-[15px] text-(--textColor) font-medium'>{firstName + ' ' + lastName}</span>
     <CloseIcon />
  </li>
  </Link>
  </>

export default UserSearchModel

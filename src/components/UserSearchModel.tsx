import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom'

import noAvatar from '../assets/avatars/noavatar.png'
import { useAddToHistoryMutation, useRemoveHistoryMutation } from '@/features/user/user.api.slice';

interface Props {
  isHistory: boolean,
  _id: string,
  firstName: string,
  lastName: string,
  userName: string,
  avatar: string,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
  handleDeleteSearchUser?: (id: string) => void
}
const API_URL = import.meta.env.VITE_API_URL

const UserSearchModel = ({isHistory, _id, firstName, lastName, userName, avatar, setOpen, setSearchTerm, handleDeleteSearchUser}: Props) => {
const [addToHistory] = useAddToHistoryMutation()
const [removeHistory] = useRemoveHistoryMutation()
  return <Link to={`/profile/${userName}`} className='text-inherit!' onClick={(e) => {
    e.stopPropagation()
    addToHistory(_id)
    setOpen(false)
    setSearchTerm('');
    (document.activeElement as HTMLElement).blur();
  }}>
  <li className='flex items-center justify-between gap-2 hover:bg-(--hoverColor) p-2 cursor-pointer'>
    <div className='relative w-9 h-9 md:w-10 md:h-10 rounded-[50%] overflow-hidden'><img src={avatar ? API_URL + `/avatars/${avatar}` : noAvatar } alt="" className="w-full h-full object-cover"/></div>
     <span className='flex-1 text-xs md:text-[15px] text-(--textColor) font-medium'>{firstName + ' ' + lastName}</span>
     {
      isHistory && <div className='' onClick={(e) => {
      e.stopPropagation()
      e.preventDefault()
      if(handleDeleteSearchUser){
         handleDeleteSearchUser(_id)
      }
      removeHistory(_id)

     }}>
      <CloseIcon fontSize='small' />
     </div>
     }
  </li>
  </Link>
}

export default UserSearchModel

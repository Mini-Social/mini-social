import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import LanguageContext from '@/contexts/LanguageContext';
import { logOut } from '@/features/auth/auth.api.slice';
import { UseAppDispatch } from '@/store';
import { type IUser } from '@/types/user.type';

interface IUserMenuProps {
  user: IUser;
  open: string;
  setOpen: React.Dispatch<React.SetStateAction<string>>;
  refUserMenu: React.RefObject<HTMLDivElement | null>;
}
const UserMenu = ({ user, setOpen, refUserMenu }: IUserMenuProps) => {
  const ref = useRef<HTMLUListElement>(null);
  const dispatch = UseAppDispatch();
  const handleLogout = async () => {
    try {
      await dispatch(logOut()).unwrap();
    } catch (error) {
      const err = error as { status: string; message: string };
      toast.error(err.message);
    }
    setOpen('');
  };
  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        refUserMenu?.current &&
        !refUserMenu.current.contains(event.target as Node)
      ) {
        setOpen('');
      }
    };
    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, [ref, setOpen, refUserMenu]);

  const languageContext = useContext(LanguageContext);
  if (!languageContext) {
    return null;
  }
  const { language, translate } = languageContext;
  return (
    <>
      <ul
        onClick={event => event.stopPropagation()}
        ref={ref}
        className="bg-background absolute top-12 right-0 z-10 min-w-[150px] overflow-hidden rounded-md text-(--textColor) shadow-md"
      >
        <Link className="text-inherit!" to={`/profile/${user?.userName}`}>
          <li
            className="hover:bg-accent flex cursor-pointer items-center gap-2.5 p-2"
            onClick={() => setOpen('')}
          >
            <PersonIcon fontSize="small" />
            {translate(language, 'profile')}
          </li>
        </Link>

        <li
          className="hover:bg-accent flex cursor-pointer items-center gap-2.5 p-2"
          onClick={() => setOpen('setting')}
        >
          <SettingsIcon fontSize="small" />
          {translate(language, 'setting')}
        </li>
        <li
          className="hover:bg-accent flex cursor-pointer items-center gap-2.5 p-2"
          onClick={handleLogout}
        >
          <LogoutIcon fontSize="small" />
          {translate(language, 'logout')}
        </li>
      </ul>
    </>
  );
};

export default UserMenu;

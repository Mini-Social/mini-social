import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { logOut } from '@/features/auth/auth.api.slice';
import { type IUser } from '@/features/auth/auth.slice';
import { UseAppDispatch } from '@/store';

interface IUserMenuProps {
  user: IUser;
  setOpen: React.Dispatch<React.SetStateAction<string>>;
  refUserMenu: React.RefObject<HTMLDivElement | null>;
}
const UserMenu = ({ user, setOpen, refUserMenu }: IUserMenuProps) => {
  const ref = useRef<HTMLUListElement>(null);
  const dispatch = UseAppDispatch();
  const handleLogout = async () => {
    try {
      const res = await dispatch(logOut()).unwrap();
      toast.success(res.message);
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
  return (
    <ul
      onClick={event => event.stopPropagation()}
      ref={ref}
      className="bg-background absolute top-12 right-0 z-10 min-w-[120px] overflow-hidden rounded-md text-(--textColor) shadow-md"
    >
      <Link className="text-inherit!" to={`/profile/${user?.userName}`}>
        <li
          className="hover:bg-accent flex cursor-pointer items-center gap-2.5 p-2"
          onClick={() => setOpen('')}
        >
          <PersonIcon fontSize="small" />
          Profile
        </li>
      </Link>

      <li
        className="hover:bg-accent flex cursor-pointer items-center gap-2.5 p-2"
        onClick={() => setOpen('')}
      >
        <SettingsIcon fontSize="small" />
        Settings
      </li>
      <li
        className="hover:bg-accent flex cursor-pointer items-center gap-2.5 p-2"
        onClick={handleLogout}
      >
        <LogoutIcon fontSize="small" />
        Logout
      </li>
    </ul>
  );
};

export default UserMenu;

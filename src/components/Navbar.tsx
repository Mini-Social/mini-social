import ChatIcon from '@mui/icons-material/Chat';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useState, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import noAvatar from '@/assets/avatars/noavatar.png'
import ModelConversation from '@/components/ModelConversation';
import UserMenu from '@/components/UserMenu';
import { DarkModeContext } from '@/contexts/DarkModeContext';
import type { RootState } from '@/store';

const Navbar = () => {
  const {user,isAuthChecked} = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState<string>('');
  const darkModeContext = useContext(DarkModeContext);
  const refIcon = useRef<HTMLDivElement>(null);
  const refUserMenu = useRef<HTMLDivElement>(null);
  if (!darkModeContext || !isAuthChecked) {
    return null;
  }
  const { darkMode, toggleDarkMode } = darkModeContext;

  return (
    <>
      {open === 'conversation' && <ModelConversation open={open} setOpen={setOpen} refIcon={refIcon}/>}
      <div className="border-b-border bg-background sticky top-0 z-99 border-b px-5 py-2.5">
        <div className="flex h-12.5 items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-7.5">
           <Link to="/">
            <span className="cursor-pointer text-xl font-bold text-(--logoColor)">
              XuanSocial
            </span>
            </Link>
            <div className="hidden md:block">
              <HomeOutlinedIcon
                className="cursor-pointer"
                onClick={() => setOpen('home')}
              />
            </div>
            <div className="">
              {darkMode ? (
                <LightModeIcon
                  className="cursor-pointer"
                  onClick={toggleDarkMode}
                />
              ) : (
                <DarkModeOutlinedIcon
                  className="cursor-pointer"
                  onClick={toggleDarkMode}
                />
              )}
            </div>
            <form action="">
              <div className="border-border flex items-center gap-2.5 rounded-[5px] border p-1.25">
                <SearchOutlinedIcon />
                <input
                  type="text"
                  placeholder="Search"
                  className="h-full w-0 bg-transparent outline-none md:w-[200px] lg:w-[300px] xl:w-125"
                />
              </div>
            </form>
          </div>
          {/* Right */}
          <div className="flex items-center gap-1.5">
            <div className="relative w-10 h-10 flex items-center justify-center cursor-pointer rounded-full bg-(--gray200)" ref={refIcon} onClick={() =>
                  setOpen(pre => (pre === 'conversation' ? '' : 'conversation'))
                }>
              <ChatIcon

                className="cursor-pointer"
                style={{
                  color: open === 'conversation' ? 'blue' : 'var(--foreground)',
                }}
              />
              <span className='absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center text-[12px] font-bold text-white bg-red-500 rounded-[50%]'>5</span>
            </div>
           <div className='relative w-10 h-10 flex items-center justify-center cursor-pointer rounded-full bg-(--gray200)'>
             <NotificationsIcon className="cursor-pointer" />
             <span className='absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center text-[12px] font-bold text-white bg-red-500 rounded-[50%]'>1</span>
           </div>
              <div className='relative w-10 h-10 flex items-center justify-center cursor-pointer rounded-full' ref={refUserMenu}>
                <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 cursor-pointer overflow-hidden rounded-[50%]" onClick={() => setOpen((pre => (pre === 'userMenu' ? '' : 'userMenu'))) }>
                  <img
                    src={user?.avatar ?? noAvatar}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* <span className="hidden text-[13px] font-medium text-(--textColor) md:block">
                  {user?.firstName && user?.firstName + " " + user?.lastName}
                </span> */}
              </div>
              {
                 user && open === 'userMenu' && <UserMenu user={user} setOpen={setOpen} refUserMenu={refUserMenu} />
              }
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

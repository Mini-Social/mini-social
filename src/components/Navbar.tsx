import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useState , useContext } from 'react';

import ModelConversation from '@/components/ModelConversation';
import { DarkModeContext } from '@/contexts/DarkModeContext';

const Navbar = () => {
  const [open, setOpen] = useState<string>('');
  const darkModeContext = useContext(DarkModeContext);
  if(!darkModeContext) {
    return null;
  }
  const {darkMode, toggleDarkMode} = darkModeContext;

  return (
    <>
      {open === 'conversation' && <ModelConversation open={open} />}
      <div className="border-b-border bg-background sticky top-0 z-99 border-b px-5 py-2.5">
        <div className="flex h-12.5 items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-7.5">
            <span className="cursor-pointer text-xl font-bold text-(--logoColor)">
              XuanSocial
            </span>
            <div className="hidden md:block">
              <HomeOutlinedIcon className="cursor-pointer" onClick={() => setOpen('home')}/>
            </div>
            <div className="">
              {
                darkMode ? <LightModeIcon className="cursor-pointer" onClick={toggleDarkMode}/> : <DarkModeOutlinedIcon className="cursor-pointer" onClick={toggleDarkMode}/>
              }
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
          <div className="flex items-center gap-5">
            <div className="">
              <EmailOutlinedIcon
                className="cursor-pointer"
                style={{
                  color: open === 'conversation' ? 'blue' : 'var(--foreground)',
                }}
                onClick={() =>
                  setOpen(pre => (pre === 'conversation' ? '' : 'conversation'))
                }
              />
            </div>
            <NotificationsNoneOutlinedIcon className="cursor-pointer" />
            <div className="flex items-center gap-2.5">
              <div className="h-7.5 w-7.5 cursor-pointer overflow-hidden rounded-[50%]">
                <img
                  src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="hidden text-[1rem] font-medium text-(--textColor) md:block">
                John Doe
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

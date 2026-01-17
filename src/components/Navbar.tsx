import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useState } from 'react';

import ModelConversation from '@/components/ModelConversation';

const Navbar = () => {
  const [open, setOpen] = useState<string>('')

  return <>
  {open === 'conversation' && <ModelConversation />}
  <div className="sticky top-0 z-99 border-b border-b-[#d3d3d3] bg-white px-5 py-2.5">
    <div className="flex h-12.5 items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-7.5">
        <span className="text-xl font-bold text-[#00008B] cursor-pointer">XuanSocial</span>
        <div className='hidden md:block'>
          <HomeOutlinedIcon className="cursor-pointer" />
        </div>
        <div className='hidden md:block'>
          <DarkModeOutlinedIcon className="cursor-pointer" />
        </div>
        <form action="">
          <div className="flex items-center gap-2.5 rounded-[5px] border border-[#d3d3d3] p-1.25">
            <SearchOutlinedIcon />
            <input
              type="text"
              placeholder="Search"
              className="h-full w-0 md:w-[200px] lg:w-[300px] bg-transparent outline-none xl:w-125"
            />
          </div>
        </form>
      </div>
      {/* Right */}
      <div className="flex items-center gap-5">
        <div className="">
          <EmailOutlinedIcon className="cursor-pointer" style={{color: open === 'conversation' ? 'blue' : '#000000'}} onClick={() => setOpen((pre) => pre === 'conversation' ? '' : 'conversation')}/>
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
          <span className="text-[1rem] font-medium text-[#000000] hidden md:block">
            John Doe
          </span>
        </div>
      </div>
    </div>
  </div>
  </>
}

export default Navbar;

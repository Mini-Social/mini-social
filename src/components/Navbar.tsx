import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Navbar = () => (
  <div className="sticky top-0 z-99 border-b border-b-[#d3d3d3] bg-white px-5 py-2.5">
    <div className="flex h-12.5 items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-7.5">
        <span className="text-xl font-bold text-[#00008B]">XuanSocial</span>
        <HomeOutlinedIcon className="cursor-pointer" />
        <DarkModeOutlinedIcon className="cursor-pointer" />
        <GridViewOutlinedIcon className="cursor-pointer" />
        <form action="">
          <div className="flex items-center gap-2.5 rounded-[5px] border border-[#d3d3d3] p-1.25">
            <SearchOutlinedIcon />
            <input
              type="text"
              placeholder="Search"
              className="h-full w-full bg-transparent outline-none lg:w-125"
            />
          </div>
        </form>
      </div>
      {/* Right */}
      <div className="flex items-center gap-5">
        <PersonOutlineOutlinedIcon className="cursor-pointer" />
        <EmailOutlinedIcon className="cursor-pointer" />
        <NotificationsNoneOutlinedIcon className="cursor-pointer" />
        <div className="flex items-center gap-2.5">
          <div className="h-7.5 w-7.5 cursor-pointer overflow-hidden rounded-[50%]">
            <img
              src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-[1rem] font-medium text-[#000000]">
            John Doe
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default Navbar;

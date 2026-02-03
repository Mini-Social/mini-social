import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import noAvatar from '@/assets/avatars/noavatar.png';
import image from '@/assets/icons/image.png';
import location from '@/assets/icons/location.png';
import tag from '@/assets/icons/tag.png';
import type { RootState } from '@/store';

const API_URL = import.meta.env.VITE_API_URL;
const Share = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div className="bg-background mt-2 mb-2 p-5 md:mt-0 md:mb-5 md:rounded-[10px] md:shadow-[0px_0px_5px_1px_rgba(0_0_0/0.2)]">
      <div className="flex shrink-0 items-center gap-5">
        <Link to={'/'} className="shrink-0">
          <img
            src={(user?.avatar && API_URL + `/avatars/${user.avatar}`) || noAvatar}
            alt=""
            className="h-10 w-10 shrink-0 rounded-[50%] object-cover"
          />
        </Link>

        <input
          type="text"
          placeholder={`What's on your mind ${user?.firstName} ${user?.lastName}?`}
          className="w-full bg-transparent px-2.5 py-5 text-[16px] outline-none placeholder:text-[13px] placeholder:text-[#808080] lg:text-[13px]"
        />
      </div>
      <hr className="bg-border my-5 h-px w-full border-none" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 xl:gap-5">
          <label
            htmlFor="images"
            className="flex cursor-pointer items-center gap-2.5"
          >
            <img src={image} alt="" className="h-5 w-5" />
            <span className="text-[10px] md:text-[13px]">Add Image</span>
          </label>
          <input type="file" className="hidden" id="images" />
          <div className="flex cursor-pointer items-center gap-2.5">
            <img src={location} alt="" className="h-5 w-5" />
            <span className="text-[10px] md:text-[13px]">Add Place</span>
          </div>
          <div className="flex cursor-pointer items-center gap-2.5">
            <img src={tag} alt="" className="h-5 w-5" />
            <span className="text-[10px] md:text-[13px]">Tag Friends</span>
          </div>
        </div>

        <button className="cursor-not-allowed! border-none! bg-[#0866ff]! text-white">
          {/* bg-[#e2e5e9]! */}
          Share
        </button>
      </div>
    </div>
  );
};

export default Share;

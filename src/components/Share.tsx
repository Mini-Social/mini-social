import { Link } from 'react-router-dom';

import image from '@/assets/icons/image.png';
import location from '@/assets/icons/location.png';
import tag from '@/assets/icons/tag.png';

const Share = () => (
  <div className="mb-5 rounded-[10px] bg-white p-5 shadow-[0px_0px_5px_1px_rgba(0_0_0/0.2)]">
    <div className="flex items-center gap-5 shrink-0">
      <Link to={'/'} className="shrink-0">
        <img
          src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          className="h-10 w-10 rounded-[50%] object-cover shrink-0"
        />
      </Link>

      <input
        type="text"
        placeholder="What's on your mind Xuân Dương?"
        className="w-full bg-transparent px-2.5 py-5 outline-none placeholder:text-[13px] placeholder:text-[#808080]"
      />
    </div>
    <hr className="my-5 h-px w-full border-none bg-[#D3D3D3]" />

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 xl:gap-5">
        <label
          htmlFor="images"
          className="flex cursor-pointer items-center gap-2.5"
        >
          <img src={image} alt="" className="h-5 w-5" />
          <span className='text-[10px] md:text-[13px]'>Add Image</span>
        </label>
        <input type="file" className="hidden" id="images" />
        <div className="flex cursor-pointer items-center gap-2.5">
          <img src={location} alt="" className="h-5 w-5" />
          <span className='text-[10px] md:text-[13px]'>Add Place</span>
        </div>
        <div className="flex cursor-pointer items-center gap-2.5">
          <img src={tag} alt="" className="h-5 w-5" />
          <span className='text-[10px] md:text-[13px]'>Tag Friends</span>
        </div>
      </div>

      <button className="cursor-not-allowed! border-none! bg-[#0866ff]! text-white">
        {/* bg-[#e2e5e9]! */}
        Share
      </button>
    </div>
  </div>
);

export default Share;

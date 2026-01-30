import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import noAvatar from '@/assets/avatars/noavatar.png';
import type { RootState } from '@/store';

const Stories = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [translateX, setTranslateX] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const [maxTranslateX, setMaxTranslateX] = useState<number>(0);
  useEffect(() => {
    if (ref.current) {
      const maxTranslateX = ref.current.scrollWidth - ref.current.offsetWidth;
      setMaxTranslateX(maxTranslateX);
      if (Math.abs(translateX) > maxTranslateX) {
        setTranslateX(-maxTranslateX);
      }
    }
  }, [translateX, maxTranslateX]);
  return (
    <div className="relative mb-5 overflow-hidden">
      {translateX < 0 && (
        <div className="bg-background absolute top-[50%] left-[20px] z-10 flex h-12 w-12 translate-y-[-50%] cursor-pointer items-center justify-center rounded-full shadow-[0px_0px_5px_1px_rgba(0_0_0/0.2)]">
          <ArrowBackIosNewIcon
            fontSize="small"
            onClick={() => setTranslateX(Math.min(0, translateX + 400))}
          />
        </div>
      )}
      <div
        ref={ref}
        className="relative flex h-full max-h-50 w-full min-w-0 gap-2 rounded-[10px] transition-all duration-300 ease-in-out"
        style={{ transform: `translateX(${translateX}px)` }}
      >
        <div className="h-full w-[120px] shrink-0 cursor-pointer overflow-hidden rounded-[10px] shadow-[0px_0px_5px_1px_rgba(0_0_0/0.2)] hover:opacity-90">
          <div className="relative h-37.5">
            <img
              src={user?.avatar ?? noAvatar}
              alt=""
              className="h-full w-[120px] shrink-0 cursor-pointer bg-cover object-cover"
            />
          </div>
          <div className="bg-background relative h-12.5 w-full px-4 pt-7 pb-3 text-center text-[11px] font-medium">
            <div className="absolute top-0 left-[50%] flex h-9 w-9 translate-[-50%] transform cursor-pointer items-center justify-center rounded-[50%] border-4 border-white bg-[#0866ff] text-3xl text-white">
              +
            </div>
            Create news
          </div>
          <div></div>
        </div>
        <div className="relative w-[120px] shrink-0 cursor-pointer hover:opacity-90">
          <div className="h-full w-full">
            <div className="absolute top-2.5 left-2.5 h-10 w-10 overflow-hidden rounded-[50%] border-4 border-[#0866ff]">
              <img
                src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                alt=""
                className="object-cover"
              />
            </div>
            <img
              src="https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              alt=""
              className="h-full w-full cursor-pointer rounded-[10px] bg-cover object-cover"
            />
            <span className="absolute bottom-0 block p-2.5 text-xs font-medium text-white">
              Nguyễn Công Hiệp
            </span>
          </div>
        </div>
        <div className="relative w-[120px] shrink-0 cursor-pointer hover:opacity-90">
          <div className="h-full w-full">
            <div className="absolute top-2.5 left-2.5 h-10 w-10 overflow-hidden rounded-[50%] border-4 border-[#0866ff]">
              <img
                src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                alt=""
                className="object-cover"
              />
            </div>
            <img
              src="https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              alt=""
              className="h-full w-full cursor-pointer rounded-[10px] bg-cover object-cover"
            />
            <span className="absolute bottom-0 block p-2.5 text-xs font-medium text-white">
              Nguyễn Công Hiệp
            </span>
          </div>
        </div>
        <div className="relative w-[120px] shrink-0 cursor-pointer hover:opacity-90">
          <div className="h-full w-full">
            <div className="absolute top-2.5 left-2.5 h-10 w-10 overflow-hidden rounded-[50%] border-4 border-[#0866ff]">
              <img
                src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                alt=""
                className="object-cover"
              />
            </div>
            <img
              src="https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              alt=""
              className="h-full w-full cursor-pointer rounded-[10px] bg-cover object-cover"
            />
            <span className="absolute bottom-0 block p-2.5 text-xs font-medium text-white">
              Nguyễn Công Hiệp
            </span>
          </div>
        </div>
        <div className="relative w-[120px] shrink-0 cursor-pointer hover:opacity-90">
          <div className="h-full w-full">
            <div className="absolute top-2.5 left-2.5 h-10 w-10 overflow-hidden rounded-[50%] border-4 border-[#0866ff]">
              <img
                src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                alt=""
                className="object-cover"
              />
            </div>
            <img
              src="https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              alt=""
              className="h-full w-full cursor-pointer rounded-[10px] bg-cover object-cover"
            />
            <span className="absolute bottom-0 block p-2.5 text-xs font-medium text-white">
              Nguyễn Công Hiệp
            </span>
          </div>
        </div>
        <div className="relative w-[120px] shrink-0 cursor-pointer hover:opacity-90">
          <div className="h-full w-full">
            <div className="absolute top-2.5 left-2.5 h-10 w-10 overflow-hidden rounded-[50%] border-4 border-[#0866ff]">
              <img
                src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                alt=""
                className="object-cover"
              />
            </div>
            <img
              src="https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              alt=""
              className="h-full w-full cursor-pointer rounded-[10px] bg-cover object-cover"
            />
            <span className="absolute bottom-0 block p-2.5 text-xs font-medium text-white">
              Nguyễn Công Hiệp
            </span>
          </div>
        </div>
        <div className="relative w-[120px] shrink-0 cursor-pointer hover:opacity-90">
          <div className="h-full w-full">
            <div className="absolute top-2.5 left-2.5 h-10 w-10 overflow-hidden rounded-[50%] border-4 border-[#0866ff]">
              <img
                src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                alt=""
                className="object-cover"
              />
            </div>
            <img
              src="https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              alt=""
              className="h-full w-full cursor-pointer rounded-[10px] bg-cover object-cover"
            />
            <span className="absolute bottom-0 block p-2.5 text-xs font-medium text-white">
              Nguyễn Công Hiệp
            </span>
          </div>
        </div>
        <div className="relative w-[120px] shrink-0 cursor-pointer hover:opacity-90">
          <div className="h-full w-full">
            <div className="absolute top-2.5 left-2.5 h-10 w-10 overflow-hidden rounded-[50%] border-4 border-[#0866ff]">
              <img
                src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                alt=""
                className="object-cover"
              />
            </div>
            <img
              src="https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              alt=""
              className="h-full w-full cursor-pointer rounded-[10px] bg-cover object-cover"
            />
            <span className="absolute bottom-0 block p-2.5 text-xs font-medium text-white">
              Nguyễn Công Hiệp
            </span>
          </div>
        </div>
        <div className="relative w-[120px] shrink-0 cursor-pointer hover:opacity-90">
          <div className="h-full w-full">
            <div className="absolute top-2.5 left-2.5 h-10 w-10 overflow-hidden rounded-[50%] border-4 border-[#0866ff]">
              <img
                src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                alt=""
                className="object-cover"
              />
            </div>
            <img
              src="https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              alt=""
              className="h-full w-full cursor-pointer rounded-[10px] bg-cover object-cover"
            />
            <span className="absolute bottom-0 block p-2.5 text-xs font-medium text-white">
              Nguyễn Công Hiệp
            </span>
          </div>
        </div>
        <div className="relative w-[120px] shrink-0 cursor-pointer hover:opacity-90">
          <div className="h-full w-full">
            <div className="absolute top-2.5 left-2.5 h-10 w-10 overflow-hidden rounded-[50%] border-4 border-[#0866ff]">
              <img
                src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                alt=""
                className="object-cover"
              />
            </div>
            <img
              src="https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              alt=""
              className="h-full w-full cursor-pointer rounded-[10px] bg-cover object-cover"
            />
            <span className="absolute bottom-0 block p-2.5 text-xs font-medium text-white">
              Nguyễn Công Hiệp
            </span>
          </div>
        </div>
        <div className="relative w-[120px] shrink-0 cursor-pointer hover:opacity-90">
          <div className="h-full w-full">
            <div className="absolute top-2.5 left-2.5 h-10 w-10 overflow-hidden rounded-[50%] border-4 border-[#0866ff]">
              <img
                src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                alt=""
                className="object-cover"
              />
            </div>
            <img
              src="https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              alt=""
              className="h-full w-full cursor-pointer rounded-[10px] bg-cover object-cover"
            />
            <span className="absolute bottom-0 block p-2.5 text-xs font-medium text-white">
              Nguyễn Công Hiệp
            </span>
          </div>
        </div>
        <div className="relative w-[120px] shrink-0 cursor-pointer hover:opacity-90">
          <div className="h-full w-full">
            <div className="absolute top-2.5 left-2.5 h-10 w-10 overflow-hidden rounded-[50%] border-4 border-[#0866ff]">
              <img
                src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                alt=""
                className="object-cover"
              />
            </div>
            <img
              src="https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              alt=""
              className="h-full w-full cursor-pointer rounded-[10px] bg-cover object-cover"
            />
            <span className="absolute bottom-0 block p-2.5 text-xs font-medium text-white">
              Nguyễn Công Hiệp
            </span>
          </div>
        </div>
        <div className="relative w-[120px] shrink-0 cursor-pointer hover:opacity-90">
          <div className="h-full w-full">
            <div className="absolute top-2.5 left-2.5 h-10 w-10 overflow-hidden rounded-[50%] border-4 border-[#0866ff]">
              <img
                src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                alt=""
                className="object-cover"
              />
            </div>
            <img
              src="https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              alt=""
              className="h-full w-full cursor-pointer rounded-[10px] bg-cover object-cover"
            />
            <span className="absolute bottom-0 block p-2.5 text-xs font-medium text-white">
              Nguyễn Công Hiệp
            </span>
          </div>
        </div>
        <div className="relative w-[120px] shrink-0 cursor-pointer hover:opacity-90">
          <div className="h-full w-full">
            <div className="absolute top-2.5 left-2.5 h-10 w-10 overflow-hidden rounded-[50%] border-4 border-[#0866ff]">
              <img
                src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                alt=""
                className="object-cover"
              />
            </div>
            <img
              src="https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              alt=""
              className="h-full w-full cursor-pointer rounded-[10px] bg-cover object-cover"
            />
            <span className="absolute bottom-0 block p-2.5 text-xs font-medium text-white">
              Nguyễn Công Hiệp
            </span>
          </div>
        </div>
      </div>
      {translateX > -maxTranslateX && (
        <div className="bg-background absolute top-[50%] right-[20px] z-10 flex h-12 w-12 translate-y-[-50%] cursor-pointer items-center justify-center rounded-full shadow-[0px_0px_5px_1px_rgba(0_0_0/0.2)]">
          <ArrowForwardIosIcon
            fontSize="small"
            onClick={() => setTranslateX(translateX - 400)}
          />
        </div>
      )}
    </div>
  );
};

export default Stories;

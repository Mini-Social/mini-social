const onlineFriends = [
  {
    _id: 1,
    firstName: 'Nguyễn',
    lastName: 'Công Hiệp',
    avatar:
      'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg',
    isOnline: true,
  },
  {
    _id: 2,
    firstName: 'Xuân',
    lastName: 'Dương',
    avatar:
      'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg',
    isOnline: true,
  },
  {
    _id: 3,
    firstName: 'Phí',
    lastName: 'Hà My',
    avatar:
      'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg',
    isOnline: true,
  },
  {
    _id: 4,
    firstName: 'Phạm',
    lastName: 'Trang',
    avatar:
      'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg',
    isOnline: true,
  },
  {
    _id: 5,
    firstName: 'Phạm',
    lastName: 'Văn Minh',
    avatar:
      'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg',
    isOnline: true,
  },
];

const RightBar = () => (
  <div className="no-scrollbar sticky top-17.5 hidden h-[calc(100vh-70px)] flex-3 shrink-0 overflow-auto p-5 lg:block">
    <div>
      <div className="mb-5 bg-white shadow-[0px_0px_35px_0px_rgba(0_0_0/0.1)]">
        <span className="mb-4.5 block px-5 pt-5 text-xs text-[#808080]">
          Suggestions For You
        </span>
        <div className="flex cursor-pointer items-center justify-between px-8 py-3 hover:bg-gray-100">
          <div className="flex items-center gap-4">
            <img
              src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
              alt=""
              className="h-10 w-10 shrink-0 rounded-[50%] object-cover"
            />
            <span className="text-[13px] font-medium text-[#000000]">
              Nguyễn Công Hiệp
            </span>
          </div>
          <div className="flex h-full gap-2.5">
            <button className="border-none! bg-[#0866ff]! px-2! text-xs! text-white">
              Add
            </button>
            <button className="border-none! bg-[#E2E5E9]! px-2! text-xs! hover:bg-[#e7e7e8]!">
              Remove
            </button>
          </div>
        </div>
        <div className="flex cursor-pointer items-center justify-between px-8 py-3 hover:bg-gray-100">
          <div className="flex items-center gap-4">
            <img
              src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
              alt=""
              className="h-10 w-10 shrink-0 rounded-[50%] object-cover"
            />
            <span className="text-[13px] font-medium text-[#000000]">
              Phí Hà My
            </span>
          </div>
          <div className="flex h-full gap-2.5">
            <button className="border-none! bg-[#0866ff]! px-2! text-xs! text-white">
              Add
            </button>
            <button className="border-none! bg-[#E2E5E9]! px-2! text-xs! hover:bg-[#e7e7e8]!">
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="mb-5 bg-white shadow-[0px_0px_35px_0px_rgba(0_0_0/0.1)]">
        <span className="mb-4.5 block px-5 pt-5 text-xs text-[#808080]">
          Online Friends
        </span>
        {onlineFriends &&
          onlineFriends.map(user => (
            <div
              className="flex cursor-pointer items-center gap-2.5 p-3 px-8 hover:bg-gray-200"
              key={user._id}
            >
              <div className="relative h-10 w-10 shrink-0 rounded-[50%]">
                <img
                  src={user.avatar}
                  alt=""
                  className="h-full w-full rounded-[50%] object-cover"
                />
                {user.isOnline && (
                  <div className="absolute right-0 bottom-0 h-3 w-3 rounded-[50%] border-2 border-white bg-[#24832c]"></div>
                )}
              </div>
              <span className="text-[13px] font-medium text-[#000000]">{`${user.firstName} ${user.lastName}`}</span>
            </div>
          ))}
      </div>
    </div>
  </div>
);

export default RightBar;

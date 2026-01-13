const onlineFriends = [
  {
    _id: 1,
    firstName: 'Nguyễn',
    lastName: 'Công Hiệp',
    avatar:
      'https://scontent.fhph4-1.fna.fbcdn.net/v/t39.30808-1/513851649_1268726824695790_4766704651740185785_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_ohc=m-6ktscyxl8Q7kNvwEFTlzs&_nc_oc=Admy3CPyUYx9zO-5UU8OY8YT-LMzOTPl_GtZjqBbx9BeQMUYmIzgumvdsVepMKznF-9LzvYgJdLuGDS7J2tUIcRp&_nc_zt=24&_nc_ht=scontent.fhph4-1.fna&_nc_gid=3ulkjThCxTPxZ2in6b6KYw&oh=00_AfpcNH9dCaL3U0KMtn4LaxKHVJHACvLIFRmxILiwI8YL8g&oe=695EFC80',
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
      'https://scontent.fhph4-1.fna.fbcdn.net/v/t39.30808-1/496193729_2006363179889489_5047886027768463765_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=opKOIZrVkbUQ7kNvwF7f_i8&_nc_oc=AdkaLXLLtYcf9VZ44OxBX8c9pr_FBovHoiOAe3byUM6LFODGAZWkPrIOAawqPqIJrPme--vDu_vLvAe-Fc2754-O&_nc_zt=24&_nc_ht=scontent.fhph4-1.fna&_nc_gid=6XqOHfbAk3kLdDbogJ59OQ&oh=00_AfqJaWA5kJ7daS_z7ACXKrWDdYYNXHNLOXbV30YS0sbXdw&oe=695F024D',
    isOnline: true,
  },
  {
    _id: 5,
    firstName: 'Phạm',
    lastName: 'Văn Minh',
    avatar:
      'https://scontent.fhph4-1.fna.fbcdn.net/v/t39.30808-6/550162514_122175294080377089_8127533307759295246_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=MumD1CvJ3tQQ7kNvwFI4q26&_nc_oc=AdnQyKkKb5_SW-Nsi0c5-c6WCE2wgVN1LhBFhtEB9MbxCL1IX054IsWR2AfTzw6H67u8xYAcfvZ-A1o-UMKKuX7t&_nc_zt=23&_nc_ht=scontent.fhph4-1.fna&_nc_gid=AClqDm-hF53q91fqnnDGrA&oh=00_AfpqTwM7bYB7mgajh7lWE6vLLXWBxHauay15MdYJZqbukg&oe=695F129D',
    isOnline: true,
  },
];

const RightBar = () => (
  <div className="no-scrollbar sticky top-17.5 h-[calc(100vh-70px)] flex-3 shrink-0 overflow-auto p-5">
    <div>
      <div className="mb-5 bg-white shadow-[0px_0px_35px_0px_rgba(0_0_0/0.1)]">
        <span className="mb-4.5 block px-5 pt-5 text-xs text-[#808080]">
          Suggestions For You
        </span>
        <div className="flex cursor-pointer items-center justify-between px-8 py-3 hover:bg-gray-100">
          <div className="flex items-center gap-4">
            <img
              src="https://scontent.fhph4-1.fna.fbcdn.net/v/t39.30808-1/513851649_1268726824695790_4766704651740185785_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_ohc=m-6ktscyxl8Q7kNvwEFTlzs&_nc_oc=Admy3CPyUYx9zO-5UU8OY8YT-LMzOTPl_GtZjqBbx9BeQMUYmIzgumvdsVepMKznF-9LzvYgJdLuGDS7J2tUIcRp&_nc_zt=24&_nc_ht=scontent.fhph4-1.fna&_nc_gid=3ulkjThCxTPxZ2in6b6KYw&oh=00_AfpcNH9dCaL3U0KMtn4LaxKHVJHACvLIFRmxILiwI8YL8g&oe=695EFC80"
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

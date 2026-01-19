import noAvatar from '@/assets/avatars/noavatar.png';

const friends = [
  {
    _id: '65a8ef99e9b1a12f9c000222',
    firstName: 'Anh',
    lastName: 'Nguyễn Văn',
    avatar: 'https://i.pravatar.cc/150?img=1',
    isOnline: true,
  },
  {
    _id: '65a8ef66e9b1a12f9c000444',
    firstName: 'Bảo',
    lastName: 'Trần Thị',
    avatar: 'https://i.pravatar.cc/150?img=5',
    isOnline: false,
  },
  {
    _id: '65a8ef77e9b1a12f9c000333',
    firstName: 'Cường',
    lastName: 'Lê Hoàng',
    avatar: 'https://i.pravatar.cc/150?img=8',
    isOnline: true,
  },
  {
    _id: '65a8ef55e9b1a12f9c000555',
    firstName: 'Dũng',
    lastName: 'Phạm Minh',
    avatar: 'https://i.pravatar.cc/150?img=12',
    isOnline: false,
  },
  {
    _id: '65a8ef22e9b1a12f9c000888',
    firstName: 'Em',
    lastName: 'Hoàng Anh',
    avatar: '',
    isOnline: true,
  },
  {
    _id: '65a8ef11e9b1a12f9c000999',
    firstName: 'Phương',
    lastName: 'Võ Thị',
    avatar: 'https://i.pravatar.cc/150?img=16',
    isOnline: false,
  },
  {
    _id: '65a8ef00e9b1a12f9c001010',
    firstName: 'Huy',
    lastName: 'Đặng Quốc',
    avatar: 'https://i.pravatar.cc/150?img=11',
    isOnline: true,
  },
  {
    _id: '65a8ef33e9b1a12f9c000777',
    firstName: 'Mai',
    lastName: 'Bùi Tuyết',
    avatar: 'https://i.pravatar.cc/150?img=23',
    isOnline: false,
  },
  {
    _id: '65a8ef44e9b1a12f9c000666',
    firstName: 'Tùng',
    lastName: 'Lý Thanh',
    avatar: 'https://i.pravatar.cc/150?img=13',
    isOnline: true,
  },
  {
    _id: '65a8ef88e9b1a12f9c000111',
    firstName: 'Khiêm',
    lastName: 'Ngô Gia',
    avatar: 'https://i.pravatar.cc/150?img=60',
    isOnline: false,
  },
];
const Contacts = ({ search }: { search: string }) => {
  const filterFriends = friends.filter(
    friend =>
      friend.firstName.toLowerCase().includes(search.toLowerCase()) ||
      friend.lastName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="custom-scrollbar flex-1 overflow-y-auto p-1.5">
      <span className="p-2 text-[14px] font-bold text-[#65686c]">
        Your contact
      </span>
      {filterFriends.map(friend => (
        <div
          key={friend._id}
          className="flex cursor-pointer items-center gap-2.5 rounded-[8px] p-1 hover:bg-(--hoverColor)"
        >
          <div className="h-12 w-12 overflow-hidden rounded-[50%] p-1.5">
            <img
              src={friend.avatar || noAvatar}
              alt=""
              className="h-full w-full rounded-[50%]"
            />
          </div>
          <span className="text-[14px] font-extralight">
            {friend.firstName} {friend.lastName}
          </span>
        </div>
      ))}
    </div>
  );
};
export default Contacts;

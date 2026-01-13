import UserReaction from "@/components/UserReaction"

const MOCK_REACTIONS = [
  {
    id: '1',
    avatar: 'https://i.pravatar.cc/150?u=1',
    firstName: 'Xuân',
    lastName: 'Dương',
    react: 'like',
    isFriend: false,
  },
  {
    id: '2',
    avatar: 'https://i.pravatar.cc/150?u=2',
    firstName: 'Minh',
    lastName: 'Hoàng',
    react: 'love',
    isFriend: false,
  },
  {
    id: '3',
    avatar: 'https://i.pravatar.cc/150?u=3',
    firstName: 'Anh',
    lastName: 'Nguyễn',
    react: 'haha',
    isFriend: false,
  },
  {
    id: '4',
    avatar: 'https://i.pravatar.cc/150?u=4',
    firstName: 'Thảo',
    lastName: 'Lê',
    react: 'wow',
    isFriend: false,
  },
  {
    id: '5',
    avatar: 'https://i.pravatar.cc/150?u=5',
    firstName: 'Quốc',
    lastName: 'Trần',
    react: 'sad',
    isFriend: false,
  },
  {
    id: '6',
    avatar: 'https://i.pravatar.cc/150?u=6',
    firstName: 'Hương',
    lastName: 'Phạm',
    react: 'angry',
    isFriend: false,
  }
];
type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
interface Props {
  active: string
}
const UserReactions = ({active}: Props) => {
  const filteredReactions =  active === 'all' ? MOCK_REACTIONS : MOCK_REACTIONS.filter((user) =>  user.react === active )
  return <ul className='mt-2.5 overflow-y-auto h-full flex-1 custom-scrollbar'>
        {
          filteredReactions.map((user) => <UserReaction key={user.id} avatar={user.avatar} firstName={user.firstName} lastName={user.lastName} react={user.react as ReactionType} isFriend={user.isFriend}/>)
        }
      </ul>
}

export default UserReactions

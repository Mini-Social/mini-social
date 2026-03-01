import { useSelector } from 'react-redux';

import UserReaction from '@/components/UserReaction';
import type { RootState } from '@/store';
import { type ReactionTypeNotDefault } from '@/types/type';
import type { IUserReactionType } from '@/types/user.type';

interface Props {
  active: string;
  userReactions: IUserReactionType[];
  setActive: React.Dispatch<React.SetStateAction<string>>;
}
const UserReactions = ({ active, userReactions, setActive }: Props) => {
  const friendIds = useSelector((state: RootState) => state.auth.user?.friends);
  const ownUser = useSelector((state: RootState) => state.auth.user);
  if (!userReactions) {
    return null;
  }
  const filteredReactions =
    active === 'all'
      ? userReactions
      : userReactions.filter(user => user.reactions === active);

  const sortedReactions = [...filteredReactions].sort((a, b) => {
    const aId = a.userId._id;
    const bId = b.userId._id;
    const myId = ownUser?._id;
    if (aId === myId) {
      return -1;
    }
    if (bId === myId) {
      return 1;
    }
    const isAFriend = friendIds?.some(friend => friend._id === a.userId._id);
    const isBFriend = friendIds?.some(friend => friend._id === b.userId._id);

    if (isAFriend && !isBFriend) {
      return -1;
    }
    if (!isAFriend && isBFriend) {
      return 1;
    }
    return 0;
  });
  return (
    <ul className="custom-scrollbar mt-2.5 h-full flex-1 overflow-y-auto">
      {sortedReactions.map(user => (
        <UserReaction
          key={`${user.userId._id}-${user.reactions}`}
          id={user.userId._id}
          userName={user.userId.userName}
          avatar={user.userId.avatar}
          firstName={user.userId.firstName}
          lastName={user.userId.lastName}
          react={user.reactions as ReactionTypeNotDefault}
          isFriend={friendIds?.some(friend => friend._id === user.userId._id)}
          setActive={setActive}
        />
      ))}
    </ul>
  );
};

export default UserReactions;

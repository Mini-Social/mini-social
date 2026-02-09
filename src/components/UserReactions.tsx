import { useSelector } from 'react-redux';

import UserReaction from '@/components/UserReaction';
import type { RootState } from '@/store';

type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
interface userReactionType {
  reactions: string;
  reactionAt: Date;
  userId: {
    _id: string;
    userName: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
}
interface Props {
  active: string;
  userReactions: userReactionType[];
}
const UserReactions = ({ active, userReactions }: Props) => {
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
    const isAOwn = a.userId._id === ownUser?._id;
    if (isAOwn) {
      return -1;
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
          key={user.userId._id}
          id={user.userId._id}
          userName={user.userId.userName}
          avatar={user.userId.avatar}
          firstName={user.userId.firstName}
          lastName={user.userId.lastName}
          react={user.reactions as ReactionType}
          isFriend={friendIds?.some(friend => friend._id === user.userId._id)}
        />
      ))}
    </ul>
  );
};

export default UserReactions;

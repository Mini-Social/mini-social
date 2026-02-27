export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string | undefined;
  avatar: string | null;
  background: string;
  coverPosition: number;
  bio: string;
  gender: string;
  address: string;
  relationship: string;
  phone: string | null;
  birthDate: string | null;
  role: 'Admin' | 'User';
  friends: {
    _id: string;
    userName: string;
    firstName: string;
    lastName: string;
    avatar: string;
  }[];
  isOnline: boolean;
  lastOnline: Date | null;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface IUserReactionType {
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

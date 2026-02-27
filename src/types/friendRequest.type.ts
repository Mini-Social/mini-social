export interface IFriendRequest {
  _id: string;
  sender: {
    _id: string;
    userName: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  receiver: {
    _id: string;
    userName: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

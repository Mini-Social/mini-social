export interface IConversation {
  _id: string;
  type: string;
  groupName: string | null;
  avatar: string;
  lastMessage: string;
  lastMessageAt: Date;
  unReadCount: {
    userId: string;
    count: number;
  }[];
  members: {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    avatar: string;
    isOnline: string;
    lastOnline: Date | null;
  }[];
  groupAdmin: {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    avatar: string;
    isOnline: string;
  }[];
  lastSenderId: {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    avatar: string;
    isOnline: string;
  };
}

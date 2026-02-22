export interface IMessage {
  conversationId: string;
  sender: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  content: string;
  readBy: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  }[];
  images: string[];
  createdAt: Date;
  updateAt: Date;
}

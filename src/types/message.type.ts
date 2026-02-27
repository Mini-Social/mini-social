export interface IMessage {
  _id: string;
  conversationId: string;
  sender: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
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
  updatedAt: Date;
}

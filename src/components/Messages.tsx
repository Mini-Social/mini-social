import MessageItem from "@/components/MessageItem";
import TypingIndicaptor from "@/components/TypingIndicaptor";
import { type Message } from "@/types/type";

const messages : Message[] = [
  {
    _id: '65a8f300e9b1a12f9c001236',
    conversationId: '65a8f0a9e9b1a12f9c009999',
    sender: '65a8ef88e9b1a12f9c000111',
    content: 'Hello!',
    readBy: ['65a8ef88e9b1a12f9c000111'],
    images: [],
    createdAt: '2026-01-15T06:30:00.000Z',
    updatedAt: '2026-01-15T06:30:00.000Z'
  },
  {
    _id: '65a8f310e9b1a12f9c001237',
    conversationId: '65a8f0a9e9b1a12f9c009999',
    sender: '65a8ef99e9b1a12f9c000222',
    content: 'Chào bạn 👋',
    readBy: ['65a8ef88e9b1a12f9c000111'],
    images: [],
    createdAt: '2026-01-15T06:31:10.000Z',
    updatedAt: '2026-01-15T06:31:10.000Z'
  },
  {
    _id: '65a8f320e9b1a12f9c001238',
    conversationId: '65a8f0a9e9b1a12f9c009999',
    sender: '65a8ef88e9b1a12f9c000111',
    content: '',
    readBy: ['65a8ef99e9b1a12f9c000222'],
    images: ['https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600', 'https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'],
    createdAt: '2026-01-15T06:32:45.000Z',
    updatedAt: '2026-01-15T06:32:45.000Z'
  },
  {
    _id: '65a8f320e9b1a12f9c001239',
    conversationId: '65a8f0a9e9b1a12f9c009999',
    sender: '65a8ef99e9b1a12f9c000222',
    content: 'Hello nhé',
    readBy: ['65a8ef88e9b1a12f9c000111'],
    images: ['https://taoanhdep.com/wp-content/uploads/2023/09/taoanhthe-1-350x265.jpg', 'https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'],
    createdAt: '2026-01-15T06:32:45.000Z',
    updatedAt: '2026-01-15T06:32:45.000Z'
  }
]
const Messages = () => {
  const userId = '65a8ef99e9b1a12f9c000222';
  const otherUserId = '65a8ef88e9b1a12f9c000111';
  return (
    <>
      {messages.map((message, index) => {
        const isOwn = message.sender === userId;
        return (
          <MessageItem key={message._id} isOwn={isOwn} content={message.content} createdAt={message.createdAt} images={message.images} isLast={index === messages.length - 1} isRead={message.readBy.includes(otherUserId)} />
        );
      })}

      {/* Typing */}
      <TypingIndicaptor />
    </>
  );
};

export default Messages;

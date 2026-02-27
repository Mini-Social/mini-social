import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import noAvatar from '@/assets/avatars/noavatar.png';
import MessageItem from '@/components/MessageItem';
import TypingIndicaptor from '@/components/TypingIndicaptor';
import { socket } from '@/socket';
import type { RootState } from '@/store';
import type { IMessage } from '@/types/message.type';

const API_URL = import.meta.env.VITE_API_URL;
const Messages = ({
  messages,
  avatar,
  name,
  otherUserId,
  scrollToBottom,
}: {
  messages: IMessage[];
  avatar: string;
  name: string;
  otherUserId: string | undefined;
  scrollToBottom: () => void;
}) => {
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  useEffect(() => {
    const onTyping = () => {
      setIsTyping(true);
    };
    const onCancelTyping = () => {
      setIsTyping(false);
    };
    socket.on('cancelTyping', onCancelTyping);
    socket.on('typing', onTyping);

    return () => {
      socket.off('cancelTyping', onCancelTyping);
      socket.off('typing', onTyping);
    };
  }, []);
  return (
    <>
      <div className="my-10 flex justify-center">
        <div className="flex flex-col items-center">
          <img
            src={avatar ? API_URL + `avatars/${avatar}` : noAvatar}
            alt=""
            className="h-15 w-15 rounded-full object-cover"
          />
          <span className="text-[17px]">{name}</span>
          <span className="text-xs text-gray-500">
            Bắt đầu cuộc trò chuyện ngay.
          </span>
        </div>
      </div>
      {messages.map((message, index) => {
        const isOwn = message.sender._id === userId;

        return (
          <MessageItem
            key={message._id}
            isOwn={isOwn}
            content={message.content}
            createdAt={message.createdAt}
            avatar={avatar}
            images={message.images}
            isLast={index === messages.length - 1}
            isRead={message.readBy.some(m => m._id === otherUserId)}
            scrollToBottom={scrollToBottom}
          />
        );
      })}

      {/* Typing */}
      {isTyping && <TypingIndicaptor />}
    </>
  );
};

export default Messages;

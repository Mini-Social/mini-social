import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import noAvatar from '@/assets/avatars/noavatar.png';
import { startConversation } from '@/features/conversation/conversation.slice';
import { useSeenMessageMutation } from '@/features/message/message.slice.api';
import { socket } from '@/socket';
import { UseAppDispatch, type RootState } from '@/store';
import type { IConversation } from '@/types/conversation.type';
import type { IMessage } from '@/types/message.type';
import { FormatDate } from '@/utils/formatDate';

interface Props {
  _id: string;
  members: {
    _id: string;
    firstName: string;
    lastName: string;
  }[];
  convo: IConversation;
  avatar: string;
  groupName: string | null;
  lastMessage: string;
  lastMessageAt: Date;
  unReadCount: number;
  lastSenderId: string;
  setOpen: React.Dispatch<React.SetStateAction<string>>;
}
const API_URL = import.meta.env.VITE_API_URL;
const Conversation = ({
  _id,
  convo,
  lastMessageAt,
  unReadCount,
  setOpen,
}: Props) => {
  const dispatch = UseAppDispatch();
  const [seenMessage] = useSeenMessageMutation();
  const [conversation, setConversation] = useState<IConversation>(convo);
  const user = useSelector((state: RootState) => state.auth.user);
  const [usersOnline, setUsersOnline] = useState<string[]>([]);
  const [displayTime, setDisplayTime] = useState<string>('');
  useEffect(() => {
    if (user?._id) {
      socket.emit('addUser', user._id);
    }
    const onGetUsers = (users: { userId: string; socketId: string }[]) => {
      if (user) {
        const friendsOnline = user.friends.filter(f =>
          users.some(u => u.userId === f._id),
        );
        setUsersOnline(friendsOnline.map(f => f._id));
      }
    };
    socket.on('getMessage', ({ messageData }: { messageData: IMessage }) => {
      if (messageData.sender._id !== user?._id) {
        setConversation(pre => {
          if (pre._id === messageData.conversationId) {
            return {
              ...pre,
              lastMessage:
                messageData.content ||
                `Đã gửi ${messageData.images.length} ảnh`,
              lastMessageAt: messageData.createdAt,
              unReadCount: pre.unReadCount.map(ur => {
                if (ur.userId === user?._id) {
                  return {
                    ...ur,
                    count: ur.count + 1,
                  };
                }
                return ur;
              }),
            };
          }
          return pre;
        });
      }
    });
    socket.on('getUser', onGetUsers);
    return () => {
      socket.off('getUser', onGetUsers);
    };
  }, [user]);
  useEffect(() => {
    if (lastMessageAt) {
      const update = () => {
        setDisplayTime(FormatDate(lastMessageAt, false));
      };
      update();
      const interval = setInterval(update, 30000);
      return () => clearInterval(interval);
    }
  }, [lastMessageAt]);
  if (!user) {
    return null;
  }
  const otherUser = conversation.members.find(m => m._id !== user._id);
  if (!otherUser) {
    return null;
  }
  return (
    <div
      className="flex items-center justify-between p-2"
      onClick={() => {
        dispatch(startConversation(_id));
        setOpen('');
        seenMessage(conversation._id);
      }}
    >
      <div className="flex w-full cursor-pointer items-center gap-2.5 rounded-[8px] hover:bg-(--hoverColor)">
        <div className="relative h-17 w-17 rounded-[50%] p-1.5">
          <img
            src={
              otherUser.avatar
                ? API_URL + `avatars/${otherUser.avatar}`
                : noAvatar
            }
            alt=""
            className="h-full w-full rounded-[50%] object-cover"
          />
          {usersOnline.includes(otherUser._id) && (
            <div className="absolute right-1.5 bottom-1.5 h-3 w-3 rounded-[50%] border-2 border-white bg-[#24832c]"></div>
          )}
        </div>
        <div className="flex flex-1 flex-col">
          <div className="mb-1 flex items-center gap-1.5">
            <span className="text-[14px] font-bold">
              {conversation.groupName
                ? conversation.groupName
                : otherUser.firstName + ' ' + otherUser.lastName}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <p
              className={`max-w-[177px] overflow-hidden text-xs text-ellipsis whitespace-nowrap text-[#666] ${conversation.unReadCount.length > 0 ? 'font-bold' : ''}`}
              style={{ color: unReadCount > 0 ? 'var(--textColor)' : '' }}
            >
              {conversation.lastSenderId._id == user._id
                ? `You: ${conversation.lastMessage}`
                : conversation.lastMessage}
            </p>
            <span className="text-xs text-[#666]">{displayTime}</span>
          </div>
        </div>
        {(conversation.unReadCount.find(item => item.userId === user._id)
          ?.count || 0) > 0 && (
          <span className="mr-2.5 flex h-3 w-3 items-center justify-center rounded-[50%] bg-[#005FC6]"></span>
        )}
      </div>
    </div>
  );
};

export default Conversation;

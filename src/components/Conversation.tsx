import noAvatar from '@/assets/avatars/noavatar.png';
import { startConversation } from '@/features/conversation/conversation.slice';
import { UseAppDispatch } from '@/store';
import { FormatDate } from '@/utils/formatDate';

interface Props {
  _id: string;
  members: {
    _id: string;
    firstName: string;
    lastName: string;
  }[];
  avatar: string;
  groupName: string | null;
  lastMessage: string;
  lastMessageAt: Date;
  unReadCount: number;
  lastSenderId: string;
  setOpen: React.Dispatch<React.SetStateAction<string>>;
}

const Conversation = ({
  _id,
  members,
  avatar,
  groupName,
  lastMessage,
  lastMessageAt,
  unReadCount,
  lastSenderId,
  setOpen,
}: Props) => {
  const dispatch = UseAppDispatch();
  return (
    <div
      className="flex items-center justify-between p-2"
      onClick={() => {
        dispatch(startConversation(_id));
        setOpen('');
      }}
    >
      <div className="flex w-full cursor-pointer items-center gap-2.5 rounded-[8px] hover:bg-(--hoverColor)">
        <div className="h-17 w-17 overflow-hidden rounded-[50%] p-1.5">
          <img
            src={avatar || noAvatar}
            alt=""
            className="h-full w-full rounded-[50%]"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="mb-1 flex items-center gap-1.5">
            <span className="text-[14px] font-bold">
              {groupName
                ? groupName
                : members[1].firstName + ' ' + members[1].lastName}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <p
              className={`line-clamp-1 max-w-[177px] text-xs text-[#666] ${unReadCount > 0 ? 'font-bold' : ''}`}
              style={{ color: unReadCount > 0 ? 'var(--textColor)' : '' }}
            >
              {lastSenderId === 'You' ? `You: ${lastMessage}` : lastMessage}
            </p>
            <span className="text-xs text-[#666]">
              {FormatDate(lastMessageAt, false)}
            </span>
          </div>
        </div>
        {unReadCount > 0 && (
          <span className="mr-2.5 flex h-3 w-3 items-center justify-center rounded-[50%] bg-[#005FC6]"></span>
        )}
      </div>
    </div>
  );
};

export default Conversation;

import { useContext } from 'react';
import { useSelector } from 'react-redux';

import Conversation from '@/components/Conversation';
import LanguageContext from '@/contexts/LanguageContext';
import { useGetConversationsQuery } from '@/features/conversation/conversation.slice.api';
import type { RootState } from '@/store';

const Conversations = ({
  active,
  setOpen,
}: {
  active: string;
  setOpen: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data } = useGetConversationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const conversations = data?.data.conversations;
  const myId = useSelector((state: RootState) => state.auth.user?._id);
  const languageContext = useContext(LanguageContext);
  if (!languageContext) {
    return null;
  }
  if (!conversations) {
    return null;
  }
  const { language, translate } = languageContext;
  const arrangeConversations = [...conversations].sort(
    (a, b) =>
      new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime(),
  );
  const filterConversations = arrangeConversations.filter(convo => {
    if (active === translate(language, 'all')) {
      return true;
    } else if (active === translate(language, 'unread')) {
      return (
        convo.unReadCount.find(item => item.userId === myId)?.count ?? 0 > 0
      );
    } else if (active === translate(language, 'group')) {
      return convo.type === 'group';
    }
  });
  if (
    filterConversations.filter(convo => convo.lastMessage !== '').length === 0
  ) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">Không có cuộc trò chuyện nào</p>
      </div>
    );
  }
  return (
    <>
      <div className="xs:no-scrollbar custom-scrollbar flex flex-1 flex-col overflow-y-auto">
        {filterConversations
          .filter(convo => convo.lastMessage !== '')
          .map(convo => (
            <Conversation
              key={convo._id}
              _id={convo._id}
              convo={convo}
              members={convo.members}
              avatar={convo.avatar}
              groupName={convo.groupName}
              lastMessage={convo.lastMessage}
              lastMessageAt={convo.lastMessageAt}
              lastSenderId={
                convo.lastSenderId?._id === myId
                  ? 'You'
                  : convo.lastSenderId?._id
              }
              unReadCount={
                convo.unReadCount.find(item => item.userId === myId)?.count || 0
              }
              setOpen={setOpen}
            />
          ))}
      </div>
    </>
  );
};

export default Conversations;

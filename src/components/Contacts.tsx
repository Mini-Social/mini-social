import { useContext } from 'react';
import { useSelector } from 'react-redux';

import noAvatar from '@/assets/avatars/noavatar.png';
import LanguageContext from '@/contexts/LanguageContext';
import { setCredential } from '@/features/auth/auth.slice';
import { startConversation } from '@/features/conversation/conversation.slice';
import { useCreatePrivateConversationMutation } from '@/features/conversation/conversation.slice.api';
import { useSeenMessageMutation } from '@/features/message/message.slice.api';
import { UseAppDispatch, type RootState } from '@/store';

const API_URL = import.meta.env.VITE_API_URL;
const Contacts = ({
  search,
  setOpen,
}: {
  search: string;
  setOpen: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = UseAppDispatch();
  const [createPrivateConversation] = useCreatePrivateConversationMutation();
  const [seenMessage] = useSeenMessageMutation();
  const languageContext = useContext(LanguageContext);
  if (!languageContext) {
    return null;
  }
  if (!user) {
    return null;
  }
  const friends = user.friends;
  const { language, translate } = languageContext;
  const filterFriends = friends.filter(
    friend =>
      friend.firstName.toLowerCase().includes(search.toLowerCase()) ||
      friend.lastName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="custom-scrollbar flex-1 overflow-y-auto p-1.5">
      <span className="p-2 text-[14px] font-bold text-[#65686c]">
        {language === 'vi'
          ? translate(language, 'contact') + ' ' + translate(language, 'your')
          : translate(language, 'your') +
            ' ' +
            translate(language, 'contact').toLowerCase()}
      </span>
      {filterFriends.map(friend => (
        <div
          onClick={async () => {
            setOpen('');
            const res = await createPrivateConversation(friend._id).unwrap();
            if (res.data.conversation) {
              seenMessage(res.data.conversation._id);
              dispatch(startConversation(res.data.conversation._id));
              dispatch(
                setCredential({
                  ...user,
                  friends: [...friends],
                }),
              );
            }
          }}
          key={friend._id}
          className="flex cursor-pointer items-center gap-2.5 rounded-[8px] p-1 hover:bg-(--hoverColor)"
        >
          <div className="h-12 w-12 overflow-hidden rounded-[50%] p-1.5">
            <img
              src={
                friend.avatar ? API_URL + `/avatars/${friend.avatar}` : noAvatar
              }
              alt=""
              className="h-full w-full rounded-[50%]"
            />
          </div>
          <span className="text-[14px] font-extralight">
            {friend.firstName} {friend.lastName}
          </span>
        </div>
      ))}
      {
        filterFriends.length === 0 && <p className='w-full h-full flex items-center justify-center text-gray-500'>{translate(language, 'noContact')}</p>
      }
    </div>
  );
};
export default Contacts;

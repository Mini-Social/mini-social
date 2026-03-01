import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import noAvatar from '@/assets/avatars/noavatar.png';
import angry from '@/assets/icons/angry.svg';
import haha from '@/assets/icons/haha.svg';
import like from '@/assets/icons/like.svg';
import love from '@/assets/icons/love.svg';
import sad from '@/assets/icons/sad.svg';
import wow from '@/assets/icons/wow.svg';
import LanguageContext from '@/contexts/LanguageContext';
import { startConversation } from '@/features/conversation/conversation.slice';
import { useCreatePrivateConversationMutation } from '@/features/conversation/conversation.slice.api';
import {
  useCancelFriendRequestMutation,
  useGetSentFriendRequestsQuery,
  useSendFriendRequestMutation,
} from '@/features/friendRequest/friendRequest.slice.api';
import { closeReactModel } from '@/features/post/post.slice';
import { socket } from '@/socket';
import type { RootState } from '@/store';
import { UseAppDispatch } from '@/store';
import type { IFriendRequest } from '@/types/friendRequest.type';

type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
const iconsReaction: Record<ReactionType, string> = {
  like,
  love,
  haha,
  wow,
  sad,
  angry,
};
interface Props {
  id: string;
  userName: string;
  avatar: string;
  react: ReactionType;
  firstName: string;
  lastName: string;
  isFriend: boolean | undefined;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}
const API_URL = import.meta.env.VITE_API_URL;
const UserReaction = ({
  id,
  userName,
  avatar,
  react,
  firstName,
  lastName,
  isFriend,
  setActive,
}: Props) => {
  const ownUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = UseAppDispatch();
  const [sendFriendRequest] = useSendFriendRequestMutation();
  const { data: FriendRequestData } = useGetSentFriendRequestsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [createConversation] = useCreatePrivateConversationMutation();
  const [cancelFriendRequest] = useCancelFriendRequestMutation();
  const [friendRequest, setFriendRequest] = useState<IFriendRequest[]>([]);
  const languageContext = useContext(LanguageContext);

  useEffect(() => {
    if (FriendRequestData?.data) {
      setFriendRequest(FriendRequestData?.data);
    }
  }, [FriendRequestData?.data]);
  if (!languageContext) {
    return null;
  }
  const { language, translate } = languageContext;
  const isSendRequest = friendRequest?.some(f => f.receiver._id === id);
  return (
    <>
      <li className="flex h-14 items-center justify-between px-2">
        <Link
          className="text-inherit!"
          to={`/profile/${userName}`}
          onClick={() => {
            dispatch(closeReactModel());
            setActive('all');
          }}
        >
          <div className="flex shrink-0 cursor-pointer items-center gap-4">
            <div className="relative h-10 w-10 shrink-0 rounded-[50%]">
              <img
                src={avatar ? API_URL + `/avatars/${avatar}` : noAvatar}
                alt=""
                className="h-full w-full rounded-[50%] object-cover"
              />
              <div className="absolute right-0 bottom-0">
                <img src={iconsReaction[react]} alt="" className="h-4 w-4" />
              </div>
            </div>
            <span className="text-[15px] font-medium">{`${firstName} ${lastName}`}</span>
          </div>
        </Link>
        <div>
          {id !== ownUser?._id && (
            <button
              className="flex items-center gap-2.5 bg-(--closeColor)! hover:border-transparent! hover:opacity-80!"
              onClick={async () => {
                if (!isFriend && !isSendRequest) {
                  const res = await sendFriendRequest(id || '').unwrap();
                  setFriendRequest([...friendRequest, res.data]);
                  socket.emit('sendFriendRequest', {
                    requestData: res.data,
                  });
                  return;
                }
                if (isFriend && !isSendRequest) {
                  dispatch(closeReactModel());
                  dispatch(close);
                  const res = await createConversation(id || '').unwrap();
                  if (res.data) {
                    dispatch(startConversation(res.data.conversation._id));
                  }
                  return;
                }
                if (isSendRequest) {
                  const requestId = friendRequest.find(
                    fr => fr.receiver._id === id,
                  )?._id;
                  if (!requestId) {
                    return;
                  }
                  setFriendRequest(
                    friendRequest.filter(fr => fr._id !== requestId),
                  );
                  const res = await cancelFriendRequest(requestId).unwrap();
                  socket.emit('cancelFriendRequest', res.data);
                }
              }}
            >
              {!isFriend && !isSendRequest && (
                <>
                  <PersonAddIcon fontSize="small" />
                  <span>{translate(language, 'addFriend')}</span>
                </>
              )}

              {isSendRequest && (
                <>
                  <PersonRemoveIcon fontSize="small" />
                  <span>{translate(language, 'cancelAddFriend')}</span>
                </>
              )}

              {isFriend && !isSendRequest && (
                <>
                  <FontAwesomeIcon icon={faFacebookMessenger} />
                  <span>{translate(language, 'message')}</span>
                </>
              )}
            </button>
          )}
        </div>
      </li>
    </>
  );
};

export default UserReaction;

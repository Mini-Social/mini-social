import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import noAvatar from '@/assets/avatars/noavatar.png';
import LanguageContext from '@/contexts/LanguageContext';
import { setCredential } from '@/features/auth/auth.slice';
import { startConversation } from '@/features/conversation/conversation.slice';
import { useCreatePrivateConversationMutation } from '@/features/conversation/conversation.slice.api';
import {
  useAcceptFriendRequestMutation,
  useGetFriendRequestsQuery,
  useGetSentFriendRequestsQuery,
  useRejectFriendRequestMutation,
} from '@/features/friendRequest/friendRequest.slice.api';
import { useSeenMessageMutation } from '@/features/message/message.slice.api';
import { socket } from '@/socket';
import { UseAppDispatch, type RootState } from '@/store';
import type { IFriendRequest } from '@/types/friendRequest.type';

const API_URL = import.meta.env.VITE_API_URL;
const RightBar = () => {
  const dispatch = UseAppDispatch();
  const [createPrivateConversation] = useCreatePrivateConversationMutation();
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const [rejectFriendRequest] = useRejectFriendRequestMutation();
  const { data: receivedRequests, refetch: refetchReceivedRequests } =
    useGetFriendRequestsQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  const [seenMessage] = useSeenMessageMutation();
  const { data: friendRequests } = useGetSentFriendRequestsQuery();
  const [requestIdList, setRequestIdList] = useState<string[]>([]);
  // const [receivedRequest, setReceivedRequest] = useState<
  //   { userId: string; requestId: string }[]
  // >([]);
  const languageContext = useContext(LanguageContext);
  // const [addFriendsList, setaddFriendsList] = useState<
  //   { userId: string; requestId: string }[]
  // >([]);
  // const [isFriend, setIsFriend] = useState<string[]>([]);
  const [requests, setRequests] = useState<IFriendRequest[]>([]);
  useEffect(() => {
    setRequests(receivedRequests?.data || []);
    // setaddFriendsList(
    //   friendRequests?.data.map(fr => ({
    //     userId: fr.receiver._id,
    //     requestId: fr._id,
    //   })) || [],
    // );
    setRequestIdList(receivedRequests?.data.map(fr => fr.sender._id) || []);
    // setReceivedRequest(
    //   receivedRequests?.data.map(fr => ({
    //     userId: fr.sender._id,
    //     requestId: fr._id,
    //   })) || [],
    // );
  }, [friendRequests, receivedRequests]);
  const user = useSelector((state: RootState) => state.auth.user);
  const [friends, setFriends] = useState<
    | {
        _id: string;
        userName: string;
        firstName: string;
        lastName: string;
        avatar: string;
      }[]
    | undefined
  >(user?.friends);
  const [onlineFriends, setOnlineFriends] = useState<
    | {
        _id: string;
      }[]
    | undefined
  >([]);
  useEffect(() => {
    const onGetUsers = (users: { userId: string; socketId: string }[]) => {
      if (friends && friends.length > 0) {
        const onlineUser = friends.filter(f =>
          users.some(u => u.userId === f._id),
        );
        setOnlineFriends(onlineUser);
      }
    };
    socket.on('getUser', onGetUsers);

    return () => {
      socket.off('getUser', onGetUsers);
    };
  }, [friends, onlineFriends]);

  useEffect(() => {
    socket.on('sendFriendRequest', (requestData: IFriendRequest) => {
      setRequests(prev => [...prev, requestData]);
    });
    socket.on('cancelFriendRequest', requestId => {
      setRequests(prev => prev.filter(fr => fr._id !== requestId));
    });
  }, []);
  useEffect(() => {
    setFriends(user?.friends);
  }, [user]);
  useEffect(() => {
    socket.on(
      'acceptFriendRequest',
      ({
        requestData,
        isOnline,
        isSender,
      }: {
        requestData: IFriendRequest;
        isOnline: string;
        isSender: boolean;
      }) => {
        setOnlineFriends(prev => [...(prev || []), { _id: isOnline }]);
        if (isSender) {
          setFriends(prev => [...(prev || []), requestData.receiver]);
        } else {
          setFriends(prev => [...(prev || []), requestData.sender]);
        }
      },
    );
  }, []);
  if (!languageContext) {
    return null;
  }
  if (!user) {
    return null;
  }
  const { language, translate } = languageContext;
  return (
    <div className="no-scrollbar sticky top-17.5 hidden h-[calc(100vh-70px)] flex-3 shrink-0 overflow-auto p-5 lg:block">
      <div>
        <div className="bg-background mb-5 shadow-[0px_0px_35px_0px_rgba(0_0_0/0.1)]">
          <span className="mb-4.5 block px-5 pt-5 text-xs text-[#808080]">
            Lời mời kết bạn
          </span>
          {requests?.length > 0 ? (
            requests.map(req => (
              <Link
                key={req._id}
                className="text-inherit!"
                to={`/profile/${req.sender.userName}`}
              >
                <div className="hover:bg-accent flex cursor-pointer items-center justify-between px-8 py-3">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        req.sender.avatar
                          ? API_URL + `/avatars/${req.sender.avatar}`
                          : noAvatar
                      }
                      alt=""
                      className="h-10 w-10 shrink-0 rounded-[50%] object-cover"
                    />
                    <span className="text-textColor text-[13px] font-medium">
                      {req.sender.firstName + ' ' + req.sender.lastName}
                    </span>
                  </div>
                  {
                    <>
                      {!requestIdList.includes(req._id) && (
                        // !isFriend.includes(req._id) &&
                        <div className="flex gap-2">
                          <button
                            className="rounded-md border-none! bg-blue-600! py-1.5 text-xs! font-bold text-white! transition hover:bg-blue-500!"
                            onClick={e => {
                              e.preventDefault();
                              acceptFriendRequest(req._id);
                              refetchReceivedRequests();
                              socket.emit('acceptFriendRequest', {
                                requestData: req,
                              });
                            }}
                          >
                            {translate(language, 'confirm')}
                          </button>
                          <button
                            className="rounded-md border-none! bg-[#4e4f50]! py-1.5 text-xs! font-bold text-gray-200! transition hover:bg-[#5e5f60]!"
                            onClick={e => {
                              e.preventDefault();
                              setRequests(prev =>
                                prev.filter(fr => fr._id !== req._id),
                              );
                              rejectFriendRequest(req._id);
                              refetchReceivedRequests();
                              socket.emit('rejectFriendRequest', req);
                            }}
                          >
                            {translate(language, 'remove')}
                          </button>
                        </div>
                      )}
                    </>
                  }
                </div>
              </Link>
            ))
          ) : (
            <div className="animate-in fade-in flex flex-col items-center justify-center px-4 py-10 duration-500">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-(--gray200)">
                <PersonAddIcon
                  className="text-(--textColor) opacity-20"
                  style={{ fontSize: 32 }}
                />
              </div>
              <h3 className="mb-1 text-[15px] font-semibold text-(--textColor)">
                Không có lời mời kết bạn mới
              </h3>

              <p className="max-w-[200px] text-center text-[13px] leading-5 text-(--textColor2)">
                Khi có người gửi lời mời kết bạn cho bạn, chúng sẽ xuất hiện ở
                đây.
              </p>

              {/* <button className="mt-4 text-[#0866ff] text-sm font-semibold hover:bg-[#0866ff]/10 px-4 py-2 rounded-lg transition-all">
    Xem gợi ý kết bạn
  </button> */}
            </div>
          )}
        </div>
        <div className="bg-background mb-5 shadow-[0px_0px_35px_0px_rgba(0_0_0/0.1)]">
          <span className="mb-4.5 block px-5 pt-5 text-xs text-[#808080]">
            {' ' + translate(language, 'friend')}
          </span>
          {friends && friends.length > 0 ? (
            friends.map(u => (
              <div
                className="hover:bg-accent flex cursor-pointer items-center gap-2.5 p-3 px-8"
                key={u._id}
                onClick={async () => {
                  const res = await createPrivateConversation(u._id).unwrap();
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
              >
                <div className="relative h-10 w-10 shrink-0 rounded-[50%]">
                  <img
                    src={u.avatar ? API_URL + `/avatars/${u.avatar}` : noAvatar}
                    alt=""
                    className="h-full w-full rounded-[50%] object-cover"
                  />
                  {onlineFriends?.some(
                    onlineUser => onlineUser._id === u._id,
                  ) && (
                    <div className="absolute right-0 bottom-0 h-3 w-3 rounded-[50%] border-2 border-white bg-[#24832c]"></div>
                  )}
                </div>
                <span className="text-textColor text-[13px] font-medium">{`${u.firstName} ${u.lastName}`}</span>
              </div>
            ))
          ) : (
            <div className="group mt-4 flex flex-col items-center justify-center rounded-2xl border-white/10 p-8 backdrop-blur-md transition-all duration-300 hover:border-green-500/30">
              <div className="relative mb-4">
                <div className="absolute inset-0"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="animate-bounce-slow relative z-10 h-12 w-12 text-gray-500 transition-colors group-hover:text-green-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                  />
                </svg>
              </div>

              {/* Text Content */}
              <h4 className="mb-2 text-base font-semibold text-gray-400">
                Yên tĩnh quá nhỉ?
              </h4>
              <p className="mb-6 max-w-[200px] text-center text-sm leading-relaxed text-gray-500">
                Hiện chưa có bạn bè. Hãy bắt đầu một cuộc trò chuyện mới!
              </p>

              {/* Button Action */}
              {/* <button className="px-5 py-2 rounded-full border border-green-500/50 text-green-400 text-xs font-medium hover:bg-green-500 hover:text-gray-900 hover:shadow-[0_0_15px_rgba(74,222,128,0.4)] transition-all active:scale-95">
    Tìm bạn mới
  </button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightBar;

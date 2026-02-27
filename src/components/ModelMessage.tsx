import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import CallIcon from '@mui/icons-material/Call';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import RemoveIcon from '@mui/icons-material/Remove';
import VideocamIcon from '@mui/icons-material/Videocam';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

import noAvatar from '@/assets/avatars/noavatar.png';
import SendIcon from '@/assets/icons/send-message.png';
import Messages from '@/components/Messages';
import { DarkModeContext } from '@/contexts/DarkModeContext';
import LanguageContext from '@/contexts/LanguageContext';
import { closeConversation } from '@/features/conversation/conversation.slice';
import {
  useGetMessagesQuery,
  useSeenMessageMutation,
  useSendPrivateMessageMutation,
} from '@/features/message/message.slice.api';
import { socket } from '@/socket';
import { UseAppDispatch, type RootState } from '@/store';
import type { errorResponseType2 } from '@/types/auth.type';
import type { IMessage } from '@/types/message.type';
import { FormatDate } from '@/utils/formatDate';

// {
//   _id: '65a8ef99e9b1a12f9c000222',
//   firstName: 'Anh',
//   lastName: 'Nguyễn Văn',
//   userName: 'anhnguyen_dev',
//   email: 'anh.nguyen@example.com',
//   password: 'hashed_password_456',
//   avatar: 'https://i.pravatar.cc/150?img=1',
//   bio: 'React & Node.js Developer',
//   gender: 'Male',
//   phone: '0912345678',
//   birthDate: '1995-12-10T00:00:00.000Z',
//   role: 'User',
//   friends: ['65a8ef88e9b1a12f9c000111', '65a8ef77e9b1a12f9c000333'],
//   isOnline: false,
//   lastOnline: '2026-01-17T15:00:00.000Z',
//   deleted: false,
//   createdAt: '2025-11-15T09:00:00.000Z',
//   updatedAt: '2026-01-17T15:00:00.000Z'
// },
// {
//   _id: '65a8ef66e9b1a12f9c000444',
//   firstName: 'Bảo',
//   lastName: 'Trần Thị',
//   userName: 'baotran_96',
//   email: 'bao.tran@example.com',
//   password: 'hashed_password_789',
//   avatar: 'https://i.pravatar.cc/150?img=5',
//   bio: 'Yêu màu hồng, ghét sự giả dối ✨',
//   gender: 'Female',
//   phone: '0922334455',
//   birthDate: '1996-03-08T00:00:00.000Z',
//   role: 'User',
//   friends: ['65a8ef88e9b1a12f9c000111'],
//   isOnline: true,
//   lastOnline: '2026-01-17T17:34:00.000Z',
//   deleted: false,
//   createdAt: '2025-12-01T10:00:00.000Z',
//   updatedAt: '2026-01-17T17:34:00.000Z'
// },
// {
//   _id: '65a8ef77e9b1a12f9c000333',
//   firstName: 'Cường',
//   lastName: 'Lê Hoàng',
//   userName: 'cuongle_admin',
//   email: 'admin.cuong@example.com',
//   password: 'hashed_password_admin',
//   avatar: 'https://i.pravatar.cc/150?img=8',
//   bio: 'System Administrator',
//   gender: 'Male',
//   phone: '0988887777',
//   birthDate: '1990-01-01T00:00:00.000Z',
//   role: 'Admin',
//   friends: ['65a8ef99e9b1a12f9c000222', '65a8ef55e9b1a12f9c000555'],
//   isOnline: false,
//   lastOnline: '2026-01-16T23:00:00.000Z',
//   deleted: false,
//   createdAt: '2025-01-01T00:00:00.000Z',
//   updatedAt: '2026-01-16T23:00:00.000Z'
// },
// {
//   _id: '65a8ef55e9b1a12f9c000555',
//   firstName: 'Dũng',
//   lastName: 'Phạm Minh',
//   userName: 'dungpham_minh',
//   email: 'dung.pham@example.com',
//   password: 'hashed_password_abc',
//   avatar: 'https://i.pravatar.cc/150?img=12',
//   bio: 'Traveler & Blogger ✈️',
//   gender: 'Male',
//   phone: '0944556677',
//   birthDate: '1998-07-15T00:00:00.000Z',
//   role: 'User',
//   friends: ['65a8ef77e9b1a12f9c000333'],
//   isOnline: true,
//   lastOnline: '2026-01-17T16:45:00.000Z',
//   deleted: false,
//   createdAt: '2025-05-10T14:20:00.000Z',
//   updatedAt: '2026-01-17T16:45:00.000Z'
// },
// {
//   _id: '65a8ef22e9b1a12f9c000888',
//   firstName: 'Em',
//   lastName: 'Hoàng Anh',
//   userName: 'emhoang_anh',
//   email: 'em.hoang@example.com',
//   password: 'hashed_password_xyz',
//   avatar: '', // Không có avatar
//   bio: '',
//   gender: 'Female',
//   phone: '',
//   birthDate: null,
//   role: 'User',
//   friends: [],
//   isOnline: true,
//   lastOnline: '2026-01-17T17:10:00.000Z',
//   deleted: false,
//   createdAt: '2026-01-10T09:15:00.000Z',
//   updatedAt: '2026-01-17T17:10:00.000Z'
// },
// {
//   _id: '65a8ef11e9b1a12f9c000999',
//   firstName: 'Phương',
//   lastName: 'Võ Thị',
//   userName: 'phuongvo_cute',
//   email: 'phuong.vo@example.com',
//   password: 'hashed_password_p1',
//   avatar: 'https://i.pravatar.cc/150?img=16',
//   bio: 'Designer tại TP.HCM',
//   gender: 'Female',
//   phone: '0977112233',
//   birthDate: '2000-02-28T00:00:00.000Z',
//   role: 'User',
//   friends: ['65a8ef00e9b1a12f9c001010'],
//   isOnline: false,
//   lastOnline: '2026-01-15T08:30:00.000Z',
//   deleted: false,
//   createdAt: '2025-08-20T11:00:00.000Z',
//   updatedAt: '2026-01-15T08:30:00.000Z'
// },
// {
//   _id: '65a8ef00e9b1a12f9c001010',
//   firstName: 'Huy',
//   lastName: 'Đặng Quốc',
//   userName: 'huy_dang_97',
//   email: 'huy.dang@example.com',
//   password: 'hashed_password_h1',
//   avatar: 'https://i.pravatar.cc/150?img=11',
//   bio: 'Thích xem phim hành động 🍿',
//   gender: 'Male',
//   phone: '0966554433',
//   birthDate: '1997-11-11T00:00:00.000Z',
//   role: 'User',
//   friends: ['65a8ef11e9b1a12f9c000999', '65a8ef44e9b1a12f9c000666'],
//   isOnline: true,
//   lastOnline: '2026-01-17T17:25:00.000Z',
//   deleted: false,
//   createdAt: '2025-09-12T16:40:00.000Z',
//   updatedAt: '2026-01-17T17:25:00.000Z'
// },
// {
//   _id: '65a8ef33e9b1a12f9c000777',
//   firstName: 'Mai',
//   lastName: 'Bùi Tuyết',
//   userName: 'maibui_tuyet',
//   email: 'mai.bui@example.com',
//   password: 'hashed_password_m1',
//   avatar: 'https://i.pravatar.cc/150?img=23',
//   bio: 'Kế toán viên chăm chỉ',
//   gender: 'Female',
//   phone: '0933442211',
//   birthDate: '1994-10-25T00:00:00.000Z',
//   role: 'User',
//   friends: [],
//   isOnline: false,
//   lastOnline: '2026-01-14T10:00:00.000Z',
//   deleted: false,
//   createdAt: '2025-06-25T07:30:00.000Z',
//   updatedAt: '2026-01-14T10:00:00.000Z'
// },
// {
//   _id: '65a8ef44e9b1a12f9c000666',
//   firstName: 'Tùng',
//   lastName: 'Lý Thanh',
//   userName: 'tungly_thanh',
//   email: 'tung.ly@example.com',
//   password: 'hashed_password_t1',
//   avatar: 'https://i.pravatar.cc/150?img=13',
//   bio: 'Gamer chuyên nghiệp 🎮',
//   gender: 'Male',
//   phone: '0900998877',
//   birthDate: '2002-04-30T00:00:00.000Z',
//   role: 'User',
//   friends: ['65a8ef00e9b1a12f9c001010'],
//   isOnline: true,
//   lastOnline: '2026-01-17T17:34:30.000Z',
//   deleted: false,
//   createdAt: '2025-12-20T22:00:00.000Z',
//   updatedAt: '2026-01-17T17:34:30.000Z'
// }
const API_URL = import.meta.env.VITE_API_URL;
const ModelMessage = () => {
  const conversationId = useSelector(
    (state: RootState) => state.conversation.conversationId,
  );
  const [sendPrivateMessage] = useSendPrivateMessageMutation();
  const user = useSelector((state: RootState) => state.auth.user);
  const { data } = useGetMessagesQuery(conversationId, {
    refetchOnMountOrArgChange: true,
  });
  const [seenMessage] = useSeenMessageMutation();
  const [isOpenEmoj, setIsOpenEmoj] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [preview, setPreview] = useState<string[]>([]);
  const [selectedImage, setSelectedImages] = useState<File[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const emojRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [lastClicked, setLastClicked] = useState<string | null>(null);
  const [arrivalMessage, setArrivalMessage] = useState<IMessage | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const timeoutTyping = useRef<number | null>(null);
  const [displayTime, setDisplayTime] = useState<string>('');
  const [online, setOnline] = useState<{
    isOnline: boolean;
    offlineTime: Date | null;
  }>();
  useEffect(() => {
    if (data && user?._id) {
      const otherUser = data.conversation.members.find(m => m._id !== user._id);
      if (otherUser) {
        setOnline({
          isOnline: Boolean(otherUser.isOnline),
          offlineTime: otherUser.lastOnline,
        });
      }
    }
    const handleStatusChange = (
      users: { userId: string; socketId: string }[],
    ) => {
      const otherUser = data?.conversation.members.find(
        m => m._id !== user?._id,
      );
      if (otherUser && otherUser.lastOnline) {
        const isCurrentlyOnline = users.some(u => u.userId === otherUser._id);
        setOnline({
          isOnline: isCurrentlyOnline,
          offlineTime: isCurrentlyOnline ? null : new Date(),
        });
        setDisplayTime(FormatDate(new Date(), true));
      }
    };

    socket.on('getUser', handleStatusChange);
    return () => {
      socket.off('getUser', handleStatusChange);
    };
  }, [data, user?._id]);
  useEffect(() => {
    if (data && user?._id) {
      const update = () => {
        if (online?.offlineTime) {
          setDisplayTime(FormatDate(online.offlineTime, true));
        }
      };
      update();
      const interval = setInterval(update, 30000);
      return () => clearInterval(interval);
    }
  }, [data, user?._id, online]);
  useEffect(() => {
    const maybeHandler = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        ref.current &&
        !ref.current.contains(target) &&
        emojRef.current &&
        !emojRef.current.contains(target)
      ) {
        handleToggleEmoj();
      }
    };
    document.addEventListener('mousedown', maybeHandler);

    return () => document.removeEventListener('mousedown', maybeHandler);
  }, []);
  useEffect(() => {
    moveCursorToEnd();
  }, [content]);
  // useEffect(() => {
  //   if (openModelMessage) {
  //     const isMobile = window.matchMedia('(max-width: 768px)').matches;
  //     if (!isMobile) {
  //       document.body.style.paddingRight = '15px';
  //     }
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'unset';
  //     document.body.style.paddingRight = '0px';
  //   }
  //   return () => {
  //     document.body.style.overflow = 'unset';
  //     document.body.style.paddingRight = '0px';
  //   };
  // }, [openModelMessage]);
  const handleToggleEmoj = () => {
    setIsOpenEmoj(pre => !pre);
  };
  const moveCursorToEnd = () => {
    if (textAreaRef.current) {
      const length = textAreaRef.current.value.length;
      textAreaRef.current.setSelectionRange(length, length);
      textAreaRef.current.focus();
    }
  };
  const handleSubmitForm = async (
    e?: FormEvent<HTMLFormElement>,
    type?: string,
  ) => {
    e?.preventDefault();
    if (!data) {
      return null;
    }
    let text = '';
    const actionType = type || lastClicked;
    const formData = new FormData();
    const otherUser = data.conversation.members.find(m => m._id !== user?._id);
    if (otherUser) {
      formData.append('receiver', otherUser._id);
    }
    if (actionType === 'content') {
      if (selectedImage.length > 0) {
        selectedImage.forEach(image => {
          formData.append('images', image);
        });
      }
      formData.append('content', content);
      text = content;
    } else if (actionType === 'icon') {
      formData.append('content', '👍');
      text = '👍';
    }

    formData.append('conversationId', conversationId);
    try {
      const { data } = await sendPrivateMessage(formData).unwrap();
      if (data && user) {
        const newMessage = {
          _id: data.message._id,
          conversationId,
          sender: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar || null,
          },
          content: text,
          readBy: data.message.readBy,
          images: data.message.images,
          createdAt: data.message.createdAt,
          updatedAt: data.message.updatedAt,
        };
        setMessages(pre => [...pre, newMessage]);
        socket.emit('sendMessage', {
          receiverId: otherUser?._id,
          messageData: newMessage,
        });
        setContent('');
        setPreview([]);
        setSelectedImages([]);
        scrollToBottom();
        socket.emit('cancelTyping', { receiverId: otherUser?._id });
      }
    } catch (error: unknown) {
      const errorType = error as errorResponseType2;
      console.log(errorType.data.message);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (preview.length > 0) {
      handleAddFile(e);
    } else if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedImages(files);
      const urls = files.map(url => URL.createObjectURL(url));
      setPreview(urls);
      textAreaRef.current?.focus();
    }
  };
  const handleRemoveImage = (indexToRemove: number) => {
    URL.revokeObjectURL(preview[indexToRemove]);
    setPreview(pre => pre.filter((_, index) => index !== indexToRemove));
    setSelectedImages(pre => pre.filter((_, index) => index !== indexToRemove));
  };
  const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedImages(pre => pre.concat(files));
      const urls = files.map(url => URL.createObjectURL(url));
      setPreview(pre => pre.concat(urls));
    }
  };
  const scrollToBottom = () => {
    contentRef?.current?.scrollTo({
      top: contentRef.current.scrollHeight,
    });
  };
  useEffect(() => {
    const getMessage = ({ messageData }: { messageData: IMessage }) => {
      setArrivalMessage(messageData);
      if (conversationId === messageData.conversationId) {
        seenMessage(messageData.conversationId);
        if (user) {
          socket.emit('markMessageAsRead', {
            conversationId: messageData.conversationId,
            receiver: messageData,
            sender: messageData.sender._id,
          });
        }
      }
    };
    socket.on('getMessage', getMessage);
    return () => {
      socket.off('getMessage', getMessage);
    };
  }, [conversationId, seenMessage, user]);
  useEffect(() => {
    if (data?.messages) {
      setMessages(data.messages);
    }
  }, [data?.messages]);
  useEffect(() => {
    if (arrivalMessage) {
      setMessages(prev => {
        const isExisted = prev.some(msg => msg._id === arrivalMessage._id);
        if (isExisted) {
          return prev;
        }
        return [...prev, arrivalMessage];
      });
    }
  }, [arrivalMessage]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(
    () => () => {
      if (timeoutTyping.current) {
        clearTimeout(timeoutTyping.current);
      }
    },
    [],
  );
  const darkModeContext = useContext(DarkModeContext);
  const languageContext = useContext(LanguageContext);
  const dispatch = UseAppDispatch();
  if (!darkModeContext) {
    return null;
  }
  if (!languageContext) {
    return null;
  }
  if (!user) {
    return null;
  }
  if (!data) {
    return null;
  }
  if (!conversationId) {
    return null;
  }
  const otherUser = data.conversation.members.find(m => m._id !== user._id);
  if (!otherUser) {
    return null;
  }

  const handleInputContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    socket.emit('typing', { receiverId: otherUser?._id });
    if (timeoutTyping.current) {
      clearTimeout(timeoutTyping.current);
    }
    timeoutTyping.current = setTimeout(() => {
      socket.emit('cancelTyping', { receiverId: otherUser?._id });
    }, 2000);
  };

  const { language, translate } = languageContext;
  const { darkMode } = darkModeContext;
  return (
    <div className="fixed bottom-0 z-100 lg:right-40">
      <div className="bg-background h-dvh w-screen rounded-tl-[12px] rounded-tr-[12px] lg:h-113 lg:w-82">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex flex-1 items-center justify-between border-b p-1.5">
            <div className="flex items-center gap-2.5">
              <Link to={`/profile/${otherUser?.userName}`}>
                <div className="relative h-8 w-8 shrink-0 rounded-[50%]">
                  <img
                    className="h-full w-full rounded-[50%] object-cover"
                    src={
                      otherUser.avatar
                        ? API_URL + `avatars/${otherUser.avatar}`
                        : noAvatar
                    }
                    alt=""
                  />
                  {online?.isOnline &&
                    user.friends.some(f => f._id === otherUser._id) && (
                      <div className="absolute right-0 bottom-0 h-3 w-3 rounded-[50%] border-2 border-white bg-[#24832c]"></div>
                    )}
                </div>
              </Link>
              <div className="flex h-full flex-col">
                <span className="font-medium">
                  {data?.conversation.type === 'group'
                    ? data.conversation.groupName
                    : otherUser.firstName + ' ' + otherUser.lastName}
                </span>
                <span className="text-xs text-gray-500">
                  {online?.isOnline
                    ? user.friends.some(f => f._id === otherUser._id) &&
                      translate(language, 'online')
                    : user.friends.some(f => f._id === otherUser._id) &&
                      `${translate(language, 'online')} ${displayTime}`}
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="cursor-pointer rounded-[50%] p-1 hover:bg-(--hoverColor)">
                <CallIcon
                  fontSize="small"
                  style={{
                    color: '#C261F2',
                  }}
                />
              </div>
              <div className="cursor-pointer rounded-[50%] p-1 hover:bg-(--hoverColor)">
                <VideocamIcon
                  fontSize="small"
                  style={{
                    color: '#C261F2',
                  }}
                />
              </div>
              <div className="cursor-pointer rounded-[50%] p-1 hover:bg-(--hoverColor)">
                <RemoveIcon
                  style={{
                    color: '#C261F2',
                  }}
                />
              </div>
              <div
                className="cursor-pointer rounded-[50%] p-1 hover:bg-(--hoverColor)"
                onClick={() => {
                  dispatch(closeConversation());
                }}
              >
                <CloseIcon
                  style={{
                    color: '#C261F2',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Body */}
          <div
            className="custom-scrollbar relative flex-10 overflow-y-auto"
            ref={contentRef}
          >
            {messages && (
              <Messages
                scrollToBottom={scrollToBottom}
                messages={messages}
                avatar={otherUser.avatar}
                name={
                  data.conversation.type === 'group' &&
                  data.conversation.groupName
                    ? data.conversation.groupName
                    : otherUser.firstName + ' ' + otherUser.lastName
                }
                otherUserId={otherUser._id}
              />
            )}
          </div>
          {/* Footer */}
          {isOpenEmoj && (
            <div
              className="absolute right-16 bottom-22 z-50 lg:bottom-18"
              onMouseDown={e => e.preventDefault()}
              ref={ref}
            >
              <EmojiPicker
                open={true}
                searchDisabled={true}
                theme={darkMode ? Theme.DARK : Theme.LIGHT}
                onEmojiClick={emojiData => {
                  setContent(pre => pre + emojiData.emoji);
                }}
                className="shadow-[0px_0px_40px_16px_rgba(0_0_0/0.2)]"
              />

              <div className="border-background absolute right-0 -bottom-5 border-15 border-b-transparent border-l-transparent"></div>
            </div>
          )}
          <div className="bg-background sticky bottom-0 flex-1 py-3">
            <form onSubmit={handleSubmitForm} encType="multipart/form-data">
              <div className="flex items-end justify-between gap-2">
                <label htmlFor="attachments">
                  <div className="cursor-pointer rounded-[50%] p-2 hover:bg-(--hover-color)">
                    <PhotoLibraryIcon
                      style={{
                        color: '#006AE9',
                      }}
                    />
                  </div>
                </label>
                <input
                  type="file"
                  id="attachments"
                  name="attachments"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  hidden
                />
                <div className="flex flex-1 flex-col items-start rounded-[20px] bg-(--background-primary) p-2">
                  {preview.length > 0 && (
                    <div className="custom-scrollbar mb-4 flex flex-1 items-center gap-2.5 overflow-auto p-2">
                      <label htmlFor="addImages">
                        <div className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-[10px] bg-gray-300 hover:bg-gray-400">
                          <AddToPhotosIcon />
                        </div>
                        <input
                          type="file"
                          id="addImages"
                          accept="image/*"
                          multiple
                          hidden
                          onChange={handleAddFile}
                        />
                      </label>
                      {preview.map((url, index) => (
                        <div key={index} className="relative shrink-0">
                          <img
                            src={url}
                            alt=""
                            className="h-12 w-12 rounded-[10px] object-cover"
                          />
                          <div
                            className="bg-background hover:bg-opacity-80 absolute top-0 right-0 flex h-6 w-6 translate-x-[30%] -translate-y-[30%] cursor-pointer items-center justify-center rounded-[50%]"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <CloseIcon
                              style={{
                                fontSize: 16,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex h-auto w-full overflow-hidden">
                    <TextareaAutosize
                      ref={textAreaRef}
                      maxRows={8}
                      placeholder="Aa"
                      name="content"
                      className="custom-scrollbar h-auto w-full resize-none bg-transparent text-[16px] outline-none placeholder:text-[13px] placeholder:text-[#808080] lg:text-[13px]"
                      value={content}
                      onChange={handleInputContent}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          if (
                            content.trim().length > 0 ||
                            selectedImage.length > 0
                          ) {
                            e.preventDefault();
                            handleSubmitForm(undefined, 'content');
                          }
                        }
                      }}
                    />
                    <div
                      className="cursor-pointer self-end rounded-[50%] hover:bg-gray-200"
                      onClick={handleToggleEmoj}
                      ref={emojRef}
                    >
                      <EmojiEmotionsIcon
                        style={{
                          color: '#006AE9',
                        }}
                      />
                    </div>
                  </div>
                </div>
                {content || preview.length > 0 ? (
                  <button
                    type="submit"
                    className="bg-background! border-none! p-0! hover:border-none!"
                    onClick={() => setLastClicked('content')}
                  >
                    {' '}
                    <div className="rounded-[50%] p-2 hover:bg-(--hover-color)">
                      <img
                        src={SendIcon}
                        alt=""
                        className="h-5 w-5 cursor-pointer"
                      />
                    </div>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-background! border-none! p-0! hover:border-none!"
                    onClick={() => setLastClicked('icon')}
                  >
                    <div className="cursor-pointer rounded-[50%] p-2 text-[17px] hover:bg-(--hover-color)">
                      👍
                    </div>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelMessage;

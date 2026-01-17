import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import CallIcon from '@mui/icons-material/Call';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import RemoveIcon from '@mui/icons-material/Remove';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VideocamIcon from '@mui/icons-material/Videocam';
import EmojiPicker from 'emoji-picker-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import noAvatar from '@/assets/avatars/noavatar.png';
import SendIcon from '@/assets/icons/send-message.png';
import Messages from '@/components/Messages';
import { FormatDate } from '@/utils/formatDate';

const user =
  {
    _id: '65a8ef88e9b1a12f9c000111',
    firstName: 'Khiêm',
    lastName: 'Ngô Gia',
    userName: 'khiemngo99',
    email: 'khiem.ngo@example.com',
    password: 'hashed_password_123', // Thực tế sẽ là chuỗi đã mã hóa
    avatar: 'https://i.pravatar.cc/150?img=60',
    bio: 'Đam mê lập trình và chơi bóng rổ 🏀',
    gender: 'Male',
    phone: '0901234567',
    birthDate: '1999-05-20T00:00:00.000Z',
    role: 'User',
    friends: ['65a8ef99e9b1a12f9c000222', '65a8ef66e9b1a12f9c000444'],
    isOnline: true,
    lastOnline: '2026-01-17T17:30:00.000',
    deleted: false,
    createdAt: '2025-10-01T08:00:00.000Z',
    updatedAt: '2026-01-17T17:30:00.000Z'
  }
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
interface Props {
  setOpenModelMessage: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModelMessage = ({ setOpenModelMessage }: Props) => {
  const [isOpenEmoj, setIsOpenEmoj] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [preview, setPreview] = useState<string[]>([]);
  const [selectedImage, setSelectedImages] = useState<File[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const emojRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
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
  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.dir(selectedImage);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (preview.length > 0) {
      handleAddFile(e);
    } else if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedImages(files);
      const urls = files.map(url => URL.createObjectURL(url));
      setPreview(urls);
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
  return (
    <div className="fixed lg:right-40 bottom-0 z-90">
      <div className="lg:h-113 lg:w-82 h-[calc(100vh-4rem)] w-screen rounded-tl-[12px] rounded-tr-[12px] bg-white">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex flex-1 items-center justify-between border-b p-1.5">
            <div className="flex items-center gap-2.5">
              <div className="relative h-8 w-8 rounded-[50%] shrink-0">
                <img
                  className="h-full w-full rounded-[50%]"
                  src={user.avatar || noAvatar}
                  alt=""
                />
                {user.isOnline && <div className="absolute right-0 bottom-0 h-3 w-3 rounded-[50%] border-2 border-white bg-[#24832c]"></div>}
              </div>
             <div className="flex flex-col h-full">
              <span className="font-medium">{user.firstName} {user.lastName}</span>
              <span className='text-xs text-gray-500'>{user.isOnline ? 'Online' : `Hoạt động ${FormatDate(user.lastOnline,true)}`}</span>
             </div>
            </div>

            <div className="flex items-center">
              <div className="cursor-pointer rounded-[50%] p-1 hover:bg-gray-200">
                <CallIcon
                  fontSize="small"
                  style={{
                    color: '#C261F2',
                  }}
                />
              </div>
              <div className="cursor-pointer rounded-[50%] p-1 hover:bg-gray-200">
                <VideocamIcon
                  fontSize="small"
                  style={{
                    color: '#C261F2',
                  }}
                />
              </div>
              <div className="cursor-pointer rounded-[50%] p-1 hover:bg-gray-200">
                <RemoveIcon
                  style={{
                    color: '#C261F2',
                  }}
                />
              </div>
              <div
                className="cursor-pointer rounded-[50%] p-1 hover:bg-gray-200"
                onClick={() => setOpenModelMessage(false)}
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
          <div className="custom-scrollbar flex-10 overflow-y-auto">
            <Messages />
          </div>
          {/* Footer */}
          {isOpenEmoj && (
            <div
              className="absolute bottom-22 lg:bottom-18 right-15 lg:-left-22 z-50"
              onMouseDown={e => e.preventDefault()}
              ref={ref}
            >
              <EmojiPicker
                open={true}
                searchDisabled={false}
                onEmojiClick={emojiData => {
                  setContent(pre => pre + emojiData.emoji);
                }}
                className="shadow-[0px_0px_40px_16px_rgba(0_0_0/0.2)]"
              />
              <div className="absolute right-[0.6px] -bottom-5 border-15 border-white border-b-transparent border-l-transparent"></div>
            </div>
          )}
          <div className="sticky bottom-0 flex-1 bg-white py-3">
            <form onSubmit={handleSubmitForm} encType="multipart/form-data">
              <div className="flex items-end justify-between gap-2">
                <label htmlFor="attachments">
                  <div className="cursor-pointer rounded-[50%] p-2 hover:bg-gray-200">
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
                <div className="flex flex-1 flex-col items-start rounded-[20px] bg-[#F0F2F5] p-2">
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
                            className="absolute top-0 right-0 flex h-6 w-6 translate-x-[30%] -translate-y-[30%] cursor-pointer items-center justify-center rounded-[50%] bg-white hover:bg-gray-100"
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
                      className="custom-scrollbar h-auto w-full resize-none outline-none"
                      value={content}
                      onChange={e => setContent(e.target.value)}
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
                    className="border-none! p-0! hover:border-none!"
                  >
                    {' '}
                    <div className="rounded-[50%] p-2 hover:bg-gray-200">
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
                    className="border-none! p-0! hover:border-none!"
                  >
                    <div className="cursor-pointer rounded-[50%] p-2 hover:bg-gray-200">
                      <ThumbUpIcon
                        fontSize="small"
                        style={{
                          color: '#006AE9',
                        }}
                      />
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

import CloseIcon from '@mui/icons-material/Close';
import {
  Image,
  X,
  Smile,
  MapPin,
  UserPlus,
  MoreHorizontal,
  Globe,
  Users,
  Lock,
  Check,
} from 'lucide-react';
import React, { useState, useRef, useEffect, type SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import noAvatar from '@/assets/avatars/noavatar.png';
import PostImages from '@/components/PostImages';
import {
  useAddPostMutation,
  useUpdatePostMutation,
} from '@/features/post/post.api.slice';
import { stopEditPost } from '@/features/post/post.slice';
import { UseAppDispatch, type RootState } from '@/store';
import type { errorResponseType2 } from '@/types/auth.type';
// Định nghĩa các tùy chọn quyền riêng tư
const visibility_OPTIONS = [
  {
    id: 'public',
    label: 'Công khai',
    icon: <Globe size={16} />,
    desc: 'Bất kỳ ai cũng có thể xem',
  },
  {
    id: 'friends',
    label: 'Bạn bè',
    icon: <Users size={16} />,
    desc: 'Chỉ bạn bè của bạn mới thấy',
  },
  {
    id: 'private',
    label: 'Chỉ mình tôi',
    icon: <Lock size={16} />,
    desc: 'Chỉ mình bạn có quyền xem',
  },
];
const API_URL = import.meta.env.VITE_API_URL;
interface Props {
  openModel: string;
  onClose: React.Dispatch<SetStateAction<string>>;
}

const ModelCreatePost = ({ openModel, onClose }: Props) => {
  const [addPost] = useAddPostMutation();
  const [updatePost] = useUpdatePostMutation();
  const dispatch = UseAppDispatch();
  const ownUser = useSelector((state: RootState) => state.auth.user);
  const selectPost = useSelector((state: RootState) => state.post.postSelect);
  const [text, setText] = useState(selectPost?.content || '');
  const [selectedImages, setSelectedImages] = useState<string[]>(
    selectPost?.images || [],
  );
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const visibilityValue =
    visibility_OPTIONS.find(vi => vi.id === selectPost?.visibility) ||
    visibility_OPTIONS[0];
  const [visibility, setVisibility] = useState(visibilityValue);
  const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const visibilityRef = useRef<HTMLDivElement>(null);

  // Xử lý Click Outside để đóng menu quyền riêng tư
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        visibilityRef.current &&
        !visibilityRef.current.contains(event.target as Node)
      ) {
        setIsVisibilityOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Preview ảnh
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imageUrls = Array.from(e.target.files).map(file => {
        setSelectedFiles(prev => [...prev, file]);
        return URL.createObjectURL(file);
      });
      setSelectedImages(prev => [...prev, ...imageUrls]);
    }
  };

  const removeImage = () => {
    setSelectedImages([]);
    setSelectedFiles([]);
  };
  const handleCloseModel = () => {
    onClose('');
    setText('');
    removeImage();
    dispatch(stopEditPost());
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('content', text);
    formData.append('visibility', visibility.id);
    if (selectedFiles.length > 0) {
      selectedFiles.forEach(file => formData.append('images', file));
    }
    if (selectPost) {
      const imagesToKeep = selectedImages.filter(
        image => !image.startsWith('blob:'),
      );
      imagesToKeep.forEach(image => formData.append('oldImages', image));
      try {
        await updatePost({
          id: selectPost._id,
          body: formData,
        }).unwrap();
        toast.success('update post successfully!');
      } catch (error) {
        const errorType = error as errorResponseType2;
        if (errorType) {
          toast.error(errorType.data.message);
        }
      }
      dispatch(stopEditPost());
    } else {
      try {
        await addPost(formData).unwrap();
        toast.success('Add post successfully!');
      } catch (error) {
        const errorType = error as errorResponseType2;
        if (errorType) {
          toast.error(errorType.data.message);
        }
      }
    }
    setSelectedFiles([]);
    setSelectedImages([]);
    setText('');
    setVisibility(visibility_OPTIONS[0]);
    onClose('');
  };

  if (openModel !== 'post-model') {
    return null;
  }
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="animate-in zoom-in flex w-full max-w-[500px] flex-col rounded-xl bg-white shadow-2xl duration-200 dark:bg-zinc-900">
        {/* Header */}
        <div className="relative flex items-center justify-center border-b border-gray-200 p-4 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {selectPost ? 'Chỉnh sửa bài viết' : 'Tạo bài viết'}
          </h2>
          <button
            onClick={handleCloseModel}
            className="absolute right-4 flex h-10! w-10! items-center justify-center rounded-full! border-none! bg-(--closeColor)! transition-colors"
          >
            <CloseIcon fontSize="small" className="cursor-pointer" />
          </button>
        </div>

        {/* Content Body */}
        <div className="max-h-[70vh] overflow-y-auto p-4">
          {/* User Info & Visibility */}
          <div className="mb-4 flex items-center gap-3">
            <img
              src={
                ownUser?.avatar
                  ? API_URL + `/avatars/${ownUser.avatar}`
                  : noAvatar
              }
              className="h-10 w-10 rounded-full border border-gray-200 object-cover"
              alt="Avatar"
            />
            <div className="space-y-1">
              <p className="leading-none font-semibold text-gray-900 dark:text-white">
                {ownUser?.firstName + ' ' + ownUser?.lastName || 'Người dùng'}
              </p>

              <div className="relative" ref={visibilityRef}>
                <button
                  onClick={() => setIsVisibilityOpen(!isVisibilityOpen)}
                  className="flex items-center gap-1.5 rounded-md bg-gray-100! px-2 py-1 text-[12px] font-medium transition-all hover:bg-gray-200! dark:bg-zinc-800! dark:hover:bg-zinc-700!"
                >
                  {visibility.icon}
                  <span>{visibility.label}</span>
                  <span className="text-[8px]">▼</span>
                </button>

                {/* Visibility Dropdown Menu */}
                {isVisibilityOpen && (
                  <div className="absolute top-full left-0 z-110 mt-2 w-72 overflow-hidden rounded-xl border border-gray-200 bg-white p-2 shadow-2xl dark:border-zinc-700 dark:bg-zinc-800">
                    <p className="px-3 py-2 text-sm font-bold">
                      Ai có thể xem bài viết của bạn?
                    </p>
                    {visibility_OPTIONS.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setVisibility(opt);
                          setIsVisibilityOpen(false);
                        }}
                        className={`bg-background! mb-1 flex w-full items-center gap-3 rounded-lg border-none! p-2 transition-colors hover:bg-gray-100! dark:hover:bg-zinc-700/50! ${
                          visibility.id === opt.id
                            ? 'bg-blue-50! dark:bg-blue-500/10!'
                            : ''
                        }`}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 dark:bg-zinc-700 dark:text-gray-300">
                          {opt.icon}
                        </div>
                        <div className="flex-1 text-left">
                          <p
                            className={`text-sm font-semibold ${visibility.id === opt.id ? 'text-blue-600 dark:text-blue-400' : ''}`}
                          >
                            {opt.label}
                          </p>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400">
                            {opt.desc}
                          </p>
                        </div>
                        {visibility.id === opt.id && (
                          <Check size={16} className="text-blue-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Text Input */}
          {ownUser?.firstName && (
            <textarea
              placeholder={`Bạn đang nghĩ gì thế ${ownUser.firstName + ' ' + ownUser.lastName || 'Bạn'}?`}
              className="mb-4 min-h-[120px] w-full resize-none border-none bg-transparent text-lg outline-none placeholder:text-gray-500 focus:ring-0"
              value={text}
              onChange={e => setText(e.target.value)}
            />
          )}

          {/* Image Previews */}
          {selectedImages.length > 0 && (
            <div className={`mb-4 grid gap-2`}>
              {
                <div className="relative">
                  <div
                    className="absolute top-1 right-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-(--closeColor)"
                    onClick={removeImage}
                  >
                    <X size={20} className="text-(--textColor)" />
                  </div>
                  <PostImages
                    images={
                      selectPost
                        ? selectedImages.map(image => {
                            if (
                              image.startsWith('blob:') ||
                              image.startsWith('data:')
                            ) {
                              return image;
                            }
                            return API_URL + `posts/${image}`;
                          })
                        : selectedImages
                    }
                  />
                </div>
              }
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 pt-0">
          <div className="mb-4 flex items-center justify-between rounded-xl border border-gray-200 p-3 shadow-sm dark:border-zinc-800">
            <span className="hidden text-sm font-bold sm:inline">
              Thêm vào bài viết
            </span>
            <div className="flex w-full items-center justify-around gap-1 sm:w-auto sm:justify-end">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="tooltip rounded-full border-none! bg-(--buttonColor)! p-2 text-green-500!"
                title="Ảnh/Video"
                hidden={selectedImages.length >= 5}
              >
                <Image size={24} />
              </button>
              <button className="rounded-full border-none! bg-(--buttonColor)! p-2 text-blue-500!">
                <UserPlus size={24} />
              </button>
              <button className="rounded-full border-none! bg-(--buttonColor)! p-2 text-yellow-500">
                <Smile size={24} />
              </button>
              <button className="rounded-full border-none! bg-(--buttonColor)! p-2 text-red-500">
                <MapPin size={24} />
              </button>
              <button className="rounded-full border-none! bg-(--buttonColor)! p-2 text-gray-500">
                <MoreHorizontal size={24} />
              </button>
            </div>
            <input
              type="file"
              multiple
              hidden
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>

          {selectPost ? (
            <button
              onClick={handleSubmit}
              disabled={selectedImages.length === 0 && text.length === 0}
              className={`w-full cursor-not-allowed! py-2.5 ${(selectedImages.length > 0 || text.length > 0) && 'cursor-pointer! bg-blue-600! text-white! hover:bg-blue-700!'} rounded-lg border-none! font-bold shadow-md transition-all active:scale-[0.98] disabled:bg-gray-200! disabled:text-gray-400! dark:disabled:bg-zinc-800!`}
            >
              Lưu
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={selectedImages.length === 0 && text.length === 0}
              className={`w-full cursor-not-allowed! py-2.5 ${(selectedImages.length > 0 || text.length > 0) && 'cursor-pointer! bg-blue-600! text-white! hover:bg-blue-700!'} rounded-lg border-none! font-bold shadow-md transition-all active:scale-[0.98] disabled:bg-gray-200! disabled:text-gray-400! dark:disabled:bg-zinc-800!`}
            >
              Đăng
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModelCreatePost;

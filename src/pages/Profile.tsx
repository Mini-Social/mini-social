import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PublicIcon from '@mui/icons-material/Public';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import StickyBox from 'react-sticky-box';
import TextareaAutosize from 'react-textarea-autosize';

import noAvatar from '@/assets/avatars/noavatar.png';
import camera from '@/assets/icons/camera.svg';
import remove from '@/assets/icons/remove.svg';
import ModelCreatePost from '@/components/ModelCreatePost';
import ModelUpdateAvatar from '@/components/ModelUpdateAvatar';
import { ModelUserInformationWrapper } from '@/components/ModelUserInfomationWrapper';
import Posts from '@/components/Posts';
import ProfilePageSkeleton from '@/components/ProfilePageSkeleton';
import Share from '@/components/Share';
import LanguageContext from '@/contexts/LanguageContext';
import { setCredential } from '@/features/auth/auth.slice';
import { startConversation } from '@/features/conversation/conversation.slice';
import { useCreatePrivateConversationMutation } from '@/features/conversation/conversation.slice.api';
import {
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useGetFriendRequestsQuery,
  useGetSentFriendRequestsQuery,
  useRejectFriendRequestMutation,
  useSendFriendRequestMutation,
} from '@/features/friendRequest/friendRequest.slice.api';
import { useGetPostByUserIdQuery } from '@/features/post/post.api.slice';
import {
  useGetUserByUserNameQuery,
  useUpdateProfileMutation,
} from '@/features/user/user.api.slice';
import type { translations } from '@/language/language';
import { socket } from '@/socket';
import type { RootState } from '@/store';
import { UseAppDispatch } from '@/store';
import type { IFriendRequest } from '@/types/friendRequest.type';

const API_URL = import.meta.env.VITE_API_URL;
const Profile = () => {
  const selectPost = useSelector((state: RootState) => state.post.postSelect);
  const ownUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = UseAppDispatch();
  const { userName } = useParams();

  const {
    data,
    refetch: refetchUser,
    isLoading: isFetchingUser,
  } = useGetUserByUserNameQuery(userName!);
  const [updateProfile] = useUpdateProfileMutation();

  const [createConversation] = useCreatePrivateConversationMutation();
  const user = data?.data;
  const { data: posts, isFetching } = useGetPostByUserIdQuery(user?._id ?? '', {
    skip: !user?._id,
  });
  const [edit, setEdit] = useState<boolean>(false);
  const [bio, setBio] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [modelAvatar, setModelAvatar] = useState<string | undefined>(undefined);
  const [selectFile, setSelectFile] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeReaction, setActiveReaction] = useState<string | null>(null);
  const isProfileOwner = ownUser?.userName === userName;
  const [isHover, setIsHover] = useState<boolean>(false);
  const [previewCoverImg, setPreviewCoverImg] = useState<string | null>(null);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [positionY, setPositionY] = useState<number>(50);
  const startY = useRef<number>(0);
  const startPos = useRef<number>(0);
  const [openModel, setOpenModel] = useState<string>('');
  const [sendFriendRequest] = useSendFriendRequestMutation();
  const [cancelFriendRequest] = useCancelFriendRequestMutation();
  const { data: friendRequests } = useGetSentFriendRequestsQuery();
  const { data: receivedRequests, refetch: refetchReceivedRequests } =
    useGetFriendRequestsQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const [rejectFriendRequest] = useRejectFriendRequestMutation();
  const [friendRequest, setFriendRequest] = useState<IFriendRequest[]>([]);
  const [receivedRequest, setReceivedRequest] = useState<IFriendRequest[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpenEmoj, setIsOpenEmoj] = useState<boolean>(false);
  const params = useParams();
  useEffect(() => {
    setFriendRequest(friendRequests?.data ?? []);
  }, [friendRequests]);
  useEffect(() => {
    setReceivedRequest(receivedRequests?.data ?? []);
  }, [receivedRequests]);
  useEffect(() => {
    socket.on('sendFriendRequest', (requestData: IFriendRequest) => {
      setReceivedRequest(prev => [...prev, requestData]);
    });
    socket.on('cancelFriendRequest', requestId => {
      setReceivedRequest(prev => prev.filter(fr => fr._id !== requestId));
    });
    socket.on(
      'acceptFriendRequest',
      ({ requestData }: { requestData: IFriendRequest }) => {
        if (requestData && ownUser) {
          const newFriend =
            requestData.sender._id === ownUser._id
              ? requestData.receiver
              : requestData.sender;

          dispatch(
            setCredential({
              ...ownUser,
              friends: [
                ...(ownUser.friends || []),
                {
                  _id: newFriend._id,
                  userName: newFriend.userName,
                  firstName: newFriend.firstName,
                  lastName: newFriend.lastName,
                  avatar: newFriend.avatar ?? '',
                },
              ],
            }),
          );
          refetchUser();
        }
      },
    );
    socket.on('rejectFriendRequest', requestId => {
      setFriendRequest(prev => prev.filter(fr => fr._id !== requestId));
      setReceivedRequest(prev => prev.filter(fr => fr._id !== requestId));
    });
  }, [dispatch, ownUser, refetchUser]);
  const handleUpdateBio = () => {
    setEdit(false);
    updateProfile({ bio });
  };
  const handleDeleteAvatar = async () => {
    const isTrue = confirm('Are you sure you want to delete the avatar?');
    if (isTrue) {
      const res = await updateProfile({ avatar: '' }).unwrap();
      dispatch(setCredential(res.data));
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewCoverImg(url);
    }
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrag(true);
    startY.current = e.clientY;
    startPos.current = positionY;
  };
  const handleMouseUp = () => {
    setIsDrag(false);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDrag) {
      const deltaY = e.clientY - startY.current;
      let newPos = startPos.current - deltaY / 5;
      if (newPos < 0) {
        newPos = 0;
      }
      if (newPos > 100) {
        newPos = 100;
      }
      setPositionY(newPos);
    }
  };
  const handleMouseLeave = () => {
    setIsDrag(false);
  };
  const handleUpdateBgCover = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('background', selectedFile);
      formData.append('coverPosition', String(positionY));
      updateProfile(formData);
      setPreviewCoverImg(null);
      setSelectedFile(null);
    }
  };
  const handleDeleteBgCover = async () => {
    const isTrue = confirm('Are you sure you want to delete the background?');
    if (isTrue) {
      updateProfile({ background: '' });
    }
  };
  const languageContext = useContext(LanguageContext);
  if (!languageContext) {
    return null;
  }
  const { language, translate } = languageContext;
  return (
    <>
      {(isFetchingUser && !data) || (isFetching && !posts) ? (
        <ProfilePageSkeleton />
      ) : (
        <>
          <ModelCreatePost
            key={selectPost?._id}
            openModel={openModel}
            onClose={setOpenModel}
            fileInputRef={fileInputRef}
            isOpenEmoj={isOpenEmoj}
            setIsOpenEmoj={setIsOpenEmoj}
          />
          {previewCoverImg && (
            <div className="fixed z-10 w-full bg-black/50 p-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <PublicIcon />
                  <span>{translate(language, 'publicText')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="rounded-lg border-none! bg-white/10! px-4 py-2 text-sm text-white!"
                    onClick={() => setPreviewCoverImg(null)}
                  >
                    {translate(language, 'cancel')}
                  </button>
                  <button
                    className="rounded-lg bg-[#0866ff]! px-4 py-2 text-sm text-white hover:opacity-90"
                    onClick={handleUpdateBgCover}
                  >
                    {translate(language, 'save') +
                      ' ' +
                      translate(language, 'change').toLowerCase()}
                  </button>
                </div>
              </div>
            </div>
          )}
          <div
            className="mx-auto flex max-w-[1000px] min-w-full flex-col lg:min-w-[1000px]"
            key={userName}
          >
            {
              <div className="relative h-[320px]">
                <div className="aspect-ratio-16/9 absolute h-62.5 w-full cursor-pointer overflow-hidden rounded-b-[8px]">
                  {previewCoverImg && (
                    <div className="absolute h-full w-full">
                      {!isDrag && (
                        <div className="pointer-events-none absolute flex h-full w-full items-center justify-center">
                          <div className="flex items-center gap-2 rounded-[8px] bg-black/50 p-2">
                            <OpenWithIcon className="text-white" />
                            <span className="text-white">
                              {translate(language, 'dragText')}
                            </span>
                          </div>
                        </div>
                      )}
                      <img
                        src={previewCoverImg}
                        alt=""
                        className="h-full w-full object-cover"
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        onDragStart={e => e.preventDefault()}
                        style={{
                          objectPosition: `50% ${positionY}%`,
                        }}
                      />
                    </div>
                  )}
                  {!previewCoverImg && !user?.background && (
                    <>
                      <div className="h-full w-full bg-(--bgCover)"></div>
                      {isProfileOwner && (
                        <label htmlFor="bgCover">
                          <div className="absolute right-5 bottom-4 flex cursor-pointer items-center justify-center gap-2 rounded-[6px] bg-(--gray200) p-2 text-[13px] font-bold text-(--textColor) hover:opacity-80">
                            <FileUploadIcon />{' '}
                            {translate(language, 'addBgCoverText')}
                          </div>
                        </label>
                      )}
                    </>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    id="bgCover"
                    onChange={handleFileChange}
                  />
                  {user?.background && (
                    <PhotoProvider className="">
                      <PhotoView
                        src={API_URL + `backgrounds/${user.background}`}
                      >
                        <img
                          src={API_URL + `backgrounds/${user.background}`}
                          alt=""
                          className="h-full w-full object-cover"
                          style={{
                            objectPosition: `50% ${user.coverPosition}%`,
                          }}
                        />
                      </PhotoView>
                      <div>
                        {!previewCoverImg && isProfileOwner && (
                          <div
                            className="absolute right-4 bottom-4 flex cursor-pointer items-center justify-center gap-2 rounded-[6px] bg-(--gray200) p-2 text-[13px] font-bold text-(--textColor) hover:opacity-80"
                            onClick={handleDeleteBgCover}
                          >
                            <DeleteIcon />
                          </div>
                        )}
                        {!previewCoverImg && isProfileOwner && (
                          <label htmlFor="bgCover">
                            <div className="absolute right-16 bottom-4 flex cursor-pointer items-center justify-center gap-2 rounded-[6px] bg-(--gray200) p-2 text-[13px] font-bold text-(--textColor) hover:opacity-80">
                              <PhotoCameraIcon />
                            </div>
                          </label>
                        )}
                      </div>
                    </PhotoProvider>
                  )}
                </div>
                <div
                  className="absolute bottom-0 left-1/2 h-[170px] w-[170px] -translate-x-1/2 overflow-hidden rounded-full border-4 border-(--background-primary)"
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
                >
                  {isProfileOwner && isHover && (
                    <div className="pointer-events-none absolute z-1000 flex h-full w-full items-center justify-center">
                      <div className="pointer-events-auto flex items-center justify-between gap-3 rounded-[10px] bg-black/60 px-4 py-2">
                        <label htmlFor="avatar" aria-label="Change avatar">
                          <img
                            src={camera}
                            alt=""
                            className={`cursor-pointer ${user?.avatar ? 'border-r border-r-white pr-3.5' : ''}`}
                          />
                          <input
                            type="file"
                            id="avatar"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const imageUrl = URL.createObjectURL(file);
                                setSelectFile(file);
                                setModelAvatar(imageUrl);
                              }
                            }}
                            hidden
                          />
                        </label>
                        {user?.avatar && (
                          <img
                            src={remove}
                            alt=""
                            className="cursor-pointer"
                            onClick={handleDeleteAvatar}
                          />
                        )}
                      </div>
                    </div>
                  )}
                  {
                    <PhotoProvider>
                      <PhotoView
                        src={
                          (user?.avatar &&
                            API_URL + `avatars/${user.avatar}`) ||
                          noAvatar
                        }
                      >
                        <img
                          src={
                            (user?.avatar &&
                              API_URL + `avatars/${user.avatar}`) ||
                            noAvatar
                          }
                          alt=""
                          className="h-full w-full cursor-pointer object-cover object-center"
                        />
                      </PhotoView>
                    </PhotoProvider>
                  }
                </div>
              </div>
            }
            {selectFile && (
              <ModelUpdateAvatar
                isVisible={modelAvatar !== undefined}
                setIsVisible={setModelAvatar}
                currentAvatar={modelAvatar}
                selectFile={selectFile}
                setSelectFile={setSelectFile}

              />
            )}
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">
                {user && user?.firstName + ' ' + user?.lastName}
              </span>
              {!isProfileOwner && (
                <div className="mt-2 flex gap-2">
                  <button
                    className="flex cursor-pointer items-center gap-1 bg-(--buttonColor2)! text-[13px]! font-bold! text-(--textColor)! hover:border-transparent! hover:opacity-80!"
                    onClick={async () => {
                      const res = await createConversation(
                        user?._id || '',
                      ).unwrap();
                      if (res.data) {
                        dispatch(startConversation(res.data.conversation._id));
                      }
                    }}
                  >
                    <ChatIcon fontSize="small" />
                    <span>{translate(language, 'message')}</span>
                  </button>
                  {ownUser?.friends.some(fr => fr._id === user?._id) && (
                    <>
                      <div className="flex gap-2">
                        <button className="bg-primary! flex cursor-pointer items-center gap-1 text-[13px]! font-bold! text-white! hover:border-transparent! hover:opacity-80!">
                          <PersonIcon fontSize="small" />
                          <span>Bạn bè</span>
                        </button>
                        {/* <button
                  className="flex cursor-pointer items-center gap-1 bg-(--buttonColor2)! text-[13px]! font-bold! text-(--textColor)! hover:border-transparent! hover:opacity-80!"

                >
                  <PersonRemoveIcon fontSize="small" />
                  <span>Hủy kết bạn</span>
                </button> */}
                      </div>
                    </>
                  )}

                  {friendRequest.find(fr => fr.receiver._id === user?._id)
                    ? !receivedRequest.some(
                        fr => fr.sender.userName === params.userName,
                      ) &&
                      !ownUser?.friends.some(fr => fr._id === user?._id) && (
                        <button
                          className="flex cursor-pointer items-center gap-1 bg-(--buttonColor2)! text-[13px]! font-bold! text-(--textColor)! hover:border-transparent! hover:opacity-80!"
                          onClick={async () => {
                            const requestId = friendRequest.find(
                              fr => fr.receiver._id === user?._id,
                            )?._id;
                            if (!requestId) {
                              return;
                            }
                            setFriendRequest(
                              friendRequest.filter(fr => fr._id !== requestId),
                            );
                            const res =
                              await cancelFriendRequest(requestId).unwrap();
                            socket.emit('cancelFriendRequest', res.data);
                          }}
                        >
                          <PersonRemoveIcon fontSize="small" />
                          <span>{translate(language, 'cancelAddFriend')}</span>
                        </button>
                      )
                    : !receivedRequest.some(
                        fr => fr.sender.userName === params.userName,
                      ) &&
                      !ownUser?.friends.some(fr => fr._id === user?._id) && (
                        <button
                          className="bg-primary! text-primary-foreground! flex cursor-pointer items-center gap-1 text-[13px]! font-bold! hover:border-transparent! hover:opacity-80!"
                          onClick={async () => {
                            const res = await sendFriendRequest(
                              user?._id || '',
                            ).unwrap();
                            setFriendRequest([...friendRequest, res.data]);
                            socket.emit('sendFriendRequest', {
                              requestData: res.data,
                            });
                          }}
                        >
                          <PersonAddIcon fontSize="small" />
                          <span>{translate(language, 'addFriend')}</span>
                        </button>
                      )}
                  {receivedRequest.some(
                    fr => fr.sender.userName === params.userName,
                  ) && (
                    <div className="">
                      <button
                        className="mr-2 flex-1 rounded-md border-none! bg-[#4e4f50]! py-1.5 text-xs font-bold text-gray-200! transition hover:bg-[#5e5f60]!"
                        onClick={e => {
                          e.preventDefault();
                          const req = receivedRequest.find(
                            fr => fr.sender.userName === params.userName,
                          );
                          if (!req) {
                            return;
                          }
                          rejectFriendRequest(req._id);
                          refetchReceivedRequests();
                          socket.emit('rejectFriendRequest', req);
                        }}
                      >
                        Xóa
                      </button>
                      <button
                        className="mr-2 flex-1 rounded-md border-none! bg-blue-600! py-1.5 text-xs font-bold text-white! transition hover:bg-blue-500!"
                        onClick={async e => {
                          e.preventDefault();
                          const req = receivedRequest.find(
                            fr => fr.sender.userName === params.userName,
                          );
                          if (!req) {
                            return;
                          }
                          const res = await acceptFriendRequest(
                            req._id,
                          ).unwrap();
                          refetchReceivedRequests();
                          setReceivedRequest(
                            receivedRequest.filter(fr => fr._id !== req._id),
                          );
                          socket.emit('acceptFriendRequest', {
                            requestData: res.data,
                          });
                        }}
                      >
                        Xác nhận
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col py-5 md:flex-row md:gap-5 md:px-5">
              <div className="sticky bottom-5 flex-3">
                {!(isFetchingUser && !data) && (
                  <StickyBox offsetTop={80} offsetBottom={20}>
                    <div className="bg-background p-5 text-(--textColor) md:rounded-xl md:shadow-[0_0_4px_0px_rgba(0,0,0,0.2)]">
                      <h4 className="mb-1 text-[16px] font-bold">
                        {translate(language, 'information')}
                      </h4>
                      {isProfileOwner ? (
                        <>
                          {!user?.bio &&
                            !user?.address &&
                            !user?.birthDate &&
                            !user?.gender &&
                            !user?.phone && (
                              <span className="block p-2 text-center text-[14px] text-(--textColor)">
                                {translate(language, 'noInformation')}
                              </span>
                            )}
                          {edit ? (
                            <TextareaAutosize
                              minRows={2}
                              value={bio}
                              onChange={e => setBio(e.target.value)}
                              maxLength={100}
                              className="border-border mt-2 w-full resize-none rounded-[5px] border px-3 py-2 text-center placeholder:text-center"
                              placeholder={translate(language, 'description')}
                            />
                          ) : (
                            user?.bio && (
                              <span
                                className={`block p-2 text-center text-[14px] text-(--textColor) ${user.bio ? 'border-border border-b' : ''}`}
                              >
                                {user.bio}
                              </span>
                            )
                          )}
                          {edit && (
                            <span className="block text-end text-[12px] text-(--textColor2)">
                              {bio.length}/100
                            </span>
                          )}
                          {!edit && user?.bio && (
                            <button
                              className="w-full cursor-pointer bg-(--buttonColor)! text-[13px]! font-bold! text-(--textColor)! hover:border-transparent! hover:opacity-80!"
                              onClick={() => {
                                setEdit(true);
                                setBio(user.bio);
                              }}
                            >
                              {translate(language, 'edit') +
                                ' ' +
                                translate(language, 'bio').toLowerCase()}
                            </button>
                          )}
                          {!edit && !user?.bio && (
                            <button
                              className="w-full cursor-pointer bg-(--buttonColor)! text-[13px]! font-bold! text-(--textColor)! hover:border-transparent! hover:opacity-80!"
                              onClick={() => setEdit(true)}
                            >
                              {translate(language, 'add2') +
                                ' ' +
                                translate(language, 'bio').toLowerCase()}
                            </button>
                          )}
                          {edit && (
                            <div className="mt-2 flex gap-2">
                              <button
                                className="w-full cursor-pointer bg-(--buttonColor)! text-[13px]! font-bold! text-(--textColor)! hover:border-transparent! hover:opacity-80!"
                                onClick={() => {
                                  setEdit(false);
                                }}
                              >
                                {translate(language, 'cancel')}
                              </button>
                              <button
                                className="bg-primary! text-primary-foreground! w-full cursor-pointer text-[13px]! font-bold! hover:border-transparent! hover:opacity-80!"
                                onClick={handleUpdateBio}
                              >
                                {translate(language, 'save')}
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <span
                          className={`block p-2 text-center text-[14px] text-(--textColor) ${user?.bio ? 'border-border border-b' : ''}`}
                        >
                          {user?.bio}
                        </span>
                      )}
                      <div className="mt-4 flex flex-col gap-2 text-[14px]">
                        {user?.address && (
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-nowrap">
                              {translate(language, 'address') + ':'}{' '}
                            </span>
                            <span className="line-clamp-1">{user.address}</span>
                          </div>
                        )}
                        {user?.gender && (
                          <div className="flex items-center gap-2">
                            <span className="font-bold">
                              {translate(language, 'gender') + ':'}{' '}
                            </span>
                            <span>{user.gender}</span>
                          </div>
                        )}
                        {user?.birthDate && (
                          <div className="flex items-center gap-2">
                            <span className="font-bold">
                              {translate(language, 'birthday') + ':'}{' '}
                            </span>
                            <span>
                              {new Date(user.birthDate).toLocaleDateString(
                                'vi-VN',
                                {
                                  timeZone: 'UTC',
                                },
                              )}
                            </span>
                          </div>
                        )}
                        {user?.phone && (
                          <div className="flex items-center gap-2">
                            <span className="font-bold">
                              {translate(language, 'phone') + ':'}{' '}
                            </span>
                            <span>0{user.phone.slice(user.phone.length - 9)}</span>
                          </div>
                        )}
                        {user?.relationship && (
                          <div className="flex items-center gap-2">
                            <span className="font-bold">
                              {translate(language, 'relationship') + ':'}{' '}
                            </span>
                            <span>
                              {translate(
                                language,
                                user.relationship.toLowerCase() as keyof typeof translations.vi,
                              )}
                            </span>
                          </div>
                        )}
                        {isProfileOwner && (
                          <button
                            className="w-full cursor-pointer bg-(--buttonColor)! text-[13px]! font-bold! text-(--textColor)! hover:border-transparent! hover:opacity-80!"
                            onClick={() => setIsVisible(true)}
                          >
                            {translate(language, 'edit') +
                              ' ' +
                              translate(language, 'detail').toLowerCase()}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* <div className="bg-background mt-5 hidden p-5 text-(--textColor) shadow-[0_0_4px_0px_rgba(0,0,0,0.2)] md:block md:rounded-xl">
            <div className="flex items-center justify-between">
              <h4 className="text-[16px] font-bold">Photos</h4>
              <span className="cursor-pointer text-[13px] text-(--textColor2) hover:underline">
                {userPhotos.length} Photos
              </span>
            </div> */}
                    {/* Photos */}
                    {/* <div className="mt-2.5 grid grid-cols-3 gap-1">
              {userPhotos.slice(0, 9).map(photo => (
                <div key={photo.id} className="">
                  <div className="aspect-square">
                    <PhotoProvider>
                      <PhotoView src={photo.url}>
                        <img
                          src={photo.url}
                          alt=""
                          className="h-full w-full cursor-pointer object-cover object-center"
                        />
                      </PhotoView>
                    </PhotoProvider>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

                    {
                      <div className="bg-background p-5 text-(--textColor) md:mt-5 md:rounded-xl md:shadow-[0_0_4px_0px_rgba(0,0,0,0.2)]">
                        <div className="flex items-center justify-between">
                          <h4 className="text-[16px] font-bold">
                            {translate(language, 'friend')}
                          </h4>
                          <span className="cursor-pointer text-[13px] text-(--textColor2) hover:underline">
                            {user?.friends.length}{' '}
                            {translate(language, 'friend')}
                          </span>
                        </div>
                        {/* Friend */}
                        {user?.friends.length === 0 && (
                          <span className="block w-full text-center text-lg font-bold text-(--textColor2)">
                            {translate(language, 'noFriend')}
                          </span>
                        )}
                        <div className="mt-2.5 grid grid-cols-3 gap-2">
                          {user?.friends.slice(0, 9).map(friend => (
                            <Link
                              className="text-inherit!"
                              to={`/profile/${friend.userName}`}
                              key={friend._id}
                            >
                              <div
                                key={friend._id}
                                className="flex flex-col items-start"
                              >
                                <div className="aspect-square h-full w-full">
                                  <img
                                    src={
                                      friend.avatar
                                        ? API_URL + '/avatars/' + friend.avatar
                                        : noAvatar
                                    }
                                    alt=""
                                    className="h-full w-full cursor-pointer rounded-[8px] object-cover object-center"
                                  />
                                </div>
                                <span className="mt-1 block w-full cursor-pointer text-[11px] font-bold wrap-break-word whitespace-pre-wrap hover:underline">
                                  {friend.firstName} {friend.lastName}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    }
                  </StickyBox>
                )}
              </div>
              <div className="flex-5">
                {isProfileOwner && (
                  <Share
                    setOpenModel={setOpenModel}
                    fileInputRef={fileInputRef}
                    setIsOpenEmoj={setIsOpenEmoj}
                  />
                )}
                {!isProfileOwner && (
                  <div className="bg-background mt-5 mb-5 p-5 text-(--textColor) shadow-[0_0_4px_0px_rgba(0,0,0,0.2)] md:mt-0 md:rounded-xl">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[16px] font-bold">
                        {translate(language, 'post')}
                      </h4>
                      <span className="text-[14px] text-(--textColor2)">
                        {
                          posts?.data.posts.filter(post =>
                            isProfileOwner
                              ? post
                              : post.visibility !== 'private',
                          ).length
                        }{' '}
                        {translate(language, 'post').toLowerCase()}
                      </span>
                    </div>
                  </div>
                )}
                {posts?.data?.posts && (
                  <Posts
                    posts={posts.data.posts}
                    activeReaction={activeReaction}
                    setActiveReaction={setActiveReaction}
                    isProfileOwner={isProfileOwner}
                    setOpenModel={setOpenModel}
                  />
                )}
                {posts?.data.posts.filter(post =>
                  isProfileOwner ? post : post.visibility !== 'private',
                ).length === 0 && (
                  <span className="block w-full text-center text-xl font-bold text-(--textColor2)">
                    {translate(language, 'noPost')}
                  </span>
                )}
                {isVisible && user && (
                  <ModelUserInformationWrapper
                    key={user.address}
                    setIsVisible={setIsVisible}
                    user={user}
                    isVisible={isVisible}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;

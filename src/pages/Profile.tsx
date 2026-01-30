import ChatIcon from '@mui/icons-material/Chat';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

import bgCover from '@/assets/avatars/bg-cover.jpeg';
import noAvatar from '@/assets/avatars/noavatar.png';
import ModelUserInformation from '@/components/ModelUserInformation';
import Posts from '@/components/Posts';
import Share from '@/components/Share';
import { useGetPostByUserIdQuery } from '@/features/post/post.api.slice';
import { useGetUserByUserNameQuery } from '@/features/user/user.api.slice';
import type { RootState } from '@/store';

const Profile = () => {
  const { userName } = useParams();
  const ownUser = useSelector((state: RootState) => state.auth.user);
  const { data } = useGetUserByUserNameQuery(userName!);
  const user = data?.data;
  const { data: posts } = useGetPostByUserIdQuery(user?._id ?? '', {
    skip: !user?._id,
  });
  const [edit, setEdit] = useState<boolean>(false);
  const [bio, setBio] = useState<string>(user?.bio ?? '');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // const [editData, setEditData] = useState({
  //   address: 'New York',
  //   gender: 'Male',
  //   birthday: '1990-01-01',
  //   phone: '1234567890',
  //   relationship: 'Single',
  // });
  const isProfileOwner = ownUser?.userName === userName;
  return (
    <div className="mx-auto flex max-w-[1000px] flex-col lg:min-w-[1000px]">
      <div className="relative h-[320px]">
        <div className="aspect-ratio-16/9 h-62.5 w-full cursor-pointer">
          <PhotoProvider>
            <PhotoView src={bgCover}>
              <img
                src={bgCover}
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </PhotoView>
          </PhotoProvider>
        </div>
        <div className="absolute bottom-0 left-1/2 h-[170px] w-[170px] -translate-x-1/2 overflow-hidden rounded-full border-4 border-(--background-primary)">
          <PhotoProvider>
            <PhotoView src={user?.avatar || noAvatar}>
              <img
                src={user?.avatar || noAvatar}
                alt=""
                className="h-full w-full cursor-pointer object-cover object-center"
              />
            </PhotoView>
          </PhotoProvider>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold">
          {user && user?.firstName + ' ' + user?.lastName}
        </span>
        {!isProfileOwner && (
          <div className="mt-2 flex gap-2">
            <button className="flex cursor-pointer items-center gap-1 bg-(--buttonColor2)! text-[13px]! font-bold! text-(--textColor)! hover:border-transparent! hover:opacity-80!">
              <ChatIcon fontSize="small" />
              <span>Message</span>
            </button>
            <button className="bg-primary! text-primary-foreground! flex cursor-pointer items-center gap-1 text-[13px]! font-bold! hover:border-transparent! hover:opacity-80!">
              <PersonAddIcon fontSize="small" />
              <span>Add friend</span>
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col py-5 md:flex-row md:gap-5 md:px-5">
        <div className="flex-3">
          <div className="bg-background p-5 text-(--textColor) md:rounded-xl md:shadow-[0_0_4px_0px_rgba(0,0,0,0.2)]">
            <h4 className="text-[16px] font-bold">User Information</h4>
            {isProfileOwner ? (
              <>
                {edit ? (
                  <TextareaAutosize
                    minRows={2}
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    maxLength={100}
                    className="border-border mt-2 w-full resize-none rounded-[5px] border px-3 py-2 text-center placeholder:text-center"
                    placeholder="Description about you"
                  />
                ) : (
                  <span
                    className={`block p-2 text-center text-[14px] text-(--textColor) ${bio ? 'border-border border-b' : ''}`}
                  >
                    {bio}
                  </span>
                )}
                {edit && (
                  <span className="block text-end text-[12px] text-(--textColor2)">
                    {bio.length}/100
                  </span>
                )}
                {!edit && bio && (
                  <button
                    className="w-full cursor-pointer bg-(--buttonColor)! text-[13px]! font-bold! text-(--textColor)! hover:border-transparent! hover:opacity-80!"
                    onClick={() => setEdit(true)}
                  >
                    Edit biography
                  </button>
                )}
                {!edit && !bio && (
                  <button
                    className="w-full cursor-pointer bg-(--buttonColor)! text-[13px]! font-bold! text-(--textColor)! hover:border-transparent! hover:opacity-80!"
                    onClick={() => setEdit(true)}
                  >
                    Add biography
                  </button>
                )}
                {edit && (
                  <div className="mt-2 flex gap-2">
                    <button
                      className="w-full cursor-pointer bg-(--buttonColor)! text-[13px]! font-bold! text-(--textColor)! hover:border-transparent! hover:opacity-80!"
                      onClick={() => {
                        setBio(user?.bio ?? '');
                        setEdit(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-primary! text-primary-foreground! w-full cursor-pointer text-[13px]! font-bold! hover:border-transparent! hover:opacity-80!"
                      onClick={() => {
                        setEdit(false);
                      }}
                    >
                      Save
                    </button>
                  </div>
                )}
              </>
            ) : (
              <span
                className={`block p-2 text-center text-[14px] text-(--textColor) ${bio ? 'border-border border-b' : ''}`}
              >
                {bio}
              </span>
            )}
            <div className="mt-4 flex flex-col gap-2 text-[14px]">
              <div className="flex items-center gap-2">
                <span className="font-bold">Address: </span>
                <span>New York</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Gender: </span>
                <span>Male</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Birthday: </span>
                <span>1990-01-01</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Phone: </span>
                <span>1234567890</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Relationship: </span>
                <span>Single</span>
              </div>
              <button
                className="w-full cursor-pointer bg-(--buttonColor)! text-[13px]! font-bold! text-(--textColor)! hover:border-transparent! hover:opacity-80!"
                onClick={() => setIsVisible(true)}
              >
                Edit details
              </button>
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

          <div className="bg-background p-5 text-(--textColor) md:mt-5 md:rounded-xl md:shadow-[0_0_4px_0px_rgba(0,0,0,0.2)]">
            <div className="flex items-center justify-between">
              <h4 className="text-[16px] font-bold">Friends</h4>
              <span className="cursor-pointer text-[13px] text-(--textColor2) hover:underline">
                {user?.friends.length} Friends
              </span>
            </div>
            {/* Friend */}
            <div className="mt-2.5 grid grid-cols-3 gap-2">
              {user?.friends.slice(0, 9).map(friend => (
                <Link
                  className="text-inherit!"
                  to={`/profile/${friend.userName}`}
                  key={friend._id}
                >
                  <div key={friend._id} className="flex flex-col items-start">
                    <div className="aspect-square h-full w-full">
                      <img
                        src={friend.avatar || noAvatar}
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
        </div>
        <div className="flex-5">
          {isProfileOwner && <Share />}
          {!isProfileOwner && (
            <div className="bg-background mb-5 rounded-xl p-5 text-(--textColor) shadow-[0_0_4px_0px_rgba(0,0,0,0.2)]">
              <div className="flex items-center justify-between">
                <h4 className="text-[16px] font-bold">Posts</h4>
                <span className="text-[14px] text-(--textColor2)">
                  {posts?.data.posts.length} Posts
                </span>
              </div>
            </div>
          )}
          {posts?.data?.posts && <Posts posts={posts.data.posts} />}
          {isVisible && <ModelUserInformation setIsVisible={setIsVisible} />}
        </div>
      </div>
    </div>
  );
};

export default Profile;

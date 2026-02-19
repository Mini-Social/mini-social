import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import noAvatar from '@/assets/avatars/noavatar.png';
import ChatButton from '@/assets/icons/components/ChatButton';
import LikeButton from '@/assets/icons/components/LikeButton';
import ShareButton from '@/assets/icons/components/ShareButton';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModel';
import PostImages from '@/components/PostImages';
import PostMenu from '@/components/PostMenu';
import ReactionsBar from '@/components/ReactionsBar';
import ReacionsPost from '@/components/ReactionsPost';
import LanguageContext from '@/contexts/LanguageContext';
import {
  useDeletePostMutation,
  useReactionPostMutation,
} from '@/features/post/post.api.slice';
import { selectPost } from '@/features/post/post.slice';
import type { translations } from '@/language/language';
import { UseAppDispatch, type RootState } from '@/store';
import type { errorResponseType2 } from '@/types/auth.type';
import { type IPost, type ReactionType } from '@/types/type';
import { reactionStyle } from '@/types/type';
import { FormatDate } from '@/utils/formatDate';

const API_URL = import.meta.env.VITE_API_URL;
interface PostProps {
  post: IPost;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveReaction: React.Dispatch<React.SetStateAction<string | null>>;
  noShadow?: boolean;
  setOpenModel?: React.Dispatch<React.SetStateAction<string>>;
}
const Post = ({
  post,
  setIsVisible,
  noShadow,
  setActiveReaction,
  setOpenModel,
}: PostProps) => {
  const [deletePost] = useDeletePostMutation();
  const [reactionPost] = useReactionPostMutation();
  const ownUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = UseAppDispatch();
  const [react, setReact] = useState<ReactionType>(
    (post.userReactions.find(p => p.userId._id === ownUser?._id)
      ?.reactions as ReactionType) || 'default',
  );
  const [showBar, setShowBar] = useState(false);
  const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dotRef = useRef(null);
  const count = Object.values(post.reactions).reduce(
    (acc, value) => acc + value,
    0,
  );
  const [myReaction, setMyReaction] = useState(post.reactions);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState<boolean>(false);
  const startPress = () => {
    timeRef.current = setTimeout(() => {
      setShowBar(true);
    }, 500);
  };

  const endPress = () => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
      timeRef.current = null;
    }
    setShowBar(false);
  };
  const handleParentClick = () => {
    if (react !== 'default') {
      setMyReaction(pre => ({
        ...pre,
        [react]: pre[react] - 1,
      }));
      reactionPost({
        postId: post._id,
        action: `un${react}`,
      });
      setReact('default');
      setShowBar(false);
    } else {
      setMyReaction(pre => ({
        ...pre,
        like: 1,
      }));
      reactionPost({
        postId: post._id,
        action: 'like',
      });
      setReact('like');
      setShowBar(false);
    }
  };
  const handleDeletePost = async (id: string) => {
    try {
      await deletePost(id).unwrap();
      toast.success('Delete post successfully!');
    } catch (error) {
      const errorType = error as errorResponseType2;
      toast.success(errorType.data.message);
    }
  };
  useEffect(() => {
    setMyReaction(post.reactions);
  }, [setMyReaction, post.reactions]);
  useEffect(() => {
    setReact(
      (post.userReactions.find(p => p.userId._id === ownUser?._id)
        ?.reactions as ReactionType) || 'default',
    );
  }, [setReact, post.userReactions, ownUser?._id]);
  const languageContext = useContext(LanguageContext);
  if (!languageContext) {
    return null;
  }
  const { language, translate } = languageContext;
  return (
    <div
      className={`bg-background mb-2 md:mb-5 md:rounded-[10px] ${noShadow ? 'shadow-none' : 'md:shadow-[0px_0px_5px_1px_rgba(0_0_0/0.2)]'}`}
    >
      <ConfirmDeleteModal
        title='Xóa bài viết'
        desc='Hành động này không thể hoàn tác. Bài viết của bạn sẽ bị xóa vĩnh
            viễn khỏi hệ thống.'
        isOpen={isOpenDeleteModel}
        onClose={setIsOpenDeleteModel}
        onConfirm={handleDeletePost}
        Id={post._id}
      />

      <div className="item-center flex justify-between px-3 pt-3">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.author.userName}`}>
            <img
              src={
                (post.author?.avatar &&
                  API_URL + `/avatars/${post.author.avatar}`) ||
                noAvatar
              }
              alt=""
              className="h-10 w-10 rounded-[50%] object-cover"
            />
          </Link>
          <div className="flex flex-col">
            <Link
              to={`/profile/${post.author.userName}`}
              className="text-inherit!"
            >
              <span className="font-medium text-[14x] hover:underline">{`${post.author.firstName} ${post.author.lastName}`}</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#65686c]">
                {FormatDate(post.createdAt, true)}
              </span>
              {(post.visibility === 'public' && (
                <PublicIcon
                  fontSize="small"
                  sx={{
                    width: 14,
                    height: 14,
                  }}
                  htmlColor="#65686c"
                />
              )) ||
                (post.visibility === 'friends' && (
                  <PeopleIcon
                    fontSize="small"
                    sx={{
                      width: 14,
                      height: 14,
                    }}
                    htmlColor="#65686c"
                  />
                )) ||
                (post.visibility === 'private' && (
                  <LockIcon
                    fontSize="small"
                    sx={{
                      width: 14,
                      height: 14,
                    }}
                    htmlColor="#65686c"
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1">
          {ownUser?._id === post.author._id && (
            <div className="relative">
              <div onClick={() => setIsEdit(pre => !pre)} ref={dotRef}>
                <MoreHorizIcon className="cursor-pointer self-center" />
              </div>
              {isEdit && (
                <PostMenu
                  setIsEdit={setIsEdit}
                  dotRef={dotRef}
                  post={post}
                  setIsVisible={setIsVisible}
                  setOpenModel={setOpenModel}
                  setOpenDeleteModel={setIsOpenDeleteModel}
                />
              )}
            </div>
          )}
          <div className="cursor-pointer">
            <CloseIcon />
          </div>
        </div>
      </div>
      <div className="mt-2">
        <span className="mb-2 block px-3 text-[13px]">{post.content}</span>
        <PostImages images={post.images.map(p => API_URL + `posts/${p}`)} />
        <ReacionsPost
          post={post}
          setIsVisible={setIsVisible}
          count={count}
          id={post._id}
          myReaction={myReaction}
          react={react}
          setActiveReaction={setActiveReaction}
        />

        <div className="mx-3 flex items-center justify-between">
          <div className="flex h-11 flex-1 items-center justify-center">
            <div
              onMouseEnter={() => setShowBar(true)}
              onMouseLeave={() => setShowBar(false)}
              onClick={handleParentClick}
              onMouseDown={startPress}
              onMouseUp={endPress}
              onTouchStart={startPress}
              onTouchEnd={endPress}
              className="group relative z-50 flex h-fit w-full cursor-pointer items-center justify-center gap-2 py-1 transition-all duration-200 hover:bg-(--background-primary)"
            >
              {react === 'default' ? (
                <LikeButton className="fix-select h-5 w-5 text-(--textColor)" />
              ) : (
                <img
                  src={reactionStyle[react].icon}
                  alt=""
                  className="fix-select h-5 w-5"
                />
              )}
              <span
                className={`${reactionStyle[react].color} fix-select font-medium`}
              >
                {translate(
                  language,
                  reactionStyle[
                    react
                  ].text.toLowerCase() as keyof typeof translations.vi,
                )}
              </span>
              <ReactionsBar
                setState={setReact}
                setShowBar={setShowBar}
                setMyReaction={setMyReaction}
                post={post}
                isVisible={showBar}
                react={react}
                isPost
              />
            </div>
            <div
              className="fix-select flex h-fit w-full cursor-pointer items-center justify-center gap-2 py-1 font-medium text-(--textColor2) transition-all duration-200 hover:bg-(--background-primary)"
              onClick={() => {
                dispatch(selectPost(post._id));
                setIsVisible(true);
              }}
            >
              <ChatButton className="fix-select h-5 w-5 text-(--textColor)" />
              <span>{translate(language, 'comment')}</span>
            </div>
            <div className="fix-select flex h-fit w-full cursor-pointer items-center justify-center gap-2 py-1 font-medium text-(--textColor2) transition-all duration-200 hover:bg-(--background-primary)">
              <ShareButton className="fix-select h-5 w-5 text-(--textColor)" />
              <span>{translate(language, 'shares')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

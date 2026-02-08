import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import UpdateIcon from '@mui/icons-material/Update';
import React, { useEffect, useRef, type SetStateAction } from 'react';
import { Link } from 'react-router-dom';

import { startEditPost } from '@/features/post/post.slice';
import { UseAppDispatch } from '@/store';
import type { IPost } from '@/types/type';

interface Props {
  setIsEdit: React.Dispatch<SetStateAction<boolean>>;
  dotRef: React.RefObject<HTMLDivElement | null>;
  post: IPost;
  setOpenModel?: React.Dispatch<React.SetStateAction<string>>;
  setOpenDeleteModel: React.Dispatch<SetStateAction<boolean>>;
}
const PostMenu = ({
  setIsEdit,
  dotRef,
  post,
  setOpenModel,
  setOpenDeleteModel,
}: Props) => {
  const ref = useRef<HTMLUListElement>(null);
  const dispatch = UseAppDispatch();
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        dotRef.current &&
        !dotRef.current.contains(e.target as Node)
      ) {
        setIsEdit(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);

    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [setIsEdit, dotRef]);
  return (
    <>
      <ul
        ref={ref}
        className="absolute top-6 right-6 z-10 min-w-[200px] overflow-hidden rounded-md bg-(--background-primary) text-(--textColor)"
      >
        <Link className="text-inherit!" to={``}>
          <li
            className="hover:bg-accent flex cursor-pointer items-center gap-2.5 p-2"
            onClick={() => {
              dispatch(startEditPost(post));
              if (setOpenModel) {
                setOpenModel('post-model');
              }
            }}
          >
            <UpdateIcon />
            Chỉnh sửa bài viết
          </li>
        </Link>

        <li
          className="hover:bg-accent flex cursor-pointer items-center gap-2.5 p-2"
          onClick={() => setOpenDeleteModel(true)}
        >
          <AutoDeleteIcon />
          Chuyển vào thùng rác
        </li>
      </ul>
    </>
  );
};

export default PostMenu;

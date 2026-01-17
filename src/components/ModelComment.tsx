import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';

import SendIcon from '@/assets/icons/send-message.png';
import CommentTree from '@/components/CommentTree';
import Post from '@/components/Post';
import type { IPost } from '@/types/type';

interface ModelCommentProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveReaction: React.Dispatch<React.SetStateAction<string | null>>;
  post: IPost;
}

const mockComments = [
  {
    _id: '1',
    user: {
      name: 'Nguyễn Công Hiệp',
      avatar: 'https://i.pravatar.cc/150?u=hiep',
    },
    content: 'Giao diện này nhìn mượt đấy, dùng Tailwind đúng không bạn?',
    createdAt: '2 giờ trước',
    replies: [
      {
        _id: '1-1',
        user: {
          name: 'Admin',
          avatar: 'https://i.pravatar.cc/150?u=admin',
        },
        content:
          'Đúng rồi bạn, mình dùng Tailwind và vẽ dây nối bằng CSS Border.',
        createdAt: '1 giờ trước',
        replies: [
          {
            _id: '2-6',
            user: {
              name: 'Lê Nam',
              avatar: 'https://i.pravatar.cc/150?u=nam',
            },
            content: 'Cho mình xin đoạn CSS vẽ cái dây cong với!',
            createdAt: '30 phút trước',
            replies: [],
          },
          {
            _id: '2-71212',
            user: {
              name: 'Lê Nam',
              avatar: 'https://i.pravatar.cc/150?u=nam',
            },
            content: 'Cho mình xin đoạn CSS vẽ cái dây cong với!',
            createdAt: '30 phút trước',
            replies: [
              {
                _id: '2-7',
                user: {
                  name: 'Lê Nam',
                  avatar: 'https://i.pravatar.cc/150?u=nam',
                },
                content: 'Cho mình xin đoạn CSS vẽ cái dây cong với!',
                createdAt: '30 phút trước',
                replies: [],
              },
            ],
          },
        ],
      },
      {
        _id: '1-412',
        user: {
          name: 'Trần Hoa',
          avatar: 'https://i.pravatar.cc/150?u=hoa',
        },
        content: 'Màu xám nhạt nhìn sang thật sự.',
        createdAt: '45 phút trước',
        replies: [],
      },
    ],
  },
  {
    _id: 'sds',
    user: {
      name: 'Trần Hoa',
      avatar: 'https://i.pravatar.cc/150?u=hoa',
    },
    content: 'Màu xám nhạt nhìn sang thật sự.',
    createdAt: '45 phút trước',
    replies: [
      {
        _id: '1-1123',
        user: {
          name: 'Admin',
          avatar: 'https://i.pravatar.cc/150?u=admin',
        },
        content:
          'Đúng rồi bạn, mình dùng Tailwind và vẽ dây nối bằng CSS Border.',
        createdAt: '1 giờ trước',
        replies: [
          {
            _id: '2-6wwww',
            user: {
              name: 'Lê Nam',
              avatar: 'https://i.pravatar.cc/150?u=nam',
            },
            content: 'Cho mình xin đoạn CSS vẽ cái dây cong với!',
            createdAt: '30 phút trước',
            replies: [],
          },
          {
            _id: '2-7123',
            user: {
              name: 'Lê Nam',
              avatar: 'https://i.pravatar.cc/150?u=nam',
            },
            content: 'Cho mình xin đoạn CSS vẽ cái dây cong với!',
            createdAt: '30 phút trước',
            replies: [],
          },
        ],
      },
      {
        _id: '1-4122212',
        user: {
          name: 'Trần Hoa',
          avatar: 'https://i.pravatar.cc/150?u=hoa',
        },
        content: 'Màu xám nhạt nhìn sang thật sự.',
        createdAt: '45 phút trước',
        replies: [],
      },
    ],
  },
];
const ModelComment = ({
  isVisible,
  setIsVisible,
  setActiveReaction,
  post,
}: ModelCommentProps) => {
  const [replyingId, setReplyingId] = useState<string[]>([]);
  const handleOpenReply = (id: string) => {
    setReplyingId(pre => (pre.includes(id) ? pre : [...pre, id]));
  };
  useEffect(() => {
    if (isVisible) {
      document.body.style.paddingRight = '15px';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isVisible]);
  return (
    <div className="pointer-events-auto fixed inset-0 z-100 bg-gray-500/50 shadow-[0px_0px_1px_1px_rgba(0_0_0/0.2)]">
      <div className="flex h-full w-full items-center justify-center">
        <div className="relative flex h-screen w-full md:w-[80%] md:h-[95vh] lg:w-[50%] flex-col rounded-2xl bg-white p-2">
          <div className="flex h-15 w-full items-center justify-between border-b border-b-[#cecece] bg-white p-2">
            <span></span>
            <span className="text-[1rem] font-bold text-[#080809]">
              Bài viết của {`${post.firstName + ' ' + post.lastName}`}
            </span>
            <div
              className="flex h-9 w-9 items-center justify-center rounded-[50%] bg-[#D3D6DA] hover:bg-[#cecece]"
              onClick={() => setIsVisible(false)}
            >
              <CloseIcon fontSize="small" className="cursor-pointer" />
            </div>
          </div>
          <div className="no-scrollbar h-full w-full flex-1 overflow-y-auto overflow-x-hidden">
            <Post
              post={post}
              setIsVisible={setIsVisible}
              setActiveReaction={setActiveReaction}
              noShadow
            />
            <CommentTree
              comments={mockComments}
              handleOpenReply={handleOpenReply}
              replyingId={replyingId}
            />
            <div></div>
          </div>

          <div className={`sticky bottom-0 flex h-fit items-center pt-3`}>
            <div className="sticky bottom-0 flex h-auto flex-1 items-start gap-1">
              <img
                src={
                  'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'
                }
                alt=""
                className="z-100 h-8 w-8 cursor-pointer rounded-[50%]"
              />
              <div className="flex w-full items-center justify-between rounded-[12px] bg-[#F0F2F5] px-2 py-1.5">
                <textarea
                  contentEditable={false}
                  className="no-scrollbar relative h-auto w-full resize-none text-[13px] leading-5 break-all outline-none"
                  placeholder="Viết bình luận...."
                ></textarea>
                <img
                  src={SendIcon}
                  alt=""
                  className="ml-2.5 h-5 w-5 cursor-pointer self-end object-contain"
                />
              </div>

              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelComment;

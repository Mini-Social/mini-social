import { PhotoProvider, PhotoView } from 'react-photo-view';

import noAvatar from '@/assets/avatars/noavatar.png';
import 'react-photo-view/dist/react-photo-view.css';

interface Props {
  isOwn: boolean;
  content: string;
  images?: string[];
  avatar: string;
  createdAt: Date;
  isLast?: boolean;
  isRead?: boolean;
  scrollToBottom: () => void;
}
const API_URL = import.meta.env.VITE_API_URL;
const MessageItem = ({
  isOwn,
  content,
  images,
  avatar,
  scrollToBottom,
}: Props) => {
  const isEmoji = (content: string) => {
    const emojiRegex = /^\p{Emoji_Presentation}+$/u;
    return emojiRegex.test(content);
  };
  return (
    <>
      <div className="mt-1">
        {/* <div className={`px-5 py-4 text-center`}>
      <span className="text-xs text-[#65686c]">
        {FormatDate(createdAt, true)}
      </span>
    </div> */}
        <div
          className={`flex ${content && images && images?.length > 0 && 'flex-col'} ${isOwn ? 'justify-end' : 'justify-start'} flex items-end gap-1 px-2`}
        >
          {!isOwn && (
            <img
              className="h-7 w-7 shrink-0 rounded-[50%] object-cover"
              src={avatar ? API_URL + `avatars/${avatar}` : noAvatar}
              alt=""
            />
          )}
          {content && !isEmoji(content) ? (
            <div
              className={`mr-2 max-w-[70%] rounded-[20px] px-3 py-2 ${isOwn ? 'bg-[#4244F9] text-white' : 'bg-(--background-primary) text-(--textColor)'}`}
            >
              <p className="wrap-break-word break-all whitespace-pre-wrap">
                {content}
              </p>
            </div>
          ) : (
            <div className="max-w-[70%]">
              <p className="text-2xl wrap-break-word break-all whitespace-pre-wrap">
                {content}
              </p>
            </div>
          )}
          {images && images.length > 0 && (
            <div
              className={`flex flex-col ${isOwn ? 'justify-end' : 'justify-start'} gap-0.5`}
            >
              {images.map((image, index) => (
                <PhotoProvider key={index}>
                  <PhotoView src={API_URL + `messages/${image}`}>
                    <img
                      key={index}
                      src={API_URL + `messages/${image}`}
                      alt={`image-${index}`}
                      className="max-h-45 max-w-45 cursor-pointer rounded-lg object-cover"
                      onLoad={scrollToBottom}
                    />
                  </PhotoView>
                </PhotoProvider>
              ))}
            </div>
          )}
        </div>

        {/* {isOwn && isLast && isRead && (
          <div className="mt-2 mr-6 flex items-center justify-end">
            <img
              src={avatar ? API_URL + `avatars/${avatar}` : noAvatar}
              alt=""
              className="h-3.5 w-3.5 rounded-[50%]"
            />
          </div>
        )} */}
      </div>
      {/* <p className={`text-[12px] text-[#65686c] mt-2 ${isOwn ? 'text-right mr-2' : 'mr-auto'}`}>
        {FormatDate(createdAt, true )}
      </p> */}
    </>
  );
};

export default MessageItem;

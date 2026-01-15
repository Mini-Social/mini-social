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

import SendIcon from '@/assets/icons/send-message.png';
import Messages from '@/components/Messages';

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
    <div className="fixed right-40 bottom-0 z-99">
      <div className="h-113 w-82 rounded-tl-[12px] rounded-tr-[12px] bg-white">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex flex-1 items-center justify-between border-b p-1.5">
            <div className="flex items-center gap-2.5">
              <div className="relative h-8 w-8 rounded-[50%]">
                <img
                  className="h-full w-full rounded-[50%]"
                  src="https://scontent.fhph4-1.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s100x100&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=hXJ7wx4on2cQ7kNvwE0K8Ul&_nc_oc=Adleuo5_OpV0fcQZuFvhMG1onEE2hUwJegMc60PhCJfCbDFWYe6MkMyRt2jCkoUeBOT4cnoRP9rFAYVL1jFNh-Y3&_nc_ad=z-m&_nc_cid=0&_nc_zt=24&_nc_ht=scontent.fhph4-1.fna&oh=00_AfrGca5s9GroWK2H2h6J8QfNp6UitSFoc5wi_UNTo-C8HQ&oe=698EAE7A"
                  alt=""
                />
                <div className="absolute right-0 bottom-0 h-3 w-3 rounded-[50%] border-2 border-white bg-[#24832c]"></div>
              </div>
              <span className="font-medium">Nguyễn Công Hiệp</span>
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
              className="absolute bottom-18 -left-22 z-50"
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

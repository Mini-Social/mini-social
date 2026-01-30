import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useRef, useState } from 'react';

import Contacts from '@/components/Contacts';
import Conversations from '@/components/Conversations';
import ConversationTabFilter from '@/components/ConversationTabFilter';
import Tooltip from '@/components/Tooltip';

interface Props {
  open: string;
  setOpen: React.Dispatch<React.SetStateAction<string>>;
  refIcon: React.RefObject<HTMLDivElement | null>;
}

const ModelConversation = ({ open, setOpen, refIcon }: Props) => {
  const [active, setActive] = useState<string>('All');
  const [showContacts, setShowContacts] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        refIcon?.current &&
        !refIcon.current.contains(event.target as Node)
      ) {
        setOpen('');
      }
    };
    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, [ref, setOpen, refIcon]);
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (open === 'conversation' && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);
  return (
    <div
      className="bg-background fixed top-17 z-998 h-[calc(100vh-11rem)] w-screen rounded-[12px] shadow-[0px_0px_1px_1px_rgba(0,0,0,0.1)] md:right-20 md:h-140 md:w-[380px]"
      ref={ref}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-3 pt-4 pb-1">
          <h1 className="text-2xl! font-bold!">Đoạn chat</h1>
          <div className="group relative cursor-pointer">
            <CreateIcon fontSize="small" />
            <Tooltip>
              <span>Tin nhắn mới</span>
            </Tooltip>
          </div>
        </div>
        <div className="my-2 flex items-center gap-2 px-4">
          {showContacts && (
            <div
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[50%] hover:bg-(--hoverColor)"
              onClick={() => {
                setShowContacts(false);
                setSearch('');
              }}
            >
              <ArrowBackIcon fontSize="small" />
            </div>
          )}
          <div className="flex flex-1 items-center rounded-[99px] bg-(--background-primary)">
            <SearchIcon
              className="pl-2.5"
              style={{
                width: 32,
                height: 32,
              }}
            />
            <input
              type="text"
              className="w-full flex-1 px-1.5 py-2 text-[16px] outline-none placeholder:text-[16px] placeholder:text-[#808080]"
              placeholder="Search for conversations"
              onFocus={() => setShowContacts(true)}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        {!showContacts && (
          <ConversationTabFilter active={active} setActive={setActive} />
        )}
        {!showContacts && <Conversations active={active} />}
        {showContacts && <Contacts search={search} />}
      </div>
    </div>
  );
};

export default ModelConversation;

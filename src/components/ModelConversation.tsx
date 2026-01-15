import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';

import ConversationTabFilter from '@/components/ConversationTabFilter';
import Tooltip from '@/components/Tooltip';

const ModelConversation = () => (
  <div className="absolute right-0 bottom-0 h-140 min-w-90 translate-x-[20%] translate-y-[104%] rounded-[12px] bg-white shadow-[0px_0px_1px_1px_rgba(0,0,0,0.1)]">
    <div className="flex items-center justify-between px-3 pt-4 pb-1">
      <h1 className="text-2xl! font-bold!">Đoạn chat</h1>
      <div className="group relative cursor-pointer">
        <CreateIcon fontSize="small" />
        <Tooltip>
          <span>Tin nhắn mới</span>
        </Tooltip>
      </div>
    </div>
    <div className="my-2 px-4">
      <div className="flex items-center rounded-[99px] bg-[#F0F2F5]">
        <SearchIcon
          className="pl-2.5"
          style={{
            width: 32,
            height: 32,
          }}
        />
        <input
          type="text"
          className="flex-1 px-1.5 py-2 outline-none"
          placeholder="Search for conversations"
        />
      </div>
    </div>
        <ConversationTabFilter />

  </div>
);

export default ModelConversation;

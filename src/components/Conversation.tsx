import noAvatar from "@/assets/avatars/noavatar.png"
import { FormatDate } from "@/utils/formatDate"

interface Props {
  avatar: string,
  groupName: string | null,
  lastMessage: string,
  lastMessageAt: string,
  unReadCount: number
  lastSenderId: string
}

const Conversation = ({avatar, groupName, lastMessage, lastMessageAt, unReadCount, lastSenderId}: Props) => (
    <div className='p-2 flex items-center justify-between'>
        <div className="flex items-center gap-2.5 w-full rounded-[8px] hover:bg-[#F0F2F5] cursor-pointer">
          <div className="p-1.5 w-17 h-17 rounded-[50%] overflow-hidden">
            <img src={avatar || noAvatar} alt="" className="w-full h-full rounded-[50%]"/>
        </div>
        <div className="flex flex-1 flex-col">
            <div className="flex items-center gap-1.5 mb-1">
                <span className="font-bold text-[14px]">{groupName}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <p className={`text-xs text-[#666] max-w-[177px] line-clamp-1 ${unReadCount > 0 ? 'font-bold text-black' : ''}`}>{lastSenderId === 'You' ? `You: ${lastMessage}` : lastMessage}</p>
            <span className="text-xs text-[#666]">{FormatDate(lastMessageAt,false)}</span>
            </div>
        </div>
         {unReadCount > 0 && <span className="w-3 h-3 rounded-[50%] bg-[#005FC6] mr-2.5 flex items-center justify-center"></span> }
        </div>
    </div>
  )

export default Conversation

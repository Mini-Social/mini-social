
interface Props {
  avatar: string,
  groupName: string,
  lastMessage: string,
  lastMessageAt: string
}

const Conversation = ({avatar, groupName, lastMessage, lastMessageAt}: Props) => (
    <div className='p-2 flex items-center'>
        <div className="p-1.5 w-14 h-14 rounded-[50%] overflow-hidden">
            <img src={avatar} alt="" className="w-full h-full"/>
        </div>
    </div>
  )

export default Conversation

import Conversation from "@/components/Conversation"

const conversations = [
  // 1. Chat cá nhân (Đã có sẵn)
  {
    _id: '65a90001e9b1a12f9c001001',
    members: ['65a8ef88e9b1a12f9c000111', '65a8ef99e9b1a12f9c000222'],
    type: 'private',
    groupName: "Nguyễn Văn A",
    avatar: 'https://i.pravatar.cc/150?img=1',
    groupAdmin: [],
    lastMessage: 'Chào bạn, tối nay rảnh không?',
    lastSenderId: '65a8ef88e9b1a12f9c000111',
    lastMessageAt: '2026-01-15T09:10:30.000',
    unReadCount: [{
 userId: '65a8ef99e9b1a12f9c000222', count: 2
}],
    createdAt: '2026-01-15T08:00:00.000Z',
    updatedAt: '2026-01-15T09:10:30.000Z'
  },
  // 2. Nhóm công việc (Đã có sẵn)
  {
    _id: '65a90002e9b1a12f9c001002',
    members: ['65a8ef88e9b1a12f9c000111', '65a8ef99e9b1a12f9c000222', '65a8ef77e9b1a12f9c000333'],
    type: 'group',
    groupName: 'Nhóm React Dev',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg1MndL-Xp1JcnqaB0YOqTp6zDjrwYyGKsPA&s',
    groupAdmin: ['65a8ef88e9b1a12f9c000111'],
    lastMessage: 'Mọi người nhớ push code trước 6h nhé',
    lastSenderId: '65a8ef88e9b1a12f9c000111',
    lastMessageAt: '2026-01-15T10:05:00.000',
    unReadCount: [
      {
 userId: '65a8ef99e9b1a12f9c000222', count: 1
},
      {
 userId: '65a8ef77e9b1a12f9c000333', count: 3
}
    ],
    createdAt: '2026-01-14T14:20:00.000Z',
    updatedAt: '2026-01-15T10:05:00.000Z'
  },
  // 3. Chat cá nhân - Bạn thân (Đã đọc hết)
  {
    _id: '65a90003e9b1a12f9c001003',
    members: ['65a8ef88e9b1a12f9c000111', '65a8ef66e9b1a12f9c000444'],
    type: 'private',
    groupName: "Trần Thị B",
    avatar: 'https://i.pravatar.cc/150?img=5',
    groupAdmin: [],
    lastMessage: 'Đã gửi một ảnh',
    lastSenderId: '65a8ef66e9b1a12f9c000444',
    lastMessageAt: '2026-01-16T15:30:00.000Z',
    unReadCount: [{
      userId: '65a8ef88e9b1a12f9c000111',
      count: 1
    }], // Không có userId trong này tức là đã đọc hết
    createdAt: '2026-01-10T10:00:00.000Z',
    updatedAt: '2026-01-16T15:30:00.000Z'
  },
  // 4. Nhóm Gia Đình (Nhiều tin nhắn chưa đọc)
  {
    _id: '65a90004e9b1a12f9c001004',
    members: ['65a8ef88e9b1a12f9c000111', '65a8ef55e9b1a12f9c000555', '65a8ef44e9b1a12f9c000666', '65a8ef33e9b1a12f9c000777'],
    type: 'group',
    groupName: 'Gia Đình ❤️',
    avatar: 'https://i.pravatar.cc/150?img=12',
    groupAdmin: ['65a8ef55e9b1a12f9c000555'],
    lastMessage: 'Cuối tuần này về quê ăn giỗ nha các con',
    lastSenderId: '65a8ef55e9b1a12f9c000555',
    lastMessageAt: '2026-01-17T07:45:00.000',
    unReadCount: [{
 userId: '65a8ef88e9b1a12f9c000111', count: 15
}],
    createdAt: '2025-12-01T09:00:00.000Z',
    updatedAt: '2026-01-17T07:45:00.000Z'
  },
  // 5. Chat với người lạ (Chưa có tên trong danh bạ)
  {
    _id: '65a90005e9b1a12f9c001005',
    members: ['65a8ef88e9b1a12f9c000111', '65a8ef22e9b1a12f9c000888'],
    type: 'private',
    groupName: "+84 987 654 321",
    avatar: '', // Không có avatar
    groupAdmin: [],
    lastMessage: 'Shop ơi mình muốn hỏi về đơn hàng hôm qua',
    lastSenderId: '65a8ef22e9b1a12f9c000888',
    lastMessageAt: '2026-01-17T14:20:00.000',
    unReadCount: [],
    createdAt: '2026-01-17T14:15:00.000Z',
    updatedAt: '2026-01-17T14:20:00.000Z'
  },
  // 6. Nhóm nhậu (Tin nhắn cũ)
  {
    _id: '65a90006e9b1a12f9c001006',
    members: ['65a8ef88e9b1a12f9c000111', '65a8ef11e9b1a12f9c000999', '65a8ef00e9b1a12f9c001010'],
    type: 'group',
    groupName: 'Hội Ăn Nhậu',
    avatar: 'https://i.pravatar.cc/150?img=32',
    groupAdmin: ['65a8ef11e9b1a12f9c000999'],
    lastMessage: 'Tửu lượng dạo này kém quá nhé!',
    lastSenderId: '65a8ef00e9b1a12f9c001010',
    lastMessageAt: '2026-01-10T23:59:00.000',
    unReadCount: [
      {
         userId: '65a8ef88e9b1a12f9c000111', count: 1
      }
    ],
    createdAt: '2025-10-10T12:00:00.000Z',
    updatedAt: '2026-01-10T23:59:00.000Z'
  }
];

const Conversations = ({active}: {active: string}) => {
  const myId = '65a8ef88e9b1a12f9c000111';
  const arrangeConversations = conversations.sort((a,b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime())
  const filterConversations = arrangeConversations.filter((convo) => {
    if(active === 'All') {return true}
    else if(active === 'Unread') {
      return (convo.unReadCount.find((item) => item.userId === myId)?.count) ?? 0 > 0
    }
    else if(active === 'Group') {return convo.type === 'group'}
  })
  return  <>
    <div className="flex flex-col flex-1 overflow-y-auto xs:no-scrollbar custom-scrollbar">
    {filterConversations.map((convo) => <Conversation key={convo._id} avatar={convo.avatar} groupName={convo.groupName} lastMessage={convo.lastMessage} lastMessageAt={convo.lastMessageAt} lastSenderId={convo.lastSenderId === myId ? 'You' : convo.lastSenderId} unReadCount = {convo.unReadCount.find((item) => item.userId === myId)?.count || 0} />)}
    </div>
    </>

}

export default Conversations

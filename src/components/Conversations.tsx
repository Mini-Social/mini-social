import Conversation from "@/components/Conversation"

const users = [
    {
      _id: '65a8ef88e9b1a12f9c000111',
      name: 'Nguyễn Văn A',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      _id: '65a8ef99e9b1a12f9c000222',
      name: 'Trần Thị B',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
      _id: '65a8ef77e9b1a12f9c000333',
      name: 'Lê Văn C',
      avatar: 'https://i.pravatar.cc/150?img=3'
    }
]

const conversations = [
     {
      _id: '65a90001e9b1a12f9c001001',
      members: [
        '65a8ef88e9b1a12f9c000111',
        '65a8ef99e9b1a12f9c000222'
      ],
      type: 'private',
      groupName: null,
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg1MndL-Xp1JcnqaB0YOqTp6zDjrwYyGKsPA&s',
      groupAdmin: [],
      lastMessage: 'Chào bạn, tối nay rảnh không?',
      lastSenderId: '65a8ef88e9b1a12f9c000111',
      lastMessageAt: '2026-01-15T09:10:30.000Z',
      unReadCount: [
        {
          userId: '65a8ef99e9b1a12f9c000222',
          count: 2
        }
      ],
      createdAt: '2026-01-15T08:00:00.000Z',
      updatedAt: '2026-01-15T09:10:30.000Z'
    },

    {
      _id: '65a90002e9b1a12f9c001002',
      members: [
        '65a8ef88e9b1a12f9c000111',
        '65a8ef99e9b1a12f9c000222',
        '65a8ef77e9b1a12f9c000333'
      ],
      type: 'group',
      groupName: 'Nhóm React Dev',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg1MndL-Xp1JcnqaB0YOqTp6zDjrwYyGKsPA&s',
      groupAdmin: [
        '65a8ef88e9b1a12f9c000111'
      ],
      lastMessage: 'Mọi người nhớ push code trước 6h nhé',
      lastSenderId: '65a8ef88e9b1a12f9c000111',
      lastMessageAt: '2026-01-15T10:05:00.000Z',
      unReadCount: [
        {
          userId: '65a8ef99e9b1a12f9c000222',
          count: 1
        },
        {
          userId: '65a8ef77e9b1a12f9c000333',
          count: 3
        }
      ],
      createdAt: '2026-01-14T14:20:00.000Z',
      updatedAt: '2026-01-15T10:05:00.000Z'
    }
  ]


const Conversations = () => (
    <>
     {conversations.map((convo) => <Conversation key={convo._id} avatar={convo.avatar} groupName={convo.groupName} />)}
    </>
  )

export default Conversations

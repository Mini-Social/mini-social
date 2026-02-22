type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
export interface IComment {
  _id: string;
  postId: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    avatar: string;
  };
  content: string;
  image: string | null;
  parentCommentId: {
    _id: string;
    userId: {
      _id: string,
      userName: string;
      firstName: string;
      lastName: string;
    };
  } | null;
  replyToId: {
    _id: string;
    userId: {
      _id: string,
      userName: string;
      firstName: string;
      lastName: string;
    };
  } | null;
  reactions: {
    like: number;
    love: number;
    haha: number;
    wow: number;
    sad: number;
    angry: number;
  };
  userReactions: [
    {
      userId: {
        _id: string;
        firstName: string;
        lastName: string;
        userName: string;
        avatar: string;
      };
      reactions: ReactionType;
      reactionAt: Date;
    },
  ];
  replyCount: number;
  deleted: boolean;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

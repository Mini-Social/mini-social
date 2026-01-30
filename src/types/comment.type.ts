type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';
export interface IComment {
  _id: string;
  postId: string;
  userId: {
    firstName: string;
    lastName: string;
    userName: string;
    avatar: string;
  };
  content: string;
  image: string | null;
  parentCommentId: IComment | null;
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

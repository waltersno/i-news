export interface IComment {
  id: number;
  newsId: number;
  author: string;
  body: string;
  childrenCount: number;
}

export type IChildrenComment = Pick<IComment, 'author' | 'body' | 'id'> & {
  commentId: number;
};

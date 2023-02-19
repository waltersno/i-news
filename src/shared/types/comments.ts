export interface IComment {
  id: number;
  newsId: number;
  author: string;
  body: string;
  children: Omit<IComment, 'children'>[];
}

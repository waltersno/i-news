import { FC } from 'react';
import classes from './CommentCard.module.css';

interface ICommentCard {
  author: string;
  body: string;
}

export const CommentCard: FC<ICommentCard> = ({ author, body }) => {
  return (
    <article>
      <h3>{author}</h3>
      <p>{body}</p>
    </article>
  );
};

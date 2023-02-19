import { CommentCard } from 'entity/Comment/ui/CommentCard/CommentCard';
import { FC, useEffect, useState } from 'react';
import { getCommentsByNewsId } from 'shared/api/comments';
import { IComment } from 'shared/types/comments';

import classes from './NewsComments.module.css';

interface INewsComments {
  newsId: string;
}

export const NewsComments: FC<INewsComments> = ({ newsId }) => {
  const [comments, setComments] = useState<IComment[] | null>(null);

  useEffect(() => {
    getCommentsByNewsId(newsId).then((resComments) => {
      setComments(resComments);
    });
  }, []);

  if (!comments) {
    return <h3>Загрузка...</h3>;
  }

  return (
    <div>
      <h3 className={classes.head}>Комментарий:</h3>
      {comments.length === 0 ? (
        <h3>Нету комментариев!</h3>
      ) : (
        <ul>
          {comments.map(({ author, body, id, children }) => (
            <li key={id}>
              <CommentCard author={author} body={body} />
              <ul className={classes.childComments}>
                {children?.map(({ author, body, id }) => {
                  return (
                    <li key={id}>
                      <CommentCard author={author} body={body} />
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

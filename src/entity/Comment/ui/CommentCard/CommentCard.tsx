import { Dispatch, FC, RefObject, SetStateAction, useEffect, useState } from 'react';
import { fetchChildCommentsApi } from 'shared/api/comments';
import { IChildrenComment } from 'shared/types/comments';
import classes from './CommentCard.module.css';

interface ICommentCard {
  author: string;
  body: string;
  childrenCount: number;
  id: number;
  setCommentValue: Dispatch<SetStateAction<string>>;
  setReplyCommentId: Dispatch<SetStateAction<number | null>>;
  formRef: RefObject<HTMLTextAreaElement>;
}

export const CommentCard: FC<ICommentCard> = ({
  author,
  body,
  childrenCount,
  id,
  formRef,
  setCommentValue,
  setReplyCommentId,
}) => {
  const [showChildrenComments, setShowChildrenComments] = useState(false);
  const [childComments, setChildComments] = useState<IChildrenComment[]>([]);

  const fetchChildComments = () => {
    fetchChildCommentsApi(id).then((data) => {
      setChildComments(data);
    });
  };

  useEffect(() => {
    if (showChildrenComments) {
      fetchChildComments();
    }
  }, [showChildrenComments]);

  useEffect(() => {
    fetchChildComments();
  }, [childrenCount]);

  const toggleChildrenComments = () => {
    setShowChildrenComments((prev) => !prev);
  };

  useEffect(() => {
    fetchChildComments();
  }, [childrenCount]);

  const handleReplyToComment = (author: string) => {
    formRef.current?.focus();
    setCommentValue(`@${author}`);
    setReplyCommentId(id);
  };

  return (
    <article className={classes.parentComment}>
      <h3>{author}</h3>
      <p>{body}</p>

      <div className={classes.commentActions}>
        {childrenCount >= 1 && (
          <button className={classes.greenButton} type='submit' onClick={toggleChildrenComments}>
            {showChildrenComments
              ? `Скрыть ответы  (${childrenCount})`
              : `Показать ответы (${childrenCount})`}
          </button>
        )}

        <button onClick={() => handleReplyToComment(author)} className={classes.greenButton}>
          Ответить
        </button>
      </div>

      {childrenCount >= 1 && showChildrenComments && (
        <ul className={classes.childComments}>
          {childComments.map(({ author, body, id }) => {
            return (
              <li className={classes.childCommentCard} key={id}>
                <div>
                  <h3>{author}</h3>
                  <p>{body}</p>
                </div>
                <button
                  className={classes.greenButton}
                  onClick={() => handleReplyToComment(author)}
                >
                  Ответить
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
};

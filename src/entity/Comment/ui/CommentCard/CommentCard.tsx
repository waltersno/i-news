import { Dispatch, FC, RefObject, SetStateAction, useEffect, useState } from 'react';
import { deleteChildComment, fetchChildCommentsApi, reduceReplyCount } from 'shared/api/comments';
import { ERoles } from 'shared/constants/roles';
import { useAuth } from 'shared/hooks/useAuth';
import { IChildrenComment } from 'shared/types/comments';

import classes from './CommentCard.module.css';

interface ICommentCard {
  author: string;
  body: string;
  childrenCount: number;
  id: number;
  formRef: RefObject<HTMLTextAreaElement>;
  setCommentValue: Dispatch<SetStateAction<string>>;
  setReplyCommentId: Dispatch<SetStateAction<number | null>>;
  handleDeleteComment: (id: number) => void;
  fetchAllComments: () => void;
}

export const CommentCard: FC<ICommentCard> = ({
  author,
  body,
  childrenCount,
  id,
  formRef,
  setCommentValue,
  setReplyCommentId,
  handleDeleteComment,
  fetchAllComments,
}) => {
  const [showChildrenComments, setShowChildrenComments] = useState(false);
  const [childComments, setChildComments] = useState<IChildrenComment[]>([]);
  const { user } = useAuth();

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
    if (showChildrenComments) {
      fetchChildComments();
    }
  }, [childrenCount]);

  const toggleChildrenComments = () => {
    setShowChildrenComments((prev) => !prev);
  };

  const handleReplyToComment = (author: string) => {
    formRef.current?.focus();
    setCommentValue(`@${author}`);
    setReplyCommentId(id);
  };

  const handleDeleteChildComment = async (childCommentId: number) => {
    await reduceReplyCount(id);
    deleteChildComment(childCommentId).then(() => {
      fetchAllComments();
    });
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

        {user?.role === ERoles.Admin && (
          <button className={classes.dangerButton} onClick={() => handleDeleteComment(id)}>
            Удалить
          </button>
        )}
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
                <div className={classes.childCommentActions}>
                  <button
                    className={classes.greenButton}
                    onClick={() => handleReplyToComment(author)}
                  >
                    Ответить
                  </button>
                  {user?.role === ERoles.Admin && (
                    <button
                      className={classes.dangerButton}
                      onClick={() => handleDeleteChildComment(id)}
                      color='danger'
                    >
                      Удалить
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
};

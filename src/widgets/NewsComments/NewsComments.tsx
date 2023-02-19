import { CommentCard } from 'entity/Comment/ui/CommentCard/CommentCard';
import {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  createCommentToNews,
  createCommentToParentComment,
  deleteParentComment,
  getCommentsByNewsId,
  increaseReplyCount,
} from 'shared/api/comments';
import { useAuth } from 'shared/hooks/useAuth';
import { IComment } from 'shared/types/comments';
import { CommentForm } from 'widgets/CommentForm/CommentForm';

import classes from './NewsComments.module.css';

interface INewsComments {
  newsId: string;
}

export const NewsComments: FC<INewsComments> = ({ newsId }) => {
  const [replyCommentId, setReplyCommentId] = useState<number | null>(null);
  const [comments, setComments] = useState<IComment[] | null>(null);
  const [commentValue, setCommentValue] = useState('');
  const formRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useAuth();

  const fetchAllComments = useCallback(() => {
    getCommentsByNewsId(newsId).then((resComments) => {
      setComments(resComments);
    });
  }, []);

  useEffect(() => {
    fetchAllComments();
  }, []);

  const createCommentHandle: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    if (commentValue.length < 2) {
      return;
    }

    if (replyCommentId) {
      await createCommentToParentComment(replyCommentId, {
        author: user?.login as string,
        body: commentValue,
      });

      await increaseReplyCount(replyCommentId);
      fetchAllComments();
      setCommentValue('');
      return;
    }

    createCommentToNews(newsId, {
      author: user?.login as string,
      body: commentValue,
      newsId: +newsId,
      childrenCount: 0,
    }).then(() => {
      fetchAllComments();
      setCommentValue('');
    });
  };

  const handleOnChangeCommentValue: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setCommentValue(event.target.value);
  };

  useEffect(() => {
    if (commentValue === '') {
      setReplyCommentId(null);
    }
  }, [commentValue]);

  const handleDeleteComment = useCallback((id: number) => {
    deleteParentComment(id).then(() => {
      fetchAllComments();
    });
  }, []);

  if (!comments) {
    return <h3>Загрузка...</h3>;
  }

  return (
    <div>
      <h3 className={classes.head}>Комментарий:</h3>
      <CommentForm
        formRef={formRef}
        commentValue={commentValue}
        createCommentHandle={createCommentHandle}
        handleOnChangeCommentValue={handleOnChangeCommentValue}
      />

      {comments.length === 0 ? (
        <h3>Нету комментариев!</h3>
      ) : (
        <ul className={classes.commentsWrapper}>
          {comments.map(({ author, body, id, childrenCount }) => (
            <li key={id}>
              <CommentCard
                handleDeleteComment={handleDeleteComment}
                formRef={formRef}
                setCommentValue={setCommentValue}
                setReplyCommentId={setReplyCommentId}
                id={id}
                author={author}
                body={body}
                childrenCount={childrenCount}
                fetchAllComments={fetchAllComments}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

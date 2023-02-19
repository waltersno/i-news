import { ChangeEventHandler, FC, MouseEventHandler, RefObject } from 'react';
import classes from './CommentForm.module.css';

interface ICommentForm {
  commentValue: string;
  handleOnChangeCommentValue: ChangeEventHandler<HTMLTextAreaElement>;
  createCommentHandle: MouseEventHandler<HTMLButtonElement>;
  formRef: RefObject<HTMLTextAreaElement>;
}

export const CommentForm: FC<ICommentForm> = ({
  commentValue,
  createCommentHandle,
  handleOnChangeCommentValue,
  formRef,
}) => {
  return (
    <form className={classes.commentForm}>
      <textarea ref={formRef} value={commentValue} onChange={handleOnChangeCommentValue} />
      <button type='submit' onClick={createCommentHandle}>
        Отправить
      </button>
    </form>
  );
};

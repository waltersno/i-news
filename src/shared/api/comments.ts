import { api } from 'app/config/api';
import { IChildrenComment, IComment } from 'shared/types/comments';

export const getCommentsByNewsId = (newsId: string) => api<IComment[]>(`news/${newsId}/comments`);

export const getCommentsById = (commentId: number) => api<IComment>(`comments/${commentId}`);

export const patchComment = (commentId: number, body: Partial<IComment>) =>
  api<IComment>(`comments/${commentId}`, undefined, body, 'PATCH');

export const createCommentToNews = (newsId: string, body: Omit<IComment, 'id'>) =>
  api<IComment[]>(`news/${newsId}/comments`, undefined, body, 'POST');

export const createCommentToParentComment = (
  parentId: number,
  body: Omit<IChildrenComment, 'id' | 'commentId'>,
) => api<IComment[]>(`comments/${parentId}/childrenComments`, undefined, body, 'POST');

export const deleteCommentToNews = (newsId: string, body: Omit<IComment, 'id'>) =>
  api<IComment[]>(`news/${newsId}/comments`, undefined, body, 'POST');

export const fetchChildCommentsApi = (commentId: number) =>
  api<IChildrenComment[]>(`comments/${commentId}/childrenComments`);

export const increaseReplyCount = async (commentId: number) => {
  const comment = await getCommentsById(commentId);
  await patchComment(commentId, {
    ...comment,
    childrenCount: comment.childrenCount + 1,
  });
};

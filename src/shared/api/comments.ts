import { api } from 'app/config/api';
import { IComment } from 'shared/types/comments';

export const getCommentsByNewsId = (newsId: string) => api<IComment[]>(`news/${newsId}/comments`);

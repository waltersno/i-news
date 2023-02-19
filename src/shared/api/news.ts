import { api } from 'app/config/api';
import { INews } from 'shared/types/news';

export const getAllNews = (params: Record<string, any> = { _page: '1', _limit: '5' }) =>
  api<INews[]>('news', params);

export const getNewsById = (id: string) => api<INews>(`news/${id}`);

import { INews } from 'shared/types/news';

const BASE_URL = 'http://localhost:3004';

async function api<T>(url: string, params?: Record<string, any>): Promise<T> {
  const response = await fetch(
    `${BASE_URL}/${url}?${params ? new URLSearchParams(params) : ''}`,
    {},
  );
  if (!response.ok) {
    // TODO: обрабатывать ошибки по другому
    console.error(response.statusText);
  }
  const data = await (response.json() as Promise<T>);
  return data;
}

export const getAllNews = (params: Record<string, any> = { _page: '1', _limit: '5' }) =>
  api<INews[]>('news', params);

export const getNewsById = (id: string) => api<INews>(`news/${id}`);

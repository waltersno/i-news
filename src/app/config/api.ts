const BASE_URL = 'http://localhost:3004';

export const api = async <T>(
  url: string,
  params?: Record<string, any>,
  body?: Record<string, any>,
  method = 'GET',
): Promise<T> => {
  const response = await fetch(`${BASE_URL}/${url}?${params ? new URLSearchParams(params) : ''}`, {
    method,
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    // TODO: обрабатывать ошибки по другому
    console.error(response.statusText);
  }
  const data = await (response.json() as Promise<T>);
  return data;
};

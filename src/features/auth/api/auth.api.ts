import { api } from 'app/config/api';
import { IUser } from 'shared/types/user';

export const getUserByLogin = (login: string) =>
  api<IUser[]>(`users`, {
    login,
  });

export const registerApi = (userData: IUser) =>
  api<IUser & { id: number }>(`users`, undefined, userData, 'POST');

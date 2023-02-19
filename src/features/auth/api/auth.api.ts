import { api } from 'app/config/api';
import { IUser } from 'shared/types/user';

export const login = (login: string) =>
  api<IUser[]>(`users`, {
    login,
  });

export const register = (userData: IUser) => api(`users`, undefined, userData, 'POST');

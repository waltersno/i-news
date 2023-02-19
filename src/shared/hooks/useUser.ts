import { AuthContext } from 'app/providers/auth-provider';
import { useContext } from 'react';
import { IUser } from 'shared/types/user';
import { useLocalStorage } from './useLocalStorage';

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  const addUser = (user: IUser) => {
    setUser(user);
    setItem('user', JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    setItem('user', '');
  };

  return { user, addUser, removeUser };
};
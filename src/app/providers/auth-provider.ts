import { createContext } from 'react';
import { IUser } from 'shared/types/user';

interface AuthContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
});
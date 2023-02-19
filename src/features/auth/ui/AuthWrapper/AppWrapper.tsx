import { FC, PropsWithChildren } from 'react';

import classes from './AuthWrapper.module.css';

export const AuthWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <main className={classes.main}>{children}</main>;
};

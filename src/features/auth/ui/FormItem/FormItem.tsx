import { FC } from 'react';

import { IFormItem } from 'shared/types/formItem';

import classes from './FormItem.module.css';

export const FormItem: FC<IFormItem> = ({ validateInfo, ...inputProps }) => {
  return (
    <div className={classes.formItem}>
      <input className={classes.input} {...inputProps} />
      {validateInfo && <span className={classes.errorText}>{validateInfo}</span>}
    </div>
  );
};

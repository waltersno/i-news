import { Dispatch, FC, SetStateAction } from 'react';

import classes from './Search.module.css';

interface ISearch {
  value: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export const Search: FC<ISearch> = ({ value, setSearchValue }) => {
  return (
    <form className={classes.searchForm}>
      <input
        placeholder='Поиск...'
        value={value}
        onChange={(event) => setSearchValue(event.target.value)}
        type='text'
      />
    </form>
  );
};

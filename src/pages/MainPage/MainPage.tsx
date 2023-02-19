import { NewsFeed } from 'widgets/NewsFeed/NewsFeed';
import classes from './MainPage.module.css';

export const MainPage = () => {
  return (
    <div className={classes.newsFeedWrapper}>
      <NewsFeed />
    </div>
  );
};

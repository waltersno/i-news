import { NewsView } from 'widgets/NewsView/NewsView';
import classes from './NewsPage.module.css';

export const NewsPage = () => {
  return (
    <div className={classes.newsPageWrapper}>
      <NewsView />
    </div>
  );
};

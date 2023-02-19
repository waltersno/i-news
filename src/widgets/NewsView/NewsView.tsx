import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNewsById } from 'shared/api/news';
import { INews } from 'shared/types/news';
import { NewsComments } from 'widgets/NewsComments/NewsComments';

import classes from './NewsView.module.css';

export const NewsView = () => {
  const [newsData, setNewsData] = useState<INews | null>(null);
  const { newsId } = useParams();
  const [comments, setComments] = useState([]);
  const [isVisibleComments, setIsVisibleComments] = useState(false);

  const toggleComments = () => {
    setIsVisibleComments((prevValue) => !prevValue);
  };

  useEffect(() => {
    getNewsById(newsId as string).then((newsData) => {
      setNewsData(newsData);
    });
  }, []);

  if (!newsData) {
    return <h3>Загрузка...</h3>;
  }

  return (
    <div className={classes.wrapper}>
      <h3>{newsData.title}</h3>
      <p>{newsData.body}</p>
      {!isVisibleComments && (
        <button type='button' onClick={toggleComments}>
          Показать комментарий
        </button>
      )}
      {isVisibleComments && <NewsComments />}
    </div>
  );
};

import { NewsCard } from 'entity/news/ui/NewsCard/NewsCard';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllNews } from 'shared/api/news';
import { INews } from 'shared/types/news';

import classes from './NewsFeed.module.css';

export const NewsFeed = () => {
  const [news, setData] = useState<INews[]>([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const hasMoreData = useRef(true);

  const loadData = () => {
    getAllNews().then((data) => {
      setData(data);
      setPage(page + 1);
    });
  };

  const moreData = () => {
    getAllNews({
      _page: page,
      _limit: 5,
    }).then((resNews) => {
      setIsFetching(false);
      setPage(page + 1);

      if (resNews.length === 0) {
        hasMoreData.current = false;
        return;
      }

      setData([...news, ...resNews]);
    });
  };

  const scrollHandle = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    setIsFetching(true);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('scroll', scrollHandle);
    return () => window.removeEventListener('scroll', scrollHandle);
  }, []);

  useEffect(() => {
    if (isFetching && hasMoreData.current) {
      moreData();
    }
  }, [isFetching]);

  if (news.length === 0) {
    return <h3>Loading...</h3>;
  }

  return (
    <ul className={classes.newsWrapper}>
      {news.map(({ body, id, title, image }) => (
        <li key={id}>
          <NewsCard key={id} body={body} id={id} title={title} image={image} />
        </li>
      ))}
      {isFetching && hasMoreData.current && <h2>Загрузка...</h2>}
    </ul>
  );
};

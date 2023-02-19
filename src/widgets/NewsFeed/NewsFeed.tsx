import { NewsCard } from 'entity/news/ui/NewsCard/NewsCard';
import { Search } from 'features/global-search/ui/Search/Search';
import { useEffect, useRef, useState } from 'react';
import { getAllNews } from 'shared/api/news';
import { useDebounce } from 'shared/hooks/useDebounce';
import { INews } from 'shared/types/news';

import classes from './NewsFeed.module.css';

export const NewsFeed = () => {
  const [news, setData] = useState<INews[] | null>(null);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const loadedInitialData = useRef(false);
  const hasMoreData = useRef(true);

  const debouncedSearchValue = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (!loadedInitialData.current) {
      return;
    }

    setPage(2);
    hasMoreData.current = true;

    getAllNews({
      _page: 1,
      _limit: 5,
      title_like: debouncedSearchValue,
    }).then((data) => {
      setData([...data]);
      setIsFetching(false);
    });
  }, [debouncedSearchValue]);

  const loadData = () => {
    getAllNews().then((data) => {
      loadedInitialData.current = true;
      setData(data);
      setPage(page + 1);
    });
  };

  const fetchMoreData = () => {
    getAllNews({
      _page: page,
      _limit: 5,
      title_like: debouncedSearchValue,
    }).then((resNews) => {
      setIsFetching(false);
      setPage(page + 1);

      if (resNews.length === 0) {
        hasMoreData.current = false;
        return;
      }

      if (news) {
        setData([...news, ...resNews]);
      } else {
        setData([...resNews]);
      }
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
      fetchMoreData();
    }
  }, [isFetching]);

  return (
    <div>
      <Search value={searchValue} setSearchValue={setSearchValue} />
      {!news && <h3>Загрузка</h3>}
      {news?.length === 0 ? (
        <h3>Ничего не найдено</h3>
      ) : (
        <ul className={classes.newsWrapper}>
          {news?.map(({ body, id, title, image }) => (
            <li key={id}>
              <NewsCard key={id} body={body} id={id} title={title} image={image} />
            </li>
          ))}
          {isFetching && hasMoreData.current && <h2>Загрузка...</h2>}
        </ul>
      )}
    </div>
  );
};

import { FC } from 'react';
import { Link } from 'react-router-dom';

import classes from './NewsCard.module.css';

interface INewsCard {
  id: number;
  title: string;
  body: string;
  image: string;
}

export const NewsCard: FC<INewsCard> = ({ id, title, body, image }) => {
  return (
    <Link to={`/${id}`}>
      <article className={classes.article}>
        <h3 className={classes.text}>{title}</h3>
        <img className={classes.newsImage} src={image} alt='' />
        <p className={classes.text}>{body}</p>
      </article>
    </Link>
  );
};

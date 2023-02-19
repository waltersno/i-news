import { images } from 'app/images/images';
import { Link } from 'react-router-dom';

import classes from './Header.module.css';

export const Header = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <Link className={classes.link} to='/'>
              Главная
            </Link>
          </li>
        </ul>
      </nav>
      <button type='button'>
        <img src={images.avatarIcon} alt='' />
      </button>
    </header>
  );
};

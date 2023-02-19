import { images } from 'app/images/images';
import { Link } from 'react-router-dom';
import { useAuth } from 'shared/hooks/useAuth';

import classes from './Header.module.css';

export const Header = () => {
  const { logout } = useAuth();

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
      <div className={classes.profile}>
        <img src={images.avatarIcon} alt='' />
        <div className={classes.profileDropdown}>
          <button className={classes.logoutButton} type='button' onClick={logout}>
            Выйти
          </button>
        </div>
      </div>
    </header>
  );
};

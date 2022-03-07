import AppHeaderStyles from './AppHeader.module.css';

import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'

function AppHeader() {  
  const { authorized } = useSelector((store) => store.registrationReducer)

  return (
    <header className={AppHeaderStyles.header}>
      <nav className={AppHeaderStyles.nav}>
          <Link to='/react-burger'
            className={AppHeaderStyles.nav__link}          
          >
            <BurgerIcon  />
            <p className="pl-2 text text_type_main-default">Конструктор</p>
          </Link>
          <Link to='/orderFeed'
            className={AppHeaderStyles.nav__link}            
          >
            <ListIcon  />
            <p className="pl-2 text text_type_main-default">Лента заказов</p>
          </Link>
      </nav>
      <Logo />
      <Link to={authorized ? '/profile': '/login'}
        className={AppHeaderStyles.account}        
      >
        <ProfileIcon  />
        <p className="pl-2 text text_type_main-default">Личный кабинет</p>
      </Link>
    </header>
  );
}

export default AppHeader;

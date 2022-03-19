import AppHeaderStyles from './AppHeader.module.css';

import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Link } from 'react-router-dom'

function AppHeader() {  

  return (
    <header className={AppHeaderStyles.header}>
      <nav className={AppHeaderStyles.nav}>
          <NavLink to='/react-burger'
            className={AppHeaderStyles.nav__link} 
            activeClassName={AppHeaderStyles.nav__link_active}         
          >
            <BurgerIcon  />
            <p className="pl-2 text text_type_main-default">Конструктор</p>
          </NavLink>
          <NavLink to='/feed'
            className={AppHeaderStyles.nav__link} 
            activeClassName={AppHeaderStyles.nav__link_active}           
          >
            <ListIcon />
            <p className="pl-2 text text_type_main-default">Лента заказов</p>
          </NavLink>
      </nav>
      <Link to='/react-burger'><Logo /></Link>
      <NavLink to='/profile'
        className={AppHeaderStyles.account} 
        activeClassName={AppHeaderStyles.nav__link_active}       
      >
        <ProfileIcon />
        <p className="pl-2 text text_type_main-default">Личный кабинет</p>
      </NavLink>
    </header>
  );
}

export default AppHeader;

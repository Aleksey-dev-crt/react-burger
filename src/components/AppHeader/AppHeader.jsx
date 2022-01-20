import AppHeaderStyles from './AppHeader.module.css';

import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {  

  return (
    <header className={AppHeaderStyles.header}>
      <nav className={AppHeaderStyles.nav}>
          <a href='/'
            className={'mt-4 mb-4 mr-2 pl-5 pr-5 ' + AppHeaderStyles.nav__link}          
          >
            <BurgerIcon  />
            <p className="pl-2 text text_type_main-default">Конструктор</p>
          </a>
          <a href='/'
            className={'mt-4 mb-4 mr-2 pl-5 pr-5 ' + AppHeaderStyles.nav__link}            
          >
            <ListIcon  />
            <p className="pl-2 text text_type_main-default">Лента заказов</p>
          </a>
      </nav>
      <Logo />
      <a href='/'
        className={'mt-4 mb-4 mr-2 pl-5 pr-5 ' + AppHeaderStyles.account}        
      >
        <ProfileIcon  />
        <p className="pl-2 text text_type_main-default">Личный кабинет</p>
      </a>
    </header>
  );
}

export default AppHeader;

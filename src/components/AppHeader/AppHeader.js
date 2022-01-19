import { useState } from 'react';
import AppHeaderStyles from './AppHeader.module.css';

import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  const [typeBurger, setTypeBurger] = useState('primary');
  const [typeList, setTypeList] = useState('primary');
  const [typeAccount, setTypeAccount] = useState('primary');

  const setPrimary = (e) => {
    if (e.currentTarget.lastChild.textContent === 'Конструктор') setTypeBurger('primary');
    if (e.currentTarget.lastChild.textContent === 'Лента заказов') setTypeList('primary');
    if (e.currentTarget.lastChild.textContent ==='Личный кабинет') setTypeAccount('primary');
  };

  const setSecondary = (e) => {
    if (e.currentTarget.lastChild.textContent === 'Конструктор') setTypeBurger('secondary');
    if (e.currentTarget.lastChild.textContent === 'Лента заказов') setTypeList('secondary');
    if (e.currentTarget.lastChild.textContent === 'Личный кабинет') setTypeAccount('secondary');
  };

  return (
    <header className={AppHeaderStyles.header}>
      <nav>
        <ul className={AppHeaderStyles.nav}>
          <li
            className={'mt-4 mb-4 mr-2 pl-5 pr-5 ' + AppHeaderStyles.nav__link}
            onMouseOver={setSecondary}
            onMouseOut={setPrimary}
          >
            <BurgerIcon type={typeBurger} />
            <p className="pl-2 text text_type_main-default">Конструктор</p>
          </li>
          <li
            className={'mt-4 mb-4 mr-2 pl-5 pr-5 ' + AppHeaderStyles.nav__link}
            onMouseOver={setSecondary}
            onMouseOut={setPrimary}
          >
            <ListIcon type={typeList} />
            <p className="pl-2 text text_type_main-default">Лента заказов</p>
          </li>
        </ul>
      </nav>
      <Logo />
      <div
        className={'mt-4 mb-4 mr-2 pl-5 pr-5 ' + AppHeaderStyles.account}
        onMouseOver={setSecondary}
        onMouseOut={setPrimary}
      >
        <ProfileIcon type={typeAccount} />
        <p className="pl-2 text text_type_main-default">Личный кабинет</p>
      </div>
    </header>
  );
}

export default AppHeader;

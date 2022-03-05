import { useState, useRef } from 'react'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import ProfileStyles from './profile.module.css'
import { Link } from 'react-router-dom'

export function Profile() {
  const [name, setName] = useState('Марк')
  const inputNameRef = useRef(null)
  const onIconNameClick = () => {
    setTimeout(() => inputNameRef.current.focus(), 0)
  }

  const [login, setLogin] = useState('mail@stellar.burgers')
  const inputLoginRef = useRef(null)
  const onIconLoginClick = () => {
    setTimeout(() => inputLoginRef.current.focus(), 0)
  }

  const [password, setPassword] = useState('123456')
  const inputPassRef = useRef(null)
  const onIconPassClick = () => {
    setTimeout(() => inputPassRef.current.focus(), 0)
  }

  return (
    <section className={ProfileStyles.content}>
      <div className={ProfileStyles.container}>
        <div className={ProfileStyles.links__container}>
          <Link to="/" className={ProfileStyles.link}>
            <span className="text text_type_main-medium">Профиль</span>
          </Link>
          <Link to="/" className={ProfileStyles.link}>
            <span className="text text_type_main-medium">История заказов</span>
          </Link>
          <Link to="/" className={ProfileStyles.link}>
            <span className="text text_type_main-medium">Выход</span>
          </Link>
        </div>
        <div className={ProfileStyles.form__container}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={(e) => setName(e.target.value)}
            value={name}
            name={'name'}
            error={false}
            ref={inputNameRef}
            onIconClick={onIconNameClick}
            icon={'EditIcon'}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={'text'}
            placeholder={'Логин'}
            onChange={(e) => setLogin(e.target.value)}
            value={login}
            name={'login'}
            error={false}
            ref={inputLoginRef}
            onIconClick={onIconLoginClick}
            icon={'EditIcon'}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={'password'}
            placeholder={'Введите новый пароль'}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name={'newPassowrd'}
            error={false}
            ref={inputPassRef}
            onIconClick={onIconPassClick}
            icon={'EditIcon'}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
      </div>
      <p className={"text text_type_main-small " + ProfileStyles.text}>В этом разделе вы можете изменить свои персональные данные</p>
    </section>
  )
}

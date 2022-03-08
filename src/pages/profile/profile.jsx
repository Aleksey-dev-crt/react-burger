import { useState, useRef, useEffect } from 'react'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import ProfileStyles from './profile.module.css'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/Auxiliary/Loader/Loader'
import ModalOverlay from '../../components/Modals/ModalOverlay/ModalOverlay'
import { useDispatch, useSelector } from 'react-redux'
import { exit, requestUserData, saveUserData } from '../../services/actions'
import { getCookie, deleteCookie } from '../../utils/cookies'

export function Profile() {
  const dispatch = useDispatch()
  const { userData } = useSelector((store) => store.registrationReducer)
  const loading = useSelector((store) => store.commonReducer.loadingWithOverlay)

  const [name, setName] = useState('')
  const inputNameRef = useRef(null)
  const onIconNameClick = () => {
    setTimeout(() => inputNameRef.current.focus(), 0)
  }

  const [login, setLogin] = useState('')
  const inputLoginRef = useRef(null)
  const onIconLoginClick = () => {
    setTimeout(() => inputLoginRef.current.focus(), 0)
  }

  const [password, setPassword] = useState('')
  const inputPassRef = useRef(null)
  const onIconPassClick = () => {
    setTimeout(() => inputPassRef.current.focus(), 0)
  }

  const refreshToken = getCookie('refreshToken')

  const logout = () => {
    dispatch(exit(refreshToken))
    deleteCookie('refreshToken')
  }

  useEffect(() => {
    if (userData.success) {
      setName(userData.user.name)
      setLogin(userData.user.email)
    } else {
      if (refreshToken) dispatch(requestUserData(refreshToken))
    }
  }, [dispatch, refreshToken, userData])

  const profileSubmit = (e) => {
    e.preventDefault()
    if (name && login) dispatch(saveUserData({ refreshToken, name, login }))
  }

  const onCancel = (e) => {
    e.preventDefault()
    setName(userData.user.name)
    setLogin(userData.user.email)
  }

  return (
    <section className={ProfileStyles.content}>
      <div className={ProfileStyles.container}>
        <div className={ProfileStyles.links__container}>
          <NavLink to="/profile" className={ProfileStyles.link} activeClassName={ProfileStyles.link_active}>
            <span className="text text_type_main-medium">Профиль</span>
          </NavLink>
          <NavLink to="/profile/orders" className={ProfileStyles.link}>
            <span className="text text_type_main-medium">История заказов</span>
          </NavLink>
          <NavLink to="/react-burger" className={ProfileStyles.link} onClick={logout}>
            <span className="text text_type_main-medium">Выход</span>
          </NavLink>
        </div>
        <form name="profile" className={ProfileStyles.form__container} onSubmit={profileSubmit}>
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
          <div className={ProfileStyles.buttons__container}>
            <Button>Сохранить</Button>
            <Button onClick={onCancel}>Отмена</Button>
          </div>
        </form>
      </div>
      <p className={'text text_type_main-small ' + ProfileStyles.text}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
      {loading && (
        <ModalOverlay>
          <Loader />
        </ModalOverlay>
      )}
    </section>
  )
}

import { useState, useRef, useEffect } from 'react'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import ProfileStyles from './profile.module.css'
import { Link } from 'react-router-dom'
import Loader from '../../components/Auxiliary/Loader/Loader'
import ModalOverlay from '../../components/Modals/ModalOverlay/ModalOverlay'
import { useDispatch, useSelector } from 'react-redux'
import { exit, requestUserData } from '../../services/actions'
import { getCookie, deleteCookie } from '../../utils/cookies'

export function Profile() {
  const dispatch = useDispatch()
  const { userData, authorizedUser } = useSelector((store) => store.registrationReducer)
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

  const logout = () => {
    const refreshToken = getCookie('refreshToken')
    dispatch(exit(refreshToken))
    deleteCookie('accessToken')
    deleteCookie('refreshToken')
  }

  useEffect(() => {   
    if (userData.success) {
      setName(userData.user.name);
      setLogin(userData.user.email);
    } else {
      const accessToken = getCookie('accessToken')
      if(accessToken) dispatch(requestUserData(accessToken))
    }
  }, [userData]);
   
  console.log('profile', getCookie('accessToken'))
  console.log('profile', getCookie('refreshToken'))

  return (
    <section className={ProfileStyles.content}>
      <div className={ProfileStyles.container}>
        <div className={ProfileStyles.links__container}>
          <Link to="/" className={ProfileStyles.link}>
            <span className="text text_type_main-medium">Профиль</span>
          </Link>
          <Link to="/profile/orders" className={ProfileStyles.link}>
            <span className="text text_type_main-medium">История заказов</span>
          </Link>
          <Link to="/react-burger" className={ProfileStyles.link} onClick={logout}>
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
      {loading && (
        <ModalOverlay>
          <Loader />
        </ModalOverlay>
      )}
    </section>
  )
}

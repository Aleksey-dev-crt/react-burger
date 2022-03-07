import { useState } from 'react'
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import LoginStyles from './login.module.css'
import { Link, Redirect } from 'react-router-dom'
import Loader from '../../components/Auxiliary/Loader/Loader'
import ModalOverlay from '../../components/Modals/ModalOverlay/ModalOverlay'
import { useDispatch, useSelector } from 'react-redux'
import { authorization } from '../../services/actions'
import { setCookie } from '../../utils/cookies'

export function Login() {
  const dispatch = useDispatch()
  const { authorizedUser, userData, authorized } = useSelector((store) => store.registrationReducer)
  const loading = useSelector((store) => store.commonReducer.loadingWithOverlay)

  const [email, setEmail] = useState('')
  const onChangeMail = (e) => {
    setEmail(e.target.value)
  }

  const [password, setPassword] = useState('')
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const authorizationSubmit = (e) => {
    e.preventDefault()
    if (email && password) dispatch(authorization({email, password}))
    setEmail('')
    setPassword('')
  }

  if (authorized) {
    setCookie('refreshToken', authorizedUser.refreshToken)
    setCookie('accessToken', authorizedUser.accessToken)
    return <Redirect to="/react-burger" />
  }

  return (
    <section className={LoginStyles.content}>
      <form name="login" className={LoginStyles.form__container} onSubmit={authorizationSubmit}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <EmailInput onChange={onChangeMail} value={email} name={'email'} />
        <PasswordInput onChange={onChangePassword} value={password} name={'password'} />
        <Button>Войти</Button>
      </form>
      <div className={LoginStyles.questions__container}>
        <div className={LoginStyles.registration}>
          <p className="text text_type_main-default text_color_inactive">
            Вы - новый пользователь?
          </p>
          <Link className={"text text_type_main-default " + LoginStyles.link} to="/register">
            Зарегистрироваться
          </Link>
        </div>
        <div className={LoginStyles.password}>
          <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
          <Link className={"text text_type_main-defaul " + LoginStyles.link} to="/forgot-password">
            Восстановить пароль
          </Link>
        </div>
      </div>
      {loading && (
        <ModalOverlay>
          <Loader />
        </ModalOverlay>
      )}
    </section>
  )
}

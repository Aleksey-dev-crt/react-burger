import { useState, FC } from 'react'
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import LoginStyles from './login.module.css'
import { Link, Redirect, useLocation } from 'react-router-dom'
import Loader from '../../components/Auxiliary/Loader/Loader'
import ModalOverlay from '../../components/Modals/ModalOverlay/ModalOverlay'
import { useDispatch, useSelector } from '../../utils/hooks'
import { authorization } from '../../services/actions'
import { ILocation } from '../../services/types/types'

export const Login: FC = () => {
  const dispatch = useDispatch()
  const { authorized } = useSelector((store) => store.registrationReducer)
  const loading = useSelector((store) => store.commonReducer.loadingWithOverlay)
  const location = useLocation<ILocation>()

  const [email, setEmail] = useState('')
  const onChangeMail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const [password, setPassword] = useState('')
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const authorizationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email && password) dispatch(authorization({email, password}))
    setEmail('')
    setPassword('')
  }

  if (authorized) return <Redirect to={location.state ? location.state.from : '/react-burger'} />

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

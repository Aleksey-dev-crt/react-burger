import { useState } from 'react'
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import LoginStyles from './login.module.css'
import { Link } from 'react-router-dom'

export function Login() {
  const [mail, setMail] = useState('')
  const onChangeMail = (e) => {
    setMail(e.target.value)
  }

  const [password, setPassword] = useState('')
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <section className={LoginStyles.content}>
      <form name="login" className={LoginStyles.form__container}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <EmailInput onChange={onChangeMail} value={mail} name={'email'} />
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
    </section>
  )
}

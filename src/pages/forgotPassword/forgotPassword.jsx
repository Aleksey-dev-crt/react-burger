import { useState, useRef } from 'react'
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import ForgotPasswordStyles from './forgotPassword.module.css'
import { Link } from 'react-router-dom'

export function ForgotPassword() {
  const [name, setName] = useState('')
  const inputRef = useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  return (
    <section className={ForgotPasswordStyles.content}>
      <form name="forgot-password" className={ForgotPasswordStyles.form__container}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <Input
          type={'text'}
          placeholder={'Укажите e-mail'}
          onChange={(e) => setName(e.target.value)}
          value={name}
          name={'name'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button>Восстановить</Button>
      </form>
      <div className={ForgotPasswordStyles.questions__container}>
        <div className={ForgotPasswordStyles.registration}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link className={'text text_type_main-default ' + ForgotPasswordStyles.link} to="/reset-password">
            Войти
          </Link>
        </div>      
      </div>
    </section>
  )
}

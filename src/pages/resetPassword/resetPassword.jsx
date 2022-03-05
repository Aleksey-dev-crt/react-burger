import { useState, useRef } from 'react'
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import ResetPasswordStyles from './resetPassword.module.css'
import { Link } from 'react-router-dom'

export function ResetPassword() {
  const [password, setPassword] = useState('')
  const [showPass, setshowPass] = useState('password')
  const [showIcon, setshowIcon] = useState('ShowIcon')
  const inputPassRef = useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputPassRef.current.focus(), 0)
    showIcon === 'ShowIcon' ? setshowIcon('HideIcon') : setshowIcon('ShowIcon')
    showPass === 'password' ? setshowPass('text') : setshowPass('password')
  }

  const [code, setCode] = useState('')
  const inputCodeRef = useRef(null)  

  return (
    <section className={ResetPasswordStyles.content}>
      <form name="reset-password" className={ResetPasswordStyles.form__container}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <Input
          type={showPass}
          placeholder={'Введите новый пароль'}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={'newPassowrd'}
          error={false}
          ref={inputPassRef}
          onIconClick={onIconClick}
          icon={showIcon}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={(e) => setCode(e.target.value)}
          value={code}
          name={'code'}
          error={false}
          ref={inputCodeRef}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button>Сохранить</Button>
      </form>
      <div className={ResetPasswordStyles.questions__container}>
        <div className={ResetPasswordStyles.registration}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link className={'text text_type_main-default ' + ResetPasswordStyles.link} to="/login">
            Войти
          </Link>
        </div>      
      </div>
    </section>
  )
}

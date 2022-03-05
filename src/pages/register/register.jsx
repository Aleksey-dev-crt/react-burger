import { useState, useRef } from 'react'
import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import RegisterStyles from './register.module.css'
import { Link } from 'react-router-dom'

export function Register() {
  const [name, setName] = useState('')
  const inputRef = useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  const [mail, setMail] = useState('')
  const onChangeMail = (e) => {
    setMail(e.target.value)
  }

  const [password, setPassword] = useState('')
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <section className={RegisterStyles.content}>
      <form name="register" className={RegisterStyles.form__container}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={(e) => setName(e.target.value)}
          value={name}
          name={'name'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
        />
        <EmailInput onChange={onChangeMail} value={mail} name={'email'} />
        <PasswordInput onChange={onChangePassword} value={password} name={'password'} />
        <Button>Зарегистрироваться</Button>
      </form>
      <div className={RegisterStyles.questions__container}>
        <div className={RegisterStyles.registration}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </p>
          <Link className={'text text_type_main-default ' + RegisterStyles.link} to="/login">
            Войти
          </Link>
        </div>      
      </div>
    </section>
  )
}

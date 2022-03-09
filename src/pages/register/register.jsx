import { useState, useRef } from 'react'
import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import RegisterStyles from './register.module.css'
import Loader from '../../components/Auxiliary/Loader/Loader'
import ModalOverlay from '../../components/Modals/ModalOverlay/ModalOverlay'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { newUser } from '../../services/actions'

export function Register() {
  const dispatch = useDispatch()
  const loading = useSelector((store) => store.commonReducer.loadingWithOverlay)

  const [name, setName] = useState('')
  const inputNameRef = useRef(null)

  const [email, setEmail] = useState('')
  const onChangeMail = (e) => {
    setEmail(e.target.value)
  }

  const [password, setPassword] = useState('')
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const registerSubmit = (e) => {
    e.preventDefault()
    if (password) dispatch(newUser({email, password, name}))
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <section className={RegisterStyles.content}>
      <form name="register" className={RegisterStyles.form__container} onSubmit={registerSubmit}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={(e) => setName(e.target.value)}
          value={name}
          name={'name'}
          error={false}
          ref={inputNameRef}
          errorText={'Ошибка'}
          size={'default'}
        />
        <EmailInput onChange={onChangeMail} value={email} name={'email'} />
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
      {loading && (
        <ModalOverlay>
          <Loader />
        </ModalOverlay>
      )}
    </section>
  )
}

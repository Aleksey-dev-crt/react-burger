import { useState, useRef, FC } from 'react'
import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import RegisterStyles from './register.module.css'
import Loader from '../../components/Auxiliary/Loader/Loader'
import ModalOverlay from '../../components/Modals/ModalOverlay/ModalOverlay'
import { Link, useLocation, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { newUser } from '../../services/actions'
import { ILocationState } from '../../utils/types'

export const Register: FC = () => {
  const { authorized } = useSelector((store: any) => store.registrationReducer)
  const location = useLocation<ILocationState>()

  const dispatch = useDispatch()
  const loading = useSelector((store: any) => store.commonReducer.loadingWithOverlay)

  const [name, setName] = useState('')
  const inputNameRef = useRef<HTMLInputElement>(null)

  const [email, setEmail] = useState('')
  const onChangeMail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const [password, setPassword] = useState('')
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const registerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password) dispatch(newUser({email, password, name}))
    setName('')
    setEmail('')
    setPassword('')
  }

  if (authorized) return <Redirect to={location.state ? location.state.from : '/react-burger'} />

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

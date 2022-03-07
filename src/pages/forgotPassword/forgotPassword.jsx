import { useState, useRef } from 'react'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import ForgotPasswordStyles from './forgotPassword.module.css'
import { Link, Redirect } from 'react-router-dom'
import Loader from '../../components/Auxiliary/Loader/Loader'
import ModalOverlay from '../../components/Modals/ModalOverlay/ModalOverlay'
import { useDispatch, useSelector } from 'react-redux'
import { passwordChangeRequest } from '../../services/actions'

export function ForgotPassword() {
  const dispatch = useDispatch()
  const { resetPassword } = useSelector((store) => store.registrationReducer)
  const loading = useSelector((store) => store.commonReducer.loadingWithOverlay)

  const [email, setEmail] = useState('')
  const inputEmailRef = useRef(null)

  const forgotPasswordSubmit = (e) => {
    e.preventDefault()
    if (email) dispatch(passwordChangeRequest(email))
    setEmail('')
  }

  if (resetPassword.success) {
    return <Redirect to="/reset-password" />
  }

  return (
    <section className={ForgotPasswordStyles.content}>
      <form
        name="forgotPassword"
        className={ForgotPasswordStyles.form__container}
        onSubmit={forgotPasswordSubmit}
      >
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={'email'}
          error={false}
          ref={inputEmailRef}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button>Восстановить</Button>
      </form>
      <div className={ForgotPasswordStyles.questions__container}>
        <div className={ForgotPasswordStyles.registration}>
          <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
          <Link className={'text text_type_main-default ' + ForgotPasswordStyles.link} to="/login">
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

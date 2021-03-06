import { useState, useRef, FC } from 'react'
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import Loader from '../../components/Auxiliary/Loader/Loader'
import ModalOverlay from '../../components/Modals/ModalOverlay/ModalOverlay'
import ResetPasswordStyles from './resetPassword.module.css'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from '../../utils/hooks'
import { changePassword } from '../../services/actions'
import { ILocation } from '../../services/types/types'
import { DispatchThunk } from '../../services/types'

export const ResetPassword: FC = () => {
  const dispatch: DispatchThunk = useDispatch()
  const { authorized } = useSelector((store) => store.registrationReducer)
  const { resetPassword } = useSelector((store) => store.registrationReducer)
  const location = useLocation<ILocation>()
  const loading = useSelector((store) => store.commonReducer.loadingWithOverlay)

  const [password, setPassword] = useState('')
  const [showPass, setshowPass] = useState<'password' | 'text'>('password')
  const [showIcon, setshowIcon] = useState<'ShowIcon' | 'HideIcon'>('ShowIcon')
  const inputPassRef = useRef<HTMLInputElement>(null)

  const onIconClick = () => {
    setTimeout(() => inputPassRef.current!.focus(), 0)
    showIcon === 'ShowIcon' ? setshowIcon('HideIcon') : setshowIcon('ShowIcon')
    showPass === 'password' ? setshowPass('text') : setshowPass('password')
  }

  const [token, setToken] = useState('')
  const inputCodeRef = useRef<HTMLInputElement>(null) 
  
  const resetPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password && token) dispatch(changePassword({password, token}))
    setPassword('')
    setToken('')
  }

  if (authorized) return <Redirect to={location.state ? location.state.from : '/react-burger'} />
  if (!resetPassword.success) return <Redirect to="/forgot-password" />

  return (
    <section className={ResetPasswordStyles.content}>
      <form name="resetPassword" className={ResetPasswordStyles.form__container} onSubmit={resetPasswordSubmit}>
        <h1 className="text text_type_main-medium">???????????????????????????? ????????????</h1>
        <Input
          type={showPass}
          placeholder={'?????????????? ?????????? ????????????'}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={'newPassowrd'}
          error={false}
          ref={inputPassRef}
          onIconClick={onIconClick}
          icon={showIcon}
          errorText={'????????????'}
          size={'default'}
        />
        <Input
          type={'text'}
          placeholder={'?????????????? ?????? ???? ????????????'}
          onChange={(e) => setToken(e.target.value)}
          value={token}
          name={'token'}
          error={false}
          ref={inputCodeRef}
          errorText={'????????????'}
          size={'default'}
        />
        <Button>??????????????????</Button>
      </form>
      <div className={ResetPasswordStyles.questions__container}>
        <div className={ResetPasswordStyles.registration}>
          <p className="text text_type_main-default text_color_inactive">
            ?????????????????? ?????????????
          </p>
          <Link className={'text text_type_main-default ' + ResetPasswordStyles.link} to="/login">
            ??????????
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

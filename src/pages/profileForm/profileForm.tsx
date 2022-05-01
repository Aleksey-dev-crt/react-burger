import { useState, useRef, useEffect, FC } from 'react'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import ProfileFormStyles from './profileForm.module.css'
import { useDispatch, useSelector } from '../../utils/hooks'
import { requestUserData, saveUserData } from '../../services/actions'
import { getCookie } from '../../utils/cookies'

export const ProfileForm: FC = () => {
  const dispatch = useDispatch()
  const { userData } = useSelector((store) => store.registrationReducer)

  const [name, setName] = useState('')
  const inputNameRef = useRef<HTMLInputElement>(null)
  const onIconNameClick = () => {
    setTimeout(() => inputNameRef.current!.focus(), 0)
  }

  const [login, setLogin] = useState('')
  const inputLoginRef = useRef<HTMLInputElement>(null)
  const onIconLoginClick = () => {
    setTimeout(() => inputLoginRef.current!.focus(), 0)
  }

  const [password, setPassword] = useState('')
  const inputPassRef = useRef<HTMLInputElement>(null)
  const onIconPassClick = () => {
    setTimeout(() => inputPassRef.current!.focus(), 0)
  }

  const refreshToken = getCookie('refreshToken')

  useEffect(() => {
    if (userData.success) {
      setName(userData.user.name)
      setLogin(userData.user.email)
    } else {
      if (refreshToken) dispatch(requestUserData(refreshToken))
    }
  }, [dispatch, userData, refreshToken]) 

  const profileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name && login) dispatch(saveUserData({ refreshToken, name, login, password }))
  }

  const onCancel = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault()
    setName(userData.user.name)
    setLogin(userData.user.email)
  }

  return (
        <form name="profile" className={ProfileFormStyles.form__container} onSubmit={profileSubmit}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={(e) => setName(e.target.value)}
            value={name}
            name={'name'}
            error={false}
            ref={inputNameRef}
            onIconClick={onIconNameClick}
            icon={'EditIcon'}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={'text'}
            placeholder={'Логин'}
            onChange={(e) => setLogin(e.target.value)}
            value={login}
            name={'login'}
            error={false}
            ref={inputLoginRef}
            onIconClick={onIconLoginClick}
            icon={'EditIcon'}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={'password'}
            placeholder={'Введите новый пароль'}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name={'newPassowrd'}
            error={false}
            ref={inputPassRef}
            onIconClick={onIconPassClick}
            icon={'EditIcon'}
            errorText={'Ошибка'}
            size={'default'}
          />
          <div className={ProfileFormStyles.buttons__container}>
            <Button>Сохранить</Button>
            <Button onClick={onCancel}>Отмена</Button>
          </div>
        </form>     
  )
}

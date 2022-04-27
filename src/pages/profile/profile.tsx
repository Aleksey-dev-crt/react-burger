import { FC, Children, ReactNode } from 'react'
import ProfileStyles from './profile.module.css'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/Auxiliary/Loader/Loader'
import ModalOverlay from '../../components/Modals/ModalOverlay/ModalOverlay'
import { useDispatch, useSelector } from 'react-redux'
import { exit } from '../../services/actions'
import { getCookie, deleteCookie } from '../../utils/cookies'

interface IProfileProps {
  children: ReactNode
}

export const Profile: FC<IProfileProps> = () => {
  const dispatch = useDispatch()
  const loading = useSelector((store: any) => store.commonReducer.loadingWithOverlay)

  const refreshToken = getCookie('refreshToken')

  const logout = () => {
    dispatch(exit(refreshToken))
    deleteCookie('refreshToken')
  }

  return (
    <section className={ProfileStyles.content}>
      <div className={ProfileStyles.container}>
        <div className={ProfileStyles.links__container}>
          <NavLink
            to="/profile"
            className={ProfileStyles.link}
            activeClassName={ProfileStyles.link_active}
          >
            <span className="text text_type_main-medium">Профиль</span>
          </NavLink>
          <NavLink to="/profile/orders" className={ProfileStyles.link}>
            <span className="text text_type_main-medium">История заказов</span>
          </NavLink>
          <NavLink to="/react-burger" className={ProfileStyles.link} onClick={logout}>
            <span className="text text_type_main-medium">Выход</span>
          </NavLink>
        </div>
        {Children}
      </div>
      <p className={'text text_type_main-small ' + ProfileStyles.text}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
      {loading && (
        <ModalOverlay>
          <Loader />
        </ModalOverlay>
      )}
    </section>
  )
}

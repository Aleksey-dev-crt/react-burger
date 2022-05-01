import { FC } from 'react'
import ProfileMenuStyles from './ProfileMenu.module.css'
import { NavLink } from 'react-router-dom'
import { useDispatch } from '../../utils/hooks'
import { exit } from '../../services/actions'
import { getCookie, deleteCookie } from '../../utils/cookies'

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch()

  const refreshToken = getCookie('refreshToken')

  const logout = () => {
    dispatch(exit(refreshToken))
    deleteCookie('refreshToken')
  }

  return (
    <div className={ProfileMenuStyles.links__container}>
      <NavLink
        to="/profile"
        className={ProfileMenuStyles.link}
        activeClassName={ProfileMenuStyles.link_active}
        exact={true}
      >
        <span className="text text_type_main-medium">Профиль</span>
      </NavLink>
      <NavLink
        to="/profile/orders"
        className={ProfileMenuStyles.link}
        activeClassName={ProfileMenuStyles.link_active}
        exact={true}
      >
        <span className="text text_type_main-medium">История заказов</span>
      </NavLink>
      <NavLink to="/react-burger" className={ProfileMenuStyles.link} onClick={logout}>
        <span className="text text_type_main-medium">Выход</span>
      </NavLink>
    </div>
  )
}

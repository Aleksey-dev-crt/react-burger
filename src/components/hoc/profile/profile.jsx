import ProfileStyles from './profile.module.css'
import Loader from '../../Auxiliary/Loader/Loader'
import ModalOverlay from '../../Modals/ModalOverlay/ModalOverlay'
import { useSelector } from 'react-redux'
import { ProfileMenu } from '../../ProfileMenu/ProfileMenu'


export function Profile({ children }) {
  const loading = useSelector((store) => store.commonReducer.loadingWithOverlay)

  return (
    <section className={ProfileStyles.content}>
      <div className={ProfileStyles.container}>
        <div className={ProfileStyles.menuContainer}>
        <ProfileMenu />
        <p className={'text text_type_main-small mt-20 ' + ProfileStyles.text}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
      </div>
        {children}
      </div>
     
      {loading && (
        <ModalOverlay>
          <Loader />
        </ModalOverlay>
      )}
    </section>
  )
}

import { FC, SyntheticEvent } from 'react'
import { IModalProps } from '../../../services/types/types'
import ModalOverlayStyles from './ModalOverlay.module.css'

const ModalOverlay: FC<IModalProps> = ({ onClose, children }) => {

  const closeByOverlay = (e: SyntheticEvent) => {
    if ((e.target as HTMLElement).localName === 'div' && (e.target as HTMLElement).className.includes('overlay')) {
      return onClose ? onClose() : null
    }
  }

  return (
    <div className={ModalOverlayStyles.overlay} onClick={closeByOverlay}>
      {children}
    </div>
  )
}

export default ModalOverlay

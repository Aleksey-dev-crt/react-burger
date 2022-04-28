import { FC, useEffect } from 'react'
import ReactDOM from 'react-dom'
import ModalStyles from './Modal.module.css'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IModalProps } from '../../../utils/types'

const Modal: FC<IModalProps> = ({ onClose, children }) => {
  //const modal = document.createElement('div')
  const modal: HTMLDivElement | null = document.querySelector('#modals')

  useEffect(() => {
    document.addEventListener('keydown', closeByEsc)
   // document.body.appendChild(modal)
    return () => {
      document.removeEventListener('keydown', closeByEsc)
     // document.body.removeChild(modal)
    }
  })

  const closeByEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      return onClose ? onClose() : null
    }
  }
  
  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={ModalStyles.container}>
        {children}
        <div className={ModalStyles.close}>
          <CloseIcon onClick={onClose} type={'primary'} />
        </div>
      </div>
    </ModalOverlay>,
    modal!
  )
}

export default Modal

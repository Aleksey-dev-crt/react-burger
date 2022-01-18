import { useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import ModalStyles from './Modal.module.css'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element,
}

function Modal(props) {
  useEffect(() => {
    document.addEventListener('keydown', closeByEsc)
    return () => {
      document.removeEventListener('keydown', closeByEsc)
    }
  })

  const closeByEsc = (e) => {
    if (e.key === 'Escape') {
      props.onClose()
    }
  }

  return ReactDOM.createPortal(
    <ModalOverlay onClose={props.onClose}>
      <div className={ModalStyles.container}>
        {props.children}
        <div className={ModalStyles.close}>
          <CloseIcon onClick={props.onClose} />
        </div>
      </div>
    </ModalOverlay>,
    document.getElementById('modal')
  )
}

export default Modal

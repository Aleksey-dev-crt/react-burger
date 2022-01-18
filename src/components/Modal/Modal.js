import { useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import ModalStyle from './Modal.module.css'
import ModalOverlay from '../ModalOverlay/ModalOverlay'

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  header: PropTypes.string,
  children: PropTypes.element,
}

function Modal(props) {
  const closeByEsc = (e) => {
    if (e.key === 'Escape') {
      props.onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', closeByEsc)
    return () => {
      document.removeEventListener('keydown', closeByEsc)
    }
  }, [])

  return ReactDOM.createPortal(
    <ModalOverlay onClose={props.onClose}>
      <div className={ModalStyle.container}>
          {props.children}
          <div className={ModalStyle.close}>
            <CloseIcon onClick={props.onClose} />
          </div>
      </div>
    </ModalOverlay>,
    document.getElementById('modal')
  )
}

export default Modal

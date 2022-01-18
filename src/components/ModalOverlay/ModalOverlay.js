import { useEffect } from 'react'
import PropTypes from 'prop-types'
import ModalOverlayStyles from './ModalOverlay.module.css'

function ModalOverlay(props) {

  useEffect(() => {
    document.addEventListener('click', closeByOverlay)
    return () => {
      document.removeEventListener('click', closeByOverlay)
    }
  })

  const closeByOverlay = (e) => {
    if (e.target.className.includes('overlay')) {
      props.onClose()
    }
  }

  return (
    <div className={ModalOverlayStyles.overlay} onClick={closeByOverlay}>
      {props.children}
    </div>
  )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element,
  }

export default ModalOverlay



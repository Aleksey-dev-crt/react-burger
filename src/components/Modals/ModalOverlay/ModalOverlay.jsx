import PropTypes from 'prop-types'
import ModalOverlayStyles from './ModalOverlay.module.css'

function ModalOverlay(props) {

  const closeByOverlay = (e) => {
    if (e.target.className.baseVal !== '' && e.target.className.includes('overlay')) {
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
  onClose: PropTypes.func,
  children: PropTypes.element,
}

export default ModalOverlay

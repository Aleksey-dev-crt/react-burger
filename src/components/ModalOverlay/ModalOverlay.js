import PropTypes from 'prop-types'
import ModalOverlayStyle from './ModalOverlay.module.css'

function ModalOverlay(props) {
  return (
    <div className={ModalOverlayStyle.overlay} onClick={props.onClose}>
      {props.children}
    </div>
  )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.element,
  }

export default ModalOverlay



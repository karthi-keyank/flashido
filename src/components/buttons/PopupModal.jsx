import PropTypes from "prop-types";
import "../../styles/components/popup.css"
function PopupModal({ isOpen, title, message, onConfirm, onCancel, confirmText = "Yes", cancelText = "Cancel" }) {
  if (!isOpen) return null;

  return (
    <div className="popup-backdrop">
      <div className="popup-modal">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="popup-actions">
          <button onClick={onCancel}>{cancelText}</button>
          <button onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}

PopupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
};

export default PopupModal;

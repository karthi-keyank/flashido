import PropTypes from 'prop-types';
import "../../styles/components/library_header.css"
import { FiPlus } from "react-icons/fi";

function LibraryHeader({ onAddClick }) {
  return (
    <header className="library-header">
      <h1 className="library-header-title">Library</h1>
      <button
        type="button"
        onClick={onAddClick}
        className="library-header-add-btn"
        aria-label="Add item to library"
      >
        <FiPlus size={20} aria-hidden="true" />
      </button>
    </header>
  );
}

LibraryHeader.propTypes = {
  onAddClick: PropTypes.func.isRequired,
};

export default LibraryHeader;

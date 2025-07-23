import PropTypes from 'prop-types';

function LibraryHeader({ onAddClick }) {
  return (
    <div className="library-header">
      <h3>Library</h3>
      <button
        onClick={onAddClick} // make sure this is a function
        className="library-header-add-btn"
        aria-label="Add"
      >
        +
      </button>
    </div>
  );
}

LibraryHeader.propTypes = {
  onAddClick: PropTypes.func.isRequired,
};

export default LibraryHeader;

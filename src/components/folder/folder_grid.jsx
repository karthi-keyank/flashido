import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FiFolder } from "react-icons/fi";
import "../../styles/components/folder_grid.css";

function FolderGrid({ folder }) {
  const navigate = useNavigate();

  function onFolderClick() {
    navigate(`/Library/folder/${folder.id}`);
  }

  return (
    <div className="folder-grid" onClick={onFolderClick}>
      <div className="folder-grid__icon">
        <FiFolder />
      </div>
      <div className="folder-grid__content">
        <div className="folder-grid__title">{folder.name}</div>
        <div className="folder-grid__meta">
          <span>Folder</span>
          <span>•</span>
          <span>{folder.description}</span>
        </div>
      </div>
    </div>
  );
}

FolderGrid.propTypes = {
  folder: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default FolderGrid;

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

 function FolderGrid({folder}) {
    const navigate = useNavigate();
    function onFolderClick(){
        navigate(`/Library/folder/${folder.id}`);
    }
    return <div className="folder">
        <button 
        className="folder-btn"
        onClick={onFolderClick}
        aria-label="click to open"
        >
        <h3>{folder.name}</h3> 
        <p>{folder.description}</p>
        </button>
    </div>
}

FolderGrid.propTypes = {
    folder: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string
    }).isRequired
};

export default FolderGrid
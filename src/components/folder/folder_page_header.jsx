import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/auth_context";
import { FaArrowLeft, FaPlus} from "react-icons/fa";
import { FiFolder } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import ThreeDotMenu from "./ThreeDotMenu";
import PopupModal from "../buttons/PopupModal";
import "../../styles/components/folder_page_header.css";

function FolderPageHeader({ title, id }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    if (!user?.uid) {
      return;
    }

    setDeleting(true);
    try {
      const folderRef = doc(db, `users/${user.uid}/folders/${id}`);
      navigate(-1)
      await deleteDoc(folderRef);
    } catch (err) {
      console.error("❌ Failed to delete folder:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="folder-header">
      <div className="folder-header__left">
        <button
          className="folder-header__icon-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <FaArrowLeft className="folder-header__icon" />
        </button>

        <h2 className="folder-header__title">
          <FiFolder className="folder-header__folder-icon" />
          {title}
        </h2>
      </div>

      <div className="folder-header__right">
        <button
          className="folder-header__icon-button"
          onClick={() => navigate(`/library/folder/${id}/getsets`)}
          aria-label="Add sets"
        >
          <FaPlus className="folder-header__icon" />
        </button>

        <ThreeDotMenu
          onDelete={() => setShowConfirm(true)}
          deleting={deleting}
          icon={<BsThreeDotsVertical className="folder-header__icon" />}
        />
      </div>

      <PopupModal
        isOpen={showConfirm}
        title="Confirm Deletion"
        message={`Are you sure you want to delete folder "${title}"?`}
        onConfirm={() => {
          setShowConfirm(false);
          handleDelete();
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}

FolderPageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default FolderPageHeader;

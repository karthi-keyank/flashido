import React from "react";
import PropTypes from "prop-types";
import "../../styles/components/TitleInput.css";

function TitleInput({ title, setTitle, description, setDescription }) {
  const MAX_TITLE = 16;
  const MAX_DESC = 40;

  const handleTitleChange = (e) => {
    if (e.target.value.length <= MAX_TITLE) {
      setTitle(e.target.value);
    }
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= MAX_DESC) {
      setDescription(e.target.value);
    }
  };

  return (
    <div className="title-input-container">
      {/* Title */}
      <input
        className="title-input"
        type="text"
        placeholder="Subject, chapter, unit"
        value={title}
        onChange={handleTitleChange}
      />
      <div
        className={`char-count ${title.length >= MAX_TITLE ? "over-limit" : ""}`}
      >
        {title.length}/{MAX_TITLE}
      </div>

      {/* Description */}
      <input
        className="description-input"
        type="text"
        placeholder="Description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <div
        className={`char-count ${
          description.length >= MAX_DESC ? "over-limit" : ""
        }`}
      >
        {description.length}/{MAX_DESC}
      </div>
    </div>
  );
}

TitleInput.propTypes = {
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,
};

export default TitleInput;

import React from "react";
import PropTypes from "prop-types";
import "../../styles/components/TitleInput.css"

function TitleInput({ title, setTitle, description, setDescription }) {
 return (
  <div className="title-input-container">
    <input
      className="title-input"
      type="text"
      placeholder="Subject, chapter, unit"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    <input
      className="description-input"
      type="text"
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
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

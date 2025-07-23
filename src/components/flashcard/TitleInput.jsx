import React from "react";
import PropTypes from "prop-types";

function TitleInput({ title, setTitle, description, setDescription }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Subject, chapter, unit"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="description"
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

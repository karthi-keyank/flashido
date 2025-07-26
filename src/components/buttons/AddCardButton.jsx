import React from "react";
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa";
import "../../styles/components/AddCardButton.css"

function AddCardButton({ onClick }) {
  return (
    <button className="add-card-button" onClick={onClick}>
      <FaPlus />
    </button>
  );
}

AddCardButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddCardButton;

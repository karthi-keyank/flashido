import React from "react";
import PropTypes from "prop-types";

function AddCardButton({ onClick }) {
  return (
    <button onClick={onClick}>＋</button>
  );
}

AddCardButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddCardButton;

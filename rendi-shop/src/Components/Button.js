import React from "react";

function Button({ modalState }) {
  const setModal = () => {
    modalState(true);
  };
  return (
    <div className="add-button-container">
      <button onClick={setModal} className="add-button">
        Add Data
      </button>
    </div>
  );
}

export default Button;

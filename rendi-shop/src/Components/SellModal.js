import React, { Component, useEffect, useState } from "react";


import firebase from "firebase/compat/app";

function SellModal({ modalState, data, id }) {
  const [tempData, setTempData] = useState(data);

  const setModal = () => {
    modalState(false);
  };

  const submitData = (e) => {
    setModal();
  };

  return (
    <div className="add-modal-container">
      <div className="add-modal-box">
        <form style={{}} onSubmit={(e) => submitData(e)}>
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
            Sell {tempData[id].name}?
          </h3>

          <div className="deletebtnrow">
            <button type="submit" className="btn btn-primary">
              Yes
            </button>
            <button onClick={setModal} className="btn btn-danger">
              No
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SellModal;

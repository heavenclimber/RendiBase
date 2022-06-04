import React, { Component, useEffect, useState } from "react";
import { useAlert } from "react-alert";

import firebase from "firebase/compat/app";
// import arrayUnion from 'firebase/firestore'

function DeleteModal({ modalState, data, id }) {
  const [isdelete, setIsDelete] = useState(false);

  const [tempData, setTempData] = useState(data);

  const setModal = () => {
    modalState(false);
  };

  useEffect(() => {
    {
      isdelete ? (
        firebase
          .firestore()
          .collection("data")
          .doc("NwE7sn9FEaKhmHGzXwmY")

          .update({
            item: firebase.firestore.FieldValue.arrayRemove(data[id]),
          })
          .then((documentReference) => {
            modalState(false);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error.message);
          })
      ) : (
        <></>
      );
    }
  }, [isdelete]);

  const submitData = (e) => {
    setIsDelete(true);
  };

  return (
    <div className="add-modal-container">
      <div className="add-modal-box">
        <form style={{}} onSubmit={(e) => submitData(e)}>
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
            Delete {tempData[id].name}?
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

export default DeleteModal;

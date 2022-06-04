import React, { Component, useEffect, useState } from "react";
import InputSpinner from "react-bootstrap-input-spinner";
import { useAlert } from "react-alert";

import firebase from "firebase/compat/app";

function SellModal({ modalState, data, id }) {
  const [tempData, setTempData] = useState(data);

  // console.log(Number(tempData[id].jumlah))

  const [jmlh, setJmlh] = useState(Number(tempData[id].jumlah));
  const [buyqty, setBuyQty] = useState(1);

  const [dataSet, setDataSet] = useState();

  const alert = useAlert();


  useEffect(() => {
    {
      dataSet !== undefined && dataSet!==null
        ? 
        firebase
            .firestore()
            .collection("data")
            .doc("NwE7sn9FEaKhmHGzXwmY")
            .set({
              item: dataSet,
            })
            .then((documentReference) => {
              modalState(false);
            })
            .catch((error) => {
              console.log(error.message);
            })

        : <></>;
    }
  }, [dataSet]);

  const setModal = () => {
    modalState(false);
  };

  const submitData = (e) => {
    e.preventDefault();
    let tempqty=jmlh-buyqty
    let dataarray=tempData

    if(buyqty!==0){
      dataarray[id].jumlah = String(tempqty)
      setDataSet(dataarray)
    }

  };

  return (
    <div className="add-modal-container">
      <div className="add-modal-box">
        <form style={{}} onSubmit={(e) => submitData(e)}>
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
            Sell {tempData[id].name}?
          </h3>
          <InputSpinner
            type={"real"}
            precision={0}
            max={jmlh}
            min={1}
            step={1}
            value={1}
            onChange={(num) => setBuyQty(num)}
            variant={"dark"}
            size="sm"
          />

          <div className="deletebtnrow" style={{ marginTop: 20 }}>
            <button type="submit" className="btn btn-primary">
              Sell
            </button>
            <button onClick={setModal} className="btn btn-danger">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SellModal;

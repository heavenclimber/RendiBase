import React, { Component, useEffect, useState } from "react";
import InputSpinner from "react-bootstrap-input-spinner";
import { useAlert } from "react-alert";

import Moment from "react-moment";
import "moment-timezone";

import firebase from "firebase/compat/app";
import moment from "moment-timezone";

function RestockModal({ modalState, data, id }) {
  const [tempData, setTempData] = useState(data);

  // console.log(Number(tempData[id].jumlah))

  const [jmlh, setJmlh] = useState(Number(tempData[id].jumlah));
  const [buyqty, setBuyQty] = useState(1);

  const [dataSet, setDataSet] = useState();

  const [datareport, setDataReport] = useState();

  const alert = useAlert();

  useEffect(
    () => {
      {
        dataSet !== undefined &&
        dataSet !== null &&
        datareport !== undefined &&
        datareport !== null ? (
          firebase
            .firestore()
            .collection("data")
            .doc("NwE7sn9FEaKhmHGzXwmY")
            .set({
              item: dataSet,
            })
            .then((documentReference) => {
              reportSell();
              modalState(false);
            })
            .catch((error) => {
              console.log(error.message);
            })
        ) : (
          <></>
        );
      }
    },
    [dataSet],
    [datareport]
  );

  const setModal = () => {
    modalState(false);
  };

  const reportSell = () => {
    firebase
      .firestore()
      .collection("reportmasuk")
      .doc("itVu3sEExTcn3rb1uT8z")
      .update({
        reportmasuk: firebase.firestore.FieldValue.arrayUnion(datareport),
      })
      .then((documentReference) => {
        alert.show("Sukses restock");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const submitData = (e) => {
    e.preventDefault();
    let tempqty = jmlh + buyqty;
    let dataarray = tempData;

    let today = moment().format("dddd, MMMM Do YYYY, HH:mm:ss A").toString();

    // let buyprice = Number(dataarray[id].price) * buyqty;

    if (buyqty !== 0) {
      dataarray[id].jumlah = String(tempqty);
      setDataReport({
        id: id,
        jumlah: String(tempqty),
        jumlahrestock: String(buyqty),
        name: dataarray[id].name,
        date: today,
        price: tempData[id].price,
        type: tempData[id].type,
      });
    }
    setDataSet(dataarray);
  };

  return (
    <div className="add-modal-container">
      <div className="add-modal-box">
        <form style={{}} onSubmit={(e) => submitData(e)}>
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
            Restock {tempData[id].name}?
          </h3>
          <p style={{ textAlign: "center" }}>
            How many would you like to add? Current: <b>{jmlh}</b>
          </p>
          <InputSpinner
            type={"real"}
            precision={0}
            min={1}
            step={1}
            value={1}
            onChange={(num) => setBuyQty(num)}
            variant={"dark"}
            size="sm"
          />

          <div className="deletebtnrow" style={{ marginTop: 20 }}>
            <button type="submit" className="btn btn-primary">
              Restock
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

export default RestockModal;

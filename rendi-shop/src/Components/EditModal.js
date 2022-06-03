import React, { Component, useEffect, useState } from "react";
import { useAlert } from "react-alert";

import firebase from "firebase/compat/app";
// import arrayUnion from 'firebase/firestore'

function EditModal({ modalState, data, id }) {
  const [name, setName] = useState(data[id].name);
  const [price, setPrice] = useState(data[id].price);
  const [qty, setQty] = useState(data[id].jumlah);
  const [image, setImage] = useState(data[id].image);
  const [type, setType] = useState(data[id].type);

  const [dataSet, setDataSet] = useState();

  const [tempData, setTempData] = useState(data);

  const setModal = () => {
    modalState(false);
  };

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
  

  const submitData = (e) => {
    e.preventDefault();
    if (name == "" || name == null || name == undefined) {
      alert.show("Nama tidak boleh kosong ");
    } else if (
      price == "" ||
      price == null ||
      price == undefined ||
      price == 0 ||
      price <= 0
    ) {
      alert.show("Harga tidak boleh " + price);
    } else if (type == "" || type == null || type == undefined) {
      alert.show("Tipe tidak boleh kosong");
    } else if (
      qty == "" ||
      qty == null ||
      qty == undefined ||
      qty == 0 ||
      qty <= 0
    ) {
      alert.show("Jumlah tidak boleh " + qty);
    } else if (image == "" || image == null || image == undefined) {
      alert.show("Gambar tidak boleh kosong");
    } else {
        console.log("hai")
        let beforeSubmit = tempData
       
        beforeSubmit[id].name=name
        beforeSubmit[id].price=price
        beforeSubmit[id].type=type
        beforeSubmit[id].jumlah=qty
        beforeSubmit[id].image=image
        setDataSet(beforeSubmit)

    //   setDataSet({
    //     id: "0",
    //     name: name,
    //     price: price,
    //     type: type,
    //     jumlah: qty,
    //     image: image,
    //   });
    }
  };



  return (
    <div className="add-modal-container">
      <div className="add-modal-box">
        <form style={{}} onSubmit={(e) => submitData(e)}>
          <h3>Edit Detail {tempData[id].name}</h3>
          <div className="mb-3">
            <label>ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Item's Id"
              disabled
              value={tempData[id].id}
            />
          </div>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Item's Name"
              value={name !== "" ? name : null}
              onChange={(val) => setName(val.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="Set the price"
              min={1}
              value={price !== 0 ? price : null}
              onChange={(val) => setPrice(val.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Type</label>
            <input
              type="text"
              className="form-control"
              placeholder="Type of item"
              value={type !== "" ? type : null}
              onChange={(val) => setType(val.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Quantity</label>
            <input
              type="number"
              className="form-control"
              placeholder="Set the quantity"
              min={1}
              value={qty !== 0 ? qty : null}
              onChange={(val) => setQty(val.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Image</label>
            <input
              type="url"
              className="form-control"
              placeholder="Image's url"
              value={image !== "" ? image : null}
              onChange={(val) => setImage(val.target.value)}
            />
          </div>
          <div className="mb-3"></div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              onClick={setModal}
              style={{ marginTop: 10 }}
              className="btn btn-danger"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;

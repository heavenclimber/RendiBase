import React, { Component, useState, useEffect } from "react";
import Header from "../Components/Header";
import Button from "../Components/Button";
import AddModal from "../Components/AddModal";
import EditModal from "../Components/EditModal";

import firebase from "../firebase/index";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const initstate = { title: "", description: "" };
  const [inputs, setInputs] = useState(initstate);
  const [searchInput, setSearchInput] = useState("");

  const [openAddModal, setOpenModal] = useState(false);
  const [openEditModal, setEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    getData();
  }, [openAddModal]);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue.toUpperCase());
  };

  const getData = () => {
    firebase.db
      .collection("data")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var res = element.data();
          setData(res.item);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const sendTodo = () => {
    let newdata = data;
    // firebase.db
    //   .collection("data").doc(NwE7sn9FEaKhmHGzXwmY)
    //   .update({ name: "first todo", price: 1000 })
    //   .then((documentReference) => {
    //     console.log("document reference ID", documentReference.id);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
  };

  const openEdit = (i) => {
    setSelectedId(i)
    setEditModal(true)
  };

  return (
    <div className="main-body" style={{height: openAddModal==true || openEditModal==true ? "100vh" : "auto"}}>
      <Header />
      {/* <div className="filter-container">
        <input
          icon="search"
          placeholder="Search..."
          onChange={(e) => searchItems(e.target.value)}
        />
      </div> */}
      <div className="filter-container">
        <div className="search-container">
          <input
            type="text"
            icon="search"
            name="search"
            placeholder="Search..."
            className="search-input"
            onChange={(e) => searchItems(e.target.value)}
          />
          <a href="#" className="search-btn">
            <FontAwesomeIcon icon={faSearch} />
          </a>
        </div>
      </div>
      <div>
        {/* <form onSubmit={sendTodo}>
          <input
            name="title"
            placeholder="title"
            value={inputs.title}
            onChange={handleChange}
          />
          <input
            name="description"
            value={inputs.description}
            placeholder="description"
            onChange={handleChange}
          />
          <button>send todo</button>
        </form> */}
        {/* {data.length===0 ? null : data.map((item,i)=> <div key={i}>{item.name + i}</div>)} */}

        {data ? <div className="main-card-container">
          {searchInput !== ""
            ? data.map((item, i) => {
                if (item.name.toUpperCase().includes(searchInput)) {
                  return (
                    <div className="card-container" key={i}>
                      <div className="card">
                        <div className="imgBx">
                          <img src={item.image} />
                        </div>
                        <div className="contentBx">
                          <h2>{item.name}</h2>
                          <div className="color">
                            <b style={{ marginRight: 5 }}>IDR</b>
                            <b>{item.price}</b>
                          </div>
                          <div className="color">
                            <b style={{ marginRight: 5 }}>Jumlah: </b>
                            <b>{item.jumlah}</b>
                          </div>
                          <a onClick={()=>openEdit(i)}>Edit Now</a>
                        </div>
                      </div>
                    </div>
                  );
                }
              })
            : data.map((item, i) => {
             
                return (
                  <div className="card-container" key={i}>
                    <div className="card">
                      <div className="imgBx">
                        <img src={item.image} />
                      </div>
                      <div className="contentBx">
                        <h2>{item.name}</h2>
                        <div className="color">
                          <b style={{ marginRight: 5 }}>IDR</b>
                          <b>{item.price}</b>
                        </div>
                        <div className="color">
                          <b style={{ marginRight: 5 }}>Jumlah: </b>
                          <b>{item.jumlah}</b>
                        </div>
                        <a onClick={()=>openEdit(i)}>Edit Now</a>
                      </div>
                    </div>
                  </div>
                );
              })}
     
        </div> : <div>Data Empty</div>}
      </div>
      {openAddModal ? <AddModal modalState={setOpenModal} newid={data ? data.length : 0} /> : null}
      {openEditModal ? <EditModal modalState={setEditModal} data={data} id={selectedId}/> : null}
      {/* <button onClick={sendTodo}>click here to send</button> */}
      <Button modalState={setOpenModal} />
    </div>
  );
}

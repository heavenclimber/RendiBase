import React, { Component, useState, useEffect } from "react";

import Header from "../Components/Header";
import Button from "../Components/Button";
import AddModal from "../Components/AddModal";
import EditModal from "../Components/EditModal";
import DeleteModal from "../Components/DeleteModal";
import SellModal from "../Components/SellModal";

import firebase from "../firebase/index";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTools, faTree } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "react-alert";

function Home({ user }) {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const initstate = { title: "", description: "" };
  const [inputs, setInputs] = useState(initstate);
  const [searchInput, setSearchInput] = useState("");

  const [perkakas, setPerkakas] = useState(false);
  const [bahan, setBahan] = useState(false);

  const [openAddModal, setOpenModal] = useState(false);

  const [openEditModal, setEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const [openDeleteModal, setDeleteModal] = useState(false);

  const [openSellModal, setSellModal] = useState(false);

  const alert = useAlert();

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
    setSelectedId(i);
    setEditModal(true);
  };

  const removeItem = (i) => {
    setSelectedId(i);
    setDeleteModal(true);
  };

  const sellItem = (i) => {
    setSelectedId(i);
    setSellModal(true);
  };

  return (
    <div
      className="main-body"
      style={{
        height:
          openAddModal == true ||
          openEditModal == true ||
          openDeleteModal == true ||
          openSellModal == true
            ? "100vh"
            : "auto",
      }}
    >
      <Header />
      {/* <div className="filter-container">
        <input
          icon="search"
          placeholder="Search..."
          onChange={(e) => searchItems(e.target.value)}
        />
      </div> */}
      <div className="filter-container">
        <div>
          <a
            className="iconCat"
            style={{
              backgroundColor: perkakas ? "#1687A7" : null,
              color: perkakas ? "white" : null,
            }}
            onClick={() => {
              setPerkakas(!perkakas);
              setBahan(false);
            }}
          >
            <FontAwesomeIcon icon={faTools} />
          </a>
          <a
            className="iconCat"
            style={{
              backgroundColor: bahan ? "#1687A7" : null,
              color: bahan ? "white" : null,
            }}
            onClick={() => {
              setBahan(!bahan);
              setPerkakas(false);
            }}
          >
            <FontAwesomeIcon icon={faTree} />
          </a>
        </div>
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

        {data ? (
          <div className="main-card-container">
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
                            <h2>
                              <span className="spanid">#{i} </span>
                              {item.name}
                            </h2>
                            <div className="color">
                              <b style={{ marginRight: 5 }}>IDR</b>
                              <b>{item.price}</b>
                            </div>
                            <div className="color">
                              <b style={{ marginRight: 5 }}>Jumlah: </b>
                              <b>{item.jumlah}</b>
                            </div>

                            {user == "admin" ? (
                              <div className="btnContainer">
                                <a onClick={() => openEdit(i)}>Edit Now</a>
                                <a
                                  className="removebtn"
                                  onClick={() => removeItem(i)}
                                >
                                  Remove
                                </a>
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                          {user == "admin" ? (
                            <div>
                              {item.jumlah == "0" ? (
                                <div className="sellbtncontainer">
                                  <a className="disabled">Out of Stock</a>
                                </div>
                              ) : (
                                <div className="sellbtncontainer">
                                  <a onClick={() => sellItem(i)}>Sell</a>
                                </div>
                              )}
                            </div>
                          ) : (
                            <></>
                          )}
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
                          <h2>
                            <span className="spanid">#{i} </span>
                            {item.name}
                          </h2>
                          <div className="color">
                            <b style={{ marginRight: 5 }}>IDR</b>
                            <b>{item.price}</b>
                          </div>
                          <div className="color">
                            <b style={{ marginRight: 5 }}>Jumlah: </b>
                            <b>{item.jumlah}</b>
                          </div>
                          {user == "admin" ? (
                            <div className="btnContainer">
                              <a onClick={() => openEdit(i)}>Edit Now</a>
                              <a
                                className="removebtn"
                                onClick={() => removeItem(i)}
                              >
                                Remove
                              </a>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                        {user == "admin" ? (
                          <div>
                            {item.jumlah == "0" ? (
                              <div className="sellbtncontainer">
                                <a className="disabled">Out of Stock</a>
                              </div>
                            ) : (
                              <div className="sellbtncontainer">
                                <a onClick={() => sellItem(i)}>Sell</a>
                              </div>
                            )}
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  );
                })}
          </div>
        ) : (
          <div>Data Empty</div>
        )}
      </div>
      {openAddModal ? (
        <AddModal modalState={setOpenModal} newid={data ? data.length : 0} />
      ) : null}
      {openEditModal ? (
        <EditModal modalState={setEditModal} data={data} id={selectedId} />
      ) : null}
      {openDeleteModal ? (
        <DeleteModal
          modalState={setDeleteModal}
          data={data}
          id={selectedId}
          refresh={setOpenModal}
        />
      ) : null}
      {openSellModal ? (
        <SellModal modalState={setSellModal} data={data} id={selectedId} />
      ) : null}
      {/* <button onClick={sendTodo}>click here to send</button> */}
      {user == "admin" ? <Button modalState={setOpenModal} /> : <></>}
    </div>
  );
}

export default Home;

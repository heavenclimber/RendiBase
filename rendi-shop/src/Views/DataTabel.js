import React, { Component, useState, useEffect } from "react";

import Header from "../Components/Header";

import firebase from "../firebase/index";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTools, faTree } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "react-alert";

function DataTabel({ user }) {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [openAddModal, setOpenModal] = useState(false);

  const [openEditModal, setEditModal] = useState(false);

  const [openDeleteModal, setDeleteModal] = useState(false);

  const [openSellModal, setSellModal] = useState(false);
  const [tes3, setTes3] = useState();

  const alert = useAlert();

  useEffect(() => {
    getData();
    firebase.db
      .collection("tes3")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var res = element.data();

          setTes3(res.baseng);
          console.log(res.baseng);

          if (tes3) {
            console.log(tes3.isinyo);
          }
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
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
        {data ? (
          <div className="main-card-container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Barang</th>
                  <th>Jumlah</th>
                  <th>Harga</th>
                  <th>Tipe</th>
                  <th>Gambar</th>
                </tr>
              </thead>
              <tbody>
                {searchInput !== ""
                  ? data.map((item, i) => {
                      if (item.name.toUpperCase().includes(searchInput)) {
                        return (
                          <tr>
                            <th>{item.id}</th>
                            <th>{item.name}</th>
                            <th>{item.jumlah}</th>
                            <th>{item.price}</th>
                            <th>{item.type}</th>
                            <th>
                              <img src={item.image} style={{width:100, height:100, borderRadius:50}} />
                            </th>
                          </tr>
                        );
                      }
                    })
                  : data.map((item, i) => {
                      return (
                        <tr>
                          <th>{item.id}</th>
                          <th>{item.name}</th>
                          <th>{item.jumlah}</th>
                          <th>{item.price}</th>
                          <th>{item.type}</th>
                          <th>
                            <img src={item.image} style={{width:100, height:100, borderRadius:50}} />
                          </th>
                        </tr>
                      );
                    })}
              </tbody>
            </Table>
          </div>
        ) : (
          <div>Data Empty</div>
        )}
      </div>
    </div>
  );
}

export default DataTabel;

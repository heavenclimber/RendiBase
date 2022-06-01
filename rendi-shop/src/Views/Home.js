import React, { Component, useState, useEffect } from "react";
import Header from "../Components/Header";

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

  useEffect(() => {
    getData();
  }, []);

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
    console.log(newdata);
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

  return (
    <div style={{backgroundColor:'#E8E8E8'}}>
      <Header />
      {/* <div className="filter-container">
        <input
          icon="search"
          placeholder="Search..."
          onChange={(e) => searchItems(e.target.value)}
        />
      </div> */}
      <div className="filter-container">
        <div class="search-container">
          <input
            type="text"
            icon="search"
            name="search"
            placeholder="Search..."
            class="search-input"
            onChange={(e) => searchItems(e.target.value)}
          />
          <a href="#" class="search-btn">
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

        <div className="main-card-container">
          {searchInput !== ""
            ? data.map((item, i) => {
                if (item.name.toUpperCase().includes(searchInput)) {
                  return (
                    <div class="card-container" key={i}>
                      <div class="card">
                        <div class="imgBx">
                          <img src={item.image} />
                        </div>
                        <div class="contentBx">
                          <h2>{item.name}</h2>
                          <div class="color">
                            <b style={{ marginRight: 5 }}>IDR</b>
                            <b>{item.price}</b>
                          </div>
                          <div class="color">
                            <b style={{ marginRight: 5 }}>Jumlah: </b>
                            <b>{item.jumlah}</b>
                          </div>
                          <a href="#">Edit Now</a>
                        </div>
                      </div>
                    </div>
                  );
                }
              })
            : data.map((item, i) => {
                return (
                  <div class="card-container" key={i}>
                    <div class="card">
                      <div class="imgBx">
                        <img src={item.image} />
                      </div>
                      <div class="contentBx">
                        <h2>{item.name}</h2>
                        <div class="color">
                          <b style={{ marginRight: 5 }}>IDR</b>
                          <b>{item.price}</b>
                        </div>
                        <div class="color">
                          <b style={{ marginRight: 5 }}>Jumlah: </b>
                          <b>{item.jumlah}</b>
                        </div>
                        <a href="#">Edit Now</a>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
      <button onClick={sendTodo}>click here to send</button>
    </div>
  );
}

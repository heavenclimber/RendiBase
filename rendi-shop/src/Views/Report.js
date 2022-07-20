import React, { Component, useState, useEffect, useRef } from "react";
import Header from "../Components/Header";
import DatePicker from "react-datepicker";
import ReactToPrint from "react-to-print";
import "react-datepicker/dist/react-datepicker.css";
import "moment-timezone";
import moment from "moment-timezone";
import Table from "react-bootstrap/Table";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import firebase from "../firebase/index";

export default function Report() {
  const [data, setData] = useState();
  const [show, setShow] = useState(true);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [refresh, setRefresh] = useState();

  useEffect(() => {
    getData();
  }, [show, startDate]);

  const getData = () => {
    firebase.db
      .collection("report")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var res = element.data();
          setData(res.report);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const componentRef = useRef();
  return (
    <div className="main-body">
      {/* {console.log(startDate,moment(startDate).format("DD-MM-YYYY").toString())} */}
      <Header />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "15px",
          paddingRight: "15px",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            padding: "20px",
            paddingBottom: "10px",
          }}
        >
          Report Penjualan
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <ReactToPrint
            trigger={() => <button>Print this out!</button>}
            content={() => componentRef.current}
          />
          <a
            className="iconCat"
            style={{
              backgroundColor: show ? "#1687A7" : "gainsboro",
              color: show ? "white" : "grey",
              width: "150px",
            }}
            onClick={() => {
              setShow(!show);
            }}
          >
            {show ? "Select Date" : "Show All"}
          </a>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="filter-container" style={{ justifyContent: "center" }}>
          <div className="search-container">
            <input
              type="text"
              icon="search"
              name="search"
              placeholder="Search..."
              className="search-input"
              style={{ width: "100%", minWidth: "400px" }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <a href="#" className="search-btn" style={{ marginLeft: "10px" }}>
              <FontAwesomeIcon icon={faSearch} />
            </a>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        {show ? null : (
          <DatePicker
            selected={startDate}
            style={{ width: "auto" }}
            onChange={(date: Date) => setStartDate(date)}
          />
        )}
      </div>
      {data ? (
        <div className="reportcontainer" ref={componentRef}>
          <div>
            <p>
              Report Penjualan:{" "}
              {show ? "All" : moment(startDate).format("DD-MM-YYYY").toString()}
            </p>
            <p>Keyword: {search ? search : "None"}</p>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Barang</th>
                <th>Jumlah Dibeli</th>
                <th>Total Dibayar</th>
                <th>Tanggal Penjualan</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => {
                // {console.log(moment(item.date,"dddd, MMMM Do YYYY, HH:mm:ss A").format("DD-MM-YYYY").toString())}
                if (
                  moment(item.date, "dddd, MMMM Do YYYY, HH:mm:ss A")
                    .format("DD-MM-YYYY")
                    .toString() ===
                    moment(startDate).format("DD-MM-YYYY").toString() &&
                  !show
                ) {
                  return (
                    <>
                      {search !== "" &&
                      item.name.toUpperCase().includes(search.toUpperCase()) ? (
                        <tr key={i}>
                          <th>{item.id}</th>
                          <th>{item.name}</th>
                          <th>{item.jumlah}</th>
                          <th>{item.bayar}</th>
                          <th>{item.date}</th>
                        </tr>
                      ) : search === "" ? (
                        <tr key={i}>
                          <th>{item.id}</th>
                          <th>{item.name}</th>
                          <th>{item.jumlah}</th>
                          <th>{item.bayar}</th>
                          <th>{item.date}</th>
                        </tr>
                      ) : null}
                    </>

                    // <div className="reportbox" key={i}>
                    //   <h5>
                    //     {item.name}
                    //     <span className="reportid"> #{item.id}</span>
                    //   </h5>
                    //   <div>
                    //     Jumlah yang dibeli:{" "}
                    //     <span className="spanreport">{item.jumlah}</span>
                    //   </div>
                    //   <div>
                    //     Tanggal Pembelian:{" "}
                    //     <span className="spanreport">{item.date}</span>
                    //   </div>
                    //   <div>
                    //     Total yang dibayar:{" "}
                    //     <span className="spanreport">{item.bayar}</span>
                    //   </div>
                    // </div>
                  );
                } else if (show) {
                  return (
                    <>
                      {search !== "" &&
                      item.name.toUpperCase().includes(search.toUpperCase()) ? (
                        <tr key={i}>
                          <th>{item.id}</th>
                          <th>{item.name}</th>
                          <th>{item.jumlah}</th>
                          <th>{item.bayar}</th>
                          <th>{item.date}</th>
                        </tr>
                      ) : search === "" ? (
                        <tr key={i}>
                          <th>{item.id}</th>
                          <th>{item.name}</th>
                          <th>{item.jumlah}</th>
                          <th>{item.bayar}</th>
                          <th>{item.date}</th>
                        </tr>
                      ) : null}
                    </>
                  );
                }
              })}
            </tbody>
          </Table>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            padding: "25px",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          There's no data
        </div>
      )}
    </div>
  );
}

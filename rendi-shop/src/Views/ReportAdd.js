import React, { Component, useState, useEffect } from "react";
import Header from "../Components/Header";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "moment-timezone";
import moment from "moment-timezone";

import firebase from "../firebase/index";
import Table from "react-bootstrap/Table";

export default function ReportAdd() {
  const [data, setData] = useState();
  const [show, setShow] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [refresh, setRefresh] = useState();
  const [datareport, setDataReport] = useState();

  useEffect(() => {
    getData();
  }, [show, startDate]);

  const getData = () => {
    firebase.db
      .collection("reportmasuk")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var res = element.data();
          setData(res.reportmasuk);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

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
          Report Barang Masuk
        </h3>
        <div
          style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
        >
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
        <div className="reportcontainer">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Barang</th>
                <th>Jumlah Restock</th>
                <th>Total Stock</th>
                <th>Harga</th>
                <th>Tipe</th>
                <th>Tanggal Masuk</th>
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
                    <tr key={i}>
                      <th>{item.id}</th>
                      <th>{item.name}</th>
                      <th>{item.jumlahrestock}</th>
                      <th>{item.jumlah}</th>
                      <th>{item.price}</th>
                      <th>{item.type}</th>
                      <th>{item.date}</th>
                    </tr>
                  );
                } else if (show) {
                  return (
                    <tr key={i}>
                      <th>{item.id}</th>
                      <th>{item.name}</th>
                      <th>{item.jumlahrestock}</th>
                      <th>{item.jumlah}</th>
                      <th>{item.price}</th>
                      <th>{item.type}</th>
                      <th>{item.date}</th>
                    </tr>
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

import React, { Component, useState, useEffect } from "react";
import Header from "../Components/Header";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import 'moment-timezone';
import moment from "moment-timezone";

import firebase from "../firebase/index";

export default function Report() {
  const [data, setData] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [refresh, setRefresh] = useState();


  useEffect(() => {
    getData();
  }, [startDate]);

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

  return (
    <div className="main-body">
      {/* {console.log(startDate,moment(startDate).format("DD-MM-YYYY").toString())} */}
      <Header />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft:'15px', paddingRight:'15px'
        }}
      >
        <h2
          style={{
            textAlign: "center",
            padding: "20px",
            paddingBottom: "10px",
          }}
        >
          Report Penjualan
        </h2>
        <div>
          <DatePicker
            selected={startDate}
            style={{ width: "auto" }}
            onChange={(date: Date) => setStartDate(date)}
          />
        </div>
      </div>
      {data ? (
        <div className="reportcontainer">
          {data.map((item, i) => {
            // {console.log(moment(item.date,"dddd, MMMM Do YYYY, HH:mm:ss A").format("DD-MM-YYYY").toString())}
            if(moment(item.date,"dddd, MMMM Do YYYY, HH:mm:ss A").format("DD-MM-YYYY").toString() ===moment(startDate).format("DD-MM-YYYY").toString()){
              return (
                <div className="reportbox" key={i}>
                  <h5>
                    {item.name}
                    <span className="reportid"> #{item.id}</span>
                  </h5>
                  <div>
                    Jumlah yang dibeli:{" "}
                    <span className="spanreport">{item.jumlah}</span>
                  </div>
                  <div>
                    Tanggal Pembelian:{" "}
                    <span className="spanreport">{item.date}</span>
                  </div>
                  <div>
                    Total yang dibayar:{" "}
                    <span className="spanreport">{item.bayar}</span>
                  </div>
                </div>
              );
            }
          })}
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

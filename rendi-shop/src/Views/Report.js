import React, { Component, useState, useEffect } from "react";
import Header from "../Components/Header";

import firebase from "../firebase/index";

export default function Report() {
  const [data, setData] = useState();

  const [refresh, setRefresh] = useState();

  console.log(data);

  useEffect(() => {
    getData();
  }, [refresh]);

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
      <Header />
      <h2 style={{textAlign:'center', padding:"20px", paddingBottom:"10px"}}>Report Penjualan</h2>
      {data ? (
        <div className="reportcontainer">
       
          {data.map((item, i) => {
            return <div className="reportbox">

            <h5>{item.name}<span className="reportid"> #{item.id}</span></h5>
            <div>Jumlah yang dibeli: <span className="spanreport">{item.jumlah}</span></div>
            <div>Tanggal Pembelian: <span className="spanreport">{item.date}</span></div>
            <div>Total yang dibayar: <span className="spanreport">{item.bayar}</span></div>

            </div>;
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

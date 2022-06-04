import React, { Component, useState, useEffect } from "react";
import firebase from "../firebase/index";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

export default function Login({ setUser }) {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/home");
  };

  const alert = useAlert();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    firebase.db
      .collection("user")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var res = element.data();
          setData(res.user);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    if (email == "" || email == null || email == undefined) {
      alert.show("Email tidak boleh kosong ");
    } else if (password == "" || password == null || password == undefined) {
      alert.show("Password tidak boleh kosong ");
    } else {
      authCheck(e);
    }
  };

  const authCheck = (e) => {
    let length = data.length;

    for (let i = 0; i < length; i++) {
      if (data[i].email == email) {
        if (data[i].pass == password) {
          if (data[i].auth == "admin") {
            setUser("admin");
            navigate("/home");
          } else if (data[i].auth == "user") {
            setUser("user");
            navigate("/home");
          }
        }
        else{
          alert.show("Password anda salah ");
        }
      }
    }
  };

  return (
    <div className="logincontainer">
      <div
        style={{
          flex: 1,
          maxWidth: 800,
          background: "#d8f9ff",
          padding: 30,
          borderRadius: 10,
          margin: "auto",
        }}
      >
        <form onSubmit={(e) => submitLogin(e)}>
          <h3>Sign In</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(val) => setEmail(val.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(val) => setPassword(val.target.value)}
            />
          </div>
          <div className="mb-3"></div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

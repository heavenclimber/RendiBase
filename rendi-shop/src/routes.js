import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Views/Home";
import Report from "./Views/Report";
import ReportAdd from "./Views/ReportAdd";
import Header from "./Components/Header";
import DataTabel from "./Views/DataTabel";
import Login from "./Views/Login";

const Nav = () => {
  const [user, setUser] = useState("admin");

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login setUser={setUser} />} />
          <Route exact path="/" element={<Login setUser={setUser} />} />
          <Route path={"/home"} element={<Home user={user} />} />
          <Route path={"/datatabel"} element={<DataTabel user={user} />} />
          <Route path={"/report"} element={<Report />} />
          <Route path={"/reportmasuk"} element={<ReportAdd />} />
        </Routes>
      </Router>
    </div>
  );
};

// const Home = () => (
//     <Home/>
// )

export default Nav;

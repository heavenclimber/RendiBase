import React,  { Component, useState, useEffect }  from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Views/Home";
import Report from "./Views/Report";
import Header from "./Components/Header";
import Login from "./Views/Login";

const Nav = () => {

  const [user, setUser] = useState('user');

  return (
    <div>
      <Router>
        
        <Routes>
          <Route exact path="/login" element={<Login setUser={setUser} />} />
          <Route exact path="/" element={<Home user={user} />} />
          <Route path={"/home"} element={<Home user={user} />} />
          <Route path={"/report"} element={<Report />} />
        </Routes>
      </Router>
    </div>
  );
};

// const Home = () => (
//     <Home/>
// )

export default Nav;

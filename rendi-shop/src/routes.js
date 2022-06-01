import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Views/Home";
import Add from "./Views/Add";
import Report from "./Views/Report";
import Header from "./Components/Header";
import Login from "./Views/Login";

const Nav = () => {
  return (
    <div>
      <Router>
        
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route path={"/home"} element={<Home />} />
          <Route path="/add" element={<Add />} />
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

import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from '../Assets/Images/logo.png'

export default function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <img src={logo} style={{ width: 100,  }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="home" to={"/home/"}>
              Home
            </Nav.Link>
            <Nav.Link href="report" to={"/report/"}>
              Report
            </Nav.Link>
            <Nav.Link
              href="login"
              style={{ color: "red", fontWeight: "bold" }}
              to={"/login/"}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

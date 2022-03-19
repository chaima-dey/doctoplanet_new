/* eslint-disable */
import React from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
 
import LOGO from "../../assets/images/Logo white.png";
import "./Navbar.scss";
 
 
function _Navbar() {
 

 
  return (
    <Navbar  className="NavRoom" expand="lg">
      <Navbar.Brand style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        <img className="LOGO Logo-white"  src={LOGO} alt="" />
      </Navbar.Brand>
     
      <Navbar.Collapse id="basic-navbar-nav">
       
      </Navbar.Collapse>
    </Navbar>
  );
}

export default _Navbar;

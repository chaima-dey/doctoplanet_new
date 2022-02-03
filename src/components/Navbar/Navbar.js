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
import { FiUser,FiCalendar,FiList ,FiSearch} from "react-icons/fi";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import LOGO from "../../assets/images/Docto_LOGO.png";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RemoveToken, RemoveUser } from "../../actions";
import User_icon from "../../assets/images/icon/user.png";
import Medi from "../../assets/images/icon/medica.svg";
import url from "../../api";

function _Navbar() {
  const TokenReducer = useSelector((state) => state.TokenReducer);
  const UserReducer = useSelector((state) => state.UserReducer);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    const btn = document.querySelector(".navbar-toggler");
    const navbar = document.querySelector(".navbar-collapse");
    if (navbar.classList.contains("show")) btn.click();
  }, [pathname]);

   

  const Logout = () => {
    dispatch(RemoveToken());
    dispatch(RemoveUser());
    window.location.replace("/login");
    // navigate("/login")
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        <img className="LOGO" src={LOGO} alt="" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavLink className="nav-link" to="/">
            Accueil
          </NavLink>

          <NavLink className="nav-link" to="/qui-sommes-nous">
            A Propos
          </NavLink>
          <NavLink className="nav-link" to="/offres">
            Nos Offres
          </NavLink>
          <NavLink className="nav-link" to="/faq">
            F.A.Q
          </NavLink>
          {/* <NavLink className="nav-link" to="/medicament">
            Médicaments
          </NavLink> */}
          <NavLink className="nav-link" to="/assurances">
            Assurances
          </NavLink>
          <NavDropdown title="Espace Patient" id="basic-nav-dropdown">
          <NavDropdown.Item onClick={() => navigate("/compte")}>
             <FiUser /> Mon compte
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate("rendez_vous")}>
            <FiCalendar />  Prendre un rendez-vous
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate("/consultations")}>
            <FiList />  Mes consultations
            </NavDropdown.Item>
           
          
        
            <NavDropdown.Item onClick={() => navigate("/medicament")}>
            <FiSearch />  Trouver un médicaments
            </NavDropdown.Item>
            <NavDropdown.Item disabled>
            <FiSearch />   Trouver un medecin
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <li className="btn-area">
          {!TokenReducer ? (
            <button
              onClick={() => navigate("/login")}
              className="btn btn-primary shadow"
            >
              Se connecter ?{" "}
              <i className="btn-icon-bx fas fa-chevron-right"></i>
            </button>
          ) : (
            <div className="user_nav">
              <div onClick={() => navigate("/compte")}>
                {/* <i className="far fa-user-circle"></i> */}
                <img src={UserReducer.image ? `${url}/uploads/${UserReducer.image}` : User_icon} alt="" />
                <p> {UserReducer.nom}</p>
              </div>
             
            </div>
          )}
        </li>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default _Navbar;

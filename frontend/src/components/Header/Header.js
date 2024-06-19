import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";
import { useDispatch } from "react-redux";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="light">
      <div className="container-fluid">
        <Navbar.Brand>
          <Link to="/">NoteBook</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto"></Nav>
          <Nav>
            <Nav.Link>
              <Link to="/mynotes">My Notes</Link>
            </Nav.Link>
            <NavDropdown title="Subashinsinex" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={logoutHandler}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </nav>
  );
};

export default Header;

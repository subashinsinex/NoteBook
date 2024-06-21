import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
            {userInfo ? (
              <Nav.Link>
                <Link to="/mynotes">My Notes</Link>
              </Nav.Link>
            ) : (
              <Nav.Link></Nav.Link>
            )}
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">
                  Edit Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link></Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </nav>
  );
};

export default Header;

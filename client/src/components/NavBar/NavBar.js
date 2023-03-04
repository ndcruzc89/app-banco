import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./NavBar.css";
import Cookies from "js-cookie";

function NavBar(props) {
  const navigate = useNavigate();

  const user = JSON.parse(Cookies.get("userInfo"));

  function logout(e) {
    e.preventDefault();
    Cookies.remove("userInfo");
    navigate("/");
  }

  return (
    <Navbar
      fixed="top"
      collapseOnSelect
      expand="lg"
      variant="dark"
      className="nav-bar"
    >
      <Container>
        <Navbar.Brand>
          <NavLink to="/home" className="nav-link">
            <img className="logo" src={logo} alt={logo}></img>
            <span>EsTUBANCO</span>
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <NavLink to="/home" className="nav-link me-3 me-lg-2">
              Inicio
            </NavLink>
            <NavLink
              to="/transaction/deposit"
              state={{ accounts: props.accounts, update: true }}
              className="nav-link d-lg-none"
            >
              Depósito
            </NavLink>
            <NavLink
              to="/transaction/withdrawal"
              state={{ accounts: props.accounts, update: true }}
              className="nav-link d-lg-none"
            >
              Retiro
            </NavLink>
            <NavLink
              to="/"
              className="nav-link me-3 d-lg-none"
              onClick={logout}
            >
              Cerrar Sesión
            </NavLink>
            <NavDropdown
              title="Transacción"
              className="me-4 d-none d-lg-inline"
            >
              <NavDropdown.Item
                as={NavLink}
                to="/transaction/deposit"
                state={{ accounts: props.accounts, update: true }}
                className="nav-link text-dark"
              >
                Depósito
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/transaction/withdrawal"
                state={{ accounts: props.accounts, update: true }}
                className="nav-link text-dark"
              >
                Retiro
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={user.name}
              id="account-dropdown"
              className="border border-success rounded-2 p-1 d-none d-lg-inline"
            >
              <NavDropdown.Item href="" onClick={logout.bind(this)}>
                Cerrar Sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

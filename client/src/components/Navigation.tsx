// import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { selectToken, logout, selectUser } from "../state/auth";

function Navigation() {
  const { authenticated, logout } = useAuthentication();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Gifting v2</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {authenticated ? (
            <Nav.Link as={Link} to="/Wishes">
              Wishes
            </Nav.Link>) : null}
          </Nav>
          {authenticated ? (
            <Nav>
              <Nav.Link onClick={logout}>
                Logout
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;

export function useAuthentication() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  const { push } = useHistory();

  const authenticated = token;

  const _logout = async (e: any) => {
    e.preventDefault();
    dispatch(logout());
    push('/')
  };

  const login = async () => {
    return;
  };

  return { authenticated, login, logout:_logout };
}
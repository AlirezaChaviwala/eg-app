import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../../authContext";
import "../../App.css";

function AppNavbar() {
  const { user } = useAuth();
  return (
    <Navbar className="App-theme" expand="lg">
      <Container>
        {user ? (
          <LinkContainer to="/dashboard">
            <Navbar.Brand>Dashboard</Navbar.Brand>
          </LinkContainer>
        ) : null}
        <Navbar.Toggle aria-controls="navbar-nav" />
        {!user ? (
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/signIn">
                <Nav.Link>Sign In</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/signUp">
                <Nav.Link>Sign Up</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        ) : null}
      </Container>
    </Navbar>
  );
}

export default AppNavbar;

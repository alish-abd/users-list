import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
import { Button, Navbar, NavDropdown } from "react-bootstrap";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  //since we cant access the data from localStorage we parse it using JSON.parse
  let user = JSON.parse(localStorage.getItem("user-info"));
  const navigate = useNavigate();

  //defining logOut function to implement logging out by removing user-info and user-id from localStorage
  //navigating to register page when the function is performed
  function logOut() {
    localStorage.removeItem("user-info");
    localStorage.removeItem("user-id");
    navigate("/register");
  }
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            {/* Showing  Home and Profile buttons on the headr only for logged in users
            And showing Login and Register buttons only for Logged out users */}
            {localStorage.getItem("user-info") ? (
              <>
                <Nav.Link as={Link} to="/home">
                  Home
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
          {/* if ther is user-info in localStorage the 'Log out' button will be displayed, otherwise, when user is logged out, it will not */}
          {localStorage.getItem("user-info") ? (
            <Nav>
              <Button onClick={logOut}>Log out</Button>
            </Nav>
          ) : null}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

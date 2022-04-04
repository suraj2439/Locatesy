import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import Capture from "../images/Capture.PNG";

export default function Navbar1() {
  return (
    <> 
      <Navbar
        bg="dark"
        variant="dark"
        sticky="top"
        expand="sm"
        collapseOnSelect
      >
        <Container style={{ marginLeft: "3rem" }}>
          <Navbar.Brand href="#home" style={{ fontSize: "1.6rem" }}>
            <img
              src={Capture}
              width="50"
              height="40"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
              style={{ marginRight: "1rem" }}
            />{" "}
            <span>LOCATESY</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Nav style={{ fontSize: "1.2rem" }}>
              <Nav.Link href={process.env.PUBLIC_URL} style={{ marginRight: "1.5rem" }}>
                Buy
              </Nav.Link>
              <Nav.Link href="#features" style={{ marginRight: "1.5rem" }}>
                Sell
              </Nav.Link>
              <Nav.Link href="#pricing" style={{ marginRight: "1.5rem" }}>
                Rent
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

import React from 'react';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Header = () => {
    return (
        <>
           <Navbar id="navbar_top" collapseOnSelect expand="lg" className="nav-scrolled"  variant="dark"  >
  <Container>
  <Navbar.Brand href="/">
  <Image
        src="/images/N-pixel-logo.png"
        width="70"
        height="65"
        className="d-inline-block align-top me-4"
        alt="React Bootstrap logo"/>
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      
    </Nav>
    <Nav>
      <Nav.Link href="#deets">Manage Slot</Nav.Link>
      <NavDropdown title="My Profile" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">View</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
       
        
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
        </>
    );
};

export default Header;
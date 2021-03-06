import React, { useContext, useEffect } from 'react';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { userContext } from '../../pages/_app';

import Link from 'next/link';

const Header = () => {
  const [loggedInUser, setloggedInUser] = useContext(userContext);

  useEffect(()=> {
    
    
      setloggedInUser({ email: localStorage.getItem('email'), name: localStorage.getItem('name')})

  },[loggedInUser.email, setloggedInUser])

    return (
        <>
           <Navbar id="navbar_top" collapseOnSelect expand="lg" className="nav-scrolled"  variant="dark"  >
  <Container>
  
  <Navbar.Brand href="/">
  <Image
        src="/images/N-pixel-logo.png"
        width="50"
        height="45"
        className="d-inline-block align-top me-4"
        alt="React Bootstrap logo"/>
  </Navbar.Brand>
  
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto header-left">
      
      {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
      <a className="slot-price mt-2">TBC</a>
      <Link href="/about" ><a className="slot-price cursor-pointer header-bg-blue mt-2">About</a></Link>
      <Link href='/faq' ><a className="slot-price cursor-pointer header-bg-blue mt-2">FAQ</a></Link>
      

      
    </Nav>
    
    <Nav>
    {(loggedInUser.email === process.env.NEXT_PUBLIC_ADMIN) && <Nav.Link href={'/allorders/'}>All Orders</Nav.Link>}
    {(loggedInUser.email === process.env.NEXT_PUBLIC_ADMIN) && <Nav.Link href={'/manageuser/'}>All Users</Nav.Link>}
    {(loggedInUser.email === process.env.NEXT_PUBLIC_ADMIN) ?
    // <NavDropdown title="Admin Panel" id="collasible-nav-dropdown">
        
    //     {loggedInUser.email !== ( undefined||null) && loggedInUser.email !=='thenftslandofficial@gmail.com'? <Nav.Link href={'/manageslot/'+loggedInUser.email}>Manage Slot</Nav.Link>: ''}

    //     {(loggedInUser.email === 'thenftslandofficial@gmail.com') && <Nav.Link href={'/adminpanel/'}>Manage Slot</Nav.Link>}
    //   {(loggedInUser.email === 'thenftslandofficial@gmail.com') && <Nav.Link href={'/manageuser/'}>All Users</Nav.Link>}
       
        
    // </NavDropdown> 
    
    <Nav.Link href={'/adminpanel/'}>Admin Panel</Nav.Link>
    
    :

     loggedInUser.email !== (undefined||null) && <Nav.Link href={'/manageslot/'+loggedInUser.email}>Manage Slot</Nav.Link>

    }


     

      {loggedInUser.email === (undefined||null) ? 
      <Nav.Link className="nav-link" style={{color: 'black'}} href="/login">Login</Nav.Link> 
      
      :
      
      <NavDropdown title="My Profile" id="collasible-nav-dropdown">
        
        <NavDropdown.Item  href="/logout">Logout</NavDropdown.Item>
       
        
      </NavDropdown> 
      
        
      
      
      }
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
        </>
    );
};

export default Header;
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav'


const NavBar = (props) =>{
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/" >Home</Nav.Link>
            <Nav.Link href="/addmilklog"> Add Milk Log</Nav.Link>
            <Nav.Link href="/milklog" >View Milk Log</Nav.Link>
            </Nav>
            <Nav>
            <Nav.Link href="#logout">Log Out</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;
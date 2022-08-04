import React from 'react'
import { useState } from "react";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
    const [message, setMessage] = useState("show");
return (
	<Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Scrumbledore Resource Management</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {message ? <div>Signed in as: <a href="#login">Sanjo</a></div> : null}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
      <Button variant="secondary">Logout</Button>
    </Navbar>
);
};

export default NavBar;

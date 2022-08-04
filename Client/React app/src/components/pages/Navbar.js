import React from 'react'
import { useState, useContext } from "react";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { AppContext } from '../../AppContext';

const NavBar = () => {
    // const [message, setMessage] = useState("show");
    const msg = useContext(AppContext)
    const {appvalue, setAppvalue} = useContext(AppContext);
return (
	<Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Scrumbledore Resource Management</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {appvalue ? <div>Signed in as: <a href="#login">{JSON.stringify(appvalue,)}</a></div> : null}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
      {appvalue ? (<Button variant="secondary">Logout</Button>):null}
      
    </Navbar>
);
};

export default NavBar;

import React from 'react'
import { useState, useContext, useEffect } from "react";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// import { AppContext } from '../../AppContext';

const NavBar = () => {
    const [username, setUserName] = useState("show");
    // const msg = useContext(AppContext)
    // const {appvalue, setAppvalue} = useContext(AppContext);

    // const [items, setItems] = useState([]);

    useEffect(() => {
      const username = JSON.parse(localStorage.getItem('loggedin_user'));
      // alert(username)
      if (username) {
        setUserName(username);
      }
      else{
        setUserName()
      }
    }, []);

    function logout() {
      // var r = confirm("Press a button!");
      if (window.confirm('Confirming will proceed to logging you of from this session')) {
        localStorage.setItem('loggedin_user', null);
        setUserName(null)
        window.location.href = "/"
      } 
      
          
    }

return (
	<Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Scrumbledore Resource Management</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {username ? <div>Signed in as: <a href="#login">{JSON.stringify(username,)}</a></div> : null}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
      {username ? (<Button variant="secondary" onClick={logout}>Logout</Button>):null}
      
    </Navbar>
);
};

export default NavBar;

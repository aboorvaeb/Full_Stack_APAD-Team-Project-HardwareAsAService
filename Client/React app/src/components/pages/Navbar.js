import React from 'react'
import { useState, useContext, useEffect } from "react";

import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
// import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
// import { AppContext } from '../../AppContext';

const NavBar = () => {
    const [username, setUserName] = useState("");
    const [userprojects, setUserprojects] = useState([]);
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

      const userprojects = JSON.parse(localStorage.getItem('loggedin_user_projects'));
      // alert(username)
      if (userprojects) {
        setUserprojects(userprojects);
      }
      else{
        setUserprojects()
      }

      
    }, []);


    function goToResourceManagement(selected_project) {
      localStorage.setItem('selected_project', JSON.stringify(selected_project));
      window.location.href = "/resourcemanagement"
      
    }


    function logout() {
      // var r = confirm("Press a button!");
      if (window.confirm('Confirming will proceed to logging you of from this session')) {
        localStorage.setItem('loggedin_user', null);
        localStorage.setItem('selected_project', null);
        localStorage.setItem('loggedin_user_projects', null);

        setUserName(null)
        window.location.href = "/"
      } 
      
          
    }

return (
	<Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Scrumbledore Resource Management</Navbar.Brand>
        <Navbar.Toggle />
        {username ? 
                <Form.Select onChange={e => goToResourceManagement(e.target.value)}>
                    <option value="">Select Project</option>
                            {userprojects && userprojects.map(project => (
                            <option> {project} </option>
                        ))}    
                </Form.Select>
                
                :null}
 
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

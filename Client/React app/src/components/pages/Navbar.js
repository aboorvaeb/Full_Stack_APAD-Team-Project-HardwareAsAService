import React from 'react'
import { useState, useContext, useEffect } from "react";

import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
// import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import { useHistory } from 'react-router-dom';
// import { AppContext } from '../../AppContext';

const NavBar = () => {
    let history = useHistory();

    let [username, setUserName] = useState("");
    let [userprojects, setUserprojects] = useState([]);
    // const msg = useContext(AppContext)
    // const {appvalue, setAppvalue} = useContext(AppContext);

    // const [items, setItems] = useState([]);

    useEffect(() => {
      let username = JSON.parse(localStorage.getItem('loggedin_user'));
      // alert(username)
      if (username) {
        setUserName(username);
      }
      else{
        setUserName()
      }

      if (username !== null){
        userprojects = JSON.parse(localStorage.getItem('loggedin_user_projects'));
      }
      else{
        localStorage.setItem('loggedin_user_projects', JSON.stringify([]));
        userprojects = []
      }
      // alert(username)
      if (userprojects) {
        setUserprojects(userprojects);
      }
      else{
        setUserprojects()
      }

      
    }, []);

  //   window.addEventListener('loggedin_user_projects_updated', () => {
  //     if (username !== null){
  //       const userprojects = JSON.parse(localStorage.getItem('loggedin_user_projects'));
  //     }
  //     else{
  //       localStorage.setItem('loggedin_user_projects', JSON.stringify([]));
  //       const userprojects = []
  //     }
  //     // alert(username)
  //     if (userprojects) {
  //       setUserprojects(userprojects);
  //     }
  //     else{
  //       setUserprojects()
  //     }
  // })


    function goToResourceManagement(selected_project) {
      if(selected_project === "Go to all projects/ Join a new project"){
        localStorage.setItem('selected_project', JSON.stringify(null));
        window.location.href = "/selectproject"
      }else{
        localStorage.setItem('selected_project', JSON.stringify(selected_project));
      window.location.href = "/resourcemanagement"
       handleState(selected_project)
      }
      
      
    }


    function logout() {
      // var r = confirm("Press a button!");
      if (window.confirm('Confirming will proceed to logging you of from this session')) {
        localStorage.setItem('loggedin_user', null);
        localStorage.setItem('selected_project', null);
        localStorage.setItem('loggedin_user_projects', JSON.stringify([]));

        setUserName(null)
        window.location.href = "/"
      } 
      
          
    }

    function handleState(projectId) {
      history.push({
          pathname: "/resourcemanagement",
          state: projectId
      })
    }

return (
	<Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Scrumbledore Resource Management</Navbar.Brand>
        <Navbar.Toggle />
        {/* {username ? <div style="color: #ffffff;">Projects Accessible:</div> : null} */}
        {username ? 
                <Form.Select onChange={e => goToResourceManagement(e.target.value)}>
                    <option value="">Project accessible to user:</option>
                            {userprojects && userprojects.map(project => (
                            <option> {project} </option>
                        ))}    
                        <option>Go to all projects/ Join a new project</option>
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

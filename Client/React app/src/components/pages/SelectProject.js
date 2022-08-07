import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import '../../App.css'


export default function HomePage(props) {

    let history = useHistory();

    const [projectsList, setProjectsList] = useState(["hello"]);

    useEffect(() => {
        fetch("https://scrumbledore-server.herokuapp.com/get_allprojects").then(
            res => res.json()
        ).then(
            data => {
                console.log(data)
                setProjectsList(data["projects"])
            }
        )


    }, [] )
    
    const [selectedProject, setSelectedProject] = useState('');


    function callApi() {
        const userprojects = JSON.parse(localStorage.getItem('loggedin_user_projects'));
        
        if (!userprojects.includes(selectedProject)){
            if (window.confirm("You don't have access to this project.\nDo you want to add yourself to the selected project?")) {
                
                const username = JSON.parse(localStorage.getItem('loggedin_user'));
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({"projectid": selectedProject,"username":username})   
                };
            
                fetch('https://scrumbledore-server.herokuapp.com/join_project', requestOptions)
                .then(data => data.json())
                .then(json => {
                    if (json.success){
                        userprojects.push(selectedProject);
                        localStorage.setItem('loggedin_user_projects', JSON.stringify(userprojects));
                        window.dispatchEvent(new Event("loggedin_user_projects_updated"));

                        localStorage.setItem('selected_project', JSON.stringify(selectedProject));
                        window.location.href = "/resourcemanagement"
                        handleState(selectedProject)


                    }
                    else{
                        alert(json.message)
                    }
                } )
            }
        }
        // if (moveToResourceManagementPage){
        //     localStorage.setItem('selected_project', JSON.stringify(selectedProject));
        //     window.location.href = "/resourcemanagement"
        //     handleState(selectedProject)
        
        // }
        
    }

    function handleState(projectId) {
        history.push({
            pathname: "/resourcemanagement",
            state: projectId
        })
    }

    return (
        <div className="text-center m-5-auto">
            
            <h2>All Available Projects</h2>
            <p>Select project or join the project to which you need to manage the resources</p>
            
            <Form>
                <Form.Select className="mb-3" size="lg" onChange={e => setSelectedProject(e.target.value)}>
                    <option value="">Select Project</option>
                            {projectsList.map(project => (
                            <option> {project} </option>
                        ))}    
                </Form.Select>
                <br />
            <Button variant="secondary" onClick={callApi}>
            Proceed
              </Button>
              <footer>
                <p><Link to="/newproject">Create a new project</Link>.</p>
                {/* <p><Link to="/joinproject">Join an exisiting project</Link>.</p> */}
            </footer>
            </Form>
            
            {/* <button onClick={callApi} className="primary-button">Proceed</button>
                
            <footer>
                <p><Link to="/newproject">Create a new project</Link>.</p>
            </footer> */}

        </div>
    )
}

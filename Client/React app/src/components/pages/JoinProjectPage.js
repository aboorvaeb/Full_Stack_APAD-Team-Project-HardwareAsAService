import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import '../../App.css'


export default function JoinProjectPage(props) {

    const [selectedProject, setSelectedProject] = useState('');
    

    const [projectsList, setProjectsList] = useState([{}]);
    let projList = []

    useEffect(() => {
        fetch("https://scrumbledore-server.herokuapp.com/get_allprojects").then(
            res => res.json()
        ).then(
            data => {
                console.log(data)
                projList = data.projects
                alert(JSON.stringify(projList))
            }
        )
    }, [] )
  
    function callApi() {

        
    return (
        <div className="text-center m-5-auto">
            
            <h2>Join Project</h2>
            <h5>Select an exisiting project</h5>
           
            <Form>
                <Form.Select className="mb-3" size="lg" onChange={e => setSelectedProject(e.target.value)}>
                    <option value="">Select Project</option>
                            {projList.map(project => (
                            <option> {project} </option>
                        ))}
                            
                </Form.Select>
                <br />
            <Button variant="secondary" onClick={callApi}>
            Proceed
              </Button>
              <footer>
                <p><Link to="/selectproject">Back to my projects.</Link>.</p>
            </footer>
            </Form>
            
        </div>
    )
}

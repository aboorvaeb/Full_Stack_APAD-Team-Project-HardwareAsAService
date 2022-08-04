import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";


export default function HomePage(props) {

    let history = useHistory();
    const [selectedProject, setSelectedProject] = useState('');
    let projects = []
    const location = useLocation()

    projects = location.state
    console.log(projects)
    
    function callApi() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"projectid": selectedProject})
        };
        
        fetch('/get_project', requestOptions)
            .then(data => data.json())
            .then(json => {
              alert(JSON.stringify(json))
              handleState(json);
            })
        
    }

    function handleState(temp) {
        history.push({
          pathname: "/resourcemanagement",
          state: temp
        });
      }

    
    return (

        //hello {this.props.location.state}
        

        <div className="text-center m-5-auto">
            
            <h2>Select Project</h2>
            <form action="/selectproject">     
                <div>
                 <div>Selected Project: {selectedProject}</div>
                 <select onChange={e => setSelectedProject(e.target.value)}>
                <option value="">Select Project</option>
                        {projects.map(project => (
                        <option> {project} </option>
                    ))}    
                </select>
                </div>
            </form>
            
            <button onClick={callApi} className="primary-button">Proceed</button>
                
            <footer>
                <p><Link to="/newproject">Create a new project</Link>.</p>
                <p><Link to="/joinproject">Join an exisiting project</Link>.</p>
            </footer>

        </div>
    )
}

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
        history.push({
            pathname: "/resourcemanagement",
            state: selectedProject  
          });        
    }

    
    return (

        //hello {this.props.location.state}
        

        <div className="text-center m-5-auto">
            
            <h2>Select Project</h2>
            <form action="/resourcemanagement">
                
                <div>
                 <div>Selected Project: {selectedProject}</div><br></br>
                 <select onChange={e => setSelectedProject(e.target.value)}>
                <option value="">Select Project</option>
                        {projects.map(project => (
                        <option> {project} </option>
                    ))}    
                </select>
                </div>
                {/* <Link to="/resourcemanagement"> */}
                    <button onClick={callApi} className="primary-button">Proceed</button>
                {/* </Link> */}
            </form>
            <footer>
                <p><Link to="/newproject">Create a new project</Link>.</p>
            </footer>

        </div>
    )
}

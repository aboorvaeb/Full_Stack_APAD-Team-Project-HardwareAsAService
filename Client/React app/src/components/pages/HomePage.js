import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function HomePage() {
    return (
        <div className="text-center m-5-auto">
            <h2>Select Project</h2>
            <form action="/selectproject">
                <p>
                    <label>Select the project</label><br/>
                    <DropdownButton id="dropdown-basic-button" title="Project id">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                </p>

                <p>
                    <button id="sub_btn" type="submit">Proceed</button>
                </p>
            </form>
            <footer>
                <p><Link to="/newproject">Create a new project</Link>.</p>
            </footer>
        </div>
    )
}

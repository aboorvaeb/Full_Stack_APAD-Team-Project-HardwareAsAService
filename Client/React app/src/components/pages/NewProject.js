import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import '../../App.css'

export default function SignUpPage() {

    return (
        <div className="text-center m-5-auto">
            <h2>Add a project</h2>
            <form action="/home">
                <p>
                    <label>Set Project ID</label><br/>
                    <input type="text" name="project ID" required />
                </p>
                <p>
                    <label>Set Project Description</label><br/>
                    <input type="text" name="project description" required />
                </p>
                <p>
                    <form action="/selectuser">
                <p>
                    <label>Add User</label><br/>
                    <DropdownButton id="dropdown-basic-button" title="User id">
                    <Dropdown.Item href="#/action-1">User 1</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">User 2</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">User 3</Dropdown.Item>
                    </DropdownButton>
                </p>
            </form>
                </p>
                <p>
                    <span><a href="https://google.com" target="_blank" rel="noopener noreferrer">add a user</a></span>
                </p>
                <p>
                    <button id="sub_btn" type="submit">Proceed</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}
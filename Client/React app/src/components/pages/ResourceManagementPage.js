import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useLocation } from 'react-router-dom';

import '../../App.css'

export default function ResourceManagementPage() {

    let selectedProject = []
    const location = useLocation()
    selectedProject = location.state
    console.log(selectedProject)

    return (
        <p>
            Project:
            <br></br>
            {selectedProject}
        </p>
    )

}
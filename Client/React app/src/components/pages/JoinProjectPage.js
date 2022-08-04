import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";


export default function JoinProjectPage(props) {

    function callApi() {
        return ""
    }
    
    return (

        <div className="text-center m-5-auto">
            
            <h2>Join an exisiting project</h2>
            <form action="/selectproject">     
                <div>
                 <div>Selected Project: </div>
                 
                </div>
            </form>
            
            <button onClick={callApi} className="primary-button">Proceed</button>
                
            <footer>
                <p><Link to="/selectproject">Back to my projects</Link>.</p>
            </footer>

        </div>
    )
}

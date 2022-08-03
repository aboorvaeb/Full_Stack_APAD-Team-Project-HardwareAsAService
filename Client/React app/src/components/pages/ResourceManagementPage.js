import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useLocation } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useHistory } from "react-router-dom";


import '../../App.css'

export default function ResourceManagementPage() {

    
    let selectedProject = []
    const location = useLocation()
    selectedProject = location.state

    let contentArray = []
    contentArray = selectedProject.content

    let requestedUnits = {}

    const[hwSetData, setHWSetData] = useState([{}])
    const [hwsetRequest, setHwSetRequest] = useState([])


    useEffect(() => {
        fetch("/get_hardwareset").then(
            res => res.json()
        ).then(
            data => {
                setHWSetData(data)
            }
        )
    }, [] )


    const [userSelection, setUserSelection] = React.useState(false);
    
    
    function getHWSetDetails(availability) {
        const now = availability;
        return <ProgressBar now={now} label={`${now}%`} />;
    }

    function getUtilized(resourceid) {
        return contentArray.res_utilized[resourceid]

    }

    function handleRequest(recourceid, requestedUnit) {
        const newInput = {
            "recourceid" : recourceid,
            "value" : requestedUnit
        }
        const updatedInput = [...hwsetRequest, newInput]
        setHwSetRequest(updatedInput)   
       }

    
       function handleSubmit(selectedProject, userSelection) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"projectid": selectedProject, "operation": userSelection, 
            "requestvalue" : hwsetRequest})

        };

        console.log(                                                )
     
        fetch('/resource_management', requestOptions)
            .then(data => data.json())
            .then(json => {
              console.log(json)
            })
        }
   


    return (

        <div className="text-center m-5-auto">
        <h2>Project: {contentArray.projectid}</h2>
          <div>
            <form>
            {hwSetData.map(({ resourceid, capacity, availability }) => (       
            <div className="text-center m-5-auto"> 
            <p key={resourceid}> 
            <div>
            {resourceid}{getHWSetDetails(availability)}
            <p> Available: {availability} / {capacity} </p>
            <p>
            <div>
            <label>Utilized</label><br/>
            <input type="text" name="request" value={getUtilized(resourceid)} />
            </div>
            </p>
            <p>
            <label>Request</label><br/>
            <input type="text" name="request"  onChange={(e) => handleRequest(resourceid, e.target.value)} required />
            {/* <input type="text" name="request" onChange={(e) => setCars(prevState => [...prevState,  e.target.value])} required /> */}
            </p>
            </div>
            </p>
            </div>
            ))}
            </form>

            <p>
            <div onChange={(e) => setUserSelection(e.target.value)}>
            <input type="radio" value="check-in" name="checkin"  style={{ width: 'auto' }}/> Check-in
            <br/>
            <input type="radio" value="check-out" name="checkout"  style={{ width: 'auto' }}/> Check-out
            </div>
            <br/>
            </p> 
        
        </div>

        <p>
            <button onClick = {handleSubmit(contentArray.projectid, userSelection, requestedUnits)}> Submit </button>
        {/* <button onClick={handleSubmit(contentArray.projectid, userSelection, requestedUnits)} className="primary-button">Proceed</button> */}
        </p>
        <footer>
            <p><Link to="/">Back to Homepage</Link>.</p>
        </footer>
        </div>
    
   
    )

}
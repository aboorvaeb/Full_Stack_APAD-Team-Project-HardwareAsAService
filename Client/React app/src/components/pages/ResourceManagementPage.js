import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useLocation } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useHistory } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


import '../../App.css'

export default function ResourceManagementPage() {
    
    let selectedProject = []
    const location = useLocation()
    selectedProject = location.state

    let contentArrayInitial = []
    contentArrayInitial = selectedProject.content
    let project_id = contentArrayInitial.projectid
    let contentArrayLatest = []

    const [response, setResponse] = useState();
    const [responseTest, setResponseTest] = useState();

    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"projectid": project_id})
        
    };

    // get_project call
    fetch('/get_project?'.concat(project_id), requestOptions)
    .then(data => data.json())
    .then(json => {
        setResponse(JSON.stringify(json))
        console.log(response)
        localStorage.setItem('getProjectResponse', response);
    })
 
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

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"projectid": project_id})
            
        };
        // get_project call
        fetch('/get_project', requestOptions)
        .then(data => data.json())
        .then(json => {
            setResponseTest(JSON.stringify(json))
            console.log(responseTest)
            //localStorage.setItem('getProjectResponse', response);
        })

        try {
            return responseTest.content.res_utilized[resourceid]
        } catch(exception) {
            return contentArrayInitial.res_utilized[resourceid]
        }
    }
    

    // console.log(response) 
    // if(response) {
    //     console.log(response)
    //     return ""//response.content.res_utilized[resourceid]
    // } else {
    //     return  ""
    // }
    

    function handleRequest(resourceid, requestedUnit) {
        const newInput = {
            "resourceid" : resourceid,
            "value" : parseInt(requestedUnit)
        }
        const updatedInput = [...hwsetRequest, newInput]
        setHwSetRequest(updatedInput)   
       }

    
    function handleSubmit(selectedProject, userSelection) {
        alert(userSelection)
        console.log("check")
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"projectid": selectedProject, "operation": userSelection, 
            "requestvalue" : hwsetRequest})

        };
        console.log(JSON.stringify({"projectid": selectedProject, "operation": userSelection, 
        "requestvalue" : hwsetRequest})                                         )
     
        fetch('/resource_management', requestOptions)
            .then(data => data.json())
            .then(json => {
                console.log(json)
                //alert(json)
                handlePostRequest(json)
            })
        
       
    }

    function handlePostRequest(jsonResponse) {
        if(jsonResponse.message == "Successfully updated") {
            alert(jsonResponse.message)
           // document.getElementById("util").value  = response.content.res_utilized["HW1"]
            window.location.reload()
            
            // update utilized
        }
        else {
            alert(jsonResponse.message)
            window.location.reload()

        } 
    }

    function fetchProjectDetails(project_id) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"projectid": project_id})
            
        };
        fetch('/get_project', requestOptions)
        .then(data => data.json())
        .then(json => {
            setResponse(JSON.stringify(json))
            contentArrayLatest = JSON.stringify(json)
            console.log(contentArrayLatest)
    })

    }
   

    return (

        <div className="text-center m-5-auto">
        <h2>Project: {project_id}</h2>
          <div>
          <Form>
            {hwSetData.map(({ resourceid, capacity, availability }) => (       
            <div className="text-center m-5-auto"> 
            <p key={resourceid}> 
            <div>
            {resourceid}{getHWSetDetails(availability)}
            <p> Available: {availability} / {capacity} </p>
            <p>
            <div>
            <label>Utilized</label><br/>
            <input type="text" id = "util" name="request" value={getUtilized(resourceid)} />
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
            </Form>

            <p>
            {/* <div onChange={(e) => setUserSelection(e.target.value)}>
            <input type="radio" value="check-in" name="checkin"  style={{ width: 'auto' }}/> Check-in
            <br/>
            <input type="radio" value="check-out" name="checkout"  style={{ width: 'auto' }}/> Check-out
            </div> */}
            <br/>
            <Button  value="check-in" onClick = { (e) => handleSubmit(project_id, e.target.value)}> Check-in  </Button>
            <span></span> <span></span>
            <Button value="check-out" onClick = { (e) => handleSubmit(project_id, e.target.value)}> Check-out  </Button>

            {/* mistake: () => or else binded upon refresh/loading */}
            </p>  
        
        </div>

        <p>
            
        {/* <button onClick={handleSubmit(contentArray.projectid, userSelection, requestedUnits)} className="primary-button">Proceed</button> */}
        </p>
        <footer>
            <p><Link to="/">Back to Homepage</Link>.</p>
        </footer>
        </div>
    
   
    )

}
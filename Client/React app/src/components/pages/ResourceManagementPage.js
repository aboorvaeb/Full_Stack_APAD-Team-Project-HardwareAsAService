// Resource management page that takes care of the check-in check-out process
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

    const [project_id, setProject_id] = useState(selectedProject);
    
    const [hwSetData1_dup, setHWSetData1_dup] = useState()
    const [hwSetData2_dup, setHWSetData2_dup] = useState()

    const [hwSetData1Cap_dup, setHWSetData1Cap] = useState()
    const [hwSetData2Cap_dup, setHWSetData2Cap] = useState()
    const [hwSetData, setHWSetData] = useState()

    const [hwSetRequest1, setHWSetRequest1] = useState()
    const [hwSetRequest2, setHWSetRequest2] = useState()
   
    let hwSetData1 = []
    let hwSetData2 = []
    let hwSetDataAvailabilty_1 = []
    let hwSetDataAvailabilty_2 = []

    let hwSetDataCapacity_1 = []
    let hwSetDataCapacity_2 = []

    let contentArrayHW1 = []
    let contentArrayHW2 = []

    const [HWSet1Util, setHWSet1Util] = useState()
    const [HWSet2Util, setHWSet2Util] = useState()

    const [hwset_1_RequestFinal, setHwSetRequestFinal_1] = useState([])
    const [hwset_2_RequestFinal, setHwSetRequestFinal_2] = useState([])

    let testHWSet1Request = []
    let testHWSet2Request = []

    // set the project id value from local storage
    useEffect(() => {
        const project_id = JSON.parse(localStorage.getItem('selected_project'));
        // alert(username)
        if (project_id) {
            setProject_id(project_id);
        }
        else{
            setProject_id()
        }


        // call the get_hw set api to populate the capacity, availability values
        fetch("https://scrumbledore-server.herokuapp.com/get_hardwareset").then(
            res => res.json()
        ).then(
            data => {
                console.log(project_id)
                setHWSetData(data)
                hwSetData1 = data[0]
                hwSetData2 = data[1]
                hwSetDataAvailabilty_1 = hwSetData1.availability
                hwSetDataAvailabilty_2 = hwSetData2.availability
                hwSetDataCapacity_1 = hwSetData1.capacity
                hwSetDataCapacity_2 = hwSetData2.capacity
                setHWSetData1_dup(hwSetDataAvailabilty_1)
                console.log(hwSetData1_dup)
                setHWSetData2_dup(hwSetDataAvailabilty_2)
                console.log(hwSetData2_dup)
                setHWSetData1Cap(hwSetDataCapacity_1)
                setHWSetData2Cap(hwSetDataCapacity_2)
            }
        )
    }, [] )

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"projectid": project_id})   
    };


    // call the get_project api to poulate utilized resources value
    fetch('https://scrumbledore-server.herokuapp.com/get_project', requestOptions)
    .then(data => data.json())
    .then(json => {
        console.log(json)
        contentArrayHW1 = json.content.res_utilized["HW1"]
        contentArrayHW2 = json.content.res_utilized["HW2"]
        setHWSet1Util(contentArrayHW1)
        console.log(HWSet1Util)
        console.log(HWSet2Util)
        setHWSet2Util(contentArrayHW2)
    } )

    function getHWSetDetails(availability) {
        const now = availability;
        return <ProgressBar variant="secondary" now={now} label={`${now}`} />;
    }


    function getAvailability(availability, capacity) {
       return <p>Available: {availability} / {capacity} </p>
    }

   
    function handleRequestHWSet1(resourceid, requestedUnit) {
        setHWSetRequest1(requestedUnit)
     }


     function handleRequestHWSet2(resourceid, requestedUnit) {
        setHWSetRequest2(requestedUnit)
     }

    // on submit build the request body and send it to resource_management
    function handleSubmitHardwareSet1(selectedProject, userSelection) {
        const newInput = {
            "resourceid" : "HW1",
            "value" : parseInt(hwSetRequest1)
        }
        const updatedInput = [...hwset_1_RequestFinal, newInput]
        setHwSetRequestFinal_1(updatedInput)  
        testHWSet1Request = updatedInput
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"projectid": selectedProject, "operation": userSelection, 
            "requestvalue" : testHWSet1Request})

        };
        
        fetch('https://scrumbledore-server.herokuapp.com/resource_management', requestOptions)
            .then(data => data.json())
            .then(json => {
                if(json.message === "Successfully updated") {
                    alert(json.message)
                } else{
                    alert(json.message)
                }
                window.location.reload()
            })
    }

    function handleSubmitHardwareSet2(selectedProject, userSelection) {
        const newInput = {
            "resourceid" : "HW2",
            "value" : parseInt(hwSetRequest2)
        }
        const updatedInput = [...hwset_2_RequestFinal, newInput]
        setHwSetRequestFinal_2(updatedInput) 
        testHWSet2Request = updatedInput

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"projectid": selectedProject, "operation": userSelection, 
            "requestvalue" : testHWSet2Request})

        };
        console.log(JSON.stringify({"projectid": selectedProject, "operation": userSelection, 
        "requestvalue" : testHWSet2Request}))

        fetch('https://scrumbledore-server.herokuapp.com/resource_management', requestOptions)
            .then(data => data.json())
            .then(json => {
                if(json.message === "Successfully updated") {
                    alert(json.message)
                } else{
                    alert(json.message)
                }
                window.location.reload()
            })
    }


    return (
        <div className="text-center m-5-auto">
          <h2> Resource Management - Project: {project_id}</h2>
 
            <div>
        <Form>
        <Form.Group className="mb-3" controlId="HWSet1">
        <p> HWSet 1 </p>
        {getHWSetDetails(hwSetData1_dup)}
        <p> {getAvailability(hwSetData1_dup, hwSetData1Cap_dup)} </p>
        <Form.Label> Utilized by {project_id}: </Form.Label>
        <input disabled="true" type="text" value= {HWSet1Util} />
        <Form.Label> Request </Form.Label>
        <input type = "text" onChange={(e) => handleRequestHWSet1("HW1", e.target.value)} />
        <br/>
        <br/>
        </Form.Group>
        <Button  variant="secondary" value="check-in" onClick = { (e) => handleSubmitHardwareSet1(project_id, e.target.value)}> Check-in  </Button>
            <span></span> <span></span>
        <Button variant="secondary" value="check-out" onClick = { (e) => handleSubmitHardwareSet1(project_id, e.target.value)}> Check-out  </Button>
        </Form>
        </div>
       
       <Form>
       <Form.Group className="mb-3" controlId="HWSet1">
       <p> HWSet 2 </p>
        <p>{hwSetDataAvailabilty_2}</p>
        {getHWSetDetails(hwSetData2_dup)}
        <p> {getAvailability(hwSetData2_dup, hwSetData2Cap_dup)} </p>
        <Form.Label> Utilized by {project_id}:  </Form.Label>
        <input disabled="true" type="text" value= {HWSet2Util} />
        <Form.Label>Request </Form.Label>
        <input type = "text" onChange={(e) => handleRequestHWSet2("HW2", e.target.value)} />
        <br/>
        <br/>
        </Form.Group>
        <Button variant="secondary"  value="check-in" onClick = { (e) => handleSubmitHardwareSet2(project_id, e.target.value)}> Check-in  </Button>
            <span></span> <span></span>
        <Button variant="secondary" value="check-out" onClick = { (e) => handleSubmitHardwareSet2(project_id, e.target.value)}> Check-out  </Button>
       </Form>
       <br/>
          </div>
        
    )

   
}
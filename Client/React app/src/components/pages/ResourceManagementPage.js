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
    
    const [hwSetData1_dup, setHWSetData1_dup] = useState()
    const [hwSetData2_dup, setHWSetData2_dup] = useState()

    const [hwSetData1Cap_dup, setHWSetData1Cap] = useState()
    const [hwSetData2Cap_dup, setHWSetData2Cap] = useState()
    const [hwSetData, setHWSetData] = useState()
   
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

    const [hwsetRequest, setHwSetRequest] = useState([])



    let test_dup = []


    useEffect(() => {
        fetch("/get_hardwareset").then(
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

    fetch('/get_project', requestOptions)
    .then(data => data.json())
    .then(json => {
        console.log(json)
        contentArrayHW1 = json.content.res_utilized["HW1"]
        contentArrayHW2 = json.content.res_utilized["HW2"]
        setHWSet1Util(contentArrayHW1)
        setHWSet2Util(contentArrayHW2)
    } )

    function getHWSetDetails(availability) {
        const now = availability;
        return <ProgressBar variant="secondary" now={now} label={`${now}%`} />;
    }


    function getAvailability(availability, capacity) {
       return <p>Available: {availability} / {capacity} </p>
    }

   
    function handleRequest(resourceid, requestedUnit) {
        const newInput = {
            "resourceid" : resourceid,
            "value" : parseInt(requestedUnit)
        }
        const updatedInput = [...hwsetRequest, newInput]
        setHwSetRequest(updatedInput)   
     }

    function handleSubmitHardwareSet1(selectedProject, userSelection) {
        //alert(userSelection)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"projectid": selectedProject, "operation": userSelection, 
            "requestvalue" : hwsetRequest})

        };
        //console.log(requestOptions)
        // console.log(JSON.stringify({"projectid": selectedProject, "operation": userSelection, 
        // "requestvalue" : hwsetRequest}))

        fetch('/resource_management', requestOptions)
            .then(data => data.json())
            .then(json => {
                alert("Hi")
                if(json.message === "Successfully updated") {
                    alert(json.message)
                } else{
                    alert(json.message)
                }
                alert("End")    
                window.location.reload()
            })
    }

    function handleSubmitHardwareSet2(selectedProject, userSelection) {
        alert(userSelection)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"projectid": selectedProject, "operation": userSelection, 
            "requestvalue" : hwsetRequest})

        };
        console.log(requestOptions)
        console.log(JSON.stringify({"projectid": selectedProject, "operation": userSelection, 
        "requestvalue" : hwsetRequest}))

        fetch('/resource_management', requestOptions)
            .then(data => data.json())
            .then(json => {
                alert("Hi")
                if(json.message === "Successfully updated") {
                    alert(json.message)
                }
                alert("End")    
                window.location.reload()
            })
    }


    return (
        <div className="text-center m-5-auto">
          <h2> Resource Management</h2>
 
            <div>
        <Form>
        <Form.Group className="mb-3" controlId="HWSet1">
        <p> HWSet 1 </p>
        {getHWSetDetails(hwSetData1_dup)}
        <p> {getAvailability(hwSetData1_dup, hwSetData1Cap_dup)} </p>
        <Form.Label> Utilized </Form.Label>
        <input type="text" value= {HWSet1Util} />
        <Form.Label> Request </Form.Label>
        <input type = "text" onChange={(e) => handleRequest("HW1", e.target.value)} />
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
        <Form.Label> Utilized </Form.Label>
        <input type="text" value= {HWSet2Util} />
        <Form.Label>Request </Form.Label>
        <input type = "text" onChange={(e) => handleRequest("HW2", e.target.value)} />
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
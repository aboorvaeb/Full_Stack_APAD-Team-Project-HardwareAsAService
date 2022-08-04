import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useLocation } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';


import '../../App.css'

export default function ResourceManagementPage() {

    let checkin = []
    let checkout = []
   
    const [checkedOne, setCheckedOne] = React.useState(false);
    const [checkedTwo, setCheckedTwo] = React.useState(false);


    const handleChangeOne = () => {
        setCheckedOne(!checkedOne);
      };
    
    const handleChangeTwo = () => {
        setCheckedTwo(!checkedTwo);
      };
    
    

    function WithLabelExample() {
        const now = 60;
        return <ProgressBar now={now} label={`${now}%`} />;
    }


    function handleSubmit() {
        
        if(checkedOne == true) { 
            checkin = "check-in" 
            alert(checkin)
        }
        else if (checkedTwo == true) {
            checkout = "check-out"
            alert(checkout)
        }
    }

    let selectedProject = []
    const location = useLocation()
    selectedProject = location.state
    console.log(selectedProject)

    return (
        <div className="text-center m-5-auto">
        <h2>Project: {selectedProject}</h2>
        <form action="/selectproject">
            <div> 
            HWSet1 {WithLabelExample()}
                <p>
                    <label>Request</label><br/>
                    <input type="text" name="request" required />
                </p>
                    <label>Utilized</label><br/>
                    <input type="text" name="request" required />
            </div>

            <div> 
            HWSet2 {WithLabelExample()}
                <p>
                    <label>Request</label><br/>
                    <input type="text" name="request" required />
                </p>
                    <label>Utilized</label><br/>
                    <input type="text" name="request" required />
            </div>

        <br></br>
           
           <div>
            <label>
                <input
                    class = "messageCheckBox"
                    value = "checkin"
                    type = "checkbox"
                    checked = {checkedOne}
                    onChange = {handleChangeOne}/>
                    Check-in
            </label>
            <label>
                <input
                    class = "messageCheckBox"
                    value="checkout"
                    type = "checkbox"
                    checked = {checkedTwo}
                    onChange = {handleChangeTwo}/>Check-out    
            </label>
           
           </div>

            <p>
                <span><a href="https://google.com" target="_blank" rel="noopener noreferrer">add a user</a></span>
            </p>
            <p>
                <button id="sub_btn" onClick ={handleSubmit} type="submit">Proceed</button>
            </p>
        </form>
        <footer>
            <p><Link to="/">Back to Homepage</Link>.</p>
        </footer>
    </div>
        
    )

}
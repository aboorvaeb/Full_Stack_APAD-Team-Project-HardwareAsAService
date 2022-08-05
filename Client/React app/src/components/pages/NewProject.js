import React, { useState,useEffect } from 'react'
import { Component } from "react"
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { components } from "react-select";
import { default as ReactSelect } from "react-select";


import '../../App.css'


export default function SignUpPage({ userInput, onFormChange }) {

    const [projectid, setProjectid] = useState('');
    const [projectdesc, setProjectdesc] = useState('');
    const [selectedusers, setSelectedUsers] = useState('');
    const [allusers, setAllUsers] = useState('');
    const [selectedOptions, setSelectedOptions] = useState();
    const [username1, setUserName1] = useState('');
    const[data, setData] = useState([{}])
    let users = []

    useEffect(() => {
        const username1 = JSON.parse(localStorage.getItem('loggedin_user'));
        if (username1) {
            setUserName1(username1);
        }
          else{
            setUserName1()
        }
        console.log(username1)
        fetch("/get_users").then(
            res => res.json()
        ).then(
            data => {
                setAllUsers(data)
            }
        )
        }, [] )

    
    let allusersarray = []
    let optionList1 = []
    allusersarray = allusers["username"]
    console.log(allusersarray)
    if(allusers){
        let x = allusersarray.length
        for (let i = 0; i < x; i++) {
        if(allusers){
            console.log(allusersarray[i])
            optionList1.push({"value": allusersarray[i], "label":allusersarray[i]});
        }
        
      }
    }

    console.log(optionList1)


    const Option = (props) => {
        return (
          <div>
            <components.Option {...props}>
              <input
                type="checkbox"
                checked={props.isSelected}
                onChange={() => null}
              />{" "}
              <label>{props.label}</label>
            </components.Option>
          </div>
        );
      };
         
    function callApi() {
        // Simple POST request with a JSON body using fetch

        console.log(selectedOptions)
        let z  = []
        z.push(username1)

        for (let i = 0; i < selectedOptions.length; i++) {
            z.push(selectedOptions[i].label);
          }

        console.log(z)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"projectid": projectid,"projectdesc": projectdesc,"users": z})
        };
        fetch('/add_project', requestOptions)
            .then(data => data.json())
            .then(json => {
              //alert(JSON.stringify(json)))
              if(json.success === true)  {window.location.href = "/resourcemanagement"}
              else alert(JSON.stringify(json))
            })

        setProjectid("")
        setProjectdesc("")
            
      }
    
      const handleChange = (selected) => {
        this.setState({
          optionSelected: [selectedusers]
        });
      };
    
    function handleSelect(data) {
        setSelectedOptions(data);
      }

    // const optionList = [
    //     { value: optionList1[0], label: optionList1[0] },
    //     { value: optionList1[1], label: optionList1[1] },
    //     { value: optionList1[2], label: optionList1[2] },
    //     { value: optionList1[3], label: optionList1[3] },
    //     { value: optionList1[4], label: optionList1[4] }
    //   ];
        
      console.log(selectedOptions)

    return (
        <div className="text-center m-5-auto">
            <h2>Add a project</h2>
            <form action="/selectproject">
                <p>
                    <label>Set Project ID</label><br/>
                    <input type="text" name="projectid"  id="projectid" value={projectid} onChange={(e) => setProjectid(e.target.value)} required/>
                </p>
                <p>
                    <label>Set Project Description</label><br/>
                    <input type="text" name="projectdesc"  id="projectdesc" value={projectdesc} onChange={(e) => setProjectdesc(e.target.value)} required/>
                </p>
                <p>
                <form action="/selectuser">          
                <div>
                    <div>Add User {selectedusers} </div>
                    {/* <select onChange={e => setSelectedUsers(e.target.value)}>
                    <option value="">Select Users</option>
                        {allusersarray && <Child allusersarray={allusersarray}/>}    
                    </select> */}
                    {/* <select onChange={e => setSelectedUsers(e.target.value)}>
                    <option value="">Select Users</option>
                        {allusersarray.map((user) => 
                        <option key={user}> {user} </option>
                    )}    
                    </select> */}
                    {/* <select onChange={e => setAllUsers(e.target.value)}>
                        <option value="">Select Users</option>
                        {allusers && allusers['username'].map(allusers => (
                        <option> {allusers} </option>
                        ))}  </select> 
                        pasting the multi-select code below */}
                    
                    <ReactSelect
                        // options={allusers && allusers['username'].map(allusers => (
                        //     <option> {allusers} </option>
                        //     ))}
                        options={optionList1}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        isSearchable={true}
                        components={{
                            Option
                        }}
                        onChange={handleSelect}
                        allowSelectAll={true}
                        value={selectedOptions}
                        
                        />

                    

                </div>
                </form>
                </p>
                <p>
                    <span><a href="https://google.com" target="_blank" rel="noopener noreferrer">add a user</a></span>
                </p>
                <p>
                    <button id="sub_btn" type="submit" onClick={callApi}> Proceed </button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}
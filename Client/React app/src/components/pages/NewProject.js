// import React from 'react'
// import { Link } from 'react-router-dom'
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';

// import '../../App.css'

// export default function SignUpPage() {
    

//     return (
//         <div className="text-center m-5-auto">
//             <h2>Add a project</h2>
//             <form action="/selectproject">
//                 <p>
//                     <label>Set Project ID</label><br/>
//                     <input type="text" name="project ID" required />
//                 </p>
//                 <p>
//                     <label>Set Project Description</label><br/>
//                     <input type="text" name="project description" required />
//                 </p>
//                 <p>
//                     <form action="/selectuser">
//                 <p>
//                     <label>Add User</label><br/>
//                     <DropdownButton id="dropdown-basic-button" title="User id">
//                     <Dropdown.Item href="#/action-1">User 1</Dropdown.Item>
//                     <Dropdown.Item href="#/action-2">User 2</Dropdown.Item>
//                     <Dropdown.Item href="#/action-3">User 3</Dropdown.Item>
//                     </DropdownButton>
//                 </p>
//             </form>
//                 </p>
//                 <p>
//                     <span><a href="https://google.com" target="_blank" rel="noopener noreferrer">add a user</a></span>
//                 </p>
//                 <p>
//                     <button id="sub_btn" type="submit">Proceed</button>
//                 </p>
//             </form>
//             <footer>
//                 <p><Link to="/">Back to Homepage</Link>.</p>
//             </footer>
//         </div>
//     )

// }

//*********************** CODING STARTED ***********************//

// import React, { useState,useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';

// import '../../App.css'

// export default function SignUpPage({ userInput, onFormChange }) {

//     const [projectid, setProjectid] = useState('');
//     const [projectdesc, setProjectdesc] = useState('');
//     const [selectedusers, setSelectedUsers] = useState('');
//     const [allusers, setAllUsers] = useState('');
//     const[data, setData] = useState([{}])
//     let users = []

//     useEffect(() => {
//         fetch("/get_users").then(
//             res => res.json()
//         ).then(
//             data => {
//                 setAllUsers(data)
//             }
//         )
//         }, [] )

//     let allusersarray = []
//     allusersarray = allusers["username"]
//     //allusersarray = ['sd','sds','sdsd']
//     if(typeof allusersarray !== 'undefined'){
//         console.log(allusersarray[0])
//         let optionItems = allusersarray.map((allusersarray, index) => 
//         <option key={index}> {allusersarray} </option>);
//     }
    

//     // let optionItems = allusersarray.map((allusersarray, index) => 
//     // <option key={index}> {allusersarray} </option>
//     // );   
    

//     function callApi() {
//         // Simple POST request with a JSON body using fetch
//         //console.log({allusersarray})

//         const requestOptions = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({"projectid": projectid,"projectdesc": projectdesc,"users": [selectedusers]})
//         };
//         fetch('/add_project', requestOptions)
//             .then(data => data.json())
//             .then(json => {
//               //alert(JSON.stringify(json)))
//               if(json.success === "false")  {window.location.href = "/get_hardwareset"}
//               else alert(JSON.stringify(allusers["username"]))
//             })

//         setProjectid("")
//         setProjectdesc("")
            
//       }
    

//     return (
//         <div className="text-center m-5-auto">
//             <h2>Add a project</h2>
//             <form action="/selectproject">
//                 <p>
//                     <label>Set Project ID</label><br/>
//                     <input type="text" name="projectid"  id="projectid" value={projectid} onChange={(e) => setProjectid(e.target.value)} required/>
//                 </p>
//                 <p>
//                     <label>Set Project Description</label><br/>
//                     <input type="text" name="projectdesc"  id="projectdesc" value={projectdesc} onChange={(e) => setProjectdesc(e.target.value)} required/>
//                 </p>
//                 <p>
//                 <form action="/selectuser">          
//                 <div>
//                     <div>Add User {selectedusers} </div>
//                     {/* <select onChange={e => setSelectedUsers(e.target.value)}>
//                     <option value="">Select Users</option>
//                         {optionItems}    
//                     </select> */}
//                     {/* <select onChange={e => setSelectedUsers(e.target.value)}>
//                     <option value="">Select Users</option>
//                         {allusersarray.map((user) => 
//                         <option key={user}> {user} </option>
//                     )}    
//                     </select> */}
//                 </div>
//                 </form>
//                 </p>
//                 <p>
//                     <span><a href="https://google.com" target="_blank" rel="noopener noreferrer">add a user</a></span>
//                 </p>
//                 <p>
//                     <button id="sub_btn" type="submit" onClick={callApi}> Proceed </button>
//                 </p>
//             </form>
//             <footer>
//                 <p><Link to="/">Back to Homepage</Link>.</p>
//             </footer>
//         </div>
//     )

// }


//*********************** CODING UPDATED 1.0 ***********************//

import React, { useState,useEffect } from 'react'
import { Component } from "react"
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { components } from "react-select";
import { default as ReactSelect } from "react-select";


import '../../App.css'


// function Child({items}) {
//     // Problem:
//     // This will error if `items` is null/undefined
//     console.log({items})
//     items = ['a','b','c']
//     return (
//       <>
//         {/* {items.map(item => (
//           <li key={item.id}>{item.name}</li>
//         ))} */}
//         items.map((item) => 
//         <option key={items}> {items[0]} </option>)
//         items.map((item) => 
//         <option key={items}> {items[1]} </option>)
//         items.map((item) => 
//         <option key={items}> {items[2]} </option>)
//       </>
//     );
//   }



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
        //     console.log(allusersarray[i])
        // optionList1.append(allusersarray[i]);
      }
    }


    // for (let i = 0; i < x; i++) {
    //     if(allusers){
    //         console.log(allusersarray[i])
    //         optionList1.push(allusersarray[i]);
    //     }
    //     //     console.log(allusersarray[i])
    //     // optionList1.append(allusersarray[i]);
    //   }
    
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
         
    //allusersarray = ['sd','sds','sdsd']
    // if(typeof allusersarray !== 'undefined'){
    //     console.log(allusersarray)
    //     let optionItems = allusersarray.map((allusersarray, index) => 
    //     <option key={index}> {allusersarray} </option>);
    // }
    

    // let optionItems = allusersarray.map((allusersarray, index) => 
    // <option key={index}> {allusersarray} </option>
    // );   
    

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
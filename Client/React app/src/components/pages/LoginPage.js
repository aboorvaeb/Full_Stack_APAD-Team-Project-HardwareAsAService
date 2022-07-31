import React, { useEffect, useState }from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import '../../App.css'


export default function SignInPage() {

    const [username, setUserName] = useState('');
    const [pwd, setPwd] = useState('');
    const [response, setShowResponse] = useState(false);

    function callApi() {
      let path = "/newproject"; 
      
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"username": username,"pwd": pwd})
        };
        fetch('/verify_user', requestOptions)
            .then(data => data.json())
            .then(json => {
              //alert(JSON.stringify(json)))
              if(json.message === "success")  {window.location.href = "/home"}
              else alert(JSON.stringify(json))
            })
          
        setUserName("")
        setPwd("")
            
      }
      
    
    
    return (
        <div className="App">
            <form onClick="return formResponse();">
                <p>
                <label> Input </label>
                <br></br>
                <input type="text" id="username" value={username}  onChange={(e) => setUserName(e.target.value)}/>
                </p>
                <label> Password </label>
                <br></br>
                <input type="password" id="pwd" value={pwd} onChange={(e) => setPwd(e.target.value)} />
            </form>

            <div>
              <p>
            <button onClick={callApi}>SUBMIT</button>
              </p>
            </div>
        </div>
      );
   
}
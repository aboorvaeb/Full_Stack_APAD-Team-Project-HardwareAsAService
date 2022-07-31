import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'

export default function SignUpPage({ userInput, onFormChange }) {

    const [username, setUserName] = useState('');
    const [pwd, setPwd] = useState('');

    function callApi() {
        // Simple POST request with a JSON body using fetch
        console.log("Hi")
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"username": username,"pwd": pwd})
        };
        fetch('/add_user', requestOptions)
            .then(data => data.json())
            .then(json => {
              //alert(JSON.stringify(json)))
              if(json.message === "success")  {window.location.href = "/selectproject"}
              else alert(JSON.stringify(json))  
            })
          
        setUserName("")
        setPwd("")
            
      }


    return (
        <div className="text-center m-5-auto">
            <h2>User Registration</h2>
            <h5>Create your account</h5>
            <form action="/selectproject" className='registration'>
                <p>
                    <label>Set Username</label><br/>
                    <input type="text" name="username"  id="username"  value={username} onChange={(e) => setUserName(e.target.value)} required/>
                </p>
                {/* <p>
                    <label>Set Email address</label><br/>
                    <input type="email" name="email" required />
                </p> */}
                <p>
                    <label>Set Password</label><br/>
                    <input type="password" name="pwd" id="pwd" value={pwd} onChange={(e) => setPwd(e.target.value)} required />
                </p>
                <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p>
                {/* <p>
                    <button id="sub_btn" type="submit">Register</button>
                </p> */}
            </form>
            <div>
              <p>
            <button onClick={callApi}>SUBMIT</button>
              </p>
            </div>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}


//https://scrumbledore-server.herokuapp.com
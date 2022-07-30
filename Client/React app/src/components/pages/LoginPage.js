import React, { useEffect, useState }from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'

export default function SignInPage() {

    const [username, setUserName] = useState('');
    const [pwd, setPwd] = useState('');
    const [response, setResponse] = useState('');
    const [showresponse, setShowResponse] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        console.log("inside handle Submit")
        fetch('/verify_user', {
            method: ['POST'],
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({"username": username, "password": pwd })
          })    
            .then(response => response.json())
            .then(data => setResponse(data.data_from_backend))
            console.log(response)
            setShowResponse(true);
      }

    return (
        <div className="text-center m-5-auto">
            <h2>User Login</h2>
            <form action="/home" className="login">
                <p>
                    <label>Username </label><br/>
                    <input name="username" value={username} 
                    onChange={(e) => setUserName(e.target.value)} />
                </p>
                <p>
                    <label>Password</label>
                    <Link to="/forget-password"><label className="right-label">Forgot password?</label></Link>
                    <br/>
                    <input name="password" value={pwd} 
                    onChange={(e) => setPwd(e.target.value)} />
                </p>
                <p>
                <button onClick={handleSubmit} type="submit">
                    Submit
                </button>
                </p>
            </form>
            {showresponse === true && 
                <p>Hii {username}, Respnse: {response}</p>}
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}

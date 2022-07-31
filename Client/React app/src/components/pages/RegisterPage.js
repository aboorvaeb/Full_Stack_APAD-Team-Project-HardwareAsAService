import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'

export default function SignUpPage({ userInput, onFormChange }) {

    const [signupForm, setSignUpForm] = useState({
        user_name: "",
        pwd: ""
    })

    const handleChange = (event) =>  {
        onFormChange(event.target.value)
    }

    return (
        <div className="text-center m-5-auto">
            <h2>User Registration</h2>
            <h5>Create your account</h5>
            <form action="/home" className='registration'>
                <p>
                    <label>Set Username</label><br/>
                    <input onChange={handleChange} type="text" name="user_name" required/>
                </p>
                <p>
                    <label>Set Email address</label><br/>
                    <input type="email" name="email" required />
                </p>
                <p>
                    <label>Set Password</label><br/>
                    <input type="password" name="password" requiredc />
                </p>
                <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p>
                <p>
                    <button id="sub_btn" type="submit">Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}
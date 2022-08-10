import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import validator from 'validator'
 
 
import '../../App.css'
 
export default function SignUpPage({ userInput, onFormChange }) {
 
   const [username, setUserName] = useState('');
   const [pwd, setPwd] = useState('');
 
   const [errorMessage, setErrorMessage] = useState('')
   const validate = (value) => {
 
     console.log("Hi")
   if (validator.isStrongPassword(value, {
     minLength: 8, minLowercase: 1,
     minUppercase: 1, minNumbers: 1, minSymbols: 1
   })) {
    setPwd(value)
     setErrorMessage('Is Strong Password, You can proceed')
   } else {
     setPwd(value)
     setErrorMessage('Is Not Strong Password' + '\n' +
     'Password must contain the following:' + '\n' +
     'A lowercase letter' + '\n' +
     'A capital uppercase letter' + '\n' +
     'A number' + '\n' +
     'Minimum 8 characters')
   }
  
   }
 
 
   function callApi() {
       // Simple POST request with a JSON body using fetch
       console.log("Hi")
       const requestOptions = {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({"username": username,"pwd": pwd})
       };
       fetch('https://scrumbledore-server.herokuapp.com/add_user', requestOptions)
           .then(data => data.json())
           .then(json => {
             //alert(JSON.stringify(json)))
             localStorage.setItem('loggedin_user', JSON.stringify(username));
             localStorage.setItem('selected_project', null);
             localStorage.setItem('loggedin_user_projects', JSON.stringify([]));
 
             if(json.message === "success")  {window.location.href = "/login"}
             else alert(JSON.stringify(json)) 
           })
        
       setUserName("")
       setPwd("")
          
     }
 
    
 
     function testOnFocus(test) {
       console.log(test)
       return ""
     }
 
   return (
       <div className="text-center m-5-auto">
           <h2>User Registration</h2>
           <h5>Create your account</h5>
           <form action="/selectproject" className='registration'>
               <p>
                   <span>Set Username</span> <br/>
                   <input type="text" name="username"  id="username"  value={username} onChange={(e) => setUserName(e.target.value)} required/>
               </p>
               {/* <p>
                   <label>Set Email address</label><br/>
                   <input type="email" name="email" required />
               </p> */}
               <p>
               <div  id="message" style = {{display : "none"} }>
               <h3>Password must contain the following:</h3>
               <p id="letter" class="invalid">A <b>lowercase</b> letter</p>
               <p id="capital" class="invalid">A <b>capital (uppercase)</b> letter</p>
               <p id="number" class="invalid">A <b>number</b></p>
               <p id="length" class="invalid">Minimum <b>8 characters</b></p>
               </div>
               <div>
                 <pre>
                   <span>Set Password</span><br/><input type="password"
                     onChange={(e) => validate(e.target.value)}></input> <br />
                   {errorMessage === '' ? null :
                   <span style={{
                     fontWeight: 'bold',
                     color: 'green',
                   }}>{errorMessage}</span>}
                 </pre>
               </div>
                   {/* <label>Set Password</label><br/>
                   <input type="password" name="pwd" id="pwd" value={pwd} onChange={(e) => setPwd(e.target.value)}
                   required />
                   <input type="password"
                   onChange={(e) => validate(e.target.value)}></input>
                   {errorMessage === '' ? null :
                   <span style={{
                     fontWeight: 'bold',
                     color: 'red',
                   }}>{
                     <h3>Password must contain the following:</h3>
                   }
                   {errorMessage}
                   </span>} */}
                   {/* <input type="password" id="pwd" name="pwd" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                   title="Must contain at least one number and one uppercase and lowercase letter,
                   and at least 8 or more characters"  
                   onChange={(e) => testMethod(e.target.value) }
                   onFocus = {testOnFocus()}  ></input> */}
                  
               </p>
              
               {/* <p>
                   <button id="sub_btn" type="submit">Register</button>
               </p> */}
           </form>
           <div>
             <p>
           <Button variant="secondary" onClick={callApi}>Submit</Button>
             </p>
           </div>
 
          
          
           <footer>
               <p><Link to="/">Back to Homepage</Link>.</p>
           </footer>
       </div>
   )
 
}
 
 
//https://scrumbledore-server.herokuapp.com
 
{/* <span style={{
                     fontWeight: 'bold',
                     color: 'red',
                   }}>{
                     <p>Is Not a strong password</p>
                   } {
                     <p> Password must contain the following:
                       <br/>
                       A <b>lowercase</b> letter <br/>
                       A <b>capital (uppercase)</b> letter <br/>
                       A <b>number</b> <br/>
                       A <b>symbol</b> <br/>
                       Minimum <b>8 characters</b>
 
                     </p>
                    
                   } */}


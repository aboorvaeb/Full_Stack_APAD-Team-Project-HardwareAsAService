import React, { useEffect, useState }from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { AppContext } from '../../AppContext';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import '../../App.css'


export default function SignInPage(props) {

    let history = useHistory();
    

    const [username, setUserName] = useState('');
    const [pwd, setPwd] = useState('');
    const [response, setShowResponse] = useState(false);
    const [test, setTest] = useState(false);

    let temp = []
    let testemp = []
    

    let callApi = async (e) => {
      e.preventDefault();
      let testList = []
    try {
      let res = await fetch("https://scrumbledore-server.herokuapp.com/verify_user", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"username": username,"pwd": pwd}),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        if(resJson.message === "success"){
          testList =  resJson.projects
          // temp = testList
          // handleState(temp);

          setUserName(username)
          localStorage.setItem('loggedin_user', JSON.stringify(username));
          localStorage.setItem('loggedin_user_projects', JSON.stringify(resJson.projects));
          window.location.href = "/selectproject"
        } else{
          alert(JSON.stringify(resJson.message))
        }
          
      } else {
        alert("Some error occurred");
      }
    } catch (err) {
      console.log(err);
    }
  };

    // function handleState(temp) {
    //   testemp = temp
    //   console.log(testemp)
    //   history.push({
    //     pathname: "/selectproject",
    //     state: temp
    //   });
      

    // }
      
    
    return (
        <div className="text-center m-5-auto">
          <h2>User Login</h2>
          <h5>Login to your account</h5>
     
            <Form onSubmit={callApi}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" value={username} placeholder="Enter username" onChange={(e) => setUserName(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="pwd">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={pwd} placeholder=" Enter Password" onChange={(e) => setPwd(e.target.value)} />
              </Form.Group>
              <Button type='submit' variant="secondary">
                Submit
              </Button>
            </Form>
        </div>
      );
   
}
import React, { useEffect, useState }from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import '../../App.css'


export default function SignInPage(props) {

    let history = useHistory();
    

    const [username, setUserName] = useState('');
    const [pwd, setPwd] = useState('');
    const [response, setShowResponse] = useState(false);
    const [test, setTest] = useState(false);

    let temp = []
    let testemp = []
    

    function callApi() {

        // Simple POST request with a JSON body using fetch
        let testList = []
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"username": username,"pwd": pwd})
        };
        fetch('/verify_user', requestOptions)
            .then(data => data.json())
            .then(json => {
              testList =  json.projects
              temp = testList
            
              handleState(temp);
              if(json.message === "success")  {window.location.href = "/selectproject"}
              else alert(JSON.stringify(json))
            

            })

        

        setUserName("")
        setPwd("")
       
        
            
      }

    function handleState(temp) {

      testemp = temp
      console.log(testemp)
      history.push({
        pathname: "/selectproject",
        state: temp
      });


    }
      
    
    return (
        <div className="text-center m-5-auto">
            <form onClick="return formResponse();">
                <p>
                <label>Enter User Name</label>
                <br></br>
                <input type="text" id="username" value={username}  onChange={(e) => setUserName(e.target.value)}/>
                </p>
                <label>Enter Password </label>
                <br></br>
                <input type="password" id="pwd" value={pwd} onChange={(e) => setPwd(e.target.value)} />
            </form>
            

            <div>
              <p>
            <button onClick={callApi}>SUBMIT</button >
              </p>
             
            </div>
        </div>
      );
   
}
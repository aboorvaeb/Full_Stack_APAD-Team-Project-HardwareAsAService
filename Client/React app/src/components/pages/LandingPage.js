import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import { Link } from 'react-router-dom'

import '../../App.css'

export default function LandingPage() {
    return (
        <header style={ HeaderStyle }>
            <h1 className="main-title text-center">WELCOME</h1>
            <p className="main-para text-center"></p>
            <div className="buttons text-center">
                <Link to="/login">
                    <Button variant="secondary" >Log in</Button>
                </Link>
                <span></span>
                <br/>
                <br/>
                <Link to="/register">
                    <Button  variant="secondary"  id="reg_btn"><span>Register </span></Button>
                </Link>
            </div>
        </header>
    )
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    //background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}
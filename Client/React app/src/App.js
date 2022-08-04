import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LandingPage from './components/pages/LandingPage'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import ForgetPasswordPage from './components/pages/ForgetPasswordPage'
import SelectProject from './components/pages/SelectProject'
import NewProjectPage from './components/pages/NewProject'
//import ResourceManagementPage from './components/pages/ResourceManagementPage'

import NavBar from './components/pages/Navbar'


import './App.css'
import ResourceManagementPage from './components/pages/ResourceManagementPage'

export default function App() {
    return (
        <Router>
            <NavBar />
            <div>
                <Switch>
                    <Route exact path="/" component={ LandingPage } />
                    <Route path="/login" component={ LoginPage } />
                    <Route path="/register" component={ RegisterPage } />
                    <Route path="/forget-password" component={ ForgetPasswordPage } />
                    <Route path="/selectproject" component={ SelectProject } />
                    <Route path="/newproject" component={ NewProjectPage } />
                    <Route path="/resourcemanagement" component={ ResourceManagementPage } />
                </Switch>
                {/* <Footer /> */}
            </div>
        </Router>
    )
}

// const Footer = () => {
//     return (
//         <p className="text-center" style={ FooterStyle }>Designed & coded by Scrumbledore's Army</p>
//     )
// }

// const FooterStyle = {
//     background: "#222",
//     fontSize: ".8rem",
//     color: "#fff",
//     position: "absolute",
//     bottom: 0,
//     padding: "1rem",
//     margin: 0,
//     width: "100%",
//     opacity: ".5"
// }
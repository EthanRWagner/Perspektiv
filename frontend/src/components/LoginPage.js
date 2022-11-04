import axios from 'axios'; 
import Login from "./Login"
import RegisterPage from "./RegisterPage"
import Feed from './Feed';
import "../css/App.css";
import "../css/Login.css";
import React from 'react';
import {Link, Route, Routes} from "react-router-dom";

const port = 8675;

function LoginPage (){

    function updateList(person) { 
        makeGetCall(person).then( result => {
            console.log(result.status);
        if (result && result.status === 404)
        console.log("Login Failed");
        });
    }

    async function makeGetCall(person){
        try {
        const response = await axios.get(`http://localhost:${port}/users`, person);
        console.log(person)
        return response;
        }
        catch (error) {
        console.log(error);
        return false;
        }
    }
        
    return (
        <div>
            <div>
                <div className="container">
                    <Login handleSubmit={updateList} />
                </div>
                <div className='regLink'>
                    <t>Don&apos;t Have An Account?&nbsp;</t>
                    <Link to="/register">Register Here</Link>
                </div>
            </div>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <LoginPage />
                    }
                />
                <Route
                    path="/register"
                    element={
                        <RegisterPage />
                    }
                />
                <Route
                    path="/<user>feed"
                    element={
                        <Feed />
                    }
                />
            </Routes>
        </div>
    )
}

export default LoginPage;
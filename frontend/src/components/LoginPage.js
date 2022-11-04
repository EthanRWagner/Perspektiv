import axios from 'axios'; 
import Login from "./Login"
import "../css/App.css";
import "../css/Login.css";
import React from 'react';
import {Link} from "react-router-dom";

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
        </div>
    )
}

export default LoginPage;
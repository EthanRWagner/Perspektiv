import axios from 'axios'; 
import Login from "./Login"
import "../css/App.css";
import React from 'react';

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
        <div className="container">
            <Login handleSubmit={updateList} />
        </div>

    )
}

export default LoginPage;
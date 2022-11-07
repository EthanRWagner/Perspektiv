import axios from 'axios'; 
import Login from "./Login"
import "../css/App.css";
import "../css/Login.css";
import React from 'react';
import {Link} from "react-router-dom";

const port = 8675;

function LoginPage (){

    function updateList(person) { 
        loginHandler(person).then( result => {
            console.log(result.status);
        if (result && result.status === 404)
        console.log("Login Failed");
        });
    }

    async function loginHandler(person){
        try {
        const response = await axios.post(`http://localhost:${port}/signin`, person);
        console.log(person)
        return response;
        }
        catch (error) {
        console.log(error);
        return false;
        }
    }
    
    //login error bar 
//     <Alert onClose={() => {}} severity="error">
//   <AlertTitle>Error</AlertTitle>
//   Invalid login or password — <strong>Try Again!</strong>
// </Alert>

// login success bar 
{/* <Alert onClose={() => {}} severity="success">
  <AlertTitle>Success</AlertTitle>
  Login successful — <strong>Welcome Back!</strong>
</Alert> */}

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
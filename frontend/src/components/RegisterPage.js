import Register from "./Register";
import axios from 'axios'; 
import "../css/App.css";
import React from 'react';
import {Link, useNavigate} from "react-router-dom";

// database port
const port = 8675;

function RegisterPage (){
    // web navigation method saved to a constant variable for easier use 
    const navigate = useNavigate();

    // prop passed to register component so that the registration
    // information can be made and posted into a user
    // going to navigate to login page after registering
    function updateList(person) { 
        makePostCall(person).then( result => {
            if (result && result.status === 201)
            {
                navigate('../login');
            }
        });
    }

    // helper function to make post call for updatelist
    async function makePostCall(person){
        try {
            const response = await axios.post(`http://localhost:${port}/signup`, person);
            return response;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
        
    return (<div>
        <div>
            <div className="container">
            <Register handleSubmit={updateList} />
            </div>
            <div className='regLink'>
                <t>Already Have An Account?&nbsp;</t>
                <Link to="/login">Login Here</Link>
            </div>
        </div>
    </div>

    )
}

export default RegisterPage;
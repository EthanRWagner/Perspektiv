import Register from "./Register";
import axios from 'axios'; 
import "../css/App.css";
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";

const port = 8675;

function RegisterPage (){
    const navigate = useNavigate();
    const [characters, setCharacters] = useState([]);

    function updateList(person) { 
        makePostCall(person).then( result => {
            if (result && result.status === 202)
            {
                setCharacters([...characters, result.data] );
                navigate('../login');
            }
        });
    }

    async function fetchAll(){
        try {
        const response = await axios.get(`http://localhost:${port}/users`);
        return response.data.users_list;
        }
        catch (error){
        //We're not handling errors. Just logging into the console.
        console.log(error); 
        return false;         
        }
    }

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

    useEffect(() => {
        fetchAll().then( result => {
        if (result)
            setCharacters(result);
        });
    }, [] );
        
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
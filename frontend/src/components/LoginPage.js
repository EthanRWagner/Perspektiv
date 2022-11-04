import axios from 'axios'; 
import Login from "./Login"
import RegisterPage from "./RegisterPage"
import Feed from './Feed';
import "../css/App.css";
import "../css/Login.css";
import React, {useState, useEffect} from 'react';
import {Link, Route, Routes} from "react-router-dom";

const port = 8675;

function LoginPage (){
    const [characters, setCharacters] = useState([]);

    function updateList(person) { 
        makePostCall(person).then( result => {
        if (result && result.status === 201)
        setCharacters([...characters, result.data] );
        });
    }

    async function fetchAll(){
        try {
        const response = await axios.get(`htp://localhost:${port}/users`);
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
        const response = await axios.post(`http://localhost:${port}/users`, person);
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
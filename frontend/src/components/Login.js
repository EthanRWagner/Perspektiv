// This file defines the Login Functional Component and Login Page
// Author: Ethan Wagner, Liam Shaw
import React, {useState} from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import axios from 'axios'; 
import "../css/Login.css";
import {Link, useNavigate} from "react-router-dom";

const port = 8675;

// Login Function Component
function Login() {
    const navigate = useNavigate();

    // This will navigate to feed when logged in
    if(window.sessionStorage.length > 0) {
        navigate('../feed')
    }

    const [user, setUser] = useState({
        username: "", password: "",
    });

    const [loginState, setState] = useState(false);

    // handles changes in the Login form
    function handleChange(event) {
        const {name, value} = event.target;
        if (name === "password") {
            setUser({username: user['username'], password: value}); 
        }
        else {
            setUser({
                username: value,
                password: user['password']
            });
        }
    }

    // manages the attemps to login
    function updateList(person) { 
        attemptLogin(person).then( result => {
            if (result && result.status != 202) {
                setState(true);
            }
            else {
                window.sessionStorage.setItem("id", result.data[0]['_id'])
                navigate('../feed')
                // need to refresh after navigating to update navbar in parent component
                window.location.reload(false);
            }
        });
    }

    // trys to login to by posting to the backend
    async function attemptLogin(person){
        try {
            const response = await axios.post(`http://localhost:${port}/signin`, person);
            return response;
        }
        catch (error) {
            return error;
        }
    }

    function LoginForm() {
        updateList(user);
        setUser({username: '', password: ''});
    }

    return (
    <div className="col-md-12">
        <div className="card card-container">
            <h2>
                Login
            </h2>
            <Form>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Input
                        type="text"
                        name="username"
                        id="username"
                        value={user.username}
                        onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input
                        type="text"
                        name="password"
                        id="password"
                        value={user.password}
                        onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <input type="button" value="Submit" 
                    onClick={LoginForm} />
                </div>
            </Form>
            {loginState && <small>Login failed, please try again.</small>}
        </div>
        <div className='regLink'>
            <small>Don&apos;t Have An Account?&nbsp;</small>
            <Link to="/register">Register Here</Link>
        </div>
    </div>);
}

export default Login
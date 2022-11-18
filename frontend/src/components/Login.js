import React, {useState} from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import axios from 'axios'; 
import "../css/Login.css";
import {Link, useNavigate} from "react-router-dom";

const port = 8675;

function Login() {
    const navigate = useNavigate();

    if(window.sessionStorage.length > 0) {
        navigate('../feed')
    }

    const [user, setUser] = useState({
        username: "", password: "",
    });

    const [loginState, setState] = useState(false);

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

    function updateList(person) { 
        attemptLogin(person).then( result => {
            if (result && result.status != 202) {
                setState(true);
            }
            else {
                window.sessionStorage.setItem("id", result.data[0]['_id'])
                navigate('../feed')
            }
        });
    }

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
            {loginState && <t>Login failed, please try again.</t>}
        </div>
        <div className='regLink'>
            <t>Don&apos;t Have An Account?&nbsp;</t>
            <Link to="/register">Register Here</Link>
        </div>
    </div>);
}

export default Login
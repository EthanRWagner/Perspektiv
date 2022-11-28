import React, {useState, useRef} from 'react';
import logo from '../img/temp-user.png'
import "../css/App.css"
import "../css/Register.css"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import axios from 'axios'; 
// import PropTypes from "prop-types";

const port = 8675;

function EditProfile(){
    const [user, setUser] = useState({
        username: "", email: "", password: "", confirmPassword: ""
    });

    const getUser =  async () => {
        var id = window.sessionStorage.getItem("id");
        try {
            var response = await axios.get(`http://localhost:${port}/users/${id}`)
            setUser(response.data.user);
        }
        catch(er) {
            console.log(er);
        }
    }

    const initializedRef = useRef(false);
    
    if (!initializedRef.current) {
      initializedRef.current = true;
      getUser();
    }

    function handleChange(event) {
        const {name, value} = event.target;
        if (name === "username") {
            setUser({
                username: value, 
                email: user['email'], 
                password: user['password'], 
                confirmPassword: user['confirmPassword']
            }); 
        }
        else if(name === "email"){
            setUser({
                username: user['username'], 
                email: value, 
                password: user['password'], 
                confirmPassword: user['confirmPassword']
            }); 
        }
        else if(name === "password"){
            setUser({
                username: user['username'], 
                email: user['email'], 
                password: value, 
                confirmPassword: user['confirmPassword']}); 
        }
        else {
            setUser({
                username: user['username'], 
                email: user['email'], 
                password: user['password'], 
                confirmPassword: value}); 
        }
    }

    function updateUser(user){
        attemptUpdate(user).then(result => {
            if (result && result.status != 201) {
                console.log("USER NOT FOUND");
            }
        })
    }

    async function attemptUpdate(person){
        try {
            const response = await axios.patch(`http://localhost:${port}/edit`, person);
            return response;
        }
        catch (error) {
            return error;
        }
    }

    function editForm(){
        updateUser(user)
    }

    function checkPassword(){
        if(user.password === user.confirmPassword){
            updateUser(user)
        }
        else{
            console.log("passwords did not match")
        }
    }

    return (
        <div className='col-md-12'>
            {/* <h2 className='logo-center'>User&apos;s Profile</h2>
            <img src={logo} className='user-center-circle'/>
            <h4 className='logo-center'>User&apos;s Username</h4>
            <h4 className='logo-center'>User&apos;s Name</h4>
            <h4 className='logo-center'>User&apos;s Email</h4> */}
            <div className='card card-container'>
                <h2 className='profile-center'>User&apos;s Profile</h2>
                <img src={logo} className='user-center-circle'/>
                <Form>
                    <div className="form-group">
                        <label htmlFor="username">New Username</label>
                        <Input
                            type="text"
                            name="username"
                            id="username"
                            value={user.username}
                            onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="button" value="Update Username" onClick={editForm}/>
                    </div>
                </Form>
                <Form>
                    <div className="form-group">
                        <label htmlFor="username">New Email</label>
                        <Input
                            type="text"
                            name="email"
                            id="email"
                            value={user.email}
                            onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="button" value="Update Email" onClick={editForm}/>
                    </div>
                </Form>
                <Form>
                    <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <Input
                            type="text"
                            name="password"
                            id="password"
                            onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Confirm New Password</label>
                        <Input
                            type="text"
                            name="confirmPassword"
                            id="confirmPassword"
                            onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="button" value="Update Password" onClick={checkPassword}/>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default EditProfile
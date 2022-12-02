// This file outlines the functional compnent for edit profile
// Author - Liam Shaw

import React, {useState, useRef} from 'react';
import logo from "../img/Perspektiv.gif";
import "../css/App.css"
import "../css/Register.css"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import axios from 'axios'; 
// import PropTypes from "prop-types";

const port = 8675;


// edit profile function compenent 
function EditProfile(){

    // this useState variable is the logged in user
    const [user, setUser] = useState({
        username: "", email: "", password: "", confirmPassword: ""
    });

    // this useState variable is the field that needs to be updated for the logged in user
    const [updatedUser, setUpdatedUser] = useState({
        username: "", newUsername: "", newEmail: "", newPassword: "", newConfPassword: ""
    })

    // getUser makes a post API call to fetch the logged in user from the backend
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

    // this runs as the page is being initialized to set the logged in user
    if (!initializedRef.current) {
      initializedRef.current = true;
      getUser();
    }

    // handleChange sets the updated user based on what is being typed in the edit user form
    function handleChange(event) {
        const {name, value} = event.target;
        if (name === "newUsername") {
            if(user.username !== updatedUser.newUsername){
                setUpdatedUser({
                    username: user["username"],
                    newUsername: value, 
                    newEmail: null, 
                    newPassword: null, 
                    newConfPassword: null
                }); 
            }
        }
        else if(name === "newEmail"){
            setUpdatedUser({
                username: user['username'],
                newUsername: null, 
                newEmail: value, 
                newPassword: null, 
                newConfassword: null
            }); 
        }
        else if(name === "newPassword"){
            setUpdatedUser({
                username: user['username'], 
                newUsername: null, 
                newEmail: null, 
                newPassword: value, 
                newConfPassword: updatedUser['newConfPassword']}); 
        }
        else {
            setUpdatedUser({
                username: user['username'], 
                newUsername: null, 
                newEmail: null, 
                newPassword: updatedUser['newPassword'], 
                newConfPassword: value}); 
        }
    }

    function updateUser(){
        attemptUpdate(updatedUser).then(result => {
            if (result && result.status != 202) {
                console.log("USER NOT FOUND");
                console.log(result)
            }
        })
    }

    // attemptUpdate makes a patch API call to attempt to update the users information.
    // Parameters: person (the updatedUser use state variable)
    async function attemptUpdate(person){
        try {
            const response = await axios.patch(`http://localhost:${port}/editProfile`, person);
            return response;
        }
        catch (error) {
            return error;
        }
    }

    // editForm use to do more but lost a lot of functionality 
    function editForm(){
        updateUser()
    }

    // checkPassword checks to see if the new passwords match before calling attemptUpdate
    function checkPassword(){
        if(updatedUser.password === updatedUser.confirmPassword){
            updateUser()
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
                            name="newUsername"
                            id="newUsername"
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
                            name="newEmail"
                            id="newEmail"
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
                            name="newPassword"
                            id="newPassword"
                            onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Confirm New Password</label>
                        <Input
                            type="text"
                            name="newConfirmPassword"
                            id="newConfirmPassword"
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
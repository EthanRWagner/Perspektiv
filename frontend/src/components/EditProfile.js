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

    const [updatedUser, setUpdatedUser] = useState({
        username: "", newUsername: "", newEmail: "", newPassword: "", newConfPassword: ""
    })

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

    async function attemptUpdate(person){
        try {
            const response = await axios.patch(`http://localhost:${port}/editProfile`, person);
            return response;
        }
        catch (error) {
            return error;
        }
    }

    function editForm(){
        updateUser()
    }

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
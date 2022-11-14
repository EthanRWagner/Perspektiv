import React from 'react';
import logo from '../img/temp-user.png'
import "../css/App.css"
import "../css/Register.css"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
// import PropTypes from "prop-types";

function EditProfile(){
    const [user, setUser] = useState({
        username: "", email: "", password: "", confirmPassword: ""
    });

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
        attemptFind(user).then(result => {
            if (result && result.status != 201) {
                console.log("USER NOT FOUND");
            }
        })
    }

    async function attemptFind(person){
        try {
            const response = await axios.post(`http://localhost:${port}/signin`, person);
            return response;
        }
        catch (error) {
            return error;
        }
    }

    function EditFrom(){
        updateUser(user)
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
                            onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">New Email</label>
                        <Input
                            type="text"
                            name="email"
                            id="email"
                            onChange={handleChange}/>
                    </div>
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
                        <input type="button" value="Update Information" onClick={editForm()}/>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default EditProfile
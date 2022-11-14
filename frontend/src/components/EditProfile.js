import React from 'react';
import logo from '../img/temp-user.png'
import "../css/App.css"
import "../css/Register.css"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
// import PropTypes from "prop-types";

function EditProfile(){
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
                            />
                            {/*onChange={handleChange}/>*/}
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">New Email</label>
                        <Input
                            type="text"
                            name="username"
                            id="username"
                            />
                            {/*onChange={handleChange}/>*/}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <Input
                            type="text"
                            name="password"
                            id="password"
                            />
                            {/*onChange={handleChange}/>*/}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Confirm New Password</label>
                        <Input
                            type="text"
                            name="password"
                            id="password"
                            />
                            {/*onChange={handleChange}/>*/}
                    </div>
                    <div className="form-group">
                        <input type="button" value="Update Information" />
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default EditProfile
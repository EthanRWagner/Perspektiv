import React from 'react';
import logo from '../img/temp-user.png'
import "../css/App.css"
import "../css/Register.css"
// import PropTypes from "prop-types";

function Profile(){
    return (
        <div className='col-md-12'>
            <div className='card card-container'>
                <h2 className='center'>User&apos;s Profile</h2>
                <img src={logo} className='user-center-circle'/>
                <h3 className='center'>User&apos;s Username</h3>
                <h3 className='center'>User&apos;s Name</h3>
                <h3 className='center'>User&apos;s Email</h3>
            </div>
        </div>
    );
}

export default Profile
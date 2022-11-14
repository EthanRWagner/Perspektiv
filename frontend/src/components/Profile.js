import React from 'react';
import logo from '../img/temp-user.png'
import "../css/App.css"
import "../css/Register.css"
// import PropTypes from "prop-types";

function Profile(){
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
                <h4 className='profile-center'>User&apos;s Username</h4>
                <h4 className='profile-center'>User&apos;s Name</h4>
                <h4 className='profile-center'>User&apos;s Email</h4>
            </div>
        </div>
    );
}

export default Profile
import React from 'react';
// import PropTypes from "prop-types";
import Profile from './Profile'
import "../css/App.css"
import {Link} from "react-router-dom";

function ProfilePage(){
    return (
        <div>
            <div>
                <div className="container">
                    <Profile/>
                    <Link class='profile-center' to='/editProfile'>edit account information</Link>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
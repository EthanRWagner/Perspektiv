import React from 'react';
// import PropTypes from "prop-types";
import Profile from './Profile'
import "../css/App.css"
import {Link} from "react-router-dom";

function ProfilePage(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let username = params.get('username')

    return (
        <div>
            <div>
                <div className="container">
                    <Profile username={username}/>
                    {username == null &&
                    <Link className='profile-center' to='/editProfile'>edit account information</Link>
                    } 
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
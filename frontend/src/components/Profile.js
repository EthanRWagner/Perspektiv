import React, {useState, useRef} from 'react';
import logo from '../img/temp-user.png'
import "../css/App.css"
import "../css/Register.css"
import axios from 'axios'; 
// import PropTypes from "prop-types";

const port = 8675;

function Profile(props){

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

    const findUser = async (username) => {
        try {
            var response = await axios.get(`http://localhost:${port}/users/${username}`)
            setUser(response.data.user);
        }
        catch(er){
            console.log(er);
        }
    }

    const [user, setUser] = useState({});

    const initializedRef = useRef(false);
    
    if (!initializedRef.current) {
      initializedRef.current = true;
    //   let search = window.location.search;
    //   let params = new URLSearchParams(search);
    //   username = params.get('username')
    //   console.log(username)
      if(props.username !== null && props.username.length > 0){
        //findUser(username)
        findUser('63656f7e082f9cd1cfbccc04')
      }
      else{
        getUser();
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
                <h2 className='profile-center'>{user.username}&apos;s Profile</h2>
                <img src={logo} className='user-center-circle'/>
                <h4 className='profile-left'>Username: {user.username}</h4>
                <h4 className='profile-left'>Name: {user.fullName}</h4>
                {props.username == null &&
                <h4 className='profile-left'>Email: {user.email}</h4>
                }
            </div>
        </div>
    );
}

export default Profile
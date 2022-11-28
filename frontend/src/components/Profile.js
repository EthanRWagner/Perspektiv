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
            console.log(response.data.user);
            setUser(response.data.user);
        }
        catch(er) {
            console.log(er);
        }
    }


    const findUser = async (username) => {
        try {
            var response = await axios.get(`http://localhost:${port}/findUser/${username}`)
            console.log(response.data.user)
            setOtherUser(response.data.user[0]);
        }
        catch(er){
            console.log(er);
        }
    }

    const initializedRef = useRef(false);

    const [user, setUser] = useState({});

    const [otherUser, setOtherUser] = useState({});

    
    if (!initializedRef.current) {
      initializedRef.current = true;
    //   let search = window.location.search;
    //   let params = new URLSearchParams(search);
    //   username = params.get('username')
    //   console.log(username)
      if(props.username !== null && props.username.length > 0){
        findUser(props.username)
        //findUser('6384ed0b5d3d57b6e834d7a3')
      }
      else{
        getUser();
        //setOtherUser(null)
        otherUser.username = null
      }
    }

    return (
        <div className='col-md-12'>
            {/* <h2 className='logo-center'>User&apos;s Profile</h2>
            <img src={logo} className='user-center-circle'/>
            <h4 className='logo-center'>User&apos;s Username</h4>
            <h4 className='logo-center'>User&apos;s Name</h4>
            <h4 className='logo-center'>User&apos;s Email</h4> */}
            <div id="user" style={{visibility:"visible"}}>
                <div className='card card-container'>
                    {otherUser.username == null &&
                    <h2 className='profile-center'>{user.username}&apos;s Profile</h2>
                    }
                    {otherUser.username !== null &&
                    <h2 className='profile-center'>{otherUser.username}&apos;s Profile</h2>
                    }
                    <img src={logo} className='user-center-circle'/>
                    {otherUser.username == null &&
                    <h4 className='profile-left'>Username: {user.username}</h4>
                    }
                    {otherUser.username !== null &&
                    <h4 className='profile-left'>username: {otherUser.username}</h4>
                    }
                    {otherUser.username == null &&
                    <h4 className='profile-left'>Name: {user.fullName}</h4>
                    }
                    {otherUser.username !== null &&
                    <h4 className='profile-left'>Name: {otherUser.fullName}</h4>
                    }
                    {otherUser.username == null &&
                    <h4 className='profile-left'>Email: {user.email}</h4>
                    }
                </div>
            </div>
        </div>
    );
}

export default Profile
import React, {useState, useRef} from 'react';
import logo from '../img/temp-user.png'
import "../css/App.css"
import "../css/Register.css"
import axios from 'axios'; 
import "../css/SearchPage.css";

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
        console.log("find user");
        try {
            var response = await axios.get(`http://localhost:${port}/findUser/${username}`)
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
      if(props.username !== null && props.username.length > 0){
        findUser(props.username)
      }
      else{
        getUser()
        otherUser.username = null;
      }
    }

    return (
        <div className='col-md-12'>
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
                <div  className='results-box'>
                    {otherUser.username == null &&
                    <small className='box-headings'>{user.username}&apos;s HodgePodges</small>
                    }
                    {otherUser.username !== null &&
                    <small className='box-headings'>{otherUser.username}&apos;s HodgePodges</small>
                    }
                    {otherUser.username == null &&
                    <div className='sample-result'>
                        <ol className='hp-list'>{user.hpList}</ol>
                    </div>
                    }
                    {otherUser.username !== null &&
                    <div>
                        <ol className='hp-list'>{otherUser.hpList}</ol>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Profile
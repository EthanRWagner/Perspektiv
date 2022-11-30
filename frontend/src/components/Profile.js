import React, {useState, useRef} from 'react';
import logo from '../img/Perspektiv.gif'
import "../css/App.css"
import "../css/Register.css"
import axios from 'axios'; 
import "../css/SearchPage.css";

// import PropTypes from "prop-types";

const port = 8675;

function Profile(props){

    const [status, setStatus] = useState(0);
    const [user, setUser] = useState({});
    const [otherUser, setOtherUser] = useState({});

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
            var response = await axios.get(`http://localhost:${port}/findUser/${username}`)
            setOtherUser(response.data.user[0]);
        }
        catch(er){
            console.log(er);
        }
    }

    const initializedRef = useRef(false);

    
    if (!initializedRef.current) {
      initializedRef.current = true;
      if(props.username !== null && props.username.length > 0){
        findUser(props.username);
        getUser();
        setStatus(2);
        console.log("not changing correctly?");
      }
      else{
        getUser();
        console.log("should change");
        setStatus(1);
        otherUser.username = null;
      }
    }

    // posts to db that user joined db from search results
    async function joinHPProfile (hp_name) {
        try {
            await axios.post(`http://localhost:${port}/joinHP`, {username: user.username, hp: hp_name});
            window.location.reload(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    // creates HTML elements from HP profile results
    const HP_self_enum = () =>{
        const hodges = [];
        const hp_results = user.hpList;
        const user_hps = user.hpList;
        for (let i = 0; i < hp_results?.length; i++) {
            if(user_hps && user_hps.includes(hp_results[i])){
                hodges.push(
                    <div className='search-item'>
                        <small key={hp_results[i]}
                               className="descr">
                               JOINED &#10003;&emsp;{hp_results[i]}
                        </small>
                    </div>
                );
            }
            else{
                hodges.push(
                    <div className='search-item' onClick={() => joinHPProfile(hp_results[i])}>
                        <small key={hp_results[i]}
                               className="descr">
                               ADD &emsp;{hp_results[i]}
                        </small>
                    </div>
                );
            }
        }
        return hodges;
    }

    const HP_ext_enum = () =>{
        const hodges = [];
        const hp_results = otherUser.hpList;
        const user_hps = user.hpList;
        for (let i = 0; i < hp_results?.length; i++) {
            if(user_hps && user_hps.includes(hp_results[i])){
                hodges.push(
                    <div className='search-item'>
                        <small key={hp_results[i]}
                               className="descr">
                               JOINED &#10003;&emsp;{hp_results[i]}
                        </small>
                    </div>
                );
            }
            else{
                hodges.push(
                    <div className='search-item' onClick={() => joinHPProfile(hp_results[i])}>
                        <small key={hp_results[i]}
                               className="descr">
                               ADD &emsp;{hp_results[i]}
                        </small>
                    </div>
                );
            }
        }
        return hodges;
    }


    return (
        <div className='col-md-12'>
            <div id="user" style={{visibility:"visible"}}>
                <div className='card card-container'>
                    {(status === 1) &&
                    <h2 className='profile-center'>{user.username}&apos;s Profile</h2>
                    }
                    {(status === 2) &&
                    <h2 className='profile-center'>{otherUser.username}&apos;s Profile</h2>
                    }
                    <img src={logo} className='user-center-circle'/>
                    {(status === 1) &&
                    <h4 className='profile-left'>Username: {user.username}</h4>
                    }
                    {(status === 2) &&
                    <h4 className='profile-left'>username: {otherUser.username}</h4>
                    }
                    {(status === 1) &&
                    <h4 className='profile-left'>Name: {user.fullName}</h4>
                    }
                    {(status === 2) &&
                    <h4 className='profile-left'>Name: {otherUser.fullName}</h4>
                    }
                    {(status === 1) &&
                    <h4 className='profile-left'>Email: {user.email}</h4>
                    }
                </div>
                <div  className='results-box'>
                    {(status === 1) &&
                    <small className='box-headings'>{user.username}&apos;s HodgePodges</small>
                    }
                    {(status === 2) &&
                    <small className='box-headings'>{otherUser.username}&apos;s HodgePodges</small>
                    }
                    {(status === 1) && 
                    <div className='sample-result'>
                        {HP_self_enum()}
                    </div>
                    }
                    {(status === 2) &&
                    <div className='sample-result'>
                        {HP_ext_enum()}
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Profile
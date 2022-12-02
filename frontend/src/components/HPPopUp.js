import React, {useState} from "react";
import axios from 'axios';
import "../css/HPPopUp.css";

// src: https://www.cluemediator.com/create-simple-popup-in-reactjs
const port = 8675;

const Popup = props => {
    // text state for the hodgepodge input field
    const[newHP, setNewHP] = useState("");

    // state for alerts based on the status of the post call
    // 0 default state, no alert
    // 1 successful creation of HP
    // 2 HP name already taken
    // 3 invalid HP name
    const[status, setStatus] = useState(0);

    // gets the user information from Feed componenet
    const user = props.currUser;

    //updates the newHP state when the user types in the field
    function handleChange(event) {
        const {name, value} = event.target;
        if (name === "newHP") setNewHP(value);
    }

    // when user submits entry creating the hodgepodge is attempted
    // status is adjusted accordingly
    function updateHPDB() {
        setStatus(0);
        if (newHP.length >= 1) {
            makeHPCall(newHP).then( result => {
                if (result && (result.status === 201)){
                    setStatus(1);
                }
                else{
                    setStatus(2);
                }
                });
        } else {
            setStatus(3);
        } 
        setNewHP("");
    }

    // helper function to create HP and add HP to user's HP
    async function makeHPCall(hp) {
        try {
            const response = await axios.post(`http://localhost:${port}/createHP`, {name: hp});
            await axios.post(`http://localhost:${port}/joinHP`, {username: user.username, hp: hp});
            return response;
        }
        catch (error) {
            console.log(error)
            return false;
        }
    }

    return (
        <div className="popup-box">
        <div className="box">
            <span className="close-icon" onClick={props.handleClose}>x</span>
            <>
                <b>Create A New HodgePodge</b>
                <p>
                    <textarea
                        placeholder="HP name..."
                        type="text"
                        name="newHP"
                        id="newHP"
                        value={newHP}
                        onChange={handleChange}>
                    </textarea>
                </p>
                <button className='create-button' onClick={updateHPDB}>Create</button>
                <div className="alert-box">
                    {(status === 1) && <small name="good-text">HodgePodge Created!</small>}
                    {(status === 2) && <small name="bad-text">HodgePodge name already taken. Try a different one.</small>}
                    {(status === 3) && <small name="bad-text">Invalid HodgePodge name.</small>}
                </div>
            </>
        </div>
        </div>
    );
};
 
export default Popup;
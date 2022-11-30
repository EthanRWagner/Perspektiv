import React, {useState} from "react";
import axios from 'axios';
import "../css/HPPopUp.css";

// src: https://www.cluemediator.com/create-simple-popup-in-reactjs
const port = 8675;

const Popup = props => {

    const[newHP, setNewHP] = useState("");

    const[status, setStatus] = useState(0);

    const user = props.currUser;

    function handleChange(event) {
        const {name, value} = event.target;
        if (name === "newHP") setNewHP(value);
    }

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

    async function makeHPCall(hp) {
        try {
            const response = await axios.post(`http://localhost:${port}/createHP`, {name: hp});
            await axios.post(`http://localhost:${port}/joinHP`, {username: user.username, hp: hp});
            return response;
        }
        catch (error) {
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
                {(status === 1) && <small name="good-text">&emsp;&emsp;HodgePodge Created!</small>}
                {(status === 2) && <small name="bad-text">&emsp;&emsp;HodgePodge name already taken. Try a different one.</small>}
                {(status === 3) && <small name="bad-text">&emsp;&emsp;Invalid HodgePodge name.</small>}
            </>
        </div>
        </div>
    );
};
 
export default Popup;